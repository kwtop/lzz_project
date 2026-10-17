# 图片升级实际结果

2026-10-15。本文件记录采用结果，不把候选数当成完成质量。

## 采用与保留

| 图位 | 原图/参考 | 最终结果 |
|---|---|---|
| HOME-I1 | machining-hero-v2＋原milling-enclosure-operation，仅作机械/摄影参考 | 新machining-hero四个响应式WebP；4:3完整刀具/工件/虎钳；可见AI图注 |
| CAP-I11 | 原inspection-concept＋真实cmm-detail，仅参考机械关系 | 新inspection-concept四个响应式WebP；3:2接触测量概念，不是检验记录 |
| P29背景 | 原绿色圆件＋ImageGen空背景 | 主体原像素保留、完整来源另有静态图；当前只采用此1个背景合成 |
| 35条具体产品 | 35条已实际打开的原主体；P12/P13/P17使用规定独立原参考 | 全部撤下未经核对的重画主体；13处仅裁多余画布；原件保留，不向模型补隐藏结构 |
| 工厂/人员/文件/纪实/交付 | 原evidence/news/文件资料 | 真实图片未生成替代；按自然比例、适当容器与相邻HTML说明呈现 |

[3次实际调用完整prompt](imagegen-redesign-20261015/prompts.json)、[原参考/输出/用途/像素/原文件哈希](imagegen-redesign-20261015/manifest.json)、[逐图位执行状态](imagegen-redesign-20261015/image-position-status.json)、[35条原图→最终图映射](imagegen-redesign-20261015/product-media-final.json)、[10个背景候选采用/拒绝原因](imagegen-redesign-20261015/background-decisions.json)。新生成PNG与原图独立保存，3份项目PNG均与工具原输出哈希一致。候选已移出public，未采用图不参与当前页面。

## 安全回退与缺少真实素材

P00/P02/P03/P04/P11/P19/P20/P31/P32的背景候选未采用，原因是低清边缘、近白色高光或近灰背景无法可靠分离；原主体已完整接入页面。它们的“净背景升级”列为未完成，需可靠新原片或补拍，不影响当前准确展示。R16真实小件保护/标签/封箱图仍缺，页面以采购责任说明替代错误证据角色；当前ISO/校准/实测报告及日期核对等真实资料缺口见实施报告。

具体产品不能用新生成结构补齐，证书、工厂和交付照片不能用AI填缺。其余既有概念图只在有解释作用的图位保留，并保留AI身份。BOM规划合图未重复加入P28/P34，逐料号输入以HTML直接呈现。

## 全部产品采用表

