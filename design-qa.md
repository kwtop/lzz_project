# Footer contact labels removed — 2026-10-15

final result: passed

User-approved scoped revision: remove the visible Email and WhatsApp labels from the shared footer. Keep icons, exact contact values, destinations and the single desktop row. Both links now have descriptive accessible labels; no extra visible text was added.

- Removed both label spans in SiteFooter.astro and their unused CSS rule in site-footer.css. Original contact hrefs and all25 footer links remain.
- Source truth: the user's two factory-page annotations; previous rendered footer in D:/lzz/footer-directions-20261015/after-desktop-footer.png.
- Final browser evidence: D:/lzz/footer-directions-20261015/labels-removed-desktop-footer.png and labels-removed-mobile-contacts.png, actually opened and reviewed.
- Browser checks at1600×1000,390×844 and320×844: zero label spans, no clipping/overflow; desktop regions aligned on one row; contact targets44px. Browser console errors: none. See labels-removed-checks.json.
- Build passed98 Astro entries,171 HTML outputs. All92 shared footers verified without label spans. Original25 links and all171 main-content/image/SEO hashes unchanged.
- Reversible source copies: D:/lzz/footer-directions-20261015/labels-before/. No production deployment.

---


# Shared footer — selected direction 1 — 2026-10-15

final result: passed

Scope: implement the first displayed ImageGen footer on the existing shared SiteFooter component, with responsive behavior. This is a component exception to showcase-page module/image counts. No new photography or brand assets were needed.

**Source and comparison evidence**

- Source visual truth: D:/lzz/footer-directions-20261015/displayed-1.png, the FIRST displayed result, exec-6f2e6e39-9868-448c-8ad9-30bb6eb96929.
- Implementation: http://127.0.0.1:4323/, footer at desktop1440×900; D:/lzz/footer-directions-20261015/after-desktop.png (page context) and after-desktop-footer.png (component crop).
- Combined comparison: D:/lzz/footer-directions-20261015/comparison-final.png, reference ABOVE implementation. Reference1942×809px; remove206px of preceding white canvas, then preserve aspect ratio at1440px wide →1440×447. Rendered footer1424×435px, preserve aspect ratio at1440px wide →1440×440. CSS viewport1440×900, footer CSS1424.67×435.06; screenshot density normalized by width, not by stretching height.
- Focused contact comparison: D:/lzz/footer-directions-20261015/comparison-contacts.png, reference above implementation. Both cropped from the equal-width normalized images. Full comparison is readable at normal scale; this crop additionally checks labels, icons and exact email/phone digits.
- Phone390×844: after-mobile-top.png, after-mobile-bottom.png and after-mobile-footer.png. Actual full footer height1226.65 CSSpx; all links remain visible.
- Full-page review: home-full-desktop.png and home-full-mobile.png. Fixed header/skip link appear at the current scroll position in these beyond-viewport captures; this is a capture artifact, not duplicated page markup. The normal viewport screenshots establish actual header/footer presentation.
- Before: before-desktop.png, before-mobile.png; footer before708.34px at1440px viewport, now435.06px (about39% shorter).
- State: fully rendered page, no modal/menu open; default English. Additional keyboard focus was tested separately. No real inquiry or external message was sent.

**Required fidelity surfaces**

- Typography: existing Inter Variable;14px desktop navigation,14px labels,17–20px contact values;15px phone links and20–21px contact values. Clear heading/body hierarchy, no truncation or artificially small copy.
- Layout: brand / all five directory groups / contacts aligned on ONE desktop row at1100,1280,1440 and1920px. One slim address/legal base. Existing1240px site container retained to align with page content. Mobile navigation uses two columns, About links use a two-column list; all content stays expanded and DOM reading order stays brand → navigation → contacts → legal.
- Colors: flat charcoal#191b1d, white logo/links, readable#d4d5d5 secondary text. The generated reference's subtle raster shading was intentionally replaced with the site's solid surface.
- Asset fidelity: original /media/lzz-logo.png retained with white display filter; no generated/replaced logo, no screenshot-as-UI. Existing icon-only social links retained. Mail/Phone and other icons use the installed lucide-react library, matching the source's simple line icons.
- Copy: all25 original footer links, five category headings, email, WhatsApp number, company address/timezone, copyright and privacy preserved. Built-page comparison confirms unchanged main text, main image references and SEO fields on all171 HTML outputs.

