# 以客户决策为中心的整站内容、导航、可信度与 SEO/GEO 审计

审计日期：2026-09-24  
审计对象：D:\lzz\lzz\_react 当前 Astro 站点；站点主语言为英语  
范围：内容与采购任务、导航和内链、信任声明、SEO/GEO 可访问性、页面呈现和关键询价交互。  
本轮仅研究、取证并给整改方案：没有修改网站业务代码、没有发布，也没有向业务邮箱发送真实询盘。

## 审计边界与方法

### 三种环境分别记录

| 环境 | 2026-09-24 实测 | 审计含义 |
|---|---|---|
| 本地 `http://127.0.0.1:4323/` | 当前 Astro 版返回 200；不存在的测试路径返回 404 | 本报告的内容、模板、交互和视觉结论以此版本为准。 |
| Cloudflare Preview `https://preview.lzz-precision.pages.dev/` | 返回 200，`X-Robots-Tag: noindex`；检查的页面 canonical 指向正式域名 | `noindex` 是 Preview 的环境保护，不等于生产错误；当前 Preview 文案与本地存在差异（如 Custom Parts / Our work），不能替代本地版本验收。 |
| 正式站 `https://www.lzz-cnc.com/` | 仍是旧版站点；首页与 `/product` 返回 200；旧版 canonical 为 `http://`；`robots.txt` 明确 `Disallow: /`；旧 `/product` 原始 HTML 未检出 H1 | 正式站尚未呈现当前 Astro 版，爬虫访问阻断是发布前必须由站点负责人确认的事项。不能把本地构建检查说成正式站已通过。 |

正式站 HTTP 地址会重定向至 HTTPS，但旧页面 canonical 仍声明 HTTP。正式站 sitemap 有 57 个 URL；正式站当前 robots 响应会阻止抓取，因此不能据此推断实际收录情况。Preview 的 noindex 与正式站 robots 是两个不同环境问题。

### 取证覆盖

- 读取项目路由、页面组件、产品/能力/案例/资源数据、内容证据台账、待确认声明、迁移及 Preview 说明；检查 Astro 生产构建输出，而非只从源码推断。
- `npm run build` 通过：生成 64 个 HTML 页面，其中 63 个可索引 URL，另有一个 noindex 404；35 个产品详情、10 个能力入口、3 个过程照片研究、5 个资源/文章。输入源 URL 91 个，生成 86 条迁移重定向；sitemap 为 63 个可索引 URL。
- `npm run check` 通过：68 个文件，0 error / warning / hint。`npm run test:seo` 通过：覆盖 HTML、唯一标题/描述、H1、canonical、JSON-LD 语法、robots、sitemap 与重定向。`TEST_URL=http://127.0.0.1:4323 npm run test:site` 通过：63 条页面路由在 390×844 下无水平溢出、坏图或页面错误，并覆盖产品筛选、能力材料标签、移动导航、产品至询价预填和邮件草稿流程。
- 视觉人工抽查桌面及手机：首页、产品目录和单品、能力详情、Cases/过程研究、Quality、Quote；自动响应式测试覆盖全部可索引页面。没有把自动 DOM 测试当作视觉审查。
- 两个更深层 QA 脚本的失败均对应历史测试预期：图库测试仍期待当前已移除的图片灯箱；导航组织测试仍期待当前已去掉箭头的旧按钮可访问名称。页面链接/功能本身存在，按当前源码与用户既有“去掉放大/箭头”的决策，这两项应更新测试，而非回退页面。
- 没有 Google Search Console、Bing Webmaster Tools、服务器日志、询盘 CRM、转化数据或目标市场关键词数据。本文的英文搜索表达是结合页面和行业采购任务提出的“意图候选”，不是实测关键词、排名、搜索量或客户提问频次。

## A. 客户与业务结论

### 业务定位与适合吸引的人

当前站点最适合承接的是：有自定义零件图纸/3D 模型，正在筛选 CNC 加工供应商的工程、采购与小批量项目团队；典型任务是加工可制造性讨论、样件/原型、短批次或重复小批生产。其次是手上有实物样件、图纸不完整，需要先确认测绘/建模和制造可行性的买家。

这不是根据职位画像套模板得出的：站点内容具体覆盖铣削、车削、五轴、铸件后加工；材料页列出铝、不锈钢、铜/黄铜和工程塑料；Prototype 与 Low-volume 页面承接打样和小批次；RFQ 指南要求图纸、修订、材料、数量和检验要求；首页/页脚将公司描述为杭州的定制 CNC 加工企业。网站自述体现加工供应商/工厂定位，但不等于第三方已审厂或独立核验。尤其“铸件后加工”不能解释为 LZZ 自有铸造能力，现有内容也没有证明有自营铸造厂。

最有价值的不是泛流量，而是已有零件或需求、愿意提供图纸/规格、需先确认能力与商业条件的 OEM/产品开发、机械工程和采购团队。暂不把需要公开认证背书的医疗/航空/汽车量产资质、已验证性能数据，或标准品现货采购作为当前主扩展方向：现有公开证据不足以支撑相关认证/合规承诺。

### 客户需要完成的任务、阻力与应有回答

| 阶段/任务 | 买家真正要判断什么 | 当前可用内容/主要阻力 | 适合的下一步 |
|---|---|---|---|
| 初筛供应商 | 能做哪类零件/材料/工艺？是否做原型和小批量？ | 首页、Capabilities、Products 和导航已覆盖范围；首页首屏仍可更直白地写清铣削/车削/多面加工与主要对象。 | 进入能力目录或真实零件示例。 |
| 评估设计可行性 | 深孔、薄壁、配合、螺纹、铸件基准、后处理会影响什么？ | 能力详情有实用的图纸和检验注意点，但未提供机器行程/重量等设备极限；应继续保持按图评审，不推断最大能力。 | 提交受控图纸/模型并标明关键界面。 |
| 选择材料/表面 | 具体牌号、状态、处理、处理后尺寸是否适用？ | 材料页和 Material & Finish 指南给出选型问题；图片不能证明牌号、涂层或证书。 | 提供牌号/功能条件，进入报价评审。 |
| 评估质量风险 | 公差、量具、检验报告、证书和追溯能否满足要求？ | Quality 解释计划方法与量具类别，明确无 ISO 证书；页面 ±0.005 mm 和内部证据台账尚未对齐，缺少可公开的真实测量记录。 | 明确关键尺寸、基准和所需文件；业务确认现有证据后再承诺。 |
| 评估商业可行性 | MOQ、报价驱动因素、交期、运输、责任条款是什么？ | RFQ 指南有输入信息；How We Work 给出 7–20 天但与证据台账来源范围冲突。价格、最小批量、排期仍按件询价。 | 准备完整 RFQ；在报价里确认数量、计划、运输和条款。 |
| 发送/跟进 | 图纸是否已上传/发送？谁会跟进？ | Quote 页面只在浏览器生成邮件草稿，不上传、不自动发送；站点没有已验证的响应 SLA 或销售接收状态。 | 用户自行检查收件人和附件后发送；不得将草稿打开计为已提交询盘。 |

核心机会不是新增大量文章，而是保持已做好的分类与工程说明，同时先统一证据口径、让客户入口更准确地表达实际内容、缩短从零件/材料问题到 RFQ 的路径。首页、目录页、35 个产品详情和 RFQ 指南构成了基础闭环；案例内容现在应诚实叫“过程研究”，避免客户误以为有已授权交付案例。

