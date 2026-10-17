# LZZ 网站最终改造方案：先识别零件，再完成采购判断

日期：2026-10-15。本轮对象：`D:/lzz/lzz/_react` 当前源码与 `http://127.0.0.1:4323/` 实际网站。**本文件是重新审查后的待实施方案，不是实施结果、发布批准或生产验收。**

旧同名方案已原样保存于 [previous-plan.md](review-20261015-current/previous-plan.md)。现行 `DESIGN.md` 中“已批准方案”的原链接指的是该历史版本，不能解释为本版已获实施批准。本轮不覆盖 `DESIGN.md`。现有未提交代码和图片属于此前工作，本轮只写方案及审查证据。

## 1. 主要问题与改造边界

### 1.1 最终判断

网站的业务是 **LZZ Precision 在杭州提供按图定制 CNC 零件加工，服务原型和小批量采购**。它不是标准 SKU 商店，也不是把图片中整套设备作为商品出售的网站。主要用户是拿着图纸、样件或功能要求寻找加工供应商的采购与工程人员；第二类任务是供应商资格、订单责任及验收资料核对。

当前首页已经明确写出 `Custom CNC parts / Made to your drawing`，不能再说“页面完全没有业务说明”。真正需要改的是：首屏之后，零件、工艺、材料、验收、资料准备被分成许多同等重量的块；用户需要自己把它们拼成一次采购判断。部分详情页先让人学习如何提交需求，才让人看清能做什么。图片也不是全库质量差，而是单件、拼图、批量现场、CAD 和工序照片被近似地呈现，清楚的主体与杂乱的小图得到同等空间。

**最终方向：实物识别 → 与我的零件有关的差异 → 需要双方确认的参数 → 证据与下一步。** 目录负责选择，详情负责判断，指南负责形成资料，工厂与公司页负责不同层面的核验，询价负责形成一份可发送的邮件草稿。

### 1.2 当前问题及决定

| 优先级 | 具体当前证据 | 最终决定 |
|---|---|---|
| P1 | `/products/part-examples/` 手机首屏：标题、介绍、搜索、形态、附加筛选、材料说明、计数之后才露出第一条；卡片在 `PartsCatalogueExplorerRedesigned.tsx` 只输出 `card.material.label`，显示“Material options”而没有选项值 | 让第一条完整参考进入手机首屏；材料限定贴到材料筛选旁，卡片显示真实选项简写及其状态。保留筛选、URL恢复、无结果与无JS状态。 |
| P1 | P02 叶轮页 `ProductsPartRedesigned.astro`：主图、来源缩略、特征图旁完整图、Reference images 重复同一主体；390px首屏图片后的缩略条把形态说明继续推后 | 一处主图、一处真正新增的轮毂局部；完整来源与主图合并，不再设同图大章。标题后先有一句形态/供货定义。 |
| P1 | 产品普遍连续出现 `Define the interfaces that matter`、`Material and final condition`、`Drawing and acceptance requirements`、FAQ/RFQ；P29 的孔、边缘、测量状态多次出现 | 按特征建立一张“图纸要求—验收方法”表；材料与订单单列；组件、铸件、塑料等独有条件留在相应行。 |
| P1 | `/capabilities/cnc-milling-service/` 先长验收表再实物；铜页 lead、description、规格侧栏重复 contacts/fittings/grade；Casting首屏纯文字，下一段仍是资料输入 | 首屏给对象与代表实物，随后用短的形态判断；详细输入与验收集中。现有手机堆叠表能读，保留其方式，减少重复表。 |
| P1 | `/products/machining-studies/custom-plastic-parts-ptfe-pom-pe-acrylic/` 定义、AI封面、Shows、再次定义之后才到真实来源组 | 取消集合级大示意封面，直接进入有标题的真实PTFE/POM/PE/acrylic来源组；不包装成同一订单案例。 |
| P1 | `/resources/rfq-checklist/` 六项快览→三组详解→复制模板；手机首屏看不到主要工具 | 可复制模板和操作前置，六项变短锚点，完整三组说明仍常显。 |
| P2 | `/about/` 与 profile 重复车间图/事实；概览四入口之后又一组资格/验收入口；Factory连续设备、检查、方法、记录表 | About概览用于选入口，profile集中主体/证件，Factory先真实现场再订单验收；不删除审核字段。 |
| P2 | 原图中的工件常只占车床/夹具画面一小部分；目录拼图在112px手机框中难认；白底源图再套灰框形成两层空白 | 用真实局部承担识别，完整图保留关系；按图类设比例和主体尺度，不统一强裁或重画结构。 |
| P2 | Quote review 状态单独显示 Message，之后完整草稿再次显示 Message；全站部分介绍/尾部重复要求 drawing/material/quantity | 只保留一份可编辑/复制的完整草稿；通用解释移到负责它的指南，落地页保留具体输入与必要条件。 |

P1为主要采购路径，P2为信息归属与一致性，P3为历史预览维护。没有证据支持的严重故障不凑成P0。P14/P15/P19/P29/P31的身份修正已在当前版本存在，不能重复列为待修复旧错误。

### 1.3 保留与允许重做

- 保留 LZZ Precision 标识、法定公司名、联系方式、真实业务定位、全部有效产品事实/参数/单位/限制、独立来源、新闻与资料、必要搜索意图、现有URL和有效锚点。
- 保留筛选和URL状态、导航键盘操作、视频原生控件、下载/复制、草稿校验/恢复/清除/导出、错误提示、隐私说明、来源上下文及无JS回退。
- 可以重排模块、合并同义内容、缩短引言和小标题、改变字体/宽度/间距/图文比例/卡片/背景；不因旧规范要求一种布局而机械保留。
- 不做业务代码修改、不替换或制作网站图片、不改技术配置、不构建发布、不提交或部署、不测试真实询盘发送。截图和原图诊断板只是审查证据，不是新网站素材。

### 1.4 不得在减法中丢失的事实条件

| 事实/功能 | 保留口径与位置 |
|---|---|
| 2017、1,500 m²、杭州、40+ | 40+是加工及辅助设备；15+年是团队经验。首页简要事实、profile完整身份、Factory设备语境各自保留必要简述。 |
| 约100,000小件/月 | 仅参考产能，受几何、材料、后处理、订单组合影响；保留在Factory事实区并注明需要当前统计依据，不移成无条件宣传数字。 |
| 1件起订、7–14工作日 | 图纸与订单确认后生产，包含表面处理；运输另计，具体排期以报价/订单确认；来样重建/图纸批准另计。凡显示时间数字，完整条件必须邻接。可以从首屏迁到同页订单区，不能只剩外链。 |
| ±0.01 mm | 当前相关铣削/FAQ的选定关键特征参考；图纸、材料、几何、装夹及测量方法逐项确认，不提升为所有零件全尺寸保证。 |
| 材料/表面处理 | 原有牌号、标准、状态、候选/来源列明/待确认区分全部保留；照片颜色不鉴定材料。C3600/C36000/H62不默认等同；PTFE实体、金属涂层与包覆件分开。 |
| 工艺边界 | indexed/simultaneous五轴、毛坯/成品尺寸重量与夹持禁区；未公布的包络/行程/负载不补数。铸件后加工与铸造供货责任分开。 |
| ISO/CMM/检验 | 可保留已获授权的ISO 9001 certified声明；不补造证书版本、编号、机构、有效期。企业荣誉不是ISO证书；CMM照片不证明当前校准或订单实测。 |
| 测试/组件范围 | 功能、压力/泄漏、平衡、导电/导热、食品/医疗/汽车用途等有独立方法/限值/文件责任；照片中的总成不自动代表全部供货。 |
| 询价 | 仅在浏览器准备email draft。用户自行附图并在邮件客户端发送；无上传/后台收件/送达/回复时限承诺。sessionStorage、复制和TXT保存不等于发送。 |

依据：当前 `docs/claim-ledger-2026-09-25.md`、在用内容数据及素材登记。记录已有对外授权不等于本轮现场复核。

### 1.5 核验范围与证据使用

读取当前路由、动态数据、导航、重定向、现有dist与公共HTML、实际图片文件；84个业务URL均重新打开本地网站提取当前正文、标题、图片引用与页面几何。桌面/手机只对第3节明确标记的代表页审看首屏及列明正文窗口，**不是逐页全屏连续视觉验收**。

三个不继承旧结论的独立子评审分别负责 Products，Home/Capabilities/Factory，About/Resources/Quote；主评审交叉核对当前源码、图片和可靠截图后收敛为此唯一方案。子报告只是证据，冲突以本文件最终决定为准。

早期浏览器fullPage捕获有缩放、拼接和懒加载空白异常，已放弃作为视觉结论依据并重采可靠视口。同名desktop文件现在为首屏。局部滚动捕获中的未稳定空白不认定为网站空模块或坏图。主站线上环境、视频全程画质、实际发送、生产HTTP重定向、搜索收录未验证。

## 2. 按采购任务确定最终模块

### 2.1 导航和页面职责

保留五个一级入口与现有URL：Capabilities、Custom parts、Factory & quality、Resources、About LZZ；页眉询价入口保留。导航结构只做名称解释和任务分组，不新增一轮URL迁移。

| 页面类型 | 用户离开前必须得到的答案 | 主要去向 |
|---|---|---|
| 首页 H | 是什么供应商、能加工什么、我的输入怎么开始 | 零件参考、能力、RFQ |
| 能力目录 C0 | 该从几何、材料还是项目阶段进入 | 4工艺、4材料、3阶段页面 |
| 工艺 C1 / 材料 C2 | 是否适合我的零件；哪些条件决定报价与验收 | 相应工序、资料清单、带上下文RFQ |
| 原型 C3 / 批量 C4 / 来样 C5 | 本阶段的输入、产物、批准点及未决事项 | 具体工具、RFQ |
| 产品总览 P0 / 目录 P1 | 看得懂零件形态，能找到相似参考 | 35条参考、6工序、2集合 |
| 零件详情 P2–P6 | 图片是什么、我需报价哪一部分、参数怎么定义 | 对应工艺/材料、RFQ |
| 工序 S1 / 集合 S2 | 原图能说明什么，哪些只是对新图纸的建议 | 相关能力、RFQ |
| 工厂 F | 现场/设备可见依据、订单验收如何约定 | 文件请求、RFQ |
| 企业 A0–A5 | 主体、证件、责任、联系、真实活动分别去哪里查 | profile/workflow/contact |
| 目录 R0–R2 / 指南 R3 / FAQ R4 | 当前决定需要形成什么资料 | 工具、下一篇必要指南、RFQ |
| 询价 Q / 工具 U | 生成完整草稿或恢复正确路径 | 邮件应用/复制/TXT、有效页面 |

没有真实客户结果、订单量或交付证据，就不建立“客户成功案例”模板。现有 machining studies 是工序记录，material collections 是独立来源集合。35条参考不等于35种可直接下单配置。

### 2.2 蓝图通用执行约定

以下表格每行都是一个主要模块。内容列给出最终必须保留的信息；来源列指定合并/迁移；D为桌面，M为手机，排列以箭头为准。图片使用第5节编号/规格，未列图片表示不需要图，不用装饰图补数。每页只设一个主要询价任务，长详情首尾可重复同一任务；内链使用解释结果的短名称，不逐节增加CTA。

#### H 首页：用零件和真实加工建立业务认识

| 顺序/用户问题 | 最终信息及来源处理 | D / M 布局、图片与行动 |
|---|---|---|
| H1 你们做什么 | 保留 `Custom CNC parts. Made to your drawing.`；一句 milling/turning/5-axis、prototypes/small batches；保留RFQ和Browse part examples两动作。不增加空泛优势。来源HomeApproved hero | D文5/图7，H1最多3行、图4:3；M标题→一句业务→动作→图。HOME-01保留切削示意，来源标签紧邻；首屏不固定680px。 |
| H2 能做哪些零件 | 合并现有四件实物和工艺入口：叶轮、铸件壳体、锁销、重复孔塑料件；每件短形态名+一个关键特征+相关工艺。材料四族收成一行入口；P26不用不匹配的thin connecting sections作为主描述 | D四项同一光学尺度，M2×2；使用P02/P22/P32/P26真实主体。下接milling/turning/5-axis/casting文字入口，不另起同权长材料区。 |
| H3 加工过程看什么 | 将现有两个同权案例改为一个主记录：two-stage两装夹；29-inch与turn-mill仍作次链接。保留来源图能证明的关系，不补造质量结果 | D配对真图7/说明5；M两图按编号→换装夹问题→工序入口。ST-03；不加不同形态AI图。 |
| H4 工厂和验收依据 | 合并facts/车间/CMM/ISO：杭州、2017、1,500m²、40+加工及辅助设备；一句关键特征/抽样/记录按订单约定；当前证件请求。详细校准/检查方法迁Factory | D车间主图+紧凑事实/质量栏；M事实→车间→质量短说明。FA-01主图，CMM降辅助图，不独占长竖区。链接Factory与profile证件。 |
| H5 怎样开始 | 一份drawing/revision、grade/finish、quantity、critical features、destination清单；完整1件/交期条件；只有样件入口；草稿边界 | D清单与动作两栏；M清单→条件→Prepare RFQ email→附件发送说明。链接RFQ checklist与sample。无新图。 |

#### C0 能力目录：一次选择，不先读采购手册

| 顺序/用户问题 | 最终信息及来源处理 | D / M、图片、内链/行动 |
|---|---|---|
| C0.1 从哪里选 | H1保留CNC machining capabilities；一句按几何/材料/项目阶段选路。删泛化第二次“start with requirements” | 无大首图；D/M直接看到三个锚点。 |
| C0.2 哪种加工路线 | milling平面孔腔；turning同轴/螺纹；5-axis多面/曲面访问；casting对毛坯加工。processFit四列长表缩为4行，输入明细迁详情 | D2×2图文行，M逐行小实物+适配一句+链接；P01/P32/P02/P22。塑料归材料入口，旧塑料URL保留。 |
| C0.3 已知材料 | Aluminum/Stainless/Copper & brass/Plastics；每项一个采购区别；一条精确grade/condition需确认说明 | D四项轻量格，M两列或连续行；不重复大图。各材料详情链接。 |
| C0.4 当前项目状态 | prototype验证什么、batch每料号释放、sample重建定义；stages四字段卡片缩成现状→产物 | D三行/三列短入口，M三行；每页承担详细责任。 |
| C0.5 看证据并提交 | source-records合成真实工序/Factory短入口；Inquiry只留一份输入清单与完整订单条件 | 一张工序小图可选，不能再复制四路线解释。主动作RFQ。 |

#### C1 工艺详情：4页共用判断顺序，各自保留技术差异

| 顺序/用户问题 | 信息与来源处理 | D / M、图与行动 |
|---|---|---|
| C1.1 适合什么零件 | Intro title/lead/description合为一句对象、一句范围；Examples提一个实物到首屏；首次访问仍理解按图加工 | D短文+主实物，M标题→短定位→实物→动作。完整时间条迁同页末尾，首屏保留订单条件锚点。 |
| C1.2 哪些形态影响路线 | Examples剩余2–3例与geometry/workholding合并；不先放长验收表，也不复述几何段 | D实物/真实局部与对应2–3条判断同组；M一图一说明。casting把毛坯/加工面分开，不能套普通实心件叙述。 |
| C1.3 能看到什么加工依据 | practice/steps/studyLinks合一；有真实连续组才连贯编排；缺证据只给明确范围流程 | D1主1辅、M按步骤连续；链接对应工序。铸件无对应原始前后组，不造前后对照。 |
| C1.4 材料与关键验收 | MaterialTable和Acceptance按“特征→图纸输入→验收/条件”组合；ScopeQuestions归入相应行。材料四族不重复逐段解释 | D材料短表+特征三列，M逐特征堆叠，列义常显。保留独有数值/单位/限制，禁止默认闭合。 |
| C1.5 为这类零件询价 | page.inputs与content.rfq去同义；保留独有输入、完整订单条件及未包含测试范围 | D清单+行动；M连续读。RFQ保留工艺上下文；方法性长文链接具体指南。 |

| 工艺页 | 最终不可丢的具体差异 / 图位 |
|---|---|
| CNC milling | 平面、孔阵列、内圆角、薄壁与夹持；P01/P04/P33；two-stage配对实拍；选定关键特征±0.01mm的全部条件；允许圆角变更、处理后尺寸、洁净/化学/ESD另定。 |
| CNC turning | 轴线、肩、孔、螺纹、跳动、偏轴孔槽/二次铣；P19/P06/P07；turning与turn-mill是独立来源，不假称同订单；NPT/BSPT/metric标准分开。 |
| 5-axis | 叶面与多面访问是两任务；P02/P00/P11/P04；indexed/simultaneous、毛坯/成品尺寸重量/禁夹区、未公布包络；平衡/泄漏/追溯独立约定。 |
| Casting | P18/P22/P24；毛坯供方、来料验收、余量、定位面、保留铸态面及报废责任；压力/孔隙/NDT另定，来样重建另列。 |

#### C2 材料详情：牌号选择与最终状态连续阅读

| 顺序/用户问题 | 最终信息与来源处理 | D / M、图与行动 |
|---|---|---|
| C2.1 这种材料能做哪些零件 | Intro两段合为服务对象与用途一句，代表实物前置；取消重复grade侧栏 | D一件实物+短文；M短文→图，不让完整时间条挤走主体。 |
| C2.2 如何确定牌号 | MaterialTable全保留name/grades/finish/review；铜的function-review并入表前，塑料conditioning并入具体行 | D一张规格表；M逐牌号定义列表。未知牌号可填用途与约束，不能阻止询价。 |
| C2.3 加工要注意什么 | Examples与material-practice/workholding合并，同图不反复展示；真实工况图有来源才使用 | D主件/工况7:5；M每一图与其要求相邻。链接相应工艺/研究。 |
| C2.4 最终状态怎样验收 | finishing、Acceptance、相关ScopeQuestions归成处理/关键尺寸/功能测试三组 | D行表，M指定→检查；默认可见处理后尺寸、环境状态和测试责任。 |
| C2.5 提交材料需求 | 一份本材料输入和完整订单条件；通用RFQ教程迁指南 | 主动作带材料上下文，旁链material-and-finish-checklist。无重复大图。 |

| 材料页 | 保留的独有信息与图源 |
|---|---|
| Aluminum | 6061/6063及T6/T5、7075、2024/5083、冷却样件3003等现有选项按原状态保留；薄壁/平面度、阳极及其他处理兼容性、遮蔽/处理后配合。P13/P33/P30及enclosure实拍。 |
| Stainless | 303/304、316/316L、17-4PH状态、SUS430/SUS440不默认互换；钝化/电抛光、热处理后尺寸/跳动/毛刺；P19/P31/P32的组件功能范围分别说明。 |
| Copper & brass | contact/heat transfer/fluid sealing先分用途；标准牌号、螺纹/通道/密封、镀层与受限物质文件；导电/导热/压力测试方法限值另定。P27+metal-brass-batch，不把单例凑三卡。 |
| Plastics | PEEK/PTFE/polyimide、PA6/PA66、POM/Delrin、PE/HDPE/UHMW/PP/PVC、Acrylic/PC/ABS按当前分组保留；填料、温湿度/conditioning、压配嵌件/薄壁/载荷、PTFE实体与涂层区别。P21/P29/P26及独立来源视频。 |

#### C3/C4/C5 项目阶段：按产物和责任组织