**Findings and comparison history**

1. [P2, resolved] Initial narrow-boundary test at an effective fractional767px layout fell between max-width767px and min-width768px, leaving the default desktop grid. Evidence: responsive-initial.json, clippedLinks at767. Fix: continuous CSS range queries width<768,768<=width<1100,1100<=width<1280. Final responsive-final.json has zero clipped links and no page/footer overflow at every checked width.
2. [P2, resolved] Tablet directory headings and privacy link initially had short touch areas. Fix:44px minimum target height for tablet as well as phone. Final responsive-final.json: no short targets below1100px.
3. [P2, resolved] Legacy preview CSS overrode footer background and important display-heading typography. Fix: scope the canonical footer stylesheet across both Layout body families; explicitly override only those legacy important h2 properties inside this footer. Legacy rendered background is rgb(25,27,29), heading60014px/21px; one desktop row and no phone clipping verified after the fix.
4. [P3, accepted] Generated reference's outer gutter is about68px when normalized to1440px, while implementation aligns to the real site's1240px container (about100px). Directory structure and proportions remain close; preserving page alignment is intentional.
5. [P3, accepted] Existing accessible outline social icons are retained rather than drawing the generated mockup's filled approximations. No action needed.

**Verification**

- Ten actual browser widths:320,360,390,767,768,1099,1100,1280,1440,1920. Zero horizontal page/footer overflow or clipped links; one main desktop row;44px targets below1100px. See responsive-final.json.
- Nine rendered routes at1440/390: /, /products/part-examples/, /products/part-examples/ultra-high-precision-machining-services/, /factory/, /resources/ordering-guide/, /about/company-profile/, /quote/, /privacy/, /preview/home-editorial/. All have five groups and25 links. See route-checks.json. Legacy style compatibility was rechecked after the correction.
- Real footer click-through: Company profile, FAQ, Quality & documents, Workshop & equipment. Factory anchors land about110px from viewport top, clear of the sticky header.
- Keyboard: from the logo through remaining24 footer links, all focus states remain within the footer and have visible white outlines. Privacy is last. No positive tabindex or collapsed controls introduced. See interaction-checks.json.
- Browser error logs after navigation/keyboard checks: none.
- npm run check:0 errors,0 warnings,9 hints (including existing deprecated social icon hints).
- npm run build:98 Astro pages; final SEO processing171 HTML/84 sitemap entries.
- verify-built-footers.mjs: all92 existing shared-footer outputs have exactly one directory footer,25 original links and five groups; all171 outputs retain main text, main image refs and SEO hashes.
- node scripts/verify.mjs --static: passed171 HTML; npm run test:seo: passed171 HTML,84 sitemap URLs,153 redirects,91 raw URLs. Host/deployment behavior was not tested.
- Visual checks are representative-route checks, not a claim of screenshot review on all92 outputs. Static footer/content checks cover all92/171 as specified above.

**Implementation and rollback**

- Shared markup: src/components/SiteFooter.astro.
- Canonical footer styling: src/styles/site-footer.css.
- Removed31 obsolete footer rules from src/styles/redesign-system.css; legacy src/styles/footer-navigation.css now imports the same canonical footer stylesheet.
- Existing pre-task files and SHA256s preserved under D:/lzz/footer-directions-20261015/implementation-baseline/. No unrelated source edits, route changes, staging, commit, push or deployment.
- No remaining actionable P0/P1/P2 issues. No missing factual materials required for this footer change.

---


# Rounded RFQ panel QA — 2026-10-14

final result: passed

## 目标与范围

采用用户选择的第一版灰色圆角询价框，并将同类收尾询价区统一。82个公开页面中，75页使用共享RfqPanel组件；每个面板仅一个主要询价入口。保留各页标题、询价URL参数和已有业务说明。

## 视觉证据

- Source visual truth: `D:/lzz/rfq-rounded-20261014/selected.png`，所选第一版。
- Rendered implementation: `D:/lzz/rfq-rounded-20261014/desktop-final.jpg`。
- Full-view comparison: `D:/lzz/rfq-rounded-20261014/comparison-full.png`，左为所选稿，右为页面实测；各自等比缩放至1000px宽。
- Focused comparison: `D:/lzz/rfq-rounded-20261014/comparison-final.png`，上为所选稿，下为实测；裁切面板边界后均等比缩放至1280px宽，高度分别约316px和319px。
- Mobile: `D:/lzz/rfq-rounded-20261014/mobile.jpg`；能力页修复后见 `capability-mobile-final.jpg`。
- Preview: `http://127.0.0.1:4323/products/global-oem-precision-machining-solutions/?review=rounded-rfq#prepare-rfq`。