| ID / 页面 | 原主体处理 | 当前主图 |
|---|---|---|
| [P00](http://127.0.0.1:4323/products/part-examples/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/) | 仅空白画布裁切；背景候选拒绝 | /media/product-sources-20261015/p00-framed-1200.webp（520×520） |
| [P01](http://127.0.0.1:4323/products/part-examples/custom-oem-high-precision-cnc-milling-manufacturer/) | 完整来源/独立原参考 | /media/product-sources-20261015/p01-1200.webp（800×800） |
| [P02](http://127.0.0.1:4323/products/part-examples/ultra-high-precision-machining-services/) | 完整来源/独立原参考；背景候选拒绝 | /media/product-sources-20261015/p02-1200.webp（800×800） |
| [P03](http://127.0.0.1:4323/products/part-examples/global-oem-precision-machining-solutions/) | 仅空白画布裁切；背景候选拒绝 | /media/product-sources-20261015/p03-framed-1200.webp（520×650） |
| [P04](http://127.0.0.1:4323/products/part-examples/global-manufacturer-of-multi-sided-precision-machined-components/) | 仅空白画布裁切；背景候选拒绝 | /media/product-sources-20261015/p04-framed-1200.webp（864×576） |
| [P05](http://127.0.0.1:4323/products/part-examples/custom-oem-cnc-turning-manufacturer/) | 完整来源/独立原参考 | /media/product-sources-20261015/p05-1200.webp（800×800） |
| [P06](http://127.0.0.1:4323/products/part-examples/custom-rotary-cylindrical-components/) | 完整来源/独立原参考 | /media/product-sources-20261015/p06-1200.webp（800×800） |
| [P07](http://127.0.0.1:4323/products/part-examples/custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer/) | 完整来源/独立原参考 | /media/product-sources-20261015/p07-1200.webp（800×800） |
| [P08](http://127.0.0.1:4323/products/part-examples/full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing/) | 完整来源/独立原参考 | /media/product-sources-20261015/p08-1200.webp（800×800） |
| [P09](http://127.0.0.1:4323/products/part-examples/custom-high-precision-machining-for-structural-aesthetic-components-oem/) | 完整来源/独立原参考 | /media/product-sources-20261015/p09-1200.webp（1200×1200） |
| [P10](http://127.0.0.1:4323/products/part-examples/high-volume-cnc-turning-for-complex-internal-external-features/) | 完整来源/独立原参考 | /media/product-sources-20261015/p10-1200.webp（800×800） |
| [P11](http://127.0.0.1:4323/products/part-examples/high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem/) | 完整来源/独立原参考；背景候选拒绝 | /media/product-sources-20261015/p11-1200.webp（800×800） |
| [P12](http://127.0.0.1:4323/products/part-examples/custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier/) | 完整来源/独立原参考 | /media/product-sources-20261015/p12-1200.webp（1200×1600） |
| [P13](http://127.0.0.1:4323/products/part-examples/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/) | 完整来源/独立原参考 | /media/product-sources-20261015/p13-1200.webp（1080×814） |
| [P14](http://127.0.0.1:4323/products/part-examples/custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier/) | 仅空白画布裁切 | /media/product-sources-20261015/p14-framed-1200.webp（520×650） |
| [P15](http://127.0.0.1:4323/products/part-examples/custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier/) | 仅空白画布裁切 | /media/product-sources-20261015/p15-framed-480.webp（480×480） |
| [P16](http://127.0.0.1:4323/products/part-examples/custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier/) | 仅空白画布裁切 | /media/product-sources-20261015/p16-framed-1200.webp（720×500） |
| [P17](http://127.0.0.1:4323/products/part-examples/custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier/) | 完整来源/独立原参考 | /media/product-sources-20261015/p17-1200.webp（1200×1200） |
| [P18](http://127.0.0.1:4323/products/part-examples/custom-cnc-machined-castings-transmission-housings-pump-bodies/) | 仅空白画布裁切 | /media/product-sources-20261015/p18-framed-1200.webp（640×640） |
| [P19](http://127.0.0.1:4323/products/part-examples/custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier/) | 仅空白画布裁切；背景候选拒绝 | /media/product-sources-20261015/p19-framed-1200.webp（800×600） |
| [P20](http://127.0.0.1:4323/products/part-examples/custom-oem-cnc-machined-non-metallic-components-insulating-parts/) | 完整来源/独立原参考；背景候选拒绝 | /media/product-sources-20261015/p20-1200.webp（800×800） |
| [P21](http://127.0.0.1:4323/products/part-examples/custom-oem-cnc-machined-plastic-parts-manufacturer/) | 完整来源/独立原参考 | /media/product-sources-20261015/p21-1200.webp（800×800） |
| [P22](http://127.0.0.1:4323/products/part-examples/oem-precision-cnc-machined-casting-housing-structural-enclosures/) | 仅空白画布裁切 | /media/product-sources-20261015/p22-framed-1200.webp（600×600） |
| [P23](http://127.0.0.1:4323/products/part-examples/oem-precision-cnc-machined-casting-housings/) | 仅空白画布裁切 | /media/product-sources-20261015/p23-framed-1200.webp（576×720） |
| [P24](http://127.0.0.1:4323/products/part-examples/precision-cnc-machined-castings-custom-oem-housings/) | 完整来源/独立原参考 | /media/product-sources-20261015/p24-1200.webp（800×800） |
| [P25](http://127.0.0.1:4323/products/part-examples/precision-cnc-machined-castings-manufacturer/) | 仅空白画布裁切 | /media/product-sources-20261015/p25-framed-1200.webp（680×510） |
| [P26](http://127.0.0.1:4323/products/part-examples/precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances/) | 完整来源/独立原参考 | /media/product-sources-20261015/p26-1200.webp（800×800） |
| [P27](http://127.0.0.1:4323/products/part-examples/precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier/) | 完整来源/独立原参考 | /media/product-sources-20261015/p27-1200.webp（800×800） |
| [P28](http://127.0.0.1:4323/products/part-examples/precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier/) | 完整来源/独立原参考 | /media/product-sources-20261015/p28-1200.webp（800×800） |
| [P29](http://127.0.0.1:4323/products/part-examples/precision-machining-for-functional-plastic-blocks-structural-components/) | 原像素主体＋生成背景 | /media/product-sources-20261015/p29-framed-1200.webp（720×720） |
| [P30](http://127.0.0.1:4323/products/part-examples/precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures/) | 完整来源/独立原参考 | /media/product-sources-20261015/p30-1200.webp（800×800） |
| [P31](http://127.0.0.1:4323/products/part-examples/precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier/) | 完整来源/独立原参考；背景候选拒绝 | /media/product-sources-20261015/p31-1200.webp（800×800） |
| [P32](http://127.0.0.1:4323/products/part-examples/precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier/) | 仅空白画布裁切；背景候选拒绝 | /media/product-sources-20261015/p32-framed-1200.webp（630×420） |
| [P33](http://127.0.0.1:4323/products/part-examples/small-batch-cnc-machining-manufacturer-complex-aluminum-housings/) | 完整来源/独立原参考 | /media/product-sources-20261015/p33-1200.webp（800×800） |
| [P34](http://127.0.0.1:4323/products/part-examples/small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv/) | 完整来源/独立原参考 | /media/product-sources-20261015/p34-1200.webp（800×800） |

图位执行清单共100行，对应批准方案第5节所有图表行；R16和9个背景候选的未完成状态明确保留。网页原始图与完整来源角色各自独立，不将参考图称订单、实测结果或实拍认证。
