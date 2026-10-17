# Prototype to repeat production — selected option 2

final result: passed

2026-09-30. Local implementation: http://127.0.0.1:4323/resources/prototype-vs-small-batch-cnc/

Source visual: D:/lzz/design-explorations/prototype-batch-2026-09-30/02-approval-journey.png (779 x 2020).
Rendered evidence: design/prototype-selected/desktop.jpg (1425 x 3607, 1440 CSS px viewport minus scrollbar); hero.jpg; mobile.jpg. Full comparison: design/prototype-selected/comparison.jpg, reference and implementation normalized to 620px displayed width. Final hero screenshot was separately opened at 1440 x 900 to inspect copy, crop and typography. The source is a concept raster, not a specified browser viewport.

## Findings and comparison history

Initial hero fixed height cropped the left sample. Changed image to 1.45 aspect ratio and rebuilt the preview. Final browser screenshot confirms all five parts visible. No unresolved P0/P1/P2 findings.

Typography: existing Inter retained; 49px maximum heading, 36px mobile heading, 16px body. Four-line desktop title and three-stage hierarchy reproduced. Spacing: two-column hero, three stage links, numbered chapter introductions, pale approval band, split repeat-order/lead-time area, RFQ strip, four supplier checks, related product exits and shared footer. Source has a wider image relative to outer margins; implementation follows the existing 1160px content width. Colors: white and pale gray, muted gray numerals, red RFQ, blue product links. Images: existing AI illustration reused with explicit disclosure; no customer evidence invented. Copy: original technical topics, MOQ and conditional lead time retained; repetition merged into stages.

P3: source and implementation footer density and small secondary-link rules differ; shared site components retained. No extra decorative assets.

## Verification

- 1440, 768 and 390 CSS px: no horizontal overflow.
- Stage Approve click resolves #section-2.
- Prepare RFQ email opens existing /quote/ form; no email sent.
- Engine-cover link opens correct product heading and URL.
- Static output check passes all guide links and anchors, two related products, one h1.
- Browser error log returned no entries.
- Astro check: 0 errors, 0 warnings, 0 hints. Build: 82 pages. SEO check passed: 82 HTML and 80 sitemap URLs. Rebuilt after final crop change.
- Scoped implementation: src/components/PrototypeJourney.astro and selected-article branch in src/pages/resources/[slug].astro. Existing shared Resources migration respected.
- Before files retained in design/prototype-selected/before/. No deployment.