| 类型/模块顺序 | 最终信息、来源与减法 | D / M、图、行动 |
|---|---|---|
| C3.1 原型要验证什么 | evaluation purpose；验证装配/设计，不是“所有性能都已满足” | 短定位+本次批准目标，M优先文字。 |
| C3.2 相近样件 | P13/P12/P15提前；真实件、总成参考、CAD分别标明 | D一主两辅；M按来源顺序；480pxCAD不放大成实物主视觉。 |
| C3.3 本次交付/批准 | prototypeApproval输入、产物、批准人；关键接口/测试与未测试项 | D三阶段，M垂直三阶段；默认常显。 |
| C3.4 与量产的差异 | generalMaterials仅保留本项目替代材料、工艺差异、下一版；汽车功能/压力及外购件范围不删 | 短差异表；去prototype approval，不复制整份指南。 |
| C3.5 RFQ | 版本、验证目的、数量、批准者+完整条件 | RFQ；无新大图。 |
| C4.1 小批量加工服务 | 先说明pilot/repeat production按料号与版本报价；“无统一批量阈值”是相邻条件，不作为主标题 | 短定位+真实实例小图，不以照片数量宣传产能。 |
| C4.2 每料号定义 | batchReleaseFields保留料号/版本、数量、材料/表面、关键特征、交付与追溯；原子字段不能被五个概括词吞掉 | D一张料号表，M逐字段；可链接BOM准备说明。 |
| C4.3 首件与批量释放 | approval步骤和右栏记录按阶段合并；抽样/hold point/批准者/记录保留 | D三阶段，M纵向；与prototype-vs-small-batch互链。 |
| C4.4 重复订货与包装 | P28/P34/P30独立来源；repeat-and-packing保留版本变更、标识、包装及数量责任，删同义重复 | D一件局部+完整排布图，M局部→要求→批图；非交付证据。 |
| C4.5 RFQ | 初始/重复数量分别填，预测不替代PO；完整条件 | 带batch上下文。 |
| C5.1 只有样件能否开始 | 样件可启动评估；不等于已知材料/公差/功能。重建和图纸批准是独立阶段 | 短文+P23真实样件，M先说明再图。 |
| C5.2 保留/澄清什么 | 样件可见几何、需保留接口、磨损/未知材料处理、授权与用途 | D样件旁三组问题，M三组连续。 |
| C5.3 每阶段交付什么 | sampleOutputs与material table按阶段合并：测量、几何定义、未知项、文件格式、批准权限 | D三阶段表，M输入→产物→责任；不把测量等同材质检测。 |
| C5.4 首件与复购 | Acceptance首件检查、重建图纸批准、复购释放 | 常显关键条件；去prototype approval。 |
| C5.5 RFQ | 现有照片/尺寸/用途可提交，重建报价/批准时间另议，生产时间条件完整 | 样件上下文RFQ；不要求用户上传网站不支持的附件。 |

#### P0/P1 产品发现：按形态进入，材料和数量作为维度

| 模块 | 最终信息与来源处理 | D / M、图、行动 |
|---|---|---|
| P0.1 产品总览定位 | 明确CNC milled and turned parts, made to your drawing；两入口：Find a part form / Review machining setups。按图/来样的边界各一句 | D真实零件组合与文案，不再以AI集合做主要产品证明；M业务句→代表实物→入口。IMG-P0。 |
| P0.2 六类形态 | 壳体盖板、旋转接头销、块件支架圆件、叶轮、多种铸件加工面、复杂组件参考；塑料为材料、批量为任务，各独立短入口 | D3×2，M2列；用真实代表件，标签不推断已生产材质。 |
| P0.3 工序依据 | 2–3个不同工艺问题，通往全部6研究；保留2材料集合单独身份 | 实图与问题相邻，无额外宣传卡；链接S1/S2。 |
| P0.4 订货起点 | 现有drawing/material/quantity/acceptance与完整交期合为一块 | RFQ+checklist，M一条阅读流。 |
| P1.1 目录与筛选 | H1仍有machined part examples搜索主题；一句“35 reference records”；搜索+形态优先，process/material/order次级；保留组合与URL恢复 | D紧凑工具栏；M初始可见搜索/形态，附加筛选原折叠保留，材料提示移入筛选旁。 |
| P1.2 35参考卡 | 短形态名、一个区别、具体material.value及option/listed/to confirm状态；CAD/assembly关键身份可见 | D3列，M图132px左右+文字；单件局部优先。完整第一条在390×843首屏出现，不能靠缩字达成。 |
| P1.3 集合/额外图库 | 两材料集合、包覆轮/辊/异形件及锥/圆柱齿轮入口各自保留，避免被误认为4个可买SKU | 紧凑导航块与既有锚点，完整图库仍可访问；各自字段见P/S变体。 |
| P1.4 无匹配也能继续 | 保留无结果、reset、无JS全列表、提交自己的图纸 | 一条RFQ入口，不在35卡之间穿插营销段。 |

#### P2–P6 零件参考详情：共有信息层级，各任务采用明确例外

| 顺序/问题 | 最终信息及具体来源合并 | D / M、图、行动 |
|---|---|---|
| 1 图片是什么/报价什么 | title+lead+identity.scope+review.intro合为形态一句、供货定义一句；CAD/组件/批量身份在首屏 | D主图7/短文5；M标题→一句识别→图→必要供货范围→动作。移除重复来源缩略，主图保留简短来源。 |
| 2 哪些特征决定加工 | review.features与真实局部配对，通常2–3项；有4项以上独有特征仍保留 | D图旁编号短项，M图后同主题连续；不重复完整主图。 |
| 3 图纸和验收怎么定义 | features/checks/drawing/inspection合为Feature / Drawing / Acceptance表；未覆盖项目进表脚 | D三列，M逐特征带列义；关键参数和限制常显。 |
| 4 材料、供货与订单 | material/process/finishes保留确切选项状态与最终尺寸；组件、铸件、批量独有责任按下表放首屏或本节；完整MOQ/时间条件 | 定义列表或短表；M自然排列。不能把条件藏进FAQ。 |
| 5 哪些补图有新增信息 | reference-views只留独立原图、不同角度或真实局部；同一完整来源合并到主图区。额外CAD与主图不能宣称同一版本 | 比例遵守第5节；无新增信息则取消本模块，不补图。 |
| 6 如何进一步评估 | related保留一个工艺、一个材料/指南、一个有明确差异的相邻形态；productQuestion仅在回答新问题时保留；RFQ清单不复述表格 | 紧凑结尾，带原产品/source上下文。 |

| 主任务/适用记录 | 在上述顺序中的最终例外与必留内容 |
|---|---|
| P2 单件特征：P00/P02/P03/P04/P11/P13/P20/P29/P32 | 以一个主体为中心。叶轮叶面/根部/轮毂与平衡另定；销的安装/啮合和内部弹簧未知；P29四孔圆件；盖板配合/外观。P32组件范围在首屏一句说明，不能生成内部剖面。 |
| P3 多件形态：P01/P05/P06/P07/P08/P09/P10/P21 | 模块2先说明拼图包含哪些形态，让买家指定对象；不把其中一件当全图供应范围。P08/P09保留表面/保护面；材料仍是选项。 |
| P4 铸件：P18/P22/P23/P24/P25 | 模块2改为“毛坯和机加工责任”，提前于一般参数：供方、来料、余量/基准、保留铸态面、拒收责任；P23来样重建；P24密封/配合；P25隐藏界面不可凭图补全。 |
| P5 组件/设计：P12/P14/P15/P16/P17/P19/P31 | 模块2明确需要报价的组件/BOM，实际included只按现有证据，无证据写to define。P14装配背景、P15 CAD、P16独立CAD版本、P19/P31标记/法兰；焊接/泄漏/流量另定。 |
| P6 重复件：P26/P27/P28/P30/P33/P34 | 首屏真实单件局部帮助识别，模块2保留完整排布图；单件接口→每料号订货→首件/抽样/追溯。不得把排布数量等同产能、交付或一套BOM。 |
| 材料叠加条件 | 塑料grade/conditioning/温湿度/支撑测量；不锈钢不默认316L；镀层/遮蔽/处理后尺寸在参数表相邻列，不再生成第二套重复章节。 |

#### S1 工序研究与S2独立来源集合

| 模块 | 最终信息与来源处理 | D / M、图、行动 |
|---|---|---|
| S0研究目录 | 一句说明六工序与两材料集合区别→六个“加工问题+真实图”入口→独立材料集合→简短RFQ | 取消“Read the setup”之后重复定义；D3×2，M一图一问题；不把AI封面当真实记录。 |
| S1.1 原图里在加工什么 | H1+一句工序问题+完整来源；Shows/For your drawing的解释并入图旁短说明 | 真实工件优先；M两装夹连续编号。ST-01至06。 |
| S1.2 看哪个位置 | 工件、夹持、刀具访问或基准关系；technical与steps围绕同一图整合 | D完整场景+真实局部，M场景→局部→2–3步；移除另一形态AI图对识别的干扰。 |
| S1.3 对你的图纸意味着什么 | inspection table与drawing/FAQ中相同项合一，明确“对相似零件的建议”，不是来源项目实测 | 一张特征/图纸/检查表；独有问题可留短问答。 |
| S1.4 补充记录与下一步 | 仅新增角度、两面或视频；6个研究彼此按问题关联，不列无理由链接墙 | 原生视频不自动播放；RFQ+一个相关能力/研究。 |
| S2.1 集合身份与分组 | 塑料PTFE/POM/PE/acrylic；金属车削/壳体/黄铜/清洗片段，独立来源与材质口径明确；去掉AI大封面和重复Shows | 顶部短定义+分组锚点，第一来源组紧随。 |
| S2.2 每个来源组 | 原图/视频+一句识别+材料状态+两项采购区别；当前每组drawing/inspection的重复段合并 | D媒体与字段同组，M按组完整阅读；不把所有图片堆完再讲要求。 |
| S2.3 跨组差异与询价 | 页后checks只保留跨组新增差异；重复原文删除，来源和视频不删除 | 紧凑差异表+RFQ；PTFE实体/金属涂层、透明件识别等条件常显。 |

S1逐页核心：five-axis＝多面共同基准/刀具访问；turn-mill＝铣孔槽联系车削轴线；two-stage＝两次装夹的定位传递；pocketed enclosure＝腔深/薄壁/内角；prismatic＝孔、面、开口相对安装基准；29-inch＝面板支撑/平面度，29-inch不等于壳体尺寸。两次装夹真实配对必须保留；缺少真实加工顺序的页不得补造。

补充图库：包覆轮/辊/异形件分别显示core、covering、hardness、bonding待定义字段；锥/圆柱齿轮保留tooth specification、module、mating part、inspection待定义字段。照片不证明配方、硬度、齿数、模数或精度。

#### F Factory：现场依据与订单验收分清

| 模块/用户问题 | 最终信息与来源处理 | D / M、图与行动 |
|---|---|---|
| F1 工厂在哪里/做什么 | H1后明确杭州按图CNC原型/小批量；真实workshop-wide+2017/面积/设备等事实，参考产能条件同块 | D实景与事实，M定位→事实→图；不造新厂房。 |
| F2 我的零件能否放上设备 | equipment/task/part size与公开范围；保持未发布包络等未知；图纸/毛坯/重量/夹持输入 | 当前设备表缩成“任务—需要确认的尺寸/访问”；真实设备图紧邻。 |
| F3 哪些阶段检查 | inspectionStages按来料/首件/过程/放行，保留批准人、抽样及记录责任 | D阶段行，M逐阶段；不重复一份同义qualification说明。 |
| F4 用什么方法检查 | measurementMethods按尺寸/几何/外观等特征对应方法，CMM只是设备依据；精度/量程/校准待记录 | D小CMM真图+方法表，M先问题/方法再设备；FA-02/03。 |
| F5 能核对哪些文件 | orderRecords与qualificationFields分为“订单记录”和“供应商文件”；ISO请求转profile，原有审核字段全保留 | D两组列表，M两组连续；`#quality`、`#order-documentation`等旧锚点继续指向相应段。 |
| F6 如何交接和下一步 | 包装、标识、文件、物流责任，详细保护教程去shipping guide；完整条件+RFQ | 历史照片只称历史准备，不声称已到货。真实图可有1组；无完整灰色长营销尾部。 |

#### A0–A5 企业与联系：每页承担一个核验任务

| 类型/最终模块 | 信息和来源处理 | D / M、图、内链/行动 |
|---|---|---|
| A0概览①主体②三任务③一条活动④询价 | 法定主体/杭州/定制CNC→Verify supplier、Review order process、Contact→一条车间来访预览→草稿行动。paths与assurance合并；统计完整交profile；不重复两组新闻 | D小实景+定位，三条任务行；M任务入口在大图前。去profile#documents/workflow/contact/news。 |
| A1简介①身份②文件③工程范围④发展⑤下一步 | 法定名、2017/面积/设备；ISO请求+三份真实文件用途/日期/范围；团队15+年与能力链接；5条发展事实中只有有依据的年份可写年份。11项应用保留对应条件/目的地迁入相关能力/形态层；People照片回新闻 | D事实表、文件小缩图+HTML摘要；M身份→文件，日期/范围不默认隐藏。一张车间主图；证件完整。请求文件与RFQ分清名称。 |
| A2流程①订单条件②五阶段责任③商业条款④变更/异常⑤工具 | Drawing review→Quotation→Sample approval→Production/inspection→Handover；Buyer provides/LZZ confirms/Record三列；付款币种/金额阶段、样品加工设置运费/抵扣、排除项、变更影响、非合格品证据、保修/返运/退款责任待订单约定 | D五行责任表，M每阶段重复角色标签。通用图纸/批准/包装教学迁相应指南，原锚点保留；最多一张辅助真图，不能挡在条款前。 |
| A3联系①联系方式②三任务③来访 | email、WhatsApp、Hangzhou UTC+8→新零件/供应商文件/已有订单异常→完整地址/预约条件。四项RFQ教程缩成一句+链接；文件/订单入口从大来访图后前移 | D联系栏+任务，M联系方式/任务先显示，地址小实景最后。保留现有邮箱/电话/qualification和visit mailto。 |
| A4新闻目录①定义/筛选②5条记录③公司入口 | 保留日期、事件、真实图、两行摘要、Workshop/events与Team life筛选；不反复写“Original photograph”长段 | D2列，M一条一图；图注短来源不替代日期；不加完整RFQ面板。 |
| A5新闻详情①事件②2组照片③相关档案 | 标题/日期精度/已知地点/一句事件→具体相片组→最多2条下一记录。保留全部原档案；无客户成果/成交推断 | D同组自然比例1大2小，M按组文字→图；人脸不裁、不得生成替代。短新闻允许3模块。 |

A5差异：Australian visit保留现有03部件讨论主图、车间组04/02/05、01中性谈话，来源日期待核不自行改年；Summit为参会展示不是签约；May仅月份；November保留当前03/05/04组；2024仅年份且保留行程/用餐/户外组。具体来源文件见图片清单与逐URL证据。

#### R0–R4 资源与指南：先给答案或工具，再解释条件

| 页面/模块 | 最终具体信息及来源处理 | D / M、图片与下一步 |
|---|---|---|
| R0总目录①任务②8指南③2模板④FAQ | 准备询价/比价下单/定义技术/快答；直接到具体文章；Inquiry brief和acceptance worksheet集中一个主下载区，不重复两块下载宣传 | D分组列表，M任务→产出→链接；不加装饰Hero。 |
| R1订货目录①顺序②四阶段③责任入口 | 询价→比价→样件/批量→发货；每阶段写本阶段形成的记录与对应工具，保留5篇订货指南和workflow链接 | D四行阶段表，M四段编号。无图需求。 |
| R2加工指南目录①选工艺②材料表面③关键特征④真实研究 | 保留3个具体任务入口；真实研究为辅助链接，不复制研究图片墙 | D/M短任务行；现有结构大体保留，减少重复解释。 |
| R3-RFQ①复制模板②三组说明③验收worksheet④下一步 | 模板Copy/Save TXT前置；六快览改锚点；drawing-package/material-finish/commercial-brief全部字段保留，包括NDA、控制文件、multi-axis毛坯尺寸重量、未知材料、开放问题 | D可选择模板区+字段目录；M复制/下载先可达，正文仍常显。链接critical features/material/shipping/factory→Quote。不加图。 |
| R3-比价①比较前提②8行比较表③例外④接受记录 | revision/model/material/finish/quantity/arrival/acceptance同口径；comparison/unresolved-items/quote-record完整；intro长字段串与表格合并 | D3列，M逐检查项保留标签；现有手机堆叠方式可保留。去sample approval/workflow。 |
| R3-关键特征①功能/基准②6行清单③释放前检查④实例 | function-first标准链接、feature-checklist、文件冲突/版本/材料项目范围；把material-and-project-scope与release-files合并 | 主表先于图；一张multi-feature原图辅助，不生成虚构尺寸工程图。去material/approval。 |
| R3-原型批准①评估目的/责任②7行检查③三种决定④批量释放 | 保留mating parts/fixtures/procedures、test conditions、未测试项；批准/有条件批准/不批准与开放项记录；收到样品不等于批准 | D检查表+批准记录，M逐项常显。无假检验报告。去repeat production/compare。 |
| R3-工艺选择①3路对比②原始场景③输入/公差 | Turning/Milling/Multi-axis，indexed/simultaneous与关键特征精度边界；process-comparison/references/accuracy不丢 | D表+3个实图入口，M每一路比较和图相邻；各图去对应能力/study。 |
| R3-材料表面①材料规格②最终表面③实体/涂层/包覆④记录 | material-specification、牌号冲突；process/appearance/masking/post-finish dimensions/edges连续5项；finish-and-acceptance与interfaces合并，保留两张涂层真图与不确定项 | 规格表先行，示意只贴遮蔽/尺寸项；M完整规格后看真图。去材料能力/factory。 |
| R3-样件转批量①对比②批量规格③释放记录④复购变化 | prototype/batch comparison、批准版本/材料处理/抽样记录/数量价格排期；同页1件/7–14日条件完整；比价教学压成下一步链接 | 两张短表按任务区分，M逐事项堆叠。去approval/shipping/low-volume。 |
| R3-发货①shipment brief②生产/发运/到达③历史档案④下一步 | 保护标识、term version/named place、费用/保险/关税/清关/local delivery责任、DDP仅报价含时、目的地文件；保留2022档案边界 | 清单为主，3真图在后；移除无新增信息的装箱概念图。去workflow#packaging-shipping/factory#order-documentation/RFQ。 |
| R4-FAQ①三类锚点②15问③追问 | 保留MOQ、时间、资料、草稿/附件、付款、样费、售后、不合格、工艺、材料处理、条件性公差、检验、ISO、物流、study边界。每问直接回答并最多1个详情链接 | 15问答案继续常显，不另外复制三条完整快答；手机不强制逐问展开。无图片；schema与可见答案同源。 |

指南不要统一成“Hero/Features/CTA”。每篇开头2–3句直接答案，复杂工具页工具先出现；必要内容长度由字段和任务决定，不用字数上限删技术条件。

#### Q / U：完成任务，不加展示负担

| 模块 | 最终内容/来源处理 | D / M、行动与状态 |
|---|---|---|
| Q1说明与reference | 标题 `Prepare an RFQ email`，一句网站只准备草稿、邮件客户端附图发送；内部解析的product/topic/source紧邻表单 | D主列，M在第一个字段之前；不加图。 |
| Q2五字段 | Name→Email→WhatsApp/Phone→optional Product/service→Message；Name/Message必填，Email或Phone至少一项；标签和帮助完整 | 表单主列≤760px，M单列；不得以placeholder代替标签。 |
| Q3验证与草稿 | 原有错误关联/首错焦点、sessionStorage恢复、changed reference仍用进入上下文key、Clear当前及legacy key、不可用仍可继续、无JS回退 | 状态靠近表单且不以颜色单独表达。不得新增后台/附件能力。 |
| Q4完整预览与导出 | To/Subject+一份完整可编辑邮件正文；合并重复Message展示；Open email app/Edit/Copy/Save及复制失败手选/TXT | D同一列，M同序；不显示“Sent”。联系方式简短置后，完整地址去Contact。 |
| U1 Privacy | Inquiry/Saved drafts/Cookies and external services/Product and company information/Contact五节按实际行为保留；可加短目录 | 正文66ch；无图无销售面板。不能照通用模板写cookies/CRM收件。 |
| U2 404 | 明确未找到，Home/Part examples/Capabilities/Ordering & machining guides四条恢复路径按任务解释 | 两个短区域，无巨幅插画和RFQ面板；保持正确404职责。 |


