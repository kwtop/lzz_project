# LZZ 设计规范

版本：2026-10-14 · v2.9，采用 Inter Variable + Georgia，Contact 主标题使用 Times New Roman；保留已完成的内容布局、图像更新和卡片居中。适用项目：LZZ 英文定制 CNC 网站。阅读顺序：先看规则与状态，再查组件变体和视觉参照。

v2.7图片补充规则：能力目录采用紧凑图文行，桌面图片列280px、图窗210px高；手机图片列112px、图窗140px高，统一contain，完整保留照片。工厂页设备、走道与检测实拍保持自然比例，桌面最大高380px、手机300px；封面不受此限制。黄铜堵头和车削接头使用有来源的AI辅助展示构图，产品详情注明并提供原图入口；不用于批次数量、尺寸公差或客户交付证明。新增展示文件为`public/media/gallery/brass-gallery-v2-*`、`fittings-gallery-v2-*`，原始媒体不覆盖。提示词和追溯记录见[本轮图片报告](docs/image-quality-20261013.md)。

## 1. 适用范围、状态与优先顺序

本文是后续设计与实现的规范，不是全站已经符合规范的验收声明。v2.2重建阶段只修改文档与参照；v2.3补充已经实施的CAP-PRACTICE能力页预览变体；v2.4补充已经实施的Resources图文阅读布局；v2.5减少重复说明并扩大主要章节留白，规则见7.6；v2.6修正间距覆盖和嵌套留白，精简目录重复入口，见7.7。其余待实现／待验证事项仍按第9.2节处理，业务接口、原始媒体与部署未因本次布局修改而改变。

| 标记 | 含义 |
| --- | --- |
| **规范** | 本次确定的目标值与行为；用于新建或后续获授权的标准化修改 |
| **源码记录** | 本次读取的现有规则；存在层叠覆盖时，不能代替浏览器的实际计算结果 |
| **历史参照** | 2026-10-12 已选原稿、截图或对照；按当时状态解读 |
| **本轮实测** | 2026-10-13读取的DOM、计算样式、交互与截图；R6仅为首屏两视口参照，CAP-PRACTICE验证范围见7.4，不外推到全站 |
| **待实现／待验证** | 与规范的差异，或本轮未做浏览器验证的事项 |

执行优先级：用户后续明确选择 → 内容准确性与必要功能 → 本文具名组件变体（仅覆盖所列视觉属性） → 通用规范。历史记录和旧稿未注明的样式不参与覆盖；新增变体必须写明名称、选择依据、适用选择器、覆盖属性和验收参照。

网站面向采购与工程人员，帮助识别零件、理解工艺与采购条件，再准备询盘。保留英文产品信息、35项产品目录及筛选、必要参数与单位、移动菜单、产品上下文和草稿功能。能力页已删除的主图图注、模板旁注和底部相关资源不自动加回；资料页不新增页内目录或折叠正文。

事实依据为 [声明台账](docs/claim-ledger-2026-09-25.md) 与当前内容资料。设计稿中的文字、设备外形、数字和认证不能代替事实来源。网站准备邮件草稿；打开 `mailto`、复制或下载草稿都不能表述为已发送。

视觉方向：白色主体、近黑文字、开放图文、来源明确的照片与产品图；沿用实际蓝色 LZZ 标识，询盘主操作使用红色。保留首页黑色加工首屏、工厂图文、交错研究和含订单条件的末尾询盘。优先处理内容、阅读、图文比例和留白，再处理装饰。

## 2. 语义颜色与交互状态

以下为**规范**。同一职责使用同一语义色；分隔线表达分组，控件边界帮助识别可操作区域，两者不互换。

| 职责 | 色值 | 使用边界 |
| --- | --- | --- |
| 页面背景 | `#FFFFFF` | 普通页面和产品完整显示背景 |
| 正文／标题 | `#191B1D` | 浅底正文、标题、阅读链接 |
| 次要文字 | `#606266` | 浅底说明、字段帮助、图注 |
| 浅表面 | `#F6F6F5` | 草稿预览、工具 hover、disabled 背景 |
| 装饰分隔线 | `#DEDEDB` | 内容分组；不作为输入框唯一边界 |
| 控件边界 | `#8A8A8A` | 输入框、中性工具按钮、局部图集描边出口 |
| 主操作 | `#CF141A` | 准备询盘、打开邮件应用等当前主任务 |
| 主操作 hover／active | `#A91921` ／ `#8C151C` | 红底白字；active 不依赖位移表达 |
| 错误 | `#A40013` | 白底表单错误文字及边界；同时提供文字解释 |
| 深色面板 | `#171717` | 末尾询盘；首页首屏背景 `#141719` 为具名变体 |
| 深底正文／次要文字 | `#FFFFFF` ／ `#C5C7C9` | 深色内容区 |
| 品牌蓝 | 原标识资产 | 使用 `public/media/lzz-logo.png`；不推定为链接或焦点颜色 |

| 操作与状态 | 浅底规则 | 深底规则 |
| --- | --- | --- |
| 主操作 default／hover／active | 依次使用主操作三种红色，白字 | 相同；焦点与面板背景分开识别 |
| 中性工具 default／hover／active | 白底、正文色、控件边界；hover 浅表面，active 分隔线色背景 | 透明底、白字、控件边界；hover／active 可用白色8%／14%叠层，文字保持白色 |
| 阅读链接 default／hover／active | 正文色与可见下划线；hover／active 为主操作色，不加整块背景 | 白字与下划线；hover／active 加粗下划线，不加整块背景 |
| focus-visible | 2px 主操作色轮廓；链接／按钮偏移5px，表单控件偏移3px | 2px 白色轮廓，偏移规则相同 |
| disabled | 浅表面、次要文字、控件边界；原生按钮禁用，保留可读标签，不仅降低整组 opacity | 同一中性禁用表面；不把禁用态描述为等待 |
| loading／准备中 | 保持操作宽高，保留说明文字；实际异步工具处理中禁用重复操作并表达 busy | 同一规则；不是邮件发送状态 |
| 错误与结果 | 错误有文字、关联字段和可修正路径；草稿就绪与复制结果使用正文色 | 深底错误说明使用白字及明确错误文字，不直接使用低对比深红正文 |

连续正文、必要参数和控件标签采用明确可读的颜色。项目色对验收目标：普通文字与背景至少4.5:1，必要控件边界／焦点与邻接背景至少3:1；装饰分隔线不承担控件识别。色对数值检查与实际页面检查分别记录，不据色表宣称页面已经通过无障碍验收。

## 3. 字体与层级

**规范（2026-10-14 用户指定字体组合）**：正文、导航、按钮、表单、参数表及模块标题使用 `'Inter Variable', Arial, sans-serif`；页面主标题与首页首屏使用 `Georgia, 'Times New Roman', serif`；Contact 主标题使用 `'Times New Roman', Georgia, serif`。Inter 正常体与斜体由本地包随网站加载，`font-display:swap`；Georgia 与 Times New Roman 使用系统字体，不下载字体文件。Arial 只作 Inter 的备用字体。此表覆盖第7节历史变体中的字体家族与主标题指标，保留那些变体的布局和图片规则。

字号按默认根字号16px列示，实现使用 rem 与 clamp，不禁止浏览器放大。桌面字号在较窄视口平滑缩小；`≤760px` 使用手机档位。Georgia/Times 的笔画对比负责主标题辨识度，Inter 的字重与间距负责内容扫描。

| 层级 | 桌面 px | 手机 px | 行高 | 字重 | 字间距 |
| --- | --- | --- | --- | --- | --- |
| 首页首屏 H1 · Georgia | 52–80 | 38–44 | 1.08 | 400 | -0.02em |
| 常规页 H1 · Georgia | 40–52 | 36 | 1.14／手机1.16 | 400 | -0.018em |
| 编辑型内容／指南 H1 · Georgia | 42–56 | 38 | 1.14／手机1.16 | 400 | -0.018em |
| Contact H1 · Times New Roman | 48–64 | 42 | 1.08 | 400 | -0.02em |
| 主章节 H2 · Inter | 32；具名内容变体28–38 | 28；紧凑指南25 | 1.15–1.22 | 550–600 | -0.025至-0.035em |
| 内容 H3 · Inter | 24；紧凑内容21 | 21–22 | 1.3–1.35 | 550–600 | -0.018至-0.02em |
| 产品卡片标题 · Inter | 20 | 18 | 1.4 | 550 | 0 |
| 引言 | 18 | 16 | 1.65 | 400 | 0 |
| 正文 | 16–17 | 16 | 1.65 | 400 | 0 |
| 标签／必要图注／帮助文字 | 14 | 14 | 1.5 | 400；字段标题可700 | 0 |
| 主按钮／工具按钮 · Inter | 16 | 16 | 1.4–1.5 | 600 | 0 |
| 独立阅读入口 · Inter | 16 | 16 | 1.5 | 600 | 0 |
| 句内链接 | 继承正文 | 继承正文 | 继承正文 | 继承正文 | 0 |

Inter Variable 提供100–900连续字重，正文400、导航500、模块550–600、按钮600均可使用。Georgia 与 Times New Roman 的系统常规体用于主标题，明确请求400，避免沿用550／600而匹配成粗体。字体角色及尺寸变量位于 `typography-system.css`；普通页标题入口位于 `content-alignment.css`；编辑型与指南标题分别由 `content-editorial.css` 和 `guide-density.css` 引用同一角色变量。Contact 在页面根节点指定标题字体与尺寸，H2及表单不继承衬线字体。

普通正文默认最大68ch；参数表和图片可使用所属版心宽度。标题、参数、长产品名自然换行，保留单位和条件；不以固定高度、省略号或缩小正文解决内容不足。原生 select 的长选项可以受控裁切，但对应产品引用标题必须完整可见。

## 4. 留白、版心与布局起点

### 4.1 留白的含义与归属

下表是**规范**，数值指相邻可见内容边缘之间的距离，不是自动同时添加到两端的 padding。手机之外使用桌面值；具名组件的局部节奏见第7节。

| 内容关系 | 桌面 px | 手机 px | 负责容器 |
| --- | --- | --- | --- |
| 常规主要章节之间 | 64 | 40 | 共同父级内容流的 gap；普通子章节不再加同一段上下间距 |
| 标题到引言 | 24 | 24 | 标题组 |
| 连续段落之间 | 16 | 16 | 正文流 |
| 图片到下方标题 | 24 | 24 | 图文项 |
| 说明到操作组 | 24 | 24 | 当前内容块 |
| 表单紧密提示到相关操作 | 16 | 16 | 表单局部组 |
| 同组操作横向／换行纵向 | 24／16 | 20／12 | 操作组 gap；子操作外边距为0 |

