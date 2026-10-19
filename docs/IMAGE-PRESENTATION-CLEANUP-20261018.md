# 全站图片融入与来源入口清理 · 2026-10-18

本轮已在本地实施。沿用现有 Penta 版式与已选 A 配色，处理图片和容器割裂、主体偏小、重复图注与原图展开区。未部署生产。

## 实际改动

- 能力目录四条加工路线改为开放式图片、标题和说明。4:3 摄影完整显示，取消固定高框造成的色带、白色外壳、内外重复留白，以及标题和正文被旧规则拆成两列的情况。
- 铣削零件参考同步使用完整照片与下方文字。首页零件横栏去掉压在主体上的渐变和标题，保留横向浏览功能；首页与内页首屏的摄影零件前景按原比例显示，操作条放在照片下方。
- 35 个产品详情主图使用实际内容列宽度，取消各页不同的历史缩略图上限。供货范围、独立料号和材料条件从原图注移入正文，原有技术表及锚点保留。
- 清除 326 处重复或装饰性的图片身份图注、206 处 `View source/original photograph/reference/clip` 入口，删除 35 个 `Original reference` / `Original reference set` 展开区。视频图注中的原片链接和失败外链一并清理，车间视频仍可在页面内展开播放。
- 正式文件查看保留，6 处原有文件查看文字改为 `Open document`。新闻中解释具体事件的短说明、铣削步骤中的标题和操作条件继续保留。清理三处“Source listing photographs”等旧标签，并纠正两篇指南把展示图称作原始实拍的措辞；材料、工艺和验收条件保留。
- 内部原图、生成记录、来源注册表与 `data-image-origin` 字段保留。没有新增、覆盖或删除网站图片文件，没有把生成图改称实拍记录。

## 范围与验证

正式路由以本轮 `pages.json` 的 86 个页面为准，排除历史 noindex 设计预览。逐路由替换计数见 `verification.json` 的 `changes`；直接前版包含全部 src 与 DESIGN.md。

| 项目 | 本轮结果 |
| --- | --- |
| 浏览器 1440 / 390px | 全部 86 页，共 172 个页面状态 |
| 浏览器 1024 / 768px | 各 15 个代表页，额外 30 个状态 |
| 图片与布局 | 202 个状态均无加载失败、横向溢出、图片越出 figure 或严重 contain 比例不符；已滚动触发懒加载，关闭的视频区域不判为缺图 |
| 全站图片文件 | 431 个 img 引用、154 个独立图源存在；609 个 srcset 候选宽度与文件像素一致 |
| 公开来源控件 | 正式页面无对应原图链接、图片身份图注或产品原始参考展开区残留 |
| 内容契约 | 86 页 title、description、canonical、H1、JSON-LD、技术表和既有内容锚点与基线一致；业务链接无意外删除 |
| 内部来源完整性 | 产品来源、产品摄影、站点图片、替换映射、evidence.ts、catalog.json 六份核心来源文件哈希未变 |
| `npm run check` | 991 个文件；0 errors、0 warnings，9 条既有 hints |
| `npm run build` | 146 个 Astro 页面构建完成，CSS 提取与 SEO 产物生成完成 |
| `npm run test:seo` | 215 HTML、86 sitemap URL、188 重定向、91 raw URL 通过 |
| `npm run test:css` | 8 项通过 |
| 询价草稿脚本 | 通过；仍为邮件草稿，不上传附件、不代发询盘 |

真实交互回归：新闻筛选返回 2 / 3 / 5 条；产品形态筛选返回 11 条、重置恢复 35 条；亚克力视频在手机宽度下可展开，Enter 关闭后暂停；产品询价按钮正确携带零件名称、slug 和来源页。检查标签页未记录 console error。

已目视复核能力目录、产品详情、公司新闻的整页截图，以及首页、服务、案例、材料与新闻的桌面/手机局部截图。这是实际渲染复核，不是独立 Subagent 审查或用户视觉认可。浏览器预设为上述逻辑宽度；原始截图尺寸和 DPR 另存，截图图像不包含滚动条占用的宽度。Core Web Vitals 未重新测量，本轮没有以本地加载正常代替性能数据。

## 前后截图

截图目录：`D:/lzz/lzz/_react/design/image-presentation-cleanup-20261018/`，共 25 张。以下为本轮同类视口的直接前后对照：

| 页面/区域 | 前 | 后 |
| --- | --- | --- |
| 能力目录 · 1440 | [前](../design/image-presentation-cleanup-20261018/before-capabilities-1440.png) | [后](../design/image-presentation-cleanup-20261018/after-capabilities-1440.png) |
| 能力目录 · 390 | [前](../design/image-presentation-cleanup-20261018/before-capabilities-390.png) | [后](../design/image-presentation-cleanup-20261018/after-capabilities-390.png) |
| 产品详情 · 1440 | [前](../design/image-presentation-cleanup-20261018/before-product-1440.png) | [后](../design/image-presentation-cleanup-20261018/after-product-1440.png) |
| 产品详情 · 390 | [前](../design/image-presentation-cleanup-20261018/before-product-390.png) | [后](../design/image-presentation-cleanup-20261018/after-product-390.png) |
| 首页零件横栏 · 1440 | [前](../design/image-presentation-cleanup-20261018/before-home-parts-1440.png) | [后](../design/image-presentation-cleanup-20261018/after-home-parts-1440.png) |
| 材料区 · 1440 | [前](../design/image-presentation-cleanup-20261018/before-materials-1440.png) | [后](../design/image-presentation-cleanup-20261018/after-materials-1440.png) |

整页：[能力目录](../design/image-presentation-cleanup-20261018/after-capabilities-full-1440.png)、[产品详情](../design/image-presentation-cleanup-20261018/after-product-full-1440.png)、[公司新闻](../design/image-presentation-cleanup-20261018/after-news-full-1440.png)。其它服务、案例和新闻截图同目录可查。

## 记录与回退

- 最终规范：DESIGN.md 第 18 节，并已同步第 3 节的公开来源规则；当前明确指令优先于历史要求公开每张原图的约定。
- `D:/lzz/image-presentation-cleanup-20261018/baseline/`：修改前源码与规范。
- 同目录 `source-changes.json`、`after-source/`、`task.patch`：本轮 32 个源码/规范文件的精确变更与哈希；回退只处理这些差异，不 reset、clean 或整工作区覆盖。若文件已有后续改动，应逐段合并，不整文件恢复。
- 同目录 `before-contract.json`、`after-contract.json`、`after-layout.json`、`functional.json`、`verification.json`、构建与检查日志：本轮证据；项目 design 目录也保存核心验收 JSON。

本轮授权项已完成，无素材待补项。生产发布没有执行；生产主机行为未验证。原图文件保留在项目中，删除公开入口不等于删除源文件。
