# 本轮独立采购与英文文案复查

评审对象：`http://127.0.0.1:4326/`。评审日期：2026-10-10。

只依据本轮当前网站取证。未读取历史讨论、旧评审、其他 audit、备份、记忆或其他 Agent 的判断；未修改业务代码，未构建或部署。静态文件只用当前 `dist/sitemap.xml` 确认公开 URL 清单，文案证据来自 CUA 控制的独立 Chrome tab 中实际加载的页面。

## 覆盖与实测

- 桌面 1440×900：81/81 公开 URL 实际加载、读取渲染正文，并展开正文中的折叠内容。基础页 7，能力页 11，产品目录与详情 36（详情 35），加工研究 9，资源 12，公司新闻 6。与当前 sitemap 比对无缺页。内部设计 Demo、比较页与旧重定向壳未纳入。
- 手机 390×844：81/81 公开 URL 实际加载并读取 DOM/正文与页面宽度；无整页横向溢出。重点截图实看首页、导航、产品搜索，以及复杂曲面、不锈钢、汽车原型、铸件、塑料、铜黄铜、小批量系列；另实看质量、工厂、关于、联系、材料指南、订单流程、研究和新闻模板。手机 81 页逐页的完整纵向视觉排版未全部截图检查，不能把 DOM 核验等同于每屏视觉验收。
- 桌面路径：首页 Custom parts → 目录搜索 `impeller`（2 个结果）→ Machined impellers → 产品关联询价 → 空输入校验 → 本地假数据邮件草稿。
- 手机路径：首页菜单 → 目录搜索 `316`（4 个结果）→ Stainless steel turned parts → 产品关联询价 → 空输入校验 → 本地假数据邮件草稿。
- 两种视口的必填错误提示有效；草稿保留产品名称、Reference ID 和正式域名的 Source page；准备草稿状态明确显示 `Email draft ready (not sent)`。使用 `buyer@example.invalid` / `mobile@example.invalid`，未打开邮箱、未发送邮件或 WhatsApp；两份测试输入均用 `Clear saved input` 清除并现场确认。未测试邮件客户端启动、真实发送、收件、附件或客户响应。
- 无法从本地页面验证：真实可加工包络/载荷、现行 ISO 文件、真实项目检查记录、材料当前供货范围、商业政策和 NDA 处理流程。下述企业事实缺口均需要企业提供，不能由编辑补造。

## 收益最高的 10 项

### 1. 给买家一个加工尺寸与载荷的初筛边界

**位置/证据：** `/capabilities/5-axis-cnc-machining/` 的 `Will your part fit the setup?` 明说：`machine travel, load limits and maximum part size are not listed here.` `/factory/` 只列设备类别和总数；铣削与车削页也要求发模型后审核尺寸，没有可用范围。

**采购影响：** 采购商连“大致能否接这件”都要先交图询问，尤其大型板件、长轴、重件；也容易带来不合适的 RFQ。

**推荐改法：** 在工厂设备与各能力页提供企业核实的工艺范围表：铣削可用包络、车削直径/长度、5 轴可用包络/载荷；明确毛坯、夹具和刀具净空仍需审核。所有数值及设备依据**待企业提供**，不能把轴行程直接当成最大成品尺寸。

**英文/顺序：** `Check your part size against our equipment limits. Final setup approval also depends on stock, fixture clearance and tool access.` 先范围表，再尺寸审核所需输入，再询价。

**验收：** 买家不发图就能初筛明显超范围的工件；桌面/手机能从能力页直接找到范围及限定条件。

### 2. 商业 FAQ 要给可执行答案

**位置/证据：** `/resources/faq/` 的付款答案是 `ask LZZ to confirm the payment method and currency`；样件答案是 `Ask for the sample machining and setup charges`；售后答案要求买家确认 warranty period、exclusions、rework、return freight、refund。`/resources/how-we-work/` 重复同一组待询问事项。

**采购影响：** 问题有标题，答案却主要是更多问题；新供应商比较、样件预算和采购审批仍缺实际政策。

**推荐改法：** 企业提供允许公开的支付方式/币种、付款阶段、样件收费与抵扣规则、异常报告时限及补救/运费原则。可变项明确哪些按项目报价，并说明报价里如何记录。不要编造统一押金比例、免费样件或保证期限。

**英文/顺序：** `Your quotation will state the payment stages, sample charges and agreed terms for nonconforming parts.` 后面直接列企业批准的政策答案，避免再让买家逐项追问。

**验收：** 采购商可从 FAQ 判断样件与正式订单需要哪些商业审批；仍未知的项目明确列为报价确认项。

