# F. 问题台账与答案验收

全部本地观察日期2026-09-28。路径以项目根为基准；证据正文见inventory.json对应route的mainText，页面模块名为定位点。Confirmed表示页面缺口/实现已看到，不表示因果影响或外部事实已认证。未发现经证实的P0；不能据本地审计排除生产环境P0。

## 去重后的问题台账

|ID/级别/状态|证据URL、文件与位置|影响|整改动作|依赖/验收|
|---|---|---|---|---|
|F01 P1 Confirmed（公开证据缺口）|/quality/：Certification称ISO9001；Records明确没有公开实测；Equipment要求索取校准。src/pages/quality.astro|供应商资格核验不能仅凭站内完成|证书主体/编号/范围/有效期/核验入口；脱敏实测及校准记录或明确索取步骤|质量负责人提供真实资料；每项可追溯且未把奖牌当ISO。认证真实性独立核验为Unable to Verify|
|F02 P1 Confirmed|/factory/设备族、/capabilities/5-axis-cnc-machining/声明未公布行程/载荷/包络；company.ts、capabilityReferences.ts|预筛选必须来回问，设备照片不回答能否加工|带模式与夹具条件的真实设备/适用表，Factory和能力页互链|工厂核准，不复制同行参数；能区分行程与工件包络|
|F03 P1 Confirmed|/insights/how-we-work/“Review the quotation”；未列清报价成本/付款口径，不合格仅要求商议；resources.ts|采购难比较供应商报价及风险|补费用范围核对、付款和版本变更/不合格处理流程|销售/财务/质量确认；无资料不写退款天数或信用账期|
|F04 P2 Confirmed|四材料页Grade options与/insights/material-and-finish-checklist/“Compare material families by the job”仅比较提示|选型读者仍不知道条件性选择理由|现有页增加简短对比：目标、限制、替代需确认项；引用材料厂数据|工程师审核，不把通用属性写成库存保证|
|F05 P1 Confirmed|/products/custom-oem-cnc-machined-non-metallic-components-insulating-parts/关联五轴及车后铣金属工序；/products/precision-cnc-machined-castings-manufacturer/同类关联。products/[slug].astro用所有tags汇总后slice(0,2)|跨材料/几何的自动关联使证据链变弱；非坏链接而是语义不匹配|显式relatedProcessStudies映射；无合适工序则不显示，保留能力/质量链接|工程编辑复核35条；不得暗示工序照片就是该零件|
|F06 P2 Confirmed|/capabilities/5-axis-cnc-machining/中Engineering fit、Drawing planning、Service options三处重复材料/未公布包络与评审说明；铝页亦重复牌号|长文稀释真正回答，手机反复阅读|摘要一次，详细检查集中一处；不删图纸条件和证据限制|编辑+模板回归；客户仍可找到全部关键条件|
|F07 P2 Confirmed（显示差异）；影响Likely|发动机盖H1短名，CTA传原长SEO名称；products/[slug].astro encodeURIComponent(product.name)；QuoteForm.tsx读part填project|邮件主题/上下文不够自然；不是询盘丢失|未来单独批准表单改动时传稳定slug+显示名+来源URL，兼容旧part参数|保留草稿恢复/复制下载/邮件流程；本轮不写测试草稿|
|F08 P2 Confirmed|/privacy/称原始名称仍在产品页；抽样5详情正文没有原始全名，仅询盘URL携带。privacy.astro、products/[slug].astro|公开资料说明与实际展示不符|修正Privacy为准确归档说明，或有意恢复可展开原名；优先修说明|编辑；逐项核对隐私与实际存储行为，不增加虚假隐私承诺|
|F09 P2 Confirmed（来源表达）；误解风险Likely|refinedImages.ts明确3个cadVisualizations；Gallery.tsx只输出img且未使用该分类；三条进气/节气门产品页主图无相邻CAD来源标签|客户可能把渲染式目录图当实物照片；不是已证实伪造|图库按original photo / source CAD visualization / illustration记录并显示短标签，必要时提供原件入口|图片来源台账；不能凭文件名判AI，不修改孔位|
|F10 P1 Confirmed（实现风险）；线上Unable to Verify|Layout.astro仅404/显式noindex，build-seo.mjs固定生产canonical与Allow:/，未见环境隔离开关|若公开预览复用dist且无平台保护，可能可索引；当前不能声称已污染|部署前分别核验preview noindex/访问保护、production indexable；支持环境策略但不自动部署|运维；两个主机实测响应头/robots/canonical；不能只看源码|
|F11 P2 Likely|多组castings与intake产品页相邻主题/模板相似，Title/Description并不重复；catalog.json/productSummaries.ts|可能竞争同一任务，未有GSC证据|先写独有几何/职责与比较出口；取得query+page数据再决定是否合并|编辑/GSC；不因slug长就迁移，不先删页|
|F12 P2 Confirmed（可见信息缺口）|resources.ts指南、cases.ts工艺研究未给出清晰工程审核责任与有效审核日期；案例主要解释可见几何|缺第一手工程判断与维护责任|确认责任岗位/工程师后补审核说明、修改触发；每研究补一个真实决策理由|真实人员同意，不造作者履历/结果|

F01–F03是“资料与公司决策缺口”，网站编辑不能独立关闭。F04/F06改善阅读与选型，不是承诺排名提升。F10是发布前门禁，不算已确认线上索引事故。

## 技术与国际化检查记录

