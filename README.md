# LZZ Precision 独立站

## 当前版本（2026-10-19）

Astro 7 + React 19 静态网站，包含 86 个正式 URL、35 个零件参考详情和 188 条重定向。首页、能力、零件、工厂、资源、公司与询价页面已按确认的 Penta 参考方向统一；当前视觉规范见 `DESIGN.md`，正式页面结构见 `docs/CURRENT-SITE-STRUCTURE.md`。

当前预览：<https://preview.lzz-precision.pages.dev/>。预览设为 `noindex`；生产 canonical 仍为 `https://www.lzz-cnc.com`。推送 GitHub 与部署 Cloudflare 是独立操作，本次仓库同步不改变生产域名、DNS 或发布状态。

克隆仓库后，在项目目录执行：

```powershell
npm ci
npm run check
npm run test:css
npm run build
npm run test:seo
npm run dev -- --port 4321
```

页面内容与响应式图片已包含在 `src/` 和 `public/`，构建不需要本地原始内容归档。旧站 URL 的可追溯快照为 `src/data/legacyUrlEvidence.json`；若默认归档存在，或显式设置 `LZZ_CONTENT_ROOT`，SEO 构建仍严格读取归档并校验映射。只有重新导入原始内容的 `npm run import:content` 需要另行提供原始归档。

询价仍仅准备邮件草稿，可复制、下载或打开邮件客户端；图纸附件由客户在邮件客户端添加并手动发送。没有后台上传、提交或送达功能。

图片原始素材、提示词和采用映射按用途保存在 `design/`、`src/data/` 与 `docs/`。缓存、构建产物、本地验收截图和回退备份不纳入本次仓库同步，继续保留在本机。

## 早期实施记录

以下为 2026-09-09 的历史记录；页面数量、视觉、图片与部署状态以当前版本和对应日期的实施文档为准。

公司与信任内容补充（2026-09-09）：用户确认后恢复 2017／1,500 m²／40+ 加工及辅助设备数据；About 新增 6 组应用和 3 个原零件工程说明入口；Factory 新增 4 类设备概览；Quality 调整为实际已发布流程、测量类别与文件要求；How we work 补样件定制、包装、国际快递与交付说明。减少产品/能力页重复免责声明，保留图纸和订单范围。暂未取得真实检验报告、设备型号、客户项目记录，因此不伪造案例或报告。用户明确先完成内容，直接提交与上传未实施。

产品背景已统一为内页正方形白底、细边框、无混色和额外内边距；完整原图与放大查看保留。原始素材与首页视觉未修改。

内容与 SEO 迁移准备（2026-09-09，当前）：新增 Quality 主导航，Insights 改名 Resources 但保留地址；新增质量页和 RFQ、合作流程、材料与表面处理 3 篇指南。10 个能力页、35 个零件页加入评审内容，8 个代表零件增加深入要点；补齐铝材展示分类为 9 项。About 与旧技术文章去除未经核验的泛化数字承诺。内容边界见 `docs/content-evidence.md`，旧网址迁移见 `docs/migration.md`。

当前验收：`check` 0 错误/警告/提示；`build` 60 HTML（59 正常页＋404）；`test:seo`、`test:site`、`test:refinement` 全通过。59 条正常路由通过 390px/1024px 检查，新增导航和指南在 1440/1024/820/390px 检查；所有正常页最多 2 次站内点击可达，无失效内容锚点。首页页面/专属样式、原 catalog 哈希不变；共享导航按批准方案扩展。没有发布或修改线上站点。

以下早期记录中的 56 页/55 路由为此前版本，当前页面数以上述验收为准。

内页体验补充（2026-09-09）：手机目录压缩引导区、改为单列图文条目；详情讨论入口前置；能力按工艺／材料／生产阶段分组；工厂原照进入首屏；询价重要提示提升至14px。新增样式 `src/styles/inner-refined.css` 仅作用于相关内页，不改变已认可首页，不新增素材。

最新调整（2026-09-09）：保留第二版首页，新增四张已标识的材料／加工示意图、35 个产品摘要、原图放大、展示标题搜索和按产品隔离的会话草稿恢复。手机询价表单前移，工厂照片与文件说明改为准确、可确认的内容。共享样式位于 `src/styles/global.css`，首页特殊构图位于 `src/styles/home-refined.css`。完整设计与验证记录见 `DESIGN.md` 顶部。

本次验证：56 个静态文件构建成功，类型检查 0 错误/警告/提示；全部 55 条正常路由通过 390px 与 1024px 横向溢出检查，主要交互通过。桌面与手机代表页面已实图检查。仅本地改造，未部署。

项目：`D:/lzz/lzz/_react`。Astro 7 + React 19，纯静态输出，交互使用 React islands。所有图片、字体均本地托管。

## 本地运行

