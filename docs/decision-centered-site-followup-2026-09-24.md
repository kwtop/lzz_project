# Buyer decision-centered site follow-up

Date: 2026-09-24  
Scope: local Astro site content and navigation updates from the first implementation batch in `decision-centered-site-audit-2026-09-24.md`. No deployment, upload, inquiry submission, or external publication was performed.

## Outcome

The first implementation batch is complete. It improves the visibility and scope of existing buyer-facing information while keeping the shared visual system and desktop layout substantially unchanged. Phone-only product-detail ordering was adjusted so the product purpose, discussion action, and image fit in the first 390 × 844 viewport.

This does **not** mean every buyer question can now be answered completely. Several commercial and quality questions still require company records or an authorized business decision; the site does not fill those gaps with assumed supplier norms.

### Additional RFQ copy pass

After the first review, the user approved adding clearer customer-facing boundaries. The site now asks buyers to provide the information needed to resolve project-specific unknowns rather than displaying an internal “awaiting company input” list. This pass does not establish new equipment, certification, inspection, commercial or delivery evidence.

- Quality now presents ±0.01 mm only as a reference for selected critical features after engineering review, states that it is not a general tolerance or guarantee, and asks buyers to confirm instrument range, current calibration evidence and project-record availability. The ±0.005 mm figure is not published.
- The RFQ guide says no fixed MOQ is published and asks for quantities by part and expected repeat lots. The 5-axis page states that travel, load and maximum part envelope are not published, and requests model, material, stock and part dimensions/weight for review.
- The order guide asks the quote to define schedule start, calendar vs working-day basis, finishing scope, transit, Incoterm, customs/duty/tax responsibility and any arrival-date commitment.
- The material guide asks for finish standards/revisions and controlled appearance or coating requirements, plus required customer/industry standards. It does not claim certification.
- The quote page invites a required response deadline but does not invent a response SLA. It continues to state that the form only creates a local email draft.

## Changes, following the audit order

1. **Corrected high-risk claims.** “40+” now refers to machining and support equipment, not 40+ CNC machines. The 7–14-day references are limited to 1–50-piece prototype batches and selected market-test bridge production; the copy separates production planning from transit and says the actual schedule is quote-specific. The former generic 7–20-day statement was removed. ±0.01 mm appears only as a feature-specific reference on Quality and CNC Milling, subject to engineering review; it is not a general part tolerance. The unsupported ±0.005 mm promise was removed.
2. **Improved findability and navigation language.** Capability directory groups now include short descriptions to help buyers choose a process, material, or production stage. Resource cards expose their existing descriptions. “Cases” is presented as “Process studies” in navigation and page copy, while the `/cases/` URL remains stable; a scope note appears before the cards and distinguishes process imagery from customer outcomes, measurement reports, and material proof.
3. **Improved product-detail mobile decision flow.** At phone widths, the product title and purpose, discussion action, and static catalog image are brought into the first screen. Desktop layout was not intentionally changed. The image no longer implies that clicking opens a detailed inspection view.
4. **Clarified file and inquiry boundaries.** Privacy copy no longer claims product images open for detail inspection. Existing RFQ guidance continues to explain that the site does not receive drawings and the quote form prepares an email draft for the visitor to review and send.

## Fixed 16-question buyer check

“Complete” below means the page answers the question or clearly states its boundary. It does not mean independent verification of factory performance unless stated.

