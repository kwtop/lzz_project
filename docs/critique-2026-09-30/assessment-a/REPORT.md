# Assessment A — 独立设计评审

目标：`D:/lzz/lzz/_react/src/pages` 及共享组件；当前本地页面 `http://127.0.0.1:4323/`。本评审只使用当前源码、`DESIGN.md` 中仍适用的内容契约、最新 `docs/b2b-upgrade-2026-09-29/DESIGN_DIRECTION.md` 和本轮新建 headless Chrome context 的渲染/交互证据。未运行 detector、未读取 detector 结果、未读取已有 critique 报告或历史评分；未修改 UI/源码。

## 设计专属性结论

**整体已明显为 LZZ 的定制 CNC 采购场景而写，专属性中上。** 零件形状、真实加工现场、检验区域、按图生产的边界、MOQ/生产时间和供应商资格要求共同构成了产品性格。白色技术内容、charcoal 页尾、克制的 red 主操作和 Inter Variable 相互协调，符合工业供应商面向海外工程师/采购员的沟通方式。

首屏的电影式加工图和 “Your parts / Machined to order” 仍有 CNC 行业通用性；真正不可互换的内容主要在后续零件、工厂和加工研究中。机会是更快到达这些已有证据，并让读者从某个具体零件/工艺无损进入 RFQ。无需改字体、引入新色系、创造客户案例或增加未经证实的指标。

## Nielsen heuristics

本目标同时含 Persuade、Read 和 RFQ 操作流程，因此全部十项适用。

| # | Heuristic | 0–4 | 当前证据与主要扣分 |
|---|---|---:|---|
| 1 | Visibility of System Status | 2 | RFQ 有步骤、保存状态和明确“未发送”说明；但移动端准备草稿后结果标题落在视口上方，第一反馈不可见。 |
| 2 | Match Between System and Real World | 3 | 图纸、材料、finish、quantity、inspection 与采购工作一致；正文有少量长技术句，工程师可理解。 |
| 3 | User Control and Freedom | 3 | 搜索/筛选可清除；菜单可 Escape；草稿可编辑、复制、下载并刷新恢复。Clear saved input 实际同时清空当前表单，缺少回退。 |
| 4 | Consistency and Standards | 3 | 字体、颜色、共享模板和主次操作稳定；资源文章的 breadcrumb 分类名称与 hub 分类不同，行业 disclosure 的视觉模式也不同。 |
| 5 | Error Prevention | 3 | 必填、email/quantity 原生约束、可选字段和 tab 内保存降低风险；清空当前输入没有恢复机制。 |
| 6 | Recognition Rather Than Recall | 3 | 面包屑、页内导航、部分上下文引用、技术 checklist 都有帮助；页面主 CTA 与 header CTA 携带上下文的行为不同。 |
| 7 | Flexibility and Efficiency of Use | 3 | 产品搜索、三类 facets、直接 Email/WhatsApp、RFQ 多种出口实用；行业入口和部分长文入口增加查找成本。无需为营销站硬加快捷键或批量功能。 |
| 8 | Aesthetic and Minimalist Design | 3 | 内容由真实工业图像和中性排版主导，少装饰；部分 guide 先给大图，桌面 catalog 图框也把名称推至首屏下方。 |
| 9 | Help Recognize, Diagnose, Recover from Errors | 3 | 原生输入验证指向问题字段，复制失败有具体替代办法，输入保留；未验证真实邮件发送或 mail client 行为，不据此评分。 |
| 10 | Help and Documentation | 3 | FAQ、RFQ checklist、工艺/材料/交付 guides 和表单提示较完整；部分 help 的首个有用答案到达较慢，分类返回路径不完整。 |
| **Total** | | **29/40** | **Good：基础良好，修复关键状态与入口层级后可进一步提升。** |

## 做得好的三个方面

1. **工厂与检验是具体、可核查的内容。** `/` 的 Factory & quality 把 workshop、公司 facts、CMM 照片和 inspection explanation 合成一组；`/quality/` 先解释 supplier qualification、再给设备/流程/记录，区分 ISO 与公司 recognition documents。比孤立 logo 或无证据的信任数字更支持供应商筛选。
2. **产品与能力页按采购问题组织。** 零件图、用途、made-to-order、MOQ/时间、材料与制造、drawing & inspection checklist 的顺序合理；材料/工艺页面给 part suitability、实际工艺图和按图评审要求。相关零件的比较理由不是单纯堆同类链接。
3. **RFQ 的功能边界清楚且有可用退路。** 页面明确说明生成 draft、在 email app 附图并发送；可选联系方式折叠，material/quantity 可待确认；Prepare、Edit、Copy、Save、刷新恢复都实际可用。本轮没有发送邮件。

