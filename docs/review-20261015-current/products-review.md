# Products 当前源码与图片独立评审

评审日期：2026-10-15。范围：`D:/lzz/lzz/_react` 当前 Products 全族，仅评审，不改业务代码、图片、规范或部署。

## 结论

问题的重点是“读者如何识别零件、判断采购任务、找到下一步”，不是缺少采购文字。当前已经有充分的形态说明、材料选项、图纸、验收、供应范围与来源说明，但它们被分散成连续的长章节；图像又混合单件照片、多件拼图、批量现场图、CAD、装配背景和示意图，仍共用近似的展示方式。因此需要先按任务重组内容与图位，再调整排版。

不能把旧问题当成现状：P29 目前已按绿色圆形件描述，P15 已标 CAD，P14 已标装配背景，P19/P31 已保留方向标记与组件供应范围。35 个记录、6 个工序研究、2 个材料集合以及额外包覆件/齿轮图库的来源边界已存在。当前不是全部用 AI 产品图替代原图；35 主图映射中仅 P29 标记 `backgroundEdited:true`，其余为来源主体图或来源设计/CAD 图。

## 证据范围与限度

- 当前入口和模板：`src/pages/products/`；`ProductsOverviewRedesigned.astro`、`ProductsCatalogueRedesigned.astro`、`ProductsPartRedesigned.astro`、`ProductsStudiesIndexRedesigned.astro`、`ProductsStudyRedesigned.astro`；`redesignRollout.ts` 开启 `/products/` 全族。
- 数据：`productIdentity.ts`、`productSourceMedia.generated.json`、`productSourceReview.ts`、`productsEditorial.ts`、`productBrowse.ts`、`productReferences.ts`、`productSummaries.ts`、`productDetails.ts`、`manufacturing.ts`、`cases.ts`、`caseStories.ts`、`workshopCollections.ts`、`evidence.generated.json`、`additionalMedia.generated.json`。
- 样式/交互：`products-20261015.css`、`ProductsFigure.astro`、`PartsCatalogueExplorerRedesigned.tsx`。
- 已视觉检查：35 张当前主图、35 个映射 source 文件的诊断缩略板，以及 32 张工序/集合/补充图片。诊断板仅服务本报告，不是网站图片替换稿。
- 已实际查看主 Agent 重拍的可靠桌面首屏（products/catalogue/impeller/cad/plastic/studies/two-stage/collection/assembly/pin/block）；390 CSS宽手机首屏（catalogue/impeller/collection/two-stage/assembly/pin/block）；impeller与two-stage的desktop-body1/2，以及catalogue与impeller的mobile-body2。早期异常fullPage截图已排除，不作为视觉证据。
- 未完成项：本子评审未自行控制浏览器；筛选交互、DOM几何、逐像素图片边缘检查与视频播放由主评审核验。图片板只用于形态、主体占比、背景与类型判断，不能代替测量报告。
- 本报告只依据当前源码和当前图像，不采用历史设计报告结论。

## 当前问题及其影响

| 当前证据 | 实际问题 | 应如何处理 |
|---|---|---|
| `ProductsPartRedesigned` 顺序为 hero → fit-review → material → 条件 scope → drawing-review → reference-views → related → question/RFQ | 基准、接口、材料、验收在不同段落重复出现。P29 的 bore / four holes / curved edges / measurement state 在 feature table、drawing、inspection、RFQ 多次出现 | 以“识别这个参考 → 定义你的零件 → 订货资料”三步集中，而非逐句删字 |
| hero 的 lead + identity.scope + MOQ/完整生产条款 + CTA；右边主图 + 来源缩略图；来源全图又在页面后半 | 首屏有过多解释层；同一主体被看三遍，新增信息有限 | 主图下仅保留短身份标记和“查看完整来源”；完整来源放可打开的图库。真正不同的原图、局部与独立参考可保留为图组 |
| `partPlans` 定义 hero、modules、featureTitle；新详情模板只按 kind 做少数条件分支 | 许多计划字段没有驱动当前新页面；单件、拼图、批量、装配背景仍采用同类主图和章节秩序 | 给页面任务单独模板，而非只改 `partPlan.modules` 或 CSS；先明确每类最终结构 |
| `PartsCatalogueExplorerRedesigned` 卡片仅显示 `card.material.label` | 用户看到“Material options / Material to confirm”，却看不到具体材料；安全标签占空间，信息价值偏低 | 同一行显示具体选项的简写与状态，例如“Aluminum · option”；完整牌号进入详情参数表，不能把选项改成照片材质认定 |
| P01/P05/P06/P07/P08/P10/P21 是多件形态图，P27/P28/P30/P33/P34 是批量图；统一 240px desktop / 112px mobile 图片区 | 同一视觉尺度下，一枚叶轮与九件拼图的可识别性差很大；手机微缩图尤甚 | 按图片类型选择封面与比例；对拼图/批量图用有来源的单件实拍或真实局部做卡片，点击仍看完整来源；没有合适清晰图则保留小图并简化卡片层级 |
| `ProductsOverviewRedesigned` 首屏标题是“Custom parts. Made to your drawing.”，引导先找形态/看 setup；六类入口混合外形、材料和行业 | 已说明定制，但具体“加工什么、怎样选”仍要跨图和多个入口推断 | 首屏直接给“CNC milled and turned parts, made to your drawing”式可核查业务描述；主入口按形态，塑料作为材料维度，汽车作为独立应用参考，Plan a batch 作为任务入口 |
| 工序页先 Shows/For your drawing，再 technical、steps、inspection table、questions、RFQ | 用户尚未看清图里的工件，就进入多个文字体系；相同验收问题分散 | 每个工序用“来源图 + 看哪一个位置 + 对新图纸意味着什么”组合；一张集中表承担图纸与验收，不再追加同义 FAQ |
| 工序图片里夹具/机床占大面积；原图本身并非坏图，但小尺寸 contain 后工件很小 | 证据够真实，但不能迅速解释工序差异 | 用完整环境图保留工装关系，旁边加真实工件局部并用编号指向，不生成新工件或改掉夹持事实 |
| 材料集合每 family 已包含 drawing/inspection，页后 checks 又逐 family 输出相同字段 | 同一信息显式重复，集合读成多篇采购说明串联 | 每组保留“实际图/视频 + 一句识别 + 材料状态 + 两项关键要求”；统一验收表只保留跨组差异，不重复原文 |

