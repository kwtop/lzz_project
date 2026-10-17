# LZZ 设计规范

版本：2026-10-15 · v4.0。唯一现行视觉规范。实施依据为用户已确认的 [WEBSITE-REDESIGN-PLAN.md](docs/WEBSITE-REDESIGN-PLAN.md) 及随后明确授权的视觉重构。完整v3保存在 [本轮基线备份](docs/visual-rebuild-20261015/DESIGN-before-v4.md)，更早版本仍在原历史归档，只作追溯。

## 1. 适用范围与事实边界

适用于当前84个英文业务页面及404；历史noindex设计预览保持历史职责。统一的是字体、色彩、间距、图像处理和控件行为，页面模块按用户任务安排，不以一个固定模板覆盖全站。

优先级：用户当前明确要求 → 适用AGENTS与工程/安全约束 → 业务真实性及必要功能 → 已批准方案与本规范。规范不是测试通过声明；逐URL实施和检查状态见本轮实施报告。

- 保留LZZ Precision标识、Hangzhou Lizhizao Precision Machinery Co., Ltd.法定主体、真实联系方式、URL、有效资料与询盘上下文。
- 2017、1,500 m²、40+ machining and supporting equipment；15+为团队经验。月产参考约100,000小件须同时保留受几何、材料、后处理和订单组合影响的条件。
- MOQ从1piece；7–14 business days自图纸和订单确认后起算，包含finishing，shipping另计；样件重建和批准是独立阶段。
- ±0.01 mm只限评审后的selected critical features，材料、几何、装夹和测量条件必须可见。
- ISO9001为已授权业务声明；三份企业认定/教学记录不替代ISO证书。不生成证书、工厂、检验、交付或客户证言作为证据。
- 本站只在浏览器准备email draft；不上传附件、不自动发送、无后台收件或CRM承诺。mailto、复制、TXT保存均不等于发送。

事实依据继续使用 [声明台账](docs/claim-ledger-2026-09-25.md)、原始素材、当前数据与批准方案中的条件；不从图片推导未知牌号、公差或供货范围。

## 2. 字体、颜色与空间

| 元素 | 桌面 | 手机（≤767px） |
|---|---|---|
| H1字体 | Inter Variable, Arial, sans-serif；600 | 同左；不再使用Georgia标题 |
| 正文、表格、H2/H3、控件 | Inter Variable, Arial, sans-serif | 同左，本地字体不新增字体依赖 |
| Home H1 | clamp(46px,4.2vw,60px)/1.08；16ch | 36px/1.14；18ch |
| 基础/公司 H1 | 44px/1.14–1.16；新闻40px | 30px/1.2 |
| 产品/工艺/研究 H1 | 48px/1.14 | 34px/1.18 |
| 指南 H1 | 40px/1.18 | 30px/1.2 |
| H2 / H3 | 30px/1.28；21px/1.35 | 25px/1.3（产品26px）；20px/1.35 |
| 正文 / 技术表值 | 17px/1.65；16px/1.6 | 16px/1.65；16px/1.6 |
| 标签、图注、帮助 | 至少14px/1.5 | 至少14px/1.5，包括页眉CTA |
| 版心 | max1240px；左右至少40px | 20px；<360px为16px |
| 平板768–1099px | 左右32px；按内容收为单列/窄双列 | 不继承桌面固定min-width |
| 指南 | 外框max1040px，正文max760px、60–72ch | 自然单列，段落不压窄 |
| 主要主题 / 子组 | 72px / 24–32px；图片叙事列距48–64px | 48px / 24–28px |
| 标题→引言→内容 | 20px→28px；段落16px | 16px→20–24px |

主背景#FFFFFF，正文#191B1D，辅助#606266，主动作#CF141A，浅任务底#F6F6F5，分隔#DEDEDB；输入边界#8B8D8E，错误#A40013，焦点#175B82。普通文字至少4.5:1，必要控件边界/焦点至少3:1。装饰分隔线不承担控件识别。