### 3. 让 ISO 9001 可以自助核查

**位置/证据：** `/quality/#quality-management` 声明 `LZZ is ISO 9001-certified`，但又说明 `Certificate number, issuer and current validity are available on request.` `/about/` 公开的是企业认定/教育合作文件，并让访客另行索取 ISO。

**采购影响：** 已看到认证声明的供应商审核员仍须发邮件取得最基本的验证信息；现有企业认定不能替代这一步。

**推荐改法：** 企业提供现行证书及可公开信息：法定实体、证书号、认证机构、有效期、覆盖地点/活动和验证方式；在质量页公开精简摘要与证书入口，继续区分企业认定。未经提供，不补写任何编号、机构或日期。

**英文/顺序：** `ISO 9001 certification: legal entity, certificate number, issuer, validity and covered scope.` 摘要 → 证书/核查入口 → 与零件验收范围的区别。

**验收：** 买家能核对当前实体、时间和范围；所有字段与企业提供的现行证书一致。

### 4. 用一个真实匿名检查样例降低质量审核成本

**位置/证据：** `/quality/` 的公开报告所有字段为 `To agree` / `To define` / `—`，并明确 `Blank example only. No customer data, measured results or approval.` 研究页提供形状与装夹讨论，未提供测量结果。

**采购影响：** 空白表能说明如何约定报告，却无法让买家判断实际记录的完整度、可追溯性和测量呈现方式。

**推荐改法：** 企业在允许公开的范围内提供一份真实、匿名、可追溯的已填 dimensional 或 first-article 报告，展示修订、特征/基准、限值、方法和结果，并注明适用样件及测量阶段。没有可分享记录时保留当前空表，不伪造测量数据或把它称为实测案例。

**英文/顺序：** `Sample report fields: drawing revision, inspected feature, limit, measurement method and result.` 真实匿名记录 → 读法 → 本订单需另行约定的报告范围。

**验收：** 审核员可从样例判断记录内容；匿名化、原始依据与适用边界可由企业确认。

### 5. 询价字段要帮助收集精确材料和采购截止条件

**位置/证据：** `/quote/` 的 `Material, if known` 只能选 Aluminum / Stainless steel 等材料族；项目描述提示强调尺寸、修订、finish，却没有直接提示 exact grade/condition、到货日期或报告要求。详细要求散在 RFQ checklist；交付国家也放在可选折叠区。草稿测试可在材料/数量均为 `To confirm` 时生成。

**采购影响：** 买家可能认为选中 Stainless steel 已给出材料规格；需要报价比较或赶交期的人容易漏掉真正控制报价的条件。允许未知信息是合理的，不应把所有项目变为必填。

**推荐改法：** 将现有材料字段命名为 `Material family`；给精确 grade/condition 一个可选输入或在项目描述中明确提示。把“所需到货日期/目的地/检查记录”列为紧邻描述的简短提示，允许 `unknown / need advice`。

**英文：** `Material family (optional). Add the exact grade and condition to your drawing or part requirements.` `Include the revision, quantity, finish, critical features, required arrival date and inspection records.`

**验收：** 用 316L、特定 temper、指定到货日期的假 RFQ 测试，生成草稿可明确保留这些信息；未知项仍可继续。

### 6. 合并产品页重复要求，保留真正的差异

**位置/证据：** `/products/ultra-high-precision-machining-services/` 的首个 Material options 与 Manufacturing options/Materials 重复 titanium、Inconel、hardened stainless；datum axis/blade profiles 在 Key review、Geometry & interfaces、With your inquiry 反复出现。铸件页又在首表、Drawing requirements、Additional notes 与专门的 blank review 区块重复 allowance/datum/blank acceptance。

**采购影响：** 信息量看似很足，但连续阅读后新增判断少；手机长滚动使采购商更难分清哪些是本零件独有的要求。

**推荐改法：** 每页保持“适用形状与核心难点 → 一份材料/工艺/表面选项 → 一份图纸与检查输入 → 确有新增信息的专门说明”。将订单通用要求集中链接一次；保留 balance、leak、casting responsibility 等有价值的条件，删同义重复，不删规格。

**英文：** `For an impeller, define the blade profile and root transition against the datum axis. Specify the material condition, profile inspection and any separate balance test.`

**验收：** 同一材料列表只出现一次；任一条件被移动后仍可找到；相近页的主要差异可由开头和检查要求直接比较。

### 7. 手机搜索落地先让买家认出零件

