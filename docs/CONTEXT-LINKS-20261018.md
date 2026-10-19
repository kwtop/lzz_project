# 正文相关入口优化 · 2026-10-18

用户指出铣削选型表下的小内部链接不协调。本轮已将同类入口整理成清晰的文字导航，沿用当前 Penta 风格与 A 配色。仅本地实施，未部署。

## 已完成

- 工艺选型表下使用 RelatedLinks，共享可见分组标题；桌面标题与目的地分栏，手机改为完整宽度的单列。
- 相关入口采用 16px 正文级字号、52px 点击行、细分隔线与右箭头。下载保留 download 属性并使用下箭头。深色区继承浅色文字与柔和铜色箭头。
- 零件详情的页内跳转移除胶囊外观，采用 15px 平直目录；桌面至少 48px、手机至少 46px 点击行。
- 加工案例的入口说明留在相应链接下方；零件概览 RFQ 链接、铣削的其他零件形态、资源下载区同步整理。
- 正文中的正常行内链接继续随段落阅读；主按钮、筛选、顶栏与页脚保留原有职责。

受样式影响 81 个正式页面；正文链接组覆盖 80 个页面。分布：Resources 13，Parts 46，Factory 1，Capabilities 12，About 9。逐页清单见 [style-impact.json](../design/context-links-20261018/style-impact.json)。

## 实际检查

| 检查 | 结果 |
|---|---|
| 正式路由 | 86 个，以 canonical、robots 和构建结果识别，排除历史预览 |
| 1440px / 390px 真实浏览器 | 172 个页面状态，无横向溢出；所检查入口至少 15px、点击高度至少 44px |
| 代表截图 | 14 类位置均保留桌面与手机前后截图；另有 4 类遗漏位置的最终截图 |
| 整页复核 | 铣削、零件详情、车铣案例、技术指南各检查桌面/手机，共 8 组，滚动触发后图片均加载 |
| 中间视口 | 铣削 768px、320px；零件资源入口 1024px；1600px 仅做几何检查，不计为截图验收 |
| 键盘与目的地 | 可见 2px 焦点；实际按 Return 从相关链接进入不锈钢页；所有原 href/query/fragment 保留 |
| 下载 | 7 个下载链接文件存在且非空 |
| 控制台 | 最终私有预览页无 error 日志 |
| npm run check | 996 files，0 errors，0 warnings，9 个原有 hints |
| npm run build | 通过，146 个 Astro 页面；CSS 处理覆盖 87 页 |
| npm run test:seo | 通过，215 HTML、86 sitemap URLs、188 redirects、91 raw URLs |
| npm run test:css | 8 项通过，0 失败 |

canonical、description、JSON-LD、H1、原锚点及全部原链接目的地与基线一致。技术表格单元格保留。并行文案任务改动了两个产品 title 及材料指南的两个表头，均来自本轮未编辑的数据/指南文件，已保留并登记于 concurrent-copy-differences.json；这些是本轮对比字段中的差异，不代表整站其他正文没有并行改动。

询价功能仍准备邮件草稿，本轮未改发送、上传或表单行为。没有新增图片、依赖或 JS 行为。

## 对照与回退

- [铣削页上下文最终效果](../design/context-links-20261018/screenshots/after-milling-context-1440.png)
- [铣削链接组前后对照，左前右后](../design/context-links-20261018/screenshots/comparison-milling.png)
- [零件页前后对照](../design/context-links-20261018/screenshots/comparison-part-resources.png)
- [案例页前后对照](../design/context-links-20261018/screenshots/comparison-turn-mill.png)
- [技术指南前后对照](../design/context-links-20261018/screenshots/comparison-guide.png)
- [公司新闻前后对照](../design/context-links-20261018/screenshots/comparison-news.png)

DESIGN.md 第 23 节记录最终规则；保留编辑前已存在的第 21、22 节。源文件仅 6 个：CapabilityDecisionGuide.astro、ProductsOverviewRedesigned.astro、Layout.astro、DESIGN.md，新增 RelatedLinks.astro 与 context-links.css。

直接前版和最终源码保存在 D:/lzz/context-links-20261018/baseline/ 与 after-source/。交付目录 design/context-links-20261018/ 含截图、路由与浏览器台账、验证结果、日志、哈希、task.patch。已通过 git apply --reverse --check，仅检查可回退性，没有实际回退。需要回退时只处理 task.patch 的本轮差异，不整文件覆盖其他任务改动。未执行 Git reset/stash/commit 或生产部署。

本轮链接呈现与本地验证已完成；视觉效果仍由用户在预览中确认。
