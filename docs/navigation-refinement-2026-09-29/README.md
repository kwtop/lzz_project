# Navigation refinement — 2026-09-29

Scope: shared header navigation. Hero design and all existing navigation destinations are preserved.

Observed: the capabilities panel was fixed to the right edge, visually detached from its trigger; other panels used different anchoring. Materials and project requirements occupied the same column.

Changes: header-attached full-width white panels with content aligned to the 1140px page grid; three capability columns; consistent type and link spacing; white header and original blue logo during open state; mobile accordion dividers and clear close control. Existing click, outside-click and keyboard behavior retained.

Recovery: Layout.before.txt and MainNavigation.before.txt contain pre-change sources. Restore to their original paths and remove the navigation-refinement.css import/file to undo this scoped change.

Validation: Astro check 0 errors/warnings/hints. Playwright on home and product index at 390, 768, 1024, 1440px: all three panels within viewport, Escape closes, no horizontal overflow; keyboard entry and outside click passed; 23 navigation destinations returned success. No inquiry sent or deployment performed. Screenshots and verification.json in this directory.
