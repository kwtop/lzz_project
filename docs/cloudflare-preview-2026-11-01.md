# Cloudflare 预览发布 · 2026-11-01

已按用户“上传到 cloudflare”将当前本地版本发布到既有 lzz-precision 项目的 preview 分支。正式域名及 production 分支未改动。

- 稳定入口：[preview.lzz-precision.pages.dev](https://preview.lzz-precision.pages.dev/)。
- 固定版本：[2404ca4f.lzz-precision.pages.dev](https://2404ca4f.lzz-precision.pages.dev/)。
- 部署 ID：2404ca4f-28ac-4d08-8b52-2dc9f3504f85，环境为 Preview，分支为 preview。
- 前版：868c92d1-e682-4fcb-87de-014e16466912，地址为 https://868c92d1.lzz-precision.pages.dev/。
- 账号已实时核对为项目既有账号 <account-id>。远端配置和发布清单均在上传前重新下载，未使用记忆中的状态代替当前配置。

## 本轮内容

包含全部当前构建内容：十篇新增产品技术指南、全部二十篇指南的 SEO／GEO 与 Humanizer 表达优化、此前本地已完成的版式及图片调整。主导航、首页透明规则、询价上下文及既有链接随同当前构建保留。未推送 GitHub。

候选由通过验证的 dist 复制，保留 96 个正式 sitemap URL；继续排除 8 类内部设计／预览目录。公开 HTML 与本地构建逐字节一致。候选单独保留 robots.txt 的 Disallow: / 和全局 X-Robots-Tag: noindex, nofollow, nosnippet，canonical 仍指向 www.lzz-cnc.com。后台 no-store 等原有响应头保留。

候选共 3850 个文件、324,325,868 bytes，包含 158,223 bytes 的 Worker。Wrangler 实际处理 3,846 个静态资产，其中 229 个新上传、3,617 个复用；响应头、重定向、Worker 与路由另行上传。沿用 API 专用的 _routes.json，仅 /api/* 进入 Worker。

## 询价及后台状态

实时下载配置仍没有 D1／R2 绑定，未创建数据库、附件桶或 Access 配置，未运行远端迁移，也没有上传本地密码、密钥或 LOCAL_DEVELOPMENT=true。远端既有 access／detailed 模式保持。

线上 /api/config 与 /api/admin/inquiries 均返回 503、not_configured。浏览器确认询价页显示 Online submission is currently unavailable. 并提供 Email／WhatsApp 入口。没有提交真实询盘或附件，也没有发送邮件或消息。本轮完成的是网站预览发布，不代表在线收件或后台登录已经接通。

## 验证结果

- npm run check：0 errors、0 warnings，9 个既有 hints。
- npm run check:backend：通过；npm run test:backend：39 项通过。
- npm run build、test:site、test:seo、test:inquiry：通过。构建为 157 个 Astro 页面；SEO 检查覆盖 226 HTML、96 sitemap URL 和 188 条重定向，站内检查覆盖 9,419 个本地引用、690 个章节引用。
- 固定版本全部 96 个正式页面 HTTP 200、含 noindex，响应 SHA-256 与候选一致。
- 固定版本 145 个关键样式、脚本、图片、robots 和 sitemap HTTP 200、哈希一致。
- 稳定别名 32 页与候选一致，包括全部 20 篇指南、两类指南目录及首页、工厂、工艺、产品、加工记录、新闻和询价代表页。
- 两条 301、三个未知／排除路径 404，共五项控制检查通过。
- 真实浏览器检查首页 1440／390px、技术目录 1440px、铸件指南 1440／390px；实际 CSS 宽度正确，无横向溢出和缺图。内页保留 Home，首页隐藏；铸件指南已出现本轮新标题 Core shift and loss of machining allowance。另检查了线上询价不可用提示。
- 不是重新逐页进行 96 页完整视觉验收；指南此前的本地 20 页 × 1440／390px 验收记录保留。本次使用全部正式页面的线上响应与哈希核对，再进行真实浏览器抽查。
- 发布后 4,099 个构建输入哈希与发布前一致。production 部署列表前后均为空，未改 DNS，未发布 production。

## 发布记录与回退

记录目录：D:/lzz/项目记录/Cloudflare预览-20261101/。包含候选、逐文件 manifest、输入哈希、发布前后清单、当前远端配置备份、构建／测试／上传日志、verify-remote.mjs 和线上核验结果。线上截图为 online-guides-detail.jpg、online-home-1440.jpg、online-home-390.jpg、online-casting-1440.jpg 及 online-casting-390.jpg。

保留前版固定地址作为回退参考，不删除历史部署。预览域继续禁止收录；本轮没有验证生产收录、SEO 排名、AI 引用、实测访问性能或线上收件结果。
