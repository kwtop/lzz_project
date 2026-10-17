# Assessment B：检测与浏览器证据

独立执行；没有读取 Assessment A 或主 Agent 的设计判断，没有修改 UI/source。检测范围为 `src/pages`、`src/components`、`src/layouts`，本地浏览器目标为 `http://127.0.0.1:4323/`。

## CLI

完整命令：`C:\Users\Administrator\.agents\skills\impeccable\scripts\impeccable.cmd detect --json src/pages src/components src/layouts`。

只执行一次；范围 53 个文件；退出码 0；完整结果 `[]`；发现 0 项，因此无 CLI 规则名或文件位置。完整输出为 `detector-full.json`，运行元数据及浏览器规则计数为 `detector-summary.json`。静态 clean 不等于浏览器或产品设计没有问题。

## 浏览器覆盖

五个代表页面：首页 `/`、目录 `/products/`、首个多孔圆形铣削部件详情、质量 `/quality/`、RFQ `/quote/`。每页检查 1440×1000 桌面与 390×844 移动视口，保留首屏、完整页面和五张无头浏览器 overlay 截图；另保留设备照片、首页工厂证据及移动菜单截图。

- 五页两个视口的 `documentElement.scrollWidth - innerWidth` 均为 0。
- `Inter Variable` 的实际 Latin font face 为 `loaded`；`document.fonts.check` 为 true。其他 unicode 字体子集 unloaded 是正常的按需加载，没有证实字体回退故障。
- 产品主图采用 contain，完整轮廓可见；质量 CMM 照片采用 cover、50% 68% 定位，探头与夹具仍在截图中。没有证实关键物体被裁掉。
- 19 个所见站内 hash 目标均返回 200 且存在目标 ID，包括 `production-stages`、`sample-to-part`、`part-information`、质量段落与 factory workflow/equipment。没有发现缺失锚点。
- 桌面菜单保持单组展开，Escape 关闭并返回触发项；移动端第一下 Escape 关闭当前分组，第二下关闭整菜单。点击 Browse Custom Parts 导航到目录并收起菜单。
- 目录初始桌面展示 9 项，搜索无结果有 Reset filters；重置返回 35 项；从新目录页点击 View all 返回 35 项。
- 产品详情到 RFQ 的产品名、产品 ID、来源页均保留；必填校验、本地 prepare、结果焦点、同标签刷新恢复、编辑与清理通过。邮件链接协议为 mailto；没有打开邮件应用或实际发送。
- 页面脚本错误记录为空。所有结论限定于本次代表页面与视口。

## 可进入主报告的具体问题

1. **[P2] 产品参考名预先填进了必填需求字段。** 从产品页进入 RFQ 后，只填写姓名与邮箱即可生成草稿；`Project requirements` 只有 `Multi-bore circular milled component`，并没有用户的部件尺寸、用途或要求。参考信息已经独立保存在引用栏和草稿中，建议让需求 textarea 保持空白并要求用户填写自己的需求。证据：`browser-evidence.json → interactions.quote.prepared.body`；`src/components/QuoteForm.tsx:10`、`:47`、`:136`。
2. **[P3] 导航分组标签略低于小字对比度要求。** `Machining / Materials / Projects` 为 12px、`#73797e` 对白色，约 4.4:1。建议改用更深的文字色，达到至少 4.5:1。位置：`src/styles/navigation-refinement.css:3`。这是次要可读性问题。
3. **[P3] 图像来源说明偏小。** 首页 `Illustrative machining visual` 实际为 11px，移动页工艺说明也为 11px；这条来源边界应比普通装饰性脚注更容易辨认。建议增至 12–13px。位置：`src/components/HomeEditorial.astro:55`、`:58`。
4. **[P3] 目录标题层级跳级。** `/products/` 的 h1 后直接进入产品卡 h3，缺少目录分组 h2。建议增加有意义的 h2，或将该页直接子卡片标题改为 h2。位置：`src/components/ProductExplorer.tsx:64`。这属于语义问题，不能据此声称视觉标题不可读。

