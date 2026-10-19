# 全站图片与图文布局复验

2026-10-18。本轮已检查全部 86 个正式页面，并修正加工案例、公司新闻、零件入口和指南中的图片组织问题。只在本地实施，未部署。

项目规范在执行中同步了已确认的 A 配色。本轮保留这部分并行更新，继续使用 Penta 的布局关系；前后截图中的配色变化不计作本轮成果。

## 实际完成的修改

| 范围 | 发现的问题 | 修改结果 |
| --- | --- | --- |
| 金属、塑料材料案例 | 两张关联图片分散到不同位置，补充图独占半行；旧 ID 规则把部分图压到 200–400px | 两张平级照片并列，材料、图纸与验收说明集中在下方；手机按图片、图片、说明阅读。三张或单张图保留适合其信息的组织 |
| 工序案例 | 新摄影继续套用旧白框、内边距和固定高度 | 图位按完整 4:3 展示，去掉重复外框和旧高度限制；检验图与说明保持合理比例 |
| 全部五篇新闻正文 | 220–320px 的小图、不同大小的拼图、竖照在手机两三列中难以辨认 | 统一清楚的标题与大图开篇；照片组按实际横竖比例分配列宽，手机逐张阅读；相关记录使用一致的摄影展示 |
| 新闻开篇 | 已有参观竖照无法有效填充开篇横向图位 | 复用已接受的 ImageGen 横向构图预览，明确标注并链接原片；正文纪实照片组保留原文件 |
| 手机零件总览 | 图片框约 110px 宽，图片却继承 270px 高度，主体小且超出自身 figure | 改为完整 4:3 摄影，上图下文，清楚展示六种形态 |
| 采购与技术指南 | 旧缩略图上限、窄竖图和不合理的图文列；末尾首图跨两列形成巨幅拼图 | 让图片与正文列协调；新增横向检验规划图，末尾工艺参考改为平级照片组；完整技术表保留 |
| 深色询价区 | 部分下级标题对比不足 | 恢复可读的浅色标题、正文与条件说明，保留原有询价链接及邮件草稿边界 |

清理了 `reading-polish.css` 中 207 个过时摄影布局选择器，并移除长指南的两条首图跨列规则。新的图片组织规则集中在 `penta-image-composition.css`。本轮未重写产品结构、公司事件、证书、技术参数或验收条件。

## 页面与素材覆盖

- 全部 86 个正式 URL：1440px、390px，共 172 个状态。
- 新闻目录和全部五篇新闻、加工目录和全部八篇案例/集合，以及零件总览、两篇相关指南：18 页补查 1024px、768px，共 36 个状态。
- 错误页另查桌面与手机。总计 210 个状态，最终无未加载图片、横向溢出、明显 contain 比例错配或图片超出 figure 的问题。收起的原始参考按需加载，不作为缺图。
- 素材去重后，目视检查 152 张展示图片的八张总览板；结合实际视口截图和图位尺寸判断主体与构图，没有把几何检查等同于视觉认可。

[86 页逐页清单](D:/lzz/lzz/_react/design/full-image-layout-review-20261018/page-ledger.md) · [完整验证结果](D:/lzz/lzz/_react/design/full-image-layout-review-20261018/validation.json) · [图片台账](D:/lzz/lzz/_react/design/full-image-layout-review-20261018/image-inventory.json)。原始逐视口数据保存在 `D:/lzz/full-image-layout-review-20261018/after-layout.json`。

## 图片制作与实际采用

本轮使用宿主 ImageGen 实际生成并采用 1 张独立的横向检验规划图：V 形块支撑的车削轴与接触式指示表。它是通用检验示意，没有测量结果、公司设备身份或客户信息。替换三篇指南中不适合横向图位的旧竖幅检验配图；首页等其它位置的旧图未覆盖。

提供 480/800/1120/1440px 四个 WebP，合计 340,810 bytes，最大文件 143,066 bytes。母版、提示词和源文件均保存；非首屏延迟加载。

实际采用页面为报价比较、原型与小批量、CNC 工艺选择。其它质量足够的素材复用并调整图位，不以新增图片数量代替信息组织。

[新图与尺寸清单](D:/lzz/lzz/_react/design/full-image-layout-review-20261018/image-manifest.json) · [ImageGen 提示词与输出](D:/lzz/lzz/_react/design/full-image-layout-review-20261018/image-generation.json) · [实际采用映射](D:/lzz/lzz/_react/design/full-image-layout-review-20261018/adoption-routes.json)。

## 实际页面对照

