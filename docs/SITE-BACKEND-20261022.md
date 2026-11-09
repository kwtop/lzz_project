# LZZ 网站后台 V1 · 本地交付

2026-11-09 生产状态更新：真实 D1 / 私有 R2、Access 邮箱白名单和正式验证组件已接通；生产配置接口已为 HTTP 200。实际登录与通过人机验证的成功询盘验收仍待人工完成。当前状态以 [BACKEND-PRODUCTION-20261109.md](./BACKEND-PRODUCTION-20261109.md) 为准，下文未发布的描述属于 10 月 22 日历史记录。

日期：2026-10-22。当前 Cloudflare Pages 项目：`lzz-precision`，既有预览分支：`preview`。

2026-10-30 最新更新：用户随后明确要求保留个人浏览轨迹，当前已改为默认建立同一浏览器的访问记录、回访和询盘关联，前台不显示首次弹窗，隐私页提供说明与关闭入口。当前启动方式、口径及验证以 [ANALYTICS-JOURNEY-20261030.md](./ANALYTICS-JOURNEY-20261030.md) 为准。早先纯汇总方案保留为可选 `aggregate` 模式；本文 10 月 22 日“需先同意”的启动描述属于历史，询盘、权限、私有附件和访客指标的其余约定继续有效。

本轮实现 Pages Functions、D1、私有 R2 附件、管理员认证和第一方匿名分析。没有创建远端资源、运行远端迁移或发布网站。原来的线上版本尚未接入此后台。Google Search Console 和 AI 功能不在本轮范围内。

## 本地使用

项目目录：`D:\lzz\lzz\_react`。

```powershell
npm install
npm run setup:backend
npm run db:local
npm run build
npm run dev:backend
```

- 网站：<http://127.0.0.1:8788/>
- 中文后台：<http://127.0.0.1:8788/admin/>
- 用户名和随机本地口令：项目根目录 `.local-admin-login.txt`。不要上传此文件。
- `.dev.vars` 只保存本地签名密钥和 PBKDF2 口令散列。已有文件不会被初始化脚本覆盖。
- `.wrangler/state` 保存真实的本地 D1 / R2 数据；退出再启动仍保留。删除此目录会丢失本地数据。
- `4323` 是之前的静态预览服务。测试接收询盘和后台时使用 `8788`，它同时运行页面和 Functions。
- 本地验收询盘已标为内部记录，后台需勾选“包含内部测试”查看。管理员浏览器的访问也会被排除；模拟客户可使用独立浏览器窗口。

正式站的颜色和栏目保持原样。后台采用中文表格、筛选、趋势图和右侧详情面板，窄屏下切换为顶部导航，宽表格在区域内横向滚动。

## 已实现的功能

### 询盘

姓名、目的地国家和一种联系方式必填，默认 WhatsApp / Phone；公司、产品、零件类型、工艺、留言和附件可选。目的地仍由客户自由填写。仅保存客户选中的联系方式。产品/工艺入口继续自动带入来源和已有选择。

`POST /api/inquiries` 使用 multipart 接收，服务端独立验证字段和附件。附件最多 5 个、合计 20 MB，格式来自共享的 `attachmentPolicy`。PDF、PNG、JPG 还检查文件头；附件仅能通过已认证的后台下载。

私有 R2 存入文件后，D1 批事务保存询盘和文件记录。收到数据库提交结果才返回 `sent` 和询盘编号。数据库事务失败时回滚，删除可确认未关联到询盘的文件；数据库状态不确定时保留私有文件，避免误删已提交的附件。存储故障不会显示成功。

同一个请求键永久对应同一份已保存内容；相同内容在 15 分钟内还会去重。并发重复提交只生成一条询盘。响应丢失后，保持原表单重试会返回原编号。修改内容会生成新的请求键。表单不跨刷新恢复，也不把填写内容写入浏览器存储。

后台支持搜索、日期/来源/访客国家/目的地/产品/语言筛选、未读筛选、四种状态、跟进备注、附件下载和 CSV。导出包含来源及跟进备注，转义可能被表格软件当成公式的内容；单次最多 10000 条，超出会提示缩小范围。

### 访问与行为

匿名分析需要客户同意；拒绝、Do Not Track 或 Global Privacy Control 不影响正常询盘。选择偏好仅保存在本地，匿名标识由服务端签名的 HttpOnly Cookie 保存。

| 事件 | 触发条件 | 计数边界 |
| --- | --- | --- |
| `page_view` | 同意分析后访问页面 | 每次页面加载一次；重复事件 ID 不重复计数 |
| `product_view` | 打开产品详情 | 对应现有产品编号 |
| `parameters_expand` | 展开技术要求/设备/检验参数 | FAQ、导航及一般图片折叠不计入 |
| `image_view` | 共享图片查看器实际打开 | 记录页面和资源路径 |
| `download_click` | 点击本站下载入口 | 表示点击，不宣称文件下载完成 |
| `quote_click` / `whatsapp_click` / `email_click` | 点击相应联系入口 | 是联系行为，不是询盘 |
| `form_start` | 首次进入该表单填写区域 | 每个页面表单一次；人数按匿名访客去重 |
| `form_error` | 前端校验/请求失败 | 只记录允许的失败类别 |
| `inquiry_success` | 服务端保存后 | 客户端禁止上报此事件；趋势中的询盘数直接查询询盘表 |

