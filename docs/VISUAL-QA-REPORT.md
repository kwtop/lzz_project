# 全站视觉与保留验收

> 2026-10-17全站推广已完成：84页及最终图片检查见 [全站交付](FULL-SITE-REDESIGN-DELIVERY.md) 与 [逐页结果](penta-rollout-20261017/PAGE-RESULTS.md)。以下原有样板/盘点记录保留供追溯。

最终84页、336视口、222张改后全页截图完成，0溢出/断图/脚本错误。开发及构建版各10/10功能通过，正文/技术表/SEO保留。未部署生产。

## 第一阶段三页样板历史记录

2026-10-17（Asia/Shanghai）。结论：**三页本地样板已实现，四种宽度的视觉与功能核查完成；等待用户确认后才扩展其余 81 个正式页面。** 未部署生产，未推送 Git，未更换技术栈，正式 DESIGN.md 未覆盖。

## 审阅入口

六份交付文档：[结构清单](CURRENT-SITE-STRUCTURE.md) · [Penta 适配](PENTA-DESIGN-MAPPING.md) · [逐页计划](PAGE-REDESIGN-PLAN.md) · [图片清单](IMAGE-REDESIGN-MANIFEST.md) · [候选设计系统](DESIGN-SYSTEM-NEXT.md) · 本验收报告。

