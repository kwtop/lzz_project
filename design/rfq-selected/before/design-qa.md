# Factory tour — selected direction 1

final result: passed

## Evidence
- Visual target: D:/lzz/design-explorations/factory/selected-v1.png (726 × 2167).
- Desktop: D:/lzz/design-explorations/factory/desktop-final.jpg (1425 × 4772 content pixels; CSS viewport 1440 × 1000, 15px scrollbar, DPR 1).
- Full comparison: D:/lzz/design-explorations/factory/comparison-final.png. Each image normalized independently to 600px width with preserved aspect ratio; no vertical stretching.
- Focused hero comparison: D:/lzz/design-explorations/factory/hero-comparison.png. Both crops viewed together.
- Responsive evidence: mobile-final.jpg (390px viewport) and tablet.jpg (768px viewport), in the same exploration directory.
- State: factory page, closed navigation, all content and archive photographs visible.

## Findings and comparison history
Initial comparison: P2 legacy typography cascade overrode heading weight to 550. P2 legacy workshop image rules shrank photos and introduced unwanted inner whitespace. Fixed with page-specific selectors, 650 heading weight and explicit photo dimensions/cropping. Final comparison confirms both fixed. Closing tint was also aligned to the selected concept.
No remaining actionable P0/P1/P2 findings.

## Fidelity surfaces
- Typography: existing local Inter Variable, 650 display weight, readable body and responsive wrapping. Hierarchy follows the selected visual.
- Layout: wide image hero, unified fact row, asymmetric equipment block, paired workshop photographs, inspection feature, four-column process and closing CTA. Mobile stacks naturally; tablet process uses two columns. No horizontal overflow at 390/768.
- Colors: charcoal text, white and pale-gray surfaces, restrained existing red actions. Closing pale blue tint restored.
- Images: original evidence assets replace Image Gen reinterpretations. CMM detail and historical packing photographs are intentionally different from generated mock imagery. No generated image is represented as factory evidence; dates and captions remain.
- Copy: eight process steps and four deliverable scopes preserved, including conditional documentation, capacity qualification and quotation-based timing/responsibilities.

## Accepted constraints
Shared navigation/footer retained. Full footer is taller than the abbreviated generated mock. Secondary links use visible outlined action boundaries consistent with the working site. Original photographs and extra provenance captions intentionally differ from the generated reference. Workflow uses original factory/machining/CMM/packing photos, not the imagined review and inspection scenes.

## Verification
- npm run build: passed, 82 pages.
- npm run check: 189 files, zero errors, warnings or hints.
- 71 factory-page local link/image/fragment targets checked, zero broken.
- Mobile navigation open/close passed.
- Equipment link sets correct hash; target exists.
- Prepare RFQ email clicked in a dedicated browser tab: /quote/ and Tell us about your part confirmed. Existing draft flow retained; no email sent.
- Browser error logs: empty.

## Follow-up polish
No required follow-up. Original source photographs have varying sharpness; this is an existing asset limitation.
