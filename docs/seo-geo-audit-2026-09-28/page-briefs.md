# E. 全部核心页面动作与10份实施Brief

观察日2026-09-28；所有建议为修改现有URL。文件均以项目根为准。内容上线前由所列角色审核；角色不是虚构员工姓名。本轮不修改页面。

## 所有核心入口动作

|URL/页面组|动作|
|---|---|
|/|保留工厂/检测前置、3个零件等宽；认证摘要链接Quality认证段，周期链接完整条件；不把首页堆成技术指南|
|/capabilities/|保留工艺/材料/订单三种入口；补简短几何路线说明并链接既有比较页|
|10个/capabilities/详情|按intent-navigation逐页落实；共用摘要/细节去重结构，保留各材料/工艺差别|
|/products/|保留35例、过滤、12精选和noscript；几何分组提示是参考不是商品分类承诺|
|35个/products/详情|保留URL；人工核验related工序；原图/CAD类型可见；已知几何与可选材料继续分开|
|/factory/|设备适用表和内外协边界，保留原始现场图|
|/quality/|证书/仪器/校准/实测四层证据；保留条件公差|
|/cases/及5详情|保留工艺研究定位；不虚构客户结果；补真正的工序决策理由|
|/insights/及8详情|保持采购任务分组；工艺/材料/采购指南各负责不同问题；活动新闻不承接工业能力关键词|
|/about/|公司概况与documents保留；更新企业认可时效，档案不是客户背书|
|/quote/|本轮规划保留；未来经授权优化上下文，绝不冒充发送成功|
|/privacy/|修正“原始名称仍显示”的不准确描述，核对会话草稿声明|
|/404.html|保留404/noindex与返回入口，不要求进入sitemap|

## Brief 01 — Quality Control

1. URL `/quality/`；Factory & Quality > Quality Control；修改。
2. SQE/技术采购，供应商核验与验收；判断证据是否能满足订单。
3. `CNC machining inspection`, `CMM inspection report`, `ISO 9001 CNC supplier`；B Q1/Q3/Q4，非搜索量结论。
4. F01：Certification无可公开ISO字段；Records是空白格式；Equipment无校准与范围。
5. Title `CNC Machining Quality & Inspection | LZZ Precision`；Meta `Review LZZ's inspection workflow, feature-specific tolerance planning and the records to agree before machining. Discuss your supplier qualification needs.`；H1 `Quality control for your machined parts`。
6. 现有流程后：H2 `Inspection at each stage` → `Equipment and measurement scope` → `Records for your order` → `ISO 9001 certification`；沿用现有锚点。
7. 流程说清检查与批准责任；设备表回答量程/方法/限制；记录区标报告类型/真实脱敏样本/可供条件；证书区列主体范围有效期。未知字段只放内部任务，不做公开占位表。
8. 四步流程+设备表+真实文件预览；空白表继续明确无结果，不放AI检测员。
9. 出链 `/factory/`（Machining and inspection equipment）、`/insights/rfq-checklist/`（Prepare inspection requirements）、`/about/#documents`需先核实现有id；入链首页/所有能力与产品。
10. 主CTA `Discuss your inspection needs` 到现有quote；辅CTA `Prepare inspection requirements`；记录需求写进客户邮件，不承诺自动上传。
11. 保留Organization/WebPage/BreadcrumbList；无评测星级；无虚拟报告schema。
12. `src/pages/quality.astro`、`src/layouts/Layout.astro`；证据数据建议集中新增字段，不编造已存在文件。
13. 质量负责人审核；真实证书/校准/可公开许可是依赖；证书更新、量具更换、流程变化触发复核。验收：证据日期/范围可查，正文与文件一致，全部链接可访问。

## Brief 02 — Our Factory