现有 `object-fit:contain`、完整来源保留、移动端筛选折叠、原图/AI 标签均已有实现，不应建议“补做”成新的发现。需要核验的是它们在当前内容下是否达成识别目标。

## 页面任务分型与最终模块顺序

### 1. Products 总览：30 秒内知道做什么、走哪条路

1. **业务首屏**：一句 CNC 铣削/车削定制零件业务描述；一句输入是图纸或样件（样件重建需独立确认）；一张有主体的真实零件图或由真实来源组成的明确拼版；“Find a part form / Review machining setups”两个入口。
2. **六类形态入口**：壳体/盖板、旋转件/接头/销、块件/支架/圆形件、叶轮、铸件机加工、复杂组件参考。每类一张能代表分类的图和 1 行形态差异。塑料、批量用横向独立入口，避免把材质/数量冒充形态。
3. **工序证据**：只选 2–3 个差异清晰的真实工序；一个通向全部 6 个研究的入口。图与工序问题相邻。
4. **订货起点**：保留材料/图纸/数量/验收输入及完整交期条件；压成一块结构化清单，与 RFQ CTA 在同屏。通用方法链接 Resources。

布局：桌面首屏左文右大图、形态 3×2；手机先业务句再图再入口。全页避免第二套“为什么选我们”或重复能力陈述。

### 2. 35 条参考目录：先识别，再筛选

1. 标题明确“Part form references”，解释 35 是参考记录，不是 35 个可下单 SKU，也不是每条仅有一个零件。
2. 形态选择 + 搜索；工艺/材料/订单作为次级筛选，保留现有 URL 状态和返回行为。
3. 卡片：清楚图像、短形态名、一句区别、具体材料选项及状态。CAD/装配上下文必须在卡片上标明，不只在详情说明。
4. 额外图库以两个入口保持可发现：包覆件、齿轮。全组图片不必在每次浏览 35 卡后继续铺满；可进入锚点区域或独立目录块，保留现有地址与锚点。
5. 最短询价入口。

布局：桌面 3 列可保留，但按类型统一主体光学大小；手机优先图 35–40%宽的列表，仅一条差异说明。批量/拼图类需另选可识别真实局部，不能机械套 112px。

### 3. 具体形态详情：按任务采用六种结构

