# 首屏装饰小标签移除

已从 CapabilitySceneHero 删除标题上方的分类小字及其装饰横线，同时删除相应桌面/手机 CSS。12 个正式 Capabilities 页面同步生效；其他正式页面没有同类 eyebrow/kicker/overline 元素。未修改历史设计预览。

本轮只改 CapabilitySceneHero.astro、capability-scene-hero.css 和 DESIGN.md 第 24 节。原始文件及本轮差异保存在 D:/lzz/eyebrow-cleanup-20261018/，task.patch 已通过非修改性的反向应用检查。

12 页在 1440px 与 390px 完成 24 个浏览器状态检查，无残留标签、横向溢出、标题与面包屑相撞或缺失首屏图。铣削、铝件与原型页面保留最终桌面/手机截图，另有铣削整页截图；最终浏览器无 error 日志。

npm run build 和 npm run test:seo 通过。对照全部 86 个正式 URL，H1、title、description、canonical、JSON-LD、锚点、链接和技术表格保留，删除 12 个分类标签后正式页中残留为零。

仅本地实施，未部署。截图与验证交付见 design/eyebrow-cleanup-20261018/。
