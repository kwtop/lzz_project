# Cloudflare 预览发布 · 2026-10-22

用户明确授权上传当前本地版本。沿用已实时核对的账号、Pages 项目和 preview 分支，已完成发布。

- 稳定预览：https://preview.lzz-precision.pages.dev/
- 本次固定版本：https://bacffee1.lzz-precision.pages.dev/
- 直接前版：https://5199295d.lzz-precision.pages.dev/
- 项目：lzz-precision；账号：<account-id>；环境：Preview；分支：preview。
- 部署 ID：bacffee1-203e-4dcf-8a4c-150534e8ca9d。

发布当前已验证的英文站，含最近的全站文案修正、无用内链清理及英文文件选择按钮。询价后台仍未接通；本次没有发送测试询价或文件。

## 发布包与验证

- 复用刚通过项目检查、完整构建、site、SEO、inquiry、teaching 及 12 项文案核验的同一 dist。打包时确认全部构建输入未晚于该构建，86 页正文与已验证版本一致。
- 独立候选只从 dist 复制，排除 8 类内部设计/审查/预览目录。正式 86 页与 950 个候选引用资源完整。
- 候选共 3801 文件、320051507 字节。Wrangler 4.151.1 新增上传 194 文件、复用 3605 文件，另上传 _headers 和 _redirects。
- 固定版本全部 86 个正式页面均 HTTP 200、含 noindex，正文 SHA-256 与候选逐页一致。
- 37 个关键样式、脚本、图片与 TXT/SVG/CSV 下载均 HTTP 200、哈希一致。
- 稳定别名的首页、询价、工厂、铣削、公司简介和 FAQ 共 6 页与候选一致。
- 两个既有 301、8 个排除目录与一个未知路径的 404 共 11 项通过。robots.txt 为 Disallow: /，预览响应头为 noindex, nofollow, nosnippet；canonical 仍使用 www.lzz-cnc.com。
- 上传后 4032 个源码/公开资源/构建配置输入哈希未变。Pages 生产部署 ID 列表与发布前一致，没有修改正式域名或 DNS，没有 Git push。
- 源 HEAD 为 1229eb45541bb8439523309431817017c825fc08，仅作背景；包含当前未提交改动，实际发布版本以本目录 manifest.json 的逐文件 SHA-256 为准。
- 本次没有运行浏览器视觉检查；线上验证为 HTTP、响应头、正文/资源哈希及部署状态验证。

manifest.json、release.json、candidate-verification.json、remote-verification.json、部署列表、源码输入摘要和上传日志保存在 D:/lzz/项目记录/Cloudflare预览-20261022/。

完成线上验证后，临时 candidate 已移入 Windows 回收站；原始源码和本地 dist 保留。
