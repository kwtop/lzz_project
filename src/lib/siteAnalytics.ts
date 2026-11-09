type EventName =
  | "page_view" | "product_view" | "parameters_expand" | "image_view"
  | "download_click" | "quote_click" | "whatsapp_click" | "email_click"
  | "form_start" | "form_error";
type EventData = {
  id: string; type: EventName; page: string; product: string; language: string;
  position: string; resource: string; errorCode: string;
};
type Meta = { product?: string; position?: string; resource?: string; errorCode?: string };
let collecting = false, enabled = false, started = false, flushing = false;
let mode: "aggregate" | "detailed" = "detailed";
let revision = 0, lastActivity = 0;
let initializing: Promise<boolean> | undefined;
let timer: ReturnType<typeof setTimeout> | undefined;
let pending: AbortController | undefined;
let pendingSession: AbortController | undefined;
let updatePreferenceUI = () => {};
const queue: EventData[] = [];
const preferenceKey = "lzz.analytics.consent";
const privateMode = () => navigator.doNotTrack === "1" ||
  (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;

export function inquiryAttribution() {
  const url = new URL(location.href);
  const safe = (value: string | null) => value && /^[a-zA-Z0-9_.-]{1,80}$/.test(value) ? value : "";
  let referrer = "";
  try { referrer = new URL(document.referrer).origin; } catch { /* Unknown. */ }
  return {
    analyticsEnabled: collecting && mode === "detailed" && !privateMode(),
    page: location.pathname,
    language: document.documentElement.lang || "unknown",
    referrer,
    utmSource: safe(url.searchParams.get("utm_source")),
    utmMedium: safe(url.searchParams.get("utm_medium")),
  };
}
function aggregateAttribution() {
  const input = inquiryAttribution();
  const names = ["google", "bing", "yandex", "baidu", "duckduckgo", "yahoo", "facebook", "instagram", "linkedin", "youtube", "reddit", "tiktok", "x", "twitter", "chatgpt", "perplexity", "claude", "gemini", "email", "newsletter"];
  let host = "";
  try { if (input.referrer !== location.origin) host = new URL(input.referrer).hostname.replace(/^www\./, ""); } catch { /* Unknown. */ }
  const campaign = input.utmSource.toLowerCase();
  const namedReferrer = names.find(name => host === name + ".com" || host.startsWith(name + ".") || host.endsWith("." + name + ".com"));
  const source = names.includes(campaign) ? campaign : campaign ? "campaign" : namedReferrer || (host ? "referral" : "unknown");
  const medium = input.utmMedium.toLowerCase();
  const search = ["google", "bing", "yandex", "baidu", "duckduckgo", "yahoo"];
  const social = ["facebook", "instagram", "linkedin", "youtube", "reddit", "tiktok", "x", "twitter"];
  const channel = /^(cpc|ppc|paidsearch|paid_search)$/.test(medium) ? "paid_search"
    : /^(paid_social|paidsocial)$/.test(medium) ? "paid_social"
    : medium === "email" ? "email"
    : search.includes(source) && (namedReferrer || medium === "organic") ? "organic_search"
    : social.includes(source) ? "social"
    : host ? "referral" : campaign ? "campaign" : "unknown";
  return { source, channel };
}
export function trackEvent(type: EventName, meta: Meta = {}) {
  try {
    if (!collecting || privateMode()) return;
    queue.push({
      id: crypto.randomUUID(),
      type,
      page: location.pathname,
      product: meta.product || location.pathname.match(/^\/machined-parts\/gallery\/([^/]+)\/$/)?.[1] ||
        (location.pathname === "/quote/" ? new URLSearchParams(location.search).get("product") || "" : ""),
      language: document.documentElement.lang || "unknown",
      position: meta.position || "main",
      resource: meta.resource ? new URL(meta.resource, location.href).pathname : "",
      errorCode: meta.errorCode || "",
    });
    if (queue.length > 80) queue.splice(0, queue.length - 80);
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => { void flush(); }, 120);
  } catch { /* Statistics never interrupt browsing or inquiry submission. */ }
}
function stopPending() {
  revision++;
  enabled = false;
  queue.length = 0;
  if (timer) clearTimeout(timer);
  timer = undefined;
  pending?.abort();
  pendingSession?.abort();
  initializing = undefined;
}
async function initialize(resume = false) {
  if (!collecting || privateMode()) return false;
  if (initializing && !resume) return initializing;
  const generation = revision;
  const controller = new AbortController();
  pendingSession = controller;
  const timeout = setTimeout(() => controller.abort(), 5000);
  const operation = (async () => {
    try {
      const response = await fetch("/api/analytics/session", {
        method: "POST", headers: { "Content-Type": "application/json" },
        credentials: "same-origin", referrerPolicy: "no-referrer",
        body: JSON.stringify({ ...inquiryAttribution(), ...(resume ? { enabled: true } : {}) }),
        signal: controller.signal,
      });
      const result = await response.json();
      if (generation !== revision || !collecting || privateMode()) return false;
      mode = result.mode === "aggregate" ? "aggregate" : "detailed";
      enabled = response.ok && result.enabled === true;
      if (enabled) lastActivity = Date.now();
      updatePreferenceUI();
      return enabled;
    } catch {
      if (generation === revision) enabled = false;
      return false;
    } finally {
      clearTimeout(timeout);
      if (pendingSession === controller) pendingSession = undefined;
    }
  })();
  initializing = operation;
  try { return await operation; }
  finally { if (initializing === operation) initializing = undefined; }
}
async function flush() {
  if (flushing || !queue.length) return;
  if (!collecting || privateMode()) { stopPending(); return; }
  flushing = true;
  const generation = revision;
  let events: EventData[] = [], sent = false, retry = false;
  const controller = new AbortController();
  pending = controller;
  const timeout = setTimeout(() => controller.abort(), 6000);
  try {
    if (Date.now() - lastActivity > 30 * 60000) enabled = false;
    if (!enabled && !(await initialize())) { queue.length = 0; return; }
    if (!collecting || privateMode() || generation !== revision) return;
    events = queue.splice(0, 20);
    for (let attempt = 0; attempt < 2; attempt++) {
      const payload = mode === "detailed" ? { events } : {
        events: events.map(({ type, page, product, language, position }) => ({ type, page, product, language, position })),
        ...aggregateAttribution(),
      };
      const response = await fetch(mode === "detailed" ? "/api/events" : "/api/analytics/aggregate", {
        method: "POST", headers: { "Content-Type": "application/json" },
        credentials: "same-origin", referrerPolicy: "no-referrer",
        body: JSON.stringify(payload), keepalive: true, signal: controller.signal,
      });
      if (!response.ok) { retry = mode === "detailed" && response.status >= 500; break; }
      const result = await response.json();
      if (result.ignored && mode === "detailed" && attempt === 0) {
        enabled = false;
        if (collecting && generation === revision && await initialize()) continue;
      }
      sent = true; lastActivity = Date.now(); break;
    }
  } catch {
    // Detailed events retain their IDs so a later retry cannot double count.
    retry = mode === "detailed" && !controller.signal.aborted;
  } finally {
    clearTimeout(timeout);
    if (pending === controller) pending = undefined;
    if (retry && collecting && !privateMode() && generation === revision) {
      queue.unshift(...events);
      if (queue.length > 80) queue.splice(80);
    }
    flushing = false;
    if (sent && collecting && !privateMode() && queue.length)
      timer = setTimeout(() => { void flush(); }, 120);
  }
}
function position(element: Element) {
  if (element.closest("header.site-header")) return "header";
  if (element.closest("footer")) return "footer";
  if (element.closest(".inquiry-form")) return "quote-form";
  if (element.closest('[class*="hero"]')) return "hero";
  return "main";
}
function pageEvents() {
  trackEvent("page_view");
  if (/^\/machined-parts\/gallery\/[^/]+\/$/.test(location.pathname))
    trackEvent("product_view");
}
export function initSiteAnalytics() {
  if (started || location.pathname.startsWith("/admin") ||
      document.querySelector<HTMLMetaElement>('meta[name="robots"]')?.content.includes("noindex")) return;
  started = true;
  const oldBanner = document.querySelector<HTMLElement>("[data-analytics-consent]");
  if (oldBanner) oldBanner.hidden = true;
  let preference = "";
  try { preference = localStorage.getItem(preferenceKey) || ""; } catch { /* No preference is stored. */ }
  collecting = preference !== "no" && !privateMode();
  const status = document.querySelector<HTMLElement>("[data-analytics-privacy-status]");
  function renderPreference() {
    document.querySelectorAll<HTMLButtonElement>("[data-analytics-allow]").forEach(button => {
      button.setAttribute("aria-pressed", String(collecting)); button.disabled = privateMode();
    });
    document.querySelectorAll<HTMLButtonElement>("[data-analytics-deny]").forEach(button => button.setAttribute("aria-pressed", String(!collecting)));
    if (status) status.textContent = privateMode()
      ? "Analytics are off because this browser sends a Do Not Track or Global Privacy Control preference."
      : collecting ? (mode === "aggregate" ? "Anonymous page and click totals are on." : "Visit history is on for this browser.") : "Analytics are off for this browser.";
  }
  updatePreferenceUI = renderPreference;
  function savePreference(allow: boolean) {
    try { localStorage.setItem(preferenceKey, allow ? "yes" : "no"); } catch { /* In-memory preference applies. */ }
  }
  function choose(allow: boolean) {
    const wasCollecting = collecting;
    collecting = allow && !privateMode();
    savePreference(collecting);
    renderPreference();
    if (!collecting) {
      stopPending();
      void fetch("/api/analytics/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "same-origin", body: JSON.stringify({ enabled: false }), keepalive: true }).catch(() => {});
    } else if (!wasCollecting) { void initialize(true); pageEvents(); }
  }
  renderPreference();
  if (collecting) { void initialize(); pageEvents(); }
  document.querySelectorAll("[data-analytics-allow]").forEach(button => button.addEventListener("click", () => choose(true)));
  document.querySelectorAll("[data-analytics-deny]").forEach(button => button.addEventListener("click", () => choose(false)));
  window.addEventListener("storage", event => {
    if (event.key !== preferenceKey && event.key !== null) return;
    const wasCollecting = collecting;
    collecting = event.newValue !== "no" && !privateMode();
    if (!collecting) stopPending();
    renderPreference();
    if (collecting && !wasCollecting) { void initialize(); pageEvents(); }
  });
  document.querySelector("[data-analytics-forget]")?.addEventListener("click", async () => {
    collecting = false; stopPending(); savePreference(false); renderPreference();
    try {
      const response = await fetch("/api/analytics/forget", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}", credentials: "same-origin" });
      if (!response.ok) throw Error();
      if (status) status.textContent = "Visit history linked to this browser has been cleared and collection is off. Submitted inquiries are kept for follow-up.";
    } catch {
      if (status) status.textContent = "Analytics are off. We could not clear visit history; please try again.";
    }
  });
  const startedForms = new WeakSet<HTMLFormElement>();
  document.addEventListener("focusin", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const form = target.closest<HTMLFormElement>("form.inquiry-form");
    if (form && !startedForms.has(form)) {
      startedForms.add(form);
      trackEvent("form_start", { position: "quote-form" });
    }
  });
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const link = target.closest<HTMLAnchorElement>("a[href]");
    if (!link) return;
    let url: URL;
    try {
      url = new URL(link.href);
    } catch {
      return;
    }
    const meta = {
      position: position(link),
      resource: url.origin === location.origin ? url.pathname : "",
      product: url.searchParams.get("product") || undefined,
    };
    if (url.protocol === "mailto:")
      trackEvent("email_click", { position: meta.position });
    else if (/(^|\.)(wa\.me|whatsapp\.com)$/.test(url.hostname))
      trackEvent("whatsapp_click", { position: meta.position });
    else if (url.origin === location.origin && url.pathname === "/quote/")
      trackEvent("quote_click", meta);
    else if (
      url.origin === location.origin &&
      (link.hasAttribute("download") || url.pathname.startsWith("/downloads/"))
    )
      trackEvent("download_click", meta);
  });
  document.addEventListener(
    "toggle",
    (event) => {
      const element = event.target;
      if (
        element instanceof HTMLDetailsElement &&
        element.open &&
        element.closest("main") &&
        element.matches(
          "[data-analytics-parameters],.cd-material-drawing-notes,.pr-review-notes,.res-rfq-details,#equipment-review,#inspection-equipment,.cl-part-disclosure:not(.cl-part-further),.cc-material-notes",
        )
      )
        trackEvent("parameters_expand", { position: "parameters" });
    },
    true,
  );
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") void flush();
  });
  window.addEventListener("pagehide", () => {
    void flush();
  });
  window.addEventListener("online", () => {
    void flush();
  });
}
