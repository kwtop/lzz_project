# LZZ 独立内容、采购决策、导航与 SEO/GEO 审计

日期：2026-09-28。审计对象：`D:/lzz/lzz/_react` 当前源码与现有 `dist`。交付类型：研究、取证、整改方案；本报告不代表整改已实施。

## 审计边界与证据口径

完整读取了用户要求文件 `C:/Users/Administrator/.codex/attachments/b38dcf8d-373b-43fb-ac87-d9ede6173126/已粘贴的文本.txt`。使用 `C:/Users/Administrator/.agents/skills/seo-audit/SKILL.md` 核查框架，但以用户的 A–F 输出、采购任务及证据约束为准。未读取历史记忆、未依赖旧审计结论、未改业务代码、未自行构建、未运行浏览器、未部署、未发送询盘。读取旧资料台账仅用于追溯来源和确认授权边界，不把台账里的旧页面计数当当前事实。

本报告路径中的 `src/`、`dist/`、`docs/`、`public/` 均相对 `D:/lzz/lzz/_react/`；站内 URL 均是当前路由，正式配置 origin 为 `https://www.lzz-cnc.com`，不代表已验证该正式域名的部署。问题集内英文引文来自当前 dist 的 main 正文（只归一空白），不是用行业常识补出来的答案。

证据分层：

| 层级 | 本轮取得的材料 | 能证明什么 / 不能证明什么 |
| --- | --- | --- |
| S：源码 | Astro 页面、React islands、内容数据、布局、构建配置 | 内容与交互实现意图；不独立证明浏览器视觉、服务端接收或商业履约 |
| H：本地输出 | 全部 75 个 HTML、robots、sitemap、下载资产；审计时首页产物修改时间为 2026-09-28T06:10:40.969Z | 本版本静态输出与链接；不证明正式索引、排名或 AI 引用 |
| M：主代理实测 | [主代理复验证据](./content-seo-geo-verification-2026-09-28.md) | 当前构建/本地响应/指定浏览器路径；明确非本代理亲自浏览器测量 |
| A：公司归档/确认记录 | `docs/claim-ledger-2026-09-25.md`、`content-evidence.md`、`orderDeliverables.ts`、`resourceDeliverySections.ts`；原站内容归档 | 有发布依据的公司声明；不等于独立证书验证或实际订单记录 |
| P：来源实物文件 | 原始照片及哈希、公司文件图；39 条 evidence 记录的原文件存在且 SHA-256 全部匹配 | 文件来源链、照片记录的场景；不证明拍摄后设备状态、加工精度或客户结果 |
| X：外部参考 | 主代理复验文档中的 Google、Protolabs、Xometry 链接与研究说明 | 借鉴信息组织及采购问题；本代理未重新联网复核，不用于证明 LZZ 能力 |

当前覆盖：75 HTML＝10 个基础页＋10 个能力详情＋35 个产品详情＋5 个工序研究详情＋13 个 Knowledge Center 子页＋404＋首页预览。73 个正常可索引配置页面；10 个能力系列全部逐项审阅，35 产品的用途/材料/工艺/检查与关联全部审阅，8 个深入工程变体及高风险异常进一步比较；5 个工序研究、全部采购指南/FAQ均读取当前正文。视觉判断只引用主代理已实测范围。

基础来源索引亦已核对：`D:/lzz/raw/_content/_meta/page-manifest.json` 91 条、`asset-manifest.json` 124 条；原站 53 个产品 URL 对应 35 个独立名称，现有 10 个分类。它们是旧站来源记录，不是当前路由数。`docs/source-evidence-inventory.json` 登记 495 图、7 视频、39 选用记录、51 重复组、63 重复副本；本轮没有重新逐张审阅495张图片，不把索引标记等同图像真实性鉴定。

## A. 客户与业务结论

### A1. 结论与当前强项

网站已经能说明“杭州按图/样件加工、打样与小批量、从1件起、如何准备询价”，并有工艺比较、材料与表面处理、首件/尺寸/材料/表处文件、包装物流、不合格问题处理的具体内容。它不是从零开始的关键词站。当前主要短板是：**买家知道要提交什么，却仍难公开核对供应商实际设备边界、认证范围及项目实测证据；同时部分重复模板和图片来源表达降低了判断效率。**

应保留的资产：

- 35 个产品明确写 `Not a stock item.`，把定制示例与现货型号区分；短标题已去掉大量旧式 manufacturer/supplier 堆词。
- ±0.01 mm 已限于关键特征、条件性评估；没有把 5 轴名称直接当精度保证。
- 铸件页明确不据此证明自有铸造厂；材料/功能测试/行业准入多处有范围说明。
- 当前有 Indexed 3+2 与 simultaneous five-axis 的技术解释；不能再报“完全缺失”。
- 工序研究使用来源照片，明确不是客户成功案例或检验记录；39 条原照来源哈希可追溯。
- 询价流程明确仅生成邮件草稿，有复制/下载后备方案；没有伪造“已送达”成功状态。
- 正常页面独特 title/description、正文静态可取、有效链接及基础结构化数据已形成；本地技术复验通过。

### A2. 应吸引谁、解决什么任务

