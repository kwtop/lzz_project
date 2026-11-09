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
  internal,
  knownBot,
  makeCookie,
  random,
  rateLimit,
  signedCookie,
} from "./security";
import catalog from "./catalog.generated.json";
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
export function attribution(request: Request, body: Record<string, unknown>) {
  const sourceValue = text(body.utmSource, 80).toLowerCase(),
    medium = text(body.utmMedium, 80).toLowerCase();
  let referrer = "";
  try {
    const url = new URL(String(body.referrer || ""));
    if (
      ["http:", "https:"].includes(url.protocol) &&
      url.origin !== new URL(request.url).origin
    )
      referrer = url.hostname.replace(/^www\./, "");
  } catch {
    /* Missing referrer remains unknown. */
  }
  const source = /^[a-z0-9_.-]{1,80}$/.test(sourceValue)
    ? sourceValue
    : referrer || "unknown";
  let channel = "unknown";
  if (/^(cpc|ppc|paidsearch|paid_search)$/.test(medium))
    channel = "paid_search";
  else if (/^(paid_social|paidsocial)$/.test(medium)) channel = "paid_social";
  else if (medium === "email") channel = "email";
  else if (
    /google\.|bing\.|duckduckgo\.|search\.yahoo\.|baidu\./i.test(referrer)
  )
    channel = "organic_search";
  else if (
    /(^|\.)(facebook|instagram|linkedin|youtube|reddit|tiktok|x|twitter)\./i.test(
      referrer,
    )
  )
    channel = "social";
  else if (referrer) channel = "referral";
  else if (source !== "unknown")
    channel = medium === "organic" ? "organic_search" : "campaign";
  return { source, channel };
}
export async function currentVisit(
  request: Request,
  env: Env,
): Promise<Visit | null> {
  if (
    env.ANALYTICS_MODE === "aggregate" ||
    request.headers.get("sec-gpc") === "1" ||
    request.headers.get("dnt") === "1" ||
    knownBot(request) ||
    (await signedCookie(request, env, "lzz_analytics_off")) === "yes"
  )
    return null;
  const visitor = await signedCookie(request, env, "lzz_visitor"),
    visit = await signedCookie(request, env, "lzz_visit");
  if (!visitor || !visit) return null;
  return env.DB.prepare(
    "SELECT id,visitor_id,source,channel,country,device,language,is_returning,internal FROM visits WHERE id=? AND visitor_id=? AND last_seen>?",
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
  const prior = await env.DB.prepare(
    "SELECT id,internal FROM visitors WHERE id=?",
  )
    .bind(visitor)
    .first<{ id: string; internal: number }>();
  const excluded = Number((await internal(request, env)) || !!prior?.internal);
  let visit = await currentVisit(request, env);
  if (!visit) {
    const previous = await env.DB.prepare(
      "SELECT id FROM visits WHERE visitor_id=? LIMIT 1",
    )
      .bind(visitor)
      .first();
    const { source, channel } = attribution(request, body),
      id = random();
    visit = {
      id,
      visitor_id: visitor,
      source,
      channel,
      country: country(request),
      device: device(request),
      language: language(body.language),
      is_returning: Number(!!previous),
      internal: excluded,
    };
    await env.DB.prepare(
      "INSERT INTO visits(id,visitor_id,started_at,last_seen,is_returning,source,channel,country,device,language,entry_page,internal) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",
    )
      .bind(
        id,
        visitor,
        now,
        now,
        visit.is_returning,
        source,
        channel,
        visit.country,
        visit.device,
        visit.language,
        page,
        excluded,
      )
      .run();
  }
  await env.DB.batch([
    env.DB.prepare(
      "INSERT INTO visitors(id,first_seen,last_seen,internal) VALUES(?,?,?,?) ON CONFLICT(id) DO UPDATE SET last_seen=excluded.last_seen,internal=MAX(visitors.internal,excluded.internal)",
    ).bind(visitor, now, now, excluded),
    env.DB.prepare(
      "UPDATE visits SET last_seen=?,internal=MAX(internal,?) WHERE id=?",
    ).bind(now, excluded, visit.id),
  ]);
  return withCookies(
    json({
      enabled: true,
      mode,
      visitorId: visitor,
      visitId: visit.id,
      internal: !!excluded,
    }),
    [
      await makeCookie(request, env, "lzz_visitor", visitor, 180 * 86400),
      await makeCookie(request, env, "lzz_visit", visit.id, 1800),
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
  const visit = await currentVisit(request, env);
  if (!visit) return json({ accepted: 0, ignored: true }, 202);
  if (!Array.isArray(body.events) || body.events.length > 20)
    throw new HttpError(400, "events", "每批最多 20 个事件。");
  await rateLimit(request, env, "events", 240, 60, visit.visitor_id);
  const now = Date.now(),
    excluded = Number(!!visit.internal || (await internal(request, env)));
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
    statements.push(
      env.DB.prepare(
        "INSERT OR IGNORE INTO events(id,visitor_id,visit_id,type,created_at,page,product,language,position,resource,error_code,source,channel,country,device,is_returning,internal) SELECT ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,? WHERE EXISTS(SELECT 1 FROM visitors WHERE id=?)",
      ).bind(
        input.id,
        visit.visitor_id,
        visit.id,
        input.type,
        now,
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
        visit.is_returning,
        excluded,
        visit.visitor_id,
      ),
    );
  }
  const results = statements.length ? await env.DB.batch(statements) : [];
  await env.DB.batch([
    env.DB.prepare("UPDATE visits SET last_seen=? WHERE id=?").bind(
      now,
      visit.id,
    ),
    env.DB.prepare(
      "UPDATE visitors SET last_seen=MAX(last_seen,?) WHERE id=?",
    ).bind(now, visit.visitor_id),
  ]);
  return withCookies(
    json({
      accepted: results.reduce(
        (n, result) => n + (result.meta.changes || 0),
        0,
      ),
    }),
    [await makeCookie(request, env, "lzz_visit", visit.id, 1800)],
  );
}
export async function inquirySuccess(
  env: Env,
  visit: Visit | null,
  inquiryId: string,
  page: string,
  product: string,
  lang: string,
  excluded: number,
) {
  if (!visit) return;
  const now = Date.now();
  await env.DB.batch([
    env.DB.prepare(
      "INSERT OR IGNORE INTO events(id,visitor_id,visit_id,type,created_at,page,product,language,position,source,channel,country,device,is_returning,internal) SELECT ?,?,?,?,?,?,?,?,?,?,?,?,?,?,? WHERE EXISTS(SELECT 1 FROM visitors WHERE id=?)",
    ).bind(
      "inquiry:" + inquiryId,
      visit.visitor_id,
      visit.id,
      "inquiry_success",
      now,
      page,
      product,
      lang,
      "quote-form",
      visit.source,
      visit.channel,
      visit.country,
      visit.device,
      visit.is_returning,
      excluded,
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
