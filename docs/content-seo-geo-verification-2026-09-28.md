# 内容 SEO/GEO 审计：主代理复验证据

日期：2026-09-28。配合 `independent-content-seo-geo-audit-2026-09-28.md` 阅读。本轮仅研究、取证和报告，不修改业务源码、不部署。独立代理以 `fork_context:false` 启动，输入为项目路径及用户审计要求文件，而非此前对话。

## 当前版本与技术边界

- 在 `D:/lzz/lzz/_react` 实际运行 `npm run build`：75 HTML；35 产品；73 sitemap URLs；86 重定向规则。
- `npm run test:seo` 通过。`node docs/content-upgrade-2026-09-28/verify-content.mjs` 检查 4766 链接和图片引用，0 failures。
- 75 个构建 HTML 的 title 和 description 无重复；H1 均一个。
- noindex 仅 `/404.html` 和 `/preview/home-editorial/`，这两页不输出 canonical；未把预览页排除当成错误。
- 其余页面 canonical 与 sitemap 指向 `https://www.lzz-cnc.com`；`robots.txt` 允许抓取。仅证明构建配置，不证明正式域名已切换。
- 4324 上全部 75 个产物路径可访问；不存在的 `/no-such-audit-page/` 返回 HTTP 404。直接访问静态 `/404.html` 文件为200，与未知路径404区分。
- 4323 开发首页当前 HTTP 200。首页、质量、代表产品详情、FAQ 的 main 正文与本次 dist 一致（排除脚本/样式并归一空白）。开发响应含额外脚本，不以 HTML 字节数当内容差异。
- README 含旧版60/59页计数及过时导航名称，不用作当前全站结论。
- 全站链接图包含 `<noscript>` 的完整产品备用目录时，所有73个正常页面均可从首页两次静态链接跳转内到达；无正常孤页。只解析启用JS时的精选列表会错误漏算一个产品，已读取组件并用 `scriptingEnabled:false` 复算；不把“View all”按钮直接定为抓取阻断。
- 未验证正式域名、CDN/WAF、线上重定向执行、Search Console 收录、搜索排名、真实流量、真实用户性能及 AI 引用。

## 浏览器路径取证（4323）

### 1. 首页 → 能力 → 五轴 → 产品 → 询价

实际点击：`View machining capabilities` → `5-axis machining 14 examples` → `Multi-axis milled cavities & angled parts` → `Request a quote`。

- 路径连通，工艺页存在适配、材质、检验、实际工序照片、工厂及质量记录入口。
- 有 Indexed 3+2 与 simultaneous five-axis 的技术说明，不应报告这两类技术完全缺失。
- 但机器行程、载荷、最大工件包络未公开，采购商无法仅凭页面完成设备尺寸适配核验。
- `Is this process right for your part?` 与 `Service overview` 重复曲面、叶轮、材质和尺寸说明。应合并重复内容，让能力边界更易扫读，而非增加篇幅。
- 能力总览呈现五类服务，详情的 `Machining processes` 快捷导航当前四项、不含塑料加工；应澄清分类口径/入口，不贸然重构URL。
- 产品上下文可传递，但传入的是旧长标题 `Custom High-Precision CNC Milling & 5-Axis Machining Services (OEM/ODM)`，与前一页短标题不同。建议用展示名称加来源链接/稳定产品标识，而不是回退到SEO长名称。
- 询价页清楚表明只生成邮件草稿、未自动发送或上传；不将点击入口等同于销售收到有效询盘。
- 本轮在4323独立测试：空表触发name/email/project必填验证并聚焦name；填写虚拟`audit@example.com`后生成草稿并显示`Nothing has been sent`。随后清空测试输入。没有打开邮件客户端或真实发送，无服务端接收链路可测试。
- 两个现有下载文件本轮HTTP复验200：`order-acceptance-checklist.txt`（988 bytes）、`lzz-company-profile-2026.pdf`（750334 bytes）。这里只验证访问与类型，不把PDF可下载当成其能力声明已核实。

