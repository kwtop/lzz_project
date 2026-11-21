import { highIntentEvents, type PublicEventType as EventName } from './visitEvents';
type EventData = {
  id: string; type: EventName; page: string; product: string; language: string;
  position: string; resource: string; errorCode: string;
  pageTitle:string;pageViewId:string;occurredAt:number;sequence:number;
  sectionId:string;sectionLabel:string;elementId:string;elementLabel:string;target:string;
};
type Meta = { product?: string; position?: string; resource?: string; errorCode?: string;sectionId?:string;sectionLabel?:string;elementId?:string;elementLabel?:string;target?:string };
let collecting = false, enabled = false, started = false, flushing = false;
let mode: "aggregate" | "detailed" = "detailed";
let revision = 0, lastActivity = 0;
let initializing: Promise<boolean> | undefined;
let timer: ReturnType<typeof setTimeout> | undefined;
let pageViewId='',sequence=0;
let visitId = '';
let pending: AbortController | undefined;
let pendingSession: AbortController | undefined;
let updatePreferenceUI = () => {};
const queue: EventData[] = [];
const preferenceKey = "lzz.analytics.consent";
const visitKey = "lzz.analytics.visit";
const technicalDetails =
  '[data-analytics-parameters],.cd-material-drawing-notes,.pr-review-notes,.res-rfq-details,#equipment-review,#inspection-equipment,.cl-part-disclosure:not(.cl-part-further),.cc-material-notes';
