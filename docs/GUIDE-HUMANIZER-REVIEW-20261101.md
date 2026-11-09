# 指南 Humanizer 与长尾搜索表达终审

日期：2026-11-01。范围为 14 篇 Technical guides 与 6 篇 RFQ & ordering 指南；新闻和服务正文不在本次编辑范围内。沿用当前 Penta 设计和现有媒体。仅本地实施，未推送 GitHub、Cloudflare 或生产环境。

## 结果与判断

20 篇已逐篇通读，19 篇调整，运输清单保留原文。剩余问题主要是普通章节连续设问、重复采购指令、讲述表格或文档本身，以及多处解释同一个验收区别。没有依据词频推定作者身份，也没有使用 AI 检测百分比。

16 个疑问式 H2/H3 改为说明式标题，正文疑问式小标题由 36 个降至 20 个。保留的问句用于真正的 FAQ 或具体技术问题，例如 STEP 模型能否发起询价、R3 内角与刀具半径的关系。标题中的已确认 H1 保持。这个数量是本次结果，不是日后的配额。

改写后出现 41 个新的或合并后的段落文本，删除或合并了重复说明。按同一主正文提取方法计数，总词数从 24502 降为 24185，减少 317 词；十篇产品指南仍约 1,204–1,377 词。没有为了篇幅再扩写。

## 具体处理

- 成本指南将普通章节的提问改成报价构成、样件／批量准备费用、装夹定位及检验成本；保留末尾四个真实价格问题。
- 材料与表面处理指南直接说明尺寸变化、遮蔽区域和文件类别，避免每个章节都先提问再回答。镀层厚度与外生长的数值示例、适用条件和原始表格完整保留。
- RFQ 的 STEP 问答先回答可以开始讨论，再列出详细报价仍需明确的资料；不暗示模型包含未标注的材料、公差或最终表面要求。
- 定位销指南把重复的力值与工作位置说明集中到行程章节；保留弹簧返回力与总成承载能力的实际区别、检查责任及表格。
- 铸件、塑料、圆盘、叶轮及歧管指南减少“该例很有帮助”“本表分别介绍”等自述，直接解释余量、支撑、基准、通道可达性和供货范围。
- 对已自然、具体的运输清单保留原文；不为修改覆盖率重写。

## SEO 与 GEO 核对

20 个页面继续分别承担自己的搜索任务。基础指南解释通用规则，产品指南解释具体接口和制造条件，采购指南服务询价、比较和放行；没有新增互相竞争的文章。既有关键词意图表仍有效，目标词来自编辑定位，不是搜索量、排名或 Search Console 数据。

长尾词通过问题对象及其解释保留，例如 aluminum enclosure wall thickness、cast housing machining allowance、plastic bore thermal expansion、anodizing masking bores and threads、indexing plunger stroke and projection。去掉疑问句后，相应的技术对象、条件和回答仍在章节内；没有反复插入完整词组或为所谓密度补字。

已有 SEO 标题和描述逐页比对未变，Article 标题对应可见 H1，企业作者和实际更新日期保持，Breadcrumb 和 WebPage 对 Article 的关联正常。结构化 citation 均可从可见正文找到同一来源链接。来源地址没有增删；本轮没有新增技术参数，也未声称重新逐一审阅所有厂商资料。前轮的技术来源核验记录继续保留。

