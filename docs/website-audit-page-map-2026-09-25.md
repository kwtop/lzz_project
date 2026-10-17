# LZZ Page Purpose Map 与逐页审计

配套：[整站策略审计与整改方案](./website-strategy-audit-2026-09-25.md)。本表覆盖本地生成的 **68 个可索引 URL**；另有 `404.html` 为 noindex，不属于获客页。用户简称：E=工程/研发，P=采购，D=产品/项目负责人，Q=质量/验证，C=供应商资质评估。下列 Primary Keyword 均为**语义定位假设，不是已验证排名/搜索量**；需 GSC、关键词工具及销售问询校验。CTA 栏是推荐的**页面主下一步**，不意味着当前全部已经实现。逐页审计中“来源”以代码/生成 HTML 为主；首页、About、Factory、Quality、Quote、Products hub、典型能力/零件/过程/指南还做了 1440px 实际视觉抽查，移动端做了代表路由 390/768px 宽度与菜单检查。未将未抽查路由说成逐页人工视觉测试。

## A. Page Purpose Map

### A1. 首页、目录、公司与转化（10）

| Page | User | Search Intent | Primary Keyword | Secondary Topics | Page Goal | CTA |
|---|---|---|---|---|---|---|
| `/` | E/P/C | Commercial | custom CNC machining Hangzhou | prototype, small batch, factory | 解释业务和分流 | Explore capabilities / Discuss part |
| `/capabilities/` | E/P | Process selection | CNC machining capabilities | process, material, order stage | 找可行加工路径 | Choose process / Send drawing |
| `/products/` | E/D/P | Part examples | custom CNC machined parts | housings, shafts, fittings | 发现相似形态 | Open a relevant part |
| `/cases/` | E/C | Factory process proof | CNC machining process studies | setups, original photos | 看实拍过程边界 | Open a process study |
| `/insights/` | E/P | Research/procurement | CNC machining buyer guides | RFQ, process, material | 找决策知识 | Open guide / RFQ checklist |
| `/about/` | C/P | Company evaluation | about LZZ Precision | company, team, documents | 核实主体与历史 | View factory / Quality |
| `/factory/` | C/E/P | Manufacturer evaluation | CNC machining factory Hangzhou | equipment, workflow, capacity | 看产线与能力口径 | Inspect equipment / Ask feasibility |
| `/quality/` | Q/E/P | Inspection evaluation | CNC machining quality control | datums, reports, calibration | 定义验收与记录 | Specify inspection needs |
| `/quote/` | P/E/D | RFQ | CNC machining quote request | drawing, quantity, finish | 完成可送达询盘 | Review/send inquiry |
| `/privacy/` | P/C | Legal/process | LZZ privacy and site information | draft storage, contact | 说明站点数据行为 | Contact LZZ |

### A2. 加工能力（10）

| Page | User | Search Intent | Primary Keyword | Secondary Topics | Page Goal | CTA |
|---|---|---|---|---|---|---|
| `/capabilities/cnc-milling-service/` | E/P | Process commercial | CNC milling service | pockets, bores, 3/4/5-axis | 判断铣削适用性 | See milled parts / Discuss requirements |
| `/capabilities/cnc-turning-service/` | E/P | Process commercial | CNC turning service | shafts, threads, live tooling | 判断车削适用性 | See turned parts |
| `/capabilities/5-axis-cnc-machining/` | E/P | Process commercial | 5-axis CNC machining | multi-face, contour, access | 判断多轴必要性/限制 | Send model and envelope |
| `/capabilities/casting-machining/` | E/P | Process commercial | casting finish machining | machining allowance, bores | 判断铸件后加工 | Send casting and drawing |
| `/capabilities/aluminum-cnc-parts/` | E/P | Material commercial | aluminum CNC machining | alloy, thin wall, finish | 定材料/加工考虑 | Compare aluminum parts |
| `/capabilities/stainless-steel-cnc-parts/` | E/P | Material commercial | stainless steel CNC parts | 304, 316L, shaft, finish | 定牌号与检验问题 | Review stainless examples |
| `/capabilities/copper-brass-cnc-parts/` | E/P | Material commercial | brass and copper CNC parts | fittings, contact face | 定材料/螺纹要求 | Review fittings examples |
| `/capabilities/plastic-machined-parts/` | E/P | Material commercial | machined plastic parts | polymer, thin wall, stability | 定聚合物与测量边界 | Review plastic examples |
| `/capabilities/prototype-machining/` | D/E/P | Order stage | CNC prototype machining | revisions, fit check | 定打样验证重点 | Prepare prototype RFQ |
| `/capabilities/low-volume-production/` | P/D/E | Order stage | low-volume CNC machining | pilot batch, repeatability | 定重复批量方案 | Discuss batch/inspection |

