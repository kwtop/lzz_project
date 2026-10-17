# 能力、材料与分类文案实施记录

完成日期：2026-10-10。仅修改当前主站英文文案及已授权的塑料清单完整性，未部署、未发送询价、未变更资产或品牌样式。构建与浏览器验收由主 Agent 汇总执行。

## 覆盖

已完整审阅并修改以下 16 个文件：

- `src/data/presentation.ts`、`materialGrades.ts`、`services.ts`、`capabilityOverview.ts`、`capabilityContent.ts`、`capabilityGroups.ts`、`capabilityReferences.ts`、`orderDeliverables.ts`。
- `src/components/EngineeringScope.astro`、`GeometryReview.astro`、`OrderDeliverables.astro`、`Materials.tsx`、`CoatingExamples.astro`、`ApplicationContexts.astro`、`AdditionalPartForms.astro`、`ProductExplorer.tsx`。

阅读了 Humanizer 与其 4 个 sibling skills，按 embedded mode 内部完成初稿、语义关系、读者用途、节奏、标题与段落衔接检查，以及最终事实对照。采购文案保持技术中性语气，不加入学术腔或个人评价。

## 主要改文

- 10 个分类的能力说明改为明确的加工范围、图纸输入和验收条件。将抽象的“模型决定路线”“例项不是性能证明”等表达，改成买家可以执行的模型审查、特征定义和单独约定测试。
- `What should your prototype verify?` 改为 `Prototypes for fit and design checks`；`What does your pilot or repeat batch need?` 改为 `Pilot builds and repeat batches`。加工过程折叠标题直接命名实际步骤或要求。
- `What comes with your machining order` 改为 `Services and records with your order`，并说明报价包含的工作、额外费用与审批步骤。首件、材料、表面处理和包装文件仍按订单约定。
- 五轴模块用 `Part size and setup review`，要求提供成品/毛坯尺寸、重量、装夹位置、模型及关键特征图纸。尺寸与负载仍需针对计划装夹确认，没有补造机型、行程或最大零件范围。
- 目录搜索、结果计数与查看按钮统一称 `examples` / `part examples`，保持来图定制目录语义。筛选状态、匹配逻辑和交互未修改。
- 四个相近例项的卡片名按已有几何区别显示：`Runner & flange manifolds`、`Injector & fuel-rail manifolds`、`Angled aluminum enclosures`、`Lid & gasket housings`。所有 `productTitle` 原值保持，依赖这些值的 `productReview` keys 不受影响。
- 塑料材料清单统一为用户指定的 14 项：PEEK、PTFE、Polyimide、Nylon、PA6、PA66、POM (acetal/Delrin)、HDPE、UHMW、Acrylic、PC、ABS、PVC、PP。材料等级/填料/状态与适用性仍需确认；Delrin 保留品牌等级确认要求。
- 涂层与覆盖部件说明保留 PTFE 基材、Teflon 表面处理、独立覆盖层的构造区别。配方、粘接方法、厚度和测试条件仍须另行确认。

## 保留的事实与边界

- 五核心服务、10 分类及各分类原有材料、等级、工艺、螺纹和质量要求保留。铝、不锈钢、铜和黄铜等级数组未改变；未将历史 C3600/H62 或 ASTM 描述替换成 C36000 或任何推断标准。
- `±0.01 mm` 保持 selected critical features 且须 engineering review，按材料、几何、装夹和测量方法确认。文字明确不是全件通用公差或保证。
- MOQ 仍为 1 piece。生产时间仍为 drawing and order confirmation 后 7 至 14 business days，含 finishing，不含 transit/shipping。为符合 Humanizer 标点要求，显示范围写作 `7 to 14 business days`，数值和起算条件未改变。
- 材料库存/适用性、设备可用尺寸与负载、图纸逐特征公差、功能测试、应用合规均未改成无条件承诺。没有新增客户、认证、实测结果、工厂数字、免费样品、付款或保修政策。
- 铸件供料与批准责任仍单独约定，没有声称自有铸造厂。电气、泄漏、压力、平衡、汽车性能、医疗或食品接触要求仍按具体订单另行确认。
- 现有 AI illustration/source photograph 标识和说明保留；没有审查图片质量、真实性或从图片推导加工能力。

## 已完成检查

逐项与 `before-src` 比对，16 个文件中的静态路径、链接及 import 路径完全一致；所有组件 `<style>` 内容完全一致。`presentation.ts` 的完整详情标题映射完全一致。塑料清单计数为 14，保留全部指定条目。最终文本扫描没有 em dash 或 en dash；所需技术符号及单位保留。

参考事实采用当前源码、当前授权与 `audit/launch-audit-20261010-fresh` 的现有资料。仍需企业提供的设备参数、现行材料供应/标准、具体测试结果与资格文件没有被补写为已知事实。
