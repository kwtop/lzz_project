Method: dual-agent (A: /root/critique_design_a · B: /root/critique_evidence_b)

# LZZ 全站设计评审 · 2026-09-30

本轮只审查，没有修改网站代码。结论：工业视觉和真实资料已经形成一致的基础；最值得优先处理的是询价状态与上下文连续性、资料入口的阅读顺序，以及技术图片和小字的可读性。无需替换 Inter、色系或已经确认的首页结构。

## 范围与判断依据

- 当前项目：D:/lzz/lzz/_react；稳定目标：src/pages，以及共享组件与布局。
- 读取现有 DESIGN.md、最新 docs/b2b-upgrade-2026-09-29/DESIGN_DIRECTION.md、页面模板、导航、目录筛选、产品图片、资源分类与 RFQ 实现。
- 主检查实际渲染 81 个路由（包含内部预览，排除 404），分别为 1440×900 与 390×844，共 162 次；81 个路由均返回 HTTP 200，本次未发现页面 JS 错误、整页横向溢出或缺失图片。目录清单和逐页记录见 route-inventory.json、render-inventory.json。
- A 另检查 404、35 个桌面和 18 个移动页面，以及导航、表单验证、准备草稿、恢复与清空等状态；B 独立运行 detector 和五个代表页面的桌面/移动验证。
- 上述为当前本地页面证据，不是生产部署状态或真实邮件交付证据。未发送邮件。

## 设计专属性与整体印象

真实零件、加工现场、检验区域和按图生产说明，使页面明显面向 LZZ 的定制 CNC 采购场景。Inter Variable、白色技术内容、charcoal 和红色主操作基本协调。最有价值的内容已经存在，但有些入口要求用户先浏览大图、滚动或记住前页信息，才能进入具体判断。

做得好的三点：

1. 工厂、CMM 和加工研究使用实际资料，generated imagery 与原始照片的边界明确；公司 recognition documents 与 ISO 资格说明没有混为一谈。
2. 产品与能力页说明用途、材料与制造、图纸和检验要求，按图定制的边界清楚。
3. RFQ 诚实标明邮件草稿、未发送、在邮件应用附图；编辑、复制、下载、tab 内恢复都有可用路径。

## 设计健康评分

本目标包含展示、阅读和 RFQ 操作，十项均适用。评分是设计判断，不是可访问性认证或上线验收。

| Heuristic | 分数 / 4 | 主要依据 |
|---|---:|---|
| 系统状态可见 | 2 | 草稿生成后的手机确认标题不可见 |
| 符合现实任务 | 3 | 术语和内容贴合采购与工程判断 |
| 用户控制 | 3 | 可编辑、恢复、重置；清空缺少恢复 |
| 一致性 | 3 | 视觉统一；服务分类与分类面包屑有差异 |
| 错误预防 | 3 | 必填、email、quantity 约束及草稿保存可用 |
| 识别优于记忆 | 3 | 顶部询价入口丢失当前对象引用 |
| 使用效率 | 3 | 搜索、筛选和直接联系可用 |
| 简洁与层级 | 3 | guide 大图与目录图框推迟关键信息 |
| 错误恢复 | 3 | 输入验证与复制失败提示有具体退路 |
| 帮助与文档 | 3 | 资料完整，部分答案和返回路径到达较慢 |
| 合计 | 29 / 40 | Good；基础良好，有明确可修复问题 |

## 最值得优先处理的 10 项

按影响和覆盖范围排序。P1 表示明显影响主要操作；P2 表示仍可完成任务，但增加理解、辨认或操作成本。本轮没有确认 P0。

### 1. P1 · 手机生成询价草稿后，确认标题被滚出屏幕

位置：/quote/ → Prepare email draft → draft-result。实测 390×844，标题 top=-92.91px、bottom=-35.69px，整行在视口上方；用户先看到摘要与 Open email app，看不到“Email draft prepared — not sent”及下一步解释。

原因与影响：对比视口更高的整个结果执行 nearest 滚动，使最需要确认的状态不在落点。这是反馈位置问题，不是草稿生成失效。

改法：聚焦并滚动到结果标题或紧凑起始锚点，使用 start 对齐与固定 header 的 scroll-margin-top；保留 aria-live 与 Edit。

代码：[QuoteForm.tsx:74](/D:/lzz/lzz/_react/src/components/QuoteForm.tsx:74)。证据：[手机结果截图](/D:/lzz/lzz/_react/docs/critique-2026-09-30/assessment-a/screens/quote-draft-mobile-settled.png)、assessment-a/followup.json。建议命令：$impeccable harden / $impeccable adapt。

### 2. P2 · 顶部询价按钮丢失当前零件或工艺引用

位置：产品/能力详情的 header Request a Quote；正文 Prepare RFQ email 会保留 product/capability/source，header 固定进入 /quote/。turning 和 engine-cover 的两种入口均已实际点击核对。

原因与影响：共享 Layout 未使用页面已有的 inquiry URL；用户从固定导航发起询价时，必须重新描述刚看过的对象。

