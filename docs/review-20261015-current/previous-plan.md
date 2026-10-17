# LZZ 网站最终改造方案

审查日期：2026-10-15。项目：`D:/lzz/lzz/_react`。审查对象为当前本地网站 `http://127.0.0.1:4323/`、路由与内容源码、现有构建快照、实际图片文件及来源登记。本文是一套待实施决定，不是实施完成或生产验收报告。

## 1. 主要问题与改造边界

### 1.1 最终方向

网站继续定位为 **LZZ Precision 按图定制 CNC 零件的采购与供应商评审网站**。产品目录展示形态参考，工序研究展示实际可见的加工记录，能力页帮助判断是否适配，Resources 帮助买方定义要求，Factory 与 Company profile 承担不同的企业证据。不能将这些页面统一包装成现货 SKU 或带结果承诺的客户案例。

保留品牌名称与标识、法定主体、真实业务范围、已有 URL、有效资料、原始证据、筛选、视频、下载及邮件草稿流程。重做各页面的内容顺序、图片角色、标题、容器、图文比例、参数呈现、背景与 CTA；不以旧版布局作为答案。

本轮仅编写此方案与审查证据，没有修改业务源码、CSS、数据、图片、DESIGN.md 或技术配置，没有生成图片、构建、提交 Git、上传或部署。既有未提交工作不归本轮改动。后续实施前再保存与当时工作区匹配的回退检查点；本轮源文件哈希基线用于核查只读边界。

### 1.2 需要先解决的问题

| 优先级 | 当前具体问题与证据 | 最终决定及影响 |
|---|---|---|
| P0 | 产品 P14 的总成来源被重画成独立歧管；P15 CAD 被转成带执行器的摄影式总成；P29 原圆件被画成矩形块。见第3节逐 URL、第5节全部产品原图对照。 | 原始身份与供货范围先于美化。P14/P15/P29 撤下误导主图，用真实来源主体；不生成不可验证的隐藏结构或装配范围。 |
| P0 | P19 页面真实为法兰/旋钮式组件，部分正文和相关链接仍讲细长轴；`capabilityDesign.ts` 将该 URL 强制绑定为另一条 P32 锁销形态。 | P19 使用本条来源与法兰任务；能力页卡片同步使用 P19 原件、短标题及原目标 URL。P32 仅用于自己的 locking-pin 页面，取消跨条目强制图绑定。 |
| P0 | RFQ 三组完整字段藏在 closed details；Profile 文件日期/范围也被降为展开内容；Factory 设备适配和检验方法条件不够直接。 | 把影响报价、适配、验收、证书判断的字段恢复为默认可见。快览和高级补充可共存，不能用折叠代替内容组织。 |
| P0 | Australian visit 的桌旁01照片实际以手机/模型和谈话为主，却配“conversation around a machined part”；原分组日期与可见年历存在冲突。 | 零件讨论位改用真实手持部件03；01保留为中性谈话记录。日期冲突列入待核资料，不擅自改为另一年或继续扩写精确拍摄日。 |
| P1 | 工艺/材料详情先放多张大例图，适配和验收较后；铝、不锈钢、铜页首屏和首例重复图片；原型页多次解释接口与批准。 | 参数与判断前置，合并同义解释，单页同图只承担一个主要角色；独有牌号、限制、责任不丢失。 |
| P1 | Studies 中通用矩形腔图切换了实际零件形态；部分图注离居中图片很远；宽按钮、续读半栏空白和完整灰色询价尾部放大页长。 | 六个工序研究以真实 setup 为主；说明图贴近对应技术问题，删掉无关形态切换；相关入口收成有理由的短列表。 |
| P1 | Products 目录筛选占首屏较多，六种形态入口权重不均；筛选材料容易被读成图片中零件的实测材质。 | 六种形态平等可见；批次作为任务而非形态；筛选写明材料选项/来源列明/待确认状态，保留35条与2个集合的区分。 |
| P1 | 联系、流程、短新闻采用通用概念图或较重结尾，资料查找被推后；全局多层覆盖样式使不同页出现同模板倾向。 | Contact 与 Quote 以任务为首屏；流程以责任分工为主；短新闻可只有必要的2–4个模块。后续按页面类型收敛样式归属，避免再追加全局覆盖。 |
| P2 | 图注、表格标签、说明的字号和图片来源类型不一致；旧 DESIGN.md 历次规则对手机图文顺序、图片交互、Resources 数量有冲突。 | 按第6节建立唯一规则，保留历史记录但不沿用相互矛盾的要求。此次不覆盖旧 DESIGN.md。 |

P0＝先恢复身份与判断准确性；P1＝主要采购路径与版式；P2＝其余一致性。它们是实施次序，不是风险评分。

### 1.3 事实、条件与证据边界

| 保留的项目事实 | 必须邻接的条件与限制 |
|---|---|
| Hangzhou Lizhizao Precision Machinery Co., Ltd.；LZZ Precision；Hangzhou；2017；1,500 m² | 是现有公司资料口径，本轮不是现场重新核实；照片不证明面积或成立年份。 |
| 40+ machining and supporting equipment | 必须保留“加工及辅助设备”，不能简写成40多台CNC。15+ years 指团队经验，不能改成公司经营年限。 |
| 约100,000 small parts/month 参考产能 | 取决于几何、材料、处理、订单组合；不是通用供货承诺。统计周期、班次、品类和当前记录仍待补。 |
| Minimum order from 1 piece | 每料号、版本、数量仍影响评审与报价，不等于免费样品或现货。 |
| Production 7–14 business days | 图纸与订单确认后起算，含表面处理，运输另计；重建/图纸批准另计，具体排期以报价/订单为准。数字与条件同处可见。 |
| ±0.01 mm | 仅选定关键特征，受几何、材料、装夹及测量影响，逐图确认；不能推广全尺寸、所有材料或所有服务。 |
| ISO 9001 certified | 保留已有授权声明；版本、编号、机构、范围、有效期必须取得真实证书后填写。三份企业认可/教学材料不是ISO证书。 |
| CMM 与现场照片 | 说明设备/环境可见，不等于当前校准、量程、精度、已完成报告或默认100%全检。 |
| 原始工序和历史包装照片 | 不推导客户名称、合格率、改进比例、材料鉴定、送达或验收结果。2022包装记录不能写成新交付。 |
| Quote / RFQ | 只在浏览器准备邮件草稿；用户自行添加图纸并在邮件应用发送。Copy、Save、mailto 均不等于网站收件或已发送。 |

对外声明依据为当前 `docs/claim-ledger-2026-09-25.md`、对应数据与来源登记。现有资料存在不确定或冲突时，以“待确认”保留，不以生成图或更强文案填补。

### 1.4 检查方法、覆盖与局限

路由发现同时读取 `src/pages`、动态路由数据、导航、迁移规则及现有 `dist` HTML；构建快照是内容清单线索，当前源码决定渲染入口，选定页面另外在 dev 网站实看。未在本轮运行构建，不能据此声称新构建或生产HTTP检查通过。

审查材料位于 `D:/lzz/website-review-20261015/`：`inventory.json` 包含逐页标题、模块、表格、图片引用/比例、内链、折叠及构建时间；`source-baseline.json` 记录源文件哈希。三个上下文独立评审分别检查 Products、Capabilities/Factory、Company/Resources；其结论经本方案收敛，不继承旧“已合理/已通过”结论。

视觉检查是指定尺寸的局部截图与 DOM 核对，通常为首屏及三个内容窗口，**不是全页连续逐像素验收**。逐 URL 的实际范围见第3节。未单独渲染的同族页面只标内容与共享模板推导；生成来源、参考原图和引用检查也不等于网页视觉检查。结束核对346个源码/脚本/配置/旧规范文件的哈希均无变化；223个引用图文件的存在性与大小未改变（见read-only-verification.json）。早期无效裁切图不作为证据；更正过的清单显式保留 metadataRepair 与实际抽样边界。

## 2. 最终信息架构与页面模块蓝图

### 2.1 导航与页面职责

保留当前五个一级入口。一级文字进入总览；相邻展开按钮只展开子项，不重复增加“All…”总览项。Factory 已是合并页，保持单入口与页内任务锚点，无需为菜单整齐重新拆页。

| 入口 | 最终职责及下级结构 | 边界与主要去向 |
|---|---|---|
| Capabilities | 工艺：milling、turning、5-axis、casting；材料：aluminum、stainless、copper/brass、plastics；项目状态：prototype、low-volume、sample-to-part | 塑料两种选路指向同一页；先判断几何/材料/输入，再看形态和真实记录。 |
| Custom parts `/products/` | Part examples：35形态参考＋2独立集合；Machining studies：6工序记录＋2材料/形态集合 | 不是37个SKU，不把集合称客户案例；从形态到要求、从工序到基准与检查。 |
| Factory & quality | 单页内 workshop、equipment、quality、documents、delivery | 场地/设备/检验计划/可索取文件；企业认可仍去profile，合同流程去How we work。 |
| Resources | Ordering guide、Machining guides、FAQ | RFQ清单仍为hub和ordering开头的直接入口；保留8篇指南的既有路径。当前三项结构已经形成，不再额外重建旧分类中转页。 |
| About LZZ | Company profile、How we work、Company news、Contact | Documents 位于profile#documents；企业身份、公司流程、活动记录、联系各自明确。 |
| Quote / Privacy / 404 | 准备草稿；解释实际数据行为；恢复浏览任务 | 不插入产品概念图，不以销售模块延长隐私/错误页。 |

在本文中 HOME、CAP-H/P/M/A/L/S/F、PROD、PART、STUDY、A1–A6、R1–R4、G1–G8、Q、PRIV、E 为模块蓝图编号。表中的顺序就是推荐 DOM 顺序。跨页必要短说明可以保留；完整解释只在负责该问题的页面展开，并提供有意义内链。

### 2.2 HOME：从业务识别到有效询价（6模块）

| 模块与用户问题 | 保留内容、来源及删合迁 | 桌面与手机排列 | 图位、内链与下一步 |
|---|---|---|---|
| 1. 按图定制什么？ | 保留 `HomeEditorial.astro` 的Custom CNC parts / Made to your drawing、milling/turning/5-axis范围及两个主要任务；补一句prototype/small-batch定位，不增加业绩形容词。 | 桌面左标题/短句/按钮、右保留加工主体；首屏内容区约680px，不再100vh。手机标题最多4行目标、简短范围→两个动作→场景，场景不挡住选择。 | HOME-I1；Prepare RFQ email 主动作，Browse part examples 次动作。 |
| 2. 找相近的零件 | 保留impeller、casting housing、locking pin、plastic四形态及独有入口；卡片一句解释可见特征，不重复工艺关键词。 | 桌面四列同一基线，图4:3 contain；手机2列，每图后短标题和一句，结构完整不裁件。 | 四图原始身份按产品图表复核；进入对应PART，不默认已确认材质或供货总成。 |
| 3. 选择工艺或材料 | 保留现5工艺/4材料入口及准确短句。删同一组里重复Explore按钮；样件/首次批次只作一条任务补充。 | 桌面工艺与材料两列，标题和条件对齐；手机工艺→材料→样件入口。 | 不新增大图；到CAP-H及具体服务；已知需求者无需绕总览。 |
| 4. 供应商与检验依据 | 保留2017、1500m²、40+完整称谓、ISO声明和两条真实证据出口。现AI修饰车间/CMM退出证据主位。 | 桌面真实车间横图+紧凑事实，旁侧CMM及验收说明；手机事实→原车间→检验原图/条件。 | HOME-I2/I3；Factory#workshop/#quality，证书去profile#documents。不以图片证明数据。 |
| 5. 看实际装夹记录 | 保留29-inch display与turn-then-mill两任务，说明分别是宽面板支撑与二次铣基准。 | 桌面两张真实工序照配短文；手机一条一条完整排列。 | 与STUDY-S5/S1同源照片；不使用概念成品替代工序证据。29-inch是显示用途命名，非机床行程。 |
| 6. 带什么资料询价 | 保留drawing/material/quantity、MOQ1及完整7–14条件；结合critical features、revision与destination，合并为一组输入。 | 桌面输入左/一个主动作右，手机输入→动作→草稿说明；不再用62px通用标题和大圆角空面板。 | `/quote/`、RFQ checklist。保留`#home-rfq`，导航询价上下文不丢失。 |

下列蓝图进一步给出各任务的具体模块、源内容处理、图位和桌面/手机顺序。数字只表示内容职责，不要求每页长度相同。


表内顺序就是最终 DOM 顺序。手机与桌面保持同一决策顺序，避免用 CSS 把关键条件移到图后很远。图片编号/路径见第5节。二级内容出口用可辨识的次要按钮；每页只保留一个主要询价任务；长页首屏与结尾可以出现同一动作。

### CAP-H：能力目录 `/capabilities/`

| 模块/用户问题 | 必须保留内容、合并删迁与来源 | 桌面 / 手机顺序和布局 | 图片 / 内链 / 下一步 |
|---|---|---|---|
| H1 我从哪里开始？ | H1+一句定制加工范围；三个入口“按几何选工艺 / 已知材料 / 只有样件或首批需求”；1 件/生产时间完整 note。来源现 hero、stage、sample 文案；把共性条件从后文重复处移到这里。 | 桌面文字 7/12 + family 5/12，入口为三条锚点；手机标题→范围→入口→小图→完整条件，不用满屏图挡住入口。 | family 只作 AI 家族示意；链接 #machining-processes/#materials/#production-stages；已有图纸者直达 `/quote/` |
| H2 哪种路线适合我的特征？ | 5 个 service 的形状与选路条件：pocket/faces/holes、shared axis、angled/contour、polymer condition、cast working interfaces。保留现 processFit，不扩张参数；增加“需给出的信息”短列。 | 桌面 5 行比较表，图 120–160px、特征/输入/出口三列；手机每服务一行信息块，标题→用途→关键输入→链接，图为辅助。 | directory 5 图保留为概念；工艺页链接。塑料行标识按材料也能进入同页 |
| H3 已知材料，还需确认什么？ | 4 材料族；精确 grade/condition/finish 由图纸定义；不以缩略图判断材料。保留现材料入口，替换依赖“catalog 第一项”的选图绑定，改显式路由引用。 | 桌面4行材料目录，每行96px辅助图、材料族/规格提示和文字出口；手机四行，标题与条件先于图。 | 每行单一明确示意图；铝不选焊接 intercooler 作整个材料族的默认缩略图；stainless 不复用错误 shaft 归属。走 M 页 |
| H4 项目是评估、重复放行，还是样件重建？ | 合并现 prototype/repeat 对照与 sample section：目的、图纸状态、数量信息、批准点。样件行保留 wear/hidden/material 未知与先批准定义。 | 桌面三列对照；手机三张连续任务行，标签一致，禁止横向滚动表。 | sample-definition 可作样件行小图，其余不必配装饰图；A/L/S 三路；流程不清者链接 ordering guide |
| H5 这些能力有哪些真实记录？ | 新增两条事实出口：实际 milling/turning/multi-axis setup、CMM/验收与文件。仅摘要与证明范围，不复制 Factory 正文。 | 桌面两列，手机照片→可见事实→来源/限制→按钮。 | 选 two-stage-first 与 cmm-room 原图；到 `/products/machining-studies/` 与 `/factory/#quality`；不称已交付客户项目 |
| H6 我准备什么来报价？ | drawing/model+units/revision、grade/condition、finish、quantity、critical features/records、destination/date。RFQ 草稿边界保留。 | 桌面清单左/按钮右；手机清单→按钮→用户附图发送说明。 | 无图；`/quote/`；材料/工艺未定可在邮件中说明，避免强制先浏览完所有详情 |

### CAP-P：工艺详情（milling、turning、5-axis、casting）

| 模块/用户问题 | 必须保留内容、合并删迁与来源 | 桌面 / 手机顺序和布局 | 图片 / 内链 / 下一步 |
|---|---|---|---|
| P1 本工艺解决哪些特征？ | 当前 hero 的 service title/范围+一句形状定义；完整共性订单条件；3 个页内锚点“适配 / 例图 / RFQ”。不在 hero 预先承诺最大尺寸、公差或全功能测试。 | 桌面文字+小概念图；手机标题→范围→条件→锚点→图，控制图高度。 | milling directory / turning features / 5-axis contour / casting-stages，均有 AI 图注；图在后文用过则 hero 只留文字，单页不重复大图 |
| P2 能否加工、我怎样定义验收？ | 前置当前 requirements 的 content.scope、geometry、size/workholding、checks；将 5-axis route-choice 从 workshop 移入；milling ±0.01 完整条件放本模块；casting 首先讲供坯/余量/拒收责任。 | 桌面“适配输入”一侧+3 列 decision/drawing/agree 表；手机先适配输入，再每特征一组带字段标签的行。重要限制默认可见。 | milling-features/turned-features/casting-stages 只用于技术解释；CMM 不再给每页重复盖章；链 `/factory/#quality` |
| P3 有哪些相似形状？ | 保留当前各 3 个 part examples 及对比句，不删独有形态链接；先解释形态，材料/公差不由图识别。车削的 shaft 映射按第5节纠正。 | 桌面 3 列简洁图文；手机每例标题→图→特征→`View part requirements`；不把每张图扩成一大屏。 | 当前 catalog/gallery 图保留 AI 标识；完整 part silhouette；下一步进入具体 part requirements |
| P4 哪种材料和表面处理需要一起评审？ | 合并现三列材料表与晚出现的 `Drawing notes by material`，每行同时呈现 grade/condition、finish、关键保护/测量条件。milling 保留 Ti note；5-axis 保留 Ti/Inconel/硬度；casting 三行是 blank scope，不硬改为普通材料清单。 | 桌面 4 列表；手机按材料一组“规格/处理/该图需确认”；不另开完整重复材料段。 | 无装饰图；现 material-and-finish-checklist；可进入一个对应 M 页 |
| P5 实际怎样装夹加工？ | 保留可见工具/工件/装夹关系及新订单基准输入。milling用同件两setup；turning用R6真实车削与R11的二次铣setup，明确它们不是同一零件完整追踪；5-axis用R7与R9。casting无对应实拍，保留制造定义流程。 | 桌面milling两张4:3并列，turning/5-axis两列原比contain且说明紧随；手机每图后给可见事项/待确认；casting采用输入→余量→最终接口三行文字，不配伪现场。 | Milling R10两图；Turning R6＋R11 turn-mill-operation；5-axis R7＋R9；详细研究走对应STUDY。casting去sample-to-part，不生成真实铸件加工现场。 |
| P6 还有哪些会改变报价的情况？ | 只保留无法在 P2/P4 清楚解决的 2–3 个独有 FAQ。通用 MOQ/交期不再全文复制；“是否五轴”“锐角”“最大尺寸”“测试另定”保留在上文相应行。 | 桌面单列内容宽 760–840px；手机同顺序；问题必须是具体选择。 | 无图；一个对应指南出口；不重复一整组 related links |
| P7 如何提交本工艺的 RFQ？ | 当前 `capabilityReview.inputs` 的专属输入与 common drawing/revision、qty/destination/date；精确引用当前 inquiry context。去掉结尾再次全文复制的交期，回链 P1 条件即可。 | 桌面两列：输入/行动；手机输入→主要按钮→草稿说明。 | 无图；上下文 `/quote/?…`；工艺不合适时返回能力目录的可见次要入口 |

### CAP-M：材料详情（aluminum、stainless、copper/brass、plastic）

| 模块/用户问题 | 必须保留内容、合并删迁与来源 | 桌面 / 手机顺序和布局 | 图片 / 内链 / 下一步 |
|---|---|---|---|
| M1 本页是否适合我的采购规格？ | 当前 title/description；形态范围；明确 exact grade/condition 需图纸指定；保留共性订单条件。去掉 hero 与首个 example 完全重复的大图，原图仍保留在 M3。 | 桌面文字主导+窄材料提示列；手机标题→规格提示→完整订单条件→目录。 | 无需新增图；页内 #materials-finishes/#engineering-fit/#enquiry |
| M2 我需要选定哪些材料参数？ | 各页完整 grades/condition/stock/finish；第3节能力独有参数表全部保留。把 material review notes 并到同一行；铜先显示 electrical/thermal/fluid 三用途，不放到后面的 workflow 才解释。 | 桌面规格/处理/影响的 4 列表；手机按 grade 一组可读行；材料不可替换/未知的限制直接可见。 | 无照片作材料鉴定；material-and-finish-checklist；买家不知牌号时提供应用条件 |
| M3 哪些形状接近我的零件？ | aluminum 3、stainless 3、plastic 3、copper 1 个例图及全部形态出口；保留独有对比句；示例不能证明对应材料或功能测试。 | 桌面最多 3 列；铜只有一个完整图文块，不人为补三例；手机标题→图→关键形态→链接。 | 当前 AI gallery/studio；铜 plugs 仅说明 threaded fittings，plastic bars 仅说明孔/条形，不以画面证明复杂多轴几何 |
| M4 这种材料怎样影响工艺？ | aluminum 的 thin wall/support + finishing/masking；stainless 的 grade→secondary features→treatment sequence；copper 的 thread/access/plating；plastic 的 low-stress support/conditioning。真实照片描述已观察形态，不把文字计划包装成同一订单的连续工序。 | 桌面一张主原图+两条决策；plastic 可加一张次图/视频；手机步骤标题→说明→证据。 | aluminum 优先原 enclosure setup+成品；copper 原 plugs/batch；plastic 三原图不都竖向铺满，选 semi-finished+shaft，batch 放 study；stainless 没有能证明牌号的过程照片，不强配通用图 |
| M5 怎样在最终状态验收？ | 保留 checks、overview.inspection、drawing/rfq 独有要求：铝处理后/密封、SS runout/threads/treatment、铜 contact/plating/独立功能测试、塑料 conditioning/temperature/moisture/functional docs。 | 桌面 3 行 feature/specify/agree 表；手机每组字段标签；不得把材质选择、医学/食品资格藏在通用 FAQ。 | 只保留必要概念图；通用 CMM 重复图移除为文字出口；`/factory/#inspection-records` |
| M6 哪些范围必须单独确认？ | 选 2–3 个独有 FAQ，其余迁到上面模块，不丢 grade substitution、PTFE vs coating、declaration availability、automotive testing 等。 | 单列；手机同顺序；问题后直接给确认所需输入。 | 无图；相应 Resources 指南 |
| M7 如何得到本材料的报价？ | 当前专属 input 清单、current drawing/model/revision、数量与日期；上下文保留；能把未知 grade 写成待评审而非强行给默认。 | 输入/主 CTA 两列；手机输入→CTA→草稿附图说明。 | 无图；上下文 quote；可转 `/capabilities/starting-with-a-sample/` |

### CAP-A：原型 `/capabilities/prototype-machining/`

| 模块/用户问题 | 必须保留内容、合并删迁与来源 | 桌面 / 手机顺序和布局 | 图片 / 内链 / 下一步 |
|---|---|---|---|
| A1 这件原型要回答什么问题？ | hero+purpose 合并：fit/assembly/appearance/defined functional test；当前 revision；订单条件；汽车例图不是性能结果。 | 桌面问题定义左、rfq concept 小图右；手机目的→条件→图。 | rfq-gallery-v1 仅概念；锚点到 A2 |
| A2 哪些接口固定，怎么批准？ | 合并当前 purpose 内的 workflow 与 requirements：evaluation question、fixed interfaces/open decisions、model/revision、measurements/fixtures/procedures/limits、谁批准、下一版变更。保留全部独有字段，取消嵌套的重复标题与重复三步解释。 | 桌面“输入→做法→reviewable result”三行；手机每阶段一块；批准点直接可见。 | 不需要 CMM 装饰照片；`/resources/drawings-and-ordering/machined-prototype-approval-checklist/` |
| A3 有哪些可讨论的原型形状？ | 现 cover、intercooler、throttle 三例；分别说明 fit/clearance、joint/supplied parts、bore/actuator interfaces；不称验证通过。 | 桌面三列；手机逐例；不以汽车案例统称全部服务。 | catalog-13/12/15；caption 指明 AI 形态，actuator/组合供件范围另确认 |
| A4 原型材料与量产材料不同会怎样？ | generalMaterials 四族+approved alternatives；记录替代与不可外推结论；finish/condition 对评估作用。 | 桌面简明表；手机四组行。 | 无图；material checklist；对应 M 页 |
| A5 何时能进入下一版或批次？ | feedback/approval/change record；不得把原型批准自动变成下单或量产放行。把相同 FAQ 移入这里，独有 FAQ 留两项以内。 | 桌面决策分支“改版/重复 release”；手机顺序两条。 | `/capabilities/low-volume-production/`；`/about/how-we-work/` |
| A6 我怎样提交一次有效评估？ | evaluation purpose、revision/fixed interfaces、material/finish、qty、checks/records/approver、destination/date；邮件草稿说明。 | 两列→手机单列，唯一主 CTA。 | 上下文 quote；无图 |

### CAP-L：小批量 `/capabilities/low-volume-production/`

| 模块/用户问题 | 必须保留内容、合并删迁与来源 | 桌面 / 手机顺序和布局 | 图片 / 内链 / 下一步 |
|---|---|---|---|
| L1 “小批量”如何定义？ | 当前 hero；没有通用数量门槛；geometry/workholding/material/finish/inspection 决定；1 件起订与完整 timing。 | 桌面短文+small batch 概念；手机定义→条件→图。 | prototype-gallery-v1 有 AI 图注；不把图中 4 件作为 MOQ/产能 |
| L2 每个料号要锁定什么？ | release definition + material rows 合并成采购行模板：part number/revision/quantity/grade/condition/finish/cosmetic/packaging/requested release/date；forecast 分开。 | 桌面示范字段表，不预填虚构料号；手机按同字段分组，非横向空表。 | 无图；下载/准备输入动作可复用 quote 清单 |
| L3 第一批何时放行？ | first article/sampling/measurement records/hold point/NC handling/traceability；repeat change authorization。现 requirements 与 workflow 的前两步合并。 | 桌面批准点清单+records 侧栏；手机批准前输入→可复核结果→批准责任。 | `/factory/#inspection-process` 与 `#inspection-records`；不需要重复 CMM |
| L4 有哪些批次形态？ | 当前 3 part links 均保留；catalog-34 实图只显示相同圆柱形，不把它称为图中 mixed materials；混合料号属于订单组织要求，由 L2 说明。 | 三列→手机每例一块；每例只说可见形态。 | catalog-28/34/30，AI 图注；part requirements 入口 |
| L5 重复订单与包装如何保持一致？ | repeat baseline/change approval、pack protection/identification、required records；当前 2022 大型件打包图的泛化应撤下此角色，保留原档，不当小件包装证明。 | 桌面清单+未来真实小件包装图；手机清单→图；无新照片期间清单仍独立完整。 | 处理决定为补拍，见 R16；shipping checklist；实际 packaging 由 quotation 定义 |
| L6 询价需要哪些批次信息？ | part/revision/qty/releases、first article/sampling/traceability、finish/packaging、forecast、destination/date；保留草稿发送边界。 | 两列→单列；主 CTA。 | 上下文 quote；无图 |

### CAP-S：样件转制造定义 `/capabilities/starting-with-a-sample/`

| 模块/用户问题 | 必须保留内容、合并删迁与来源 | 桌面 / 手机顺序和布局 | 图片 / 内链 / 下一步 |
|---|---|---|---|
| S1 只有样件可以开始吗？ | 可以 review；照片仅初步；最终 model/drawing/material/acceptance 必须批准；共性生产时间+reconstruction/approval separately。 | 桌面文字+sample concept；手机结论→限制/时间→图。 | sample-definition；不是 approved drawing/reconstruction record |
| S2 样件里保留、解决、批准什么？ | 现 Retain/Resolve/Approve 完整保留；wear/damage/hidden geometry/mating parts/unknown material；当前 housing 例图小型辅助，不另扩成大 gallery。 | 桌面三行对照+窄例图；手机三行→小图。 | catalog-23 明示 AI replacement-interface illustration；源 sample 内容不与某订单绑定 |
| S3 每一步会得到什么？ | sample review→geometry measurement/scanning→model/2D/3D drawing→approved manufacturing definition；明确 sample geometry 不能推得 tolerance/material/fit；合并 current workflow+geometry 的重复解释。 | 输入/输出两列三行；手机一阶段一组；以交付格式与批准责任为字段，不能伪造示例图纸。 | casting-stages 移回 casting 教学用途，本页不重复；文件范围与格式在报价确认 |
| S4 未知材料和处理怎么处理？ | known/unknown/replacement 三行；未知明确保留未知；不能由颜色判断材质/处理；替代、用途、cosmetic/work surfaces 需批准。 | 三列简表→手机三组。 | 无图；材料指南或 M 页 |
| S5 第一件怎样批准？ | hidden measurements/datum relationships、first-part quantity、fit/function/acceptance limits/records、repeat release hold、file approval authority；从 current requirements 提取全部字段。 | 桌面 acceptance 表；手机按四决策逐行；首件批准直接可见。 | `/factory/#quality`；不是 CMM 设备照片代替首件结果 |
| S6 我先发送什么？ | photos/dimensions/mating parts、known spec/finish/current drawings、wear/change、file deliverables、first qty/checks、repeat demand/destination/date。 | 清单+CTA→手机同序；唯一主动作。 | 样件 context quote；无图 |

### CAP-F：合并工厂 `/factory/`

| 模块/用户问题 | 必须保留内容、合并删迁与来源 | 桌面 / 手机顺序和布局 | 图片 / 内链 / 下一步 |
|---|---|---|---|
| F1 这是怎样的生产场地？ | 当前 H1、Hangzhou、定制 prototype/small runs；一句“看场地/看检验/取文件”。Hero 不堆认证/精度大数字。 | 桌面标题+短范围→横图→页内 nav；手机标题→范围→nav→图，入口不置于大图之后。 | workshop-wide 原图，当前 desktop 470px cover 需主审视觉确认；建议机器行优先、减少屋顶/地面，手机保留自然比例 |
| F2 事实规模能否支持我评审？ | established/location、1,500 m²、40+ 完整口径、team experience；reference capacity 与 variation、订单/时间完整条件。把 capacity/timing 从折叠移到直接可见的条件行。 | 桌面事实表左/operators 图右；手机事实与条件→图。 | operators 原图仅环境/人员可见；照片不能证明计数、面积、月产；需要最新清单另索取 |
| F3 我的零件是否适配设备？ | 当前三设备族与 shape mapping；finished/stock dimensions、weight、clamping restrictions、travel/load/tool access/fixture；machine models/specs 请求入口。条件不藏在 disclosure。 | 桌面三列原图+用途，下面一整行 fit inputs；手机每设备标题→图→用途→对应能力链接，最后 fit 输入。 | milling-enclosure-operation、turning-operation、five-axis-machine-wide；原比例 contain；链接 P；不凭图片认定 range/simultaneous path |
| F4 检验与批准在什么节点？ | drawing review/first article/in-process/final 四段；每段保留 text+agreement；明确 sample hold 事前约定、sampling/checkpoint/deviation、finish 前后。把当前第二 disclosure 的 agreement 并到各阶段，消除来回翻读。 | 桌面四行流程表+竖幅 CMM；手机每阶段“检查什么/事前约定”，照片放整个流程后一次。 | cmm-room 原图，只示设备；critical-features guide；下一步指定本订单验收计划 |
| F5 方法为何适合指定特征？ | 当前 measurementMethods 4 行+support/datum/measurement stage/范围校准请求；特殊线程/粗糙度/涂层/硬度方法报价确认。表格直接可见；概念图是可选说明。 | 桌面三列表+小概念图；手机先方法行，再概念；不是先长图再隐藏表。 | inspection-concept 重生成决定见 I11；不替代真实仪器/报告；仪器范围/校准证据仍请求 |
| F6 可以索取并核对哪些文件？ | `orderRecords` 的 content 与 reference 三列放同一处，不上下两遍；dimensional/FAI、material、finishing、surface/batch 四类；legal entity、ISO 声明、certificate/body/validity/scope/verification 请求字段；current availability 逐项目确认。 | 桌面 records 2/3+qualification 1/3；手机先订单记录→request report/checklist→ISO 声明/核对项→request certificate。 | 不配荣誉/CMM/AI 证书图；保留 mailto reportHref/qualificationHref 和 checklist 下载；真实获授权扫描到位再增 preview |
| F7 包装与交付责任怎么交接？ | 当前 delivery 四步与 How we work 高度重叠，移完整步骤到现 How we work/ordering guide；本页只留 final release→protected interfaces→part/revision/qty identification→agreed records→packing/delivery responsibilities。把现 packaging guide 两出口保留。 | 桌面交接清单+真实小件包装图；手机清单→图→指南出口；不要另铺一个重复全流程。 | 当前 shipping-example 撤出小件证据角色，补拍；旧原图可留原始档，不借它暗示目的国、承运人或已到货 |
| F8 怎样启动供应商与零件评审？ | 从旧 Workshop/Quality 组件取回：STEP+2D、part no/units/revision、文件冲突时优先级、material/finish/qty、critical features/datums/limits、sampling/reports/approvals、destination/date。 | 桌面输入清单/主要CTA两列；手机清单→CTA→用户附图发送说明。 | factoryQuote context quote；次要出口 How we work；无装饰图 |

### PROD：三个目录分别采用以下结构

URL保持现有结构。不是现货目录：每个part detail代表形态/需求参考，受控图纸和报价定义新订单。SKU需要型号、受控图号/版本、尺寸、材料、完整供货配置；当前资料并未达到该层级，不添加价格、库存、标准配置或技术额定值。

| 页面/模块 | 回答的用户问题 | 具体信息与删合迁 | 来源 | 桌面/手机布局 | 图片/内链/下一步 |
| --- | --- | --- | --- | --- | --- |
| /products/ Hero | 我从哪里开始找适合我的加工参考？ | 一行custom made to drawing，明确两个选择：Find a similar form / See machining setups。把当前大段通用RFQ说明压至末尾输入摘要。 | ProductsOverview当前lead与路由。 | 桌面文图55/45；手机标题、两入口、图；不以大图把主选择推很后。 | 保留part-families作“形态说明图”，3:2、物件群宽86%；始终AI示意图注。 |
| /products/ 形态入口 | 哪种外形接近我的件？ | 六个形态类别都有对等可见入口：housing/turned/block/impeller/plastic/automotive；batch放“Plan a batch”任务入口，不称形态。现有7个form参数保持可达。 | partBrowseGroups当前12/8/8/2/4/7/2（可交叉收录，不可加成总数）。 | 桌面3列、每项短解释；手机2列小图+标题，字不嵌图。 | 点到part-examples/?form=...；图来自该家族真实参考，不把材料选项画成订单证明。 |
| /products/ 加工入口 | 要看成品外形还是装夹过程？ | 保留3个代表研究：turn-mill/two setups/display panel；每项一个具体加工问题。 | 当前ProductsOverview三条study。 | 桌面1张原工序图+3条读法；手机完整照片再3个有边界的链接。 | turn-mill-operation原照4:3，工件/刀具/夹持区域全；进入studies。 |
| /products/ 输入摘要与RFQ | 我需要准备什么才有可比较报价？ | 保留geometry/fit、material/final condition、quantity/acceptance三组；包含完整生产条款与草稿行为，一处出现。 | 当前buyer-review与ProductsClosing。 | 桌面三行标签，手机单列；一个主CTA。 | 链接ordering-guide/rfq-checklist；RFQ带Products上下文。 |
| /products/part-examples/ 搜索筛选 | 我能按形态、工艺或可选材料找到相似件吗？ | 保留35结果+2 reference galleries各自计数；搜索、form、material/process/order同步URL；空结果保留改筛选和发图入口。 | 当前cards/facets/PartsCatalogueExplorer。 | 桌面形态首行，筛选次行，3列卡；手机保留当前单列112px缩图+信息，筛选折叠且已选项可见。 | 卡片进入含静态来源的详情；卡补形态/可选料状态，不塞全套工艺文案。 |
| 目录 Covered parts / Gear forms | 包覆与齿形是否属于普通CNC件？ | 保留两个参考集合；包覆需要core、covering、hardness、bonding；齿轮需要tooth specification、mate、inspection。无配方、硬度、齿数则留待确认。 | ProductArchiveViews与additionalMedia。 | 桌面一个任务说明+2–3原图；手机每张独立contain，完整静态inline展示，集合与产品卡有视觉区隔。 | 不为其凑SKU页；直接接相关requirements与RFQ。 |
| /products/machining-studies/ 引导 | 哪个研究能解答我的工件问题？ | 明确6工序研究/2材料集合；按多面访问、车后铣、两次装夹、腔体、棱柱、面板六任务分组。display feature不以29-inch当加工尺寸。 | engineeringCases/caseReading当前8记录。 | 桌面任务列表+原照、每项一个inspection focus；手机一条一条完整任务卡。 | 原工序图优先；材料集合封面可示意，入口按钮明确View photographs & clips。 |

PROD-OV为四个模块：任务入口→六种形态→实际工序入口→输入摘要/询价。PROD-LIST为四个模块：搜索/筛选/结果→35条参考→Covered/Gear两个来源集合→相关工序和短询价。PROD-STUDIES为四个模块：研究职责/六工序两集合说明→按加工问题的8项入口→材料集合与参考范围→带问题继续评审。列表页不是再次解释工艺原理的中转文章，正文模块不强制配图。六工序在任务列表中平等可见，两个集合明确单独性质。

### 目录筛选状态逐项核对

| 当前目录URL | 当前收录数 | 最终职责与明确调整 |
| --- | --- | --- |
| /products/part-examples/?form=housings | 12 | 腔体、盖、铸壳和壳体批次；P03锥形角接件迁出，不把不同夹持/装配范围当同一housing。 |
| /products/part-examples/?form=shafts | 8 | 轴套、连接件、法兰与锁销；保留差别短句，P03迁入后按真实形态重新计数。 |
| /products/part-examples/?form=blocks | 8 | 块、支架及圆形多孔件；P03迁出。P29在来源身份修复前不以矩形block图代表本组。 |
| /products/part-examples/?form=impellers | 2 | P02叶型/加工访问与P11流体接口/验证分工清楚，不把两页都写成ultra precision。 |
| /products/part-examples/?form=plastics | 4 | 材料待确认与measurement state是共同输入；圆件、多孔条、集合分开命名。 |
| /products/part-examples/?form=automotive | 7 | 六prototype加铸件参考；逐项标assembly context/CAD/design reference/part example，不能直接当车型适配清单。 |
| /products/part-examples/?form=batches | 2 | 改为按批次规划任务入口；保留参数兼容，BOM与release管理为主，照片仅形态。 |
| /products/part-examples/?form=reference-galleries | 0 part + 2 galleries | Covered parts与gears各有scope问题，卡片不冒充第36/37个产品。 |

数值是当前代码默认状态的收录数，分类调整后由结果实时计数；分类允许交叉，所以各数不能相加当35以外的新产品。

