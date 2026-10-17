# LZZ Precision — design and content contract

## Active three-template layout and actions — 2026-10-01

- Current layout rules live in `src/styles/page-system.css`, loaded after the existing typography layer. `src/data/pageTemplates.ts` classifies all 81 sitemap content routes by visitor task: 54 decision, 26 read, 1 operate. Historical entries below are dated records; this entry governs the current shared layout and button metrics.
- Common content width is 1140px, with minimum outer gutters of 48 / 32 / 20px. Decision pages keep their evidence-led compositions; reading pages use shorter openings, chapter spacing, related exits and native contents disclosures where appropriate; Quote keeps inputs and support separate.
- Body primary actions use #CB1217, 15px / 600 type, 2px radius, 48px minimum height and 12px 20px padding. Header quote uses a 44px compact variant. Secondary standalone exits have a contained border; inline references, navigation, cards and task controls retain their roles. Wrapped labels may increase height.
- `ReadingHeader.astro` and `PageContents.astro` unify detail-page openings and contents. Contents open initially above 760px and close initially at or below it, remaining keyboard-operable. Reading H2 is capped at 32px. RFQ preparation and Shipping topics precede supporting images/explanation; How We Work uses a short opening and six-step directory. Existing article copy and media remain.
- Built and checked locally. All 81 routes were measured at 1440, 768 and 390px, plus six 320px checks, with no horizontal overflow. Existing SEO metadata, anchors, href destinations, images and source labels passed preservation checks. Form validation, unsent draft generation, edit/clear and contents interaction passed. Check has 0 errors / 0 warnings and one pre-existing unused-import hint.
- Full implementation, screenshots, hashes and pre-edit backups: `docs/template-unification-2026-10-01/IMPLEMENTATION.md`. Local preview remains on port 4323. No deployment or external sending occurred.

## Public image-label cleanup — 2026-09-17

- Explicit user instruction supersedes earlier visible-generation-caption requirements: remove AI-generated/enhanced, fictional, illustrative and process-illustration labels from public image captions and alt text. Alt text describes the visible subject without adding claims of original photography, named employees or delivered parts.
- Keep original assets and internal generation/provenance records. Preserve documentary wording, including AI precision manufacturing on the teaching plaque, and truthful inquiry functionality and certificate-scope explanations.
- Home hero now has a 100svh minimum height (100vh fallback), with natural expansion on short screens. Desktop 1440x900 and mobile 390x844 render at exactly the viewport height without text/baseline overlap.

## Site-wide follow-through — 2026-09-16

- Impeccable polish preserves the current visual system. Capability filters say All capabilities, separate from the selected/all collection control. Choosing a capability or clearing that filter searches the complete catalog. Scoped capability pages expose search and a full-catalog link, without redundant category controls; resetting a scoped search preserves its scope.
- Product and capability pages share one contextual closing CTA, retaining the product/category query parameter. Redundant lower-page inquiry buttons are removed; the first-screen inquiry action remains.
- Mobile footer navigation uses two columns with 44px link targets. Factory equipment uses compact image-led rows with every AI caption retained. Quality stages have shorter copy; all inspection-record requirements remain in keyboard-operable native disclosures. Certification limitations remain visible.
- Captions and image provenance labels use 13px type with stronger contrast. Original product photographs, catalog data and galleries are untouched; the need for consistent real photography is not resolved by this layout pass.
- Check reports zero errors/warnings/hints; build produces 60 HTML pages; SEO verifies 59 sitemap URLs and 86 redirects. Site/refinement tests pass all 59 mobile/tablet routes, scoped resets, selected/all filtering, contextual CTA, record disclosures, gallery and draft behavior. Catalog SHA-256 remains unchanged. Viewed representative desktop/mobile renders and checked 768px layouts. At 390px factory height is 7,296px (previous 8,178); quality 5,631px (previous 6,234). These are page-length measurements, not performance claims. Local preview only; no Cloudflare release in this pass.

## Five-item follow-through — 2026-09-16