桌面CSS视口1440×1000，最终截图1425×990，截图缩放比例约0.99；面板布局宽1280px、高318.7px。比较状态为页面加载完成、询价区展开、无弹窗。截图仅等比缩放，未单独拉伸高度。导航、页脚沿用实际网站，属于模块范围之外的既有结构。

## Findings 与修正

1. [P2, resolved] 初次比较标题字重偏轻、字距过紧，按钮文字偏小。调整为62px/700、字距-0.01em、按钮24px居中，面板纵向padding 66px。初始证据 `comparison-initial.png`，最终证据 `comparison-final.png`。
2. [P2, resolved] 能力页旧#enquiry样式覆盖新面板，产生黑底和白字。旧选择器排除.rfq-section，新组件使用限定作用域；最终实测背景rgb(240,241,242)、标题rgb(23,25,27)。证据 `capability-mobile-initial.jpg` 与 `capability-mobile-final.jpg`。
3. [P3, accepted] 所选图右侧按钮与说明的光学位置与实测相差约8–10px，实际采用垂直居中，保留按钮及说明的可读性。

无剩余P0/P1/P2问题。

## 五项视觉检查

- **Fonts / typography**：沿用站点字体；桌面标题62px/700、说明24px、草稿提示20px；窄容器标题36px、说明18px、提示16px。长标题按可用宽度换行。
- **Spacing / layout**：桌面左标题右按钮；灰框最大1280px、圆角26px、内边距66px/112px。手机单列、圆角22px，容器查询兼容嵌套内容栏。原有最小数量、交期等事实使用独立details行保留。
- **Colors / tokens**：面板#f0f1f2，标题#17191b，说明#616a74，按钮#d71019；无新增装饰图或阴影。
- **Images / assets**：使用现有站点资产和Lucide箭头；所有已核对页面的main图片引用与顺序保持一致。
- **Copy / content**：保留每页业务文案、锚点和询价上下文；默认提示仍说明先创建草稿，再在邮件软件添加图纸并发送。

## 交互与验证

- 12类页面分别在实际1440、768、390px视口检查，共36项，页面/面板/按钮均无横向溢出。记录 `responsive-checks.json`。
- 产品、能力和质量页主要按钮实际点击至/quote/，产品与能力等URL参数正确保留，表单可见；未填写或发送。记录 `interactions.json`。
- 静态核对82个公开页面：75个共享面板、每面板一个询价入口、无重复ID；H1和main图片引用及原有唯一询价链接核对通过。记录 `verification.json`，复核脚本 `verify.mjs`。
- 浏览器控制台错误为0。
- `npm run check`：0 errors、0 warnings、4个已有未使用声明提示。
- `npm run build`：92页生成通过；`npm run test:seo`：105 HTML、82 sitemap URL、93 redirects通过。

## Implementation Checklist

- [x] 指定产品询价区采用所选灰色圆角第一版。
- [x] 首页、产品、能力、案例、工厂、联系、公司和资源等同类收尾区统一。
- [x] 保留询价上下文、锚点和业务说明。
- [x] 完成桌面、平板、手机及真实入口跳转检查。
- [x] 源文件原稿备份于 `D:/lzz/rfq-rounded-20261014/backup/`。

## Follow-up Polish

无必须跟进问题。本次实现和验证均在本地完成。

---

# Component catalogue QA — 2026-10-12

final result: passed

## 目标与范围

用户选择第一款紧凑图集，并要求同类页面一并修改。实施覆盖8个现有页面、12个图集、24张原图。页面清单见 `before.json` 和 `browser-checks.json`。

- Source visual truth: `D:/lzz/additional-part-forms-options-20261012/implementation/selected.png`。
- Rendered implementation: `D:/lzz/additional-part-forms-options-20261012/implementation/desktop-final.jpg`。
- Full-view comparison: `D:/lzz/additional-part-forms-options-20261012/implementation/comparison-final.jpg`，左侧所选稿，右侧实测。
- Focused comparison: `D:/lzz/additional-part-forms-options-20261012/implementation/focused-final.jpg`，并排检查分组标题、原图、图名与技术字段。
- Implementation: `http://127.0.0.1:4323/products/?review=component-catalogue#additional-part-forms`。