改法：让具有产品/工艺上下文的 Layout 接收现有 inquiry URL，header 与正文保持一致；加工研究可带页面标题和来源，但不能把示例包装为客户订单。

代码：[Layout.astro:77](/D:/lzz/lzz/_react/src/layouts/Layout.astro:77)。证据：assessment-a/followup.json 的 header-quote-context。建议命令：$impeccable harden / $impeccable clarify。

### 3. P2 · 技术指南先给大图，有用答案出现较迟

位置：/insights/material-and-finish-checklist/、/insights/rfq-checklist/ 等带 editorial image 的指南。material guide 桌面首个正文 heading 位于 document y≈1288；手机正文 y≈826，接近下一屏。

原因与影响：共享 article 模板通常按“标题 → 大图 → 说明 → 目录 → 正文”排列。找材料、finish 或 RFQ 答案的读者要先经过辅助插图；留白和图像优先级高于阅读任务。

改法：采用已存在的 prototype-vs-small-batch 页面模式，先显示简短答案或决策摘要与目录，把 illustration 放到相关正文之后；公司新闻的纪录照片可以继续较早出现。

代码：[insights/[slug].astro:45](/D:/lzz/lzz/_react/src/pages/insights/[slug].astro:45)。证据：assessment-a/screens/material-guide-desktop.png、assessment-a/followup.json。建议命令：$impeccable distill / $impeccable layout。

### 4. P2 · 桌面零件目录首屏只见图片，看不到名称和比较信息

位置：/products/ 首行 product-card，1440×900。第一张 card top≈524，名称 top≈904，工艺说明 top≈962。

原因与影响：标题、搜索、三组筛选和结果行占据前半屏，再叠加较高的图片框，把名称推到首屏下方。采购比较需要同时识别形状、名称和特征。

改法：收紧桌面 controls 与结果间距，并将桌面首行 image frame 调整到约 280–300px，让名称和一句 context 同屏；继续使用 contain 保留零件几何。手机两列布局不用照此扩大。

代码：[brand-system.css:122](/D:/lzz/lzz/_react/src/styles/brand-system.css:122)。证据：assessment-a/details.json、screenshots/parts-1440-top.png。建议命令：$impeccable layout / $impeccable distill。

### 5. P2 · Capabilities 总览与导航采用不同服务分类

位置：/capabilities/ 的 Five machining services 与导航 Machining / Materials。总览仍把 Plastic machining 放在 services，同时材料组再次出现；导航和目录筛选则已把 Engineering Plastics 放在 Materials，Machining 为四项。

原因与影响：总览使用 primaryServices，导航与筛选使用另一组分类。用户跨页面核对能力时，会遇到同一条目属于不同层级的情况。

改法：统一展示分类的数据来源，保持四种工艺、四种材料和订单类型的同一组织；保留既有 plastic 页面和 URL，不需要删内容。

代码：[capabilities/index.astro:25](/D:/lzz/lzz/_react/src/pages/capabilities/index.astro:25)、[MainNavigation.astro:8](/D:/lzz/lzz/_react/src/components/MainNavigation.astro:8)。证据：screenshots/capabilities-1440-top.png、当前 capabilityGroups 与页面链接。建议命令：$impeccable clarify。

### 6. P2 · 技术图片被裁切或缩小时，没有查看完整原图的出口

位置：/factory/#equipment 的竖幅设备照片，以及产品详情 Gallery。设备图片使用固定 320px 横框 cover；648×864 的竖图在 554×320 框内只保留约 43% 的源图高度。engine-cover Gallery 仅有一张 img，没有图片链接或放大按钮；设备图点击进入能力页。

原因与影响：横框用于扫读可以成立，但读者想核对完整工件、装夹关系或小孔/加工纹理时，无法从当前图直接查看更多细节。并非所有 cover 裁切都不合理，产品 contain 本身也值得保留。

改法：为现有图片提供明确的 View full image / 放大入口；作为完整设备证据的图片按原始比例呈现，作为加工特写的图片保留有目的的裁切。不要统一强行填满，也不要生成不存在的细节。

代码：[factory.astro:37](/D:/lzz/lzz/_react/src/pages/factory.astro:37)、[Gallery.tsx:5](/D:/lzz/lzz/_react/src/components/Gallery.tsx:5)。证据：render-inventory.json 的图像尺寸、assessment-a/details.json、assessment-a/screens/factory-equipment-region.png。建议命令：$impeccable adapt / $impeccable polish。

### 7. P2 · About 行业入口看起来像静态标题

位置：/about/#applications 的 11 个行业 summary。

原因与影响：原生 disclosure marker 被隐藏，未补充 +/- 或 chevron，读者可能忽略内含的适用性说明与零件入口；11 个同权标题也难快速分组扫描。

改法：补充展开/收起标志和状态，保留整行点击；按现有内容分成 3–4 个视觉组，维持全部内容和键盘交互。

