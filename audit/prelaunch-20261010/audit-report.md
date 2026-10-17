# LZZ 当前整站上线前独立审计 · 2026-10-10

**当前站能帮助海外首次采购商识别工艺、了解定制业务并准备询价；还不能仅凭站内完成尺寸/精度适配、有效资质和商业条件的供应商预审。暂未发现已验证 P0。优先补采购证据与信息顺序，现有品牌、技术栈和 URL 无需重做。**

本轮只审计，未修改业务源码、部署或真实发送询价。实际项目是 `D:\lzz\lzz\_react`；浏览器实测对象是开发服务 `http://127.0.0.1:4323/`，不是用户打开的设计探索页。生产结论来自本轮 `npm run build` 的 `dist` HTML，未启动生产预览、未验证正式部署。完整范围与截图见 [coverage.md](D:/lzz/lzz/_react/audit/prelaunch-20261010/coverage.md)，逐页技术结果见 [technical-report.md](D:/lzz/lzz/_react/audit/prelaunch-20261010/technical/technical-report.md)。未读取历史设计讨论、评分、记忆或历史报告。

## 商业与采购判断

站内展示的是 Hangzhou Lizhizao Precision Machinery Co., Ltd. / LZZ 的按图定制 CNC 加工，提供原型、小批量及重复订单；目录零件是形状/工艺参考，并非库存 SKU。五个核心系列是铣削、车削、五轴、工程塑料加工、铸件毛坯后加工。铸件页面没有把服务扩大为自有铸造。网站以英语服务海外工程与采购团队；亚洲、北美、欧洲来自公司介绍，具体国家优先级未验证。目标采购角色是根据图纸采购机械接口、外壳、仪器/自动化零件及汽车原型的工程师与采购人员，这是依据现有内容的判断。

| 首次采购需求 | 当前判断 |
|---|---|
| 快速选型 | 能选工艺与几何类别；不能自行确认零件包络、实际精度与验收表现。 |
| 获取判断信息 | 材料选项、图纸要求、MOQ、交期条件齐全；缺数值能力范围和实测实例。 |
| 确认供应商 | 公司名、地址、车间/人员/文档档案可查；有效 ISO 与校准证据需另外索取。 |
| 方便询价 | 产品上下文、校验、草稿恢复可用；最终邮件需客户发送，网站不确认收件。 |

## 五个最影响客户判断、信任与询价的问题

1. **能做什么讲清楚了，但“我的零件能不能做”缺预审依据。** 五个核心能力页有工艺、装夹和检验讨论；五轴页明确没有公布行程、载荷、最大零件包络。35/35 产品详情虽有完整字段，却没有公开参考尺寸、数值一般公差/标准或实际检验结果；FAQ 的 ±0.01 mm 是经评审的特定特征参考，并非通用保证。采购仍须先发邮件才能淘汰尺寸/精度不适配的供应商。[能力模板](D:/lzz/lzz/_react/src/pages/capabilities/[slug].astro:71)、[FAQ](D:/lzz/lzz/_react/src/pages/resources/faq.astro:16)、[35 页字段证据](D:/lzz/lzz/_react/audit/prelaunch-20261010/technical/product-content-coverage.json)。

2. **目录与详情内容完整，但前段选择信息不平衡。** `/products/` 桌面默认 9 个精选、手机稳定后 6 个，默认没有工程塑料/铜黄铜主题示例；View all 35 和塑料筛选正常。手机详情先显示大标题和零件图，材料/工艺判断需继续滚动。首页把工程塑料放在 Materials，Machining capabilities 只有另外四类，五个核心系列的入口不统一。建议五系列快捷入口与精简决策摘要，而不是堆更多图片。[ProductExplorer](D:/lzz/lzz/_react/src/components/ProductExplorer.tsx:15)、[首页](D:/lzz/lzz/_react/src/components/HomeEditorial.astro:36)、[手机详情截图](D:/lzz/lzz/_react/audit/prelaunch-20261010/products-ultra-high-precision-machining-services-mobile.jpg)。这不是产品缺失或抓取不到：noscript 也有全部 35 个链接。

3. **供应商身份有照片与文件，资格与验收证据仍主要是“可索取”。** About、Quality 和元信息声明 ISO 9001 certified，但当前编号、发证机构、范围、有效期未展示。Quality 明确未发布客户报告或测量结果，当前预览是空白报告结构；校准记录也需索取。公司荣誉和教学牌匾已正确区分，不可替代 ISO 或零件验收证据。[Quality](D:/lzz/lzz/_react/src/pages/quality.astro:52)、[资格区](D:/lzz/lzz/_react/src/pages/quality.astro:69)、[公司文档](D:/lzz/lzz/_react/src/components/CompanyDocuments.astro:10)。结论是“站内没有展示证据”，不是“企业没有该能力/认证”。

