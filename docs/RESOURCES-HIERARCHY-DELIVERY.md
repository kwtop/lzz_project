# Resources 三级结构交付

2026-10-16。本地完成，未部署生产环境，未推送 Git。当前预览为 `http://127.0.0.1:4323/resources/`。

## 结果

- Resources 总览只提供 RFQ & ordering、Technical guides、FAQ 三个二级分类入口，不直接铺开文章。
- 两个分类页分别承接 5 篇采购指南、3 篇技术指南；FAQ 保留 15 个页内问答。
- 页头、页脚、URL、HTML 面包屑、BreadcrumbList、ItemList、canonical、sitemap 和站内引用同步。
- 按用户要求退役 21 个本次涉及的旧分类、文章及扁平别名地址，移除 11 条既有本地 Resources 跳转。全部 21 个旧地址通过实际浏览器网络响应验证为 404，无跳转。其他导航及历史原站来源迁移规则保留。
- 原有 8 篇指南的正文、图片顺序及表格逐页比较通过；FAQ 全部正文保留。没有更改产品事实、材料限制、公差条件、交期条件、检验责任或询盘行为。

## 正式页面与归属

| URL | 职责与主要布局 | 图片处理 | 检查状态 |
| --- | --- | --- | --- |
| `/resources/` | 短介绍 → 三个分类条目 → 询价入口；3 个主要模块，按资料目录例外组织 | 取消装饰性目录图片，原文件保留 | 桌面/手机 DOM、首屏及整页视觉通过 |
| `/resources/ordering/` | 介绍 → 4 个采购阶段/5 篇文章 → 空白工作表 → 责任说明及询价；7 个主要模块，责任说明为辅助内容 | 取消四组分类大图，原文件保留 | 桌面/手机 DOM、首屏及整页视觉通过 |
| `/resources/technical-guides/` | 介绍 → 三篇技术文章 → 相关加工实例与采购分类 → 询价；4 个模块 | 取消分类首图和大图文章卡，图片保留在具体指南 | 桌面/手机 DOM、首屏及整页视觉通过 |
| `/resources/faq/` | 介绍 → 3 组/15 问 → 相关指南及询价；原有问答布局保留 | 原有图片保留 | 桌面/手机 DOM 与首屏检查通过；没有重新设计正文 |
| `/resources/ordering/rfq-checklist/` | 采购类三级文章：复制工具、图纸、材料、数量交付、验收工作表；原工具布局保留 | 原 4 张图片保留 | 内容/图片/表格比较及两端 DOM/首屏通过；复制操作通过 |
| `/resources/ordering/compare-cnc-machining-quotations/` | 采购类三级文章：报价范围表、例外与确认记录 | 原图保留 | 内容/图片/表格比较及两端 DOM/首屏通过 |
| `/resources/ordering/machined-prototype-approval-checklist/` | 采购类三级文章：样件目的、验收、批准记录、独立批量放行 | 原图保留 | 内容/图片/表格比较及两端 DOM/首屏通过 |
| `/resources/ordering/prototype-vs-small-batch-cnc/` | 采购类三级文章：样件与批量差异、批准规格、修订与下一单 | 原图保留 | 内容/图片/表格比较及两端 DOM/首屏通过 |
| `/resources/ordering/custom-cnc-parts-shipping-checklist/` | 采购类三级文章：保护标识、责任与时间、文件和真实包装档案 | 原图保留 | 内容/图片/表格比较及两端 DOM/首屏通过 |
| `/resources/technical-guides/critical-features-cnc-drawing/` | 技术类三级文章：功能、可测要求、资料放行、几何与工艺 | 原图保留 | 内容/图片/表格比较及两端 DOM/首屏通过 |
| `/resources/technical-guides/material-and-finish-checklist/` | 技术类三级文章：材料规格、表面处理、涂层/实体区别、记录 | 原图保留 | 内容/图片/表格比较及两端 DOM/首屏通过 |
| `/resources/technical-guides/cnc-process-selection/` | 技术类三级文章：几何对照、真实装夹、关键特征限制 | 原图保留 | 内容/图片/表格比较及两端 DOM/首屏通过 |

