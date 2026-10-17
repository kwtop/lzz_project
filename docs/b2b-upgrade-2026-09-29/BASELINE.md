# B2B site upgrade baseline — 2026-09-29

The working site is an Astro/React English-language CNC machining website. This checkout has no Git repository. `BASELINE-code-media.zip` preserves 979 project code, script and public-media files before this upgrade (SHA-256 `160f4b679118f5886db4cbe9d3a7ae95258b21ff2bd8767bc42058561465e351`). Original source materials outside `_react` were not modified.

The fixed screenshot manifest is `manifests/b9d5f3a2.json`; 84 screenshots are in `screens/b9d5f3a2/`. It covers home, open desktop/mobile navigation, catalogue/filter, part detail, service/material, cases, insights/long article, factory, quality, about, contact/RFQ including a prepared draft, footer, and 1440/768/390 px viewports. The earlier `a8c4e2f1` capture used an incorrect route in the capture script and was excluded from evaluation; the corrected capture verifies each response is successful.

Actual route/template inventory: Astro static build emits 82 pages. Major templates include home, products listing and 35 product details, capabilities directory and 10 categories, 8 cases, insights index/articles, factory, quality, about and quote. Shared components include `Layout.astro`, `MainNavigation.astro`, `ProductExplorer.tsx`, `QuoteForm.tsx`, `PageHero.astro`, `ProductCard.astro` and `EvidenceImage.astro`.

Independent screenshot-only baseline reviews used the same six-dimension prompt. Reviewer C: brand 8, procurement 7, trust 6, visual 7, navigation/RFQ 7, consistency 7; weighted 7.0. Reviewer D: 8, 7, 6.5, 6.5, 7.5, 6.5; weighted 6.9. Shared material issues: over-tall turning photo, clipped mobile article comparison, RFQ quote inputs hidden in optional details, and weak distinction between capability/process imagery. ISO certificates and authentic redacted inspection records remain source-material gaps; generated imagery must not fill them.

Baseline validation: `npm run check` passed (0 errors/warnings/hints), `npm run build` emitted 82 pages, `npm run test:seo` passed, `node scripts/verify-studio.mjs` passed 30 page/viewport checks, and `node scripts/verify-inquiry-context.mjs` passed. This is local preview validation, not email delivery or deployment.

## Candidate 1 change intent

1. The turning page's inherited photo dimensions cause an extreme scroll gap. Constrain the actual child image to a stable editorial aspect ratio, then verify the nearby process explanation and cases are in normal reading sequence.
2. On mobile, three-column article tables visibly truncate the last column. Render their existing contents as stacked comparisons while retaining the semantic desktop tables, and verify all text remains readable.
3. The RFQ hides material and quantity and pushes the prepared draft below the full form. Bring quote-defining fields into the main form, and prioritize the review/send action after drafting. Keep unknown values possible, prevent sending from the site, and retest saved drafts and mailto context.
4. The capabilities directory reuses one generic part image for different processes. Use distinct existing, proven process photos where available and show a concise geometry cue. Remove a misleading cross-material product link from material pages. Verify the route links and product examples remain intact.

Candidate 1 will be accepted only if buyer information, trust disclosure, mobile readability and functional checks do not regress and independent review supports a clear improvement over this baseline.