4. **询价草稿诚实且可用，但完成发送与订单决策还需补一步。** 实测产品→Quote 的引用、无效邮箱校验、草稿生成/刷新恢复正常；结果明确 “not sent”，最终 mailto 由客户邮件应用处理。未配置邮件应用的客户虽有 Copy/Save 按钮，但缺直接的 webmail 操作提示。公开信息也未说明付款方式/币种、报价响应安排、异常处理时限或补救责任；现有 How We Work 只说明按约定标准评审并协商 corrective action。[QuoteForm](D:/lzz/lzz/_react/src/components/QuoteForm.tsx:139)、[HowWeWork](D:/lzz/lzz/_react/src/components/HowWeWork.astro:75)、[草稿截图](D:/lzz/lzz/_react/audit/prelaunch-20261010/quote-draft-mobile.jpg)。这不是提交失败：当前功能承诺就是准备邮件草稿，实际送达未验证。

5. **首页 RFQ checklist 次级入口实测难以辨认。** 桌面及手机深色 RFQ 面板上，该链接实际前景 `rgb(37,43,45)`、背景 `rgb(25,27,30)`，颜色对比约 1.20:1。共享二级按钮规则用 `color:var(--ink)!important` 覆盖局部白字。其余询价入口可用，因此列 P1 而非 P0。[截图](D:/lzz/lzz/_react/audit/prelaunch-20261010/home-rfq-mobile.jpg)、[局部样式](D:/lzz/lzz/_react/src/components/HomeEditorial.astro:108)、[覆盖规则](D:/lzz/lzz/_react/src/styles/page-system.css:327)。

## 上线前最值得改的五个页面/模块

以下 URL 均基于 `http://127.0.0.1:4323`；推荐英文标题/短文案不添加未经核实的能力数字。

### 1. 五个核心 Capabilities + Factory equipment

URL：`/capabilities/cnc-milling-service/`、`/capabilities/cnc-turning-service/`、`/capabilities/5-axis-cnc-machining/`、`/capabilities/plastic-machined-parts/`、`/capabilities/casting-machining/`；设备依据落在 `/factory/#equipment`。源码：[能力模板](D:/lzz/lzz/_react/src/pages/capabilities/[slug].astro:71)、[工艺数据](D:/lzz/lzz/_react/src/data/capabilityContent.ts:1)、[Factory](D:/lzz/lzz/_react/src/pages/factory.astro:20)。

- **好的部分：** 工艺适用形状、图纸/验收问题、原车间素材、相关零件和上下文 RFQ 已衔接；铸件与功能测试边界明确。
- **增/改/合并：** 在现有范围区增加经核实的能力表；合并重复的 drawing/size 提示到表下注释，保留深入装夹说明。顺序：适用几何→能力范围→实例→检验/责任→RFQ，不删现有有效工艺说明。
- **标题/短文案：** `Can we machine your part?` / `Start with the part envelope, material and critical features. We confirm the machining route after drawing review.`
- **需要真实资料：** 设备型号、行程与实际可装夹尺寸（两者分列）、车削直径/长度、五轴载荷/包络、材料及精度条件、检测范围；铸件毛坯来源、外协表面处理和特殊测试责任。
- **内链/询价：** 保留系列→实例→Quality/Factory；能力表旁保留现有带系列引用的 RFQ。
- **验收：** 五系列均能回答“尺寸/材料/关键特征是否进入评审范围”，数字有日期和来源，设备行程不伪装成保证加工尺寸。

### 2. Custom Parts 总览与详情模板

URL：`/products/` 及 35 个现有详情；代表 `/products/ultra-high-precision-machining-services/`。源码：[目录](D:/lzz/lzz/_react/src/components/ProductExplorer.tsx:15)、[详情](D:/lzz/lzz/_react/src/pages/products/[slug].astro:65)、[决策数据](D:/lzz/lzz/_react/src/data/productDecisions.ts:1)。