## 3. 逐 URL 映射、差异与检查状态

当前发现 **257个本地路径**：84业务页、19历史预览/审查页、1个404、153条重定向入口。其67个跳转HTML与规则重合，不重复计页。另有91条原站绝对URL来源登记，不等同当前本地页面，单独列在附表。

状态：**C**＝本轮已检查当前正文/模块/图片引用（84业务页均实际打开）；**V-D/M**＝已实际审看桌面1309×909和手机390×843 CSS视口首屏，仅此范围；**V局部**＝另看列明正文窗口；**T**＝未独立视觉检查，只依据本页内容和同族模板判断；**S**＝只查当前静态HTML/源入口，未打开实际页面；**R**＝规则和目标内容映射已查，未逐条验证生产HTTP；**U**＝未能检查线上源网址。截图有滚动条/缩放差异，以记录的CSS尺寸为准。

本轮实际D/M首屏覆盖36页（其中35业务页+404）；其余业务页的内容已查、视觉标T，不能当作逐页视觉通过。标题/当前完整模块/图片逐引用见[逐URL证据](review-20261015-current/url-evidence.md)，本表给最终类型、独有重点与改造责任。

### 3.1 全部业务页面及404

| URL | 类型/当前主题及具体差异 | 改造范围 | 状态/优先级 |
|---|---|---|---|
| `/` | **H** Custom CNC partsMade to your drawing；业务句已明确；四参考/材料工艺/工厂/两研究/RFQ现为六层 | 合并实物/工艺、重组证据、统一主体尺度；按2节对应蓝图/5节图位 | C；V-D/M首屏＋正文局部 / P1 |
| `/404.html` | **U** Page not found；四恢复去向：Home、Part examples、Capabilities、Ordering & machining guides | 轻量保持，恢复路径/真实行为；按2节对应蓝图/5节图位 | C（404 DOM）；V-D/M首屏 / P2 |
| `/about/` | **A0** Custom machining in Hangzhou.；Choose the company information you need；Qualification and part acceptance；Dated company records；Start with your drawing | 三任务入口、统计归简介、新闻精选；按2节对应蓝图/5节图位 | C；V-D/M首屏 / P2 |
| `/about/company-news/` | **A4** Inside and outside the workshop.；A November team day outdoors；LZZ at the China-Africa West Lake Summit；LZZ team outing in May 2025；An Australian customer visits the LZZ workshop；A rainy day out with the LZZ team | 记录更早出现，保留分类/日期；按2节对应蓝图/5节图位 | C；V-D/M首屏 / P2 |
| `/about/company-news/australian-customer-workshop-visit-january-2025/` | **A5** An Australian customer visits the LZZ workshop；On the workshop floor；Conversation during the visit；Continue the archive | 保留真实照片组，缩同义说明；按2节对应蓝图/5节图位 | C；V-D/M首屏 / P2 |
| `/about/company-news/china-africa-west-lake-summit-2025/` | **A5** LZZ at the China-Africa West Lake Summit；Introducing custom machining；Inside the conference hall；Continue the archive | 保留真实照片组，缩同义说明；按2节对应蓝图/5节图位 | C；T / P2 |
| `/about/company-news/lzz-team-outing-2024/` | **A5** A rainy day out with the LZZ team；The journey and a shared meal；A day away from the machines；Continue the archive | 保留真实照片组，缩同义说明；按2节对应蓝图/5节图位 | C；T / P2 |
| `/about/company-news/may-2025-lzz-team-outing/` | **A5** LZZ team outing in May 2025；An outdoor meal together；Evening streets and food stops；Continue the archive | 保留真实照片组，缩同义说明；按2节对应蓝图/5节图位 | C；V-D/M首屏 / P2 |
| `/about/company-news/november-2025-hangzhou-lizhizao-group-activity/` | **A5** A November team day outdoors；A day beside the water；Around the barbecue and table；Continue the archive | 保留真实照片组，缩同义说明；按2节对应蓝图/5节图位 | C；T / P2 |
| `/about/company-profile/` | **A1** LZZ Precision in Hangzhou；三份企业/教学文件非ISO；事实、11应用、发展、人物；证件当前在工程之后 | 证件前置、身份/工程/发展分层；按2节对应蓝图/5节图位 | C；V-D/M首屏 / P2 |
| `/about/contact/` | **A3** Let’s discuss your part.；新零件、供应商文件、既有订单异常、来访四任务；首屏联系方式已清楚 | 保留直接联系，文件/订单任务前移；按2节对应蓝图/5节图位 | C；V-D/M首屏 / P2 |
| `/about/how-we-work/` | **A2** From drawing review to finished parts.；报价、样品、检验、交接、变更/异常；付款/样费/售后不能迁空 | 责任/阶段记录、条款保留、教学迁指南；按2节对应蓝图/5节图位 | C；V-D/M首屏 / P2 |
| `/capabilities/` | **C0** CNC machining capabilities；Choose the route for the features；Known material, precise specification；Define the decision before the order；Look at the setup and the inspection plan；Bring the part requirements together | 路线前置、缩目录教学、三类入口；按2节对应蓝图/5节图位 | C；V-D/M首屏 / P1 |
| `/capabilities/5-axis-cnc-machining/` | **C1** 5-Axis CNC Machining Services；Fit the process to the drawing；Angled faces & complex contours；Material and finish review；Five-axis machining in practice；Scope to confirm separately；Request a 5-axis machining quote | 实物前置、图纸/验收合表、工序图局部；按2节对应蓝图/5节图位 | C；T / P1 |
| `/capabilities/aluminum-cnc-parts/` | **C2** Aluminum CNC Machining Services；Start with the specification；Grade, condition and finishing；Aluminum housings, covers & enclosures；Aluminum machining in practice；Accept the part in its final specified state；Scope to confirm separately；Request an aluminum machining quote | 用途/实物前置、牌号与最终状态连续；按2节对应蓝图/5节图位 | C；T / P1 |
| `/capabilities/casting-machining/` | **C1** Casting Machining Services；Fit the process to the drawing；Cast housings & finished interfaces；Casting material & blank requirements；From cast blank to inspected part；Scope to confirm separately；Request a casting machining quote | 实物前置、图纸/验收合表、工序图局部；按2节对应蓝图/5节图位 | C；V-D/M首屏 / P1 |
| `/capabilities/cnc-milling-service/` | **C1** CNC Milling Services；Fit the process to the drawing；Parts suited to CNC milling；Material and finish review；CNC milling in practice；Scope to confirm separately；Request a CNC milling quote | 实物前置、图纸/验收合表、工序图局部；按2节对应蓝图/5节图位 | C；V-D/M首屏＋正文局部 / P1 |
| `/capabilities/cnc-turning-service/` | **C1** CNC Turning Services；Fit the process to the drawing；Turned forms, different working interfaces；Material and finish review；Turning, secondary machining, finished features；Scope to confirm separately；Request a CNC turning quote | 实物前置、图纸/验收合表、工序图局部；按2节对应蓝图/5节图位 | C；T / P1 |
| `/capabilities/copper-brass-cnc-parts/` | **C2** Copper & Brass CNC Machining；Start with the specification；Specify the function before the alloy；Grade, condition and finishing；Contacts, fittings & connectors；From alloy choice to finished fitting；Accept the part in its final specified state；Scope to confirm separately；Request a copper or brass quote | 用途/实物前置、牌号与最终状态连续；按2节对应蓝图/5节图位 | C；V-D/M首屏 / P1 |
| `/capabilities/low-volume-production/` | **C4** Low-Volume CNC Production；Lock the requirements for every line item；Agree the hold point before the first release；Pilot builds & repeat part families；Keep the repeat baseline and packing aligned；Request a small-batch quote | 服务说明先行、每料号/批准/重复订货；按2节对应蓝图/5节图位 | C；V-D/M首屏 / P1 |
| `/capabilities/plastic-machined-parts/` | **C2** Plastic CNC Machining Services；Start with the specification；Grade, condition and finishing；Insulators, guides & polymer housings；Plastic part examples & process review；Accept the part in its final specified state；Scope to confirm separately；Request a plastic machining quote | 用途/实物前置、牌号与最终状态连续；按2节对应蓝图/5节图位 | C；T / P1 |
| `/capabilities/prototype-machining/` | **C3** CNC Prototype Machining；Fix the interfaces and the approval point；Prototypes for assembly & design checks；If the prototype differs from production；Record the next release decision；Submit a defined evaluation | 真实样件前置、产物/批准、量产差异；按2节对应蓝图/5节图位 | C；V-D/M首屏 / P1 |
| `/capabilities/stainless-steel-cnc-parts/` | **C2** Stainless Steel CNC Machining；Start with the specification；Grade, condition and finishing；Shafts, fittings & locking hardware；Plan the stainless machining sequence；Accept the part in its final specified state；Scope to confirm separately；Request a stainless steel quote | 用途/实物前置、牌号与最终状态连续；按2节对应蓝图/5节图位 | C；T / P1 |
| `/capabilities/starting-with-a-sample/` | **C5** Machining from an Existing Sample；Record the sample and the intended part；Know what each stage will deliver；Keep unknown material and treatment explicit；Approve the first part before a repeat release；Send the information available now | 样件识别、未知项/交付/批准分阶段；按2节对应蓝图/5节图位 | C；V-D/M首屏 / P1 |
| `/factory/` | **F** Factory & quality；2017/面积/加工支持设备/团队/参考产能；设备、检查阶段、方法、文件、交接 | 事实/设备/阶段/方法/文件分层；按2节对应蓝图/5节图位 | C；V-D/M首屏＋正文局部 / P2 |
| `/privacy/` | **U** Privacy and site information；五节真实数据/本地存储/外部服务说明，不新增营销模块 | 轻量保持，恢复路径/真实行为；按2节对应蓝图/5节图位 | C；V-D/M首屏 / P2 |
| `/products/` | **P0** Custom parts.Made to your drawing.；Start with the shape of your part；Read the setup behind the features；Turn a reference into a clear scope | 真实主体总览、形态与材料/数量分维度；按2节对应蓝图/5节图位 | C；V-D/M首屏 / P1 |
| `/products/machining-studies/` | **S0** Read the setup.Define your drawing.；Choose the machining question；Separate material and form collections；Bring the question to your drawing | 具体工序入口前置、材料集合分开；按2节对应蓝图/5节图位 | C；V-D/M首屏 / P1 |
| `/products/machining-studies/29-inch-display-housing-cnc-machining/` | **S1** CNC machining a 29-inch display housing；Plan the panel around its assembly interfaces；Support, machine and inspect the panel；Connect the drawing to the acceptance check；Questions for this machining task；Continue the drawing review；Review a similar component | 真图/真实局部与问题同组、重复要求合表；按2节对应蓝图/5节图位 | C；T / P1 |
| `/products/machining-studies/custom-metal-parts-batch-examples/` | **S2** Metal part examples: shafts, fittings & housings；Explore the original metal part families；Define a separate route for each part；Connect the drawing to the acceptance check；Questions for this machining task；Continue the drawing review；Review a similar component | 取消大AI封面、真实组优先、组间差异；按2节对应蓝图/5节图位 | C；T / P1 |
| `/products/machining-studies/custom-plastic-parts-ptfe-pom-pe-acrylic/` | **S2** Plastic part examples: PTFE, POM, PE & acrylic；Explore the original part families；Specify grade and measurement conditions；Connect the drawing to the acceptance check；Questions for this machining task；Continue the drawing review；Review a similar component | 取消大AI封面、真实组优先、组间差异；按2节对应蓝图/5节图位 | C；V-D/M首屏 / P1 |
| `/products/machining-studies/five-axis-machining-multi-face-parts/` | **S1** Five-axis CNC machining for multi-face parts；Read the part across its machining faces；For a similar part: setup and workholding；Connect the drawing to the acceptance check；Questions for this machining task；Continue the drawing review；Review a similar component | 真图/真实局部与问题同组、重复要求合表；按2节对应蓝图/5节图位 | C；T / P1 |
| `/products/machining-studies/milling-a-pocketed-enclosure-form/` | **S1** CNC milling a pocketed enclosure: walls, bores and datums；Define the pocket together with its interfaces；For a similar part: setup and workholding；Connect the drawing to the acceptance check；Questions for this machining task；Continue the drawing review；Review a similar component | 真图/真实局部与问题同组、重复要求合表；按2节对应蓝图/5节图位 | C；T / P1 |
| `/products/machining-studies/milling-prismatic-components/` | **S1** CNC milling prismatic parts: faces, bores and pockets；Connect the openings to the mounting faces；For a similar part: setup and workholding；Connect the drawing to the acceptance check；Questions for this machining task；Continue the drawing review；Review a similar component | 真图/真实局部与问题同组、重复要求合表；按2节对应蓝图/5节图位 | C；T / P1 |
| `/products/machining-studies/turning-then-milling-cylindrical-parts/` | **S1** CNC turning followed by milling for cylindrical parts；Connect the milled features to the turned geometry；For a similar part: setup and workholding；Connect the drawing to the acceptance check；Questions for this machining task；Continue the drawing review；Review a similar component | 真图/真实局部与问题同组、重复要求合表；按2节对应蓝图/5节图位 | C；T / P1 |
| `/products/machining-studies/two-stage-cnc-milling/` | **S1** Two CNC milling setups: keeping features aligned；Keep the feature relationships through repositioning；Plan datum transfer between the two orientations；Connect the drawing to the acceptance check；Questions for this machining task；Continue the drawing review；Review a similar component | 真图/真实局部与问题同组、重复要求合表；按2节对应蓝图/5节图位 | C；V-D/M首屏＋正文局部 / P1 |
| `/products/part-examples/` | **P1** Machined part examples；Reference galleries；Covered parts and gear forms；From the part form to the setup | 首条参考前置、材料值、真实清晰卡图；按2节对应蓝图/5节图位 | C；V-D/M首屏＋正文局部 / P1 |
| `/products/part-examples/custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier/` | **P5** Aluminum intercooler prototypes；P12：中冷器样件参考；提供组件、连接与压力/性能测试范围 | CAD/装配身份及BOM提前、测试范围；按2节对应蓝图/5节图位 | C；T / P1 |
| `/products/part-examples/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/` | **P2** Billet aluminum engine covers；P13：手持engine cover；配合/外观及实际来源上下文 | 去重复图、特征/图纸/验收合表；按2节对应蓝图/5节图位 | C；T / P1 |
| `/products/part-examples/custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier/` | **P5** Injector & fuel-rail intake manifolds；P16：Injector/fuel-rail manifold；独立CAD来源版本、接口与供货 | CAD/装配身份及BOM提前、测试范围；按2节对应蓝图/5节图位 | C；T / P1 |
| `/products/part-examples/custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier/` | **P5** Billet aluminum intake plenums；P17：Plenum；port与内部细节独立参考，功能测试另定 | CAD/装配身份及BOM提前、测试范围；按2节对应蓝图/5节图位 | C；T / P1 |
| `/products/part-examples/custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier/` | **P5** Intake-system assembly reference；P14：进气系统装配参考；定义需要加工的子组件，不默认总成 | CAD/装配身份及BOM提前、测试范围；按2节对应蓝图/5节图位 | C；V-D/M首屏 / P1 |
| `/products/part-examples/custom-cnc-machined-castings-transmission-housings-pump-bodies/` | **P4** Transmission housings & pump bodies；P18：Transmission/pump casting；来料毛坯、加工余量与责任 | 毛坯责任提前、加工/保留面与验收；按2节对应蓝图/5节图位 | C；T / P1 |
| `/products/part-examples/custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier/` | **P5** Throttle-body CAD reference；P15：Throttle-body CAD；非实拍，壳体/轴/执行器供货范围待定义 | CAD/装配身份及BOM提前、测试范围；按2节对应蓝图/5节图位 | C；V-D/M首屏 / P1 |
| `/products/part-examples/custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier/` | **P5** Flanged turned component assemblies；P19：带法兰回转组件；保留方向标记/紧固件，非普通长轴 | CAD/装配身份及BOM提前、测试范围；按2节对应蓝图/5节图位 | C；T / P1 |
| `/products/part-examples/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/` | **P2** Multi-bore circular milled component；P00：圆盘多孔形态；端面、孔列与同心/位置关系 | 去重复图、特征/图纸/验收合表；按2节对应蓝图/5节图位 | C；T / P1 |
| `/products/part-examples/custom-high-precision-machining-for-structural-aesthetic-components-oem/` | **P3** Structural & aesthetic components；P09：结构/外观组件；外观要求与配合条件分开 | 选中形态、拼图/真实局部、材料范围；按2节对应蓝图/5节图位 | C；T / P1 |
| `/products/part-examples/custom-oem-cnc-machined-non-metallic-components-insulating-parts/` | **P2** Non-metallic & insulating components；P20：非金属/绝缘形态；材料、工作环境、温湿度测量状态 | 去重复图、特征/图纸/验收合表；按2节对应蓝图/5节图位 | C；T / P1 |
| `/products/part-examples/custom-oem-cnc-machined-plastic-parts-manufacturer/` | **P3** Custom machined plastic parts；P21：多种塑料形态拼图；对象选择、精确牌号与装配条件 | 选中形态、拼图/真实局部、材料范围；按2节对应蓝图/5节图位 | C；T / P1 |
| `/products/part-examples/custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer/` | **P3** Turned fittings, connectors & flanges；P07：接头/法兰/螺纹拼图；连接标准、密封面、安装 | 选中形态、拼图/真实局部、材料范围；按2节对应蓝图/5节图位 | C；T / P1 |
| `/products/part-examples/custom-oem-cnc-turning-manufacturer/` | **P3** Custom CNC-turned components；P05：多种车削/块状形态组合；分别指定待报价对象 | 选中形态、拼图/真实局部、材料范围；按2节对应蓝图/5节图位 | C；T / P1 |
| `/products/part-examples/custom-oem-high-precision-cnc-milling-manufacturer/` | **P3** Milled instrument blocks & brackets；P01：九种铣削形态拼图；选中对象与孔/安装面分别定义 | 选中形态、拼图/真实局部、材料范围；按2节对应蓝图/5节图位 | C；V-D/M首屏 / P1 |
| `/products/part-examples/custom-rotary-cylindrical-components/` | **P3** Rotary & cylindrical components；P06：旋转及圆柱/块状组合；交叉孔、平面、槽 | 选中形态、拼图/真实局部、材料范围；按2节对应蓝图/5节图位 | C；T / P1 |
| `/products/part-examples/full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing/` | **P3** Milled metal brackets & finished housings；P08：黑色表面处理件拼图；最终表面与保护界面 | 选中形态、拼图/真实局部、材料范围；按2节对应蓝图/5节图位 | C；T / P1 |
| `/products/part-examples/global-manufacturer-of-multi-sided-precision-machined-components/` | **P2** Multi-sided machined components；P04：蓝色多面圆件；多方向孔/面与安装基准，颜色不证实处理 | 去重复图、特征/图纸/验收合表；按2节对应蓝图/5节图位 | C；T / P1 |
| `/products/part-examples/global-oem-precision-machining-solutions/` | **P2** Angled turned component reference；P03：斜颈回转件；螺纹轴与主体轴关系，不生成背面 | 去重复图、特征/图纸/验收合表；按2节对应蓝图/5节图位 | C；T / P1 |
| `/products/part-examples/high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem/` | **P2** Turbine & fluid-system components；P11：涡轮/流体形态；曲面与配合，平衡测试独立 | 去重复图、特征/图纸/验收合表；按2节对应蓝图/5节图位 | C；T / P1 |
| `/products/part-examples/high-volume-cnc-turning-for-complex-internal-external-features/` | **P3** Complex internal & external turned features；P10：内外复合车削特征；螺纹、工作直径、沟槽/肩 | 选中形态、拼图/真实局部、材料范围；按2节对应蓝图/5节图位 | C；T / P1 |
| `/products/part-examples/oem-precision-cnc-machined-casting-housing-structural-enclosures/` | **P4** Cast housings & structural enclosures；P22：开口带筋铸壳；刀具访问、定位、保留铸态面 | 毛坯责任提前、加工/保留面与验收；按2节对应蓝图/5节图位 | C；T / P1 |
| `/products/part-examples/oem-precision-cnc-machined-casting-housings/` | **P4** CNC-machined casting housings；P23：带接口壳体；样件重建定义与毛坯/加工面 | 毛坯责任提前、加工/保留面与验收；按2节对应蓝图/5节图位 | C；T / P1 |
| `/products/part-examples/precision-cnc-machined-castings-custom-oem-housings/` | **P4** Machined castings & OEM housings；P24：不规则铸件；密封、配合、安装孔的验收 | 毛坯责任提前、加工/保留面与验收；按2节对应蓝图/5节图位 | C；T / P1 |
| `/products/part-examples/precision-cnc-machined-castings-manufacturer/` | **P4** Precision-machined castings；P25：开口铸件结构；隐藏接口/测量访问不能凭图补全 | 毛坯责任提前、加工/保留面与验收；按2节对应蓝图/5节图位 | C；T / P1 |
| `/products/part-examples/precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances/` | **P6** Repeated-hole plastic strip references；P26：绿色重复孔长条；单件孔关系、材料状态与批次定义 | 单件局部识别、完整批图/版本与追溯；按2节对应蓝图/5节图位 | C；T / P1 |
| `/products/part-examples/precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier/` | **P6** Turned brass & copper components；P27：黄铜色接头堆放；合金/螺纹/镀层，不凭色鉴材 | 单件局部识别、完整批图/版本与追溯；按2节对应蓝图/5节图位 | C；T / P1 |
| `/products/part-examples/precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier/` | **P6** Pilot-batch housing references；P28：Pilot壳体排布；每料号与释放，非固定套件 | 单件局部识别、完整批图/版本与追溯；按2节对应蓝图/5节图位 | C；T / P1 |
| `/products/part-examples/precision-machining-for-functional-plastic-blocks-structural-components/` | **P2** Circular plastic component reference；P29：绿色圆件；中心孔、四小孔、曲边与measurement state | 去重复图、特征/图纸/验收合表；按2节对应蓝图/5节图位 | C；V-D/M首屏 / P1 |
| `/products/part-examples/precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures/` | **P6** Open aluminum enclosure references；P30：开放壳体排布；侧口、安装耳、壁与接口 | 单件局部识别、完整批图/版本与追溯；按2节对应蓝图/5节图位 | C；T / P1 |
| `/products/part-examples/precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier/` | **P5** Rotary component & flange reference；P31：回转组件及独立法兰；ON/OFF标记与完整供应范围 | CAD/装配身份及BOM提前、测试范围；按2节对应蓝图/5节图位 | C；T / P1 |
| `/products/part-examples/precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier/` | **P2** Indexing plungers & locking pins；P32：索引销；安装、啮合、内部弹簧未知及组件/整套区别 | 去重复图、特征/图纸/验收合表；按2节对应蓝图/5节图位 | C；V-D/M首屏 / P1 |
| `/products/part-examples/small-batch-cnc-machining-manufacturer-complex-aluminum-housings/` | **P6** Lid & gasket aluminum housings；P33：盖/密封铝壳；配合面、安装接口与批图来源 | 单件局部识别、完整批图/版本与追溯；按2节对应蓝图/5节图位 | C；T / P1 |
| `/products/part-examples/small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv/` | **P6** Pilot-run component references；P34：重复车削件；单件/BOM/版本/追溯，不称混材质套件 | 单件局部识别、完整批图/版本与追溯；按2节对应蓝图/5节图位 | C；T / P1 |
| `/products/part-examples/ultra-high-precision-machining-services/` | **P2** Custom CNC Impeller Machining；P02：曲面叶轮；叶面、根部、轮毂与平衡范围 | 去重复图、特征/图纸/验收合表；按2节对应蓝图/5节图位 | C；V-D/M首屏＋正文局部 / P1 |
| `/quote/` | **Q** Discuss your part；必填Name/Message，Email或Phone至少一项；本地草稿而非提交 | 短说明、五字段、单份预览、状态保留；按2节对应蓝图/5节图位 | C；V-D/M首屏 / P1 |
| `/resources/` | **R0** Guides for your CNC parts.；Ready to request a quote?；Ordering guide；Machining guides；Keep a copy with your order；Need a quick answer?；Use the prepared information | 任务直接到指南，集中模板下载；按2节对应蓝图/5节图位 | C；V-D/M首屏 / P1 |
| `/resources/drawings-and-ordering/compare-cnc-machining-quotations/` | **R3** Compare CNC machining quotations；Compare what the price includes；Resolve exceptions before awarding the order；Keep the agreed scope with the order；Next decision | 答案/工具前置，按该篇字段合并；按2节对应蓝图/5节图位 | C；V-D/M首屏 / P1 |
| `/resources/drawings-and-ordering/critical-features-cnc-drawing/` | **R3** Drawing requirements & critical features；Connect each requirement to the part function；Make the requirement measurable；Geometry and the machining route；Material, treatment and project scope；Resolve file conflicts before release；Next decision | 答案/工具前置，按该篇字段合并；按2节对应蓝图/5节图位 | C；T / P1 |
| `/resources/drawings-and-ordering/machined-prototype-approval-checklist/` | **R3** Machined prototype approval；Agree the evaluation before making the sample；Check the sample and its records together；Write down exactly what has been approved；Release the batch as a separate decision；Next decision | 答案/工具前置，按该篇字段合并；按2节对应蓝图/5节图位 | C；T / P1 |
| `/resources/faq/` | **R4** Custom CNC machining FAQs.；15问，三类；MOQ/完整交期/材料/检验/ISO/草稿/售后 | 压紧到达答案的层级，15问常显；按2节对应蓝图/5节图位 | C；V-D/M首屏 / P1 |
| `/resources/ordering-guide/` | **R1** From a quote request to an approved order.；Prepare the quote request；Compare the quoted work；Approve the sample and batch；Plan packing and delivery；LZZ process or technical definition? | 阶段目录与摘要合一；按2节对应蓝图/5节图位 | C；V-D/M首屏 / P1 |
| `/resources/processes-materials-finishes/` | **R2** Machining guides.；Choose a machining process；Specify material & finish；Drawing requirements & critical features；See real geometry and setups；Prepare a complete RFQ | 保留三任务列表，缩引言；按2节对应蓝图/5节图位 | C；V-D/M首屏 / P1 |
| `/resources/processes-materials-finishes/cnc-process-selection/` | **R3** Choose the CNC machining route；Choose by geometry；Workshop setups and related studies；Tolerances for critical features；Next decision | 答案/工具前置，按该篇字段合并；按2节对应蓝图/5节图位 | C；T / P1 |
| `/resources/processes-materials-finishes/material-and-finish-checklist/` | **R3** Material and finish requirements；Choose the material specification；Treatment and appearance；Interfaces and dimensions after treatment；Solid material, coating or covering?；Material and inspection records；Next decision | 答案/工具前置，按该篇字段合并；按2节对应蓝图/5节图位 | C；T / P1 |
| `/resources/production-and-shipping/custom-cnc-parts-shipping-checklist/` | **R3** Plan the shipment of CNC parts；Protection and identification；Timing and responsibility；Shipment and import documents；LZZ packing archive；Next decision | 答案/工具前置，按该篇字段合并；按2节对应蓝图/5节图位 | C；T / P1 |
| `/resources/production-and-shipping/prototype-vs-small-batch-cnc/` | **R3** From the first sample to repeat production；Prototype and repeat-batch decisions；Approve the batch specification；Keep a clear revision and release record；Confirm the next order；Next decision | 答案/工具前置，按该篇字段合并；按2节对应蓝图/5节图位 | C；T / P1 |
| `/resources/rfq-checklist/` | **R3** CNC machining RFQ checklist；六快览、三组字段、最后模板；NDA/控制版本/开放项完整保留 | 答案/工具前置，按该篇字段合并；按2节对应蓝图/5节图位 | C；V-D/M首屏＋正文局部 / P1 |