同一空白只指定一个责任容器。页面入口留白、深色面板内边距和图集分组节奏属于具名局部规则，不能在此之上再叠加通用章节 gap。没有具名例外时采用表中默认值，不从旧区间内任意挑选。

### 4.2 响应式与版心计算

| CSS 视口宽 V | 最小左右外侧留白 g | 常规最大版心 Wmax | 指南最大版心 |
| --- | --- | --- | --- |
| `V ≤760px` | 22px | 1280px | 1120px |
| `760px < V ≤1100px` | 32px | 1280px | 1120px |
| `V >1100px` | 48px | 1280px | 1120px |

外侧留白断点由CSS视口宽V决定；实际排版可用宽C扣除占位滚动条，通常为根元素的clientWidth。普通内容容器 `W = min(Wmax, C - 2g)`，居中且不再重复添加页面级横向 padding。实现可用 `width:min(1280px,calc(100% - 2 * var(--gutter)))`，其中100%指页面可用宽。1280／1120指扣除外侧留白后的容器宽度。局部询盘面板的外框跟随该容器，内部 padding 从面板可用空间扣除：1280px面板左右各48px时，内部可用1184px。

例如在C=V、没有占位滚动条时：1440px常规容器1280px，两侧80px；834px为770px，两侧32px；390px为346px，两侧22px。有滚动条时按实际C计算，不用截图像素反推断点。嵌套区域使用 `width:100%`，不重新执行一次页面版心公式。

### 4.3 可复用布局起点

以下是**规范**的起点；已选页面按第7节保留具体结构，不能由通用双栏覆盖。

| 结构 | 桌面／中间宽度 | 手机 | 内容与对齐 |
| --- | --- | --- | --- |
| 常规图文双栏 | 1:1；列距48px，≤1100px为32px | 单列，图文间24px | 默认顶部对齐，子项 min-width:0；原图自然比例 |
| 普通产品目录 | >1100px三列，761–1100px两列；列距28px、行距40px | 单列，行距24px | 图片与标题可点击；筛选后不拉伸少量结果充满整行 |
| 产品详情 | 图／制造信息44:56；列距48px，≤1100px为32px | 先图后制造信息，间距24px | 保留参数、条件、图纸要求和上下文询盘 |
| 一般阅读正文 | 单列、最大68ch | 单列、按可用宽度 | 长参数自然换行 |
| 参数键值区 | 标签／值30:70；列距24px，行距16px | 标签在值上方，组内8px、组间16px | 单位、条件与内容全部保留 |
| 宽技术表格 | 使用版心宽度，列标题与数据对应 | 表格自身可横向滚动，页面不横向滚动 | 保留语义表头、全部列和可识别滚动区域 |

普通双栏任一列扣除局部内边距后不足320px时，提前变单列；这是内容容纳条件，不改变页面外侧留白断点。具名组件有自己的已选列比例；当长标题或参数仍无法完整显示时，必须先解决换行或改为单列，再记录局部规则。导航现有切换断点为960px，不能随内容的760px断点一起改写。

## 5. 操作层级与询盘状态

### 5.1 按钮、工具、浏览与句内链接

以下为**规范**。新增入口先确认任务、现有同目标入口和必要性；不因版面有空白就加 CTA。

| 用途 | 呈现与尺寸 | 限制 |
| --- | --- | --- |
| 准备询盘／打开邮件应用 | 红底白字，最小高度50px；横向24px、纵向12px padding，1px边框、0圆角，内容宽度 | 同一操作组一个主操作；多行标签增加高度，不固定240px宽 |
| 复制／下载草稿／重置筛选等工具 | 原生 button 的中性呈现，最小高度44px；默认横向16px、纵向9px padding | 与链接区分；询盘现有文字工具按钮为 QUOTE-3 变体 |
| 浏览产品／工厂／研究／资料 | 文字链接，正文色、1px下划线、偏移5px，最小高度44px | 无填充、无四边框、按内容宽度；深底白字 |
| 列表已有标题／图片入口 | 标题、图片或整行链接 | 可点击标题不强制常驻下划线，hover 下划线、键盘轮廓；不再添加同目标 Read more／View study |
| 句内引用／Email／电话 | 保持所在行的文字样式与下划线 | 不套44px高度或上下按钮 padding；独立联系方式整行入口仍≥44px |
| 图集辅助出口 | 中性描边链接，局部规则见 CATALOGUE-1 | 仅限 `#additional-part-forms > nav`，不扩展到其他阅读入口 |

主导航询盘、关键产品上下文询盘、末尾询盘可以共存；不在每一段复制。手机主任务可占满宽度，独立阅读入口按内容宽度左对齐。图中旧红色浏览按钮、蓝色文字链接或描边辅助链接，如未被具名变体保留，以本节与颜色表为准。

### 5.2 QUOTE-3 字段与状态规范

保留顺序：Name → Email → WhatsApp / Phone → Product / service（optional）→ Message。Name、Message必填；Email与Phone至少一项且不要求两者同时填写。填写的非空值继续按现有验证器校验。产品引用来自受支持的产品上下文，可更换、清空；直接入口不显示假定产品。

| 元素 | 尺寸与规则 |
| --- | --- |
| 字段标签 | 上置16px／1.25、700；标签与控件4px，字段之间20px／手机22px |
| input／select | 白底、16px／1.5、400，1px控件边界，0圆角，padding 9px 14px；桌面最小44px，手机最小48px |
| Message | 桌面最小120px、手机144px，可纵向调整；不用宽度固定布局 |
| 帮助／错误文字 | 14px／1.5；紧跟相关字段，不覆盖下方控件 |
| Name／Message标记 | 在对应标签显示必填标记；联系方式由一条联合提示说明 |
| Phone占位内容 | `Include country code`；不使用 LZZ 接收询盘的电话号码作为客户占位值 |
| 现有主按钮变体 | 52px最小高度、横向32px padding、17px／1.35；保留选定询盘组件，不因通用50px默认值缩小它 |

| 状态 | 反馈与可恢复路径 |
| --- | --- |
| 初始化／恢复输入中 | 表单可见，当前不可操作的按钮禁用，提示 `Preparing the form…`；不表示发送中 |
| 联系方式均为空 | 联合错误放在Phone输入之后；Email、Phone均关联同一错误文字并表达 invalid；首个相关错误可获得焦点 |
| 单字段错误 | 字段下方解释问题；通过 `aria-describedby` 关联，错误不只用红色表示 |
| 草稿准备完成 | `Your inquiry draft is ready`；说明审核草稿、在邮件应用添加图纸并发送；保留预览和编辑路径 |
| 复制中／成功 | 保持按钮尺寸；显示 `Copying…` ／ `Copied`，忙碌时阻止重复复制；不清空输入 |
| 复制失败 | 保留完整草稿，说明可选择文本或 `Save draft` 保存文本文件 |
| 打开邮件应用 | 提供 `Open email app`；浏览器没有可靠的客户端发送回执，不显示发送成功 |
| 会话存储不可用 | 明确提示保留页面或保存副本；准备、复制、下载草稿继续可用 |
| 无 JavaScript | 保留可理解的邮件联系方式与需要提供的信息；说明准备／复制／下载草稿需要JavaScript，仍可自行在邮件应用整理并发送 |

这些是设计与现有功能边界，不能扩展为服务端收件、附件上传、自动发送、CRM接入或真实发送验收。

## 6. 图片任务、适配与来源

### 6.1 图位矩阵

以下为**规范**。先确定图位用途、原图宽高和焦点，再决定容器；不按源目录前缀推定图片用途。

| 图位 | 比例／尺寸与 fit | 裁切许可与焦点 | 手机 |
| --- | --- | --- | --- |
| 产品识别／结构 | 白底、按原图比例安排栏宽；需要限窗时 contain | 完整轮廓、孔位、叶片和装配关系保留；默认居中 | 完整显示，主体大小与同类产品可比较 |
| 工厂／设备／加工／新闻纪实 | width:100%、height:auto、自然比例 | 默认不裁与叙述相关的细节；需要局部特写必须另列图位 | 恢复单列与自然比例 |
| 首页工厂组合 | 车间4:3、检测5:6，contain；列宽1.6:1 | 两图完整显示；通过列宽达到等高 | 两图各自自然比例，单列 |
| 专门局部特写 | 沿用明确局部容器，cover | 可以裁切，但有完整图／说明上下文；写明所示特征和焦点 | 核对所示特征仍可见 |
| HOME-HERO 氛围背景 | 充满首屏、cover，资产与焦点见7.1 | 允许裁切；当前是AI生成工程氛围图，不计为工厂或交付证据 | `94% center`，不沿用旧的65%焦点 |
| CATALOGUE-1完整零件／CAD／单图 | 指定图集窗口、contain | 不裁主体；允许窗口内的必要留边，原图仅保留于素材档案 | 单列，仍完整显示 |
| CATALOGUE-1批次／局部图 | 指定图集窗口、cover | 仅在不隐去要解释的特征时裁切；默认中心，已记录焦点见下表 | 使用手机窗口；逐张核对焦点 |
| 证书／图纸／报告／参数文件 | 原比例、可读，可放大／打开原文件 | 不裁编号、文字或数值，不用生成修复信息 | 保留完整来源与阅读路径 |
| 通用工程示意／装饰 | 由具体用途决定比例 | 仅帮助理解时使用；不能作为订单、检验或厂房事实 | 保留说明与必要上下文 |

一般图文不同时固定宽高再接受大片 contain 留边；先调整容器比例或列宽。CATALOGUE-1是明确例外：固定图窗用于扫描同一组零件，完整信息优先，必要留边不以错误裁切来消除。完整零件不因属于“批次”就改用cover。

2026-10-14 产品卡片对齐补充（PART-CARD-CENTER）：`.product-card`、`.ed-product`、`.cap-products > a`、`.er-related > a` 的产品标题与图片中心轴对齐，标题块左右自动留白，允许自然换行；图文间距桌面20px、手机16px。产品图集 `.reference-gallery.reference-catalogue figcaption` 同样居中。手机关联产品保持单列、图片在上标题在下，图窗3:2、contain、12px内边距，响应式图片按实际整栏宽度加载。图集技术字段和新闻／能力目录等带说明的图文行沿用原有阅读布局。实现位于 `src/styles/image-white-frames.css`。