- **好的部分：** 35/35 材料/工艺/表面处理/图纸要求齐全；筛选、空结果重置、相关零件和产品引用正常；按图定制声明清楚。
- **增/改/合并：** 增五系列快捷入口，调整精选覆盖；在图片前后紧邻位置加入三行“典型几何 / 材料选项 / 需确认的关键特征”。把重复免责声明合并为一条素材/规格说明，保留生成示意标签。逐系列补 1 个匿名实测实例，不要求每个示例都公开客户图纸。
- **标题/短文案：** `Part fit at a glance` / `Use this example to compare geometry. Your approved drawing defines the dimensions, material and inspection requirements.` 顺序：标题+摘要→简短决策表→图→制造选项→实例证据→图纸/检验→相关零件/RFQ。
- **需要真实资料：** 可公开尺寸与特征、材质证明、匿名测量结果及图片来源授权。33 个 cutout 路径不能都称原始实拍；另外 2 个生成主图已披露；源码登记的 3 个 CAD 项需核对实际图并显示适当性质说明。[素材标记](D:/lzz/lzz/_react/src/data/refinedImages.ts:4)。
- **内链/询价：** 快捷入口沿用现有系列 URL；详情保留产品上下文 RFQ，实测实例连到 Quality 的验收说明。
- **验收：** 桌面/手机默认入口均能发现五系列，手机在大图前后就能读到三条选择事实；所有照片/示意性质与真实资料一致，35 页字段和引用仍完整。

### 3. Quality 的 Supplier qualification 与检验实证

URL：`/quality/#quality-management`、`/quality/#order-documentation`、`/about/#documents`。源码：[Quality](D:/lzz/lzz/_react/src/pages/quality.astro:40)、[CompanyDocuments](D:/lzz/lzz/_react/src/components/CompanyDocuments.astro:10)。

- **好的部分：** 质量体系、零件验收、公司荣誉已区分；按图纸版本/特征/方法定义报告，未伪造测试结果。
- **增/改/合并：** 资格区增加当前证书信息及可查副本；空白 report preview 保留并标为格式示例，再增加单独的匿名已测报告。About 继续展示原文件，避免重复摆同一证书，链接到 Quality。
- **标题/短文案：** `Supplier qualification` / `Check the current certificate, covered site and scope. Agree the inspection records required for your order.` 顺序：资格信息→检验能力/校准日期→匿名报告→订单需约定的文件→索取/RFQ。
- **需要真实资料：** 当前 ISO 副本、编号/机构/范围/有效期/验证方式；经授权脱敏的 part/revision/feature/limit/result/method 报告；对应仪器范围、校准日期和证据。无资料时保留 request，不补虚构编号。
- **内链/询价：** 能力/产品→Quality；证书索取与项目检验询价分开，报告旁连订单文件区。
- **验收：** “ISO certified” 可追到当前有效资料；实测记录与空白模板明显区分，示例不被当成所有订单保证。

### 4. Quote 与 How We Work 的发送/商业信息

URL：`/quote/`、`/resources/how-we-work/#quotation-scope`。源码：[QuoteForm](D:/lzz/lzz/_react/src/components/QuoteForm.tsx:139)、[Quote](D:/lzz/lzz/_react/src/pages/quote.astro:23)、[HowWeWork](D:/lzz/lzz/_react/src/components/HowWeWork.astro:50)。

- **好的部分：** 不误报发送成功；上下文、邮箱校验、可选字段、恢复/清除、附件边界清楚；MOQ 与交期条件一致。
- **增/改/合并：** 草稿结果增加 webmail 提示和显眼的收件邮箱；增加企业确认过的响应安排及简短商业 FAQ，订单条件详述集中在 How We Work，Quote 仅链接。保留当前三步流程，不在本审计中改发送架构。
- **标题/短文案：** `Send your RFQ` / `Using webmail? Copy the draft to a new email, add your drawing and send it to roger@lzz-cnc.com.` 顺序：上下文→资料→草稿检查→邮件应用/webmail两条发送方法→回应与订单条件。
- **需要真实资料：** 工作时段/报价响应政策、付款方式/币种/预付款条件、报价有效期、异常举证/反馈时限及补救原则。未经确认不写“24h quote”、退款或免费重做承诺。
- **内链/询价：** Quote→RFQ checklist/商业 FAQ/Quality；How We Work→带主题的项目询价。
- **验收：** 无邮件应用的客户也知道如何发送；准备草稿与 LZZ 已收件不混淆；公布政策与报价合同一致。实际送达仍须另做授权测试。

### 5. 首页的能力/例件摘要与 RFQ 面板

URL：`/#capabilities` 及首页末段 RFQ。源码：[HomeEditorial](D:/lzz/lzz/_react/src/components/HomeEditorial.astro:31)、[共享二级动作样式](D:/lzz/lzz/_react/src/styles/page-system.css:327)。

