# 全站图片精修记录 · 2026-09-22—23

截至 2026-09-23，35 款目录产品的展示图已统一为干净的透明抠图方案，并应用到首页、产品列表、详情及关联内容，共新增 105 个 WebP 响应式资源。产品详情页只显示精修图，已移除原图缩略图和原图入口。About 页的项目评审场景也改为更写实的新版示意图，并明确标注为 AI illustration。生成记录见 [catalog-cutout-edits.json](catalog-cutout-edits.json) 和 [additional-sitewide-image-2026-09-23.json](additional-sitewide-image-2026-09-23.json)。原始工厂照片、企业证书、合作标识及团队活动照仍以原始来源呈现。

以下记录保留 2026-09-22 各轮的图片来源、处理范围与验证结果。

已在本地站点接入 8 张内置 image_gen 生成/精修图片。没有部署或发布。

## 已处理

| 图片 | 用途 | 处理 |
|---|---|---|
| indexing-plunger-retouched-v2 | 首页、产品列表、产品详情 | 锁紧销背景、反光、清晰度 |
| steel-control-retouched-v2 | About 产品展示、产品列表、详情 | 旋钮组件偏色、背景与金属纹理 |
| engine-cover-retouched-v2 | 产品列表与详情 | 移除手持和地面背景，突出曲面刀纹 |
| aluminum-batch-retouched-v2 | 产品列表与详情 | 批量铝壳工作台背景和偏色 |
| brass-plugs-retouched-v2 | 产品列表与详情 | 从杂乱堆放改为少量同类零件的棚拍示意 |
| company-parts-retouched-v2 | About 首图 | 公司产品照片背景与光线统一 |
| rfq-planning-ai-v2 | RFQ 指南、原型规划文章、资源列表 | 新生成图纸、零件和量具场景 |
| material-finishes-ai-v2 | 材料表面处理指南、资源列表 | 新生成材料和表面处理样件场景 |

图片存放在 `../../public/media/`，每张有 480、800、1200px WebP，共 24 个文件。完整提示词、生成模式、原始输出路径见 [generation-manifest.json](generation-manifest.json)。部署使用的图片全部位于项目目录，不依赖外部生成目录。

另已将铝、不锈钢、铜/黄铜、工程塑料四个能力页主图映射到对应材料特写，避免借用首个产品照片造成主题错配。三个购买指南补齐配图，四个技术指南详情加入正文前的插图。

## 来源与保留项

- 原始 `catalog.json`、原始产品照片及源资料未覆盖。产品详情页只展示精修图并支持放大查看；原始产品照片不在产品浏览界面展示。
- AI 精修属于展示重绘，不能保证孔位、尺寸、数量等工程细节逐像素一致；原始产品照片仅留在项目源资料中，工程判断以图纸为准。
- About 精修图及新增指南场景有来源/示意说明。图像生成不构成新的生产、材料或交付证明。
- 已检查全部 35 个产品的首图。其余清晰可辨的实物照片、CAD 图及批次照片保留：不把 CAD 渲染伪装成制造实物；不为统一风格而删除批次细节。
- 工厂原始照片、证书、合作标识与团队新闻图片保留真实来源。部分历史照片清晰度受原素材限制。
- 首页工艺主图、材料特写和现有质量/设备示意图视觉一致，保留使用。

## 验证

- `npm run build`：60 页构建成功。
- `npm run check`：51 文件，0 errors / warnings / hints。
- `npm run test:site`：60 页静态检查、59 个手机页面、材料切换、搜索、筛选、询价预填、邮件草稿、手机导航通过。
- 全站 104 个唯一图片引用（含 srcset）均存在。
- 9 个代表页面 × 1440 / 768 / 390px，共 27 组浏览器检查：无图片解码失败、无横向溢出、无页面脚本错误，见 [qa.json](qa.json)。
- 2026-09-22 的画廊原图切换行为记录在 [gallery-qa.json](gallery-qa.json)；2026-09-23 已改为只展示精修图，桌面/手机验证截图见 [product-gallery-no-original-1440.png](product-gallery-no-original-1440.png) 和 [product-gallery-no-original-390.png](product-gallery-no-original-390.png)。
- 使用项目已安装 Playwright；Browser plugin / browser skill 未提供。实际预览为 `http://127.0.0.1:4323/`。
- `after-*.jpg` 为本次渲染证据；`current-*.jpg` 和 `before-*.jpg` 为检查基线。

本次验证范围为本地构建与预览，不代表生产站点已更新。