详细文章的原模块未为本次迁移删减，保留原页面任务差异；逐页模块标题、数量和图片引用见工作目录 `page-delivery-inventory.json`。目录不套用展示页至少三图的数量要求，此例外已写入 DESIGN.md。

## 实现与内容处理

- `src/data/resourceRoutes.json` 统一公开路径与来源文章身份映射；公开页面不依赖旧地址重定向寻找所属分类。
- `resourceLibrary.ts` 统一文章标题、摘要与父分类；两组动态三级路由分别生成 5/3 篇文章。
- 总览不重复介绍具体文章；下载集中在 ordering 分类和适用指南。公司付款、售后及责任仍链接至 How we work。
- 旧图只从目录展示位置撤下，没有删除素材、重画工厂或伪造证据。本次无新生图需求，未调用 ImageGen。
- `public/image-audit-20261012/index.html` 三处“查看当前页面”链接指向新地址；历史截图、说明和 data-route 身份保持原样。
- FAQ 仍是二级功能页，问答不人为拆成 15 个第三层独立页面。

## 验证

| 检查 | 结果 |
| --- | --- |
| `npm run check` | 0 errors、0 warnings、9 个既有 hints |
| `npm run build` | 通过；144 个 Astro 构建入口，206 HTML，84 个正式 sitemap URL |
| `node scripts/verify-resource-hierarchy.mjs` | 12 个 Resources 页面、5/3 篇三级文章、15 问、92 个共享菜单、899 个资源内链、结构化数据及资源锚点检查通过 |
| `node scripts/verify.mjs --static` | 全部 206 HTML 的内链、资源、标题及兼容页面检查通过 |
| `npm run test:seo` | 通过；84 个 sitemap 地址，188 条全项目历史规则，91 个来源 URL |
| `node scripts/verify-machined-parts.mjs` | 46 个加工零件页面及其导航、旧链接和询价引用回归通过 |
| `node scripts/verify-inquiry-context.mjs` | 草稿关联与来源边界检查通过 |
| 内容保留 | 8 篇指南逐页正文、图片顺序、表格完全保留；FAQ 文本保留。catalog、产品来源表、inquiryContext 散列未变 |
| 实际浏览器 | 1440×900、390×900 下逐 URL 检查 24 个状态：单 H1、canonical、面包屑、当前分类、可见图片、页面/页头溢出和错误覆盖层均通过 |
| 窄屏 | 320px、1100px 下三个目录共 6 个状态均无页面及页头横向溢出 |
| 实际交互 | 手机菜单展开/进入分类/关闭，文章→父分类，Enter/Escape，RFQ 复制成功；指南进入询价页显示 `Inquiry topic: RFQ checklist` |
| 旧地址 | 本地预览刷新启动配置后，21 个退役地址实际返回 404，地址不变，无跳转 |
| 下载 | 两个 TXT 的实际 HTTP 响应为 200，779/1018 bytes，与源文件逐字节一致 |

浏览器下载工具未返回“完成”事件，因此不以该工具宣称浏览器下载保存完成；下载地址响应、内容和链接均已验证。未发送真实邮件、WhatsApp 或业务测试消息。

截图评审覆盖三个目录的两端整页，以及全部页面的首屏与代表指南局部。没有将 DOM 批量检查表述为每页完整正文的人工视觉复核。

## 基线与证据

工作目录为 `D:/lzz/resources-hierarchy-20261016/`：

- `baseline/`、`baseline-hashes.json`、`baseline-pages.json`：保留当时未提交的源代码状态、配置、Git HEAD 及改前正文/媒体引用；不覆盖既有改动。
- `route-mapping.json`：迁移、退役地址与删除的本地规则。
- `before-*`、`after-*`、`full-*`、`full-screenshots.json`：同视口改前/改后首屏、最终整页与菜单证据。
- `browser-checks.json`、`narrow-checks.json`、`retired-http-checks.json`：实际浏览器逐地址结果。
- `content-preservation.json`、`interactions.json`、`inquiry-navigation.json`、`download-http-checks.json`：正文保留、复制与询价和下载验证。
- `source-change-inventory.json`：本次文件清单及需要保留的其他工作区变化。

无剩余代码问题或待补素材。当前本地预览已恢复运行；生产环境未部署。