每条事件包含服务端时间、页面、产品、语言、按钮位置、随机访客/访问编号和可识别的来源/设备/国家。只取公开页面或询价入口的产品上下文，不读取未提交的表单内容。无键盘监听、录屏、聊天、评分或 AI 分析。

事件时间使用服务端接收时间；离线补报会计入恢复连接后的接收时段。来源优先取格式有效的 UTM source/medium，其次为外部 referrer 主机名；不保存 referrer 查询参数。缺少证据时显示“未知”，不把缺少 referrer 自动解释为直接访问。国家使用 Cloudflare 提供的国家代码，本地通常是“未知”；设备是粗略分类。原始 IP 和完整 User-Agent 不进入分析数据库；用于限流的网络标识经过带密钥散列。

事件队列有数量和时间限制，重试保持事件 ID，网络失败不抛到浏览或询盘流程。询盘与分析分别保存；即使分析表写入或访问关联失败，询盘仍可成功保存。仅当前仍同意匿名分析、没有 DNT/GPC 信号且能够关联时，后台展示匿名访问过程及对应询盘；无分析同意、换设备或 Cookie 不可用时不强行关联。

## 统计口径

| 指标 | 定义 |
| --- | --- |
| 访客数 | 期间内有效事件中的不同匿名访客编号；不是精确的人数 |
| 访问次数 | 不同 visit ID；30 分钟无记录活动后开始新访问 |
| 页面浏览量 | `page_view` 行数 |
| 回访访客 | 期间事件对应访问开始前已有历史访问的不同访客编号 |
| 联系按钮点击 | 询价、WhatsApp、邮箱点击数之和，单独列出三类 |
| 开始填写人数 | 有 `form_start` 的不同匿名访客数 |
| 成功询盘 | 数据库实际保存的询盘行数，包含未同意分析的询盘；垃圾状态可在管理页筛选 |
| 提交失败事件 | 前端记录的失败类别次数；响应丢失可能同时有已保存询盘 |

默认日期为北京时间最近 7 个日历日截至当前时刻；与紧邻的前一个**相同时长**区间比较。历史完整日期按北京时间零点分界。趋势每 24 小时分桶；本日或末桶可能未结束，不以零补成未来数据。

来源、国家、产品和语言作用于事件或询盘各自保存的上下文。页面/国家/渠道等排行展示前 30 项，不代表其余项没有数据。匿名分析只覆盖同意收集且请求实际到达的访问，不能当作全站所有访问的精确总量。

默认排除内部记录。登录管理员会把当前已识别浏览器及其既有记录标为内部；后台也可切换当前浏览器的排除标记，取消不改写历史内部记录。还可配置 `INTERNAL_IPS`。已识别机器人不创建分析事件，也不能提交询盘；无法识别的机器人仍可能存在，不能承诺完全排除。

## Cloudflare 配置清单

只读下载的现有 Pages 配置没有 D1 / R2 绑定；未取得现有 Access 应用配置。发布前需要在当前账号配置以下资源，**本轮没有执行这些远端操作**。

| 配置 | 用途与要求 |
| --- | --- |
| Pages 项目 `lzz-precision` | 继续复用；上传 `dist` 并构建根目录 `functions`，不是只传静态文件 |
| D1 绑定 `DB` | 应用 `migrations/0001_site_backend.sql`；建议预览和生产使用不同数据库 |
| R2 绑定 `FILES` | 私有附件桶，关闭公网访问；建议预览与生产分别建桶 |
| `TOKEN_SECRET`，Secret | 至少 32 个随机字符，用于匿名/内部 Cookie 和 CSRF 签名；各环境独立 |
| `ADMIN_AUTH_MODE=access`，变量 | 推荐使用 Cloudflare Access；本地用 `password` |
| `ACCESS_TEAM_DOMAIN`，变量 | 例如 `your-team.cloudflareaccess.com` |
| `ACCESS_AUD`，变量 | 该 Access 应用的 audience；服务端验证 JWT 签名、issuer、audience、过期时间及身份 |
| `ADMIN_EMAILS`，变量 | 允许进入后台的邮箱列表，英文逗号分隔；同时设置 Access Allow 规则 |
| `TURNSTILE_SITE_KEY`，变量 | 真实站点公钥；允许对应发布域名；action 为 `inquiry` |
| `TURNSTILE_SECRET_KEY`，Secret | 对应服务端密钥；线上拒绝缺失配置和 Turnstile 测试密钥 |
| `INTERNAL_IPS`，可选变量 | 要排除的内部公网 IP，逗号分隔；原始 IP 不写入事件表 |

