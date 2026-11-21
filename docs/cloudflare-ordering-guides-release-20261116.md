# RFQ & ordering 六篇文章与 sitemap 正式发布

已发布到 https://www.lzz-cnc.com/resources/ordering/，线上验收完成：2026-11-16T11:37:22.240Z。

- Cloudflare Pages：lzz-precision，Production / main，账号由Wrangler现场确认属于用户指定邮箱。
- 当前生产部署：1c3312d8-ce1d-4d7b-8785-7a74aa393116。
- 发布前部署/回退节点：4a34dcbb-8701-4067-9bac-d4eec4a7895a。
- 范围：本次润色深化的六篇ordering文章，以及它们实际修订日期对应的sitemap。

## 发布内容

- [What determines the cost of a CNC machined part?](https://www.lzz-cnc.com/resources/ordering/cnc-machining-cost-factors/)
- [Prepare a CNC machining RFQ](https://www.lzz-cnc.com/resources/ordering/rfq-checklist/)
- [How to compare CNC machining quotations](https://www.lzz-cnc.com/resources/ordering/compare-cnc-machining-quotations/)
- [What does prototype approval actually release?](https://www.lzz-cnc.com/resources/ordering/machined-prototype-approval-checklist/)
- [Moving from a CNC prototype to a small batch](https://www.lzz-cnc.com/resources/ordering/prototype-vs-small-batch-cnc/)
- [Packaging and shipping CNC machined parts](https://www.lzz-cnc.com/resources/ordering/custom-cnc-parts-shipping-checklist/)

在已核对当前生产ID和现网sitemap的基础上，从对应冻结生产包复制候选。只覆盖六个文章HTML和sitemap，增加16个文章所需CSS文件，共23个包内文件发生变化；4052个文件保持逐字节一致，没有删掉既有生产文件。文章正文与上一轮经过桌面/手机审阅的产物逐章节一致。导航、页脚、脚本引用及图片引用均与旧生产页一致，Worker源文件SHA256保持不变。没有将工作区其他未发布页面或本地后台配置混入本次上传。

## 实际线上核验

| 项目 | 实际结果 |
| --- | --- |
| 六篇目标文章 | 正式URL全部HTTP200；完整main正文、H1、title、description、canonical及Article与候选相符，dateModified均为2026-11-16 |
| sitemap.xml | HTTP200且SHA256与候选完全一致；96条正式URL；六篇lastmod由2026-11-12更新为2026-11-16；其余条目保持原样 |
| robots.txt / llms.txt | HTTP200，与保留的生产包逐字节相符 |
| 全站正式页面 | 96页HTTP200，完整主内容、元数据、可索引状态与候选匹配；共33个Article页面结构化数据一致 |
| 关键资源 | 135个CSS、脚本、图片/字体等资源HTTP200、SHA256一致；/_astro/哈希资源保持immutable缓存 |
| 后台连接 | /api/config返回200，connected=true、local=false、adminAuthMode=access、analyticsMode=detailed |
| 正式配置 | API读取的生产/预览D1、R2、公开变量值和变量类型、兼容参数及域名与发布前记录一致；秘密值不输出 |
| 跳转与保护 | 根域301至www，路径和查询参数保留；未知及preview路由404；未登录admin/API继续进入原Cloudflare Access |

Cloudflare会对邮箱地址添加邮件保护编码和解码脚本，全文比较时已按现有机制解码邮箱并排除附加脚本。pages.dev固定部署域名受既有Access保护，本次直接对正式自定义域名核验。普通网页读取工具未能访问两个文章URL，随后采用实际HTTP抓取与HTML解析完成全部正式URL核对，没有把该工具的访问失败当成网站故障。

本轮未执行数据库迁移、DNS或邮件配置变更、GitHub推送、真实询盘提交或Search Console提交。发布与可抓取检查不代表已被搜索引擎重新收录，也不代表排名或AI引用已变化。

## 证据与回退

manifest.json、sitemap-before.json、project-before-redacted.json、project-after-redacted.json、deployment.log、public-http.json、public-verification.json、assets-and-access.json及release-status.json保存本轮完整记录。编辑源副本位于source-files/。若另行决定回退，可使用Pages上一生产部署4a34dcbb-8701-4067-9bac-d4eec4a7895a；本轮没有数据库变更需要逆迁移。