| 优先客户/阶段 | 需求触发与场景 | 采购限制 | 网站应帮助完成的任务 | 决策证据与合理下一步 |
| --- | --- | --- | --- | --- |
| 主要：工业仪器、自动化及设备 OEM 的机械/项目工程师，设计初审至 RFQ | 壳体、支架、轴、接头等需要按图打样或替换供应 | 配合尺寸、基准、材料、装夹、检验方法、版本保密 | 选工艺→检查尺寸/材料可行性→准备完整询价 | 工艺适用边界、可核对设备范围、对应原照/脱敏报告；尚无完整图纸时先请求可行性讨论 |
| 主要：采购/供应商质量工程师，供应商筛选至首件放行 | 新项目导入、供应备份、复购一致性 | 主体/证书范围、首件与批次追溯、额外费用、验收争议 | 资格审查→比较报价范围→确定文件包与放行节点 | ISO证书、校准记录、报告样本、供应链责任；先索取资格材料，再提交或确认 RFQ |
| 次要：汽车/摩托车开发团队，原型适配阶段 | 进气、节气门壳体、中冷器、盖板原型 | 接口/间隙、核心件供方、焊接、功能验证责任 | 比较原型结构→确认供货范围→定义测试目标 | 接口图、组件责任表、真实加工/连接能力；不能把原型照片当功率或冷却性能验证 |
| 次要：样件逆向与混合小批量采购，需求不完整 | 无完整图纸、多个料号、后续小批次 | 隐藏结构、材质未知、建模知识产权、最低经济批量、修订控制 | 确定测量/建模范围→试样批准→批次计划 | 测量/建模交付约定、修订与验收；应允许先讨论样件而非强迫立即填完整图纸 |

上述客户优先级来自当前目录、工序素材与站点业务，不是流量/询盘统计结论。英语国际采购是现版本可支持的语言方向；亚洲、北美、欧洲仅为公司自述服务区域，没有国家级成交数据，不据此选择广告市场或创建国家页。

不优先扩展：找现货价格/标准货号的零售买家、只问改装功率增益的消费者、要求未证实行业资质即可采购的医疗/航空项目、无关工业百科流量。1 件 MOQ不等于所有低价消费订单都值得拓展。按图加工中固定公开价格、统一材料最佳牌号、通用质保数字并非必须；必须交代影响价格的因素、报价输入、明确的确认方式。

### A3. 前五项决策障碍

1. **公司承诺已有，公开核验链不足。** ISO、报告与材料文件交付已有公司确认记录，不能删成“未确认能否提供”；但公开 ISO编号/范围/有效期、设备行程/负载、校准与完成订单报告仍不具备核验条件。
2. **图片来源说明不一致。** 产品35张当前展示图均指向 imagegen 抠图结果；图库没有来源入口/AI修饰或CAD区分。塑料/铜材/不锈钢能力 hero 与首页生成主图也缺少对应可见说明，尽管部分指南已标注。
3. **适配模块与 Service overview 重复且语义错位。** `EngineeringScope` 自动拿 `items[0]` 及标题正则匹配，导致材料牌号出现在 Geometry、五轴机床范围出现在 Material & finish，并在下方再重复。
4. **相似产品和导航联动缺少选择理由。** 5服务菜单与4工艺详情导航不同；相关产品按标签评分，铜/黄铜示例会推荐铝壳体而没有用途解释；两类进气歧管和五个铸壳页差别需要前置。
5. **商业口径的上下文与转化可读性需收紧。** 首页只写 `7–14 business days` 未就地说明生产/起算点/运输；产品传入询价的是旧长SEO名；付款条件与不合格救济边界还不完整。当前邮件草稿流程真实可用，但不等于销售已接收。

## B. 产品、意图地图与固定可答性题集

### B1. 10能力系列的需求—意图—页面

以下关键词均为基于当前目录、工程问题和英语页面的**候选表达**，没有搜索量、地区排名或竞争难度数据。“有答案”与“支持证据”分别判断，系列页总体“部分”不意味着其所有问题都没回答。

共同源文件：`src/pages/capabilities/[slug].astro`、`src/data/capabilityContent.ts`、`capabilityOverview.ts`、`orderDeliverables.ts`、`materialGrades.ts`。对应现有锚点：`#engineering-fit`、`#service-summary`、`#part-examples`、`#capability-scope`。系列数量是当前页面输出的匹配数，有交叉归类，不能相加当产品总数。

