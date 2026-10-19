# 全站独立次级入口优化 · 2026-10-19

把模块末尾零散的下划线链接整理为细描边、带方向箭头的次级按钮。继续采用当前 Penta 风格的石墨、暖白和铜色；成组入口保留开放导航行，正文行内链接保留阅读样式。

## 范围与实际改动

- 盘点 86 个正式 URL，排除历史演示与预览路由。匹配独立入口 128 处、56 页，覆盖 Capabilities、零件、加工案例、工厂、公司资料、联系和采购资源。另核对样式范围内 89 个成组入口。
- 独立入口 16px、中等字重、48px 最小高度、4px 圆角；保留可换行的完整标题与箭头空间。首屏次级入口按主按钮高度对齐，手机至少 48px。
- 铣削案例的末尾入口增加细分隔线和明确留白；深色案例与询价区域采用浅色描边。产品加工说明区按当前实际浅色背景处理，修正旧深色模块规则的继承；照片到按钮留 18px，按钮到说明留 12px。
- 唯一运行时代码改动为 `src/styles/context-links.css`；未增加脚本、图片或新行为。DESIGN.md 第 27 节记录最终规则。

## 验证证据

- 真实浏览器检查 86 页 × 1440px / 390px，共 172 个不同页面状态；检查按钮尺寸、换行、边界、页面溢出和颜色。修正产品区颜色后重新核对全部 35 个产品页的两个宽度。
- 最终未发现本轮入口的溢出、点击区域过小或文字/纯色背景对比度问题。像素视觉通过铣削页、深色案例、公司资料、下载入口等代表截图复核，不能把 DOM 通过等同于逐像素视觉认可。
- 键盘 Tab / Shift+Tab 验证 2px 铜色焦点；Return 成功进入双装夹案例；首屏次级入口正确定位 `#part-examples`。
- 逐页对照 1,256 个主内容链接的目标与文字，所有目标和文字一致。H1、title、description、canonical、JSON-LD、IDs 和技术表格一致。询价继续准备邮件草稿。
- `npm run check`：0 errors / 0 warnings，9 条既有 hints。
- `npm run build`、`npm run test:seo`、`npm run test:css`：通过；CSS 优化检查 8 项通过。

## 回退与附件

- 工作目录：`D:/lzz/standalone-links-20261019/`。
- `baseline/`：直接前版 context-links.css、DESIGN.md、全站链接台账与契约；`browser-qa.json`、`verification.json`：实际浏览器与契约检查结果。
- `screenshots/`：铣削同位置桌面/手机前后截图及其他代表页；每张截图的实际 URL、视口和滚动位置记录在 metadata.json。
- 保留共享工作区既有改动，只按本轮 task.patch 回退。Cloudflare 更新限既有 `preview` 分支，不修改正式域名与 DNS。最终发布 URL 和远程核验另附于本报告。

## 已更新 Cloudflare 预览

- 稳定地址：https://preview.lzz-precision.pages.dev/
- 本次固定部署：https://af1ff884.lzz-precision.pages.dev/
- 上一版固定部署：https://1e1b9483.lzz-precision.pages.dev/
- 发布包为 `release/candidate-final/`，3,791 文件；实际上传 172 文件，其余复用。逐文件 SHA-256 记录于 `release/manifest.json`，标记包含工作区现有未提交内容。
- 远程 86 个正式 URL 均返回 200，HTML 与本次发布包哈希一致；16 个关键资源和稳定别名的 3 页哈希一致。旧 URL 重定向、排除的演示路径 404、预览 noindex 和 robots Disallow 保持。
- 稳定预览站实际浏览器复核：铣削页 1440px / 390px、产品页 390px，按钮字体、48px 高度、箭头、18px 照片间距及页面溢出均符合本轮规则。
- 仅更新 preview，未修改正式域名或 DNS。技术验证通过不替代用户对视觉效果的判断。
