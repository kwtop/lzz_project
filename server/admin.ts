import type { Actor, Context, Env } from "./types";
import {
  HttpError,
  json,
  readJson,
  setCookie,
  text,
  uuid,
  withCookies,
} from "./http";
import { audit } from "./auth";
import { makeCookie, random } from "./security";
import catalog from "./catalog.generated.json";

export const statuses = ["new", "following", "completed", "spam"];
const day = 86400000,
  offset = 8 * 3600000;
function dateStart(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return NaN;
  const parsed = Date.parse(value + "T00:00:00+08:00");
  return Number.isFinite(parsed) &&
    new Date(parsed + offset).toISOString().slice(0, 10) === value
    ? parsed
    : NaN;
}
export function period(url: URL) {
  const now = Date.now(),
    today = Math.floor((now + offset) / day) * day - offset;
  const start = url.searchParams.get("start")
    ? dateStart(url.searchParams.get("start")!)
    : today - 6 * day;
  const end = url.searchParams.get("end")
    ? Math.min(dateStart(url.searchParams.get("end")!) + day, now)
    : now;
  if (
    !Number.isFinite(start) ||
    !Number.isFinite(end) ||
    start >= end ||
    end - start > 366 * day
  )
    throw new HttpError(
      400,
      "date_range",
      "请选择不超过 366 天的有效日期范围。",
    );
  return {
    start,
    end,
    previousStart: start - (end - start),
    previousEnd: start,
    timezone: "Asia/Shanghai",
  };
}
function conditions(
  url: URL,
  alias: string,
  bounds?: { start: number; end: number },
  inquiry = false,
) {
  const terms: string[] = [],
    args: (string | number)[] = [];
  if (bounds) {
    terms.push(`${alias}.created_at>=? AND ${alias}.created_at<?`);
    args.push(bounds.start, bounds.end);
  }
  if (url.searchParams.get("internal") !== "1")
    terms.push(`${alias}.internal=0`);
  for (const field of [
    "source",
    "country",
    "product",
    "language",
    "device",
    "channel",
  ]) {
    const value = url.searchParams.get(field);
    if (value) {
      terms.push(`COALESCE(NULLIF(${alias}.${field},''),'unknown')=?`);
      args.push(text(value, 200));
    }
  }
  if (inquiry) {
    const status = url.searchParams.get("status");
    if (status) {
      if (!statuses.includes(status))
        throw new HttpError(400, "status", "状态不正确。");
      terms.push(`${alias}.status=?`);
      args.push(status);
    }
    const unread = url.searchParams.get("unread");
    if (unread === "1") terms.push(`${alias}.unread=1`);
    const destination = url.searchParams.get("destination");
    if (destination) {
      terms.push(`${alias}.destination_country=?`);
      args.push(text(destination, 100));
    }
    const q = text(url.searchParams.get("q"), 100);
    if (q) {
      terms.push(
        `(${["name", "company", "email", "phone", "interest", "requirements", "id"].map((field) => `${alias}.${field} LIKE ? ESCAPE '\\'`).join(" OR ")})`,
      );
      args.push(...Array(7).fill("%" + q.replace(/[\\%_]/g, "\\$&") + "%"));
    }
  }
  return { sql: terms.length ? terms.join(" AND ") : "1=1", args };
}
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

