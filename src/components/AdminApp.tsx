import { useEffect, useRef, useState } from "react";
import type { SyntheticEvent, ReactNode } from "react";
import { ChartNoAxesCombined, ChevronDown, ExternalLink, History, Inbox, ListFilter, LogOut, RefreshCw, X } from "lucide-react";
import {InsightsOverview,DateShortcuts,RecordPanel,JourneyPanel,sourceName} from "./AdminInsights";
import {adminDate as date,defaultAdminFilters,presetDates,readAdminView,adminViewQuery} from "../lib/adminInsightsState";
import type {AdminFilters,AdminDetail,Drill,JourneyContext,ReturnPeriod,Preset} from "../lib/adminInsightsState";
import type {DailyVisitor,StatsV2} from "../lib/insightTypes";

type Tab = "overview" | "inquiries" | "visitors";
type Session = { username: string; csrf: string; authMode?: string };
type Filters=AdminFilters;
type Options = {
  products: { id: string; name: string }[];
  source: { value: string }[];
  country: { value: string }[];
  language: { value: string }[];
  destinations: { value: string }[];
  campaigns: { value: string }[];
};
type Inquiry = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  destination_country: string;
  interest: string;
  product: string;
  part_type: string;
  processes: string;
  requirements: string;
  status: string;
  unread: number;
  created_at: number;
  updated_at: number;
  source_page: string;
  page: string;
  language: string;
  source: string;
  channel: string;
  country: string;
  device: string;
  visitor_id: string | null;
};
type Detail = {
  inquiry: Inquiry & { visit_id: string | null };
  files: { id: string; name: string; size: number; sha256: string }[];
  notes: { id: string; author: string; content: string; created_at: number }[];
};
type Page<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  unread?: number;
};
type Stats=StatsV2;
type ApiError = Error & { status?: number };
const stateLabels: Record<string, string> = {
  new: "待处理",
  following: "跟进中",
  completed: "已完成",
  spam: "垃圾询盘",
};
const deviceLabels: Record<string, string> = {
  mobile: "手机",
  desktop: "电脑",
  tablet: "平板",
  unknown: "未知",
};
const channelLabels: Record<string, string> = {
  paid_search: "付费搜索",
  paid_social: "付费社交",
  organic_search: "自然搜索",
  social: "社交平台",
  email: "邮件渠道",
  referral: "引荐网站",
  ai_referral: "AI 引荐",
  campaign: "可识别活动",
  unknown: "未知",
};
const processLabels: Record<string, string> = {
  milling: "CNC 铣削",
  turning: "CNC 车削",
  "multi-axis": "五轴加工",
  plastic: "塑料加工",
  castings: "铸件后加工",
  "not-sure": "尚未确定",
};
const partLabels: Record<string, string> = {
  housings: "壳体 / 盖板",
  shafts: "轴 / 接头 / 销",
  blocks: "块件 / 支架 / 环形件",
  impellers: "叶轮",
  plastics: "塑料零件",
  automotive: "汽车样件",
  batches: "多个料号",
  other: "其他 / 未确定",
};
const value = (item: unknown) =>
  item === null || item === undefined || item === "" ? "未知" : String(item);
const time = (timestamp: number) =>
  new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    dateStyle: "short",
    timeStyle: "short",
    hour12: false,
  }).format(timestamp);
