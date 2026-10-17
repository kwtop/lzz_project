# Round 2 · Apple design precision pass

Completed locally on 2026-09-30. Existing industrial art direction, imagery, content and routes retained. Applied apple-design principles to typography, alignment and direct control feedback.

## Changes

- Refined H2/H3 tracking; product editorial heading reduced from 70px maximum to 52px, and from 43px to 32px on mobile. Supporting body text uses more relaxed leading.
- Aligned product overview and drawing-review content to the same column and 50px inset; tablet uses 28px and mobile 0px. Mobile product gutter now matches the shared 16px gutter.
- Balanced table cell spacing, section heading baseline, numeric widths, button size, icon flex behavior and form corner geometry.
- Unified product CTA red with the existing site red. Added immediate 70ms press feedback and interruptible 160ms release transitions; image transitions use a restrained 240ms curve.
- Navigation chevrons animate transform only, removing margin animation. Mobile menu height accounts for the 72px header.
- Unified red keyboard/form focus outlines. Reduced-motion preference disables transitions and pressed scaling.

## Verification

- `npm run build`: passed, 83 pages generated plus SEO output.
- `npm run test:seo`: passed, 90 HTML files, 81 sitemap URLs, 93 redirect rules.
- Browser: product desktop at 1440 × 1000; main and drawing columns both x=529.625 with 50px inset. Editorial heading computed at 52px; no horizontal overflow.
- Browser: product at 390 × 844; 32px editorial heading, 0px drawing inset, no horizontal overflow. Screenshot saved.
- Browser: quote at 390 × 844; no horizontal overflow, form focus computed as red 2px outline. Screenshot saved without entering data or sending anything.
- Browser: resources desktop/mobile and homepage mobile visually inspected. Homepage mobile had no horizontal overflow.
- Browser: desktop and mobile navigation opens; Escape closes the active disclosure. Mobile menu maximum height 772px at 844px viewport. Arrow transition property is transform.
- Browser: emulated reduced-motion preference produced 0s transitions for button and arrow; emulation and viewport overrides then reset.
- Legacy `npm run test:site` could not execute its checks: it targets inactive port 4321, while the current preview runs on 4323. This suite is not reported as passed. Relevant visual/interaction checks above were performed through the current preview.

Source edits: `src/styles/finesse-redesign.css`, `src/styles/navigation.css`. Pre-edit backup: `D:/lzz/_design/apple-round2-2026-09-30/before`.

No deployment performed. “95%” is a design target, not a measured score.