async function metrics(
  env: Env,
  url: URL,
  bounds: { start: number; end: number },
) {
  const e = conditions(url, "e", bounds),
    i = conditions(url, "i", bounds, true);
  const data = await env.DB.prepare(
    `SELECT COUNT(DISTINCT visitor_id) visitors,COUNT(DISTINCT visit_id) visits,COALESCE(SUM(type='page_view'),0) pageViews,COUNT(DISTINCT CASE WHEN is_returning=1 THEN visitor_id END) returningVisitors,COALESCE(SUM(type IN ('quote_click','whatsapp_click','email_click')),0) contactClicks,COALESCE(SUM(type='whatsapp_click'),0) whatsappClicks,COALESCE(SUM(type='email_click'),0) emailClicks,COALESCE(SUM(type='quote_click'),0) quoteClicks,COUNT(DISTINCT CASE WHEN type='form_start' THEN visitor_id END) formStarters,COALESCE(SUM(type='form_error'),0) formErrors FROM events e WHERE ${e.sql}`,
  )
    .bind(...e.args)
    .first<Record<string, number>>();
  return {
    ...data,
    inquiries: await count(
      env,
      `SELECT COUNT(*) total FROM inquiries i WHERE ${i.sql}`,
      i.args,
    ),
  };
}
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
    range,
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
    scope: "默认汇总页面与点击次数，按小时合并保存；不识别独立访客、回访者或个人浏览轨迹。开始填写为触发次数，联系点击不等于询盘。询盘按服务端保存记录统计；默认排除内部测试及已识别机器人。",
  });
}
export async function overview(env: Env, url: URL) {
  if (env.ANALYTICS_MODE === "aggregate") return aggregateOverview(env, url);
  const range = period(url),
    current = await metrics(env, url, range),
    previous = await metrics(env, url, {
      start: range.previousStart,
      end: range.previousEnd,
    });
  const trend = async (start: number, end: number) => {
    const e = conditions(url, "e", { start, end }),
      i = conditions(url, "i", { start, end }, true);
    const events = await rows<{
      bucket: number;
      visitors: number;
      pageViews: number;
    }>(
      env,
      `SELECT CAST((created_at-?)/86400000 AS INTEGER) bucket,COUNT(DISTINCT visitor_id) visitors,SUM(type='page_view') pageViews FROM events e WHERE ${e.sql} GROUP BY bucket`,
      [start, ...e.args],
    );
    const inquiries = await rows<{ bucket: number; inquiries: number }>(
      env,
      `SELECT CAST((created_at-?)/86400000 AS INTEGER) bucket,COUNT(*) inquiries FROM inquiries i WHERE ${i.sql} GROUP BY bucket`,
      [start, ...i.args],
    );
    return Array.from(
      { length: Math.ceil((end - start) / day) },
      (_, bucket) => ({
        bucket,
        date: new Date(start + bucket * day + offset)
          .toISOString()
          .slice(0, 10),
        visitors: events.find((v) => v.bucket === bucket)?.visitors || 0,
        pageViews: events.find((v) => v.bucket === bucket)?.pageViews || 0,
        inquiries: inquiries.find((v) => v.bucket === bucket)?.inquiries || 0,
      }),
    );
  };
  const e = conditions(url, "e", range),
    i = conditions(url, "i", range, true);
  const breakdowns: Record<string, unknown[]> = {};
  for (const field of ["country", "source", "channel", "device", "language"])
    breakdowns[field] = await rows(
      env,
      `SELECT COALESCE(NULLIF(${field},''),'unknown') name,COUNT(*) views,COUNT(DISTINCT visitor_id) visitors FROM events e WHERE ${e.sql} AND type='page_view' GROUP BY name ORDER BY views DESC LIMIT 30`,
      e.args,
    );
  const pages = await rows(
    env,
    `SELECT page name,COUNT(*) views,COUNT(DISTINCT visitor_id) visitors FROM events e WHERE ${e.sql} AND type='page_view' GROUP BY page ORDER BY views DESC LIMIT 30`,
    e.args,
  );
  const products = await rows(
    env,
    `SELECT product name,COUNT(*) views,COUNT(DISTINCT visitor_id) visitors FROM events e WHERE ${e.sql} AND type='product_view' AND product<>'' GROUP BY product ORDER BY views DESC LIMIT 30`,
    e.args,
  );
  const checks = {
    pageViewsByCountry: await count(
      env,
      `SELECT COUNT(*) total FROM events e WHERE ${e.sql} AND type='page_view'`,
      e.args,
    ),
    inquiriesByStatus: await rows(
      env,
      `SELECT status,COUNT(*) total FROM inquiries i WHERE ${i.sql} GROUP BY status`,
      i.args,
    ),
  };
  return json({
    mode: "detailed",
    range,
    current,
    previous,
    trend: await trend(range.start, range.end),
    previousTrend: await trend(range.previousStart, range.previousEnd),
    breakdowns,
    pages,
    products,
    checks,
    scope:
      "默认记录同一浏览器的页面与点击过程；访客数是浏览器编号数，不是精确人数。关闭统计或启用 DNT/GPC 的访问不采集。询盘按服务端保存记录统计；默认排除内部测试及已识别机器人。",
  });
}
export async function options(env: Env) {
  const data: Record<string, unknown> = { products: catalog };
  for (const field of ["source", "country", "language", "channel", "device"])
    data[field] = await rows(
      env,
      `SELECT DISTINCT value FROM (SELECT COALESCE(NULLIF(${field},''),'unknown') value FROM events WHERE internal=0 UNION SELECT COALESCE(NULLIF(${field},''),'unknown') value FROM inquiries WHERE internal=0 UNION SELECT COALESCE(NULLIF(${field},''),'unknown') value FROM analytics_totals WHERE internal=0) ORDER BY value LIMIT 300`,
    );
  data.destinations = await rows(
    env,
    "SELECT DISTINCT destination_country value FROM inquiries ORDER BY value LIMIT 300",
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
  const filter = conditions(url, "e", period(url)),
    page = Math.max(1, Number(url.searchParams.get("p")) || 1),
    limit = 20;
  const total = await count(
    env,
    `SELECT COUNT(DISTINCT visitor_id) total FROM events e WHERE ${filter.sql}`,
    filter.args,
  );
  const items = await rows(
    env,
    `WITH eligible AS (SELECT e.*,ROW_NUMBER() OVER(PARTITION BY visitor_id ORDER BY created_at DESC,id DESC) recency FROM events e WHERE ${filter.sql}) SELECT visitor_id id,MIN(created_at) first_seen,MAX(created_at) last_seen,COUNT(DISTINCT visit_id) visits,SUM(type='page_view') views,MAX(is_returning) is_returning,MAX(CASE WHEN recency=1 THEN country END) country,MAX(CASE WHEN recency=1 THEN source END) source,MAX(CASE WHEN recency=1 THEN device END) device,(SELECT COUNT(*) FROM inquiries i WHERE i.visitor_id=e.visitor_id) inquiries FROM eligible e GROUP BY visitor_id ORDER BY last_seen DESC,id DESC LIMIT ? OFFSET ?`,
    [...filter.args, limit, (page - 1) * limit],
  );
  return json({ items, total, page, pageSize: limit });
}
export async function journey(env: Env, id: string, url: URL) {
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
export async function internalBrowser(context: Context, user: Actor) {
  const body = await readJson(context.request, 1000);
  if (typeof body.excluded !== "boolean")
    throw new HttpError(400, "internal", "设置不正确。");
  await audit(context.env, user, "internal_browser", String(body.excluded));
  return withCookies(json({ excluded: body.excluded }), [
    body.excluded
      ? await makeCookie(
          context.request,
          context.env,
          "lzz_internal",
          "yes",
          30 * 86400,
        )
      : setCookie(context.request, "lzz_internal", "", 0),
    setCookie(context.request, "lzz_visitor", "", 0),
    setCookie(context.request, "lzz_visit", "", 0),
  ]);
}
