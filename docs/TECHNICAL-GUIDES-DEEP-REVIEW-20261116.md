# Technical guides 内容深化

日期为 2026-11-16。本轮处理 Resources → Technical guides 中实际列出的全部 14 篇文章。目标市场沿用全球英语采购需求，读者为海外采购商及产品工程师。

实际访问了 `/resources/`、`/resources/technical-guides/` 和 14 个文章页。栏目无分页。六篇 RFQ & ordering 文章、产品页、案例及公司新闻不在本轮编辑范围；相关已存在的页面仅用于核对内链及上下文，未把范围外文章一概登记为已阅读全文。

## 稿源与范围

实际稿源为 `src/data/resourceEditorial.json`。本轮在现有章节中深化 33 处内容，章节 ID、H1、SEO Title、描述、栏目标题及摘要、原 URL、图片、原始发布日期、署名和询价行为沿用基线。技术图与 EX-MOUNT-01 教学结果继续由现有组件呈现。

14 篇实质修订稿各记录 `updated: 2026-11-16`。`resourceSearchReview.ts` 读取文章自身日期，其余文章仍沿用原日期。对应 sitemap lastmod 在 `pageLastModified.json` 记录本轮内容依据。

## 逐篇分工与深化

| 文章短名 | 本篇职责 | 深化内容 |
| --- | --- | --- |
| critical-features-cnc-drawing | 图纸与检验要求的对应 | 特性编号与报告行、STEP/PDF 冲突、单位与版本控制 |
| 6061-vs-7075-cnc-aluminum | 实际成品的合金选择 | 板/棒材及性能口径、典型值与采购限值、几何及成品成本比较 |
| material-and-finish-checklist | 材料、局部处理与最终验收 | 处理路线比较、材料到处理再到尺寸报告的批次对应 |
| cnc-process-selection | 按功能几何选加工路线 | 四轴定位/连续动作、3+2、二次装夹及完整交付比较 |
| designing-aluminum-enclosures-for-cnc-machining | 壳体装配与切削条件 | 盖板/PCB/接插件公差链、固定与可调整几何、处理后卡滞排查 |
| datums-and-hole-position-on-circular-machined-parts | 法兰孔位与装配基准 | 带限制的二维偏差算例、孔位报告与装配症状排查 |
| how-to-specify-fits-and-runout-on-turned-parts | 轴套配合及跳动 | H7/g6 与公称尺寸、测量覆盖、不同支撑下的结果分歧 |
| choosing-thread-and-seal-requirements-for-machined-fittings | 接头螺纹与密封定义 | NPT/BSPT/BSPP/metric、密封选型输入、泄漏试验配置与单位 |
| what-to-check-before-machining-a-cast-housing | 铸件是否容纳成品 | 实际毛坯布局与名义叠图、切削后缺陷、修补与放行记录 |
| why-machined-plastic-parts-need-defined-measurement-conditions | 塑料件测量状态 | 双材料热配合、同一特征的复测步骤、调湿及支撑记录 |
| preparing-an-impeller-model-for-5-axis-machining | 叶轮模型、可达性与检查 | CAD 发布检查、模型/CAM/检验公差、平衡修正区域 |
| which-aluminum-features-need-masking-before-anodizing | 遮蔽与局部边界 | 孔口/倒角/肩部处理图、氧化封孔与总成密封、边界检验 |
| specifying-a-billet-intake-manifold-for-machining | 歧管接口与供货配置 | 实际缸盖及硬件包络、合拢前检查、试验条件与责任 |
| what-matters-when-ordering-a-custom-indexing-plunger | 安装后的定位销功能 | 最差尺寸组合、有效啮合与退出间隙、安装态动作和弹簧力检查 |

## 关键词与证据

原研究登记中本栏目有 280 个关键词位置。每个位置记录原词、章节去向、自然表达或精确词组保留状态，以及原 Planner/Trends 数据。新增 125 个长尾问题及实体候选，对应具体补充位置。

