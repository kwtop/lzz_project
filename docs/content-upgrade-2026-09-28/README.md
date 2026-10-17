# 服务内容与证据链补充 — 2026-09-28

## 本轮落实

依据用户本轮对通用 CNC 服务与交付能力的确认，内容从反复询问“是否可提供”转为说明“提供什么、何时交付、需要什么输入”。未改变网站栈、导航架构、邮件草稿流程及已确认的业务口径；未部署。

- 工厂页：新增四阶段交付清单，连接报价范围、质量文件及包装发货。
- 10 个能力页：按工艺/材料补充服务与交付说明；链接真实设备及对应质量内容。
- 质量页：新增首件、尺寸、材料、表面处理四类可订购文件；可下载订单验收清单。
- 4 篇指南：补充报价包含项与单列费用、首件审批与异常处理、表面处理验收、包装保护及运输文件。没有承诺免费无限返工、所有文件默认免费或所有目的地默认 DDP。
- 发货指南：保留真实历史包装照片；简化重复的内部审计式说明；新增一张写实包装示意图并明确 AI 标识。
- 新增 `public/downloads/order-acceptance-checklist.txt`，是采购工作表，不是已完成检验报告。

## 证据分层与对应入口

| 说明 | 依据 | 网站入口 | 边界 |
|---|---|---|---|
| 车间与加工现场 | 原始资料照片，见 evidence.generated.json 的 source/sha256 | factory、capabilities、cases | 不从照片推断机器行程或当前数量 |
| 检测设备现场 | cmm-room、cmm-detail 原图 | quality | 设备照片不替代校准证书 |
| 包装活动 | shipment-2022-order-packing、shipment-2022-prepared-load | shipping guide | 保留 2022 年日期，不虚构国家或客户 |
| 加工、首件、记录及交付服务 | 用户 2026-09-28 确认可承接同行相关服务；现有制造资料及流程 | 10 个能力页、factory、quality、4 篇指南 | 是面向新订单的服务范围，不是历史完成记录 |
| MOQ、周期、ISO | 用户此前明确确认 | 原有 CompanyFacts/报价及本轮指南 | 1件；确认后7–14工作日含表面处理，运输另计；不伪造证书编号 |
| 保护方式示意 | 本轮 Imagegen 生成 | shipping guide | 图注与 alt 均标识 AI，不作真实发货证据 |

本轮重新计算 `src/data/evidence.generated.json` 中 39 个源文件的 SHA-256，与 `D:/lzz/原始资料` 对应文件核对：39 个一致，0 个缺失或不一致。原始资料未改动。历史照片的日期/场景沿用已有来源清单，未声称独立鉴定每张照片拍摄事实。

## 同行参考

核对日期：2026-09-28。仅参考客户问题、服务组织方式与交付物类别，不把同行能力当作 LZZ 的历史证据。

- [3ERP FAQ](https://www.3erp.com/faqs/)：报价输入、DFM、首件、材料/表面处理及质量文件的组织方式。
- [WayKen 五轴服务](https://waykenrm.com/technologies/5-axis-cnc-machining/)：区分定位加工和联动加工，以零件几何决定路线。
- [RapidDirect CNC 服务](https://www.rapiddirect.com/services/cnc-machining/)：把加工、工程支持、检查和后处理作为完整服务呈现。

未移植同行的设备型号、精度数值、24小时响应、付款比例、产能或认证。网络读取使用网页工具；Jina 访问在本机 TLS 环境失败后改用其他读取渠道。

## 图片记录

- 内置 Imagegen 输出：`C:/Users/Administrator/.codex/generated_images/01a08056-5016-7b82-bfd6-6266c7c7f28e/exec-b9060c8b-31c9-43a7-950d-98e4e5d1a9a3.png`
- 保留原件：`public/media/editorial/packing-protection-illustrative-v2-original.png`
- 响应式 WebP：同目录 `packing-protection-illustrative-v2-{480,800,1200,1536}.webp`，sharp quality 82。
- 用途：分隔包装、泡棉保护和端部保护的说明；不代表客户产品或实际订单。不替换真实证据照片。
- 图注：AI-generated packing illustration. Shows protective separation and capped features; not a photograph of an LZZ shipment.

### Imagegen prompt

Use case: photorealistic-natural. Website editorial illustration for protecting custom CNC parts during packing. Create a realistic close-up landscape 3:2 commercial photograph of a single generic machined aluminum housing resting in a accurately fitted dark closed-cell foam insert inside an open clean corrugated cardboard box, one adjacent partition holding a small turned steel shaft, threaded ends capped. Realistic natural metal machining texture, soft daylight, restrained neutral industrial workbench background, credible practical scale and natural imperfections. No people, no logos, no text, no labels, no documents, no shipping address, no certificate, no measurements, no claims. This is explicitly an illustrative packing example and will be captioned AI-generated on the website, not proof of an actual company shipment. Show coherent simple part geometry and protective separation, no dramatic staged factory or fake evidence.

## 仍需真实文件补足的环节

可以先发布已确认的服务能力，不以文件缺失阻断内容建设。但供应商审核阶段的 ISO 证书文件/范围/有效期、仪器校准记录、脱敏实测报告、具体客户或出口订单的闭环记录仍应来自实际业务。这里没有生成或借用同行文件冒充这些证据，也没有把空白清单标为验收通过。

## 验收

- `npm run check`：133 files，0 errors/warnings/hints。
- `npm run build`：69 页构建成功。
- `npm run test:seo`：69 HTML、68 sitemap URLs、86 redirects、91 raw URLs 通过；不代表线上主机验证。
- `node docs/content-upgrade-2026-09-28/verify-content.mjs`：69 页、4035 个内部链接/图片引用及跨页锚点，无失败。
- 浏览器抽查：390px 工厂交付模块、1440px 发货指南及新图、768px 质量文件模块；截图在 screenshots/。生成图片已实际加载。
- 未运行包含独立 Playwright 浏览器操作的旧 `test:site`；UI 检查使用当前浏览器控制工具。未真实发送邮件，未部署。
- 本轮不是全站所有搜索意图或所有原始文档的完整取证。原有 SEO 审计的其他事项不在本轮完成声明内。
