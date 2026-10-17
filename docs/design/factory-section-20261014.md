# Factory section implementation record — 2026-10-14

## Overview

The Factory section has been rebuilt within the existing LZZ visual system. The implemented scope is `/factory/`, `/factory/workshop/` and `/factory/quality/`: three substantive pages, with no dynamic Factory detail routes. The overview provides a quick supplier introduction; Workshop and Quality support closer reading. Their layouts differ while retaining the existing white, gray and red palette, Georgia page titles and Inter text.

The user authorized direct implementation, content restructuring, selective image generation and independent review without page-by-page approval. The work retains Astro, the public URLs, valid content and data, shared navigation, breadcrumbs, footer and RFQ components. Links to Capabilities, About and Resources remain useful exits. Parallel changes in those sections are outside this Factory record. The global `DESIGN.md` and `.impeccable` configuration were not part of the work. No deployment was performed.

The starting checkpoint is `refs/checkpoints/factory-before-20261014` (`7e78379f06e2b3ea2b2b8567d15ae91529d554af`). It preserves the tracked working tree before this refactor, including pre-existing work.

Public claims follow the [claim ledger](../claim-ledger-2026-09-25.md): established in 2017; 1,500 m² workshop; 40+ machining **and supporting** units; engineering team experience of 15+ years; about 100,000 small parts/month as a qualified reference capacity. Orders start at one piece. Production is 7–14 business days after drawing and order confirmation, including finishing; shipping is additional. `ISO 9001 certified` is authorized, while certificate identifiers, version, validity and scope remain documents to request. Equipment photographs establish the visible setting; current calibration, measured results and order-specific capability require separate evidence.

## Colors

The source of the local values is [factory-design.css](../../src/styles/factory-design.css). They are scoped to `.factory-design` and do not redefine the site's brand tokens.

| Local token | Implemented value | Use |
| --- | --- | --- |
| `--fd-ink` | `#202427` | Reading text and secondary actions |
| `--fd-muted` | `#5a6268` | Supporting copy |
| `--fd-line` | `#dde1e3` | Section, list and table rules |
| `--fd-soft` | `#f4f5f4` | Supplier facts and table headers |

White remains the page and image ground. Focus uses inherited `--red` with `#cf141a` as its fallback; the shared RFQ retains the site's red primary action.

## Typography

Font families remain inherited from the current site: Georgia for `h1`; Inter Variable for section headings, copy, data and controls. Factory's local metrics are:

| Role | Above 760px | At or below 760px |
| --- | --- | --- |
| `h1` | `clamp(42px, 4.5vw, 66px)`, line-height `1.08`, tracking `-.025em` | `41px`, line-height `1.12` |
| `h2` | `clamp(28px, 2.5vw, 36px)`, line-height `1.18`, weight `550` | `28px`, line-height `1.2` |
| `h3` | `22px`, line-height `1.3`, weight `550` | `21px` |
| Body copy | `16px`, line-height `1.7`, maximum `67ch` | Same |
| `.fd-lead` | `21px`, line-height `1.5`, maximum `35ch` | `19px`, line-height `1.55` |
| Figure caption | `13px`, line-height `1.55` | Same |

Workflow, questions and RFQ details use smaller local heading variants defined in the stylesheet. Functional stage numbers remain in the two ordered processes; they are not section decoration.

## Layout

`.fd-wrap` has a maximum width of `1280px`. Its total width deduction is `88px` on desktop, `64px` at 761–1100px and `44px` at 760px or below. The local section-padding token `--fd-space` is `84px`, `64px` and `46px` respectively. Hero sections use their own shorter spacing.

| Page | Implemented modules | Distinct composition |
| --- | --- | --- |
| [Overview component](../../src/components/FactoryOverviewPage.astro) | 5: workshop hero; Workshop/Quality reading routes; supplier facts; drawing and acceptance inputs; RFQ | Wide opening scene, unequal reading-route columns, compact facts panel |
| [Workshop component](../../src/components/FactoryWorkshopPage.astro) | 7: floor introduction and identity; photo essay and qualified capacity; equipment rows; inspection bridge; drawing-to-shipment process and packing; six purchasing answers; drawing package and RFQ | Split opening, large/small documentary images, three open machine rows, four-stage process |
| [Quality component](../../src/components/FactoryQualityPage.astro) | 6: inspection introduction; feature/method table; four inspection stages; order-record matrix and document actions; supplier qualification; acceptance inputs and RFQ | Compact CMM hero image, technical tables and an ordered inspection flow |

At 761–1100px, the four-stage processes use two columns and the Workshop inspection bridge becomes a single main column. At 760px or below, main compositions and processes become one column. Quality tables become stacked records with visible `data-label` field names; their table headers remain available in the markup. At 380px or below, narrow photo/description pairs and workflow input/output pairs also stack. Anchor targets use `scroll-margin-top:128px`.

## Elevation & Depth

The section is flat: whitespace, thin rules, image scale and the pale facts/table surfaces establish hierarchy. Factory images and local secondary actions have no shadows. Photography supplies the physical depth.

## Shapes

Image frames and local secondary actions have square corners. `.fd-link` has a one-pixel border and a minimum height of `44px`; it wraps long labels. Fine-pointer hover changes it to charcoal with white text, and keyboard focus has a red outline. Its color transitions last `180ms`. The local reduced-motion rule removes transitions and animations and restores automatic scrolling.