## 优先问题（五项）

### A1 · P1 · 移动端生成草稿后，确认标题被滚到视口上方

- **位置：** `/quote/`，`Prepare email draft` 后的 `.draft-result` / `#draft-heading`。
- **可见证据：** 390×844、填写 name/email/project 后点击 Prepare，等待 500 ms；结果 top `-120.91 px`，标题 top `-92.91 px`、bottom `-35.69 px`，已完全在屏幕上方。屏幕首先看到摘要、attachment 和 Open email app，缺少“Email draft prepared — not sent”及下一步说明。`screens/quote-draft-mobile-settled.png`、`followup.json`。
- **原因：** `src/components/QuoteForm.tsx` 对比视口更高的整个结果执行 `scrollIntoView({block:'nearest'})`；之前提交按钮的位置和结果高度决定了落点。
- **影响：** 在最需要确认“已完成什么/还没有发送”的时刻，用户必须自行向上寻找状态。不是草稿生成功能失效。
- **最小修复：** 将焦点和滚动目标改为结果标题或紧凑的结果起始锚点，`block:'start'` 配合 fixed header 的 `scroll-margin-top`；保留 aria-live 和可编辑行为。
- **Suggested command：** `$impeccable harden` / `$impeccable adapt`。

### A2 · P2 · About 行业入口没有 disclosure 标志，看起来像静态标题

- **位置：** `/about/#applications`，`.application-grid` 中 11 个行业 `<summary>`。
- **可见证据：** 行业文字下只有 separator，看不到 chevron、plus 或“展开”。全部 summary 的 `list-style-type:none`，`::before`/`::after` 为 `none`；源码还隐藏 native marker。`screens/about-industries-region.png`、`details.json`。
- **原因：** `src/pages/about.astro` 的 `.application-grid summary` 移除了原生标志，没有补充同站其他 disclosure 使用的 +/-。
- **影响：** 用户可能把这些行业看成静态分类，漏掉内含说明和零件/能力链接；11 个同权标题也增加扫描成本。
- **最小修复：** 为每个 summary 加清楚的 +/- 或 chevron、open 状态与完整点击行；按现有 source 内容分 3–4 个视觉组，保持全部内容。
- **Suggested command：** `$impeccable clarify` / `$impeccable polish`。

### A3 · P2 · 最容易触达的 header RFQ 入口丢失当前零件/工艺引用

- **位置：** 产品详情及 `/capabilities/cnc-turning-service/` 的 header `Request a Quote`；同类差异适用于共享 header。
- **可见证据：** turning 页面正文 CTA 指向 `/quote/?part=CNC+turning&capability=cnc-turning-service&source=...`；产品正文 CTA 同样含 product/source。点击 header CTA 实际到 `/quote/`，没有引用参数。两条路径均实际点击验证。`followup.json`。
- **原因：** `src/layouts/Layout.astro` header href 固定 `/quote/`，未复用页面 `inquiryHref`；`src/pages/cases/[slug].astro` 的 Discuss your drawing 也固定为 `/quote/`，后者是源码证据。
- **影响：** 用户在浏览特定零件后点击固定导航，会到同样的表单却丢掉参考对象，必须记住/重写名称与链接。不是必填字段坏了。
- **最小修复：** 为具有产品/能力上下文的 Layout 传入相同 inquiry URL，让 header 和正文一致；对 study 可只带 source page/title，不将独立照片例子表述为客户订单。
- **Suggested command：** `$impeccable harden` / `$impeccable clarify`。

### A4 · P2 · 部分 Read 页面的大图先于有用答案，内容入口过迟

- **位置：** `/insights/material-and-finish-checklist/`，title → decorative editorial image → disclosure caption → On this page → body；共享 article 模板中的其他有 visual 的 guide。
- **可见证据：** 1440×900 首屏主要是标题和图，第一正文 heading 在 document y≈1288；390×844 的 contents y≈723，正文 y≈826。相比之下 `/insights/prototype-vs-small-batch-cnc/` 已把解释与比较放在图前，是可复用的正确先例。`screens/material-guide-desktop.png`、`mobile-sheet-5.png`、`followup.json`。
- **原因：** `src/pages/insights/[slug].astro` 在一般 guide 中统一先渲染 `.article-editorial-image`；comparison guide 有特例。
- **影响：** 来找材料/finish 答案的人先花一个屏幕浏览 illustrative scene，尤其移动端缺少先读结论或直达章节的机会。
- **最小修复：** Guide 共用“简短答案/读者需要决定什么 + contents”起始模式，将已有 illustration 放在相关正文后；保留 disclosure。Company News 的纪录照片可保持早出现。
- **Suggested command：** `$impeccable distill` / `$impeccable layout`。

