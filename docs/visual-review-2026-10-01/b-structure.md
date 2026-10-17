# Assessment B：81 页内容结构与渲染证据

审查日期：2026-10-01。目标：`D:/lzz/lzz/_react/src`；实际内容统计来自当前 `dist` 的 81 条 sitemap 路由。只读审查，未修改 `src`。未读取 Assessment A 或旧 critique。CLI 原始输出独立保存在 `b-detector.json`；检测解释在收到 A 已独立完成的确认后解封。

## 判断

当前首要削减对象是能力页的重复入口与泛用操作段落，以及几篇长资源页的重复摘要和装饰插图。35 个产品页的默认正文已经较短；不能只因同一句出现 35 次就删掉产品页的报价条件、照片边界和操作提示。字体大小在独立检查的四类页面中已统一；局部按钮仍各自定义颜色、圆角和高度。

精简应增加“这一页独有的答案”的比重，而非机械缩短所有页。原始车间、零件、包装、人员和证书材料应保留；只有没有带来新信息的第二次展示才删或合并。

## 统计口径

- 英文词数采用 Unicode 字母/数字词元；包括正文内的标题、标签、链接、图注和页内索引，不包括共用页眉与页脚。
- `默认正文` 是桌面首始状态的静态语义估算：去除脚本、样式、模板、hidden/aria-hidden、`.decision-mobile`，闭合的 `details` 仅保留 `summary`。`全部正文` 包括折叠内容和响应式替代内容，不能把两者差值全称为用户已看到的重复。
- section 是实际 HTML `section` 标签数量，含嵌套区块；H2 单独统计。长文章的章节可使用 H2 而没有 section，不能只按 section 数比较长度。
- CTA 是正文内按钮样式的链接或明确询价/邮件操作链接，含 `Meet LZZ` 这类导航按钮；不是全部 RFQ 操作次数。
- 内部入口、同页锚点、下载、外部网址、邮件/电话、新标签页分别记录。普通内部链接不等于 CTA。
- AI 图像依据实际 `data-image-origin`、alt、图注和当前源码确认的 `product-review`、`how-we-work-hero-v2` 资产识别；不把原图抠图与修图视为 AI 案例。图像实例数不是唯一资产数。
- products 索引与 quote 的客户端水合内容不能从静态 HTML 完整推算；其默认字数是静态下限。全部 81 页的结构、正文、折叠段落、图注、AI 图像和重复入口详见 `b-structure.json`。

## 全站页面族

| 页面族 | 页数 | 平均默认词数 | 词数范围 | 平均 section | 平均 H2 | 正文 CTA 总数 | figure / caption | AI 图实例 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 首页 | 1 | 204 | 204 | 6.0 | 5.0 | 5 | 4 / 2 | 1 |
| 核心页与索引 | 11 | 312 | 114–578 | 4.0 | 4.4 | 8 | 21 / 14 | 4 |
| 公司新闻详情 | 5 | 196 | 181–206 | 0.6 | 3.0 | 1 | 25 / 25 | 0 |
| 能力详情 | 10 | 532 | 484–633 | 7.2 | 7.9 | 20 | 13 / 13 | 2 |
| 工艺与零件案例详情 | 8 | 320 | 206–624 | 6.5 | 6.5 | 8 | 37 / 27 | 0 |
| 产品详情 | 35 | 278 | 250–339 | 3.1 | 3.1 | 70 | 6 / 6 | 2 |
| 资源与分类页 | 11 | 516 | 118–785 | 4.9 | 6.2 | 14 | 23 / 17 | 11 |

## 优先检查页面

