# Capabilities section redesign

Scope: `/capabilities/`, the ten catalog category routes and `/capabilities/starting-with-a-sample/`. These twelve actual pages include all dynamic category paths. Related part, study, Factory, About and Resource destinations remain exits, not additional write scope. Git baseline: `refs/checkpoints/capabilities-before-20261014` (`664a687`), including tracked working state and existing capability-directory images/provenance through a temporary index. The normal index and working tree were preserved.

The user authorized autonomous implementation and image optimization with final review, retaining URL, functionality and verified business content. No per-page approval, unrelated navigation changes or production deployment.

## Direction

Keep the existing Georgia/Inter, white/charcoal/red identity and shared header, footer, breadcrumbs and email-draft flow. The implemented compositions begin with geometry on process pages, material and acceptance conditions on material pages, and approval/release decisions on project pages. They use complete parts, controlled documentary photo dimensions, open layouts and readable technical tables.

`capabilityDesign.ts` explicitly selects each detail page's hero, module order, part arrangement and material presentation. Shared components supply the content units; they do not impose one page sequence. All new CSS is scoped to `.capabilities-design`. H1 inherits Georgia and content inherits Inter from `typography-system.css`; white/gray surfaces, restrained red actions/focus, the shared `Layout`, `RfqPanel` and `inquiryHref` remain consistent with the existing system. The local variant changes content layout, type scale, spacing, media frames, technical tables and outlined browsing links. At 760px and below, technical tables become labeled rows without dropping fields and the main content compositions become one column.

## Implemented page structures

Module counts include the introduction and final inquiry. Embedded requirements or workflow content stays within its owning module.

| Page | Buyer decision | Modules | Implemented reading sequence |
| --- | --- | --- | --- |
| Overview | Which route fits the part? | 6 | Intro and family visual; process comparison; material routes; prototype/repeat planning; sample intake; RFQ |
| CNC milling | Tool access, datum scheme and setup | 7 | Split process hero; geometry and acceptance; part mosaic; real setups; materials; questions; RFQ |
| CNC turning | Concentric interfaces and secondary features | 7 | Wide turned-feature hero; part-family rows; diameter/thread acceptance; materials; workshop sequence; questions; RFQ |
| 5-axis | Indexed access or continuous contour? | 7 | Curved-form hero; route comparison and requirements; part mosaic; rotary setup photo essay; material options; questions; RFQ |
| Castings | What comes from the blank and what is machined? | 6 | Blank/finished comparison; blank specification; housing gallery; machining/acceptance workflow; questions; RFQ |
| Aluminum | Alloy/temper, thin sections and treatment | 6 | Part hero; alloy and finishing decisions; housing/interface mosaic; process and acceptance; questions; RFQ |
| Stainless steel | Grade/condition and working fits | 6 | Shaft hero; grade comparison; family rows; datum/treatment/inspection plan with embedded workflow; questions; RFQ |
| Copper & brass | Contact, thermal or sealing function | 7 | Centered fitting hero; functional requirements; exact alloy table; original workshop forms; final interfaces; questions; RFQ |
| Plastics | Grade, exposure and measurement condition | 6 | Support concept hero; polymer options; part/source/video collection; fitted-feature requirements; questions; RFQ |
| Prototypes | What decision must the first part answer? | 6 | Drawing brief; evaluation, approval and drawing/measurement plan; prototype example mosaic; material choices; questions; RFQ |
| Small batches | How is every release controlled? | 7 | Part-family hero; release/traceability requirements; first-article and packing workflow; part-family rows; materials by part number; questions; RFQ |
| Existing sample | How does the sample become an approved specification? | 7 | Sample/drawing concept; sample condition and intended interfaces; reconstruction sequence; material/finish decisions; document and first-part approval; questions; RFQ |

## Evidence and images

Use `capabilityContent.ts`, `capabilityOverview.ts`, `serviceReading.ts`, turning content, material-grade records, the inquiry contract and `docs/claim-ledger-2026-09-25.md` as the factual base. Preserve selected-feature qualification for ±0.01 mm, review of equipment envelopes rather than invented maxima, alloy designation differences, polymer conditioning, separate functional tests, revision approval, sampling and traceability. Orders start at one piece; 7–14 business days follows drawing/order confirmation and includes finishing; shipping is additional. Sample reconstruction/approval timing is separate.

Preserve original workshop and CMM photographs, source part references, the PEEK clip, original anchors and inquiry contexts. The five existing generated directory illustrations are reused with their visible origin labels; prompts remain in `docs/imagegen-capability-directory-20261014/prompts.json`. Four new built-in ImageGen concepts cover the capability part family, aluminum finish/masking comparison, polymer support and sample-to-drawing definition. Their sixteen responsive WebP files are in `public/media/capabilities-section-20261014/`; originals are retained in `D:/lzz/capabilities-section-redesign-20261014/`, with full prompts and proof scope in `docs/imagegen-capabilities-section-20261014/provenance.json`. All generated or retouched visuals retain visible origin labels. Workshop/CMM photographs establish their visible context; they do not establish measured acceptance or calibration. Generated visuals do not establish customer delivery, equipment, certification or inspection results.

## Verification

The recorded final evidence covers all twelve actual routes:

- `D:/lzz/capabilities-section-redesign-20261014/after/final-render-checks.json`: 24 desktop/mobile captures at 1440px and 390px, with no unloaded images, horizontal overflow or overlay.
- `D:/lzz/capabilities-section-redesign-20261014/after/responsive-checks.json`: 84 checks at 320, 390, 760, 969, 1100, 1440 and 1600px, with no recorded layout or media failures.
- `D:/lzz/capabilities-section-redesign-20261014/static-validation.json`: twelve routes, one H1 per page, retained source photos/video, old anchors and key links, valid assets, no duplicate IDs and Service markup on all eleven detail pages; zero failures.
- `D:/lzz/capabilities-section-redesign-20261014/after/interaction-checks.json`: overview to milling, its requirements anchor and a part detail; all eleven detail-page RFQ links select the matching service in the inquiry form.

Final interaction checks also confirm that the retained PEEK clip plays to completion, the desktop submenu opens and closes with Escape, and the mobile submenu reaches the prototype page and closes after navigation. Both independent screenshot reviews returned `ship`. The prototype-specific heading was corrected to “Revision & design changes”; its original anchor remains, and the revised page was confirmed at 1440px and 390px.

The final build, SEO and static checks pass. The full Astro check reports zero errors and warnings, with four existing hints. Consolidated evidence: `D:/lzz/capabilities-section-redesign-20261014/verification.json`.

This is an ordinary extension of the incumbent visual system. The root `DESIGN.md` receives only a scoped Capabilities record; its global tokens and historical sections are preserved. No design-system regeneration or `.impeccable/design.json` change is needed for these page compositions. Local preview only; no deployment.