### A5 · P2 · 桌面 catalog 首屏能看到零件，却看不到名称和比较信息

- **位置：** `/products/`，1440×900 首行 `.product-card`。
- **可见证据：** 第一 card top≈524，title top≈904，context top≈962；整个900px首屏只看照片，无法同时读名称/工艺要点。移动版已用两列紧凑图展示且名称可见，不存在同样问题。`screens/catalog-desktop.png`、`details.json`。
- **原因：** title、search、facets、results meta 合计占据前半屏，加上近正方形图片框的垂直尺寸。
- **影响：** 在“选哪个参考零件”这个比较决策上，图片和名称被分开到两个滚动位置；三个元素并非同时可识别。
- **最小修复：** 收紧 desktop controls 与结果间距，并降低首行 image frame 的桌面高度（约280–300 px），将名称和短 context 带回同一首屏。保持真实形状、contain 和现有照片。
- **Suggested command：** `$impeccable layout` / `$impeccable distill`。

## 补充具体问题（供主报告挑选 Top 10）

| ID / 优先级 | 位置与证据 | 原因 / 影响 | 最小修复 |
|---|---|---|---|
| A6 / P2 | 移动 `/products/` `.product-card-context`；实测12px、line-height16.8px，`details.json`；`mobile-sheet-0.png`。 | 标题下面的 process/features 是核心区分信息，却比正常15–17px body小很多；两列形状比较时要仔细辨读。 | 改为至少14px/1.5，允许多一行并保持短句；不放大整个卡片标题。 |
| A7 / P2 | `/quote/` `Clear saved input`；输入 name/project 后点击，两个当前字段都变空，`details.json`。 | 标签强调“saved”，但动作同时清空正在填写的表单，且没有 Undo；用户若只想清保存状态，会损失当前工作。 | 改成“Clear form and saved draft”，并提供可恢复的 Undo；不增加逐字段确认。 |
| A8 / P2 | `/insights/prototype-vs-small-batch-cnc/` breadcrumb 为 Resources / Production planning；material guide 为 Resources / Design preparation。 | hub/nav 分类为 Production & Shipping、Processes, Materials & Finishes，breadcrumb 第二项却是另一套不可点击标签，无法返回所属分类。 | 用 `knowledgeTopics` 的真实分组映射形成可点击分类 crumb，article title 作为当前位置。 |
| A9 / P2 | 产品详情 `.gallery`，engine-cover 实例只有1张img，0个button、0个link；`src/components/Gallery.tsx`、`details.json`。 | 移动端只能看缩小的形状和纹理，没有明显的查看大图入口；工艺纹理/小孔需借助浏览器缩放。现有资料不足以推断隐藏面的尺寸。 | 把现有图片链接到其大图，或加入可键盘打开/关闭的简洁 zoom。无需新图片或推测几何。 |
| A10 / P2 | 移动首页 opened Capabilities menu，panel实测647px高；4个 machining、4个 materials、2个 projects、1个 overview，其他主组在首屏下方。 | 分组正确，但展开后用几乎整屏空间呈现11个入口，用户要滚菜单才能转到 Factory/Resources/About；不属于导航打不开。 | 缩紧组间空隙，或让 Materials/Projects 用第二层 disclosure；维持44px target 和所有服务可达。 |
| A11 / P3 | `/about/` 页面跳转区7个同权入口，Company News 跳到独立页面而其余多为页内位置。`src/pages/about.astro`、`mobile-sheet-3.png`。 | 用户先选页面部分时，同时面对章节导航与外部内容跳转；移动区占用3行且视觉角色相同。 | 只保留4个主要章节入口，其他放在相应段落；将Company News 标成独立内容入口。 |

## Cognitive load

全站综合**中等（3项未稳定满足）**：Chunking、Minimal choices、Working memory。视觉层级大体清楚，RFQ 结果落点是具体例外。

- **Single focus：基本通过。** 产品/工艺页有单个主RFQ动作，其他链接是下一步资料。RFQ的Open email app与三个次动作也能区分。
- **Chunking：局部失败。** About行业有11个同权disclosure；并非全部11个都要删，而是需要分组与明显展开状态。
- **Grouping：通过。** 程序/材料/订单facets和工厂/quality证据分组明确。
- **Visual hierarchy：基本通过。** 内页标题、正文、主动作分明；但RFQ立即结果看不到标题，guide首屏首先突出辅助图。
- **One thing at a time：通过。** 表单只强制name/email/project；其余可待确认或展开后填写。
- **Minimal choices：局部失败。** About跳转区7项、About行业11项；移动Capabilities展开时共11条目的总面板接近全屏。主header五个分组本身是常见导航结构，不仅因超过4就扣分。
- **Working memory：局部失败。** 产品/能力主CTA保留引用，header入口不保留；guide breadcrumb标签要求用户记忆hub的分类关系。
- **Progressive disclosure：通过。** Technical planning、records、company archive、optional contact、FAQ已使用native details；行业disclosure需要补充可发现性。

