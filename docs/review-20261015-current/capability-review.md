# Home、Capabilities、Factory 当前源码与素材独立评审

日期：2026-10-15。范围：当前 `src/pages/index.astro` → `HomeApproved.astro`；`CapabilitiesDirectory.astro`；`CapabilityRedesign.astro` 调度的 4 个工艺页、4 个材料页、3 个项目阶段页；`FactoryRedesign.astro`。只写报告，未改业务代码、图片、规范，未部署。本文基于当前源码、当前素材登记、直接查看 13 张在用图片、9页桌面首屏、9页手机首屏及8张正文视口。早期桌面全页捕获存在拼接与图像空白问题，已改用可靠视口重采；不以旧异常图证明页面缺图或内容重复，不把 CSS 推断称作实测。具体查看范围和仍存限制见第11、12节。

## 1. 结论与当前证据

当前首页已经清楚写出 `Custom CNC parts / Made to your drawing`，下一句也写了 milling、turning、5-axis、prototypes、small-batch。问题不是缺少业务定义，而是首屏之后，零件、工艺入口、材料入口、设备事实、检验要求、加工案例各讲一段，没有持续围绕“我的零件能否交给你加工”形成递进。能力页比首页更严重：长篇图纸/验收要求常出现在零件与工艺实图之前，买家先读采购作业指引，再看到服务形态。

当前图片不是一律失真。首页切削示意图已明确呈现刀具接触工件；Factory 的测量示意图已有探球接触孔壁；P02 叶轮已经来自原始产品图，另有真实局部裁切。不能继续把旧版未接触刀具、虚假叶轮重建或被替换的产品图当作现状。真正还存在的视觉问题是：照片的原始白底、手持现场、浅灰背景、竖幅机床、AI 示意被按近似模块尺寸并排；图的证明用途、视觉主次和内容推进没有一起设计。

现有源码的具体负担：

| 当前位置 | 现有内容与问题 | 处理判断 |
|---|---|---|
| `CapabilityProcessPage.astro` | Intro → Acceptance → technical-explainer → Examples → Materials → Practice → Questions → Inquiry。`CapabilityAcceptance` 的 geometry.text 又在 technical-explainer 附近解释一遍 | 将实例和主要加工判断提前；将几何说明、装夹输入与验收表合成同一“这个零件怎么评估”模块 |
| `CapabilityIntro.astro` | 工艺服务、图纸要求、完整 1 件/7–14 天条件、页内导航连续出现；材料页右侧又重复“exact grade/condition/finish” | 首屏只给业务对象、服务范围、下一步；完整时间条件放询价区并提供短入口；材料规格的唯一主区放材料选择处 |
| `CapabilityMaterialPage.astro` | 牌号表 → 实例 → 工艺说明 → 验收表 → 单独确认事项；铝、铜、塑料反复出现 finishing / interfaces / separate tests | 把材料、用途、工艺后状态、验收条件对应到同一个决策链；特殊测试放对应行，不再另起重复概念 |
| `CapabilityInquiry.astro` | `page.inputs` 列表后又渲染 `page.content.rfq` 两段，反复要求 drawing、revision、material、quantity | 保留一份完整清单和一个页面特有输入区；删去同义重复段落，不能删输入字段 |
| `CapabilitiesDirectory.astro` | 工艺 4 列表、材料纵向行、阶段三张各含 4 个字段的长卡片；目录像培训手册 | 目录负责选择；规格输入细节迁入详情页或 RFQ checklist |
| `FactoryRedesign.astro` | inspectionStages、measurementMethods、orderRecords、qualificationFields 连续展示；“agree / confirm / request”贯穿多数段落 | 先回答工厂有哪些现场与资源，再解释订单怎样被验收；保留详细审核字段，但不要让它们占据每个首层模块 |
| Home `.hm-quality` | 250px 左右竖幅 CMM 和一栏检验文字夹在双栏证据区内；手机又先完整设备照片再文字 | 降为一张有用途的小证据图；质量承诺与工厂事实用同一阅读块，不让竖幅图打断首页节奏 |

## 2. 内容来源与不能消失的条件

当前路由分支由 `src/data/redesignRollout.ts` 确认：`/`、`/factory/` 和整个 `/capabilities/` 已启用当前组件。`/factory/workshop/`、`/factory/quality/` 用 `FactoryLegacyRedirect.astro` 转到统一 Factory 页，不能再把它们列为需要重新设计的独立长页。

内容数据的实际链路：`capabilityRedesign.ts` → `capabilityDesign.ts` → `serviceReading.ts`、`capabilityContent.ts`、`capabilityOverview.ts`、`capabilityEditorial.ts`。`capabilityReading` 当前覆盖 design.lead，但 `CapabilityIntro` 第二段仍显示 `page.content.description`；不能只改 reading.description 就以为页面文字已改。`capabilityDesign` 中旧 modules/hero 计划也不是当前五个 family 组件的最终 DOM 顺序。