```powershell
cd D:\lzz\lzz\_react
npm install
npm run dev -- --port 4321
```

访问 http://127.0.0.1:4321/ 。Astro 7 开发服务在后台运行，可用 `npx astro dev status` 查询，`npx astro dev stop` 停止此项目服务。

```powershell
npm run check
npm run build
npm run test:site
npm run test:refinement
npm run test:seo
```

`test:site` 需要本机 Chrome 和已启动的本地服务；可用 `TEST_URL` 指向其他预览地址。它检查构建文件的站内链接、图片引用、H1，浏览器搜索/筛选/材料切换/询价草稿和移动导航，并检查全部正常路由的 390px 布局。截图写入系统临时目录，结果会显示路径。

## 内容结构

- 35 个产品详情，10 个分类，5 篇资源内容（2 个原文章地址＋3 篇新指南）。
- 首页、能力总览、产品列表、关于、工厂、质量、资源列表、询价、隐私、404，共 60 个静态页面文件。
- `src/data/catalog.json`：原产品名、分类、原始介绍与技术内容、原图和来源链接。
- `src/data/presentation.ts`：35 个产品展示短标题和 10 个分类的展示文案；不覆盖原始目录数据。
- `src/data/productSummaries.ts`：35 个产品的用途、材料、结构、工艺、检验及卡片摘要。原始技术 HTML 保留在目录与归档，详情展示为经整理的摘要。
- `src/data/capabilityContent.ts`、`productDetails.ts`：能力和零件的差异化图纸、检验、询价评审内容；`productTags.ts`：不覆盖原始目录的材料归类。
- `src/data/resources.ts`：新版指南与原文章地址的编辑层；`seo.ts`：正式 origin 与基础页面摘要。
- `scripts/import-content.mjs`：读取 `D:/lzz/raw/_content` 的内容与资产清单，去重并生成网站数据。默认相对路径 `../../raw/_content`，可以用 `LZZ_CONTENT_ROOT` 覆盖。原始资料不变动。
- `src/data/services.ts`：能力入口；`src/styles/global.css`：统一视觉系统。
- `public/media/`：官网素材优化副本、已有示意图，以及本轮新增的 4 张 WebP；原首页主图与铝材特写保留。
- `design/home-concept.png`：设计概念；`DESIGN.md`：设计、图片来源和验证记录。

## 图片生成记录

本轮新增：`stainless-detail-v3.webp`、`brass-copper-detail-v3.webp`、`plastic-detail-v3.webp`、`machining-features-v3.webp`。精确提示词、源文件和用途见 `design/material-assets-v3.md`；页面明确标识 AI 示意图。

以下为首轮素材的历史记录，后续首页主图已更新为 `machining-hero-v2.webp`，完整记录见 `DESIGN.md`。

使用内置 Image Gen，非 CLI/API。素材为 `precision-hero.webp`、`cnc-milling.webp`、`cnc-turning.webp`、`cnc-five-axis.webp`、`aluminum-detail.webp`。

统一提示方向：高端工业编辑摄影，真实感机械结构，银灰金属与深黑背景，清晰刀纹和柔和侧光，无文字、无标识、无人物、不代表真实交付。

1. Hero：右侧铝合金壳体、钢法兰和小方块，左侧黑色留白，16:9。
2. Milling：立式铣刀加工带圆孔的铝块，少量金属屑，3:2。
3. Turning：车床卡盘夹持阶梯圆柱零件，右侧刀具，3:2。
4. Five-axis：倾斜主轴加工有曲面和凹槽的铝件，旋转工作台，3:2。
5. Aluminum：铝壳圆孔、肋板、螺纹孔的近距离刀纹特写，满幅无白边，16:9。

产品详情使用官网原图；工厂页面使用官网工厂原图，不用生成图冒充事实。

## 询价和上线边界

询价只在本地生成邮件草稿，可打开邮件客户端、复制或下载。无上传接口、无后台发送、无虚假成功提示。需在邮件客户端添加 CAD/图纸附件并手动发送。

填写内容仅在当前标签页的 `sessionStorage` 保存，按产品上下文隔离；可刷新恢复或主动清除。存储不可用不阻止生成草稿。`test:refinement` 验证这些状态、图片键盘交互及 1024px 全路由布局，也会输出临时截图路径。

尚未部署。生产 origin 已设为 `https://www.lzz-cnc.com`，页面输出 canonical、独特摘要和基础 JSON-LD；构建后在 dist 生成 sitemap、robots 与 86 条精确重定向规则，覆盖归档发现的 91 个旧网址。构建需要原始归档（可通过 LZZ_CONTENT_ROOT 指定）。托管方式、真实 HTTP 重定向、HTTPS/www 统一和预览 noindex 仍需部署阶段配置并验收；无需为了上线强行增加询价后端，可保留当前真实邮件草稿流程。
