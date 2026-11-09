# 默认浏览器访问轨迹

2026-10-30，用户进一步明确需要个人浏览轨迹、前台无首次弹窗、后台默认记录。本轮在本地实现，未发布。

## 行为与边界

- 公开页面加载时自动建立第一方浏览器和访问编号，记录页面、产品浏览、技术说明展开、图片查看、下载和联系点击、开始填写及提交错误。前台不显示首次选择框。
- 通过随机浏览器 Cookie 连接同一浏览器的页面和后续访问。浏览器 Cookie 最长 180 天；访问编号在 30 分钟无记录活动后失效。更换浏览器/设备、清除或拦截 Cookie 会分成不同记录，访客数不等于精确人数。
- 开启统计时提交询盘，服务端把当前浏览器的访问过程与已保存询盘关联。联系点击仍不等于询盘；成功询盘仅由数据库实际保存记录统计。
- 隐私页说明记录范围、Cookie、回访和询盘关联，提供关闭与清除当前浏览器记录的入口。关闭不会影响浏览或询盘提交；已有拒绝选择与 DNT/GPC 继续有效。
- 统计不读取输入过程、未提交表单或图纸，不保存原始 IP、完整 User-Agent 或 referrer 查询参数。它只记录本站公开页面和允许的行为，不识别另一设备上的同一人。

## 接口与口径

`POST /api/analytics/session` 是自动启动入口，不提交 `granted:true`，也不生成“访客已同意”的证明。默认未配置 `ANALYTICS_MODE` 或设为 `detailed` 时创建随机编号；显式 `aggregate` 则保留早先的纯汇总模式。

`POST /api/events` 由服务端签名 Cookie 关联浏览器和访问。每个事件有随机事件 ID，响应丢失后沿用原 ID 重试，数据库去重。客户端队列有数量与请求时限，采集失败不阻断网站或询盘。时间使用服务端收到的时间；不可把批次接收时间解释为精确停留时长。

隐私页关闭时向 session 接口提交 `enabled:false`，立即清空队列并取消待发请求，清除标识 Cookie，同时保存关闭偏好。服务端也检查签名的关闭偏好，阻止旧页面继续使用先前编号写入。重新开启是显式的浏览器偏好变更。`analyticsEnabled` 只表示当前采集开关，不表示取得了法律意义上的同意；旧 `analyticsConsent` 仅兼容原版本。

后台恢复访客数、访问次数、页面浏览量、回访访客、联系点击、开始填写人数、成功询盘和错误次数；访问过程可回看各页面与事件。统计默认排除内部测试及已识别机器人。之前保存的小时汇总和个人事件保持独立，不把两种口径合并成同一趋势，也不删除已有数据。

## 发布边界

本地技术设置不代表已取得站点访客同意。适用规则取决于实际服务对象和地区；英国 ICO 明确将保留个人操作日志和追踪个体的分析排除在纯统计豁免之外。面向要求事先同意的地区正式运行时，需要在启用这类采集前处理相应同意要求，单独的隐私页说明不能代替所需同意。

来源：[ICO：What are the exceptions?](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-the-exceptions/)，2026-10-30 核对。生产配置模板只是部署参数示例，本轮没有创建远端资源、迁移或发布。

主要文件：`src/lib/siteAnalytics.ts`、`server/analytics.ts`、`server/index.ts`、`server/inquiries.ts`、`server/admin.ts`、`src/components/AdminApp.tsx`、`src/pages/privacy.astro`。快照、日志和浏览器证据位于 `D:/lzz/_qa/default-visit-journey-20261030/`。

## 本地验证

39 项后端/组件测试通过，覆盖无首次弹窗的默认启动、同编号跨页、过期访问与回访、响应丢失后重发不重复计数、默认后台、询盘关联、关闭偏好、DNT/GPC 和显式汇总模式。Worker/Astro 类型检查通过（0 errors、0 warnings，9 条既有 hints），构建、SEO 与全站引用检查通过。

实际浏览器记录了铣削服务页到产品详情页的访问，后台在同一条浏览器轨迹中展示两页及产品查看事件；本地 HTTP 测试的询盘也能从对应轨迹展开查看。关闭后刷新显示停止采集，重新开启恢复；390px 设置区无水平溢出。浏览器和 HTTP 测试记录均标记内部，后台默认排除。证据见上述目录的 `result.json`、`browser-result.json`、`http-result.json` 及 `admin-journey.png`。
