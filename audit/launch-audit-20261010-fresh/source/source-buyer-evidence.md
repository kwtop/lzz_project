本次独立核对确认：核心业务是来图、来样的定制精密机械零件加工，正式服务入口为 CNC milling、CNC turning、5-axis machining、Plastic machining、Machining of Castings 五系列。原型和小批量是生产方式；铝、不锈钢、铜/黄铜等是材料筛选入口。当前 catalog 含 35 个产品例项和 10 个分类，不能把例项理解为库存标准品或现货报价。

取证日期：2026-10-10。当前网站 URL 根为 http://127.0.0.1:4323/；源码根 W 为 D:\lzz\lzz\_react；本次原始提取文件根 S 为 D:\lzz\lzz\_react\audit\launch-audit-20261010-fresh\source。下列 W、S 仅为这两个完整路径的缩写，行号均是本次读取的文件行号。网页文字来自当前正式 src/pages 与 src/data；未控制浏览器。

来源级别：“有源”表示原始文字或现行公司确认备注存在，并非第三方验真。“需企业复核”表示缺现行原件或采购条件细节，不等于虚假。“口径差异”保留原始记录，但若存在较新明确确认，不直接判冲突。

1. 五系列、业务模式与语言——有源。
页面：http://127.0.0.1:4323/capabilities/；http://127.0.0.1:4323/resources/faq/#engineering。
网站答案：FAQ 明写 “Our five service areas are CNC milling, CNC turning, five-axis CNC machining, plastic machining and casting machining.” 定制加工资料以 drawings/samples 为输入，正式页主要文案为 English。
当前定位：W\src\data\services.ts:5–11；W\src\pages\resources\faq.astro:14；W\src\data\resources.ts:77；W\src\data\catalog.json:2（本次解析 products 数组为 35 项）。
原始来源：D:\lzz\原始资料\网站素材提供 - 副本.docx 的 P9–P12、P17–P19，见 S\original-docx-text.txt:10–17。Word 公司介绍为 English，产品分类为中英对照；原始材料表为中英混合；宣传彩页主要为 English 并含中文应用标签，见 S\original-written-source-notes.md:6–21。没有据源码宣称存在其他语言站。

2. 经营主体、成立时间和联系信息——中英文各有明文，未发现确凿冲突。
页面：http://127.0.0.1:4323/about/；http://127.0.0.1:4323/contact/。
网站答案：“Hangzhou Lizhizao Precision Machinery Co., Ltd.”、“Founded in Hangzhou 2017”、roger@lzz-cnc.com、WhatsApp +86 138 5810 2479、No. 4 Fengcheng Road, Pingyao, Yuhang, Hangzhou。
当前定位：W\src\pages\about.astro:28–30；W\src\pages\contact.astro:10、13。
原始来源：Word 公司名和 2017 在 S\original-docx-text.txt:10，地址/邮箱/电话在:6–8；原始阿里巴巴资料 Sheet1 A5/B5/C5 见 S\original-alibaba-profile-xls-text.txt:11–14，中文全称为“杭州力智造精密机械有限公司”，2017 成立，前身为“余杭大力五金加工厂”，主营非标定制机械加工。原始三份中文企业文件同一中文主体，见 S\original-written-source-notes.md:23–32。
缺口：未用营业执照或注册信息验真英文法律名称与中文注册名称的正式映射。原始 xls 历史邮箱与现站不同；最新 Word 和宣传彩页均写 roger@lzz-cnc.com，因此不判现站联系方式冲突。

3. 工厂规模、产能和经验——有源自述，网站已限定产能口径。
页面：http://127.0.0.1:4323/factory/#production-capacity。
网站答案：“1,500 m²”、“40+ CNC machines”、“An engineering team with more than 15 years in CNC machining.” 月产 “About 100,000 parts per month”，并声明 reference capacity，受 geometry/material/finishing/production mix 影响。
当前定位：W\src\pages\factory.astro:18–19；W\src\data\company.ts:1–13，其中:1明确“Company figures confirmed by the user: 40+ refers to CNC machines.”
原始来源：D:\lzz\raw\_content\company\about.md:23；D:\lzz\raw\_content\company\advantage.md:25、41；宣传彩页 P1，转录 S\original-written-source-notes.md:8、15。
边界：2017 是公司成立时间，15+ years 是工程人员经验；不把旧产品营销中的“15 年 operational history”套到当前公司成立时间。参考产能没有本次生产记录验证。

4. MOQ——现行公司确认，来源充分。
页面：http://127.0.0.1:4323/quote/；http://127.0.0.1:4323/resources/faq/#ordering；所有产品详情的 #drawing-review。
网站答案：“From 1 piece.” / “Orders start at 1 piece.” 样件数量与未来批量数量分开报价。
当前定位：W\src\pages\quote.astro:23；W\src\pages\resources\faq.astro:8；W\src\pages\products\[slug].astro:91。
来源：W\src\data\resourceDeliverySections.ts:1明确服务范围于 2026-09-28 经公司确认，:3明写 one piece；原始宣传彩页 P1 见 S\original-written-source-notes.md:11、14；D:\lzz\raw\_content\products\detail\Small-Batch-CNC-Machining-Manufacturer-Precision-Aluminum-Components-HMLV.md:60。