- Catalog defaults to six selected original single-product photographs. View all exposes all 35; text and capability filters always search the full input catalog. Category pages retain their original scoped input. A no-JavaScript disclosure contains links to every product. No products, source assets, URLs or gallery originals are removed.
- Image Gen cover trials reconstructed fine geometry and were rejected for product evidence; see design/product-cover-trial-v1.md. Better source photography is still needed for a genuinely uniform full catalog.
- Factory's four equipment illustrations now share visible captions and aligned figure markup; its AI-enhanced workshop introduction is also labeled. This current instruction supersedes the historical no-public-caption preference recorded in design/equipment-visuals-v1.md. Original workshop photographs remain separate.
- Quality's company recognition and ISO9001 copy share one compact section with three native disclosures. Certification limitations remain visible when closed. Existing #quality-management links remain valid.
- Desktop inquiry uses a full-width introduction, a content-height preparation sidebar and the existing form. Mobile DOM/field order and draft-only behavior are unchanged.
- Impeccable polish guided the layout. Check/build/SEO pass; mobile and tablet suites each cover 59 routes. Verified selected/all transitions, full-catalog search, no-JavaScript 35-link fallback, keyboard qualification disclosures, image labels and unchanged catalog hash. Viewed desktop/mobile screenshots of changed surfaces. No deployment.

## Focused visual refinement — 2026-09-16

- Home uses its two-path preparation section as the only closing CTA; the generic layout closing is disabled on home only. Mobile gives the original impeller image a larger lead card, with the other two parts remaining compact.
- Catalog cover frames use consistent larger insets; no source photograph or geometry is edited. Existing single-source photographs, collages and workshop backgrounds remain a photography-quality limitation. Quick machining filters share state with the full category selector; mobile uses short labels in a keyboard-accessible horizontally scrolling row, preserving the first part in the first viewport.
- Quality introduces inspection priorities beside the existing, visibly labeled AI illustration; it is not presented as real inspection equipment. Four production stages, native equipment disclosures and the detailed record requirements retain the factual limitations and certification qualifications. No new real inspection photographs were available.
- Desktop inquiry uses a narrower light-gray support column and a wider form. Mobile field order and draft-only behavior are unchanged.
- Impeccable polish informed the hierarchy and bounded visual review. Check/build/SEO pass; site tests cover 59 mobile routes and refinement tests cover 59 tablet routes plus draft/gallery behavior. Manually checked 1440/768/390 layouts and keyboard quick filters/disclosures. A first-round mobile filter wrapping regression was fixed and the first-screen regression passes. Catalog hash remains unchanged. No deployment.

## Active visual polish — 2026-09-16

This pass preserves the reference-led visual world below. Impeccable's bounded polish review informed hierarchy, progressive disclosure and content grouping; no new imagery, framework, remote release or inquiry backend.

- Marketing headings stay distinct from article headings (32px desktop / 26px mobile), article navigation (18px) and inquiry support titles (22px). Article contents uses a native keyboard-operable disclosure, open on desktop and initially closed on mobile.
- Product detail DOM is heading, original-image gallery, summary/actions. Desktop retains image-left / information-right; mobile shows the actual part before asking for an inquiry. The Astro island wrapper owns the gallery grid area. Original catalog files and gallery images are unchanged.
- Home no longer repeats company statistics and logos, which remain on factory/about pages. Mobile selected parts become compact image-led rows; the decorative project-start image is desktop-only. About removes the redundant three-item service recap; industry details and document issuer/date descriptions use native disclosures, with document scope always visible.
- Four-result and two-result catalogs use two columns on desktop; mobile remains a single list. Source image presentation uses neutral backgrounds and consistent inset spacing without editing originals. Resource-card actions align at the bottom.
- At 390px, initial page heights changed: home 9163 → 6848px (-25%), about 10381 → 7612px (-27%), factory 10165 → 8044px (-21%). These are layout measurements, not speed or conversion claims.
- Build/check/SEO and the existing 59-route mobile/tablet tests pass. New checks cover mobile image-before-action ordering, keyboard article disclosure, application links and document expansion. Visually inspected 1440/768/390 layouts. The detector's existing `border-accent-on-rounded` warning concerns the draft-result top border; that element has no own rounded-card styling, so it is not treated as a confirmed defect.