### A3. 零件详情（35）

| Page | User | Search Intent | Primary Keyword | Secondary Topics | Page Goal | CTA |
|---|---|---|---|---|---|---|
| `/products/custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier/` | D/E | Automotive form | aluminum intercooler prototype | cooling, TIG, leak test | 解释冷却组件原型 | Discuss assembly drawing |
| `/products/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/` | D/E | Automotive form | billet aluminum engine cover | curved form, fitment | 展示罩壳几何 | Discuss cover drawing |
| `/products/custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier/` | D/E | Automotive form | billet aluminum intake manifold | runner, injector, fitment | 区分歧管示例 | Compare intake geometries |
| `/products/custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier/` | D/E | Automotive form | billet aluminum intake plenum | internal transition, seal | 区分 plenum 示例 | Discuss sealing requirements |
| `/products/custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier/` | D/E | Automotive form | billet intake manifold prototype | runners, flanges | 展示原型组装形态 | Discuss model/fitment |
| `/products/custom-cnc-machined-castings-transmission-housings-pump-bodies/` | E/P | Cast housing | transmission/pump housing machining | splines, channels | 展示复杂后加工 | Send casting blank details |
| `/products/custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier/` | D/E | Automotive form | CNC machined throttle body | bore, shaft alignment | 展示进气控制壳体 | Discuss bore/fitment |
| `/products/custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier/` | E/P | Turned part | stainless steel turned shaft | runout, threads | 展示轴类加工 | Discuss shaft drawing |
| `/products/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/` | E/P | Multi-axis example | multi-axis milled components | pockets, angled features | 用具体零件支撑服务页 | See milled geometry |
| `/products/custom-high-precision-machining-for-structural-aesthetic-components-oem/` | D/E | Milled part | structural and aesthetic CNC parts | finish, mounting | 解释结构+外观取舍 | Discuss cosmetic faces |
| `/products/custom-oem-cnc-machined-non-metallic-components-insulating-parts/` | E/P | Polymer form | CNC machined insulating parts | slots, barriers | 展示绝缘件形态 | Specify polymer grade |
| `/products/custom-oem-cnc-machined-plastic-parts-manufacturer/` | E/P | Polymer form | custom machined plastic parts | seals, gears, wear | 多种塑料形态总览 | Browse plastic machining |
| `/products/custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer/` | E/P | Turned fitting | CNC turned fittings and flanges | sealing, gauge, thread | 解释连接件接口 | Discuss thread standard |
| `/products/custom-oem-cnc-turning-manufacturer/` | E/P | Turned example | custom CNC turned components | shaft, bushing, flange | 用形态支撑车削页 | See relevant turned example |
| `/products/custom-oem-high-precision-cnc-milling-manufacturer/` | E/P | Milled example | custom CNC milled components | block, bracket, manifold | 用形态支撑铣削页 | See specific block/housing |
| `/products/custom-rotary-cylindrical-components/` | E/P | Mill-turn part | rotary cylindrical machined components | cross-hole, flats | 区分复合车铣 | Discuss off-axis features |
| `/products/full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing/` | E/P | Milled+finish | CNC milling with surface finishing | cosmetic, deburring | 解释加工后处理 | Specify finish requirement |
| `/products/global-manufacturer-of-multi-sided-precision-machined-components/` | E/P | Multi-face part | multi-sided machined components | ports, bores, datums | 展示多面接口 | Discuss datum plan |
| `/products/global-oem-precision-machining-solutions/` | E/P | Multi-process form | OEM precision machined components | milling, turning, ring | 给宽泛页限定形态 | See multi-process features |
| `/products/high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem/` | E/P | Fluid part | machined fluid-system components | impeller, sealing | 展示曲面/流道 | Discuss model/inspection |
| `/products/high-volume-cnc-turning-for-complex-internal-external-features/` | P/E | Repeat turned part | turned valve cores and sleeves | grooves, batch | 解释重复生产控制 | Discuss sampling plan |
| `/products/oem-precision-cnc-machined-casting-housing-structural-enclosures/` | E/P | Cast structure | machined cast structural enclosures | ribs, bearing bore | 区分结构壳体 | Discuss datums |
| `/products/oem-precision-cnc-machined-casting-housings/` | E/P | Cast housing | CNC machined casting housings | mating face, boring | 区分装配壳体 | Send blank/drawing |
| `/products/precision-cnc-machined-castings-custom-oem-housings/` | E/P | Cast housing | machined OEM casting housings | sealing, tapped holes | 区分密封接口 | Discuss sealing faces |
| `/products/precision-cnc-machined-castings-manufacturer/` | E/P | Cast housing | precision machined castings | powertrain, pump | 区分流道与包络 | Review related casting route |
| `/products/precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances/` | E/P | Polymer form | complex geometry plastic machining | thin wall, stability | 解释复杂塑料几何 | Discuss polymer/measurement |
| `/products/precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier/` | E/P | Copper alloy part | turned brass and copper components | contacts, threads | 展示电接触/螺纹 | Discuss alloy/gauge |
| `/products/precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier/` | P/D | Batch stage example | low-volume machined components | mixed process, pilot | 区分批次规划 | Discuss pilot/repeat plan |
| `/products/precision-machining-for-functional-plastic-blocks-structural-components/` | E/P | Polymer form | machined plastic blocks | hole pattern, flatness | 展示功能块 | Specify hole datums |
| `/products/precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures/` | E/P | Aluminum enclosure | small-batch aluminum enclosures | pockets, housing | 展示短批壳体 | Discuss enclosure interfaces |
| `/products/precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier/` | E/P | Stainless part | 316L CNC turned components | shaft, valve, finish | 区分 316L 零件 | Specify 316L/record |
| `/products/precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier/` | E/P | Locking part | indexing plunger machining | spring, pin, thread | 展示定位零件 | Discuss fit/function |
| `/products/small-batch-cnc-machining-manufacturer-complex-aluminum-housings/` | E/P | Aluminum housing | complex aluminum housings | electronic enclosure | 展示工业铝壳 | Discuss batch/datum |
| `/products/small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv/` | P/E | Batch part | small-batch aluminum CNC parts | pilot, HMLV | 解释小批铝件 | Discuss order mix |
| `/products/ultra-high-precision-machining-services/` | E/P | Complex geometry | complex geometry CNC machined parts | impeller, pocket | 将泛服务词收敛到特征 | Discuss critical geometry |

