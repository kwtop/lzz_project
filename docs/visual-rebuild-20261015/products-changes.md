# Products 视觉与内容重构记录

日期：2026-10-15。依据：已批准的 `docs/WEBSITE-REDESIGN-PLAN.md`，P0–P6、S1–S2 蓝图，以及当次真实页面反馈。此工作为本地实施，没有提交或部署。

## 实施范围

- `ProductsOverviewRedesigned.astro`：真实零件拼排、六种形态入口、塑料/批次维度、三种装夹问题、完整订单条件。
- `ProductsCatalogueRedesigned.astro` 与 `PartsCatalogueExplorerRedesigned.tsx`：紧凑发现界面、具体材料值和状态、CAD/组件身份、铸件/组件形态选项、保留额外图库和材料集合。
- `ProductsPartRedesigned.astro`：35 参考记录的任务分型、单一主图、特征/图纸/验收合表、材料和订单字段、相关阅读与最终 RFQ。
- `ProductsStudiesIndexRedesigned.astro`：六工序与两独立集合分开、真实照片直接作为入口。
- `ProductsStudyRedesigned.astro`：六工序的实际场景/局部/步骤/检查；两集合逐组排列实际媒体与采购字段。
- `products-20261015.css`：仅 Products 样式。Inter 标题、1240 容器、72/48 节奏、17/16 主文；单件 H1 为桌面44、手机34。
- 新 `productsRebuild.ts`：任务映射、35 条独有补充要求、应用说明迁入、订单条件、真实裁片映射。
- 新 `public/media/products-real-details-20261015/`：7 张真实像素裁片；原文件没有覆盖。生成脚本及来源/坐标/尺寸清单保存在本目录。

未修改共享 base、Home、About、Resources、Quote 或能力页。没有新增虚构工厂、产品性能、材料鉴定、库存、产能、客户、检验或交付事实。

## 内容迁移和去重

| 原信息/模块 | 新位置与处理 |
|---|---|
| 每页长 lead 与通用 drawing/material/finish scope | 首屏改原图形态短句及按批准图纸定制；组件/CAD保持供应范围，P32保持内部弹簧未知。具体资料要求在特征表、材料字段和最终 RFQ。 |
| 主图旁来源缩略、Reference images 同图章 | 合并为一处完整主图和短来源说明。P02只保留一次新增轮毂局部。 |
| `review.features`、`review.drawing`、`review.inspection` | 特征原行完整保留；从后两段提取未被原行覆盖的内容，写入逐 P-ID 的 `partSupplement`，合为同一张 Feature / Drawing / Acceptance 表。 |
| 通用 `review.notes` | 保留在特征表后，不用新宣传文案替换。 |
| `summary.process`、`material.label/value`、`manufacturing.finishes/applications` | 进入统一 Material, finish and order 字段；材料状态与选项值没有删除，应用保留条件说明。 |
| MOQ 和生产时间 | 统一为 From 1 piece；7–14 business days after drawing and order confirmation，含 finishing；shipping additional，quotation confirms；来样重建/图纸批准独立。 |
| 工序 technical 与 steps | 按三步骤并列整合，实际装夹局部相邻；工件和装夹原描述保留。 |
| 工序 inspection / drawing / FAQ | 保留一张已有 studyChecks 表、item.inspection 和最终 RFQ；保留 turn-mill 独有 live-tooling 问答。删去重复 FAQ 展开，不删除独有表格条件。 |
| 集合的 AI 封面、Shows、重复定义 | 取消该封面与重复层；页头短定义与分组锚点后立即进入第一来源组。 |
| 集合每组形态、材料、图纸、检查 | 保留 collectionReading 四字段；每组第一张图或第一段视频与字段一行，其他照片和视频在下一行2–3列 strip，手机按组顺序。 |
| 集合页后检查 | 保留跨组 technical 全部条件和 RFQ 全列表；不再重复每组检查表。PTFE实体、金属涂层与包覆范围区别明确常显。 |
| 大量 related links | 一项相关工序、一项能力、一项相关零件或 RFQ checklist；保留有原因的连接，独立研究仍在索引全部可达。 |

原始 `productSourceReview`、`productIdentity`、`productSourceMedia`、`productBrowse`、`manufacturing`、`caseReading`、`cases` 等数据没有删改；事实提取对照为 `products-content-source.json`。这份 JSON 是源记录摘录，不是新检验或供应证明。

## 任务差异与保留条件

| 类型 | P-ID | 实施差异 |
|---|---|---|
| 单件 P2 | P00/02/03/04/11/13/20/29/32 | 一主体；P02真实根部/轮毂局部；P29实际圆形四孔；P32外部机构与内部弹簧/行程/力分开。 |
| 多形态 P3 | P01/05/06/07/08/09/10/21 | 第2模块要求指定其中部件，不把拼图当完整供货套件；各自几何、表面和保护面保留。 |
| 铸件 P4 | P18/22/23/24/25 | 毛坯/成品模型、供方、来料验收、余量/定位、保留铸态面、拒收责任先于一般参数；P23来样重建、P24功能面缺陷、P25隐藏界面条件保留。 |
| 组件/设计 P5 | P12/14/15/16/17/19/31 | 明确 machined / purchased / customer supplied、连接/紧固件与组装验收；P14装配背景、P15 CAD、P16独立CAD版本、P19/P31标记/法兰均保留。 |
| 重复件 P6 | P26/27/28/30/33/34 | 每料号/版本/材料状态/表面/批量日期、首件/抽样/追溯/变更/不合格处理；P33单件真实局部+完整排布；其余因单件像素不足保留真实完整排布，不生成假细节。 |

