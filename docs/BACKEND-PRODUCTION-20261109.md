# LZZ 生产后台

2026-11-09，正式站已连接生产数据库、私有附件存储和 Cloudflare Access。后台入口：[LZZ 管理后台](https://www.lzz-cnc.com/admin/)。站点保留既有询价和联系方式，访客可以正常打开公开页面。

- 生产使用 Cloudflare Pages Functions；`DB` 绑定 D1，`FILES` 绑定私有 R2。迁移脚本在 `migrations/`。
- Access 保护 `/admin` 和 `/api/admin`，管理员通过受限邮箱的一次性验证码登录。服务端校验 Access JWT 和管理员白名单。
- 询盘表单需要真实 Turnstile 验证。`TOKEN_SECRET`、`TURNSTILE_SECRET_KEY` 和具体管理员配置在 Cloudflare 管理，不进入仓库。
- 详细访问模式记录同一浏览器的站内操作。WhatsApp、邮箱、询价按钮是点击事件，实际收到询盘以服务端入库为准。

接通时通过生产配置、事件入库、去重、访问保护和私有存储读写检查，并在正式页面点按验证了三类联系入口。通过真实人机验证的成功询盘和 Access 登录后的后台读取需要单独验收；不能以配置接口成功替代这两项结果。

本地开发和部署参数见 [后台开发说明](SITE-BACKEND-20261022.md) 与 [生产配置模板](../wrangler.production.example.jsonc)。使用已配置生产绑定的独立发布包部署。仓库根目录的 `wrangler.jsonc` 用于本地开发。
