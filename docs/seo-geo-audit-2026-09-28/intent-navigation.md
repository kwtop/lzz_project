# C. 搜索意图—页面覆盖矩阵

观察日2026-09-28。主站相对URL统一对应本地审计站。A类本站需求数据未提供；B编号对应research.md查询/同行观察；C为待验证假设。以下是**28项已研究/假设采购任务**，不是全行业查询全集；不输出流量加权覆盖率。全部查询语言English，地区未固定；SV/KD/CPC Unknown。

可发现性：主=主导航；二=二级；栏=栏目页；文=正文链接；脚=页脚。抓取条件另见F，不把“有入口”当作“已收录”。

|ID/产品线/角色|阶段/具体问题|代表查询|依据|主URL|回答状态|可发现性|缺口与动作|优先|
|---|---|---|---|---|---|---|---|---|
|I01 综合/采购|发现：是否直接制造定制件|custom CNC machining manufacturer China|B Q1–4中|/factory/|部分回答|二+脚|补设备表、内部/外协边界；已知厂址保留|P1|
|I02 铣削/工程师|选型：口袋孔位适合什么路线|CNC milling service custom housings|B Q1中|/capabilities/cnc-milling-service/|部分回答|二|已有几何清单，补一个有依据的装夹/特征解释|P2|
|I03 车削/工程师|选型：车后铣还是单一路线|CNC turning with milled flats|B Q8中|/capabilities/cnc-turning-service/|部分回答|二|连接车后铣研究；补直径/长度适用条件待设备资料|P1|
|I04 五轴/工程师|选型：3+2还是联动|3+2 vs simultaneous 5 axis machining|B Q8/WayKen强|/insights/cnc-process-selection/|部分回答|二+文|现有表增加两种模式，不另建近义页|P1|
|I05 五轴/采购|预筛：能不能装下我的零件|5 axis CNC machining maximum part size|B WayKen设备表中|/capabilities/5-axis-cnc-machining/|部分回答|二|明确尚无包络数据；补已核验设备/夹具条件|P1|
|I06 铸件/工程师|询价：铸造由谁负责|machining castings supplier supplied blanks|B Q7中|/capabilities/casting-machining/|部分回答|二|已排除自有铸造推断；明确供料、缺陷与补料责任|P1|
|I07 铸件/工程师|选型：余量和基准如何交代|casting machining allowance datums|B Q7中|/capabilities/casting-machining/|部分回答|二|增加空白标注示意；不复制旧标准默认余量|P2|
|I08 铝/研发|选材：6061与7075如何比较|6061 vs 7075 CNC machining|B Q5低+C|/capabilities/aluminum-cnc-parts/|部分回答|栏+文|已有牌号，缺条件性比较结论；引用材料厂资料|P2|
|I09 不锈钢/研发|选材：303/304/316L/17-4PH区别|304 vs 316L CNC machined parts|B Q5低+C|/capabilities/stainless-steel-cnc-parts/|部分回答|栏+文|增加环境/热处理/加工选择维度；不做通用医疗认证主张|P2|
|I10 铜黄铜/电气工程师|选材：导电与切削要求|copper vs brass CNC machining|C中|/capabilities/copper-brass-cnc-parts/|部分回答|栏+文|统一牌号口径；C3600源文歧义不当作报价牌号|P1|
|I11 塑料/工程师|选材：POM/PEEK/尼龙何时用|POM vs PEEK CNC machining|B Q5低+C|/capabilities/plastic-machined-parts/|部分回答|栏+文|增加温湿度/负载/级别依赖比较；不承诺电气合规|P2|
|I12 原型/研发|采购：可以1件吗|one piece CNC prototype MOQ|B Q3强|/capabilities/prototype-machining/|完整回答|栏+文|保留1件起，明确不是库存SKU|保留|
|I13 小批量/采购|计划：样件如何转复购|prototype vs small batch CNC production|B Q1/2中|/insights/prototype-vs-small-batch-cnc/|部分回答|栏+文|已有版本/采样问题，补公司确认的变更签核流程|P2|
|I14 综合/采购|核价：报价包含什么|CNC machining cost factors quote|B Q6强|/insights/how-we-work/|部分回答|二+脚|补成本构成/包含另计表，拒绝编价格区间|P1|
|I15 综合/采购|排期：周期起算含表处吗|CNC machining lead time finishing|B Q3中|/quote/|完整回答|主CTA|保留确认后7–14工作日含表处、运输另计|保留|
|I16 综合/SQE|核验：ISO主体范围有效期|ISO 9001 CNC supplier certificate|B Q1–4强|/quality/|部分回答|二+脚|认证主张有，公开证书详情无；补真实证据|P1|
|I17 综合/SQE|验收：量具校准与实测文件|CNC first article inspection CMM report|B Q3/4强|/quality/|部分回答|二+文|空白格式不是报告；增加脱敏样本与申请范围|P1|
|I18 综合/工程师|验收：是否所有尺寸±0.01|CNC machining tolerance 0.01 mm|B Q1中|/quality/|完整回答|二+文|已正确否定通用保证；保持条件与来源|保留|
|I19 表处/采购|定义：膜厚遮蔽与检验时点|CNC anodizing dimensions masking|C中|/insights/material-and-finish-checklist/|部分回答|栏+文|有需求字段，缺本厂可提供标准/外协流程|P1|
|I20 综合/OEM|询价：需要什么文件|CNC RFQ drawing STEP checklist|B Q2–4强|/insights/rfq-checklist/|完整回答|二+脚|保留图纸/单位/版本/数量清单|保留|
|I21 样件/OEM|开发：无图纸能否重建|CNC reverse engineering from sample|C中|/capabilities/casting-machining/|部分回答|栏+文|已有扫描/建模说明，补样件交付和模型审批责任|P2|
|I22 综合/采购|风险：NDA及受控文件传输|CNC machining NDA drawings|B Q3中|/insights/rfq-checklist/|部分回答|二|已要求先联系；确认可用渠道/流程，不写自动NDA|P1|
|I23 综合/物流|交付：包装与运费责任|shipping CNC parts Incoterms packing|C中|/insights/custom-cnc-parts-shipping-checklist/|部分回答|栏+脚|清单明确但无确定条款；补真实可提供选择及named place示例字段|P1|
|I24 综合/采购|风险：付款/不合格怎么处理|CNC supplier payment nonconforming parts|B Q3中|/insights/how-we-work/|仅提及词语|二+脚|付款口径缺失；不合格仅要求商议，补政策后发布|P1|
|I25 综合/采购|验证：真实出口到哪里|CNC manufacturer export case study|C低|/insights/custom-cnc-parts-shipping-checklist/|无法核验|栏+脚|照片不证明目的地；有脱敏运输记录再增加案例模块|P2|
|I26 零件/工程师|比较：图中零件可直接购买吗|custom billet aluminum engine cover|B Q1低+C|/products/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/|完整回答|栏+文|已明确made-to-order；增加相邻零件的功能区别而非虚拟SKU|P2|
|I27 综合/OEM|询价：是否已经发送或上传|send drawing CNC machining quote|B Q4中|/quote/|完整回答|主CTA|明确草稿/邮箱附图/用户发送，继续保留|保留|
|I28 综合/采购|核验：联系人与公司是谁|LZZ Precision Hangzhou manufacturer|C中|/about/|部分回答|主+脚|身份/地址明确；补真实审核岗位、证书有效期维护机制|P1|

