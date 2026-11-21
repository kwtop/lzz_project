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
    external: ["react", "react/jsx-runtime", "lucide-react"],
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
          utmCampaign: "workshop-qa",
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
            {id:randomUUID(),type:"whatsapp_click",page:"/factory/",language:"en",position:"hero",sectionId:"factory-introduction",sectionLabel:"CNC factory",elementId:"factory-hero-whatsapp",elementLabel:"WhatsApp",target:"https://wa.me/8613858102479"},
            {id:randomUUID(),type:"product_view",page:"/machined-parts/gallery/"+product.id+"/",product:product.id,language:"en"},
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
    const { visitor_id: buyerId } = await db.prepare("SELECT visitor_id FROM inquiries WHERE id=?")
      .bind(inquiryId).first();
    await db.batch([
      db.prepare("UPDATE events SET internal=1 WHERE visitor_id=?").bind(buyerId),
      db.prepare("UPDATE inquiries SET internal=1 WHERE id=?").bind(inquiryId),
    ]);
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
    testing.configure({getElementError:(message)=>new Error(message)});
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
    await screen.findByRole("heading", { name: "访问洞察" });
    await screen.findByRole("heading", { name: "询盘入库" });
    assert.match(
      screen.getByRole("heading", { name: "询盘入库" }).parentElement
        .textContent,
      /1/,
    );
    assert.ok(screen.getByRole("heading", { name: "访客数" }));
    const acquisition = screen.getByRole('region', {name: '访问来源构成'});
    assert.ok(within(acquisition).getByRole('img', {name: '1 次访问按来源构成'}));
    const segment = acquisition.querySelector('.admin-acquisition-segment');
    assert.ok(segment);
    fireEvent.click(segment);
    const acquisitionDetails = await screen.findByRole('dialog');
    await within(acquisitionDetails).findByRole('button', {name: '查看轨迹', exact: true});
    fireEvent.click(within(acquisitionDetails).getByRole('button', {name: '关闭详情', exact: true}));
    await waitFor(() => assert.equal(Boolean(screen.queryByRole('dialog')), false));
    const definitions=screen.getByText('统计口径与数据说明').closest('details');
    assert.equal(definitions.open,false,'Detailed definitions should not obscure the primary metrics');
    assert.match(definitions.textContent,/询盘入库只统计服务端保存成功/);
    assert.ok(screen.getByText('对比昨日同时段', {exact: true}));
    assert.match(screen.getByRole('heading',{name:/国家 \/ 地区/}).textContent,/页面浏览量/);
    assert.ok(screen.getByText(/回访访客：/));
    assert.ok(screen.getByText(/开始填写人数：/));
    assert.match(screen.getByRole("heading", { name: "页面浏览量" }).parentElement.textContent, /1/);
    assert.ok((await db.prepare("SELECT visitor_id FROM inquiries WHERE id=?").bind(inquiryId).first()).visitor_id);
    assert.equal(screen.getByRole('button',{name:'今日',exact:true}).getAttribute('aria-pressed'),'true');
    assert.ok(screen.getByRole('button',{name:'昨日',exact:true}));
    fireEvent.click(await screen.findByRole('button',{name:/点击 WhatsApp \/factory\/，查看轨迹/}));
    const latestDialog=await screen.findByRole('dialog');
    await within(latestDialog).findByText(/点击 WhatsApp · 当前定位/);
    const currentSource = await within(latestDialog).findByRole('region', {name: '本次访问来源'});
    const firstSource = await within(latestDialog).findByRole('region', {name: '首次已知来源'});
    assert.ok(within(currentSource).getByText('workshop-qa'));
    assert.ok(within(firstSource).getByText('workshop-qa'));
    await within(latestDialog).findByRole('heading',{name:'本次浏览的产品'});
    fireEvent.click(within(latestDialog).getByRole('button',{name:'关闭详情',exact:true}));
    fireEvent.click(screen.getByRole('button',{name:/查看高意图记录/}));
    const intentDialog=await screen.findByRole('dialog');
    await within(intentDialog).findAllByRole('button',{name:'查看轨迹',exact:true});
    assert.equal(within(intentDialog).getByRole('button',{name:'仅高意图'}).getAttribute('aria-pressed'),'true');
    fireEvent.click(within(intentDialog).getByRole('button',{name:'全部行为'}));
    assert.equal(within(intentDialog).getByRole('button',{name:'全部行为'}).getAttribute('aria-pressed'),'true');
    fireEvent.click(within(intentDialog).getByRole('button',{name:'关闭详情',exact:true}));
    t.diagnostic('Opening contact records');
    fireEvent.click(screen.getByRole('button',{name:'查看WhatsApp 点击明细',exact:true}));
    let contactDialog=await screen.findByRole('dialog');
    await within(contactDialog).findByText('CNC factory');
    fireEvent.click(within(contactDialog).getByRole('button',{name:'查看轨迹',exact:true}));
    contactDialog=await screen.findByRole('dialog');
    await within(contactDialog).findByText(/点击 WhatsApp · 当前定位/);
    assert.equal(within(contactDialog).getByRole('button',{name:'全部行为'}).getAttribute('aria-pressed'),'true');
    t.diagnostic('Returning from focused event');
    fireEvent.click(within(contactDialog).getByRole('button',{name:'← 返回上一层',exact:true}));
    await within(contactDialog).findByRole('button',{name:'查看轨迹',exact:true});
    t.diagnostic('Closing contact records');
    fireEvent.click(within(contactDialog).getByRole('button',{name:'关闭详情',exact:true}));
    await waitFor(()=>assert.equal(Boolean(screen.queryByRole('dialog')),false));
    assert.equal(screen.queryByLabelText('包含内部测试'),null);
    assert.equal(screen.queryByRole('button',{name:'将当前浏览器排除统计'}),null);
    await waitFor(()=>assert.equal(screen.queryAllByRole('status').length,0));
    await screen.findByRole('button',{name:'查看WhatsApp 点击明细',exact:true});
    const sourceSection=screen.getByRole('heading',{name:'访问来源',exact:true}).closest('section');
    fireEvent.click(within(sourceSection).getByRole('button',{name:'查看落地页',exact:true}));
    await within(sourceSection).findByRole('heading',{name:'该来源的落地页'});
    await waitFor(()=>assert.ok(new URLSearchParams(window.location.search).get('se')));
    fireEvent.click(await within(sourceSection).findByRole('button',{name:'/',exact:true}));
    let sourceDialog=await screen.findByRole('dialog');await within(sourceDialog).findByRole('button',{name:'查看轨迹',exact:true});
    assert.ok(new URLSearchParams(window.location.search).get('details').includes('entryPage'));
    fireEvent.click(within(sourceDialog).getByRole('button',{name:'关闭详情',exact:true}));await waitFor(()=>assert.equal(Boolean(screen.queryByRole('dialog')),false));
    assert.equal(within(sourceSection).getByRole('button',{name:'收起落地页',exact:true}).getAttribute('aria-expanded'),'true');
    fireEvent.click(within(sourceSection).getByRole('button',{name:'关注产品',exact:true}));
    await within(sourceSection).findByRole('heading',{name:'该来源关注的产品'});
    await within(sourceSection).findByText('1 位访客 · 1 次浏览');
    assert.equal(new URLSearchParams(window.location.search).get('sv'),'products');
    fireEvent.click(screen.getByRole('button',{name:'最近7天',exact:true}));
    await waitFor(()=>assert.equal(screen.getByRole('button',{name:'最近7天',exact:true}).getAttribute('aria-pressed'),'true'));
    await screen.findByRole('button',{name:'查看WhatsApp 点击明细',exact:true});
    fireEvent.click(screen.getByText('查看趋势数据',{exact:true}));
    const days=await screen.findAllByRole('button',{name:'小时趋势',exact:true});
    fireEvent.click(days.at(-1));
    await waitFor(()=>assert.equal(document.activeElement?.id,'admin-trend-heading'));
    assert.equal(new URLSearchParams(window.location.search).get('a_preset'),'custom');
    fireEvent.click(screen.getByRole('button',{name:/← 返回 .* 至 .* 趋势/}));
    await waitFor(()=>assert.equal(screen.getByRole('button',{name:'最近7天',exact:true}).getAttribute('aria-pressed'),'true'));
    fireEvent.click(screen.getByRole('button',{name:'今日',exact:true}));
    await waitFor(()=>assert.equal(screen.getByRole('button',{name:'今日',exact:true}).getAttribute('aria-pressed'),'true'));
    fireEvent.click(screen.getByRole("button", { name: /询盘管理/ }));
    await screen.findByText("LOCAL UI QA BUYER");
    assert.equal(screen.getByLabelText("全部询盘日期").checked,true);
    await screen.findByText("UI QA COMPANY");
    fireEvent.click(screen.getByRole("button", { name: "查看", exact: true }));
    let dialog = await screen.findByRole("dialog");
    await within(dialog).findByRole("heading", { name: "LOCAL UI QA BUYER" });
    fireEvent.click(within(dialog).getByRole("button", { name: "查看此访客的访问过程" }));
    await within(dialog).findByText("询盘已入库 · 当前定位");
    await within(dialog).findByText("点击 WhatsApp", { selector: ".admin-timeline strong" });
    fireEvent.click(within(dialog).getByRole("button", { name: "← 返回上一层" }));
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
    await waitFor(() => assert.equal(Boolean(screen.queryByRole("dialog")), false));
    fireEvent.change(
      screen.getByPlaceholderText("姓名、公司、联系方式或需求"),
      { target: { value: "nothing-matches-local-qa" } },
    );
    fireEvent.click(screen.getByRole("button", { name: "应用筛选" }));
    await screen.findByText(
      "暂无符合条件的询盘。",
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
    await screen.findByRole("heading", { name: "每日访客记录" });
    assert.ok(await screen.findByText("首次来访", { exact: true }));
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
  } catch(error) {
    t.diagnostic('UI failure: '+error.message.slice(0,800));throw error;
  } finally {
    cleanup?.();
    await mf.dispose();
    await new Promise(resolve=>setImmediate(resolve));
    globalThis.fetch = nativeFetch;
    for (const [name, descriptor] of saved) {
      if (descriptor) Object.defineProperty(globalThis, name, descriptor);
      else delete globalThis[name];
    }
    dom.window.close();
    if (fs.existsSync(compiled)) fs.unlinkSync(compiled);
  }
});