| 类别与记录 | 最终模块顺序 | 必须留住的区别 | 推荐布局 |
|---|---|---|---|
| 单件/特征：P00/P02/P03/P04/P11/P13/P20/P29/P32 | 形态与供应定义 → 主图+2–3个特征 → 一张图纸/验收表 → 材料/表面/订单 → 真正新增参考 → RFQ | 叶轮的叶面/根部/轮毂；销的安装/啮合与内部弹簧未知；P29 圆形和四孔；盖板的配合/外观 | 大主图与简短识别并排；特征紧邻真实局部；表格列为 Feature / Drawing / Acceptance |
| 多件形态参考：P01/P05/P06/P07/P08/P09/P10/P21 | 本图包含哪些形态 → 原拼图和选中对象 → 共用材料/工艺 → 2–3项差异化接口 → RFQ | 必须说明图里是多种形态，不把其中任一个想象成全部供货；P08/P09 强调最终表面与保护面 | 首屏用完整拼图但限制尺寸，下面用分区文字对应真实子图；不复制多张同一拼图 |
| 铸件二次加工：P18/P22/P23/P24/P25 | 铸件与加工面 → 毛坯责任 → 完工图与余量/基准 → 验收 → RFQ | blank supplier、incoming acceptance、余量、保留铸态面、拒收责任；不得推断照片未见内孔/花键/功能 | 毛坯/可见加工面图旁放一张职责表；图纸输入必须先于泛用工艺说明 |
| 装配/设计/CAD参考：P12/P14/P15/P16/P17/P19/P31 | 参考类型 → 需要报价的组件 → 原图/独立参考 → BOM与接口 → 材料/连接/功能验收 → RFQ | P14 不等于整机供应；P15 CAD 不等于实物；P16独立CAD版本未知；P19/P31手柄/螺钉/标记；焊接/泄漏/流量分开约定 | 组件范围作为首屏必要信息；大图配“included / to define”结构化字段（无证据项填待定义），不要机械长 disclaimer |
| 批量/重复件：P26/P27/P28/P30/P33/P34 | 具体零件形态 → 批量来源图 → 单件关键接口 → 每项订货定义 → 首件/后续抽样/追溯 → RFQ | P26是长条重复孔；P28/P34不推断混材质/配套套件；P27螺纹/镀层/合金；P30/P33壳体接口不同 | 首屏一张真实局部识别形态，下方原批量图给数量视觉上下文；不把照片排布当产能或交付证明 |
| 聚合参考中的特殊材料任务（与以上重叠） | 在图纸/验收表内前置 grade / condition / temperature / support | 聚合物不凭颜色判材质；不锈钢不默认316L；处理后尺寸/遮蔽面保持 | 用参数表的条件列表示，不新增第二套重复章节 |

以上类别互斥主模板以“读者当前任务”为准，材料作为叠加字段；不是再增六种导航层级。现有 35 路由保留，避免重命名造成无必要迁移。

### 4. 六个工序研究：从真实画面读出一个加工问题

统一最终顺序：**工序问题 + 原图 → 原图中的工件/夹持/刀具访问关系 → 新图纸的2–3步规划 → 一张图纸/验收对应表 → 必要补充图/视频 → RFQ与一个相关工序**。

| 路由末段 | 页面核心问题 | 布局特殊处理 |
|---|---|---|
| `five-axis-machining-multi-face-parts` | 多面特征如何共用基准并获得刀具访问 | 原旋转装夹全图与工件真实局部并列；完成件批图做补充，不声称全部同步五轴 |
| `turning-then-milling-cylindrical-parts` | 铣削孔/槽如何联系已车出的轴线 | 先让用户看到圆件，再看夹持；以同一张图纸输入表承接基准轴/角度/端面 |
| `two-stage-cnc-milling` | 换装夹后如何保持两面关系 | 保留当前两张真实装夹并排这一正确做法；两图同等显示尺度，分别写可见面/接触面；手机连续呈现并保留编号 |
| `milling-a-pocketed-enclosure-form` | 腔深、壁厚、内角和装夹之间如何约束 | 全景图+真实腔体局部，取消另一个不同零件的 AI 概念图对形态识别的干扰 |
| `milling-prismatic-components` | 面、孔、开口如何从安装基准定位 | 当前工件小、环境暗；真实局部放大优先，批量长图放后，不把示意体当拍摄主体 |
| `29-inch-display-housing-cnc-machining` | 大面板支撑与平面度如何定义 | 完整面板/两面图 → 机床图 → 可选视频；29-inch只做显示器名称，不等同外壳尺寸或行程 |

工序页现有 AI 概念图已注明与实拍形态不同，因此问题不是未披露；问题是它增加了读者同时理解两种形态的负担。若必须解释基准，应先使用原图编号与简洁线图，线图只表达关系，不冒充来源工件。

### 5. 两个材料集合与两个额外图库：用真实来源分组，不冒充连续项目

材料集合顺序：集合定义 → 页内分组导航 → 各来源组的图/视频与两项采购区别 → 跨组差异表（只新增内容）→ RFQ。金属组为车削/壳体/黄铜/清洗片段；塑料组为 PTFE/POM/PE/acrylic。清洗视频保留清洗后这一来源说明，不升级成最终验收、出货或统一订单证据。

包覆件图库依次展示轮/滚筒/异形包覆件，每类图下紧接 core、covering、hardness、bonding 待定义字段；齿轮图库依次圆锥/圆柱，紧接 tooth specification、module（待定义）、mating part、inspection。照片无法证明配方、硬度、齿数、精度，字段不可自行填数。

