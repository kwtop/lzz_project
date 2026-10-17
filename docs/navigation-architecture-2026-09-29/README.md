# Navigation architecture

Implemented 2026-09-29. Existing URLs preserved; before.zip is the pre-change source checkpoint.

- Capabilities: machining processes, materials, project requirements. Engineering Plastics has one header entry. Machining of Castings describes machining, not casting production.
- Custom Parts: /products/ and Machining Studies /cases/.
- Factory & Quality: /factory/, /quality/.
- Resources: /insights/, ordering / engineering / shipping guides and FAQ.
- About LZZ: /about/, Company News /insights/company-news/, Contact /about/#contact.
- Request a Quote: /quote/. Existing email-draft workflow remains unchanged.

Growth rules: new processes and materials belong to Capabilities; part geometries to Custom Parts; sourced process records to Machining Studies; real equipment and inspection records to Factory & Quality; procurement guidance to Resources; company events to About LZZ. Add an Industries section only when substantive industry-specific content exists.

Validation: Astro check passed; build produced 82 pages; local SEO verification passed. Headless Chrome checked all five dropdowns on home/products at 390/768/1024/1440, overflow, Escape, keyboard entry, outside click, and 23 destination responses. No production deployment or real inquiry submission.