代码：[about.astro:78](/D:/lzz/lzz/_react/src/pages/about.astro:78)。证据：assessment-a/details.json、assessment-a/screens/about-industries-region.png。建议命令：$impeccable clarify / $impeccable polish。

### 8. P2 · 核心区分文字和来源说明过小

位置：/products/ 的 product-card-context；390px 实测 font-size=12px、line-height=16.8px。B 另确认首页来源说明仅 11px，导航 12px 分组标签约 4.4:1 对比度。

原因与影响：工艺和形状特征是判断零件的主要信息，却按很弱的辅助说明处理，在两列小卡片中难以辨读。字体家族已经统一，问题在字号和层级。

改法：核心 context 提到至少 14px、行高约 1.5，保持短句并允许增加一行；来源说明增至 12–13px，导航小标签加深至至少 4.5:1。无需放大整个卡片标题或更换 Inter。

代码：[studio-refinement.css:144](/D:/lzz/lzz/_react/src/styles/studio-refinement.css:144)。证据：assessment-a/details.json、screenshots/parts-390-top.png。建议命令：$impeccable typeset / $impeccable adapt。

### 9. P2 · Clear saved input 同时清空当前表单，标签未说明完整后果

位置：/quote/ 的 Clear saved input。实际填写 name/project 后点击，两项当前值都变空；不是仅移除保存副本。

原因与影响：按钮名强调 saved，动作却同时重置正在填写的字段，且无 Undo。想清理保存状态的人可能丢失本次输入。

改法：改为 Clear form and saved draft，并提供轻量 Undo 恢复上一次值；无需对每个字段增加确认步骤。

代码：[QuoteForm.tsx:99](/D:/lzz/lzz/_react/src/components/QuoteForm.tsx:99)、:147。证据：assessment-a/details.json 的 clear-input。建议命令：$impeccable clarify / $impeccable harden。

### 10. P2 · 资源文章面包屑与真实分类不一致，不能返回所属栏目

位置：/insights/prototype-vs-small-batch-cnc/ 的 Production planning、material guide 的 Design preparation；hub 和导航则使用 Production & Shipping、Processes, Materials & Finishes。

原因与影响：面包屑直接显示 article.category 的另一套标签，而且不可点击，读者必须记住文章和 hub 分组之间的关系。

改法：用 knowledgeTopics 映射生成可点击的真实分类面包屑；文章标题作为当前位置。保持 Company News 在 About 下的现有关系。

代码：[insights/[slug].astro:44](/D:/lzz/lzz/_react/src/pages/insights/[slug].astro:44)、[knowledgeCenter.ts](/D:/lzz/lzz/_react/src/data/knowledgeCenter.ts)。证据：screenshots/production-guide-390-top.png、当前 hub/menu。建议命令：$impeccable clarify。

## 综合判断

认知负荷中等，主要额外负担来自同权入口过多、部分答案入口较迟以及询价引用要求用户重新记忆。第一次寻找供应商的人可能漏掉 About 的行业说明；移动采购员更容易看不到 RFQ 完成状态、难读 12px context；核对状态与承诺的人会遇到 header 引用和清空行为的不一致。

情绪路径的高点是实际零件、工厂、CMM 和加工资料。终点文案本来诚实，但移动结果定位削弱了“我现在完成了什么”的安心感。因此优先修复 1–2，再调整 3–4 的信息到达顺序；其余按共享组件覆盖面收敛。

较小观察：菜单最初即时截图曾捕捉开合重绘中间帧，等待 500ms 后正常，不作为导航空白问题。资源分组、产品 contain、图像来源标注和现有 Inter 应保留。

## 自动检测与交叉证据

B 独立 CLI detect 覆盖 src/pages、src/components、src/layouts 共 53 个文件，只运行一次，exit 0，完整 JSON=[]，0 项静态 findings，因此没有规则或文件位置可列。零静态命中不能排除以上动态滚动、上下文、分类和阅读顺序问题。

五个代表页面在 B 的桌面/移动检查中无整页横向溢出，Inter Variable 实际 loaded，19 个被查站内 hash 目标均存在。五页 detect.js 真实注入 headless 浏览器并留存截图；组标题计数合计 70，逐规则日志实际 75 条，保留该差异。多数遮挡和阴影命中来自关闭菜单或隐藏配色预览，不能作为可见缺陷。B 补充的低对比小标签与来源小字已并入第 8 项；目录 h1→h3 语义跳级及产品参考名预填必填需求字段，保留在 B 报告供后续检查，没有据此扩大本轮十项优先范围。

没有用户可见的 [Human] overlay，原生 browser 工具返回 nodeRepl.fetch request failed；本轮使用 headless 截图与 DOM 作为替代证据。B 自有 live-server 已停止。完整 runtime 信号、误报排除与清理状态见 [Assessment B](/D:/lzz/lzz/_react/docs/critique-2026-09-30/assessment-b/report.md)。

Questions skipped: 用户明确要求本轮只审查，不进入修复选择或实施。
