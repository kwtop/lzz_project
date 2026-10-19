# 全站非产品图片升级 · 2026-10-18

已在本地完成 24 张独立 ImageGen 展示摄影：首页 6 张、服务 10 张、指南 8 张。实际用于 29 个正式页面的 67 个图位，另移除运输指南正文中与首屏重复的一张包装示意图。Penta 布局、品牌蓝和原有正文继续保留；真实零件、新闻、客户来访、加工实录和认证资料没有被生成图冒充。

## 实际效果与前后对比

你标出的首页加工照片已替换为“零件与图纸评审”，与旁边的制造评审内容对应。首页另补齐加工、装夹、宽幅工具、检验和项目沟通画面；各服务采用对应工艺与材料，指南封面采用各自主题。

[首页图纸评审模块实页截图](D:/lzz/brand-photography-20261018/after/00-home-desktop-drawing.jpg) · [24 张母版总览](D:/lzz/brand-photography-20261018/review/24-masters.jpg) · [本地首页](http://127.0.0.1:4321/)

| 页面类型 / URL | 1440px | 390px |
| --- | --- | --- |
| `/` | [前后对比](D:/lzz/brand-photography-20261018/comparisons/00-home-1440.jpg) | [前后对比](D:/lzz/brand-photography-20261018/comparisons/00-home-390.jpg) |
| `/about/` | [前后对比](D:/lzz/brand-photography-20261018/comparisons/01-about-1440.jpg) | [前后对比](D:/lzz/brand-photography-20261018/comparisons/01-about-390.jpg) |
| `/about/how-we-work/` | [前后对比](D:/lzz/brand-photography-20261018/comparisons/10-about--how-we-work-1440.jpg) | [前后对比](D:/lzz/brand-photography-20261018/comparisons/10-about--how-we-work-390.jpg) |
| `/capabilities/cnc-milling-service/` | [前后对比](D:/lzz/brand-photography-20261018/comparisons/15-capabilities--cnc-milling-service-1440.jpg) | [前后对比](D:/lzz/brand-photography-20261018/comparisons/15-capabilities--cnc-milling-service-390.jpg) |
| `/factory/` | [前后对比](D:/lzz/brand-photography-20261018/comparisons/23-factory-1440.jpg) | [前后对比](D:/lzz/brand-photography-20261018/comparisons/23-factory-390.jpg) |
| `/resources/ordering/compare-cnc-machining-quotations/` | [前后对比](D:/lzz/brand-photography-20261018/comparisons/75-resources--ordering--compare-cnc-machining-quotations-1440.jpg) | [前后对比](D:/lzz/brand-photography-20261018/comparisons/75-resources--ordering--compare-cnc-machining-quotations-390.jpg) |
| `/resources/ordering/rfq-checklist/` | [前后对比](D:/lzz/brand-photography-20261018/comparisons/79-resources--ordering--rfq-checklist-1440.jpg) | [前后对比](D:/lzz/brand-photography-20261018/comparisons/79-resources--ordering--rfq-checklist-390.jpg) |

对比文件使用真实浏览器整页截图并排；原始截图分别保存在 [before](D:/lzz/brand-photography-20261018/before/00-home-1440.jpg) 和 [after](D:/lzz/brand-photography-20261018/after/00-home-1440.jpg) 同目录中。58 张最终截图覆盖全部 29 个采用新图的页面，另有功能截图。[截图索引](D:/lzz/brand-photography-20261018/comparisons.json) 记录七类代表页的前后路径。

## 24 张实际采用素材

所有母版均由宿主内置 ImageGen 新生成；独立画面数为 24，裁切与压缩不计入。119 个 WebP 响应式衍生中最大单文件为 249,502 bytes（约 250 KB），没有放大超出母版的尺寸。首页及 10 类服务首屏提供单独手机裁切图源，宽幅工具图也有手机构图。

| ID | 主题 | 母版比例 | 原始生成图 | 已实际采用的正式 URL |
| --- | --- | --- | --- | --- |
| home-machining | 首屏加工特写 | 4:5 | [母版](D:/lzz/brand-photography-20261018/masters/home-machining.png) | `/`<br>`/factory/` |
| home-drawing-review | 零件与图纸评审 | 4:3 | [母版](D:/lzz/brand-photography-20261018/masters/home-drawing-review.png) | `/`<br>`/about/contact/`<br>`/about/how-we-work/`<br>`/resources/`<br>`/resources/ordering/`<br>`/resources/ordering/rfq-checklist/`<br>`/resources/technical-guides/cnc-process-selection/`<br>`/resources/technical-guides/critical-features-cnc-drawing/` |
| home-setup | 装夹准备 | 1:1 | [母版](D:/lzz/brand-photography-20261018/masters/home-setup.png) | `/`<br>`/about/`<br>`/about/company-profile/` |
| home-tooling | 宽幅刀具细节 | 3:1 | [母版](D:/lzz/brand-photography-20261018/masters/home-tooling.png) | `/` |
| home-inspection | 检验规划 | 4:5 | [母版](D:/lzz/brand-photography-20261018/masters/home-inspection.png) | `/`<br>`/about/how-we-work/`<br>`/resources/ordering/compare-cnc-machining-quotations/`<br>`/resources/ordering/prototype-vs-small-batch-cnc/`<br>`/resources/technical-guides/cnc-process-selection/` |
| home-project-support | 项目沟通 | 4:3 | [母版](D:/lzz/brand-photography-20261018/masters/home-project-support.png) | `/`<br>`/about/contact/` |
| service-milling | 铣削 | 4:5 | [母版](D:/lzz/brand-photography-20261018/masters/service-milling.png) | `/capabilities/cnc-milling-service/`<br>`/resources/technical-guides/` |
| service-turning | 车削 | 4:5 | [母版](D:/lzz/brand-photography-20261018/masters/service-turning.png) | `/capabilities/cnc-turning-service/` |
| service-five-axis | 五轴 | 4:5 | [母版](D:/lzz/brand-photography-20261018/masters/service-five-axis.png) | `/capabilities/`<br>`/capabilities/5-axis-cnc-machining/` |
| service-aluminum | 铝件 | 4:5 | [母版](D:/lzz/brand-photography-20261018/masters/service-aluminum.png) | `/`<br>`/capabilities/aluminum-cnc-parts/`<br>`/resources/ordering/machined-prototype-approval-checklist/` |
| service-stainless | 不锈钢 | 4:5 | [母版](D:/lzz/brand-photography-20261018/masters/service-stainless.png) | `/`<br>`/capabilities/stainless-steel-cnc-parts/` |
| service-casting | 铸件精加工 | 4:5 | [母版](D:/lzz/brand-photography-20261018/masters/service-casting.png) | `/capabilities/casting-machining/` |
| service-brass | 铜件 | 4:5 | [母版](D:/lzz/brand-photography-20261018/masters/service-brass.png) | `/`<br>`/capabilities/copper-brass-cnc-parts/` |
| service-polymer | 工程塑料 | 4:5 | [母版](D:/lzz/brand-photography-20261018/masters/service-polymer.png) | `/`<br>`/capabilities/plastic-machined-parts/` |
| service-prototype | 原型与样件 | 4:5 | [母版](D:/lzz/brand-photography-20261018/masters/service-prototype.png) | `/capabilities/prototype-machining/`<br>`/capabilities/starting-with-a-sample/` |
| service-small-batch | 小批量 | 4:5 | [母版](D:/lzz/brand-photography-20261018/masters/service-small-batch.png) | `/capabilities/low-volume-production/` |
| guide-rfq | RFQ 输入 | 3:2 | [母版](D:/lzz/brand-photography-20261018/masters/guide-rfq.png) | `/`<br>`/resources/ordering/`<br>`/resources/ordering/rfq-checklist/` |
| guide-quotations | 报价比较 | 3:2 | [母版](D:/lzz/brand-photography-20261018/masters/guide-quotations.png) | `/about/how-we-work/`<br>`/resources/ordering/`<br>`/resources/ordering/compare-cnc-machining-quotations/` |
| guide-sample-approval | 样件验收 | 3:2 | [母版](D:/lzz/brand-photography-20261018/masters/guide-sample-approval.png) | `/about/how-we-work/`<br>`/resources/ordering/`<br>`/resources/ordering/machined-prototype-approval-checklist/` |
| guide-prototype-batch | 原型与批量 | 3:2 | [母版](D:/lzz/brand-photography-20261018/masters/guide-prototype-batch.png) | `/resources/ordering/`<br>`/resources/ordering/machined-prototype-approval-checklist/`<br>`/resources/ordering/prototype-vs-small-batch-cnc/` |
| guide-packing | 包装运输 | 3:2 | [母版](D:/lzz/brand-photography-20261018/masters/guide-packing.png) | `/about/how-we-work/`<br>`/capabilities/low-volume-production/`<br>`/factory/`<br>`/resources/ordering/`<br>`/resources/ordering/custom-cnc-parts-shipping-checklist/`<br>`/resources/ordering/prototype-vs-small-batch-cnc/`<br>`/resources/ordering/rfq-checklist/` |
| guide-process-selection | 工艺选择 | 3:2 | [母版](D:/lzz/brand-photography-20261018/masters/guide-process-selection.png) | `/`<br>`/resources/technical-guides/`<br>`/resources/technical-guides/cnc-process-selection/` |
| guide-critical-features | 关键特征 | 3:2 | [母版](D:/lzz/brand-photography-20261018/masters/guide-critical-features.png) | `/resources/technical-guides/`<br>`/resources/technical-guides/critical-features-cnc-drawing/` |
| guide-materials | 材料与表面处理 | 3:2 | [母版](D:/lzz/brand-photography-20261018/masters/guide-materials.png) | `/`<br>`/capabilities/`<br>`/resources/technical-guides/`<br>`/resources/technical-guides/material-and-finish-checklist/` |

[完整图像注册表](D:/lzz/lzz/_react/design/brand-photography-20261018/manifest.json) 记录来源、用途、说明、原始母版、桌面与手机图源及焦点。[原始提示词](D:/lzz/lzz/_react/design/brand-photography-20261018/prompts.json) 和 [ImageGen 输出路径](D:/lzz/brand-photography-20261018/generated-sources.json) 保留制作来源。[逐图位替换映射](D:/lzz/brand-photography-20261018/replacements.json) 记录旧图、新图和移除的重复图，[实际采用表](D:/lzz/brand-photography-20261018/adoption.json) 记录每张母版的页面范围。

## 内容与组件变更

- 保留原有正文、标题、参数表、链接、SEO 和询盘语义。仅更新图像、与图像有关的简短说明及必要的响应式构图。
- 将生成图统一标为 image-reference；展示大图采用简短 illustration 说明，移除已被替换图位的 Original LZZ photograph 等原照说明。
- 新增 EditorialImage 内部组件，支持桌面 / 手机 source、响应式尺寸、焦点和加载优先级；PentaVisual 沿用原有调用方式，没有对外 API 变化。
- 首页首屏保留真实蓝色零件前景，手机端将前景宽度调整为 145px 并下移，避开加工主体。首屏之外的新图按图位延迟加载。
- 运输指南保留一次首屏包装示意，删除正文重复插图；正文和原始运输记录保留。
- [DESIGN.md](D:/lzz/lzz/_react/DESIGN.md) 已明确展示摄影与真实记录的使用规则、手机构图和回退位置。

本轮相对任务开始时的源文件变动共 14 项，精确清单见 [source-changes.json](D:/lzz/brand-photography-20261018/source-changes.json)；不包含任务开始前已有的 Git 改动。

## 验收结果

| 检查 | 实际结果 |
| --- | --- |
| 全站真实浏览器 | 84 正式 URL × 1440 / 390，共 168 条记录；宽度一致、无页面横向溢出、无损坏图片、滚动或轮播后无未加载图 |
| 新图片覆盖 | 24 张均在实际页面完成桌面与手机图源、主体和裁切检查 |
| 静态图像核对 | 412 个图位、691 个 srcset 文件引用；图源存在、w 描述符等于真实像素宽度、替代文本和尺寸完整，issues = [] |
| SEO / 内容回归 | 84 页 title、description、canonical、JSON-LD、标题、表格及正文链接与任务前基线逐项一致 |
| npm run check | 976 文件；0 errors、0 warnings，9 个既有 hints |
| npm run build | 144 页构建成功 |
| npm run test:seo | 213 HTML、84 sitemap URL、188 redirects、91 raw URL 检查通过 |
| 询盘脚本 | verify-inquiry-draft.mjs 通过联系替代、输入、引用、旧草稿、上下文与邮件草稿检查 |
| 浏览器交互 | 手机导航、零件轮播、资源 brief 复制、询盘草稿和 mailto 准备正常；测试输入已清理，没有打开外部邮件或上传文件 |
| 独立视觉复核 | 未参与本次接入的 Subagent 只读检查实际截图，未发现阻碍交付的图片视觉问题；运输指南重复图已修正并复核 |

证据：[静态验证](D:/lzz/brand-photography-20261018/validation.json)、[全部浏览器记录](D:/lzz/brand-photography-20261018/browser-checks.json)、[浏览器汇总](D:/lzz/brand-photography-20261018/browser-summary.json)、[交互检查](D:/lzz/brand-photography-20261018/home-interactions.json)、[询盘检查](D:/lzz/brand-photography-20261018/functional-checks.json)、[独立视觉复核](D:/lzz/brand-photography-20261018/independent-visual-review.md)、[交付数据汇总](D:/lzz/brand-photography-20261018/delivery-summary.json)。

QuoteForm.tsx、evidence.ts、companyNews.ts、seo.ts、resourceFaq.ts 的 SHA-256 与任务前一致。所有旧图片保留；35 个产品详情及其产品结构未变。

## 84 个正式 URL 的完成状态

29 页采用新展示图；55 页保留适合其用途的产品 / 真实记录图片或原本无配图的功能阅读结构，并完成两档浏览器检查。本计划没有未完成的图片图位。

| # | URL | 图片处理 | 浏览器验收 |
| --- | --- | --- | --- |
| 1 | `/` | 展示图已升级 | 1440 / 390 通过 |
| 2 | `/about/` | 展示图已升级 | 1440 / 390 通过 |
| 3 | `/about/company-news/` | 原图保留并检查 | 1440 / 390 通过 |
| 4 | `/about/company-news/australian-customer-workshop-visit-january-2025/` | 原图保留并检查 | 1440 / 390 通过 |
| 5 | `/about/company-news/china-africa-west-lake-summit-2025/` | 原图保留并检查 | 1440 / 390 通过 |
| 6 | `/about/company-news/lzz-team-outing-2024/` | 原图保留并检查 | 1440 / 390 通过 |
| 7 | `/about/company-news/may-2025-lzz-team-outing/` | 原图保留并检查 | 1440 / 390 通过 |
| 8 | `/about/company-news/november-2025-hangzhou-lizhizao-group-activity/` | 原图保留并检查 | 1440 / 390 通过 |
| 9 | `/about/company-profile/` | 展示图已升级 | 1440 / 390 通过 |
| 10 | `/about/contact/` | 展示图已升级 | 1440 / 390 通过 |
| 11 | `/about/how-we-work/` | 展示图已升级 | 1440 / 390 通过 |
| 12 | `/capabilities/` | 展示图已升级 | 1440 / 390 通过 |
| 13 | `/capabilities/5-axis-cnc-machining/` | 展示图已升级 | 1440 / 390 通过 |
| 14 | `/capabilities/aluminum-cnc-parts/` | 展示图已升级 | 1440 / 390 通过 |
| 15 | `/capabilities/casting-machining/` | 展示图已升级 | 1440 / 390 通过 |
| 16 | `/capabilities/cnc-milling-service/` | 展示图已升级 | 1440 / 390 通过 |
| 17 | `/capabilities/cnc-turning-service/` | 展示图已升级 | 1440 / 390 通过 |
| 18 | `/capabilities/copper-brass-cnc-parts/` | 展示图已升级 | 1440 / 390 通过 |
| 19 | `/capabilities/low-volume-production/` | 展示图已升级 | 1440 / 390 通过 |
| 20 | `/capabilities/plastic-machined-parts/` | 展示图已升级 | 1440 / 390 通过 |
| 21 | `/capabilities/prototype-machining/` | 展示图已升级 | 1440 / 390 通过 |
| 22 | `/capabilities/stainless-steel-cnc-parts/` | 展示图已升级 | 1440 / 390 通过 |
| 23 | `/capabilities/starting-with-a-sample/` | 展示图已升级 | 1440 / 390 通过 |
| 24 | `/factory/` | 展示图已升级 | 1440 / 390 通过 |
| 25 | `/machined-parts/` | 原图保留并检查 | 1440 / 390 通过 |
| 26 | `/machined-parts/gallery/` | 原图保留并检查 | 1440 / 390 通过 |
| 27 | `/machined-parts/gallery/custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier/` | 原图保留并检查 | 1440 / 390 通过 |
| 28 | `/machined-parts/gallery/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/` | 原图保留并检查 | 1440 / 390 通过 |
| 29 | `/machined-parts/gallery/custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier/` | 原图保留并检查 | 1440 / 390 通过 |
| 30 | `/machined-parts/gallery/custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier/` | 原图保留并检查 | 1440 / 390 通过 |
| 31 | `/machined-parts/gallery/custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier/` | 原图保留并检查 | 1440 / 390 通过 |
| 32 | `/machined-parts/gallery/custom-cnc-machined-castings-transmission-housings-pump-bodies/` | 原图保留并检查 | 1440 / 390 通过 |
| 33 | `/machined-parts/gallery/custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier/` | 原图保留并检查 | 1440 / 390 通过 |
| 34 | `/machined-parts/gallery/custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier/` | 原图保留并检查 | 1440 / 390 通过 |
| 35 | `/machined-parts/gallery/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/` | 原图保留并检查 | 1440 / 390 通过 |
| 36 | `/machined-parts/gallery/custom-high-precision-machining-for-structural-aesthetic-components-oem/` | 原图保留并检查 | 1440 / 390 通过 |
| 37 | `/machined-parts/gallery/custom-oem-cnc-machined-non-metallic-components-insulating-parts/` | 原图保留并检查 | 1440 / 390 通过 |
| 38 | `/machined-parts/gallery/custom-oem-cnc-machined-plastic-parts-manufacturer/` | 原图保留并检查 | 1440 / 390 通过 |
| 39 | `/machined-parts/gallery/custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer/` | 原图保留并检查 | 1440 / 390 通过 |
| 40 | `/machined-parts/gallery/custom-oem-cnc-turning-manufacturer/` | 原图保留并检查 | 1440 / 390 通过 |
| 41 | `/machined-parts/gallery/custom-oem-high-precision-cnc-milling-manufacturer/` | 原图保留并检查 | 1440 / 390 通过 |
| 42 | `/machined-parts/gallery/custom-rotary-cylindrical-components/` | 原图保留并检查 | 1440 / 390 通过 |
| 43 | `/machined-parts/gallery/full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing/` | 原图保留并检查 | 1440 / 390 通过 |
| 44 | `/machined-parts/gallery/global-manufacturer-of-multi-sided-precision-machined-components/` | 原图保留并检查 | 1440 / 390 通过 |
| 45 | `/machined-parts/gallery/global-oem-precision-machining-solutions/` | 原图保留并检查 | 1440 / 390 通过 |
| 46 | `/machined-parts/gallery/high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem/` | 原图保留并检查 | 1440 / 390 通过 |
| 47 | `/machined-parts/gallery/high-volume-cnc-turning-for-complex-internal-external-features/` | 原图保留并检查 | 1440 / 390 通过 |
| 48 | `/machined-parts/gallery/oem-precision-cnc-machined-casting-housing-structural-enclosures/` | 原图保留并检查 | 1440 / 390 通过 |
| 49 | `/machined-parts/gallery/oem-precision-cnc-machined-casting-housings/` | 原图保留并检查 | 1440 / 390 通过 |
| 50 | `/machined-parts/gallery/precision-cnc-machined-castings-custom-oem-housings/` | 原图保留并检查 | 1440 / 390 通过 |
| 51 | `/machined-parts/gallery/precision-cnc-machined-castings-manufacturer/` | 原图保留并检查 | 1440 / 390 通过 |
| 52 | `/machined-parts/gallery/precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances/` | 原图保留并检查 | 1440 / 390 通过 |
| 53 | `/machined-parts/gallery/precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier/` | 原图保留并检查 | 1440 / 390 通过 |
| 54 | `/machined-parts/gallery/precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier/` | 原图保留并检查 | 1440 / 390 通过 |
| 55 | `/machined-parts/gallery/precision-machining-for-functional-plastic-blocks-structural-components/` | 原图保留并检查 | 1440 / 390 通过 |
| 56 | `/machined-parts/gallery/precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures/` | 原图保留并检查 | 1440 / 390 通过 |
| 57 | `/machined-parts/gallery/precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier/` | 原图保留并检查 | 1440 / 390 通过 |
| 58 | `/machined-parts/gallery/precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier/` | 原图保留并检查 | 1440 / 390 通过 |
| 59 | `/machined-parts/gallery/small-batch-cnc-machining-manufacturer-complex-aluminum-housings/` | 原图保留并检查 | 1440 / 390 通过 |
| 60 | `/machined-parts/gallery/small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv/` | 原图保留并检查 | 1440 / 390 通过 |
| 61 | `/machined-parts/gallery/ultra-high-precision-machining-services/` | 原图保留并检查 | 1440 / 390 通过 |
| 62 | `/machined-parts/machining-examples/` | 原图保留并检查 | 1440 / 390 通过 |
| 63 | `/machined-parts/machining-examples/29-inch-display-housing-cnc-machining/` | 原图保留并检查 | 1440 / 390 通过 |
| 64 | `/machined-parts/machining-examples/custom-metal-parts-batch-examples/` | 原图保留并检查 | 1440 / 390 通过 |
| 65 | `/machined-parts/machining-examples/custom-plastic-parts-ptfe-pom-pe-acrylic/` | 原图保留并检查 | 1440 / 390 通过 |
| 66 | `/machined-parts/machining-examples/five-axis-machining-multi-face-parts/` | 原图保留并检查 | 1440 / 390 通过 |
| 67 | `/machined-parts/machining-examples/milling-a-pocketed-enclosure-form/` | 原图保留并检查 | 1440 / 390 通过 |
| 68 | `/machined-parts/machining-examples/milling-prismatic-components/` | 原图保留并检查 | 1440 / 390 通过 |
| 69 | `/machined-parts/machining-examples/turning-then-milling-cylindrical-parts/` | 原图保留并检查 | 1440 / 390 通过 |
| 70 | `/machined-parts/machining-examples/two-stage-cnc-milling/` | 原图保留并检查 | 1440 / 390 通过 |
| 71 | `/privacy/` | 原图保留并检查 | 1440 / 390 通过 |
| 72 | `/quote/` | 原图保留并检查 | 1440 / 390 通过 |
| 73 | `/resources/` | 展示图已升级 | 1440 / 390 通过 |
| 74 | `/resources/faq/` | 原图保留并检查 | 1440 / 390 通过 |
| 75 | `/resources/ordering/` | 展示图已升级 | 1440 / 390 通过 |
| 76 | `/resources/ordering/compare-cnc-machining-quotations/` | 展示图已升级 | 1440 / 390 通过 |
| 77 | `/resources/ordering/custom-cnc-parts-shipping-checklist/` | 展示图已升级 | 1440 / 390 通过 |
| 78 | `/resources/ordering/machined-prototype-approval-checklist/` | 展示图已升级 | 1440 / 390 通过 |
| 79 | `/resources/ordering/prototype-vs-small-batch-cnc/` | 展示图已升级 | 1440 / 390 通过 |
| 80 | `/resources/ordering/rfq-checklist/` | 展示图已升级 | 1440 / 390 通过 |
| 81 | `/resources/technical-guides/` | 展示图已升级 | 1440 / 390 通过 |
| 82 | `/resources/technical-guides/cnc-process-selection/` | 展示图已升级 | 1440 / 390 通过 |
| 83 | `/resources/technical-guides/critical-features-cnc-drawing/` | 展示图已升级 | 1440 / 390 通过 |
| 84 | `/resources/technical-guides/material-and-finish-checklist/` | 展示图已升级 | 1440 / 390 通过 |

## 回退与范围

任务开始时的已有源码、DESIGN.md、package.json 及 Git 状态已保存在 D:/lzz/brand-photography-20261018/backup/ 和 git-status-before.txt。按 source-changes.json 只恢复本次修改的对应文件；新增 EditorialImage、119 个 WebP、design/brand-photography-20261018 和本报告可按清单单独移除。不要 reset、clean 或整目录覆盖任务前已有改动。

未部署生产环境。未进行真实询盘发送或附件上传；询盘仍遵循现有邮件草稿流程。本轮未取得真实用户流量的 Core Web Vitals 数据，因此没有宣称线上性能通过；已完成响应式 WebP、图像尺寸与延迟加载控制。没有其它阻碍本地交付的未完成项。