| 系列/匹配数/优先级 | 客户任务与关键问题 | 代表性候选意图词；需求依据 | 当前URL/模块与回答状态 | 可发现性/证据问题 | 现页优先修正 |
| --- | --- | --- | --- | --- | --- |
| CNC milling /26/P1 | 多面壳体、深腔、孔位是否能按基准加工；哪些特征需专检 | `custom CNC milling housings`, `deep pocket machining`, `CNC milling tolerance review`；目录壳体/孔位及工序图 | `/capabilities/cnc-milling-service/` 适配+工序+条件公差；部分 | 26项默认3例，全部由按钮展开；公差有条件但无实测关联 | 用“几何→加工/检验要点→相应例子”替换重复总述；设备范围链接可核验资料 |
| CNC turning /12/P1 | 轴/衬套/接头；侧孔、螺纹、密封面如何定义 | `turned shafts with cross holes`, `custom threaded fittings`, `turning and milling`；12例和车后铣素材 | `/capabilities/cnc-turning-service/` Threads、process delivery、原照；部分 | 可描述二次加工但无最大直径/长度及适用夹持条件 | 现有原照前后合并重复；加受控范围（收到资料后），螺纹/配合输入保留 |
| 5-axis /14/P1 | 多面与连续曲面选择3+2还是联动；大件是否可装夹 | `3+2 vs simultaneous 5 axis`, `5 axis impeller machining`, `five axis part size`；现有技术说明/叶轮类示例 | `/capabilities/5-axis-cnc-machining/#engineering-fit` 路线区别完整；实际设备适配未验证 | 机床范围未公布，`Materials & size`混段重复；照片不证明特定联动模式或数值 | 让3+2/联动解释前置；尺寸归Size；向Factory有范围的设备表连接 |
| Casting machining /8/P1 | 谁供毛坯、余量、铸造缺陷与成品验收谁负责 | `CNC machining supplied castings`, `pump housing finish machining`, `casting machining allowance`；5个铸壳异常变体 | `/capabilities/casting-machining/` scope、交付、`#sample-to-part`；部分 | “非自有铸造证明”在折叠scope，图纸/毛坯责任对直接入口不够前置 | 首段说 finish machining / supplied or agreed blank；铸前/铸后责任小表，不新增Foundry页 |
| Aluminum /8/P1 | 6061/7075/3003用途、薄壁、阳极后配合 | `aluminum enclosure machining`, `anodized machined housing`, `6061 7075 custom parts`；壳体/汽车原型 | `/capabilities/aluminum-cnc-parts/` grades、原始壳体照片、工艺；部分 | 牌号重复到Geometry；3003可被理解成所有零件选项 | 3003限定相应中冷器组件；只保留一次牌号表；连接壳体配合/遮蔽要求 |
| Stainless /3/P1 | 303/304/316L/17-4PH选材、热处理与钝化文件 | `stainless turned shafts`, `316L machining traceability`, `passivated machined parts`；轴/定位销 | `/capabilities/stainless-steel-cnc-parts/` grades、inspection；部分 | hero为生成图但caption只“Turned component detail”；照片无牌号证明 | 图注说明示意；把服务选项与图中材质分开；明确文件由订单规定 |
| Copper/brass /1/P2 | 电接触与流体密封各查什么；材料限制、镀层是否可接受 | `custom brass fittings`, `copper electrical contacts machining`, `brass alloy verification`；单一综合示例 | `/capabilities/copper-brass-cnc-parts/` 原始批次图/grade/inspection；部分 | C36000与指南原手册C3600需核对；单例却多跨工艺标签 | 保留1例，不制造空分类；两条用途入口+合金标识核对；相关页改为接头而非铝壳 |
| Plastic /4/P1 | PEEK/PTFE/POM等能否适用；调湿/温度/薄壁怎样验收 | `custom PEEK PTFE machining`, `plastic machining measurement conditions`, `machined insulating parts`；4例 | `/capabilities/plastic-machined-parts/` scope、grade、process delivery；部分 | 既为5服务又只在材质快捷导航；hero修饰说明缺失；Grade混进Geometry | 服务快捷入口保持5项；材质筛选独立；强调grade/conditioning，不推导医疗电气合规 |
| Prototype /12/P1 | 是验证装配还是功能；从样件/模型到下一版 | `CNC prototype fit check`, `automotive prototype machining`, `sample to machined part`；汽车6例及通用原型 | `/capabilities/prototype-machining/` scope、planning figures；部分 | 汽车例容易让通用仪器客户觉得不适用；同一尺寸段重复 | 前置验证目标；各选一个通用壳体和汽车例；链接样件审批，不承诺自动功能验证 |
| Low volume /6/P1 | 多料号/复购如何控版本、首件、抽样和费用 | `high mix low volume CNC`, `pilot batch machined components`, `repeat order inspection`；HMLV例/比较指南 | `/capabilities/low-volume-production/` scope、planning figures；部分 | 低批量不是单一工艺；“Is this process…”及通用装夹段不贴任务 | 改任务标题“Plan a repeat batch”；订单表字段+首件放行/抽样+范围价格说明 |

同义词由上述主页面承接。应用、问题解决、供应商审查与询价指南做不同任务支持，不建 manufacturer/supplier 两套页，不拆国家页，不把所有变体单独新建URL。使用维护问题只在定制件有真实范围时补：例如装配/清洁/储存条件及交付边缘保护；LZZ不是已验证整机供应商，不编整机维修手册或通用保养周期。

### B2. 固定采购问题集 v1（50题，不删除难题）

冻结日期2026-09-28。后续复验必须保留ID和原题；问题变更需单列新版。状态：**完整**＝对这个具体问题已有足够明确正文（不等于商业事实独立核验）；**部分**＝有相关答案但缺必要条件/依据/边界；**缺失**＝当前页面未提供所问内容；**未验证**＝页面有正面声明但该核验任务不能凭现有公开证据完成。公开不可查的材料不拿内部台账替网站回答。缺失题引用最近相关原文仅用于证明已有内容到哪里为止，明确不把它当答案。下表不计算“AI引用率”或搜索需求覆盖率。

