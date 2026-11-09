# 叶轮产品页加工图 · 2026-10-30

页面：`/machined-parts/gallery/ultra-high-precision-machining-services/#machining-context-title`，图位 `.pd-process-photo img`。

用户指定原图 `66f1675c8fcfd697138e2bfb5988d8f9.jpeg`，要求替换此处不相关的多面体加工图。通过宿主内置 ImageGen 以上述原图为依据润色叶轮加工场景：保留叶轮、细长铣刀和倾斜转台的可见关系，改善光线、金属纹理及背景，扩展为适合现有图位的 4:3 横图。

- 原稿 500×559；生成母版 1448×1086。生成细节是参考引导的呈现，不冒充恢复出的原生细节或新的生产证据。
- 新图 ID 为 `impeller-machining`，来源类型 `image-reference`。WebP 为 480×360、800×600、1120×840、1440×1080，约 19–100 KiB；没有插值放大母版。
- 网页文件在 `public/media/impeller-machining-20261030/`。原稿和旧共用图不覆盖；`ProductsPartRedesigned.astro` 仅按该产品 slug 使用新图，其他产品图位继续原有选择。
- 素材母版、原图副本、完整提示词 `prompt.txt`、SHA-256、来源与替换映射 `manifest.json`、直接前版和前后截图在 `D:/lzz/项目记录/叶轮加工图片-20261030/`。
- 1440×1000、390×844 实际浏览器已检查：叶轮与刀具完整显示，使用 `object-fit: contain`，无横向溢出。正文和主内容链接逐项对照未变，浏览器无 warn / error。
- 该页产品主图、参数、页面 URL、技术说明和询价行为保持。类型检查、构建、SEO 与 35 个产品页的图片范围检查结果保存于同一任务目录。

本轮仅本地实施，未推送 GitHub 或部署 Cloudflare。回退按本轮图位选择、新增注册项、素材和设计记录逐项撤销，不用整文件备份覆盖并行任务的修改。