## B. 产品与需求意图地图

以下英文短语均为基于本地产品与采购任务推导的自然表达候选；没有搜索量、区域排名或 Search Console 数据。优先用已有的 10 个能力页、35 个具体产品详情和 3 个任务型指南承接，不建议按 manufacturer/supplier、国家名或词序批量建近似页。

状态记法：回答状态为完整/部分/缺失/未验证；A=页面有没有答案，B=客户能否找到，C=证据是否足以作采购判断。优先级按该业务闭环中的商业重要性，不代表搜索量。

| 客户任务 / 系列 | 意图候选（英语） | 依据与优先级 | 当前承接 URL / 模块 | 状态与主要改进 |
|---|---|---|---|---|
| 选铣削供应商、确认孔腔/基准/工序 | custom CNC milling; CNC milled housings; CNC milling drawing requirements | 4 个铣削/加工案例产品；RFQ 与工程指南。高 | `/capabilities/cnc-milling-service/`；相关 4 个产品详情；`/insights/rfq-checklist/` | A 部分（有适用几何和图纸提示，无设备极限）；B 良好（Process 导航可达）；C 部分（不能从图证明材料/公差）。在能力页首部加一个具体例子和“limits reviewed from drawing”，不新增规格值。 |
| 轴、套、衬套、螺纹件的车削/车铣 | CNC turned shafts and fittings; thread and sealing-face machining | 4 个车削产品；能力页按旋转轴特征组织。高 | `/capabilities/cnc-turning-service/`；4 个产品详情；Material/RFQ 指南 | A 部分（列出螺纹和特征要求，未给设备范围）；B 良好；C 部分（照片不证明配合/密封）。给 RFQ 链路保留螺纹标准、配合和密封面字段提示。 |
| 多面、深腔、曲面是否需要五轴 | 5 axis CNC machining; multi-sided machining; indexed vs simultaneous machining | 4 个五轴分类产品、过程研究。高 | `/capabilities/5-axis-cnc-machining/`；4 个产品详情；`/cases/five-axis-machining-multi-face-parts/` | A 部分（已有按模型评估、定位/同时加工区别；无行程/最大尺寸）；B 中等（导航入口清楚，Cases 名称造成案例成果误解）；C 部分（照片仅显示加工过程）。保持“按图评估”，不宣称性能极限。 |
| cast housing 成品基准、轴承孔与密封面加工 | CNC machining cast housings; finish machining castings | 5 个铸件加工产品。中高 | `/capabilities/casting-machining/`；5 个产品详情；RFQ 指南 | A 部分（已讲铸件毛坯、余量、基准、责任边界；不提供自有铸造证明）；B 良好；C 部分。页面首屏明确“machining cast blanks”，询价前确认毛坯由谁提供。 |
| 按牌号/状态选铝、后处理 | aluminum CNC parts 6061 7075; anodized aluminum housing machining | 2 个主要铝件产品，另有原型产品，材料/表面指南。高 | `/capabilities/aluminum-cnc-parts/`；2 个主类产品详情；`/insights/material-and-finish-checklist/` | A 部分（有牌号候选与处理项，不代表每种牌号适用于任意零件）；B 良好；C 部分（无项目材料证书样例）。突出状态、遮蔽和处理后尺寸条件。 |
| 不锈钢牌号、车削件与表面处理 | 316L CNC turned components; stainless steel CNC parts | 3 个产品，明确包含 303/304/316L/17-4PH 类选项。高 | `/capabilities/stainless-steel-cnc-parts/`；3 个产品详情；Material & Finish 指南 | A 部分；B 良好；C 未验证具体产品牌号/证书。明确牌号不能互换，具体件牌号以报价/材料文件确认。 |
| 铜/黄铜接头、导电件、镀层后尺寸 | machined brass fittings; copper electrical contacts | 1 个产品详情。中 | `/capabilities/copper-brass-cnc-parts/`；产品详情；Material & Finish 指南 | A 部分（列有合金候选和毛刺/镀层考量）；B 良好；C 部分（无导电、耐压测试证明）。不把应用描述升级为合规/性能认证。 |
| 工程塑料绝缘/耐磨件，材料是否适合工况 | CNC machined PEEK/PTFE/acetal parts; engineering plastic machining | 4 个详情页。中高 | `/capabilities/plastic-machined-parts/`；4 个产品详情；Material & Finish 指南 | A 部分（列材料与测量条件，未验证具体应用兼容性）；B 良好；C 部分。加入材料牌号/填充/温湿度等报价输入，不作医疗/食品/电气合规暗示。 |
| 样件/原型，验证装配后是否继续迭代 | CNC machining prototype; automotive prototype parts | 6 个产品详情。高 | `/capabilities/prototype-machining/`；6 个产品详情；`/insights/how-we-work/` | A 部分（说明试制目标和修订；没有测试结果/周期保证）；B 良好；C 部分。明确 prototype 不等于量产验证或车辆测试。 |
| 多品种小批次/试产到重复订单 | low-volume CNC machining; small-batch machined parts | 2 个直接归类产品，其他产品也可能适合按图评估。高 | `/capabilities/low-volume-production/`；2 个产品详情；RFQ/How We Work | A 部分（批量与交期需按实际订单确认）；B 中等；C 未验证最低批量和生产能力边界。让客户按零件号列数量/批次/释放节奏，而不公布未核准 MOQ。 |

### 35 个当前产品详情的实际覆盖

这 35 个详情页均在本地静态构建中存在；标题与摘要为编辑化独立内容，均有一个主标题、相关能力链接、产品摘要和询价入口。建议保留现有 URL 和产品实例，不仅凭语义相近就合并。优先改共享模板的首屏信息密度与上下文传递，再根据 GSC/询盘数据判断是否需要内容合并。

1. CNC Milling Service（4）：
   - `custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm`
   - `custom-oem-high-precision-cnc-milling-manufacturer`
   - `full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing`
   - `custom-high-precision-machining-for-structural-aesthetic-components-oem`
2. 5-Axis CNC Machining（4）：
   - `ultra-high-precision-machining-services`
   - `global-oem-precision-machining-solutions`
   - `global-manufacturer-of-multi-sided-precision-machined-components`
   - `high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem`
3. CNC Turning Service（4）：
   - `custom-oem-cnc-turning-manufacturer`
   - `custom-rotary-cylindrical-components`
   - `custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer`
   - `high-volume-cnc-turning-for-complex-internal-external-features`
4. Prototype Machining（6）：
   - `custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier`
   - `custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier`
   - `custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier`
   - `custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier`
   - `custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier`
   - `custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier`
5. Casting Machining（5）：
   - `custom-cnc-machined-castings-transmission-housings-pump-bodies`
   - `oem-precision-cnc-machined-casting-housing-structural-enclosures`
   - `oem-precision-cnc-machined-casting-housings`
   - `precision-cnc-machined-castings-custom-oem-housings`
   - `precision-cnc-machined-castings-manufacturer`
6. Stainless Steel CNC Parts（3）：
   - `custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier`
   - `precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier`
   - `precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier`
7. Plastic Machined Parts（4）：
   - `custom-oem-cnc-machined-non-metallic-components-insulating-parts`
   - `custom-oem-cnc-machined-plastic-parts-manufacturer`
   - `precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances`
   - `precision-machining-for-functional-plastic-blocks-structural-components`
