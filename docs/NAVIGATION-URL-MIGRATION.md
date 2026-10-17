# Machined parts 导航与地址迁移

完成日期：2026-10-16。仅本地修改，未部署、未推送。

## 最终导航

| 原名称 | 最终名称 | 最终地址 |
| --- | --- | --- |
| Custom parts | Machined parts | `/machined-parts/` |
| Part examples | Parts gallery | `/machined-parts/gallery/` |
| Machining studies | Machining examples | `/machined-parts/machining-examples/` |

Capabilities、Factory & quality、Resources、About LZZ 保持原名称及层级。本次同步页头、页脚、面包屑、相关入口、目录筛选链接、询价来源链接与 SEO 地址，不改变业务能力、参数、产品 ID 或图片。

## 地址处理

- 3 个入口、35 个零件详情、8 个加工实例详情，共 46 个正式页面迁移。
- 零件详情保留原 slug：`/products/part-examples/{slug}/` → `/machined-parts/gallery/{slug}/`。
- 加工实例保留原 slug：`/products/machining-studies/{slug}/` → `/machined-parts/machining-examples/{slug}/`。
- `/products/` 和两个旧列表地址保留兼容入口。已存在的 `/products/{slug}/` 与 `/cases/{slug}/` 别名直接指向最终地址，避免新增跳转链。
- 本地与静态预览中的兼容页面保留查询条件及 hash；图库搜索、筛选、前进与后退已实际验证。兼容页面设为 `noindex, follow`，canonical 指向新地址。
- 构建产物 `_redirects` 已输出永久跳转规则；未部署，因此不声称线上 301 已生效。
- 正式 sitemap 仍为 84 个地址；旧地址不进入 sitemap。结构化数据、canonical、详情内链和询价引用来源均指向新地址。

完整 46 项映射及本次文件清单见 `D:/lzz/navigation-renaming-20261016/migration-map.json`。

## 保留与回退

修改前保存了当时的工作区源文件，而非将已有未提交改动当作可丢弃内容：

- `D:/lzz/navigation-renaming-20261016/baseline/`：源代码、脚本、配置、设计规范及 Git HEAD 记录。
- `baseline-pages.json`：原构建内容、图片与视频引用。
- `baseline-source-hashes.json`：原始文件散列。
- `before-navigation.png`：修改前桌面导航。

如需回退，只按 `source-change-inventory.json` 的本次修改清单逐文件比较及恢复，不执行全仓库 reset。其他同时进行的工作（如 casting-machining 样式）不属于本次迁移，不回退。

## 验证结果

| 范围 | 结果及证据 |
| --- | --- |
| 内容与媒体 | 46 个迁移页逐页比较通过；原图片、视频和有效正文保留。`content-media-audit.json` |
| 原始资料 | catalog、产品图片来源表、附加媒体表及 inquiryContext 工具散列未变。 |
| 逐 URL 浏览器检查 | 46 个地址分别检查 1440×900、390×844，共 92 个 DOM/几何状态；单一 H1、新 canonical、当前导航、无旧路径内链、无可见坏图及横向溢出。`browser-route-checks.json` |
| 额外窄屏 | 3 个入口在 320、1100、1280 宽度下均无横向或页头溢出。`narrow-checks.json` |
| 实际交互 | 新菜单点击、手机展开与关闭、Enter/Escape、旧入口及旧详情跳转、搜索与材质筛选、历史前进/后退通过。`interaction-checks.json`、`extra-interaction-checks.json` |
| 询价 | 旧详情进入新详情后，询价页保留相同产品 ID，并引用新详情路径；未发送邮件或业务测试消息。 |
| 静态校验 | `node scripts/verify-machined-parts.mjs`：46 新页、46 兼容页、92 个共享菜单、107 个询价引用检查通过。 |
| 全站链接与 SEO | `node scripts/verify.mjs --static`、`npm run test:seo` 通过：217 HTML、84 个 sitemap 地址、199 条兼容与历史跳转规则。 |
| 代码与构建 | `npm run check`：0 errors、0 warnings、9 hints；`npm run build` 通过，144 个 Astro 构建入口。 |
| 草稿关联工具 | `node scripts/verify-inquiry-context.mjs` 通过。 |

截图视觉复核使用代表页面，不将 DOM 批量检查表述为逐页人工视觉评审：检查三个入口整页、桌面/手机导航、产品详情与工艺实例的必要变体。整页截图清单见 `full-screenshots.json`；最终首屏截图使用 `final-page-*`，不以早期尺寸切换期间的未完成绘制截图作为验收依据。

## 验收截图

以下文件位于 `D:/lzz/navigation-renaming-20261016/`：

- `after-navigation-desktop.png`、`after-navigation-mobile.png`：最终导航名称及二级入口。
- `final-overview-desktop.png`：新 Machined parts 总览首屏。
- `final-full-0-{1440|390}.png`：总览整页。
- `final-full-1-{1440|390}.png`：图库整页。
- `final-full-2-{1440|390}.png`：加工实例列表整页。
- `final-page-1-*`、`final-page-7-*`、`final-page-38-*`：图库、多面加工零件与两次装夹实例首屏。

本次命名与迁移无未完成项。既有类型弃用提示未作为本次导航任务扩大处理；生产环境的跳转响应需未来部署时验证。