| ID / 冻结问题 | 当前URL/定位与英文原文 | 状态 | 判定、缺口与验收目标 |
| --- | --- | --- | --- |
| Q01 这是按图加工还是可以买现货？ | 任一 `/products/{slug}/` 首部：`Made to your approved drawing and quotation, including the material, dimensions and acceptance criteria. Not a stock item.` | 完整 | 定制范围清楚；不能因无库存/固定价格扣分 |
| Q02 最低订购量是多少？ | `/insights/faq/#ordering-1`：`Orders start at 1 piece.` | 完整 | 已有公司授权口径；不要求补造分级MOQ |
| Q03 7–14天从哪天起，是否含表处和运输？ | `/insights/faq/#ordering-2`：`Production takes 7–14 business days after drawing and order confirmation, including surface finishing. Shipping time is additional.` | 完整 | FAQ/产品页明确；首页摘要需同地保留范围，实际履约仍未独立验证 |
| Q04 RFQ应提交哪些图纸、版本和单位？ | `/insights/rfq-checklist/#section-2`：`Label the part number, units and drawing revision. If the files disagree, identify which document controls before requesting a quotation.` | 完整 | 已含STEP/2D、控制文件、材质/数量；无需重写新指南 |
| Q05 没图纸只有样件能怎么开始？ | `/insights/how-we-work/#section-3`：`If you are working from a sample, explain the fit and function you need to retain or change, including any change of material.` | 部分 | 有流程；缺扫描/重建输出格式、建模费用/权属/误差和客户批准边界；补现有sample模块 |
| Q06 什么时候需要NDA，网站默认保密协议成立吗？ | `/insights/rfq-checklist/#section-6`：`If your project needs an NDA or a controlled transfer method, contact LZZ before sending restricted files. An NDA is not automatically created by using this website.` | 完整 | 程序答案充分；受控传输渠道与法律文本不在本轮验证范围 |
| Q07 固定价格不公布时如何比较总报价？ | `/insights/how-we-work/#quotation-scope`：`Separate charges: tooling, special documentation, freight and duties where applicable, stated in the quotation.` | 部分 | 已有成本项；付款币种/节点、工装归属、报价有效期未公开，需商务确定 |
| Q08 在网站点按钮是否就发送成功？ | `/quote/`：`No inquiry is sent or files uploaded here.` | 完整 | 草稿与发送明确；接收状态不能由本站宣称 |
| Q09 铣削适合哪些几何，如何准备深腔/薄壁？ | `/capabilities/cnc-milling-service/#capability-scope`：`Mark deep pockets and small internal corners, along with thin sections that need tool-access or workholding checks.` | 完整 | 适配提示与开放设计变更要求完整；不等于给定任意深宽比能力 |
| Q10 铣削±0.01mm是否适用于整件所有尺寸？ | `/capabilities/cnc-milling-service/#reference-figures`：`It is not a default or guaranteed tolerance.` | 完整 | 条件写明；图纸逐特征确认，不新增更小公差 |
| Q11 车削件侧孔/扁位是否需要其他工序？ | `/capabilities/cnc-turning-service/#capability-scope`：`Cross-holes, flats or slots can require secondary machining, depending on their position relative to the turned features.` | 完整 | 已回答，接车后铣工序研究 |
| Q12 可加工多长/多粗轴件？ | `/capabilities/cnc-turning-service/#engineering-fit`：`We check tool access and clamping space to confirm that the part fits the machine.` | 部分 | 能提供逐图流程；没有直径/长度/夹持范围表，不能自行推定 |
| Q13 3+2和联动5轴有什么区别？ | `/capabilities/5-axis-cnc-machining/#engineering-fit`：`Indexed 3+2 positioning presents an angled face to the tool, then cuts with the rotary axes held in position.`；`Simultaneous five-axis motion changes tool orientation during the cut for suitable continuous contours.` | 完整 | 技术区别已存在；把这两句保留并去掉上下重复 |
| Q14 我的尺寸/重量能否由LZZ实际5轴设备加工？ | `/capabilities/5-axis-cnc-machining/#service-summary`：`Machine travel, load and maximum part envelope are not published here; share the model, stock size and part dimensions or weight for review.` | 未验证 | 缺在用机型、行程/负载、装夹后包络及条件；图片无法代替 |
| Q15 铸件加工是否表示LZZ有自有铸造厂？ | `/capabilities/casting-machining/#capability-scope`：`These examples do not establish an in-house foundry service.` | 完整 | 已明确边界，应前置到非折叠适配区 |
| Q16 铸件毛坯缺陷和余量不足谁负责？ | `/capabilities/casting-machining/#capability-scope`：`Identify responsibility for casting supply, rejected blanks and any sample-based reconstruction; a photo is insufficient to define internal geometry.` | 部分 | 提醒明确责任，但没有实际接收/拒收/责任流程；商务工程补到报价范围 |
| Q17 铝牌号和热处理状态如何指定？ | `/capabilities/aluminum-cnc-parts/#capability-scope`：`Specify alloy, temper and stock form.` | 完整 | 6061/7075/3003是不同场景选项；不把列表当图中材料证明 |
| Q18 阳极后哪些尺寸需保护/验收？ | `/capabilities/aluminum-cnc-parts/#capability-scope`：`For anodized or other finished parts, mark masked fits, cosmetic faces and post-finish acceptance dimensions. Treat color requirements separately from geometry.` | 完整 | 有明确输入；最终膜厚/标准按实际订单，不能由照片反推 |
| Q19 不锈钢页面照片都能当316L吗？ | `/capabilities/stainless-steel-cnc-parts/#capability-scope`：`The grades are not interchangeable, and the material of each pictured part has not been verified.` | 完整 | 正确避免替换牌号；此限制在上部Material块亦需简短出现 |
| Q20 钝化/电抛后文件和尺寸能如何确定？ | `/capabilities/stainless-steel-cnc-parts/#capability-scope`：`If passivation or electropolishing is requested, specify the applicable requirements and the dimensions that must be accepted after treatment.` | 部分 | 有要求，质量页有文件承诺；缺具体处理标准/供方责任/样本，不能推已完成工艺认证 |
| Q21 铜/黄铜电接触与流体接头如何区别询价？ | `/capabilities/copper-brass-cnc-parts/#capability-scope`：`For contacts, show mating area and fastening details. For fittings, state thread standard, seal arrangement and the intended fluid environment.` | 完整 | 已有功能拆分，宜做两条短入口而非新建两个类目 |
| Q22 手册C3600与产品C36000到底选哪个？ | `/insights/material-and-finish-checklist/#section-4`：`In particular, verify the intended C3600 designation before quoting.`；铜能力页：`C36000 brass and tellurium copper are named options in the copper and brass service.` | 部分 | 已披露冲突但未解决；需原手册/标准体系/采购牌号确认，禁止编辑者静默纠正 |
| Q23 塑料检验要考虑温度/调湿吗？ | `/capabilities/plastic-machined-parts/#capability-scope`：`Agree measurement and conditioning requirements where material behavior affects acceptance.` | 完整 | 现有内容已能帮助填写条件；不统一编造所有聚合物测试温度 |
| Q24 塑料绝缘件照片能证明电气/医疗合规吗？ | `/capabilities/plastic-machined-parts/#capability-scope`：`a product photograph is not evidence of electrical, food-contact or medical compliance.` | 完整 | 否定边界充分；确需这些资质的订单另核验 |
| Q25 打样前应该定义什么目标？ | `/capabilities/prototype-machining/#capability-scope`：`State the goal: packaging, assembly, appearance or a specific functional test. A prototype does not automatically validate a production design.` | 完整 | 目标明确；应把通用样件例与汽车样件例并列 |
| Q26 样件到下一版谁供试验夹具、谁批准？ | `/capabilities/prototype-machining/#capability-scope`：`If testing is required, identify who supplies the fixture and test procedure and who evaluates the result.` | 部分 | 提出责任问题但项目默认安排未定；现有审批步骤不能替代签核边界 |
| Q27 混合小批量如何管理料号、版本和数量？ | `/capabilities/low-volume-production/#capability-scope`：`Provide a part list with revision, quantity and material for each item.` | 完整 | 已有清单与共配合要求，不另造HMLV百科 |
| Q28 复购首件/抽样/追溯文件怎样约定？ | `/capabilities/low-volume-production/#capability-scope`：`Specify first-article reporting, subsequent sampling and traceability requirements with the quotation request.` | 部分 | 文件交付已承诺；缺默认与加价包边界/实际样本，按质量页集中补 |
| Q29 “Ultra high precision”页有可保证公差吗？ | P03 `#engineering-review`：`The catalog title specifies no numerical tolerance.` | 完整 | 已降级旧标题；无依据时不新增数值；下文材料范围仍属公司声明 |
| Q30 High-volume turned页能证明订单产量能力吗？ | P11 `#engineering-review`：`The catalog title makes no capacity commitment.` | 完整 | 已明确不是产能保证；Factory约100k也只是组合参考 |
| Q31 中冷器能证明冷却效果/指定车款适配吗？ | P13 `#engineering-review`：`It provides no proof of cooling performance.` | 完整 | 深入段已区分core、端箱、焊接及漏检≠冷效；先保留而非重写 |
| Q32 节气门是完整电控总成还是机械壳体？ | P16 `#engineering-review`：`The throttle-body example covers mechanical housing interfaces. Electronic control performance has not been established.` | 部分 | 深部有边界，标题仍“electronic throttle bodies”；首部应明确machined housing / assembly scope by quote |
| Q33 两个进气歧管页面各适合什么问题？ | P15首部：`Runner geometry, velocity stacks, flanges and plenum connections.`；P17：`Curved runners, velocity stacks, injector bosses and fuel-rail mounting features.` | 部分 | 差异已有；缺相互解释链接/标题前置，不据相似词就删页或301 |
| Q34 定位销是裸件还是带弹簧机构？ | P33 `#engineering-review`：`Clarify whether the inquiry is for a component or a complete assembly.` | 部分 | 行程/力/寿命需定义；供货范围尚待询价；首部提示更合适 |
| Q35 铝壳体图片能当IP等级/密封验证吗？ | P34 `#engineering-review`：`an enclosure example does not imply a tested ingress-protection rating.` | 完整 | 限制清楚，保留独立环境测试需求 |
| Q36 所谓铝HMLV例是否只能下铝件订单？ | P35 `#engineering-review`：`The aluminum-focused title does not limit the options to aluminum.` | 部分 | 内容已纠偏，但短标题仍Pilot-run machined aluminum components，与materialSubjects排除冲突；应改为mixed-material/pilot-run标题 |
| Q37 产品展示图能核查原始样件形状吗？ | 所有产品`#part-information`：`Use the photo to compare the shape and features with your part. It does not specify the alloy, dimensions or inspection results.` | 部分 | 有规格边界，但图库未标AI抠图/CAD或给原图入口；不能因保留在内部就算客户可核查 |
| Q38 能否公开核对ISO持证主体/范围/有效期？ | `/quality/#quality-management`：`For supplier qualification, ask LZZ for the certificate details and applicable scope.` | 未验证 | 有认证声明和内部授权；无公开证书核验链，不判虚假，也不判资格核验通过 |
| Q39 能否看到与图纸/批次对应的完成测量结果？ | `/quality/#inspection-records`：`No customer report or measurement result is published on this site.` | 缺失 | 空白报告格式已存在但不是实测报告；补脱敏且获许可样本或受限索取流程 |
| Q40 CMM是否可核对当前量程和校准状态？ | `/quality/#inspection-equipment`：`Ask us to confirm the instrument range and supply current calibration evidence.` | 未验证 | 原照存在，当前量程/校准证书未公开；不能当已校准证明 |
| Q41 工序研究是否证明真实客户交付成果？ | `/cases/five-axis-machining-multi-face-parts/` About these photographs：`They do not confirm material grades, dimensions or inspection results, and no customer is identified.` | 完整 | 正确说明证据边界；真实结果案例仍缺，但不能把研究页叫伪客户案例 |
| Q42 能否核对每月100k件针对什么组合/期间？ | `/factory/#production-capacity`：`Actual monthly output depends on part geometry, material, finishing and the production mix.` | 未验证 | 已有限制；未给期间/组合/工时/订单统计，不能替代新订单产能承诺 |
| Q43 谁做表面处理，外协责任怎样界定？ | P09 `#part-information`：`Finishing can use in-house operations or specialist suppliers, depending on the treatment.` | 部分 | 有外协提示；缺各处理在厂/外协划分、验收/返工责任，集中改材料指南即可 |
| Q44 运输条款、文件、税费怎么明确？ | `/insights/custom-cnc-parts-shipping-checklist/#delivery-package`：`The quotation states who arranges transport, customs clearance and duties; DDP is not an automatic inclusion.` | 完整 | 已有目的地/具名地点/承运/文件/生产与运输区别，不报物流缺失 |
| Q45 不合格零件如何提出问题？ | `/insights/how-we-work/#section-2`：`If a delivered part appears nonconforming, send the drawing revision, part or batch reference, affected quantity, photographs and measurement details.` | 完整 | 接续有比对验收标准/协商纠正动作；初始反馈流程已回答 |
| Q46 返工/补件/退款、反馈时限与运费由谁承担？ | 同Q45：`We review the discrepancy against the agreed acceptance criteria and agree the corrective action with you.` | 部分 | 不是售后完全缺失；缺救济选项和责任条件；商务定范围，不杜撰统一质保年限 |
| Q47 付款币种、节点、银行验证和报价有效期是什么？ | 最近相关 `/insights/how-we-work/#section-4`：`Confirm the quantity and price, along with delivery terms and the inspection documents you need.` | 缺失 | 当前全文未提供所问交易条款；添加需商务确认，暂不编TT比例或承诺 |
| Q48 有可用的采购准备下载吗？ | `/insights/rfq-checklist/#section-1`：`This is a buyer worksheet, not an inspection report.` | 完整 | `/downloads/order-acceptance-checklist.txt`真实存在988字节，内容是空白输入项；浏览器下载/编码由主代理扩验 |
| Q49 准备草稿后如何知道销售已收到/何时答复？ | `/quote/`：`Add any response deadline to your project notes.`；源码结果态：`This website cannot confirm delivery; check your Sent folder.` | 部分 | 站内不能确认接收，亦无答复SLA；此功能设计已如实说明；收件与回复政策需独立落实 |
| Q50 我是否可以把官网例子视为我的行业批准？ | `/about/#applications`：`Any required industry approval or certification must be confirmed separately.` | 完整 | 网站未承诺航空/医疗等项目批准；保留逐项目确认，不因列应用就判已合规 |

