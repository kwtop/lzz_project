# 图片改版清单与来源

> 2026-10-17全站推广已完成：84页及最终图片检查见 [全站交付](FULL-SITE-REDESIGN-DELIVERY.md) 与 [逐页结果](penta-rollout-20261017/PAGE-RESULTS.md)。以下原有样板/盘点记录保留供追溯。

当前全站141文件已逐张审查；132继续引用、9退出正式页。本轮ImageGen新生成10、编辑0，累计样板阶段共13张。[最终逐图决策](penta-rollout-20261017/IMAGE-RESULTS.md)含全部141项、实际使用页及产物。

## 第一阶段三页样板历史记录

日期：2026-10-17。**本轮逐张视觉审查范围为三个样板改前的 18 个去重正文图片文件路径，以及实际生成的 3 张新图。** 全站盘点找到 218 个主图文件路径并确认存在；其余文件尚未逐张完成本轮 A–E 视觉审查，不能声称已重做全站图片。

## 数量口径

改前 26 个槽位 / 18 个去重文件；改后 27 个槽位 / 19 个去重文件。保留 **16 个既有文件**（14 个原始照片 / 已有裁切文件，2 个已有 AI 说明图）；**2 个旧 AI 文件被新图替换**；另增加 1 个材料图。原始装夹全景与其裁切是两个文件，但属于同一照片来源，不当作两份独立证据。

本轮 **ImageGen 编辑 0 张，新生成 3 张**。D 为 2 张替换、E 为 1 张新增。B 只表示浏览器显示裁切 / 沿用原裁切，没有 AI 改造真实图。所有旧文件保留，未删除原始图。

## A–E 决策表

A 保留；B 保守裁切 / 重新排布；C ImageGen 编辑原图；D ImageGen 生成替代；E 新增。真实精密几何、工厂、客户和检验资料不以生成图替代。