正文局部范围：Home桌面四零件与工厂区；Milling桌面验收/实物区及手机验收；Factory桌面事实/设备及手机事实下段；P02桌面特征/材料、手机特征表；two-stage桌面规划/步骤；RFQ桌面字段/模板标题；目录手机多条卡片。其余内容判断依据源码/DOM，未称全页视觉。

### 3.2 历史预览及公共审查页

这些页面与业务页分开，保留历史职责；不把它们套入正式站改版。S表示内容/模块/图片引用已读静态HTML和对应入口，实际视觉未核，历史noindex仍需实施后确认。

| URL | 职责/当前模块线索/图片数 | 最终处理 | 状态/优先级 |
|---|---|---|---|
| `/content-layout-demo-20261010/` | LZZ · 内容与排版前后对比；改造前 当前主站；改造后 独立样板；理解企业 → 找到加工路线 → 查看实拍证据 → 准备询价；0图位 | 历史设计/审查演示，原内容留档；不作为现行业务版式或发布入口 | S；视觉未能检查 / P3 |
| `/content-layout-demo-20261010/category/` | Engineering plastics,machined for your part；Plastic forms, up close；Plastic insulators, wear parts and housings；Compare part examples；Drawing & acceptance；Prepare your plastic machining enquiry；7图位 | 历史设计/审查演示，原内容留档；不作为现行业务版式或发布入口 | S；视觉未能检查 / P3 |
| `/content-layout-demo-20261010/detail/` | Custom machined plastic parts；Polymer grade and working surfaces；Manufacturing options；Drawing & inspection requirements；Compare part requirements；Prepare your plastic-part inquiry；4图位 | 历史设计/审查演示，原内容留档；不作为现行业务版式或发布入口 | S；视觉未能检查 / P3 |
| `/content-layout-demo-20261010/home/` | Your parts.Machined to order.；Parts, made to your drawing；Choose a machining route.；Factory & quality；Machining in practice；Let’s make your part.；10图位 | 历史设计/审查演示，原内容留档；不作为现行业务版式或发布入口 | S；视觉未能检查 / P3 |
| `/design-comparison-20261010/direction-a.html` | Custom CNCMachining.；The right process.For your geometry.；From the machine.To the part.；Let's makeyour next part.；5图位 | 历史设计/审查演示，原内容留档；不作为现行业务版式或发布入口 | S；视觉未能检查 / P3 |
| `/design-comparison-20261010/direction-b.html` | Every detail.；Your part.Our craft.；A closer look.；Where the work happens.；Discuss your part.；4图位 | 历史设计/审查演示，原内容留档；不作为现行业务版式或发布入口 | S；视觉未能检查 / P3 |
| `/design-comparison-20261010/direction-c.html` | Your next part.In the making.；The right process.For your geometry.；A closer look.From cut to component.；On the floor.In the inspection room.；Bring your drawing.Let's talk machining.；5图位 | 历史设计/审查演示，原内容留档；不作为现行业务版式或发布入口 | S；视觉未能检查 / P3 |
| `/design-comparison-20261010/style-explorer.html` | LZZ · 三种设计方向对比；；0图位 | 历史设计/审查演示，原内容留档；不作为现行业务版式或发布入口 | S；视觉未能检查 / P3 |
| `/homepage-directions-20261012/` | 相同的业务内容，三种阅读体验。；精密产品目录；深色材质展陈；开阔工程画册；三版保持相同的信息覆盖；19图位 | 历史设计/审查演示，原内容留档；不作为现行业务版式或发布入口 | S；视觉未能检查 / P3 |
| `/homepage-directions-20261012/a/` | Your drawing.Our next part.；Made aroundyour requirements.；The right processfor your part.；A closer lookat LZZ.；From setupto component.；A clear pathfrom drawing to part.；Have a drawing?Let's review it.；11图位 | 历史设计/审查演示，原内容留档；不作为现行业务版式或发布入口 | S；视觉未能检查 / P3 |
| `/homepage-directions-20261012/b/` | Complex parts.Made toyour drawing.；Made aroundyour requirements.；A closer lookat LZZ.；The right processfor your part.；From setupto component.；A clear pathfrom drawing to part.；Have a drawing?Let's review it.；11图位 | 历史设计/审查演示，原内容留档；不作为现行业务版式或发布入口 | S；视觉未能检查 / P3 |
| `/homepage-directions-20261012/c/` | From your drawing.Into your assembly.；The right processfor your part.；Made aroundyour requirements.；From setupto component.；A closer lookat LZZ.；A clear pathfrom drawing to part.；Have a drawing?Let's review it.；11图位 | 历史设计/审查演示，原内容留档；不作为现行业务版式或发布入口 | S；视觉未能检查 / P3 |
| `/image-audit-20261012/` | 全站图片与布局前后对比；首页；产品分类；叶轮详情；5 轴加工；多面加工零件；加工方式选择；零件要求指南；材料与表面处理；棱柱件加工案例；18图位 | 历史设计/审查演示，原内容留档；不作为现行业务版式或发布入口 | S；视觉未能检查 / P3 |
| `/link-rhythm-20261012/` | 内链与板块节奏；Resources：目录与阅读入口；首页：能力与材料入口；About：相关页面衔接；产品页：采购要求与询价收尾；8图位 | 历史设计/审查演示，原内容留档；不作为现行业务版式或发布入口 | S；视觉未能检查 / P3 |
| `/preview/home-editorial/` | Custom CNC partsMade to your drawing；Part examples；Machining capabilities & materials；Factory & quality；Machining studies；Have a drawingto review?；10图位 | 历史设计/审查演示，原内容留档；不作为现行业务版式或发布入口 | S；视觉未能检查 / P3 |
| `/visual-directions-20261014/` | 同样的业务，三种视觉表达。；简约精修；高端品牌；图片主导；本次设计调整；3图位 | 历史设计/审查演示，原内容留档；不作为现行业务版式或发布入口 | S；视觉未能检查 / P3 |
| `/visual-directions-20261014/a/` | Custom CNC partsMade to your drawing.；Part examples；Machining capabilities& materials；Inside ourHangzhou workshop.；Machining studies；Before you sendthe drawing.；Have a drawingto review?；10图位 | 历史设计/审查演示，原内容留档；不作为现行业务版式或发布入口 | S；视觉未能检查 / P3 |
| `/visual-directions-20261014/b/` | Custom CNC partsMade to your drawing.；Part examples；Machining capabilities& materials；Inside ourHangzhou workshop.；Machining studies；Before you sendthe drawing.；Have a drawingto review?；10图位 | 历史设计/审查演示，原内容留档；不作为现行业务版式或发布入口 | S；视觉未能检查 / P3 |
| `/visual-directions-20261014/c/` | Custom CNC partsMade to your drawing.；Part examples；Machining capabilities& materials；Inside ourHangzhou workshop.；Machining studies；Before you sendthe drawing.；Have a drawingto review?；10图位 | 历史设计/审查演示，原内容留档；不作为现行业务版式或发布入口 | S；视觉未能检查 / P3 |

### 3.3 全部重定向入口

职责统一为恢复旧入口，不另做产品/指南页面。当前规则来自`siteRouteRedirects.json`与`build-seo.mjs`的migration结果；原位置内容归目标页负责。保持现有目标，不为缩短文字新建重定向；锚点目标仍需后续HTTP和滚动位置验收。以下均为R/P2（规则与目标内容已查；HTTP/视觉未逐条验证）。