### PART：零件参考详情，按家族选择必要模块

下表为共享骨架；每个URL的独有信息与例外见第3节P00–P34。删的是跨模块复述，原有材料牌号、数值、条件和资料仍留在相应职责内。

| 顺序/模块 | 用户问题 | 具体内容、保留/合并/迁移 | 来源与边界 | 桌面/手机布局 | 图片/内链/下一步 |
| --- | --- | --- | --- | --- | --- |
| 1 身份与来源首屏 | 这是什么？是可直接采购的完整件吗？ | 短形态标题、可见特征一句、source listing/CAD/reference性质、供货scope待定；完整生产条件独立一行。 | 当前title/lead/source.src；P14/P15/P19/P29/P31先纠正身份，不让legacy slug决定物体。 | 桌面文字+符合形状的主图；原图缩略同屏。手机标题→图/来源→scope→RFQ，不把来源藏到第四段。 | 按第5节产品原图方案处理；来源缩略图同屏，完整source静态inline展示；主CTA Prepare RFQ email 带产品引用。 |
| 2 关键接口与订单定义 | 我的图上哪些位置最影响加工和装配？ | 把fit的3点与drawing中同义句合成Feature / Define / Check三列；每页保留实际任务特有字段，通常2–4行，独有要求更多时全部保留，不强压行数。 | productDetail.scope/considerations、productReading.features、productPageRequirements。已有source未显示的内部特征写If required/define on drawing。 | 桌面3列紧凑表；手机每个feature一组Definition+Acceptance；不要横向滚宽表。 | 可在原图上做非破坏文字编号；生成示意只标concept，不补不可见结构。 |
| 3 材料与最终状态 | 材质和处理是否已确认？ | Material options / Listed material / To confirm三种状态；process是可review的scope；finish按compatible substrate；应用放需求条件，不作为业绩。 | productSummary.material/process、productManufacturing.finishes/applications；保持所有grades与条件。 | 桌面标签/值两列；手机单列；精确牌号不藏折叠。 | 通用材料性能/处理说明迁capabilities或material-finish guide；留一条明确相关阅读。 |
| 4 专属供货模块（仅适用家族） | 还缺哪些上游或装配职责？ | Casting：blank/finished模型、allowance、who supplies；automotive：machined/welded/purchased组件；polymer：state/load/environment；batch：BOM/revisions/releases；pin：component vs full assembly。 | castingReview、productDetails/requirements现有信息；不能把未提供的验证写完成。 | 桌面双列输入/责任；手机每项一行；优先于通用inspection。 | 用真实相应资料，不配无来源通用大图；链接所需能力/样件定义页。 |
| 5 图纸、验收与缺资料清单 | 为报价和收货我到底要提供什么？ | 仅列文件、关键数值、测试责任、记录要求；将重复datums说明留模块2；critical tolerance/pressure/balance等未知值明确需约定。 | productPageRequirements.drawing/inspection/notes；现有附加notes里影响报价的材料/测试条件移出折叠。 | 桌面Drawing inputs / Acceptance两栏；手机先inputs后checks；附加通用细节可details。 | 下载RFQ checklist；不把原图或概念图当尺寸图。 |
| 6 参考资料 | 能否同时看完整来源与更多视角？ | 本页source原图、独立additional views，逐张来源类型；不得默认为同一件、同批、同客户；删重复AI声明段。 | listingReferences、productReferences、additionalMedia.kind/source。 | 桌面原图+简短来源旁注；手机单图完整contain；竖图保留比例。 | 完整source静态inline展示；P12/P13/P16/P17补充图按下方专属说明。 |
| 7 比较与下一步 | 如果我的件不同，下一步看哪里？ | 合并现在Related machining与Related part requirements为一个“Continue this review”，每页1个对应study、1个不同需求part或capability，写清差异。 | productReadingLinks/productDecisions；修正P19/P31以轴误导法兰的reason。 | 桌面2–3行有边界的次级入口；手机单列，图片只做小参照。 | 读者继续了解用次级按钮；页末一个主RFQ，不再大段重复输入说明。 |

### 家族例外必须保留

- 铸件P18/P22/P23/P24/P25：毛坯到成品是独立采购契约。谁供blank、来料验收、余量、cast/machined surfaces、model/sample状态先于工序建议；逆向工程还要图纸确认周期，不把生产7–14 business days包含成重建总工期。
- 汽车原型P12–P17：区分制造零件、客户提供核心、焊接、执行器和装配验证。P14总成参考/P15 CAD/P16设计参考/P17多独立细节不能统一称“本厂实物项目”；不增加车型适配、马力、流量、压力或冷却结果。
- 聚合物P20/P21/P26/P29：先牌号/填料与measurement state，再孔/墙/工作面。颜色无法识别PTFE、POM、PEEK等；电、光学、食品/医疗合规都要明确规格和记录。P29实物形态冲突必须先解决。
- 车削/连接P03/P05/P06/P07/P10/P19/P27/P31/P32：普通轴的datum axis、接头thread+seal、法兰bolt pattern、锁销engagement+travel分别组织；不可把“turning”做成所有页同一张shaft。
- 外观件P08/P09/P13/P33：功能尺寸与cosmetic acceptance分离；色图/刀纹不等于受控finish标准。
- 批次P28/P34：图中零件数量不是MOQ、产量、交付批次或一致性证明；BOM逐件号、revision、release quantity、sampling与traceability是主模块。

### STUDY：六个工序研究与两个集合的适用差异



| 模块 | 用户问题与具体信息 | 来源/处理 | 桌面与手机 | 图片/内链/下一步 |
| --- | --- | --- | --- | --- |
| 研究身份与范围 | 我在看真实工序、集合，还是客户成功案例？一段只说来源看到什么。 | caseStories/cases原文的边界保留；把partPoints与lead重复句合成两行“Shows / For your drawing”。 | 桌面标题+真实首图；手机标题后立即原图。 | 真实照片占主位；AI concept移后。 |
| 几何与任务 | 这件的关键关系是什么？2–3个可见特征+新图纸应给的数据。 | caseReading.technical与studyChecks合并去同义句；来源看不到的写条件。 | 桌面图+短标注，手机图后逐项；不堆生成大图。 | 按上表指定几何图；只解释不证实尺寸。 |
| 工序与夹持 | 为什么换面/二次铣/支撑？先观察，再planning输入。 | 原照为核心；现steps可保留为“For a similar part”的建议次序，不能当现场记录完整工艺卡。 | 桌面S2采用两原照对读；S0/S1/S3/S4/S5采用该页一张setup原照＋三项对应输入，其他真实视角放本模块随后；手机一照一说明。 | 真实工具/夹具不裁掉；通用示意缩小。 |
| 绘图—验收对照 | 需在图纸定义什么、收货检查什么？ | studyChecks现Feature/Define/Inspect保留；只写要求，不写实测结果。 | 桌面表；手机每feature一组两个标签。 | measurement method/final state/sampling/report显式；接RFQ checklist。 |
| 本页独有问题与下一步 | 还有哪些该任务才有的未决条件？ | 保留29-inch、live tooling、datum transfer、leak等真正差异FAQ；删除每页重复泛问。 | 桌面最多3问+2个相关出口；手机全宽。 | 每页2条人工指定related+具体part出口；RFQ以study topic带上下文。 |

S0–S5采用上表五项决策顺序；S2把两次实际setup作为工序模块的核心，S5保留完整宽板、两面参考及竖视频。S6塑料集合改为：范围/来源→PTFE组→POM与PE各自来源→Acrylic组→测量条件/下一步；每组包含来源命名、可见形态、所需grade/measurement state，不把它们接成同一订单工序。S7金属集合改为：集合身份→车削/锁销→铝壳→黄铜→清洗片段与新订单输入；清洗不能等于出货清洁度合格。集合没有真实项目结果时，不设客户背景、改善结果或客户证言模块。


### Company、Resources与询价：按具体任务的唯一蓝图

“保留”指来源内容保留，“合并”指去重复但保留全部有用条件，“迁入/迁出”指信息明确转移，“删除”仅删除指定重复呈现或装饰图位，原始资产/来源不删除。下列顺序就是最终顺序，不提供A/B选择，也不按篇幅强行套同一种页面。共用主导航、单一面包屑与页脚不计入模块。

桌面默认最大1280px、正文68ch，图文间48px；手机以可用宽排列、单列间24px。技术表格桌面保留语义表头，手机逐行显示完整的行名/列标签/值，标签至少14px；不通过省略、裁字或删除列“优化”。任务目录中的可点击标题使用常态下划线，与普通段落小标题区分。重要文件、日期、生产条件、验收规则始终可见。图片均按第5节CO-I编号处理。

### A1 — About overview（5模块）

| 模块／用户问题 | 具体内容、来源与处理 | 桌面 → 手机 | 图片 | 内链／下一步 |
|---|---|---|---|---|
| 1. Who is LZZ?／是哪家公司？ | 保留 `AboutOverview` intro、`companyFacts` 3事实；补与profile一致的法定全名一次。 | 文案/事实在左，车间在右；手机H1/简介→事实→车间。 | CO-I1 workshop-wide，1次。 | Company profile，作为该模块唯一阅读出口。 |
| 2. Supplier review paths／我要了解哪一方面？ | 合并现4条公司路径为profile/process/news/contact四条任务行；删profile重复标题+链接。 | 两列2×2任务行；手机四行按profile→process→news→contact。 | 无；来访图留给模块4，不在路径模块重复。 | 各任务标题进入现canonical。 |
| 3. Qualification and part acceptance／企业证书够不够？ | 保留al-assurance三项：company/quality system、drawing/acceptance、order/delivery；ISO与企业认可区别直说一次。 | 引言左/三类要求右；手机标题→三个要求。 | 无；无ISO扫描件则无证书占位图。 | Profile `#documents`、How we work。 |
| 4. Dated company records／能看真实活动记录吗？ | 保留来访/峰会两篇日期与短摘要；不把活动转成客户成果。移除冗余Explore按钮。 | 两列等权纪实条目；手机按各自日期/标题→照片→摘要。 | CO-I2、I4，来源说明可见。 | 两篇新闻canonical；公司新闻总目录一个出口。 |
| 5. Prepare an inquiry／如何开始讨论？ | 保留当前closing任务，写drawing/revision/material/quantity，保留draft-only说明；不再复述公司事实。 | 左说明右一个红色主动作；手机文案→动作→草稿说明。 | 无。 | `/quote/`；就近RFQ checklist为一个辅助出口。 |

### A2 — Company profile（6模块）

| 模块／用户问题 | 具体内容、来源与处理 | 桌面 → 手机 | 图片 | 内链／下一步 |
|---|---|---|---|---|
| 1. Legal identity and scale／谁与我签约？ | 保留法定名、2017、1,500m²、40+加工及辅助设备、custom-to-drawing定位；来源`company.ts`/claim ledger。 | 法定名和事实左/车间右；手机法定名→事实→照片。 | CO-I1。 | 同页`#documents`。 |
| 2. Engineering scope／是否理解我的零件？ | 合并现engineering与application：15+团队经验、milling/turning/multi-axis、functional surfaces/datums/tool access；4主要应用保留，7其他应用保持次要details。不得将应用写为行业审批/现有客户。 | 一侧工程说明/另一侧可讨论应用列表；手机工程→4应用→其他应用。 | CO-I3 workshop-aisle，完整竖幅；不加品牌墙。 | Capabilities、Factory `#quality`；应用行保留现对应零件/服务链接。 |
| 3. Qualification evidence／这些文件各证明什么？ | 保留3原件、类型、English summary、日期/有效期/范围并常显：高企签发8 December 2023/printed validity three years；省科技SME原件未注明签发日；教学基地November 2023；ISO请求独立。把订单记录details迁为Factory链接＋一条区分说明。 | 三份文件改连续三行：原图约40%/说明60%；ISO一块收尾。手机每份图→说明→日期/范围，最后ISO。 | CO-I5/I6/I7原件；无ISO生成图。 | qualificationEmail；Factory `#order-documentation`。 |
| 4. Company development／发展经历是什么？ | 保留companyHistory五项，合并重复“began in2017”开场；未注明年份的里程碑不补年份，不画按年等距进度。 | 单列发展记录，每项标题/具体变化并列；手机标题→变化。 | 无。 | 无新CTA，连续阅读人员模块。 |
| 5. People and workshop visits／可以认识团队吗？ | 保留来访/团建各1条，有日期和真实语境；来访说明改为手持部件03，团建不推导交付绩效。 | 两图各带日期/短文；手机两条顺排。 | CO-I2、I8。 | 各自新闻全文，禁止只开图替代内容页。 |
| 6. Next supplier-review step／该准备哪项资料？ | 合并现closing：已有图纸进入RFQ；需要资质直接资料请求。避免再一整段重复公司介绍。 | 一个主询价动作＋一个中性资料请求；手机说明→动作。 | 无。 | `/quote/`、qualificationEmail。 |

### A3 — How we work（7模块）

所有阶段只整理已有内容。Buyer/LZZ/Agree标签指业务分工，不声称网站已具备后台审批、追踪或报告系统。

| 模块／用户问题 | 具体内容、来源与处理 | 桌面 → 手机 | 图片 | 内链／下一步 |
|---|---|---|---|---|
| 1. Order basis／起订与时间怎样理解？ | 保留MOQ1piece、确认后7–14business days/包含finish/transit另计及付款/样件费逐单确认。删drawing AI装饰；以HTML显示drawing review→quote→sample→production→handover五阶段。 | H1/简介上，三事实下；手机相同顺序。 | 无（原AI保留资产档案，退出本页）。 | RFQ checklist。 |
| 2. Review and quotation／报价包含什么？ | Buyer：controlled drawing/model、units、rev、material、quantity、function、arrival/sample changes；LZZ：review几何/夹持/关键特征并提出方案/问题，报价写process/material/finish/inspection/quantity/schedule/shipping；Agree：文件优先级、alternatives、tooling/special docs/freight/duties、currency/payment stages、sample machining/setup/freight/credit。来源现scope＋`resourceDeliverySections`，合并重复。 | 三责任列；手机按Buyer→LZZ→Agree，不折叠费用条件。 | 无。 | compare quotations指南；保留`quotation-scope/commercial-terms/section-3/4`。 |
| 3. Sample approval／谁批准哪一个版本？ | Buyer supplies mating parts/fixture/test procedure并指定approver；LZZ按 agreed sample配置提供/复核样件；双方记录fit/appearance/function、first-article、release criteria；变更需复审。来源现workflow+sample guide。 | 简短分工表；手机三块。 | 不加概念样件批次图。 | prototype approval checklist；保留`section-5/ww-approval-title`。 |
| 4. Production and inspection／批次如何验收？ | 保留released revision、sampling、critical feature records、method/instrument range/calibration request、traceability/report format、nonconforming handling。明确记录须在报价/订单确认，不是默认全检。 | 条件表左/CMM右；手机标题→条件→CMM及限制说明。 | CO-I9，仅设备存在/形态。 | Factory `#quality`、`#order-documentation`；保留`section-6`。 |
| 5. Packing and delivery／何时、由谁交接？ | Buyer：destination/receiving/arrival/protection/labels；LZZ：保护包装、packing list/commercial invoice及shipment information；Agree：packing/pack weight、part/rev/qty、dispatch vs arrival、transport/Incoterm版本/named place、customs/duties/taxes/insurance、order-specific records。保留源文件已有供方动作，不额外保证清关/DDP。 | 历史packing图左/责任右；手机条件→纪实图（日期紧邻）。 | CO-I10，November2022明确。 | shipping checklist；保留packaging-shipping/section-8。 |
| 6. Changes and discrepancies／变更或不合格怎么处理？ | 保留rev/qty变更影响price/schedule、可能重做approval；report revision/batch/qty/photos/measurements；LZZ按 agreed criteria复核并商定处理；warranty起点/期间/排除、rework/replacement/return freight/refund须订单确认。 | change/nonconformance两列；手机两块顺排。 | 无，不造售后案例。 | Contact；保留`section-2/ww-issue-title`。 |
| 7. Start with controlled requirements／现在提供什么？ | 合并closing和phase导航：drawing/rev、material/qty、acceptance records四类，保留草稿边界。 | 左要求右主动作；手机要求→动作→提示。 | 无。 | `/quote/`，RFQ checklist辅助。 |

### A4 — Contact（4模块）

| 模块／用户问题 | 具体内容、来源与处理 | 桌面 → 手机 | 图片 | 内链／下一步 |
|---|---|---|---|---|
| 1. Contact details／怎样直接联系？ | 保留email、WhatsApp、Hangzhou/UTC+8和法定公司名；删inquiry-parts装饰首图，给实际联系方式优先。 | H1左/联系方式右；手机H1→email→WhatsApp→time zone。 | 无。 | mailto、wa.me真实入口；不写响应时间。 |
| 2. Machining inquiry／报价需要哪些输入？ | 保留revision/model、grade/finish/qty、critical dims/inspection、destination/arrival四项与草稿发送说明。 | 左4项/右动作；手机列表→主动作→说明。 | 无。 | RFQ checklist、`/quote/`。 |
| 3. Workshop visit／地址和访问如何安排？ | 保留No.4 Fengcheng Road / Pingyao / Yuhang / Hangzhou / Zhejiang / China；事前约定日期和讨论范围。 | 车间左/地址与邮件右；手机地址→约访→车间。 | CO-I1，地点语境图，不能假装地图或建筑外观。 | visitEmail；无虚构地图/导航坐标。 |
| 4. Documents or an existing order／其他事项找哪类信息？ | 保留ISO/other records请求与revision/order/batch/qty/measurements的已有订单资料；两个清楚分流，删冗长重复解释。 | 两列；手机资料→已有订单。 | 无。 | qualificationEmail、profile `#documents`、How we work `#section-2`。 |

### A5 — Company news index（3模块）

| 模块／用户问题 | 具体内容、来源与处理 | 桌面 → 手机 | 图片 | 内链／下一步 |
|---|---|---|---|---|
| 1. Archive scope／这里记录什么？ | 保留workshop/events/team life的档案说明；不称最新生产状态。保留3筛选及结果数、aria-pressed/status。 | 简介后筛选横排；手机换行且全部标签可见。 | 无。 | 筛选只控制现有5条，无隐藏分页。 |
| 2. Five dated records／哪条值得看？ | 五条统一按事件记录倒序；日期、类型、完整标题、短摘要。取消1条featured大幅特权和重复Read；不新增年份索引。 | 两列纪实行，所有记录同级；手机单列按同一顺序。 | CO-I11，5个唯一源封面；visit用03。 | 图片/标题进入对应文章。 |
| 3. Company context／如何进一步认识供应商？ | 合并现return+closing为一句公司信息引导；不在团建归档末尾放完整RFQ。 | 三条内容宽度入口；手机逐行。 | 无。 | Profile、How we work、Contact。 |

### A6 — News article（4模块，五篇各有具体图文）

| 模块／用户问题 | 具体内容、来源与处理 | 桌面 → 手机 | 图片 | 内链／下一步 |
|---|---|---|---|---|
| 1. Event record／发生了什么、何时？ | 保留每篇eventDate/eventDateLabel、category、H1、可证明的intro；不创造作者/发布日期/成交记录。 | 横图文章标题上/图下；visit03为文左/竖图右。手机全部标题/事件信息→图。 | 每篇唯一封面见N表。 | 不设主询价动作。 |
| 2. First photo sequence／第一组记录什么？ | 见N表，各自短标题+1段具体场景；不重复图注凑正文。 | 左短文/右图组，竖照最多并排2张，横照独立；手机短文→自然比例图。 | 原件静态、来源图注。 | 无独立Read/原图动作。 |
| 3. Second photo sequence／还有哪些原件？ | 见N表；11月2025 extra04合入本组末尾，所有照片保留。 | 同模块2；不把多张照片做固定等高裁切。手机自然顺排。 | 每张一次；不以封面重复填空。 | 无主销售动作。 |
| 4. Continue the archive／下一条看什么？ | 保留2篇相关日期/标题，取消冗长“company behind photographs”段落；增加一条与该篇最相关的真实内容出口。 | 两相关记录并列；手机单列。 | 不重复缩略图。 | 返回News；visit→Factory，summit→Capabilities，team→Profile；Contact仅保留1个普通入口。 |

| 文章 | N1/N2等封面及模块2 | 模块3 | 保留的独有信息与禁止扩展 |
|---|---|---|---|
| N1 Australian visit | cover=`australian-visit-03`；模块2=`04,02,05`车间参观/合影。 | `01`改为桌旁交谈，不声称图中手持加工件；年历疑点留内部待核对。 | 当前事件记录7 January2025；照片不证明身份、批准、采购/客户结果。 |
| N2 Summit | cover=`china-africa-summit-01`；模块2=`02,03`公司展示。 | `04,05`会场及活动背景。 | 19 November2025、Hangzhou、company display/attendance；不写签约或合作成果。 |
| N3 May outing | cover=`team-may-2025-01`；模块2=`02`用餐。 | `03,04`晚间合影/食物停留。 | May2025、户外用餐/灯笼街景；不补具体日或生产绩效。 |
| N4 November outing | cover=`team-november-2025-01`；模块2=`02`活动横幅合影。 | `03,05,04`用餐/烧烤/场地。 | 30 November2025；保留5图，不让extra04成为采购条件式的折叠内容。 |
| N5 2024 outing | cover=`team-2024-01`；模块2=`02,03`大巴/用餐。 | `04,05,06`石桥台阶/碰碰车/步行。 | 2024、雨天、团队活动；日期不从文件名擅自升级。 |

### R1 — Resources hub（5模块）

| 模块／用户问题 | 具体内容、来源与处理 | 桌面 → 手机 | 图片 | 内链／下一步 |
|---|---|---|---|---|
| 1. Choose the task／这次需要解决什么？ | 保留短H1/intro，仅说明prepare/define/quick answer。 | 单列简短入口；手机相同。 | 无；删除规范中已失效的conceptual lead要求。 | 无新CTA。 |
| 2. Start an RFQ／已经准备报价吗？ | 保留RFQ清单+可复制brief说明；无需把全部清单再复制到hub。 | 任务左/清单入口右；手机上下。 | 无。 | RFQ checklist、inquiry brief下载。 |
| 3. Guide library／先采购流程还是工程规格？ | 保留Ordering/Machining两组及8指南的独有summary，RFQ只在模块2出现。 | 两组并列；手机Ordering→Machining。 | 无。 | 两目录标题＋其余7指南。 |
| 4. Worksheets and quick answers／能带走什么？ | 保留2份blank worksheets与FAQ入口；清楚说明not completed inspection records。 | worksheets/FAQ两列；手机worksheets→FAQ。 | 无。 | `/downloads/cnc-rfq-brief.txt`、`/downloads/order-acceptance-checklist.txt`、FAQ。 |
| 5. Use the prepared information／如何带入询价？ | 保留compact closing及draft-only边界，不恢复大幅示意或通用多链接尾部。 | 短说明/1动作；手机单列。 | 无。 | Quote。 |

### R2 — Ordering guide（6模块）

| 模块／用户问题 | 具体内容、来源与处理 | 桌面 → 手机 | 图片 | 内链／下一步 |
|---|---|---|---|---|
| 1. Decision map／走到哪个阶段？ | 保留intro和现4阶段页内导航；明确这是buyer preparation，不是LZZ合同。 | 标题/短说明→4锚点；手机自然换行。 | 无。 | 4个现stage锚点。 |
| 2. Prepare quote request／报价前带什么？ | 保留`orderingStages[0]`：drawing/model/revision/material/finish/qty/destination/open decisions。 | 说明左/指南右；手机说明→指南/brief。 | 无。 | RFQ checklist、blank brief。 |
| 3. Compare quoted work／如何同口径比价？ | 保留same revision/acceptance、scope/exceptions；不复制8行矩阵。 | 说明左/指南右；手机同序。 | 无。 | compare quotations。 |
| 4. Approve sample and batch／两次批准怎样区分？ | 保留sample acceptance与released revision/batch/records/schedule两种决定；2指南各有独立摘要。 | 一说明+两任务行；手机sample→repeat。 | 无。 | prototype approval、prototype-vs-small-batch。 |
| 5. Plan delivery／放行前还要确认什么？ | 保留protection/labels/destination/trade term/responsibilities/docs/transit，blank acceptance worksheet。 | 说明左/指南右；手机同序。 | 无。 | shipping checklist、acceptance worksheet。 |
| 6. LZZ process or technical definition／还缺公司流程或图纸定义？ | 合并现aside+closing：LZZ流程去About；工程规格去Machining；最后一个草稿动作。 | 2辅助入口后主动作；手机逐项。 | 无。 | How we work、Machining guides、Quote。 |

### R3 — Machining guides directory（4模块）

| 模块／用户问题 | 具体内容、来源与处理 | 桌面 → 手机 | 图片 | 内链／下一步 |
|---|---|---|---|---|
| 1. Define the part／先按什么判断？ | 保留geometry/working features/material/final surface简介。 | 单列短引言。 | 无。 | 连续阅读3项任务。 |
| 2. Three technical decisions／选择哪篇？ | 保留process selection、material/finish、critical drawing features三篇title/summary，顺序geometry→material/treatment→measurement。 | 三条横向标题/解释行；手机每行标题→解释。 | 无；不搬入3现场图/2涂层图。 | 三篇canonical。 |
| 3. See real geometry and setups／想看真实结构？ | 保留现study语境出口，说明只是geometry/setup参考；旧coating/construction hash仍指材料文章。 | 一短段+一个入口；手机相同。 | 无。 | Machining studies。 |
| 4. Prepare a complete RFQ／如何汇总规格？ | 合并现RFQ aside及closing，保留清单与draft边界。 | RFQ清单普通入口＋Quote主动作；手机上下。 | 无。 | RFQ checklist、Quote。 |

### R4 — FAQ（5模块）

| 模块／用户问题 | 具体内容、来源与处理 | 桌面 → 手机 | 图片 | 内链／下一步 |
|---|---|---|---|---|
| 1. Find an answer／是哪类疑问？ | 保留intro和Quotes/Processes/Inspection三组锚点。 | 锚点横排；手机换行。 | 无。 | 现3group anchors。 |
| 2. Quotes and ordering／商业入口？ | 保留8答：MOQ、timing完整条件、RFQ inputs、draft-only、payment、sample charges、after-sales、nonconformity。 | 组题左/答案右；手机组题→8答。 | 无，不折叠。 | RFQ、How we work、sample/batch、Quote对应入口；每答1条。 |
| 3. Processes and specifications／工艺与精度？ | 保留3答：5服务、grade/finish、±0.01条件及“No”。 | 同上；手机完整答案。 | 无。 | Capabilities、material guide、Factory quality。 |
| 4. Inspection and delivery／如何验证与交接？ | 保留4答：inspection docs、ISO资格≠part/industry approval、delivery responsibilities、studies proof scope。 | 同上。 | 无。 | ISO答直达profile `#quality-system`；Factory docs、shipping、studies。 |
| 5. Ask about a specific part／仍需讨论？ | 保留topic上下文进入Quote，不以15答承诺适用所有订单。 | 短文＋单动作；手机上下。 | 无。 | `/quote/?part=Custom+CNC+machining+FAQ+follow-up`。 |

### G1 — RFQ checklist（6模块）

| 模块／用户问题 | 具体内容、来源与处理 | 桌面 → 手机 | 图片 | 内链／下一步 |
|---|---|---|---|---|
| 1. Prepare one consistent request／要准备哪六类输入？ | 保留H1/intro＋Files、Material/finish、Quantity、Critical features、Delivery、Open decisions六个短标签。合并重复解释，把条件留给下方3模块。 | 标签排2列，非新增页内目录；手机6项短行。 | 无。 | 现`#rfq-template`快捷入口。 |
| 2. Drawings and inspection／什么文件和验收条件？ | **从details迁出并可见**：STEP＋controlled2D、part/units/rev、冲突优先级、multi-axis part/stock尺寸与已知重量；critical fits/datums/tolerances/threads/sealing、before/after finish；method/instrument range/calibration evidence/report format；sample保留/改变及无法反推材料/处理。来源`contentGuides.rfq-checklist.drawing-package`逐项保留。 | 标签/值30:70连续字段；手机标签→完整值。 | 无；不拿卡尺概念图替代条件。 | critical-features、Factory quality；保留drawing-package/rq-essentials/rq-accepted/acceptance。 |
| 3. Material and surface／材料和最终状态怎么写？ | **迁出details**：exact grade/functional requirements、records/substitutes；treatment/appearance/masking/edges、applicable standard/revision/scope/required certificates。 | 可见两组字段；手机单列。 | 无。 | material-and-finish指南。 |
| 4. Quantity and delivery／数量、时点和责任？ | **迁出details**：MOQ1、initial/repeat quantity、7–14business days after drawing/order confirmation including finishing、transit separate；arrival/postcode/decision deadline、protection/labels/trade basis/customs/duties/taxes。 | 完整订单条件一行＋3组字段；手机完整条件先行。 | 无。 | shipping checklist；保留commercial-brief/drawing-review。 |
| 5. Inquiry brief and worksheet／怎样带走完整输入？ | 保留原10行brief、mark open decisions、先NDA再分享；Copy/Download；acceptance blank worksheet标明不是已完成报告。屏幕brief与TXT的文件冲突优先级说明对齐。 | brief左/使用说明与工具右；手机说明→brief→Copy/Download→acceptance。 | 无。 | 两份原TXT；不把下载当提交。 |
| 6. Resolve details or prepare draft／下一步？ | 合并相关2指南和compact closing，保留topic；不再在末尾重复一遍六项列表。 | 两普通指南出口→一个主动作；手机同序。 | 无。 | critical-features、compare quotations、Quote现topic。 |

RFQ字段处理的结论：现六项快览确实保留了部分核心词，units/revision、critical features、destination并非全部隐藏；问题是**剩余的判断条件和完整业务时限被整体降到可选说明**。方案不是删除快览，而是让完整字段直接可读。不存在“内容没删所以没有信息层级问题”的豁免。

### G2 — Compare quotations（5模块）

| 模块／用户问题 | 具体内容、来源与处理 | 桌面 → 手机 | 图片 | 内链／下一步 |
|---|---|---|---|---|
| 1. Same specification／价格可比的前提？ | 保留intro+same-requirements：same rev/model/grade/finish/qty/arrival/acceptance；alternative独立记录。合并首屏和首段重复。 | 单列68ch。 | 无。 | RFQ checklist。 |
| 2. Scope comparison／价格包括哪些工作？ | 保留8行3列：drawing/qty、material、machining/finish、setup/charges、inspection、packing/transport、schedule、commercial。每行含compare/question，不只留行题。 | 完整矩阵；手机每行Check→Compare→Question。 | 无。 | 表内不增CTA。 |
| 3. Exceptions／缺项和替代如何处理？ | 保留written confirmation、original/exception/decision、missing finish/records不能默认 included、总成本需实际quote，不编未报价allowance；旧sample不覆盖changed drawing/material。 | 两段正文。 | 无。 | Factory quality、sample approval。 |
| 4. Accepted quote record／订单要留下什么？ | 保留quote reference/date、rev/qty、exceptions、delivery basis、change对price/schedule/acceptance。 | 条目式record清单；手机相同。 | 无，不制作虚构填好的报价。 | How we work。 |
| 5. Next decision／继续确认还是询价？ | 合并related+closing，避免重复RFQ两次。 | RFQ/sample两个入口＋Quote动作；手机顺排。 | 无。 | RFQ checklist、prototype approval、现topic Quote。 |

### G3 — Drawing requirements and critical features（6模块）

| 模块／用户问题 | 具体内容、来源与处理 | 桌面 → 手机 | 图片 | 内链／下一步 |
|---|---|---|---|---|
| 1. Define function and control／谁确定工程要求？ | 保留intro和function-first：locating/mating/sealing/sliding/load-bearing、设计工程师负责datum/tolerances/drawing standard；ASME来源链接仅说明标准范围。 | 单列引入；手机相同。 | 无。 | 现ASME标准范围外链；不是本站复刻标准。 |
| 2. Measurable requirements／如何写成可验收条件？ | 保留6行3列feature表：datums、fits、hole patterns、sealing/cosmetic、threads/edges、treated surfaces，含inspection setup/records/stage。 | 整表；手机按行保留3层。 | 无。 | 无重复下一步按钮。 |
| 3. Geometry and route／加工会怎样影响这些关系？ | 保留旧part-requirements的pockets/housings与shaft/fitting区别、组合工艺、material/geometry/setup/measurement条件；与现study-context合并。 | 短文左/实拍右；手机文字→实拍→边界图注。 | CO-I12 multi-feature parts。 | turning-then-milling、pocketed enclosure studies。 |
| 4. Material, treatment and project scope／还有哪些技术条件？ | 从现release-files长补充段分出：grade/condition、finish、masked surfaces、before/after treatment、standard/revision、traceability/end use/export。来源为旧part guide合并内容，全部保留。 | 参数字段双列；手机标签→值。 | 无。 | material-and-finish指南。 |
| 5. Release and acceptance／文件冲突和变更怎样解决？ | 保留part/units/revision一致性、controlling file、revised feature、previous quote/sample applicability、dimensional/appearance/function acceptance、method/report format；不得从照片推断inspection。 | 单列record模块；手机同序。 | 无。 | Factory quality、sample approval、RFQ。保留旧section-1..5与working-surfaces等aliases。 |
| 6. Send controlled requirements／如何开始？ | 合并related与closing，仅保留RFQ/material两普通出口和topic Quote。 | 简短结尾；手机顺排。 | 无。 | 现关联指南与Quote。 |

### G4 — Machined prototype approval（6模块）

| 模块／用户问题 | 具体内容、来源与处理 | 桌面 → 手机 | 图片 | 内链／下一步 |
|---|---|---|---|---|
| 1. Purpose of approval／批准的是哪一类结果？ | 保留intro，收样/外观满意≠批准全部量产要求。 | 单列。 | 无，不用AI样件暗示检查结果。 | 连续阅读evaluation。 |
| 2. Evaluation plan／谁提供和执行试验？ | 保留fit/function/appearance目的、mating components/fixtures/procedures、执行人/批准人、prototype与production材料/finish差异限制。 | Buyer/supplier/agreed decision表；手机顺排。 | 无。 | prototype machining能力页。 |
| 3. Review sample and evidence／要检查哪七项？ | 保留7行：identity、material/finish、dimensions、assembly fit、function、appearance/handling、open issues；对应evidence与decision两列全保留。 | 整表；手机按行显示3层。 | 无，不造inspection report。 | 表后进入approval record。 |
| 4. Approval record／谁批准了哪个版本？ | 保留part/sample references、rev、checks/evidence、actual approver、approved/with documented conditions/not approved、open issues/revised sample。 | 实际字段清单，不能填假结果；手机相同。 | 无。 | 无额外CTA。 |
| 5. Separate batch release／样件通过就能开批次吗？ | 保留quantity/sampling/records/packing/schedule、sample只适用于被评样件、material/finish/route变更需复核。 | 单列短文＋release字段。 | 无。 | How we work；repeat/compare集中在下模块。 |
| 6. Prepare approval discussion／下一步？ | 合并related与closing；不重复上一模块全部链接。 | 两普通关联＋一个主动作；手机顺排。 | 无。 | repeat production/compare quotations、topic Quote。 |

### G5 — Choose the machining route（5模块）

| 模块／用户问题 | 具体内容、来源与处理 | 桌面 → 手机 | 图片 | 内链／下一步 |
|---|---|---|---|---|
| 1. Geometry first／从什么出发？ | 保留intro：geometry/feature relationships，可能需要turning+milling，drawing决定route/inspection。 | 单列短引言。 | 无。 | 连续阅读comparison。 |
| 2. Route comparison／选哪种加工？ | 保留3行：turning axes/diameter/shoulders/threads/runout/secondary features；milling datums/depth/hole/stock/clamping；multi-axis datums/angular/access/clearance；indexed≠simultaneous条件可见。 | 3列整表；手机每route完整标签。 | 无，不重新生成3块几何图。 | turning/milling/5-axis能力页。 |
| 3. Workshop setups and studies／真实设置说明什么？ | 合并process-references＋geometry-studies；每实拍下附最相关study和功能说明，不证明型号/精度/同时联动。 | 三个自然比例实拍/短文项并列；手机单列同序。 | CO-I13三图各1次。 | turn-then-mill、five-axis multi-face、two-stage milling对应studies。 |
| 4. Critical tolerances／能不能按图验收？ | 保留material/geometry/setup/finish/measurement依赖、critical datums/tolerances、model/drawing rev/material/qty输入。 | 单列record。 | 无，不放CMM装饰重复照片。 | RFQ、critical-features。 |
| 5. Request route review／如何请求建议？ | 合并related+closing，保留topic。 | 短文＋单动作；手机相同。 | 无。 | critical-features/material、Quote。 |

### G6 — Material and finish（7模块）

| 模块／用户问题 | 具体内容、来源与处理 | 桌面 → 手机 | 图片 | 内链／下一步 |
|---|---|---|---|---|
| 1. Specify the final state／材料和尺寸何时验收？ | 保留intro：grade/treatment/final dimensions同一规格，records随RFQ提出。 | 单列短引言。 | 无。 | 连续阅读material表。 |
| 2. Grade and condition／写什么牌号？ | 保留5材料族3列表、functional requirements/environment/temperature/load/electrical/cleanliness、非库存/适用性承诺、C3600/H62/C36000不等价。 | 整表＋冲突说明紧邻；手机行式完整值。 | 无，不使用看图猜材质。 | 现aluminum/plastic/stainless/copper-brass能力链接。 |
| 3. Treatment and appearance／表面工艺怎样指定？ | 保留工艺可用性subject to material/order、standard/revision/thickness/method、anodize alloy/color、passivation/plating spec、cosmetic faces/gloss/texture/visual references。 | 两组可见字段。 | 无。 | 下一模块interfaces。 |
| 4. Interfaces and final dimensions／遮蔽和尺寸有什么关系？ | 保留threads/bores/sealing/mating surfaces coat/mask/protect、electrical/corrosion、before/after dimensions、texture/fit影响、deburr/edge/packing保护。 | 示意左/字段右；手机短说明→示意→完整字段。 | CO-I14 finish示意，红色含义与AI属性直接可见。 | critical-features。 |
| 5. Solid, coated or covered／PTFE与Teflon照片是一回事吗？ | 保留实体polymer/metal substrate coating/separate covering三种定义；源组标注Teflon只是集合信息，不把圆件/长条当实心PTFE。 | 定义短文上/两16:9原照下。手机定义→round→bars。 | CO-I15两张原照；不生成“材料证据”。 | 相关plastic machining可在文内出现一次。 |
| 6. Records and scope／需要什么证据？ | 保留traceability/treatment/dimensional/other tests、limits/sampling、part/rev/batch引用、certificate scope、material name≠compliance。 | 单列记录清单。 | 无。 | Factory quality、metal-parts study。 |
| 7. Prepare a specification／如何带进RFQ？ | 合并related+closing，grade/condition/finish/records摘要一次。 | 两关联入口＋Quote动作；手机顺排。 | 无。 | critical-features/process-selection、topic Quote。 |