### A4. Workshop process studies（5）

| Page | User | Search Intent | Primary Keyword | Secondary Topics | Page Goal | CTA |
|---|---|---|---|---|---|---|
| `/cases/five-axis-machining-multi-face-parts/` | E/C | Process proof | five-axis multi-face machining process | setup, surfaces | 看实拍加工过程 | Related multi-face part |
| `/cases/milling-a-pocketed-enclosure-form/` | E/C | Process proof | pocketed enclosure milling process | fixtures, pocket | 看口袋壳体加工 | Related enclosure part |
| `/cases/milling-prismatic-components/` | E/C | Process proof | prismatic CNC milling process | face, bore | 看棱柱件加工 | Related milled part |
| `/cases/turning-then-milling-cylindrical-parts/` | E/C | Process proof | turning then milling process | cylindrical, off-axis | 看复合工序 | Related mill-turn part |
| `/cases/two-stage-cnc-milling/` | E/C | Process proof | two-stage CNC milling setup | re-clamping, datum | 看多工位工序 | Related two-sided part |

### A5. Resources（8）

| Page | User | Search Intent | Primary Keyword | Secondary Topics | Page Goal | CTA |
|---|---|---|---|---|---|---|
| `/insights/rfq-checklist/` | P/E | Procurement | CNC machining RFQ checklist | drawing, quantity, records | 准备可报价询盘 | Prepare inquiry |
| `/insights/cnc-process-selection/` | E/D | Comparison | CNC milling vs turning vs 5-axis | geometry, setup | 选择候选工艺 | View example parts |
| `/insights/prototype-vs-small-batch-cnc/` | P/D | Comparison | prototype vs small-batch CNC | revision, inspection | 判断订单阶段 | See stage capability |
| `/insights/material-and-finish-checklist/` | E/Q/P | Specification | CNC material and finish checklist | coating, grade | 定材料与表面条件 | View material examples |
| `/insights/custom-cnc-parts-shipping-checklist/` | P | Procurement/logistics | shipping CNC machined parts | packing, terms | 定运输问题 | Prepare order inquiry |
| `/insights/how-we-work/` | P/D | Supplier process | ordering custom CNC parts | drawing to shipment | 了解合作步骤 | Start RFQ |
| `/insights/custom-cnc-machined-components-for-prototypes-and-production/` | E/D | Engineering guide | CNC parts for prototypes and production | datum, finish, repeat | 解释特征到批量的衔接 | Open a relevant part |
| `/insights/november-2025-hangzhou-lizhizao-group-activity/` | C | Company news | LZZ November 2025 team activity | people, Hangzhou | 归档公司活动 | About LZZ |

