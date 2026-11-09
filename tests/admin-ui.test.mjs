import { schemaSql } from "./helpers/schema.mjs";
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { randomBytes, pbkdf2Sync, randomUUID } from "node:crypto";
import { build } from "esbuild";
import { Miniflare, convertV4MiniflareOptions } from "miniflare";
import { JSDOM } from "jsdom";

test("Chinese admin operates against real local D1 and R2 APIs", async (t) => {
  const root = path.resolve(import.meta.dirname, ".."),
    output = path.join(root, ".wrangler", "ui-component-test");
  fs.mkdirSync(output, { recursive: true });
  const compiled = path.join(output, "AdminApp.mjs");
  await build({
    entryPoints: [path.join(root, "src/components/AdminApp.tsx")],
    outfile: compiled,
    bundle: true,
    format: "esm",
    platform: "node",
    external: ["react", "react/jsx-runtime"],
    jsx: "automatic",
  });
  const worker = await build({
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
  const salt = randomBytes(16),
    password = "ui-integration-password-not-production";
  const hash = [
    "pbkdf2-sha256",
    "100000",
    salt.toString("base64"),
    pbkdf2Sync(password, salt, 100000, 32, "sha256").toString("base64"),
  ].join("$");
  const mf = new Miniflare(
    convertV4MiniflareOptions({
      modules: true,
      script: worker.outputFiles[0].text,
      compatibilityDate: "2026-10-01",
      cf: false,
      d1Databases: ["DB"],
      r2Buckets: ["FILES"],
      bindings: {
        TOKEN_SECRET: "ui-integration-secret-more-than-32-characters",
        LOCAL_DEVELOPMENT: "true",
        ADMIN_AUTH_MODE: "password",
        ADMIN_USERNAME: "admin",
        ADMIN_PASSWORD_HASH: hash,
      },
    }),
  );
  const dom = new JSDOM(
    '<!doctype html><html><body><div id="root"></div></body></html>',
    { url: "http://localhost/admin/", pretendToBeVisual: true },
  );
  const saved = new Map(),
    remember = (name) =>
      saved.set(name, Object.getOwnPropertyDescriptor(globalThis, name));
  const nativeRequest = globalThis.Request,
    nativeFetch = globalThis.fetch;
  const adminCookies = new Map(),
    customerCookies = new Map(),
    requests = [];
  const request = async (route, init = {}, jar = adminCookies) => {
    const headers = new Headers(init.headers || {});
    headers.set("Origin", "http://localhost");
    headers.set("User-Agent", "UIIntegration/1.0");
    if (jar.size)
      headers.set(
        "Cookie",
        [...jar].map(([key, value]) => key + "=" + value).join("; "),
      );
    const packed = new nativeRequest("http://localhost" + route, {
      ...init,
      headers,
    });
    const response = await mf.dispatchFetch(packed.url, {
      method: packed.method,
      headers: Object.fromEntries(packed.headers),
      body: packed.method === "GET" ? undefined : await packed.arrayBuffer(),
    });
    for (const cookie of response.headers.getSetCookie()) {
      const [key, value] = cookie.split(";")[0].split("=");
      if (cookie.includes("Max-Age=0;") || cookie.endsWith("Max-Age=0"))
        jar.delete(key);
      else jar.set(key, value);
    }
    const meta = route.startsWith("/api/admin/inquiries?")
      ? await response.clone().json()
      : {};
    requests.push({
      route,
      status: response.status,
      total: meta.total,
      items: meta.items?.length,
    });
    return response;
  };
  let cleanup;
  try {
    const db = await mf.getD1Database("DB");
    await db.batch(
      schemaSql(root)
        .split(";")
        .map((sql) => sql.trim())
        .filter(Boolean)
        .map((sql) => db.prepare(sql)),
    );
    const product = JSON.parse(
      fs.readFileSync(root + "/server/catalog.generated.json", "utf8"),
    )[0];
    await request(
      "/api/analytics/session",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page: "/",
          language: "en",
          utmSource: "newsletter",
          utmMedium: "email",
        }),
      },
      customerCookies,
    );
    await request(
      "/api/events",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          events: [
            {
              id: randomUUID(),
              type: "page_view",
              page: "/",
              language: "en",
              position: "main",
            },
          ],
          source: "newsletter",
          channel: "email",
        }),
      },
      customerCookies,
    );
    const data = {
      analyticsEnabled: true,
      fields: {
        name: "LOCAL UI QA BUYER",
        company: "UI QA COMPANY",
        country: "Germany",
        method: "email",
        email: "ui-qa@example.invalid",
        phone: "",
        partType: "blocks",
        processes: ["milling"],
        message: "Synthetic component integration test",
      },
      product: product.id,
      interest: "UI QA part",
      page: "/quote/",
      language: "en",
      context: { source: "/", part: "UI QA part" },
    };
    const form = new FormData();
    form.append("payload", JSON.stringify(data));
    const result = await request(
      "/api/inquiries",
      {
        method: "POST",
        headers: { "Idempotency-Key": randomUUID() },
        body: form,
      },
      customerCookies,
    );
    assert.equal(result.status, 200);
    const inquiryId = (await result.json()).reference;
    for (const name of [
      "window",
      "document",
      "navigator",
      "HTMLElement",
      "Element",
      "HTMLInputElement",
      "HTMLSelectElement",
      "HTMLTextAreaElement",
      "Event",
      "MouseEvent",
      "Node",
      "MutationObserver",
      "getComputedStyle",
    ]) {
      remember(name);
      Object.defineProperty(globalThis, name, {
        value:
          typeof dom.window[name] === "function" && name === "getComputedStyle"
            ? dom.window[name].bind(dom.window)
            : dom.window[name],
        configurable: true,
        writable: true,
      });
    }
    remember("IS_REACT_ACT_ENVIRONMENT");
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    globalThis.fetch = (route, init) => request(String(route), init);
    const { createElement } = await import("react");
    const testing = await import("@testing-library/react");
    cleanup = testing.cleanup;
    const { render, screen, fireEvent, waitFor, within } = testing;
    const { default: AdminApp } = await import(pathToFileURL(compiled).href);
    render(createElement(AdminApp));
    await screen.findByRole("heading", { name: "登录工作台" });
    assert.equal(screen.queryByText("LOCAL UI QA BUYER"), null);
    fireEvent.change(screen.getByLabelText("用户名"), {
      target: { value: "admin" },
    });
    fireEvent.change(screen.getByLabelText("密码"), {
      target: { value: password },
    });
    fireEvent.click(screen.getByRole("button", { name: "登录", exact: true }));
    await screen.findByRole("heading", { name: "网站访问洞察" });
    await screen.findByRole("heading", { name: "成功询盘" });
    assert.match(
      screen.getByRole("heading", { name: "成功询盘" }).parentElement
        .textContent,
      /1/,
    );
    assert.ok(screen.getByRole("heading", { name: "访客数" }));
    assert.ok(screen.getByRole("heading", { name: "回访访客" }));
    assert.ok(screen.getByRole("heading", { name: "开始填写人数" }));
    assert.match(screen.getByRole("heading", { name: "页面浏览量" }).parentElement.textContent, /1/);
    assert.ok((await db.prepare("SELECT visitor_id FROM inquiries WHERE id=?").bind(inquiryId).first()).visitor_id);
    fireEvent.click(screen.getByRole("button", { name: /询盘管理/ }));
    await screen.findByText("LOCAL UI QA BUYER");
    await screen.findByText("UI QA COMPANY");
    fireEvent.click(screen.getByRole("button", { name: "查看", exact: true }));
    let dialog = await screen.findByRole("dialog");
    await within(dialog).findByRole("heading", { name: "LOCAL UI QA BUYER" });
    fireEvent.change(within(dialog).getByLabelText("处理状态"), {
      target: { value: "following" },
    });
    await waitFor(async () =>
      assert.equal(
        (
          await db
            .prepare("SELECT status FROM inquiries WHERE id=?")
            .bind(inquiryId)
            .first()
        ).status,
        "following",
      ),
    );
    await within(dialog).findByLabelText("添加备注");
    fireEvent.change(within(dialog).getByLabelText("添加备注"), {
      target: { value: "UI saved follow-up note" },
    });
    await waitFor(() =>
      assert.equal(
        within(dialog).getByRole("button", { name: "保存备注" }).disabled,
        false,
      ),
    );
    fireEvent.click(within(dialog).getByRole("button", { name: "保存备注" }));
    await within(dialog).findByText("UI saved follow-up note", {
      selector: ".admin-notes p",
    });
    fireEvent.click(within(dialog).getByRole("button", { name: "标为已读" }));
    await waitFor(async () =>
      assert.equal(
        (
          await db
            .prepare("SELECT unread FROM inquiries WHERE id=?")
            .bind(inquiryId)
            .first()
        ).unread,
        0,
      ),
    );
    fireEvent.click(within(dialog).getByRole("button", { name: "关闭详情" }));
    await waitFor(() => assert.equal(screen.queryByRole("dialog"), null));
    fireEvent.change(
      screen.getByPlaceholderText("姓名、公司、联系方式或需求"),
      { target: { value: "nothing-matches-local-qa" } },
    );
    fireEvent.click(screen.getByRole("button", { name: "应用筛选" }));
    await screen.findByText(
      "暂无符合条件的询盘。只有服务端保存成功的表单会出现在这里。",
    );
    fireEvent.click(screen.getByRole("button", { name: "重置", exact: true }));
    try {
      await screen.findByText("LOCAL UI QA BUYER");
    } catch (error) {
      t.diagnostic(JSON.stringify(requests.slice(-8)));
      t.diagnostic(
        screen.getByRole("heading", { name: "收到的询盘" }).closest("section")
          .textContent,
      );
      throw error;
    }
    let downloaded;
    const originalCreate = URL.createObjectURL,
      originalRevoke = URL.revokeObjectURL,
      originalClick = dom.window.HTMLAnchorElement.prototype.click;
    URL.createObjectURL = (blob) => {
      downloaded = blob;
      return "blob:local-test";
    };
    URL.revokeObjectURL = () => {};
    dom.window.HTMLAnchorElement.prototype.click = function () {};
    try {
      fireEvent.click(screen.getByRole("button", { name: "导出询盘 CSV" }));
      await screen.findByText("询盘导出文件已生成。");
      assert.ok((await downloaded.text()).includes("ui-qa@example.invalid"));
    } finally {
      URL.createObjectURL = originalCreate;
      URL.revokeObjectURL = originalRevoke;
      dom.window.HTMLAnchorElement.prototype.click = originalClick;
    }
    fireEvent.click(screen.getByRole("button", { name: /访客与行为/ }));
    await screen.findByRole("button", { name: "访问过程" });
    fireEvent.click(screen.getByRole("button", { name: "访问过程" }));
    dialog = await screen.findByRole("dialog");
    await within(dialog).findByText("询盘已入库");
    assert.ok(within(dialog).getByRole("button", { name: /LOCAL UI QA BUYER/ }));
    fireEvent.click(within(dialog).getByRole("button", { name: "关闭详情" }));
    fireEvent.click(screen.getByRole("button", { name: "退出登录" }));
    await screen.findByRole("heading", { name: "登录工作台" });
    assert.equal(screen.queryByText("LOCAL UI QA BUYER"), null);
    assert.equal((await request("/api/admin/inquiries/export")).status, 401);
  } finally {
    cleanup?.();
    globalThis.fetch = nativeFetch;
    for (const [name, descriptor] of saved) {
      if (descriptor) Object.defineProperty(globalThis, name, descriptor);
      else delete globalThis[name];
    }
    dom.window.close();
    await mf.dispose();
    if (fs.existsSync(compiled)) fs.unlinkSync(compiled);
  }
});
