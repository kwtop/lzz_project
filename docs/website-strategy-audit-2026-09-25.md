# LZZ 网站整站策略审计与整改方案（2026-09-25）

范围：`D:/lzz/lzz/_react` 当前本地 Astro 网站；审计与方案，不含本轮代码修改、发布或真实询盘测试。阅读顺序严格按委托的 30 项。逐 URL 的 Page Purpose Map 与具体结构见 [页面审计附录](./website-audit-page-map-2026-09-25.md)，25 个管理层问题见 [Executive Summary](./website-audit-executive-summary-2026-09-25.md)。

**证据口径。**检查了当前页面源码、目录数据、内容证据登记、最新 `dist`、本地浏览器实际渲染；代表路由在 390/768/1440px 检查宽度和交互。`npm run test:seo` 通过：69 个 HTML、68 个 sitemap URL、86 条由源站档案生成的重定向。下文“当前”指这个本地版本，不能外推为线上已部署、已被 Google 收录或已产生询盘。未取得 GSC、分析/询盘、关键词量、真实用户访谈、实际检验/校准档案；所有关键词为**待 GSC / Keyword Tool 验证的意图假设**。本轮没有做全站 Core Web Vitals、屏幕阅读器、真实邮件投递或生产域名 HTTP 行为审计。

证据入口：`src/components/MainNavigation.astro`、`src/layouts/Layout.astro`、`src/components/ProductExplorer.tsx`、`src/pages/{products,capabilities,cases,insights,quote,about,factory,quality}`、`src/data/{catalog.json,productSummaries.ts,productDetails.ts,resources.ts,cases.ts,seo.ts}`、`docs/{content-evidence.md,content-claims-to-confirm.md,generated-visuals.json,editorial-visuals.json}`、`scripts/{build-seo.mjs,verify-seo.mjs}`。旧版 `docs/decision-centered-site-audit-2026-09-24.md` 仅作历史基线；它的页数、缺口和外站状态不得替代本轮实测。

## 1. Industry & Buyer Analysis

LZZ 的实际业务是**按图纸或样件定制的 CNC 零件加工**：铣削、车削、五轴、铸件后加工；材料包含铝、不锈钢、铜/黄铜与工程塑料；覆盖打样和小批量。它不是有固定型号、库存价格和标准保修的成品经销站。把进口商、政府采购、车队、经销商等通用 B2B 画像硬套上来，会误导导航与内容规划。

| 合理的客户角色 | 决策任务 | 页面首先应回答 |
|---|---|---|
| 机械/制造/研发工程师 | 判断工艺可行、关键特征和验收 | 能否加工这种几何、材料、尺寸；哪些图纸信息不可少 |
| 采购/供应链经理 | 比较供应商、报价条件、交付风险 | 起订/经济批量、报价口径、文件、交期、运输责任如何确认 |
| OEM/设备制造商的项目负责人 | 样件到重复订单、版本控制 | 打样、首件、变更、批次检查怎么衔接 |
| 汽车/仪器/流体设备等产品开发团队 | 找相似零件和用途 | 是否有相关零件形态与经验；应用是否已被验证 |
| 小批量品牌/创业团队 | 从模型/样件开始 | 没有完整图纸时如何询问、最低需提供什么、下一步是谁回复 |

采购阶段：**Awareness** 识别零件能否定制；**Research** 比较铣/车/五轴和供应商；**Specification** 定材料牌号、基准、尺寸、表面及检测；**Supplier Evaluation** 查工厂、设备、来源清晰的实拍及文件；**RFQ** 提交可报价数据、交付地点、期限；**Purchase Decision** 核对报价、验收、条款及实际沟通。当前网站前四步有框架，后两步大多只能“联系后约定”。

## 2. Buyer Questions

| 客户最可能的问题 | 现有入口与回答状态 | 后续补强 |
|---|---|---|
| 你们到底制造什么？ | 首页/Capabilities/Parts 已清楚；但首页未点明按图纸/样件服务的边界 | 首屏用一句场景化补充 |
| 我的零件应选铣削、车削还是五轴？ | 过程比较指南有表格；可达 | 从零件页/案例页反向连过去 |
| 能做哪些材料/牌号？ | 四类材料页与材料指南；部分为可讨论选项，不是库存承诺 | 区分“原站列举”和“已确认可供” |
| 相似几何/应用是否做过？ | 35 个零件示例、5 个过程研究；不是客户项目成果 | 明确“示例/拍摄来源”，补真实项目才可称案例 |
| 最大零件包络、五轴行程/负载？ | 五轴页说未公开 | **NEEDS REAL BUSINESS DATA**：设备台账、包络、负载 |
| 公差能达到多少？ | ±0.01 mm 仅在条件性特征参考，未承诺整件；±0.005 已移除 | **NEEDS REAL BUSINESS DATA**：方法/量具/校准/记录 |
| 哪些尺寸、外观、材料记录可随货？ | Quality 解释“需约定”，无真实脱敏记录 | **NEEDS REAL BUSINESS DATA**：可公开样本与提供范围 |
| 有哪些认证？ | About 展示企业认可文件，Quality 明确非 ISO 证书 | **NEEDS REAL BUSINESS DATA**：持证主体、有效期、范围 |
| MOQ/小批量经济量？ | RFQ 指南明确未公布固定 MOQ | **NEEDS REAL BUSINESS DATA**：按工艺/零件规则 |
| 原型与重复订单有何不同？ | 对比指南有说明 | 连到相关零件与 Quality 检查节点 |
| 交期从何时算、含不含后处理/运输？ | RFQ 指南提出核对项；无统一承诺 | **NEEDS REAL BUSINESS DATA**：报价口径与可披露区间 |
| 如何准备 STEP、2D 图、版本和表面要求？ | RFQ/材料指南较完整 | 在零件页首屏给精简“报价必备” |
| 从样件反向制作可行吗？ | Capabilities hub 有段落，Casting 页有入口 | 验证实际服务流程与责任边界后再加强 |
| 会如何包装和国际发货？ | 运输清单和归档照片；没有命名出口项目或固定条款 | **NEEDS REAL BUSINESS DATA**：贸易条款/文件/授权案例 |
| 我发询盘后发生什么？ | Quote 明确只生成邮件草稿、不在站内发送 | 解决邮件客户端依赖；明确确认/响应规则 |
| 有真实工厂、团队、设备吗？ | Factory/Quality/About 有原始照片与来源说明 | 建立与当前设备/日期关联的证据层级 |
| 有哪个客户的可核验项目结果？ | 目前没有，过程研究不是客户案例 | **NEEDS REAL BUSINESS DATA**：授权案例与数据 |
| 需要保密/NDA 时怎么做？ | RFQ 指南提醒发送前联系 | 提供明确联系人与可执行流程，经公司确认 |

