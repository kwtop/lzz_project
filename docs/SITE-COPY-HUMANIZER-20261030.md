# 全站英文表达优化

2026-10-30。本轮按用户要求使用 Humanizer，在本地修改正式网站文案。沿用当前 Penta 布局、摄影、配色、字体和已确认的首页主标题，未部署或推送。

## 完成范围

检查 86 个 sitemap 正式 URL；这 86 页的实际正文或共享入口说明均有变化，其中包含全部 35 个产品页。保留已有的专业说明与技术清单，没有要求每一句都重写。另修正 404 页中把零件展示统称为原始图片的说明。

| 页面范围 | 正式 URL 数 | 本轮处理 |
| --- | ---: | --- |
| 首页 | 1 | 加工、检验和案例介绍改为具体动作，保留首屏已确认文字 |
| Capabilities | 12 | 工艺及材料开场、装夹与刀具说明、样件及批次介绍、共用订单条件 |
| Machined parts | 46 | 35 个产品页的特征开场，6 个加工案例的步骤说明，2 个材料集合及目录入口 |
| About | 10 | 公司介绍、合作流程、联系说明、新闻目录及 5 篇真实活动文章 |
| Factory | 1 | 检验计划、量测方法、文件及询价说明 |
| Resources | 14 | 10 篇指南及目录、FAQ；改写开场、部分说明和文章入口摘要，保留专业表格 |
| Quote、Privacy | 2 | 表单引导、首次回复与详细报价的区别、产品资料说明 |

共修改 39 个源码文件，另更新写作规范和 DESIGN.md。全站正文约从 47,737 词变为 47,594 词；这项计数只用于记录范围，不作为写作质量评分。

## 表达变化

工艺页先说明加工对象与难点，再说明我们怎样评审和加工。普通介绍段落减少连续的 Define、Specify、Agree、Include；技术表格和采购清单继续使用必要的操作要求。

产品页保留对象、工作接口与工艺条件，重写全部 35 个特征区开场。移除 35 段重复的 “The linked study explains…” 文字，原相关加工图片和链接保留。这些段落重复的是正文已经讲过的定位、装夹或访问问题。

加工案例用供应商视角说明新零件的规划过程，保留照片所记录的工序与一般规划建议之间的区别。没有把通用步骤写成照片已经证明的加工次序。

公司新闻直接说明已经发生的事件。日期、地点、参与者和照片身份保留，没有添加人物感受、引语、合作成果或订单。企业认可与教学合作仍分别说明，不代替 ISO 9001 证书。

资源入口说明读者能解决的问题，长文保留专业推理、参考链接、技术数值及适用条件。五篇长指南的修改日期更新为 30 October 2026，新闻事件日期保持不变。

| 位置 | 修改前 | 修改后 |
| --- | --- | --- |
| 铣削开场 | CNC milling creates pockets, flat faces and hole patterns… | We mill housings, brackets and other custom parts with pockets, flat faces and hole patterns… |
| 产品特征说明 | Show pocket depths, wall thicknesses and the surfaces locating internal components… | Pocket depths, wall thicknesses and internal locating surfaces define the housing… |
| 资源入口 | Understand setup, quantity, geometry and the work behind a drawing-based quote. | How setup, quantity and geometry affect the work included in a quote. |
| 询价回复 | This is the first human reply after we receive your inquiry. | This is our initial response after receiving your inquiry. |

## 保留与验证

逐页对照修改前后的实际构建正文，86 页的 URL、canonical、锚点 ID 和内部链接目标全部一致，77 张技术表格文字一致。排除文章修改日期后，逐页数值集合一致。设备数量、公差、材料牌号、起订量、生产起算条件与运输附加时间保留；数字检查之外也复核了修改段落的语义和条件。

对比修改前后 TypeScript / TSX 的语法结构，除文字值外的代码结构一致。询价字段、传输、文件限制、来源上下文和成功判断没有修改。FAQ 和表单继续区分首次回复与完成报价；服务器确认保存后才显示成功编号，服务未配置时的替代联系方法保留。

| 检查 | 结果 |
| --- | --- |
| `npm run check` | 1021 files，0 errors、0 warnings；9 个既有 hints |
| `npm run build` | 147 个 Astro 页面构建完成，SEO 后处理完成 |
| `npm run test:seo` | 216 HTML、86 sitemap URLs、188 redirects 通过 |
| `npm run test:site` | 本地文件、锚点、询价字段、回复说明和旧流程检查通过 |
| `npm run test:inquiry` | 询价来源、必填联系信息、工艺、附件限制与传输状态检查通过 |
| 真实浏览器 | 10 个代表页面，各检查 1440×1000 与 390×844，共 20 个视图；未发现横向溢出 |

浏览器代表页为首页、铣削、五轴、铝壳产品、车后铣案例、澳大利亚客户参观新闻、图纸指南、工厂、询价和 FAQ。实际查看了改写区域的段落、换行及技术表格，截图存于任务记录。询价验证属于本地功能检查，本轮没有发送真实询盘或验证远端送达。

## 记录与回退

完整记录在 `D:/lzz/项目记录/全站文案润色-20261030/`：

- `before-pages.json`、`after-pages.json`：86 页的实际正文、标题、链接、表格及数值核对依据。
- `content-verification.json`、`page-coverage.csv`：逐页变化及保留检查。
- `source-changes.json`、`edits.json`：源码变化和逐条替换记录。
- `source-before/`：修改前文字值的源码回退副本。初次目录复制未落盘，已用原始正文和逐条替换记录恢复文字；字符串引号格式可能与最初文件不同。`source-midpass/` 是经系统复制验证的中途源码检查点，不标作原始版本。
- `shots/`、`browser-checks.json`：一组五轴页修改前截图及 20 个修改后桌面/手机视图和阅读记录。
- `check.log`、`build.log`、`seo.log`、`site.log`、`inquiry.log`：本轮检查结果。

工作区原有改动保留。回退时只选择本轮文字差异，避免用整个副本覆盖后续工作。本地完成，未上传 GitHub、Cloudflare，未验证线上页面或线上收件状态。