1. `/factory/`；Factory & Quality > Our Factory；修改。
2. 采购/工程师，供应商预筛；确认制造现场与设备适用范围。
3. `CNC machining manufacturer China`, `CNC machining equipment`；B Q1/Q2。
4. F02：现有设备族不提供模式、工件范围或外协边界。
5. Title `CNC Machining Factory in Hangzhou | LZZ Precision`；Meta `Explore LZZ's Hangzhou workshop, machining and inspection equipment, and the drawing review used to confirm a suitable production route.`；H1 `Our CNC machining factory in Hangzhou`。
6. 现有事实摘要后H2 `Machining and inspection equipment` → `How equipment is matched to a part` → `Inside our workshop` → `From drawing to shipment`。
7. 表列设备类型/型号/模式/可用范围及前提/核验日期；40+包括辅助设备。内部与外协工序只有公司确认才公布；保留参考产能条件，不用总数推算机床产能。
8. 原图+紧凑表；不新增虚构机床照和品牌铭牌。
9. 出链四工艺与Quality；能力页Size & workholding回链具体设备区。锚文本 `Review equipment and workholding scope`。
10. `Discuss your part dimensions` → quote；辅 `Review quality control` →quality；图纸/毛坯/重量由客户提供。
11. 基础实体即可；不要把40+编码为40台五轴机。
12. `src/pages/factory.astro`、`src/data/company.ts`、`src/data/evidence.ts`。
13. 工厂负责人；机型台账/资产公开许可；新增设备或外协变更触发。验收：设备范围与能力页一致，图片对应机型，不改原始文件。

## Brief 03 — 5-Axis Machining

1. `/capabilities/5-axis-cnc-machining/`；Capabilities > 5-Axis Machining；修改。
2. 机械研发/技术采购，路线选择和可行性判断。
3. `5 axis CNC machining`, `3+2 vs simultaneous machining`；B Q2/Q8。
4. F02/F06：提到indexed/simultaneous但未展开，材料/设备限制重复。
5. Title `5-Axis CNC Machining for Complex Parts | LZZ Precision`；Meta `Discuss angled features, curved surfaces and multi-face parts with LZZ. Review tool access, workholding and inspection requirements from your model.`；H1 `5-axis CNC machining`。
6. Hero后H2 `Is five-axis machining right for your part?`；Engineering fit内模式表；随后 `Equipment and workholding scope`、`Part examples`、`Drawing and inspection requirements`。
7. 模式表答几何需求/旋转轴用途/限制；范围引用本厂数据；图纸区答基准/轮廓/检验，不承诺一装夹一定完成或所有材料通用精度。
8. 条件对比表+1个真实setup研究；AI几何示意仅辅助且带标识。
9. 出链工艺比较、Factory、Quality、五轴研究；Factory与产品相关块回链。
10. `Discuss your multi-face part` →quote；辅 `Compare machining routes` →process-selection；模型/重量/毛坯条件。
11. 保留WebPage/BreadcrumbList；可选Service须与可见范围一致，不作为排名必需项。
12. `src/pages/capabilities/[slug].astro`、`src/data/capabilityContent.ts`、`src/data/capabilityReferences.ts`、`src/components/EngineeringScope.astro`。
13. 工艺工程师；设备模式/包络证据；机器或可加工范围变化触发。验收：客户能区分3+2/联动，已知/待评审不混淆，重复段合并且条件不丢失。

## Brief 04 — How to Order

1. `/insights/how-we-work/`；Resources > How to Order；修改。
2. 采购/OEM项目经理，核价、下单、变更与交付。
3. `CNC machining quotation`, `CNC machining cost factors`, `custom machining order process`；B Q3/Q6。
4. F03：流程存在但费用/付款/争议处理缺公司答案。
5. Title `How to Order Custom CNC Parts | LZZ Precision`；Meta `Prepare your drawing, compare quotation scope and agree sample approval, inspection, finishing and shipment details for custom CNC parts from LZZ.`；H1 `Ordering custom machined parts from LZZ`。
6. 保留6步；Review quotation之后插H2 `What to compare in a machining quote`；样件后插 `Drawing changes and nonconforming parts`；已确认付款口径归入quote review。
7. 费用表答材料/编程装夹/加工/表处/检验文件/包装运输是否计入；不填虚拟金额。变更答谁批准/何时重报；不合格答需什么记录/联络路径；政策要公司核准。
8. 核对表+6步骤；真实发货档案保留，不再加生成货运场景。
9. RFQ、Quality、Shipping、prototype-vs-small-batch-cnc双向链接；锚文本 `Check quotation scope`。
10. `Prepare your RFQ` →quote；辅 `Check shipping requirements`；不改邮件流程。
11. Article可保留真实机构作者；不增加HowTo富结果承诺。
12. `src/data/resources.ts`、`src/pages/insights/[slug].astro`。
13. 销售/财务/质量共同核准；商务条款更新触发。验收：不再仅写“ask us”，但没有未经批准付款、退款或SLA数字。

