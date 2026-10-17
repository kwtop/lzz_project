# Capabilities 与 Factory 内容 / 视觉实装记录

日期：2026-10-15。依据用户批准的 `docs/WEBSITE-REDESIGN-PLAN.md` C0–C5、F1–F6。本记录只描述当前源码实际改动；此前独立审查在 `docs/review-20261015-current/capability-review.md`。

## 实装范围

负责 Capability*、CapabilitiesDirectory、FactoryRedesign、对应 styles 和新建 `capabilityRebuild.ts`。没有修改 Home、全局 base、Products、About、Resources、Quote，没有部署或提交。根 Agent 负责公共字体 / 1240px 容器 / 72D48M 间距、正式 ImageGen 和浏览器验证。

新增 `CapabilityPartFigure.astro` 统一真实零件的尺寸、来源标签与对应产品链接；新增 `CapabilityApplications.astro` 承接公司简介迁出的具体应用约束；新增 `capabilityRebuild.ts` 管理短首屏描述、主图对应、正式概念图、一份合并 RFQ 输入及应用要求。原 catalog、serviceReading、capabilityContent、capabilityRedesign 中工程参数数据保持可用。

## 各蓝图的当前结构

| 类型 | 当前模块顺序和具体迁移 | 桌面 / 手机 |
|---|---|---|
| C0 目录 | 短首屏+三个锚点 → 4 工艺图文入口 → 4 材料轻量入口 → 3 项目状态行 → 一个真实加工依据入口 → 一份 RFQ。原 processFit 的详细条件迁各详情已有工程/询价段；不再先读长适配表。 | 工艺 2×2 图文行；手机 110px 小图+短说明。材料四列转两列，项目状态逐行。 |
| C1 工艺 | 对象与范围合成短首屏，代表真实件前置 → 剩余实例、geometry 和 workholding 同组 → 真实工序组 / casting 明确范围步骤 → 材料规格 → 关键验收及 scopeQuestions → 单一 RFQ。 | 首屏 1:1，手机标题→说明→实物→动作。实例与判断在长验收表前；实拍保留完整工况，手机逐图相邻说明。 |
| C2 材料 | 真实件首屏 → 全字段牌号表（铜 function-review 移到表前） → 剩余实例与材料实践同段 → 最终验收+ScopeQuestions；铝 finishing 说明/图移入验收 → RFQ。重复 grade 侧栏和独立重复例图已退出。 | 主件与真实工况分组；表维持原手机逐行、列义可见。铜保留 P27 首图和真实 brass batch；不造材料检测证据。 |
| C3 原型 | 评价目的 → P13/P12/P15 真实/总成/CAD 例图 → 三阶段输入/方法责任/可审查结果 → 相对量产的材料工艺差异、下一版 → RFQ。 | 一主两辅；手机源图顺序。通用四材料牌号复述退出本页，改差异清单与四材料详情链接；汽车功能/压力、供件/接头/节气门接口范围留在批准段。 |
| C4 批量 | 真实 P28 首图+pilot/repeat服务 → 每料号原子字段 → 首件/检查/释放三阶段（原独立记录列表按阶段归入） → P34/P30 → 重复订单/包装 → RFQ。 | 每料号定义列表、三阶段横列转纵向；完整料号/版本/数量/材料状态/外观/接口/追溯字段可见。无统一阈值放相邻条件，预测不等于 PO 保留。 |
| C5 来样 | P23 真实样件+可启动评估 → Retain/Resolve/Approve → 测量/重建/制造定义三阶段（sampleOutputs 与 material table 按阶段合并） → 首件验收 → RFQ。 | 手机短说明后直接样件，三阶段垂直显示输入/输出/批准/未知项。没有重复的样件主图。 |
| F 工厂 | 杭州按图原型/小批量+真实全景/事实 → 经验与有条件参考产能 → 三种设备实景及尺寸/装夹输入 → 四检查阶段+来料约定 → 真实 CMM 与方法 → 订单记录 / 供应商资质 → 包装交接 → RFQ。 | 桌面大实景与分层信息；手机定位→事实→图，方法先读再看 CMM。连续三套长表改为阶段和定义列表，不用灰色大卡片收尾。 |

## 内容、事实和责任留存

