# 图库与同类图文组织修正 · 2026-10-18

已在本地完成。沿用 Penta 的开放图文、蓝色品牌和现有摄影，未部署生产。

本轮从 `/machined-parts/gallery/#covered-part-forms` 的反馈出发，检查 86 个正式 URL 的桌面与手机结构，排除历史预览。确认三类问题，实际调整 7 个页面、8 个图文单元；没有重新生成或替换图片，没有修改业务参数或询价行为。

## 实际调整

| 页面 | 调整 |
| --- | --- |
| `/machined-parts/gallery/` | 包覆轮、辊筒、异形件为三个平级图位；两类齿轮为两个等宽图位。标题和说明放到图组上方，移除多层白卡，保留原图入口。 |
| `/capabilities/aluminum-cnc-parts/` | 检验照片与标题、说明和链接组成一组，完整验收表在下方，问答在表后。 |
| `/capabilities/copper-brass-cnc-parts/` | 同上，保留导电、导热和压力测试的范围说明。 |
| `/capabilities/plastic-machined-parts/` | 同上，保留材料状态、食品接触和医疗用途的限制。 |
| `/capabilities/stainless-steel-cnc-parts/` | 消除仅有一个链接却与大图并列的空栏，不生成空的附加问答容器。 |
| `/capabilities/starting-with-a-sample/` | 消除空栏，保留首件批准检查入口及原有技术条件。 |
| `/machined-parts/machining-examples/29-inch-display-housing-cnc-machining/` | 收起的原视频入口放到对应展示图下方，保留播放、键盘展开及收起暂停。 |

目录中，1440px 下包覆件单元由约 923px 减至 483px；齿轮单元由约 923px 减至 610px。关键变化是去掉与短说明并排的高图墙，图片按平级关系展示。

## 实际画面

包覆件修改前：

![修改前的短文与高图墙](../design/gallery-organization-20261018/before-gallery-covered-part-forms-1440.jpg)

修改后的桌面实际视口：

![修改后的图组与相邻齿轮分组](../design/gallery-organization-20261018/gallery-desktop-viewport.png)

修改后的手机实际视口：

![手机依次阅读说明和完整图片](../design/gallery-organization-20261018/gallery-mobile-viewport.png)

其它对照保存在 `design/gallery-organization-20261018/`：齿轮、检验区、显示器外壳记录各有前后画面。完整页面截图和 7 页 × 4 个宽度的记录位于 `D:/lzz/gallery-organization-20261018/screenshots/`。整页截图用于定位模块；手机裁切判断以实际视口画面和 DOM 几何共同核对。

## 验证

| 检查 | 本轮结果 |
| --- | --- |
| 全站结构 | 86 个正式 URL × 1440、390px，修改前后分别 172 次几何检查；最终未检出相同的短文高栏问题，无横向溢出、坏图或当前视口待加载图。 |
| 调整页面 | 7 页分别检查 1440、1024、768、390px，共 28 份记录；相关图片全部加载，无横向溢出，来源入口仍在。 |
| 静态资源 | 756 个去重的图片、响应式候选、原始资料及下载引用均可在本地解析。 |
| 内容与 SEO 对照 | 86 页的 title、description、canonical、H1、锚点、技术表格、JSON-LD、图片及链接保持一致。只有五页的现有检验文字发生顺序变化。 |
| 图库功能 | Reference galleries 筛选显示两组参考集合；恢复 All forms 返回 35 项；无结果与重置正常；齿轮锚点跳转正常，原两张图片加载正常。 |
| 原视频 | 手机端键盘 Enter 可展开、收起；控件可见，无横向溢出，收起后暂停。 |
| `npm run check` | 988 files，0 errors、0 warnings、9 个既有 hints。 |
| `npm run build` | 通过；146 个 Astro 页面，后处理的正式 sitemap 为 86 个 URL。 |
| `npm run test:seo` | 通过；215 HTML、188 redirects、91 raw URLs。 |
| 询价契约 | `node scripts/verify-inquiry-draft.mjs` 通过；仍只准备邮件草稿。 |

机器检查用于定位和回归，不能代替视觉认可。包覆件、齿轮、检验区和视频入口已经按实际画面复核；本轮不声称生产发布或新增性能测量。

## 文件与回退

实际源码变更为 `CapabilityInspectionReview.astro`、`ProductsCatalogueRedesigned.astro`、`image-layout-20261018.css` 及 `DESIGN.md` 第 13 节。保留原始照片、ImageGen 映射、视频、产品主图、技术内容、原 URL 和 RFQ 契约。

直接前版：`D:/lzz/gallery-organization-20261018/backup/`。`source-changes.json` 记录四个文件的前后 SHA-256 与备份位置；仅按清单逐文件回退，不能覆盖整个工作区。详细验证、功能记录和对照位于 `design/gallery-organization-20261018/validation.json` 及同目录。

本轮实施范围已完成，无阻塞项。当前为本地修改与浏览器验证状态，未部署生产。