## B. 逐页面审计

下列所有条目使用相同检查维度：Current Purpose、Problems、Search Intent、Missing Content、Content To Remove/Merge、Images To Improve、Internal Links、SEO/GEO/E-E-A-T Opportunity、Recommended Page Structure。对于同模板的 35 个产品页，先给**全模板结论**，再逐 URL 给独有处理；这比把同一句话复制 35 次更可执行。所有“需补”如涉及设备数值、认证、客户项目、出货国家、检验结果，必须先标 `NEEDS REAL BUSINESS DATA`。

### B1. 首页、目录与公司页面

| Page | 当前目标 / 主要问题 | 删减或合并；图片 | 内链 / SEO、GEO、信任机会 | 推荐结构 |
|---|---|---|---|---|
| `/` | 商业分流；5 秒可知 CNC 与小批量，但客户问题和图纸条件还不够具体 | 保留工艺大图；缩短重复“做什么”引导，选一张真实工厂证据 | 从核心几何导向能力/产品、质量、RFQ；公司事实需条件说明 | 一句定位→两类买家路径→代表零件→工厂/质控→报价准备 |
| `/capabilities/` | 工艺/材料/阶段选择；选项多但可找到 | 保留 3 类路径；压缩同义卡片；图只作为形态说明 | 给选择题/比较表；`sample-to-part` 需边界 | “我知道几何/材料/订单阶段”三入口→各路由→样件路径→询盘 |
| `/products/` | 零件搜索与浏览；目前 H1 后几乎直接进入筛选 | 不要再加装饰图；保留实拍形态图；首屏补 2–3 句目录语义 | 35 详情可查，但默认展示 12；提供按形态的有意义入口/全量浏览；GEO 用文字定义零件库 | 示范说明→形态/工艺快捷筛选→产品卡→图纸准备 CTA |
| `/cases/` | 过程证据 hub；约 5 个过程入口，明确非客户案例 | 保留原过程图；避免使用“客户结果”用语 | 过程→类似零件详情（非同项目）和能力/工厂/质量 | 证据范围说明→按工序索引→精选过程→如何评审相似零件 |
| `/insights/` | 采购指南 hub；指南与团队新闻混排 | 公司新闻下沉到“Company news”；AI 示意卡图保留明确标签 | 按 RFQ/工艺/材料/交付分组，给相关商业页 | 四类问题导航→指南→针对性 CTA→公司新闻小区 |
| `/about/` | 供应商身份；36 次主区图像使用，大量活动/应用内容稀释判断 | 保留法定名/真实文件/精选团队照；活动组压缩、余者归档；“合作标识”不称现行客户 | 公司→工厂/质量/零件；文件有效状态逐项审 | 公司身份/地点→能做什么→真实设备/流程→文件→精选人物活动→联系 |
| `/factory/` | 工厂可信度与产能口径；有原图和 2017/1,500m²/40+、约 100,000 件参考值 | 实拍优先；AI 示意图移出“事实证明”相邻位置；40+ 设备不得写成 40+ CNC | Factory→对应能力与 Quality/Quote；设备范围表需业务资料 | 位置/场地→实拍设备→按工序设备清单→流程→容量适用条件→质量/询盘 |
| `/quality/` | 验收流程与记录；诚实声明无 ISO 证书，但重要证据没有样本 | CMM 原图留；AI 检测示意与空白报告必须显眼标注“无实测” | Quality→About 原始文件、Factory 设备与 RFQ；检验报告/校准 `NEEDS REAL BUSINESS DATA` | 质量原则→阶段检查→量测方法边界→记录样式/可提供性→公司文件区分→询盘 |
| `/quote/` | 低门槛准备询盘；本地邮件草稿不是送达 | 无需照片；保留需提供清单，删减与 RFQ 指南重复的长解释 | RFQ/Quality 内链已有；补收件确认、响应与附件安全口径（业务确认） | 必需字段→可选工程字段→确认摘要→发送状态/联系备选 |
| `/privacy/` | 数据与草稿行为说明；不是 SEO 获客页 | 无图合理；若 RFQ 实施后台，必须同步修订 | 页脚入口足够；不能声称上传/存储现不存在的流程 | 草稿/存储→第三方/邮件→联系方式→更新说明 |

