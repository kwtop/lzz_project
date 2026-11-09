# llms.txt、真实lastmod与精修文章正式发布

发布日期：2026-11-08（Asia/Shanghai）。交付复核完成：2026-11-09。正式站点：https://www.lzz-cnc.com/

## 已上线

Cloudflare Pages项目 lzz-precision，Production / main。部署ID：6606e5d9-db5a-441e-a047-7f70e25547e4；固定版本：https://6606e5d9.lzz-precision.pages.dev/ 。上一正式版 a50f2e59-1f17-4bb9-84ad-b42812dd1a82 保留，可回退。本次未推送GitHub，也未改动DNS或邮件设置。

| 内容 | 正式结果 |
|---|---|
| [llms.txt](https://www.lzz-cnc.com/llms.txt) | 200，text/plain，28180 bytes；按7组提供96个正式页面链接，含标题和简短描述 |
| [sitemap.xml](https://www.lzz-cnc.com/sitemap.xml) | 200，application/xml；96个唯一正式URL，25个有证据的lastmod，71个未知日期省略 |
| [robots.txt](https://www.lzz-cnc.com/robots.txt) | 200；原有Allow规则及正确www域名Sitemap声明保留 |
| 20篇指南 | 刚才44处自然表达修改已发布；20篇完整正文及Article资料与发布包一致 |

## 日期依据与维护

新增 src/data/pageLastModified.json 记录有证据的内容修改。25个日期来自11月8日实际完成的指南、目录、FAQ和首页资源卡片修改；不是本轮上传时间，也不是工厂活动或新闻事件发生日期。其他71页没有可靠记录，XML不输出lastmod。

有实质性内容更新时，同步更新该页面的日期、原因和证据；文章的可见更新时间及Article.dateModified应一致。构建只读取记录，不使用文件mtime、构建日期或历史事件日期作为兜底。无效日期、未来日期、非正式路由、缺少证据或文章日期不一致会使构建失败。

[Google Sitemap说明](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)要求lastmod反映可核对的实质性更新。本轮遵循这一要求，没有给全站统一刷新日期。

| 页面 | lastmod | 修改依据 |
|---|---|---|
| / | 2026-11-08 | docs/cloudflare-resources-release-2026-11-08.md |
| /resources/ | 2026-11-08 | docs/cloudflare-resources-release-2026-11-08.md |
| /resources/faq/ | 2026-11-08 | docs/cloudflare-resources-release-2026-11-08.md |
| /resources/ordering/ | 2026-11-08 | docs/cloudflare-resources-release-2026-11-08.md |
| /resources/technical-guides/ | 2026-11-08 | docs/cloudflare-resources-release-2026-11-08.md |
| /resources/ordering/cnc-machining-cost-factors/ | 2026-11-08 | docs/RESOURCE-HUMANIZER-20261108.md |
| /resources/ordering/rfq-checklist/ | 2026-11-08 | docs/RESOURCE-HUMANIZER-20261108.md |
| /resources/ordering/compare-cnc-machining-quotations/ | 2026-11-08 | docs/RESOURCE-HUMANIZER-20261108.md |
| /resources/ordering/machined-prototype-approval-checklist/ | 2026-11-08 | docs/RESOURCE-HUMANIZER-20261108.md |
| /resources/ordering/prototype-vs-small-batch-cnc/ | 2026-11-08 | docs/RESOURCE-HUMANIZER-20261108.md |
| /resources/ordering/custom-cnc-parts-shipping-checklist/ | 2026-11-08 | docs/RESOURCE-HUMANIZER-20261108.md |
| /resources/technical-guides/critical-features-cnc-drawing/ | 2026-11-08 | docs/RESOURCE-HUMANIZER-20261108.md |
| /resources/technical-guides/6061-vs-7075-cnc-aluminum/ | 2026-11-08 | docs/RESOURCE-HUMANIZER-20261108.md |
| /resources/technical-guides/material-and-finish-checklist/ | 2026-11-08 | docs/RESOURCE-HUMANIZER-20261108.md |
| /resources/technical-guides/cnc-process-selection/ | 2026-11-08 | docs/RESOURCE-HUMANIZER-20261108.md |
| /resources/technical-guides/designing-aluminum-enclosures-for-cnc-machining/ | 2026-11-08 | docs/RESOURCE-HUMANIZER-20261108.md |
| /resources/technical-guides/what-to-check-before-machining-a-cast-housing/ | 2026-11-08 | docs/RESOURCE-HUMANIZER-20261108.md |
| /resources/technical-guides/why-machined-plastic-parts-need-defined-measurement-conditions/ | 2026-11-08 | docs/RESOURCE-HUMANIZER-20261108.md |
| /resources/technical-guides/which-aluminum-features-need-masking-before-anodizing/ | 2026-11-08 | docs/RESOURCE-HUMANIZER-20261108.md |
| /resources/technical-guides/datums-and-hole-position-on-circular-machined-parts/ | 2026-11-08 | docs/RESOURCE-HUMANIZER-20261108.md |
| /resources/technical-guides/choosing-thread-and-seal-requirements-for-machined-fittings/ | 2026-11-08 | docs/RESOURCE-HUMANIZER-20261108.md |
| /resources/technical-guides/preparing-an-impeller-model-for-5-axis-machining/ | 2026-11-08 | docs/RESOURCE-HUMANIZER-20261108.md |
| /resources/technical-guides/specifying-a-billet-intake-manifold-for-machining/ | 2026-11-08 | docs/RESOURCE-HUMANIZER-20261108.md |
| /resources/technical-guides/what-matters-when-ordering-a-custom-indexing-plunger/ | 2026-11-08 | docs/RESOURCE-HUMANIZER-20261108.md |
| /resources/technical-guides/how-to-specify-fits-and-runout-on-turned-parts/ | 2026-11-08 | docs/RESOURCE-HUMANIZER-20261108.md |

## llms.txt生成

scripts/discovery-files.mjs 从实际构建HTML的标题、描述和正式路由生成文件，接入已有 scripts/build-seo.mjs。按入口、工艺材料、技术指南、RFQ采购、零件案例、公司资料及Optional分组；每个正式页面只出现一次。后台、历史预览、错误页和重定向壳不进入列表。

格式依据：[llms.txt提案](https://llmstxt.org/)。它提供网站内容导航，不新增库存、设备、产品参数、客户或检验成绩。文件随正常构建自动更新，公开地址为根路径 /llms.txt。

新增脚本：scripts/discovery-files.mjs、scripts/discovery-files.test.mjs。原脚本 build-seo.mjs、verify-seo.mjs 已接入日期和llms检查，robots抓取规则保持原样。

## 验证

- 隔离来源执行 npm run check、npm run build、npm run test:site、npm run test:seo、npm run test:inquiry，全部通过。check为363个文件、0 errors、0 warnings、6个既有提示。
- 新增4个针对性测试全部通过：未知日期省略，非法/未来/无证据日期阻断，Article日期一致，以及llms正式链接去重和后台/预览排除。
- SEO检查覆盖226个生成HTML、96个sitemap正式URL和188条重定向。工作区生成文件也已通过原SEO脚本同步，并再次通过test:seo。
- 上线HTTP核验时间 2026-11-08T15:57:31.300Z：96个正式页面均200，20篇指南正文及Article与候选一致，92个所引用资源可访问。三个抓取文件均与候选内容及哈希一致，根域301保留路径及查询参数。
- 真实Chrome查看llms.txt、Sitemap日期和已精修的RFQ正文。截图存放于本任务 shots/online-llms.png、shots/online-sitemap.png、shots/online-humanized-rfq.png。
- 技术表格33张、关键词研究登记、原URL、SEO字段、来源链接和询价参数保留。上一轮的40次1440px/390px文案检查记录仍保留；本轮未改布局和图片。

这些结果证明文件与内容已上线、可抓取及可读取，不能据此宣称已经获得新收录、排名、GEO引用或有效询盘增长。

## 发布边界及回退

发布使用独立冻结来源 release/source 和候选 release/candidate：4109个冻结输入，3847个文件，324180530 bytes。只叠加11个已核对的文案文件和本轮5个抓取/校验输入。工作区另有12个导航、首屏和样式改动，均未覆盖，也未随本次发布。

96个正式页面中，20篇文章正文变化；产品画廊与询价页只有Astro island UID变化，其余74页字节一致。后台HTML也仅UID变化。后端worker字节一致，远端项目有效配置前后相同（忽略Wrangler自动生成的下载时间注释）；线上 /api/config 仍为503 / not_configured。没有发送真实测试询盘，没有宣称已接通线上收件或邮件送达。

额外回退核验发现上一轮文案基线目录未保存源码文件。已按原SHA-256清单，从上一冻结上线来源恢复124个完全匹配的文件，恢复依据存于 baseline-restoration.json；没有用当前修改后的文件冒充旧基线。

回退可使用上一成功正式部署 a50f2e59-1f17-4bb9-84ad-b42812dd1a82。不要从工作区的本地Wrangler配置直接发布；本轮独立配置保留access/detailed模式及原兼容参数，不包含本地开发密码、占位数据库或存储绑定。

完整证据：D:/lzz/项目记录/抓取文件与指南正式发布-20261108/ 。主要文件为 release/manifest.json、frozen-source.json、candidate-verification.json、public-verification.json、upload.log及全部构建/验证日志。
