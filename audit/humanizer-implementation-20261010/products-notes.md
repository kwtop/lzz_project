# 产品英文文案修改记录

本轮完整回读了 35 个产品例项的摘要、工程要求、相关产品选择说明和加工说明，并按 humanizer 的 embedded mode 完成草稿、语义、语体、节奏、全稿衔接及最终回读。采用具体、克制的采购语气；已有清楚的技术说明原样保留，没有为改变句式而重写全部记录。

修改范围为 `src/data/productSummaries.ts`、`productDetails.ts`、`productDecisions.ts`、`manufacturing.ts`、`castingReview.ts`、`productReview.ts`。共修改 114 个字符串字面量；公共变量也会用于多个例项。`productReferences.ts` 只有媒体 ID 映射及来源注释，无需要润色的买家文案，保持字节一致。

## 已修正的表达

|位置|修改前|修改后|作用|
|进气件 A 摘要|Custom intake assemblies and related induction-system prototypes.|Billet intake assemblies and induction-system prototypes with runner transitions and multi-piece flanges for engine, plenum or turbo-piping connections.|把已有 runner/flange 与 plenum/turbo-piping 区别放到摘要；没有新增性能数值。|
|进气件 B 卡片|Billet intake runners · injector & fuel-rail features|Intake runners · injector bosses & fuel-rail mounts|直接点明另一个例项的喷油器座及油轨安装接口。|
|壳体 A 卡片|Small-batch aluminum enclosures · pockets & thin walls|Compound-angle enclosures · billet or cast blank|前置原有复合角度与坯料选择条件。|
|壳体 B 卡片|Aluminum enclosures · deep cavities & thin walls|Aluminum housings · lid, gasket & finish requirements|前置原有盖板、密封垫和表面处理要求。|
|塑料加工说明|Temperature-aware machining addresses polymer behavior.|Account for polymer temperature during machining.|去掉抽象的过程主语与空泛动词，保留温度条件。|
|铸件标题|Start with the incoming blank|Incoming blank and machining allowance|标题直接指向本节的采购与工程内容。|
|壳体批次说明|Sample requests and sampling plans remain proposals until the inspection requirements are agreed.|Confirm inspection requirements before treating sample requests or sampling plans as agreed.|保留“须先约定”的边界，让买家知道要确认的事项。|

相近产品的摘要、卡片、scope、selectionFocus 与 review heading 已按原有几何和接口差异对齐。依据为 `audit/launch-audit-20261010-fresh/launch-audit.md` 第 10 项及修改前已有 `productDetails.ts` / `productDecisions.ts`。四个例项仍独立保留；相关产品链接目标及顺序没有改变。

## 技术事实核对

与 `before-src/data/` 逐文件比较，使用当前项目的 TypeScript scanner / transpileModule 做只读核对，结果通过：

- 除字符串内容外，全部源码 token 与原稿一致；没有改程序结构或数值 literal。
- 35 个 summary、35 个 detail 记录及全部导出映射的 key 集合、顺序保持。
- 各文件全部数值及含数值牌号 token 保持，包括 6061-T6、7075、304、316L、17-4PH、C36000、3/4/5-axis、Type II/III 等；没有新增尺寸、公差或性能参数。
- 材料选项及 `features` 几何集合保持。未指定牌号的公共说明仅改为 `This example has no specified grade. Include the material required for your part.`，未补任何牌号。
- 相关产品目标与顺序、加工分类 tags、全部媒体 ID / reference 映射保持。
- 所有本轮负责文件的买家字符串未含 em dash 或 en dash。

人工回读同时保留了压力测试需约定条件、冷却/功率/电子控制性能未建立、照片不能证明材料与检验结果、聚合物测量条件、图纸基准、铸件余量及验收责任、后处理尺寸、报告和抽样需先约定等限制。CMM、统计过程控制和测试方法仍说明为该例项列出的内容，并要求订单确认，避免把来源描述改成已完成检验或全部订单承诺。

## 保留与资料缺口

材料/处理选项、工程特征、RFQ 输入清单属于买家需完整扫描的记录或选项集，因此保留完整集合。已有具体、自然的基准与配合要求没有强行缩短。`productReview.ts` 的键依赖 `presentation.ts` 显示标题，本轮仅改值；显示标题若另行改动，需由汇总代理核对映射。

没有评价或更换图片，现有说明性资产的来源与用途边界保留。没有增加证书、客户结果或检验数值。后续能扩充采购证据的企业资料仍包括获准披露的零件图纸及实测报告、测试程序与结果、具体材料及处理记录、各零件/订单的检验抽样协议；全站审计另列的现行 ISO、付款、样品和保修条款仍需企业确认。

本子任务没有单独运行 build 或部署。主 Agent 统一执行构建、静态/SEO及浏览器验证；本记录不替代正式环境或真实询价收件验证。