本轮实际尝试 Google Ads 搜索量和 Google Trends 接口，均返回 HTTP 403。OpenSEO 的 LZZ 项目可读取，但 Search Console 返回 `not_connected`。这些状态仅描述本轮工具访问情况，未据此判断网站没有排名或用户的其他 Google 登录没有权限。

随后使用已登录 Chrome 中的 Keyword Planner 抽查 28 个英文词组，包括 14 个主主题和 14 个具体问题词。13 个显示月搜索量区间，15 个返回“—”。实际范围为所有位置/所有语言/Google，历史期为 2025-11 至 2026-10，保留区间及变化原值。语言控件在该历史指标界面不可编辑，不能将结果称作英语用户专属搜索量；广告竞争不是自然搜索难度。

`cnc milling vs turning` 显示三个月 0%、同比 +900%。同词 Google Trends 全球/五年/网页搜索有 262 个周数据，仅 5 个非零相对指数点，呈离散峰值，因此不认定持续增长或季节趋势。指数不等于搜索次数，也未将该结果套到其他长尾词。

2026-11-08 历史研究的日期、地区和原始区间保留，本轮数据另列，避免不同证据互相覆盖。新增候选仍未取得可用当前量值，未把内容相关性写成高搜索量或增长证据。候选词、自然承接和搜索量证据分别记录，未设置关键词密度或逐字出现配额。浏览器查询为实际网页表格转录；CSV 下载尝试未取得文件，没有将转录表描述为原始导出。

技术依据核对了 ASME、Hexagon、Kaiser、Sandvik、Autodesk、Ensinger、SFSA、Swagelok、NASA/JSC、Parker、SKF、Holley 和 Ganter 的相关公开页面或资料。完整付费规范未作为已阅读全文处理。材料典型值、钢铸件指导、标准件目录及特定厂商应用说明保持其对象和适用条件，未转为 LZZ 产品参数或能力承诺。

新增计算为明确假设下的几何或诊断解释，未用于宣称生产测量结果。二维孔位偏差不代替完整几何公差判定，定位销公式保留刚性、同轴、可用孔深及实际行程条件。新增正文按 Humanizer 复读，保留技术限制与真实问句。

## 交付与核验

工作目录为 `D:/lzz/项目记录/技术指南深化-20261116/`，包含交付说明、范围总表、栏目分工、405 行关键词附表、逐篇深化清单、逐篇修订正文导出、本轮 Planner 抽查表及来源和数据访问记录。正文导出不含网站的动态教学图和产品图组件，完整呈现以本地网站预览为准。

已实际执行：

| 检查 | 结果 |
| --- | --- |
| `npm run check` | 通过，0 errors、0 warnings、9 条原有 hints |
| `npm run build` | 通过，生成 157 条路由 |
| `npm run test:site` | 通过，96 条规范路由、226 个 HTML、9911 个本地引用、693 个片段引用 |
| `npm run test:seo` | 通过，226 个 HTML、96 个 sitemap URL、188 条重定向、91 个原始 URL |
| `npm run test:teaching` | 3 项通过 |
| 实际页面渲染 | 14 篇分别在 1440px 与 390px 检查，共 28 次、0 项异常，无页面错误 |
| 基线保护 | 只改 14 个目标键，范围外六篇不变；原元数据、段落、表格、章节 ID、图片及图注保留 |
| 人工阅读截图 | 全部 14 篇手机新增内容截图，及图纸、孔位、遮蔽、定位销的桌面阅读视图 |

具体日志及逐页数据见工作目录的 `核验记录.json`、`render-validation.json` 和各检查日志。栏目入口文字与基线一致，未改布局、表单或追踪实现，未发出测试询盘。

没有未修订的范围内文章或影响新增核心结论的待确认品牌事实。尚未取得逐词完整当前搜索指标及修订后真实 GSC 表现，不能据本地检查推断排名、AI 引用或询盘增长。本轮未发布 Cloudflare 或推送 GitHub。