Q49结果态引文明确标为源码结果态，不以静态未生成状态冒充当前浏览器实测；其页面可答性依据同时有静态“未发送”和回复deadline说明。固定题集评价的是这些具体问题；任何“完整”项也不能自动证明所提服务过去履约成功。

### B3. 35产品全量枚举、异常与处理

P编号供本报告交叉引用，不是站点SKU。每个slug前加 `/products/`、后加 `/` 即完整当前路由，未省略或合并页面。共同代码定位：`src/pages/products/[slug].astro`；分项内容来自 `productSummaries.ts`、`productDetails.ts`、`manufacturing.ts`、`presentation.ts`；图片来自 `refinedImages.ts`/`Gallery.tsx`。共有问题：图像来源说明与原图入口、重复材料段、7个固定资源链接；每页同时保留现有不同的工程问题。

| ID / 当前slug | 当前展示标题与独特决策内容 | 专项状态、异常及处理建议 |
| --- | --- | --- |
| P01 `custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm` | Multi-axis milled cavities & angled parts；深腔/孔/曲面，角半径/刀具可达性 | 部分：多材料是服务范围；与五轴能力页分工为几何例，保留现URL |
| P02 `custom-oem-high-precision-cnc-milling-manufacturer` | Milled instrument blocks & brackets；歧管/内孔交叉/不可达去毛刺 | 部分：材料未指定已明示；优先把隐蔽流道与清洁/漏检区别前置 |
| P03 `ultra-high-precision-machining-services` | Precision machining for complex geometry；叶轮/曲面、钛/Inconel/硬化不锈钢选项 | 部分：旧标题不是精度数值；“Continuous 5-axis”有服务自述但无该零件验证；补机型与对应记录 |
| P04 `global-oem-precision-machining-solutions` | Ring housings & angled components；车削轴线与斜向孔/面关系 | 部分：标题已具体；给turn-mill实例理由，别退回global solutions口号 |
| P05 `global-manufacturer-of-multi-sided-precision-machined-components` | Multi-sided machined components；流道/安装面/斜口共同基准 | 部分：保留结构与流体接口差异；适用原照与所示catalog例不能混认同一订单 |
| P06 `custom-oem-cnc-turning-manufacturer` | Custom CNC-turned components；轴套/法兰、侧孔、尺寸/跳动 | 部分：例页与车削服务页近似；突出该图可见特征，通用服务参数回链能力页 |
| P07 `custom-rotary-cylindrical-components` | Rotary & cylindrical components；侧孔/槽/扁位角向关系 | 部分：任务区分充分；与车后铣研究做有解释双向链 |
| P08 `custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer` | Turned fittings, connectors & flanges；NPT/BSPT/metric、密封结构 | 部分：有压力/漏检单独验收边界；没有现成压力额定值是合理，需确认供货测试范围 |
| P09 `full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing` | Milled metal brackets & finished housings；按基材分处理选项，明确可能外协 | 部分：是可保留的独特采购任务；补处理责任，不用新增Finishing一级栏目 |
| P10 `custom-high-precision-machining-for-structural-aesthetic-components-oem` | Structural & aesthetic components；承载/配合与可见面分开、雕刻和外观样板 | 部分：材料未指定；不要把漂亮图变成颜色/表粗验收样板 |
| P11 `high-volume-cnc-turning-for-complex-internal-external-features` | Complex internal & external turned features；内台阶/槽/密封面、抽样 | 部分：旧high-volume不等产能；SPC只是目录所述，缺真实过程能力记录 |
| P12 `high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem` | Turbine & fluid-system components；轮廓模型、平衡/流量/漏检边界 | 部分：没有效率或可靠性评级；可保留功能风险专属内容 |
| P13 `custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier` | Aluminum intercooler prototypes；6061/3003、TIG、core供方、焊后检验 | 部分：深入内容已有；明确组件/装配供货范围与试验条件，不写车型直装/增效 |
| P14 `custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier` | Billet aluminum engine covers；下侧间隙、紧固/密封、外观与遮蔽 | 部分：深入内容已有；需要安装包络与外观许可材料，不新编适配车型 |
| P15 `custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier` | Billet intake manifold prototypes；runner/多件flange/plenum连接 | 部分：与P17差别已有但不显眼；短副题“Runner and flange interfaces”，互链P17 |
| P16 `custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier` | CNC-machined electronic throttle bodies；主孔/轴孔/电机室 | 部分：深部说仅机械壳体；首部/标题明确 housing，不暗示电控已验证 |
| P17 `custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier` | Billet aluminum intake manifolds；injector bosses / fuel-rail mounts | 部分：可与P15保留独立例图；副题“Injector and fuel-rail interfaces”，保留两者原URL |
| P18 `custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier` | Billet aluminum intake plenums；容积/过渡/节气门法兰，非功率增益证据 | 部分：定义体积几何不等流量结果；与歧管按接口类型连接 |
| P19 `custom-cnc-machined-castings-transmission-housings-pump-bodies` | Transmission housings & pump bodies；花键/内流道/法兰，毛坯责任深入段 | 部分：作为铸壳优先深入例；收到双方图纸后才能核验 |
| P20 `custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier` | Stainless steel turned shafts；轴径/台肩/车铣角向关系 | 部分：不同于P32侧重grade/traceability；保留几何任务区别 |
| P21 `custom-oem-cnc-machined-non-metallic-components-insulating-parts` | Non-metallic & insulating components；绝缘隔板、载荷/材料属性另验 | 部分：不代表电气认证；保留图示结构与应用审批分界 |
| P22 `custom-oem-cnc-machined-plastic-parts-manufacturer` | Custom machined plastic parts；多个聚合物、roller/seal/gear/wear | 部分：材料选项非所示件规格；普通服务信息回链塑料能力页 |
| P23 `oem-precision-cnc-machined-casting-housing-structural-enclosures` | Cast housings & structural enclosures；肋/深腔/轴承孔关系 | 部分：与P19按轴承支承/壳体结构区分，比较选项不要泛称同一housing |
| P24 `oem-precision-cnc-machined-casting-housings` | CNC-machined casting housings；中心孔/花键/样件未知尺寸 | 部分：聚焦样件逆向与花键；不填未确定材质 |
| P25 `precision-cnc-machined-castings-custom-oem-housings` | Machined castings & OEM housings；密封面/轴承配合/螺纹接口 | 部分：聚焦功能表面与铸件缺陷边界；以差异表与P19/P23连接 |
| P26 `precision-cnc-machined-castings-manufacturer` | Precision-machined castings；隐藏齿形/流道/截面要求 | 部分：首次可见HTML常规链接图不能到达，noscript全表与“View all”可达；不是绝对孤立页。增具语义的铸件选择入口 |
| P27 `precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances` | Complex-geometry plastic components；薄壁/深腔、调湿/温度深入段 | 部分：tight tolerances旧名不提供数值；已充分说明验收条件，保留 |
| P28 `precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier` | Turned brass & copper components；导电/密封两用途、镀层深入段 | 部分：相关产品当前为pilot-batch/铝壳/多轴，缺用途理由；优先关联P08与工艺比较 |
| P29 `precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier` | Pilot-batch housings & mating parts；混合车/铣/铸件、成组配合 | 部分：与P35用“matched assembly vs mixed-material repeat releases”区分；缺真实批次例 |
| P30 `precision-machining-for-functional-plastic-blocks-structural-components` | Functional plastic blocks & structures；盲孔/嵌件/孔深和平行度 | 部分：功能清楚，牌号待指定；保持此边界 |
| P31 `precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures` | Small-batch aluminum enclosures；薄壁/复合角、坯料是billet还是casting | 部分：与P34用stock/setup vs lid/gasket区分，避免同一句小批量壳体摘要 |
| P32 `precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier` | Stainless steel turned parts；牌号/处理文件深入段 | 部分：已纠正并非全部316L；别为SEO重新把316L当所有照片材质 |
| P33 `precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier` | Indexing plungers & locking pins；行程/啮合/弹簧/功能责任 | 部分：需首部明确component vs assembly；没有寿命额定值，不补造 |
| P34 `small-batch-cnc-machining-manufacturer-complex-aluminum-housings` | Complex aluminum housings；盖板/垫圈/密封/表处后尺寸深入段 | 部分：环境等级无实测，保留不暗示IP；可作为询价演示主例 |
| P35 `small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv` | Pilot-run machined aluminum components；实际包括不锈钢/黄铜/塑料 | 部分：标题与材料主题筛选不一致；改展示短标题为“Pilot-run mixed-material components”，URL保持 |