const initialFilters=defaultAdminFilters;
function query(filters: Filters, tab: Tab, page = 1) {
  const params = new URLSearchParams();
  if (!(tab === "inquiries" && filters.allTime)) {
    params.set("start", filters.start);
    params.set("end", filters.end);
  }
  for (const key of ["source", "platform", "channel", "referrerHost", "entryPage", "pagePath", "utmCampaign", "country", "device", "product", "language"] as const)
    if (filters[key]) params.set(key, filters[key]);
  if (tab === "inquiries") {
    if (filters.q) params.set("q", filters.q);
    if (filters.destination) params.set("destination", filters.destination);
    if (filters.status) params.set("status", filters.status);
    if (filters.unread) params.set("unread", "1");
  }
  params.set("p", String(page));
  return params.toString();
}
async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(path, {
    credentials: "same-origin",
    cache: "no-store",
    ...init,
  });
  let result;
  try {
    result = await response.json();
  } catch {
    if(response.redirected||response.status===401)throw Object.assign(new Error('登录状态已过期，请重新登录后台。'),{status:401});
    throw Object.assign(
      new Error("后台接口未连接。请使用包含 Pages Functions 的本地服务。"),
      { status: response.status },
    );
  }
  if (!response.ok)
    throw Object.assign(new Error(result.message || "请求失败，请重试。"), {
      status: response.status,
    });
  return result;
}
function useData<T>(
  path: string,
  enabled: boolean,
  version: number,
  onUnauthorized: () => void,
) {
  const [state, setState] = useState<{
    data?: T;
    loading: boolean;
    error: string;
  }>({ loading: false, error: "" });
  useEffect(() => {
    let alive = true;
    if (!enabled) {
      setState({ loading: false, error: "" });
      return;
    }
    setState({ loading: true, error: "" });
    void api<T>(path)
      .then((data) => {
        if (alive) setState({ data, loading: false, error: "" });
      })
      .catch((error: ApiError) => {
        if (alive) {
          if (error.status === 401) onUnauthorized();
          setState({ loading: false, error: error.message });
        }
      });
    return () => {
      alive = false;
    };
  }, [path, enabled, version]);
  return state;
}
function Loading() {
  return (
    <p className="admin-loading" role="status">
      <span />
      正在读取数据…
    </p>
  );
}
function Empty({
  children = "没有符合条件的数据。",
}: {
  children?: ReactNode;
}) {
  return <div className="admin-empty">{children}</div>;
}
function Problem({ message, retry }: { message: string; retry: () => void }) {
  return (
    <div className="admin-error" role="alert">
      <p>{message}</p>
      <button onClick={retry}>重新加载</button>
    </div>
  );
}
function countryLabel(code: string) {
  if (!code || code === "unknown") return "未知";
  try {
    return (
      new Intl.DisplayNames(["zh-CN"], { type: "region" }).of(code) || code
    );
  } catch {
    return code;
  }
}
function Pager({
  page,
  total,
  pageSize,
  onChange,
}: {
  page: number;
  total: number;
  pageSize: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="admin-pager">
      <span>
        共 {total} 条 · 第 {page} / {Math.max(1, Math.ceil(total / pageSize))}{" "}
        页
      </span>
      <div>
        <button disabled={page <= 1} onClick={() => onChange(page - 1)}>
          上一页
        </button>
        <button
          disabled={page * pageSize >= total}
          onClick={() => onChange(page + 1)}
        >
          下一页
        </button>
      </div>
    </div>
  );
}
function Drawer({
  title,
  close,
  children, wide=false,
}: {
  title: string;
  close: () => void;
  children: ReactNode;
  wide?:boolean;
}) {
  const panel = useRef<HTMLElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null,
      overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.focus();
    function key(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      if (event.key === "Tab") {
        const elements = Array.from(
          panel.current?.querySelectorAll<HTMLElement>(
            "button:not([disabled]),a[href],input,select,textarea",
          ) || [],
        );
        if (!elements.length) {
          event.preventDefault();
          return;
        }
        const first = elements[0],
          last = elements.at(-1)!;
        if (
          event.shiftKey &&
          (document.activeElement === first ||
            document.activeElement === panel.current)
        ) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", key);
      previous?.focus();
    };
  }, []);
  useEffect(()=>{panel.current?.focus({preventScroll:true});},[title]);
  return (
    <div className="admin-overlay">
      <button
        className="admin-backdrop"
        aria-hidden="true"
        tabIndex={-1}
        onClick={close}
      />
      <section
        ref={panel}
        tabIndex={-1}
        className={"admin-drawer"+(wide?" admin-drawer--wide":"")}
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-drawer-title"
      >
        <header>
          <h2 id="admin-drawer-title">{title}</h2>
          <button className="admin-icon-button" onClick={close} aria-label="关闭详情">
            <X size={19} aria-hidden="true" />
          </button>
        </header>
        {children}
      </section>
    </div>
  );
}
export default function AdminApp() {
  const [analyticsMode, setAnalyticsMode] = useState<"aggregate" | "detailed">("detailed");
  const [session, setSession] = useState<Session | null>(null),
    [checking, setChecking] = useState(true),
    [authMode, setAuthMode] = useState("password"),
    [authError, setAuthError] = useState("");
  const [username, setUsername] = useState(""),
    [password, setPassword] = useState(""),
    [loginBusy, setLoginBusy] = useState(false);
  const [initialView]=useState(readAdminView);
  const [tab,setTab]=useState<Tab>(initialView.tab),
    [analyticsFilters,setAnalyticsFilters]=useState(initialView.analytics),
    [inquiryFilters,setInquiryFilters]=useState(initialView.inquiries),
    [draft,setDraft]=useState(initialView.tab==='inquiries'?initialView.inquiries:initialView.analytics),
    [page,setPage]=useState(initialView.page),
    [sourcePage,setSourcePage]=useState(initialView.sourcePage),
    [sourceDisclosure,setSourceDisclosure]=useState(initialView.sourceDisclosure),
    [details,setDetails]=useState<AdminDetail[]>(initialView.details),
    [returnPeriod,setReturnPeriod]=useState<ReturnPeriod|null>(initialView.returnPeriod),
    [version,setVersion]=useState(0);
  const filters=tab==='inquiries'?inquiryFilters:analyticsFilters;
  const setFilters=(value:Filters)=>{if(tab==='inquiries')setInquiryFilters(value);else setAnalyticsFilters(value);};
  const activeDetail=details.at(-1);
  const selectedInquiry=activeDetail?.kind==='inquiry'?activeDetail.id:'';
  const selectedVisitor=activeDetail?.kind==='journey'?activeDetail.id:'';
  const navigationMode=useRef<'push'|'replace'>('push');
  const customDateFocus=useRef(false),dayTrendFocus=useRef(false);
  const filterDrawer=useRef<HTMLDetailsElement>(null);
  const [note, setNote] = useState(""),
    [actionError, setActionError] = useState(""),
    [busy, setBusy] = useState(false),
    [notice, setNotice] = useState("");
  const invalidate = () => setSession(null),
    reload = () => setVersion((value) => value + 1);
  const optionData = useData<Options>(
    "/api/admin/options",
    !!session,
    version,
    invalidate,
  );
  const stats = useData<Stats>(
    "/api/admin/stats?" + query(filters, "overview"),
    !!session && tab === "overview",
    version,
    invalidate,
  );
  const list = useData<Page<Inquiry>>(
    "/api/admin/inquiries?" + query(filters, "inquiries", page),
    !!session && tab === "inquiries",
    version,
    invalidate,
  );
  const visitorList = useData<Page<DailyVisitor>>(
    "/api/admin/visitors?" + query(filters, "visitors", page),
    !!session && tab === "visitors",
    version,
    invalidate,
  );
  const detail = useData<Detail>(
    "/api/admin/inquiries/" + selectedInquiry,
    !!session && !!selectedInquiry,
    version,
    invalidate,
  );
  const productName = (id: string) =>
    optionData.data?.products.find((item) => item.id === id)?.name || value(id);
  useEffect(() => {
    let active = true;
    void api<{ adminAuthMode: string; analyticsMode?: "aggregate" | "detailed" }>("/api/config")
      .then((config) => {
        if (active) {
          setAuthMode(config.adminAuthMode);
          setAnalyticsMode(config.analyticsMode || "detailed");
        }
      })
      .catch(() => {});
    void api<Session>("/api/admin/session")
      .then((data) => {
        if (active) setSession(data);
      })
      .catch((error: ApiError) => {
        if (active && error.status !== 401) setAuthError(error.message);
      })
      .finally(() => {
        if (active) setChecking(false);
      });
    return () => {
      active = false;
    };
  }, []);
  useEffect(() => {
    setNote("");
    setActionError("");
  }, [selectedInquiry]);
  const routeReady=useRef(false);
  useEffect(()=>{
    const pop=()=>{const view=readAdminView();navigationMode.current='replace';setTab(view.tab);setAnalyticsFilters(view.analytics);setInquiryFilters(view.inquiries);setDraft(view.tab==='inquiries'?view.inquiries:view.analytics);setPage(view.page);setSourcePage(view.sourcePage);setSourceDisclosure(view.sourceDisclosure);setDetails(view.details);setReturnPeriod(view.returnPeriod);};
    window.addEventListener('popstate',pop);return()=>window.removeEventListener('popstate',pop);
  },[]);
  useEffect(()=>{
    if(!session)return;
    const next=adminViewQuery({tab,analytics:analyticsFilters,inquiries:inquiryFilters,page,sourcePage,sourceDisclosure,details,returnPeriod});
    if(window.location.search.slice(1)===next){navigationMode.current='push';return;}
    const previous=readAdminView(),state=window.history.state||{};
    if(!routeReady.current||navigationMode.current==='replace')window.history.replaceState({...state,lzzAdmin:true,modalSteps:routeReady.current?state.modalSteps||0:0,baseDepth:routeReady.current?state.baseDepth||0:details.length},'',window.location.pathname+'?'+next);
    else {const increase=details.length>previous.details.length;window.history.replaceState({...state,scrollY:window.scrollY},'',increase?window.location.pathname+'?'+adminViewQuery({...previous,details:details.slice(0,-1)}):window.location.href);window.history.pushState({lzzAdmin:true,modalSteps:increase?(state.modalSteps||0)+1:details.length?state.modalSteps||0:0,baseDepth:increase?(state.modalSteps?state.baseDepth:previous.details.length):0,scrollY:window.scrollY},'',window.location.pathname+'?'+next);}
    routeReady.current=true;navigationMode.current='push';
  },[session,tab,analyticsFilters,inquiryFilters,page,sourcePage,sourceDisclosure,details,returnPeriod]);
  useEffect(()=>{
    if(!session||analyticsFilters.preset!=='today')return;
    const check=()=>{const value=presetDates('today');if(value.start!==analyticsFilters.start){navigationMode.current='replace';const next={...analyticsFilters,...value};setAnalyticsFilters(next);if(tab!=='inquiries')setDraft(next);setPage(1);setSourcePage(1);setSourceDisclosure({key:'',page:1});}};
    const timer=setInterval(check,60000);window.addEventListener('focus',check);return()=>{clearInterval(timer);window.removeEventListener('focus',check);};
  },[session,analyticsFilters,tab]);
  function closeDetails(){const state=window.history.state;if(state?.modalSteps>0&&state.baseDepth===0){window.history.go(-state.modalSteps);return;}navigationMode.current='replace';setDetails([]);}
  function backDetails(index=details.length-2){if(index===details.length-2&&window.history.state?.modalSteps>0){window.history.back();return;}navigationMode.current='replace';setDetails(items=>items.slice(0,index+1));}
  function updateDetail(value:AdminDetail){navigationMode.current='replace';setDetails(items=>[...items.slice(0,-1),value]);}
  function openInquiry(id:string){setDetails(items=>[...items,{kind:'inquiry',id}]);}
  function openJourney(id:string,context:JourneyContext={},scroll?:number){setDetails(items=>{const previous=[...items];if(scroll!==undefined&&previous.at(-1)?.kind==='records'){const record=previous.at(-1) as Extract<AdminDetail,{kind:'records'}>;previous[previous.length-1]={...record,drill:{...record.drill,scroll}};}return [...previous,{kind:'journey',id,context}];});}
  function openRecords(drill:Drill){setDetails(items=>[...items,{kind:'records',drill:{...drill,to:Math.max(drill.to,drill.from+1)}}]);}
  function selectPreset(preset:Preset){
    if(preset==='custom'){
      if(filterDrawer.current)filterDrawer.current.open=true;
      if(draft.preset==='custom')filterDrawer.current?.querySelector<HTMLInputElement>('input[type="date"]')?.focus();
      else {customDateFocus.current=true;setDraft({...draft,preset});}
      return;
    }
    if(filterDrawer.current)filterDrawer.current.open=false;
    const value={...analyticsFilters,...presetDates(preset)};
    setAnalyticsFilters(value);setDraft(value);setPage(1);setSourcePage(1);setSourceDisclosure({key:'',page:1});setReturnPeriod(null);
  }
  function openDay(value:string){dayTrendFocus.current=true;setReturnPeriod(previous=>previous||{start:analyticsFilters.start,end:analyticsFilters.end,preset:analyticsFilters.preset});const next={...analyticsFilters,start:value,end:value,preset:'custom' as const};setAnalyticsFilters(next);setDraft(next);setPage(1);setSourcePage(1);setSourceDisclosure({key:'',page:1});}
  function openPeriodInquiries(extra:Record<string,string>={}){const value={...defaultAdminFilters(),...analyticsFilters,...extra,allTime:false,q:'',status:'',unread:false};setInquiryFilters(value);setDraft(value);setTab('inquiries');setPage(1);setDetails([]);}
  const detailLabel=(item:AdminDetail)=>item.kind==='records'?item.drill.title:item.kind==='journey'?'访客轨迹':'询盘详情';
  const detailBreadcrumb = (
    <nav className="admin-detail-breadcrumb" aria-label="详情路径">
      <button className="admin-text-button" onClick={closeDetails}>返回工作台</button>
      {details.map((item, index) => (
        <span key={index}>
          <span aria-hidden="true"> / </span>
          {index === details.length - 1
            ? <strong>{detailLabel(item)}</strong>
            : <button className="admin-text-button" onClick={() => backDetails(index)}>{detailLabel(item)}</button>}
        </span>
      ))}
      {details.length > 1 && (
        <button className="admin-text-button admin-back-detail" onClick={() => backDetails()}>← 返回上一层</button>
      )}
    </nav>
  );
  useEffect(()=>{if(customDateFocus.current&&draft.preset==='custom'&&tab!=='inquiries'){customDateFocus.current=false;filterDrawer.current?.querySelector<HTMLInputElement>('input[type="date"]')?.focus();}},[draft.preset,tab]);
  useEffect(()=>{if(dayTrendFocus.current&&!stats.loading&&stats.data?.range.start===Date.parse(analyticsFilters.start+'T00:00:00+08:00')){const heading=document.getElementById('admin-trend-heading');if(heading){dayTrendFocus.current=false;heading.focus({preventScroll:true});heading.scrollIntoView?.({block:'start'});}}},[stats.loading,stats.data,analyticsFilters.start]);
  async function login(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginBusy(true);
    setAuthError("");
    try {
      const data = await api<Session>("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      setSession(data);
      setPassword("");
    } catch (error) {
      setAuthError((error as Error).message);
    } finally {
      setLoginBusy(false);
    }
  }
  async function mutate(path: string, method: string, body: unknown) {
    if (!session) return;
    return api(path, {
      method,
      headers: {
        "Content-Type": "application/json",
        "X-LZZ-CSRF": session.csrf,
      },
      body: JSON.stringify(body),
    });
  }
  async function action(run: () => Promise<unknown>) {
    setBusy(true);
    setActionError("");
    try {
      await run();
      reload();
    } catch (error) {
      if ((error as ApiError).status === 401) setSession(null);
      setActionError((error as Error).message);
    } finally {
      setBusy(false);
    }
  }
  function apply(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const next={...draft,utmCampaign:draft.utmCampaign.trim().toLowerCase()};
    setDraft(next);
    setFilters(next);
    setSourcePage(1);setSourceDisclosure({key:'',page:1});
    setPage(1);
    if (filterDrawer.current) {
      filterDrawer.current.open=false;
      filterDrawer.current.querySelector("summary")?.focus({preventScroll:true});
    }
  }
  function changeTab(next: Tab) {
    setTab(next);
    setDraft(next==='inquiries'?inquiryFilters:analyticsFilters);
    setDetails([]);
    setPage(1);
    setNotice("");
    setActionError("");
  }
  async function exportCsv() {
    setBusy(true);
    setNotice("");
    try {
      const response = await fetch(
        "/api/admin/inquiries/export?" + query(filters, "inquiries"),
        { credentials: "same-origin", cache: "no-store" },
      );
      if (!response.ok) {
        const error = await response.json();
        if (response.status === 401) setSession(null);
        throw new Error(error.message || "导出失败。");
      }
      const url = URL.createObjectURL(await response.blob()),
        link = document.createElement("a");
      link.href = url;
      link.download = "lzz-inquiries-" + date(Date.now()) + ".csv";
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setNotice("询盘导出文件已生成。");
    } catch (error) {
      setNotice((error as Error).message);
    } finally {
      setBusy(false);
    }
  }
  if (checking)
    return (
      <div className="admin-auth">
        <p className="admin-wordmark">
          LZZ <span>网站后台</span>
        </p>
        <Loading />
      </div>
    );
  if (!session)
    return (
      <main className="admin-auth">
        <section>
          <p className="admin-wordmark">
            LZZ <span>网站后台</span>
          </p>
          <h1>登录工作台</h1>
          {authMode === "access" ? (
            <>
              <p>
                此后台使用 Cloudflare
                Access。请通过已配置的管理入口完成身份验证。
              </p>
              <button
                className="admin-primary"
                onClick={() => location.reload()}
              >
                重新检查登录状态
              </button>
            </>
          ) : (
            <form onSubmit={login}>
              <label>
                用户名
                <input
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </label>
              <label>
                密码
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </label>
              <button className="admin-primary" disabled={loginBusy}>
                {loginBusy ? "正在登录…" : "登录"}
              </button>
            </form>
          )}
          {authError && (
            <p className="admin-error" role="alert">
              {authError}
            </p>
          )}
          <a href="/">返回网站</a>
        </section>
      </main>
    );
  const select = (key: "source" | "country" | "language") => (
    <label>
      {
        (
          {
            source: "访问来源",
            country: "访客国家",
            language: "网站语言",
          } as const
        )[key]
      }
      <select
        value={draft[key]}
        onChange={(event) => setDraft({ ...draft, [key]: event.target.value })}
      >
        <option value="">全部</option>
        {optionData.data?.[key]?.map((row) => (
          <option key={row.value} value={row.value}>
            {key === "country" ? countryLabel(row.value) : value(row.value)}
          </option>
        ))}
      </select>
    </label>
  );
  const dateFields = (disabled: boolean) => (
    <>
      <label>
        开始日期
        <input
          type="date"
          value={draft.start}
          max={draft.end}
          disabled={disabled}
          onChange={(event) => setDraft({ ...draft, preset: "custom", start: event.target.value })}
        />
      </label>
      <label>
        结束日期
        <input
          type="date"
          value={draft.end}
          min={draft.start}
          max={date(Date.now())}
          disabled={disabled}
          onChange={(event) => setDraft({ ...draft, preset: "custom", end: event.target.value })}
        />
      </label>
    </>
  );
  const productField = (
    <label>
      产品
      <select value={draft.product} onChange={(event) => setDraft({ ...draft, product: event.target.value })}>
        <option value="">全部产品</option>
        {optionData.data?.products.map((product) => (
          <option key={product.id} value={product.id}>{product.name}</option>
        ))}
      </select>
    </label>
  );
  const filterActions = (
    <div className="admin-filter-actions">
      <button className="admin-primary">应用筛选</button>
      <button type="button" onClick={() => {
        const fresh = initialFilters();
        setDraft(fresh);
        setFilters(fresh);
        setPage(1);
      }}>重置</button>
    </div>
  );
  return (
    <div className={tab==="overview"?"admin-shell admin-shell--overview":"admin-shell"}>
      <aside className="admin-sidebar">
        <a href="/admin/" className="admin-wordmark">
          LZZ <span>网站后台</span>
        </a>
        <nav aria-label="后台功能">
          {(
            [
              ["overview", "访问洞察", ChartNoAxesCombined],
              ["inquiries", "询盘管理", Inbox],
              ["visitors", analyticsMode === "aggregate" ? "历史访客记录" : "访客与行为", History],
            ] as const
          ).map(([key, label, Icon]) => (
            <button
              key={key}
              className={tab === key ? "active" : ""}
              aria-current={tab === key ? "page" : undefined}
              onClick={() => changeTab(key)}
            >
              <Icon size={17} strokeWidth={1.8} aria-hidden="true"/>
              {label}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-bottom">
          <p title={session.username}>{session.username}</p>
          <a href="/" target="_blank" rel="noopener noreferrer">
            <ExternalLink size={15} aria-hidden="true" /> 打开网站
          </a>
          <button
            onClick={() =>
              void action(async () => {
                await mutate("/api/admin/logout", "POST", {});
                setSession(null);
                setDetails([]);
                if (session.authMode === "access")
                  location.assign("/cdn-cgi/access/logout");
              })
            }
          >
            <LogOut size={15} aria-hidden="true" /> 退出登录
          </button>
        </div>
      </aside>
      <main className="admin-main">
        {typeof window !== "undefined" && window.location.hostname.endsWith(".lzz-precision.pages.dev") && (
          <aside className="admin-preview-note" aria-label="预览数据说明">
            <strong>预览环境 · 独立测试数据</strong>
          </aside>
        )}
        <header className="admin-header">
          <div>
            <h1>
              {
                {
                  overview: "访问洞察",
                  inquiries: "询盘管理",
                  visitors: analyticsMode === "aggregate" ? "历史访客记录" : "访客与行为记录",
                }[tab]
              }
            </h1>
          </div>
          {tab!=="overview"&&<div>
            <button className="admin-refresh" disabled={busy} onClick={reload}>
              <RefreshCw size={15} aria-hidden="true"/> 刷新数据
            </button>
            {tab === "inquiries" && (
              <button
                className="admin-primary"
                disabled={busy}
                onClick={() => void exportCsv()}
              >
                导出询盘 CSV
              </button>
            )}
          </div>}
        </header>
        <div className={tab === "inquiries" ? "admin-toolbar admin-toolbar--list" : "admin-toolbar"}>
        {tab !== "inquiries" && (
          <div className="admin-toolbar-dates">
            <DateShortcuts preset={draft.preset} select={selectPreset} />
            <p className="admin-toolbar-period">
              {analyticsFilters.start === analyticsFilters.end
                ? analyticsFilters.start
                : analyticsFilters.start + " 至 " + analyticsFilters.end}
              <span title="北京时间 UTC+8">UTC+8</span>
            </p>
          </div>
        )}
        <div className="admin-active-filters">{(['platform','referrerHost','entryPage','pagePath','utmCampaign'] as const).filter(key=>filters[key]).map(key=><span key={key}>{({platform:'来源平台',referrerHost:'引荐域名',entryPage:'落地页',pagePath:'页面',utmCampaign:'推广活动'}[key])}：{filters[key]==='__unrecorded'?'未记录':filters[key]}<button aria-label={'清除'+key+'筛选'} onClick={()=>{const next={...filters,[key]:''};setFilters(next);setDraft(next);setPage(1);setSourcePage(1);setSourceDisclosure({key:'',page:1});}}>×</button></span>)}</div>
        {tab === "inquiries" ? (
          <form className="admin-inquiry-filters" onSubmit={apply}>
            <label className="admin-search">
              搜索询盘
              <input type="search" value={draft.q} maxLength={100} placeholder="姓名、公司、联系方式或需求"
                onChange={(event) => setDraft({ ...draft, q: event.target.value })} />
            </label>
            <label>
              处理状态
              <select value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value })}>
                <option value="">全部状态</option>
                {Object.entries(stateLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
              </select>
            </label>
            <label className="admin-check">
              <input type="checkbox" checked={draft.unread} onChange={(event) => setDraft({ ...draft, unread: event.target.checked })} />
              仅未读
            </label>
            {filterActions}
            <details className="admin-more-filters">
              <summary>更多筛选</summary>
              <div className="admin-filters">
                <label className="admin-check">
                  <input type="checkbox" checked={draft.allTime} onChange={(event) => setDraft({ ...draft, allTime: event.target.checked })} />
                  全部询盘日期
                </label>
                {dateFields(draft.allTime)}
                <label>
                  目的地国家
                  <select value={draft.destination} onChange={(event) => setDraft({ ...draft, destination: event.target.value })}>
                    <option value="">全部目的地</option>
                    {optionData.data?.destinations?.map((item) => <option key={item.value} value={item.value}>{value(item.value)}</option>)}
                  </select>
                </label>
                {select("source")}
                {select("country")}
                {productField}
                {select("language")}
              </div>
            </details>
          </form>
        ) : (
          <details ref={filterDrawer} className="admin-filter-drawer">
            <summary><ListFilter size={16} aria-hidden="true" />筛选条件<ChevronDown size={14} aria-hidden="true" /></summary>
            <form className="admin-filters" onSubmit={apply}>
              {draft.preset === 'custom' && dateFields(false)}
              {select("source")}
              {select("country")}
              <label>
                渠道
                <select value={draft.channel} onChange={(event) => setDraft({ ...draft, channel: event.target.value })}>
                  <option value="">全部渠道</option>
                  {Object.entries(channelLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
                </select>
              </label>
              <details className="admin-more-filters">
                <summary>更多筛选</summary>
                <div className="admin-filters">
                  {productField}
                  {select("language")}
                  <label>
                    设备
                    <select value={draft.device} onChange={(event) => setDraft({ ...draft, device: event.target.value })}>
                      <option value="">全部设备</option>
                      {Object.entries(deviceLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
                    </select>
                  </label>
                  <label>
                    推广活动
                    <input value={draft.utmCampaign} placeholder="选择或输入活动名称" list="analytics-campaigns" maxLength={80}
                      onChange={(event) => setDraft({ ...draft, utmCampaign: event.target.value })} />
                    <datalist id="analytics-campaigns">{optionData.data?.campaigns.map(({value}) => <option key={value} value={value} />)}</datalist>
                  </label>
                </div>
              </details>
              {filterActions}
            </form>
          </details>
        )}
        {tab==="overview"&&<button className="admin-refresh" disabled={busy} onClick={reload}><RefreshCw size={15} aria-hidden="true"/> 刷新数据</button>}
        </div>
        {tab!=='inquiries'&&returnPeriod&&<button className="admin-return-period" onClick={()=>{const value={...analyticsFilters,...returnPeriod};setAnalyticsFilters(value);setDraft(value);setReturnPeriod(null);}}>← 返回 {returnPeriod.start} 至 {returnPeriod.end} 趋势</button>}
        {notice && (
          <p className="admin-notice" role="status">
            {notice}
          </p>
        )}
        {actionError && !selectedInquiry && !selectedVisitor && (
          <p className="admin-error" role="alert">
            {actionError}
          </p>
        )}
        {tab === "overview" &&
          (stats.loading ? (
            <Loading />
          ) : stats.error ? (
            <Problem message={stats.error} retry={reload} />
          ) : stats.data ? (
            <InsightsOverview stats={stats.data} query={query(analyticsFilters,'overview')} api={api} unauthorized={invalidate} version={version} onRecords={openRecords} onInquiries={openPeriodInquiries} onDay={openDay} onVisitors={()=>changeTab('visitors')} onJourney={openJourney} sourcePage={sourcePage} sourceDisclosure={sourceDisclosure} onSourceDisclosure={setSourceDisclosure} onSourcePage={setSourcePage} productName={productName} onChannel={channel=>{const value={...analyticsFilters,channel};setAnalyticsFilters(value);setDraft(value);setPage(1);setSourcePage(1);setSourceDisclosure({key:'',page:1});}}/>
          ) : null)}
        {tab === "inquiries" && (
          <section className="admin-section">
            <div className="admin-section-head">
              <h2>收到的询盘</h2>
              <span>
                {!inquiryFilters.allTime && (
                  <>{inquiryFilters.start}{inquiryFilters.start !== inquiryFilters.end && " 至 " + inquiryFilters.end} · </>
                )}
                {list.data?.total ?? "—"} 条 · 未读 {list.data?.unread ?? "—"}
              </span>
            </div>
            {list.loading ? (
              <Loading />
            ) : list.error ? (
              <Problem message={list.error} retry={reload} />
            ) : !list.data?.items.length ? (
              <Empty>暂无符合条件的询盘。</Empty>
            ) : (
              <>
                <div className="admin-table-scroll">
                  <table className="admin-data-table admin-inquiry-table" role="table">
                    <thead>
                      <tr>
                        <th>客户</th>
                        <th>联系方式</th>
                        <th>目的地 / 主题</th>
                        <th>状态</th>
                        <th>提交时间</th>
                        <th>来源</th>
                        <th>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list.data.items.map((item) => (
                        <tr
                          key={item.id}
                          className={item.unread ? "admin-unread" : ""}
                        >
                          <td data-column="客户">
                            <strong>
                              {item.unread === 1 && (
                                <span
                                  className="admin-unread-dot"
                                  title="未读"
                                />
                              )}
                              {item.name}
                            </strong>
                            <span>{value(item.company)}</span>
                          </td>
                          <td data-column="联系方式">
                            {item.email && <span>{item.email}</span>}
                            {item.phone && <span>{item.phone}</span>}
                            {!item.email && !item.phone && <span>未记录</span>}
                          </td>
                          <td data-column="目的地 / 主题">
                            <span>{item.destination_country}</span>
                            <small>{value(item.interest)}</small>
                          </td>
                          <td data-column="状态">
                            <span
                              className={
                                "admin-state admin-state-" + item.status
                              }
                            >
                              {stateLabels[item.status]}
                            </span>
                          </td>
                          <td data-column="提交时间">{time(item.created_at)}</td>
                          <td data-column="来源">
                            <span>{value(item.source)}</span>
                            <small>{value(item.language)}</small>
                          </td>
                          <td>
                            <button className="admin-text-button" onClick={() => openInquiry(item.id)}>
                              查看
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Pager
                  page={page}
                  total={list.data.total}
                  pageSize={list.data.pageSize}
                  onChange={setPage}
                />
              </>
            )}
          </section>
        )}
        {tab === "visitors" && (
          <section className="admin-section">
            <div className="admin-section-head">
              <h2>每日访客记录</h2>
              <span title="同一浏览器每天一条">
                {analyticsMode === "aggregate" ? "历史记录" : "共 " + (visitorList.data?.total ?? "—") + " 条"}
              </span>
            </div>
            {visitorList.loading ? (
              <Loading />
            ) : visitorList.error ? (
              <Problem message={visitorList.error} retry={reload} />
            ) : !visitorList.data?.items.length ? (
              <Empty>
                当前日期和筛选条件下暂无访客记录。
              </Empty>
            ) : (
              <>
                <div className="admin-table-scroll">
                  <table className="admin-data-table admin-visitor-table" role="table">
                    <thead>
                      <tr>
                        <th>浏览器编号</th>
                        <th>日期 / 最后活动</th>
                        <th>访问 / 浏览</th>
                        <th>最近来源 / 国家</th>
                        <th>设备</th>
                        <th>当日询盘</th>
                        <th>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visitorList.data.items.map((item) => {
                        const day = date(item.day_start);
                        return (
                          <tr key={item.id + ":" + day}>
                            <td data-column="浏览器编号">
                              <code title={item.id}>{item.id.slice(0, 12)}…</code>
                              <small>{item.is_returning === 1 ? "回访访客" : "首次来访"}</small>
                            </td>
                            <td data-column="最后活动">{time(item.last_seen)}</td>
                            <td data-column="访问 / 浏览">{item.visits} / {item.views}</td>
                            <td data-column="最近来源 / 国家">
                              <span>{item.source_platform
                                ? sourceName({platform: item.source_platform, channel: item.source_channel || "unknown"})
                                : value(item.source)}</span>
                              <small>{[item.referrer_host, countryLabel(item.country)].filter(Boolean).join(" · ")}</small>
                              {item.first_source_platform && (
                                <small className="admin-visitor-origin">
                                  首次已知 {sourceName({platform: item.first_source_platform, channel: item.first_source_channel || "unknown"})}
                                </small>
                              )}
                            </td>
                            <td data-column="设备">{deviceLabels[item.device] || "未知"}</td>
                            <td data-column="当日询盘">{item.inquiries}</td>
                            <td>
                              <button className="admin-text-button" onClick={() => {
                                const dayFilters = { ...analyticsFilters, start: day, end: day };
                                const params = new URLSearchParams(query(dayFilters, "visitors"));
                                openJourney(item.id, { params: Object.fromEntries(params) });
                              }}>
                                访问过程
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <Pager
                  page={page}
                  total={visitorList.data.total}
                  pageSize={visitorList.data.pageSize}
                  onChange={setPage}
                />
              </>
            )}
          </section>
        )}
      </main>
      {activeDetail&&<Drawer title={activeDetail.kind==='records'?activeDetail.drill.title:activeDetail.kind==='journey'?'访客访问过程':'询盘详情'} close={closeDetails} wide={activeDetail.kind!=='inquiry'}>{detailBreadcrumb}
      {selectedInquiry&&<>
          {detail.loading ? (
            <Loading />
          ) : detail.error ? (
            <Problem message={detail.error} retry={reload} />
          ) : (
            detail.data && (
              <>
                <div className="admin-detail-top">
                  <p className="admin-code">{detail.data.inquiry.id}</p>
                  <h3>{detail.data.inquiry.name}</h3>
                  <p>{value(detail.data.inquiry.company)}</p>
                  <p>提交于 {time(detail.data.inquiry.created_at)}</p>
                  <div className="admin-detail-actions">
                    <label>
                      处理状态
                      <select
                        disabled={busy}
                        value={detail.data.inquiry.status}
                        onChange={(event) =>
                          void action(() =>
                            mutate(
                              "/api/admin/inquiries/" + selectedInquiry,
                              "PATCH",
                              { status: event.target.value },
                            ),
                          )
                        }
                      >
                        {Object.entries(stateLabels).map(([key, label]) => (
                          <option key={key} value={key}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <button
                      disabled={busy}
                      onClick={() =>
                        void action(() =>
                          mutate(
                            "/api/admin/inquiries/" + selectedInquiry,
                            "PATCH",
                            { unread: !detail.data!.inquiry.unread },
                          ),
                        )
                      }
                    >
                      {detail.data.inquiry.unread ? "标为已读" : "标为未读"}
                    </button>
                  </div>
                </div>
                <dl className="admin-detail-fields">
                  {[
                    ["邮箱", detail.data.inquiry.email],
                    ["电话 / WhatsApp", detail.data.inquiry.phone],
                    ["目的地国家", detail.data.inquiry.destination_country],
                    ["感兴趣的产品", detail.data.inquiry.interest],
                    [
                      "零件类型",
                      partLabels[detail.data.inquiry.part_type] ||
                        detail.data.inquiry.part_type,
                    ],
                    [
                      "加工工艺",
                      (() => {
                        try {
                          return JSON.parse(detail.data.inquiry.processes)
                            .map((key: string) => processLabels[key] || key)
                            .join("、");
                        } catch {
                          return "";
                        }
                      })(),
                    ],
                    ["网站语言", detail.data.inquiry.language],
                    ["访问来源", detail.data.inquiry.source],
                    [
                      "渠道",
                      channelLabels[detail.data.inquiry.channel] ||
                        detail.data.inquiry.channel,
                    ],
                    ["访客国家", countryLabel(detail.data.inquiry.country)],
                    [
                      "设备",
                      deviceLabels[detail.data.inquiry.device] || "未知",
                    ],
                  ].map(([label, content]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value(content)}</dd>
                    </div>
                  ))}
                  <div>
                    <dt>提交页面</dt>
                    <dd>
                      <a
                        href={detail.data.inquiry.page}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {detail.data.inquiry.page}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt>进入询价的页面</dt>
                    <dd>
                      {detail.data.inquiry.source_page ? (
                        <a
                          href={detail.data.inquiry.source_page}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {detail.data.inquiry.source_page}
                        </a>
                      ) : (
                        "未知"
                      )}
                    </dd>
                  </div>
                </dl>
                <section className="admin-detail-section">
                  <h3>客户需求</h3>
                  <p className="admin-preserve">
                    {value(detail.data.inquiry.requirements)}
                  </p>
                </section>
                <section className="admin-detail-section">
                  <h3>附件</h3>
                  {detail.data.files.length ? (
                    <ul className="admin-files">
                      {detail.data.files.map((file) => (
                        <li key={file.id}>
                          <a href={"/api/admin/files/" + file.id}>
                            {file.name}
                          </a>
                          <span>{(file.size / 1024).toFixed(1)} KB</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>未提供附件。</p>
                  )}
                </section>
                {detail.data.inquiry.visitor_id && (
                  <button
                    onClick={() => {
                      const inquiry = detail.data!.inquiry;
                      openJourney(inquiry.visitor_id!, inquiry.visit_id
                        ? { all: true, visitId: inquiry.visit_id, eventId: "inquiry:" + inquiry.id }
                        : { all: true });
                    }}
                  >
                    查看此访客的访问过程
                  </button>
                )}
                <section className="admin-detail-section">
                  <h3>跟进备注</h3>
                  {detail.data.notes.length ? (
                    <ol className="admin-notes">
                      {detail.data.notes.map((item) => (
                        <li key={item.id}>
                          <p className="admin-preserve">{item.content}</p>
                          <small>
                            {item.author} · {time(item.created_at)}
                          </small>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p>暂无跟进备注。</p>
                  )}
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      void action(async () => {
                        await mutate(
                          "/api/admin/inquiries/" + selectedInquiry + "/notes",
                          "POST",
                          { content: note },
                        );
                        setNote("");
                      });
                    }}
                  >
                    <label>
                      添加备注
                      <textarea
                        required
                        maxLength={2000}
                        rows={4}
                        value={note}
                        onChange={(event) => setNote(event.target.value)}
                        placeholder="记录已沟通的要求、待办事项和下一次跟进"
                      />
                    </label>
                    <button
                      className="admin-primary"
                      disabled={busy || !note.trim()}
                    >
                      {busy ? "保存中…" : "保存备注"}
                    </button>
                  </form>
                </section>
              </>
            )
          )}
          {actionError && (
            <p className="admin-error" role="alert">
              {actionError}
            </p>
          )}
      </>}

      {activeDetail.kind==='records'&&<RecordPanel drill={activeDetail.drill} api={api} unauthorized={invalidate} version={version} update={value=>updateDetail({kind:'records',drill:value})} openJourney={openJourney} productName={productName}/>}
      {activeDetail.kind==='journey'&&<JourneyPanel id={activeDetail.id} context={activeDetail.context} query={query(analyticsFilters,'visitors')} api={api} unauthorized={invalidate} version={version} update={context=>updateDetail({...activeDetail,context})} openInquiry={openInquiry} productName={productName}/>}
      </Drawer>}
    </div>
  );
}