| 原URL | 当前最终目标 | 本轮状态/改造范围 |
|---|---|---|
| `/about` | `/about/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/about/company-documents/` | `/about/company-profile/#documents` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/article` | `/resources/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/article-category/Company-Information` | `/resources/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/article-category/Product-Information` | `/resources/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/article/category/Company-Information` | `/resources/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/article/category/Product-Information` | `/resources/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/article/Custom-CNC-Machined-Components-for-Prototypes-and-Production` | `/resources/drawings-and-ordering/critical-features-cnc-drawing/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/article/November-2025:-Hangzhou-Lizhizao-Group-Activity` | `/about/company-news/november-2025-hangzhou-lizhizao-group-activity/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/cases/` | `/products/machining-studies/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/cases/29-inch-display-housing-cnc-machining/` | `/products/machining-studies/29-inch-display-housing-cnc-machining/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/cases/custom-metal-parts-batch-examples/` | `/products/machining-studies/custom-metal-parts-batch-examples/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/cases/custom-plastic-parts-ptfe-pom-pe-acrylic/` | `/products/machining-studies/custom-plastic-parts-ptfe-pom-pe-acrylic/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/cases/five-axis-machining-multi-face-parts/` | `/products/machining-studies/five-axis-machining-multi-face-parts/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/cases/milling-a-pocketed-enclosure-form/` | `/products/machining-studies/milling-a-pocketed-enclosure-form/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/cases/milling-prismatic-components/` | `/products/machining-studies/milling-prismatic-components/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/cases/turning-then-milling-cylindrical-parts/` | `/products/machining-studies/turning-then-milling-cylindrical-parts/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/cases/two-stage-cnc-milling/` | `/products/machining-studies/two-stage-cnc-milling/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/contact` | `/about/contact/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/contact/` | `/about/contact/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/custom/advantage` | `/about/company-profile/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/custom/download` | `/about/company-profile/#documents` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/custom/factory` | `/factory/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/factory/quality/` | `/factory/#quality` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/factory/workshop/` | `/factory/#workshop` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product` | `/products/part-examples/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product-category/5-Axis-CNC-Machining` | `/capabilities/5-axis-cnc-machining/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product-category/Aluminum-CNC-Parts` | `/capabilities/aluminum-cnc-parts/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product-category/Casting-Machining` | `/capabilities/casting-machining/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product-category/CNC-Milling-Service` | `/capabilities/cnc-milling-service/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product-category/CNC-Turning-Service` | `/capabilities/cnc-turning-service/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product-category/Copper-Brass-CNC-Parts` | `/capabilities/copper-brass-cnc-parts/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product-category/Low-Volume-Production` | `/capabilities/low-volume-production/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product-category/Plastic-Machined-Parts` | `/capabilities/plastic-machined-parts/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product-category/Prototype-Machining` | `/capabilities/prototype-machining/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product-category/Stainless-Steel-CNC-Parts` | `/capabilities/stainless-steel-cnc-parts/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/10031201` | `/products/part-examples/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/10031202` | `/products/part-examples/custom-oem-high-precision-cnc-milling-manufacturer/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/10031204` | `/products/part-examples/ultra-high-precision-machining-services/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/10031206` | `/products/part-examples/global-oem-precision-machining-solutions/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/10031207` | `/products/part-examples/global-manufacturer-of-multi-sided-precision-machined-components/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/10031208` | `/products/part-examples/custom-oem-cnc-turning-manufacturer/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/10031209` | `/products/part-examples/custom-rotary-cylindrical-components/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/10031210` | `/products/part-examples/custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/10031213` | `/products/part-examples/full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/10031214` | `/products/part-examples/custom-high-precision-machining-for-structural-aesthetic-components-oem/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/10031215` | `/products/part-examples/high-volume-cnc-turning-for-complex-internal-external-features/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/10031216` | `/products/part-examples/high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/10031242` | `/products/part-examples/custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/10031243` | `/products/part-examples/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/10031244` | `/products/part-examples/custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/10031245` | `/products/part-examples/custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/10031246` | `/products/part-examples/custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/10031247` | `/products/part-examples/custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/category/5-Axis-CNC-Machining` | `/capabilities/5-axis-cnc-machining/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/category/Aluminum-CNC-Parts` | `/capabilities/aluminum-cnc-parts/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/category/Casting-Machining` | `/capabilities/casting-machining/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/category/CNC-Milling-Service` | `/capabilities/cnc-milling-service/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/category/CNC-Turning-Service` | `/capabilities/cnc-turning-service/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/category/Copper-Brass-CNC-Parts` | `/capabilities/copper-brass-cnc-parts/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/category/Low-Volume-Production` | `/capabilities/low-volume-production/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/category/Plastic-Machined-Parts` | `/capabilities/plastic-machined-parts/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/category/Prototype-Machining` | `/capabilities/prototype-machining/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/category/Stainless-Steel-CNC-Parts` | `/capabilities/stainless-steel-cnc-parts/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/Custom-Automotive-Performance-Parts-Manufacturer-and-Aluminum-Intercooler-Prototype-Supplier` | `/products/part-examples/custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/Custom-Billet-Aluminum-Engine-Cover-Manufacturer-and-Automotive-Prototype-Supplier` | `/products/part-examples/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/Custom-Billet-Aluminum-Intake-Manifold-Manufacturer-and-Automotive-Prototype-Supplier` | `/products/part-examples/custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/Custom-Billet-Aluminum-Intake-Plenum-Manufacturer-and-High-Performance-Tuning-Parts-Supplier` | `/products/part-examples/custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/Custom-Billet-Intake-Manifold-Manufacturer-and-Automotive-Performance-Prototype-Supplier` | `/products/part-examples/custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/Custom-CNC-Machined-Castings-Transmission-Housings-Pump-Bodies` | `/products/part-examples/custom-cnc-machined-castings-transmission-housings-pump-bodies/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/Custom-CNC-Machined-Electronic-Throttle-Body-Manufacturer-and-Automotive-Prototype-Supplier` | `/products/part-examples/custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/Custom-CNC-Turned-Stainless-Steel-Components-Manufacturer-and-Precision-Shaft-Supplier` | `/products/part-examples/custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/Custom-High-Precision-CNC-Milling-5-Axis-Machining-Services-OEM-ODM` | `/products/part-examples/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/Custom-High-Precision-Machining-for-Structural-Aesthetic-Components-OEM` | `/products/part-examples/custom-high-precision-machining-for-structural-aesthetic-components-oem/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/Custom-OEM-CNC-Machined-Non-Metallic-Components-Insulating-Parts` | `/products/part-examples/custom-oem-cnc-machined-non-metallic-components-insulating-parts/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/Custom-OEM-CNC-Machined-Plastic-Parts-Manufacturer` | `/products/part-examples/custom-oem-cnc-machined-plastic-parts-manufacturer/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/Custom-OEM-CNC-Turned-Fittings-Connectors-and-Flanges-Manufacturer` | `/products/part-examples/custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/Custom-OEM-CNC-Turning-Manufacturer` | `/products/part-examples/custom-oem-cnc-turning-manufacturer/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/Custom-OEM-High-Precision-CNC-Milling-Manufacturer` | `/products/part-examples/custom-oem-high-precision-cnc-milling-manufacturer/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/Custom-Rotary-Cylindrical-Components` | `/products/part-examples/custom-rotary-cylindrical-components/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/Full-Service-CNC-Milling-Solutions-Custom-Metal-Parts-Manufacturer-with-Finishing` | `/products/part-examples/full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/Global-Manufacturer-of-Multi-Sided-Precision-Machined-Components` | `/products/part-examples/global-manufacturer-of-multi-sided-precision-machined-components/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/Global-OEM-Precision-Machining-Solutions` | `/products/part-examples/global-oem-precision-machining-solutions/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/High-Reliability-Precision-Machining-Turbine-Fluid-Complex-Curve-Component-OEM` | `/products/part-examples/high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/High-Volume-CNC-Turning-for-Complex-Internal-External-Features` | `/products/part-examples/high-volume-cnc-turning-for-complex-internal-external-features/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/OEM-Precision-CNC-Machined-Casting-Housing-Structural-Enclosures` | `/products/part-examples/oem-precision-cnc-machined-casting-housing-structural-enclosures/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/OEM-Precision-CNC-Machined-Casting-Housings` | `/products/part-examples/oem-precision-cnc-machined-casting-housings/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/Precision-CNC-Machined-Castings-Custom-OEM-Housings` | `/products/part-examples/precision-cnc-machined-castings-custom-oem-housings/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/Precision-CNC-Machined-Castings-Manufacturer` | `/products/part-examples/precision-cnc-machined-castings-manufacturer/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/Precision-CNC-Machining-for-Complex-Plastic-Geometries-and-Tight-Tolerances` | `/products/part-examples/precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/Precision-CNC-Turned-Brass-Components-Manufacturer-and-Copper-Parts-Supplier` | `/products/part-examples/precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/Precision-Low-Volume-CNC-Machining-Manufacturer-and-HMLV-Components-Supplier` | `/products/part-examples/precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/Precision-Machining-for-Functional-Plastic-Blocks-Structural-Components` | `/products/part-examples/precision-machining-for-functional-plastic-blocks-structural-components/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/Precision-Small-Batch-CNC-Milling-Manufacturer-for-Complex-Aluminum-Enclosures` | `/products/part-examples/precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/Precision-Stainless-Steel-CNC-Turned-Parts-Manufacturer-and-316L-Components-Supplier` | `/products/part-examples/precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/Precision-Stainless-Steel-Indexing-Plunger-Manufacturer-and-Spring-Loaded-Locking-Pin-Supplier` | `/products/part-examples/precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/Small-Batch-CNC-Machining-Manufacturer-Complex-Aluminum-Housings` | `/products/part-examples/small-batch-cnc-machining-manufacturer-complex-aluminum-housings/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/Small-Batch-CNC-Machining-Manufacturer-Precision-Aluminum-Components-HMLV` | `/products/part-examples/small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/product/Ultra-High-Precision-Machining-Services` | `/products/part-examples/ultra-high-precision-machining-services/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/products/custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier/` | `/products/part-examples/custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/products/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/` | `/products/part-examples/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/products/custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier/` | `/products/part-examples/custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/products/custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier/` | `/products/part-examples/custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/products/custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier/` | `/products/part-examples/custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/products/custom-cnc-machined-castings-transmission-housings-pump-bodies/` | `/products/part-examples/custom-cnc-machined-castings-transmission-housings-pump-bodies/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/products/custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier/` | `/products/part-examples/custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/products/custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier/` | `/products/part-examples/custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/products/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/` | `/products/part-examples/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/products/custom-high-precision-machining-for-structural-aesthetic-components-oem/` | `/products/part-examples/custom-high-precision-machining-for-structural-aesthetic-components-oem/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/products/custom-oem-cnc-machined-non-metallic-components-insulating-parts/` | `/products/part-examples/custom-oem-cnc-machined-non-metallic-components-insulating-parts/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/products/custom-oem-cnc-machined-plastic-parts-manufacturer/` | `/products/part-examples/custom-oem-cnc-machined-plastic-parts-manufacturer/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/products/custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer/` | `/products/part-examples/custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/products/custom-oem-cnc-turning-manufacturer/` | `/products/part-examples/custom-oem-cnc-turning-manufacturer/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/products/custom-oem-high-precision-cnc-milling-manufacturer/` | `/products/part-examples/custom-oem-high-precision-cnc-milling-manufacturer/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/products/custom-rotary-cylindrical-components/` | `/products/part-examples/custom-rotary-cylindrical-components/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/products/full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing/` | `/products/part-examples/full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/products/global-manufacturer-of-multi-sided-precision-machined-components/` | `/products/part-examples/global-manufacturer-of-multi-sided-precision-machined-components/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/products/global-oem-precision-machining-solutions/` | `/products/part-examples/global-oem-precision-machining-solutions/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/products/high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem/` | `/products/part-examples/high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/products/high-volume-cnc-turning-for-complex-internal-external-features/` | `/products/part-examples/high-volume-cnc-turning-for-complex-internal-external-features/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/products/oem-precision-cnc-machined-casting-housing-structural-enclosures/` | `/products/part-examples/oem-precision-cnc-machined-casting-housing-structural-enclosures/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/products/oem-precision-cnc-machined-casting-housings/` | `/products/part-examples/oem-precision-cnc-machined-casting-housings/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/products/precision-cnc-machined-castings-custom-oem-housings/` | `/products/part-examples/precision-cnc-machined-castings-custom-oem-housings/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/products/precision-cnc-machined-castings-manufacturer/` | `/products/part-examples/precision-cnc-machined-castings-manufacturer/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/products/precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances/` | `/products/part-examples/precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/products/precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier/` | `/products/part-examples/precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/products/precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier/` | `/products/part-examples/precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/products/precision-machining-for-functional-plastic-blocks-structural-components/` | `/products/part-examples/precision-machining-for-functional-plastic-blocks-structural-components/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/products/precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures/` | `/products/part-examples/precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/products/precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier/` | `/products/part-examples/precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/products/precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier/` | `/products/part-examples/precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/products/small-batch-cnc-machining-manufacturer-complex-aluminum-housings/` | `/products/part-examples/small-batch-cnc-machining-manufacturer-complex-aluminum-housings/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/products/small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv/` | `/products/part-examples/small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/products/ultra-high-precision-machining-services/` | `/products/part-examples/ultra-high-precision-machining-services/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/quality/` | `/factory/#quality` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/resources/australian-customer-workshop-visit-january-2025/` | `/about/company-news/australian-customer-workshop-visit-january-2025/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/resources/china-africa-west-lake-summit-2025/` | `/about/company-news/china-africa-west-lake-summit-2025/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/resources/cnc-process-selection/` | `/resources/processes-materials-finishes/cnc-process-selection/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/resources/company-news/` | `/about/company-news/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/resources/compare-cnc-machining-quotations/` | `/resources/drawings-and-ordering/compare-cnc-machining-quotations/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/resources/critical-features-cnc-drawing/` | `/resources/drawings-and-ordering/critical-features-cnc-drawing/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/resources/custom-cnc-machined-components-for-prototypes-and-production/` | `/resources/drawings-and-ordering/critical-features-cnc-drawing/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/resources/custom-cnc-parts-shipping-checklist/` | `/resources/production-and-shipping/custom-cnc-parts-shipping-checklist/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/resources/drawings-and-ordering/` | `/resources/ordering-guide/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/resources/drawings-and-ordering/custom-cnc-machined-components-for-prototypes-and-production/` | `/resources/drawings-and-ordering/critical-features-cnc-drawing/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/resources/how-we-work/` | `/about/how-we-work/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/resources/lzz-team-outing-2024/` | `/about/company-news/lzz-team-outing-2024/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/resources/machined-prototype-approval-checklist/` | `/resources/drawings-and-ordering/machined-prototype-approval-checklist/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/resources/material-and-finish-checklist/` | `/resources/processes-materials-finishes/material-and-finish-checklist/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/resources/may-2025-lzz-team-outing/` | `/about/company-news/may-2025-lzz-team-outing/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/resources/november-2025-hangzhou-lizhizao-group-activity/` | `/about/company-news/november-2025-hangzhou-lizhizao-group-activity/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/resources/production-and-shipping/` | `/resources/ordering-guide/` | R；保留映射，目标页按上表；不另做内容/图位 |
| `/resources/prototype-vs-small-batch-cnc/` | `/resources/production-and-shipping/prototype-vs-small-batch-cnc/` | R；保留映射，目标页按上表；不另做内容/图位 |

### 3.4 原站来源URL（非本地页面）

下列91项为当前迁移数据中发现的原站来源，不代表本轮访问了线上页面。已核对它们在迁移数据里的归属，线上内容/视觉/HTTP均U。后续保持来源追溯，不因本地改版删除原始资料。

| 原站来源 | 当前归属目标 | 状态 |
|---|---|---|
| `https://www.lzz-cnc.com/product/Custom-High-Precision-CNC-Milling-5-Axis-Machining-Services-OEM-ODM` | `/products/part-examples/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/10031201` | `/products/part-examples/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/Custom-OEM-High-Precision-CNC-Milling-Manufacturer` | `/products/part-examples/custom-oem-high-precision-cnc-milling-manufacturer/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/10031202` | `/products/part-examples/custom-oem-high-precision-cnc-milling-manufacturer/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/Ultra-High-Precision-Machining-Services` | `/products/part-examples/ultra-high-precision-machining-services/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/10031204` | `/products/part-examples/ultra-high-precision-machining-services/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/Global-OEM-Precision-Machining-Solutions` | `/products/part-examples/global-oem-precision-machining-solutions/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/10031206` | `/products/part-examples/global-oem-precision-machining-solutions/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/Global-Manufacturer-of-Multi-Sided-Precision-Machined-Components` | `/products/part-examples/global-manufacturer-of-multi-sided-precision-machined-components/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/10031207` | `/products/part-examples/global-manufacturer-of-multi-sided-precision-machined-components/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/Custom-OEM-CNC-Turning-Manufacturer` | `/products/part-examples/custom-oem-cnc-turning-manufacturer/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/10031208` | `/products/part-examples/custom-oem-cnc-turning-manufacturer/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/Custom-Rotary-Cylindrical-Components` | `/products/part-examples/custom-rotary-cylindrical-components/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/10031209` | `/products/part-examples/custom-rotary-cylindrical-components/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/Custom-OEM-CNC-Turned-Fittings-Connectors-and-Flanges-Manufacturer` | `/products/part-examples/custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/10031210` | `/products/part-examples/custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/Full-Service-CNC-Milling-Solutions-Custom-Metal-Parts-Manufacturer-with-Finishing` | `/products/part-examples/full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/10031213` | `/products/part-examples/full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/Custom-High-Precision-Machining-for-Structural-Aesthetic-Components-OEM` | `/products/part-examples/custom-high-precision-machining-for-structural-aesthetic-components-oem/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/10031214` | `/products/part-examples/custom-high-precision-machining-for-structural-aesthetic-components-oem/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/High-Volume-CNC-Turning-for-Complex-Internal-External-Features` | `/products/part-examples/high-volume-cnc-turning-for-complex-internal-external-features/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/10031215` | `/products/part-examples/high-volume-cnc-turning-for-complex-internal-external-features/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/High-Reliability-Precision-Machining-Turbine-Fluid-Complex-Curve-Component-OEM` | `/products/part-examples/high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/10031216` | `/products/part-examples/high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/Custom-Automotive-Performance-Parts-Manufacturer-and-Aluminum-Intercooler-Prototype-Supplier` | `/products/part-examples/custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/10031242` | `/products/part-examples/custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/Custom-Billet-Aluminum-Engine-Cover-Manufacturer-and-Automotive-Prototype-Supplier` | `/products/part-examples/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/10031243` | `/products/part-examples/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/Custom-Billet-Intake-Manifold-Manufacturer-and-Automotive-Performance-Prototype-Supplier` | `/products/part-examples/custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/10031244` | `/products/part-examples/custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/Custom-CNC-Machined-Electronic-Throttle-Body-Manufacturer-and-Automotive-Prototype-Supplier` | `/products/part-examples/custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/10031245` | `/products/part-examples/custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/Custom-Billet-Aluminum-Intake-Manifold-Manufacturer-and-Automotive-Prototype-Supplier` | `/products/part-examples/custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/10031246` | `/products/part-examples/custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/Custom-Billet-Aluminum-Intake-Plenum-Manufacturer-and-High-Performance-Tuning-Parts-Supplier` | `/products/part-examples/custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/10031247` | `/products/part-examples/custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/Custom-CNC-Machined-Castings-Transmission-Housings-Pump-Bodies` | `/products/part-examples/custom-cnc-machined-castings-transmission-housings-pump-bodies/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/Custom-CNC-Turned-Stainless-Steel-Components-Manufacturer-and-Precision-Shaft-Supplier` | `/products/part-examples/custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/Custom-OEM-CNC-Machined-Non-Metallic-Components-Insulating-Parts` | `/products/part-examples/custom-oem-cnc-machined-non-metallic-components-insulating-parts/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/Custom-OEM-CNC-Machined-Plastic-Parts-Manufacturer` | `/products/part-examples/custom-oem-cnc-machined-plastic-parts-manufacturer/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/OEM-Precision-CNC-Machined-Casting-Housing-Structural-Enclosures` | `/products/part-examples/oem-precision-cnc-machined-casting-housing-structural-enclosures/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/OEM-Precision-CNC-Machined-Casting-Housings` | `/products/part-examples/oem-precision-cnc-machined-casting-housings/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/Precision-CNC-Machined-Castings-Custom-OEM-Housings` | `/products/part-examples/precision-cnc-machined-castings-custom-oem-housings/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/Precision-CNC-Machined-Castings-Manufacturer` | `/products/part-examples/precision-cnc-machined-castings-manufacturer/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/Precision-CNC-Machining-for-Complex-Plastic-Geometries-and-Tight-Tolerances` | `/products/part-examples/precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/Precision-CNC-Turned-Brass-Components-Manufacturer-and-Copper-Parts-Supplier` | `/products/part-examples/precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/Precision-Low-Volume-CNC-Machining-Manufacturer-and-HMLV-Components-Supplier` | `/products/part-examples/precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/Precision-Machining-for-Functional-Plastic-Blocks-Structural-Components` | `/products/part-examples/precision-machining-for-functional-plastic-blocks-structural-components/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/Precision-Small-Batch-CNC-Milling-Manufacturer-for-Complex-Aluminum-Enclosures` | `/products/part-examples/precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/Precision-Stainless-Steel-CNC-Turned-Parts-Manufacturer-and-316L-Components-Supplier` | `/products/part-examples/precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/Precision-Stainless-Steel-Indexing-Plunger-Manufacturer-and-Spring-Loaded-Locking-Pin-Supplier` | `/products/part-examples/precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/Small-Batch-CNC-Machining-Manufacturer-Complex-Aluminum-Housings` | `/products/part-examples/small-batch-cnc-machining-manufacturer-complex-aluminum-housings/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/Small-Batch-CNC-Machining-Manufacturer-Precision-Aluminum-Components-HMLV` | `/products/part-examples/small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/article/Custom-CNC-Machined-Components-for-Prototypes-and-Production` | `/resources/drawings-and-ordering/critical-features-cnc-drawing/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/article/November-2025:-Hangzhou-Lizhizao-Group-Activity` | `/about/company-news/november-2025-hangzhou-lizhizao-group-activity/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/` | `/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/about` | `/about/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/article` | `/resources/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/article-category/Company-Information` | `/resources/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/article-category/Product-Information` | `/resources/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/article?page=1` | `/resources/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/article/category/Company-Information` | `/resources/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/article/category/Product-Information` | `/resources/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/contact` | `/about/contact/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/custom/advantage` | `/about/company-profile/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/custom/download` | `/about/company-profile/#documents` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/custom/factory` | `/factory/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product` | `/products/part-examples/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product-category/5-Axis-CNC-Machining` | `/capabilities/5-axis-cnc-machining/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product-category/Aluminum-CNC-Parts` | `/capabilities/aluminum-cnc-parts/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product-category/Casting-Machining` | `/capabilities/casting-machining/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product-category/CNC-Milling-Service` | `/capabilities/cnc-milling-service/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product-category/CNC-Turning-Service` | `/capabilities/cnc-turning-service/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product-category/Copper-Brass-CNC-Parts` | `/capabilities/copper-brass-cnc-parts/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product-category/Low-Volume-Production` | `/capabilities/low-volume-production/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product-category/Plastic-Machined-Parts` | `/capabilities/plastic-machined-parts/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product-category/Prototype-Machining` | `/capabilities/prototype-machining/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product-category/Stainless-Steel-CNC-Parts` | `/capabilities/stainless-steel-cnc-parts/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product?page=1` | `/products/part-examples/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product?page=2` | `/products/part-examples/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product?page=3` | `/products/part-examples/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/category/5-Axis-CNC-Machining` | `/capabilities/5-axis-cnc-machining/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/category/Aluminum-CNC-Parts` | `/capabilities/aluminum-cnc-parts/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/category/Casting-Machining` | `/capabilities/casting-machining/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/category/CNC-Milling-Service` | `/capabilities/cnc-milling-service/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/category/CNC-Turning-Service` | `/capabilities/cnc-turning-service/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/category/Copper-Brass-CNC-Parts` | `/capabilities/copper-brass-cnc-parts/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/category/Low-Volume-Production` | `/capabilities/low-volume-production/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/category/Plastic-Machined-Parts` | `/capabilities/plastic-machined-parts/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/category/Prototype-Machining` | `/capabilities/prototype-machining/` | 来源映射已查；线上U |
| `https://www.lzz-cnc.com/product/category/Stainless-Steel-CNC-Parts` | `/capabilities/stainless-steel-cnc-parts/` | 来源映射已查；线上U |