### G7 — Prototype to repeat production（6模块）

| 模块／用户问题 | 具体内容、来源与处理 | 桌面 → 手机 | 图片 | 内链／下一步 |
|---|---|---|---|---|
| 1. First sample purpose／样件先确认什么？ | 合并intro/section-1：fit/appearance/function先定，tool access/workholding、grade/condition/finish/acceptance/price/schedule逐项确认；经济批量依part/setup，不设固定阈值。 | 单列68ch。 | 无。 | sample approval。 |
| 2. Prototype vs repeat decisions／哪些要求会改变？ | 保留5行3列表：revision、setup/route、material/finish、inspection、price/timing全部内容，含7–14完整起算/finish/transit条件。 | 整表；手机逐行Prototype→Repeat并列标签上下显示。 | 无。 | 不新增CTA。 |
| 3. Batch specification／放行前还需决定什么？ | 保留approved specification、inspection sampling/critical features/method/instrument evidence/report/docs、qty/price/production slot、route随qty变化；MOQ完整。合并与表格逐字重复，保留独有条件。 | 3组字段；手机单列。 | 无。 | Factory quality，最多一条。 |
| 4. Revision and release record／版本怎样管住？ | 保留3阶段record表：sample evaluation、design change、batch release，字段完整。 | 2列整表；手机阶段→记录。 | 无，不生成批准签章。 | How we work。 |
| 5. Repeat quotation／复购还要问什么？ | 保留same rev/material/finish/qty、setup/inspection/packing/delivery、exclusions/substitutes、changes/nonconforming/repeat release。 | 单列record。 | 无。 | compare quotations、low-volume capability。 |
| 6. Quote the next batch／下一步？ | 合并related+closing，保留first/repeat qty/arrival/records提醒一次。 | 关联入口＋主动作；手机顺排。 | 无。 | sample approval/shipping、现topic Quote。 |

### G8 — Packing and international shipping（6模块）

| 模块／用户问题 | 具体内容、来源与处理 | 桌面 → 手机 | 图片 | 内链／下一步 |
|---|---|---|---|---|
| 1. Plan arrival separately／到货日怎么规划？ | 保留intro：destination/packing/responsibility前置，production≠transit；不给到货承诺。 | 单列短引言。 | 无。 | 连续阅读protection。 |
| 2. Protection and identity／怎样保护和识别？ | 保留cosmetic/seal/thread/fragile edges、cleanliness/corrosion、separation、carton/wooden case、pack weight/handling、part/rev/batch/qty labels。 | 概念图左/字段右；手机字段→图→AI说明。 | CO-I16现packing illustration，只解释隔离保护。 | acceptance worksheet可在文内一次。 |
| 3. Timing and responsibility／谁承担哪一段？ | 保留生产7–14完整条件、dispatch/arrival/receiving address；trade term/version/named place、booking/payment/clearance/insurance/duties/taxes/local delivery；EXW/FOB/DDP as quoted、DDP非自动；courier/air/sea依size/destination、DHL/FedEx/UPS为可讨论选项。 | 条件与责任表，非销售卡；手机标签值全显示。 | 无，不用港口/飞机生成图。 | How we work `#packaging-shipping`。 |
| 4. Shipment and import records／随货文件有哪些？ | 保留packing list/commercial invoice/shipment info；material/finish/dimensional as agreed，part/rev/order一致；额外destination-specific documents需进口主体/forwarder确认。 | 单列record。 | 无，不造单据样张。 | Factory order-documentation。 |
| 5. Historical packing reference／原照能说明什么？ | 保留3图与November2022来源，说明historical preparation、no destination/carrier/trade term inference；不是当前标准pack或已完成交付。 | 横向背景图+两个竖图按自然比例排；手机横图完整一行→两竖图独立顺排，以文字可读优先。 | CO-I10、I17、I18。 | 不开图、不把档案变客户case。 |
| 6. Include shipment needs in RFQ／如何带入询价？ | 合并related+closing，保留drawing/material/finish/qty/destination/arrival/packing/docs要点一次。 | 两关联入口＋主动作；手机顺排。 | 无。 | repeat production/RFQ、现topic Quote。 |

### Q — Quote：一个草稿流程、4个状态区

这些是现有流程的内容分区，不是在表单前后硬凑四个营销章节。

| 状态区／用户问题 | 具体内容、来源与处理 | 桌面 → 手机 | 图片 | 内链／下一步 |
|---|---|---|---|---|
| 1. Context and scope／在询哪种零件、网站会做什么？ | 保留supported product/capability reference、可更换/清空、arbitrary topic不伪造外部source。把“draft only / no upload / attach and send in email app”提前到表单入口。 | 左侧标题/reference/简明联系方式，右侧表单；手机标题/reference→说明→表单，完整地址/直接联系方式移到表单后。 | 无。 | reference返回实际页面；RFQ checklist；Privacy。 |
| 2. Editable fields／要填写哪些资料？ | 保留Name→Email→Phone→optional product/service→Message；Name/Message必填，Email或Phone至少1；当前验证与错误关联保留。Message旁添加revision/material/finish/qty/critical features/destination/arrival短提示，不新增强制商业字段。 | 单列表单；手机同顺序，现48px输入/144pxmessage作为源码起点待实测。 | 无。 | Prepare inquiry draft；不写Submit/Send。 |
| 3. Storage and correction／会保留在哪里、如何清？ | 保留sessionStorage自动保存、restored/cleared/unavailable、清当前入口及其legacy keys；就近短说明“不发送到LZZ”，Privacy说明完整范围；保存/清除在ready后亦可发现，不需返回长页脚。 | 状态与Clear同组；手机状态→Clear。 | 无。 | Privacy；无账户、云同步或附件承诺。 |
| 4. Review and export／怎样真正发出？ | 保留To/subject/message/完整draft；Open email app为主，Edit/Copy/Save为工具；copy failure可选文本或Save；不把copied/mailto当发送成功。显示drawings需在邮件应用添加。 | 完整draft在操作前可审阅；手机同序不截正文。 | 无。 | mailto、复制、TXT保存、Edit；直接联系方式作fallback。 |

保留当前`buildInquiryDraft()`的subject/body生成规则；topic在正文中可审阅。此次内容改造不额外要求变更邮件主题算法。

### PRIV — Privacy and site information（5模块）

| 模块／用户问题 | 具体内容、来源与处理 | 桌面 → 手机 | 图片 | 内链／下一步 |
|---|---|---|---|---|
| 1. Inquiry behavior／信息是否已传给LZZ？ | 保留inquiry段：browser draft、不发送、不上传、自行附图发送；紧接标题，不藏在条款折叠。 | 单列68ch；手机相同。 | 无。 | Quote。 |
| 2. Saved draft scope／保存多久、怎样删除？ | 保留refresh/restore、session恢复、shared device、blocked/full storage、Save text fallback；精确为“按进入页面时的part/topic保存”，表内改reference仍属该草稿；Clear仅当前入口。 | 单列，scope→clear→restore/failure顺序。 | 无。 | Quote的Clear/Edit路径说明。 |
| 3. External services／外链后由谁处理？ | 保留email/WhatsApp各自privacy；本地源码未发现analytics/advertising脚本与Cookie行为，不扩张为“服务器不记录任何访问”。 | 单列短段。 | 无。 | Contact；不增加不存在的Cookie设置工具。 |
| 4. Use of product and company information／资料能证明到哪？ | 保留examples≠independently verified pictured-part specs；drawing/quote/order定义要求；guides无customer inspection outcomes；recognition/ISO当前validity需公司核对。 | 单列两短段。 | 无。 | Profile documents、Factory quality、RFQ。 |
| 5. Questions／谁能解释本站行为？ | 保留真实邮箱与法定主体；增加修订日期仅在真实编辑时记录，不假写法律合规结论。 | 单列联系人。 | 无。 | mailto Roger。 |

### E — 404（2模块）

| 模块／用户问题 | 具体内容、来源与处理 | 桌面 → 手机 | 图片 | 内链／下一步 |
|---|---|---|---|---|
| 1. Missing page／发生什么？ | 保留Page not found，补一条链接可能已变化的恢复说明；noindex。 | 短标题＋一段；手机相同。 | 无。 | 连续阅读恢复入口。 |
| 2. Recover the task／去哪里继续？ | 保留Home、Part examples、Capabilities，并补Resources第四个恢复入口帮助旧指南访客，删除任何通用RFQ销售尾部。 | 4条恢复动作；桌面同一组，手机逐行44px以上。 | 无。 | `/`、`/products/part-examples/`、`/capabilities/`、`/resources/`。 |

## 3. 逐 URL 映射与检查状态

### 3.1 清单口径

发现84个业务页、1个404、19个noindex预览；另有153条迁移/规范化规则，其中67条有HTML跳转壳。独立当前路径并集257，不能把跳转壳算成额外内容页。另91条原站完整URL是来源/兼容映射，不等于91个当前在售页面。主内容img元素共引用223个独立图片文件（不含CSS背景、图标与视频poster）；重复引用仍按图位检查。

全部84个业务页已检查职责、现有模块、独有内容、图片引用及对应数据/组件；实际视觉抽查覆盖59个业务页＋404的桌面/手机窗口。25个业务页没有逐页视觉实看：23个其余产品详情、2篇团建新闻，明确只依据内容与共享组件推导。没有称84页均完成双端视觉验收。

C＝已读当前内容/源码/图片引用，图片源像素检查范围见第5节。V＝实际打开过的截图窗口；它不等于完整页面视觉验收。V18–V33手机仅为首屏及前部固定位置；Factory/产品来源另加稳定锚点窗口。Home/404/Privacy/Quote由主审查员实看指定窗口，其余由独立评审逐图核对。

### 3.2 全部业务页面与404

表中图片路径根为`D:/lzz/lzz/_react/public`；具体图位处理见第5节，P编号为产品来源对照，不是SKU。当前模块仅列H2；标题、所有正文/表格/折叠/内链保存在inventory.json，不会因未列于短表被视为可删。

