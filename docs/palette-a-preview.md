# A 方案：本地配色预览

启用：本地首页或产品详情 URL 加 `?preview=palette-a`。仅 localhost/127.0.0.1 生效，不保存浏览器偏好，不影响无参数页面及其他页面模板。底部提供原配色/A即时切换、首页/产品详情跳转、退出。

品牌矿物蓝 #205D7B；按钮 #175A7A，hover #10445E；正文 #1E2B34 / #52636F；分区 #EEF3F6；页脚 #132A36，文字 #F6FAFC / #B8CAD5；产品图片背景中性 #FAFAFA。保留 Logo 和照片文件，未改变内容和业务流程。

改动：Layout.astro 引入独立隔离样式与本地开关；PalettePreview.astro 比较工具；palette-preview.css 仅 html[data-palette=a] 生效。遵循 Impeccable colorize/craft-floor，不重排现有布局。

验证：check 142 文件零错误/警告；build 74 页面；test:seo 通过。浏览器确认 A 按钮 rgb(23,90,122)、页脚 rgb(19,42,54)，切回原色按钮 rgb(203,18,23)。桌面产品页和首页预览可用，390px 产品页无横向溢出。

4323 原服务返回 FailedToLoadModuleSSR；未中断该服务。另用构建输出启动 4324 本地预览（astro preview），供用户确认。没有部署。

首页：http://127.0.0.1:4324/?preview=palette-a

产品：http://127.0.0.1:4324/products/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/?preview=palette-a
