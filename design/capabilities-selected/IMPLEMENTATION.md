# Capability-first implementation

Selected reference: `D:/lzz/design-explorations/cnc-milling-2026-09-30/round-3-full-page/01-capability-first.png`.

Applied to all 10 existing capability detail routes through the existing Astro template. The Capabilities directory continues to link to these routes.

## Reading order

Hero and contextual RFQ → single anchor navigation → open scope matrix → part examples → relevant machining studies → process → drawing requirements → inspection → RFQ preparation → resources and related capabilities.

The six milling studies remain accessible through one image-led study and five text entries. Drawing/inspection requirements are visible without expanding a disclosure. Supplemental workshop photographs and long supporting-service lists use native disclosures.

## Content and source boundaries

Existing catalog and evidence data remain authoritative. No new machine limit, certificate, customer claim, tolerance guarantee or shipment outcome was added. Original photographs, catalog display assets and the disclosed AI geometry illustration retain their separate roles. Grade lists, five-axis size review, casting reconstruction, PEEK video, individual RFQ details and qualified planning references remain available.

Shared header/footer, routes, SEO data, product links and inquiry context are preserved. The RFQ opens the existing email-draft workflow. No real enquiry was sent.

## Files

- `src/pages/capabilities/[slug].astro`: shared detail template and presentation copy.
- `src/styles/capability-editorial.css`: styles scoped to `.cap-page`.
- `design/capabilities-selected/before/`: original template and prior QA record.
- `design/capabilities-selected/verify.mjs`: rendered static links, anchors, images, heading IDs and contextual CTA verification.

Local preview only. No production upload or deployment.