| 页面 | 默认 / 全部词数 | section / H2 | 正文 CTA | 内部入口 / 同页锚点 | figure / caption | AI 图 |
|---|---:|---:|---:|---:|---:|---:|
| Material & finish checklist | 785 / 909 | 1 / 10 | 1 | 11 / 9 | 2 / 2 | 2 |
| How We Work | 718 / 718 | 14 / 7 | 3 | 14 / 0 | 3 / 3 | 3 |
| RFQ checklist | 689 / 689 | 9 / 7 | 1 | 6 / 5 | 1 / 1 | 1 |
| Shipping checklist | 685 / 693 | 6 / 6 | 2 | 6 / 1 | 3 / 3 | 2 |
| FAQ | 638 / 649 | 5 / 5 | 1 | 12 / 3 | 0 / 0 | 0 |
| Custom plastic parts case | 624 / 624 | 11 / 11 | 1 | 9 / 4 | 9 / 9 | 0 |
| Quality | 578 / 578 | 6 / 6 | 1 | 5 / 0 | 2 / 1 | 0 |
| Prototype vs small batch | 546 / 549 | 9 / 8 | 1 | 7 / 3 | 1 / 1 | 1 |
| Factory | 498 / 498 | 6 / 5 | 1 | 11 / 1 | 7 / 7 | 0 |
| About | 487 / 902 | 7 / 6 | 3 | 10 / 1 | 4 / 4 | 1 |

About 的 415 词差值主要来自闭合的应用说明与公司背景，不能当成首页直接呈现 902 词。产品详情平均有 123 词的隐藏或替代内容；其折叠已经承担一部分减负作用。

### 十个能力页

| 能力 | 默认 / 全部词数 | section / H2 | 内部入口 / 同页锚点 | 正文 CTA | AI 图 |
|---|---:|---:|---:|---:|---:|
| 5-axis | 585 / 598 | 7 / 8 | 21 / 5 | 2 | 1 |
| Aluminum | 554 / 601 | 8 / 8 | 21 / 5 | 2 | 0 |
| Casting | 490 / 503 | 7 / 8 | 17 / 4 | 2 | 0 |
| Milling | 633 / 646 | 7 / 8 | 24 / 5 | 2 | 1 |
| Turning | 503 / 560 | 8 / 8 | 20 / 5 | 2 | 0 |
| Copper & brass | 493 / 528 | 8 / 8 | 17 / 5 | 2 | 0 |
| Low volume | 516 / 529 | 7 / 8 | 18 / 5 | 2 | 0 |
| Plastics | 573 / 587 | 8 / 9 | 19 / 5 | 2 | 0 |
| Prototype | 492 / 505 | 6 / 7 | 15 / 4 | 2 | 0 |
| Stainless steel | 484 / 498 | 6 / 7 | 17 / 4 | 2 | 0 |

10/10 能力页在首屏与 Part examples 再次展示同一零件图。铣削页同时展示 3 个零件入口、1 个主要工艺案例和 5 个次要工艺案例，随后还有 4 个 inspection/order 链接、3 个主要 resource 链接和 3 个同级能力入口；这是选择密度问题，不是缺少内容的问题。

## 重复内容分类

`humanizer-2026-10-01/after.json` 有 24 组跨页段落重复。本次重新解析完整 main、按至少 8 词的段落比对，有 34 组跨页重复；差异来自本次纳入较短操作句、工艺卡片简介和折叠说明，而非文案回退。去掉响应式替代排版后，未发现同页完全相同且不少于 8 词的重复 p。仍存在明显的语义重复、图片重复和重复入口，不能用“没有相同 p”说明无需精简。