| 文件 / 页面 | 决策与原因 | 位置 / 目标比例 | 既有来源与原图位置 |
| --- | --- | --- | --- |
| `/media/editorial-rebuild-20261015/machining-hero-1200.webp`<br>/<br>ALT：AI illustration of an end mill machining a pocket in a clamped aluminum workpiece | **D** · 旧 AI 首屏替换为切削接触区与夹持关系更明确的新加工概念；原文件保留。 | 首页首屏；桌面约正方形、手机 340px 高 | AI-generated |
| `/media/product-sources-20261015/p02-1200.webp`<br>/、/capabilities/<br>ALT：Impeller with curved blades and a central hub. | **A** · 主体和信息可用，保留来源与几何；以 contain 显示，不扩画、不重建真实表面。 | 原图自身比例，完整主体显示 | src/data/productSourceMedia.generated.json /ultra-high-precision-machining-services；原图 D:\lzz\raw\_content\images\products\5-axis-Machining-1-1764418510957--4b51164023.jpg；Complete source retained; responsive resize without enlargement. No subject reconstruction.<br>docs/imagegen-redesign-20261015/product-media-final.json /2；原图 D:\lzz\raw\_content\images\products\5-axis-Machining-1-1764418510957--4b51164023.jpg；Complete source retained; responsive resize without enlargement. No subject reconstruction. |
| `/media/product-sources-20261015/p22-framed-1200.webp`<br>/、/capabilities/<br>ALT：Open ribbed casting housing with a central bore. | **A** · 主体和信息可用，保留来源与几何；以 contain 显示，不扩画、不重建真实表面。 | 原图自身比例，完整主体显示 | src/data/productSourceMedia.generated.json /oem-precision-cnc-machined-casting-housing-structural-enclosures；原图 D:\lzz\raw\_content\images\products\OEM-Precision-CNC-Machined-Casting-Housing---Structural-Enclosures-1764756565591--89bc1a30be.jpg；Complete source retained; responsive resize without enlargement. No subject reconstruction. Only empty outer canvas cropped; full source subject preserved.<br>docs/imagegen-redesign-20261015/product-media-final.json /22；原图 D:\lzz\raw\_content\images\products\OEM-Precision-CNC-Machined-Casting-Housing---Structural-Enclosures-1764756565591--89bc1a30be.jpg；Complete source retained; responsive resize without enlargement. No subject reconstruction. Only empty outer canvas cropped; full source subject preserved. |
| `/media/product-sources-20261015/p32-framed-1200.webp`<br>/、/capabilities/<br>ALT：Threaded indexing-pin form with an extended engagement end. | **A** · 主体和信息可用，保留来源与几何；以 contain 显示，不扩画、不重建真实表面。 | 原图自身比例，完整主体显示 | src/data/productSourceMedia.generated.json /precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier；原图 D:\lzz\raw\_content\images\products\Precision-Stainless-Steel-Indexing-Plunger-Manufacturer-and-Spring-Loaded-Locking-Pin-Supplier-1764817299753--5e240a8195.jpg；Complete source retained; responsive resize without enlargement. No subject reconstruction. Only empty outer canvas cropped; full source subject preserved.<br>docs/imagegen-redesign-20261015/product-media-final.json /32；原图 D:\lzz\raw\_content\images\products\Precision-Stainless-Steel-Indexing-Plunger-Manufacturer-and-Spring-Loaded-Locking-Pin-Supplier-1764817299753--5e240a8195.jpg；Complete source retained; responsive resize without enlargement. No subject reconstruction. Only empty outer canvas cropped; full source subject preserved. |
| `/media/product-sources-20261015/p26-1200.webp`<br>/、/capabilities/<br>ALT：Green long rectangular components with repeated holes, arranged in rows. | **A** · 主体和信息可用，保留来源与几何；以 contain 显示，不扩画、不重建真实表面。 | 原图自身比例，完整主体显示 | src/data/productSourceMedia.generated.json /precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances；原图 D:\lzz\raw\_content\images\products\Precision-CNC-Machining-for-Complex-Plastic-Geometries-and-Tight-Tolerances-1764558015887--2ed6fe3732.jpg；Complete source retained; responsive resize without enlargement. No subject reconstruction.<br>docs/imagegen-redesign-20261015/product-media-final.json /26；原图 D:\lzz\raw\_content\images\products\Precision-CNC-Machining-for-Complex-Plastic-Geometries-and-Tight-Tolerances-1764558015887--2ed6fe3732.jpg；Complete source retained; responsive resize without enlargement. No subject reconstruction. |
| `/media/products-real-details-20261015/two-stage-first.webp`<br>/、/capabilities/cnc-milling-service/<br>ALT：The component and fixture in the first original milling setup | **B** · 沿用已有原图裁切，突出首次夹持和加工区域；本轮未重新编辑文件。 | 首页 / 铣削装夹；752:540 | src/data/productsRebuild.ts + docs/IMAGE-LED-REDESIGN-DELIVERY.md:2106-2107；原图 /media/evidence/two-stage-first-1600.webp |
| `/media/products-real-details-20261015/two-stage-second.webp`<br>/、/capabilities/cnc-milling-service/<br>ALT：The component and fixture in the second original milling setup | **B** · 沿用同件第二次装夹裁切；与第一张有阶段信息差异。 | 首页 / 铣削装夹；752:540 | src/data/productsRebuild.ts + docs/IMAGE-LED-REDESIGN-DELIVERY.md:2106-2107；原图 /media/evidence/two-stage-second-1600.webp |
| `/media/evidence/workshop-wide-1600.webp`<br>/<br>ALT：LZZ machining workshop. | **B** · 真实车间图保留；仅按显示框保守裁切，不修改厂房或设备。 | 首页 / 真实工厂；4:3 | src/data/evidence.generated.json /workshop-wide；原图 力智造-素材资料照片/力智造-素材资料照片/10，Producing Department-生产车间/1 (7).jpg |
| `/media/image-led-20261015/definition-1200.webp`<br>/<br>ALT：AI illustration of a physical component alongside a model and drawing, showing the information to agree before machining | **A** · 保留已有带 AI 来源标签的图纸 / 样品说明图，不是本轮新生成，也不是客户零件证据。 | 原图自身比例，完整主体显示 | AI-generated / ai-illustration |
| `/media/product-sources-20261015/p00-framed-1200.webp`<br>/capabilities/、/capabilities/cnc-milling-service/<br>ALT：Circular component with stepped bores and a face-hole pattern. | **A** · 主体和信息可用，保留来源与几何；以 contain 显示，不扩画、不重建真实表面。 | 原图自身比例，完整主体显示 | src/data/productSourceMedia.generated.json /custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm；原图 D:\lzz\raw\_content\images\products\CNC-Milling-Service-1-1764417292122--54b8b81a8c.jpg；Complete source retained; responsive resize without enlargement. No subject reconstruction. Only empty outer canvas cropped; full source subject preserved.<br>docs/imagegen-redesign-20261015/product-media-final.json /0；原图 D:\lzz\raw\_content\images\products\CNC-Milling-Service-1-1764417292122--54b8b81a8c.jpg；Complete source retained; responsive resize without enlargement. No subject reconstruction. Only empty outer canvas cropped; full source subject preserved. |
| `/media/product-sources-20261015/p19-framed-1200.webp`<br>/capabilities/<br>ALT：Two circular flanged components with ON/OFF markings, a rotary handle and separate screws. | **A** · 主体和信息可用，保留来源与几何；以 contain 显示，不扩画、不重建真实表面。 | 原图自身比例，完整主体显示 | src/data/productSourceMedia.generated.json /custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier；原图 D:\lzz\raw\_content\images\products\Custom-CNC-Turned-Stainless-Steel-Components-Manufacturer-and-Precision-Shaft-Supplier-1764816944325--cacdc81da0.jpg；Complete source retained; responsive resize without enlargement. No subject reconstruction. Only empty outer canvas cropped; full source subject preserved.<br>docs/imagegen-redesign-20261015/product-media-final.json /19；原图 D:\lzz\raw\_content\images\products\Custom-CNC-Turned-Stainless-Steel-Components-Manufacturer-and-Precision-Shaft-Supplier-1764816944325--cacdc81da0.jpg；Complete source retained; responsive resize without enlargement. No subject reconstruction. Only empty outer canvas cropped; full source subject preserved. |
| `/media/product-sources-20261015/p13-1200.webp`<br>/capabilities/、/capabilities/cnc-milling-service/<br>ALT：Original reference photograph of a curved cover and its visible tool-path texture. | **A** · 主体和信息可用，保留来源与几何；以 contain 显示，不扩画、不重建真实表面。 | 原图自身比例，完整主体显示 | src/data/productSourceMedia.generated.json /custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier；原图 D:/lzz/lzz/_react/public/media/source-details/engine-cover-original-1200.webp；Complete source retained; responsive resize without enlargement. No subject reconstruction.<br>docs/imagegen-redesign-20261015/product-media-final.json /13；原图 D:/lzz/lzz/_react/public/media/source-details/engine-cover-original-1200.webp；Complete source retained; responsive resize without enlargement. No subject reconstruction. |
| `/media/product-sources-20261015/p27-1200.webp`<br>/capabilities/<br>ALT：A group of brass-colored threaded components. | **A** · 主体和信息可用，保留来源与几何；以 contain 显示，不扩画、不重建真实表面。 | 原图自身比例，完整主体显示 | src/data/productSourceMedia.generated.json /precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier；原图 D:\lzz\raw\_content\images\products\Precision-CNC-Turned-Brass-Components-Manufacturer-and-Copper-Parts-Supplier-1764759544533--731dc8eed7.jpg；Complete source retained; responsive resize without enlargement. No subject reconstruction.<br>docs/imagegen-redesign-20261015/product-media-final.json /27；原图 D:\lzz\raw\_content\images\products\Precision-CNC-Turned-Brass-Components-Manufacturer-and-Copper-Parts-Supplier-1764759544533--731dc8eed7.jpg；Complete source retained; responsive resize without enlargement. No subject reconstruction. |
| `/media/capabilities-section-20261014/sample-definition-1200.webp`<br>/capabilities/<br>ALT：AI illustration of a generic housing beside schematic drawing views and a caliper | **A** · 保留已有带 AI 来源标签的图纸 / 样品说明图，不是本轮新生成，也不是客户零件证据。 | 原图自身比例，完整主体显示 | AI-generated |
| `/media/evidence/two-stage-first-1600.webp`<br>/capabilities/<br>ALT：The first milling setup for the part. | **B** · 原始装夹全景文件保留，分类章节按 4:3 显示；与装夹裁切源自同一照片，不能算新增证据。 | 分类 / 来源证据；4:3 | src/data/evidence.generated.json /two-stage-first；原图 力智造-素材资料照片/力智造-素材资料照片/20251203力智造产品加工过程中图片/产品6-同一个产品-2个不同工序的铣加工/15af15bf59dadc3a3daf31888ada46b6.jpg |
| `/media/product-sources-20261015/p33-1200.webp`<br>/capabilities/cnc-milling-service/<br>ALT：Open housing forms with cavities and mounting interfaces. | **A** · 主体和信息可用，保留来源与几何；以 contain 显示，不扩画、不重建真实表面。 | 原图自身比例，完整主体显示 | src/data/productSourceMedia.generated.json /small-batch-cnc-machining-manufacturer-complex-aluminum-housings；原图 D:\lzz\raw\_content\images\products\Small-Batch-CNC-Machining-Manufacturer-Complex-Aluminum-Housings-1764758302026--a5c49734de.jpg；Complete source retained; responsive resize without enlargement. No subject reconstruction.<br>docs/imagegen-redesign-20261015/product-media-final.json /33；原图 D:\lzz\raw\_content\images\products\Small-Batch-CNC-Machining-Manufacturer-Complex-Aluminum-Housings-1764758302026--a5c49734de.jpg；Complete source retained; responsive resize without enlargement. No subject reconstruction. |
| `/media/editorial-rebuild-20261015/milling-geometry-1200.webp`<br>/capabilities/cnc-milling-service/<br>ALT：AI illustration of a milled component showing pockets, holes, internal radii and thin sections | **D** · 旧 AI 几何图替换为更单纯的刀具可达性概念，减少把精密零件示意当实物的可能；原文件保留。 | 铣削 / 几何；4:3 | AI-generated |
| `/media/evidence/cmm-room-1600.webp`<br>/capabilities/cnc-milling-service/<br>ALT：Coordinate measuring machine in an archived LZZ workshop photograph. | **A** · 主体和信息可用，保留来源与几何；以 contain 显示，不扩画、不重建真实表面。 | 铣削 / 检验；照片约 190px 宽，图注另占宽列 | src/data/evidence.generated.json /cmm-room；原图 力智造-素材资料照片/力智造-素材资料照片/10，Producing Department-生产车间/1 (84).jpg |
| `/media/penta-next-20261017/milling-at-work-1440.webp`<br>/<br>ALT：Illustrative close-up of an end mill cutting a pocket in a clamped aluminum billet | **D** · 本轮实际生成；可见 AI 图注；不充作商业证据。 | Homepage hero；3:2 landscape; central subject safe for 1:1 responsive crop | `design/penta-next-20261017/originals/milling-at-work.png`；prompt / hash 见下文与 assets.json |
| `/media/penta-next-20261017/material-stock-1440.webp`<br>/capabilities/<br>ALT：Illustrative aluminum billet, steel rod, brass stock and pale engineering polymer on a dark work surface | **E** · 本轮实际生成；可见 AI 图注；不充作商业证据。 | Material selection；3:2 landscape | `design/penta-next-20261017/originals/material-stock.png`；prompt / hash 见下文与 assets.json |
| `/media/penta-next-20261017/tool-access-1440.webp`<br>/capabilities/cnc-milling-service/<br>ALT：Illustrative generic pocket geometry and an end mill showing how depth and internal corner radii affect tool access | **D** · 本轮实际生成；可见 AI 图注；不充作商业证据。 | Drawing and tool access；4:3 landscape | `design/penta-next-20261017/originals/tool-access.png`；prompt / hash 见下文与 assets.json |