八个深入工程变体确认为P13、P14、P16、P19、P27、P28、P32、P34；不是仅抽查这8页。本轮对全部35页读了具体材料/用途/检查内容，其余27页较短但并非自动薄内容判定。产品大多是“几何示例+按图供应”，不适合硬塞固定尺寸参数表；可以增加定义需要的字段，但不能伪装成所拍件真实规格。

## C. 导航与联动方案

保留当前一级结构：Capabilities、Part Examples、Factory & Quality、Knowledge Center、About LZZ、询价；保留现有URL。主菜单/能力总览的5服务与详情快捷导航的4工艺口径不同：详情导航改用`primaryServices`，材料与订单类型筛选继续独立，避免改变组合筛选语义。

`ProductExplorer.tsx`有完整noscript链接目录。按`scriptingEnabled:false`解析，全部正常页从首页可达、最大2次点击；不得把P26判为孤页或索引阻断。有JS初始精选列表的选择理由仍可改善。

| 来源及模块 | 建议链接文字→目标 | 推进的任务 |
| --- | --- | --- |
| 五轴适配区 | `Review equipment scope` → `/factory/#equipment` | 从工艺选择进入实际设备核查；资料齐后才展示范围 |
| P28相关示例 | `Compare threaded fitting requirements` → P08 | 电接触与密封接头比较，替换无解释的铝壳推荐 |
| P15接口说明 | `Injector and fuel-rail interfaces` → P17 | 区分两个歧管示例 |
| 产品检验模块 | `Plan your inspection documents` → `/quality/#order-documentation` | 明确文件包后询价 |
| Quality认证区 | `Discuss supplier qualification` → `/quote/?part=Supplier%20qualification` | 有目的地索取证据，不绕到企业荣誉 |