- 完整 `orderConditions` 只显示在同页 RFQ：1 piece 起订；7–14 business days；drawing and order confirmation 后；含 finishing；shipping additional；数量与要求需 quotation 确认。工艺/材料/项目首屏有直达锚点；来样另加 reconstruction / drawing approval timing separately。
- MaterialTable 的 name / grades / finish / review 仍全部直接取原数据；精确 alloy、standard、temper、stock condition、heat treatment、masking、final dimensions、conditioning 未概括吞掉。未知材料可按使用条件询价。
- Acceptance 保留全部原 check rows + capabilityRedesign edits/extras；±0.01 mm 引用及具体适用条件照常呈现。scopeQuestions 并入验收下方，删掉独立重复段；5-axis indexed / simultaneous 分别保留在几何判断模块。
- 铜/黄铜 electrical / thermal / sealing 功能及 declaration availability、独立 test methods / limits 保留；塑料温湿度/conditioning/filled grade、PTFE 实体与处理的原始语义保持。
- Prototype 批准者、测试方法/责任、未能从替代材质推及生产的结论、下一版审批保留。最终字段比对后，将基线 6061、7075 明确留在同页 Material and process differences：铝材候选选项，须评审 temper、evaluation requirements 和 intended production specification。详细材料内容仍链接材料详情。
- Batch 每料号 batchReleaseFields 原字段全保留，独立记录清单按 first-article / sampling / release 阶段嵌入；记录包括 dimensional、in-process/final、material/finish traceability、deviation、release date/approver。
- Sample 的照片只支持初审，几何测量不确立材料/处理/原设计公差/拟定配合；隐藏几何、wear/damage、文件格式与批准权限仍显式可见。
- Factory 保留 2017、Hangzhou、1,500 m²、40+ machining and supporting units、15+ years、100,000 small parts/month reference。产能变化因素、统计期/班次/组合/当前记录待确认未删除；照片不验证当前数量、面积、人头、产能。
- Factory 保留未公开最大包络、machine travel/load、clamping/tool/fixture access、支持设备计数、照片不证明 simultaneous motion；inspectionStages、measurementMethods、orderRecords、qualificationFields 的所有原字段可见。ISO声明保留，具体证书版本/编号/issuer/validity/scope/verification 要 current certificate；加入 profile quality-system 和 documents 链接。
- 所有 RFQ 继续既有带上下文 quoteHref；明确只是 draft，用户在邮箱附图并发送。没有增加网站附件上传或已发送承诺。
- Factory 原 aliases map 和 hashchange script 保留；原直接 anchors（workshop/equipment/quality/documents/delivery/inspection-process/inspection-equipment/measurement-methods/inspection-records/order-documentation/quality-management/workflow/order-deliverables/prepare-rfq/order-conditions 等）保留。能力页既有业务主锚点保留。

## 应用迁移

`company.ts` 未修改。Profile agent 移除长应用块后，本页按已批准归属承接：
- milling #engineering-fit：agricultural machinery 的 operating conditions；semiconductor 的 cleanliness/chemical/ESD 与测试文件。
- turning #engineering-fit：medical / industrial 的 equipment drawing、material、inspection、intended use/functional requirements/application approvals。
- 5-axis #engineering-fit：robotics mounting/sensor/bracket/clearances/access；fan/impeller material/inspection/access 与 separate balance/rotor validation；aerospace/defense drawing/traceability/end use/export。
- prototype #engineering-fit：automotive/motorcycle design/assembly development，vehicle performance 与 pressure/functional tests separate。
- 页面说明上述是 review requirements，不转化为行业认证或客户案例。

## 主图与证据

真实主图统一通过 `partDisplay` → `productsEditorial.partVisual` 获取，沿用 source provenance，整件 contain 不做生成替代：
- Milling P00（根 Agent首轮截图反馈后换成完整单件；P01保留在实例和目录）；Turning P19；5-axis P02；Casting P22；
- Aluminum P13；Stainless P32；Copper/brass P27；Plastic P26；
- Prototype P13/P12/P15；Batch P28（后续 P34/P30）；Sample P23。
- 目录按方案 P01/P32/P02/P22。能力页剩余例图自动排除已经用在 hero 的同一 slug。
- 原始工况继续 `CapabilityEvidence`：two-stage-first/second、turning-operation/secondary milling、five-axis-machine-wide/parts、milling-enclosure-operation/parts、plastic PTFE originals 和 3 秒 PEEK clip。铜页根 Agent确认 hero 与 metal-brass-batch 重复后，删除下方重复图，保留全部 thread/access/finish/functional test 文字为相邻判断；完整原始批图仍在首屏。5-axis 仅使用已有 `/media/product-sources-20261015/p02-hub-detail.webp` 局部解释 hub/blade roots，不等同 roughness/test。
- Factory workshop-wide、workshop-operators-2025、三种设备图、cmm-room 均真实。CMM 从检查阶段旁移到方法段；旧生成 inspection-concept 不再占工厂证据版面。
- 新正式概念图来自根 Agent ImageGen：`/media/editorial-rebuild-20261015/milling-geometry-{480,800,1200,1448}.webp`、`turning-geometry-*.webp`、`finish-comparison-*.webp`。分别接 milling feature review、turning feature review、aluminum final finishing；src=1200、srcset 四档。1448×1086 / 1448×965 / 1448×1086，均标 AI-generated illustration。未用于 workshop/study 或检查证据。
- 本 Agent 已实际 view_image 看完上述三张 800 图：铣削腔/孔/内角，车削肩/槽/螺纹/横孔，裸件与处理件对比；构图可支持该解释。其余现有原图检查已记录独立审查报告。

## 检查与待反馈

- `npm run check`：946 files，0 errors、0 warnings、9 hints（旧 unused/deprecated 提示）。
- impeccable craft-floor detector 已对十个主要 component/style 执行一次：结果 `[]`。这是静态检测，不代表视觉验收。
- 没有运行 build 避免与根 Agent 全站构建冲突。没有部署。
- 已向根 Agent交付 milling、copper、prototype-machining、starting-with-a-sample、Factory 代表路径。共享结构已应用其余能力页，真实 D/M Playwright 反馈由根 Agent记录；本记录不把未看页面宣称视觉完成。
- 根 Agent授权范围例外后，已将 `src/pages/capabilities/[slug].astro` 与 `starting-with-a-sample.astro` 的 articleImage / Service schema 与当前真实hero同步。

## 第一轮浏览器反馈修订

根 Agent实际看过 milling / copper / sample / factory 1440 全页与 390 首屏，报告结构/参数可读、无溢出。依据其反馈完成：milling P01九件拼图退出首屏，改P00单件（本Agent实际看原图）；真实件图注由长免责声明缩为实际来源身份+名称，AI背景标记仍保留；copper去重复完整批图；Factory桌面改3:7事实/原比例实景，取消cover硬裁，移动保持完整画面。未据此宣称其他未看页完成。

