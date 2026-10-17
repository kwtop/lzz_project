# 本轮原始取证索引

日期：2026-10-10。真实源码根：D:\lzz\lzz\_react。D:\lzz 根为工作区；D:\lzz\lzz_react 无实际项目内容。定向确认根级/项目级指令及配置；没有发现项目 .codegraph，也未读取历史 audit/reports、memory 或独立设计比较。AGENTS 遵循本轮用户提供的 canonical 内容。

本轮适用 Skill：oil-ui-b2b（content-and-trust、cross-border-inquiry、visual-review）与 seo-audit；仅用于当前买家路径和SEO取证，没有执行设计重构。source/ 为全新上下文助手对原始文书和现行源码的12项核对，不当作公开网站答案。technical/ 为本轮当前源码/构建静态证据；render/ 为实际主站浏览记录。

**浏览范围。** 42不同路径；39 Desktop路径、30 Mobile路径，共78个带正文与元数据的页面状态记录。桌面1920×911，移动390×844。QA使用自己创建的浏览器标签，没有操作用户标签；Chrome取证超时后另建Codex IAB QA标签继续，恢复临时viewport覆盖，没有停止任何服务器。

- 五核心系列及另外五分类均Desktop+Mobile：cnc-milling-service、cnc-turning-service、5-axis-cnc-machining、plastic-machined-parts、casting-machining、stainless-steel-cnc-parts、copper-brass-cnc-parts、aluminum-cnc-parts、prototype-machining、low-volume-production。全部位于 /capabilities/ 下。
- 产品Desktop10页：不锈钢车削、machined impellers、多孔圆形铣削件、铸件结构壳体、复杂塑料几何、铜/黄铜车削、billet engine cover、intake manifold、pilot-batch housings & mating parts、mixed-material pilot-run components。Mobile5页：不锈钢、impeller、铸件、塑料、engine cover；包含普通、参考图库和特殊cover模板。
- Desktop：首页/产品目录/能力索引/About/Factory/Quality/Contact/Quote；案例索引及29-inch housing、multi-face five-axis、PTFE/POM/PE/acrylic三个详情；资源索引与RFQ、HowWeWork、FAQ、processselection、material/finish、production/shipping。
- Mobile：上述首页/目录/能力索引/About/Factory/Quality/Contact/Quote；29-inch案例、RFQ/FAQ/material/finish/shipping；另有Privacy和CompanyNews索引。没有逐条打开所有新闻详情，也没有逐张视觉审查35产品。

文件 [render/coverage-index.json](D:/lzz/lzz/_react/audit/launch-audit-20261010-fresh/render/coverage-index.json) 列每份记录的实际URL、viewport、scrollWidth、标题和文件名；各页面 .json 保存main.innerText、H1/H2/H3、main内链、description/canonical/robots/JSON-LD。78条DOM记录未见文档宽度溢出；不据此宣称所有设备均通过。截图文件显示当时页面视区；部分页面另保存AX文本。浏览截图不用于评价图片生成/真实性/质量。

**四条买家旅程。**

|旅程|实际动作和结果|原始记录|
|---|---|---|
|首页找产品|打开CustomParts→Browse目录；目录自述made-to-order；按316L搜索得到3结果，点Stainlesssteelturnedparts|home-desktop、products-desktop、products-search-316l、product-stainless-desktop；移动目录叠加turning+stainless筛选，products-mobile-combined-filters|
|搜索直达产品|模拟直接落到产品详情（本地深链）；能看到独立标题、材料/工艺、Keyreview、drawingreview、相关例项/能力与询价。不是Google实际SERP测试|10份product-*-desktop.json；全35主体/内链另外由built-html.json核对|
|验证供应商|About→Factory→Quality/资料；主体/地址/成立时间/参考产能有自述，质量文件规划与ISO索取清单可见；公开实测记录及当前ISO原件不能从站内完成核验|about/factory/quality/contact-desktop 与相应mobile-production；quality-mobile-blank-format|
|发起具体RFQ（不发送）|从产品Requestaquote点击带reference/source入Quote，填LaunchQA、qa@example.invalid、20件/316L/RevB/配合/钝化/尺寸报告要求，Prepareemaildraft；草稿recipient、subject、referenceID、正式sourceURL、正文完整|quote-product-context、quote-draft-prepared.json；quote-mobile-product-context.json。实际发送按钮和WhatsApp未点|

