# Cloudflare preview — 2026-09-17

## Follow-up: remove auxiliary photo/catalog footnotes

- User requested removal of homepage selected-parts footnotes and equivalent site-wide labels. Removed selected-parts, workshop caption, gallery provenance/original-image caption, category photo caption, catalog-examples note and workshop photo-source intro. Product requirements and operational instructions retained.
- 60 built HTML pages scanned with no targeted footnotes remaining. Deployment https://658d41b1.lzz-precision.pages.dev updates the existing preview alias; 50 uploaded / 200 reused. Remote home/category/product checks and gallery open/close verified.

- Existing project `lzz-precision`, branch `preview`, account `c3243c843894c12a89207ee67bf60e8e`.
- Deployment: https://74830173.lzz-precision.pages.dev
- Alias: https://preview.lzz-precision.pages.dev
- Wrangler 4.133.0 uploaded 64 files, reused 186. Previous preview retained.
- Includes site-wide layout refinements, viewport-height homepage hero, and user-requested removal of public generation/illustration labels. Internal image provenance records and originals retained; inquiry remains email-draft-only.
- Local build: 60 HTML; body/alt scan found no generation/simulation labels. Refinement suite passed 59 tablet routes and mobile/desktop interactions.
- Remote home/about/factory/quality: HTTP 200, images decoded, no horizontal overflow or page errors. Home hero 900px in 1440x900 viewport; material tab switching does not restore removed captions.
- No production domain, DNS, or inquiry-backend changes.
