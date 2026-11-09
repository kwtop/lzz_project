import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { pbkdf2Sync, randomUUID } from "node:crypto";
import { build } from "esbuild";
import { Miniflare, convertV4MiniflareOptions } from "miniflare";
import { schemaSql } from "./helpers/schema.mjs";

test("aggregate API stores counters only and the admin reconciles them", async (t) => {
  const root = path.resolve(import.meta.dirname, "..");
  const bundled = await build({
    stdin: { contents: "import {handleApi} from './server/index.ts';export default {fetch(request,env,ctx){return handleApi({request,env,waitUntil:ctx.waitUntil.bind(ctx)})}}", resolveDir: root },
    bundle: true, write: false, format: "esm", platform: "browser", target: "es2022",
  });
  const password = "aggregate-test-only-password", salt = Buffer.alloc(16, 7);
  const hash = ["pbkdf2-sha256", "100000", salt.toString("base64"), pbkdf2Sync(password,salt,100000,32,"sha256").toString("base64")].join("$");
  const mf = new Miniflare(convertV4MiniflareOptions({
    modules: true, script: bundled.outputFiles[0].text, compatibilityDate: "2026-10-01", cf: false,
    d1Databases: ["DB"], r2Buckets: ["FILES"],
    bindings: { ANALYTICS_MODE: "aggregate", TOKEN_SECRET: "aggregate-test-only-secret-at-least-32-characters", LOCAL_DEVELOPMENT: "true",
      ADMIN_USERNAME: "admin", ADMIN_PASSWORD_HASH: hash, INTERNAL_IPS: "203.0.113.9" },
  }));
  const adminCookies = new Map();
  const send = async (route, body, headers = {}, admin = false) => {
    const response = await mf.dispatchFetch("http://localhost" + route, {
      method: body === undefined ? "GET" : "POST",
      headers: { Origin: "http://localhost", "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) PRIVATE_UA", "Cf-Connecting-IP": "198.51.100.24",
        ...(admin ? { Cookie: [...adminCookies].map(([k,v])=>k+"="+v).join("; ") } : {}), ...headers },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    });
    if (admin) for (const item of response.headers.getSetCookie()) {
      const [key,value] = item.split(";")[0].split("="); adminCookies.set(key,value);
    }
    return response;
  };
  const product = JSON.parse(fs.readFileSync(root + "/server/catalog.generated.json","utf8"))[0];
  const page = "/machined-parts/gallery/"+product.id+"/";
  const event = type => ({ type, page, product: product.id, language:"en", position:"main" });
  try {
    const db = await mf.getD1Database("DB");
    await db.batch(schemaSql(root).split(";").map(sql=>sql.trim()).filter(Boolean).map(sql=>db.prepare(sql)));
    const sum = async () => (await db.prepare("SELECT COALESCE(SUM(count),0) total FROM analytics_totals").first()).total;
    await t.test("explicit aggregate mode cannot create legacy cookies or visitor records", async () => {
      assert.equal((await (await send("/api/config")).json()).analyticsMode,"aggregate");
      const consent = await send("/api/analytics/consent", { granted:true, page, language:"en" });
      assert.deepEqual(await consent.json(),{enabled:false,mode:"aggregate"});
      assert.ok(consent.headers.getSetCookie().every(cookie=>cookie.includes("Max-Age=0")));
      const legacy = await send("/api/events", {events:[{...event("page_view"),id:randomUUID()}]});
      assert.equal((await legacy.json()).accepted,0);
    });
    await t.test("same dimensions merge atomically, arbitrary fields are discarded", async () => {
      const input = { events:[event("page_view"),event("page_view"),event("quote_click"),event("product_view")], source:"google", channel:"paid_search",
        visitorId:"PRIVATE_VISITOR", referrer:"https://example.invalid/PRIVATE_REFERRER", rawIp:"PRIVATE_IP" };
      const response = await send("/api/analytics/aggregate",input);
      assert.equal(response.status,200); assert.deepEqual(await response.json(),{accepted:4,aggregate:true});
      assert.equal(response.headers.getSetCookie().length,0);
      const repeated = await send("/api/analytics/aggregate",input);
      assert.equal((await repeated.json()).accepted,4);
      assert.equal(await sum(),8);
      const rows = (await db.prepare("SELECT * FROM analytics_totals").all()).results;
      assert.equal(rows.length,3); assert.equal(rows.find(row=>row.type==="page_view").count,4);
      assert.ok(rows.every(row=>row.created_at%3600000===0 && row.country==="unknown" && row.device==="desktop"));
      assert.ok(!JSON.stringify(rows).includes("PRIVATE_") && !JSON.stringify(rows).includes("198.51.100.24"));
      for (const table of ["visitors","visits","events"])
        assert.equal((await db.prepare(`SELECT COUNT(*) total FROM ${table}`).first()).total,0);
      const limited = await send("/api/analytics/aggregate", {events:[{...event("email_click"),product:"PRIVATE_PRODUCT",position:"PRIVATE_POSITION",language:"PRIVATE_LANGUAGE"}],source:"PRIVATE_SOURCE",channel:"PRIVATE_CHANNEL"});
      assert.equal(limited.status,200);
      const fallback = await db.prepare("SELECT * FROM analytics_totals WHERE type='email_click'").first();
      assert.equal(fallback.source,"unknown"); assert.equal(fallback.position,"unknown"); assert.equal(fallback.language,"unknown");
      assert.equal(fallback.product,product.id);
    });
    await t.test("invalid page, server-only event and cross-origin batches never increment", async () => {
      const before = await sum();
      for (const events of [[],Array(21).fill(event("page_view")),[{...event("page_view"),type:"inquiry_success"}],
        [event("page_view"),{...event("page_view"),page:"/admin/"}],
        [{...event("page_view"),page:"/made-up-person-PRIVATE/"}],
        [{...event("page_view"),page:page+"?email=PRIVATE"}]])
        assert.equal((await send("/api/analytics/aggregate",{events})).status,400);
      assert.equal((await send("/api/analytics/aggregate",{events:[event("page_view")]},{Origin:"https://other.invalid"})).status,403);
      assert.equal(await sum(),before);
    });
    await t.test("privacy signals and identified bots never create totals", async () => {
      const before = await sum();
      for (const headers of [{DNT:"1"},{"Sec-GPC":"1"},{"User-Agent":"Googlebot/2.1"}]) {
        const response = await send("/api/analytics/aggregate",{events:[event("page_view")]},headers);
        assert.equal(response.status,202); assert.equal((await response.json()).accepted,0);
      }
      assert.equal(await sum(),before);
    });
    await t.test("admin totals, trend, rankings and filters agree; internal counters stay separate", async () => {
      assert.equal((await send("/api/admin/stats")).status,401);
      assert.equal((await send("/api/admin/login",{username:"admin",password},{},true)).status,200);
      assert.equal((await send("/api/analytics/aggregate",{events:[event("page_view")],source:"google",channel:"paid_search"},{"Cf-Connecting-IP":"203.0.113.9"})).status,200);
      const normal = await (await send("/api/admin/stats",undefined,{},true)).json();
      assert.equal(normal.mode,"aggregate"); assert.equal(normal.current.pageViews,4); assert.equal(normal.current.productViews,2);
      assert.equal(normal.current.contactClicks,3); assert.equal(normal.current.quoteClicks,2); assert.equal(normal.current.emailClicks,1);
      assert.equal(normal.current.visitors,undefined); assert.equal(normal.current.returningVisitors,undefined);
      assert.equal(normal.pages.reduce((sum,row)=>sum+row.views,0),normal.current.pageViews);
      assert.equal(normal.trend.reduce((sum,row)=>sum+row.pageViews,0),normal.current.pageViews);
      assert.equal(normal.breakdowns.country.reduce((sum,row)=>sum+row.views,0),normal.checks.pageViewsByCountry);
      const included = await (await send("/api/admin/stats?internal=1",undefined,{},true)).json();
      assert.equal(included.current.pageViews,5);
      const query = new URLSearchParams({source:"google",product:product.id,language:"en",device:"desktop",channel:"paid_search",country:"unknown"});
      const filtered = await (await send("/api/admin/stats?"+query,undefined,{},true)).json();
      assert.equal(filtered.current.pageViews,4); assert.equal(filtered.current.emailClicks,0);
      const options = await (await send("/api/admin/options",undefined,{},true)).json();
      assert.ok(options.source.some(row=>row.value==="google"));
      const historical = await (await send("/api/admin/visitors",undefined,{},true)).json();
      assert.equal(historical.total,0);
    });
  } finally { await mf.dispose(); }
});