## 内容迁移表：减少重复，但不损失资料

| 当前内容 | 最终位置 | 合并方式 |
|---|---|---|
| lead、identity.scope、review.intro | 首屏识别+供应范围 | 留一句形态、一句供货定义；CAD/装配等关键事实可见；通用“以图纸为准”只出现一次 |
| review.features + checks、review.drawing、review.inspection | 一张任务表 | 每个特征只对应一份图纸要求与验收要求。drawing/inspection 中不在 feature 内的条件增入表脚，不丢弃 |
| Material、summary.process、manufacturing.finishes | 材料与制造参数表 | 保留确切牌号、候选/列示/待确认状态、stock/condition、处理兼容性、最终尺寸与保护面 |
| manufacturing.applications、partUseContexts | “使用条件”短段或相关应用链接 | 保留有助于定图的环境/载荷/功能条件；删重复行业名单，不能把使用情境升级成真实客户应用 |
| casting/supply-scope | 对应任务的核心模块 | 铸件/组件/销/塑料/批量各自保留独有内容；只搬位置，不折叠到难发现的免责声明 |
| visible notes、productQuestion、review.rfq | 集中表脚 + RFQ资料清单 | 每个独有要求留一份；仅当 FAQ 解决新问题时保留问答 |
| 主图+来源缩略图+来源大图 | 一个图片区域与可打开完整来源 | 相同图片不再三次展示；对完整来源和裁切图保持可访问对应；独立CAD/独立实拍用独立标签 |
| 重复RFQ/验收流程、通用方法 | `/resources/rfq-checklist/`、ordering guide | 页面保留具体输入和可执行CTA；通用解释迁出而不是删除技术信息 |

参数保留规则：当前写出的 6061-T6、7075 alternative、6061/3003 options、303/304/316L/17-4PH options 等按记录原状态保留；不得跨记录整合成“所有材质都已生产”。现有 MOQ from 1 piece 与 7–14 business days after drawing/order confirmation、including finishing、shipping additional、quotation confirms schedule、sample reconstruction separate 的条件不能只剩一个醒目数字。没有数值公差、粗糙度、硬度或性能实测证据的地方继续用待定义条件，不为了“参数丰富”补数。

## 图片处理总原则

先统一读者看到的主体清晰度，再统一背景。当前低价值差异主要是：单件/拼图/批量不分、不同留白、主体尺度不一致、实拍环境与设计图混排。不是全库都需要 AI 重做。

- 保留照片主体、孔/槽/螺纹/边缘、标记和装配关系；不通过生成补齐看不见的结构。
- 已有可用原图优先裁切空白、调整版式、白平衡/曝光；报告所说裁切仅是建议，尚未实施。真实局部须能返回完整原图。
- 多件拼图/批量图的“精选单件”只能来自现有像素或补拍，不能把一张拼图生成成新的虚构成品。
- 高质量补拍标准：全件三分之四视角+关键接口近照+背面/配合面；同一光线、中性背景、可识别边缘，不带未经证实尺寸/材质标签。
- 保持小源图的实际展示尺寸。P00/P03/P14/P15/P18/P22/P23/P25/P32 的主图输出宽度仅约480–680px级（P16/P29另有更大来源），不应因文件名含1200就当作可放大到1200px的高精原图。

## 35 条主图逐文件处理清单

下表的文件均为当前实际引用。`public` 为项目 public 目录；源路径、对应 slug 和原始尺寸见 `productSourceMedia.generated.json`。表中任务类型来自实图判断，不等于材质或性能鉴定。

