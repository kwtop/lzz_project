# 全站 UI 与图片升级交付

日期：2026-09-26。范围：本地 Astro / React 前端，未部署；询盘仍为邮件草稿，不新增后台。

## 完成清单

| 项目 | 实施结果 |
| --- | --- |
| 真实证据前置 | 首页第二屏改为真实车间、真实 CMM、2017 / 1,500 m² / 40+ 加工及辅助设备摘要。About 首屏使用真实来访讨论照，约 1,214px 处加入来访和团队精选；完整年份档案保留在下方。Quality 改为检验流程、设备、记录要求、认证信息，提供页内导航。 |
| 图片质量与一致性 | 首页三件精选零件等宽；目录和详情使用浅中性底、contain 完整轮廓。修复手机产品图片超出容器、下半部被裁掉的问题。资源文章限制图片高度并保留完整画面。新生成 1 张样件与小批量概念示意，输出 4 个 WebP 尺寸，保留原件与 AI 标签。 |
| 客户阅读顺序 | 产品目录移除重复首屏大图和第二层大标题，筛选与产品提前。详情分类移至技术资料下方；保留用途、几何摘要及询盘，明确可讨论选项不是实拍规格。手机为名称—图片—核心说明—询盘；平板为通栏标题、图片与摘要并排。能力页改为摘要信息表、页内导航；案例详情增加章节导航并收敛标题尺度。 |
| 公共 UI | 在原有样式文件中统一主要标题、章节标题、按钮和焦点；主 CTA 红色，次级动作边框按钮，正文/导航仍为文字链接。页脚宽度由 1300px 调整为 1140px，与页头正文对齐，收紧过大的间隔。未增加装饰箭头。 |
| 询盘 | 开场只解释邮件草稿流程；检查清单折叠，MOQ / 周期 / 质量 / 运输整理为摘要。平板表单前置、联系和条款放在后面。必填校验、按产品隔离的会话草稿、恢复、复制及失败提示、TXT 下载保留。没有发送成功提示或真实邮件发送。 |

## 图片替换与来源

| 位置 | 处理 | 来源 / 边界 |
| --- | --- | --- |
| 首页真实证据 | workshop-wide、cmm-room 提前 | evidence.generated.json 有原始资料相对路径、原图尺寸、SHA256、证明范围；本轮未改变照片像素。 |
| About 首屏 | 用 visitor-part-discussion 替代 company-parts-retouched-v2 装饰性零件图 | 2025 年 1 月来访目录，原始 1706 × 1279；只证明来访讨论，不声称客户身份或项目结果。 |
| About 精选 | workshop-visit、team-2025-evening-group | 2025 年 1 月来访、5 月团队资料；完整原始照片不裁切人物，保留年份档案。 |
| Quality | 撤下 cmmOperator AI 人物模块 | 改用真实 CMM；不把设备照片等同于校准或实测记录。 |
| Factory | 撤下 factoryOperator AI 人物模块 | 保留真实厂房、设备、操作人员和生产流程照片。 |
| 产品目录 | 撤下重复的 five-axis-operation 首屏大图 | 该真实图仍保留于其工艺内容；没有删除原资源。 |
| 样件 / 小批量指南 | prototype-batch-comparison-illustrative-v1 改为 v2 | imagegen 新生成的通用概念图，浅灰背景、五个完整轮廓；不是 LZZ 产品实拍、生产批次或发货证明。v1 文件保留。 |
| 产品图 | 保留 35 个既有产品的图片映射 | 本轮只改前端比例、留白、背景和适配，不生成替代孔位/轮廓，不新增具体产品实拍声明。 |

真实来源索引：[evidence.generated.json](../../src/data/evidence.generated.json)。既有产品/宣传图映射：[refinedImages.ts](../../src/data/refinedImages.ts)。

[逐页图片清单](image-inventory.json)覆盖 69 HTML、534 处图片使用、317 个图片文件（含响应式变体），记录尺寸、字节数、使用页面、caption、srcset 和可匹配的原始照片来源。非 evidence 图标/既有图片以原映射为准，不自动猜测来源。自动检查不等于逐张原图的光学清晰度测量；本轮人工检查重点为受影响图片及各模板实际呈现。