## 新图执行记录与完整提示词

调用宿主内置 ImageGen，输出已实际保存、目视审查并接入页面。流程入口为 draw-ui；无需生成替代整页截图。原始 PNG 直接从工具结果复制入项目；WebP 是普通格式 / 尺寸优化，**不计作 ImageGen 修图**。

### milling-at-work · Homepage hero

页面：`/`。身份：AI-generated concept。构图目标：3:2 landscape; central subject safe for 1:1 responsive crop。

原始输出：`design/penta-next-20261017/originals/milling-at-work.png`（1536×1024）。SHA256：`14071d13cafa8a18db63ce40d6b1b42714fe0063ceb57c42eb17894b31292f7f`。工具原文件：`C:\Users\Administrator\.codex\generated_images\01a14762-681d-7c33-ac09-4080292c30fc\exec-c0098b9d-aadb-4b0c-941e-82a7d085a55b.png`。

| 发布素材 | 尺寸 | bytes |
| --- | --- | ---: |
| `public/media/penta-next-20261017/milling-at-work-480.webp` | 480×320 | 25304 |
| `public/media/penta-next-20261017/milling-at-work-800.webp` | 800×533 | 56574 |
| `public/media/penta-next-20261017/milling-at-work-1440.webp` | 1440×960 | 130326 |

