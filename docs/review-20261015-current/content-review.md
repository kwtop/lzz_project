# About、Resources、Quote 与工具页：现行源码独立内容评审

评审日期：2026-10-15。范围：当前 `src/` 的实际路由、组件、数据、样式与图片注册表，并复核主评审提供的当前桌面/手机截图（详见第9节）。只交付报告，未修改业务代码、图片、规范或部署。未读取旧方案/报告的设计结论，也未沿用旧方案来判定页面。源码结论与截图观察分别标明；没有截图覆盖的正文不宣称已完成视觉验证。

## 1. 结论与优先级

当前信息并非不足，主要问题是同一采购任务在多个层级被反复解释，读者很难判断哪个模块才是主内容。应让每页交付一个明确结果：About 帮人确认供应商，流程页明确双方责任，指南输出检查表或决策记录，Quote 输出邮件草稿。不要通过删除报价条件、FAQ、原始记录来缩短页面。

| 优先级 | 当前问题与实际来源 | 影响 | 建议处理 |
|---|---|---|---|
| P1 | `AboutOverviewRedesign.astro` 与 `AboutProfileRedesign.astro` 同用 `workshop-wide`、同一 `companyFacts`、相似定制加工导语；overview 的四个 `paths` 后又有三个 `assurance` | 从概览进入简介像重新开始；入口与介绍竞争 | 概览成为供应商导航页，只保留一句主体定位、一张小型真实车间图和三个采购任务入口；完整事实与证件只在简介展开 |
| P1 | `AboutProfileRedesign.astro` 在证件前展开工程范围、4 个应用领域，另有 7 个折叠领域；证件后又放发展历程和两条人物新闻 | 为核验主体/证件来的读者要越过大量泛用内容 | 简介顺序改为主体事实→供应商证件→工程/工厂范围→发展简述；应用转为相关能力入口；人物故事归新闻 |
| P1 | `AboutWorkflowRedesign.astro` 的 `review/sample/packing` 三组 Buyer/LZZ/Agree 长文，与报价比较、样件审批、批量和运输指南多处重叠 | 页很长，但阶段产出与批准条件仍不突出 | 按阶段用“买方提供 / LZZ 确认 / 共同形成的记录”责任表；详细教学清单留给指南，只保留订单责任、付款、样品费用、变更、售后原文事实 |
| P1 | RFQ 六项 quick checks 后又有 3 组字段详解，最后才是可复制模板；见 `resourceApproved.ts`、`contentGuides.ts` | “我要准备一封询价”被多个描述层阻挡 | 模板和复制/下载动作前移；六项改成短目录，详解作为字段说明；核心字段及 NDA 提示保留 |
| P1 | `QuoteForm.tsx` 的 prepared 状态同时显示 `fields.project` 和含同一 Message 的 `draft.full` | 最重要的 Open email app 被第二份正文推到下方 | 保留一份完整可选择的草稿预览，收件人/主题做紧凑摘要；动作同时放在预览前和底部；不能删掉复制、保存、修改 |
| P2 | Resources 的 8 篇指南普遍以同等的 `.rs-module` 64px 间距推进；手机仍 48px；结束统一 “Next decision + RFQ” | 关键表格与辅助说明层级相近，阅读像连续章节 | 各指南以自己的主产出开场：比价表、图纸清单、样件判定表、工艺比较表等；次要说明放相应表下，不再每条都开独立大模块 |
| P2 | FAQ 15 问全部展开，每问都有答案与独立链接（`ResourceFaqRedesign.astro`、`resourceFaq.ts`） | 找一个答案要浏览一整篇文字 | 保留 15 问，前三个购买问题直接可见；其余按三组可展开问答；深链进入时展开目标，搜索及 FAQ Schema 与可见内容一致 |
| P2 | 证件经 `AboutRedesignPhoto.astro` 输出普通图片，当前组件无原图链接；旧 `AboutCredentials.astro` 有，但它不是当前简介的渲染路径 | 图存在不代表采购能看清并核对原件 | 每张证件明确增加“View original document”；原件用途、打印日期/有效期与当前证件请求分开显示 |
| P3 | 404 只有四条并列链接，Privacy 结构已经相对清楚 | 工具页无需重设计成营销页面 | 404 保持短，按任务区分去向；Privacy 加短目录即可，不增加图片 |

## 2. 覆盖与当前入口

`src/data/redesignRollout.ts` 将 `/about/`、`/resources/` 全家族启用。不能用仍留在仓库的旧 `AboutOverview.astro`、`ResourceGuidePage.astro` 的旧分支作为现状证据。