- **好的部分：** 工业场景、零件、车间、检验、加工研究都有呈现，红色主动作明确；无需增加泛化品牌宣言。
- **增/改/合并：** 五核心系列采用一致入口；将一条已核实能力/检验依据放在相关图区旁，减少仅重复“待约定”的短句。为深色面板次级链接设明确浅色文字/边框及 hover/focus 状态。保留素材披露，不为首页新增证书数字。
- **标题/短文案：** `Find a machining route` / `Compare milling, turning, 5-axis, engineering plastics and casting machining, then share your drawing for review.` 顺序：业务定位→五系列→实例→公司/检验依据→加工研究→RFQ。
- **需要真实资料：** 前三模块批准的能力及证据摘要；修链接颜色和入口不依赖新企业资料。
- **内链/询价：** 五入口→现有系列；证据→Quality/Factory；末段同时可见 RFQ 与 checklist。
- **验收：** 手机和桌面可快速发现五系列，深色区二级链接正常/悬停/键盘焦点均清晰；主次动作不争抢。

## 12 个真实采购问题：只用当前可访问站内容回答

“可”表示能回答当前业务政策/流程，不代表本轮验证企业实际履约；“部分”表示边界可知但项目或实证缺失。

| 客户问题 | 能否回答 | URL | 当前依据/可回答内容 | 缺失 | 补充位置 |
|---|---|---|---|---|---|
| 这些零件可直接买库存，还是按我的图纸做？ | 可 | `/products/` | Made to drawing，not sold from stock；图仅为参考 | 无库存采购歧义 | 保留总览/详情说明 |
| 我应选铣削、车削、五轴、塑料还是铸件后加工？ | 可初选 | `/capabilities/`、`/resources/cnc-process-selection/` | 形状/旋转轴/复杂面/材料与装夹条件比较 | 项目最终工艺仍需图纸评审 | 五系列页能力表 |
| 我的外形尺寸、重量与装夹条件是否在设备能力内？ | 不可 | `/capabilities/5-axis-cnc-machining/`、`/factory/#equipment` | 列设备家族，要求提交模型/尺寸/重量；明确包络未公开 | 行程、有效装夹范围、载荷等 | Factory+五系列 |
| 能否保证我的关键公差，有没有零件尺寸和实测报告？ | 部分 | `/resources/faq/`、`/quality/`、产品详情 | ±0.01 mm 仅特定特征评审参考；有检验要求和空白格式 | 数值实例/结果/测量范围；35 页无参考尺寸 | Quality+代表详情 |
| 材料牌号、状态和表面处理有哪些？哪些是现成或外协？ | 部分 | `/resources/material-and-finish-checklist/`、产品详情 | 列牌号选项，要求明确状态/标准/遮蔽/后处理尺寸 | 当前可用性、各处理的内外协与责任矩阵 | 系列范围+Factory |
| 铸件毛坯谁供，报价是否包含铸造？ | 部分 | `/capabilities/casting-machining/` | 明确这是毛坯后加工；毛坯/材质/余量/责任需约定 | 默认供货路径、采购责任、单独检验 | 铸件页范围表 |
| 最小订量和交期是多少？能否按到货日排计划？ | 可有条件 | `/resources/faq/`、`/quote/` | 1 件起；图纸及订单确认后 7–14 工作日含处理，运输另计 | 具体订单产能及到货承诺需报价 | 保留条件+Quote |
| LZZ 的当前 ISO 证书与供应商主体能核验吗？ | 部分 | `/about/`、`/quality/#quality-management` | 主体、地点、工厂原照片可查，称 ISO certified；文档索取入口 | 当前证书元数据/副本/核验方式 | Quality资格区 |
| 报价多久回复、怎样付款、有不合格品如何处理？ | 部分 | `/resources/how-we-work/`、`/contact/` | UTC+8、报价范围；提供批次/图纸/测量后按标准评审协商 | 响应政策、付款/币种、处理时限与补救原则 | How We Work商业FAQ |
| 能送到海外吗，贸易条款、包装和随货文件是什么？ | 可有条件 | `/resources/custom-cnc-parts-shipping-checklist/` | EXW/FOB/DDP按目的地评审；保护包装、发票/装箱单；材料/检验文件须约定 | 项目运费、税费责任、文件包含/额外费用需报价 | 配送清单+报价范围 |
| 发图前可谈 NDA 吗？要准备什么格式和版本？ | 可 | `/resources/rfq-checklist/`、`/resources/how-we-work/` | 敏感文件前协商保密；STEP/2D、版本、单位、材料、关键尺寸、数量/目的地 | 自动签NDA/安全上传并非现有服务 | 保留指南，Quote显眼链接 |
| 点击 Prepare 后 LZZ 收到询价了吗？没有邮件应用怎么办？ | 可知边界，完成不便 | `/quote/`、`/privacy/`、`/resources/faq/` | 本地草稿未发送；客户自行附图发邮件；Copy/Save可见 | webmail说明、真实收件/回复证据 | Quote结果区+回应政策 |

