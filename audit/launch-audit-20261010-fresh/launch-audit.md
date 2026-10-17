# LZZ 主站上线前独立审计 · 2026-10-10

**结论：Conditional Go。** 当前主站足以让首次到访的海外买家找到相近加工例项、理解来图定制范围并准备有效 RFQ；它还不足以让严格采购方独立完成供应商资格、实测能力和合同条件审批。优先修移动询价来源，并核实现行 ISO 与业务接单责任；真实尺寸、报告、付款条件须企业提供。未发现已证实的本地技术上线阻断，不给综合评分。

**当前网站与企业资料所示的业务定位。** 杭州力智造精密机械有限公司 / Hangzhou Lizhizao Precision Machinery Co., Ltd.，2017 成立；英文主站，定制 CNC 零件加工，按图纸/模型/样件讨论 OEM/ODM。五核心服务是铣削、车削、五轴、塑料加工、铸件二次加工；材料与原型/小批量入口合计形成 10 个分类，35 个例项不是库存标准品。网站面向需要机械零件的海外工程、采购、原型及小批量团队；仪器、工业设备、汽车等用途是讨论范围。具体优先国家、行业收入结构、行业准入资格与现有客户名单**待确认**，不能由英文或图片推定。

本报告所有页面路径以 **B = http://127.0.0.1:4326** 为当前构建预览；浏览取证同时使用 4323。正式 canonical 为 https://www.lzz-cnc.com，但本次没有访问线上部署。源码根是 **D:\lzz\lzz\_react**。只读当前主站、当前源文件与原始资料；没有使用 memory、旧审计/评分或独立设计 Demo，没有修改业务源码、部署或发送询价。图片只看页面布局和明确图文说明，未评价生成、真实性或质量。

**5 个最严重的采购问题（按影响排序；前四项是证据/政策缺口，不是已认定虚假）。**

