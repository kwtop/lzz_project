# 面包屑与全站图片边界修正

2026-09-30，本地预览 `http://127.0.0.1:4323/`。

## 结果

两处反馈已修正，并将图片边界规则应用于全站相关图片组件。80 个公开页面分别在 320、673、1440 px 宽度下完成原生浏览器逐页检查，共 240 次页面检查。当前用户打开的塑料加工案例页面已刷新，临时视口覆盖已清除，测试标签已关闭。

面包屑原来混用了链接的垂直居中和普通分隔文字的排列方式。现统一文字基线、行高和 44 px 点击区域，分隔符随下一项排列；窄屏换行时不会留下独立的斜线。

案例原图原来被放入横向白底框。用户指出的第二张 PTFE 照片在 673 px 视口中，图片元素从 **626 × 480 px** 调整为约 **270 × 478 px**，边框贴合照片，说明文字与照片同宽。原照片完整保留，可以点击打开原图。

工厂、人员、检验、案例、材料与资源文章中的相关照片均按真实图片比例设置尺寸，使用轻量边框及小圆角。照片外部背景透明，竖图不会撑成宽白框，也不会通过强制高度拉伸。产品抠图、文档缩略图和 logo 保留各自适合的展示方式。

## 浏览器验证

使用 Codex In-app Browser，通过 `cua_repl` 操作与读取页面；没有使用独立 Playwright 或 CDP 脚本替代原生浏览器。检查结果保存于 `after-320.json`、`after-673.json`、`after-1440.json`，汇总见 `responsive-verification.json`。

| 视口宽度 | 公开页面 | 图片引用数 | 页面横向溢出 | 来源照片比例问题 | 可见照片框高度异常 | 标题溢出 | 过小独立控件 | 主按钮异常换行 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 320 px | 80 | 592 | 0 | 0 | 0 | 0 | 0 | 0 |
| 673 px | 80 | 592 | 0 | 0 | 0 | 0 | 0 | 0 |
| 1440 px | 80 | 595 | 0 | 0 | 0 | 0 | 0 | 0 |

图片引用数包含重复 logo 和不同页面引用，不代表独立照片数量。比例检查比较图片内容框与实际文件比例，扣除边框和内边距；已解码图片使用浏览器实际尺寸，尚未触发加载的图片使用构建时读取的原始文件尺寸。封闭折叠区不计入可见框高度检查。专门用于产品或文档的统一展示画布不按照片框判定。

本次页面均返回对应标题和正文，未发现空白页面或错误覆盖层。最后浏览器日志中没有捕获到警告或错误。第二张 PTFE 照片的链接经实际点击，打开 `/media/source-details/plastic-ptfe-intermediate-1200.webp`，原图页面显示一个图片元素；结果见 `functional-verification.json`。

截图保留完整视口与页面上下文：

- `screenshots/breadcrumb-before-673.png`：原面包屑。
- `screenshots/breadcrumb-after-673.png`：当前用户标签刷新后的对齐结果。
- `screenshots/photo-after-673.png`：照片边界和同宽说明文字。

## 内容与静态验证

- `npm run check`：173 个文件，0 errors / 0 warnings / 0 hints。
- `npm run build`：通过，生成 82 个 HTML。
- `npm run test:seo`：通过，82 个 HTML、80 个 sitemap URL、86 个重定向规则、91 个来源 URL；线上主机行为未测试。
- `node docs/media-boundaries-2026-09-30/verify-content.mjs`：通过。82 个 HTML 的标题、正文块、metadata、canonical、JSON-LD、媒体来源、alt、srcset、链接、锚点和主要 CTA 与改动前一致；36 个业务及来源数据文件哈希一致。
- `node docs/finesse-redesign-2026-09-30/verify-links.mjs`：通过。7,089 个本地资源及链接引用、566 个页面锚点，没有缺失；结果已复制为本目录的 `link-verification.json`。

## 变更范围

`before-source.zip` 保存本次改动前的全部 `src`；按 SHA-256 比较确认只修改以下 6 个源文件，新增 1 个文件，未删除源文件。完整哈希见 `changed-files.json`。

- `src/styles/finesse-redesign.css`：面包屑对齐，以及不同图片用途的边界、宽度、比例和窄屏规则。
- `src/components/ReferenceGallery.astro`：按真实原图比例设置照片及说明文字宽度。
- `src/components/EvidenceImage.astro`：为证据照片提供真实尺寸比例。
- `src/components/KnowledgeCategory.astro`：资源分类照片比例。
- `src/pages/insights/[slug].astro`：文章主图比例。
- `src/pages/insights/index.astro`：资源索引图片比例。
- `src/lib/photoFrame.ts`（新增）：构建时用项目已有的 Sharp 读取本地图片尺寸，缓存结果并输出 CSS 比例变量；不重编码图片，也不增加客户端处理。

本次保留原照片、正文、来源说明和 SEO 内容。验证及修改均在本地完成，未部署。
