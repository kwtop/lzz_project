# 本次本地生产构建技术审计

当前主站页面的静态 SEO 基础完整；项目现有 `test:seo` 尚未通过，原因是 4 个随 `public` 复制的设计预览 HTML 缺少 description。另有 1 个可索引资源分类页没有站内入链。本报告只证明当前源码与本次本地生产构建产物；未部署、未检查线上域名与搜索收录。

审计范围：`D:\lzz\lzz\_react`。未发现该项目或上级 `D:\lzz` / `D:\lzz\lzz` 的 AGENTS.md 与 `.codegraph`；遵循当前会话提供的 AGENTS.md。未读取历史报告、设计讨论、记忆或其他 Agent 输出。未修改业务源码；执行现有 build 重建 `dist`，审计文件保存在本目录。

## 构建与检查

| 检查 | 本次结果 | 证据 |
|---|---|---|
| `npm run build` | exit 0；Astro 83 页面，生产目录 94 HTML | [build.log](D:/lzz/lzz/_react/audit/prelaunch-20261010/technical/build.log) |
| `npm run test:seo` | exit 1；4 项缺少 description，均为 noindex 设计预览 | [test-seo.log](D:/lzz/lzz/_react/audit/prelaunch-20261010/technical/test-seo.log) |
| 独立静态巡检 | 81 可索引页面，13 排除页；81 sitemap URLs；93 条 301 规则、91 原始 URLs 有映射 | [built-html-summary.json](D:/lzz/lzz/_react/audit/prelaunch-20261010/technical/built-html-summary.json) |
| 页面元信息 | 81/81 有唯一非空 title / description / H1、自引用 production canonical；title / description 无重复 | [built-html-inventory.tsv](D:/lzz/lzz/_react/audit/prelaunch-20261010/technical/built-html-inventory.tsv) |
| HTML 内链与锚点 | 4,938 个站内 HTML 链接记录；未发现缺少目标、失效 hash 或指向旧重定向路径的内链 | [built-html-links.json](D:/lzz/lzz/_react/audit/prelaunch-20261010/technical/built-html-links.json) |
| JSON-LD | 所有 81 可索引页可解析；19 Product、26 Service、20 Article、80 BreadcrumbList、81 Organization / WebPage | [built-html-pages.json](D:/lzz/lzz/_react/audit/prelaunch-20261010/technical/built-html-pages.json) |

可索引页面可加总为：11 个主要页面，35 产品详情，10 能力系列，8 加工研究，11 资源子页，6 公司新闻目录与文章，共 81 页。13 个排除页为：404、首页编辑预览、4 个设计比较 HTML、7 个旧路由重定向壳。所有可索引页面都有构建时写入 HTML 的正文，去导航后的空白分词约 106–897 词；产品页 257–438 词、能力系列 425–524 词。分词数量仅用于发现空壳，不是排名判断。

## 当前可定位的问题

| 等级 | 页面 / 元素与影响 | 当前源码及生产证据 | 最小修正方向 |
|---|---|---|---|
| Major（发布检查） | 4 个设计比较 HTML 没有 meta description，导致现有 SEO 检查整体 exit 1。它们有 noindex，不是主站页面索引遗漏。 | `public/design-comparison-20261010/direction-a.html:4,8`、`direction-b.html:4,8`、`direction-c.html:4,8`、`style-explorer.html:6,7`；同路径 `dist` 中相应行仍有 noindex/title，descriptionCount=0；`scripts/verify-seo.mjs:21` 要求所有非重定向 HTML 有 description。 | 从正式发布包排除内部设计文件，或补齐预览页元信息并明确检查策略；修正后重跑既有 SEO 检查。 |
| Minor（内容入口） | `/resources/drawings-and-ordering/` 在 sitemap 中且自引用 canonical，但从其他可索引 HTML 找不到任何 a[href] 入口。访客没有分类入口，抓取发现依赖 sitemap。 | `src/pages/resources/drawings-and-ordering.astro:4` 仍输出分类页；`src/data/knowledgeCenter.ts:8–14` 的共享入口列表没有该路由；`src/pages/resources/index.astro:15,23` 采用任务链接与非链接分类标题；`dist/resources/drawings-and-ordering/index.html:3` 有 title/H1/canonical。全图 noInbound 唯一为该页。 | 保留此分类时，在 Resources hub 的 Drawings & Ordering 标题附近增加明确分类链接。 |

## 主要页面与产品目录