I13现有资源为 `/insights/prototype-vs-small-batch-cnc/`；维护同一需求主承接，不新增同义页。

## D. 导航内容扩充表

现有名字按当前MainNavigation.astro，非旧截图的Custom Parts/Quality独立一级菜单。

|现有入口|任务与当前内容|动作及精确落位|依赖/优先|
|---|---|---|---|
|Capabilities > All Machining Capabilities|按工艺/材料/订单阶段选择|保留三条入口；在Choose a process后加简短路线对照，引导现有比较指南|无新增业务事实；P2|
|Capabilities > CNC Milling|判断口袋/孔/多面加工|Engineering fit保留一份摘要；细节集中Drawing & inspection；相关工序挑最匹配两条|工程审核；P2|
|Capabilities > CNC Turning|轴类/螺纹/复合加工|补车削包络表和车后铣责任；内链turning-then-milling研究|设备资料；P1|
|Capabilities > 5-Axis Machining|多面/曲面与设备适用性|在Engineering fit插入模式和包络条件，链接Factory设备行；不发布万能精度|设备/工艺负责人；P1|
|Capabilities > Casting Machining|从铸坯到接口|增加“Who supplies the blank?”责任表，保留非自有铸造边界|供料/退料规则；P1|
|Capabilities > Materials（锚点）|四材料页入口|保留栏目入口；四页各补短比较表，公共指南解释标准/检验字段|材料工程审核/一手数据；P2|
|Capabilities > Prototype & small batch（锚点）|订单阶段选择|原型页明确批准目标，小批量页补批次释放/版本变更；比较指南负责教育|销售/质量流程；P2|
|Capabilities > Starting with a sample（锚点）|无图客户入口|现有sample模块补交付物/审批/费用边界；链接铸件页，不新建一级|工程/销售；P2|
|Part Examples|按几何找参考|保留35例筛选与noscript；详情用简短正式显示名，相关工序人工校验|已有数据；P1|
|Factory & Quality > Our Factory|核验制造身份|现有设备区增加真实清单/内部外协边界；照片日期保留|工厂负责人；P1|
|Factory & Quality > Quality Control|核验检验和体系|Records补脱敏证据；Certification补真实证书字段及核验入口|质量负责人；P1|
|Factory & Quality > Workshop Process Studies|看工程经验|五篇保留；每篇补一个工程师确认的决策与理由，不改称客户成功案例|工程师/公开授权；P2|
|Resources > All Buyer Guides|按采购任务阅读|现有三分组保留，卡片写明读后可完成的决定|编辑；P2|
|Resources > Drawing & RFQ Checklist|整理询价包|保留；增加受控文件处理的公司正式路径（有资料后）|销售/信息管理；P1|
|Resources > Compare Machining Processes|工艺选型|现有表增加3+2/联动的条件比较，连接四工艺页|工程师；P1|
|Resources > How to Order|报价、样件、批次、交付|Quote review之后加费用、付款、变更和不合格处理；到Shipping指南正文链接|商务政策；P1|
|About LZZ|身份、团队、公司资料|Company overview中的documents保留；明确认可与ISO区别；档案放下方|证件有效期/授权；P1|
|Get a quote（主CTA）|准备邮件草稿|保留当前流程；在未来单独授权时优化产品显示名与返回页链接|本轮不改表单；P2|
|Footer|回到主要采购入口|现有分组与页头相符，不重构；可在Resources加Material & Finish Guide文本链接|现有页面；P2|