Access 需要同时保护 `/admin/*` 和 `/api/admin/*`，使用同一受信任应用的 AUD。API 会自行验证令牌，不信任单独的邮箱请求头。`/api/inquiries`、`/api/events` 和分析同意接口保持公开。Access 退出会调用其登出入口。

如明确选择服务器口令模式，需要额外设置 `ADMIN_USERNAME` 和 Secret `ADMIN_PASSWORD_HASH`，格式为 PBKDF2-SHA256、100000 次、随机盐、256 位散列；不可把明文口令放到环境变量。生产使用独立账户与口令，不使用本地随机口令。口令会话 8 小时失效，退出立即撤销；修改操作还检查 Origin 和 CSRF。

线上**不能设置 `LOCAL_DEVELOPMENT=true`**。本地人机验证旁路只在此标记与 loopback 主机同时满足时有效；误把该标记带到线上会返回未配置，不能绕过验证。

配置模板：`wrangler.production.example.jsonc`；运行时 Secret 名称模板：`.dev.vars.example`。示例里的占位值必须替换，预览/生产变量、绑定与密钥分别设置。没有把任何密钥写进客户端构建。

## 用户确认发布后的操作顺序

1. 确认先接入既有 `preview` 预览分支，还是正式域名；预览继续保持 noindex。准备独立 D1 / 私有 R2、Access 应用和 Turnstile。
2. 将生产配置模板复制成实际配置并填好 ID/变量；通过 Pages 环境设置或 Secret 命令写入密钥。
3. 仅对所选环境运行 D1 远端迁移，再上传页面和 Functions。根目录 `wrangler.jsonc` 当前是本地配置，发布前应备份并替换为已填好的远端配置。Pages 要求使用这个标准文件名，不能通过自定义 `--config` 路径启动；不得直接用本地配置发布。
4. 在该域名做一次真实 Turnstile 提交，验证数据库、附件下载、后台认证、Cookie、归因、去重和统计。将测试记录标为内部。
5. 确认后再向客户开放。Cloudflare Access 网关、真实 Turnstile 和远端存储仍需在此阶段验证，本地通过不等于远端已验证。

## 验证与文件

```powershell
npm run check
npm run check:backend
npm run test:backend
npm run build
npm run test:site
npm run test:seo
npm run test:inquiry
npm run test:teaching
npm run test:css
```

本轮结果：后端与组件测试 **20 项通过**；Astro / Worker 类型检查均为 0 errors、0 warnings（9 条既有提示）；构建通过，正式 sitemap 仍为 86 个 URL；全站 8547 个本地引用、678 个章节目标检查通过。教学例子 3 项、CSS 优化器 8 项测试通过，npm audit 为 0 已知漏洞。

实际本地 HTTP 测试通过：询盘与附件保存、重复键返回原编号、登录后查询/备注/状态/导出、匿名访问过程、默认排除内部测试、未登录阻止数据/导出/附件，以及管理员页面 noindex/no-store。服务重启后原询盘、备注和附件散列保持一致。492 个构建文本文件中未发现本地密钥、口令或口令散列，分析同意状态使用同一个共享前端模块。

`npm run test:backend-http` 可对正在运行的 `8788` 服务重做真实 HTTP 烟测；仅接受 loopback 地址，会新增一条清楚标记并排除统计的本地 QA 记录，不会向线上发送测试资料。

后端测试在实际 workerd / 本地 D1 / R2 中运行，覆盖持久化重启、附件边界、并发去重、事务回滚、分析故障隔离、权限、CSRF、Access JWT、内部排除、历史周期和统计核对。组件测试使用 JSDOM 驱动真实表单/中文后台/埋点，并连接本地 D1/R2 API；没有伪造成功状态或用模拟数据替代后台。

本轮浏览器控制不可用，未做实际浏览器截图或视觉验收；不能把 JSDOM 组件测试称为浏览器验收。可通过上述本地地址检查页面效果。

验证记录和直接前版：`D:\lzz\项目记录\网站后台开发-20261022`。本地烟测使用 `LOCAL QA` 标记并排除统计，不包含真实客户资料。

主要实现：`functions/api/[[path]].ts`、`server/`、`migrations/`、`src/components/AdminApp.tsx`、`src/lib/siteAnalytics.ts`、`src/lib/inquirySubmission.ts`。现有品牌、正式 URL、产品/技术资料和 SEO 契约保持有效。

官方实施依据：[Pages 绑定](https://developers.cloudflare.com/pages/functions/bindings/)、[Pages Wrangler 配置](https://developers.cloudflare.com/pages/functions/wrangler-configuration/)、[D1 本地开发](https://developers.cloudflare.com/d1/best-practices/local-development/)、[D1 批事务](https://developers.cloudflare.com/d1/worker-api/d1-database/)、[Turnstile 服务端验证](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)、[Access JWT 验证](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/)。