| 类型 | 实际例子 | 判断与处理 |
|---|---|---|
| 跨页必要合同/操作规则 | 35 产品页的 1 piece / 7–14 business days 及确认起算、含表面处理、运输另计 | 保留各着陆页可独立理解的完整限定，统一短格式；不删除这些限定以追求简短 |
| 跨页必要证据边界 | 35 产品页的 made-to-order / approved drawing / quotation / image is not record；5 案例页的 source-photo 边界 | 保留，但产品页可缩为统一一行；图旁已有清楚 origin 时，无须下文再次展开同一否定 |
| 跨页必要操作反馈 | 10 能力页的本地生成 email draft、在 email app 附件后发送 | 保留按钮附近一处；源于真实交互，不能改成网站会直接上传/发送 |
| 跨页目录复用 | Resources 首页与 category 页重复文章简介；能力页与 cases 索引重复案例简介 | 合理的导览复用，不等于正文抄写；不要只为消除机器重复而改写相同入口名称 |
| 同页语义重复 | 铣削 Drawing requirements 的前两段与第 3 段再次列 pockets/radii/walls/datums；能力 enquiry 的 6 项列表后再用长段落重复同一输入 | 合并成独有要求与检查项，删第二轮通用清单；保留该工艺特有的参数 |
| 同页重复资源入口 | 铣削正文两次 Quality & inspection；How We Work 两次 RFQ checklist；RFQ 两次同一 TXT 下载；About 两次 Inside our factory | 删除离上下文较远的一处；页首/页尾必要转化按钮可保留，章节中间重复按钮优先删 |
| 同页重复图片 | Quality 的 CMM 2 次；Factory 的 workshop-wide、milling operation、CMM 各 2 次；10 个能力页 hero 图均在产品卡再次出现 | Quality 留 hero CMM，设备区用表格；Factory workflow 使用紧凑文字阶段；能力例图优先选择未在 hero 出现的零件 |
| 无新信息的装饰图 | How We Work 的 AI 工程师与 AI 检查手部、About closing 的 AI 零件背景、Shipping 的两张 AI 装饰说明 | 优先删除或减小。保留来源原图和能解释具体差异的技术插图，AI 标识不可随图片保留而删除 |
| 响应式结构复制 | ResourceArticle 从 decision-table 自动生成 decision-mobile | 同一个信息的适配版本，排除重复判断；需要精简时改原表的内容，而不是删除移动版本 |

## 可执行的减法

### 1. 能力页：减少案例与并列导航，合并图纸检查

位置：`src/pages/capabilities/[slug].astro:26`、`:75`、`:79`、`:93`、`:97`、`:103`、`:108`。

- Part examples 筛选时排除当前 hero 零件，最多保留 2 个互补形态；10 页当前都重复 hero 图。
- otherCases 当前完整 map。铣削页保留 1 个主案例 + 1–2 个最相关案例；把其余交给 All machining studies。
- Drawing requirements 与 Inspection and acceptance 合为一个区域、两个明确小标题，删通用重复句；保留工艺独有约束、critical-feature reference 的非保证限定。
- enquiry 保留 6 项输入与该能力独有补充，不再用完整段落重述 6 项。保留首屏和末尾 RFQ；不要再增加第三个操作区。
- inspection/order 的四入口与 ResourceLinks 重叠。保留当前语境最相关的 2–3 个，把 Quality 链接只放一处。

预期：能力页形成“适合什么 → 真实例子 → 该工艺独有要求 → 询价”的清楚顺序。删的是同一决策的第二次铺开，不是工程边界。

### 2. 产品页：缩短公共说明，保持差异字段

位置：`src/pages/products/[slug].astro:68`、`:69`、`:73`、`:74`、`:81`、`:83`、`:85`、`:86`、`:88`；公共内容来自 `productDetails.ts` 等数据。

- 第一张 fit/requirements 表与下方 Drawing 表重述同一 mating geometry 时，第一张只展示 2–3 个判断点，下方保留具体图纸和检验要求。
- Drawing 表的 Material & finish、Quantity 属于公共 RFQ 准备，可合成一条紧凑提示或折叠；Geometry 与 Inspection 属于产品差异，保留。
- 缩短 35 页统一长边界说明，例如统一表达“Part example only. Specifications and acceptance follow the approved drawing and quotation.” 需要在实际改稿时确认仍覆盖原有证据边界。
- 1 piece、7–14 business days 及起算/finishing/transit 限定留在底部 action 附近。Additional drawing and order notes 已折叠，先保留，勿把隐藏内容重新展开。

产品默认词数仅 250–339，不应把它们视为本轮最大冗余来源。35 个模板一致也是网站统一性的基础，不建议整体撤掉产品详细页。

### 3. How We Work：保留六步，减少三层重复摘要

位置：`src/components/HowWeWork.astro:32`、`:46`、`:48`、`:52`、`:54`、`:58`、`:67`、`:79`、`:81`。

