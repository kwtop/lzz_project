# Penta 内页布局统一 · 实施记录

日期：2026-10-17。用户已选定 Penta 首页方向，并授权全部内页沿用其布局与质感。正式页面使用 LZZ 内容与品牌蓝，本轮已实际修改页面、制作并接入图片，未部署生产环境。

## 完成范围

83 个正式内页已接入统一设计，首页保留已选版本。完整路由及逐页检查结果见 [PAGE-RESULTS.md](penta-interiors-20261017/PAGE-RESULTS.md)。

| 类型 | 数量 | 本轮处理 |
| --- | ---: | --- |
| 能力、材料及项目阶段 | 12 | Penta 分栏首屏、前景零件、开放图文、白色流程块、技术表和蓝色 RFQ 区 |
| 零件总览、目录及详情 | 37 | 大幅完整主体、统一形态图尺度、清楚的特征及验收表；保留 35 条详情内容 |
| 加工记录与集合 | 9 | 原始过程图组、工序与验收关系、统一标题和模块比例 |
| 公司、新闻及合作 | 10 | 公司事实、原始事件、资格文件与合作责任分别组织 |
| 工厂 | 1 | 真实车间图、设备与检验内容、清楚的供应商资格区和手机事实栏 |
| 资源与指南 | 12 | 图文页头、适量图片入口、连续阅读正文、稳定目录和移动技术表 |
| 询价与隐私 | 2 | 任务优先的表单及阅读布局，统一字体、宽度和操作尺寸 |

本轮正式内页的布局与适用图位无挂起项。历史 noindex 设计方向及演示页面不属于推广范围。所有原 URL 保留。

## 内容组织与版式

- 铣削页将几何、孔腔和刀具可达性从技术集合中提为首个开放图文章节；之后是原始两次装夹、材料与验收、零件示例、RFQ。相关零件不再抢在工艺解释前出现。
- 铝、不锈钢和塑料材料页先显示相关零件形态，再进入完整牌号、材料状态和工艺条件表。未删除独有参数、适用条件或验收责任。
- 公司简介将三项事实并列展示，资格文件保留原件及原图入口；去掉整块旧蓝色文件背景造成的视觉拥挤。
- 资料总入口将两类主要任务做为两列大入口，FAQ 单独承接；不再保留空着的第三列。采购工具集中成一块，减少重复说明。
- 指南保留正文、目录、技术表和采购模板，使用白色连续阅读区；询价、FAQ 和隐私页不强套服务型大首屏。
- 移除旧版重复的首屏外壳、示意框和冲突的字体/色彩继承；本轮没有为缩短页面而删去有效技术内容。