## 视口、状态与归一化

桌面CSS视口1330×1182，devicePixelRatio约1。所选稿1330×1182；去掉73px导航后，内容1330×1109。最终实测截取完整指定模块，1330×1172。两侧均保持1:1像素比例，未拉伸高度；并排图2680×1172，20px分隔，较短一侧补中性背景。比较状态为正常展开、图片已加载、无图片弹窗。现有全站导航独立保留，未按生成图重做。

初次比较的截图宽度1315px来自浏览器滚动条；归一化后并排图2650×1183。后续统一为1330px，重新从模块边界截取，避免截图期间滚动条隐藏造成错位。`comparison-initial-dimensions.json` 与 `comparison-final-dimensions.json` 记录两轮像素尺寸。

手机CSS视口390×844，devicePixelRatio约1；完整模块截图 `mobile-final.jpg` 为390×2594，单个图集见 `mobile-*.jpg`。所选稿只有桌面设计，手机按同一内容顺序改为单列。8个页面均检查桌面与手机，16份记录见 `browser-checks.json`，documentWidth与clientWidth相等，图集图片全部加载。

## Findings 与修正记录

1. [P2, resolved] 初次并排图中技术说明偏小、模块节奏偏松。位置：`reference-catalogue.css` / `#additional-part-forms`。影响：材料与配合要求弱于所选稿，内容占用高度较多。修正：主标题42px、引言19px、字段值16px；模块上下间距26/28px、标题组下距18px、分组末尾20px。初始证据 `comparison-initial.jpg`，修正后 `comparison-final.jpg` 和 `focused-final.jpg`。
2. [P2, resolved] 同类图集首次检查时，固定横向图片窗截去长轴法兰和部分完整零件轮廓。位置：`ReferenceGallery.astro`。修正：进气腔整体、冷却器整体、车削轴及批次、PTFE长轴使用contain；CAD与单图也完整显示。保留其他批次和局部图的统一图片窗。修正后证据 `desktop-2-0.jpg`、`desktop-3-0.jpg`、`desktop-5-0.jpg`、`mobile-4-0.jpg`、`mobile-5-0.jpg`；已与对应原图核对。
3. [P2, resolved] 旧全站列表样式将齿轮三项要求覆盖为400字重，弱于所选稿。位置：`.reference-requirements > li`。修正：明确600字重；浏览器计算样式已确认。修正后证据 `comparison-final.jpg`、`mobile-0-1.jpg`。

无剩余P0/P1/P2问题。

## 五项视觉检查

- **Fonts / typography**：沿用实际站点Arial/Helvetica。桌面主标题42、分组24、图名18/700、字段标签17/700、字段值16、要求16/600；手机主标题32、图名17。原有详细图注在短图名下保持可读，标题、字段和正文层级清楚。
- **Spacing / layout**：指定模块为三张覆层零件图、两张齿轮图；图片在上，说明和要求在下。桌面图片窗256/228px，间隙28px；手机单列，图片窗250/230px。单图完整显示，桌面360px、手机290px。车间图集保留四项字段，桌面两列、手机单列。生成稿与原始技术文字换行存在小幅差异，最终模块高度多63px；保留全部文字，不压缩信息。
- **Colors / tokens**：白底、近黑标题、灰色说明和细分隔线；询价按钮沿用站点实际色值#cf141a，支持入口使用中性边框。保留真实品牌颜色和导航。
- **Images / assets**：24张原图未生成替代品、未修改零件形状。批次与局部视图统一展示窗口；需要完整轮廓的视图使用contain。全部保留原图链接和放大查看。生成稿中照片形状与原图有差异，按真实照片实施。
- **Copy / content**：保留原有标题、说明、技术字段、锚点、原图及视频。覆层零件原说明拆入Materials/Fit/Construction，信息核对通过。未增加材料牌号、精度、检测结果或其他事实。

## 交互与验证