## Brief 05 — Material & Finish Guide

1. `/insights/material-and-finish-checklist/`；Resources栏目/正文入口；修改。
2. 研发/采购，规范化材料和表面验收需求。
3. `CNC material selection`, `machined parts finishing specification`；B Q5+C。
4. F04：现有表是提问清单；C3600来源歧义与当前报价字段未分层。
5. Title `CNC Materials & Finishing Requirements | LZZ Precision`；Meta `Compare the requirements behind material and finish choices, including grade, condition, masking, finished dimensions and documentation for your RFQ.`；H1 `Choosing materials and specifying finishes`。
6. Operating conditions后H2 `Compare materials by the requirement`；再 `Specify the grade and condition`、`Define the finish`、`Accept dimensions after treatment`。
7. 家族表给选择目标/限制；具体牌号结论引用材料生产商资料；源宣传册误记留来源说明，不把未经确认编号放成可供应承诺。表处说清标准/膜厚/遮蔽/后处理尺寸。
8. 一张跨家族表+表处字段表；不以AI金属颜色鉴定牌号。
9. 4材料能力页双向内链；出链Quality、RFQ；footer增加本指南为可选P2。
10. `Discuss material and finish requirements` →quote；辅 `Use the RFQ checklist`。
11. Article；不为比较生成虚假Product/Offer。
12. `src/data/resources.ts`、`src/data/materialGrades.ts`；后者目前存在但是否展示需按实际模板检查，不能只改未被消费数据。
13. 材料/工艺工程师；材料一手数据、可供标准；供应范围变化触发。验收：每条性质注明适用等级/状态，选材建议与本厂承诺分开。

## Brief 06 — Aluminum Machining

1. `/capabilities/aluminum-cnc-parts/`；Capabilities > Materials栏目入口；修改。
2. 研发/采购，铝件牌号与表处选择。
3. `aluminum CNC machining`, `6061 vs 7075 machining`；B Q5低+需求假设。
4. F04/F06：6061/7075清单多次重复，缺选择理由。
5. Title `Custom Aluminum CNC Machining | LZZ Precision`；Meta `Explore aluminum housings and structural part examples. Discuss alloy, temper, thin walls, masking and finished dimensions for your drawing.`；H1 `Aluminum CNC machining`。
6. Engineering fit后插H2 `Compare alloy requirements`；Service options合并重复；`Finishing and controlled dimensions`在实例前后均可但只保留一处。
7. 6061/7075比较材料状态、载荷/质量、加工、外观/后处理前提；数值无可靠来源不写；3003出自特定冷却服务不能暗示所有零件默认可选。
8. 两列短比较+1个壳体原始示例；不新增同义比较URL。
9. 材料指南、发动机盖、铣削、Quality；这些页回链 `Aluminum machining requirements`。
10. `Discuss your aluminum part` →quote；辅 `Specify material and finish`。
11. WebPage/Service可选，不宣称具体商品规格。
12. `src/data/capabilityContent.ts`、`src/data/capabilityReferences.ts`、`src/pages/capabilities/[slug].astro`。
13. 材料工程师；数据表+公司可供范围；牌号/工艺改变触发。验收：相同几何不同选项的理由可读，不能未经批准自动替换材质。

## Brief 07 — Casting Machining

