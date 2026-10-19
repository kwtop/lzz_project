# 栏目入口全幅摄影首屏 · 本地交付

已将 8 个仍使用旧页头的入口改为已确认的全幅摄影效果。保留当前石墨灰、暖白、铜橙配色；本轮没有生产部署。

## 完成页面

| 页面 | 正式路径 | 采用画面 |
|---|---|---|
| parts | /machined-parts/ | inner-parts-scene |
| factory | /factory/ | inner-factory-scene |
| resources | /resources/ | inner-resources-scene |
| ordering | /resources/ordering/ | inner-resources-scene |
| technical | /resources/technical-guides/ | inner-resources-scene |
| about | /about/ | inner-about-scene |
| profile | /about/company-profile/ | inner-factory-scene |
| workflow | /about/how-we-work/ | inner-resources-scene |

这 8 页采用共享 ImmersiveInnerHero。产品筛选、零件详情、长指南、新闻、联系和询价表单继续使用原有任务结构；Capabilities 的另行确认场景方向保留，本轮没有重做其首屏。

## 改动与素材

- 首屏整张摄影铺满、白色大标题、透明导航、统一面包屑和主动作。移除 Parts 旧悬浮小图，保留完整产品目录与真实来源。
- 保留现有文字。How we work 的订单事实放到摄影后，与五阶段正文衔接；MOQ、交期前提、运输额外时间、支付和样件责任保留。
- 资源总入口保留 RFQ、技术指南与 FAQ 入口；两个分类目录保留完整文章、下载和内部链接。
- 实际使用宿主 ImageGen 生成 4 张 1672×941 横幅，并各自编辑为匹配竖幅，共 8 张母版。新增 24 个 WebP，不覆盖旧图。单文件最大 137380 bytes，24 个衍生合计 1750812 bytes；这是文件体积，未作为 Core Web Vitals 结果。
- 手机与 1099px 内竖屏平板使用竖幅，横屏使用横幅。首屏 eager/high，正文继续 lazy；像素与 srcset 描述逐项核对，不插值放大。
- 新图仅为通用展示摄影。真实人员、客户活动、证书、产品身份与订单记录没有改造成 AI 证明。内部来源、原始输出、编辑输入与提示词见 assets-manifest.json、prompts-desktop.json、prompts-mobile.json。

## 验证

- 8 页均检查 1440×900 与 390×844 首屏、整页与实际滚动后的图片加载；44 张页面图片出现位在两个视口均加载，无横向溢出。
- 补充检查 Parts 的 768×1024、320×740，Resources 的 768×1024，Factory 的 1024×768，About 的 1920×1080，How we work 的 320×740。竖屏平板采用专门图源，窄屏长文允许首屏自然增高。
- 8 页前后 title、description、canonical、JSON-LD、技术表格与全部原有锚点一致；原有有效链接目的地保留。
- 实际操作手机菜单、About 子菜单、5 个章节动作；Parts 入口到筛选目录，Request a quote 到实际邮件草稿表单。没有发送邮件。检查标签页控制台未记录 error。
- npm run check：995 文件，0 errors、0 warnings，9 个既有 hints。
- npm run build：146 Astro pages；CSS 构建处理 87 pages / 174 assets；SEO 构建 86 sitemap URLs。
- npm run test:seo：215 HTML、86 sitemap URLs、188 redirects、91 raw URLs 通过；未测试生产主机行为。
- npm run test:css：8 passed、0 failed。

## 截图、规范与回退

- screenshots/before-{page}-{width}.png 与 after-{page}-{width}.png：8 页桌面和手机前后首屏。
- screenshots/after-full-{page}-{width}.png：8 页桌面和手机整页；full-review-* 为并排审阅索引。
- screenshots/comparison-{parts,factory,resources,about}.png：左前右后，四个主栏目对比。
- DESIGN.md 第 20 节记录实际采用的规则，保留现有 Capabilities 规范。直接前版 DESIGN.md 在编辑前重新冻结，初始会话版本另存 DESIGN.initial.md，避免回退覆盖并行更新。
- 本轮 13 个源文件的直接前版和最终快照保存在 D:/lzz/inner-fullscreen-heroes-20261018/baseline/ 与 after-source/。source-changes.json 记录哈希，task.patch 的反向校验通过；未实际应用回退，未执行 reset、clean、stash、提交或部署。
- 本轮 8 个入口均完成本地预览验证，无待生成图位；生产发布未执行。视觉效果由实际截图和本地页面供用户查看，不把构建通过等同于用户视觉认可。