- 12个图集的首张与末张图片均实际打开、关闭；主图集和手机表面处理入口验证Zoom in/Fit image、关闭与焦点返回。
- 点击POM gear study到`/cases/custom-plastic-parts-ptfe-pom-pe-acrylic/#pom`，定位内容包含齿形、轮毂与检验要求。
- 点击Surface-coated parts到`/resources/processes-materials-finishes/#coated-parts`，两张原图和表面处理说明可见。
- 点击Discuss your drawing到`/quote/`，显示Discuss your part及询价表单。
- 产品搜索plenum返回2项，Impellers筛选返回2项，重置返回35项。
- 浏览器控制台：0 error、0 warn。
- 内容与链接核对：8页、12图集、24图集照片、157链接、79媒体引用，0错误。见 `content-check.json` 和 `verify.mjs`。
- `npm run check`：0 errors、0 warnings、4个原有未使用声明提示；`npm run build`：92页；`npm run test:seo`通过。
- 视频源与控件保留，核对文件与链接；本次没有逐条播放视频。修改与检查均在本地完成。

## Implementation Checklist

- [x] 指定图集采用所选三图/两图结构。
- [x] 同类汽车产品、塑料/金属图集、外壳研究和表面处理页面统一。
- [x] 需要完整轮廓的图片防裁切，原图查看与焦点返回正常。
- [x] 桌面与手机截图、内容核对、构建与SEO验证完成。
- [x] 原始文件、旧DESIGN和QA报告备份于 `implementation/backup/`。

## Follow-up Polish

无必须跟进的视觉问题。现有原图的拍摄背景、清晰度和主体位置作为真实素材保留。

---

# Factory visual fidelity correction — 2026-10-12

final result: passed

Target: previously selected first factory remix, exec-71b0bcdf-0334-4a52-bf12-079f3bf45357.png. User rejected prior implementation's image proportions and authorized ImageGen regeneration. Scope limited to homepage factory module.

## Corrections and evidence
D:/lzz/factory-refined-20261012/comparison.png contains selected target left and final browser render right; inspected together. section-final.png is a stitch of actual desktop viewport captures using recorded scroll positions, not a generated mock. Source asset composition differs slightly due requested photo regeneration; buttons intentionally outlined per previous instruction.

Images now fill both columns at768x576px and480x576px at1440 viewport; aspect ratios4:3 and5:6, no stretching or equipment cropping. Removed420px cap that caused underfilled columns. Gap32px instead of48px. Photos, headings and240px-wide actions share aligned edges and baselines. H2 retained64px, story headings38px, facts38px, labels16px, inspection body18px. Reference structure, white surface and sans-serif hierarchy retained.

ImageGen built-in used for original-photo retouch and limited background extension. Originals remain in public/media/evidence and unchanged. AI outputs have small reconstructed details and must not substitute for unedited equipment/documentary evidence. Only homepage uses the refined copies. Alt text and data-image-origin identify AI treatment. Factory and quality pages keep original evidence photographs.

Mobile390px: photos330.67x248px and330.67x396.79px, single column and no horizontal overflow. Existing links/copy/destinations preserved. No new business facts, no form submission and no deployment.

