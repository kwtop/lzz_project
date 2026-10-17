# LZZ 全站 finesse audit · 2026-09-30

结论：网站整体没有明显的 AI 建站感。首页、真实零件、车间和检验照片已经形成工业辨识度；模板感集中在 Resources 的等权大卡片、部分指南的大标题与插图，以及公司页面过长的资料串联。Inter 与白、charcoal、红色的方向成立。最值得投入的是内容层级和采购证据的可查验性。

本轮只审计，没有修改网站页面、组件、样式、文案或图片。下面的命令均为建议，未执行。

## 范围与证据

- 当前本地项目：`D:/lzz/lzz/_react`；本地预览：`http://127.0.0.1:4323/`。
- 原生浏览器从实际页面链接发现并检查 80 个公开页面：35 个零件详情、10 个能力详情、8 个加工研究详情、18 个 Resources 路由，以及各总览、首页、About、Factory、Quality、Quote、Privacy。
- 每个公开页面检查 1440×900、320×844、375×844、414×844、768×1024 的 DOM 与布局，共 400 次页面尺寸检查。80 页在这五个尺寸均未发现整页横向溢出；四个移动尺寸均未发现主标题或 section 标题越过视口左右边缘。这些结果不等于所有控件和交互状态均已通过移动检查。
- 404 和内部 `/preview/home-editorial/` 另外检查桌面与 320px，共 4 次；均有实际内容，无整页横向溢出。内部预览不计入公开页面数量。
- 对首页、目录、零件详情、能力详情、Resources、技术文章、加工研究、Quality、Factory、About 进行可读尺寸的目视复核；检查了移动导航、关键按钮、设备图片和键盘首个焦点。本轮同时参考同日上一轮评审的桌面/390px 截图；页面源码在两轮之间未修改。
- 静态 detector 运行一次，覆盖 68 个 Astro、TSX、CSS 文件。原始输出见 [detector.json](D:/lzz/lzz/_react/docs/finesse-audit-2026-09-30/detector.json)；逐项结合源码和实际页面判断，未把正则命中直接当成可见缺陷。
- 判断以现有 Inter 工业网站和 [DESIGN_DIRECTION.md](D:/lzz/lzz/_react/docs/b2b-upgrade-2026-09-29/DESIGN_DIRECTION.md) 为准。没有把白背景、缺少纹理、使用 Inter、没有 WebGL 或没有 finesse 历史 stamp 自动视为设计失败。

这是本地审计，不是生产状态、真实性认证或实际邮件交付验证。页面长短为测量结果；对模板感、阅读成本和信任感的评价为设计判断。

## 六个重点的判断

| 重点 | 判断 | 主要依据与影响 |
|---|---|---|
| 明显 AI 建站感 | 整体较低，部分内页有通用生成布局的特征 | 没有渐变字、默认玻璃卡片、无意义的装饰数字或假客户墙；真实加工照片和定制边界有效。部分页面采用大标题、大图、同规格卡片，内容权重区分不足。AI 插图有明确标注；使用插图本身不是建站感的判据。 |
| 模板 Section | Resources 最明显；About 的串联和部分标题次之 | 7 篇指南采用相近的图片、标题、描述和行动布局，没有充分区分“先准备图纸”与后续参考资料。About 同时承担介绍、车间、团队、历史、文件、行业、零件和档案，视觉权重接近。能力页的适用性、材料和检验问题有实际差异，共享组件本身不是缺陷。 |
| 字体、配色、间距 | 字体与色系协调；局部留白和文字层级仍需收紧 | Inter Variable、charcoal 标题与红色主操作一致。常见桌面标题约 50–60px、section 约 32–40px；正文通常 16–18px。主要问题是标题和配图消耗空间却没有同步增加有效信息，以及手机目录的 12px 工艺小字。 |
| 图文比例 | 首页、零件详情总体合理；资料入口与部分证据图欠佳 | 首页的大图有品牌展示作用，零件详情的 contain 保留几何。Resources 7 个入口使页面达到约 4,664px；材料指南正文标题在桌面 y≈1,288。部分竖幅设备图被横框裁切，影响完整查看设备。 |
| B2B 信任感 | 足以形成初步供应商认识；独立资格核验仍需额外联系 | 地址、公司名称、原始照片、CMM、按图生产说明是有效基础。ISO certificate、适用 scope、calibration records 目前走索取路径；检验表只是明确标注的空白格式。当前页面不能让采购自行完成这些核验，但也没有用空白表冒充实测结果。 |
| Mobile | 基础布局稳定；严格 finesse 门槛未全过 | 全站四个移动宽度无整页或主要标题横向溢出。320px 的 header 询价按钮和 Quality 主按钮换行，页脚导航高度为 40px，低于 finesse 的 44px 要求。部分目录小字和长页面增加读取成本。 |

