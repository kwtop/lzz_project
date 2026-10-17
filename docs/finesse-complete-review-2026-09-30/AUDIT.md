# LZZ 全站 finesse 设计审查

审查日期：2026-09-30。阶段：先只读 audit，完成本报告后再实施明确有收益的调整。

结论：现有工业摄影、克制的红色行动色、编辑式排版及技术资料层级适合 brand / B2B corporate website。保留当前字体、品牌色、首页主体、信息架构和有效页面布局。最高收益的调整是把案例来源边界和询价入口放到阅读前部；另修正 36 个页面上的独立触控目标，并提高图片来源说明的可读性。

## 范围与证据

- 80 个公开页面逐页查看桌面全页截图，逐页测量 1440、320、375px；另检查 404 和内部首页预览，共 82 个构建 HTML。
- 页面类型覆盖首页、36 个产品页、11 个能力页、9 个案例页面、18 个资源页面、About / Factory / Quality、Quote / Privacy。
- `audit-page-evidence.json` 与 `before-screenshots/` 保存全部公开页桌面证据；`audit-mobile-evidence.json` 保存 320px 测量；`audit-375-evidence.json` 保存 375px 测量。未展开的原生 details 内的延迟图片不计作缺图。
- 审查基线 `before-source.zip`、`before-content.json` 独立保存本轮开始前状态，防止把上一轮已完成工作计入本轮。
- 1440、320、375px 的 80 个公开页面均未出现实际横向溢出。未把缺少防御 CSS 误报为已有页面溢出。

## 三项扫描

1. **anti-cheap**：本地 detector 扫描 98 个源文件。原始 P0 命中 4 条，须人工归因：URL 对象创建被正则误识别为本地文件引用；导航和 Disclosure 文件的动画由已有全局 reduced-motion 规则约束。保留原始 JSON，不宣称机器结果为 0。摄影、真实工件目录和有意义的工序编号保留；没有证据支持强制增加纹理、打乱可比较的产品目录或更换字体。
2. **spectacle**：品牌页面采用低动效方向，SPECTACLE=2，已有 CSS 反馈和 reduced-motion 回退。没有声称或需要 3D / WebGL / 滚动戏剧化效果。真实工业照片承担视觉表现。
3. **preflight / mobile-floor**：独立交互区域要求至少 44px；本轮确认首页材料入口 36px、35 个产品详情页材料/工艺标签 40px。正文行内链接保留阅读语义，不套用大按钮布局。根节点 overflow-x 和标题断词保护缺失，虽当前测量不溢出，仍需补齐移动端底线。

## 有明确收益的发现

### P0 — 交互尺寸未通过硬性底线

**F1：36 个页面的独立导航目标不足 44px。**

- 屏幕所见：首页材料导航高度 36px；35 个产品详情页的分类导航标签高度 40px。1440 / 375px 共有 121 个命中；320px 为 119 个可见命中。
- 访客影响：手指点击面积偏小，尤其相邻材料和工艺标签容易误点。
- 定位：`src/styles/studio-refinement.css:320`；产品 `.specification-band .category-links a`；集中覆盖于 `src/styles/finesse-redesign.css`。
- 修改命令：`/finesse redesign`，补齐 44px，保留文字、链接和自动换行。

### P1 — 信任与阅读路径

**F2：8 个案例的摄影/项目范围说明默认折叠且位于正文之后。**

- 屏幕所见：`Photography & project scope` 位于桌面绝对 Y=1694–6064px。塑料合集的说明 Y=6064px，询价按钮 Y=6239px；320px 下分别约为 9092 / 9266px。
- 访客影响：先看到很多照片，再看到“不同零件，并非同一客户订单；材料等级、尺寸和验收结果需订单文件核对”的边界，容易将图库解读为已证实的客户交付案例；长页面的询价路径也偏远。
- 定位：`src/pages/cases/[slug].astro` 的 `.case-content aside`。
- 修改命令：`/finesse redesign`。把同一份说明和同一询价按钮移动到标题后、照片前，说明默认展开。保留全部原文和 related capabilities。

**F3：两篇长材料合集的页内目录默认折叠。**