Assets: public/media/factory-refined/* webp480/800/full variants; source output PNGs and prompts.json in D:/lzz/factory-refined-20261012/. Browser checks confirmed loaded images and aligned buttons. Build verification recorded separately in build-result.txt. No unresolved P0/P1/P2 layout issues in this scoped check; not a new sitewide audit.


## Auxiliary link reduction — 2026-10-14

Removed repeated Explore/View and supplementary body exits across 20 pages: net 35 links, plus 9 directory actions merged into article/topic titles. Keep primary cards, meaningful directories, task-specific workflow links, downloads, contacts and inquiry actions. Avoid adding standalone general navigation after every content block. 82 public pages remain reachable; content, images, desktop/mobile layout and navigation checks passed. Evidence: `D:/lzz/link-cleanup-20261014/README.md`.

## Footer direction 2 — 2026-10-14

final result: passed

Source visual truth: `D:/lzz/footer-design-20261014/selected.png` (the second displayed ideation result, 1586 x 992 pixels).
Implementation: local `/cases/`, shared `SiteFooter.astro`; `D:/lzz/footer-design-20261014/desktop-footer.png`, `mobile.png`.
Combined comparison: `D:/lzz/footer-design-20261014/comparison.png`, source on left, implementation on right. Desktop CSS viewport 1586 x 992; content width 1571 excluding scrollbar, footer region approximately 1571 x 591. Source footer crop 1586 x 582 from y=410. Both crops resized proportionally to 1100px wide on one comparison sheet; no stretching. Mobile CSS viewport 390 x 1500 for full component capture, content 375px excluding scrollbar; native CDP viewport capture 390 x 1500 and final footer crop 375 x 1182. Mobile responsiveness also checked at ordinary widths down to 320px. Initial full-page mobile capture shifted during layout and was replaced with the stable viewport capture, showing the entire address and legal row.

State: final page footer, no open navigation, existing RFQ panel unchanged. Component-wide side-by-side is also the focused-region comparison; every contact, directory group and legal field was inspected. Existing header width is 1280px on desktop, narrower than the generated image. Keeping exact alignment with the current header is intentional and follows the user's request. Hence horizontal spacing and address wrapping differ slightly from the concept.

### Findings and fidelity surfaces

- No actionable P0/P1/P2 finding remains. Initial inherited 12px footer top padding was removed before final capture.
- Fonts: existing local Inter; 20px desktop directory headings, 18px narrow-screen headings, 16px links, 28px large desktop contacts. The reference's readable hierarchy is retained. Existing typography rules determine text rendering; no decorative heading font added.
- Spacing: three top groups, five directory columns, ruled bottom strip. Footer and header boundaries match within 1px in every measured viewport. Three-column tablet and two-column phone directory preserve DOM order and all links.
- Colors: charcoal #17191b, white emphasis and readable cool-gray secondary text, fine translucent rules. Flat background matches current brand palette; generated image texture is omitted intentionally.
- Assets: original `lzz-logo.png`, white CSS filter already used by the site; location symbol from installed Lucide library, no invented logo or illustration. Small outline-vs-filled map pin difference is P3 and accepted.
- Content: five group names/order match the main navigation. Real email, WhatsApp, address and company name retained. All existing footer destinations remain, with three machining destinations added to match the selected concept. No invented business claims.

### Verification

- `npm run build`: passed, 92 Astro pages, SEO output 105 HTML.
- `npm run check`: 0 errors, 0 warnings, 4 existing hints in unrelated files.
- `npm run test:seo`: passed, 105 HTML, 82 sitemap URLs, 93 redirects, 91 raw URLs.
- `route-check.json`: 82 public routes each contain one shared footer with five groups; all internal footer destinations exist.
- `responsive.json`: widths 320, 390, 600, 768, 900, 901, 1100, 1101, 1440, 1586; aligned, no overflow.
- `route-browser.json`: homepage, quote, about and milling detail at 1440/390; correct heading sizes, five groups, aligned, no overflow.
- Actual footer RFQ checklist click reached its correct H1. Contact protocols/targets preserved; no email or WhatsApp message sent. Visible keyboard focus inspected, mobile targets at least 44px. Browser error log empty after navigation.
- Final browser viewport override reset. No deployment performed.

### Implementation checklist

Completed shared component, stylesheet, local navigation, responsive verification, source comparison and build checks. Backups are in `D:/lzz/footer-design-20261014/before/`.

## Image compatibility and category cover regeneration — 2026-10-14

final result: passed

Task: replace the excessive portrait/dense imagery selected in the cases directory with suitable ImageGen equivalents and inspect the rest of the site for the same issue. This is an asset/layout pass, not another site direction selection.

Visual evidence: `D:/lzz/image-compatibility-20261014/collections-desktop.png`, `collections-mobile.png`, `case-photo-desktop.png`. Source references and generated originals, exact submitted prompts and hashes are linked by that directory's README. Opened both original inputs and inspected each generated output. The new images show complete isolated part forms, clean backgrounds and no text or unrelated workbench objects. The supplied metal reference's repeated small housings become a readable assortment; the plastic portrait becomes a compact landscape group. Visible AI illustration captions distinguish these category covers from the original collections.

Fonts/colors/layout: existing Inter and page palette remain. Generated covers are 1536×1024 with 480/800/1200/1536 WebP srcsets, 3:2 natural proportions, no crop or stretching. Original photos retain intrinsic ratios, capped at 520px in studies and 460px in capability records. The impeller component was incorrectly cropped to 4:5; it now uses its native 3:2 art. Measured figure widths also prevent lazy-image shrink-wrap collapse and keep captions aligned. No business copy, material conditions, original source registry, inquiry behavior or footer/navigation changed in this pass.

Verification: desktop measurement of 82 public routes / 367 main-image slots; 11 affected or equivalent routes × four widths 1440/969/390/320 = 44 stable-layout checks with no overflow, zero-size target images or oversized target height. Original five-axis full-image link opened its image URL; new plastic cover opened the correct collection with 5 existing reference photos. Browser error log checked separately. `npm run build` passed; `npm run check` 0 errors/0 warnings/4 pre-existing hints; `npm run test:seo` passed (105 HTML, 82 sitemap URLs, 93 redirects, 91 raw URLs).

The initial broad DOM measurements sampled some lazy/unfinished layouts at zero dimensions; these are not missing-asset findings. The final responsive pass explicitly waits for the target layout to become visible before measuring. Browser tab reconnection and screenshot-time viewport changes were handled by fresh tab bindings and native viewport captures; stored screenshots show the actual result.

Remaining P0/P1/P2: none. Existing full-screen homepage hero is an intentional different use and is preserved. Local implementation only; no deployment.


# 全站旧零件展示图重生成 — 2026-10-14

final result: passed

用户标注 CNC milling 页面中的铝壳堆叠图，并要求用 imagegen 重新生成全站同类图片。本轮检查了35个零件的默认展示图和初始构建中的132个主内容图片资源；29张同系列旧抠图全部重做，6张已整理的展示图继续使用。工厂、检验、公司新闻、加工过程与原始参考照片仍保留其来源。

## 图片与接入

使用内置 imagegen，每个零件一条独立生成请求。共同方向为白底、柔和接地阴影、清晰加工纹理、完整主体和统一3:2构图。单件或2–3件有主次的组合替换密集堆叠与多图拼贴。原零件家族和材料表现作为参考，不新增性能参数或客户履约事实。进气歧管从既有CAD上下文中取出展示；结果不作为尺寸或结构完全一致的验证。

共享配置 src/data/productImages.ts 优先使用 src/data/productStudioImages.generated.json。产品目录、能力页、详情页与相关零件共用同一映射。最终82个业务页面中145处图片位使用新版，29张新图全部存在引用，同系列旧默认展示图剩余0处。原始catalog记录及原片文件保持留存。

29张原始生成PNG保存在 D:/lzz/product-image-regeneration-20261014/generated/；261个240–1536px WebP文件保存在项目 public/media/product-studio/，合计8,223,374 bytes。生成提示、参考输入、输出原件、文件哈希、展示用途和响应式派生信息见 provenance.json；全部提示词已保存，不依赖聊天中的图片。

## 验证

- 浏览器检查35个零件详情、11个能力页、两项目录与首页，共49页；1600×1000和390×844两种尺寸，共98次页面渲染。所有29张新版至少实际加载一次，检查时未发现横向溢出、未加载的可见新版图片或页面错误覆盖层。
- 所有新版响应式文件尺寸与存在性通过校验，业务页没有旧系列展示图残留。
- 最终桌面 marked-after.jpg 和手机 marked-mobile-after.jpg 已实际查看；catalog-before.jpg / catalog-after.jpg 对照已查看。原主图中的密集复制、主体过小和杂乱拼贴已清理，图片内没有文字、标识或水印。
- 目录分类筛选显示12项，其中11项使用新版，重置回35项。实际键盘输入 Lid & gasket 的可访问性结果为1项，并显示正确铝壳入口。
- 当前详情页大图入口使用对应展示图。该模板在本轮期间被另一处页面重构重写，当前读取版仍保留这一入口行为；整页布局、标题动画与文案变化不归本轮修改统计。
- npm run check 通过：0 errors、0 warnings、4项原有unused提示。npm run build 通过：92个Astro页面、82个sitemap入口、93条重定向。npm run test:site -- --static 与 npm run test:seo 均通过105个HTML。

## 共享工作区与边界

首轮构建碰到另一处并发页面修改新增的 product-reading.css 引用，而文件当时未完成写入；文件齐全后重跑构建通过，未删除导入或覆盖其样式。共享开发服务器的HMR也会重置临时查询和旧标签页状态；最终在新标签页重新打开标注页面检查并留存截图。部分批量截图记录了页面标题进入动画的中间状态，不作为字体或标题动画验收。

本轮最终修改统计以图片配置、图片资源和生成来源记录为准，不包含其他会话的布局改动。临时视口设置已恢复，最终本地预览为 http://127.0.0.1:4323/capabilities/cnc-milling-service/#part-examples。