- About：概览、简介、流程、联系、新闻目录、5 篇新闻，共 10 个实体页面；`/about/company-documents/` 当前 301 到 `/about/company-profile/#documents`。
- Resources：总目录、Ordering guide、Machining guides、8 篇实用指南、FAQ，共 12 个实体页面。
- 旧 `/resources/drawings-and-ordering/` 与 `/resources/production-and-shipping/` 301 到 Ordering guide；两个 `custom-cnc-machined-components-for-prototypes-and-production` 旧入口已 301 到 Critical features。不能将这些再次提为待合并的独立文章。
- Quote、Privacy、404 各 1 页。本文没有新增 URL、改变 canonical、删除旧锚点或改变重定向。

主要源链：Resources 路由 → `ResourceGuidePage.astro` → `ResourceGuideRedesign.astro` → `resourceApproved.ts` → `contentGuides.ts` / `procurementGuides.ts` / `resourceReading.ts`；指南内容存在变换组合，应按最终 `approvedResourceGuides` 评估，不能仅按原始数据全文判断实际重复。

## 3. 按任务定义最终模块

### 3.1 About 概览：选择下一步供应商核验

用户任务：快速判断这是什么公司，以及去哪里核验证件、加工范围、订单责任。

最终模块顺序：

1. 主体定位：LZZ Precision、完整法律名称、Hangzhou、按图定制 CNC。保留一张真实车间图作环境确认；三个统计不在这里再铺满一行。
2. 三条任务入口：`Verify the supplier`（简介与证件）、`Review the order process`（流程）、`Contact LZZ`（询价/文件/来访）。入口每条一行解释所能取得的结果。
3. 一条真实活动记录预览：优先车间来访，日期、照片、两行摘要、新闻目录链接。会议/团建仍在新闻库可访问，不在概览重建第二个新闻列表。
4. 有图纸者进入 Quote 的单一行动区，保留“网站生成草稿，附件与发送在邮件客户端完成”。

来源处理：`paths` 与 `assurance` 合并，ISO 请求入口收进供应商任务；`companyFacts` 移由简介完整承载；news `records` 从两项降为一项预览，未删除新闻。

桌面：主体文字与小型实景图并列，下方三条同宽任务行；不做三张宣传卡。手机：定位→任务入口→照片/新闻→行动，任务入口先于大图。内链：`/about/company-profile/#documents`、`/about/how-we-work/`、`/about/contact/`、`/about/company-news/`、`/quote/`。图片：仅保留真实 workshop-wide 与一条来访记录，不需要新生成人物或厂房。

### 3.2 Company profile：取得主体和证件核对依据

最终模块顺序：

1. 公司身份摘要：法律名称、地点、2017、1,500 m²、40+ machining & supporting equipment；团队 15+ 年经验放工程范围，不混成公司经营年限。
2. 供应商文件：ISO 9001 当前证件请求为清晰单行入口；三张已有原始文件分别展示用途、打印日期/有效期、原图查看。不得将教学基地/高新/科技型企业文件当成 ISO 或行业资质。
3. 工程与工厂范围：简述图纸、基准、装夹与刀具可达性，链接 capabilities 和 factory。用 workshop-aisle 辅助；与首屏 workshop-wide 二选一主图，避免同一页连续展示两张环境图。
4. 公司发展：保留 5 条事实，只有 2017 是明确年份，其他条目不画成有虚构年份的时间线。可压成 3–5 行发展概述。
5. 下一步：请求文件或准备询价，二者名称明确。

具体迁移：`applications` 11 个领域的描述与现有 href 保留到能力/零件探索层；简介只留一条 `Explore relevant part examples` 和少量相关入口。`People and workshop visits` 两项移回新闻目录；简介最多留一条文字入口，原始照片仍在对应新闻。

桌面：首屏事实表占左侧；证件区每行小缩略图+用途/日期/原图链接，避免三张大证件将阅读分成多屏。手机：身份摘要→ISO 请求→三项文件可展开摘要，原图可独立打开；不用缩小证件字来硬塞屏幕。图片：见文件清单，证件不可生成、补字、替换印章或推算有效状态。

### 3.3 How we work：确认 LZZ 与买方的订单责任

最终模块：

1. 订单条件条：From 1 piece；7–14 business days **after drawing and order confirmation, including finishing; transit additional**；payment/sample charges agreed in quotation。三项不可拆掉限定条件。
2. 五阶段责任表：Drawing review → Quotation → Sample approval → Production/inspection → Handover。每阶段只写输入、责任与交付记录。
3. 商业与样品条款：付款方式/币种/各阶段金额；样品加工/设置/运费及可能抵扣；单列费用/排除项。这些是本页主内容，不能只移入 FAQ。
4. 变更、非合格品与售后：版本变化对价格/路线/工期的影响；报告所需 revision、batch、quantity、照片/测量；保修期间和起算、排除、纠正措施、返运与退款责任待订单约定。
5. 直接进入 RFQ 或各阶段的详细工具。

来源处理：`review/sample/packing` 中通用的图纸字段解释、样件检查方法、包装保护细节分别交给 RFQ/Prototype approval/Shipping 指南；原页保留责任和确认产物，并用原锚点衔接。inspection 四条整理为“本单需确认的检查与记录”；保留并非默认 100% inspection、照片不证明校准/结果的准确边界，但表述紧贴相应记录字段。