- 屏幕所见：金属/塑料合集桌面高度约 5945 / 7217px，`On this page` 默认仅显示一行；手机更长。
- 访客影响：采购访客难以快速跳到自己关心的材料，必须逐段滚动。
- 定位：`src/pages/cases/[slug].astro` 的 `.study-contents`。
- 修改命令：`/finesse redesign`。仅对两篇 collection 默认展开现有目录，以紧凑列式导航保留全部标题、锚点与顺序。

### P2 — 可读性与稳健性

**F4：首页插图来源、About 应用图说明字号为 11px。**

- 屏幕所见：首页 `Illustrative machining visual` 与 About 已展开应用示意图的图注较小。About 图注已准确区分 AI 生成图和来源照片。
- 访客影响：访客可能错过真实摄影与示意图的区别，弱化真实感和信息边界。
- 定位：`src/components/HomeEditorial.astro:21,55`、`src/components/ApplicationContexts.astro:19`。
- 修改命令：`/finesse redesign`。提升到 13px；首页补充已有 `data-image-origin=AI-generated` 对应的明确标识，不创建新视觉或新项目事实。

**F5：缺少 mobile-floor 的根节点和标题保护。**

- 屏幕所见：当前所有页面 html/body 的 overflow-x 均为 visible，H1/H2 的 overflow-wrap 为 normal；当前三个宽度实际未溢出。
- 访客影响：未来长词或窄容器变化时缺少保护。此项是 CSS 防御缺口，不是当前已出现的视觉损坏。
- 定位：`src/styles/finesse-redesign.css`。
- 修改命令：`/finesse redesign`。加入根节点 overflow-x:clip，H1/H2 overflow-wrap:anywhere、min-width:0；验证 sticky 与菜单不受影响。

## 保留及明确不实施

- 优先级按信任感、高端感、清晰、真实、转化、SEO 可读性排序。divergence 用于辨认品牌的实际差异，保留 source-industrial photographs + technical index 的方向。
- design-dna 保留 Inter Variable 550/400、现有 action red 和带色中性色；不旋转三条品牌轴，不为了手册范式而加颗粒、深色主题或巨大标题。用户“现有优秀设计保留”优先于预设风格。
- 保留首页照片节奏、产品比较目录、能力页技术正文、工厂完整设备照片、质量页文件请求路径、资源页文章/目录层级、RFQ 的输入与草稿边界。
- 保留全部 SEO 正文、H1、元数据、canonical、JSON-LD、原媒体引用、CTA 文案/目的地、锚点及核心业务逻辑；不删 section，不改导航信息架构。
- 没有已验证的 ISO 证书或校准记录可新增展示。保留原有“申请文件核对”的状态，不将设计调整说成证据已补齐。
- 404 和内部预览仍为辅助页面，内部预览保持 noindex，不强制改成公开营销页面。

## 实施边界

本轮计划仅修改案例模板、首页插图说明及集中 CSS 三个源文件。字体族、强调色、导航结构、核心功能、数据和原始材料均受保护。既有页面版式充分符合内容语义，不为了全站改造而让每页产生无价值变化。

实施后验证：Astro 检查/构建，82 HTML 内容及 SEO 保留比较，36 个源数据/业务文件哈希比较，全站内部链接与锚点检查，80 页 × 5 宽度（320/375/414/768/1440）原生浏览器复查，以及改动区域/菜单/产品询价草稿的实际交互。

## 逐页覆盖与决定

所有公开页面应用 F5 的共同保护。表内列出其余具体调整；“保留”意味着没有发现值得为视觉而修改的局部结构。

