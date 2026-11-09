import type { Context } from "./types";
import { publicEventTypes } from "./types";
import { assertOrigin, HttpError, json, language, productOnPage, readJson, routePath } from "./http";
import { internal, knownBot, rateLimit, signedCookie } from "./security";
import { country, device } from "./analytics";
import catalog from "./catalog.generated.json";
import publicPages from "./public-pages.generated.json";

const pages = new Set(publicPages);
const products = new Set(catalog.map(item => item.id));
const positions = new Set(["header", "footer", "main", "hero", "quote-form", "parameters", "gallery", "image-viewer"]);
const sources = new Set(["google", "bing", "yandex", "baidu", "duckduckgo", "yahoo", "facebook", "instagram", "linkedin", "youtube", "reddit", "tiktok", "x", "twitter", "chatgpt", "perplexity", "claude", "gemini", "email", "newsletter", "referral", "campaign", "unknown"]);
const channels = new Set(["paid_search", "paid_social", "organic_search", "social", "email", "referral", "campaign", "unknown"]);

export async function recordAggregate({ request, env }: Context) {
  assertOrigin(request);
  if (knownBot(request) || request.headers.get("dnt") === "1" || request.headers.get("sec-gpc") === "1" ||
      (await signedCookie(request, env, "lzz_analytics_off")) === "yes")
    return json({ accepted: 0, ignored: true }, 202);
  const body = await readJson(request, 12000);
  if (!Array.isArray(body.events) || body.events.length < 1 || body.events.length > 20)
    throw new HttpError(400, "events", "每批需要 1–20 个统计事件。");
  const source = typeof body.source === "string" && sources.has(body.source) ? body.source : "unknown";
  const channel = typeof body.channel === "string" && channels.has(body.channel) ? body.channel : "unknown";
  const bucket = Math.floor(Date.now() / 3600000) * 3600000;
  const excluded = Number(await internal(request, env));
  const totals = new Map<string, { values: (string | number)[]; count: number }>();
  for (const event of body.events) {
    if (!event || typeof event !== "object" || !publicEventTypes.includes(event.type))
      throw new HttpError(400, "event_type", "不支持的统计事件。");
    const page = routePath(event.page);
    if (!page || !pages.has(page)) throw new HttpError(400, "page", "页面地址不正确。");
    const candidate = productOnPage(page) || event.product;
    const product = products.has(candidate) ? candidate : "";
    const position = positions.has(event.position) ? event.position : "unknown";
    const values = [bucket, event.type, page, product, language(event.language), position, source, channel, country(request), device(request), excluded];
    const key = JSON.stringify(values);
    const prior = totals.get(key);
    if (prior) prior.count++;
    else totals.set(key, { values, count: 1 });
  }
  await rateLimit(request, env, "aggregate", 120, 60);
  await env.DB.batch([...totals.values()].map(total => env.DB.prepare(
    "INSERT INTO analytics_totals(created_at,type,page,product,language,position,source,channel,country,device,internal,count) VALUES(?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(created_at,type,page,product,language,position,source,channel,country,device,internal) DO UPDATE SET count=count+excluded.count"
  ).bind(...total.values, total.count)));
  return json({ accepted: body.events.length, aggregate: true });
}