| 内容 | 修改前 | 修改后 |
| --- | --- | --- |
| 金属案例图组 | [桌面](D:/lzz/lzz/_react/design/full-image-layout-review-20261018/before-metal-pair-1440.jpg) | [桌面](D:/lzz/lzz/_react/design/full-image-layout-review-20261018/after-metal-pair-1440.png) · [手机](D:/lzz/lzz/_react/design/full-image-layout-review-20261018/after-metal-pair-390.png) |
| 亚克力案例图组 | [桌面](D:/lzz/lzz/_react/design/full-image-layout-review-20261018/before-plastic-pair-1440.jpg) | [桌面](D:/lzz/lzz/_react/design/full-image-layout-review-20261018/after-plastic-pair-1440.png) · [手机](D:/lzz/lzz/_react/design/full-image-layout-review-20261018/after-plastic-pair-390.png) |
| 新闻照片组 | [桌面](D:/lzz/lzz/_react/design/full-image-layout-review-20261018/before-news-gallery-1440.jpg) | [桌面](D:/lzz/lzz/_react/design/full-image-layout-review-20261018/after-news-november-1440.png) |
| 新闻开篇 | 原始基线见任务目录 screenshots | [桌面](D:/lzz/lzz/_react/design/full-image-layout-review-20261018/after-news-hero-1440.png) · [手机](D:/lzz/lzz/_react/design/full-image-layout-review-20261018/after-news-hero-390.png) |
| 零件总览 | 110px 图框与 270px 图片高度的错配，已记录原始 DOM 与长图 | [手机](D:/lzz/lzz/_react/design/full-image-layout-review-20261018/after-parts-overview-390.png) |
| 指南参考组 | 原首图跨两列，形成一大两小 | [最终桌面](D:/lzz/lzz/_react/design/full-image-layout-review-20261018/after-process-references-1440.png) |

视口尺寸为 CSS 逻辑值；PNG 像素按宿主实际捕获。最终图位判断使用普通视口截图与 DOM 尺寸，长图仅作为整页基线；工具捕获造成的裁切不当作网站问题。截图中的焦点反馈保留。

## 技术与功能验证

- 809 项本地图片、原片及下载引用均存在；683 个响应式图片引用的宽度描述与文件实际像素一致。
- 本轮最后一版源码在隔离副本完成构建，涉及的八个源码文件与当前项目哈希一致；DESIGN.md 为第九个文件，不参与构建。主工作区的共享构建产物曾发生文件冲突，未改动构建脚本，采用隔离验证。
- `npm run check`：隔离副本 354 个生产/脚本文件，0 errors、0 warnings、7 hints；此前主工作区检查为 990 files，0 errors、0 warnings、9 hints。
- `npm run build`：146 个 Astro 页面，样式筛选及 SEO 生成通过。
- `npm run test:seo`：215 HTML、86 sitemap URLs、188 redirects、91 raw URLs 通过。
- `npm run test:css`：8 项通过。
- 询盘草稿契约通过；未发送邮件，未增加上传或送达承诺。
- 新闻手机筛选实测为 Workshop & events 2、Team life 3、All updates 5；原始视频可用键盘展开，控制条可见，高度 480px，收起后暂停。
- 标题、canonical、H1、锚点、技术表保留。35 个产品摘要及对应结构化描述由并行摘要任务更新，本轮保留这些文件；去除 description 后的 JSON-LD 与基线一致。

辅助的构建预览端口 4322 未能从应用浏览器访问，未声称完成构建产物的浏览器验收。真实网页验收基于当前 4321 站点；隔离副本的构建、SEO、CSS 与询盘检查均通过。未测生产 Core Web Vitals，未验证线上主机行为。

## 回退与状态

[DESIGN.md](D:/lzz/lzz/_react/DESIGN.md) 第 16 节记录本轮规则，第 15、17 节的并行摘要、样式构建与 A 配色均保留。

本轮共涉及 9 个源码/规范文件。[逐文件记录](D:/lzz/lzz/_react/design/full-image-layout-review-20261018/source-changes.json) 和 [本轮独立补丁](D:/lzz/lzz/_react/design/full-image-layout-review-20261018/task.patch) 已保存；`git apply --reverse --check` 通过，未实际执行回退。补丁使用三方上下文保留后来的配色与摘要，不覆盖整份共享文件；DESIGN.md 只撤销第 16 节。

真实实施前快照在任务目录 backup；回退上下文在 rollback-context。原图、旧注册记录、全部新图母版继续保留。隔离验证副本在验收后清理，检查日志与哈希结果留存。

正式页面检查与本轮明确问题已完成；辅助构建浏览器预览、生产性能测量及生产发布不计为完成。视觉结果仍以实际截图和用户判断为准。
