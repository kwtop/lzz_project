# LZZ — three visual directions, 2026-10-10

Scope: three representative homepage designs in an interactive comparison, not a selected redesign of the existing site. Each includes a first screen and representative machining, work/factory and inquiry content. The existing homepage remains available as the baseline.

Audience and task: international engineers and procurement teams evaluating a custom CNC supplier, then preparing a part inquiry. Keep machining capabilities, original factory photographs and part examples visible. Do not add unverified customer, certification, tolerance, lead-time or commercial outcome claims.

Common material: current project company facts and capabilities; original images resolved through `src/data/evidence.generated.json`; source catalog cutouts resolved through `src/data/productImages.ts`. All candidate assets are copied into this task folder. The impeller/housing/locking-pin cutouts are display treatments of source catalog imagery, not new manufacturing evidence. No AI-generated photography is used by the candidates.

Direction A: industrial poster; full-width uppercase type followed by a structured cobalt-and-photography composition. Inter Variable, matching the existing site. Concrete white, graphite, cobalt. Capability information becomes numbered rows.

Direction B: curated precision object; centered impeller framed by upper and lower titles. Inter Variable, matching the existing site. Warm paper, olive, terracotta. Further content uses editorial scale and paired process/object photographs.

Direction C: inside the machining process; full-screen original machining photograph with integrated navigation, title and process strip. Inter Variable throughout, matching the existing site. Deep teal, pale teal, copper orange. Later sections continue a process narrative.

Difference test: A/B/C use different first-screen structures and palettes while retaining the existing Inter Variable family as requested. A and C use original machining images differently; B is object-centered. Subsequent structures must also differ, rather than reuse a shared card layout.

Interaction boundary: candidate links are local section anchors; no inquiry is submitted. Comparison supports single/side-by-side views, desktop/mobile dimensions, filtering, notes and local selection. A selection in the browser does not automatically send a message to the agent or adopt a direction.

Fonts: all three candidates and the comparison shell now use the current project Inter Variable. The Latin variable WOFF2 and OFL license are copied locally from `@fontsource-variable/inter`, so no remote font request is needed. Previously explored font files remain archived but are no longer referenced by the pages.

Font decision: retain the existing Inter Variable family in every direction; adapt title sizes for its width. Palette and composition selection: pending. Review the designs, choose A/B/C, and describe any features to keep or adjust before applying to existing pages.

Comparison tooling: the installed oil-ui generator/template became unavailable during assembly (the skill directory no longer existed on the host). The task therefore uses a local static comparison shell with three live HTML candidates, plus an optional current-homepage baseline. It requires the local server; it is not a self-contained offline export.

Validation completed: A/B/C were rendered and visually inspected at 1280×900 and 390×844, including full-page screenshots. Additional 360px and 1440px checks found no horizontal overflow or heading bounds outside the viewport. B's initial stretched impeller and mobile lower-heading/CTA overlap were corrected; final 360/390/1440 checks confirm a 1:1 object ratio and a gap between the lower heading and CTA. The comparison was inspected in desktop and mobile-preview modes, and its own 390px shell has no horizontal overflow.

Controls checked through the browser: side-by-side previews, single view, next direction, desktop/mobile dimensions, 100% mode, filtering, existing-homepage reference, selection with clipboard confirmation, notes and selection persistence after reload. Test choices and notes were cleared; no direction has been chosen by the user. Existing `src/pages/index.astro`, `src/components/HomeEditorial.astro`, and `src/layouts/Layout.astro` hashes are unchanged. Candidates and comparison carry `noindex,nofollow`.

No independent aesthetic review has been commissioned in this exploration round; user selection comes first. No production build or deployment was performed: these are static local exploration pages, and visual/control checks are proportionate to this scope.

Font refinement: all directions now retain Inter Variable as requested. A mobile main/factory titles and B mobile main title are resized for the wider letterforms. Rechecked 1280px desktop, 390px mobile and 360px narrow-screen title bounds after the font change.
