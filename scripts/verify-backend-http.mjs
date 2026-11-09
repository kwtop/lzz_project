// Local-only smoke test. Creates one explicitly marked internal QA inquiry.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { randomUUID, createHash } from "node:crypto";

const root = path.resolve(import.meta.dirname, ".."),
  base = new URL(process.env.LZZ_LOCAL_URL || "http://127.0.0.1:8788");
assert.ok(
  ["127.0.0.1", "localhost", "[::1]"].includes(base.hostname),
  "This test only runs against a loopback service.",
);
const credentials = fs.readFileSync(
    path.join(root, ".local-admin-login.txt"),
    "utf8",
  ),
  username = credentials.match(/用户名：([^\r\n]+)/)?.[1],
  password = credentials.match(/密码：([^\r\n]+)/)?.[1];
assert.ok(
  username && password,
  "Local credentials are missing. Run setup:backend.",
);
const cookies = new Map();
async function send(
  route,
  { method = "GET", body, headers = {}, anonymous = false } = {},
) {
  const values = new Headers(headers);
  values.set("Origin", base.origin);
  values.set("User-Agent", "LOCAL-QA-HTTP/1.0");
  if (!anonymous && cookies.size)
    values.set(
      "Cookie",
      [...cookies].map(([name, value]) => name + "=" + value).join("; "),
    );
  if (body !== undefined && !(body instanceof FormData)) {
    values.set("Content-Type", "application/json");
    body = JSON.stringify(body);
  }
  const response = await fetch(new URL(route, base), {
    method,
    headers: values,
    body,
    signal: AbortSignal.timeout(15000),
  });
  if (!anonymous)
    for (const item of response.headers.getSetCookie()) {
      const [name, value] = item.split(";")[0].split("=");
      if (/Max-Age=0(?:;|$)/.test(item)) cookies.delete(name);
      else cookies.set(name, value);
    }
  return response;
}
const config = await (await send("/api/config")).json();
assert.equal(config.local, true);
assert.equal(config.connected, true);
const aggregate = config.analyticsMode === "aggregate";
const analysisSource = aggregate ? "newsletter" : "local-qa";
for (const route of [
  "/api/admin/inquiries",
  "/api/admin/inquiries/export",
  "/api/admin/visitors",
  "/api/admin/stats",
]) {
  const response = await send(route, { anonymous: true });
  assert.equal(response.status, 401);
  assert.equal(response.headers.get("cache-control"), "no-store");
}
const catalog = JSON.parse(
    fs.readFileSync(path.join(root, "server/catalog.generated.json"), "utf8"),
  ),
  product = catalog[0],
  page = "/machined-parts/gallery/" + product.id + "/",
  run = randomUUID(),
  name = "LOCAL QA HTTP " + run.slice(0, 8);
// Mark this synthetic browser internal before it sends totals or an inquiry.
const login = await send("/api/admin/login", {
  method: "POST",
  body: { username, password },
});
assert.equal(login.status, 200);
const session = await login.json();
const beforeExcluded = await (await send("/api/admin/stats?source=" + analysisSource)).json();
const beforeIncluded = await (await send("/api/admin/stats?source=" + analysisSource + "&internal=1")).json();
const browserSession = await (
  await send("/api/analytics/session", {
    method: "POST",
    body: {
      page,
      language: "en",
      utmSource: "local-qa",
      utmMedium: "test",
    },
  })
).json();
assert.equal(browserSession.enabled, true);
const events = ["page_view", "product_view", "whatsapp_click"].map((type) => ({
  ...(!aggregate ? { id: randomUUID() } : {}),
  type,
  page,
  product: product.id,
  language: "en",
  position: "main",
}));
const eventRoute = aggregate ? "/api/analytics/aggregate" : "/api/events";
const eventBatch = { events, source: analysisSource, channel: "email" };
const first = await (
    await send(eventRoute, { method: "POST", body: eventBatch })
  ).json(),
  repeated = await (
    await send(eventRoute, { method: "POST", body: eventBatch })
  ).json();
assert.equal(first.accepted, 3);
assert.equal(repeated.accepted, aggregate ? 3 : 0);
const input = {
  analyticsEnabled: !aggregate,
  utmSource: analysisSource,
  utmMedium: "email",
  fields: {
    name,
    company: "LOCAL QA — not a customer",
    country: "Germany",
    method: "email",
    email: "local-backend-http@example.invalid",
    phone: "",
    partType: "blocks",
    processes: ["milling"],
    message:
      "LOCAL QA " + run + " — persistent local backend verification only.",
  },
  product: product.id,
  interest: product.name,
  context: { source: page, part: product.name },
  page: "/quote/",
  language: "en",
};
const bytes = "%PDF-1.4\nLOCAL QA " + run + "\n";
const form = () => {
  const data = new FormData();
  data.append("payload", JSON.stringify(input));
  data.append(
    "attachments",
    new File([bytes], "LOCAL-QA.pdf", { type: "application/pdf" }),
  );
  return data;
};
const key = randomUUID(),
  response = await send("/api/inquiries", {
    method: "POST",
    body: form(),
    headers: { "Idempotency-Key": key },
  });
