# 全部产品图片精修

2026-09-22，本地完成，未发布线上。

35/35 个产品已使用精修展示图。本轮使用内置 imagegen 新生成 13 张：补齐 11 个剩余产品，并重新处理进气系统装配 CAD 与黄铜堵头批量件。此前 22 张精修图经原图对照后保留。

## 文件

- 网页图片：`public/media/catalog-*-retouched-v4.webp` 及对应 `-480`、`-800` 版本；本轮共 39 个文件。
- [本轮完整生成提示词和来源](generation-round-three.json)
- [全部 35 个产品的原图及精修资源映射](all-products-refined.json)
- [35 个产品图片总览](all-35-products.jpg)
- [桌面完整列表](all-products-1440.jpg) / [手机完整列表](all-products-390.jpg)

## 呈现原则

按源图核对产品类别、主要轮廓、孔位分布、材质、颜色和组图形式，保留加工纹理与铸造表面的区别。原始 catalog、原图、来源链接不变；所有详情页均可切换原图。CAD 生成图明确标注其来源，进气系统注明装配场景。

这些图片是基于现有照片/CAD 截图的 AI 精修展示，未通过原始三维模型或尺寸图验证；不能作为精确尺寸、孔位或制造验收依据。

## 验证

- `npm run build`：60 页面构建成功。
- `npm run check`：53 文件，0 errors / warnings / hints。
- 35 个产品 × 1440/390 两种宽度，共 70 次详情页检查通过：无破图、无横向溢出，新图/原图切换、放大、Escape 关闭正常。
- 35 个产品共 105 个响应式资源文件存在；完整列表 35 张产品图在桌面与手机端均加载成功。
- [验证结果](all-products-verification.json)

本地预览：http://127.0.0.1:4323/products/?v=all-products-refined
