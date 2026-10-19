# 页面改版计划与实施状态

> 2026-10-17全站推广已完成：84页及最终图片检查见 [全站交付](FULL-SITE-REDESIGN-DELIVERY.md) 与 [逐页结果](penta-rollout-20261017/PAGE-RESULTS.md)。以下原有样板/盘点记录保留供追溯。

日期：2026-10-17。正式可索引页面 **84**，已完成视觉改造 **84**（样板3、本轮推广81）。没有 URL 迁移、有效页面删除、生产部署或导航重组。当前页面和数据全量来源见 CURRENT-SITE-STRUCTURE.md 与外部机器快照 D:/lzz/penta-redesign-20261017/inventory.json。

## 已实现样板的模块职责

| 页面 | 核心模块 | 访问者顺序与布局 | 图片任务 |
| --- | ---: | --- | --- |
| 首页 | 5 | 业务识别 → 实物与能力入口 → 实际装夹 → 工厂证据 → 询价输入 | 大首屏、主次实物、错位双图、真实车间、图纸示意 |
| 能力分类 | 6 | 选择方法 → 工艺 → 材料 → 阶段 → 装夹 / 检验 → 询价 | 比较式真实实物、原料静物、阶段示意、原始装夹 |
| 铣削详情 | 7 | 服务 / 主体 → 适用零件 → 两次装夹 → 几何 → 材料表 → 检验 → RFQ | 真实产品、两个工序、刀具可达性、原始 CMM |

三页的原有模块数与全部有效内容保留；新的构图、图文比例与章节背景已实际实现。技术表仍是表格，准确几何仍用原图。对应文件为 src/components/PentaHome.astro、PentaCapabilitiesDirectory.astro、PentaMillingPage.astro 与 src/styles/penta-next.css。

## 页面族布局规则

| 类型 | 当前数量 | 已实施组织方式 | 不能因视觉丢失的内容 |
| --- | ---: | --- | --- |
| 首页 | 1 | 已做深色照片首屏与五段不同职责 | 定位、实物 / 工艺 / 材料入口、事实、完整订单条件 |
| 能力目录 | 1 | 已做任务导语、工艺 / 材料 / 阶段分开选路 | 11 个能力子页与锚点 |
| 工艺 / 材料 / 阶段能力详情 | 11 | 全部11页已实施，分别按轴向、多面、铸件、材料与批准阶段排版 | 全部表行、参数条件、关联指南与 RFQ 上下文 |
| 零件总览 / 图库 | 2 | 筛选任务与真实实物索引 | 35 件、搜索 / 筛选、空状态、URL 与原件身份 |
| 零件详情 | 35 | 主体、细节、图纸 / 工艺与接受条件，每件依来源变化 | 几何、来源、技术文字、相关项目和询价 |
| 实例目录 / 加工实例 | 1 + 8 | 工艺问题选路与来源照片序列 | 8 个实例与事实 / 解释边界 |
| 工厂与质量 | 1 | 空间、操作、设备、检验与当前记录，不同图文形式 | 真照片、40+ 口径、ISO / CMM 当前资料边界 |
| 公司信息 | 4 | 总览、档案、合作流程、联系各司其职 | 法定主体、事实、联系方式与原链接 |
| 新闻目录 / 新闻记录 | 1 + 5 | 时间线 / 图文选读与编辑式正文 | 原日期、来源图、记录事实 |
| 资料目录 | 3 | 任务入口、5 采购 / 3 技术分类 | 完整导航、摘要和相关链接 |
| 指南 | 8 | 受控长文、目录、技术表、必要图示 | 全文有效知识、锚点、表格与 schema |
| FAQ | 1 | 主题分组与可读答案 | 15 问及可见内容对应 schema |
| RFQ 工具 | 1 | 实际需求输入和草稿审阅 | 本地保存、验证、引用身份、复制 / 保存 / 编辑 / 清除 / mailto |
| 隐私 | 1 | 简洁文字与存储说明 | 草稿与联系方式边界 |

没有独立 Applications / Industries 正式路由，不新建空泛行业页。现有应用要求属于能力 / 实例正文，保留在原上下文；提出新页面应另有真实应用内容。

## 全部正式页面逐页计划

以下现有重点直接来自构建 H2；它们用于说明每页信息责任，完整内容仍以原组件 / 数据和结构清单为准。全部页面已按页面族实施；最终模块/图源/例外见 [84页结果](penta-rollout-20261017/PAGE-RESULTS.md)。

