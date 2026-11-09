# 两次铣削装夹案例 · 检验图片对应修正

页面：`/machined-parts/machining-examples/two-stage-cnc-milling/#inspection-planning`。

用户截图指出加工图与检验图中的零件不一致。上方两个图位使用 D 形双凹槽铝件，下方此前复用 `metrology-detail`，其中为圆盘及其他零件。本轮用宿主内置 ImageGen 生成一张专用检验场景，并接入该页，不替换其他页面共用的检验图。

## 新素材

- ID：`two-stage-inspection`，来源类型 `image-reference`。
- 几何参考：`setup-side-1440.webp`、`setup-top-1440.webp`，保留 D 形外轮廓、两处凹槽、安装孔与侧面窄槽。
- 场景参考 / 编辑目标：旧 `metrology-detail-1440.webp`。去掉其中不相关的圆盘及其他样件，改为 D 形零件在花岗石测量台上，测头伸入较深凹槽的检验规划摄影示意。
- 母版 1448×1086；网页衍生 480×360、800×600、1120×840、1440×1080。只缩小编码，无插值放大，单张 WebP 约 36–195 KiB。
- 网页资源：`public/media/two-stage-inspection-20261030/`。原共用图、加工图和证据原件保持原文件。
- 该图只解释检验安排，不是实际检验记录、零件精度或验收结果的证明。公开页面沿用既有图片呈现规则，不增加制作过程旁白。

## 修改范围与验证

`TwoStageStudy.astro` 的该图位改用 `siteImage('two-stage-inspection')`，在现有 `siteImages.generated.json` 中追加注册项；其余 86 个注册项逐项对照直接前版保持一致。页面 URL、标题、正文、参数表、询价及内链不变。

1440×1000 与 390×844 的真实浏览器检查：图片加载正常，`object-fit: contain`，主体完整，无横向溢出。手机重新载入后选择 480px 图源；桌面选择 800px 图源。浏览器无 warn / error。`npm run check` 为 0 errors、0 warnings、9 条既有 hints；`npm run build` 与 `npm run test:seo` 通过（216 个 HTML、86 个正式 URL、188 条重定向）。日志保存在任务目录。

完整提示词、原始输出、替换映射、文件尺寸、SHA-256、直接前版与实际截图位于 `D:/lzz/项目记录/两次装夹检验图-20261030/`。生成方式为 built-in `image_gen`。本轮仅本地实施，未推送 GitHub 或部署 Cloudflare。

回退只恢复该图位并移除本轮新增的注册项、素材和设计记录，不用整文件备份覆盖共享工作区中的其他修改。
