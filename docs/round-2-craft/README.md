# Round 2 — interface craft

Preserved the existing palette, imagery, copy and section order.

- Inter Variable: primary headings 550, consistent tracking and leading.
- Homepage: secondary links now have restrained directional icons, consistent spacing, 44px targets and hover/focus feedback.
- Refined heading-to-image spacing and product label spacing. An even case count no longer leaves an empty grid cell before the final case.
- Search/select controls share height, radius, border and keyboard focus treatment; mobile filter disclosure is linked to its controlled region.
- Navigation remains open when the pointer leaves. Escape closes menus and restores focus; leaving a dropdown with the keyboard closes that dropdown. Closing mobile navigation clears expanded children.
- Short control feedback and reduced-motion support.

Validation: Astro check returned 0 errors, warnings and hints. Browser QA covered home, products, factory and quality at 390/768/1440px: no horizontal overflow; Inter Variable and 550 primary headings confirmed. Search empty/reset, mobile filter, desktop menu, mobile Escape/focus and reduced-motion checks passed. Screenshots and qa.json are in this folder.

Original versions are retained under before/ as .bak files.
