# 产品技术指南十篇：本地交付记录

完成日期：2026-11-01。状态：十篇完整正文已接入本地网站，未上传 GitHub、Cloudflare 或生产环境。

本地入口：[Technical guides](http://127.0.0.1:8788/resources/technical-guides/)。目录保留四篇原有基础指南，并新增十篇产品指南。Resources 总页提供三篇优先样板及相关基础指南入口，避免把十四个长标题堆在同一块中。

## 1. 已完成页面

以下词数按构建后的正文区域统计，包含章节标题、表格、图注与清单，不包含首屏介绍、目录、公共页脚及相关文章。每篇均为五个主要章节、一张技术对照表、一张产品主图和一张独立 SVG 技术图。

| 顺序 | 页面 / 英文标题 | 正文词数 | 对应产品图 |
|---|---|---:|---|
| 1 | [Designing Aluminum Enclosures for CNC Machining](http://127.0.0.1:8788/resources/technical-guides/designing-aluminum-enclosures-for-cnc-machining/) | 1,140 | P33，口袋式铝壳 |
| 2 | [Datums and Hole Position on Circular Machined Parts](http://127.0.0.1:8788/resources/technical-guides/datums-and-hole-position-on-circular-machined-parts/) | 1,110 | P00，多孔圆形件 |
| 3 | [How to Specify Fits and Runout on Turned Parts](http://127.0.0.1:8788/resources/technical-guides/how-to-specify-fits-and-runout-on-turned-parts/) | 1,102 | P19，阶梯式法兰车削件 |
| 4 | [Choosing Thread and Seal Requirements for Machined Fittings](http://127.0.0.1:8788/resources/technical-guides/choosing-thread-and-seal-requirements-for-machined-fittings/) | 1,073 | P07，螺纹接头 |
| 5 | [What to Check Before Machining a Cast Housing](http://127.0.0.1:8788/resources/technical-guides/what-to-check-before-machining-a-cast-housing/) | 1,190 | P18，铸造壳体 |
| 6 | [Why Machined Plastic Parts Need Defined Measurement Conditions](http://127.0.0.1:8788/resources/technical-guides/why-machined-plastic-parts-need-defined-measurement-conditions/) | 1,090 | P26，多孔塑料条 |
| 7 | [Preparing an Impeller Model for 5-Axis Machining](http://127.0.0.1:8788/resources/technical-guides/preparing-an-impeller-model-for-5-axis-machining/) | 1,097 | P02，叶轮 |
| 8 | [Which Aluminum Features Need Masking Before Anodizing?](http://127.0.0.1:8788/resources/technical-guides/which-aluminum-features-need-masking-before-anodizing/) | 1,129 | P08，表面处理圆环件 |
| 9 | [Specifying a Billet Intake Manifold for Machining](http://127.0.0.1:8788/resources/technical-guides/specifying-a-billet-intake-manifold-for-machining/) | 1,070 | P16，进气歧管 |
| 10 | [What Matters When Ordering a Custom Indexing Plunger](http://127.0.0.1:8788/resources/technical-guides/what-matters-when-ordering-a-custom-indexing-plunger/) | 1,111 | P32，定位销组件 |

正文源码位于 `src/data/product-guides/`，独立标题、SEO 标题、描述、摘要、产品关系、章节、相关文章及询价文案均在各篇文件内维护。`productTechnicalGuides.ts` 只负责注册与共享适配，不把十篇压成同一段营销模板。

## 2. 写作与技术重点

使用 blog-write 完成正文，按 Humanizer 复核表达。沿用用户提供的[参考文档](https://docs.google.com/document/d/1C66BdSbP2ZPUDX_oFn6ZWGqHgetADANY/edit)的直接回答、比较表、具体对象与末尾检查要点；[Penta 壳体文章](https://www.pentaprecision.co.uk/resources/custom-enclosures-from-design-to-manufacture)作为产品、制造条件与采购决策之间的组织参考。未采用参考品牌的公司能力、案例、容量、价格或成绩。

- 铝壳从闭合面和内部安装面出发，讨论壁高、腔深、刀具进入与最终处理状态；没有给出脱离具体几何的通用最小壁厚。
- 圆形件区分单个尺寸与孔系关系，讨论实际安装面、定位特征和角向方向；示意字母是说明索引，不是完整的 GD&T 标注。
- 车削件分别处理直径、肩位、圆跳动与全跳动，要求测量参考和最终表面状态对应。
- 接头把完整端部连接、螺纹、密封面和内孔边缘分开说明；螺纹量规检验不替代单独定义的密封或压力测试。
- 铸件先区分毛坯图、加工图、保留铸面和加工余量，再安排定位和验收。钢铸件来源未被当成铝铸件通用余量表。
- 塑料件围绕温度、吸湿历史、支撑与接触方式展开，要求具体牌号及测量状态；不套用通用退火程序。
- 叶轮围绕完整曲面、刀具组件进入、叶根、轮毂和几何评价；动平衡、流量及性能测试均作为另行定义的工作。
- 阳极氧化篇只讨论具体功能面的遮蔽边界和处理后尺寸，不提供通用膜层增长公式或未经证实的处理能力。
- 歧管篇连接受控内流道、法兰、节气门及密封接口，区分单件与总成供货；没有写功率或流量收益。
- 定位销篇把销孔配合、安装深度、投影长度、行程和弹簧行为分开定义；弹簧力不被写成整套机构的承载等级。

四篇原有基础指南分别覆盖通用图纸要求、6061/7075、材料与表面处理、工艺选择；新篇解释具体零件上的应用。正文自然链接到相关产品、工艺和基础指南。与四篇旧指南及其余新篇比较，未发现三十词以上的整段复用；主题边界也按上述内容逐项复核。

## 3. 一手资料与使用边界

核对日期：2026-11-01。以下资料在对应正文说明旁直接链接，不复制厂商的能力、公差或额定值。

| 使用位置 | 一手资料 | 核对内容与边界 |
|---|---|---|
| 铝壳 | [Sandvik Coromant：Milling inside corners](https://www.sandvik.coromant.com/en-gb/knowledge/milling/milling-inside-corners) | 内圆角与切削啮合；未转录刀具参数或普遍设计阈值 |
| 圆形件 | [Hexagon：Introduction to coordinate metrology](https://hexagon.com/resources/resource-library/intro-coordinate-metrology) | 坐标关系和测量对齐；具体图纸仍需确定基准方案 |
| 车削件 | [Hexagon：Circular Runout](https://nexus.hexagon.com/documentationcenter/en-US/bundle/pcdmis-2026.1-core/page/geometric_tolerances/Circular_Runout.htm) | 围绕参考轴按截面评价的概念；未将软件文档当作完整标准全文 |
| 接头 | [Swagelok：Thread and end connection identification](https://socal.swagelok.com/en/resources/downloads/guides/swagelok-thread-and-end-connection-identification-guide) | 直螺纹、锥螺纹和完整连接识别 |
| 接头 | [Swagelok：Types of tube fittings](https://www.swagelok.com/en/blog/small-bore-tube-fittings-key-differences) | 螺纹保持与独立密封元件的区别；未采用文章中的压力数值 |
| 铸件 | [SFSA：Ordering Steel Castings](https://www.sfsa.org/subject-areas/education/ordering-steel-castings/) | 来料、加工面、定位与加工前确认；适用对象明确为钢铸件 |
| 塑料 | [Mitsubishi Chemical Advanced Materials：Dimensional stability](https://www.mcam.com/en/support/material-properties/dimensional-stability) | 温度、吸湿与应力对具体材料尺寸稳定性的影响 |
| 塑料 | [Ensinger：Engineering plastics manual](https://www.ensinger-pc.com/wp-content/uploads/2022/04/Ensinger-Manual.pdf) | 加工热、装夹与材料状态；未采用统一退火条件 |
| 叶轮 | [Sandvik Coromant：Closed pockets or angles](https://www.sandvik.coromant.com/en-gb/knowledge/milling/milling-holes-cavities-pockets/closed-pockets-or-angles) | 叶轮类几何的可达性和运动方式；具体路线依完整模型评审 |
| 阳极氧化 | [NASA PRC-5006 Rev. D](https://www.nasa.gov/wp-content/uploads/2023/03/prc-5006-current.pdf) | 工程要求中明确遮蔽、接触和处理状态的方式；不表示 LZZ 获得 NASA 资格或执行该特定规程 |
| 歧管 | [Holley：Intake manifold technical support](https://www.holley.com/support/intake_manifold/) | 缸盖、接口、进气口及垫片匹配需要特定对象；不迁移产品安装参数 |
| 定位销 | [Ganter：GN 413](https://www.ganternorm.com/en/products/3.1-Indexing-locking-blocking-with-pins-and-ball-shaped-elements/Indexing-plungers/GN-413-Indexing-plungers-Steel) | 有无缩回保持位置的功能区别；不将该标准件尺寸或额定值赋予 LZZ 产品 |

## 4. 图片与技术图

复用 `public/media/product-photography-20261018/` 中 P33、P00、P19、P07、P18、P26、P02、P08、P16、P32 的已确认摄影图和现有响应式版本。没有修改原图、产品结构或原始来源记录，也没有生成新的栅格照片。

十张解释图由 `ProductGuideDiagram.astro` 按主题独立绘制，分别展示腔体、孔系、轴肩、连接、铸件、塑料测量、叶轮、遮蔽、歧管与定位销。各图有 SVG 标题和说明、A/B/C 引线、网页文字图例及“not to scale”说明。图不提供制造尺寸或假造测量结果，也不充当生产检验记录。

图文在完整阅读宽度内展开。正文段落沿用约 68ch，图表可使用更宽的正文区域。产品图为 4:3 完整显示；技术图在手机等比缩放，图例独立纵向阅读。桌面表格保留列关系，手机转为带字段名的逐项说明。

视觉复核修复了轴肩、铸件加工余量、塑料支撑与接触、遮蔽区域等图示引线。Resources 总页由全部十四篇堆叠改为重点入口加完整目录链接，避免两列高度悬殊。

## 5. 浏览器与技术验收

实际使用本地 Wrangler 预览 `127.0.0.1:8788` 验收。十篇文章各检查 CSS 视口 1440px 与 390px，共二十个文章视图；另检查资源总页和技术目录的两个视口。所有新页的图片加载正常，未发现横向溢出；技术目录十四张封面实际滚动触发懒加载后全部加载。

手机实测：阅读目录能展开，选择章节后自动收起，目标标题未被固定导航遮挡。文章末尾询价入口正确带入文章主题与源 URL，询价页面与原字段正常显示；没有提交测试询价。

| 检查 | 结果 |
|---|---|
| `npm run check` | 0 errors、0 warnings；9 个既有提示 |
| `npm run build` | 通过，构建并完成 CSS 与 SEO 后处理 |
| `npm run test:site` | 通过，96 个正式路由、9,395 个本地引用、682 个章节引用 |
| `npm run test:seo` | 通过，96 个 sitemap URL；检查 226 个构建 HTML 和 188 条重定向 |
| `npm run test:inquiry` | 上下文、字段、附件限制、传输结果及构建表单验证通过 |
| 十篇专属内容核对 | 10 篇、10 图、10 表、独立标题与描述、正确日期、Article／Breadcrumb、产品与工艺链接、内部锚点均通过 |
| 原内容保护 | 原十条资源 URL 保持；四篇基础指南源码 SHA-256 与本轮前版一致 |

早期 Chrome 截图受浏览器缩放影响，不作为 1440px 验收证据。最终截图和 DOM 记录来自实际 `innerWidth` 为 1440／390 的浏览器视口。没有使用截图画布宽度推断断点。

本轮没有进行生产邮件发送、线上索引或现场 Core Web Vitals 测量。上述结果证明本地内容、渲染和既有功能检查通过，不代表生产环境已更新。

## 6. 文件、截图与回退

记录根目录：`D:/lzz/项目记录/产品技术指南10篇-20261101/`。

- `before/src/`、`before/DESIGN.md`：本轮开始前的完整源码与设计规范副本，包含进入本轮时已有的用户改动。
- `git-status-before.txt`：进入本轮时的工作区状态；未执行 reset、stash 或覆盖已有改动。
- `task-source-changes.json`：与本轮前版比较，九个共享源文件更新、十四个新源文件，无源文件删除。
- `verify-product-guides.mjs`、`final-content-audit.json`：可复现的十篇内容、元数据、内部链接、图片源和旧内容保护核对。
- `responsive-checks.json`：十篇文章的二十次实际视口、图片尺寸、图表和溢出记录。
- `directory-checks.json`、`interaction-checks.json`：目录和阅读／询价交互记录。
- `build-final.log`、`check.log`、`test-site.log`、`test-seo.log`、`test-inquiry.log`：构建及检查输出。
- `shots/<slug>-1440.jpg`、`shots/<slug>-390.jpg`：各文章完整桌面和手机截图。
- `shots/<slug>-diagram.jpg`、`shots/<slug>-opening-*.jpg`：从实际页面截图提取的局部复核图。
- `shots/technical-guides-1440.jpg`、`shots/technical-guides-390.jpg`、`shots/resources-hub-*.jpg`：目录页面截图。

共享改动集中在资源注册、目录、文章渲染和 Layout 的可选 Article 日期／标题属性。旧指南继续走原有逻辑；新增样式限定于产品指南及其目录。十篇新正文、类型与图形组件独立存放，未改公共询价 API。

回退时按本轮前版恢复任务涉及的文件，并移除本轮新文件；不要根据 Git HEAD 整体回退工作区，以免丢失此前用户改动。

本轮要求的十篇文章无未完成项。生产发布不在本轮范围内。
