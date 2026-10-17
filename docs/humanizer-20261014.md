# 全站文案复核：2026-10-14

本次按 Humanizer 技能复核本地英文站的 82 个正式页面，并检查 404 页面、导航、页脚、图片说明、图片替代文本、询价表单提示和下载清单。完成 112 项定向文本修改，涉及 24 个源文件；构建结果中 46 个页面的正文、标题、摘要或图片替代文本发生变化，另外 36 个正式页面保留。

## 编辑方向

面向询价和供应商评估中的工程、采购人员，保留必要的加工术语。将抽象名词串和密集指令改成明确说明：客户需要提供什么、LZZ 需要确认什么，以及这些信息如何影响报价或验收。没有为了增加口语感而添加客户故事、人员引语、业绩或保证。

- 指南：解释 drawing revision、检查方法、抽样和交付记录的用途，减少模板式开头和结尾。
- 产品与能力页：修正重复说明、搭配不当和双句号，保留零件特征、材料和检验条件。
- 公司新闻：直接叙述照片能够支持的活动，减少反复介绍“图库记录了什么”的写法。
- 界面文字：明确询价联系方式提示；指南入口使用 Read the guide。没有改动表单校验逻辑或发送行为。

## 修改示例

| 位置 | 原文 | 改后 |
| --- | --- | --- |
| 工艺指南标题 | Accuracy belongs to the feature | Tolerances for critical features |
| RFQ 标签 | Controlled files | Drawing files and revision |
| RFQ 文件冲突说明 | Identify the controlling document if files disagree. | If the files disagree, tell us which takes precedence. |
| 订单流程标签 | Quoted scope | What the quotation includes |
| 首件检验 | Agree any customer approval hold point in advance. | If production must wait for your approval, agree that stage in advance. |
| 五月团建 | Photographs from the May 2025 team outing show colleagues sharing an outdoor meal beneath a canopy and posing together along lantern-lit streets in the evening. | During the May 2025 outing, colleagues shared an outdoor meal beneath a canopy. In the evening, the team posed for photographs along lantern-lit streets. |

## 事实与功能边界

逐条对照修改前文案，保留了 1 件起订、图纸和订单确认后生产 7 至 14 个工作日、包含表面处理、运输另计等条件。材料牌号、尺寸、公差适用条件、公司日期和证书表述没有新增承诺。DDP 仍仅在报价包含时适用。

询价页面仍只生成邮件草稿，由用户在邮件应用中添加附件并发送。图片来源标识、原始照片、AI 示意图说明均保留。CSS、页面模块结构、链接目标和锚点未改变。本次没有部署。

## 验证

- `npm run build`：通过，Astro 生成 92 个路由，随后完成 SEO 输出处理。
- `npm run check`：0 errors、0 warnings、5 项原有 unused hints。
- `npm run test:seo`：通过，105 HTML、82 sitemap URLs、93 redirects、91 raw URLs covered。此项仅验证本地产物。
- 修改前后对照：82 页均只有一个主 H1，链接目标、ID 和图片 src 无差异。
- 浏览器：46 个改稿页面在 390 × 844 下无横向溢出；桌面抽查 RFQ、质量、订单流程、材料指南、节气门产品、铣削能力和五月新闻，未发现横向溢出。RFQ 和新闻首屏已目视核对。
- 隐私页、联系方式、工厂页、未需修改的产品文案和下载清单经阅读后保留。历史设计演示页不属于正式页面编辑范围，构建时仍会生成。

## 文件与复查

- 修改前源文件备份：`D:/lzz/_backup/humanizer-20261014/src/`
- 修改清单：`D:/lzz/_qa/humanizer-20261014/edits.json`
- 82 页修改前后文本：同目录 `before.json`、`after.json`
- 页面影响与结构对照：同目录 `comparison.json`
- 浏览器结果：同目录 `browser-mobile.json`、`browser-desktop.json`
- 截图：同目录 `rfq-desktop.jpg`、`rfq-mobile.jpg`

保留 `scripts/audit-humanizer.mjs` 以便从构建产物重新提取文本。不要将语言模式扫描结果解释为作者身份或 AI 检测结论；本次依据读者需求和上下文进行编辑判断。
