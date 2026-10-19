# 当前网站结构与内容来源

> 2026-10-17全站推广已完成：84页及最终图片检查见 [全站交付](FULL-SITE-REDESIGN-DELIVERY.md) 与 [逐页结果](penta-rollout-20261017/PAGE-RESULTS.md)。以下原有样板/盘点记录保留供追溯。

盘点日期：2026-10-17（Asia/Shanghai）。工作区：`D:/lzz/lzz/_react`。本文件的全量清单依据改造前源代码与 `dist`，仅描述本地候选网站；当前84页视觉已统一；原始结构快照保留供追溯。本轮浏览器与构建验收另见 `VISUAL-QA-REPORT.md`，没有发送询价或部署生产。机器可读基线快照：`D:/lzz/penta-redesign-20261017/inventory.json`。

## 范围、计数与事实优先级

当前构建包含 **207 个 HTML**：84 个正式可索引页面、102 个兼容跳转 HTML、20 个 noindex 设计/审阅预览、1 个错误恢复页。现有 `dist/sitemap.xml` 同为 84 个正式 URL。`scripts/build-seo.mjs` 从 catalog、原站 sitemap/page-manifest 与当前路由映射导出 **188 条 301 托管规则**，其中 86 条没有独立 HTML；不能把托管规则当作已验证的生产 HTTP 301。

首页构建文件修改时间：2026-10-17T00:52:48.276Z（UTC）。源代码、HTML 与素材登记散列保存在 inventory.json，便于后续核对并行改动。页面数量不是当前生产站点数量。

| 正式页面类型 | 数量 |
| --- | ---: |
| 首页 | 1 |
| 企业信息 | 4 |
| 新闻目录 | 1 |
| 新闻记录 | 5 |
| 能力目录 | 1 |
| 能力详情 | 11 |
| 工厂与质量 | 1 |
| 零件总览 | 1 |
| 零件图库 | 1 |
| 零件详情 | 35 |
| 加工实例目录 | 1 |
| 加工实例 | 8 |
| 隐私说明 | 1 |
| 询价草稿工具 | 1 |
| 资料目录 | 3 |
| FAQ | 1 |
| 采购/技术指南 | 8 |
| 合计 | 84 |

事实口径优先查看 `docs/claim-ledger-2026-09-25.md` 与 `docs/content-evidence.md` 顶部更新；后者后半部保留了历史口径，不能将旧的未确认 MOQ/交期/ISO 段落当成当前政策。导航当前结构来自 `siteSections.ts`、`resourceLibrary.ts`，与当前构建菜单逐项核对。

## 页头、子导航与页脚