**位置/证据：** 390×844 的 Machined impellers 页，产品识别图顶部实际在文档 y≈953；首屏是标题、CTA、MOQ 和长 Geometry and requirements 表，尚未见零件图。核心专门说明 `Blade profiles and the datum axis` 在 y≈1487，Manufacturing options 在 y≈1830。其他主要产品使用同类顺序。

**采购影响：** 从产品搜索或外部搜索落地的买家不能在首屏快速核对自己是否点到了期望的形状；要先读一段尚未建立视觉上下文的表格。

**推荐改法：** 手机信息顺序改为标题/一句特点 → 现有零件图（适当高度）→ CTA 与 MOQ → 简短核心审核问题 → 制造选项/检查要求。只调整现有图片布局与内容顺序。

**英文/顺序：** `Machined impellers — contoured blades and pockets, made to your drawing.` 先识别形状，再解释 datum/profile 条件。

**验收：** 390×844 首屏能识别零件形状与主要动作；其余材料/检查信息完整，桌面布局不退化。

### 8. 产品卡片与落地标题保持选型连续性

**位置/证据：** `/products/` 卡片 `Lid & gasket housings` 落到 `/products/small-batch-cnc-machining-manufacturer-complex-aluminum-housings/`，H1 为 `Complex aluminum housings`；卡片 `Angled aluminum enclosures` 的详情 H1 是 `Small-batch aluminum enclosures`；`Injector & fuel-rail manifolds` 落地 H1 变为 `Billet aluminum intake manifolds`。

**采购影响：** 目录已经用真实几何差异帮助选择，落地却又回到泛名称；买家需要继续读正文确认区别，也不利于确认搜索意图。

**推荐改法：** 对这些相近页统一卡片、H1、面包屑、Related parts 和询价 reference 的采购名称；保留每页真实差异和现有 URL。

**英文：** `Lid & gasket aluminum housings`；`Angled aluminum enclosures`。Injector 页继续突出 injector/fuel-rail interfaces。

**验收：** 从搜索结果/卡片到页首和 RFQ reference，名称连续；买家无需读完整段落才能确认选中的细分类型。

### 9. 材料指南先回答当前可供范围，来源差异放到一次说明

**位置/证据：** `/resources/material-and-finish-checklist/` 先列 `Material examples named in the original brochure`，之后正文与比较表重复讨论 brochure 的 `C3600 / H62` 与 current guide 的 `C36000`；同时明确该清单不能确认当前 stock/availability。

**采购影响：** 原始资料差异被完整保留，但采购正文让买家反复处理内部命名冲突，却仍无法判断该用哪个当前采购标准。

**推荐改法：** 企业先核对当前支持的合金名称、适用标准/状态和供货范围；正文提供一份当前材料表并说明库存按报价确认。C3600/C36000/H62 差异保留在一个可展开的来源注记中，未核实前不能静默统一或认定等价。

**英文：** `Specify the exact alloy designation, standard and condition on your drawing. We confirm availability and any proposed substitution in the quotation.`

**验收：** 采购商能找到一份当前材料清单；源文件差异只解释一次，且原文和不确定性仍保留。

### 10. NDA 提示放在第一次要求附图之前

**位置/证据：** `/quote/` 页首及草稿均要求 attach drawing；明确的 `If your project needs an NDA ... contact LZZ before sending restricted files` 在 `/resources/rfq-checklist/` 后段；`/resources/how-we-work/` 才说明可先约定 confidentiality terms。

**采购影响：** 需要保密协议的买家在主询价路径上缺少先走哪一步的提示，可能延后发送，或直到整理完草稿才发现应先联系。

**推荐改法：** 在 quote 页第一条附图说明附近，加一个简短 confidentiality 入口，指向现有联系渠道。只表达先联系约定，不声称已有签署 NDA、自动保护或已建立安全上传能力；具体流程需要企业确认。

**英文：** `Need an NDA before sharing drawings? Contact us to agree confidentiality terms first.`

**验收：** 桌面/手机询价入口不借助深层指南即可看到 NDA 步骤；草稿生成仍明确不等于已签协议。

## 本轮证据文件

- `desktop-browser-copy.json`：81 个当前浏览器 URL、标题与展开后的正文。
- `mobile-browser-render.json`：81 个手机 URL、标题、正文、页面宽度与可见询价链接。
- `desktop-impeller.jpg`、`desktop-quality.jpg`：桌面产品与质量模块。
- `mobile-rfq-draft.jpg`：真实本地假数据草稿状态；两份测试输入之后已清除。
- 其余 `mobile-*.jpg`：本轮重点系列和模板的手机截图。

所有截图用于展示布局与文字证据，没有检查或推断图片生成来源、生成质量、真实性或企业能力。