| 记录/真实图像类型 | 当前主文件 | 处理方案 |
|---|---|---|
| P00 · 圆盘多孔件 | `public/media/product-sources-20261015/p00-framed-1200.webp` | 保留当前已去多余外白边的版本；配合端面/孔列用真实局部，原图放大入口保留。无需重做主体。 |
| P01 · 九种铣削形态拼图 | `public/media/product-sources-20261015/p01-1200.webp` | 目录只读出小金属块；若能从原图取足够清晰的一件，卡片用真实局部，详情保留完整拼图并写多形态参考。 |
| P02 · 曲面叶轮 | `public/media/product-sources-20261015/p02-1200.webp` | 主图可留；保留现有 hub-detail 真实裁切，把完整图与局部合为同一特征模块，删除后续同图重复。 |
| P03 · 斜颈车削件 | `public/media/product-sources-20261015/p03-framed-1200.webp` | 保留斜颈角度与完整底缘，按竖向主体展示；用图旁短句说明螺纹轴与主体轴关系，不生成额外背面。 |
| P04 · 蓝色圆形多面件 | `public/media/product-sources-20261015/p04-framed-1200.webp` | 横向比例保留；小卡片需要减少上下空白，不能进一步放大到丢掉外缘孔；颜色不等于已确认处理。 |
| P05 · 多种圆形/块状零件组合 | `public/media/product-sources-20261015/p05-1200.webp` | 不适合作为单一轴类清晰封面；优先同来源单件局部或补拍，完整组合保留详情，不把其中块件误称轴。 |
| P06 · 六种旋转/块状形态 | `public/media/product-sources-20261015/p06-1200.webp` | 拆清“本图包含多种参考形态”；卡片挑能看清孔和法兰的一件真实裁片，勿重绘新组合。 |
| P07 · 接头/法兰/螺纹件拼图 | `public/media/product-sources-20261015/p07-1200.webp` | 卡片优先一枚接头真实局部；详情完整拼图加螺纹/密封/安装三项要求，不推断连接标准。 |
| P08 · 黑色表面处理件拼图 | `public/media/product-sources-20261015/p08-1200.webp` | 主体边缘暗、多个轮廓抢视线；用一件真实清晰近照作封面或补拍；完整图留表面形态图库，不用AI抹黑处理细节。 |
| P09 · 彩色结构件组合 | `public/media/product-sources-20261015/p09-1200.webp` | 色彩与形态足够清楚，可保留；控制尺寸与周围卡片一致，外观色作为参考而非色号证据。 |
| P10 · 多种小车削件组合 | `public/media/product-sources-20261015/p10-1200.webp` | 小件数量多、手机难认；封面选一处真实局部，完整图放多形态参考，不据排布声明高产量。 |
| P11 · 第二种叶轮形态 | `public/media/product-sources-20261015/p11-1200.webp` | 保留并与P02区分轮毂/叶片形态；不将两张图并成同一产品多角度；需要补拍时各自记录来源。 |
| P12 · 竖幅中冷器实拍 | `public/media/product-sources-20261015/p12-1200.webp` | 保留金属主体与鳍片，首屏竖向中等尺寸；背景可通过版式减少存在感，独立batch-detail后置；不要把散热性能当图像可证。 |
| P13 · 手持盖板实拍 | `public/media/product-sources-20261015/p13-1200.webp` | 手持有真实尺度感，适合证据模块；商务封面优先补拍完整盖板，现图不要生成去手后补出的边缘。 |
| P14 · 发动机/进气装配背景 | `public/media/product-sources-20261015/p14-framed-1200.webp` | 不能作为“单个流道零件”产品大图；在装配范围页作为上下文图保留，增加明确需报价组件字段；单件图待补。 |
| P15 · 节气门彩色CAD | `public/media/product-sources-20261015/p15-framed-480.webp` | 保持CAD线条和颜色，单独“CAD reference”标识；480px级源不要当高精大图；若需要实物封面只能补实拍。 |
| P16 · 进气流道设计参考 | `public/media/product-sources-20261015/p16-framed-1200.webp` | 与独立 runner CAD 外观近似，不能视觉拼成同版型证明；保留一张主要设计视图，第二张只在确有新增信息时展示并标独立来源。 |
| P17 · 车间进气腔体实拍 | `public/media/product-sources-20261015/p17-1200.webp` | 保留完整实拍；port/internal detail紧接相应接口说明，勿把独立细节拼成同一剖面或连续工序。 |
| P18 · 带筋壳体 | `public/media/product-sources-20261015/p18-framed-1200.webp` | 可留当前裁切版；切勿抹掉铸态纹理；配合面以原图局部解释，内部功能不从外形命名。 |
| P19 · 两法兰件+手柄+标记+螺钉 | `public/media/product-sources-20261015/p19-framed-1200.webp` | 保持全部螺钉和ON/OFF字样在图内；主体是组件范围参考，单一轴件裁切会丢事实，建议保留整组。 |
| P20 · 浅色圆形非金属件 | `public/media/product-sources-20261015/p20-1200.webp` | 可留，略暖白背景与浅件对比需真实曝光优化或补拍；不要自动漂白材质或把槽/孔补齐。 |
| P21 · 橙/黄色多种塑料形态拼图 | `public/media/product-sources-20261015/p21-1200.webp` | 优先选一件可识别真实裁片；详情保持多形态语义；颜色不能分出材料牌号。 |
| P22 · 开口铸件壳体 | `public/media/product-sources-20261015/p22-framed-1200.webp` | 保留当前完整形态；有齿状/内部纹理可见但不得据此扩写未证实功能；首屏旁直接给毛坯/完工责任。 |
| P23 · 带连接口圆形壳体 | `public/media/product-sources-20261015/p23-framed-1200.webp` | 竖幅平衡图像即可；保持完整上下接口，不把其确定为泵或通流结构。 |
| P24 · 不规则铸件 | `public/media/product-sources-20261015/p24-1200.webp` | 当前主体偏小，可检查原始空白裁切空间；优先补拍配合面和背面，不能凭空补内腔。 |
| P25 · 开口铸件结构 | `public/media/product-sources-20261015/p25-framed-1200.webp` | 横幅保留，局部只展示真实孔/安装面；配色偏亮但无需统一成渲染金属质感。 |
| P26 · 绿色重复孔长条 | `public/media/product-sources-20261015/p26-1200.webp` | 保持长条与重复孔事实；卡片可取一排真实局部；不再用薄壁深腔的替代渲染作为形态。 |
| P27 · 黄铜色接头堆放 | `public/media/product-sources-20261015/p27-1200.webp` | 真实但拥挤，建议补一枚全件三分之四实拍；现图退为批量上下文，颜色不代替合金确认。 |
| P28 · 小壳体整齐排布 | `public/media/product-sources-20261015/p28-1200.webp` | 取一件清晰局部识别形态，完整来源放批量模块；不推断壳体/盖板配套关系。 |
| P29 · 绿色圆形件，AI中性背景 | `public/media/product-sources-20261015/p29-framed-1200.webp` | 当前已正确保留圆形和四孔；检查边缘与原图一致后可留。AI背景标签保持；主图与原来源不要各占一个大模块。 |
| P30 · 开放壳体行列 | `public/media/product-sources-20261015/p30-1200.webp` | 卡片取一件真实壳体；完整排布留批量模块；侧开口/安装耳和壁厚要求要相邻，不凭图推断复合角面。 |
| P31 · 旋转组件与独立法兰 | `public/media/product-sources-20261015/p31-1200.webp` | 保持ON/OFF标记与分离法兰同框；不要当普通316L轴；若补拍需补组件连接关系而非抽象金属表面。 |
| P32 · 索引销外形 | `public/media/product-sources-20261015/p32-framed-1200.webp` | 可保留真实横向形态并放大主体占比；外图不展示内部弹簧，不能加生成剖面表示其真实结构。 |
| P33 · 开放铝壳体批图 | `public/media/product-sources-20261015/p33-1200.webp` | 当前真实细节清楚；目录主图可用一件真实裁片，批图后置；四周接口与盖/密封配合待图纸定义。 |
| P34 · 重复车削件行列 | `public/media/product-sources-20261015/p34-1200.webp` | 卡片选一件真实局部；批量全图后置，BOM决定材料与型号，不能称已证实混材质HMLV套件。 |