首屏不设100vh；高度随真实内容变化，首页手机先交代业务与动作再接加工图。页眉桌面76px、手机72px。指南不加装饰大图，询价首个字段尽早可见。长面包屑手机只显示父级路径，当前标题仍由H1完整表达；Schema保留完整层级。标题字距−.025至−.035em，正文不收紧；数字使用tabular-nums。

## 3. 按任务组织页面

| 页面 | 当前组织原则与实现 |
|---|---|
| Home | 五主题：业务/加工图→四种真实零件及工艺材料索引→两阶段真实工序叙事→车间与公司事实→带完整条件的RFQ；首屏5:6，工序3:2双图配旁述，车间7:5；手机相关图文连续 |
| 能力目录 | 工艺、材料、样件与批次按任务分组；紧凑行图与短来源身份，不把完整caption塞进窄列；CapabilitiesDirectory |
| 工艺/材料 | 适配与验收先于例图，技术对照与材料差异常显；独有输入并入决策表，不在表后重复同义段；CapabilityRedesign及各family页面 |
| 原型/批次/样件 | 分别围绕批准问题、BOM与release、样件转控制图纸安排模块；不能共用一套营销Features |
| Factory | 真实场地→设备与尺寸评审→测量/验收阶段→方法与记录→文件与包装条件；保留必要8主题及旧锚点；FactoryRedesign |
| Products | 总览为形态与研究两任务；Part目录3列/手机132px图文行（<360px图106px），可组合筛选并分享URL；材料具体值直接可见；研究目录六工序+两集合分清 |
| PART | 短定义与真实主图→Feature/Define/Acceptance合并表→完整材料、表面与订单条件→独有补充图（有则保留）→相关任务/RFQ；单件、组图、总成、CAD、铸件、批次明确区分；P02/P33真实局部服务特征解释 |
| STUDY | 原工序观察→真实局部与工序解释→采购资料；two-stage两原照直接对读；集合用主图/视频与三采购字段，再接2–3列照片组，手机顺排；不拼成客户成功案例 |
| Company | overview、profile、workflow、contact、news分别按供应商认识、资格、责任、联系与档案组织；三原件的日期/范围摘要常显，ISO独立请求 |
| Resources | 三菜单：Ordering guide / Machining guides / FAQ；目录直接到资料；RFQ三组字段常显、Copy/TXT保留；每篇先回答一个问题 |
| Quote | 标题/reference/草稿边界→五字段→校验/存储→完整预览→导出；手机完整联系方式在表单之后 |
| Privacy / 404 | 五节准确行为说明；两个恢复任务模块。无完整销售面板或装饰图 |

同页重复scope、颜色不能识别材质、通用验收提醒优先收成一次。保留数值、单位、条件、材料选项、配置/供货差异、原图独立来源、错误提示与隐私说明。不得用小字、低对比、隐藏或折叠全部正文制造精简。

## 4. 图片、表格与来源

- 具体零件所有入口共用partVisual()及productIdentity；目录、详情、首页、能力卡不能各使用不同结构的主体。
- 默认产品/概念图4:3 contain；方件、竖件、细长件按来源及批准的逐图规格。形态卡4:3完整容纳；主体通常占长边76–86%，至少保留安全边。
- 来源图不改变孔、螺纹、叶片、比例、配置或标识。可裁空白画布；低清原图不靠硬放大变“高清”。完整来源静态同屏/inline保留。
- P14为总成安装语境、P15为CAD、P19为双法兰组件、P29为绿色圆件、P31为回转件与法兰；标题、Alt、正文、相关推荐和SEO保持一致。
- 本轮ImageGen正式图为machining-hero、milling-geometry、turning-geometry、finish-comparison，归public/media/editorial-rebuild-20261015；用于首页、铣削、车削、铝件表面说明，均有可见AI身份。保留PNG原件及480/800/1200/1448 WebP。旧P29真实主体+AI背景沿用，不计本轮生成；七张真实局部裁片归products-real-details-20261015。P32编辑因改变零件细节而弃用。逐图来源和提示规格见 [图片台账](docs/visual-rebuild-20261015/IMAGE-LEDGER.md)。
- 摄影方向为银灰金属、微暖中性背景、自然受控的大面光、可辨加工纹理及适度景深；禁止HDR、浮空装饰、画内文字、无意义人员及夸张反光。具体零件无法保持结构时使用真实原图，不以生成补足未知结构。
- 真实工厂/CMM/人员/证书/交付材料不生成替代。纪实照片按自然比；竖照桌面通常≤480px、手机≤400px，人物纪实组可自然更长。证书完整且不超原分辨率硬放大，HTML摘要承担阅读。
- 图注跟随实际图框同宽；目录缩图只留短来源身份，完整条件在负责说明的详情页。重要图有真实宽高、sizes/srcset与Alt；首图eager/high，后续lazy/async，srcset声明必须符合实际像素。
- 图片静态展示：无raw链接、zoom、modal、独立图片焦点；整卡可进入内容页。视频原生controls、TXT下载保留。
- 桌面语义表头/行头完整；手机按Feature→Define→Check逐行并保留列义。caption必须占整表宽，14px以上；不压成残留窄列。真正二维矩阵才使用可识别横向滚动。

