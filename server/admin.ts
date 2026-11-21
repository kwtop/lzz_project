import type { Actor, Context, Env } from "./types";
import {
  HttpError,
  json,
  readJson,
  text,
  uuid,
} from "./http";
import { audit } from "./auth";
import { random } from "./security";
import catalog from "./catalog.generated.json";
import {productTitle} from "../src/data/presentation";
import { DAY, OFFSET, eventDayStartSQL, pagination, reportPeriod, reportFilter } from "./reporting";
import {detailedOverview,visitorJourney} from "./insights";
import type { DailyVisitor } from "../src/lib/insightTypes";

export const statuses = ["new", "following", "completed", "spam"];
const day=DAY,offset=OFFSET;
export const period=reportPeriod;
const conditions=reportFilter;
const rows = async <T = Record<string, unknown>>(
  env: Env,
  sql: string,
  args: unknown[] = [],
) =>
  (
    await env.DB.prepare(sql)
      .bind(...args)
      .all<T>()
  ).results || [];
const count = async (env: Env, sql: string, args: unknown[] = []) =>
  Number(
    (
      await env.DB.prepare(sql)
        .bind(...args)
        .first<{ total: number }>()
    )?.total || 0,
  );

async function aggregateOverview(env: Env, url: URL) {
  const range = period(url);
  const a = conditions(url, "a", range);
  const i = conditions(url, "i", range, true);
  const current = await env.DB.prepare(
    `SELECT COALESCE(SUM(count*(type='page_view')),0) pageViews,COALESCE(SUM(count*(type='product_view')),0) productViews,COALESCE(SUM(count*(type IN ('quote_click','whatsapp_click','email_click'))),0) contactClicks,COALESCE(SUM(count*(type='whatsapp_click')),0) whatsappClicks,COALESCE(SUM(count*(type='email_click')),0) emailClicks,COALESCE(SUM(count*(type='quote_click')),0) quoteClicks,COALESCE(SUM(count*(type='form_start')),0) formStarters,COALESCE(SUM(count*(type='form_error')),0) formErrors FROM analytics_totals a WHERE ${a.sql}`,
  ).bind(...a.args).first<Record<string, number>>();
  const daily = await rows<{ bucket: number; pageViews: number }>(env,
    `SELECT CAST((created_at-?)/86400000 AS INTEGER) bucket,SUM(count*(type='page_view')) pageViews FROM analytics_totals a WHERE ${a.sql} GROUP BY bucket`,
    [range.start, ...a.args]);
  const inquiries = await rows<{ bucket: number; inquiries: number }>(env,
    `SELECT CAST((created_at-?)/86400000 AS INTEGER) bucket,COUNT(*) inquiries FROM inquiries i WHERE ${i.sql} GROUP BY bucket`,
    [range.start, ...i.args]);
  const breakdowns: Record<string, unknown[]> = {};
  for (const field of ["country", "source", "channel", "device", "language"])
    breakdowns[field] = await rows(env,
      `SELECT COALESCE(NULLIF(${field},''),'unknown') name,SUM(count) views FROM analytics_totals a WHERE ${a.sql} AND type='page_view' GROUP BY name ORDER BY views DESC LIMIT 30`, a.args);
  return json({
    mode: "aggregate",
    range: {...range,granularity:"day"},
    current: { ...current, inquiries: await count(env, `SELECT COUNT(*) total FROM inquiries i WHERE ${i.sql}`, i.args) },
    previous: {},
    trend: Array.from({ length: Math.ceil((range.end-range.start)/day) }, (_, bucket) => ({
      bucket, date: new Date(range.start+bucket*day+offset).toISOString().slice(0,10),
      pageViews: daily.find(row=>row.bucket===bucket)?.pageViews || 0,
      inquiries: inquiries.find(row=>row.bucket===bucket)?.inquiries || 0,
    })),
    previousTrend: [],
    breakdowns,
    pages: await rows(env, `SELECT page name,SUM(count) views FROM analytics_totals a WHERE ${a.sql} AND type='page_view' GROUP BY page ORDER BY views DESC LIMIT 30`, a.args),
    products: await rows(env, `SELECT product name,SUM(count) views FROM analytics_totals a WHERE ${a.sql} AND type='product_view' AND product<>'' GROUP BY product ORDER BY views DESC LIMIT 30`, a.args),
    checks: {
      pageViewsByCountry: await count(env, `SELECT COALESCE(SUM(count),0) total FROM analytics_totals a WHERE ${a.sql} AND type='page_view'`, a.args),
      inquiriesByStatus: await rows(env, `SELECT status,COUNT(*) total FROM inquiries i WHERE ${i.sql} GROUP BY status`, i.args),
    },
    scope: "汇总模式按小时保存页面和点击次数。访客明细展示此前已记录的浏览器访问。开始填写按触发次数统计，询盘按服务端保存记录统计。",
  });
}
export async function overview(env:Env,url:URL){return env.ANALYTICS_MODE==="aggregate"?aggregateOverview(env,url):detailedOverview(env,url);}
export async function options(env: Env) {
  const data: Record<string, unknown> = {
    products: catalog.map(({id,name}) => ({id,name:productTitle({slug:id,name})})),
  };
  for (const field of ["source", "country", "language", "channel", "device"])
    data[field] = await rows(
      env,
      `SELECT DISTINCT value FROM (
         SELECT COALESCE(NULLIF(${field},''),'unknown') value FROM events
         UNION SELECT COALESCE(NULLIF(${field},''),'unknown') FROM inquiries
         UNION SELECT COALESCE(NULLIF(${field},''),'unknown') FROM analytics_totals
       ) ORDER BY value LIMIT 300`,
    );
  data.destinations = await rows(
    env,
    "SELECT DISTINCT destination_country value FROM inquiries ORDER BY value LIMIT 300",
  );
  data.campaigns = env.ANALYTICS_MODE === "aggregate" ? [] : await rows(
    env,
    "SELECT utm_campaign value FROM visits WHERE utm_campaign<>'' GROUP BY utm_campaign ORDER BY MAX(started_at) DESC, value LIMIT 300",
  );
  return json(data);
}
function inquiryBounds(url: URL) {
  return url.searchParams.get("start") || url.searchParams.get("end")
    ? period(url)
    : undefined;
}
export async function listInquiries(env: Env, url: URL) {
  const filter = conditions(url, "i", inquiryBounds(url), true),
    page = Math.max(
      1,
      Math.min(100000, Number(url.searchParams.get("p")) || 1),
    ),
    limit = 20;
  const total = await count(
    env,
    `SELECT COUNT(*) total FROM inquiries i WHERE ${filter.sql}`,
    filter.args,
  );
  const items = await rows(
    env,
    `SELECT i.id,i.name,i.company,i.email,i.phone,i.destination_country,i.interest,i.product,i.part_type,i.processes,i.status,i.unread,i.created_at,i.source_page,i.page,i.language,i.source,i.country,i.internal,(SELECT COUNT(*) FROM inquiry_files f WHERE f.inquiry_id=i.id) files FROM inquiries i WHERE ${filter.sql} ORDER BY created_at DESC,id DESC LIMIT ? OFFSET ?`,
    [...filter.args, limit, (page - 1) * limit],
  );
  return json({
    items,
    total,
    page,
    pageSize: limit,
    unread: await count(
      env,
      `SELECT COUNT(*) total FROM inquiries i WHERE ${filter.sql} AND unread=1`,
      filter.args,
    ),
  });
}
export async function inquiryDetail(env: Env, id: string) {
  if (!uuid(id)) throw new HttpError(404, "not_found", "询盘不存在。");
  const inquiry = await env.DB.prepare("SELECT * FROM inquiries WHERE id=?")
    .bind(id)
    .first();
  if (!inquiry) throw new HttpError(404, "not_found", "询盘不存在。");
  // Request keys and payload hashes are internal deduplication data.
  const { request_key, payload_hash, ...publicInquiry } = inquiry;
  return json({
    inquiry: publicInquiry,
    files: await rows(
      env,
      "SELECT id,name,size,sha256 FROM inquiry_files WHERE inquiry_id=?",
      [id],
    ),
    notes: await rows(
      env,
      "SELECT id,author,content,created_at FROM inquiry_notes WHERE inquiry_id=? ORDER BY created_at,id",
      [id],
    ),
  });
}
export async function updateInquiry(context: Context, id: string, user: Actor) {
  const body = await readJson(context.request, 4000),
    fields: string[] = [],
    args: unknown[] = [];
  if (body.status !== undefined) {
    if (!statuses.includes(String(body.status)))
      throw new HttpError(400, "status", "状态不正确。");
    fields.push("status=?");
    args.push(body.status);
  }
  if (body.unread !== undefined) {
    if (typeof body.unread !== "boolean")
      throw new HttpError(400, "unread", "未读状态不正确。");
    fields.push("unread=?");
    args.push(Number(body.unread));
  }
  if (!uuid(id) || !fields.length)
    throw new HttpError(400, "update", "没有可更新的字段。");
  const result = await context.env.DB.prepare(
    `UPDATE inquiries SET ${fields.join(",")},updated_at=? WHERE id=?`,
  )
    .bind(...args, Date.now(), id)
    .run();
  if (!result.meta.changes)
    throw new HttpError(404, "not_found", "询盘不存在。");
  await audit(context.env, user, "inquiry_update", id);
  return json({ ok: true });
}
export async function addNote(context: Context, id: string, user: Actor) {
  const body = await readJson(context.request, 12000),
    content = text(body.content, 2001);
  if (!uuid(id) || !content || content.length > 2000)
    throw new HttpError(400, "note", "备注需为 1–2000 字。");
  const exists = await context.env.DB.prepare(
    "SELECT id FROM inquiries WHERE id=?",
  )
    .bind(id)
    .first();
  if (!exists) throw new HttpError(404, "not_found", "询盘不存在。");
  await context.env.DB.prepare(
    "INSERT INTO inquiry_notes(id,inquiry_id,author,content,created_at) VALUES(?,?,?,?,?)",
  )
    .bind(random(), id, user.username, content, Date.now())
    .run();
  await audit(context.env, user, "note_add", id);
  return json({ ok: true }, 201);
}
export async function downloadFile(context: Context, id: string, user: Actor) {
  if (!uuid(id)) throw new HttpError(404, "not_found", "附件不存在。");
  const file = await context.env.DB.prepare(
    "SELECT name,object_key FROM inquiry_files WHERE id=?",
  )
    .bind(id)
    .first<{ name: string; object_key: string }>();
  if (!file) throw new HttpError(404, "not_found", "附件不存在。");
  const object = await context.env.FILES.get(file.object_key);
  if (!object) throw new HttpError(404, "not_found", "附件暂不可用。");
  await audit(context.env, user, "file_download", id);
  return new Response(object.body, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="attachment"; filename*=UTF-8''${encodeURIComponent(file.name).replace(/'/g, "%27")}`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
function csvCell(value: unknown) {
  let cell = String(value ?? "");
  if (/^\s*[=+\-@]|^[\t\r\n]/.test(cell)) cell = "'" + cell;
  return '"' + cell.replaceAll('"', '""') + '"';
}
export async function exportInquiries(context: Context, url: URL, user: Actor) {
  const filter = conditions(url, "i", inquiryBounds(url), true),
    total = await count(
      context.env,
      `SELECT COUNT(*) total FROM inquiries i WHERE ${filter.sql}`,
      filter.args,
    );
  if (total > 10000)
    throw new HttpError(
      400,
      "export_limit",
      "单次导出上限为 10000 条，请缩小日期范围。",
    );
  const data = await rows(
    context.env,
    `SELECT i.id,i.created_at,i.name,i.company,i.email,i.phone,i.destination_country,i.interest,i.product,i.part_type,i.processes,i.requirements,i.status,i.unread,i.source_page,i.page,i.language,i.source,i.channel,i.country,i.device,i.visitor_id,(SELECT GROUP_CONCAT(n.content,' | ') FROM inquiry_notes n WHERE n.inquiry_id=i.id) notes FROM inquiries i WHERE ${filter.sql} ORDER BY created_at DESC,id DESC LIMIT 10000`,
    filter.args,
  );
  const fields = [
    "id",
    "created_at",
    "name",
    "company",
    "email",
    "phone",
    "destination_country",
    "interest",
    "product",
    "part_type",
    "processes",
    "requirements",
    "status",
    "unread",
    "source_page",
    "page",
    "language",
    "source",
    "channel",
    "country",
    "device",
    "visitor_id",
    "notes",
  ];
  const labels = [
    "询盘编号",
    "提交时间 UTC",
    "姓名",
    "公司",
    "邮箱",
    "电话",
    "目的地国家",
    "感兴趣的产品/主题",
    "产品编号",
    "零件类型",
    "工艺",
    "需求",
    "状态",
    "未读",
    "来源页面",
    "提交页面",
    "语言",
    "访问来源",
    "渠道",
    "访客国家",
    "设备",
    "匿名访客编号",
    "跟进备注",
  ];
  const csv =
    "\ufeff" +
    labels.map(csvCell).join(",") +
    "\r\n" +
    data
      .map((row) =>
        fields
          .map((field) =>
            csvCell(
              field === "created_at"
                ? new Date(Number(row[field])).toISOString()
                : row[field],
            ),
          )
          .join(","),
      )
      .join("\r\n");
  await audit(context.env, user, "inquiry_export", String(total));
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="lzz-inquiries.csv"',
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
export async function visitors(env: Env, url: URL) {
  const filter = conditions(url, "e", period(url));
  const { page, pageSize } = pagination(url);
  const total = await count(
    env,
    `SELECT COUNT(*) total FROM (
       SELECT 1 FROM events e WHERE ${filter.sql}
       GROUP BY e.visitor_id, ${eventDayStartSQL}
     )`,
    filter.args,
  );
  const items = await rows<DailyVisitor>(
    env,
    `WITH eligible AS (
       SELECT e.visitor_id,e.visit_id,e.type,e.created_at,e.country,e.source,e.device,
         ${eventDayStartSQL} day_start,
         ROW_NUMBER() OVER (
           PARTITION BY e.visitor_id, ${eventDayStartSQL}
           ORDER BY e.created_at DESC,e.sequence DESC,e.id DESC
         ) recency
       FROM events e WHERE ${filter.sql}
     ), daily AS (
       SELECT visitor_id id,day_start,MIN(created_at) first_seen,MAX(created_at) last_seen,
         COUNT(DISTINCT visit_id) visits,SUM(type='page_view') views,
         MAX(CASE WHEN recency=1 THEN country END) country,
         MAX(CASE WHEN recency=1 THEN source END) source,
         MAX(CASE WHEN recency=1 THEN device END) device
       FROM eligible GROUP BY visitor_id,day_start
       ORDER BY day_start DESC,last_seen DESC,id DESC LIMIT ? OFFSET ?
     )
     SELECT daily.*,CASE WHEN browser.first_seen < daily.day_start THEN 1 ELSE 0 END is_returning,
       (SELECT COUNT(*) FROM inquiries i WHERE i.visitor_id=daily.id
         AND i.created_at>=daily.day_start AND i.created_at<daily.day_start+${DAY}) inquiries
     FROM daily LEFT JOIN visitors browser ON browser.id=daily.id
     ORDER BY daily.day_start DESC,daily.last_seen DESC,daily.id DESC`,
    [...filter.args, pageSize, (page - 1) * pageSize],
  );
  return json({ items, total, page, pageSize });
}
export async function journey(env: Env, id: string, url: URL) {
  if(url.searchParams.get("v2")==="1")return visitorJourney(env,id,url);
  if (!uuid(id)) throw new HttpError(404, "not_found", "访客不存在。");
  const visitor = await env.DB.prepare("SELECT * FROM visitors WHERE id=?")
    .bind(id)
    .first();
  if (!visitor) throw new HttpError(404, "not_found", "访客不存在。");
  const before = Math.min(
      Number(url.searchParams.get("before")) || Date.now() + 1,
      Date.now() + 1,
    ),
    beforeId = text(url.searchParams.get("beforeId"), 90) || "z";
  const events = await rows<{ id: string; created_at: number }>(
    env,
    `SELECT * FROM (SELECT id,type,created_at,page,product,language,position,resource,error_code FROM events WHERE visitor_id=? UNION ALL SELECT 'inquiry:'||id,'inquiry_success',created_at,page,product,language,'quote-form','','' FROM inquiries WHERE visitor_id=? AND NOT EXISTS(SELECT 1 FROM events WHERE events.id='inquiry:'||inquiries.id)) WHERE created_at<? OR (created_at=? AND id<?) ORDER BY created_at DESC,id DESC LIMIT 101`,
    [id, id, before, before, beforeId],
  );
  const items = events.slice(0, 100),
    last = items.at(-1);
  return json({
    visitor,
    events: items,
    next:
      events.length > 100
        ? { before: last!.created_at, beforeId: last!.id }
        : null,
    inquiries: await rows(
      env,
      "SELECT id,name,company,status,created_at,interest FROM inquiries WHERE visitor_id=? ORDER BY created_at DESC",
      [id],
    ),
  });
}