业务事实依据当前 `docs/claim-ledger-2026-09-25.md` 与在用数据；该文件用于核对声明边界，不采用其中历史设计结论。

| 信息 | 最终必须出现的位置与完整条件 |
|---|---|
| 1 件起订 | 首页 RFQ、目录订单提示、每个详情页 RFQ；不是“经济批量固定为 1 件” |
| 7–14 个工作日 | 图纸与订单确认后生产，包含表面处理；运输另计；具体数量与要求以报价确认。来样的重建/图纸审批时间另议。不能只留 `7–14 days` |
| ±0.01 mm | 仅铣削页对应关键特征的条件参考；材料、几何、装夹、测量方法评估后，按图逐特征确认，不扩成全站统一精度 |
| 工厂事实 | 2017、杭州、1,500m²、40+ 加工及支持设备；团队 15+ 年不是公司成立时长；100,000 件/月仅参考产能，保留几何/材料/后处理/订单组合和统计证据待核对条件 |
| ISO 9001 | 可以写已认证；当前证书编号、版本、范围、发证机构和有效期仍需索取核对，不用企业荣誉图代替 |
| 工艺边界 | 五轴 indexed 与 simultaneous 按模型与空间评估；最大包络/行程/负载未发布；车削附加孔槽可需后续铣削；铸件后加工不等于包办铸造；实拍不证明具体新订单结果 |
| 材料 | 牌号、标准、状态、填料、热处理和可供性逐图确认；不能从照片认定材料性能；C3600/C36000/H62 不默认等同；实心 PTFE 与金属 Teflon coating 不混为一项 |
| 验收 | 基准、关键特征、方法、抽样、处理前/后状态、记录、偏差批准人保留；压力、泄漏、导电/导热、平衡、汽车/食品/医疗/电性能等单独方法和限值，不变成默认服务 |
| 询价动作 | 全部仍是准备邮件草稿，用户在邮箱附图并发送；不写网站已收件、自动上传附件或 SLA |

重复内容可以迁移，但事实条件必须与其数字、能力声明或 CTA 相邻。不能把所有条件藏在统一页脚、只留免责声明链接。

## 3. Home 最终模块与迁移

| 顺序 / 最终模块 | 要回答的信息、当前来源 | 合并或迁移 | 桌面 / 手机结构 |
|---|---|---|---|
| H1 来图加工定位 | 当前 hero 标题保留；一句讲清加工工艺、原型与小批量；RFQ 主动作和零件浏览次动作 | hero 长度不再增加；首屏可补短 `From 1 piece`，完整时间条件留 H5 | 桌面文案 5/12 + 单图 7/12；手机标题、说明、动作、单图，图高约一个内容段而非整屏 |
| H2 能做的零件与工艺 | 现有 4 个零件 + `primaryServices`；每个实物旁只讲“形态/主要加工特征/对应路线” | `Find a familiar part form` 与 `Choose a process` 的主要判断并在此；材料作为紧凑入口，不另设同等强度大区 | 桌面 4 项一行但图片按可辨识尺度；手机 2×2，每项两行内解释。提供 4 工艺文字入口，塑料只在材料或明确交叉标注位置出现 |
| H3 一组真实加工记录 | 现有 studies 两个入口、真实装夹照片 | 从两个同权宽图改为一个主案例+一个次入口；建议主推 `two-stage-cnc-milling`，因为同一零件两工序关系明确。29-inch 与 turning/milling 两项仍可列为次链接 | 桌面实图 7/12 + “加工对象/两次装夹为何需要/更多记录”5/12；手机图→两句解释→入口 |
| H4 杭州工厂与验收能力 | facts + workshop-wide + CMM + ISO 文案 | 合并现有 hm-facts、hm-evidencegrid、hm-quality；完整检验规划迁 Factory，首页只讲“关键尺寸与记录随订单约定” | 桌面一张工厂主图、3 个数字、一组质量短说明；手机事实两列，车间图，质量短行；CMM不再独占长竖区 |
| H5 提交完整加工需求 | 现有 RFQ 清单、订单与时间条件、草稿行为 | 合并材料精确牌号提示和来样入口到“有图纸 / 只有样件”两种状态，统一到 RFQ 或 sample route | 桌面准备信息与动作两栏；手机清单、完整时间条件、按钮、草稿说明连续出现 |

首页不需要额外介绍每种材料的性质，也不需要把 Factory 的供应商审核字段搬上来。现有 Home 的四个素材标签应逐字核图：P26 实图是多件绿色长方零件，主导特征为重复孔与台阶；`thin connecting sections` 不宜作为这张图的主要视觉说明，改成 visible repeated bores / stepped faces 更直接。

## 4. Capabilities 目录最终模块

