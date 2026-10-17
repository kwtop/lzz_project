# 首页图文编排样板

日期：2026-09-28

## 范围

- 独立预览：`http://127.0.0.1:4324/preview/home-editorial/#parts-preview`
- 实现文件：`src/pages/preview/home-editorial.astro`
- 保留原红黑白配色、Logo、首页 Hero、公共导航与页脚。
- 原首页与内页没有替换；预览页 noindex，不加入站点地图。

## 调整

1. 三个精选产品等宽开放展示，移除卡片外框与大片灰底。
2. 工厂照片大幅展示；公司信息、检测设备与检验说明建立独立层级。
3. 加工工艺使用文字列表与大图，工艺案例采用双列图文结构。
4. 材料入口收简，询盘区域去掉重复容器与配图。
5. 底部提供改版区域定位和原版对比链接。

使用现有图片和来源说明，无新增生成图，无修改企业承诺或原始资料。Impeccable 的布局方法用于区分视觉主次、减少重复容器，不扩大本次改动范围。

## 验证

- `npm run check`：143 文件，0 error / warning / hint。
- `npm run build`：75 页面成功。
- `npm run test:seo`：73 sitemap URL，86 redirects，通过。
- `node docs/content-upgrade-2026-09-28/verify-content.mjs`：75 页面、4765 链接与图片引用，0 失败。
- 浏览器：1440×900 查看产品、工厂/检测、案例实际布局；390×844 查看产品区域与响应式布局。
- 390px 检查无横向溢出；已完成加载的图片无失败。未进行全站交互复测或真实询盘发送。

## 状态

用户于 2026-09-28 确认方向后，已应用到首页，并推广到内页。首页与预览页共用 `src/components/HomeEditorial.astro`；旧预览的 `#parts-preview` 转到 `#selected-parts`。详细交付见 `editorial-rollout-2026-09-28/README.md`。未部署。
