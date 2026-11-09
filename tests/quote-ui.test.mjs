import { schemaSql } from "./helpers/schema.mjs";
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { randomBytes, pbkdf2Sync } from "node:crypto";
import { build } from "esbuild";
import { Miniflare, convertV4MiniflareOptions } from "miniflare";
import { JSDOM } from "jsdom";

test("public form saves real files and retries a lost receipt without duplicates", async () => {
  const root = path.resolve(import.meta.dirname, ".."),
    output = path.join(root, ".wrangler", "ui-component-test");
  fs.mkdirSync(output, { recursive: true });
  const compiled = path.join(output, "QuoteForm.mjs");
  await build({
    entryPoints: [path.join(root, "src/components/QuoteForm.tsx")],
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
    hash = [
      "pbkdf2-sha256",
      "100000",
      salt.toString("base64"),
      pbkdf2Sync(
        "local-only-unused-password",
        salt,
        100000,
        32,
        "sha256",
      ).toString("base64"),
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
        TOKEN_SECRET: "quote-component-integration-secret-over-32-characters",
        LOCAL_DEVELOPMENT: "true",
        ADMIN_AUTH_MODE: "password",
        ADMIN_USERNAME: "admin",
        ADMIN_PASSWORD_HASH: hash,
      },
    }),
  );
  const product = JSON.parse(
      fs.readFileSync(root + "/server/catalog.generated.json", "utf8"),
    )[0],
    productPath = "/machined-parts/gallery/" + product.id + "/";
  const dom = new JSDOM(
    '<!doctype html><html lang="en"><body><div id="root"></div></body></html>',
    {
      url:
        "http://localhost/quote/?" +
        new URLSearchParams({ product: product.id, source: productPath }),
      pretendToBeVisual: true,
    },
  );
  const saved = new Map(),
    nativeRequest = globalThis.Request,
    nativeFetch = globalThis.fetch;
  let cleanup,
    network = "normal",
    release;
  try {
    const db = await mf.getD1Database("DB");
    await db.batch(
      schemaSql(root)
        .split(";")
        .map((sql) => sql.trim())
        .filter(Boolean)
        .map((sql) => db.prepare(sql)),
    );
    for (const name of [
      "window",
      "document",
      "location",
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
      "requestAnimationFrame",
    ]) {
      saved.set(name, Object.getOwnPropertyDescriptor(globalThis, name));
      Object.defineProperty(globalThis, name, {
        value: ["getComputedStyle", "requestAnimationFrame"].includes(name)
          ? dom.window[name].bind(dom.window)
          : dom.window[name],
        configurable: true,
        writable: true,
      });
    }
    saved.set(
      "IS_REACT_ACT_ENVIRONMENT",
      Object.getOwnPropertyDescriptor(globalThis, "IS_REACT_ACT_ENVIRONMENT"),
    );
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    globalThis.fetch = async (route, init = {}) => {
      const request = new nativeRequest("http://localhost" + route, {
        ...init,
        headers: {
          ...init.headers,
          Origin: "http://localhost",
          "User-Agent": "LocalFormComponent/1.0",
        },
      });
      const response = await mf.dispatchFetch(request.url, {
        method: request.method,
        headers: Object.fromEntries(request.headers),
        body:
          request.method === "GET" ? undefined : await request.arrayBuffer(),
      });
      if (route === "/api/inquiries" && network === "lose-receipt") {
        network = "normal";
        assert.equal(response.status, 200);
        throw new Error("Local test: response lost after database commit");
      }
      if (route === "/api/inquiries" && network === "hold") {
        await new Promise((resolve) => {
          release = resolve;
        });
        network = "normal";
      }
      return response;
    };
    const { createElement } = await import("react"),
      testing = await import("@testing-library/react");
    cleanup = testing.cleanup;
    const { render, screen, fireEvent, waitFor } = testing,
      { default: QuoteForm } = await import(pathToFileURL(compiled).href);
    render(
      createElement(QuoteForm, {
        references: [
          {
            id: product.id,
            title: product.name,
            path: productPath,
            kind: "product",
            partType: "blocks",
            processes: ["milling"],
          },
        ],
      }),
    );
    await waitFor(() =>
      assert.equal(
        screen.getByRole("button", { name: "Send inquiry" }).disabled,
        false,
      ),
    );
    assert.equal(screen.getByLabelText("WhatsApp / Phone").checked, true);
    assert.equal(
      screen.getByLabelText("Product or part example").value,
      product.id,
    );
    fireEvent.click(screen.getByRole("button", { name: "Send inquiry" }));
    await screen.findByText("Enter your name.");
    assert.equal(
      (await db.prepare("SELECT COUNT(*) total FROM inquiries").first()).total,
      0,
    );
    fireEvent.change(screen.getByLabelText(/Your name/), {
      target: { value: "LOCAL FORM QA BUYER" },
    });
    fireEvent.change(screen.getByLabelText(/^Company/), {
      target: { value: "LOCAL FORM QA COMPANY" },
    });
    fireEvent.change(screen.getByLabelText(/Destination country/), {
      target: { value: "Canada" },
    });
    fireEvent.change(screen.getByLabelText(/WhatsApp \/ Phone number/), {
      target: { value: "unused invalid phone" },
    });
    fireEvent.click(screen.getByLabelText("Email", { selector: "input" }));
    fireEvent.change(screen.getByLabelText(/Email address/), {
      target: { value: "form-ui-qa@example.invalid" },
    });
    fireEvent.change(screen.getByLabelText(/^Message/), {
      target: { value: "Synthetic component QA only." },
    });
    const picker = screen.getByLabelText("Drawings or files", {
        selector: "input",
      }),
      file = new File(["%PDF-1.4\nLOCAL QA attachment"], "local-qa.pdf", {
        type: "application/pdf",
      });
    fireEvent.change(picker, {
      target: { files: [file, new File(["fixture"], "remove.stp")] },
    });
    await screen.findByText("2 files selected");
    fireEvent.click(screen.getByRole("button", { name: "Remove remove.stp" }));
    await screen.findByText("1 file selected");
    fireEvent.change(picker, {
      target: { files: [new File(["fixture"], "bad.exe")] },
    });
    await screen.findByText(
      "Those files were not added. Your earlier selection is unchanged.",
    );
    assert.ok(screen.getByText("local-qa.pdf"));
    network = "lose-receipt";
    fireEvent.click(screen.getByRole("button", { name: "Send inquiry" }));
    await screen.findByRole("heading", {
      name: "We could not confirm your inquiry",
    });
    assert.equal(screen.queryByRole("heading", { name: "Inquiry sent" }), null);
    assert.equal(
      screen.getByLabelText(/Your name/).value,
      "LOCAL FORM QA BUYER",
    );
    assert.ok(screen.getByText("local-qa.pdf"));
    assert.equal(
      (await db.prepare("SELECT COUNT(*) total FROM inquiries").first()).total,
      1,
    );
    network = "hold";
    fireEvent.click(screen.getByRole("button", { name: "Send inquiry" }));
    await screen.findByRole("button", { name: "Sending inquiry…" });
    await waitFor(() => assert.equal(typeof release, "function"));
    assert.equal(
      screen.getByRole("button", { name: "Sending inquiry…" }).disabled,
      true,
    );
    release();
    await screen.findByRole("heading", { name: "Inquiry sent" });
    const row = await db.prepare("SELECT * FROM inquiries").first();
    assert.equal(
      (await db.prepare("SELECT COUNT(*) total FROM inquiries").first()).total,
      1,
    );
    assert.equal(row.email, "form-ui-qa@example.invalid");
    assert.equal(row.phone, "");
    assert.equal(row.destination_country, "Canada");
    assert.equal(row.company, "LOCAL FORM QA COMPANY");
    assert.equal(row.product, product.id);
    assert.equal(row.source_page, productPath);
    assert.equal(row.page, "/quote/");
    assert.equal(row.language, "en");
    assert.ok(screen.getByText(row.id));
    assert.equal(
      (await db.prepare("SELECT COUNT(*) total FROM inquiry_files").first())
        .total,
      1,
    );
    assert.equal(
      (await (await mf.getR2Bucket("FILES")).list()).objects.length,
      1,
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Send another inquiry" }),
    );
    await waitFor(() =>
      assert.equal(screen.getByLabelText(/Your name/).value, ""),
    );
    assert.equal(
      screen.getByText("No files selected").textContent,
      "No files selected",
    );
    assert.equal(screen.getByLabelText("WhatsApp / Phone").checked, true);
    assert.equal(
      screen.getByLabelText("Product or part example").value,
      product.id,
    );
  } finally {
    release?.();
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