## 按优先级处理的 8 项

P0 在此表示 finesse 明确要求的移动硬门槛未通过；P1 表示对页面专属性、内容层级或采购信任有明显影响；P2 表示精修问题。P0 的具体影响是触控和按钮排版，不是白屏或询价功能失效。

### 1. P0 · 移动触控尺寸与按钮单行门槛未通过

**看得到的问题：** 320px 下，全站 header 的 `Request a Quote` 为两行，实测约 89×57px；Quality 的 `Discuss your inspection needs` 为两行，约 257×75px。页脚 9 个导航入口高度为 40px，finesse 要求至少 44px。

**访客成本：** 小屏主要行动显得挤，按钮节奏不统一；页脚连续入口留给手指的垂直范围偏小。当前按钮仍可见并可操作，应把实际影响与门槛等级分开理解。

**最小改法：** 为窄屏提供能单行显示的短标签，保证导航品牌、询价与菜单之间的空间；页脚链接提高到至少 44px，不靠继续缩小字号解决。正文长句、FAQ 和普通阅读链接不需要机械地全部改成单行。

**位置：** [brand-system.css:171](D:/lzz/lzz/_react/src/styles/brand-system.css:171)、[studio-refinement.css:231](D:/lzz/lzz/_react/src/styles/studio-refinement.css:231)、[quality.astro:14](D:/lzz/lzz/_react/src/pages/quality.astro:14)。

**建议命令：** `/finesse redesign src/components/MainNavigation.astro src/styles/studio-refinement.css src/pages/quality.astro`

### 2. P1 · 部分技术指南把大图放在答案前面

**看得到的问题：** 材料与 finish 指南先显示约 60px 的长标题，再显示大幅 AI 辅助插图及说明，随后才是目录和正文。桌面首个正文标题位于 y≈1,288；320px 下位于 y≈808。首屏主要传达“这是一篇文章”，具体决策点接近下一屏。

**访客成本：** 从搜索或采购问题进入的读者，要先经过辅助图像，才能看到材料、finish 和验收的判断依据。这种通用文章头部也增加模板感。

**最小改法：** 技术指南先给简短答案或决策摘要与目录，将插图放到相关正文后；参考已有 prototype-vs-small-batch 的答案优先安排。公司新闻的纪录照片可以继续按新闻内容组织。

**位置：** `/insights/material-and-finish-checklist/`、`/insights/rfq-checklist/` 等；[insights/[slug].astro:45](D:/lzz/lzz/_react/src/pages/insights/[slug].astro:45)。

**建议命令：** `/finesse redesign src/pages/insights/[slug].astro`

### 3. P1 · Resources 的入口都像同等重要的大图文章

**看得到的问题：** 7 篇指南以相近的两列大图、34px 标题、描述、`Read the guide` 呈现。桌面图片约 550×367px；整页约 4,664px，320px 下约 7,035px。第一篇指南标题到桌面 y≈1,176 才出现。

**访客成本：** 用户不容易一眼判断最该先读哪篇，也无法快速比较资料用途。大量空间用在入口配图上，使资料库更像通用博客首页。

**最小改法：** 明确一个“准备询价”的首要入口，其余按采购问题组织成紧凑索引，标明每篇能解决什么问题；保留少量有信息价值的代表图，不要求七个入口等权。

**位置：** `/insights/` 与相关分类页；[insights/index.astro:13](D:/lzz/lzz/_react/src/pages/insights/index.astro:13)、[insights/index.astro:19](D:/lzz/lzz/_react/src/pages/insights/index.astro:19)、[KnowledgeCategory.astro:17](D:/lzz/lzz/_react/src/components/KnowledgeCategory.astro:17)。

**建议命令：** `/finesse redesign src/pages/insights/index.astro src/components/KnowledgeCategory.astro`