| 指定图集图窗 | >1100px | 761–1100px | ≤760px |
| --- | --- | --- | --- |
| 普通三列图集 | 256px高、28px列距 | 240px高、28px列距 | 单列、250px高、22px行距 |
| 两列图集 | 228px高、28px列距 | 230px高、28px列距 | 单列、230px高、22px行距 |
| 单图 | 360px高，图片组最大920px宽 | 360px高 | 290px高 |

上述尺寸是当前 `reference-catalogue.css` 的**源码记录**，保留为图集变体；不适用于普通工厂照片。单图窗口不被普通图集的240px中间宽度规则覆盖。当前焦点记录：`covered-wheels` 为 `50% 56%`，`covered-rollers` 为 `50% 75%`，`gear-cylindrical-examples` 为 `50% 20%`，其余默认居中。旧规则层叠是否得到这些最终尺寸仍需受影响页实测。

### 6.2 来源与处理

保留原图及来源记录；ImageGen的提示限制不能证明结构完全一致。AI处理后并排复核原图与结果，改变设备或零件结构时退回原图或改作示意，不能成为真实制造／交付证据。证书与技术文字不用生成方式补写。

媒体查看入口直接附着在图片或播放器上，不再额外显示“Open original video”“View original photograph”“View full image”等独立文字入口。根据2026-10-14最新要求，图片保持静态展示，不跳转原图、不打开图片弹层、不增加图片焦点停靠；视频保留原生播放控件及浏览器不支持视频时的后备链接。图注中的内容说明与来源信息保留。

首页工厂使用已授权原照片的AI处理版，仅用于该首页模块；媒体在 `public/media/factory-refined/`，处理来源与记录在 `D:/lzz/factory-refined-20261012/`。设备、质量、案例等证据页不由此替换。前台说明遵循已确认的内容规则，内部来源不能改写为虚假的现场或验收事实。

## 7. 已选组件变体

本表保留已选视觉结构，并记录原有局部参数。只覆盖所列属性；颜色、事实、功能与操作角色仍按前文执行。尺寸来自源码读取，未注明的实际渲染结果均**待验证**。

| 变体与范围 | 已选局部规则 | 局部空白归属与边界 |
| --- | --- | --- |
| HOME-HERO：`.precision-hero`／`.precision-message` | 黑色加工首屏；H1 `clamp(2.6rem,1.6rem + 4.1vw,5.25rem)`，手机 `clamp(2.25rem,9.5vw,2.875rem)`，行高1.04；背景图cover；完整执行参数见7.1 | 首屏内部留白由hero负责，正文章节 gap 不加到首屏内部 |
| FACTORY-1：`.factory-editorial`／`.factory-story-pair` | 1.6:1；列距32px，≤1000px为24px；≤760px单列、40px项距；章节标题 `clamp(36px,4.4vw,64px)`／1.05；项标题 `clamp(24px,2.7vw,38px)`／1.18 | 图到标题桌面28px、手机24px；标题到内容24px，由图文项负责；阅读入口按第5节 |
| STUDIES-3：`.studies-editorial`／`.studies-editorial-row` | 1:1交错行；列距64px，≤1000px为36px，≤760px单列26px；章节标题同FACTORY-1；项标题 `clamp(28px,2.65vw,40px)`／1.14，正文18／16px、行高1.5 | 相邻行 margin-top40px + padding-top40px，中间有分隔线，是具名80px净间距；不再加通用gap |
| HOME-INQUIRY：`.home-rfq-panel` | >1100px两列1:1，≤1100px单列；gap48／32／28px；面板20px圆角，手机16px；H2 32／28px，行高1.08；订单值22／20px | 面板padding：桌面56px 48px 48px，中间48px 40px，手机40px 24px；外部下距80／48px由band负责 |
| QUOTE-3：`.quote-split`／`.inquiry-layout` | >1100px上下文／表单35:65，中间38:62，≤760px单列；两栏之间各32px内侧留白，中间各24px；表单H2 34／28px、行高1.15 | layout桌面上下40px，手机28px 0 40px；字段与状态遵循5.2；文字工具按钮保留≥44px触控高度 |
| GUIDE-COMPACT：`.rs-page.reading-page:not(.company-news-article)` | 最大1120px；H1 `clamp(38px,3.8vw,44px)`／手机32px，H2 28／25px，H3 22px；正文17／16px、1.65；68ch范围见7.2 | 普通章节上40px／下32px，手机上32px／下24px；主结构组上48px／下40px，手机上36px／下28px；是padding-block，不是左右内边距；归属见7.2 |
| GUIDE-OPENING：GUIDE-COMPACT内 `.guide-opening-grid` | 正文 + 336px图列、48px列距；≤980px图列280px、列距32px；≤760px单列24px | 顶部padding36／28px由opening负责；内部header下距22px，不再用另一版心 |
| CATALOGUE-1：`#additional-part-forms` 及 `.reference-gallery.reference-catalogue` | 覆层零件三图、齿轮两图；标题→原图→短图名→详细图注→技术说明／字段；窗口按第6节，字段见7.3 | 目标模块上26px／下28px，手机上26px／下36px；不增加页面级左右padding；标题组下距18／22px；组末20／22px；后续组顶部18px，由group负责 |
| CATALOGUE-1-TYPE：同上 | 模块标题42／32px、1.15；引言19／16px、1.45；分组24／23px、1.25；图名18／17px、1.4；图注14px、1.55；字段标签17／16px，值16px、1.5 | 标签与图名700；齿轮要求16px／1.45、现有请求600按bold映射；表单与普通H2不继承本变体 |
| CATALOGUE-1-EXITS：仅 `#additional-part-forms > nav` | POM gear study、Surface-coated parts为中性完整描边链接；Discuss your drawing为红色主任务；最小46px、padding12px 20px、0圆角 | >760px横向／换行间隔14px，内容宽；≤760px单列、间隔12px、整行宽；nav上距18px；这是通用操作组的局部例外 |
| CAP-PRACTICE：`.cap-page #machining-studies`内 `.cap-study-panel`、`.cap-evidence-item`、`.workshop-video--compact` | 案例、现场图与竖视频使用完整比例的小预览；图列宽由源比例计算，桌面最大宽／高预算320px，手机缩至75%；详细规则见7.4 | 案例组上距40／32px，不再使用嵌套cap-section留白；原图、案例文字、链接和视频控件保留 |

首页工厂图位的等高范例：版心1280px、列距32px，剩余1248px按1.6:1分配为768／480px。4:3与5:6的照片分别得到576px高，完整显示而不拉伸、裁切或人为加高图框。手机恢复自然比例和单列。

工厂数字使用当前内容，不从原稿补写指标；手机事实标签源码当前12px，目标采用第3节的14px，已列入待实现差异。产品目录既有筛选结果的 `data-count` 特例继续保留，不能为了新的布局起点改动筛选或放大一条结果。

### 7.1 HOME-HERO 的执行参数

保留 `HomeEditorial.astro` 中现有背景与两行文案结构，不添加主标题说明段。源背景为 `public/media/machining-hero-v2.webp`（1672×941）；页面通过 `responsiveImage` 输出 `public/media/responsive/machining-hero-v2-*`。归档副本和两份本轮实测截图见R6。该背景的DOM标记是 `AI-generated`，用途限于工程氛围。

| 属性与责任 | >760px | ≤760px |
| --- | --- | --- |
| `.precision-hero` 外框 | `position:relative;isolation:isolate;overflow:hidden`，自身建立层叠上下文；`min-height:100dvh`，旧环境回退100vh；height:auto、无max-height；flex居中 | 相同；长标题使内容需要更多空间时允许增高 |
| `.precision-message` 文字区 | 跟随普通版心，左对齐；padding-block上124px、下144px，左右不重复加padding | 上86px、下136px；左对齐，版心按22px外侧留白 |
| H1 | 最大18ch、margin:0；沿用表中的clamp、1.04行高和-0.035em字间距 | 同一18ch上限；保留已有br，剩余内容自然换行，不强制维持两行 |
| 背景图 | absolute inset:0、width/height:100%、cover、`50% 50%`、z-index:-2 | cover、`94% center`；覆盖旧65%规则 |
| `::after` 遮罩 | `content:"";position:absolute;inset:0;z-index:-1`；背景为 `linear-gradient(90deg,#0B0D10B3,#0B0D1010 76%),linear-gradient(0deg,#0B0D1080,transparent 35%)` | 生成、定位与层级规则相同；背景为 `linear-gradient(90deg,#0B0D10C7,#0B0D102B),linear-gradient(0deg,#0B0D1090,transparent 35%)` |
| 操作组 | H1之后24px；按通用16／24px纵横gap | H1之后24px；最大360px，按通用12／20pxgap、左对齐；空间不足时换行 |
| `.hero-baseline` | 跟随版心，absolute下距24px，上padding18px | 下距22px，上padding18px；文字可换行，不能覆盖操作 |
| 叠放页头 | 沿用现有页头，不占首屏文档流 | 相同；导航切换仍为960px，与首屏字体断点分开 |

这些参数沿用源码，并在1440×900、390×844两个CSS视口核对主要尺寸与焦点。实测页头高88／76px，首屏高900／844px，H1计算字号84／37.05px；550是计算样式请求值，实际字重匹配按第3节。其他高度、长文本、导航断点及交互未在本轮验收。首屏字号由变体负责，操作颜色、尺寸与用途仍按第2／5节，不能从截图中的旧按钮尺寸倒推通用规范。

### 7.2 GUIDE-COMPACT 的容器选择

本节选择器都以 `G = .rs-page.reading-page:not(.company-news-article)` 为前缀。先按现有内容结构识别容器，不按所需留白大小任选类名。

| 容器或内容 | 选择依据与范围 | 纵向留白责任 |
| --- | --- | --- |
| 普通阅读章节 | `G .prose .reading-section`，由正文分章产生的普通段落章节 | 该section独占上40／下32px；手机上32／下24px |
| 主结构组 | `G :is(.rq-section,.rq-hero,.rq-band,.ag-chapter,.ww-before,.ww-define,.ww-approval,.ww-handover,.ww-issue,.sh-checklist,.sh-archive,.sh-section,.fq-section)`；采购清单、专题步骤、核对或归档等既有页面结构 | 该结构组独占上48／下40px；手机上36／下28px |
| 既有相关内容组 | `G :is(.rq-related,.ag-related,.article-part-examples)` | 沿用上32／下24px，不套主结构组或通用章节gap |
| 68ch阅读段 | 仅 `G .prose :is(p,ul,ol)` | 最大68ch；不限制图、表、字段或其他页族；一般正文仍68ch |
| 旧文章内容容器 | `G .finesse-article-content` | 最大960px、左对齐；外层1120px指南版心独占页面外侧留白 |