`partSupplement` 保留的独有条件包括：P00面平度；P01清洁和检漏/检查阶段；P02平衡及旋转试验；P04端口标准和密封；P07流体/温度；P08外观与尺寸分开；P09雕刻参照；P10统计过程/批次；P11CMM/追溯/流量；P12TIG及压力/介质；P13机罩/凸轮轴/传感器间隙；P14STEP/IGES及发动机/管路界面；P15电机包络和电子控制边界；P16喷油器/油轨对位；P17节气门/分型密封；P18铸态到成品基准；P19组装/动作；P20独立电气材料试验；P21压配与载荷；P22CMM/铸态验收；P23按模型才成立的花键；P24功能面缺陷；P25来料验证；P26调湿状态与抽样；P27导电/压力独立；P28按料号工艺；P29平行度/支撑温度；P30角度特征/孔位；P31泄漏/力/循环；P32弹簧和螺纹量规；P33薄壁/密封/平面度；P34首件报告内容。

材料牌号、标准与候选/来源列明/待确认口径仍由原 `partMaterialStatus` 输出完整 value。加工参数未从照片推断。所有特殊性能、压力、流量、泄漏、平衡、光学、电气及材料认证仍需要约定程序和验收界限。表面处理兼容性、保护面、最终处理后尺寸、塑料填料/温湿度/conditioning/载荷条件保持常显。

## About 应用描述承接

不修改 `company.ts` 原数组。以下四段原描述添加到既有 `partUseContexts`，原采购条件与能力链接继续保留：

| 原应用 | 承接详情 slug |
|---|---|
| Laboratory & scientific instruments | custom-oem-high-precision-cnc-milling-manufacturer |
| Hydraulic & rescue equipment | global-oem-precision-machining-solutions |
| Electronic & audio equipment | small-batch-cnc-machining-manufacturer-complex-aluminum-housings |
| UAVs / 3D printers / motion | custom-high-precision-machining-for-structural-aesthetic-components-oem |

## 图像与来源

- Products 总览用 P02/P32/P22/P29 真实主体拼排替换通用 AI 形态图。组 caption 明确绿色圆件使用 AI 背景。零件本体没有生成替换。
- P02原先同一完整图的4次使用合并为1次完整图+1次真实局部；其余详情取消缩略和同图大章。
- P33局部390×370，完整单件腔体、边框和安装耳可见；完整批次图在第2模块保留。目录同步局部。其余批次单件分辨率不足，没有硬裁放大。
- 6张工序裁片分别来自 five-axis、turn-mill、two-stage两图、milling-enclosure、multi-feature 原图，均无生成、擦除、重建或放大，夹持/刀具上下文可见。局部不声称完整工件，原始完整场景仍显示。
- P12/P13/P17仍使用已审核原件主图，P12批次细部、P16独立CAD、P17独立港口/内部参考保留；各自版本/同订单未知边界常显。
- 工序显示屏保留真实整板/加工/两面/视频；29-inch仍仅是显示屏尺寸，实际壳体尺寸需图纸定义。
- 集合全部原图和视频保留。视频原生controls、playsinline、muted、preload none，无自动播放，max-height 360–420；纵向素材不强行拉满横向。
- 原 `products-editorial-20261014` AI 文件没有删除；本次 Products 渲染不再使用其不对应形态的装饰性主体图。

## 交互、路径与验证

所有35详情 slug、6工序、2集合路径保留。目录 query、组合筛选、URL恢复、浏览器popstate、reset、无结果及无JS全列表保留；材料说明移到Material筛选旁。既有详情/集合常用锚点以真实 section 或 alias 保留。Quote链接及草稿型询价行为不变：从email app附图并发送，没有后台提交宣称。

最终静态比对后补回兼容锚点：35详情 `drawing-title` 接特征/图纸表、`reference-title` 接主图、`continue-title` 接相关入口、`scope-title` 接任务范围模块；研究索引 `processes-title` 接六工序入口。未恢复重复章节，按主 Agent 要求未为这次锚点补丁单独重跑 check/build。

已执行 `npm run check`：0 errors、0 warnings、9既有hints（946文件）。最后字句/同来源目录裁片修改由主 Agent 集成构建再次覆盖。impeccable `detect --json` 执行一次，只有Inter overused-font提示；用户明确要求Inter，因此保留。

本 Agent 已逐张 `view_image` 查看7张输出裁片。没有自行运行浏览器或声称已完成全站视觉QA。主 Agent 实际浏览器反馈确认：390目录首屏第一完整卡已出现、材料值/状态可读；P02/总览1440主体清楚。已按其后续反馈修改hero重复内容、P29可见身份、集合媒体长列。更新后的全页、手机、筛选功能及跨页视觉验收由主 Agent 继续执行。

代表复核路径：目录；P02 ultra-high-precision-machining-services；P15 custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier；P29 precision-machining-for-functional-plastic-blocks-structural-components；P33 small-batch-cnc-machining-manufacturer-complex-aluminum-housings；two-stage-cnc-milling；custom-plastic-parts-ptfe-pom-pe-acrylic；custom-metal-parts-batch-examples。

## 待主 Agent 集成复核

1. 更新后的集合媒体strip和工序局部/步骤布局，桌面与390px实页。
2. 35页跨类型抽查：单件、多形态、铸件、组件/CAD、重复件、细长件、浅色件。
3. 全局构建、SEO/链接/锚点、控制台、过滤URL恢复。没有新增测试去仅复述实现。