### B2. 十个能力详情

共性：服务页应回答“适用几何—工艺取舍—尺寸/材料/检测限制—相似示例—RFQ 输入”，而不是同一组工艺宣传词。当前有示例和指南链接；个别大图可向下缩、把技术判断上移。所有不在源码的设备行程/公差/常备材料均不能补写。下表每行的“删/并”指正文编辑，**不是立即删除 URL**。

| Page | 独有问题 / 缺失 | 删/并、图片 | 内链 + SEO/GEO/E-E-A-T 机会；推荐结构 |
|---|---|---|---|
| `/capabilities/cnc-milling-service/` | 32 张主区图片实例，铣削说明与 5 轴标签易混；单一 ±0.01 特征参考需继续条件化 | 精选有代表性的工位/零件，合并重复展示 | 铣削几何→3/4/5轴何时需换路线→零件→检测限制→RFQ |
| `/capabilities/cnc-turning-service/` | 螺纹/密封/侧向特征决定复合工艺，却在长页里分散 | 留原车床工位，去重复近景；工艺内容按特征排序 | 车削与车铣决策→轴/接头具体页→线程/检验要件→RFQ |
| `/capabilities/5-axis-cnc-machining/` | 未公开行程、负载、包络；页面可说“评审”但不能作确定能力 | 16–17 次图像使用可精简；留真实多轴操作 | 首屏明确需 3D 模型/毛坯尺寸/重量；实拍过程→多面零件→设备数据 `NEEDS REAL BUSINESS DATA` |
| `/capabilities/casting-machining/` | 毛坯条件、加工余量与基准需更具体 | “从样件到零件”与 RFQ 内容可合并；图片标明铸件状态 | 铸件毛坯→关键接口→5 个 casting 页分工→检验计划→询价 |
| `/capabilities/aluminum-cnc-parts/` | 牌号/薄壁/表面功能需要与样例挂钩 | 常见牌号与材料选项合为决策表；去重复“原图展示” | 合金/热处理→几何→表面/后处理→铝壳/汽车示例→RFQ |
| `/capabilities/stainless-steel-cnc-parts/` | 304、316L、17-4PH 不该只当标签；条件和供货仍未证 | 不加泛用人物图；图示轴/锁件特征 | 按牌号/用途差别→轴/定位件→螺纹/表面检验→询价 |
| `/capabilities/copper-brass-cnc-parts/` | 仅 3 张图，铜/黄铜用途与触点/密封差异可读性低 | 用接口表替代添加图片 | 合金选择→接触/螺纹特征→相关接头页→标准确认 |
| `/capabilities/plastic-machined-parts/` | 聚合物尺寸稳定性/测量条件在引导里不够突出 | 少用装饰大图，多用材料-几何表 | 聚合物选型→薄壁/孔位→三个塑料示例差别→测量边界 |
| `/capabilities/prototype-machining/` | “打样”与低量生产可能重叠；需明确验证目标 | 合并无来源的通用周期话术；图保留实际样件 | fit/appearance/function 的目标→版本→首件检验→阶段对比指南 |
| `/capabilities/low-volume-production/` | 参考产能/交期不能作为每项目承诺 | 视觉从泛工厂图转向批次/版本流程；精简重复“order planning” | 订单 mix→受控版本/抽样→相关批次零件→报价条件 |