## 5. 交互、询盘与可访问性

- 导航CSS和JS统一1100px断点；根导航进入总览，独立summary展开下级，不恢复All resources一类重复总览项。菜单保持Escape、外部点击、焦点离开及单组展开行为。
- 主动作50px/手机48px，左右24px，红底白字；控件触达至少44px。阅读入口可文字链接，不强行整列描边。输入圆角4px、内容图0px，无通用阴影卡墙。
- 每页只有一个主要询价任务，长产品/服务可首尾重复同任务；正文不逐节加CTA。短新闻/指南用紧凑结尾。
- 表单顺序Name→Email→WhatsApp/Phone→optional Product/service→Message；Name/Message必填，Email或Phone至少一项。保留原校验、字段错误关联与首错焦点。
- sessionStorage按进入时上下文键保存，表内Change reference更新同一草稿；Clear删除当前入口及其legacy keys。保留restored/cleared/unavailable与无JSfallback，不暗改存储契约。
- Review先展示To/Subject和一份完整draft，移除重复Message，再提供Open email app、Edit、Copy、Save；复制失败有全文/TXT路径；绝不显示已发送。
- 正文、标题、参数和图片立即可读，无blur/reveal；只保留约160ms控件反馈，尊重prefers-reduced-motion。保留跳到正文、可见焦点、原生标签与语义HTML。

## 6. 工程归属、旧规则处理与验收

基础规则只有src/styles/redesign-system.css，由Layout.astro载入；页族为home-approved.css、products-20261015.css、capability-redesign.css/factory-redesign.css、about-approved.css、resources-approved.css、quote-approved.css、utility-approved.css。通过.redesign-site与独立hm/pd/px/ps/cx/fx/ar/rs选择器隔离，不增加高权重!important覆盖链。

旧legacy-site.css仅服务历史预览；不继续作为当前业务页视觉答案。保留旧源码和原始素材，不清理用户已有工作。旧100vh、统一split/机械交替、Contact字体例外、12px技术标签、raw打开、生成工厂证据、通用rounded大RFQ、采购内容reveal均退出现行规范。v3的Georgia、1280版心、72px首页标题、88/56px主题间距和112px目录图被本版尺度替代。URL、canonical、robots、语义与草稿功能约束继续保留。

验收按当前渲染记录，不能引用旧passed代替：每类真实样板D/M完整截图，重要变体/窄320px/平板与1100px断点/200%放大，逐URL内容与链接/Alt/图片加载/横溢出检查，目录组合筛选及URL恢复、菜单键盘、RFQ Copy/TXT、草稿错误/恢复/改引用/清除/导出和失败路径。执行npm run check、build、test:seo与静态verify；部署、真实送达与搜索收录不在本轮完成范围。


## 本轮实施与检查记录

实际执行、逐URL状态、图片来源、前后截图及验证边界见 [本轮交付](docs/WEBSITE-REDESIGN-DELIVERY.md)。历史IMPLEMENTATION报告保留历史身份，不自动视为当前通过。当前200%检查为1440物理像素/720 CSS像素/DPR2的浏览器缩放等效布局；不冒充系统文字缩放或所有浏览器测试。后续改动需按影响范围检查。