| 顺序 / 模块 | 信息及当前来源 | 合并迁移 | 桌面 / 手机 |
|---|---|---|---|
| D1 一句业务定位与三种入口 | current intro：features / material / information available | 删除重复 `Start with the part requirements` 泛标题；直接写“Choose the machining route for your part”，保留 CNC machining H1 | 桌面小型真实零件组合+文案；手机直接显示三条入口，无大图挡路 |
| D2 四种加工路线 | `processFit` 的 4 工艺：milling、turning、5-axis、casting machining | 从 4 列长表转成 4 个路线行；每行只留“零件/特征一句+查看路线”；`information to provide` 移详情/RFQ；塑料从工艺重复项移入 D3 | 桌面 2×2 或四条图文行，统一一张代表实物；手机一条图文行一个路线，不能四列横滑 |
| D3 四材料族 | `materials` 的 Aluminum / Stainless / Copper & brass / Plastics | 保留精确 grade / temper / fillers 提示为一行总说明；每项一句区别；牌号表在详情 | 桌面四项轻量行；手机两列标题+缩略图，避免每卡三段说明 |
| D4 从图纸状态选路径 | `stages`：原型、批量、来样 | 四字段卡片压成“现状→下一步”两句；revision/quantity/approval 明细移到对应详情页 | 桌面 3 个流程入口；手机 3 行，不做复杂横向流程 |
| D5 真实记录与 RFQ | `source-records` 及 enquiry | 加工实拍和检验入口合为底部证据带，清单只留一份；订单完整条件放这里且首屏短链接可达 | 桌面一个真实加工图+Factory入口，随后 RFQ；手机顺序相同 |

## 5. 工艺 family：4 个页共同最终模块

以下不是四页复制相同段落；固定的是买家判断顺序，各页技术信息见后表。

| 顺序 / 模块 | 内容来源与合并规则 | 桌面 / 手机 |
|---|---|---|
| P1 服务与代表零件 | `CapabilityIntro` 的 title、lead、description + 当前 Examples 的 1 个主零件；一句“适用什么形态”，另一句“交图后评估什么” | 桌面短说明+主实物，手机标题/说明/图/CTA。车削、五轴、铸件当前纯文字首屏可在这里加入真实产品主图 |
| P2 典型形态与路线判断 | `CapabilityExamples` 剩余 2–3 例；`plan.geometry`、`overview.workholding`、五轴 route-choice；取消独立技术解释重复 | 桌面 2–3 个图例，紧接两栏“关键形态/装夹与访问”；手机一图一解释，不先读长表 |
| P3 真实加工或范围流程 | `machining-studies`、steps、studyLinks；真实可连贯记录留图；铸件没有连续过程记录则保留三步范围说明 | 桌面一主一辅，图下直接讲当前步骤；手机按步骤连续；图库作为补充入口 |
| P4 材料、表面处理与关键验收 | `CapabilityMaterialTable` + Acceptance 的图纸/生产前确认行；页内区分“材料选择”和“关键特征”两小组，避免两张都像大手册 | 桌面材料紧凑表 + 特征三列；手机每个特征一组（特征→你提供→双方确认），默认可见关键条件 |
| P5 询价与特殊范围 | `ScopeQuestions` 放进对应 P2/P4 行；仅不能归入的例外留简短问答；Inquiry 去同义重复；完整 orderConditions | 桌面清单与动作两栏；手机一份清单和一个按钮，保留类别上下文参数 |

| 页面 | P1/P2 实物与具体信息 | P3 工序证据 | P4/P5 必须保留的差异 |
|---|---|---|---|
| `/capabilities/cnc-milling-service/` | P01 blocks、P04 多面零件、P33 housing；平面、口袋、孔阵列、内圆角、薄壁 | `two-stage-first`、`two-stage-second` 明确同一零件不同装夹；保留 study link | 材料四族及 titanium 条件；选定关键特征 ±0.01 mm；内角工具限制、许可圆角变更、处理后验收、洁净/化学/ESD 单独定义 |
| `/capabilities/cnc-turning-service/` | 当前实际 parts 被 `turningPlan` 覆盖为 P19、P06、P07，不按旧 `capabilityExamples` 的 P05误报；轴、套、法兰、接头；共同轴线、肩、孔、螺纹 | `turning-operation` + `turn-mill-operation` 是独立参考，不称同一订单连续追踪 | NPT/BSPT/metric 不能混同；径向/轴向尺寸、跳动、偏轴孔/槽、密封与毛刺；最大尺寸逐图；secondary milling 条件 |
| `/capabilities/5-axis-cnc-machining/` | P02主图/真实hub裁切，P00、P11、P04例；弯曲叶面与多面访问两种不同任务 | `five-axis-machine-wide` + `five-axis-parts`；单帧不能证明联动路径 | indexed/simultaneous 仅讲选型差异；成品/毛坯尺寸、重量、夹持禁区、空间；Al/Ti/Nickel alloys/SS精确条件；轮廓/位置、模型版本、平衡/泄漏单独、最终用途与追溯 |
| `/capabilities/casting-machining/` | P18、P22、P24；毛坯整体与需要精加工的孔、密封面、基准面分开 | 当前三步文字与 casting-stages AI对比图可并为一块；不造“原始毛坯到成品”的实拍前后对应关系 | 毛坯供方、来料验收、余量、偏差、废品责任、定位靶、内部截面；压力/孔隙/NDT单独；来样重建独立范围 |