| URL / 类型 | 现有重点 | 本页布局与素材计划 |
| --- | --- | --- |
| `/`<br>首页 | Start with a familiar part.；The setup behind the shape.；Meet the workshop.；Let’s review your part. | 已实现：深色加工首屏；不对称实物索引；错位装夹双图；真实车间；完整 RFQ 条件。 |
| `/about/`<br>企业信息 | Verify the supplier；Review the order process；Contact LZZ；An Australian customer visits the LZZ workshop；Have a part to discuss? | 已实施：公司定位、合作方式、工厂和资料入口构成编辑式总览；保留 4 条公司二级导航。 |
| `/about/company-news/`<br>新闻目录 | A November team day outdoors；Workshop & industry visits；Team records | 已实施：按真实日期的编辑式图文目录，封面大小按来源品质决定；保留 5 条记录，不据参访照片推定合作订单。 |
| `/about/company-news/australian-customer-workshop-visit-january-2025/`<br>新闻记录 | On the workshop floor；Conversation during the visit；Related company records | 已实施，日期来源冲突仍待核对：保留原记录与日期冲突标记，照片正文编辑式排布；不新增客户身份、合同或订单结果。 |
| `/about/company-news/china-africa-west-lake-summit-2025/`<br>新闻记录 | Introducing custom machining；The conference hall and entrance；Related company records | 已实施：依据本记录原始照片和正文，使用宽照片 + 受控正文列；保留日期和活动事实，不补写交易结果。 |
| `/about/company-news/lzz-team-outing-2024/`<br>新闻记录 | The journey and a shared meal；A day away from the machines；Related company records | 已实施：依据本记录原始照片和正文，使用宽照片 + 受控正文列；保留日期和活动事实，不补写交易结果。 |
| `/about/company-news/may-2025-lzz-team-outing/`<br>新闻记录 | An outdoor meal together；Evening streets and food stops；Related company records | 已实施：依据本记录原始照片和正文，使用宽照片 + 受控正文列；保留日期和活动事实，不补写交易结果。 |
| `/about/company-news/november-2025-hangzhou-lizhizao-group-activity/`<br>新闻记录 | A day beside the water；Around the barbecue and table；Related company records | 已实施：依据本记录原始照片和正文，使用宽照片 + 受控正文列；保留日期和活动事实，不补写交易结果。 |
| `/about/company-profile/`<br>企业信息 | Engineering and workshop；Supplier documents；Company development；Continue your supplier review | 已实施：真实公司 / 团队图文；来源事实、当前资料索取与联系入口；证书信息不得由图形补全。 |
| `/about/contact/`<br>企业信息 | A new part；An existing order；Supplier documents；Visit the workshop | 已实施：联系方式与访厂输入先行；适量真实地点照片，不重造发送表单或未经确认的地图 / 营业信息。 |
| `/about/how-we-work/`<br>企业信息 | Define and quote the part；Approve and manufacture；Packing & handover；Commercial terms and delivery；Prepare the first review | 已实施：按图纸、确认、生产、检验与交付关系组织开放流程与真实图；资料准备示意明确标注。 |
| `/capabilities/`<br>能力目录 | Choose by part geometry；Start with the material；What information do you have today?；Review the work behind the part；Bring the part requirements together | 已实现：任务导语与锚点；4 工艺比较；材料静物 + 4 实物入口；3 阶段；真实装夹；询价。 |
| `/capabilities/5-axis-cnc-machining/`<br>能力详情 | Match the tool path to the surface；Angled faces & complex contours；Material and finish review；Measure against the model and datums；Request a 5-axis machining quote | 已实施：多面特征主图与实际零件比较；可达性 / 定位图文；完整材料、特征和接受条件表；不把五轴概念当设备证据。 |
| `/capabilities/aluminum-cnc-parts/`<br>能力详情 | Choose the alloy and final finish；Aluminum housings, covers & enclosures；Support the thin sections；Define the part after finishing；Request an aluminum machining quote | 已实施：用本页材料相关实物建立第一印象；材质 / 性能与条件图文；牌号 / 处理表；对应装夹 / 检验；保留材料相关的 RFQ。 |
| `/capabilities/casting-machining/`<br>能力详情 | Cast housings & finished interfaces；From cast blank to finished interfaces；Casting material & blank requirements；Agree inspection before machining；Request a casting machining quote | 已实施：真实铸件毛坯与加工面主次对照；余量、基准、夹持、接受条件表；不生成铸件缺陷或测量证据。 |
| `/capabilities/cnc-milling-service/`<br>能力详情 | Parts suited to CNC milling；One part, two milling setups；Pockets, holes and shared datums；Materials and finishing；Define the critical features；Request a CNC milling quote | 已实现：真实圆形件首屏；壳体 / 曲面盖；两次装夹；刀具可达性；材料表；检验与 CMM；RFQ。 |
| `/capabilities/cnc-turning-service/`<br>能力详情 | One axis, several working features；Turning and secondary milling；Material and finish review；Agree the axis, fits and thread checks；Request a CNC turning quote | 已实施：轴向零件主图；车削与后续铣削图文；材料、内外特征和装夹条件；完整检验 / RFQ。 |
| `/capabilities/copper-brass-cnc-parts/`<br>能力详情 | Choose the alloy for its function；Specify the alloy, standard and finish；Define the working interfaces；Agree dimensional and functional acceptance；Request a copper or brass quote | 已实施：用本页材料相关实物建立第一印象；材质 / 性能与条件图文；牌号 / 处理表；对应装夹 / 检验；保留材料相关的 RFQ。 |
| `/capabilities/low-volume-production/`<br>能力详情 | One controlled specification per component；Approve the first parts, then release the batch；Keep the repeat release and packing aligned；Request a small-batch quote | 已实施：按订单阶段组织输入与批准流程；真实样件 / 批次照片与资料示意分开；首件、版本、生产窗口和逐单确认条件完整。 |
| `/capabilities/plastic-machined-parts/`<br>能力详情 | Choose the polymer and measurement conditions；Insulators, guides & polymer housings；Support the working features；Polymer forms from the source collection；Accept the part in its agreed condition；Request a plastic machining quote | 已实施：用本页材料相关实物建立第一印象；材质 / 性能与条件图文；牌号 / 处理表；对应装夹 / 检验；保留材料相关的 RFQ。 |
| `/capabilities/prototype-machining/`<br>能力详情 | Define what the prototype must answer；Keep the revision, checks and approval together；Record what differs from production；Request a prototype review | 已实施：按订单阶段组织输入与批准流程；真实样件 / 批次照片与资料示意分开；首件、版本、生产窗口和逐单确认条件完整。 |
| `/capabilities/stainless-steel-cnc-parts/`<br>能力详情 | Specify the grade and treatment state；Shafts, fittings & locking hardware；Locate the working features from the datum axis；Verify diameters, threads and treated surfaces；Request a stainless steel quote | 已实施：用本页材料相关实物建立第一印象；材质 / 性能与条件图文；牌号 / 处理表；对应装夹 / 检验；保留材料相关的 RFQ。 |
| `/capabilities/starting-with-a-sample/`<br>能力详情 | Keep the intended fit, resolve the unknowns；What each stage delivers；Define the replacement material and finish；Approve the first part before repeat production；Send the information available now | 已实施：按订单阶段组织输入与批准流程；真实样件 / 批次照片与资料示意分开；首件、版本、生产窗口和逐单确认条件完整。 |
| `/factory/`<br>工厂与质量 | Capacity depends on the part and order mix.；Match the setup to the geometry；Set the checks before machining；Separate order records from supplier credentials；Agree what travels with the parts；Start the supplier and part review | 已实施：真实车间大图；设备 / 操作、检验、当前资料、交付输入形成不同版式；40+ 包含辅助设备，CMM / ISO 文件范围待确认。 |
| `/machined-parts/`<br>零件总览 | Start with the part form；See how the part is held and reached；Define your order | 已实施：保留动态 35 件索引与搜索 / 材料 / 工艺筛选，增加清晰形态入口与编辑式实物图；检查空状态与 URL。 |
| `/machined-parts/gallery/`<br>零件图库 | Part references；Covered parts and gear forms；From the part form to the setup | 已实施：以 35 件真实实物索引为核心，图片保持几何和自身比例；按现有分类 / 链接选路，避免生成替代品。 |
| `/machined-parts/gallery/custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier/`<br>零件详情 | Define components, installation and tests；Review machining and joining separately；Related machining and part forms；Review your drawing | 已实施：本件完整主体优先；有信息差异的原图 / 裁切组成非对称细节；保留图纸、材料、工艺、接受条件与原件 RFQ 身份。 |
| `/machined-parts/gallery/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/`<br>零件详情 | Define the cover’s mating envelope；Review access around the cover；Related machining and part forms；Review your drawing | 已实施：本件完整主体优先；有信息差异的原图 / 裁切组成非对称细节；保留图纸、材料、工艺、接受条件与原件 RFQ 身份。 |
| `/machined-parts/gallery/custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier/`<br>零件详情 | Define runners, fuel interfaces and clearance；Review machining access and setup；Related machining and part forms；Review your drawing | 已实施：本件完整主体优先；有信息差异的原图 / 裁切组成非对称细节；保留图纸、材料、工艺、接受条件与原件 RFQ 身份。 |
| `/machined-parts/gallery/custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier/`<br>零件详情 | Cavity, ports & sealing interfaces；Review access for cavity surfacing；Related machining and part forms；Review your drawing | 已实施：本件完整主体优先；有信息差异的原图 / 裁切组成非对称细节；保留图纸、材料、工艺、接受条件与原件 RFQ 身份。 |
| `/machined-parts/gallery/custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier/`<br>零件详情 | Define the intake components and interfaces；Review the individual machining route；Related machining and part forms；Review your drawing | 已实施：本件完整主体优先；有信息差异的原图 / 裁切组成非对称细节；保留图纸、材料、工艺、接受条件与原件 RFQ 身份。 |
| `/machined-parts/gallery/custom-cnc-machined-castings-transmission-housings-pump-bodies/`<br>零件详情 | Define the blank and the finished part；Review finish machining and datum transfer；Related machining and part forms；Review your drawing | 已实施：本件完整主体优先；有信息差异的原图 / 裁切组成非对称细节；保留图纸、材料、工艺、接受条件与原件 RFQ 身份。 |
| `/machined-parts/gallery/custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier/`<br>零件详情 | Define fits, supply and functional checks；Review the prototype machining route；Related machining and part forms；Review your drawing | 已实施：本件完整主体优先；有信息差异的原图 / 裁切组成非对称细节；保留图纸、材料、工艺、接受条件与原件 RFQ 身份。 |
| `/machined-parts/gallery/custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier/`<br>零件详情 | Define interfaces, markings and supply；Review turning and secondary features；Related machining and part forms；Review your drawing | 已实施：本件完整主体优先；有信息差异的原图 / 裁切组成非对称细节；保留图纸、材料、工艺、接受条件与原件 RFQ 身份。 |
| `/machined-parts/gallery/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/`<br>零件详情 | Features to define；Review access across faces；Related machining and part forms；Review your drawing | 已实施：本件完整主体优先；有信息差异的原图 / 裁切组成非对称细节；保留图纸、材料、工艺、接受条件与原件 RFQ 身份。 |
| `/machined-parts/gallery/custom-high-precision-machining-for-structural-aesthetic-components-oem/`<br>零件详情 | Define fit and appearance separately；Review the structural machining scope；Related machining and part forms；Review your drawing | 已实施：本件完整主体优先；有信息差异的原图 / 裁切组成非对称细节；保留图纸、材料、工艺、接受条件与原件 RFQ 身份。 |
| `/machined-parts/gallery/custom-oem-cnc-machined-non-metallic-components-insulating-parts/`<br>零件详情 | Set material conditions before specifying fit；Review stock, heat and workholding；Related machining and part forms；Review your drawing | 已实施：本件完整主体优先；有信息差异的原图 / 裁切组成非对称细节；保留图纸、材料、工艺、接受条件与原件 RFQ 身份。 |
| `/machined-parts/gallery/custom-oem-cnc-machined-plastic-parts-manufacturer/`<br>零件详情 | Define fit, measurement and service conditions；Review milling and turning for the chosen grade；Related machining and part forms；Review your drawing | 已实施：本件完整主体优先；有信息差异的原图 / 裁切组成非对称细节；保留图纸、材料、工艺、接受条件与原件 RFQ 身份。 |
| `/machined-parts/gallery/custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer/`<br>零件详情 | Specify the complete connection；Machine the connection and wrenching features；Related machining and part forms；Review your drawing | 已实施：本件完整主体优先；有信息差异的原图 / 裁切组成非对称细节；保留图纸、材料、工艺、接受条件与原件 RFQ 身份。 |
| `/machined-parts/gallery/custom-oem-cnc-turning-manufacturer/`<br>零件详情 | Define the working profile；Locate secondary features after turning；Related machining and part forms；Review your drawing | 已实施：本件完整主体优先；有信息差异的原图 / 裁切组成非对称细节；保留图纸、材料、工艺、接受条件与原件 RFQ 身份。 |
| `/machined-parts/gallery/custom-oem-high-precision-cnc-milling-manufacturer/`<br>零件详情 | Define your part’s interfaces；Machining blocks and brackets；Related machining and part forms；Review your drawing | 已实施：本件完整主体优先；有信息差异的原图 / 裁切组成非对称细节；保留图纸、材料、工艺、接受条件与原件 RFQ 身份。 |
| `/machined-parts/gallery/custom-rotary-cylindrical-components/`<br>零件详情 | Relate each feature to the turned axis；Combine turning and secondary operations；Related machining and part forms；Review your drawing | 已实施：本件完整主体优先；有信息差异的原图 / 裁切组成非对称细节；保留图纸、材料、工艺、接受条件与原件 RFQ 身份。 |
| `/machined-parts/gallery/full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing/`<br>零件详情 | Specify the final surface；Separate dimensions, appearance and masking；Review the milling setups；Review your drawing | 已实施：本件完整主体优先；有信息差异的原图 / 裁切组成非对称细节；保留图纸、材料、工艺、接受条件与原件 RFQ 身份。 |
| `/machined-parts/gallery/global-manufacturer-of-multi-sided-precision-machined-components/`<br>零件详情 | Control the features across faces；Plan access around the part；Related machining and part forms；Review your drawing | 待真实素材：保留有限照片和细节边界；先补同件完整主体、孔槽 / 接口近照，再做主体 + 细节 + 工程条件版面；不拿类似件或 AI 代替。 |
| `/machined-parts/gallery/global-oem-precision-machining-solutions/`<br>零件详情 | Locate the connection from the body axis；Turning with angled features；Related machining and part forms；Review your drawing | 已实施：本件完整主体优先；有信息差异的原图 / 裁切组成非对称细节；保留图纸、材料、工艺、接受条件与原件 RFQ 身份。 |
| `/machined-parts/gallery/high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem/`<br>零件详情 | Separate geometry from operating tests；Review the contour machining route；Related machining and part forms；Review your drawing | 已实施：本件完整主体优先；有信息差异的原图 / 裁切组成非对称细节；保留图纸、材料、工艺、接受条件与原件 RFQ 身份。 |
| `/machined-parts/gallery/high-volume-cnc-turning-for-complex-internal-external-features/`<br>零件详情 | Define the profile and release checks；Confirm tooling and the release schedule；Related machining and part forms；Review your drawing | 已实施：本件完整主体优先；有信息差异的原图 / 裁切组成非对称细节；保留图纸、材料、工艺、接受条件与原件 RFQ 身份。 |
| `/machined-parts/gallery/oem-precision-cnc-machined-casting-housing-structural-enclosures/`<br>零件详情 | Review the blank, then the finished interfaces；Plan support for milling and boring；Related machining and part forms；Review your drawing | 已实施：本件完整主体优先；有信息差异的原图 / 裁切组成非对称细节；保留图纸、材料、工艺、接受条件与原件 RFQ 身份。 |
| `/machined-parts/gallery/oem-precision-cnc-machined-casting-housings/`<br>零件详情 | Define the sample before machining the casting；Review the machining route from your definition；Related machining and part forms；Review your drawing | 已实施：本件完整主体优先；有信息差异的原图 / 裁切组成非对称细节；保留图纸、材料、工艺、接受条件与原件 RFQ 身份。 |
| `/machined-parts/gallery/precision-cnc-machined-castings-custom-oem-housings/`<br>零件详情 | Define casting datums and finished interfaces；Review locating for the irregular blank；Related machining and part forms；Review your drawing | 已实施：本件完整主体优先；有信息差异的原图 / 裁切组成非对称细节；保留图纸、材料、工艺、接受条件与原件 RFQ 身份。 |
| `/machined-parts/gallery/precision-cnc-machined-castings-manufacturer/`<br>零件详情 | Blank definition & internal interfaces；Review boring, milling and datum transfer；Related machining and part forms；Review your drawing | 已实施：本件完整主体优先；有信息差异的原图 / 裁切组成非对称细节；保留图纸、材料、工艺、接受条件与原件 RFQ 身份。 |
| `/machined-parts/gallery/precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances/`<br>零件详情 | Bore relationships & working surfaces；Review low-stress workholding and heat control；Related machining and part forms；Review your drawing | 已实施：本件完整主体优先；有信息差异的原图 / 裁切组成非对称细节；保留图纸、材料、工艺、接受条件与原件 RFQ 身份。 |
| `/machined-parts/gallery/precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier/`<br>零件详情 | Choose the alloy for its function；Review the route and soft-metal control；Related machining and part forms；Review your drawing | 已实施：本件完整主体优先；有信息差异的原图 / 裁切组成非对称细节；保留图纸、材料、工艺、接受条件与原件 RFQ 身份。 |
| `/machined-parts/gallery/precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier/`<br>零件详情 | Define the part and each release；Review processes across the part list；Related machining and part forms；Review your drawing | 已实施：本件完整主体优先；有信息差异的原图 / 裁切组成非对称细节；保留图纸、材料、工艺、接受条件与原件 RFQ 身份。 |
| `/machined-parts/gallery/precision-machining-for-functional-plastic-blocks-structural-components/`<br>零件详情 | Bore pattern, working edges & measurement；Plan support around the working edges；Related machining and part forms；Review your drawing | 已实施：本件完整主体优先；有信息差异的原图 / 裁切组成非对称细节；保留图纸、材料、工艺、接受条件与原件 RFQ 身份。 |
| `/machined-parts/gallery/precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures/`<br>零件详情 | Define cavity and mounting relationships；Review support and repeated setups；Related machining and part forms；Review your drawing | 已实施：本件完整主体优先；有信息差异的原图 / 裁切组成非对称细节；保留图纸、材料、工艺、接受条件与原件 RFQ 身份。 |
| `/machined-parts/gallery/precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier/`<br>零件详情 | Define axes, supplied items and final condition；Plan tooling for the specified stainless grade；Related machining and part forms；Review your drawing | 已实施：本件完整主体优先；有信息差异的原图 / 裁切组成非对称细节；保留图纸、材料、工艺、接受条件与原件 RFQ 身份。 |
| `/machined-parts/gallery/precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier/`<br>零件详情 | Engagement, mounting & assembly scope；Review turning and additional features；Related machining and part forms；Review your drawing | 已实施：本件完整主体优先；有信息差异的原图 / 裁切组成非对称细节；保留图纸、材料、工艺、接受条件与原件 RFQ 身份。 |
| `/machined-parts/gallery/small-batch-cnc-machining-manufacturer-complex-aluminum-housings/`<br>零件详情 | Define mounting, sealing and finished interfaces；Review support for thin walls and pockets；Related machining and part forms；Review your drawing | 已实施：本件完整主体优先；有信息差异的原图 / 裁切组成非对称细节；保留图纸、材料、工艺、接受条件与原件 RFQ 身份。 |
| `/machined-parts/gallery/small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv/`<br>零件详情 | Control the specification and each release；Coordinate setups across the part list；Related machining and part forms；Review your drawing | 已实施：本件完整主体优先；有信息差异的原图 / 裁切组成非对称细节；保留图纸、材料、工艺、接受条件与原件 RFQ 身份。 |
| `/machined-parts/gallery/ultra-high-precision-machining-services/`<br>零件详情 | Define the blade and hub geometry；Review the multi-axis route；Related machining and part forms；Review your drawing | 已实施：本件完整主体优先；有信息差异的原图 / 裁切组成非对称细节；保留图纸、材料、工艺、接受条件与原件 RFQ 身份。 |
| `/machined-parts/machining-examples/`<br>实例目录 | One part, two holding positions；Five-axis machining for multiple faces；Turning followed by milling；Milling a pocketed enclosure component；CNC milling for prismatic parts；CNC machining a 29-inch display housing；Independent material collections；Review a similar component | 已实施：8 个来源实例按工艺问题选读，用有差异照片尺寸形成节奏；保留全部实例入口与边界。 |
| `/machined-parts/machining-examples/29-inch-display-housing-cnc-machining/`<br>加工实例 | Plan the panel around its assembly interfaces；Check the panel in its agreed support condition；Review a similar component | 已实施：以本实例原图序列为主，按现有工艺关系排布；事实、解释、待确认分开；不增客户订单、结果或交付数据。 |
| `/machined-parts/machining-examples/custom-metal-parts-batch-examples/`<br>加工实例 | Locking-pin and turned-part forms；Aluminum housings: cavities and mounting features；Brass fittings and interfaces；Aluminum parts after cleaning；Review a similar component | 已实施：以本实例原图序列为主，按现有工艺关系排布；事实、解释、待确认分开；不增客户订单、结果或交付数据。 |
| `/machined-parts/machining-examples/custom-plastic-parts-ptfe-pom-pe-acrylic/`<br>加工实例 | PTFE components and stepped shafts；POM gear teeth and hub details；Straight and curved PE guide strips；Acrylic components and viewing surfaces；Review a similar component | 已实施：以本实例原图序列为主，按现有工艺关系排布；事实、解释、待确认分开；不增客户订单、结果或交付数据。 |
| `/machined-parts/machining-examples/five-axis-machining-multi-face-parts/`<br>加工实例 | Read the part across its machining faces；Agree positions, profiles and inspection records；Review a similar component | 已实施：以本实例原图序列为主，按现有工艺关系排布；事实、解释、待确认分开；不增客户订单、结果或交付数据。 |
| `/machined-parts/machining-examples/milling-a-pocketed-enclosure-form/`<br>加工实例 | Define the pocket together with its interfaces；Agree cavity, interface and final-finish checks；Review a similar component | 已实施：以本实例原图序列为主，按现有工艺关系排布；事实、解释、待确认分开；不增客户订单、结果或交付数据。 |
| `/machined-parts/machining-examples/milling-prismatic-components/`<br>加工实例 | Connect the openings to the mounting faces；Agree bores, mounting faces and cross-setup checks；Review a similar component | 已实施：以本实例原图序列为主，按现有工艺关系排布；事实、解释、待确认分开；不增客户订单、结果或交付数据。 |
| `/machined-parts/machining-examples/turning-then-milling-cylindrical-parts/`<br>加工实例 | Connect the milled features to the turned geometry；Check the axis, off-axis features and final surfaces；Review a similar component | 已实施：以本实例原图序列为主，按现有工艺关系排布；事实、解释、待确认分开；不增客户订单、结果或交付数据。 |
| `/machined-parts/machining-examples/two-stage-cnc-milling/`<br>加工实例 | Establish the first locating faces；Keep the datum through repositioning；Check relationships after both setups；Review a similar component | 已实施：同件两次装夹为主叙事；保留原图、定位 / 基准解释和验收边界；连接铣削与图纸指南。 |
| `/privacy/`<br>隐私 | Your inquiry；Saved drafts；Cookies and external services；Product and company information；Contact | 已实施：以清晰长文、适度标题与相关操作为主；保留隐私与草稿存储说明。 |
| `/quote/`<br>RFQ 草稿 | Your inquiry；Contact LZZ directly | 已实施：联系与项目输入优先；保留产品 / 服务上下文、验证、sessionStorage、完整草稿、mailto / 编辑 / 复制 / 保存 / 清除及无发送边界。 |
| `/resources/`<br>资料目录 | RFQ & ordering；Technical guides；FAQ；Have your requirements ready? | 已实施：保持采购、技术、FAQ 三种任务分组，真实导语 + 开放链接索引；不用产品卡替代知识结构。 |
| `/resources/faq/`<br>FAQ | Quotes & ordering；Processes & specifications；Inspection & delivery；Have a question about your part? | 已实施：保留 15 问、按现有主题分组与可读回答；原生问答交互和 FAQ schema 继续与可见正文一致。 |
| `/resources/ordering/`<br>资料目录 | RFQ checklist；Compare quotations；Approve a machined prototype；Plan repeat production；Packing & international shipping；Blank ordering worksheets；Have your requirements ready? | 已实施：按采购任务选读 5 篇指南，开放文字索引 + 资料图；保留原分类、摘要、关联服务。 |
| `/resources/ordering/compare-cnc-machining-quotations/`<br>采购 / 技术指南 | Compare what the price includes；Resolve exceptions before awarding the order；Keep the agreed scope with the order；Discuss the scope of your quote | 已实施：66–72ch 长文；保留本页全部现有章节、目录 / 锚点、清单 / 表格 / 图示；只在具体解释处补图，不压缩成短营销页。 |
| `/resources/ordering/custom-cnc-parts-shipping-checklist/`<br>采购 / 技术指南 | Protection and identification；Timing and responsibility；Shipment and import documents；LZZ packing archive；Include shipment needs in the RFQ | 已实施：66–72ch 长文；保留本页全部现有章节、目录 / 锚点、清单 / 表格 / 图示；只在具体解释处补图，不压缩成短营销页。 |
| `/resources/ordering/machined-prototype-approval-checklist/`<br>采购 / 技术指南 | Agree what the sample must prove；Sample acceptance checks；Record the approval decision；Release the batch as a separate decision；Plan your sample and next batch | 已实施：66–72ch 长文；保留本页全部现有章节、目录 / 锚点、清单 / 表格 / 图示；只在具体解释处补图，不压缩成短营销页。 |
| `/resources/ordering/prototype-vs-small-batch-cnc/`<br>采购 / 技术指南 | Prototype and repeat-batch decisions；Approve the batch specification；Record revision and release；Confirm the next order；Request a quote for the next batch | 已实施：66–72ch 长文；保留本页全部现有章节、目录 / 锚点、清单 / 表格 / 图示；只在具体解释处补图，不压缩成短营销页。 |
| `/resources/ordering/rfq-checklist/`<br>采购 / 技术指南 | Copy this brief into your inquiry；Drawings and inspection requirements；Material and final surface；Quantity and delivery；Use the prepared information in an RFQ | 已实施：66–72ch 长文；保留本页全部现有章节、目录 / 锚点、清单 / 表格 / 图示；只在具体解释处补图，不压缩成短营销页。 |
| `/resources/technical-guides/`<br>资料目录 | Drawing requirements & critical features；Specify material & finish；Choose a machining process；Have your requirements ready? | 已实施：3 篇工程指南按工艺 / 图纸 / 材料选路；题目、说明和必要示意对应，避免同一 RFQ 模板重复。 |
| `/resources/technical-guides/cnc-process-selection/`<br>采购 / 技术指南 | Choose by geometry；Workshop setups and related studies；Tolerances for critical features；Discuss the requirements for your part | 已实施：66–72ch 长文；保留本页全部现有章节、目录 / 锚点、清单 / 表格 / 图示；只在具体解释处补图，不压缩成短营销页。 |
| `/resources/technical-guides/critical-features-cnc-drawing/`<br>采购 / 技术指南 | Start with the part function；Make the requirement measurable；Geometry and the machining route；Check the package before release；Review your drawing requirements | 已实施：66–72ch 长文；保留本页全部现有章节、目录 / 锚点、清单 / 表格 / 图示；只在具体解释处补图，不压缩成短营销页。 |
| `/resources/technical-guides/material-and-finish-checklist/`<br>采购 / 技术指南 | Choose the material specification；Specify the finished surface；Solid material, coating or covering?；Material and inspection records；Discuss the requirements for your part | 已实施：66–72ch 长文；保留本页全部现有章节、目录 / 锚点、清单 / 表格 / 图示；只在具体解释处补图，不压缩成短营销页。 |

