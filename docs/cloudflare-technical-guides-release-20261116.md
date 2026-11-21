# 技术指南与 sitemap 正式发布

发布到 https://www.lzz-cnc.com/resources/technical-guides/，线上验证于 2026-11-16T10:04:21.295Z 完成。

- Cloudflare Pages项目：lzz-precision，Production / main。
- 新部署：4a34dcbb-8701-4067-9bac-d4eec4a7895a。
- 上一生产部署：b2d89db6-0f4d-442a-90a5-98cef8e72fb2，作为本轮回退节点保留。
- 发布14篇现有技术指南的内容深化和最终语言润色，以及更新后的 sitemap。

## 发布包

从当时实际生产版本 b2d89db6 的冻结发布包复制候选，只覆盖14个文章HTML和sitemap，补入10个新文章CSS，共25个变化文件。其他页面、既有Worker和绑定保持原生产版本。没有从工作区的本地Wrangler配置发布。

生产及预览的D1、R2、变量名称/类型/公开值、兼容参数和域名，与发布前API记录核对一致。没有数据库迁移、DNS/邮件设置变更、GitHub推送或真实测试询盘。

## 线上验证

| 项目 | 结果 |
| --- | --- |
| 14篇技术指南 | 正式网址HTTP200，完整主正文、H1、标题、描述、canonical及Article与候选一致，修改日期均为2026-11-16 |
| 全站正式页面 | 96页HTTP200，正文、元数据、可索引状态与候选匹配 |
| sitemap.xml | HTTP200，正文SHA256与候选完全一致；仍为96条正式URL，其中14条目标文章lastmod为2026-11-16，其余条目不变 |
| robots.txt、llms.txt | HTTP200，与已保留候选逐字节相符 |
| 关键资源 | 133个CSS、脚本、图片或字体HTTP200且SHA256匹配；哈希资源保留immutable缓存 |
| 后端 | api/config为200，connected=true、local=false、access鉴权、detailed统计 |
| 访问保护与跳转 | 未登录admin与API仍转到既有Access；根域301到www并保留路径和查询参数；未知路径和preview路径404 |

线上邮箱经Cloudflare邮件地址保护处理，正文比较先解码邮件地址并去除其附加解码脚本，没有把正常处理误报为文案变化。固定pages.dev部署域名受既有Access保护，因此直接在正式自定义域名核验。

证据：manifest.json、project-before-redacted.json、project-after-redacted.json、deployment.log、public-http.json、public-verification.json、assets-and-access.json、release-status.json。最终编辑源文件另存于source-files/。

本轮没有自动提交Search Console，也没有根据发布或本地测试推断排名和AI引用变化。如需回退，可将Pages恢复到b2d89db6-0f4d-442a-90a5-98cef8e72fb2，无需自动恢复数据库。
