# Assessment B — detector and browser evidence

Independent review: /root/impeccable_content_b. Target D:/lzz/lzz/_react/src, local UI http://127.0.0.1:4323. No A report or previous critiques read. No source changes. Captured 2026-09-30.

## Scope and execution

CLI detector ran exactly once: `C:/Users/Administrator/.agents/skills/impeccable/scripts/impeccable.cmd detect --json src`. Complete JSON is detector.json. Actual entrypoint exit code was 0 despite seven warning records (do not interpret exit 0 as clean).

Browser: new background IAB tab, desktop default 1265×712 screenshot, then requested 390×844 mobile viewport (rendered image 375×813); restored viewport and closed temporary tab. Catalog/filter, product detail, quote invalid/draft-only flow, RFQ article inspected. Mutable evaluation unavailable: documented Playwright evaluate is read-only; no title/script injection attempted, no visible overlay, no live-server started or requiring cleanup. Fallback is CLI + native screenshots + DOM/source evidence. Test-only local draft cleared using Clear saved input. No email application opened and no external sending.

Static: `node scripts/verify.mjs --static` passed: 90 HTML link/asset/heading/redirect shells. `node scripts/verify-seo.mjs` passed: 90 HTML, 81 sitemap URLs, 93 evidence-derived redirects, 91 discovered raw URLs (35 products/53 aliases, 10 categories/20 routes, 2 articles). These cover existing built output, not production or live mail delivery; host behavior explicitly not tested.

## Detector results and adjudication

Seven warnings, four rules, six files: overused-font ×3; border-accent-on-rounded ×2; side-tab ×1; layout-transition ×1. Six slop warnings, one quality warning. No detector content/factual-accuracy conclusion is possible.

| Rule | Location | Adjudication |
|---|---|---|
| overused-font | src/styles/about-documentary.css:1 | Inter presence is accurate, but font popularity alone is not a demonstrated usability/content defect. Exclude from substantive content priorities. |
| overused-font | src/styles/factory-tour.css:1 | Same; importedBy factory.astro. |
| overused-font | src/styles/shipping-checklist.css:1 | Same; importedBy ShippingChecklist.astro. |
| border-accent-on-rounded | src/styles/global.css:25 | False positive: .draft-result border-top:3px is in a minified line containing unrelated border-radius:0 form rules. No rounded accent card proved. |
| border-accent-on-rounded | src/styles/how-we-work.css:13 | False positive: .ww-eyebrow::before horizontal 42px line, no rounded card. |
| side-tab | src/styles/navigation.css:26 | False positive for alleged decorative card pattern: mobile nested-nav hierarchy uses neutral border-left:2px var(--border), border-radius:0. |
| layout-transition | src/styles/navigation.css:7 | Literal true: margin transition on 6px summary arrow (.18s). Low-impact P3; no measured jank and no basis to elevate. Could replace margin movement with transform. |

## Browser/content findings

1. P2 — Catalog selection terminology is ambiguous. /products/ says `9 selected · 35 total` on desktop and `6 selected · 35 total` on mobile before the user selects anything. The control later says `Show selected parts`; it actually means editor-curated examples. Rename to `9 featured examples · 35 total` and `Show featured examples`. Evidence b-catalog-desktop.jpg, b-catalog-mobile.jpg; source src/components/ProductExplorer.tsx:61. Reset filters restores 35 items instead of returning to the initial 9/6; functional but reinforces ambiguity about what selected means.

2. P2 — Product identity changes between catalog and detail/RFQ. Card says `Machined impellers`, but /products/ultra-high-precision-machining-services/ H1, breadcrumb and quote reference become `Precision machining for complex geometry`. Real image remains recognizable, yet the concrete part name disappears from the heading. Keep `Machined impellers` as H1, with complex-geometry machining as subheading; retain canonical URL if needed. Evidence b-catalog-mobile.jpg vs b-product-mobile.jpg and b-product-desktop.jpg. This is naming continuity, not a broken link.

3. P2 — Product detail repeats drawing instructions verbatim. Same URL: `Identify blade profiles, root transitions and the datum axis. Mark thin sections and tool-access restrictions.` appears under Drawing priorities and Geometry & interfaces; `Agree the profiles to measure and any separate balance or rotating-assembly tests.` also repeats under Inspection and Inspection requirements. These repetitions create reading length without an additional decision. Keep short feature summary at top and complete drawing checklist below. Source src/pages/products/[slug].astro:50 and :83 reuse engineering.drawing/inspection, thus a shared template issue. Desktop screenshot shows first block; DOM confirmed second.

4. P2 — Form invalid state lacks persistent explanatory error copy. /quote/?part=...&product=ultra-high-precision-machining-services: clicking Prepare email draft with empty name/email focuses name and outlines both in red; screenshot and AX snapshot show no added text. Browser-native required validation blocks progress, so do not call it broken. Add localized inline `Enter your name` / `Enter a valid work email`, bound via aria-describedby and error summary. Evidence b-quote-validation-mobile.jpg, b-quote-validation-desktop.jpg; source QuoteForm.tsx:130–136 uses required/native validation and no custom field errors. Native tooltip behavior in other browsers was not assessed.

5. P2 improvement — Reference-only project text passes as a completed brief. From a product, textarea is prefilled `Precision machining for complex geometry`; filling only test name/email allows `Email draft prepared — not sent` with this generic phrase as Drawing and requirements, both Material/Quantity `To confirm`. The product reference already has its own aside/draft field, so this duplicated text may be mistaken for supplied requirements. Prefer separate reference plus blank project prompt, or label a reference-only draft `Add your part requirements before sending`. This is a content-quality gap, not external delivery failure; no email opened. Source QuoteForm.tsx:10 emptyFields(part), :75–85 draft, :136 required textarea. Desktop draft screenshot was observed in tool output but not persisted; do not cite it as a saved file.

## Positive verified evidence

- /products/ explicitly says each example is made to drawing, not sold from stock. Search nonsense and incompatible process/material produce `No matching parts`, specific recovery guidance and Reset filters; reset works. b-filter-empty-mobile.jpg.
- Product detail distinguishes image evidence from material/dimensions/inspection and gives drawing-specific priorities and meaningful comparison reasons rather than generic related links.
- /quote/ consistently explains local-only draft creation, final email app step and manual drawing attachment. Draft says `Email draft prepared — not sent`; Edit details works; clear action visibly reports input cleared while retaining selected part.
- /resources/rfq-checklist/ has a coherent five-item buyer checklist, download worksheet, drawing conflict/revision guidance, grade/finish/acceptance/shipping distinctions. AI image caption is visible on mobile: `AI-generated illustration — not an LZZ order or inspection record.` b-rfq-mobile.jpg. No clipping observed in sampled mobile headings or controls.

## Evidence files

- detector.json (complete original output)
- b-catalog-desktop.jpg
- b-catalog-mobile.jpg
- b-filter-empty-mobile.jpg
- b-product-desktop.jpg
- b-product-mobile.jpg
- b-quote-validation-desktop.jpg
- b-quote-validation-mobile.jpg
- b-rfq-mobile.jpg

Limitations: representative live routes rather than every page manually opened; full tree detector is styling-oriented; static checks inspect current dist output; no production tests, external submission, automated full browser suite, performance trace or WCAG contrast measurement. The initial /catalog/ guessed path returned a correct branded 404 and the actual catalog was reached through observed /products/ footer navigation; this is not a site defect. No disposable files remain; report, detector output and evidence are intentional review artifacts.
