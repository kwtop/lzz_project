# Penta 风格与换图后的全站布局修正

本轮已在本地完成 86 个正式 URL 的检查与共性问题修正。沿用已确认的 Penta 布局、LZZ 蓝色和现有内容，重点修正新图与旧容器不匹配、正文错列和响应式阅读问题。未部署生产。

## 参照与基线

本轮实际查看 [Penta 首页](https://www.pentaprecision.co.uk/) 与 [CNC milling](https://www.pentaprecision.co.uk/services/cnc-milling)。保留其深色首屏、开放图文、完整摄影主体、白色内容块及连续技术正文的组合，使用 LZZ 自有资料；没有复制客户评价、设备能力或交付承诺。

- 参考截图与测量：[reference](D:/lzz/penta-style-finish-20261018/reference/)。
- 修改前完整源码与 DESIGN.md：[backup](D:/lzz/penta-style-finish-20261018/backup/)。已保留工作区原有改动，无 reset、stash、clean、提交或发布。
- 当前正式范围为首页与 85 个内页；以当前 sitemap 和 canonical 判定。历史 noindex 方案、别名及归档不计入正式页面数量。404 作为额外功能页检查。
- 正式页面及各视口截图入口：[逐页检查表](../design/penta-style-finish-20261018/page-checklist.md)。

## 已实施的布局修正

| 范围 | 发现的问题 | 当前处理 |
| --- | --- | --- |
| 首页 | 768px 仍保留三列支持内容，正文可用宽度过窄 | 该区在窄平板单列，保留已确认的首屏、照片和整体结构 |
| 工艺首屏 | 标题过早断行，前景零件偶发初始空白 | 放宽标题行长；前景优先加载、同步解码和稳定层级 |
| 铣削详情 | 两次装夹仍指向旧图片，沿用固定裁切 | 接入已生成的两幅独立装夹参考图，完整 4:3 显示并更正身份说明 |
| 加工记录目录 | 新横图继承旧照片 180% 放大和负偏移；手机仍是小图旁窄正文 | 移除旧放大裁切；手机按图片、标题、说明展开；深色图注改为可读浅色 |
| 35 个零件详情 | 材料标题、选项、表面处理和条件作为网格独立项交错 | 每类信息作为完整组并列，公共备注跨列，单组占满；技术内容全部保留 |
| 零件相关入口 | 小图与旁边长文比例失衡 | 桌面使用清晰横向图文；手机改为完整图片后接内容 |
| 零件目录 | 手机 116px 小图挤占标题与介绍 | 改为整幅产品图、名称、简介和材料顺序；搜索与筛选保持原行为 |
| 工厂 | 设备图套在小竖框里，产能、检验与照片比例不协调 | 设备使用完整横图；产能采用开放图文；检验照片与方法清单接近等宽；窄平板设备逐行显示 |
| 资源首页 | 工具先于主题，入口缺少图像重点 | RFQ、技术指南先展示，加入两幅对应封面；FAQ 为紧凑整行；采购工具后置 |
| 技术指南目录 | 外三列与卡片内横向分栏叠加，图片过小、标题挤成窄条 | 桌面两列图上文下，手机单列 |
| 长指南 | 窄平板目录与正文竞争宽度 | 768–900px 目录位于正文上方，技术表和正文条件保留 |
| 运输指南 | 手机虽设单列，子元素仍指定第 2 列，正文实际宽度为 0 | 同时复位 grid-column / grid-row；390px 页面由 19,705px 恢复为 6,239px，正文未删减 |
| 公司、新闻、联系、FAQ、隐私、询价及质量文件 | 逐页检查是否有同类换图与布局问题 | 保留各自任务结构、原始新闻与文件，不为统一样式强加大图 |

资源首页仅调整模块顺序与包装；其他技术文本、业务条件没有为减字而删除。35 个产品的标题、特征和技术差异保持各自内容。

## 图片实际采用

本轮没有新增 ImageGen 母版，复用前轮已经实际生成、登记并检查的 6 张素材，调整或新增 7 个图位。前轮生成数量不重复计算为本轮成果。

| 图片 ID | 本轮采用位置 | 身份 |
| --- | --- | --- |
| setup-first | 工厂铣削设备说明、铣削详情第一装夹 | ImageGen-refined reference |
| setup-second | 铣削详情第二装夹 | ImageGen-refined reference |
| turning-process | 工厂车削设备说明 | ImageGen-refined reference |
| five-axis-process | 工厂多面加工设备说明 | ImageGen-refined reference |
| guide-quotations | 资源首页 RFQ 与采购主题 | illustration |
| guide-process-selection | 资源首页技术指南主题 | illustration |

详细文件、原母版与来源：[image-slots.json](../design/penta-style-finish-20261018/image-slots.json)。来源登记仍在 src/data/siteImages.generated.json；原始照片、视频、产品来源登记和证书均保留。生成的设备画面用于解释加工，不作为真实机器配置证明。其余图片沿用前轮已登记的展示映射，见 [前轮图片交付](IMAGE-CONTENT-20261018-R2.md)。

## 前后对照

以下为真实浏览器截图裁出的模块对照，左为修正前、右为修正后，没有用设计稿替代网页效果。技术目录与运输指南的 before 是发现该问题后的修正前补充截图；其他对照来自本轮开始时的基线。

![设备、材料和指南目录对照](../design/penta-style-finish-20261018/overview.jpg)

- [工厂设备](../design/penta-style-finish-20261018/factory-equipment.jpg)
- [产品材料与表面处理](../design/penta-style-finish-20261018/product-materials.jpg)
- [技术指南目录](../design/penta-style-finish-20261018/technical-directory.jpg)
- [资源首页](../design/penta-style-finish-20261018/resource-hub.jpg)
- [手机零件目录](../design/penta-style-finish-20261018/mobile-catalogue.jpg)
- [手机运输指南](../design/penta-style-finish-20261018/mobile-shipping.jpg)

原始整页截图保存在 D:/lzz/penta-style-finish-20261018/before/ 与 after/。前后共 240 张：26 张修正前、214 张修正后。桌面截图内容宽度因滚动条约为 1424px，检查的逻辑视口仍为 1440px。整页拼接中可能出现离屏辅助链接的捕获伪影，DOM 实测为视口上方；未隐藏或删除键盘跳转链接。长图总览仅用于审查节奏，不代替逐模块阅读检查。

## 浏览器与功能验证

| 逻辑宽度 | 正式页面数 | 横向溢出 | 滚动加载后坏图 / 待加载 | 窄正文问题 |
| --- | ---: | ---: | ---: | ---: |
| 1440px | 86 | 0 | 0 / 0 | 0 |
| 1024px | 20 | 0 | 0 / 0 | 0 |
| 768px | 20 | 0 | 0 / 0 | 0 |
| 390px | 86 | 0 | 0 / 0 | 0 |

404 另在 1440px、390px 检查，均无溢出或坏图。发现运输指南问题后，全部 86 个正式页面在桌面与手机补查了可见正文塌缩，172 项结果均为 0；见 [collapsed-text-checks.json](../design/penta-style-finish-20261018/collapsed-text-checks.json)。

图片通过实际滚动触发懒加载；首页横向零件轨道实际遍历后再检查。浅色说明及深色图注已检查实际呈现；首页图片标题有渐变遮罩，简单背景算法的误报经截图复核。此过程不等于全套 WCAG 认证。

- 手机导航可打开，aria-expanded 正确，Escape 可关闭。
- 零件目录空结果、重置、形态与组合筛选正常；刷新保留 URL 筛选状态。塑料筛选 4 项，铣削与铝组合 13 项，重置恢复 35 项及 2 个集合。
- 原始 PE 视频可通过键盘打开和播放，时长 6.87s，浏览器无媒体错误；收起后暂停。
- 询价继续生成邮件草稿。使用项目 verify-inquiry-draft 检查通过，没有执行发送或上传。
- 结构和功能记录：[functional-checks.json](../design/penta-style-finish-20261018/functional-checks.json)。完整 DOM、图片、章节与截图记录位于任务目录 browser-checks.json。

## 工程、内容与 SEO 验证

| 检查 | 结果 |
| --- | --- |
| npm run check | 987 files；0 errors、0 warnings、9 hints |
| npm run build | 通过；146 个静态页面构建，随后 SEO 后处理完成 |
| npm run test:seo | 通过；检查 215 HTML、86 sitemap URL、188 redirects、91 raw URL |
| node scripts/verify-inquiry-draft.mjs | 通过 |
| 本轮基线合同对照 | 86 页 title、description、canonical、JSON-LD、技术表、锚点及业务链接集合保持；仅资源首页标题顺序改变，文字集合不变 |
| 图片静态验证 | 434 个 main img、556 个 img/srcset 引用文件；尺寸、alt、srcset 声明与文件存在性检查无错误 |
| 源码范围 | 8 个源码文件，另更新 DESIGN.md、新增交付文档与证据；无意外源码变更 |

上述图片文件数按 img/srcset 统计，不把 picture/source 的候选再次计数。日志保存在 D:/lzz/penta-style-finish-20261018/ 的 check-final.log、build-final.log、seo-final.log、inquiry-final.log、audit-final.log。机器可读结果见 [validation.json](../design/penta-style-finish-20261018/validation.json) 与 [summary.json](../design/penta-style-finish-20261018/summary.json)。

## 完成状态与回退

86 个正式页面均已完成本地检查；已确认的本轮布局问题已修正。没有留待用户逐页确认的实施项。没有新增生成任务或未接入的新母版；前轮原始证据/待补资料要求继续有效。

已更新 [DESIGN.md](../DESIGN.md) 第 11 节，把本轮实际有效的阅读、图片容器、手机和平板规则写入规范。按 validation.json 的 changed 清单，从 backup 恢复对应文件即可回退；DESIGN.md 单独恢复前版，不整体覆盖工作区。

本轮为当前 Agent 的实际页面复核，未另启独立 Subagent。未测量生产环境 Core Web Vitals、真实网络下的 LCP/INP/CLS 或主机跳转行为，不能据本地加载结果宣称生产性能提升。没有生产发布，视觉验收仍由用户查看实际预览判断。