### 4. P1 · 采购信任已有实物基础，但关键资格证据只能索取

**看得到的问题：** Quality 说明 ISO 9001-certified，证书、法律主体、有效期与 scope 要通过邮件索取；校准记录也要另行请求。公开检验记录区显示的是明确标注的空白格式，About 的文件是企业认定和教育合作资料。

**访客成本：** 正式供应商筛选需要额外联系和等待，照片能证明实际场景，却不能替代资质与测量证据的核对。这是公开证据不足，不是对现有认证声明真伪的判定。

**最小改法：** 若已有可公开且获准使用的有效证书或脱敏实测记录，给出清晰的查看入口和适用范围。资料不可公开时，把“索取资格文件”的入口、包含文件与核对事项集中呈现。不得用 generated imagery、企业认定文件或空白示例替代这些证据，也不补造客户和检验结果。

**位置：** `/quality/#quality-management`、`/quality/#inspection-records`、`/about/#documents`；[quality.astro:16](D:/lzz/lzz/_react/src/pages/quality.astro:16)、[quality.astro:23](D:/lzz/lzz/_react/src/pages/quality.astro:23)、[about.astro:41](D:/lzz/lzz/_react/src/pages/about.astro:41)。

**建议命令：** `/finesse redesign src/pages/quality.astro`

### 5. P1 · About 缺少主次，采购证据被公司资料的长串联推后

**看得到的问题：** 公司介绍、工厂、团队照片、历史、文件、行业、零件与档案依次出现。桌面整页约 7,638px；320px 下约 11,447px。Company documents 桌面标题位于 y≈3,821。已有顶部跳转入口缓解了寻找问题，但各块仍接近同等展示权重。

**访客成本：** 用户需要在团队活动、品牌介绍和供应商事实之间切换，判断公司是谁、能提供什么和如何核验的路径不够集中；连续大 section 有资料堆叠的模板感。

**最小改法：** 首段集中公司主体、简要工厂事实、相关资格文件入口与联系人，再呈现最能说明能力的现场证据。团队活动、背景与完整档案继续保留，可使用更紧凑的次级入口。塑料加工研究约 10,601px 的手机页面也适合增加材料概览和直接定位，保留全部原始照片与视频。

**位置：** `/about/`；[about.astro:31](D:/lzz/lzz/_react/src/pages/about.astro:31)、[about.astro:37](D:/lzz/lzz/_react/src/pages/about.astro:37)、[about.astro:41](D:/lzz/lzz/_react/src/pages/about.astro:41)。

**建议命令：** `/finesse redesign src/pages/about.astro`

### 6. P2 · 部分设备证据图被横框裁切，零件图缺少完整查看入口

**看得到的问题：** Factory 的 turning 与 five-axis 原图为 648×864，显示在约 554×320 的 `cover` 横框中，仅显示约 43% 的源图高度；点击图片进入能力页。CMM 图当前为 `contain`，不属于这一裁切问题。产品详情 Gallery 只有图片，没有原图或放大入口。

**访客成本：** 设备结构和零件细节不易完整检查，真实图片作为采购证据的作用弱于其本来价值。

**最小改法：** 按证据目的选择完整比例或有解释的局部裁切，并提供原图查看；继续保留真实照片，不用更漂亮的示意图替换现场证据。

**位置：** `/factory/#equipment` 与产品详情；[factory.astro:37](D:/lzz/lzz/_react/src/pages/factory.astro:37)、[studio-refinement.css:43](D:/lzz/lzz/_react/src/styles/studio-refinement.css:43)、[Gallery.tsx:5](D:/lzz/lzz/_react/src/components/Gallery.tsx:5)。

**建议命令：** `/finesse redesign src/pages/factory.astro src/components/Gallery.tsx`

### 7. P2 · 目录把图片与名称分开，手机比较信息字号偏小

**看得到的问题：** 1440×900 的目录首行零件名称在 y≈903，工艺说明更靠下，首屏能见图片却难以同时读到名称。手机两列布局能显示名称，但工艺特征说明为 12px、行高 16.8px。

**访客成本：** 桌面扫描时要继续滚动才能识别对象；手机比较形状、工艺和特征时文字较费眼。字体家族没有问题，问题在空间和层级的分配。

