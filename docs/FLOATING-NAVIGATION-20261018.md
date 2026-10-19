# 全站透明与悬浮导航

2026-10-18，本地实施，未部署生产。

用户要求大屏默认透明，滚动时导航始终在顶部并左右略微收窄，其余页面保持一致。本次把首页和内页不同的定位方式收敛为共享导航，保留正文、栏目目的地、询价参数、图片及 SEO 信息。

- 首屏：摄影和深色背景上用透明导航及白色 Logo、文字；浅底页面用深色 Logo 和文字。
- 滚动：48px 后显示固定的石墨色浮条，回到 16px 内恢复透明。桌面左右各留 24px，平板 16px，手机 10px；背景轻微收拢，文字和 Logo 不缩放。
- 菜单：展开时提供实色背景，桌面菜单保持在视口内；1100px 以下使用手机导航，子菜单整行展开，长菜单独立滚动。保留父栏目链接、11 个 Capabilities 子页、键盘进入、Escape 逐层收起及点击外部收起。
- 页面位置：浅底页提供原导航等高占位；Capabilities 照片延伸到原导航区域，同时增加等量首屏高度和上部间距，保留原标题及正文位置。联系页延用既有深色叠加首屏。
- 动态效果：仅背景透明度和 transform 的短过渡，滚动监听为 passive 且只在状态切换时改类名；减少动态效果时取消过渡。锚点为导航留出可读空间。

实施文件：`src/layouts/Layout.astro`、`src/styles/floating-navigation.css`、`src/styles/capability-scene-hero.css`；规则见 DESIGN.md 第 21 节。

验证结果：

- Astro check：995 文件，0 errors、0 warnings，9 项既有 hints。
- 构建：146 路由；CSS 优化 87 页，8 项 CSS 检查通过。
- SEO：215 HTML、86 sitemap URLs、188 redirects、91 raw URLs 检查通过。
- 86 个正式页面的 main HTML、标题、摘要、canonical、JSON-LD、导航文字和目的地与修改前完全一致；优化后的样式保留悬浮状态。
- 23 组桌面、平板和手机前后对照，195 个标题位置均无超过 1px 的变化。覆盖 320、390、768、1024、1099、1100、1600、1920px。
- 桌面四组下拉菜单无越界；手机 320/390/768px 菜单无标题重叠或窄列压缩，可在屏幕内滚动，11 个能力入口保留。键盘进入、逐层 Escape、点击外部、锚点避让、滚动位置恢复和 reduced-motion 检查通过。
- 已检查首页整页截图，全部图片加载正常；当前 4327 首屏和滚动状态截图保存在任务目录。

证据、前版及回退：`D:/lzz/floating-navigation-20261018/`。查看 `content-verification.json`、`geometry.json`、`states.json`、`functional.json`、`screenshots/`、`source-changes.json` 与 `task.patch`。只回退本轮差异，不恢复整个工作区。

当前 `http://127.0.0.1:4327/` 与 `http://127.0.0.1:4326/` 统一提供 `D:/lzz/floating-navigation-20261018/qa-root/dist`，exec session `28060`。旧预览产物保留，本轮临时开发和对照服务在验证后停止。
