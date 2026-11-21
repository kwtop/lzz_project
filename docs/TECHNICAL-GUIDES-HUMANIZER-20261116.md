# Technical guides 语言复核

2026-11-16。本轮完整读取并复核 Technical guides 栏目实际列出的 14 篇英文文章，直接修改 `src/data/resourceEditorial.json`。市场仍为全球英语采购需求，读者为海外采购商和产品工程师。

## 编辑判断

原稿的技术内容和搜索分工继续有效，明显的营销套话不多。较集中的问题是“useful review / useful package”式开头、介绍链接价值的空句、段尾重述、抽象的记录/放行表达、连续使用问句标题，以及前轮扩写后相邻段落重复说明同一检验要求。

本轮按 Humanizer 的全文阅读、改写、复读流程编辑，未以词表命中数判断作者身份或计算“AI率”。适用条件、假设、批准责任和检验范围具有实际用途，不为语气肯定而删除。

处理包括：

- 将 `Make a test result interpretable` 改成 `Leak-test conditions to record`，让标题直接说明采购者要核对什么。
- 删除 `This gives an engineer something specific to evaluate beyond the machine's axis count`，保留前面的固定方向与同时运动要求。
- 把重复的材料—处理—尺寸记录说明合并到具体的阳极氧化壳体孔例子中。
- 合并塑料件调湿/复测、叶轮根部可测性、歧管适配来源及定位销弹簧力的重复解释。
- 保留实际采购问题；部分孔位和定位销章节改成直接说明主题的标题，不把所有长尾问题都写成问句。

## 保护范围

14 篇的 URL、H1、SEO Title、description、目录标题/摘要、核心问题和搜索意图不变。原 280 个研究词位置和新增 125 个候选词继续由原章节承接；原来实际出现的 17 个词组位置全部保留。这一数字只描述精确词组，不是语义覆盖分数，也不代表其余词必须机械逐字插入。

全部章节 ID、原 HTML 内锚点、独立链接目标、技术表格、MathML、inline code 和 SVG 保留。数值和示例的数字标记未丢失，EX-MOUNT-01 教学结果及各假设算例保持不变。只移除了已经在同篇保留目标的重复来源介绍，没有移除一手资料或相关产品入口。

原署名、原发布日期和实际修订日期沿用。因为同日已发生实质内容修订，`dateModified` 和 14 个页面的 `lastmod` 仍为 2026-11-16；未以构建时间制造新日期。没有增加排名、搜索量、客户经历、测试结果或工厂能力声明。

## 验证与交付

完整改稿、逐篇操作记录、关键词保留表、阅读截图和实际检查结果位于 `D:/lzz/项目记录/技术指南语气复核-20261116/`。核验结果见该目录 `复核说明.md`、`verification-results.json` 及 `render-validation.json`。

已通过 `npm run check`、`npm run build`、`npm run test:site`、`npm run test:seo` 和 `npm run test:teaching`。14 篇分别在 1440px 与 390px 做实际渲染检查，共 28 次，0 项异常、无页面错误。全部手机阅读视图及孔位、叶轮、材料/表面处理、定位销的桌面视图已人工查看。

本轮交付本地预览，未发布到 Cloudflare 或推送 GitHub。SEO/GEO 的内容结构、可访问内链、一手来源和既有元数据得到保留；本地编辑验收不等于排名或 AI 引用已经提升。
