# Assessment A — 独立全站内容审查

方法：独立 Assessment A；没有读取 Assessment B、detector 或既有 critique。只读当前页面与源码，无业务内容修改。
目标：D:/lzz/lzz/_react；浏览器 http://127.0.0.1:4323；日期：2026-09-30。

## 覆盖与边界

审阅 dist 的全部 90 个 HTML：7 个 redirect 排除内容评分；83 个非跳转页全部抽取 main 正文并逐组通读，含 81 个公共内容页、1 个 404、1 个首页 preview。覆盖为：首页 1；产品目录 1 + 产品详情 35；能力目录 1 + 详情 10；加工研究目录 1 + 详情 8；资源目录及文章共 12；关于公司、新闻目录及 5 篇新闻共 7；contact/factory/privacy/quality/quote 各 1；404 与 preview 各 1。完整路由及逐页记录见 coverage-a.json。

桌面使用独立新后台 tab，未调整 viewport。视觉和 AX 核对：/、/quote/、/capabilities/5-axis-cnc-machining/、/products/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/、/about/company-news/china-africa-west-lake-summit-2025/。没有真实发送、打开邮件或上传。

HTML 抽取包含关闭的 details、noscript 和响应式替代 markup；报告不把这些误认为同屏重复。下文 A1 是浏览器 AX 可见的两组不同 section 确实重复，而非响应式重复。本文没有把历史文件当当前生产事实。40+ CNC machines、ISO 9001、MOQ 1、7–14 business days 接受当前项目授权，不判虚假；±0.01 mm 已有条件限定，不判为全产品保证。没有公开证书副本不等于未认证。

## 独立判断

网站已明确定位为按图定制 CNC 供应商，零件形态、工厂照片、工艺图、接受条件和草稿询价比泛化宣传更具体。最主要的问题是内容层级仍像叠加了几轮工程审阅：同一技术要求重复两次，若干产品用“另一个重叠 listing”解释信息架构，旧的关联推荐与新的零件定位没有同步。询价路径的“草稿不是发送”说明非常清楚，没有发现当前首屏诱导为在线上传/真实提交的承诺。

## 优先问题

### A1 [P2] 34/35 产品详情重复同一组图纸与检验要求

- 范围：全部产品详情，除 /products/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/。
- 代表路由：/products/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/。
- 可见原句：`Specify bore diameters, step depths and fits. Locate the face-hole pattern from drawing datums, including pitch-circle diameter or hole-center coordinates and the relationship to the central bore.` 同时出现在 Drawing priorities 与 Geometry & interfaces。`Agree diameter and depth checks for each bore step ...` 又在 Inspection 与 Inspection requirements 重复。
- 证据：src/pages/products/[slug].astro:48 将 engineering.drawing / engineering.inspection 放入首屏 requirements；:66 渲染；:83 再渲染完全相同字段。除 engine cover 使用特例 requirements，其他 34 页均复用。
- 影响：用户阅读第二节得不到新信息，长句同时挤压首屏和后段；35 页产品看起来像图纸指南模板，而非帮助选择相近零件的参考。
- 修复：保留首屏的“可见几何 / 关键选择”，将详细 datum、measurement、drawing input 集中在 Prepare your drawing 一处；或保留首屏完整要求，后段只提供新增的文件、数量、材料与 CTA。不要简单删掉必要检验条件。建议 `$impeccable distill`。

### A2 [P2] Multi-bore 页面换了定位，关联推荐仍在描述旧的 cavity / angled surface

- 路由：/products/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/；/products/custom-oem-high-precision-cnc-milling-manufacturer/；/products/ultra-high-precision-machining-services/。
- 可见原句：主页面 H1 是 `Multi-bore circular milled component`，首屏聚焦 `Central opening, stepped bores, face holes and machined circular surfaces.`，但 Compare part requirements 仍写 `alongside this example of cavities and angled surfaces.`；blocks 页面指向它的文案是 `Compare cavity milling when your block includes deep pockets or angled surfaces ...`。
- 证据：src/data/productDecisions.ts:60、:65、:70；当前主页面可见文本及图片已核对；:5 仍以 cavities 为内部 key，本身不是用户问题，但解释了内容失配。
- 影响：用户点击以为将找到深腔/斜面案例，却得到孔系圆盘；破坏“按几何比较”的导航承诺。
- 修复：把三个方向的推荐理由统一为 stepped bores、pitch-circle holes、circular faces 或准确重新选择真正展示深腔/斜面证据的目标；不从旧 catalog 服务描述推断该图片含有未见特征。建议 `$impeccable clarify`。

### A3 [P2] 铸件家族把“内容重叠”公开给买家，并让同一任务跨多个 listing

