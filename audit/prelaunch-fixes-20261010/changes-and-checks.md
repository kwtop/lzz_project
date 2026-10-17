# 本地采购路径修复与验收 · 2026-10-10

已完成不依赖企业新资料的直接修项。保留 Inter Variable、现有品牌色与视觉风格、技术栈和既有 URL；未部署、未发送实际邮件。原文件在 `backups/`，源码备份使用 `.original` 后缀，避免被 Astro 类型检查当成运行源码。

## 已修改

| 页面 / 模块 | 结果 |
|---|---|
| 首页 `/` | Machining capabilities 补回塑料加工，五核心系列入口完整；深色 RFQ checklist 改用共享反色动作规则，正常、悬停和键盘焦点可读。 |
| 共享顶部菜单 | 后续补修 `MainNavigation.astro` 的过滤遗漏：Capabilities → Machining 现在包含 Plastic machining，沿用 `/capabilities/plastic-machined-parts/`；Materials 的 Engineering Plastics 入口保留。桌面 1440px、手机 390px 展示及跳转通过，导航构建、SEO 和静态检查通过。 |
| 产品总览 `/products/` | 新增五个既有能力 URL 的快捷入口；保持桌面 9 / 手机 6 个精选，前 6 覆盖五轴、铣削、车削、塑料、铸件及铜黄铜。全部 35 个零件、筛选与无结果重置仍可用。 |
| 35 个现有产品详情 | 用既有数据提供典型几何、材料选项与关键评审点；手机放在大图前，桌面并入原要求表。发动机盖专有表、图注及 RFQ 引用保留。 |
| `/quote/` | 草稿显式展示真实收件邮箱、主题和 webmail 三步发送指引；完整可选取文本含 To / Subject。保留“尚未发送”、邮件应用、复制、保存、编辑及恢复机制。 |
| `/resources/` | 三个现有分组增加可见分类入口；Drawings & Ordering 不再只有 sitemap 发现路径。 |
| 4 个内部设计对比 HTML | 仅补 Description，URL 及 `noindex,nofollow` 保留，SEO 检查恢复通过。 |

## 实际验收

- `npm run check`：0 errors、0 warnings、2 个原有 unused 提示。
- `npm run build`、`npm run test:seo`、`node scripts/verify.mjs --static`：通过。94 HTML、81 sitemap URL、93 重定向规则的本地检查正常。构建检查不代表正式域名托管行为已验证。
- 对比原审计构建：81 个可索引页面的 URL、Title、Description、H1、Canonical 保持；35 个产品摘要与制造/图纸字段完整，35 产品 + 10 能力页的 RFQ ID/source 全部正确。见 `verification-summary.json`。
- 桌面 1440×1000：产品总览、通用详情、发动机盖、资源入口、首页深色询价区、询价草稿实看。完整目录 35、塑料筛选 4、空结果/重置通过。
- 手机 390×844：首页、目录、详情、特殊产品、资源与草稿实看，导航打开及 Escape 关闭通过；360×800 逐一浏览全部 35 个现有产品详情，摘要均在图片前，无横向溢出、未发现已加载图片错误。逐页结果在 `qa/product-mobile-checks.json`。
- 询价：产品引用、无效邮箱提示、草稿生成、复制、保存、刷新恢复、编辑、清除通过；复制与保存文本一致。360px 下 118 字符主题正确换行。测试输入、测试下载已清除，浏览器剪贴板已恢复；未点击实际发送。
- 首页 RFQ 次级入口：桌面实测白字 `rgb(255,255,255)`，背景 `rgb(25,27,30)`；hover 保持白字，focus 为白色 2px 轮廓。手机正常可读。
- 第一批 9 个源码文件及 4 个预览 HTML 经独立只读回归审查未发现实际阻断；后续补修共享顶部菜单，本次累计涉及 10 个源码文件。字体、产品原数据与配置保持。

截图在 `qa/`。本地预览为 [首页](http://127.0.0.1:4323/) 与 [产品总览](http://127.0.0.1:4323/products/)。

企业仍需补充的证据与政策单独列于 [materials-needed.md](./materials-needed.md)。当前认证有效性、实测加工能力、商业履约、正式域名与邮件收件不在本轮已验收范围内。