结论：大部分问题**有入口**，但涉及正式采购条件和可复核证据时，答案尚不能闭环。不能把“待报价确认”包装成已有标准。

## 3. Current Website Positioning

当前对外定位是“Hangzhou 的定制 CNC 打样与小批量加工”，产品页实际上是**零件形态示例库**，不是标准 SKU 商品目录。首页与 Capabilities 能讲清“做什么”，但 `Custom Parts` 与若干 `/products/` 的 `manufacturer/supplier` 长 URL 易让人期待现货型号、规格与报价；页面内容没有这样的承诺。建议统一称 **Part Examples / Custom Machined Parts**，在目录首屏说明“按您的图纸评审；以下为形态示例，参数和可供范围按项目确认”。

## 4. Visual / Typography / Industry Fit

桌面实测：蓝色齿轮 LZZ 标志、深灰/红行动色、Inter Tight、宽屏工艺照片，整体已符合专业精密制造，而非明显 SaaS 模板。首页 1440px 和 390px 首屏都能看见加工主题及询盘 CTA；代表页面无横向溢出。字体在大标题与窄导航上偏紧：不是需要更“科技”的字体，而是较长工程术语在案例和指南标题中会占据过多首屏。`/cases/five-axis-machining-multi-face-parts/` 的大 H1 + 大图几乎吃满首屏；`/insights/cnc-process-selection/` 同样先看到大图，核心比较表要继续滚动。`/products/` 的大图与搜索器之间，缺一段说明筛选意义；`/about/` 有 36 个主区域图片实例，易掩盖公司决策信息。

建议保留现有品牌系统，不做“换皮”。以 3 个密度层级微调：决策页首屏尽快给摘要/关键表；证据页大图保留但缩短首屏距离；目录页给产品筛选的判断提示。全站制定标题最大行长、主图占屏比例、卡片图背景/比例、次级链接边界、图注与证据标签规则。**不得把 AI 生成的工厂/检测图当真实作业、交付或认证证据。**

## 5. Current Navigation Tree

```text
Header
├─ Capabilities → /capabilities/
│  ├─ By Process: CNC Milling / CNC Turning / 5-Axis / Casting Machining
│  ├─ By Material: Aluminum / Stainless Steel / Copper & Brass / Plastic
│  ├─ By Order Type: Prototyping / Low-Volume Production
│  └─ Have a sample but no drawing? → /capabilities/#sample-to-part
├─ Custom Parts → /products/
├─ Process studies → /cases/
├─ Quality → /quality/
├─ Resources → /insights/
│  ├─ All Guides & News
│  ├─ Drawing & RFQ / Choose a Machining Process / Prototype vs Small Batch
│  └─ Material & Finish / International Shipping / How to Order
├─ About LZZ → /about/
│  ├─ Company Overview / People & Visits (About anchor) / Our Factory
└─ Get a quote → /quote/

Footer: Explore = Capabilities, Custom Parts, Process studies, Quality;
Resources = 6 guides; About = People & Visits, Our Factory;
Contact = email/WhatsApp/address; Legal = Privacy & site information.
```

## 6. Navigation Problems

一级 6 项并非严重过量；主要问题是**按内部内容类型而非采购任务分组**。`Process studies` 是车间过程证据，与 Factory/Quality 更近；`Quality` 与 Factory 分开使“能做”和“如何验证”隔开。Capabilities 下 10 条平级选择对新访客偏多，4 种材料与 2 种订单类型可由 hub 的明确分区承接。Resources 下 6 条直达链接像目录复制，长期扩稿会持续膨胀。About 的 `People & Visits` 是公司页锚点，不应与独立页面混淆。Footer 已和 Header 基本对应，不需要重新堆满全部 SEO 页。

## 7. Recommended Navigation Tree

```text
Header（5 组 + 固定询盘）
├─ Capabilities [KEEP]
│  ├─ Overview [KEEP] → /capabilities/
│  ├─ CNC Milling / CNC Turning / 5-Axis / Casting Machining [KEEP]
│  └─ Materials & Order Types [MOVE] → /capabilities/ 对应区块
├─ Part Examples [RENAME] → /products/
├─ Factory & Quality [MERGE NAV ONLY]
│  ├─ Our Factory → /factory/
│  ├─ Quality Control → /quality/
│  └─ Workshop Process Studies → /cases/
├─ Resources [KEEP]
│  ├─ All Guides → /insights/
│  ├─ RFQ Checklist / Process Comparison / How to Order [KEEP, 精选]
│  └─ 其余指南 [MOVE] → hub 正文/页脚
├─ About LZZ [KEEP] → /about/
│  └─ People & Visits [REMOVE FROM NAV] → About 页面内部
└─ Get a quote [KEEP] → /quote/

Footer：保留核心入口 + 采购指南、联系方式、地址、Privacy；可增明确的
“Shipment planning”链接，但不新增顶栏项。
```