- 路由：/products/custom-cnc-machined-castings-transmission-housings-pump-bodies/；/products/oem-precision-cnc-machined-casting-housings/；/products/precision-cnc-machined-castings-manufacturer/。
- 可见原句：`Use this overlapping transmission and pump casting page ...`；`Compare the other powertrain casting listing for the same internal-feature scope ...`；`Compare the transmission and pump listing for the same internal-feature family ...`。
- 证据：src/data/castingReview.ts:12；src/data/productDecisions.ts:139、:140、:160、:168、:169；模板 src/pages/products/[slug].astro:87、:88。
- 影响：这些页面本来是不同资料项，现用 review focus 人为分开，但采购实际要同时解决 blank acceptance、internal features、sample reconstruction。让用户跨相近 H1 找同一份 RFQ 所需信息，增加选择和记忆负担；“overlapping listing”属于内部编辑说明。
- 修复：保留原资料与 URL，给家族一个统一、可比较入口，在同页展示“有图纸/只有样件/重点是内部特征”的任务入口；页面正文直接说明本参考图可见什么和需补什么，删除 overlapping、other listing 等内部术语。若未来合并公共页，先做明确 redirect/canonical 决策，不在本次只读审查中改路由。建议 `$impeccable clarify` / `$impeccable distill`。

### A4 [P2] Privacy 的来源承诺与当前产品模板不符

- 路由：/privacy/ 以及 35 个产品详情。
- 可见原句：`The original names remain available on those pages`；`Product pages show a catalog image`。
- 证据：src/pages/privacy.astro:11；当前产品模板 src/pages/products/[slug].astro:57、:59 展示 shorter title 与 displayImage，:27 的 legacyName 仅传入 inquiryHref，未在正文渲染。逐一将 35 个 catalog 原名与构建 main 正文对比：35/35 没有原名。:59 的 generated 分支也表明并非全部使用 catalog 图片；:60 已有 illustrative label。
- 影响：愿意核对资料来源的采购按说明找不到原名；privacy 页本身成为不准确的来源说明。并非要求把所有长 SEO 原标题放回首屏。
- 修复：将 privacy 改成与当前实现一致：精简标题供阅读，原始目录资料按需提供；如果确实需要页面内追溯，增加折叠的 original catalog name / reference ID，并注明 illustrative 与 original 图类型。建议 `$impeccable clarify`。

### A5 [P2] 5-axis 同一区域三次重复“不公开尺寸”，消耗决策空间

- 路由：/capabilities/5-axis-cnc-machining/。
- 可见原句：`Machine travel, load and maximum part envelope are not published here` 在 scope、Size & workholding、Review your part size & setup 连续出现三次，基本相同的 model/stock/dimensions/weight 清单随之重复。
- 证据：src/data/capabilityContent.ts:24；src/data/capabilityOverview.ts:29；src/pages/capabilities/[slug].astro:73。桌面 AX 已核对三次显示。
- 影响：进入能力页希望快速确认可加工性，得到三遍证据缺口，读完仍是一次同样的 size review。真实性边界正确，组织方式冗余。
- 修复：只保留一张简洁的“Size review required”说明，集中五项输入与 CTA；scope 讲何种几何适用，workholding 讲夹持/刀具接近需要看什么。不要补造 envelope、load 或 machine 型号。建议 `$impeccable distill`。

## 次要问题与各页面族结果

| 页面族 | 结果与具体待办 |
|---|---|
| 首页 + preview | 定制件、样件/小批次定位与询价过程明确，AI 主视觉有标签。preview 与首页正文相同是开发页面，不直接算公共重复内容缺陷。 |
| 产品目录 + 35 详情 | 首句明确 `not sold from stock`；所有品类通读。A1 是模板级重复。intake、plastic、stainless、pilot 家族已有各自 drawings/inspection 重点，不应笼统称 35 页全重复。铸件 A3 的 overlap 文案仍最明显。 |
| 10 能力详情 + 目录 | 采购信息整体齐全，3+2 与 simultaneous 区分清楚。5-axis 见 A5。通用尾部的 7 个资源链接 + 相关能力使下一步选择多于 4，建议把当前任务资源置前，其他折叠；这是信息架构建议，非阻断。 |
| 8 加工研究 + 目录 | 清楚区分 workshop photos 与 measurement/customer outcome；29-inch 明确是 display size，不是 part envelope；plastic/PTFE/coating 边界清楚。次要：普通 study 的 related capability 标题来自 slug，例如 `cnc milling service`、`5 axis cnc machining`，与导航 `CNC milling`/`5-axis machining` 不一致；src/pages/cases/[slug].astro 使用 slug 替换而非统一 display label，建议统一 capability 标题函数。 |
| 12 资源页 | RFQ、交货、质量文档、变更、问题处理可操作。process/material 对照表抽取出现两份是响应式 markup，不报可见重复。Material guide 的 C3600 已明确保留 brochure 原文并要求核实，不当成已纠正 C36000；这点应保留。指南中 source/illustrative 边界比较多，可集中为紧邻图片的简短来源说明，正文优先采购动作。 |
| about / factory / quality | 工厂、原照、教育/企业认定与 ISO 区分明确。about `Our history` 只有第一项 2017 有时间，其余 `More machining options` / `Production checks` 等没有年代（src/pages/about.astro:32、src/data/company.ts:15–20），更像能力发展说明，建议补经核实年份或更名 `How our capabilities developed`，不要创造时间线。quality 的 blank record 已标无结果，不是伪造检验。 |
| 公司新闻目录 + 5 文章 | 全部通读，照片叙事克制，无从活动推导交付成绩。次要语法：`1 dated groups` 和 `View 1 original photographs`，src/components/CompanyArchive.astro:79、:83；加单复数。2024 年摘要和 archive November 的精度不同，不足以断言日期冲突。 |
| quote / contact / privacy | 草稿、邮件附件、最终人工发送、local storage 均解释清楚，quote 采用 source snippet 检查验证/清除/恢复/error 文案，无外发。Privacy 见 A4。材料可以 unknown，数量可选，有助第一次咨询。 |
| 404 | 简洁解释可能移动/错误链接并可返回首页；无内容阻断。 |

