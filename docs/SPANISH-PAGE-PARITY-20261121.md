# Spanish page parity, 21 November 2026

This update aligns the 96 existing Spanish public URLs with their English counterparts. The English page structure determines section order, responsive markup, images, technical diagrams, tables, case records and calls to action.

The build renders Astro first. The Spanish pass pairs pages by hreflang, localizes the built content using the reviewed entries in src/data/es/translated-pages.json, then runs analytics annotation, CSS optimization and sitemap generation. Use the built preview for parity testing. The Astro development routes are the Spanish metadata and form sources.

The Spanish gallery uses the shared catalogue component and filter values. The quote form uses the existing localized form with the English reference inventory, stable identifiers and corresponding Spanish links. The RFQ brief and acceptance worksheet have Spanish downloads. Original photographs, technical drawings and company evidence are retained.

The Spanish metadata, route pairs and original publication dates are carried forward. Where the English page contains Article metadata, the Spanish dateModified records the 21 November 2026 revision. This is also the Spanish sitemap lastmod. The English homepage publishes the previously approved lead-time wording of 7–14 business days.

Verification uses scripts/verify-spanish.mjs to compare rendered section, heading, media, table and control sequences, linked targets, canonicals, reciprocal hreflang and schema types. The Spanish text was initially translated with machine assistance and edited for machining terminology, page introductions, purchasing language and localized controls.

Production deployment: fa163b14-7254-4e4d-a1c5-3f12c748ebfb. The previous deployment was 7ff2b9d1-41d3-4f16-8f0e-4955a0ca902e. The live comparison passed for all 96 English–Spanish pairs. Browser checks covered 28 desktop and mobile views, with additional live tests for the mobile menu, gallery filtering and preserving the machining reference on the quote form. The sitemap returns 192 canonical URLs. The Cloudflare domain and runtime binding checks matched the previous configuration.

## Spanish editorial revision, 22 November 2026

The revision changes 3,048 translation entries used by the 96 Spanish pages. It corrects machining and purchasing terms, including housing, machining allowance, datum, runout, live tooling and raw stock. It also updates Spanish interface and download labels. The English and Spanish URL pairs remain the same. The Spanish page and sitemap modification dates reflect this revision.
