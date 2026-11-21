# Resources 去重润色正式发布与验收

已完成用户授权的重复和生硬表达调整，并发布到 https://www.lzz-cnc.com 。本轮审阅范围仍为 ordering 6 篇与 technical-guides 14 篇。

## 最终结果

- 17 篇文章共 26 处调整；车削配合、铸件和叶轮三篇保留原审稿。四处明显的相邻重复已合并，RFQ 动作主体、盲螺纹深度及逐篇记录中的名词化、机械句式和重复提醒已调整。
- 接头指南在主体加工段新增 CNC turning 内链，在处理后螺纹段新增材料与处理指南内链；均融入相关段落，没有另加链接条。
- 全部 20 篇各保留 16 个核心长尾词，共 320 个对应正文位置，原搜索意图定义、标题、描述、URL、发布日期与作者不变。原有内链和来源链接保留。
- 技术表格、算例数值、代码/公式块、图注、示意图、原下载和询价行为保留。没有新增加工能力、性能或测试承诺。

## 本地验证

- `npm run check`：0 errors、0 warnings、9 hints；`npm run build`：157 个静态页面构建通过。
- `npm run test:site`：226 HTML、9921 个本地引用、695 个片段引用通过。
- `npm run test:seo`：96 个 sitemap URL、188 条重定向规则通过；20 篇 on-page 校验无错误。
- 1440px 和 390px 两种视口共 40 个页面视图：无页面错误、正文/表格/标题溢出或图片加载问题；640 次可见核心词核对通过。
- 抽查报价页手机截图与接头页桌面截图，阅读层级和新内链正常。

## 正式站验证

- 当前生产版本：`99f1c1e6-9809-4fe9-b0b6-c10c650f4be5`；上一生产版本：`e94c9bad-941d-49f0-ba9e-2de0c18d8840`。
- 冻结上一生产包后，仅替换 17 个文章 HTML，保留其余 4058 个文件；原 Worker 源、样式、脚本和图片保持。
- 直接抓取正式域名的 96 个 canonical 页面，全部 HTTP 200；全文、标题、描述、canonical、可索引声明及 Article 数据与候选包一致。
- 逐条确认 26 处旧表达已移除、新文字已生效；线上 320 处核心词均存在。
- 437 个 main 区域站内链接位置（含目录和面包屑）与候选包一致，全部原链接按原顺序保留。57 个不同站内目标、148 处片段锚点均通过，包含两个新增接头内链与四个下载。
- 135 个图片、字体、脚本和样式资源 HTTP 200，哈希与候选包一致；静态资源缓存检查通过。
- sitemap.xml 含 96 个 URL；20 篇最后实质修订日期均为真实日期 2026-11-16。因同日先前版本已记录该日期，本次 sitemap 字节未变化，已随生产包保留并核对线上一致。修改文章的本地日期证据已指向本轮编辑记录。
- robots.txt、sitemap.xml、llms.txt 全部 HTTP 200 且哈希一致。
- Cloudflare 生产/预览环境变量和 D1/R2 绑定、域名配置保持；api/config 确认生产连接、Access 模式与详细分析模式。匿名后台路径继续受现有 Access 保护。
- 裸域到 www 的重定向保留路径与查询参数；未知路径和 preview 路径保持 404。

## 逐篇记录

