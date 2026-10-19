# 全站图片最终决策与实际产物

初审141个src/poster文件全部逐张目视。最终383个img、7个video poster共390槽位、145个src/poster去重文件；5个poster同时作为img预览，不能相加当独立图。响应式尺寸档位不算新图。

原141文件中132个继续使用，9个旧示意/界面截图退出正式页，全部物理原件仍保存。本轮实际ImageGen新生成10、编辑0；前期样板另有3张，累计13。9张新概念承担替换说明、1张port-review新增，不能称为替换9张真实照片。

真实UI截图2项，桌面/手机共4个WebP；来自实际本地RFQ界面，不经ImageGen。

## 本轮10张新概念

| ID | 动作 | 实际正式页面 | 原始PNG尺寸 | 可见身份 |
| --- | --- | --- | --- | --- |
| drawing-review | D 替换/分化说明 | /about/contact/<br>/about/how-we-work/<br>/capabilities/starting-with-a-sample/<br>/quote/<br>/resources/faq/<br>/resources/ordering/compare-cnc-machining-quotations/<br>/resources/ordering/rfq-checklist/<br>/resources/technical-guides/critical-features-cnc-drawing/ | 1536×1024 / 3:2 | Drawing-review concept · AI illustration, not an approved drawing or customer part. |
| sample-inputs | D 替换/分化说明 | 首页<br>/capabilities/<br>/capabilities/starting-with-a-sample/<br>/resources/technical-guides/cnc-process-selection/ | 1536×1024 / 3:2 | Sample-review concept · AI illustration, not a reconstruction or measurement record. |
| revision-review | D 替换/分化说明 | /about/contact/<br>/about/how-we-work/<br>/resources/ordering/compare-cnc-machining-quotations/<br>/resources/ordering/prototype-vs-small-batch-cnc/ | 1536×1024 / 3:2 | Revision-planning concept · AI illustration; no approved order or inspection record is shown. |
| acceptance-plan | D 替换/分化说明 | /resources/ordering/machined-prototype-approval-checklist/<br>/resources/technical-guides/material-and-finish-checklist/ | 1536×1024 / 3:2 | Acceptance-planning concept · AI illustration, not measured results or a test report. |
| material-finishes | D 替换/分化说明 | /resources/ordering/rfq-checklist/<br>/resources/technical-guides/critical-features-cnc-drawing/<br>/resources/technical-guides/material-and-finish-checklist/ | 1536×1024 / 3:2 | Material and finish concept · AI illustration; exact grade and final condition require confirmation. |
| separated-packing | D 替换/分化说明 | /capabilities/low-volume-production/<br>/factory/<br>/resources/ordering/rfq-checklist/ | 1536×1024 / 3:2 | Packing concept · AI illustration, not an LZZ shipment or approved packing specification. |
| protected-interfaces | D 替换/分化说明 | /resources/ordering/custom-cnc-parts-shipping-checklist/<br>/resources/ordering/prototype-vs-small-batch-cnc/ | 1536×1024 / 3:2 | Surface-protection concept · AI illustration; packing for the actual part must be agreed. |
| steel-datums | D 替换/分化说明 | /capabilities/stainless-steel-cnc-parts/ | 1536×1024 / 3:2 | Turned-feature concept · AI illustration, not a customer part or tolerance result. |
| brass-interface | D 替换/分化说明 | /capabilities/copper-brass-cnc-parts/ | 1536×1024 / 3:2 | Connection concept · AI illustration; grade, threads and acceptance follow the drawing. |
| port-review | E 新增 | /machined-parts/gallery/global-manufacturer-of-multi-sided-precision-machined-components/ | 1536×1024 / 3:2 | Port-review concept · AI illustration of a generic form, not this part or its unseen geometry. |

原始PNG、完整prompts、cache原路径、SHA256和30份WebP在design/penta-rollout-20261017/；每张有480/800/1440px档。assets.json含actualPlacements逐页ALT与图注。概念图不作为工厂、客户零件、牌号、测量结果、订单或发货记录。

## 全部141项初审与最终引用