### B3. 三十五个产品详情

**全模板审计（适用于每个 URL）：**Current Purpose 是“展示一类原始目录零件形态并引导图纸询价”；Search Intent 主要是特征/几何或用途，不应让产品页代替服务页排名。现有页首屏图大、摘要简短、下面统一 `Materials & manufacturing` / `Separate workshop process studies` / `Related machining examples` 三个 H2；较有用的 Drawing & inspection checklist 默认折叠。Missing Content 是明确的可见特征、关键接口/限制、某些材料牌号和验收记录（若无依据不能填参数）；Remove/Merge 是压缩所有详情重复的“请确认图纸”模板句；Images 是检查主图是否展示页面所称几何，不能把修饰图视作量测证据；Internal Links 已有能力/指南/过程/相关产品，却缺从对应 Guide/Process 回来的上下文。SEO/GEO 机会是**每页用两三句独特事实**区分：零件属于哪种形态、为何选择工艺、需确认什么；E-E-A-T 机会是原图/来源与经授权记录。推荐结构：图 + 独特摘要 → 3–5 个特征/接口 → 材料/工艺及条件 → “报价需确认” → 相似过程（明确非同项目） → 相关零件/指南 → RFQ。首屏不是让所有 35 页都套长 FAQ/应用/参数表。