首页→能力→五轴→产品→询价已由主代理走通；产品直接进入应先看供货边界，再查检验；指南直接进入应先看到比较结论再看图片；应用入口沿About既有行业→对应例子→检查要求推进。暂不新增Applications一级栏目。

## D. 核心六页整改

以下仅为方案。共用模板改动需复验10能力/35产品；主代理视觉附录用于决定间距和折叠，不凭源码宣称视觉通过。

| 页面及源文件 | 保留与具体修正、英文样例 | 推荐模块顺序；资料/验收 |
| --- | --- | --- |
| 首页；`components/HomeEditorial.astro` | 保留定位、工厂原照和精选件；hero交期补`Production after drawing and order confirmation; finishing included, transit extra.`，不改变承诺；生成主图加简短示意说明 | 定位/有条件承诺→例子→工厂→质量→工艺/材料→RFQ；核对main中数字附近条件完整 |
| 五轴；`pages/capabilities/[slug].astro`、`components/EngineeringScope.astro` | 保留3+2/联动区别；用显式字段替换`items[0]`及标题正则；尺寸归Size，删重复Service overview。标题`Choose the motion your geometry needs` | 用途→路线区别/尺寸条件→3例→原照→图纸检验→询价；待设备表；验收无重复、无材质栏混入机床范围 |
| 产品P16及共享模板；`pages/products/[slug].astro`、`components/Gallery.tsx` | 首部明确`Machined throttle-body housing`；图注区分AI修饰/CAD并提供原图入口。保留深入工程段；压缩重复材料与7个通用资源链接 | 名称/图源→用途/供货范围→关键接口→选项→检验→相关例/询价；验收原图可达、无完整电控性能暗示 |
| Quality；`pages/quality.astro` | 保留流程、空白报告及订单文件承诺；资格入口`Request certificate and calibration details`。认证区压缩重复说明，别将企业奖项当ISO证据 | 检查阶段→设备/条件公差→文件包→资格材料→询价；需证书/校准/脱敏报告，未取得不发布空证书模块 |
| 工厂；`pages/factory.astro`、`data/company.ts` | 保留100k参考限制、原照和订单交付；设备表收到材料后写机型/范围/限制/更新日，不能拿照片推数值 | 工厂身份→设备范围→原照→流程/交付→产能条件→询价；需台账、统计口径；逐项与资料一致 |
| 询价；`components/QuoteForm.tsx`及产品CTA | 保留“未发送”、复制/下载；带短标题、来源URL和稳定ID，不再只带旧SEO长名。付款与救济范围由商务确认后补订购指南 | 任务/上下文→必要输入→草稿→附图发送→后续说明；验收上下文不串单，草稿事件不叫收件成功 |