这不是删除 Quality、Process Studies 或材料页；只是调整发现路径。URL 先不动。若未来决定合并正文/改 URL，应先看 GSC 着陆页表现、反链、内容差异，再做一对一 301 与 canonical 检查。新菜单标签需用真实采购访谈/点击数据验证，不以“少一个项目”作为唯一目标。

## 8. User Journey Audit

工程师从“CNC milling aluminum housing”进入材料/能力页，能看到零件示例和 RFQ 入口；但需要自己从大图、概览、零件库中提炼“本零件能否做”。采购从零件详情进入，首屏看到图、用途、能力标签和 CTA；默认折叠的 Drawing & inspection checklist 往往是作决定最重要的内容。质量/工厂有证据入口，但脱敏检测结果、设备包络与认证状态尚未具备。过程研究明确是照片而非客户案例，诚实但没有对应零件回链。报价从各页都可进入，却在“打开本机邮件客户端并自行附图发送”处中断；不能统计为站内提交。

推荐最短路径：**相关零件/能力 → 3–5 条可判断的特征和限制 → 工艺/材料对比 → 原始工厂/质量证据及不足说明 → 必需询价字段 → 可确认的送达与下一步**。对没有图纸、需要 NDA、只是比较材料的访客保留不同支路，避免所有人直接被推向 Quote。

## 9. Page-by-Page Audit

详细的每个现有 URL、目标客户、意图、主词假设、缺口、图文形式和下一步见 [Page Purpose Map 与逐页审计](./website-audit-page-map-2026-09-25.md)。这里列跨页面模式：

| 页面族 | 3–5 秒判读 | 主要欠缺 | 应保留的优势 |
|---|---|---|---|
| 首页 | 加工与小批量清晰 | 客户用途、材料/工艺边界再具体一步 | 强烈的制造主题、明确 CTA |
| Capabilities hub + 10 详情 | 多数 H1 清楚 | 短文和大图先于可行性判别；个别关键设备/验收参数未知 | 与零件/指南/过程研究连接较好 |
| Products hub + 35 详情 | 示例图和标题清楚 | hub 无 H2；35 页同 3 个 H2，特征/验收深度折叠；部分宽泛“服务型”零件页同能力页重叠 | 原始目录图片与保守的条件口径 |
| Cases hub + 5 详情 | “过程研究”定义诚实 | 源照片多，信息粒度较薄；没有指向具体零件详情 | 不伪装客户案例 |
| Resources hub + 8 详情 | 比较/清单页较明确 | 3 篇较短或历史内容需分离；指南到对应零件详情几乎没有链接 | 采购问题与工艺比较已建立 |
| About/Factory/Quality | 公司、设备、质控有入口 | About 图片/活动信息密；质量实测与校准不能核验 | 原图、公司文件及能力边界说明 |
| Quote | “准备邮件草稿”足够清楚 | 外部邮件客户端依赖、没有提交确认/响应预期 | 不误称已发送，字段指引实用 |

没有独立 Solution/Application、Service/Support 页面。现有应用信息主要在 About 和零件/能力文案，服务流程在 `How to Order`；不因通用审计模板立刻新建这些页。是否需要独立页取决于不同搜索意图与真实可核验资料。

## 10. Image / Content Balance

生成 HTML 主区域约 395 次 `<img>` 使用、110 个不同 `src`（是页面实例/路径，不是 395 或 110 张独立实拍）；About 36 次、CNC Milling 能力页 32 次。明确 `data-image-origin="AI-generated"` 的 12 次出现在 7 个路由；**未标记的 375 次不能自动判为真实或 AI**，要与素材清单逐项对齐。产品页 4 次图片使用通常合适；Cases 3 张真实过程照片与约 4 段解说，部分首屏图太大。Quality 同时有 CMM 原始照片和标明的 AI 检测示意图，其标题/图注必须持续区分。

处理顺序：先做图片台账（原始实拍/原图修饰/AI 示意/来源不明），再按每个 section 的问题选图。产品图须看清几何；工厂图须说明设备与流程；发货图只能证明拍到打包/装车，不能推出目的国/贸易结果；团建图只服务公司文化，不应压过工厂能力。优先裁图、合并图组、加有信息量的图注；不是盲目再生成更多逼真照片。文字方面，将相同的“按图纸确认”从 35 页模板压缩，把有区别的特征/适用边界/验收问题上移。数字或表格只在有来源时用。

## 11. SEO Search Intent Map

| 意图 | 现有主要承担页 | 下一步 |
|---|---|---|
| Commercial：custom CNC machining / factory | 首页、Capabilities、Factory | 首页说清订单模式；Factory 给核实方式 |
| Process：CNC milling/turning/5-axis/casting machining | 4 个工艺能力页 | 各页以可加工几何和询价要件区分 |
| Material：aluminum/stainless/brass/plastic parts | 4 个材料页 | 材料牌号/处理条件需证据来源 |
| Product/geometry：housing, shaft, fitting, plunger, intake | 35 个零件页 | 筛选真正有独立意图的零件，不让宽泛页抢能力词 |
| Stage：prototype / small batch | 2 个阶段页 + 对比指南 | 用阶段决策表和版本/检验条件区分 |
| Application/industry | About 的概览及一些零件页 | 仅在真实产品-场景/项目资料充足时建独立页 |
| Technical/problem | RFQ、材料表面、过程比较、采购流程 | 增强反向商业链接和可复核来源 |
| Procurement | Quote、RFQ/Shipping/Quality | 补 MOQ、回复、物流等真实商务口径 |
| Country/market | 无独立国家页 | 不凭运输照片创建国别页；先核实真实市场证据 |

## 12. Long-Tail Keyword Opportunities

优先由现有强页自然覆盖，不为词缀建页：

