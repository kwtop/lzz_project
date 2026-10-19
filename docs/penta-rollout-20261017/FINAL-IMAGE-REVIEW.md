# 最终全站图片落位复核

84 个正式页面的图片落位已完成实际目视复核。新配图的 AI 身份与使用边界可见，真实产品、工厂、人物、证件及测量设备保持原始来源。当前图片落位未发现待修的主体裁切、拉伸、破图或丢失 AI 图注。P04 的真实细节照片仍待补，通用概念配图没有解决这一素材缺口。

## 实际目视范围

- 基线141个文件：已实际逐组查看9张源图联系表，另放大核对P04、P29原始/发布图、旧概念图和3组同源照片；见../image-audit/。
- 最终84页：实际查看121张desktop1440/mobile390图位联系表，涵盖766个img渲染位置；每个slot有src、ALT、来源标签、图注、rect及源文件尺寸。3个无图目录保存首屏作为明确例外。
- 额外实际查看26张完整figure/section截图：7个video×2宽度、材料和工厂packing×2宽度、8篇指南390px收尾。另直接查看2张原始video poster，区分真实源图与浏览器加载控件。
- 10张新AI概念共29处img落位，两端58个位置均已在上述范围内查看；1440/800响应变体只算同一概念。
- 1024/768未由本worker对84页再做一轮完整目视；全336条4宽度DOM检查与222张页面截图为主Agent采集的验证证据。不要把本图片审查称为逐字复核所有正文或已验证视频播放。

## 数量口径

| 范围 | img槽位 | video poster槽位 | 合计槽位 | img src文件 | poster文件 | src/poster去重文件 | 独立来源组 | 有效独立静态图 | 独立视频海报 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 改前 | 382 | 7 | 389 | 139 | 7 | 141 | 124 | 116 | 7 |
| 改后 | 383 | 7 | 390 | 143 | 7 | 145 | 128 | 120 | 7 |

src与poster均转为URL pathname后去重，5张poster也以img预览引用，不能重复相加。当前145个引用文件＝132个保留＋13个新引用；9个旧引用退役，真实源文件未删除。13个新引用＝10张新AI概念的11个src文件（drawing-review有1440/800）＋2张真实询价界面截图。文件数不包含只在srcset中声明的缩图，也不包含全局logo、图标、CSS背景及OG图片。独立来源组沿用保守同源合并；120个有效静态来源不计7个视频海报与1个P04低清来源。

## 关键复核结果与例外

- 材料总览p012：已用最后修订重拍核对，3:2完整保留源图构图和四种原料形态；手机与桌面图注清楚。
- 工厂p024：已完整查看packing figure，两端均有“AI illustration, not an LZZ shipment or approved packing specification”图注；联系表上下留白是裁片边界，不是网页漏图注。
- P04/p044：原图限制300×200并显示“Low-resolution source · form reference only. Detailed photograph needed.”；新增通用port concept明示“not this part or its unseen geometry”。现有3个有效独立配图来源包含概念、相关工艺与相关零件，不代表3张该件实拍。仍需索取该件清楚主体及有差异的孔口/侧面细节原件，不能用AI重建。
- 产品与案例：孔口、螺纹外形、叶轮轮廓、完整壳体及真实加工/夹持主体可辨；真实局部和全幅仍按一个摄影来源去重。CMM图保留“非该件检验记录”的文字边界。显示尺寸与源文件尺寸均可在final-images.json/placements.json逐项核对；未按文件名1200推定真实清晰度。
- 视频：14个figure的真实海报/预览及图注已查看。p020/p063的preload=none原生播放器在此次headless补拍中存在浏览器加载圆圈；原始poster无此圆圈。本报告不对播放成功作结论，播放功能由主Agent功能验证证据负责。其余自定义Play预览显示正常。
- 8篇指南手机收尾：标题30px、卡片padding20px最终版本已实际查看，均为两行标题，正文、RFQ按钮与相关链接完整可读。
- Resources、RFQ & ordering、Technical guides三个目录保留无装饰图的已确认例外；FAQ、长指南、新闻、联系、隐私与询价工具按任务性质审查，未用生成图凑展示数量。

## 新AI概念的最终落位