**最小改法：** 收紧桌面 controls 与图片框，让形状、名称和一句特征同屏；保持 contain，保护几何完整。手机工艺说明提高到更舒适的字号并缩短句子，保留两列时验证实际内容。

**位置：** `/products/`；[brand-system.css:122](D:/lzz/lzz/_react/src/styles/brand-system.css:122)、[studio-refinement.css:143](D:/lzz/lzz/_react/src/styles/studio-refinement.css:143)。

**建议命令：** `/finesse redesign src/components/ProductExplorer.tsx src/styles/studio-refinement.css`

### 8. P2 · 部分主标题描述服务，弱化了页面对象

**看得到的问题：** 首页卡片是 `Machined impeller`，进入详情却成为 `Precision machining for complex geometry`；About 首标题是 `CNC machining in Hangzhou`，公司主体要到后面的介绍区才出现。

**访客成本：** 用户需要重新确认“这是叶轮实例还是通用加工服务”“公司具体是谁”。这种可套用到许多供应商的标题，减弱了页面的专属性。

**最小改法：** 以零件形状或公司身份作为主标题，工艺能力放在辅助说明；不增加来源不支持的型号、参数、客户或性能承诺。

**位置：** impeller 详情、About；[presentation.ts:5](D:/lzz/lzz/_react/src/data/presentation.ts:5)、[about.astro:29](D:/lzz/lzz/_react/src/pages/about.astro:29)。

**建议命令：** `/finesse redesign src/data/presentation.ts src/pages/about.astro`

## 三轮扫描的边界

**静态 cheapness 扫描：** detector 的原始 `p0=4` 为四个 finding 分组。`dead-local-ref` 的 3 次命中实际是 `new URL(Astro.url.pathname, siteOrigin)`、`new URL(reference.path, siteOrigin)` 等 JS 表达式，被正则误读为本地文件引用；没有据此确认缺失文件。`no-reduced-motion` 的 2 次命中来自导航失焦关闭及锚点聚焦使用的单次 `requestAnimationFrame`，不是连续动画循环；全局样式已有 reduced-motion 分支。`side-stripe` 命中是移动导航分组线，不是大批装饰卡片。正文状态中的长横线、白背景和缺少 finesse stamp 也不构成本项目的 AI 建站证据。

`bare-1fr-track` 有 37 次命中，literal color 有 194 次，pure white/black 有 104 次。前者需要结合 min-width 与实际尺寸判断，本轮没有观察到对应的全页溢出；后两者包含历史覆盖和明确的白底工业设计。它们不能直接换算为可见错误数量。未来修改时可以整理 token 和覆盖关系，但这不是本轮优先审美问题。

**动效与展示承诺：** 本项目采用克制的工业展示，没有高强度动画或 WebGL 承诺。真实图片与静态 hero 已显示；现有按钮和导航反馈主要使用 transform、opacity、颜色变化，未发现需要新增大型动画引擎的理由。reduced-motion 只做源码检查，未在设备设置中切换验证；没有作帧率承诺。

**移动与可访问性：** 主布局和标题尺寸已按五个视口检查，P0 中的触控与按钮门槛未通过。移动菜单按钮为 44×44px，分类过滤按钮高 46px，`View all 35 parts` 高 44px。键盘首个 Tab 实测进入可见的 Skip to content，带 2px 红色焦点轮廓；完整键盘和辅助技术流程没有在本轮重新认证。Quality 实际文字色采样：charcoal/white 14.08:1、正文 grey/white 8.59:1、white/red 5.77:1，均满足正文 4.5:1 的对比要求；这不是全站图片背景逐像素的 WCAG 认证。

页面高度、标题位置会随视口、字体加载和展开状态变化；表中为本轮记录的默认状态近似值。lazy 图片尚未进入视口时的 naturalWidth=0 不等于缺失图片，未用它制造错误。

## 建议顺序

先补齐移动触控和单行按钮门槛。视觉投入优先做 `/finesse redesign src/pages/insights/index.astro src/pages/insights/[slug].astro`：让资料入口便于选择、正文尽早给答案，能同时改善模板感、图文比例与阅读效率。随后集中 About/Quality 的采购证据，再做目录、图片与标题的精修。

建议保留当前 Inter、主色系、已确认的首页结构与真实素材。无需通过增加粒子动效、纹理或更换字体来解决这些问题。