1. `CNC machined aluminum housing` + `thin wall / anodizing / mating bore / small batch` → 铝材料页与相应 enclosure 零件页；补设计/验收条件。
2. `CNC turned stainless steel shaft` + `316L / runout / thread / inspection` → 车削页与不锈钢轴零件页；明确尺寸、同轴度要由图纸评审。
3. `machining cast pump housing` + `bearing bore / sealing face / supplied casting` → 铸件后加工页与明确不同几何的零件页。
4. `prototype CNC machining` + `sample-to-batch / revision / first article` → 打样页及对比指南。
5. `CNC milling vs turning for [geometry]` → 现有工艺比较，增加具体零件进出链。
6. `how to request quote for CNC parts` + `STEP / 2D drawing / material / finish / quantity` → RFQ 指南与 Quote。

`manufacturer`、`supplier`、`OEM`、`price`、`country` 只有与页面真实内容和商业模式相符才出现。上述不是搜索量、难度或排名结论；先用 GSC 查询/点击/着陆页和市场访谈验证。

## 13. Keyword Cannibalization

**未发现完全重复的 HTML Title/H1；未取得 GSC，不能宣称已发生关键词蚕食。**发现“同一意图竞争风险”：

| 主题与页 | 风险 | 处理假设（先不重定向） |
|---|---|---|
| `/capabilities/cnc-milling-service/` vs `/products/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/`、`/products/custom-oem-high-precision-cnc-milling-manufacturer/` | 零件页 H1 是宽泛服务词，容易与能力页抢“CNC milling service” | 能力页做服务主入口；两详情以真实图示几何改写为零件示例；若无法建立差异再考虑合并 |
| `/capabilities/low-volume-production/` vs 两个 `small-batch-*` 与 `precision-low-volume-*` 产品页 | 阶段词/表述重复 | 阶段页讲流程与批次决策；产品页限定具体铝壳或混合零件 |
| 5 个 casting housing 详情 | H1/摘要围绕 housing、pump/transmission、casting finishing | 逐一核对不同原图、合金、工序和特征；留有独立意图者，余者在图集/相关示例中整合，GSC 后决定 301 |
| 3 个 billet intake manifold/plenum 详情 | 形态很近，用户可能难辨 plenum、runner、manifold | 加几何对比图和用途边界；仅在无法区分时合并 |
| 3 个 plastic details、2 个 stainless shaft details | 材料/几何近似 | 按功能、几何、牌号和检查要点分层，避免相同 H2/同一泛化文案 |

执行判断顺序：原始素材区别 → 当前页面目标 → GSC 查询重叠/表现 → 保留/重新定位/合并 → 唯一映射 301 与内链更新。不要因为 URL 长或名字近就删除 35 个原始零件档案。

## 14. Topic Cluster

已有“Capabilities → 零件 → 指南/过程研究 → Quote”的骨架，但后两类页面回到具体零件的联系弱。建议建立 4 个**以真实加工任务为核心**的集群：

| Pillar | 子页与证据 | 缺少的闭环 |
|---|---|---|
| CNC Milling / 5-Axis | 铣削、五轴；壳体/多面零件；过程照片；工艺比较 | 包络/夹具/检测范围真实证据；指南→示例 |
| CNC Turning / Fittings | 车削、不锈钢、铜黄铜；轴/接头/定位销；车后铣过程 | 线程/配合与检验样本；过程→零件 |
| Casting Finish Machining | 铸件后加工；泵/传动壳体示例 | 毛坯条件/加工余量/基准的真实样例；重复页分工 |
| Prototype → Small Batch | 打样/小批量；阶段对比；RFQ/How to Order | 版本管理、报价口径、批次验收真实流程与证据 |

Application/industry 层先用已有产品的**用途场景解释**，不能把“汽车件形态”升级为车厂客户或法规适用案例。外部排名的“topic authority”不是可直接测得的站内分数；目标是让每页能回答一类问题并可相互导航。

## 15. Internal Linking

解析生成 HTML 的 `<main>` 内部链接（去重后的路由边；不算 Header/Footer）：能力族→零件族约 127 条、零件族→能力族 117、零件族→指南族 210、零件族→过程研究族 66。**5 个过程研究详情到具体零件详情为 0；8 个指南详情到具体零件详情也为 0**（有一个到 `/products/` hub 的入口）。这不是“没有内链”，而是语义方向偏单向。优先给工艺比较与 2–3 篇采购指南各加 1–3 个真正解释该概念的零件；给过程研究加“相似几何示例（不是同一客户项目）”。About → Factory/Quality、Factory → 产品与询盘、目录 → 详情已存在；仅对语义缺口补链，不设每页机械配额。Google 对可抓取链接及描述性锚文本的建议见 [Search Central 链接实践](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)。

## 16. GEO / AI Readability