| 文章 | 本轮调整 | 核心长尾词 | 正式站 |
|---|---:|---|---|
| [What determines the cost of a CNC machined part?](https://www.lzz-cnc.com/resources/ordering/cnc-machining-cost-factors/) | 4 | 16/16 | HTTP 200，全文一致 |
| [Prepare a CNC machining RFQ](https://www.lzz-cnc.com/resources/ordering/rfq-checklist/) | 1 | 16/16 | HTTP 200，全文一致 |
| [How to compare CNC machining quotations](https://www.lzz-cnc.com/resources/ordering/compare-cnc-machining-quotations/) | 1 | 16/16 | HTTP 200，全文一致 |
| [What does prototype approval actually release?](https://www.lzz-cnc.com/resources/ordering/machined-prototype-approval-checklist/) | 2 | 16/16 | HTTP 200，全文一致 |
| [Moving from a CNC prototype to a small batch](https://www.lzz-cnc.com/resources/ordering/prototype-vs-small-batch-cnc/) | 1 | 16/16 | HTTP 200，全文一致 |
| [Packaging and shipping CNC machined parts](https://www.lzz-cnc.com/resources/ordering/custom-cnc-parts-shipping-checklist/) | 2 | 16/16 | HTTP 200，全文一致 |
| [Turn the working interfaces into a CNC drawing](https://www.lzz-cnc.com/resources/technical-guides/critical-features-cnc-drawing/) | 2 | 16/16 | HTTP 200，全文一致 |
| [6061 vs 7075 aluminum for CNC parts](https://www.lzz-cnc.com/resources/technical-guides/6061-vs-7075-cnc-aluminum/) | 1 | 16/16 | HTTP 200，全文一致 |
| [Materials and finishes for CNC machined parts](https://www.lzz-cnc.com/resources/technical-guides/material-and-finish-checklist/) | 1 | 16/16 | HTTP 200，全文一致 |
| [Which machining route suits your part?](https://www.lzz-cnc.com/resources/technical-guides/cnc-process-selection/) | 1 | 16/16 | HTTP 200，全文一致 |
| [Designing aluminum enclosures for CNC machining](https://www.lzz-cnc.com/resources/technical-guides/designing-aluminum-enclosures-for-cnc-machining/) | 1 | 16/16 | HTTP 200，全文一致 |
| [Bolt Circle Diameter and Hole Position on CNC Parts](https://www.lzz-cnc.com/resources/technical-guides/datums-and-hole-position-on-circular-machined-parts/) | 1 | 16/16 | HTTP 200，全文一致 |
| [Fits and runout on turned shafts and sleeves](https://www.lzz-cnc.com/resources/technical-guides/how-to-specify-fits-and-runout-on-turned-parts/) | 0 | 16/16 | HTTP 200，全文一致 |
| [Threads and seals for custom machined fittings](https://www.lzz-cnc.com/resources/technical-guides/choosing-thread-and-seal-requirements-for-machined-fittings/) | 4 | 16/16 | HTTP 200，全文一致 |
| [Can the casting produce the finished housing?](https://www.lzz-cnc.com/resources/technical-guides/what-to-check-before-machining-a-cast-housing/) | 0 | 16/16 | HTTP 200，全文一致 |
| [Why did the plastic part measure differently on arrival?](https://www.lzz-cnc.com/resources/technical-guides/why-machined-plastic-parts-need-defined-measurement-conditions/) | 1 | 16/16 | HTTP 200，全文一致 |
| [An impeller model that machining and inspection can both use](https://www.lzz-cnc.com/resources/technical-guides/preparing-an-impeller-model-for-5-axis-machining/) | 0 | 16/16 | HTTP 200，全文一致 |
| [Which aluminum features need masking before anodizing?](https://www.lzz-cnc.com/resources/technical-guides/which-aluminum-features-need-masking-before-anodizing/) | 1 | 16/16 | HTTP 200，全文一致 |
| [Specifying a billet intake manifold for machining](https://www.lzz-cnc.com/resources/technical-guides/specifying-a-billet-intake-manifold-for-machining/) | 1 | 16/16 | HTTP 200，全文一致 |
| [Custom Indexing Plungers: Fit, Stroke and Spring Force](https://www.lzz-cnc.com/resources/technical-guides/what-matters-when-ordering-a-custom-indexing-plunger/) | 1 | 16/16 | HTTP 200，全文一致 |

## 证据及执行范围

编辑依据为上一轮 `D:/lzz/项目记录/资源文章线上复查-20261116/线上复查报告.md`。本目录保留 edits.json、before-resourceEditorial.json、source-validation.json、render-validation.json、keyword-render-validation.json、onpage-validation.json、manifest.json、deployment.log、脱敏配置快照、public-http.json、public-verification.json、live-edit-verification.json、live-keyword-verification.json、live-link-verification.json、assets-and-access.json、release-status.json 和逐篇发布验收.csv。

本次未执行数据库迁移、DNS/邮件修改、GitHub 推送、GSC 提交或真实外部询盘发送。内容保留及线上生效已验证；本轮未重新查询搜索量、趋势、排名或 AI 引用效果，没有赋予 SEO/GEO 分数或写作来源概率。
