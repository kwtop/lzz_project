# LZZ 网站重构实施结果

日期：2026-10-15。依据：[已确认方案](WEBSITE-REDESIGN-PLAN.md)。状态：**84个业务页面＋404已实施，本地构建和相关检查通过；未部署生产。** 没有发送测试询盘、邮件或业务消息。

## 审核入口与回退

- [33个主要类型/变体的前后对比](D:/lzz/website-implementation-20261015/review/index.html)，每页附桌面、手机及完整结果图。原图是实施前保留窗口，结果取对应逻辑视口首屏；不同浏览器栅格按逻辑宽度等比整理，不拉伸页面。
- [逐URL机器可读状态](WEBSITE-REDESIGN-STATUS.json)；[全部最终实页取证](D:/lzz/website-implementation-20261015/visual-records-final.json)。
- [唯一现行设计规范](../DESIGN.md)，[旧版完整备份](archive/DESIGN-before-20261015.md)。
- Git回退对象：`0507803382aebae2c4d8c64c88f01fc652302e71`；ref：`refs/checkpoints/website-redesign-before-20261015-1792035447505`。保存实施开始时8245个受保护/非忽略文件，包含既有未提交工作；使用独立index建立快照，工作HEAD保持`e91b2921f6e373d65a0c2dc75336824d770dcf39`。没有reset、正常提交、push或上传。回退应按此对象逐项恢复所需文件，避免覆盖其后用户工作。
- [基线兼容核对](D:/lzz/website-implementation-20261015/reports/baseline-compatibility.json)：84个业务canonical逐项不变，404继续无canonical；35产品OG图跟随已核原主体；技术栈、批准方案、事实台账、catalog、询盘上下文/草稿构造及schema类型文件与基线一致。

## 实际改动

首页采用文本与通用加工场景分开的首屏，原始产品形态、工艺材料、真实车间/CMM、两条工序记录和有条件的RFQ依次展开。共享基础只在正式新版页面启用，历史noindex预览保留历史职责。先验证各任务的真实样板及必要变体，再推广共性规则；样板阶段与修正后的截图分别保留。

能力目录用工艺/材料/项目阶段选路；工艺页先给适配与验收，材料页先给grade/condition/finish，原型、批次和样件页分别处理批准、逐料号放行与重建责任。工厂页保留设备适配、检验方法/阶段/记录和完整条件。车削与铸件首屏的重复示意图已删除，技术图保留；铜页重复原照收敛为一组相关说明。

Products保留35条独立参考、6条工序研究和2个材料集合。目录可搜索、组合筛选、分享URL并恢复浏览历史；两类补充参考集合独立显示。PART前置真实身份、scope与订单条件；P14总成、P15 CAD、P19法兰、P29圆件和P31回转组件的文案、图、Alt、相关推荐和SEO统一。六工序以原setup为主，two-stage两张原照直接对读；集合按独立来源解释，原视频保留。

Company保留企业事实、三份企业/教学原件的日期与范围，ISO声明与原件核对请求分开。流程以Buyer/LZZ/Agree分工，联系页先给真实联系与地址，新闻按事件和照片内容安排。Resources为Ordering guide/Machining guides/FAQ三入口，目录直达资料；RFQ完整字段常显，Copy/TXT/空白验收工作表保留。详细指南各答一个问题。Quote前置任务与五字段，完整预览后导出，手机联系资料排在表单后；Privacy描述实际草稿行为，404提供简短恢复入口。

## 内容删减与迁移