此处是**模拟机器提取的内容检查**，并未实际测试 ChatGPT/Gemini/Perplexity/Claude 是否抓取或引用本站。机器从 HTML 可提取公司名、Hangzhou、服务、四工艺/四材料、联系方式与许多 H1/H2；能力和采购流程的文本可读。它无法从现有资料可靠提取固定 MOQ、产能适用条件之外的数值、证书范围、检验结果、客户行业绩效或回复 SLA；不应填补为推测。部分产品页 3 个统一 H2，唯一价值藏在表格/折叠区，AI 可能概括成高度相似的零件页。建议每页首段明确“是什么/适合什么几何/哪些条件仍需确认”，提供可见表格和来源注释。Article 不伪造日期、作者或审核人；有真实署名/日期再补。Google 明确 AI Overviews/AI Mode 沿用 SEO 基础，无特殊 AI 文件或 schema 要求，须可索引、有文本和可发现内链；符合条件也不保证被引用，见 [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)。`llms.txt` 不应当作排名工程，见 [Google 文档更新](https://developers.google.com/search/updates)。

## 17. E-E-A-T Audit

| 维度 | 当前可见证据 | 最弱处与行动 |
|---|---|---|
| Experience | 车间/加工/团队/发货归档实拍、原零件素材、5 个过程研究 | “看过工作”不等于“有项目结果”；补经授权的图纸→检查→交付链 |
| Expertise | RFQ、工艺、材料、原型/小批量比较与质量流程 | 指南大多无可核对技术负责人/修订日；为确实审核过的文章补署名，不能虚构 |
| Authoritativeness | 企业认可文件与历史材料 | 企业认可 ≠ ISO/客户批准；外部提及、有效证书仍缺 |
| Trustworthiness | 公司法定名称、杭州地址、邮箱/WhatsApp、Privacy、图片来源说明、报价边界 | 没有脱敏实测/校准/订单条款/真实发送确认；优先补可核验的最低证据集 |

“E-E-A-T”是评估内容可信度的分析框架，不是给网站造分数。真实证据优先于更多示意照片。

## 18. Trust Audit

**能信任的原因：**可见实名主体、具体地址/联系方式、原始设备与加工照片、公司文件原件和限度说明；Quote 不假装已发送；过程研究不冒充客户案例。**可能不信任的原因：**关键承诺须逐单问，设备范围/校准/报告无可公开样本；公司证书的现行有效性需核实；生产能力引用仅为参考；过去 AI 生成的真人感工厂/检测场景若离开图注，易被误看成现场证据。原站标识/合作图不自动证明当前客户关系。优先创建一张内部**Claim Ledger**：声明、来源、最新核验日、可公开依据、页面位置、审核责任人；无依据则标 `NEEDS REAL BUSINESS DATA` 并维持条件口径。

## 19. CRO / RFQ Journey

页面 CTA 有清晰主按钮，Quote 仅姓名、邮箱、项目描述必填，附加字段可选，这是低门槛；但用户点击后需本机邮件程序可用、再附图、再发送。当前 UI 有显著文字说明，不能误称网站已收件。P0 方案是**先确定可收件的实际流程与隐私/附件限制，再实现一个可靠提交或清楚的替代渠道**，包含防滥用、成功/失败状态、收件人测试、存储/删除规则。实现前可立即改善邮件路径：显著展示收件邮箱、复制/下载草稿、说明发送后如何确认及响应政策（政策本身待公司确认）。度量应分开：打开 Quote、完成草稿、点击 mailto、确认实际收件、合格询盘；前两者不等于询盘。

## 20. Content Gap

| 类型 | 最高价值缺口 | 依赖/优先级 |
|---|---|---|
| Missing Commercial Content | MOQ、报价范围、交期起算、Incoterm、响应流程 | **NEEDS REAL BUSINESS DATA** / P0–P1 |
| Missing Product Content | 35 个示例中的特征差异、尺寸/材料边界、哪些仅图库 | 先审原图/原资料 / P1 |
| Missing Application Content | 可核验的用途与适用性限制，而非行业名列表 | 真实客户/工程授权 / P1 |
| Missing Technical Content | 包络/负载、量具范围、表面标准、检测报告示例 | **NEEDS REAL BUSINESS DATA** / P1 |
| Missing Trust Content | 最新设备清单、证书有效范围、脱敏检验/校准/材料样本 | **NEEDS REAL BUSINESS DATA** / P1 |
| Missing Comparison Content | 铸件毛坯/塑料/小批量的决策差异 | 可先增强现有页 / P1–P2 |
| Missing FAQ Content | 报价/交付/文件“可确认 vs 未承诺”的简短答案 | 按真实政策审核 / P1 |
| Missing Case Content | 经授权客户项目与交付结果 | **NEEDS REAL BUSINESS DATA** / P1 |
| Missing GEO Content | 源于真实记录的可引用事实块与来源/审稿日期 | 证据审核 / P1 |
| Missing SEO Content | Guide/Process → Product 双向链接，宽泛零件页去重分工 | 本地可直接实施 / P1 |

不建议从“10 个缺口”机械派生 10 个新页面；多数应在现有能力/零件/指南页完成。

## 21. Pages To Merge

**现在不直接合并任何 URL。**优先的条件性候选：5 个 cast housing 详情、2–3 个 broad CNC service 式“产品”详情、3 个 billet intake、small-batch/housing 详情。先做图像/原始内容对照、GSC 查询共振、正文差异审稿；若两个 URL 满足相同用户问题且无独立事实，保留更强/更准确的一个，将另一个内容并入，并做 301（不是仅 canonical），核对源站别名迁移。能力页与真正独立的零件页一般**重新定位**，不合并。

## 22. Pages To Remove From Navigation

`Process studies`、`Quality`：从**一级**撤下，迁入 `Factory & Quality` 子层；页面保留。`People & Visits`：从 About 子导航下沉为 About 内部 section；页脚是否保留取决于公司招聘/品牌目的。Resources 里的 Shipping、Material & Finish、Prototype vs Small Batch：从**全局下拉**撤下，保留 hub 正文和页脚/上下文链接。四材料和两订单阶段从 Capabilities mega menu 撤下，保留 `/capabilities/` 的清楚分类入口、SEO URL 与内部链接。

## 23. Pages To Create

**Batch 1 不建新 SEO 页。**候选仅在能回答独立意图且现有页无法覆盖时进入编辑排期：

| 候选 | 谁/独立搜索意图 | 为什么现有页不够 | 放行证据 |
|---|---|---|---|
| 应用/零件选择 hub（不进主导航） | 工程师按应用功能而非材料/工艺找零件 | About 应用介绍太公司化，目录偏形态 | 至少 3 类可证实的应用-零件映射、非虚构照片和 GSC 查询 |
| 样件反向制作流程页 | 无图纸客户询问样件→模型→验收 | 现有 hub 锚点和 RFQ 指南只覆盖概要 | 实际服务边界、测绘/知识产权流程、项目样例 |
| 真实项目 Case | 采购评估结果和交付能力 | 过程照片不能表达客户需求/结果 | 客户授权、图纸/检验/运输证据与可公开结果 |

没有证据则仅增强现有 hub/FAQ，不生产行业/国别/城市矩阵页。

## 24. Pages To Improve

先改 `/products/` 的目录解释与筛选策略；35 个详情的模板“可判断字段 + 独有事实”层；5 个过程研究与 8 篇资源的反向具体零件链接；`/quality/` 的证据等级；`/quote/` 的真实收件路径。其次调整 `/about/` 的照片密度，让“公司身份、能做什么、有什么证据、如何联系”始终早于活动照片。`/factory/` 保留原实拍与参考容量条件，不把 40+ 设备当作 40 台 CNC。每页精确建议见附录。

## 25. Schema / Technical SEO

本地当前有 `Organization`、`WebSite`、`WebPage`、`BreadcrumbList`，资源/过程文章有 `Article`；title/description/canonical 均有，除 404 外 68 页进本地 sitemap。`robots.txt`、sitemap、`_redirects` 是**构建时**生成；测试通过只能证明包内容，不能证明线上托管实际执行 301 或 Google 已收录。`Article` 无虚构日期/作者是正确的。若要补 `Product`，必须先判断每个详情是否为单个可识别商品还是定制示例；不能编价格、库存、评分。`Person` 需真实授权署名；`VideoObject` 需真实可访问视频；`ImageObject` 只标记真实对应图片。给买家写可见 FAQ 有价值，但 Google 已在 2026 年停止展示 FAQ rich results，**不要以 FAQPage 富结果为目标**，见 [Google 文档更新](https://developers.google.com/search/updates)。任何结构化数据须与可见内容一致，也不保证富结果，见 [结构化数据总则](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)。发布后另做真实主机 200/301/404、robots、sitemap、canonical、移动端渲染、Rich Results Test、GSC URL Inspection。

## 26. Visual Consistency

基础视觉一致（标志、白/灰底、红行动色、圆角卡片、同一字体系）；主要不一致是**内容密度和图文角色**：首页电影感大图，目录干净但信息少；产品页画廊与表格，过程页巨幅实拍，资源页长图，About 活动墙，Quality 混合原图与示意图。建议建立组件级约束：标题层级在大标题长词下不会压住首屏结论；同类 CTA 一主一辅；次级链接不用在按钮/下划线间随意切换；照片图注明确“原始实拍/后期修饰/AI 示意”；长页采用摘要、比较表、正文锚点，不为了 SEO 堆密文。每次改动做 390/768/1440px + 键盘可见焦点检查。

## 27. P0 / P1 / P2 / P3

- **P0：**询盘送达闭环及“草稿≠发送”状态；生产主机索引/重定向状态发布前核验（本地未证实线上故障）。
- **P1：**产品页独立性与首屏可判断性；证据/声明台账；Guide/Process→Product 回链；导航收敛；质量/工厂缺证据处的条件口径；About 信息排序。
- **P2：**材料/工艺比较深度、照片编辑、资源中心分类、本文作者/修订流程、模板微调。
- **P3：**经证据放行的独立应用页、真实项目案例、视频/更多媒体与外部权威链接。

## 28. MASTER WEBSITE IMPROVEMENT PLAN

问题登记按委托格式逐项记录。`Current evidence` 只指本地源码/生成 HTML/代表性浏览器实测，不代表线上已发生的流量损失；“怎么改”均为下一阶段任务，尚未实施。

| Problem | Why it matters | Current evidence | Recommended change | 具体应该怎么改 | Affected pages | Priority |
|---|---|---|---|---|---|---|
| RFQ 只有邮件草稿 | 买家可能无法用本机邮件客户端完成发送；网站无法确认收件 | `QuoteForm.tsx` 与 `/quote/` 明示“does not send anything” | 建立可验证询盘闭环 | 先批准收件/附件/存储/防滥用方案，再实现提交、错误、成功及收件测试；未实现前保留明确草稿提示 | Quote、Privacy、全站 CTA | P0 |
| 线上技术状态未确认 | 本地 sitemap/301 正确不代表托管层执行 | `test:seo` 仅报告本地 68 URL、86 redirects 并提示 Host behavior not tested | 发布前真实域核验 | 逐类测 301、200/404、robots、sitemap、canonical，再用 GSC URL Inspection | 构建脚本、发布、所有旧 URL | P0（上线关口） |
| 目录页未说明“示例而非 SKU” | 初访者难判断筛选结果与报价关系 | `/products/` 1440px 首屏是 H1/照片/筛选；无 H2 | 补零件库定位 | 筛选前加短定义、按几何的快捷入口与“图纸评审”边界 | `/products/`、目录组件 | P1 |
| 35 个零件页模板过同质 | 读者/搜索系统难区分近似页面 | 全部详情共用 3 个 H2；关键 Drawing/Inspection 内容默认折叠 | 给每页独特可见事实 | 先审原图和摘要，再在首屏给形态、关键特征、限制及需要确认的验收问题；不要发明数值 | `/products/[slug]/` 35 页 | P1 |
| 宽泛零件页与能力页重叠 | 可能争同一意图，且买家找不到真正区别 | milling/turning/low-volume 的 broad H1 与能力页相近；无 GSC | 页面职责重定位 | 能力页负责服务词；产品页负责图示形态；先做 GSC/图像判别表，再决定少量合并/301 | 能力页 + broad 产品页、casting/intake 组 | P1 |
| 指南/过程到具体零件缺回链 | 信息流走向知识页后缺商业出口 | 5 个过程详情与 8 个指南详情到产品**详情**的正文链接均为 0 | 建语义反向链接 | 每篇按内容选 1–3 个相似零件，写准确锚文本；过程页注明非同一客户项目 | Cases/Insights 详情 | P1 |
| 导航分组偏内部内容类型 | 把工厂、质量、过程证据拆散，菜单长期易膨胀 | 当前 6 顶级、Capabilities 10 子项、Resources 6 指南 | 采用第 7 节五组 | 菜单合并 Factory/Quality/Process 组；材料/阶段/长尾指南下沉 hub；保留 URL 与页脚 | Header/Footer/移动导航 | P1 |
| 企业声明缺统一可追溯台账 | 带条件参考值和示意照片易被断章取义 | `content-evidence.md`、`content-claims-to-confirm.md` 与页面分散 | 建 Claim Ledger | 给每条对外事实标来源、审核人、时间、范围、页面；未核实项写 `NEEDS REAL BUSINESS DATA` | 全站涉及事实/图片页 | P1 |
| 检验过程与记录证据间有断层 | 工厂/量具照片不能证明实际测量或校准 | `/quality/` 有 CMM 原图、AI 示意、空白报告；明确无客户结果 | 争取脱敏证据并说明可提供范围 | 由公司审核报告/校准样本与适用件，不能获取则保留“需报价确认” | Quality、Factory、RFQ | P1 |
| 五轴尺寸/负载范围未公开 | 工程访客不能独立评估可加工包络 | 五轴页明确要求买家提供包络，未列行程/负载 | 公布经确认设备范围 | 校验台账、设备型号、行程/负载及限制，建简短数据表和更新日 | 5-axis、Factory | P1 |
| About 活动图比商业证据密 | 公司判断路径被图墙拉长 | About 主区 36 次图片使用；渲染首屏公司事实在第二块 | 精选照片并重排 | 公司身份/工厂/文件先行；精选活动 4–6 组、其余折叠归档 | About、CompanyArchive | P1 |
| 商务条件只有逐单确认 | 采购无法先过滤明显不匹配供应商 | RFQ/Shipping/How to Order 对 MOQ、交期、运输均提示报价确认 | 经公司审核建立可公开口径 | 收集工艺/批次规则、交期起算、Incoterm/回复政策；无统一规则则公开影响因素 | RFQ、Quote、How to Order、Shipping | P1 |
| 比较信息分散 | 工程师要跨多页理解路线差别 | 能力详情与比较指南均有内容，但缺统一几何/限制视图 | 在既有强页补选择表 | 铣/车/五轴、材料、打样/批量各做紧凑比较；配对应实拍/零件 | Capabilities、对比指南 | P2 |
| 图片来源标记未覆盖所有实例 | 高拟真 AI 图易被误当现场证据 | 395 次主区图片使用，仅 12 次显式 AI-origin 标记；其余性质不明 | 建逐图来源台账 | 对齐原图路径、修饰版本、AI 示例及图注，抽查关键页渲染 | 全站图片 | P2 |
| 资源中心新闻与指南混排 | 采购访客搜技术资料时被低相关活动打断 | `/insights/` 同列 7 篇指南和 1 篇团队活动 | 按买家问题分组 | Guides 分 RFQ/工艺/材料/交付；活动归 Company news，与 About 互链 | Resources hub、团队动态 | P2 |
| Schema 扩展缺事实门槛 | 生硬加 Product/Person/FAQ 容易与可见内容不符 | 当前是基础 Organization/WebPage/Breadcrumb/Article，无真实售价/作者资料 | 只加适用数据 | 对单一商品身份/真实作者/视频逐项审核；结构化数据与页面同步测试 | Layout、详情模板 | P2 |
| 缺真实应用/客户项目页 | 供应商评价阶段缺“做成什么、如何验证”的证据 | 现有 5 个 Case 明确只是车间过程照片 | 设证据放行条件后再建 | 经授权的需求、图纸、工序、检查、结果/交付资料齐备且意图独立时新增 | 未来 Application/Case | P3 |

影响列为预期方向（↑明显、△辅助、—基本不直接影响），**不是已测量结果**；难度 S/M/L。具体实施步骤与验收见第 29 节。

| ID / P | Page / Component | Current Problem → Action | Expected Result | SEO | GEO | UX | Trust | Difficulty |
|---|---|---|---|---|---|---|---|---|
| T01 / P0 | `/quote/`, `QuoteForm`, privacy | 邮件草稿依赖本机；先确认收件/存储/附件流程，再做真实提交和错误/成功状态；未授权前保留诚实 mailto | 可验证收件、草稿与发送分离 | △ | △ | ↑ | ↑ | L |
| T02 / P0 | 部署包、`build-seo.mjs`、主机 | 本地 86 重定向未等于线上执行；在真实域逐类抽测 301/404/robots/sitemap/canonical | 降低迁移与索引风险 | ↑ | △ | △ | △ | M |
| T03 / P1 | `ProductExplorer`, `/products/` | 目录首屏只有标题/图/筛选；加“按图纸示例”说明、常见形态任务入口与筛选结果语义 | 访客知道如何使用示例库 | ↑ | △ | ↑ | △ | M |
| T04 / P1 | 35 个 `/products/[slug]/` | 同 3 个 H2、关键评审隐藏；先按 5 类原始事实审稿，给每页可见独特几何/材料/验收摘要 | 零件页各有独立用途 | ↑ | ↑ | ↑ | ↑ | L |
| T05 / P1 | 同上 + GSC | broad service、casting、intake、small-batch 页重叠风险；建立每 URL 保留/重定位/合并决策表 | 降低相同意图竞争 | ↑ | ↑ | ↑ | — | M |
| T06 / P1 | `/cases/[slug]/`, `/insights/[slug]/` | 正文没有具体零件详情出口；每页加 1–3 个真实语义匹配的示例链接并说明非同一项目 | 证据/知识回到商业页 | ↑ | ↑ | ↑ | △ | S |
| T07 / P1 | `MainNavigation`, Footer | 6 顶层/10 能力子项/6 指南子项按内容类型堆叠；改为第 7 节五组，保留 URL | 决策路径更短 | △ | △ | ↑ | △ | M |
| T08 / P1 | About/Factory/Quality/Claim Ledger | 图片与事实来源散；建立每项声明的来源/日期/适用范围/负责人台账，逐页核准 | 买家可区分实拍/参考/待确认 | △ | ↑ | ↑ | ↑ | M + 业务资料 |
| T09 / P1 | `/quality/` | 量具实拍不是校准/实测结果；在可获批资料后发布脱敏记录和适用范围；未获批前只写核对方法 | 实际验收可评估 | △ | ↑ | ↑ | ↑ | M + 业务资料 |
| T10 / P1 | `/factory/`, 5-axis | 设备计数与包络范围不齐；确认设备类别/行程/负载/时间后发布可验证表 | 工程可行性更好判断 | ↑ | ↑ | ↑ | ↑ | M + 业务资料 |
| T11 / P1 | About、CompanyArchive | 36 次主区图片使用使公司身份被活动内容稀释；精选 4–6 组前置，其余归档折叠/分页 | 先看商业信任证据，后看文化 | — | △ | ↑ | ↑ | M |
| T12 / P1 | RFQ/Shipping/How to Order | 商务政策仅“逐单确认”；收集并审定 MOQ/交期/运输/回复口径，明确无法统一的条件 | 采购可比较 | ↑ | ↑ | ↑ | ↑ | M + 业务资料 |
| T13 / P2 | Capabilities/Guides | 比较表与示例散；按几何、材料、工序、限制补可读对比模块 | 减少选错工艺 | ↑ | ↑ | ↑ | △ | M |
| T14 / P2 | 全站 image ledger | 12 次显式 AI 标记，其余来源需逐项对齐；完整核对原图/修饰/示意图注 | 防止示意图被误读为证据 | △ | ↑ | ↑ | ↑ | M |
| T15 / P2 | 资源中心/Articles | 新闻与采购指南同列，署名/审稿流程不明；分采购主题/公司动态，确认真实修订信息 | 更快找资料与判断时效 | △ | ↑ | ↑ | ↑ | S–M |
| T16 / P2 | Schema/Metadata | 有基础 JSON-LD，缺部分适用实体但不能硬加；逐页核对可见事实后扩展，实测结果 | 数据一致，不追逐无效富结果 | △ | △ | — | △ | M |
| T17 / P3 | Applications/Case | 缺独立真实案例/应用内容；满足第 23 节证据门槛后再建页 | 增加有差异的商业/行业意图 | ↑ | ↑ | ↑ | ↑ | L + 业务资料 |

## 29. Recommended Implementation Batches

| 批次 | 可直接做的工作 | 业务/数据关口 | 验收标准 |
|---|---|---|---|
| Batch 1 — 信息架构 | T07；确定现有 68 个可索引 URL 的页面职责与菜单调整；T05 只做候选矩阵 | GSC 到位前不合并/改 URL | 菜单不丢原入口；键盘/移动可达；无断链；重定向计划逐条可追溯 |
| Batch 2 — 核心页面 | T03、T04：目录说明、5 类产品差异审稿、能力首屏可行性要点 | 不填无来源数值 | 代表零件页 3–5 秒能答“是什么/如何评审/下一步”；35 页无复制粘贴空话 |
| Batch 3 — 信任体系 | T08–T12 中公司/质量/工厂资料，筛选真实案例，不新增假证书 | **NEEDS REAL BUSINESS DATA** | 每个可量化声明有来源/审核人/日期/适用条件；图片可追溯 |
| Batch 4 — SEO / GEO Content | T13、T15；增强现有工艺/材料/阶段比较与问答 | GSC/Keyword Tool 验证新意图 | 一页一主意图，内容解决问题，无机械关键词页 |
| Batch 5 — Internal Linking | T06；从 Guide/Process 到具体零件，再到 Quality/Quote | 链接必须语义相关 | 0 条反向详情链接问题消失；锚文本能独立说明去向 |
| Batch 6 — Structured Data | T02、T16；本地包测试后真实主机验证 | 发布/主机权限另行确认 | Rich Results Test 不误报；实际 301、robots、sitemap、canonical 与规划一致 |
| Batch 7 — Visual Refinement | T11、T14；统一标题、图注、卡片密度、次级操作 | 不生成仿真实际交付“证据” | 390/768/1440 无溢出；证据图有清楚来源/用途；关键文本不被大图推后 |

顺序是内容/证据依赖关系，不意味着每批要独立部署。T01 的真实提交涉及安全、隐私和收件系统，需单独确认实现边界；本审计没有获得外部发送授权。

## 30. Top 10 Highest-Impact Changes

1. 把询盘“草稿→真实发送→确认收件”做成可验证闭环；未完成前明确标示现状。
2. 给 `/products/` 首屏加“按图纸的零件示例”与筛选导向。
3. 为 35 个零件页建立独特几何/材料/验收摘要，优先处理 broad service 与 casting 重叠组。
4. 将过程研究与指南链接回**相似但不冒充同一项目**的具体零件页。
5. 将菜单整理成 5 组采购任务路径，Quality/Factory/Process Studies 合为信任组。
6. 建声明及图片来源台账，逐项审核参考值、AI 示意与企业文件状态。
7. 争取可公开的真实设备范围、量具/校准和脱敏检验记录。
8. 让 About 先回答“公司/工厂/能力/证据”，再呈现团队活动。
9. 给 RFQ/交期/MOQ/包装/Incoterm/回复说明建立经公司确认的商务口径。
10. 发布时真实域复核 301/robots/sitemap/canonical/GSC，不把本地通过当线上表现。

**外部规范来源：**[Google AI features](https://developers.google.com/search/docs/appearance/ai-features)、[Google link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)、[structured data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)、[2026 FAQ/llms.txt 文档更新](https://developers.google.com/search/updates)。其他业务判断基于本地页面与原始资料；无搜索量、转化率或线上收录承诺。
