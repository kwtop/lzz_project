# Resources, machining studies and company news: copy edit

Completed on 2026-10-10 in `D:\lzz\lzz\_react`.

The edit covers the English copy in the assigned resource, case and news files. It uses the Humanizer workflow in embedded mode, including the four required sibling skills. Drafting, semantic review, cadence review and the final title/paragraph pass were performed internally. The register remains practical technical English for an overseas engineer or buyer preparing a custom-parts RFQ.

## Coverage

Reviewed 28 assigned files; modified 20. The seven data files, eleven components and ten route files were all read. Eight files contain only wiring, shared identifiers or already clear labels and did not require a text change.

Modified data:

- `src/data/resources.ts`
- `src/data/resourceDeliverySections.ts`
- `src/data/knowledgeCenter.ts`
- `src/data/cases.ts`
- `src/data/companyNews.ts`
- `src/data/workshopCollections.ts`

Modified components:

- `src/components/HowWeWork.astro`
- `src/components/RfqChecklist.astro`
- `src/components/ShippingChecklist.astro`
- `src/components/ResourceArticle.astro`
- `src/components/ResourceLinks.astro`
- `src/components/KnowledgeCategory.astro`
- `src/components/PrototypeJourney.astro`
- `src/components/PrismaticStudy.astro`
- `src/components/MayTeamOuting.astro`

Modified routes:

- `src/pages/resources/index.astro`
- `src/pages/resources/faq.astro`
- `src/pages/resources/processes-materials-finishes.astro`
- `src/pages/cases/index.astro`
- `src/pages/cases/[slug].astro`

Titles, metadata descriptions, headings, navigation labels, captions, inline image disclosures, link labels and body copy were in scope. Imported photo captions and alternative text in `companyNewsMedia.json`, `additionalMedia.generated.json`, `evidence.ts` and `refinedImages.ts` are outside this agent's file ownership and were flagged for the main agent's review. No images were assessed, generated or replaced.

## Changes relevant to procurement

Long catalogs of requirements were separated into connected explanations while keeping the individual technical requirements. Complete RFQ checklists, material reference sets and comparison tables remain available for buyers to scan. Vague display text such as “What drawing review returns” and “Set the commercial brief” now names the quotation or the quantity and delivery details.

`HowWeWork.astro`, the matching source article and FAQ now include `#commercial-terms`. The content asks buyers to confirm payment method and currency, payment stages and amounts, sample machining and setup charges, freight and any credit toward a later order. After-sales questions cover any warranty period and start date, exclusions, issue reporting and responsibility for rework, replacement, return freight or an agreed refund. These are confirmation questions; they do not invent LZZ policy. The existing discrepancy submission and review process is preserved. All eleven original FAQ questions remain represented; four procurement questions were added.

The material guide retains the brochure's `C3600` and `H62` labels and adds the existing current guide's `C36000` designation for comparison. It asks for the intended grade and applicable standard and does not treat the designations as equivalents.

Case copy remains machining studies and separate part collections. No customer performance, measured result, delivery acceptance or benefit was added. The 29-inch display reference remains a display size rather than an enclosure dimension. Five company news records retain their event dates and source relationships; the May article title now identifies the actual team outing.

## Facts and contracts preserved

- Minimum order: 1 piece.
- Production: 7-14 business days after drawing and order confirmation, including surface finishing. Transit remains additional.
- Company-confirmed service scope dated 2026-09-28, including the quoted transport and document options.
- Existing ISO 9001 company statement, accompanied by the request for the current certificate and scope.
- Drawing revisions, material conditions, critical datums, tolerance limits and inspection requirements; required confidentiality arrangements and email-draft behavior.
- Existing URL targets, source URLs, route slugs, media paths, fonts, stack and component styles. FAQ and prismatic-study inquiry topic labels were edited at the main agent's request to remove an em dash; the `/quote/` route and query construction are unchanged. New FAQ links target the new commercial-terms section and the existing issue-review section.

The original website-build contract was not used as a CNC purchase contract. Historical brochure lead-time or warranty wording was not substituted for current company-confirmed production timing or new-order terms.

## Enterprise records still required

The new confirmation questions need an approved current quotation/order template and a business owner to resolve the terms. Required inputs include payment methods and currencies, staged payment requirements, sample pricing and freight, any sample-fee credit, and after-sales terms applicable to each quoted part. The public copy makes no free-sample, fixed warranty, refund or remedy promise.

Supplier qualification still requires the current ISO certificate and verification details. Technical evaluation still needs an authorized genuine inspection or first-article record linked to the part and drawing revision. Material designation questions require the enterprise to confirm the intended standard and available documents. Stronger customer-case claims would require matching order, inspection and delivery evidence; none was fabricated here.

## Validation

TypeScript transpilation diagnostics passed for all seven assigned data modules. The Astro compiler parsed all twenty-one assigned Astro files successfully. FAQ was parsed again after its final metadata edit. A before/after comparison confirmed that existing literal `href`, `src`, `source` and `slug` values were preserved and that all component `<style>` blocks are unchanged. The final watched-phrase and em/en-dash scan returned no hits across the assigned text files after the main agent requested the inquiry-topic edits.

No independent production build, deployment or external message was performed by this agent. The main agent owns the combined build and rendered checks, including the new How We Work and FAQ sections on mobile.