桌面：五行责任表或纵向流程，固定列名 `Buyer provides / LZZ confirms / Record before proceeding`；commercial 与 after-sales 两个短节。手机：阶段按 1–5 顺序，每阶段重复明确的角色标签，不把长三列机械压成连续散段。图片：最多一张 CMM 或历史包装图作辅助，详细包装档案归 Shipping 指南；不能让长图成为进入条款前的阻碍。

### 3.4 Contact：选择咨询事项并取得联系方式

最终模块：

1. 直接联系方式：email、WhatsApp、Hangzhou UTC+8。
2. 三种任务：New part inquiry（Quote）、Supplier documents（现有 qualification mailto）、Existing order / discrepancy（联系邮件与必备 reference）。每项只列发送时需提供的最少内容。
3. Workshop visit：现有完整地址、提前约定日期与讨论零件/工艺、visit mailto；真实车间照片仅在此处作地点环境辅助。

来源：当前 `Prepare a machining inquiry` 的四项清单与 RFQ 重复，压成“drawing revision, quantity and requirements”一句加 checklist 链接；文档/订单两块上提，不放在地址大图之后。桌面：联系方式栏+任务列表；地址一段。手机：联系方式与任务先出现，地址/照片最后。Quote 的侧栏地址可改成 Contact 链接，保留 email/phone 快捷方式。无需地图示意图或虚构门面图。

### 3.5 Company news：浏览带日期的真实公司记录

目录保留 5 条完整记录和 `Workshop & events / Team life` 分类。每条只有日期、事件名称、缩略图、最多两行事件摘要；不再重复图片说明中的“Original company photograph”作为独立阅读层。真实性标记保留在图片来源属性和图注所需位置。

| 详情页 slug | 页面任务与最终内容 | 来源/处理 | 图片编排与内链 |
|---|---|---|---|
| `australian-customer-workshop-visit-january-2025` | 日期/来访概述→部件讨论→车间参观照片→相关工厂信息 | `approvedNewsPlans` 覆盖后的 cover 为 03；保留 7 Jan 2025 来源标签，不自行改日期。01 源图存在内部日期核验事项，不把可疑照片细节用于增加事实 | 首图03；04/02/05为车间组；01为桌边交流。桌面一大两小或按组整齐呈现，手机每组先短标题后图；去 factory |
| `china-africa-west-lake-summit-2025` | 19 Nov 2025、参会与展示→展位/会场记录 | 保留“attended / display”，不能扩展成签约、成交、合作或背书 | 01首图，02/03展位，04/05会场；去 capabilities 与新闻目录 |
| `may-2025-lzz-team-outing` | May 2025 团建→户外用餐→夜间合影 | 时间精度保持月份；正文避免逐图复述“照片显示了…” | 01首图，02用餐，03/04夜间；去 company profile |
| `november-2025-hangzhou-lizhizao-group-activity` | 30 Nov 2025、水边团建→烧烤与用餐 | 使用 `aboutApproved.ts` 后的 03/05/04 图片组，避免遗漏04 | 01首图，02群像，03/05/04活动；去 company profile |
| `lzz-team-outing-2024` | 2024 团建→出行与用餐→户外活动 | 不补造日期、人数或文化成效 | 01首图，02/03行程，04/05/06活动；手机可折叠“More photographs”保留全部原图访问，去 company profile |

详情共同结构：标题、日期、地点（只在已知时）、一句事件摘要→2 个相片组→最多两条相关记录。组说明与图注各司其职：组说明解释活动，图注描述具体可见内容。无需每页结尾强推询价。原始档案保留全部照片；精选显示与完整档案可分层，不删除记录。

## 4. Resources：按买方正在做的决定组织

### 4.1 三个目录

| 页面 | 最终模块及内容 | 来源处理 | 桌面/手机与内链 | 图片 |
|---|---|---|---|---|
| `/resources/` | 顶部“准备询价 / 比较与下单 / 定义技术要求 / 快速问答”任务索引；8 条指南直接入口；2 个空白模板集中在工具区 | 保留 `resourceLibrary` 8 项与 FAQ；当前首屏与工具区两次 Inquiry brief 下载合为一个主下载入口，其他处可作为上下文小链接 | 桌面任务索引+两组清晰列表；手机每条显示“任务→产出”，避免先读 group description 再读同义 summary；有直达具体文章链接，不强制经二级目录 | 不需要装饰首图 |
| `/resources/ordering-guide/` | 询价→比价→样件/批量→发货四阶段，每阶段一个“本阶段要形成的记录”加工具链接；页末单独链接 LZZ 商业责任 | `orderingStages` 与 `ResourceDirectoryRedesign` 合并每阶段重复介绍；保留 RFQ/验收模板下载入口 | 桌面4行阶段表；手机4段紧凑编号列表。去5篇 ordering guide 和 How we work | 无需图片 |
| `/resources/processes-materials-finishes/` | 从3个任务直接选：选择工艺、定义材料表面、标记关键特征；真实几何研究作辅助入口 | 当前3篇列表已合理；压短大段“See real geometry”说明，保留研究不等于验收记录的边界 | 桌面3条任务行；手机垂直列表。每条显示具体输入/输出，不再添加泛用 hero | 无需图片；真实研究留链接 |