## Active reference-led redesign — 2026-09-16

The current user instruction supersedes the previous homepage-preservation constraint. Reference: `D:/lzz/DESIGN.md`, extracted from SendCutSend. Existing data, real catalog imagery, routes and draft-only inquiry behavior remain unchanged.

- Shared presentation: `src/styles/brand-system.css`, imported after the legacy structural styles. Inter Tight throughout, 1140px content width, #CB1217 primary action, white/light-gray page introductions, stronger 700/800 headings and 8–24px role-specific radii. Preserve existing task-specific mobile layouts and 44px controls.
- Homepage: `src/styles/home-current.css` replaces the old homepage stylesheet import; the prior file is retained as a rollback reference. 72px desktop / 39px mobile hero, 45px section headings, real-part catalog cards, light machining section, black selected material tabs, clearer manufacturing sequence and two project-preparation paths.
- Keep the existing hero and real product photographs; generated images are not substitutes for customer-part evidence. New conceptual aluminum detail: `public/media/project-detail-v4.webp`; exact built-in Image Gen prompt in `design/reference-redesign-assets.md`.
- No new manufacturing claims, online pricing, upload backend, sending, deployment or DNS changes. The two start options lead to the existing email-draft form and RFQ checklist.
- Test fixtures now supply the existing required phone/destination fields and assert the current unavailable-storage message. These changes repair stale test expectations without changing form behavior.

Validation: `check` reports 0 errors/warnings/hints; 60 static pages build; SEO verifies 59 sitemap URLs and 86 redirects. `test:site` passes all 59 normal routes at 390px and core interactions; `test:refinement` passes all 59 at 1024px, image-dialog keyboard/focus handling, draft persistence/isolation/fallbacks and download. Original catalog hash remains unchanged. Desktop 1440px, tablet 768px and mobile 390px screenshots inspected, including the new asset in the rendered preparation section. The mobile inquiry's first input is 342px wide and fully visible in the first viewport. Browser plugin not available; used the existing Playwright tests with installed Chrome. Local static preview: `http://127.0.0.1:4323/`. No remote deployment performed.


## Task-first inner-page polish — 2026-09-09

This pass refines inner-page hierarchy without new imagery or changes to the approved homepage. `src/styles/inner-refined.css` is scoped to the `task-pages` body class; home, about, journal and privacy remain outside it. Homepage markup, homepage-specific styles and the raw catalog are unchanged.

- Mobile catalog/category introductions are compact; decorative hero imagery is omitted on small screens so visitors reach filters and real parts sooner. Product cards use single-column image/text rows with 20px titles and 14px summaries. Original photos remain contained, never fabricated or structurally edited.
- Detail DOM starts with title, purpose and discussion action, followed by the original-image gallery. Desktop grid retains the original image-left/text-right composition; mobile follows task order.
- `src/data/capabilityGroups.ts` groups unchanged source keys into machining processes, materials and production stages. Both the overview navigation and native filter optgroups use the same groups; all category URLs remain intact.
- The existing workshop photograph now appears in the factory introduction at no more than its native 447px width. Its old repeated row is removed; the other two original scenes and document descriptions remain.
- Inquiry steps use `Review & send`; essential instructions are 14px. Part and requirement guidance is grouped beside the description field. Session saving and manual-email behavior are unchanged.

Verification: type check (30 files) has zero errors, warnings and hints; 56 HTML pages built. `test:site` passes static links/assets and all 55 normal routes at 390px. `test:refinement` passes the existing draft/lightbox checks and all 55 tablet routes, plus new mobile assertions for a first-screen product card, a first-screen discussion action, 14px card summaries and three filter groups. The first inquiry input remains fully visible at y=525.17px in 390×844. A single batched screenshot review covered 1440/1024/390 layouts; no further blocking visual issue was found. Detector returned zero findings. The long-running Astro preview required a project-only restart after an SSR module-load failure; the fresh preview passed the checks at the same 4321 URL. Temporary QA captures are removed after review.