### 2. 指南直接进入（390px）

`/insights/cnc-process-selection/` 有明确比较标题、真实工序照片、目录及工艺比较表。页面无横向溢出；620px表格置于327px `overflow-x:auto` 容器中，保留完整三列内容。

首屏标题与照片占据主要空间，直接答案在图后。建议将2–3句结论放在图前，保持其余图文风格，不增加新的长段落。此为信息优先级建议，不是抓取阻断。

### 3. 结构化数据

浏览器实际 DOM 可见 Organization、WebSite、WebPage、BreadcrumbList；五轴页组织名称、联系方式和语言信息存在。文章模板另输出 Article。不能因没有 Product/FAQ 特殊标记就认定SEO失败，也不能伪造价格、库存或评分来填充标记。

## 已有答案不应误报为缺失

- 起订量与交期口径：1件；图纸和订单确认后7–14工作日，含表面处理，运输另计。
- 工艺选择比较、材料牌号候选、RFQ准备、报价范围、首件/尺寸/材料/表处文件、包装与运输文件已有内容。
- 不合格争议的初步处理已有 `/insights/how-we-work/` 的 `Review, approval and issue resolution`，不是完全没有售后内容。
- 上述订单交付承诺与已完成订单的实物/实测证据是两回事。
- Quality 公开的是检验流程、设备照片与空白记录示例；不是已经公开客户实测报告或 ISO 证书全文。ISO 是网站及公司确认的声明；公开核验链仍不完整。

## 对独立评审关键发现的交叉核对

- `src/components/EngineeringScope.astro` 当前确实将 `overview.items[0].text` 拼入 Geometry，并以标题正则选 Material 内容；字段语义错配有代码原因，不只是文案偏好。整改应显式定义几何、材料、尺寸和检验字段，不能继续按数组位置推断。
- `src/data/refinedImages.ts` 的35个产品映射与 `docs/image-audit/catalog-cutout-edits.json` 相互对应，记录的method含imagegen及reused-homepage-imagegen-cutout。它们是原图参考下的精修资源，不能一概称为从零伪造产品；但 `Gallery.tsx` 当前仅渲染精修图，缺原图入口及CAD/精修区分。建议完善可核对来源，而非声称35件产品都是假的。
- FAQ对应问题有稳定ID，关键条件能从静态HTML取得；“有FAQ内容”并不意味着每页都需要FAQ schema。

## 外部对照与适用边界

查阅日期2026-09-28；英文国际采购内容样本，不是指定地区Google排名调查。

- [Google AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)：AI Overviews/AI Mode 沿用SEO基本要求；没有额外专用schema或AI文件要求。可抓取正文、可发现链接及准确语境优先。
- [Google people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)：用于核对有帮助、可靠、以用户为中心的内容方向，不把固定字数当达标线。
- [Protolabs CNC services](https://www.protolabs.com/services/cnc-machining/)：其能力表按加工方式及不同交付体系区分尺寸和公差边界，并连接设计资料。值得借鉴的是“能力条件可比较”的表达，不是移植他们的数值。
- [Xometry CNC services](https://www.xometry.com/capabilities/cnc-machining-service/)：区分默认检验与额外详细报告，并设检验服务入口。其供应商网络模式不同于LZZ制造商定位；只比较采购问题覆盖，不复制能力和资质。

没有搜索量、竞争难度、地域排名或AI引用率数据，报告不提供这些伪精确指标。

## 转化测量建议（未接入）

按阶段记录 `capability_view`、`part_example_view`、`quote_start`、`draft_prepared`、`draft_copy`、`draft_download`、`email_app_open`、`whatsapp_click`。事件附页面类别、来源URL和稳定产品ID；不采集图纸内容或个人表单明文。

`draft_prepared`/`email_app_open` 不能叫 inquiry_received。邮件接收及销售确认需独立系统或人工归因，当前不能宣称闭环已被追踪。