### 4.2 八篇指南的主产出与最终模块

每页首屏先回答“完成后你会拿到什么”，给短目录/关键输出，随后完整工具。不是每篇都要有相同的图片、事实条与结尾模块。正文末尾只保留与下一决定有关的两条链接和一个与当前任务一致的 Quote 草稿入口。

| 页面/任务 | 最终模块顺序与必须保留的内容 | 具体来源处理 | 布局与内链/图片 |
|---|---|---|---|
| `rfq-checklist`：准备一份可报价资料包 | ①可复制询价模板+Copy/Download；②文件/验收、材料/表面、数量/交付3组字段说明；③空白验收 worksheet；④Quote | `rfqQuickChecks` 六项改短锚点；`drawing-package/material-finish/commercial-brief` 所有要求保留，模板不重复解释全文；保留 model/drawing 控制文件、sample 未知材质、multi-axis stock dimensions/weights、NDA before confidential drawings、开放问题 | 桌面模板旁字段目录，说明按组展开；手机模板操作先到达，模板可展开且正文仍可搜索；去 critical features / material / shipping / factory。无需图片 |
| `compare-cnc-machining-quotations`：取得同口径比价记录 | ①一句相同 revision/model/material/finish/quantity/arrival/acceptance 前提；②8行 comparison 表为主体；③例外和未报价项处理；④最终 accepted quote record | `procurementGuides.ts` 的 comparison/unresolved-items/quote-record 保留；`resourceApproved` intro 的长串字段与表格第一行合并显示，避免再开“同要求”长文 | 桌面3列原表；手机每个检查项按“比较内容/待解决问题”分组，不让 row labels 消失；去 RFQ / sample approval / How we work。无装饰图 |
| `critical-features-cnc-drawing`：得到可测量图纸标注清单 | ①功能与基准责任两句；②6行 feature-checklist；③文件冲突/版本释放清单；④真实几何示例作为可选辅助 | `function-first` 标准链接保留；`material-and-project-scope` 与 release-files 收成一个“释放前检查”块，材料详情链接材料页；study-context 不再成为与主清单等重的大节 | 桌面表格优先，单图放辅助侧栏/表后；手机清单先于照片；去 material、sample approval、factory。用 `multi-feature-milling-parts`，不生成带虚构尺寸的工程图 |
| `machined-prototype-approval-checklist`：形成样件批准/有条件批准/不批准记录 | ①用途/检查者/批准者/原型差异；②7行检查表；③approval-record 三种决定+开放项；④单独 batch release | `evaluation` 与 `approval-record` 用醒目的输入/输出摘要，保留 mating parts/fixtures/procedures 责任、tested conditions、untested requirements；不能把收到样品等同批准 | 桌面表格+末尾批准记录样式；手机逐检查项卡片或堆叠表，责任与判定始终可见；去 repeat production / compare quote。无需虚构检验报告图片 |
| `cnc-process-selection`：将几何转换为工艺讨论要点 | ①3路工艺比较表；②每路一个原始机加工场景与对应 study；③关键公差与输入要求 | `process-comparison/process-references/accuracy` 保留，indexed vs simultaneous 区分保留；准确性段合入“需提交的几何/公差条件”而非泛 CTA | 桌面表格后3个等重照片入口；手机按Turning/Milling/Multi-axis一组一组读，不先堆3图再给链接；去能力页、3篇对应study、critical features。只用真实工序图 |
| `material-and-finish-checklist`：完成基材、处理和验收要求 | ①material-specification 表+牌号冲突说明；②process/appearance/masking/post-finish dimensions/edges 一张连续 specification sheet；③solid polymer/coated metal/covered part 区别与2张原图；④所需记录 | `finish-and-acceptance` 与 `interfaces-and-dimensions` 当前被拆成两个大节，合为连续5项表单/表格；保留 C3600/H62/C36000 不等同、brochure非库存、精确牌号和可用性待确认、涂层与PTFE实体区别 | 桌面材料表与finish spec，示意图只贴masking/post-finish两行；手机先完整规格，再照片。去 plastic/aluminum capabilities、critical features、factory。保留2张coating原图；finish示意可重画为简明注释图，明确 illustrative |
| `prototype-vs-small-batch-cnc`：从样品转入受控批量 | ①prototype/batch comparison；②batch specification（批准revision、材料/finish、sampling、records、quantity、price/schedule）；③三阶段 release record；④repeat order changes | 当前 intro 已吸收 first sample section，不能按原始 contentGuides 再重复加回来；首段样件评价压短并链接专门审批页；保留 Minimum 1 与7–14工作日条件所在比较表；`section-4` 比价长文缩成下一动作与链接 | 桌面比较表+释放记录；手机两个表各自按事项堆叠，不能合成长段；去 sample approval、shipping、compare quote / low-volume capability。无需装饰批量图 |
| `custom-cnc-parts-shipping-checklist`：定义防护、费用责任与交付文件 | ①三部分 shipment brief：保护标识、transport/term责任、documents；②必须区分production/dispatch/arrival；③3张历史包装照片作为实际参考 | `section-2/transport-title/delivery-package` 合成可逐项填写/检查的清单；保留term version/named place、customs/duties/taxes/insurance/local delivery、DDP only if quoted、carrier可讨论、destination-specific docs；archive 保留November 2022与无法确定destination/carrier/trade term的范围 | 桌面清单主列，历史图次列或页后；手机先清单再历史图。去 How we work#packaging-shipping / factory#order-documentation / batch / RFQ。教学packing图若只重复“foam in carton”，应从正文移除；真实历史图保留 |