8. Copper & Brass CNC Parts（1）：
   - `precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier`
9. Low Volume Production（2）：
   - `precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier`
   - `precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures`
10. Aluminum CNC Parts（2）：
   - `small-batch-cnc-machining-manufacturer-complex-aluminum-housings`
   - `small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv`

产品详情模板及数据源：`src/pages/products/[slug].astro`、`src/data/productDetails.ts`、`src/data/catalog.json`、`src/data/productSummaries.ts`。模板已提供较好的工程提示、图纸/检验清单、同类产品和能力内链；改进集中在：手机首屏将 5 个分类标签压缩为少量主标签/次级元数据，让主图、具体零件名、适用性摘要和主 CTA 在第一屏内完整可见；把产品名称带入询价已实现，应保留；把 MOQ、价格、交期和公差明确作为逐件确认项。没有原始客户图纸、材料证或检验结果的产品图片，只能用于识别外形，不能作为实测或交付证明。

### 固定 16 题站内可答性测试

仅按当前本地版客户能看到的页面判断，不用供应商常识填空。这是固定题集的页面内容基线，不是真实搜索需求覆盖率，也不是 AI 引用率。

| # | 客户问题 | URL/锚点 + 页面原文摘录 | A 页面答案 / B 易发现 / C 证据 | 判定与缺口 |
|---:|---|---|---|---|
| 1 | 你们具体做哪些工艺？ | `/capabilities/`：导航组名 “Machining processes”；目录列 “CNC milling”, “CNC turning”, “5-axis machining”, “Casting machining”。 | A 是；B 是；C 部分 | 完整（范围）；不能由此推出机床数量/加工极限。 |
| 2 | 是否能加工我指定的材料牌号？ | `/capabilities/stainless-steel-cnc-parts/`：“303, 304, 316L and 17-4PH options serve different machining and operating requirements.” | A 部分；B 是；C 部分 | 部分；未公开逐项现货、材料来源/证书或每个产品的实际牌号。 |
| 3 | 最低订购量是多少？ | `/insights/custom-cnc-machined-components-for-prototypes-and-production/`：“Lead time and the minimum economical quantity need confirmation for your project.” | A 否；B 中；C 否 | 缺失；公开的原站 MOQ 说法互相冲突，当前内部待确认表也未给统一规则。 |
| 4 | 交期多长，是否含运输？ | `/insights/how-we-work/#packaging-shipping`：“The usual production period is 7–20 days after drawing confirmation. The quotation confirms the schedule for your specific part; transit time is separate.” | A 部分；B 可找到；C 未对齐 | 未验证；当前可见范围比证据台账里有限来源 7–14 天更宽，需业务核实起算/日历/处理/材料条件。 |
| 5 | 五轴最大尺寸、行程或重量是多少？ | `/capabilities/5-axis-cnc-machining/`：“This page does not specify machine capacity.” 同节说明依据模型评估 indexed 或 simultaneous tool path。 | A 否；B 是；C 否 | 缺失；需确认可公开的设备型号/行程/承重，否则提供按图评审路径即可。 |
| 6 | 能否保证 ±0.005 mm？ | `/quality/#quality-management`：“After engineering evaluation, specific critical features may achieve ±0.005 mm. This is not a general part tolerance.” | A 页面上有条件句；B 是；C 不足 | 未验证；需明确尺寸/材料/工序/测量方法/重复记录，核实前不要作为普遍承诺。 |
| 7 | 能否做阳极氧化、电镀、抛光？ | `/capabilities/cnc-milling-service/`：“Deburring, polishing, bead blasting, anodizing and plating options depend on the substrate and the dimensions that need protection.” | A 部分；B 是；C 部分 | 部分；有选项但缺每工艺适用材料、可选标准/颜色/供应责任及真实文件样例。 |
| 8 | 只有样件、没有图纸，能否询价？ | `/capabilities/#sample-to-part`：“Discuss scanning and 2D/3D modeling for a manufacturability review.” RFQ checklist 说明“Do not assume the sample communicates hidden material or treatment requirements.” | A 部分；B 从导航能到；C 部分 | 部分；缺少样件评估需要哪些信息、是否收费/周期（需业务确认），不应默认可直接报价。 |
| 9 | 询价需要提交什么文件？ | `/insights/rfq-checklist/`：“Include a 3D model, such as STEP, and a 2D drawing when dimensions, fits or surface requirements are not fully defined in the model.” 同页要求 part number、units、drawing revision。 | A 是；B 是；C 是 | 完整（准备项）；NDA/受限文件要求仍需单独联系确认。 |
| 10 | 能否提供真实尺寸检验报告/校准证明？ | `/quality/#inspection-records`：“BLANK FORMAT · NO RESULTS”；“No customer data, inspection results or approval are represented.” 页面说明客户报告不在本站公开。 | A 部分；B 是；C 否 | 部分；不能证明量具型号/量程/校准有效性，也没有实际项目记录可供公开核验。 |
| 11 | 是否持有 ISO 9001 证书？ | `/quality/#quality-management`：“An ISO9001 certificate is not available on this site.” | A 是；B 是；C 是（页面范围） | 完整：网站明确无该证书。工厂历史资质不能替代当前 ISO 证书。 |
| 12 | Cases 是否是客户交付成果和效果数据？ | `/cases/`：“These photographs illustrate LZZ’s process work. They are not measurement reports or evidence of a particular material grade, customer program or delivery result.” | A 是；B 入口名称略误导；C 是（范围声明） | 完整（内容属性）；导航 “Cases” 易让客户预期已授权客户案例，应改显示名而保留 URL。 |
| 13 | 是否有汽车/医疗/航空等行业认证或零件合规证明？ | `/insights/material-and-finish-checklist/`：“A catalog category does not establish suitability for a safety-critical application.” | A 否；B 中；C 否 | 缺失/未验证；没有实际认证范围/证书可见，不得从产品应用图推导认证。 |
| 14 | 运费、贸易条款、到货日如何确定？ | `/insights/how-we-work/#packaging-shipping`：“Distinguish the required arrival date from the planned dispatch date.” 并要求在报价中确认 shipment method 和 customs responsibilities。 | A 部分；B 中；C 部分 | 部分；没有目的地、税费/清关责任、Incoterms、到货日保证等固定条件。 |
| 15 | 发图纸前是否有 NDA？ | `/insights/rfq-checklist/`：“If your project needs an NDA or a controlled transfer method, contact LZZ before sending restricted files. An NDA is not automatically created by using this website.” | A 是；B 是；C 是（流程说明） | 完整（边界）；没有公开自动签署或加密上传能力。 |
| 16 | 点提交后，询盘是否发出？多久有回复？ | `/quote/`：“This page does not send anything.” 组件提示：“This form prepares an email; it does not submit an inquiry or upload files. You review and send the message yourself.” | A 是（不发送）；B 是；C 是（技术流程） | 表单结果完整；回复 SLA 缺失。不得把点击、草稿生成或 WhatsApp 打开等同于服务端收到或有效商机。 |

## C. 导航与客户路径

### 当前结构和保留/调整