| 路由 | production title（末尾统一追加 LZZ Precision） | H1 |
|---|---|---|
| `/` | Custom CNC machining in Hangzhou | Your parts Machined to order |
| `/about/` | About LZZ: CNC machining in Hangzhou | The people behind your custom parts |
| `/factory/` | Our factory and manufacturing workflow | Our factory in Hangzhou |
| `/quality/` | CNC part inspection & quality control | Quality control for CNC machined parts |
| `/products/` | Custom Parts | Custom machined parts |
| `/capabilities/` | CNC machining capabilities | Find the right route for your part |
| `/cases/` | Machining Studies | CNC machining studies from the workshop |
| `/resources/` | CNC Machining Resources | Resources |
| `/contact/` | Contact LZZ Precision | Let's talk about your next part. |
| `/quote/` | Request a CNC machining quote | Tell us about your part |
| `/privacy/` | Privacy and site information | Privacy & site information |

10 个能力系列（milling / turning / 5-axis / casting / aluminum / stainless steel / copper & brass / plastics / prototype / low volume）和 35 个产品详情全部有独立 title、description、H1、静态正文、canonical 及站内入链；逐页值见 inventory。能力页入口由 `src/pages/capabilities/[slug].astro:21,56,63` 生成，产品页由 `src/pages/products/[slug].astro:25,52,58` 生成。

**产品总览不是仅有 9 个产品路由。** `dist/products/index.html:4` 的初始 `.product-grid` 有 9 个 featured a 卡片，`<noscript>` 内还有完整 35 个产品 a[href]；源码为 `src/components/ProductExplorer.tsx:51,61–70`，页面以 `client:load` 使用组件（`src/pages/products/index.astro:15`）。解析时必须展开 noscript，默认按启用脚本的 HTML parser 会将它视为文本。35/35 产品入口已用 `scriptingEnabled:false` 复核，见 [product-index-coverage.json](D:/lzz/lzz/_react/audit/prelaunch-20261010/technical/product-index-coverage.json)。本项未验证 JavaScript 启用后点击 View all 的显示状态；这里不将 noscript 等同于 JavaScript 启用后的可见 DOM。

## 35 个产品详情的全量字段覆盖

本项逐页读取生产 HTML，不代表浏览器实看了全部 35 页。完整数据见 [product-content-coverage.json](D:/lzz/lzz/_react/audit/prelaunch-20261010/technical/product-content-coverage.json)。

| 当前页面字段 / 入口 | 完整数量 |
|---|---:|
| Materials / Machining / Surface finish | 各 35/35 |
| Part requirements 区域 | 35/35 |
| Geometry & interfaces / Material & finish / Quantity / Inspection requirements | 各 35/35 |
| 带本产品 ID 与来源路由的 RFQ | 35/35 |
| Related parts | 35/35，每页 2–3 项 |
| Made to order / 图片不是材料证书、尺寸记录或检验结果的声明 | 35/35 |

字段来源是 `src/pages/products/[slug].astro:39,46–50,65–86,88`。Engine-cover 是唯一专用 requirements 模板，使用 Mating geometry / Clearance / Appearance；其余 34 页使用 Part features / Review focus。全量检查无缺字段。

**采购证据缺口：35 个详情页均未发现发布的可测参考尺寸、数值一般公差 / 公差标准或实际检验结果。** 全量正文数值+尺寸单位 / ± / 标准编号扫描无结果，且逐条读取的 Inspection requirements 都是 Agree / Specify / Define / Request 的待约定条件，而非检验结果。`src/data/productSummaries.ts:1–3,8–9,30` 明确限制描述来源及待确认规格；复杂塑料页 `src/data/productDetails.ts:163` 明确没有一般公差。客户可以理解几何和准备询价，尚不能凭详情页判断已验证精度、尺寸包络或验收表现。补充能力资料应采用有来源的范围与适用条件、匿名检验记录样本，不应从图片推断规格。

主图路径方面，33 页使用 `/media/responsive/catalog-xx-cutout-v1-*.webp`，其映射由 `src/data/productImages.ts:3–42` 提供，属于处理过的目录展示素材，不能凭此全部称为原始生产实拍。另 2 页（Brass & copper parts、Pilot-batch housings & mating parts）使用生成的 `/media/product-review/` 主图，`src/data/productReview.ts:39–43` 定义此类素材，`src/pages/products/[slug].astro:61` 输出可见的 illustrative / 非生产检验记录声明。`src/data/refinedImages.ts:4–8` 还将三个 intake / throttle 项登记为 CAD visualizations；当前产品模板未使用这个标记，素材性质需保留这个区别。Engine-cover `src/pages/products/[slug].astro:79` 另有明确标为 Original photograph 的表面细节图。此处没有重新逐张视觉溯源。

