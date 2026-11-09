# Cloudflare 正式站发布 · 2026-11-08

已按用户要求，将最新网站发布到 **https://www.lzz-cnc.com/**。此次是 lzz-precision 项目的首次 Production 发布，通过既有 Cloudflare 账号认证发布。

## 当前上线版本

- 项目：lzz-precision；账号：<account-id>。
- 环境/分支：Production / main。
- 部署 ID：4d2264aa-2709-46ca-8532-16430df88ddf。
- 固定版本：[4d2264aa.lzz-precision.pages.dev](https://4d2264aa.lzz-precision.pages.dev/)。
- 正式入口：[www.lzz-cnc.com](https://www.lzz-cnc.com/)。
- 根域名：[lzz-cnc.com](https://lzz-cnc.com/)；301 转到 HTTPS www，保留路径及查询参数。

包含全部当前网站、十篇产品专题、其余十篇采购/技术指南及 11 月 2 日完成的内容扩充。此前的 Penta 布局、图片、导航、页脚及产品到指南的正文链接一起发布。最新构建比此前 2404ca4f Preview 的输入仅有已登记的十一项 src 差异；未部署来源不明的额外代码。文件比对见 changes-from-preview.json。

发布包 3,846 个文件、324,130,679 bytes；Worker 为 99,559 bytes。Wrangler 处理 3,842 个静态资产，新增上传 35 个、复用 3,807 个。排除八类内部设计/历史预览目录；保留 96 个正式 sitemap URL、20 篇指南及 188 条原路径跳转。包内没有本地配置、密码或 LOCAL_DEVELOPMENT=true。

## 域名、HTTPS 与收录设置

两个自定义域在 Cloudflare Pages 中都显示“活动 / SSL 已启用”。本轮把根域和 www 的现有 CNAME 从 lizhizao.wdhhz.com 更新为 lzz-precision.pages.dev；新增且仅针对根域的一条永久跳转规则。HTTP www 也已通过既有行为转到 HTTPS。测试 https://lzz-cnc.com/resources/technical-guides/?release=20261108 返回 301，Location 保留了原路径和查询参数。

正式页没有全站 noindex；robots.txt 为 Allow: /，sitemap 和 canonical 指向 https://www.lzz-cnc.com。管理员区域继续 no-store/noindex。固定部署地址的 Cloudflare 自动 noindex 与正式自定义域分别验证，不把 Pages 的固定地址当作正式索引入口。

Cloudflare 和 Google 两个公共 DNS 解析器均已返回 Cloudflare 地址及指定 NS。第一次普通探针仍命中旧站，记录在 custom-domain-first-stale-probe.json；随后以公共 DNS 地址保持原主机名和有效 TLS 直连检查，再由 Chrome 和普通访问复查，已看到新站。最终普通访问的 96 页检查通过；没有关闭证书校验或修改本机/浏览器 DNS 设置。

## 邮件设置按用户要求保留

用户明确选择“只发布网站，邮件设置不动”。imap、pop、smtp、mail 的目标与代理状态，以及 MX、SPF、DMARC 均与发布前一致，八条非网站记录逐项比对通过。本轮没有发送邮件或实际询盘。

复查时另观察到一条 Google site-verification TXT；本次发布没有写入或修改该记录。它没有被回退或覆盖，来源不在本轮操作记录中作推断。

## 内容和功能验证

| 检查 | 结果 |
|---|---|
| npm run check | 0 errors、0 warnings，9 个已有 hints。 |
| npm run build | 通过；157 个 Astro 构建页，最终 226 HTML / 96 sitemap URL / 188 redirects。 |
| test:site、test:seo、test:inquiry | 全部通过；站内目标、SEO 和询价来源/字段/传输状态检查保留。 |
| check:backend | 通过；没有在本轮创建远端数据库或执行迁移。 |
| 固定部署版本 | 96 个正式页面 HTTP 200、SHA-256 与发布包逐字节一致；130 个关键资源一致。 |
| 正式域名普通访问 | 96 个页面 HTTP 200，标题/H1/描述/canonical 正确且允许索引；20 篇指南的完整正文与更新日期符合候选；130 个关键资源哈希一致。 |
| HTML 边缘处理 | 正式域名保留 Cloudflare Email Address Obfuscation，因此 HTML 不作逐字节相等的虚假结论；实际邮箱入口在浏览器已解码为 mailto。 |
| 路径控制 | 两条旧 URL 301、三个未知/排除 URL 404 通过。另验证根域名、HTTP 根域名、HTTP www 的路径/查询参数跳转。 |
| 浏览器抽查 | 8 次真实 Chrome 检查：首页 1440/390、指南目录、铸件指南 1440/390、壳体指南、产品页、询价页。全部无横向溢出与未加载图片。 |
| 交互 | 正式产品页 wall thicknesses 链接进入对应壳体指南，显示 Updated 2 November 2026；手机菜单可展开、收起。 |
| Preview | 原 preview 分支部署列表和首页哈希不变，仍为 2404ca4f 对应内容、noindex。 |
| 输入一致性 | 发布前后的 4,101 个构建输入哈希一致；没有覆盖现有 Git 工作区。 |

Cloudflare 自定义域使用 CNAME、需要先关联 Pages 再解析的依据见[官方自定义域说明](https://developers.cloudflare.com/pages/configuration/custom-domains/)；主机跳转通过 Zone Redirect Rule 配置，没有把不支持的域级规则塞入 Pages _redirects，见[官方重定向说明](https://developers.cloudflare.com/pages/configuration/redirects/)。这些文档用于实施依据，线上结果以上述实际探针为准。

## 尚未接通的询价后台

线上 /api/config 与 /api/admin/inquiries 都为 503 not_configured；没有 D1/R2 绑定。线上询价页明确显示 Online submission is currently unavailable.，保留 Email/WhatsApp 联系入口，没有伪报发送成功。这次完成内容上线，不代表已建立在线收件、附件存储、后台登录或统计记录；没有发送真实客户数据进行测试。

生产环境使用与已验证包配套的 2026-10-01 兼容日期、nodejs_compat、access/detailed 模式；没有上传本地密码模式、占位数据库或桶。预览环境的既有模式保留。远端发布前/后的配置均已下载到本轮记录目录，未包含密钥内容。

## 回退与证据

本轮记录目录：[Cloudflare正式发布-20261108](../../../项目记录/Cloudflare正式发布-20261108/)。manifest.json、source-inputs.json、release.json、域名前后记录、部署清单、命令日志和实际截图可复查。候选包独立保留，未推送 GitHub。

这是首次 Production 部署，发布前没有旧 Production ID 可以一键回滚。若需要恢复此前第三方站点，原网站 CNAME 目标 lizhizao.wdhhz.com 及完整 DNS 前版已留存；应只按授权恢复两条网站记录，并复核根域跳转，不改邮件或后来新增的 TXT。不要删除当前部署或把带全站 noindex 的旧 Preview 直接当正式回退包。

![正式首页](../../../项目记录/Cloudflare正式发布-20261108/online-home-hero.jpg)

![域名状态](../../../项目记录/Cloudflare正式发布-20261108/custom-domains-active.jpg)

没有在本轮宣称 Google 已收录、排名变化、GEO 引用、真实询盘增长或实测 Core Web Vitals 改善。
