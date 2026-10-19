# 首页全屏摄影首屏 · 2026-10-18

已本地接入；未部署生产。范围为首页首屏，保留当前配色及下方 Penta 模块。

- 取消 60/40 分栏和悬浮零件卡，改为整幅加工摄影占满视口。导航覆盖在图片上，标题、简述和按钮放在自然暗部；遮罩只用于文字对比。
- 将原有按图定制、原型到小批量的信息重排为两行主标题与简述。保留询价、能力目录、ISO 9001 与公司基础信息入口。
- 使用宿主内置 ImageGen 实际制作并采用两张匹配母版：横向新生成，手机竖向以横图为参考重构构图。通用展示场景，无真实工厂、订单或检验结果声明。
- 横幅原生 1672×941，手机原生 940×1672；分别编码三个 WebP 宽度，未插值放大。桌面最大文件 121,518 字节，手机实测选用的 640px 文件 67,580 字节。picture 独立手机图源，首屏 eager/high；原 home-machining 素材和所有既有图片登记保留。

| 检查 | 结果 |
| --- | --- |
| 真实浏览器 | 320×740、390×844、768×1024、1024×768、1440×900、1920×1080、1440×700 全部检查；均无横向溢出，背景铺满 hero，按钮位于容器内 |
| 阅读与构图 | 已目视复核七种首屏截图及完整首页；加工刀具与接触区域可见，平板次按钮和窄屏标题对比已修正 |
| 真实交互 | 手机导航可开关；首屏询价进入邮件草稿页，能力入口进入能力目录；没有发送询价 |
| 内容保护 | 首页首屏以下 Astro 模板与基线完全相同；已有图片注册项完全相同；首页 title、description、canonical、JSON-LD 与前版相同 |
| 工程 | npm run check：991 files，0 errors / 0 warnings，9 条 hints；npm run build：146 Astro pages；test:seo：215 HTML / 86 sitemap URL / 188 redirects / 91 raw URL；test:css：8 项通过 |

浏览器验证基于开发服务 127.0.0.1:4321；构建产物另经静态与 SEO 检查。没有把开发预览当作生产主机验证，也未重新测量 Core Web Vitals。

效果与素材位于 `D:/lzz/lzz/_react/design/home-fullscreen-hero-20261018/`：

- [桌面最终效果](../design/home-fullscreen-hero-20261018/after-1440x900.png) · [手机最终效果](../design/home-fullscreen-hero-20261018/after-390x844.png) · [完整首页](../design/home-fullscreen-hero-20261018/after-full-1440.png)
- [改造前桌面](../design/home-fullscreen-hero-20261018/before-1440.png) · [改造前手机](../design/home-fullscreen-hero-20261018/before-390.png)。前版为原生浏览器截图，像素尺寸另见 captures.json；最终首屏按已核对的逻辑视口截取。
- 两张原始母版：`masters/desktop.png`、`masters/mobile.png`；最终生成需求与约束：`desktop-prompt.txt`、`mobile-prompt.txt`；网页采用关系：`manifest.json`；具体断点和功能结果：`breakpoints.json`、`functional.json`、`verification.json`。

最终规范已更新到 DESIGN.md 第 7、19 节。直接前版、任务差异与哈希保存在 `D:/lzz/home-fullscreen-hero-20261018/`；仅按 source-changes.json / task.patch 回退本轮四个源文件，不覆盖其它改动。六个新增网页素材与原图可保留用于回溯。本轮无待处理项。