| Page（`/products/` 后缀） | 本页特别需要处理的问题 / 保留与合并判断 |
|---|---|
| `custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier/` | 显示 CNC+TIG 但别把压力测试当实测结果；说明端盖/接口/焊接边界，压力条件 `NEEDS REAL BUSINESS DATA`。 |
| `custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/` | 突出大曲面与装配空间，不以“汽车供应商”暗示 OEM 客户授权；保留独立外形。 |
| `custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier/` | 与下两种 intake 页做 runner/injector/接口比较；先保留，待审图判断是否合并。 |
| `custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier/` | 只讲腔体/内部过渡和密封；压力性能无记录不得承诺。 |
| `custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier/` | 说明原型拼装/法兰接口与另一 manifold 页有何不同，差异不够则候选合并。 |
| `custom-cnc-machined-castings-transmission-housings-pump-bodies/` | 铸件后加工 + 内部齿形/流道；与另四页分配不同主几何，不能都写“pump housing”。 |
| `custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier/` | 把主孔/轴孔同轴、壳体接口作为首屏判断；配合限度需图纸。 |
| `custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier/` | 区别 316L 通用车削件：轴的跳动、直径/螺纹；不公开 ±0.005。 |
| `custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/` | 典型宽泛服务型产品标题；限定为曲面/斜特征零件示例，服务词让位能力页。 |
| `custom-high-precision-machining-for-structural-aesthetic-components-oem/` | 功能面与可见面不同验收条件；可以保留独立“结构+外观”角度。 |
| `custom-oem-cnc-machined-non-metallic-components-insulating-parts/` | 与另外塑料页区分绝缘/隔离功能；材料的电性能不能凭类别推断。 |
| `custom-oem-cnc-machined-plastic-parts-manufacturer/` | 目前像材料/形态总览，易与 Plastic capability 竞争；聚焦图示零件或融入分类页，待原图与 GSC。 |
| `custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer/` | 接头的螺纹标准、密封面要作为报价判断；保留接口类意图。 |
| `custom-oem-cnc-turning-manufacturer/` | 宽泛车削服务标题；重新定位为图示轴/衬套/法兰形态，能力词归车削页。 |
| `custom-oem-high-precision-cnc-milling-manufacturer/` | 宽泛铣削服务标题；限定图示方块/支架/壳体结构，必要时与 CNC milling 页整合。 |
| `custom-rotary-cylindrical-components/` | 与普通车削区分“旋转主体 + 横孔/平面/槽”的复合工序。 |
| `full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing/` | 只讨论后处理对装配/外观尺寸的影响；具体表面标准 `NEEDS REAL BUSINESS DATA`。 |
| `global-manufacturer-of-multi-sided-precision-machined-components/` | 把斜孔、流道与多面基准说清；避免空泛 global manufacturer 声称。 |
| `global-oem-precision-machining-solutions/` | 最大的宽泛综合服务页之一；若无独特图示几何，候选与能力页/综合 hub 合并。 |
| `high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem/` | 曲面流体件不可从外观推出流量/性能；只写可见几何与模型测量问题。 |
| `high-volume-cnc-turning-for-complex-internal-external-features/` | 旧源的 high-volume 不应自动变成产能承诺；聚焦套筒/阀芯及批次抽样条件。 |
| `oem-precision-cnc-machined-casting-housing-structural-enclosures/` | 保留筋位、轴承孔、结构壳体角度，避免与传动/泵壳重复。 |
| `oem-precision-cnc-machined-casting-housings/` | 与后几页高度近似；若只差标题无独立图证，候选合并。 |
| `precision-cnc-machined-castings-custom-oem-housings/` | 聚焦密封面和螺纹安装位；以表面基准和装配问题区分。 |
| `precision-cnc-machined-castings-manufacturer/` | 只有少量正文反向入口；聚焦流道/动力总成壳体，补来自 casting 过程研究的相关链接。 |
| `precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances/` | “tight tolerance”不可无条件承诺；聚焦薄壁、深腔与测量/温度条件。 |
| `precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier/` | 分离电接触件与流体接头；牌号、螺纹/导电要求按单确认。 |
| `precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier/` | 以混合工艺和试产批次为独特角度，别与 stage page 重复 MOQ/交期泛谈。 |
| `precision-machining-for-functional-plastic-blocks-structural-components/` | 聚焦厚塑料块的孔位/平面，区别薄壁复杂塑料。 |
| `precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures/` | 与另两个铝壳/小批页区别“薄壁外壳/安装接口/表面”，必要时合并。 |
| `precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier/` | 明确 316L 条件与轴/阀/紧固件中的实际图示形态；避免“316L 产品认证”推断。 |
| `precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier/` | 定位销/锁紧件的独立功能意图较强；说明弹簧或总成是否实际供货，不能凭照片推断。 |
| `small-batch-cnc-machining-manufacturer-complex-aluminum-housings/` | 与前述铝 enclosure 页形态近；限定工业电子装配特征后再判断合并。 |
| `small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv/` | 宽泛小批量铝件页；如图像无独立零件，要并入 stage 或相关铝壳示例。 |
| `ultra-high-precision-machining-services/` | 以 impeller/复杂曲面为具体主题；“ultra-high”不能暗示统一公差或亚微米结果。 |

### B4. 五个过程研究详情

共性：真实原图和来源边界是优势；并非客户项目、性能报告或某产品详情的同一订单。其页面结构宜为“本照片能证明什么/不能证明什么 → 工位与可见特征 → 类似零件/能力 → 若要复制加工需提供什么”。当前统一四段和大图略有模板感，必要时用标注过的局部特征图替代重复近景，不能在图上伪造量测。

