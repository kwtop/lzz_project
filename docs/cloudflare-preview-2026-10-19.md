# Cloudflare 预览部署 · 2026-10-19

用户本轮明确授权部署到 Cloudflare，沿用已核对的账号 <account-id>、Pages 项目 lzz-precision 与 preview 分支。

- 更新地址：https://preview.lzz-precision.pages.dev/
- 本次固定版本：https://c179bb17.lzz-precision.pages.dev/
- 前版回退参考：https://1dc2ea8c.lzz-precision.pages.dev/
- Wrangler 4.151.1 上传 1,134 个文件，复用 2,655 个缓存文件，并上传 _headers 与 _redirects。
- 上传候选共 3791 个文件、318151176 字节，包含当前未提交的网站改动；HEAD 056208ba4dfd659147f2ccedda24a961ed70c4ee 只作背景，实际发布内容以逐文件 SHA256 台账为准。
- 候选只从 dist 复制，排除 8 类历史设计/审查/预览目录；源代码、原图和本地 dist 没有因打包被删改。全部 86 个 sitemap 正式 URL 保留。
- 继续采用预览 noindex, nofollow, nosnippet 响应头与 robots Disallow /；canonical 保留 www.lzz-cnc.com。未修改正式域名、DNS 或 Pages 生产分支。

## 验证

本轮重新构建成功；SEO 检查覆盖 215 HTML、86 sitemap URLs、188 redirects、91 raw URLs；既有询价草稿契约通过；CSS 测试 8 项通过。

固定版本的全部 86 个正式 URL 返回 200、带 noindex，响应正文 SHA256 与上传包逐页一致。16 个关键样式、JS 和主视觉资源均 200 且哈希一致。preview 别名的首页、铣削和询价页响应正文与本次上传包一致。

/products/ 和 /about/company-documents/ 返回正确 301；排除的 /design-previews/ 与未知地址返回 404。robots 正确阻止抓取。

在实际浏览器查看了首页 1440/390px、铣削 1440px、询价 1440/390px。滚动触发图片后无缺图或横向溢出；铣削的小标签已删除，询价表单桌面 36px 内边距和手机 20px 水平内边距已生效。手机导航展开/收起、空表单校验、错误焦点、CNC turning 上下文草稿预览及清除测试通过，无 error 日志。仅核对 mailto，没有打开邮件应用或发送询价。

截图、上传清单、前版部署记录、构建日志、HTTP 哈希及浏览器记录位于 D:/lzz/cloudflare-upload-20261019/。本轮完成 Cloudflare 预览发布，没有 Git push 或正式域名切换。

## 导航与目录页脚更新 · 2026-10-19

用户随后明确要求上传当前已选择并完成的本地版本。本次沿用同一账号、项目及 preview 分支，更新居中三列导航与当前目录页脚。

- 稳定预览：https://preview.lzz-precision.pages.dev/
- 本次固定版本：https://56341960.lzz-precision.pages.dev/
- 直接前版：https://bc8db3e3.lzz-precision.pages.dev/
- Wrangler 4.151.1：新增上传 172 个文件，复用 3617 个缓存文件，另上传 _headers、_redirects。候选共 3791 个文件、319392010 字节。
- 当前源码含未提交改动，HEAD 1229eb45541bb8439523309431817017c825fc08 只作背景；实际上传内容以本次 manifest.json 的逐文件 SHA256 为准。
- 沿用 8 类内部演示目录的排除规则及 preview noindex, nofollow, nosnippet / robots Disallow /。canonical 保留 www.lzz-cnc.com。
- 86 个正式 URL 均 HTTP 200、带 noindex、正文哈希与候选一致，并包含本次居中导航与目录页脚。15 个代表页面关键 CSS、JS、图像均 200 且哈希一致。稳定别名的首页、铣削、询价和公司简介与候选一致。
- /products/ 和 /about/company-documents/ 继续返回 301；内部设计目录与未知路径返回 404。
- 实际浏览器在 1280px 桌面检查三列菜单、栏目切换、Esc 关闭并返回焦点；390px 手机检查导航和 Capabilities 展开。无横向溢出，桌面导航相对内容视口中心偏差小于 1px，控制台无 warn / error。
- 本次复用已通过 Astro check、build、SEO 与 CSS 测试的本地构建；发布前确认导航源码哈希一致，并检查全部 86 页导航、页脚及 337 个引用资源的候选完整性。

发布、HTTP 哈希、浏览器证据及线上桌面/手机截图保存在 D:/lzz/项目记录/导航设计-20261019/deployment/。逐文件清单和原 dist 保留。此次完成 Cloudflare 预览更新，未修改正式域名或 DNS，未进行 Git push。
