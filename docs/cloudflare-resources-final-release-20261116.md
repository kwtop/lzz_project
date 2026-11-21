# Resources 20 篇文章正式发布与验收

已发布到 https://www.lzz-cnc.com ，并直接抓取正式域名核验。

- 发布版本：`e94c9bad-941d-49f0-ba9e-2de0c18d8840`；上一生产版本：`1c3312d8-ce1d-4d7b-8785-7a74aa393116`。
- 范围：ordering 6 篇、technical-guides 14 篇；合计 20 篇。
- 发布包来自上一生产版本，仅替换 20 个文章 HTML；其余 4055 个文件保持原样。全文及开头与最终审稿快照一致。
- 正式站全部 96 个 canonical 页面 HTTP 200，正文、标题、描述、canonical、可索引状态及 Article 数据与候选包一致。
- 20 篇每篇 16 个核心长尾词，共 320 个正文位置在正式站核对通过；检查限定在对应章节的段落、列表和表格，未用导航、标题或元数据代替正文覆盖。
- 135 个样式、脚本、封面及字体资源 HTTP 200，文件哈希与发布包一致。
- sitemap 含 96 个 URL；本次 20 篇 lastmod 和 Article.dateModified 均为真实修订日 2026-11-16。由于同一天前次发布已写入该日期，本次 sitemap 字节未变，随包保留并核对线上一致。
- robots.txt、sitemap.xml、llms.txt 均 HTTP 200，哈希与发布包一致。
- Cloudflare 生产/预览配置与域名保持一致；生产 D1/R2 绑定、Access 模式、analytics detailed 保持原配置，api/config 返回 connected=true、local=false；匿名后台入口继续跳转现有 Access。
- 裸域名向 www 域名的 301 保留路径和查询参数；未知路径及 preview 路径保持 404。

## 发布前验证依据

最终审稿记录 `D:/lzz/项目记录/资源文章终审-20261116/validation-summary.json`：构建通过；站点引用与 SEO 检查通过；20 篇在 1440px 和 390px 两种视口共 40 个页面视图无 page error，640 个核心词显示检查通过。该记录为发布前检查；本轮发布后另行执行上述正式域名抓取及资源核验。

## 逐篇结果

| 文章 | 正式链接 | 状态 | 核心长尾词 |
|---|---|---|---|
| What determines the cost of a CNC machined part? | [查看文章](https://www.lzz-cnc.com/resources/ordering/cnc-machining-cost-factors/) | HTTP 200，全文及元数据一致 | 16/16 |
| Prepare a CNC machining RFQ | [查看文章](https://www.lzz-cnc.com/resources/ordering/rfq-checklist/) | HTTP 200，全文及元数据一致 | 16/16 |
| How to compare CNC machining quotations | [查看文章](https://www.lzz-cnc.com/resources/ordering/compare-cnc-machining-quotations/) | HTTP 200，全文及元数据一致 | 16/16 |
| What does prototype approval actually release? | [查看文章](https://www.lzz-cnc.com/resources/ordering/machined-prototype-approval-checklist/) | HTTP 200，全文及元数据一致 | 16/16 |
| Moving from a CNC prototype to a small batch | [查看文章](https://www.lzz-cnc.com/resources/ordering/prototype-vs-small-batch-cnc/) | HTTP 200，全文及元数据一致 | 16/16 |
| Packaging and shipping CNC machined parts | [查看文章](https://www.lzz-cnc.com/resources/ordering/custom-cnc-parts-shipping-checklist/) | HTTP 200，全文及元数据一致 | 16/16 |
| Turn the working interfaces into a CNC drawing | [查看文章](https://www.lzz-cnc.com/resources/technical-guides/critical-features-cnc-drawing/) | HTTP 200，全文及元数据一致 | 16/16 |
| 6061 vs 7075 aluminum for CNC parts | [查看文章](https://www.lzz-cnc.com/resources/technical-guides/6061-vs-7075-cnc-aluminum/) | HTTP 200，全文及元数据一致 | 16/16 |
| Materials and finishes for CNC machined parts | [查看文章](https://www.lzz-cnc.com/resources/technical-guides/material-and-finish-checklist/) | HTTP 200，全文及元数据一致 | 16/16 |
| Which machining route suits your part? | [查看文章](https://www.lzz-cnc.com/resources/technical-guides/cnc-process-selection/) | HTTP 200，全文及元数据一致 | 16/16 |
| Designing aluminum enclosures for CNC machining | [查看文章](https://www.lzz-cnc.com/resources/technical-guides/designing-aluminum-enclosures-for-cnc-machining/) | HTTP 200，全文及元数据一致 | 16/16 |
| Bolt Circle Diameter and Hole Position on CNC Parts | [查看文章](https://www.lzz-cnc.com/resources/technical-guides/datums-and-hole-position-on-circular-machined-parts/) | HTTP 200，全文及元数据一致 | 16/16 |
| Fits and runout on turned shafts and sleeves | [查看文章](https://www.lzz-cnc.com/resources/technical-guides/how-to-specify-fits-and-runout-on-turned-parts/) | HTTP 200，全文及元数据一致 | 16/16 |
| Threads and seals for custom machined fittings | [查看文章](https://www.lzz-cnc.com/resources/technical-guides/choosing-thread-and-seal-requirements-for-machined-fittings/) | HTTP 200，全文及元数据一致 | 16/16 |
| Can the casting produce the finished housing? | [查看文章](https://www.lzz-cnc.com/resources/technical-guides/what-to-check-before-machining-a-cast-housing/) | HTTP 200，全文及元数据一致 | 16/16 |
| Why did the plastic part measure differently on arrival? | [查看文章](https://www.lzz-cnc.com/resources/technical-guides/why-machined-plastic-parts-need-defined-measurement-conditions/) | HTTP 200，全文及元数据一致 | 16/16 |
| An impeller model that machining and inspection can both use | [查看文章](https://www.lzz-cnc.com/resources/technical-guides/preparing-an-impeller-model-for-5-axis-machining/) | HTTP 200，全文及元数据一致 | 16/16 |
| Which aluminum features need masking before anodizing? | [查看文章](https://www.lzz-cnc.com/resources/technical-guides/which-aluminum-features-need-masking-before-anodizing/) | HTTP 200，全文及元数据一致 | 16/16 |
| Specifying a billet intake manifold for machining | [查看文章](https://www.lzz-cnc.com/resources/technical-guides/specifying-a-billet-intake-manifold-for-machining/) | HTTP 200，全文及元数据一致 | 16/16 |
| Custom Indexing Plungers: Fit, Stroke and Spring Force | [查看文章](https://www.lzz-cnc.com/resources/technical-guides/what-matters-when-ordering-a-custom-indexing-plunger/) | HTTP 200，全文及元数据一致 | 16/16 |

## 核验文件

发布目录保留 manifest.json、deployment.log、project-before-redacted.json、project-after-redacted.json、public-http.json、public-verification.json、live-keyword-verification.json、assets-and-access.json、release-status.json、candidate 和 source-files。

本次未执行数据库迁移、DNS 或邮件设置变更、GitHub 推送、GSC 提交或真实客户询盘提交。发布和页面可访问不等于已收录或已提升排名；本次未声称新增词的搜索量、趋势或 AI 引用效果得到验证。