## 6. 材料 family：4 个页共同最终模块

| 顺序 / 模块 | 当前来源与迁移 | 桌面 / 手机 |
|---|---|---|
| M1 材料与零件用途 | Intro + 代表实物 + `content.description`；首屏先讲能加工什么；删重复规格侧栏 | 桌面一张材料族实物+两句服务说明；手机图和文字上下排 |
| M2 牌号如何确定 | MaterialTable 的 name / grades / finish / review；铜的 function-review 并入表前；塑料工作条件并入相应牌号行 | 桌面一张明确表；手机按牌号组转换成定义列表，不横向缩字体 |
| M3 形态与加工要点 | Examples + material-practice/workholding；同一零件图紧邻工艺要点；保留一份真实工况图或样件记录 | 桌面主产品与工况 7/5分栏；手机同一主题连续，不把所有图堆完再讲条件 |
| M4 最终状态与验收 | Acceptance + finishing + ScopeQuestions中相关内容合并 | 桌面 3 个主题行，手机各行按“指定→检查”顺序；特殊功能测试在对应主题旁 |
| M5 RFQ | Inquiry 去重复，保留完整订单条件，材料未知可填应用约束 | 桌面清单与动作；手机顺序清单，绝不要求未知牌号用户先自我筛退 |

| 页面 | M1/M3 实图和主题 | M2/M4 差异与保留 |
|---|---|---|
| Aluminum | P13手持 cover、P33、P30；`milling-enclosure-operation`与`milling-enclosure-parts`同源组，不能凭照片推定完整订单验收 | 6061/6063及T6/T5、7075、2024/5083、冷却样件3003；薄壁支撑/平面度；阳极氧化、喷砂/拉丝/抛光、conversion coating/powder coating适用性；遮蔽配合面和后处理尺寸；焊接/外供组件及压力/汽车性能另定 |
| Stainless steel | P19、P31、P32；用真实零件串联 working diameter → thread → sliding fit；现有 workflow 是文字步骤，不假造车间连续记录 | 303/304、316/316L、17-4PH状态、SUS430/SUS440；不默认互换；钝化/电抛光；热处理后尺寸、跳动、毛刺、锁止机构供货/功能范围 |
| Copper & brass | P27 + `metal-brass-batch`，一张主实物足够，不把单例拉成三卡空架 | 先分 contact / heat transfer / fluid sealing；标准牌号不可互认；完整螺纹、通道、密封面、镀层、受限物质声明可供性；导电、导热、压力测试方法限值独立 |
| Plastics | P21、P29、P26；PTFE中间件/长轴、PEEK 3秒原视频；每个来源标签随图保留 | PEEK/PTFE/polyimide；Nylon/PA6/PA66、POM/Delrin；PE/HDPE/UHMW/PP/PVC；Acrylic/PC/ABS；填料与牌号；温湿度/conditioning、压配/嵌件/薄壁/载荷；PTFE实体与涂层区别；食品/医疗/电气证据另定 |

## 7. 三个项目阶段页：不同任务，不再堆通用工艺表

| 页面 / 最终顺序 | 当前来源、归并与最终信息 | 桌面 / 手机 |
|---|---|---|
| Prototype：R1要验证什么 → R2相关实物 → R3本次交付与审批 → R4量产差异/下一版 → R5RFQ | R1 用当前明确 evaluation purpose；R2把 P13/P12/P15 从四列表后提前；R3 `prototypeApproval` 四列改为3阶段，每阶段输入/交付/批准人清楚；R4合并 generalMaterials、材料替代说明与 next-decision，只列相对量产的差异，不再复制完整四材料说明；汽车性能/压力和 supplied joints/scope 保留 | 桌面 R2 一大两小但 P15原图480px不能放大；R3三列阶段；手机 R2各图短说明→R3垂直阶段，版本/目的/负责人持续可见 |
| Batch：B1批量服务 → B2每个料号清单 → B3首件批准与抽检 → B4实例/重复与包装 → B5RFQ | 现 `Each part number…` 太像内部口号，可用明确服务句；`batchReleaseFields`全保留，压成可读5字段；`cx-batch-approval`步骤与右栏记录列表合并，按阶段附记录；P28/P34/P30并在同一实例区，明确是不同形态非一批交付；`repeat-and-packing`保留但删重复“approved revision”段，当前包装待确认不是缺图错误 | 桌面一个料号说明表+三阶段释放流程，样件小组合；手机字段逐项，不能把四层列表叠成长篇。无通用low-volume数量上限；预测不替代采购数量 |
| Sample：S1现有实物可启动 → S2保留/澄清/批准 → S3可交付的定义 → S4首件验收 → S5RFQ | 保留当前关键句 `A sample can start…`；把S2样件P23与三组问题并排；将 `sampleOutputs` 与 `CapabilityMaterialTable` 合并：每阶段明确几何、材料/处理未知项、文件格式和审批权限；S4保留 Acceptance 首件检查，重复生产需等待批准；不同于把测量等同于已确认材料/公差 | 桌面P23竖图+三项review，随后3阶段输出；手机先样件和问题，再输出。重建与图纸批准时间单列，不埋在7–14天之后小字中 |

