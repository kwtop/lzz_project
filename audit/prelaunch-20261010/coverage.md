# 本轮范围与证据索引

日期：2026-10-10。项目 `D:\lzz\lzz\_react`；仅审计，无业务源码修改/部署/真实发送。适用会话 AGENTS.md；项目与祖先未发现额外 AGENTS.md/.codegraph。浏览器使用自己的两次临时 Chrome tab，未操作用户的探索方案页，viewport检查结束已reset，tabs已关闭。

## 三类事实来源

| 来源 | 实际范围 | 不代表什么 |
|---|---|---|
| 开发服务浏览器 | `http://127.0.0.1:4323/`；桌面1440×1000，手机390×844；实际渲染/菜单/筛选/草稿 | 生产部署、真实收件或全部35详情逐页视觉检查 |
| 当前源码/数据 | 路由、公司、工艺、35产品内容、素材登记、模板/表单/SEO脚本 | 实际企业履约能力、文件真实性或当前认证状态 |
| 本轮生产构建HTML | 94 HTML，81可索引；全35产品内容字段/链接，45上下文RFQ；build/test:seo日志 | 线上HTTP/重定向/托管响应头/收录；未启动生产预览 |

## 浏览器覆盖

五个核心系列分类页**全部实际浏览桌面**：

- `/capabilities/cnc-milling-service/`
- `/capabilities/cnc-turning-service/`
- `/capabilities/5-axis-cnc-machining/`
- `/capabilities/plastic-machined-parts/`
- `/capabilities/casting-machining/`

详情浏览为**9个代表页**，覆盖共享模板、engine-cover专用要求表、金属/塑料/铸件/示意图/汽车原型/批量不同内容。并非35页都在浏览器实看：

- `/products/ultra-high-precision-machining-services/`：五轴叶轮，桌面+手机
- `/products/custom-oem-high-precision-cnc-milling-manufacturer/`：铣削仪器块
- `/products/precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier/`：不锈钢锁定件
- `/products/custom-oem-cnc-machined-plastic-parts-manufacturer/`：工程塑料
- `/products/oem-precision-cnc-machined-casting-housing-structural-enclosures/`：铸件后加工
- `/products/precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier/`：铜黄铜/示意图
- `/products/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/`：专用engine-cover要求表
- `/products/custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier/`：汽车原型功能范围
- `/products/small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv/`：小批量混合零件

全部35产品的数据与生产HTML另做全量检查，字段覆盖详见 [product-content-coverage.json](D:/lzz/lzz/_react/audit/prelaunch-20261010/technical/product-content-coverage.json)。35/35有Materials、Machining、Surface finish、requirements、drawing/inspection、产品上下文RFQ和2–3相关零件；没有将全量静态检查表述为全量视觉检查。

主要页面/模板实际浏览：

- 首页、Products（默认/全部35/塑料筛选/无结果）、Capabilities hub、上述5系列和9详情
- About、Factory、Quality、Contact、Quote
- Cases hub、`/cases/five-axis-machining-multi-face-parts/`
- Resources hub、FAQ、Drawings & Ordering、Processes Materials Finishes、Production & Shipping分类
- `/resources/rfq-checklist/`、`/resources/how-we-work/`、`/resources/custom-cnc-parts-shipping-checklist/`、`/resources/cnc-process-selection/`
- `/about/company-news/`、`/about/company-news/australian-customer-workshop-visit-january-2025/`
- `/privacy/`、`/404.html`（检查页面，不验证未知路径返回状态）

手机实际浏览：首页/菜单展开及跳CNC milling、Products筛选、叶轮详情→Quote、Quality、工艺对比表。390px下对比表转为带字段名的竖排卡片，无整体横向溢出证据。草稿和菜单的瞬时加载状态不作为视觉缺陷。

## 询价实测范围

产品叶轮的Request a quote→Quote，part/product/source引用显示正确。使用虚构 `Audit Buyer` / `audit@example.invalid`，没有真实个人资料。