参考为 [Penta CNC milling](https://www.pentaprecision.co.uk/services/cnc-milling) 的实际渲染。1440px 校准记录在 [参考尺寸](D:/lzz/penta-inner-exact-20261017/reference/milling-layout-final.json)，参考完整截图在 [参考页](D:/lzz/penta-inner-exact-20261017/reference/milling-1440-calibrated.jpg)。较早的 reference/milling-1440-full.jpg 有浏览器缩放影响，以 calibrated 版本为准。

正式内页样式入口是 `src/styles/penta-interiors.css`，由 `Layout.astro` 最后加载，以 `data-inner-layout="penta"` 隔离。共享组件为 `PentaInnerHero.astro` 和 `PentaVisual.astro`；图片映射在 `src/data/pentaInteriors.ts`。字体、颜色、尺寸与后续维护规则已更新至 [DESIGN.md](../DESIGN.md)。

## ImageGen 实际交付

本轮使用宿主内置 `image_gen`，实际生成并采用 6 幅图；均为非证据类示意。每幅提供 480 / 800 / 1120px WebP，共 18 个响应式文件。原图和母版保留，网页不直接发送 PNG 母版。

| 图片 | 用途及替换关系 | 比例 | 1120px 文件 |
| --- | --- | --- | --- |
| milling | 替换服务首屏中不适合竖幅的旧过程图；用于铣削、铝件及铸件加工等 | 4:5 | [milling-1120.webp](../public/media/penta-interiors-20261017/milling-1120.webp) |
| turning | 车削、不锈钢及铜件服务的新竖幅工艺说明 | 4:5 | [turning-1120.webp](../public/media/penta-interiors-20261017/turning-1120.webp) |
| five-axis | 能力目录和五轴页的夹持、刀具可达性说明 | 4:5 | [five-axis-1120.webp](../public/media/penta-interiors-20261017/five-axis-1120.webp) |
| plastic-milling | 塑料加工页的新竖幅过程图 | 4:5 | [plastic-milling-1120.webp](../public/media/penta-interiors-20261017/plastic-milling-1120.webp) |
| drawing-review | 资料入口、图纸指南、原型及样件规划的通用静物 | 4:3 | [drawing-review-1120.webp](../public/media/penta-interiors-20261017/drawing-review-1120.webp) |
| packing | 替换原有通用包装概念图，承接批量与运输指南说明 | 4:3 | [packing-1120.webp](../public/media/penta-interiors-20261017/packing-1120.webp) |

完整生成提示词见 [prompts.json](../design/penta-interiors-20261017/prompts.json)。母版、像素尺寸、文件字节数及实际采用路由见 [manifest.json](../design/penta-interiors-20261017/manifest.json)。最大 WebP 约 159KB，首屏合理设置 eager/high，其余 lazy。

生成图保留可见的 illustration 标识。工厂、检验、员工、新闻、客户参观、文件及加工记录仍用原始资料。没有生成或改变特定零件关键结构来冒充原件；不将 AI 图作为机床配置、订单、发货或检验结果的证据。

## 主要类型前后截图

截图根目录：`D:/lzz/penta-inner-exact-20261017/`。before 是本轮修改前的 1440px 桌面完整截图；after 是实际浏览器滚动加载图片后的完整截图。手机为 390px。下列 10 类可直接逐项比较；另外 7 个差异页面也保存了双端截图。

| 页面 | 修改前 1440px | 修改后 1440px | 修改后 390px |
| --- | --- | --- | --- |
| 铣削服务 | [前](D:/lzz/penta-inner-exact-20261017/before/milling-1440.jpg) | [后](D:/lzz/penta-inner-exact-20261017/after/milling-1440.jpg) | [手机](D:/lzz/penta-inner-exact-20261017/after/milling-390.jpg) |
| 铝件服务 | [前](D:/lzz/penta-inner-exact-20261017/before/aluminum-1440.jpg) | [后](D:/lzz/penta-inner-exact-20261017/after/aluminum-1440.jpg) | [手机](D:/lzz/penta-inner-exact-20261017/after/aluminum-390.jpg) |
| 零件详情 | [前](D:/lzz/penta-inner-exact-20261017/before/part-1440.jpg) | [后](D:/lzz/penta-inner-exact-20261017/after/part-1440.jpg) | [手机](D:/lzz/penta-inner-exact-20261017/after/part-390.jpg) |
| 工厂 | [前](D:/lzz/penta-inner-exact-20261017/before/factory-1440.jpg) | [后](D:/lzz/penta-inner-exact-20261017/after/factory-1440.jpg) | [手机](D:/lzz/penta-inner-exact-20261017/after/factory-390.jpg) |
| 资料入口 | [前](D:/lzz/penta-inner-exact-20261017/before/resources-1440.jpg) | [后](D:/lzz/penta-inner-exact-20261017/after/resources-1440.jpg) | [手机](D:/lzz/penta-inner-exact-20261017/after/resources-390.jpg) |
| 长技术指南 | [前](D:/lzz/penta-inner-exact-20261017/before/guide-1440.jpg) | [后](D:/lzz/penta-inner-exact-20261017/after/guide-1440.jpg) | [手机](D:/lzz/penta-inner-exact-20261017/after/guide-390.jpg) |
| 公司简介 | [前](D:/lzz/penta-inner-exact-20261017/before/company-1440.jpg) | [后](D:/lzz/penta-inner-exact-20261017/after/company-1440.jpg) | [手机](D:/lzz/penta-inner-exact-20261017/after/company-390.jpg) |
| 零件目录 | [前](D:/lzz/penta-inner-exact-20261017/before/catalog-1440.jpg) | [后](D:/lzz/penta-inner-exact-20261017/after/catalog-1440.jpg) | [手机](D:/lzz/penta-inner-exact-20261017/after/catalog-390.jpg) |
| 加工记录 | [前](D:/lzz/penta-inner-exact-20261017/before/study-1440.jpg) | [后](D:/lzz/penta-inner-exact-20261017/after/study-1440.jpg) | [手机](D:/lzz/penta-inner-exact-20261017/after/study-390.jpg) |
| 询价 | [前](D:/lzz/penta-inner-exact-20261017/before/quote-1440.jpg) | [后](D:/lzz/penta-inner-exact-20261017/after/quote-1440.jpg) | [手机](D:/lzz/penta-inner-exact-20261017/after/quote-390.jpg) |

另存的 7 个双端页面：`turning`、`five-axis`、`plastic`、`batch`、`prototype`、`capabilities`、`ordering`，命名均为 `after/{name}-{1440|390}.jpg`。保存截图不等同于逐张独立评审。

## 验证结果与已修复问题

| 验证 | 实际结果 |
| --- | --- |
| `npm run check` | 974 个文件；0 errors、0 warnings、9 个既有 hints |
| `npm run build` | 144 个 Astro 页面构建通过；SEO 后处理完成 |
| `npm run test:seo` | 213 HTML、84 sitemap URL、188 redirects、91 raw URL 全部通过；不代表生产主机行为验证 |
| 静态页面检查 | 84 个正式页面、5607 个本地引用无问题；title、description、canonical 与本轮基线一致；每页一个 H1 |
| 全路由真实浏览器 DOM 检查 | 83 内页 × 1440/390 = 166 次；无横向溢出、无已加载破图、H1 数量及内页标记正确，检查范围内无低对比结果 |
| 代表页记录 | 17 个实际差异页面，均保存桌面及手机完整截图 |
| 浏览器控制台抽检 | 当前本地测试标签页无 error/warn |

对比检查是结合可见样式的启发式排查，不是全站 WCAG 认证；懒加载图片另通过代表页实际滚动和截图检查。完整记录：任务目录中的 `browser-all-pages.json`、`static-check.json`、`check-final.log`、`build-final.log`、`seo-final.log`。

实际交互已经走通：目录搜索 impeller 得到两条；无结果、重置、Impellers 筛选与刷新恢复；手机菜单、子菜单及 Escape 关闭；FAQ 分类锚点和指南目录；服务入口带入询价上下文、必填校验、生成完整邮件草稿及清除测试输入。见 [functional-checks.json](D:/lzz/penta-inner-exact-20261017/functional-checks.json)。没有发送邮件、打开邮件应用、上传图纸或测试真实收件。

独立 Subagent 查看铣削、零件详情、工厂、指南的双端截图，指出两项具体问题：工厂浅蓝资格卡继承了白字；手机事实栏挤压并裁切面积。已分别指定文字颜色并改为标签在上、数值在下，复核确认两处消失。证据在 `review-crops/factory-credentials-fixed.jpg` 和 `review-crops/factory-mobile-facts-fixed.jpg`。

另外修正服务深色块的文字继承、首屏图片高度规则、全宽区滚动条溢出、资料入口空列及公司文件区旧背景。最后两个 CSS 调整后已重新检查并截图，最终构建已重跑。

## 回退与保留边界

本轮直接前版保存在 `D:/lzz/penta-inner-exact-20261017/backup/`，包括完整 `src/` 和 `DESIGN.md`。原有 Git 工作区改动未重置；未 stash、clean、commit 或部署。逐文件变更及哈希见 [source-changes.json](D:/lzz/penta-inner-exact-20261017/source-changes.json)，修改前 Git 状态见同目录 `git-status-before.txt`。

恢复时只按变更清单取对应备份文件，不覆盖其它工作。新增的四个源文件、图片目录和本轮记录独立列出，可按需移除或停用引用。原图片没有删除。

询价逻辑、上下文库、SEO 数据、35 条目录数据、公司事实数据、能力与资源内容数据，以及已选首页组件、首页路由和首页样式文件，均与本轮备份哈希一致。技术条件、7–14 business days 的起算条件和 finishing/shipping 范围、40+ machining & supporting equipment 的限定、当前证书与范围确认要求保持有效。

尚未进行生产部署、真实收件测试或真实流量 Core Web Vitals 测量。本轮没有未生成却声称已完成的图片。