## 工序、集合与其他重要图位逐文件方案

以下均在 `public/media/` 下，括号中的文件保留独立来源，不合成同一次订单的证据。

| 当前文件/图位 | 当前图像观察与处理 |
|---|---|
| `products-editorial-20261014/part-families-1200.webp`，Products首屏 | 当前为明确标注的AI形态组合。建议让真实代表件成为总览主视觉，AI图最多作为分类示意；不能当实际产品/工厂证明。 |
| `evidence/five-axis-operation-1600.webp` | 保留旋转装夹全景；增加只来自这张图的工件局部，工具/夹具关系完整。 |
| `evidence/five-axis-parts-1600.webp` | 竖向批图，后置为形态补充；不在目录微缩显示。 |
| `evidence/turn-mill-operation-1600.webp` | 保留真实装夹；夹具占据大半画面，增加工件近区裁片而非重新生成工件。 |
| `evidence/turn-mill-parts-1200.webp` | 蓝箱中多个法兰件，识别性比机床图好；可作为目录形态辅助，不能替代工序记录。 |
| `evidence/two-stage-first-1600.webp`、`evidence/two-stage-second-1600.webp` | 两张都是必要证据，保持配对；相同裁切原则、分别编号“可见面/定位面”，禁止合成为动画宣称完整加工路径。 |
| `evidence/milling-enclosure-operation-1600.webp` | 工件小，保留全景并增加真实近区；图旁解释腔体/刀具访问，而非整段泛用铣削文字。 |
| `evidence/milling-enclosure-parts-1600.webp` | 竖向重复件，作为完成形态上下文；一件真实局部可以承担识别，不推断实际验收合格。 |
| `evidence/multi-feature-milling-operation-1600.webp` | 暗背景与小工件；优先真实曝光调整/局部或补拍，不能去掉真实夹具使其变“漂亮成品图”。 |
| `evidence/multi-feature-milling-parts-1600.webp` | 长条批图，横向空间利用差；后置完整图，另取可辨识部位。 |
| `evidence/display-housing-panel-1600.webp` | 面板整体形态清楚，适合首图；保留外形，不推算29-inch实体宽高。 |
| `evidence/display-housing-machining-1600.webp` | 加工上下文够清楚，紧随完整面板解释支撑/访问。 |
| `source-details/display-housing-pair-1200.webp` | 两面比较有新增信息，保留；竖图不要塞进横向固定高微缩框。 |
| `source-details/display-housing.mp4`及poster | 留为可选近看；不自动播放。当前子评审未播放，不对视频画质/完整性结论。 |
| `collection-covers/plastic-collection-illustrative-v1-1200.webp`、`metal-collection-illustrative-v1-1200.webp` | 目前都注明AI导航封面。建议目录封面换真实来源组中最清楚的代表，集合页跳过重复的大封面，直接到来源组。 |
| `source-details/plastic-ptfe-batch-1200.webp` | 纸箱杂堆，不宜做漂亮封面，但能保留原始来源上下文；退为组内完整图。 |
| `source-details/plastic-ptfe-intermediate-1200.webp` | 重复浅色平面件，可放组内第二层；对比度不足时补拍单件，不改变材质表面。 |
| `source-details/plastic-ptfe-shafts-1200.webp` | 竖幅轴形明确，可作PTFE组主图；材料称谓仍按来源组，不代表检测鉴定。 |
| `source-details/plastic-acrylic-batch-1200.webp` | 透明件密集、红背景抢眼，保留原图但不做主封面；优先补拍单件。 |
| `source-details/plastic-acrylic-detail-1200.webp` | 近景能看出轮廓但桌面杂物多；可真实裁切减少边缘杂物，不能抹出未拍到的透明边界。 |
| `source-details/metal-turned-shaft-1200.webp` | 与P32索引销形态关联，当前已在集合标题中补“Locking-pin”；优先作车削组代表，避免继续称通用长轴。 |
| `source-details/metal-turned-batch-1200.webp` | 细长竖幅排布，后置完整来源，不能代替规格表或批量交付证据。 |
| `source-details/metal-aluminum-housings-1200.webp`、`metal-aluminum-close-1200.webp` | 同类壳体但不同画面，close优先识别，完整排布后置；不重复放两张同等大图却不给各自信息。 |
| `source-details/metal-brass-batch-1200.webp` | 与P27同类堆放图，复用来源可，但目录和集合不能因此伪装新增案例；建议补拍单件。 |
| `source-details/plastic-pom-gears.mp4`、`plastic-pe-guides.mp4`、`plastic-ptfe-parts.mp4`、`plastic-acrylic-parts.mp4`（及各自poster） | 四条各自独立来源，保留原视频；封面应清楚呈现对应齿轮/导条/组件/透明件。子评审只查注册元数据与截图poster，未播放。 |
| `source-details/metal-cleaned-parts.mp4`及poster | 360×640来源，保持小播放器，说明清洗后零件片段；不放大做高精工艺英雄背景。 |
| `source-details/covered-wheels-1200.webp` | 相对干净且轮毂/包覆层明确，保留作包覆件图库首图。 |
| `source-details/covered-rollers-1200.webp` | 双辊完整形态有用；图内出现的纸面内容不宜被放大成可承诺参数，正式使用前另检查敏感/可读信息。 |
| `source-details/covered-shaped-parts-1200.webp` | 金属芯与黄色包覆分界清楚，保留；两项接口说明即可，不凭颜色判断PU/橡胶配方。 |
| `source-details/gear-bevel-examples-1200.webp` | 多个锥形齿轮，横幅保留；卡片取最近一件真实局部并能返回完整图。 |
| `source-details/gear-cylindrical-examples-1200.webp` | 近处齿轮较清楚但背景杂；保留真实裁片，配齿形/孔毂待定义参数，不按照片估计齿数/模数。 |
| `source-details/intake-runner-cad-1200.webp` | 与P16来源视图视觉接近；仅在提供新增信息时展示，明确独立参考，不合并版本。 |
| `source-details/plenum-port-detail-1200.webp`、`plenum-internal-detail-1200.webp` | 真实细节有价值，分别与port/内部可见形态相邻；不能当同一受控剖面或验证顺序。 |
| `source-details/intercooler-batch-detail-1200.webp` | 独立重复鳍片/端部参考，后置；不证明同一订单、散热性能或统一批次。 |