Logo 返回 `/`；主操作为 **Prepare RFQ email → /quote/**。桌面与手机使用同一份目录；`MainNavigation.astro` 以原生 `details/summary` 展开子菜单，保留同一时刻单组展开、Escape、焦点离开与点击外部关闭、点击链接关闭手机导航的行为。1100px 为菜单形态切换条件。

- **Capabilities** `/capabilities/`
  - [Machining] CNC milling `/capabilities/cnc-milling-service/`
  - [Machining] CNC turning `/capabilities/cnc-turning-service/`
  - [Machining] 5-axis machining `/capabilities/5-axis-cnc-machining/`
  - [Machining] Plastic machining `/capabilities/plastic-machined-parts/`
  - [Machining] Machining of castings `/capabilities/casting-machining/`
  - [Materials] Aluminum machining `/capabilities/aluminum-cnc-parts/`
  - [Materials] Stainless steel machining `/capabilities/stainless-steel-cnc-parts/`
  - [Materials] Copper & brass machining `/capabilities/copper-brass-cnc-parts/`
  - [Order planning] Prototype machining `/capabilities/prototype-machining/`
  - [Order planning] Small production runs `/capabilities/low-volume-production/`
  - [Order planning] Starting with a sample `/capabilities/starting-with-a-sample/`
- **Machined parts** `/machined-parts/`
  - Parts gallery `/machined-parts/gallery/`
  - Machining examples `/machined-parts/machining-examples/`
- **Factory & quality** `/factory/`
  - 无下拉子页；Workshop、Quality 归于本页锚点。
- **Resources** `/resources/`
  - RFQ & ordering `/resources/ordering/`
  - Technical guides `/resources/technical-guides/`
  - FAQ `/resources/faq/`
- **About LZZ** `/about/`
  - Company profile `/about/company-profile/`
  - How we work `/about/how-we-work/`
  - Company news `/about/company-news/`
  - Contact us `/about/contact/`

页脚保持上述五个栏目；Capabilities 只列 CNC milling、CNC turning、5-axis machining 三个主要入口。Factory & quality 额外列本页锚点，其余栏目沿用完整二级入口：

- Capabilities `/capabilities/`：CNC milling `/capabilities/cnc-milling-service/`；CNC turning `/capabilities/cnc-turning-service/`；5-axis machining `/capabilities/5-axis-cnc-machining/`。
- Machined parts `/machined-parts/`：Parts gallery `/machined-parts/gallery/`；Machining examples `/machined-parts/machining-examples/`。
- Factory & quality `/factory/`：Workshop & equipment `/factory/#workshop`；Quality & documents `/factory/#quality`。
- Resources `/resources/`：RFQ & ordering `/resources/ordering/`；Technical guides `/resources/technical-guides/`；FAQ `/resources/faq/`。
- About LZZ `/about/`：Company profile `/about/company-profile/`；How we work `/about/how-we-work/`；Company news `/about/company-news/`；Contact us `/about/contact/`。

页脚还含 Privacy and site information → `/privacy/`、`mailto:roger@lzz-cnc.com`、`https://wa.me/8613858102479`、Facebook、LinkedIn。邮件与 WhatsApp 均为外部客户端/站点入口，不代表站内发送或业务送达。

## 全部正式页面（84 个）

每条 URL 都是相对于 `https://www.lzz-cnc.com` 的规范路径。页面入口是 Astro 文件；箭头后的名称是当前 `redesignRollout.ts` 生效分支中的主要组件。所有正式页面共享 `Layout.astro`、`MainNavigation.astro`、`SiteFooter.astro`。

| URL | 类型 / 当前标题 | 来源入口 → 主要组件 | 用途 |
| --- | --- | --- | --- |
| `/` | 首页：Custom CNC parts.Made to your drawing. | `src/pages/index.astro` → 样板 `PentaHome.astro`（原 `HomeApproved.astro` 保留） | 业务定位、实物选路、加工与工厂证据、采购下一步 |
| `/about/` | 企业信息：Custom machining in Hangzhou | `src/pages/about.astro` → `AboutOverviewRedesign.astro` | 公司、合作、资质资料或联系方式 |
| `/about/company-news/` | 新闻目录：Company news | `src/pages/about/company-news/index.astro` → `AboutNewsIndexRedesign.astro` | 按真实记录和日期选读企业活动 |
| `/about/company-news/australian-customer-workshop-visit-january-2025/` | 新闻记录：An Australian customer visits the LZZ workshop | `src/pages/about/company-news/[slug].astro` → `AboutNewsStoryRedesign.astro` | 以来源照片说明活动，不扩写订单、背书或结果 |
| `/about/company-news/china-africa-west-lake-summit-2025/` | 新闻记录：LZZ at the China-Africa West Lake Summit | `src/pages/about/company-news/[slug].astro` → `AboutNewsStoryRedesign.astro` | 以来源照片说明活动，不扩写订单、背书或结果 |
| `/about/company-news/lzz-team-outing-2024/` | 新闻记录：A rainy day out with the LZZ team | `src/pages/about/company-news/[slug].astro` → `AboutNewsStoryRedesign.astro` | 以来源照片说明活动，不扩写订单、背书或结果 |
| `/about/company-news/may-2025-lzz-team-outing/` | 新闻记录：LZZ team outing in May 2025 | `src/pages/about/company-news/[slug].astro` → `AboutNewsStoryRedesign.astro` | 以来源照片说明活动，不扩写订单、背书或结果 |
| `/about/company-news/november-2025-hangzhou-lizhizao-group-activity/` | 新闻记录：A November team day outdoors | `src/pages/about/company-news/[slug].astro` → `AboutNewsStoryRedesign.astro` | 以来源照片说明活动，不扩写订单、背书或结果 |
| `/about/company-profile/` | 企业信息：LZZ Precision in Hangzhou | `src/pages/about/company-profile.astro` → `AboutProfileRedesign.astro` | 公司、合作、资质资料或联系方式 |
| `/about/contact/` | 企业信息：Contact LZZ | `src/pages/about/contact.astro` → `AboutContactRedesign.astro` | 公司、合作、资质资料或联系方式 |
| `/about/how-we-work/` | 企业信息：From drawing review to finished parts | `src/pages/about/how-we-work.astro` → `AboutWorkflowRedesign.astro` | 公司、合作、资质资料或联系方式 |
| `/capabilities/` | 能力目录：CNC machining capabilities | `src/pages/capabilities/index.astro` → 样板 `PentaCapabilitiesDirectory.astro`（原目录保留） | 按工艺、材料和订单阶段选路 |
| `/capabilities/5-axis-cnc-machining/` | 能力详情：5-Axis CNC Machining Services | `src/pages/capabilities/[slug].astro` → `CapabilityRedesign.astro` → `CapabilityProcessPage.astro` | 解释适用形态、图纸输入、材料/装夹/检验条件并进入关联询价 |
| `/capabilities/aluminum-cnc-parts/` | 能力详情：Aluminum CNC Machining Services | `src/pages/capabilities/[slug].astro` → `CapabilityRedesign.astro` → `CapabilityAluminumPage.astro` | 解释适用形态、图纸输入、材料/装夹/检验条件并进入关联询价 |
| `/capabilities/casting-machining/` | 能力详情：Casting Machining Services | `src/pages/capabilities/[slug].astro` → `CapabilityRedesign.astro` → `CapabilityCastingPage.astro` | 解释适用形态、图纸输入、材料/装夹/检验条件并进入关联询价 |
| `/capabilities/cnc-milling-service/` | 能力详情：CNC Milling Services | `src/pages/capabilities/[slug].astro` → 样板 `PentaMillingPage.astro`（原组件保留） | 解释适用形态、图纸输入、材料/装夹/检验条件并进入关联询价 |
| `/capabilities/cnc-turning-service/` | 能力详情：CNC Turning Services | `src/pages/capabilities/[slug].astro` → `CapabilityRedesign.astro` → `CapabilityTurningPage.astro` | 解释适用形态、图纸输入、材料/装夹/检验条件并进入关联询价 |
| `/capabilities/copper-brass-cnc-parts/` | 能力详情：Copper & Brass CNC Machining | `src/pages/capabilities/[slug].astro` → `CapabilityRedesign.astro` → `CapabilityMaterialPage.astro` | 解释适用形态、图纸输入、材料/装夹/检验条件并进入关联询价 |
| `/capabilities/low-volume-production/` | 能力详情：Low-Volume CNC Production | `src/pages/capabilities/[slug].astro` → `CapabilityRedesign.astro` → `CapabilityBatchPage.astro` | 解释适用形态、图纸输入、材料/装夹/检验条件并进入关联询价 |
| `/capabilities/plastic-machined-parts/` | 能力详情：Plastic CNC Machining Services | `src/pages/capabilities/[slug].astro` → `CapabilityRedesign.astro` → `CapabilityPlasticPage.astro` | 解释适用形态、图纸输入、材料/装夹/检验条件并进入关联询价 |
| `/capabilities/prototype-machining/` | 能力详情：CNC Prototype Machining | `src/pages/capabilities/[slug].astro` → `CapabilityRedesign.astro` → `CapabilityPrototypePage.astro` | 解释适用形态、图纸输入、材料/装夹/检验条件并进入关联询价 |
| `/capabilities/stainless-steel-cnc-parts/` | 能力详情：Stainless Steel CNC Machining | `src/pages/capabilities/[slug].astro` → `CapabilityRedesign.astro` → `CapabilityStainlessPage.astro` | 解释适用形态、图纸输入、材料/装夹/检验条件并进入关联询价 |
| `/capabilities/starting-with-a-sample/` | 能力详情：Machining from an Existing Sample | `src/pages/capabilities/starting-with-a-sample.astro` → `CapabilityRedesign.astro` → `CapabilitySamplePage.astro` | 解释适用形态、图纸输入、材料/装夹/检验条件并进入关联询价 |
| `/factory/` | 工厂与质量：CNC machining in Hangzhou. | `src/pages/factory.astro` → `FactoryRedesign.astro` | 车间、设备类别、检验与文件要求、包装交接 |
| `/machined-parts/` | 零件总览：Machined parts, made to your drawing. | `src/pages/machined-parts/index.astro` → `ProductsOverviewRedesigned.astro` | 由零件形态或采购任务进入图库、工艺与实例 |
| `/machined-parts/gallery/` | 零件图库：Parts gallery | `src/pages/machined-parts/gallery/index.astro` → `ProductsCatalogueRedesigned.astro` → `PartsCatalogueExplorerRedesigned.tsx` | 35 个目录零件的搜索、材料/工艺/形态筛选及比较 |
| `/machined-parts/gallery/custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier/` | 零件详情：Aluminum intercooler prototypes | `src/pages/machined-parts/gallery/[slug].astro` → `ProductsPart.astro` → `ProductsPartRedesigned.astro` | 说明此零件参照的可见形态、适配/限制、图纸与验收输入 |
| `/machined-parts/gallery/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/` | 零件详情：Billet aluminum engine covers | `src/pages/machined-parts/gallery/[slug].astro` → `ProductsPart.astro` → `ProductsPartRedesigned.astro` | 说明此零件参照的可见形态、适配/限制、图纸与验收输入 |
| `/machined-parts/gallery/custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier/` | 零件详情：Injector & fuel-rail intake manifolds | `src/pages/machined-parts/gallery/[slug].astro` → `ProductsPart.astro` → `ProductsPartRedesigned.astro` | 说明此零件参照的可见形态、适配/限制、图纸与验收输入 |
| `/machined-parts/gallery/custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier/` | 零件详情：Billet aluminum intake plenums | `src/pages/machined-parts/gallery/[slug].astro` → `ProductsPart.astro` → `ProductsPartRedesigned.astro` | 说明此零件参照的可见形态、适配/限制、图纸与验收输入 |
| `/machined-parts/gallery/custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier/` | 零件详情：Intake-system assembly reference | `src/pages/machined-parts/gallery/[slug].astro` → `ProductsPart.astro` → `ProductsPartRedesigned.astro` | 说明此零件参照的可见形态、适配/限制、图纸与验收输入 |
| `/machined-parts/gallery/custom-cnc-machined-castings-transmission-housings-pump-bodies/` | 零件详情：Transmission housings & pump bodies | `src/pages/machined-parts/gallery/[slug].astro` → `ProductsPart.astro` → `ProductsPartRedesigned.astro` | 说明此零件参照的可见形态、适配/限制、图纸与验收输入 |
| `/machined-parts/gallery/custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier/` | 零件详情：Throttle-body CAD reference | `src/pages/machined-parts/gallery/[slug].astro` → `ProductsPart.astro` → `ProductsPartRedesigned.astro` | 说明此零件参照的可见形态、适配/限制、图纸与验收输入 |
| `/machined-parts/gallery/custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier/` | 零件详情：Flanged turned component assemblies | `src/pages/machined-parts/gallery/[slug].astro` → `ProductsPart.astro` → `ProductsPartRedesigned.astro` | 说明此零件参照的可见形态、适配/限制、图纸与验收输入 |
| `/machined-parts/gallery/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/` | 零件详情：Multi-bore circular milled component | `src/pages/machined-parts/gallery/[slug].astro` → `ProductsPart.astro` → `ProductsPartRedesigned.astro` | 说明此零件参照的可见形态、适配/限制、图纸与验收输入 |
| `/machined-parts/gallery/custom-high-precision-machining-for-structural-aesthetic-components-oem/` | 零件详情：Structural & aesthetic components | `src/pages/machined-parts/gallery/[slug].astro` → `ProductsPart.astro` → `ProductsPartRedesigned.astro` | 说明此零件参照的可见形态、适配/限制、图纸与验收输入 |
| `/machined-parts/gallery/custom-oem-cnc-machined-non-metallic-components-insulating-parts/` | 零件详情：Non-metallic & insulating components | `src/pages/machined-parts/gallery/[slug].astro` → `ProductsPart.astro` → `ProductsPartRedesigned.astro` | 说明此零件参照的可见形态、适配/限制、图纸与验收输入 |
| `/machined-parts/gallery/custom-oem-cnc-machined-plastic-parts-manufacturer/` | 零件详情：Custom machined plastic parts | `src/pages/machined-parts/gallery/[slug].astro` → `ProductsPart.astro` → `ProductsPartRedesigned.astro` | 说明此零件参照的可见形态、适配/限制、图纸与验收输入 |
| `/machined-parts/gallery/custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer/` | 零件详情：Turned fittings, connectors & flanges | `src/pages/machined-parts/gallery/[slug].astro` → `ProductsPart.astro` → `ProductsPartRedesigned.astro` | 说明此零件参照的可见形态、适配/限制、图纸与验收输入 |
| `/machined-parts/gallery/custom-oem-cnc-turning-manufacturer/` | 零件详情：Custom CNC-turned components | `src/pages/machined-parts/gallery/[slug].astro` → `ProductsPart.astro` → `ProductsPartRedesigned.astro` | 说明此零件参照的可见形态、适配/限制、图纸与验收输入 |
| `/machined-parts/gallery/custom-oem-high-precision-cnc-milling-manufacturer/` | 零件详情：Milled instrument blocks & brackets | `src/pages/machined-parts/gallery/[slug].astro` → `ProductsPart.astro` → `ProductsPartRedesigned.astro` | 说明此零件参照的可见形态、适配/限制、图纸与验收输入 |
| `/machined-parts/gallery/custom-rotary-cylindrical-components/` | 零件详情：Rotary & cylindrical components | `src/pages/machined-parts/gallery/[slug].astro` → `ProductsPart.astro` → `ProductsPartRedesigned.astro` | 说明此零件参照的可见形态、适配/限制、图纸与验收输入 |
| `/machined-parts/gallery/full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing/` | 零件详情：Milled metal brackets & finished housings | `src/pages/machined-parts/gallery/[slug].astro` → `ProductsPart.astro` → `ProductsPartRedesigned.astro` | 说明此零件参照的可见形态、适配/限制、图纸与验收输入 |
| `/machined-parts/gallery/global-manufacturer-of-multi-sided-precision-machined-components/` | 零件详情：Multi-sided machined components | `src/pages/machined-parts/gallery/[slug].astro` → `ProductsPart.astro` → `ProductsPartRedesigned.astro` | 说明此零件参照的可见形态、适配/限制、图纸与验收输入 |
| `/machined-parts/gallery/global-oem-precision-machining-solutions/` | 零件详情：Angled turned component reference | `src/pages/machined-parts/gallery/[slug].astro` → `ProductsPart.astro` → `ProductsPartRedesigned.astro` | 说明此零件参照的可见形态、适配/限制、图纸与验收输入 |
| `/machined-parts/gallery/high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem/` | 零件详情：Turbine & fluid-system components | `src/pages/machined-parts/gallery/[slug].astro` → `ProductsPart.astro` → `ProductsPartRedesigned.astro` | 说明此零件参照的可见形态、适配/限制、图纸与验收输入 |
| `/machined-parts/gallery/high-volume-cnc-turning-for-complex-internal-external-features/` | 零件详情：Complex internal & external turned features | `src/pages/machined-parts/gallery/[slug].astro` → `ProductsPart.astro` → `ProductsPartRedesigned.astro` | 说明此零件参照的可见形态、适配/限制、图纸与验收输入 |
| `/machined-parts/gallery/oem-precision-cnc-machined-casting-housing-structural-enclosures/` | 零件详情：Cast housings & structural enclosures | `src/pages/machined-parts/gallery/[slug].astro` → `ProductsPart.astro` → `ProductsPartRedesigned.astro` | 说明此零件参照的可见形态、适配/限制、图纸与验收输入 |
| `/machined-parts/gallery/oem-precision-cnc-machined-casting-housings/` | 零件详情：CNC-machined casting housings | `src/pages/machined-parts/gallery/[slug].astro` → `ProductsPart.astro` → `ProductsPartRedesigned.astro` | 说明此零件参照的可见形态、适配/限制、图纸与验收输入 |
| `/machined-parts/gallery/precision-cnc-machined-castings-custom-oem-housings/` | 零件详情：Machined castings & OEM housings | `src/pages/machined-parts/gallery/[slug].astro` → `ProductsPart.astro` → `ProductsPartRedesigned.astro` | 说明此零件参照的可见形态、适配/限制、图纸与验收输入 |
| `/machined-parts/gallery/precision-cnc-machined-castings-manufacturer/` | 零件详情：Precision-machined castings | `src/pages/machined-parts/gallery/[slug].astro` → `ProductsPart.astro` → `ProductsPartRedesigned.astro` | 说明此零件参照的可见形态、适配/限制、图纸与验收输入 |
| `/machined-parts/gallery/precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances/` | 零件详情：Repeated-hole plastic strip references | `src/pages/machined-parts/gallery/[slug].astro` → `ProductsPart.astro` → `ProductsPartRedesigned.astro` | 说明此零件参照的可见形态、适配/限制、图纸与验收输入 |
| `/machined-parts/gallery/precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier/` | 零件详情：Turned brass & copper components | `src/pages/machined-parts/gallery/[slug].astro` → `ProductsPart.astro` → `ProductsPartRedesigned.astro` | 说明此零件参照的可见形态、适配/限制、图纸与验收输入 |
| `/machined-parts/gallery/precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier/` | 零件详情：Pilot-batch housing references | `src/pages/machined-parts/gallery/[slug].astro` → `ProductsPart.astro` → `ProductsPartRedesigned.astro` | 说明此零件参照的可见形态、适配/限制、图纸与验收输入 |
| `/machined-parts/gallery/precision-machining-for-functional-plastic-blocks-structural-components/` | 零件详情：Circular plastic component reference | `src/pages/machined-parts/gallery/[slug].astro` → `ProductsPart.astro` → `ProductsPartRedesigned.astro` | 说明此零件参照的可见形态、适配/限制、图纸与验收输入 |
| `/machined-parts/gallery/precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures/` | 零件详情：Open aluminum enclosure references | `src/pages/machined-parts/gallery/[slug].astro` → `ProductsPart.astro` → `ProductsPartRedesigned.astro` | 说明此零件参照的可见形态、适配/限制、图纸与验收输入 |
| `/machined-parts/gallery/precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier/` | 零件详情：Rotary component & flange reference | `src/pages/machined-parts/gallery/[slug].astro` → `ProductsPart.astro` → `ProductsPartRedesigned.astro` | 说明此零件参照的可见形态、适配/限制、图纸与验收输入 |
| `/machined-parts/gallery/precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier/` | 零件详情：Indexing plungers & locking pins | `src/pages/machined-parts/gallery/[slug].astro` → `ProductsPart.astro` → `ProductsPartRedesigned.astro` | 说明此零件参照的可见形态、适配/限制、图纸与验收输入 |
| `/machined-parts/gallery/small-batch-cnc-machining-manufacturer-complex-aluminum-housings/` | 零件详情：Pocketed aluminum housings | `src/pages/machined-parts/gallery/[slug].astro` → `ProductsPart.astro` → `ProductsPartRedesigned.astro` | 说明此零件参照的可见形态、适配/限制、图纸与验收输入 |
| `/machined-parts/gallery/small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv/` | 零件详情：Pilot-run component references | `src/pages/machined-parts/gallery/[slug].astro` → `ProductsPart.astro` → `ProductsPartRedesigned.astro` | 说明此零件参照的可见形态、适配/限制、图纸与验收输入 |
| `/machined-parts/gallery/ultra-high-precision-machining-services/` | 零件详情：Custom CNC Impeller Machining | `src/pages/machined-parts/gallery/[slug].astro` → `ProductsPart.astro` → `ProductsPartRedesigned.astro` | 说明此零件参照的可见形态、适配/限制、图纸与验收输入 |
| `/machined-parts/machining-examples/` | 加工实例目录：Machining examples | `src/pages/machined-parts/machining-examples/index.astro` → `ProductsStudiesIndexRedesigned.astro` | 选择 6 个工序记录与 2 组零件集合 |
| `/machined-parts/machining-examples/29-inch-display-housing-cnc-machining/` | 加工实例：CNC machining a 29-inch display housing | `src/pages/machined-parts/machining-examples/[slug].astro` → `ProductsStudy.astro` → `ProductsStudyRedesigned.astro` | 用真实装夹或来源集合解释工艺关系及边界，不冒充客户结果 |
| `/machined-parts/machining-examples/custom-metal-parts-batch-examples/` | 加工实例：Metal part examples: shafts, fittings & housings | `src/pages/machined-parts/machining-examples/[slug].astro` → `ProductsStudy.astro` → `ProductsStudyRedesigned.astro` | 用真实装夹或来源集合解释工艺关系及边界，不冒充客户结果 |
| `/machined-parts/machining-examples/custom-plastic-parts-ptfe-pom-pe-acrylic/` | 加工实例：Plastic part examples: PTFE, POM, PE & acrylic | `src/pages/machined-parts/machining-examples/[slug].astro` → `ProductsStudy.astro` → `ProductsStudyRedesigned.astro` | 用真实装夹或来源集合解释工艺关系及边界，不冒充客户结果 |
| `/machined-parts/machining-examples/five-axis-machining-multi-face-parts/` | 加工实例：Five-axis CNC machining for multi-face parts | `src/pages/machined-parts/machining-examples/[slug].astro` → `ProductsStudy.astro` → `ProductsStudyRedesigned.astro` | 用真实装夹或来源集合解释工艺关系及边界，不冒充客户结果 |
| `/machined-parts/machining-examples/milling-a-pocketed-enclosure-form/` | 加工实例：CNC milling a pocketed enclosure: walls, bores and datums | `src/pages/machined-parts/machining-examples/[slug].astro` → `ProductsStudy.astro` → `ProductsStudyRedesigned.astro` | 用真实装夹或来源集合解释工艺关系及边界，不冒充客户结果 |
| `/machined-parts/machining-examples/milling-prismatic-components/` | 加工实例：CNC milling prismatic parts: faces, bores and pockets | `src/pages/machined-parts/machining-examples/[slug].astro` → `ProductsStudy.astro` → `ProductsStudyRedesigned.astro` | 用真实装夹或来源集合解释工艺关系及边界，不冒充客户结果 |
| `/machined-parts/machining-examples/turning-then-milling-cylindrical-parts/` | 加工实例：CNC turning followed by milling for cylindrical parts | `src/pages/machined-parts/machining-examples/[slug].astro` → `ProductsStudy.astro` → `ProductsStudyRedesigned.astro` | 用真实装夹或来源集合解释工艺关系及边界，不冒充客户结果 |
| `/machined-parts/machining-examples/two-stage-cnc-milling/` | 加工实例：Two CNC milling setups: keeping features aligned | `src/pages/machined-parts/machining-examples/[slug].astro` → `ProductsStudy.astro` → `TwoStageStudy.astro` | 用真实装夹或来源集合解释工艺关系及边界，不冒充客户结果 |
| `/privacy/` | 隐私说明：Privacy and site information | `src/pages/privacy.astro` → `Layout.astro + inline page content` | 说明草稿存储、外部服务和内容边界 |
| `/quote/` | 询价草稿工具：Prepare an RFQ email | `src/pages/quote.astro` → `QuoteForm.tsx` | 生成并审阅本地邮件草稿，复制/保存/唤起邮件客户端 |
| `/resources/` | 资料目录：Resources for CNC machining | `src/pages/resources/index.astro` → `ResourceDirectoryRedesign.astro` | 为 RFQ 采购或技术问题选择下级内容 |
| `/resources/faq/` | FAQ：Custom CNC machining FAQs | `src/pages/resources/faq.astro` → `ResourceFaqRedesign.astro` | 15 个直接可读问答与详细资料入口 |
| `/resources/ordering/` | 资料目录：RFQ & ordering | `src/pages/resources/ordering/index.astro` → `ResourceDirectoryRedesign.astro` | 为 RFQ 采购或技术问题选择下级内容 |
| `/resources/ordering/compare-cnc-machining-quotations/` | 采购/技术指南：Compare CNC machining quotations | `src/pages/resources/ordering/[slug].astro` → `ResourceGuidePage.astro` → `ResourceGuideRedesign.astro` | 提供采购/技术判断、条件对照和资料准备工具 |
| `/resources/ordering/custom-cnc-parts-shipping-checklist/` | 采购/技术指南：Plan the shipment of CNC parts | `src/pages/resources/ordering/[slug].astro` → `ResourceGuidePage.astro` → `ResourceGuideRedesign.astro` | 提供采购/技术判断、条件对照和资料准备工具 |
| `/resources/ordering/machined-prototype-approval-checklist/` | 采购/技术指南：Machined prototype approval | `src/pages/resources/ordering/[slug].astro` → `ResourceGuidePage.astro` → `ResourceGuideRedesign.astro` | 提供采购/技术判断、条件对照和资料准备工具 |
| `/resources/ordering/prototype-vs-small-batch-cnc/` | 采购/技术指南：From the first sample to repeat production | `src/pages/resources/ordering/[slug].astro` → `ResourceGuidePage.astro` → `ResourceGuideRedesign.astro` | 提供采购/技术判断、条件对照和资料准备工具 |
| `/resources/ordering/rfq-checklist/` | 采购/技术指南：CNC machining RFQ checklist | `src/pages/resources/ordering/[slug].astro` → `ResourceGuidePage.astro` → `ResourceGuideRedesign.astro` | 提供采购/技术判断、条件对照和资料准备工具 |
| `/resources/technical-guides/` | 资料目录：Technical guides | `src/pages/resources/technical-guides/index.astro` → `ResourceDirectoryRedesign.astro` | 为 RFQ 采购或技术问题选择下级内容 |
| `/resources/technical-guides/cnc-process-selection/` | 采购/技术指南：Choose the CNC machining route | `src/pages/resources/technical-guides/[slug].astro` → `ResourceGuidePage.astro` → `ResourceGuideRedesign.astro` | 提供采购/技术判断、条件对照和资料准备工具 |
| `/resources/technical-guides/critical-features-cnc-drawing/` | 采购/技术指南：CNC drawings & critical features | `src/pages/resources/technical-guides/[slug].astro` → `ResourceGuidePage.astro` → `ResourceGuideRedesign.astro` | 提供采购/技术判断、条件对照和资料准备工具 |
| `/resources/technical-guides/material-and-finish-checklist/` | 采购/技术指南：Material & finish for CNC parts | `src/pages/resources/technical-guides/[slug].astro` → `ResourceGuidePage.astro` → `ResourceGuideRedesign.astro` | 提供采购/技术判断、条件对照和资料准备工具 |

## SEO 与询价边界

- 域名配置与 canonical 原点为 `https://www.lzz-cnc.com`，静态输出，路径保留结尾斜线；`build-seo.mjs` 仅将 canonical 自指、未 noindex 且非兼容页的正式地址写入 sitemap。当前 robots 允许抓取并指向该 sitemap。
- `Layout.astro` 输出英文 `lang`、标题、description、Open Graph、Twitter 与 JSON-LD；通用实体为 Organization / WebSite / WebPage，适用页面附 BreadcrumbList、Article、Service 或 Product。目录零件的 16 个混合服务/集合主题使用 Service，具体零件族使用 Product；不添加价格、库存、评价或未核实规格。
- Resources 的三层关系为总览 → RFQ & ordering / Technical guides / FAQ；8 篇文章在所属分类下，FAQ 的15问是页内内容。Factory 当前是一个正式页面，Workshop 与 Quality 为锚点。About 的企业文件并入 Company profile 的 `#documents`。
- 旧 `/products/`、`/products/part-examples/`、`/products/machining-studies/` 已由兼容入口引向 `/machined-parts/`；旧列表兼容脚本保留查询条件与 hash。下面完整列出实际构建的兼容页，不从 sitemap 数量推断生产 301。
- 询价路径保留 `inquiryContext.ts` 的零件/能力身份与规范来源 URL。`QuoteForm.tsx` 先校验，再生成完整邮件草稿；`sessionStorage` 仅保存当前 tab 的上下文，可清除、复制及下载 TXT，`mailto:` 交给用户邮件客户端附图并发送。网站没有上传文件、后端收件、发送成功状态、回复 SLA 或送达凭据。本盘点没有操作这些交互。
- 当前 noindex 的历史工厂方案页 `/design-previews/factory-20261016/` 缺 description（当前构建可核对）；不在本次清单盘点中改它或将其混作正式页面错误。

## 当前内容模型与主要图片来源

| 范围 | 当前来源与身份 | 可保留的证明范围 |
| --- | --- | --- |
| 35 个零件 | `catalog.json` 原始身份；`productsEditorial.ts` 展示标题/叙事；`productSourceMedia.generated.json` 当前来源图；`productDetails.ts` / `productReading.ts` 技术条件 | 实物可见外观与来源清楚的材料/工艺；不从原始营销标题推导无条件精度、现货或认证 |
| 工序/零件集合 | `cases.ts`、`caseStories.ts`、`caseReading.ts`、`workshopCollections.ts`、`evidence.ts` | 6 个工序例与 2 个集合；可见装夹、工件和特征关系，不变成客户结果、同一订单或指定材料证明 |
| 工厂/检验/包装 | `evidence.generated.json`、`additionalMedia.generated.json` 记录原路径、SHA-256 与证明范围 | 真实车间/设备/历史包装场景；不证明当前台数、校准、某单实测、发往某国或运输履约 |
| 企业与新闻 | `company.ts`、`aboutApproved.ts`、`companyNewsSources.json`、`companyNewsMedia.json`，三张原始认可/教学文件 | 历史记录、文件原件身份、可见活动；三张认可/教学文件不等于 ISO 证书 |
| 示意与 AI 图 | `docs/generated-visuals.json`、`docs/editorial-visuals.json`、`docs/imagegen-redesign-20261015/manifest.json` 等，结合当前 DOM 的 `data-image-origin` 和图注 | 明确身份的辅助说明；产品/场景概念不得变为工厂、客户、检验、订单或交付证据 |

机器清单记录每个正式页面的全部 `main img` 路径、alt、图注、来源标识与主要登记出处；只在登记有实际匹配时关联，未匹配保持未知。DOM 中图片数量没有扣除同源裁片、隐藏图片或低清源，**不能据此宣称图片验收达标**。改造前基线使用的独立 `src` 共 218 个（含预览/错误页），源文件存在性一并记录；本轮三个样板的 16 个保留文件与 3 张新图另见图片清单。主要页面的前三个改前 DOM 图位如下，仅帮助定位素材：

| 页面 | 主要图位（按 DOM 顺序） |
| --- | --- |
| `/` | `/media/editorial-rebuild-20261015/machining-hero-1200.webp` [AI-generated]<br>`/media/product-sources-20261015/p02-1200.webp` [source-listing]<br>`/media/product-sources-20261015/p22-framed-1200.webp` [source-listing] |
| `/capabilities/` | `/media/product-sources-20261015/p00-framed-1200.webp` [source-listing]<br>`/media/product-sources-20261015/p19-framed-1200.webp` [source-listing]<br>`/media/product-sources-20261015/p02-1200.webp` [source-listing] |
| `/capabilities/cnc-milling-service/` | `/media/product-sources-20261015/p00-framed-1200.webp` [source-listing]<br>`/media/product-sources-20261015/p33-1200.webp` [source-listing]<br>`/media/product-sources-20261015/p13-1200.webp` [reference-photo] |
| `/capabilities/plastic-machined-parts/` | `/media/product-sources-20261015/p26-1200.webp` [source-listing]<br>`/media/product-sources-20261015/p21-1200.webp` [source-listing]<br>`/media/product-sources-20261015/p29-framed-1200.webp` [original-subject-ai-background] |
| `/machined-parts/` | `/media/evidence/five-axis-parts-1600.webp` [original-photo]<br>`/media/product-sources-20261015/p33-1200.webp` [source-listing]<br>`/media/product-sources-20261015/p32-framed-1200.webp` [source-listing] |
| `/machined-parts/gallery/` | `/media/product-sources-20261015/p00-framed-1200.webp` [source-listing]<br>`/media/product-sources-20261015/p01-1200.webp` [source-listing]<br>`/media/product-sources-20261015/p02-1200.webp` [source-listing] |
| `/machined-parts/gallery/precision-machining-for-functional-plastic-blocks-structural-components/` | `/media/product-sources-20261015/p29-framed-1200.webp` [original-subject-ai-background]<br>`/media/source-details/plastic-ptfe-shafts-1200.webp` [original-photo]<br>`/media/product-sources-20261015/p26-1200.webp` [source-listing] |
| `/machined-parts/machining-examples/two-stage-cnc-milling/` | `/media/products-real-details-20261015/two-stage-first.webp` [original-photo-crop]<br>`/media/products-real-details-20261015/two-stage-second.webp` [original-photo-crop]<br>`/media/evidence/cmm-detail-1600.webp` [original-photo] |
| `/factory/` | `/media/evidence/workshop-wide-1600.webp` [original-photo]<br>`/media/evidence/workshop-operators-2025-1600.webp` [original-photo]<br>`/media/evidence/milling-enclosure-operation-1600.webp` [original-photo] |
| `/resources/ordering/rfq-checklist/` | `/media/image-led-20261015/definition-1200.webp` [ai-illustration]<br>`/media/image-led-20261015/material-samples-1200.webp` [ai-illustration]<br>`/media/site-polish-20261016/packing-concept-1200.webp` [ai-illustration] |
| `/about/company-profile/` | `/media/evidence/workshop-wide-1600.webp` [original-photo]<br>`/media/evidence/cmm-room-1600.webp` [original-photo]<br>`/media/High-tech-Enterprise-Certificate-1764396986484--69861fe474.webp` [original-company-document] |
| `/about/company-news/australian-customer-workshop-visit-january-2025/` | `/media/company-news/australian-visit-03-1600.webp` [original-photo]<br>`/media/company-news/australian-visit-04-1600.webp` [original-photo]<br>`/media/company-news/australian-visit-02-1600.webp` [original-photo] |

## 必须保留的条件与待补真实资料

1. **商业数字的条件。** 1 件起订；7–14 个工作日从图纸与订单确认后起算、包含表面处理、运输另计并以报价确认。40+ 指加工及辅助设备；15+ 年指团队经验；约100,000件/月是受产品组合影响的参考产能。
2. **技术与质量的边界。** ±0.01 mm 只属于选定关键特征的条件参考；五轴行程、负载、包络未公开，逐图评估。当前 ISO 9001 认证可按用户授权表述，证书持有人/编号/范围/有效期、设备台账、校准、脱敏检验报告仍待真实归档。不能以三张企业认可文件代替。
3. **P04 真实清晰图。** `/machined-parts/gallery/global-manufacturer-of-multi-sided-precision-machined-components/` 的低清整体图不计有效；最新集中交付将其列为2个有效来源、2/5图文章，待补同一零件完整实拍及孔/槽/端口细节。目录受其缩略素材影响，不能用类似件或拒绝接入的AI编辑替代。来源：`docs/IMAGE-LED-REDESIGN-DELIVERY.md` 当前相关记录与产品来源映射。
4. **新闻日期冲突。** 澳洲来访的7 January 2025来源与照片日历冲突仍待核对；不自行改日期，也不据新闻照片推定客户名称授权、合同或订单。
5. **生产/询价状态。** 本盘点只读本地源码和已有构建，未触达生产域名、未发送真实询价、未重验浏览器交互。不要把历史QA、当前dist和生产站状态合并。

## 已选三个正文样板的保留清单

本轮已选 `/`、`/capabilities/`、`/capabilities/cnc-milling-service/`，只做专属正文 scope；方向确认前不推广其他正式页面。完整改前浏览器文字、链接、schema及图片基线由主Agent保存于 `D:/lzz/penta-redesign-20261017/before/results.json`。本盘点只读取该现成证据，未运行浏览器。其1440px完整记录另纳入 inventory.json 的 `representativePreservation[].baseline1440`，不能用改前证据替代改后验收。

| 样板 | 原有核心内容与入口保留点 |
| --- | --- |
| 首页 `/` | 5章：图纸定制定位；35个参照及4个主要实物入口；5工艺+4材料选路；同件两次装夹与3个实例入口；2017/1500m²/40+含辅助设备、ISO和索取当前证书；1件/7–14工作日完整条件；图纸清单与实物重建独立批准、邮件草稿说明。图注保留AI概念与真实工厂/装夹身份。 |
| 能力目录 `/capabilities/` | 6章：目录选路；4种几何工艺（铣、车、五轴、铸件后加工）；4材料（铝、不锈钢、铜/黄铜、工程塑料）；3阶段（原型、小批量、按样重建）；真实装夹/质量入口；询价输入与完整商业条件。保留全部11个二级能力URL、`#machining-processes`/`#materials`/`#production-stages`/`#source-records`/`#enquiry`等页内目标，保留仅由外观不能判断牌号的说明。 |
| 铣削详情 `/capabilities/cnc-milling-service/` | 7章：服务与主体；壳体/曲面盖实物（仪器件/P04限清晰度入口）；同件两次装夹；图纸几何/尺寸/装夹/可达性答复；完整3列材料与处理表；±0.01mm条件、特征/图纸/检验3列表与CMM当前校准边界；3组RFQ输入及起订/生产窗口条件。保留全部原表行、技术条件、相关指南/工艺实例/质量入口和带能力身份的询价URL。P04只能保留有限细节的阅读入口。 |

共同保护：单一H1、可读正文和标题层级；canonical/title/description、OG、JSON-LD实体身份和面包屑不因视觉样板重写；页头/子导航/页脚、法定主体及联系方式、所有实际表单/草稿逻辑保留。图片可重新选择与排布，但真实产品、工厂、装夹不可生成改造；辅助概念明确标注。

| 页面 | 当前title / description（逐字） | canonical / schema |
| --- | --- | --- |
| `/` | **Custom CNC machining for prototypes & small batches  /  LZZ Precision**<br>Custom CNC machining in Hangzhou for prototypes and small batches. Orders from 1 piece; production in 7-14 business days after drawing and order confirmation. Transit is additional. | `https://www.lzz-cnc.com/`<br>`Organization`, `WebSite`, `WebPage` |
| `/capabilities/` | **CNC Machining Capabilities  /  LZZ Precision**<br>Choose CNC milling, turning, multi-axis or casting finish machining. Define grades, drawing inputs and acceptance for prototypes, sample reconstruction and repeat batches. | `https://www.lzz-cnc.com/capabilities/`<br>`Organization`, `WebSite`, `WebPage`, `BreadcrumbList` |
| `/capabilities/cnc-milling-service/` | **CNC Milling Services  /  LZZ Precision**<br>CNC milling for blocks, brackets and housings. Send your drawing with mating features, finish requirements and any limits on tool access. | `https://www.lzz-cnc.com/capabilities/cnc-milling-service/`<br>`Organization`, `WebSite`, `WebPage`, `BreadcrumbList`, `Service` |

## 后续页面族与代表检查建议

以下是用户确认样板之后的扩展抽样建议，不属于当前三个正文样板范围。

能力分类/详情代表建议 `/capabilities/plastic-machined-parts/`：同时覆盖实际产品、工艺/材料条件、参数表、原始媒体、询价上下文，适合验证图文叙事及技术阅读。零件详情代表建议 `/machined-parts/gallery/precision-machining-for-functional-plastic-blocks-structural-components/`：完整产品、细节、工程条件、关联阅读及询价身份都齐备。目录代表使用 `/machined-parts/gallery/` 验证35件筛选/URL状态。加工实例补充 `/machined-parts/machining-examples/two-stage-cnc-milling/`，保留同件两个真实装夹之间的基准/验收关系。

推广改版时须保留 catalog 原始身份和35/8内容规模、正式 URL 与188条历史规则、完整二级导航、Resources 5/3分类与15问、图片身份/图注、技术表格和逐单条件、询价上下文与草稿功能。组件改版只修改呈现，不将能力/零件/实例变成库存商品、客户案例或既成交易结果。

## 非正式HTML：预览与错误页

这些文件实际存在于当前构建，全部 noindex，不纳入84个正式页面。

| URL | 类型 / 标题 | 来源 | robots |
| --- | --- | --- | --- |
| `/404.html` | 错误恢复：Page not found  /  LZZ Precision | `src/pages/404.astro` | `noindex, follow` |
| `/content-layout-demo-20261010/` | noindex 预览：LZZ · 内容与排版前后对比 | `src/pages/content-layout-demo-20261010/index.astro` | `noindex, nofollow` |
| `/content-layout-demo-20261010/category/` | noindex 预览：Plastic machining — layout preview  /  LZZ Precision | `src/pages/content-layout-demo-20261010/category.astro` | `noindex, follow` |
| `/content-layout-demo-20261010/detail/` | noindex 预览：Custom machined plastic parts — layout preview  /  LZZ Precision | `src/pages/content-layout-demo-20261010/detail.astro` | `noindex, follow` |
| `/content-layout-demo-20261010/home/` | noindex 预览：Custom CNC machining in Hangzhou — layout preview  /  LZZ Precision | `src/pages/content-layout-demo-20261010/home.astro` | `noindex, follow` |
| `/design-comparison-20261010/direction-a.html` | noindex 预览：LZZ Precision — Custom CNC Machining | `public/design-comparison-20261010/direction-a.html` | `noindex,nofollow` |
| `/design-comparison-20261010/direction-b.html` | noindex 预览：LZZ Precision — Every detail. Made to matter. | `public/design-comparison-20261010/direction-b.html` | `noindex,nofollow` |
| `/design-comparison-20261010/direction-c.html` | noindex 预览：LZZ Precision — Custom CNC Machining | `public/design-comparison-20261010/direction-c.html` | `noindex,nofollow` |
| `/design-comparison-20261010/style-explorer.html` | noindex 预览：LZZ · 三种设计方向对比 | `public/design-comparison-20261010/style-explorer.html` | `noindex,nofollow` |
| `/design-previews/factory-20261016/` | noindex 预览：Factory & quality · 三版设计对照 | `public/design-previews/factory-20261016/index.html` | `noindex,nofollow` |
| `/homepage-directions-20261012/` | noindex 预览：LZZ · 三版首页方向对比 | `src/pages/homepage-directions-20261012/index.astro` | `noindex,nofollow` |
| `/homepage-directions-20261012/a/` | noindex 预览：A — Precision, in focus  /  LZZ homepage preview | `src/pages/homepage-directions-20261012/a.astro` | `noindex,nofollow` |
| `/homepage-directions-20261012/b/` | noindex 预览：B — The material edition  /  LZZ homepage preview | `src/pages/homepage-directions-20261012/b.astro` | `noindex,nofollow` |
| `/homepage-directions-20261012/c/` | noindex 预览：C — Open engineering  /  LZZ homepage preview | `src/pages/homepage-directions-20261012/c.astro` | `noindex,nofollow` |
| `/image-audit-20261012/` | noindex 预览：全站图片与布局 · 前后对比 | `public/image-audit-20261012/index.html` | `noindex,nofollow` |
| `/link-rhythm-20261012/` | noindex 预览：内链与板块节奏 · 本地效果对比 | `public/link-rhythm-20261012/index.html` | `noindex,nofollow` |
| `/preview/home-editorial/` | noindex 预览：Homepage editorial layout preview  /  LZZ Precision | `src/pages/preview/home-editorial.astro` | `noindex, follow` |
| `/visual-directions-20261014/` | noindex 预览：LZZ 首页视觉方向对比 | `src/pages/visual-directions-20261014/index.astro` | `noindex,nofollow` |
| `/visual-directions-20261014/a/` | noindex 预览：Homepage study A: Quiet refinement  /  LZZ Precision | `src/pages/visual-directions-20261014/[direction].astro` | `noindex, follow` |
| `/visual-directions-20261014/b/` | noindex 预览：Homepage study B: Material & craft  /  LZZ Precision | `src/pages/visual-directions-20261014/[direction].astro` | `noindex, follow` |
| `/visual-directions-20261014/c/` | noindex 预览：Homepage study C: Parts in focus  /  LZZ Precision | `src/pages/visual-directions-20261014/[direction].astro` | `noindex, follow` |

## 已构建的兼容/跳转HTML（102 个）

静态 Astro 重定向和手写兼容页都以 noindex 排除。手写零件兼容入口由 `RouteRedirect.astro` 处理 query/hash；配置生成的重定向由 `astro.config.mjs` 读取 `siteRouteRedirects.json`。生产状态须另外验证。

| 历史 URL | 目标 | 来源 |
| --- | --- | --- |
| `/about/company-documents/` | `/about/company-profile/#documents` | `src/pages/about/company-documents.astro` |
| `/cases/` | `/machined-parts/machining-examples/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/cases/29-inch-display-housing-cnc-machining/` | `/machined-parts/machining-examples/29-inch-display-housing-cnc-machining/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/cases/custom-metal-parts-batch-examples/` | `/machined-parts/machining-examples/custom-metal-parts-batch-examples/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/cases/custom-plastic-parts-ptfe-pom-pe-acrylic/` | `/machined-parts/machining-examples/custom-plastic-parts-ptfe-pom-pe-acrylic/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/cases/five-axis-machining-multi-face-parts/` | `/machined-parts/machining-examples/five-axis-machining-multi-face-parts/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/cases/milling-a-pocketed-enclosure-form/` | `/machined-parts/machining-examples/milling-a-pocketed-enclosure-form/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/cases/milling-prismatic-components/` | `/machined-parts/machining-examples/milling-prismatic-components/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/cases/turning-then-milling-cylindrical-parts/` | `/machined-parts/machining-examples/turning-then-milling-cylindrical-parts/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/cases/two-stage-cnc-milling/` | `/machined-parts/machining-examples/two-stage-cnc-milling/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/contact/` | `/about/contact/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/factory/quality/` | `/factory/#quality` | `src/pages/factory/quality.astro` |
| `/factory/workshop/` | `/factory/#workshop` | `src/pages/factory/workshop.astro` |
| `/products/` | `/machined-parts/` | `src/pages/products/index.astro` |
| `/products/custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier/` | `/machined-parts/gallery/custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/products/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/` | `/machined-parts/gallery/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/products/custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier/` | `/machined-parts/gallery/custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/products/custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier/` | `/machined-parts/gallery/custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/products/custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier/` | `/machined-parts/gallery/custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/products/custom-cnc-machined-castings-transmission-housings-pump-bodies/` | `/machined-parts/gallery/custom-cnc-machined-castings-transmission-housings-pump-bodies/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/products/custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier/` | `/machined-parts/gallery/custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/products/custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier/` | `/machined-parts/gallery/custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/products/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/` | `/machined-parts/gallery/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/products/custom-high-precision-machining-for-structural-aesthetic-components-oem/` | `/machined-parts/gallery/custom-high-precision-machining-for-structural-aesthetic-components-oem/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/products/custom-oem-cnc-machined-non-metallic-components-insulating-parts/` | `/machined-parts/gallery/custom-oem-cnc-machined-non-metallic-components-insulating-parts/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/products/custom-oem-cnc-machined-plastic-parts-manufacturer/` | `/machined-parts/gallery/custom-oem-cnc-machined-plastic-parts-manufacturer/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/products/custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer/` | `/machined-parts/gallery/custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/products/custom-oem-cnc-turning-manufacturer/` | `/machined-parts/gallery/custom-oem-cnc-turning-manufacturer/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/products/custom-oem-high-precision-cnc-milling-manufacturer/` | `/machined-parts/gallery/custom-oem-high-precision-cnc-milling-manufacturer/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/products/custom-rotary-cylindrical-components/` | `/machined-parts/gallery/custom-rotary-cylindrical-components/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/products/full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing/` | `/machined-parts/gallery/full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/products/global-manufacturer-of-multi-sided-precision-machined-components/` | `/machined-parts/gallery/global-manufacturer-of-multi-sided-precision-machined-components/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/products/global-oem-precision-machining-solutions/` | `/machined-parts/gallery/global-oem-precision-machining-solutions/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/products/high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem/` | `/machined-parts/gallery/high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/products/high-volume-cnc-turning-for-complex-internal-external-features/` | `/machined-parts/gallery/high-volume-cnc-turning-for-complex-internal-external-features/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/products/machining-studies/` | `/machined-parts/machining-examples/` | `src/pages/products/machining-studies/index.astro` |
| `/products/machining-studies/29-inch-display-housing-cnc-machining/` | `/machined-parts/machining-examples/29-inch-display-housing-cnc-machining/` | `src/pages/products/machining-studies/[slug].astro` |
| `/products/machining-studies/custom-metal-parts-batch-examples/` | `/machined-parts/machining-examples/custom-metal-parts-batch-examples/` | `src/pages/products/machining-studies/[slug].astro` |
| `/products/machining-studies/custom-plastic-parts-ptfe-pom-pe-acrylic/` | `/machined-parts/machining-examples/custom-plastic-parts-ptfe-pom-pe-acrylic/` | `src/pages/products/machining-studies/[slug].astro` |
| `/products/machining-studies/five-axis-machining-multi-face-parts/` | `/machined-parts/machining-examples/five-axis-machining-multi-face-parts/` | `src/pages/products/machining-studies/[slug].astro` |
| `/products/machining-studies/milling-a-pocketed-enclosure-form/` | `/machined-parts/machining-examples/milling-a-pocketed-enclosure-form/` | `src/pages/products/machining-studies/[slug].astro` |
| `/products/machining-studies/milling-prismatic-components/` | `/machined-parts/machining-examples/milling-prismatic-components/` | `src/pages/products/machining-studies/[slug].astro` |
| `/products/machining-studies/turning-then-milling-cylindrical-parts/` | `/machined-parts/machining-examples/turning-then-milling-cylindrical-parts/` | `src/pages/products/machining-studies/[slug].astro` |
| `/products/machining-studies/two-stage-cnc-milling/` | `/machined-parts/machining-examples/two-stage-cnc-milling/` | `src/pages/products/machining-studies/[slug].astro` |
| `/products/oem-precision-cnc-machined-casting-housing-structural-enclosures/` | `/machined-parts/gallery/oem-precision-cnc-machined-casting-housing-structural-enclosures/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/products/oem-precision-cnc-machined-casting-housings/` | `/machined-parts/gallery/oem-precision-cnc-machined-casting-housings/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/products/part-examples/` | `/machined-parts/gallery/` | `src/pages/products/part-examples/index.astro` |
| `/products/part-examples/custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier/` | `/machined-parts/gallery/custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier/` | `src/pages/products/part-examples/[slug].astro` |
| `/products/part-examples/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/` | `/machined-parts/gallery/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/` | `src/pages/products/part-examples/[slug].astro` |
| `/products/part-examples/custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier/` | `/machined-parts/gallery/custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier/` | `src/pages/products/part-examples/[slug].astro` |
| `/products/part-examples/custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier/` | `/machined-parts/gallery/custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier/` | `src/pages/products/part-examples/[slug].astro` |
| `/products/part-examples/custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier/` | `/machined-parts/gallery/custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier/` | `src/pages/products/part-examples/[slug].astro` |
| `/products/part-examples/custom-cnc-machined-castings-transmission-housings-pump-bodies/` | `/machined-parts/gallery/custom-cnc-machined-castings-transmission-housings-pump-bodies/` | `src/pages/products/part-examples/[slug].astro` |
| `/products/part-examples/custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier/` | `/machined-parts/gallery/custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier/` | `src/pages/products/part-examples/[slug].astro` |
| `/products/part-examples/custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier/` | `/machined-parts/gallery/custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier/` | `src/pages/products/part-examples/[slug].astro` |
| `/products/part-examples/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/` | `/machined-parts/gallery/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/` | `src/pages/products/part-examples/[slug].astro` |
| `/products/part-examples/custom-high-precision-machining-for-structural-aesthetic-components-oem/` | `/machined-parts/gallery/custom-high-precision-machining-for-structural-aesthetic-components-oem/` | `src/pages/products/part-examples/[slug].astro` |
| `/products/part-examples/custom-oem-cnc-machined-non-metallic-components-insulating-parts/` | `/machined-parts/gallery/custom-oem-cnc-machined-non-metallic-components-insulating-parts/` | `src/pages/products/part-examples/[slug].astro` |
| `/products/part-examples/custom-oem-cnc-machined-plastic-parts-manufacturer/` | `/machined-parts/gallery/custom-oem-cnc-machined-plastic-parts-manufacturer/` | `src/pages/products/part-examples/[slug].astro` |
| `/products/part-examples/custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer/` | `/machined-parts/gallery/custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer/` | `src/pages/products/part-examples/[slug].astro` |
| `/products/part-examples/custom-oem-cnc-turning-manufacturer/` | `/machined-parts/gallery/custom-oem-cnc-turning-manufacturer/` | `src/pages/products/part-examples/[slug].astro` |
| `/products/part-examples/custom-oem-high-precision-cnc-milling-manufacturer/` | `/machined-parts/gallery/custom-oem-high-precision-cnc-milling-manufacturer/` | `src/pages/products/part-examples/[slug].astro` |
| `/products/part-examples/custom-rotary-cylindrical-components/` | `/machined-parts/gallery/custom-rotary-cylindrical-components/` | `src/pages/products/part-examples/[slug].astro` |
| `/products/part-examples/full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing/` | `/machined-parts/gallery/full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing/` | `src/pages/products/part-examples/[slug].astro` |
| `/products/part-examples/global-manufacturer-of-multi-sided-precision-machined-components/` | `/machined-parts/gallery/global-manufacturer-of-multi-sided-precision-machined-components/` | `src/pages/products/part-examples/[slug].astro` |
| `/products/part-examples/global-oem-precision-machining-solutions/` | `/machined-parts/gallery/global-oem-precision-machining-solutions/` | `src/pages/products/part-examples/[slug].astro` |
| `/products/part-examples/high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem/` | `/machined-parts/gallery/high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem/` | `src/pages/products/part-examples/[slug].astro` |
| `/products/part-examples/high-volume-cnc-turning-for-complex-internal-external-features/` | `/machined-parts/gallery/high-volume-cnc-turning-for-complex-internal-external-features/` | `src/pages/products/part-examples/[slug].astro` |
| `/products/part-examples/oem-precision-cnc-machined-casting-housing-structural-enclosures/` | `/machined-parts/gallery/oem-precision-cnc-machined-casting-housing-structural-enclosures/` | `src/pages/products/part-examples/[slug].astro` |
| `/products/part-examples/oem-precision-cnc-machined-casting-housings/` | `/machined-parts/gallery/oem-precision-cnc-machined-casting-housings/` | `src/pages/products/part-examples/[slug].astro` |
| `/products/part-examples/precision-cnc-machined-castings-custom-oem-housings/` | `/machined-parts/gallery/precision-cnc-machined-castings-custom-oem-housings/` | `src/pages/products/part-examples/[slug].astro` |
| `/products/part-examples/precision-cnc-machined-castings-manufacturer/` | `/machined-parts/gallery/precision-cnc-machined-castings-manufacturer/` | `src/pages/products/part-examples/[slug].astro` |
| `/products/part-examples/precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances/` | `/machined-parts/gallery/precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances/` | `src/pages/products/part-examples/[slug].astro` |
| `/products/part-examples/precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier/` | `/machined-parts/gallery/precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier/` | `src/pages/products/part-examples/[slug].astro` |
| `/products/part-examples/precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier/` | `/machined-parts/gallery/precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier/` | `src/pages/products/part-examples/[slug].astro` |
| `/products/part-examples/precision-machining-for-functional-plastic-blocks-structural-components/` | `/machined-parts/gallery/precision-machining-for-functional-plastic-blocks-structural-components/` | `src/pages/products/part-examples/[slug].astro` |
| `/products/part-examples/precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures/` | `/machined-parts/gallery/precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures/` | `src/pages/products/part-examples/[slug].astro` |
| `/products/part-examples/precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier/` | `/machined-parts/gallery/precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier/` | `src/pages/products/part-examples/[slug].astro` |
| `/products/part-examples/precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier/` | `/machined-parts/gallery/precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier/` | `src/pages/products/part-examples/[slug].astro` |
| `/products/part-examples/small-batch-cnc-machining-manufacturer-complex-aluminum-housings/` | `/machined-parts/gallery/small-batch-cnc-machining-manufacturer-complex-aluminum-housings/` | `src/pages/products/part-examples/[slug].astro` |
| `/products/part-examples/small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv/` | `/machined-parts/gallery/small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv/` | `src/pages/products/part-examples/[slug].astro` |
| `/products/part-examples/ultra-high-precision-machining-services/` | `/machined-parts/gallery/ultra-high-precision-machining-services/` | `src/pages/products/part-examples/[slug].astro` |
| `/products/precision-cnc-machined-castings-custom-oem-housings/` | `/machined-parts/gallery/precision-cnc-machined-castings-custom-oem-housings/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/products/precision-cnc-machined-castings-manufacturer/` | `/machined-parts/gallery/precision-cnc-machined-castings-manufacturer/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/products/precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances/` | `/machined-parts/gallery/precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/products/precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier/` | `/machined-parts/gallery/precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/products/precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier/` | `/machined-parts/gallery/precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/products/precision-machining-for-functional-plastic-blocks-structural-components/` | `/machined-parts/gallery/precision-machining-for-functional-plastic-blocks-structural-components/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/products/precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures/` | `/machined-parts/gallery/precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/products/precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier/` | `/machined-parts/gallery/precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/products/precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier/` | `/machined-parts/gallery/precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/products/small-batch-cnc-machining-manufacturer-complex-aluminum-housings/` | `/machined-parts/gallery/small-batch-cnc-machining-manufacturer-complex-aluminum-housings/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/products/small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv/` | `/machined-parts/gallery/small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/products/ultra-high-precision-machining-services/` | `/machined-parts/gallery/ultra-high-precision-machining-services/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/quality/` | `/factory/#quality` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/resources/australian-customer-workshop-visit-january-2025/` | `/about/company-news/australian-customer-workshop-visit-january-2025/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/resources/china-africa-west-lake-summit-2025/` | `/about/company-news/china-africa-west-lake-summit-2025/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/resources/company-news/` | `/about/company-news/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/resources/how-we-work/` | `/about/how-we-work/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/resources/lzz-team-outing-2024/` | `/about/company-news/lzz-team-outing-2024/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/resources/may-2025-lzz-team-outing/` | `/about/company-news/may-2025-lzz-team-outing/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |
| `/resources/november-2025-hangzhou-lizhizao-group-activity/` | `/about/company-news/november-2025-hangzhou-lizhizao-group-activity/` | `astro.config.mjs + src/data/siteRouteRedirects.json` |

## 仅存在于托管规则的历史入口（86 条）

以下来源于 `scripts/build-seo.mjs` 对 catalog 与只读原站 sitemap/page-manifest 的完整映射，当前没有独立HTML。配置目标均为现有正式页或其锚点。本文件仅记录规则，不宣称托管服务器已执行。

| 来源路径 | 目标 | 配置状态 |
| --- | --- | --- |
| `/about` | `/about/` | 301 托管规则，未现场HTTP验证 |
| `/article` | `/resources/` | 301 托管规则，未现场HTTP验证 |
| `/article-category/Company-Information` | `/resources/` | 301 托管规则，未现场HTTP验证 |
| `/article-category/Product-Information` | `/resources/` | 301 托管规则，未现场HTTP验证 |
| `/article/category/Company-Information` | `/resources/` | 301 托管规则，未现场HTTP验证 |
| `/article/category/Product-Information` | `/resources/` | 301 托管规则，未现场HTTP验证 |
| `/article/Custom-CNC-Machined-Components-for-Prototypes-and-Production` | `/resources/technical-guides/critical-features-cnc-drawing/` | 301 托管规则，未现场HTTP验证 |
| `/article/November-2025:-Hangzhou-Lizhizao-Group-Activity` | `/about/company-news/november-2025-hangzhou-lizhizao-group-activity/` | 301 托管规则，未现场HTTP验证 |
| `/contact` | `/about/contact/` | 301 托管规则，未现场HTTP验证 |
| `/custom/advantage` | `/about/company-profile/` | 301 托管规则，未现场HTTP验证 |
| `/custom/download` | `/about/company-profile/#documents` | 301 托管规则，未现场HTTP验证 |
| `/custom/factory` | `/factory/` | 301 托管规则，未现场HTTP验证 |
| `/product` | `/machined-parts/gallery/` | 301 托管规则，未现场HTTP验证 |
| `/product-category/5-Axis-CNC-Machining` | `/capabilities/5-axis-cnc-machining/` | 301 托管规则，未现场HTTP验证 |
| `/product-category/Aluminum-CNC-Parts` | `/capabilities/aluminum-cnc-parts/` | 301 托管规则，未现场HTTP验证 |
| `/product-category/Casting-Machining` | `/capabilities/casting-machining/` | 301 托管规则，未现场HTTP验证 |
| `/product-category/CNC-Milling-Service` | `/capabilities/cnc-milling-service/` | 301 托管规则，未现场HTTP验证 |
| `/product-category/CNC-Turning-Service` | `/capabilities/cnc-turning-service/` | 301 托管规则，未现场HTTP验证 |
| `/product-category/Copper-Brass-CNC-Parts` | `/capabilities/copper-brass-cnc-parts/` | 301 托管规则，未现场HTTP验证 |
| `/product-category/Low-Volume-Production` | `/capabilities/low-volume-production/` | 301 托管规则，未现场HTTP验证 |
| `/product-category/Plastic-Machined-Parts` | `/capabilities/plastic-machined-parts/` | 301 托管规则，未现场HTTP验证 |
| `/product-category/Prototype-Machining` | `/capabilities/prototype-machining/` | 301 托管规则，未现场HTTP验证 |
| `/product-category/Stainless-Steel-CNC-Parts` | `/capabilities/stainless-steel-cnc-parts/` | 301 托管规则，未现场HTTP验证 |
| `/product/10031201` | `/machined-parts/gallery/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/` | 301 托管规则，未现场HTTP验证 |
| `/product/10031202` | `/machined-parts/gallery/custom-oem-high-precision-cnc-milling-manufacturer/` | 301 托管规则，未现场HTTP验证 |
| `/product/10031204` | `/machined-parts/gallery/ultra-high-precision-machining-services/` | 301 托管规则，未现场HTTP验证 |
| `/product/10031206` | `/machined-parts/gallery/global-oem-precision-machining-solutions/` | 301 托管规则，未现场HTTP验证 |
| `/product/10031207` | `/machined-parts/gallery/global-manufacturer-of-multi-sided-precision-machined-components/` | 301 托管规则，未现场HTTP验证 |
| `/product/10031208` | `/machined-parts/gallery/custom-oem-cnc-turning-manufacturer/` | 301 托管规则，未现场HTTP验证 |
| `/product/10031209` | `/machined-parts/gallery/custom-rotary-cylindrical-components/` | 301 托管规则，未现场HTTP验证 |
| `/product/10031210` | `/machined-parts/gallery/custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer/` | 301 托管规则，未现场HTTP验证 |
| `/product/10031213` | `/machined-parts/gallery/full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing/` | 301 托管规则，未现场HTTP验证 |
| `/product/10031214` | `/machined-parts/gallery/custom-high-precision-machining-for-structural-aesthetic-components-oem/` | 301 托管规则，未现场HTTP验证 |
| `/product/10031215` | `/machined-parts/gallery/high-volume-cnc-turning-for-complex-internal-external-features/` | 301 托管规则，未现场HTTP验证 |
| `/product/10031216` | `/machined-parts/gallery/high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem/` | 301 托管规则，未现场HTTP验证 |
| `/product/10031242` | `/machined-parts/gallery/custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier/` | 301 托管规则，未现场HTTP验证 |
| `/product/10031243` | `/machined-parts/gallery/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/` | 301 托管规则，未现场HTTP验证 |
| `/product/10031244` | `/machined-parts/gallery/custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier/` | 301 托管规则，未现场HTTP验证 |
| `/product/10031245` | `/machined-parts/gallery/custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier/` | 301 托管规则，未现场HTTP验证 |
| `/product/10031246` | `/machined-parts/gallery/custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier/` | 301 托管规则，未现场HTTP验证 |
| `/product/10031247` | `/machined-parts/gallery/custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier/` | 301 托管规则，未现场HTTP验证 |
| `/product/category/5-Axis-CNC-Machining` | `/capabilities/5-axis-cnc-machining/` | 301 托管规则，未现场HTTP验证 |
| `/product/category/Aluminum-CNC-Parts` | `/capabilities/aluminum-cnc-parts/` | 301 托管规则，未现场HTTP验证 |
| `/product/category/Casting-Machining` | `/capabilities/casting-machining/` | 301 托管规则，未现场HTTP验证 |
| `/product/category/CNC-Milling-Service` | `/capabilities/cnc-milling-service/` | 301 托管规则，未现场HTTP验证 |
| `/product/category/CNC-Turning-Service` | `/capabilities/cnc-turning-service/` | 301 托管规则，未现场HTTP验证 |
| `/product/category/Copper-Brass-CNC-Parts` | `/capabilities/copper-brass-cnc-parts/` | 301 托管规则，未现场HTTP验证 |
| `/product/category/Low-Volume-Production` | `/capabilities/low-volume-production/` | 301 托管规则，未现场HTTP验证 |
| `/product/category/Plastic-Machined-Parts` | `/capabilities/plastic-machined-parts/` | 301 托管规则，未现场HTTP验证 |
| `/product/category/Prototype-Machining` | `/capabilities/prototype-machining/` | 301 托管规则，未现场HTTP验证 |
| `/product/category/Stainless-Steel-CNC-Parts` | `/capabilities/stainless-steel-cnc-parts/` | 301 托管规则，未现场HTTP验证 |
| `/product/Custom-Automotive-Performance-Parts-Manufacturer-and-Aluminum-Intercooler-Prototype-Supplier` | `/machined-parts/gallery/custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier/` | 301 托管规则，未现场HTTP验证 |
| `/product/Custom-Billet-Aluminum-Engine-Cover-Manufacturer-and-Automotive-Prototype-Supplier` | `/machined-parts/gallery/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/` | 301 托管规则，未现场HTTP验证 |
| `/product/Custom-Billet-Aluminum-Intake-Manifold-Manufacturer-and-Automotive-Prototype-Supplier` | `/machined-parts/gallery/custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier/` | 301 托管规则，未现场HTTP验证 |
| `/product/Custom-Billet-Aluminum-Intake-Plenum-Manufacturer-and-High-Performance-Tuning-Parts-Supplier` | `/machined-parts/gallery/custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier/` | 301 托管规则，未现场HTTP验证 |
| `/product/Custom-Billet-Intake-Manifold-Manufacturer-and-Automotive-Performance-Prototype-Supplier` | `/machined-parts/gallery/custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier/` | 301 托管规则，未现场HTTP验证 |
| `/product/Custom-CNC-Machined-Castings-Transmission-Housings-Pump-Bodies` | `/machined-parts/gallery/custom-cnc-machined-castings-transmission-housings-pump-bodies/` | 301 托管规则，未现场HTTP验证 |
| `/product/Custom-CNC-Machined-Electronic-Throttle-Body-Manufacturer-and-Automotive-Prototype-Supplier` | `/machined-parts/gallery/custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier/` | 301 托管规则，未现场HTTP验证 |
| `/product/Custom-CNC-Turned-Stainless-Steel-Components-Manufacturer-and-Precision-Shaft-Supplier` | `/machined-parts/gallery/custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier/` | 301 托管规则，未现场HTTP验证 |
| `/product/Custom-High-Precision-CNC-Milling-5-Axis-Machining-Services-OEM-ODM` | `/machined-parts/gallery/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/` | 301 托管规则，未现场HTTP验证 |
| `/product/Custom-High-Precision-Machining-for-Structural-Aesthetic-Components-OEM` | `/machined-parts/gallery/custom-high-precision-machining-for-structural-aesthetic-components-oem/` | 301 托管规则，未现场HTTP验证 |
| `/product/Custom-OEM-CNC-Machined-Non-Metallic-Components-Insulating-Parts` | `/machined-parts/gallery/custom-oem-cnc-machined-non-metallic-components-insulating-parts/` | 301 托管规则，未现场HTTP验证 |
| `/product/Custom-OEM-CNC-Machined-Plastic-Parts-Manufacturer` | `/machined-parts/gallery/custom-oem-cnc-machined-plastic-parts-manufacturer/` | 301 托管规则，未现场HTTP验证 |
| `/product/Custom-OEM-CNC-Turned-Fittings-Connectors-and-Flanges-Manufacturer` | `/machined-parts/gallery/custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer/` | 301 托管规则，未现场HTTP验证 |
| `/product/Custom-OEM-CNC-Turning-Manufacturer` | `/machined-parts/gallery/custom-oem-cnc-turning-manufacturer/` | 301 托管规则，未现场HTTP验证 |
| `/product/Custom-OEM-High-Precision-CNC-Milling-Manufacturer` | `/machined-parts/gallery/custom-oem-high-precision-cnc-milling-manufacturer/` | 301 托管规则，未现场HTTP验证 |
| `/product/Custom-Rotary-Cylindrical-Components` | `/machined-parts/gallery/custom-rotary-cylindrical-components/` | 301 托管规则，未现场HTTP验证 |
| `/product/Full-Service-CNC-Milling-Solutions-Custom-Metal-Parts-Manufacturer-with-Finishing` | `/machined-parts/gallery/full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing/` | 301 托管规则，未现场HTTP验证 |
| `/product/Global-Manufacturer-of-Multi-Sided-Precision-Machined-Components` | `/machined-parts/gallery/global-manufacturer-of-multi-sided-precision-machined-components/` | 301 托管规则，未现场HTTP验证 |
| `/product/Global-OEM-Precision-Machining-Solutions` | `/machined-parts/gallery/global-oem-precision-machining-solutions/` | 301 托管规则，未现场HTTP验证 |
| `/product/High-Reliability-Precision-Machining-Turbine-Fluid-Complex-Curve-Component-OEM` | `/machined-parts/gallery/high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem/` | 301 托管规则，未现场HTTP验证 |
| `/product/High-Volume-CNC-Turning-for-Complex-Internal-External-Features` | `/machined-parts/gallery/high-volume-cnc-turning-for-complex-internal-external-features/` | 301 托管规则，未现场HTTP验证 |
| `/product/OEM-Precision-CNC-Machined-Casting-Housing-Structural-Enclosures` | `/machined-parts/gallery/oem-precision-cnc-machined-casting-housing-structural-enclosures/` | 301 托管规则，未现场HTTP验证 |
| `/product/OEM-Precision-CNC-Machined-Casting-Housings` | `/machined-parts/gallery/oem-precision-cnc-machined-casting-housings/` | 301 托管规则，未现场HTTP验证 |
| `/product/Precision-CNC-Machined-Castings-Custom-OEM-Housings` | `/machined-parts/gallery/precision-cnc-machined-castings-custom-oem-housings/` | 301 托管规则，未现场HTTP验证 |
| `/product/Precision-CNC-Machined-Castings-Manufacturer` | `/machined-parts/gallery/precision-cnc-machined-castings-manufacturer/` | 301 托管规则，未现场HTTP验证 |
| `/product/Precision-CNC-Machining-for-Complex-Plastic-Geometries-and-Tight-Tolerances` | `/machined-parts/gallery/precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances/` | 301 托管规则，未现场HTTP验证 |
| `/product/Precision-CNC-Turned-Brass-Components-Manufacturer-and-Copper-Parts-Supplier` | `/machined-parts/gallery/precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier/` | 301 托管规则，未现场HTTP验证 |
| `/product/Precision-Low-Volume-CNC-Machining-Manufacturer-and-HMLV-Components-Supplier` | `/machined-parts/gallery/precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier/` | 301 托管规则，未现场HTTP验证 |
| `/product/Precision-Machining-for-Functional-Plastic-Blocks-Structural-Components` | `/machined-parts/gallery/precision-machining-for-functional-plastic-blocks-structural-components/` | 301 托管规则，未现场HTTP验证 |
| `/product/Precision-Small-Batch-CNC-Milling-Manufacturer-for-Complex-Aluminum-Enclosures` | `/machined-parts/gallery/precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures/` | 301 托管规则，未现场HTTP验证 |
| `/product/Precision-Stainless-Steel-CNC-Turned-Parts-Manufacturer-and-316L-Components-Supplier` | `/machined-parts/gallery/precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier/` | 301 托管规则，未现场HTTP验证 |
| `/product/Precision-Stainless-Steel-Indexing-Plunger-Manufacturer-and-Spring-Loaded-Locking-Pin-Supplier` | `/machined-parts/gallery/precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier/` | 301 托管规则，未现场HTTP验证 |
| `/product/Small-Batch-CNC-Machining-Manufacturer-Complex-Aluminum-Housings` | `/machined-parts/gallery/small-batch-cnc-machining-manufacturer-complex-aluminum-housings/` | 301 托管规则，未现场HTTP验证 |
| `/product/Small-Batch-CNC-Machining-Manufacturer-Precision-Aluminum-Components-HMLV` | `/machined-parts/gallery/small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv/` | 301 托管规则，未现场HTTP验证 |
| `/product/Ultra-High-Precision-Machining-Services` | `/machined-parts/gallery/ultra-high-precision-machining-services/` | 301 托管规则，未现场HTTP验证 |

## 可复查证据

本地路径：`src/pages/`、`src/data/siteSections.ts`、`src/data/siteRouteRedirects.json`、`src/data/resourceRoutes.json`、`src/data/catalog.json`、`src/components/CapabilityRedesign.astro`、`src/data/redesignRollout.ts`、`src/layouts/Layout.astro`、`src/components/QuoteForm.tsx`、`src/lib/inquiryDraft.ts`、`scripts/build-seo.mjs`、`dist/sitemap.xml`、`dist/_redirects`。

本盘点未改动业务代码、DESIGN.md、原始资料或其他现有文档。现有构建未经本任务重新运行；后续页面改动应更新构建并按原URL/导航/内容身份重新比对，本快照保留为改版前参考。

## 既有视频索引

来源登记为 `src/data/additionalMedia.generated.json` 的 `videos`，下列 7 个 MP4 及 poster 文件已存在。尺寸与时长来自现有媒体登记，原始资料相对目录与 SHA256 同文件可查。本轮核对了文件与登记，没有逐帧重审、剪辑或在三个样板中新增播放模块；不将“有视频文件”视作新主视觉或工艺证据已经验收。

| 文件（public/media/source-details/） | 登记尺寸 | 时长约 | 原始资料目录 |
| --- | --- | ---: | --- |
| `display-housing.mp4` | 720×1280 | 18.45s | `20250108-29寸显示屏外壳/` |
| `peek-parts.mp4` | 544×960 | 3.37s | `20250108PEEK材质加工好的零件成品视频/` |
| `plastic-pe-guides.mp4` | 540×960 | 6.87s | `20251201塑料制品零件/PE材质的导条.mp4` |
| `plastic-pom-gears.mp4` | 720×1280 | 5.68s | `20251201塑料制品零件/POM齿轮制作.mp4` |
| `plastic-ptfe-parts.mp4` | 1280×720 | 18.04s | `20251201塑料制品零件/PTFE 特氟龙产品.mp4` |
| `plastic-acrylic-parts.mp4` | 720×1280 | 7.15s | `20251201塑料制品零件/亚克力产品/` |
| `metal-cleaned-parts.mp4` | 360×640 | 47.57s | `20251201/批量铝件清洗完毕.mp4` |

后续优先在对应显示壳体 / 塑料 / 实例页核对内容后使用，保留原始身份、视频控件与 poster。不能把竖屏成品记录放大裁切为通用首页的切削过程，或由清洗画面推定订单数量、出货和检测结果。
