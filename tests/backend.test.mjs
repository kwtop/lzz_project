import { schemaSql } from "./helpers/schema.mjs";
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { randomBytes, pbkdf2Sync, randomUUID } from "node:crypto";
import { build } from "esbuild";
import { Miniflare, convertV4MiniflareOptions } from "miniflare";
import { generateKeyPair, exportJWK, SignJWT } from "jose";

const root = path.resolve(import.meta.dirname, "..");
const bundled = await build({
  stdin: {
    contents:
      "import {handleApi} from './server/index.ts';export default {fetch(request,env,ctx){return handleApi({request,env,waitUntil:ctx.waitUntil.bind(ctx)})}}",
    resolveDir: root,
  },
  bundle: true,
  write: false,
  format: "esm",
  platform: "browser",
  target: "es2022",
});
const password = "integration-only-password-not-a-live-credential",
  salt = randomBytes(16);
const hash = [
  "pbkdf2-sha256",
  "100000",
  salt.toString("base64"),
  pbkdf2Sync(password, salt, 100000, 32, "sha256").toString("base64"),
].join("$");
const schema = schemaSql(root);
const products = JSON.parse(
  fs.readFileSync(root + "/server/catalog.generated.json", "utf8"),
);
class Jar {
  values = new Map();
  header() {
    return [...this.values].map(([key, value]) => key + "=" + value).join("; ");
  }
  receive(response) {
    for (const entry of response.headers.getSetCookie()) {
      const [key, value] = entry.split(";")[0].split("=");
      if (/Max-Age=0(?:;|$)/.test(entry)) this.values.delete(key);
      else this.values.set(key, value);
    }
  }
}
test("Cloudflare runtime: persisted inquiries, R2, auth, deduplication and analytics", async (t) => {
  const qaRoot = path.resolve(root, "..", "..", "_qa", "backend-tests");
  fs.mkdirSync(qaRoot, { recursive: true });
  const persist = fs.mkdtempSync(path.join(qaRoot, "run-"));
  let mf;
  const create = () =>
    new Miniflare(
      convertV4MiniflareOptions({
        modules: true,
        script: bundled.outputFiles[0].text,
        compatibilityDate: "2026-10-01",
        cf: false,
        d1Databases: { DB: "lzz-test-db" },
        r2Buckets: { FILES: "lzz-test-files" },
        resourcePersistencePath: persist,
        bindings: {
          ANALYTICS_MODE: "detailed",
          TOKEN_SECRET: "integration-only-secret-at-least-32-characters",
          LOCAL_DEVELOPMENT: "true",
          ADMIN_AUTH_MODE: "password",
          ADMIN_USERNAME: "admin",
          ADMIN_PASSWORD_HASH: hash,
        },
      }),
    );
  const send = async (method, route, body, jar = new Jar(), extra = {}) => {
    const headers = {
      Origin: "http://localhost",
      "User-Agent": "LocalIntegration/1.0",
      ...extra,
    };
    if (jar.header()) headers.Cookie = jar.header();
    const init = { method, headers };
    if (body !== undefined) {
      if (body instanceof FormData) init.body = body;
      else {
        headers["Content-Type"] = "application/json";
        init.body = JSON.stringify(body);
      }
    }
    if (body instanceof FormData) {
      const packed = new Request("http://localhost" + route, init);
      init.headers = Object.fromEntries(packed.headers);
      init.body = await packed.arrayBuffer();
    }
    const response = await mf.dispatchFetch("http://localhost" + route, init);
    jar.receive(response);
    return response;
  };
  const payload = (suffix = "", overrides = {}) => ({
    analyticsConsent: true,
    fields: {
      name: "Local QA Buyer",
      company: "Fixture CNC Company",
      country: "Germany",
      method: "email",
      phone: "",
      email: "qa" + suffix + "@example.invalid",
      partType: "housings",
      processes: ["milling"],
      message: "Synthetic local verification only " + suffix,
    },
    product: products[0].id,
    interest: "Fixture part",
    context: {
      part: "Fixture part",
      source: "/machined-parts/gallery/" + products[0].id + "/",
    },
    page: "/quote/",
    language: "en",
    ...overrides,
  });
  const form = (data, files = []) => {
    const body = new FormData();
    body.append("payload", JSON.stringify(data));
    for (const file of files) body.append("attachments", file, file.name);
    return body;
  };
  const admin = new Jar(),
    customer = new Jar();
  let csrf = "",
    inquiryId = "",
    fileId = "",
    visitorId = "";
  try {
    mf = create();
    let db = await mf.getD1Database("DB");
    await db.batch(
      schema
        .split(";")
        .map((v) => v.trim())
        .filter(Boolean)
        .map((sql) => db.prepare(sql)),
    );
    await t.test(
      "customer data, exports and spoofed identity are protected",
      async () => {
        for (const route of [
          "/api/admin/inquiries",
          "/api/admin/inquiries/export",
          "/api/admin/stats",
          "/api/admin/options",
          "/api/admin/visitors",
          "/api/admin/files/" + randomUUID(),
        ])
          assert.equal((await send("GET", route)).status, 401, route);
        assert.equal(
          (
            await send("GET", "/api/admin/inquiries", undefined, new Jar(), {
              "Cf-Access-Authenticated-User-Email": "owner@example.invalid",
            })
          ).status,
          401,
        );
        assert.equal(
          (
            await send(
              "POST",
              "/api/admin/login",
              { username: "admin", password },
              new Jar(),
              { Origin: "https://other.invalid" },
            )
          ).status,
          403,
        );
        assert.equal(
          (
            await send("POST", "/api/admin/login", {
              username: "admin",
              password: "bad",
            })
          ).status,
          401,
        );
        const response = await send(
          "POST",
          "/api/admin/login",
          { username: "admin", password },
          admin,
        );
        assert.equal(response.status, 200);
        csrf = (await response.json()).csrf;
        assert.equal(
          (await send("GET", "/api/admin/session", undefined, admin)).status,
          200,
        );
        assert.equal(
          (await send("GET", "/api/admin/stats", undefined, admin)).status,
          200,
        );
      },
    );
    await t.test(
      "consent, page views, contact clicks and duplicate events",
      async () => {
        const bootstrap = await send(
          "POST",
          "/api/analytics/consent",
          {
            granted: true,
            page: "/machined-parts/gallery/" + products[0].id + "/",
            language: "en",
            utmSource: "google",
            utmMedium: "cpc",
          },
          customer,
        );
        assert.equal(bootstrap.status, 200);
        visitorId = (await bootstrap.json()).visitorId;
        assert.ok(visitorId);
        const event = {
          id: randomUUID(),
          type: "page_view",
          page: "/machined-parts/gallery/" + products[0].id + "/",
          language: "en",
          position: "main",
          email: "MUST-NOT-BE-STORED@example.invalid",
        };
        assert.equal(
          (
            await (
              await send("POST", "/api/events", { events: [event] }, customer)
            ).json()
          ).accepted,
          1,
        );
        assert.equal(
          (
            await (
              await send("POST", "/api/events", { events: [event] }, customer)
            ).json()
          ).accepted,
          0,
        );
        const types = [
          "product_view",
          "quote_click",
          "whatsapp_click",
          "email_click",
          "form_start",
          "parameters_expand",
          "image_view",
          "download_click",
          "form_error",
        ];
        const response = await send(
          "POST",
          "/api/events",
          {
            events: types.map((type) => ({
              ...event,
              id: randomUUID(),
              type,
              resource: "/downloads/cnc-rfq-brief.txt",
              errorCode: type === "form_error" ? "validation" : "",
            })),
          },
          customer,
        );
        assert.equal(response.status, 200);
        assert.equal(
          (
            await send(
              "POST",
              "/api/events",
              {
                events: [
                  { ...event, id: randomUUID(), type: "inquiry_success" },
                ],
              },
              customer,
            )
          ).status,
          400,
        );
        assert.equal(
          (
            await (
              await send(
                "POST",
                "/api/events",
                { events: [{ ...event, id: randomUUID() }] },
                new Jar(),
              )
            ).json()
          ).accepted,
          0,
        );
        const stats = await (
          await send("GET", "/api/admin/stats", undefined, admin)
        ).json();
        assert.equal(stats.current.visitors, 1);
        assert.equal(stats.current.visits, 1);
        assert.equal(stats.current.pageViews, 1);
        assert.equal(stats.current.inquiries, 0);
        assert.equal(stats.current.whatsappClicks, 1);
        assert.equal(stats.current.emailClicks, 1);
        assert.equal(stats.current.contactClicks, 3);
        const saved = await db
          .prepare("SELECT * FROM events WHERE id=?")
          .bind(event.id)
          .first();
        assert.ok(!JSON.stringify(saved).includes("MUST-NOT-BE-STORED"));
        const denied = await send(
          "POST",
          "/api/analytics/consent",
          { granted: true, page: "/", language: "en" },
          new Jar(),
          { "Sec-GPC": "1" },
        );
        assert.equal((await denied.json()).enabled, false);
        const bot = await send(
          "POST",
          "/api/analytics/consent",
          { granted: true, page: "/" },
          new Jar(),
          { "User-Agent": "Googlebot" },
        );
        assert.equal((await bot.json()).enabled, false);
      },
    );
    await t.test(
      "real inquiry stored with private attachment and correct context",
      async () => {
        const response = await send(
          "POST",
          "/api/inquiries",
          form(payload(), [
            new File(["%PDF-1.4\nSynthetic QA only"], "qa-drawing.pdf", {
              type: "application/pdf",
            }),
          ]),
          customer,
          { "Idempotency-Key": randomUUID() },
        );
        const data = await response.json();
        assert.equal(response.status, 200, JSON.stringify(data));
        inquiryId = data.reference;
        assert.equal(data.status, "sent");
        const row = await db
          .prepare("SELECT * FROM inquiries WHERE id=?")
          .bind(inquiryId)
          .first();
        assert.equal(row.name, "Local QA Buyer");
        assert.equal(row.company, "Fixture CNC Company");
        assert.equal(row.email, "qa@example.invalid");
        assert.equal(row.phone, "");
        assert.equal(row.visitor_id, visitorId);
        assert.equal(row.country, "unknown");
        assert.equal(row.source, "google");
        assert.equal(row.product, products[0].id);
        assert.equal(row.language, "en");
        const details = await (
          await send(
            "GET",
            "/api/admin/inquiries/" + inquiryId,
            undefined,
            admin,
          )
        ).json();
        assert.equal(details.files.length, 1);
        fileId = details.files[0].id;
        assert.equal(
          details.inquiry.requirements,
          "Synthetic local verification only ".trim(),
        );
        const file = await send(
          "GET",
          "/api/admin/files/" + fileId,
          undefined,
          admin,
        );
        assert.equal(file.status, 200);
        assert.ok(
          file.headers.get("content-disposition").includes("attachment"),
        );
        assert.match(await file.text(), /Synthetic QA/);
        assert.equal(
          (await send("GET", "/api/admin/files/" + fileId)).status,
          401,
        );
      },
    );
    await t.test(
      "parallel duplicate submissions count once and leave one file",
      async () => {
        const key = randomUUID(),
          body = payload("-parallel");
        const sendOne = (requestKey) =>
          send(
            "POST",
            "/api/inquiries",
            form(body, [new File(["%PDF-1.4\nConcurrent"], "same.pdf")]),
            customer,
            { "Idempotency-Key": requestKey },
          );
        const responses = await Promise.all(
          [key, key, key, randomUUID(), randomUUID()].map(sendOne),
        );
        const data = await Promise.all(
          responses.map((response) => response.json()),
        );
        assert.ok(
          responses.every((response) => response.status === 200),
          JSON.stringify(data),
        );
        assert.equal(new Set(data.map((result) => result.reference)).size, 1);
        assert.equal(
          (
            await db
              .prepare("SELECT COUNT(*) total FROM inquiries WHERE email=?")
              .bind("qa-parallel@example.invalid")
              .first()
          ).total,
          1,
        );
        const objectList = await (await mf.getR2Bucket("FILES")).list();
        assert.equal(objectList.objects.length, 2);
        const changed = payload("-changed");
        assert.equal(
          (
            await send("POST", "/api/inquiries", form(changed), customer, {
              "Idempotency-Key": key,
            })
          ).status,
          409,
        );
      },
    );
    await t.test(
      "validation, honeypot, bot rejection and optional fields",
      async () => {
        const invalid = payload("-invalid");
        invalid.fields.email = "invalid";
        assert.equal(
          (
            await send("POST", "/api/inquiries", form(invalid), customer, {
              "Idempotency-Key": randomUUID(),
            })
          ).status,
          400,
        );
        const honey = form(payload("-honey"));
        honey.append("website", "spam");
        assert.equal(
          (
            await send("POST", "/api/inquiries", honey, customer, {
              "Idempotency-Key": randomUUID(),
            })
          ).status,
          400,
        );
        assert.equal(
          (
            await send(
              "POST",
              "/api/inquiries",
              form(payload("-bot")),
              customer,
              { "Idempotency-Key": randomUUID(), "User-Agent": "Googlebot" },
            )
          ).status,
          400,
        );
        assert.equal(
          (
            await send(
              "POST",
              "/api/inquiries",
              form(payload("-file"), [new File(["not a pdf"], "bad.pdf")]),
              customer,
              { "Idempotency-Key": randomUUID() },
            )
          ).status,
          400,
        );
        const optional = payload("-optional");
        optional.fields.company = "";
        optional.fields.message = "";
        optional.fields.partType = "";
        optional.fields.processes = [];
        assert.equal(
          (
            await send("POST", "/api/inquiries", form(optional), new Jar(), {
              "Idempotency-Key": randomUUID(),
              DNT: "1",
            })
          ).status,
          200,
        );
        const phone = payload("-phone");
        phone.fields.method = "phone";
        phone.fields.phone = "+44 7700 900123";
        phone.fields.email = "";
        assert.equal(
          (
            await send("POST", "/api/inquiries", form(phone), customer, {
              "Idempotency-Key": randomUUID(),
            })
          ).status,
          200,
        );
      },
    );
    await t.test("notes, unread status, search, CSV and CSRF", async () => {
      assert.equal(
        (
          await send(
            "PATCH",
            "/api/admin/inquiries/" + inquiryId,
            { status: "following" },
            admin,
          )
        ).status,
        403,
      );
      assert.equal(
        (
          await send(
            "PATCH",
            "/api/admin/inquiries/" + inquiryId,
            { status: "following", unread: false },
            admin,
            { "X-LZZ-CSRF": csrf },
          )
        ).status,
        200,
      );
      assert.equal(
        (
          await send(
            "POST",
            "/api/admin/inquiries/" + inquiryId + "/notes",
            { content: "Local follow-up note" },
            admin,
            { "X-LZZ-CSRF": csrf },
          )
        ).status,
        201,
      );
      const detail = await (
        await send("GET", "/api/admin/inquiries/" + inquiryId, undefined, admin)
      ).json();
      assert.equal(detail.inquiry.status, "following");
      assert.equal(detail.inquiry.unread, 0);
      assert.equal(detail.notes[0].content, "Local follow-up note");
      const list = await (
        await send(
          "GET",
          "/api/admin/inquiries?q=qa%40example.invalid&status=following",
          undefined,
          admin,
        )
      ).json();
      assert.equal(list.total, 1);
      const csv = await send(
        "GET",
        "/api/admin/inquiries/export?status=following",
        undefined,
        admin,
      );
      assert.equal(csv.status, 200);
      const body = await csv.text();
      assert.ok(body.includes("Local follow-up note"));
      assert.ok(body.includes("qa@example.invalid"));
      assert.equal(csv.headers.get("cache-control"), "private, no-store");
      const journey = await (
        await send("GET", "/api/admin/visitors/" + visitorId, undefined, admin)
      ).json();
      assert.ok(
        journey.events.some((event) => event.type === "inquiry_success"),
      );
      assert.ok(journey.inquiries.some((inquiry) => inquiry.id === inquiryId));
    });
    await t.test(
      "return visits, filters, equal-period comparison and totals reconcile",
      async () => {
        await db
          .prepare("UPDATE visits SET last_seen=? WHERE visitor_id=?")
          .bind(Date.now() - 31 * 60000, visitorId)
          .run();
        await send(
          "POST",
          "/api/analytics/consent",
          { granted: true, page: "/", language: "en" },
          customer,
        );
        await send(
          "POST",
          "/api/events",
          {
            events: [
              {
                id: randomUUID(),
                type: "page_view",
                page: "/",
                language: "en",
                position: "main",
              },
            ],
          },
          customer,
        );
        const stats = await (
          await send("GET", "/api/admin/stats", undefined, admin)
        ).json();
        assert.equal(stats.current.visits, 2);
        assert.equal(stats.current.returningVisitors, 1);
        assert.equal(
          stats.range.end - stats.range.start,
          stats.range.previousEnd - stats.range.previousStart,
        );
        assert.equal(
          stats.current.pageViews,
          stats.trend.reduce((n, row) => n + row.pageViews, 0),
        );
        assert.equal(
          stats.current.pageViews,
          stats.breakdowns.country.reduce((n, row) => n + row.views, 0),
        );
        const independent = await db
          .prepare(
            "SELECT COUNT(*) total FROM inquiries WHERE internal=0 AND created_at>=? AND created_at<?",
          )
          .bind(stats.range.start, stats.range.end)
          .first();
        assert.equal(stats.current.inquiries, independent.total);
        const filtered = await (
          await send(
            "GET",
            "/api/admin/stats?source=google&country=unknown&language=en&product=" +
              products[0].id,
            undefined,
            admin,
          )
        ).json();
        assert.equal(filtered.current.pageViews, 1);
        assert.equal(
          (await send("GET", "/api/admin/stats?start=bad", undefined, admin))
            .status,
          400,
        );
      },
    );
    await t.test(
      "database, attachments and authenticated session survive runtime restart",
      async () => {
        const total = (
          await db.prepare("SELECT COUNT(*) total FROM inquiries").first()
        ).total;
        await mf.dispose();
        mf = create();
        db = await mf.getD1Database("DB");
        assert.equal(
          (await db.prepare("SELECT COUNT(*) total FROM inquiries").first())
            .total,
          total,
        );
        assert.equal(
          (
            await send(
              "GET",
              "/api/admin/inquiries/" + inquiryId,
              undefined,
              admin,
            )
          ).status,
          200,
        );
        assert.equal(
          (await send("GET", "/api/admin/files/" + fileId, undefined, admin))
            .status,
          200,
        );
      },
    );
    await t.test(
      "attachment limits and database rollback preserve consistency",
      async () => {
        await db.prepare("DELETE FROM rate_limits").run(); // Independent test, local runtime only.
        const five = Array.from(
          { length: 5 },
          (_, i) => new File(["synthetic STEP data"], "qa-" + i + ".stp"),
        );
        assert.equal(
          (
            await send(
              "POST",
              "/api/inquiries",
              form(payload("-five"), five),
              customer,
              { "Idempotency-Key": randomUUID() },
            )
          ).status,
          200,
        );
        const large = new Uint8Array(20 * 1024 * 1024);
        large.set([80, 75, 3, 4]);
        const max = await send(
          "POST",
          "/api/inquiries",
          form(payload("-max"), [new File([large], "max.zip")]),
          customer,
          { "Idempotency-Key": randomUUID() },
        );
        assert.equal(max.status, 200, await max.clone().text());
        const maxId = (await max.json()).reference;
        assert.equal(
          (
            await db
              .prepare("SELECT size FROM inquiry_files WHERE inquiry_id=?")
              .bind(maxId)
              .first()
          ).size,
          large.length,
        );
        for (const [label, files] of [
          ["count", [...five, new File(["x"], "six.stp")]],
          [
            "size",
            [new File([new Uint8Array(20 * 1024 * 1024 + 1)], "oversize.zip")],
          ],
          ["empty", [new File([], "empty.stp")]],
          ["type", [new File(["x"], "qa.exe")]],
        ])
          assert.equal(
            (
              await send(
                "POST",
                "/api/inquiries",
                form(payload("-invalid-" + label), files),
                customer,
                { "Idempotency-Key": randomUUID() },
              )
            ).status,
            400,
            label,
          );
        const oversized = await send(
          "POST",
          "/api/inquiries",
          form(payload("-stream-limit"), [
            new File([new Uint8Array(22 * 1024 * 1024)], "oversize.zip"),
          ]),
          customer,
          { "Idempotency-Key": randomUUID() },
        );
        assert.equal(oversized.status, 413);
        const before = (
            await db.prepare("SELECT COUNT(*) total FROM inquiries").first()
          ).total,
          claims = (
            await db
              .prepare("SELECT COUNT(*) total FROM inquiry_dedupes")
              .first()
          ).total;
        const bucket = await mf.getR2Bucket("FILES"),
          objects = (await bucket.list()).objects.length;
        await db
          .prepare(
            "CREATE TRIGGER qa_reject_file BEFORE INSERT ON inquiry_files BEGIN SELECT RAISE(ABORT,'local QA rollback'); END",
          )
          .run();
        try {
          const failed = await send(
            "POST",
            "/api/inquiries",
            form(payload("-rollback"), [new File(["fixture"], "rollback.stp")]),
            customer,
            { "Idempotency-Key": randomUUID() },
          );
          assert.equal(failed.status, 503);
          assert.equal((await failed.json()).error, "server");
          assert.equal(
            (await db.prepare("SELECT COUNT(*) total FROM inquiries").first())
              .total,
            before,
          );
          assert.equal(
            (
              await db
                .prepare("SELECT COUNT(*) total FROM inquiry_dedupes")
                .first()
            ).total,
            claims,
          );
          assert.equal((await bucket.list()).objects.length, objects);
        } finally {
          await db.prepare("DROP TRIGGER qa_reject_file").run();
        }
      },
    );
    await t.test(
      "failed telemetry does not block a saved inquiry; CSV neutralizes formulas",
      async () => {
        await db.prepare("DELETE FROM rate_limits").run();
        const buyer = new Jar();
        const consent = await (
          await send(
            "POST",
            "/api/analytics/consent",
            { granted: true, page: "/", language: "en" },
            buyer,
          )
        ).json();
        await db
          .prepare(
            "CREATE TRIGGER qa_reject_analytics BEFORE INSERT ON events BEGIN SELECT RAISE(ABORT,'local QA telemetry failure'); END",
          )
          .run();
        try {
          assert.equal(
            (
              await send(
                "POST",
                "/api/events",
                {
                  events: [
                    {
                      id: randomUUID(),
                      type: "form_start",
                      page: "/quote/",
                      language: "en",
                    },
                  ],
                },
                buyer,
              )
            ).status,
            503,
          );
          const input = payload("-tracking-fault");
          input.fields.company = '=HYPERLINK("invalid")';
          const response = await send(
            "POST",
            "/api/inquiries",
            form(input),
            buyer,
            { "Idempotency-Key": randomUUID() },
          );
          assert.equal(response.status, 200);
          const id = (await response.json()).reference;
          const row = await db
            .prepare("SELECT visitor_id FROM inquiries WHERE id=?")
            .bind(id)
            .first();
          assert.equal(row.visitor_id, consent.visitorId);
          const process = await (
            await send(
              "GET",
              "/api/admin/visitors/" + consent.visitorId,
              undefined,
              admin,
            )
          ).json();
          assert.equal(
            process.events.filter((e) => e.type === "inquiry_success").length,
            1,
          );
          const csv = await (
            await send(
              "GET",
              "/api/admin/inquiries/export?q=tracking-fault",
              undefined,
              admin,
            )
          ).text();
          assert.ok(csv.includes("'="));
        } finally {
          await db.prepare("DROP TRIGGER qa_reject_analytics").run();
        }
        await db
          .prepare("ALTER TABLE visits RENAME TO qa_offline_visits")
          .run();
        try {
          const response = await send(
            "POST",
            "/api/inquiries",
            form(payload("-tracking-read-fault")),
            buyer,
            { "Idempotency-Key": randomUUID() },
          );
          assert.equal(response.status, 200);
          const id = (await response.json()).reference;
          assert.equal(
            (
              await db
                .prepare("SELECT visitor_id FROM inquiries WHERE id=?")
                .bind(id)
                .first()
            ).visitor_id,
            null,
          );
        } finally {
          await db
            .prepare("ALTER TABLE qa_offline_visits RENAME TO visits")
            .run();
        }
      },
    );
    await t.test(
      "declining analytics and privacy signals prevent inquiry association",
      async () => {
        await db.prepare("DELETE FROM rate_limits").run();
        const buyer = new Jar(),
          consent = await (
            await send(
              "POST",
              "/api/analytics/consent",
              { granted: true, page: "/", language: "en" },
              buyer,
            )
          ).json();
        for (const [suffix, overrides, headers] of [
          ["denied", { analyticsConsent: false }, {}],
          ["dnt", {}, { DNT: "1" }],
          ["gpc", {}, { "Sec-GPC": "1" }],
        ]) {
          const response = await send(
            "POST",
            "/api/inquiries",
            form(payload("-privacy-" + suffix, overrides)),
            buyer,
            { "Idempotency-Key": randomUUID(), ...headers },
          );
          assert.equal(response.status, 200);
          const id = (await response.json()).reference;
          assert.equal(
            (
              await db
                .prepare("SELECT visitor_id FROM inquiries WHERE id=?")
                .bind(id)
                .first()
            ).visitor_id,
            null,
          );
        }
        const event = {
          id: randomUUID(),
          type: "page_view",
          page: "/",
          language: "en",
        };
        assert.equal(
          (
            await (
              await send("POST", "/api/events", { events: [event] }, buyer, {
                DNT: "1",
              })
            ).json()
          ).accepted,
          0,
        );
        await send("POST", "/api/events", { events: [event] }, buyer);
        const saved = await (
          await send(
            "POST",
            "/api/inquiries",
            form(payload("-privacy-allowed")),
            buyer,
            { "Idempotency-Key": randomUUID() },
          )
        ).json();
        assert.equal(
          (
            await db
              .prepare("SELECT visitor_id FROM inquiries WHERE id=?")
              .bind(saved.reference)
              .first()
          ).visitor_id,
          consent.visitorId,
        );
        assert.equal(
          (await send("POST", "/api/analytics/forget", {}, buyer)).status,
          200,
        );
        assert.ok(!buyer.values.has("lzz_visitor"));
        assert.equal(
          await db
            .prepare("SELECT id FROM visitors WHERE id=?")
            .bind(consent.visitorId)
            .first(),
          null,
        );
        assert.equal(
          (
            await db
              .prepare("SELECT visitor_id FROM inquiries WHERE id=?")
              .bind(saved.reference)
              .first()
          ).visitor_id,
          null,
        );
        assert.equal(
          (
            await db
              .prepare("SELECT COUNT(*) total FROM events WHERE visitor_id=?")
              .bind(consent.visitorId)
              .first()
          ).total,
          0,
        );
      },
    );
    await t.test(
      "internal visits and their inquiries are excluded by default",
      async () => {
        const staff = new Jar();
        const consent = await (
          await send(
            "POST",
            "/api/analytics/consent",
            {
              granted: true,
              page: "/",
              language: "en",
              utmSource: "internal-qa",
            },
            staff,
          )
        ).json();
        await send(
          "POST",
          "/api/events",
          {
            events: [
              {
                id: randomUUID(),
                type: "page_view",
                page: "/",
                language: "en",
              },
            ],
          },
          staff,
        );
        assert.equal(
          (
            await send(
              "POST",
              "/api/inquiries",
              form(payload("-internal")),
              staff,
              { "Idempotency-Key": randomUUID() },
            )
          ).status,
          200,
        );
        const logged = await send(
          "POST",
          "/api/admin/login",
          { username: "admin", password },
          staff,
        );
        assert.equal(logged.status, 200);
        const staffCsrf = (await logged.json()).csrf;
        const normal = await (
            await send(
              "GET",
              "/api/admin/stats?source=internal-qa",
              undefined,
              admin,
            )
          ).json(),
          included = await (
            await send(
              "GET",
              "/api/admin/stats?source=internal-qa&internal=1",
              undefined,
              admin,
            )
          ).json();
        assert.equal(normal.current.visitors, 0);
        assert.equal(normal.current.inquiries, 0);
        assert.equal(included.current.visitors, 1);
        assert.equal(included.current.inquiries, 1);
        assert.equal(
          (
            await db
              .prepare("SELECT internal FROM visitors WHERE id=?")
              .bind(consent.visitorId)
              .first()
          ).internal,
          1,
        );
        assert.equal(
          (
            await send(
              "POST",
              "/api/admin/internal",
              { excluded: false },
              staff,
              { "X-LZZ-CSRF": staffCsrf },
            )
          ).status,
          200,
        );
        assert.ok(!staff.values.has("lzz_visitor"));
        assert.ok(!staff.values.has("lzz_internal"));
        assert.equal(
          (
            await db
              .prepare("SELECT internal FROM visitors WHERE id=?")
              .bind(consent.visitorId)
              .first()
          ).internal,
          1,
        );
      },
    );
    await t.test(
      "historical equal-duration periods and latest visitor metadata are accurate",
      async () => {
        const day = 86400000,
          offset = 8 * 3600000,
          today = Math.floor((Date.now() + offset) / day) * day - offset,
          format = (stamp) =>
            new Date(stamp + offset).toISOString().slice(0, 10);
        const history = new Jar();
        const consent = await (
          await send(
            "POST",
            "/api/analytics/consent",
            {
              granted: true,
              page: "/",
              language: "en",
              utmSource: "history-qa",
            },
            history,
          )
        ).json();
        const ids = [randomUUID(), randomUUID(), randomUUID()];
        await send(
          "POST",
          "/api/events",
          {
            events: ids.map((id) => ({
              id,
              type: "page_view",
              page: "/factory/",
              language: "en",
            })),
          },
          history,
        );
        for (let i = 0; i < ids.length; i++)
          await db
            .prepare("UPDATE events SET created_at=? WHERE id=?")
            .bind(today - (i === 0 ? 3 : 1) * day + i * 3600000, ids[i])
            .run();
        const query =
          "?start=" + format(today - 2 * day) + "&end=" + format(today - day);
        const stats = await (
          await send(
            "GET",
            "/api/admin/stats" + query + "&source=history-qa",
            undefined,
            admin,
          )
        ).json();
        assert.equal(stats.current.pageViews, 2);
        assert.equal(stats.previous.pageViews, 1);
        assert.equal(stats.range.end - stats.range.start, 2 * day);
        assert.equal(
          stats.range.previousEnd - stats.range.previousStart,
          2 * day,
        );
        assert.equal(
          stats.trend.reduce((n, row) => n + row.pageViews, 0),
          2,
        );
        assert.equal(
          stats.previousTrend.reduce((n, row) => n + row.pageViews, 0),
          1,
        );
        await db
          .prepare(
            "UPDATE events SET source='zzzz-old',country='US',device='desktop' WHERE id=?",
          )
          .bind(ids[1])
          .run();
        await db
          .prepare(
            "UPDATE events SET source='aaa-latest',country='DE',device='mobile' WHERE id=?",
          )
          .bind(ids[2])
          .run();
        const listed = await (
            await send("GET", "/api/admin/visitors" + query, undefined, admin)
          ).json(),
          latest = listed.items.find((item) => item.id === consent.visitorId);
        assert.equal(latest.source, "aaa-latest");
        assert.equal(latest.country, "DE");
        assert.equal(latest.device, "mobile");
        assert.equal(
          (
            await send(
              "GET",
              "/api/admin/stats?start=2026-02-30",
              undefined,
              admin,
            )
          ).status,
          400,
        );
      },
    );
    await t.test(
      "invalid submissions are rate limited and local-only mode fails closed",
      async () => {
        await db.prepare("DELETE FROM rate_limits").run();
        const bad = payload("-rate");
        bad.fields.email = "invalid";
        for (let i = 0; i < 30; i++)
          assert.equal(
            (
              await send("POST", "/api/inquiries", form(bad), new Jar(), {
                "Idempotency-Key": randomUUID(),
              })
            ).status,
            400,
          );
        const limited = await send(
          "POST",
          "/api/inquiries",
          form(bad),
          new Jar(),
          { "Idempotency-Key": randomUUID() },
        );
        assert.equal(limited.status, 429);
        assert.ok(Number(limited.headers.get("retry-after")) >= 1);
        assert.ok(Number(limited.headers.get("retry-after")) <= 60);
        assert.equal(
          (await mf.dispatchFetch("https://site.example.invalid/api/config"))
            .status,
          503,
        );
      },
    );
    await t.test(
      "logout revokes access to customer data and export",
      async () => {
        assert.equal(
          (
            await send("POST", "/api/admin/logout", {}, admin, {
              "X-LZZ-CSRF": csrf,
            })
          ).status,
          200,
        );
        assert.equal(
          (await send("GET", "/api/admin/inquiries", undefined, admin)).status,
          401,
        );
        assert.equal(
          (await send("GET", "/api/admin/inquiries/export", undefined, admin))
            .status,
          401,
        );
      },
    );
  } finally {
    if (mf) await mf.dispose();
    assert.equal(
      path.dirname(fs.realpathSync(persist)),
      fs.realpathSync(qaRoot),
    );
    assert.ok(path.basename(persist).startsWith("run-"));
    fs.rmSync(persist, { recursive: true, force: true });
  }
});