## 8. Factory 最终模块

| 顺序 / 模块 | 当前来源、迁移与保留 | 桌面 / 手机 |
|---|---|---|
| F1 真实工厂与业务范围 | `fx-intro`、workshop-wide、factory facts | H1后一句 `Custom CNC machining in Hangzhou for prototypes and small production runs` 提前，移掉更泛的 `Review the workshop, the checks and the records`。主图带地点/来源短注 | 桌面完整横向现场+紧凑业务说明；手机标题说明→主图→页内入口 |
| F2 工厂规模与设备适配 | `fx-fact-list`、workshop-operators、equipment-fit输入 | 事实用2017/面积/设备三项，15+年团队和参考产能作为第二层说明，完整条件紧邻；机型/尺寸/重量需求放设备模块末尾，避免再向首屏施压 | 桌面三事实+一张次现场；手机两列事实后单段条件；参考产能不能成为无条件大数字 |
| F3 三种机加工资源 | `workshopMachines` 3项实拍+features/parts | 每项现有两段改为一句“加工什么特征/零件”，对应能力链接；全部size/fixture/protected surfaces集中一个fit区 | 桌面3图但保持各自比例，允许宽窄不同；手机每个图+标题+一句+链接一起走，不固定全部320px高 |
| F4 订单检验怎么安排 | `inspectionStages` + `measurementMethods` + cmm-room | 主体四阶段；每阶段只讲检查目的/批准关口/记录；仪器方法作为横向补充短表，current calibration独立申请；不再出现两张占同等篇幅的大表 | 桌面流程7/12 + CMM证据5/12，方法短表跨栏；手机先流程再仪器，CMM最高约320px。AI接触示意降为可选方法解释，不占主证据位 |
| F5 需要索取哪些文件 | `orderRecords` + ISO/qualificationFields | 分“订单记录”和“供应商资格”两组；4记录行内容/关联字段可合并；ISO证书申请保留；企业荣誉仅链接公司页 | 桌面2栏；手机同一文档一行说明+索取动作。不能用空白证书字段当成真实证书内容 |
| F6 交付与供应商/零件询价 | delivery list、packing-pending、inputs、quoteHref | 包装保护/标识/记录/责任四要点合为交付清单，待确认包装样例作为一段而非大灰块；RFQ提取6项输入合并重复描述 | 桌面交付与RFQ连续两层；手机单列，按钮后明确草稿行为；原anchor aliases保留 |

## 9. 重要图位、当前路径、来源与构图处理

以下是后续编辑建议，不表示本次已经处理。产品 P-ID 精确源文件见 `src/data/productSourceMedia.generated.json` 的 source/listing/operation/nativeWidth；实拍见 `evidence.generated.json`、`additionalMedia.generated.json`，页面实际还有 `responsiveImages` 与 `photoFrame` 处理，不能仅据登记宽高判定展示方向。