**规范**：同一章节不要同时套普通阅读章节和主结构组两种角色。主结构组包含普通段落时，用 `.prose` 承载文字即可；若现有DOM中确实嵌套 `.reading-section`，外层结构组拥有章节前后留白，内层section的padding-block归零，仅保留标题、段落间距。章节边界不再叠加64／40px通用gap。上述padding-block都是上／下值，横向宽度由父版心和所属列负责。RFQ清单的 `.rq-band.reading-section > .rq-section` 已在v2.6实测内层padding-block为0，外层独占留白；其他新增嵌套仍需按这一规则核对。

### 7.3 CATALOGUE-1 的字段与技术要求

本变体中的 `dl.reference-fields` 覆盖第4.3节的一般标签／值30:70布局：每个字段都是dt在上、dd在下，不能把整组套成30:70。作用范围为 `.reference-gallery.reference-catalogue > .reference-fields` 及同级 `.reference-requirements`；非图集车间布局的 `.collection-fields` 不自动继承。

| 字段组 | >1100px | 761–1100px | ≤760px |
| --- | --- | --- | --- |
| 常规1–3项字段，包括覆层三字段 | 三列槽位；少于三项保留余槽；列gap28px、行gap0 | 相同 | 一列、gap0；各项上下padding12px |
| 四字段车间例外 | 两列两行；列gap28px、行gap22px | 相同 | 一列、gap0；保留四项及顺序 |
| 齿轮三项技术要求 | 三列、gap28px | 相同 | 一列、gap0；各项上下padding12px |

桌面／中间宽度组上距14px，手机18px，均由字段组自己负责。dt与dd间4px；dt字重700、行高1.4、字号17／手机16px，dd为16px／1.5。桌面横向相邻列以1px分隔线及28px内侧留白区分；两列四字段的每行第一项无左线。手机移除左线，各项上方用1px分隔线。技术要求文字使用CATALOGUE-1-TYPE。无字段不输出空组；新增超过四字段时另行登记布局。车间视频位于照片、图注及技术字段之后，不插入dt与dd之间。

### 7.4 CAP-PRACTICE 紧凑预览

用于能力页下方的案例入口、车间照片与PEEK视频，解决自然比例竖图被900px宽单案例布局放大后拖长页面的问题。预览继续使用原有真实媒体；案例详情、证据页和其他WorkshopVideo默认布局不继承本变体。

图列宽 `round(min(320,320 × sourceWidth / sourceHeight))`；图片始终width:100%、height:auto、contain。320px是预览尺寸预算，不是把图片强行塞进320×320窗口，也不截去零件结构。手机图列宽为桌面预算的75%，并受可用宽度限制；因此竖图约240px高，横图可能更低。点击后继续进入完整案例或查看原图。

| 局部结构 | 桌面／中间宽度 | ≤760px |
| --- | --- | --- |
| `.cap-studies` | >1280px主案例／补充列表1.6:1；≤1280px单列，补充列表两列；无补充案例始终单列 | 单列，补充列表也单列 |
| `.cap-study-lead` | 自适应图列 + 正文1fr，gap32px，垂直居中；正文最大62ch；案例标题24px／1.3，标题下距16px | 图片与文字单列，gap24px；标题22px |
| `.cap-evidence`／`.cap-evidence-item` | >1280px两项并列，≤1280px单列；项内部图文两列、gap24px | 各项及项内图文单列，保留图名与解释 |
| `.workshop-video--compact` | 原比例视频在左、说明在右，gap32px；上距40px、padding上24px／下0 | 说明在上、视频在下，gap24px；上距32px；原生控件和原视频链接保留 |
| `.cap-study-panel` | 上距40px，由该panel负责；去除嵌套cap-section的整章padding | 上距32px；不重复加通用章节留白 |

实施归属：`src/pages/capabilities/[slug].astro`、`src/styles/capability-editorial.css`；`WorkshopVideo.astro`的compact参数默认false，仅由该能力页启用。图片与视频来源、标题、说明和链接目标保持原内容。

实测记录为 `D:/lzz/_qa/capability-practice-20261013/`：10个同类能力页在1440px与390px检查；另对塑料及铣削页检查360、834、1600px及760／1100／1280px两侧。阶段记录不代替其他页面或完整询盘链路验收。塑料页#machining-studies在1440×900视口由约3339px缩至1441px，全部说明文字与链接目标保留。

唯一实施参照：[桌面模块](../../_qa/capability-practice-20261013/after/plastic-practice-desktop.png)（1288×876px）与[手机模块](../../_qa/capability-practice-20261013/after/plastic-practice-mobile.png)（354×1106px）。源截图CSS视口为1600×1000／390×844；导出与裁取尺寸分别记录于同目录screenshot-crops.json。区域图是本次实际实现，不能把它的外框尺寸当成固定图位高度；文件位于QA目录，不属于R1–R6的历史归档清单。

### 7.5 RESOURCES-READING 图文阅读布局

适用范围为 Resources 总览、三个分类页、七篇指南及 FAQ，共12页。入口页按任务组织，指南按章节连续阅读，FAQ保持无图。文章中的相关零件出口放在正文后，随后为资料导航和询盘。P08/P10 不再把相关产品与下一步入口放入手机正文前的图片侧栏。

图片的具体角色与尺寸如下；除说明图外，照片保留完整比例，放大入口仍指向既有原图。以下规则在 `guide-density.css` 的 `.rs-page` 范围内执行，工艺照片三列规则同时由 `resources-family.css`、`image-audit-rollout.css` 明确。

| 角色／选择器 | 桌面 | ≤760px | 阅读位置 |
|---|---|---|---|
| RFQ、原型主题图 `.rq-drawing-visual`、`.ag-planning-visual` | 图片上限320px高 | 上限220px高 | RFQ桌面放在清单右侧；手机接在Drawing revision条目后，同一张图不重复 |
| How we work `.ww-opening` | 文字与460px宽照片并排，间隔48px；≤980px两列比例1:.8、间隔32px | 单列；事实在前，照片在后，照片宽不超过346px | Order essentials与工厂原照配对 |
| `.ww-handover-details .ww-archive` | 最大宽373px，原照约280px高 | 最大宽293px，原照约220px高 | 放在交付文件说明内 |
| P04 `.manual-evidence .reference-grid` | 图组最大876px、间隔24px；单图最大426px宽 | 自适应一列 | 两张16:9涂层原照完整显示 |
| P08/P10 `.guide-context img` | 上限320px高 | 上限240px高 | 与首个主题配对，相关出口移至文后 |
| P09 `.rs-geometry-grid` | 3列、间隔24px；说明图180px高 | 单列、间隔28px；说明图200×150px | 先看几何形状，再读该工艺的特征和图纸要求 |
| P09 `.process-comparison-photos` | 真实照片3列；框高180px | 真实照片仍为一行3列；框高120px | 说明图组之后作为现场参考，不把竖照拉成长图 |
| P10 `.rs-finish-visual` | 320px图列与图注并排，间隔24px | 单列；图最大320×240px | finish-and-acceptance导语后；图注解释涂覆面与需保护接口 |
| P12 `.sh-archive-grid` | 1.4:1:1三列，间隔24px，框高260px | 两列，首图占整行、框高220px；余两图框高180px，间隔16px | 三张真实包装档案组成一个紧凑图组 |

照片框通过 `--reference-ratio` 和框高限制锚点宽度，图片保持自然宽高；不使用裁切把竖图强行填满横框。P05不再重复运输档案照片，P03/P12保留该照片；P11保留现有原型图。

新增四张通用说明图为 ImageGen 生成，分别解释车削、铣削、多轴几何与处理面／保护接口。每张提供480/800/1200宽WebP，在 `resourceIllustrations.ts`集中管理，使用 `data-image-origin="AI-generated"`，页面图注明确为通用说明，不能作为LZZ客户零件或现场证明。原始生成结果、提示词及输出尺寸登记见[来源清单](docs/resources-illustrations-20261013.json)。

本轮实测覆盖12页×桌面1440×900／手机390×844，另对5个关键页面检查360、760、761、980、981宽度，共25项断点检查：无横向溢出、文字截断、加载失败图片或控制台警告／错误。图片放大、Esc关闭与焦点返回、RFQ下一步链接、手机Resources二级导航通过。此结果仅覆盖本轮Resources布局与交互，不代表第9.3节全站矩阵全部完成。

当前预览：[工艺指南桌面截图](D:/lzz/_qa/resources-implementation-20261013/after/process-guide-desktop.jpg)。

### 7.6 内容精简与开放留白（v2.5）

保留采购决定需要的材料、几何特征、加工与检验条件、交付约定和询价操作。删除重复标题含义、复述照片、逐段重复“先提供图纸”的说明，以及与已有字段重复的段落。事实边界、条件、公差限制、草稿状态与通用示意标识不能因删文而丢失。具体信息在最相关的位置说明一次，其余位置可用必要链接连接。

能力页直接进入材料／工艺字段、图纸与检验、产品实例和加工案例；产品目录以图片与短名称扫描，检索仍可使用原说明；产品详情保留制造选项和具体工程条件。案例页保留照片、材料、图纸与检验字段，相关要求合并为一组。Resources 首页保留分类、标题与入口，文章保留技术表格和明确步骤。工厂、质量、关于页面删除照片和标题已经表达的说明。

**源码记录／本轮实测**：`content-alignment.css` 中主要章节选择器使用上72／下48px；≤760px使用上48／下32px（v2.6统一）。范围包括能力、公司、质量、案例和产品相关主要章节，具体以该文件选择器为准，不覆盖首页首屏或自带局部节奏的组件。此规则替代这些组件的通用章节间距，不额外叠加64／40px gap。能力页 `.cap-section-head` 改为单个标题块，下距40／手机24px，避免删去说明后留下空列。指南段落最大68ch，章节上下padding按7.2执行。

本轮核对15个代表页面在1440×900及390×844下的溢出、文字截断、图片加载与控制台；并检查产品筛选、图片弹窗与上下文询价入口。这是代表页面检查，不表示所有路由和全部业务链路均已验收。删改前源码与逐页字数记录保存在项目外的 `D:/lzz/_qa/content-distill-20261013/`。

### 7.7 统一视觉节奏与目录精简（v2.6）

**已实施**：公司、工厂、质量页不再在 `main.info-page` 重设全站章节和列距变量。主要章节统一使用上72／下48px；≤760px上48／下32px。列距由全站负责，>1100px为48px、761–1100px为32px、手机28px。GUIDE-COMPACT的长文局部节奏继续按7.2；首页首屏、询盘表单和具名图集保持自身结构。