**询价功能的独立证据。**

- `mobile-product-cta-positions.json`：生产版390×844产品页顶部RequestaQuote的href为/quote/，top13.67、44px高；首个带product/source的产品CTA top1553.54、48px高；后续RFQ top2935.46。点击顶部后的 `quote-mobile-header-no-context` 确认无Inquiryreference；从产品按钮点击的 `quote-mobile-product-context` 确认来源正常。不是通过手写query伪造来源。
- `quote-mobile-empty-validation`：空必填字段明确提示；`quote-mobile-invalid-email`：错误邮箱提示且保留输入；`quote-production-mobile-prepared`：生产移动版prepared—notsent、收件人、主题和webmail步骤。
- `quote-production-mobile-copy`：点击Copydraft后可见Copied。未读回外部剪贴板，不声称任何外部软件粘贴完成；Save下载未确认。
- quote-draft-prepared.json保存了准备后的真实DOM与来源，但同名.jpg捕获了前一表单帧，**该截图不作为准备成功证据**。以JSON及生产移动版copy截图为证。截图帧和DOM记录用途分开，未把采集时序认作网页故障。
- 一次Chrome Copy/Save联合采集超时造成QA标签重建；网站随后Copy提示已验证，不能把工具超时认作网站下载失败。没有实际发信、上传图纸或WhatsApp发送，没有真实邮件/inbox证据。

![生产移动版草稿与Copied状态](D:/lzz/lzz/_react/audit/launch-audit-20261010-fresh/render/quote-production-mobile-copy.jpg)

**生产HTML与命令。** technical/build-checks.txt 与 probe-output.txt 记录本轮 `npm run check`、生产build、SEO测试和静态验证的原始命令/结果；没有重复构建或与共享dist竞态。98HTML与81sitemap计数是生成文件统计，87routes是构建输出口径，不能互相替代。

- [built-html.json](D:/lzz/lzz/_react/audit/launch-audit-20261010-fresh/technical/built-html.json)：98份HTML的title/description/H1/canonical/robots/schema/main/定义字段/表格/内链/表单抽取。
- [html-summary.json](D:/lzz/lzz/_react/audit/launch-audit-20261010-fresh/technical/html-summary.json)：81可索引、35产品、10分类；标题/description/H1/canonical/JSON-LD基础检查。
- [local-http-responses.json](D:/lzz/lzz/_react/audit/launch-audit-20261010-fresh/technical/local-http-responses.json)：4326首页、目录、塑料分类与详情、Quality、Quote、robots、sitemap均200且正文与本轮dist逐字一致；不存在路径404。
- 本轮独立SEO语义复核：目录noscript35链接，无静态孤立产品；19Product+16Service，无offers/rating虚构。预览/演示9页noindex，redirect存根7页及404排除。没有读取旧SEO报告。
- [source-baseline.json](D:/lzz/lzz/_react/audit/launch-audit-20261010-fresh/source-baseline.json)：本轮1886源/公共文件哈希，结束时的0业务改动比较由父Agent最终复核；本评审只写新报告与证据输出。

**明确未验证。** 正式域部署、HTTPS/CDN、托管301和响应头、Google真实抓取/索引/排名、证书外部验真、真实接单/邮件收件、Save下载、外部剪贴板读回、真实移动OS键盘与小于390px、CWV/现场性能。技术校验为本地证据；采购答复只取公开主站，资料可追溯不等于第三方验真。
