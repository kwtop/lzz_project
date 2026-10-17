# Candidate 3 — make part examples comparable

Starting point: accepted Candidate 2 (`CANDIDATE-2-code.zip`). Both independent reviews identified the same procurement gap: product cards show image, title and form description, but no consistently positioned process or material scope. Overseas buyers cannot compare examples without opening every detail page. On mobile the two-column cards make the existing descriptions especially small.

Change only the catalogue card presentation. Reuse the existing listing category and editorial source data to show a restrained, same-position process/material scope line. These are service/listing scopes, **not a claim that the pictured piece has a particular alloy or grade**. When the source has no specific material subject, say that the material is to be confirmed from the drawing. On narrow screens, use one compact image/text row per example so this information remains readable at normal type size.

Success: buyers can distinguish process and material scope across adjacent cards at 390 and 1440 px without losing geometry labels or visually crowding the catalogue. Reject if any source attribution becomes misleading, the list becomes materially harder to scan, mobile legibility declines, or navigation/inquiry breaks. Keep the same fixed screenshot and independent-review protocol.

## Result

- Code checkpoint: `CANDIDATE-3-code.zip` (SHA-256 `8F7FA0848F7E51B18643E91FA3D8463C8777961F4FBBC489EC773FACD41FA660`). Screenshots: `screens/d3e4b5a6/` (56 PNG).
- Two independent screenshot-only reviews with the fixed prompt: A 7.6 / 7.0 / 6.7; B 7.4 / 7.0 / 6.4. Means: **7.50 overall / 7.00 procurement / 6.55 trust**. BEST means before this attempt: 7.60 / 7.00 / 6.90. The trust decline triggered the required equal-sample comparison; both versions already have two independent reviews on their fixed screenshot sets, so no selective extra scoring was done.
- The extra process/material line and mobile list did not make the procurement score better. Both reviewers still found “Material by drawing” too generic to compare similar parts. The modification therefore did not establish a clear benefit and was **rejected**.
- Checks passed before review: `npm run check`, `npm run build`, `npm run test:seo`, `node scripts/verify-studio.mjs` (30 page/viewport checks, zero failures/errors), `node scripts/verify-inquiry-context.mjs`. No real RFQ email sent.
- Restored the two changed site files from `CANDIDATE-2-code.zip` in full. The accepted Candidate 2 remains BEST_VERSION.
