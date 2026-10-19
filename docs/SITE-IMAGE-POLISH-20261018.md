# 全站图片显示与 ImageGen 配图优化

2026-10-18。本轮在已确定的 Penta 版式与 LZZ 品牌蓝上直接实施，没有另起设计方向，也没有部署生产。

## 已完成

84 个正式页面的 413 个图片位置全部核对。原来共 146 个图像 URL，更新后共 151 个，复用的图片按实际用途保留。本轮调用宿主内置 ImageGen 生成并采用 7 张通用配图，接入 11 个正式页面（含首页和目录中的复用）；未生成任何工厂、客户、证件或真实交付证明。

- 铸件页改为能看见铸造表面、加工法兰与孔的图；铜/黄铜页改为对应的黄铜车削图。
- 小批量页、样件与原型页有了对应主题和首屏比例的图片。
- 报价比较、关键特征、工艺选择分别使用能解释当前主题的图，减少共用图纸静物。
- 首页资源卡使用响应式来源、实际比例和尺寸，工艺选择卡与对应指南保持一致。
- 首屏 sizes 同时考虑宽度和 cover 后所需高度，避免横图在高容器中只加载较小版本。
- 首页原始现场图取消额外放大；手机裁切保留人物面部。内页前景零件在手机为 136px、置于左下，避开加工主体。
- 清理开放图文模块的旧负边距，保留手机内容边界；没有调整页面内容顺序、参数、品牌色或导航。
- P33 的 390px 局部缩略图换成同组零件的原始铝壳照片，采用原有响应式版本，最大 1600px。标题、材料和验收条件保留。

## 实际采用的 ImageGen 图片

所有图均为通用示意，并保留 illustration 图注或相应的图片身份。零件与文件不表示真实订单、报价、库存、检测结果或已验证规格。

| 图片 | 网页最大尺寸 | 实际采用页面 | 资源 |
| --- | --- | --- | --- |
| 铸件精加工 | 1120 × 1400 | /capabilities/casting-machining/ | [图像](D:/lzz/lzz/_react/public/media/site-image-polish-20261018/casting-machining-1120.webp) |
| 铜/黄铜车削 | 1120 × 1400 | /capabilities/copper-brass-cnc-parts/ | [图像](D:/lzz/lzz/_react/public/media/site-image-polish-20261018/copper-turning-1120.webp) |
| 小批量准备 | 1536 × 1024 | /capabilities/low-volume-production/ | [图像](D:/lzz/lzz/_react/public/media/site-image-polish-20261018/small-batch-planning-1536.webp) |
| 报价比较 | 1536 × 1024 | /resources/ordering/<br/>/resources/ordering/compare-cnc-machining-quotations/ | [图像](D:/lzz/lzz/_react/public/media/site-image-polish-20261018/quotation-comparison-1536.webp) |
| 关键特征与图纸 | 1536 × 1024 | /resources/technical-guides/<br/>/resources/technical-guides/critical-features-cnc-drawing/ | [图像](D:/lzz/lzz/_react/public/media/site-image-polish-20261018/critical-feature-review-1536.webp) |
| 车削和铣削形态 | 1536 × 1024 | /<br/>/resources/technical-guides/<br/>/resources/technical-guides/cnc-process-selection/ | [图像](D:/lzz/lzz/_react/public/media/site-image-polish-20261018/process-selection-1536.webp) |
| 样件与图纸 | 1120 × 1400 | /capabilities/prototype-machining/<br/>/capabilities/starting-with-a-sample/ | [图像](D:/lzz/lzz/_react/public/media/site-image-polish-20261018/sample-definition-1120.webp) |

母版保存在 D:/lzz/site-images-20261018/masters/。网页使用 480 / 800 / 1120px WebP，横图另有 1536px 版本。共 25 个 WebP 衍生，每个 w 描述与文件真实宽度相符，没有把母版 PNG 直接发送到网页。完整提示词见 [prompts.json](../design/site-image-polish-20261018/prompts.json)，生成及替换清单见 [manifest.json](../design/site-image-polish-20261018/manifest.json)。7 次生成全部采用，无未接入的候选图。

## 原始照片高清衍生

找到了车间宽幅照（4088 × 2832）与车铣过程照（4000 × 3000）的真实原稿，逐一核对原登记 SHA256 后生成 2048 / 2560px WebP。仅做 EXIF 方向处理、等比缩小与编码，未重构图片内容。原始登记与原图不覆盖。

员工车间照片原稿只有 1706 × 1279，继续使用现有最大 1600px 图；通过正确的首屏 sizes 选择足够大的版本，不插值伪造细节。低分辨率的原始视频帧继续作为可播放记录的封面，保留自然比例和来源说明；更清晰的真实过程仍需要原始高清照片或视频，未用 AI 补成证据。