| URL | 用户任务 / 蓝图 | 具体差异与改造范围 | 当前模块及重排 | 当前全部主内容图片 | 检查状态 | 优先级 |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | 首页 / HOME | 按图定制→形态→工艺材料→真实供应商依据→装夹记录→带资料询价 | 当前：Part examples → Machining capabilities & materials → Factory & quality → Machining studies → Have a drawingto review?；按蓝图重排 | `/media/responsive/machining-hero-v2-1672.webp`<br>`/media/gallery/impeller-gallery-v1-1200.webp`<br>`/media/gallery/casting-gallery-v1-1200.webp`<br>`/media/gallery/locking-pin-gallery-v1-1200.webp`<br>`/media/gallery/plastic-gallery-v1-1200.webp`<br>`/media/image-audit/impeller-detail-v2-1200.webp`<br>`/media/factory-refined/workshop-1440.webp`<br>`/media/factory-refined/inspection-1440.webp`<br>`/media/evidence/display-housing-machining-1600.webp`<br>`/media/evidence/turn-mill-operation-1600.webp` | C已查；V01 桌面实看指定首屏/下表补充；手机实看指定窗口 | P1 |
| `/404.html` | 企业/联系 / E | Page not found，Home/part examples/capabilities三条恢复入口，noindex。 已审；无需完整销售尾部或装饰图，采用 E。 | 当前：首屏/任务动作；按蓝图重排 | 无主内容图片；保持无装饰图 | C已查；V02 桌面实看指定首屏/下表补充；手机实看指定窗口 | P1 |
| `/about/` | 企业/联系 / A1 | 供应商入口：intro＋3公司事实、4条公司路径、3种审核要求、2篇来访/参会记录、RFQ尾部。 已审；纠正来访图文与重复入口，采用 A1。 | 当前：Get to know your machining supplier → Review the requirements that matter to your order → People, parts and conversations → Have a drawing to review?；按蓝图重排 | `/media/evidence/workshop-wide-1600.webp`<br>`/media/evidence/visitor-part-discussion-1600.webp`<br>`/media/company-news/australian-visit-01-1600.webp`<br>`/media/company-news/china-africa-summit-01-1600.webp` | C已查；V03 桌面实看抽样；手机实看抽样 | P1 |
| `/about/company-news/` | 公司活动记录 / A5 | 5篇；最新 featured＋其余4篇；All/Workshop & events/Team life筛选、结果数量；公司路径＋RFQ。 已审；保留日期与可访问筛选，不以团建做制造证明；采用 A5。 | 当前：A November team day outdoors → LZZ at the China-Africa West Lake Summit → LZZ team outing in May 2025 → An Australian customer visits the LZZ workshop → A rainy day out with the LZZ team → Get to know the company behind the photographs → Talk through your part requirements；按蓝图重排 | `/media/company-news/team-november-2025-01-1600.webp`<br>`/media/company-news/china-africa-summit-01-1600.webp`<br>`/media/company-news/team-may-2025-01-1600.webp`<br>`/media/company-news/australian-visit-01-1600.webp`<br>`/media/company-news/team-2024-01-1600.webp` | C已查；V04 桌面实看抽样；手机实看抽样 | P1 |
| `/about/company-news/australian-customer-workshop-visit-january-2025/` | 公司活动记录 / A6 | 7 January 2025事件记录，workshop tour/part review两组，相关文章。 已审；封面与文字更正、日期冲突登记；A6＋N1。 | 当前：On the workshop floor → Looking closely at a component → More from LZZ；按蓝图重排 | `/media/company-news/australian-visit-01-1600.webp`<br>`/media/company-news/australian-visit-04-1600.webp`<br>`/media/company-news/australian-visit-02-1600.webp`<br>`/media/company-news/australian-visit-05-1600.webp`<br>`/media/company-news/australian-visit-03-1600.webp` | C已查；V05 桌面实看抽样；手机实看抽样 | P0 |
| `/about/company-news/china-africa-west-lake-summit-2025/` | 公司活动记录 / A6 | 19 November 2025；公司展板与会场两组，仅证明参会/展示。 已审；不增加合作、订单、客户成果；A6＋N2。 | 当前：Introducing custom machining → Inside the conference hall → More from LZZ；按蓝图重排 | `/media/company-news/china-africa-summit-01-1600.webp`<br>`/media/company-news/china-africa-summit-02-1600.webp`<br>`/media/company-news/china-africa-summit-03-1600.webp`<br>`/media/company-news/china-africa-summit-04-1600.webp`<br>`/media/company-news/china-africa-summit-05-1600.webp` | C已查；V06 桌面实看抽样；手机实看抽样 | P1 |
| `/about/company-news/lzz-team-outing-2024/` | 公司活动记录 / A6 | 2024；雨天/大巴/用餐＋石桥台阶/碰碰车/步行。 已审；现有日期保守，保留；A6＋N5。 | 当前：The journey and a shared meal → A day away from the machines → More from LZZ；按蓝图重排 | `/media/company-news/team-2024-01-1600.webp`<br>`/media/company-news/team-2024-02-1600.webp`<br>`/media/company-news/team-2024-03-1600.webp`<br>`/media/company-news/team-2024-04-1600.webp`<br>`/media/company-news/team-2024-05-1600.webp`<br>`/media/company-news/team-2024-06-1600.webp` | C已查；V07 桌面实看抽样；手机实看抽样 | P1 |
| `/about/company-news/may-2025-lzz-team-outing/` | 公司活动记录 / A6 | May 2025；户外用餐＋夜间街道/食物停留。 已审；保留月份粒度，不因文件名擅自增加日；A6＋N3。 | 当前：An outdoor meal together → Evening streets and food stops → More from LZZ；按蓝图重排 | `/media/company-news/team-may-2025-01-1600.webp`<br>`/media/company-news/team-may-2025-02-1600.webp`<br>`/media/company-news/team-may-2025-03-1600.webp`<br>`/media/company-news/team-may-2025-04-1600.webp` | C：源码/内容/图片引用已查；V：未逐页看，版式仅共享组件推导 | P1 |
| `/about/company-news/november-2025-hangzhou-lizhizao-group-activity/` | 公司活动记录 / A6 | 30 November 2025；水边合影＋烧烤/用餐。 已审；04保留为附加档案图，不让单张额外图形成独立主章节；A6＋N4。 | 当前：A day beside the water → Around the barbecue and table → More from LZZ；按蓝图重排 | `/media/company-news/team-november-2025-01-1600.webp`<br>`/media/company-news/team-november-2025-02-1600.webp`<br>`/media/company-news/team-november-2025-03-1600.webp`<br>`/media/company-news/team-november-2025-05-1600.webp`<br>`/media/company-news/team-november-2025-04-1600.webp` | C：源码/内容/图片引用已查；V：未逐页看，版式仅共享组件推导 | P1 |
| `/about/company-profile/` | 企业/联系 / A2 | 法定主体、工程经验、3份认可/ISO请求、人员、5段发展、11类应用（4显/7折叠）、RFQ。 已审；文件要点取消折叠，应用可保持次要展开，采用 A2。 | 当前：Engineering experience, with inspection planned for your part → Company recognition& supplier documents → Talk through the part, close to the workshop → From the first parts to a broader machining scope → Components for equipment assemblies → Discuss the requirements for your component；按蓝图重排 | `/media/evidence/workshop-wide-1600.webp`<br>`/media/evidence/workshop-aisle-1200.webp`<br>`/media/High-tech-Enterprise-Certificate-1764396986484--69861fe474.webp`<br>`/media/Zhejiang-1764397018975--75b9eb4d46.webp`<br>`/media/Artificial-1764396998946--413c4183ea.webp`<br>`/media/evidence/visitor-part-discussion-1600.webp`<br>`/media/evidence/team-2025-evening-group-1600.webp` | C已查；V08 桌面实看抽样；手机实看抽样 | P0 |
| `/about/contact/` | 企业/联系 / A4 | email/WhatsApp/UTC+8；询价输入；地址和访问安排；供应商文件与已有订单分流。 已审；去装饰parts，联系方式和分流优先，采用 A4。 | 当前：Prepare a machining inquiry → Visit the workshop in Hangzhou → Supplier review or an existing order；按蓝图重排 | `/media/about-redesign-20261014/inquiry-parts-1200.webp`<br>`/media/evidence/workshop-wide-1600.webp` | C已查；V09 桌面实看抽样；手机实看抽样 | P1 |
| `/about/how-we-work/` | 企业/联系 / A3 | intro＋MOQ/交期，quotation scope，sample/batch，packing/transport，changes/nonconformance，RFQ。 已审；买方/LZZ/共同批准责任需拆清，采用 A3。 | 当前：Start with a consistent drawing and quotation → Release the approved specification for production → Protect the parts and agree the delivery basis → Keep changes and acceptance decisions clear → Prepare your machining inquiry；按蓝图重排 | `/media/about-redesign-20261014/drawing-review-1200.webp`<br>`/media/evidence/cmm-detail-1600.webp`<br>`/media/evidence/shipping-example-1600.webp` | C已查；V10 桌面实看抽样；手机实看抽样 | P1 |
| `/capabilities/` | 能力选路目录 / CAP-H | Hero；5 个 primaryServices 工艺目录；4 材料入口；prototype/repeat 对照；sample-to-part；RFQ。塑料在工艺与材料两处指向同一 URL，不是两项能力。目录没有页面内的 Factory 证据出口。 内容检查 / 图片源检查 | 当前：Machining services → Materials → One part to evaluate, or a release to repeat? → Starting with an existing sample → Bring your part requirements together；按蓝图重排 | `/media/capabilities-section-20261014/capability-family-1200.webp`<br>`/media/capability-directory-20261014/cnc-milling-service-800.webp`<br>`/media/capability-directory-20261014/cnc-turning-service-800.webp`<br>`/media/capability-directory-20261014/5-axis-cnc-machining-800.webp`<br>`/media/capability-directory-20261014/plastic-machined-parts-800.webp`<br>`/media/capability-directory-20261014/casting-machining-800.webp`<br>`/media/product-studio/catalog-12-studio-v2-1536.webp`<br>`/media/turning-reading-20261014/shaft-retouched-1200.webp`<br>`/media/gallery/brass-gallery-v2-1200.webp`<br>`/media/product-studio/catalog-20-studio-v2-1536.webp`<br>`/media/capabilities-section-20261014/sample-definition-1200.webp` | C已查；V11 桌面实看抽样；手机实看抽样 | P1 |
| `/capabilities/5-axis-cnc-machining/` | 工艺适配 / CAP-P | Hero；3 例图；workshop 内 indexed/simultaneous 对照与 3 图；铝/钛/镍合金/不锈钢；3 组 checks+包络重量；FAQ；RFQ。最大尺寸、行程、负载未公布。 内容检查 / 图片源检查 | 当前：Angled faces & complex contours → Five-axis machining in practice → Materials & finishes → Drawing & inspection requirements → Questions before ordering → Request a 5-axis machining quote；按蓝图重排 | `/media/product-reading-20261014/impeller-geometry-1200.webp`<br>`/media/product-studio/catalog-00-studio-v2-1536.webp`<br>`/media/product-studio/catalog-11-studio-v2-1536.webp`<br>`/media/product-studio/catalog-04-studio-v2-1536.webp`<br>`/media/evidence/five-axis-machine-wide-1600.webp`<br>`/media/evidence/five-axis-operation-1600.webp`<br>`/media/evidence/five-axis-parts-1600.webp`<br>`/media/evidence/cmm-detail-1600.webp` | C已查；V12 桌面实看抽样；手机实看抽样 | P1 |
| `/capabilities/aluminum-cnc-parts/` | 材料与加工条件 / CAP-M | Hero；3 例图；4 行铝材/原型范围；finishing AI 对照+3 张 archive 照片；壁厚/基准、孔/密封、处理后 acceptance；FAQ；RFQ。Hero 与首例 engine cover 重复。 内容检查 / 图片源检查 | 当前：Aluminum housings, covers & enclosures → Material grades & finishes → Aluminum machining in practice → Drawing & inspection requirements → Questions before ordering → Request an aluminum machining quote；按蓝图重排 | `/media/product-studio/catalog-13-studio-v2-1536.webp`<br>`/media/product-studio/catalog-33-studio-v2-1536.webp`<br>`/media/product-studio/catalog-30-studio-v2-1536.webp`<br>`/media/capabilities-section-20261014/aluminum-finish-1200.webp`<br>`/media/evidence/milling-enclosure-operation-1600.webp`<br>`/media/evidence/milling-enclosure-parts-1600.webp`<br>`/media/evidence/aluminum-housings-1600.webp`<br>`/media/services-reading-20261014/milling-features-1200.webp`<br>`/media/evidence/cmm-detail-1600.webp` | C已查；V13 桌面实看抽样；手机实看抽样 | P1 |
| `/capabilities/casting-machining/` | 工艺适配 / CAP-P | Hero；3 例图；无实拍的三步定义流程+sample 入口；铸件合金/毛坯/最终处理表；incoming blank、bores/datums、sealing/hidden checks；FAQ；RFQ。 内容检查 / 图片源检查 | 当前：Cast housings & finished interfaces → From cast blank to inspected part → Casting material & blank requirements → Drawing & inspection requirements → Questions before ordering → Request a casting machining quote；按蓝图重排 | `/media/services-reading-20261014/casting-stages-1200.webp`<br>`/media/product-studio/catalog-18-studio-v2-1536.webp`<br>`/media/gallery/casting-gallery-v1-1200.webp`<br>`/media/product-studio/catalog-24-studio-v2-1536.webp`<br>`/media/evidence/cmm-detail-1600.webp` | C已查；V14 桌面实看抽样；手机实看抽样 | P1 |
| `/capabilities/cnc-milling-service/` | 工艺适配 / CAP-P | Hero；3 零件例图；两次铣削 setup+CMM；通用材料表+钛说明；geometry/size/3 组 acceptance；条件性 ±0.01 mm；FAQ；RFQ。 内容检查 / 图片源检查 | 当前：Parts suited to CNC milling → CNC milling in practice → Materials & finishes → Drawing & inspection requirements → Questions before ordering → Request a CNC milling quote；按蓝图重排 | `/media/capability-directory-20261014/cnc-milling-service-1200.webp`<br>`/media/product-studio/catalog-01-studio-v2-1536.webp`<br>`/media/product-studio/catalog-04-studio-v2-1536.webp`<br>`/media/product-studio/catalog-33-studio-v2-1536.webp`<br>`/media/evidence/two-stage-first-1600.webp`<br>`/media/evidence/two-stage-second-1600.webp`<br>`/media/evidence/cmm-detail-1600.webp`<br>`/media/services-reading-20261014/milling-features-1200.webp` | C已查；V15 桌面实看抽样；手机实看抽样 | P1 |
| `/capabilities/cnc-turning-service/` | 工艺适配 / CAP-P | Hero；3 例图；turning→secondary milling→finished forms；4 材料族；4 组 drawing/acceptance；FAQ；RFQ。由独立 `turningPlan` 提供专属内容。 内容检查 / 图片源检查 | 当前：Turned forms, different working interfaces → Turning, secondary machining, finished features → Materials & finishes → Drawing & inspection requirements → Questions before ordering → Request a CNC turning quote；按蓝图重排 | `/media/turning-reading-20261014/turned-features-1200.webp`<br>`/media/turning-reading-20261014/shaft-retouched-1200.webp`<br>`/media/product-studio/catalog-06-studio-v2-1536.webp`<br>`/media/gallery/fittings-gallery-v2-1200.webp`<br>`/media/evidence/turning-operation-1600.webp`<br>`/media/evidence/turn-mill-operation-1600.webp`<br>`/media/evidence/turning-parts-1600.webp`<br>`/media/evidence/cmm-detail-1600.webp` | C已查；V16 桌面实看抽样；手机实看抽样 | P1 |
| `/capabilities/copper-brass-cnc-parts/` | 材料与加工条件 / CAP-M | Hero；唯一 fitting 例图；铜/黄铜/tellurium 材料表；workshop 中 electrical/thermal/fluid 三用途+3 步文字+2 原图；alloy/threads/plating checks；FAQ；RFQ。Hero 与唯一例图相同。 内容检查 / 图片源检查 | 当前：Contacts, fittings & connectors → Material grades & finishes → From alloy choice to finished fitting → Drawing & inspection requirements → Questions before ordering → Request a copper or brass quote；按蓝图重排 | `/media/gallery/brass-gallery-v2-1200.webp`<br>`/media/evidence/brass-plugs-1200.webp`<br>`/media/source-details/metal-brass-batch-1200.webp`<br>`/media/brass-threaded-plugs-retouched-v1-1536.webp`<br>`/media/evidence/cmm-detail-1600.webp` | C已查；V17 桌面实看抽样；手机实看抽样 | P1 |
| `/capabilities/low-volume-production/` | 批次/重复放行 / CAP-L | Hero；release/first article/repeat checks；三步 workflow+旧包装竖图；3 例图；按料号材料/表面处理；FAQ；RFQ。没有通用数量阈值。 内容检查 / 图片源检查 | 当前：Define the interfaces and acceptance → Plan the first release and the repeat order → Pilot builds & repeat part families → Materials & finishes by part number → Questions before ordering → Request a small-batch quote；按蓝图重排 | `/media/gallery/prototype-gallery-v1-1440.webp`<br>`/media/evidence/cmm-detail-1600.webp`<br>`/media/evidence/shipment-2022-order-packing-1600.webp`<br>`/media/product-studio/catalog-28-studio-v2-1536.webp`<br>`/media/product-studio/catalog-34-studio-v2-1536.webp`<br>`/media/product-studio/catalog-30-studio-v2-1536.webp` | C已查；V18 桌面实看抽样；手机实看前部窗口 | P1 |
| `/capabilities/plastic-machined-parts/` | 材料与加工条件 / CAP-M | Hero；3 例图；4 聚合材料行；PTFE vs coated metal note；三步说明+3 PTFE 原图+3 秒 PEEK 片段；fits/conditioning/tests；FAQ；RFQ。 内容检查 / 图片源检查 | 当前：Insulators, guides & polymer housings → Material grades & finishes → Plastic part examples & process review → Drawing & inspection requirements → Questions before ordering → Request a plastic machining quote；按蓝图重排 | `/media/capabilities-section-20261014/plastic-support-1200.webp`<br>`/media/product-studio/catalog-21-studio-v2-1536.webp`<br>`/media/product-studio/catalog-29-studio-v2-1536.webp`<br>`/media/gallery/plastic-gallery-v1-1200.webp`<br>`/media/source-details/plastic-ptfe-intermediate-1200.webp`<br>`/media/source-details/plastic-ptfe-shafts-1200.webp`<br>`/media/source-details/plastic-ptfe-batch-1200.webp`<br>`/media/polymer-shafts-retouched-v1-1536.webp`<br>`/media/evidence/cmm-detail-1600.webp` | C已查；V19 桌面实看抽样；手机实看前部窗口 | P1 |
| `/capabilities/prototype-machining/` | 原型评估 / CAP-A | Hero；purpose 中固定接口/评估责任+嵌套 workflow+requirements；3 个汽车形态例图；通用材料+替代须批准；FAQ；RFQ。 内容检查 / 图片源检查 | 当前：Decide what the prototype must demonstrate → Prototypes for assembly & design checks → Materials & finishes → Questions before ordering → Request a prototype machining quote；按蓝图重排 | `/media/gallery/rfq-gallery-v1-1440.webp`<br>`/media/evidence/cmm-detail-1600.webp`<br>`/media/product-studio/catalog-13-studio-v2-1536.webp`<br>`/media/product-studio/catalog-12-studio-v2-1536.webp`<br>`/media/product-studio/catalog-15-studio-v2-1536.webp` | C已查；V20 桌面实看抽样；手机实看前部窗口 | P1 |
| `/capabilities/stainless-steel-cnc-parts/` | 材料与加工条件 / CAP-M | Hero；3 例图；303/304、316/316L、17-4PH、430/440；无实拍的三步流程；尺寸/螺纹/处理文件；FAQ；RFQ。Hero 与首例 shaft-retouched 重复。 内容检查 / 图片源检查 | 当前：Shafts, fittings & locking hardware → Material grades & finishes → Plan the stainless machining sequence → Drawing & inspection requirements → Questions before ordering → Request a stainless steel quote；按蓝图重排 | `/media/turning-reading-20261014/shaft-retouched-1200.webp`<br>`/media/product-studio/catalog-31-studio-v2-1536.webp`<br>`/media/gallery/locking-pin-gallery-v1-1200.webp`<br>`/media/turning-reading-20261014/turned-features-1200.webp`<br>`/media/evidence/cmm-detail-1600.webp` | C已查；V21 桌面实看抽样；手机实看前部窗口 | P1 |
| `/capabilities/starting-with-a-sample/` | 样件转制造定义 / CAP-S | Hero；Retain/Resolve/Approve+单个 housing AI；sample→reconstruction→approval；已知/未知材料和 replacement 3 行表；4 组批准要求；FAQ；RFQ。 内容检查 / 图片源检查 | 当前：Record the sample and the intended part → From sample to approved drawing → Material & finish decisions → Approve the manufacturing definition → Questions before ordering → Request a sample-to-part review；按蓝图重排 | `/media/capabilities-section-20261014/sample-definition-1200.webp`<br>`/media/product-studio/catalog-23-studio-v2-1536.webp`<br>`/media/services-reading-20261014/casting-stages-1200.webp`<br>`/media/evidence/cmm-detail-1600.webp` | C已查；V22 桌面实看抽样；手机实看前部窗口 | P1 |
| `/factory/` | 供应商/检验证据 / CAP-F | Hero 车间原图；四项锚点；工厂事实+容量/交期 disclosure；3 设备类+fit disclosure；4 检验阶段+methods/acceptance disclosures；reports+ISO+traceability disclosure；4 交付步骤+包装图；RFQ。 内容检查 / 图片源检查 | 当前：Inside our Hangzhou workshop → Equipment for the shape of your part → Checks from the first part to final release → Reports and supplier documents → Ready for the next step → Discuss your part with LZZ；按蓝图重排 | `/media/evidence/workshop-wide-1600.webp`<br>`/media/evidence/workshop-operators-2025-1600.webp`<br>`/media/evidence/milling-enclosure-operation-1600.webp`<br>`/media/evidence/turning-operation-1600.webp`<br>`/media/evidence/five-axis-machine-wide-1600.webp`<br>`/media/evidence/cmm-room-1600.webp`<br>`/media/factory-unified-20261015/inspection-concept-1200.webp`<br>`/media/evidence/shipping-example-1600.webp` | C已查；V23 桌面实看抽样；手机实看前部窗口 | P1 |
| `/privacy/` | 企业/联系 / PRIV | 5节：inquiry、saved drafts、cookies/external services、product/company info、contact。 已审；存储范围措辞需精确；源代码未见analytics/advertising脚本，不外推线上Cookie实测；采用 P。 | 当前：Your inquiry → Saved drafts → Cookies and external services → Product and company information → Contact；按蓝图重排 | 无主内容图片；保持无装饰图 | C已查；V24 桌面实看指定首屏/下表补充；手机实看前部窗口 | P1 |
| `/products/` | 产品任务总览 / PROD-OV | 六形态同权，batch独立采购任务；来源示意不作同批实物 | 当前：Start with the shape of your part → See how the features are machined → Turn an example into a clear machining scope → Have a part to discuss?；按蓝图重排 | `/media/products-editorial-20261014/part-families-1200.webp`<br>`/media/product-studio/catalog-33-studio-v2-1536.webp`<br>`/media/product-studio/catalog-05-studio-v2-1536.webp`<br>`/media/evidence/turn-mill-operation-1600.webp` | C已查；V25 桌面实看抽样；手机实看前部窗口 | P1 |
| `/products/machining-studies/` | 加工问题目录 / PROD-STUDIES | 6工序记录与2集合分开；按加工问题平等列8项 | 当前：A broad panel.A careful support plan. → Explore the workshop part collections → Choose the study that fits your geometry → Have a similar component?；按蓝图重排 | `/media/evidence/display-housing-panel-1600.webp`<br>`/media/collection-covers/plastic-collection-illustrative-v1-1200.webp`<br>`/media/collection-covers/metal-collection-illustrative-v1-1200.webp`<br>`/media/evidence/five-axis-operation-1600.webp`<br>`/media/evidence/turn-mill-operation-1600.webp`<br>`/media/evidence/two-stage-first-1600.webp`<br>`/media/evidence/milling-enclosure-operation-1600.webp`<br>`/media/evidence/multi-feature-milling-operation-1600.webp` | C已查；V26 桌面实看抽样；手机实看前部窗口 | P1 |
| `/products/machining-studies/29-inch-display-housing-cnc-machining/` | 工序研究/材料集合 / STUDY / S5 | 宽面板的支撑/平面度和外观；保留29-inch仅display designation，实际enclosure尺寸/机床行程未知；支撑和测量状态需图纸约定。 | 当前：Plan the panel around its assembly interfaces → Support, machine and inspect the panel → Connect the drawing to the acceptance check → Questions about a similar part → Continue the drawing review → Discuss a similar part；按蓝图重排 | `/media/evidence/display-housing-panel-1600.webp`<br>`/media/cases-reading-20261014/panel-support-1200.webp`<br>`/media/evidence/display-housing-machining-1600.webp`<br>`/media/source-details/display-housing-pair-1200.webp` | C已查；V27 桌面实看抽样；手机实看前部窗口 | P1 |
| `/products/machining-studies/custom-metal-parts-batch-examples/` | 工序研究/材料集合 / STUDY / S7 | 金属车削件、铝壳、黄铜与清洗后形态集合；4组独立来源；cleaning clip仅记录handling/forms，不能声称检验/出货/清洁度已达标。 | 当前：Explore the original metal part families → Plan the route for each part → Connect the drawing to the acceptance check → Questions about a similar part → Continue the drawing review → Discuss a similar part；按蓝图重排 | `/media/collection-covers/metal-collection-illustrative-v1-1200.webp`<br>`/media/source-details/metal-turned-shaft-1200.webp`<br>`/media/source-details/metal-turned-batch-1200.webp`<br>`/media/source-details/metal-aluminum-housings-1200.webp`<br>`/media/source-details/metal-aluminum-close-1200.webp`<br>`/media/source-details/metal-brass-batch-1200.webp` | C已查；V28 桌面实看抽样；手机实看前部窗口 | P2 |
| `/products/machining-studies/custom-plastic-parts-ptfe-pom-pe-acrylic/` | 工序研究/材料集合 / STUDY / S6 | PTFE/POM/PE/acrylic的独立形态档案；按4材料组就近放exact grade状态、用途输入、measurement conditions；来源命名不是已检测牌号。 | 当前：Explore the original part families → Specify the polymer and the conditions of use → Connect the drawing to the acceptance check → Questions about a similar part → Continue the drawing review → Discuss a similar part；按蓝图重排 | `/media/collection-covers/plastic-collection-illustrative-v1-1200.webp`<br>`/media/source-details/plastic-ptfe-batch-1200.webp`<br>`/media/source-details/plastic-ptfe-intermediate-1200.webp`<br>`/media/source-details/plastic-ptfe-shafts-1200.webp`<br>`/media/source-details/plastic-acrylic-batch-1200.webp`<br>`/media/source-details/plastic-acrylic-detail-1200.webp` | C已查；V29 桌面实看抽样；手机实看前部窗口 | P2 |
| `/products/machining-studies/five-axis-machining-multi-face-parts/` | 工序研究/材料集合 / STUDY / S0 | 多面访问与共享基准；保留多面工具可达/共同datum；序列写planning，不能由照片宣称continuous 5-axis或single setup完成。 | 当前：Read the part across its machining faces → Machining sequence & setup → Connect the drawing to the acceptance check → Questions about a similar part → Continue the drawing review → Discuss a similar part；按蓝图重排 | `/media/case-stories-20261014/multi-face-form-1200.webp`<br>`/media/cases-reading-20261014/setup-orientations-1200.webp`<br>`/media/evidence/five-axis-operation-1600.webp`<br>`/media/evidence/five-axis-parts-1600.webp` | C已查；V30 桌面实看抽样；手机实看前部窗口 | P2 |
| `/products/machining-studies/milling-a-pocketed-enclosure-form/` | 工序研究/材料集合 / STUDY / S3 | 圆形口袋/壁厚与装夹；来源带圆形凹腔；通用milling-features是矩形腔块，不能被读为相同零件。 | 当前：Define the pocket together with its interfaces → Machining sequence & setup → Connect the drawing to the acceptance check → Questions about a similar part → Continue the drawing review → Discuss a similar part；按蓝图重排 | `/media/case-stories-20261014/pocket-form-1200.webp`<br>`/media/services-reading-20261014/milling-features-1200.webp`<br>`/media/evidence/milling-enclosure-operation-1600.webp`<br>`/media/evidence/milling-enclosure-parts-1600.webp` | C已查；V31 桌面实看抽样；手机实看前部窗口 | P2 |
| `/products/machining-studies/milling-prismatic-components/` | 工序研究/材料集合 / STUDY / S4 | 棱柱形孔系与安装面关系；保留实际长条块、多孔、口袋及重复形态；batch sampling作为新订单输入。 | 当前：Connect the openings to the mounting faces → Machining sequence & setup → Connect the drawing to the acceptance check → Questions about a similar part → Continue the drawing review → Discuss a similar part；按蓝图重排 | `/media/case-stories-20261014/prismatic-form-1200.webp`<br>`/media/services-reading-20261014/milling-features-1200.webp`<br>`/media/evidence/multi-feature-milling-operation-1600.webp`<br>`/media/evidence/multi-feature-milling-parts-1600.webp` | C已查；V32 桌面实看抽样；手机实看前部窗口 | P2 |
| `/products/machining-studies/turning-then-milling-cylindrical-parts/` | 工序研究/材料集合 / STUDY / S1 | 从车削轴线定位二次铣特征；保留turned datum、axial face、angular orientation；原照不能证明live-tooling，使用subsequent milling。 | 当前：Connect the milled features to the turned geometry → Machining sequence & setup → Connect the drawing to the acceptance check → Questions about a similar part → Continue the drawing review → Discuss a similar part；按蓝图重排 | `/media/case-stories-20261014/turn-mill-form-1200.webp`<br>`/media/case-stories-20261014/turn-mill-datums-1200.webp`<br>`/media/evidence/turn-mill-operation-1600.webp`<br>`/media/evidence/turn-mill-parts-1200.webp` | C已查；V33 桌面实看抽样；手机实看前部窗口 | P2 |
| `/products/machining-studies/two-stage-cnc-milling/` | 工序研究/材料集合 / STUDY / S2 | 两次装夹之间的基准传递；两张原照是核心；源文件夹标同一件两工序，不能从通用方块示意推实际先后加工面或完整刀路。 | 当前：Keep the feature relationships through repositioning → Compare the two holding orientations → Connect the drawing to the acceptance check → Questions about a similar part → Continue the drawing review → Discuss a similar part；按蓝图重排 | `/media/case-stories-20261014/two-setup-form-1200.webp`<br>`/media/cases-reading-20261014/setup-orientations-1200.webp`<br>`/media/evidence/two-stage-first-1600.webp`<br>`/media/evidence/two-stage-second-1600.webp` | C已查；V34 桌面实看抽样；手机实看抽样 | P1 |
| `/products/part-examples/` | 形态搜索列表 / PROD-LIST | 35条与2集合分清；字段状态明确；组合筛选/空结果/返回保留 | 当前：Reference galleries → Covered parts & gear forms → From the part formto the machining setup → Your drawing is the starting point；按蓝图重排 | `/media/product-studio/catalog-00-studio-v2-1536.webp`<br>`/media/product-studio/catalog-01-studio-v2-1536.webp`<br>`/media/gallery/impeller-gallery-v1-1200.webp`<br>`/media/product-studio/catalog-03-studio-v2-1536.webp`<br>`/media/product-studio/catalog-04-studio-v2-1536.webp`<br>`/media/product-studio/catalog-05-studio-v2-1536.webp`<br>`/media/product-studio/catalog-06-studio-v2-1536.webp`<br>`/media/gallery/fittings-gallery-v2-1200.webp`<br>`/media/product-studio/catalog-08-studio-v2-1536.webp`<br>`/media/product-studio/catalog-09-studio-v2-1536.webp`<br>`/media/product-studio/catalog-10-studio-v2-1536.webp`<br>`/media/product-studio/catalog-11-studio-v2-1536.webp`<br>`/media/product-studio/catalog-12-studio-v2-1536.webp`<br>`/media/product-studio/catalog-13-studio-v2-1536.webp`<br>`/media/product-studio/catalog-14-studio-v2-1536.webp`<br>`/media/product-studio/catalog-15-studio-v2-1536.webp`<br>`/media/product-studio/catalog-16-studio-v2-1536.webp`<br>`/media/product-studio/catalog-17-studio-v2-1536.webp`<br>`/media/product-studio/catalog-18-studio-v2-1536.webp`<br>`/media/product-studio/catalog-19-studio-v2-1536.webp`<br>`/media/product-studio/catalog-20-studio-v2-1536.webp`<br>`/media/product-studio/catalog-21-studio-v2-1536.webp`<br>`/media/gallery/casting-gallery-v1-1200.webp`<br>`/media/product-studio/catalog-23-studio-v2-1536.webp`<br>`/media/product-studio/catalog-24-studio-v2-1536.webp`<br>`/media/product-studio/catalog-25-studio-v2-1536.webp`<br>`/media/gallery/plastic-gallery-v1-1200.webp`<br>`/media/gallery/brass-gallery-v2-1200.webp`<br>`/media/product-studio/catalog-28-studio-v2-1536.webp`<br>`/media/products-editorial-20261014/polymer-support-block-1200.webp`<br>`/media/product-studio/catalog-30-studio-v2-1536.webp`<br>`/media/product-studio/catalog-31-studio-v2-1536.webp`<br>`/media/gallery/locking-pin-gallery-v1-1200.webp`<br>`/media/product-studio/catalog-33-studio-v2-1536.webp`<br>`/media/product-studio/catalog-34-studio-v2-1536.webp`<br>`/media/source-details/covered-wheels-1200.webp`<br>`/media/source-details/gear-bevel-examples-1200.webp`<br>`/media/source-details/covered-rollers-1200.webp`<br>`/media/source-details/covered-shaped-parts-1200.webp`<br>`/media/source-details/gear-cylindrical-examples-1200.webp`<br>`/media/evidence/five-axis-operation-1600.webp` | C已查；V35 桌面实看抽样；手机实看抽样 | P1 |
| `/products/part-examples/custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier/` | 中冷器原型的零件与焊接总成范围 / PART / P12 | 保留6061/3003按组件确认、CNC+TIG、客户供芯体、焊后接口验收；散热表现需另测试。 | 当前：Material, machining & finish → Separate the component and assembly scope → Drawing & acceptance requirements → Reference images → Related machining → Related part requirements → Before you order → Discuss this part；按蓝图重排 | `/media/product-studio/catalog-12-studio-v2-1536.webp`<br>`/media/Custom-Automotive-Performance-Parts-Manufacturer-and-Aluminum-Intercooler-Prototype-Supplier-1764817974310--6b57c81038.webp`<br>`/media/source-details/intercooler-original-1200.webp`<br>`/media/source-details/intercooler-batch-detail-1200.webp`<br>`/media/product-studio/catalog-17-studio-v2-1536.webp`<br>`/media/product-studio/catalog-14-studio-v2-1536.webp` | C已查；V36 桌面实看抽样；手机实看抽样 | P1 |
| `/products/part-examples/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/` | 发动机外盖外形与安装条件 / PART / P13 | 保留6061-T6、7075备选、内侧净空、密封/固定界面与刀纹外观分开验收。 | 当前：Material, machining & finish → Clearance, sealing and visible finish → Drawing & acceptance requirements → Reference images → Related machining → Related part requirements → Before you order → Discuss this part；按蓝图重排 | `/media/product-studio/catalog-13-studio-v2-1536.webp`<br>`/media/Custom-Billet-Aluminum-Engine-Cover-Manufacturer-and-Automotive-Prototype-Supplier-1764818167263--638b45f01e.webp`<br>`/media/source-details/engine-cover-original-1200.webp`<br>`/media/product-studio/catalog-09-studio-v2-1536.webp`<br>`/media/product-studio/catalog-33-studio-v2-1536.webp` | C已查；V37 桌面实看抽样；手机实看抽样 | P1 |
| `/products/part-examples/custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier/` | 喷油器与燃油轨界面歧管 / PART / P16 | 区别P14：按runner/port、injector axis、fuel-rail mount三栏；保留6061-T6与STEP/IGES及净空条件。 | 当前：Material, machining & finish → Runner geometry and injector interfaces → Drawing & acceptance requirements → Reference images → Related machining → Related part requirements → Before you order → Discuss this part；按蓝图重排 | `/media/product-studio/catalog-16-studio-v2-1536.webp`<br>`/media/Custom-Billet-Aluminum-Intake-Manifold-Manufacturer-and-Automotive-Prototype-Supplier-1764819347681--17eb362db7.webp`<br>`/media/source-details/intake-runner-cad-1200.webp`<br>`/media/product-studio/catalog-14-studio-v2-1536.webp`<br>`/media/product-studio/catalog-17-studio-v2-1536.webp` | C：源码/内容/图片引用已查；V：未逐页看，版式仅共享组件推导 | P1 |
| `/products/part-examples/custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier/` | Plenum内腔与分体密封参考 / PART / P17 | 保留6061-T6、内腔、throttle flange、分体线/紧固可达、压力条件；三张细节不宣称为同一已交付件。 | 当前：Material, machining & finish → Internal cavities, ports and mating faces → Drawing & acceptance requirements → Reference images → Related machining → Related part requirements → Before you order → Discuss this part；按蓝图重排 | `/media/product-studio/catalog-17-studio-v2-1536.webp`<br>`/media/Custom-Billet-Aluminum-Intake-Plenum-Manufacturer-and-High-Performance-Tuning-Parts-Supplier-1764819540953--d22e858992.webp`<br>`/media/source-details/plenum-original-1200.webp`<br>`/media/source-details/plenum-port-detail-1200.webp`<br>`/media/source-details/plenum-internal-detail-1200.webp`<br>`/media/product-studio/catalog-14-studio-v2-1536.webp`<br>`/media/product-studio/catalog-16-studio-v2-1536.webp` | C已查；V38 桌面实看抽样；手机实看抽样 | P1 |
| `/products/part-examples/custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier/` | 进气系统装配语境与歧管需求 / PART / P14 | 本页明确来源只有整机/系统语境；Runner、flange与安装空间用需求卡解释，保留STEP/IGES、6061-T6为列示条件。 | 当前：Material, machining & finish → Runners, flanges and installation clearance → Drawing & acceptance requirements → Reference images → Related machining → Related part requirements → Before you order → Discuss this part；按蓝图重排 | `/media/product-studio/catalog-14-studio-v2-1536.webp`<br>`/media/Custom-Billet-Intake-Manifold-Manufacturer-and-Automotive-Performance-Prototype-Supplier-1764818472101--8eac77ab3f.webp`<br>`/media/product-studio/catalog-16-studio-v2-1536.webp`<br>`/media/product-studio/catalog-17-studio-v2-1536.webp` | C：源码/内容/图片引用已查；V：未逐页看，版式仅共享组件推导 | P0 |
| `/products/part-examples/custom-cnc-machined-castings-transmission-housings-pump-bodies/` | 毛坯供货与传动/泵壳二次加工 / PART / P18 | 把blank责任置材料之后；区分铸面、机加工面、余量、样件重建、基准及来料验收。 | 当前：Material, machining & finish → Bearing and sealing interfaces → Incoming blank and machining allowance → Drawing & acceptance requirements → Reference images → Related machining → Related part requirements → Before you order → Discuss this part；按蓝图重排 | `/media/product-studio/catalog-18-studio-v2-1536.webp`<br>`/media/Custom-CNC-Machined-Castings-Transmission-Housings---Pump-Bodies-1764757074510--2cf2756006.webp`<br>`/media/gallery/casting-gallery-v1-1200.webp`<br>`/media/product-studio/catalog-23-studio-v2-1536.webp` | C：源码/内容/图片引用已查；V：未逐页看，版式仅共享组件推导 | P1 |
| `/products/part-examples/custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier/` | 节气门壳体与执行器的供货边界 / PART / P15 | 保留6061-T6、主孔/轴孔关系与电机包络；首段写明housing/assembly需确认，控制性能、泄漏/动作另验。 | 当前：Material, machining & finish → Housing fits and the supplied actuator scope → Drawing & acceptance requirements → Reference images → Related machining → Related part requirements → Before you order → Discuss this part；按蓝图重排 | `/media/product-studio/catalog-15-studio-v2-1536.webp`<br>`/media/Custom-CNC-Machined-Electronic-Throttle-Body-Manufacturer-and-Automotive-Prototype-Supplier-1764818699747--08c3a85146.webp`<br>`/media/product-studio/catalog-17-studio-v2-1536.webp`<br>`/media/product-studio/catalog-16-studio-v2-1536.webp` | C已查；V39 桌面实看抽样；手机实看抽样 | P0 |
| `/products/part-examples/custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier/` | 不锈钢法兰与有孔车削组件 / PART / P19 | 将残留shaft/valve stem/locking mechanism语句迁至P32/车削能力；本页按法兰面、同轴孔、紧固件与方向标记组织。 | 当前：Material, machining & finish → Working diameters and surface condition → Drawing & acceptance requirements → Reference images → Related machining → Related part requirements → Before you order → Discuss this part；按蓝图重排 | `/media/product-studio/catalog-19-studio-v2-1536.webp`<br>`/media/Custom-CNC-Turned-Stainless-Steel-Components-Manufacturer-and-Precision-Shaft-Supplier-1764816944325--cacdc81da0.webp`<br>`/media/gallery/locking-pin-gallery-v1-1200.webp`<br>`/media/product-studio/catalog-31-studio-v2-1536.webp` | C已查；V40 桌面实看抽样；手机实看抽样 | P0 |
| `/products/part-examples/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/` | 圆形多孔铣件形态参考 / PART / P00 | 用中心孔、台阶孔、圆周孔与端面基准解释本页；合并重复的 bore/pocket 文案，额外口袋只作订单输入，不说来源已显示。 | 当前：Material, machining & finish → Bores and faces from one datum scheme → Drawing & acceptance requirements → Reference images → Related machining → Related part requirements → Before you order → Discuss this part；按蓝图重排 | `/media/product-studio/catalog-00-studio-v2-1536.webp`<br>`/media/CNC-Milling-Service-1-1764417292122--54b8b81a8c.webp`<br>`/media/product-studio/catalog-01-studio-v2-1536.webp`<br>`/media/product-studio/catalog-04-studio-v2-1536.webp` | C：源码/内容/图片引用已查；V：未逐页看，版式仅共享组件推导 | P1 |
| `/products/part-examples/custom-high-precision-machining-for-structural-aesthetic-components-oem/` | 结构接口与外观要求参考 / PART / P09 | 保留承载接口与外观分开验收、雕刻图稿与色板；UAV/3D printer是需求语境，不作使用案例。 | 当前：Material, machining & finish → Assembly fit and visible surfaces → Drawing & acceptance requirements → Reference images → Related machining → Related part requirements → Before you order → Discuss this part；按蓝图重排 | `/media/product-studio/catalog-09-studio-v2-1536.webp`<br>`/media/Custom-High-Precision-Machining-for-Structural---Aesthetic-Components-OEM-1764555402077--60c319adfb.webp`<br>`/media/product-studio/catalog-08-studio-v2-1536.webp`<br>`/media/product-studio/catalog-13-studio-v2-1536.webp` | C：源码/内容/图片引用已查；V：未逐页看，版式仅共享组件推导 | P2 |
| `/products/part-examples/custom-oem-cnc-machined-non-metallic-components-insulating-parts/` | 非金属圆形隔离/耐磨形态参考 / PART / P20 | 材质保留polymers/composites待定；按槽/孔/凸部与装配条件组织，电性能需独立规格与记录。 | 当前：Material and measurement conditions → Material conditions and assembly loads → Drawing & acceptance requirements → Reference images → Related machining → Related part requirements → Before you order → Discuss this part；按蓝图重排 | `/media/product-studio/catalog-20-studio-v2-1536.webp`<br>`/media/Custom-OEM-CNC-Machined-Non-Metallic-Components-Insulating-Parts-1764557225251--5ba2c574ee.webp`<br>`/media/products-editorial-20261014/polymer-support-block-1200.webp`<br>`/media/product-studio/catalog-21-studio-v2-1536.webp` | C：源码/内容/图片引用已查；V：未逐页看，版式仅共享组件推导 | P2 |
| `/products/part-examples/custom-oem-cnc-machined-plastic-parts-manufacturer/` | 通用工程塑料形态集合 / PART / P21 | 完整保留PEEK/PTFE/polyimide/nylon/acetal/Delrin/HDPE/UHMW/acrylic/polycarbonate为选项；按功能选择，不把橙黄色当材料牌号。 | 当前：Material and measurement conditions → Select the polymer before the machining route → Drawing & acceptance requirements → Reference images → Related machining → Related part requirements → Before you order → Discuss this part；按蓝图重排 | `/media/product-studio/catalog-21-studio-v2-1536.webp`<br>`/media/Plastic-Parts-1764418490181--3049ef7c93.webp`<br>`/media/product-studio/catalog-20-studio-v2-1536.webp`<br>`/media/gallery/plastic-gallery-v1-1200.webp` | C：源码/内容/图片引用已查；V：未逐页看，版式仅共享组件推导 | P2 |
| `/products/part-examples/custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer/` | 连接接口参考集合 / PART / P07 | 线程标准NPT、BSPT、metric分别说明，保留密封形式、配对件和压力/泄漏另定条件。 | 当前：Material, machining & finish → Define the complete mating connection → Drawing & acceptance requirements → Reference images → Related machining → Related part requirements → Before you order → Discuss this part；按蓝图重排 | `/media/gallery/fittings-gallery-v2-1200.webp`<br>`/media/Turning-3-1764418610761--08a5f82825.webp`<br>`/media/gallery/brass-gallery-v2-1200.webp`<br>`/media/product-studio/catalog-31-studio-v2-1536.webp` | C：源码/内容/图片引用已查；V：未逐页看，版式仅共享组件推导 | P2 |
| `/products/part-examples/custom-oem-cnc-turning-manufacturer/` | 车削轴套与法兰的通用能力参考 / PART / P05 | 保留直径、肩部、轴向定位、后续横孔；将材料选项和具体照片材质分开。 | 当前：Material, machining & finish → Diameters, shoulders and secondary operations → Drawing & acceptance requirements → Reference images → Related machining → Related part requirements → Before you order → Discuss this part；按蓝图重排 | `/media/product-studio/catalog-05-studio-v2-1536.webp`<br>`/media/Turning-1764418561811--0fef80039e.webp`<br>`/media/product-studio/catalog-06-studio-v2-1536.webp`<br>`/media/gallery/fittings-gallery-v2-1200.webp` | C：源码/内容/图片引用已查；V：未逐页看，版式仅共享组件推导 | P2 |
| `/products/part-examples/custom-oem-high-precision-cnc-milling-manufacturer/` | 仪器块与支架参考集合 / PART / P01 | 保留安装面、交叉内孔、去毛刺/清洁输入；把科学仪器放为应用条件，不能从两件展示推为某仪器现货。 | 当前：Material, machining & finish → Start with the mounting interfaces → Drawing & acceptance requirements → Reference images → Related machining → Related part requirements → Before you order → Discuss this part；按蓝图重排 | `/media/product-studio/catalog-01-studio-v2-1536.webp`<br>`/media/CNC-Milling-Service-2-1764417849930--28b1b081fe.webp`<br>`/media/product-studio/catalog-00-studio-v2-1536.webp`<br>`/media/product-studio/catalog-04-studio-v2-1536.webp` | C：源码/内容/图片引用已查；V：未逐页看，版式仅共享组件推导 | P2 |
| `/products/part-examples/custom-rotary-cylindrical-components/` | 旋转件的非同轴特征参考 / PART / P06 | 聚焦槽、横孔、角向定位，避免与P05重复讲一般车削；原图并非只有三件旋转件。 | 当前：Material, machining & finish → Keep the axis and off-axis features connected → Drawing & acceptance requirements → Reference images → Related machining → Related part requirements → Before you order → Discuss this part；按蓝图重排 | `/media/product-studio/catalog-06-studio-v2-1536.webp`<br>`/media/Turning-2-1764418599598--a725a21893.webp`<br>`/media/product-studio/catalog-05-studio-v2-1536.webp`<br>`/media/product-studio/catalog-03-studio-v2-1536.webp` | C：源码/内容/图片引用已查；V：未逐页看，版式仅共享组件推导 | P2 |
| `/products/part-examples/full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing/` | 有表面处理的支架与壳体集合 / PART / P08 | 以功能尺寸/可视面/遮蔽区三类信息组织；长处理清单按基材配对，迁移通用说明至finish guide。 | 当前：Material, machining & finish → Functional faces and the finished appearance → Drawing & acceptance requirements → Reference images → Related machining → Related part requirements → Before you order → Discuss this part；按蓝图重排 | `/media/product-studio/catalog-08-studio-v2-1536.webp`<br>`/media/Full-Service-CNC-Milling-Solutions-Custom-Metal-Parts-Manufacturer-with-Finishing-1764554912970--2f27187334.webp`<br>`/media/product-studio/catalog-09-studio-v2-1536.webp`<br>`/media/product-studio/catalog-33-studio-v2-1536.webp` | C：源码/内容/图片引用已查；V：未逐页看，版式仅共享组件推导 | P2 |
| `/products/part-examples/global-manufacturer-of-multi-sided-precision-machined-components/` | 跨多面端口和孔系参考 / PART / P04 | 以共享基准、端口标准、安装孔位为独有内容；单次装夹不是由本图证实的结果。 | 当前：Material, machining & finish → Connect the ports across different faces → Drawing & acceptance requirements → Reference images → Related machining → Related part requirements → Before you order → Discuss this part；按蓝图重排 | `/media/product-studio/catalog-04-studio-v2-1536.webp`<br>`/media/5-axis-Machining-3-1764418541931--3aeb6953e6.webp`<br>`/media/product-studio/catalog-01-studio-v2-1536.webp`<br>`/media/product-studio/catalog-03-studio-v2-1536.webp` | C已查；V41 桌面实看抽样；手机实看抽样 | P1 |
| `/products/part-examples/global-oem-precision-machining-solutions/` | 带角度的车铣件参考 / PART / P03 | 短标题聚焦轴线与倾斜接口；从housings/blocks收录迁到shafts（含fittings）家族，ring housings只保留在相关形态，避免一件锥体承担多个家族。 | 当前：Material, machining & finish → Relate the angled features to the turned axis → Drawing & acceptance requirements → Reference images → Related machining → Related part requirements → Before you order → Discuss this part；按蓝图重排 | `/media/product-studio/catalog-03-studio-v2-1536.webp`<br>`/media/5-axis-Machining-2-1764418526610--635f52f78c.webp`<br>`/media/product-studio/catalog-06-studio-v2-1536.webp`<br>`/media/product-studio/catalog-04-studio-v2-1536.webp` | C：源码/内容/图片引用已查；V：未逐页看，版式仅共享组件推导 | P2 |
| `/products/part-examples/high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem/` | 流体曲面件与功能验证分工 / PART / P11 | 区别P02：本页聚焦流体接口、轮廓验收与功能验证责任；无效率/可靠性数值。 | 当前：Material, machining & finish → Flow surfaces and mounting geometry → Drawing & acceptance requirements → Reference images → Related machining → Related part requirements → Before you order → Discuss this part；按蓝图重排 | `/media/product-studio/catalog-11-studio-v2-1536.webp`<br>`/media/High-Reliability-Precision-Machining-Turbine--Fluid---Complex-Curve-Component-OEM-1764555925002--928a6e0ea7.webp`<br>`/media/gallery/impeller-gallery-v1-1200.webp`<br>`/media/product-studio/catalog-04-studio-v2-1536.webp` | C：源码/内容/图片引用已查；V：未逐页看，版式仅共享组件推导 | P2 |
| `/products/part-examples/high-volume-cnc-turning-for-complex-internal-external-features/` | 带内部台阶/沟槽的重复车削任务 / PART / P10 | 突出剖面、量具可达性、首件与抽样计划；high-volume只作为询量语境，不继承产能或一致性结果。 | 当前：Material, machining & finish → Internal bores and external working features → Drawing & acceptance requirements → Reference images → Related machining → Related part requirements → Before you order → Discuss this part；按蓝图重排 | `/media/product-studio/catalog-10-studio-v2-1536.webp`<br>`/media/High-Volume-CNC-Turning-for-Complex-Internal---External-Features-1764555543979--ac36118db2.webp`<br>`/media/product-studio/catalog-05-studio-v2-1536.webp`<br>`/media/gallery/fittings-gallery-v2-1200.webp` | C：源码/内容/图片引用已查；V：未逐页看，版式仅共享组件推导 | P2 |
| `/products/part-examples/oem-precision-cnc-machined-casting-housing-structural-enclosures/` | 深腔与筋结构铸壳 / PART / P22 | 以定位支撑、轴承孔、保留铸面三点与P18区分；CMM是需约定记录，不是已有测量。 | 当前：Material, machining & finish → Ribs, cavities and fixture support → Fixture access around ribs and cavities → Drawing & acceptance requirements → Reference images → Related machining → Related part requirements → Before you order → Discuss this part；按蓝图重排 | `/media/gallery/casting-gallery-v1-1200.webp`<br>`/media/OEM-Precision-CNC-Machined-Casting-Housing---Structural-Enclosures-1764756565591--89bc1a30be.webp`<br>`/media/product-studio/catalog-18-studio-v2-1536.webp`<br>`/media/product-studio/catalog-24-studio-v2-1536.webp` | C已查；V42 桌面实看抽样；手机实看抽样 | P2 |
| `/products/part-examples/oem-precision-cnc-machined-casting-housings/` | 带接口的圆形铸壳与样件定义 / PART / P23 | 保留原件轮廓；把内部花键、泵/传动用途改为仅在图纸明确时讨论，重建步骤前置。 | 当前：Material, machining & finish → Bores and faces from the controlled model → Define bore and spline geometry from a sample → Drawing & acceptance requirements → Reference images → Related machining → Related part requirements → Before you order → Discuss this part；按蓝图重排 | `/media/product-studio/catalog-23-studio-v2-1536.webp`<br>`/media/OEM-Precision-CNC-Machined-Casting-Housings-1764756827055--12d46fe8bb.webp`<br>`/media/product-studio/catalog-18-studio-v2-1536.webp`<br>`/media/gallery/casting-gallery-v1-1200.webp` | C：源码/内容/图片引用已查；V：未逐页看，版式仅共享组件推导 | P1 |
| `/products/part-examples/precision-cnc-machined-castings-custom-oem-housings/` | 不规则铸壳的密封面与配合孔 / PART / P24 | 以seal face、bearing fits、tapped mounting为独有；谁供毛坯在采购条件显式展示。 | 当前：Material, machining & finish → Seal faces, fits and mounting holes → Sealing faces, fits and mounting holes → Drawing & acceptance requirements → Reference images → Related machining → Related part requirements → Before you order → Discuss this part；按蓝图重排 | `/media/product-studio/catalog-24-studio-v2-1536.webp`<br>`/media/Precision-CNC-Machined-Castings---Custom-OEM-Housings-1764756207527--bd238e3ac3.webp`<br>`/media/gallery/casting-gallery-v1-1200.webp`<br>`/media/product-studio/catalog-25-studio-v2-1536.webp` | C：源码/内容/图片引用已查；V：未逐页看，版式仅共享组件推导 | P2 |
| `/products/part-examples/precision-cnc-machined-castings-manufacturer/` | 隐藏内接口与测量可达的铸壳 / PART / P25 | 用剖面/内部接口、法兰基准、来料记录与P24区分；reverse engineering是服务条件。 | 当前：Material, machining & finish → Hidden interfaces and inspection access → Hidden interfaces and measurement access → Drawing & acceptance requirements → Reference images → Related machining → Related part requirements → Before you order → Discuss this part；按蓝图重排 | `/media/product-studio/catalog-25-studio-v2-1536.webp`<br>`/media/Precision-CNC-Machined-Castings-Manufacturer-1764757607644--746269a403.webp`<br>`/media/product-studio/catalog-18-studio-v2-1536.webp`<br>`/media/product-studio/catalog-24-studio-v2-1536.webp` | C：源码/内容/图片引用已查；V：未逐页看，版式仅共享组件推导 | P2 |
| `/products/part-examples/precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances/` | 重复孔系的复杂塑料形态 / PART / P26 | 来源可见是长条重复孔，不把薄壁/深袋称已观察事实；这些留为订单设计限制，测量状态显式。 | 当前：Material and measurement conditions → Thin sections and critical mating features → Drawing & acceptance requirements → Reference images → Related machining → Related part requirements → Before you order → Discuss this part；按蓝图重排 | `/media/gallery/plastic-gallery-v1-1200.webp`<br>`/media/Precision-CNC-Machining-for-Complex-Plastic-Geometries-and-Tight-Tolerances-1764558015887--2ed6fe3732.webp`<br>`/media/products-editorial-20261014/polymer-support-block-1200.webp`<br>`/media/product-studio/catalog-21-studio-v2-1536.webp` | C已查；V43 桌面实看抽样；手机实看抽样 | P2 |
| `/products/part-examples/precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier/` | 黄铜/铜接口件与镀后尺寸 / PART / P27 | 保留C36000、tellurium copper为可选项；区分接触/导热/密封功能与镀后验收，不能将照片判为该合金。 | 当前：Material, machining & finish → Contact, sealing and plated interfaces → Drawing & acceptance requirements → Reference images → Related machining → Related part requirements → Before you order → Discuss this part；按蓝图重排 | `/media/gallery/brass-gallery-v2-1200.webp`<br>`/media/Precision-CNC-Turned-Brass-Components-Manufacturer-and-Copper-Parts-Supplier-1764759544533--731dc8eed7.webp`<br>`/media/gallery/fittings-gallery-v2-1200.webp`<br>`/media/product-studio/catalog-06-studio-v2-1536.webp` | C已查；V44 桌面实看抽样；手机实看抽样 | P2 |
| `/products/part-examples/precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier/` | 试制壳体批次与按件号验收 / PART / P28 | 先显示零件号/版本/首批数量/共享接口清单；不要从两件生成图推断真实配对壳盖。 | 当前：Specify material and finish per part → Keep each part number under control → Drawing & acceptance requirements → Reference images → Related machining → Related part requirements → Before you order → Discuss this part；按蓝图重排 | `/media/product-studio/catalog-28-studio-v2-1536.webp`<br>`/media/products-editorial-20261014/mixed-part-planning-1200.webp`<br>`/media/Precision-Low-Volume-CNC-Machining-Manufacturer-and-HMLV-Components-Supplier-1764758900962--0c522f190d.webp`<br>`/media/product-studio/catalog-34-studio-v2-1536.webp`<br>`/media/product-studio/catalog-30-studio-v2-1536.webp` | C：源码/内容/图片引用已查；V：未逐页看，版式仅共享组件推导 | P1 |
| `/products/part-examples/precision-machining-for-functional-plastic-blocks-structural-components/` | 圆形塑料结构形态参考 / PART / P29 | 保留原来源圆形件；本页按孔/工作边缘/厚度和材料条件组织，矩形block及inserts通用信息迁塑料能力页。 | 当前：Material and measurement conditions → Working faces, inserts and loading points → Drawing & acceptance requirements → Reference images → Related machining → Related part requirements → Before you order → Discuss this part；按蓝图重排 | `/media/products-editorial-20261014/polymer-support-block-1200.webp`<br>`/media/Precision-Machining-for-Functional-Plastic-Blocks---Structural-Components-1764557850986--18253f13c7.webp`<br>`/media/gallery/plastic-gallery-v1-1200.webp`<br>`/media/product-studio/catalog-20-studio-v2-1536.webp` | C已查；V45 桌面实看抽样；手机实看抽样 | P0 |
| `/products/part-examples/precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures/` | 有开口和侧孔的铝壳参考 / PART / P30 | 原组图支撑重复加工和开口位置；angled/compound-angle降为客户可提出的条件，标题先以open aluminum housings表达。 | 当前：Material, machining & finish → Angled faces and repeated thin-wall setups → Drawing & acceptance requirements → Reference images → Related machining → Related part requirements → Before you order → Discuss this part；按蓝图重排 | `/media/product-studio/catalog-30-studio-v2-1536.webp`<br>`/media/Precision-Small-Batch-CNC-Milling-Manufacturer-for-Complex-Aluminum-Enclosures-1764759147466--836aea071b.webp`<br>`/media/product-studio/catalog-33-studio-v2-1536.webp`<br>`/media/product-studio/catalog-24-studio-v2-1536.webp` | C：源码/内容/图片引用已查；V：未逐页看，版式仅共享组件推导 | P1 |
| `/products/part-examples/precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier/` | 不锈钢回转组件的牌号与处理 / PART / P31 | 保留303/304/316L/17-4PH为备选，保留不是每件316L条件；来源实际带侧向外形与法兰，勿仅写细长shaft。 | 当前：Material, machining & finish → Specify grade, fitted size and final treatment → Drawing & acceptance requirements → Reference images → Related machining → Related part requirements → Before you order → Discuss this part；按蓝图重排 | `/media/product-studio/catalog-31-studio-v2-1536.webp`<br>`/media/Precision-Stainless-Steel-CNC-Turned-Parts-Manufacturer-and-316L-Components-Supplier-1764815807487--200e743e3f.webp`<br>`/media/product-studio/catalog-19-studio-v2-1536.webp`<br>`/media/gallery/locking-pin-gallery-v1-1200.webp` | C：源码/内容/图片引用已查；V：未逐页看，版式仅共享组件推导 | P0 |
| `/products/part-examples/precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier/` | 定位销/锁销组件的啮合与供货范围 / PART / P32 | 先说明pin/component或spring-loaded assembly需确认；旅行/啮合、安装螺纹、spring/force/cycle各有验收输入。 | 当前：Material, machining & finish → Engagement, mounting and assembly responsibility → Drawing & acceptance requirements → Reference images → Related machining → Related part requirements → Before you order → Discuss this part；按蓝图重排 | `/media/gallery/locking-pin-gallery-v1-1200.webp`<br>`/media/Precision-Stainless-Steel-Indexing-Plunger-Manufacturer-and-Spring-Loaded-Locking-Pin-Supplier-1764817299753--5e240a8195.webp`<br>`/media/product-studio/catalog-19-studio-v2-1536.webp`<br>`/media/product-studio/catalog-31-studio-v2-1536.webp` | C：源码/内容/图片引用已查；V：未逐页看，版式仅共享组件推导 | P1 |
| `/products/part-examples/small-batch-cnc-machining-manufacturer-complex-aluminum-housings/` | 盖板/密封垫界面的铝壳批次 / PART / P33 | 以closure interface、cosmetic masking、批次验收为独有；任何IP/环境结果须另测。 | 当前：Material, machining & finish → The lid, gasket and mounting interfaces → Drawing & acceptance requirements → Reference images → Related machining → Related part requirements → Before you order → Discuss this part；按蓝图重排 | `/media/product-studio/catalog-33-studio-v2-1536.webp`<br>`/media/Small-Batch-CNC-Machining-Manufacturer-Complex-Aluminum-Housings-1764758302026--a5c49734de.webp`<br>`/media/product-studio/catalog-30-studio-v2-1536.webp`<br>`/media/product-studio/catalog-08-studio-v2-1536.webp` | C已查；V46 桌面实看抽样；手机实看抽样 | P2 |
| `/products/part-examples/small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv/` | 按件号/材料管理的试制批次 / PART / P34 | 保留6061/7075、304/316、brass、engineering plastics是选项；照片只示同类车削件，混材与配套关系由BOM定义。 | 当前：Specify material and finish per part → Material and release requirements per component → Drawing & acceptance requirements → Reference images → Related machining → Related part requirements → Before you order → Discuss this part；按蓝图重排 | `/media/product-studio/catalog-34-studio-v2-1536.webp`<br>`/media/products-editorial-20261014/mixed-part-planning-1200.webp`<br>`/media/Small-Batch-CNC-Machining-Manufacturer-Precision-Aluminum-Components--HMLV--1764758090931--2d5650d334.webp`<br>`/media/product-studio/catalog-28-studio-v2-1536.webp`<br>`/media/product-studio/catalog-33-studio-v2-1536.webp` | C：源码/内容/图片引用已查；V：未逐页看，版式仅共享组件推导 | P1 |
| `/products/part-examples/ultra-high-precision-machining-services/` | 叶轮加工能力与叶形要求 / PART / P02 | 保留控制模型、叶根、轴孔与5-axis适用条件；数值公差未给，平衡/转子验证需另定。 | 当前：Material, machining & finish → Blade profiles, roots and the hub bore → Drawing & acceptance requirements → Reference images → Related machining → Related part requirements → Before you order → Discuss this part；按蓝图重排 | `/media/gallery/impeller-gallery-v1-1200.webp`<br>`/media/product-reading-20261014/impeller-geometry-1200.webp`<br>`/media/5-axis-Machining-1-1764418510957--4b51164023.webp`<br>`/media/product-studio/catalog-11-studio-v2-1536.webp`<br>`/media/product-studio/catalog-00-studio-v2-1536.webp` | C已查；V47 桌面实看抽样；手机实看抽样 | P2 |
| `/quote/` | 企业/联系 / Q | 身份/联系、可选part/service、message，校验，session draft，ready/review/copy/save/mailto。 已审；五字段保留，补就近信息提示及发送边界；采用 Q。 | 当前：Your inquiry；按蓝图重排 | 无主内容图片；保持无装饰图 | C已查；V48 桌面实看指定首屏/下表补充；手机实看指定窗口 | P1 |
| `/resources/` | 采购/技术资料 / R1 | title，RFQ捷径，Ordering/Machining两组8指南（RFQ单列），2份blank worksheet，FAQ入口，草稿尾部。 已审；不恢复旧概念图，采用 R1。 | 当前：Ready to request a quote? → Ordering guide → Machining guides → Keep a copy with your order → Need a quick answer? → Have a part to discuss?；按蓝图重排 | 无主内容图片；保持无装饰图 | C已查；V49 桌面实看抽样；手机实看抽样 | P1 |
| `/resources/drawings-and-ordering/compare-cnc-machining-quotations/` | 采购/技术资料 / G2 | 同规格基线、8项comparison矩阵、exception处理、accepted quote记录、2相关指南＋RFQ。 已审；作为比价工具保持正文清晰，采用 G2。 | 当前：Send each supplier the same requirements → Compare what the price includes → Resolve exceptions before awarding the order → Keep the agreed scope with the order → Related guides → Discuss the scope of your quote；按蓝图重排 | 无主内容图片；保持无装饰图 | C已查；V50 桌面实看抽样；手机实看抽样 | P1 |
| `/resources/drawings-and-ordering/critical-features-cnc-drawing/` | 采购/技术资料 / G3 | 功能与责任工程师、6类feature矩阵、实拍study语境、发布文件；合并旧part requirements内容。 已审；保留标准/版本、before/after finish、traceability/end use/export、geometry/process条件，采用 G3。 | 当前：Connect each requirement to the part function → Make the requirement measurable → See the questions in a machining study → Resolve file conflicts before release → Related guides → Review your drawing requirements；按蓝图重排 | `/media/evidence/multi-feature-milling-parts-1600.webp` | C已查；V51 桌面实看抽样；手机实看抽样 | P1 |
| `/resources/drawings-and-ordering/machined-prototype-approval-checklist/` | 采购/技术资料 / G4 | evaluation purpose/负责人，7项样件检查表，3种批准决定与审批人，独立batch release。 已审；强项是样件≠批次批准，不添加虚构报告；采用 G4。 | 当前：Agree the evaluation before making the sample → Check the sample and its records together → Write down exactly what has been approved → Release the batch as a separate decision → Related guides → Plan your sample and next batch；按蓝图重排 | 无主内容图片；保持无装饰图 | C已查；V52 桌面实看抽样；手机实看抽样 | P1 |
| `/resources/faq/` | 采购/技术资料 / R4 | Quotes & ordering 8答、Processes 3答、Inspection & delivery 4答，共15答；分组锚点＋逐答关联入口。 已审；保留全部条件，ISO入口应直接定位当前ISO块；采用 R4。 | 当前：Quotes & ordering → Processes & specifications → Inspection & delivery → Have a question about your part?；按蓝图重排 | 无主内容图片；保持无装饰图 | C已查；V53 桌面实看抽样；手机实看抽样 | P1 |
| `/resources/ordering-guide/` | 采购/技术资料 / R2 | 4阶段，5篇ordering指南；2份下载；How we work/技术目录出口。 已审；作为决定目录，采用 R2；保留阶段导航为该目录例外。 | 当前：Prepare the quote request → Compare the quoted work → Approve the sample and batch → Plan packing and delivery → Put your requirements in one request；按蓝图重排 | 无主内容图片；保持无装饰图 | C已查；V54 桌面实看抽样；手机实看抽样 | P1 |
| `/resources/processes-materials-finishes/` | 采购/技术资料 / R3 | 工艺选择、材料表面、关键特征3入口；studies/RFQ；旧锚点跳转。 已审；信息足够，采用 R3；不复制文章的工艺图／涂层图。 | 当前：Choose a machining process → Specify material & finish → Drawing requirements & critical features → Discuss the requirements on your drawing；按蓝图重排 | 无主内容图片；保持无装饰图 | C已查；V55 桌面实看抽样；手机实看抽样 | P1 |
| `/resources/processes-materials-finishes/cnc-process-selection/` | 采购/技术资料 / G5 | 3种route表；3实拍setup；3相关studies；tolerance条件。 已审；不把multi-axis setup扩大为同时联动证明，采用 G5。 | 当前：Choose by geometry → Machining in the LZZ workshop → Compare a related part and setup → Tolerances for critical features → Related guides → Discuss the requirements for your part；按蓝图重排 | `/media/evidence/turning-operation-1600.webp`<br>`/media/evidence/milling-enclosure-operation-1600.webp`<br>`/media/evidence/five-axis-operation-1600.webp` | C已查；V56 桌面实看抽样；手机实看抽样 | P1 |
| `/resources/processes-materials-finishes/material-and-finish-checklist/` | 采购/技术资料 / G6 | 5材料族、牌号冲突、treatment/appearance、interfaces、实体/涂层/覆层、records。 已审；保留Teflon源组标注与实心PTFE区别、牌号不等价，采用 G6。 | 当前：Choose the material specification → Treatment and appearance → Interfaces and dimensions after treatment → Solid material, coating or covering? → Material and inspection records → Related guides → Discuss the requirements for your part；按蓝图重排 | `/media/resources/finish-interfaces-v1-800.webp`<br>`/media/source-details/finish-coated-round-1200.webp`<br>`/media/source-details/finish-coated-bars-1200.webp` | C已查；V57 桌面实看抽样；手机实看抽样 | P1 |
| `/resources/production-and-shipping/custom-cnc-parts-shipping-checklist/` | 采购/技术资料 / G8 | protection/labels，timing/Incoterm，documents，2022archive，相关/草稿。 已审；AI示意与历史档案分离良好，职责/贸易条款逐单确认；采用 G8。 | 当前：Protection and identification → Timing and responsibility → Shipment and import documents → LZZ packing archive → Related guides → Discuss the requirements for your part；按蓝图重排 | `/media/content-guides/packing-review-v1-1200.webp`<br>`/media/evidence/shipping-example-1600.webp`<br>`/media/evidence/shipment-2022-order-packing-1600.webp`<br>`/media/evidence/shipment-2022-prepared-load-1600.webp` | C已查；V58 桌面实看抽样；手机实看抽样 | P1 |
| `/resources/production-and-shipping/prototype-vs-small-batch-cnc/` | 采购/技术资料 / G7 | 首样目的、5行prototype/repeat比较、batch规格、3阶段release表、复购报价。 已审；价格/时间与route随数量变化条件均保留，采用 G7。 | 当前：Check the first sample → Prototype and repeat-batch decisions → Approve the batch specification → Keep a clear revision and release record → Confirm the next order → Related guides → Request a quote for the next batch；按蓝图重排 | 无主内容图片；保持无装饰图 | C已查；V59 桌面实看抽样；手机实看抽样 | P1 |
| `/resources/rfq-checklist/` | 采购/技术资料 / G1 | 6项快览＋完整brief并排；3详项默认折叠；acceptance worksheet；相关2指南；草稿尾部。 已审；必要采购条件恢复可见，采用 G1。 | 当前：What to include → Copy the inquiry brief → Drawings and inspection requirements → Material and final surface → Quantity and delivery → Related guides → Prepare and send your inquiry；按蓝图重排 | 无主内容图片；保持无装饰图 | C已查；V60 桌面实看抽样；手机实看抽样 | P0 |

