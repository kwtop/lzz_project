# Cloudflare 预览发布 · 2026-10-20

用户明确要求上传当前本地版本。沿用已实时核对的账号、Pages 项目与 `preview` 分支，已完成发布。

- 稳定预览：[preview.lzz-precision.pages.dev](https://preview.lzz-precision.pages.dev/)
- 本次固定版本：[5199295d.lzz-precision.pages.dev](https://5199295d.lzz-precision.pages.dev/)
- 直接前版：[56341960.lzz-precision.pages.dev](https://56341960.lzz-precision.pages.dev/)
- 项目：`lzz-precision`；账号：`<account-id>`；环境与分支：`Preview` / `preview`。
- 部署 ID：`5199295d-5f2e-41b6-b3fb-b7772ad96529`。

发布包含本次询价表单、国家手动填写、全站英文内容优化、教学图纸/检验示例、工厂适配说明及当前本地交互改动。真实询价后台仍未接通；当前发布不发送或上传，不会显示虚假的成功结果。

## 发布包

从刚通过本地检查的 `dist` 生成独立候选，保留 86 个正式页面，继续排除 8 类内部设计/审查/预览目录。候选共 3,801 个文件、320,238,192 字节。Wrangler 4.151.1 新增上传 203 个文件，复用 3,596 个文件，另上传 `_headers`、`_redirects`。

保留预览 `noindex, nofollow, nosnippet` 响应头及 `robots.txt` 的 `Disallow: /`；canonical 继续使用 `www.lzz-cnc.com`。没有修改正式域名、DNS 或生产分支，没有 Git push。

源 HEAD `1229eb45541bb8439523309431817017c825fc08` 只作背景；发布含当前未提交改动，逐文件 SHA-256 台账是实际上传版本的依据。打包前确认所有源文件和公开资源均未晚于本次构建，候选内 950 个站内文件引用完整。

## 验证

- 复用同一当前构建已通过的 `check`、`build`、`test:inquiry`、`test:site`、`test:seo`；Astro 为 0 errors、0 warnings、9 hints。
- 固定版本全部 86 个正式页面均返回 200、带 noindex，正文 SHA-256 与上传包一致。
- 21 个关键样式、脚本、图片和教学 SVG/CSV 下载返回 200，SHA-256 一致。
- 稳定预览地址的首页、询价、工厂、公司简介和 FAQ 与上传包一致。
- `/products/` 与 `/about/company-documents/` 的 301 位置正确；内部设计目录及未知地址返回 404；robots 阻止抓取。
- 实际浏览器确认国家字段没有下拉列表、默认 WhatsApp / Phone、Email 切换、工艺多选与“不确定”互斥；1440px 桌面与 390px 手机无横向溢出，控制台没有 warn/error。没有向外发送测试询价或文件。

清单、输入摘要、上传日志、前版部署信息、线上哈希核对及桌面/手机截图保存在 `D:/lzz/项目记录/Cloudflare预览-20261020/`。临时上传候选在完成验证后移除，原始 `dist` 与源码保留。