## 索引、结构化数据与 GEO 边界

`src/layouts/Layout.astro:39–78` 统一生成 `https://www.lzz-cnc.com` canonical、Organization / WebSite / WebPage / BreadcrumbList / 页面实体。`scripts/build-seo.mjs:77–106` 根据实际可索引 HTML 生成 sitemap、robots 与重定向规则。`dist/robots.txt:1–4` 为 `User-agent: *`、`Allow: /` 与正式 sitemap 地址。

`dist/404.html:3` 有 `noindex, follow`、无 canonical；`src/pages/404.astro:5` 显式 noindex。`dist/preview/home-editorial/index.html:3` 同样 noindex、无 canonical；源码 `src/pages/preview/home-editorial.astro:5`。4 个设计比较 HTML 和 7 个旧路径壳也都 noindex，并排除在 sitemap 外。此设计允许机器人读取页面上的 noindex，符合 [Google noindex 文档](https://developers.google.com/search/docs/crawling-indexing/block-indexing)；实际抓取后是否已排除仍需线上 URL Inspection 核验。

当前 HTML 可提供公司身份、联系地址、加工服务、材质、MOQ、带条件的交期、绘图 / 检验 / 下单 / 发运说明等文字答案与实体关系。能力页面也明确留下待询价确认的边界，例如 5-axis 页没有公布 machine travel / load / maximum part envelope（`src/pages/capabilities/[slug].astro:74`）。图片或 JSON-LD 不会补足未公开的设备尺寸、实测公差或应用验证结果。

Product / Service 类型由 `src/data/partSchema.ts:1–21` 区分，19 个 Product 未编造 offers、评分或库存。本次验证只确认 JSON-LD 可解析且具有基本类型，不证明 Google 特定富结果资格。结构化数据应与可见内容一致，且正确标记也不保证富结果展示，见 [Google structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)。

Google AI Overviews / AI Mode 沿用普通 SEO 要求，支持链接页面须已收录且可显示摘要；不要求额外 AI 专用 schema 或机器可读文件，满足规范也不保证抓取、收录或 AI 展示。因而本次只能说站点有可读取的实体与文字答案，不能宣称 schema 已确保 AI 引用。见 [Google AI features](https://developers.google.com/search/docs/appearance/ai-features)。三篇官方文档的当前核对记录见 [official-sources.md](D:/lzz/lzz/_react/audit/prelaunch-20261010/technical/official-sources.md)。

## 询价传递与实际发送

- 35 产品页与 10 能力页共 45 个页面的询价链接均包含有效 kind/id、part 标题与 source 路由，45/45 正确，见 [inquiry-context-check.json](D:/lzz/lzz/_react/audit/prelaunch-20261010/technical/inquiry-context-check.json)。`src/lib/inquiryContext.ts:9–25` 生成 query，并使用站内 45 条引用白名单解析 id；外部 query 的 source 不直接成为邮件里的来源链接。
- `src/components/QuoteForm.tsx:45–75` 恢复及写入本标签页 sessionStorage；`:84–96` 生成主题、项目内容、引用 ID 和正式来源 URL，并组装 `mailto:roger@lzz-cnc.com`；`:103–110` 的准备动作 preventDefault，只改变草稿状态。
- `:139–146,165` 明确显示草稿尚未发送，提供打开邮件应用 / 复制 / 保存草稿；绘图附件由访客在邮件应用中添加。没有提交 API、服务器上传或自动邮件发送调用。此实现可以准备询价，不提供“网站已收件 / 邮件送达”的证据。本次未实际发送。

## 尚未验证的上线验收项

未检查 DNS / TLS、线上 HTTP 状态、www / 非 www / HTTP 跳转、平台执行 `_redirects` 的真实 301、未知路径真实返回 404、候选域名 `X-Robots-Tag`、线上 sitemap/robots 与 Google 收录 / 富结果 / AI 引用。当前源代码只按显式 noindex 页面处理；同一 dist 在候选域名上的响应头隔离需由托管配置证明。线上验收需对正式域名与候选域名分别取证。本地 build、HTML 标记和预览页面成功不能替代这些结果。
