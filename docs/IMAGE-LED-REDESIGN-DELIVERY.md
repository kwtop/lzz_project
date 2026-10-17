# 全站逐页视觉精修交付（2026-10-16）

<!-- SITE_POLISH_STATUS_START -->
本轮 oil-ui-pro 逐页实施和复核已完成记录：82 页通过，2 页仍待真实素材，0 页未检查，另有 1 页铸件页沿用前轮验收。**不宣称85页全部视觉通过。**

最新构建预览：[本地4325](http://127.0.0.1:4325/)；[CNC铣削页](http://127.0.0.1:4325/capabilities/cnc-milling-service/)。[本轮队列](<D:/lzz/site-polish-20261016/queue.json>)记录每URL状态；本文末尾“2026-10-16 全站逐页续修最终交付”集中列出模块、图片、前后截图、验证及未完成项。构建、范围内两端回归和询价草稿通过；完整SEO脚本保留1个范围外旧预览缺description的失败。未部署、未发送邮件。
<!-- SITE_POLISH_STATUS_END -->

## 既有全站改版基线记录（不是本轮续修验收）

已按导航顺序实际处理 **85 个正式 URL（84 个业务/政策页面及404）**，逐页完成现状截图、三项问题、内容/图位计划、实际修改和两端自审。**84 页通过，P04 一页待补真实素材。** 82 个普通页面中81页满足4–7章、至少3个有效独立图源、过半章图文结合；quote、privacy、404三页按实际功能例外验收。

当前本地构建 [首页](<http://127.0.0.1:4325/>)。未部署生产环境、未推送远端、未发送邮件或上传客户图纸。旧无索引方案演示与跳转壳未作为正式业务页改写；它们仍包含在171个HTML文件的静态/SEO检查中。

## 主要结果

- 首页把产品、工艺与材料入口放回同一采购任务中；产品总览用一张真实工件组建立主视觉，六种形态包含塑料，移除重复拼图。
- 35个产品详情逐件决定“先看特征”还是“先看加工”，合并相邻重复解释，完整保留材料、处理、参数、用途限制、批准与检验条件。P12把独立冷却参考移入组件定义章，6章变5章；不同产品没有机械复制同一阅读顺序。
- 能力页让形态名称成为有意义入口，材料/图纸/验收图文重新分工；铸件材料章实际生成并接入一张与铸坯状态匹配的示意。
- 研究与材料集合保留原始照片/视频，步骤由碎片变成完整短段；共同采购条件在手机上先于询盘，避免先催行动再解释限制。
- 工厂按车间、适配、检验、记录与交付串联，四个检验阶段去装饰编号；公司证件标题直接打开原件，新闻推荐不再每篇同时链接图片与标题。
- 指南保留专业比较表与条件，手机先给关键答案；FAQ按主题集中详细资料入口。联系页先完成新/现有订单任务；询价姓名全宽、Message最小200px，审阅状态修正Subject拆行和dd默认缩进。

正文中的内链出现次数从1005变为980；**逐URL的唯一有效href和原有锚点没有丢失**。数字扫描只发现工厂装饰序号01–04被移除，业务数值均保留。不是按删字量验收，参数、条件与采购价值仍直接可读。

## 生效规范、基线和改动边界

实际规则为 [AGENTS.md](<D:/lzz/lzz/_react/AGENTS.md>) 与 [DESIGN.md](<D:/lzz/lzz/_react/DESIGN.md>)；未用桌面prompt目录中的文件覆盖。原规则备份 [DESIGN.md基线](<D:/lzz/reading-polish-20261015-2313/baseline/DESIGN.md>)，代码/构建基线 [基线目录](<D:/lzz/reading-polish-20261015-2313/baseline>)，[源文件改动清单](<D:/lzz/reading-polish-20261015-2313/source-changes.json>)（修改35个src文件，新增4个，删除0个）。没有重置用户已有工作、改技术栈或改正式URL。

保留品牌、17px/16px正文与1.65行高、常规1240px网格、白/暖灰/克制品牌色。新规范第9节记录已验证细则：指南按任务给答案、同目的链接合并、原照按主次排列、辅助竖图控制190–270px、政策正文70ch/1.7、表单与状态验收。修改的是不合理的重复模块、图位和阅读顺序；未废弃真实性、必要信息及功能约束。

保持按图定制、MOQ1、图纸与订单确认后7–14工作日（含处理、运输另计、报价确认）、条件性公差、材料状态、样件重建/图纸批准、特定测试另行约定等业务边界。证件、客户、工厂、检验和交付照片没有生成式改造。

## 本轮图片的实际处理

**新增并接入1张ImageGen非证据示意，0张真实产品生成式润色通过。** 其余采用匹配的原图或既有明示概念图，调整画幅、展示尺度与图文关系；没有把CSS/压缩说成修图。

|动作|来源与最终路径|使用与核验|
|---|---|---|
|生成并接入|[原始PNG](<D:/lzz/reading-polish-20261015-2313/006/casting-condition-original.png>)；[casting-condition-1200.webp](<D:/lzz/lzz/_react/public/media/reading-polish-20261015/casting-condition-1200.webp>)，另有480/800/1536版本|casting-machining材料章，3:2通用铝铸坯；完整主体约72%画宽、自然灰银材质与柔光。无企业/库存/验收主张，页面明确AI illustration。两端完整展示。|
|保留真实素材|product-sources-20261015、evidence、source-details、company-news及真实公司原件|依原SHA去重，按每页职责展示。工件不变形、不补画孔口/结构；原始证据人物、设施、证件、检验/发货身份不改变。逐图引用与真实源见下文和JSON。|
|保留既有辅助示意|definition、material-samples、order-records、packing-concept等现有素材|保留AI身份说明，不解释为公司实际产品、订单、库存、工厂或检验记录。不是本轮新生成。|
|待补、未接入修图结果|[P04原图](<D:/lzz/raw/_content/images/products/5-axis-Machining-3-1764418541931--3aeb6953e6.jpg>)；[此前两次失败编辑记录](<D:/lzz/narrative-rebuild-20261015/p04-imagegen-attempt>)|800×800原图细节不清。既有两次编辑一张臆造沟槽、一张仍模糊，均未接入。本轮仅限制展示尺度，仍不计有效图；需要同一零件高清整体与孔口/接口细节。|

[本轮ImageGen提示词和接入记录](<D:/lzz/reading-polish-20261015-2313/006/imagegen.json>)。[逐图源身份与计数方法](<D:/lzz/reading-polish-20261015-2313/image-identity-method.json>)：真实源SHA相同、响应式版本、同源裁片只算一次；在1440/390都可见且至少90×65 CSS px才进入保守的独立图源统计。视频海报可支持图文章，不提高独立图数。P04模糊源剔除。

## 浏览器、SEO与功能证据

|检查|实际结果与范围|
|---|---|
|逐页视觉|85URL各有1440×1000与390×844整页前/后截图。每页查看整页缩览与3段手机正常尺度局部，发现明显问题就修正/重拍；不能理解为逐段逐字全屏校读。由当前Agent自审，没有声称独立设计师审签。|
|最终构建|[build日志](<D:/lzz/reading-polish-20261015-2313/build-final.log>)：98个Astro页面构建成功，SEO生成84个sitemap URL、153条原证据重定向。正式验收范围仍为85URL。|
|类型|[check结果](<D:/lzz/reading-polish-20261015-2313/check-final.json>)：952文件、0 errors、0 warnings、9个既有hint。未为提示改无关页脚或审计脚本。|
|SEO/静态|[SEO日志](<D:/lzz/reading-polish-20261015-2313/test-seo.log>)、[静态日志](<D:/lzz/reading-polish-20261015-2313/test-static.log>)：171HTML的链接/资源/单h1/跳转壳检查通过；84个sitemap URL与153条重定向通过。title、description、canonical和schema与改前一致。404以基线构建比较，排除dev的/404.html与build的/404/环境差异。|
|全URL渲染|[170次最终浏览器记录](<D:/lzz/reading-polish-20261015-2313/final-browser-records.json>)：0业务页加载错误、0坏图、0页面横向溢出、0模块缺失。404.html静态文件本地返回200；另用不存在地址实际验证HTTP404/noindex和恢复导航，不声称生产主机行为已测。|
|内链与数值|[锚点检查](<D:/lzz/reading-polish-20261015-2313/anchor-checks.json>)：范围内hash目标无缺失。[数字差异记录](<D:/lzz/reading-polish-20261015-2313/numeric-copy-audit.json>)：仅去掉工厂装饰编号。所有原唯一href/ID保留。|
|宽度和文字放大|[80项响应式记录](<D:/lzz/reading-polish-20261015-2313/responsive/results.json>)：16类代表×320/768/1099/1100共64项，另16项在390宽度把正文/字段/链接computed字号放大200%，0横向溢出、0放大截图坏图。16张放大整页图中对目录、材料、流程、询价局部另行目视；这是浏览器样式放大，不是操作系统级或全站每页放大验收。|
|主要交互|[28项导航/询盘检查](<D:/lzz/reading-polish-20261015-2313/interactions.json>)，[10项目录检查](<D:/lzz/reading-polish-20261015-2313/014/interactions-final.json>)，[13项新闻/审阅/404检查](<D:/lzz/reading-polish-20261015-2313/finish-interactions.json>)，均通过。覆盖查询/筛选/重载/后退/空状态/重置、手机菜单与Escape、表单错误及焦点、仅电话/仅邮箱、草稿/复制/下载/恢复/清除、存储/剪贴板失败回退、RFQ复制、无JS35件目录和询盘fallback。|
|视频|[7个独立原视频播放记录](<D:/lzz/reading-polish-20261015-2313/video-checks.json>)：真实Chrome加载metadata并播放到currentTime>0，controls/时长/分辨率/海报记录齐全。|

旧npm test:site和test:refinement的默认浏览器脚本指向4321，初次受当前环境网络隔离阻止。源码还依赖旧版.product-card、12件初始目录与旧表单字段；本轮未将其冒充通过。使用test:site -- --static及上述**当前界面真实功能检查**完成本轮门禁。旧脚本选择器维护仍是一项已有测试债务，不修改业务功能来迁就旧断言。

## 主要页面类型前后对照

对照图为真实浏览器截图的同尺度并排缩览/上部截取；完整页面点击逐URL表中的前后图。不是设计稿或生图。

|代表URL|桌面对照|手机对照|
|---|---|---|
|/|[前 / 后](<D:/lzz/reading-polish-20261015-2313/comparisons/000-1440.png>)|[前 / 后](<D:/lzz/reading-polish-20261015-2313/comparisons/000-390.png>)|
|/capabilities/cnc-milling-service/|[前 / 后](<D:/lzz/reading-polish-20261015-2313/comparisons/002-1440.png>)|[前 / 后](<D:/lzz/reading-polish-20261015-2313/comparisons/002-390.png>)|
|/products/|[前 / 后](<D:/lzz/reading-polish-20261015-2313/comparisons/013-1440.png>)|[前 / 后](<D:/lzz/reading-polish-20261015-2313/comparisons/013-390.png>)|
|/products/part-examples/|[前 / 后](<D:/lzz/reading-polish-20261015-2313/comparisons/014-1440.png>)|[前 / 后](<D:/lzz/reading-polish-20261015-2313/comparisons/014-390.png>)|
|/products/part-examples/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/|[前 / 后](<D:/lzz/reading-polish-20261015-2313/comparisons/015-1440.png>)|[前 / 后](<D:/lzz/reading-polish-20261015-2313/comparisons/015-390.png>)|
|/products/machining-studies/|[前 / 后](<D:/lzz/reading-polish-20261015-2313/comparisons/050-1440.png>)|[前 / 后](<D:/lzz/reading-polish-20261015-2313/comparisons/050-390.png>)|
|/products/machining-studies/custom-plastic-parts-ptfe-pom-pe-acrylic/|[前 / 后](<D:/lzz/reading-polish-20261015-2313/comparisons/057-1440.png>)|[前 / 后](<D:/lzz/reading-polish-20261015-2313/comparisons/057-390.png>)|
|/factory/|[前 / 后](<D:/lzz/reading-polish-20261015-2313/comparisons/059-1440.png>)|[前 / 后](<D:/lzz/reading-polish-20261015-2313/comparisons/059-390.png>)|
|/resources/processes-materials-finishes/material-and-finish-checklist/|[前 / 后](<D:/lzz/reading-polish-20261015-2313/comparisons/064-1440.png>)|[前 / 后](<D:/lzz/reading-polish-20261015-2313/comparisons/064-390.png>)|
|/resources/drawings-and-ordering/compare-cnc-machining-quotations/|[前 / 后](<D:/lzz/reading-polish-20261015-2313/comparisons/067-1440.png>)|[前 / 后](<D:/lzz/reading-polish-20261015-2313/comparisons/067-390.png>)|
|/about/how-we-work/|[前 / 后](<D:/lzz/reading-polish-20261015-2313/comparisons/074-1440.png>)|[前 / 后](<D:/lzz/reading-polish-20261015-2313/comparisons/074-390.png>)|
|/about/company-news/|[前 / 后](<D:/lzz/reading-polish-20261015-2313/comparisons/075-1440.png>)|[前 / 后](<D:/lzz/reading-polish-20261015-2313/comparisons/075-390.png>)|
|/about/company-news/australian-customer-workshop-visit-january-2025/|[前 / 后](<D:/lzz/reading-polish-20261015-2313/comparisons/078-1440.png>)|[前 / 后](<D:/lzz/reading-polish-20261015-2313/comparisons/078-390.png>)|
|/about/contact/|[前 / 后](<D:/lzz/reading-polish-20261015-2313/comparisons/081-1440.png>)|[前 / 后](<D:/lzz/reading-polish-20261015-2313/comparisons/081-390.png>)|
|/quote/|[前 / 后](<D:/lzz/reading-polish-20261015-2313/comparisons/084-1440.png>)|[前 / 后](<D:/lzz/reading-polish-20261015-2313/comparisons/084-390.png>)|

## 逐URL验收表（按导航执行顺序）

“图”是有效独立源，不是img标签数量；“图文”是有有效可见图片或原视频的核心章。功能/政策例外的具体理由在对应逐页记录。所有行均有内容检查和两端实际视觉自审，不用代表页替代其余URL。

|序号与URL|章|图|图文章|状态|完整桌面前/后|完整手机前/后|
|---|---:|---:|---:|---|---|---|
|0 /|5|9|5/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/000/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/000/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/000/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/000/after/390-full.png>)|
|1 /capabilities/|6|10|4/6|通过|[前](<D:/lzz/reading-polish-20261015-2313/001/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/001/confirm/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/001/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/001/confirm/390-full.png>)|
|2 /capabilities/cnc-milling-service/|7|9|6/7|通过|[前](<D:/lzz/reading-polish-20261015-2313/002/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/002/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/002/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/002/after/390-full.png>)|
|3 /capabilities/cnc-turning-service/|7|8|6/7|通过|[前](<D:/lzz/reading-polish-20261015-2313/003/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/003/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/003/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/003/after/390-full.png>)|
|4 /capabilities/5-axis-cnc-machining/|7|8|6/7|通过|[前](<D:/lzz/reading-polish-20261015-2313/004/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/004/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/004/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/004/after/390-full.png>)|
|5 /capabilities/plastic-machined-parts/|5|7|3/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/005/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/005/confirm/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/005/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/005/confirm/390-full.png>)|
|6 /capabilities/casting-machining/（2026-10-16 精修）|6|5|4/6|通过|[前](<D:/lzz/casting-polish-20261016/verified-before/casting-1440.png>) / [后](<D:/lzz/casting-polish-20261016/final/casting-1440.png>)|[前](<D:/lzz/casting-polish-20261016/verified-before/casting-390.png>) / [后](<D:/lzz/casting-polish-20261016/final/casting-390.png>)|
|7 /capabilities/aluminum-cnc-parts/|5|7|4/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/007/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/007/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/007/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/007/after/390-full.png>)|
|8 /capabilities/stainless-steel-cnc-parts/|5|5|3/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/008/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/008/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/008/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/008/after/390-full.png>)|
|9 /capabilities/copper-brass-cnc-parts/|5|3|3/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/009/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/009/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/009/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/009/after/390-full.png>)|
|10 /capabilities/prototype-machining/|4|3|3/4|通过|[前](<D:/lzz/reading-polish-20261015-2313/010/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/010/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/010/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/010/after/390-full.png>)|
|11 /capabilities/low-volume-production/|5|4|4/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/011/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/011/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/011/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/011/after/390-full.png>)|
|12 /capabilities/starting-with-a-sample/|5|4|4/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/012/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/012/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/012/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/012/after/390-full.png>)|
|13 /products/|4|8|3/4|通过|[前](<D:/lzz/reading-polish-20261015-2313/013/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/013/confirm/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/013/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/013/confirm/390-full.png>)|
|14 /products/part-examples/|5|39|3/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/014/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/014/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/014/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/014/after/390-full.png>)|
|15 /products/part-examples/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/|5|3|3/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/015/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/015/confirm/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/015/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/015/confirm/390-full.png>)|
|16 /products/part-examples/custom-oem-high-precision-cnc-milling-manufacturer/|5|3|3/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/016/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/016/confirm/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/016/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/016/confirm/390-full.png>)|
|17 /products/part-examples/ultra-high-precision-machining-services/|5|3|4/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/017/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/017/confirm/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/017/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/017/confirm/390-full.png>)|
|18 /products/part-examples/global-oem-precision-machining-solutions/|5|3|3/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/018/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/018/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/018/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/018/after/390-full.png>)|
|19 /products/part-examples/global-manufacturer-of-multi-sided-precision-machined-components/|5|2|2/5|待补素材|[前](<D:/lzz/reading-polish-20261015-2313/019/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/019/confirm/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/019/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/019/confirm/390-full.png>)|
|20 /products/part-examples/custom-oem-cnc-turning-manufacturer/|5|3|3/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/020/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/020/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/020/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/020/after/390-full.png>)|
|21 /products/part-examples/custom-rotary-cylindrical-components/|5|3|3/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/021/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/021/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/021/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/021/after/390-full.png>)|
|22 /products/part-examples/custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer/|5|3|3/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/022/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/022/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/022/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/022/after/390-full.png>)|
|23 /products/part-examples/full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing/|5|3|3/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/023/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/023/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/023/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/023/after/390-full.png>)|
|24 /products/part-examples/custom-high-precision-machining-for-structural-aesthetic-components-oem/|5|3|3/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/024/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/024/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/024/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/024/after/390-full.png>)|
|25 /products/part-examples/high-volume-cnc-turning-for-complex-internal-external-features/|5|3|3/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/025/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/025/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/025/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/025/after/390-full.png>)|
|26 /products/part-examples/high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem/|5|3|3/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/026/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/026/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/026/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/026/after/390-full.png>)|
|27 /products/part-examples/custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier/|5|4|4/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/027/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/027/confirm/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/027/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/027/confirm/390-full.png>)|
|28 /products/part-examples/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/|5|3|3/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/028/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/028/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/028/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/028/after/390-full.png>)|
|29 /products/part-examples/custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier/|5|3|3/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/029/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/029/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/029/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/029/after/390-full.png>)|
|30 /products/part-examples/custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier/|5|3|3/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/030/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/030/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/030/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/030/after/390-full.png>)|
|31 /products/part-examples/custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier/|5|3|3/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/031/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/031/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/031/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/031/after/390-full.png>)|
|32 /products/part-examples/custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier/|6|5|4/6|通过|[前](<D:/lzz/reading-polish-20261015-2313/032/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/032/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/032/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/032/after/390-full.png>)|
|33 /products/part-examples/custom-cnc-machined-castings-transmission-housings-pump-bodies/|5|3|3/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/033/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/033/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/033/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/033/after/390-full.png>)|
|34 /products/part-examples/custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier/|5|3|3/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/034/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/034/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/034/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/034/after/390-full.png>)|
|35 /products/part-examples/custom-oem-cnc-machined-non-metallic-components-insulating-parts/|5|3|3/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/035/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/035/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/035/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/035/after/390-full.png>)|
|36 /products/part-examples/custom-oem-cnc-machined-plastic-parts-manufacturer/|5|3|3/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/036/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/036/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/036/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/036/after/390-full.png>)|
|37 /products/part-examples/oem-precision-cnc-machined-casting-housing-structural-enclosures/|5|3|3/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/037/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/037/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/037/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/037/after/390-full.png>)|
|38 /products/part-examples/oem-precision-cnc-machined-casting-housings/|5|3|3/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/038/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/038/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/038/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/038/after/390-full.png>)|
|39 /products/part-examples/precision-cnc-machined-castings-custom-oem-housings/|5|3|3/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/039/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/039/confirm/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/039/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/039/confirm/390-full.png>)|
|40 /products/part-examples/precision-cnc-machined-castings-manufacturer/|5|3|3/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/040/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/040/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/040/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/040/after/390-full.png>)|
|41 /products/part-examples/precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances/|5|3|3/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/041/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/041/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/041/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/041/after/390-full.png>)|
|42 /products/part-examples/precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier/|5|3|3/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/042/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/042/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/042/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/042/after/390-full.png>)|
|43 /products/part-examples/precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier/|5|3|3/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/043/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/043/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/043/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/043/after/390-full.png>)|
|44 /products/part-examples/precision-machining-for-functional-plastic-blocks-structural-components/|5|3|3/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/044/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/044/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/044/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/044/after/390-full.png>)|
|45 /products/part-examples/precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures/|5|3|3/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/045/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/045/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/045/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/045/after/390-full.png>)|
|46 /products/part-examples/precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier/|5|3|3/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/046/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/046/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/046/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/046/after/390-full.png>)|
|47 /products/part-examples/precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier/|5|3|3/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/047/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/047/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/047/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/047/after/390-full.png>)|
|48 /products/part-examples/small-batch-cnc-machining-manufacturer-complex-aluminum-housings/|5|3|4/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/048/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/048/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/048/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/048/after/390-full.png>)|
|49 /products/part-examples/small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv/|5|3|3/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/049/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/049/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/049/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/049/after/390-full.png>)|
|50 /products/machining-studies/|5|9|3/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/050/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/050/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/050/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/050/after/390-full.png>)|
|51 /products/machining-studies/two-stage-cnc-milling/|4|3|3/4|通过|[前](<D:/lzz/reading-polish-20261015-2313/051/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/051/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/051/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/051/after/390-full.png>)|
|52 /products/machining-studies/five-axis-machining-multi-face-parts/|4|3|3/4|通过|[前](<D:/lzz/reading-polish-20261015-2313/052/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/052/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/052/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/052/after/390-full.png>)|
|53 /products/machining-studies/turning-then-milling-cylindrical-parts/|4|3|3/4|通过|[前](<D:/lzz/reading-polish-20261015-2313/053/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/053/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/053/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/053/after/390-full.png>)|
|54 /products/machining-studies/milling-a-pocketed-enclosure-form/|4|3|3/4|通过|[前](<D:/lzz/reading-polish-20261015-2313/054/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/054/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/054/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/054/after/390-full.png>)|
|55 /products/machining-studies/milling-prismatic-components/|4|3|3/4|通过|[前](<D:/lzz/reading-polish-20261015-2313/055/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/055/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/055/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/055/after/390-full.png>)|
|56 /products/machining-studies/29-inch-display-housing-cnc-machining/|4|3|3/4|通过|[前](<D:/lzz/reading-polish-20261015-2313/056/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/056/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/056/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/056/after/390-full.png>)|
|57 /products/machining-studies/custom-plastic-parts-ptfe-pom-pe-acrylic/|6|5|4/6|通过|[前](<D:/lzz/reading-polish-20261015-2313/057/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/057/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/057/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/057/after/390-full.png>)|
|58 /products/machining-studies/custom-metal-parts-batch-examples/|6|5|4/6|通过|[前](<D:/lzz/reading-polish-20261015-2313/058/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/058/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/058/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/058/after/390-full.png>)|
|59 /factory/|7|8|6/7|通过|[前](<D:/lzz/reading-polish-20261015-2313/059/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/059/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/059/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/059/after/390-full.png>)|
|60 /resources/|6|4|4/6|通过|[前](<D:/lzz/reading-polish-20261015-2313/060/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/060/confirm/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/060/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/060/confirm/390-full.png>)|
|61 /resources/ordering-guide/|7|4|4/7|通过|[前](<D:/lzz/reading-polish-20261015-2313/061/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/061/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/061/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/061/after/390-full.png>)|
|62 /resources/processes-materials-finishes/|4|5|3/4|通过|[前](<D:/lzz/reading-polish-20261015-2313/062/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/062/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/062/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/062/after/390-full.png>)|
|63 /resources/processes-materials-finishes/cnc-process-selection/|5|5|3/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/063/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/063/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/063/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/063/after/390-full.png>)|
|64 /resources/processes-materials-finishes/material-and-finish-checklist/|6|5|4/6|通过|[前](<D:/lzz/reading-polish-20261015-2313/064/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/064/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/064/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/064/after/390-full.png>)|
|65 /resources/faq/|5|3|3/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/065/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/065/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/065/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/065/after/390-full.png>)|
|66 /resources/rfq-checklist/|7|4|4/7|通过|[前](<D:/lzz/reading-polish-20261015-2313/066/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/066/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/066/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/066/after/390-full.png>)|
|67 /resources/drawings-and-ordering/compare-cnc-machining-quotations/|5|3|3/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/067/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/067/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/067/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/067/after/390-full.png>)|
|68 /resources/drawings-and-ordering/machined-prototype-approval-checklist/|6|4|4/6|通过|[前](<D:/lzz/reading-polish-20261015-2313/068/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/068/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/068/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/068/after/390-full.png>)|
|69 /resources/production-and-shipping/prototype-vs-small-batch-cnc/|6|4|4/6|通过|[前](<D:/lzz/reading-polish-20261015-2313/069/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/069/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/069/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/069/after/390-full.png>)|
|70 /resources/production-and-shipping/custom-cnc-parts-shipping-checklist/|6|4|4/6|通过|[前](<D:/lzz/reading-polish-20261015-2313/070/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/070/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/070/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/070/after/390-full.png>)|
|71 /resources/drawings-and-ordering/critical-features-cnc-drawing/|6|4|4/6|通过|[前](<D:/lzz/reading-polish-20261015-2313/071/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/071/confirm/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/071/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/071/confirm/390-full.png>)|
|72 /about/|4|3|3/4|通过|[前](<D:/lzz/reading-polish-20261015-2313/072/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/072/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/072/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/072/after/390-full.png>)|
|73 /about/company-profile/|5|6|4/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/073/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/073/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/073/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/073/after/390-full.png>)|
|74 /about/how-we-work/|6|6|4/6|通过|[前](<D:/lzz/reading-polish-20261015-2313/074/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/074/confirm/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/074/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/074/confirm/390-full.png>)|
|75 /about/company-news/|4|6|4/4|通过|[前](<D:/lzz/reading-polish-20261015-2313/075/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/075/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/075/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/075/after/390-full.png>)|
|76 /about/company-news/november-2025-hangzhou-lizhizao-group-activity/|4|7|4/4|通过|[前](<D:/lzz/reading-polish-20261015-2313/076/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/076/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/076/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/076/after/390-full.png>)|
|77 /about/company-news/china-africa-west-lake-summit-2025/|4|7|4/4|通过|[前](<D:/lzz/reading-polish-20261015-2313/077/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/077/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/077/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/077/after/390-full.png>)|
|78 /about/company-news/australian-customer-workshop-visit-january-2025/|4|7|4/4|通过|[前](<D:/lzz/reading-polish-20261015-2313/078/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/078/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/078/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/078/after/390-full.png>)|
|79 /about/company-news/may-2025-lzz-team-outing/|4|6|4/4|通过|[前](<D:/lzz/reading-polish-20261015-2313/079/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/079/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/079/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/079/after/390-full.png>)|
|80 /about/company-news/lzz-team-outing-2024/|4|8|4/4|通过|[前](<D:/lzz/reading-polish-20261015-2313/080/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/080/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/080/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/080/after/390-full.png>)|
|81 /about/contact/|5|3|3/5|通过|[前](<D:/lzz/reading-polish-20261015-2313/081/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/081/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/081/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/081/after/390-full.png>)|
|82 /404.html|1|3|1/1|通过（任务例外）|[前](<D:/lzz/reading-polish-20261015-2313/082/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/082/confirm/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/082/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/082/confirm/390-full.png>)|
|83 /privacy/|6|1|1/6|通过（任务例外）|[前](<D:/lzz/reading-polish-20261015-2313/083/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/083/after/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/083/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/083/after/390-full.png>)|
|84 /quote/|3|3|1/3|通过（任务例外）|[前](<D:/lzz/reading-polish-20261015-2313/084/before/1440-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/084/confirm/1440-full.png>)|[前](<D:/lzz/reading-polish-20261015-2313/084/before/390-full.png>) / [后](<D:/lzz/reading-polish-20261015-2313/084/confirm/390-full.png>)|

## 逐页问题、实际调整和图片

模块按最终实际几何顺序排列；照片文件是显示引用，原始身份及SHA映射见 [完整逐页JSON](<D:/lzz/reading-polish-20261015-2313/url-results.json>)。删除/合并均记录在“实施”，实质条件迁移记录到对应技术章或职责字段，没有用隐藏正文或全折叠制造简洁。

### 0. /

**模块职责（5）：** 1. Custom CNC parts.Made to your drawing.（你们做什么，适合我的任务吗？） → 2. Start with a familiar part.（哪种零件与我的项目相近？） → 3. The setup behind the shape.（形状如何通过工序实现？） → 4. Meet the workshop.（供应商依据与订单检查如何确认？） → 5. Let’s review your part.（下一步提交什么资料？）。

**原问题：** 首屏与产品区重复指向同一35件目录，形成两个同等显眼的浏览动作。；工艺/材料索引游离在产品模块之外，手机端链接横向换行且分组不够清楚。；工序正文被两个段落、主链接、额外标签和两条推荐打断，阅读节奏松散。

**实施：** 删除重复目录链接，将35件数量放入产品区介绍，首屏入口仍在。；把工艺/材料索引归入产品章，排为两组纵向可扫描的入口。；合并两段工序解释为一段，去掉推荐前的装饰标签，保留两条真实研究入口。；RFQ清单入口靠近绘图资料与主操作。

**图片计划与实际：** 保留现有9个匹配图源；原图质量足以承担任务，本页不新增图、不进行生成式修图。 最终9个有效独立源、5/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[machining-hero-1200.webp](<D:/lzz/lzz/_react/public/media/editorial-rebuild-20261015/machining-hero-1200.webp>) · [p02-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p02-1200.webp>) · [p22-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p22-framed-1200.webp>) · [p32-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p32-framed-1200.webp>) · [p26-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p26-1200.webp>) · [two-stage-first-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/two-stage-first-1600.webp>) · [two-stage-second-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/two-stage-second-1600.webp>) · [workshop-wide-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/workshop-wide-1600.webp>) · [definition-1200.webp](<D:/lzz/lzz/_react/public/media/image-led-20261015/definition-1200.webp>)。

**两端复核：** 两端整页审看完成：形态与选型入口同章，保留5个职责、9个图源；去掉1个重复目录链接，参数、唯一链接和SEO保持。  通过；没有本轮尚未修复的已知明显布局问题。

### 1. /capabilities/

**模块职责（6）：** 1. CNC machining capabilities（Do I start with process, material or project stage?） → 2. Choose by part geometry（Which process matches my form?） → 3. Start with the material（Which material requirements apply?） → 4. What information do you have today?（What can be done with my starting information?） → 5. Review the work behind the part（Where can I inspect the source machining records?） → 6. Bring the part requirements together（What do I need to send?）。

**原问题：** 工艺条目的图片和标题各有同一链接，入口重复且标题像额外操作。；手机材料区四张大图串成很长深色块，压低项目阶段和真实工序的可见性。；项目阶段每项两段短说明被分开，选择结果不易连贯扫描。

**实施：** 四个工艺条目各合成一个完整可点击入口，保留所有唯一URL。；手机材料两列展示，标题和说明紧随对应图，不改变材料条件。；每个项目阶段合并两段说明为一段；工艺标题改成直接的Choose by part geometry。

**图片计划与实际：** 保留10个现有有效图源；材料图手机采用两列4:3完整主体，保留真实来源限制。 最终10个有效独立源、4/6图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p00-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p00-framed-1200.webp>) · [p19-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p19-framed-1200.webp>) · [p02-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p02-1200.webp>) · [p22-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p22-framed-1200.webp>) · [p13-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p13-1200.webp>) · [p32-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p32-framed-1200.webp>) · [p27-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p27-1200.webp>) · [p26-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p26-1200.webp>) · [sample-definition-1200.webp](<D:/lzz/lzz/_react/public/media/capabilities-section-20261014/sample-definition-1200.webp>) · [two-stage-first-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/two-stage-first-1600.webp>)。

**两端复核：** 已复查修正后的两端整页：手机材料图为两列，图/标题/条件各自对应；工艺条目不再整段下划线。保留6章及10个有效图源，唯一URL不丢失。  通过；没有本轮尚未修复的已知明显布局问题。

### 2. /capabilities/cnc-milling-service/

**模块职责（7）：** 1. CNC Milling Services（What can be made for my part?） → 2. Pockets, holes and shared datums（Which geometry and workholding constraints govern the route?） → 3. CNC milling in practice（How are the features reached?） → 4. Parts suited to CNC milling（Which reference forms help describe my features?） → 5. Material and finish review（Which grade and final state must be specified?） → 6. Define the critical features（How will critical features be checked and approved?） → 7. Request a CNC milling quote（What do I need to send?）。

**原问题：** 手机首屏长介绍与产品图将主要操作推到首屏下缘，业务说明可以更直接。；三个零件例子使用重复的View part requirements，名称藏在小图注中，客户难以扫描差异。；手机参数每行重复很长的Drawing/Before production标签，增加阅读噪声。

**实施：** 仅本页压缩首屏业务介绍，保留所有形态、原型/小批次及按图要求。；零件例子使用可扫描的真实形态标题，取代重复CTA；图注保留来源身份。；手机材料/验收标签改为简洁的Drawing check、Drawing、Before production，原表头、参数、条件不变。

**图片计划与实际：** 保留9个有效图源，材料示意仍明确AI身份；不重绘真实零件或CMM。 最终9个有效独立源、6/7图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p00-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p00-framed-1200.webp>) · [milling-geometry-1200.webp](<D:/lzz/lzz/_react/public/media/editorial-rebuild-20261015/milling-geometry-1200.webp>) · [two-stage-first-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/two-stage-first-1600.webp>) · [two-stage-second-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/two-stage-second-1600.webp>) · [p01-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p01-1200.webp>) · [p13-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p13-1200.webp>) · [p33-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p33-1200.webp>) · [material-families-1200.webp](<D:/lzz/lzz/_react/public/media/procurement-layout-20261015/material-families-1200.webp>) · [cmm-room-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/cmm-room-1600.webp>)。

**两端复核：** 两端整页与手机材料正文已审看；产品标题替代重复通用CTA，参数值和提前约定条件完整。共享改动仅对本页启用，无坏图/溢出。  通过；没有本轮尚未修复的已知明显布局问题。

### 3. /capabilities/cnc-turning-service/

**模块职责（7）：** 1. CNC Turning Services（What can be made for my part?） → 2. One axis, several working features（Which geometry and workholding constraints govern the route?） → 3. Turning, secondary machining, finished features（How are the features reached?） → 4. Turned forms, different working interfaces（Which reference forms help describe my features?） → 5. Material and finish review（Which grade and final state must be specified?） → 6. Define the critical features（How will critical features be checked and approved?） → 7. Request a CNC turning quote（What do I need to send?）。

**原问题：** 真实车削竖图和铣削横图被分配相同列宽，左侧空白多、工序叙事不均衡。；例子名称在小图注，下面却重复通用CTA，形态差异不易扫描。；手机验收标签过长且反复出现，首屏次动作也没有指出具体查看内容。

**实施：** 调整真实工序图区3:5，保留不同零件/订单的事实说明。；采用零件形态标题及短来源图注。；精简手机参数标签；首屏次动作改为Diameters, bores & threads。

**图片计划与实际：** 保留8个原图源，真实车削照片不生成替代；桌面按竖横画幅使用3:5工序列宽，手机保持原图顺序。 最终8个有效独立源、6/7图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p19-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p19-framed-1200.webp>) · [turning-geometry-1200.webp](<D:/lzz/lzz/_react/public/media/editorial-rebuild-20261015/turning-geometry-1200.webp>) · [turning-operation-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/turning-operation-1600.webp>) · [turn-mill-operation-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/turn-mill-operation-1600.webp>) · [p06-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p06-1200.webp>) · [p07-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p07-1200.webp>) · [material-families-1200.webp](<D:/lzz/lzz/_react/public/media/procurement-layout-20261015/material-families-1200.webp>) · [cmm-room-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/cmm-room-1600.webp>)。

**两端复核：** 整页与正文两端已复核；桌面工序竖横比例更协调，手机参数和形态名称容易扫描。保留8个真实/明确示意图源及完整验收条件。  通过；没有本轮尚未修复的已知明显布局问题。

### 4. /capabilities/5-axis-cnc-machining/

**模块职责（7）：** 1. 5-Axis CNC Machining Services（What can be made for my part?） → 2. Match the tool path to the surface（Which geometry and workholding constraints govern the route?） → 3. Five-axis machining in practice（How are the features reached?） → 4. Angled faces & complex contours（Which reference forms help describe my features?） → 5. Material and finish review（Which grade and final state must be specified?） → 6. Define the critical features（How will critical features be checked and approved?） → 7. Request a 5-axis machining quote（What do I need to send?）。

**原问题：** 几何章先用摘要解释两种运动，随后再次各写一遍；客户要越过装夹与图片才看到关键差异。；例子继续重复View part requirements，P13轮廓盖件的身份不突出。；手机的长参数标签与大量技术条件混在一起，扫描负担高。

**实施：** 把Indexed/Simultaneous对比前移到几何章开头；删除同章重复摘要，模型/刀具/夹具要求仍在各路线原文。；为真实零件例子显示形态标题，保留原图及来源。；精简手机参数标签，首屏次动作明确为比较两种运动。

**图片计划与实际：** 保留8个独立有效图源，叶轮细节同源不重复计数；P04链接保留，低清图不重新使用。 最终8个有效独立源、6/7图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p02-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p02-1200.webp>) · [p02-hub-detail.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p02-hub-detail.webp>) · [five-axis-machine-wide-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/five-axis-machine-wide-1600.webp>) · [five-axis-parts-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/five-axis-parts-1600.webp>) · [p00-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p00-framed-1200.webp>) · [p11-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p11-1200.webp>) · [p13-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p13-1200.webp>) · [material-families-1200.webp](<D:/lzz/lzz/_react/public/media/procurement-layout-20261015/material-families-1200.webp>) · [cmm-room-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/cmm-room-1600.webp>)。

**两端复核：** 两端整页及关键正文复核完成；路线差异前移，删去同章重复摘要；所有图纸、夹具、材料、验收、单独测试及唯一链接均保留。  通过；没有本轮尚未修复的已知明显布局问题。

### 5. /capabilities/plastic-machined-parts/

**模块职责（5）：** 1. Plastic CNC Machining Services（What can be made for my part?） → 2. Plastic part examples & process review（Which material behavior and working interfaces guide machining?） → 3. Grade, condition and finishing（Which grade and final state must be specified?） → 4. Accept the finished part（How will critical features be checked and approved?） → 5. Request a plastic machining quote（What do I need to send?）。

**原问题：** 绿色条形件主图外部留白过多，手机首屏的图像贡献偏小。；支撑与调湿说明先出现三段技术文字，夹持示意直到段落末尾才出现。；例子名称小、CTA重复，手机材料/验收标签冗长。

**实施：** 主图采用8:5画布，裁掉无信息白边，保持完整产品。；支撑示意前移到说明开头，真实PTFE和PEEK来源限制保留。；显示真实形态标题、精简手机参数标签，首屏入口明确聚合物牌号与状态。；初稿8:5裁切导致边缘余量不足，已撤销；最终保留contain和完整轮廓，桌面温和放大，手机使用300px画布并复核。

**图片计划与实际：** 保留7个图片源及原视频；主图仅调整可视画布，不重绘零件；核对全部条形件边缘保留。 最终7个有效独立源、3/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p26-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p26-1200.webp>) · [p21-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p21-1200.webp>) · [p29-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p29-framed-1200.webp>) · [plastic-support-1200.webp](<D:/lzz/lzz/_react/public/media/capabilities-section-20261014/plastic-support-1200.webp>) · [plastic-ptfe-intermediate-1200.webp](<D:/lzz/lzz/_react/public/media/source-details/plastic-ptfe-intermediate-1200.webp>) · [plastic-ptfe-shafts-1200.webp](<D:/lzz/lzz/_react/public/media/source-details/plastic-ptfe-shafts-1200.webp>) · [cmm-room-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/cmm-room-1600.webp>)。

**两端复核：** 初稿主图边缘余量不足，已撤销并复查保守contain画布：条形件及孔口完整；示意图前移，原PTFE/PEEK照片和全部条件保留。  通过；没有本轮尚未修复的已知明显布局问题。

### 6. /capabilities/casting-machining/

> 本条下方保留上一轮实施快照；当前版本已由文末「2026-10-16 铸件加工页精修」覆盖，现为六章、五图、四个图文章。

**模块职责（7）：** 1. Casting Machining Services（What can be made for my part?） → 2. Separate the blank from the finished interfaces（Which geometry and workholding constraints govern the route?） → 3. From cast blank to inspected part（How are the features reached?） → 4. Cast housings & finished interfaces（Which reference forms help describe my features?） → 5. Casting material & blank requirements（Which grade and final state must be specified?） → 6. Define the critical features（How will critical features be checked and approved?） → 7. Request a casting machining quote（What do I need to send?）。

**原问题：** 材料章沿用通用棒料/塑料试样，不契合铸坯状态和加工余量的本页任务。；两个真实铸件例子名称弱化，重复View part requirements妨碍比较。；手机参数长标签和毛坯/成品要求的层级未充分区分。

**实施：** 生成并实际接入符合铸坯主题的材料章示意，替换不合任务的通用四材料图。；真实例子显示可扫描的形态名称。；精简手机表格标签，首屏次动作明确毛坯与成品要求。

**图片计划与实际：** 保留真实铸件与CMM、已有几何比较；材料图改为新生成的通用铸坯表面概念，非实际产品或库存证据。生成后检查完整形状、粗糙表面、自然光线，无标识或文字，3:2横幅。 最终6个有效独立源、5/7图文章；本轮生成并接入铸坯示意。 显示文件：[p22-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p22-framed-1200.webp>) · [casting-stages-1200.webp](<D:/lzz/lzz/_react/public/media/services-reading-20261014/casting-stages-1200.webp>) · [p18-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p18-framed-1200.webp>) · [p24-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p24-1200.webp>) · [casting-condition-1200.webp](<D:/lzz/lzz/_react/public/media/reading-polish-20261015/casting-condition-1200.webp>) · [cmm-room-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/cmm-room-1600.webp>)。

**两端复核：** 生成的铸坯概念图已实际接入并核对两端，粗糙外表与光滑基准面服务材料章；AI身份可见，真实铸件和全部验收条件保留。  通过；没有本轮尚未修复的已知明显布局问题。

### 7. /capabilities/aluminum-cnc-parts/

**模块职责（5）：** 1. Aluminum CNC Machining Services（What can be made for my part?） → 2. Choose the alloy and final finish（Which grade and final state must be specified?） → 3. Aluminum machining in practice（Which material behavior and working interfaces guide machining?） → 4. Accept the finished part（How will critical features be checked and approved?） → 5. Request an aluminum machining quote（What do I need to send?）。

**原问题：** 材料意图访客需滚过两组形态与工序照片，才看到牌号和表面条件。；表面处理示意远在验收章，离材料/处理选择太远。；真实例子名称不突出、重复CTA及长手机参数标签增加噪声。

**实施：** 材料表前移到首屏之后，以明确材料选择标题开章。；表面处理示意与材料章共同构图，原处理标准/掩蔽/最终尺寸文本仍保留在验收章。；形态名称替代通用CTA，手机参数用简洁标签。

**图片计划与实际：** 保留7个独立源；把已有AI表面处理示意从验收章移至材料章，不重复计图。真实盖件、外壳、铣削和CMM不重绘。 最终7个有效独立源、4/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p13-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p13-1200.webp>) · [finish-comparison-1200.webp](<D:/lzz/lzz/_react/public/media/editorial-rebuild-20261015/finish-comparison-1200.webp>) · [p33-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p33-1200.webp>) · [p30-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p30-1200.webp>) · [milling-enclosure-operation-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/milling-enclosure-operation-1600.webp>) · [milling-enclosure-parts-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/milling-enclosure-parts-1600.webp>) · [cmm-room-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/cmm-room-1600.webp>)。

**两端复核：** 两端整页确认材料/表面选择先于工序证据，已有示意只迁移不重复使用；5个核心职责、所有牌号/状态/处理边界及唯一链接保留。  通过；没有本轮尚未修复的已知明显布局问题。

### 8. /capabilities/stainless-steel-cnc-parts/

**模块职责（5）：** 1. Stainless Steel CNC Machining（What can be made for my part?） → 2. Plan the stainless machining sequence（Which material behavior and working interfaces guide machining?） → 3. Grade, condition and finishing（Which grade and final state must be specified?） → 4. Accept the finished part（How will critical features be checked and approved?） → 5. Request a stainless steel quote（What do I need to send?）。

**原问题：** 两个零件形态的名称不如重复CTA醒目。；装夹输入以一条孤立说明横跨在形态和顺序之间，与相应步骤脱节。；手机材料和验收每行重复长标签，牌号/热处理状态的重点被稀释。

**实施：** 用形态标题替代通用CTA。；装夹输入移入步骤说明组，和原示意组成4:7比例。；精简手机标签，保留303/304、316/316L、17-4PH、430/440及处理/替代限制。

**图片计划与实际：** 保留5个清晰、匹配源；本页原图无需润色，图示只说明几何不认证牌号。 最终5个有效独立源、3/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p32-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p32-framed-1200.webp>) · [p19-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p19-framed-1200.webp>) · [p31-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p31-1200.webp>) · [turning-geometry-1200.webp](<D:/lzz/lzz/_react/public/media/editorial-rebuild-20261015/turning-geometry-1200.webp>) · [cmm-room-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/cmm-room-1600.webp>)。

**两端复核：** 两端整页/牌号表/询盘区已复核，装夹输入与步骤同组；保留5个图源和所有热处理、替代与表面要求，无唯一链接及SEO损失。  通过；没有本轮尚未修复的已知明显布局问题。

### 9. /capabilities/copper-brass-cnc-parts/

**模块职责（5）：** 1. Copper & Brass CNC Machining（What can be made for my part?） → 2. From alloy choice to finished fitting（Which material behavior and working interfaces guide machining?） → 3. Grade, condition and finishing（Which grade and final state must be specified?） → 4. Accept the finished part（How will critical features be checked and approved?） → 5. Request a copper or brass quote（What do I need to send?）。

**原问题：** 首屏次动作只写比较牌号，没有体现电气/热/密封功能先行的选择逻辑。；装夹输入单独横置，离螺纹/通道说明有视觉断点。；手机参数长标签重复，铜牌号和不同标准不可等同的提醒难以扫描。

**实施：** 次动作明确为Choose by function & alloy，目标仍是材料章。；装夹输入归入螺纹和通道说明组，消除孤立说明。；手机参数用短标签，全部牌号、材料限制、声明和压力/导电等单独测试边界保留。

**图片计划与实际：** 保留3个有效图源；真实批量零件图虽复杂但有来源价值，不用生成图假替换，辅助几何图继续明确AI和非合金证明。 最终3个有效独立源、3/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p27-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p27-1200.webp>) · [turning-geometry-1200.webp](<D:/lzz/lzz/_react/public/media/editorial-rebuild-20261015/turning-geometry-1200.webp>) · [cmm-room-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/cmm-room-1600.webp>)。

**两端复核：** 两端整页/参数/询盘已复核；功能选型入口和装夹说明关系清晰，保留3个图源，C3600/C36000/H62不可等同及独立功能测试边界完整。  通过；没有本轮尚未修复的已知明显布局问题。

### 10. /capabilities/prototype-machining/

**模块职责（4）：** 1. CNC Prototype Machining（What can be made for my part?） → 2. From evaluation question to approved result（What must the prototype answer and who approves it?） → 3. Record what differs from production（Which conclusions can transfer to production?） → 4. Request a prototype review（What do I need to send?）。

**原问题：** 首屏先口号后解释同一个设计问题，真实任务和照片被推迟。；批准章的应用说明、通用边界和结尾callout重复解释车辆性能/独立测试范围。；材料与后续阶段的链接分散，两个参考还重复通用CTA。

**实施：** 首屏合并为具体任务与批准责任。；把汽车/摩托原型适用与限制整合成两段，保留冷却件接头、供件范围、节气门孔/执行器接口和单独测试条件。；参考显示真实名称，材料及后续链接集中排列，不移除唯一URL。

**图片计划与实际：** 保留3个不同源，CAD继续标为CAD而非实物；本页没有需要新生或润色的图位。 最终3个有效独立源、3/4图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p13-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p13-1200.webp>) · [p12-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p12-1200.webp>) · [p15-framed-480.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p15-framed-480.webp>)。

**两端复核：** 两端整页/应用边界/询盘已复核，重复口号和重复应用总结已合并；CAD身份清楚，原型批准、替代材料与下一修订要求及唯一链接保留。  通过；没有本轮尚未修复的已知明显布局问题。

### 11. /capabilities/low-volume-production/

**模块职责（5）：** 1. Low-Volume CNC Production（What can be made for my part?） → 2. One controlled specification per component（What must remain controlled for each line item?） → 3. Approve the first parts, then release the batch（When may the batch proceed?） → 4. Keep the repeat release and packing aligned（What travels with each repeated release?） → 5. Request a small-batch quote（What do I need to send?）。

**原问题：** 首屏两段短介绍重复描述每次放行，形成多余断点。；手机验收章先占用大幅设备照片，具体谁批准、何时停留、记录什么在后面。；两个真实批次参考使用通用CTA，识别内容和下一步需要来回阅读。

**实施：** 合并首屏两段说明。；手机验收先读三个批准阶段，再看CMM照片；桌面仍保留图文并置。；批次例子改用命名入口，包装小标题明确为本订单确认。

**图片计划与实际：** 保留4个真实源；手机CMM图移到批准要求后并控制宽度，不删除来源与校准/方法说明。 最终4个有效独立源、4/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p28-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p28-1200.webp>) · [p34-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p34-1200.webp>) · [cmm-room-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/cmm-room-1600.webp>) · [p30-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p30-1200.webp>)。

**两端复核：** 两端整页/放行流程已复核，手机先读批准责任和记录再看CMM；保留4个真实图源、完整批次/预测/放行/包装和时间条件。  通过；没有本轮尚未修复的已知明显布局问题。

### 12. /capabilities/starting-with-a-sample/

**模块职责（5）：** 1. Machining from an Existing Sample（What can be made for my part?） → 2. Keep the intended fit, resolve the unknowns（What must be retained and what is still unknown?） → 3. What each stage delivers（What will measurement and reconstruction deliver?） → 4. Approve the first part before repeat production（How will critical features be checked and approved?） → 5. Send the information available now（What do I need to send?）。

**原问题：** 交付阶段采用三列长文字，难按测量→重建→批准的先后关系阅读。；已知/未知材料与替代规格条件夹在阶段末尾，与一般Input/Output视觉权重相近。；手机验收表重复长标签，关键批准条件不易扫描。

**实施：** 桌面三个交付阶段改为纵向阶段行，内部两列组织输入/输出与责任。；材料状态保留在每阶段明确的独立条件行，手机顺序仍完整。；精简手机验收标签，保留未知材料、测量不能反推原公差/处理、批准人和单独重建周期。

**图片计划与实际：** 保留4个不同匹配图源，示意图持续标明AI/非批准图纸，真实阀壳和CMM不编辑。 最终4个有效独立源、4/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p23-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p23-framed-1200.webp>) · [sample-definition-1200.webp](<D:/lzz/lzz/_react/public/media/capabilities-section-20261014/sample-definition-1200.webp>) · [definition-1200.webp](<D:/lzz/lzz/_react/public/media/image-led-20261015/definition-1200.webp>) · [cmm-room-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/cmm-room-1600.webp>)。

**两端复核：** 两端整页确认三个阶段按时间顺序阅读，未知材料/替代条件单独可见，保留全部输出、批准责任、原公差未知及重建周期边界。  通过；没有本轮尚未修复的已知明显布局问题。

### 13. /products/

**模块职责（4）：** 1. CNC parts, made to your drawing.（What is supplied?） → 2. Start with the part form（Which part family fits?） → 3. See how the part is held and reached（How do setups relate to the shape?） → 4. Define your order（What controls this order?）。

**原问题：** 首屏四图拼接与下方六种形态重复三张原图，连续看同一批零件影响节奏。；塑料产品仅是目录后的文字链接，与金属形态的可见性差距过大。；首屏两个普通链接权重相同，部件浏览与研究之间缺少主要动作。

**实施：** 首屏换为一张真实工件组照片，保持主体形态并检查两端裁切。；塑料成为六个主形态之一；装配的唯一入口及说明移入补充任务区，批次入口保留。；部件目录作为首屏主动作，研究为次动作，避免重复图像和含糊入口。；塑料来源说明由绝对定位图片区迁到形态说明后，避免图文叠压；装配说明离开链接文本，取消整段下划线。

**图片计划与实际：** 取消重复拼图，使用已检视的真实多面工件源组作首屏；六种形态保留明确匹配照片，塑料原主体+AI背景说明移到相应图。全页不生成新图片，不用少数响应式版本凑数。 最终8个有效独立源、3/4图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[five-axis-parts-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/five-axis-parts-1600.webp>) · [p33-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p33-1200.webp>) · [p32-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p32-framed-1200.webp>) · [p00-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p00-framed-1200.webp>) · [p02-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p02-1200.webp>) · [p22-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p22-framed-1200.webp>) · [p29-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p29-framed-1200.webp>) · [turn-mill-operation-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/turn-mill-operation-1600.webp>)。

**两端复核：** 已修正塑料图注叠压与装配说明整段下划线，两端整页复核通过；去掉首屏重复拼图，保留所有唯一筛选/研究/询盘入口。  通过；没有本轮尚未修复的已知明显布局问题。

### 14. /products/part-examples/

**模块职责（5）：** 1. Machined part examples（What can I find here?） → 2. Multi-bore circular milled component（Which form and material status match?） → 3. Covered wheels, rollers & shaped components（Which core, covering and acceptance must be defined?） → 4. Conical & cylindrical gear forms（Which gear specification and mating interfaces are needed?） → 5. From the part form to the setup（What is the next step?）。

**原问题：** 手机目录标题挤在缩略图旁，长形态名换行过多，难以先认出每个条目。；图库预览与下方完整来源组重复两张图，并再次出现通用View complete references。；材料信息需要完整保留，但当前标题、特征和材料混成同等密度，图片尺寸偏小。

**实施：** 手机每个条目先显示全行名称，再以略大的图片与特征/材料并置，保留全部参数而非截断。；图库匹配入口改为有名称的简洁文本导航，完整图组仍在后面。；移除重复通用图库CTA，研究入口使用具体名称。

**图片计划与实际：** 保留35条真实/已明确身份的参考和5张完整来源图；移除两个重复预览缩略图，不删除完整来源照片。P04低清原图继续待补、不计合格图片。 最终39个有效独立源、3/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p00-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p00-framed-1200.webp>) · [p01-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p01-1200.webp>) · [p02-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p02-1200.webp>) · [p03-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p03-framed-1200.webp>) · [p04-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p04-framed-1200.webp>) · [p05-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p05-1200.webp>) · [p06-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p06-1200.webp>) · [p07-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p07-1200.webp>) · [p08-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p08-1200.webp>) · [p09-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p09-1200.webp>) · [p10-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p10-1200.webp>) · [p11-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p11-1200.webp>) · [p12-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p12-1200.webp>) · [p13-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p13-1200.webp>) · [p14-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p14-framed-1200.webp>) · [p15-framed-480.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p15-framed-480.webp>) · [p16-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p16-framed-1200.webp>) · [p17-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p17-1200.webp>) · [p18-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p18-framed-1200.webp>) · [p19-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p19-framed-1200.webp>) · [p20-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p20-1200.webp>) · [p21-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p21-1200.webp>) · [p22-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p22-framed-1200.webp>) · [p23-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p23-framed-1200.webp>) · [p24-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p24-1200.webp>) · [p25-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p25-framed-1200.webp>) · [p26-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p26-1200.webp>) · [p27-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p27-1200.webp>) · [p28-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p28-1200.webp>) · [p29-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p29-framed-1200.webp>) · [p30-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p30-1200.webp>) · [p31-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p31-1200.webp>) · [p32-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p32-framed-1200.webp>) · [p33.webp](<D:/lzz/lzz/_react/public/media/products-real-details-20261015/p33.webp>) · [p34-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p34-1200.webp>) · [covered-wheels-1200.webp](<D:/lzz/lzz/_react/public/media/source-details/covered-wheels-1200.webp>) · [covered-rollers-1200.webp](<D:/lzz/lzz/_react/public/media/source-details/covered-rollers-1200.webp>) · [covered-shaped-parts-1200.webp](<D:/lzz/lzz/_react/public/media/source-details/covered-shaped-parts-1200.webp>) · [gear-bevel-examples-1200.webp](<D:/lzz/lzz/_react/public/media/source-details/gear-bevel-examples-1200.webp>) · [gear-cylindrical-examples-1200.webp](<D:/lzz/lzz/_react/public/media/source-details/gear-cylindrical-examples-1200.webp>)。

**两端复核：** 两端完整页面及关键条目已审看；手机名称先于图/参数，未截断正文；删除两个重复预览图，10项实际目录交互/无JS检查通过。  通过；没有本轮尚未修复的已知明显布局问题。

### 15. /products/part-examples/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/

**模块职责（5）：** 1. Multi-bore circular milled component（What is this form and what material/final condition must be specified?） → 2. Features to define（Which geometry, supply scope and checks control acceptance?） → 3. Machining and use（How do related setups and intended uses affect this drawing?） → 4. Related machining and part forms（Which visible differences should guide the next drawing review?） → 5. Review your drawing（What must be sent and what are the order conditions?）。

**原问题：** 圆盘采购最关心的中心孔/阶梯/孔列关系，被一般加工用途说明放在后面。；每个特征的说明和检查短句分成两段，产生零碎文本节奏。；相关推荐中的工艺标题、空泛范围说明和通用CTA重复同一个任务。

**实施：** 将绘图特征前移到产品资料后。；在不删除原句/单位的前提下合并同一特征的两段说明。；相关推荐仅保留明确命名的CNC milling入口，删除重复的泛泛说明和通用CTA。

**图片计划与实际：** 保留3个匹配独立源，主图、真实工序和相关形态各有任务；不润色已清晰原图。 最终3个有效独立源、3/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p00-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p00-framed-1200.webp>) · [two-stage-first-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/two-stage-first-1600.webp>) · [p01-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p01-1200.webp>)。

**两端复核：** 补做完整句审校并复查截图，中心孔/阶梯/孔列/平面方向及未见特征检查方法均保留；不以重复片段充正文，唯一链接和SEO不变。  通过；没有本轮尚未修复的已知明显布局问题。

### 16. /products/part-examples/custom-oem-high-precision-cnc-milling-manufacturer/

**模块职责（5）：** 1. Milled instrument blocks & brackets（What is this form and what material/final condition must be specified?） → 2. Machining and use（How do related setups and intended uses affect this drawing?） → 3. Choose the form, then define the interfaces（Which geometry, supply scope and checks control acceptance?） → 4. Related machining and part forms（Which visible differences should guide the next drawing review?） → 5. Review your drawing（What must be sent and what are the order conditions?）。

**原问题：** 图片是多个形态的集合，但并非供应套组的关键说明在后文才出现。；首屏未知材料与确认材料的说明重复，条件分散成多段。；特征正文/短检查分段零碎，应用链接和通用工艺CTA分散。

**实施：** 把非供应套组/需指定所选对象的说明移到原图附近，保留原锚点。；未知材料和牌号/状态要求合成一段。；合并特征说明原句，技术入口集中到推荐区，保留仪器定位和所有唯一URL。

**图片计划与实际：** 保留3个清晰源；多形态拼图本身有比较价值，不以生成图拆成虚构单件照片。 最终3个有效独立源、3/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p01-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p01-1200.webp>) · [multi-feature-milling-operation-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/multi-feature-milling-operation-1600.webp>) · [p00-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p00-framed-1200.webp>)。

**两端复核：** 二次截图确认集合说明靠近原图；技术段落已写成自然完整句，全部孔道/去毛刺/清洁/泄漏测试/各阶段检查条件保留，3个图源及唯一链接无丢失。  通过；没有本轮尚未修复的已知明显布局问题。

### 17. /products/part-examples/ultra-high-precision-machining-services/

**模块职责（5）：** 1. Custom CNC Impeller Machining（What is this form and what material/final condition must be specified?） → 2. Features to define（Which geometry, supply scope and checks control acceptance?） → 3. Machining and use（How do related setups and intended uses affect this drawing?） → 4. Related machining and part forms（Which visible differences should guide the next drawing review?） → 5. Review your drawing（What must be sent and what are the order conditions?）。

**原问题：** 叶片/轮毂的真实细节和关键曲面要求出现在一般加工说明后，选型重点不够早。；平衡测试的采购边界散在加工问答和特征末尾，重复且离关键轮毂要求较远。；材料确认分成两段，推荐区又重复泛泛工艺说明和通用CTA。

**实施：** 把带真实细节的绘图章前移。；平衡测试问答移入特征章，详细程序/装配状态/接受限值保留，移除同章重复概述。；技术要求写成完整句；材料确认合段，工艺/应用资料集中推荐。

**图片计划与实际：** 保留叶轮整体、真实细节裁片、独立五轴记录和相关叶轮；同源细节不重复计入，仍3个有效独立源。 最终3个有效独立源、4/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p02-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p02-1200.webp>) · [p02-hub-detail.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p02-hub-detail.webp>) · [five-axis-operation-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/five-axis-operation-1600.webp>) · [p11-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p11-1200.webp>)。

**两端复核：** 两端复核真实叶片细节与平衡问答前移；同一5-axis服务URL去重后保留明确名称。3个独立图源、所有测试程序/限值/装配状态与材料条件完整。  通过；没有本轮尚未修复的已知明显布局问题。

### 18. /products/part-examples/global-oem-precision-machining-solutions/

**模块职责（5）：** 1. Angled turned component reference（What is this form and what material/final condition must be specified?） → 2. Features to define（Which geometry, supply scope and checks control acceptance?） → 3. Machining and use（How do related setups and intended uses affect this drawing?） → 4. Related machining and part forms（Which visible differences should guide the next drawing review?） → 5. Review your drawing（What must be sent and what are the order conditions?）。

**原问题：** 斜颈与主体轴线关系是核心判断，但在一般用途说明后才出现。；未知材料和确认状态分成重复段落。；四组技术说明含重复片段句，相关推荐也重复描述工艺范围。

**实施：** 把轴线与接口要求前移。；材料要求合成明确一段，技术说明改成完整自然句，保留同轴/跳动、位置方向、泄漏/清洁及报价验收方法。；工艺及应用要求集中推荐，移除空泛重复说明。

**图片计划与实际：** 保留3个匹配源，不重画螺纹、斜颈或不可见背面。原图足够说明当前形态，测量仍依据图纸。 最终3个有效独立源、3/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p03-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p03-framed-1200.webp>) · [turn-mill-operation-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/turn-mill-operation-1600.webp>) · [p06-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p06-1200.webp>)。

**两端复核：** 两端整页/轴线接口/询盘已复核，技术片段已整合为完整句，材料未知和各类验收/泄漏/清洁条件保留，3个真实图源及唯一链接不变。  通过；没有本轮尚未修复的已知明显布局问题。

### 19. /products/part-examples/global-manufacturer-of-multi-sided-precision-machined-components/

**模块职责（5）：** 1. Multi-sided machined components（What is this form and what material/final condition must be specified?） → 2. Machining and use（How do related setups and intended uses affect this drawing?） → 3. Features to define（Which geometry, supply scope and checks control acceptance?） → 4. Related machining and part forms（Which visible differences should guide the next drawing review?） → 5. Review your drawing（What must be sent and what are the order conditions?）。

**原问题：** 主图缺失可靠细节，放大展示会强化模糊感；历史两次生成式修图未能可靠保持结构。；未知材料说明分散重复，端口/基准/装夹要求是片段句。；应用与工艺推荐分散且带通用重复说明。

**实施：** 降低模糊原图的视觉占比，完整轮廓仍保留。；材料条件合段，技术说明写成完整句并保留全部基准/端口/重复装夹/密封条件。；集中工艺和应用入口，不删除唯一URL。

**图片计划与实际：** 保留原参考但限制展示尺寸；不把它计为合格图片。另2个清晰独立源保留，不添加无关图凑数。历史原图/失败候选见D:/lzz/narrative-rebuild-20261015/p04-imagegen-attempt/。 最终2个有效独立源、2/5图文章；原图受限，未接入失败编辑结果。 显示文件：[p04-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p04-framed-1200.webp>) · [five-axis-operation-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/five-axis-operation-1600.webp>) · [p01-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p01-1200.webp>)。

**两端复核：** 桌面和手机阅读布局已精修；原图仍模糊，仅2张有效独立图片、2/5图文模块，待补同件真实高清素材，未判定视觉通过。  待补素材：P04真实原图模糊；两次既有保守编辑未可靠恢复细节且均未接入，需同一零件高清整体与接口细节。

### 20. /products/part-examples/custom-oem-cnc-turning-manufacturer/

**模块职责（5）：** 1. Custom CNC-turned components（What is this form and what material/final condition must be specified?） → 2. Machining and use（How do related setups and intended uses affect this drawing?） → 3. Choose the form, then define the interfaces（Which geometry, supply scope and checks control acceptance?） → 4. Related machining and part forms（Which visible differences should guide the next drawing review?） → 5. Review your drawing（What must be sent and what are the order conditions?）。

**原问题：** 组合图的逐件供货边界离主图过远。；配合与轴向定位要求拆成重复碎句。；相关推荐的通用工艺解释和链接重复。

**实施：** 供货边界移到原组合图下。；合并4组重复片段，保留全部配合、跳动及螺纹量规要求。；简化相关推荐为具名入口。

**图片计划与实际：** 保留组合产品、独立车铣工序及相关回转件3个原始来源，保持完整主体，不重画产品。 最终3个有效独立源、3/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p05-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p05-1200.webp>) · [turn-mill-operation-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/turn-mill-operation-1600.webp>) · [p06-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p06-1200.webp>)。

**两端复核：** 两端整页及局部已检查；组合边界紧邻主图，直径/轴向/二次特征连续阅读，3源图片完整，无新溢出。  通过；没有本轮尚未修复的已知明显布局问题。

### 21. /products/part-examples/custom-rotary-cylindrical-components/

**模块职责（5）：** 1. Rotary & cylindrical components（What is this form and what material/final condition must be specified?） → 2. Choose the form, then define the interfaces（Which geometry, supply scope and checks control acceptance?） → 3. Machining and use（How do related setups and intended uses affect this drawing?） → 4. Related machining and part forms（Which visible differences should guide the next drawing review?） → 5. Review your drawing（What must be sent and what are the order conditions?）。

**原问题：** 组合图供货边界过晚。；同轴、角向与孔位要求在通用工序之后才出现。；检查短句和通用工艺CTA造成碎片阅读。

**实施：** 供货边界靠近组合图。；特征判断前置，合并完整自然句。；相关工艺集中为CNC turning入口。

**图片计划与实际：** 保留3个真实独立源。完整展示6种参考形态及相关车削组合，不拆成重复图凑数。 最终3个有效独立源、3/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p06-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p06-1200.webp>) · [turn-mill-operation-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/turn-mill-operation-1600.webp>) · [p05-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p05-1200.webp>)。

**两端复核：** 两端整页和特征段局部复核，同轴与角向先于工序，用途边界和3个真实来源保留；无明显裁切或溢出。  通过；没有本轮尚未修复的已知明显布局问题。

### 22. /products/part-examples/custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer/

**模块职责（5）：** 1. Turned fittings, connectors & flanges（What is this form and what material/final condition must be specified?） → 2. Choose the form, then define the interfaces（Which geometry, supply scope and checks control acceptance?） → 3. Machining and use（How do related setups and intended uses affect this drawing?） → 4. Related machining and part forms（Which visible differences should guide the next drawing review?） → 5. Review your drawing（What must be sent and what are the order conditions?）。

**原问题：** 螺纹标准和密封要求散落在工序、问答和特征之间。；组合图未就近说明逐件供货。；检查碎句和相关推荐重复解释。

**实施：** 接口及配合问答前置并相邻。；供货边界移至主图下；合并检查碎句。；减少通用推荐文案，保留全部有效去向。

**图片计划与实际：** 保留真实接头组合、独立车铣照片及铜件批图3来源，不生成密封或内部细节。 最终3个有效独立源、3/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p07-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p07-1200.webp>) · [turn-mill-operation-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/turn-mill-operation-1600.webp>) · [p27-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p27-1200.webp>)。

**两端复核：** 接口和配合问答已前置；两端完整截图及局部没有遮挡或坏图，3个真实源、全部螺纹和测试边界保留。  通过；没有本轮尚未修复的已知明显布局问题。

### 23. /products/part-examples/full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing/

**模块职责（5）：** 1. Milled metal brackets & finished housings（What is this form and what material/final condition must be specified?） → 2. Choose the form, then define the interfaces（Which geometry, supply scope and checks control acceptance?） → 3. Machining and use（How do related setups and intended uses affect this drawing?） → 4. Related machining and part forms（Which visible differences should guide the next drawing review?） → 5. Review your drawing（What must be sent and what are the order conditions?）。

**原问题：** 表面处理选项挤成侧栏长段落。；最终尺寸、保护区域和外观验收分散，检查短句重复。；组合图供货边界过晚及通用推荐重复。

**实施：** 处理选项按基材分行，保留全部选项及条件。；特征前移并合并检查碎句。；供货边界靠近原图，推荐保留明确入口。

**图片计划与实际：** 保留黑色成品组合、真实铣削及彩色外观组合3源，不将颜色当成处理证明。 最终3个有效独立源、3/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p08-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p08-1200.webp>) · [two-stage-first-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/two-stage-first-1600.webp>) · [p09-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p09-1200.webp>)。

**两端复核：** 两端选项列表及特征段检查完成；未裁切主体，表面处理全部选项保留，3个独立图片来源加载正常。  通过；没有本轮尚未修复的已知明显布局问题。

### 24. /products/part-examples/custom-high-precision-machining-for-structural-aesthetic-components-oem/

**模块职责（5）：** 1. Structural & aesthetic components（What is this form and what material/final condition must be specified?） → 2. Machining and use（How do related setups and intended uses affect this drawing?） → 3. Choose the form, then define the interfaces（Which geometry, supply scope and checks control acceptance?） → 4. Related machining and part forms（Which visible differences should guide the next drawing review?） → 5. Review your drawing（What must be sent and what are the order conditions?）。

**原问题：** 材料未指定的说明分为重复两段。；组合图与逐件范围相隔较远。；外观/装配检查碎句和正文推荐链接打断阅读。

**实施：** 供货范围紧随主图，合并材料确认说明。；保留应用信息，集中其下一步链接。；合并特征与检查短句，保留装配和外观验收区别。

**图片计划与实际：** 3张匹配原图均保留；颜色和表面不反推合金或工艺，主图不裁切。 最终3个有效独立源、3/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p09-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p09-1200.webp>) · [two-stage-first-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/two-stage-first-1600.webp>) · [p08-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p08-1200.webp>)。

**两端复核：** 桌面和手机完整截图已复核；原图保留，外观和装配验收可连续阅读，应用资料集中入口无丢失。  通过；没有本轮尚未修复的已知明显布局问题。

### 25. /products/part-examples/high-volume-cnc-turning-for-complex-internal-external-features/

**模块职责（5）：** 1. Complex internal & external turned features（What is this form and what material/final condition must be specified?） → 2. Choose the form, then define the interfaces（Which geometry, supply scope and checks control acceptance?） → 3. Machining and use（How do related setups and intended uses affect this drawing?） → 4. Related machining and part forms（Which visible differences should guide the next drawing review?） → 5. Review your drawing（What must be sent and what are the order conditions?）。

**原问题：** 材料确认重复。；内孔可测量性与重复订货基线在工序后才出现。；碎片检查语及重复工艺推荐削弱主次。

**实施：** 逐件范围移近主图。；内外特征及批记录前置，保留量规访问和统计控制条件。；精简材料与通用推荐重复。

**图片计划与实际：** 保留3个独立真实源；不由拼图推断批量产能或订单。 最终3个有效独立源、3/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p10-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p10-1200.webp>) · [turn-mill-operation-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/turn-mill-operation-1600.webp>) · [p05-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p05-1200.webp>)。

**两端复核：** 两端整页和局部已复核；内外特征与批记录连续，图片完整，产能和生产交付条件未变。  通过；没有本轮尚未修复的已知明显布局问题。

### 26. /products/part-examples/high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem/

**模块职责（5）：** 1. Turbine & fluid-system components（What is this form and what material/final condition must be specified?） → 2. Features to define（Which geometry, supply scope and checks control acceptance?） → 3. Machining and use（How do related setups and intended uses affect this drawing?） → 4. Related machining and part forms（Which visible differences should guide the next drawing review?） → 5. Review your drawing（What must be sent and what are the order conditions?）。

**原问题：** 曲面和轮毂检查被一般用途说明后置。；平衡测试问答与运行条件分散。；材料确认、检查片段与通用工艺推荐重复。

**实施：** 特征和测试问题前置为相邻组。；合并材料及检查短句，保留CMM、追溯、流量、泄漏边界。；用明确五轴入口替换重复泛泛介绍。

**图片计划与实际：** 保留涡轮、独立五轴工序、相关叶轮3源；不生成隐藏流道或性能证据。 最终3个有效独立源、3/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p11-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p11-1200.webp>) · [five-axis-operation-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/five-axis-operation-1600.webp>) · [p02-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p02-1200.webp>)。

**两端复核：** 两端整页及问答局部已复核，曲面/轮毂和测试边界连续，3源清楚，未出现裁切或溢出。  通过；没有本轮尚未修复的已知明显布局问题。

### 27. /products/part-examples/custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier/

**模块职责（5）：** 1. Aluminum intercooler prototypes（What is this form and what material/final condition must be specified?） → 2. Define the components you need（Which geometry, supply scope and checks control acceptance?） → 3. Machining and use（How do related setups and intended uses affect this drawing?） → 4. Related machining and part forms（Which visible differences should guide the next drawing review?） → 5. Review your drawing（What must be sent and what are the order conditions?）。

**原问题：** 安装与测试信息重复分散。；独立参考照片单独占一整节，照片旁大量空白，未支持相邻技术阅读。；材料确认和通用推荐文案重复。

**实施：** 组件要求前置并与原有参考图同组。；保留全部测试、供货和车辆适配限制，合并检查碎句。；材料说明合并，推荐改为具名入口。

**图片计划与实际：** 4个真实独立源均保留。重复冷却特征照片移到组件要求旁，明确不是同一订单或性能证明。 最终4个有效独立源、4/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p12-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p12-1200.webp>) · [intercooler-batch-detail-1200.webp](<D:/lzz/lzz/_react/public/media/source-details/intercooler-batch-detail-1200.webp>) · [two-stage-first-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/two-stage-first-1600.webp>) · [p17-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p17-1200.webp>)。

**两端复核：** 首轮截图发现配图旁技术列过碎，已改宽阅读单列并二次截图。4源保留；5个核心任务，供货、焊后接口和独立测试没有删除。  通过；没有本轮尚未修复的已知明显布局问题。

### 28. /products/part-examples/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/

**模块职责（5）：** 1. Billet aluminum engine covers（What is this form and what material/final condition must be specified?） → 2. Features to define（Which geometry, supply scope and checks control acceptance?） → 3. Machining and use（How do related setups and intended uses affect this drawing?） → 4. Related machining and part forms（Which visible differences should guide the next drawing review?） → 5. Review your drawing（What must be sent and what are the order conditions?）。

**原问题：** 盖件下侧间隙与密封面是采购重点，却落在一般加工说明之后。；特征后检查片段重复，公差确认问答分散。；材料确认与通用工艺推荐重复。

**实施：** 装配要求与公差确认前置并相邻。；合并重复检查，保留全部间隙、遮蔽和最终状态条件。；材料说明合并，通用CTA具名。

**图片计划与实际：** 保留手持真实原图、独立加工照片和相关外观件3来源；不重画看不见的下侧。 最终3个有效独立源、3/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p13-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p13-1200.webp>) · [milling-enclosure-operation-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/milling-enclosure-operation-1600.webp>) · [p09-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p09-1200.webp>)。

**两端复核：** 两端整页与公差问答局部已复核；原图不改，盖下侧未知、材料和装配条件保留，特征顺序清晰。  通过；没有本轮尚未修复的已知明显布局问题。

### 29. /products/part-examples/custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier/

**模块职责（5）：** 1. Intake-system assembly reference（What is this form and what material/final condition must be specified?） → 2. Define the components you need（Which geometry, supply scope and checks control acceptance?） → 3. Machining and use（How do related setups and intended uses affect this drawing?） → 4. Related machining and part forms（Which visible differences should guide the next drawing review?） → 5. Review your drawing（What must be sent and what are the order conditions?）。

**原问题：** 装配图身份已经明确，但需要报价的接口要求仍被通用工序隔开。；流道、法兰和安装检查拆成重复片段。；材料与相关推荐重复说明。

**实施：** 组件与接口前置。；合并检查句，保留STEP/IGES、端口间距及独立测试。；材料说明及工艺入口精简。

**图片计划与实际：** 保留3来源，装配图只作安装环境；不用新图暗示供应整机。 最终3个有效独立源、3/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p14-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p14-framed-1200.webp>) · [two-stage-first-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/two-stage-first-1600.webp>) · [p16-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p16-framed-1200.webp>)。

**两端复核：** 两端整页及接口局部已检查，装配身份与不供整机边界保留，原3源不裁坏，关键格式及测试条件完整。  通过；没有本轮尚未修复的已知明显布局问题。

### 30. /products/part-examples/custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier/

**模块职责（5）：** 1. Throttle-body CAD reference（What is this form and what material/final condition must be specified?） → 2. Define the components you need（Which geometry, supply scope and checks control acceptance?） → 3. Machining and use（How do related setups and intended uses affect this drawing?） → 4. Related machining and part forms（Which visible differences should guide the next drawing review?） → 5. Review your drawing（What must be sent and what are the order conditions?）。

**原问题：** 轴孔片配合与实际供货范围后置。；长技术段后重复检查片段，读取停顿多。；材料确认和相关推荐通用介绍重复。

**实施：** 技术要求前置。；合并特征与检查，保持装配条件、适用性和电子控制限制。；合并材料确认并简化具名工艺入口。

**图片计划与实际：** 3来源保留；CAD保留彩色标识，真实加工图明确独立，不生成实拍替代。 最终3个有效独立源、3/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p15-framed-480.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p15-framed-480.webp>) · [two-stage-first-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/two-stage-first-1600.webp>) · [p17-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p17-1200.webp>)。

**两端复核：** 两端整页及配合局部复核；CAD身份、执行和泄漏测试责任仍完整，无溢出或主图裁坏。  通过；没有本轮尚未修复的已知明显布局问题。

### 31. /products/part-examples/custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier/

**模块职责（5）：** 1. Injector & fuel-rail intake manifolds（What is this form and what material/final condition must be specified?） → 2. Define the components you need（Which geometry, supply scope and checks control acceptance?） → 3. Machining and use（How do related setups and intended uses affect this drawing?） → 4. Related machining and part forms（Which visible differences should guide the next drawing review?） → 5. Review your drawing（What must be sent and what are the order conditions?）。

**原问题：** 同一独立CAD版本限制在主图下重复两遍。；喷油轴线、燃油轨与安装要求后置。；材料确认和检查片段、通用CTA重复。

**实施：** 独立CAD身份保留一份完整声明及原锚点。；特征和测试问答前置，保留STEP/IGES及密封限制。；合并检查碎句和材料确认，具名工艺入口。

**图片计划与实际：** 保留3个来源；不将独立CAD视作同一受控版本，也不增加相似裁图。 最终3个有效独立源、3/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p16-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p16-framed-1200.webp>) · [two-stage-first-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/two-stage-first-1600.webp>) · [p14-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p14-framed-1200.webp>)。

**两端复核：** 两端整页和局部复核，独立CAD版本限制保留且去重，配合/测试阅读相邻，3源未改结构。  通过；没有本轮尚未修复的已知明显布局问题。

### 32. /products/part-examples/custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier/

**模块职责（6）：** 1. Billet aluminum intake plenums（What is this form and what material/final condition must be specified?） → 2. Cavity, ports & sealing interfaces（Which geometry, supply scope and checks control acceptance?） → 3. Machining and use（How do related setups and intended uses affect this drawing?） → 4. Ports & internal surfaces（What additional geometry is independently visible?） → 5. Related machining and part forms（Which visible differences should guide the next drawing review?） → 6. Review your drawing（What must be sent and what are the order conditions?）。

**原问题：** 容积、接口和密封要求被一般加工后置。；两幅细节图标题泛泛，独立来源说明重复。；材料确认与检查碎句和工艺CTA重复。

**实施：** 特征与测试问答前置，标题改为具体接口任务。；图片组命名并统一一条独立来源说明。；合并材料与技术检查重复，工艺入口具名。

**图片计划与实际：** 保留5个来源，端口和内部图仍明确独立，不能拼成受控剖面或检测序列。 最终5个有效独立源、4/6图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p17-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p17-1200.webp>) · [two-stage-first-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/two-stage-first-1600.webp>) · [plenum-port-detail-1200.webp](<D:/lzz/lzz/_react/public/media/source-details/plenum-port-detail-1200.webp>) · [plenum-internal-detail-1200.webp](<D:/lzz/lzz/_react/public/media/source-details/plenum-internal-detail-1200.webp>) · [p14-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p14-framed-1200.webp>)。

**两端复核：** 桌面手机整页及工序局部已复核，5源均在正文可见；独立参考声明保留一份覆盖图片组，未改产品细节。  通过；没有本轮尚未修复的已知明显布局问题。

### 33. /products/part-examples/custom-cnc-machined-castings-transmission-housings-pump-bodies/

**模块职责（5）：** 1. Transmission housings & pump bodies（What is this form and what material/final condition must be specified?） → 2. Define the blank and the finished part（Which geometry, supply scope and checks control acceptance?） → 3. Machining and use（How do related setups and intended uses affect this drawing?） → 4. Related machining and part forms（Which visible differences should guide the next drawing review?） → 5. Review your drawing（What must be sent and what are the order conditions?）。

**原问题：** 两段毛坯/成品定义高度重复。；关键毛坯责任和内部测量条件后置。；检查碎句、材料确认及重复铸件工艺链接分散。

**实施：** 合并毛坯/成品开场但保留所有供货、验收、变差、铸态和缺陷责任。；关键技术前置，合并检查句。；重复工艺链接集中。

**图片计划与实际：** 保留3个真实来源，不能由表面照片推断铸造缺陷、合金或内部结构。 最终3个有效独立源、3/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p18-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p18-framed-1200.webp>) · [two-stage-first-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/two-stage-first-1600.webp>) · [p22-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p22-framed-1200.webp>)。

**两端复核：** 两端整页和技术局部已复核；重复开场合并后毛坯责任更集中，3源保留，所有唯一内链和SEO未改变。  通过；没有本轮尚未修复的已知明显布局问题。

### 34. /products/part-examples/custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier/

**模块职责（5）：** 1. Flanged turned component assemblies（What is this form and what material/final condition must be specified?） → 2. Define the components you need（Which geometry, supply scope and checks control acceptance?） → 3. Machining and use（How do related setups and intended uses affect this drawing?） → 4. Related machining and part forms（Which visible differences should guide the next drawing review?） → 5. Review your drawing（What must be sent and what are the order conditions?）。

**原问题：** 法兰轴线和ON/OFF标记要求后置。；同一检查内容拆成重复片段。；材料和工艺推荐解释重复。

**实施：** 接口和标记要求前置。；合并自然段，保留隐藏特征、量规及独立功能验收。；合并材料说明，相关推荐具名。

**图片计划与实际：** 保留3个真实来源，ON/OFF、手柄及分离螺钉全部保持，不重画机构。 最终3个有效独立源、3/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p19-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p19-framed-1200.webp>) · [turn-mill-operation-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/turn-mill-operation-1600.webp>) · [p32-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p32-framed-1200.webp>)。

**两端复核：** 两端整页及组件要求局部已复核，ON/OFF和独立螺钉保持；3源图片正常，所有唯一内链及元数据不变。  通过；没有本轮尚未修复的已知明显布局问题。

### 35. /products/part-examples/custom-oem-cnc-machined-non-metallic-components-insulating-parts/

**模块职责（5）：** 1. Non-metallic & insulating components（What is this form and what material/final condition must be specified?） → 2. Material conditions & fitted features（Which geometry, supply scope and checks control acceptance?） → 3. Machining and use（How do related setups and intended uses affect this drawing?） → 4. Related machining and part forms（Which visible differences should guide the next drawing review?） → 5. Review your drawing（What must be sent and what are the order conditions?）。

**原问题：** 材料/测量状态、配合问答和环境要求分散。；孔槽和装配负载检查拆成碎句。；材料确认与通用推荐重复。

**实施：** 材料环境与配合要求前置成具体章节。；合并碎句，保留温湿度、填料、负载、测量及合规记录。；具名塑料工艺入口替换重复说明。

**图片计划与实际：** 保留3张真实匹配来源，颜色不证明牌号或合规性，不生成绝缘或检测证明。 最终3个有效独立源、3/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p20-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p20-1200.webp>) · [plastic-ptfe-shafts-1200.webp](<D:/lzz/lzz/_react/public/media/source-details/plastic-ptfe-shafts-1200.webp>) · [p29-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p29-framed-1200.webp>)。

**两端复核：** 两端整页及材料问答局部已复核，主体完整，3源保留；测量状态、测试与合规边界仍可读。  通过；没有本轮尚未修复的已知明显布局问题。

### 36. /products/part-examples/custom-oem-cnc-machined-plastic-parts-manufacturer/

**模块职责（5）：** 1. Custom machined plastic parts（What is this form and what material/final condition must be specified?） → 2. Machining and use（How do related setups and intended uses affect this drawing?） → 3. Choose the form, then define the interfaces（Which geometry, supply scope and checks control acceptance?） → 4. Related machining and part forms（Which visible differences should guide the next drawing review?） → 5. Review your drawing（What must be sent and what are the order conditions?）。

**原问题：** 组合图需选择单件的边界离主图过远。；牌号和状态、配合与检查片段重复。；相关推荐泛泛工艺说明和CTA重复。

**实施：** 供货说明靠近组合图。；材料选项全部保留，检查条件合并成自然句。；工艺入口具名并去重复介绍。

**图片计划与实际：** 保留3个真实独立来源。原有拼图具有形态价值，不按颜色认定材料，不拆成重复裁图。 最终3个有效独立源、3/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p21-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p21-1200.webp>) · [plastic-ptfe-shafts-1200.webp](<D:/lzz/lzz/_react/public/media/source-details/plastic-ptfe-shafts-1200.webp>) · [p20-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p20-1200.webp>)。

**两端复核：** 桌面手机完整截图和测量局部已复核；原拼图、工序、相关件3源保持，单件供货和材料条件就近可读。  通过；没有本轮尚未修复的已知明显布局问题。

### 37. /products/part-examples/oem-precision-cnc-machined-casting-housing-structural-enclosures/

**模块职责（5）：** 1. Cast housings & structural enclosures（What is this form and what material/final condition must be specified?） → 2. Define the blank and the finished part（Which geometry, supply scope and checks control acceptance?） → 3. Machining and use（How do related setups and intended uses affect this drawing?） → 4. Related machining and part forms（Which visible differences should guide the next drawing review?） → 5. Review your drawing（What must be sent and what are the order conditions?）。

**原问题：** 通用毛坯开场与本件夹持说明连续堆叠。；深腔支撑和轴承孔关系后置。；材料状态、检查片段与工艺推荐重复。

**实施：** 毛坯开场合并，特有夹持说明迁入对应特征。；技术要求前置，保留铸态和CMM条件。；合并材料确认和推荐重复。

**图片计划与实际：** 保留开口铸壳、独立铣削和相关泵体3个原图，不改筋位和孔数。 最终3个有效独立源、3/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p22-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p22-framed-1200.webp>) · [two-stage-first-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/two-stage-first-1600.webp>) · [p18-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p18-framed-1200.webp>)。

**两端复核：** 两端整页及工序局部已复核；毛坯定义与深腔支撑条件连续，3真实来源及全部唯一内链保留。  通过；没有本轮尚未修复的已知明显布局问题。

### 38. /products/part-examples/oem-precision-cnc-machined-casting-housings/

**模块职责（5）：** 1. CNC-machined casting housings（What is this form and what material/final condition must be specified?） → 2. Sample definition & casting interfaces（Which geometry, supply scope and checks control acceptance?） → 3. Machining and use（How do related setups and intended uses affect this drawing?） → 4. Related machining and part forms（Which visible differences should guide the next drawing review?） → 5. Review your drawing（What must be sent and what are the order conditions?）。

**原问题：** 样件重建与毛坯信息连成较长开场，关键行动后置。；材料状态重复，内部花键条件易被一般说明淹没。；检查短句与技术推荐分散。

**实施：** 前置样件与接口要求，重建说明迁至Sample组。；合并毛坯开场和重复材料状态。；保留完整检查阶段，推荐集中具名。

**图片计划与实际：** 保留3个已有真实来源，不生成内部花键。花键只在受控模型明确要求时讨论。 最终3个有效独立源、3/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p23-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p23-framed-1200.webp>) · [two-stage-first-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/two-stage-first-1600.webp>) · [p18-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p18-framed-1200.webp>)。

**两端复核：** 两端完整截图和内部接口局部检查完成；样件资料更早出现，花键条件明确，3源保留且无新溢出。  通过；没有本轮尚未修复的已知明显布局问题。

### 39. /products/part-examples/precision-cnc-machined-castings-custom-oem-housings/

**模块职责（5）：** 1. Machined castings & OEM housings（What is this form and what material/final condition must be specified?） → 2. Define the blank and the finished part（Which geometry, supply scope and checks control acceptance?） → 3. Machining and use（How do related setups and intended uses affect this drawing?） → 4. Related machining and part forms（Which visible differences should guide the next drawing review?） → 5. Review your drawing（What must be sent and what are the order conditions?）。

**原问题：** 主图被固定高度压小，不规则壳体的孔/法兰不够突出。；毛坯开场和接口说明重复，关键验收后置。；材料状态、检查碎句与推荐解释重复。

**实施：** 本页主图解除固定460px高，按原比例显示。；毛坯定义合并，密封/安装要求前置。；合并碎句并集中技术入口。

**图片计划与实际：** 保留3源。已实际读取P24源图，结构清楚，问题为容器固定高度；只调整主图显示尺寸，不生成重画。 最终3个有效独立源、3/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p24-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p24-1200.webp>) · [two-stage-first-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/two-stage-first-1600.webp>) · [p22-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p22-framed-1200.webp>)。

**两端复核：** 初次主图尺寸规则被旧样式覆盖，已提升精确路径规则并二次截图确认桌面放大；手机主体完整。3源保留，未生成产品细节。  通过；没有本轮尚未修复的已知明显布局问题。

### 40. /products/part-examples/precision-cnc-machined-castings-manufacturer/

**模块职责（5）：** 1. Precision-machined castings（What is this form and what material/final condition must be specified?） → 2. Machining and use（How do related setups and intended uses affect this drawing?） → 3. Blank definition & internal interfaces（Which geometry, supply scope and checks control acceptance?） → 4. Related machining and part forms（Which visible differences should guide the next drawing review?） → 5. Review your drawing（What must be sent and what are the order conditions?）。

**原问题：** 毛坯和内部特征定义开场包含重复段落。；内接口测量说明拆散为短片段。；材料确认和通用技术入口重复。

**实施：** 保留先说明重建服务的顺序，将具体内部访问要求迁入特征组。；毛坯引言合并，检查句完整化。；合并材料说明，集中技术入口。

**图片计划与实际：** 保留清楚的开放铸壳、独立车间和相关泵体3来源；不生成内部隐藏接口。 最终3个有效独立源、3/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p25-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p25-framed-1200.webp>) · [two-stage-first-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/two-stage-first-1600.webp>) · [p18-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p18-framed-1200.webp>)。

**两端复核：** 桌面手机完整截图及内部接口局部复核；保留先解释重建服务的顺序，技术说明更集中，3源、内链及SEO保持。  通过；没有本轮尚未修复的已知明显布局问题。

### 41. /products/part-examples/precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances/

**模块职责（5）：** 1. Repeated-hole plastic strip references（What is this form and what material/final condition must be specified?） → 2. Bore relationships & working surfaces（Which geometry, supply scope and checks control acceptance?） → 3. Machining and use（How do related setups and intended uses affect this drawing?） → 4. Related machining and part forms（Which visible differences should guide the next drawing review?） → 5. Review your drawing（What must be sent and what are the order conditions?）。

**原问题：** 重复孔的基准/节距与材料状态后置。；壁厚与半径条件分散且检查句重复。；材料未定与工艺推荐重复。

**实施：** 孔关系和发布条件前置，章节具体命名。；合并检查碎句但保留稳定性、条件化及允许改形要求。；材料确认及推荐说明去重。

**图片计划与实际：** 3个真实来源保留，绿色不代表确定牌号；无新图或重复裁图。 最终3个有效独立源、3/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p26-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p26-1200.webp>) · [plastic-ptfe-shafts-1200.webp](<D:/lzz/lzz/_react/public/media/source-details/plastic-ptfe-shafts-1200.webp>) · [p29-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p29-framed-1200.webp>)。

**两端复核：** 两端整页与设计限制局部已复核，孔关系更早出现，3源与全部材料状态、批次发布及内链保留。  通过；没有本轮尚未修复的已知明显布局问题。

### 42. /products/part-examples/precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier/

**模块职责（5）：** 1. Turned brass & copper components（What is this form and what material/final condition must be specified?） → 2. Choose the alloy for its function（Which geometry, supply scope and checks control acceptance?） → 3. Machining and use（How do related setups and intended uses affect this drawing?） → 4. Related machining and part forms（Which visible differences should guide the next drawing review?） → 5. Review your drawing（What must be sent and what are the order conditions?）。

**原问题：** 铜与黄铜的功能差异和替代问答分散且后置。；检查片段重复，较长技术段节奏被打断。；材料状态与通用工艺推荐重复。

**实施：** 功能选材和替代问答前置相邻。；合并检查片段，保留未提供测量性能的限制。；合并材料确认并具名技术入口。

**图片计划与实际：** 保留3个真实来源；批图不证明性能或订单，不用颜色区分具体合金。 最终3个有效独立源、3/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p27-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p27-1200.webp>) · [turn-mill-operation-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/turn-mill-operation-1600.webp>) · [p07-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p07-1200.webp>)。

**两端复核：** 两端整页及替代条件局部复核，功能选材、镀后尺寸和独立测试相邻；3真实来源及C36000等材料条件保留。  通过；没有本轮尚未修复的已知明显布局问题。

### 43. /products/part-examples/precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier/

**模块职责（5）：** 1. Pilot-batch housing references（What is this form and what material/final condition must be specified?） → 2. Define the part and each release（Which geometry, supply scope and checks control acceptance?） → 3. Machining and use（How do related setups and intended uses affect this drawing?） → 4. Related machining and part forms（Which visible differences should guide the next drawing review?） → 5. Review your drawing（What must be sent and what are the order conditions?）。

**原问题：** 逐件发布要求在加工说明后，客户先看到批图却不知如何提供订单。；同一修订/数量信息在引言和特征重复。；材料确认与通用推荐重复。

**实施：** 逐件发布前置。；通用引言信息迁入对应字段，保留全部追溯、异常及变更责任。；合并材料确认，推荐入口具名。

**图片计划与实际：** 保留原批图、独立金属参考图和相近试产图3源，均不认定特定订单数量。 最终3个有效独立源、3/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p28-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p28-1200.webp>) · [metal-aluminum-close-1200.webp](<D:/lzz/lzz/_react/public/media/source-details/metal-aluminum-close-1200.webp>) · [p34-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p34-1200.webp>)。

**两端复核：** 两端整页及发布条件局部复核；原有引言的实质字段均迁入对应技术组，3源保留且未将批图写成订单证据。  通过；没有本轮尚未修复的已知明显布局问题。

### 44. /products/part-examples/precision-machining-for-functional-plastic-blocks-structural-components/

**模块职责（5）：** 1. Circular plastic component reference（What is this form and what material/final condition must be specified?） → 2. Bore pattern, working edges & measurement（Which geometry, supply scope and checks control acceptance?） → 3. Machining and use（How do related setups and intended uses affect this drawing?） → 4. Related machining and part forms（Which visible differences should guide the next drawing review?） → 5. Review your drawing（What must be sent and what are the order conditions?）。

**原问题：** 中心孔、四孔与曲边的关键关系后置。；检查片段重复，平行度等条件容易被淹没。；材料确认与通用推荐重复。

**实施：** 几何要求前置并具体命名。；合并检查句，保留四孔、允许边缘处理和有条件平面度/平行度。；材料及推荐去重。

**图片计划与实际：** 保留已有真实主体加AI背景的正式主图及2个独立真实参考，保留图注，本轮不再生成或改结构。 最终3个有效独立源、3/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p29-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p29-framed-1200.webp>) · [plastic-ptfe-shafts-1200.webp](<D:/lzz/lzz/_react/public/media/source-details/plastic-ptfe-shafts-1200.webp>) · [p26-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p26-1200.webp>)。

**两端复核：** 两端整页和孔列/厚度局部复核；原主体与既有AI背景标识保留，3源清楚，四孔及有条件公差不丢失。  通过；没有本轮尚未修复的已知明显布局问题。

### 45. /products/part-examples/precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures/

**模块职责（5）：** 1. Open aluminum enclosure references（What is this form and what material/final condition must be specified?） → 2. Define the part and each release（Which geometry, supply scope and checks control acceptance?） → 3. Machining and use（How do related setups and intended uses affect this drawing?） → 4. Related machining and part forms（Which visible differences should guide the next drawing review?） → 5. Review your drawing（What must be sent and what are the order conditions?）。

**原问题：** 壳体装配与薄壁条件后置，首轮阅读先落到一般工序。；各特征后重复检查片段。；材料状态及通用推荐重复。

**实施：** 壳体技术前置。；合并检查句，保持复合角度仅在模型要求时、平面度、孔位及批记录。；材料确认及工艺推荐去重。

**图片计划与实际：** 保留原开放壳体批图、独立腔体工序和相关密封壳3源，参考排布不证明订单。 最终3个有效独立源、3/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p30-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p30-1200.webp>) · [milling-enclosure-operation-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/milling-enclosure-operation-1600.webp>) · [p33-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p33-1200.webp>)。

**两端复核：** 两端完整截图和薄壁条件局部复核；3源完整，角度特征条件和最终尺寸、批记录要求全部保留。  通过；没有本轮尚未修复的已知明显布局问题。

### 46. /products/part-examples/precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier/

**模块职责（5）：** 1. Rotary component & flange reference（What is this form and what material/final condition must be specified?） → 2. Define the components you need（Which geometry, supply scope and checks control acceptance?） → 3. Machining and use（How do related setups and intended uses affect this drawing?） → 4. Related machining and part forms（Which visible differences should guide the next drawing review?） → 5. Review your drawing（What must be sent and what are the order conditions?）。

**原问题：** 独立法兰、轴线和实际装配范围后置。；标记、最终状态检查拆成重复短句。；材料确认与工艺推荐重复。

**实施：** 装配特征前置。；合并检查短句但保留全部独立功能测试及最终状态。；材料确认与推荐去重。

**图片计划与实际：** 保留3源，保持ON/OFF和独立法兰，不把照片当作316L或循环性能证明。 最终3个有效独立源、3/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p31-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p31-1200.webp>) · [turn-mill-operation-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/turn-mill-operation-1600.webp>) · [p19-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p19-framed-1200.webp>)。

**两端复核：** 两端整页与最终状态局部检查完成；3源、ON/OFF与独立法兰保留，不以316L标题认定全部部件，测试边界完整。  通过；没有本轮尚未修复的已知明显布局问题。

### 47. /products/part-examples/precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier/

**模块职责（5）：** 1. Indexing plungers & locking pins（What is this form and what material/final condition must be specified?） → 2. Engagement, mounting & assembly scope（Which geometry, supply scope and checks control acceptance?） → 3. Machining and use（How do related setups and intended uses affect this drawing?） → 4. Related machining and part forms（Which visible differences should guide the next drawing review?） → 5. Review your drawing（What must be sent and what are the order conditions?）。

**原问题：** 内部弹簧与行程未知的边界离主图过远。；安装与啮合要求和整套供货问答分散。；重复检查碎句和通用材料/推荐说明。

**实施：** 形态边界紧邻原图，特征和整套供货问答前置。；合并检查句，保留行程、力值与循环测试独立条件。；合并材料确认和推荐重复。

**图片计划与实际：** 保留3来源，不重画内部弹簧或未见结构，原件螺纹及端部完整展示。 最终3个有效独立源、3/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p32-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p32-framed-1200.webp>) · [turn-mill-operation-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/turn-mill-operation-1600.webp>) · [p19-framed-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p19-framed-1200.webp>)。

**两端复核：** 两端完整截图及组件问答局部已复核，照片边界紧邻原图，3源和安装/啮合/独立测试要求保留。  通过；没有本轮尚未修复的已知明显布局问题。

### 48. /products/part-examples/small-batch-cnc-machining-manufacturer-complex-aluminum-housings/

**模块职责（5）：** 1. Lid & gasket aluminum housings（What is this form and what material/final condition must be specified?） → 2. Define the part and each release（Which geometry, supply scope and checks control acceptance?） → 3. Machining and use（How do related setups and intended uses affect this drawing?） → 4. Related machining and part forms（Which visible differences should guide the next drawing review?） → 5. Review your drawing（What must be sent and what are the order conditions?）。

**原问题：** 盖板密封和环境测试条件后置。；原批图旁再分两列技术文字，内容偏碎。；材料确认、检查片段和正文应用链接打断阅读。

**实施：** 配合要求前置，照片旁改为宽技术单列。；保留无IP等级证明及独立环境测试条件。；合并材料与检查重复，将应用入口集中。

**图片计划与实际：** 保留主图真实裁图、完整同源批图、独立工序、相关壳体；有效来源按去重为3，不将局部另计一张。 最终3个有效独立源、4/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p33.webp](<D:/lzz/lzz/_react/public/media/products-real-details-20261015/p33.webp>) · [p33-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p33-1200.webp>) · [milling-enclosure-operation-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/milling-enclosure-operation-1600.webp>) · [p30-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p30-1200.webp>)。

**两端复核：** 两端完整截图和技术局部复核；批图旁宽阅读列已生效，3有效来源保留，IP和环境测试限制、应用内链没有删除。  通过；没有本轮尚未修复的已知明显布局问题。

### 49. /products/part-examples/small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv/

**模块职责（5）：** 1. Pilot-run component references（What is this form and what material/final condition must be specified?） → 2. Define the part and each release（Which geometry, supply scope and checks control acceptance?） → 3. Machining and use（How do related setups and intended uses affect this drawing?） → 4. Related machining and part forms（Which visible differences should guide the next drawing review?） → 5. Review your drawing（What must be sent and what are the order conditions?）。

**原问题：** 批图后的关键任务是定义每料号和发布，却先展示一般加工说明。；修订和检查信息在引言及小段重复。；材料确认和通用推荐重复。

**实施：** 每料号和发布前置。；长引言的实质条件迁入对应技术组，保留全部数量、时间、追溯与异常条件。；材料说明合并、技术推荐具名。

**图片计划与实际：** 保留真实车削件、独立金属参考、相关壳体3来源，不认定为混材质供货套装或特定订单。 最终3个有效独立源、3/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p34-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p34-1200.webp>) · [metal-aluminum-close-1200.webp](<D:/lzz/lzz/_react/public/media/source-details/metal-aluminum-close-1200.webp>) · [p28-1200.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p28-1200.webp>)。

**两端复核：** 两端完整截图及发布局部已复核；每料号材料和批记录更早出现，3源及全部发布、异常、预测条件保留。  通过；没有本轮尚未修复的已知明显布局问题。

### 50. /products/machining-studies/

**模块职责（5）：** 1. Machining setups and part references（What kind of evidence is available?） → 2. One part, two holding positions（How does repositioning change access?） → 3. Five-axis machining for multiple faces（Which setup is relevant to my shape?） → 4. Independent material collections（Which source collections can I compare?） → 5. Review a similar component（What should I send?）。

**原问题：** 每条研究的关注点被拆成两段，第二段还是小写片段句。；材料集合重复View photographs & clips通用链接。；重点双装夹研究的通用CTA与标题分开，主次不够集中。

**实施：** 每条任务与检查目标合为自然段。；材料名称直接成为唯一链接，移除重复泛CTA。；重点研究标题直接链接到详情。

**图片计划与实际：** 保留9个独立真实来源；不润色本来清晰的车间记录，两次装夹图保留方向和夹具。 最终9个有效独立源、3/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[two-stage-first-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/two-stage-first-1600.webp>) · [two-stage-second-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/two-stage-second-1600.webp>) · [five-axis-operation-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/five-axis-operation-1600.webp>) · [turn-mill-operation-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/turn-mill-operation-1600.webp>) · [milling-enclosure-operation-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/milling-enclosure-operation-1600.webp>) · [multi-feature-milling-operation-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/multi-feature-milling-operation-1600.webp>) · [display-housing-panel-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/display-housing-panel-1600.webp>) · [plastic-ptfe-shafts-1200.webp](<D:/lzz/lzz/_react/public/media/source-details/plastic-ptfe-shafts-1200.webp>) · [metal-aluminum-close-1200.webp](<D:/lzz/lzz/_react/public/media/source-details/metal-aluminum-close-1200.webp>)。

**两端复核：** 两端完整截图及卡片局部复核；6研究和2集合的9原图保留，通用链接改具名，全部唯一URL和ItemList不变。  通过；没有本轮尚未修复的已知明显布局问题。

### 51. /products/machining-studies/two-stage-cnc-milling/

**模块职责（4）：** 1. Two CNC milling setups: keeping features aligned（What original part and holding setup are visible?） → 2. Keep the feature relationships through repositioning（How is the part held and reached?） → 3. From the visible form to your acceptance plan（What must be measured and what does the source prove?） → 4. Review a similar component（What is needed for a comparable order?）。

**原问题：** 工件说明和装夹说明相邻重复解释两次方向。；每个步骤分成意思接近的两段，手机阅读拖长。；验收区由名词片段叠放，不够直接。

**实施：** 两段工件与装夹开场合并。；每步骤合成一段完整说明，保留全部保护面、可达性及最终关系限制。；验收要求改为完整自然句。

**图片计划与实际：** 保留5个显示文件，按源去重为两张装夹图和CMM共3源。局部不额外计数，不生成工序证据。 最终3个有效独立源、3/4图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[two-stage-first-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/two-stage-first-1600.webp>) · [two-stage-second-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/two-stage-second-1600.webp>) · [two-stage-first.webp](<D:/lzz/lzz/_react/public/media/products-real-details-20261015/two-stage-first.webp>) · [two-stage-second.webp](<D:/lzz/lzz/_react/public/media/products-real-details-20261015/two-stage-second.webp>) · [cmm-detail-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/cmm-detail-1600.webp>)。

**两端复核：** 两端完整截图和步骤局部复核；3独立源与真实局部保留，阶段验收自然可读，定位及最终关系限制未删。  通过；没有本轮尚未修复的已知明显布局问题。

### 52. /products/machining-studies/five-axis-machining-multi-face-parts/

**模块职责（4）：** 1. Five-axis CNC machining for multi-face parts（What original part and holding setup are visible?） → 2. Read the part across its machining faces（How is the part held and reached?） → 3. From the visible form to your acceptance plan（What must be measured and what does the source prove?） → 4. Review a similar component（What is needed for a comparable order?）。

**原问题：** 首屏两段重复描述旋转装夹。；步骤两段式重复，局部图旁形成较大未用空间。；验收区名词片段不够连贯。

**实施：** 首屏与工件说明分别合并重复文字。；步骤合并，局部图与文字列改为5:7。；验收改完整句，保留索引/同时运动的适用边界。

**图片计划与实际：** 保留4显示文件、3个独立来源；不生成工具路径或检查证据。 最终3个有效独立源、3/4图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[five-axis-operation-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/five-axis-operation-1600.webp>) · [five-axis-operation.webp](<D:/lzz/lzz/_react/public/media/products-real-details-20261015/five-axis-operation.webp>) · [five-axis-parts-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/five-axis-parts-1600.webp>) · [cmm-detail-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/cmm-detail-1600.webp>)。

**两端复核：** 两端完整截图与步骤局部复核；5:7比例下局部与文字更平衡，3独立源保留，运动路线和独立证据边界不变。  通过；没有本轮尚未修复的已知明显布局问题。

### 53. /products/machining-studies/turning-then-milling-cylindrical-parts/

**模块职责（4）：** 1. CNC turning followed by milling for cylindrical parts（What original part and holding setup are visible?） → 2. Connect the milled features to the turned geometry（How is the part held and reached?） → 3. From the visible form to your acceptance plan（What must be measured and what does the source prove?） → 4. Does this study show a live-tooling operation?（What is needed for a comparable order?）。

**原问题：** 首屏与工件开场重复描述先车后铣。；步骤分两段且有相近解释，手机阅读拖长。；验收区名词片段叠放不够直接。

**实施：** 首屏、工件说明去重复，保留完整形态身份。；步骤合并，局部图列增加到5:7。；验收改完整句，保留活刀问题与独立测试限制。

**图片计划与实际：** 保留4显示文件、3独立来源，不生成工序或检验证据。 最终3个有效独立源、3/4图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[turn-mill-operation-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/turn-mill-operation-1600.webp>) · [turn-mill-operation.webp](<D:/lzz/lzz/_react/public/media/products-real-details-20261015/turn-mill-operation.webp>) · [turn-mill-parts-1200.webp](<D:/lzz/lzz/_react/public/media/evidence/turn-mill-parts-1200.webp>) · [cmm-detail-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/cmm-detail-1600.webp>)。

**两端复核：** 两端完整截图及验收局部复核；局部和步骤更平衡，3独立源保留，活刀选择和径/轴/角向条件完整。  通过；没有本轮尚未修复的已知明显布局问题。

### 54. /products/machining-studies/milling-a-pocketed-enclosure-form/

**模块职责（4）：** 1. CNC milling a pocketed enclosure: walls, bores and datums（What original part and holding setup are visible?） → 2. Define the pocket together with its interfaces（How is the part held and reached?） → 3. From the visible form to your acceptance plan（What must be measured and what does the source prove?） → 4. Review a similar component（What is needed for a comparable order?）。

**原问题：** 首屏和工件开场重复描述腔体形态。；步骤将工具访问与壁厚解释拆成相近两段。；验收的深度/壁/表面条件被拆成名词片段。

**实施：** 开场去重复，技术段合成完整短段。；局部图文比例改5:7，保留模型和壁厚依赖。；验收完整句保留余量、平面度、密封与外观条件。

**图片计划与实际：** 保留4显示文件、3个独立来源，真实局部不额外计数；无生成或改造证据。 最终3个有效独立源、3/4图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[milling-enclosure-operation-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/milling-enclosure-operation-1600.webp>) · [milling-enclosure-operation.webp](<D:/lzz/lzz/_react/public/media/products-real-details-20261015/milling-enclosure-operation.webp>) · [milling-enclosure-parts-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/milling-enclosure-parts-1600.webp>) · [cmm-detail-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/cmm-detail-1600.webp>)。

**两端复核：** 两端完整截图及壁厚/验收局部复核；图文比例生效，3独立源与余量、壁厚、表面和独立密封测试条件保留。  通过；没有本轮尚未修复的已知明显布局问题。

### 55. /products/machining-studies/milling-prismatic-components/

**模块职责（4）：** 1. CNC milling prismatic parts: faces, bores and pockets（What original part and holding setup are visible?） → 2. Connect the openings to the mounting faces（How is the part held and reached?） → 3. From the visible form to your acceptance plan（What must be measured and what does the source prove?） → 4. Review a similar component（What is needed for a comparable order?）。

**原问题：** 首屏两段重复描述块状件。；步骤把尺寸和解释分两段，阅读停顿多。；验收片段句缺少直接行动。

**实施：** 形态和工件说明分别合并。；三个步骤改为连续短段，保留报价前模型、批次与后处理条件。；验收改为完整操作句。

**图片计划与实际：** 保留4文件、3独立真实来源；不改变车间或批图。原局部4:8布局能保留机器上下文，继续使用。 最终3个有效独立源、3/4图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[multi-feature-milling-operation-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/multi-feature-milling-operation-1600.webp>) · [multi-feature-milling-operation.webp](<D:/lzz/lzz/_react/public/media/products-real-details-20261015/multi-feature-milling-operation.webp>) · [multi-feature-milling-parts-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/multi-feature-milling-parts-1600.webp>) · [cmm-detail-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/cmm-detail-1600.webp>)。

**两端复核：** 两端整页及检验局部复核，保留棱柱件原图比例与工序上下文，3独立来源和跨工序/批次限制保留。  通过；没有本轮尚未修复的已知明显布局问题。

### 56. /products/machining-studies/29-inch-display-housing-cnc-machining/

**模块职责（4）：** 1. CNC machining a 29-inch display housing（What original part and holding setup are visible?） → 2. Plan the panel around its assembly interfaces（How is the part held and reached?） → 3. From the visible form to your acceptance plan（What must be measured and what does the source prove?） → 4. Review a similar component（What is needed for a comparable order?）。

**原问题：** 首屏与支撑开场重复描述同一面板。；步骤和验收片段重复，尺寸条件分散。；竖屏原视频居中放置，桌面两侧留白失去用途。

**实施：** 合并形态和支撑说明，保留显示尺寸与真实外廓区别。；步骤及验收完整句，保留测量支撑和后处理条件。；视频标题说明与竖屏播放器桌面分列，手机顺序不变。

**图片计划与实际：** 保留3张独立真实照片和18秒原视频；不改尺寸或车间证据。视频在验收任务内保留。 最终3个有效独立源、3/4图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[display-housing-panel-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/display-housing-panel-1600.webp>) · [display-housing-machining-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/display-housing-machining-1600.webp>) · [display-housing-pair-1200.webp](<D:/lzz/lzz/_react/public/media/source-details/display-housing-pair-1200.webp>)。

**两端复核：** 两端完整截图及双面照片局部复核，视频桌面分列已生效；3照片及18秒原视频保留，显示尺寸、支撑和后处理条件完整。  通过；没有本轮尚未修复的已知明显布局问题。

### 57. /products/machining-studies/custom-plastic-parts-ptfe-pom-pe-acrylic/

**模块职责（6）：** 1. Plastic part examples: PTFE, POM, PE & acrylic（What do these independent source groups establish?） → 2. PTFE components and stepped shafts（What form is visible and what material/drawing/acceptance remains to define?） → 3. POM gear teeth and hub details（What form is visible and what material/drawing/acceptance remains to define?） → 4. Straight and curved PE guide strips（What form is visible and what material/drawing/acceptance remains to define?） → 5. Acrylic components and viewing surfaces（What form is visible and what material/drawing/acceptance remains to define?） → 6. Conditions across the plastic families（What drawing and cross-family conditions are needed?）。

**原问题：** 手机端共同材料与测量条件出现在询盘行动之后。；视频小标题重复图组标题，PE介绍也复述同一形态。；亚克力两个素材仍用三列网格，第三列空置。

**实施：** 共同条件在DOM和手机阅读顺序均早于询盘；桌面仍为配套两列。；仅移除重复视频标题及PE同义引言，保留视频观察、时长、标签、描述和控制功能。；亚克力素材改为2列，手机仍单列。

**图片计划与实际：** 保留5个独立照片源及4段原视频。不改证据，不用生成图替代材料和车间记录。 最终5个有效独立源、4/6图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[plastic-ptfe-batch-1200.webp](<D:/lzz/lzz/_react/public/media/source-details/plastic-ptfe-batch-1200.webp>) · [plastic-ptfe-intermediate-1200.webp](<D:/lzz/lzz/_react/public/media/source-details/plastic-ptfe-intermediate-1200.webp>) · [plastic-ptfe-shafts-1200.webp](<D:/lzz/lzz/_react/public/media/source-details/plastic-ptfe-shafts-1200.webp>) · [plastic-acrylic-batch-1200.webp](<D:/lzz/lzz/_react/public/media/source-details/plastic-acrylic-batch-1200.webp>) · [plastic-acrylic-detail-1200.webp](<D:/lzz/lzz/_react/public/media/source-details/plastic-acrylic-detail-1200.webp>)。

**两端复核：** 两端整页缩览及POM/PE/询盘原尺寸局部复核；5照片与4视频保留，亚克力双列和手机条件先行生效，视频标签及锚点保持。  通过；没有本轮尚未修复的已知明显布局问题。

### 58. /products/machining-studies/custom-metal-parts-batch-examples/

**模块职责（6）：** 1. Metal part examples: shafts, fittings & housings（What do these independent source groups establish?） → 2. Locking-pin and turned-part forms（What form is visible and what material/drawing/acceptance remains to define?） → 3. Aluminum housings: cavities and mounting features（What form is visible and what material/drawing/acceptance remains to define?） → 4. Brass fittings and interfaces（What form is visible and what material/drawing/acceptance remains to define?） → 5. Aluminum parts after cleaning（What form is visible and what material/drawing/acceptance remains to define?） → 6. Requirements across the metal families（What drawing and cross-family conditions are needed?）。

**原问题：** 共同材料、清洁和批记录条件在手机询盘之后。；清洁组的形态/视频标题和材料标签重复。；视频验收限制分散在两个相近字段。

**实施：** 共同要求DOM和手机顺序提前，桌面仍右侧配套。；移除重复视频标题及清洁组同义引言。；合并清洁验收与证据边界为一字段，保留全部限制。

**图片计划与实际：** 保留5张独立照片及48秒原视频；不生成清洁方式或最终检验/发货证明。 最终5个有效独立源、4/6图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[metal-turned-shaft-1200.webp](<D:/lzz/lzz/_react/public/media/source-details/metal-turned-shaft-1200.webp>) · [metal-turned-batch-1200.webp](<D:/lzz/lzz/_react/public/media/source-details/metal-turned-batch-1200.webp>) · [metal-aluminum-housings-1200.webp](<D:/lzz/lzz/_react/public/media/source-details/metal-aluminum-housings-1200.webp>) · [metal-aluminum-close-1200.webp](<D:/lzz/lzz/_react/public/media/source-details/metal-aluminum-close-1200.webp>) · [metal-brass-batch-1200.webp](<D:/lzz/lzz/_react/public/media/source-details/metal-brass-batch-1200.webp>)。

**两端复核：** 两端整页及金属/询盘原尺寸局部复核；5照片和48秒视频保留，共同条件先行，清洁限制完整而重复标签减少。  通过；没有本轮尚未修复的已知明显布局问题。

### 59. /factory/

**模块职责（7）：** 1. CNC machining in Hangzhou.（Who and where is the supplier?） → 2. Plan around the part and the order mix.（How does order mix affect the stated capacity?） → 3. Match the setup to the geometry（Can the proposed part fit a suitable setup?） → 4. Set the checks before machining（How do feature checks lead to release?） → 5. Separate order records from supplier credentials（Which records support the order and supplier review?） → 6. Agree what travels with the parts（What protection and documentation must accompany the parts?） → 7. Start the supplier and part review（What should be sent for this review?）。

**原问题：** 手机首屏先读三组数据，车间主图出现偏晚。；检验阶段数字与两段短句重复切分；记录字段同样被拆散。；证书面板含面向编辑者的补字段提示，与客户核对字段重复。

**实施：** 手机先展示车间主图再业务数据。；四阶段与四类记录改为连贯短段，去掉装饰序号。；去掉已被证书字段完整覆盖的编辑提示，保留认证声明、当前资料请求和全部核对条件。

**图片计划与实际：** 保留6张真实车间/设备/检验照片和2张有明确AI标识的记录/包装示意；不改写证据。 最终8个有效独立源、6/7图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[workshop-wide-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/workshop-wide-1600.webp>) · [workshop-operators-2025-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/workshop-operators-2025-1600.webp>) · [milling-enclosure-operation-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/milling-enclosure-operation-1600.webp>) · [turning-operation-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/turning-operation-1600.webp>) · [five-axis-machine-wide-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/five-axis-machine-wide-1600.webp>) · [cmm-room-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/cmm-room-1600.webp>) · [order-records-1200.webp](<D:/lzz/lzz/_react/public/media/image-led-20261015/order-records-1200.webp>) · [packing-concept-1200.webp](<D:/lzz/lzz/_react/public/media/image-led-20261015/packing-concept-1200.webp>)。

**两端复核：** 两端整页和检验局部复核：手机先看到真实车间，四阶段不再带装饰编号，证书字段完整且无编辑占位提示；8张引用正常。  通过；没有本轮尚未修复的已知明显布局问题。

### 60. /resources/

**模块职责（6）：** 1. CNC machining & ordering guides（这页帮助我完成什么任务？） → 2. Ordering guide（如何推进采购？） → 3. Machining guides（如何定义加工需求？） → 4. Blank worksheets（怎样记录要求？） → 5. 15 purchasing questions, answered（有一个具体采购问题？） → 6. Use the information you have prepared（准备好后去哪里？）。

**原问题：** 开场偏抽象，没有直接说出资料任务。；FAQ标题和Read all 15 FAQs重复承担同一入口。；FAQ竖向CMM图与短文不平衡，后半页间距偏大。

**实施：** 开场直接列出询价/比价/图纸/批准任务。；FAQ入口合并到有意义的标题链接。；仅本页收紧下部节奏并控制CMM画幅。

**图片计划与实际：** 保留定义/记录AI示意各一、真实铣削和CMM照片；CMM缩小展示但保持完整。 最终4个有效独立源、4/6图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[definition-1200.webp](<D:/lzz/lzz/_react/public/media/image-led-20261015/definition-1200.webp>) · [milling-enclosure-operation-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/milling-enclosure-operation-1600.webp>) · [order-records-1200.webp](<D:/lzz/lzz/_react/public/media/image-led-20261015/order-records-1200.webp>) · [cmm-room-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/cmm-room-1600.webp>)。

**两端复核：** 整页与下半页复核：FAQ单一标题入口，CMM190px次级展示；首次选择器未命中已修正并重拍，4图及全部唯一链接保留。  通过；没有本轮尚未修复的已知明显布局问题。

### 61. /resources/ordering-guide/

**模块职责（7）：** 1. From quote request to approved order（这页帮助我完成什么任务？） → 2. Prepare the quote request（询价前准备什么？） → 3. Compare the quoted work（报价范围相同吗？） → 4. Approve the sample and batch（什么记录释放生产？） → 5. Plan packing and delivery（交付责任如何定义？） → 6. Keep the agreed requirements（如何下载并保留询价和验收要求？） → 7. Use the information you have prepared（怎样把准备好的要求和责任约定带入询盘？）。

**原问题：** 阶段结果与单一资料链接的说明重复。；四步完全同样左右比例，节奏机械。；第三步CMM相对文字偏大，手机占屏多。

**实施：** 阶段1/2/4去掉已被输出描述覆盖的链接摘要；第三步保留两个不同任务摘要。；第二步照片与文字交换桌面位置，手机顺序稳定。；具体化引言并减小CMM，保留全部阶段、条件、下载、责任链接。

**图片计划与实际：** 保留3张明确标识的定义/记录/包装AI示意和1张真实CMM照片；控制第三步照片到200px。 最终4个有效独立源、4/7图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[definition-1200.webp](<D:/lzz/lzz/_react/public/media/image-led-20261015/definition-1200.webp>) · [order-records-1200.webp](<D:/lzz/lzz/_react/public/media/image-led-20261015/order-records-1200.webp>) · [cmm-room-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/cmm-room-1600.webp>) · [packing-concept-1200.webp](<D:/lzz/lzz/_react/public/media/image-led-20261015/packing-concept-1200.webp>)。

**两端复核：** 四步结果和入口不重复；第二步右图、第三步200px检验图，两端顺序及完整责任条件复核通过。  通过；没有本轮尚未修复的已知明显布局问题。

### 62. /resources/processes-materials-finishes/

**模块职责（4）：** 1. Define the machining requirements（这页帮助我完成什么任务？） → 2. Process, material and drawing（从工艺、材料还是图纸开始？） → 3. See the geometry in a workshop setup（怎样理解真实加工几何？） → 4. Bring the requirements into one RFQ（准备好后去哪里？）。

**原问题：** 桌面首屏标题与竖图垂直错开，空白不能帮助选资料。；技术目录标题过泛，重复首屏。；加工实例标题和Browse入口重复。

**实施：** 首屏上下对齐并缩小竖图，提前资料目录。；目录改为具体任务标题。；加工实例链接合并到标题，保留定制图纸与约定验收条件。

**图片计划与实际：** 保留3张原始零件/铣削/装夹照片和2张明确标识的示意，原图不改结构。 最终5个有效独立源、3/4图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[multi-feature-milling-parts-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/multi-feature-milling-parts-1600.webp>) · [milling-enclosure-operation-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/milling-enclosure-operation-1600.webp>) · [material-samples-1200.webp](<D:/lzz/lzz/_react/public/media/image-led-20261015/material-samples-1200.webp>) · [definition-1200.webp](<D:/lzz/lzz/_react/public/media/image-led-20261015/definition-1200.webp>) · [two-stage-first-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/two-stage-first-1600.webp>)。

**两端复核：** 4个职责保留，首屏上对齐和较小原图不再推迟资料；加工实例用标题链接，5图两端完整。  通过；没有本轮尚未修复的已知明显布局问题。

### 63. /resources/processes-materials-finishes/cnc-process-selection/

**模块职责（5）：** 1. Choose the CNC machining route（这页帮助我完成什么任务？） → 2. Choose by geometry（如何完成“Choose by geometry”这项采购决策？） → 3. Workshop setups and related studies（如何完成“Workshop setups and related studies”这项采购决策？） → 4. Tolerances for critical features（如何完成“Tolerances for critical features”这项采购决策？） → 5. Discuss the requirements for your part（准备好后去哪里？）。

**原问题：** 手机先看定义示意，工艺比较答案延后。；装夹章引言两次解释图纸决定路线/验收。；竖向车削和CMM在手机高度偏大，压过文字任务。

**实施：** 仅本页手机表格先于辅助图。；合并装夹两段，保留所有证据限制和工装检查。；收敛手机竖图高度，桌面仍保留三类可比较的照片组。

**图片计划与实际：** 保留真实车削、铣削、多轴和CMM照片，定义示意保留但手机放在比较答案之后。 最终5个有效独立源、3/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[definition-1200.webp](<D:/lzz/lzz/_react/public/media/image-led-20261015/definition-1200.webp>) · [turning-operation-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/turning-operation-1600.webp>) · [milling-enclosure-operation-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/milling-enclosure-operation-1600.webp>) · [five-axis-operation-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/five-axis-operation-1600.webp>) · [cmm-room-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/cmm-room-1600.webp>)。

**两端复核：** 手机先比较工艺再辅助图；三种装夹组保留，竖图收敛，所有参数与差异说明完整，两端复核无溢出。  通过；没有本轮尚未修复的已知明显布局问题。

### 64. /resources/processes-materials-finishes/material-and-finish-checklist/

**模块职责（6）：** 1. Material and finish requirements（这页帮助我完成什么任务？） → 2. Choose the material specification（如何完成“Choose the material specification”这项采购决策？） → 3. Specify the finished surface（如何完成“Specify the finished surface”这项采购决策？） → 4. Solid material, coating or covering?（如何完成“Solid material, coating or covering?”这项采购决策？） → 5. Material and inspection records（如何完成“Material and inspection records”这项采购决策？） → 6. Discuss the requirements for your part（准备好后去哪里？）。

**原问题：** 手机表面示意落在五组长条件之后，难以对照。；材料引言将规格要求和示例/库存限制挤在一段。；处理工艺与处理后接口的两类职责在同一窄列持续堆叠。

**实施：** 表面章图解与工艺/外观组成第一组，接口条件在下面全宽展开。；材料选择要求和示例边界分段。；保留所有牌号、单位、温度/载荷、标准、厚度、测量与合规限制。

**图片计划与实际：** 保留材料/记录示意、接口准确图解及2张涂层原始证据照；不改涂层照片。 最终5个有效独立源、4/6图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[material-samples-1200.webp](<D:/lzz/lzz/_react/public/media/image-led-20261015/material-samples-1200.webp>) · [finish-interfaces-v1-800.webp](<D:/lzz/lzz/_react/public/media/resources/finish-interfaces-v1-800.webp>) · [finish-coated-round-1200.webp](<D:/lzz/lzz/_react/public/media/source-details/finish-coated-round-1200.webp>) · [finish-coated-bars-1200.webp](<D:/lzz/lzz/_react/public/media/source-details/finish-coated-bars-1200.webp>) · [order-records-1200.webp](<D:/lzz/lzz/_react/public/media/image-led-20261015/order-records-1200.webp>)。

**两端复核：** 示意图现在位于工艺与接口要求之间，桌面接口三列、手机自然分段；原涂层照片和材料标准差异全部保留。  通过；没有本轮尚未修复的已知明显布局问题。

### 65. /resources/faq/

**模块职责（5）：** 1. Custom CNC machining FAQs（这页帮助我完成什么任务？） → 2. Quotes & ordering（有哪些常见问题和必要条件？） → 3. Processes & specifications（有哪些常见问题和必要条件？） → 4. Inspection & delivery（有哪些常见问题和必要条件？） → 5. Have a question about your part?（准备好后去哪里？）。

**原问题：** 15个答案每条都接链接，破坏连续阅读且其中两对指向相同位置。；目录字号弱，难以快速分辨三类问题。；移动端尾部CMM对简短FAQ任务偏大。

**实施：** 每组答案末集中唯一相关资料链接，去掉逐条答案后的干扰。；目录加强可读性，保留全部15个答案与FAQ schema。；CMM控制190px，三组职责和询盘边界不变。

**图片计划与实际：** 保留原定义示意、真实零件与CMM照片；FAQ以直接答案为先，不为计数补装饰图。 最终3个有效独立源、3/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[definition-1200.webp](<D:/lzz/lzz/_react/public/media/image-led-20261015/definition-1200.webp>) · [multi-feature-milling-parts-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/multi-feature-milling-parts-1600.webp>) · [cmm-room-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/cmm-room-1600.webp>)。

**两端复核：** 15个答案/schema完全保留。每组集中推荐减少21→19链接，答案不再逐条被入口打断，CMM比例及目录两端复核。  通过；没有本轮尚未修复的已知明显布局问题。

### 66. /resources/rfq-checklist/

**模块职责（7）：** 1. CNC machining RFQ checklist（这页帮助我完成什么任务？） → 2. Copy this brief into your inquiry（如何完成“Copy this brief into your inquiry”这项采购决策？） → 3. Drawings and inspection requirements（如何完成“Drawings and inspection requirements”这项采购决策？） → 4. Material and final surface（如何完成“Material and final surface”这项采购决策？） → 5. Quantity and delivery（如何完成“Quantity and delivery”这项采购决策？） → 6. Keep acceptance requirements with the order（如何把验收要求和订单一起记录？） → 7. Use the prepared information in an RFQ（准备好后去哪里？）。

**原问题：** 引言说先清单后复制，与实际模板优先顺序不一致。；图纸章四段持续堆叠，样品重建责任远离图示。；三个说明模块全为相同左文右图。

**实施：** 引言对应模板在前的任务流。；样品重建字段迁移到图示下，保留原文本全部限制。；材料章桌面图左文右，其余按内容排列；复制功能不变。

**图片计划与实际：** 4张现有定义/材料/包装/记录示意保留且保持标识；定义图与样品重建说明组合。 最终4个有效独立源、4/7图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[definition-1200.webp](<D:/lzz/lzz/_react/public/media/image-led-20261015/definition-1200.webp>) · [material-samples-1200.webp](<D:/lzz/lzz/_react/public/media/image-led-20261015/material-samples-1200.webp>) · [packing-concept-1200.webp](<D:/lzz/lzz/_react/public/media/image-led-20261015/packing-concept-1200.webp>) · [order-records-1200.webp](<D:/lzz/lzz/_react/public/media/image-led-20261015/order-records-1200.webp>)。

**两端复核：** 模板直接可用；样品重建条件与定义图关联，材料图文变化，两端全部字段可读；复制按钮留待最终实际功能复测。  通过；没有本轮尚未修复的已知明显布局问题。

### 67. /resources/drawings-and-ordering/compare-cnc-machining-quotations/

**模块职责（5）：** 1. Compare CNC machining quotations（这页帮助我完成什么任务？） → 2. Compare what the price includes（如何完成“Compare what the price includes”这项采购决策？） → 3. Resolve exceptions before awarding the order（如何完成“Resolve exceptions before awarding the order”这项采购决策？） → 4. Keep the agreed scope with the order（如何完成“Keep the agreed scope with the order”这项采购决策？） → 5. Discuss the scope of your quote（准备好后去哪里？）。

**原问题：** 手机比较表重复长列标签且单元格间留白偏多。；定义示意在手机先于核心比较答案。；CMM图片过大，未决条件的视觉重心偏离文字。

**实施：** 缩短表头标签为Compare和Resolve，信息本身全部保留。；仅本页手机表格先于示意，压缩多余单元格空隙。；控制检验图比例，原条款和内链完整保留。

**图片计划与实际：** 保留定义/记录AI示意和真实CMM；辅助定义图手机在表后，CMM210px。 最终3个有效独立源、3/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[definition-1200.webp](<D:/lzz/lzz/_react/public/media/image-led-20261015/definition-1200.webp>) · [cmm-room-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/cmm-room-1600.webp>) · [order-records-1200.webp](<D:/lzz/lzz/_react/public/media/image-led-20261015/order-records-1200.webp>)。

**两端复核：** 八项完整比较保留；手机表格先于示意，Compare/Resolve简短标签与较短间距更易比读；CMM缩小，两端无溢出。  通过；没有本轮尚未修复的已知明显布局问题。

### 68. /resources/drawings-and-ordering/machined-prototype-approval-checklist/

**模块职责（6）：** 1. Machined prototype approval（这页帮助我完成什么任务？） → 2. Agree what the sample must prove（如何完成“Agree the evaluation before making the sample”这项采购决策？） → 3. Sample acceptance checks（如何完成“Check the sample and its records together”这项采购决策？） → 4. Record the approval decision（如何完成“Write down exactly what has been approved”这项采购决策？） → 5. Release the batch as a separate decision（如何完成“Release the batch as a separate decision”这项采购决策？） → 6. Plan your sample and next batch（准备好后去哪里？）。

**原问题：** 目录和模块标题过长，手机换行密集。；检验表前的CMM造成过高标题区。；批准记录仍同样窄左文右图，四个动作缺少整体感。

**实施：** 收短目录及关键标题，事实正文不改。；缩短CMM图位并上对齐标题。；记录模块桌面图左文右，手机仍先看决定要求。

**图片计划与实际：** 保留两张零件原图、真实CMM及记录示意；CMM缩小，批准记录图改左侧。 最终4个有效独立源、4/6图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[milling-enclosure-parts-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/milling-enclosure-parts-1600.webp>) · [cmm-room-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/cmm-room-1600.webp>) · [order-records-1200.webp](<D:/lzz/lzz/_react/public/media/image-led-20261015/order-records-1200.webp>) · [aluminum-housings-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/aluminum-housings-1600.webp>)。

**两端复核：** 短标题更易扫读；CMM和记录图分清主次，7项表和所有批准/条件/变更责任完整，两端复核。  通过；没有本轮尚未修复的已知明显布局问题。

### 69. /resources/production-and-shipping/prototype-vs-small-batch-cnc/

**模块职责（6）：** 1. From the first sample to repeat production（这页帮助我完成什么任务？） → 2. Prototype and repeat-batch decisions（如何完成“Prototype and repeat-batch decisions”这项采购决策？） → 3. Approve the batch specification（如何完成“Approve the batch specification”这项采购决策？） → 4. Record revision and release（如何完成“Keep a clear revision and release record”这项采购决策？） → 5. Confirm the next order（如何完成“Confirm the next order”这项采购决策？） → 6. Request a quote for the next batch（准备好后去哪里？）。

**原问题：** 引言提前复述比较表多数要求，手机首屏过长。；表格手机重复长列名，答案不够集中。；放行记录长标题及CMM配图偏大，次要信息太重。

**实施：** 引言仅保留设计批准及经济批量判断，完整检查内容在比较表与规格章保留。；比较表列名简化为First sample/Repeat batch。；收短记录标题、控制辅助图，所有MOQ/生产与运输条件完整。

**图片计划与实际：** 保留零件原图、CMM、记录与包装示意；手机表格优先，检验图控制210px。 最终4个有效独立源、4/6图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[milling-enclosure-parts-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/milling-enclosure-parts-1600.webp>) · [cmm-room-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/cmm-room-1600.webp>) · [order-records-1200.webp](<D:/lzz/lzz/_react/public/media/image-led-20261015/order-records-1200.webp>) · [packing-concept-1200.webp](<D:/lzz/lzz/_react/public/media/image-led-20261015/packing-concept-1200.webp>)。

**两端复核：** 首屏直达批次差异，五项比较、三个规格字段和独立放行表完整；短列名及较小CMM使手机阅读更连续。  通过；没有本轮尚未修复的已知明显布局问题。

### 70. /resources/production-and-shipping/custom-cnc-parts-shipping-checklist/

**模块职责（6）：** 1. Plan the shipment of CNC parts（这页帮助我完成什么任务？） → 2. Protection and identification（如何完成“Protection and identification”这项采购决策？） → 3. Timing and responsibility（如何完成“Timing and responsibility”这项采购决策？） → 4. Shipment and import documents（如何完成“Shipment and import documents”这项采购决策？） → 5. LZZ packing archive（如何完成“LZZ packing archive”这项采购决策？） → 6. Include shipment needs in the RFQ（准备好后去哪里？）。

**原问题：** 四章几乎同样左文右图，运输责任缺少独立重心。；历史档案说明两段反复描述准备照片。；三张竖向历史照片尺寸控制不一致，部分章节留白偏多。

**实施：** 运输责任章桌面图左文右，其他信息按任务保持。；档案边界合为一段，保留日期、未知目的地/承运商/贸易条款和非交付证据限制。；历史图统一完整主体展示高度，手机不裁关键物件。

**图片计划与实际：** 1张明确包装示意与3张真实2022档案照保留；不冒充当前标准包装或已交付。 最终4个有效独立源、4/6图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[packing-concept-1200.webp](<D:/lzz/lzz/_react/public/media/image-led-20261015/packing-concept-1200.webp>) · [shipment-2022-prepared-load-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/shipment-2022-prepared-load-1600.webp>) · [shipment-2022-order-packing-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/shipment-2022-order-packing-1600.webp>) · [shipping-example-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/shipping-example-1600.webp>)。

**两端复核：** 运输章图文换位，历史图完整且档案条件集中；生产/运输、EXW/FOB/DDP和关税责任全保留，两端复核无新增问题。  通过；没有本轮尚未修复的已知明显布局问题。

### 71. /resources/drawings-and-ordering/critical-features-cnc-drawing/

**模块职责（6）：** 1. Drawing requirements & critical features（这页帮助我完成什么任务？） → 2. Start with the part function（如何完成“Connect each requirement to the part function”这项采购决策？） → 3. Make the requirement measurable（如何完成“Make the requirement measurable”这项采购决策？） → 4. Check the package before release（如何完成“Check the package before release”这项采购决策？） → 5. Geometry and the machining route（如何完成“Geometry and the machining route”这项采购决策？） → 6. Review your drawing requirements（准备好后去哪里？）。

**原问题：** 第一章标题和目录长且复述任务。；手机比较表列标签反复冗长。；发布包的三个说明段落重复涉及批准/变更，配图与长文字失衡。

**实施：** 标题收为Start with the part function。；表头缩短Specify/Acceptance，技术单元格不变。；发布包说明合并为两个完整段落，材料配图桌面换位；工程责任和ASME链接不变。

**图片计划与实际：** 保留定义与材料示意，真实CMM探针和多特征零件照片。 最终4个有效独立源、4/6图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[definition-1200.webp](<D:/lzz/lzz/_react/public/media/image-led-20261015/definition-1200.webp>) · [cmm-detail-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/cmm-detail-1600.webp>) · [material-samples-1200.webp](<D:/lzz/lzz/_react/public/media/image-led-20261015/material-samples-1200.webp>) · [multi-feature-milling-parts-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/multi-feature-milling-parts-1600.webp>)。

**两端复核：** 6类特征全保留，发布责任整合为两段，表格短标签和材料图文换位；ASME及全部唯一链接/锚点/SEO未变。 最终将发布条件列加宽后再次拍摄confirm。 通过；没有本轮尚未修复的已知明显布局问题。

### 72. /about/

**模块职责（4）：** 1. Custom machining in Hangzhou（这页帮助我完成什么任务？） → 2. Verify the supplier（需要哪些公司与订单信息？） → 3. An Australian customer visits the LZZ workshop（有真实来访记录吗？） → 4. Have a part to discuss?（准备好后去哪里？）。

**原问题：** 手机先看较大CMM再找到公司资料入口。；Inside the workshop与来访故事标题重复层级。；故事标题和View visit链接重复，开场尾句偏泛。

**实施：** 手机任务入口置于CMM之前，辅助CMM控制210px。；来访标题直接作为模块h2并保留原锚点，删除重复访问链接。；开场保留定制图纸业务，删去泛化导航解释。

**图片计划与实际：** 保留真实车间、CMM和澳洲客户来访3张照片；不编辑人物与工厂证据。 最终3个有效独立源、3/4图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[workshop-wide-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/workshop-wide-1600.webp>) · [cmm-room-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/cmm-room-1600.webp>) · [australian-visit-03-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/australian-visit-03-1600.webp>)。

**两端复核：** 3张真实照片保留，手机先找任务入口再CMM；来访单一主标题/入口，两端实际截图复核。  通过；没有本轮尚未修复的已知明显布局问题。

### 73. /about/company-profile/

**模块职责（5）：** 1. LZZ Precision in Hangzhou（这页帮助我完成什么任务？） → 2. Engineering and workshop（工程与检查如何确认？） → 3. Supplier documents（证书与认可文件各证明什么？） → 4. Company development（公司如何发展？） → 5. Continue your supplier review（准备好后去哪里？）。

**原问题：** 三份证件重复View original document，标题与操作分离。；工程章节相关应用解释是泛化导航话术。；辅助CMM图占据过大比重，证件用途字段部分重复。

**实施：** 证件原图入口合并到对应文件标题，保留日期、有效性、目的和当前状态核对。；删应用导航重复解释，保留目录链接与全部锚点。；辅助CMM220px；重复的广义用途不与同义具体用途并列。

**图片计划与实际：** 6张原始车间/CMM/证件/团体照片保留，证件不得润色/改写；标题链接仍能打开原始文件。 最终6个有效独立源、4/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[workshop-wide-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/workshop-wide-1600.webp>) · [cmm-room-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/cmm-room-1600.webp>) · [High-tech-Enterprise-Certificate-1764396986484--69861fe474.webp](<D:/lzz/lzz/_react/public/media/High-tech-Enterprise-Certificate-1764396986484--69861fe474.webp>) · [Zhejiang-1764397018975--75b9eb4d46.webp](<D:/lzz/lzz/_react/public/media/Zhejiang-1764397018975--75b9eb4d46.webp>) · [Artificial-1764396998946--413c4183ea.webp](<D:/lzz/lzz/_react/public/media/Artificial-1764396998946--413c4183ea.webp>) · [team-2025-evening-group-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/team-2025-evening-group-1600.webp>)。

**两端复核：** 原文件链接移到各证件标题，日期/目的/状态提示保留；工程导航不再附泛化段落，6张真实图及两端截图复核。  通过；没有本轮尚未修复的已知明显布局问题。

### 74. /about/how-we-work/

**模块职责（6）：** 1. From drawing review to finished parts（这页帮助我完成什么任务？） → 2. Define and quote the part（如何形成可确认的报价范围？） → 3. Approve and manufacture（什么配置得到批准并进入生产？） → 4. Packing & handover（如何交接零件和记录？） → 5. Order terms, changes and support（合同条件与变更如何处理？） → 6. Prepare the first review（准备好后去哪里？）。

**原问题：** 五阶段的三项责任都挤在左窄列，右侧照片下大量空白。；手机每阶段先图和推荐链接，实际责任偏后。；Record before proceeding重复长标题，释放条件缺乏横向重心。

**实施：** 桌面买方与LZZ责任配图，放行记录在下方全宽。；手机先读双方责任，再看相关图和放行记录，推荐入口移动到阶段末。；缩短重复职责标题，保留全部商业条款与限制。

**图片计划与实际：** 保留2张定义/记录示意及铣削、零件、CMM、历史包装4张真实照片，不改变证据。 最终6个有效独立源、4/6图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[milling-enclosure-operation-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/milling-enclosure-operation-1600.webp>) · [definition-1200.webp](<D:/lzz/lzz/_react/public/media/image-led-20261015/definition-1200.webp>) · [order-records-1200.webp](<D:/lzz/lzz/_react/public/media/image-led-20261015/order-records-1200.webp>) · [milling-enclosure-parts-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/milling-enclosure-parts-1600.webp>) · [cmm-room-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/cmm-room-1600.webp>) · [shipment-2022-order-packing-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/shipment-2022-order-packing-1600.webp>)。

**两端复核：** 第一版阶段链接落单并放大间距，已将入口放入职责网格并消除重复padding后重拍；双方责任先行、放行全宽，条款完整。  通过；没有本轮尚未修复的已知明显布局问题。

### 75. /about/company-news/

**模块职责（4）：** 1. Company news（这页帮助我完成什么任务？） → 2. A November team day outdoors（最近的记录是什么？） → 3. Workshop & industry visits（这些原始活动记录显示了什么？） → 4. Team records（这些原始活动记录显示了什么？）。

**原问题：** 每篇图片和标题重复链接，Original company photograph反复带下划线。；客户来访竖图在手机占据很大高度，故事大小失衡。；末尾通用导航解释没有独有信息。

**实施：** 本页启用简洁新闻条目，只保留标题链接、日期、类别及具体摘要。；统一列表图位上限，竖图不裁人物。；移除结尾泛化解释，保留三个链接和筛选交互。

**图片计划与实际：** 保留6张真实原照，不编辑人物与事件；列表竖图完整缩小，标题作为单一文章入口。 最终6个有效独立源、4/4图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[workshop-operators-2025-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/workshop-operators-2025-1600.webp>) · [team-november-2025-01-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/team-november-2025-01-1600.webp>) · [china-africa-summit-01-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/china-africa-summit-01-1600.webp>) · [australian-visit-03-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/australian-visit-03-1600.webp>) · [team-may-2025-01-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/team-may-2025-01-1600.webp>) · [team-2024-01-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/team-2024-01-1600.webp>)。

**两端复核：** 文章入口由10个图片/标题重复链接变为5个标题链接，日期/摘要/6张原照保留，客户竖图手机210px；筛选留待终验。  通过；没有本轮尚未修复的已知明显布局问题。

### 76. /about/company-news/november-2025-hangzhou-lizhizao-group-activity/

**模块职责（4）：** 1. A November team day outdoors（这页帮助我完成什么任务？） → 2. A day beside the water（这组原始照片记录了什么？） → 3. Around the barbecue and table（这组原始照片记录了什么？） → 4. Related company records（还有哪些相关真实记录可继续审阅？）。

**原问题：** 推荐文章图片/标题双链接并重复通用原照标签。；活动正文与图注重复解释相同场景。；两张烧烤/用餐细节在手机连续满屏，主次不清。

**实施：** 本篇推荐条目单一标题入口。；移除被图注明确覆盖的两条重复场景说明，事件摘要保留。；手机细节并列，减少连续大幅竖图。

**图片计划与实际：** 7张真实照片全部保留，不改变人物与场景；两张细节在手机并列，环境横图另占一行。 最终7个有效独立源、4/4图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[team-november-2025-01-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/team-november-2025-01-1600.webp>) · [team-november-2025-02-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/team-november-2025-02-1600.webp>) · [team-november-2025-03-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/team-november-2025-03-1600.webp>) · [team-november-2025-05-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/team-november-2025-05-1600.webp>) · [team-november-2025-04-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/team-november-2025-04-1600.webp>) · [team-may-2025-01-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/team-may-2025-01-1600.webp>) · [team-2024-01-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/team-2024-01-1600.webp>)。

**两端复核：** 原事件和7张原照保留，两张手机细节并列、环境图完整；重复场景句与推荐双入口移除，两端复核。  通过；没有本轮尚未修复的已知明显布局问题。

### 77. /about/company-news/china-africa-west-lake-summit-2025/

**模块职责（4）：** 1. LZZ at the China-Africa West Lake Summit（这页帮助我完成什么任务？） → 2. Introducing custom machining（这组原始照片记录了什么？） → 3. The conference hall and entrance（这组原始照片记录了什么？） → 4. Related company records（还有哪些相关真实记录可继续审阅？）。

**原问题：** 推荐文章双链接和原照通用下划线重复。；两张展架人物照手机连续满屏，照片主次不明。；会议章节标题只提会场，实际还含入口场景。

**实施：** 启用本篇简洁推荐记录。；手机展架组并列，相关来访竖图限制210px。；会议章节标题准确覆盖hall与entrance。

**图片计划与实际：** 7张真实参会/相关记录照片保留，不新增客户关系或合作成果；展架两照手机并列。 最终7个有效独立源、4/4图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[china-africa-summit-01-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/china-africa-summit-01-1600.webp>) · [china-africa-summit-02-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/china-africa-summit-02-1600.webp>) · [china-africa-summit-03-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/china-africa-summit-03-1600.webp>) · [china-africa-summit-04-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/china-africa-summit-04-1600.webp>) · [china-africa-summit-05-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/china-africa-summit-05-1600.webp>) · [australian-visit-03-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/australian-visit-03-1600.webp>) · [team-november-2025-01-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/team-november-2025-01-1600.webp>)。

**两端复核：** 展架配对与会场横图分清主次，7图均保留；标题覆盖入口，推荐双入口合并，两端原照不裁人。  通过；没有本轮尚未修复的已知明显布局问题。

### 78. /about/company-news/australian-customer-workshop-visit-january-2025/

**模块职责（4）：** 1. An Australian customer visits the LZZ workshop（这页帮助我完成什么任务？） → 2. On the workshop floor（这组原始照片记录了什么？） → 3. Conversation during the visit（这组原始照片记录了什么？） → 4. Related company records（还有哪些相关真实记录可继续审阅？）。

**原问题：** 手机主图和三张竖照连续满屏，场景重要性相同。；桌面三张等大合影缺少主次。；会谈章文字复述图注，推荐双入口重复。

**实施：** 手机车间组首图较大，两张合影并列。；会谈只保留职责标题及原照图注，正文重复句移除。；本篇推荐单标题入口；当前事件日期不擅改。

**图片计划与实际：** 保留7张原照，不生成或修改人物/产品；主图270px，机器参观一大两小。 最终7个有效独立源、4/4图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[australian-visit-03-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/australian-visit-03-1600.webp>) · [australian-visit-04-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/australian-visit-04-1600.webp>) · [australian-visit-02-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/australian-visit-02-1600.webp>) · [australian-visit-05-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/australian-visit-05-1600.webp>) · [australian-visit-01-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/australian-visit-01-1600.webp>) · [china-africa-summit-01-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/china-africa-summit-01-1600.webp>) · [team-november-2025-01-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/team-november-2025-01-1600.webp>)。

**两端复核：** 机器参观首图和两张合影组成手机主次图组，会谈无重复场景句；7原照、日期、schema及链接关系保留，两端复核。  通过；没有本轮尚未修复的已知明显布局问题。

### 79. /about/company-news/may-2025-lzz-team-outing/

**模块职责（4）：** 1. LZZ team outing in May 2025（这页帮助我完成什么任务？） → 2. An outdoor meal together（这组原始照片记录了什么？） → 3. Evening streets and food stops（这组原始照片记录了什么？） → 4. Related company records（还有哪些相关真实记录可继续审阅？）。

**原问题：** 两章说明与各自图注同义重复。；选餐竖照高于同组夜间合影，次要细节占比太大。；推荐记录图片和标题仍重复链接。

**实施：** 移除两条图注已完整表达的说明。；控制细节竖图画幅，保留真实人数/环境。；本篇推荐采用单一标题入口。

**图片计划与实际：** 6张真实原照保留；夜间合影较大、选餐细节240px完整展示。 最终6个有效独立源、4/4图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[team-may-2025-01-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/team-may-2025-01-1600.webp>) · [team-may-2025-02-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/team-may-2025-02-1600.webp>) · [team-may-2025-03-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/team-may-2025-03-1600.webp>) · [team-may-2025-04-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/team-may-2025-04-1600.webp>) · [team-november-2025-01-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/team-november-2025-01-1600.webp>) · [team-2024-01-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/team-2024-01-1600.webp>)。

**两端复核：** 日间与夜间两章原照/图注保留，选餐细节240px不再压过合影；推荐合并，日期与业务入口未变。  通过；没有本轮尚未修复的已知明显布局问题。

### 80. /about/company-news/lzz-team-outing-2024/

**模块职责（4）：** 1. A rainy day out with the LZZ team（这页帮助我完成什么任务？） → 2. The journey and a shared meal（这组原始照片记录了什么？） → 3. A day away from the machines（这组原始照片记录了什么？） → 4. Related company records（还有哪些相关真实记录可继续审阅？）。

**原问题：** 场景说明复述各原始图注，标题区文字偏重复。；手机环境细节与合影全为同样大图，滚动节奏单一。；推荐文章仍重复图片/标题链接。

**实施：** 省去图注已覆盖的场景句，不增加具体未证实日期。；手机桥上图全宽，其后双列细节。；本篇推荐合并为标题入口。

**图片计划与实际：** 8张真实照片全部保留；桥上合影主图，环境细节手机双列；车内竖图260px。 最终8个有效独立源、4/4图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[team-2024-01-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/team-2024-01-1600.webp>) · [team-2024-02-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/team-2024-02-1600.webp>) · [team-2024-03-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/team-2024-03-1600.webp>) · [team-2024-04-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/team-2024-04-1600.webp>) · [team-2024-05-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/team-2024-05-1600.webp>) · [team-2024-06-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/team-2024-06-1600.webp>) · [team-november-2025-01-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/team-november-2025-01-1600.webp>) · [team-may-2025-01-1600.webp](<D:/lzz/lzz/_react/public/media/company-news/team-may-2025-01-1600.webp>)。

**两端复核：** 8张真实图均保留；桥上合影配双列游览细节、车内竖图控制大小；场景不重复，推荐单入口。  通过；没有本轮尚未修复的已知明显布局问题。

### 81. /about/contact/

**模块职责（5）：** 1. Contact LZZ（这页帮助我完成什么任务？） → 2. A new part（询价时提供什么？） → 3. An existing order（变更或不符项如何沟通？） → 4. Supplier documents（资格审查需要什么？） → 5. Visit the workshop（在哪里、如何预约？）。

**原问题：** 新零件和现有订单被资质请求隔开，任务顺序不连贯。；手机访厂先图后地址，联系信息出现偏晚。；新零件要求是一串长逗号句。

**实施：** 调整新零件→现有订单→文件顺序。；手机先访厂安排和地址再车间照。；新零件输入改为两句，全部字段与Email/WhatsApp/草稿边界保留。

**图片计划与实际：** 保留定义/记录两张有标识示意及真实车间照；联系功能优先，不增加营销图。 最终3个有效独立源、3/5图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[definition-1200.webp](<D:/lzz/lzz/_react/public/media/image-led-20261015/definition-1200.webp>) · [order-records-1200.webp](<D:/lzz/lzz/_react/public/media/image-led-20261015/order-records-1200.webp>) · [workshop-wide-1600.webp](<D:/lzz/lzz/_react/public/media/evidence/workshop-wide-1600.webp>)。

**两端复核：** 新/现有订单任务连续，手机地址先于照片，全部直接联系方式与唯一链接/SEO保留；3图两端正常。  通过；没有本轮尚未修复的已知明显布局问题。

### 82. /404.html

**模块职责（1）：** 1. Page not found（如何继续查找？）。

**原问题：** 恢复说明和首页辅助句重复。；三个缩略图与长短标题的垂直对齐不一致。；首页恢复链接作为主要行动不够突出。

**实施：** 合并恢复说明，删除无独有信息的辅助句。；统一96px图位并顶对齐。；首页入口加清晰边框与44px点击高度。

**图片计划与实际：** 保留零件、真实铣削和有标识定义示意3图；功能页不凑4–7模块。 最终3个有效独立源、1/1图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[p02-800.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p02-800.webp>) · [milling-enclosure-operation-800.webp](<D:/lzz/lzz/_react/public/media/evidence/milling-enclosure-operation-800.webp>) · [definition-800.webp](<D:/lzz/lzz/_react/public/media/image-led-20261015/definition-800.webp>)。

**两端复核：** 功能页1个恢复模块例外，首页入口明显且3图位统一；两端无溢出。HTTP404及相应console资源状态为预期，不是业务页错误。 构建路径/404/也命中恢复样式；不存在地址验证真实404。 通过；没有本轮尚未修复的已知明显布局问题。 任务例外：恢复说明一个核心模块，加三条有图导航；导航不算三个展示模块，按工具页例外

### 83. /privacy/

**模块职责（6）：** 1. Privacy and site information（本说明涵盖什么？） → 2. Your inquiry（网站是否已发送？） → 3. Saved drafts（输入如何保存、清除或恢复？） → 4. Cookies and external services（外部网站有哪些边界？） → 5. Product and company information（照片能证明什么？） → 6. Contact（向谁提问？）。

**原问题：** 两张控件截图先出现按钮样式，再说明只是截图，可能误解为可操作。；保存草稿段落连续解释多种上下文，段落偏长。；桌面正文行宽还可收敛，条款应便于连续阅读。

**实施：** 截图说明移到控件图之前。；存储上下文与表内更改分成两个段落，全文含义不变。；正文限制70ch、行高1.7，必要内链和日期保留。

**图片计划与实际：** 保留2张真实表单截图和1张产品原照，不添加无用图；条款页按阅读任务例外。 最终1个有效独立源、1/6图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[privacy-draft.webp](<D:/lzz/lzz/_react/public/media/image-led-20261015/privacy-draft.webp>) · [privacy-clear.webp](<D:/lzz/lzz/_react/public/media/image-led-20261015/privacy-clear.webp>) · [p02-800.webp](<D:/lzz/lzz/_react/public/media/product-sources-20261015/p02-800.webp>)。

**两端复核：** 截图先说明用途再显示控件，存储语义全文保留且分段，两端70ch上限及条款内链复核；法律说明页图文覆盖例外。  通过；没有本轮尚未修复的已知明显布局问题。 任务例外：隐私条款页：1个达到显示尺寸门槛的图片源，另有2张UI操作截图（桌面高度小，不计最低有效图数）；按完整阅读任务豁免展示页的图文比例要求。

### 84. /quote/

**模块职责（3）：** 1. Prepare an RFQ email（我将完成什么？） → 2. Your inquiry（哪些信息必须提供，如何保存/恢复？） → 3. Contact LZZ directly（图纸、材料和检查信息如何对应？）。

**原问题：** 桌面姓名输入框只占半行，形成无目的空白。；零件要求输入面积偏小，不便写技术条件。；附件提示和保存/未发送说明在相邻位置重复。

**实施：** 姓名全宽、Message最小200px。；只移除已由开场和动态状态覆盖的重复句，保留字段标签/错误/隐私链接。；不修改存储、草稿构建、验证和发送边界逻辑；实际交互终验。

**图片计划与实际：** 保留定义示意、真实零件与检验细节3图；表单功能页不强凑展示模块。 最终3个有效独立源、1/3图文章；本页无新生成/生成式修图，保留与任务匹配的既有素材。 显示文件：[definition-800.webp](<D:/lzz/lzz/_react/public/media/image-led-20261015/definition-800.webp>) · [multi-feature-milling-parts-800.webp](<D:/lzz/lzz/_react/public/media/evidence/multi-feature-milling-parts-800.webp>) · [cmm-detail-800.webp](<D:/lzz/lzz/_react/public/media/evidence/cmm-detail-800.webp>)。

**两端复核：** 姓名全宽、Message200px，动态保存状态与隐私入口保留，草稿说明不重复；实际两端可读，功能在最终构建复测。 审阅状态额外修正Subject/默认dd缩进，重拍1440与390审阅截图。 通过；没有本轮尚未修复的已知明显布局问题。 任务例外：表单任务页，按身份/填写审阅/联系三组；不强凑展示模块或图文比例

## 尚未解决及未验证边界

- **P04图片缺口**：/products/part-examples/global-manufacturer-of-multi-sided-precision-machined-components/，5章/2有效图/2图文章。需要同一零件清晰整体、侧面接口和孔口细节。待真实素材补齐再验收；没有标记全站85页全部视觉通过。
- 当前证书有效范围、仪器校准/量程、特殊试验与本单资料可供性仍需按页面要求核实；本轮未补造证明。澳洲来访资料中既有日历日期差异注记仍待来源确认，本轮保留当前事件日期7 January2025，没有推算改日期。
- [旧测试脚本初次日志](<D:/lzz/reading-polish-20261015-2313/test-site.log>)、[旧refinement日志](<D:/lzz/reading-polish-20261015-2313/test-refinement.log>)没有通过；当前版本替代检查范围已逐项披露。没有真实邮件投递、文件上传、外部WhatsApp发送或生产部署测试。
- 200%正文放大只覆盖16类代表，系统级缩放、所有浏览器/设备组合及生产主机重定向未测。整页截图覆盖85URL，正常尺度目视为每页关键局部，并非逐段逐字阅读。

交付证据根目录：[reading-polish-20261015-2313](<D:/lzz/reading-polish-20261015-2313>)。回退依据为本轮开始前基线；不覆盖或删除用户原有工作。

## 2026-10-16 铸件加工页精修

本次按照用户指定的 [oil-ui-pro](<C:/Users/Administrator/.claude/skills/oil-ui-pro/SKILL.md>)，深化已确认的项目设计方向。范围仅为当前打开的 `/capabilities/casting-machining/`，以及文字放大暴露的共享页头、页脚换行缺陷。未重新规划其它页面、品牌或技术栈，未部署生产环境。本节更新本页前述旧版本记录，不将本次抽查称为全站重新验收。

**结果：通过。** 六个核心模块、五个独立有效图源、四个图文章；主内容由 688 个英文词整理为 609 个，正文内入口从 15 个减至 14 个。不是删去技术条件换取短页：保留了图纸版本、供坯、牌号与状态、余量、定位、尺寸记录、拒收责任、处理阶段、重建批准、独立测试及完整订单时间条件。

### 最终阅读结构与内容去向

| 模块 | 职责与实际改动 | 桌面与手机 |
| --- | --- | --- |
| 服务首屏 | 明确壳体、泵体、结构外壳的按图精加工；轴承孔、密封面、安装点；MOQ 与报价入口 | 58px 标题与完整 P22 实物形成主次；手机 37px 标题、说明、完整零件、操作和简短订单入口。只裁外围白画布，没有裁零件 |
| 铸件形态 | 将 P18、P24 两张真实来源照片提前到第二章；图片后的具体名称成为详情入口，来源在组内说明一次 | 桌面开放双列；手机逐件“图—名称—用途”。取消同一件的图片与标题重复入口 |
| 铸坯到接口 | 原几何说明与三步工艺合并；保留供坯、接受条件、余量、基准、铣/镗/钻/攻丝、记录与试验边界；样件重建问答迁至此处 | 一张辅助图配三步说明；样件批准责任紧随工艺。手机按说明、图、工序、样件条件连续阅读 |
| 材料与供坯 | 保留原三行全部牌号、条件、表面与处理要求；将检验表重复的 Incoming blank 行合入此表，明确增加原行已有的来料测量方法与可接受变动 | 桌面四列，手机按字段纵排；无需第二张相似辅助图。标准、供料方、材料记录、清理、拒收及处理后验收均保留 |
| 成品检验 | 保留孔/基准及密封/隐藏几何两行完整要求；压力、气孔、无损测试仍须独立规定程序及限值 | 1440px 表格为主、CMM 辅助；1100px 及以下表格获得完整行宽。手机表格后立即解释独立测试边界，再给资料入口及真实 CMM |
| 询价 | 原七项输入归为图纸、供坯、验收、交付四组；订单条件与操作同区，不再埋在通栏长句 | 桌面输入与订单面板并置，手机顺序堆叠；MOQ 1 件、图纸及订单确认后 7–14 个工作日、含表面处理、运费时间另计、按数量与要求确认均保留 |

删除或合并的是重复来源文字、两章反复解释的余量/供坯说明、一张职责重复的 AI 比较图和重复图像入口。材料、检验、重建与询价清单之间必要的短说明保留。AI 身份、邮件草稿需自行附图并发送的提示均保留。原有页内锚点全部保留。

### 图片实际处理

| 最终图位 | 文件 | 动作与核对 |
| --- | --- | --- |
| Hero，P22 | `/media/product-sources-20261015/p22-framed-1200.webp` 及原响应式版本 | 保留真实主体；仅用布局裁掉外围白画布。1440、390、320 下核对外轮廓、法兰、孔口与下沿完整 |
| 形态，P18 | `/media/product-sources-20261015/p18-framed-1200.webp` | 原图保留，完整显示；结构与细节未生成或改写 |
| 形态，P24 | `/media/product-sources-20261015/p24-1200.webp` | 原图保留，完整显示，具体名称链接进入当前项目详情 |
| 工艺辅助 | `/media/reading-polish-20261015/casting-condition-{480,800,1200,1536}.webp` | 复用上轮已经生成和接入的辅助图；显示“AI illustration · finish-machining concept.”。本轮没有重新生成或冒充订单实物 |
| 检验辅助 | `/media/evidence/cmm-room-1600.webp` 及原响应式版本 | 保留真实 LZZ 档案照片，辅助宽度 200–230px；校准、范围、测量能力仍要求当前设备记录，无生成式修图 |

**本轮新生图 0 张、生成式修图 0 张、保留真实图 4 张、复用既有 AI 辅助图 1 张。** 原图已适合任务，因此没有为使用工具而重画零件。被移出本页的 `casting-stages` 比较图仍在素材库中，没有删除其它页面使用的资源。

### 真实检查、评审与修正

- [1440px 前后整页](<D:/lzz/casting-polish-20261016/comparison-1440.png>)、[390px 前后整页](<D:/lzz/casting-polish-20261016/comparison-390.png>)；原始 [桌面](<D:/lzz/casting-polish-20261016/final/casting-1440.png>)、[手机](<D:/lzz/casting-polish-20261016/final/casting-390.png>)，以及同目录正常尺度局部。
- 一轮全新、无历史上下文的独立存量页面评审，加一轮针对问题的复核；不打分。[首轮](<D:/lzz/casting-polish-20261016/independent-review.md>)、[复核](<D:/lzz/casting-polish-20261016/independent-recheck.md>)。实际修正：手机表头残留桌面比例、768px CMM 侧栏挤窄技术表、手机独立测试说明被照片隔开、Hero 空画布、来源重复，以及文字放大后的共享页头与联系方式溢出。
- 1440、390、320、768、1100、1920px 和 390px 文字字号加倍全部无横向溢出。放大后页头自然增高、按钮与联系方式自然换行，没有缩小字号或隐藏内容。[几何与图片记录](<D:/lzz/casting-polish-20261016/final/records.json>)。
- [200% 文字图](<D:/lzz/casting-polish-20261016/final/text-200.png>)由 28 张真实 390×844 视口拼合，原始视口一并保留；这是文字字号加倍，不是 OS 缩放或高清截图。旧超长原生截图在 16384px 后出现捕获重复，已废弃为验收依据；DOM 只有一个 H1。
- 铣削、车削、五轴、铝加工四个共享组件使用样本均取得 1440/390 截图；正文、标题、图源保持，图片全解码，无溢出。桌面关键布局几何一致；手机仅因可增长页头边框整体下移 1px，其余几何一致。[对照数据](<D:/lzz/casting-polish-20261016/comparison-results.json>)。
- [本地构建预览实测](<D:/lzz/casting-polish-20261016/interactions-built.json>)共 55 项通过：页内定位不被页头遮住、关键内部链接、移动菜单与 Escape、保留关键条件、三次独立询价入口/预填/错误校验；没有发送邮件、上传文件或触发 WhatsApp。未把静态页面测试称为实际投递测试。
- `npm run check`：0 errors、0 warnings，9 条既有 hints；`npm run build`、`npm run test:seo`、`npm run test:site -- --static` 通过。[类型](<D:/lzz/casting-polish-20261016/check-final.log>)、[构建](<D:/lzz/casting-polish-20261016/build-final.log>)、[SEO](<D:/lzz/casting-polish-20261016/seo-final.log>)、[静态](<D:/lzz/casting-polish-20261016/site-final.log>)。本页 title、description、canonical、JSON-LD 与冻结基线一致。
- 最终构建预览的两张整页截图可读性与默认样式 lint 均为空；未新增滚动动画，属于已确认方向内的服务页精修。默认取证的 PATH 未找到 ffmpeg，只有关键帧，没有把它称为完成的视频动效验收。

### 边界和回退

- 本轮没有为铸件页更换 URL。执行期间项目另有导航名称和零件 URL 调整，保留当前项目数据和有效目标，没有回滚、冒领或覆盖该部分工作。构建日志的全项目页面、别名与重定向数量反映当前工程，不能解读为本轮新建了这些页面。
- 当前校准、量程及本单特殊试验能力仍需真实记录确认；本轮没有补造证明。P04 不属于本次单页范围，原待补素材状态没有被本次结果解除。
- 已在 DESIGN.md 追加经本次检验的局部规则，并标为 Agent 推断；没有覆盖旧规则或创建第二套品牌方向。[改前源码与规则](<D:/lzz/casting-polish-20261016/baseline>)可回退。本次实际修改文件见 [变更清单](<D:/lzz/casting-polish-20261016/changes.json>)。
- [本地预览](http://127.0.0.1:4325/capabilities/casting-machining/)；生产环境未部署。静态构建、页面视觉与交互检查已完成；主机真实重定向、OS 级缩放、真实邮件投递及视频动效未作为已验证项目。

## 2026-10-16：沿已确认方向继续逐页精修

本节是新一轮逐页结果，不能将先前整站记录当作本轮逐页视觉通过。按当前导航和 sitemap 建立 [执行队列](<D:/lzz/site-polish-20261016/queue.json>)；CNC 铣削先行，完成内容、图片、布局、两端截图和功能检查后继续车削。全过程仅本地，保留项目同期已有的导航及 URL 迁移工作，不部署。

### CNC 铣削服务：通过

- URL：`/capabilities/cnc-milling-service/`。7 个职责章：服务定位 → 零件形态 → 同一零件两次装夹 → 图纸与可达性 → 材料及处理 → 关键特征与检验 → 询价。7 张独立有效图片，5/7 章图文结合。
- 实际重排：零件提前；尺寸、夹持、五轴是否必要及锐内角限制归入同一图纸章；材料、验收均用完整行宽。用途及 CMM 作为检验上下文。询价六项归成图纸/材料、几何/装夹、验收/交付三组，并列呈现订单条件。
- 文字与链接：905 → 868 个英文词，正文入口 18 → 15。移出仪器拼图及通用材料摆拍示意，保留仪器块与模糊多面件的有目的详情入口；同一零件不再图片、标题双重链接。所有既有页内目标保留。
- 保留：四类材料表全部字段、钛材单独评估、薄壁与圆角、孔位/配合/基准、±0.01 mm 的全部限定、农业和半导体设备的条件与审批边界、MOQ 1、确认后 7–14 工作日含处理不含运输、按数量要求确认，以及邮件草稿说明。
- 图片：真实 P00、盖板、壳体、两次装夹、CMM 共 6 张保留；复用既有 `milling-geometry` AI 示意 1 张；新生图 0，生成式修图 0。两次装夹只保守裁切显示框的机器外围，提高工件占比，原照片不改写。CMM 为辅助宽度 210–230px。
- [改前桌面](<D:/lzz/site-polish-20261016/cnc-milling-service/before/1440.png>)、[改后桌面](<D:/lzz/site-polish-20261016/cnc-milling-service/final/1440.png>)；[改前手机](<D:/lzz/site-polish-20261016/cnc-milling-service/before/390.png>)、[改后手机](<D:/lzz/site-polish-20261016/cnc-milling-service/final/390.png>)。同目录保留连续正常尺度局部，截图时等待字体与所有图片解码。
- 自检修正：图片与标题对齐、过长行宽、装夹图主体偏小；[独立首轮与定向复核](<D:/lzz/site-polish-20261016/cnc-milling-service/independent-review.md>)通过，无分数。最终 oil 可读性 lint 两端均空。
- [浏览器检查](<D:/lzz/site-polish-20261016/cnc-milling-service/validation.json>)39 项通过：SEO 元信息与 JSON-LD、既有锚点、有效内链、菜单/Escape、询价上下文与空字段错误提示、1440/390/320/768/1100 无溢出、390px 文字字号加倍。文字放大只检查并保存关键视口，不冒充 OS 级缩放或整页缩放验收。
- 真实询价仅测试进入、预填及错误状态，未发送邮件。现有校准与量程仍需当前记录；P04 待补真实清晰素材没有被解除。

铣削后续共享文案核对：壳体的服务展示名称改为 Pocketed aluminum housings，盖、垫片和密封面要求由图纸定义；不从原图推定成套供货。已重新取得两端完整截图并查看受影响的正常尺度局部，词数同步核对最终渲染记录。

### CNC 车削服务：通过

- URL：`/capabilities/cnc-turning-service/`。6 个职责章：服务 → 轴线/工作特征及尺寸边界 → 车削/二次铣削 → 材料与实物形态 → 轴线/配合/螺纹检验 → 询价。7 张独立有效图片，5/6 章图文结合。
- 实际改动：尺寸公差与偏轴特征问答靠近几何；竖幅车削与横幅铣削按原比例安排，明确不是同一订单完整轨迹；材料表先给选择依据与全部条件，再展示两组实物；四行验收表使用完整宽度；重复的二次加工导语移除。
- 图片：保留真实法兰组件、两类操作、两组零件、CMM 共 6 张，复用既有 `turning-geometry` AI 辅助图 1 张，移出通用材料摆拍。生成 0、生成式修图 0；保留真实车削操作的现场状态，不将加工液及玻璃上的痕迹补画成证明。
- 原材料的 6061/7075、303/304/316L、C11000/C36000、POM/PTFE/PEEK、状态及处理，NPT/BSPT/metric 的不同规范、轴向尺寸/跳动、密封面及独立测试、医疗用途审批边界、原六项报价输入与订单条件全部保留。
- [改前桌面](<D:/lzz/site-polish-20261016/cnc-turning-service/before/1440.png>)、[改后桌面](<D:/lzz/site-polish-20261016/cnc-turning-service/final/1440.png>)；[改前手机](<D:/lzz/site-polish-20261016/cnc-turning-service/before/390.png>)、[改后手机](<D:/lzz/site-polish-20261016/cnc-turning-service/final/390.png>)，附正常尺度连续局部。
- 两轮截图修正及 [独立评审/定向复核](<D:/lzz/site-polish-20261016/cnc-turning-service/independent-review.md>)通过；材料答案出现偏晚、重复工艺导语、过长行宽及同期导航调整后的资料入口均已处理。[37 项浏览器检查](<D:/lzz/site-polish-20261016/cnc-turning-service/validation.json>)通过，范围与铣削页相同；未测试邮件真实投递。
- 资料入口读取当前 `resourceLibrary`，不将旧链接 404 留在新页面。图片来源、保留动作和两端核对记录见 [图片清单](<D:/lzz/site-polish-20261016/cnc-turning-service/images.json>)。没有用同源或重复图片满足数量。

### 五轴加工服务：通过

- URL：`/capabilities/5-axis-cnc-machining/`。6 章：服务 → 路径/装夹 → 跨面形态 → 材料 → 模型/基准验收 → 询价。6 张独立真实内容照片，4/6 章图文结合。
- 分度定位与连续运动先给直接区别，再靠近真实转台照及尺寸/重量/夹持限制；原散落的两类加工证据归到对应问题。形态章使用源组竖照与两组清晰零件组合，具体名称为唯一详情入口。
- 移出首屏叶轮同源裁片、通用材料摆拍示意和职责较弱的盖板图片；盖板与多面件保留集中链接及原始清晰度提示。真实叶轮、转台、源组、P00、多曲面件、CMM 保留。新生图 0、生成式修图 0，不从单照证明连续运动、量程、载荷或成品结果。
- 材料四行全字段（含钛、Inconel、硬度/热处理）、跨面孔/孔轴、基准、刀痕、薄壁、净空、追溯、最终用途及出口条件完整保留。平衡/泄漏/转子及功能验证的独立程序与限值集中，删除重复解释；无行业资质/测试包办的新承诺。
- [改前桌面](<D:/lzz/site-polish-20261016/5-axis-cnc-machining/before/1440.png>)、[改后桌面](<D:/lzz/site-polish-20261016/5-axis-cnc-machining/final/1440.png>)；[改前手机](<D:/lzz/site-polish-20261016/5-axis-cnc-machining/before/390.png>)、[改后手机](<D:/lzz/site-polish-20261016/5-axis-cnc-machining/final/390.png>)，正常尺度局部一并保存。
- 自检修正首屏三行碎裂标题、技术表宽度、重复来源入口；[独立评审及复核](<D:/lzz/site-polish-20261016/5-axis-cnc-machining/independent-review.md>)通过，测试边界重复已关闭。[39 项浏览器检查](<D:/lzz/site-polish-20261016/5-axis-cnc-machining/validation.json>)通过；保留 SEO、锚点、询价预填/错误状态，未发送邮件。

### 塑料加工服务：通过

- URL：`/capabilities/plastic-machined-parts/`。7 章：服务 → 聚合物与测量状态 → 实物形态 → 支撑/可达性 → 真实素材集 → 验收 → 询价。7 张有效图，5/7 图文章，另保留原始 PEEK 短片。
- 实际改动：材料由后半页提前；原“实例和过程”大章拆开职责；两类实物具体名称保留为唯一详情入口；PTFE 与涂层区别靠近材料表；技术验收表全宽，CMM 后置为辅助证据；订单条件移到询价操作旁。
- 保留全部聚合物名称、牌号/填料/状态、温湿度/调湿、载荷/化学环境、压配/镶件/薄壁/深腔、盲孔/通孔、资料责任及食品/医疗/电气测试边界。没有从外观或来源命名反推性能。
- 图片保留：绿色条形件、塑料拼图、PTFE 两张原照、CMM；复用圆件原主体及既有 AI 背景、支撑 AI 示意，身份继续清楚显示。新生图 0，生成式修图 0；长轴全件不裁。原视频使用 `/media/source-details/peek-parts.mp4`，[实测](<D:/lzz/site-polish-20261016/plastic-machined-parts/video-validation.json>)可播放、暂停，3.367 秒、静音、内联及原生控制保留，视频不计作额外有效图片凑数。
- [改前桌面](<D:/lzz/site-polish-20261016/plastic-machined-parts/before/1440.png>)、[改后桌面](<D:/lzz/site-polish-20261016/plastic-machined-parts/final/1440.png>)；[改前手机](<D:/lzz/site-polish-20261016/plastic-machined-parts/before/390.png>)、[改后手机](<D:/lzz/site-polish-20261016/plastic-machined-parts/final/390.png>)，附连续正常尺度局部。
- [全新独立评审](<D:/lzz/site-polish-20261016/plastic-machined-parts/independent-review.md>)通过，无必须删减文字或剩余修正项；[36 项浏览器检查](<D:/lzz/site-polish-20261016/plastic-machined-parts/validation.json>)通过，oil 两端 lint 为空。没有把实际播放、静态图片检查或草稿校验称为材料性能或邮件投递验证。

### 铝加工服务：通过

- URL：`/capabilities/aluminum-cnc-parts/`。6章：服务 → 合金与处理 → 实物形态 → 薄壁支撑 → 处理后验收 → 询价。7张有效图、5/6图文章。
- 保留合理的先选合金顺序；完整表格先于AI辅助图，板坯/铸坯区别靠近材料。将实物和加工支撑分开，真实加工大图配竖幅凹腔实物。三行验收表获得全宽；遮蔽/外观/处理标准与材料兼容性并入处理行，独立测试集中问答，减少重复灰底说明。
- 保留6061/6061-T6、6063/6063-T5、7075-T6、2024/5083、3003及所有状态、处理/条件，薄壁应力释放/基准、焊接供件与接头、压力/泄漏/装配/车辆试验的程序/限值/责任和全部询价输入、交期条件。
- 来源核对修正：开放壳体不再被服务页名称暗示为含盖/垫片套件；改为Pocketed aluminum housings并要求按图定义lid/gasket/sealing-face。另一个开放壳体的简介改为实际腔体、侧开口、安装特征。独立产品URL及旧搜索标题未改。共享介绍实际影响铣削页及小批量页的参考文案，铣削已两端重检，小批量页在其队列中复核。
- 6张真实原图保留；复用既有finish-comparison AI示意1张。新生图0、生成式修图0；加工图注解释刀具与夹持关系，未把来源照片当检验记录或材料证明。
- [改前桌面](<D:/lzz/site-polish-20261016/aluminum-cnc-parts/before/1440.png>)、[改后桌面](<D:/lzz/site-polish-20261016/aluminum-cnc-parts/final/1440.png>)；[改前手机](<D:/lzz/site-polish-20261016/aluminum-cnc-parts/before/390.png>)、[改后手机](<D:/lzz/site-polish-20261016/aluminum-cnc-parts/final/390.png>)，正常尺度分段保留。
- [独立评审及定向复核](<D:/lzz/site-polish-20261016/aluminum-cnc-parts/independent-review.md>)通过，三项均关闭；[36项浏览器检查](<D:/lzz/site-polish-20261016/aluminum-cnc-parts/validation.json>)通过，未实际发送邮件。最终oil lint为空；图片数量未包含任何重复裁片。

### 本轮共用验证与边界

- [改前源码、规则及交付记录](<D:/lzz/site-polish-20261016/baseline>)保留；每页改前截图在修改该页前取得，不以后建的预览替代基线。
- [类型检查](<D:/lzz/site-polish-20261016/check.log>)：0 errors、0 warnings、9 条既有 hints。初次检查遇到同期 SEO 导航整理过程中的重复属性；当前项目已消除，未由本轮覆盖其工作。
- [构建](<D:/lzz/site-polish-20261016/build.log>)通过，当前工程 Astro 144 页、sitemap 84 URL。数量包含当前项目其它工作，不能称为本轮改造数量。最终页面仍须分别完成真实视觉及功能记录。

### 不锈钢加工：通过

- URL：`/capabilities/stainless-steel-cnc-parts/`。6 章：服务 → 牌号与处理状态 → 实物及供件范围 → 基准和加工特征 → 处理后验收 → 询价。5 张不同有效图片，4/6 章图文结合。
- 四行牌号条件提前，保留 303/304、316/316L、17-4PH 的热处理状态、SUS430/SUS440，以及抛光、钝化、电抛光、处理后尺寸和记录；不同牌号不可默认替代，替代仍需批准。锁紧件的销配合、配套接口和独立功能要求合并到实物章，删除重复问答外壳及重复选材开场。
- 轴线、台肩、工作直径、螺纹、偏轴孔/平面/刻字、夹持可达性、处理后测量、毛刺和搬运痕迹全部保留。三行验收表获得完整宽度；不再以空的说明栏和竖幅 CMM 制造整块空白。手机先表格、后辅助 CMM。
- 图片：保留三张原零件来源照、真实 CMM 1 张；复用既有且明确标识的车削几何 AI 示意 1 张。新生成 0、生成式润色 0；不从图中光泽推断牌号、材质或性能。逐图路径见 [图片记录](<D:/lzz/site-polish-20261016/stainless-steel-cnc-parts/images.json>)。
- [改前桌面](<D:/lzz/site-polish-20261016/stainless-steel-cnc-parts/before/1440.png>)、[改后桌面](<D:/lzz/site-polish-20261016/stainless-steel-cnc-parts/final/1440.png>)；[改前手机](<D:/lzz/site-polish-20261016/stainless-steel-cnc-parts/before/390.png>)、[改后手机](<D:/lzz/site-polish-20261016/stainless-steel-cnc-parts/final/390.png>)，附连续正常尺度局部。
- 自检修正检验区空白；独立评审发现 CMM 图注形成窄长文字柱后，实际放宽图注，再次两端截图并 [定向复核通过](<D:/lzz/site-polish-20261016/stainless-steel-cnc-parts/independent-review.md>)。无新增动画、无打分。两端 oil lint 为空；[35 项浏览器检查](<D:/lzz/site-polish-20261016/stainless-steel-cnc-parts/validation.json>)通过，包含 SEO/JSON-LD 保留、原锚点、内链、询价预填及校验、5 个视口和文字字号加倍；未实际发邮件。

### 铜与黄铜加工：通过

- URL：`/capabilities/copper-brass-cnc-parts/`。6章：服务 → 用途选择 → 合金/处理 → 工作接口 → 验收 → 询价；4张不同有效图片，4/6图文章。电接触、传热、流体密封的条件提前，完整三行材料及验收表保留。
- 实际修正：首屏选型入口对齐新功能章，避免直接跳过用途判断；螺纹/通道/接触区/配合面及镀层保护合为接口章；重复牌号问答并入原材料说明；独立导电/传热/压力测试的方法、限值、报告与资格边界集中一处；重复的功能确认句删除。C3600、C36000、H62不默认等价，C11000/C10200/C12000/C26000/C36000及碲铜指定牌号、材料限制、记录/声明可用性均保留。
- 图片保留：P27堵头源图、既有AI车削几何、真实CMM；从现有真实库实际接入 `/media/source-details/metal-brass-batch-1200.webp` 接头照片。已看原图确认与P27不同；另一个brass-plugs档案与P27同源，未重复接入。新生成0、生成式修图0。图片不能证明材料或功能资格，身份说明保留。[逐图记录](<D:/lzz/site-polish-20261016/copper-brass-cnc-parts/images.json>)。
- [改前桌面](<D:/lzz/site-polish-20261016/copper-brass-cnc-parts/before/1440.png>)、[改后桌面](<D:/lzz/site-polish-20261016/copper-brass-cnc-parts/final/1440.png>)；[改前手机](<D:/lzz/site-polish-20261016/copper-brass-cnc-parts/before/390.png>)、[改后手机](<D:/lzz/site-polish-20261016/copper-brass-cnc-parts/final/390.png>)。自检修正材料注记长行、检验区空白；[独立评审及入口定向实测](<D:/lzz/site-polish-20261016/copper-brass-cnc-parts/independent-review.md>)通过。oil两端lint为空。
- [34项浏览器检查](<D:/lzz/site-polish-20261016/copper-brass-cnc-parts/validation.json>)通过，覆盖SEO、原锚点、有效内链、5种宽度、文字字号加倍、手机菜单及询价预填/错误状态。保留原六项报价输入与完整订单条件，没有发送邮件。同期4323旧开发服务出现模块加载错误，未当成页面验收；独立本地服务4327实际渲染200后重新取证，未修改项目配置或部署。

### 原型加工：通过

- URL：`/capabilities/prototype-machining/`。5章：服务 → 评估问题及来源参考 → 版本/检查/批准记录 → 生产差异及后续版本 → 询价。4张不同有效图，3/5图文章。
- 原四章中，批准记录与单幅产品图并排造成空白、CAD与材料差异混排。现冷却件和节气门CAD同章说明不同接口；三阶段批准记录使用完整行宽，对照输入、方法/责任、结果。不同材料/工艺/测量状态独立成章，后续批次仍有明确放行条件。
- 保留 STEP/IGES、受控版本、固定配合/基准/净空、未决设计/已批准替代、原型数量、工装/程序/限值、测量结果、批准人/偏差/下一版本；保留6061/7075及状态、热处理、材料记录，聚合物/填料/坯料、工作面/螺纹/处理后尺寸、边缘/清洁/测量状态。汽车/摩托的冷却件接头与供件、节气门孔径/安装/执行器接口靠近各自图，不重复列举；独立压力/功能/车辆测试责任和非客户项目/行业批准边界保留。四个材料入口、批次及合作职责入口保留。
- 图片：P13盖板与P12冷却件来源照、P15 CAD全部保留；实际接入已有真实CMM档案作为测量方法上下文，明确不是此原型检验结果。新生成0、生成式修图0；不将CAD当作生产/性能证明。[逐图记录](<D:/lzz/site-polish-20261016/prototype-machining/images.json>)。
- [改前桌面](<D:/lzz/site-polish-20261016/prototype-machining/before/1440.png>)、[改后桌面](<D:/lzz/site-polish-20261016/prototype-machining/final/1440.png>)；[改前手机](<D:/lzz/site-polish-20261016/prototype-machining/before/390.png>)、[改后手机](<D:/lzz/site-polish-20261016/prototype-machining/final/390.png>)。已查看整页及正常尺度局部，自检修正首屏评估入口落点。独立静态视觉评审通过，无必须返工项；随后按建议合并重复接口文字，主Agent再次看两端受影响局部。[评审记录](<D:/lzz/site-polish-20261016/prototype-machining/independent-review.md>)。
- [41项浏览器检查](<D:/lzz/site-polish-20261016/prototype-machining/validation.json>)通过；范围同前，包括SEO/JSON-LD、原锚点、有效链接、5视口、文字加倍、询价预填/空字段校验。原六项询价输入与完整时限未改，未发送邮件。oil两端lint为空；未新增动效。

### 小批量生产：通过

- URL：`/capabilities/low-volume-production/`。5章：服务 → 每料号定义 → 首件与批次放行 → 重复订单与包装 → 询价。4张不同有效图、4/5图文章。先给料号字段，手机不再先看图才得到规格答案；真实零件缩为来源参照，首件CMM为辅助宽度。
- 五项定义字段保留：料号/单位/版本及冲突文件、逐项数量/日期/目的地与预测界限、材料/状态/坯料/处理/替代、外观/保护/标签/包装、共用接口/基准/装配检查。保留无统一批量门槛及几何、夹持、材料、处理、检验影响。重复的预测/替代总结删除，完整要求仍在对应字段和RFQ中。
- 首件三个阶段的关键特征/基准/限值、测量方法与报告格式、等待批准与否、过程/最终抽样、追溯、非符合项/授权偏差、批准人/日期/决定、变更授权和重复放行全部保留。包装仍要求保护工作面/螺纹/外观面/边缘，确认分隔、接口保护、料号/版本/数量标签及方案。保留原六项询价输入、MOQ/交期/运输边界和Email草稿说明。
- 图片保留P28壳体、P34重复件、真实CMM共3张。P30开放壳体的命名详情入口及原形态描述迁入定义章，原重复图片移出。实际用内置ImageGen新生成1张通用包装概念，并接入 `/media/site-polish-20261016/packing-concept-{480,800,1200,1536}.webp`；1536版约225KB，手机使用响应式版本。完整3:2，不裁掉四个分格与主体。明确“AI illustration”，不声称实际订单、包装标准或运输保证；原大型装配发货档案经看图确认与小零件对象不匹配，未滥用作证明。[原件与处理记录](<D:/lzz/site-polish-20261016/packing-image.json>)、[实际提示词](<D:/lzz/site-polish-20261016/packing-image-prompt.txt>)、[逐图记录](<D:/lzz/site-polish-20261016/low-volume-production/images.json>)。生成式修图0。
- [改前桌面](<D:/lzz/site-polish-20261016/low-volume-production/before/1440.png>)、[改后桌面](<D:/lzz/site-polish-20261016/low-volume-production/final/1440.png>)；[改前手机](<D:/lzz/site-polish-20261016/low-volume-production/before/390.png>)、[改后手机](<D:/lzz/site-polish-20261016/low-volume-production/final/390.png>)。已实际查看整页和正常局部；自检调整手机包装顺序为要求→概念图→本单确认，独立视觉评审通过后又修正首屏图注起点及包装重复确认句。[独立评审](<D:/lzz/site-polish-20261016/low-volume-production/independent-review.md>)。
- [37项浏览器检查](<D:/lzz/site-polish-20261016/low-volume-production/validation.json>)通过；SEO/JSON-LD、旧锚点、有效内链、5视口、文字加倍、手机菜单与询价预填/校验完整。初次测试误以导航名Small production runs作为表单预选名，核对真实已有选项Low-volume production后通过，没有为测试修改业务名称。oil两端lint为空。未实际发送邮件、未部署。本单真实包装/标签/首件报告仍须按订单提供，不以概念图填补证据。

### 按样件加工：通过

- URL：`/capabilities/starting-with-a-sample/`。6章：服务 → 样件保留/解决/批准 → 阶段交付 → 材料/处理决策 → 首件检查与放行 → 询价。4张不同有效图，4/6图文章。三种材料状态从原按数组下标插入的阶段清单中独立出来；手机先读交付表，再看辅助示意。
- 阶段表保留所有输入、输出与批准责任，包括照片/尺寸/配套件/磨损、测量或扫描/隐藏几何/基准、2D/3D文件、报价范围/格式/授权批准、受控定义及首件放行。材料表完整保留已知规格/状态/处理变更、未知牌号/处理不可凭外观、替代用途/配套件/工作面与外观面/批准条件。
- 独立评审指出首件章重复前置三行约650px后，实际合并：孔/螺纹/密封面留在Retain；不复制样件磨损留在Resolve；隐藏几何/基准建立方法及文件/批准留在重建阶段。首件章聚焦原数量、配合或功能检查、方法、限值、记录和授权放行，不丢失独有条件；手机约减少656px重复表格。两资料入口保持分行。materials-finishes旧锚点现在落在真实材料章，其他旧锚点保留。
- 图片保留P23壳体来源照、真实CMM，复用已有样件/图纸和model/drawing/first-part两张AI辅助图；均保留身份，不是批准文件或实际重建记录。新生成0、生成式修图0。[逐图清单](<D:/lzz/site-polish-20261016/starting-with-a-sample/images.json>)。原六项询价输入、生产确认后7–14工作日及运输另计均保留；重建和图纸批准时间单独约定。
- [改前桌面](<D:/lzz/site-polish-20261016/starting-with-a-sample/before/1440.png>)、[改后桌面](<D:/lzz/site-polish-20261016/starting-with-a-sample/final/1440.png>)；[改前手机](<D:/lzz/site-polish-20261016/starting-with-a-sample/before/390.png>)、[改后手机](<D:/lzz/site-polish-20261016/starting-with-a-sample/final/390.png>)。已看整页与正常尺度局部，修正资料链接挤连，再按[独立评审及定向复核](<D:/lzz/site-polish-20261016/starting-with-a-sample/independent-review.md>)合并前置重复，复核通过，无打分。
- [35项浏览器检查](<D:/lzz/site-polish-20261016/starting-with-a-sample/validation.json>)通过：SEO/JSON-LD、原锚点、内链、5视口、文字加倍、手机菜单、询价预填和空字段校验。oil两端lint为空；没有真实发送、没有部署。量测/重建报价、实际文件和设备能力仍须按本单确认，未补造证据。

### 能力总览：通过

- URL：`/capabilities/`。6章：目录入口 → 按几何选工艺 → 按材料选服务 → 按现有资料选阶段 → 真实加工资料 → 询价；10张不同有效图、4/6图文章。全部工艺、材料和项目阶段入口及原描述保留。
- 工艺条目改为横向图文，名称和关键差异不再排在大图之后；手机项目阶段先给三条选择答案，再放AI辅助图。真实装夹图仅裁机器外围，保留刀具、夹具和工件；铜批次照片填统一显示框，不改源文件。完整订单条件移至询价操作旁。旧锚点、SEO、URL及本地Email草稿性质保留。
- 10张原有图片保留，含既有明确标识的AI辅助图；新生成0、生成式修图0。[图片记录](<D:/lzz/site-polish-20261016/capabilities-index/images.json>)。不把工厂照片当作新件公差、量程或交期证明。
- [改前桌面](<D:/lzz/site-polish-20261016/capabilities-index/before/1440.png>)、[改后桌面](<D:/lzz/site-polish-20261016/capabilities-index/final/1440.png>)；[改前手机](<D:/lzz/site-polish-20261016/capabilities-index/before/390.png>)、[改后手机](<D:/lzz/site-polish-20261016/capabilities-index/final/390.png>)。完整截图及正常局部已查看。文字加倍时发现材料双列产生437px页面宽度，实际改为字体相关的自适应网格；390px正常双列、320px或文字加倍单列，不缩小字体或隐藏正文。[48项浏览器检查](<D:/lzz/site-polish-20261016/capabilities-index/validation.json>)通过，通用询价维持可选服务空值与空字段校验，未发送邮件。
- [全新独立视觉评审](<D:/lzz/site-polish-20261016/capabilities-index/independent-review.md>)通过，无剩余视觉返工项，不打分；oil两端lint为空。未新增动画，未部署。

### 零件总览：通过

- URL：`/machined-parts/`。4章：按图定制定位 → 按形态找参考 → 夹持及可达性研究 → 本单定义与询价。8张不同有效图片、3/4图文章。
- 手机原双列的长名称、差异和AI身份说明挤在165px窄列，已改为单列横向图文；桌面保留适合比较形态的3×2网格。手机加工研究先给三个具体问题，再看辅助实拍；询价按钮放在MOQ、7–14工作日/运输/重建条件之后，三组采购输入仍优先呈现。
- 全部8张原有源图保留，含绿色塑料件原主体和既有AI背景；新生成0、生成式修图0。单件轮廓完整，不以照片断言材料/公差。保留6类、组件/装配、批次、3项具体研究、2项采购资料及画廊入口；链接文案改为Machining setups and source collections，直接说明内容主题。[逐图记录](<D:/lzz/site-polish-20261016/machined-parts-index/images.json>)。
- [改前桌面](<D:/lzz/site-polish-20261016/machined-parts-index/before/1440.png>)、[改后桌面](<D:/lzz/site-polish-20261016/machined-parts-index/final/1440.png>)；[改前手机](<D:/lzz/site-polish-20261016/machined-parts-index/before/390.png>)、[改后手机](<D:/lzz/site-polish-20261016/machined-parts-index/final/390.png>)，整页及正常局部、320px和文字加倍局部已查看。原SEO/JSON-LD/锚点保留；[34项浏览器检查](<D:/lzz/site-polish-20261016/machined-parts-index/validation.json>)通过，询价仍由客户在邮件应用附图发送。
- [全新独立视觉评审及链接定向复核](<D:/lzz/site-polish-20261016/machined-parts-index/independent-review.md>)通过，不打分；两端oil lint为空。没有实际发送、未部署。

### 零件画廊：布局通过，P04待补真实素材

- URL：`/machined-parts/gallery/`。4章：定位 → 搜索/筛选/35条参考与匹配源组入口 → 覆层件和齿轮独立资料 → 加工研究与询价。40张不同文件中39张有效，P04低清源不计；2/4图文章。此页是组合查找工具，标题/筛选与操作区不补装饰图片，按任务说明例外。
- 默认11个形态按钮改为单一选择器，工艺/材料/订单筛选主动展开；保留全部选项、组合、关键词、URL和返回恢复。补充源组两个入口提前至结果上方，删除结果末尾重复标题/描述块。手机名称全宽、完整实物与几何短句并排，材料及来源身份全宽；未知牌号反复句缩为Not specified in this reference，完整材料列表和未知边界保留。P08同义描述按独立评审删除，该卡手机用实物与完整材料条件并排。
- 真实源图、CAD/设计/装配语境及原主体+AI背景身份均保留；新生成0、生成式修图0。P04仅收敛显示宽度并明确低清待补，未称修复。[逐图记录](<D:/lzz/site-polish-20261016/parts-gallery/images.json>)。P33开腔壳体不证明含盖/垫片，公共显示名由Lid & gasket aluminum housings修正为Pocketed aluminum housings，URL、原始档案、盖/垫片的按图要求不删；ItemList仅同步该有证据名称，35条数量及链接保留。共用材料函数去掉Material options include重复前缀，不删除材料值；详情页按队列逐页复核。
- [改前桌面](<D:/lzz/site-polish-20261016/parts-gallery/before/1440.png>)、[改后桌面](<D:/lzz/site-polish-20261016/parts-gallery/final/1440.png>)；[改前手机](<D:/lzz/site-polish-20261016/parts-gallery/before/390.png>)、[改后手机](<D:/lzz/site-polish-20261016/parts-gallery/final/390.png>)，整页及连续正常尺度局部已查看。筛选/空结果四状态截图在final；自检修正Reset filters拆行和重复按钮，独立复核后明确matching collections计数及完整独立资料范围。
- [68项浏览器检查](<D:/lzz/site-polish-20261016/parts-gallery/validation.json>)通过，含SEO、旧锚点、内链、5宽度、文字加倍和Email草稿路径。仅ItemList的P33名称按记录修正，其他schema相同。[搜索/组合/刷新恢复/返回/零结果/重置/无JS验证](<D:/lzz/site-polish-20261016/parts-gallery/gallery-validation.json>)三轮共86项通过；首次测试脚本误等待空容器可见，已改为等待其真实零结果状态，不是页面失败。最后两项纯文案收口又取得当前状态截图，未冒充新一轮功能测试。
- [全新独立视觉评审及两项定向复核](<D:/lzz/site-polish-20261016/parts-gallery/independent-review.md>)通过，无剩余布局必改，不打分。oil唯一lint为视觉隐藏的语义父标题h2.sr-only间距误报，保留用于标题结构；没有把它当可见装饰标题。未实际发送、未部署。全页状态保留待补素材，不能把布局通过称为P04图片修复。

### P00 多孔圆形铣削件：通过

- URL：`/machined-parts/gallery/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/`。5章：实物/材料/最终状态 → 孔和面定义 → 跨面可达性 → 相近形态/技术阅读 → 本单RFQ；3张不同有效原图、3/5图文章。
- 合并Additional geometry和Further drawing requirements，保留3D/尺寸图、配套孔或紧固件、不可见几何/剖面、测量方法、圆面平面度/方位，以及孔径/深度/配合、孔位/节圆或坐标、基准、抽样和报告。工艺章删除重复材料/数量提示，3/4/5轴及仪器/汽车/机器人用途与非客户项目边界保留。
- 原圆件、第一装夹及P01源组均保留，未生图/生成式修图。辅助装夹照去大块背景、约440px宽；相近源组降至320px高，当前零件保持主角。图注明确装夹是另一件的相关研究。RFQ归为文件/基准、配合几何、订单输入三组，数量不再重复；完整MOQ/交期/运输/重建条件后才显示末尾操作。[图片记录](<D:/lzz/site-polish-20261016/p00/images.json>)。
- [改前桌面](<D:/lzz/site-polish-20261016/p00/before/1440.png>)、[改后桌面](<D:/lzz/site-polish-20261016/p00/final/1440.png>)；[改前手机](<D:/lzz/site-polish-20261016/p00/before/390.png>)、[改后手机](<D:/lzz/site-polish-20261016/p00/final/390.png>)；已看完整和正常尺度局部。自检修正96字符技术说明长行与次要图权重；最终两端oil lint为空。[独立静态视觉评审](<D:/lzz/site-polish-20261016/p00/independent-review.md>)通过，无须改项、不打分。最新RFQ窄屏/文字加倍局部由主Agent补验并查看，未冒充独立重测。
- [25项浏览器检查](<D:/lzz/site-polish-20261016/p00/validation.json>)通过，SEO/JSON-LD、原锚点、5宽度、内链、文字加倍、菜单、产品询价预填/空字段校验保留；没有发送邮件。新增数据字段均为逐页启用，共用操作抽取的默认输出保持，其他详情继续在其队列复核。[当前类型检查](<D:/lzz/site-polish-20261016/check-product-sample.log>)0 errors/0 warnings/9条既有hints；当前构建将在后续完成后统一复验。未部署。

### P01 仪器块与支架：通过

- URL：`/machined-parts/gallery/custom-oem-high-precision-cnc-milling-manufacturer/`。5章：源组/材料 → 接口与验收对照 → 方块加工/用途 → 相近圆件/资料 → RFQ；3张有效原图、3/5图文章。保留真实800×800源组、实际加工照片和相近圆件，不生成、不改几何，源组不等于配套供货。
- 具体接口提前，用4行全宽对照替代散落的卡片，保留安装面/孔位/方位、隐藏通道/剖面/螺纹/不可达边、去毛刺/清洁、夹持/工装接触/坯料、先重建批准图纸、独立清洁/泄漏条件及首件/过程/最终/出货检查。逆向工程与批准条件合到输入行，删除泛工艺章重复的材料/逆向提示；仪器段删除重述形态的开场，光学/机械装配对齐要求保留。实验室、液压、汽车、消防救援用途和非客户项目边界保留。
- 加工照片去重复灰框，相关圆件降为推荐尺度。RFQ条件在桌面使用全宽标签/答案行，避免短输入与长交期并列留下大空栏；手机按原自然顺序。资料入口明确为Drawing requirements，目标未变。主图与有效来源路径见[图片记录](<D:/lzz/site-polish-20261016/p01/images.json>)。
- [改前桌面](<D:/lzz/site-polish-20261016/p01/before/1440.png>)、[改后桌面](<D:/lzz/site-polish-20261016/p01/final/1440.png>)；[改前手机](<D:/lzz/site-polish-20261016/p01/before/390.png>)、[改后手机](<D:/lzz/site-polish-20261016/p01/final/390.png>)。正常布局通过后，文字加倍实际发现固定两列把component拆成碎词，已改为依据内容最小宽度自然换行；[当前放大截图](<D:/lzz/site-polish-20261016/p01/final/text-200-related.png>)可完整阅读。[26项检查](<D:/lzz/site-polish-20261016/p01/validation.json>)通过，SEO/JSON-LD、锚点、内链、5视口、询价预填/校验及草稿性质保留。
- [独立视觉评审](<D:/lzz/site-polish-20261016/p01/independent-review.md>)通过。独立发现旧320整页主图空白后，主Agent重开实页核对currentSrc、完整加载、可见性及几何，补拍[320首屏](<D:/lzz/site-polish-20261016/p01/final/hero-320.png>)及整页，独立定向复核正常；瞬态原因未验证，没有把补截图当修图。原文件800×800、手机响应文件480×480；浏览器naturalWidth受srcset密度修正，不能当原文件像素。[加载记录](<D:/lzz/site-polish-20261016/p01/hero-320-validation.json>)。
- 新技术表是逐页启用的可选结构；[P00共享组件回归](<D:/lzz/site-polish-20261016/p00/shared-regression.json>)两端像素一致。当前[类型检查](<D:/lzz/site-polish-20261016/check-product-table.log>)0错误、0警告、9既有hints。两端oil lint为空；未真实发邮件、未部署。

### P02 叶轮：通过

- URL：`/machined-parts/gallery/ultra-high-precision-machining-services/`。5章：完整叶轮/材料处理 → 叶片、根部和轮毂 → 多轴路线/应用 → 相近叶轮/资料 → RFQ；4个文件按来源去重为3张有效图，4/5图文章。原完整实物与根部裁片同源，不重复计数。
- 先给特征公差需按受控图纸、此例没有数值公差的答案。将原第四条与重复风机说明归入叶片轮廓、根部/薄壁/允许半径或厚度变更、轮毂配合/轴线三组；测量方法、条件、抽样和记录完整。平衡、旋转总成、速度和效率试验集中在细节图旁的一个问题中，保留装配状态、程序、限值、可用性和责任单独约定。
- 钛、Inconel、硬化不锈钢的选项性质和准确牌号/状态、研磨/抛光/专用涂层条件均保留。连续五轴路线明确需按模型/刀具/夹具评估，相关工厂照是另一零件。航空航天、科研、机器人和工业风机为应用语境，不冒充客户项目。RFQ按文件/型面、材料/订单、运行范围三组，完整订单条件后给操作。
- 四个真实图片文件全部保留，新生成0、生成式修图0；桌面主图提高到520px，辅助工厂照约360px高，相近叶轮降为320px。手机先给技术答案，再看根部和试验问题。[图片记录](<D:/lzz/site-polish-20261016/p02/images.json>)。
- [改前桌面](<D:/lzz/site-polish-20261016/p02/before/1440.png>)、[改后桌面](<D:/lzz/site-polish-20261016/p02/final/1440.png>)；[改前手机](<D:/lzz/site-polish-20261016/p02/before/390.png>)、[改后手机](<D:/lzz/site-polish-20261016/p02/final/390.png>)。已看完整与正常尺度局部、文字加倍材料/推荐/RFQ。独立评审1440/390通过，无新增版面必改；320初次全页取图主图空白，重新实测加载/可见并补拍[首屏](<D:/lzz/site-polish-20261016/p02/final/hero-320.png>)正常，未据此更改业务图片或声称发现CSS缺陷。初次空白原因未确证。[独立评审](<D:/lzz/site-polish-20261016/p02/independent-review.md>)。
- [25项浏览器检查](<D:/lzz/site-polish-20261016/p02/validation.json>)通过，保留SEO/JSON-LD、原锚点、有效内链、5宽度、文字加倍、菜单、产品RFQ预填/校验。oil两端issues/lint为空；[当前类型检查](<D:/lzz/site-polish-20261016/check-impeller.log>)962文件0错误0警告9既有提示。没有真实发送、未部署。

### P03 斜颈车铣件：通过

- URL：`/machined-parts/gallery/global-oem-precision-machining-solutions/`。5章：真实形态/材料 → 轴线/偏轴/接口 → 工艺与液压语境 → 相近形态 → RFQ；3张不同有效原图，3/5图文章。
- 原四项改为三个并列技术字段，手机三行；同图定义、共同基准、测量方法和限值归入开场与检验，不丢失同轴/跳动、孔位/方位、不可见内部、螺纹/密封/配合及独立泄漏/清洁要求。应用开场去掉重述零件种类的描述，保留配套件、油液、压力和泄漏条件；用途不冒充客户项目。
- 主件520×650真实来源保留，不生成或改结构；辅助车后铣照片去重复灰框并约束440px宽，明确是另一件的相关操作。初稿手机推荐图缩成128px让六个零件过小，已改为220px独立完整组图，再接全宽名称和差异；文字加倍正常换行。RFQ两组文件/订单输入，按钮在完整MOQ/交期/运输/重建条件后。[图片清单](<D:/lzz/site-polish-20261016/p03/images.json>)；生成0、修图0。
- [改前桌面](<D:/lzz/site-polish-20261016/p03/before/1440.png>)、[改后桌面](<D:/lzz/site-polish-20261016/p03/final/1440.png>)；[改前手机](<D:/lzz/site-polish-20261016/p03/before/390.png>)、[改后手机](<D:/lzz/site-polish-20261016/p03/final/390.png>)。主Agent已看整页与正常局部、文字加倍推荐，修正两处图片主次；本页为已验证详情规则内的逐页自检，未新增独立评审。[26项检查](<D:/lzz/site-polish-20261016/p03/validation.json>)通过：SEO/JSON-LD/旧锚点/内链、5宽度、文字加倍、菜单、询价预填及校验；oil两端无错误，未发送、未部署。材料/功能试验仍按本单确认。

### P04 多面零件：布局已精修，待补同件真实高清素材

- URL：`/machined-parts/gallery/global-manufacturer-of-multi-sided-precision-machined-components/`。5章：原轮廓/材料 → 跨面技术定义 → 多轴工序/用途 → 相近仪器件 → RFQ。3个文件仅2张有效来源、2/5有效图文章；低清主件不计，不能判为全页视觉通过。
- 技术要求提前：四条合为三组，保留共同基准、跨面尺寸/位置、深度/相交/剖面、斜口标准、配套件、装配间隙、重复装夹/成品面保护、安装孔位/面方位限值、独立密封条件。工艺章删除已在可达性行完整给出的提示，机器人安装/传感器/验收间隙及原仪器/能源/多口用途仍保留；不冒充实际客户项目。
- 原图限制360px且明确Low-resolution source / form reference only，未称修复。已重新查看800×800原图和历史两次ImageGen对比：[拒用记录](<D:/lzz/narrative-rebuild-20261015/p04-imagegen-attempt/decision.json>)仍适用，首次重构槽形、二次未可靠清晰，均未接入。本轮新增生成/生成式修图0，不重复制造无法核实的接口。保留两个清晰相关源，工序照收敛440px，源组300px；不补无关图凑数。[本轮图片记录](<D:/lzz/site-polish-20261016/p04/images.json>)。
- [改前桌面](<D:/lzz/site-polish-20261016/p04/before/1440.png>)、[改后桌面](<D:/lzz/site-polish-20261016/p04/final/1440.png>)；[改前手机](<D:/lzz/site-polish-20261016/p04/before/390.png>)、[改后手机](<D:/lzz/site-polish-20261016/p04/final/390.png>)。整页、技术局部及文字加倍推荐已查看，无新增溢出/错位；本页主Agent逐页复核，未新增独立评审。RFQ两组输入完整，操作在订单条件后。[25项检查](<D:/lzz/site-polish-20261016/p04/validation.json>)通过，SEO/JSON-LD/锚点/内链/响应式/询价保留，无发送和部署。
- 待补：同一蓝色零件清晰整体、中心同心槽、外周端口/孔和通道边缘照片；相似件或生成候选不能代替。质量标记现随真实图来源传递至详情/相关推荐，截图计数排除低清源。

### P05 车削形态：通过

- `/machined-parts/gallery/custom-oem-cnc-turning-manufacturer/`；5章：真实源组/材料 → 工作轮廓对照 → 车后铣/用途 → 相近形态 → RFQ。3张不同有效原图、3/5图文章，源组不是配套供货；生成/修图0。
- 采购接口前移为3行完整表，第四条的整轮廓/功能轴线/螺纹量规并入直径行；轴向长度、肩槽、配合/跳动、偏轴孔/平面位置、测量状态/抽样/记录保留。删除重复材料/处理/数量提示，RFQ改为文件/接口与材料/订单两组；所有材料、表面纹理、用途及MOQ/交期/运输/重建边界保留。
- 工序图改左侧420px辅助实拍，右侧给车后铣与用途，手机先答案；推荐组六件220px完整展示。首次桌面截图发现新旧网格规则使图文同格重叠，已从本页选择器修正并复看，没有只凭无溢出宣称通过。[前桌面](<D:/lzz/site-polish-20261016/p05/before/1440.png>)／[后桌面](<D:/lzz/site-polish-20261016/p05/final/1440.png>)、[前手机](<D:/lzz/site-polish-20261016/p05/before/390.png>)／[后手机](<D:/lzz/site-polish-20261016/p05/final/390.png>)及正常尺度局部已查看。
- [25项浏览器检查](<D:/lzz/site-polish-20261016/p05/validation.json>)和oil两端空lint通过，SEO/JSON-LD/锚点/内链/5宽度/文字加倍/询价预填与校验保留；[逐图记录](<D:/lzz/site-polish-20261016/p05/images.json>)。本页主Agent自检，未新增独立评审；未发送、未部署。未知订单牌号及功能试验仍需按图确认。

### P06 回转与偏轴特征：通过

- `/machined-parts/gallery/custom-rotary-cylindrical-components/`；5章：完整六件源组/材料 → 同轴/偏轴/接触面 → 车钻螺纹铣 → P05基础形态 → RFQ；3张有效原图、3/5图文章。保留已有先接口的顺序，没有套用P05整轮廓对照表；桌面三列短说明，手机三行完整答案。
- 第四条合回隐藏相交/装配定位、啮合和毛刺边缘限值，直径/轴向/方位/配合/表面、测量状态/抽样/记录全部保留。工序实拍去大灰框并约束420px，推荐源组300px/手机230px，主组完整不裁。用途与非实际项目边界合为自然段；RFQ分模型/定位及订单，不重复数量，操作在完整条件之后。三张均保留，生成/修图0。[图片记录](<D:/lzz/site-polish-20261016/p06/images.json>)。
- [前桌面](<D:/lzz/site-polish-20261016/p06/before/1440.png>)／[后桌面](<D:/lzz/site-polish-20261016/p06/final/1440.png>)、[前手机](<D:/lzz/site-polish-20261016/p06/before/390.png>)／[后手机](<D:/lzz/site-polish-20261016/p06/final/390.png>)、正常局部及文字加倍推荐已看；首轮当前布局无需再改，作为最终证据保留。[25项检查](<D:/lzz/site-polish-20261016/p06/validation.json>)及oil两端空lint通过。未新增独立评审；SEO/JSON-LD/锚点/内链/询价保留，未发送、未部署。材料/测试按实际订单确认。

### P07 接头、连接件与法兰：通过

- `/machined-parts/gallery/custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer/`；5章：真实源组/材料 → 连接技术定义 → 车后铣/用途 → 铜黄铜功能参照 → RFQ；3个不同有效来源、3/5图文章。原三图保留，新生成/修图0。[图片记录](<D:/lzz/site-polish-20261016/p07/images.json>)。
- 三处重复的螺纹/牌号/流体提示合入3条连续技术答案和询价。原问答并入共同基准轴/配合/螺纹标准、尺寸/表面处理后验收，移除同义第四条；NPT/BSPT/metric分别指定、尺寸/量规/啮合、密封面/槽/配套/表面限值、独立压力/泄漏程序/流体/温度/限值、法兰孔位和扳手空间、方法/状态/抽样/报告均保留。末尾分连接与订单输入，完整交期边界后操作。
- 主实物完整展示，420px工序和260px/手机220px铜件作为辅助；另件工序、非客户项目、非套件及本地草稿身份保留。独立评审建议删首屏重述副标题的一句，已实际删去，图纸和非套件边界完整。[前桌面](<D:/lzz/site-polish-20261016/p07/before/1440.png>)／[后桌面](<D:/lzz/site-polish-20261016/p07/final/1440.png>)、[前手机](<D:/lzz/site-polish-20261016/p07/before/390.png>)／[后手机](<D:/lzz/site-polish-20261016/p07/final/390.png>)、正常局部、窄屏和文字加倍已看。
- [全新独立评审及删句定向复核](<D:/lzz/site-polish-20261016/p07/independent-review.md>)通过，不打分。[25项检查](<D:/lzz/site-polish-20261016/p07/validation.json>)通过，SEO/JSON-LD/旧锚点/内链/5宽度/文字加倍/菜单/询价预填和校验保留。oil在删句前当前同布局的两端lint为空；最终删句后重拍并复查，未冒充重跑oil。当前[类型检查](<D:/lzz/site-polish-20261016/check-connections.log>)0错误/0警告/9既有提示，最后scopeCopy纯可选字段将在后续统一检查。未发送、未部署。

### P08 带表面要求的铣削件：通过

- `/machined-parts/gallery/full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing/`；5章重组为实物/材料 → 基材处理与独立外观参照 → 尺寸/外观/遮蔽 → 加工路线 → RFQ。3个不同有效原图、3/5图文章；不复制其他详情的章序。原结尾P09推荐合入处理章，保持原详情和CNC milling入口、旧推荐锚点，无重复图。
- 原首屏长处理列改为4行完整表：铝Type II/III阳极/铬酸盐转化，不锈钢钝化/电解抛光，铜黄铜抛光/镀层，适配基材的粉末涂覆/发黑/镍/铬；去毛刺/清洁、内部或专业供应商及兼容/保护/处理后尺寸完整。第四条合回外观参考与未处理/遮蔽要求，三类验收与测量状态/抽样/报告不删；表格手机先答案、再独立彩色参照，不推定黑色件另一状态。
- 首轮移出处理清单后材料栏产生空区，桌面首屏实际改为左标题/操作/材料、右完整实物，手机保留自然顺序。独立复核后修正主图与图注共用460px边缘；来源、具体件/受控图纸和非套件合为16px连续图注。彩色参照和工序理由各去一处重复，另件操作身份和有意义研究入口仍在。三个真实源保留，生成/修图0。[逐图记录](<D:/lzz/site-polish-20261016/p08/images.json>)。
- [前桌面](<D:/lzz/site-polish-20261016/p08/before/1440.png>)／[后桌面](<D:/lzz/site-polish-20261016/p08/final/1440.png>)、[前手机](<D:/lzz/site-polish-20261016/p08/before/390.png>)／[后手机](<D:/lzz/site-polish-20261016/p08/final/390.png>)，主Agent看整页/正常局部/窄屏/文字加倍。新章节初次模板闭合错误已修复，当前200，无运行错误。[独立评审与四项定向复核](<D:/lzz/site-polish-20261016/p08/independent-review.md>)通过，不打分。
- [25项检查](<D:/lzz/site-polish-20261016/p08/validation.json>)通过，SEO/JSON-LD/原锚点/内链/5宽度/文字加倍/菜单/询价预填和校验保留；末次文字合并前oil两端空lint，末次重拍和定向复核未冒充重跑oil。[类型检查](<D:/lzz/site-polish-20261016/check-finish-part.log>)963文件0错误0警告9既有提示，最后可选图注字段后续统一复验。共享模板改动后P01两端[像素一致回归](<D:/lzz/site-polish-20261016/p01/finish-shared-regression.json>)通过。未发送、未部署；本单实际处理范围和验收记录仍需确认。

### P09 结构与外观件：通过

- `/machined-parts/gallery/custom-high-precision-machining-for-structural-aesthetic-components-oem/`；5章：真实彩色源组/材料 → 装配、轮廓、标识验收 → 加工与用途 → P08参照 → RFQ。3张不同有效原图，3/5图文章；源组非套件、牌号未定，生成/修图0。
- 技术答案提前；第四条的结构/配合与装饰/减重区别、批准颜色/雕刻参考合回对应字段。安装面/孔/配套尺寸与配合、工具纹理/外观、基材/图稿/处理后尺寸、方法/状态/抽样/报告完整。保留UAV/3D打印/运动系统语境、结构/安装/运行载荷/外观要求，删除重述轻型结构的开场；非客户项目边界仍清楚。材料的结构与处理选用条件进入两组RFQ，完整订单条件后操作。
- 主图保留；工序420px去灰框、P08辅助组300px/手机240px。主Agent看[前桌面](<D:/lzz/site-polish-20261016/p09/before/1440.png>)／[后桌面](<D:/lzz/site-polish-20261016/p09/final/1440.png>)、[前手机](<D:/lzz/site-polish-20261016/p09/before/390.png>)／[后手机](<D:/lzz/site-polish-20261016/p09/final/390.png>)及技术/文字加倍局部，首轮自检无剩余布局问题，未新增独立评审。[26项检查](<D:/lzz/site-polish-20261016/p09/validation.json>)通过，oil两端空lint，SEO/JSON-LD/原锚点/内链/窄屏/菜单/询价预填与校验保留。[图片记录](<D:/lzz/site-polish-20261016/p09/images.json>)。未发送、未部署，具体材料/载荷与测试仍按图确认。

### P10 内外特征与重复生产件：通过

- `/machined-parts/gallery/high-volume-cnc-turning-for-complex-internal-external-features/`；5章：源组/材料表面 → 内孔、外圆、重复放行 → 工装与排期 → P05参照 → RFQ；3张不同有效源图，3/5图文章。
- 四条合为3行完整对照，密封台和难以量规进入的特征回内孔，统计过程控制/批次一致性回重复放行；深度/阶梯/内槽、密封导向/量测可达、轴线/外径/肩槽/配合、首件/抽样/批次/放行、方法/状态/记录均保留。工装与标准化重复设置、各订单数量/日期/报告和容量评估合为自然段；照片不证明新单产能。RFQ按轮廓/验收与每次release分组，去掉重复数量，完整生产/运输/重建边界后操作。
- 原800×800源图已实际看，4:3显示框只收敛垂直空画布、焦点65%，两端完整保留顶端筒件、右边支架和底部螺纹件；不改源、不称修复清晰度。工序420px去灰框，P05辅助组300px/手机230px。生成/修图0。[图片记录](<D:/lzz/site-polish-20261016/p10/images.json>)。
- 主Agent看[前桌面](<D:/lzz/site-polish-20261016/p10/before/1440.png>)／[后桌面](<D:/lzz/site-polish-20261016/p10/final/1440.png>)、[前手机](<D:/lzz/site-polish-20261016/p10/before/390.png>)／[后手机](<D:/lzz/site-polish-20261016/p10/final/390.png>)及正常首屏、文字加倍局部，初稿完整轮廓通过，无需进一步改图，未新增独立评审。[25项检查](<D:/lzz/site-polish-20261016/p10/validation.json>)和oil两端空lint通过，SEO/JSON-LD/锚点/内链/5宽度/菜单/询价预填与校验保留。未发送、未部署；材料、排期与统计验收范围按本单确认。

### P11 涡轮与流体件：通过

- `/machined-parts/gallery/high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem/`；5章：完整实物/材料处理 → 几何与运行试验 → 五轴工序 → P02另一叶轮 → RFQ。3不同有效实拍、3/5图文章。
- 第四条的轴线/密封/端口归轮毂，CMM模型比较/报告/追溯归型面；运行条与平衡问答及工序注记合为一处，保留平衡、旋转总成、压力、流量、泄漏及其他性能分别约定，装配状态/程序/限值/可用性/责任和此例无效率/可靠性等级不丢失。桌面连续标签/答案，手机完整可读；没有藏进折叠。RFQ保留模型版本、功能验证责任、材料/处理、数量/目的地与完整交期边界。
- 实际看800×800源，4:3居中仅裁空画布，完整叶尖/轮毂两端已看；原文件不变，不称修复。辅助工序420px、P02参照260px/手机220px，当前轮廓为主；生成/修图0。[图片记录](<D:/lzz/site-polish-20261016/p11/images.json>)。
- 主Agent看[前桌面](<D:/lzz/site-polish-20261016/p11/before/1440.png>)／[后桌面](<D:/lzz/site-polish-20261016/p11/final/1440.png>)、[前手机](<D:/lzz/site-polish-20261016/p11/before/390.png>)／[后手机](<D:/lzz/site-polish-20261016/p11/final/390.png>)及技术/叶尖局部；无需追加布局修正，未新增独立评审。[25项检查](<D:/lzz/site-polish-20261016/p11/validation.json>)及oil两端空lint通过，SEO/JSON-LD/锚点/内链/响应式/文字加倍/菜单/询价保留。没有真实发送、未部署，实际功能验证仍需本单条件与记录。

### P12 中冷器原型：通过

- `/machined-parts/gallery/custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier/`；5章：真实原型/逐组件材料 → 供件、安装、试验 → CNC/TIG路线 → 独立进气腔 → RFQ；4不同有效实拍、4/5图文章。
- 范围段、压力问答及工序重复收束为三组完整要求。保留6061/3003逐组件确认、core/端箱/端口/支架/紧固、购件/客户供件、不同合金及CNC/TIG/接合后验收；安装端口方位、车辆包装/fitment归安装行。压力/泄漏/actuation/流量/冷却分别于尺寸加工约定，装配条件、压力/介质/程序/限值、可用性/责任完整；泄漏不等于冷却有效或整车适用。两组RFQ保留模型版本/组件材料/供芯材/验证计划/数量/目的地，完整订单条件后操作。
- 手机技术答案先于辅助源照；主竖照和来源说明同340px，辅助冷却照和独立来源边界同270px。工序420px去灰框，进气腔260px/手机220px，均保持真实轮廓；四图保留，生成/修图0。[图片记录](<D:/lzz/site-polish-20261016/p12/images.json>)。自检修正图注起点，评审后删辅助图同义首句，保留非同单/非冷却证明边界。
- 已看[前桌面](<D:/lzz/site-polish-20261016/p12/before/1440.png>)／[后桌面](<D:/lzz/site-polish-20261016/p12/final/1440.png>)、[前手机](<D:/lzz/site-polish-20261016/p12/before/390.png>)／[后手机](<D:/lzz/site-polish-20261016/p12/final/390.png>)及正常局部、文字加倍。[独立复核和删句定点复核](<D:/lzz/site-polish-20261016/p12/independent-review.md>)通过，不打分。[25项功能检查](<D:/lzz/site-polish-20261016/p12/validation.json>)和两端oil空lint在末次纯图注删句前通过；删句后重新两端整页取图、看局部及定向复核，未冒充再次功能测试。SEO/JSON-LD/旧锚点/内链/询价仍保留。
- [类型检查](<D:/lzz/site-polish-20261016/check-intercooler.log>)963文件0错误0警告9既有提示，最后可选图注字段后续统一复验；技术标题可选字段回归P01两端[像素一致](<D:/lzz/site-polish-20261016/p01/assembly-shared-regression.json>)。未发送、未部署。实际芯材/接合/功能测试能力与记录仍以本单为准，不补造焊接或检验照片。

### P13 发动机盖：通过

- URL：/machined-parts/gallery/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/。5章：真实盖体/材料处理 → 配合、外观、壁厚基准 → 原型/小批路线 → P09参照 → RFQ。3不同有效原图、3/5图文章。
- 原落单第三项与关键公差FAQ整为3行完整对照。保留上下轮廓、紧固可达、hood/camshaft/sensor间隙、按设计选密封/垫片及配套、可见刀纹/外观参考、遮蔽/最终尺寸与外观分开验收、壁厚/安装基准/孔位及材料/几何/夹持/处理的公差评估。6061-T6、7075替代与精确状态、抛光/拉丝/阳极均在；工序删重复材料和间隙提示，原型/小批五轴/球刀路线按模型评估，照片为另件。
- 主实拍保留真实手持、背景和刀纹，600px图注对齐；工序400px去灰框、P09辅助280px/手机230px。两组RFQ保留配套空间/版本、材料状态、处理和数量/目的地，完整条件后操作。生成/修图0。[图片清单](<D:/lzz/site-polish-20261016/p13/images.json>)。
- 主Agent已看[前桌面](<D:/lzz/site-polish-20261016/p13/before/1440.png>)／[后桌面](<D:/lzz/site-polish-20261016/p13/final/1440.png>)、[前手机](<D:/lzz/site-polish-20261016/p13/before/390.png>)／[后手机](<D:/lzz/site-polish-20261016/p13/final/390.png>)及技术/文字加倍局部；自检无剩余布局项，未新增独立评审。[25项检查](<D:/lzz/site-polish-20261016/p13/validation.json>)及oil两端空lint通过；SEO/JSON-LD/锚点/内链/窄屏/菜单/询价保留。未发送、未部署，配合/密封与公差仍按本单确认。

## P14 — intake assembly context: completed local polish
- Problems corrected: hero wording could imply complete-engine manufacture; four feature blocks repeated assembly/model/test requirements; workshop and CAD references competed with the assembly context.
- Final structure: assembly context/material/final condition → three interface-review rows → individual machining route and separate workshop record → smaller runner CAD comparison → RFQ and order conditions. Five chapters, three effective sources, 3/5 image chapters.
- All three source files retained; no generative edit, no new photo claim. Full assembly boundary stays directly below the source; 6061-T6, finish conditions, all test responsibilities, MOQ and schedule preserved. Full STEP/IGES model, port spacing, flange positions, restricted sections and prototype-fitment checks consolidated without dropping requirements.
- Both full pages and normal-scale mobile crops checked; complete assembly outline, aligned caption, readable stacked rows, no broken images or overflow. 25 browser checks passed and oil raw lint/issues empty. Unchanged first render accepted and copied to final, not represented as another capture. Independent review not repeated: same assembly subtype already independently reviewed on P12; current page self-reviewed.
- Evidence: [desktop](<D:/lzz/site-polish-20261016/p14/final/1440.png>), [mobile](<D:/lzz/site-polish-20261016/p14/final/390.png>), [validation](<D:/lzz/site-polish-20261016/p14/validation.json>). Local only, no deployment or message sent.

## P15 — throttle-body CAD reference: passed
- Corrected: CAD hero used a finished-product sentence; technical conditions were scattered across features and process notes; the large workshop/plenum references competed with the current CAD.
- Structure: CAD with service/material/finish → three fit/supply/validation rows → machining route and separate workshop record → smaller mating-plenum reference → RFQ/order conditions. Five chapters, three effective sources, 3/5 image chapters.
- Retained colored CAD, two-stage workshop photograph and p17 source photograph, with unchanged identities. Desktop title/material left and full CAD right; mobile title then source then material. Kept shaft/bore/plate datum and fits, motor/gear/seals, bearing/actuator fits, motor envelope, all assembly/test criteria, evaluator, material/finish, MOQ/schedule. Consolidated duplicated process notes; RFQ action follows terms.
- Actual full desktop/mobile and normal crops reviewed, including 320px and text-only 200% states. Independent oil-ui-pro reviewer passed and requested two text reductions; both implemented and independently rechecked on fresh final screenshots. CAD identity and electronic-control boundary remain in their main locations.
- 25 browser checks and empty oil lint/issues passed before the final two sentence removals; fresh full/crop renders checked after them. Project check: 963 files, 0 errors/0 warnings/9 existing hints. No generation/editing claimed.
- Evidence: [desktop](<D:/lzz/site-polish-20261016/p15/final/1440.png>), [mobile](<D:/lzz/site-polish-20261016/p15/final/390.png>), [independent review](<D:/lzz/site-polish-20261016/p15/independent-review.md>), [browser checks](<D:/lzz/site-polish-20261016/p15/validation.json>). Local only.

## P16 — injector and fuel-rail intake manifold: passed
- Corrected: repeated CAD descriptions and scattered injector/rail requirements; four same-weight feature blocks; generic oversized workshop and assembly references.
- Five chapters: design reference/material → three runner, fuel-interface and clearance themes plus one direct separate-test answer → tool-access review → smaller assembly-context comparison → quotation. Three effective sources, 3/5 image chapters.
- Retained p16 design, separate workshop and p14 assembly context sources. No edits/generation; full outlines and actual image identities preserved. Complete STEP/IGES, runner profiles/surface, injector axes/rail locations relative to ports, alignment/position checks, clearance, all separately agreed tests and responsibility remain. Repeated CAD caption removed after screenshot review; old additional-reference anchor retained at its factual location.
- Fresh 1440/390 full pages and normal crops self-reviewed after revision; 320/768/1100 widths and text-only 200% checked. 25 browser checks passed; oil lint/issues empty. Same CAD/assembly review principles previously independently checked on P15/P12, not a new independent review of this page.
- [Desktop](<D:/lzz/site-polish-20261016/p16/final/1440.png>), [mobile](<D:/lzz/site-polish-20261016/p16/final/390.png>), [validation](<D:/lzz/site-polish-20261016/p16/validation.json>). Local only.

## P17 — 进气稳压腔：通过
- 原问题：几何/密封要求重复分散；细节图远离对应条件；辅助工序照与主实物争夺重点。初版又出现高低照片把测试答案推远、表下留白过大的问题，已实际修正。
- 最终五章：实物与材料/处理 → 腔体、端口、密封及独立测试（与两张原始细节共同构图）→ 曲面可达性/独立车间记录 → 总成语境参照 → 询价条件。5个不同有效来源，4/5图文章。
- p17实物、端口、内部曲面、two-stage-first、p14均保留；无生图或生成式修图。端口与内部曲面来自不同原始档案，保留独立来源、未证实同版本/批次/验证序列的说明，不改写为同件拆解或检验。手机先读完整条件与测试答案再看细节；桌面测试答案直接接在表下，图注与图片同宽。
- 体积几何、壁厚、可达性、节气门/流道接口、密封面、法兰、紧固件、分型密封、内外表面条件和全部独立测试范围/条件/限值/责任保留。性能目标不能代替零件定义。重复的压力应用句经独立评审后删除，完整技术条件保留，末章在订单条件后提供草稿操作。
- 1440/390整页和正常尺度局部、320/768/1100及文字字号加倍状态检查；25项浏览器验证通过，oil原始lint/issues为空。独立评审及减法后的定点复核均通过；评审只审静态图，交互另由主Agent的浏览器检查验证。最后纯文案删除后重拍两端，未声称重跑交互。
- 共享组件复查：P12两端与已验收图片逐像素相同；项目检查963文件、0错误/0警告、9个既有提示。
- [桌面截图](<D:/lzz/site-polish-20261016/p17/final/1440.png>)、[手机截图](<D:/lzz/site-polish-20261016/p17/final/390.png>)、[独立评审](<D:/lzz/site-polish-20261016/p17/independent-review.md>)、[交互记录](<D:/lzz/site-polish-20261016/p17/validation.json>)。仅本地，未部署。

## P18 — 铸件壳体与泵体：通过
- 已解决重复且过长的来料开场、分散的基准/检验要求、过大的辅助照片。五章：来料铸件加工对象与材料 → 来料/隐藏特征/成品基准三行完整条件 → 精加工和重建支持 → 更轻的同类壳体/铸件资料 → 询价。3个不同有效来源，3/5图文章。
- 三幅原图保留，不生成铸坯或检验记录。主图完整，辅助装夹照片400px，相关壳体桌面300/手机240px。来料来源/供方/合金条件、余量/允许偏差/保留铸面、缺陷和拒收责任、隐藏花键/通道/轴承接口、量具与报告、基准转移、阶段/CMM及独立完整性检查均保留。图纸不全仍有单独批准阶段；询价不承诺供铸坯。
- 1440/390整页与正常局部自评通过；初版无需进一步改动，正式证据沿用同次真实截图。26项浏览器检查通过，含SEO与旧锚点保留、关键内链、询价上下文、320/768/1100及文字字号加倍；oil lint/issues为空。无新增独立评审，铸件类型已在服务代表页独立复核，本页单独自检。
- [桌面](<D:/lzz/site-polish-20261016/p18/final/1440.png>)、[手机](<D:/lzz/site-polish-20261016/p18/final/390.png>)、[检查记录](<D:/lzz/site-polish-20261016/p18/validation.json>)。仅本地。

## P19 — 带刻字法兰组合件：通过
- 以实际法兰组合件而非历史轴件URL确定职责。已合并重复隐藏尺寸与测试解释，首项几何获得完整行宽，标记/供货两组降为次级；辅助加工和相关柱塞照片缩至合适层级。
- 五章：实物/材料/表面 → 几何、刻字、供货与测试 → 车削及次级特征 → 相关定位柱塞 → 询价。3个不同有效来源，3/5图文章；三张源图保留，无修图/生图。ON/OFF刻字、箭头、螺钉与完整轮廓未改。
- 法兰孔轴、共同基准、隐藏配合/螺纹标准/角向与表面、跳动/螺纹量规、刻字工艺/方向、采购件、装配与独立测试全保留。304/316L/17-4PH为选项，材料记录/工况/处理移到询价输入；刀具磨损与加工硬化保留在工艺句。仍不将照片称为完整阀门/锁止机构。
- 1440/390整页、正常局部自评；320/768/1100及文字字号加倍检查通过。25项浏览器验证和空oil lint/issues通过。沿用本页初次改后截图为final，无新独立评审，不将相似类型评审等同本页独立评审。
- [桌面](<D:/lzz/site-polish-20261016/p19/final/1440.png>)、[手机](<D:/lzz/site-polish-20261016/p19/final/390.png>)、[功能检查](<D:/lzz/site-polish-20261016/p19/validation.json>)。本地，未部署。

## P20 — 非金属与绝缘件：通过
- 已处理首屏过长灰栏、材料/测量状态/FAQ重复、辅助长轴照和绿色参照争主次。五章：实物/材料/表面 → 材料环境、薄壁孔槽、载荷测量、适用验证四行条件 → 原料/热/装夹 → 圆形塑料参照 → 询价。3个不同有效来源，3/5图文章。
- p20源图、PTFE实物和p29原主体/既有AI背景保留；显示已有背景身份，未生成或编辑新图。图注和图同宽，辅助PTFE图260px、绿色参照桌面280/手机240px。
- 材料牌号/填料/原料状态、温湿/化学接触、载荷/安装、调湿/支撑/测温、材料文件/选择限制、薄壁/孔槽/口袋/屏障/边缘验收、独立电气/材料测试与记录完整保留。颜色不证明牌号、电气/光学/食品/医疗适用性的边界保留。FAQ内容已合入相应行，原supply-scope锚点迁到相关技术开场。
- 1440/390整页及正常局部自检通过；320/768/1100和文字字号加倍检查。25项浏览器验证通过，oil lint/issues为空。未新增独立评审，页面自评与此前塑料服务代表页独立评审区分记录。原首版改后画面作为final沿用。
- [桌面](<D:/lzz/site-polish-20261016/p20/final/1440.png>)、[手机](<D:/lzz/site-polish-20261016/p20/final/390.png>)、[验证](<D:/lzz/site-polish-20261016/p20/validation.json>)。仅本地。

## P21 — 塑料机加工形态合集：通过
- 已纠正先讲泛工艺再给选型条件的顺序、首屏材料状态长栏、几处重复解释和相似尺寸辅助图。五章：完整合集/所有材料选项 → 四组配合/状态/使用条件 → 所选牌号的铣车工艺 → 绝缘形态参照 → 报价。3个不同有效来源，3/5图文章；合集算1张。
- 原p21、PTFE轴照、p20均保留，无本轮修图或生图。桌面标题/材料左、完整合集右；手机标题、合集、材料。来源与非套装说明合并为16px可读图注。技术条件提前，手机四组完整纵排。
- PEEK/PTFE/聚酰亚胺/尼龙/acetal-Delrin/HDPE/UHMW/亚克力/聚碳酸酯全部保留，选项不可互换；填料/原料/环境温湿化学接触/载荷安装、调湿支撑测温、干涉配合、表面边缘清洁/材料处理、独立功能和电气/光学/食品/医疗适用性证据要求保留。原measurement-state锚点随相关技术定义迁移，supply-scope保留在完整图注。
- 1440/390整页和正常阅读裁片已自评，320/768/1100及文字字号加倍检查；25项浏览器检查通过，oil lint/issues为空。最终补锚点后重新取两端截图，无新独立评审。
- [桌面](<D:/lzz/site-polish-20261016/p21/final/1440.png>)、[手机](<D:/lzz/site-polish-20261016/p21/final/390.png>)、[验证](<D:/lzz/site-polish-20261016/p21/validation.json>)。未部署。

## P22 — 铸造壳体与结构外壳：通过
- 原重复的第四组要求合回孔/面，保留来料开场的全部责任条件；肋与支撑、轴承孔、安装面三组有各自职责。辅助工序/同类件降权，询价移到订单条件后。
- 五章：实际带肋壳体/材料 → 来料与三组成品接口 → 多轴/镗孔支撑 → 隐藏通道类参照/资料 → 询价。3个有效来源，3/5图文章。三幅原图保留；主图检查源图后仅用6:5显示框去除部分外围白画布，不能裁到上缘，因此未用4:3。已核对两端完整壳体外缘、孔/肋，不改源图，不记为清晰度修复。
- 供坯、来料验收/变差/保留铸面/拒收责任、定义不全的独立批准阶段、合金待定、余量/基准目标、定位/支撑、孔位/关系/配合/对齐与CMM记录、安装/壁厚/功能面和铸态验收全保留。
- 实际初版检查后修正空画布，再拍1440/390整页和正常局部；320/768/1100及文字加倍可读。26项浏览器检查通过，oil原始lint/issues为空。无新增独立评审，已逐页自评。
- [桌面](<D:/lzz/site-polish-20261016/p22/final/1440.png>)、[手机](<D:/lzz/site-polish-20261016/p22/final/390.png>)、[验证](<D:/lzz/site-polish-20261016/p22/validation.json>)。未部署。

## P23 — 从样件补齐铸件壳体定义：通过
- 四个同重且职责重复的卡片改成采购顺序的四行：样件/配合资料 → 铸坯/基准 → 内部接口 → 批准/检验。其余章为实物材料、建模加工支持、同类内部形态、询价，共5章；3有效来源，3/5图文章。
- p23完整竖图、独立装夹记录、p18参照保留，未生成或编辑产品图。主图/图注宽度收敛360px，辅助记录400px，关联件桌面280/手机240px。
- 现有图、样件照片、配合件、需改/保留特征、坯/成品模型、余量/基准、供方和来料验收/变差/拒收责任、铸态保留、剖视/可检性、仅按模型定义的花键及孔面关系、独立图纸批准、孔对齐/花键与首件/过程/最终/出货前检验均保留。材料未知和重建/批准不计入生产排期的边界保持。
- 1440/390整页和正常局部自检，320/768/1100及文字加倍检查；26项浏览器验证通过，oil lint/issues为空。首版改后检查无新可见问题，直接沿用实际截图为final；无新增独立评审。
- [桌面](<D:/lzz/site-polish-20261016/p23/final/1440.png>)、[手机](<D:/lzz/site-polish-20261016/p23/final/390.png>)、[验证](<D:/lzz/site-polish-20261016/p23/validation.json>)。仅本地。

## P24 — 不规则铸件/OEM壳体：通过
- 原问题为主图白画布使主体小、重复来料/工序说明、分散验收要求。五章：实际精加工业务/材料 → 密封面、轴承、安装与余量/缺陷四行条件 → 异形定位 → 深腔壳体参照 → 询价。3有效来源，3/5图文章。
- 检查p24源图后用4:5显示框仅去两侧白画布，完整保留突出连接、法兰、孔与纹理；源文件不改、不生成替代。初版浏览器实际object-fit仍被旧contain规则覆盖，已纠正优先级后重拍，两端完整主体可见。辅助原工序400px，p22参照280/手机240px。
- 来料规格/受控坯和成品图、余量/基准/供方/验收/变差/拒收责任、图纸不全的独立批准；密封几何/平面度/纹理/配合、轴承配合、螺纹/安装关系、壁厚与余量区别、暴露缺陷限值和CMM/量具记录全保留。
- 1440/390整页和正常裁片实际修正后自检，320/768/1100与文字加倍检查；26项浏览器验证通过，oil lint/issues为空。无新增独立评审。
- [桌面](<D:/lzz/site-polish-20261016/p24/final/1440.png>)、[手机](<D:/lzz/site-polish-20261016/p24/final/390.png>)、[验证](<D:/lzz/site-polish-20261016/p24/validation.json>)。仅本地。

P22裁切回查：同样发现旧contain优先级覆盖，已改为实际6:5 cover并重新拍全页/正常局部，完整外缘保留；26项检查及oil检查已重跑通过。以当前final截图为准，前一版不能作为正确裁切的证据。

## P25 — 开口铸件内部接口：通过
- 先泛工序后技术的旧顺序改为先坯/成品定义和法兰/隐藏/测量三主题，第四重复组的模型/来料/CMM要求并回对应位置。共5章：实物材料 → 定义与检验 → 镗铣/基准转移 → 相关铸件资料 → RFQ。3个有效来源，3/5图文章。
- p25完整4:3源图、独立two-stage-first、p18保留，无修图/生图。主图600px、辅助400px、相关280/手机240px形成主次。
- 完整模型或需定义样件、来源/合金状态、余量/基准目标、供坯/来料验收/变差/保留铸面/拒收责任/独立图纸批准；法兰共同基准、模型/剖视限定隐藏花键/通道/流道、量具和可达性、来料文件/材料验证/尺寸验收/CMM、独立流体完整性条件全部保留。
- 1440/390整页和正常裁片自评；320/768/1100及文字加倍检查；26项浏览器验证和空oil lint/issues通过。已检查首版，无额外布局修正，final沿用同次真实渲染。无新增独立评审。
- [桌面](<D:/lzz/site-polish-20261016/p25/final/1440.png>)、[手机](<D:/lzz/site-polish-20261016/p25/final/390.png>)、[验证](<D:/lzz/site-polish-20261016/p25/validation.json>)。未部署。

## P26 — 重复孔塑料条：通过
- 修正主体小且外围空白、材料状态重复、孔位开场混入批次放行要求、辅助图权重过高。五章：条料实物/材料 → 四组几何状态条件 → 低应力装夹与热管理 → 圆形塑料参照 → 完整批次放行/RFQ。3有效来源，3/5图文章。
- 原p26完整组图保留，仅4:3显示裁掉上下白画布，条端和全部孔列可见；PTFE独立实拍与p29原主体/既有AI背景保留并明示身份。无生图或源图编辑。
- 零件号/版本/材料状态/表面/放行数量日期、共享接口/变更权、首件/采样/追溯/不合格处理、预测与订单区别从几何开场全部迁入报价，原supply-scope锚点也迁到该段。填料/温湿/化学接触/载荷安装、调湿支撑测温、孔尺寸/配合/深度/节距/端部关系、逐特征公差且无通用公差、工作面/插入力/装夹/薄壁/口袋/允许修改、稳定性与独立适用性验证全部保留。
- 首次截图发现放行段落贴输入标签，补24px间隔后重拍；1440/390整页及正常裁片自评通过。25项浏览器检查、320/768/1100、文字加倍与空oil lint/issues通过；无新增独立评审。
- [桌面](<D:/lzz/site-polish-20261016/p26/final/1440.png>)、[手机](<D:/lzz/site-polish-20261016/p26/final/390.png>)、[验证](<D:/lzz/site-polish-20261016/p26/validation.json>)。本地，未部署。

## P27 — 铜与黄铜车削件：通过
- 原泛业务/批次开场错放功能选择区，替代材料FAQ和正文重复，三处同类说明分散。现五章：业务及完整源图/选项 → 功能合金、接触镀层、螺纹配合三行表 → 软金属路线与控制 → 相关连接形态 → 批次/RFQ。3有效来源，3/5图文章。
- p27、turn-mill-operation、p07三幅原图保留，无本轮修图/生图；主图480px，辅助420px，相关合集340/手机300px，全部形态可辨。原照不转成库存/订单/实测性能证明。
- C36000、碲铜及其他选项、各可接受牌号/标准/限制、导电/密封/机械/传热用途、尺寸、接触/密封边缘/镀层后尺寸、功能测试条件/限值且无已测电气/压力结果、配合件/螺纹/紧固/量规/毛刺/表面，以及进给/去毛刺变形控制保留。替代FAQ合并功能/镀层表；完整批次段与supply-scope锚点迁到RFQ。
- 1440/390整页和正常局部复核，将泛小标题改成Threads & mating parts；320/768/1100及文字加倍、25项浏览器检查与空oil lint/issues通过。无新增独立评审。
- [桌面](<D:/lzz/site-polish-20261016/p27/final/1440.png>)、[手机](<D:/lzz/site-polish-20261016/p27/final/390.png>)、[验证](<D:/lzz/site-polish-20261016/p27/validation.json>)。本地，未部署。

### P28 小批量壳体参照（已完成）
- 原问题：首屏未直接解释按图分批采购；技术要求重复，流程段落与询价重复；首图实际边缘与图注偏移。
- 实改：按图零件与材料 → 三行零件/接口/放行要求表 → 跨零件工艺审阅 → 较小相关参照 → 询价与交期条件。合并重复工艺/放行文字，保留每项修订、材质、数量、FAI、抽样、追溯、报告、不合格处理、预测非订单条件。3张真实照片保留，分别注明不能证明订单或共同修订；未生图修图。
- 验证：5章，3张有效图片，3/5图文章；1440/390整页和正常尺度局部检查，最终高度3446/5603，无溢出。25项浏览器检查通过，含320px与200%文字、原SEO/JSON-LD/锚点/内链、菜单及邮件草稿。独立评审通过，两项精修已复核解决。Astro check：963文件，0错误0警告9既有提示。未部署、未发送。
- 证据：D:/lzz/site-polish-20261016/p28/final/；validation.json；independent-review.md。

### P29 圆形塑料件（已完成）
- 问题：重复的聚合物状态撑高首屏，四项技术说明重复厚度/装夹，辅助图片与主体同样抢眼。
- 实改：两项几何并排、一项完整材料/测量状态全宽；把既有温湿度、化学接触、适用性及独立试验限制迁移集中；工艺按接触力/支撑解释，独立PTFE照片260px，相关长条图片4:3仅裁空白。原主体+既有AI背景的身份保留，3来源无新生成/修图。
- 纠正：首轮功能检查发现迁移遗漏 supply-scope，已恢复原锚点并重新检查。5章、3有效图、3/5图文章；1440/390最终3419/5905，正常尺度相关区完整保留所有零件边缘，25项浏览器检查通过；oil-ui-pro原始检查无错误。未部署。
- 证据：D:/lzz/site-polish-20261016/p29/final/；validation.json；oil-review/。

### P30 开放式铝壳体（已完成）
- 原问题：首图和图注宽度不一致，几何四项重复，批次计划过早插入，相关说明将未确认盖板/垫片与照片绑定。
- 实改与叙事：5章：按图壳体/材质→腔体安装、壁厚条件斜面、重复装夹最终状态三主题→应力与一致夹具→小幅相关参照→含完整批次条件的RFQ。合并平面度/孔位/抽样报告，保留所有首次件/追溯/不合格和预测非订单限制；询价先条件再草稿。
- 图片：3张真实原图保留；首图460、加工460、相关300，完整结构不裁切；无新生成/润色。
- 验证：5章，3个有效图文件，3/5图文章；1440/390整页与正常尺度局部已自审，最终高度3356/5953；25项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；oil-ui-pro原始检查无错误。
- 未解决：无本页阻断问题；仅本地修改，未部署、未发送询盘。
- 证据：D:/lzz/site-polish-20261016/p30/final/；validation.json；oil-review/。

### P31 旋转组件与法兰（已完成）
- 原问题：四项技术内容重复，工艺单句+两条重复说明，首图和关联装配图层级相近。
- 实改与叙事：按图旋转件/组成和材质→轴线、标识供应、处理后三行验收表→按钢种选刀具/热/去毛刺→较小法兰装配参照→询价条件后草稿。隐藏螺纹/密封、跳动量规并入几何；所有独立功能试验规程/限值/负责方集中，303/304/316L/17-4PH及非全316L限制均保留。
- 图片：首图480、独立车后铣440左置、相关340；3真实来源、原标识与全部零件保留；无生成/修图。
- 验证：5章，3个有效图文件，3/5图文章；1440/390整页与正常尺度局部已自审，最终高度3638/5974；25项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；oil-ui-pro原始检查无错误。
- 未解决：无本页阻断问题；仅本地修改，未部署、未发送询盘。
- 证据：D:/lzz/site-polish-20261016/p31/final/；validation.json；oil-review/。

### P32 定位柱塞与锁定销（已完成）
- 原问题：组件供应与FAQ重复、第四项重复配合/弹簧/量规，首屏输入文字和技术章反复。
- 实改与叙事：保持可见外部结构与未证实内部弹簧/行程/力边界；三项几何/安装/实际供货组织取代重复四项+FAQ，完整回答已合入组件范围。按图采购、验证责任、材料和处理选项完整；第二次截图后把首图输入说明迁移至技术章，仅留下照片证据边界。
- 图片：主图600、独立车后铣420、相关法兰340，3真实照片完整保留，无修图/新生成。
- 验证：5章，3个有效图文件，3/5图文章；1440/390整页与正常尺度局部已自审，最终高度3276/5725；25项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；oil-ui-pro原始检查无错误。
- 未解决：无本页阻断问题；仅本地修改，未部署、未发送询盘。
- 证据：D:/lzz/site-polish-20261016/p32/final/；validation.json；oil-review/。

### P33 口袋铝壳体（已完成）
- 原问题：手机原始整组照片先于接口答案、批次条件抢占技术开头、上下文重复、图文记录左缘松散。
- 实改与叙事：首屏实物和材质→两行完整安装/条件性密封与处理验收表+原始整组→薄壁加工→小幅相关壳体→完整批次条件RFQ。手机先技术答案后辅助整图，盖/垫片以实际需要为条件，IP等级仍需目标试验。把重复电子音响描述并入有意义采购条件，保留集中资料链接。按独立评审进一步统一加工记录图/图注/标题/说明440px对齐组。
- 图片：4有效文件、3去重原始来源；单件裁片与完整组照合计一个来源。主380、整组320/手机280、加工440、相关280；真实来源均保留，没有生成或改变产品。
- 验证：5章，4个有效图文件，4/5图文章；1440/390整页与正常尺度局部已自审，最终高度3422/6336；26项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；独立静态评审通过；可选记录对齐已修正并重新截图、26项功能重检；Astro check 963文件0错误0警告9既有提示。
- 未解决：无本页阻断问题；仅本地修改，未部署、未发送询盘。
- 证据：D:/lzz/site-polish-20261016/p33/final/；validation.json；oil-review/。

### P34 试生产组件参照（已完成）
- 原问题：重复短引言与第四项要求，日期在工艺和询价反复，当前图与两张辅助图权重近似。
- 实改与叙事：按图服务/逐件材料→材料、修订、每次放行三行表→跨零件程序夹具协调→小幅相关壳体→RFQ。功能配套、首件报告内容及生产中特征检查合入完整行，初次批准/抽样/追溯/不合格/预测非订单全保留；询价条件先于草稿。
- 图片：3真实来源保留，首480、独立壳体图文同宽420左置、相关300；未把成排照片解释成订单或产能，未生成/修图。
- 验证：5章，3个有效图文件，3/5图文章；1440/390整页与正常尺度局部已自审，最终高度3483/5826；25项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；oil-ui-pro原始检查无错误。
- 未解决：无本页阻断问题；仅本地修改，未部署、未发送询盘。
- 证据：D:/lzz/site-polish-20261016/p34/final/；validation.json；oil-review/。

### STUDIES-INDEX 加工示例目录（已完成）
- 原问题：手机在两个大幅近似机床图后才看到其余入口；首次压缩成并排图后，独立复核指出工件辨识度不足；放大文字图注碎词。
- 实改与叙事：4章：突出双装夹→5个具体加工问题→2个独立材料组→一次RFQ。手机按任务名+缩略图选择；双装夹经独立评审退回后改成纵向近景显示，保留工具/工件/中央夹具；320普通图扩大240px，图注简为来源照片，支持文字换行。所有8条入口和显示器尺寸/材料组非订单边界保留。
- 图片：9个真实来源保留；双装夹手机16:9局部显示裁去外围机床，未改源图结构。sizes按实际放大图位选择源文件，避免低分辨率响应图被放大。无生成/修图。
- 验证：4章，9个有效图文件，3/4图文章；1440/390整页与正常尺度局部已自审，最终高度3339/4480；29项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；29项浏览器检查通过；独立静态评审先未通过，修正三项后定点复核通过。P33共享图片组件回归两端像素一致。
- 未解决：无本页阻断问题；仅本地修改，未部署、未发送询盘。
- 证据：D:/lzz/site-polish-20261016/studies-index/final/；validation.json；oil-review/。

### TWO-STAGE-CNC-MILLING 两次铣削装夹过程（已完成）
- 原问题：首屏整图与后文同源裁片重复展示，技术答案被成段图片推远，工序和终验重复介绍。
- 实改与叙事：按实际理解组织4章：第一次定位→重新装夹/保留基准→两次加工后验收→原6项询价输入与3个集中资料入口。每个装夹来源只展示一次；原重复开场并入对应步骤。独立评审后再合并重复的基准传递短句。所有旧18锚点及原quoteHref保留；夹持限制/保护面/刀具可达性/跨工序关系/首阶段不能替代终验/材料及测量状态/采样报告不丢失。
- 图片：3独立真实来源：两张既有忠实原始裁片+CMM设备照。没有新生成/编辑；CMM明确不是本件检验结果。手机先答案后CMM辅助照。
- 验证：4章，3个有效图文件，3/4图文章；1440/390整页与正常尺度局部已自审，最终高度3200/5153；24项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；独立静态评审通过，可选重复短句已合并并定点复核关闭；24项最终浏览器验证通过；Astro check 964文件0错误0警告9既有提示。
- 未解决：无本页阻断问题；仅本地修改，未部署、未发送询盘。
- 证据：D:/lzz/site-polish-20261016/two-stage-cnc-milling/final/；validation.json；oil-review/。

### FIVE-AXIS-MACHINING-MULTI-FACE-PARTS 五轴多面加工示例（已完成）
- 原问题：操作整图与同源近景重复；独立成品alt暗示同一加工序列；成品/CMM图注挤在窄双列；旋转模式限制作为零散小字重复。
- 实改与叙事：4章：独立成品形态→转台操作与三项可达性/基准/运动审阅→完整验收表及CMM→6项图纸输入与集中3入口。每个来源仅显示一次。将完整运动模式/照片不能证明连续五轴的边界并入对应技术段；验收第三行明确材质和订单记录，保留可达公差需审图/方法/保护面/模型/采样及终态条件。手机先验收答案后CMM。
- 图片：3真实来源保留：独立成品图360/手机300、操作近景460、CMM230；各自身份明确，成品图alt纠正为独立形态，未生成/修图或改变结构。
- 验证：4章，3个有效图文件，3/4图文章；1440/390整页与正常尺度局部已自审，最终高度3232/5900；24项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；独立静态复核通过，可选重复来源短句已删除；24项浏览器检查通过后仅删该重复句，最终两端重新截图。Astro check 964文件0错误0警告9既有提示。
- 未解决：无本页阻断问题；仅本地修改，未部署、未发送询盘。
- 证据：D:/lzz/site-polish-20261016/five-axis-machining-multi-face-parts/final/；validation.json；oil-review/。

### TURNING-THEN-MILLING-CYLINDRICAL-PARTS 车削后铣削示例（已完成）
- 原问题：整图与近景同源重复，圆形成品与CMM图注挤窄列，动力刀具答疑过晚进入询价。
- 实改与叙事：4章：真实车后铣近景→独立圆形成品配轴线/轴向/角向及二次加工步骤和动力刀具答疑→左侧三项最终验收配右侧CMM→6项询价输入和3条集中资料链接。移除重复来源解释，FAQ原锚点随答案迁移；保留全部18个旧锚点及SEO。轴向/径向/角向、跳动、毛刺/密封滑动/螺纹、最终表面条件和报告完整。
- 图片：3真实来源各展示一次，既有加工裁片600、独立圆形参照320、CMM230；来源清楚，未生成/修图、未改变结构。
- 验证：4章，3个有效图文件，3/4图文章；1440/390整页与正常尺度局部已自审，最终高度3202/5952；24项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；oil-ui-pro原始检查无错误。
- 未解决：无本页阻断问题；仅本地修改，未部署、未发送询盘。
- 证据：D:/lzz/site-polish-20261016/turning-then-milling-cylindrical-parts/final/；validation.json；oil-review/。

### MILLING-A-POCKETED-ENCLOSURE-FORM 口袋壳体铣削示例（已完成）
- 原问题：同源操作整图/近景重复，成品和CMM挤窄图列，技术开场重复且旧高优先级样式使正文列偏窄。
- 实改与叙事：4章：独立实物左置开篇→壁厚/圆角/支撑三项审阅左置与真实加工近景右置→腔体、安装孔和处理后完整验收表+CMM→原6询价输入及3集中入口。手机先技术与验收答案；修正桌面旧样式覆盖，技术列取得实际较大行宽。内角允许修改/余量/保护面/平面度密封面/终态测量与独立密封测试保留，原SEO与锚点保留。
- 图片：3真实来源各展示一次；成品360/手机300，操作既有裁片460，CMM230。照片不能确定材质/腔深/壁厚的限制纳入图注。无生成/编辑或结构改变。
- 验证：4章，3个有效图文件，3/4图文章；1440/390整页与正常尺度局部已自审，最终高度3126/5854；24项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；oil-ui-pro原始检查无错误。
- 未解决：无本页阻断问题；仅本地修改，未部署、未发送询盘。
- 证据：D:/lzz/site-polish-20261016/milling-a-pocketed-enclosure-form/final/；validation.json；oil-review/。

### MILLING-PRISMATIC-COMPONENTS 棱柱零件铣削示例（已完成）
- 原问题：同源操作整图和裁片重复，独立成品与CMM挤窄列，缺少孔腔与安装面之间的重点。
- 实改与叙事：4章：宽幅真实操作与直接答案；三项定位面、可达方向和零件号审阅配独立成品；三项完整验收与CMM；原6项询价输入及3集中入口。手机先技术答案后辅助照片。原尺寸/配合、基准、装夹限制、平面度/腔深/终态、零件号修订/数量/检验记录均保留；原SEO和锚点完整。
- 图片：3真实来源各出现一次：既有操作裁片760px、独立形态320px、CMM230px。没有生成或修图，未改变零件结构；不能由照片推断抽样与尺寸一致性的限制保留。
- 验证：4章，3个有效图文件，3/4图文章；1440/390整页与正常尺度局部已自审，最终高度3315/5741；24项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；oil-ui-pro原始检查无错误。
- 未解决：无本页阻断问题；仅本地修改，未部署、未发送询盘。
- 证据：D:/lzz/site-polish-20261016/milling-prismatic-components/final/；validation.json；oil-review/。

### DISPLAY-HOUSING 显示器壳体加工示例（已完成）
- 原问题：原视频独占验收章末尾大片空白，工艺与记录脱节，手机先越过两面照片才能读到验收条件，询价资料重复分散。
- 实改与叙事：4章：面板与实际尺寸边界；操作照和原视频成组、下接支撑/可达性/最终状态三项；完整验收及两面参照；6项RFQ与3集中资料。首轮视频纵排造成空白，第二轮改为桌面横向记录组并校齐技术栏，手机先答案。支撑/薄壁/夹持限制、平面度测量状态、蒙蔽接口/处理后尺寸及外观均保留，29英寸不是加工尺寸上限。
- 图片：3真实照片各出现一次（面板520、操作520、两面300）及原18秒视频（桌面180/手机220）；无生成或修图。实际两端播放视频成功，时长18.454秒、原生控制及时间推进正常；原视频不作为检验记录。
- 验证：4章，3个有效图文件，3/4图文章；1440/390整页与正常尺度局部已自审，最终高度3335/6341；25项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；独立静态视觉复核通过，无必须返修项；主Agent另行完成两端实际视频播放验证；Astro check 964文件0错误0警告9既有提示。
- 未解决：无本页阻断问题；仅本地修改，未部署、未发送询盘。
- 证据：D:/lzz/site-polish-20261016/display-housing/final/；validation.json；oil-review/。

### PLASTIC-COLLECTION 塑料零件集合（已完成）
- 原问题：PTFE多幅照片及视频分散占高，亚克力近似照片重复，原视频加载状态干扰静态阅读，手机选型答案被辅助媒体推后，共性条件字号偏小。
- 实改与叙事：5章按PTFE供料与配合、POM齿与毂、PE路径与滑动面、亚克力外观与光学界面、共性条件及RFQ组织。PTFE三图/原视频与亚克力近景/原视频分别成组；手机主照片后直接读条件再看辅助记录。4真实照片+4原始视频帧的播放入口，播放时替换预览而不重复展示。保留实心PTFE/金属涂覆/包覆范围、温湿/载荷/化学、光电/食品医疗及测量记录等完整条件。仅省去亚克力重复圆件集合照，圆件和独立矩形件范围说明保留。共性条件16px/1.65，原RFQ、SEO和锚点完整。
- 图片：保留4张独立真实照片和4个原视频预览帧（预览帧不是新增拍摄，也不与本视频重复计数）；4/5模块图像与文字结合，照片本身已满足至少3张。原图/原片不编辑、不生成。8次两端点击播放、无脚本4个原生视频、模拟媒体失败的提示与原片链接均实际验证。共享视频组件回查显示器页，两端文字/几何/高度/SEO/图片来源均一致。
- 验证：5章，8个有效图文件，4/5图文章；1440/390整页与正常尺度局部已自审，最终高度4981/9084；47项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；独立视觉复核通过，POM/PE手机先读技术条件及放大文字行宽两项可选建议均已落实并定向复核关闭。放大检查明确为正文及视频容器字号×2；已补真实首屏截图，局部不代表整页。Astro check 964文件0错误0警告9既有提示。
- 未解决：无本页阻断问题；仅本地修改，未部署、未发送询盘。
- 证据：D:/lzz/site-polish-20261016/plastic-collection/final/；validation.json；oil-review/。

### METAL-COLLECTION 金属零件集合（已完成）
- 原问题：双图主次不足，手机第二张照片推迟选型条件，黄铜图过大而文字偏窄，清洗来源在多处重复，共性条件正文偏小。
- 实改与叙事：5章保留转动/锁销接口、铝壳、黄铜、清洗记录、共性条件及RFQ。转动照片320/200建立主次；壳体双图成组，下接完整三项参数；黄铜320配较宽技术栏；手机主图后即技术条件，再辅助照片，清洗条件先于视频。只合并清洗重复描述，来源和不能证明清洗方法/最终检验/发货完整保留。配合/螺纹/跳动、材质状态/镀覆终态/遮蔽/数量修订/洁净包装等保留，原6项询价及2资料入口不变。
- 图片：5张真实照片保留，另1个原片海报仅为播放入口，不称新拍摄，不与原片重复计数；4/5图像与文结合，5张照片本身已达数量。没有生成或编辑。47.567秒原视频在1440/390实际点击播放成功，无脚本原生视频可用。
- 验证：5章，6个有效图文件，4/5图文章；1440/390整页与正常尺度局部已自审，最终高度4178/7985；44项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；oil-ui-pro原始检查无错误。
- 未解决：无本页阻断问题；仅本地修改，未部署、未发送询盘。
- 证据：D:/lzz/site-polish-20261016/metal-collection/final/；validation.json；oil-review/。

### FACTORY 工厂与质量（已完成）
- 原问题：检验答案被CMM照片打断，文档示意占位偏大，特殊检查与包装说明重复，设备图注使标题错位，部分说明单行超过100字符。
- 实改与叙事：保留7章：工厂定位与事实、团队/参考产能、设备适配、检验阶段与方法、订单记录/供应商资质、包装交接、RFQ。删除重复开场和无决策增量的AI记录装饰；检验四阶段与方法连续呈现，辅助CMM在手机完整答案之后，桌面210px侧置，1100以下方法取得全宽。订单/资质直接可读；包装询证归交接清单，合并特殊检查重复描述。正文70ch，设备标题对齐。2017/1500m²/40+含支持设备、团队15年、100000件/月参考条件、全部记录/校准/特殊检查/责任及1件/7–14工作日条件不变，原SEO/锚点/RFQ保留。
- 图片：6真实照片保留（2工厂、3设备、1CMM），未编辑/生成证明材料；删除旧AI记录装饰，将旧包装概念换为本轮已生成且清楚标识的通用泡沫分隔包装图，未新增生图。7个来源、5/7图文章；包装图不是LZZ发货记录。
- 验证：7章，7个有效图文件，5/7图文章；1440/390整页与正常尺度局部已自审，最终高度6628/12024；54项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；独立静态复核通过，两项重复措辞已修正并定向复核关闭。54项浏览器验证通过后仅删除两处重复短句，最终两端重新截图；另确认3个供应商邮件/下载链接保持，未发送邮件。Astro check 964文件0错误0警告9既有提示。
- 未解决：当前ISO证书/范围、设备及校准资料、产能统计和本单包装需公司另行提供，页面已明确确认条件，未虚构证据。仅本地修改，未部署、未发送询盘。
- 证据：D:/lzz/site-polish-20261016/factory/final/；validation.json；oil-review/。

### RESOURCES-INDEX Resources 总览（已完成）
- 原问题：三分类各用两段近义介绍，FAQ范围和分组重复；结尾多层留白叠加，降低目录查找效率。
- 实改与叙事：保留已确认三级结构、3个分类入口和询价草稿。RFQ完整列准备/比较/批准/复购/包装运输；技术明确图纸、材料处理与工艺选择；FAQ保留15问及具体覆盖范围，分组说明回到FAQ页。每项合为单段，1040容器和左右对齐保留，手机标题后直接读范围；仅本页结尾底部留白收至32px。
- 图片：按DESIGN已确认的资料目录例外：2核心职责（分类选择、询价草稿）加紧凑介绍，0图，不强凑4–7展示章或3张装饰图片。未生成/编辑图片。
- 验证：2章，0个有效图文件，0/2图文章；1440/390整页与正常尺度局部已自审，最终高度1369/2351；22项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；oil-ui-pro原始检查无错误。
- 未解决：无本页阻断问题；仅本地修改，未部署、未发送询盘。
- 证据：D:/lzz/site-polish-20261016/resources-index/final/；validation.json；oil-review/。

### ORDERING-DIRECTORY RFQ 与订购目录（已完成）
- 原问题：4阶段标题与5文章标题多次同义重复，手机选路被额外标签打断，责任链接拆散到下一行，结尾留白叠加。
- 实改与叙事：3核心职责：5个指南选择、2份空白工作表、询价草稿及责任入口。五个文章各保留一个链接H2，按准备/比较/批准/复购/运输顺序排列，完整摘要不减；原4阶段及标题锚点保留。责任句缩短，完整How we work名称不拆；本页底部留白32px。已确认三级结构、5个URL及SEO/ItemList不变。
- 图片：DESIGN已确认的资料目录例外，3职责加紧凑介绍、0图，不凑展示章节或装饰图。两份工作表实际点击下载成功（779/1018字节），不是完成的检验记录；无图片生成或编辑。
- 验证：3章，0个有效图文件，0/3图文章；1440/390整页与正常尺度局部已自审，最终高度1750/2980；28项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；独立静态视觉复核通过，无必须或可选返修项。实际下载与28项浏览器验证由主Agent另外完成；未发送询盘。
- 未解决：无本页阻断问题；仅本地修改，未部署、未发送询盘。
- 证据：D:/lzz/site-polish-20261016/ordering-directory/final/；validation.json；oil-review/。

### RFQ-CHECKLIST CNC 询价清单（已完成）
- 原问题：验收工作表脱离检验条件，独立记录概念图重复，手机按样件说明落在辅助图后，页内定位被两层偏移推离标题。
- 实改与叙事：5章：先复制10字段简报，再图纸与检验、材料处理、数量与交付，最后询价及2篇下一步。验收工作表归入图纸检验；样件未知材质及处理的边界先于辅助图；页内定位保留110px页头空间。复制失败明确提示并提供手动或保存路径，无脚本禁用复制并说明下载。数值、条件、责任、原内链及SEO完整保留。
- 图片：保留图纸/材料2张既有AI辅助概念，交付使用本轮已生成包装概念（同一个来源复用，不新增生成）；删除重复记录概念。3个不同来源，3/5章图文，全部标明AI非真实订单或证明。
- 验证：5章，3个有效图文件，3/5图文章；1440/390整页与正常尺度局部已自审，最终高度4040/6725；48项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；独立视觉复核通过，可选复制失败提示已落实并复核关闭。48项浏览器验证；5种复制/无脚本状态及4次实际下载通过。剪贴板用模拟API测试处理逻辑，未访问宿主剪贴板；390px pre字号加倍局部另有截图，非OS级缩放。
- 未解决：无本页阻断。空白工作表不是检验报告；邮件草稿未实际发送。
- 证据：D:/lzz/site-polish-20261016/rfq-checklist/final/；validation.json；oil-review/。

### COMPARE-CNC-MACHINING-QUOTATIONS 比较 CNC 报价（已完成）
- 原问题：比较标题旁图片制造过大空位；CMM辅助照片过重且挤窄例外说明；手机导航重复完整长标题。
- 实改与叙事：5章依次统一比较基准、8行范围表、例外确认、留档、询价及后续。定义图归开场，比较标题直接接表；CMM收敛14em，留档改220px图左正文右，手机正文先读。短导航保留全标题及旧锚点。简化重复开场词，所有技术、价格、商务、变更条件保留。
- 图片：3不同来源全部保留：2张原有明确AI定义/记录概念与真实CMM；3/5图文。无新生成或结构编辑。
- 验证：5章，3个有效图文件，3/5图文章；1440/390整页与正常尺度局部已自审，最终高度3236/6667；40项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；主Agent逐轮查看整页及正常尺度局部，修复锚点参与网格造成的开场空行；40项浏览器验证，oil-ui-pro两端无错误。沿已独立验证的指南设计，自审，未另作本页独立评审。
- 未解决：无本页阻断问题；仅本地修改，未部署、未发送询盘。
- 证据：D:/lzz/site-polish-20261016/compare-cnc-machining-quotations/final/；validation.json；oil-review/。

### MACHINED-PROTOTYPE-APPROVAL-CHECKLIST 样件批准指南（已完成）
- 原问题：验收表被辅助CMM图推后；批准记录大图挤压四组重要字段；页内导航重复长句。
- 实改与叙事：5章：用途与责任、7项验收表、批准记录、批次放行、询价与后续。删除表前装饰设备图，检查内容直接呈现；真实样件照收敛280px；记录概念240px与横向完整字段组合，1100以下正文先读；短导航保留原目标。所有用途、限制、三种状态、修订与批次条件保留。
- 图片：保留两张不同真实壳体原照与一张明确AI记录概念，3源3/5图文；不把样件图当成本批交付证明，无新增生成或修图。
- 验证：5章，3个有效图文件，3/5图文章；1440/390整页与正常尺度局部已自审，最终高度3689/7182；45项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；1440/390整页及正常尺度局部自审通过；45项浏览器检查，oil-ui-pro无错误。沿已验证指南设计，自审未另派独立评审。
- 未解决：无本页阻断问题；仅本地修改，未部署、未发送询盘。
- 证据：D:/lzz/site-polish-20261016/machined-prototype-approval-checklist/final/；validation.json；oil-review/。

### PROTOTYPE-VS-SMALL-BATCH-CNC 首次样件到复购批次（已完成）
- 原问题：对照和放行两个表头图位制造空白；CMM过重，采购条件被压窄；长导航复述标题。
- 实改与叙事：5章依次样件/批次对照、批次规格、修订放行、下次订单、询价后续。对照表直接呈现；CMM13em，修订图220px与完整三阶段表并排，1100以下答案先读。短导航保留原锚点。保留1件、7–14工作日起算/含处理/运输另计、路线与记录条件、变化和异常责任。
- 图片：保留真实CMM及既有AI记录/包装概念3源3/5图文；删除表头重复壳体装饰。无新生成、无伪造订单证明。
- 验证：5章，3个有效图文件，3/5图文章；1440/390整页与正常尺度局部已自审，最终高度3886/7290；47项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；1440/390整页与正常尺度局部自审通过；47项浏览器验证，oil-ui-pro无错误；本页未另派独立评审。
- 未解决：无本页阻断问题；仅本地修改，未部署、未发送询盘。
- 证据：D:/lzz/site-polish-20261016/prototype-vs-small-batch-cnc/final/；validation.json；oil-review/。

### CUSTOM-CNC-PARTS-SHIPPING-CHECKLIST 包装与运输指南（已完成）
- 原问题：时间和费用责任埋在三个段落；图片占位分散且责任说明窄；长导航重复标题。
- 实改与叙事：5章保护标签、时间责任、文件、历史包装、询价。三个原段落完整转为生产到货/术语费用/运输方式字段；正文获得宽行长，历史辅助照12em随文字放大增长；档案细节340px。保留所有术语版本地点、DDP仅报价包含、费用税险、承运、起算和记录条件。
- 图片：全部4源保留：1张明确AI包装概念，3张2022真实历史装载/包装/保护照片；4/5图文。照片不称完成交付或当前标准，无新增生成或编辑。
- 验证：5章，4个有效图文件，4/5图文章；1440/390整页与正常尺度局部已自审，最终高度3345/5824；45项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；1440/390整页及局部自审、45项浏览器验证、oil-ui-pro通过；图注随字号增长而扩宽，非OS级放大。未另派本页独立评审。
- 未解决：无本页阻断问题；仅本地修改，未部署、未发送询盘。
- 证据：D:/lzz/site-polish-20261016/custom-cnc-parts-shipping-checklist/final/；validation.json；oil-review/。

### TECHNICAL-GUIDES-DIRECTORY 技术指南目录（已完成）
- 原问题：结尾重复准备询盘说明，参考链接包在较长句内，底部留白叠加。
- 实改与叙事：保留三篇具体技术入口与全部摘要、既有顺序/三级结构/ItemList；参考区改两条明确任务链接，结尾保留邮件草稿边界与询价按钮。底部32px，与已精修目录一致。
- 图片：已确认目录例外，2核心任务加介绍、0图，不添加无关装饰。
- 验证：2章，0个有效图文件，0/2图文章；1440/390整页与正常尺度局部已自审，最终高度1398/2361；25项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；主Agent已查看1440/390整页并核对正常尺度；浏览器验证及oil-ui-pro通过。本页自审，未独立评审。
- 未解决：无本页阻断问题；仅本地修改，未部署、未发送询盘。
- 证据：D:/lzz/site-polish-20261016/technical-guides-directory/final/；validation.json；oil-review/。

### CRITICAL-FEATURES-CNC-DRAWING 关键图纸特征指南（已完成）
- 原问题：技术表前图片隔开问题和答案，放行资料窄列，几何解释出现在放行之后；放大标题存在单字母起行。
- 实改与叙事：5章按功能、6项可测量对照、几何路线、资料放行、询价排列；表格直接读，真实零件260px、材料参照220px，手机答案先读。H1为CNC drawings & critical features避免放大碎词，原SEO标题不变；表内去除叠加空白，所有基准、标准边界、尺寸状态、文件优先级、修订、检验与责任原文块均核对保留。
- 图片：3来源保留：定义/材料2张明确AI概念，1张真实多特征零件；3/5图文。CMM装饰从表前删除，无新生成或编辑。
- 验证：5章，3个有效图文件，3/5图文章；1440/390整页与正常尺度局部已自审，最终高度3740/7113；47项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；独立复核发现放大碎词和可选表格间距，均修正后定点复核通过。47项浏览器验证、oil-ui-pro通过；5篇新精修指南的技术段落/表格/定义字段均与改前逐块核对无丢失。共享RFQ两端整页像素一致；类型检查964文件0错误0警告9既有提示。
- 未解决：无本页阻断问题；仅本地修改，未部署、未发送询盘。
- 证据：D:/lzz/site-polish-20261016/critical-features-cnc-drawing/final/；validation.json；oil-review/。

### CNC-PROCESS-SELECTION CNC 工艺选择（已完成）
- 原问题：表前概念图隔开标题与比较答案；公差说明被过重CMM压窄；手机竖图与链接起点不一致。
- 实改与叙事：4章按几何比较、真实装夹/具体示例、公差条件、询价排列。完整3路线表先读，概念图与表后分度/联动说明并列；CMM14em；短导航保留原目标。自审修正表后链接额外空白和手机竖图对齐。所有轴线/装夹/材料/处理/测量条件及照片不能证明的边界保留。
- 图片：5来源保留：明确AI定义概念、真实车削/铣削/多轴操作及CMM；3/4图文。不改原设备，不由照片推断机型/联动/公差，无新增生成或编辑。
- 验证：4章，5个有效图文件，3/4图文章；1440/390整页与正常尺度局部已自审，最终高度3214/6159；45项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；1440/390整页与正常尺度局部逐轮自审；45项浏览器与oil-ui-pro通过；沿图纸指南独立通过的规则，本页未另派独立复核。
- 未解决：无本页阻断问题；仅本地修改，未部署、未发送询盘。
- 证据：D:/lzz/site-polish-20261016/cnc-process-selection/final/；validation.json；oil-review/。

### MATERIAL-AND-FINISH-CHECKLIST 材料与表面处理指南（已完成）
- 原问题：手机材料图排在选型表前；终态接口被窄三列切碎；处理示意隔断手机五组专业要求。
- 实改与叙事：5章按牌号、最终表面、实体/涂层区别、所需记录、询价排列。接口/尺寸/边缘改宽字段，手机完整5要求先读再图；材料表先读，短导航保留目标。H1更直接且放大无碎词，原SEO不变。全部5类材料/具体牌号/未知条件/非库存及C3600-H62-C36000非默认等同、尺寸状态/方法/溯源/证书范围保留。
- 图片：保留材料、处理、记录3张明确AI辅助视觉与2张真实涂层源照，5源4/5图文。照片保留源集合标签，不推断聚合物或认证；无新增生成/编辑。
- 验证：5章，5个有效图文件，4/5图文章；1440/390整页与正常尺度局部已自审，最终高度4428/8249；49项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；两端整页及正常尺度局部逐轮自审，修正手机技术条件被示意隔断；49项浏览器验证、oil-ui-pro通过。文字放大标题局部另核对；本页未另派独立评审。
- 未解决：无本页阻断问题；仅本地修改，未部署、未发送询盘。
- 证据：D:/lzz/site-polish-20261016/material-and-finish-checklist/final/；validation.json；oil-review/。

### FAQ 采购 FAQ（已完成）
- 原问题：左侧大图片区占用长问答行宽，订购区重复深层条款和询价入口过多，原问答顺排削弱对应关系。
- 实改与叙事：4章保留8/3/4问与询价；桌面问题-答案对齐成行，14em右辅图，1100以下答案先图后；订购6推荐合为3条RFQ/复购/完整订单条款路径，重复询价保留末尾操作，付款样件售后在完整流程页集中访问。全部15问答案、旧页内目标及FAQ schema不变。
- 图片：保留真实多特征零件/CMM与明确AI定义概念，3源3/4图文；不作公差、合规或订单证明，无新增生成/编辑。
- 验证：4章，3个有效图文件，3/4图文章；1440/390整页与正常尺度局部已自审，最终高度3679/7013；45项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；独立静态复核通过，无必须或可选返修；主Agent另完成45项浏览器检查与oil-ui-pro。30个问题/答案文本块及15问数量核对保留，询价仅验证本地草稿。
- 未解决：无本页阻断问题；仅本地修改，未部署、未发送询盘。
- 证据：D:/lzz/site-polish-20261016/faq/final/；validation.json；oil-review/。

### ABOUT-INDEX About 总览（已完成）
- 原问题：法定名称与业务说明层级接近；供应商入口跳过身份介绍；手机来访大图先于标题日期；CMM占用过大空列。
- 实改与叙事：4章企业与真实车间、供应商/流程/联系选路、来访档案、具体询价。业务先讲，完整法定名称作为16px身份说明；供应商到完整profile；任务左侧宽行长、CMM14em右辅图；手机先来访日期标题介绍再原图。询价明确修订/材料/数量/到货输入，保留草稿提示与RFQ清单。
- 图片：真实车间、CMM和客户来访3源保留，3/4图文。未生成或修造证据。
- 验证：4章，3个有效图文件，3/4图文章；1440/390整页与正常尺度局部已自审，最终高度2616/4089；25项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；主Agent查看两端整页及局部，25项浏览器通过；oil-ui-pro无错误。保留一项标题间距提示：12px日期到标题、20px标题到正文，用于把日期与档案标题组成一组，并非两个主题挤压。本页自审未另派独立评审。
- 未解决：来访事件日期沿原资料显示；原档案日期冲突仍按既有证据待核实，未新增或重写事实。
- 证据：D:/lzz/site-polish-20261016/about-index/final/；validation.json；oil-review/。

### COMPANY-PROFILE 企业资料（已完成）
- 原问题：三份文件相同三列卡片挤压说明和日期；CMM与工程入口占位分散；文字放大时首屏最小内容宽度导致横向溢出。
- 实改与叙事：5章企业身份/车间3事实、工程图纸评审、供应商文件、发展人员、询价。工程图210px，入口集中；原文件逐份260px原件＋完整用途与日期行，手机文字先原件后。Purpose去同义分类重复，保留全部持有人/日期/状态。修复首屏minmax和链接换行，三项数据按字号自然换列。
- 图片：6个真实来源全部保留：车间/CMM/3原始认可与教学文件/团体照，4/5图文。无生成或修造；原件不冒充ISO。
- 验证：5章，6个有效图文件，4/5图文章；1440/390整页与正常尺度局部已自审，最终高度4349/7762；35项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；独立静态复核通过，无剩余必须或可选项。主Agent另完成35项浏览器验证、两端整页/局部、放大事实与文件局部、oil-ui-pro；3原件实际打开加载、3旧锚点转接、mailto原值保留，未发送邮件。
- 未解决：现行ISO证书、档案认可当前状态和项目适用性仍按页面说明另行索取，视觉通过不代表这些事实已重新认证。
- 证据：D:/lzz/site-polish-20261016/company-profile/final/；validation.json；oil-review/。

### HOW-WE-WORK 合作流程（已完成）
- 原问题：桌面图片高度拉散采购方和LZZ职责；手机照片插在放行条件之前；阶段导航和摘要边线重复；放大文字需要自然重排。
- 实改与叙事：6章：订单基础、定义与报价、批准与生产、包装交接、商务与售后、首次评审。每阶段三类职责连续阅读，桌面图片独立跨行、手机全部条件在图前。合并商务标题和重复入口，保留55个原段落与标签。摘要在放大时自然折列，首屏重复边线收为一条。
- 图片：保留6个不同来源，4/6图文章；真实铣削、零件、CMM和2022包装，2张既有明确标注的辅助示意。无新生成或修造。
- 验证：6章，6个有效图文件，4/6图文章；1440/390整页与正常尺度局部已自审，最终高度5451/9876；59项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；59项浏览器验证通过。两端整页、局部和200%职责与订单摘要自审，oil原始检查无错误。独立复核通过，唯一可选边线项已修正并经两端截图复核闭环；最后1px边线修改未重复全部功能检查。
- 未解决：无本页阻断问题；仅本地修改，未部署、未发送询盘。
- 证据：D:/lzz/site-polish-20261016/how-we-work/final/；validation.json；oil-review/。

### COMPANY-NEWS 公司新闻目录（已完成）
- 原问题：通用车间首图挤掉新闻入口，最新记录灰框压小图片，组内重复类别和居中竖图分散对齐。
- 实改与叙事：4章：目录与筛选、最新记录、访问与行业活动、团队记录。去掉不承担新闻职责的首图和灰框，最新标题与摄影增大，历史记录以真实日期和具体名称进入正文，归组后不重复类别。保留5篇全部摘要、日期和筛选。
- 图片：5张不同真实新闻封面完整保留，3/4图文章；无生成、修造或证据替代。
- 验证：4章，5个有效图文件，3/4图文章；1440/390整页与正常尺度局部已自审，最终高度2745/4561；27项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；27项通用浏览器检查通过，另7组筛选/无脚本状态通过。两端整页、正常局部和200%正文已检查。独立复核通过，无必须或可选项；oil的4处标题间距提示来自日期与标题成组，保留并记录，不构成可见层级问题。
- 未解决：澳大利亚来访的来源日期与照片日历冲突仍待原始资料确认，未擅自改日期；仅本地修改，无发送和部署。
- 证据：D:/lzz/site-polish-20261016/company-news/final/；validation.json；oil-review/。

### AUSTRALIAN-VISIT 澳大利亚客户来访记录（已完成）
- 原问题：竖幅首图撑高开场，三张参观照同重，桌边图片与标题左线脱节，相关记录过重。
- 实改与叙事：4章：来访概况、车间参观、桌边交流、轻量相关记录。首图300px与文字居中关联，手机270px左对齐；三图主次分明；交流大图820px同左线；推荐只保留小图日期与具体标题，摘要回原文章。
- 图片：7个来源保留（本事件5原照＋2推荐封面）；参观照04仅裁上方空墙，不改源文件、人物、设备和部件；4/4图文章。无AI生成或润色。
- 验证：4章，7个有效图文件，4/4图文章；1440/390整页与正常尺度局部已自审，最终高度2875/3815；24项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；24项浏览器检查及正文/图注保留核对通过。1440/390整页、正常局部和文字放大首屏自审，oil原始检查无问题。独立复核通过，空墙裁切唯一可选项已执行并复核闭环。共享新闻目录两端截图逐像素一致。
- 未解决：7 January 2025来源与照片日历冲突仍待原始材料核实，未改日期或生成替代。
- 证据：D:/lzz/site-polish-20261016/australian-visit/final/；validation.json；oil-review/。

### SUMMIT 中非西湖峰会记录（已完成）
- 原问题：开场大横图推远参会信息，展位双竖图过高，相关内容占据接近主报道的篇幅。
- 实改与叙事：4章：参会概况与横图并排、侧栏介绍与展位双图、会场和入口横图组、轻量相关记录。仅删重复枚举会场照片的一句，信息由相邻原图注承担；推荐摘要回对应文章。保留活动日期和真实参会/展位业务范围。
- 图片：7个真实来源全部保留，本事件5张＋推荐2张，4/4图文章；完整画幅，0生成、0修造。
- 验证：4章，7个有效图文件，4/4图文章；1440/390整页与正常尺度局部已自审，最终高度2761/3746；24项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；24项浏览器检查通过；1440/390整页、正常局部和200%首屏自审，oil检查无错误。正文与图注逐块核对，唯一删句已记录原文与去向。同类文章沿用已独立复核的轻量推荐组件，非本页独立复核。
- 未解决：无本页阻断问题；仅本地修改，未部署、未发送询盘。
- 证据：D:/lzz/site-polish-20261016/summit/final/；validation.json；oil-review/。

### TEAM-2024 2024团队活动（已完成）
- 原问题：长首图、乘车竖图与孤立末图拉长桌面；无正文标题仍受窄侧栏限制；推荐图文压过正文。
- 实改与叙事：4章：雨中合影、出行与用餐、户外片段、相关推荐。乘车小图与用餐大图并置；桥边主图和两张辅助横图构成一组，手机一主两辅。仅推荐摘要回原文章，事件介绍、日期与图注全保留。
- 图片：保留6张活动原照＋2张推荐封面，4/4图文章；乘车照仅在显示框裁去上方空顶棚，不改人物和源文件；无生成、无润色。
- 验证：4章，8个有效图文件，4/4图文章；1440/390整页与正常尺度局部已自审，最终高度2688/3767；24项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；24项浏览器验证及原文/图注核对通过；两端整页与局部、200%正文检查完成。最后照片裁切后重新检查两端，oil原始检查无错误。此页为逐页自审，同类推荐规则已由代表页独立复核。
- 未解决：无本页阻断问题；仅本地修改，未部署、未发送询盘。
- 证据：D:/lzz/site-polish-20261016/team-2024/final/；validation.json；oil-review/。

### TEAM-MAY 2025五月团队活动（已完成）
- 原问题：开场与用餐图过大且标题对齐关系分散，夜间横竖图缺乏共同重心，推荐图片和摘要过重。
- 实改与叙事：4章：标题与短介绍、用餐、夜间街道、相关记录。开场横排文字接800px完整夜景；用餐标题和640px图成组；夜间合影配220px细节，手机细节左对齐。保留全部介绍、日期和图注，推荐摘要回原文章。
- 图片：保留4张本活动原照＋2张相关封面，4/4图文章。无裁切人物、无生成、无润色。
- 验证：4章，6个有效图文件，4/4图文章；1440/390整页与正常尺度局部已自审，最终高度3014/3600；24项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；24项浏览器检查、正文和图注核对通过；1440/390整页及正常局部、200%正文自审，oil原始检查无错误。同类推荐组件已由代表页独立复核，本页为逐页自审。
- 未解决：无本页阻断问题；仅本地修改，未部署、未发送询盘。
- 证据：D:/lzz/site-polish-20261016/team-may/final/；validation.json；oil-review/。

### TEAM-NOVEMBER 2025十一月团队活动（已完成）
- 原问题：首屏照片过高；场地图混入用餐组三列同重；相关推荐比活动内容过重。
- 实改与叙事：4章：活动概况、水边场地、用餐与烧烤、相关推荐。原场地04连同图注迁到横幅合影旁；用餐03与烧烤05独立双图，手机同组并排；首图与事实并置。保留日期、介绍和全部图注，推荐摘要回各自文章。
- 图片：保留5张本活动原照＋2张相关推荐，4/4图文章；原始人物、标识与现场不变，0生成、0修造。
- 验证：4章，7个有效图文件，4/4图文章；1440/390整页与正常尺度局部已自审，最终高度2641/3464；24项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；24项浏览器验证、原文/图注保留核对通过；1440/390整页、正常局部与200%正文自审，oil原始检查无错误。本页为逐页自审，轻量推荐规则已有代表页独立复核。
- 未解决：无本页阻断问题；仅本地修改，未部署、未发送询盘。
- 证据：D:/lzz/site-polish-20261016/team-november/final/；validation.json；oil-review/。

### CONTACT 联系LZZ（已完成）
- 原问题：首屏灰色联系盒占高、同构大示意图抢走任务重点；重复法律全名和较长行宽增加负担。
- 实改与叙事：5章：直接联系、新零件、订单支持、供应商文件、约访。联系方式改为首屏完整一行，手机纵排；新零件260px示意、订单220px辅助图、文件完整宽行、来访文字先于手机图片。首段法律全名缩为LZZ，完整名称保留地址与结构化数据。
- 图片：保留3不同来源：2张既有明确标注AI示意＋1张真实车间照，3/5图文章。无新增或证据编辑。
- 验证：5章，3个有效图文件，3/5图文章；1440/390整页与正常尺度局部已自审，最终高度2124/3934；23项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；23项通用验证＋5组关键入口/地址原值核对通过。1440/390整页与局部、200%首屏自审，独立复核通过无剩余项；oil无错误。两个资料入口实际到达约110px可见位置，邮件/WhatsApp仅核对href，未发送。
- 未解决：无本页阻断问题；仅本地修改，未部署、未发送询盘。
- 证据：D:/lzz/site-polish-20261016/contact/final/；validation.json；oil-review/。

### HOME 正式首页（已完成）
- 原问题：4类实物等重；两次装夹图的主体小且尺度不一；手机链接先于解释图；订单数量和时间条件埋在长段；工厂数字未齐。
- 实改与叙事：5章：定制定位、形态与选路、两次装夹、工厂验收、询价。两大形态配两项辅助形态；装夹使用两张同尺度真实局部，手机先问题与解释、再照片、后链接。工厂条件先读后图，去中间空白带；最小订单与有条件生产窗口显性成行，样件条件先于辅助图；最后重复边线已合并。
- 图片：9个不同原始来源：4实物、2原始装夹照的既有真实裁片、1车间照、2既有明确AI示意；5/5图文章。未新增图片或改造证据，不把原图和裁片另计。
- 验证：5章，9个有效图文件，5/5图文章；1440/390整页与正常尺度局部已自审，最终高度3936/6253；38项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；38项浏览器检查通过；全部正文与字段核对，仅订单条件从段落迁至可见字段。1440/390整页、正常局部、200%首屏自审；独立复核通过，唯一重复边线可选项已修正并闭环。oil检查无错误。
- 未解决：无本页阻断问题；仅本地修改，未部署、未发送询盘。
- 证据：D:/lzz/site-polish-20261016/home/final/；validation.json；oil-review/。

### QUOTE 询价草稿工具（已完成）
- 原问题：手机帮助区缩进，图片重复输入提示；固定64px信封标签列不适合放大；无脚本状态误示等待且邮件回退远离按钮，默认选项在手机被截断。
- 实改与叙事：3工具职责：任务边界、填写/审阅、直接联系和资料参照。帮助区与表单同左线，三图96px轻量行；inspection records要求集中到Message提示；信封共享自适应标签列。复制/存储失败说明给具体动作。无脚本回退紧接按钮，加载状态不再误导；短默认选项仍可留空。
- 图片：保留3来源：1张既有AI定义图、2张真实部件/CMM参照；CMM恢复完整竖幅。0新生成或编辑证据。
- 验证：3章，3个有效图文件，1/3图文章；1440/390整页与正常尺度局部已自审，最终高度1706/3314；20项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；20项通用＋45项工作流检查通过，包含两端校验/审阅/编辑/恢复/清除/复制失败/实际本地下载，存储禁用与无脚本回退、200%审阅标签无重叠。复制成功/失败为模拟，不是系统剪贴板；未激活邮件发送。独立复核必须项与可选项均已修正并闭环，oil无错误。
- 未解决：无本页阻断问题；仅本地修改，未部署、未发送询盘。
- 证据：D:/lzz/site-polish-20261016/quote/final/；validation.json；oil-review/。

### PRIVACY 隐私与网站信息（已完成）
- 原问题：清除截图打断保存与清除说明，实物插在两类资料边界之间；重要正文过灰，页内跳转偏移叠加。
- 实改与叙事：5个原有文档主题保留；先完整读清除动作，再看静态控制截图；产品/指南/文件边界连续读完再看140px实物参照。正文恢复主文字色，统一实际110px定位；布局更新日期如实改为16 October 2026。
- 图片：保留2张真实界面截图＋1张真实零件参照，3/5主题带图。截图继续明确身份，不当作可点击操作；无生成或素材编辑。
- 验证：5章，3个有效图文件，3/5图文章；1440/390整页与正常尺度局部已自审，最终高度2563/4019；45项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；45项浏览器检查通过（含五宽度、5个锚点、200%正文、元数据/JSON-LD、内链与询价入口）。1440/390整页及正常局部已自审；除更新日期外全部原正文和图注逐块核对保留，oil检查无错误。本页为文档型逐页自审，不将其称为法律审查。
- 未解决：无本页阻断问题；仅本地修改，未部署、未发送询盘。
- 证据：D:/lzz/site-polish-20261016/privacy/final/；validation.json；oil-review/。

### NOT-FOUND 404 恢复入口（已完成）
- 原问题：真实不存在的网址会选中旧样式，图片拉伸、正文失去层级；返回首页操作偏弱，below与桌面方向不符。
- 实改与叙事：两个恢复职责：错误及首页操作、三个具体主题入口。404显式指定样式路径，实际请求URL、HTTP404和noindex保留；清晰的品牌色首页操作，两端缩略图保持比例。正常页面默认路径不变。
- 图片：保留真实叶轮、复用已有真实铣削工件裁片、保留明确标注的AI图纸参照。3个不同来源；无新生成或结构编辑。
- 验证：2章，3个有效图文件，1/2图文章；1440/390整页与正常尺度局部已自审，最终高度1098/2044；21项浏览器验证通过（元数据/JSON-LD/旧锚点、有效内链、窄屏、200%正文、菜单、询价草稿）；21项通用＋38项真实未知URL/共享布局检查通过。直接404、根级及两种深层未知URL均保留404/noindex/原URL，图片不拉伸；首页、联系、铣削两端正文/高度/元数据/图片引用保持。独立视觉复核通过；评审者现场浏览器访问受限，动态功能由主Agent实际Chrome验证。oil原始预期404提示和404状态-标题的16/24px间距已逐条核对，不称为零提示。
- 未解决：无本页阻断问题；仅本地修改，未部署、未发送询盘。
- 证据：D:/lzz/site-polish-20261016/not-found/final/；validation.json；oil-review/。


<!-- SITE_POLISH_FINAL_START -->
## 2026-10-16 全站逐页续修最终交付

本轮从 CNC 铣削页按队列继续实施：82页通过，2页布局已复核但待真实素材，1页铸件页沿用此前验收参考；无待检查业务页。范围为84个业务/政策URL及404，不把独立设计草稿、演示及历史跳转壳计为业务改版页。**不宣称85页全部视觉通过。** 当前构建预览：[本地4325](http://127.0.0.1:4325/)。仅本地实施，无生产部署、推送或真实询价发送。

### 最终内容、图片和布局

- 工艺/材料页先回答适配、可达性、牌号与验收，再给订单输入；11页按真实素材分别精修，铸件页保持前轮6章方向。35个零件详情各自保留规格、加工/处理边界和图纸条件，同形态共用阅读原则而非相同图位；加工记录区按真实装夹、操作、成品形态和批准问题组织。
- 采购/技术指南保留完整表格、方法/限值/记录与责任。Resources总览及两个分类沿用用户确认的三级结构，属于目录例外，无装饰图片配额。FAQ答案直接可见，详细链接按任务集中；企业、工厂和新闻使用原始文件及真实活动记录，概念不冒充证据。
- 首页区分主实物与辅助形态，让两次装夹可比较；联系方式尽早显示；询价页按填写/审阅/帮助三个工具职责组织。隐私五个主题连续阅读。404以错误/返回与三类主题入口恢复任务，不拆营销模块。
- 本轮实际新增并接入 **1张ImageGen包装保护概念**（4个响应尺寸）；重复用于相关页面仍只计1项新素材。保留并使用真实产品、加工、工厂和文件原图，复用已核对的真实裁片；显示裁切、响应尺寸与同源局部不当作新来源。既有AI辅助图保持身份说明。**本轮没有通过验收的新生成式产品修图**；P04此前两次编辑因沟槽/结构或清晰度不能可靠核对而拒绝接入。
- 内容减法集中于重复标题解释、重复图片入口、无用来源导读和重复推荐摘要；实质内容迁移逐页见下方原问题/实改记录。数值、单位、起算条件、技术限制、原锚点、受控图纸与本地草稿性质保留。没有以缩字或隐藏技术正文制造简洁。

### 验证结论与具体边界

| 检查 | 当前结果 | 证据/边界 |
| --- | --- | --- |
| 逐页视觉 | 84项本轮均留有1440/390整页及正常尺度局部；82通过、2待素材；另1项为前轮参考 | 下方每URL的真实截图；不是只用代表页截图推广为全站验收 |
| 普通展示页数量 | 所有本轮标记通过且非任务例外的页面满足4–7章、≥3有效来源、超过半数图文章 | queue.json；P04明确不达标，目录与工具例外另列 |
| 独立评审 | 关键类型41份独立截图评审已留存；其他逐页自审 | 各目录 independent-review.md；部分评审者的现场浏览受限，不替代主流程实际交互 |
| 类型检查 | 964文件：0错误、0警告、9既有提示 | [check-final.log](<D:/lzz/site-polish-20261016/check-final.log>)；提示含社交品牌图标弃用 |
| 构建 | Astro 144页构建成功，含35产品；SEO生成84条sitemap、188历史跳转 | [build-final.log](<D:/lzz/site-polish-20261016/build-final.log>)；构建总数含草稿/演示和跳转，不是业务页数量 |
| 静态链接/资源/H1 | 207个HTML及跳转壳通过 | [static-final.log](<D:/lzz/site-polish-20261016/static-final.log>) |
| 范围内页面/图片/SEO/入口回归 | 85URL×2视口=170次，170个不同站内目标均通过 | [whole-site-regression.json](<D:/lzz/site-polish-20261016/whole-site-regression.json>)；自动DOM/加载检查，不冒充另一次人工视觉评审 |
| 开发与构建版式一致性 | 85URL×2视口对照通过，无可观察几何/字体/正文差异 | [built-comparison.json](<D:/lzz/site-polish-20261016/built-comparison.json>)；全范围对照后，工厂路径限定宽度规则单独补验两端并合并结果；原始失败保留。不把内联脚本压缩差异误算为可见文字变化 |
| 询价草稿 | 开发版连续3轮，每轮45项通过；最新构建版另45项通过 | quote/workflow-final-{1,2,3}.log、quote/workflow-built-final.log及quote/built-workflow/；含校验、预填、审阅/编辑、刷新恢复/清除、存储禁用、无脚本回退、复制失败和实际本地文本下载。复制成功为模拟，未验证系统剪贴板；未激活发送 |
| 其他交互 | 逐页锚点、手机导航/Escape、询价来源；目录筛选/返回/空状态、指南工具、新闻过滤及原始视频 | 各页 validation.json 及专用功能记录；200%为明确的CSS文字放大，非操作系统缩放 |
| 404 | 直接页与真实未知URL在开发端正确；构建预览未知URL实际404，无canonical、noindex，图片正常 | not-found/recovery-validation.json、built-missing-preview；静态预览直接请求404.html文件本身返回200，和未知URL404分别记录，未改托管配置 |
| 完整项目SEO脚本 | **未全绿：1个范围外旧预览缺description** | [seo-final.log](<D:/lzz/site-polish-20261016/seo-final.log>)：public/design-previews/factory-20261016/index.html为既有noindex,nofollow三版对照，保持原文件不动。范围内85URL的元数据/JSON-LD/规范链接已单独核对 |
| 旧全量UI脚本 | 未作为本轮验收入口 | verify.mjs浏览器分支及verify-refinement.mjs仍找旧product-card、旧搜索/表单按钮和旧字段；保留脚本，采用当前实际入口的专用浏览器验证，不声称旧脚本全通过 |

### 明确未完成/需真实资料

1. **P04及受其影响的零件目录：**P04只有2个有效不同来源、2/5图文章；低清整体图不计有效，拒绝的AI编辑未接入。需要同一零件的清晰完整实拍及接口/孔槽特写；目录布局和筛选已通过，但P04缩略素材仍待补。
2. **原始事实核对资料：**澳大利亚来访记录的来源日期冲突、现行ISO证书持有人/范围/有效期、当前设备/校准/检验记录仍按页面提示索取或核对。视觉改版没有生成这些事实，不以旧照片证明当前产能。
3. **范围外预览SEO：**上表旧工厂设计对照缺description。未修改该独立草稿，也未部署任何内容。

### 逐URL模块、有效图片与截图索引

有效图片按原始来源去重，响应尺寸、同源裁片和视频海报不重复计数；低清源不计。正文模块职责及顺序直接取最终页面，不以卡片或FAQ条目凑章。

| 顺序 | 实际URL | 核心模块数与阅读职责 | 有效图片来源 | 图文章/总章 | 状态 | 前后截图与图片动作 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [/capabilities/cnc-milling-service/](http://127.0.0.1:4325/capabilities/cnc-milling-service/) | 7：service → parts → setups → drawing → materials → inspection → quotation | 7 | 5/7 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/cnc-milling-service/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/cnc-milling-service/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/cnc-milling-service/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/cnc-milling-service/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/cnc-milling-service/images.json>) |
| 2 | [/capabilities/cnc-turning-service/](http://127.0.0.1:4325/capabilities/cnc-turning-service/) | 6：service → features → operations → parts-and-materials → inspection → quotation | 7 | 5/6 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/cnc-turning-service/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/cnc-turning-service/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/cnc-turning-service/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/cnc-turning-service/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/cnc-turning-service/images.json>) |
| 3 | [/capabilities/5-axis-cnc-machining/](http://127.0.0.1:4325/capabilities/5-axis-cnc-machining/) | 6：service → route-and-setup → forms-and-features → materials → inspection → quotation | 6 | 4/6 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/5-axis-cnc-machining/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/5-axis-cnc-machining/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/5-axis-cnc-machining/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/5-axis-cnc-machining/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/5-axis-cnc-machining/images.json>) |
| 4 | [/capabilities/plastic-machined-parts/](http://127.0.0.1:4325/capabilities/plastic-machined-parts/) | 7：service → polymer-selection → part-forms → support-and-access → source-collection → inspection → quotation | 7 | 5/7 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/plastic-machined-parts/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/plastic-machined-parts/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/plastic-machined-parts/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/plastic-machined-parts/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/plastic-machined-parts/images.json>) |
| 5 | [/capabilities/casting-machining/](http://127.0.0.1:4325/capabilities/casting-machining/) | 沿用前轮6章参考 | 见前轮记录 | 见前轮记录 | 沿用前轮验收 | [前轮截图](<D:/lzz/casting-polish-20261016/review-evidence/page-1440x900.png>) |
| 6 | [/capabilities/aluminum-cnc-parts/](http://127.0.0.1:4325/capabilities/aluminum-cnc-parts/) | 6：service → alloy-and-finish → part-forms → thin-section-support → inspection → quotation | 7 | 5/6 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/aluminum-cnc-parts/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/aluminum-cnc-parts/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/aluminum-cnc-parts/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/aluminum-cnc-parts/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/aluminum-cnc-parts/images.json>) |
| 7 | [/capabilities/stainless-steel-cnc-parts/](http://127.0.0.1:4325/capabilities/stainless-steel-cnc-parts/) | 6：service → grade-and-treatment → part-forms → machining-sequence → inspection → quotation | 5 | 4/6 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/stainless-steel-cnc-parts/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/stainless-steel-cnc-parts/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/stainless-steel-cnc-parts/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/stainless-steel-cnc-parts/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/stainless-steel-cnc-parts/images.json>) |
| 8 | [/capabilities/copper-brass-cnc-parts/](http://127.0.0.1:4325/capabilities/copper-brass-cnc-parts/) | 6：service → function → alloy-and-finish → interfaces → inspection → quotation | 4 | 4/6 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/copper-brass-cnc-parts/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/copper-brass-cnc-parts/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/copper-brass-cnc-parts/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/copper-brass-cnc-parts/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/copper-brass-cnc-parts/images.json>) |
| 9 | [/capabilities/prototype-machining/](http://127.0.0.1:4325/capabilities/prototype-machining/) | 5：service → evaluation-scope → approval-record → production-differences → quotation | 4 | 3/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/prototype-machining/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/prototype-machining/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/prototype-machining/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/prototype-machining/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/prototype-machining/images.json>) |
| 10 | [/capabilities/low-volume-production/](http://127.0.0.1:4325/capabilities/low-volume-production/) | 5：service → release-definition → first-article-and-release → repeat-and-packing → quotation | 4 | 4/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/low-volume-production/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/low-volume-production/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/low-volume-production/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/low-volume-production/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/low-volume-production/images.json>) |
| 11 | [/capabilities/starting-with-a-sample/](http://127.0.0.1:4325/capabilities/starting-with-a-sample/) | 6：service → sample-review → deliverables → material-decisions → inspection → quotation | 4 | 4/6 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/starting-with-a-sample/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/starting-with-a-sample/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/starting-with-a-sample/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/starting-with-a-sample/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/starting-with-a-sample/images.json>) |
| 12 | [/capabilities/](http://127.0.0.1:4325/capabilities/) | 6：starting-point → process-selection → material-selection → project-stage → machining-evidence → quotation | 10 | 4/6 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/capabilities-index/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/capabilities-index/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/capabilities-index/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/capabilities-index/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/capabilities-index/images.json>) |
| 13 | [/machined-parts/](http://127.0.0.1:4325/machined-parts/) | 4：Drawing-based part reference → Choose by part form → How the part is held and reached → Define and enquire | 8 | 3/4 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/machined-parts-index/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/machined-parts-index/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/machined-parts-index/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/machined-parts-index/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/machined-parts-index/images.json>) |
| 14 | [/machined-parts/gallery/](http://127.0.0.1:4325/machined-parts/gallery/) | 4：Gallery introduction → Find and compare reference forms → Covered parts and gear source collections → Machining review and enquiry | 39 | 2/4 | 待补素材（任务例外） | [改前桌面](<D:/lzz/site-polish-20261016/parts-gallery/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/parts-gallery/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/parts-gallery/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/parts-gallery/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/parts-gallery/images.json>) |
| 15 | [/machined-parts/gallery/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/](http://127.0.0.1:4325/machined-parts/gallery/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/) | 5：Part, material and final condition → Geometry and acceptance requirements → Machining and application review → Related forms and technical reading → Drawing review and quotation | 3 | 3/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/p00/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/p00/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/p00/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/p00/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/p00/images.json>) |
| 16 | [/machined-parts/gallery/custom-oem-high-precision-cnc-milling-manufacturer/](http://127.0.0.1:4325/machined-parts/gallery/custom-oem-high-precision-cnc-milling-manufacturer/) | 5：Part, material and final condition → Geometry and acceptance requirements → Machining and application review → Related forms and technical reading → Drawing review and quotation | 3 | 3/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/p01/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/p01/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/p01/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/p01/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/p01/images.json>) |
| 17 | [/machined-parts/gallery/ultra-high-precision-machining-services/](http://127.0.0.1:4325/machined-parts/gallery/ultra-high-precision-machining-services/) | 5：Part, material and final condition → Geometry and acceptance requirements → Machining and application review → Related forms and technical reading → Drawing review and quotation | 3 | 4/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/p02/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/p02/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/p02/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/p02/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/p02/images.json>) |
| 18 | [/machined-parts/gallery/global-oem-precision-machining-solutions/](http://127.0.0.1:4325/machined-parts/gallery/global-oem-precision-machining-solutions/) | 5：Part, material and final condition → Geometry and acceptance requirements → Machining and application review → Related forms and technical reading → Drawing review and quotation | 3 | 3/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/p03/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/p03/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/p03/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/p03/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/p03/images.json>) |
| 19 | [/machined-parts/gallery/global-manufacturer-of-multi-sided-precision-machined-components/](http://127.0.0.1:4325/machined-parts/gallery/global-manufacturer-of-multi-sided-precision-machined-components/) | 5：Part, material and final condition → Geometry and acceptance requirements → Machining and application review → Related forms and technical reading → Drawing review and quotation | 2 | 2/5 | 待补素材 | [改前桌面](<D:/lzz/site-polish-20261016/p04/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/p04/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/p04/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/p04/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/p04/images.json>) |
| 20 | [/machined-parts/gallery/custom-oem-cnc-turning-manufacturer/](http://127.0.0.1:4325/machined-parts/gallery/custom-oem-cnc-turning-manufacturer/) | 5：Part, material and final condition → Geometry and acceptance requirements → Machining and application review → Related forms and technical reading → Drawing review and quotation | 3 | 3/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/p05/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/p05/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/p05/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/p05/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/p05/images.json>) |
| 21 | [/machined-parts/gallery/custom-rotary-cylindrical-components/](http://127.0.0.1:4325/machined-parts/gallery/custom-rotary-cylindrical-components/) | 5：Part, material and final condition → Geometry and acceptance requirements → Machining and application review → Related forms and technical reading → Drawing review and quotation | 3 | 3/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/p06/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/p06/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/p06/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/p06/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/p06/images.json>) |
| 22 | [/machined-parts/gallery/custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer/](http://127.0.0.1:4325/machined-parts/gallery/custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer/) | 5：Part, material and final condition → Geometry and acceptance requirements → Machining and application review → Related forms and technical reading → Drawing review and quotation | 3 | 3/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/p07/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/p07/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/p07/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/p07/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/p07/images.json>) |
| 23 | [/machined-parts/gallery/full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing/](http://127.0.0.1:4325/machined-parts/gallery/full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing/) | 5：Part, material and final condition → Material, finish and appearance reference → Geometry and acceptance requirements → Machining and application review → Drawing review and quotation | 3 | 3/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/p08/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/p08/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/p08/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/p08/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/p08/images.json>) |
| 24 | [/machined-parts/gallery/custom-high-precision-machining-for-structural-aesthetic-components-oem/](http://127.0.0.1:4325/machined-parts/gallery/custom-high-precision-machining-for-structural-aesthetic-components-oem/) | 5：Part, material and final condition → Geometry and acceptance requirements → Machining and application review → Related forms and technical reading → Drawing review and quotation | 3 | 3/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/p09/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/p09/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/p09/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/p09/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/p09/images.json>) |
| 25 | [/machined-parts/gallery/high-volume-cnc-turning-for-complex-internal-external-features/](http://127.0.0.1:4325/machined-parts/gallery/high-volume-cnc-turning-for-complex-internal-external-features/) | 5：Part, material and final condition → Geometry and acceptance requirements → Machining and application review → Related forms and technical reading → Drawing review and quotation | 3 | 3/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/p10/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/p10/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/p10/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/p10/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/p10/images.json>) |
| 26 | [/machined-parts/gallery/high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem/](http://127.0.0.1:4325/machined-parts/gallery/high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem/) | 5：Part, material and final condition → Geometry and acceptance requirements → Machining and application review → Related forms and technical reading → Drawing review and quotation | 3 | 3/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/p11/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/p11/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/p11/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/p11/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/p11/images.json>) |
| 27 | [/machined-parts/gallery/custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier/](http://127.0.0.1:4325/machined-parts/gallery/custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier/) | 5：Part, material and final condition → Geometry and acceptance requirements → Machining and application review → Related forms and technical reading → Drawing review and quotation | 4 | 4/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/p12/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/p12/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/p12/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/p12/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/p12/images.json>) |
| 28 | [/machined-parts/gallery/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/](http://127.0.0.1:4325/machined-parts/gallery/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/) | 5：Part, material and final condition → Geometry and acceptance requirements → Machining and application review → Related forms and technical reading → Drawing review and quotation | 3 | 3/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/p13/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/p13/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/p13/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/p13/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/p13/images.json>) |
| 29 | [/machined-parts/gallery/custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier/](http://127.0.0.1:4325/machined-parts/gallery/custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier/) | 5：Part, material and final condition → Geometry and acceptance requirements → Machining and application review → Related forms and technical reading → Drawing review and quotation | 3 | 3/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/p14/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/p14/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/p14/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/p14/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/p14/images.json>) |
| 30 | [/machined-parts/gallery/custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier/](http://127.0.0.1:4325/machined-parts/gallery/custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier/) | 5：Part, material and final condition → Geometry and acceptance requirements → Machining and application review → Related forms and technical reading → Drawing review and quotation | 3 | 3/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/p15/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/p15/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/p15/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/p15/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/p15/images.json>) |
| 31 | [/machined-parts/gallery/custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier/](http://127.0.0.1:4325/machined-parts/gallery/custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier/) | 5：Part, material and final condition → Geometry and acceptance requirements → Machining and application review → Related forms and technical reading → Drawing review and quotation | 3 | 3/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/p16/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/p16/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/p16/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/p16/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/p16/images.json>) |
| 32 | [/machined-parts/gallery/custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier/](http://127.0.0.1:4325/machined-parts/gallery/custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier/) | 5：Part, material and final condition → Geometry and acceptance requirements → Machining and application review → Related forms and technical reading → Drawing review and quotation | 5 | 4/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/p17/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/p17/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/p17/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/p17/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/p17/images.json>) |
| 33 | [/machined-parts/gallery/custom-cnc-machined-castings-transmission-housings-pump-bodies/](http://127.0.0.1:4325/machined-parts/gallery/custom-cnc-machined-castings-transmission-housings-pump-bodies/) | 5：Part, material and final condition → Geometry and acceptance requirements → Machining and application review → Related forms and technical reading → Drawing review and quotation | 3 | 3/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/p18/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/p18/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/p18/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/p18/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/p18/images.json>) |
| 34 | [/machined-parts/gallery/custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier/](http://127.0.0.1:4325/machined-parts/gallery/custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier/) | 5：Part, material and final condition → Geometry and acceptance requirements → Machining and application review → Related forms and technical reading → Drawing review and quotation | 3 | 3/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/p19/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/p19/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/p19/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/p19/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/p19/images.json>) |
| 35 | [/machined-parts/gallery/custom-oem-cnc-machined-non-metallic-components-insulating-parts/](http://127.0.0.1:4325/machined-parts/gallery/custom-oem-cnc-machined-non-metallic-components-insulating-parts/) | 5：Part, material and final condition → Geometry and acceptance requirements → Machining and application review → Related forms and technical reading → Drawing review and quotation | 3 | 3/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/p20/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/p20/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/p20/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/p20/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/p20/images.json>) |
| 36 | [/machined-parts/gallery/custom-oem-cnc-machined-plastic-parts-manufacturer/](http://127.0.0.1:4325/machined-parts/gallery/custom-oem-cnc-machined-plastic-parts-manufacturer/) | 5：Part, material and final condition → Geometry and acceptance requirements → Machining and application review → Related forms and technical reading → Drawing review and quotation | 3 | 3/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/p21/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/p21/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/p21/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/p21/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/p21/images.json>) |
| 37 | [/machined-parts/gallery/oem-precision-cnc-machined-casting-housing-structural-enclosures/](http://127.0.0.1:4325/machined-parts/gallery/oem-precision-cnc-machined-casting-housing-structural-enclosures/) | 5：Part, material and final condition → Geometry and acceptance requirements → Machining and application review → Related forms and technical reading → Drawing review and quotation | 3 | 3/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/p22/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/p22/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/p22/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/p22/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/p22/images.json>) |
| 38 | [/machined-parts/gallery/oem-precision-cnc-machined-casting-housings/](http://127.0.0.1:4325/machined-parts/gallery/oem-precision-cnc-machined-casting-housings/) | 5：Part, material and final condition → Geometry and acceptance requirements → Machining and application review → Related forms and technical reading → Drawing review and quotation | 3 | 3/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/p23/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/p23/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/p23/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/p23/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/p23/images.json>) |
| 39 | [/machined-parts/gallery/precision-cnc-machined-castings-custom-oem-housings/](http://127.0.0.1:4325/machined-parts/gallery/precision-cnc-machined-castings-custom-oem-housings/) | 5：Part, material and final condition → Geometry and acceptance requirements → Machining and application review → Related forms and technical reading → Drawing review and quotation | 3 | 3/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/p24/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/p24/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/p24/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/p24/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/p24/images.json>) |
| 40 | [/machined-parts/gallery/precision-cnc-machined-castings-manufacturer/](http://127.0.0.1:4325/machined-parts/gallery/precision-cnc-machined-castings-manufacturer/) | 5：Part, material and final condition → Geometry and acceptance requirements → Machining and application review → Related forms and technical reading → Drawing review and quotation | 3 | 3/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/p25/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/p25/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/p25/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/p25/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/p25/images.json>) |
| 41 | [/machined-parts/gallery/precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances/](http://127.0.0.1:4325/machined-parts/gallery/precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances/) | 5：Part, material and final condition → Geometry and acceptance requirements → Machining and application review → Related forms and technical reading → Drawing review and quotation | 3 | 3/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/p26/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/p26/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/p26/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/p26/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/p26/images.json>) |
| 42 | [/machined-parts/gallery/precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier/](http://127.0.0.1:4325/machined-parts/gallery/precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier/) | 5：Part, material and final condition → Geometry and acceptance requirements → Machining and application review → Related forms and technical reading → Drawing review and quotation | 3 | 3/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/p27/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/p27/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/p27/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/p27/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/p27/images.json>) |
| 43 | [/machined-parts/gallery/precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier/](http://127.0.0.1:4325/machined-parts/gallery/precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier/) | 5：Part, material and final condition → Geometry and acceptance requirements → Machining and application review → Related forms and technical reading → Drawing review and quotation | 3 | 3/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/p28/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/p28/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/p28/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/p28/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/p28/images.json>) |
| 44 | [/machined-parts/gallery/precision-machining-for-functional-plastic-blocks-structural-components/](http://127.0.0.1:4325/machined-parts/gallery/precision-machining-for-functional-plastic-blocks-structural-components/) | 5：Part, material and final condition → Geometry and acceptance requirements → Machining and application review → Related forms and technical reading → Drawing review and quotation | 3 | 3/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/p29/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/p29/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/p29/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/p29/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/p29/images.json>) |
| 45 | [/machined-parts/gallery/precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures/](http://127.0.0.1:4325/machined-parts/gallery/precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures/) | 5：Part, material and final condition → Geometry and acceptance requirements → Machining and application review → Related forms and technical reading → Drawing review and quotation | 3 | 3/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/p30/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/p30/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/p30/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/p30/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/p30/images.json>) |
| 46 | [/machined-parts/gallery/precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier/](http://127.0.0.1:4325/machined-parts/gallery/precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier/) | 5：Part, material and final condition → Geometry and acceptance requirements → Machining and application review → Related forms and technical reading → Drawing review and quotation | 3 | 3/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/p31/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/p31/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/p31/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/p31/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/p31/images.json>) |
| 47 | [/machined-parts/gallery/precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier/](http://127.0.0.1:4325/machined-parts/gallery/precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier/) | 5：Part, material and final condition → Geometry and acceptance requirements → Machining and application review → Related forms and technical reading → Drawing review and quotation | 3 | 3/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/p32/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/p32/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/p32/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/p32/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/p32/images.json>) |
| 48 | [/machined-parts/gallery/small-batch-cnc-machining-manufacturer-complex-aluminum-housings/](http://127.0.0.1:4325/machined-parts/gallery/small-batch-cnc-machining-manufacturer-complex-aluminum-housings/) | 5：Part, material and final condition → Geometry and acceptance requirements → Machining and application review → Related forms and technical reading → Drawing review and quotation | 3 | 4/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/p33/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/p33/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/p33/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/p33/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/p33/images.json>) |
| 49 | [/machined-parts/gallery/small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv/](http://127.0.0.1:4325/machined-parts/gallery/small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv/) | 5：Part, material and final condition → Geometry and acceptance requirements → Machining and application review → Related forms and technical reading → Drawing review and quotation | 3 | 3/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/p34/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/p34/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/p34/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/p34/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/p34/images.json>) |
| 50 | [/machined-parts/machining-examples/](http://127.0.0.1:4325/machined-parts/machining-examples/) | 4：Compare two holding positions → Choose a machining problem → Choose a material collection → Drawing review and quotation | 9 | 3/4 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/studies-index/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/studies-index/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/studies-index/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/studies-index/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/studies-index/images.json>) |
| 51 | [/machined-parts/machining-examples/two-stage-cnc-milling/](http://127.0.0.1:4325/machined-parts/machining-examples/two-stage-cnc-milling/) | 4：First setup and locating faces → Reposition without losing feature relationships → Acceptance after both setups → Drawing inputs and quotation | 3 | 3/4 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/two-stage-cnc-milling/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/two-stage-cnc-milling/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/two-stage-cnc-milling/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/two-stage-cnc-milling/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/two-stage-cnc-milling/images.json>) |
| 52 | [/machined-parts/machining-examples/five-axis-machining-multi-face-parts/](http://127.0.0.1:4325/machined-parts/machining-examples/five-axis-machining-multi-face-parts/) | 4：Part forms and machining question → Machining access and datum relationships → Acceptance planning → Drawing inputs and quotation | 3 | 3/4 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/five-axis-machining-multi-face-parts/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/five-axis-machining-multi-face-parts/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/five-axis-machining-multi-face-parts/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/five-axis-machining-multi-face-parts/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/five-axis-machining-multi-face-parts/images.json>) |
| 53 | [/machined-parts/machining-examples/turning-then-milling-cylindrical-parts/](http://127.0.0.1:4325/machined-parts/machining-examples/turning-then-milling-cylindrical-parts/) | 4：Part forms and machining question → Machining access and datum relationships → Acceptance planning → Drawing inputs and quotation | 3 | 3/4 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/turning-then-milling-cylindrical-parts/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/turning-then-milling-cylindrical-parts/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/turning-then-milling-cylindrical-parts/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/turning-then-milling-cylindrical-parts/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/turning-then-milling-cylindrical-parts/images.json>) |
| 54 | [/machined-parts/machining-examples/milling-a-pocketed-enclosure-form/](http://127.0.0.1:4325/machined-parts/machining-examples/milling-a-pocketed-enclosure-form/) | 4：Part forms and machining question → Machining access and datum relationships → Acceptance planning → Drawing inputs and quotation | 3 | 3/4 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/milling-a-pocketed-enclosure-form/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/milling-a-pocketed-enclosure-form/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/milling-a-pocketed-enclosure-form/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/milling-a-pocketed-enclosure-form/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/milling-a-pocketed-enclosure-form/images.json>) |
| 55 | [/machined-parts/machining-examples/milling-prismatic-components/](http://127.0.0.1:4325/machined-parts/machining-examples/milling-prismatic-components/) | 4：Part forms and machining question → Machining access and datum relationships → Acceptance planning → Drawing inputs and quotation | 3 | 3/4 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/milling-prismatic-components/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/milling-prismatic-components/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/milling-prismatic-components/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/milling-prismatic-components/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/milling-prismatic-components/images.json>) |
| 56 | [/machined-parts/machining-examples/29-inch-display-housing-cnc-machining/](http://127.0.0.1:4325/machined-parts/machining-examples/29-inch-display-housing-cnc-machining/) | 4：Part forms and machining question → Machining access and datum relationships → Acceptance planning → Drawing inputs and quotation | 3 | 3/4 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/display-housing/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/display-housing/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/display-housing/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/display-housing/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/display-housing/images.json>) |
| 57 | [/machined-parts/machining-examples/custom-plastic-parts-ptfe-pom-pe-acrylic/](http://127.0.0.1:4325/machined-parts/machining-examples/custom-plastic-parts-ptfe-pom-pe-acrylic/) | 5：PTFE components and stepped shafts → POM gear teeth and hub details → Straight and curved PE guide strips → Acrylic components and viewing surfaces → Drawing inputs and quotation | 8 | 4/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/plastic-collection/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/plastic-collection/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/plastic-collection/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/plastic-collection/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/plastic-collection/images.json>) |
| 58 | [/machined-parts/machining-examples/custom-metal-parts-batch-examples/](http://127.0.0.1:4325/machined-parts/machining-examples/custom-metal-parts-batch-examples/) | 5：Locking-pin and turned-part forms → Aluminum housings: cavities and mounting features → Brass fittings and interfaces → Aluminum parts after cleaning → Drawing inputs and quotation | 6 | 4/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/metal-collection/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/metal-collection/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/metal-collection/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/metal-collection/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/metal-collection/images.json>) |
| 59 | [/factory/](http://127.0.0.1:4325/factory/) | 7：Factory and workshop facts → Experience and reference capacity → Equipment and part fit → Inspection stages and methods → Order records and supplier qualification → Packing and handover → Drawing inputs and quotation | 7 | 5/7 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/factory/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/factory/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/factory/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/factory/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/factory/images.json>) |
| 60 | [/resources/](http://127.0.0.1:4325/resources/) | 2：Three resource categories → Prepare an RFQ draft | 0 | 0/2 | 通过（任务例外） | [改前桌面](<D:/lzz/site-polish-20261016/resources-index/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/resources-index/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/resources-index/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/resources-index/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/resources-index/images.json>) |
| 61 | [/resources/ordering/](http://127.0.0.1:4325/resources/ordering/) | 3：Five purchasing decisions → Blank purchasing worksheets → Prepare an RFQ draft | 0 | 0/3 | 通过（任务例外） | [改前桌面](<D:/lzz/site-polish-20261016/ordering-directory/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/ordering-directory/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/ordering-directory/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/ordering-directory/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/ordering-directory/images.json>) |
| 62 | [/resources/ordering/rfq-checklist/](http://127.0.0.1:4325/resources/ordering/rfq-checklist/) | 5：Copy this brief into your inquiry → Drawings and inspection requirements → Material and final surface → Quantity and delivery → Enquiry and next reading | 3 | 3/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/rfq-checklist/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/rfq-checklist/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/rfq-checklist/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/rfq-checklist/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/rfq-checklist/images.json>) |
| 63 | [/resources/ordering/compare-cnc-machining-quotations/](http://127.0.0.1:4325/resources/ordering/compare-cnc-machining-quotations/) | 5：Set one comparison basis → Compare what the price includes → Resolve exceptions before awarding the order → Keep the agreed scope with the order → Enquiry and next reading | 3 | 3/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/compare-cnc-machining-quotations/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/compare-cnc-machining-quotations/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/compare-cnc-machining-quotations/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/compare-cnc-machining-quotations/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/compare-cnc-machining-quotations/images.json>) |
| 64 | [/resources/ordering/machined-prototype-approval-checklist/](http://127.0.0.1:4325/resources/ordering/machined-prototype-approval-checklist/) | 5：Agree what the sample must prove → Sample acceptance checks → Record the approval decision → Release the batch as a separate decision → Enquiry and next reading | 3 | 3/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/machined-prototype-approval-checklist/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/machined-prototype-approval-checklist/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/machined-prototype-approval-checklist/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/machined-prototype-approval-checklist/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/machined-prototype-approval-checklist/images.json>) |
| 65 | [/resources/ordering/prototype-vs-small-batch-cnc/](http://127.0.0.1:4325/resources/ordering/prototype-vs-small-batch-cnc/) | 5：Prototype and repeat-batch decisions → Approve the batch specification → Record revision and release → Confirm the next order → Enquiry and next reading | 3 | 3/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/prototype-vs-small-batch-cnc/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/prototype-vs-small-batch-cnc/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/prototype-vs-small-batch-cnc/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/prototype-vs-small-batch-cnc/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/prototype-vs-small-batch-cnc/images.json>) |
| 66 | [/resources/ordering/custom-cnc-parts-shipping-checklist/](http://127.0.0.1:4325/resources/ordering/custom-cnc-parts-shipping-checklist/) | 5：Protection and identification → Timing and responsibility → Shipment and import documents → LZZ packing archive → Enquiry and next reading | 4 | 4/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/custom-cnc-parts-shipping-checklist/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/custom-cnc-parts-shipping-checklist/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/custom-cnc-parts-shipping-checklist/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/custom-cnc-parts-shipping-checklist/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/custom-cnc-parts-shipping-checklist/images.json>) |
| 67 | [/resources/technical-guides/](http://127.0.0.1:4325/resources/technical-guides/) | 2：Three specification decisions → Prepare an RFQ draft | 0 | 0/2 | 通过（任务例外） | [改前桌面](<D:/lzz/site-polish-20261016/technical-guides-directory/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/technical-guides-directory/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/technical-guides-directory/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/technical-guides-directory/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/technical-guides-directory/images.json>) |
| 68 | [/resources/technical-guides/critical-features-cnc-drawing/](http://127.0.0.1:4325/resources/technical-guides/critical-features-cnc-drawing/) | 5：Start with the part function → Make the requirement measurable → Geometry and the machining route → Check the package before release → Enquiry and next reading | 3 | 3/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/critical-features-cnc-drawing/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/critical-features-cnc-drawing/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/critical-features-cnc-drawing/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/critical-features-cnc-drawing/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/critical-features-cnc-drawing/images.json>) |
| 69 | [/resources/technical-guides/cnc-process-selection/](http://127.0.0.1:4325/resources/technical-guides/cnc-process-selection/) | 4：Choose by geometry → Workshop setups and related studies → Tolerances for critical features → Enquiry and next reading | 5 | 3/4 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/cnc-process-selection/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/cnc-process-selection/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/cnc-process-selection/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/cnc-process-selection/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/cnc-process-selection/images.json>) |
| 70 | [/resources/technical-guides/material-and-finish-checklist/](http://127.0.0.1:4325/resources/technical-guides/material-and-finish-checklist/) | 5：Choose the material specification → Specify the finished surface → Solid material, coating or covering? → Material and inspection records → Enquiry and next reading | 5 | 4/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/material-and-finish-checklist/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/material-and-finish-checklist/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/material-and-finish-checklist/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/material-and-finish-checklist/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/material-and-finish-checklist/images.json>) |
| 71 | [/resources/faq/](http://127.0.0.1:4325/resources/faq/) | 4：Quotes & ordering → Processes & specifications → Inspection & delivery → Question and RFQ draft | 3 | 3/4 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/faq/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/faq/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/faq/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/faq/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/faq/images.json>) |
| 72 | [/about/](http://127.0.0.1:4325/about/) | 4：Company and workshop → Supplier information and order responsibilities → Workshop visit record → Drawing and RFQ draft | 3 | 3/4 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/about-index/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/about-index/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/about-index/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/about-index/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/about-index/images.json>) |
| 73 | [/about/company-profile/](http://127.0.0.1:4325/about/company-profile/) | 5：Company identity and workshop → Engineering and drawing review → Supplier qualification documents → Company development and people → Supplier inquiry and documents | 6 | 4/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/company-profile/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/company-profile/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/company-profile/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/company-profile/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/company-profile/images.json>) |
| 74 | [/about/how-we-work/](http://127.0.0.1:4325/about/how-we-work/) | 6：Order basis and five stages → Define and quote the part → Approve and manufacture → Packing and handover → Commercial terms, changes and support → First review and RFQ draft | 6 | 4/6 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/how-we-work/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/how-we-work/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/how-we-work/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/how-we-work/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/how-we-work/images.json>) |
| 75 | [/about/company-news/](http://127.0.0.1:4325/about/company-news/) | 4：News directory → Latest record → Workshop and industry visits → Team records | 5 | 3/4 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/company-news/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/company-news/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/company-news/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/company-news/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/company-news/images.json>) |
| 76 | [/about/company-news/australian-customer-workshop-visit-january-2025/](http://127.0.0.1:4325/about/company-news/australian-customer-workshop-visit-january-2025/) | 4：Event introduction → On the workshop floor → Conversation during the visit → Related company records | 7 | 4/4 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/australian-visit/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/australian-visit/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/australian-visit/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/australian-visit/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/australian-visit/images.json>) |
| 77 | [/about/company-news/china-africa-west-lake-summit-2025/](http://127.0.0.1:4325/about/company-news/china-africa-west-lake-summit-2025/) | 4：Event introduction → Introducing custom machining → Inside the conference hall → Related company records | 7 | 4/4 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/summit/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/summit/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/summit/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/summit/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/summit/images.json>) |
| 78 | [/about/company-news/lzz-team-outing-2024/](http://127.0.0.1:4325/about/company-news/lzz-team-outing-2024/) | 4：Event introduction → The journey and a shared meal → A day away from the machines → Related company records | 8 | 4/4 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/team-2024/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/team-2024/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/team-2024/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/team-2024/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/team-2024/images.json>) |
| 79 | [/about/company-news/may-2025-lzz-team-outing/](http://127.0.0.1:4325/about/company-news/may-2025-lzz-team-outing/) | 4：Event introduction → An outdoor meal together → Evening streets and food stops → Related company records | 6 | 4/4 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/team-may/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/team-may/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/team-may/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/team-may/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/team-may/images.json>) |
| 80 | [/about/company-news/november-2025-hangzhou-lizhizao-group-activity/](http://127.0.0.1:4325/about/company-news/november-2025-hangzhou-lizhizao-group-activity/) | 4：Event introduction → A day beside the water → Around the barbecue and table → Related company records | 7 | 4/4 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/team-november/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/team-november/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/team-november/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/team-november/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/team-november/images.json>) |
| 81 | [/about/contact/](http://127.0.0.1:4325/about/contact/) | 5：Direct contact → New part inquiry → Existing order support → Supplier documents → Workshop visit | 3 | 3/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/contact/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/contact/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/contact/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/contact/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/contact/images.json>) |
| 82 | [/](http://127.0.0.1:4325/) | 5：Drawing-based CNC parts → Part forms and machining routes → Two setups for one part → Workshop and acceptance → Quotation inputs and conditions | 9 | 5/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/home/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/home/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/home/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/home/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/home/images.json>) |
| 83 | [/quote/](http://127.0.0.1:4325/quote/) | 3：RFQ task and draft boundary → Contact and part requirements → Direct contact and preparation references | 3 | 1/3 | 通过（任务例外） | [改前桌面](<D:/lzz/site-polish-20261016/quote/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/quote/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/quote/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/quote/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/quote/images.json>) |
| 84 | [/privacy/](http://127.0.0.1:4325/privacy/) | 5：your-inquiry → saved-drafts → external-services → site-information → privacy-contact | 3 | 3/5 | 通过 | [改前桌面](<D:/lzz/site-polish-20261016/privacy/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/privacy/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/privacy/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/privacy/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/privacy/images.json>) |
| 85 | [/404.html](http://127.0.0.1:4325/404.html) | 2：Error and home recovery → Choose a useful topic | 3 | 1/2 | 通过（任务例外） | [改前桌面](<D:/lzz/site-polish-20261016/not-found/before/1440.png>) / [改前手机](<D:/lzz/site-polish-20261016/not-found/before/390.png>)；[最终桌面](<D:/lzz/site-polish-20261016/not-found/final/1440.png>) / [最终手机](<D:/lzz/site-polish-20261016/not-found/final/390.png>)；[图片动作](<D:/lzz/site-polish-20261016/not-found/images.json>) |

新规则已更新[项目DESIGN.md](<D:/lzz/lzz/_react/DESIGN.md>)，各阶段旧规则与改前源码保留于 D:/lzz/site-polish-20261016/baseline/ 及各页source/。保留品牌、Inter、主色及真实业务边界；修改图位、模块关系、阅读宽度及任务入口；废弃机械三列、无用装饰及不合理的重复排序。逐页具体变更接续前文，不覆盖原始确认方案或其他任务的改动。
<!-- SITE_POLISH_FINAL_END -->

## CNC 铣削页阅读与图文精修 · 2026-10-17

本节仅替代前文 `/capabilities/cnc-milling-service/` 的上一轮视觉记录，不扩展成其他页面的新验收。按用户指定的 oil-ui-pro，在既有品牌与项目 DESIGN.md 内先检查、再实际修改并提供前后对比。未部署生产环境。

**当前结果：通过。** 7 个核心模块、7 个不同有效图源、5/7 模块图文结合。1440px 和390px 整页及正常尺度连续局部已由主 Agent 与独立评审者查看；320/768/1100px 提供窄屏截图与溢出检查。保留原 URL、全部原锚点、重要内链、SEO 元信息与 JSON-LD，以及询价的本地邮件草稿性质。

### 原问题与实际改动

1. **图文和技术区权重过近，整页缺少主次。** 壳体实物成为主图，曲面盖为辅助参照；同件两次装夹形成深色过程章节，明确看见工件、刀具与夹具；技术表使用完整阅读宽度，浅灰任务区收尾。不把所有模块改成等高卡片或相同左右比例。
2. **装夹图注、步骤标题和说明重复。** 原步骤与图注合并，一处共用来源说明；真实照片改用项目中已有且核对过的752×540裁片，主体更容易辨认。未重画产品或机器。
3. **材料四列在手机重复字段过多。** 材料名称与牌号／状态并为一列，形成“材料与规格／处理／本图纸确认事项”三列；手机按材料连续阅读，保留所有16个原行字段值。修正初版手机表头仍受32%宽度限制的问题。
4. **手机询价入口在大图之后。** 主操作放在简短介绍之后、实物之前：390px下正文第一个询价按钮顶部由721px提前至362px。保留零件入口和最小订单／时间条件链接。
5. **检验辅助照片和询价卡片分散任务。** 关键特征与完整验收表优先，CMM照片放到应用要求旁，手机在技术答案之后；询价六项输入合为三组，订单与完整交期条件紧邻主操作。修正320px下固定负边距导致的横向溢出，改用实际容器边距变量。

以上属于 Agent 在用户“去改进一下”的授权内作出的页面编排判断；没有新增企业事实或未经证实的承诺。

### 最终七章与图片动作

| 章与职责 | 具体内容与两端规则 | 图片处理 |
| --- | --- | --- |
| 服务：能加工什么 | 按图铣削、原型和小批量；桌面图文并置，手机先简介和操作再图 | 保留P00来源实物，完整显示结构 |
| 零件：哪些形态适合 | 壳体、曲面盖及其他形态入口；桌面480px主图与380px辅图，手机顺序排列 | 保留P33和P13来源实拍，不声称为交付业绩 |
| 装夹：同件如何加工 | 原两步特征与定位说明随照片连续阅读；桌面成对，手机逐步 | 复用现有真实752×540裁片，不计新拍摄／新修图 |
| 图纸：哪些几何需确认 | 孔、口袋、半径、基准、尺寸／夹持、五轴与尖角两问；手机答案先于辅助图 | 保留现有AI几何示意及明确标识 |
| 材料：如何选择与约定处理 | 铝、钢／不锈钢、铜／黄铜、工程塑料；全部规格、处理、图纸检查及Ti单独审查保留 | 技术表不塞装饰图 |
| 验收：哪些特征需要定义 | 原3行检验表、2类应用要求、全部测试与记录边界；±0.01mm紧邻选择性特征及材料／几何／装夹／测量方法限制 | 保留真实CMM照片与当前量程／校准需核对的说明 |
| 询价：准备什么、如何开始 | 6项输入、MOQ1、7–14工作日起算／含处理／运输额外／按报价确认条件；本地草稿提示保留 | 此任务区不需要补图 |

实际图片引用：

| 最终文件（相对public） | 动作与身份 |
| --- | --- |
| `/media/product-sources-20261015/p00-framed-1200.webp` | 保留；来源实物照片 |
| `/media/product-sources-20261015/p33-1200.webp` | 保留；来源壳体照片，放大主展示 |
| `/media/product-sources-20261015/p13-1200.webp` | 保留；来源参照照片，辅展示 |
| `/media/products-real-details-20261015/two-stage-first.webp` | 复用已有真实裁片；原来源`/media/evidence/two-stage-first-1600.webp` |
| `/media/products-real-details-20261015/two-stage-second.webp` | 复用已有真实裁片；原来源`/media/evidence/two-stage-second-1600.webp` |
| `/media/editorial-rebuild-20261015/milling-geometry-1200.webp` | 保留既有AI辅助图，非本轮生成，非实物证明 |
| `/media/evidence/cmm-room-1600.webp` | 保留真实设备图；不推断当前量程、校准或能力 |

本轮新增生成0张、新增生成式修图0张；现有7个相关图源足够支持本页叙事，改进来自选用已存在的真实裁片、主次比例和图文关系。未为数量重画产品或证据。P04低清仅保留“limited photo detail”阅读入口，不在本页作为有效图片，不声称修复其清晰度。

### 截图、对比与验证

- [本机前后对比页](http://127.0.0.1:7338/)；[离线对比文件](<D:/lzz/cnc-editorial-polish-20261017/style-explorer.html>)。采用本轮真实截图，可切换桌面／手机；新版已实施，非待选方案。
- 改前：[1440px](<D:/lzz/cnc-editorial-polish-20261017/milling/before/1440.png>)、[390px](<D:/lzz/cnc-editorial-polish-20261017/milling/before/390.png>)；最终本地构建：[1440px](<D:/lzz/cnc-editorial-polish-20261017/milling/built/1440.png>)、[390px](<D:/lzz/cnc-editorial-polish-20261017/milling/built/390.png>)。连续正常尺度局部位于各目录的`detail-*`。最终高度6199／10444px；不以页面更短作为视觉完成依据。
- `npm run check`通过：0 errors、0 warnings、9 hints；`npm run build`通过。构建日志位于`D:/lzz/cnc-editorial-polish-20261017/check.log`、`build.log`。既有其他页面的提示未作为本轮内容改动处理。
- 内容与流向检查30项通过：材料16字段、原检验表、应用条件、询价6项输入、订单／交期和几何限制逐项核对；重要旧链接目的地保留。构建前以旧预览和新开发版比较，车削及铸件页在1440／390的正文、图片、标题、高度不变。记录：[content-and-flow-validation.json](<D:/lzz/cnc-editorial-polish-20261017/content-and-flow-validation.json>)。
- 最终构建连续3轮：页面／内链／锚点／菜单／窄屏／询价预选和空值校验每轮39项通过；构建一致性与真实本地草稿准备／刷新恢复每轮31项通过。记录为`validation-run-1.json`至`3.json`及`rfq-run-1.json`至`3.json`，均位于本轮任务目录。未开启邮件程序、未发送邮件，无非GET业务请求。
- 字号加倍检查补齐原脚本遗漏的`strong`、`span`、按钮、末级面包屑及`::before`材料标签。390px下全部元素计算字号乘二，无横向溢出；主Agent和独立评审看过首屏、材料、询价及页脚4处更新截图。记录：[text-200-validation.json](<D:/lzz/cnc-editorial-polish-20261017/text-200-validation.json>)。这不是OS级缩放，也不把四处局部说成放大后整页逐行目视检查。
- [独立视觉复核](<D:/lzz/cnc-editorial-polish-20261017/independent-review.md>)：正常1440／390静态视觉通过；字号加倍补充复核通过，未发现必须继续修改的问题。截图工具的空issues／lint不代替人工看图。

本轮业务源码仅修改`src/components/CapabilityMillingPage.astro`和`src/styles/cnc-milling.css`；共享`reading-polish.css`及项目`DESIGN.md`与改前哈希一致。沿用规范即可满足本次改动，没有新增全站视觉规则或更改技术架构。源码基线、逐章计划、截图、检查脚本与记录集中保存在`D:/lzz/cnc-editorial-polish-20261017/`。

未完成／验证边界：P04真实高清素材仍待补，未影响本页有效图数；没有真实发送询价或生产环境验收；窄屏除1440／390外以整页缩览和几何检查为主，不冒充所有文字逐行审阅。没有其他阻断本页交付的已知问题。