### 3.3 按页面确认的实看范围

| 证据组 | 实际检查及边界 |
| --- | --- |
| V01 Home | 桌面/手机首屏；中段以内容与图片引用检查为主，不据此认定中段视觉或卡片交互已验。 |
| V02 / V24 / V48 | 404两端首屏；Privacy两端首屏及当前存储文案；Quote桌面首屏、手机首屏与表单窗口。没有提交或外发。 |
| V03–V10 | Company overview/profile/contact/how-we-work、新闻目录及来访/峰会/2024三篇，桌面与手机分段；Profile补documents单窗口，手机未覆盖后两份文件/ISO全文。 |
| V11–V23 | 13个能力/工厂URL双端局部窗口；V18–V23手机为前部固定位置；Factory补equipment/quality/methods两端，手机方法第四条仅部分。 |
| V25–V47 | 3目录、全部8 studies、12个产品变体双端局部窗口；V25–V33手机前部；V39/V40/V45/V47补完整来源图区两端，验证CAD/法兰/圆件/叶轮身份。 |
| V49–V60 | Resources全部12页双端分段；RFQ补无hash默认closed summary窗口。自动展开的hash访问与默认状态分开记录。 |
| 未逐页视觉25业务页 | May2025/November2025团建文章及23个其余产品：内容/源图/引用已查；视觉仅共享组件推导，待实施逐页验收。 |
| 全部截图 | 首屏/选定窗口，不是全页连续截图；不把截图边缘、滚动中间状态、采集页眉残影当网页bug。源图观察不冒充网页观察。 |

### 3.4 19个预览/设计实验路径

全部已读构建快照的职责、模块和图片引用，未逐页视觉检查。最终决定：保留历史设计比较职责、noindex与业务导航隔离；不把旧方向稿同步当现行品牌规范，不部署或删除；是否归档另作技术决定。无主标题的索引不是自动的SEO缺陷。

| 预览URL | 独有内容/当前模块 | 图片引用 | 处理及状态 |
| --- | --- | --- | --- |
| `/content-layout-demo-20261010/` | 方向/布局入口；改造前 当前主站 / 改造后 独立样板 / 理解企业 → 找到加工路线 → 查看实拍证据 → 准备询价 | 无img；CSS背景/素材由对应组件继续核查 | P2；内容快照/引用已读，视觉未检查；保留预览，不纳入业务页面改版模板 |
| `/content-layout-demo-20261010/category/` | Engineering plastics,machined for your part；Plastic forms, up close / Plastic insulators, wear parts and housings / Compare part examples / Drawing & acceptance / Prepare your plastic machining enquiry | `/media/source-details/plastic-ptfe-shafts-1200.webp`<br>`/media/source-details/plastic-acrylic-detail-1200.webp`<br>`/media/source-details/plastic-ptfe-batch-1200.webp`<br>`/media/product-studio/catalog-20-studio-v2-1536.webp`<br>`/media/product-studio/catalog-21-studio-v2-1536.webp`<br>`/media/gallery/plastic-gallery-v1-1200.webp`<br>`/media/product-studio/catalog-29-studio-v2-1536.webp` | P2；内容快照/引用已读，视觉未检查；保留预览，不纳入业务页面改版模板 |
| `/content-layout-demo-20261010/detail/` | Custom machined plastic parts；Polymer grade and working surfaces / Manufacturing options / Drawing & inspection requirements / Compare part requirements / Prepare your plastic-part inquiry | `/media/product-studio/catalog-21-studio-v2-1536.webp`<br>`/media/product-studio/catalog-20-studio-v2-1536.webp`<br>`/media/gallery/plastic-gallery-v1-1200.webp`<br>`/media/product-studio/catalog-29-studio-v2-1536.webp` | P2；内容快照/引用已读，视觉未检查；保留预览，不纳入业务页面改版模板 |
| `/content-layout-demo-20261010/home/` | Your parts.Machined to order.；Parts, made to your drawing / Choose a machining route. / Factory & quality / Machining in practice / Let’s make your part. | `/media/evidence/workshop-wide-1600.webp`<br>`/media/gallery/impeller-gallery-v1-1200.webp`<br>`/media/gallery/casting-gallery-v1-1200.webp`<br>`/media/gallery/locking-pin-gallery-v1-1200.webp`<br>`/media/product-studio/catalog-21-studio-v2-1536.webp`<br>`/media/evidence/turning-operation-1600.webp`<br>`/media/evidence/cmm-room-1600.webp`<br>`/media/evidence/five-axis-operation-1600.webp`<br>`/media/evidence/display-housing-machining-1600.webp`<br>`/media/evidence/turn-mill-operation-1600.webp` | P2；内容快照/引用已读，视觉未检查；保留预览，不纳入业务页面改版模板 |
| `/design-comparison-20261010/direction-a.html` | Custom CNCMachining.；The right process.For your geometry. / From the machine.To the part. / Let's makeyour next part. | `img/five-axis-operation.webp`<br>`img/milling-enclosure-operation.webp`<br>`img/display-housing-machining.webp`<br>`img/display-housing-panel.webp`<br>`img/workshop-wide.webp` | P2；内容快照/引用已读，视觉未检查；保留预览，不纳入业务页面改版模板 |
| `/design-comparison-20261010/direction-b.html` | Every detail.；Your part.Our craft. / A closer look. / Where the work happens. / Discuss your part. | `img/impeller.webp`<br>`img/housing.webp`<br>`img/five-axis-operation.webp`<br>`img/workshop-wide.webp` | P2；内容快照/引用已读，视觉未检查；保留预览，不纳入业务页面改版模板 |
| `/design-comparison-20261010/direction-c.html` | Your next part.In the making.；The right process.For your geometry. / A closer look.From cut to component. / On the floor.In the inspection room. / Bring your drawing.Let's talk machining. | `img/five-axis-operation.webp`<br>`img/display-housing-machining.webp`<br>`img/display-housing-panel.webp`<br>`img/workshop-wide.webp`<br>`img/cmm-room.webp` | P2；内容快照/引用已读，视觉未检查；保留预览，不纳入业务页面改版模板 |
| `/design-comparison-20261010/style-explorer.html` | 方向/布局入口； | 无img；CSS背景/素材由对应组件继续核查 | P2；内容快照/引用已读，视觉未检查；保留预览，不纳入业务页面改版模板 |
| `/homepage-directions-20261012/` | 相同的业务内容，三种阅读体验。；精密产品目录 / 深色材质展陈 / 开阔工程画册 / 三版保持相同的信息覆盖 | `/homepage-directions-20261012/screenshots/a-hero-desktop.jpg`<br>`/homepage-directions-20261012/screenshots/b-hero-desktop.jpg`<br>`/homepage-directions-20261012/screenshots/c-hero-desktop.jpg`<br>`/homepage-directions-20261012/references/1.jpg`<br>`/homepage-directions-20261012/references/2.jpg`<br>`/homepage-directions-20261012/references/3.jpg`<br>`/homepage-directions-20261012/references/4.jpg`<br>`/homepage-directions-20261012/references/5.jpg`<br>`/homepage-directions-20261012/references/6.jpg`<br>`/homepage-directions-20261012/references/7.jpg`<br>`/homepage-directions-20261012/references/8.jpg`<br>`/homepage-directions-20261012/references/9.jpg`<br>`/homepage-directions-20261012/references/10.jpg`<br>`/homepage-directions-20261012/references/11.jpg`<br>`/homepage-directions-20261012/references/12.jpg`<br>`/homepage-directions-20261012/references/13.jpg`<br>`/homepage-directions-20261012/references/14.jpg`<br>`/homepage-directions-20261012/references/15.jpg`<br>`/homepage-directions-20261012/references/16.jpg` | P2；内容快照/引用已读，视觉未检查；保留预览，不纳入业务页面改版模板 |
| `/homepage-directions-20261012/a/` | Your drawing.Our next part.；Made aroundyour requirements. / The right processfor your part. / A closer lookat LZZ. / From setupto component. / A clear pathfrom drawing to part. / Have a drawing?Let's review it. | `/homepage-directions-20261012/assets/hero-a.webp`<br>`/media/catalog-02-cutout-v1.webp`<br>`/media/catalog-22-cutout-v1.webp`<br>`/media/catalog-32-cutout-v1.webp`<br>`/media/catalog-21-cutout-v1.webp`<br>`/media/evidence/turning-operation-1600.webp`<br>`/media/evidence/workshop-wide-1600.webp`<br>`/media/evidence/cmm-room-1600.webp`<br>`/media/evidence/five-axis-operation-1600.webp`<br>`/media/evidence/display-housing-machining-1600.webp`<br>`/media/evidence/turn-mill-operation-1600.webp` | P2；内容快照/引用已读，视觉未检查；保留预览，不纳入业务页面改版模板 |
| `/homepage-directions-20261012/b/` | Complex parts.Made toyour drawing.；Made aroundyour requirements. / A closer lookat LZZ. / The right processfor your part. / From setupto component. / A clear pathfrom drawing to part. / Have a drawing?Let's review it. | `/homepage-directions-20261012/assets/hero-b-blended.webp`<br>`/media/catalog-02-cutout-v1.webp`<br>`/media/catalog-22-cutout-v1.webp`<br>`/media/catalog-32-cutout-v1.webp`<br>`/media/catalog-21-cutout-v1.webp`<br>`/media/evidence/workshop-wide-1600.webp`<br>`/media/evidence/cmm-room-1600.webp`<br>`/media/evidence/turning-operation-1600.webp`<br>`/media/evidence/five-axis-operation-1600.webp`<br>`/media/evidence/display-housing-machining-1600.webp`<br>`/media/evidence/turn-mill-operation-1600.webp` | P2；内容快照/引用已读，视觉未检查；保留预览，不纳入业务页面改版模板 |
| `/homepage-directions-20261012/c/` | From your drawing.Into your assembly.；The right processfor your part. / Made aroundyour requirements. / From setupto component. / A closer lookat LZZ. / A clear pathfrom drawing to part. / Have a drawing?Let's review it. | `/homepage-directions-20261012/assets/hero-c-wide.webp`<br>`/media/evidence/turning-operation-1600.webp`<br>`/media/catalog-02-cutout-v1.webp`<br>`/media/catalog-22-cutout-v1.webp`<br>`/media/catalog-32-cutout-v1.webp`<br>`/media/catalog-21-cutout-v1.webp`<br>`/media/evidence/five-axis-operation-1600.webp`<br>`/media/evidence/display-housing-machining-1600.webp`<br>`/media/evidence/turn-mill-operation-1600.webp`<br>`/media/evidence/workshop-wide-1600.webp`<br>`/media/evidence/cmm-room-1600.webp` | P2；内容快照/引用已读，视觉未检查；保留预览，不纳入业务页面改版模板 |
| `/image-audit-20261012/` | 全站图片与布局前后对比；首页 / 产品分类 / 叶轮详情 / 5 轴加工 / 多面加工零件 / 加工方式选择 / 零件要求指南 / 材料与表面处理 / 棱柱件加工案例 | `screens/before/home-1440.jpg`<br>`screens/after/home-1440.jpg`<br>`screens/before/products-1440.jpg`<br>`screens/after/products-1440.jpg`<br>`screens/before/products--ultra-high-precision-machining-services-1440.jpg`<br>`screens/after/products--ultra-high-precision-machining-services-1440.jpg`<br>`screens/before/capabilities--5-axis-cnc-machining-1440.jpg`<br>`screens/after/capabilities--5-axis-cnc-machining-1440.jpg`<br>`screens/before/products--global-manufacturer-of-multi-sided-precision-machined-components-1440.jpg`<br>`screens/after/products--global-manufacturer-of-multi-sided-precision-machined-components-1440.jpg`<br>`screens/before/resources--cnc-process-selection-1440.jpg`<br>`screens/after/resources--cnc-process-selection-1440.jpg`<br>`screens/before/resources--custom-cnc-machined-components-for-prototypes-and-production-1440.jpg`<br>`screens/after/resources--custom-cnc-machined-components-for-prototypes-and-production-1440.jpg`<br>`screens/before/resources--material-and-finish-checklist-1440.jpg`<br>`screens/after/resources--material-and-finish-checklist-1440.jpg`<br>`screens/before/cases--milling-prismatic-components-1440.jpg`<br>`screens/after/cases--milling-prismatic-components-1440.jpg` | P2；内容快照/引用已读，视觉未检查；保留预览，不纳入业务页面改版模板 |
| `/link-rhythm-20261012/` | 内链与板块节奏；Resources：目录与阅读入口 / 首页：能力与材料入口 / About：相关页面衔接 / 产品页：采购要求与询价收尾 | `images/resources-1440-before.jpg`<br>`images/resources-1440-final.jpg`<br>`images/home-1440-before.jpg`<br>`images/home-1440-final.jpg`<br>`images/about-1440-before.jpg`<br>`images/about-1440-final.jpg`<br>`images/product-1440-before.jpg`<br>`images/product-1440-final.jpg` | P2；内容快照/引用已读，视觉未检查；保留预览，不纳入业务页面改版模板 |
| `/preview/home-editorial/` | Custom CNC partsMade to your drawing；Part examples / Machining capabilities & materials / Factory & quality / Machining studies / Have a drawingto review? | `/media/responsive/machining-hero-v2-1672.webp`<br>`/media/gallery/impeller-gallery-v1-1200.webp`<br>`/media/gallery/casting-gallery-v1-1200.webp`<br>`/media/gallery/locking-pin-gallery-v1-1200.webp`<br>`/media/gallery/plastic-gallery-v1-1200.webp`<br>`/media/image-audit/impeller-detail-v2-1200.webp`<br>`/media/factory-refined/workshop-1440.webp`<br>`/media/factory-refined/inspection-1440.webp`<br>`/media/evidence/display-housing-machining-1600.webp`<br>`/media/evidence/turn-mill-operation-1600.webp` | P2；内容快照/引用已读，视觉未检查；保留预览，不纳入业务页面改版模板 |
| `/visual-directions-20261014/` | 同样的业务，三种视觉表达。；简约精修 / 高端品牌 / 图片主导 / 本次设计调整 | `/visual-directions-20261014/screens/a-desktop.jpg`<br>`/visual-directions-20261014/screens/b-desktop.jpg`<br>`/visual-directions-20261014/screens/c-desktop.jpg` | P2；内容快照/引用已读，视觉未检查；保留预览，不纳入业务页面改版模板 |
| `/visual-directions-20261014/a/` | Custom CNC partsMade to your drawing.；Part examples / Machining capabilities& materials / Inside ourHangzhou workshop. / Machining studies / Before you sendthe drawing. / Have a drawingto review? | `/media/machining-hero-v2.webp`<br>`/media/gallery/impeller-gallery-v1-1200.webp`<br>`/media/gallery/casting-gallery-v1-1200.webp`<br>`/media/gallery/locking-pin-gallery-v1-1200.webp`<br>`/media/gallery/plastic-gallery-v1-1200.webp`<br>`/media/image-audit/impeller-detail-v2-1536.webp`<br>`/media/factory-refined/workshop-1440.webp`<br>`/media/factory-refined/inspection-1440.webp`<br>`/media/evidence/display-housing-machining-1600.webp`<br>`/media/evidence/turn-mill-operation-1600.webp` | P2；内容快照/引用已读，视觉未检查；保留预览，不纳入业务页面改版模板 |
| `/visual-directions-20261014/b/` | Custom CNC partsMade to your drawing.；Part examples / Machining capabilities& materials / Inside ourHangzhou workshop. / Machining studies / Before you sendthe drawing. / Have a drawingto review? | `/visual-directions-20261014/media/impeller-dark-1536.webp`<br>`/media/gallery/impeller-gallery-v1-1200.webp`<br>`/media/gallery/casting-gallery-v1-1200.webp`<br>`/media/gallery/locking-pin-gallery-v1-1200.webp`<br>`/media/gallery/plastic-gallery-v1-1200.webp`<br>`/media/evidence/milling-enclosure-operation-1600.webp`<br>`/media/factory-refined/workshop-1440.webp`<br>`/media/factory-refined/inspection-1440.webp`<br>`/media/evidence/display-housing-machining-1600.webp`<br>`/media/evidence/turn-mill-operation-1600.webp` | P2；内容快照/引用已读，视觉未检查；保留预览，不纳入业务页面改版模板 |
| `/visual-directions-20261014/c/` | Custom CNC partsMade to your drawing.；Part examples / Machining capabilities& materials / Inside ourHangzhou workshop. / Machining studies / Before you sendthe drawing. / Have a drawingto review? | `/media/machining-hero-v2.webp`<br>`/media/gallery/impeller-gallery-v1-1200.webp`<br>`/media/gallery/casting-gallery-v1-1200.webp`<br>`/media/gallery/locking-pin-gallery-v1-1200.webp`<br>`/media/gallery/plastic-gallery-v1-1200.webp`<br>`/media/image-audit/impeller-detail-v2-1536.webp`<br>`/media/factory-refined/workshop-1440.webp`<br>`/media/factory-refined/inspection-1440.webp`<br>`/media/evidence/display-housing-machining-1600.webp`<br>`/media/evidence/turn-mill-operation-1600.webp` | P2；内容快照/引用已读，视觉未检查；保留预览，不纳入业务页面改版模板 |

### 3.5 全部153条兼容/规范化路径

下表逐条依据迁移配置核对，153条目的内容可在当前清单解析；不是逐条HTTP/301状态、query或hash实测。没有正文的跳转不设计额外模块。表中有HTML壳的已读壳中meta/JS/canonical；无壳者只读规则。统一保留兼容、不在本轮执行配置修改。Factory配置到根页与组件默认#workshop/#quality不一致，应在实施阶段选择一个明确来源并实测旧query/hash；Resources旧fragment同样不得默默丢失。

| 旧/规范化URL | 当前配置目标 | 检查状态 | 最终动作 |
| --- | --- | --- | --- |
| `/about` | `/about/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/about/company-documents/` | `/about/company-profile/#documents` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/article` | `/resources/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/article-category/Company-Information` | `/resources/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/article-category/Product-Information` | `/resources/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/article/category/Company-Information` | `/resources/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/article/category/Product-Information` | `/resources/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/article/Custom-CNC-Machined-Components-for-Prototypes-and-Production` | `/resources/drawings-and-ordering/critical-features-cnc-drawing/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/article/November-2025:-Hangzhou-Lizhizao-Group-Activity` | `/about/company-news/november-2025-hangzhou-lizhizao-group-activity/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/cases/` | `/products/machining-studies/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/cases/29-inch-display-housing-cnc-machining/` | `/products/machining-studies/29-inch-display-housing-cnc-machining/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/cases/custom-metal-parts-batch-examples/` | `/products/machining-studies/custom-metal-parts-batch-examples/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/cases/custom-plastic-parts-ptfe-pom-pe-acrylic/` | `/products/machining-studies/custom-plastic-parts-ptfe-pom-pe-acrylic/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/cases/five-axis-machining-multi-face-parts/` | `/products/machining-studies/five-axis-machining-multi-face-parts/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/cases/milling-a-pocketed-enclosure-form/` | `/products/machining-studies/milling-a-pocketed-enclosure-form/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/cases/milling-prismatic-components/` | `/products/machining-studies/milling-prismatic-components/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/cases/turning-then-milling-cylindrical-parts/` | `/products/machining-studies/turning-then-milling-cylindrical-parts/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/cases/two-stage-cnc-milling/` | `/products/machining-studies/two-stage-cnc-milling/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/contact` | `/about/contact/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/contact/` | `/about/contact/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/custom/advantage` | `/about/company-profile/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/custom/download` | `/about/company-profile/#documents` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/custom/factory` | `/factory/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/factory/quality/` | `/factory/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P1；明确对应锚点与query/hash后再改配置 |
| `/factory/workshop/` | `/factory/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P1；明确对应锚点与query/hash后再改配置 |
| `/product` | `/products/part-examples/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product-category/5-Axis-CNC-Machining` | `/capabilities/5-axis-cnc-machining/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product-category/Aluminum-CNC-Parts` | `/capabilities/aluminum-cnc-parts/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product-category/Casting-Machining` | `/capabilities/casting-machining/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product-category/CNC-Milling-Service` | `/capabilities/cnc-milling-service/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product-category/CNC-Turning-Service` | `/capabilities/cnc-turning-service/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product-category/Copper-Brass-CNC-Parts` | `/capabilities/copper-brass-cnc-parts/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product-category/Low-Volume-Production` | `/capabilities/low-volume-production/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product-category/Plastic-Machined-Parts` | `/capabilities/plastic-machined-parts/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product-category/Prototype-Machining` | `/capabilities/prototype-machining/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product-category/Stainless-Steel-CNC-Parts` | `/capabilities/stainless-steel-cnc-parts/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/10031201` | `/products/part-examples/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/10031202` | `/products/part-examples/custom-oem-high-precision-cnc-milling-manufacturer/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/10031204` | `/products/part-examples/ultra-high-precision-machining-services/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/10031206` | `/products/part-examples/global-oem-precision-machining-solutions/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/10031207` | `/products/part-examples/global-manufacturer-of-multi-sided-precision-machined-components/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/10031208` | `/products/part-examples/custom-oem-cnc-turning-manufacturer/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/10031209` | `/products/part-examples/custom-rotary-cylindrical-components/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/10031210` | `/products/part-examples/custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/10031213` | `/products/part-examples/full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/10031214` | `/products/part-examples/custom-high-precision-machining-for-structural-aesthetic-components-oem/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/10031215` | `/products/part-examples/high-volume-cnc-turning-for-complex-internal-external-features/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/10031216` | `/products/part-examples/high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/10031242` | `/products/part-examples/custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/10031243` | `/products/part-examples/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/10031244` | `/products/part-examples/custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/10031245` | `/products/part-examples/custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/10031246` | `/products/part-examples/custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/10031247` | `/products/part-examples/custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/category/5-Axis-CNC-Machining` | `/capabilities/5-axis-cnc-machining/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/category/Aluminum-CNC-Parts` | `/capabilities/aluminum-cnc-parts/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/category/Casting-Machining` | `/capabilities/casting-machining/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/category/CNC-Milling-Service` | `/capabilities/cnc-milling-service/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/category/CNC-Turning-Service` | `/capabilities/cnc-turning-service/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/category/Copper-Brass-CNC-Parts` | `/capabilities/copper-brass-cnc-parts/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/category/Low-Volume-Production` | `/capabilities/low-volume-production/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/category/Plastic-Machined-Parts` | `/capabilities/plastic-machined-parts/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/category/Prototype-Machining` | `/capabilities/prototype-machining/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/category/Stainless-Steel-CNC-Parts` | `/capabilities/stainless-steel-cnc-parts/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/Custom-Automotive-Performance-Parts-Manufacturer-and-Aluminum-Intercooler-Prototype-Supplier` | `/products/part-examples/custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/Custom-Billet-Aluminum-Engine-Cover-Manufacturer-and-Automotive-Prototype-Supplier` | `/products/part-examples/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/Custom-Billet-Aluminum-Intake-Manifold-Manufacturer-and-Automotive-Prototype-Supplier` | `/products/part-examples/custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/Custom-Billet-Aluminum-Intake-Plenum-Manufacturer-and-High-Performance-Tuning-Parts-Supplier` | `/products/part-examples/custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/Custom-Billet-Intake-Manifold-Manufacturer-and-Automotive-Performance-Prototype-Supplier` | `/products/part-examples/custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/Custom-CNC-Machined-Castings-Transmission-Housings-Pump-Bodies` | `/products/part-examples/custom-cnc-machined-castings-transmission-housings-pump-bodies/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/Custom-CNC-Machined-Electronic-Throttle-Body-Manufacturer-and-Automotive-Prototype-Supplier` | `/products/part-examples/custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/Custom-CNC-Turned-Stainless-Steel-Components-Manufacturer-and-Precision-Shaft-Supplier` | `/products/part-examples/custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/Custom-High-Precision-CNC-Milling-5-Axis-Machining-Services-OEM-ODM` | `/products/part-examples/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/Custom-High-Precision-Machining-for-Structural-Aesthetic-Components-OEM` | `/products/part-examples/custom-high-precision-machining-for-structural-aesthetic-components-oem/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/Custom-OEM-CNC-Machined-Non-Metallic-Components-Insulating-Parts` | `/products/part-examples/custom-oem-cnc-machined-non-metallic-components-insulating-parts/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/Custom-OEM-CNC-Machined-Plastic-Parts-Manufacturer` | `/products/part-examples/custom-oem-cnc-machined-plastic-parts-manufacturer/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/Custom-OEM-CNC-Turned-Fittings-Connectors-and-Flanges-Manufacturer` | `/products/part-examples/custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/Custom-OEM-CNC-Turning-Manufacturer` | `/products/part-examples/custom-oem-cnc-turning-manufacturer/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/Custom-OEM-High-Precision-CNC-Milling-Manufacturer` | `/products/part-examples/custom-oem-high-precision-cnc-milling-manufacturer/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/Custom-Rotary-Cylindrical-Components` | `/products/part-examples/custom-rotary-cylindrical-components/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/Full-Service-CNC-Milling-Solutions-Custom-Metal-Parts-Manufacturer-with-Finishing` | `/products/part-examples/full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/Global-Manufacturer-of-Multi-Sided-Precision-Machined-Components` | `/products/part-examples/global-manufacturer-of-multi-sided-precision-machined-components/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/Global-OEM-Precision-Machining-Solutions` | `/products/part-examples/global-oem-precision-machining-solutions/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/High-Reliability-Precision-Machining-Turbine-Fluid-Complex-Curve-Component-OEM` | `/products/part-examples/high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/High-Volume-CNC-Turning-for-Complex-Internal-External-Features` | `/products/part-examples/high-volume-cnc-turning-for-complex-internal-external-features/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/OEM-Precision-CNC-Machined-Casting-Housing-Structural-Enclosures` | `/products/part-examples/oem-precision-cnc-machined-casting-housing-structural-enclosures/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/OEM-Precision-CNC-Machined-Casting-Housings` | `/products/part-examples/oem-precision-cnc-machined-casting-housings/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/Precision-CNC-Machined-Castings-Custom-OEM-Housings` | `/products/part-examples/precision-cnc-machined-castings-custom-oem-housings/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/Precision-CNC-Machined-Castings-Manufacturer` | `/products/part-examples/precision-cnc-machined-castings-manufacturer/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/Precision-CNC-Machining-for-Complex-Plastic-Geometries-and-Tight-Tolerances` | `/products/part-examples/precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/Precision-CNC-Turned-Brass-Components-Manufacturer-and-Copper-Parts-Supplier` | `/products/part-examples/precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/Precision-Low-Volume-CNC-Machining-Manufacturer-and-HMLV-Components-Supplier` | `/products/part-examples/precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/Precision-Machining-for-Functional-Plastic-Blocks-Structural-Components` | `/products/part-examples/precision-machining-for-functional-plastic-blocks-structural-components/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/Precision-Small-Batch-CNC-Milling-Manufacturer-for-Complex-Aluminum-Enclosures` | `/products/part-examples/precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/Precision-Stainless-Steel-CNC-Turned-Parts-Manufacturer-and-316L-Components-Supplier` | `/products/part-examples/precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/Precision-Stainless-Steel-Indexing-Plunger-Manufacturer-and-Spring-Loaded-Locking-Pin-Supplier` | `/products/part-examples/precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/Small-Batch-CNC-Machining-Manufacturer-Complex-Aluminum-Housings` | `/products/part-examples/small-batch-cnc-machining-manufacturer-complex-aluminum-housings/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/Small-Batch-CNC-Machining-Manufacturer-Precision-Aluminum-Components-HMLV` | `/products/part-examples/small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/product/Ultra-High-Precision-Machining-Services` | `/products/part-examples/ultra-high-precision-machining-services/` | 仅规则已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/products/custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier/` | `/products/part-examples/custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/products/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/` | `/products/part-examples/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/products/custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier/` | `/products/part-examples/custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/products/custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier/` | `/products/part-examples/custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/products/custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier/` | `/products/part-examples/custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/products/custom-cnc-machined-castings-transmission-housings-pump-bodies/` | `/products/part-examples/custom-cnc-machined-castings-transmission-housings-pump-bodies/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/products/custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier/` | `/products/part-examples/custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/products/custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier/` | `/products/part-examples/custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/products/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/` | `/products/part-examples/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/products/custom-high-precision-machining-for-structural-aesthetic-components-oem/` | `/products/part-examples/custom-high-precision-machining-for-structural-aesthetic-components-oem/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/products/custom-oem-cnc-machined-non-metallic-components-insulating-parts/` | `/products/part-examples/custom-oem-cnc-machined-non-metallic-components-insulating-parts/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/products/custom-oem-cnc-machined-plastic-parts-manufacturer/` | `/products/part-examples/custom-oem-cnc-machined-plastic-parts-manufacturer/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/products/custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer/` | `/products/part-examples/custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/products/custom-oem-cnc-turning-manufacturer/` | `/products/part-examples/custom-oem-cnc-turning-manufacturer/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/products/custom-oem-high-precision-cnc-milling-manufacturer/` | `/products/part-examples/custom-oem-high-precision-cnc-milling-manufacturer/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/products/custom-rotary-cylindrical-components/` | `/products/part-examples/custom-rotary-cylindrical-components/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/products/full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing/` | `/products/part-examples/full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/products/global-manufacturer-of-multi-sided-precision-machined-components/` | `/products/part-examples/global-manufacturer-of-multi-sided-precision-machined-components/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/products/global-oem-precision-machining-solutions/` | `/products/part-examples/global-oem-precision-machining-solutions/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/products/high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem/` | `/products/part-examples/high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/products/high-volume-cnc-turning-for-complex-internal-external-features/` | `/products/part-examples/high-volume-cnc-turning-for-complex-internal-external-features/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/products/oem-precision-cnc-machined-casting-housing-structural-enclosures/` | `/products/part-examples/oem-precision-cnc-machined-casting-housing-structural-enclosures/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/products/oem-precision-cnc-machined-casting-housings/` | `/products/part-examples/oem-precision-cnc-machined-casting-housings/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/products/precision-cnc-machined-castings-custom-oem-housings/` | `/products/part-examples/precision-cnc-machined-castings-custom-oem-housings/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/products/precision-cnc-machined-castings-manufacturer/` | `/products/part-examples/precision-cnc-machined-castings-manufacturer/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/products/precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances/` | `/products/part-examples/precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/products/precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier/` | `/products/part-examples/precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/products/precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier/` | `/products/part-examples/precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/products/precision-machining-for-functional-plastic-blocks-structural-components/` | `/products/part-examples/precision-machining-for-functional-plastic-blocks-structural-components/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/products/precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures/` | `/products/part-examples/precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/products/precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier/` | `/products/part-examples/precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/products/precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier/` | `/products/part-examples/precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/products/small-batch-cnc-machining-manufacturer-complex-aluminum-housings/` | `/products/part-examples/small-batch-cnc-machining-manufacturer-complex-aluminum-housings/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/products/small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv/` | `/products/part-examples/small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/products/ultra-high-precision-machining-services/` | `/products/part-examples/ultra-high-precision-machining-services/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/quality/` | `/factory/#quality` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/resources/australian-customer-workshop-visit-january-2025/` | `/about/company-news/australian-customer-workshop-visit-january-2025/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/resources/china-africa-west-lake-summit-2025/` | `/about/company-news/china-africa-west-lake-summit-2025/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/resources/cnc-process-selection/` | `/resources/processes-materials-finishes/cnc-process-selection/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/resources/company-news/` | `/about/company-news/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/resources/compare-cnc-machining-quotations/` | `/resources/drawings-and-ordering/compare-cnc-machining-quotations/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/resources/critical-features-cnc-drawing/` | `/resources/drawings-and-ordering/critical-features-cnc-drawing/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/resources/custom-cnc-machined-components-for-prototypes-and-production/` | `/resources/drawings-and-ordering/critical-features-cnc-drawing/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/resources/custom-cnc-parts-shipping-checklist/` | `/resources/production-and-shipping/custom-cnc-parts-shipping-checklist/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/resources/drawings-and-ordering/` | `/resources/ordering-guide/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/resources/drawings-and-ordering/custom-cnc-machined-components-for-prototypes-and-production/` | `/resources/drawings-and-ordering/critical-features-cnc-drawing/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/resources/how-we-work/` | `/about/how-we-work/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/resources/lzz-team-outing-2024/` | `/about/company-news/lzz-team-outing-2024/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/resources/machined-prototype-approval-checklist/` | `/resources/drawings-and-ordering/machined-prototype-approval-checklist/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/resources/material-and-finish-checklist/` | `/resources/processes-materials-finishes/material-and-finish-checklist/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/resources/may-2025-lzz-team-outing/` | `/about/company-news/may-2025-lzz-team-outing/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/resources/november-2025-hangzhou-lizhizao-group-activity/` | `/about/company-news/november-2025-hangzhou-lizhizao-group-activity/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/resources/production-and-shipping/` | `/resources/ordering-guide/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |
| `/resources/prototype-vs-small-batch-cnc/` | `/resources/production-and-shipping/prototype-vs-small-batch-cnc/` | 规则＋HTML跳转壳已读；目的内容存在；HTTP未验 | P2；保留目标职责及有效锚点，不新建重复页 |

