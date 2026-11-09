# Cloudflare 预览发布 · 2026-10-30

用户授权将当前本地版本上传 Cloudflare。沿用既有账号和 `lzz-precision` 项目的 `preview` 分支，发布成功并完成线上验证。

- 稳定预览：[preview.lzz-precision.pages.dev](https://preview.lzz-precision.pages.dev/)。
- 固定版本：[868c92d1.lzz-precision.pages.dev](https://868c92d1.lzz-precision.pages.dev/)。
- 部署 ID：`868c92d1-e682-4fcb-87de-014e16466912`。
- 前版：`625610d7-1fce-4bbc-8c89-1b4b7e229608`，固定地址 `https://625610d7.lzz-precision.pages.dev/`。
- 账号：`<account-id>`；环境：Preview。

## 上传范围

包含当前本地首页内容、工厂及五轴页面、产品与加工案例图片、客户新闻封面、导航和页脚，以及现有询价和后台代码。首页首屏导航透明，首页隐藏 Home，内页保留；全站最新内容采用当前构建。

候选从通过检查的 dist 复制，排除 8 类内部设计、审查与预览目录，保留正式 86 个 sitemap URL。全部公开 HTML 与本地构建一致，没有为预览修改正文。预览包单独设 `robots.txt` 的 `Disallow: /` 和 `X-Robots-Tag: noindex, nofollow, nosnippet`；原后台 no-store 等响应头继续保留，canonical 仍为 `www.lzz-cnc.com`。

共 3,824 个候选文件，322,075,354 bytes，包含 98,727 bytes 的 Worker 模块；Wrangler 上传 3,820 个静态资产，并分别处理响应头、重定向、Worker 和路由。新增静态资产 216 个，其余复用。函数包使用 [Cloudflare Pages advanced mode](https://developers.cloudflare.com/pages/functions/advanced-mode/)，`_routes.json` 只将 `/api/*` 交给 Worker。

首次上传尝试在函数模块解析阶段失败，未完成部署。改用 `pages functions build --outdir` 输出的 ES module 后成功，首次上传缓存被复用。失败日志保留，最终版本以本文件部署 ID 和 manifest.json 为准。

## 询盘及后台边界

实时下载的预览配置未包含新后台所需的 D1 / R2 绑定，也未配齐令牌签名、Access 和 Turnstile。此次没有创建数据库、附件桶、Access 应用或验证码配置，没有运行远端迁移，没有复制本地密码、密钥或 `LOCAL_DEVELOPMENT=true`。

后台代码已上传，但依赖未配置时保持拒绝访问：`/api/config` 与 `/api/admin/inquiries` 均返回 HTTP 503、`not_configured`。浏览器确认询价页显示 `Online submission is currently unavailable` 并引导 Email / WhatsApp；没有实际提交询盘、附件、邮件或消息。发布成功不代表在线询盘、后台登录或访问分析已接通。

## 验证

- Astro check：0 errors、0 warnings、9 条既有 hints。
- Backend TypeScript check、39 项后端及组件测试通过。
- `npm run build`、`npm run test:seo`、`npm run test:site`、`npm run test:inquiry` 通过。
- SEO：216 HTML、86 sitemap URL、188 条重定向；静态站点检查覆盖 8,545 个本地引用和 593 个段落链接。
- 候选核验：590 处 img、1,016 个本地引用；页面主导航 Home 只在内页渲染。
- 固定版本的全部 86 个正式页面 HTTP 200、含 noindex，响应正文 SHA-256 与候选一致。
- 70 个关键样式、脚本、图片、robots 和 sitemap HTTP 200、哈希一致。
- 稳定预览别名的首页、工厂、五轴、铣削、叶轮产品、两次装夹及车铣案例、新闻列表、客户新闻、询价共 10 页与候选一致。
- 两条既有 301 和三个排除／未知路径 404 共 5 项通过。
- 真实浏览器刷新稳定预览后确认最新首页文字、透明导航和首页隐藏 Home；390px 无横向溢出，首屏图片加载正常。实际进入询价页确认未接通提示。未重新逐页进行 86 页完整视觉验收。
- 发布后 4,076 个构建输入的哈希与发布前一致。项目生产部署列表前后均为空；本轮未发布 production 分支、修改 DNS 或推送 GitHub。

## 发布记录与回退

任务目录：`D:/lzz/项目记录/Cloudflare预览-20261030/`。包含完整候选、逐文件 `manifest.json`、源码输入摘要、部署前后清单、验证脚本及结果、构建／上传日志、桌面和手机线上截图。保留直接前版固定地址供回退参考；不自动回滚或删除历史部署。