- [本地首页](http://127.0.0.1:4321/)
- [本地能力分类](http://127.0.0.1:4321/capabilities/)
- [本地 CNC 铣削详情](http://127.0.0.1:4321/capabilities/cnc-milling-service/)

这些是本机开发服务，不是公网预览或生产发布。浏览器检查使用 Playwright + 安装的 Chrome，deviceScaleFactor=1；桌面 viewport 1440×1000、中屏 1024×1000 / 768×1000、手机 390×844，截图为完整页面。先等待字体，逐屏滚动触发 lazy 图片，再返回顶部拍摄。全部截图的静态验收使用 prefers-reduced-motion:reduce；Taste 另在标准动效下检查。

## 改前改后完整截图

| 页面 | 改前 1440px | 改后 1440px | 改前 390px | 改后 390px |
| --- | --- | --- | --- | --- |
| 首页 | [桌面基线](penta-20261017/before/home-1440.jpg) | [桌面完整](penta-20261017/after-final/home-1440.jpg) | [手机基线](penta-20261017/before/home-390.jpg) | [手机完整](penta-20261017/after-final/home-390.jpg) |
| 能力分类 | [桌面基线](penta-20261017/before/category-1440.jpg) | [桌面完整](penta-20261017/after-final/category-1440.jpg) | [手机基线](penta-20261017/before/category-390.jpg) | [手机完整](penta-20261017/after-final/category-390.jpg) |
| 铣削详情 | [桌面基线](penta-20261017/before/detail-1440.jpg) | [桌面完整](penta-20261017/after-final/detail-1440.jpg) | [手机基线](penta-20261017/before/detail-390.jpg) | [手机完整](penta-20261017/after-final/detail-390.jpg) |

| 页面 | 1024px 完整 | 768px 完整 | 手机按阅读顺序分屏 |
| --- | --- | --- | --- |
| 首页 | [1024px](penta-20261017/after-final/home-1024.jpg) | [768px](penta-20261017/after-final/home-768.jpg) | [前段](penta-20261017/home-mobile-sheet-1.jpg) / [后段](penta-20261017/home-mobile-sheet-2.jpg) |
| 能力分类 | [1024px](penta-20261017/after-final/category-1024.jpg) | [768px](penta-20261017/after-final/category-768.jpg) | [前段](penta-20261017/category-mobile-sheet-1.jpg) / [后段](penta-20261017/category-mobile-sheet-2.jpg) |
| 铣削详情 | [1024px](penta-20261017/after-final/detail-1024.jpg) | [768px](penta-20261017/after-final/detail-768.jpg) | [前段](penta-20261017/detail-mobile-sheet-1.jpg) / [后段](penta-20261017/detail-mobile-sheet-2.jpg) |

[桌面三页总览](penta-20261017/overview-1440.jpg) · [1024px 总览](penta-20261017/overview-1024.jpg) · [768px 总览](penta-20261017/overview-768.jpg)。原始完整截图用于局部检查，总览只比较整体节奏。

参考：[Penta 首页桌面](penta-20261017/reference/penta-home-1440.jpg) / [手机](penta-20261017/reference/penta-home-390.jpg)；[Penta 铣削桌面](penta-20261017/reference/penta-milling-1440.jpg) / [手机](penta-20261017/reference/penta-milling-390.jpg)。

## 已实现的视觉变化

| 页面 | 版面变化 | 字体与图片变化 | 内容责任 |
| --- | --- | --- | --- |
| 首页 | 全幅深色照片开头；主次实物索引；错位工序图；真实车间强调；分开图纸与实物 RFQ 输入 | 窄体标题 + Inter 正文；新的通用加工图；真实叶轮 / 壳体 / 销 / 塑料和两次装夹保留 | 5 章、9 图；5/5 章有承担职责的图片 |
| 能力分类 | 紧凑选路开头；工艺 / 材料 / 阶段采用不同结构；来源证据独立强调 | 新材料静物搭配原有四个材料入口；真实工艺实物和装夹仍在 | 6 章、11 图；4/6 章有图片 |
| 铣削详情 | 真实零件先行；适用实物比较；同件两次装夹；几何解释；全宽技术表；检验和 RFQ | 新刀具可达性示意；其余实物、工序、CMM 原图保留；图注使用完整宽列 | 7 章、7 图；5/7 章有图片 |

图数只计算 main 正文，不含标志、社交图标。三页合计 27 个槽位、19 个去重文件。保留 16 个既有文件，其中 14 个真实照片 / 已有裁切文件、2 个已有 AI 示意；同源装夹全景和裁切仍是同一来源证据。ImageGen 本轮编辑 0、新生成 3，其中替换 2、新增 1。[三张新图](penta-20261017/new-images.jpg) 均带 AI 图注，不证明工厂、客户、牌号、测量或交付。

## 四档视口结果

| 页面 / 宽度 | 完整高度 px | 横向溢出 px | 正文图片 / 失效 | 核心章节 | Console / pageerror |
| --- | ---: | ---: | --- | ---: | --- |
| 首页 / 1440 | 4394 | 0 | 9 / 0 | 5 | 0 |
| 首页 / 1024 | 4946 | 0 | 9 / 0 | 5 | 0 |
| 首页 / 768 | 5211 | 0 | 9 / 0 | 5 | 0 |
| 首页 / 390 | 6780 | 0 | 9 / 0 | 5 | 0 |
| 能力分类 / 1440 | 4324 | 0 | 11 / 0 | 6 | 0 |
| 能力分类 / 1024 | 4573 | 0 | 11 / 0 | 6 | 0 |
| 能力分类 / 768 | 5057 | 0 | 11 / 0 | 6 | 0 |
| 能力分类 / 390 | 7304 | 0 | 11 / 0 | 6 | 0 |
| 铣削详情 / 1440 | 6595 | 0 | 7 / 0 | 7 | 0 |
| 铣削详情 / 1024 | 6947 | 0 | 7 / 0 | 7 | 0 |
| 铣削详情 / 768 | 7965 | 0 | 7 / 0 | 7 | 0 |
| 铣削详情 / 390 | 11690 | 0 | 7 / 0 | 7 | 0 |

所有 12 次检查中，main 单一非空 H1，HTTP 200；未发现框架错误页、横向溢出、加载失败的正文图片、页脚图片或控制台 / pageerror。全页滚动后再判断图片，避免把尚未触发的 lazy 图片当成失效。机器结果：[results.json](penta-20261017/after-final/results.json)。

标题四档实际测量：

| 首页视口 | 标题实际字体 | 标题框宽度 | 第二行文字测量宽度 | 行数 |
| --- | --- | ---: | ---: | ---: |
| 1440px | 700 56px / 61.04px "Roboto Condensed", Arial, sans-serif | 545.0 | 498.3 | 2 |
| 1024px | 700 44px / 47.96px "Roboto Condensed", Arial, sans-serif | 425.1 | 391.5 | 2 |
| 768px | 700 44px / 47.96px "Roboto Condensed", Arial, sans-serif | 688.0 | 391.5 | 2 |
| 390px | 700 36px / 39.6px "Roboto Condensed", Arial, sans-serif | 350.0 | 320.3 | 2 |

CMM 桌面照片约 190px，图注另占 440px；手机图注占完整内容列。正文 / 纸白对比为 14.25:1，主按钮蓝 / 白为 5.97:1。视觉检查覆盖主要标题、段落、图注、表格标签、图片重心、深浅节奏和页脚；这不是全站完整 WCAG 或性能认证。

## 发现与修复

| 检查轮次 / 发现 | 处理 | 最终结果 |
| --- | --- | --- |
| 第一轮首页 SSR 导入缓存错误 | 修正入口 import 并触发 Vite 重新解析；检查脚本增加 HTTP 200 / 非空 H1 保护 | 失败截图只留在任务证据目录，不作为交付；最终首页正常 |
| 首页桌面 / 手机标题多行堆叠 | 按真实文字宽度校准字体与列宽，保留完整主题 | 1440 / 1024 / 768 / 390px 均两行 |
| 中屏首屏与几何说明列过窄 | 768–899px 改单列；1024px 首页标题 44px | 768px 标题 / 照片独立，详情几何说明恢复宽阅读列 |
| 页脚白色标志与临时白底相撞 | 撤掉白底板，沿用原白色标志；在样板内统一深色背景 | 标志可见、栏目与联系方式完整 |
| CMM 图注被旧 figure 宽度压缩 | 单独限定照片和文字列；手机图注完整宽度 | 440px 桌面图注，原校准 / 范围边界完整 |
| 静态卡片阴影与多余页脚线 | 保留底色和留白，阴影仅真实浮层菜单 | 普通卡无静态 / 悬停阴影 |
| 全站 SEO 脚本发现旧 noindex factory 预览缺 description | 只补一条本地设计审阅 meta；noindex 和视觉不变，原 HTML 已备份 | 全站 SEO 脚本通过 |

视口调整后等待两次 requestAnimationFrame 再测量媒体查询，防止将尚未更新的 1440px 字体误记成 1024px 结果。截图另有字体 / 滚动等待。

## 内容、功能与 SEO 的实际核查

[内容 / 交互证据](penta-20261017/verification.json) 与 [静态范围证据](penta-20261017/static-verification.json)。

- 三页逐项比较改前改后 H1、全部 H2 / H3、全部 href、正文有效行和 JSON-LD：无业务正文、标题或链接缺失。唯一移除的文字为被替换旧 AI 几何图的旧图注，已由更具体的 AI 来源图注代替。
- 三页 title、description、canonical、robots 与 JSON-LD 内容完全一致。全 84 个正式页面的 title / H1 / description / canonical / robots 与盘点基线一致；OG 生成逻辑未改，并通过项目 SEO 检查。
- Sitemap 仍为 84 个原 URL；188 条兼容规则、207 个 HTML 保留。静态检查覆盖全体 HTML 的链接 / 图片 / 脚本 / 样式文件与单一 H1、跳转壳。53 个去重样板站内链接目标另检查跨页 / 页内锚点，无失效目标。未验证生产 HTTP 301。
- 构建产物中仅 /、/capabilities/、/capabilities/cnc-milling-service/ 带 data-penta-sample；/factory/ 浏览器检查未带此标记。其余 81 个正式页面没有推广新视觉。
- 正式 DESIGN.md、原三组件、MainNavigation、SiteFooter、siteSections、seo.ts 的散列均未改变。Layout 只增加样板样式 / 字体 / 动效边界，原 metadata 与导航 / 草稿逻辑保留。
- 桌面子菜单实际展开，Escape 关闭并回到触发焦点；手机主菜单 / 能力子菜单展开，CNC milling 链接跳转后菜单关闭；[桌面菜单](penta-20261017/after-final/navigation-desktop.jpg) / [手机菜单](penta-20261017/after-final/navigation-mobile.jpg)。
- 分类锚点实际跳转；详情 RFQ 保留 CNC Milling 引用。填写本地 QA 输入、准备完整草稿、验证 mailto、编辑和清除均通过；[手机草稿](penta-20261017/after-final/rfq-draft-mobile.jpg)。没有打开邮件客户端、发送询价、上传文件或产生 POST 等网络变更。
- prefers-reduced-motion 下无入场 class，正文可见；禁用 JavaScript 后服务文字与 RFQ 链接可读。原生详情菜单和表单的无脚本回退继续沿用。

| 项目检查 | 结果 | 日志 |
| --- | --- | --- |
| npm run check | 0 errors、0 warnings、9 个现有 hints（967 files） | D:/lzz/penta-redesign-20261017/check-final.log |
| npm run build | 通过；Astro 构建 + build-seo；最终 207 HTML | D:/lzz/penta-redesign-20261017/build.log |
| npm run test:seo | 通过；84 sitemap URLs、188 规则、91 原始 URL 覆盖 | D:/lzz/penta-redesign-20261017/seo.log |
| node scripts/verify.mjs --static | 通过；全 207 HTML 链接、媒体 / 样式 / 脚本、H1 和跳转壳 | D:/lzz/penta-redesign-20261017/static.log |
| 定向 Playwright 与改前保留核查 | 通过；三页四宽度及菜单 / 锚点 / RFQ 草稿 | verification.json、after-final/results.json |

没有运行旧 test:site 的全流程浏览器分支：它仍引用旧产品页 / 旧表单文案与选择器，不代表当前功能。其静态分支已运行；本轮改动相关的当前真实交互由定向 Playwright 核查。没有为了让旧选择器通过而改回现有产品或询价流程。其他 81 页的搜索 / 筛选、全部外链 / 新闻日期等未做本轮浏览器全回归。

## Taste 实际结果与适用边界

实际执行 design-taste-frontend inspector，1440 / 390px 各检查三页。原始输出保留在 [home](penta-20261017/taste/home.json)、[category](penta-20261017/taste/category.json)、[detail](penta-20261017/taste/detail.json)，审阅说明见 [taste-review.json](penta-20261017/taste-review.json)。运行时 --allow eyebrow,shadow：必要的数据 / 来源标签和实际浮层阴影。

| 页面 | 原始 FAIL | 剩余 WARN | 解释 |
| --- | --- | --- | --- |
| 首页 | 0 | size-count、no-footage、still-page | 无未豁免 FAIL。 |
| 能力分类 | focal-point | no-footage、still-page、size-count | focal-point 要求更大展示字 / 单图面积；本次 64px 技术标题参考 Penta，有意保留，供方向确认。 |
| 铣削详情 | focal-point | hairline、size-count、no-footage、card-rows | focal-point 要求更大展示字 / 单图面积；本次 64px 技术标题参考 Penta，有意保留，供方向确认。 |

不能把上表写成“未加例外的 Taste 全绿”。检测器的 8.4vw 主标题参考值适合更强调展示的网站，Penta 原服务页实测约 4vw；LZZ 的目录与技术页也保留可见选路和实物。技术表的手机堆叠行被识别为 card-rows，属于字段比较结构；应用要求分隔与字号角色提示不影响正文完整性。首页 / 分类分别检测到 11 / 12 个入场元素，详情为 18 个；本轮选择轻动效，未强行增加持续运动。

现有 public/media/source-details 内有 7 个来源视频（塑料、清理后零件和显示壳体等），未新增 / 编辑 / 删除。它们不等于匹配首页切削或本铣削示意的完整真实工艺视频；尚未作为本轮主视觉选用。后续匹配素材应逐个核对原记录、授权和画面，不加入其他公司的工厂视频来消除 no-footage 提示。

## 仍需真实资料与未完成范围

P04 多面零件页仍缺清晰完整主体和同件细节，目前只有 2 个有效来源；CMM 当前范围 / 校准、设备台账和 ISO 当前文件需要真实资料；澳洲参访新闻日期冲突仍待核对。没有使用 AI 生成客户、厂房、证书、量测、订单或出货结果弥补这些缺口。全部缺口见 IMAGE-REDESIGN-MANIFEST.md 与结构清单。

相较 Penta，LZZ 来源摄影的连续性、光线和清晰度仍不统一；技术条件篇幅更长；没有已确认的精确 3D 模型互动，也没有 Penta 的客户评价 / 绩效数据。三页已经建立同一字体与照片分工，但全站其余 81 页仍等待用户确认后逐类改造。

本轮停止在此。没有生产发布、真实询价发送、公共预览发布、正式 DESIGN.md 合并或全站视觉推广。确认后按 PAGE-REDESIGN-PLAN.md 实施，不逐页重复索要方向确认。

## 本地复现与回退资料

项目：D:/lzz/lzz/_react。服务命令 npm run dev -- --port 4321。

验证脚本与改前源文件在 D:/lzz/penta-redesign-20261017/：inspect.cjs、verify-samples.cjs、verify-static.cjs、baseline/。项目交付证据已复制到 docs/penta-20261017/。如要恢复旧视觉，先核对后续用户改动，再撤销三条入口的 Penta 组件 / flag 及 Layout 样板接入；旧组件、源图和根 DESIGN.md 均完整保留。