当前主导航：Capabilities（下拉按加工过程/材料/生产阶段分组）｜Custom Parts｜Cases｜Quality｜Resources｜About LZZ（下拉含工厂等）｜Get a quote。页脚已按 Explore、Resources、About LZZ、Let’s talk、Find us 分组，和页头职责基本一致；不需要再重做整个尾页。

保留当前信息架构、产品 URL、能力 URL 和 `/cases/` URL。唯一建议改动是将导航/页脚面向客户的 “Cases” 显示名改为 “Process studies”，并将案例目录说明前移到卡片之前；这能让入口名称与实际内容一致，不需要改 URL 或重定向。Capabilities 下拉有 Process/Material/Order Type 结构，足以覆盖 10 个系列，不新增 Applications、Industries、Solutions 等重叠一级栏目。

### 关键联动：从实际问题通向报价

| 起点与位置 | 建议链接文字 | 目标 | 解决的任务/为什么此处出现 |
|---|---|---|---|
| 首页首屏“定制 CNC 加工”摘要/下方服务入口 | “Explore milling, turning and multi-face machining” | `/capabilities/`，分别直达铣、车、五轴 | 不要求用户先知道站内分类名；帮助首次访客判断匹配工艺。保持首页简洁，不加行业大全。 |
| 首页零件示例卡片 | “See material, process and RFQ notes” | 各产品详情页 | 示例不是案例成果；让客户从相似几何进入规格/图纸提示和带零件名的询价。 |
| `/products/` 筛选和产品卡片 | 当前具体零件名 | 对应产品详情 | 保留已实现搜索、材料/订单类型筛选；卡片文字说明示例内容，不用泛化“Learn more”。 |
| 各产品详情的材料/工艺 chips | “CNC turning”/具体材料类别 | 对应能力页 | 从单件进入工艺与材料边界；分类链接要为客户解释“为什么此分类相关”。 |
| 产品详情图纸/检查清单模块 | “Prepare the drawing and inspection details” | `/insights/rfq-checklist/` | 客户看完零件后立即知道发什么资料，不必回首页找指南。 |
| 产品详情主 CTA | “Discuss [part name]” | `/quote/?part=…`（现有预填） | 保留带上下文 RFQ；页面应明确是本地邮件草稿，不是线上提交。 |
| `/capabilities/casting-machining/` 首屏/毛坯说明 | “Machining cast blanks”及“Confirm who supplies the casting” | 对应铸件产品 + RFQ Checklist | 清楚区分铸件采购与机加工服务，减少把 LZZ 当自有铸造厂的误解。 |
| `/capabilities/prototype-machining/` 的 sample-to-part 模块 | “Have a sample but no drawing?” | `/insights/rfq-checklist/` 的样件部分，再到 `/quote/` | 先交代样件需要的信息和服务边界，再询问，避免从样件按钮直接跳入不知如何准备的表单。 |
| 316L/不锈钢产品详情 | “Specify the grade and condition” | `/capabilities/stainless-steel-cnc-parts/` + `/insights/material-and-finish-checklist/` | 让材料比较回到具体牌号、处理与文件，避免将产品标题当作材料证书。 |
| Quality 的空白报告模块 | “See what to specify in an RFQ” | `/insights/rfq-checklist/` 对应质量字段 | 连接证据准备，而不暗示公开了真实客户报告。 |
| `/cases/` 过程研究页 | “Discuss a similar setup” | 对应能力页/quote | 过程图只用于理解工艺场景；不假装客户成功案例。 |
| How We Work 的物流步骤 | “Confirm delivery terms in your quote” | `/quote/` 和 RFQ checklist | 运输责任按目的地确认，避免将承运商名单误读为固定送达保证。 |
| 全站 footer | 当前 4 组导航及联系信息 | Capability、Parts、Quality、Guides、About、Email/WhatsApp | 继续保留；不能以页脚链接替代上述正文中的任务型联动。 |

### 主要客户路径走查

1. **从首页开始**：首页 H1 “Your parts / Machined to order” 下方说明 custom CNC machining for prototypes and small production runs；接着是能力、零件示例、材料、工厂和 RFQ 准备内容。整体能知道业务类型。机会：首屏或紧邻区域再用短句点名 milling / turning / multi-axis 与自定义零件对象，降低“machining”过泛；不把公司历史挪入首屏。
2. **从产品详情开始**：单品有产品名、5 个分类入口、主图、摘要、Discussion CTA 和带零件名的询价上下文。主路径成立；390px 手机视图中 5 个标签换行及留白把 CTA 推到首屏边缘，代表页面可见按钮约有 9px 落在首屏以下。减少首屏标签数量或紧凑间距，优先保证产品名/一行用途/图/主 CTA 可见；不删掉买家需要的分类语义。
3. **从能力入口开始**：Capabilities 目录以“我知道工艺/材料/阶段”三个入口分流；十个详情包含适用几何、图纸输入、检验考量和 RFQ；适合有工程图的客户。五轴/工艺页诚实说明没有固定机器边界，最大能力由模型核实。
4. **从样件开始**：导航里“Have a sample but no drawing?”能到能力页锚点；需要把测绘/重建可能性、未知细节与“需要另行确认”的价格/周期说得紧邻 CTA，接 RFQ guide，而不是给买家形成免费逆向工程或直接报价的预期。

## D. 逐页/模板整改方案

下列顺序是每页推荐的首部到页尾模块；共同 CTA 采用 “Discuss your part / Prepare an inquiry”，只有已知产品上下文时才使用具体零件名。文案样例保持英语，因为网站面向英语阅读者；样例不是新增能力承诺。