test("Access verifies signature, issuer, audience and expiry; configuration fails closed", async () => {
  const { privateKey, publicKey } = await generateKeyPair("RS256"),
    jwk = await exportJWK(publicKey);
  jwk.kid = "fixture-key";
  jwk.alg = "RS256";
  const issuer = "https://test-team.cloudflareaccess.com";
  const token = (aud = "fixture-aud", expiry = "5m") =>
    new SignJWT({ email: "owner@example.invalid" })
      .setProtectedHeader({ alg: "RS256", kid: "fixture-key" })
      .setIssuer(issuer)
      .setAudience(aud)
      .setSubject("fixture-owner")
      .setIssuedAt()
      .setExpirationTime(expiry)
      .sign(privateKey);
  const mf = new Miniflare(
    convertV4MiniflareOptions({
      modules: true,
      script: bundled.outputFiles[0].text,
      compatibilityDate: "2026-10-01",
      cf: false,
      d1Databases: ["DB"],
      r2Buckets: ["FILES"],
      bindings: {
        TOKEN_SECRET: "integration-only-secret-at-least-32-characters",
        ADMIN_AUTH_MODE: "access",
        ACCESS_TEAM_DOMAIN: "test-team.cloudflareaccess.com",
        ACCESS_AUD: "fixture-aud",
        ADMIN_EMAILS: "owner@example.invalid",
      },
      outboundService: (request) =>
        new Response(
          request.url === issuer + "/cdn-cgi/access/certs"
            ? JSON.stringify({ keys: [jwk] })
            : "{}",
          { headers: { "Content-Type": "application/json" } },
        ),
    }),
  );
  try {
    const get = (token) =>
      mf.dispatchFetch("https://site.example.invalid/api/admin/session", {
        headers: token
          ? { "Cf-Access-Jwt-Assertion": token }
          : { "Cf-Access-Authenticated-User-Email": "owner@example.invalid" },
      });
    assert.equal((await get()).status, 401);
    assert.equal((await get(await token("wrong-aud"))).status, 401);
    assert.equal(
      (
        await get(
          await token("fixture-aud", Math.floor(Date.now() / 1000) - 10),
        )
      ).status,
      401,
    );
    assert.equal((await get("eyJhbGciOiJub25lIn0.e30.")).status, 401);
    const noExpiry = await new SignJWT({ email: "owner@example.invalid" })
      .setProtectedHeader({ alg: "RS256", kid: "fixture-key" })
      .setIssuer(issuer)
      .setAudience("fixture-aud")
      .setSubject("fixture-owner")
      .sign(privateKey);
    assert.equal((await get(noExpiry)).status, 401);
    const outsider = await generateKeyPair("RS256"),
      wrongSignature = await new SignJWT({ email: "owner@example.invalid" })
        .setProtectedHeader({ alg: "RS256", kid: "fixture-key" })
        .setIssuer(issuer)
        .setAudience("fixture-aud")
        .setSubject("fixture-owner")
        .setExpirationTime("5m")
        .sign(outsider.privateKey);
    assert.equal((await get(wrongSignature)).status, 401);
    assert.equal((await get(await token())).status, 200);
  } finally {
    await mf.dispose();
  }
});