5. 样品与首件——加工/检查/批准流程有源，免费样品及样品付款条件未答。
页面：http://127.0.0.1:4323/factory/#workflow；http://127.0.0.1:4323/resources/how-we-work/。
网站答案：sample/prototype machining 后 inspection & feedback，批准后进入 production；可按订单的特征提供 first-article/dimensional reports。
当前定位：W\src\pages\factory.astro:11–12、23；W\src\data\resources.ts:79–80；W\src\data\orderDeliverables.ts:5、19。
原始来源：D:\lzz\raw\_content\company\factory.md:53–65；D:\lzz\raw\_content\products\detail\Small-Batch-CNC-Machining-Manufacturer-Precision-Aluminum-Components-HMLV.md:62。
采购缺口：未找到免费/收费样品、样品费抵扣、样品运费、首件返工及独立样品付款条件的公开答案；应按项目询价，不能推断免费。

6. 交期——现行公司确认；旧材料不同口径不能据此判当前无依据。
页面：http://127.0.0.1:4323/quote/；http://127.0.0.1:4323/resources/faq/#ordering；所有产品详情 #drawing-review。
网站答案：“7–14 business days after drawing and order confirmation, including surface finishing. Shipping time is additional.”
当前定位：W\src\pages\quote.astro:23；W\src\pages\resources\faq.astro:9；W\src\pages\products\[slug].astro:91。
现行来源：W\src\data\resourceDeliverySections.ts:1、3（2026-09-28 公司确认的服务范围）；该内容经 W\src\data\resources.ts:99 拼接到正式文章。
旧材料口径：D:\lzz\raw\_content\site-home.md:146 是 7–30 days，按复杂度/数量；宣传彩页 P1 是 7–20 days，见 S\original-written-source-notes.md:10、13；部分小批量旧产品页是 7–14 days。现行以较新公司确认为准；生产时段与运抵日期仍须各订单报价确认。

7. 定制范围与铸件责任——主要范围有源，需订单界定供应及验收。
页面：http://127.0.0.1:4323/capabilities/casting-machining/；http://127.0.0.1:4323/resources/how-we-work/。
网站答案：drawing/model review、OEM/ODM、样件反向工程；casting 需明确谁供应和批准 blank、余量、基准、缺陷与测试责任。
当前定位：W\src\data\capabilityOverview.ts:35；W\src\data\orderDeliverables.ts:13–14；W\src\data\resources.ts:77–78；W\src\pages\resources\faq.astro:14。
原始来源：Word OEM/ODM/设备类型在 S\original-docx-text.txt:11；阿里资料来图/来样/来料与车铣磨/线割/表面处理在 S\original-alibaba-profile-xls-text.txt:11–13；扫描铸件、2D/3D CAD 反向工程在 D:\lzz\raw\_content\products\detail\Custom-CNC-Machined-Castings-Transmission-Housings-Pump-Bodies.md:55。
边界：资料能支持“可讨论/报价的加工范围”，不能证明每个询价都有已验证工艺、量产资格或测试能力。

8. 材料和表面处理——有原始表/彩页，公开文字明确按订单确认。
页面：http://127.0.0.1:4323/resources/material-and-finish-checklist/；http://127.0.0.1:4323/capabilities/aluminum-cnc-parts/；http://127.0.0.1:4323/capabilities/plastic-machined-parts/。
网站答案：必须指定 exact grade/condition、finish、masking、检验阶段；材料例子不是库存或适用性保证。公开材质包括铝、不锈钢、铜/黄铜、工程塑料，彩页文字另列 titanium/Inconel/Kovar/Invar 等。
当前定位：W\src\data\materialGrades.ts:1–7；W\src\data\resources.ts:83–96；W\src\data\resourceDeliverySections.ts:6；W\src\pages\resources\faq.astro:15。
原始来源：D:\lzz\原始资料\力智造-素材资料照片\力智造-素材资料照片\6、常用加工材料明细\常用的加工材料明细.xlsx，Sheet1 A1:B7，提取见 S\original-materials-xlsx-text.txt:5–11；宣传彩页 P2 材料行，见 S\original-written-source-notes.md:20。源材料表的 Copper/Brass 标签混杂，彩页印 C3600；现站分开 copper/brass 并要求确认 exact designation。没有据源表推导现货、化学成分、材料合格证可无条件供应。

9. 公差——现站是条件参考，没有对所有零件作数值保证。
页面：http://127.0.0.1:4323/resources/faq/#engineering；http://127.0.0.1:4323/quality/。
网站答案：“±0.01 mm is a conditional engineering reference for selected critical features after review, not a general part tolerance or guarantee.” 按材料、几何、装夹和测量方法逐特征确认。
当前定位：W\src\pages\resources\faq.astro:16；W\src\data\resources.ts:26、47；W\src\pages\quality.astro:33–34。
原始来源：D:\lzz\raw\_content\company\factory.md:73 公开 ±0.01 mm；宣传彩页 P1 写 tolerance up to ±0.005 mm，见 S\original-written-source-notes.md:12。两种旧宣传值口径不同，当前较保守且明确条件，不能称为当前确凿冲突；原件没有给出本次可验的具体测量结果。