|问题|页面证据|采购影响|整改方向|
|---|---|---|---|
|1. ISO 自述不能独立核验|[Quality](http://127.0.0.1:4326/quality/#quality-management) 明写 ISO 9001-certified，但编号、机构、有效期、范围 available on request；About 的认定文件明确与 ISO 分开|质量体系准入仍须邮件往返；现行认证状态尚未独立核验|企业提供当前证书及验证渠道，确认主体/场地/范围；公开允许披露的关键字段或受控下载。若企业不能确认现行认证，先调整确定性声明|
|2. 检验过程有说明，实测证据缺失|[Quality](http://127.0.0.1:4326/quality/#order-documentation) 只有明确标注“no results”的空表，并明写没有公开客户报告或测量结果；[29-inch study](http://127.0.0.1:4326/cases/29-inch-display-housing-cnc-machining/) 是工艺讨论|能理解如何验收，不能独立判断某类关键尺寸的实际执行记录|优先一份获准公开的脱敏真实首件/尺寸报告，关联图纸版本、特征、方法、结果；暂不能公开就保留空表边界，提供索取真实样例入口|
|3. 加工范围仍需逐件问询|[Factory](http://127.0.0.1:4326/factory/#equipment) 公开设备族；[5-axis](http://127.0.0.1:4326/capabilities/5-axis-cnc-machining/#size-and-setup-review) 明说 travel、load、maximum part envelope 未公开|大型、重件或复杂装夹买家难以快速排除不适合供应商|企业确认代表设备、工作范围、夹具/负载条件、适用范围；公开可核实范围，继续保留按模型审查。定制例项不应被强行补成固定尺寸 SKU|
|4. 付款、样品费用与保修条件没有公开答案|[How We Work](http://127.0.0.1:4326/resources/how-we-work/#quotation-scope) 说明报价、审批、问题提交与纠正流程；[FAQ](http://127.0.0.1:4326/resources/faq/) 未答付款节点、样品收费、现行保修期限|初次采购的预算与风险审批信息不足|企业确认可公开政策；新增简短 FAQ，区分常规条件与报价逐单确认。已有不合格品流程应保留，不能直接套旧营销的六个月保修|
|5. 移动顶部询价丢失产品上下文|[Stainless product](http://127.0.0.1:4326/products/precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier/) 390×844：顶部 Request a Quote → /quote/；带 product/source 的按钮 top≈1554px。实际点击顶部后无 Inquiry reference；点击产品按钮正常|已选零件买家需重新解释例项；越早点击越容易丢失来源|将产品/分类 quoteHref 传入顶部 CTA，并把带来源按钮放到标题与简短说明后；保留底部入口|

**10 个最值得修改的页面或模块。** 按本轮已发现的采购影响严重程度排列；英文仅为结构/文案示例，涉及事实的数据必须核实后填入。

1. **Quality 供应商资格（P1，需真实资料）**  
   URL：[Quality qualification](http://127.0.0.1:4326/quality/#quality-management)、[About documents](http://127.0.0.1:4326/about/#documents)。文件：[quality.astro:69](D:/lzz/lzz/_react/src/pages/quality.astro:69)、[CompanyDocuments.astro](D:/lzz/lzz/_react/src/components/CompanyDocuments.astro)、[faq.astro:20](D:/lzz/lzz/_react/src/pages/resources/faq.astro:20)。**保留**ISO 与企业认定分开、要求核对主体/范围的说明。**缺答案**现行编号/机构/日期/范围。**操作/顺序**主体 → 当前证书字段/验证 → 认定资料 → 索取包；标题 `Supplier qualification documents`。例：`Request the current certificate and scope for your supplier file.` **资料**现行证书、企业批准的披露范围、主体英文映射。**内链/CTA**About、FAQ、Quote 都指向统一模块，索取时带 `Supplier qualification` 主题。**验收**所有 ISO 口径与同一原件一致；编号和有效期可复核；奖项不充当 ISO；未获原件不擅写字段。

2. **Quality 检验记录 + 一条实测案例（P1，需真实资料）**  
   URL：[Quality records](http://127.0.0.1:4326/quality/#order-documentation)、[display housing study](http://127.0.0.1:4326/cases/29-inch-display-housing-cnc-machining/)。文件：[quality.astro:42](D:/lzz/lzz/_react/src/pages/quality.astro:42)、[cases.ts](D:/lzz/lzz/_react/src/data/cases.ts)、[cases/[slug].astro](D:/lzz/lzz/_react/src/pages/cases/[slug].astro)。**保留**空表明确无结果、检查阶段、当前案例的工艺讨论边界。**缺答案**具体记录如何与图纸/批次闭环。**操作/顺序**记录用途 → 脱敏真实样例 → 字段解释 → 报价要求；标题 `An example of an agreed inspection record`。例：`Results apply only to the identified part and drawing revision.` **资料**获准披露的图纸片段、特征/限值、方法、日期、结果、签核及脱敏授权；不要编结果。**内链/CTA**例项/案例链接记录，`Request a sample report format`。**验收**每个结果可追溯，未扩写成全产品公差保证；若暂无资料，仅新增索取入口，不把空表改称报告。

3. **Factory 与五轴加工范围（P1，需真实资料）**  
   URL：[Factory equipment](http://127.0.0.1:4326/factory/#equipment)、[5-axis size review](http://127.0.0.1:4326/capabilities/5-axis-cnc-machining/#size-and-setup-review)。文件：[factory.astro:20](D:/lzz/lzz/_react/src/pages/factory.astro:20)、[capabilities/[slug].astro:74](D:/lzz/lzz/_react/src/pages/capabilities/[slug].astro:74)、[capabilityOverview.ts](D:/lzz/lzz/_react/src/data/capabilityOverview.ts)。**保留**40+ CNC、1500m²、参考产能条件及模型审查。**缺答案**机型/旅行范围/负载/装夹限制；不由轴数推最大零件。**操作/顺序**设备族 → 代表设备与有条件范围 → 输入清单 → 个件审查；标题 `Part size and setup review`。例：`Confirm stock size, part weight and clamping clearance with your model.` **资料**企业确认设备清单、参数与适用条件。**内链/CTA**工厂↔相应能力页，询价保留服务来源。**验收**数字有来源和复核日期；设备行程与可加工零件尺寸明确区分；不能核实的继续写待审查。

4. **How We Work / FAQ 商业条件（P1，需企业政策）**  
   URL：[quotation scope](http://127.0.0.1:4326/resources/how-we-work/#quotation-scope)、[FAQ ordering](http://127.0.0.1:4326/resources/faq/#ordering)。文件：[HowWeWork.astro:13](D:/lzz/lzz/_react/src/components/HowWeWork.astro:13)、[faq.astro:7](D:/lzz/lzz/_react/src/pages/resources/faq.astro:7)、[resourceDeliverySections.ts:1](D:/lzz/lzz/_react/src/data/resourceDeliverySections.ts:1)。**保留**1件、7–14工作日含表面处理、运输另计、审批和纠正流程；这些有 2026-09-28 公司确认，不判无源。**缺答案**支付方式/节点、样品费及运费、保修适用范围。**操作/顺序**报价范围 → 样品/付款 → 批次验收 → 异常补救；标题 `Commercial terms to confirm before ordering`。例：`Your quotation records payment stages, sample charges and agreed remedies.` **资料**现行业务政策与报价模板；网页建设合同不是采购合同。**内链/CTA**Quote 的 Before you order 深链此处。**验收**关键政策有负责人确认，FAQ与报价口径一致；不能统一的写逐单确认，不承诺免费样品/统一退款。

5. **产品/分类顶部询价（P1，现有资料可改）**  
   URL：[不锈钢例项](http://127.0.0.1:4326/products/precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier/)，同模板 35 产品及 10 分类。文件：[Layout.astro:87](D:/lzz/lzz/_react/src/layouts/Layout.astro:87)、[products/[slug].astro:27](D:/lzz/lzz/_react/src/pages/products/[slug].astro:27)、[capabilities/[slug].astro:32](D:/lzz/lzz/_react/src/pages/capabilities/[slug].astro:32)。**保留**产品自己的 quoteHref、来源校验、底部 RFQ。**证据**见问题5。**操作/顺序**标题 → 用途/关键复核 → 带来源 CTA → 图文与细节；顶部接收同一 quoteHref。例：`Discuss this part` / `Attach your drawing in your email app.` **资料**无需新增。**内链/CTA**使用已有 inquiryHref，首页仍为通用询价。**验收**390px 产品和分类顶部点击后 reference、ID、source 一致；准备草稿仍包含来源；通用页不误带上次产品。

6. **Quote 发送后接单说明（P1，需少量企业确认）**  
   URL：[Quote](http://127.0.0.1:4326/quote/)。文件：[quote.astro](D:/lzz/lzz/_react/src/pages/quote.astro)、[QuoteForm.tsx:139](D:/lzz/lzz/_react/src/components/QuoteForm.tsx:139)。**保留**明确“prepared — not sent”、收件人/主题、附件提醒、webmail步骤、错误提示、复制/保存/编辑。**证据/缺答案**当前本地草稿完成，不自动外发是正确说明；缺客户发送后的处理顺序/责任。**操作/顺序**准备 → 核对 → 邮箱发送 → 公司下一步；标题 `After you send your email`。例：`We review the drawing package and clarify open requirements before confirming the quotation.` **资料**接单负责人、真实营业时段及可承诺响应机制；不先写24小时承诺。**内链/CTA**给发信失败的直接邮箱/Contact与NDA入口。**验收**仍不把准备草稿称已提交；来源完整，必填/邮箱错误清晰；企业确认有人负责所列渠道。邮件实际交付另行授权测试。

7. **Contact 资料索取与访问入口（P2，需企业接单确认）**  
   URL：[Contact](http://127.0.0.1:4326/contact/)。文件：[contact.astro:10](D:/lzz/lzz/_react/src/pages/contact.astro:10)、[Layout.astro:101](D:/lzz/lzz/_react/src/layouts/Layout.astro:101)。**保留**统一邮箱/WhatsApp、UTC+8、完整主体与地址、现场访问需预约。**缺答案**资质、校准、NDA由谁处理。**操作/顺序**询价 → 供应商资料 → 访问预约 → 地址；标题 `Request supplier documents`。例：`Tell us which certificate, inspection or confidentiality documents your supplier review requires.` **资料**业务负责人及可发文件清单。**内链/CTA**三个明确任务入口，文件索取带主题，关联Quality。**验收**买家一跳能进入相应询价/说明，联系方式全站一致；不公布未经批准联系人或响应时限。

8. **首页早期采购导览（P2，现有内容可改）**  
   URL：[Home](http://127.0.0.1:4326/)、[Capabilities](http://127.0.0.1:4326/capabilities/)。文件：[index.astro](D:/lzz/lzz/_react/src/pages/index.astro)、[capabilities/index.astro](D:/lzz/lzz/_react/src/pages/capabilities/index.astro)、[services.ts](D:/lzz/lzz/_react/src/data/services.ts)。**保留**现有定制定位、五服务和材料/阶段入口、真实联系渠道。**证据**买家能通过Custom Parts进入目录；首页早期强调形状展示，已确认MOQ/周期及资格入口可更早被扫到。**操作/顺序**一句定位 → 五服务/按材料入口 → 1件起/周期条件 → 工厂/质量 → RFQ；标题 `Custom CNC parts from your drawings`。例：`From 1 piece. Share material, quantity and critical requirements.` **资料**无需新事实；市场优先级若增加须企业确认。**内链/CTA**复用现有分类及Quality/HowWeWork；不增加不存在行业栏目。**验收**390px早期可识别业务与分类入口；MOQ/周期保留条件；筛选回目录与询价均可达。

9. **材料指南的现行牌号层（P2，需材料确认）**  
   URL：[material guide](http://127.0.0.1:4326/resources/material-and-finish-checklist/)、[copper/brass](http://127.0.0.1:4326/capabilities/copper-brass-cnc-parts/)。文件：[resources.ts:85](D:/lzz/lzz/_react/src/data/resources.ts:85)、[materialGrades.ts:6](D:/lzz/lzz/_react/src/data/materialGrades.ts:6)。**保留**精确牌号/状态、处理后尺寸及非库存保证。**证据**指南保留彩页 C3600/H62 并明确要求核实；当前分类列 C36000，已有边界，不判确定矛盾。**操作/顺序**现行可报价牌号/标准 → 历史材料示例 → 必须确认的条件；标题 `Confirm the exact grade and standard`。例：`Confirm the intended alloy designation before quotation.` **资料**企业批准的牌号/标准/状态、可提供材料记录。**内链/CTA**分类深链相关牌号，RFQ要求填写完整 designation。**验收**历史记录不覆盖现行选择；明确 C3600 的核实结果或持续未确认状态；不自行改成某标准或推断库存。

10. **相近产品搜索摘要与选择区别（P2，现有内容可改）**  
   URL：[intake A](http://127.0.0.1:4326/products/custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier/)、[intake B](http://127.0.0.1:4326/products/custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier/)、[enclosure A](http://127.0.0.1:4326/products/precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures/)、[enclosure B](http://127.0.0.1:4326/products/small-batch-cnc-machining-manufacturer-complex-aluminum-housings/)。文件：[seo.ts](D:/lzz/lzz/_react/src/data/seo.ts)、[productSummaries.ts](D:/lzz/lzz/_react/src/data/productSummaries.ts)、[productDecisions.ts](D:/lzz/lzz/_react/src/data/productDecisions.ts)。**保留**URL、独立例项、已有Key review和比较链接。**证据**已有正文区分runner/flange与injector/fuel-rail，以及cast/billet与lid/gasket；摘要可更早呈现。**操作/顺序**标题/摘要写几何区别 → 首段Key review → 相关比较；例 `Intake manifolds with injector and fuel-rail interfaces`、`Aluminum enclosures — billet or cast-blank review`。**资料**现有区别足够；新增性能/测试须真实资料。**内链/CTA**沿用成对比较与各自来源RFQ。**验收**四页摘要能说出差别，canonical/URL不变、Schema与可见内容一致。未证实真实关键词竞争或排名变化。

**采购问答：只用当前可访问主站。** “部分”表示可进入评估，最终适配或条款必须询价；未公开的原始文件不作为网站答案。

|问题|能否回答|URL（B后路径）|现有证据|缺失|补充位置|
|---|---|---|---|---|---|
|你们做什么、接受什么输入？|能|/capabilities/；/resources/faq/#engineering|五服务，图纸/模型/样件，OEM/ODM|来料处理的常规边界未充分公开|How We Work|
|20件316L车削件是否值得询价？|部分|/products/precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier/|车削/不锈钢选项、1件起、配合/螺纹审查|具体图纸可加工性/价格|产品Key review + RFQ|
|是否销售现货标准件？|能|/products/|custom parts machined to drawings、made to order|没有现货承诺；不是缺规格故障|保留目录说明|
|公司是谁、在哪里、成立多久？|能（自述）|/about/；/contact/|英文主体、2017、杭州地址、电话邮箱|法律主体注册验证/英文映射|About资格包|
|ISO是否可核验并涵盖这个订单？|部分|/quality/#quality-management|ISO自述、核验清单、available on request|现行证书与范围、项目行业资格|Quality资格模块|
|能否加工我的大尺寸/重五轴件？|部分|/capabilities/5-axis-cnc-machining/#size-and-setup-review|要求整体/毛坯尺寸、重量、装夹信息|设备/装夹可用范围明确未公开|Factory + 5-axis|
|所有特征都能达到±0.01mm吗？|能：不能一概承诺|/resources/faq/#engineering|条件参考，逐特征审查材料/几何/测量方法|具体图纸批准与测量结果|Quality/报价|
|提供什么检验和随货文件？|部分|/quality/#order-documentation|尺寸/首件、材料、处理、抽样、费用须预先约定|真实脱敏样例及当前校准记录|Quality资料包|
|MOQ是多少？样品免费吗？|部分|/quote/；/resources/faq/#ordering|from1piece；样品审批流程|是否免费、样品费/运费/抵扣|FAQ商条|
|什么时候生产完成、何时到货？|部分|/quote/；/resources/how-we-work/|确认后7–14工作日含表面处理，运输另计|订单排期与目的地运输时间|报价；保留条件|
|铜/黄铜或塑料具体牌号和表面处理怎么选？|部分|/resources/material-and-finish-checklist/|牌号、状态、环境、表面规范、处理后尺寸；C3600需核实|现行可供牌号/材料记录，具体适配|材料指南 + RFQ|
|能报价DDP吗，包装和清关谁负责？|部分|/resources/custom-cnc-parts-shipping-checklist/#delivery-package|EXW/FOB/DDP按目的地报价，保护包装/清单/发票|具体namedplace、税费/责任、运费|逐单报价|
|敏感图纸如何处理，付款/保修/不合格品怎样约定？|部分|/resources/how-we-work/；/resources/faq/|可先约定保密；提交版本/批次/数量/测量后审查纠正|NDA正式安排、付款方法/节点、现行保修期限/补救条件|How We Work + FAQ|
|网站填完就已发送吗？怎么交图纸？|能|/quote/；/resources/faq/#preparing|明确未发送；打开邮箱或webmail、复制/保存文本，邮箱附图后自行发送|本次没验证实际外发/收件|保留现有说明；接单责任确认|

**首批整改任务（9项）。当前没有已验证的 P0 问题；ISO 缺独立核验不等于认证错误，原件核验与披露列 P1。正式部署验收属于发布门槛，见下方上线判断，不混入已发现的整改项。**

|优先级|URL / 文件|证据|操作|所需资料|验收|
|---|---|---|---|---|---|
|P1|/quality/、/about/；quality.astro/CompanyDocuments.astro|ISO自述，原件未公开|上线负责人核对现行原件；批准披露或按真实状态调整口径|ISO原件/验证、主体范围|声明与有效原件一致；无法确认则不保留确定性认证承诺|
|P1|产品/分类 + Layout.astro|移动顶部/quote/无来源|同一quoteHref贯通顶部/早期/底部|现有映射|产品/分类点击后草稿reference/ID/source正确|
|P1|/quality/ + 一个/cases/；quality.astro/cases.ts|只有无结果空表|加入获准脱敏实测样例或明确索取流程|真实图纸/报告/授权|结果可追溯，不虚构；无资料则保留空表边界|
|P1|/factory/、/capabilities/5-axis-cnc-machining/；factory.astro/能力模板|机型/范围未公开|补有条件加工范围与企业复核日期|设备参数/装夹条件|旅行范围≠零件尺寸，范围有源|
|P1|/resources/how-we-work/、/resources/faq/；HowWeWork.astro/faq.astro|付款/样品费/保修未答|增加企业批准的3–4条商业FAQ|政策/报价模板|与报价一致；不自动沿用旧营销条款|
|P1|/quote/、/contact/；quote.astro/QuoteForm.tsx/contact.astro|未发送说明充分；接单下一步缺少|加发送后流程与资格/NDA索取入口|渠道负责人/可承诺时段|说明仍准确，渠道责任明确，不编响应时限|
|P2|/、/capabilities/；index.astro/services.ts|业务/入口可达，采购事实可前置|前置五服务/1件起/条件周期及质量深链|现有内容|390px可识别业务并进分类/质量/RFQ|
|P2|材料指南/铜黄铜分类；resources.ts/materialGrades.ts|C3600历史项已标待确认|建立现行牌号层并确认该designation|牌号标准/材料记录|现行与历史口径明确，未推断库存|
|P2|两组产品共4URL；seo.ts/productSummaries.ts/productDecisions.ts|正文已区分，摘要相近|复用Keyreview前置几何/采购区别|现有信息|标题摘要可区别；URL/canonical不变|

**上线判断与边界。**

**发布门槛，尚未验证的正式环境事项：** 发布后检查正式域 HTTPS、canonical、robots/sitemap、实际 301、真实 404、X-Robots-Tag 与误 noindex，并重走移动产品→询价路径。企业确认邮箱/WhatsApp 有接单负责人；真实外发与收件需另行授权测试。本地静态文件和草稿不能替代这些验证，也不据尚未部署的未知项认定当前存在 P0 故障。

|判断|现状/条件|现有资料可做|必须真实资料|部署后验证|可延后|
|---|---|---|---|---|---|
|Go（初步RFQ用途）|当前目录、10分类、主体说明、询价准备可使用；完成事实和正式环境核验即可作为初步询价站发布|来源CTA、导航前置、摘要区别、接单步骤结构|确认ISO自述与所列渠道实际由企业承接|HTTPS/状态/索引规则/跳转；渠道授权核验|全设备明细、全案例报告、扩语种|
|Conditional Go（本轮推荐）|允许买家先比较并发图；资质、实测能力和商条须索取，不宣称完成供应商审批|先做P1来源与资料索取，保留定制和条件边界|现行ISO、代表范围/报告、付款样品保修政策|线上核心路径及移动端；Google抓取/索引需后续观测|P2材料/摘要完善、更多案例、性能现场数据|
|No-Go（条件触发；当前未证实）|若当前ISO无法支持仍保留确定性承诺、渠道无人接单，或生产托管误noindex/错误canonical/核心404，则不能按现文案和环境上线|可审查并修正确认的口径/托管设置；需新授权实施|企业纠正事实与接单责任|重新验证触发项已解除|装饰调整与大量扩写，不应用来替代问题解除|

**本轮已通过的技术基础。** 当前生产构建成功，`npm check` 0 errors/0 warnings/2 hints，SEO与静态验证 exit0；98 HTML、81可索引正式页、35产品、10分类。Title/Description/H1/canonical与JSON-LD格式没有已发现的遗漏或解析错误；robots与sitemap本地可取。9预览/演示页 noindex并排除，7重定向存根及404不进sitemap。产品主体静态HTML存在；目录默认卡片数有限，但noscript有全部35产品链接，静态图无孤立产品。19 Product +16 Service 与来图加工性质一致，没有虚构价格、rating或交付数据；缺offers不是本轮阻断。实体名称/邮件/电话与当前公开源资料一致。以上不证明Google排名、索引、富结果展示或真实邮件收件。

**实际覆盖与证据。** 浏览共42个不同路径，39 Desktop、30 Mobile；78份页面状态记录。所有10分类均Desktop+390px Mobile，10产品代表页Desktop、5产品模板Mobile；首页/目录/能力索引/About/Factory/Quality/Contact/Quote，案例索引与3详情，资源索引及主要指南已覆盖。截图用于布局和CTA判断，DOM记录包括正文、标题、链接和元数据；390×844与1920×911记录未见文档横向溢出。没有逐张评估35产品视觉，也未逐一浏览全部公司新闻详情。完整路径见 [coverage-index.json](D:/lzz/lzz/_react/audit/launch-audit-20261010-fresh/render/coverage-index.json) 与 [evidence-notes.md](D:/lzz/lzz/_react/audit/launch-audit-20261010-fresh/evidence-notes.md)。

询价取证从产品入口点击而来：收件人 roger@lzz-cnc.com、主题、产品 reference/ID、正式 source URL、QA需求均写入草稿；空字段与错误邮箱有提示；Copy显示Copied；webmail及附件步骤明确。**Save下载、剪贴板外部读回、真实邮件/WhatsApp、真实移动系统键盘、窄于390px、线上性能/CWV、证书外部验真未验证**。一次浏览器复制/下载联合取证超时后重建QA标签；重新确认Copy状态，未把工具超时判成网站失败。

原始企业资料用于核对承诺，不拿未公开内容补网站问答：1件起与7–14工作日有当前2026-09-28公司确认；工厂数字有当前自述来源；企业认定不是ISO；建站合同不是产品采购合同。详见 [source-buyer-evidence.md](D:/lzz/lzz/_react/audit/launch-audit-20261010-fresh/source/source-buyer-evidence.md)。命令、原始构建HTML和本地HTTP响应见 technical/；本地抽查HTML与本次dist一致。无旧审计结论参与。

**首次海外买家的最终判断：能快速找到相近产品与加工服务，能提出有内容的询价；可形成初步信任，但不能仅凭网站完成严格供应商资格与订单验收判断。** 保留当前来图定制、条件公差、资料索取和未发送说明，用少量上下文修正与真实企业资料补齐即可，不需要改URL、品牌或技术栈。
