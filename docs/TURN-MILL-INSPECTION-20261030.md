# 车削后再铣削案例 · 检验图片对应修正

页面：`/machined-parts/machining-examples/turning-then-milling-cylindrical-parts/#inspection-planning`。

用户截图指出上方蓝色料盘中的环形件与下方检验图不一致。本轮通过宿主内置 ImageGen 生成对应的环形件三坐标检验摄影示意；第一版零件偏小，第二版收紧构图，让台阶内孔、端面孔和外缘缺口在网页实际尺寸中清楚可见。

- 新图 ID：`turn-mill-inspection`；几何参考为该页 `turn-mill-components-1440.webp`，场景参考为旧 `metrology-detail-1440.webp`。
- 母版 1448×1086；网页提供 480×360、800×600、1120×840、1440×1080 WebP，约 36–163 KiB；只做缩小编码，不插值放大。
- 采用图片位于 `public/media/turn-mill-inspection-20261030/`；母版、两轮提示词、生成记录、SHA-256、替换映射及直接前版位于 `D:/lzz/项目记录/车铣案例检验图-20261030/`。
- 该图用于说明检验安排，不作为真实检验、精度或验收结果证明。旧图、蓝色料盘图和证据原件保留。
- `ProductsStudyRedesigned.astro` 仅按该 slug 采用新图，其他案例沿用原图片路径；`siteImages.generated.json` 只追加注册项。
- 1440×1000 和 390×844 实际浏览器检查通过：主体完整、无横向溢出，图片采用 `object-fit: contain`。检验区正文与所有主内容链接对照未变，浏览器无 warn / error。
- `npm run check`：0 errors、0 warnings、9 条既有 hints。构建、SEO 及其他案例图位的最终检查结果保存于任务目录。

本轮仅本地实施，未推送 GitHub 或部署 Cloudflare。回退只撤销该路由的图片选择、新增注册项与本轮素材和说明，不用整文件备份覆盖其他工作。