## Active refinement — 2026-09-09

This section supersedes conflicting historical details below. Preserve the approved homepage hero, asymmetric parts and machining section; refine the remaining site using Image Gen assets and Impeccable's bounded polish review.

- Four new neutral-light illustrations: stainless steel, brass/copper, engineering plastic and machining features. WebP assets and exact prompts are recorded in `design/material-assets-v3.md`. Visible figure captions distinguish AI illustrations from delivered parts. Existing homepage hero and aluminum macro are unchanged.
- All 35 products have source-grounded editorial summaries in `src/data/productSummaries.ts`: purpose, materials, features, machining and inspection, plus a short card line. Listed material options are not represented as specifications measured from the photographed part. Missing requirements are explicitly drawing-dependent. Original technical HTML remains in the catalog/archive, not as unqualified marketing promises on detail pages.
- Search indexes presentation titles, original names, categories and summaries, with whitespace/case normalization. Original product photos have consistent containment and a native dialog enlargement with keyboard/Escape handling and return focus; single-image products have no invented extra views.
- Inquiry DOM order puts the form immediately after the short introduction on mobile; name/email are full-width. Session storage is keyed by part context, restores fields and valid prepared drafts, and supports clear, corruption and unavailable-storage fallbacks. The three-step email flow, manual attachments/sending and copy/download alternatives are explicit. Privacy copy reflects actual tab-session behavior.
- Independent menu/search/clear/copy/download controls meet the 44px target. Material tabs have a mobile swipe hint and keep the active tab visible.
- Workshop photos are described by their visible scenes, not used as evidence of specific inspection equipment. Three original documents have English names, type, visible issuer/date information and qualified scope. Teaching collaboration and enterprise recognition are not ISO or product-conformity certificates.
- No raw-archive/catalog changes, new backend, deployment or real email sends. Real high-resolution photography and manufacturing outcome records remain a source gap.

Validation: type check 0 errors/warnings/hints; build 56 HTML files; existing site checks cover static links/assets/H1, 55 routes at 390px and the main interactions. `npm run test:refinement` covers title search, keyboard lightbox/focus, refresh restoration, part isolation, clearing, corrupt/blocked storage, clipboard fallback and text download, newline-safe mail body, 44px controls and selected-tab visibility. All 55 normal routes pass 1024px overflow/H1 checks. At 390×844 the first inquiry field starts at y=495.97px, is 346px wide and fully visible. The raw catalog SHA-256 remains `eb9b272d9fd4e9c9bf9eda78012d2dd37ab22337301a88d2e7b19f2505f48cff`.

One concentrated actual-screenshot review covers home, catalog, product, factory, capabilities and inquiry at representative 1440/1024/390px widths. Product summaries, document captions and the mobile form are readable with no blocking visual issue found. Existing low-resolution originals are deliberately not enlarged into false detail. Temporary QA captures are disposable and reproducible through the test scripts.

## Active whole-site direction — 2026-09-08

The user approved the refined homepage and requested the same style across the entire site. This section supersedes the earlier homepage-only scope and first-direction visual requirements below; those sections remain historical records.

- Preserve the approved immersive homepage hero, asymmetric selected parts and dark machining section. Extend charcoal headers, restrained Inter Tight headings, generous editorial spacing and red primary actions to every route.
- Shared system: `src/styles/global.css`; homepage composition: `src/styles/home-refined.css`. Body 16px, supporting text 15–18px, headings generally 43–90px; heading weight 620–650. Charcoal #171b1e, white, neutral #f1f2f3 and red #e5232e. Desktop gutters 56px, mobile 22px, maximum container 1328px.
- Shared `PageHero`, `ProductCard`, `FactoryStory` and layout components keep visual consistency. Closing and footer are charcoal, not a red banner. Product detail and technical content remain light for readability.
- Products use concise presentation titles from `src/data/presentation.ts`; original catalog names, URLs, photographs and technical content are retained, with full names visible in the detail information panel. Search still includes original names.
- Capability pages use horizontal editorial process sections and open category rows. About and factory pages keep original photography; 447px factory originals are capped at native display width rather than enlarged into blurry full-width panels.
- Articles have a dark title region, readable body and heading-derived navigation when available. The inquiry page separates dark project context from a white working form. Its mail-draft-only behavior is unchanged.
- No additional generated assets this pass. Original archive and catalog data are unchanged. No deployment, uploads or real email sends.