10. 质量文件与 ISO——过程/文件方案有源，公开 ISO 原件仍须索取。
页面：http://127.0.0.1:4323/quality/#order-documentation；http://127.0.0.1:4323/quality/#quality-management；http://127.0.0.1:4323/about/#documents。
网站答案：dimensional/first-article reports、material records、finishing documents、sampling/acceptance 要预先写入订单；quotation 列 included documents 和 extra cost；不公开客户报告或测量结果。直接声明“LZZ is ISO 9001-certified”，同时让采购方索取 current certificate，核对 legal entity/number/issuer/dates/site/scope/verification。
当前定位：W\src\pages\quality.astro:5–11、22–28、40、52–54、69–70；W\src\pages\resources\faq.astro:19–20。
原始来源：D:\lzz\raw\_content\company\about.md:27，原始产品页及彩页均有 ISO 自述；原始流程与检测设备见 D:\lzz\raw\_content\company\factory.md:29、53–69、97；彩页 ISO 文字见 S\original-written-source-notes.md:9、18。原站 downloads 仅列三份企业认定/教学基地文件，D:\lzz\raw\_content\downloads\index.md:23–31。
来源缺口：本次可读取的原始明确文字没有 ISO 证书编号、认证机构、有效期、认证范围和验证渠道。三份中文原始文件的编号/主体已转录 S\original-written-source-notes.md:23–32，它们不是 ISO 文件。结论为“有认证自述，现行认证原件需企业提供/复核”，不据此认定未认证、失效或主体不一致。

11. 运输、贸易术语和交付文件——现行确认有答案；运抵责任需逐单写清。
页面：http://127.0.0.1:4323/resources/custom-cnc-parts-shipping-checklist/#delivery-package；http://127.0.0.1:4323/quote/。
网站答案：protective packing、packing list、commercial invoice、shipment information；根据规模/目的地讨论 courier/air/sea 和 DHL/FedEx/UPS。EXW/FOB/DDP 可报价，DDP 非自动包含；quotation 确认运输、清关、税费责任与 named place。
当前定位：W\src\data\resourceDeliverySections.ts:1、4；W\src\data\resources.ts:69–75；W\src\pages\quote.astro:23；W\src\pages\resources\faq.astro:21。
原始来源：D:\lzz\raw\_content\company\advantage.md:57（FedEx/UPS/DHL 全球运输）；D:\lzz\raw\_content\products\detail\Custom-OEM-High-Precision-CNC-Milling-Manufacturer.md:61（包装和 DDP 自述）。最新公司确认备注已覆盖 EXW/FOB/DDP 和随货文件。
采购缺口：没有各目的地运费、时效或统一到货日期承诺；这是公开文字明确要求报价确认的订单变量。

12. 付款、保修和不合格品处理——付款/保修期限公开答案缺失，争议提交入口有答案。
页面：http://127.0.0.1:4323/resources/how-we-work/#quotation-scope；http://127.0.0.1:4323/quote/；http://127.0.0.1:4323/resources/faq/。
网站答案：报价确认 price、quantity、separate charges 和 delivery terms；不合格品须提交 revision、part/batch reference、affected quantity、photos、measurement details，再按约定标准审查并商定 corrective action。未找到支付方法、币种、定金/尾款节点、固定产品保修期限或统一维修/更换/退款政策的公开答案。
当前定位：W\src\data\resourceDeliverySections.ts:3；W\src\data\resources.ts:78、80；W\src\pages\quote.astro:23 的 Before you order 和 W\src\pages\resources\faq.astro:7–22 均不含产品付款/固定保修条款。
历史源：D:\lzz\raw\_content\products\detail\Custom-OEM-High-Precision-CNC-Milling-Manufacturer.md:62 自述 all milled components 的 six-month warranty；部分旧产品也出现同类营销文案。不能把历史值自动视为新订单合同，更不能以现站未写断定公司已取消保修。应让企业确认适用零件、起算点、免责和补救责任。
合同核对：D:\lzz\合同\独立站建设及运营服务合同.docx 是网站建设/运营合同，提取 S\source-contract-text.txt:5、8、13、44 显示甲乙方为空、服务范围为建站运营、书面事项可作补充；没有 CNC 产品采购、ISO、MOQ、产品交期或保修条件。运营服务费及运营退款机制不能当作买方采购付款/保修条款。

检索边界：raw_content 当前为空；主要原站文本来源为 D:\lzz\raw\_content。没有读取 memory、旧审计/评分/设计讨论。一次源目录 rg 的排除 glob 未生效返回 demo 行，本次已丢弃这些结果；证据定位均为明确指定的正式文件。原始宣传彩页和中文企业文件只核对明确文字，没有评价图片、重绘建议或从图片推断能力。
