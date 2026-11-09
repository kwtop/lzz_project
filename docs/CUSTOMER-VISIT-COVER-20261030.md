# 客户参观新闻封面替换 · 2026-10-30

按用户提供的设备旁客户照片，使用宿主内置 ImageGen 润色后替换原新闻展示封面。本轮只调整图片与其裁切焦点，沿用当前 Penta 页面布局、配色与文字。

## 实际采用

- 注册项：`news-visit-machine`。
- 新闻列表：`/about/company-news/`。
- 文章首图：`/about/company-news/australian-customer-workshop-visit-january-2025/`。
- 其他新闻中指向该文章的相关记录卡片共用新封面。
- 旧展示项 `news-visit-reframed`、旧实录 `australian-visit-03` 及文章原有 4 张相册图保留。公司资料、证书、其他新闻封面没有替换。

## 素材与来源

原始照片为用户本轮上传的 `codex-clipboard-e105f5de-0521-4d44-9a55-cac2b6e0429a.jpg`，1279×1706px。原文件另存于 `public/media/company-visit-20261030/customer-at-machine-original.jpg`，SHA-256：`52f36f12b7daf8bc4765cceb3d4eec3ca774b58fa24dbe10121c1e2d46171357`。

ImageGen 以该照片为唯一编辑输入，进行光线、白平衡、明暗和压缩细节润色。保留人物、姿态、手机、手扶机门动作与设备关系，不把生成细节当作设备参数、现场精度或新事件证据。用户未提供照片拍摄日期；按其指示关联现有新闻，原新闻日期与文案保持。

生成母版 1086×1448px。图片身份标记为 `image-reference`，原始照片和生成衍生图独立保存，未冒充旧相册原件。

| WebP 宽度 | 高度 | 体积 |
| --- | --- | --- |
| 480px | 640px | 48,448 bytes |
| 800px | 1067px | 99,344 bytes |
| 1080px | 1440px | 146,412 bytes |

横向列表卡片继续采用 4:3，焦点 `50% 30%`，保留头部、手机、手扶机门动作和设备型号。文章首图保持完整 3:4 竖幅。文章首图优先加载，列表卡片延迟加载；响应式图源不放大母版。

## 验证与回退

- 真实浏览器以 1440×1000 和 390×844 逻辑视口检查新闻列表、文章首图。图片加载正常，无横向溢出，手机端人物主体完整。
- 浏览器对比确认新闻卡片日期、标题、描述和文章链接不变。
- 图片注册表原有 89 项内容保持，新增加 1 项；3 个 WebP 的文件尺寸、像素尺寸与登记匹配。
- 构建产物检查确认文章 4 张原相册图保留，其他 4 篇新闻首图不变。
- `npm run check`：0 errors、0 warnings；9 条现有 hints。
- `npm run build`：147 个 Astro 页面构建通过；`npm run test:seo`：216 HTML、86 个 sitemap URL、188 条重定向验证通过。日志保存在下列任务目录，未以本地检查代替远端验证。

任务目录：`D:/lzz/项目记录/客户参观封面-20261030/`。其中 `backup/` 保存本轮前组件、注册表与 DESIGN.md；`masters/` 保存上传原图和生成母版；`imagegen-prompt.txt`、`replacement-map.json`、`verification.json` 保存提示词、替换关系和检查结果。保留桌面及手机截图：`after-news-desktop.png`、`after-news-mobile.png`、`after-story-desktop.png`、`after-story-mobile-photo.png`。

回退只恢复本轮封面选择、焦点属性和注册项，并恢复对应组件；不要整体回退工作区。若文件存在后续改动，按本轮补丁逐处回退。

交付状态：本地更新和预览验证；未部署 Cloudflare，未推送 GitHub。