标题组到内容统一为桌面40px、手机24px，针对能力、产品、工厂等已有标题组；标题内部与说明的距离不重复叠加。RFQ清单浅色材料章节仅外层负责上下留白，内层归零。Resources 首页主题导航使用 `.resource-topic-nav`，不再误作用于面包屑；删除单独重复的“Resources”标签。首页末尾仅保留FAQ、Contact和Quality一组辅助出口及询价面板，文章页相关导航继续保留。

产品目录网格：桌面行64／列48px；中间宽度行56／列32px；手机行48／列20px。现有手机两列布局保留，<360px改为一列；筛选结果数量对应的列数／最大宽度规则继续生效。图片到标题桌面24px、手机16px；删去说明后标题不再保留额外下边距。

能力目录移除每张卡片重复的“View machining service”，保留整卡链接与几何说明；案例目录以图片和可点击标题作为入口，移除重复工艺标签、View study、Explore collection及重复材料提醒；新闻目录保留事件日期、照片、标题与摘要，移除重复的Read company update和与上方五篇文章重复的年份索引。

移动端辅助阅读入口按文字内容宽度排列；主按钮仍可满宽。操作组桌面横24／纵16px，手机横20／纵12px。

**本轮实测**：20个代表页面在1440×900与390×844下做视觉检查，其余62条公开内容路由做桌面／手机布局边界检查；另核对5个关键页面在834px中间宽度及间距计算值。全部82条公开内容路由均未发现页面横向溢出、受检正文截断或错误覆盖层。此范围不等于所有交互与业务链路验收。工作记录与前后截图在 `D:/lzz/_qa/visual-rhythm-20261013/`。

### 7.8 CONTENT-EDITORIAL 内容页（v2.8）

本轮按已批准的[内容规划](../../content-plan-20261013.md)实施。覆盖33个内容路由：29页更新，工厂、隐私、询盘表单和新闻目录4页核对后保留现有结构。首页、能力和产品共49页正文保持不变。以下规则只适用于 `.content-editorial` / `.ce-refined`，优先于此前同页族的紧凑阅读规则；不修改全站基础字体或导航。

- 主章节按阅读任务合并，多数页面4–7个模块；询盘是单一功能流程，不为凑数增加章节。模块计数包括页首与页内结尾，不计全站页头、页脚、嵌套字段和图集里的单张照片。
- 版心1200px；桌面总边距96px、中间宽度64px、手机44px。图文网格间隔64px，1000px以下36px，760px以下28px并转为单列。正文最大68ch。
- H1最大58px，手机38px；H2最大38px，手机29px；H3 21px。正文与字段内容桌面17px、手机16px；字段标题16px，行高1.5–1.7；沿用Inter。
- 页首上56px／下64px，手机36px／40px；主体单章上下各64px，手机各36px。相邻章节有效内容间距128px／72px，细线落在中间，以当前“大胆留白”的要求为准。一个章节负责间距，嵌套字段不叠加章级留白。
- 图文交替只在桌面改变图片列位置；手机始终先文字后图片。生成图3:2完整显示；原始证据图用contain并保留自然比例。实拍三图组桌面并列、300px图窗，手机单列、最大360px；检验/公司单幅实拍最大520px。
- 公司文件三列展示完整原件，手机单列；点击原件保持有效。四类资料：公司事实与团队、工厂人员、三份文件、发展概要。旧标识退出主阅读流，源档案保留。
- 结尾将相关入口与询盘动作合为一个模块。独立入口仍有边框与44px最小点击高度；红色仅用于主要询盘动作。新闻结尾采用公司/工厂/访问入口。
- 新增6张ImageGen通用工程图，每张480/800/1200/1536宽WebP。可见图注保留AI-generated illustration；不替换真实公司、客户、新闻、证书或检验结果。提示词与来源见[生成清单](docs/content-editorial-images-20261013.json)。

实施、范围与验证记录见[内容页改版报告](docs/content-editorial-20261013.md)。

## 8. 唯一视觉参照与示例

参照包：`docs/design-spec-2026-10-13/`。所有归档图像与原文件字节一致；[资产清单](docs/design-spec-2026-10-13/assets.json) 逐项记录源路径、尺寸、SHA-256和已知CSS视口。R1–R5固定为2026-10-12选择／捕获，归档日期2026-10-13；R6是本轮补全首屏参数的参照，不是新选择的设计稿。截图像素、裁取区域和CSS视口分别计量；源稿没有真实浏览器视口，尺寸不推定为页面视口。

| 编号 | 唯一源稿与像素 | 历史实施／对照 | 对应视口记录与用途 |
| --- | --- | --- | --- |
| R1 · QUOTE-3 | [quote-v3.png](docs/design-spec-2026-10-13/references/quote-v3.png)，1586×992 | [桌面](docs/design-spec-2026-10-13/references/quote-desktop.png)／[手机](docs/design-spec-2026-10-13/references/quote-mobile.png)／[并排](docs/design-spec-2026-10-13/references/quote-comparison.png) | 桌面历史QA记录CSS1586×992，手机390×844；手机全页图390×2680。用于上下文左栏、字段右栏及顺序 |
| R2 · FACTORY-1 | [factory-v1.png](docs/design-spec-2026-10-13/references/factory-v1.png)，1435×1096 | [桌面区域](docs/design-spec-2026-10-13/references/factory-desktop.png)／[手机](docs/design-spec-2026-10-13/references/factory-mobile.png)／[并排](docs/design-spec-2026-10-13/references/factory-comparison.png) | 区域图1425×976、手机图375×812；当前文件缺少对应有效CSS视口记录，不反推。用于两张完整照片的比例、列宽和标题关系 |
| R3 · STUDIES-3 | [studies-v3.png](docs/design-spec-2026-10-13/references/studies-v3.png)，1435×1096 | [桌面区域](docs/design-spec-2026-10-13/references/studies-desktop.png)／[手机](docs/design-spec-2026-10-13/references/studies-mobile.png)／[并排](docs/design-spec-2026-10-13/references/studies-comparison.png) | 区域图1280×1013、手机图375×812；有效CSS视口未逐文件确立。用于交错图文和完整照片 |
| R4 · HOME-INQUIRY | [home-inquiry.png](docs/design-spec-2026-10-13/references/home-inquiry.png)，1449×1086 | [桌面](docs/design-spec-2026-10-13/references/home-inquiry-desktop.jpg)／[手机](docs/design-spec-2026-10-13/references/home-inquiry-mobile.jpg)／[面板并排](docs/design-spec-2026-10-13/references/home-inquiry-comparison.png) | 图像1123×842／375×812；同组历史检查记录1101×853、1138×853、390×844，未把它们冒称为某个裁图的确定视口。用于面板结构与订单条件区域 |
| R5 · CATALOGUE-1 | [catalogue-v1.png](docs/design-spec-2026-10-13/references/catalogue-v1.png)，1330×1182 | [桌面区域](docs/design-spec-2026-10-13/references/catalogue-desktop.jpg)／[手机](docs/design-spec-2026-10-13/references/catalogue-mobile.jpg)／[并排](docs/design-spec-2026-10-13/references/catalogue-comparison.jpg) | 桌面区域1330×1172，有效CSS视口未按此文件确立；手机历史CSS390×844，全模块图390×2594。用于三图／两图、说明与技术字段 |
| R6 · HOME-HERO | [背景副本](docs/design-spec-2026-10-13/references/home-hero-background.webp)，1672×941；来源为现有工程氛围图 | [桌面](docs/design-spec-2026-10-13/references/home-hero-desktop.png)／[手机](docs/design-spec-2026-10-13/references/home-hero-mobile.png)／[测量数据](docs/design-spec-2026-10-13/references/home-hero-measurements.json) | 本轮CSS1440×900／390×844，clientWidth1425／375；导出像素1425×866／375×812。用于首屏高度、文字定位、自然换行与手机94%焦点；不表示全站通过验收 |

### R1 · 询盘第三款

只还原左上下文、右表单与阅读顺序。原稿蓝色链接按颜色表改用正文色，示例接收方手机号不用于客户输入占位，主按钮采用真实纯色；实际联系区包含邮箱、电话、地址和图标。

![QUOTE-3 选定版式](docs/design-spec-2026-10-13/references/quote-v3.png)

### R2 · 工厂组合

只还原完整图位、1.6:1列比例与内容层级。原稿底部红色浏览按钮已由文字阅读入口规则替代。采用真实原图或授权处理版，不复刻生成稿中改变的设备细节。

![FACTORY-1 图文比例参照](docs/design-spec-2026-10-13/references/factory-v1.png)

### R3 · 加工研究第三款

照片与标题承担同一研究入口，交错行保留；原稿重复的红色 View study 和顶部描边浏览入口按第5节替代。真实英文技术内容优先于原稿文字的短长。

![STUDIES-3 交错图文参照](docs/design-spec-2026-10-13/references/studies-v3.png)

### R4 · 首页末尾询盘

还原黑色面板、圆角、条件区域和主任务。原稿两项描边辅助入口采用文字链接；这是 HOME-INQUIRY 的操作规则，不属于图集出口例外。订单数值与说明仍取自内容台账。

![HOME-INQUIRY 结构参照](docs/design-spec-2026-10-13/references/home-inquiry.png)

### R5 · 紧凑图集第一款

还原三图／两图、短图名、详细图注和字段的扫描顺序；照片使用真实原图，技术信息不按生成图片改写。此稿的两项中性描边出口保留在 CATALOGUE-1-EXITS 范围。

![CATALOGUE-1 选定版式](docs/design-spec-2026-10-13/references/catalogue-v1.png)

### R6 · 既有首页首屏

本轮只读取原有页面并捕获参照，未修改首屏。CSS视口与导出像素不等；还原时采用7.1的参数与测量数据，不能把截图高度改写为hero固定高度。背景图片保留AI生成来源标记，不能作为加工现场证据。

![HOME-HERO 本轮桌面参照](docs/design-spec-2026-10-13/references/home-hero-desktop.png)

![HOME-HERO 本轮手机参照](docs/design-spec-2026-10-13/references/home-hero-mobile.png)

### 已有前后对照的使用方法

以下两图属于历史局部对照：左侧均为所选稿，右侧为当时的实现。用于看技术文字字号、组内密度与留白；不是2026-10-13的新规范已在页面生效的证明。

![历史首次对照：右侧字段与说明偏小](docs/design-spec-2026-10-13/references/catalogue-before.jpg)