## Emotional journey

首页的深色加工hero先建立专业和材质感；真正的信任高点来自factory、CMM、真实workshop studies以及可区分范围的公司文件。产品页在照片后给制造与检验问题，情绪从“看起来能做”转向“可以具体讨论”。

低谷发生在帮助内容入口的长图等待、About行业入口的不可发现、以及选定对象后从header进入空白上下文的RFQ。终点的文案非常诚实：明确未发送、要求email app附图、有复制/保存退路。移动生成后把这句确认滚出屏幕，削弱了本来设计得不错的终点安心感。Footer的直接email/WhatsApp与真实地址提供稳定收尾。

## Personas 的具体红旗

- **Jordan / 首次寻找供应商：** About行业标题没有展开标志，可能看不到适用性说明；material guide先给整屏illustration，直到下一屏才读到需要在图纸里标什么。
- **Casey / 被打断的移动采购员：** tab内恢复有利于回来继续；但点击Prepare后第一屏没有结果标题。catalog核心context仅12px也增加手持阅读负担。
- **Riley / 核对承诺与状态：** draft实际生成与恢复可用；清除saved input也清当前值，以及header与正文CTA引用不同，都属于可复现的交互差异。没有把“draft prepared”当作真实收到询盘。

## 可用于主报告的具体问题

1. 下一轮先修移动RFQ结果定位与上下文一致性，还是先修guide/catalog的信息入口？
2. About是否保留完整公司资料但折叠为较少入口，还是保留当前入口数量只补清楚展开状态？
3. 修复范围选择五个优先问题，或包括 A6–A10 的读取/恢复细节？

## 证据范围与限制

- 初次访问服务尚未启动，得到 `ERR_CONNECTION_REFUSED`；主Agent启动服务后重新使用fresh browser context。未把初始连接错误算成产品缺陷。
- 当前浏览：35个桌面route（含正确404状态），18个移动route；覆盖10个capability分类、4个产品实例、常规/collection两类studies、resource hub/3分类/FAQ/长guide/news、factory/quality/about/quote/privacy/404。另看opened桌面/移动导航、empty/invalid RFQ、prepared/restore/clear状态。
- 主采集56个route/state记录，没有浏览器JS错误，移动页记录的scrollWidth均为390；这是本轮样本证据，不是所有生产访问或真实邮件交付的保证。
- 最初即刻截图曾抓到菜单开合重绘中间帧；等待500ms后的nav面板正常显示。因此**没有导航空白/白色文字不可见的问题结论**，最终证据是 `nav-capabilities-mobile-settled.png`、`nav-capabilities-desktop-settled.png`。
- Screenshot与DOM/状态证据保留在本目录：`evidence.json`、`followup.json`、`details.json`、`screens/`。采集用临时 `.mjs` 已删除。无UI edits，无真实邮件发送。浏览器context已关闭；开发服务器由主Agent管理和停止。

## 当前代码定位

| Finding | 当前源码位置 |
|---|---|
| A1 | `src/components/QuoteForm.tsx:74`，结果使用 nearest 滚动。 |
| A2 | `src/pages/about.astro:78`、`:79`，summary隐藏list marker。 |
| A3 | `src/layouts/Layout.astro:77`，共享header固定 `/quote/`。 |
| A4 | `src/pages/insights/[slug].astro:45`，一般article先给visual。 |
| A5 | `src/styles/brand-system.css:56`、`:122`，共享产品image frame；实际title位置见 `details.json`。 |
| A6 | `src/styles/studio-refinement.css:144`，移动context为12px。 |
| A7 | `src/components/QuoteForm.tsx:99`、`:147`，clear实现与按钮标签。 |
| A8 | `src/pages/insights/[slug].astro:44`，breadcrumb直接显示article.category。 |
| A9 | `src/components/Gallery.tsx:4`、`:5`，仅有img，没有查看原图入口。 |
| A10 | `src/styles/navigation-refinement.css:31`，mobile panel的padding；菜单条目结构在 `src/components/MainNavigation.astro`。 |
| A11 | `src/pages/about.astro:31`，7项page jump入口。 |
