# Penta 首页参考实施 · 2026-10-17

用户已明确选择 Penta 首页作为布局和质感参考，要求绿色改为 LZZ Logo 蓝色、使用 LZZ 内容、只先完成首页。本轮已经在本地首页 `/` 实施，没有推广到内页，也没有生产部署。实现效果仍待用户查看。

## 参考与对应实现

参考：https://www.pentaprecision.co.uk/ 。实际浏览器测量与参考截图保存于 `D:/lzz/penta-home-exact-20261017/reference/`。

| Penta 的页面位置 | LZZ 当前实现 |
| --- | --- |
| 60/40 深色首屏、人物摄影、前景产品 | LZZ 真实车间参观照片，前景蓝色零件，按图加工与询价入口 |
| 首屏下事实行 | 2017、1,500m²、40+ machining & supporting units、MOQ 1 |
| 两组交替图文及浮动说明卡 | 图纸和验收输入；LZZ 加工方式与原始现场照片 |
| 三项服务卡 | CNC milling、CNC turning、5-axis machining |
| 大幅深色照片模块 | 原始车间照片及制造定义、检验约定、复购条件 |
| 行业图片横栏 | 五种 LZZ 零件形态，手动前后浏览 |
| 白色合作流程模块 | 六个项目阶段，配原始检验区照片 |
| 评价卡位置 | 三条有实际内页的原始加工记录，不编造评价 |
| 材料、联系、文章、FAQ、页脚 | LZZ 材料入口、询价草稿入口、现有采购指南与 FAQ |

沿用实际参考的 Roboto / Roboto Condensed、1140px 容器、700px 桌面首屏、48px H1、44px H2、图文比例、卡片形态及模块顺序。对应颜色为 #114A75、#081F30、#63AFE1、#F7F7F7。没有增加独立设计方向、自动轮播或装饰性新交互。

## 内容与功能边界

- 保留自有公司身份、35 条零件目录、工艺、材料、采购资源与原有 URL。
- 原首屏切换面板改为参考网站的固定分栏与前景产品；中段改为图文交替、服务、横向零件、原始记录及采购支持。
- 40+ 仍指加工及配套设备；ISO 9001 邻接当前证书与范围入口。未添加客户、订单成果或行业认证。
- FAQ 保留 MOQ、完整时间条件、按特征约定检验以及样件重建范围。材料照片不承担牌号证明。
- RFQ 仍只在浏览器准备邮件草稿；测试没有发送邮件或上传文件。

## 图片实际采用

| 位置 | 资料 / 素材身份 |
| --- | --- |
| 首屏背景 | `visitor-machining-tour`，LZZ 原始车间参观照片 |
| 首屏前景 | `multi-face-blue-alpha`，沿用现有来源绑定的蓝色零件参考图 |
| 图纸说明、工艺指南 | `milling-enclosure-operation`，原始加工照片 |
| 合作方式 | `workshop-operators-2025`，原始车间操作照片 |
| 深色工厂模块 | `workshop-wide`，原始车间全景 |
| 零件横栏 | `partVisual` / `refreshedHomeImage` 中既有 impeller、casting、pin、plastic 和 multi-face-blue 素材 |
| 合作流程 | `cmm-room`，原始检验区照片，不代表校准或测量结果 |
| 三条加工记录 | `two-stage-first`、`display-housing-machining`、`turn-mill-operation` 原始记录 |
| 四种材料入口 | `aluminum-housings`、`turning-parts`、`brass-plugs`、`plastic-ptfe-batch` 原始零件照片 |
| 联系模块 | `turning-operation`，原始加工照片 |
| RFQ / 材料指南 | 既有 `drawing-inputs-800.webp`、`materials-800.webp` 通用示意图 |

没有复制 Penta 的照片、客户标志和证言。本轮没有新调用 ImageGen；已存在的示意素材与来源绑定零件图直接复用，现场、人员和加工记录使用真实原图。

## 文件与回退

本轮修改：`src/components/PentaHome.astro`、`src/pages/index.astro`、`src/layouts/Layout.astro`、`src/components/MainNavigation.astro`、`src/styles/site-composition.css`、`DESIGN.md` 与字体许可记录。

共享 Layout 仅增加首页标记；导航仅在 `/` 缩短可见标签；新增版式规则以 `body[data-home-layout="penta"]` 隔离。询价页已实际检查不带此标记。内页不套用新布局。

新增三个自托管 Roboto WOFF2 字重及 OFL 许可，来源为 @fontsource/roboto 5.3.0；无新增运行依赖。

直接前版：`D:/lzz/penta-home-exact-20261017/backup/`；工作区初始状态：同目录 `git-status-before.txt`。回退按备份路径逐文件恢复，并移除本轮新增字体，不能 reset 或 clean 当前工作区。已有原图未删除。

## 验证与效果文件

- 真实浏览器：1440×1000、390×844，另检查 768px 和 320px；无横向溢出。整页截图已实际查看，菜单按钮修正为 44px 点击区域。
- 实际操作：桌面导航展开/关闭；手机菜单打开、子菜单展开、关闭；零件横栏前进和返回；FAQ 展开和关闭；首页询价入口进入已完成初始化的原有表单。
- 图片：实际滚动到零件横栏并操作，五张图均加载；图片懒加载时的未请求状态不按损坏图片统计。原始现场图和完整页面视觉已核对。
- `npm run check`：971 files，0 errors、0 warnings、9 hints。
- `npm run build`：144 页构建完成；SEO 检查结果见 `seo-final.log`。
- 首页静态检查：192 个本地链接、图片、srcset 与资源引用通过，含目标锚点；一个 H1，metadata、canonical 和 JSON-LD 保留。
- 本次浏览器日志无 error / warn。未进行现场 Core Web Vitals 测量，也未测试生产主机行为。

效果与检查文件位于 `D:/lzz/penta-home-exact-20261017/`：

- `after/home-desktop-preview.jpg`、`after/home-1440-full.jpg`
- `after/home-mobile-preview.jpg`、`after/home-390-full.jpg`
- `after/home-tablet-preview.jpg`、`after/home-768-full.jpg`
- `browser-desktop.json`、`browser-mobile.json`、`static-home.json`
- `check-final.log`、`build-final.log`、`seo-final.log`

截图按 CSS 视口验收；截图像素宽度可能扣除滚动条。预览图仅从同一真实整页截图裁出，未重绘页面。
