# About、Resources 与任务页：实施与内容迁移

日期：2026-10-15。实施依据：用户批准的 `docs/WEBSITE-REDESIGN-PLAN.md` A0–A5、R0–R4、Q1–Q4、U1–U2。基线：`D:/lzz/visual-rebuild-baseline-20261015`。范围只含本页族组件、数据、样式与 Privacy 页面；未提交、部署或测试真实询盘发送。

## 已实施结构

| 页面族 | 实际变化 | 保留/去向 |
|---|---|---|
| About概览 | 一段主体定位→三个任务入口→一条真实来访精选→草稿行动；删除两套重复入口和重复统计展示 | 公司事实完整留在Profile；5条新闻与全部事件图片仍在新闻库。保留overview旧hash跳转及旧区块锚点 |
| Company profile | 主体与事实定义表→ISO请求→3份原始文件/用途/日期/原图链接→工程与一张车间图→5条发展记录→下一步 | 40+始终为加工及辅助设备；15+为团队经验。证件原文与打印有效期未加强。应用条件迁相应能力/产品；人物照片回新闻 |
| How we work | 订单条件→五阶段责任行（Buyer/LZZ/Record）→商业条款→变更/异常/售后 | MOQ、生产天数条件、付款币种/金额阶段、样费/设置/运费/抵扣、贸易术语/责任、DDP条件、售后全部常显。旧quotation/sample/production/packing/after-sales锚点保留 |
| Contact | 直接联系方式→New part/Supplier documents/Existing order→地址与预约来访 | 保留email、WhatsApp、UTC+8、完整地址、qualification与visit mailto；长RFQ教程压成完整关键输入的一句话+RFQ链接 |
| News | 目录标题直接改为Company news；采用新字体/间距与适合照片的自然比例；原事件结构和筛选保留 | 5条记录、所有日期精度、原始照片、详情/相关记录、两类筛选与状态文字不变；未生成或替换人物证据 |
| Resources总目录 | 四个直接任务入口→8篇指南→集中2模板+FAQ→草稿行动 | RFQ不再有两个同级下载宣传块；8篇指南、两模板、FAQ全保留 |
| Ordering目录 | 四个编号阶段行直接显示应形成的记录及5篇工具入口；不再先读一套重复阶段目录 | 原orderingStages aliases保留；blank inquiry/acceptance下载与How we work入口保留 |
| Machining目录 | 3个具体技术任务直接选；真实研究作为辅助入口 | 3篇指南与历史材料/涂层hash跳转保留 |
| RFQ | 完整模板前置；Copy/TXT位于模板正文前；六项快览改为锚点；三组字段详解常显；worksheet独立在后 | NDA、控制文件、multi-axis毛坯尺寸重量、来样未知材料、开放项、inspection/calibration、数量交付条件全部保留；Copy失败仍有选择文本/TXT路径 |
| Compare | 导语压短成相同revision/model前提与scope；8行表格为主 | material/finish/quantity/arrival/acceptance、substitution/geometry alternatives、exceptions与accepted quote record全部保留 |
| Critical features | 功能与基准→6行清单→合并的释放前检查→真实几何实例 | 材料/处理/项目范围并入release-files，旧material-and-project-scope锚点保留；标准链接和公差条件未删 |
| Prototype approval | 评估责任→7行清单→4行批准记录→独立批量释放 | 明确批准/有条件批准/不批准、actual approver、未决项、样件限制和版本变化 |
| Process selection | 沿用三路对比与3个真实场景，统一阅读列/表格宽度，保留逐图study入口 | indexed/simultaneous区别、几何和精度限制未删 |
| Material/finish | 材料表→连续最终表面规格（处理/外观/遮蔽/后处理尺寸/边缘）→实体/涂层/包覆区别→记录 | 两张涂层真图保留；教学图缩为辅助；C3600/H62/C36000、非库存/待确认信息不变；interfaces旧id保留 |
| Sample→batch | 两张任务表与批量要求保留，使用居中阅读列和表格扩宽 | 同页1件/7–14日与前提、revision/quantity/sampling/records/release/changes全部保留 |
| Shipping | 清单/时间责任/文件→3张历史包装图；移除生成装箱示意的正文位置 | 真实图全部保留；articleImage改用真实shipping-example；2022准备、非到货证据边界保留 |
| FAQ | 15问全部常显；桌面问题/回答双列，手机同题连读；没有折叠、没有额外重复快答 | resourceFaq.ts数据与schema同源未改；所有15问和详情链接保留 |
| Quote | Prepare an RFQ email；完整地址改为Contact链接；review移除重复Message，仅一份full draft | 表单五字段/校验/首错焦点/source解析/sessionStorage与legacy/clear/restored/unavailable/copy失败/download/mailto/noJS行为未改 |
| Privacy/404 | Privacy新增5项短目录/对应id；工具页使用Inter任务字阶；404保持短恢复导航 | Privacy5节原正文不变；404四条恢复路径与noindex不变 |

## 11项应用迁移归属

`src/data/company.ts` 的原 applications 数组保留，Profile不再展开11项应用墙。能力Agent已落地 `capabilityRebuild.ts` 的 `applicationRequirements` 与 `CapabilityApplications.astro`，7项挂在对应能力页 `#engineering-fit`；产品Agent确认4项由 `productBrowse.ts` 的 `partUseContexts` 承接并整合到详情。最终整体覆盖以根Agent逐URL核对为准。

