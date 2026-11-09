# Resources 表达与 SEO / GEO 内容优化

完成日期：2026-11-01。范围：二十篇正式英文指南，包括十四篇 Technical guides 和六篇 RFQ & ordering。公司新闻、产品参数、原始图片、公开 URL 与询价接口不在本轮重构范围内。状态：本地完成，未推送 GitHub 或部署 Cloudflare。

入口：[Technical guides](http://127.0.0.1:8788/resources/technical-guides/) · [RFQ & ordering](http://127.0.0.1:8788/resources/ordering/)

## 发现与实际修改

选题已经覆盖具体产品问题。表达上的主要问题是重复要求读者 Define / Specify / Agree、反复说明图片不能证明什么，以及用抽象的“提供评审起点”代替解释零件。部分基础文章与新专题只有目录关系，五篇较短的采购指南也缺少可帮助判断的具体情境。

本轮按 Humanizer 复核句子和段落，用 blog-audit 检查栏目、搜索意图、标题、链接和结构化信息。十篇产品指南增加了具体技术解释，采购指南增加真实任务中的比较情境；全库净扩充约三千英文词。十篇产品指南正文约 1,200–1,400 词，短清单保留适合完成任务的篇幅。

| 原表达或结构 | 修改后的重点 |
|---|---|
| “The reference does not assign a load capacity…” 等反复的图片边界提醒 | 直接解释定位销的安装位置、伸出量、实际啮合和回缩，再在功能要求处保留承载与测试边界 |
| “provides a useful starting point…” | 说明铸造壳体的中心孔、周围壁厚和加工余量怎样相互影响 |
| 铝壳只提示检查壁厚和内圆角 | 增加 6 mm 刀具与 R3 的几何例子、深度与刀具伸出关系；例子不作为通用制造极限 |
| 塑料件要求约定温度，缺少量纲关系 | 增加自由、近似均温条件下的线性热变形估算，明确牌号、温区、约束和吸湿等边界 |
| 一体或分体歧管只作简短介绍 | 增加刀具进入、流道对齐、密封连接和检验阶段的结构对照 |
| 报价比较停留在清单 | 增加是否包含阳极氧化与最终孔检验、首单与重复批次费用两个明确情境 |

保留了正确的技术区别：尺寸与位置、圆跳动与全跳动、螺纹量规检验与泄漏测试、几何检验与平衡/性能测试、弹簧力与机构承载。没有为了“去 AI 化”删除这些条件，也没有添加客户故事、测试结果或数字收益。

## 每篇的搜索意图与扩充

目标查询由实际内容及当前有界搜索判断，属于编辑定位；没有搜索量、排名或 Search Console 成效数据。完整定位与主题边界保存在 `RESOURCE-SEARCH-INTENT-20261101.json`。

| 文章 | 主要目标查询 | 正文词数（前 → 后） |
|---|---|---:|
| [What affects CNC machining cost?](http://127.0.0.1:8788/resources/ordering/cnc-machining-cost-factors/) | CNC machining cost factors | 1835 → 1873 |
| [CNC machining RFQ checklist](http://127.0.0.1:8788/resources/ordering/rfq-checklist/) | CNC machining RFQ checklist | 360 → 491 |
| [Compare CNC machining quotations](http://127.0.0.1:8788/resources/ordering/compare-cnc-machining-quotations/) | compare CNC machining quotes | 263 → 451 |
| [Machined prototype approval](http://127.0.0.1:8788/resources/ordering/machined-prototype-approval-checklist/) | CNC machined prototype approval checklist | 297 → 500 |
| [From the first sample to repeat production](http://127.0.0.1:8788/resources/ordering/prototype-vs-small-batch-cnc/) | CNC prototype to small batch production | 359 → 494 |
| [Plan the shipment of CNC parts](http://127.0.0.1:8788/resources/ordering/custom-cnc-parts-shipping-checklist/) | CNC parts international shipping checklist | 241 → 419 |
| [CNC drawings & critical features](http://127.0.0.1:8788/resources/technical-guides/critical-features-cnc-drawing/) | CNC drawing requirements | 1884 → 1957 |
| [6061 vs 7075 aluminum for CNC parts](http://127.0.0.1:8788/resources/technical-guides/6061-vs-7075-cnc-aluminum/) | 6061 vs 7075 aluminum CNC machining | 1419 → 1501 |
| [Choose the CNC machining route](http://127.0.0.1:8788/resources/technical-guides/cnc-process-selection/) | CNC milling vs turning vs 5 axis | 1691 → 1756 |
| [Material & finish for CNC parts](http://127.0.0.1:8788/resources/technical-guides/material-and-finish-checklist/) | CNC material and surface finish specification | 2047 → 2115 |
| [Designing Aluminum Enclosures for CNC Machining](http://127.0.0.1:8788/resources/technical-guides/designing-aluminum-enclosures-for-cnc-machining/) | CNC aluminum enclosure design | 1140 → 1311 |
| [Datums and Hole Position on Circular Machined Parts](http://127.0.0.1:8788/resources/technical-guides/datums-and-hole-position-on-circular-machined-parts/) | circular part hole position tolerance | 1110 → 1328 |
| [How to Specify Fits and Runout on Turned Parts](http://127.0.0.1:8788/resources/technical-guides/how-to-specify-fits-and-runout-on-turned-parts/) | shaft fit and runout tolerance | 1102 → 1323 |
| [Choosing Thread and Seal Requirements for Machined Fittings](http://127.0.0.1:8788/resources/technical-guides/choosing-thread-and-seal-requirements-for-machined-fittings/) | machined fitting thread and seal requirements | 1073 → 1237 |
| [What to Check Before Machining a Cast Housing](http://127.0.0.1:8788/resources/technical-guides/what-to-check-before-machining-a-cast-housing/) | cast housing machining allowance | 1190 → 1405 |
| [Why Machined Plastic Parts Need Defined Measurement Conditions](http://127.0.0.1:8788/resources/technical-guides/why-machined-plastic-parts-need-defined-measurement-conditions/) | machined plastic part tolerances | 1090 → 1287 |
| [Preparing an Impeller Model for 5-Axis Machining](http://127.0.0.1:8788/resources/technical-guides/preparing-an-impeller-model-for-5-axis-machining/) | 5 axis impeller machining | 1097 → 1281 |
| [Which Aluminum Features Need Masking Before Anodizing?](http://127.0.0.1:8788/resources/technical-guides/which-aluminum-features-need-masking-before-anodizing/) | anodizing masking bores and threads | 1129 → 1216 |
| [Specifying a Billet Intake Manifold for Machining](http://127.0.0.1:8788/resources/technical-guides/specifying-a-billet-intake-manifold-for-machining/) | billet intake manifold machining | 1070 → 1263 |
| [What Matters When Ordering a Custom Indexing Plunger](http://127.0.0.1:8788/resources/technical-guides/what-matters-when-ordering-a-custom-indexing-plunger/) | custom indexing plunger specification | 1111 → 1294 |

主要扩充包括 PCD 与孔组角向位置、轴承座配合、NPT/BSPT/BSPP 连接识别、铸件芯偏与余量、塑料尺寸的测量状态、叶轮定轴与连续五轴路径、阳极氧化后的孔加工、分体歧管的连接，以及定位销的行程与啮合。

## 内链与主题边界

十篇产品文章现在各有其他指南正文中的自然入口。基础文章提供通用解释，再连到具体零件；产品文章把必要的图纸、材料和工艺问题接回基础指南。删除工艺选择文章中三条与该节正文重复的独立跳转，保留有用途的正文与图片入口。

- 图纸指南负责通用标注和检验关系；圆形件与车削件分别处理孔组和轴线接口。
- 材料/表面处理指南负责共通规格；遮蔽篇深入阳极氧化的局部边界和最终孔尺寸。
- 工艺选择指南比较路线；叶轮篇处理叶片之间的完整刀具组件、叶根和曲面可达性。
- 6061/7075 篇负责选材；铝壳篇负责壁、腔、安装和闭合接口。
- 成本篇解释工作量；报价比较篇检查两个报价是否覆盖相同工作。
- 样件验收篇记录被评估的配置；重复生产篇把批准条件带入独立的批次放行。

这些是内容意图的区分，未根据词语重合自动合并页面或新增重定向。正式 URL 数量仍为九十六。

## SEO 与 GEO 的具体接入

二十篇都有独立的搜索标题、描述和可见 H1。针对部分较泛的标题，改成图纸要求、报价比较、样件检查、铸件加工余量、塑料公差、叶轮 CAD/刀具进入及定位销行程等准确主题。H1 与原 URL 保持，搜索标题负责概括页面实际内容。

所有指南显示 LZZ Precision 企业署名及实际更新日期。未编造人员姓名、履历或审核过程；旧文章原始发布日期未知时不补造。Article 使用稳定标识，明确语言、栏目、页面关系及与首屏对应的图片。来源字段只取正文已有的外部链接，检查了结构化引用和可见内容的一致性。

Google 的 [AI features 指南](https://developers.google.com/search/docs/appearance/ai-features)延续常规搜索要求，强调可抓取、可发现的正文及与内容一致的结构化数据；没有要求专用 AI 文件或特殊标记。本轮据此改善具体问题的完整回答、出处与内部发现路径。[Article 文档](https://developers.google.com/search/docs/appearance/structured-data/article)允许使用实际组织作为作者，这里继续使用已存在的 LZZ 企业实体。

本轮没有增加隐藏关键词、虚构 FAQ、特殊“AI 引用”标记或无依据的作者资质。没有用固定的关键词密度、来源数量、段落长度或 AI 分数替代实际阅读。

## 技术资料的核对

保留原有材料、图纸与工艺来源。新增或扩展的解释核对了以下一手资料，并在相应段落保留可追溯入口：

| 资料 | 本轮使用范围 |
|---|---|
| [Sandvik Coromant：Milling inside corners](https://www.sandvik.coromant.com/en-gb/knowledge/milling/milling-inside-corners) | 内圆角处的刀具啮合；R3 与刀具直径的例子另按基础几何说明 |
| [MCG：Dimensional stability](https://www.mcam.com/en/support/material-properties/dimensional-stability) | 热、吸湿与应力对塑料尺寸的影响；不赋予未知牌号统一系数或公差 |
| [SKF：Rolling bearings catalogue](https://cdn.skfmediahub.skf.com/api/public/0901d196802809de/pdf_preview_medium/Rolling_bearings_-_17000_1_EN_pdf_preview_medium.pdf) | 轴承配合需要考虑载荷/转动、温度和座的结构；未复制推荐配合或计算承载值 |
| [Swagelok：Thread identification guide](https://socal.swagelok.com/en/resources/downloads/guides/swagelok-thread-and-end-connection-identification-guide) | 完整连接识别，保留螺纹与密封要求的区别 |
| [NASA/JSC PRC-5006](https://www.nasa.gov/wp-content/uploads/2023/03/prc-5006-current.pdf) | 处理后尺寸、局部孔与防护要求；不暗示 LZZ 执行该特定项目规范或取得相应资格 |
| [Ganter GN 413](https://www.ganternorm.com/en/products/3.1-Indexing-locking-blocking-with-pins-and-ball-shaped-elements/Indexing-plungers/GN-413-Indexing-plungers-Steel) | 有无缩回保持位置的功能区别；未套用其额定值 |
| [ICC Incoterms 2020 checklist](https://library.iccwbo.org/content/clp/Others/incoterms_2020_checklist_2024-update.pdf) | 运输报价中交付条款、指定地点和进口责任的比较；实际供货仍以接受的报价为准 |

SKF 的公开目录约 23 MB，浏览工具无法一次打开全文；本轮核对了同一官方目录的搜索索引章节正文，未声称通读整本目录。ICC PDF、Sandvik 与 MCG 的相关正文已直接查看。没有把搜索结果中的其他厂家数值、材料库存或能力移植给 LZZ。

## 验收与保留项

二十页分别在 CSS 视口 1440px、390px 检查，共四十个页面视图。实际滚动后图片均加载，未发现横向溢出。手机上新增的目录项能展开、跳转后收起，目标章节未被导航遮挡；公式和两种技术表格均能阅读。

报价比较页的主入口正确进入原询价表单，保留文章主题与来源。只检查了页面及上下文，没有发送测试询价。主入口统一为 Request a quote，表单提交按钮仍为 Send inquiry。

| 验收项目 | 结果 |
|---|---|
| `npm run check` | 0 errors、0 warnings，9 个既有提示 |
| `npm run build` | 通过，完成页面、CSS 和 SEO 后处理 |
| `npm run test:site` | 通过，96 个正式路由、9,419 个本地引用、690 个章节引用 |
| `npm run test:seo` | 通过，226 个构建 HTML、96 个 sitemap URL、188 条重定向 |
| `npm run test:inquiry` | 上下文、必填项、附件边界、传输结果及构建表单通过 |
| 内容与元数据专项 | 二十篇独立标题/描述、原 H1、实际日期、Article/Breadcrumb 和可见引用一致 |
| 内容保留 | 二十篇原有锚点、二十六张既有表格保留；新增一张歧管结构对照表 |
| 文件保护 | 原路由表、询价代码、教学例子数据/图形、十张产品技术图及摄影注册表 SHA-256 与本轮前版一致 |

使用通用博客扫描器时发现其 HTML 解析不能正确识别此项目的标题层级，且可选的 textstat 未安装。其原始输出只留作诊断记录，没有用于判断网站缺少 H1、作者真实性或“AI率”。验收依据为构建 HTML 的 DOM 检查、原始数据比较及实际浏览器。

当前结果证明本地内容与技术检查通过。尚无本轮发布后的真实查询、收录、排名、转化或 AI 引用数据，也没有进行线上 Core Web Vitals 测量。发布后可按目标查询与落地页观察 Search Console 展现、点击和询价，再决定下一轮扩充或主题调整。

## 文件与回退

本轮记录：`D:/lzz/项目记录/博客内容SEO-GEO优化-20261101/`。

- `before/src/`、`before/DESIGN.md`、`before/CONTENT-WRITING.md`：进入本轮时的工作副本，保留此前所有用户改动。
- `git-status-before.txt`、`audit-input/`：起始工作区状态和二十篇原构建内容。
- `content-seo-audit.json`、`audit-resource-guides.mjs`：正文、表格、锚点、元数据、内链与保护文件的可复现核对。
- `browser-checks.json`、`reading-index-check.json`、`quote-context-check.json`：视口和交互记录。
- `shots/<slug>-1440.jpg`、`shots/<slug>-390.jpg`：二十篇完整截图。
- `check.log`、`build.log`、`test-site.log`、`test-seo.log`、`test-inquiry.log`：本地验证输出。
- `RESOURCE-SEARCH-INTENT-20261101.json`：位于项目 docs 的二十篇关键词与意图边界登记。

回退应按本轮前版恢复任务涉及的源文件，不能直接 reset 整个工作区。历史交付记录保留其当时状态，本文件描述本轮内容优化后的本地结果。
