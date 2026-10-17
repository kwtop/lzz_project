# 全站三类模板与按钮统一

2026-10-01，本地实施与验证记录。用户范围：统一版式与按钮，按三类模板推进全站。

## 实施结果

81 条 sitemap 内容路由已按访问任务分类，统一容器、章节留白和动作样式。保留现有 Astro / React、字体系统、原始媒体、数据、SEO 和询价行为。

| 模板 | 页数 | 覆盖 | 版式职责 |
| --- | ---: | --- | --- |
| `decision` | 54 | 首页、产品及目录、能力、公司、案例索引、联系页 | 保留实物或公司影像开篇；统一内容边界、章节节奏与询价动作 |
| `read` | 26 | 资源 12、案例详情 8、公司新闻详情 5、Privacy 1 | 短开篇、阅读章节、适用时的目录、相关出口和结束动作 |
| `operate` | 1 | Quote | 输入、草稿审核与辅助说明分区；保留本地草稿操作 |

资源索引及三个主题入口保留短横幅和分类导航，使用阅读模板的共有宽度、字号层级与动作。详情页使用 `ReadingHeader`；长指南和案例使用 `PageContents`，无需目录的新闻及 Privacy 不强加目录。

## 共有规则

- 容器上限 1140px。页面最小侧边留白为桌面 48px、平板 32px、手机 20px；大屏在容器外自然居中。章节间距区分决策页和阅读页。
- 主动作使用 `#CB1217`、15px / 600 字重、2px 圆角、48px 最小高度和 12px 20px 内边距。导航询价为 44px 紧凑变体；长标签可换行增高。
- 独立次要出口使用明确描边。辅助文字动作、正文引用、导航、产品卡和筛选控件保留各自职责。照片开篇的次要动作使用反白色；键盘焦点保持可见。
- 阅读 H2 上限 32px。共有目录为原生 `details`，桌面和平板初始展开，760px 及以下初始收起；键盘可操作。
- RFQ 五项准备要点移到图片前；Shipping 五主题清单及真实包装档案前置；How We Work 改为短开篇和六步目录；Prototype 的顶部阶段提示降为正文层级。
- 案例摄影范围说明收起时保留首句，完整说明仍可展开。相关内容位于结束动作之前。Privacy 去除旧 H2 外边距与新章节留白的叠加。

## 实际源码范围

共 15 个源码文件：11 个修改、4 个新增。完整清单与哈希见 `verification-summary.json`、`source-before.json` 和 `source-after.json`。

新增：

- `src/data/pageTemplates.ts`：访问任务分类。
- `src/styles/page-system.css`：最后加载的共有版式和动作规则。
- `src/components/ReadingHeader.astro`：阅读开篇。
- `src/components/PageContents.astro`：目录。

修改 `Layout.astro`，以及资源文章、四篇独立指南、案例模板、PrismaticStudy、MayTeamOuting、FAQ 和 Privacy。现有 `src/data` 文件均与改动前哈希一致，没有删除源码文件。

## 内容保真

`node scripts/audit-page-templates.mjs after` 对 81 页验证：每页一个 H1，SEO title / description / canonical / schema 不变；既有锚点、链接目的地、图片 src / alt 以及原有来源标记无丢失；新目录锚点有效。结果为 0 failures，见 `invariants.json`。

词频减少的八页已独立复核：七个普通案例去除了面包屑内重复的整句标题，标题保留在 H1；FAQ 去除了 `01–11` 装饰序号。工程正文、摄影说明、全部问答、七项报价输入和快速事实均保留。How We Work 开篇图补充了与既有说明一致的 `AI-generated` 内部来源标记。没有新增制造能力、客户成果或证书事实。

## 本地验证

| 检查 | 结果 |
| --- | --- |
| `npm run check` | 0 errors / 0 warnings；1 个既有 hint：`verify-company-pages.mjs` 的未使用 `load` |
| `npm run build` | 成功；Astro 83 个入口，SEO 补齐后共 90 HTML |
| `npm run test:seo` | 90 HTML、81 sitemap URLs、93 redirects、91 raw URLs 通过 |
| `node scripts/verify.mjs --static` | 90 HTML 的链接、资源、标题和跳转壳通过；最终构建后复核通过 |
| 内容保真脚本 | 最终构建后 81 页、0 failures |
| 浏览器尺寸 | 1440×1000、768×1024、390×844 各覆盖 81 路由；320×740 抽查 6 路由，共 249 次路由尺寸检查，均无横向溢出 |
| 桌面 / 手机主按钮 | 正文主动作实测共有一套颜色、字体、圆角和内边距；48px 高。平板三处按钮标签换行，按最小高度规则自然增高 |
| 实际画面 | 18 个代表路由保存桌面、手机截图并目视核对；另保存四篇长指南的完整页面 |
| 操作 | 手机目录键盘展开、章节跳转通过；表单空值校验、生成未发送草稿、编辑、清除通过；测试输入已清除 |

尺寸指标记录在 `desktop-metrics.json`、`tablet-metrics.json`、`mobile-metrics.json`、`narrow-metrics.json`。最后的 Privacy 留白修正在重新构建后，单独复核并更新桌面、平板和手机记录及截图。

浏览器截图使用明确视口范围；曾出现的设备缩放裁切已重新捕获，不作为站点溢出问题。页面高度只是排版指标，不代表性能或转化提升。

## 预览与证据

- 本地预览：`http://127.0.0.1:4323/?templates=20261001`。
- 阅读样例：`http://127.0.0.1:4323/resources/rfq-checklist/?templates=20261001`。
- 三类对照：`screenshots/templates-overview.png`。
- 截图路径索引：`screenshots/index.json`。
- 改动前源码：`before/src/`；改动前设计记录：`before/DESIGN.md`；改动前页面快照：`before-render.json`。

本次完成本地实施和验证，未部署、未切换域名或正式流量。询价仍在浏览器准备草稿，由用户在自己的邮件应用发送；本次验证没有发送邮件。原图质量、跨页相近说明和内容层面的进一步精简不属于这轮版式与按钮改动。