ALT：Illustrative close-up of an end mill cutting a pocket in a clamped aluminum billet

完整生成 prompt：

> Use case: photorealistic-natural. Create one premium industrial editorial photograph used as a clearly labeled generic CNC machining illustration in an industrial B2B homepage hero. Landscape 3:2. A single vertical carbide end mill machining the near edge of an open pocket in a rectangular aluminum billet, the stock securely held between credible steel vise jaws. Tool, pocket edge and fixture relationship clearly visible and mechanically plausible. Main subject central-right with breathing room around the spindle and vice, safe to crop to square. Fine realistic cutter marks and a small number of naturally curled metal chips. Dim neutral machine interior, cool soft daylight from the upper left, restrained deep blue-green shadows and natural silver metal, precise but not glossy. Medium close photographic composition, shallow depth of field without hiding the contact area. No humans, no factory panorama, no specific manufacturer, no brand, no text, no dimension callouts, no logos, no exaggerated sparks, no futuristic graphics. This is a generic concept, not a documentary photograph of any named company or customer part.

审查：主体清晰，颜色 / 光线与相邻章节协调，刀具 / 材料为通用示意；无品牌、客户身份、尺寸、测量值、证书或订单结论。加工与刀具图不证明特定设备或真实制造结果。已检查桌面与手机裁切，标签在最终页面可见。

