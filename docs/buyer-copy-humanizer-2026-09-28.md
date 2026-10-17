# 面向采购客户的英文文案润色

日期：2026-09-28。状态：本地完成，未部署。

## 原则

使用 humanizer，先改写，再核对语义、节奏及标题与正文的关系。采用专业采购沟通语气，不改成学术或刻意口语风格。保留已经确认的白底图文布局。

本轮覆盖主要页面模板与采购指南的重点文案，并非逐字重写原始目录或历史文章。保留专业参数、原始资料、URL、导航分类及表单逻辑。

## 主要变化

| 位置 | 原表达 | 新表达及目的 |
| --- | --- | --- |
| 首页定位 | Your parts / Machined to order | CNC parts / Made to your drawing，明确提供什么、按什么生产 |
| 首页零件区 | Curves, bores and threads | Custom machined part examples，直接标明内容 |
| 产品页询价 | Discuss this part | Request a quote，明确下一步 |
| 产品规格区 | 重复描述照片不能证明参数 | 区分照片中的结构参考与客户可选材料，保留必要限制 |
| 工艺页 | Engineering fit | Part suitability，便于采购理解 |
| 质量页 | equipment presence, not calibration evidence | 明确照片是 LZZ 的 CMM，并提示供应商审核需另索校准记录 |
| 工艺案例 | Evidence & scope | About these photographs，说明来源及不能据此推断的内容 |
| 采购指南 | 抽象开场、长串并列、重复结尾 | 用轴、壳体、图纸确认和运输安排等具体任务解释 |
| 询价页 | 简略流程说明 | 明确准备草稿、检查内容、邮箱附图并发送，不暗示自动发送 |

## 修改文件

- `src/components/HomeEditorial.astro`
- `src/components/EngineeringScope.astro`
- `src/layouts/Layout.astro`
- `src/pages/products/index.astro`
- `src/pages/products/[slug].astro`
- `src/pages/capabilities/[slug].astro`
- `src/pages/quality.astro`
- `src/pages/about.astro`
- `src/pages/factory.astro`
- `src/pages/quote.astro`
- `src/pages/cases/index.astro`
- `src/pages/cases/[slug].astro`
- `src/pages/insights/index.astro`
- `src/data/knowledgeCenter.ts`
- `src/data/resources.ts`
- `src/data/productSummaries.ts`

## 保留的业务与证据边界

- 1 件起订。
- 图纸与订单确认后 7 至 14 个工作日，含表面处理，运输时间另计。
- 原有 ISO 9001 声明保留；供应商审核仍须索取证书和适用范围。
- ±0.01 mm 仅作为特定特征经评审后的工程参考，不是通用保证。
- 不新增资质、客户身份、评价、检验结果或校准证明。
- 原照片、AI 插图标识和来源记录保留。产品材料选项不等于照片中零件的已验证规格。
- 邮件草稿流程未改变，没有发送邮件。

## 验证

- `npm run check`：144 文件，0 errors / warnings / hints。
- `npm run build`：75 页面成功构建。
- `npm run test:seo`：75 HTML、73 sitemap URL、86 redirect rules 通过；未测试线上主机行为。
- `node docs/content-upgrade-2026-09-28/verify-content.mjs`：75 页面、4,766 处链接和图片引用，0 failures。
- 浏览器：390px 首页、产品详情、询价页截图检查；首页与产品详情无横向溢出。1440px 质量页截图及宽度检查通过。
- 本轮未重跑完整交互回归；没有修改表单、筛选或导航逻辑。

## 后续维护

新增内容优先回答：零件能否加工、图纸需补什么、报价包含什么、如何验收及何时交货。保留真实技术差异，避免把所有产品描述写成相同的营销句式。仍缺的证书、校准及订单实测记录应由公司提供，不能靠文案润色补齐。