| 原位置/问题 | 最终去向 | 保留的采购价值 |
|---|---|---|
| 各页重复完整灰色RFQ尾部、重复来源标签/空泛引言 | 改为与当前任务有关的短输入与一个行动 | drawing/revision、material/finish、quantity、critical features、destination及草稿说明 |
| 工艺页表后同义drawing/measurement双栏 | 合入对应Feature/Define/Agree行 | 独有方法、记录、状态和功能测试限制 |
| 材料/工艺图在首屏和技术说明重复 | 一图只承担一个解释位置 | 原主体、技术说明、材料状态、工艺/验收条件 |
| 产品生成身份与原来源冲突 | 35条统一原主体与准确标题/用途 | 总成边界、CAD/设计参考属性、铸坯/装配/批量职责、原始URL |
| 企业文件关键日期/范围藏在details | Profile每份原件旁直接呈现 | 日期、printed validity、范围、非ISO身份；没有新增认证 |
| RFQ清单closed details | 六项快览＋三组完整字段＋brief | 资料优先级、量具/报告、数量、目的地、责任、NDA提示 |
| 通用图纸/关键特征/批量文章同页重复句 | 分别合并为工艺关系、批准表与生产条件回指 | 数值、单位、1件、7–14起算/finishing/transit及验收要求不丢失 |
| 大型黄色支架照片被当小件保护证明 | 退出Factory/批次的证明图位；真实小件图待补 | 保护/标识/文件/交接责任用HTML常显；历史2022照片只在档案语境保留 |
| Company采购概念图 | 退出流程/联系主阅读，原资产留档 | 合作分工、真实联系、地点及必要内链 |

没有删除独立业务页面或大规模改变URL。Factory两个旧入口映射到已有正确锚点，兼容壳、查询与旧锚点保留。84个业务canonical与404的无canonical策略、84个sitemap页面、153条兼容规则及91条原来源URL的覆盖通过；19个历史noindex设计预览未作为业务页重新设计。当前正式内容为英语，没有发现需同步的独立发布语种。

## 图片与设计规范

[图片实施清单](IMAGE-UPGRADE-RESULTS.md)记录原图、处理、采用及待补；[35条最终源图映射](imagegen-redesign-20261015/product-media-final.json)、[3次ImageGen调用原始提示词](imagegen-redesign-20261015/prompts.json)和[生成输出/尺寸/用途/哈希](imagegen-redesign-20261015/manifest.json)可追溯。

实际采用3个ImageGen输出：HOME-I1通用加工场景、CAP-I11接触测量概念、P29合成用空背景。P29保留原主体像素；另9个背景候选因高光/边缘无法可靠分离而不采用，使用完整原图兜底。35个主体来源文件哈希与制作登记一致，13处只裁多余画布（含P15，独立RGB比对一致）；没有重画具体零件结构。原始文件、新图和被拒候选分别保留。真实工厂、人员、证书、检验、来访与交付材料均未用生成内容替代。

规范固定Georgia标题/Inter正文、1280px版心、17px正文/16px技术表/至少14px图注和标签；桌面88px/手机56px主题间距；产品完整contain，纪实自然比例；手机技术表保留字段标签。旧规范关于固定交替图文、所有图同高、重询价尾部及12px辅助文字等冲突规则不再生效，工程、事实、URL、隐私和必要功能边界继续保留。现行规则只有DESIGN.md一份。

## 检查结果与证据范围

| 检查 | 实际结果 |
|---|---|
| npm run check | 0 errors、0 warnings；8项既有提示（unused/deprecated图标等），日志[check-final](D:/lzz/website-implementation-20261015/reports/check-final.txt) |
| npm run build | 98个Astro构建入口；postprocess后171 HTML，[build-final](D:/lzz/website-implementation-20261015/reports/build-final.txt) |
| npm run test:seo | 171 HTML、84 sitemap、153兼容规则、91来源URL通过；未检查生产host响应 |
| node scripts/verify.mjs --static | 171 HTML的链接、资源、标题及兼容壳通过 |
| 新版专项静态核对 | 85正式/404页面、35产品身份及700个独立图片资源/响应式候选通过；无缺失锚点、重复ID、raw图链接或未核生成产品主体 |
| 全站双端实页 | 85 URL×1440/390的页面/图片状态和首屏构图已查；未发现横向溢出、图片失载、正文/表标签低于14px；每页留实页截图。**这不等于85页长正文均逐像素目视验收** |
| 额外响应式 | 13页320px、6个768/1099/1100px状态；4页1280物理/640CSS＋DPR2的200%等效浏览器缩放，无溢出；不声称检查OS文字独立放大 |
| 询价 | required/invalid focus、完整预览、引用上下文、刷新恢复、改reference、清空、Copy与原生TXT保存、仅电话联系方式、模拟storage写入/clipboard失败、无JS邮件兜底通过；没有点击发送或测试真实送达 |
| 目录/菜单/下载 | 搜索/空态/reset/组合/刷新/Back/Forward/2独立集合；手机菜单Enter/Escape/焦点、3项Resources；brief复制和2份TXT下载通过 |
| 视频/控制台 | 7原片均以原生键盘启动至时间推进并暂停，无媒体错误；未逐帧看完整片。最终所测tab控制台error为空 |

