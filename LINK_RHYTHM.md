# 内链与板块节奏 · 2026-10-12

本轮调整已落地，沿用 Arial / Helvetica、原红黑品牌与现有业务 URL，未部署。

## 当前视觉规则

- 询价仍为主要红色动作；独立内容出口使用透明底细边框，最小 48px 高。
- 工艺、材料及相关资料组成开放列表：文字左对齐、底部分隔线、最小 52px 行高；手机归为单列。
- 文章与图片附属链接采用轻量下划线，正文引用保持句内阅读，不统一塞入按钮。
- 主要章节桌面上 96px / 下 64px，首页上 104px / 下 72px；手机上 64px / 下 48px。规格表、组内入口和技术指南保持较紧的阅读间距。
- 产品页末尾桌面为采购要求、询价动作两栏；手机恢复自然顺序。原有邮件草稿提示移入操作组，紧随按钮。

## 实施范围

`src/styles/internal-links.css`、`visual-consistency.css`、`content-alignment.css`、新增 `content-rhythm.css`、`src/layouts/Layout.astro`、`src/pages/products/[slug].astro`，以及 `DESIGN.md` 的当前设计规则。

本轮未更换图片、字体或产品技术事实。原始源码与截图保留在 `design-previews/link-rhythm-20261012/originals/`、`before/`。

## 核验与预览

- 82 个业务页在 1440px、390px 视口下完成 164 次浏览器渲染检查，保存真实全页截图；主要页族另以截图检查节奏、链接层级与长标题换行。
- 最终记录中无横向溢出、可见缺图、错误页面或小于 43px 的非句内动作入口。原字体保持 Arial / Helvetica。
- 手机导航展开与关闭正常，能力菜单含 Plastic machining；塑料筛选得到 4 个示例，与 PTFE 搜索组合得到 1 个，重置正常；从产品进入询价页保留产品上下文与 NDA 提示。未填写或发送真实询价。
- 20:30 的最终生产构建、静态链接/资源/标题检查、SEO 检查通过；类型检查 0 errors、0 warnings，2 个既有提示。最终截图记录已排除服务中断时的错误画面，164 次有效记录均使用 Arial / Helvetica。
- 本地对比：`http://127.0.0.1:4323/link-rhythm-20261012/index.html`。包含首页、Resources、About、产品询价区的改前/当前截图，可切换桌面和手机；该页 noindex / nofollow，不加入正式导航或 Sitemap。

## 共享工作区证据边界

本轮修改完成时，82 页正文、主内容链接、图像与 SEO 字段的精确对照曾全部一致。后续工作区同期新增了 `guide-density.css`、资料页相关章节入口、图片查看器和 `quote-split.css` / 询价页布局，这些修改已保留，并纳入最新构建及浏览器检查。

20:18 的最终精确 HTML 对照：71 页全字段一致，11 页因上述同期改动有差异；82 页标题、Description、Canonical 与 URL 均保留。7 页的变化包含图片查看器的 Zoom in / Close 文本与额外图像节点；3 篇指南增加了章节链接；询价页重组了内容，直接 Email / WhatsApp 入口仍可从页脚找到。原始差异保存在 `verification.json` 与 `concurrent-content-diff.json`，不将这些差异称为本轮删除了采购信息。

资料页后写入的专用密度样式优先于通用节奏规则。本地服务中途有短暂中断，已恢复；最终交付链接均在真实浏览器中打开确认。
