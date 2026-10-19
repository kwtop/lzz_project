# 实际Taste检查与适用边界

对零件、工厂、技术指南在1440/768/390px运行真实Chrome inspector。先看原始截图并修正：768产品标题跨整行、768工厂资料与照片改单列、手机指南标题保留原文并扩展行宽。最终没有未豁免FAIL。

命令明确使用--allow eyebrow,shadow,focal-point,hairline，未隐藏DOM或删测试节点。原因分别为语义数据/AI来源标签、真实菜单浮层、Penta技术标题尺度、技术比较字段/表单及目录条目边界。

源码lint原始报告仍保留规则命中；它不能识别这些边界的实际用途，不宣称未加例外全绿。Roboto Condensed来自明确选择的参考。

- part：未豁免FAIL 0；WARN size-count / no-footage / still-page.
- factory：未豁免FAIL 0；WARN mixed-font-headline / card-rows / size-count / no-footage.
- guide：未豁免FAIL 0；WARN card-rows / size-count / no-footage / still-page.

card-rows对应可比较的验收/资料行；size-count来自导航、条件、表格和技术标题；mixed-font-headline对应事实数字中的正常单位。no-footage不通过外部工厂视频消除；动效保持克制。实际84页图片目视范围见最终图片报告。