- 保留 6 个真实采购阶段及输入/确认点。每章只留标题和一句引导，不再同时展示 chapter 段、step 段和覆盖同样字段的另一个 scope 表。
- 在 quotation review 与 What your quotation covers 中选择一个表达方式；scope 表有明确费用/交付对比，可保留表并删上方重述。
- 删除第 1 章中间的 RFQ 按钮（`:48`），保留页首与页尾；RFQ checklist 留准备区或 step 1 一处。
- 删除第 1/2 章的 AI 人物/检查装饰图，保留真实 packing archive。当前 718 词、14 个 section，在 1440×1000 下 main 高 4708px；段落与图的展开放大了滚动长度。
- related product examples 不是本页回答主线，缩成两条文字链接，不另开一个大型 section。

### 4. RFQ / Prototype / Shipping：每页守住自己的问题

位置：`src/components/RfqChecklist.astro:10`–`:17`；`src/components/PrototypeJourney.astro:10`–`:14`；`src/components/ShippingChecklist.astro:17`–`:22`。

- RFQ：保留五项摘要锚点 + 详细要求，这是一套索引与正文关系。What drawing review returns 与后面的 send 区有交集，可把 review returns 缩为末尾一句；同一 TXT 下载保留首个明确按钮即可。大 AI 静物没有标注五项对应关系，优先缩小或删图，给清单更多空间。
- Prototype：Validate / Approve / Repeat 导航保留，但使用简短导航标签；3 个导航 H2 不必与 3 个章节 H2 同等级。下一次 RFQ 的完整长段可以并入 repeat order 的操作提示。重点保留版本控制、prototype objective、sampling 与变更重报价。
- Shipping：核心是“买方提供 / quotation 确认”的逐项对照，保留。原始 packing archive 与来源边界保留。删两张不标注具体保护点的 AI 装饰图，避免真实 packing 原图被示意图稀释。将已经出现在对照表的术语说明合并到对应行，留必要的定义。
- 不把这四篇直接合成一篇：它们分别回答“提交什么 / 如何下单 / 何时重复生产 / 怎么运交”，职责不同。当前需要削减公共 RFQ 反复讲述，而不是消灭必要入口。

### 5. Quality / Factory / About：让真实证据承担信任

位置：`src/pages/quality.astro:40`、`:50`、`:60`、`:65`；`src/pages/factory.astro:12`、`:22`、`:23`；`src/pages/about.astro:28`、`:31`、`:33`、`:34`、`:37`。

- Quality：report format 和 Order documentation 可收进同一“确认文件与验收”区域；保留 blank example 标识、仪器/采样/critical-feature 要求。删设备区重复 CMM 图（`:65`），保持真实首图与设备方法表。
- Factory：workflow 的 4 张图里多张已经在前文设备/车间出现。用紧凑四步文字流程 + 原始包装图，减少 3 个重复图实例。
- About：原始人员、company history、documents 是本页最有价值信息。产品图卡与 Application families 都在泛讲行业时，先缩产品图卡为 2–3 条引用链接；重复 Inside our factory 留一处。
- About closing AI 零件图删掉，单一文字 RFQ 收尾即可。保留闭合的公司背景与应用说明，其已不占初始阅读注意力。证书图与文本按钮同一目的地可用单一明确可点击块；不能只剩没有明显操作含义的裸图。

### 6. 按钮：共用一个主操作规格

位置：`src/components/RfqChecklist.astro` 的 `.rq-button`；`src/styles/capability-editorial.css:21`；`src/styles/product-review.css:27` 与实际覆盖 `src/styles/finesse-redesign.css:170`；`src/styles/how-we-work.css:15`。

四类页独立运行时测量如下（1440×1000，同一会话同一独立 tab）：

| 页面 / selector | 背景 | 高度 | 圆角 | 字号 / 字重 |
|---|---|---:|---:|---|
| RFQ / `.rq-button` | rgb(199,34,47) | 51px | 0px | 15px / 600 |
| Milling / `.cap-button` | rgb(203,37,50) | 54px | 0px | 15px / 600 |
| Product / `.er-button` | rgb(203,18,23) | 52px | 3px | 15px / 600 |
| How We Work / `.ww-button` | rgb(203,18,23) | 52px | 2px | 15px / 650 |