## 4. 内容处理清单：只减重复，保留采购价值

下表是实施时必须逐项勾选的迁移账。删除的是重复表达或无新增作用的展示，文件和历史来源不随之删除。被迁内容的旧锚点继续指向最终负责模块。

| ID / 原位置 | 操作与理由 | 最终去向及不能丢的信息 |
|---|---|---|
| CT01 Home `hm-parts` + `hm-routegrid` | 合并：实物与工艺当前分开，需要读者自行关联 | H2，四件形态各绑定工艺；四材料族仍可达，sample入口归H5。 |
| CT02 Home `hm-quality` | 缩短并迁移：窄列长检验说明打断主线 | H4短说明，完整方法/校准/记录核对在F3–F5；ISO请求仍清楚。 |
| CT03 `CapabilitiesDirectory processFit/stages` | 将目录教学字段迁移 | C0保留适配一句，详细inputs去各详情和RFQ；所有路线/阶段入口保留。 |
| CT04 `CapabilityIntro lead+content.description`、铜页规格侧栏 | 合并同义句，迁移完整时间条 | C1/C2首屏业务和对象；牌号放C2.2；完整时间条件在同页RFQ并可由短锚点到达。 |
| CT05 `CapabilityAcceptance` + `technical-explainer/geometry` | 合并同页重复几何/图纸/检查解释 | C1.2实物判断+C1.4集中表，±0.01条件及工具限制不得漏。 |
| CT06 `CapabilityInquiry page.inputs` + `page.content.rfq` | 同一drawing/revision/material/quantity只列一次 | 各页最后一份清单，保留独有工艺输入、时间及scope例外。 |
| CT07 `CapabilityMaterialPage` finishing/acceptance/questions | 同一材料状态与处理后尺寸分散，按对应关系合并 | C2.2牌号表+C2.4最终状态；标准、temper、conditioning、功能测试责任不删。 |
| CT08 Prototype `generalMaterials` | 删通用四材料复述，迁详细牌号 | C3.4只留相对量产差异，材料详情内链保留；实际候选/替代状态不能升级。 |
| CT09 Batch approval steps + right-side records | 合并同阶段说明 | C4.3每阶段输入/批准/记录；C4.4追溯/包装。预测不等于订单数量。 |
| CT10 Sample outputs + material table | 将未知项与交付阶段放一起 | C5.3，测量/几何重建/材料处理确认/批准权限分清；不能按样件推定材料或原始设计公差。 |
| CT11 `ProductsPartRedesigned lead/identity/review.intro` | 合为形态和供货两句，删同义以图纸为准复述 | 详情首屏；CAD、assembly、AI背景等关键身份常显，非统一删除来源说明。 |
| CT12 Product features/checks/drawing/inspection | 按特征对齐合并，不按段落机械删字 | P模块3一张表，未覆盖的独有检查要求进入表脚。每项保留数值、单位、适用条件。 |
| CT13 Product material/process/finishes + applications | 参数集中，重复行业名称缩短 | P模块4保留材料状态/工艺/处理；真实使用约束保留；泛应用去相关能力/形态入口，不变成客户背书。 |
| CT14 产品hero source thumbnail + reference-views同图 | 删除重复显示，不删除来源 | 主图附短来源；独立角度/完整来源与真实局部在同图组；同图不再一大一小再一大。 |
| CT15 `productQuestion/review.rfq` | 问答若只复述表格，合入表脚 | 独有供货/功能问题仍保留，通用准备方法去RFQ checklist。 |
| CT16 目录`card.material.label` | 补回已有值，标签单独显示没有采购信息 | P1.2使用value简写+状态；完整牌号仍在详情，不能因显示具体选项声称照片已鉴定。 |
| CT17 Studies `technical/steps/inspection/questions` | 同一基准/装夹问题只解释一次 | S1.2原图编号+步骤，S1.3集中输入/检查表；真实记录与对新订单建议严格分开。 |
| CT18 Collections `definition/Shows/family intro`及组后checks | 删除同义定义，跨组表不复制每组要求 | S2直接进入真实来源组；PTFE/POM/PE/acrylic与金属分组、独立视频全部保留。 |
| CT19 About `paths/assurance/facts/records` | 合并双套任务入口、迁移统计与重复新闻 | A0三入口+一条精选；A1完整事实；A4/A5完整记录。不是删除公司证据。 |
| CT20 Profile `applications` 11领域与`People` | 转为有目的的能力/形态入口与新闻归档 | 11项逐条保留约束及有效href；无对应落点的实质信息留profile短段，未找到去向前不删除。 |
| CT21 Workflow `review/sample/packing` 的通用教学 | 迁移教学，保留责任与阶段结果 | RFQ/approval/shipping指南；workflow仍有商业、样费、付款、变更、售后、异常处理，不只剩流程箭头。 |
| CT22 Factory inspectionStages/methods/records/qualification | 明确不同问题，不连续复制agree/confirm泛段 | F3阶段、F4方法、F5文件；全部实际字段仍在可读表/列表。 |
| CT23 Resources `rs-start/rs-tools` 重复brief下载 | 同页主下载集中，其他位置只作短上下文链接 | R0工具区与RFQ正文；acceptance worksheet保留独立用途。 |
| CT24 RFQ `rfqQuickChecks` 六项长摘要 | 缩为短锚点，工具前移 | 三组字段说明全部保留，模板Copy/TXT、NDA/控制文件/未知项不删。 |
| CT25 Material guide finish-and-acceptance + interfaces | 合并五项连续规格 | process/appearance/masking/post-finish dimensions/edges；原标准与牌号差异保留。 |
| CT26 Shipping teaching image | 移除无新增价值的示意展示 | 清单+3张2022真实档案；Article.image若仍引用被弃图，实施时同步选择仍可见且语义一致的图，URL不变。 |
| CT27 Quote review Message + full draft | 删除重复Message展示 | 保留一份完整可编辑草稿和To/Subject；校验、复原、复制失败/TXT均保留。 |
| CT28 通用长RFQ尾部/逐节CTA | 合并为每页一个任务出口 | 仍允许长详情首尾同任务；短新闻只需相关档案；每个落地页仍有可理解业务与下一步。 |

跨页面可以重复一条必要快答，例如1件起订、草稿不自动发送或照片材质未知；完整方法放负责页面。不能只因关键词重复就全局删除。

### 4.1 Profile应用讨论的精确迁移去向

原位置统一为`/about/company-profile/#applications`（含`#part-studies`别名）。以下是原文要点保留，不是证明这些行业已有客户或取得认证。简介保留简短入口表与原锚点；描述移到现有链接目标的“使用/评审条件”短段，按产品第4模块或能力的技术条件模块接收，不新增行业落地页。目标页目前没有这些新增短段，属于本方案的实施任务。

| 原应用项 | 必须保留的原文信息 | 最终接收URL/模块 |
|---|---|---|
| Laboratory & scientific instruments | Instrument blocks, brackets and housings with mounting interfaces, bores and internal passages. | `/products/part-examples/custom-oem-high-precision-cnc-milling-manufacturer/`；P详情模块4使用/供应条件 |
| Automotive & motorcycle prototypes | Billet covers, intake components and throttle housings for developing designs and checking assemblies. | `/capabilities/prototype-machining/`；C3.3交付/批准条件 |
| Hydraulic & rescue equipment | Custom valve bodies, fittings and mechanical interfaces for hydraulic tools and equipment assemblies. | `/products/part-examples/global-oem-precision-machining-solutions/`；P详情模块4使用/供应条件 |
| Robotics & automation | Mounting plates, sensor brackets and compact housings reviewed against assembly interfaces and access requirements. | `/capabilities/5-axis-cnc-machining/`；C1.4图纸/验收条件 |
| Agricultural machinery | Housings, brackets and shafts for equipment assemblies, reviewed against the drawing and operating conditions. | `/capabilities/cnc-milling-service/`；C1.4图纸/验收条件 |
| Industrial fans & impellers | Blade hubs and rotating components with curved features, reviewed for setup access, material and inspection needs. | `/capabilities/5-axis-cnc-machining/`；C1.4图纸/验收条件 |
| Aerospace & defense equipment | Custom housings and interfaces can be reviewed against the drawing, traceability, end-use and export requirements. | `/capabilities/5-axis-cnc-machining/`；C1.4图纸/验收条件 |
| Semiconductor equipment | Equipment housings and precision interfaces; define cleanliness, chemical exposure and any ESD requirements for review. | `/capabilities/cnc-milling-service/`；C1.4图纸/验收条件 |
| Electronic & audio equipment | Enclosures, mounting structures and precision housings, with attention to fit and visible surfaces. | `/products/part-examples/small-batch-cnc-machining-manufacturer-complex-aluminum-housings/`；P详情模块4使用/供应条件 |
| UAVs, 3D printers & motion systems | Lightweight structures, mounting features and machined interfaces for compact assemblies. | `/products/part-examples/custom-high-precision-machining-for-structural-aesthetic-components-oem/`；P详情模块4使用/供应条件 |
| Medical devices & industrial equipment | Custom mechanical components made to the equipment drawing, with material and inspection requirements agreed for the order. | `/capabilities/cnc-turning-service/`；C1.4图纸/验收条件 |

### 4.2 待补真实资料

| 缺项 | 影响及当前处理 | 后续所需材料 |
|---|---|---|
| 当前ISO证书文件 | 保留已获授权的certified声明与请求入口，不绘制证书 | 主体、编号、范围、机构、有效期、可公开原件 |
| 设备/能力当前台账 | 最大包络/行程/负载未公开，继续逐图评审 | 带日期的机型/行程/夹持/负载清单及公开范围 |
| 量具校准与脱敏实测报告 | 照片只做设备依据，不宣传默认全检/具体合格率 | 当前校准、量程、方法、可公开报告与抽样规则 |
| 参考月产依据 | 不改成交付保证 | 统计周期、品类、几何/材料/班次/后处理、实际记录 |
| 低清或拼图产品单件原照 | 卡片不能虚构高精细节；按第5节限尺寸/裁片/补拍 | 同一实物全件三分之四、关键接口、背面/配合面；对应P-ID |
| 组件/BOM/功能范围 | 继续保留to define，不能按图片推定整套供货 | 组件清单、可供状态、图纸版本、功能测试方法/限值 |
| 来访日期冲突 | 当前标签保留来源口径，不根据日历改照片或增新事实 | 该次活动可靠原始日期/公开授权；未核前不扩写精确拍摄日 |
| 真实客户结果/交付 | 本站不因此补案例模块 | 授权客户/项目/订单范围、脱敏交付/验收记录；没有就不建成功故事 |

## 5. 图片改造计划：逐图位决定，不用生成填补证据

### 5.1 统一摄影方向与处理方式

参考当前P02叶轮、P13真实cover、P29保留主体的中性背景以及workshop-wide：可取的共同优点是能识别金属加工纹理、真实边缘和装配关系。目标是中性偏冷的白/浅灰底、柔和侧上方光、真实金属反射、少量接触阴影、三分之四或工程上有用的正视角。保留黄铜/塑料原色与真实车间绿色地面，不强制全库去色或涂成“科技银”。

问题分开处理：画布空白用裁空白/匹配容器；主体太小用真实局部或补拍；低清不靠生成螺纹“变清晰”；现场杂乱保留关系并缩小角色；照片和CAD分别呈现。目录和详情引用同一主体身份，不能重新生成另一个看似相近零件。

五种最终处理代码：**K保留；L仅布局/真实裁切；E基于原图编辑背景/曝光/画布，产品像素和边缘受保护；G按既有摄影方向生成通用非证据图；R需要真实补拍/资料。** 本轮没有必须新增G的图位：现有切削示意可用，优先把关键展示位换成清楚的真实主体/局部。不是为了保留旧图而保留差画幅；达不到识别标准的P08/P27/P32等明确列补拍，不在新布局里硬放大。

### 5.2 构图规格（每个图位表按此指定，构成完整制作要求）

| 规格 | 画幅/主体与文字安全区 | 手机裁切/真实性条件 |
|---|---|---|
| G1 单件 | 详情4:3，目录4:3；竖件允许3:4独立图框。主体中心偏下，长边占76–86%，四边≥6%安全边；文字在图外，整图为不可覆盖区 | 手机contain完整主体，图高240–340px；禁止裁孔/螺纹/叶片/标识。输出分辨率按有效源像素，不按文件名猜。 |
| G2 多件拼图 | 完整来源1:1或原比；卡片改一个真实清晰局部4:3，所选件占75–85%；整组不强行塞单件框；无叠字 | 手机局部卡图约132px宽，详情完整组≥内容宽；局部不足220px有效边则不硬放大，采用完整图+明确多形态标签并列R补拍。 |
| G3 细长件 | 横件3:2、竖件3:4，长边80–88%，短边自然；不旋转成假加工视角，无叠字 | 手机contain，不能为填满框改变长径比；低清主展示宽≤源有效宽。 |
| G4 组件/CAD | 原比或4:3 contain，整体占70–82%，保留所有有关组件与标记；CAD不转摄影，不补背面/执行器 | 手机完整范围优先，关键供货定义在图前后；原图480px就限制展示和细节期待。文字区在外侧。 |
| G5 批量来源 | 目录真实单件局部4:3，主体80%左右；详情另保留完整排布自然比例，不能移件增件 | 手机局部识别→原批图→说明；零件颜色不改，数量不作为产能证明。 |
| G6 工序证据 | 完整场景自然比、主体与夹具关系保留；另一个真实局部4:3，占局部框65–80%；HTML编号在空余边界，不盖刀具/接触点 | 手机全景→局部→短说明；不能把裁切当另一个工序或生成未见工具路径。 |
| G7 车间/人物 | 车间原横幅或3:2，设备/走道占画面主要区域；人物自然比，脸/手持件完整；文字全部图外 | 手机车间可轻裁空墙不可裁关键设备，群像用contain/自然高，不生成扩厂/增人。 |
| G8 证件/档案 | 原比例完整边框，缩略图约180–240px宽，旁放可读HTML用途/日期/范围；禁止修补文字/印章/有效期 | 手机全文摘要+原件访问；原件限原分辨率，不能用AI超分臆造可读字。 |
| G9 通用示意 | 默认4:3，中心主体65–75%，无文字烘焙；确需注释用HTML/矢量，标示illustration；没有实际尺寸数值 | 手机同构图，不依赖只有桌面可见的角落；不能与真实项目拼成前后证据。 |

**下一阶段编辑任务必须附本表规格+下表真实参考文件+原始主体特征清单。** 背景编辑只允许原有主体外区域；有透明边界、薄叶片、螺纹等难以保护时用原像素和完整背景，改布局或补拍，不让模型重建。

### 5.3 35条产品主图

每行图位均含该P-ID在目录、详情、首页/能力推荐中的全部复用。精确URL见第3节；引用文件名含1200不代表原图有1200px。以下真实源文件来自当前 `productSourceMedia.generated.json`，尺寸为登记的有效原图尺寸；实际显示文件存在性另已核验。