## 内容与任务体验评分

只评本次可见信息与源码支持的行为，不代表真实邮件交付/production QA。

| Nielsen heuristic | 分数 | 依据 |
|---|---:|---|
| 1 系统状态可见 | 3 | 3 步 draft 状态与 not sent 文案清楚；未验证最终外部邮件发送。 |
| 2 贴近真实世界 | 3 | drawing、datum、finish 与采购真实任务匹配；overlapping listing 内部术语泄露。 |
| 3 控制与自由 | 3 | breadcrumb、返回、编辑/clear/copy/download 草稿路径可用的源码与说明。 |
| 4 一致性 | 2 | A2 推荐几何失配、A4 原名承诺、大小写命名不一致。 |
| 5 错误预防 | 3 | 条件公差、文件/附件/最终发送边界和 required fields 明确。 |
| 6 识别而非回忆 | 2 | A3 重叠家族要求跨页面收集同一 RFQ 任务；详情有重复清单。 |
| 7 灵活性与效率 | n/a | Persuade/B2B catalog 内容审查；不强评应用级快捷键与批处理。 |
| 8 简约与审美 | 2 | 排版清楚，但 A1/A5 的冗余增加阅读成本。 |
| 9 错误恢复 | 3 | source 有 copy blocked 的可行动替代、draft 保留/恢复/clear 说明；未真实外发。 |
| 10 帮助与文档 | 3 | checklist、工艺选型、运输、质量资料齐全；上下文资源优先级可改善。 |
| 合计 | 24/36 | 66.7%，Acceptable；主要需内容收敛与同步，无证据支持 P0。 |

## 认知负担、情绪旅程、优点

- 认知负担：主导航 5 组是合理业务分组；单组无需硬凑 4。真正负担来自产品页 A1 重复、铸件 A3 记忆桥、能力尾部多个同权下一步和材料指南 9 项目录。改善应减少重复和强化当前任务，而非删专业细节。
- 情绪旅程：首页图像与具体零件产生兴趣；进入产品后大量 imperative instructions 容易让采购感觉一直被要求提供更多；quote 首屏解释草稿流程并提供直接 email/WhatsApp 作为低压力出口，收尾较好。可用一句清楚的“提供最低三项后，我们会返回什么”连接要求与服务，不新增响应时间保证。
- 优点 1：原图、AI 图、案例、检验结果、供应商资质的证据边界总体明确。
- 优点 2：当前 CTA 与邮件草稿实际动作一致，反复明确未上传/未发送，不制造提交成功假象。
- 优点 3：工程要点围绕实际 geometry、interfaces、finish 和 inspection，不靠“世界级/极致精度”等空泛词。

## 人物风险与建议问题

- Jordan 首次采购：不知道是否要先选对某个铸件 listing 才能询价；A3 可改为“任何相近例件均可，提交自己的图纸”。
- Riley 核对型采购：privacy 声称 original names 在页面，却找不到；同一 multi-bore 的 incoming links 说 deep pockets，使资料一致性受疑。
- Experienced sourcing engineer：A1/A5 重复让快速扫读失去效率，尤其已知道材料、图纸和 inspection 的访客。

供主代理最终提问用：是否先处理模板冗余与事实同步（A1/A2/A4），再梳理重叠的铸件家族入口（A3）？不需要先改视觉或公开未经核实的技术参数。

Questions skipped: 独立子任务仅向主代理提交评估，由主代理汇总后询问用户。
