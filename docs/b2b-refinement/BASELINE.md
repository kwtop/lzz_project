# B2B design baseline — 2026-09-29

This baseline freezes the local site as it stood when the stricter review protocol began. Earlier edits in the active session are included in this snapshot; there is no Git repository in `D:/lzz/lzz/_react`, so the archive is the recovery point for this protocol. No source files or original media were removed to create it.

- Code checkpoint: `BASELINE-code-2026-09-29.zip`
- SHA-256: `2AA309AA70C666929FD2A61189BA41161593CD8D1798C2FCEC7F49146F91FC3C`
- Screenshot set: `screens/9c4e7b2a/` (56 PNGs)
- Fixed route, viewport, scroll-target and state manifest: `manifests/9c4e7b2a.json`

## Actual route and template inventory

- Home `/`.
- Catalog `/products/` and 35 detail pages `/products/[slug]/`.
- Capability index `/capabilities/` and 10 category pages `/capabilities/[slug]/` including prototype and plastic machining.
- Application/process evidence `/cases/` and eight case/collection pages `/cases/[slug]/`. There is no standalone `/solutions/` route.
- Factory `/factory/`, quality `/quality/`, about `/about/`, RFQ `/quote/`.
- Knowledge center `/insights/` plus topic and article pages; privacy and 404.
- Shared layout: `src/layouts/Layout.astro`; navigation: `src/components/MainNavigation.astro`; catalog filtering: `src/components/ProductExplorer.tsx`; RFQ form: `src/components/QuoteForm.tsx`; footer and global CTA in the layout.

## Baseline risks to judge from rendered evidence

1. Product cutouts, real workshop photographs and the homepage treatment may still feel like separate visual systems.
2. Long factory/product pages may impose excessive mobile reading cost.
3. Certification can be requested, but the current ISO document and a redacted measured inspection record are not in the supplied source library. The site must not fabricate them.
4. RFQ controls create an email draft for the visitor to send; they do not submit an on-site inquiry.

The earlier review process produced non-comparable scores. Only reviews of the fixed 56-image set, using the fixed prompt, will determine the score for this baseline.