### 3.6 原站91条完整URL来源映射

这些是原站抓取来源与迁移目标，仅检查登记及目标内容；未联网打开、未声称现仍可访问。它们不能被计入当前84个业务页，也不作为真实客户或订单证据。

| 历史来源URL | 当前目标 | 状态 |
| --- | --- | --- |
| `https://www.lzz-cnc.com/product/Custom-High-Precision-CNC-Milling-5-Axis-Machining-Services-OEM-ODM` | `/products/part-examples/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/10031201` | `/products/part-examples/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/Custom-OEM-High-Precision-CNC-Milling-Manufacturer` | `/products/part-examples/custom-oem-high-precision-cnc-milling-manufacturer/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/10031202` | `/products/part-examples/custom-oem-high-precision-cnc-milling-manufacturer/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/Ultra-High-Precision-Machining-Services` | `/products/part-examples/ultra-high-precision-machining-services/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/10031204` | `/products/part-examples/ultra-high-precision-machining-services/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/Global-OEM-Precision-Machining-Solutions` | `/products/part-examples/global-oem-precision-machining-solutions/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/10031206` | `/products/part-examples/global-oem-precision-machining-solutions/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/Global-Manufacturer-of-Multi-Sided-Precision-Machined-Components` | `/products/part-examples/global-manufacturer-of-multi-sided-precision-machined-components/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/10031207` | `/products/part-examples/global-manufacturer-of-multi-sided-precision-machined-components/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/Custom-OEM-CNC-Turning-Manufacturer` | `/products/part-examples/custom-oem-cnc-turning-manufacturer/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/10031208` | `/products/part-examples/custom-oem-cnc-turning-manufacturer/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/Custom-Rotary-Cylindrical-Components` | `/products/part-examples/custom-rotary-cylindrical-components/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/10031209` | `/products/part-examples/custom-rotary-cylindrical-components/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/Custom-OEM-CNC-Turned-Fittings-Connectors-and-Flanges-Manufacturer` | `/products/part-examples/custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/10031210` | `/products/part-examples/custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/Full-Service-CNC-Milling-Solutions-Custom-Metal-Parts-Manufacturer-with-Finishing` | `/products/part-examples/full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/10031213` | `/products/part-examples/full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/Custom-High-Precision-Machining-for-Structural-Aesthetic-Components-OEM` | `/products/part-examples/custom-high-precision-machining-for-structural-aesthetic-components-oem/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/10031214` | `/products/part-examples/custom-high-precision-machining-for-structural-aesthetic-components-oem/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/High-Volume-CNC-Turning-for-Complex-Internal-External-Features` | `/products/part-examples/high-volume-cnc-turning-for-complex-internal-external-features/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/10031215` | `/products/part-examples/high-volume-cnc-turning-for-complex-internal-external-features/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/High-Reliability-Precision-Machining-Turbine-Fluid-Complex-Curve-Component-OEM` | `/products/part-examples/high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/10031216` | `/products/part-examples/high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/Custom-Automotive-Performance-Parts-Manufacturer-and-Aluminum-Intercooler-Prototype-Supplier` | `/products/part-examples/custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/10031242` | `/products/part-examples/custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/Custom-Billet-Aluminum-Engine-Cover-Manufacturer-and-Automotive-Prototype-Supplier` | `/products/part-examples/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/10031243` | `/products/part-examples/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/Custom-Billet-Intake-Manifold-Manufacturer-and-Automotive-Performance-Prototype-Supplier` | `/products/part-examples/custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/10031244` | `/products/part-examples/custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/Custom-CNC-Machined-Electronic-Throttle-Body-Manufacturer-and-Automotive-Prototype-Supplier` | `/products/part-examples/custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/10031245` | `/products/part-examples/custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/Custom-Billet-Aluminum-Intake-Manifold-Manufacturer-and-Automotive-Prototype-Supplier` | `/products/part-examples/custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/10031246` | `/products/part-examples/custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/Custom-Billet-Aluminum-Intake-Plenum-Manufacturer-and-High-Performance-Tuning-Parts-Supplier` | `/products/part-examples/custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/10031247` | `/products/part-examples/custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/Custom-CNC-Machined-Castings-Transmission-Housings-Pump-Bodies` | `/products/part-examples/custom-cnc-machined-castings-transmission-housings-pump-bodies/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/Custom-CNC-Turned-Stainless-Steel-Components-Manufacturer-and-Precision-Shaft-Supplier` | `/products/part-examples/custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/Custom-OEM-CNC-Machined-Non-Metallic-Components-Insulating-Parts` | `/products/part-examples/custom-oem-cnc-machined-non-metallic-components-insulating-parts/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/Custom-OEM-CNC-Machined-Plastic-Parts-Manufacturer` | `/products/part-examples/custom-oem-cnc-machined-plastic-parts-manufacturer/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/OEM-Precision-CNC-Machined-Casting-Housing-Structural-Enclosures` | `/products/part-examples/oem-precision-cnc-machined-casting-housing-structural-enclosures/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/OEM-Precision-CNC-Machined-Casting-Housings` | `/products/part-examples/oem-precision-cnc-machined-casting-housings/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/Precision-CNC-Machined-Castings-Custom-OEM-Housings` | `/products/part-examples/precision-cnc-machined-castings-custom-oem-housings/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/Precision-CNC-Machined-Castings-Manufacturer` | `/products/part-examples/precision-cnc-machined-castings-manufacturer/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/Precision-CNC-Machining-for-Complex-Plastic-Geometries-and-Tight-Tolerances` | `/products/part-examples/precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/Precision-CNC-Turned-Brass-Components-Manufacturer-and-Copper-Parts-Supplier` | `/products/part-examples/precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/Precision-Low-Volume-CNC-Machining-Manufacturer-and-HMLV-Components-Supplier` | `/products/part-examples/precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/Precision-Machining-for-Functional-Plastic-Blocks-Structural-Components` | `/products/part-examples/precision-machining-for-functional-plastic-blocks-structural-components/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/Precision-Small-Batch-CNC-Milling-Manufacturer-for-Complex-Aluminum-Enclosures` | `/products/part-examples/precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/Precision-Stainless-Steel-CNC-Turned-Parts-Manufacturer-and-316L-Components-Supplier` | `/products/part-examples/precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/Precision-Stainless-Steel-Indexing-Plunger-Manufacturer-and-Spring-Loaded-Locking-Pin-Supplier` | `/products/part-examples/precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/Small-Batch-CNC-Machining-Manufacturer-Complex-Aluminum-Housings` | `/products/part-examples/small-batch-cnc-machining-manufacturer-complex-aluminum-housings/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/Small-Batch-CNC-Machining-Manufacturer-Precision-Aluminum-Components-HMLV` | `/products/part-examples/small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/article/Custom-CNC-Machined-Components-for-Prototypes-and-Production` | `/resources/drawings-and-ordering/critical-features-cnc-drawing/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/article/November-2025:-Hangzhou-Lizhizao-Group-Activity` | `/about/company-news/november-2025-hangzhou-lizhizao-group-activity/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/` | `/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/about` | `/about/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/article` | `/resources/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/article-category/Company-Information` | `/resources/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/article-category/Product-Information` | `/resources/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/article?page=1` | `/resources/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/article/category/Company-Information` | `/resources/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/article/category/Product-Information` | `/resources/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/contact` | `/about/contact/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/custom/advantage` | `/about/company-profile/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/custom/download` | `/about/company-profile/#documents` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/custom/factory` | `/factory/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product` | `/products/part-examples/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product-category/5-Axis-CNC-Machining` | `/capabilities/5-axis-cnc-machining/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product-category/Aluminum-CNC-Parts` | `/capabilities/aluminum-cnc-parts/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product-category/Casting-Machining` | `/capabilities/casting-machining/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product-category/CNC-Milling-Service` | `/capabilities/cnc-milling-service/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product-category/CNC-Turning-Service` | `/capabilities/cnc-turning-service/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product-category/Copper-Brass-CNC-Parts` | `/capabilities/copper-brass-cnc-parts/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product-category/Low-Volume-Production` | `/capabilities/low-volume-production/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product-category/Plastic-Machined-Parts` | `/capabilities/plastic-machined-parts/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product-category/Prototype-Machining` | `/capabilities/prototype-machining/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product-category/Stainless-Steel-CNC-Parts` | `/capabilities/stainless-steel-cnc-parts/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product?page=1` | `/products/part-examples/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product?page=2` | `/products/part-examples/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product?page=3` | `/products/part-examples/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/category/5-Axis-CNC-Machining` | `/capabilities/5-axis-cnc-machining/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/category/Aluminum-CNC-Parts` | `/capabilities/aluminum-cnc-parts/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/category/Casting-Machining` | `/capabilities/casting-machining/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/category/CNC-Milling-Service` | `/capabilities/cnc-milling-service/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/category/CNC-Turning-Service` | `/capabilities/cnc-turning-service/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/category/Copper-Brass-CNC-Parts` | `/capabilities/copper-brass-cnc-parts/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/category/Low-Volume-Production` | `/capabilities/low-volume-production/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/category/Plastic-Machined-Parts` | `/capabilities/plastic-machined-parts/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/category/Prototype-Machining` | `/capabilities/prototype-machining/` | 历史来源映射已读；原站HTTP未验证 |
| `https://www.lzz-cnc.com/product/category/Stainless-Steel-CNC-Parts` | `/capabilities/stainless-steel-cnc-parts/` | 历史来源映射已读；原站HTTP未验证 |

### 3.7 逐页独有内容的实施约束

下面各表不是第二套布局；它们给第2节共享蓝图提供每页具体内容、差异与相关链接。

### 每页必须保留的独有参数、条件和限制

| 页面 | 不得简化丢失的内容 | 来源 |
|---|---|---|
| Milling | 毛坯/成品尺寸、夹持面、刀具可达；孔系/跨面基准；口袋深度、薄壁、内圆角及允许改形；处理后检验、遮蔽面；清洁/化学接触/ESD 另定；钛须另核 grade/condition/tooling/availability。±0.01 mm 仅选定特征、材料/几何/装夹/测量评估后逐图确认。 | `serviceReading.ts:25-31`、`capabilityContent.ts`、`capabilityReferences.ts`、`capabilityOverview.ts` |
| Turning | 公共 datum axis、直径/轴向长度、肩位、runout；孔/平面/槽可 live tooling 或二次铣削；NPT、BSPT、metric 是不同完整规格；线程长度/啮合、量规、密封面/边缘；泄漏/应用批准另定；最大尺寸逐图评估。材料：6061/7075+temper；303/304/316L+标准状态；C11000/C36000；POM/PTFE/PEEK+牌号与测量条件。 | `capabilityDesign.ts` 的 `turningPlan`；`capabilityContent.ts`；`capabilityOverview.ts` |
| 5-axis | indexed access 与 simultaneous contour 的区别；模型版本、profile/position、datum、刀痕、薄壁、工装/刀具间隙；成品/毛坯包络与重量；Al/Ti/Inconel 精确牌号及不锈钢硬度/状态；traceability、final end use、适用出口要求由项目给出；balance/leak/功能测试另定。没有公开可承诺的最大尺寸/行程/负载。 | `serviceReading.ts:33-40`；`capabilityContent.ts`；`capabilityOverview.ts` |
| Casting | 毛坯图与成品图区分；合金/标准/状态、定位 targets、machining allowance；谁供坯、incoming acceptance、允许 variation、rejected blank 责任；轴承孔、seal lands、hidden sections；porosity/pressure/NDT 另定；样件重建独立范围。 | `serviceReading.ts:42-48`；`capabilityContent.ts` |
| Aluminum | 6061/6061-T6、6063/6063-T5、7075/7075-T6、2024、5083；3003 只作为 cooling prototype 所列范围，不泛化所有铝件；grade/temper/stock form/薄壁支撑与应力释放；blasting/brushing/polishing/anodizing、conversion coating/powder coating 需材料相容；masking/cosmetic faces/处理后尺寸；billet 与 casting 供料条件不同；焊接/组合件明确供件/接头及独立测试。 | `serviceReading.ts:50-56`；`capabilityContent.ts`；`capabilityOverview.ts`；`materialGrades.ts` |
| Stainless | SUS303/304、SUS316/316L、17-4PH heat-treatment condition、SUS430/440 精确 designation；这些不是随意可互换选项；工作环境、material records；fine turning/polishing/passivation/electropolishing 按规格；轴线/runout、线程、滑动面、毛刺、处理后尺寸；锁销组件的功能要求另定。 | `serviceReading.ts:58-64`；`capabilityContent.ts` |
| Copper/brass | C11000/C10200/C12000；C26000/C36000；tellurium copper 需指定牌号；C3600、C36000、H62 不默认等同；contact/conductivity、thermal interface、fluid sealing 分开定义；plating、protected contacts、处理后尺寸、材料限制/声明可用性；conductivity/thermal/pressure tests 按方法与限值另定。 | `serviceReading.ts:66-73`；`capabilityContent.ts`；`capabilityEditorial.ts` |
| Plastics | PEEK/PTFE/Polyimide；Nylon/PA6/PA66；POM/acetal，品牌 Delrin 需具体 grade；HDPE/UHMW/PP/PVC；Acrylic/PC/ABS；fillers/stock condition；温度/湿度/化学/负载；低应力夹持、薄壁支撑、conditioning/measurement state；PTFE 实体件与 Teflon-coated metal 不同；颜色不鉴定性能；electrical/food-contact/medical 文件或试验另定。 | `serviceReading.ts:75-82`；`capabilityContent.ts`；`materialGrades.ts` |
| Prototype | fit/assembly/appearance/defined function 的评估目的；当前 revision、固定接口与未决改变；测量/fixture/procedure/approval responsibility；替代材料须批准并记录不能外推的结论；汽车形态例图不证明 vehicle performance；下一版/批量须重新批准。 | `serviceReading.ts:84-90`；`capabilityContent.ts`；`CapabilityModule.astro` |
| Low volume | 每个 part number 的 revision/quantity/material/condition/finish；approved release baseline、变更授权；first article、后续 sampling、traceability、nonconforming handling；repeat dates、forecast 与正式订单分开；finish/cosmetic/packaging 每行明确；没有通用“低量阈值”或经济批量承诺。 | `serviceReading.ts:92-98`；`capabilityContent.ts`；`capabilityEditorial.ts` |
| Sample | 磨损/损伤/保留特征/改动；隐蔽几何与配合件需额外测量；scan/model 不确定材料、公差、表面或目标 fit；未知材料/处理明确为未知；model/drawing revision、formats、哪些文件包含于报价、谁有批准权；首件 fit/function/limits/records、复产前批准；重建及图纸批准时间与生产时间分开。 | `serviceReading.ts:100-106`；`capabilityDesign.ts:90-103`；`sampleToPart.ts` |

#### 35个零件的具体信息与关联去向

每行是确定的最终职责；内容差异不能靠换一个标题维持。所有既有URL先保留，旧路径继续指向该页。Pxx为本报告索引，不是网站新增SKU。

| ID / canonical URL | 当前显示标题 / 优先级 | 最终职责与具体信息 | 合并/迁移与缺资料边界 | 下一步 |
| --- | --- | --- | --- | --- |
| P00 /products/part-examples/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/ | Multi-bore circular milled component · P1 | 圆形多孔铣件形态参考 | 用中心孔、台阶孔、圆周孔与端面基准解释本页；合并重复的 bore/pocket 文案，额外口袋只作订单输入，不说来源已显示。 | Two milling setups for one part → /products/machining-studies/two-stage-cnc-milling/；CNC milling → /capabilities/cnc-milling-service/ |
| P01 /products/part-examples/custom-oem-high-precision-cnc-milling-manufacturer/ | Milled instrument blocks & brackets · P2 | 仪器块与支架参考集合 | 保留安装面、交叉内孔、去毛刺/清洁输入；把科学仪器放为应用条件，不能从两件展示推为某仪器现货。 | CNC milling for prismatic multi-feature parts → /products/machining-studies/milling-prismatic-components/；CNC milling → /capabilities/cnc-milling-service/ |
| P02 /products/part-examples/ultra-high-precision-machining-services/ | Custom CNC Impeller Machining · P2 | 叶轮加工能力与叶形要求 | 保留控制模型、叶根、轴孔与5-axis适用条件；数值公差未给，平衡/转子验证需另定。 | Five-axis machining for multiple faces → /products/machining-studies/five-axis-machining-multi-face-parts/；5-axis machining → /capabilities/5-axis-cnc-machining/ |
| P03 /products/part-examples/global-oem-precision-machining-solutions/ | Ring housings & angled components · P2 | 带角度的车铣件参考 | 短标题聚焦轴线与倾斜接口；从housings/blocks收录迁到shafts（含fittings）家族，ring housings只保留在相关形态，避免一件锥体承担多个家族。 | Turning followed by milling → /products/machining-studies/turning-then-milling-cylindrical-parts/；CNC turning → /capabilities/cnc-turning-service/ |
| P04 /products/part-examples/global-manufacturer-of-multi-sided-precision-machined-components/ | Multi-sided machined components · P1 | 跨多面端口和孔系参考 | 以共享基准、端口标准、安装孔位为独有内容；单次装夹不是由本图证实的结果。 | Five-axis machining for multiple faces → /products/machining-studies/five-axis-machining-multi-face-parts/；5-axis machining → /capabilities/5-axis-cnc-machining/ |
| P05 /products/part-examples/custom-oem-cnc-turning-manufacturer/ | Custom CNC-turned components · P2 | 车削轴套与法兰的通用能力参考 | 保留直径、肩部、轴向定位、后续横孔；将材料选项和具体照片材质分开。 | Turning followed by milling → /products/machining-studies/turning-then-milling-cylindrical-parts/；CNC turning → /capabilities/cnc-turning-service/ |
| P06 /products/part-examples/custom-rotary-cylindrical-components/ | Rotary & cylindrical components · P2 | 旋转件的非同轴特征参考 | 聚焦槽、横孔、角向定位，避免与P05重复讲一般车削；原图并非只有三件旋转件。 | Turning followed by milling → /products/machining-studies/turning-then-milling-cylindrical-parts/；CNC turning → /capabilities/cnc-turning-service/ |
| P07 /products/part-examples/custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer/ | Turned fittings, connectors & flanges · P2 | 连接接口参考集合 | 线程标准NPT、BSPT、metric分别说明，保留密封形式、配对件和压力/泄漏另定条件。 | Turning followed by milling → /products/machining-studies/turning-then-milling-cylindrical-parts/；CNC turning → /capabilities/cnc-turning-service/ |
| P08 /products/part-examples/full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing/ | Milled metal brackets & finished housings · P2 | 有表面处理的支架与壳体集合 | 以功能尺寸/可视面/遮蔽区三类信息组织；长处理清单按基材配对，迁移通用说明至finish guide。 | Two milling setups for one part → /products/machining-studies/two-stage-cnc-milling/；CNC milling → /capabilities/cnc-milling-service/ |
| P09 /products/part-examples/custom-high-precision-machining-for-structural-aesthetic-components-oem/ | Structural & aesthetic components · P2 | 结构接口与外观要求参考 | 保留承载接口与外观分开验收、雕刻图稿与色板；UAV/3D printer是需求语境，不作使用案例。 | Two milling setups for one part → /products/machining-studies/two-stage-cnc-milling/；CNC milling → /capabilities/cnc-milling-service/ |
| P10 /products/part-examples/high-volume-cnc-turning-for-complex-internal-external-features/ | Complex internal & external turned features · P2 | 带内部台阶/沟槽的重复车削任务 | 突出剖面、量具可达性、首件与抽样计划；high-volume只作为询量语境，不继承产能或一致性结果。 | Turning followed by milling → /products/machining-studies/turning-then-milling-cylindrical-parts/；CNC turning → /capabilities/cnc-turning-service/ |
| P11 /products/part-examples/high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem/ | Turbine & fluid-system components · P2 | 流体曲面件与功能验证分工 | 区别P02：本页聚焦流体接口、轮廓验收与功能验证责任；无效率/可靠性数值。 | Five-axis machining for multiple faces → /products/machining-studies/five-axis-machining-multi-face-parts/；5-axis machining → /capabilities/5-axis-cnc-machining/ |
| P12 /products/part-examples/custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier/ | Aluminum intercooler prototypes · P1 | 中冷器原型的零件与焊接总成范围 | 保留6061/3003按组件确认、CNC+TIG、客户供芯体、焊后接口验收；散热表现需另测试。 | Two milling setups for one part → /products/machining-studies/two-stage-cnc-milling/；CNC milling → /capabilities/cnc-milling-service/ |
| P13 /products/part-examples/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/ | Billet aluminum engine covers · P1 | 发动机外盖外形与安装条件 | 保留6061-T6、7075备选、内侧净空、密封/固定界面与刀纹外观分开验收。 | Milling a pocketed enclosure component → /products/machining-studies/milling-a-pocketed-enclosure-form/；CNC milling → /capabilities/cnc-milling-service/ |
| P14 /products/part-examples/custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier/ | Runner & flange intake manifolds · P0 | 进气系统装配语境与歧管需求 | 本页明确来源只有整机/系统语境；Runner、flange与安装空间用需求卡解释，保留STEP/IGES、6061-T6为列示条件。 | Two milling setups for one part → /products/machining-studies/two-stage-cnc-milling/；CNC milling → /capabilities/cnc-milling-service/ |
| P15 /products/part-examples/custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier/ | CNC-machined electronic throttle bodies · P0 | 节气门壳体与执行器的供货边界 | 保留6061-T6、主孔/轴孔关系与电机包络；首段写明housing/assembly需确认，控制性能、泄漏/动作另验。 | Two milling setups for one part → /products/machining-studies/two-stage-cnc-milling/；CNC milling → /capabilities/cnc-milling-service/ |
| P16 /products/part-examples/custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier/ | Injector & fuel-rail intake manifolds · P1 | 喷油器与燃油轨界面歧管 | 区别P14：按runner/port、injector axis、fuel-rail mount三栏；保留6061-T6与STEP/IGES及净空条件。 | Two milling setups for one part → /products/machining-studies/two-stage-cnc-milling/；CNC milling → /capabilities/cnc-milling-service/ |
| P17 /products/part-examples/custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier/ | Billet aluminum intake plenums · P1 | Plenum内腔与分体密封参考 | 保留6061-T6、内腔、throttle flange、分体线/紧固可达、压力条件；三张细节不宣称为同一已交付件。 | Two milling setups for one part → /products/machining-studies/two-stage-cnc-milling/；CNC milling → /capabilities/cnc-milling-service/ |
| P18 /products/part-examples/custom-cnc-machined-castings-transmission-housings-pump-bodies/ | Transmission housings & pump bodies · P1 | 毛坯供货与传动/泵壳二次加工 | 把blank责任置材料之后；区分铸面、机加工面、余量、样件重建、基准及来料验收。 | Two milling setups for one part → /products/machining-studies/two-stage-cnc-milling/；Machining of castings → /capabilities/casting-machining/ |
| P19 /products/part-examples/custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier/ | Stainless steel turned components · P0 | 不锈钢法兰与有孔车削组件 | 将残留shaft/valve stem/locking mechanism语句迁至P32/车削能力；本页按法兰面、同轴孔、紧固件与方向标记组织。 | Turning followed by milling → /products/machining-studies/turning-then-milling-cylindrical-parts/；CNC turning → /capabilities/cnc-turning-service/ |
| P20 /products/part-examples/custom-oem-cnc-machined-non-metallic-components-insulating-parts/ | Non-metallic & insulating components · P2 | 非金属圆形隔离/耐磨形态参考 | 材质保留polymers/composites待定；按槽/孔/凸部与装配条件组织，电性能需独立规格与记录。 | Plastic part forms: PTFE, POM, PE and acrylic → /products/machining-studies/custom-plastic-parts-ptfe-pom-pe-acrylic/；Plastic machining → /capabilities/plastic-machined-parts/ |
| P21 /products/part-examples/custom-oem-cnc-machined-plastic-parts-manufacturer/ | Custom machined plastic parts · P2 | 通用工程塑料形态集合 | 完整保留PEEK/PTFE/polyimide/nylon/acetal/Delrin/HDPE/UHMW/acrylic/polycarbonate为选项；按功能选择，不把橙黄色当材料牌号。 | Plastic part forms: PTFE, POM, PE and acrylic → /products/machining-studies/custom-plastic-parts-ptfe-pom-pe-acrylic/；Plastic machining → /capabilities/plastic-machined-parts/ |
| P22 /products/part-examples/oem-precision-cnc-machined-casting-housing-structural-enclosures/ | Cast housings & structural enclosures · P2 | 深腔与筋结构铸壳 | 以定位支撑、轴承孔、保留铸面三点与P18区分；CMM是需约定记录，不是已有测量。 | Two milling setups for one part → /products/machining-studies/two-stage-cnc-milling/；Machining of castings → /capabilities/casting-machining/ |
| P23 /products/part-examples/oem-precision-cnc-machined-casting-housings/ | CNC-machined casting housings · P1 | 带接口的圆形铸壳与样件定义 | 保留原件轮廓；把内部花键、泵/传动用途改为仅在图纸明确时讨论，重建步骤前置。 | Two milling setups for one part → /products/machining-studies/two-stage-cnc-milling/；Machining of castings → /capabilities/casting-machining/ |
| P24 /products/part-examples/precision-cnc-machined-castings-custom-oem-housings/ | Machined castings & OEM housings · P2 | 不规则铸壳的密封面与配合孔 | 以seal face、bearing fits、tapped mounting为独有；谁供毛坯在采购条件显式展示。 | Two milling setups for one part → /products/machining-studies/two-stage-cnc-milling/；Machining of castings → /capabilities/casting-machining/ |
| P25 /products/part-examples/precision-cnc-machined-castings-manufacturer/ | Precision-machined castings · P2 | 隐藏内接口与测量可达的铸壳 | 用剖面/内部接口、法兰基准、来料记录与P24区分；reverse engineering是服务条件。 | Two milling setups for one part → /products/machining-studies/two-stage-cnc-milling/；Machining of castings → /capabilities/casting-machining/ |
| P26 /products/part-examples/precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances/ | Complex-geometry plastic components · P2 | 重复孔系的复杂塑料形态 | 来源可见是长条重复孔，不把薄壁/深袋称已观察事实；这些留为订单设计限制，测量状态显式。 | Plastic part forms: PTFE, POM, PE and acrylic → /products/machining-studies/custom-plastic-parts-ptfe-pom-pe-acrylic/；Plastic machining → /capabilities/plastic-machined-parts/ |
| P27 /products/part-examples/precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier/ | Turned brass & copper components · P2 | 黄铜/铜接口件与镀后尺寸 | 保留C36000、tellurium copper为可选项；区分接触/导热/密封功能与镀后验收，不能将照片判为该合金。 | Turning followed by milling → /products/machining-studies/turning-then-milling-cylindrical-parts/；CNC turning → /capabilities/cnc-turning-service/ |
| P28 /products/part-examples/precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier/ | Pilot-batch housings & mating parts · P1 | 试制壳体批次与按件号验收 | 先显示零件号/版本/首批数量/共享接口清单；不要从两件生成图推断真实配对壳盖。 | Metal part forms: shafts, fittings and housings → /products/machining-studies/custom-metal-parts-batch-examples/；Low-volume production → /capabilities/low-volume-production/ |
| P29 /products/part-examples/precision-machining-for-functional-plastic-blocks-structural-components/ | Functional plastic blocks & structures · P0 | 圆形塑料结构形态参考 | 保留原来源圆形件；本页按孔/工作边缘/厚度和材料条件组织，矩形block及inserts通用信息迁塑料能力页。 | Plastic part forms: PTFE, POM, PE and acrylic → /products/machining-studies/custom-plastic-parts-ptfe-pom-pe-acrylic/；Plastic machining → /capabilities/plastic-machined-parts/ |
| P30 /products/part-examples/precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures/ | Angled aluminum enclosures · P1 | 有开口和侧孔的铝壳参考 | 原组图支撑重复加工和开口位置；angled/compound-angle降为客户可提出的条件，标题先以open aluminum housings表达。 | Milling a pocketed enclosure component → /products/machining-studies/milling-a-pocketed-enclosure-form/；CNC milling → /capabilities/cnc-milling-service/ |
| P31 /products/part-examples/precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier/ | Stainless steel turned parts · P0 | 不锈钢回转组件的牌号与处理 | 保留303/304/316L/17-4PH为备选，保留不是每件316L条件；来源实际带侧向外形与法兰，勿仅写细长shaft。 | Turning followed by milling → /products/machining-studies/turning-then-milling-cylindrical-parts/；CNC turning → /capabilities/cnc-turning-service/ |
| P32 /products/part-examples/precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier/ | Indexing plungers & locking pins · P1 | 定位销/锁销组件的啮合与供货范围 | 先说明pin/component或spring-loaded assembly需确认；旅行/啮合、安装螺纹、spring/force/cycle各有验收输入。 | Turning followed by milling → /products/machining-studies/turning-then-milling-cylindrical-parts/；CNC turning → /capabilities/cnc-turning-service/ |
| P33 /products/part-examples/small-batch-cnc-machining-manufacturer-complex-aluminum-housings/ | Lid & gasket aluminum housings · P2 | 盖板/密封垫界面的铝壳批次 | 以closure interface、cosmetic masking、批次验收为独有；任何IP/环境结果须另测。 | Milling a pocketed enclosure component → /products/machining-studies/milling-a-pocketed-enclosure-form/；CNC milling → /capabilities/cnc-milling-service/ |
| P34 /products/part-examples/small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv/ | Mixed-material pilot-run components · P1 | 按件号/材料管理的试制批次 | 保留6061/7075、304/316、brass、engineering plastics是选项；照片只示同类车削件，混材与配套关系由BOM定义。 | Metal part forms: shafts, fittings and housings → /products/machining-studies/custom-metal-parts-batch-examples/；Low-volume production → /capabilities/low-volume-production/ |

#### 8个研究的具体任务、原照与关联去向

工序研究回答“看得见什么、这给新图纸带来什么问题”；不写客户背景、改进百分比、合格率、批次一致性或交付结果。六工序页的首图以真实workshop photograph为核心，生成几何图移到解释位。两个collection页可用AI封面，但原素材身份和分组是主内容。

| ID / canonical URL / 旧alias | 优先级与用户问题 | 独有内容和缺资料界限 | 最终结构/图位处理 | 桌面/手机画幅与占比 | 保留特征与下一步 |
| --- | --- | --- | --- | --- | --- |
| S0 /products/machining-studies/five-axis-machining-multi-face-parts/；/cases/five-axis-machining-multi-face-parts/ | P2 多面访问与共享基准 | 保留多面工具可达/共同datum；序列写planning，不能由照片宣称continuous 5-axis或single setup完成。 | five-axis-operation作为首图；five-axis-parts展示实际成组形态。生成multi-face-form移至几何说明；setup-orientations不再作为本页大图，改原照局部的工具/夹持标注。 | 首图4:3，工件+转台+刀具占65–75%；手机4:3保留旋转轴和夹持上下文。原成品竖图3:4全组。 | 工件方向、转台、工具/夹具关系；不能让设备裁成无环境产品照。；two-stage-cnc-milling；milling-prismatic-components；parts P04 |
| S1 /products/machining-studies/turning-then-milling-cylindrical-parts/；/cases/turning-then-milling-cylindrical-parts/ | P2 从车削轴线定位二次铣特征 | 保留turned datum、axial face、angular orientation；原照不能证明live-tooling，使用subsequent milling。 | turn-mill-operation首图；turn-mill-parts不折叠，作真实形态并列。生成turn-mill-form可作局部说明；蓝孔/黄面datum图只标concept。 | 首图4:3，工件/夹持/刀具占70%；手机4:3，轴件小可加正文真实静态细节图；成组竖图3:4全组。 | 中央孔、夹持方向、工作台；datum颜色不落到原件当已批准基准。；two-stage-cnc-milling；five-axis-machining-multi-face-parts；parts P05/P06 |
| S2 /products/machining-studies/two-stage-cnc-milling/；/cases/two-stage-cnc-milling/ | P1 两次装夹之间的基准传递 | 两张原照是核心；源文件夹标同一件两工序，不能从通用方块示意推实际先后加工面或完整刀路。 | 两张two-stage原照并列作首个内容；生成two-setup-form移说明位；通用setup-orientations改作小图并标非该零件。 | 桌面两张4:3同高、各工件+夹持70%；手机逐张4:3全景，不拼为难读宽图。 | 两照原朝向、接触面、工件可见孔/槽；不生成翻转后隐藏侧。；five-axis-machining-multi-face-parts；milling-prismatic-components |
| S3 /products/machining-studies/milling-a-pocketed-enclosure-form/；/cases/milling-a-pocketed-enclosure-form/ | P2 圆形口袋/壁厚与装夹 | 来源带圆形凹腔；通用milling-features是矩形腔块，不能被读为相同零件。 | milling-enclosure-operation首图，parts原图第二；生成pocket-form解释凹腔，矩形milling-features大图删掉以避免形态切换。 | 4:3，工件/刀具夹持占70%；手机4:3全景；原件组图另4:3完整静态展示。 | 圆腔、壁、安装面/孔，保留原组形态；无泄漏结果。；29-inch-display-housing-cnc-machining；two-stage-cnc-milling；parts P30/P33 |
| S4 /products/machining-studies/milling-prismatic-components/；/cases/milling-prismatic-components/ | P2 棱柱形孔系与安装面关系 | 保留实际长条块、多孔、口袋及重复形态；batch sampling作为新订单输入。 | multi-feature-milling-operation首图，parts原竖图第二；prismatic-form只做几何说明；重复通用milling-features大图删。 | 工序4:3，件+夹持70%；原组图3:4全列。手机各自原比例，不裁掉末端口袋。 | 长条比例、孔列、口袋、原件分立，不由合成图定孔数。；two-stage-cnc-milling；milling-a-pocketed-enclosure-form；parts P00/P01 |
| S5 /products/machining-studies/29-inch-display-housing-cnc-machining/；/cases/29-inch-display-housing-cnc-machining/ | P1 宽面板的支撑/平面度和外观 | 保留29-inch仅display designation，实际enclosure尺寸/机床行程未知；支撑和测量状态需图纸约定。 | 保留display-housing-panel原图首屏；machining图+paired原图展开显示在主阅读，不藏details。panel-support只作非批准夹具concept。视频保留原9:16 poster。 | 首图4:3，整板宽90%；paired图3:4全两面；手机不要横裁竖视频；最高约380px时居中contain。 | 板全缘、槽/孔、内外面、工具/支撑语境；不能由29inch换算外壳尺寸。；milling-a-pocketed-enclosure-form；two-stage-cnc-milling；parts P33 |
| S6 /products/machining-studies/custom-plastic-parts-ptfe-pom-pe-acrylic/；/cases/custom-plastic-parts-ptfe-pom-pe-acrylic/ | P2 PTFE/POM/PE/acrylic的独立形态档案 | 按4材料组就近放exact grade状态、用途输入、measurement conditions；来源命名不是已检测牌号。 | 保留plastic-collection AI封面作导航；PTFE三原照/POM和PE原poster/acrylic两照与poster作主体；每组说明不同件，不强排同一工序。 | 封面3:2、群宽88%；原照按原竖/横比；手机一组一图/视频，不用固定横框cover透明边缘。 | PTFE轴/小件、POM齿/hub、PE弯直条、acrylic rim/透明孔；视频未验证播放。；plastic-machined-parts；parts P20/P21/P26/P29 |
| S7 /products/machining-studies/custom-metal-parts-batch-examples/；/cases/custom-metal-parts-batch-examples/ | P2 金属车削件、铝壳、黄铜与清洗后形态集合 | 4组独立来源；cleaning clip仅记录handling/forms，不能声称检验/出货/清洁度已达标。 | 保留metal-collection AI封面但caption声明集合；turned-parts首张实际为P32同形锁销，应准确称locking/turned form；批量轴、壳、黄铜原图保留。 | 封面3:2、群宽90%；长件3:2；批次竖图保留；手机47.566667s原竖视频contain不横裁。 | 法兰/螺纹/细端销、壳腔/孔、黄铜混向、蓝托盘语境；无批次结果。；low-volume-production；parts P28/P34/P32 |


## 4. 内容处理清单与待补资料

### 4.1 保留、合并、删除、迁移

下表删除的是重复呈现或不合适的图位，不删除原始资料文件。第2节逐模块的来源/处理与第3节逐URL差异同时是实施清单；不得只按本节短表删除正文。