独立复核者未参与实现，实际打开截图而非沿用旧结论。能力/工厂代表与变体、产品代表及12个关键变体、企业/资料18页分别记录完整或定向范围；每个发现均有重拍闭环。另有9＋12＋12张320px窗口和2张缩放等效图独立复核。详细报告：

- [能力与工厂](D:/lzz/website-implementation-20261015/reports/independent-final-capability-variants.md)；[产品变体](D:/lzz/website-implementation-20261015/reports/independent-final-product-variants.md)；[企业与资料](D:/lzz/website-implementation-20261015/reports/independent-final-company-resources.md)。
- [独立窄屏能力](D:/lzz/website-implementation-20261015/reports/independent-narrow-capability.md)、[产品](D:/lzz/website-implementation-20261015/reports/independent-narrow-products.md)、[企业/资料](D:/lzz/website-implementation-20261015/reports/independent-narrow-company-resources.md)。
- [实际交互记录](D:/lzz/website-implementation-20261015/interaction-records.json)、[响应式状态](D:/lzz/website-implementation-20261015/reports/responsive-variants.json)、[缩放方法](D:/lzz/website-implementation-20261015/reports/zoom-equivalent.json)。

浏览器少量截图出现绘制/页尾取证缺口时，已另补现场截图并由审查员区分“截图缺口”与“页面缺陷”。原始栅格可能与配置逻辑视口不同，原文件/元数据保留；对比图只按比例整理。未覆盖的长正文或交互不以截图生成数量代替实看。

## 未完成与需真实资料补充

没有已知未关闭的代码/布局阻塞。仍需：当前ISO9001扫描及主体/编号/机构/范围/有效期；更新的设备清单/行程负载限制；量具范围/校准和脱敏实测记录/报告样本；真实小CNC零件保护与标签包装图；同件铸坯/定位/余量/成品接口记录；Australian来访日期矛盾的真实记录核对。9件未采用背景候选及其他低清原图如需进一步提升，应补可靠高分辨率原片。相应网页已采用真实原图、条件或索取资料入口，不用生成证据填缺。

生产环境、CDN缓存、托管HTTP跳转、真实询盘送达、搜索引擎抓取/索引和完整屏幕阅读器测试未在本轮验证；未部署。

## 逐URL完成与检查状态

以下85项均已实施。D/M表示实际双端渲染、图片加载与几何检查；“首屏”仅为构图目视，独立长正文/关键区域的具体范围存于STATUS.json及对应报告。未列为逐页320px实看的页面只共享已验证规则，不冒称逐页窄屏全检。

