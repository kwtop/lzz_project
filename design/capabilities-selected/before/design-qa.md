# Product detail design QA — 2026-09-30

final result: passed

## Scope and target

Applied selected option 2 (engineering review) to all 35 existing product detail routes. Preserved Astro, original catalog, product-specific guidance, casting requirements, supplemental source references and contextual RFQ links. No deployment or external submission.

Source: `D:/lzz/engine-cover-redesign/option-2.png`, selected via `selection-map.json`.
Implementation: local server `http://127.0.0.1:4323`, engine-cover route plus shared-template products.

## Visual comparison

Compared source and rendered implementation together in `D:/lzz/engine-cover-redesign/qa/comparison.png`, both normalized to 720px width. Implementation captured at 1440px viewport. Matching primary hierarchy: narrow left product column, large review heading on right, requirements table, adjacent quote action, manufacturing table, photographic band, drawing preparation and footer. No actionable P0/P1/P2 defect found in the combined comparison.

Intentional adaptations: original source photograph remains intact inside a dark photo band instead of synthesizing a wider scene. Existing shared header and footer are retained. Longer product-specific guidance and related-part reasons remain accessible; extra detail uses native disclosures, so total page height differs from the concept. Mobile stacks the two columns and preserves anchor navigation. Other product pages use their own requirements, not engine-cover copy.

## Verification

- `npm run check`: 179 files, 0 errors, 0 warnings, 0 hints.
- `npm run build`: 82 pages generated.
- `npm run test:seo`: 82 HTML pages, 80 sitemap URLs, 86 redirects; passed locally.
- All 35 built product pages: one H1, review headline, three section anchors, product-specific RFQ parameters, valid image/source-set paths, valid local destinations and casting fragment targets. Report: `qa/all-products.json` in the redesign folder.
- Browser at 390px: all 35 pages checked; no document overflow or completed broken images. Report: `qa/mobile-all-products.json`.
- Visual inspection: engine cover desktop and mobile; brass tablet at 768px; pilot-batch housing desktop.
- Interaction checks: drawing anchor reaches the drawing section, detailed order notes expand, mobile navigation opens/closes, quote navigation initializes the correct engine-cover reference and textarea. No form was submitted.
- Catalog SHA256 unchanged: `eb9b272d9fd4e9c9bf9eda78012d2dd37ab22337301a88d2e7b19f2505f48cff`.

## Assets and evidence

Two AI-generated editorial product arrangements replace overly dense batch cutouts only on their detail pages: brass fittings and pilot-batch housings. Original catalog photos are preserved. Provenance: `D:/lzz/engine-cover-redesign/assets/provenance.json`.

Screenshots in `D:/lzz/engine-cover-redesign/qa/`: `engine-desktop.png`, `engine-mobile.png`, `brass-tablet.png`, `enclosure-desktop.png`, `comparison.png`.

Previous template and QA document are preserved in `D:/lzz/engine-cover-redesign/backup/`.