`case-stories-20261014/{turn-mill-form,multi-face-form,two-setup-form,pocket-form,prismatic-form}-1200.webp` 当前在工序正文中承担不同于原件的AI概念图。建议默认撤出原件识别主线；如保留，只在单独解释框中表达一个抽象关系。两次装夹页面尤其不需要在已有两张真图之后再插入第三种工件。以上是位置建议，不否认当前已有AI标签。

## 实际截图补充：已看到的阅读与视觉问题

### 手机首屏（390 CSS宽，截图由主Agent提供，本评审已实际打开）

- `screens/catalogue-mobile.png`：页头、面包屑、两行标题、介绍、搜索、形态选择、折叠筛选、材料说明、结果数几乎占满整屏，第一张卡只在底部露出。应把介绍收成一句，把材料限定移到材料筛选旁，在不取消搜索的前提下让首屏至少出现一条完整参考。这个问题是信息优先级，不是按钮难点按。
- `screens/impeller-mobile.png`：标题后出现大主图、长来源图注、再次出现同一叶轮缩略图及来源跳转，产品说明到屏幕底部才开始。应去掉重复缩略条，在标题后放一句“该形态做什么/要定义什么”，再放主图；完整来源保留一条链接。主图本身清楚，不需要生成替换。
- `screens/collection-mobile.png`：集合定义已解释一次，AI封面图注再次解释不是实拍批次，随后Shows继续重复来源组信息。首屏仍看不到原始来源组。建议集合页直接进入有明确标题的第一组原图/视频，集合级说明压成一次。
- `screens/two-stage-mobile.png`：两张原始装夹图按顺序出现，图本身合理，但第一张图前后没有能直接指出“看哪里”的短标注。保持两张真图，在每图旁只标当前可访问面与定位关系；不把图前说明扩成长段。