## 浏览器与构建验收

- 43 个代表页面分别检查 1440px 和 390px，共 86 条记录，覆盖当前全部 151 个实际图片来源。保存并实际查看了主要新图、原始照片、产品、指南的页面截图；整页截图用于查节奏，局部图用于查主体和裁切。
- 86 条最终记录中未加载图片为 0、横向溢出为 0。首页屏外零件图按需加载，实际点击到末尾确认 5 张图均加载，再点击返回确认反向切换正常。
- 复查手机上的人物面部、加工法兰、黄铜螺纹、样件形态和前景卡片，修复了初轮截图中的遮挡。六类图文段落的标题和图片说明重新对齐内容边界。
- 84 页静态核对：文件存在、srcset 643 个候选文件及 w 描述、尺寸、替代文字、生成图身份通过。5 个视频封面是有名称播放按钮中的装饰图，保留空 alt，避免重复朗读。
- 原 title、description、canonical、主标题层级、技术表格与链接地址均保留。QuoteForm.tsx、catalog.json 和业务来源文件未改。
- npm run check：0 errors、0 warnings、9 条既有图标弃用提示。npm run build：144 个 Astro 页面构建完成。npm run test:seo：213 HTML、84 sitemap URL、188 条重定向规则通过本地验证。
- 图片区切换及本次页面浏览未见 console error / warning。没有测量 Core Web Vitals，不把本地加载正常等同于性能指标达标。原有询价仍为本地邮件草稿，本轮没有修改或对外发送。

## 前后截图

实际页面截图，左 BEFORE、右 AFTER。每张对比从页头截取，完整截图在任务目录 before / after。首页仅提供本轮同视口的桌面对比。

| 页面 | 1440px | 390px |
| --- | --- | --- |
| / | [桌面](D:/lzz/site-images-20261018/comparisons/00-home-1440.jpg) | — |
| /capabilities/casting-machining/ | [桌面](D:/lzz/site-images-20261018/comparisons/14-capabilities--casting-machining-1440.jpg) | [手机](D:/lzz/site-images-20261018/comparisons/14-capabilities--casting-machining-390.jpg) |
| /capabilities/copper-brass-cnc-parts/ | [桌面](D:/lzz/site-images-20261018/comparisons/17-capabilities--copper-brass-cnc-parts-1440.jpg) | [手机](D:/lzz/site-images-20261018/comparisons/17-capabilities--copper-brass-cnc-parts-390.jpg) |
| /capabilities/low-volume-production/ | [桌面](D:/lzz/site-images-20261018/comparisons/18-capabilities--low-volume-production-1440.jpg) | [手机](D:/lzz/site-images-20261018/comparisons/18-capabilities--low-volume-production-390.jpg) |
| /resources/ordering/compare-cnc-machining-quotations/ | [桌面](D:/lzz/site-images-20261018/comparisons/75-resources--ordering--compare-cnc-machining-quotations-1440.jpg) | [手机](D:/lzz/site-images-20261018/comparisons/75-resources--ordering--compare-cnc-machining-quotations-390.jpg) |
| /resources/technical-guides/cnc-process-selection/ | [桌面](D:/lzz/site-images-20261018/comparisons/81-resources--technical-guides--cnc-process-selection-1440.jpg) | [手机](D:/lzz/site-images-20261018/comparisons/81-resources--technical-guides--cnc-process-selection-390.jpg) |
| /resources/technical-guides/critical-features-cnc-drawing/ | [桌面](D:/lzz/site-images-20261018/comparisons/82-resources--technical-guides--critical-features-cnc-drawing-1440.jpg) | [手机](D:/lzz/site-images-20261018/comparisons/82-resources--technical-guides--critical-features-cnc-drawing-390.jpg) |

## 页面清单