### 4.3 FAQ：快速解决单个疑问

保留 `resourceFaq.ts` 全部15问：minimum order、lead time、RFQ inputs、draft/upload、payment、sample charges、after-sales、nonconformance、services、material/finish、conditional ±0.01 mm、inspection records、ISO、shipping、study scope。数字和条件不能因“精简”丢失。

最终模块：顶端三项快答（MOQ / timing / files）→三组完整问答→一个追问入口。可按组折叠，但15个问题标题始终可找；深链自动展开；答案与 schema 同源。每条只保留一个最有用的详情链接，沿用当前 source href。手机不要把“去详情”做成与问题同样醒目的独立模块；无图片需求。

## 5. Quote、Privacy、404

### Quote：完成一份邮件草稿

现有功能是浏览器端草稿，`inquiryDraft.ts` / `inquiryContext.ts` / `QuoteForm.tsx` 没有提交/上传后端。重组内容时必须保持：name 与 message 必填；email 或 phone 至少一个；可选 product/service；来源只由内部目录解析；来源上下文有独立 storageKey；在表内改变 reference 更新同一进入上下文草稿；sessionStorage 恢复；clear 删除当前与legacy键；存储不可用可继续；复制失败可选择文本/下载；mailto需用户另行附图发送。

最终结构：

1. `Prepare an RFQ email` + 一句动作边界。已有 reference/topic 紧邻标题，不放离表单很远。
2. 联系信息3字段（name/email/phone）与Message为主；可选reference为次。Message下保留revision/material/finish/quantity/critical features/destination/arrival提示，给RFQ清单入口。不要为更“专业”增加未经授权的多步长表单。
3. Prepare按钮、存储状态、Clear和Privacy链接组成一个紧凑状态区；clear为次级动作，不能与submit同重。
4. 结果：收件人与主题摘要→Open email app主动作→一份完整邮件预览→Edit/Copy/Save。不再单独重复Message正文。成功状态叫“Draft ready”，不能叫Inquiry sent。

桌面：表单主列占主导，左侧只保留短流程与直接email/phone。完整地址迁到Contact链接。手机：标题/上下文→表单→结果→备用联系方式，不需要图片。关键行为在后续实现时用真实交互验证；本文未执行发送、复制或清除。

### Privacy：解释草稿存储与网站信息范围

保持“Your inquiry / Saved drafts / Cookies and external services / Product and company information / Contact”5项，首部加5个短锚点即可。Saved drafts 保留全部行为：同tab refresh、进入上下文绑定、表内reference变更不建新副本、清除当前/旧键、浏览器恢复可能恢复、共享设备、storage blocked/full时Save draft。不能以“数据不会保存”代替这些事实。

Product/company说明可以保留在此作为统一细则，各业务页只在真正影响决定处提醒，不必在每段重写同一免责声明。当前 `no analytics/advertising cookies` 是源码文案，后续上线前需要对实际脚本/配置核对；本报告不把它提升为独立审计结论。桌面保留单列约760px，手机正常阅读宽度，直接到quote/profile documents/factory quality/contact。无图片、无促销CTA。

### 404：恢复导航

保留明确错误说明与Home、Part examples、Capabilities、Resources四条现有路由。可把标签解释为“找零件示例 / 找加工能力 / 找采购指南”，一行一项；不需增加复杂搜索，除非全站已有可用搜索。桌面简短任务列表，手机44px以上点击区。保留 noindex。无图片、无新闻、无询价大banner。

## 6. 重复与迁移清单（具体到当前来源）