| Page | 独有问题/图文建议 | 内链、SEO/GEO/信任与结构 |
|---|---|---|
| `/cases/five-axis-machining-multi-face-parts/` | H1 与首图过大，技术摘要和照片来源需在首屏可见 | 连 `/capabilities/5-axis-cnc-machining/` 与一个**相似**多面件；强调非同项目，给装夹/基准问题 |
| `/cases/milling-a-pocketed-enclosure-form/` | 口袋壳体特征应在照片旁标明可见/推测边界 | 连铝 enclosure 或铸壳中合适示例；说明粗/精加工不能从照片全推定 |
| `/cases/milling-prismatic-components/` | 可见多个孔/面，避免泛说“高精度” | 连具体 CNC milled block 页；列出应审的面/孔，但不附无来源公差 |
| `/cases/turning-then-milling-cylindrical-parts/` | 车后铣的“为什么”需图形化：轴向/侧向特征 | 连 `custom-rotary-cylindrical-components`；步骤→相似零件→RFQ |
| `/cases/two-stage-cnc-milling/` | 两次装夹的基准连续性是独特知识点 | 连多面/带安装面的零件；说明没有测量记录，不把图当合格证 |

### B5. 八篇 Resources 详情

共性：可读的 HTML H2 和说明较好；专题应给具体商业落点和清晰“仅供询价决策、非质量/认证证明”的边界。大图不应先于关键比较/结论；`Article` 只有真实作者/日期才补。对 8 篇逐一判断：

| Page | 目前角色 / 问题、删并与图片 | 内链/搜索/GEO/E-E-A-T 机会；推荐结构 |
|---|---|---|
| `/insights/rfq-checklist/` | RFQ 指南实用；可把材料/运输/回复提示压为单张可复制清单；AI 图是示意 | 清单→2 个典型零件的不同输入字段→Quote；不填固定 MOQ |
| `/insights/cnc-process-selection/` | 比较表已好，但 1440 首屏被大工位图推后 | 首屏 3 句结论→表→原始过程照片→转/铣/五轴代表零件→RFQ |
| `/insights/prototype-vs-small-batch-cnc/` | 区分打样/重复批量已建立；AI 示意须继续图注 | 对照“版本/样件/检查/包装”→对应两能力与具体样例→报价输入 |
| `/insights/material-and-finish-checklist/` | 材料比较有实用问题；存在 2 张 AI 示意实例，不能当处理标准照片 | 牌号→界面/镀层尺寸→标准/记录→铝、不锈钢、塑料具体零件 |
| `/insights/custom-cnc-parts-shipping-checklist/` | 原归档打包照不能证明目的国/承运结果；页面有边界说明 | 包装/文件/Incoterm 问题→如何下单/Quote；真实出口案例需授权 |
| `/insights/how-we-work/` | 步骤清楚，但采购人仍缺谁回复/何时、协议条件 | 图纸→报价→样件→批次→发货流程；关键状态需业务核实；连相关零件 |
| `/insights/custom-cnc-machined-components-for-prototypes-and-production/` | 技术指导是原站内容的保守整理；文章与阶段对比有少量重复 | 聚焦“关键工作面/基准/图纸”，其他阶段判断链接到专文；连壳体/轴零件 |
| `/insights/november-2025-hangzhou-lizhizao-group-activity/` | 正文很短（约 53 个空白分词），属公司新闻而非技术文章；5 张活动图片适合归档 | 仅从 About/News 找到；不拿活动页争 CNC 商业词；是否索引看品牌/新闻价值与公司意愿 |

## C. 页面调整前的事实核验清单

1. **NEEDS REAL BUSINESS DATA：**MOQ 规则、经济批量、交期起算/后处理/运输、回复时限、Incoterm/税费责任。
2. **NEEDS REAL BUSINESS DATA：**五轴设备包络/负载/最大件、设备台账和 40+ 口径的当前性。
3. **NEEDS REAL BUSINESS DATA：**量具型号/范围、校准有效性、允许公开的脱敏实测/首件/材料记录。
4. **NEEDS REAL BUSINESS DATA：**ISO/其他认证的主体、范围、有效期；About 现有企业认可文件不得替代它们。
5. **NEEDS REAL BUSINESS DATA：**具体客户/应用/出货市场的公开授权，客户结果和出口案例不得由归档照片推断。
6. GSC：查询-URL 关系、非品牌自然流量、索引/规范页、重叠页表现；询盘数据：实际来源/阶段/合格率。没有这些，不根据“关键词相似”直接删 URL。

本附录是 **编辑与开发执行地图**，不是公司对某个零件适用性、性能、认证或交付的对外承诺。
