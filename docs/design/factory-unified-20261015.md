# Factory & quality — unified reading page

## Decision and implementation

User approved combining the factory overview, workshop and quality pages into `/factory/`, with optional image generation for missing explanatory visuals.

- Main navigation now links directly to Factory & quality, with no dropdown. Footer shortcuts go to sections of the same page.
- Page order: workshop → equipment → quality → documents → delivery → inquiry. Workshop / Equipment / Quality / Documents links provide page navigation.
- Existing workshop, machining, CMM and packing photographs retain their provenance captions. Company facts follow `docs/claim-ledger-2026-09-25.md`.
- Capacity conditions, equipment-fit details, measurement methods, approval requirements and report traceability remain available through native disclosures. Repeated quotation and shipping advice points to the ordering guide and shipping checklist.
- One new AI-generated inspection concept explains a probe and supported part. It appears inside Measurement methods & setup with a visible illustration label. No generated certificates, reports, factory photographs or performance evidence.
- Asset and final prompt records: `docs/imagegen-factory-unified-20261015/`; production assets: `public/media/factory-unified-20261015/`.

## Routes

- Old `/factory/workshop/` and `/factory/quality/` pages provide local redirect compatibility, preserving query and fragment. Existing fragment aliases are resolved in the unified component, and targeted disclosures open automatically.
- Host redirect rules now point both old paths to `/factory/`; they are excluded from the sitemap. Legacy `/quality/` points to `/factory/#quality`, and the source `/custom/factory` maps directly to `/factory/`.
- Active site links were updated to the new sections. Historical visual comparison/demo pages retain their old links and use redirect compatibility.
- No production deployment or host-level redirect execution was performed.

## Validation

- Type check: 0 errors, 0 warnings, 4 existing hints in unrelated files.
- Build and local SEO checks passed. Old factory subpages are absent from the sitemap; generated redirect targets are valid.
- Static validation: section anchors, local image files and the acceptance checklist exist. No missing factory anchors were found among built internal links.
- Browser: desktop single-entry navigation; mobile menu; page anchors; keyboard disclosure; old quality and workshop deep links (including query preservation and automatic disclosure opening).
- Checked 320, 390, 768 and 1280 CSS-pixel widths with no horizontal overflow. Mobile measurement tables display as stacked labeled rows. Generated image renders with its caption.
- Layout detector returned no findings on the unified page, main navigation and footer.
- Evidence and before-copies: `D:/lzz/factory-unified-20261015/`.