## Overlay 原始信号与误报

五页 console 组标题分别宣布 29 / 11 / 8 / 13 / 9 项，总计 70；收集到的逐规则日志实际为 75 条，包含之后出现的全局样式信号。保留工具自身计数差异，不将这些数量写成已确认缺陷数。

| 规则 | 逐规则日志数 | 证据解释 |
|---|---:|---|
| text-occlusion | 35 | 多数指向关闭的 details 导航面板，并把隐藏面板与可见正文的几何重叠判为遮挡；首页 h1 本身完全可读。不能据此报告菜单或主标题被遮挡。 |
| low-contrast | 20 | 15 条为重复的三组导航标签；首页其余白字背景估算不能直接证明图像上的真实对比失败。 |
| heading-rhythm | 5 | 产品/案例标题与上方照片构成同一个链接，标题后的大留白是卡片边界，不能单独认定标题归属错误。 |
| layout-transition | 5 | `src/styles/navigation.css:7` 的小箭头 margin transition，属于低影响 CSS 信号，没有交互故障证据。 |
| gpt-thin-border-wide-shadow | 2 | 两页加载了本地配色预览组件；样式存在于隐藏预览控件，不能当作生产页面可见卡片风格问题。 |
| dark-glow | 2 | `src/styles/palette-preview.css:30` 的隐藏预览控件 `#132a36` 阴影；当前页面没有显示该控件。 |
| tiny-text | 2 | 首页 11px 来源说明是真实小字；质量页 10px 为折叠内容中的 blank record 格式标记，影响较低。 |
| line-length | 2 | 质量文档文字的约 88 / 111 字符行长是阅读建议信号，未证实阻断操作。 |
| skipped-heading | 1 | 目录 h1→h3 的语义跳级确实存在。 |
| wide-tracking | 1 | blank record 格式标记的 0.10em，不是正文段落；不应按正文 tracking 缺陷处理。 |

最初记录到的图片 naturalWidth 0 来自尚未滚动触发的 lazy 图像。滚动后首页图像全部加载；目录剩余五张未加载图像位于默认关闭的 Covered components & gear forms details 中，不能标成 broken images。对应结构见 `src/components/AdditionalPartForms.astro:4`。

## 运行限制与清理

原生 `cua.createBrowserTab("chrome", ...)` 失败，精确错误为 `nodeRepl.fetch request failed`。首次 Playwright 访问 4323 也曾返回 ERR_CONNECTION_REFUSED，随后使用主 Agent 持有的就绪 Astro 服务。

Playwright 新上下文真实 mutation preflight 通过：title 修改、script 节点新增、脚本执行均为 true。自有 impeccable live-server 在后台启动，端口 8412、PID 6180；五页实际注入 detect.js 并生成 overlay 截图。但是浏览器为 headless，**没有用户可见的 [Human] 标签或 overlay**，不得声称用户浏览器里已经显示覆盖层。

`live-server stop --keep-inject` 返回 0 和 `Stopped live server on port 8412.`；进程与端口监听均已消失。使用 keep-inject 是因为注入只发生在临时浏览器 DOM，没有向页面源码写入脚本标签。主 Agent 的 Astro 服务由主 Agent 清理。B 自行尝试的临时 Astro PID 69636 早已因 MODULE_NOT_FOUND 退出，没有占用端口。

临时 .mjs、连接 token 文件、失败启动日志与空日志已删除；保留 JSON、报告与截图。两次取证脚本假设修正已记录在 JSON 中：Reset filters 返回全目录；移动 Escape 分两层退出。另一次 lazy decode 等待被中止后改成有上限的等待；这些均不计为网站故障。

完整证据：`browser-evidence.json`、`browser-followup-stdout.json`、`mutation-preflight.json`、`detector-summary.json`、`detector-full.json`、`run-cleanup.json`。
