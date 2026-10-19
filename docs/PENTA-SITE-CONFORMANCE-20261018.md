# Penta 全站符合性复核与修正 · 2026-10-18

已按用户确定的 Penta 参考完成全站复核，并直接修正残留旧版布局。范围为 sitemap 中的 84 个正式页面。继续使用 LZZ 原有内容、原始业务图片和品牌蓝；未部署生产环境。

## 实际参考与范围

本轮在真实浏览器查看了 [Penta CNC milling](https://www.pentaprecision.co.uk/services/cnc-milling)、[How we work](https://www.pentaprecision.co.uk/how-we-work)、[Contact](https://www.pentaprecision.co.uk/contact) 和 [Resources](https://www.pentaprecision.co.uk/resources)。原始参考截图位于 D:/lzz/penta-site-verification-20261017/reference/。参考用于布局、比例、字体层级和阅读节奏，未复制其公司、客户、设备、评价或承诺。

| 正式页面范围 | 数量 | 完成状态 |
| --- | ---: | --- |
| 首页 | 1 | 已检查并按需修正 |
| 公司与新闻 | 10 | 已检查并按需修正 |
| 加工能力与服务 | 12 | 已检查并按需修正 |
| 工厂与质量 | 1 | 已检查并按需修正 |
| 零件总览、目录、35个详情与加工记录 | 46 | 已检查并按需修正 |
| 隐私 | 1 | 已检查并按需修正 |
| 询价 | 1 | 已检查并按需修正 |
| 资源入口、FAQ与指南 | 12 | 已检查并按需修正 |

正式页面未完成项：无。历史 noindex 设计预览与兼容别名保留原用途，不计入 84 页；不将旧预览改成正式 Penta 页面。

## 本轮发现并修正的实际问题

| 页面/组件 | 原问题 | 最终处理 |
| --- | --- | --- |
| 合作流程 | 五行三列长表偏向资料页，缺少 Penta 的连续进程 | 深蓝全幅、中轴编号、交替图文五阶段；手机按编号、图片、责任说明展开 |
| 联系 | 联系方式和询价任务分散，主次不清楚 | 深蓝联系区配白色新零件主任务，随后为现有订单、供应商文件、真实车间 |
| 新闻索引 | 横竖原图的显示重量不一致 | 等高媒体框、contain保留原图，归档桌面两列/手机单列 |
| FAQ | 分类挤在窄栏横排，正文缺少阅读层次 | 桌面纵向目录与连续白色正文；手机分类后接正文，15问保持常显 |
| 隐私 | H1贴导航，标题和正文列起点不一致 | 桌面70px起始间距，标题与正文列对齐；手机40px并单列 |
| 能力总览RFQ | 旧ID选择器把深色模块覆盖为浅蓝，白字难读 | 从组件类名解决冲突，恢复#081F30与30px圆角，手机单列 |
| 铣削/原型/工厂检验区 | CMM原图悬在小图位，旁边嵌套网格把说明挤窄 | 图文成组并加大原图；窄容器切单列，保留校准、量程和验收条件 |
| 车削 | 两张不同来源照片的图框大小不一致 | 两个等宽媒体区，保留自然比例和来源说明 |
| 正式首页与内页 | 旧入场观察器影响稳定阅读和标题绘制 | 正式Penta页面不再注册pn-in-view入场动画；控件反馈保留 |
| 询价 | H1紧贴导航 | 桌面70px/手机40px起始间距，未改表单业务逻辑 |

## 内容、业务和来源保留

- 合作流程的五个 stages 数据对象逐字对比一致：Buyer provides、LZZ confirms、Release record 及阶段跳转均保留。商业条款、变更与售后仍在流程后部。
- 联系信息和原有链接保留。没有新增公司、客户、设备或交期事实。
- 铣削/原型的检验条件移入对应图文组，未删除图纸适用范围、验收和供应商确认条件。
- QuoteForm.tsx、inquiryContext、目录数据、技术内容数据及产品数据未修改。源文件备份逐文件哈希比对见 D:/lzz/penta-site-verification-20261017/source-changes.json。
- 84页构建后的title、description、canonical与保留基线完全一致；每页一个H1，正式Penta入口标记全部存在。
- 581处本地图片引用有效；489个实际内部锚点有效。详细结果见 D:/lzz/penta-site-verification-20261017/static-preservation-check.json。

## 图片实际采用情况

本轮新增 ImageGen 调用为0：复核后可沿用上一轮已经生成、接入的六幅通用示意图，主要问题在图位比例与周边排版。没有把本轮复用说成新生成。原始工厂、检验、人员、新闻、具体零件及加工记录图片继续保留。

| 上一轮ImageGen母版 | 当前实际采用页面 | 网页资源 |
| --- | --- | --- |
| milling | /capabilities/aluminum-cnc-parts/<br>/capabilities/casting-machining/<br>/capabilities/cnc-milling-service/<br>/resources/technical-guides/<br>/resources/technical-guides/cnc-process-selection/ | public/media/penta-interiors-20261017/milling-480.webp<br>public/media/penta-interiors-20261017/milling-800.webp<br>public/media/penta-interiors-20261017/milling-1120.webp |
| turning | /capabilities/cnc-turning-service/<br>/capabilities/copper-brass-cnc-parts/<br>/capabilities/stainless-steel-cnc-parts/ | public/media/penta-interiors-20261017/turning-480.webp<br>public/media/penta-interiors-20261017/turning-800.webp<br>public/media/penta-interiors-20261017/turning-1120.webp |
| five-axis | /capabilities/<br>/capabilities/5-axis-cnc-machining/ | public/media/penta-interiors-20261017/five-axis-480.webp<br>public/media/penta-interiors-20261017/five-axis-800.webp<br>public/media/penta-interiors-20261017/five-axis-1120.webp |
| drawing-review | /about/contact/<br>/about/how-we-work/<br>/capabilities/low-volume-production/<br>/capabilities/prototype-machining/<br>/capabilities/starting-with-a-sample/<br>/resources/<br>/resources/ordering/<br>/resources/ordering/compare-cnc-machining-quotations/<br>/resources/ordering/rfq-checklist/<br>/resources/technical-guides/<br>/resources/technical-guides/cnc-process-selection/<br>/resources/technical-guides/critical-features-cnc-drawing/ | public/media/penta-interiors-20261017/drawing-review-480.webp<br>public/media/penta-interiors-20261017/drawing-review-800.webp<br>public/media/penta-interiors-20261017/drawing-review-1120.webp |
| plastic-milling | /capabilities/plastic-machined-parts/ | public/media/penta-interiors-20261017/plastic-milling-480.webp<br>public/media/penta-interiors-20261017/plastic-milling-800.webp<br>public/media/penta-interiors-20261017/plastic-milling-1120.webp |
| packing | /about/how-we-work/<br>/capabilities/low-volume-production/<br>/factory/<br>/resources/ordering/<br>/resources/ordering/custom-cnc-parts-shipping-checklist/<br>/resources/ordering/prototype-vs-small-batch-cnc/<br>/resources/ordering/rfq-checklist/ | public/media/penta-interiors-20261017/packing-480.webp<br>public/media/penta-interiors-20261017/packing-800.webp<br>public/media/penta-interiors-20261017/packing-1120.webp |

合作流程本轮增加 drawing-review、packing 通用示意图及 aluminum-housings、cmm-room、milling-enclosure-operation 原始图片；联系主任务使用已有 drawing-review。网页图注保留 illustration / original photograph 的身份。所有旧图与母版保留。生成提示词和工具来源见 design/penta-interiors-20261017/manifest.json 与 prompts.json。本轮按最终HTML核实的采用清单另存于 D:/lzz/penta-site-verification-20261017/image-reuse.json。

## 桌面与手机验收

- 1440px：逐页打开84页，保存84张最终桌面截图，查看全站类型及35个零件详情的排版与图片。
- 390px：逐页打开84页并检查DOM布局，保存36张代表页面完整手机截图，重点复看本轮所有改动与各主要模板。
- 最终检查：0横向溢出、0隐藏主标题、0绿色界面残留、0重复/缺失H1；桌面加载检查未发现空图或未完成的图片。绿色原始产品照片不视为界面配色。
- 浏览器90%缩放造成部分早期整页工具输出的页脚裁切/拼接；这些保留为主体布局索引。24张主要代表桌面图、全部36张手机图补为完整截图，具体标题疑点另用稳定局部截图确认，未把截图异常当CSS故障。
- 独立视觉复核覆盖本轮问题区：桌面流程编号、RFQ底色、正文宽度、媒体框、标题可见性；手机10类改动与最后询价页留白。所有已报问题修正后复看通过，无新增阻塞。复核只代表截图可见范围。

## 构建与功能结果

| 检查 | 结果 |
| --- | --- |
| npm run check | 0 errors、0 warnings、9既有hints |
| npm run build | 144个Astro路由构建成功，SEO后处理完成 |
| npm run test:seo | 213 HTML、84 sitemap URLs、188 redirects通过；未测试生产主机行为 |
| 手机导航 | 展开/显式关闭正常；子菜单打开及Escape关闭正常 |
| 新闻筛选 | 全部5、车间/活动2、团队3，恢复全部5 |
| 目录搜索 | impeller匹配2；刷新恢复q；无匹配0；清空恢复35条+2集合 |
| 询价入口与草稿 | 联系主动作进入表单；生成To/Subject/完整草稿；刷新恢复；返回编辑；清除测试输入通过 |
| 流程/FAQ目录 | Sample approval跳至#section-5；FAQ跳至#engineering，15问保留 |
| 浏览器错误 | 功能抽检未见error/warn日志 |

没有打开邮件发送、发送WhatsApp、上传附件或部署。询价仍是用户自行查看、附图和发送的本地草稿机制。功能记录见 D:/lzz/penta-site-verification-20261017/functional-checks.json，草稿结果截图见 review/inquiry-draft-390.jpg。

## 前后截图

以下为真实截图的页面上部对比，完整原图与手机图见后面的逐页表。没有将拼接对比图当成新页面设计稿。

| 页面 | 前后对比 |
| --- | --- |
| Company news | [实际截图对比](D:/lzz/penta-site-verification-20261017/review/compare-02-about--company-news.jpg) |
| Contact LZZ | [实际截图对比](D:/lzz/penta-site-verification-20261017/review/compare-09-about--contact.jpg) |
| From drawing review to finished parts | [实际截图对比](D:/lzz/penta-site-verification-20261017/review/compare-10-about--how-we-work.jpg) |
| CNC machining capabilities | [实际截图对比](D:/lzz/penta-site-verification-20261017/review/compare-11-capabilities.jpg) |
| CNC Milling Services | [实际截图对比](D:/lzz/penta-site-verification-20261017/review/compare-15-capabilities--cnc-milling-service.jpg) |
| CNC Turning Services | [实际截图对比](D:/lzz/penta-site-verification-20261017/review/compare-16-capabilities--cnc-turning-service.jpg) |
| CNC Prototype Machining | [实际截图对比](D:/lzz/penta-site-verification-20261017/review/compare-20-capabilities--prototype-machining.jpg) |
| CNC machining in Hangzhou. | [实际截图对比](D:/lzz/penta-site-verification-20261017/review/compare-23-factory.jpg) |
| Privacy and site information | [实际截图对比](D:/lzz/penta-site-verification-20261017/review/compare-70-privacy.jpg) |
| Prepare an RFQ email | [实际截图对比](D:/lzz/penta-site-verification-20261017/review/compare-71-quote.jpg) |
| Custom CNC machining FAQs | [实际截图对比](D:/lzz/penta-site-verification-20261017/review/compare-73-resources--faq.jpg) |

## 逐页完成清单

桌面列中“主体”表示保留的主体布局截图；“整页”表示含页脚的完整最终截图。所有84页均已在两个宽度实际打开。手机未单独保存截图的页面已完成布局检查，图片和字体沿用其经过截图验收的同类模板。

| # | 页面 | 桌面1440 | 手机390 | 完成 |
| --- | --- | --- | --- | --- |
| 0 | [We machine custom CNC components to your drawing, from prototypes to small production runs.](http://127.0.0.1:4321/) | [整页](D:/lzz/penta-site-verification-20261017/after/00-home-1440.jpg) | [截图](D:/lzz/penta-site-verification-20261017/after/00-home-390.jpg) | 完成 |
| 1 | [Custom machining in Hangzhou](http://127.0.0.1:4321/about/) | [主体](D:/lzz/penta-site-verification-20261017/after/01-about-1440.jpg) | [截图](D:/lzz/penta-site-verification-20261017/after/01-about-390.jpg) | 完成 |
| 2 | [Company news](http://127.0.0.1:4321/about/company-news/) | [整页](D:/lzz/penta-site-verification-20261017/after/02-about--company-news-1440.jpg) | [截图](D:/lzz/penta-site-verification-20261017/after/02-about--company-news-390.jpg) | 完成 |
| 3 | [An Australian customer visits the LZZ workshop](http://127.0.0.1:4321/about/company-news/australian-customer-workshop-visit-january-2025/) | [主体](D:/lzz/penta-site-verification-20261017/after/03-about--company-news--australian-customer-workshop-visit-january-2025-1440.jpg) | [截图](D:/lzz/penta-site-verification-20261017/after/03-about--company-news--australian-customer-workshop-visit-january-2025-390.jpg) | 完成 |
| 4 | [LZZ at the China-Africa West Lake Summit](http://127.0.0.1:4321/about/company-news/china-africa-west-lake-summit-2025/) | [主体](D:/lzz/penta-site-verification-20261017/after/04-about--company-news--china-africa-west-lake-summit-2025-1440.jpg) | 布局检查通过 | 完成 |
| 5 | [A rainy day out with the LZZ team](http://127.0.0.1:4321/about/company-news/lzz-team-outing-2024/) | [主体](D:/lzz/penta-site-verification-20261017/after/05-about--company-news--lzz-team-outing-2024-1440.jpg) | 布局检查通过 | 完成 |
| 6 | [LZZ team outing in May 2025](http://127.0.0.1:4321/about/company-news/may-2025-lzz-team-outing/) | [主体](D:/lzz/penta-site-verification-20261017/after/06-about--company-news--may-2025-lzz-team-outing-1440.jpg) | 布局检查通过 | 完成 |
| 7 | [A November team day outdoors](http://127.0.0.1:4321/about/company-news/november-2025-hangzhou-lizhizao-group-activity/) | [主体](D:/lzz/penta-site-verification-20261017/after/07-about--company-news--november-2025-hangzhou-lizhizao-group-activity-1440.jpg) | 布局检查通过 | 完成 |
| 8 | [LZZ Precision in Hangzhou](http://127.0.0.1:4321/about/company-profile/) | [主体](D:/lzz/penta-site-verification-20261017/after/08-about--company-profile-1440.jpg) | [截图](D:/lzz/penta-site-verification-20261017/after/08-about--company-profile-390.jpg) | 完成 |
| 9 | [Contact LZZ](http://127.0.0.1:4321/about/contact/) | [整页](D:/lzz/penta-site-verification-20261017/after/09-about--contact-1440.jpg) | [截图](D:/lzz/penta-site-verification-20261017/after/09-about--contact-390.jpg) | 完成 |
| 10 | [From drawing review to finished parts](http://127.0.0.1:4321/about/how-we-work/) | [整页](D:/lzz/penta-site-verification-20261017/after/10-about--how-we-work-1440.jpg) | [截图](D:/lzz/penta-site-verification-20261017/after/10-about--how-we-work-390.jpg) | 完成 |
| 11 | [CNC machining capabilities](http://127.0.0.1:4321/capabilities/) | [整页](D:/lzz/penta-site-verification-20261017/after/11-capabilities-1440.jpg) | [截图](D:/lzz/penta-site-verification-20261017/after/11-capabilities-390.jpg) | 完成 |
| 12 | [5-Axis CNC Machining Services](http://127.0.0.1:4321/capabilities/5-axis-cnc-machining/) | [主体](D:/lzz/penta-site-verification-20261017/after/12-capabilities--5-axis-cnc-machining-1440.jpg) | [截图](D:/lzz/penta-site-verification-20261017/after/12-capabilities--5-axis-cnc-machining-390.jpg) | 完成 |
| 13 | [Aluminum CNC Machining Services](http://127.0.0.1:4321/capabilities/aluminum-cnc-parts/) | [主体](D:/lzz/penta-site-verification-20261017/after/13-capabilities--aluminum-cnc-parts-1440.jpg) | [截图](D:/lzz/penta-site-verification-20261017/after/13-capabilities--aluminum-cnc-parts-390.jpg) | 完成 |
| 14 | [Casting Machining Services](http://127.0.0.1:4321/capabilities/casting-machining/) | [主体](D:/lzz/penta-site-verification-20261017/after/14-capabilities--casting-machining-1440.jpg) | [截图](D:/lzz/penta-site-verification-20261017/after/14-capabilities--casting-machining-390.jpg) | 完成 |
| 15 | [CNC Milling Services](http://127.0.0.1:4321/capabilities/cnc-milling-service/) | [整页](D:/lzz/penta-site-verification-20261017/after/15-capabilities--cnc-milling-service-1440.jpg) | [截图](D:/lzz/penta-site-verification-20261017/after/15-capabilities--cnc-milling-service-390.jpg) | 完成 |
| 16 | [CNC Turning Services](http://127.0.0.1:4321/capabilities/cnc-turning-service/) | [整页](D:/lzz/penta-site-verification-20261017/after/16-capabilities--cnc-turning-service-1440.jpg) | [截图](D:/lzz/penta-site-verification-20261017/after/16-capabilities--cnc-turning-service-390.jpg) | 完成 |
| 17 | [Copper & Brass CNC Machining](http://127.0.0.1:4321/capabilities/copper-brass-cnc-parts/) | [主体](D:/lzz/penta-site-verification-20261017/after/17-capabilities--copper-brass-cnc-parts-1440.jpg) | 布局检查通过 | 完成 |
| 18 | [Low-Volume CNC Production](http://127.0.0.1:4321/capabilities/low-volume-production/) | [主体](D:/lzz/penta-site-verification-20261017/after/18-capabilities--low-volume-production-1440.jpg) | [截图](D:/lzz/penta-site-verification-20261017/after/18-capabilities--low-volume-production-390.jpg) | 完成 |
| 19 | [Plastic CNC Machining Services](http://127.0.0.1:4321/capabilities/plastic-machined-parts/) | [主体](D:/lzz/penta-site-verification-20261017/after/19-capabilities--plastic-machined-parts-1440.jpg) | 布局检查通过 | 完成 |
| 20 | [CNC Prototype Machining](http://127.0.0.1:4321/capabilities/prototype-machining/) | [整页](D:/lzz/penta-site-verification-20261017/after/20-capabilities--prototype-machining-1440.jpg) | [截图](D:/lzz/penta-site-verification-20261017/after/20-capabilities--prototype-machining-390.jpg) | 完成 |
| 21 | [Stainless Steel CNC Machining](http://127.0.0.1:4321/capabilities/stainless-steel-cnc-parts/) | [主体](D:/lzz/penta-site-verification-20261017/after/21-capabilities--stainless-steel-cnc-parts-1440.jpg) | 布局检查通过 | 完成 |
| 22 | [Machining from an Existing Sample](http://127.0.0.1:4321/capabilities/starting-with-a-sample/) | [主体](D:/lzz/penta-site-verification-20261017/after/22-capabilities--starting-with-a-sample-1440.jpg) | [截图](D:/lzz/penta-site-verification-20261017/after/22-capabilities--starting-with-a-sample-390.jpg) | 完成 |
| 23 | [CNC machining in Hangzhou.](http://127.0.0.1:4321/factory/) | [整页](D:/lzz/penta-site-verification-20261017/after/23-factory-1440.jpg) | [截图](D:/lzz/penta-site-verification-20261017/after/23-factory-390.jpg) | 完成 |
| 24 | [Machined parts, made to your drawing.](http://127.0.0.1:4321/machined-parts/) | [主体](D:/lzz/penta-site-verification-20261017/after/24-machined-parts-1440.jpg) | [截图](D:/lzz/penta-site-verification-20261017/after/24-machined-parts-390.jpg) | 完成 |
| 25 | [Parts gallery](http://127.0.0.1:4321/machined-parts/gallery/) | [整页](D:/lzz/penta-site-verification-20261017/after/25-machined-parts--gallery-1440.jpg) | [截图](D:/lzz/penta-site-verification-20261017/after/25-machined-parts--gallery-390.jpg) | 完成 |
| 26 | [Aluminum intercooler prototypes](http://127.0.0.1:4321/machined-parts/gallery/custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier/) | [主体](D:/lzz/penta-site-verification-20261017/after/26-machined-parts--gallery--custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier-1440.jpg) | [截图](D:/lzz/penta-site-verification-20261017/after/26-machined-parts--gallery--custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier-390.jpg) | 完成 |
| 27 | [Billet aluminum engine covers](http://127.0.0.1:4321/machined-parts/gallery/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/) | [主体](D:/lzz/penta-site-verification-20261017/after/27-machined-parts--gallery--custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier-1440.jpg) | 布局检查通过 | 完成 |
| 28 | [Injector & fuel-rail intake manifolds](http://127.0.0.1:4321/machined-parts/gallery/custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier/) | [主体](D:/lzz/penta-site-verification-20261017/after/28-machined-parts--gallery--custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier-1440.jpg) | 布局检查通过 | 完成 |
| 29 | [Billet aluminum intake plenums](http://127.0.0.1:4321/machined-parts/gallery/custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier/) | [主体](D:/lzz/penta-site-verification-20261017/after/29-machined-parts--gallery--custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier-1440.jpg) | 布局检查通过 | 完成 |
| 30 | [Intake-system assembly reference](http://127.0.0.1:4321/machined-parts/gallery/custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier/) | [主体](D:/lzz/penta-site-verification-20261017/after/30-machined-parts--gallery--custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier-1440.jpg) | 布局检查通过 | 完成 |
| 31 | [Transmission housings & pump bodies](http://127.0.0.1:4321/machined-parts/gallery/custom-cnc-machined-castings-transmission-housings-pump-bodies/) | [主体](D:/lzz/penta-site-verification-20261017/after/31-machined-parts--gallery--custom-cnc-machined-castings-transmission-housings-pump-bodies-1440.jpg) | 布局检查通过 | 完成 |
| 32 | [Throttle-body CAD reference](http://127.0.0.1:4321/machined-parts/gallery/custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier/) | [整页](D:/lzz/penta-site-verification-20261017/after/32-machined-parts--gallery--custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier-1440.jpg) | [截图](D:/lzz/penta-site-verification-20261017/after/32-machined-parts--gallery--custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier-390.jpg) | 完成 |
| 33 | [Flanged turned component assemblies](http://127.0.0.1:4321/machined-parts/gallery/custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier/) | [主体](D:/lzz/penta-site-verification-20261017/after/33-machined-parts--gallery--custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier-1440.jpg) | 布局检查通过 | 完成 |
| 34 | [Multi-bore circular milled component](http://127.0.0.1:4321/machined-parts/gallery/custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm/) | [主体](D:/lzz/penta-site-verification-20261017/after/34-machined-parts--gallery--custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm-1440.jpg) | 布局检查通过 | 完成 |
| 35 | [Structural & aesthetic components](http://127.0.0.1:4321/machined-parts/gallery/custom-high-precision-machining-for-structural-aesthetic-components-oem/) | [主体](D:/lzz/penta-site-verification-20261017/after/35-machined-parts--gallery--custom-high-precision-machining-for-structural-aesthetic-components-oem-1440.jpg) | 布局检查通过 | 完成 |
| 36 | [Non-metallic & insulating components](http://127.0.0.1:4321/machined-parts/gallery/custom-oem-cnc-machined-non-metallic-components-insulating-parts/) | [主体](D:/lzz/penta-site-verification-20261017/after/36-machined-parts--gallery--custom-oem-cnc-machined-non-metallic-components-insulating-parts-1440.jpg) | 布局检查通过 | 完成 |
| 37 | [Custom machined plastic parts](http://127.0.0.1:4321/machined-parts/gallery/custom-oem-cnc-machined-plastic-parts-manufacturer/) | [主体](D:/lzz/penta-site-verification-20261017/after/37-machined-parts--gallery--custom-oem-cnc-machined-plastic-parts-manufacturer-1440.jpg) | 布局检查通过 | 完成 |
| 38 | [Turned fittings, connectors & flanges](http://127.0.0.1:4321/machined-parts/gallery/custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer/) | [主体](D:/lzz/penta-site-verification-20261017/after/38-machined-parts--gallery--custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer-1440.jpg) | 布局检查通过 | 完成 |
| 39 | [Custom CNC-turned components](http://127.0.0.1:4321/machined-parts/gallery/custom-oem-cnc-turning-manufacturer/) | [主体](D:/lzz/penta-site-verification-20261017/after/39-machined-parts--gallery--custom-oem-cnc-turning-manufacturer-1440.jpg) | 布局检查通过 | 完成 |
| 40 | [Milled instrument blocks & brackets](http://127.0.0.1:4321/machined-parts/gallery/custom-oem-high-precision-cnc-milling-manufacturer/) | [主体](D:/lzz/penta-site-verification-20261017/after/40-machined-parts--gallery--custom-oem-high-precision-cnc-milling-manufacturer-1440.jpg) | 布局检查通过 | 完成 |
| 41 | [Rotary & cylindrical components](http://127.0.0.1:4321/machined-parts/gallery/custom-rotary-cylindrical-components/) | [主体](D:/lzz/penta-site-verification-20261017/after/41-machined-parts--gallery--custom-rotary-cylindrical-components-1440.jpg) | 布局检查通过 | 完成 |
| 42 | [Milled metal brackets & finished housings](http://127.0.0.1:4321/machined-parts/gallery/full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing/) | [主体](D:/lzz/penta-site-verification-20261017/after/42-machined-parts--gallery--full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing-1440.jpg) | 布局检查通过 | 完成 |
| 43 | [Multi-sided machined components](http://127.0.0.1:4321/machined-parts/gallery/global-manufacturer-of-multi-sided-precision-machined-components/) | [整页](D:/lzz/penta-site-verification-20261017/after/43-machined-parts--gallery--global-manufacturer-of-multi-sided-precision-machined-components-1440.jpg) | [截图](D:/lzz/penta-site-verification-20261017/after/43-machined-parts--gallery--global-manufacturer-of-multi-sided-precision-machined-components-390.jpg) | 完成 |
| 44 | [Angled turned component reference](http://127.0.0.1:4321/machined-parts/gallery/global-oem-precision-machining-solutions/) | [主体](D:/lzz/penta-site-verification-20261017/after/44-machined-parts--gallery--global-oem-precision-machining-solutions-1440.jpg) | 布局检查通过 | 完成 |
| 45 | [Turbine & fluid-system components](http://127.0.0.1:4321/machined-parts/gallery/high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem/) | [主体](D:/lzz/penta-site-verification-20261017/after/45-machined-parts--gallery--high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem-1440.jpg) | 布局检查通过 | 完成 |
| 46 | [Complex internal & external turned features](http://127.0.0.1:4321/machined-parts/gallery/high-volume-cnc-turning-for-complex-internal-external-features/) | [主体](D:/lzz/penta-site-verification-20261017/after/46-machined-parts--gallery--high-volume-cnc-turning-for-complex-internal-external-features-1440.jpg) | 布局检查通过 | 完成 |
| 47 | [Cast housings & structural enclosures](http://127.0.0.1:4321/machined-parts/gallery/oem-precision-cnc-machined-casting-housing-structural-enclosures/) | [主体](D:/lzz/penta-site-verification-20261017/after/47-machined-parts--gallery--oem-precision-cnc-machined-casting-housing-structural-enclosures-1440.jpg) | 布局检查通过 | 完成 |
| 48 | [CNC-machined casting housings](http://127.0.0.1:4321/machined-parts/gallery/oem-precision-cnc-machined-casting-housings/) | [主体](D:/lzz/penta-site-verification-20261017/after/48-machined-parts--gallery--oem-precision-cnc-machined-casting-housings-1440.jpg) | 布局检查通过 | 完成 |
| 49 | [Machined castings & OEM housings](http://127.0.0.1:4321/machined-parts/gallery/precision-cnc-machined-castings-custom-oem-housings/) | [主体](D:/lzz/penta-site-verification-20261017/after/49-machined-parts--gallery--precision-cnc-machined-castings-custom-oem-housings-1440.jpg) | 布局检查通过 | 完成 |
| 50 | [Precision-machined castings](http://127.0.0.1:4321/machined-parts/gallery/precision-cnc-machined-castings-manufacturer/) | [主体](D:/lzz/penta-site-verification-20261017/after/50-machined-parts--gallery--precision-cnc-machined-castings-manufacturer-1440.jpg) | 布局检查通过 | 完成 |
| 51 | [Repeated-hole plastic strip references](http://127.0.0.1:4321/machined-parts/gallery/precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances/) | [主体](D:/lzz/penta-site-verification-20261017/after/51-machined-parts--gallery--precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances-1440.jpg) | 布局检查通过 | 完成 |
| 52 | [Turned brass & copper components](http://127.0.0.1:4321/machined-parts/gallery/precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier/) | [主体](D:/lzz/penta-site-verification-20261017/after/52-machined-parts--gallery--precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier-1440.jpg) | 布局检查通过 | 完成 |
| 53 | [Pilot-batch housing references](http://127.0.0.1:4321/machined-parts/gallery/precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier/) | [主体](D:/lzz/penta-site-verification-20261017/after/53-machined-parts--gallery--precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier-1440.jpg) | 布局检查通过 | 完成 |
| 54 | [Circular plastic component reference](http://127.0.0.1:4321/machined-parts/gallery/precision-machining-for-functional-plastic-blocks-structural-components/) | [主体](D:/lzz/penta-site-verification-20261017/after/54-machined-parts--gallery--precision-machining-for-functional-plastic-blocks-structural-components-1440.jpg) | 布局检查通过 | 完成 |
| 55 | [Open aluminum enclosure references](http://127.0.0.1:4321/machined-parts/gallery/precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures/) | [主体](D:/lzz/penta-site-verification-20261017/after/55-machined-parts--gallery--precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures-1440.jpg) | 布局检查通过 | 完成 |
| 56 | [Rotary component & flange reference](http://127.0.0.1:4321/machined-parts/gallery/precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier/) | [主体](D:/lzz/penta-site-verification-20261017/after/56-machined-parts--gallery--precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier-1440.jpg) | 布局检查通过 | 完成 |
| 57 | [Indexing plungers & locking pins](http://127.0.0.1:4321/machined-parts/gallery/precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier/) | [主体](D:/lzz/penta-site-verification-20261017/after/57-machined-parts--gallery--precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier-1440.jpg) | 布局检查通过 | 完成 |
| 58 | [Pocketed aluminum housings](http://127.0.0.1:4321/machined-parts/gallery/small-batch-cnc-machining-manufacturer-complex-aluminum-housings/) | [主体](D:/lzz/penta-site-verification-20261017/after/58-machined-parts--gallery--small-batch-cnc-machining-manufacturer-complex-aluminum-housings-1440.jpg) | 布局检查通过 | 完成 |
| 59 | [Pilot-run component references](http://127.0.0.1:4321/machined-parts/gallery/small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv/) | [主体](D:/lzz/penta-site-verification-20261017/after/59-machined-parts--gallery--small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv-1440.jpg) | 布局检查通过 | 完成 |
| 60 | [Custom CNC Impeller Machining](http://127.0.0.1:4321/machined-parts/gallery/ultra-high-precision-machining-services/) | [主体](D:/lzz/penta-site-verification-20261017/after/60-machined-parts--gallery--ultra-high-precision-machining-services-1440.jpg) | [截图](D:/lzz/penta-site-verification-20261017/after/60-machined-parts--gallery--ultra-high-precision-machining-services-390.jpg) | 完成 |
| 61 | [Machining examples](http://127.0.0.1:4321/machined-parts/machining-examples/) | [整页](D:/lzz/penta-site-verification-20261017/after/61-machined-parts--machining-examples-1440.jpg) | [截图](D:/lzz/penta-site-verification-20261017/after/61-machined-parts--machining-examples-390.jpg) | 完成 |
| 62 | [CNC machining a 29-inch display housing](http://127.0.0.1:4321/machined-parts/machining-examples/29-inch-display-housing-cnc-machining/) | [主体](D:/lzz/penta-site-verification-20261017/after/62-machined-parts--machining-examples--29-inch-display-housing-cnc-machining-1440.jpg) | [截图](D:/lzz/penta-site-verification-20261017/after/62-machined-parts--machining-examples--29-inch-display-housing-cnc-machining-390.jpg) | 完成 |
| 63 | [Metal part examples: shafts, fittings & housings](http://127.0.0.1:4321/machined-parts/machining-examples/custom-metal-parts-batch-examples/) | [主体](D:/lzz/penta-site-verification-20261017/after/63-machined-parts--machining-examples--custom-metal-parts-batch-examples-1440.jpg) | [截图](D:/lzz/penta-site-verification-20261017/after/63-machined-parts--machining-examples--custom-metal-parts-batch-examples-390.jpg) | 完成 |
| 64 | [Plastic part examples: PTFE, POM, PE & acrylic](http://127.0.0.1:4321/machined-parts/machining-examples/custom-plastic-parts-ptfe-pom-pe-acrylic/) | [整页](D:/lzz/penta-site-verification-20261017/after/64-machined-parts--machining-examples--custom-plastic-parts-ptfe-pom-pe-acrylic-1440.jpg) | [截图](D:/lzz/penta-site-verification-20261017/after/64-machined-parts--machining-examples--custom-plastic-parts-ptfe-pom-pe-acrylic-390.jpg) | 完成 |
| 65 | [Five-axis CNC machining for multi-face parts](http://127.0.0.1:4321/machined-parts/machining-examples/five-axis-machining-multi-face-parts/) | [主体](D:/lzz/penta-site-verification-20261017/after/65-machined-parts--machining-examples--five-axis-machining-multi-face-parts-1440.jpg) | 布局检查通过 | 完成 |
| 66 | [CNC milling a pocketed enclosure: walls, bores and datums](http://127.0.0.1:4321/machined-parts/machining-examples/milling-a-pocketed-enclosure-form/) | [主体](D:/lzz/penta-site-verification-20261017/after/66-machined-parts--machining-examples--milling-a-pocketed-enclosure-form-1440.jpg) | 布局检查通过 | 完成 |
| 67 | [CNC milling prismatic parts: faces, bores and pockets](http://127.0.0.1:4321/machined-parts/machining-examples/milling-prismatic-components/) | [主体](D:/lzz/penta-site-verification-20261017/after/67-machined-parts--machining-examples--milling-prismatic-components-1440.jpg) | 布局检查通过 | 完成 |
| 68 | [CNC turning followed by milling for cylindrical parts](http://127.0.0.1:4321/machined-parts/machining-examples/turning-then-milling-cylindrical-parts/) | [主体](D:/lzz/penta-site-verification-20261017/after/68-machined-parts--machining-examples--turning-then-milling-cylindrical-parts-1440.jpg) | 布局检查通过 | 完成 |
| 69 | [Two CNC milling setups: keeping features aligned](http://127.0.0.1:4321/machined-parts/machining-examples/two-stage-cnc-milling/) | [主体](D:/lzz/penta-site-verification-20261017/after/69-machined-parts--machining-examples--two-stage-cnc-milling-1440.jpg) | 布局检查通过 | 完成 |
| 70 | [Privacy and site information](http://127.0.0.1:4321/privacy/) | [整页](D:/lzz/penta-site-verification-20261017/after/70-privacy-1440.jpg) | [截图](D:/lzz/penta-site-verification-20261017/after/70-privacy-390.jpg) | 完成 |
| 71 | [Prepare an RFQ email](http://127.0.0.1:4321/quote/) | [整页](D:/lzz/penta-site-verification-20261017/after/71-quote-1440.jpg) | [截图](D:/lzz/penta-site-verification-20261017/after/71-quote-390.jpg) | 完成 |
| 72 | [Resources for CNC machining](http://127.0.0.1:4321/resources/) | [整页](D:/lzz/penta-site-verification-20261017/after/72-resources-1440.jpg) | [截图](D:/lzz/penta-site-verification-20261017/after/72-resources-390.jpg) | 完成 |
| 73 | [Custom CNC machining FAQs](http://127.0.0.1:4321/resources/faq/) | [整页](D:/lzz/penta-site-verification-20261017/after/73-resources--faq-1440.jpg) | [截图](D:/lzz/penta-site-verification-20261017/after/73-resources--faq-390.jpg) | 完成 |
| 74 | [RFQ & ordering](http://127.0.0.1:4321/resources/ordering/) | [主体](D:/lzz/penta-site-verification-20261017/after/74-resources--ordering-1440.jpg) | [截图](D:/lzz/penta-site-verification-20261017/after/74-resources--ordering-390.jpg) | 完成 |
| 75 | [Compare CNC machining quotations](http://127.0.0.1:4321/resources/ordering/compare-cnc-machining-quotations/) | [主体](D:/lzz/penta-site-verification-20261017/after/75-resources--ordering--compare-cnc-machining-quotations-1440.jpg) | [截图](D:/lzz/penta-site-verification-20261017/after/75-resources--ordering--compare-cnc-machining-quotations-390.jpg) | 完成 |
| 76 | [Plan the shipment of CNC parts](http://127.0.0.1:4321/resources/ordering/custom-cnc-parts-shipping-checklist/) | [主体](D:/lzz/penta-site-verification-20261017/after/76-resources--ordering--custom-cnc-parts-shipping-checklist-1440.jpg) | 布局检查通过 | 完成 |
| 77 | [Machined prototype approval](http://127.0.0.1:4321/resources/ordering/machined-prototype-approval-checklist/) | [主体](D:/lzz/penta-site-verification-20261017/after/77-resources--ordering--machined-prototype-approval-checklist-1440.jpg) | 布局检查通过 | 完成 |
| 78 | [From the first sample to repeat production](http://127.0.0.1:4321/resources/ordering/prototype-vs-small-batch-cnc/) | [整页](D:/lzz/penta-site-verification-20261017/after/78-resources--ordering--prototype-vs-small-batch-cnc-1440.jpg) | 布局检查通过 | 完成 |
| 79 | [CNC machining RFQ checklist](http://127.0.0.1:4321/resources/ordering/rfq-checklist/) | [整页](D:/lzz/penta-site-verification-20261017/after/79-resources--ordering--rfq-checklist-1440.jpg) | [截图](D:/lzz/penta-site-verification-20261017/after/79-resources--ordering--rfq-checklist-390.jpg) | 完成 |
| 80 | [Technical guides](http://127.0.0.1:4321/resources/technical-guides/) | [整页](D:/lzz/penta-site-verification-20261017/after/80-resources--technical-guides-1440.jpg) | 布局检查通过 | 完成 |
| 81 | [Choose the CNC machining route](http://127.0.0.1:4321/resources/technical-guides/cnc-process-selection/) | [整页](D:/lzz/penta-site-verification-20261017/after/81-resources--technical-guides--cnc-process-selection-1440.jpg) | [截图](D:/lzz/penta-site-verification-20261017/after/81-resources--technical-guides--cnc-process-selection-390.jpg) | 完成 |
| 82 | [CNC drawings & critical features](http://127.0.0.1:4321/resources/technical-guides/critical-features-cnc-drawing/) | [整页](D:/lzz/penta-site-verification-20261017/after/82-resources--technical-guides--critical-features-cnc-drawing-1440.jpg) | 布局检查通过 | 完成 |
| 83 | [Material & finish for CNC parts](http://127.0.0.1:4321/resources/technical-guides/material-and-finish-checklist/) | [整页](D:/lzz/penta-site-verification-20261017/after/83-resources--technical-guides--material-and-finish-checklist-1440.jpg) | [截图](D:/lzz/penta-site-verification-20261017/after/83-resources--technical-guides--material-and-finish-checklist-390.jpg) | 完成 |

## 规范、回退与剩余边界

最终规则已写回项目 DESIGN.md，包括流程/联系结构、FAQ、新闻、隐私/询价间距、CMM图文关系、RFQ冲突与禁用旧入场动画。

本轮直接前版备份：D:/lzz/penta-site-verification-20261017/backup/。Git原始状态见 git-status-before.txt；本轮实际修改文件见 source-changes.json。只按清单逐文件恢复，避免覆盖既有未提交工作。本轮未reset、stash、clean、commit、push或部署。

本轮正式页面无待修复阻塞。未提供现场Core Web Vitals分数，也不从本地构建通过推断生产性能。原始设备、认证、交期和订单条件继续按原内容的适用范围确认。