| 重复主题 | 当前出现位置 | 最终主存放处 | 其他页面保留什么 |
|---|---|---|---|
| 公司主体、2017/1500/40+、workshop-wide | `AboutOverviewRedesign` hero；`AboutProfileRedesign` hero；`AboutContactRedesign` visit | Company profile 主体/事实；Contact只留来访必要身份地址 | About一句定位与入口；Contact图可用但不再整套facts |
| ISO请求、原始recognition、qualification vs acceptance | overview `assurance`；profile `documents/quality-system`；contact support；FAQ ISO；Privacy | Profile文件区 | Overview入口；Contact执行请求；FAQ一句答案；Privacy范围说明，各自合理重复不全删 |
| drawing revision/material/quantity/destination/acceptance | About closing；Contact inquiry；How workflow review；RFQ；各指南closing；Quote helper | RFQ完整清单；Quote实际输入 | 其余只保留当前页面特有条件和一个入口；所有CTA仍说明草稿与用户发送 |
| 样品purpose/checks/approver/material differences | Workflow `sample`；prototype approval `evaluation/approval-record`；batch intro | Prototype approval工具 | Workflow保留责任与生产批准条件；batch只引用已批准配置 |
| 包装/贸易术语/文件 | Workflow `packing`；Shipping三段；RFQ commercial brief；FAQ | Shipping检查表 + Workflow责任 | RFQ只收集要求；FAQ快答。任何简化不得删除DDP条件或费用责任 |
| 工艺/验收不是由图片保证 | profile/Workflow/各guide/news captions/Privacy | 相关证据旁短说明与Privacy统一细则 | 保留关键限定，不让同一段抽象告诫在多个模块反复出现 |
| 工作人员/来访 | About概览2记录；Profile2people cards；News index；News detail | News完整归档 | About一条来访精选，Profile一条入口 |
| RFQ blank brief下载 | Resources `rs-start`、`rs-tools`；Ordering；RFQ本身 | RFQ工具和Resources工具区 | 阶段入口可有上下文小链接，避免同一页面两块同级下载模块 |
| Quote预览Message | `inquiry-review-message`；`inquiry-full-draft` | 单一full draft | 收件人/主题摘要可以保留，Message不再再展示一份 |

这些迁移指调整显示位置和叙述层级，不是删业务信息。后续实施需为被移动的旧id保留目标或兼容跳转，尤其 `documents`、`quality-system`、`commercial-terms`、`packaging-shipping`、`section-2`、各resource aliases。

## 7. 关键图片文件处理清单

以下路径均相对 `public/`；来自当前 `evidence.generated.json`、`additionalMedia.generated.json`、`companyNewsMedia.json`、`catalog.json` 与实际组件调用。没有据缩略图尺寸推断原图画质；裁切与清晰度需主评审结合实际图像复核。

| 文件/组 | 当前用途 | 建议处理 | 证据限制 |
|---|---|---|---|
| `media/evidence/workshop-wide-1600.webp` | About/简介首屏、Contact来访 | 简介/Contact保留；About缩为定位辅助或取消重复大图；配responsive版本 | 真实车间；不可生成厂房替换、增加设备或操作人员 |
| `media/evidence/workshop-aisle-1200.webp` | Profile工程范围 | 与wide选择主次；长竖图保持完整或在环境不失真前提下轻裁；不要制造大留白竖栏 | 原始车间，不能用于推算设备总数 |
| `media/High-tech-Enterprise-Certificate-1764396986484--69861fe474.webp` | 高新企业证件 | 保留原图与可打开的大图，边界内轻清理展示底色；不做假高清补字 | 8 Dec 2023，印刷有效期3年；当前有效状态需企业确认 |
| `media/Zhejiang-1764397018975--75b9eb4d46.webp` | 省级科技型企业文件 | 保留纵向比例与原图链接，展示用途 | 显示件未写issue date，不补造日期 |
| `media/Artificial-1764396998946--413c4183ea.webp` | 教学基地牌匾 | 保留；文件名不作为AI来源判断依据，以catalog/source记录和实物内容为准 | 教育合作，不充当质量体系证明 |
| ISO 9001当前证件 | 当前仅请求入口，没有本页证件原图 | 索取真实当前文件再上架；本轮不需补画占位证书 | 绝不可生成、复原、改印章或把其他证件替代 |
| `media/evidence/cmm-detail-1600.webp` | Workflow inspection | 作为一张次级设备图；详细检查记录由factory链接承载 | 设备外观不证明校准、100% inspection或具体零件结果 |
| `media/evidence/shipping-example-1600.webp`；`shipment-2022-order-packing-1600.webp`；`shipment-2022-prepared-load-1600.webp` | Workflow与Shipping历史档案 | Shipping保留完整3图；Workflow最多缩略一张+档案链接；手机先需求后档案 | November 2022 preparation，非现行标准包装、完成交付、目的地/承运人证明 |
| `media/evidence/multi-feature-milling-parts-1600.webp` | Critical drawing geometry | 保留，放清单后或侧边；可用HTML编号指出可见特征，但不得加虚构公差/材质 | 零件形态，不是该采购项目检验结果 |
| `media/evidence/turning-operation-1600.webp`；`milling-enclosure-operation-1600.webp`；`five-axis-operation-1600.webp` | Process selection | 各自绑定对应工艺及study链接；保持三图阅读面积接近，不强行裁掉夹具/加工区 | 图像不能确认机型、公差或同时多轴运动 |
| `media/source-details/finish-coated-round-1200.webp`；`finish-coated-bars-1200.webp` | Material/finish涂层区别 | 两图保留，合成一个比较模块，说明源集合标注Teflon surface coating | 不将涂层件改称PTFE实体件；不生成替代实物证据 |
| `media/resources/finish-interfaces-v1-{480,800,1200}.webp` | finish教学示意 | 若实际图不能快速解释遮蔽/后处理尺寸，后续可换成有3个清晰标注的通用示意；不用追求摄影真实感 | AI/illustrative标记保留，不带实测值、不冒充客户零件 |
| `media/content-guides/packing-review-v1-{480,800,1200,1536}.webp` | Shipping foam/carton示意及articleImage | 正文若无额外教学价值，移除展示，仅用真实档案与文字清单；若保留必须明确示意。同步检查articleImage是否仍指向被弃用图 | 不可把生成包装当成实际发货或标准包装证据 |
| `media/company-news/australian-visit-01…05-1600.webp` | 澳洲来访新闻/精选 | 完整归档；03用作讨论首图；01日期细节待核实，暂不据此加强时间结论；不要改照片中日历 | 真实人物/客户活动不可生成替换或推导成交 |
| `media/company-news/china-africa-summit-01…05-1600.webp` | 会议新闻 | 01封面，02/03展示，04/05会场；同组可精选但保留其余访问 | 不改背景文字、不生成握手/签约 |
| `media/company-news/team-may-2025-01…04-1600.webp`；`team-november-2025-01…05-1600.webp`；`team-2024-01…06-1600.webp` | 3篇团建 | 归新闻，非简介长图库；缩略图不截人脸，详细页保留原图比例 | 不据照片推断人数、满意度、组织文化成效 |
| `media/evidence/team-2025-evening-group-1600.webp` | Profile人物块 | 从简介大图移到新闻上下文/仅保留文字入口；原文件保留 | 活动照片，不作为生产团队规模证明 |