| 图位 | 在用路径 / 来源 | 决策与具体构图 |
|---|---|---|
| Home hero | `/media/redesign-20261015/machining-hero-1200.webp`；AI，实际查看800版本 | 可保留作工艺解释。刀具、切削口袋与夹具已完整可辨；不应再生成同类图。保持4:3，左下夹具可略降视觉权重但不裁断受力关系；图注保留 AI illustration。若改成真实工厂定位，可用 two-stage-first，不要把AI直接改标签 |
| Home四零件 | `/media/product-sources-20261015/p02-1200.webp`、`p22-framed-1200.webp`、`p32-framed-1200.webp`、`p26-1200.webp` | 已查四张。叶轮主体大、铸件方形偏灰、锁销横向且原630×420、绿色件重复排列。通过容器padding和物体可视面积统一，不用AI补金属纹理。叶轮/铸件按方形contain；锁销横向保留两端；P26保留群组完整并收紧空白。白底容器尽量与原图一致，避免灰底套白方片 |
| Home/Factory车间 | `/media/evidence/workshop-wide-1600.webp`；原始 `10，Producing Department-生产车间/1 (7).jpg` | 保留。当前原图天花占较多，但车间连续机列和通道清楚。桌面可裁少量顶部空白，保留地面通道及左右机列；手机保持原比例或轻裁，不能为了hero高度截掉主要机体 |
| Home/Factory CMM | `/media/evidence/cmm-room-1600.webp`；原始 `1 (84).jpg` | 保留真实设备证明，原图竖幅、上部空墙较多；可仅裁空墙/边地，必须留横梁、探头、工作台与设备基座相对关系。首页减小角色，Factory保留能看清仪器。不要改造为正在执行当前订单检验 |
| 铣削两工序 | `/media/evidence/two-stage-first-1600.webp`、`two-stage-second-1600.webp`；产品6同零件2工序源组 | 保留一组双图；第一张已查看，零件在中央但夹具占大幅，正好解释装夹。裁切保留刀具、零件、夹持接触；不只裁成成品特写；图下用一步一句解释 |
| 五轴主零件 | `p02-1200.webp` + `/media/product-sources-20261015/p02-hub-detail.webp`；原图 `5-axis-Machining-1-1764418510957--4b51164023.jpg` | 保留整体为主、局部为辅。原800×800，不放到超宽满屏；局部480×320只作小图。可以加HTML标注hub/blade/root，不改真实纹理；纹理不推定粗糙度 |
| 五轴工况 | `/media/evidence/five-axis-machine-wide-1600.webp`；产品1五轴源组 d3928…jpg | 已查，实际展示为竖幅，刀库和主轴占上半，转台与工件在下半；适合窄竖栏，不适合全宽横hero。保留主轴、转台、夹具和工件，不裁成只有一个金属块；不称照片证明联动五轴 |
| 车削 / 铝工况 | `/media/evidence/turning-operation-1600.webp`、`milling-enclosure-operation-1600.webp` | 由registry确认，后续采用前仍需主Agent逐图视觉；工况承担“怎么加工”的证明，原件图承担“做什么”；不并排成两张没有标题关联的图库 |
| 铝与原型 cover | `/media/product-sources-20261015/p13-1200.webp`；原1080×814手持来源照片 | 已查。手和地面为真实尺度/现场信息，保留照片语境；不要与白底件强行等宽做整齐商城。用于一张主样件并配“曲面cover/接口待图纸定义”；若要白底目录效果，优先请求补拍，不生造缺失背面 |
| Plastics P29 | `/media/product-sources-20261015/p29-framed-1200.webp`；原主体+AI neutral background | 已查现图是绿色圆盘/周边凹槽形态。不能使用旧 `partPlans.alt` 的 rectangular block 描述判它为方块；当前 `partVisual` 使用来源身份。保留 origin 标签，图注准确说原主体/AI背景，不能称未编辑原始照片 |
| 铜/塑料实拍补充 | `/media/source-details/metal-brass-batch-1200.webp`、`plastic-ptfe-intermediate-1200.webp`、`plastic-ptfe-shafts-1200.webp` | 真实来源组、材料名遵来源。铜批次说明数量形态但不证明供货批量；长轴保持长形不裁两端；当前图位固定高度应改为比例和最大高度协作。PEEK视频保留controls、3秒标注、手动播放 |
| 目录四类组合 | `/media/capabilities-section-20261014/capability-family-1200.webp` | 已查是一组整洁白底AI壳体/轴/铜件/塑料件，可作辅助说明但信息与目录各项图重复。建议退出目录主图位，以现有真实P01/P19/P27/P26组合替代；只做版面组合，不声称同一订单 |
| 铸件/来样示意 | `/media/services-reading-20261014/casting-stages-1200.webp`、`/media/capabilities-section-20261014/sample-definition-1200.webp` | 仅解释步骤；若保留，图上对应blank→interfaces或sample→approved definition，不能给虚构尺寸/图号，不用作真实前后案例 |
| Factory测量示意 | `/media/redesign-20261015/inspection-concept-1200.webp` | 已查，探球与孔壁已有可见接触，工件支撑可辨。可保留为小型方法解释，不能再报告“悬空测量”旧问题；主要检验信任仍来自原始CMM与可申请的当前记录 |

`p29` 的 backgroundEdited 为 true，其余本次列出的首页/主要产品登记为 false；false 仅表示当前该处理流程未换背景，不自动把所有源材料性质统一叫“LZZ交付实拍”。仍须遵 `productIdentity` 的 source/cad/assembly等来源分类。

## 10. 可执行验收标准