| 概念 | 实际引用页面数 | 具体路径和图注 |
|---|---:|---|
| sample-inputs | 4 | /media/penta-rollout-20261017/sample-inputs-1440.webp<br>Sample-review concept · AI illustration, not a reconstruction or measurement record. |
| drawing-review | 8 | /media/penta-rollout-20261017/drawing-review-1440.webp<br>/media/penta-rollout-20261017/drawing-review-800.webp<br>Drawing-review concept · AI illustration, not an approved drawing or customer part. |
| revision-review | 4 | /media/penta-rollout-20261017/revision-review-1440.webp<br>Revision-planning concept · AI illustration; no approved order or inspection record is shown. |
| brass-interface | 1 | /media/penta-rollout-20261017/brass-interface-1440.webp<br>Connection concept · AI illustration; grade, threads and acceptance follow the drawing. |
| separated-packing | 3 | /media/penta-rollout-20261017/separated-packing-1440.webp<br>Packing concept · AI illustration, not an LZZ shipment or approved packing specification. |
| steel-datums | 1 | /media/penta-rollout-20261017/steel-datums-1440.webp<br>Turned-feature concept · AI illustration, not a customer part or tolerance result. |
| port-review | 1 | /media/penta-rollout-20261017/port-review-1440.webp<br>Port-review concept · AI illustration of a generic form, not this part or its unseen geometry. |
| protected-interfaces | 2 | /media/penta-rollout-20261017/protected-interfaces-1440.webp<br>Surface-protection concept · AI illustration; packing for the actual part must be agreed. |
| acceptance-plan | 2 | /media/penta-rollout-20261017/acceptance-plan-1440.webp<br>Acceptance-planning concept · AI illustration, not measured results or a test report. |
| material-finishes | 3 | /media/penta-rollout-20261017/material-finishes-1440.webp<br>Material and finish concept · AI illustration; exact grade and final condition require confirmation. |

这些图片只解释一般设计、材料、验收准备和保护方式，不作为工厂、客户零件、实测结果、库存或出货证明。原始PNG和最终WebP可在../review/的“新ImageGen”视图逐张查看，10张均有实际文件。

## 逐页追溯

图文覆盖按当前data-core-section声明计数；与基线报告的DOM叙事模块统计不直接作数值同比。例外原因与每个引用来源详见final-pages.json。图位联系表的邻近文字可能被裁片边界截断，不能据此当成网站真实溢出。