| # | Buyer question | Updated status | Remaining gap |
|---:|---|---|---|
| 1 | Which processes can you perform? | **Answerable for published scope.** Capability directory explains process groups and links to service pages. | No machine-by-machine limits are inferred; confirm a specific geometry by drawing review. |
| 2 | Can you machine my exact material grade? | **Partial.** Grade options are listed with links to relevant capabilities. | Per-part grade, current sourcing, material certificates, and availability are not evidenced. |
| 3 | What is the minimum order quantity? | **Missing.** No unverified MOQ is published; economical quantity is project-specific. | Company must confirm MOQ or the rule used to determine it. |
| 4 | How long does production take, and is shipping included? | **Partial.** 7–14-day references are scoped to the two cited use cases, and transit is separate from production. | Start point, calendar/business-day convention, finish/material conditions, and actual slot remain quote-specific and need business confirmation. |
| 5 | What are the maximum 5-axis dimensions, travel, or load? | **Missing.** The page directs buyers to drawing-based evaluation rather than inventing a machine limit. | Publish equipment envelope/travel/load only after the current machine list is verified. |
| 6 | Can you guarantee ±0.005 mm? | **Partially answered; not verified.** That blanket-facing number is removed. Quality and CNC Milling describe ±0.01 mm only as a conditional, feature-specific reference after engineering review. | No public measurement records, measurement method, feature range, or repeatability evidence is available; no general tolerance guarantee is made. |
| 7 | Can you anodize, plate, or polish? | **Partial.** Relevant finishing options and substrate/geometry dependency are described. | Applicable materials, finish standards, colors, subcontracting responsibility, and sample records need confirmation. |
| 8 | Can I request a quote from a sample without a drawing? | **Partial.** Sample-to-part review is discoverable and warns that hidden material/treatment requirements are not conveyed by a sample. | Required sample details, evaluation fee, and turnaround are not confirmed; a sample does not imply an immediate or free quote. |
| 9 | What files should I provide for a quote? | **Complete for preparation.** RFQ guidance covers 3D/2D drawings, part number, units, revision, and relevant requirements. | Restricted files require prior contact; the website itself does not upload or receive files. |
| 10 | Can you provide a real inspection report or calibration evidence? | **Partial.** The site identifies the report format as blank and does not represent it as customer results. | No authorized project report, instrument model/range, or current calibration evidence is available for public verification. |
| 11 | Do you hold an ISO 9001 certificate? | **Complete for the website’s stated status.** It explicitly says an ISO9001 certificate is not available on this site. | Do not infer certification from historical company awards or management descriptions. |
| 12 | Are “Cases” customer delivery results? | **Complete as a content boundary.** The entry is renamed “Process studies”; the page distinguishes process imagery from customer outcomes and inspection proof. | No customer outcome is claimed; any future named case needs records and disclosure authorization. |
| 13 | Do you have automotive, medical, or aerospace certifications? | **Missing / unverified.** The site does not infer certification or safety-critical suitability from product imagery. | Applicable certificates, scope, legal entity, dates, and part-level compliance evidence have not been supplied. |
| 14 | How are freight, trade terms, and arrival dates determined? | **Partial.** The guide separates required arrival date from dispatch date and asks the quote to specify shipping and customs responsibilities. | Destination-specific costs, tax/customs responsibility, Incoterms, and arrival guarantees are not fixed or publicly evidenced. |
| 15 | Is an NDA available before I send drawings? | **Complete for the current process boundary.** Buyers are told to contact LZZ before sending restricted files; website use does not create an NDA. | No automatic NDA signing or secure upload feature is claimed. |
| 16 | Does clicking submit send an inquiry, and when will I get a reply? | **Form behavior complete; response time missing.** The form creates an email draft, does not submit or upload, and the visitor sends it. | No response-time SLA is evidenced or promised. |

## Verification

- `npm run check` — passed: 68 files, no errors, warnings, or hints.
- `npm run build` — passed: 64 HTML pages, 63 sitemap URLs, 86 redirects, 91 discovered URLs.
- `npm run test:seo` — passed: generated HTML, sitemap, redirects, and route inventory.
- `node scripts/verify-content-organization.mjs` — passed: 35 products, 10 categories, 6 combined-filter results; desktop/tablet/phone checks at 1440/768/390 px.
- `TEST_URL=http://127.0.0.1:4323 npm run test:site` — passed: 64 HTML pages, 63 mobile routes, image/link/layout checks, product search/filter, RFQ prefill, and local email-draft flow.
- `TEST_URL=http://127.0.0.1:4323 npm run test:refinement` — passed: 63 tablet routes; static product image behavior, mobile product CTA and image in first screen, mobile quote form, storage/error fallbacks, and draft generation.
- A generated-HTML scan found no remaining `7–20 days`, `±0.005 mm`, `40+ CNC machines`, or old “Engineering Cases” labels.

The refinement test defaults to port 4321, which is not the current local preview. It was rerun against the active port 4323 and passed; the initial default-port timeout was an environment mismatch, not a site regression.

After the additional RFQ copy pass, `npm run check`, `npm run build`, `npm run test:seo`, `node scripts/verify-content-organization.mjs`, and the full site verifier against `http://127.0.0.1:4323` were rerun and passed. The final content-organizing check covers 1440/768/390 px; the full site check covers 64 HTML pages and 63 mobile routes with no browser errors or failures. The final generated HTML scan found none of the superseded `±0.005`, `7–20 days`, or `40+ CNC machines` wording.

## Still needs company evidence

The highest-value next inputs are: a verified machine list and 5-axis envelope; MOQ/economical batch rules; the exact 7–14-day schedule definitions; approved measurement records, instrument/calibration details, and report examples; finish standards and supplier responsibility; sample-only evaluation pricing/timing; current industry certificates and applicability; shipping/Incoterms; and a response-time policy. Until those arrive, the site should retain the current explicit boundaries.

No image-generation call was needed: the reviewed pages had their required existing visuals and the current image checks passed. No image was generated to stand in for a factory, customer part, or measured result.

## Publication boundary

All changes and verification in this follow-up are local. The public site and hosted preview could not be reliably fetched during this run, so their current state is **not verified**. No deployment or production promotion occurred.