## Components

| Component or selector | Implemented responsibility |
| --- | --- |
| `.factory-design`, `.fd-overview`, `.fd-workshop`, `.fd-quality` | Factory-only style boundary and page identities |
| `.fd-route-grid`, `.fd-supplier-review`, `.fd-review-package` | Overview reading routes and review inputs |
| `.fd-floor-essay`, `.fd-machine`, `.fd-equipment-review`, `.fd-dispatch` | Workshop photo hierarchy, equipment suitability and dispatch context |
| `.fd-method-intro`, `.fd-table`, `.fd-inspection-flow`, `.fd-qualification` | Quality methods, records, checks and qualification |
| [FactoryPhoto](../../src/components/FactoryPhoto.astro), `.fd-photo`, `[data-photo-id]` | Existing `EvidenceImage` records, caption and source-derived `--fd-source-ratio` |
| [FactoryIllustration](../../src/components/FactoryIllustration.astro), `.fd-illustration`, `[data-image-origin="AI-generated"]` | Responsive illustrative assets with visible AI-origin captions |
| [factoryEditorial.ts](../../src/data/factoryEditorial.ts) | Machine rows, purchasing answers, process stages, record rows, document requests and page-specific RFQ topics |
| [factory.astro](../../src/pages/factory.astro) | Overview route and retained legacy-fragment mapping |

`FactoryPhoto` uses complete-image sizing by default. The overview panorama is the explicit exception: above 760px it uses a `470px`-high `cover` container positioned at `center 53%`; on mobile it returns to its full source ratio. Machine figures use `--fd-machine-height:230px`, increasing to `240px` on mobile, with contained source images.

The original workshop, operators, aisle, three machining setups, two CMM views and historical packing photographs remain represented. Captions identify the source setting or archive date. One new generic measurement-support/probe concept is used on Quality. Its [provenance record](../imagegen-factory-section-20261014/provenance.json) preserves the original prompt, source path, proof scope and derivative hashes. The four WebP widths (`480`, `800`, `1200`, `1536`) and prompt sidecars are in [the scoped media directory](../../public/media/factory-section-20261014/). Workshop reuses the existing labelled workflow illustration. Both figures visibly state their AI origin; neither supplies factory, calibration or inspection-result evidence.

The shared `RfqPanel` is reused with local details slots. Its three `/quote/?part=…` contexts are Factory and quality review for custom CNC parts, Factory review and custom CNC machining, and Inspection requirements and order records. The destination continues to prepare an email draft. Quality also retains the sample-report and ISO-document `mailto:` requests plus the downloadable acceptance TXT. Legacy `/factory/#equipment` and the other mapped workshop fragments redirect to their retained targets; `#documents` leads to `/about/company-documents/`.

## Do's and Don'ts

- Keep future Factory edits inside the local components, data and style boundary while retaining the existing brand and shared components.
- Preserve the qualifications attached to capacity, equipment count, production timing, certification and documentary photographs.
- Keep AI concepts visibly labelled and retain original source assets and generation provenance.
- Do not turn a reference capacity, equipment photograph or conceptual illustration into an order promise or measured result.

## Acceptance evidence

The saved checks support local implementation acceptance. They do not establish a deployed host state.

| Evidence | Recorded result |
| --- | --- |
| [Static validation](../../../../factory-section-redesign-20261014/static-validation.json) | Exactly three Factory routes; 5/7/6 modules; one `h1` each; expected canonicals and schema types; no missing original photos, missing old anchors, duplicate IDs or validation failures |
| [Final render checks](../../../../factory-section-redesign-20261014/after/final-render-checks.json) | All three pages at 1440px and 390px; no missing images, horizontal overflow or overlay |
| [Responsive checks](../../../../factory-section-redesign-20261014/after/responsive-checks.json) | All three pages at 320, 390, 760, 969, 1100, 1440 and 1600px; no overflowing elements or empty media |
| [Interaction checks](../../../../factory-section-redesign-20261014/after/interaction-checks.json) | Overview → Workshop → Quality; equipment and inspection-record anchors; all three RFQ topics; TXT download; legacy `/factory/#equipment`; mobile menu open/close; console empty |
| [Astro check](../../../../factory-section-redesign-20261014/check.log) | 0 errors, 0 warnings, 4 existing hints outside the Factory implementation |
| [Final build](../../../../factory-section-redesign-20261014/build-final.log) and [SEO check](../../../../factory-section-redesign-20261014/seo-final.log) | Both passed; SEO verification is local and explicitly excludes host behavior |
| [Independent finish review](../../../../factory-section-redesign-20261014/after/independent-review.json) | `ship`, no material findings; independent read-only review of six final screenshots and source. The reviewer did not repeat browser interactions; runtime and width coverage rely on the separate records above. |

| Final screenshots | Desktop | Mobile |
| --- | --- | --- |
| Overview | [1440px](../../../../factory-section-redesign-20261014/after/overview-desktop.png) | [390px](../../../../factory-section-redesign-20261014/after/overview-mobile.png) |
| Workshop | [1440px](../../../../factory-section-redesign-20261014/after/workshop-desktop.png) | [390px](../../../../factory-section-redesign-20261014/after/workshop-mobile.png) |
| Quality | [1440px](../../../../factory-section-redesign-20261014/after/quality-desktop.png) | [390px](../../../../factory-section-redesign-20261014/after/quality-mobile.png) |
