# Resources 页面图片与内容协同优化提案

日期：2026-10-13　版本：v1.2　状态：v1.1 推荐方案已获授权并实施，本地验证完成

> 实施记录：第一阶段的阅读顺序、图片尺寸与图文配对已完成；第二阶段 T06–T09 共4张通用说明图已生成并接入 P09/P10。T01–T05 为排版后仍有必要才启用的原图优化，本轮未启用，现有原始照片文件保持不变；T10保持撤回。下文保留提案及候选制作要求，原有“待生成／建议”是提案阶段状态，实际完成状态以本记录为准。未部署。
>
> 已验证12页的桌面与手机布局及25项关键断点，图片均加载，无横向溢出或文字截断；原图弹窗、Esc关闭／焦点返回、RFQ下一步链接和手机Resources二级导航通过。规范见[DESIGN.md第7.5节](D:/lzz/lzz/_react/DESIGN.md)，生成来源见[四张说明图登记](D:/lzz/lzz/_react/docs/resources-illustrations-20261013.json)。

## 1. 处理范围与结论

本提案覆盖当前本地网站的 **Resources 总览、3 个分类页、7 篇指南及 FAQ，共 12 页**。范围来自实际 Resources 下拉导航、总览页分类入口及分类内文章链接。Quality、Factory、Capabilities、Products、Cases、About 和 Contact 仅作为现有链接目的地，不纳入页面优化范围。

审查对象为 `http://127.0.0.1:4323` 的当前页面，项目为 `D:/lzz/lzz/_react`。本轮逐页读取模块、正文及图片，查看了桌面 1440×900 和手机 390×844 下的 24 张完整页面截图，并核对现有图片文件及来源登记。

**建议先处理图文关系与展示尺寸，再生成确实有解释用途的图片。** 目前主要问题是：合作流程页的工厂照片过高；工艺选择页的现场照片比例差异较大；材料与表面要求页的长文字缺少对应说明。现有白底 RFQ 图、材料形态图和真实包装照片均有保留价值。FAQ 继续采用无图问答。

v1.0/v1.1阶段只交付提案，没有执行ImageGen、修改代码或部署；v1.2记录用户授权后的实施，完成范围见文首记录。v1.1根据“阅读流畅、图片有秩序”的目标收紧方案；保留 [v1.0 原提案](D:/lzz/lzz/_react/docs/resources-image-review-2026-10-13/proposal-v1.0.md)。下面的任务是候选制作清单，按阶段选择，不要求一次执行全部任务。

### 1.1 决策与优先级

| 决策 | 本提案中的含义 |
|---|---|
| 保留 | 保留图片文件；允许建议调整所在模块的尺寸、位置、图注及图文配对。原本无图的模块可保留无图结构。 |
| 优化原图 | 从原始照片制作展示副本，调整曝光、色调、裁切或背景干扰；不改变零件和现场事实。 |
| 基于原图重新生成 | 以现有示意图为视觉参考，重新组织说明内容。当前推荐方案不需要启用此类；P11 现有首图保留。 |
| 完全重新生成 | 新增通用技术示意图，解释正文已有概念；不呈现为实际客户零件、检验结果或企业证明。 |

P1 表示直接影响理解、阅读顺序或图片占比，建议优先处理；P2 表示辅助说明或视觉细节，可在 P1 完成后处理。

同一图片在不同位置可以承担不同用途。原始素材及现有共享文件保留；获批的展示副本采用独立新文件，只更新指定 Resources 使用位置，不自动影响其他页面。

### 1.2 推荐采用的三种页面结构

| 页面结构 | 对应页面 | 推荐阅读顺序 | 图片数量与组织 |
|---|---|---|---|
| 资料入口 | P01、P04、P05、P07 | 标题与短导语 → 可选主题图 → 任务入口 → 询盘 | 每页最多一张主题图；入口列表使用文字。P04 的涂层原图属于正文实例图组，不另加主题图。P05 运输入口不再重复展示档案照片，照片保留在 P03/P12。 |
| 阅读指南 | P02、P03、P08、P09、P10、P11、P12 | 标题与短导语 → 连续的主题章节 → 相关资料 → 询盘 | 图片贴近所解释的章节，每章最多一个图组；正文不被侧栏出口打断。真实照片与技术示意分别成组。 |
| 快速问答 | P06 | 问题 → 直接答案与必要条件 → 详细指南入口 | 保持无图，不增加装饰性图片。 |

每章内部使用一致顺序：标题 → 简短解释 → 相关图片或图组 → 要点与条件 → 有需要的阅读入口。桌面允许文字与图组并排，手机以相同语义顺序展开。图片不承担长篇字段、精确参数或商业条件。

### 1.3 推荐实施节奏

1. **先统一版式，使用现有图片。** 缩小 P03 工厂图；统一 P09/P12 图组的展示高度；修正 P04 裁切；后移 P08/P10 的相关入口；移除 P05 运输入口的重复照片。此阶段不依赖新图。
2. **再补两处解释空缺。** P09 制作一个几何对比图组，含 T06/T07/T08 三张独立小图；P10 制作 T09 一张遮蔽与保护接口图。其他页面保留当前图片。
3. **最后决定是否优化照片。** T01–T05 只在完成版式后仍存在主体、色调或清晰度问题时选做。撤回 T10 批产首图改稿，不向现图添加文件道具。

最终检查的是整页阅读顺序、图组占比、完整主体和手机连续阅读。生成图片数量不作为完成标准。

## 2. 页面清单总表

下表的“图片数”只统计正文中已有图片；不计全局 Logo、未打开的放大查看器空图片节点，也不把响应式尺寸版本重复计数。

