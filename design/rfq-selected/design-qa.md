# RFQ checklist — selected third direction

final result: passed

2026-09-30. Local URL: http://127.0.0.1:4323/resources/rfq-checklist/
Source: D:/lzz/design-explorations/rfq-checklist-2026-09-30/03-drawing-led-editorial.png (745 x 2109). Selected by displayed order, as recorded in selection.md.
Implementation: design/rfq-selected/desktop.jpg, hero.jpg and mobile.jpg. Desktop viewport 1440 x 1000 CSS px; full screenshot excludes 15px scrollbar. Comparison: design/rfq-selected/comparison.jpg, both full pages normalized to 620px width. Source is a generated concept raster, not a browser viewport. Separate actual-size hero and mobile browser screenshots inspected for readable details.

## Findings and iterations

Initial image column was too narrow and cropped the left housing. Increased the hero grid image track from 1.15 to 1.5 and positioned crop at 35%; rebuilt, recaptured and compared. Final image preserves complete housing and drawing/caliper composition.
Mobile title lost the space where desktop br was hidden. Added an explicit space, rebuilt and checked screenshot at 390px; sentences now separated correctly.
No unresolved P0/P1/P2 findings.

Typography: existing Inter, 58px maximum desktop h1, 36px mobile h1, 36px desktop h2, 16px body; restrained weight and hierarchy. Source raster text is optically larger at equal page width; production sizes retained for site consistency. Spacing: full-width title, edge-aligned left hero image/right five essentials, two-column acceptance and material sections, quotation scope, commercial facts and delivery definitions, gray sending band, related links and full shared footer. Colors: white and pale gray, charcoal, blue links, red primary action. Image: existing generated illustration reused with explicit disclosure and alt text. Copy: all source RFQ and delivery-section facts retained, including standards revision/scope, MOQ, conditional lead time, file conflicts, measurement evidence, NDA and local email draft behavior. No invented guarantees or upload function.
P3: shared footer and secondary link typography differ slightly from raster. Source and local full-page height differ with responsive text sizing.

## Verification

- Desktop 1440px, tablet 768px, mobile 390px: no horizontal overflow.
- Acceptance criteria anchor opens #acceptance.
- Download order acceptance checklist actually downloaded the original TXT worksheet.
- Prepare RFQ email opens existing /quote/ page; no request sent.
- Static verification: all article href destinations and anchors, download file, two related products, one h1.
- Browser error log returned no errors.
- Astro check 0 errors, 0 warnings, 0 hints. Build 82 pages. SEO check passed 82 HTML, 80 sitemap URLs. Rebuilt after final crop and text fixes.
- Existing article source preserved in design/rfq-selected/before/. Implementation adds src/components/RfqChecklist.astro and a scoped branch in src/pages/resources/[slug].astro. No deployment.