|检查|状态/结果|证据与下一步|
|---|---|---|
|69路由响应、404|Confirmed：68×200、404.html×404；随机不存在路径404+noindex|technical-summary.json；未判断生产软404|
|Title/Description/H1|Confirmed：本地无重复title/description；每页一个H1|inventory.json；唯一标签不等于意图充分|
|canonical|Confirmed：本地HTML使用正式域名；参数抽样不进canonical|Layout.astro、test:seo；Google选定canonical未知|
|站内链接、锚点|Confirmed：本次发现集合无失效；包括noscript中35产品|collector修正scriptingEnabled:false；原先疑似孤立产品已排除|
|旧URL迁移|Confirmed：dist86规则覆盖91归档URL，无规则环/链|npm run test:seo通过；旧/custom/download到/factory/目标语义需发布前人工核对；主机执行未测|
|robots/sitemap|Confirmed：dist有68 URL和robots；dev请求两者404|build-seo只在构建后输出，这是环境差异，不是线上缺陷|
|JSON-LD|Confirmed：本地静态存在可解析JSON-LD；浏览器首页Organization/WebSite/WebPage|test:seo与浏览器；没有跑外部Rich Results Test，不宣称有资格获富结果|
|产品价格/评价schema|Not Applicable：定制示例不是库存SKU|保留基础实体/面包屑；不加price=0或假评分；Service语义可选非必修|
|筛选/JS|Confirmed：正文SSR、目录noscript回退；浏览器展开全部可见35详情入口|不以React本身判抓取失败；没有分页URL炸裂证据|
|图片与下载|链接目标存在性已检查；浏览器抽样图片正常|未逐张人工判断35件结构真实性，未逐份鉴证公司文档；F09保留|
|性能/CWV|Unable to Verify：无CrUX、Lighthouse或现场负载数据|本地秒开不当作CWV；发布候选时再做实验室，线上用28天现场数据|
|导航/移动|Confirmed于抽样：首页、目录、发动机盖、询盘390；质量1440|截图与browser-verification.md；不是全站无溢出声明|
|CDN/WAF/域名变体/爬虫日志|Unable to Verify|正式域名网页工具失败不等于封爬虫；需部署后探针和后台|
|英语与hreflang|Confirmed：当前英语站lang=en；多语互指Not Applicable|不要求立即翻译；国家/语言优先级待真实需求|
|单位、交付|Confirmed：mm、m²、工作日与运输分开；目标国特定规则未验证|客户图纸必须标单位；不把英制自动替换或工厂承诺改写|
|垃圾页/污染|本地枚举未见异常模板或无关内容；公开索引Unable to Verify|不据此保证站点无安全漏洞/索引污染|
|有效询盘|Unable to Verify；当前为本地草稿流程|无发送、无真实客户测试、无CRM数据|

## 15项站内答案充分性测试

仅用当前站内文字，不用模型常识补足。状态是具体问题答案，不是AI已引用本站。

|#|采购问题|仅凭站内能答？|支撑URL/位置|仍缺什么/修改位置|
|---|---|---|---|---|
|1|Can I order one prototype?|是|/quote/ Order at a glance；/capabilities/prototype-machining/|保留1件起|
|2|When do the 7–14 business days start, and is finishing included?|是|/quote/ Production & delivery timing|确认后起算、含表处、运输另计，已完整|
|3|Can I buy the displayed cover as a stocked part?|是：不是库存SKU|发动机盖详情 Made to order|无需制造库存和价格|
|4|Which features suggest milling rather than turning?|是（初步路线）|/insights/cnc-process-selection/ Compare the processes|不能据此保证最终工艺|
|5|Is LZZ's machine suitable for my 600 mm multi-face part?|否|五轴页Size & workholding明确未公布包络|F02补设备与夹具条件；不能推算|
|6|Does five-axis mean simultaneous cutting on this order?|部分|五轴页Drawing planning提indexed/simultaneous|F02/F04补模式说明与该厂可确认范围|
|7|Does casting machining include making the casting?|部分|铸件页说明不建立in-house foundry能力|补可接受供坯模式及责任，F03|
|8|Why choose 6061 rather than 7075 for this housing?|部分|铝页Grade options；材料指南比较维度|没有条件性选择结论，F04|
|9|Can POM replace PEEK in this application?|部分|塑料页要求环境/温度/等级|缺材料一手数据与条件比较，F04；不能通用替代|
|10|Is ±0.01 mm guaranteed on every dimension?|是：否|/quality/ Dimensional measurement|保持限定，无需恢复±0.005|
|11|Can I verify the ISO certificate scope and expiry here?|否|/quality/ Certification只有索取说明|F01补证书字段及官方核验入口|
|12|Can I inspect an actual measurement and calibration record?|否|/quality/ Records明确空白格式/无客户结果|F01真实脱敏证据，空白模板不充当结果|
|13|How do I compare quote totals and payment risk?|部分|/insights/how-we-work/ Review quotation|F03费用包含/付款/变更/不合格口径|
|14|Do shipping photos prove delivery to my country?|是：不能证明|/insights/custom-cnc-parts-shipping-checklist/照片证据问答|没有具体出口结果，等真资料；不得新增虚构案例|
|15|Will the website send my drawing to LZZ?|是：不会|/quote/、/privacy/|邮箱附图并由用户发送；不改成提交成功|

这里“是”只表示问题得到足够回答，包含准确的否定答案；不表示服务保证或资格验证通过。公司确认资料齐备后，应由工程师和采购各按这15问复测。