1. `/capabilities/casting-machining/`；Capabilities > Casting Machining；修改。
2. 铸件采购/工程师，供坯分工与后加工验收。
3. `CNC machining castings`, `casting machining allowance`；B Q7。
4. 已有基准/余量提问，但供坯和不合格坯处理无确定规则，F03。
5. Title `CNC Machining for Cast Housings | LZZ Precision`；Meta `Discuss finish machining for cast housings and pump bodies. Define blank supply, machining allowance, datums and finished-part inspection before quoting.`；H1 `CNC machining for cast components`。
6. Engineering fit后H2 `Who supplies the casting?`；随后 `Define stock allowance and datums`、`Inspection and blank acceptance`、实例。
7. 责任表答来料谁供/何时检/不足余量谁处置/缺陷如何沟通；定义铸坯与成品图版本；孔隙、耐压、NDT独立确认，不默认已提供。
8. 责任表+空白基准示意；不生成“合格铸件检验结果”。
9. 4–5个铸件详情各指向对应问题；出链RFQ、Quality、How to Order。
10. `Discuss your casting and finished drawing` →quote；辅 `Prepare the drawing package`。
11. WebPage/可选Service；不声明Foundry实体。
12. `src/data/capabilityReferences.ts`、`src/data/capabilityContent.ts`、`src/pages/capabilities/[slug].astro`。
13. 工艺/供应链审核；真实供坯责任；供应模式变更触发。验收：不需要读者猜LZZ是否铸造，默认责任不凭空指定。

## Brief 08 — Billet Engine Cover Example

1. `/products/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/`；Part Examples；修改样板后推广。
2. 汽车研发/OEM，判断几何相关性并提交自有图纸。
3. `custom billet aluminum engine cover`；现有目录+C假设，不给搜索量。
4. F05/F07/F09共用模板风险；当前已正确区分几何/选项，不推翻。
5. Title `Custom Billet Aluminum Engine Covers | LZZ Precision`；Meta `Explore a billet engine cover example and the mounting, underside clearance and finish requirements to define for your custom drawing.`；H1 `Billet aluminum engine covers`。
6. 保留名称/图片/用途/CTA；Materials & manufacturing内H2 `What this example shows`、`Requirements for your cover`；再相关工序/零件。
7. 只写可见曲面/安装接口；6061-T6/7075列选项而非此照片材质鉴定；图纸答安装位置、底面空间、密封是否存在、外观要求。
8. 中性背景主图+短工程表；原图/CAD类型可见；不制造尺寸或测量数据。
9. 铝页、五轴、Quality；相邻发动机/进气件解释几何差别；相关研究仍标“separate”。
10. `Discuss a cover like this` →现有quote；后续授权才修改参数结构；辅助 `Review inspection requirements`。
11. 不强加商家库存/价格schema；基础实体和面包屑足够。
12. `src/pages/products/[slug].astro`、`src/data/productSummaries.ts`、`src/data/productDetails.ts`、`src/data/manufacturing.ts`、`src/components/Gallery.tsx`。
13. 工程师/图片编辑；无需编产品参数；原始记录变化触发。验收：手机名称→图→摘要→CTA，已知与选项不混，相关链接与此几何匹配。

## Brief 09 — Process Comparison

1. `/insights/cnc-process-selection/`；Resources > Compare Machining Processes；修改。
2. 工程师/初次采购，理解路线取舍。
3. `CNC milling vs turning`, `3+2 vs simultaneous 5-axis`；B Q8。
4. F04/F02：现有三路线表不错，但multi-axis合成一项，不能具体比较定位与联动。
5. Title `CNC Milling vs Turning vs 5-Axis Machining | LZZ`；Meta `Compare machining routes by geometry, access and setup needs. Learn which drawing details to provide when discussing a suitable process with LZZ.`；H1 `CNC milling, turning and multi-axis machining: how to choose`。
6. 现有比较表后H2 `Indexed positioning or simultaneous machining?`；保留多工艺和精度问答；最后RFQ输入清单。
7. 比较运动/几何需求/装夹/编程复杂性，数值价格优势不写；声明最终路线依赖图纸，不把原始照片当联动运行证据。
8. 一张4路线对比+最多2张对应原图；不用复制全文到能力页。
9. 4工艺页、两阶段铣削、车后铣；能力页用 `Compare machining routes` 回链。
10. `Discuss the route for your part` →quote；辅 `Prepare a consistent drawing package` →RFQ。
11. Article，问答正文保留但不追求FAQ富结果。
12. `src/data/resources.ts`、`src/pages/insights/[slug].astro`。
13. 工艺工程师；参考Okuma/Siemens一手解释并核对本厂范围；流程变化触发。验收：不输出“5轴总是更准/更便宜”，读后能提出合适的模型与基准问题。