| 记录/适用图位 | 当前显示文件；真实原图 | 处理/原因 | 完整制作规格与限制 |
|---|---|---|---|
| **P00** 圆盘多孔形态；端面、孔列与同心/位置关系 | `public/media/product-sources-20261015/p00-framed-1200.webp`；原图 `D:/lzz/raw/_content/images/products/CNC-Milling-Service-1-1764417292122--54b8b81a8c.jpg`（520×520） | **K/L** 当前已裁外白边，保留端面孔列；真实局部只补新增特征 | **G1**，本行原图为唯一主体参考，文字全部图外；M按该规格；孔/部件/标识/比例不变 |
| **P01** 九种铣削形态拼图；选中对象与孔/安装面分别定义 | `public/media/product-sources-20261015/p01-1200.webp`；原图 `D:/lzz/raw/_content/images/products/CNC-Milling-Service-2-1764417849930--28b1b081fe.jpg`（800×800） | **L/R** 九形态拼图，卡片用一件真实局部；局部不够清晰则补拍，不重构 | **G2**，本行原图为唯一主体参考，文字全部图外；M按该规格；孔/部件/标识/比例不变 |
| **P02** 曲面叶轮；叶面、根部、轮毂与平衡范围 | `public/media/product-sources-20261015/p02-1200.webp`；原图 `D:/lzz/raw/_content/images/products/5-axis-Machining-1-1764418510957--4b51164023.jpg`（800×800） | **K/L** 清楚主图保留；hub-detail真实裁切与主图组成一组，取消另外重复图 | **G1**，本行原图为唯一主体参考，文字全部图外；M按该规格；孔/部件/标识/比例不变 |
| **P03** 斜颈回转件；螺纹轴与主体轴关系，不生成背面 | `public/media/product-sources-20261015/p03-framed-1200.webp`；原图 `D:/lzz/raw/_content/images/products/5-axis-Machining-2-1764418526610--635f52f78c.jpg`（520×650） | **K/L** 保留斜颈、底缘与比例，竖向框；无背面生成 | **G3**，本行原图为唯一主体参考，文字全部图外；M按该规格；孔/部件/标识/比例不变 |
| **P04** 蓝色多面圆件；多方向孔/面与安装基准，颜色不证实处理 | `public/media/product-sources-20261015/p04-framed-1200.webp`；原图 `D:/lzz/raw/_content/images/products/5-axis-Machining-3-1764418541931--3aeb6953e6.jpg`（864×576） | **L** 裁上下空白，完整外缘孔；蓝色不能推断处理状态 | **G1**，本行原图为唯一主体参考，文字全部图外；M按该规格；孔/部件/标识/比例不变 |
| **P05** 多种车削/块状形态组合；分别指定待报价对象 | `public/media/product-sources-20261015/p05-1200.webp`；原图 `D:/lzz/raw/_content/images/products/Turning-1764418561811--0fef80039e.jpg`（800×800） | **L/R** 混合圆件/块件，取清晰真实单件或补拍，完整组留详情 | **G2**，本行原图为唯一主体参考，文字全部图外；M按该规格；孔/部件/标识/比例不变 |
| **P06** 旋转及圆柱/块状组合；交叉孔、平面、槽 | `public/media/product-sources-20261015/p06-1200.webp`；原图 `D:/lzz/raw/_content/images/products/Turning-2-1764418599598--a725a21893.jpg`（800×800） | **L/R** 以可辨孔/法兰的真实子件作卡图，完整六形态保留 | **G2**，本行原图为唯一主体参考，文字全部图外；M按该规格；孔/部件/标识/比例不变 |
| **P07** 接头/法兰/螺纹拼图；连接标准、密封面、安装 | `public/media/product-sources-20261015/p07-1200.webp`；原图 `D:/lzz/raw/_content/images/products/Turning-3-1764418610761--08a5f82825.jpg`（800×800） | **L/R** 真实接头局部作卡图，完整组支持螺纹/密封/安装讨论 | **G2**，本行原图为唯一主体参考，文字全部图外；M按该规格；孔/部件/标识/比例不变 |
| **P08** 黑色表面处理件拼图；最终表面与保护界面 | `public/media/product-sources-20261015/p08-1200.webp`；原图 `D:/lzz/raw/_content/images/products/Full-Service-CNC-Milling-Solutions-Custom-Metal-Parts-Manufacturer-with-Finishing-1764554912970--2f27187334.jpg`（800×800） | **R/L** 黑色多件边缘暗；优先单件补拍，当前完整图仅作参考，不AI补边缘 | **G2**，本行原图为唯一主体参考，文字全部图外；M按该规格；孔/部件/标识/比例不变 |
| **P09** 结构/外观组件；外观要求与配合条件分开 | `public/media/product-sources-20261015/p09-1200.webp`；原图 `D:/lzz/raw/_content/images/products/Custom-High-Precision-Machining-for-Structural---Aesthetic-Components-OEM-1764555402077--60c319adfb.png`（1256×1256） | **K/L** 保留真实外观/结构，挑明确对象，表面处理不凭图确定 | **G2**，本行原图为唯一主体参考，文字全部图外；M按该规格；孔/部件/标识/比例不变 |
| **P10** 内外复合车削特征；螺纹、工作直径、沟槽/肩 | `public/media/product-sources-20261015/p10-1200.webp`；原图 `D:/lzz/raw/_content/images/products/High-Volume-CNC-Turning-for-Complex-Internal---External-Features-1764555543979--ac36118db2.jpg`（800×800） | **L** 多件内外特征需指定对象，卡片真实局部，不制造新组合 | **G2**，本行原图为唯一主体参考，文字全部图外；M按该规格；孔/部件/标识/比例不变 |
| **P11** 涡轮/流体形态；曲面与配合，平衡测试独立 | `public/media/product-sources-20261015/p11-1200.webp`；原图 `D:/lzz/raw/_content/images/products/High-Reliability-Precision-Machining-Turbine--Fluid---Complex-Curve-Component-OEM-1764555925002--928a6e0ea7.jpg`（800×800） | **K/L** 保留曲面及轮毂，局部对应真实形态；不增加叶片或虚构平衡 | **G1**，本行原图为唯一主体参考，文字全部图外；M按该规格；孔/部件/标识/比例不变 |
| **P12** 中冷器样件参考；提供组件、连接与压力/性能测试范围 | `public/media/product-sources-20261015/p12-1200.webp`；原图 `D:/lzz/lzz/_react/public/media/source-details/intercooler-original-1200.webp`（1200×1600） | **K/L** 完整中冷器来源保持，接头/焊接/功能供应分开定义 | **G4**，本行原图为唯一主体参考，文字全部图外；M按该规格；孔/部件/标识/比例不变 |
| **P13** 手持engine cover；配合/外观及实际来源上下文 | `public/media/product-sources-20261015/p13-1200.webp`；原图 `D:/lzz/lzz/_react/public/media/source-details/engine-cover-original-1200.webp`（1080×814） | **K/L** 手持真实cover保留；允许裁无用外边，不能删除手持关系后冒充棚拍 | **G1**，本行原图为唯一主体参考，文字全部图外；M按该规格；孔/部件/标识/比例不变 |
| **P14** 进气系统装配参考；定义需要加工的子组件，不默认总成 | `public/media/product-sources-20261015/p14-framed-1200.webp`；原图 `D:/lzz/raw/_content/images/products/Custom-Billet-Intake-Manifold-Manufacturer-and-Automotive-Performance-Prototype-Supplier-1764818472101--8eac77ab3f.jpg`（520×650） | **K/L/R** 装配背景偏暗且低清；限大小、供货定义前置，需要单组件补拍，禁止抽象重绘整机 | **G4**，本行原图为唯一主体参考，文字全部图外；M按该规格；孔/部件/标识/比例不变 |
| **P15** Throttle-body CAD；非实拍，壳体/轴/执行器供货范围待定义 | `public/media/product-sources-20261015/p15-framed-480.webp`；原图 `D:/lzz/raw/_content/images/products/Custom-CNC-Machined-Electronic-Throttle-Body-Manufacturer-and-Automotive-Prototype-Supplier-1764818699747--08c3a85146.jpg`（480×480） | **K/L** CAD结构完整，保留彩色部件区分，限制有效480px源放大 | **G4**，本行原图为唯一主体参考，文字全部图外；M按该规格；孔/部件/标识/比例不变 |
| **P16** Injector/fuel-rail manifold；独立CAD来源版本、接口与供货 | `public/media/product-sources-20261015/p16-framed-1200.webp`；原图 `D:/lzz/raw/_content/images/products/Custom-Billet-Aluminum-Intake-Manifold-Manufacturer-and-Automotive-Prototype-Supplier-1764819347681--17eb362db7.jpg`（720×500） | **K/L** 主体与独立CAD不同源/版本未知，不合并成同一受控件 | **G4**，本行原图为唯一主体参考，文字全部图外；M按该规格；孔/部件/标识/比例不变 |
| **P17** Plenum；port与内部细节独立参考，功能测试另定 | `public/media/product-sources-20261015/p17-1200.webp`；原图 `D:/lzz/lzz/_react/public/media/source-details/plenum-original-1200.webp`（1200×1200） | **K/L** 完整plenum与两个真实接口/内部细节对应；无剖面补绘 | **G4**，本行原图为唯一主体参考，文字全部图外；M按该规格；孔/部件/标识/比例不变 |
| **P18** Transmission/pump casting；来料毛坯、加工余量与责任 | `public/media/product-sources-20261015/p18-framed-1200.webp`；原图 `D:/lzz/raw/_content/images/products/Custom-CNC-Machined-Castings-Transmission-Housings---Pump-Bodies-1764757074510--2cf2756006.jpg`（640×640） | **K/L/R** 完整毛坯壳体与加工面；源偏小，主展示限宽，补关键面照片 | **G1**，本行原图为唯一主体参考，文字全部图外；M按该规格；孔/部件/标识/比例不变 |
| **P19** 带法兰回转组件；保留方向标记/紧固件，非普通长轴 | `public/media/product-sources-20261015/p19-framed-1200.webp`；原图 `D:/lzz/raw/_content/images/products/Custom-CNC-Turned-Stainless-Steel-Components-Manufacturer-and-Precision-Shaft-Supplier-1764816944325--cacdc81da0.jpg`（800×600） | **K/L** 保留法兰、旋钮/紧固件和标记，不当细长轴 | **G4**，本行原图为唯一主体参考，文字全部图外；M按该规格；孔/部件/标识/比例不变 |
| **P20** 非金属/绝缘形态；材料、工作环境、温湿度测量状态 | `public/media/product-sources-20261015/p20-1200.webp`；原图 `D:/lzz/raw/_content/images/products/Custom-OEM-CNC-Machined-Non-Metallic-Components-Insulating-Parts-1764557225251--5ba2c574ee.jpg`（800×800） | **E/R** 浅件暖白背景，可真实曝光/背景对比整理；不漂白材质，不补孔槽 | **G1**，本行原图为唯一主体参考，文字全部图外；M按该规格；孔/部件/标识/比例不变 |
| **P21** 多种塑料形态拼图；对象选择、精确牌号与装配条件 | `public/media/product-sources-20261015/p21-1200.webp`；原图 `D:/lzz/raw/_content/images/products/Plastic-Parts-1764418490181--3049ef7c93.jpg`（800×800） | **L/R** 彩色塑料多形态，真实单件卡图；颜色不能鉴定grade | **G2**，本行原图为唯一主体参考，文字全部图外；M按该规格；孔/部件/标识/比例不变 |
| **P22** 开口带筋铸壳；刀具访问、定位、保留铸态面 | `public/media/product-sources-20261015/p22-framed-1200.webp`；原图 `D:/lzz/raw/_content/images/products/OEM-Precision-CNC-Machined-Casting-Housing---Structural-Enclosures-1764756565591--89bc1a30be.jpg`（600×600） | **K/L** 完整带筋开口壳体；保持内部可见纹理，不推断功能 | **G1**，本行原图为唯一主体参考，文字全部图外；M按该规格；孔/部件/标识/比例不变 |
| **P23** 带接口壳体；样件重建定义与毛坯/加工面 | `public/media/product-sources-20261015/p23-framed-1200.webp`；原图 `D:/lzz/raw/_content/images/products/OEM-Precision-CNC-Machined-Casting-Housings-1764756827055--12d46fe8bb.jpg`（576×720） | **K/L** 竖向壳体完整上下接口，调整图框不改变形状 | **G3**，本行原图为唯一主体参考，文字全部图外；M按该规格；孔/部件/标识/比例不变 |
| **P24** 不规则铸件；密封、配合、安装孔的验收 | `public/media/product-sources-20261015/p24-1200.webp`；原图 `D:/lzz/raw/_content/images/products/Precision-CNC-Machined-Castings---Custom-OEM-Housings-1764756207527--bd238e3ac3.jpg`（800×800） | **L/R** 主体偏小，裁无效空白；补配合/背面实拍，不能生成内腔 | **G1**，本行原图为唯一主体参考，文字全部图外；M按该规格；孔/部件/标识/比例不变 |
| **P25** 开口铸件结构；隐藏接口/测量访问不能凭图补全 | `public/media/product-sources-20261015/p25-framed-1200.webp`；原图 `D:/lzz/raw/_content/images/products/Precision-CNC-Machined-Castings-Manufacturer-1764757607644--746269a403.jpg`（680×510） | **K/L** 保持开口与安装面，真实局部辅助，不统一成虚假渲染金属 | **G1**，本行原图为唯一主体参考，文字全部图外；M按该规格；孔/部件/标识/比例不变 |
| **P26** 绿色重复孔长条；单件孔关系、材料状态与批次定义 | `public/media/product-sources-20261015/p26-1200.webp`；原图 `D:/lzz/raw/_content/images/products/Precision-CNC-Machining-for-Complex-Plastic-Geometries-and-Tight-Tolerances-1764558015887--2ed6fe3732.jpg`（800×800） | **L** 绿色长条批图，卡片真实一排/一件；保留重复孔与台阶 | **G5**，本行原图为唯一主体参考，文字全部图外；M按该规格；孔/部件/标识/比例不变 |
| **P27** 黄铜色接头堆放；合金/螺纹/镀层，不凭色鉴材 | `public/media/product-sources-20261015/p27-1200.webp`；原图 `D:/lzz/raw/_content/images/products/Precision-CNC-Turned-Brass-Components-Manufacturer-and-Copper-Parts-Supplier-1764759544533--731dc8eed7.jpg`（800×800） | **R/L** 拥挤堆放退为背景记录；补单枚三分之四和螺纹/通道照片 | **G5**，本行原图为唯一主体参考，文字全部图外；M按该规格；孔/部件/标识/比例不变 |
| **P28** Pilot壳体排布；每料号与释放，非固定套件 | `public/media/product-sources-20261015/p28-1200.webp`；原图 `D:/lzz/raw/_content/images/products/Precision-Low-Volume-CNC-Machining-Manufacturer-and-HMLV-Components-Supplier-1764758900962--0c522f190d.jpg`（800×800） | **L** 真实单件局部识别，排布图保留；不推断壳/盖套装 | **G5**，本行原图为唯一主体参考，文字全部图外；M按该规格；孔/部件/标识/比例不变 |
| **P29** 绿色圆件；中心孔、四小孔、曲边与measurement state | `public/media/product-sources-20261015/p29-framed-1200.webp`；原图 `D:/lzz/raw/_content/images/products/Precision-Machining-for-Functional-Plastic-Blocks---Structural-Components-1764557850986--18253f13c7.jpg`（720×720） | **K/L** 当前原像素主体+AI背景已标记；保持圆形四孔曲边，不再生成 | **G1**，本行原图为唯一主体参考，文字全部图外；M按该规格；孔/部件/标识/比例不变 |
| **P30** 开放壳体排布；侧口、安装耳、壁与接口 | `public/media/product-sources-20261015/p30-1200.webp`；原图 `D:/lzz/raw/_content/images/products/Precision-Small-Batch-CNC-Milling-Manufacturer-for-Complex-Aluminum-Enclosures-1764759147466--836aea071b.jpg`（800×800） | **L** 卡片一真实壳体，完整排布后置，侧口/安装耳完整 | **G5**，本行原图为唯一主体参考，文字全部图外；M按该规格；孔/部件/标识/比例不变 |
| **P31** 回转组件及独立法兰；ON/OFF标记与完整供应范围 | `public/media/product-sources-20261015/p31-1200.webp`；原图 `D:/lzz/raw/_content/images/products/Precision-Stainless-Steel-CNC-Turned-Parts-Manufacturer-and-316L-Components-Supplier-1764815807487--200e743e3f.jpg`（800×800） | **K/L** ON/OFF标记及独立法兰同框，不能变普通316L轴 | **G4**，本行原图为唯一主体参考，文字全部图外；M按该规格；孔/部件/标识/比例不变 |
| **P32** 索引销；安装、啮合、内部弹簧未知及组件/整套区别 | `public/media/product-sources-20261015/p32-framed-1200.webp`；原图 `D:/lzz/raw/_content/images/products/Precision-Stainless-Steel-Indexing-Plunger-Manufacturer-and-Spring-Loaded-Locking-Pin-Supplier-1764817299753--5e240a8195.jpg`（630×420） | **R/L** 原图放大偏软；先限展示尺寸并保长径比，补真图，不锐化/生成螺纹和弹簧 | **G3**，本行原图为唯一主体参考，文字全部图外；M按该规格；孔/部件/标识/比例不变 |
| **P33** 盖/密封铝壳；配合面、安装接口与批图来源 | `public/media/product-sources-20261015/p33-1200.webp`；原图 `D:/lzz/raw/_content/images/products/Small-Batch-CNC-Machining-Manufacturer-Complex-Aluminum-Housings-1764758302026--a5c49734de.jpg`（800×800） | **L** 清晰单件局部可作封面，完整批图后置，盖/密封配合待图纸 | **G5**，本行原图为唯一主体参考，文字全部图外；M按该规格；孔/部件/标识/比例不变 |
| **P34** 重复车削件；单件/BOM/版本/追溯，不称混材质套件 | `public/media/product-sources-20261015/p34-1200.webp`；原图 `D:/lzz/raw/_content/images/products/Small-Batch-CNC-Machining-Manufacturer-Precision-Aluminum-Components--HMLV--1764758090931--2d5650d334.jpg`（800×800） | **L** 重复车削件取真实局部；完整来源保留，BOM定义型号材质 | **G5**，本行原图为唯一主体参考，文字全部图外；M按该规格；孔/部件/标识/比例不变 |


### 5.4 首页、工艺、工厂、集合及资料的重要图位

本表 `/media/` 均对应项目 `public/media/`。同组多个文件不是可任意互换的备选：写明“完整+局部”“配对”“三图”的必须共同保留其职责。