用共用主按钮 token 管理背景、高度、圆角和 weight；具体采用 0px 或 2px 需与主站组件确定一次，随后同角色一致使用。RFQ 操作文字也统一为当前真实功能的 Prepare RFQ email。不要因按钮微差而把整个网站重做。

## 独立浏览器证据与限制

在 browser 4 创建独立后台 tab，未复用用户或 Assessment A 的标签页，未使用 browser 全局 viewport。用 tab scoped CDP Emulation 设置 1440×1000，检查 RFQ、Milling、Engine cover、How We Work 的 AX/DOM 与截图。四页 H1 实测 56px/600、H2 40px/600；正文文本规格一致。四页 document.scrollWidth = document.clientWidth = 1425，没有把截图显示裁切误记为页面 overflow。

| 页面 | 实测 main 高度 | 内容判断 |
|---|---:|---|
| RFQ | 3461px | 五项摘要与正文属于索引关系；同下载文件出现两处 |
| Milling | 5045px | 8 个 H2、较多案例入口；图纸要求连续三段语义重叠 |
| Engine cover | 2492px | 3 层产品信息已可扫描；公共 RFQ 行与具体几何字段可以进一步去重 |
| How We Work | 4708px | 六步流程有完整答案，但章摘要、步骤段、scope 表与装饰图增加长度 |

Browser 的 Playwright evaluate 明确是只读 API，因此没有尝试脚本注入、没有启动 impeccable live-server、没有对网页声称有可见 detector overlay；fallback 为独立截图、AX、只读 DOM 和源码/构建结构对照。截图工具在 emulation 时显示范围与 DOM 尺寸存在裁切差异，因此尺寸结论以只读 DOM 为准。审查结束已 clearDeviceMetricsOverride 并关闭自己创建的 tab。

CLI 只执行一次；无临时 server。本次统计用的临时 `b-analyze.mjs` 已删除，保留本报告与结构 JSON。没有留下本次无用临时文件。

## CLI 检测与人工解释（A 完成后解封）

唯一一次 `impeccable.cmd detect --json src` 产生 6 项 warning，0 个 error：`overused-font` 3 项、`border-accent-on-rounded` 2 项、`side-tab` 1 项。完整结果与原文位置保存在 `b-detector.json`。入口返回 0，数量依据完整 JSON 数组而非退出码推断。

| 规则 | 文件与行 | 人工解释 |
|---|---|---|
| overused-font | `src/styles/about-documentary.css:1` | Inter 是检测器审美启发式；四类页实测 type scale 一致。当前用户目标是统一与易读，不构成改字体的充分理由 |
| overused-font | `src/styles/factory-tour.css:1` | 同上；保留主字体，避免为消除此 warning 引入另一个字体体系 |
| overused-font | `src/styles/shipping-checklist.css:1` | 同上；本次不将字体普及度认定为可用性缺陷 |
| border-accent-on-rounded | `src/styles/global.css:25` | 命中 minified 行中的 `.draft-result{border-top:3px solid var(--red);…}`；命中的实际规则没有同元素圆角。未生成/提交询价，缺乏结果态“厚边框 + 圆角卡”实测证据，不上升为已确认视觉缺陷 |
| border-accent-on-rounded | `src/styles/how-we-work.css:13` | 明确误报：实际目标是 `.ww-eyebrow::before` 的 42px 章节标记线，不是圆角 card |
| side-tab | `src/styles/navigation.css:26` | 上下文误报：小屏 nav-panel 的 2px 中性 border-left 与 border-radius:0 用于层级；不是粗彩色卡片装饰边框 |

检测器没有量化正文信息重复、同一图片重复、入口数或真实证据对信任的贡献。这些方面由本次 81 页结构统计与独立浏览器检查提供依据。未把启发式 warning 当成阻断问题；也未声称用户可以看到检测 overlay。
