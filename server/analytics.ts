import type { Context, Env, Visit } from "./types";
import { publicEventTypes } from "./types";
import {
  assertOrigin,
  HttpError,
  json,
  language,
  productOnPage,
  readJson,
  routePath,
  setCookie,
  text,
  uuid,
  withCookies,
} from "./http";
import {
  knownBot,
  makeCookie,
  random,
  rateLimit,
  signedCookie,
} from "./security";
import catalog from "./catalog.generated.json";
import {visitAttribution} from './attribution';
import { beijingDayStart } from "./reporting";
const productIds = new Set(catalog.map((item) => item.id));

export function country(request: Request) {
  if (
    ["localhost", "127.0.0.1", "[::1]"].includes(new URL(request.url).hostname)
  )
    return "unknown";
  const value = (request as Request & { cf?: { country?: string } }).cf
    ?.country;
  return value && /^[A-Z]{2}$/.test(value) && !["XX", "T1"].includes(value)
    ? value
    : "unknown";
}
export function device(request: Request) {
  const ua = request.headers.get("user-agent") || "";
  if (/iPad|Tablet/i.test(ua)) return "tablet";
  if (/Mobile|Android|iPhone/i.test(ua)) return "mobile";
  return /Windows|Macintosh|X11|Linux|CrOS/i.test(ua) ? "desktop" : "unknown";
}
export function attribution(request:Request,body:Record<string,unknown>){const {source,channel}=visitAttribution(request.url,body);return {source,channel};}
export async function currentVisit(
  request: Request,
  env: Env,
  requested?: unknown,
): Promise<Visit | null> {
  if (
    env.ANALYTICS_MODE === "aggregate" ||
    request.headers.get("sec-gpc") === "1" ||
    request.headers.get("dnt") === "1" ||
    knownBot(request) ||
    (await signedCookie(request, env, "lzz_analytics_off")) === "yes"
  )
    return null;
  if (requested && !uuid(requested)) return null;
  const visitor = await signedCookie(request, env, "lzz_visitor"),
    visit = uuid(requested) ? requested : await signedCookie(request, env, "lzz_visit");
  if (!visitor || !visit) return null;
  return env.DB.prepare(
    `SELECT v.id,v.visitor_id,v.source,v.channel,v.country,v.device,v.language,
        v.referrer_host,v.utm_source,v.utm_medium,v.utm_campaign,b.first_seen
     FROM visits v JOIN visitors b ON b.id=v.visitor_id
     WHERE v.id=? AND v.visitor_id=? AND v.last_seen>?`,
  )
    .bind(visit, visitor, Date.now() - 30 * 60000)
    .first<Visit>();
}
export async function analyticsConsent({ request, env }: Context) {
  assertOrigin(request);
  const body = await readJson(request, 4000);
  // Compatibility endpoint for an explicit choice in the earlier frontend.
  // Automatic collection uses /session and never records a grant of consent.
  return beginSession({ request, env }, body, body.granted === true,
    body.granted !== true, env.ANALYTICS_MODE === "aggregate");
}
export async function analyticsSession({ request, env }: Context) {
  assertOrigin(request);
  const body = await readJson(request, 4000);
  return beginSession({ request, env }, body, body.enabled === true,
    body.enabled === false);
}
async function beginSession(
  { request, env }: Pick<Context, "request" | "env">,
  body: Record<string, unknown>,
  resume: boolean,
  disable: boolean,
  legacyAggregate = false,
) {
  const mode = env.ANALYTICS_MODE === "aggregate" ? "aggregate" : "detailed";
  if (
    disable || legacyAggregate ||
    request.headers.get("sec-gpc") === "1" ||
    request.headers.get("dnt") === "1" ||
    knownBot(request) ||
    (!resume && (await signedCookie(request, env, "lzz_analytics_off")) === "yes")
  )
    return withCookies(json({ enabled: false, mode }), [
      setCookie(request, "lzz_visitor", "", 0),
      setCookie(request, "lzz_visit", "", 0),
      ...(disable ? [await makeCookie(request, env, "lzz_analytics_off", "yes", 180 * 86400)] : []),
    ]);
  if (mode === "aggregate")
    return withCookies(json({ enabled: true, mode }), resume
      ? [setCookie(request, "lzz_analytics_off", "", 0)] : []);
  const page = routePath(body.page);
  if (!page) throw new HttpError(400, "page", "页面地址不正确。");
  await rateLimit(request, env, "visit", 90, 60);
  const now = Date.now(),
    visitor = (await signedCookie(request, env, "lzz_visitor")) || random();
  let visit = await currentVisit(request, env, body.visitId);
  const details = visitAttribution(request.url,body);
  const newEntry = details.attributionBasis !== 'unavailable' && visit && (
    details.source !== visit.source || details.channel !== visit.channel ||
    details.referrerHost !== visit.referrer_host || details.utmSource !== visit.utm_source ||
    details.utmMedium !== visit.utm_medium || details.utmCampaign !== visit.utm_campaign
  );
  if (!visit || newEntry) {
    const previous = visit ?? await env.DB.prepare("SELECT first_seen FROM visitors WHERE id=?")
      .bind(visitor)
      .first<{first_seen: number}>();
    const { source, channel } = details,
      id = random();
    visit = {
      id,
      visitor_id: visitor,
      source,
      channel,
      country: country(request),
      device: device(request),
      language: language(body.language),
      first_seen: previous?.first_seen ?? now,
    };
    await env.DB.prepare(
      "INSERT INTO visits(id,visitor_id,started_at,last_seen,is_returning,source,channel,country,device,language,entry_page,source_platform,referrer_host,utm_source,utm_medium,utm_campaign,attribution_basis) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    )
      .bind(
        id,
        visitor,
        now,
        now,
        Number(visit.first_seen < beijingDayStart(now)),
        source,
        channel,
        visit.country,
        visit.device,
        visit.language,
        page,
        details.sourcePlatform,details.referrerHost,details.utmSource,details.utmMedium,details.utmCampaign,details.attributionBasis,
      )
      .run();
  }
  await env.DB.batch([
    env.DB.prepare(
      `INSERT INTO visitors(id,first_seen,last_seen) VALUES(?,?,?)
       ON CONFLICT(id) DO UPDATE SET
         first_seen=MIN(visitors.first_seen,excluded.first_seen),
         last_seen=MAX(visitors.last_seen,excluded.last_seen)`,
    ).bind(visitor, now, now),
    env.DB.prepare(
      "UPDATE visits SET last_seen=MAX(last_seen,?) WHERE id=?",
    ).bind(now, visit.id),
  ]);
  const useCurrentCookie = body.visitId !== visit.id || await signedCookie(request, env, "lzz_visit") === visit.id;
  return withCookies(
    json({
      enabled: true,
      mode,
      visitorId: visitor,
      visitId: visit.id,
    }),
    [
      await makeCookie(request, env, "lzz_visitor", visitor, 180 * 86400),
      ...(useCurrentCookie ? [await makeCookie(request, env, "lzz_visit", visit.id, 1800)] : []),
      ...(resume ? [setCookie(request, "lzz_analytics_off", "", 0)] : []),
    ],
  );
}
const positions = new Set([
  "header",
  "hero",
  "main",
  "footer",
  "gallery",
  "quote-form",
  "parameters",
  "image-viewer",
  "unknown",
]);
const errors = new Set([
  "validation",
  "attachment",
  "network",
  "server",
  "rate_limit",
  "captcha",
  "unavailable",
]);
export async function recordEvents({ request, env }: Context) {
  assertOrigin(request);
  const body = await readJson(request, 24000);
  if (
    knownBot(request) ||
    request.headers.get("sec-gpc") === "1" ||
    request.headers.get("dnt") === "1"
  )
    return json({ accepted: 0, ignored: true }, 202);
  const visit = await currentVisit(request, env, body.visitId);
  if (!visit) return json({ accepted: 0, ignored: true }, 202);
  if (!Array.isArray(body.events) || body.events.length > 20)
    throw new HttpError(400, "events", "每批最多 20 个事件。");
  await rateLimit(request, env, "events", 240, 60, visit.visitor_id);
  const now = Date.now();
  const statements: D1PreparedStatement[] = [];
  for (const input of body.events) {
    if (
      !input ||
      typeof input !== "object" ||
      !uuid(input.id) ||
      !publicEventTypes.includes(input.type)
    )
      throw new HttpError(400, "event_type", "不支持的事件。");
    const page = routePath(input.page);
    if (!page) throw new HttpError(400, "page", "页面地址不正确。");
    const proposedProduct = productOnPage(page) || input.product,
      product = productIds.has(proposedProduct) ? proposedProduct : "";
    const position = positions.has(input.position) ? input.position : "unknown";
    const clientTime=Number(input.occurredAt);
    const trustedTime=Number.isSafeInteger(clientTime)&&clientTime>=now-300000&&clientTime<=now+60000;
    const occurredAt=trustedTime?Math.min(clientTime,now):now;
    const sequence=Number.isSafeInteger(input.sequence)&&input.sequence>=0&&input.sequence<=1000000000?input.sequence:0;
    statements.push(
      env.DB.prepare(
        "INSERT OR IGNORE INTO events(id,visitor_id,visit_id,type,created_at,page,product,language,position,resource,error_code,source,channel,country,device,is_returning,page_title,section_id,section_label,element_id,element_label,target,page_view_id,sequence,received_at,time_basis) SELECT ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,? WHERE EXISTS(SELECT 1 FROM visitors WHERE id=?)",
      ).bind(
        input.id,
        visit.visitor_id,
        visit.id,
        input.type,
        occurredAt,
        page,
        product,
        language(input.language),
        position,
        routePath(input.resource),
        errors.has(input.errorCode) ? input.errorCode : "",
        visit.source,
        visit.channel,
        country(request),
        device(request),
        Number(visit.first_seen < beijingDayStart(occurredAt)),
        text(input.pageTitle,200),text(input.sectionId,100),text(input.sectionLabel,120),text(input.elementId,100),text(input.elementLabel,120),safeEventTarget(request.url,input.target),uuid(input.pageViewId)?input.pageViewId:'',sequence,now,trustedTime?'client':'server',
        visit.visitor_id,
      ),
    );
  }
  const results = statements.length ? await env.DB.batch(statements) : [];
  await env.DB.batch([
    env.DB.prepare("UPDATE visits SET last_seen=MAX(last_seen,?) WHERE id=?").bind(
      now,
      visit.id,
    ),
    env.DB.prepare(
      "UPDATE visitors SET last_seen=MAX(last_seen,?) WHERE id=?",
    ).bind(now, visit.visitor_id),
  ]);
  const result = json({
      accepted: results.reduce(
        (n, result) => n + (result.meta.changes || 0),
        0,
      ),
  });
  // A tab keeps its own attribution after another tab starts a new visit.
  return await signedCookie(request, env, "lzz_visit") === visit.id
    ? withCookies(result, [await makeCookie(request, env, "lzz_visit", visit.id, 1800)])
    : result;
}

export function safeEventTarget(origin:string,value:unknown){
 if(typeof value!=='string'||!value.trim())return '';
 try{
  const url=new URL(String(value||''),origin);
  if(url.protocol==='mailto:'&&url.pathname.toLowerCase()==='roger@lzz-cnc.com')return 'mailto:roger@lzz-cnc.com';
  if(url.protocol==='tel:'&&url.pathname.replace(/[^\d]/g,'')==='8613858102479')return 'tel:+8613858102479';
  if(['wa.me','api.whatsapp.com','web.whatsapp.com','www.whatsapp.com','whatsapp.com'].includes(url.hostname)){
   const phone=(url.hostname==='wa.me'?url.pathname.slice(1):url.searchParams.get('phone')||'').replace(/^\+/, '');
   return phone==='8613858102479'?'https://wa.me/8613858102479':'';
  }
  if(url.origin===new URL(origin).origin)return routePath(url.pathname)+(/^#[a-zA-Z][\w:.-]{0,99}$/.test(url.hash)?url.hash:'');
 }catch{/* Free-text destinations and prefilled messages are never recorded. */}
 return '';
}
export async function inquirySuccess(
  env: Env,
  visit: Visit | null,
  inquiryId: string,
  page: string,
  product: string,
  lang: string,
  savedAt: number,
) {
  if (!visit) return;
  const now = Date.now();
  await env.DB.batch([
    env.DB.prepare(
      "INSERT OR IGNORE INTO events(id,visitor_id,visit_id,type,created_at,page,product,language,position,source,channel,country,device,is_returning) SELECT ?,?,?,?,?,?,?,?,?,?,?,?,?,? WHERE EXISTS(SELECT 1 FROM visitors WHERE id=?)",
    ).bind(
      "inquiry:" + inquiryId,
      visit.visitor_id,
      visit.id,
      "inquiry_success",
      savedAt,
      page,
      product,
      lang,
      "quote-form",
      visit.source,
      visit.channel,
      visit.country,
      visit.device,
      Number(visit.first_seen < beijingDayStart(savedAt)),
      visit.visitor_id,
    ),
    env.DB.prepare(
      "UPDATE visitors SET last_seen=MAX(last_seen,?) WHERE id=?",
    ).bind(now, visit.visitor_id),
    env.DB.prepare(
      "UPDATE visits SET last_seen=MAX(last_seen,?) WHERE id=?",
    ).bind(now, visit.id),
  ]);
}
export async function forgetVisitor({ request, env }: Context) {
  assertOrigin(request);
  const visitor = await signedCookie(request, env, "lzz_visitor");
  if (visitor)
    await env.DB.batch([
      env.DB.prepare("DELETE FROM events WHERE visitor_id=?").bind(visitor),
      env.DB.prepare("DELETE FROM visits WHERE visitor_id=?").bind(visitor),
      env.DB.prepare(
        "UPDATE inquiries SET visitor_id=NULL,visit_id=NULL WHERE visitor_id=?",
      ).bind(visitor),
      env.DB.prepare("DELETE FROM visitors WHERE id=?").bind(visitor),
    ]);
  return withCookies(json({ ok: true }), [
    setCookie(request, "lzz_visitor", "", 0),
    setCookie(request, "lzz_visit", "", 0),
    await makeCookie(request, env, "lzz_analytics_off", "yes", 180 * 86400),
  ]);
}