本轮无需新增生成图片。若后续要补图，优先是材料/表面具体问题的教学图；公司、车间、人物、原始产品、证件和历史发货证据都必须使用真实来源。

## 8. 验收重点（后续实施阶段）

- 任何入口到达后，读者能在首屏确定本页任务、主工具与下一动作；目录页不承担长篇教学。
- 关键商业条件、所有15条FAQ、8篇工具的独特字段、5篇新闻的日期与原图访问均仍可达。
- 单页重复统计/hero/长声明消除；跨页合理的快答、操作边界保留。
- 手机表格保留列标签，文件证件能看原图，图片不先于工具占据多屏；旧hash仍到正确内容。
- Quote 保持校验、上下文恢复、Clear、复制/保存和mailto边界；准备草稿不声称发送，文件不声称上传。
- `40+` 保持“Machining & supporting equipment”，不改写成40+ CNC machines；`15+ years` 保持工程团队经验。
- 本报告为内容与源代码审查，不声称已完成布局改动、浏览器验收、构建发布或事实新取证。

## 9. 当前截图复核记录

图片位于本报告同级 `screens/`。已实际打开审看以下可靠截图：

- 桌面首屏：`about-desktop.png`、`profile-desktop.png`、`workflow-desktop.png`、`contact-desktop.png`（四者为主评审重新捕获、覆盖后的可靠首屏）；另有 `resources-desktop.png`、`ordering-desktop.png`、`machining-guides-desktop.png`、`rfq-desktop.png`、`compare-desktop.png`、`faq-desktop.png`、`quote-desktop.png`、`privacy-desktop.png`、`news-desktop.png`、`visit-desktop.png`、`outing-desktop.png`。浏览器 CSS 视口由主评审记录为1309×909；截图图像含滚动条及浏览器可见裁切，本文不据文件像素推定布局宽度。
- 桌面滚动正文：`rfq-desktop-body1.png`（Critical features、Inspection reports可见部分）；`rfq-desktop-body2.png`（Quantity and delivery完整主体、Copy this brief模块标题/引导段）。body1后半空白没有足够证据判断来自页面内容、动画或捕获时机，故不作缺失内容结论。body2尚未显示完整模板和复制按钮，不声称已验证操作。
- 手机可见区：`about-mobile.png`、`profile-mobile.png`、`workflow-mobile.png`、`contact-mobile.png`、`resources-mobile.png`、`ordering-mobile.png`、`rfq-mobile.png`、`compare-mobile.png`、`faq-mobile.png`、`quote-mobile.png`、`privacy-mobile.png`、`404-mobile.png`、`news-mobile.png`、`visit-mobile.png`、`outing-mobile.png`。只对画面实际覆盖区域作视觉结论；visit/outing画面未显示完整面包屑，不把其当成页面缺失。
- 曾查看早期 `about/profile/workflow/contact-desktop.png` 全页图，但主评审确认该轮 fullPage 有缩放/拼接异常；它们现已被可靠首屏覆盖。**旧全页画面不作为全页布局、溢出或坏图的证据**，其中空白图片区也不判定为丢图。About正文、证件正文与Workflow正文的结论在本报告仍以源代码为据，等可靠滚动截图补充。