| 页面编号 | 页面名称 | 当前 URL | 页面类型 / 图片数 | 当前图片与内容问题概述 | 优先级 |
|---|---|---|---|---|---|
| P01 | Machining & ordering resources | [Resources 总览](http://127.0.0.1:4323/resources/) | 资料总览 / 1 | 首图适配良好；分类说明与文章摘要可收紧，不必为每条入口补图。 | P2 |
| P02 | CNC machining RFQ checklist | [RFQ checklist](http://127.0.0.1:4323/resources/rfq-checklist/) | 询盘准备指南 / 1 | 图片合适；手机端读完五项清单后才看到图，图与图纸要求的配对可加强。 | P2 |
| P03 | How we work | [How we work](http://127.0.0.1:4323/resources/how-we-work/) | 合作流程指南 / 2 | 桌面工厂图约 776px 高，推迟了 Order essentials；包装图有真实来源，适合保留。 | P1 |
| P04 | CNC processes, materials and finishes | [Machining guides](http://127.0.0.1:4323/resources/processes-materials-finishes/) | 工艺与材料分类 / 2 | 首段入口为文字；涂层照片有背景干扰，桌面固定窗口裁切较多；三种零件构造应与照片配对。 | P1 |
| P05 | Production & shipping | [Production & shipping](http://127.0.0.1:4323/resources/production-and-shipping/) | 生产运输分类 / 2 | 图片能区分批产与包装；包装入口图片较大，缺少邻近的历史档案说明。 | P2 |
| P06 | Custom CNC machining FAQ | [FAQ](http://127.0.0.1:4323/resources/faq/) | 问答 / 0 | 无图结构适合查询；长度主要来自文字，不宜加入装饰图。 | P2 |
| P07 | Drawings & ordering | [Drawings & ordering](http://127.0.0.1:4323/resources/drawings-and-ordering/) | 图纸与订购分类 / 1 | RFQ 图适配；三个入口的标题、任务说明与字段之间留白较多，手机端可更紧凑。 | P2 |
| P08 | Define part requirements before machining | [Part requirements](http://127.0.0.1:4323/resources/custom-cnc-machined-components-for-prototypes-and-production/) | 零件要求指南 / 1 | 多件零件的竖图难以看清单件特征；手机端图片和侧栏入口插在主要正文中间。 | P1 |
| P09 | Choosing CNC milling, turning or 5-axis machining | [Process selection](http://127.0.0.1:4323/resources/cnc-process-selection/) | 工艺比较指南 / 3 | 车削图为竖幅，另外两图为横幅；手机三图本身合计约 940px 高；照片不能直接解释几何分类。 | P1 |
| P10 | Specifying material and finish for a machined part | [Material & finish](http://127.0.0.1:4323/resources/material-and-finish-checklist/) | 材料与表面指南 / 1 | 首图干净，但未解释遮蔽与处理后尺寸；表面要求长列表与下方表格重复，手机阅读压力较大。 | P1 |
| P11 | CNC prototypes and small-batch production | [Prototype & repeat batches](http://127.0.0.1:4323/resources/prototype-vs-small-batch-cnc/) | 样件与批产指南 / 1 | 当前图清楚表达单件与多件；受控版本由紧邻的文字说明，不需要首图改稿。 | P2 |
| P12 | Shipping CNC parts internationally | [Shipping checklist](http://127.0.0.1:4323/resources/custom-cnc-parts-shipping-checklist/) | 包装与运输指南 / 3 | 档案图真实且有价值；第三张暗部较多，桌面图高不齐；主要清单在图集之后。 | P1 |

### 2.1 现有图片总清单

本轮识别 **18 个图片使用位置、13 组图片**。同组的 800px、1600px 等响应式副本合并登记。

| 编号 | 当前图片文件 | 对应页面 | 文件尺寸 / 来源类型 | 决策 |
|---|---|---|---|---|
| A01 | [rfq-gallery-v1-1440.webp](D:/lzz/lzz/_react/public/media/gallery/rfq-gallery-v1-1440.webp) | P01 首图；P02 清单配图；P07 首图 | 1440×960；通用生成示意图 | 保留 |
| A02 | [workshop-wide-1600.webp](D:/lzz/lzz/_react/public/media/evidence/workshop-wide-1600.webp) | P03 首段工厂图 | 1600×1108；原始工厂照片的网页副本 | 保留 |
| A03 | [shipping-example-1600.webp](D:/lzz/lzz/_react/public/media/evidence/shipping-example-1600.webp) | P03 包装模块；P05 运输入口；P12 档案第一图 | 1600×1200；P03 使用 800×600 副本；原始包装照片 | 保留 |
| A04 | [finish-coated-round-1200.webp](D:/lzz/lzz/_react/public/media/source-details/finish-coated-round-1200.webp) | P04 涂层圆形件 | 1200×675；原始零件照片 | 优化原图：T01 |
| A05 | [finish-coated-bars-1200.webp](D:/lzz/lzz/_react/public/media/source-details/finish-coated-bars-1200.webp) | P04 涂层长条件 | 1200×675；原始零件照片 | 优化原图：T02 |
| A06 | [prototype-gallery-v1-1440.webp](D:/lzz/lzz/_react/public/media/gallery/prototype-gallery-v1-1440.webp) | P05 首图；P11 首图 | 1440×960；通用生成示意图 | 保留 |
| A07 | [part-features-v1-1200.webp](D:/lzz/lzz/_react/public/media/info/part-features-v1-1200.webp) | P08 特征参考 | 1200×1600；经 ImageGen 处理的源照片派生图 | 优化原图：T03，从真实原图重新制作展示副本 |
| A08 | [turning-operation-1600.webp](D:/lzz/lzz/_react/public/media/evidence/turning-operation-1600.webp) | P09 车削现场 | 1600×2133；原始加工照片的网页副本 | 优化原图：T04 |
| A09 | [milling-enclosure-operation-1600.webp](D:/lzz/lzz/_react/public/media/evidence/milling-enclosure-operation-1600.webp) | P09 铣削现场 | 1600×1200；原始加工照片 | 保留 |
| A10 | [five-axis-operation-1600.webp](D:/lzz/lzz/_react/public/media/evidence/five-axis-operation-1600.webp) | P09 五轴现场 | 1600×1200；原始加工照片 | 保留 |
| A11 | [material-forms-v1-1200.webp](D:/lzz/lzz/_react/public/media/info/material-forms-v1-1200.webp) | P10 材料形态 | 1200×800；通用生成示意图 | 保留 |
| A12 | [shipment-2022-order-packing-1600.webp](D:/lzz/lzz/_react/public/media/evidence/shipment-2022-order-packing-1600.webp) | P12 档案第二图 | 1600×2133；原始包装照片 | 保留 |
| A13 | [shipment-2022-prepared-load-1600.webp](D:/lzz/lzz/_react/public/media/evidence/shipment-2022-prepared-load-1600.webp) | P12 档案第三图 | 1600×2133；原始装运准备照片 | 优化原图：T05 |

以下联系表由当前图片缩略排版组成，未修改网站图片：

![本轮核对的 A01–A13 当前图片](D:/lzz/lzz/_react/docs/resources-image-review-2026-10-13/asset-sheet.jpg)

来源类型依据当前项目的 [原始照片登记](D:/lzz/lzz/_react/src/data/evidence.generated.json)、[补充素材登记](D:/lzz/lzz/_react/src/data/additionalMedia.generated.json)、[说明图登记](D:/lzz/lzz/_react/docs/info-visuals-20261012.json) 和 [图集生成记录](D:/lzz/lzz/_react/docs/gallery-images-20261012.json)。A07 是照片派生图，不能当作未经处理的原始照片；A01、A06、A11 不能证明具体客户订单、材料牌号或检验结果。

## 3. 逐页分析与模块级建议

各页按当前页面的阅读顺序记录。新图或改图的制作参数在第 5 节按任务编号唯一登记；模块表引用同一编号，避免重复生成和参数冲突。标为“优化原图”的 A04/A05/A07/A08/A13 是条件候选：第一阶段使用现图，只调整布局；完成整页检查后，仍有可读性问题才执行 T01–T05。

### 3.1 P01 — Machining & ordering resources

- URL：[Resources 总览](http://127.0.0.1:4323/resources/)
- 页面类型：资料总览。
- 页面目标：让采购和工程人员找到图纸、工艺、批准与运输准备资料。
- 当前模块：标题与五个主题入口 + A01 → RFQ checklist 与 Drawing/Order 两组字段 → Drawings & ordering → Machining guides → Production & shipping → Need a quick answer? → 相关资料与询盘。
- 整体判断：图片适配良好。页面的长短主要由分类说明和文章摘要决定，增加入口缩略图不会减少文字压力。
- 当前证据：[桌面](D:/lzz/lzz/_react/docs/resources-image-review-2026-10-13/screenshots/P01-desktop.jpg) / [手机](D:/lzz/lzz/_react/docs/resources-image-review-2026-10-13/screenshots/P01-mobile.jpg)。

| 模块 | 当前图片与问题 | 决策 | 理由与内容协同建议 |
|---|---|---|---|
| 标题与主题入口 | 有 A01，零件与图纸主体清楚，白底与页面一致；手机窗口留白略多。 | 保留 | 使用完整 3:2 图，桌面图高不超过 360px、手机不超过 220px；文字放在图片外。 |
| RFQ checklist | 无图；已使用两组字段帮助概括内容。 | 保留 | 继续无图，保留 Drawing/Order；摘要收缩为一句，避免重复说明首图。 |
| Drawings & ordering | 无图；分类说明和文章说明有语义重叠。 | 保留 | 分类说明只解释任务，文章摘要只解释读完能准备什么；无需逐条补图。 |
| Machining guides | 无图；两个长文章标题占据较多行。 | 保留 | 保留文章名称，缩短摘要；工艺与材料的说明图放在对应指南内部。 |
| Production & shipping | 无图；已经有两条明确入口。 | 保留 | 保留“重复生产”和“运输准备”的区分，不追加泛化工厂照片。 |
| 快速问答、相关资料与询盘 | 无图；行动目标清楚。 | 保留 | 继续文字入口与主 CTA，不增加背景图片。 |

建议标题保留 `Machining & ordering resources`。可增加短导语：`Find the drawing, process, approval and delivery details needed for your RFQ.` 主入口继续为 `Read the checklist`，询盘继续为 `Prepare RFQ email`。

### 3.2 P02 — CNC machining RFQ checklist

- URL：[RFQ checklist](http://127.0.0.1:4323/resources/rfq-checklist/)
- 页面类型：询盘准备指南。
- 页面目标：把图纸、材料、验收、数量与交付信息组织成可讨论的询盘资料。
- 当前模块：标题 → Details needed for a quotation（五项信息、下载入口与 A01）→ Drawing and acceptance requirements → Specify the material and final surface → Quantity and delivery details → Related part examples → Prepare and send your inquiry。
- 整体判断：图与主题匹配，清晰度足够。手机端图片位于完整五项清单后，适合调整配对位置，暂不需要新图。
- 当前证据：[桌面](D:/lzz/lzz/_react/docs/resources-image-review-2026-10-13/screenshots/P02-desktop.jpg) / [手机](D:/lzz/lzz/_react/docs/resources-image-review-2026-10-13/screenshots/P02-mobile.jpg)。

| 模块 | 当前图片与问题 | 决策 | 理由与内容协同建议 |
|---|---|---|---|
| 五项报价信息与下载入口 | 有 A01；通用图纸线条适合表达文件准备，不能作为实际工程图使用。 | 保留 | 保持 3:2、完整显示；桌面宽 420–500px，手机图高约 180–220px。手机可把图放在“Drawing revision”说明后，配一句“模型与受控图纸一起准备”。 |
| Drawing and acceptance requirements | 无图；文件一致性、关键尺寸与样件边界的信息较密。 | 保留 | 继续文字，分成“文件 / 关键特征 / 检验记录”三项；不生成带虚构公差的工程图。 |
| Material and final surface | 无图；需要可准确记录的材料与表面条件。 | 保留 | 保留字段和材料指南入口；不重复 P10 的新说明图。 |
| Quantity and delivery details | 无图；生产时间与运输时间有明确区分。 | 保留 | 保留现有条件说明，图片不能替代数量与目的地字段。 |
| 相关零件与询盘步骤 | 无图；三步操作能够解释草稿流程。 | 保留 | 保留“准备草稿 → 在邮件应用附图 → 核对并发送”，不改写为网站已提交。 |

建议说明文案：`Prepare the current drawing revision, material and finish, acceptance checks, quantity and destination.` 主 CTA 保留 `Prepare RFQ email`；不新增图片生成任务。

### 3.3 P03 — How we work

- URL：[How we work](http://127.0.0.1:4323/resources/how-we-work/)
- 页面类型：合作流程指南。
- 页面目标：解释图纸评审、报价、样件批准、批量检验、包装交付与问题处理。
- 当前模块：标题与询盘入口 → A02 工厂大图 → Order essentials → Drawing and quotation → Approve before production → Packing and delivery documents（A03）→ Report a nonconforming part → 相关入口与询盘。
- 整体判断：两张图片均有保留价值。首段工厂图在桌面约 1120×776px，比流程说明承担了更多空间；优先调整布局，不重生成工厂场景。
- 当前证据：[桌面](D:/lzz/lzz/_react/docs/resources-image-review-2026-10-13/screenshots/P03-desktop.jpg) / [手机](D:/lzz/lzz/_react/docs/resources-image-review-2026-10-13/screenshots/P03-mobile.jpg)。

| 模块 | 当前图片与问题 | 决策 | 理由与内容协同建议 |
|---|---|---|---|
| 首段工厂照片 | 有 A02；机器与车间可辨识，但桌面图高约 776px，Order essentials 被推到下方。 | 保留 | 改为首段右侧的完整照片，最大图框约 480×320px，`contain`，不裁掉机器；左侧放流程导语与 Order essentials。手机现有约 229px 图高可保留，上限 240px。 |
| Order essentials | 无图；内容属于读者进入合作前的关键信息。 | 保留 | 前移到照片同段，保留起订、生产时间、运输及付款/样件条款。 |
| Drawing and quotation | 无图；流程与报价范围较密。 | 保留 | 每一步用“你提供 / 双方确认”两组信息，保留样件与收费说明。无需增加泛化会议图片。 |
| Approve before production | 无图；文字已经区分样件批准和批量检验。 | 保留 | 保持两步结构，强调受控版本和批准条件；不生成虚构批准文件或检验报告。 |
| Packing and delivery documents | 有 A03；现场颜色较强，但保护材料与零件清楚。 | 保留 | 与“安排包装”说明并排，桌面图高不超过 280px、手机不超过 220px，完整显示；保留档案图注，不把它定义为所有订单的包装标准。 |
| Nonconforming part、相关入口与询盘 | 无图。 | 保留 | 用需要提供的版本、数量、照片、测量信息组织说明，不增加售后情景图。 |

建议首段文案：`Drawings, quotation, sample approval, repeat production and shipment are agreed for each part. Start with the current drawing revision and acceptance requirements.` 标题保留 `How we work`，CTA 保留 `Prepare RFQ email`。本页不需要 ImageGen 任务。

### 3.4 P04 — CNC processes, materials and finishes

- URL：[Machining guides](http://127.0.0.1:4323/resources/processes-materials-finishes/)
- 页面类型：工艺与材料分类入口，包含涂层实例。
- 页面目标：进入工艺选择与材料表面指南，并区分塑料本体、金属涂层和独立覆层。
- 当前模块：标题 → 工艺选择入口 → 材料与表面入口 → Plastic, coated and covered parts → Surface-coated parts（A04/A05）→ Define the coating requirement → Other resources → 资料与询盘。
- 整体判断：无需增加首屏大图。两张真实涂层照片应保留主体，优化色调与展示窗口；分类解释和照片目前相隔较远。
- 当前证据：[桌面](D:/lzz/lzz/_react/docs/resources-image-review-2026-10-13/screenshots/P04-desktop.jpg) / [手机](D:/lzz/lzz/_react/docs/resources-image-review-2026-10-13/screenshots/P04-mobile.jpg)。

| 模块 | 当前图片与问题 | 决策 | 理由与内容协同建议 |
|---|---|---|---|
| 标题与两个指南入口 | 无图；文字即可表达需要完成的任务。 | 保留 | 入口标题可简化为 `Choose a machining process` 和 `Specify material and finish`，详细文章标题保留在目标页。 |
| Plastic, coated and covered parts | 无图；三种构造的解释和涂层图片分离。 | 保留 | 每种构造使用一句定义和相应现有入口；将两张涂层图直接放在“Coated metal parts”解释附近。不要把涂层件写成 PTFE 本体零件。 |
| Coated circular components | 有 A04；黑色主体细节偏暗、架子背景较密；桌面约 626×228px 的 `cover` 窗口会裁切原图上下内容。 | 优化原图 | T01：温和提亮主体、统一中性白平衡；保留孔、轮廓、挂架与实物表面。图片按原 16:9 完整显示，维持放大原图入口。 |
| Coated bars | 有 A05；木板与地面色调分散注意力，当前窗口使长条件的完整关系不够明显。 | 优化原图 | T02：优化曝光与色调，不删改零件或重新排列；使用 16:9 `contain`，避免裁掉长条件两端。 |
| Define the coating requirement | 无图；包含基材、处理、遮蔽、尺寸四组信息。 | 保留 | 保留字段结构，说明聚焦“需要在图纸/询盘中定义什么”，详细接受条件继续链接 P10。 |
| Other resources、相关资料与询盘 | 无图。 | 保留 | 继续无图，CTA 保留 `Prepare RFQ email`。 |

建议照片组标题：`Surface-coated metal parts`。说明可改为：`These source photographs show parts identified as Teflon surface-coated. Specify the substrate, treatment, surfaces to protect and dimensions to check after treatment.` 不依据外观新增涂层厚度、性能或认证结论。

### 3.5 P05 — Production & shipping

- URL：[Production & shipping](http://127.0.0.1:4323/resources/production-and-shipping/)
- 页面类型：生产运输分类入口。
- 页面目标：进入样件转批产与国际运输准备两条阅读路径。
- 当前模块：标题与 A06 → Planning CNC prototypes and repeat batches → Shipping CNC parts internationally（A03）→ More resources → 资料与询盘。
- 整体判断：两图用途清楚，现有色调差异来自示意图与真实档案，不需要强行统一成生成照片。包装入口应减少图片占比并补充图注。
- 当前证据：[桌面](D:/lzz/lzz/_react/docs/resources-image-review-2026-10-13/screenshots/P05-desktop.jpg) / [手机](D:/lzz/lzz/_react/docs/resources-image-review-2026-10-13/screenshots/P05-mobile.jpg)。

| 模块 | 当前图片与问题 | 决策 | 理由与内容协同建议 |
|---|---|---|---|
| 标题与批产示意图 | 有 A06；单件与四件能表达数量变化，完整且清楚。 | 保留 | 保持 3:2，桌面图高不超过 320px、手机不超过 220px。保留这一张分类主题图。 |
| 样件与批产入口 | 无独立图片。 | 保留 | 保留“样件批准 / 受控版本 / 批次记录”，不再增加第二张批产图。 |
| 国际运输入口 | 有 A03；桌面约 559×419px，超过短摘要需要的图片量；缺少邻近图注。 | 保留 | 原照片继续在 P03/P12 使用；本分类入口调整为文字与 CTA，不重复放置档案图。这样两条入口的视觉结构一致。 |
| More resources、资料与询盘 | 无图。 | 保留 | 保留简洁的资料入口及询盘 CTA。 |

建议运输入口说明：`Agree destination, packing, transport responsibilities and delivery documents before ordering.` CTA 可用 `Read the shipping checklist`。档案图与图注在运输指南中连续查看。

### 3.6 P06 — Custom CNC machining FAQ

- URL：[FAQ](http://127.0.0.1:4323/resources/faq/)
- 页面类型：问答。
- 页面目标：快速回答询盘、付款与样件、工艺、材料、检验及交付问题。
- 当前模块：标题 → Essential answers → Quotes, payment, samples & after-sales → Processes & specifications → Inspection & delivery → Machining studies → 资料与询盘。
- 整体判断：没有正文图片，这是合适的选择。手机阅读较长，但装饰图会继续延长页面；应整理答案开头与详细资料入口。
- 当前证据：[桌面](D:/lzz/lzz/_react/docs/resources-image-review-2026-10-13/screenshots/P06-desktop.jpg) / [手机](D:/lzz/lzz/_react/docs/resources-image-review-2026-10-13/screenshots/P06-mobile.jpg)。

| 模块 | 当前图片与问题 | 决策 | 理由与内容协同建议 |
|---|---|---|---|
| Essential answers | 无图。 | 保留 | 每条答案首句直接回答，后续只保留必要条件；维持完整展开的正文。 |
| Quotes, payment, samples & after-sales | 无图。 | 保留 | 以需要确认的条款组织文字，不制作付款场景、保证徽章或客户服务照片。 |
| Processes & specifications | 无图。 | 保留 | 使用简短答案与工艺/材料指南入口，不重复 P09/P10 的说明图。 |
| Inspection & delivery | 无图。 | 保留 | 不新增生成证书或检验报告。现有事实与条件不能由装饰图片代替。 |
| Machining studies | 无图。 | 保留 | 保留真实加工研究的入口，图片在目标页面查看；不扩展本轮范围。 |
| 资料与询盘 | 无图。 | 保留 | 保留主 CTA 与草稿功能说明。 |

建议保留标题 `Custom CNC machining FAQ`。例如网站询盘问题可先写：`The form prepares an email draft. Attach drawings and send it from your email application.` 再说明复制、保存等已有方式。不新增图片任务，不新增页内目录或折叠问答。

### 3.7 P07 — Drawings & ordering

- URL：[Drawings & ordering](http://127.0.0.1:4323/resources/drawings-and-ordering/)
- 页面类型：图纸与订购分类入口。
- 页面目标：引导准备询盘文件、理解合作流程并定义零件要求。
- 当前模块：标题与 A01 → RFQ checklist → How we work → Define part requirements before machining → More resources → 资料与询盘。
- 整体判断：共享 RFQ 图能准确表达分类任务，不必为了页面独立性重新生成一张相似图。手机端入口行的间距比信息量更大。
- 当前证据：[桌面](D:/lzz/lzz/_react/docs/resources-image-review-2026-10-13/screenshots/P07-desktop.jpg) / [手机](D:/lzz/lzz/_react/docs/resources-image-review-2026-10-13/screenshots/P07-mobile.jpg)。

| 模块 | 当前图片与问题 | 决策 | 理由与内容协同建议 |
|---|---|---|---|
| 标题与首图 | 有 A01；主题清楚，图纸细线属于示意。 | 保留 | 与 P01 使用同一 3:2 图片；桌面高不超过 320px、手机不超过 220px，不在图内增加字段文字。 |
| RFQ checklist 入口 | 无独立图片。 | 保留 | 用一句任务说明连接字段：文件版本、材料表面、验收、数量与交付；减少摘要和字段间的重复留白。 |
| How we work 入口 | 无图。 | 保留 | 保留报价、批准、交付三个关键词，CTA 明确进入流程页。 |
| 零件要求入口 | 无图。 | 保留 | 保留工作面、关键尺寸与验收范围，特征图片在 P08 展示。 |
| More resources、资料与询盘 | 无图。 | 保留 | 无需增加装饰图片。 |

建议导语：`Prepare the drawing package, define part requirements and review the order process.` 三条入口 CTA 可分别使用 `Read the RFQ checklist`、`Review the order process`、`Define part requirements`；不新增图片任务。

### 3.8 P08 — Define part requirements before machining

- URL：[Part requirements](http://127.0.0.1:4323/resources/custom-cnc-machined-components-for-prototypes-and-production/)
- 页面类型：零件要求指南。
- 页面目标：帮助买方在图纸中定义工作面、关键尺寸、材料表面和批准条件。
- 当前模块：标题、Identify the working surfaces、Specify critical dimensions → 桌面侧栏 A07、Related part examples、Next step（手机在上述正文后顺序展示）→ Specify material and surface requirements → Define acceptance checks and revisions → Include the requirements with your RFQ → 资料与询盘。
- 整体判断：图片中的平面、孔列和凹腔适合主题，但多件排列使单件特征较小。现图是照片派生图；新展示副本应从真实原图开始，不叠加多轮重绘。
- 当前证据：[桌面](D:/lzz/lzz/_react/docs/resources-image-review-2026-10-13/screenshots/P08-desktop.jpg) / [手机](D:/lzz/lzz/_react/docs/resources-image-review-2026-10-13/screenshots/P08-mobile.jpg)。

| 模块 | 当前图片与问题 | 决策 | 理由与内容协同建议 |
|---|---|---|---|
| 工作面与关键尺寸 | 有 A07；竖幅展示多件，孔和凹腔细节不够突出；手机图约 320px 高。 | 优化原图 | T03：从真实原图选择一件完整可见零件，制作横幅展示副本；保持全部可见孔、凹腔、边缘和加工纹理。完整原图入口保留。 |
| Related part examples、Next step | 无图；手机端在读完主体前插入两个出口。 | 保留 | 将这两组入口移到主要正文之后，使“工作面 → 关键尺寸 → 材料表面 → 验收版本”连续阅读。 |
| 材料与表面要求 | 无图。 | 保留 | 保留材料、处理前后尺寸、遮蔽、外观面与边缘要求；详细条件链接 P10。 |
| 验收与版本 | 无图。 | 保留 | 保留设计变化需要重新确认的说明，不生成批准印章或结果文件。 |
| RFQ、资料与询盘 | 无图。 | 保留 | 保持当前图纸与询盘入口，末尾只保留清楚的下一步。 |

建议图片模块标题：`Features to define on the drawing`。说明：`Mark working surfaces, critical dimensions, pockets and hole patterns on the controlled drawing.` 这句话要求买方定义特征，不把照片中的某一面自动指定为真实设计的基准面。手机将图放在工作面说明后：第一阶段保留 A07，图高上限 240px；若后续制作 T03 横幅副本，再使用约 160–200px 的展示高度。

### 3.9 P09 — Choosing CNC milling, turning or 5-axis machining

- URL：[Process selection](http://127.0.0.1:4323/resources/cnc-process-selection/)
- 页面类型：工艺比较指南。
- 页面目标：从零件几何理解需要讨论的工艺和图纸输入。
- 当前模块：标题与导语 → Compare the processes by geometry（桌面表格 / 手机逐项展开）→ Parts that need more than one process（A08/A09/A10）→ Accuracy depends on the feature → Files for a process recommendation → 相关零件与询盘。
- 整体判断：真实照片应保留，但不适合承担几何分类说明。桌面照片高约 405/228/228px；手机高约 441/248/248px，比例差异使参考图组过长。
- 当前证据：[桌面](D:/lzz/lzz/_react/docs/resources-image-review-2026-10-13/screenshots/P09-desktop.jpg) / [手机](D:/lzz/lzz/_react/docs/resources-image-review-2026-10-13/screenshots/P09-mobile.jpg)。

| 模块 | 当前图片与问题 | 决策 | 理由与内容协同建议 |
|---|---|---|---|
| Compare the processes by geometry | 无图；需要从连续文字中想象旋转体、凹腔平面与多面/斜面。 | 完全重新生成 | T06/T07/T08：三张独立、同风格的通用几何图，分别配对已有三项工艺说明。图中不放公差、性能或客户名称。 |
| CNC turning operation | 有 A08；隔窗现场照片对比偏低，且竖幅显著高于另外两图。 | 优化原图 | T04：仅优化曝光、白平衡与温和对比；不重建被遮挡的刀具或零件。图片完整保留在紧凑现场参考组中。 |
| CNC milling operation | 有 A09；主轴、装夹与零件关系清楚。 | 保留 | 与另外两张原图采用同高 `contain` 窗口，不为了统一比例裁掉装夹关系。 |
| Five-axis machining operation | 有 A10；零件与回转装夹可辨识。 | 保留 | 保留完整现场照片，不替换为生成机器或虚构刀路。 |
| Parts that need more than one process 的说明 | 以上三张图分别展示现场，不能证明同一零件经过连续三步。 | 保留 | 图组标题建议为 `Workshop process references`，正文另外解释组合工艺；避免让排列顺序被理解为一个实际订单的工艺路线。 |
| Accuracy depends on the feature | 无图；属于需要限定条件的技术说明。 | 保留 | 保留几何、材料、装夹、基准和测量方法的条件，不用图像暗示统一精度保证。 |
| Files、相关零件与询盘 | 无图。 | 保留 | 保留 3D 模型、受控 2D 图纸、材料、数量、关键特征与检验记录等输入。 |

建议几何组标题：`Compare geometry, then confirm the setup`。说明：`Use the part geometry to discuss turning, milling or multi-axis setups. Some parts need more than one process.` CTA：`Prepare the drawing package` → 现有 RFQ checklist。

建议桌面为三项并列的小图与说明，每图高约 160–200px；手机每张新图高不超过 150px，紧接对应文字。真实照片另做一排完整缩略参考：桌面窗口高 160–180px，手机高 100–120px，短图注为 `Turning`、`Milling`、`5-axis`，保留完整原图出口。详细图纸要求不因压缩展示而删除。

### 3.10 P10 — Specifying material and finish for a machined part

- URL：[Material & finish](http://127.0.0.1:4323/resources/material-and-finish-checklist/)
- 页面类型：材料与表面要求指南。
- 页面目标：把材料牌号、使用条件、处理要求、保护区域与验收记录写入图纸和询盘。
- 当前模块：标题、Confirm the material specification 与侧栏 A11、Related part examples、Next step → 材料比较表 → Confirm the alloy designation → Define the finish and acceptance criteria（长列表与要求表）→ Record the requirements in your RFQ → 资料与询盘。
- 整体判断：首图视觉合适，可以保留。真正缺少的是遮蔽区域和处理后检查概念；现有长列表与表格重复解释相近字段，手机全文约 8700px 高，包含页脚。
- 当前证据：[桌面](D:/lzz/lzz/_react/docs/resources-image-review-2026-10-13/screenshots/P10-desktop.jpg) / [手机](D:/lzz/lzz/_react/docs/resources-image-review-2026-10-13/screenshots/P10-mobile.jpg)。

| 模块 | 当前图片与问题 | 决策 | 理由与内容协同建议 |
|---|---|---|---|
| 材料规格与材料形态 | 有 A11；白底、四种形态清楚，但外观不能证明精确材料牌号。 | 保留 | 保持 3:2、桌面宽约 300–336px、手机高不超过 220px。图注描述零件形态，不把颜色作为牌号或性能识别依据。 |
| Related part examples、Next step | 无图；手机在材料比较前打断主体阅读。 | 保留 | 移到主体末尾，保持材料规格与比较连续。 |
| 材料比较与牌号说明 | 无图；字段本身比泛化材料照片更准确。 | 保留 | 保留材料表及 C3600 / H62 / C36000 的现有非等同说明；修正导语末尾 `engineering review..` 的重复句点。 |
| Finish and acceptance criteria | 无图；遮蔽、配合孔与处理后尺寸仅靠长文字解释。 | 完全重新生成 | T09：新增一张通用区域示意，区分需处理面与保护接口；文字仍负责准确说明处理规范与检查阶段。 |
| 表面要求长列表与要求表 | 无图；基材、处理、遮蔽、尺寸、厚度、外观、测试记录重复展开。 | 保留 | 将核心定义保留在要求表，长列表只保留表中没有的条件和例外；七类信息全部保留，不通过隐藏或折叠减少长度。 |
| RFQ、资料与询盘 | 无图。 | 保留 | 保留受控图纸、材料与检验资料入口，CTA 保留 `Prepare RFQ email`。 |

建议图文模块标题：`Define coated faces and protected interfaces`。说明：`Mark surfaces to treat or mask. State whether critical dimensions apply before or after treatment, and agree the required checks.` CTA：`Record the finish requirements in your RFQ`。

T09 放在表面要求模块开头，桌面与关键说明并排，手机图高不超过 240px。颜色只标识讨论区域，不代表某种涂层性能或经过批准的实际零件。

### 3.11 P11 — CNC prototypes and small-batch production

- URL：[Prototype & repeat batches](http://127.0.0.1:4323/resources/prototype-vs-small-batch-cnc/)
- 页面类型：样件与重复生产指南。
- 页面目标：说明样件验证、受控规格批准、重复订单安排与供应商比较。
- 当前模块：标题与 A06 → Validate the first sample → Approve the repeat-order specification → Plan the repeat order → Compare suppliers before committing → 相关零件与询盘。
- 整体判断：现图质量良好，能说明数量变化。保留图片，通过紧邻的文字说明受控版本与重复订单，不增加道具或第二张大图。
- 当前证据：[桌面](D:/lzz/lzz/_react/docs/resources-image-review-2026-10-13/screenshots/P11-desktop.jpg) / [手机](D:/lzz/lzz/_react/docs/resources-image-review-2026-10-13/screenshots/P11-mobile.jpg)。

| 模块 | 当前图片与问题 | 决策 | 理由与内容协同建议 |
|---|---|---|---|
| 标题与样件/批次首图 | 有 A06；单件与多件的关系清楚，白底与指南一致。 | 保留 | 保持完整 3:2 图，手机高不超过 220px；受控版本与批准条件放在图外文字中，不改稿。 |
| Validate the first sample | 无图；需明确验证目标。 | 保留 | 分成“配合与功能 / 装夹与刀具可达性 / 材料表面与验收”，不追加样件照片。 |
| Approve the repeat-order specification | 无图；受控版本和检验记录是核心。 | 保留 | 标题可为 `Approve the revision before repeat production`；保留变化需重新确认的说明。 |
| Plan the repeat order | 无图；数量、价格与生产安排不能由图片证明。 | 保留 | 保留当前按零件评估批量经济性的条件，不让四件示意图代表实际起订批量。 |
| Compare suppliers | 无图。 | 保留 | 保留规格、报价范围、排除项与变化处理四组；不制作竞品 Logo 或虚构对比。 |
| 相关零件与询盘 | 无图。 | 保留 | 保留批准图纸、首单与重复数量、到货时间和检验记录的询盘要求。 |

建议图片后用 `Sample check → Controlled revision → Repeat order` 三步短文字概括阅读顺序。说明：`Carry the approved drawing, material, finish and acceptance requirements into each repeat quotation.` CTA 保留 `Prepare RFQ email`。本页不新增图片制作任务。

### 3.12 P12 — Shipping CNC parts internationally

- URL：[Shipping checklist](http://127.0.0.1:4323/resources/custom-cnc-parts-shipping-checklist/)
- 页面类型：包装与运输准备指南。
- 页面目标：约定零件保护、包装标识、交付责任、文件与时间要求。
- 当前模块：标题与询盘入口 → LZZ packing archive（A03/A12/A13）→ Packing and delivery requirements（五项清单）→ Transport options and import documents → 相关零件与准备入口 → 资料与询盘。
- 整体判断：三张档案照片有真实信息，不能用生成的“高级发货现场”替换。第三图暗部较多，桌面图高不齐；可以先给出简短准备信息，再展示紧凑档案。
- 当前证据：[桌面](D:/lzz/lzz/_react/docs/resources-image-review-2026-10-13/screenshots/P12-desktop.jpg) / [手机](D:/lzz/lzz/_react/docs/resources-image-review-2026-10-13/screenshots/P12-mobile.jpg)。

| 模块 | 当前图片与问题 | 决策 | 理由与内容协同建议 |
|---|---|---|---|
| 标题与询盘入口 | 无图；进入页面后缺少对需要准备信息的简短概括。 | 保留 | 增加一句准备说明及目的地、到货日、保护面、文件四个已有主题；不增加物流首屏场景图。 |
| 档案第一图：包装局部 | 有 A03；零件、包材与固定关系清楚。 | 保留 | 完整 4:3 图，作为档案组主图；保留“包装准备”的描述，不能推断已到货或验收。 |
| 档案第二图：待包装零件 | 有 A12；竖幅能显示整体排列。 | 保留 | 保持 3:4 全图，不因统一图框裁去包装边缘；使用同高 `contain`。 |
| 档案第三图：装运准备 | 有 A13；箱体上方较暗，内容集中在下部。 | 优化原图 | T05：温和提亮暗部，保留空白箱体、包材及全部物品，不补画货物或人物。 |
| Packing and delivery requirements | 无图；五行清单信息完整。 | 保留 | 保留“你提供 / 报价中确认”结构；手机每组先显示最短结论，再显示必要条件。 |
| Transport options and import documents | 无图。 | 保留 | 保留按目的地和交易确认的表述，不生成承运商合作图片、报关单或签收证明。 |
| 相关零件、准备入口与询盘 | 无图。 | 保留 | 保留 `Include delivery in your RFQ` 与现有目的地、责任、排除项说明。 |

建议导语：`Provide the destination, required arrival date, surfaces to protect and delivery documents. Confirm packing and transport responsibilities in the quotation.` 档案组可放在这段概括之后，桌面共同图框高 240–280px；手机主图高不超过 220px，第二、三图保持并排小图、各高约 160–190px。继续保留档案日期和完整原图入口。

## 4. 后续接入的统一建议

以下均为待审核建议，不表示页面已实现，也不直接覆盖当前 [DESIGN.md](D:/lzz/lzz/_react/DESIGN.md)。

### 4.1 图片角色与尺寸

| 图片角色 | 建议比例 / 展示方式 | 图文关系与手机规则 |
|---|---|---|
| 分类首图：A01/A06 | 保持 3:2，完整显示，`contain` | 仅承担栏目主题；桌面最大高 320–360px，手机最大高 220px。 |
| 工厂上下文：A02 | 原比例约 1.44:1，完整显示 | 放在流程导语与订单准备旁；桌面最大约 480×320px，手机最大高 240px。 |
| 包装上下文：A03 | 保持 4:3，完整显示 | P03 正文图与 P12 档案主图分别设尺寸；P05 运输入口改为文字，原文件保留。 |
| 涂层照片：A04/A05，或后续 T01/T02 | 保持 16:9，完整显示 | 两图同高，桌面最大高 240px、手机约 180–210px；不使用宽而矮的 `cover` 窗口。 |
| 特征参考：A07，或后续 T03 | A07 保持 3:4；T03 为 16:9 完整单件 | 图片和工作面文字配对；手机 A07 高不超过 240px，T03 约 160–200px；相关入口移到主体末尾。 |
| 真实加工参考：A08/A09/A10 | 保留各自原比例，共同图框内 `contain` | 桌面三图同高 160–180px；手机三枚小图同排、高 100–120px，并提供原图出口。 |
| 技术几何图：T06/T07/T08 | 三张独立 4:3 图 | 桌面并列，手机每图与对应工艺说明相邻，图高不超过 150px；不能将三图合成长图再在手机端缩小。 |
| 遮蔽与处理说明：T09 | 4:3 | 桌面贴近表面要求，手机最大高 240px；标签和关键说明放在 HTML 中。 |
| 历史包装竖图：A12/A13 | 保留 3:4 | 统一图框用完整显示解决高低差，保留包材、箱体与原图入口。 |

共同原则：不拉伸；完整零件及证据照片保留信息；标题、说明和 CTA 位于图片外。真实照片保留自然工业色彩，示意图沿用白底、中性金属、柔和自然阴影；不把真实车间修成不存在的展厅。

同组图片使用同一展示高度、统一图注位置与入口样式。桌面图组间距建议 24px，手机 12–16px；图注统一 14px，图片到图注间距 12px。窄竖图保持比例，使用紧凑的白色或浅灰图框，不为等高制造大面积留白。P09 手机的三个几何小图与现场参考组，图片区域合计控制在约 600px 内，图注与文字另行排版。

### 4.2 内容配合

1. 一个模块解决一个问题。先说明买方要准备什么，再列双方需要确认什么。
2. 入口页使用一句任务说明和具体 CTA；详细要求保留在指南，避免全页重复。
3. P08/P10 的手机阅读先完成主体，再展示相关零件与下一步入口。
4. P09 保留几何比较和图纸输入，缩小真实现场参考组。P10 合并长列表与要求表的重复内容，保留全部必要条件。
5. FAQ 保持完整展开的文字问答；资料页不新增页内目录或折叠正文。
6. 主 CTA 继续表达准备 RFQ 邮件草稿；不能改成网站已经发送询盘或上传图纸。

### 4.3 图片验收边界

真实照片的优化稿与原图同时保留。检查零件轮廓、孔槽、数量、装夹、包材和现场物品有无变化；若 ImageGen 改变这些事实，舍弃该输出，改用非生成的曝光、白平衡或裁切处理。

新图 T06–T09 属于知识说明，不作为客户项目、库存、实际加工路线、资质或检验结果。生成图不含假参数、标准号、报告、签名、认证标志或客户 Logo。技术标签由正文准确说明，后续确认图示与文章一致后再接入。

后续接入应新建展示版本，仅修改获批的 Resources 使用位置。原文件及范围外消费者不自动更新。届时再检查 360、390、834、1440px 的裁切、完整信息、图注、替代文本和放大入口；本轮未进行完整键盘或读屏合规测试。

## 5. 图片生成任务总表与制作说明

### 5.1 任务总表

共 9 项候选任务：5 项条件选做的原图优化、4 张用于两处解释模块的技术示意图。先用现有图片统一版式，再制作 T06–T09；T01–T05 根据版式验收结果选择。T10 已从推荐方案撤回。原图优化行的“待生成”指待制作新的展示文件，不意味着必须使用生成式工具。没有任务已执行。

| 图片编号 | 页面 | 对应模块 | 用途 | 处理方式 | 建议工具 | 优先级 | 状态 |
|---|---|---|---|---|---|---|---|
| T01 | P04 | Coated circular components | 看清涂层件轮廓与孔口 | 优化原图 A04，条件选做 | 原图调色；可使用 ImageGen 受限修图 | P2 | 待生成 |
| T02 | P04 | Coated bars | 保留完整长条件并降低背景色干扰 | 优化原图 A05，条件选做 | 原图调色；可使用 ImageGen 受限修图 | P2 | 待生成 |
| T03 | P08 | Features to define on the drawing | 突出一件零件的孔列与凹腔 | 优化原图，输入 A07 的真实来源照片，条件选做 | 裁切优先；必要时使用 ImageGen 清理背景 | P2 | 待生成 |
| T04 | P09 | Workshop process references — Turning | 提高真实现场可辨识度 | 优化原图 A08，条件选做 | 非生成的曝光、白平衡与对比调整 | P2 | 待生成 |
| T05 | P12 | LZZ packing archive — 第三图 | 提高装运准备图暗部可读性 | 优化原图 A13，条件选做 | 非生成的暗部与噪声调整 | P2 | 待生成 |
| T06 | P09 | Compare the processes by geometry — Turning | 解释旋转体几何 | 完全重新生成 | ImageGen | P1 | 待生成 |
| T07 | P09 | Compare the processes by geometry — Milling | 解释平面、孔列与凹腔 | 完全重新生成 | ImageGen | P1 | 待生成 |
| T08 | P09 | Compare the processes by geometry — Multi-axis | 解释多面、斜面与刀具接近方向的讨论 | 完全重新生成 | ImageGen | P1 | 待生成 |
| T09 | P10 | Define coated faces and protected interfaces | 解释处理面与需保护接口 | 完全重新生成 | ImageGen | P1 | 待生成 |

### 5.2 每张图片的制作参数

#### T01 — 涂层圆形件原图优化

- 输入：[A04 当前照片](D:/lzz/lzz/_react/public/media/source-details/finish-coated-round-1200.webp)。
- 对应页面 / 模块：P04，`Coated circular components`。
- 图片用途 / 处理方式：提高真实黑色零件的可辨识度；**优化原图**。
- 建议比例 / 尺寸：16:9；母图保持至少当前 1200×675，不靠生成细节补足所谓高清。
- 主体位置：中，保留原有圆形件、孔口与挂架关系。
- 文字安全区：不需要；标题、说明与 CTA 放在图外。
- 呈现内容 / 风格：现有挂架上的圆形涂层件；中性白平衡，轻微提高暗部层次，保留现场工业质感。
- 应避免：新增或删除孔、零件、挂架；把黑色表面改成另一种处理；移除真实表面缺陷以暗示质量结果；替换为棚拍假现场。
- ImageGen 指令方向：`Edit the supplied original photograph only. Gently balance exposure and neutralize the color cast so the dark circular parts and their bores remain readable. Preserve every visible part, hole, edge, rack and surface condition. Keep the original scene and camera perspective. Do not reconstruct geometry or create a new coating appearance. No added text, logos or objects.`
- 内容配合：图注继续描述原照片中的涂层圆形件；完整原图出口保留。

#### T02 — 涂层长条件原图优化

- 输入：[A05 当前照片](D:/lzz/lzz/_react/public/media/source-details/finish-coated-bars-1200.webp)。
- 对应页面 / 模块：P04，`Coated bars`。
- 图片用途 / 处理方式：看清长条件整体和重复孔；**优化原图**。
- 建议比例 / 尺寸：16:9；至少 1200×675，保持完整照片可查看。
- 主体位置：中，保留长条件原有排列及两端。
- 文字安全区：不需要；图注在图外。
- 呈现内容 / 风格：原有长条涂层件、孔和真实支撑背景；统一曝光，适当减弱地面与木板的色偏。
- 应避免：重新排列、减少数量、补画孔槽、改变长条长度；通过强裁切造成完整零件错觉。
- ImageGen 指令方向：`Retouch the supplied original photograph with restrained exposure and neutral white balance. Keep all long coated parts, their repeated holes, ends, arrangement and visible surface conditions exactly as supplied. Reduce distracting background color cast without replacing the workshop scene. Do not redraw, reorder or add parts. No text or labels.`
- 内容配合：与“金属件表面涂层”的定义相邻，保留与塑料本体的区别。

#### T03 — 单件特征展示副本

- 输入：[A07 的真实来源照片](D:/lzz/lzz/_react/public/media/evidence/multi-feature-milling-parts-1600.webp)；A07 现有派生图仅作展示方式参考。
- 对应页面 / 模块：P08，`Features to define on the drawing`。
- 图片用途 / 处理方式：让孔列、平面和凹腔在小图内可读；**优化原图**。
- 建议比例 / 尺寸：16:9，建议 1200×675；优先使用可获得的原始高分辨率照片。若只有现有副本，按真实细节能支持的尺寸输出。
- 主体位置：中；从原图选择一件完整可见的零件，不改视角或几何。
- 文字安全区：不需要；可在图外列“工作面 / 关键尺寸 / 孔与凹腔”三项。
- 呈现内容 / 风格：完整单件占图宽约 75%–85%，孔、凹腔与边缘保留；背景采用干净中性色，保留真实加工纹理。
- 应避免：根据已有派生图再次猜测结构；补孔、抹去刀纹、改变腔体或件数；把说明图视为尺寸验收依据。
- ImageGen 指令方向：`Use the supplied original machining photograph. Select one fully visible component and preserve its complete silhouette, existing hole pattern, pocket geometry, edges and machining marks. Create a clean neutral presentation around that component without changing its viewpoint or structure. Do not invent hidden features, add holes, remove surface conditions or create dimension labels. Leave all explanatory text outside the image.`
- 内容配合：图片放在工作面段落之后，原始全图链接保留。如果无法得到清楚且完整的单件副本，保留 A07，优先调整图文位置。

#### T04 — 车削现场曝光优化

- 输入：[A08 当前照片](D:/lzz/lzz/_react/public/media/evidence/turning-operation-1600.webp)。
- 对应页面 / 模块：P09，`Workshop process references — Turning`。
- 图片用途 / 处理方式：改善低对比现场参考；**优化原图**。
- 建议比例 / 尺寸：保留 3:4，维持当前约 1600×2133 的完整竖图；展示尺寸通过图框控制。
- 主体位置：左，保留原图中左下工件与右侧刀具区域的相对关系。
- 文字安全区：不需要。
- 呈现内容 / 风格：原有车削现场，轻微提亮、校正白平衡和局部对比。
- 应避免：删除切屑、冷却液或玻璃反射后补画细节；制造清楚但不存在的刀具结构；改为无现场噪声的生成机床图。
- 工具指令方向：采用非生成调色，不用 ImageGen 补全遮挡。保留原文件，输出单独的曝光优化版。
- 内容配合：图注只写 `Turning`；几何解释由 T06 与正文承担。

#### T05 — 装运准备档案暗部优化

- 输入：[A13 当前照片](D:/lzz/lzz/_react/public/media/evidence/shipment-2022-prepared-load-1600.webp)。
- 对应页面 / 模块：P12，`LZZ packing archive` 第三图。
- 图片用途 / 处理方式：提高箱体与已包装物品的可读性；**优化原图**。
- 建议比例 / 尺寸：保持 3:4、约 1600×2133，不裁去上部空白箱体以制造满载印象。
- 主体位置：中，保持原图中下部货物的位置。
- 文字安全区：不需要。
- 呈现内容 / 风格：原有装运准备照片；温和提亮暗部、适度降噪，保留实际明暗关系。
- 应避免：补画货物、人物、车辆、包装标签；改变装载量；制作“发货完成”或签收证明。
- 工具指令方向：优先非生成的曝光与噪声调整；无法恢复的暗部保持原状，不使用生成填充。
- 内容配合：沿用档案日期和准备阶段描述，不增加目的地、承运商或已交付信息。

#### T06 — 旋转体几何说明图

- 输入：无真实订单输入；A01/A11 仅作为白底和金属光线风格参考。
- 对应页面 / 模块：P09，`Compare the processes by geometry — Turning`。
- 图片用途 / 处理方式：解释文章已有的旋转体几何概念；**完全重新生成**。
- 建议比例 / 尺寸：4:3，建议 1200×900 或同等更高分辨率。
- 主体位置：中；一件通用阶梯轴或套筒完整显示。
- 文字安全区：不需要；工艺名与图纸要点在图外。
- 呈现内容 / 风格：简单、完整的旋转体，轮廓与轴线关系易理解；白底，中性金属，柔和阴影，与 T07/T08 同一观察尺度。
- 应避免：复杂客户零件、品牌、参数、假检验尺寸；把图示形状声明为某个实际产品或订单。
- ImageGen 指令方向：`Create one restrained engineering editorial illustration of a generic stepped cylindrical shaft, fully visible in a three-quarter view on a white background. Clearly show rotational symmetry and stepped diameters without dimension values or labels. Neutral metal, soft studio light, modest machining texture, no dramatic reflections. No machine, hands, logos, certificate marks or customer context. Match the scale and lighting of a three-image geometry comparison set.`
- 内容配合：图外说明旋转体特征及需要定义的直径、台阶、槽、螺纹等现有图纸输入。

#### T07 — 平面、孔列与凹腔说明图

- 输入：无真实订单输入；沿用 T06 的光线和背景。
- 对应页面 / 模块：P09，`Compare the processes by geometry — Milling`。
- 图片用途 / 处理方式：解释文章已有的块体、平面、孔和凹腔概念；**完全重新生成**。
- 建议比例 / 尺寸：4:3，建议 1200×900，与 T06 一致。
- 主体位置：中；一件通用块体完整显示。
- 文字安全区：不需要。
- 呈现内容 / 风格：少量清楚的孔、一个凹腔和可见平面；白底，中性金属，柔和阴影，几何易读。
- 应避免：不可能的相交孔、破碎腔体、夸张镜面；实际客户结构、公差或检验结论。
- ImageGen 指令方向：`Create one generic prismatic machined block with a simple pocket, a small visible hole pattern and clear flat faces. Show the complete component in a three-quarter view on white, using the same neutral metal, soft light, camera scale and quiet shadow as the shaft comparison image. Keep geometry uncomplicated and plausible. No dimensions, labels, tools, hands, logos or customer-specific features.`
- 内容配合：图外保留基准面、孔位关系、凹腔深度、毛坯、装夹和检验记录等输入。

#### T08 — 多面与斜面几何说明图

- 输入：无真实订单输入；沿用 T06/T07 的光线和背景。
- 对应页面 / 模块：P09，`Compare the processes by geometry — Multi-axis`。
- 图片用途 / 处理方式：解释多面、斜面和不同接近方向的讨论；**完全重新生成**。
- 建议比例 / 尺寸：4:3，建议 1200×900。
- 主体位置：中；一件简单的多面块体完整显示。
- 文字安全区：不需要。
- 呈现内容 / 风格：两处不同朝向的可见工作面，其中一处为斜面；几何清楚，白底和金属材质与前两张一致。
- 应避免：复杂叶轮、虚构五轴机床、错误刀路或角度数值；宣称该形状只能用某一种设备制造。
- ImageGen 指令方向：`Create one simple generic faceted machined component with visible features on differently oriented faces and one clear angled face. Show the complete part on white in a readable three-quarter view. Match the neutral metal, restrained texture, soft lighting and camera scale of the shaft and pocketed-block comparison images. No machine, toolpaths, axis labels, angle values, logos or elaborate impeller geometry.`
- 内容配合：图外解释需要讨论共同基准、面间关系、装夹与刀具接近方向；最终工艺仍通过图纸评审确认。

#### T09 — 处理面与保护接口说明图

- 输入：通用知识说明，不引用真实零件作为已批准的处理方案；A01/A11 仅作视觉风格参考。
- 对应页面 / 模块：P10，`Define coated faces and protected interfaces`。
- 图片用途 / 处理方式：降低遮蔽与接口说明的文字压力；**完全重新生成**。
- 建议比例 / 尺寸：4:3，建议 1200×900。
- 主体位置：中；一个带孔和凹腔的通用块体完整显示。
- 文字安全区：不需要；标识名称和验收阶段放在 HTML 中，不烧录到图片。
- 呈现内容 / 风格：外表面用少量淡红色区域标识提示“待定义的处理面”，孔口或配合接口保持中性色；干净的工程编辑插图，与正文共同解释。
- 应避免：假涂层厚度、材质性能、具体化学处理结论、报告或合格标志；颜色不能被理解为经过批准的涂层结果。
- ImageGen 指令方向：`Create a clean engineering editorial illustration of one generic pocketed block with a bore. Keep the complete part visible on white, with neutral metal and soft restrained light. Use a subtle translucent muted-red highlight on one exterior surface to indicate an area to discuss for treatment, while keeping the bore and another interface neutral. The colored region is a discussion marker, not an actual coating result. No text, numerical dimensions, thickness values, certificates, stamps or acceptance marks.`
- 内容配合：图外配对 `Surfaces to treat`、`Interfaces to protect`、`Dimensions to check after treatment`。必要条件与检查阶段保留在表格中。

## 6. 优先处理顺序与审核建议

### 6.1 第一批：先改善阅读与真实图片适配

| 顺序 | 页面 / 对象 | 建议行动 | 预期作用 |
|---|---|---|---|
| 1 | P03 / A02 | 保留工厂照片，改为导语和 Order essentials 旁的紧凑图 | 减少首段图片占用，先看到合作条件。 |
| 2 | P09 / A08–A10 | 三张真实现场图改为完整、同高的参考缩略图，统一图注与原图出口 | 缩短手机参考图组，保留真实加工证据与原图查看。 |
| 3 | P10 / 主体文字 | 合并重复表面要求，后移相关入口 | 让材料、表面、验收连续阅读，不因加图进一步拉长页面。 |
| 4 | P08 / A07 | 先保留现图，贴近工作面说明，后移侧栏入口；手机图高控制在 240px 内 | 让图文配对，减少手机中途跳出正文的干扰。 |
| 5 | P04 / A04–A05 | 保留照片，使用完整 16:9，图与涂层定义相邻 | 改善完整性和塑料/涂层/覆层区分。 |
| 6 | P12 / 档案组 | 先给准备信息，再用紧凑完整档案图；保留日期和阶段描述 | 兼顾任务说明与真实照片，减少图集先占据长篇幅。 |
| 7 | P05 / 运输入口 | 分类页保留一张主题图，运输入口改为文字和明确 CTA | 统一两条入口结构，避免图像数量决定各行高度。 |

第一批使用现有图片完成版式与阅读顺序调整，不以照片优化或生成任务为前提。先检查桌面和手机的完整页面效果，再进入第二批。

### 6.2 第二批：制作直接帮助理解的 ImageGen 图片

优先批准 **T06/T07/T08 工艺几何三图与 T09 处理/保护接口图**。它们对应当前正文的解释缺口，新增后必须同时收紧重复文字和已有照片的展示占比。

生成时每张图单独输出；先核对技术形状与视觉统一性，再审查实际模块中的尺寸和图文关系。把说明图配对到现有比较项，同时缩短重复解释，控制整页高度；不在保留的长段落后连续追加图片。不能用生成照片替换原始现场证据，也不能把未经验证的图示标为真实零件方案。

### 6.3 第三批：低优先级细节

P01、P02、P07 统一图框与摘要；P06 保持无图；P11 保留现图与正文说明。T01–T05 均为条件选做：只有完成排版后仍影响阅读的照片才制作优化副本。T10 已撤回。

推荐顺序为：先确认第 1.2 节的三种页面结构与第一批布局范围 → 用现图完成页面调整并检查 → 制作并接入 T06–T09 两处技术说明 → 根据最终页面效果选择 T01–T05。照片改稿只服务于仍未解决的阅读问题。

### 6.4 整页完成判据

- 分类页的标题、主题图和入口顺序一致；入口行不因有无图片而高低失衡。
- 阅读指南按主题连续展开，Related part examples 与 Next step 位于主体后；手机不在两个主要章节间插入长侧栏。
- 同组照片同高、图注对齐、入口统一；完整零件、装夹和包装关系可查看。
- P03 工厂图不再占用约 776px 的整段高度；P09 手机参考图组不再连续占用约 940px 的图片高度。
- 新图在对应解释处出现；P09/P10 不因新增示意图再次明显变长，文字、图像及原图出口共同验收。
- 使用 360、390、834、1440px 及现有断点两侧检查无溢出、无文字裁切、无大块空白；图片加载前有稳定空间，加载后不明显推移后续内容。
- 不新增装饰性工厂图、物流图、批准文件、证书或客户场景。

## 附录：本轮证据与检查范围

### 页面截图概览

以下概览来自本轮保存的原始页面截图，按页编号排列；每页的完整桌面和手机截图链接已列在第 3 节。

![P01–P04：本轮桌面与手机截图概览](D:/lzz/lzz/_react/docs/resources-image-review-2026-10-13/page-sheet-01-04.jpg)

![P05–P08：本轮桌面与手机截图概览](D:/lzz/lzz/_react/docs/resources-image-review-2026-10-13/page-sheet-05-08.jpg)

![P09–P12：本轮桌面与手机截图概览](D:/lzz/lzz/_react/docs/resources-image-review-2026-10-13/page-sheet-09-12.jpg)

### 事实来源与限制

- 导航范围：[MainNavigation.astro](D:/lzz/lzz/_react/src/components/MainNavigation.astro)、[knowledgeCenter.ts](D:/lzz/lzz/_react/src/data/knowledgeCenter.ts) 及当前页面链接。
- 当前内容与图片位置：[本轮页面记录](D:/lzz/lzz/_react/docs/resources-image-review-2026-10-13/page-inventory.json)，包含各页正文、模块标题、图片来源与显示尺寸。
- 当前图片文件、尺寸与使用位置：[本轮图片清单](D:/lzz/lzz/_react/docs/resources-image-review-2026-10-13/asset-inventory.json)。
- 已查看 12 页的桌面和手机状态，18 个正文图片位置均正常加载；P04 还有一个未打开查看器使用的空图片节点，它不属于缺失图片。
- 观察中未见横向溢出；这不等于已完成所有断点、键盘、读屏或询盘功能验证。
- 包装照片的 2022 年 11 月来自现有档案登记与图注。本轮没有据此确认目的地、承运商、交付、签收或客户验收。
- 本轮没有生成或接入任何新图片；尺寸、标题、文案和 CTA 的调整均待审核。
- v1.1 只收紧推荐顺序和图片任务，页面截图沿用同日已完成的 12 页审查，不计为新一轮网页测试。
- [本轮文件检查](D:/lzz/lzz/_react/docs/resources-image-review-2026-10-13/validation.json)已核对页面覆盖、图片加载、任务编号与本地引用；2084 个代码、公共媒体和配置文件与审查前哈希一致。