| 页面/当前内容 | 具体缺口与建议 | 图片/资料、内链、CTA 与验收 |
|---|---|---|
| 首页 `/`；`src/pages/index.astro` | 保留清晰的 “Your parts / Machined to order”、现在的加工/样件定位、零件示例和工厂实图。推荐次序：业务识别+CTA → 4 个过程/材料/阶段入口或精选真实零件 → 过程/材料选择线索 → 有证据的工厂/质量边界 → RFQ checklist → footer。首屏副文案可为 “Custom CNC milling, turning and multi-face machining for prototypes and small production runs.” 若“Hangzhou”对出口采购识别有价值，可在简介明确所在地，不加无证产能数字。压缩泛化公司描述，不加大段 SEO 文案。 | 用现有来源真实加工/零件图，并让图注说明展示的是何种操作/零件，不外推客户或检测结果。增加直达 `/capabilities/`、`/products/`、`/insights/rfq-checklist/` 的任务型文字链接。验收：390 和 1440 首屏能快速回答做什么、适合什么任务、如何继续；首页 CTA 不声称线上提交。 |
| Capability 目录 `/capabilities/` | 保留“按工艺/材料/生产阶段进入”和 sample-to-part 流程。推荐次序：简短任务选择 → 工艺/材料/阶段分组且每组一句选择提示 → 可见代表零件链接 → sample-to-part 边界和所需文件 → RFQ。为组名增加一句“适合何种零件/客户问题”的说明，避免仅靠目录词。 | 复用来源可追溯的工艺照片；样件重建不使用生成图伪装真实测量。内链指具体相关产品与 RFQ checklist。验收：三类任务入口无需从页头下拉重复寻找；页面短而可扫读。 |
| Products 目录 `/products/` | 保留 35 件、搜索、材料和订单类型筛选、View All；不要为了首页默认精选 12 件而让其余产品成为不可发现内容（当前静态链接和筛选已测）。在标题下写清这是 custom part examples，不是库存目录；简要提示从工艺/材料筛选。 | 使用现有不同产品 cutout，图片 alt 只描述实际零件外观。产品卡片直达单品；单品回链对应能力、材料指南和 RFQ。验收：键盘/移动筛选后卡片数与可访问链接匹配；筛选不是新索引 URL。 |
| 产品详情共 35 页 `/products/{slug}/`；`src/pages/products/[slug].astro` | 保留独立标题/摘要、主图、5 个类别关联、制造亮点、条件化规格说明、可折叠图纸/检验清单、相关案例/产品及预填 part quote。推荐次序：具体零件 H1+一句用途/边界 → 主图 → 最关键的 2–3 个分类/材料信号 → Discuss this part → 图纸/材料/数量要点 → 事实性制造/检验说明 → 相近能力和支持指南 → 相关产品。手机将 5 个长 chips 改为“主工艺 + 主材料”及一个可点开/位于次级位置的其他分类，减小首屏纵向占用。不要把标题中的 supplier/manufacturer 或产品用途写成已验证客户关系。 | 只用已存原图或正确标注的编辑示意图；无材料证书、测试报告、客户授权不得加徽章/效果指标。 CTA 保持 query 参数 `part` 预填；添加 RFQ checklist 和 capability 路径。验收：390×844 首屏主 CTA 完整可见（含至少 44px 点击高度）；产品名称进入 quote；每个页面的图、摘要、链接匹配该产品，不出现全局保证值。具体 35 slug 见 B。 |
| `/cases/`（UI 名改 Process studies，URL 保留） | 现在 H1 是 “Engineering process studies”，卡片是 3 个过程照片研究，非客户交付 case；关键限制声明在卡片之后。推荐次序：Process studies 标题 → 卡片前一句 “Original workshop photographs show machining setups and parts; they are not customer case studies or inspection records.” → 三张研究卡 → quality/inspection 说明。 | 继续用原始过程图和明确 caption；链接三个过程详情及相关能力。验收：访客在看图前即可分辨“过程示例”与客户案例结果；header/footer 文案同步，但 `/cases/` 和子页 URL 不变。 |
| `/cases/five-axis-machining-multi-face-parts/` | 保留照片说明，突出材料、尺寸、客户、应用均未知；不添加性能/精度成果。顺序：题目/边界 → 原图及说明 → 可见工序/夹持观察 → 图纸需要确认项 → 相关五轴/铣削能力 → 讨论类似件。 | 使用已有原始五轴图；内链 `/capabilities/5-axis-cnc-machining/`、`/capabilities/cnc-milling-service/`、RFQ。验收：文字不推断合金、测量精度或客户结果。 |
| `/cases/turning-then-milling-cylindrical-parts/` | 顺序：车铣顺序简介 → 原图 → 回转基准与后续铣削关系 → 需在图纸确定的同轴度/孔位/检验字段 → 车/铣能力 → RFQ。保留图片不能证明同心度/表面值的说明。 | 原始两道加工图；链接 Turning、Milling、RFQ。验收：把图片观察与可验收事实分开。 |
| `/cases/two-stage-cnc-milling/` | 顺序：两种装夹/工序简介 → 原图 → 基准传递问题 → 检验/修订提示 → CNC Milling/五轴能力 → RFQ。保留非最终检验/客户成果说明。 | 原图；链接 Milling、5-axis 和 RFQ。验收：不推断加工良率、批量或已认可结果。 |
| `/quality/`；`src/pages/quality.astro` | 保留真实质量流程、可用量具类别、空白报告样式与“无客户数据/结果”的清楚披露。推荐次序：能提供/不能公开什么 → 检验流程及按图定义验收 → 量具类别及其实际能力需确认 → 报告样例（明确空白）→ 证书状态 → 询价需提供的关键尺寸和报告要求。先复核 ±0.005 mm 口径；若无可复核证据，暂时移除该数值或改为“critical limits reviewed against the drawing and measurement method”，不能把 ±0.01 与 ±0.005 混写。 | 需要业务提供设备型号/量程/校准范围、脱敏真实报告样本（若获准）、证书原件和适用主体/有效期；素材未提供前不加“证据卡”。链接 RFQ checklist、quote。验收：每项公差/证书说明可追至材料、范围、日期/版本；当前 ISO 状态不含糊。 |
| `/factory/`；`src/pages/factory.astro` | 保留实拍、厂区/流程呈现与产能免责声明。纠正显示成 “40+ CNC machines” 的设备口径；内部确认材料说 40+ 包含加工中心、车床及辅助设备，不能称 40+ CNC 机床。核验 1,500m²、100,000 parts/month（参考产能）及人员经验的来源、定义和适用范围。复核 7–20 天。推荐次序：工厂地点/服务 → 真实车间图 → 工序流 → 可公开设备类别/数量口径 → 产能/交期的条件化说明 → Quality/RFQ。 | 用有日期和拍摄范围说明的真实厂区/工序素材；设备列表需型号/数量/范围由业务核对。链接能力、Quality、How We Work。验收：任何数字不扩大内部证据表的定义；“每月产能”始终解释为参考而非保证。 |
| `/about/`；`src/pages/about.astro` | 保留公司身份和品牌背景，把历史材料与当前可核查事实分开；应用图继续标明 illustrative，不写成当前客户。推荐次序：公司/制造角色 → 当前主要加工和项目类型 → 经确认的历史/资质 → 说明应用图非客户证明 → 工厂/Quality → 询价。 | 认证如展示须有持证主体、范围、编号、有效期/状态；旧活动照片写明时间。内链 Factory、Quality、Capabilities。验收：无未经授权 Logo、客户名称、团队履历或奖项暗示当前背书。 |
| `/insights/` 资源目录 | 当前 3 个采购指南加技术指南/团队活动文章；目录约 46 可见词，指南卡片描述没有展示。推荐次序：简短说明资源解决哪些采购任务 → 3 张任务型指南卡（各一句收益/使用时机）→ 技术文章 → 低优先级团队新闻。将 Guide/News 区分，避免短活动消息与采购指南等权。 | 现有指南插图/原文；不要求增加博客数量。链接到 RFQ、How We Work、Material & Finish，并从相关产品/能力回链。验收：客户无需点开即可辨认该指南对当前任务是否有帮助。 |
| `/insights/rfq-checklist/` | 保留具体的 3D/2D、版本、材料、检验、数量、NDA 与邮件草稿流程。推荐次序：准备清单 → 按资料/技术要求分组 → 样件无图边界 → 保密与传文件 → 生成询价草稿说明 → Quote。 | 现有内容已足，视觉上以清单/短分组为主；无须另做可下载 PDF，除非能维护版本并确保内容一致。验收：用户知道邮件由自己发送、附件由自己添加，网站不收图纸。 |
| `/insights/how-we-work/` | 保留报价→样件→审批→批量→包装流程；把 7–20 天放在“报价确认具体计划”的上下文中，核实后再决定是否保留数值。清楚地区分生产期、运输时间、目的地到货和贸易责任。推荐末段加入“在询价阶段确认”的简洁字段，而非虚构固定 SLA。 | 现有历史运输图须说明为历史发货照片；链接 Factory、Quote、RFQ checklist。验收：交期数值来源和条件经业务核实；没确认时改成 “The quotation confirms the schedule for your part.” |
| `/insights/material-and-finish-checklist/` | 保留牌号/状态、运行条件、遮蔽、处理后尺寸及文件指南。建议把“图片不等于证书/表面规范”和目录不代表安全关键认证放在对应模块旁，避免额外泛化 FAQ。 | 现有材料类别图仅作说明；链接 4 个材料能力、Quality、RFQ checklist。验收：不承诺每种牌号/表面处理适用于所有形状/用途。 |
| `/insights/custom-cnc-machined-components-for-prototypes-and-production/` | 技术文章有 datum、功能面、材料、Finish、样件和重复订单实用信息；保留其与指南的区别。考虑目录显示一句明确读者任务，文章页以关键检查清单开头，而非重复首页介绍。 | 原图只解释加工表面；链接 Milling、Turning、Low-volume、Quality、RFQ。验收：图不能被误读为可接受公差或材料证书。 |
| `/insights/november-2025-hangzhou-lizhizao-group-activity/` | 这是 2025 年 11 月团队活动新闻，不是买家技术内容；保留归档但降低资源页优先级，不扩写成品牌背书。 | 保留原始活动图和时间背景，链接 About/Factory。验收：不捏造客户参与或项目成果。 |
| `/quote/` | 现有说明直接、可信：不上传/发送，生成邮件草稿。推荐顺序：本地草稿说明 → 已带入的 part/联系信息 → 必要的项目/数量/时间/检验字段 → 验证错误提示 → 草稿预览/打开邮箱 → 手动发送下一步。说明邮箱客户端可能未配置、草稿生成后仍需用户核对收件人/附图。 | 不增加真实资料上传或声称服务器已接收。可测试空字段/邮箱草稿格式/移动端；实际收件验证必须在授权测试邮箱进行，本轮未发送。验收：状态文案不出现“RFQ submitted/received”；不显示未经业务确认的回复承诺。 |
| `/privacy/` | 当前称没有分析/广告 cookies；代码检查未发现分析工具。保留现状。若以后增加 analytics、上传或表单接收，再按真实数据流更新隐私文本、同意机制和保留规则；现在不要先写不存在的处理能力。 | 验收：发布前逐项比对实际脚本、表单及第三方服务。 |
| `/404.html` | 当前 404 被排除索引，直达产品/能力/首页入口即可；保留真正 404 status。 | 验收：不存在 URL 的 HTTP 状态仍为 404，不用首页内容冒充 404。 |
| Capability 详情 10 页 | 保留现有页面实体和 URL。共同结构为：适用对象/一句决策说明 → 对应几何/材料/阶段 → 需在图纸确认的关键条件 → 检验/限制 → 代表产品链接 → 任务型 RFQ。不要给十页套同一“工厂/优势”长文。 | 下方给出各页具体重点；已有适配的工艺照片与产品内链，不新增无关装饰图。验收：详情首屏以客户问题作标题/简介；明确不能从页面推断的规格。 |