1. 首页首屏能读出“杭州定制CNC零件、来图、原型/小批量”，第二屏能把实际零件与至少铣削/车削两种路线联系起来。
2. 每个工艺/材料页在首个长验收区之前，必须看到一个对应真实零件及一句具体用途；每一段技术要求只能有一个主要归属，重复只保留必要短提醒。
3. 同一模块内图、标题、说明回答同一个问题；原始现场、产品来源图、AI示意各有明确图注，不能通过视觉统一改变来源事实。
4. 手机关键字段默认可见，不靠横向表格或多层折叠才能看到材料、数量、关键尺寸、时间条件及草稿行为；术语/牌号不因为精简而缺失。
5. 保留现有路由、Factory aliases、询价上下文、RFQ行为、材料特性和完整条件；新文案不扩张认证、库存、最大尺寸、出货/客户成果。
6. 后续实施应按 Home、一个工艺样页、一个材料样页、一个阶段样页、Factory 检查桌面与手机，再扩展族内差异；本报告只提交结构与素材决策，不视为已经实施或通过浏览器验收。

## 11. 本次实际查看的浏览器画面与补充意见

实际查看 `screens/home-mobile.png`、`capabilities-mobile.png`、`milling-mobile.png`、`copper-mobile.png`、`prototype-mobile.png`、`sample-mobile.png`、`factory-mobile.png`，均为主评审保存的390 CSS px手机首屏。只以首屏可见范围为依据，未据此声称看过下方完整表格、脚部或交互。

| 手机首屏 | 实际可见现象 | 对方案的影响 |
|---|---|---|
| Home | 业务标题、工艺范围、CTA和实际切削示意均能在首屏内理解；H1三行，按钮后次链接独立一行；底部才到下一模块标题 | 保留这个明确的业务句，不因“看不懂做什么”重写成更抽象口号。首屏不是最紧迫问题；优先把第二模块产品和工艺关系连起来 |
| Capabilities | 先H1和两层说明，再四条垂直入口，再AI零件组合；首屏还未看到任何具体工艺路线 | 目录开头入口本身可读，但“选路线”要继续下滑。将四工艺行提前，去掉入口之后重复的概念图或缩为更小辅助图 |
| Milling | H1、lead、第二段、完整时间条件、三条导航先后占据首屏；图从下部才出现，实物例更远 | 说明不是字号太小，而是每层都占独立段落。首屏应压成服务对象一句+CTA+实例；完整时间条件迁询价区并可快速到达 |
| Copper | lead与紧随描述再次重复 contacts/fittings/connectors；完整时间条件后，又开始 `Start with the specification` 侧栏下移的文本；首屏没有零件图 | 最明显的分散案例。删除同义复述，右栏的精确牌号提示并入牌号模块；把真实接头图及用途判断提前 |
| Prototype | 任务问题清楚，但三段文字和完整订单条件排在示意图前，首屏只能见图的一部分；通用加工壳体图没有体现页面下方真实cover/intercooler例的差异 | 保留“要验证什么”问题，主图换成真实可理解样件；材料替代与量产差异放交付/审批模块 |
| Sample | 标题、lead、说明、时间条件和重建额外时间连续占据几乎整个首屏，示意图只露顶部 | sample特有条件有价值，但应放成“先评估样件→确认定义”的简短状态说明；完整生产/重建时间放对应阶段或RFQ，避免首次识别就读多段前提 |
| Factory | 业务说明先出现；五个页内入口两行，随后工厂图完整可识别；首屏内容是清楚的 | 不需再造更大hero。调整开头泛化lead和正文重复，后续重点是检验/记录的层级。当前手机图完整保留场景，不能指认为强裁切问题 |

也实际查看过上述7页早期 desktop fullPage 文件；另裁看Home首部、Milling首部、Copper首部、Prototype样件段、Sample连续表格段、Factory设备段。其可见字图位置与源码相符，但文件右侧裁断、Capabilities整段重复、部分未加载图片空白使其不能充当完整视觉验收证据。主评审确认fullPage捕获异常后，本报告不以这些截图认定溢出、缺图或重复DOM。用于查看的6张临时裁片已删除。

## 12. 重采桌面首屏与新增正文证据

第11节提及的7张异常desktop文件随后由主评审重采覆盖，现为实际1309×909 CSS px、保存1295×899像素的单视口画面。本次已重新逐张查看 `home-desktop.png`、`capabilities-desktop.png`、`milling-desktop.png`、`copper-desktop.png`、`prototype-desktop.png`、`sample-desktop.png`、`factory-desktop.png`；新增查看 `casting-desktop.png`、`batch-desktop.png` 及这两页的 `-mobile.png`。此前第11节的7页手机首屏范围保持不变，合计9页手机首屏。

正文实际查看范围为 `home-desktop-body1.png`、`home-desktop-body2.png`、`milling-desktop-body1.png`、`milling-desktop-body2.png`、`factory-desktop-body1.png`、`factory-desktop-body2.png`、`milling-mobile-body2.png`、`factory-mobile-body2.png`。没有扩展到其余路线或未提供的深层截图。

