# 本轮图片制作与采用记录

2026-10-15。实际使用内置 ImageGen 共5次：4张新通用说明图采用，1次具体产品背景编辑弃用。不是仅输出提示词。原始证据照片未生成替代；新增素材均用新路径，原资产继续保留。

## 正式采用

输出目录：`public/media/editorial-rebuild-20261015/`。每组包含原始PNG及480、800、1200、1448像素宽WebP；真实尺寸、字节数和原始输出路径见 [generated-images.json](generated-images.json)。原始调用提示见 [imagegen-prompts.json](imagegen-prompts.json)。

| 文件前缀 | 页面/图位 | 处理与画幅 | 构图及用途 | 真实性与手机规则 |
|---|---|---|---|---|
| machining-hero | 首页首屏 | 新生成，1448×1086 | 大面受控光，银灰工件、夹具、右侧主轴及刀具；紧凑真实材料纹理；与左侧业务说明形成明确主次 | 通用加工概念；可见AI illustration；手机横图保留刀具接触区域，不解释为LZZ机床实拍 |
| milling-geometry | CNC milling的feature review | 新生成，1448×1086 | 斜俯视铝块开放型腔、薄壁、角部孔、侧孔；中性暖灰背景；主体占中心约75%，无文字 | 几何教学；完整contain，手机先图再特征说明；不是具体订单或测量结果 |
| turning-geometry | CNC turning的feature review | 新生成，1536×1024；WebP最大1448×965 | 横向车削轴套，肩、槽、螺纹、内孔及横孔可辨；低复杂度背景；长度优先 | 通用形态；完整容纳两端；不得读作现有P编号或供货规格 |
| finish-comparison | Aluminum的final finish说明 | 新生成，1448×1086 | 相同概念壳体裸铝/黑色表面并列；保留银色遮蔽接触面；同机位与光线 | 说明处理/遮蔽意图，不代表实测涂层或验收样板；手机仍完整呈现两件 |

四图统一为银灰金属、微暖中性色、自然受控光、真实材料纹理、简洁背景与克制景深；均无画内文字、箭头、按钮或虚构品牌标识。具体原始产品不作为这四张通用几何的身份来源。

## 生成后弃用

P32编辑目标：`public/media/product-sources-20261015/p32-framed-1200.webp`（实际630×420）。原图已实际查看；请求只润色背景、画布及光线，保留结构。输出 `C:/Users/Administrator/.codex/generated_images/01a13e36-c714-7e01-ace1-afe7c170a64d/exec-a4c44f35-510e-4431-9cf0-91fb71d0642e.png` 改写了轴体/平面/螺纹细节，经比对弃用，未进入public、未接入页面。

最终决定：P32及Stainless能力页继续真实原图，清晰度受源文件限制。需要真实补拍时，保持同件、同基本机位，提供长边≥2000px原始照片；不得用生成补足未知结构。

## 真实像素裁切与保留

七张新裁片的每个来源、crop坐标、原始尺寸及输出路径见 [products-real-crops.json](products-real-crops.json)；复现脚本 [create-products-real-crops.mjs](create-products-real-crops.mjs)。只裁真实像素，不放大、不重建、不替换背景。

裁片包括P33单件与six machining detail crops（five-axis、turn-mill、two-stage第一/第二工位、pocketed enclosure、prismatic）。用于把原图中与采购判断相关的工件放大到合理版位，完整来源照片仍由相关模块承接。

| 原素材/图位 | 最终处理 | 原因及边界 |
|---|---|---|
| P00–P34具体零件 | 保留真实主体；统一contain、短身份图注及页族比例；P02沿用既有hub局部，P33新增真实局部 | 防止改写孔、叶片、轴数、配置、材料身份；组图/总成/CAD不伪装成单件实拍 |
| P29绿色圆件 | 沿用此前真实主体+AI背景版本，并保留身份标签 | 是已有工作，不计本轮ImageGen；来源仍可追溯 |
| 首页旧概念大图 | 新machining-hero接管首屏；旧文件不删除 | 旧图画幅/画面重心限制了图文比例，新图专为首屏制作 |
| 首页CMM独立模块 | 移至Factory职责；首页用真实车间+公司事实 | 避免首页重复讲检测；原CMM不作为检测结果证明 |
| Milling原P01多件拼图 | 首屏改P00完整单件；P01留实例/目录 | 让首屏主体可辨，避免宽图中九件过小 |
| Copper首屏与正文重复批图 | 首屏保留完整图；正文移除重复图片，技术条件保留 | 减少无新信息的重复视觉 |
| Factory workshop-wide、operators、设备、cmm-room | 全部保留真实素材；首屏完整contain、3:7图文；CMM回到方法段 | 防止cover切掉设备/空间，按证据任务布局；旧AI检验概念不占证据位置 |
| Company文件、人员、来访、活动图 | 原件/原图保留；自然比例；2025活动归News | 文件日期和范围由HTML摘要承担阅读；无AI人物/客户替代 |
| Shipping三张November 2022历史照片 | 原图集中到shipping guide档案；Workflow内链 | 历史包装记录不写成当前统一包装标准或到货证明 |
| Resources material/finish两张真实涂层图 | 保留相邻解释；旧教学图缩为辅助 | 清楚区分solid、coating、covering；不凭颜色判断材料 |
| Guides、Quote、Contact | 不增加无关AI背景 | 这些页面优先完成比较、准备文件和联系任务 |

## 仍需补充的真实素材

P32等低分辨率单件、高质量一致机位的真实零件组照；当前有效ISO证书；可授权公开的脱敏检验/校准记录；具备可核对订单、配置、时间与授权的客户项目及交付材料。上述缺失不以AI补齐，也未写成已取得。
