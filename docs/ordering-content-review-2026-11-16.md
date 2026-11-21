# RFQ & ordering 六篇深化记录 — 2026-11-16

## 范围与交付边界

以用户明确给出的 http://127.0.0.1:4321/resources/ordering/ 为范围。实际读取 Resources 导航、RFQ & ordering 入口和去重后的全部六篇文章；入口无分页链接。没有把技术指导的14篇、产品页或页脚推荐纳入本次修改。目标继承全球英语B2B买家及产品工程师；英文正文保持现有拼写习惯。本轮交付本地修改，未发布到 Cloudflare。

真实稿源：src/data/resourceEditorial.json 的六个 ordering 键，经 resourceSearchReview.ts 接入既有资源文章组件。全部原始H1、SEO标题、描述、目录标题/简介、URL、章节ID保留，修改正文与六篇updated字段。原始发布日期和作者从既有文章元数据保留；真实实质修订日为2026-11-16。六条lastmod同步到pageLastModified.json，构建生成sitemap；未把构建时间作为更新日期。栏目入口文案不变。

## 六篇成果与职责

- **What determines the cost of a CNC machined part?** — /resources/ordering/cnc-machining-cost-factors/
  - 原稿正文约1746词；修订正文约2027词（不含图形组件、推荐、公共CTA）。
  - 报价中的钱花在哪些实际工作上？ 比较报价由 comparison 承接；资料由 RFQ 承接；数量释放由 batch 承接。
  - 本地预览：http://127.0.0.1:4321/resources/ordering/cnc-machining-cost-factors/
- **Prepare a CNC machining RFQ** — /resources/ordering/rfq-checklist/
  - 原稿正文约794词；修订正文约1221词（不含图形组件、推荐、公共CTA）。
  - 怎样把一个或多个零件变成可报价、可追踪的询价包？ 报价选择由 comparison 承接；批准证据由 prototype approval 承接；尺寸定义由 drawing guide 承接。
  - 本地预览：http://127.0.0.1:4321/resources/ordering/rfq-checklist/
- **How to compare CNC machining quotations** — /resources/ordering/compare-cnc-machining-quotations/
  - 原稿正文约667词；修订正文约1010词（不含图形组件、推荐、公共CTA）。
  - 几份报价实际包含什么，哪一份总价可用于同口径判断？ 成本机理由 cost 承接；文件由 RFQ 承接；释放数量由 batch 承接。
  - 本地预览：http://127.0.0.1:4321/resources/ordering/compare-cnc-machining-quotations/
- **What does prototype approval actually release?** — /resources/ordering/machined-prototype-approval-checklist/
  - 原稿正文约768词；修订正文约1090词（不含图形组件、推荐、公共CTA）。
  - 样件证据支持哪项批准，接下来允许做什么？ 几何关系由 hole-pattern/drawing 指南承接；材料处理由 masking 承接；数量与路线由 batch 承接。
  - 本地预览：http://127.0.0.1:4321/resources/ordering/machined-prototype-approval-checklist/
- **Moving from a CNC prototype to a small batch** — /resources/ordering/prototype-vs-small-batch-cnc/
  - 原稿正文约727词；修订正文约1129词（不含图形组件、推荐、公共CTA）。
  - 样件之后应释放多少件，路线或版本改变时要核对什么？ 批准结果由 prototype approval 承接；报价费用由 cost/comparison 承接；具体壳体与塑料接口由产品指南承接。
  - 本地预览：http://127.0.0.1:4321/resources/ordering/prototype-vs-small-batch-cnc/
- **Packaging and shipping CNC machined parts** — /resources/ordering/custom-cnc-parts-shipping-checklist/
  - 原稿正文约782词；修订正文约1203词（不含图形组件、推荐、公共CTA）。
  - 怎样让合格零件在交付后仍可用、可识别、可核对？ 图纸包由 RFQ 承接；塑料测量状态由 plastic measurement 承接；法律/海关义务以目的地与合同资料为准。
  - 本地预览：http://127.0.0.1:4321/resources/ordering/custom-cnc-parts-shipping-checklist/

逐篇全文另存项目记录的“完整修订稿”文件夹；它是正文交付副本，实际网站以源文件和预览为准。保留原有图片、表格、FAQ、复制模板和询价组件；新增表格沿用ce-guide-table和data-label适配。

## 保留与改动

保留 setup $240 + $18/件（1/10/50件）和工装$300÷$4=75件的假设算例；A/B十件报价、0.20mm直径/0.10mm径向间隙、10+40件试产决策、10+3+5=18工作日运输算例均保留其条件。新增A/B十一件算例只复用原假设：120+11×32=472，11×43=473；明确实际数量改变需重新报价。

保留“from 1 piece”及原资料7–14 business days的起点、含表面处理、运输另计及实际报价确认条件。未创造新的交期、报价、检验能力、测试、客户成绩、保证、认证或合同条款。November 2022包装照片的历史说明、未知客户/目的地/承运信息保持原边界。

19处正文操作集中解决原文缺口：重复费用边界、估时口径、多零件文件清单、开放决策负责人、审批排期、报价缺项状态、工装权益问题、报告对应实物、样件异常关闭、换夹具首件、在制品处置、生产释放与分批交付、保护接触点、目的地木包装、单证核对。逐段复读时删去原运输段重复的报价约定句；新增段使用具体对象和动作，不增加整齐划一FAQ，不插入“SEO研究”“AI生成”之类后台说明。

## 关键词与真实数据

六篇原有20候选词各自保留去向，共120条；本轮新增36条相关问题候选词。候选清单不是每篇必须逐字出现26次/词的要求。原稿中实际精确出现的候选短语由脚本检查未丢失，其余用自然语义覆盖或交给相应页面。供应商选择、样件批准和批量采购保持分工；“prototype machining services”的纯服务需求交给已存在工艺页。新增词没有实测搜索量或趋势时均标未核验。