### material-stock · Material selection

页面：`/capabilities/`。身份：AI-generated concept。构图目标：3:2 landscape。

原始输出：`design/penta-next-20261017/originals/material-stock.png`（1536×1024）。SHA256：`bde32e5a508feb58ef0e4921ef35a813cabee23503b48dbc8796a0cb5b41e172`。工具原文件：`C:\Users\Administrator\.codex\generated_images\01a14762-681d-7c33-ac09-4080292c30fc\exec-c623de05-04b6-49f1-8b11-ad0026b68e26.png`。

| 发布素材 | 尺寸 | bytes |
| --- | --- | ---: |
| `public/media/penta-next-20261017/material-stock-480.webp` | 480×320 | 22526 |
| `public/media/penta-next-20261017/material-stock-800.webp` | 800×533 | 61336 |
| `public/media/penta-next-20261017/material-stock-1440.webp` | 1440×960 | 172848 |

ALT：Illustrative aluminum billet, steel rod, brass stock and pale engineering polymer on a dark work surface

完整生成 prompt：

> Use case: photorealistic-natural. One premium industrial material editorial still life for a CNC machining material-selection section, clearly used as an illustrative concept. Landscape 3:2. Four simple unmachined stock forms placed with an intentional asymmetric composition on a matte charcoal-blue-green workshop surface: a silver aluminum rectangular billet in foreground, one short brushed stainless steel round bar behind, a smaller warm brass hexagonal bar, and an off-white engineering polymer block. Do not represent any specific grade or provide labels. Show distinct real surface texture, subtle saw-cut ends, mild natural handling marks, physically credible scale and contact shadows. Silver billet is dominant, other three objects form a quieter receding diagonal, with clear negative space at upper left. Soft side daylight, no dramatic colored lights, no CGI gloss. No precision customer components, no complex holes or gears, no people, no factory scene, no documents, no logos, no text, no watermark.

审查：主体清晰，颜色 / 光线与相邻章节协调，刀具 / 材料为通用示意；无品牌、客户身份、尺寸、测量值、证书或订单结论。加工与刀具图不证明特定设备或真实制造结果。已检查桌面与手机裁切，标签在最终页面可见。

### tool-access · Drawing and tool access

页面：`/capabilities/cnc-milling-service/`。身份：AI-generated technical concept。构图目标：4:3 landscape。