| 正式页面 | 本轮图片处理 | 验证范围 |
| --- | --- | --- |
| / | 图片/响应式引用更新 | 1440 / 390 |
| /about/ | 图片/响应式引用更新 | 1440 / 390 |
| /about/company-news/ | 复用合适原图 | 全站静态核对 |
| /about/company-news/australian-customer-workshop-visit-january-2025/ | 复用合适原图 | 1440 / 390 |
| /about/company-news/china-africa-west-lake-summit-2025/ | 复用合适原图 | 1440 / 390 |
| /about/company-news/lzz-team-outing-2024/ | 复用合适原图 | 1440 / 390 |
| /about/company-news/may-2025-lzz-team-outing/ | 复用合适原图 | 1440 / 390 |
| /about/company-news/november-2025-hangzhou-lizhizao-group-activity/ | 复用合适原图 | 1440 / 390 |
| /about/company-profile/ | 图片/响应式引用更新 | 1440 / 390 |
| /about/contact/ | 图片/响应式引用更新 | 全站静态核对 |
| /about/how-we-work/ | 复用合适原图 | 全站静态核对 |
| /capabilities/ | 图片/响应式引用更新 | 全站静态核对 |
| /capabilities/5-axis-cnc-machining/ | 图片/响应式引用更新 | 1440 / 390 |
| /capabilities/aluminum-cnc-parts/ | 图片/响应式引用更新 | 1440 / 390 |
| /capabilities/casting-machining/ | 图片/响应式引用更新 | 1440 / 390 |
| /capabilities/cnc-milling-service/ | 图片/响应式引用更新 | 1440 / 390 |
| /capabilities/cnc-turning-service/ | 图片/响应式引用更新 | 1440 / 390 |
| /capabilities/copper-brass-cnc-parts/ | 图片/响应式引用更新 | 1440 / 390 |
| /capabilities/low-volume-production/ | 图片/响应式引用更新 | 1440 / 390 |
| /capabilities/plastic-machined-parts/ | 图片/响应式引用更新 | 1440 / 390 |
| /capabilities/prototype-machining/ | 图片/响应式引用更新 | 1440 / 390 |
| /capabilities/stainless-steel-cnc-parts/ | 图片/响应式引用更新 | 1440 / 390 |
| /capabilities/starting-with-a-sample/ | 图片/响应式引用更新 | 1440 / 390 |
| /factory/ | 图片/响应式引用更新 | 1440 / 390 |
| /machined-parts/ | 图片/响应式引用更新 | 1440 / 390 |
| /machined-parts/gallery/ | 图片/响应式引用更新 | 1440 / 390 |
| /machined-parts/gallery/custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier/ | 复用合适原图 | 1440 / 390 |
| /machined-parts/gallery/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/ | 复用合适原图 | 全站静态核对 |
| /machined-parts/gallery/custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier/ | 复用合适原图 | 全站静态核对 |
| /machined-parts/gallery/custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier/ | 复用合适原图 | 1440 / 390 |
| /machined-parts/gallery/custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier/ | 复用合适原图 | 全站静态核对 |
| /machined-parts/gallery/custom-cnc-machined-castings-transmission-housings-pump-bodies/ | 复用合适原图 | 全站静态核对 |
| /machined-parts/gallery/custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier/ | 复用合适原图 | 全站静态核对 |
| /machined-parts/gallery/custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier/ | 图片/响应式引用更新 | 全站静态核对 |
| /machined-parts/gallery/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/ | 复用合适原图 | 全站静态核对 |
| /machined-parts/gallery/custom-high-precision-machining-for-structural-aesthetic-components-oem/ | 复用合适原图 | 全站静态核对 |
| /machined-parts/gallery/custom-oem-cnc-machined-non-metallic-components-insulating-parts/ | 复用合适原图 | 全站静态核对 |
| /machined-parts/gallery/custom-oem-cnc-machined-plastic-parts-manufacturer/ | 复用合适原图 | 全站静态核对 |
| /machined-parts/gallery/custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer/ | 图片/响应式引用更新 | 全站静态核对 |
| /machined-parts/gallery/custom-oem-cnc-turning-manufacturer/ | 图片/响应式引用更新 | 全站静态核对 |
| /machined-parts/gallery/custom-oem-high-precision-cnc-milling-manufacturer/ | 复用合适原图 | 全站静态核对 |
| /machined-parts/gallery/custom-rotary-cylindrical-components/ | 图片/响应式引用更新 | 全站静态核对 |
| /machined-parts/gallery/full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing/ | 复用合适原图 | 全站静态核对 |
| /machined-parts/gallery/global-manufacturer-of-multi-sided-precision-machined-components/ | 复用合适原图 | 1440 / 390 |
| /machined-parts/gallery/global-oem-precision-machining-solutions/ | 图片/响应式引用更新 | 全站静态核对 |
| /machined-parts/gallery/high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem/ | 复用合适原图 | 全站静态核对 |
| /machined-parts/gallery/high-volume-cnc-turning-for-complex-internal-external-features/ | 图片/响应式引用更新 | 全站静态核对 |
| /machined-parts/gallery/oem-precision-cnc-machined-casting-housing-structural-enclosures/ | 复用合适原图 | 全站静态核对 |
| /machined-parts/gallery/oem-precision-cnc-machined-casting-housings/ | 复用合适原图 | 全站静态核对 |
| /machined-parts/gallery/precision-cnc-machined-castings-custom-oem-housings/ | 复用合适原图 | 全站静态核对 |
| /machined-parts/gallery/precision-cnc-machined-castings-manufacturer/ | 复用合适原图 | 全站静态核对 |
| /machined-parts/gallery/precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances/ | 复用合适原图 | 全站静态核对 |
| /machined-parts/gallery/precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier/ | 图片/响应式引用更新 | 全站静态核对 |
| /machined-parts/gallery/precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier/ | 复用合适原图 | 全站静态核对 |
| /machined-parts/gallery/precision-machining-for-functional-plastic-blocks-structural-components/ | 复用合适原图 | 全站静态核对 |
| /machined-parts/gallery/precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures/ | 复用合适原图 | 全站静态核对 |
| /machined-parts/gallery/precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier/ | 图片/响应式引用更新 | 全站静态核对 |
| /machined-parts/gallery/precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier/ | 图片/响应式引用更新 | 全站静态核对 |
| /machined-parts/gallery/small-batch-cnc-machining-manufacturer-complex-aluminum-housings/ | 图片/响应式引用更新 | 1440 / 390 |
| /machined-parts/gallery/small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv/ | 复用合适原图 | 全站静态核对 |
| /machined-parts/gallery/ultra-high-precision-machining-services/ | 复用合适原图 | 1440 / 390 |
| /machined-parts/machining-examples/ | 图片/响应式引用更新 | 1440 / 390 |
| /machined-parts/machining-examples/29-inch-display-housing-cnc-machining/ | 复用合适原图 | 1440 / 390 |
| /machined-parts/machining-examples/custom-metal-parts-batch-examples/ | 复用合适原图 | 1440 / 390 |
| /machined-parts/machining-examples/custom-plastic-parts-ptfe-pom-pe-acrylic/ | 复用合适原图 | 1440 / 390 |
| /machined-parts/machining-examples/five-axis-machining-multi-face-parts/ | 复用合适原图 | 1440 / 390 |
| /machined-parts/machining-examples/milling-a-pocketed-enclosure-form/ | 复用合适原图 | 1440 / 390 |
| /machined-parts/machining-examples/milling-prismatic-components/ | 复用合适原图 | 1440 / 390 |
| /machined-parts/machining-examples/turning-then-milling-cylindrical-parts/ | 复用合适原图 | 1440 / 390 |
| /machined-parts/machining-examples/two-stage-cnc-milling/ | 复用合适原图 | 全站静态核对 |
| /privacy/ | 复用合适原图 | 全站静态核对 |
| /quote/ | 复用合适原图 | 1440 / 390 |
| /resources/ | 复用合适原图 | 全站静态核对 |
| /resources/faq/ | 复用合适原图 | 全站静态核对 |
| /resources/ordering/ | 图片/响应式引用更新 | 1440 / 390 |
| /resources/ordering/compare-cnc-machining-quotations/ | 图片/响应式引用更新 | 1440 / 390 |
| /resources/ordering/custom-cnc-parts-shipping-checklist/ | 复用合适原图 | 1440 / 390 |
| /resources/ordering/machined-prototype-approval-checklist/ | 复用合适原图 | 全站静态核对 |
| /resources/ordering/prototype-vs-small-batch-cnc/ | 复用合适原图 | 全站静态核对 |
| /resources/ordering/rfq-checklist/ | 复用合适原图 | 全站静态核对 |
| /resources/technical-guides/ | 图片/响应式引用更新 | 1440 / 390 |
| /resources/technical-guides/cnc-process-selection/ | 图片/响应式引用更新 | 1440 / 390 |
| /resources/technical-guides/critical-features-cnc-drawing/ | 图片/响应式引用更新 | 1440 / 390 |
| /resources/technical-guides/material-and-finish-checklist/ | 图片/响应式引用更新 | 1440 / 390 |

静态检查覆盖全部 84 页；浏览器代表页面按图像来源覆盖选择，不把检查 43 页声称为逐页浏览了 84 页。没有适合图片任务的 FAQ、隐私、错误恢复页保持原有功能结构。未完成的 ImageGen 图位为 0；真实记录的原生清晰度边界见上文。

## 回退

本轮开始时工作区已有前序修改，全部保留。修改前源码和 DESIGN.md 位于 D:/lzz/site-images-20261018/backup/，新素材使用独立版本目录 public/media/site-image-polish-20261018/，旧图不删除。恢复时按 source-changes.json 的文件清单恢复对应快照，不能 reset 或 clean 整个 Git 工作区。

检查记录：[image-validation.json](D:/lzz/site-images-20261018/image-validation.json)、[after-browser.json](D:/lzz/site-images-20261018/after-browser.json)、[browser-summary.json](D:/lzz/site-images-20261018/browser-summary.json)、[original-derivatives.json](D:/lzz/site-images-20261018/original-derivatives.json)、[carousel-check.json](D:/lzz/site-images-20261018/carousel-check.json)。本轮没有 Git 提交、推送、生产部署或外部发送。