![历史调整后对照：右侧字段与说明层级加强](docs/design-spec-2026-10-13/references/catalogue-after.jpg)

| 正确处理 | 应修正的处理 | 核对参照 |
| --- | --- | --- |
| 普通章节以一处gap表达关系；具名图集保持组内节奏 | 同时给父section、子容器和标题增加同一段空白 | 上述图集前后对照及第4节归属表 |
| 工厂完整照片通过比例与列宽匹配，留白来自图文关系 | 固定宽高 + contain形成大空洞，或为等高裁掉设备 | R2原稿与实际区域并排 |
| 研究标题／图片提供入口，操作职责明确 | 同一项再加重复红色 View study | R3原稿作为旧操作反例，第5节为最终规则 |
| 图集完整零件用contain；局部／批次按所示特征核对 | 因名称含“批次”就使用cover裁掉完整零件 | 第6节矩阵；需要逐图比较原文件 |
| 句内链接保持正文行高，独立入口具有触控面积 | 对句内链接加44px高度和上下padding | 第5节用途表 |

## 9. 实现归属、差异与验收

### 9.1 实现归属

| 职责 | 原有归属 |
| --- | --- |
| 基础配色／字体变量 | `src/styles/precision-gallery.css`；旧品牌层叠需一起核对 |
| 阅读链接／主操作与操作组 | `src/styles/internal-links.css` ／ `src/styles/visual-consistency.css` |
| 版心／内容节奏 | `src/styles/content-alignment.css`；阅读变体 `src/styles/guide-density.css` |
| 图位与完整显示 | 所属页族组件；共用 `src/styles/image-white-frames.css` |
| 首页工厂／研究／询盘面板 | `home-factory-editorial.css` ／ `home-studies-editorial.css` ／ `home-gallery.css` |
| 询盘字段与草稿状态 | `src/components/QuoteForm.tsx` ／ `src/styles/quote-split.css` |
| 零件图集／车间字段 | `ReferenceGallery.astro`、`AdditionalPartForms.astro`、`WorkshopCollection.astro` ／ `reference-catalogue.css` |

后续实现修改原归属，移除被替代规则；不要再叠加一套 final／override。先核对 `Layout.astro` 的导入顺序与实际计算样式；范围修正使用组件class，不继续增加选择器权重与 `!important`。本次不宣称现有样式已经清理。

### 9.2 待实现与待验证差异

| 项目 | 本次源码／参照记录 | 本次规范与后续工作 |
| --- | --- | --- |
| 常规标题 | v2.9已按第3节采用Georgia H1，普通页最大52px、编辑型内容最大56px；Contact单独采用Times | 第3节字体与标题尺寸为当前规范；具名模块布局保持 |
| 输入框边界 | QUOTE-3 当前 `#AEB5BA` | 规范为 `#8A8A8A`，后续获授权实现 |
| 通用按钮 | 现有最小52px、padding14px 24px、请求550 | 通用默认50px与16px／700；QUOTE-3保留第5节具名52px变体 |
| 主操作 active／禁用 | 全局未集中定义active；询盘禁用目前opacity .5且统一wait光标 | 按第2节状态表归并，区分disabled与真实busy |
| 普通章节节奏 | 现有多处before56px／after40px；不同组件仍有覆盖 | 64／40px净距离由共同父容器负责；逐组件核对，不批量把两端都改成64px |
| 工厂手机标签 | 源码12px，主数值24px | 标签采用14px；照片比例与已选结构保留 |
| 字重 | Inter为本地可变字体100–900；系统衬线H1请求400 | 按第3节分工，不把Inter的550／600规则用于Georgia或Times主标题 |
| 图片旧高度与覆盖 | 多页仍有固定高度／max-height及源目录前缀覆盖 | 按图位用途核对实际显示，归并到组件；不再追加全站高度覆盖 |
| 浏览入口／图集描边 | 历史图片包含旧按钮；源码存在局部规则和共用覆盖 | 阅读入口按第5节；图集出口只在指定nav保留描边，需核对computed style |
| 参照视口 | 部分历史裁图没有可靠的逐文件CSS视口关联；本轮只补全R6两个视口的记录 | 使用已知记录；其余以后同视口重拍并保存DOM尺寸，未知项不补猜测 |
| 指南嵌套留白 | 普通阅读章节与主结构组有各自padding-block规则 | 按7.2指定唯一责任容器；现有DOM和实际层叠尚待核对 |

### 9.3 后续页面验收矩阵

本节为**页面修改后的验收要求**。v2.2文档重建仅检查文档与参照完整性；R6的两次只读测量不代替页面验收。v2.3能力页布局的已验证范围单列于7.4，其余未执行场景继续标记未检查。

| 场景 | 通过条件 |
| --- | --- |
| 360、390、834、1440px视口 | 记录实际CSS宽高、clientWidth、截图像素；页面无意外横向滚动，文字和操作不互相覆盖 |
| 760／1100px断点两侧 | 至少760／761、1100／1101px；核对边距、列数和具名图窗；受影响的960／980／1000px断点也检查两侧；CAP-PRACTICE另查1280／1281px |
| 长英文标题、产品引用与参数 | 完整阅读，不截去单位或条件；200%文字放大后仍可操作；必要宽表只在自身滚动 |
| 浅底／深底交互 | 按状态表逐项核对；hover／active相对默认态可识别，阅读链接允许两者共用表现；focus、disabled与真实busy含义明确；核对实际色对和焦点不被裁掉 |
| 键盘路径 | 主要入口可到达；菜单可关闭；关闭后焦点返回触发入口，无键盘陷阱 |
| 图片 | 图片加载，完整零件不裁主体；允许局部裁切的图仍显示解释对象；图片点击后仍留在当前页，不打开原图或放大弹层 |
| 联系方式联合校验 | 空Name／Message有字段错误；两种联系方式都空有联合错误；只填一种有效联系方式可准备草稿 |
| 草稿与失败状态 | 文案区分草稿与发送；复制失败有保存／选择文本路径；存储不可用仍可准备草稿 |
| 禁用JavaScript后重新加载询盘页 | 邮箱与所需信息可读，邮件链接可操作；草稿功能限制说明明确；不把不可用工具呈现为发送入口 |
| 功能保持 | 筛选、移动菜单、上下文引用、更换／清空和视频控件继续可用；图片保持静态展示 |
| 对照记录 | 同视口、同数据状态比较选定结构；布局、图片焦点、内容遗漏不得以文本抗锯齿差异掩盖 |
| 检查结论 | 每项写通过／未通过／未检查、证据文件与剩余差异；构建通过不代替视觉或交互检查 |

v2.2规范重建验收：本地链接与嵌入图可解析，五个源稿唯一，资产副本哈希一致；[独立复审记录](docs/design-spec-2026-10-13/REVIEW.md)对应该冻结版本。该阶段仅改文档，没有重跑构建。v2.3的能力页修改已运行站点构建及7.4所列浏览器检查，不能据此宣布其他待实现项已同步。

本轮修改前规范保存在 `D:/lzz/design-spec-rebuild-20261013/before/DESIGN.md`；更早历史保存在 `D:/lzz/design-system-cleanup-20261012/before/DESIGN.md`。历史记录用于追溯，不与本文并列执行。上线部署继续需要独立授权。


### 面包屑位置与字号（2026-10-14）

已有面包屑默认位于主内容区左上角，与内容左轴对齐。工厂、能力及编辑型双栏首屏把面包屑作为独立首行，位于标题与图片上方，不随标题组垂直居中。使用 Inter，桌面 16px、手机 15px，行高 1.5、字重 400，允许长路径自然换行。双栏首屏面包屑与下方内容间隔桌面 24px、手机 20px。共享样式由 `src/styles/breadcrumb-system.css` 管理，保留现有路径与链接。


### 图片优先的模块阅读顺序（2026-10-14）

本轮按82个公开页面的实际模块检查，保留用户选定的首页视觉、字体组合、面包屑、资料与采购条件。图片负责展示对象和工艺现场，模块标题指出主题，正文解释条件与操作；不为无图片的表单、隐私或验收条款添加装饰图。

- 能力页：代表图 → 产品实例 → 工程范围 → 加工实拍 → 图纸与检验 → 询价。实例与实拍位于长要求之前，保留既有锚点。
- 产品页：实物与制造选项 → 已有附加视图 → 几何与用途 → 图纸与检验 → 相关零件 → 询价。没有额外原图的产品不重复首图填空。
- 图文模块：图片在DOM中先于辅助说明，桌面照片约占54%，手机自然先图后文。首页能力模块先显示模块标题，再显示叶轮图与工艺／材料导航。工厂检测模块先展示检测实拍。
- 指南：短章节为标题 → 左图／右文，手机标题 → 图 → 文。超过100词的配图章节采用标题与图并列的引入，再在下方以两栏展开放置要求；手机按单列顺序完整阅读。采购条件、材料等级、交期、验收和责任内容不因视觉调整删减。
- 目录图片按主题选择；资料分类使用 `contentGuides[slug].visual`，不再按数组位置分配。能力材料目录采用该材料分类下的现有产品实图。
- 模块H2：桌面32px、手机28px；图文列距48／32／24px。已有来源图注和AI标记全部保留；原图跳转入口已取消。真实实拍保持完整比例，不能被裁成虚构的证据。

实现范围：`module-reading.css`、相关页面与共享组件；表单流程和发送状态不变。首轮验证依据存放在项目外 `_qa/module-reading-20261014/`。


## Shared rounded RFQ panels — adopted 2026-10-14

用户选择灰色圆角第一版：桌面左侧大标题与说明，右侧一个红色询价按钮与邮件草稿提示。使用`RfqPanel.astro`与`rfq-panel.css`，75个公开页面复用；每页保留自身文案、锚点及询价URL参数。面板#f0f1f2、圆角26px（窄容器22px）、最大宽1280px；标题62px/700，手机36px。容器查询依据实际可用宽度切换单列，避免嵌套内容栏挤压。业务事实放入可选details行，面板不叠加辅助内链。导航、页脚、原图与页面主要信息沿用现有内容。视觉来源与实测比较、36项响应式检查见design-qa.md最新章节及`D:/lzz/rfq-rounded-20261014/`。


## Auxiliary link reduction — 2026-10-14

Removed repeated Explore/View and supplementary body exits across 20 pages: net 35 links, plus 9 directory actions merged into article/topic titles. Keep primary cards, meaningful directories, task-specific workflow links, downloads, contacts and inquiry actions. Avoid adding standalone general navigation after every content block. 82 public pages remain reachable; content, images, desktop/mobile layout and navigation checks passed. Evidence: `D:/lzz/link-cleanup-20261014/README.md`.

