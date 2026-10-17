# 白底图文风格推广

日期：2026-09-28。仅本地；未部署、未发送询盘。

## 已实施

用户确认首页 editorial 样板后，保留红黑白品牌色、Logo、现有导航、URL、内容事实和业务承诺。使用 Impeccable layout 方法，以留白、图像比例及阅读顺序代替重复卡片容器。

- 首页：提取 `HomeEditorial.astro` 共用组件，应用已确认样板，移除对比工具栏。保留 `#selected-parts` 与 `#capabilities`；材料由 tabs 改成直接进入四个材料页的入口，与样板一致。
- 产品目录及详情：去灰色图框、圆角与附加阴影，完整轮廓展示；产品标题与图片用细分隔线组织。参数白底，工程清单由三列改为逐行标题/正文结构。手机保持名称、图片、摘要、询盘顺序。
- 能力页：白底开场，目录缩略图无框；案例双列大图，去无意义编号及标签，保留筛选、技术说明、工程条件和原图来源。
- 案例：开放双列目录；详情以原始照片和工程说明形成主次，移除灰底证据容器。
- 知识中心及分类：双列图文目录；文章开场、图组和关联内容去外框，保留 AI 示意标识及图片来源。
- About / Factory：团队照片保持原比例，证书去灰框，厂房图组区分横图与竖图，年份照片档案仍可展开。
- Quality：检查步骤改为纵向流程；交付文档改为目录式排版；空白记录样表去外框阴影，保留其示意性质。
- Quote：桌面侧栏与手机开场改为白底；进度用文字和细线表示，不改 React 表单逻辑。
- 公共 UI：大面积灰色段落背景改白，章节以间距和细线区分；保留红色主按钮及有边界的次级行动入口。Footer 和导航结构不变。

## 文件

新增：`src/components/HomeEditorial.astro`。

修改模板/组件：

- `src/pages/index.astro`
- `src/pages/preview/home-editorial.astro`
- `src/pages/products/[slug].astro`
- `src/pages/capabilities/index.astro`
- `src/pages/capabilities/[slug].astro`
- `src/pages/cases/index.astro`
- `src/pages/cases/[slug].astro`
- `src/pages/insights/index.astro`
- `src/pages/insights/[slug].astro`
- `src/components/KnowledgeCategory.astro`
- `src/pages/about.astro`
- `src/pages/factory.astro`
- `src/pages/quality.astro`
- `src/pages/quote.astro`
- `src/components/CompanyArchive.astro`
- `src/components/EngineeringScope.astro`

修改现有样式文件：`brand-system.css`、`inner-refined.css`、`image-refinement.css`、`link-refinement.css`、`ui-refinement.css`。未额外叠加新的全站覆盖文件；企业/知识/案例模板的局部样式各合并到单个 style。

测试维护：`scripts/verify.mjs` 和 `scripts/verify-refinement.mjs` 中原首页材料 tabs 断言改为材料独立页导航断言。

## 验证结果与边界

- `npm run check`：144 文件，0 errors / warnings / hints。
- `npm run build`：75 页面成功。
- `npm run test:seo`：75 HTML、73 sitemap URLs、86 redirects，通过。
- `node docs/content-upgrade-2026-09-28/verify-content.mjs`：75 页面、4766 链接和图片引用，0 失败。
- 两个更新后的 browser test 脚本通过 `node --check`。本轮没有执行其完整 Playwright 套件，不将其描述为全部测试通过。
- 浏览器实测：390×844 检查首页、目录、产品详情、能力页、案例目录/详情、知识首页/分类/文章、FAQ、About、Factory、Quality、Quote；768×1024 检查目录、产品、能力、About、Quality、文章、Quote；1440×900 检查产品目录/详情、案例、能力、工厂、质量、团队图文、文章与询盘。抽查无页面横向溢出；已加载图片无失败。
- 实际操作：搜索空结果与重置（35 项）、询盘必填阻止空草稿、填写测试数据后生成 mailto 草稿、清除测试输入、FAQ Enter 展开、手机导航打开与 Escape 关闭。没有点击发送邮件入口，没有真实邮件发送。
- 第一轮发现手机 Quote 仍有旧深色开场，修正后复查为白底。
- 关键截图保存在本目录。`products-before.png` 为原布局；`products-after-desktop.png` 为新布局。其余截图以页面及断点命名。截图和路由检查为代表性抽查，不代表逐个产品逐张图片的完整人工验收。

## 素材与事实

没有生成新图片，没有改原始素材，没有补写资质、客户、检验结果或订单事实。现有 AI 示意图仍保留标识；工厂、团队、设备等真实证据仍来自已有原图。校准记录、可公开实测报告及认证文件细节等证据缺口没有因排版升级而被视为补齐。

## 本地查看

- 首页：`http://127.0.0.1:4324/`
- 产品：`http://127.0.0.1:4324/products/`
- 质量：`http://127.0.0.1:4324/quality/`
- 工厂：`http://127.0.0.1:4324/factory/`
- 知识分类：`http://127.0.0.1:4324/insights/production-and-shipping/`

当前使用 4324 构建预览。没有宣称 4323 开发服务器已修复。