| 页面 | 页面类型 | 审查决定 |
|---|---|---|
| /about/ | 公司 | F4 应用图说明字号，其余保留 |
| /capabilities/5-axis-cnc-machining/ | 能力/材料 | 保留布局、正文与图片 |
| /capabilities/aluminum-cnc-parts/ | 能力/材料 | 保留布局、正文与图片 |
| /capabilities/casting-machining/ | 能力/材料 | 保留布局、正文与图片 |
| /capabilities/cnc-milling-service/ | 能力/材料 | 保留布局、正文与图片 |
| /capabilities/cnc-turning-service/ | 能力/材料 | 保留布局、正文与图片 |
| /capabilities/copper-brass-cnc-parts/ | 能力/材料 | 保留布局、正文与图片 |
| /capabilities/ | 能力/材料 | 保留布局、正文与图片 |
| /capabilities/low-volume-production/ | 能力/材料 | 保留布局、正文与图片 |
| /capabilities/plastic-machined-parts/ | 能力/材料 | 保留布局、正文与图片 |
| /capabilities/prototype-machining/ | 能力/材料 | 保留布局、正文与图片 |
| /capabilities/stainless-steel-cnc-parts/ | 能力/材料 | 保留布局、正文与图片 |
| /cases/29-inch-display-housing-cnc-machining/ | 案例详情 | F2 来源说明/询价前置；其余保留 |
| /cases/custom-metal-parts-batch-examples/ | 案例详情 | F2 来源说明/询价前置；F3 目录展开 |
| /cases/custom-plastic-parts-ptfe-pom-pe-acrylic/ | 案例详情 | F2 来源说明/询价前置；F3 目录展开 |
| /cases/five-axis-machining-multi-face-parts/ | 案例详情 | F2 来源说明/询价前置；其余保留 |
| /cases/ | 案例目录 | 保留布局、正文与图片 |
| /cases/milling-a-pocketed-enclosure-form/ | 案例详情 | F2 来源说明/询价前置；其余保留 |
| /cases/milling-prismatic-components/ | 案例详情 | F2 来源说明/询价前置；其余保留 |
| /cases/turning-then-milling-cylindrical-parts/ | 案例详情 | F2 来源说明/询价前置；其余保留 |
| /cases/two-stage-cnc-milling/ | 案例详情 | F2 来源说明/询价前置；其余保留 |
| /factory/ | 工厂/质量 | 保留布局、正文与图片 |
| / | 首页 | F1 材料入口；F4 图源说明，其余保留 |
| /insights/australian-customer-workshop-visit-january-2025/ | 资源/文章 | 保留布局、正文与图片 |
| /insights/china-africa-west-lake-summit-2025/ | 资源/文章 | 保留布局、正文与图片 |
| /insights/cnc-process-selection/ | 资源/文章 | 保留布局、正文与图片 |
| /insights/company-news/ | 资源/文章 | 保留布局、正文与图片 |
| /insights/custom-cnc-machined-components-for-prototypes-and-production/ | 资源/文章 | 保留布局、正文与图片 |
| /insights/custom-cnc-parts-shipping-checklist/ | 资源/文章 | 保留布局、正文与图片 |
| /insights/drawings-and-ordering/ | 资源/文章 | 保留布局、正文与图片 |
| /insights/faq/ | 资源/文章 | 保留布局、正文与图片 |
| /insights/how-we-work/ | 资源/文章 | 保留布局、正文与图片 |
| /insights/ | 资源/文章 | 保留布局、正文与图片 |
| /insights/lzz-team-outing-2024/ | 资源/文章 | 保留布局、正文与图片 |
| /insights/material-and-finish-checklist/ | 资源/文章 | 保留布局、正文与图片 |
| /insights/may-2025-lzz-team-outing/ | 资源/文章 | 保留布局、正文与图片 |
| /insights/november-2025-hangzhou-lizhizao-group-activity/ | 资源/文章 | 保留布局、正文与图片 |
| /insights/processes-materials-finishes/ | 资源/文章 | 保留布局、正文与图片 |
| /insights/production-and-shipping/ | 资源/文章 | 保留布局、正文与图片 |
| /insights/prototype-vs-small-batch-cnc/ | 资源/文章 | 保留布局、正文与图片 |
| /insights/rfq-checklist/ | 资源/文章 | 保留布局、正文与图片 |
| /privacy/ | 隐私 | 保留布局、正文与图片 |
| /products/custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier/ | 产品详情 | F1 分类导航触控尺寸，其余保留 |
| /products/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/ | 产品详情 | F1 分类导航触控尺寸，其余保留 |
| /products/custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier/ | 产品详情 | F1 分类导航触控尺寸，其余保留 |
| /products/custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier/ | 产品详情 | F1 分类导航触控尺寸，其余保留 |
| /products/custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier/ | 产品详情 | F1 分类导航触控尺寸，其余保留 |
| /products/custom-cnc-machined-castings-transmission-housings-pump-bodies/ | 产品详情 | F1 分类导航触控尺寸，其余保留 |
| /products/custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier/ | 产品详情 | F1 分类导航触控尺寸，其余保留 |
| /products/custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier/ | 产品详情 | F1 分类导航触控尺寸，其余保留 |
| /products/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/ | 产品详情 | F1 分类导航触控尺寸，其余保留 |
| /products/custom-high-precision-machining-for-structural-aesthetic-components-oem/ | 产品详情 | F1 分类导航触控尺寸，其余保留 |
| /products/custom-oem-cnc-machined-non-metallic-components-insulating-parts/ | 产品详情 | F1 分类导航触控尺寸，其余保留 |
| /products/custom-oem-cnc-machined-plastic-parts-manufacturer/ | 产品详情 | F1 分类导航触控尺寸，其余保留 |
| /products/custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer/ | 产品详情 | F1 分类导航触控尺寸，其余保留 |
| /products/custom-oem-cnc-turning-manufacturer/ | 产品详情 | F1 分类导航触控尺寸，其余保留 |
| /products/custom-oem-high-precision-cnc-milling-manufacturer/ | 产品详情 | F1 分类导航触控尺寸，其余保留 |
| /products/custom-rotary-cylindrical-components/ | 产品详情 | F1 分类导航触控尺寸，其余保留 |
| /products/full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing/ | 产品详情 | F1 分类导航触控尺寸，其余保留 |
| /products/global-manufacturer-of-multi-sided-precision-machined-components/ | 产品详情 | F1 分类导航触控尺寸，其余保留 |
| /products/global-oem-precision-machining-solutions/ | 产品详情 | F1 分类导航触控尺寸，其余保留 |
| /products/high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem/ | 产品详情 | F1 分类导航触控尺寸，其余保留 |
| /products/high-volume-cnc-turning-for-complex-internal-external-features/ | 产品详情 | F1 分类导航触控尺寸，其余保留 |
| /products/ | 产品目录 | 保留布局、正文与图片 |
| /products/oem-precision-cnc-machined-casting-housing-structural-enclosures/ | 产品详情 | F1 分类导航触控尺寸，其余保留 |
| /products/oem-precision-cnc-machined-casting-housings/ | 产品详情 | F1 分类导航触控尺寸，其余保留 |
| /products/precision-cnc-machined-castings-custom-oem-housings/ | 产品详情 | F1 分类导航触控尺寸，其余保留 |
| /products/precision-cnc-machined-castings-manufacturer/ | 产品详情 | F1 分类导航触控尺寸，其余保留 |
| /products/precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances/ | 产品详情 | F1 分类导航触控尺寸，其余保留 |
| /products/precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier/ | 产品详情 | F1 分类导航触控尺寸，其余保留 |
| /products/precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier/ | 产品详情 | F1 分类导航触控尺寸，其余保留 |
| /products/precision-machining-for-functional-plastic-blocks-structural-components/ | 产品详情 | F1 分类导航触控尺寸，其余保留 |
| /products/precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures/ | 产品详情 | F1 分类导航触控尺寸，其余保留 |
| /products/precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier/ | 产品详情 | F1 分类导航触控尺寸，其余保留 |
| /products/precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier/ | 产品详情 | F1 分类导航触控尺寸，其余保留 |
| /products/small-batch-cnc-machining-manufacturer-complex-aluminum-housings/ | 产品详情 | F1 分类导航触控尺寸，其余保留 |
| /products/small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv/ | 产品详情 | F1 分类导航触控尺寸，其余保留 |
| /products/ultra-high-precision-machining-services/ | 产品详情 | F1 分类导航触控尺寸，其余保留 |
| /quality/ | 工厂/质量 | 保留布局、正文与图片 |
| /quote/ | 询价 | 保留布局、正文与图片 |

辅助页面：/404.html 与 /preview/home-editorial/ 已审查，保留内容、可用导航和 noindex 边界。