| 原位置 | 动作与理由 | 最终去向及不得丢失的内容 |
|---|---|---|
| Home及各类页重复“precision/quality/custom”开场；同题kicker＋breadcrumb＋H1 | 删除装饰性kicker和同义开场；保留一处可独立理解的定位 | H1下最多一段直接说明；breadcrumb承担层级，不再重复Company profile之类小标签。 |
| Capability 当前 requirements、size、checks 排在三例图之后 | 前置并合并geometry/fit说明 | CAP-P2/CAP-M2与M5。保留毛坯/成品尺寸、重量、夹持、刀具可达、所有公差条件和验收状态。 |
| `Drawing notes by material` 的折叠或分离说明 | 迁入各材料同一行，避免来回比对 | grade/condition、finish、masking、after-finish检查与记录一起可见；材料不能默认互换。 |
| 原型页 purpose→workflow→requirements重复fixed interfaces/approval | 合并为一次输入、做法、可复核结果 | CAP-A2；保留评估目的、版本、固定接口、未决变更、fixture/procedure/limits/approver。 |
| Low-volume release与材料表、workflow重复 | 以料号/版本与放行任务合并 | CAP-L2/L3；保留每行qty/grade/condition/finish、first article、sampling、traceability、NC与变更授权。forecast不是订单。 |
| Factory capacity/timing、equipment fit、measurement methods及records的disclosure | 关键条件迁出，报告引用并列呈现 | CAP-F2/F3/F4/F5/F6；数字与限制同屏，方法与适用特征邻接，供方/买方输入输出仍完整。 |
| Factory完整四段交付工作流与How we work重复 | 完整流程保留在公司流程页，工厂只摘要最后交接 | CAP-F7链接A3模块5；不删保护接口、识别、验收放行、所需文件、贸易责任。 |
| 所有能力页通用CMM小图与ISO重复段 | 撤销装饰性重复图位，保留必要短说明 | Factory检验与文件模块；各落地页仍有方法/报告事前约定一句及准确内链。 |
| PART 的fit/drawing/notes反复讲datums、material、qty | 每件合成Feature / Define / Check | PART2/3/5；具体孔、线程、肩位、装配/测量条件按P00–P34保留，不能复制普通轴模板到法兰/锁销。 |
| P19/P31现轴件正文和related reason | 改写不匹配的描述，不改legacy URL | P19法兰孔/端面/旋钮与供货组件；P31按真实可见旋转/连接形态及采购责任。P14首屏名Intake-system assembly reference；P15为Throttle-body CAD reference；P19为Flanged turned component assemblies；P29为Circular plastic component reference；P31为Rotary component & flange reference，长legacy URL不变。保留drawing定义未知内部特征的条件。 |
| 产品主图后的来源材料 | 前移首屏静态source thumb；正文保留独立来源图 | 原始listing、CAD、assembly context、design reference分类明确。静态展示，不加raw打开、zoom或modal。 |
| 产品材料列表/筛选 | 保留全部牌号，但区分“Listed / Options / To confirm” | 卡片给状态短句；PART3完整说明。不得把可讨论材料写成图中实物的检验结论。 |
| Studies partPoints、lead、technical与studyChecks的同义句 | 合成可见几何/新订单输入；原照保留 | STUDY2/4；6个工序各有自己的基准问题，2集合按材料/形态分组，不假作连续工序。 |
| Studies六页自动取共享能力前两条related | 删除不相关的自动入口，改人工显式选择 | 第3节S0–S7列明的2条相关研究＋具体part，链接理由说明实际差异；不要全部重复五轴/车铣。 |
| About profile工程范围与applications | 合并工程说明，保留4显著应用与7次要应用 | A2模块2；应用是可讨论场景，不写成资质/现有客户；次要应用可保留展开。 |
| Profile三份企业认可的说明/日期/有效期details | 关键信息迁出；ISO独立请求 | A2模块3；完整原件、English summary、原件日期/printed validity/证明范围相邻可读；不推断当前证书有效性。 |
| Company documents独立入口/旧页 | 保留已完成的并入关系，不再拆页 | `/about/company-profile/#documents`；旧路径与锚点继续兼容。 |
| Australian01图注与opening photograph正文 | 改为中性可见记录；部件讨论改用03 | A1/A2/A5/A6对应图位同步。原日期冲突先内部待核，不对外补写猜测。 |
| News featured重复Read、More from LZZ重复导语与完整RFQ面板 | 同目标入口收成一个，尾部保留简短导航 | A5/A6；日期、事件事实、完整独有照片及相关文章保留；不为凑4–7章新增供应商宣传。 |
| How we work含糊agree/confirm | 按Buyer / LZZ / Agree拆清责任 | A3各阶段；从`resourceDeliverySections`保留原有供方动作，付款、样件费、保修/返工/运费/退款等按订单约定，不添保证。 |
| Resources原先RFQ/Drawings/Production多重中转 | 保留当前三入口，不恢复旧冗长目录 | R1/R2/R3；保留8篇canonical与原锚点，旧目录只兼容跳转。RFQ仍在hub和Ordering首段直接出现。 |
| RFQ三组详细字段 | 从可选展开迁成默认可见正文，六项快览仍保留 | G1模块2–4；文件冲突优先级、units/revision、检验方法/范围/校准请求、unknown material、before/after finish、完整时间/运输责任不可省略。 |
| 指南正文与紧邻Related guides重复出口 | 同目标留一次；必要深入解释交对应指南 | G2–G8结尾短导航；每篇先回答本题，保留可独立理解的简述，不删数值、单位、条件。 |
| Material/finish 的“photographs below” | 改为不依赖响应式方位的指代 | G6写“原始涂层照片”并就近说明实体PTFE与涂层金属差别；不靠above/below暗示不稳定版序。 |
| Ordering的acceptance worksheet仅挂在shipping阶段 | 下载移至sample/batch批准决策旁，shipping保留所需记录短链 | R2模块4；下载仍是空白工作表，不是LZZ已完成检验记录。 |
| Quote Message泛提示；行为说明在流程后 | 在字段旁给采购提示、按钮前讲清草稿行为 | Q；五字段、联合联系方式校验、错误恢复、储存失败回退全部保留，不新增上传/发送后台。 |
| Privacy“每个part/topic独立草稿” | 精确对齐当前入口键行为 | PRIV模块2：按进入时上下文保存；表内Change reference不会自动创建新存储分区。优先改说明，不暗中改存储契约。 |
| 所有内容页重复灰底圆角RFQ大块 | 依任务缩短，保留上下文与唯一主要行动 | 长服务/产品首屏与结尾可重复同一个任务动作；短新闻/指南只用紧凑结尾；Privacy/404无营销面板。 |

### 4.2 真实资料缺口与处理决定

| 资料缺口/冲突 | 当前依据 | 未获得前的最终呈现 |
|---|---|---|
| 当前ISO证书扫描、版本、编号、机构、范围、有效期与可核验入口 | 现仅有授权certified声明及三份不同性质企业文件 | 保留声明＋索取入口，不展示假证书/假PDF，不把教学基地、高企认可等同ISO。 |
| 设备型号/行程/有效加工包络/最大重量/可用工装与当前清单 | 工艺页明确逐图评估，工厂照片不能给数值 | 直接列买方需给成品/毛坯尺寸、重量、夹持限制；请求规格，不新增通用最大尺寸。 |
| 当前CMM及其他仪器校准、量程/不确定度；真实脱敏报告 | 有照片/方法说明，无当单记录 | 方法、stage、sampling、report format在报价约定；不写默认全检或已测结果，不生成报告。 |
| 小零件螺纹、密封面、分隔与标签的真实包装近照 | 2022原图主要为大黄支架/货物准备 | Factory用交接清单等待补拍；历史照片只在档案上下文保留。非证据包装示意可在指南解释，不填真实图位。 |
| P14总成、P15 CAD、P19/P31旋钮/法兰、P29圆件的准确身份/供货边界 | 原始listing与当前展示/正文不一致，当前原件并非完整受控规格 | 按真实来源命名，注明需提供drawing/supply scope；零件、外购组件、焊接/装配职责分别确认。 |
| Australian visit记录日期冲突 | 来源分组2025-01-07；01原JPG可见年历疑点；无可读拍摄日期EXIF | 不擅自改事件日；实施时需公司确认原分组、原图与事件对应。01退出精确部件讨论主位，不补绘。 |
| 参考产能的统计期间/品类/班次与当前证明 | 约100000 small parts/月附条件 | 仅参考数字与条件同处，不能改成保证交期/承诺月供。 |
| 特定项目材料、涂层、食品/医疗/电气、平衡/泄漏/功能合格记录 | 照片/目录列有形态或可能材料，无逐项目测试证据 | 写明需指定grade/standard/limits/test responsibility，不以行业/应用图推断认证。 |
| 视频真实播放、下载与草稿导出在所有设备的当前功能表现 | 本轮主要核对引用、poster、源码与初始渲染；未播放全部视频、未外发询价 | 下阶段验收逐项执行，当前不标功能全通过。 |



## 5. 图片改造计划：逐图位决定

### 5.1 统一摄影方向与真实性约束

继承原工序照的中性偏冷金属、真实刀纹、可见工件/夹具/刀具关系，以及原产品图的完整轮廓；保留真实车间照的现场光线和环境关系。舍弃主体过小、冗余画布、过强镜面/饱和色、隐藏侧重绘和不相干的三维展示感。棚拍背景统一为中性白或浅灰；金属柔和侧上方漫射光，塑料保留本体纹理，透明件保留真实边缘。照片不添加品牌、刻字、测量值、客户或订单。

每个具体产品图在目录、详情、能力页、首页相关卡片统一使用同一来源主体。**本方案进一步收敛独立报告中“生成图仍可留目录”的建议：只要细节/结构未被可靠核对，就同时退出该产品目录卡，不能靠AI标签允许结构变化。** 泛用家族合图、工艺解释仍可作为不指向具体交付结构的概念图。产品表是具体条目的最终决定，优先于旧视觉文件和本节通用素材行。

“基于真实原图编辑”只允许背景/画布/白边与曝光整理，原主体像素保留并合成，不让ImageGen重画孔、螺纹、叶片、筋、接管、铭文、装配件或隐藏面。若背景分离无法可靠完成，就按完整原图contain并列补拍需求，不生成替代产品。证书、工厂、检验、交付证据不生成重绘。原片模糊或规格未知不靠AI补字/补结构。

文字全部放HTML，不烧进图中；产品图主体周围至少5%安全边。一般主体居中，手机完整contain，不为铺满裁结构；只有下表明确需要留白的概念场景才预留文案区。以下是下一阶段图位规格，本轮没有制作或替换图片。

### 5.2 首页重要图位

| 图位/现图 | 原因与最终处理 | 参考及目标构图/手机规则 |
| --- | --- | --- |
| HOME-I1 /media/responsive/machining-hero-v2-1672.webp（AI） | 按既有工业摄影风格重新生成非证据场景；图为通用铣削概念，不指称LZZ某台机床或订单。当前横图手机裁切使刀具/文字争抢中心。 | 参考当前主轴/切屑构图及真实milling-enclosure-operation的机械关系；4:3，主轴在右上、刀尖与工件接触区在中下，完整工具与夹持占65–75%，无读数/商标/工牌。文字置左侧HTML，不压照片；手机完整4:3，保留刀尖、夹具与工件。可见简短AI illustration图注。 |
| HOME-I2 /media/factory-refined/workshop-1440.webp（AI修饰） | 退出事实证据位，改用真实原片；不继续生成扩设备/环境。 | 参考 /media/evidence/workshop-wide-1600.webp 及来源1 (7).jpg；桌面机器行4:3、可裁少量无效屋顶/地面而保留整机/纵深；手机自然原比。事实数字独立HTML不当成图片证明。 |
| HOME-I3 /media/factory-refined/inspection-1440.webp（AI修饰） | 退出检验证据位，改用原CMM照片；不生成读数/合格工件。 | /media/evidence/cmm-room-1600.webp，竖3:4完整机台/探头；桌面最高420px、手机360px contain，caption注明设备照片而非结果/校准。 |
| HOME-I4 四个零件卡及研究两图 | 仅调整图位与来源绑定；所有具体零件同步下表原主体，研究使用各自原工序照。 | 卡4:3完整主体、76–86%长边；手机2列，不嵌文字。研究原4:3/原竖比，不用统一cover；图注与实际图框同宽。 |

### 5.3 全部35个产品主图与关联卡片

各行同时约束详情首图、列表缩略图、能力/首页相关卡片。来源路径为真实现存参考；raw是原listing资料，不等于当单生产证明。来源为集合时不重拼成一个固定套装。相同P-ID的所有落点采用同一身份，无法核对的原生成图只保留资产档案，不继续当该条产品展示。
| ID / 真实参考文件 | 当前图与原因 | 唯一处理 | 目标画幅/主体/手机/保留特征 |
| --- | --- | --- | --- |
| P00 `D:\lzz\raw\_content\images\products\CNC-Milling-Service-1-1764417292122--54b8b81a8c.jpg` | `/media/product-studio/catalog-00-studio-v2-1536.webp`；来源为薄环状件；展示重新建立了外缘孔、环壁与凹槽的立体关系，不能作孔位或壁厚证据。 | 基于真实原图编辑：保留原主体像素，只整理背景/扩画布；替换该条所有生成/未可靠核对的精修图 | 1:1，主体宽76–82%；手机1:1完整保留，不cover裁边；主体居中，文本在图外，四边至少5%安全；中心开口、全部环周孔、台阶、外围凸耳与原透视 |
| P01 `D:\lzz\raw\_content\images\products\CNC-Milling-Service-2-1764417849930--28b1b081fe.jpg` | `/media/product-studio/catalog-01-studio-v2-1536.webp`；来源九类零件合照，主图抽取两件并重构；不再显示其余形态。 | 仅调整布局/裁切：完整来源作为该条主图与目录卡；统一容器/白边，不重组或重建主体 | 4:3，合照宽90%；手机4:3全图，下方逐件说明；主体居中，文本在图外，四边至少5%安全；九类轮廓、多孔块、支架和环件的分离关系 |
| P02 `D:\lzz\raw\_content\images\products\5-axis-Machining-1-1764418510957--4b51164023.jpg` | `/media/gallery/impeller-gallery-v1-1200.webp`；来源和精修图均为曲叶轮；边缘与叶片根部仍经过处理，细节示意又是不同尺度的生成近景。 | 基于真实原图编辑：保留原主体像素，只整理背景/扩画布；替换该条所有生成/未可靠核对的精修图 | 1:1，叶轮直径82–88%；手机完整叶轮，近景单独3:2；主体居中，文本在图外，四边至少5%安全；叶片走向、外缘、中央孔和叶根；不重构叶数 |
| P03 `D:\lzz\raw\_content\images\products\5-axis-Machining-2-1764418526610--635f52f78c.jpg` | `/media/product-studio/catalog-03-studio-v2-1536.webp`；来源为倾斜螺纹颈的锥状件；展示保留总体形态，但螺纹和内孔被重新绘制。 | 基于真实原图编辑：保留原主体像素，只整理背景/扩画布；替换该条所有生成/未可靠核对的精修图 | 4:5，主体高78–84%；手机4:5全件，螺纹顶端留8%；主体居中，文本在图外，四边至少5%安全；倾斜颈、螺纹、锥体底端与开口方向 |
| P04 `D:\lzz\raw\_content\images\products\5-axis-Machining-3-1764418541931--3aeb6953e6.jpg` | `/media/product-studio/catalog-04-studio-v2-1536.webp`；蓝色扁圆件的展示中央筒部和环形腔高度、螺纹细节更明确；原图不足以确认这些重建细节。 | 基于真实原图编辑：保留原主体像素，只整理背景/扩画布；替换该条所有生成/未可靠核对的精修图 | 3:2，主体宽89%；手机3:2全件，中央筒不可压扁；主体居中，文本在图外，四边至少5%安全；低矮圆盘比例、中央孔、径向端口、外围耳位 |
| P05 `D:\lzz\raw\_content\images\products\Turning-1764418561811--0fef80039e.jpg` | `/media/product-studio/catalog-05-studio-v2-1536.webp`；来源多种轴套、箱体、转子合照；展示只有三类件，不能等同原合照供货清单。 | 仅调整布局/裁切：完整来源作为该条主图与目录卡；统一容器/白边，不重组或重建主体 | 4:3，合照宽88%；手机4:3全组，必要细节另放静态局部图；主体居中，文本在图外，四边至少5%安全；独立零件、长短比例、端面孔与侧孔，不拼成装配 |
| P06 `D:\lzz\raw\_content\images\products\Turning-2-1764418599598--a725a21893.jpg` | `/media/product-studio/catalog-06-studio-v2-1536.webp`；原六件包括块状件；展示选前三个圆柱/环形件并改变排布。 | 仅调整布局/裁切：完整来源作为该条主图与目录卡；统一容器/白边，不重组或重建主体 | 4:3，原组宽90%；手机原图全组；主体居中，文本在图外，四边至少5%安全；六件分组、槽口、侧开口、圆环与方块都不删除 |
| P07 `D:\lzz\raw\_content\images\products\Turning-3-1764418610761--08a5f82825.jpg` | `/media/gallery/fittings-gallery-v2-1200.webp`；来源多种接头/法兰，展示仅三件且重绘了口部、螺纹和孔口。 | 仅调整布局/裁切：完整来源作为该条主图与目录卡；统一容器/白边，不重组或重建主体 | 4:3，合照宽88%；手机全图+正文静态细节图；主体居中，文本在图外，四边至少5%安全；螺纹、软管接头、法兰、球头与不同接口均保留 |
| P08 `D:\lzz\raw\_content\images\products\Full-Service-CNC-Milling-Solutions-Custom-Metal-Parts-Manufacturer-with-Finishing-1764554912970--2f27187334.jpg` | `/media/product-studio/catalog-08-studio-v2-1536.webp`；来源多个黑色件，展示选成条状支架和圆壳；显示更整洁但减少原范围。 | 仅调整布局/裁切：完整来源作为该条主图与目录卡；统一容器/白边，不重组或重建主体 | 4:3，组宽90%；手机4:3全图；主体居中，文本在图外，四边至少5%安全；黑色表面、不同形态分离、孔和内腔；不推定涂层种类 |
| P09 `D:\lzz\raw\_content\images\products\Custom-High-Precision-Machining-for-Structural---Aesthetic-Components-OEM-1764555402077--60c319adfb.png` | `/media/product-studio/catalog-09-studio-v2-1536.webp`；来源为多色成组，展示抽出橙/蓝两件；明暗和色相并非受控色样。 | 仅调整布局/裁切：完整来源作为该条主图与目录卡；统一容器/白边，不重组或重建主体 | 4:3，主体群宽88%；手机完整组图；主体居中，文本在图外，四边至少5%安全；颜色差异、夹环/孔系、结构分离，不改造成同套配件 |
| P10 `D:\lzz\raw\_content\images\products\High-Volume-CNC-Turning-for-Complex-Internal---External-Features-1764555543979--ac36118db2.jpg` | `/media/product-studio/catalog-10-studio-v2-1536.webp`；来源多件批次，展示缩为轴/接头/套筒三件，内部不可见几何仍不能从图确定。 | 仅调整布局/裁切：完整来源作为该条主图与目录卡；统一容器/白边，不重组或重建主体 | 4:3，来源全组宽90%；手机4:3全图；主体居中，文本在图外，四边至少5%安全；小件多样性、内孔/细长轴、分立数量，不补剖面 |
| P11 `D:\lzz\raw\_content\images\products\High-Reliability-Precision-Machining-Turbine--Fluid---Complex-Curve-Component-OEM-1764555925002--928a6e0ea7.jpg` | `/media/product-studio/catalog-11-studio-v2-1536.webp`；来源开式曲叶轮含非圆中心沉腔；展示相近但重建反光和叶缘，无法证实工作性能。 | 基于真实原图编辑：保留原主体像素，只整理背景/扩画布；替换该条所有生成/未可靠核对的精修图 | 1:1，直径82–88%；手机全轮不裁叶尖；主体居中，文本在图外，四边至少5%安全；中心沉腔、曲叶朝向、叶根与外缘 |
| P12 `D:\lzz\raw\_content\images\products\Custom-Automotive-Performance-Parts-Manufacturer-and-Aluminum-Intercooler-Prototype-Supplier-1764817974310--6b57c81038.jpg` | `/media/product-studio/catalog-12-studio-v2-1536.webp`；源有竖向原型/芯体和端部纹理，展示清理背景并重建端部；整图容易被当完整已验证总成。 | 仅调整布局：intercooler-original首图，listing与batch-detail为独立来源；撤下生成端部；保留原芯体与焊接关系 | 3:4，主体高82%；手机3:4完整竖件，不横向cover；主体居中，文本在图外，四边至少5%安全；两片鳍片/芯体、弧形端箱、接口与实际方向 |
| P13 `D:\lzz\raw\_content\images\products\Custom-Billet-Aluminum-Engine-Cover-Manufacturer-and-Automotive-Prototype-Supplier-1764818167263--638b45f01e.jpg` | `/media/product-studio/catalog-13-studio-v2-1536.webp`；来源手持件有真实刀纹和弯曲轮廓；展示重建底部与另一侧，无法补齐背面/安装孔。 | 仅调整布局：engine-cover-original手持原照为首图和关联卡；保留手、刀纹与弧边，撤下补绘背面 | 4:3，件宽78–86%；手机4:3不裁弧顶与两端；主体居中，文本在图外，四边至少5%安全；原弧度、边缘、刀路纹理；不虚构底面和螺孔 |
| P14 `D:\lzz\raw\_content\images\products\Custom-Billet-Intake-Manifold-Manufacturer-and-Automotive-Performance-Prototype-Supplier-1764818472101--8eac77ab3f.jpg` | `/media/product-studio/catalog-14-studio-v2-1536.webp`；来源是发动机/进气系统总成，主图变成完整孤立歧管，无法建立一对一结构关系。 | 保留本条原始资料主体，仅调整布局；按本条原始身份标注，撤下该条后生成产品及目录卡 | 4:5，整机高78–84%；手机4:5全机，不抠选未确认歧管；主体居中，文本在图外，四边至少5%安全；完整系统、原安装方向、可见接口；不补隐藏runner |
| P15 `D:\lzz\raw\_content\images\products\Custom-CNC-Machined-Electronic-Throttle-Body-Manufacturer-and-Automotive-Prototype-Supplier-1764818699747--08c3a85146.jpg` | `/media/product-studio/catalog-15-studio-v2-1536.webp`；来源是彩色CAD；展示变写实金属壳、黑色电控盖和内部阀片，容易误认现有实物完整供货。 | 保留原始资料主体，仅调整布局：分别标assembly reference / CAD reference / design reference；撤下该条后生成产品及目录卡 | 1:1，CAD主体宽78–84%；手机1:1全装配外轮廓；主体居中，文本在图外，四边至少5%安全；分件颜色、主孔/轴位、电机/齿轮腔边界；不制造实物质感 |
| P16 `D:\lzz\raw\_content\images\products\Custom-Billet-Aluminum-Intake-Manifold-Manufacturer-and-Automotive-Prototype-Supplier-1764819347681--17eb362db7.jpg` | `/media/product-studio/catalog-16-studio-v2-1536.webp`；原图本身是设计参考式渲染，当前展示进一步重绘光泽/壁部；附加CAD是同类参考，未有受控模型或零件号证明同一设计。 | 保留原始资料主体，仅调整布局：分别标assembly reference / CAD reference / design reference；撤下该条后生成产品及目录卡 | 16:9，主件宽90%；手机16:9全runner，另开局部图；主体居中，文本在图外，四边至少5%安全；runner数量/连接走向、法兰孔位、可见boss和长底管 |
| P17 `D:\lzz\raw\_content\images\products\Custom-Billet-Aluminum-Intake-Plenum-Manufacturer-and-High-Performance-Tuning-Parts-Supplier-1764819540953--d22e858992.jpg` | `/media/product-studio/catalog-17-studio-v2-1536.webp`；来源含车间大件与另外端口/内腔参考；生成整体更完整，但不能补出受控内部几何。 | 仅调整布局：plenum-original首图；port/internal分别保留独立参考，不拼为同一受控剖面 | 4:3，件宽84–90%；手机4:3全件；竖向内腔图原比例独立；主体居中，文本在图外，四边至少5%安全；顶部转折、runner、底法兰与入口；不把三图拼成同一批件 |
| P18 `D:\lzz\raw\_content\images\products\Custom-CNC-Machined-Castings-Transmission-Housings---Pump-Bodies-1764757074510--2cf2756006.jpg` | `/media/product-studio/catalog-18-studio-v2-1536.webp`；来源铸壳中心有深色孔/内部件，生成重新建立孔内结构和铸面，不能证明材质/内部花键。 | 仅调整布局/裁切：完整来源作为该条主图与目录卡；统一容器/白边，不重组或重建主体 | 1:1，壳宽82–88%；手机全壳外耳不裁；主体居中，文本在图外，四边至少5%安全；筋、孔、底脚、原铸面/加工面边界 |
| P19 `D:\lzz\raw\_content\images\products\Custom-CNC-Turned-Stainless-Steel-Components-Manufacturer-and-Precision-Shaft-Supplier-1764816944325--cacdc81da0.jpg` | `/media/product-studio/catalog-19-studio-v2-1536.webp`；产品主图确为双法兰，不是shaft；生成删除OFF/ON、箭头和散螺钉。能力页却给本slug另一张锁销长件图，形成身份错配。 | 基于真实原图编辑：保留原主体像素，只整理背景/扩画布；替换该条所有生成/未可靠核对的精修图 | 4:3，双件宽89%；手机全双件，原字标另配静态细节图；主体居中，文本在图外，四边至少5%安全；两个独立法兰、原OFF/ON/箭头、孔和螺钉，不宣称完整阀门 |
| P20 `D:\lzz\raw\_content\images\products\Custom-OEM-CNC-Machined-Non-Metallic-Components-Insulating-Parts-1764557225251--5ba2c574ee.jpg` | `/media/product-studio/catalog-20-studio-v2-1536.webp`；来源和展示均圆形，但生成改变孔缘与反光，颜色不能识别材料或绝缘能力。 | 基于真实原图编辑：保留原主体像素，只整理背景/扩画布；替换该条所有生成/未可靠核对的精修图 | 1:1，圆件直径82–88%；手机整圆，不裁突出部；主体居中，文本在图外，四边至少5%安全；径向槽、外围孔、中心凸部与原厚度透视 |
| P21 `D:\lzz\raw\_content\images\products\Plastic-Parts-1764418490181--3049ef7c93.jpg` | `/media/product-studio/catalog-21-studio-v2-1536.webp`；来源多种板/齿形/盒状件；展示选三件且为重绘，不能代表所有聚合物或同批。 | 仅调整布局/裁切：完整来源作为该条主图与目录卡；统一容器/白边，不重组或重建主体 | 4:3，来源集合宽90%；手机4:3全图；主体居中，文本在图外，四边至少5%安全；多形态、齿形与板件的分离；不增加材料标签到照片上 |
| P22 `D:\lzz\raw\_content\images\products\OEM-Precision-CNC-Machined-Casting-Housing---Structural-Enclosures-1764756565591--89bc1a30be.jpg` | `/media/gallery/casting-gallery-v1-1200.webp`；带透明背景的精修与来源同一开式壳轮廓，内部孔与筋仍有重绘；阴影与抠边处理不能替代原铸面检查。 | 仅调整布局/裁切：完整来源作为该条主图与目录卡；统一容器/白边，不重组或重建主体 | 1:1，外壳宽84–90%；手机整外缘+完整中央孔；主体居中，文本在图外，四边至少5%安全；内筋、各开孔、周边紧固孔、非矩形外轮廓 |
| P23 `D:\lzz\raw\_content\images\products\OEM-Precision-CNC-Machined-Casting-Housings-1764756827055--12d46fe8bb.jpg` | `/media/product-studio/catalog-23-studio-v2-1536.webp`；来源为圆形盖体加上下同轴接管；展示改变视角成强对角姿态，深度和后部结构难以与原图核对。 | 仅调整布局/裁切：完整来源作为该条主图与目录卡；统一容器/白边，不重组或重建主体 | 4:5，主体高82–88%；手机保持原上下方向；主体居中，文本在图外，四边至少5%安全；圆形盖、上下接管、法兰耳、方向箭头 |
| P24 `D:\lzz\raw\_content\images\products\Precision-CNC-Machined-Castings---Custom-OEM-Housings-1764756207527--bd238e3ac3.jpg` | `/media/product-studio/catalog-24-studio-v2-1536.webp`；来源与展示都为偏置通道的不规则壳；透视与孔壁被生成重建。 | 仅调整布局/裁切：完整来源作为该条主图与目录卡；统一容器/白边，不重组或重建主体 | 4:3，件宽84–90%；手机4:3全件；主体居中，文本在图外，四边至少5%安全；大/小孔、法兰孔系、筋与外伸通道 |
| P25 `D:\lzz\raw\_content\images\products\Precision-CNC-Machined-Castings-Manufacturer-1764757607644--746269a403.jpg` | `/media/product-studio/catalog-25-studio-v2-1536.webp`；原壳看得到大孔与内腔，展示把高度、内壁、支撑筋绘得更规整；照片未证明隐藏齿/流道。 | 仅调整布局/裁切：完整来源作为该条主图与目录卡；统一容器/白边，不重组或重建主体 | 4:3，壳宽89%；手机完整内腔边界；主体居中，文本在图外，四边至少5%安全；大孔位置、周边boss、前开口、原铸面 |
| P26 `D:\lzz\raw\_content\images\products\Precision-CNC-Machining-for-Complex-Plastic-Geometries-and-Tight-Tolerances-1764558015887--2ed6fe3732.jpg` | `/media/gallery/plastic-gallery-v1-1200.webp`；原绿色多孔条批次，当前精修带透明背景，强化孔深与倒角；仍不能识别聚合物或公差。 | 仅调整布局/裁切：完整来源作为该条主图与目录卡；统一容器/白边，不重组或重建主体 | 3:2，组宽90%；手机3:2全组，不裁首尾孔；主体居中，文本在图外，四边至少5%安全；条数、逐排孔、端面堆叠与原长宽比 |
| P27 `D:\lzz\raw\_content\images\products\Precision-CNC-Turned-Brass-Components-Manufacturer-and-Copper-Parts-Supplier-1764759544533--731dc8eed7.jpg` | `/media/gallery/brass-gallery-v2-1200.webp`；来源为密集批次螺纹件，展示是三颗重构六角堵头，功能、尺寸和数量不能等同。 | 仅调整布局/裁切：完整来源作为该条主图与目录卡；统一容器/白边，不重组或重建主体 | 4:3，批次宽90%；手机全图+正文独立真实细节图；主体居中，文本在图外，四边至少5%安全；六角头、螺纹、混合朝向、实际批次密度 |
| P28 `D:\lzz\raw\_content\images\products\Precision-Low-Volume-CNC-Machining-Manufacturer-and-HMLV-Components-Supplier-1764758900962--0c522f190d.jpg` | `/media/product-studio/catalog-28-studio-v2-1536.webp`；原图为多排同族小壳，展示只两件且差异较大；并无“matched”关系证据。 | 仅调整布局/裁切：完整来源作为该条主图与目录卡；统一容器/白边，不重组或重建主体 | 3:4，批次高88%；手机竖向全排，不裁成只有两件；主体居中，文本在图外，四边至少5%安全；各行数量语境、重复壳轮廓、孔与腔 |
| P29 `D:\lzz\raw\_content\images\products\Precision-Machining-for-Functional-Plastic-Blocks---Structural-Components-1764557850986--18253f13c7.jpg` | `/media/products-editorial-20261014/polymer-support-block-1200.webp`；来源绿色圆形带弧形凹口件，现主图是矩形带阶孔支撑块，主体轮廓、孔与接口皆不同。 | 基于真实原图编辑：保留原主体像素，只整理背景/扩画布；替换该条所有生成/未可靠核对的精修图；形态改称Circular plastic component reference，保留中心孔周围4个小孔，不再称矩形块 | 1:1，圆件直径82–88%；手机完整外缘，不能切掉凹口；主体居中，文本在图外，四边至少5%安全；中心孔、周围4个小孔、环周弧形凹口与原层叠边缘 |
| P30 `D:\lzz\raw\_content\images\products\Precision-Small-Batch-CNC-Milling-Manufacturer-for-Complex-Aluminum-Enclosures-1764759147466--836aea071b.jpg` | `/media/product-studio/catalog-30-studio-v2-1536.webp`；来源多排矩形壳体，生成两件补出侧腔深度和孔位；原照片不足以把compound angle当该件事实。 | 仅调整布局/裁切：完整来源作为该条主图与目录卡；统一容器/白边，不重组或重建主体 | 4:3，批次宽90%；手机4:3全图+正文静态细节图；主体居中，文本在图外，四边至少5%安全；侧开口、内孔、外耳、重复样件差异 |
| P31 `D:\lzz\raw\_content\images\products\Precision-Stainless-Steel-CNC-Turned-Parts-Manufacturer-and-316L-Components-Supplier-1764815807487--200e743e3f.jpg` | `/media/product-studio/catalog-31-studio-v2-1536.webp`；来源有OFF/ON与箭头的回转组件和独立法兰；生成去掉标记，文本按普通长轴/接头解释过多。 | 基于真实原图编辑：保留原主体像素，只整理背景/扩画布；替换该条所有生成/未可靠核对的精修图 | 4:3，双件宽89%；手机全件+标记局部；主体居中，文本在图外，四边至少5%安全；侧向外形、法兰、原字标、孔轴线与外端 |
| P32 `D:\lzz\raw\_content\images\products\Precision-Stainless-Steel-Indexing-Plunger-Manufacturer-and-Spring-Loaded-Locking-Pin-Supplier-1764817299753--5e240a8195.jpg` | `/media/gallery/locking-pin-gallery-v1-1200.webp`；原图与精修主体一致，是盘头、螺纹、调节螺母和细端销组合；照片不显示内部弹簧与行程。 | 基于真实原图编辑：保留原主体像素，只整理背景/扩画布；替换该条所有生成/未可靠核对的精修图 | 3:2，主体长度90%；手机3:2整件，两端各留5%；主体居中，文本在图外，四边至少5%安全；盘头、长轴肩、螺纹、调节螺母、细端销，长度比例不重画 |
| P33 `D:\lzz\raw\_content\images\products\Small-Batch-CNC-Machining-Manufacturer-Complex-Aluminum-Housings-1764758302026--a5c49734de.jpg` | `/media/product-studio/catalog-33-studio-v2-1536.webp`；来源多件铝壳，展示变一个壳体并重建支撑外耳；没有配套盖板/垫片实物证据。 | 仅调整布局/裁切：完整来源作为该条主图与目录卡；统一容器/白边，不重组或重建主体 | 4:3，群宽90%；手机4:3全组；主体居中，文本在图外，四边至少5%安全；开腔、周边孔、壁与外耳、不同朝向 |
| P34 `D:\lzz\raw\_content\images\products\Small-Batch-CNC-Machining-Manufacturer-Precision-Aluminum-Components--HMLV--1764758090931--2d5650d334.jpg` | `/media/product-studio/catalog-34-studio-v2-1536.webp`；来源为同形回转件成排，展示仅三件同材质外观；混料计划图是另一组完全不同的生成件。 | 仅调整布局/裁切：完整来源作为该条主图与目录卡；统一容器/白边，不重组或重建主体 | 4:3，批次宽90%；手机4:3全排；主体居中，文本在图外，四边至少5%安全；长轴/法兰/槽的重复形态，保持原排列与比例 |

### 5.4 产品集合/补充资料与研究图位

| 图位 | 当前真实依据 | 确定处理与信息用途 | 画幅/主体与手机裁切 | 保留特征/下一步 |
| --- | --- | --- | --- | --- |
| Products overview形态合图 | /media/products-editorial-20261014/part-families-1200.webp；生成示意，无对应同批原照。 | 保留为形态索引示意；图注写示意；不得当产出集合或case cover。 | 3:2，群宽86%；手机3:2完整四类，不能裁剩一类。 | housing/shaft/brass/polymer分别可识别；链接形态目录。 |
| Batch planning合图 | /media/products-editorial-20261014/mixed-part-planning-1200.webp；生成。 | 仅P28/P34的BOM规划模块使用；每类旁写“separate part number”。 | 3:2，群宽88%；手机完整合图，BOM文字在图下。 | 壳盖、轴、接头、滚子、支架分立，不能暗示照片实际同单。 |
| P02 blade/root近景 | P02原叶轮真实照片；当前 /media/product-reading-20261014/impeller-geometry-1200.webp 为未可靠核对的生成近景。 | 撤下此生成近景，改原叶轮的静态真实局部裁切，HTML说明blade/root/hub；不重画叶片和孔。 | 3:2局部框，hub和叶根占70%，手机完整显示该真实局部；整体原轮仍同屏/邻接。 | 保留原叶缘与hub孔；不把纹理写成粗糙度或检验结果；进入5-axis能力。 |
| P12 two补充视图 | source-details/intercooler-original与intercooler-batch-detail；additionalMedia.kind=reference-photo。 | 首张用original；batch detail只解释重复鳍片/端部，不称同订单或冷却能力。 | 竖图3:4，主体高82%；手机原竖比例，不裁掉完整芯体。 | 鳍片、端箱、真实排列；接assembly scope。 |
| P13 hand-held原图 | source-details/engine-cover-original-1200.webp；reference-photo。 | 原图首图，手保留；下方直接列缺的underside/mating/bolt资料。 | 4:3，件宽80%；手机全弧面+两端，留手作上下文。 | 刀路与原弧边；不生成安装孔来填空。 |
| P16 runner CAD | source-details/intake-runner-cad-1200.webp；cad-reference。 | 独立CAD参考，说明未证实与列表图同受控版本；不作额外实拍。 | 约1.91:1，件宽90%；手机全长，细节另放正文静态局部图。 | runner/法兰/boss；接injector/fuel-rail图纸输入。 |
| P17 port/internal | source-details/plenum-port-detail、plenum-internal-detail；两个reference-photo来源文件不同。 | 分别标接口局部/内部形态参考，不能拼作受控剖面或同一件验证过程。 | port 4:3，internal 9:16；手机各自完整比例，不拼一横排。 | 孔口、过渡壁、工具纹理；接控制模型和压力条件。 |
| Covered parts原图组 | additionalMedia covered-wheels/covered-rollers/covered-shaped-parts。 | 保留三张原参考，不生成新包覆厚度；与齿轮集合明确分开。 | 轮4:3、滚子3:4、异形4:3；手机整件，无通用cover。 | 金属芯、表层、轴端/孔/连接；硬度/配方/粘接待定。 |
| Gear forms原图组 | additionalMedia gear-bevel-examples/gear-cylindrical-examples。 | 保留原集合；齿形图片帮助识别cone/cylinder，不派生齿数/模数。 | 4:3，两组群宽92%；手机完整图+正文真实齿细节图。 | 齿向、锥/柱形、hub/bore；接tooth spec/mate/inspection。 |

六工序与两集合各自的主要原照、目标画幅、主体范围与下一步见第3.7节S0–S7表，它们同样是具体图位计划。研究中不重绘已记录的夹具/机床/原件，也不为缺少结果补生成案例照。

### 5.5 Capabilities与Factory图位

本组I/R编号只在CAP蓝图中使用；网页路径接`D:/lzz/lzz/_react/public/media/`，原片R根见表前说明。产品条目优先执行第5.3节原主体规则，覆盖此前“目录仍留生成”的局部建议。

当前 web 图片根：`D:/lzz/lzz/_react/public/media/`，下表的 web 相对路径均接此根。真实原始资料根 R：`D:/lzz/原始资料/力智造-素材资料照片/力智造-素材资料照片/`。原始登记 `evidence.generated.json` 的 source 另包含上述双层文件夹前缀。当前 18 个使用中的 evidence 原始路径已检查存在；本轮看的是 web 文件像素，未逐张重新计算原始 hash。

处理列每图位只有一个主决定；“裁切布局”包括移位、去重和恢复自然比例，不允许补画设备/人/工件，不改变可见几何。所有图保留 provenance 与图注；AI 不挪到证据模块。

#### 能力概念图

