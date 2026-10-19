# Capabilities 首屏：02 方向实施

用户选择完整场景摄影的 02 设计，授权调整 Capabilities 各页首屏，并要求按工艺、材料、订单规划区别呈现；正文和其他布局不变。本轮已在正式源码实施，未部署生产。

## 结果与范围

共 12 页：总览、CNC milling、CNC turning、5-axis、Machining of castings、Aluminum、Stainless steel、Copper & brass、Engineering plastics、Prototype、Small production runs、Starting with a sample。

| 类型 | 构图与图片 |
| --- | --- |
| 总览与工艺 | 整幅加工环境；左侧文字，右侧刀具、夹具与对应工件 |
| 材料 | 左侧材质及零件，右侧文字；铝、钢、铜/黄铜、塑料分别制作 |
| 订单规划 | 上方审图、样件评估或批次安排，下方横向标题与内容；手机顺序展开 |

沿用石墨灰、暖白与铜橙的 A 配色，以及现有 Roboto / Roboto Condensed。桌面内容宽度与导航高度保留；本组页面使用清楚的不透明导航底色。移除旧悬浮零件卡，保留文字形式的产品参考入口。首段、标题、地点、ISO 链接、章节入口和询价参数保留。

接入点为 `PentaInnerHero.astro` 的 Capabilities 分支；新组件、数据和样式分别为 `CapabilitySceneHero.astro`、`capabilityHeroScenes.ts` / `.generated.json`、`capability-scene-hero.css`。Layout 仅增加本组场景首屏标识。其它首屏组件及正文组件不改。

## 素材

12 张独立通用场景 PNG 母版，48 个 WebP 衍生；仅做按比例缩放和编码，不把界面文字烘焙入图片。最大网页版本为 1536px、79,644–157,458 bytes；48 个衍生总计 2,904,544 bytes。手机按图中主体独立设置 object-position。原图、原有产品和正文图片未覆盖。

新图只解释工艺、材料或规划语境，不证明 LZZ 具体设备、材料牌号、检测、生产批次或交付。内部来源记录：`design/capability-heroes-20261018/manifest.json`；母版与逐图提示词：`D:/lzz/capabilities-scene-hero-20261018/masters/`、`prompts/`。

## 验证

- `npm run check`：0 errors，0 warnings，9 hints（既有未使用与弃用提示）。
- Astro 隔离输出构建：146 个生成路由；随后运行项目原有 CSS 优化与 SEO 构建/检查。包含 public 预览内容，共检查 215 HTML、86 个 sitemap URL、188 条来源重定向规则。
- 86 个正式页面的标题、摘要、canonical、社交标签及 JSON-LD 与本轮前版一致。12 个 Capabilities 页面移除首屏后 DOM 相同；其他 74 个正式页面正文 DOM 相同。报告：`scope-verification.json`。
- 全部 12 页在 1440 × 960 和 390 × 844 检查；三类长标题代表页在 768 × 1024、1024 × 1024 检查，共 30 个组合。图片加载正常，单一 H1，未出现横向溢出。
- 修改前后 24 个状态、544 处正文的尺寸和相对首屏末端的位置一致（1 CSS px 容差）。首屏自身的包裹层不作为正文比较；低批量页的懒加载图片在实际载入后复核。报告：`layout-verification.json`。
- 手机菜单的 11 个子页入口可见，Escape 关闭正常；See milled parts 到达既有锚点；询价链接保留 CNC milling、capability 与 source 参数。没有提交表单或发送邮件。报告：`interactions.json`。
- 三类代表页已保存并目视检查完整截图；浏览器未记录 error。首屏参考采集条件通过：`round-02/report/verification.json`。保留既有 1140px 容器与导航高度，未把测量偏差称为像素一致或还原率。

截图时曾临时提前加载懒加载图，采集后恢复 loading 属性；视口模拟在交付前清除。第一轮截图的 DPR 数值精度与预期不一致，保留诊断，第二轮按实测条件重新准备并采集，没有改写采集值绕过检查。

## 本地预览与回退

新预览：<http://127.0.0.1:4327/capabilities/cnc-milling-service/>。当前浏览器旧 4326 地址是此前的冻结快照，本轮不覆盖该历史快照。正式源码已更新，不代表生产发布。

起始源码快照在任务目录 `backup/`；本轮清单与哈希见 `source-changes.json`。收尾时保留了共享 Layout 与 DESIGN 中的并行改动，`rollback-current/` 和 `existing-source.patch` 只隔离本轮修改。仅撤销本轮对应修改、新文件和 DESIGN.md 的“Capabilities 首屏 · 02 场景方向”专节，保留已有内容、A 配色、图片清理及其它任务改动。不要 reset、clean 或覆盖整个工作区。

首次共享 dist 构建遇到并发清空导致的后处理失败，后续构建和预览改用本轮独立输出目录 `qa-root/dist/`；未终止其它任务进程。