## 不超过 10 项实施任务

**P0：暂未发现已验证的阻断问题。** 以下为建议，本轮不实施。优先次序按采购影响排列；直接小修可与资料收集并行。

| 优先级 | 位置与操作 | 所需资料 | 完成标准 |
|---|---|---|---|
| P1 | 五系列能力模板+Factory：补带条件的尺寸/精度/检测范围 | 当前设备/能力清单及评审确认 | 五系列可预审适配，数值有来源，保留项目条件 |
| P1 | Quality+About：公开可核验当前ISO信息 | 当前副本/编号/机构/范围/有效期 | certified声明可追到有效资料，荣誉不冒充ISO |
| P1 | Quality+代表详情：加匿名已测实例，核对照片/CAD/示意说明 | 授权资料、尺寸/结果/方法/素材来源 | 至少有与零件对应的实证，模板与结果不混淆 |
| P1 | ProductExplorer+详情：首页/目录五系列入口与三条决策摘要 | 可用现有数据，新增数字另审 | 默认入口覆盖五系列；35产品/引用完整；手机便于判断 |
| P1 | QuoteForm+HowWeWork：webmail提示与响应/商业FAQ | 企业确认政策；webmail提示无需新资料 | 草稿→发送方法清晰；付款/异常规则与合同一致 |
| P1 | HomeEditorial+page-system：修深色RFQ次级链接 | 无 | 桌面/手机及hover/focus可读，checklist入口可用 |
| P1（上线前） | 正式发布包/verify-seo：处理4个内部noindex预览缺description；不是P0主站索引阻断 | 发布范围决定 | 既有test:seo通过，探索页仍不作为主站内容 |
| P2 | Resources hub/knowledgeCenter：补Drawings & Ordering分类入口 | 无 | `/resources/drawings-and-ordering/` 至少有可索引页入链 |
| P1（部署后） | 正式/候选域名技术与询价验收 | 托管配置、授权测试、Search Console | 真实状态/跳转/索引边界和邮件收件分别取证 |

## 构建、SEO/GEO 与上线判断

**本次本地生产构建：** `npm run build` exit 0；94 HTML，其中81可索引页，sitemap81 URLs、93条重定向规则。81/81 有唯一非空 title/description/H1、自引用正式 canonical、可解析 JSON-LD及构建时正文；未发现 HTML 断链或失效锚点。35产品及10能力页共45个上下文询价引用正确。`test:seo` exit 1：4个内部 noindex 设计预览缺description，不能说检查全过，也不是主站索引缺失。[build.log](D:/lzz/lzz/_react/audit/prelaunch-20261010/technical/build.log)、[test-seo.log](D:/lzz/lzz/_react/audit/prelaunch-20261010/technical/test-seo.log)。

另发现 `/resources/drawings-and-ordering/` 没有其他可索引页入链；在sitemap里并不等于访客有入口。结构化数据未编造价格、库存、评分。当前文字可回答业务/图纸/交期问题，但 schema 无法弥补能力与检验实证缺口。Google的AI搜索功能沿用常规SEO、无需AI专用schema；本轮不宣称收录、富结果或AI引用已成立。[Google AI features](https://developers.google.com/search/docs/appearance/ai-features)、[structured data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)。

| 阶段 | 上线判断/边界 |
|---|---|
| 可直接修 | RFQ对比度、五系列入口、手机决策摘要、webmail提示、Resources入链、发布检查元信息；不依赖改栈/改URL。 |
| 等企业资料 | 数值能力、当前ISO、匿名测量/校准证据、毛坯/外协责任、响应/付款/异常政策。资料不足时继续明确“待评审/可索取”，不造数字或承诺。 |
| 部署后验证 | DNS/TLS、HTTP与www跳转、真实301/未知路径404、robots/sitemap、正式/候选域名X-Robots-Tag与canonical、Google URL Inspection。noindex需可抓取才能读取。[Google noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing) |
| 真实询价 | 未点击Open email app，未发送/上传；Copy/Save仅观察按钮未实测。真实发送、邮箱收件与回复需另一次授权验收，不能以草稿成功代替。 |

本地已具备询价型展示站的基本结构与功能；建议先完成直接修项并取得关键采购证据，再做部署验收。当前不能给“已上线验收通过”的结论。