Verification: `npm run check` passed with 0 errors, 0 warnings and 0 hints; `npm run build` produced 56 files; `npm run test:site` passed all 55 normal routes at 390px plus material tabs, search/reset, category filtering, product-to-inquiry prefill, required fields, draft generation and mobile menu. An additional 1024px check found no horizontal overflow on all 55 routes. Desktop 1440×1000 and mobile 390×844 screenshots were captured across nine inner-page examples plus the homepage; representative actual screenshots were visually inspected. No browser errors or missing loaded images in the checks. Impeccable's bounded review informed the shared typography, spacing and native-resolution image treatment; its source detector returned no findings. Temporary QA screenshots were removed after review and can be regenerated.

## Active homepage refinement — 2026-09-08, second direction

This section supersedes the original concept **for the first three homepage regions only**. User approved the critique's recommendation to rebuild the hero, selected parts and capabilities first. Other pages, materials, factory, footer and quote behavior are unchanged.

- Immersive dark hero with overlaid navigation, centered 96px/650-weight heading, 18px supporting text and one principal action. 960px maximum desktop height; responsive full composition on mobile. Removed the detached white header and three-number proof band from this page only.
- Real product selection: large impeller view, precision milled ring, billet engine-cover prototype. Original images and source-linked product routes; descriptive names are editorial labels, not new specifications. One larger composition plus two supporting rows replaces uniform tiles.
- Capabilities: dark editorial split, one large process photograph, three direct service links with descriptions. All links retain the original destinations.
- New CSS isolated in `src/styles/home-refined.css`; immersive layout opt-in only on homepage. Larger homepage navigation/control copy and restrained typography. One entrance animation, reduced-motion support.
- New built-in Image Gen asset: `public/media/machining-hero-v2.webp`. Prompt: cinematic CNC spindle at far right machining aluminum across bottom third; deep charcoal empty center/top, low camera, tactile milled channels, realistic chips and restrained silver light; no text/logos/people/sparks/blue lighting; 16:9 illustrative scene, not an actual factory claim. Original PNG retained by the generation tool; old asset preserved in project for reversibility.
- Visual review: direct desktop 1440×1000 and mobile 390×844 screenshots inspected. Neither viewport has horizontal overflow. The real factory image and lower homepage sections remain deliberately outside this refinement scope. Functional verification recorded in handoff.

The original first-direction specification and QA record below remain historical context, not a requirement to restore the rejected homepage composition.

Astro static routes + React interactive islands. English B2B site; content source: `D:/lzz/raw/_content` (2026-09-08 archive). Visual reference: https://sendcutsend.com/ ; an original LZZ design, not a copy of its logo, claims, prices or business model.

## Selected visual direction

Concept: `design/home-concept.png`. Bold industrial editorial design. White header, charcoal image-led hero, red rectangular CTA, three factual proof columns, white open capabilities columns, neutral-gray material tabs, black factory editorial, red closing CTA, dark footer. Background #fff; dark #171819; accent #e5232e; light surface #f1f2f3; gray text #64676b; borders #ddd. Inter Tight variable for headings; Inter variable for body. Heading 88/1 desktop, 52/1 mobile. 56px desktop gutters, 22px mobile. Max content 1328px. Radius 2px for buttons, no nested card wrappers. Lucide 20px 1.8-stroke arrows. Focus outlines visible; reduced-motion honored.

Hero allowed copy: LZZ / Precision CNC machining; Capabilities; Our work; About LZZ; Insights; Get a quote; Your design. Made precise.; Custom CNC machining. From the first prototype to your next production run.; Start your project; Explore capabilities. Generated mockup's decorative microcopy is deliberately excluded. Hero no tint: use original black negative space. Native concept 972×1619 (full-page overview); implementation extends vertical spacing to preserve readable real content. Core section structure retained. Product filters, source specification tables, article pages and RFQ form are required functional extensions to the overview.