初审动作为当时逐张判断；最终引用列为实际结果。D建议不冒称已生成，实际执行见上表。来源、尺寸和散列在image-audit-baseline.json。

| ID | src/poster | 初审动作 | 最终引用 | 目视判断依据 |
| --- | --- | --- | --- | --- |
| I001 | /media/Artificial-1764396998946--413c4183ea.webp | A | 继续引用；原文件保留 | 保留完整真实原件和可打开原文件入口；不裁掉持有人、日期、编号，也不生成证书补图。 |
| I002 | /media/capabilities-section-20261014/plastic-support-1200.webp | A | 继续引用；原文件保留 | 概念主体清楚、图注表明 AI 身份，当前解释职责成立。按新版页面构图比较新旧后决定替换，不为使用 AI 而重做。 继续保留身份标签；没有观察到必须用生成图替换的画质缺陷。 |
| I003 | /media/capabilities-section-20261014/sample-definition-1200.webp | A | 退出正式页引用；原文件保留 | 概念主体清楚、图注表明 AI 身份，当前解释职责成立。按新版页面构图比较新旧后决定替换，不为使用 AI 而重做。 继续保留身份标签；没有观察到必须用生成图替换的画质缺陷。 |
| I004 | /media/company-news/australian-visit-01-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I005 | /media/company-news/australian-visit-02-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I006 | /media/company-news/australian-visit-03-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I007 | /media/company-news/australian-visit-04-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I008 | /media/company-news/australian-visit-05-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I009 | /media/company-news/china-africa-summit-01-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I010 | /media/company-news/china-africa-summit-02-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I011 | /media/company-news/china-africa-summit-03-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I012 | /media/company-news/china-africa-summit-04-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I013 | /media/company-news/china-africa-summit-05-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I014 | /media/company-news/team-2024-01-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I015 | /media/company-news/team-2024-02-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I016 | /media/company-news/team-2024-03-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I017 | /media/company-news/team-2024-04-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I018 | /media/company-news/team-2024-05-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I019 | /media/company-news/team-2024-06-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I020 | /media/company-news/team-may-2025-01-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I021 | /media/company-news/team-may-2025-02-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I022 | /media/company-news/team-may-2025-03-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I023 | /media/company-news/team-may-2025-04-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I024 | /media/company-news/team-november-2025-01-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I025 | /media/company-news/team-november-2025-02-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I026 | /media/company-news/team-november-2025-03-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I027 | /media/company-news/team-november-2025-04-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I028 | /media/company-news/team-november-2025-05-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I029 | /media/editorial-rebuild-20261015/finish-comparison-1200.webp | A | 继续引用；原文件保留 | 概念主体清楚、图注表明 AI 身份，当前解释职责成立。按新版页面构图比较新旧后决定替换，不为使用 AI 而重做。 继续保留身份标签；没有观察到必须用生成图替换的画质缺陷。 |
| I030 | /media/editorial-rebuild-20261015/turning-geometry-1200.webp | A | 继续引用；原文件保留 | 概念主体清楚、图注表明 AI 身份，当前解释职责成立。按新版页面构图比较新旧后决定替换，不为使用 AI 而重做。 继续保留身份标签；没有观察到必须用生成图替换的画质缺陷。 |
| I031 | /media/evidence/aluminum-housings-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I032 | /media/evidence/cmm-detail-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I033 | /media/evidence/cmm-detail-800.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I034 | /media/evidence/cmm-room-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I035 | /media/evidence/display-housing-machining-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I036 | /media/evidence/display-housing-panel-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I037 | /media/evidence/five-axis-machine-wide-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I038 | /media/evidence/five-axis-operation-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I039 | /media/evidence/five-axis-parts-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I040 | /media/evidence/milling-enclosure-operation-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I041 | /media/evidence/milling-enclosure-parts-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I042 | /media/evidence/multi-feature-milling-operation-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I043 | /media/evidence/multi-feature-milling-parts-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I044 | /media/evidence/multi-feature-milling-parts-800.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I045 | /media/evidence/shipment-2022-order-packing-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I046 | /media/evidence/shipment-2022-prepared-load-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I047 | /media/evidence/shipping-example-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I048 | /media/evidence/team-2025-evening-group-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I049 | /media/evidence/turn-mill-operation-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I050 | /media/evidence/turn-mill-parts-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I051 | /media/evidence/turning-operation-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I052 | /media/evidence/two-stage-first-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I053 | /media/evidence/two-stage-second-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I054 | /media/evidence/workshop-operators-2025-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I055 | /media/evidence/workshop-wide-1600.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I056 | /media/High-tech-Enterprise-Certificate-1764396986484--69861fe474.webp | A | 继续引用；原文件保留 | 保留完整真实原件和可打开原文件入口；不裁掉持有人、日期、编号，也不生成证书补图。 |
| I057 | /media/image-led-20261015/definition-1200.webp | D | 退出正式页引用；原文件保留 | 重复使用较多，画面偏办公静物，与新版精简工业语言有距离；可由更清楚的通用模型/图纸/实物关系图替代。旧图无证据身份问题，替换属于解释和视觉升级。 |
| I058 | /media/image-led-20261015/definition-800.webp | D | 退出正式页引用；原文件保留 | 重复使用较多，画面偏办公静物，与新版精简工业语言有距离；可由更清楚的通用模型/图纸/实物关系图替代。旧图无证据身份问题，替换属于解释和视觉升级。 |
| I059 | /media/image-led-20261015/material-samples-1200.webp | D | 退出正式页引用；原文件保留 | 旧图同时混合材料形态与表面处理，意图较分散；可用更清楚的通用原料形态或同件表面/遮蔽对照，分别匹配具体章节。 |
| I060 | /media/image-led-20261015/order-records-1200.webp | D | 退出正式页引用；原文件保留 | 三联文件夹占据画面大部分，手机图像中记录职责不够集中；新图可减为受控图纸、空白检查表和通用件的紧凑关系。不是实际检验报告。 |
| I061 | /media/image-led-20261015/packing-concept-1200.webp | D | 退出正式页引用；原文件保留 | 主体种类多且有一件放在箱外，保护措施的解释焦点分散；可统一成少量简单零件分别固定、表面隔离的通用概念。 |
| I062 | /media/image-led-20261015/privacy-clear.webp | B | 退出正式页引用；原文件保留 | 应在新版真实 /quote/ 界面重新截图；当前红色操作按钮与新版蓝色可能不一致，细长全宽截图手机难读。不使用 ImageGen。 |
| I063 | /media/image-led-20261015/privacy-draft.webp | B | 退出正式页引用；原文件保留 | 应在新版真实 /quote/ 界面重新截图；当前红色操作按钮与新版蓝色可能不一致，细长全宽截图手机难读。不使用 ImageGen。 |
| I064 | /media/penta-next-20261017/material-stock-1440.webp | E | 继续引用；原文件保留 | 本轮三页样板已实际生成、标注并接入的新 AI 概念；不在本次只读审查中重复计为新生成。 |
| I065 | /media/penta-next-20261017/milling-at-work-1440.webp | E | 继续引用；原文件保留 | 本轮三页样板已实际生成、标注并接入的新 AI 概念；不在本次只读审查中重复计为新生成。 |
| I066 | /media/penta-next-20261017/tool-access-1440.webp | E | 继续引用；原文件保留 | 本轮三页样板已实际生成、标注并接入的新 AI 概念；不在本次只读审查中重复计为新生成。 |
| I067 | /media/product-sources-20261015/p00-framed-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I068 | /media/product-sources-20261015/p01-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I069 | /media/product-sources-20261015/p02-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I070 | /media/product-sources-20261015/p02-800.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I071 | /media/product-sources-20261015/p02-hub-detail.webp | B | 继续引用；原文件保留 | 保留现有真实局部裁切；适合突出工件、夹持或实物细节；与原全图按一个摄影来源计数。 |
| I072 | /media/product-sources-20261015/p03-framed-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I073 | /media/product-sources-20261015/p04-framed-1200.webp | 待补真实素材 | 继续引用；原文件保留 | 原图主体边缘和孔口明显模糊，压缩痕迹严重。864×576 输出不等于细节清晰；不能计入有效图片，必须索取同件清晰主体和有差异的细节原件，禁止 AI 重建。 |
| I074 | /media/product-sources-20261015/p05-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I075 | /media/product-sources-20261015/p06-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I076 | /media/product-sources-20261015/p07-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I077 | /media/product-sources-20261015/p08-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I078 | /media/product-sources-20261015/p09-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I079 | /media/product-sources-20261015/p10-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I080 | /media/product-sources-20261015/p11-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I081 | /media/product-sources-20261015/p12-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I082 | /media/product-sources-20261015/p13-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I083 | /media/product-sources-20261015/p14-framed-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I084 | /media/product-sources-20261015/p15-framed-480.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I085 | /media/product-sources-20261015/p16-framed-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I086 | /media/product-sources-20261015/p17-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I087 | /media/product-sources-20261015/p18-framed-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I088 | /media/product-sources-20261015/p19-framed-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I089 | /media/product-sources-20261015/p20-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I090 | /media/product-sources-20261015/p21-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I091 | /media/product-sources-20261015/p22-framed-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I092 | /media/product-sources-20261015/p23-framed-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I093 | /media/product-sources-20261015/p24-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I094 | /media/product-sources-20261015/p25-framed-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I095 | /media/product-sources-20261015/p26-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I096 | /media/product-sources-20261015/p27-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I097 | /media/product-sources-20261015/p28-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I098 | /media/product-sources-20261015/p29-framed-1200.webp | A | 继续引用；原文件保留 | 已与原始 P29 图目视对照，轮廓、中心孔和四个周边孔保留；当前标明仅中性背景为 AI，禁止重生成零件。 |
| I099 | /media/product-sources-20261015/p30-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I100 | /media/product-sources-20261015/p31-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I101 | /media/product-sources-20261015/p32-framed-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I102 | /media/product-sources-20261015/p33-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I103 | /media/product-sources-20261015/p34-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I104 | /media/products-real-details-20261015/five-axis-operation.webp | B | 继续引用；原文件保留 | 保留现有真实局部裁切；适合突出工件、夹持或实物细节；与原全图按一个摄影来源计数。 |
| I105 | /media/products-real-details-20261015/milling-enclosure-operation.webp | B | 继续引用；原文件保留 | 保留现有真实局部裁切；适合突出工件、夹持或实物细节；与原全图按一个摄影来源计数。 |
| I106 | /media/products-real-details-20261015/multi-feature-milling-operation.webp | B | 继续引用；原文件保留 | 保留现有真实局部裁切；适合突出工件、夹持或实物细节；与原全图按一个摄影来源计数。 |
| I107 | /media/products-real-details-20261015/p33.webp | B | 继续引用；原文件保留 | 保留现有真实局部裁切；适合突出工件、夹持或实物细节；与原全图按一个摄影来源计数。 |
| I108 | /media/products-real-details-20261015/turn-mill-operation.webp | B | 继续引用；原文件保留 | 保留现有真实局部裁切；适合突出工件、夹持或实物细节；与原全图按一个摄影来源计数。 |
| I109 | /media/products-real-details-20261015/two-stage-first.webp | B | 继续引用；原文件保留 | 保留现有真实局部裁切；适合突出工件、夹持或实物细节；与原全图按一个摄影来源计数。 |
| I110 | /media/products-real-details-20261015/two-stage-second.webp | B | 继续引用；原文件保留 | 保留现有真实局部裁切；适合突出工件、夹持或实物细节；与原全图按一个摄影来源计数。 |
| I111 | /media/reading-polish-20261015/casting-condition-1200.webp | A | 继续引用；原文件保留 | 概念主体清楚、图注表明 AI 身份，当前解释职责成立。按新版页面构图比较新旧后决定替换，不为使用 AI 而重做。 继续保留身份标签；没有观察到必须用生成图替换的画质缺陷。 |
| I112 | /media/resources/finish-interfaces-v1-800.webp | A | 继续引用；原文件保留 | 概念主体清楚、图注表明 AI 身份，当前解释职责成立。按新版页面构图比较新旧后决定替换，不为使用 AI 而重做。 继续保留身份标签；没有观察到必须用生成图替换的画质缺陷。 |
| I113 | /media/site-polish-20261016/packing-concept-1200.webp | A | 退出正式页引用；原文件保留 | 概念主体清楚、图注表明 AI 身份，当前解释职责成立。按新版页面构图比较新旧后决定替换，不为使用 AI 而重做。 |
| I114 | /media/source-details/covered-rollers-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I115 | /media/source-details/covered-shaped-parts-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I116 | /media/source-details/covered-wheels-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I117 | /media/source-details/display-housing-pair-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I118 | /media/source-details/display-housing-poster.webp | B | 继续引用；原文件保留 | 保留真实视频与其海报；按竖横原幅布置，低清视频限制显示宽度；不把海报另算独立照片。 |
| I119 | /media/source-details/finish-coated-bars-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I120 | /media/source-details/finish-coated-round-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I121 | /media/source-details/gear-bevel-examples-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I122 | /media/source-details/gear-cylindrical-examples-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I123 | /media/source-details/intercooler-batch-detail-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I124 | /media/source-details/metal-aluminum-close-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I125 | /media/source-details/metal-aluminum-housings-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I126 | /media/source-details/metal-brass-batch-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I127 | /media/source-details/metal-cleaned-parts-poster.webp | B | 继续引用；原文件保留 | 保留真实视频与其海报；按竖横原幅布置，低清视频限制显示宽度；不把海报另算独立照片。 |
| I128 | /media/source-details/metal-turned-batch-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I129 | /media/source-details/metal-turned-shaft-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I130 | /media/source-details/peek-parts-poster.webp | B | 继续引用；原文件保留 | 保留真实视频与其海报；按竖横原幅布置，低清视频限制显示宽度；不把海报另算独立照片。 |
| I131 | /media/source-details/plastic-acrylic-detail-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I132 | /media/source-details/plastic-acrylic-parts-poster.webp | B | 继续引用；原文件保留 | 保留真实视频与其海报；按竖横原幅布置，低清视频限制显示宽度；不把海报另算独立照片。 |
| I133 | /media/source-details/plastic-pe-guides-poster.webp | B | 继续引用；原文件保留 | 保留真实视频与其海报；按竖横原幅布置，低清视频限制显示宽度；不把海报另算独立照片。 |
| I134 | /media/source-details/plastic-pom-gears-poster.webp | B | 继续引用；原文件保留 | 保留真实视频与其海报；按竖横原幅布置，低清视频限制显示宽度；不把海报另算独立照片。 |
| I135 | /media/source-details/plastic-ptfe-batch-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I136 | /media/source-details/plastic-ptfe-intermediate-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I137 | /media/source-details/plastic-ptfe-parts-poster.webp | B | 继续引用；原文件保留 | 保留真实视频与其海报；按竖横原幅布置，低清视频限制显示宽度；不把海报另算独立照片。 |
| I138 | /media/source-details/plastic-ptfe-shafts-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I139 | /media/source-details/plenum-internal-detail-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I140 | /media/source-details/plenum-port-detail-1200.webp | A | 继续引用；原文件保留 | 原始主体可辨、与页面职责相符；保留几何、人物和事实身份，显示尺寸不得超过源图可辨能力。 |
| I141 | /media/Zhejiang-1764397018975--75b9eb4d46.webp | A | 继续引用；原文件保留 | 保留完整真实原件和可打开原文件入口；不裁掉持有人、日期、编号，也不生成证书补图。 |

## 待补真实资料

- P04：仍需同件清晰整体与关键端口实拍；未通过AI补画客户几何。
- 多数产品只有一张该件主体，其他照片保持各自来源，不算该件额外视角。
- 当前ISO范围、设备台账、CMM范围/校准仍需现行资料。
- 澳洲来访记录的日期来源冲突待业务确认。
- 原始小尺寸视频保持真实海报与合理显示尺寸，不生成高清工厂记录。