### 当前导航树

```text
[主] Capabilities
  [二] All Machining Capabilities -> /capabilities/
  [二] CNC Milling / CNC Turning / 5-Axis Machining / Casting Machining
  [二] Materials -> /capabilities/#materials
    [栏] Stainless steel / Plastic / Copper & brass / Aluminum（各有现有URL）
  [二] Prototype & small batch -> /capabilities/#production-stages
    [栏] Prototype machining / Low-volume production
  [二] Starting with a sample -> /capabilities/#sample-to-part
[主] Part Examples -> /products/ -> [栏] 35个零件详情
[主] Factory & Quality
  [二] Our Factory / Quality Control / Workshop Process Studies
    [栏] 5个工艺研究
[主] Resources
  [二] All Buyer Guides / Drawing & RFQ Checklist / Compare Machining Processes / How to Order
    [栏] 其余指南与公司活动文章（共8个详情）
[主] About LZZ -> /about/
  [文] Company overview / people / workshop / company documents / archive
[主CTA] Get a quote -> /quote/
[脚] Explore / Factory & Quality / Resources / About / Email / WhatsApp / Privacy
```

### 建议调整后（不新增一级导航、不改变URL）

```text
[主/二] 全部原样保留
  Capabilities
    [栏/文] 4工艺 -> 几何适用 + 条件范围 + 对应真实工序 + 图纸询价
    [栏/文] 4材料 -> 条件比较 -> material-and-finish-checklist
    [栏/文] 2订单阶段 -> prototype-vs-small-batch
  Part Examples
    [文] 示例已知信息 -> 选项 -> 精确对应工艺/检验 -> 询盘
  Factory & Quality
    [文] Factory设备行 <-> 对应能力页Engineering fit
    [文] Quality证据/证书 <-> About公司认可文件（不混称）
  Resources
    [文] How to Order内“Quote scope / Payment / Changes / Nonconformance”
    [文] Material指南 <-> 4材料页；Shipping指南 <-> How to Order
  About
    [文] Company overview内保留Documents，不恢复独立Documents子菜单
[脚] 保留现有组；Resources可增加Material & Finish Guide
```

### 新页面必要性判定

本轮**0个必建新URL**。报价成本先放How to Order；牌号比较先放材料页；五轴模式先放既有比较指南。真实出口案例需独立背景/运输记录/公开许可后再评估；国家页、多语种、标准品商城均暂缓。若未来GSC联合维度和客户问题证明某模块有独立需求且有足够一手内容，再形成独立Brief、双向入口和维护责任。
