# LZZ finesse redesign · 2026-09-30

已按本轮 audit 修改现有 Astro / React 网站，采用真实工业照片、紧凑的采购资料层级和克制的交互反馈。当前交付为本地最终构建预览：<http://127.0.0.1:4323/>。

## 改动与影响

| 原 audit 问题 | 已实施处理 | 最终验证与边界 |
|---|---|---|
| 320px 主要按钮换行、页脚导航 40px | 调整 header 品牌、按钮、菜单分配；Quality 主按钮适配；页脚入口提高至 44px | 80 个公开页面 × 320 / 375 / 414 / 768 / 1440：主要按钮未换行，页脚导航不低于 44px。原 CTA 文案保持不变。 |
| 技术指南的大图先于答案 | 保留原正文，把第一决策 section / 对比表移到插图前；目录与后续正文共享阅读框架 | 材料指南首个正文标题：1440px 下约 1,288 → 351px；320px 下约 808 → 429px。公司新闻继续保留纪录照片的内容次序。 |
| Resources 七篇入口同等大图 | 询价准备入口重点呈现，其余改为按采购问题组织的紧凑索引；分类页采用主次结构 | 桌面页面高度约 4,664 → 2,943px，首个指南标题约 1,176 → 410px。七篇入口、原图片、说明与链接全部保留。 |
| 资格证据需额外索取 | Quality 首屏集中 supplier qualification 与原邮件索取入口，展示原 CMM 照片；保留文件类别和空白检验表的边界 | 改善核验路径；没有新增 ISO 证书、校准记录、客户报告或测量结果。公开资料不足这一事实仍然存在。 |
| About 主次不明、文件出现较晚 | 前置公司主体、事实与文件；原团队、历史、行业、零件和档案继续保留，调整密度与展示权重 | 桌面 Company documents 区约 3,821 → 1,157px；页面高度约 7,638 → 5,313px。 |
| 设备竖图裁切、零件无完整查看 | 四幅设备图用 contain 展示，增加原照片链接；产品 Gallery 提供原图查看 | 源图片和原能力页入口保留。设备图不再用横框 cover 隐去结构；产品链接打开已有完整图片。 |
| 目录首屏图片与名称分离、手机说明 12px | 收紧目录图片和控制区；手机工艺说明增至 14px | 桌面首行名称约 903 → 789px，说明约 841px；保留手机两列、几何 contain 和原说明全文。 |
| H1 泛化，页面对象不明确 | 用既有短零件名称补充对象标识；About 首屏呈现原公司法定名称 | 所有 H1 原文和 SEO metadata 保持不变，没有按 audit 建议重写受保护的标题。 |

共享样式统一冷灰背景、石墨文字、既有红色主行动、Inter Variable 的字重与间距。移除 GSAP 的入场淡入，正文直接保持完整可读；保留 CSS hover / active / focus 和 reduced-motion 处理。RFQ 草稿状态在手机滚动与焦点定位时保持可见。

## 内容与业务保护

修改前保存了 `before-source.zip` 和 `before-content.json`。针对 82 个构建页面逐项比对，原路由集合、title、全部 meta、canonical、JSON-LD、H1、正文块、原 href、图片、锚点 ID 和主要 CTA 标签 / 目的地全部通过。允许调整版式和原内容顺序，不允许删减受保护内容。

QuoteForm、ProductExplorer、inquiryContext、catalog、seo、resources、presentation 七个业务与数据文件的 SHA-256 与修改前一致。所有素材仍为原有本地照片或已标注的示意图；没有生成、下载或替换新素材，也没有增加客户、证书或业绩事实。

## 验证记录

- `npm run check`：0 errors / warnings / hints。
- `npm run build`：82 个 HTML 页面。
- `npm run test:seo`：82 个 HTML、80 个 sitemap 页面、86 个重定向、91 个检查 URL 通过。
- `verify-content.mjs`：上述内容、SEO 和七个受保护文件比对通过，见 `content-verification.json`。
- `verify-links.mjs`：7,089 个本地引用和 566 个锚点通过，见 `link-verification.json`。
- 最终构建的浏览器验证共 400 组页面 / 宽度组合：无整页横向溢出、主要标题内部溢出、主要按钮换行、页脚导航尺寸不足、可见已加载图片损坏或未完成的 React load hydration。见 `responsive-verification.json`。
- 产品目录验证了搜索、空结果、重置、工艺 / 材料组合筛选；询价验证了零件预填、必填项、无效数量、草稿准备、修改、复制、下载与清空；同时检查了手机菜单 Escape、技术目录和空白检验表示例。见 `functional-verification.json`。未打开邮件应用或实际发送邮件，QA 草稿和测试下载已清理。

`screenshots/` 保存最终构建的首页、About、Quality、指南、Resources、目录、零件详情和询价草稿截图；`visual-metrics.json` 是实际浏览器测量。当前预览服务保留供审查，本轮未部署。

## finesse 检查的适用边界

静态 detector 已运行，原始结果见 `detector.json`。其中四项 P0 是文件级正则误判：三处 `new URL(..., siteOrigin)` 被当成文件引用（Layout 两处、QuoteForm 一处）；MainNavigation 与 DisclosureAnchors 缺少各自独立的 reduced-motion 片段。实际本地引用检查全部通过；最终共享 CSS 已提供 reduced-motion，DisclosureAnchors 使用 instant 定位。对应判定见 `detector-review.json`，不将原始命中直接当成可见缺陷。

本轮依用户的受保护内容与真实、克制方向作取舍：保留原正文中的破折号、长阅读链接和既有白色按钮文字；不为排版规则改写 SEO 或 CTA。Inter 保持品牌与工程资料阅读的连续性，照片承担工业质感，不叠加装饰噪点。未承诺或增加重型视觉引擎，不将通用样式偏好宣称为全部严格门槛通过。

旧 `test:site` / `test:refinement` 断言仍含早期的卡片数量和 CTA / 草稿标签，未作为本次通过项。本轮使用修改前内容基线、当前 SEO 脚本、完整链接检查与实际交互验证，未改写旧断言来制造通过。
