# 浏览器与执行验证记录

日期2026-09-28；仅本地，不代表部署验收。

|样本|操作/观察|证据|
|---|---|---|
|首页390×844|首屏可读；测得document scrollWidth375≤innerWidth390；渲染JSON-LD为Organization/WebSite/WebPage|home-390.png|
|产品目录390|12精选→点击View all 35 parts；存在precision-cnc-machined-castings-manufacturer链接；main共有39产品链接（35条+4几何快捷入口），无横溢出|浏览器DOM观察；全量HTTP清单含noscript|
|发动机盖详情390|目录进入详情；名称→图片→用途→CTA；已显示完整周期条件|product-390.png|
|产品到询盘390|点击Discuss this part；URL保留原长part参数；表单可见、无横向溢出；未输入任何个人资料/未准备草稿/未发送|quote-context-390.png；上下文赋值另经QuoteForm源码核验，innerText不包含textarea value，不能据此说上下文丢失|
|质量1440×900|流程/Equipment/Records/Certification入口在首屏可见|quality-1440.png|
|五轴768×1024|scrollWidth753≤768；Drawing planning默认折叠；首屏内容和页内导航可见|five-axis-768.png|

本轮不是全部69页三断点视觉测试；未实测键盘全流程、筛选组合、外部邮件应用、草稿读写、性能指标。首次浏览器列表查询失败，随后直接绑定已知本地标签成功；没有把失败写成站点问题。测试后恢复viewport默认并回到首页。

## 静态与本地HTTP

`node docs/seo-geo-audit-2026-09-28/collect.mjs`：69路由；68个200、404页404；无重复Title/Description、无H1数量错误、无发现的站内失效URL/锚点。解析包含noscript；不把内容藏在JS与不可抓取画等号。

`npm run test:seo` 通过：69 HTML、68 sitemap URL、86 redirects、91原始URL覆盖。测试针对现有dist，不等于本轮重新构建；未运行构建以保持业务产物不变。Host behavior not tested。

source-hashes.json保存本次开始时src的SHA256基线；最后核对结果见validation.json。脚本和报告仅在本审计目录新增。没有业务源码修改、图片生成、部署或真实询盘发送。
