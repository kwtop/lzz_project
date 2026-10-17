# 第二轮图片精修

完成日期：2026-09-22。范围：本地网站图片展示；未发布到线上。

## 交付

- 使用内置 imagegen 新生成 25 张图片：19 张产品展示图，6 张厂房、车间、加工和检测场景图。
- 每张输出 480 / 800 / 1200 像素 WebP，共 75 个网页资源，位于 `public/media/`。
- 结合第一轮的 5 张产品图，35 个产品条目中共 24 个采用精修展示图。其余 11 个保留清晰的原图。
- 首页、产品列表和详情、加工能力、工厂、质量页面共用新的图片映射及响应式资源。
- 原始 catalog 和来源图片保留。产品画廊可切换原图；工厂原始照片在折叠区域中可查看。证书、标识和团队活动原图保留。
- 厂房与设备场景标注 AI illustration。3 张基于 CAD 的产品图标注 AI visualization based on source CAD，其余精修产品图标注 AI-retouched presentation。

## 生成记录

完整提示词、来源、产品 slug 和输出名称见 [generation-round-two.json](generation-round-two.json)。这是第二轮独立记录；第一轮见 [generation-manifest.json](generation-manifest.json)。

新增场景：factory-building-ai-v3、workshop-floor-ai-v3、milling-process-ai-v3、turning-process-ai-v3、five-axis-process-ai-v3、cmm-inspection-ai-v3。

产品图为 catalog-NN-retouched-v3，编号：01、03、05、06、07、08、10、14、15、16、17、19、21、22、23、25、28、30、34。

## 验证

- `npm run build`：60 页成功。
- `npm run check`：52 文件，0 errors / warnings / hints。
- `TEST_URL=http://127.0.0.1:4323 npm run test:site`：60 个静态页面、59 个移动端路由及筛选、搜索、询价预填、菜单等交互通过。
- 额外验证 605 个 srcset 引用均存在；1440 / 768 / 390 三种宽度共 24 次检查无破图或横向溢出。
- 19 个新产品画廊的新图、原图切换、放大和 Escape 关闭均通过。
- 结果见 [round-two-verification.json](round-two-verification.json)，截图见本目录 `round-two-*.jpg`。

本地预览：http://127.0.0.1:4323/factory/