| 页面 | img / poster | 独立有效静态图 / 视频 | 声明图文覆盖 | 状态 | 目视证据 |
|---|---:|---:|---:|---|---|
| p001 / | 9 / 0 | 9 / 0 | 5/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p001-images-01.jpg) [2](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p001-images-02.jpg) [3](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p001-images-03.jpg) |
| p002 /about/ | 3 / 0 | 3 / 0 | 3/4 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p002-images-01.jpg) |
| p003 /about/company-news/ | 5 / 0 | 5 / 0 | 3/4 | 任务例外；落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p003-images-01.jpg) [2](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p003-images-02.jpg) |
| p004 /about/company-news/australian-customer-workshop-visit-january-2025/ | 7 / 0 | 7 / 0 | 4/4 | 任务例外；落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p004-images-01.jpg) [2](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p004-images-02.jpg) |
| p005 /about/company-news/china-africa-west-lake-summit-2025/ | 7 / 0 | 7 / 0 | 4/4 | 任务例外；落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p005-images-01.jpg) [2](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p005-images-02.jpg) |
| p006 /about/company-news/lzz-team-outing-2024/ | 8 / 0 | 8 / 0 | 4/4 | 任务例外；落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p006-images-01.jpg) [2](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p006-images-02.jpg) |
| p007 /about/company-news/may-2025-lzz-team-outing/ | 6 / 0 | 6 / 0 | 4/4 | 任务例外；落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p007-images-01.jpg) [2](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p007-images-02.jpg) |
| p008 /about/company-news/november-2025-hangzhou-lizhizao-group-activity/ | 7 / 0 | 7 / 0 | 4/4 | 任务例外；落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p008-images-01.jpg) [2](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p008-images-02.jpg) |
| p009 /about/company-profile/ | 6 / 0 | 6 / 0 | 4/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p009-images-01.jpg) [2](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p009-images-02.jpg) |
| p010 /about/contact/ | 3 / 0 | 3 / 0 | 3/5 | 任务例外；落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p010-images-01.jpg) |
| p011 /about/how-we-work/ | 6 / 0 | 6 / 0 | 4/6 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p011-images-01.jpg) [2](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p011-images-02.jpg) |
| p012 /capabilities/ | 11 / 0 | 11 / 0 | 4/6 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p012-images-01.jpg) [2](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p012-images-02.jpg) [3](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p012-images-03.jpg) |
| p013 /capabilities/5-axis-cnc-machining/ | 6 / 0 | 6 / 0 | 4/6 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p013-images-01.jpg) [2](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p013-images-02.jpg) |
| p014 /capabilities/aluminum-cnc-parts/ | 7 / 0 | 7 / 0 | 5/6 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p014-images-01.jpg) [2](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p014-images-02.jpg) |
| p015 /capabilities/casting-machining/ | 5 / 0 | 5 / 0 | 4/6 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p015-images-01.jpg) [2](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p015-images-02.jpg) |
| p016 /capabilities/cnc-milling-service/ | 7 / 0 | 7 / 0 | 5/7 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p016-images-01.jpg) [2](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p016-images-02.jpg) |
| p017 /capabilities/cnc-turning-service/ | 7 / 0 | 7 / 0 | 5/6 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p017-images-01.jpg) [2](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p017-images-02.jpg) |
| p018 /capabilities/copper-brass-cnc-parts/ | 4 / 0 | 4 / 0 | 4/6 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p018-images-01.jpg) |
| p019 /capabilities/low-volume-production/ | 4 / 0 | 4 / 0 | 4/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p019-images-01.jpg) |
| p020 /capabilities/plastic-machined-parts/ | 7 / 1 | 7 / 1 | 5/7 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p020-images-01.jpg) [2](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p020-images-02.jpg) |
| p021 /capabilities/prototype-machining/ | 4 / 0 | 4 / 0 | 3/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p021-images-01.jpg) |
| p022 /capabilities/stainless-steel-cnc-parts/ | 5 / 0 | 5 / 0 | 4/6 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p022-images-01.jpg) [2](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p022-images-02.jpg) |
| p023 /capabilities/starting-with-a-sample/ | 4 / 0 | 4 / 0 | 4/6 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p023-images-01.jpg) |
| p024 /factory/ | 7 / 0 | 7 / 0 | 5/7 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p024-images-01.jpg) [2](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p024-images-02.jpg) |
| p025 /machined-parts/ | 8 / 0 | 8 / 0 | 3/4 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p025-images-01.jpg) [2](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p025-images-02.jpg) |
| p026 /machined-parts/gallery/ | 40 / 0 | 39 / 0 | 2/4 | 任务例外；落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p026-images-01.jpg) [2](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p026-images-02.jpg) [3](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p026-images-03.jpg) [4](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p026-images-04.jpg) [5](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p026-images-05.jpg) [6](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p026-images-06.jpg) [7](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p026-images-07.jpg) [8](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p026-images-08.jpg) [9](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p026-images-09.jpg) [10](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p026-images-10.jpg) |
| p027 /machined-parts/gallery/custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier/ | 4 / 0 | 4 / 0 | 4/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p027-images-01.jpg) |
| p028 /machined-parts/gallery/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/ | 3 / 0 | 3 / 0 | 3/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p028-images-01.jpg) |
| p029 /machined-parts/gallery/custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier/ | 3 / 0 | 3 / 0 | 3/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p029-images-01.jpg) |
| p030 /machined-parts/gallery/custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier/ | 5 / 0 | 5 / 0 | 4/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p030-images-01.jpg) [2](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p030-images-02.jpg) |
| p031 /machined-parts/gallery/custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier/ | 3 / 0 | 3 / 0 | 3/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p031-images-01.jpg) |
| p032 /machined-parts/gallery/custom-cnc-machined-castings-transmission-housings-pump-bodies/ | 3 / 0 | 3 / 0 | 3/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p032-images-01.jpg) |
| p033 /machined-parts/gallery/custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier/ | 3 / 0 | 3 / 0 | 3/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p033-images-01.jpg) |
| p034 /machined-parts/gallery/custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier/ | 3 / 0 | 3 / 0 | 3/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p034-images-01.jpg) |
| p035 /machined-parts/gallery/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/ | 3 / 0 | 3 / 0 | 3/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p035-images-01.jpg) |
| p036 /machined-parts/gallery/custom-high-precision-machining-for-structural-aesthetic-components-oem/ | 3 / 0 | 3 / 0 | 3/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p036-images-01.jpg) |
| p037 /machined-parts/gallery/custom-oem-cnc-machined-non-metallic-components-insulating-parts/ | 3 / 0 | 3 / 0 | 3/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p037-images-01.jpg) |
| p038 /machined-parts/gallery/custom-oem-cnc-machined-plastic-parts-manufacturer/ | 3 / 0 | 3 / 0 | 3/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p038-images-01.jpg) |
| p039 /machined-parts/gallery/custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer/ | 3 / 0 | 3 / 0 | 3/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p039-images-01.jpg) |
| p040 /machined-parts/gallery/custom-oem-cnc-turning-manufacturer/ | 3 / 0 | 3 / 0 | 3/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p040-images-01.jpg) |
| p041 /machined-parts/gallery/custom-oem-high-precision-cnc-milling-manufacturer/ | 3 / 0 | 3 / 0 | 3/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p041-images-01.jpg) |
| p042 /machined-parts/gallery/custom-rotary-cylindrical-components/ | 3 / 0 | 3 / 0 | 3/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p042-images-01.jpg) |
| p043 /machined-parts/gallery/full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing/ | 3 / 0 | 3 / 0 | 3/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p043-images-01.jpg) |
| p044 /machined-parts/gallery/global-manufacturer-of-multi-sided-precision-machined-components/ | 4 / 0 | 3 / 0 | 4/5 | P04实拍待补；落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p044-images-01.jpg) |
| p045 /machined-parts/gallery/global-oem-precision-machining-solutions/ | 3 / 0 | 3 / 0 | 3/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p045-images-01.jpg) |
| p046 /machined-parts/gallery/high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem/ | 3 / 0 | 3 / 0 | 3/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p046-images-01.jpg) |
| p047 /machined-parts/gallery/high-volume-cnc-turning-for-complex-internal-external-features/ | 3 / 0 | 3 / 0 | 3/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p047-images-01.jpg) |
| p048 /machined-parts/gallery/oem-precision-cnc-machined-casting-housing-structural-enclosures/ | 3 / 0 | 3 / 0 | 3/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p048-images-01.jpg) |
| p049 /machined-parts/gallery/oem-precision-cnc-machined-casting-housings/ | 3 / 0 | 3 / 0 | 3/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p049-images-01.jpg) |
| p050 /machined-parts/gallery/precision-cnc-machined-castings-custom-oem-housings/ | 3 / 0 | 3 / 0 | 3/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p050-images-01.jpg) |
| p051 /machined-parts/gallery/precision-cnc-machined-castings-manufacturer/ | 3 / 0 | 3 / 0 | 3/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p051-images-01.jpg) |
| p052 /machined-parts/gallery/precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances/ | 3 / 0 | 3 / 0 | 3/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p052-images-01.jpg) |
| p053 /machined-parts/gallery/precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier/ | 3 / 0 | 3 / 0 | 3/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p053-images-01.jpg) |
| p054 /machined-parts/gallery/precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier/ | 3 / 0 | 3 / 0 | 3/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p054-images-01.jpg) |
| p055 /machined-parts/gallery/precision-machining-for-functional-plastic-blocks-structural-components/ | 3 / 0 | 3 / 0 | 3/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p055-images-01.jpg) |
| p056 /machined-parts/gallery/precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures/ | 3 / 0 | 3 / 0 | 3/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p056-images-01.jpg) |
| p057 /machined-parts/gallery/precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier/ | 3 / 0 | 3 / 0 | 3/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p057-images-01.jpg) |
| p058 /machined-parts/gallery/precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier/ | 3 / 0 | 3 / 0 | 3/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p058-images-01.jpg) |
| p059 /machined-parts/gallery/small-batch-cnc-machining-manufacturer-complex-aluminum-housings/ | 4 / 0 | 3 / 0 | 4/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p059-images-01.jpg) |
| p060 /machined-parts/gallery/small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv/ | 3 / 0 | 3 / 0 | 3/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p060-images-01.jpg) |
| p061 /machined-parts/gallery/ultra-high-precision-machining-services/ | 4 / 0 | 3 / 0 | 4/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p061-images-01.jpg) |
| p062 /machined-parts/machining-examples/ | 9 / 0 | 9 / 0 | 3/4 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p062-images-01.jpg) [2](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p062-images-02.jpg) [3](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p062-images-03.jpg) |
| p063 /machined-parts/machining-examples/29-inch-display-housing-cnc-machining/ | 3 / 1 | 3 / 1 | 3/4 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p063-images-01.jpg) |
| p064 /machined-parts/machining-examples/custom-metal-parts-batch-examples/ | 6 / 1 | 5 / 1 | 4/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p064-images-01.jpg) [2](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p064-images-02.jpg) |
| p065 /machined-parts/machining-examples/custom-plastic-parts-ptfe-pom-pe-acrylic/ | 8 / 4 | 4 / 4 | 4/5 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p065-images-01.jpg) [2](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p065-images-02.jpg) |
| p066 /machined-parts/machining-examples/five-axis-machining-multi-face-parts/ | 3 / 0 | 3 / 0 | 3/4 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p066-images-01.jpg) |
| p067 /machined-parts/machining-examples/milling-a-pocketed-enclosure-form/ | 3 / 0 | 3 / 0 | 3/4 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p067-images-01.jpg) |
| p068 /machined-parts/machining-examples/milling-prismatic-components/ | 3 / 0 | 3 / 0 | 3/4 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p068-images-01.jpg) |
| p069 /machined-parts/machining-examples/turning-then-milling-cylindrical-parts/ | 3 / 0 | 3 / 0 | 3/4 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p069-images-01.jpg) |
| p070 /machined-parts/machining-examples/two-stage-cnc-milling/ | 3 / 0 | 3 / 0 | 3/4 | 落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p070-images-01.jpg) |
| p071 /privacy/ | 3 / 0 | 3 / 0 | 3/5 | 任务例外；落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p071-images-01.jpg) |
| p072 /quote/ | 3 / 0 | 3 / 0 | 1/3 | 任务例外；落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p072-images-01.jpg) |
| p073 /resources/ | 0 / 0 | 0 / 0 | 0/2 | 任务例外；落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p073-images-01.jpg) |
| p074 /resources/faq/ | 3 / 0 | 3 / 0 | 3/4 | 任务例外；落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p074-images-01.jpg) |
| p075 /resources/ordering/ | 0 / 0 | 0 / 0 | 0/3 | 任务例外；落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p075-images-01.jpg) |
| p076 /resources/ordering/compare-cnc-machining-quotations/ | 3 / 0 | 3 / 0 | 3/5 | 任务例外；落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p076-images-01.jpg) |
| p077 /resources/ordering/custom-cnc-parts-shipping-checklist/ | 4 / 0 | 4 / 0 | 4/5 | 任务例外；落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p077-images-01.jpg) |
| p078 /resources/ordering/machined-prototype-approval-checklist/ | 3 / 0 | 3 / 0 | 3/5 | 任务例外；落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p078-images-01.jpg) |
| p079 /resources/ordering/prototype-vs-small-batch-cnc/ | 3 / 0 | 3 / 0 | 3/5 | 任务例外；落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p079-images-01.jpg) |
| p080 /resources/ordering/rfq-checklist/ | 3 / 0 | 3 / 0 | 3/5 | 任务例外；落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p080-images-01.jpg) |
| p081 /resources/technical-guides/ | 0 / 0 | 0 / 0 | 0/2 | 任务例外；落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p081-images-01.jpg) |
| p082 /resources/technical-guides/cnc-process-selection/ | 5 / 0 | 5 / 0 | 3/4 | 任务例外；落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p082-images-01.jpg) [2](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p082-images-02.jpg) |
| p083 /resources/technical-guides/critical-features-cnc-drawing/ | 3 / 0 | 3 / 0 | 3/5 | 任务例外；落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p083-images-01.jpg) |
| p084 /resources/technical-guides/material-and-finish-checklist/ | 5 / 0 | 5 / 0 | 4/5 | 任务例外；落位通过 | [1](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p084-images-01.jpg) [2](D:/lzz/penta-rollout-20261017/final-image-review/sheets/p084-images-02.jpg) |

## 交付与复现

- final-images.json：145个实际引用文件、来源组、native尺寸、SHA256、全部引用ALT/图注/来源。
- final-pages.json：84页图文覆盖、有效来源、任务例外、全部文件引用与4宽度检查。
- placements.json、INDEX.md、sheets/：121张已实际查看联系表及766个图位。
- supplement.json、supplement/：26张已实际查看完整图文补拍。
- ../review/：最新84页、168张改前/222张改后截图、10张新AI、141图审查基线的审阅工具；18项自身交互检查通过，JavaScript errors0。完整长图直接引用before/after，不复制长图。
- 本worker未修改网站源文件、未启动/停止服务、未部署，未播放视频或发送表单。

复现：node final-image-review/build-check.cjs；node final-image-review/supplement.cjs（只读本地浏览器）；完成实际目视后记录reviewed.json，再node final-image-review/finalize.cjs。画廊重建使用node build-review.cjs；本地只读服务由主Agent决定启动，node serve-review.cjs，固定127.0.0.1:4340/review/。