## E. 首批优先任务

1. 先修首页交期上下文、产品图片来源和P16/P35标题边界。材料大部分已有；小幅图注/文案改动，复验公开正文与图片入口。
2. 再合并能力重复段、统一服务快捷导航、调整上述定向内链。无需扩页；复验10系列语义、筛选及既有锚点。
3. 修询价短标题/来源上下文；保留草稿机制。复验生成、复制、下载、清空/恢复，不发真实商业询盘。
4. 并行收集资格/设备/订单样本与商务条款，取得授权后补Quality、Factory、订购指南。首批完成条件是关键范围可查、责任可理解，而非新增文章数量。暂缓批量Blog、国家页及大规模URL调整。

## F. 资料清单与验收结论

立即可做：重复去除、字段归位、条件前置、图源说明、定向内链和询价上下文。企业需补：ISO主体/范围/有效期、在用设备及装夹范围、校准和脱敏实测样本、材料/处理追溯、C3600牌号确认、付款/报价有效期及返工费用责任；指定负责人、允许公开范围与版本日期。

本地技术及指定浏览器链路已通过主代理复验，详见其附录；正式域名/CDN、重定向执行、收录、真实用户性能、邮件接收与销售跟进仍未验证。内容可答性不等于排名、AI引用或履约能力；不提供总分掩盖这些差异。

一个不了解LZZ的目标客户，当前已能从核心入口判断其按图加工定位、基本适配方向和询价步骤；最难完成的是“凭什么相信这次订单能达到要求”。第一批应改良首页承诺条件、能力适配、产品图源与范围、Quality/Factory证据入口及询价上下文，保留已有工程答案和设计结构，待真实材料到位再完成供应商资格核验。