## 扩展次序与完成门槛

1. 当前三页交付并等待用户确认。确认对象：窄体字层级、LZZ 蓝色行动、深浅章节节奏、照片主次、完整技术阅读。
2. 确认后迁移共享 token / 必要组件，保留 URL、目录数据和现有交互；将候选规则合入正式 DESIGN.md。
3. 先扩展其余 10 个能力详情，再处理零件总览 / 图库 / 35 详情与 8 实例；按工艺、材料、阶段分别检查，不复制铣削样板充数。
4. 继续工厂 / 企业 / 新闻 / 指南 / FAQ / RFQ / 隐私。资料型页面以阅读为先，不强制每页大 Hero 或 4–7 章。
5. 每类至少做 1440 / 1024 / 768 / 390px 真浏览器检查；逐页核对图片来源、内容与链接，保存改前改后 evidence。

实施顺序允许因真实素材到位调整，但不得删除缺图页面。P04 高质量实拍、CMM 校准 / 范围、当前设备资料、ISO 当前文件与澳洲新闻日期均维持缺口。没有完成这些资料确认，就不能新增相应商业结论。

本轮不执行上述第 2–5 阶段。兼容跳转 HTML、20 个既有 noindex 预览与错误页不当作 81 个待改正式页面；保留其路由与 noindex。全站检查发现的旧 factory 预览缺 Description，仅补一条审阅说明 meta，不算新增视觉样板。