原始输出：`design/penta-next-20261017/originals/tool-access.png`（1448×1086）。SHA256：`4a3e06e267ee052100b696b254e8ef72d2dedea9340bfed60c44558b2f693913`。工具原文件：`C:\Users\Administrator\.codex\generated_images\01a14762-681d-7c33-ac09-4080292c30fc\exec-03f9cf32-2a00-4182-85bd-cd9103cac17f.png`。

| 发布素材 | 尺寸 | bytes |
| --- | --- | ---: |
| `public/media/penta-next-20261017/tool-access-480.webp` | 480×360 | 17394 |
| `public/media/penta-next-20261017/tool-access-800.webp` | 800×600 | 45876 |
| `public/media/penta-next-20261017/tool-access-1440.webp` | 1440×1080 | 131024 |

ALT：Illustrative generic pocket geometry and an end mill showing how depth and internal corner radii affect tool access

完整生成 prompt：

> Use case: scientific-educational. Create a physically plausible, quiet photorealistic technical concept image for a CNC milling drawing-review section. Landscape 4:3. One generic rectangular aluminum billet, viewed obliquely from above, with a broad shallow open pocket and one narrower deeper pocket; all internal corners have plausible rounded cutter radii and the outside shape is simple. One slender vertical flat end mill is suspended above the deep pocket without touching or intersecting the metal, making reach and clearance easy to understand. This is a generic explanatory concept, not a customer product, inspection evidence or measured manufacturing result. Restrained gray and silver material, dark forest-blue tabletop, soft studio daylight, realistic machining marks, no plastic-looking render. The block is offset slightly right with generous clear space around its silhouette. No dimensions, no text or labels, no arrows, no exploded parts, no machine logos, no fictional data, no extra tools, no strong glow or sparks.

审查：主体清晰，颜色 / 光线与相邻章节协调，刀具 / 材料为通用示意；无品牌、客户身份、尺寸、测量值、证书或订单结论。加工与刀具图不证明特定设备或真实制造结果。已检查桌面与手机裁切，标签在最终页面可见。

## 来源与回退

- 全站媒体文件、来源登记、引用页面、ALT 与散列：D:/lzz/penta-redesign-20261017/inventory.json 的 assets 数组。
- 18 个样板既有主图的改前联系表：D:/lzz/penta-redesign-20261017/important-images-before.jpg；逐图元数据同名 JSON。
- 新图完整 prompts 与产物：design/penta-next-20261017/prompts.json、assets.json、originals/。
- 改前组件与散列：D:/lzz/penta-redesign-20261017/baseline/。旧 HomeApproved、CapabilitiesDirectory、CapabilityMillingPage 仍在原位置且散列不变。
- 只撤销三条入口 / Layout 的样板接入即可恢复旧视觉；必须先核对是否有后续用户改动，不能覆盖新工作。没有执行回滚。

## 素材缺口与后续拍摄

| 对象 / 页面 | 当前缺口 | 所需真实资料 | 本轮处理 |
| --- | --- | --- | --- |
| P04 /machined-parts/gallery/global-manufacturer-of-multi-sided-precision-machined-components/ | 有效来源仅 2 张，低清整体图不能计有效主体 | 同件完整主体、孔 / 槽 / 端口近照、允许使用的高分辨率原件 | 保留带有限细节说明的入口；未生成替代零件 |
| /factory/ 与检验相关能力页 | 当前设备范围、CMM 校准 / 测量范围与证书细节不足 | 当期设备台账、校准与检验记录、当前 ISO 证书 / 范围 | 真实旧照片保留，图注要求按记录确认；不生成文件 |
| 企业 / 新闻 | 摄影光线、分辨率与日期一致性不足；澳洲参访日期有来源冲突 | 授权原图、拍摄日期、可公开人物 / 客户范围 | 不生成团队 / 客户或业务结果，不改冲突日期 |
| 全站摄影风格 | 可证明真实工艺且与新构图匹配的素材不足 | 同一光线下的完整工件、夹持、操作、检验、车间连续拍摄；匹配的真实短视频 | 本轮 3 张通用概念只补解释与氛围，后续真实素材仍待补 |

其余 81 页的图片决策要在方向确认后逐类、逐页进行。没有对未检查图片宣称“全部保留通过”或“已完成替换”。
