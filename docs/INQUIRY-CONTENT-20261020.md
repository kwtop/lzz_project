# 未上线新版本：询价与内容优化

2026-10-20。本轮完成本地实现与验证，未部署 Cloudflare，未接通真实收件、上传或送达服务。

后续用户已授权并完成当前版本的 Cloudflare 预览发布，见 [发布记录](./cloudflare-preview-2026-10-20.md)。真实询价后台仍未接通。

后续表单调整已按用户的新要求增加姓名、目的地国家、联系方式切换与可选零件/工艺选择；当前表单契约和本轮验证见 [INQUIRY-FORM-20261020.md](./INQUIRY-FORM-20261020.md)。以下询价字段与适配器结构保留为上一轮实现记录。

## 本地预览

- [询价](http://127.0.0.1:4323/quote/)
- [工厂适配表](http://127.0.0.1:4323/factory/#equipment)
- [6061 / 7075 材料选择](http://127.0.0.1:4323/resources/technical-guides/6061-vs-7075-cnc-aluminum/)
- [图纸与检验示例](http://127.0.0.1:4323/resources/technical-guides/critical-features-cnc-drawing/#teaching-example)

## 实现范围

### 询价

`QuoteForm.tsx` 已直接替换旧流程。只要求一个邮箱或带国家代码的 WhatsApp 号码；留言和图纸可选。产品、服务、文章、工厂及共享导航/页脚入口携带主题和站内来源。姓名、旧产品选择器、草稿预览、复制、TXT 保存、清空弹窗、存储隔离和刷新恢复已删除。

文件数量、总大小、格式及显示文案由 `src/lib/inquiryForm.ts` 集中配置：最多 5 个、合计 20 MB，PDF、STEP/STP、IGES/IGS、DXF/DWG、JPG/PNG、ZIP。选中文件显示名称与大小，支持逐个删除；不合规的一批文件不会加入，之前的有效选择仍保留。

`src/lib/inquirySubmission.ts` 接收以下结构，不绑定服务商或接口地址：

```ts
{
  contact: {kind: 'email' | 'whatsapp', value: string},
  message: string,
  attachments: readonly File[],
  context: {reference?: InquiryReference, part: string, source: string}
}
```

结果为 `sent`、`failed`、`unavailable`。当前默认适配器只返回 `unavailable`，不会发起上传或发送。页面明确显示未发送，保留输入和文件，并提供邮箱与 WhatsApp。提交期间禁用输入和重复提交；只有适配器明确返回成功才显示成功结果。本地测试适配器位于项目记录目录，未加入公开路由或构建产物。

“We reply within 12 hours.” 指首次人工回复。询价、联系页、FAQ 和隐私说明已同步；详细报价可能需要进一步图纸或制造信息。当前页面没有跨刷新保存，隐私说明与实际行为一致。

### 内容与教学

正式 86 个页面全部复核，80 页正文或 CTA 有调整；新闻目录及 5 篇原始新闻的正文、日期和事件信息保留。逐段处理产品、能力、采购指南及公司说明中的机械开头和重复要求，未做全局同义词替换。

两篇重点长文按材料选择、图纸准备及检验要求重构，各自末尾 FAQ 从 10 条减为 3 条；正文独有的技术条件保留，重复问答合并。两篇不含新增教学模块的正文分别减少约 32% 和 39%。其他三篇长指南也合并了重复问答。5 篇带编辑日期的长文均更新为 20 October 2026，FAQ 正文与结构化数据保持同源。

共用 `src/data/teachingMountExample.ts` 的 EX-MOUNT-01：6061-T6、60 × 40 × 12 mm、A/B/C 参考面。SVG、HTML 表格和 CSV 都使用该数据及同一计算函数。

| 编号 | 要求 / mm | 范围 / mm | 教学读数 / mm | 结果 |
| --- | --- | --- | --- | --- |
| F1 | 10.00 ±0.02 | 9.98–10.02 | 10.01 | Pass |
| F2 | 20.00 ±0.05 | 19.95–20.05 | 20.03 | Pass |
| F3 | 12.00 ±0.05 | 11.95–12.05 | 12.08 | Fail；暂停放行 |

图纸、网页与下载都明确标注教学用途，不是实际客户、实测检验或交付证明。手机可点开图纸并放大、平移；检验表按特征纵向排列。下载入口：`/downloads/ex-mount-01-teaching.svg`、`/downloads/ex-mount-01-teaching-inspection.csv`。

技术引用核对记录为 `teaching-technical-review.json`。使用 Kaiser、Hydro、ASME、Mitutoyo、BIKAR、AAC 等一手资料；AAC 直接访问返回 403，相关既有非数值说明通过官方索引核对，没有因此添加数值或能力声明。

### 工厂

设备区改为铣削、车削/车铣、多轴加工三行适配表，覆盖常见零件、几何与装夹关注点和 6 个现有加工示例。手机按工艺条目重排。新增尺寸、毛坯、重量、材料及夹持限制说明和带 `source=/factory/#equipment` 的询价入口。

保留 40+ 加工及辅助设备的准确口径。定位多面与连续五轴按原理区别说明，未把连续五轴写成已确认在用能力；没有补写设备型号、行程、最大尺寸或精度。1 件起订、生产 7–14 工作日的起算点/表面处理/运输条件、ISO 声明、参考产能及公差限制均保留。

## 验证结果

| 检查 | 结果 |
| --- | --- |
| `npm run check` | 0 errors、0 warnings；9 条既有 hints |
| `npm run build` | 成功，146 条 Astro 构建路由，215 个 HTML 输出（含原有跳转页和历史预览） |
| `npm run test:seo` | 86 个 sitemap URL、188 条原有重定向及 91 个原始 URL 覆盖通过 |
| `npm run test:site` | 8,475 处本地引用、641 处页面锚点、正式页 H1/唯一 ID/旧草稿说明检查通过 |
| `npm run test:inquiry` | 联系方式、可选项、附件边界、来源安全及适配器结果通过 |
| `npm run test:teaching` | 3 项单源、图纸和 Pass/Fail 边界测试通过 |
| `node --test scripts/optimize-css.test.mjs` | 8 项通过 |
| HTTP 本地探针 | 86 个正式页面和两个教学下载全部 200 |
| 浏览器响应式 | 10 类代表页面 × 320/390/768/1440 px，共 40 个状态；无横向溢出或已加载损坏图片 |
| 浏览器交互 | 仅邮箱/仅 WhatsApp、错误定位、文件增删/限制、未接通、提交中、失败、测试成功、来源上下文、刷新清空、教学放大/下载、筛选及手机菜单通过 |
| FAQ | 15 条可见答案与 JSON-LD 完全一致 |
| 下载 | 实际下载的 SVG、CSV 与最终构建文件逐字节一致 |
| `git diff --check` | 通过，保留之前已有改动 |

来源及制造声明复核使用前后正式页快照，未发现上述关键声明被删除或强化。品牌色、核心栏目与既有导航动效保持原有设计。

## 记录与回退

完整记录：`D:/lzz/项目记录/询价与内容优化-20261020/`。

- `before/`：改动前应用源码、脚本与契约文件；`CONTENT-WRITING.md` 原本为干净文件，另从 Git HEAD 保存。
- `source-changes.json`：本轮实际修改文件及前后 SHA-256，排除此前已有改动。
- `before-content.json`、`after-content.json`、`formal-content-review.json`：86 页前后正文及上下文/制造声明复核。
- `check.log`、`build.log`、`test-*.log`、`http-route-results.json`：项目与路由检查。
- `interaction-browser.json`、`responsive-browser.json`、PNG 截图、`verified-downloads/`：浏览器验收及实际下载。
- `inquiry-adapter-harness.tsx`、`serve-adapter-harness.mjs`：隔离的本地测试适配器，可重新生成。临时大文件与打包产物已清理。

回退按 `source-changes.json` 逐文件恢复对应前版，不能 reset、clean 或覆盖其他已存在工作。

后台接入阶段再落实真实接收、服务端文件校验、信息保留/隐私规则及真实上传、收件、送达验证；当前没有接入或部署这些能力。