其他页面源码映射：首页 `src/pages/index.astro`；目录分别为 `src/pages/capabilities/index.astro`、`src/pages/products/index.astro`、`src/pages/cases/index.astro`、`src/pages/insights/index.astro`；公司页为 `src/pages/about.astro`、`src/pages/factory.astro`、`src/pages/quality.astro`；询价/隐私为 `src/pages/quote.astro`、`src/pages/privacy.astro`；共享导航、页头、尾页和全局 canonical 位于 `src/layouts/Layout.astro` 与 `src/components/MainNavigation.astro`。案例详情模板/数据为 `src/pages/cases/[slug].astro` 和 `src/data/cases.ts`；资源详情模板/数据为 `src/pages/insights/[slug].astro` 和 `src/data/resources.ts`。

### 10 个能力页的逐页重点

路由模板和内容数据源为 `src/pages/capabilities/[slug].astro`、`src/data/capabilityGroups.ts`、`src/data/capabilityOverview.ts`、`src/data/capabilityContent.ts` 与 `src/data/services.ts`。

| 页面 | 保留的具体内容 | 本页应加强的决策信息与联动 |
|---|---|---|
| `/capabilities/cnc-milling-service/` | pockets/profiles/bores、3/4/5-axis、finish 选择 | 链接铣削4件产品；给一条基准/深腔/刀具可达性提示；工艺限制按模型确认。 |
| `/capabilities/cnc-turning-service/` | 轴/套/接头、内外径/螺纹、live-tool 特征 | 链接4件车削产品；提醒 thread standard、mating part、sealing face 和必要二次铣削。 |
| `/capabilities/5-axis-cnc-machining/` | 复杂曲面、多面定位、indexed/simultaneous 区别 | 链接4件五轴产品和五轴过程研究；明确无公开机床行程/工件边界，需按3D模型评估。 |
| `/capabilities/casting-machining/` | 毛坯基准、余量、轴承孔、密封面；“不证明自有铸造”边界 | 链接5件铸件加工产品；突出谁供毛坯、铸件质量文件和加工责任需在 RFQ 定义。 |
| `/capabilities/aluminum-cnc-parts/` | 6061/7075 等、薄壁深腔、阳极/遮蔽 | 链接2件直接归类产品与原型件；状态/处理后尺寸按图确认。 |
| `/capabilities/stainless-steel-cnc-parts/` | 303/304/316L/17-4PH 选项、车铣和钝化/电解抛光 | 链接3件产品；不要将分类页牌号列表读成某张产品照片的材料证明。 |
| `/capabilities/copper-brass-cnc-parts/` | C36000 黄铜、碲铜候选和接触/密封表面 | 链接铜/黄铜产品及 material checklist；导电/耐压需定义并另行验证。 |
| `/capabilities/plastic-machined-parts/` | PEEK/PTFE/尼龙/POM 等、薄壁/温度/测量条件 | 链接4件产品及材料指南；说明具体等级/填料/合规适用性按文件核实。 |
| `/capabilities/prototype-machining/` | 试装、样件、修订和测试目标 | 链接6件样例、How We Work、RFQ checklist；清晰区分原型加工与认证/车辆性能验证。 |
| `/capabilities/low-volume-production/` | 混线、小批量、版本/首件/抽样计划 | 链接2件主类产品和RFQ；不发布待核实 MOQ/固定交期。 |

### 3 个过程研究与 5 个资源页的 URL 清单

- Process studies：`/cases/five-axis-machining-multi-face-parts/`、`/cases/turning-then-milling-cylindrical-parts/`、`/cases/two-stage-cnc-milling/`。
- Buyer/working guides：`/insights/rfq-checklist/`、`/insights/how-we-work/`、`/insights/material-and-finish-checklist/`。
- Manufacturing guide：`/insights/custom-cnc-machined-components-for-prototypes-and-production/`。
- Company news：`/insights/november-2025-hangzhou-lizhizao-group-activity/`。

### 信任声明：当前可用证据与待核实项