## Assets and provenance

Built-in Image Gen used for the concept and `/media/precision-hero.webp`. Prompt: premium industrial hero photograph, machined aluminum housing, steel flange and aluminum block on dark workshop table; right-side composition, left negative space, charcoal/silver, physically plausible machining marks, no text, no people or location. This is illustrative, not evidence of delivered parts. Full source prompt is captured by the generation conversation. Original product and factory photography stays separate; generated imagery never replaces product-specification evidence. Imported assets are locally optimized WebP copies; raw archive is unmodified.

## Content and operational boundaries

35 distinct products, numeric aliases deduplicated by original product name; all source URLs retained in catalog. Original technical HTML preserved after sanitization (styles and unsafe elements removed). Source claims in full product descriptions are manufacturer statements; the 2017 founding date is the company baseline, not a 15-year company-history claim. No fabricated clients, certifications, delivery guarantees, prices or cases. Original certificate images can be viewed but are not independently validated. RFQ creates a mail draft only; no backend, upload, transmission, analytics or deployment. Attach drawings manually in the email app. Deployment hostname/canonical awaits user selection; no invented production domain.

## Final visual and functional review — 2026-09-08

Browser connector timed out; used Playwright with installed Chrome. Viewed the generated concept and actual full-page browser screenshots directly. Desktop 1440×1000, mobile 390×844, additional concept-native-width capture 972×1619. Full-page implementation is intentionally taller than the concept overview for readable text and complete footer/contact links.

| Comparison | Evidence and resolution |
| --- | --- |
| Header / copy | LZZ, four nav items, Get a quote, hero headline, supporting copy and both actions match the copy contract. Mockup-only filler omitted intentionally. |
| Typography | Inter Tight heavy, tightly tracked large headings; Inter controls/body. Desktop hero 96px, mobile fluid 48–76px. No clipping found. |
| Palette | Pure white header and capability band, #171819 hero/factory, #e5232e action band, cool neutral material background. No cream or blue substitutions. |
| Composition | Dark left text area, right metal hero subjects; proof strip, open three-column process section, material tabs, factory split and red closing band remain in concept order. |
| Assets | Separate matching Image Gen assets; aluminum material image improved to a full-frame macro. Real factory photograph replaces conceptual person/photo to preserve truth. No hero color overlay. Mobile edge fade supports stacked composition. |
| Components / icons | Rectangular CTA, restrained Lucide line arrows, minimal borders, no extra nested cards. Functional product filter and quote form extend same tokens. |
| Responsive | All 55 normal routes tested at 390px: no horizontal overflow or broken loaded images. Mobile menu and Escape behavior verified. |

Above-fold copy diff: matches intentional copy list. Concept's decorative microcopy removed as documented. Intentional deviations: original LZZ wordmark with red dot; truthful original factory photo rather than generated people; complete footer; source-based product/catalog pages and RFQ. Visual implementation verified against selected direction with these documented deviations; no unresolved clipping or functional defects found in checked states.

Build: 56 static files. Type check: 0 errors, 0 warnings, one React FormEvent deprecation hint. Dependency audit: 0 vulnerabilities. Static local links/assets and exactly one H1 per file pass. Browser: material tabs, search, empty/reset, category filter, product-to-RFQ prefill, required field validation, mailto draft generation and mobile navigation pass. No email sent. Temporary screenshots remain in the system temporary directory because the environment rejected the cleanup command; the source-reference screenshot remains at `D:/lzz/sendcutsend-reference.png`. They are not used by the website. Test script can regenerate screenshots.

Five generated web assets live under `public/media/`: precision-hero, cnc-milling, cnc-turning, cnc-five-axis, aluminum-detail (WebP). The aluminum macro prompt requests an edge-to-edge close-up of a silver CNC housing with circular bore, ribs and threaded holes; detailed tool marks and neutral side light, no text or logos. Concept retained under `design/` for ongoing design work.