### 桌面章节与整体阅读

采用已重拍的可靠首屏与正文分段截图。截图里尚未加载的图位不判断为坏图；全页重复次数由模板源码确认。

- impeller：desktop首屏与body1确认完整图、来源缩略、局部旁完整图重复；模板还在Reference images第四次输出。body1中的整体+局部有教学作用，首屏有识别作用，其余合并来源访问。body2显示应用段再次重复模型/叶面/轮毂/材料条件，随后进入材料表；单纯减小间距不能解决冗长。
- cad/plastic：首屏身份与形态正确。源码确认cad的Supply scope、Drawing and acceptance、尾部functional-test重复；plastic的material/measurement、operating conditions、drawing/acceptance分离。它们是源码内容问题，不声称已逐屏视觉走完这些长页。
- studies目录：首屏大片空间用于两层导语，第一个工序到下半才出现；机床环境缩略图中的零件很小。标题可具体写“Machining setups and part references”，只留一层解释，使可选择对象更早出现。
- collection：可靠首屏依次是标题/定义、AI封面/标签、Shows/For your drawing、Explore the original part families的第二段定义，真正原图尚未进入屏幕。正文重复情况依据模板和数据；建议重组为四组可浏览的实图条目。
- assembly/pin/block：三种不同图像任务仍采用同一首屏。assembly 主体暗且本就是整体装配图，应尽早明确需报价组件；pin 原照片在大幅显示时明显偏软，更适合受控大小或补拍，不宜锐化伪造螺纹细节；block 拼图在大图可辨九种形态，重复缩略图没有新的用途。
- two-stage body1/2：三列文字讲datum/clamping/inspection，紧接下一模块又用定位/换向/检查三步骤讲同一逻辑。可合成“每个装夹看什么 + 新图纸需要给什么”，把原图与要求并排。
- catalogue-mobile-body2：多个拼图虽显示成功，但每个形态很小，卡片材质行只有“Material options”。这直接支持封面择取与输出具体材料值的建议。
- impeller-mobile-body2：表格已正确堆叠，没有横向挤压；但每项反复出现“Define on the drawing / Agree for acceptance”，一屏只能读两项左右。保留语义标签，缩短重复措辞、让图旁数字与条目对应即可，不必改成隐藏信息的复杂交互。
- assembly/pin/block 手机首屏：都在主图后重复来源缩略与图注，再出现业务说明。此顺序是通用问题，来源保留一处可访问入口即可。

## 实施优先级与完成判据（本次未实施）

1. 先改一个单件P02、一个CAD/装配P15、一个批量P33、一个工序two-stage、一个plastic集合，按本报告任务结构做可预览样页。保留旧路由与所有独有参数。
2. 同步整理目录卡片：具体材料值、身份类型和真实可识别封面；验证390px首屏能看到至少一条完整参考，筛选恢复和数量正确。
3. 再覆盖其余记录。核对每条独有工况/材料/表面/毛坯责任/装配/验收条件均有最终位置；精简只能消除重复，不得删掉用户作采购判断的技术条件。
4. 图片验收逐对照源图检查：孔数、边缘、螺纹、标记、配件与比例；AI背景/示意与实拍身份可识别；同一源图不占多个大模块；新补拍/新裁切与来源的对应可追溯。
5. 运行项目适用的check/build与路由/锚点/链接检查，浏览器检查桌面及390px，并验证RFQ仍只准备邮件草稿。这些是后续实施完成判据，本次评审没有执行发布或更改页面。

报告附属检查图：`products-current-inspection.png`、`products-source-inspection.png`、`products-evidence-1-inspection.png`、`products-evidence-2-inspection.png`。这些仅为当前源文件的缩略对照，保留作审查证据。
