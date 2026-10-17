# Custom parts reading refinement — 2026-10-15

## Scope

Implemented the approved Custom parts review: the catalogue, all 35 part details, and shared reading structure for 8 machining studies. Preserved existing product records, URLs, material conditions, technical requirements, quotation handoff and specialist modules. Local changes only.

## Reading structure

- Part details now share a split introduction, a short lead and page navigation. Sections follow material/process/finish → geometry → casting blank where applicable → drawing/inspection → reference images → related machining → related parts → quotation.
- Batch planning and casting blank sections remain available. Supplementary drawing notes use native disclosure controls; the main drawing and inspection requirements remain visible.
- Study pages use geometry → setup → inspection → questions, with separate collection-specific material/family sections. Page navigation and heading/intro spacing are consistent.
- Mobile catalogue uses one column of image/text rows and a native shape selector. Desktop retains the browsable shape controls.

## Reference images and related reading

- Added source listing references for all 35 records, mapped directly to each catalogue record's image. Dimensions are read from local files. The contact sheet was visually reviewed and captions describe visible forms, without asserting manufacturing history or measured specifications.
- Preserved the 4 existing supplemental reference groups (6 reference photos and 1 CAD view).
- The engine/intake assembly reference and the green circular component are explicitly distinguished from the isolated manifold and rectangular-block illustrations. The stainless flanged listing reference retains lettering, arrows and loose screws absent from the main illustration.
- Added related study and capability links to all 35 details. Relations explain a shared machining/review topic; they do not claim the study depicts the catalogue part's production.
- No unverified dimensions, tolerances or performance claims were added.

## Search

- Search includes two reference galleries: covered wheels/rollers/shaped parts, and conical/cylindrical gears. Results link directly to the relevant image section.
- Counts distinguish part examples and reference galleries. Process/material/order filters apply to part examples. Choosing Reference galleries clears those filters.
- Search `covered` returns one reference gallery; `gear` with Reference galleries selected returns the gear gallery. Reset, a material filter, mobile shape selection and the no-results state were exercised.

## Validation

- `npm run check`: 0 errors, 0 warnings; 4 existing hints in unrelated files.
- `npm run build`: passed.
- `npm run test:seo`: passed, local verification only.
- Static checks: all 35 details have the intended section order, source image, study link and capability link; local image paths and linked routes exist. All 8 study page navigation targets exist.
- Browser checks: catalogue, casting details and two-setup study at 390px and 1280px; stainless/polymer details at 1280px; multi-face detail at 390px. Catalogue also checked at 320px and 768px. No horizontal overflow found.
- Source-image anchor and loaded image checked directly; additional review notes open and close using Enter. Layout detector returned no findings for the five changed components.
- Evidence and before-copies: `D:/lzz/custom-parts-reading-20261015/`. Full-page screenshots may include offscreen lazy image placeholders; `reference-desktop-reading.png` and `catalogue-mobile-reading.png` capture visible, loaded content.

## Files

Shared components: ProductsPart, ProductDetailModule, ProductsCatalogue, PartsCatalogueExplorer, ProductsStudy. Data: productsEditorial, productReadingLinks, productListingReferences. Styles: products-redesign.css.