| 图位/当前 web 路径 | 图片源检查观察与证明范围 | 唯一处理决定 | 最终构图/位置与参考 |
|---|---|---|---|
| I1 Hub `capabilities-section-20261014/capability-family-1200.webp` | 四种泛用形态完整、便于识别材质族；不是实际交付四件套。 | 保留 | CAP-H1 辅图，3:2、完整轮廓、白底；手机不撑满首屏。AI 图注保留 |
| I2 directory 的 `cnc-milling-service`、`cnc-turning-service`、`5-axis-cnc-machining`、`plastic-machined-parts`、`casting-machining`（目录 `capability-directory-20261014/*-800.webp`） | 工具、卡盘/工装与工件能区分五种概念；是通用渲染，不能作设备实拍。 | 保留 | H2 120–160px 辅图，3:2 contain，刀具与接近工件的位置均保留；每个链接旁明确文字选路 |
| I3 `services-reading-20261014/milling-features-1200.webp` | 可见口袋/内圆角/孔/薄壁；没有公差或实际测量信息。 | 保留 | P2/M5 小型工程说明，3:2 全形；可用网页 HTML 标注特征，不在位图伪写数值 |
| I4 `turning-reading-20261014/turned-features-1200.webp` | 轴向孔、肩、槽、外螺纹及横孔清晰；AI 图不能判定线程标准与 runout。 | 保留 | P2 3:2，全形，两端不裁；参数用旁边表格 |
| I5 `product-reading-20261014/impeller-geometry-1200.webp` | 当前为未可靠核对的P02生成叶片近景，不能确认具体叶根结构。 | 退出生成图，改原片真实局部 | 使用第5.3节P02原叶轮真实裁切，3:2、hub与叶根占70%，HTML标形态名称，不重画叶片/隐藏侧或写粗糙度数值；原整体保持邻接。 |
| I6 `services-reading-20261014/casting-stages-1200.webp` | 泛用粗坯/finished interfaces 对照；不是同一实际零件的前后记录。 | 保留 | casting P2，只标“AI blank/finished-interface concept”；从 sample 页重复段移出，3:2 两件完整 |
| I7 `capabilities-section-20261014/plastic-support-1200.webp` | 支撑板、四角夹持概念可见；不能证明实际夹具、材料牌号或挠度。 | 保留 | plastic M4，3:2 全 fixture；放在低应力/测量条件说明附近，不当真实 workshop photo |
| I8 `capabilities-section-20261014/aluminum-finish-1200.webp` | 相同 housing 的银/深色概念能解释 masking；不能保证颜色、膜厚或已处理质量。 | 保留 | aluminum M4 两物同尺度完整，不拆成“真实before/after”；处理标准由文字给出 |
| I9 `capabilities-section-20261014/sample-definition-1200.webp` | housing+outline sheets+caliper 是概念；图纸无批准信息，量具刻度不能读作实测。 | 保留 | S1 一次使用；H4 可缩略链接；3:2、零件/纸张完整，明确 not approved drawing/reconstruction record |
| I10 `gallery/rfq-gallery-v1-1440.webp`、`gallery/prototype-gallery-v1-1440.webp` | 单件+图纸、单件+组件两种概念；不证明样件批准/批次数量。 | 保留 | A1/L1 小图，3:2；数量/放行由文字定义，不加订单数字与客户标记 |
| I11 Factory `factory-unified-20261015/inspection-concept-1200.webp` | 探球悬在孔内，与孔壁有可见间隙；旁文讲 touch probe checks bore，但画面不能清楚解释接触测量。 | **非证据重生成** | 新概念 3:2，45°俯视；同一简单 block、3 个明确支撑点、夹具不穿透零件；探杆竖直，球接触可见内壁，接触点与球/杆完整；无屏幕读数、证书、品牌、合格印章。参考当前图与 R3/R4 的探头/工装关系；继续 AI 图注，绝不称 LZZ 实际测试 |
| I12 Turning/Stainless `turning-reading-20261014/shaft-retouched-1200.webp` | P19来源是带ON/OFF、箭头和散螺钉的法兰组件，当前误绑定P32锁销 | 纠正图位/归属 | P19卡恢复原法兰主体与本条链接，标题按法兰；该锁销精修不再绑定P19。P32按上表用自己的来源主体；不再用同一长销推所有stainless形态 |
| I13 铜 `brass-threaded-plugs-retouched-v1-1536.webp` / `gallery/brass-gallery-v2-1200.webp` | 具体P27图存在三件重构与原密集批次的差别；材料/线程/压力不能看色判断。 | 同步原主体并去重 | P27示例改第5.3节真实批次；铜用途照片用R13原brass-plugs，不保留上述精修作为P27例外。M3一次图，M5用文字/方法条件；主体完整、白底contain，不重画线程。 |
| I14 plastic `polymer-shafts-retouched-v1-1536.webp` | 精修与PTFE collection有关，但未经可靠几何/材料确认。 | 改用对应原片 | 复用R14 `source-details/plastic-ptfe-shafts-1200.webp`真实细长件，完整原比contain，caption归于源集合命名而非材质鉴定；不再让精修承担特定结构展示。 |
| I15 当前能力页studio零件示例 | 各产品的几何重建与来源冲突见35行原图表 | 同步产品原图表 | P3/M3/A3/L4/S2具体条目全部按P-ID恢复对应来源主体；不另作“能力页可保留生成产品”的例外。默认4:3完整contain；P15保持CAD身份，P29保持原圆件 |
| I16 `gallery/fittings-gallery-v2-1200.webp` / `gallery/casting-gallery-v1-1200.webp` / `gallery/locking-pin-gallery-v1-1200.webp` / `gallery/plastic-gallery-v1-1200.webp` | 具体条目身份和未可靠核对细节分别见P07/P22/P32/P26，透明底不等于结构已验证。 | 同步原主体和容器 | 关联卡和示例分别用P07/P22/P32/P26原主体，当前gallery留档；完整轮廓、统一白色图框、每页单次。Plastic按原多孔条组命名，不写复杂多方向几何已证实。 |

`CapabilityArtwork.astro` 当前统一写 `data-image-origin="AI-generated"`，但 I13/I14 对应几何图注为 AI-retouched source photograph。最终应把 origin 类型作为数据字段统一；这属于来源准确性修正，不应只改视觉标签。`partDisplay` 的 caption 同样应跟随已登记来源，而不是仅用是否在 studio 清单里推断。

#### 真实工序与场地照片

| 参考编号 / 当前 web 路径 | 原始来源（接真实 R 根）与图片源检查观察 | 唯一处理决定 | 构图规格/用途与限制 |
|---|---|---|---|
| R1 `evidence/workshop-wide-1600.webp` | `10，Producing Department-生产车间/1 (7).jpg`；机器行与通道，屋顶/地面占比较大 | 裁切布局 | F1 桌面可 16:7–16:9，重心机器行，保留近端整机与后方纵深；手机 4:3/自然比例，不强裁成极窄 banner。只证明照片中的场地和设备行 |
| R2 `evidence/workshop-operators-2025-1600.webp` | `10，Producing Department-生产车间/微信图片_20251104221718_145_246.jpg`；两位操作者与两侧机器可见 | 保留 | F2 4:3 自然比例，人物/机床上下文完整；source archive November 2025 不是重新核实的拍摄日/当前人数 |
| R3 `evidence/cmm-room-1600.webp` | `10，Producing Department-生产车间/1 (84).jpg`；完整 CMM/测台/环境 | 保留 | F4 竖幅 3:4/自然比例，宽 270–340px；测头、测台不裁；只证明设备可见，不证明当前校准/量程/精度 |
| R4 `evidence/cmm-detail-1600.webp` | `10，Producing Department-生产车间/1 (85).jpg`；探头、校准球、工件/夹具同场，不等于当时在量该工件 | 裁切布局 | 只在 Factory 方法补充可选查看；从所有能力页通用 note 的重复小图移除，保留质量链接。不得裁成虚假接触点/合格结果 |
| R5 `evidence/milling-enclosure-operation-1600.webp` | `20251203力智造产品加工过程中图片/产品4-铣加工/0a5402c99ab04d0826457ec57f22fbc8.jpg`；刀具/工件/虎钳与切屑可见 | 保留 | F3 或 aluminum M4，4:3 全 setup；手机不把夹持点裁掉；不证明合金、±0.01 或验收结果 |
| R6 `evidence/turning-operation-1600.webp` | `20251203力智造产品加工过程中图片/产品2-车加工/6c06c0a46e0bf5eae2d41d80616b236e.jpg`；卡盘工件、刀塔/冷却液，真实竖幅 | 裁切布局 | 竖幅图不要压成横向卡片或放大裁切；F3 竖图容器高度 280–360px、P5 可较大，完整工件与刀具关系；不去除机床标志伪成别的型号 |
| R7 `evidence/five-axis-machine-wide-1600.webp` | `20251203力智造产品加工过程中图片/产品1-五轴加工/d3928b0409cc533dffd9561fedbb4b63.jpg`；主轴/转台/工件的较完整关系，真实竖幅 | 裁切布局 | F3/P5 原比例 contain；不要与 R8 近似图同页并列放大；不能凭单帧证明 simultaneous path/行程/负载 |
| R8 `evidence/five-axis-operation-1600.webp` | 同目录 `db22827e75937add7eb7e1636af6ab94.jpg`；同 setup 较近视角 | 裁切布局 | 移为 matching machining study 的操作细节，P5 选 R7+R9 已足够；移动不是删除原证据 |
| R9 `evidence/five-axis-parts-1600.webp` | 同目录 `f743ece664101831b1f642aad280916f.jpg`；同组多面孔件，实际竖幅 | 保留 | P5 原比例；可以相邻文案标 common datums/feature relationships，不能写订单数量、grade、合格率或客户结果 |
| R10 `evidence/two-stage-first-1600.webp` / `two-stage-second-1600.webp` | `20251203力智造产品加工过程中图片/产品6-同一个产品-2个不同工序的铣加工/15af15bf59dadc3a3daf31888ada46b6.jpg` / `d31c871835ad1c575272ad874ebe3f55.jpg`；同一个件在两 setup 中 | 保留 | P5 两幅 4:3，保持相近视野与尺度；只标 source setup 1/2，不画不存在的 datum 数值；详细解释转至 study |
| R11 `evidence/turn-mill-operation-1600.webp` / `turning-parts-1600.webp` | 前者来源`20251203力智造产品加工过程中图片/产品3-车加工完成后的铣加工/44a8d35e74bf5e21513fcef0db0caf80.jpg`；后者为产品2组圆盘形态记录，不是同件追踪。 | 裁切布局及去重 | CAP-P5使用R6车削＋本行turn-mill-operation原图：R6竖幅完整、二次铣4:3完整，caption分别注明setup参考。turning-parts退出本工艺页、保留来源档案；不再规定setup＋forms组合，也不暗示两照片是同一受控订单。 |
| R12 `evidence/milling-enclosure-parts-1600.webp` / `aluminum-housings-1600.webp` | `20251203力智造产品加工过程中图片/产品4-铣加工/cad544d5f3f868d241fb876c7708b7b0.jpg`；`20251201/铝制零件/b9a2df3748dfeb55c9360a118a465f5d.jpg`；前者 circular recess 同组件，后者矩形 housing 群 | 裁切布局 | Aluminum M4 选一个 finished form；另一个留 matching study；原比例，不等高裁掉接口；材料名称归于 source collection，不视为已化验 |
| R13 `evidence/brass-plugs-1200.webp` / `source-details/metal-brass-batch-1200.webp` | `20251201/黄铜零件/7db93e137da06879e3824ff60569d9f1.jpg` / `592b2ac3c185c3d92dcc0c3899fc296e.jpg`；塞头与通孔 fittings 群 | 保留 | Copper M4 可一图一行比较 plug/fitting，1:1 原比例；不按颜色识别 C36000/材料限制或做压力合格证明 |
| R14 `source-details/plastic-ptfe-intermediate-1200.webp` / `plastic-ptfe-shafts-1200.webp` / `plastic-ptfe-batch-1200.webp` | `20251201塑料制品零件/特氟龙制品/半成品.jpg` / `特氟龙轴类.jpg` / `23f01cbcd25c7ad18df7e57adffaee9f.jpg`；未分离毛坯、台阶细长件、小孔板 | 裁切布局 | Plastic M4 选两张原比例 9:16/3:4，手机不连续铺三张长图；第三张移 plastic study；图注材料“identified as PTFE in collection”，不推断 food/medical/electrical qualification |
| R15 `source-details/peek-parts.mp4` / `peek-parts-poster.webp` | `20250108PEEK材质加工好的零件成品视频/95d6e9b27a297bf639638377fb028662.mp4`；source record 3.367s、544×960，poster 可见孔/平行槽 | 保留 | Plastic M4 原比例 9:16、controls、preload none；caption 原片且 grade 来自 collection，不能称已验证 PEEK性能。本轮只看 poster |
| R16 `evidence/shipping-example-1600.webp` / `shipment-2022-order-packing-1600.webp` | `17，发货资料/IMG_20221121_091701.jpg` / `IMG_20221120_161920.jpg`；大黄色支架、大型机械/环件与木箱，并非 sealing face/thread 的小件包装细节 | **补拍** | F7/L5 当前证据角色以真实小件包装补拍替换：4:3、俯视+45°两张；同一公开许可零件的独立分隔、接触面保护、标签/料号/版本/数量字段及封箱关系；机密字段实物先遮挡，不生成记录。旧图保留档案且只称历史发货准备，不能推断目的国/运输条款/到货 |
| R17 `source-details/metal-turned-shaft-1200.webp` / `metal-turned-batch-1200.webp` | `20251201/车加工零件/4b304ef1caca084caa8746bee45f21f2.jpg` / `7b0404487a3d7d289456cd0496839726.jpg`；前者与现 locking form 同形，后者细长台阶件行 | 保留 | 用来核对 I12 来源/形态，而非源图鉴材；需要真实 shaft 形态时优先 batch 记录，3:4 原比例、说明 source grouping |

#### 证据图位缺口

- 工厂设备清单（型号、类别、行程/负载/夹具限制、更新日）；照片只有具体场景，不能验证 `40+` 构成。
- 对应特征的脱敏实测记录、量具范围与校准材料，才能支持进一步精度说明。当前 `±0.01 mm` 条件口径保留即可，不扩张。
- 可公开的当前 ISO 9001 证书扫描与主体/有效期/范围核对。当前授权文字可保留，不能重生成证书。
- 脱敏报告样本含 part/drawing revision、feature、limit、method、result、sampling、review reference；目前页面是请求报告，不是已提供下载的证据。
- 铸件供坯/定位/加工余量与 finished interfaces 的同件实际照片，才能扩展真实 casting process study。当前 AI 对照继续只当教学概念。
- 小 CNC 零件的真实保护与标签包装照片，按 R16 规格补拍。

### 5.6 Company与Resources图位（CO-I）

以下I1–I19对应第2节CO-I1–CO-I19；网页路径接`D:/lzz/lzz/_react/public`。多页复用同一原片时，按语境决定自然比例而非一律同高。原文明确未单独看像素的图保留该状态，不冒称已逐图审美验收。

以下是目标图位规格，不是已实施CSS。原件保持原比例、全信息，无生成重绘、背景替换、设备补齐或证书修复。需要概念说明的地方仅保留**现有且有可见AI标签**的两张有效说明图；缺少真实证据时，用HTML条件/真实请求入口表达，不生成“证明”。资料目录、RFQ、比价、样件批准、批次、FAQ、Quote、Privacy、404均不新增图。

| 图位 | 当前真实参考（相对 `D:/lzz/lzz/_react/public`） | 选择原因与证据范围 | 唯一处理及桌面／手机规格 |
|---|---|---|---|
| I1 公司/地址车间 | `/media/evidence/workshop-wide-1600.webp`，1600×1108 | 清楚显示设备列与生产环境；不证明当前台数或在产排程。已看像素。 | 保留原图，完整自然比例；桌面配文图宽约540–620px，手机可用宽；不作cover背景、不压成横幅。overview/profile/contact每页最多1次。 |
| I2 来访零件讨论 | `/media/company-news/australian-visit-03-1600.webp`，1279×1706 | 实际可见双方手持壳体，确实支持“looking at a component”；不证明验收通过/客户成果。已看像素。 | 用03替代overview/profile/news index及文章01承担的“零件讨论”图位；完整竖幅，桌面宽320–390px，手机最大可用宽，人物手部与零件全部保留；图注不写实测/批准。 |
| I3 Profile车间纵深 | `/media/evidence/workshop-aisle-1200.webp`，1200×1601 | 原始生产走道；不是公司规模数据证明。像素未单独打开，引用/比例已核。 | 保留，仅放工程范围模块。桌面高约460px、宽由比例求，手机不超过整栏、不强行满宽拉成长屏；不裁掉走道来制造新场景。 |
| I4 峰会纪实 | `/media/company-news/china-africa-summit-01-1600.webp`，1600×1088 | 代表与活动背景，支持attendance/backdrop；不支持合作/签约。已看像素。 | 保留自然比例；新闻封面/纪实条目进入内容页，正文图片静态。保留人物全身、活动背景，不截取活动Logo伪作客户徽章。 |
| I5 高新技术证书 | `/media/High-tech-Enterprise-Certificate-1764396986484--69861fe474.webp`，650×456 | 可见企业名、日期、printed three-year validity/印章；非ISO。已看像素。 | 保留完整静态原件，不超原像素放大、不裁边；连续资料行桌面宽约400–520px、手机整栏。English summary/issued date/printed validity直接在图旁或下方显示；不把证号用于推断当前状态。 |
| I6 科技型中小企业 | `/media/Zhejiang-1764397018975--75b9eb4d46.webp`，549×776 | 省级企业认可；原件无明确issue date。已看像素。 | 保留完整竖幅，桌面宽约300–340px、手机可用宽；不按横证书固定同高裁切。可见summary写无明确日期，不从证号年份补日期。 |
| I7 教学基地牌 | `/media/Artificial-1764396998946--413c4183ea.webp`，1127×815 | 原件确为“人工智能精密制造实践教学基地”，落款2023年11月；不是AI生成图，也不是ISO。已看像素。 | 保留静态原件完整边框/学校/公司/日期，桌面400–520px、手机整栏；英语标题可保持Precision manufacturing teaching base，说明保留教学合作属性。不能因文件名Artificial判为生成素材。 |
| I8 团队纪实 | `/media/evidence/team-2025-evening-group-1600.webp`；同源 `/media/company-news/team-may-2025-01-1600.webp`，1600×1200 | 团建合影，支持团队活动。已看像素。 | 保留1次/页面，自然4:3，全体人物与环境保留；桌面约500–560px宽，手机整栏；不裁成个人“客户证言”头像。 |
| I9 CMM设备 | `/media/evidence/cmm-detail-1600.webp`，1600×2133 | 可见探头/工作台/设备；不能证明校准、当前量程、被测结果。已看像素。 | 保留于How we work inspection；桌面最大高480px，宽由3:4求，手机最大高400px且完整contain；图注紧邻“methods/reports agreed”。不复制为每篇采购指南的通用装饰。 |
| I10 历史保护包装 | `/media/evidence/shipping-example-1600.webp`，1600×1200 | 2022年准备包装的零件/木箱语境；不等于当前标准或交付证明。已看像素。 | How we work与shipping各保留一次，自然4:3，桌面宽≤540px，手机完整显示；November2022紧邻。不得换成带新订单/目的国的生成货物图。 |
| I11 五篇新闻封面 | N表指定03、summit01、May01、November01、2024-01 | 每图对应本篇事件；全组引用共25张，来源路径与SHA在news registries。封面均已看像素。 | index统一“事件行”，保留源比例；桌面图列按各图比例取得相近高度220–280px，手机图在标题/日期后、自然比例。卡片可进入文章，文章内图静态；不把横封面和竖封面硬裁同一3:2。 |
| I12 关键特征零件 | `/media/evidence/multi-feature-milling-parts-1600.webp`，1600×2133 | 可见孔列、凹腔、零件形态；不证明批数量、合金或公差。已看像素。 | 保留于geometry/route模块，完整竖幅，桌面最大高440px，手机最大高380px；caption明确geometry reference。不能标注虚构datums/数值成工程图。 |
| I13 工艺现场三图 | `/media/evidence/turning-operation-1600.webp` 1600×2133；`milling-enclosure-operation`、`five-axis-operation`均1600×1200 | 原始车/铣/多轴setup；照片不给制造能力数值。引用/实际文件尺寸已核，本轮未逐张放大像素。 | 保留一组，桌面图列按原ratio约0.75:1.33:1.33、最大同高300px，非cover；手机改单列完整图，最大高340px，字幕与对应study紧随；不保留旧“手机3列120px小图”要求。 |
| I14 处理面/接口示意 | `/media/resources/finish-interfaces-v1-800.webp`，800×600，现有AI | 红外表面/中性孔能解释coat/mask与接口，是用途明确的示意。已看像素。 | 保留现图与生成来源；桌面宽约360px、手机最大320px/自然4:3；可见caption解释红色＋AI-generated illustration。不得称实际LZZ表面处理结果。 |
| I15 涂层原照 | `/media/source-details/finish-coated-round-1200.webp`、`finish-coated-bars-1200.webp`，均1200×675 | 源组标为Teflon，图像显示圆件/长孔条；不能凭外观验证化学成分/工艺合格。两图已看像素。 | 两图原16:9静态完整显示，桌面并排、手机单列；caption保留source collection attribution，不去生成修复手机水印。与实心PTFE区别放在图组前。 |
| I16 保护包装示意 | `/media/content-guides/packing-review-v1-1200.webp`，1200×800，现有AI | 隔离保护/孔口保护示意；与2022真实照片角色不同。已看像素。 | 保留于Protection唯一图位，完整3:2，桌面约480–540px、手机整栏；AI标签可见。不能宣称标准包装、全部客户订单或运输验证。 |
| I17 历史订单包装 | `/media/evidence/shipment-2022-order-packing-1600.webp`，1600×2133 | 历史包装准备，源文件2022-11；无目的国/承运人依据。引用和尺寸已核，未单独放大像素。 | 与I10/I18同一archive，完整竖幅；桌面高约340–380px、手机自然单列且不裁字。保留历史caption。 |
| I18 历史待运货物 | `/media/evidence/shipment-2022-prepared-load-1600.webp`，1600×2133 | 历史shipment preparation；不能改写completed delivery。引用和尺寸已核，未单独放大像素。 | 同I17；不新增客户/货值/国家标签；不放在新闻作为新交付。 |
| I19 退出主阅读的概念图 | `/media/about-redesign-20261014/drawing-review-1200.webp`、`inquiry-parts-1200.webp`，均1200×800 | 两张确为有AI标签的通用概念；不回答“谁做什么”或“如何联系”。两图已看像素。 | 从How we work/Contact图位删除，保留原资产/来源档案；How we work改HTML责任/阶段，Contact让真实联系方式和地址居前。**不生成替补**。 |

Australian-visit-01的保留方式：它属于5张原始事件集合，继续留在N1第二组，以“Conversation during the visit”这类可见事实描述；不删除源文件、不补绘桌上零件。原图墙面年历疑点作为内部证据待办，不把疑点写成公开猜测，也不把精确拍摄日继续扩展到图注。

该疑点已追到原始JPG：`D:/lzz/原始资料/力智造-素材资料照片/力智造-素材资料照片/20250107澳大利亚客户上门参观/ede21f91855931fcf1764bd51accbbc1.jpg`，1706×1279；SHA-256为`667615cc541fdda632a38619143b6e335fe1d070eb627121319234f28cf65037`，与companyNewsSources记录相符。原件未读到DateTime/DateTimeOriginal/DateTimeDigitized日期EXIF，不能以EXIF消解日历与源分组日期冲突。

### 5.7 下一阶段制作的明确范围

明确需要ImageGen制作：HOME-I1通用加工场景；CAP-I11接触测量概念。可使用ImageGen的编辑范围：第5.3节单件背景/画布，须保留原主体像素再合成，输出与原件逐点核对。其余图位主要是保留、重新排版或真实补拍；Company/Resources不为增加视觉变化新增通用采购概念图。所有生成输出登记prompt、原参考、生成/编辑类型和使用图位，保留来源标签，不作为证据。


## 6. 新视觉规则与旧 DESIGN.md 的差异

### 6.1 唯一视觉基准

视觉方向为克制的工业采购网站：保留LZZ蓝色标识、红色主动作、白色主背景、黑灰文字；以清楚的实体与技术信息建立质感。背景分区服务于资料分组，不每节换色，不用巨大留白掩盖内容问题。以下为下一阶段实施值，**不是当前页面实测值**。

| 项目 | 桌面规则 | 手机规则及例外 |
|---|---|---|
| 断点 | 1100px以上桌面导航；768–1099平板；767及以下手机 | 统一CSS与导航JS断点；不得同时保留旧960/当前1101两套口径。 |
| 版心 | 常规最大1280px，视口1100以上左右至少40px；指南外框1040px、主正文最大760px | 768–1099左右32px；手机左右22px；320px左右18px。正文不可被固定min-width撑开。 |
| 字体 | H1保留Georgia，正文/表格/按钮Inter Variable；H2/H3用Inter | Contact取消Times New Roman独立例外，回同字体；不用增加新字体营造差异。 |
| H1 | Home72px/1.07；概览/公司56px/1.12；产品/服务/研究48px/1.14；指南/任务44px/1.16 | Home40px/1.12；概览/公司36px/1.16；产品/服务/研究34px/1.18；指南/任务32px/1.2。长标题自然换行，不给每页同样的br；功能词不孤行。 |
| H2/H3 | H2 32px/1.25，H3 22px/1.35 | H2 26px/1.28，H3 20px/1.35。新闻短子题可H3，不用层级凑模块。 |
| 正文/表格 | 正文17px/1.7，技术值16px/1.6；阅读行宽60–72字符，单段通常不超过5行 | 正文16px/1.65、表格值16px/1.6；参数不可通过小字省空间。 |
| 标签/图注/帮助 | 必要标签、图注、字段帮助至少14px/1.5，文字色#606266 | 同为14px/1.5；不使用12px承载材料条件、AI身份、日期或文件范围。 |
| 颜色 | #191B1D正文、#606266辅助、#CF141A主要行动、#FFFFFF主底、#F6F6F5任务背景、#DEDEDB分隔 | 正文/帮助对比至少4.5:1，控件边界/焦点至少3:1；不降低信息对比制造“轻”。 |
| 垂直间距 | 主要主题之间88px；同主题子组40px；标题到引言20px、引言到数据/图片28px；段落16px | 主题56px；子组28px；标题到引言16px、内容间20–24px。指南可用48px主题距，短新闻不强加空区。 |
| 首屏 | 首页内容区680px；普通概览/详情不设100vh；文图依据内容自然高，技术入口在首个主要块内 | 首页全首段目标≤760px（含导航）；产品/工艺图最大高320px；指南无首屏装饰大图；询价首字段目标在首个手机屏内可见。极长breadcrumb压为父级路径＋当前标题独立呈现。 |
| 图文关系 | 常规双列5:7或7:5，列距48px；图注跟随图本身宽度，图像居中时caption也同容器 | 同一DOM任务顺序单列。不要用全局“图必须在前/文必须在前”；按第2节逐模块规定。 |
| 产品/概念图 | 默认4:3 contain；产品表已指定1:1/3:2/竖幅时按其例外；完整主体通常占长边76–86% | 同一主体完整保留，不cover裁孔/螺纹/叶片。极细长件用3:2横向完整或竖幅自然图，不能强放方框撑满屏。 |
| 真实照片/文件 | 工序4:3或原比；竖幅保留自然比例且桌面最高480px；证书完整不裁、不超源图像素硬放大 | 竖照通常最高400px，完整contain，可留白；纪实人物/全组允许自然纵向更长。证书正文摘要不依赖读缩略图。 |
| 网格/表格 | 产品目录3列；形态入口3×2；有意义的参数保留语义表头，不一律卡片化 | 产品目录用112px缩图＋信息单行条目；形态2列；宽对照表按行转Feature→Define→Check带标签结构，保留所有列义。真正二维数值矩阵才可加可识别的横滚，不裁正文。 |
| 卡片/边框 | 仅目录、比较项或可导航实体使用卡片。默认平面，无阴影；分隔1px | 不将每段正文包边框；产品信息可用连续分隔行；不强制圆角，工具输入4px、内容图0px。 |
| 按钮 | 主要动作50px高、左右24px，内容自适应；次要入口可文字链接，不把Browse all stretch为整列 | 最小触达44px，主要动作48px。表单主动作可全宽；正文短链接不无故占整屏宽。 |
| CTA节奏 | 统一任务名称Prepare RFQ email；服务/产品可首屏＋末尾同一动作，正文不再每节插入。每页最多一个主要“询价任务” | 新闻/指南结尾用紧凑动作；Privacy/404不用完整销售块。全站导航动作保留。 |
| 图片交互 | 保留最新静态图片规则：无图片打开原文件、zoom、modal、独立焦点。图片作为卡片一部分可进入内容页 | 视频native controls、真实TXT下载、有效文件请求正常保留；来源静态同屏图，不用raw打开代替来源解释。 |
| 动效 | 采购正文、标题、参数、图片默认立即清楚，无blur/reveal遮读；按钮hover/focus 160ms颜色/边界反馈 | 尊重prefers-reduced-motion；取消内容上升/模糊动效，锚点尊重偏好并避开sticky header。 |

具体图位构图以第5节为准。颜色/字体/按钮统一，不意味着所有页面共享split hero、三列卡片或相同高度。原比例图片导致的自然差异不是缺陷；与任务无关的空白、缩略主体过小、重复大图才需要改。

### 6.2 与旧规则的最终关系

本轮没有找到项目/祖先目录中的额外AGENTS视觉约束；遵守用户提供的AGENTS。DESIGN.md是现状与历史设计记录，不是本次最终答案。下表“废弃”是下一阶段不继续作为视觉约束，**本轮不删除或覆盖文件**。如执行阶段发现新的AGENTS要求，先记录适用差异，不默默删除。

| 旧规则/位置 | 决定 | 新规则 |
|---|---|---|
| 内容准确、必要功能、claim ledger、询价草稿边界 | 保留 | 第1/4节事实和条件不可因版面删减。 |
| Georgia H1 / Inter；LZZ标识、红色行动、黑白灰 | 保留 | 只调整任务字号/层次，Contact字体并回统一体系。 |
| 1280主版心、68ch正文、证书完整、照片自然比例 | 保留并明确例外 | 指南1040外框/760正文；图位控制最大高度和完整主体，不硬裁所有画幅。 |
| “资料页不新增目录/折叠正文” | 保留主原则、明确已有例外 | 不新增每篇指南TOC；现Ordering四阶段/FAQ主题锚点保留；RFQ必要字段和证书范围默认可见。 |
| 所有内容4–7模块 | 修改 | 按任务定数量：短新闻/404可2–4，Factory必要证据可8；不得凑卡片或删验收条件。 |
| 全站统一split hero / reading模板覆盖各工艺布局 | 废弃固定版式要求 | 工艺、材料、样件、批次分别按CAP蓝图；共享组件承载语义，不强行锁内容次序。 |
| 手机一律文字在前；后追加又要求一律图在前（约490–501等） | 废弃两条自动规则 | 以第2节每个模块的任务顺序决定；DOM顺序跟阅读顺序一致。 |
| 证书或来源可放大/打开的早期要求 | 废弃交互要求 | 服从最新静态图片规则（约550–554）；原件在页面完整显示，日期范围HTML可读。 |
| 最新全站图片静态；卡片可进入内容页 | 保留 | 当前AboutPhoto/AboutCredentials/ProductArchiveViews等原图链接及“open image”文案列为后续修正，不当作新设计要求。 |
| 全页通用rounded RfqPanel、62px大题 | 修改范围 | HOME/长产品服务可单独设计尾部；资料/公司/新闻用紧凑任务结尾，Privacy/404无销售面板。 |
| Resources 14页/9指南/旧分类页/首屏概念图 | 废弃作当前状态 | 当前12主页面、8指南、三菜单入口，以本方案清单为准；历史验收只保留原日期。 |
| 手机3列120px工艺图、技术表标签12px | 修改 | 原工序图手机单列完整、关键标签14px；内容不靠小字塞入。 |
| Company documents独立菜单/页 | 修改为当前真实结构 | profile#documents，保留旧入口兼容，不恢复同主题中转页。 |
| blur/rise 700ms及手机520ms内容动效 | 废弃采购阅读区域的动效 | 可读内容不等待动效；只保留必要控件反馈。 |
| 旧测试“passed”与旧方向稿 | 保留为历史证据，废弃作当前验收结论 | 下一阶段按第7节逐URL记录，不用一次旧截图证明全站现状。 |

### 6.3 SEO/GEO 与内容实施规则

每个落地页保留唯一清楚H1，H2按用户问题划分，不以kicker当结构。长legacy slug不要求同样长H1；P14/P19等以来源身份纠正标题、description、alt、related文案，URL本轮与后续默认均保留。

指南开头直接给本题答案与适用条件；具体材料、单位、时间起算、测量状态、采购责任必须在可见HTML里。图注回答“来源类型/可见什么”，不写成关键词串。AI-generated、AI-retouched、CAD、原始工序、集合分别登记；`CapabilityArtwork`等组件不再硬编码同一origin覆盖不同来源。

内部链接按任务分流：产品形态→对应能力/工序；工序→本题图纸要求；指南→采购下一步；企业资质→profile文件；检验→Factory。短说明可重复，完整技术解释不跨多页全文复制。每页一般保留2–3个相关内容入口并说明差异；不把所有页面都链接到同两篇研究。

Structured data仅描述可见内容和真实实体。研究不是默认客户CaseStudy；产品参考不添加Offer、price、availability、review或虚构SKU。FAQ只标可见真实问答；任何Schema调整都须与HTML同批核对。保留canonical、robots、现有语言/技术配置；本轮不作生产索引或搜索效果结论。

不新建薄的材料/行业SEO页，不按筛选组合生成索引副本。筛选URL用于保存浏览状态，canonical保持主目录；具体状态写入/恢复逻辑作为后续功能改进，实施前核对现有查询参数兼容。

## 7. 分批实施与可检查验收

### 7.1 按依赖实施，不逐页盲目套模板

| 批次 | 具体交付 | 完成门槛 |
|---|---|---|
| 0. 保护与取证 | 检查当时dirty tree；对明确文件保存可回退检查点；冻结参数、URL、锚点、下载、询价上下文与图片来源映射 | 不提交他人未审工作，不用git add -A；检查点可定位，原图不覆盖。当前方案不授权生产部署。 |
| 1. P0内容/身份 | P14/P15/P19/P29/P31供货身份；能力页P19映射；RFQ可见字段；Profile文件范围；Australian图文/日期待核 | 一张图/一个链接对应正确条目；未知值明确；条件默认可见；真实资料缺口不生成。 |
| 2. 基础阅读组件 | 按第6节收敛字体、间距、图片frame、表格行/标签、紧凑closing、静态source引用；逐一迁出全局覆盖 | 一处样式归属清楚；先完成目录、工艺、材料、产品、指南各代表及长短变体；没有新增全局!important覆盖堆叠。 |
| 3. 浏览与转化主线 | Home、Capabilities、工艺/材料/样件/批次、Products三个目录及35详情 | 从任一落地页能理解供应范围、关键资料和询价方式；分类状态可分享/返回；目录计数与集合区分准确。 |
| 4. 真实记录与企业评审 | 8 studies、Factory、About/profile/how-we-work/contact、5篇news | 原照片、日期与证明范围匹配；检验方法/文件需求可见；无客户成果、当前设备或交付伪证。 |
| 5. 资料与草稿 | Resources12页、Quote、Privacy、404；处理重复入口与所有legacy路由 | 8篇指南各自职责清楚；下载与草稿功能保留；隐私说明等于实际行为；旧锚点仍达有意义内容。 |
| 6. 图片制作及全站回归 | 仅按第5节列出的图位编辑/生成；补拍资料到位后替入对应证据槽；统一各类页最后检查 | 非证据图有明确来源；具体产品结构逐项对原件；未取得真实资料时保持待补状态，不上假图。 |

图片计划不是要求每个页面重新生成：能保留的原图保留，容器问题先改布局；有结构冲突的产品先回真实来源主体；只有明确的非证据说明场景进入ImageGen制作。

### 7.2 必须逐项验收

1. **内容与事实**：对84个业务URL建立实施前后差异表；参数、牌号、数值/单位、条件、独有FAQ、输入、记录、隐私/错误信息不缺失。抽查不足以替代35产品的来源身份核对。没有发布缺证据的新能力/客户/认证承诺。
2. **页面结构**：每URL标实际使用蓝图/例外。首屏主题清楚，关键适配/供货范围不排在多屏重复图之后；图纸指南先给答案，Quote早见字段。删除无信息kicker及机械重复块，不靠隐藏正文或压小字号减页长。
3. **响应式**：先逐业务URL在1440×1000与390×844实看首屏、参数/关键内容、图组和结尾；再对长标题、竖证书、细长件、宽面板、多列参数、筛选、长新闻在320/768/1100补测。每URL保存覆盖状态；同模板推导与实际视觉通过分开。页面无横溢出、图拉伸、内容相互覆盖或与主题无关的异常空白。
4. **图片**：全部引用可加载、width/height/aspect-ratio预留空间、srcset/sizes正确；源图不失真、不裁关键几何。图注跟随图片边缘，14px可读；生成标签可见且origin登记正确。证书/工厂/检验/交付无生成替代。图片静态，卡片正常去内容页，视频controls正常。
5. **交互与询价**：菜单文字/展开键、键盘/focus/Escape、筛选默认/组合/空结果/返回状态、新闻筛选、必要展开、Copy/Download逐项检查。Quote验证Name/Message、Email或Phone联合条件、错误关联与恢复、上下文更换、刷新恢复、storage blocked/full、Clear、Edit、Copy失败回退、Save、mailto。只验证到用户可审草稿，不自动外发询价。
6. **链接与URL**：扫描全部内链/fragment、35旧详情、8旧cases、Resources与Factory迁移；检验301/302/307/308实际响应与meta/JS shell差异、query/hash映射、canonical目标、无循环或丢失有用锚点。第3节现状表不是生产HTTP验证。
7. **工程/SEO**：实施后运行当前项目`npm run check`、`npm run build`、`npm run test:seo`与`node scripts/verify.mjs --static`，修复与本批改动有关的失败。保留必要title/description/canonical/robots/Schema/heading/alt和sitemap入口，不生成筛选索引垃圾页。此轮文档审查未执行这些会更新产物的构建检查。
8. **验收证据**：记录执行日期、源码版本、真实视口、实际URL、截图位置/展开状态与未验项。滚动/字体/图片加载稳定后截图；页眉重复、移动残影等采集问题先排除，不能直接报网页缺陷。最终报告分别说明本地、候选预览、生产，未部署不写已上线。

### 7.3 本轮交付与未验证事项

本轮交付是本文件、全路由/媒体清单与独立审查证据。未将旧build/test通过结论复用到现状；未逐条验证生产HTTP、外部平台、全部视频、下载/草稿输出或真实证书有效性；未进行全页面连续像素验收。第3节逐URL状态与第4节待补资料为后续实施的明确输入，不是用编造内容填平的空缺。
