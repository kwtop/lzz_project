# Capabilities: consistent reading layouts

Implemented 2026-10-15 after the user approved the reading-layout review.

## Scope

The Capabilities overview and eight unique detail pages: milling, turning, five-axis, casting machining, aluminum, stainless steel, copper/brass and plastics. Plastic machining remains one URL reached from both process and material navigation. Prototype, low-volume production and starting-with-a-sample retain their existing layouts.

## Reading contract

- All eight detail pages share a left-text/right-image hero, image frame, first action, order note, open part-example rows and section-heading rhythm. Mobile order is introduction, image, then content; part examples display title, image, description and link.
- Process family: parts → machining practice → materials → drawing/inspection → FAQ → inquiry.
- Material family: parts → grades/finishes → machining practice → drawing/inspection → FAQ → inquiry. Plastics follows this family because polymer choice is central to the content; both entry points use the same page.
- Headings and introductory paragraphs sit together rather than in opposing columns.
- Material tables use three columns: material/grade, specification and finish. Existing drawing considerations remain in a keyboard-operable disclosure in the drawing/inspection section.
- Five-axis positioning comparison, copper/brass function notes, the aluminum finish illustration, workshop photos, plastic workshop video and source labels remain available in their relevant sections.
- Hero and example introductions explain part forms before asking for engineering detail. Existing grades, tolerances, lead-time conditions, material restrictions and acceptance requirements remain intact.
- Overview headings are “Machining services” and “Materials”; material labels use short material names.

## Implementation

`capabilityReading` in `src/data/capabilityDesign.ts` defines the eight-page scope and reading families. `capabilityPage` derives the shared presentation from those entries. Styles for the new reading rhythm are scoped to `.cd-reading`; overview heading changes use `.cd-overview`. Shared components preserve legacy behavior when `page.reading` is absent.

## Validation

- Astro check: 0 errors, 0 warnings, 4 existing hints.
- Build and local SEO verification passed: 170 HTML files, 88 sitemap URLs, 148 redirects.
- Eight details plus overview inspected at 1440px and 390px: no horizontal overflow, missing images or framework overlays in the captured checks. All eight desktop heroes measured 585px at 1440px.
- Milling and aluminum additionally checked at 320px, 768px and 1024px: no horizontal overflow.
- Static validation passed for module order, single H1, duplicate IDs, local anchors, image files, three material columns, retention of material notes and capability-specific inquiry URLs. Five-axis comparison, copper function notes and plastic video were checked explicitly.
- Browser interactions verified the part-example anchor, keyboard opening/closing of material notes, and milling/plastic inquiry references after hydration. No inquiry was submitted.
- Evidence and pre-edit source backup: `D:/lzz/capabilities-readability-20261015/`.

This is a local implementation; no deployment or Git push was performed.