新图：[原始 PNG](prototype-batch-v2-original.png)；[提示词与验收说明](imagegen-prompts.md)。交付资源：public/media/editorial/prototype-batch-comparison-illustrative-v2-{480,800,1200,1536}.webp。生成图未用于员工、厂房、检验、发货或客户证明。

## 验收记录

- npm run check：126 files，0 errors / 0 warnings / 0 hints。
- npm run build：69 页面构建成功。
- npm run test:seo：69 HTML、68 sitemap URL、86 重定向规则校验通过。未测试部署主机行为。
- npm run test:site：68 个正常页面在 390px 下无横向溢出；素材、导航、材料标签、搜索、空结果重置、筛选、产品预填、必填校验和邮件草稿流程通过，errors / failures 为空。
- npm run test:refinement：通过。覆盖 68 页 768px 平板检查，以及 1440 / 768 / 390 截图、静态产品图、会话恢复、产品隔离、损坏/不可用存储回退、复制失败、下载内容、邮件换行、键盘操作及触控尺寸。
- 原测试中“手机图片排在询盘后”的断言改为本轮约定的“名称—图片—询盘”；平板检查从 1024px 改为用户要求的 768px，未取消功能断言。
- 浏览器单独复核 16 个代表路由 × 3 个宽度，共 48 个状态：无横向溢出、每页一个 H1、无已加载失败图片；client:load 组件完成加载。见 [实测指标](after/responsive-metrics.json)。
- 质量页设备锚点实测距视口顶部约 100px，未被 76px 页头遮住；AI 检测人物图片数量为 0。
- 首页三张精选卡片在 1440px 下宽度均为 364px。手机详情完整轮廓显示，非通过裁切放大。
- 现有测试使用虚构本地 QA 内容，只生成草稿；没有点击发送邮件，不验证邮件到达。
- catalog.json SHA256 保持 eb9b272d9fd4e9c9bf9eda78012d2dd37ab22337301a88d2e7b19f2505f48cff，原始资料未改。

## 关键前后截图

| 页面 | 修改前 | 修改后 |
| --- | --- | --- |
| 首页精选 | [before](before/01b-home-parts.png) | [等宽精选](after/home-parts-1440.png)、[真实证据](after/home-evidence-1440.png) |
| 产品目录 | [before](before/03a-products.png) | [1440](after/products-1440.png)、[390](after/products-390.png) |
| 产品详情 | [手机 before](before/11d-mobile-product.png) | [390](after/product-390.png)、[768](after/product-768.png)、[1440](after/product-1440.png) |
| Quality | [before](before/05b-quality-evidence.png) | [真实设备](after/quality-equipment-1440.png)、[手机](after/quality-390.png) |
| About | [before](before/07a-about.png) | [首屏](after/about-1440.png)、[精选团队](after/about-people-1440.png) |
| 询盘 | [before](before/10a-quote.png) | [1440](after/quote-1440.png)、[768](after/quote-768.png)、[390](after/quote-390.png) |

修改前后的截图不一定是相同滚动位置，按所标模块对照。before/source 是本轮修改前的源码快照；automated 保存现有回归测试的完整页面截图，after 为浏览器人工复核截图。内置浏览器截图传输可能使文字显得较软，不能据此判定原始图片分辨率。

## 仍缺少的真实证据

仍需公司提供可公开的检验报告样例、校准有效期/记录、ISO 证书扫描件与编号/范围，以及可披露的实际发货与出口项目证明。已确认的 ISO 9001、1 件起订、图纸和订单确认后 7–14 个工作日（含表面处理、不含运输）保持不变。±0.01 mm 仍只用于特定特征的条件性工程参考，没有恢复 ±0.005 mm 承诺。

本轮没有用生成图弥补这些事实证据。撤下的是上述展示模块，原始照片和旧素材均保留，可以恢复。