| 声明/页面现状 | 已有材料和适用范围 | 差距/行动 |
|---|---|---|
| 公司成立/厂区面积/设备数量 | 内部 `docs/content-evidence.md` 的公司材料记载成立于 2017 年、约 1,500m²；40+ 设备总数口径含加工中心、车床和辅助设备。 | 网站 `CompanyFacts` / 工厂页出现 “40+ CNC machines”，与内部口径不一致；未逐台核对设备。先更正为实际口径，或暂不展示数量。 |
| 参考产能 | 内部台账有约 100,000 件/月参考产能并附产品组合影响条件。 | 核实计算口径、时期、产品组合和是否适合公开；避免让买家认为是其零件保证产能。 |
| 工程经验 | 内部台账有工程团队 15+ 年经验的材料。 | 应解释为团队经验，不等于公司经营年限或每名工程师的履历；获准前避免夸大。 |
| 交期 7–20 天 | 现在 How We Work 的页面客户可见。内部证据来源支持的是更有限场景的 7–14 天，起算日/工作日/运输/表处等仍需确认。 | 业务核实前改为“schedule confirmed in quotation”，或明确已验证的适用范围和例外条件。 |
| ±0.005 mm | Quality 页面存在条件化表述。 | 内部 claims-to-confirm 要求设备/尺寸范围/材料/测量方法和可复核记录；内部旧材料还存在 ±0.01 mm 条件口径。证据未对齐前撤下数值。 |
| ISO 9001 | Quality 页明确网站当前没有该证书。历史/高新技术企业材料不是 ISO 认证。 | 保留清楚说明；不得用“遵循 ISO 原则”让客户误以为持证。 |
| 过程照片/产品示例/应用图 | `docs/EVIDENCE.md` 和页面来源记录区分原始车间照片、产品示例和生成/修饰图；案例明确非客户成果，About 应用图标 illustrative。 | 任何生成/修饰图不得冒充设备、员工、量测、客户交付或工厂实证。若不加图注会误读，则在视觉附近标注用途；不要改 alt 成 SEO 宣传。 |
| 认证/客户关系/保证 | 公开页面没有可供独立核验的 ISO 证书、公开客户案例结果或真实报告；历史企业资质有主体/日期/有效性限制。 | 不恢复源站的无证实客户 Logo、Tier-1、零缺陷、百万件、Swiss machining、亚微米、Ra、6 个月保修、DDP 等声明；逐项获取原始证据、适用主体、日期、范围和披露授权后评估。 |

## SEO / GEO 与技术就绪情况

| 检查面 | 当前结果 | 结论/动作 |
|---|---|---|
| 路由/HTTP | 本地已生成 64 页，真实不存在路径 404，86 条重定向由 SEO 测试覆盖。生产仍为旧版内容。 | 本地迁移输出检查通过；正式发布后要在正式主机复测每条关键旧路径和 404，不能仅凭构建通过。 |
| Title / description / heading | 63 个可索引页 title/meta 唯一；64 个 HTML 页面各有一个主 H1；404 noindex。 | 结构基线合格。短页优先补任务说明与入口，不为字数机械扩写。 |
| canonical / sitemap / robots（本地构建） | 测试确认新站 canonical 为 https 主机、sitemap 63 个、robots 对生产站开放。 | 这是构建结果，不代表生产 CDN 已返回相同内容。发布后从公网逐页核验 canonical、robots、sitemap hostname 和无 Preview URL 泄漏。 |
| 正式站抓取 | 当前 live `/robots.txt` 是 `Disallow: /`；正式页面 canonical 指向 HTTP，虽 HTTP 页面会跳转 HTTPS。 | 若目标是 Google/Bing 收录，这是 P0 上线门禁；需业务/站点负责人先确认是否刻意屏蔽，再在授权发布窗口调整和验证。 |
| Preview | 200 + `X-Robots-Tag: noindex`；当前页面 canonical 指向正式域名。 | Preview noindex 是合理保护；不要从 Preview 测试推导其可索引。上线前确保正式站没有 noindex header，也无 preview canonical/OG/sitemap。 |
| 内容与链接 | 静态 HTML 正文、可抓取 a[href]、产品和能力页内链存在；核心筛选有本地交互验证。 | AI 搜索也依赖正常可访问、可理解、相互链接的正文。没有必要添加隐藏文本或虚构 AI Schema。 |
| JSON-LD | 当前结构化数据语法测试通过，字段须与可见正文和真实公司事实一致。 | 不用 schema 虚构价格、库存、评分、认证。结构化数据不会补足缺失证据，也不保证富结果。 |
| 语言映射 | 此版本为英语，没有发现多语言/ hreflang 映射。 | 若业务确认要做多语言，先确立真实可维护的译文和语言 URL，再设计 hreflang；本轮不加空映射。 |
| 图片/性能/移动交互 | 所有 63 页面 390px 横向测试通过；关键导航、筛选和预填已测。代表性产品首屏 CTA 有轻微折叠问题。 | 性能/Core Web Vitals 未做真实流量或正式线上测试；不能宣称线上速度达标。图像按真实内容写 alt，需区分来源/示意。 |
| AI/答案引擎 | 当前正文能表达公司、系列、选型条件和限制；部分采购条件缺少事实材料，案例入口又有语义误差。 | 先解决抓取阻断、主张一致性、语义明确和答案可达；没有可以诚实报告的 AI 引用率或推荐排名。 |

Google 当前官方指南强调 AI 搜索功能仍依赖常规搜索可抓取与可索引、页面正文、内部链接和有帮助的原创内容；没有额外的 AI 专属 schema 或字数门槛。[AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)、[Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)。结构化数据须与可见内容一致，也不保证展示富结果。[Structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)。使用可抓取的 `<a href>` 与明确锚文本有利于发现链接。[Link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)。

