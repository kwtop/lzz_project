# 询价表单视觉精修

已调整 /quote/ 的表单工作区与草稿预览，沿用 Penta 的字体、暖白背景、石墨文字和铜色操作。主表单增加完整内边距与细边界；当前参考与更换操作对齐；联系提示移到整组下面；准备按钮、存储状态和辅助操作归于底部。右侧联系栏用细线分隔信息，保留原联系渠道与现有参考摄影。

1440、1024、768、390、320px 实际浏览器检查均无横向溢出。959px 以下联系栏移到表单之后，768–959px 的联系区内部按内容分栏。所有字段 16px、至少 52px 高。手机主操作整行，草稿长文本可换行。

实际操作验证了空表单与错误邮箱校验、首个错误焦点、有效邮件草稿预览、只提供手机号、参考切换及焦点、刷新恢复、编辑和清除。通用入口、最长产品名称和自由主题入口在手机端正常。键盘焦点为铜色 2px 实线。最终浏览器无 error 日志。邮件应用链接仅核对 mailto 和正文，未打开应用或发送。

前后构建 HTML 的 H1、title、description、canonical、JSON-LD、字段 ID/name/type/required/maxlength、参考选项及原链接一致。QuoteForm 的全部状态与事件逻辑逐字比对未改；React 只调整展示结构、辅助说明位置和按钮图标。复制与下载事件保留原实现，本轮未额外触发复制或下载。

npm run check：996 files，0 errors、0 warnings、9 个原有 hints。npm run build、既有 verify-inquiry-draft、verify-inquiry-context、test:seo 与 test:css 通过。SEO 检查覆盖 215 HTML、86 sitemap URLs、188 redirects、91 raw URLs；CSS 测试 8 项通过。最终 CSS 改动后重新构建并复验 CSS/SEO。

修改仅 QuoteForm.tsx、quote-approved.css 和 DESIGN.md 第 25 节。直接前版与最终源码保存在 D:/lzz/quote-form-polish-20261018/baseline/ 与 after-source/；交付目录 design/quote-form-polish-20261018/ 含截图、浏览器记录、日志和 task.patch。差异已通过反向应用检查，未实际回退，也未覆盖其他改动。

仅本地完成，未部署生产。询价仍准备邮件草稿，没有发送或上传功能变化。测试使用私有新标签页，未操作用户现有页面中的草稿。
