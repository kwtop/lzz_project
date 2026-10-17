# LZZ 信息减法与留白调整

2026-10-01，本地实施与验证。用户授权：按已讨论的“精密制造企业产品册”方向，减少重复内容、微小入口和装饰图，让真实零件、现场和技术判断承担主要层级。

## 完成范围

17 条内容路由完成结构与内容减法：10 个能力详情、4 篇指南、Quality、About、Factory。全站 81 条内容路由共用新的正文与留白规则，沿用原有品牌、三类模板、Astro / React、数据和询价方式。

| 页面 | 已完成的减法 | 保留的判断依据 |
| --- | --- | --- |
| 10 个能力详情 | 删除首屏下方微型目录、重复首张零件图和几何 AI 示意图；工艺细节并入范围章节；案例限制为一个主案例及最多两个直接展示案例，其余可展开；图纸与检验合成一个章节；减少通用输入项和中段重复行动 | 工艺、材料、装夹、图纸、验收、询价的独有内容；尺寸与精度限定；全部案例入口和相关采购资料 |
| RFQ Checklist | 删除大幅 AI 示意图和重复目录；两个 TXT 入口合成一个；五项准备清单直接开篇 | 图纸主控版本、验收、材料与表面、商业条件、样品限制、NDA、本地草稿及发送步骤 |
| How We Work | 删除三幅 AI 图、Chapter 标签和重复章摘要；报价五项并入第 2 步；减少中段 RFQ；事实信息改为桌面两列、手机单列 | 六步骤、报价范围、变更影响、样品与批次批准、材料记录、真实包装档案、交期与运输区分 |
| Shipping | 合并保护、文件、运输的同义说明，让五主题清单成为主体；补充运输与进口说明进入一个原生折叠；修正清单行与表头对齐 | DDP 不是自动包含、责任分配、文件约定、交期起算、真实三张包装图及原图链接 |
| Prototype | 删除顶部重复阶段摘要、大图与装饰性大序号 | 三个阶段的独有要求、供应商比较、图纸变更及小批量经济性限定 |
| Quality | CMM 照片只展示一次；报告与订单文件合成章节；空白格式收为原生折叠，示例表格从三行减为一行 | 标题常驻 `blank / no results`；全部字段、抽检、批准 hold point、追溯、校准及 ISO 核验范围 |
| About / Factory | About 聚焦身份、公司事实、发展、团队与文件；产品与应用内容可展开；移除末尾 AI 图与重复工厂入口。Factory 四步改为短文字，采购细节合成一个折叠，包装图并入现有真实图库 | 已有公司事实、独有产品/现场照片及原图访问、设备、检验、完整采购与交付条件 |

只减少展示实例与重复说明，没有删除素材文件。重要条件仍在正文或明确命名的折叠内容中；来源与合规限定继续就近呈现。

## 共有排版

- 主体正文 17px；技术表格、规格和输入角色仍为 16px，必要图注 14px。沿用 Inter、现有标题层级与品牌红。
- 决策页一般章节上下各 60px，阅读指南一般章节上下各 48px；相邻主要章节形成约 120 / 96px 的分隔。手机一般上下各 32px。连续文章段落沿用紧凑阅读节奏。
- 阅读开篇桌面上下 64 / 48px、手机 40 / 32px。描述与标题之间桌面 24px、手机 20px。
- 容器继续为 1140px 上限，最小侧边留白 48 / 32 / 20px。原有主动作保持 `#CB1217`、15px / 600、48px 最小高度、2px 圆角；导航动作保持 44px。
- RFQ 的五项清单自身带锚点，因此删除另一份目录。其余长指南保留可用的原生目录与折叠，手机初始收起。

## 验证证据

| 检查 | 结果 |
| --- | --- |
| `npm run check` | 0 errors / 0 warnings；保留原有一个 unused-import hint |
| `npm run build` | 成功；Astro 83 页面，SEO 后处理保持 81 sitemap URLs |
| `npm run test:seo` | 90 HTML、81 sitemap URLs、93 redirects、91 discovered URLs 通过 |
| `node scripts/verify.mjs --static` | 90 HTML 的链接、资源、标题及跳转壳通过 |
| `node scripts/audit-minimalism.mjs` | 81 路由、54 / 26 / 1 模板、SEO/schema、H1、全部原 main ID 保留；内部锚点和媒体引用缺失均为 0 |
| 数据保护 | 42 个 `src/data` 文件前后哈希一致；134 个 src 文件中修改 9 个，无新增或删除 src 文件 |
| 能力内容核对 | 10 页的 70 条范围、图纸、验收和 RFQ 原文均在当前 HTML 中保留 |
| 实际浏览器排版 | 全部 81 页各检查 1440 / 768 / 390px，另抽查 9 页 320px；252 个页面与尺寸组合均无页面横向溢出 |
| 原生折叠 | Quality 桌面及手机用 Enter 展开，只有一条空白示例行，`blank / no results` 常驻；红色 2px 键盘焦点可见 |
| 深链接 | 铸件 `#sample-to-part`、About `#part-studies` 会自动展开祖先折叠，聚焦目标；About 三张产品图及三个工程入口可访问 |

保存了 14 个代表页面的桌面与手机首屏共 28 张截图、5 个页面的桌面与手机长图共 10 张，以及报告展开、技术要求等补充截图。修正 Shipping 列对齐、How We Work 事实栏和阅读描述间距后，对受影响的 28 页进行了三种尺寸确认。

静态审计会逐页记录文字、图片实例和链接数量变化；这些减法已获授权，不把减少重复实例视为内容保护失败。报告在 [invariants.json](D:/lzz/lzz/_react/docs/minimalism-2026-10-01/invariants.json)，浏览器记录在同目录的 `*-metrics.json` 与 `interaction-checks.json`。

媒体引用与文件存在性已验证；本轮没有建立 public 起始字节哈希，因此不声称完成媒体字节的前后对比。HTML 与浏览器验证均针对本地构建，不代表生产主机或外部链接验证。

## 源码与复核入口

9 个修改文件：四个指南组件、能力详情模板、Quality / About / Factory 及 [page-system.css](D:/lzz/lzz/_react/src/styles/page-system.css)。另新增 [audit-minimalism.mjs](D:/lzz/lzz/_react/scripts/audit-minimalism.mjs) 作为复核工具。

改动前完整 src 与 DESIGN.md 保存在 `before/`；`source-before.json`、`before-render.json`、`after-render.json` 和 `invariants.json` 保留比较依据。原有 `template-unification-2026-10-01` 记录没有覆盖。

- [RFQ 本地预览](http://127.0.0.1:4323/resources/rfq-checklist/?minimalism=20261001)
- [能力页本地预览](http://127.0.0.1:4323/capabilities/cnc-milling-service/?minimalism=20261001)
- [Quality 本地预览](http://127.0.0.1:4323/quality/?minimalism=20261001)
- [How We Work 本地预览](http://127.0.0.1:4323/resources/how-we-work/?minimalism=20261001)

本轮仅本地实施。没有部署、GitHub 推送或对外发送；询价仍由网站生成本地邮件草稿，由用户在邮件应用中审核、附图并发送。