const privateMode = () => navigator.doNotTrack === "1" ||
  (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
const localizedProduct=()=>document.querySelector<HTMLElement>('[data-localized-product]')?.dataset.localizedProduct;
const isQuotePage=(path:string)=>path==='/quote/'||path==='/es/cotizacion/';

export function inquiryAttribution() {
  const url = new URL(location.href);
  const safe = (value: string | null) => value && /^[a-zA-Z0-9_.-]{1,80}$/.test(value) ? value : "";
  let referrer = "";
  try { referrer = new URL(document.referrer).origin; } catch { /* Unknown. */ }
  return {
    analyticsEnabled: collecting && mode === "detailed" && !privateMode(),
    visitId: collecting && !privateMode() ? visitId : '',
    page: location.pathname,
    language: document.documentElement.lang || "unknown",
    referrer,
    utmSource: safe(url.searchParams.get("utm_source")),
    utmMedium: safe(url.searchParams.get("utm_medium")),
    utmCampaign:safe(url.searchParams.get('utm_campaign')),
    adSource:url.searchParams.has('gclid')||url.searchParams.has('gbraid')||url.searchParams.has('wbraid')?'google':url.searchParams.has('msclkid')?'bing':'',
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
      product: meta.product || localizedProduct() || location.pathname.match(/^\/machined-parts\/gallery\/([^/]+)\/$/)?.[1] ||
        (isQuotePage(location.pathname) ? new URLSearchParams(location.search).get("product") || "" : ""),
      language: document.documentElement.lang || "unknown",
      position: meta.position || "main",
      resource: meta.resource ? new URL(meta.resource, location.href).pathname : "",
      errorCode: meta.errorCode || "",
      pageTitle:document.title.slice(0,200),pageViewId,occurredAt:Date.now(),sequence:++sequence,
      sectionId:meta.sectionId||'',sectionLabel:meta.sectionLabel||'',elementId:meta.elementId||'',elementLabel:meta.elementLabel||'',target:safeTarget(meta.target),
    });
    if (queue.length > 80) queue.splice(0, queue.length - 80);
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => { void flush(); }, 120);
    if (highIntentEvents.has(type)) queueMicrotask(() => { void flush(); });
  } catch { /* Statistics never interrupt browsing or inquiry submission. */ }
}
function safeTarget(input?:string){
 if(!input)return '';
 try{const url=new URL(input,location.origin);
  if(url.protocol==='mailto:')return url.pathname.toLowerCase()==='roger@lzz-cnc.com'?'mailto:roger@lzz-cnc.com':'';
  if(url.protocol==='tel:')return url.pathname.replace(/[^\d]/g,'')==='8613858102479'?'tel:+8613858102479':'';
  if(/(^|\.)(wa\.me|whatsapp\.com)$/.test(url.hostname)){const phone=(url.searchParams.get('phone')||url.pathname.replace(/^\//,'')).replace(/^\+/,'');return phone==='8613858102479'?'https://wa.me/'+phone:'';}
  return url.origin===location.origin?url.pathname+(/^#[a-zA-Z][\w:.-]{0,99}$/.test(url.hash)?url.hash:''):'';
 }catch{return '';}
}
function rememberVisit(id: string) {
  visitId = id;
  try {
    if (id) sessionStorage.setItem(visitKey, id);
    else sessionStorage.removeItem(visitKey);
  } catch { /* The active page can still retain its visit in memory. */ }
}
function stopPending() {
  revision++;
  enabled = false;
  rememberVisit('');
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
      rememberVisit(enabled && mode === "detailed" && typeof result.visitId === 'string' ? result.visitId : '');
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
    events = takeBatch();
    for (let attempt = 0; attempt < 2; attempt++) {
      const payload = mode === "detailed" ? { events, visitId } : {
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
function takeBatch(){
 const batch:EventData[]=[];let size=0;
 while(queue.length&&batch.length<20){const length=new TextEncoder().encode(JSON.stringify(queue[0])).length;if(batch.length&&size+length>18000)break;size+=length;batch.push(queue.shift()!);}
 return batch;
}
function exitFlush(){
 if(!collecting||privateMode()||!enabled||mode!=='detailed'||typeof navigator.sendBeacon!=='function'){void flush();return;}
 for(let n=0;n<3&&queue.length;n++){
  const events=takeBatch();
  if(!navigator.sendBeacon('/api/events',new Blob([JSON.stringify({events,visitId})],{type:'application/json'}))){queue.unshift(...events);void flush();break;}
 }
}
function position(element: Element) {
  if (element.closest("header.site-header")) return "header";
  if (element.closest("footer")) return "footer";
  if (element.closest(".inquiry-form")) return "quote-form";
  if (element.closest('[class*="hero"]')) return "hero";
  return "main";
}
function interactionMeta(element: HTMLElement): Meta {
  const { dataset } = element;
  const section = element.closest<HTMLElement>('main section');
  const safeLabel = (label?: string | null) => label?.replace(/\s+/g, ' ').trim().slice(0, 120);
  return {
    position: position(element),
    sectionId: dataset.analyticsSection || section?.id,
    sectionLabel: dataset.analyticsSectionLabel || safeLabel(section?.querySelector('h2,h3')?.textContent),
    elementId: dataset.analyticsId || element.id,
    elementLabel: dataset.analyticsLabel || safeLabel(element.getAttribute('aria-label') || element.textContent),
  };
}
function pageEvents() {
  trackEvent("page_view");
  if (localizedProduct() || /^\/machined-parts\/gallery\/[^/]+\/$/.test(location.pathname))
    trackEvent("product_view");
}
export function initSiteAnalytics() {
  if (started || location.pathname.startsWith("/admin") ||
      document.querySelector<HTMLMetaElement>('meta[name="robots"]')?.content.includes("noindex")) return;
  started = true;
  pageViewId=crypto.randomUUID();
  const oldBanner = document.querySelector<HTMLElement>("[data-analytics-consent]");
  if (oldBanner) oldBanner.hidden = true;
  let preference = "";
  try { preference = localStorage.getItem(preferenceKey) || ""; } catch { /* No preference is stored. */ }
  collecting = preference !== "no" && !privateMode();
  if (collecting) {
    try { visitId = sessionStorage.getItem(visitKey) || ''; } catch { /* No stored visit. */ }
  } else rememberVisit('');
  const status = document.querySelector<HTMLElement>("[data-analytics-privacy-status]");
  const spanish=document.documentElement.lang==='es';
  function renderPreference() {
    document.querySelectorAll<HTMLButtonElement>("[data-analytics-allow]").forEach(button => {
      button.setAttribute("aria-pressed", String(collecting)); button.disabled = privateMode();
    });
    document.querySelectorAll<HTMLButtonElement>("[data-analytics-deny]").forEach(button => button.setAttribute("aria-pressed", String(!collecting)));
    if(status&&spanish) status.textContent=privateMode()
      ?"La medición está desactivada porque el navegador envía una señal Do Not Track o Global Privacy Control."
      :collecting?(mode==="aggregate"?"El recuento anónimo de visitas y clics está activo.":"El historial de visitas está activo en este navegador."):"La medición está desactivada en este navegador.";
    else if (status) status.textContent = privateMode()
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
      if (status) status.textContent = spanish?"Se borró el historial de este navegador y se desactivó la medición. Conservamos las solicitudes ya enviadas para responderte.":"Visit history linked to this browser has been cleared and collection is off. Submitted inquiries are kept for follow-up.";
    } catch {
      if (status) status.textContent = spanish?"La medición está desactivada. No pudimos borrar el historial. Vuelve a intentarlo.":"Analytics are off. We could not clear visit history; please try again.";
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
  function recordClick(event: MouseEvent) {
    if (event.type === 'auxclick' && event.button !== 1) return;
    const target = event.target;
    if (!(target instanceof Element)) return;
    const link = target.closest<HTMLAnchorElement>("a[href]");
    if (!link) {
      const summary = target.closest<HTMLElement>('summary');
      const disclosure = summary?.parentElement;
      if (summary && disclosure instanceof HTMLDetailsElement && disclosure.closest('main') &&
          !disclosure.matches(technicalDetails) && !disclosure.closest('.analytics-legacy')) {
        trackEvent(disclosure.open ? 'details_collapse' : 'details_expand', interactionMeta(summary));
        return;
      }
      const button = target.closest<HTMLButtonElement>('button');
      if (button && !button.disabled &&
          !button.closest('form,[contenteditable],[data-analytics-consent],[data-analytics-allow],[data-analytics-deny],[data-analytics-forget]'))
        trackEvent('button_click', interactionMeta(button));
      return;
    }
    if (link.closest('[contenteditable]')) return;
    let url: URL;
    try {
      url = new URL(link.href);
    } catch {
      return;
    }
    const meta = {
      ...interactionMeta(link),
      resource: url.origin === location.origin ? url.pathname : "",
      product: url.searchParams.get("product") || undefined,
      target: link.dataset.analyticsTarget || url.href,
    };
    if (url.protocol === "mailto:"||link.dataset.analyticsType==='email_click')
      trackEvent("email_click", meta);
    else if (/(^|\.)(wa\.me|whatsapp\.com)$/.test(url.hostname))
      trackEvent("whatsapp_click", meta);
    else if (url.protocol === 'tel:')
      trackEvent('phone_click', meta);
    else if (url.origin === location.origin && isQuotePage(url.pathname))
      trackEvent("quote_click", meta);
    else if (
      url.origin === location.origin &&
      (link.hasAttribute("download") || url.pathname.startsWith("/downloads/")||link.dataset.analyticsType==='download_click')
    )
      trackEvent("download_click", meta);
    else if (['http:', 'https:'].includes(url.protocol))
      trackEvent('link_click', meta);
  }
  document.addEventListener('click', recordClick, true);
  document.addEventListener('auxclick', recordClick, true);
  document.addEventListener('change', (event) => {
    const control = event.target;
    if (!(control instanceof Element) || !control.matches('select,input[type="checkbox"],input[type="radio"]') ||
        control.closest('form.inquiry-form,[contenteditable]') || !control.closest('main')) return;
    const meta = interactionMeta(control as HTMLElement);
    trackEvent('filter_change', { ...meta, elementLabel: control.getAttribute('aria-label') || 'Page filter' });
  });
  document.addEventListener(
    "toggle",
    (event) => {
      const element = event.target;
      if (
        element instanceof HTMLDetailsElement &&
        element.closest("main") &&
        element.matches(technicalDetails)
      ) {
        const label = element.querySelector<HTMLElement>('summary');
        trackEvent(element.open ? 'parameters_expand' : 'parameters_collapse', {
          ...interactionMeta(label || element), position: 'parameters',
        });
      }
    },
    true,
  );
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") exitFlush();
  });
  window.addEventListener("pagehide", () => {
    exitFlush();
  });
  window.addEventListener("online", () => {
    void flush();
  });
}