| 原应用 | 承接目标 | 负责Agent |
|---|---|---|
| Laboratory & scientific instruments | `/products/part-examples/custom-oem-high-precision-cnc-milling-manufacturer/` | products_review |
| Hydraulic & rescue equipment | `/products/part-examples/global-oem-precision-machining-solutions/` | products_review |
| Electronic & audio equipment | `/products/part-examples/small-batch-cnc-machining-manufacturer-complex-aluminum-housings/` | products_review |
| UAVs, 3D printers & motion systems | `/products/part-examples/custom-high-precision-machining-for-structural-aesthetic-components-oem/` | products_review |
| Automotive & motorcycle prototypes | `/capabilities/prototype-machining/` | capability_review |
| Robotics & automation | `/capabilities/5-axis-cnc-machining/` | capability_review |
| Industrial fans & impellers | `/capabilities/5-axis-cnc-machining/` | capability_review |
| Aerospace & defense equipment | `/capabilities/5-axis-cnc-machining/` | capability_review |
| Agricultural machinery | `/capabilities/cnc-milling-service/` | capability_review |
| Semiconductor equipment | `/capabilities/cnc-milling-service/` | capability_review |
| Medical devices & industrial equipment | `/capabilities/cnc-turning-service/` | capability_review |

## 图片处置

- 未生成、改绘、裁切、替换任何原始公司/产品/证件/事件证据照片。
- Profile只使用workshop-wide；workshop-aisle仍保留在素材/工厂职责。重复人物精选移到原新闻入口。
- Workflow取消重复CMM及包装大图，链接Factory及Shipping档案；CMM/3张包装原图在各自页面保留。
- Shipping退出正文的 `packing-review-v1` 为原有通用生成示意，不删除素材；正文采用真实3图档案。articleImage同步改为真实档案。
- Material finish保留2张coating原图，原示意仅作为规格说明辅助。原件原图链接是批准方案允许的证件读取入口，不新增图片弹窗。

## 视觉与检查记录

- 根Agent已审查代表Profile/FAQ/RFQ/Quote的1440/390首屏与全页缩览。Profile证件层级、FAQ Q/A、Quote首屏已通过该轮样板审查；这不是全站验收。
- 首轮RFQ按钮因嵌套slot位于模板后，已改为ResourceApprovedModule显式 `rfqTools` 参数，在pre正文前渲染。待根Agent确认修复后截图。
- 按首轮反馈，指南正文改为760px居中阅读列；有表格的模块可向两侧扩至1040px，手机恢复单列宽；不以装饰图填补空白。
- `npm run check` 第一轮及最终扩展后第二轮均为0 errors、0 warnings、9 hints（既有未用变量与图标deprecated提示）；第二轮检查945个文件。
- Impeccable mechanical detector对本页族已改组件/样式运行一次：`[]`。该结果不代替真实D/M视觉和功能检查。
- 对基线与现行组件做静态id检查，原显式DOM锚点已保留；被移除的 `id="workshop-aisle"` 等为图片组件参数，非DOM锚点。根Agent最终输出的 `content-comparison.json` 另发现5个原动态生成的标题锚点，已补兼容span（见下）。
- 本Agent环境读取本地HTTP遇到EACCES，未绕过网络控制；实际浏览器与功能验证由根Agent执行，不把本地fetch失败视为页面故障。

## QA路径

优先实际检查：

1. `/resources/rfq-checklist/` 390首屏Copy/TXT、复制与下载、NDA和三组说明、旧hash。
2. `/resources/drawings-and-ordering/compare-cnc-machining-quotations/` 1440居中列与扩宽表、390列标签；`/resources/processes-materials-finishes/material-and-finish-checklist/` 连续5项规格与2张真图。
3. `/about/company-profile/` 证件原图链接/日期常显；`/about/how-we-work/` 五阶段与商业/售后；`/about/` 手机任务先于照片；`/about/contact/` 文件/订单任务位于地址前。
4. `/resources/`、`/resources/ordering-guide/`、`/resources/processes-materials-finishes/` 目录直达；`/resources/faq/` 15问、锚点、schema一致。
5. `/quote/` 普通、产品reference、guide topic三入口；必填、email/phone任选、错误焦点、恢复/clear、表内reference同key、storage unavailable、copy失败/TXT、无JS。仅测试草稿，勿点击发送外部邮件或消息。
6. News目录两筛选和全部5篇详情，真实照片加载/自然比例/相关链接；Privacy目录、404导航。

剩余验收：根Agent统一构建、SEO/静态链接、D/M/窄屏/缩放、草稿功能矩阵及全族截图。未获得实际结果前不标“全站通过”。

## 最终锚点与年份去向核对

- Critical features：`material-and-project-scope-heading` 通过section aliases在合并后的release-files模块前输出兼容span，与已有 `material-and-project-scope` 指向同一内容。
- Ordering guide：`prepare-rfq-title`、`compare-quotes-title`、`samples-and-production-title`、`production-delivery-title` 在四个对应新阶段的标题之前输出兼容span；不恢复旧内容块。
- Workflow原2022历史图片记录归入 `/resources/production-and-shipping/custom-cnc-parts-shipping-checklist/#archive-title`。`contentGuides.ts` 的archive-title保留November 2022正文、3张真实图片和全部3条November 2022图注；Workflow的Transport and records明确链接此历史档案。年份没有改为当前时间，也不宣称到货或统一包装标准。
- Products Agent确认4类应用原描述已落地于 `productsRebuild.ts` 的 `companyApplicationDescriptions` 和 `productApplicationContexts`，原 `partUseContexts` 的采购条件与链接仍保留。
- 此轮按根Agent指令仅补锚点与记录，不再运行check/build。
