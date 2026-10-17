# 本地 SEO 迁移基础

正式 origin：`https://www.lzz-cnc.com`。当前仅生成本地静态发布产物，没有部署、DNS 切换、流量切换或搜索引擎提交授权。raw 中发现的旧 URL 已使用该 origin；这里处理的是旧站到新站的路径替换，不臆造另一个旧域名。

## 数据与映射

只读输入：`src/data/catalog.json`、`../../raw/_content/_meta/page-manifest.json`、`../../raw/_content/sources/sitemap.xml`。可用 `LZZ_CONTENT_ROOT` 指向同结构的原始归档目录；默认路径相对于项目目录，不依赖执行命令的位置。构建环境必须带有该归档。脚本不会运行内容导入或修改 raw/catalog。

当前 raw 有 91 个独立 URL，合并 sitemap 后仍为 91 个。生成 86 条精确路径 301；首页 `/` 保留原地址，4 个已发现的分页查询 URL 由相应列表路径规则覆盖。不会添加猜测的大小写、斜杠或数字 ID 别名，不使用通配符跳首页。

| 来源 | 发现数量 | 新目标 |
| --- | ---: | --- |
| 产品 `sourceAliases` | 53（35 个产品） | 对应 `/products/{catalog.slug}/` |
| 产品分类 | 20（10 个分类各两套路由） | 对应 `/capabilities/{catalog.slug}/` |
| 文章详情 | 2 | 对应 `/insights/{catalog.slug}/` |
| `/about`、`/custom/advantage` | 2 | `/about/` |
| `/custom/factory`、`/custom/download` | 2 | `/factory/` |
| `/contact` | 1 | `/quote/` |
| `/product`、`/article` | 2 | `/products/`、`/insights/` |
| 两种文章分类路径、两个分类名称 | 4 | `/insights/`（包含两篇现有文章） |
| 首页 | 1 | 保留 `/`，不生成自重定向 |
| `product?page=1/2/3`、`article?page=1` | 4 | 合并到完整的新列表，由上述路径规则处理 |

旧下载页是三份公司证书/牌匾；新工厂页的 Company documents 含对应原始材料，因此映射到工厂页。旧优势页内容属于公司介绍，映射到关于页。映射可由 `node --input-type=module -e "import {migration} from './scripts/build-seo.mjs'; console.log([...migration().targets]);"` 查看，包括每个旧查询 URL。

## 生成与验证

`npm run build` 在 Astro 完成后执行 `scripts/build-seo.mjs`，只在 `dist` 写入 `_redirects`、`robots.txt`、`sitemap.xml`。不在 public 保存易过期的副本。

已有主 Agent 构建结果时执行：

```powershell
npm run build:seo
npm run test:seo
```

sitemap 扫描实际 `dist/**/*.html`：排除 404/500、robots/googlebot/bingbot 的 noindex/none。不伪造 lastmod。canonical 和 Schema 由页面负责；生成器不修改 HTML。非排除页面缺少唯一正式域名自引用 canonical 或 sitemap 将为空时，构建直接失败。完成发布验收还必须让 `test:seo` 通过，不能只看文件已生成。

验证涵盖：每页 title/description 单一且非空、可索引页面之间 title/description 不重复、canonical 唯一及正式 origin/路径一致、静态 HTML 中 JSON-LD 存在且可解析并具基本 context/type/graph 结构、404 noindex、重定向精确覆盖/重复规则/301 状态/目标 HTML 存在且非 noindex/链和循环、sitemap 与实际合格 HTML 完全一致、robots 发布意图。noindex 页面允许不输出 canonical。JSON-LD 检查不等同 Rich Results 验证，也不验证声明的商业事实或运行时注入的 Schema。

2026-09-09 集成后验收：完整 build 成功，60 个 HTML、59 个 sitemap URL、86 条精确 301 规则、91 个旧 URL 全覆盖。`npm run test:seo` 通过：canonical、独特 title/description、基础 JSON-LD、404 noindex、映射目标、无链无循环及 sitemap 内容一致。站内链接与全部正常路由浏览器回归也通过。这是本地产物验证，不是生产响应验证。

图片资产：归档 asset-manifest 的远程来源均为 `dzs.cdn.multi-masters.com` 或 `new.cdn.multi-masters.com`，不属于本次可配置的 lzz-cnc.com origin。新页面使用已存在的本地优化媒体；没有伪造第三方 CDN 的重定向权限。未来若停用原 CDN，应另行核对资产依赖与授权。

## 部署与预览边界

robots 内容表达正式发布意图：`User-agent: *`、`Allow: /`，以及正式 sitemap 地址。它不是上线证明。预览站应由主机设置 `X-Robots-Tag: noindex`（或明确的预览 HTML noindex），需要时配合访问控制；仅 robots 禁止抓取不能保证不被索引。当前这两个脚本不配置预览响应头。

`_redirects` 必须由支持该格式的生产主机执行，或由部署者转换为等价规则。Astro 静态预览不会因此自动返回真实 HTTP 301。发布前需要授权并核对主机对精确路径、大小写、尾斜杠、静态文件优先级和规则优先级的行为。

`_redirects` 使用路径匹配，不在 source 中写不可移植的 `?page=` 语法。旧分页查询与无查询列表目标相同。部署者应确认查询字符串是否保留，最好在主机层清除这些旧分页参数，使最终 Location 为干净列表 URL；若主机保留参数，新列表 canonical 仍应指向无查询 URL，但这不等于已验证单跳到干净 URL。不要声称本地覆盖检查验证了主机查询行为。

上线授权后再验证真实响应：全部映射的 HTTP 301 与最终 200、无链、查询参数行为、未知 URL 为真实 404、HTTPS/www 统一、预览 noindex 与正式 allowcrawl 不混用，然后提交 sitemap 并监测索引。任何额外旧域名迁移都需要真实域名证据及主机配置，不能从这里推断已完成。
