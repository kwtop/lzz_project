# Knowledge Center 导航与 FAQ 整改

## 后续调整：每个子导航独立成页（当前版本）

根据用户反馈，替换下述初版的锚点导航方案：

- Drawings & Ordering：`/insights/drawings-and-ordering/`（3 篇指南）。
- Processes, Materials & Finishes：`/insights/processes-materials-finishes/`（2 篇指南）。
- Production & Shipping：`/insights/production-and-shipping/`（2 篇指南）。
- Company News：`/insights/company-news/`（1 篇已有公司动态）。
- 案例 `/cases/` 和 FAQ `/insights/faq/` 保持独立页面。

页头、页脚和知识中心入口统一使用独立路径，不再使用 `#` 分类跳转。旧首页分区保留以兼容历史锚点。分类页面有独立标题、描述、canonical、面包屑、文章列表和其他分类入口，原文章 URL 不变。

新验证：check 141 文件零错误；build 74 页面；SEO 73 sitemap URLs；4580 链接与图片检查零失败。浏览器确认 Company News 独立页面、菜单到 Drawings & Ordering 的真实跳转及 390px 页面无横向溢出。

以下保留初版实施记录，导航目标以本节为准。

## 已实施

- Resources 更名为 Knowledge Center，保留 `/insights/`。
- 案例从 Factory & Quality 子菜单移动到 Knowledge Center 子菜单；`/cases/` 及五篇工艺研究地址不变。
- 知识中心、页头及页脚从 `src/data/knowledgeCenter.ts` 共用分类名称与链接。
- 文章返回链接及知识中心面包屑名称同步。
- 新增 `/insights/faq/`，11 个问答，按报价下单、工艺规格、检验交付分组；每个回答链接到相关指南或业务页面。
- 原有文章、图片来源说明、业务承诺及询盘流程未改变。没有新增图片或虚构客户案例。

## 导航结构

```text
Knowledge Center /insights/
├── Drawings & Ordering #rfq-guides
├── Processes, Materials & Finishes #engineering-guides
├── Production & Shipping #delivery-guides
├── Machining Case Studies /cases/
├── FAQ /insights/faq/
└── Company News #company-news
```

三个指南分类使用既有页面锚点，而不是新增空的分类落地页。现有指南继续从分类入口进入，案例保留“原始车间照片支持的工艺研究”边界，不宣称客户成果。

## FAQ 事实来源

沿用当前 `quote.astro`、`quality.astro`、`services.ts`、`orderDeliverables.ts` 以及既有采购指南。1 件起订、图纸与订单确认后 7–14 个工作日且包含表面处理、运输另计及 ISO 9001 为用户已确认口径；没有增加证书编号、检验结果、校准记录或新的公差保证。

## 验证

- `npm run check`：136 文件，0 错误、0 警告、0 提示。
- `npm run build`：70 页面成功构建。
- `npm run test:seo`：70 HTML、69 sitemap URLs、86 redirects，通过；未测试线上主机。
- `node docs/content-upgrade-2026-09-28/verify-content.mjs`：4376 链接与图片检查，0 失败，含内部锚点。
- 浏览器：1440px 知识中心及下拉菜单视觉检查；1024px 页头边界无重叠、无横向溢出。
- 390px：FAQ 展开正常，内容无横向溢出；手机 Knowledge Center 菜单显示完整子项，案例链接跳转成功且菜单自动关闭，知识中心保持选中状态。
- 768px：无横向溢出，Enter 键可以展开 FAQ，焦点留在问题上。
- 检查结束恢复浏览器尺寸并关闭临时 QA 页。

仅修改本地项目，未部署、未发送邮件。分类与链接完善不等于已获搜索排名或 AI 引用。
