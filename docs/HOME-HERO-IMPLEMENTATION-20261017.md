# 首页居中加工首屏实施记录
日期：2026-10-17。范围：正式首页 / 的首屏及首页导航外观。用户确认 A 居中方案后实施。未部署、未 Git push。

## 已实现
- 首页以完整加工画面承接居中标题、业务说明、主询价按钮和图库链接；各元素是可选中、可导航的真实 HTML，不是整页图片。
- Logo 使用原始 /media/lzz-logo.png。桌面导航为透明深色，滚动后加深；手机导航可随内容增高。原菜单、子菜单、键盘和询价入口保留。
- ImageGen 基于已确认稿移除全部 UI，生成无文字桌面背景；另做手机竖幅，保留文字安全区和右下刀具。以 Illustration 明确标注，不能作为真实工厂或具体产品证据。
- WebP 仅进行编码及等比缩放，桌面1440版本约96.5KB，手机480版本约41.6KB；原图、提示词、SHA256保存在 design/home-hero-20261017/。
- 未修改首页下方业务信息。仍有5个核心模块：业务定位、按零件/工艺/材料选路、两次装夹示例、工厂与验收、报价资料与条件。9张内容图片，响应尺寸/手机替代构图不重复计数。
- URL、全部原链接、SEO元数据及结构化数据保留。没有新增企业事实、交付承诺或虚假证据。

## 实际修正
1. 首轮手机38px以下未采用，42px标题出现不自然断行，调整为38px，390px时保持完整两行。320px使用36px。
2. 平板直接cover导致刀具被裁切；改为底部完整画面与渐变衔接，不让机器侵入标题。
3. 200%文字放大时固定导航高度裁切按钮；手机改为自适应高度，使用深色底，保持标识与菜单清晰。
4. 桌面导航滚动后背景加深，避免与下方白色正文混色。
5. 不重复添加底部工艺标签，现有简介已完整表达这三种工艺。

## 验证
- 浏览器截图：1672×941参考校准，1440×900、390×844整页与首屏；320、768、1024补充检查。均无横向溢出、坏图、页面脚本异常。
- 桌面菜单、手机菜单及Escape关闭实际操作通过；图库和询价按钮实际点击通过。
- 询价空值校验、填写后本地草稿生成通过；邮件链接仍指向原收件人。未发送邮件、未调用外部邮件应用。
- 首页36个内部路径无HTTP错误；SEO元数据、链接列表、首屏以下正文与前基线一致。
- CNC铣削页复查未出现首页主题；前后1440×900首屏像素完全相同。完整长截图的下方图片存在懒加载时机差异（y5166–5950），因此不声称整页像素相同。
- npm run check：0 errors、0 warnings、9条原有hints。
- npm run build：144条静态页面构建成功，84条sitemap URL。
- npm run test:seo：207 HTML、84 sitemap URL、188 redirects通过。本地验证不代表生产主机行为验证。
- draw-ui截图条件校验通过，hero位置与参考对应；导航比生成稿低6px，按钮因真实字体约窄22px、位置低约20px。未宣称像素完全复刻。
- 文字放大测试为浏览器内将实际字号放大至200%的模拟，非特定系统辅助技术认证。首屏保持完整可读；下方既有内容未在本轮重排。

## 文件与证据
实际业务改动：
- src/components/PentaHome.astro
- src/pages/index.astro
- src/layouts/Layout.astro（仅可选首页主题属性）
- src/styles/home-immersive-hero.css
- public/media/home-hero-20261017/
- DESIGN.md追加已确认首页例外规则

基线及完整材料：D:/lzz/home-hero-implementation-20261017/
- baseline/：改动前源文件和DESIGN.md
- screens/before-home.png、before-home-mobile.png：前整页截图
- screens/round-03-desktop.png、final-mobile.png：后整页截图
- screens/round-03-desktop-viewport.png、final-mobile-viewport.png：后首屏
- screens/final-tablet-768-viewport.png、final-tablet-1024-viewport.png：平板
- screens/final-text200-top.png、final-text200-hero.png：模拟文字放大
- round-03/qa.json、round-03/report/：实际截图条件、页面与交互检查
- final-checks.json：内容、链接、SEO、询价验证
- build.log、check.log、seo.log：本地命令结果

剩余边界：本轮仅首页首屏。选定稿的摄影为通用示意，原始标识和真实业务资料继续独立保留；生产发布未执行。