## Brief 10 — About LZZ

1. `/about/`；主导航About LZZ；修改，不恢复Documents独立菜单。
2. 采购/供应商开发，核验身份与组织。
3. `LZZ Precision Hangzhou`, `CNC machining company Hangzhou`；C品牌需求假设。
4. 已有团队/原照/中文证件翻译；认证证书与奖项分开是优点。高企证印有效期三年，从2023-12-08起，接近需复核时间；不应自动续期，F01/F12。
5. Title `About LZZ Precision | CNC Machining in Hangzhou`；Meta `Meet Hangzhou Lizhizao Precision Machinery, explore company documents and original team photographs, and find our factory and quality information.`；H1 `CNC machining in Hangzhou`。
6. 保留Company overview→People→History→Company documents→应用→按年档案；概况后补真实职责说明，文件前加文档类型说明。
7. 回答公司是谁/谁处理工艺与质量/文件证明什么；跨行业应用不变成客户关系；海外客户主张需要内部佐证登记，不自动扩展国家清单。
8. 真实公司原照+责任说明+原证件/英文释义；不添加AI团队合照。
9. Factory、Quality、How to Order；Quality回链company documents；不要把ISO CTA指向无ISO的奖牌而不说明。
10. `Discuss your project` →quote；辅 `Explore our factory`。
11. Organization与可见名称地址一致；无假sameAs合作客户或推荐关系。
12. `src/pages/about.astro`、`src/data/company.ts`、`src/data/evidence.ts`。
13. 行政/质量/销售核准；证件有效期、照片公开许可；证件到期或团队职责变化触发。验收：每张文件可读且类型准确，归档日期不是结果日期。

## 三类可用英文模块样稿

以下只用当前可核实的网站口径，不包含待补证书编号、设备参数或政策。正式发布前仍走上述角色审核。

### 1. 商业能力页：五轴

**Define the features before choosing the route**

Angled holes, curved surfaces and features on several faces call for a review of tool access and workholding. Send the 3D model, the controlling drawing revision, material, stock dimensions and part weight where known. Identify the datums and features used for acceptance so the machining route and inspection requirements can be considered together.

An axis count alone does not define the maximum part size or guarantee a tolerance. Discuss the setup and measurement method for your specific geometry.

CTA: **Discuss your drawing**

### 2. 信任页：Quality

**Agree the records before machining**

Mark the critical features and datums on your drawing, and state whether acceptance dimensions apply before or after finishing. Include the report format, sampling requirements and material or treatment documents your order needs.

LZZ is ISO 9001 certified. For supplier qualification, request the certificate details and applicable scope. The company-recognition documents on our About page are separate from the ISO certificate. Equipment photographs show the instruments present; calibration evidence and part-specific results need to be confirmed separately.

CTA: **Discuss inspection requirements**

### 3. 采购指南：How to Order

**Compare the same scope**

Use the same drawing revision, material, finish and quantity when comparing quotations. Ask each quote to identify the inspection records, packaging and delivery basis included, and clarify any exclusions before approving the order.

Orders start at 1 piece. Production takes 7–14 business days after drawing and order confirmation, including surface finishing. Transit is additional, so provide your required arrival date and delivery location when requesting a quote.

The website prepares an email draft; it does not send an inquiry or upload your files. Review the draft, attach the drawing in your email application and send it when ready.

CTA: **Prepare your email draft**
