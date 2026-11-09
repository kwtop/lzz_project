import { useEffect, useRef, useState } from "react";
import type { SyntheticEvent, ReactNode } from "react";

type Tab = "overview" | "inquiries" | "visitors";
type Session = { username: string; csrf: string; authMode?: string };
type Filters = {
  start: string;
  end: string;
  source: string;
  country: string;
  product: string;
  language: string;
  internal: boolean;
  q: string;
  status: string;
  unread: boolean;
  allTime: boolean;
  destination: string;
};
type Options = {
  products: { id: string; name: string }[];
  source: { value: string }[];
  country: { value: string }[];
  language: { value: string }[];
  destinations: { value: string }[];
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
  internal: number;
};
type Detail = {
  inquiry: Inquiry;
  files: { id: string; name: string; size: number; sha256: string }[];
  notes: { id: string; author: string; content: string; created_at: number }[];
};
type Visitor = {
  id: string;
  first_seen: number;
  last_seen: number;
  visits: number;
  views: number;
  is_returning: number;
  country: string;
  source: string;
  device: string;
  inquiries: number;
};
type Journey = {
  visitor: {
    id: string;
    first_seen: number;
    last_seen: number;
    internal: number;
  };
  events: {
    id: string;
    type: string;
    created_at: number;
    page: string;
    product: string;
    language: string;
    position: string;
    resource: string;
    error_code: string;
  }[];
  next: { before: number; beforeId: string } | null;
  inquiries: Inquiry[];
};
type Page<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  unread?: number;
};
type Breakdown = { name: string; views: number; visitors?: number };
type Trend = {
  bucket: number;
  date: string;
  visitors?: number;
  pageViews: number;
  inquiries: number;
};
type Stats = {
  mode?: "aggregate" | "detailed";
  range: {
    start: number;
    end: number;
    previousStart: number;
    previousEnd: number;
    timezone: string;
  };
  current: Record<string, number>;
  previous: Record<string, number>;
  trend: Trend[];
  previousTrend: Trend[];
  breakdowns: Record<string, Breakdown[]>;
  pages: Breakdown[];
  products: Breakdown[];
  scope: string;
};
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
  campaign: "可识别活动",
  unknown: "未知",
};
const eventLabels: Record<string, string> = {
  page_view: "访问页面",
  product_view: "查看产品",
  parameters_expand: "展开参数",
  image_view: "查看图片",
  download_click: "点击资料下载",
  quote_click: "点击询价",
  whatsapp_click: "点击 WhatsApp",
  email_click: "点击邮箱",
  form_start: "开始填写表单",
  form_error: "提交失败",
  inquiry_success: "询盘已入库",
};
const positionLabels: Record<string, string> = {
  header: "导航栏",
  hero: "页头",
  main: "正文",
  footer: "页脚",
  gallery: "图片区域",
  "quote-form": "询价表单",
  parameters: "参数区域",
  "image-viewer": "图片查看器",
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
const date = (timestamp: number) =>
  new Date(timestamp + 8 * 3600000).toISOString().slice(0, 10);
const initialFilters = (): Filters => ({
  start: date(Date.now() - 6 * 86400000),
  end: date(Date.now()),
  source: "",
  country: "",
  product: "",
  language: "",
  internal: false,
  q: "",
  status: "",
  unread: false,
  allTime: true,
  destination: "",
});
function query(filters: Filters, tab: Tab, page = 1) {
  const params = new URLSearchParams();
  if (!(tab === "inquiries" && filters.allTime)) {
    params.set("start", filters.start);
    params.set("end", filters.end);
  }
  for (const key of ["source", "country", "product", "language"] as const)
    if (filters[key]) params.set(key, filters[key]);
  if (filters.internal) params.set("internal", "1");
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
function delta(current: number, previous: number) {
  if (current === previous) return "较上期持平";
  if (previous === 0) return "上期为 0，本期新增";
  return `较上期 ${current > previous ? "+" : ""}${(((current - previous) / previous) * 100).toFixed(1)}%`;
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
  children,
}: {
  title: string;
  close: () => void;
  children: ReactNode;
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
  return (
    <div className="admin-overlay">
      <button
        className="admin-backdrop"
        aria-label="关闭详情"
        onClick={close}
      />
      <section
        ref={panel}
        tabIndex={-1}
        className="admin-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-drawer-title"
      >
        <header>
          <h2 id="admin-drawer-title">{title}</h2>
          <button onClick={close} aria-label="关闭详情">
            关闭 ×
          </button>
        </header>
        {children}
      </section>
    </div>
  );
}
function TrendChart({ stats }: { stats: Stats }) {
  const aggregate = stats.mode === "aggregate";
  const [metric, setMetric] = useState<"pageViews" | "visitors" | "inquiries">(
    "pageViews",
  );
  const max = Math.max(
    1,
    ...stats.trend.map((row) => row[metric] || 0),
    ...stats.previousTrend.map((row) => row[metric] || 0),
  );
  const points = (rows: Trend[]) =>
    rows
      .map(
        (row, index) =>
          `${55 + (index / Math.max(1, rows.length - 1)) * 890},${224 - ((row[metric] || 0) / max) * 180}`,
      )
      .join(" ");
  const labels: Record<string, string> = aggregate ? {
    pageViews: "页面浏览量",
    inquiries: "成功询盘",
  } : {
    pageViews: "页面浏览量",
    visitors: "访客数",
    inquiries: "成功询盘",
  };
  return (
    <section className="admin-section">
      <div className="admin-section-head">
        <div>
          <h2>访问与询盘趋势</h2>
          <p>
            {aggregate ? "按北京时间按日展示；当天数据更新至当前时刻。" : <>
            <span className="admin-legend-current" />
            本期 <span className="admin-legend-previous" />
            上一个同等时长周期
            </>}
          </p>
        </div>
        <label className="admin-inline-label">
          指标
          <select
            value={metric}
            onChange={(event) => setMetric(event.target.value as typeof metric)}
          >
            {Object.entries(labels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>
      {!stats.trend.some((row) => row[metric]) &&
      !stats.previousTrend.some((row) => row[metric]) ? (
        <Empty>所选日期暂无{labels[metric]}记录。</Empty>
      ) : (
        <div className="admin-chart-scroll">
          <svg
            className="admin-chart"
            viewBox="0 0 1000 275"
            role="img"
            aria-label={aggregate ? `${labels[metric]}趋势` : `${labels[metric]}趋势，本期与上期比较`}
          >
            <title>{labels[metric]}趋势</title>
            {[0, 0.5, 1].map((scale) => (
              <g key={scale}>
                <line
                  x1="55"
                  x2="945"
                  y1={224 - scale * 180}
                  y2={224 - scale * 180}
                />
                <text x="42" y={229 - scale * 180} textAnchor="end">
                  {Math.round(max * scale)}
                </text>
              </g>
            ))}
            {!aggregate && <polyline
              className="admin-line-previous"
              points={points(stats.previousTrend)}
            />}
            <polyline
              className="admin-line-current"
              points={points(stats.trend)}
            />
            {stats.trend.map((row, index) => (
              <g key={row.bucket}>
                <circle
                  cx={55 + (index / Math.max(1, stats.trend.length - 1)) * 890}
                  cy={224 - ((row[metric] || 0) / max) * 180}
                  r="3"
                >
                  <title>
                    {row.date}：{row[metric]}
                  </title>
                </circle>
                {(index === 0 ||
                  index === stats.trend.length - 1 ||
                  index % Math.max(1, Math.ceil(stats.trend.length / 6)) ===
                    0) && (
                  <text
                    x={55 + (index / Math.max(1, stats.trend.length - 1)) * 890}
                    y="255"
                    textAnchor="middle"
                  >
                    {row.date.slice(5)}
                  </text>
                )}
              </g>
            ))}
          </svg>
        </div>
      )}
      <details className="admin-chart-data">
        <summary>查看趋势数据</summary>
        <div className="admin-table-scroll">
          <table>
            <thead>
              <tr>
                <th>本期日期</th>
                <th>本期{labels[metric]}</th>
                {!aggregate && <><th>对应上期时段</th>
                <th>上期{labels[metric]}</th></>}
              </tr>
            </thead>
            <tbody>
              {stats.trend.map((row, index) => (
                <tr key={row.bucket}>
                  <td>{row.date}</td>
                  <td>{row[metric]}</td>
                  {!aggregate && <><td>{stats.previousTrend[index]?.date || "未知"}</td>
                  <td>{stats.previousTrend[index]?.[metric] ?? 0}</td></>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </section>
  );
}
function Ranking({
  title,
  rows,
  label = (name: string) => value(name),
}: {
  title: string;
  rows: Breakdown[];
  label?: (name: string) => string;
}) {
  const showVisitors = rows.some(row => row.visitors !== undefined);
  return (
    <section className="admin-ranking">
      <h2>{title}</h2>
      {!rows.length ? (
        <Empty />
      ) : (
        <div className="admin-table-scroll">
          <table>
            <thead>
              <tr>
                <th>项目</th>
                <th>浏览量</th>
                {showVisitors && <th>访客</th>}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.name}>
                  <td title={row.name}>{label(row.name)}</td>
                  <td>{row.views}</td>
                  {showVisitors && <td>{row.visitors}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
function Overview({
  stats,
  productName,
}: {
  stats: Stats;
  productName: (id: string) => string;
}) {
  const aggregate = stats.mode === "aggregate";
  const metrics = aggregate ? [
    ["pageViews", "页面浏览量"],
    ["contactClicks", "联系按钮点击"],
    ["formStarters", "开始填写次数"],
    ["inquiries", "成功询盘"],
  ] : [
    ["visitors", "访客数"],
    ["visits", "访问次数"],
    ["pageViews", "页面浏览量"],
    ["returningVisitors", "回访访客"],
    ["contactClicks", "联系按钮点击"],
    ["formStarters", "开始填写人数"],
    ["inquiries", "成功询盘"],
    ["formErrors", "提交失败事件"],
  ];
  return (
    <>
      <p className="admin-scope">{stats.scope}</p>
      <div className="admin-metrics">
        {metrics.map(([key, label]) => (
          <article key={key}>
            <h2>{label}</h2>
            <strong>{(stats.current[key] || 0).toLocaleString("zh-CN")}</strong>
            {!aggregate && <p>{delta(stats.current[key] || 0, stats.previous[key] || 0)}</p>}
          </article>
        ))}
      </div>
      <p className="admin-period">
        本期：{time(stats.range.start)} — {time(stats.range.end)}
        {!aggregate && <><br />
        对比：{time(stats.range.previousStart)} —{" "}
        {time(stats.range.previousEnd)}</>}。日期按北京时间统计。
      </p>
      <TrendChart stats={stats} />
      <div className="admin-contact-summary">
        <span>询价按钮：{stats.current.quoteClicks}</span>
        <span>WhatsApp：{stats.current.whatsappClicks}</span>
        <span>邮箱：{stats.current.emailClicks}</span>
        {aggregate ? <span>表单错误触发：{stats.current.formErrors}</span> : <span>
          回访比例：
          {stats.current.visitors
            ? (
                (stats.current.returningVisitors / stats.current.visitors) *
                100
              ).toFixed(1) + "%"
            : "—"}
        </span>}
      </div>
      <div className="admin-rankings">
        <Ranking title="热门页面" rows={stats.pages} />
        <Ranking
          title="受关注的产品"
          rows={stats.products}
          label={productName}
        />
        <Ranking
          title="访客国家"
          rows={stats.breakdowns.country}
          label={countryLabel}
        />
        <Ranking title="访问来源" rows={stats.breakdowns.source} />
        <Ranking
          title="渠道"
          rows={stats.breakdowns.channel}
          label={(name) => channelLabels[name] || value(name)}
        />
        <Ranking
          title="设备"
          rows={stats.breakdowns.device}
          label={(name) => deviceLabels[name] || "未知"}
        />
        <Ranking title="网站语言" rows={stats.breakdowns.language} />
      </div>
    </>
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
  const [tab, setTab] = useState<Tab>("overview"),
    [draft, setDraft] = useState(initialFilters),
    [filters, setFilters] = useState(initialFilters),
    [page, setPage] = useState(1),
    [version, setVersion] = useState(0);
  const [selectedInquiry, setSelectedInquiry] = useState(""),
    [selectedVisitor, setSelectedVisitor] = useState(""),
    [note, setNote] = useState(""),
    [actionError, setActionError] = useState(""),
    [busy, setBusy] = useState(false),
    [notice, setNotice] = useState("");
  const [olderEvents, setOlderEvents] = useState<Journey["events"]>([]),
    [nextJourney, setNextJourney] = useState<Journey["next"] | undefined>();
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
  const visitorList = useData<Page<Visitor>>(
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
  const visitor = useData<Journey>(
    "/api/admin/visitors/" + selectedVisitor,
    !!session && !!selectedVisitor,
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
  useEffect(() => {
    setOlderEvents([]);
    setNextJourney(undefined);
  }, [selectedVisitor]);
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
    setFilters({ ...draft });
    setPage(1);
  }
  function changeTab(next: Tab) {
    setTab(next);
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
  async function older() {
    if (!visitor.data) return;
    const cursor = nextJourney === undefined ? visitor.data.next : nextJourney;
    if (!cursor) return;
    setBusy(true);
    setActionError("");
    try {
      const more = await api<Journey>(
        "/api/admin/visitors/" +
          selectedVisitor +
          "?" +
          new URLSearchParams({
            before: String(cursor.before),
            beforeId: cursor.beforeId,
          }),
      );
      setOlderEvents((rows) => [...rows, ...more.events]);
      setNextJourney(more.next);
    } catch (error) {
      setActionError((error as Error).message);
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
          <p>查看询盘、跟进客户和了解网站访问。</p>
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
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <a href="/admin/" className="admin-wordmark">
          LZZ <span>网站后台</span>
        </a>
        <nav aria-label="后台功能">
          {(
            [
              ["overview", "访问洞察", "01"],
              ["inquiries", "询盘管理", "02"],
              ["visitors", analyticsMode === "aggregate" ? "历史访客记录" : "访客与行为", "03"],
            ] as const
          ).map(([key, label, num]) => (
            <button
              key={key}
              className={tab === key ? "active" : ""}
              aria-current={tab === key ? "page" : undefined}
              onClick={() => changeTab(key)}
            >
              <span>{num}</span>
              {label}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-bottom">
          <p>{session.username}</p>
          <a href="/" target="_blank" rel="noopener noreferrer">
            打开网站 ↗
          </a>
          <button
            onClick={() =>
              void action(async () => {
                await mutate("/api/admin/logout", "POST", {});
                setSession(null);
                setSelectedInquiry("");
                setSelectedVisitor("");
                if (session.authMode === "access")
                  location.assign("/cdn-cgi/access/logout");
              })
            }
          >
            退出登录
          </button>
        </div>
      </aside>
      <main className="admin-main">
        <header className="admin-header">
          <div>
            <p>LZZ PRECISION / 工作台</p>
            <h1>
              {
                {
                  overview: "网站访问洞察",
                  inquiries: "询盘管理",
                  visitors: analyticsMode === "aggregate" ? "历史访客记录" : "访客与行为记录",
                }[tab]
              }
            </h1>
          </div>
          <div>
            <button disabled={busy} onClick={reload}>
              刷新数据
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
          </div>
        </header>
        <form className="admin-filters" onSubmit={apply}>
          <label>
            开始日期
            <input
              type="date"
              value={draft.start}
              max={draft.end}
              disabled={tab === "inquiries" && draft.allTime}
              onChange={(event) =>
                setDraft({ ...draft, start: event.target.value })
              }
            />
          </label>
          <label>
            结束日期
            <input
              type="date"
              value={draft.end}
              min={draft.start}
              max={date(Date.now())}
              disabled={tab === "inquiries" && draft.allTime}
              onChange={(event) =>
                setDraft({ ...draft, end: event.target.value })
              }
            />
          </label>
          {select("source")}
          {select("country")}
          <label>
            产品
            <select
              value={draft.product}
              onChange={(event) =>
                setDraft({ ...draft, product: event.target.value })
              }
            >
              <option value="">全部产品</option>
              {optionData.data?.products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </label>
          {select("language")}
          {tab === "inquiries" && (
            <>
              <label>
                目的地国家
                <select
                  value={draft.destination}
                  onChange={(event) =>
                    setDraft({ ...draft, destination: event.target.value })
                  }
                >
                  <option value="">全部目的地</option>
                  {optionData.data?.destinations?.map((item) => (
                    <option key={item.value} value={item.value}>
                      {value(item.value)}
                    </option>
                  ))}
                </select>
              </label>
              <label className="admin-search">
                搜索询盘
                <input
                  type="search"
                  value={draft.q}
                  maxLength={100}
                  placeholder="姓名、公司、联系方式或需求"
                  onChange={(event) =>
                    setDraft({ ...draft, q: event.target.value })
                  }
                />
              </label>
              <label>
                处理状态
                <select
                  value={draft.status}
                  onChange={(event) =>
                    setDraft({ ...draft, status: event.target.value })
                  }
                >
                  <option value="">全部状态</option>
                  {Object.entries(stateLabels).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="admin-check">
                <input
                  type="checkbox"
                  checked={draft.unread}
                  onChange={(event) =>
                    setDraft({ ...draft, unread: event.target.checked })
                  }
                />
                仅未读
              </label>
              <label className="admin-check">
                <input
                  type="checkbox"
                  checked={draft.allTime}
                  onChange={(event) =>
                    setDraft({ ...draft, allTime: event.target.checked })
                  }
                />
                全部询盘日期
              </label>
            </>
          )}
          <label className="admin-check">
            <input
              type="checkbox"
              checked={draft.internal}
              onChange={(event) =>
                setDraft({ ...draft, internal: event.target.checked })
              }
            />
            包含内部测试
          </label>
          <div className="admin-filter-actions">
            <button className="admin-primary">应用筛选</button>
            <button
              type="button"
              onClick={() => {
                const fresh = initialFilters();
                setDraft(fresh);
                setFilters(fresh);
                setPage(1);
              }}
            >
              重置
            </button>
          </div>
        </form>
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
            <Overview stats={stats.data} productName={productName} />
          ) : null)}
        {tab === "inquiries" && (
          <section className="admin-section">
            <div className="admin-section-head">
              <h2>收到的询盘</h2>
              <span>
                {list.data?.total ?? "—"} 条 · 未读 {list.data?.unread ?? "—"}
              </span>
            </div>
            {list.loading ? (
              <Loading />
            ) : list.error ? (
              <Problem message={list.error} retry={reload} />
            ) : !list.data?.items.length ? (
              <Empty>
                暂无符合条件的询盘。只有服务端保存成功的表单会出现在这里。
              </Empty>
            ) : (
              <>
                <div className="admin-table-scroll">
                  <table className="admin-inquiry-table">
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
                          <td>
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
                            {item.internal === 1 && <small>内部测试</small>}
                          </td>
                          <td>
                            <span>{value(item.email)}</span>
                            <span>{value(item.phone)}</span>
                          </td>
                          <td>
                            <span>{item.destination_country}</span>
                            <small>{value(item.interest)}</small>
                          </td>
                          <td>
                            <span
                              className={
                                "admin-state admin-state-" + item.status
                              }
                            >
                              {stateLabels[item.status]}
                            </span>
                          </td>
                          <td>{time(item.created_at)}</td>
                          <td>
                            <span>{value(item.source)}</span>
                            <small>{value(item.language)}</small>
                          </td>
                          <td>
                            <button onClick={() => setSelectedInquiry(item.id)}>
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
              <h2>{analyticsMode === "aggregate" ? "历史访客" : "浏览器访客"}</h2>
              <span>{analyticsMode === "aggregate" ? "汇总模式不建立新的个人浏览记录；此处展示旧版已有记录。" : "按最近访问排序；点击查看访问过程"}</span>
            </div>
            {visitorList.loading ? (
              <Loading />
            ) : visitorList.error ? (
              <Problem message={visitorList.error} retry={reload} />
            ) : !visitorList.data?.items.length ? (
              <Empty>
                {analyticsMode === "aggregate" ? "暂无历史记录。新的页面与点击次数请在概览中查看。" : "暂无访问记录。默认记录公开页面的浏览与点击；关闭统计、DNT/GPC、内部测试及已识别机器人不会计入。"}
              </Empty>
            ) : (
              <>
                <div className="admin-table-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>浏览器编号</th>
                        <th>最近访问</th>
                        <th>访问 / 浏览</th>
                        <th>来源 / 国家</th>
                        <th>设备</th>
                        <th>关联询盘</th>
                        <th>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visitorList.data.items.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <code title={item.id}>{item.id.slice(0, 12)}…</code>
                            {item.is_returning === 1 && <small>回访</small>}
                          </td>
                          <td>{time(item.last_seen)}</td>
                          <td>
                            {item.visits} / {item.views}
                          </td>
                          <td>
                            <span>{value(item.source)}</span>
                            <small>{countryLabel(item.country)}</small>
                          </td>
                          <td>{deviceLabels[item.device] || "未知"}</td>
                          <td>{item.inquiries}</td>
                          <td>
                            <button onClick={() => setSelectedVisitor(item.id)}>
                              访问过程
                            </button>
                          </td>
                        </tr>
                      ))}
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
        <footer className="admin-footnote">
          <p>
            WhatsApp、邮箱和询价按钮点击属于联系行为，不代表收到询盘。无法识别的信息显示“未知”。本后台不记录键盘输入或表单填写内容。
          </p>
          <button
            disabled={busy}
            onClick={() =>
              void action(async () => {
                await mutate("/api/admin/internal", "POST", { excluded: true });
                setNotice("当前浏览器已排除统计。新访问将标记为内部测试。");
              })
            }
          >
            将当前浏览器排除统计
          </button>
          <button
            disabled={busy}
            onClick={() =>
              void action(async () => {
                await mutate("/api/admin/internal", "POST", {
                  excluded: false,
                });
                setNotice(
                  "已关闭当前浏览器的内部访问标记。历史内部记录仍保持排除。",
                );
              })
            }
          >
            取消浏览器排除
          </button>
        </footer>
      </main>
      {selectedInquiry && (
        <Drawer title="询盘详情" close={() => setSelectedInquiry("")}>
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
                      setSelectedVisitor(detail.data!.inquiry.visitor_id!);
                      setSelectedInquiry("");
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
        </Drawer>
      )}
      {selectedVisitor && (
        <Drawer title="访客访问过程" close={() => setSelectedVisitor("")}>
          {visitor.loading ? (
            <Loading />
          ) : visitor.error ? (
            <Problem message={visitor.error} retry={reload} />
          ) : (
            visitor.data && (
              <>
                <div className="admin-detail-top">
                  <p className="admin-code">{visitor.data.visitor.id}</p>
                  <p>
                    首次记录：{time(visitor.data.visitor.first_seen)}
                    <br />
                    最近记录：{time(visitor.data.visitor.last_seen)}
                  </p>
                  {visitor.data.visitor.internal === 1 && (
                    <p>此访客已标记为内部测试，默认不计入统计。</p>
                  )}
                </div>
                <section className="admin-detail-section">
                  <h3>关联询盘</h3>
                  {visitor.data.inquiries.length ? (
                    <ul className="admin-linked-inquiries">
                      {visitor.data.inquiries.map((item) => (
                        <li key={item.id}>
                          <button
                            onClick={() => {
                              setSelectedInquiry(item.id);
                              setSelectedVisitor("");
                            }}
                          >
                            {item.name} · {value(item.interest)}
                          </button>
                          <span>
                            {stateLabels[item.status]} · {time(item.created_at)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>没有可关联的询盘。联系按钮点击不会自动生成询盘。</p>
                  )}
                </section>
                <section className="admin-detail-section">
                  <h3>行为记录</h3>
                  <p>
                    最近的行为在上方。这里只记录页面和操作，不记录表单输入。
                  </p>
                  {![...visitor.data.events, ...olderEvents].length ? (
                    <Empty />
                  ) : (
                    <ol className="admin-timeline">
                      {[...visitor.data.events, ...olderEvents].map((event) => (
                        <li key={event.id}>
                          <div>
                            <strong>
                              {eventLabels[event.type] || event.type}
                            </strong>
                            <time>{time(event.created_at)}</time>
                          </div>
                          <a
                            href={event.page}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {event.page}
                          </a>
                          {event.product && <p>{productName(event.product)}</p>}
                          <small>
                            语言：{value(event.language)} · 位置：
                            {positionLabels[event.position] ||
                              value(event.position)}
                          </small>
                          {event.resource && (
                            <p className="admin-code">{event.resource}</p>
                          )}
                          {event.error_code && (
                            <p>失败类别：{event.error_code}</p>
                          )}
                        </li>
                      ))}
                    </ol>
                  )}
                  {(nextJourney === undefined
                    ? visitor.data.next
                    : nextJourney) && (
                    <button disabled={busy} onClick={() => void older()}>
                      {busy ? "加载中…" : "加载更早记录"}
                    </button>
                  )}
                </section>
              </>
            )
          )}
          {actionError && (
            <p className="admin-error" role="alert">
              {actionError}
            </p>
          )}
        </Drawer>
      )}
    </div>
  );
}
