# Candidate 2 — mobile legibility and photographed process evidence

Starting point: the retained baseline, restored after Candidate 1 was rejected. This candidate changes two independent presentation issues.

1. **Mobile home hero.** White positioning copy currently crosses a light, detailed machine area at 390 px. This weakens immediate comprehension of the machining offer. Deepen the existing mobile photo overlay only where the text sits; retain the real workshop photo and the existing hierarchy. Success: headline and supporting copy remain plainly legible over the full first viewport without suppressing the photograph entirely.
2. **Home process study.** The hero and first workshop study currently repeat the same real five-axis image; the latter presents one machine setup without its companion photograph of machined forms. Use a different existing LZZ milling photograph in the hero, and pair the two existing photographs in the first study with a precise caption that does not claim an unverified customer outcome or measured result. Success: the home page shows distinct real scenes and the process study communicates setup plus visible machined geometry in one view.

No new section, decorative card, invented metric, certificate, customer relation or product photograph is introduced. Reject if mobile readability, navigation, image loading, provenance, responsive layout or procurement path regresses.

## Result

- Code checkpoint: `CANDIDATE-2-code.zip` (SHA-256 `FF40A85326009B52BD7A124ABDC3F47D8E06CF6BC91F533433E5A1177CC057C9`)
- Fixed screenshots: `screens/c2d9a4e1/` (56 PNG), with viewport and state recorded in `manifests/c2d9a4e1.json`.
- Fresh screenshot-only reviews, using the unchanged reviewer prompt: A 7.5 overall / 7.0 procurement / 6.5 trust; B 7.7 / 7.0 / 7.3. Means: **7.60 / 7.00 / 6.90**. Retained baseline means: 7.45 / 7.00 / 6.75.
- Evidence of improvement: distinct documented workshop scenes replace the repeated first image; the mobile hero statement is readable against a consistent dark field; the first process study shows both setup and photographed machined forms. Both reviewers described the mobile entry and real workshop visuals as clear. No reviewer identified a new procurement or trust regression.
- Checks passed: `npm run check`, `npm run build`, `npm run test:seo`, `node scripts/verify-studio.mjs` (30 page/viewport checks, zero failures/errors), `node scripts/verify-inquiry-context.mjs`. The fixed screenshot set loaded both paired images. No real RFQ email was sent.
- **Accepted as BEST_VERSION.** The remaining high-impact gaps are comparable catalog fields, upfront credential access, and the difference between the RFQ CTA wording and the email-draft completion step.