| URL | 页面类型 | 独有图文/职责 | 检查状态 |
|---|---|---|---|
| [/](http://127.0.0.1:4323/) | HOME | 首页 | 内容/引用已查；D/M已渲染且无溢出；主Agent首屏；长正文共享规则验证 |
| [/404.html](http://127.0.0.1:4323/404.html) | E | 404 | 内容/引用已查；D/M已渲染且无溢出；主Agent首屏；长正文共享规则验证 |
| [/about/](http://127.0.0.1:4323/about/) | A1 | 公司总览 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/about/company-news/](http://127.0.0.1:4323/about/company-news/) | A5 | 新闻列表 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/about/company-news/australian-customer-workshop-visit-january-2025/](http://127.0.0.1:4323/about/company-news/australian-customer-workshop-visit-january-2025/) | A6 | 纪实文章 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/about/company-news/china-africa-west-lake-summit-2025/](http://127.0.0.1:4323/about/company-news/china-africa-west-lake-summit-2025/) | A6 | 纪实文章 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/about/company-news/lzz-team-outing-2024/](http://127.0.0.1:4323/about/company-news/lzz-team-outing-2024/) | A6 | 纪实文章 | 内容/引用已查；D/M已渲染且无溢出；主Agent首屏；长正文共享规则验证 |
| [/about/company-news/may-2025-lzz-team-outing/](http://127.0.0.1:4323/about/company-news/may-2025-lzz-team-outing/) | A6 | 纪实文章 | 内容/引用已查；D/M已渲染且无溢出；主Agent首屏；长正文共享规则验证 |
| [/about/company-news/november-2025-hangzhou-lizhizao-group-activity/](http://127.0.0.1:4323/about/company-news/november-2025-hangzhou-lizhizao-group-activity/) | A6 | 纪实文章 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/about/company-profile/](http://127.0.0.1:4323/about/company-profile/) | A2 | 企业与文件 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/about/contact/](http://127.0.0.1:4323/about/contact/) | A4 | 联系 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/about/how-we-work/](http://127.0.0.1:4323/about/how-we-work/) | A3 | 合作流程 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/capabilities/](http://127.0.0.1:4323/capabilities/) | CAP-H | 能力目录 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/capabilities/5-axis-cnc-machining/](http://127.0.0.1:4323/capabilities/5-axis-cnc-machining/) | CAP-P | 工艺/材料详情 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/capabilities/aluminum-cnc-parts/](http://127.0.0.1:4323/capabilities/aluminum-cnc-parts/) | CAP-M | 工艺/材料详情 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/capabilities/casting-machining/](http://127.0.0.1:4323/capabilities/casting-machining/) | CAP-P | 工艺/材料详情 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/capabilities/cnc-milling-service/](http://127.0.0.1:4323/capabilities/cnc-milling-service/) | CAP-P | 工艺/材料详情 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/capabilities/cnc-turning-service/](http://127.0.0.1:4323/capabilities/cnc-turning-service/) | CAP-P | 工艺/材料详情 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/capabilities/copper-brass-cnc-parts/](http://127.0.0.1:4323/capabilities/copper-brass-cnc-parts/) | CAP-M | 工艺/材料详情 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/capabilities/low-volume-production/](http://127.0.0.1:4323/capabilities/low-volume-production/) | CAP-L | 批次放行 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/capabilities/plastic-machined-parts/](http://127.0.0.1:4323/capabilities/plastic-machined-parts/) | CAP-M | 工艺/材料详情 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/capabilities/prototype-machining/](http://127.0.0.1:4323/capabilities/prototype-machining/) | CAP-A | 原型评审 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/capabilities/stainless-steel-cnc-parts/](http://127.0.0.1:4323/capabilities/stainless-steel-cnc-parts/) | CAP-M | 工艺/材料详情 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/capabilities/starting-with-a-sample/](http://127.0.0.1:4323/capabilities/starting-with-a-sample/) | CAP-S | 样件重建 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/factory/](http://127.0.0.1:4323/factory/) | CAP-F | 工厂与质量 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/privacy/](http://127.0.0.1:4323/privacy/) | PRIV | 隐私 | 内容/引用已查；D/M已渲染且无溢出；主Agent首屏；长正文共享规则验证 |
| [/products/](http://127.0.0.1:4323/products/) | PROD-OV | 产品总览 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/products/machining-studies/](http://127.0.0.1:4323/products/machining-studies/) | PROD-STUDIES | 研究目录 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/products/machining-studies/29-inch-display-housing-cnc-machining/](http://127.0.0.1:4323/products/machining-studies/29-inch-display-housing-cnc-machining/) | STUDY | 工序研究/独立集合 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/products/machining-studies/custom-metal-parts-batch-examples/](http://127.0.0.1:4323/products/machining-studies/custom-metal-parts-batch-examples/) | STUDY-COL | 工序研究/独立集合 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/products/machining-studies/custom-plastic-parts-ptfe-pom-pe-acrylic/](http://127.0.0.1:4323/products/machining-studies/custom-plastic-parts-ptfe-pom-pe-acrylic/) | STUDY-COL | 工序研究/独立集合 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/products/machining-studies/five-axis-machining-multi-face-parts/](http://127.0.0.1:4323/products/machining-studies/five-axis-machining-multi-face-parts/) | STUDY | 工序研究/独立集合 | 内容/引用已查；D/M已渲染且无溢出；主Agent首屏；长正文共享规则验证 |
| [/products/machining-studies/milling-a-pocketed-enclosure-form/](http://127.0.0.1:4323/products/machining-studies/milling-a-pocketed-enclosure-form/) | STUDY | 工序研究/独立集合 | 内容/引用已查；D/M已渲染且无溢出；主Agent首屏；长正文共享规则验证 |
| [/products/machining-studies/milling-prismatic-components/](http://127.0.0.1:4323/products/machining-studies/milling-prismatic-components/) | STUDY | 工序研究/独立集合 | 内容/引用已查；D/M已渲染且无溢出；主Agent首屏；长正文共享规则验证 |
| [/products/machining-studies/turning-then-milling-cylindrical-parts/](http://127.0.0.1:4323/products/machining-studies/turning-then-milling-cylindrical-parts/) | STUDY | 工序研究/独立集合 | 内容/引用已查；D/M已渲染且无溢出；主Agent首屏；长正文共享规则验证 |
| [/products/machining-studies/two-stage-cnc-milling/](http://127.0.0.1:4323/products/machining-studies/two-stage-cnc-milling/) | STUDY | 工序研究/独立集合 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/products/part-examples/](http://127.0.0.1:4323/products/part-examples/) | PROD-LIST | 形态筛选目录 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/products/part-examples/custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier/](http://127.0.0.1:4323/products/part-examples/custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier/) | PART | P12 · 完整原主体 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/products/part-examples/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/](http://127.0.0.1:4323/products/part-examples/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/) | PART | P13 · 完整原主体 | 内容/引用已查；D/M已渲染且无溢出；主Agent首屏；长正文共享规则验证 |
| [/products/part-examples/custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier/](http://127.0.0.1:4323/products/part-examples/custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier/) | PART | P16 · 原主体画布裁切 | 内容/引用已查；D/M已渲染且无溢出；主Agent首屏；长正文共享规则验证 |
| [/products/part-examples/custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier/](http://127.0.0.1:4323/products/part-examples/custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier/) | PART | P17 · 完整原主体 | 内容/引用已查；D/M已渲染且无溢出；主Agent首屏；长正文共享规则验证 |
| [/products/part-examples/custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier/](http://127.0.0.1:4323/products/part-examples/custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier/) | PART | P14 · 原主体画布裁切 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/products/part-examples/custom-cnc-machined-castings-transmission-housings-pump-bodies/](http://127.0.0.1:4323/products/part-examples/custom-cnc-machined-castings-transmission-housings-pump-bodies/) | PART | P18 · 原主体画布裁切 | 内容/引用已查；D/M已渲染且无溢出；主Agent首屏；长正文共享规则验证 |
| [/products/part-examples/custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier/](http://127.0.0.1:4323/products/part-examples/custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier/) | PART | P15 · 原主体画布裁切 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/products/part-examples/custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier/](http://127.0.0.1:4323/products/part-examples/custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier/) | PART | P19 · 原主体画布裁切 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/products/part-examples/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/](http://127.0.0.1:4323/products/part-examples/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/) | PART | P00 · 原主体画布裁切 | 内容/引用已查；D/M已渲染且无溢出；主Agent首屏；长正文共享规则验证 |
| [/products/part-examples/custom-high-precision-machining-for-structural-aesthetic-components-oem/](http://127.0.0.1:4323/products/part-examples/custom-high-precision-machining-for-structural-aesthetic-components-oem/) | PART | P09 · 完整原主体 | 内容/引用已查；D/M已渲染且无溢出；主Agent首屏；长正文共享规则验证 |
| [/products/part-examples/custom-oem-cnc-machined-non-metallic-components-insulating-parts/](http://127.0.0.1:4323/products/part-examples/custom-oem-cnc-machined-non-metallic-components-insulating-parts/) | PART | P20 · 完整原主体 | 内容/引用已查；D/M已渲染且无溢出；主Agent首屏；长正文共享规则验证 |
| [/products/part-examples/custom-oem-cnc-machined-plastic-parts-manufacturer/](http://127.0.0.1:4323/products/part-examples/custom-oem-cnc-machined-plastic-parts-manufacturer/) | PART | P21 · 完整原主体 | 内容/引用已查；D/M已渲染且无溢出；主Agent首屏；长正文共享规则验证 |
| [/products/part-examples/custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer/](http://127.0.0.1:4323/products/part-examples/custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer/) | PART | P07 · 完整原主体 | 内容/引用已查；D/M已渲染且无溢出；主Agent首屏；长正文共享规则验证 |
| [/products/part-examples/custom-oem-cnc-turning-manufacturer/](http://127.0.0.1:4323/products/part-examples/custom-oem-cnc-turning-manufacturer/) | PART | P05 · 完整原主体 | 内容/引用已查；D/M已渲染且无溢出；主Agent首屏；长正文共享规则验证 |
| [/products/part-examples/custom-oem-high-precision-cnc-milling-manufacturer/](http://127.0.0.1:4323/products/part-examples/custom-oem-high-precision-cnc-milling-manufacturer/) | PART | P01 · 完整原主体 | 内容/引用已查；D/M已渲染且无溢出；主Agent首屏；长正文共享规则验证 |
| [/products/part-examples/custom-rotary-cylindrical-components/](http://127.0.0.1:4323/products/part-examples/custom-rotary-cylindrical-components/) | PART | P06 · 完整原主体 | 内容/引用已查；D/M已渲染且无溢出；主Agent首屏；长正文共享规则验证 |
| [/products/part-examples/full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing/](http://127.0.0.1:4323/products/part-examples/full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing/) | PART | P08 · 完整原主体 | 内容/引用已查；D/M已渲染且无溢出；主Agent首屏；长正文共享规则验证 |
| [/products/part-examples/global-manufacturer-of-multi-sided-precision-machined-components/](http://127.0.0.1:4323/products/part-examples/global-manufacturer-of-multi-sided-precision-machined-components/) | PART | P04 · 原主体画布裁切 | 内容/引用已查；D/M已渲染且无溢出；主Agent首屏；长正文共享规则验证 |
| [/products/part-examples/global-oem-precision-machining-solutions/](http://127.0.0.1:4323/products/part-examples/global-oem-precision-machining-solutions/) | PART | P03 · 原主体画布裁切 | 内容/引用已查；D/M已渲染且无溢出；主Agent首屏；长正文共享规则验证 |
| [/products/part-examples/high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem/](http://127.0.0.1:4323/products/part-examples/high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem/) | PART | P11 · 完整原主体 | 内容/引用已查；D/M已渲染且无溢出；主Agent首屏；长正文共享规则验证 |
| [/products/part-examples/high-volume-cnc-turning-for-complex-internal-external-features/](http://127.0.0.1:4323/products/part-examples/high-volume-cnc-turning-for-complex-internal-external-features/) | PART | P10 · 完整原主体 | 内容/引用已查；D/M已渲染且无溢出；主Agent首屏；长正文共享规则验证 |
| [/products/part-examples/oem-precision-cnc-machined-casting-housing-structural-enclosures/](http://127.0.0.1:4323/products/part-examples/oem-precision-cnc-machined-casting-housing-structural-enclosures/) | PART | P22 · 原主体画布裁切 | 内容/引用已查；D/M已渲染且无溢出；主Agent首屏；长正文共享规则验证 |
| [/products/part-examples/oem-precision-cnc-machined-casting-housings/](http://127.0.0.1:4323/products/part-examples/oem-precision-cnc-machined-casting-housings/) | PART | P23 · 原主体画布裁切 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/products/part-examples/precision-cnc-machined-castings-custom-oem-housings/](http://127.0.0.1:4323/products/part-examples/precision-cnc-machined-castings-custom-oem-housings/) | PART | P24 · 完整原主体 | 内容/引用已查；D/M已渲染且无溢出；主Agent首屏；长正文共享规则验证 |
| [/products/part-examples/precision-cnc-machined-castings-manufacturer/](http://127.0.0.1:4323/products/part-examples/precision-cnc-machined-castings-manufacturer/) | PART | P25 · 原主体画布裁切 | 内容/引用已查；D/M已渲染且无溢出；主Agent首屏；长正文共享规则验证 |
| [/products/part-examples/precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances/](http://127.0.0.1:4323/products/part-examples/precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances/) | PART | P26 · 完整原主体 | 内容/引用已查；D/M已渲染且无溢出；主Agent首屏；长正文共享规则验证 |
| [/products/part-examples/precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier/](http://127.0.0.1:4323/products/part-examples/precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier/) | PART | P27 · 完整原主体 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/products/part-examples/precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier/](http://127.0.0.1:4323/products/part-examples/precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier/) | PART | P28 · 完整原主体 | 内容/引用已查；D/M已渲染且无溢出；主Agent首屏；长正文共享规则验证 |
| [/products/part-examples/precision-machining-for-functional-plastic-blocks-structural-components/](http://127.0.0.1:4323/products/part-examples/precision-machining-for-functional-plastic-blocks-structural-components/) | PART | P29 · 原主体＋AI背景 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/products/part-examples/precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures/](http://127.0.0.1:4323/products/part-examples/precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures/) | PART | P30 · 完整原主体 | 内容/引用已查；D/M已渲染且无溢出；主Agent首屏；长正文共享规则验证 |
| [/products/part-examples/precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier/](http://127.0.0.1:4323/products/part-examples/precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier/) | PART | P31 · 完整原主体 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/products/part-examples/precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier/](http://127.0.0.1:4323/products/part-examples/precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier/) | PART | P32 · 原主体画布裁切 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/products/part-examples/small-batch-cnc-machining-manufacturer-complex-aluminum-housings/](http://127.0.0.1:4323/products/part-examples/small-batch-cnc-machining-manufacturer-complex-aluminum-housings/) | PART | P33 · 完整原主体 | 内容/引用已查；D/M已渲染且无溢出；主Agent首屏；长正文共享规则验证 |
| [/products/part-examples/small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv/](http://127.0.0.1:4323/products/part-examples/small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv/) | PART | P34 · 完整原主体 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/products/part-examples/ultra-high-precision-machining-services/](http://127.0.0.1:4323/products/part-examples/ultra-high-precision-machining-services/) | PART | P02 · 完整原主体 | 内容/引用已查；D/M已渲染且无溢出；主Agent首屏；长正文共享规则验证 |
| [/quote/](http://127.0.0.1:4323/quote/) | Q | 询价草稿 | 内容/引用已查；D/M已渲染且无溢出；主Agent首屏；长正文共享规则验证 |
| [/resources/](http://127.0.0.1:4323/resources/) | R1 | 资料总览 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/resources/drawings-and-ordering/compare-cnc-machining-quotations/](http://127.0.0.1:4323/resources/drawings-and-ordering/compare-cnc-machining-quotations/) | GUIDE | 单问题技术/采购指南 | 内容/引用已查；D/M已渲染且无溢出；主Agent首屏；长正文共享规则验证 |
| [/resources/drawings-and-ordering/critical-features-cnc-drawing/](http://127.0.0.1:4323/resources/drawings-and-ordering/critical-features-cnc-drawing/) | GUIDE | 单问题技术/采购指南 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/resources/drawings-and-ordering/machined-prototype-approval-checklist/](http://127.0.0.1:4323/resources/drawings-and-ordering/machined-prototype-approval-checklist/) | GUIDE | 单问题技术/采购指南 | 内容/引用已查；D/M已渲染且无溢出；主Agent首屏；长正文共享规则验证 |
| [/resources/faq/](http://127.0.0.1:4323/resources/faq/) | R4 | FAQ | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/resources/ordering-guide/](http://127.0.0.1:4323/resources/ordering-guide/) | R2 | 采购目录 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/resources/processes-materials-finishes/](http://127.0.0.1:4323/resources/processes-materials-finishes/) | R3 | 工艺目录 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/resources/processes-materials-finishes/cnc-process-selection/](http://127.0.0.1:4323/resources/processes-materials-finishes/cnc-process-selection/) | GUIDE | 单问题技术/采购指南 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/resources/processes-materials-finishes/material-and-finish-checklist/](http://127.0.0.1:4323/resources/processes-materials-finishes/material-and-finish-checklist/) | GUIDE | 单问题技术/采购指南 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/resources/production-and-shipping/custom-cnc-parts-shipping-checklist/](http://127.0.0.1:4323/resources/production-and-shipping/custom-cnc-parts-shipping-checklist/) | GUIDE | 单问题技术/采购指南 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/resources/production-and-shipping/prototype-vs-small-batch-cnc/](http://127.0.0.1:4323/resources/production-and-shipping/prototype-vs-small-batch-cnc/) | GUIDE | 单问题技术/采购指南 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
| [/resources/rfq-checklist/](http://127.0.0.1:4323/resources/rfq-checklist/) | G1 | RFQ清单 | 内容/引用已查；D/M已渲染且无溢出；独立复核范围有记录 |