| 重采证据 | 确认的具体观察 | 对最终建议的修正或强化 |
|---|---|---|
| Home desktop首屏 | 标题和范围清楚，右侧切削图已正常显示；桌面标题在当前宽度为三行，图文等权；首屏底部仅到零件区标题 | 保留现有主定位和图的基本关系。图片“缺失”判断撤除；无必要再造一张同类AI主图 |
| Home desktop body1 | 可见四张原始产品图：前三张主体大小不同，P26绿色件相对更小；P02/P22/P26白方底嵌在浅灰矩形里，边界明显 | “不好看”的可复现成因是原始画布和展示框叠加、主体可视尺度不一致；通过裁空白/容器匹配处理，不能改造零件。该截图下方大面积白区和产品标题未显示，状态未确认，不将其列为真实页面空白缺陷 |
| Home desktop body2 | 工厂事实三项清楚；下方车间宽图、窄CMM、窄质量文案在同一横向块内，CMM旁正文每行很短 | 首页证据区需要主次：车间和事实为主，检验说明合并成紧凑行，避免三种宽度叠成窄文字栏 |
| Capabilities desktop首屏 | 概念组合图清晰，但入口、说明、完整时间条件占完首区；具体工艺只出现下一个section标题 | 目录更应该给可点击具体路线；不是图像质量故障，而是图与导航共同推迟实际选择 |
| Milling desktop首屏/body1 | 首屏概念图之后是fit说明；body1完整三行验收表、±0.01条件块，然后又一张口袋示意配route文字 | 两张相似AI几何说明被长表隔开，且真实加工实物仍未出现；合并几何/验收说明并前置实例的建议得到画面支持 |
| Milling desktop body2 | 三个例子实际分别是九个小件的拼图、单一蓝色多面件、绿色工作台上的多件壳体；相同容器中信息密度和摄影语境不同 | 不能只“统一图片高度”。拼图适合作集合入口、单件适合作主例、批次现场适合作真实记录；让图片承担不同角色，比强行三张同权更清楚 |
| Milling mobile body2 | 表格已转为可读的单列分组，每个特征下有 `Specify on the drawing` 与 `Agree before production`，没有从截图看到横向挤压 | 现状已完成堆叠适配，不再建议“修复手机表格”。真正需要的是缩短重复标签/说明、把关键特征与具体实物相邻，降低连续字段的阅读负担 |
| Copper desktop首屏 | 左栏业务对象与第二段复述；右栏再次讲精确grade/condition/finish；下一块马上是用途三行，仍无产品图 | 首屏可合并重复业务句，并把真实接头放到右侧；规格侧栏内容迁到牌号模块。不以加卡片/加图标解决同义重复 |
| Prototype与Sample desktop首屏 | 原型首屏已有清楚“验证什么”问题，后续马上是四列表；来样首屏也清楚表达“样件启动评估、批准定义启动生产”，下方继续retained/resolved字段 | 这些关键任务句应保留。优化只需减少重复的规格/时间段并提前真实例，不应把准确任务重新写成抽象品牌口号 |
| Casting desktop及mobile首屏 | 两种宽度均是纯文字；hero后直接接fit说明，桌面右侧没有图片，手机下一屏标题仍为图纸适配 | 对“看不出做什么”的感受最有直接帮助的是把P18/P22壳体图提前，用图中轴承孔/密封面解释后加工。无需等到读完fit表再看铸件 |
| Batch desktop及mobile首屏 | 标题后是 `Each part number. Each revision. Each release.`；正文首先强调 `There is no universal low-volume threshold`，然后时间条件；图为AI单件/重复件 | 先写明确服务：按批准图纸生产试制或重复小批量，随后说明逐料号管理；无统一阈值保留在报价数量说明处。首屏限制条件不能替代服务说明 |
| Factory desktop首屏/body1 | 车间主图完整有力；规模区是五行事实与人员现场；reference capacity的条件占明显更多行，完整时间条件又在其下 | 主图与三项核心事实保持；团队经验/参考产能降为次级说明并保持全部限制，时间条件归询价。摄影不必全面更换 |
| Factory desktop body2 | 三张工况已正常显示，铣削为横幅、车削与多轴为窄竖幅；图后两段分别讲feature和part form，链接高度略不同 | 真实图应保留；将两段合成具体一句并按工况图比例排版。原图方向差异不是需要AI扩图的理由 |
| Factory mobile body2 | 参考产能条件和时间条件连续在前；下方人员车间图及长来源限制图注，下一模块才到设备 | 内容属于不同任务而挨在一起，形成读条件→看场景→再读设备的停顿。将产能条件归事实、生产时间归RFQ、照片图注缩到可见范围与来源，审核范围完整说明放相邻事实说明区 |

这些重采画面支持“重排内容与调整照片角色”的结论，而不支持“所有照片都需要换成AI图”。现有手机表格、图像contain和明确来源标签已在发挥作用，应在下一版继续保留。