本轮重读 [Google 的 AI features 文档](https://developers.google.com/search/docs/appearance/ai-features)和 [helpful content 指南](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)。实施侧重可发现的内链、可抓取的正文、清楚的回答和与可见内容一致的结构化数据；没有增加特殊 GEO 文件、隐藏问答、虚构专家或不存在的验证结果。Google 文档明确没有额外的 AI 功能专用技术要求。满足技术与内容条件不保证收录、排名或 AI 引用。

| 指南 | 主搜索意图 | 疑问式小标题 | 本轮状态 |
|---|---|---:|---|
| [What affects CNC machining cost?](/resources/ordering/cnc-machining-cost-factors/) | CNC machining cost factors | 9 → 4 | 已调整 |
| [CNC machining RFQ checklist](/resources/ordering/rfq-checklist/) | CNC machining RFQ checklist | 1 → 1 | 已调整 |
| [Compare CNC machining quotations](/resources/ordering/compare-cnc-machining-quotations/) | compare CNC machining quotes | 0 → 0 | 已调整 |
| [Machined prototype approval](/resources/ordering/machined-prototype-approval-checklist/) | CNC machined prototype approval checklist | 1 → 0 | 已调整 |
| [From the first sample to repeat production](/resources/ordering/prototype-vs-small-batch-cnc/) | CNC prototype to small batch production | 1 → 0 | 已调整 |
| [Plan the shipment of CNC parts](/resources/ordering/custom-cnc-parts-shipping-checklist/) | CNC parts international shipping checklist | 0 → 0 | 核对后保留原文 |
| [CNC drawings & critical features](/resources/technical-guides/critical-features-cnc-drawing/) | CNC drawing requirements | 3 → 3 | 已调整 |
| [6061 vs 7075 aluminum for CNC parts](/resources/technical-guides/6061-vs-7075-cnc-aluminum/) | 6061 vs 7075 aluminum CNC machining | 3 → 3 | 已调整 |
| [Material & finish for CNC parts](/resources/technical-guides/material-and-finish-checklist/) | CNC material and surface finish specification | 10 → 4 | 已调整 |
| [Choose the CNC machining route](/resources/technical-guides/cnc-process-selection/) | CNC milling vs turning vs 5 axis | 5 → 4 | 已调整 |
| [Designing Aluminum Enclosures for CNC Machining](/resources/technical-guides/designing-aluminum-enclosures-for-cnc-machining/) | CNC aluminum enclosure design | 1 → 1 | 已调整 |
| [What to Check Before Machining a Cast Housing](/resources/technical-guides/what-to-check-before-machining-a-cast-housing/) | cast housing machining allowance | 1 → 0 | 已调整 |
| [Why Machined Plastic Parts Need Defined Measurement Conditions](/resources/technical-guides/why-machined-plastic-parts-need-defined-measurement-conditions/) | machined plastic part tolerances | 0 → 0 | 已调整 |
| [Which Aluminum Features Need Masking Before Anodizing?](/resources/technical-guides/which-aluminum-features-need-masking-before-anodizing/) | anodizing masking bores and threads | 0 → 0 | 已调整 |
| [Datums and Hole Position on Circular Machined Parts](/resources/technical-guides/datums-and-hole-position-on-circular-machined-parts/) | circular part hole position tolerance | 0 → 0 | 已调整 |
| [Choosing Thread and Seal Requirements for Machined Fittings](/resources/technical-guides/choosing-thread-and-seal-requirements-for-machined-fittings/) | machined fitting thread and seal requirements | 0 → 0 | 已调整 |
| [Preparing an Impeller Model for 5-Axis Machining](/resources/technical-guides/preparing-an-impeller-model-for-5-axis-machining/) | 5 axis impeller machining | 1 → 0 | 已调整 |
| [Specifying a Billet Intake Manifold for Machining](/resources/technical-guides/specifying-a-billet-intake-manifold-for-machining/) | billet intake manifold machining | 0 → 0 | 已调整 |
| [What Matters When Ordering a Custom Indexing Plunger](/resources/technical-guides/what-matters-when-ordering-a-custom-indexing-plunger/) | custom indexing plunger specification | 0 → 0 | 已调整 |
| [How to Specify Fits and Runout on Turned Parts](/resources/technical-guides/how-to-specify-fits-and-runout-on-turned-parts/) | shaft fit and runout tolerance | 0 → 0 | 已调整 |

## 保留项与回退

静态对照检查通过：20 个 H1、SEO 标题／描述、canonical、原锚点、图片 src／srcset／sizes／alt、全部正文链接目的地及数量、原有 FAQ 问题、行内公式和不同数值集合均保持。27 张技术表格的逐行文字及顺序完全一致。人工复读了全部改写段落，检查其含义和适用条件。

本轮仅改变 16 个 src/data 内容文件。共享组件、样式、图片注册、路由表、询价前后端及教学图表源文件与直接前版一致。完整 src、DESIGN.md 与 CONTENT-WRITING.md 的直接前版在 D:/lzz/项目记录/指南Humanizer终审-20261101/before/；只按本轮文件清单回退，不重置原本已有大量改动的工作区。

## 验收证据

- npm run check：通过，0 errors、0 warnings，9 个已有提示。
- npm run build：通过，157 个 Astro 页面，SEO 输出包含别名共 226 HTML。
- npm run test:site：通过，96 个正式路由、9,419 个本地引用、690 个章节引用。
- npm run test:seo：通过，96 个 sitemap URL 和 188 条重定向；没有据此推断生产主机行为。
- npm run test:inquiry：上下文、必填字段、联系方式、工艺选择、附件约束及返回状态检查通过，没有实际发送询盘。
- 本轮静态内容对照：0 个错误。数字集合检查只用于提示可能的遗漏，表格逐字对照和改写段落人工核对共同保留技术含义。
- 本轮真实浏览器检查：20 页 × 1440px／390px，共 40 次。实际 CSS 宽度均符合请求，无横向溢出、标题越界或缺图。滚动触发非首屏图片后记录状态，截图在 D:/lzz/项目记录/指南Humanizer终审-20261101/shots/。
- 手机目录：选择成本指南章节后收起为 关闭，目标顶部约 220px，导航高度 100px；目标未被导航遮住。浏览器捕获到 0 条 console error。
- 未改图片、布局或脚本；未宣称 Core Web Vitals、访问速度、收录或排名已经改善。

截图和机器可读记录：guide-validation.json、browser-checks.json、toc-check.json、console-errors.json、各检查日志均位于 D:/lzz/项目记录/指南Humanizer终审-20261101/。重点阅读截图为 shots/casting-answer-desktop.jpg 和 shots/cost-heading-mobile.jpg。

## 状态与仍需验证的结果

本地内容、构建及预览验收已完成。没有待补写文章；没有发布。本轮不能确认生产收录、搜索量、排名或 AI 真实引用，后续上线后的表现需用实际 Search Console 和访问数据评估。来源的产品专用范围和真实工程条件仍须在订单中按具体零件确认。
