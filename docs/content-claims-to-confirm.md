# 发布前需业务确认的源站承诺

本表为早期内部审核快照，不渲染到客户页面。**2026-09-25 后续更新：**用户已直接确认并授权发布 1 件起订、图纸与订单确认后 7–14 个工作日生产（含表面处理、运输另计），以及 ISO 9001 认证。这三项不再属于“待确认”；证书文件、编号、范围和有效期仍待归档。以 [`claim-ledger-2026-09-25.md`](./claim-ledger-2026-09-25.md) 的当前口径为准。其余数字和保证继续待核实。
来源均可由 `src/data/catalog.json` 中匹配产品的 `source` 与 `html` 复核。

| 源站表述 | 代表来源（原站 product 路径后缀） | 需要确认 |
|---|---|---|
| MOQ 1、1–1000、10–500、10–1000、50–500、50–1000 | Small-Batch-CNC-Machining-Manufacturer-Precision-Aluminum-Components-HMLV；Small-Batch-CNC-Machining-Manufacturer-Complex-Aluminum-Housings | 每种工艺最低接单量、经济批量、试制与量产是否不同；同页区间矛盾不能并为承诺 |
| 7–10 天、7–14 天 | Small-Batch-CNC-Machining-Manufacturer-Precision-Aluminum-Components-HMLV；Precision-Low-Volume-CNC-Machining-Manufacturer-and-HMLV-Components-Supplier | 工作日还是自然日、排产起点、处理与运输是否包含、材料可用性 |
| ±0.005 mm、Ra 0.4–0.8、Swiss machining | Custom-CNC-Turned-Stainless-Steel-Components-Manufacturer-and-Precision-Shaft-Supplier；Precision-Stainless-Steel-CNC-Turned-Parts-Manufacturer-and-316L-Components-Supplier | 实际设备、尺寸／材料范围、量测方法与可重复验收证据 |
| h6/H7 配合 | Custom-CNC-Machined-Electronic-Throttle-Body-Manufacturer-and-Automotive-Prototype-Supplier | 具体尺寸段、特征及装配要求，不能扩展成整件公差 |
| sub-micron | Ultra-High-Precision-Machining-Services | 哪个特征、哪种测量条件、第三方或实际测量记录 |
| 每月 50,000、百万件、零缺陷 | Precision-Stainless-Steel-CNC-Turned-Parts-Manufacturer-and-316L-Components-Supplier；Precision-CNC-Turned-Brass-Components-Manufacturer-and-Copper-Parts-Supplier | 产能口径、设备／班次／产品约束、历史数据；零缺陷不作为保证 |
| 50+ PSI | Custom-Billet-Aluminum-Intake-Plenum-Manufacturer-and-High-Performance-Tuning-Parts-Supplier | 试验对象、压力条件、方法、结果与适用设计 |
| 6 个月保修、DDP | Custom-OEM-High-Precision-CNC-Milling-Manufacturer | 保修范围、责任排除、适用目的地和合同条款 |
| ISO、Tier-1 等资质或客户级别 | 来源正文中的相关声明 | 有效证书、持证主体、范围、有效期及客户披露授权；不按应用行业推定认证 |

## 定位来源

上述后缀加在 `https://www.lzz-cnc.com/product/` 后；大小写以 catalog 的 `source` 为准。现有原始内容与 URL 不变。新增可公开文案只使用具象服务范围，不将这些待确认项改写为无条件销售承诺。