assert.equal(response.status, 200);
const receipt = await response.json();
assert.equal(receipt.status, "sent");
const duplicate = await (
  await send("/api/inquiries", {
    method: "POST",
    body: form(),
    headers: { "Idempotency-Key": key },
  })
).json();
assert.equal(duplicate.reference, receipt.reference);
assert.equal(duplicate.duplicate, true);
const authHeaders = { "X-LZZ-CSRF": session.csrf },
  query = new URLSearchParams({ q: name, internal: "1" });
const list = await (await send("/api/admin/inquiries?" + query)).json();
assert.equal(list.total, 1);
assert.equal(list.items[0].id, receipt.reference);
assert.equal(list.items[0].internal, 1);
const detail = await (
  await send("/api/admin/inquiries/" + receipt.reference)
).json();
assert.equal(detail.inquiry.name, name);
assert.equal(detail.inquiry.visitor_id, aggregate ? null : browserSession.visitorId);
assert.equal(detail.inquiry.source_page, page);
assert.equal(detail.inquiry.language, "en");
assert.equal(detail.files.length, 1);
assert.equal(
  (await send("/api/admin/files/" + detail.files[0].id, { anonymous: true }))
    .status,
  401,
);
const attachment = await send("/api/admin/files/" + detail.files[0].id);
assert.equal(attachment.status, 200);
assert.equal(await attachment.text(), bytes);
assert.ok(attachment.headers.get("content-disposition").includes("attachment"));
assert.equal(
  (
    await send("/api/admin/inquiries/" + receipt.reference, {
      method: "PATCH",
      body: { status: "completed", unread: false },
      headers: authHeaders,
    })
  ).status,
  200,
);
assert.equal(
  (
    await send("/api/admin/inquiries/" + receipt.reference + "/notes", {
      method: "POST",
      body: { content: "本地 HTTP 入库、附件、权限和统计验证。仅供本地测试。" },
      headers: authHeaders,
    })
  ).status,
  201,
);
const saved = await (
  await send("/api/admin/inquiries/" + receipt.reference)
).json();
assert.equal(saved.inquiry.status, "completed");
assert.equal(saved.inquiry.unread, 0);
assert.equal(saved.notes.length, 1);
const exported = await send("/api/admin/inquiries/export?" + query);
assert.equal(exported.status, 200);
assert.ok((await exported.text()).includes(name));
if (!aggregate) {
const journey = await (
  await send("/api/admin/visitors/" + browserSession.visitorId)
).json();
assert.ok(journey.inquiries.some((item) => item.id === receipt.reference));
assert.equal(
  journey.events.filter((item) => item.type === "inquiry_success").length,
  1,
);
assert.equal(
  journey.events.filter((item) => item.type === "whatsapp_click").length,
  1,
);
}
const excluded = await (await send("/api/admin/stats?source=" + analysisSource)).json(),
  included = await (
    await send("/api/admin/stats?source=" + analysisSource + "&internal=1")
  ).json();
assert.equal(excluded.current.inquiries, beforeExcluded.current.inquiries);
assert.equal(excluded.current.pageViews, beforeExcluded.current.pageViews);
assert.ok(included.current.inquiries >= beforeIncluded.current.inquiries + 1);
assert.ok(included.current.pageViews >= beforeIncluded.current.pageViews + 1);
const html = await send("/admin/");
assert.equal(html.status, 200);
const text = await html.text();
assert.match(text, /<html lang="zh-CN"/);
assert.match(text, /noindex, nofollow/);
assert.ok(!text.includes(name));
assert.match(html.headers.get("cache-control"), /no-store/);
assert.equal(html.headers.get("x-frame-options"), "DENY");
const publicChecks = [];
for (const route of ["/", "/quote/", "/factory/", "/resources/faq/", page]) {
  const result = await send(route);
  assert.equal(result.status, 200, route);
  publicChecks.push({ route, status: result.status });
}
assert.equal(
  (
    await send("/api/admin/logout", {
      method: "POST",
      body: {},
      headers: authHeaders,
    })
  ).status,
  200,
);
assert.equal((await send("/api/admin/inquiries/export")).status, 401);
const report = {
  status: "passed",
  localOnly: true,
  base: base.origin,
  at: new Date().toISOString(),
  inquiryReference: receipt.reference,
  analyticsMode: config.analyticsMode,
  anonymousVisitor: browserSession.visitorId || null,
  internal: true,
  duplicateReference: duplicate.reference,
  fileSha256: createHash("sha256").update(bytes).digest("hex"),
  events: { accepted: first.accepted, duplicateAccepted: repeated.accepted },
  checks: [
    "real HTTP inquiry + private attachment",
    "same request key deduplicated",
    "authenticated list/detail/notes/status/export",
    aggregate ? "aggregate totals without visitor or inquiry association" : "anonymous journey linked",
    "internal QA excluded",
    "unauthenticated data/export/file denied",
    "logout revoked",
    "admin noindex + no-store + anti-framing",
  ],
  publicChecks,
};
if (process.env.LZZ_QA_REPORT)
  fs.writeFileSync(
    process.env.LZZ_QA_REPORT,
    JSON.stringify(report, null, 2) + "\n",
  );
console.log(JSON.stringify(report, null, 2));