| 图位/页面模块 | 当前图与真实参考 | 原因与最终处理 | 目标构图/手机/不可改变项 |
|---|---|---|---|
| HOME-01 / H1 | `/media/redesign-20261015/machining-hero-1200.webp`及同组1448原派生；来源登记`docs/imagegen-redesign-20261015/` | K：已清楚显示刀具接触工件；不为换风格再生成一次 | G9，4:3保留切削接触点；M全图。可见AI说明，不能改称工厂实拍。 |
| HOME-02 / H2 | P02/P22/P32/P26真实源文件见上表 | L/E：白方底套灰框、主体大小不同；裁无效外白边并将容器背景与原画布一致 | G1/G3/G5；零件光学尺度接近，M2列仍可辨孔/边缘。P26取真实一排局部，不改形态。 |
| IMG-P0 / Products首屏 | 当前`/media/products-editorial-20261014/part-families-1200.webp`；真实替换参考P02、P13、P32 | E：当前AI集合退出主要产品展示；用3个真实主体独立图框组合，背景仅做中性整理，不合成为同一实拍照片 | D整体3:2，主件约55%面积，两个次件各独立；M一主两小或2列，文字图外。不能改变实物大小关系后声称同套配件。 |
| CAP-00 / 能力目录 | 当前概念封面（精确引用见该URL图片索引） | L：目录取消大封面占位，改P01/P32/P02/P22真实路线缩图 | G1/G2/G3；具体工艺行先出现，不用大图阻挡选择。 |
| CAP-01 / Milling首屏与解释 | 当前两处工艺示意，真实参考P01/P04/P33及two-stage实拍 | L：主实物前置；两份相似几何示意合并或退出正文主线，完整工程字段不删 | 首屏G2真实形态；C1.3用G6两装夹。需讲内角时仅留一张G9，不能冒充该真实件。 |
| CAP-02 / Copper首屏 | P27、`/media/source-details/metal-brass-batch-1200.webp` | L/R：用清晰真实接头近区代替规格文字侧栏；拥挤源图不能当最终高端主照 | G1/G5；后续补一枚接头三分之四、螺纹/通道特写，保留真实材质色。 |
| CAP-03 / Casting | P18/P22/P24；当前casting-stages说明图按逐URL索引 | L：真实壳体提前；示意只在毛坯/加工责任需要时出现 | G1完整壳体+可见加工面真实局部，手机先形态后责任；无原始毛坯前后对应，不制造前后图。 |
| CAP-04 / Prototype | 当前概念图；P13/P12/P15真实/CAD来源 | L：真实cover主图，intercooler与CAD为标明身份的辅图 | G1主件，G4辅图；M一件一说明，不将CAD改实拍。 |
| CAP-05 / Batch | 当前单件/重复件概念图；P28/P34/P30 | L：用单件局部识别+对应原批图说明料号管理 | G5，不人为增加件数，不声称同批订单。 |
| CAP-06 / Sample | `/media/capabilities-section-20261014/sample-definition-1200.webp`、P23 | L：P23样件优先；概念图撤出首屏，三阶段定义用文字/表 | G1竖件自然比，完整接口；不生成未知材质/截面。 |
| ST-01 / Five-axis | `/media/evidence/five-axis-operation-1600.webp`、`five-axis-parts-1600.webp` | L：全景+真实工件局部，完成件批图后置 | G6；保留旋转夹具，不凭静帧宣称同步联动。 |
| ST-02 / Turn-mill | `/media/evidence/turn-mill-operation-1600.webp`、`turn-mill-parts-1200.webp` | L：夹具大而工件小，增加真实近区；箱内零件只作形态补充 | G6；原图与局部对应，轴线/端面关联用HTML说明。 |
| ST-03 / Two-stage | `/media/evidence/two-stage-first-1600.webp`、`two-stage-second-1600.webp` | K/L：两张都必要，同一尺度并列，分别写可见面与定位关系 | D双4:3完整/局部配对；M按1→2顺序。不把两静帧合成虚构连续加工视频。 |
| ST-04 / Pocketed enclosure | `/media/evidence/milling-enclosure-operation-1600.webp`、`milling-enclosure-parts-1600.webp` | L：场景小件用局部，竖向批图后置 | G6+G5；壁/内角/孔轮廓不改。 |
| ST-05 / Prismatic | `/media/evidence/multi-feature-milling-operation-1600.webp`、`multi-feature-milling-parts-1600.webp` | E/L：暗场景可校正曝光并裁真实近区；完整长批图后置；仍不清晰就R补拍 | G6，保留夹持，不能移除夹具把加工件伪装成成品。 |
| ST-06 / 29-inch panel | `/media/evidence/display-housing-panel-1600.webp`、`display-housing-machining-1600.webp`、`/media/source-details/display-housing-pair-1200.webp` | K/L：整体面板→机床支撑→两面比较；各有新增信息 | 自然比，G6；M整体后再局部。不从29-inch推算外壳尺寸。原视频可选且原生控件。 |
| ST-07 / 五篇工序概念图 | `/media/case-stories-20261014/{turn-mill-form,multi-face-form,two-setup-form,pocket-form,prismatic-form}-1200.webp` | L：默认撤出工序识别主线，避免同一页理解另一种零件；不删除原素材 | 关系必须图解时，以真实原图编号和简明关系示意承接，明确非来源几何、不加实测尺寸。 |
| COL-01 / 两集合封面 | `/media/collection-covers/plastic-collection-illustrative-v1-1200.webp`、`metal-collection-illustrative-v1-1200.webp` | L：目录换真实组代表；集合正文取消重复封面，直接来源组 | 首组自然比。当前AI图退出主要发现路径，不重新生成一批漂亮但无关零件。 |
| COL-02 / PTFE | `/media/source-details/plastic-ptfe-batch-1200.webp`、`plastic-ptfe-intermediate-1200.webp`、`plastic-ptfe-shafts-1200.webp` | L/R：轴形作识别；纸箱杂堆留完整来源，小浅件需要单件补拍改善对比 | G3+G5；M源组独立，不改变材料表面、颜色或堆放数量。 |
| COL-03 / Acrylic | `/media/source-details/plastic-acrylic-batch-1200.webp`、`plastic-acrylic-detail-1200.webp` | L/R：裁边缘桌面杂物，密集红底不做封面；补单件透光边缘实拍 | G1；透明边缘不可由生成补全；M完整轮廓优先。 |
| COL-04 / Metal | `/media/source-details/metal-turned-shaft-1200.webp`、`metal-turned-batch-1200.webp`、`metal-aluminum-close-1200.webp`、`metal-aluminum-housings-1200.webp`、`metal-brass-batch-1200.webp` | L：close/单件识别优先，批图后置。各来源分开，不拼成统一订单 | G3/G5；源中locking-pin不误称普通长轴，黄铜色不鉴定合金。 |
| COL-05 / 视频组 | `/media/source-details/plastic-{pom-gears,pe-guides,ptfe-parts,acrylic-parts}.mp4`、`metal-cleaned-parts.mp4`及登记poster | K：保留独立来源与poster；目前未全程播放，不作画质结论 | 自然比例，小源视频不作满屏背景；M原生控件。清洗片段不证明验收或交付。 |
| REF-01 / 包覆件/齿轮 | `/media/source-details/covered-wheels-1200.webp`、`covered-rollers-1200.webp`、`covered-shaped-parts-1200.webp`、`gear-bevel-examples-1200.webp`、`gear-cylindrical-examples-1200.webp` | L：完整组+真实近件局部；复核纸面信息后才扩大展示；保留原始图组入口 | G2/G3；不估硬度/齿数/模数，不生成齿轮替代。 |
| REF-02 / 组件补图 | `/media/source-details/intake-runner-cad-1200.webp`、`plenum-port-detail-1200.webp`、`plenum-internal-detail-1200.webp`、`intercooler-batch-detail-1200.webp` | K/L：只在提供新增接口/内部视图时放，分别标独立参考 | G4，图旁保留版本/范围未知；不假称同一受控剖面。 |
| FA-01 / Home/Factory/About | `/media/evidence/workshop-wide-1600.webp`、`workshop-aisle-1200.webp`、`workshop-operators-2025-1600.webp` | K/L：wide是主证据，aisle/人员作次级；About不重复整套Factory图 | G7，M保留场景，人脸/设备完整；不得增机台或抹掉真实结构。 |
| FA-02 / CMM | `/media/evidence/cmm-room-1600.webp`、`cmm-detail-1600.webp` | K/L：首页缩为辅助；Factory方法旁展示，取消窄图旁超窄长正文 | 自然竖比，D≤300px宽/M≤260px宽；不裁设备关键部件，不增加校准标签。 |
| FA-03 / 检验示意 | `/media/redesign-20261015/inspection-concept-1200.webp` | K/L：现有示意可留在方法解释，不作检测证据；不再给每类量具生成照片 | G9，保留探球接触语境，M图前说明；真实报告仍需资料。 |
| DOC-01 / Profile证件 | `/media/High-tech-Enterprise-Certificate-1764396986484--69861fe474.webp`、`Zhejiang-1764397018975--75b9eb4d46.webp`、`Artificial-1764396998946--413c4183ea.webp` | K：完整原件，HTML摘要承担阅读；ISO是R资料请求，不能拿三图替代 | G8；高新打印日期8 Dec 2023/印刷3年只陈述文件，当前状态待确认；其余不补未知日期。 |
| DOC-02 / Shipping档案 | `/media/evidence/shipping-example-1600.webp`、`shipment-2022-order-packing-1600.webp`、`shipment-2022-prepared-load-1600.webp` | K/L：3图归Shipping；Workflow最多一缩图链接；生成packing-review退出正文 | G7自然比，M清单后档案。November 2022准备图，不当到货/目的地/承运人证据。 |
| GUIDE-01 / Material finish | `/media/resources/finish-interfaces-v1-800.webp`及同组；`/media/source-details/finish-coated-round-1200.webp`、`finish-coated-bars-1200.webp` | K/L：两真图保留；教学图缩到masking/post-finish两项旁，不作大装饰首图 | G9示意+G1真图分开；不将涂层金属改称PTFE实体，不烘焙虚构尺寸。 |
| NEWS-01 / Australian visit | `/media/company-news/australian-visit-{01,02,03,04,05}-1600.webp` | K/L：03主图、04/02/05车间组、01中性谈话；核日期 | G7，人脸、手持件、日历原样；M自然竖比，无生成客户/签约。 |
| NEWS-02 / Summit及团建 | `/media/company-news/china-africa-summit-{01,02,03,04,05}-1600.webp`；`team-may-2025-{01,02,03,04}-1600.webp`；`team-november-2025-{01,02,03,04,05}-1600.webp`；`team-2024-{01,02,03,04,05,06}-1600.webp` | K/L：按真实事件分组；当前全部原照保留，Profile重复人物图回新闻上下文 | G7，缩略封面不裁人脸/背景重要文字；不能推算人数/文化成效、签约/背书。 |

图片表中的`{...}`是明确列出的同组文件展开记法，不是缺省文件名或留给开发者挑选的备选。完整现用引用与原尺寸在逐URL图片索引中可查。

## 6. 新视觉规则与旧规范的差异

### 6.1 一套可执行的视觉参数

| 元素 | 桌面≥1100px | 平板768–1099px / 手机≤767px |
|---|---|---|
| 字体 | 全站Inter Variable；H1 600、H2 600、正文400。保留品牌原logo | 同字体不另加移动字体。目标是明确的加工目录与阅读层级，取消所有H1必须Georgia的规则 |
| Home H1 | 60px/1.10，最大16ch | 平板48px；手机36px/1.16，320px降32px |
| 目录/企业H1 | 44px/1.16，最大24ch | 34px / 手机30px/1.2 |
| 详情/指南/任务H1 | 40px/1.18，复杂标题允许自然2–3行 | 手机28–30px/1.22，不缩成标签；不能截断产品身份 |
| H2/H3 | 30px/1.28；21px/1.35 | 手机25px/1.3；20px/1.4 |
| 正文/参数 | 正文17px/1.65，技术表16px/1.55，关键答案18px/1.55 | 正文16px/1.65，参数16px/1.6；不低于16px来缩短页长 |
| 图注/辅助标签 | 14px/1.5，必要法律/条件同样可读 | 14px/1.5，表头不能低于14px |
| 主版心 | max1240px，左右40px；阅读正文≤68ch | 平板32px；手机20px，<360px为16px；无固定min-width |
| 指南/表单 | 指南外框1040px，正文680–760px；表单主列≤760px | 单列满可用宽；二维矩阵可显式滚动，其余逐项堆叠 |
| 大模块/相关子组 | 主题72px，相关子组32px；模块内部不再重复上下各88px | 主题48px，子组24px；指南主题40px；段落16px |
| 标题与内容关系 | 标题→引言12–16px，引言→内容24px；相关图→图注8–10px | 12px/20px/8px；禁止标题独占大空段 |
| Hero | 无固定min-height；Home内容区约520–600px，任务页标题区≤220px | Home含页眉定位/动作/主图目标≤760px；目录/指南首屏出现真实选项/工具；不统一图先行 |
| 页眉/按钮 | 页眉约76px；主按钮48–50px高，24px横padding | 页眉68–72px；按钮48px；触达≥44px，字14–16px |
| 图片 | 按G1–G9。图片不加通用圆角/阴影；物体不要双层白框套灰底 | contain完整重要结构；限高是逐图规则，不全站强制同高 |
| 色彩 | 保留白底、正文#191B1D、辅助#606266、动作红#CF141A、浅分组底#F6F6F5；品牌logo原色 | 普通文本≥4.5:1，必要控件边界/焦点≥3:1；不以降低对比减轻密度 |
| 控件/卡片 | 输入圆角4px；证据/正文无需外框卡片，只有独立可选项用卡片；分隔线#DEDEDB，输入边界#8B8D8E，焦点#175B82 | 卡片不把每个句子封成一块；错误需文字与关联提示 |
| 动效 | 内容/图/参数立即可见；控件约160ms反馈 | 保留reduced-motion；不以blur/reveal隐藏采购内容，不新增大段滚动叙事 |

背景只在“零件发现 / 真实依据 / 任务操作”等主题切换处变化。不是每个模块换颜色。首页、企业允许大图；目录、选型、指南、询价优先出现选项、差异、答案或字段。

### 6.2 旧规则逐项处置（本轮仅记录）

| 现行或历史规则 | 最终决定 | 理由/工程边界 |
|---|---|---|
| `DESIGN.md v3.0` 品牌、真实主体、声明台账、草稿边界 | 保留 | 不是视觉偏好，不因重设计改变。 |
| Georgia统一H1 / Home72px / 1280px版心 / 88px主题距 | 修改为6.1参数 | 当前长标题和多段条件造成多层阅读；用更紧凑而可读的层级，不靠小字。旧文件不修改。 |
| 首页固定min-height680px、通用split倾向 | 废弃固定要求，按内容确定 | 避免第一组真实零件始终在一屏后；同页展示与工具可以不同顺序。 |
| 产品默认4:3 contain | 保留完整主体原则，比例按G1–G5细分 | 细长件、拼图、CAD、批图需要不同识别尺度。 |
| 所有图片禁止raw/zoom/modal | 普通产品继续静态，无新全站弹窗；**证件允许明确“View original document”材料链接** | 这是采购材料读取的功能例外，列为待实施规则修改；未补真实可读原件时不伪造链接。不能擅自改当前规范。 |
| 完整来源静态同屏/inline + 多处原图 | 保留来源可达与身份，取消同一图多模块重复显示 | 主图就是完整来源时无需再复制；裁片必须能查完整原图，独立来源分别标签。 |
| 目录112px手机图、卡片仅材料状态标签 | 修改为约132px可识别图+材料值与状态 | 拼图/批图优先真实局部，不能放大低清欺骗识别。 |
| 工艺适配/验收先于任何实例 | 修改为对象/实物→判断→集中验收 | 技术限制仍默认可见，顺序服务首次采购者。 |
| 全部FAQ或字段折叠才能变短 | 不采用 | 15问保持常显并有分类锚点；RFQ三组完整字段保留。 |
| 导航1100px断点、键盘/语义/焦点 | 保留 | 后续验证断点两侧，无须为视觉修改交互契约。 |
| redraw产品结构、生成厂房/证据、100vh、12px技术标签、采购正文reveal | 继续不采用 | 已有正确约束，不因“创新”恢复。 |
| redesign-system基础与各family样式归属 | 保留归属原则，实施时修改对应层 | 不再追加全局高权重覆盖链；保留历史源码/预览，禁止顺手清理用户改动。 |

用户本轮要求优先于Skill中的创建PRODUCT.md、确认视觉方向、覆盖DESIGN.md或实现步骤，因此本轮不做这些动作。未发现需要删除项目指令才能提出此方案的冲突；旧视觉规范与本方案的差异全部列在这里，供实施阶段明确处理。

## 7. 分批实施顺序与验收标准

### 7.1 实施顺序

| 批次 | 完成内容 | 进入下一批的可检查条件 |
|---|---|---|
| 0 内容与素材基线 | 在实施当时保存工作区；逐URL/字段/图片映射以当前版本刷新；标记旧方案已被新方案替代的适用范围 | 原始图/产品ID/URL/锚点/声明和草稿契约可追溯；不将本轮审查截图当实施后截图。 |
| 1 一条完整采购路径 | H首页、P1目录、P02单件、P15 CAD、P33批图、two-stage研究、RFQ checklist、Quote；同时建立新字号/间距/图片图类 | 真实内容样页能走完“识别→判断→准备资料”；D/M图片与所有独有条件通过；再扩同类，不先批量换35张图。 |
| 2 能力与真实依据 | C0、milling、copper、casting、prototype、batch、sample样页；再覆盖余工艺/材料；Factory | 每类型都能在首屏说清对象；牌号/时间/验收未因压缩丢失；没有生成证据替代。 |
| 3 全部参考与研究 | 其余34/已完成样页之外的具体记录、6工序、2集合、包覆/齿轮图库；按P-ID执行图片计划 | 每条参数/身份/来源对齐；同一主体跨入口一致；原图不足的保留受控展示或用真实补拍，不猜结构。 |
| 4 企业与知识库 | About职责分工、证件、流程/联系/新闻；其余指南/FAQ/Privacy/404 | 旧内容去向账逐项关闭；工具、文档日期、付款/售后、所有15问与有效内链仍在。 |
| 5 本地全站验收与交付 | 当前URL清单重新渲染，更新逐页状态、截图与事实字段比对；规范按批准实施结果更新 | 验收结果明确区分本地/预览/生产；本方案不授权发布，部署留到独立任务。 |

### 7.2 内容与采购体验验收

1. 首页首次进入，5秒任务测试能回答“LZZ做按图定制CNC零件、服务原型/小批量、可从图纸或样件开始”；不能把记住口号当理解。至少用一名未参与改版者实际测试，记录回答，未做就标未验证。
2. 390×843 CSS视口下，产品目录第一条完整参考可见；材料选项显示具体值及option/listed/to confirm。搜索/多条件/重置/无结果/回退和URL恢复保持；不靠缩字实现首屏指标。
3. P02、P15、P29、P32、P33代表单件/CAD/圆件/细长/批图。用户在主图旁可看到形态与供货范围；同一完整图不再作为无新增信息的大模块重复。
4. 每个具体特征至少有一个明确“图纸怎么定义/如何验收”落点；材料、处理、条件、数值、单位与责任逐项对比改前内容，无失踪值。独有FAQ若并表，应能查到明确去向。
5. 工艺页先理解加工对象，再看详细资料要求；指南先得到答案或工具；询价首屏看到任务与首字段。Company profile证件摘要、Factory设备与验收职责可分别找到。
6. RFQ复制模板前置，三组完整说明、NDA、控制文件、未知材料和开放项仍可见；不通过默认关闭所有内容制造短页。
7. 原型/批量/样件的批准点、材料替代、重建费用时间及未测试功能不混为通用营销段；照片不承担参数或性能证明。

### 7.3 图像与视觉验收

- 每张编辑/裁切图与指定原图逐对对照孔、槽、螺纹、叶片、配件、文字标记、轮廓、长径比；主体保护失败则回用原图并补拍。记录源文件、处理方式、输出尺寸/哈希与页面使用处。
- 图内主体与外框按G1–G9测量；白底不套第二层无用途灰框；不裁关键结构，不把480px来源作为1200px细节展示。真实原图、AI背景、CAD、通用示意身份始终明确。
- 照片按真实光线/材质保留，工厂/客户/证件/检测/交付不得生成替代。历史档案保留日期、证明范围与独立来源，不变成当前订单结果。
- D/M每个样页检查首屏和每个主模块；重要变体检查完整页。320/390/768/1100/1440px、200%缩放、菜单断点两侧核验；截图懒加载失败应滚入确认，不能把工具空白误报成网站缺图。
- 无页面横溢出、标题孤悬、远离所属图的caption、过窄技术正文列；正文/参数保持字号/行宽/对比，表格列义不丢。没有固定100vh空首屏或逐段同款卡墙。

### 7.4 功能、搜索与工程验收

- 保留全部84业务URL、有效旧锚点、153条迁移规则及目标映射；若实施确需调整，先给逐条理由/去向并单独验证，不能顺手改URL。Article/Breadcrumb/FAQ等结构数据与可见标题/正文/图片一致。
- 产品标题可以缩为可读形态名，但保留CNC/part form/material等原有必要搜索主题；不保留无依据“ultra high precision”能力承诺来讨好关键词。canonical、robots、sitemap和预览noindex按当前职责复核。
- Quote验证必填与Email/Phone任选、首错焦点、reference解析、sessionStorage恢复/clear/不可用、改reference同key、Copy失败/TXT、无JS。只用本地测试数据，不点击发送外部邮件/消息；没有真实送达就不写送达。
- 后续实施运行 `npm run check`、`npm run build`、`npm run test:seo`、`node scripts/verify.mjs --static`，再做与改动相关的菜单、筛选、Copy/TXT、表单状态和链接检查。不是本轮已通过声明。
- 只读方案阶段不运行构建来制造“通过”记录；本轮验收仅检查交付文档覆盖、路径有效、证据状态真实，以及业务源码/图片/规范未改。

### 7.5 本轮交付证据与未验证事项

- [inventory.json](review-20261015-current/inventory.json)：当前重新生成的路由/标题/全部模块、表格、图片路径/尺寸、内链与来源快照。静态快照不等于实时视觉。
- [live-content.json](review-20261015-current/live-content.json)：84业务页本轮实际DOM正文与图位记录；不等于图片均已滚入或功能均已点击。
- [逐URL图片与模块明细](review-20261015-current/url-evidence.md)：对应每页当前模块、独有文本和全部图片引用；是第3节的明细依据。
- [live-records.json](review-20261015-current/live-records.json)与[screens目录](review-20261015-current/screens/)：本轮可靠视口捕获；第3节V只代表标记范围。
- [Products独立评审](review-20261015-current/products-review.md)、[能力/工厂独立评审](review-20261015-current/capability-review.md)、[企业/资源独立评审](review-20261015-current/content-review.md)：源码与原图/可靠截图交叉意见，最终决定以本方案为准。
- [只读与覆盖核验](review-20261015-current/verification.json)：业务文件、规范及现用图的只读边界与文档覆盖结果。

未验证：线上是否与本地一致；生产HTTP状态/跳转链/历史源网址；完整视频播放；真实表单发送/收件；证书当前有效状态和工厂现实能力；所有未标V页面的独立D/M视觉；代表页未截图区域的逐像素质量。没有这些证据时，不写“全站已视觉通过”或“可以直接上线”。