Protolabs 和 Xometry 的公开 CNC 服务/指南展示了买家常需要对照的设计边界、材料/表面、报价输入、检验及交期等信息结构，可作为“哪些问题值得清楚回答”的参考；其设备、公差、交期、平台报价能力均不能证明 LZZ 具有相同能力或商业条件。[Protolabs CNC milling design guidelines](https://www.protolabs.com/services/cnc-machining/cnc-milling/design-guidelines/)、[Xometry CNC machining service](https://www.xometry.com/capabilities/cnc-machining-service/)。外部研究时间为 2026-09-24；未获得目标国家搜索控制台/精确排名数据。

## 转化闭环与后续测量

当前 Quote 交互的真实边界是“收集页面字段→客户端生成 mailto 邮件草稿→用户在邮件应用中加附件/检查收件人/自己点击发送”。没有服务端接收、文件上传、CRM 线索、自动跟进或真实送达确认。本次自动化只验证了本地草稿与上下文，不向实际邮箱发件。

后续如业务要评估入口，建议先用不含图纸/联系人敏感信息的事件名区分：`quote_cta_click`、`quote_draft_generated`、`mailto_open_attempt`、`whatsapp_click`；只有未来服务端真实收到并确认后，才能另记 `inquiry_received`。销售判定有效询盘/商机应来自 CRM/人工状态，而不是点击。当前隐私说明称无 analytics/广告 cookies，代码搜索也未发现分析 SDK；因此现在不应声称有转化数据。若将来增加测量，需同时复核实际数据流并更新隐私说明。

## E. 首批优先任务（按依赖排序）

| 优先级 | 改哪里/为什么现在 | 材料状态、视觉/业务影响 | 验证与完成条件 |
|---|---|---|---|
| P0：发布前确认正式站抓取策略 | 正式站 robots 当前禁止全站抓取，canonical 声明 HTTP。正式站仍是旧版，当前 Astro 版没有生产可见性。 | 无需新文案；需要确认网站负责人是否有意 `Disallow: /`，以及当前发布/迁移授权。对索引可见性影响高；本轮不改生产。 | 授权发布后公网检查首页、核心能力/产品/质量/Quote 的状态、robots/X-Robots、canonical、sitemap 主机、旧 URL 301 和真实 404；无 Preview 域名泄漏。 |
| P1：统一高风险数字/资质声明 | Factory 的“40+ CNC machines”、How We Work 的 7–20 天、Quality 的 ±0.005 mm 与证据材料口径不符或未完成确认。买家会据此判断供应和验收风险。 | 内部证据已有矛盾和缺项；需设备清单、交期规则/订单样本、精度测量记录/方法及业务确认。视觉影响小、信任影响高。 | 每个公开数字有证据文件、范围、单位、确认责任人/日期；否则删除数字改为如实边界说明。ISO 无证保持明确。 |
| P2：纠正案例入口预期 | 全站主导航和页脚把过程研究叫 Cases，而实际是工艺照片研究；限制说明位于卡片后。 | 材料齐全；纯显示名/内容层调整，视觉影响小。 | 菜单/页脚统一显示 Process studies；URL 不变；用户在卡片前就看到不是客户成果/检验报告。 |
| P3：改善产品手机首屏决策 | 35 个详情共用的 5 个长标签占据手机首屏，主 CTA 在抽查页面首屏边缘。 | 材料齐全；需要一次模板/CSS调整，视觉中等。 | 在 390×844 上至少抽查铝件、316L、五轴/样件详情；首屏完整显示名称、用途、主图和至少 44px CTA；产品 query 仍正确预填。 |
| P4：补充分类目录的短引导 | `/capabilities/`、`/insights/` 的组/卡片虽然内容有用，但首屏与目录卡片对“何时看它”解释不足；`/insights/` 不显示卡片描述。 | 现有内容已齐，不需新 research；只补每组/每卡一条短句，不扩成文章。 | 让买家快速选工艺/材料/阶段和 RFQ/Material/How We Work 指南；确认小屏不增加大段首屏高度。 |
| P5：首屏到 RFQ 的任务型联动 | 产品、样件、材料、质量和物流节点应进入匹配指南；已有链接基础可复用。 | 现有 URL/文案足够；内容性微调。 | 按 C 中具体链路逐项点测，链接文字说明目标和任务；所有产品页讨论 CTA 保留零件上下文。 |
| P6：测量定义与隐私复核（以后接入时） | 当前只到 mailto 草稿，没有线上接收/销售闭环；现在不可把点击当有效询盘。 | 事件方案可准备，但不接埋点直到业务决定数据工具、责任人和隐私文本。 | 有授权的隔离测试环境验证成功/失败/重复提交/服务端收件；真实投产前更新隐私和成功说明。 |

**可立即处理（不等待新增素材）**：导航 “Cases” 显示名和前置披露；目录页短引导；手机标签密度/CTA布局；Quote 文案边界；在已核实文本范围内明确“询价确认”。  
**需公司确认/提供材料**：设备数量清单、机床能力公开范围、交期计算口径、MOQ 与经济批量、±0.005/±0.01 的真实检验证据、量具型号/量程/校准、报告和材料证书样例、旧资质有效性与展示授权、物流责任/贸易条款、NDA 可用流程。  
**只能上线后验证**：正式域名实际 HTML 与 CDN 响应、生产 robots/canonical/sitemap、重定向与 WAF、真实收件流程（若未来有服务端）、Search Console/Bing 收录与询盘数据、Core Web Vitals/真实用户性能、AI 引用/推荐表现。

## F. 资料缺口、暂缓项与验收结论

### 业务资料清单

1. **制造范围**：当前可公开的设备台账（名称/数量/型号/行程/载荷/工艺）、哪些属于辅助设备、是否含外协工艺；铸件毛坯采购/供应责任。
2. **交期与数量**：MOQ 与经济批量按工艺/材料/尺寸的真实规则；样件、重复批次、后处理、材料采购、排产和运输各自的周期定义；可审计的交付样本。
3. **质量**：±0.005/±0.01 的适用特征/尺寸/材料/方法；实际量具型号/范围及有效校准资料；可脱敏且获授权的真实报告、材质证明/处理记录样本；抽样/首件/追溯规则。
4. **认证/信任**：每份证书的法人主体、认证范围、编号、有效期和可公开授权；历史企业资质当前状态。客户名称/Logo、交付案例、项目结果须有书面授权及可证据支持的范围。
5. **商业条款**：国际运输的目的地/承运人/清关/税费/Incoterms/包装责任、质保范围、响应流程与回复时限；NDA 和受控图纸传输的实际流程。
6. **测量/增长**：有无 CRM/真实服务端 RFQ；若需统计，确定隐私合规、事件定义、真实提交确认与商机状态数据源。Search Console/Bing Webmaster、服务器日志、目标市场与询盘数据用于后续判断意图优先级。

### 暂缓而非批量扩建

- 暂不按搜索词变体新增更多 SEO 页，不批量写 Blog，也不新增与能力分类重复的行业/应用一级导航。
- 暂不重做页脚：当前页脚分组和导航已基本一致；仅同步 “Process studies” 标签即可。
- 暂不发布未经核实的 MOQ、价格、精度、月产量、交期或机器极限；不恢复 ISO/Tier-1、零缺陷、百万件、亚微米等原始营销承诺。
- 暂不把过程照片升级成案例结果，不用生成图伪装车间/客户证据，不加未经授权客户 Logo 或空白“信任徽章”。
- 不以固定字数、FAQ 数量、关键词密度、`llms.txt` 或所谓 AI Schema 作为目标；短目录页需要的是快速解释任务与下一步，而不是填充文字。

### 完成标准（下一轮实施后的复验）

- 主要客户从首页、产品详情、能力目录、样件入口都能知道服务对象、匹配边界、所需图纸/证据以及下一步；核心任务链接可用、可发现且带上下文。
- 重要商业/质量声明可追溯到当前证据，适用条件与例外同样显眼；无材料支持的数字、证书、结果和认证不出现在页面。
- 重点页面的桌面/手机阅读顺序简洁；单品 390px 首屏行动入口完整可见；导航名称与实际页面内容一致。
- 本地技术测试通过不替代正式站检查；必须从正式 URL 验证状态码、robots、canonical、sitemap、迁移和有效 404。转化则要区分草稿、实际发送、服务端接收和销售确认。
- 固定 16 题复验不删难题；按可见 URL/原文/证据重新记录完整、部分、缺失或未验证，不编造覆盖百分比。

## 最终判断

一个不了解 LZZ 的目标客户，目前从首页、能力目录或产品详情基本能判断“这是杭州的定制 CNC 加工供应商，覆盖多种材料、原型和小批量，并能通过邮件准备询价”；产品示例、能力指南、RFQ 清单和 Quote 的真实边界也提供了可走通的本地路径。**但还不能对所有关键采购问题快速形成可信判断**：最重要的阻碍首先是正式站仍为旧版且 `robots.txt` 阻止全部爬虫；在当前本地版本内，设备数量、交期和精度承诺又没有与证据台账统一，其次是 “Cases” 对过程研究造成预期偏差、产品手机首屏 CTA 不够显眼。第一批应依序处理正式环境抓取门禁（经授权后）、三项声明证据核对、Cases 改名并前置说明、单品手机首屏、能力/资源目录的短任务引导和产品到 RFQ 的内链闭环。除此之外现有目录、产品数据与诚实的质量/报价说明值得保留；目前没有依据承诺排名、询盘增长或 AI 推荐结果。
