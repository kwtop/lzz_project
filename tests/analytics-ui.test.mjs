import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { setTimeout as pause } from "node:timers/promises";
import { build } from "esbuild";
import { Miniflare, convertV4MiniflareOptions } from "miniflare";
import { JSDOM } from "jsdom";
import { schemaSql } from "./helpers/schema.mjs";

for (const testMode of ["detailed", "aggregate"]) test(`frontend ${testMode} mode, opt-out and privacy signals use real D1`, async (t) => {
  const root = path.resolve(import.meta.dirname, "..");
  const output = path.join(root, ".wrangler", "ui-component-test");
  fs.mkdirSync(output, { recursive: true });
  const compiled = path.join(output, `siteAnalytics-${testMode}.mjs`);
  await build({ entryPoints: [path.join(root, "src/lib/siteAnalytics.ts")], outfile: compiled,
    bundle: true, format: "esm", platform: "node" });
  const worker = await build({
    stdin: { contents: "import {handleApi} from './server/index.ts';export default {fetch(request,env,ctx){return handleApi({request,env,waitUntil:ctx.waitUntil.bind(ctx)})}}", resolveDir: root },
    bundle: true, write: false, format: "esm", platform: "browser", target: "es2022",
  });
  const mf = new Miniflare(convertV4MiniflareOptions({
    modules: true, script: worker.outputFiles[0].text, compatibilityDate: "2026-10-01", cf: false,
    d1Databases: ["DB"], r2Buckets: ["FILES"],
    bindings: { ...(testMode === "aggregate" ? { ANALYTICS_MODE: "aggregate" } : {}), TOKEN_SECRET: "analytics-component-test-secret-more-than-32-characters", LOCAL_DEVELOPMENT: "true" },
  }));
  const product = JSON.parse(fs.readFileSync(root + "/server/catalog.generated.json", "utf8"))[0];
  const page = "/machined-parts/gallery/" + product.id + "/";
  const nativeRequest = globalThis.Request, nativeFetch = globalThis.fetch;
  const until = async (predicate) => {
    for (let i = 0; i < 80; i++) { if (await predicate()) return; await pause(50); }
    throw Error("Timed out waiting for aggregate analytics");
  };
  let sequence = 0;
  async function browser(options, callback) {
    const dom = new JSDOM(`<!doctype html><html lang="en"><head>${options.noindex ? '<meta name="robots" content="noindex,nofollow">' : ""}</head><body>
      <aside data-analytics-consent hidden>Legacy banner</aside>
      <button data-analytics-allow>Enable anonymous totals</button><button data-analytics-deny>Turn off analytics</button>
      <p data-analytics-privacy-status role="status"></p>
      <header class="site-header"><a id="quote" href="/quote/?product=${product.id}">Quote</a></header>
      <main><a id="email" href="mailto:qa@example.invalid">Email</a><a id="whatsapp" href="https://wa.me/1234567890">WhatsApp</a>
      <a id="download" href="/downloads/test.txt" download>Download</a><details id="equipment-review"><summary>Equipment</summary></details>
      <details id="faq"><summary>FAQ</summary></details><form class="inquiry-form"><input id="customer-name" name="name"></form></main></body></html>`, {
      url: "http://localhost" + (options.page || page) + "?utm_source=google&utm_medium=cpc&utm_term=PRIVATE_SEARCH_TERM",
      referrer: "https://www.google.com/search?q=PRIVATE_REFERRER_QUERY", pretendToBeVisual: true,
    });
    if (options.preference) dom.window.localStorage.setItem("lzz.analytics.consent", options.preference);
    if (options.dnt) Object.defineProperty(dom.window.navigator, "doNotTrack", { value: "1" });
    if (options.gpc) Object.defineProperty(dom.window.navigator, "globalPrivacyControl", { value: true });
    const saved = new Map(), requests = [], cookies = new Map();
    let loseNextEventResponse = false;
    for (const name of ["window", "document", "location", "navigator", "localStorage", "Element", "HTMLDetailsElement"]) {
      saved.set(name, Object.getOwnPropertyDescriptor(globalThis, name));
      Object.defineProperty(globalThis, name, { value: dom.window[name], configurable: true, writable: true });
    }
    globalThis.fetch = async (route, init = {}) => {
      const headers = new Headers(init.headers);
      headers.set("Origin", "http://localhost"); headers.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0)");
      if (cookies.size) headers.set("Cookie", [...cookies].map(([k,v]) => k+"="+v).join("; "));
      const request = new nativeRequest("http://localhost" + route, { ...init, headers });
      const body = request.method === "GET" ? undefined : await request.arrayBuffer();
      const record = { route, body: body ? new TextDecoder().decode(body) : "", status: null };
      requests.push(record);
      const response = await mf.dispatchFetch(request.url, { method: request.method, headers: Object.fromEntries(request.headers), body });
      for (const item of response.headers.getSetCookie()) {
        const [key, value] = item.split(";")[0].split("=");
        if (/Max-Age=0(?:;|$)/.test(item)) cookies.delete(key); else cookies.set(key, value);
      }
      record.status = response.status;
      if (route === "/api/events" && loseNextEventResponse) {
        loseNextEventResponse = false;
        throw Error("Synthetic lost event receipt");
      }
      return response;
    };
    document.addEventListener("click", event => event.preventDefault());
    try {
      const analytics = await import(pathToFileURL(compiled).href + "?scenario=" + (++sequence));
      await callback({ dom, requests, cookies, loseNextResponse: () => { loseNextEventResponse = true; }, ...analytics });
      document.querySelector("[data-analytics-deny]").click();
      await pause(170);
    } finally {
      globalThis.fetch = nativeFetch;
      for (const [name, descriptor] of saved) {
        if (descriptor) Object.defineProperty(globalThis, name, descriptor); else delete globalThis[name];
      }
      dom.window.close();
    }
  }
  try {
    const db = await mf.getD1Database("DB");
    await db.batch(schemaSql(root).split(";").map(sql => sql.trim()).filter(Boolean).map(sql => db.prepare(sql)));
    const total = async () => (await db.prepare(testMode === "detailed" ? "SELECT COUNT(*) total FROM events" : "SELECT COALESCE(SUM(count),0) total FROM analytics_totals").first()).total;
    await t.test("fresh browser starts immediately without a banner", async () => {
      await browser({}, async ({ dom, requests, cookies, loseNextResponse, initSiteAnalytics, trackEvent, inquiryAttribution }) => {
        initSiteAnalytics(); initSiteAnalytics();
        await until(async () => await total() === 2);
        assert.equal(document.querySelector("[data-analytics-consent]").hidden, true);
        assert.equal(localStorage.length, 0);
        assert.equal(cookies.size, testMode === "detailed" ? 2 : 0);
        assert.equal(inquiryAttribution().analyticsEnabled, testMode === "detailed");
        assert.ok(!requests.some(row => row.route === "/api/analytics/consent"));
        assert.ok(!requests.some(row => row.body.includes('"granted":true')));
        const input = document.querySelector("#customer-name"); input.value = "PRIVATE_TYPED_TEXT";
        for (let i=0;i<3;i++) input.dispatchEvent(new dom.window.FocusEvent("focusin", { bubbles: true }));
        input.dispatchEvent(new dom.window.Event("input", { bubbles: true }));
        for (const id of ["quote", "email", "whatsapp", "download"]) document.getElementById(id).click();
        document.getElementById("equipment-review").open = true; document.getElementById("faq").open = true;
        trackEvent("image_view", { position: "image-viewer", resource: "/images/reference-part.jpg" });
        await until(async () => await total() === 9);
        const rows = (await db.prepare(testMode === "detailed" ? "SELECT * FROM events" : "SELECT * FROM analytics_totals").all()).results;
        for (const type of ["page_view", "product_view", "form_start", "quote_click", "email_click", "whatsapp_click", "download_click", "parameters_expand", "image_view"])
          assert.equal(rows.filter(row => row.type === type).reduce((sum,row)=>sum+(testMode === "detailed" ? 1 : row.count),0), 1, type);
        assert.ok(rows.every(row=>row.product===product.id && row.source==="google" && row.channel==="paid_search" && row.country==="unknown"));
        assert.equal(rows.find(row=>row.type==="quote_click").position, "header");
        assert.equal(rows.find(row=>row.type==="image_view").position, "image-viewer");
        if (testMode === "aggregate") {
          assert.ok(rows.every(row=>row.created_at%3600000===0));
          for (const table of ["visitors", "visits", "events"])
            assert.equal((await db.prepare(`SELECT COUNT(*) total FROM ${table}`).first()).total,0);
          assert.ok(!JSON.stringify(rows).includes("visitor_id"));
        } else {
          assert.equal((await db.prepare("SELECT COUNT(*) total FROM visitors").first()).total,1);
          assert.equal(new Set(rows.map(row=>row.visitor_id)).size,1);
          await db.prepare("UPDATE visits SET last_seen=?").bind(Date.now()-31*60000).run();
        }
        const payloads = requests.filter(row=>row.route===(testMode === "detailed" ? "/api/events" : "/api/analytics/aggregate"));
        assert.ok(payloads.every(row=>row.status===200));
        assert.ok(!JSON.stringify(payloads).includes("PRIVATE_"));
        assert.ok(!JSON.stringify(requests).includes("PRIVATE_"));
        dom.reconfigure({ url: "http://localhost/quote/?product=" + product.id });
        trackEvent("form_error", { position: "quote-form", errorCode: "validation" });
        await until(async () => await total() === 10);
        let expected = 10;
        if (testMode === "detailed") {
          const visits = (await db.prepare("SELECT * FROM visits ORDER BY started_at").all()).results;
          assert.equal(visits.length,2); assert.equal(visits[1].is_returning,1);
          assert.equal(new Set(visits.map(row=>row.visitor_id)).size,1);
          const firstVisitor = rows[0].visitor_id;
          const formError = await db.prepare("SELECT * FROM events WHERE type='form_error'").first();
          assert.equal(formError.visitor_id,firstVisitor); assert.equal(formError.page,"/quote/");
          // The server saves this event but its first response is lost.
          loseNextResponse(); trackEvent("image_view", { position:"image-viewer" });
          await until(async () => await total() === 11); await pause(170);
          const beforeRequests = requests.filter(row=>row.route==="/api/events").length;
          window.dispatchEvent(new dom.window.Event("online"));
          await until(()=>requests.filter(row=>row.route==="/api/events").length > beforeRequests);
          await pause(150); assert.equal(await total(),11); expected = 11;
        }
        trackEvent("email_click"); document.querySelector("[data-analytics-deny]").click();
        await until(()=>requests.some(row=>row.route==="/api/analytics/session" && row.body.includes('"enabled":false') && row.status===200));
        trackEvent("email_click"); await pause(220);
        assert.equal(await total(),expected);
        assert.equal(localStorage.getItem("lzz.analytics.consent"),"no");
        assert.match(document.querySelector("[role=status]").textContent,/off/);
        document.querySelector("[data-analytics-allow]").click();
        await until(async () => await total() === expected+1);
        assert.equal(cookies.size,testMode === "detailed" ? 2 : 0);
        window.dispatchEvent(new dom.window.StorageEvent("storage", { key: "lzz.analytics.consent", newValue: "no" }));
        trackEvent("email_click"); await pause(220); assert.equal(await total(),expected+1);
      });
    });
    for (const options of [{ preference:"no" }, { dnt:true }, { gpc:true }, { page:"/admin/" }, { noindex:true }])
      await t.test("suppressed collection " + JSON.stringify(options), async () => {
        const before = await total();
        await browser(options, async ({requests, initSiteAnalytics, trackEvent}) => {
          initSiteAnalytics(); trackEvent("email_click"); await pause(220);
          assert.equal(requests.length,0); assert.equal(await total(),before);
          if (options.dnt || options.gpc) {
            const enable = document.querySelector("[data-analytics-allow]");
            assert.equal(enable.disabled,true); enable.click(); await pause(150); assert.equal(requests.length,0);
          }
        });
      });
  } finally {
    await mf.dispose();
    if (fs.existsSync(compiled)) fs.unlinkSync(compiled);
  }
});