Google Ads Keyword Planner于2026-11-16在已登录Chrome中实际读取。历史窗口2025年11月至2026年10月，Google、所有位置、所有语言，输入英文查询；这不能冒充仅英语用户统计。14个输入词独立显示13行，cnc machining quote没有独立行，未挪用quotation的新数值。8行有范围，5行无数值；无数值不等于零搜索。广告竞争程度不等于自然搜索难度。

当前范围：cnc machining cost为1000–10000；cnc machining rfq为10–100；cnc machining quotation为100–1000；first article inspection为1000–10000；small batch cnc machining和low volume cnc machining各100–1000；cost calculator为10–100；vci packaging为1000–10000。前三月变化里small batch、low volume和calculator均-90%，不能把它们称为近期上涨词。其余已显示主要行三个月及同比为0%，不保证未来需求。

Google Trends另外实际查看cnc machining cost，Worldwide、Web Search、All categories、Past 5 years；262周点，仅88非零。排除可能未完成的2026-11-15周，最近52周均值47.63、前52周13.52；最近13周25.31、之前13周51.62。长窗口升、短窗口降，且出现地区高度集中，不能写成“持续上涨”。指数不是月搜索次数，不能套用到其他长尾词。其他词本轮没有单独重新量测Trends，历史2026-11-08记录仍保留原数据不足标签。DataForSEO两项API返回403后已用浏览器读到上述实际数据；不是把API失败当做市场无需求。

本轮未取得各URL级GSC查询/排名/点击数据，因此没有判断原稿无排名、没有计算流量提升、没有自然难度分数。没有对排名前十做逐页竞争审计，不将来源参考等同于SERP竞争结论。原有GSC数据仍是后续效果验证需要的输入。

## 来源及适用边界

- [Penta machining cost](https://www.pentaprecision.co.uk/resources/how-much-does-cnc-machining-cost)：成本驱动背景；不引入其价格或工厂能力。
- [Protolabs machining design tips](https://www.protolabs.com/resources/design-tips/how-to-reduce-cnc-machining-costs/)：原有刀具/几何成本引用保留；不据此设LZZ壁厚或精度保证。
- [FedEx mechanical parts packing](https://www.fedex.com/en-ag/shipping/packaging/how-to-pack/how-to-ship-automotive.html)：螺纹、接头和易损表面保护；未套用其地区运价、重量限额或承运承诺。
- [USDA APHIS wood packaging](https://www.aphis.usda.gov/plant-imports/wood-packaging-material)：US进口受管制木包装与加工木材区分；正文限定US。
- [European Commission wood packaging and dunnage](https://food.ec.europa.eu/plants/plant-health-and-biosecurity/trade-plants-plant-products-non-eu-countries/requirements-wood-packaging-dunnage_en)：EU非欧盟进口raw wood与完全加工木材区分；混合箱体需按实际材料核对，未声称LZZ木箱获认证。
- [Trade.gov export documents](https://www.trade.gov/common-export-documents)：商业发票与装箱单职责及交易/目的地条件；不提供未经确认HS编码或税率。
- 既有[ICC Incoterms checklist](https://library.iccwbo.org/content/clp/Others/incoterms_2020_checklist_2024-update.pdf)保留。额外读到[ICC C/D规则说明](https://academy.iccwbo.org/incoterms/article/incoterms-2020-c-or-d-rules/)用于核对交货与费用/风险边界；未改动客户合同。
- src/data/resources.ts 是既有from1piece及7–14工作日条件来源；当前产品/工艺/基础指南仅用于确认接口与内链，不扩展修改范围。
- SAE AS9102公开摘要只说明其有明确FAI文件要求，付费全文未读取；没有新增AS9102条款、合规或LZZ具备此资质的断言。

新增表格为采购核对工具，不是实际客户项目或虚构质量记录。新增费用、批准、库存等建议是对本稿问题的编辑分析；具体接受范围仍由项目资料确定。

## 核验与未完成项

已完成并通过：npm run check（1050文件，0错误、0警告、9提示）、npm run build（157静态页面）、npm run test:site（226 HTML，9919本地引用、694章节引用）、npm run test:seo（96 sitemap URLs）。构建后桌面1440和手机390共12篇次检查无缺段、无图片丢失、无溢出、无页面错误；39个main内独立内部链接目标及锚点均有效。原有表格、图注、图片、链接和PRE模板保留，Article标题/作者/发布日期/修订日及citation与可见正文一致。栏目入口文案和另14篇正文完全不变。六篇sitemap lastmod均为2026-11-16，其他日期记录未动。

实际查看了六篇桌面与手机关键段截图。发现RFQ、样件异常、分批数量三个新增三列表格在390–429px文本列中拆词过碎，已改成两列并缩短行名；重新构建、站点/SEO及12视图复核通过，最终截图再次目视确认。保持既有组件、CSS、CTA与表单逻辑。记录见render-validation.json、all-main-link-validation.json、visual-refinements.json及validation-summary.json。

交付附表：范围总表.csv、栏目分工.csv、深化清单.csv、关键词去向与证据.csv；逐篇全文见完整修订稿文件夹，预览链接见各篇记录。9个项目提示涉及未使用变量与弃用图标等，未扩展成本次范围之外的代码整理。

后续效果衡量需要发布后GSC页面查询/点击/展示，以及真实询盘与转化数据。本轮不提供无依据SEO/GEO分数，不承诺排名或AI引用。未获得当前发布指令，因此仅本地交付。缺少业务测试、报价或客户记录没有用假案例填补，也没有因此留下影响核心结论的待确认断言。