- 空信息时Prepare按钮禁用；无效邮箱显示浏览器及页面校验信息。
- 有效测试信息生成“Email draft prepared — not sent”，mailto包含项目、产品ID及正式来源URL。
- 刷新恢复测试输入；清除保存输入成功，产品引用保留。手机也生成草稿。
- 没有点击Open email app、实际发送、上传附件；Copy/Save按钮仅观察，未执行复制/下载。
- 结束前测试输入已清除。

## 主要截图（绝对路径）

| 证据 | 路径 |
|---|---|
| 稳定桌面首页hero | `D:\lzz\lzz\_react\audit\prelaunch-20261010\home-desktop-viewport.jpg` |
| 手机首页 | `D:\lzz\lzz\_react\audit\prelaunch-20261010\home-mobile.jpg` |
| RFQ深色链接问题 | `D:\lzz\lzz\_react\audit\prelaunch-20261010\home-rfq-mobile.jpg` |
| 手机菜单稳定展开 | `D:\lzz\lzz\_react\audit\prelaunch-20261010\navigation-expanded-mobile.jpg` |
| 桌面目录 | `D:\lzz\lzz\_react\audit\prelaunch-20261010\products-desktop.jpg` |
| 手机塑料筛选 | `D:\lzz\lzz\_react\audit\prelaunch-20261010\products-plastics-filter-mobile.jpg` |
| 叶轮桌面完整详情 | `D:\lzz\lzz\_react\audit\prelaunch-20261010\product-impeller-desktop.jpg` |
| 叶轮手机前段 | `D:\lzz\lzz\_react\audit\prelaunch-20261010\products-ultra-high-precision-machining-services-mobile.jpg` |
| 五轴分类 | `D:\lzz\lzz\_react\audit\prelaunch-20261010\capability-5-axis-cnc-machining-desktop.jpg` |
| 铣削分类手机 | `D:\lzz\lzz\_react\audit\prelaunch-20261010\capability-milling-mobile.jpg` |
| 铸件分类 | `D:\lzz\lzz\_react\audit\prelaunch-20261010\capability-casting-machining-desktop-viewport.jpg` |
| Quality桌面 | `D:\lzz\lzz\_react\audit\prelaunch-20261010\quality-desktop.jpg` |
| Quality手机 | `D:\lzz\lzz\_react\audit\prelaunch-20261010\quality-mobile.jpg` |
| 产品上下文询价 | `D:\lzz\lzz\_react\audit\prelaunch-20261010\quote-context-desktop.jpg` |
| 草稿结果手机 | `D:\lzz\lzz\_react\audit\prelaunch-20261010\quote-draft-mobile.jpg` |
| 工艺表手机竖排卡片 | `D:\lzz\lzz\_react\audit\prelaunch-20261010\process-table-mobile.jpg` |
| 公司新闻与来访模板 | `D:\lzz\lzz\_react\audit\prelaunch-20261010\company-news-desktop.jpg` / `company-news-visit-desktop.jpg` |

同目录另有所有5分类、9详情代表、About/Factory/Contact/Cases/资源、Privacy/404的截图或DOM文本。`home-desktop.jpg`是早期full-page捕获，含lazy/reveal瞬时空区，不用于断言图片缺失；优先使用稳定viewport截图。部分长截图会在查看工具中缩放，原文件保留。未逐帧审核全部视频，也未独立确认每张目录图为原始实拍。

## 技术日志和外部依据

生产脚本日志、逐页元信息/内链/产品/询价JSON位于 `D:\lzz\lzz\_react\audit\prelaunch-20261010\technical\`。Google官方来源记录见 [official-sources.md](D:/lzz/lzz/_react/audit/prelaunch-20261010/technical/official-sources.md)。外部核对只用于搜索技术规范，不作为LZZ公司事实证明。

未验证：正式/候选部署、DNS/TLS、真实HTTP301/404、域名响应头、实际Google收录/富结果/AI引用、企业认证真实性/有效性、项目履约、邮件发送/收件/回复。当前截图是开发服务证据，当前dist是本次构建证据。