## Selected charcoal footer — 2026-10-14

User selected the second generated footer direction. `SiteFooter.astro` is shared through `Layout.astro`; styling is owned by `footer-navigation.css` using isolated `lzz-footer-*` classes. The original LZZ logo is displayed in white. Top row: brand, email, WhatsApp. Middle row: Capabilities, Custom parts, Factory & quality, Resources, About LZZ, matching the header order. Bottom row: real address, timezone, copyright and privacy link. The container follows the same `--layout-width` and `--layout-gutter` as the header rather than widening the existing site to the generated concept canvas. Desktop links 16px, headings 20px (18px at narrower widths), contact values 20–28px. At 900px the directory becomes three columns; at 600px it becomes two columns, with stacked contact rows. Use actual links, visible keyboard focus and at least 44px mobile link targets. No new sending flow or external publication. Source, backup, screenshots and checks: `D:/lzz/footer-design-20261014/`.

## Restrained editorial motion — 2026-10-14

Reference: React Bits Split Text / Blur Text (https://reactbits.dev/c/text-animations/split-text). Implemented with native Web Animations and IntersectionObserver in `src/scripts/site-motion.ts`, without new dependencies. Hero phrases enter over 700 ms (520 ms on mobile), 80 ms apart, with a 24 px rise and brief 3 px blur. The hero photograph settles from scale 1.025 over 900 ms. Section headings and selected photography enter once over 520 ms. Fine-pointer card hover rises 3 px over 220 ms. Technical text, forms and figures stay directly readable.

`site-motion.css` adds a #191b1d panel beside the home capability photograph, with #d7d9da links and white headings. It follows the existing two-column / stacked mobile layout. The 82 public pages retain their text, image sources and links. Reduced motion bypasses effects; content remains visible without JavaScript. Keyboard focus and hash navigation settle active effects immediately. The quote page is excluded from entrance effects.

Validation and screenshots: `D:/lzz/editorial-motion-20261014/README.md`. Local preview only.

## Inner-page motion and caption-link cleanup — 2026-10-14

Extended the existing native animation controller across public page families: inner h1 titles use the restrained blur/rise entrance, figures and photography enter once, and product/service/study/news/equipment cards stagger by 60 ms, capped at 180 ms. The nearest animated parent owns an entrance so nested images retain their existing crop and transform. Hover feedback also covers capability cards and case/news photographs. Exclude forms, dialogs, closed disclosures, documents and video-containing figures; keep reduced motion and keyboard/hash settling.

Removed the remaining factory caption text link (View equipment detail). The process guide's standalone Read action now lives on its section heading. The 82-route audit found no links inside public-page figcaptions. Validation and screenshot: `D:/lzz/inner-motion-20261014/README.md`.

## Image compatibility — 2026-10-14

For the user's oversized-image annotation, scanned 82 public routes and 367 main-image slots. Category and explanatory covers can use new ImageGen landscape compositions when a portrait or dense batch photograph is unsuitable for the slot. Keep original source photographs in their evidence collections, and visibly label newly generated covers as AI illustrations. This pass adds two 1536×1024 covers, four responsive WebP derivatives each, reused by the cases directory and plastic/copper-brass capability collection entries. `CollectionCover.astro` owns their 3:2 ratio, alt text and visible origin caption.

Existing impeller detail art is already landscape; `image-audit-pilot.css` now uses 3:2/contain instead of 4:5/cover. Documentary case figures use measured image-ratio widths with a 520px maximum height; capability workshop figures use 460px. `photo-captions.css` keeps captions and photos on the same width and reserves dimensions before lazy loading. Never clip part geometry to satisfy a fixed height. All original image assets remain unchanged; full-photo links and collection content remain available. Evidence, raw outputs and prompts: `D:/lzz/image-compatibility-20261014/README.md`.

## Product detail reading order — 2026-10-14

All 35 product pages use `product-reading.css` and page-specific introductions in `productReading.ts`. The sequence is overview, geometry, materials/process/finish, drawing/inspection, four visible questions, two related parts and the shared RFQ panel. The hero pairs the complete product image with a service introduction and the order conditions. On mobile, the title and introduction precede the image, then the facts and RFQ action.

Retain existing material qualifications, drawing requirements, inspection notes, deeper engineering guidance and original supplemental views. The impeller page uses the heading “Custom CNC Impeller Machining” and a new generated close-up for blade profiles, root transitions and the hub bore; label this image as an AI geometry illustration. Inspection uses the original CMM photograph at a restrained width. Product images supply the social preview image. Keep existing URLs, Product/Service schema selection and draft-only RFQ behavior. Asset prompt and source: `D:/lzz/product-reading-20261014/image-prompt.txt`.

## CNC turning service reading order — 2026-10-14

`TurningCapability.astro` and `turning-capability.css` organize `/capabilities/cnc-turning-service/` into seven modules: service overview and order conditions; three part families; materials and finishes; dimensions and inspection; workshop process photographs; five visible turning questions; and the shared RFQ panel with an inquiry checklist. The mobile order puts the service introduction before the photograph and converts technical tables to labelled rows. The desktop layout uses a 1280px content area, two-column technical introductions and three-column part/process groups.

Use the real workshop and CMM photographs for manufacturing evidence. ImageGen provides a labelled stepped tubular geometry illustration and a retouched source photograph of the shaft, with the original available in the linked metal-parts study. Preserve complete part geometry and limit process photos to 300px on desktop and 340px on mobile. Numerical size and tolerance limits require drawing review. Keep material grades and conditions explicit; the RFQ entry preselects CNC turning and prepares an email draft. Source prompts, original generated images and validation: `D:/lzz/turning-reading-20261014/`.


## 图片静态展示 — 2026-10-14 最新要求

全站公开页面的工厂实拍、产品详情大图、附加视图、案例、新闻和证书图片均不直接打开图片文件，也不弹出放大图。保留原有图片、图注、来源记录、尺寸及布局；静态图片不形成键盘焦点停靠，鼠标使用默认指针。图片作为产品或案例卡片时仍可进入对应内容页。视频播放控件、PDF/TXT下载和正常页面导航保持原功能。本条取代前文关于图片原图查看和放大入口的旧要求。

共享ReferenceGallery已取消图片查看器、放大按钮及其事件脚本。全站82个公开页面检查：原图链接0、图片弹层0、图片触发器0；所有实际图片及正常链接与修改前一致。


## 2026-10-14 零件展示图统一

同系列旧抠图由29张基于原零件家族参考的ImageGen展示图取代。统一3:2白底、清晰主体、柔和接地阴影与真实材质纹理；同一画面通常只放1件，组合限制为2–3件，不使用密集拼贴或复制阵列。以 src/data/productStudioImages.generated.json 为新版共享图片入口；public/media/product-studio/ 保存响应式显示资源，生成提示和来源登记于 docs/imagegen-product-studio-20261014/provenance.json。原图与实际加工、工厂和检验记录保留其证据角色。

## Service pages: seven-module reading order — 2026-10-14

Extended the selected turning structure to the other nine catalog services and the sample-to-part service. `ServiceCapability.astro` shares the layout; `serviceReading.ts` defines each service's material table, drawing/inspection rows, workflow and five visible questions. The sequence is service overview and order conditions, part examples, materials/finishes, dimensions/inspection, process or approval workflow, questions, and the RFQ checklist. Preserve the existing routes, category labels and inquiry-context values. The turning page remains on its approved component.

Use specific content for milling, five-axis machining, casting finishing, aluminum, stainless steel, copper/brass, plastics, prototypes, repeat batches and sample reconstruction. Retain the qualified milling tolerance reference, material designation differences, functional-test boundaries, first-article requirements and sample drawing-approval responsibilities. Sample reconstruction timing is separate from the published machining lead time. Material options require drawing review; do not turn examples into universal specifications.

New built-in ImageGen assets explain milled pockets/holes and cast-blank versus machined-interface geometry. Their eight responsive WebP files are in `public/media/services-reading-20261014/`; original outputs and exact prompts are in `D:/lzz/services-reading-20261014/`. Existing generated detail art is labelled; real workshop, shipment and CMM photographs retain their evidence role. Images remain static, with normal product/study navigation and the existing plastic-parts video preserved.

Desktop uses the approved turning spacing and tables. Mobile at 390px puts the introduction before the image and converts tables into labelled rows. Validation covered all ten changed pages at 1440px and 390px, all ten RFQ service selections, image/link availability, unique IDs, Service schema and unchanged turning text/images. Build and SEO checks passed; Astro check returned zero errors and zero warnings (four existing hints). Evidence: `D:/lzz/services-reading-20261014/static-validation.json` and `browser-validation.json`. Local preview only.


## Factory review: seven-module page — 2026-10-14

The user adopted the factory audit's proposed reading sequence. The factory route now uses its own factory-reading.css and factory-page classes, rather than combining the older factory grids with shared intrinsic-width caption rules. Retain the current header, serif page heading, Inter content, shared RFQ panel and charcoal footer.

The seven modules are factory identity and scale; the production floor; equipment and matching part forms; inspection and order records; drawing-to-shipment inputs and outputs; six visible purchasing questions; and the drawing package/RFQ. Preserve production-capacity, workshop-photographs, equipment, equipment-review, inspection, workflow and order-deliverables anchors. The documents hash continues to redirect to the company document section.

Documentary pictures remain complete and static. The equipment columns have equal visual weight, a shared image height and aligned text, with portrait photos contained rather than cropped. Use the floor photograph as the primary scene and the aisle photograph as a smaller supporting detail. On mobile, introduction and headings precede the photos and explanations; all questions remain readable without opening an accordion.

The 40+ figure includes machining and supporting equipment. Monthly capacity stays a qualified reference. Machine model, travel, load, calibration evidence and relevant reports are requested during qualification, not invented. Minimum order and production timing follow docs/claim-ledger-2026-09-25.md. Sample approval applies when a sample stage is agreed. Photograph dates follow evidence.generated.json; the operators picture is from November 2025 and dispatch preparation is from November 2022.

ImageGen supplies one labelled conceptual workflow illustration; the original PNG and exact prompt are saved in D:/lzz/factory-redesign-20261014/. The four responsive WebP derivatives live in public/media/factory-reading-20261014/, with hashes, prompt and proof scope in docs/imagegen-factory-20261014/provenance.json. The image is not a factory, machine inventory, inspection result or shipment record. Keep important process information in HTML text. Existing Organization, WebSite, WebPage and BreadcrumbList markup stays in place; the factory title and description identify the CNC workshop in Hangzhou.

Validation: seven widths from 320 to 1440px, desktop and mobile screenshots, static image clicks, capability and quality navigation, RFQ inquiry-topic context, unchanged prior DOM anchors, asset/link availability, build, Astro check and SEO check. This is a local preview.


## Case detail reading order — 2026-10-14

All eight case detail pages now use CaseReading.astro and caseReading.ts. The seven modules are case overview and focus; part and drawing context; machining sequence and original process media; technical points; drawing and inspection requirements; three visible questions; and a case-specific inquiry checklist. CaseCollectionExamples.astro keeps the original metal and plastic families together with their source photographs and clips. The directory cards now identify machining and inspection focus.

Retain all original source photographs, six workshop videos, case URLs, Article markup and existing anchors. The prismatic case keeps its established inquiry topic. Original media establishes visible form and workshop context; it does not establish measured acceptance, unseen operations or customer outcomes. The 29-inch reference describes the display size, not a verified enclosure dimension. Drawing review determines datums, material condition, tolerances, finish, measurement method, sampling and records.

Built-in ImageGen supplied two explanatory illustrations: two holding orientations, and panel support/clamping areas. Both carry visible AI-concept captions. Existing service geometry illustrations are reused with their origin labels. The new responsive WebP files are in public/media/cases-reading-20261014/; original outputs and exact prompts are in D:/lzz/cases-reading-20261014/. Documentary photos remain complete and static.

Verified all eight detail pages and the directory at 1440px and 390px without horizontal overflow; mobile technical tables display labelled rows. Checked all eight inquiry topics, the inspection anchor and actual video playback. Build and SEO checks passed; Astro check returned zero errors and warnings with four existing hints. Static checks confirmed seven modules, three FAQs, original media retention, valid local links/assets and no duplicate IDs. Evidence: D:/lzz/cases-reading-20261014/static-validation.json and browser-validation.json. Local preview only.

## Navigation and URL hierarchy — 2026-10-14

Every primary label opens its own section page. The adjacent disclosure arrow opens the child menu; the label and disclosure are separate controls on desktop and mobile. `siteSections.ts` is the shared section definition used by the header, footer and breadcrumb trail. Child pages begin with the breadcrumb directly below the main header; the additional horizontal section-navigation bar is removed site-wide at the user's request. Child destinations remain available in the primary menus and section overview pages. The visible breadcrumb and BreadcrumbList use the same trail.

The five parent destinations are `/capabilities/`, `/products/`, `/factory/`, `/resources/` and `/about/`. About LZZ is a standalone overview with Company profile, How we work, Company documents, Company news and Contact us. Company content lives at `/about/company-profile/`; working process at `/about/how-we-work/`; documents at `/about/company-documents/`; contact at `/about/contact/`. Company news and its dated articles remain in `/about/company-news/`.

Custom parts is a parent page for `/products/part-examples/` and `/products/machining-studies/`. The 35 part details and eight machining studies live beneath their corresponding directory. Factory & quality links to `/factory/workshop/` and `/factory/quality/`. Capabilities retains its established service URLs. Resource articles use the matching Drawings & ordering, Machining guides or Production & shipping directory; RFQ checklist and FAQ remain direct Resources children.

Retain the existing substantive page content, source photographs, videos, part references, inquiry context and downloads. How we work is removed from the Resources topic list because it belongs to About LZZ. `siteRouteRedirects.json` records 61 old canonical aliases; Astro and the SEO build use the same destinations, without chains. Legacy About, Factory and Products fragment links resolve to the corresponding new child content. Canonical URLs, internal links, sitemap and breadcrumb markup follow the current hierarchy. This change is a local preview.

Local development uses a separate Vite dependency cache for each Astro command. This prevents `astro check` and `astro build` from removing the optimized icon module still used by the running preview. Search, filtering and the inquiry form must hydrate after validation runs as well as before them.

Validation passed for 89 canonical pages and 61 legacy canonical aliases. Header destinations, section links, single visible breadcrumb and matching BreadcrumbList, content/image retention, local links and assets were checked against the built HTML. All 89 pages were inspected at 1440px and 390px; 13 principal routes were also checked at 320px, 760px, 969px, 1100px and 1101px. No horizontal overflow or header overlap was found. Verified five parent clicks, the About submenu, Escape, mobile parent clicks, legacy redirects, a retained Factory fragment, catalog search/reset and product-to-inquiry reference paths. Build, SEO, static checks and Astro check passed, with four existing hints. Evidence: D:/lzz/navigation-hierarchy-20261014/verification.json.

Follow-up: the user requested removal of the horizontal child-section bar. Removed its shared Layout render, component and styles across the site. The 89 canonical pages contain zero such bars; breadcrumbs, parent pages, primary dropdowns and URL hierarchy remain. Build and SEO checks passed. Company profile was verified at 728px and 390px, including breadcrumb navigation to About LZZ and return to Company profile.


## Resources: independent purchasing layouts — 2026-10-14

Intent: restructure the fourteen existing Resources pages within the approved brand; implementation and browser validation follow each page's purchasing task. The five-module hub contains one conceptual lead visual, an RFQ preparation list, a grouped guide library, two essential answers and the existing inquiry panel. The drawing directory uses an RFQ feature, four preparation tasks and blank worksheets. The machining directory uses geometry comparisons, specification fields, construction definitions and the two original coating photographs. Production and shipping uses two distinct decisions, with the sample concept and dated packing evidence serving different roles. FAQ retains fifteen visible answers and their related guide links.

The nine guides have explicit plans in resourceReading.ts. RFQ is a preparation checklist; quotation comparison uses a full scope matrix; critical features pairs geometry explanations with measurable requirements; prototype approval separates evaluation, decisions and batch release; part requirements separates working surfaces from process dependence; process selection combines a geometry table with real workshop setups; material specification separates grade, treatment, interfaces and records; prototype-to-repeat planning restores the existing five-part comparison; shipment planning separates protection, responsibility, documents and the historical archive. Shared atoms provide headings, prose, tables and media, without choosing an entire page from word count.

Keep the Georgia H1, Inter content, white/gray surfaces, restrained red actions and existing header, central breadcrumb, inquiry panel and footer. Resource styles are confined to res-page; the scrollbar-gutter rule activates only when that page is present. Original image ratios determine desktop gallery columns, so photo heights align without cropping. Mobile tables retain every field in labeled rows; group names are 22px and repeated field labels are 12px. Mobile packing archives place the two portrait records together below the context photo. Compatibility anchors are out of flow and follow headings, avoiding empty grid cells.

Preserve all fourteen canonical URLs, legacy aliases, meaningful business paragraphs, required tables, original evidence photographs, existing anchors and both text worksheets. MOQ, production timing, specification qualifications, sample/batch release boundaries, ISO scope and mail-draft behavior remain governed by docs/claim-ledger-2026-09-25.md. Important requirements remain HTML text. The nine guides retain Article markup and all pages retain centralized breadcrumb markup.

One built-in ImageGen procurement-preparation image is added to the hub. The four WebP sizes are in public/media/resources-reading-20261014/; the original and exact prompt are saved in D:/lzz/resources-redesign-20261014/. Hashes, tool, consuming page and proof scope are in docs/imagegen-resources-20261014/provenance.json. Every generated image shown in this scope has a visible AI illustration caption. Original coating and November 2022 shipment photographs remain documentary references, not new-order inspection, customer or delivery proof. Local preview only; no production deployment.

Validation passed for all fourteen URLs: 28 desktop/mobile screenshot and DOM checks, plus 42 checks across 320px, 768px and 1100px. No horizontal overflow, missing images, duplicate content IDs or removed-section navigation bars were found. Preserved business content, photos, anchors, local links, both worksheets and nine inquiry topics were verified. Copy matched the intended brief and the clipboard was restored; both actual downloads matched their source files. Build, SEO and static checks passed; Astro check returned zero errors and warnings with four existing hints. Final independent screenshot review passed after correcting alignment, gallery balance and mobile table hierarchy. Evidence: D:/lzz/resources-redesign-20261014/verification.json. Git checkpoint: checkpoint/resources-before-20261014 (e91b292).

## Capabilities: independent purchasing layouts — 2026-10-14

`CAPABILITIES-20261014` is a local content variant for `.capabilities-design` on the overview, ten catalog capability routes and Starting with a sample. It extends the existing Georgia H1, Inter content, white/gray surfaces and restrained red actions/focus. Shared header, breadcrumbs, `RfqPanel`, footer and inquiry-context contracts remain the basis. Local overrides cover composition, type scale, spacing, media frames, technical tables and outlined internal browsing links; they do not define new global tokens.

`capabilityDesign.ts` explicitly orders each detail page's hero and modules. The twelve pages contain six or seven main modules, including the introduction and inquiry. Process pages lead with geometry; material pages lead with grade and acceptance; project pages lead with evaluation or release decisions. Prototype requirements and workflow are embedded in its evaluation module. The full page structures and evidence are recorded in [the Capabilities surface brief](docs/design/capabilities-section-20261014.md). At 760px and below, main compositions stack and technical tables retain every field as labeled rows. Parts remain complete; source photographs retain their aspect ratios.

Four built-in ImageGen concepts supply sixteen responsive WebP assets in `public/media/capabilities-section-20261014/`; prompts and proof scope are in `docs/imagegen-capabilities-section-20261014/provenance.json`. Reused directory illustrations, AI-assisted part visuals and new concepts keep visible origin labels. Original workshop/CMM photographs and the plastic-parts clip remain source references. Business qualifications follow `docs/claim-ledger-2026-09-25.md`.

Recorded validation covers 24 desktop/mobile captures, 84 responsive checks across 320–1600px, twelve-page media/anchor/link/schema checks and all eleven RFQ service selections, with no recorded failures. Evidence is under `D:/lzz/capabilities-section-redesign-20261014/`. Git baseline: `refs/checkpoints/capabilities-before-20261014` (`664a687`). Local preview only; no production deployment.

## Capabilities reading consistency — 2026-10-15

The approved follow-up replaces the eight machining/material pages' individual layout variants with two reading families. This supersedes the independent-layout guidance for those eight pages in the 2026-10-14 Capabilities section; production-stage and sample pages retain their existing layouts.

See `docs/design/capabilities-reading-20261015.md` for scope, module order, mobile behavior, preserved content and verification. Hero frames, part examples and heading introductions are shared. Process pages place machining practice before materials; material pages place grades before machining practice. Plastic machining keeps one URL and the material reading order. Detailed material drawing notes are retained in a native disclosure in the inspection section.