| 可靠截图中的实际观察 | 影响与对应建议 |
|---|---|
| 替换后的About与Profile桌面首屏再次确认：相同车间图、三项事实和左右双列框架；About首屏下缘才出现任务选择，Profile首屏下缘进入工程范围 | 与手机观察一致，强化概览/简介分工结论；但两页首屏图片均正常展示，不能沿用旧fullPage空白图判断 |
| 替换后的Workflow桌面首屏三项条件、完整限定语与五阶段顺序均可见 | 桌面首屏本身有清楚信息，优先保留；流程正文的责任表重组建议依然来自源码，不能据此首屏认定三列正文失衡 |
| 替换后的Contact桌面首屏同时可见email/WhatsApp/时区及询价按钮、四项输入清单 | Contact可低成本收敛；首屏不缺联系方式或询价入口，建议主要调整下方文件/订单任务和重复清单层级 |
| RFQ正文body2把数量、交付、包装责任收为三行定义表，随后才开始可复制brief；MOQ/生产天数条件清楚可见 | 当前字段表可保留；“模板前移”针对任务完成顺序而非删掉这些条件。正文已不需要另加解释型图片 |
| About 与Profile手机首屏的主体、三项事实、车间图起始位置非常相似；两个入口页呈现近乎相同的介绍节奏 | 支持概览与简介分工。概览应先让用户选供应商任务，简介才展开事实与文件 |
| Workflow手机首屏展示完整标题/导语后，Minimum order、Production、Payment三项各自纵向占段，尚未到流程本身 | 条件需保留，但可压为紧凑定义表，导语缩短；不能删掉7–14天后面的前提与transit说明 |
| Resources手机首屏，灰底RFQ入口内先有一段邀请说明，再有“RFQ checklist”与相似的brief说明；Ordering guide标题只到画面底部 | 合并RFQ两段说明为任务+产出，释放其他采购任务入口的首屏位置 |
| Ordering手机首屏，四条锚点单列占一大段，之后再出现第一个相同阶段标题 | 将四阶段目录与阶段摘要结合；避免目录和正文在相邻屏重复同样标题 |
| RFQ手机首屏的六项摘要已经占到Open decisions，实际模板/Copy未进入可见区；桌面能看到“Use the inquiry brief”，但仍是纯文本链接 | 模板操作前移是明确优先项，六项改短锚点，不扩成第二套卡片 |
| Compare桌面主表格清楚可读；手机表格已变为“Drawing and quantity / Compare across quotations / Question to resolve”的堆叠项 | 不需重造表格；当前手机列标签做法应保留。长导语比表格更值得压缩（手机约8行），不要把可用表格误判成全部失败 |
| FAQ手机的标题、导语、三条分类导航和第一个组标题后，才出现第一问 | 快答上提、分类导航压紧。现有第一问答案本身简洁，问题主要在到达答案前的层级与留白 |
| Quote桌面表单主列清楚，侧栏完整地址占较多高度；手机到首屏底部才开始Message字段 | 地址转Contact链接可释放桌面侧栏；手机优先缩短导语/辅助重复，不应以删email/phone任选校验或Message提示换取短页。prepared结果重复仍是源码结论，尚未截图验证 |
| Contact手机首屏已直接呈现email、WhatsApp和时区；页面任务清楚 | 保留当前直接联系方式优先级；文件/现有订单入口位置调整是源码后续结构建议，不应将整个首屏推倒重做 |
| Privacy桌面与手机均呈现单列阅读与明确分节 | 轻量目录足够；不做大量卡片化或图片填充 |
| 404手机在一屏内给出错误说明和四个去向，之后进入footer | 已满足恢复导航，属于低优先级，仅需措辞与点击区域保持 |
| News桌面两列记录与日期、分类清晰；手机筛选为两行且第一条图像位于下半屏 | 缩短介绍可使记录更早出现，保留分类与日期；没有必要强制新增新闻hero图 |
| Visit桌面采用竖向部件讨论照片与短文并列；手机照片承接事件说明。Outing首屏以日期、短文、真实合影组成 | 新闻的真实照片能承载内容，不能套用指南式表格重排；优先缩短重复组说明/图注，而非删掉照片 |

本次截图复核确认了“目录层级与工具到达顺序”的问题，也确认Compare表格、Contact联系方式、Privacy与404已有可用结构。评审应按影响分轻重，不把所有页面一律改成同一种布局。
