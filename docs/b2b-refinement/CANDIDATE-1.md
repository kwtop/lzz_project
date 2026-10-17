# Candidate 1 — procurement facts and RFQ inputs

Starting point: frozen baseline code archive and screenshot set `9c4e7b2a`. This candidate changes two independent issues only.

1. **Product comparison.** On `/products/` the parts have a visual name and geometry line, while the machining route is buried. On detail pages, process and material options begin after the hero. Buyers must open several pages to decide relevance. Move existing source-backed process/material-option text beside the hero and show the existing related process category under each catalog item. Remove the duplicated lower process/material rows. Success: a buyer can distinguish the example route and material options in the first viewport without any invented part measurement or grade claim.
2. **RFQ input order.** Material and quantity are hidden in the optional accordion, so a completed draft can omit ordinary quoting inputs. Move these two existing optional fields into the main form. Keep them optional for early-stage enquiries; label their uncertainty and keep the user-send email boundary visible. Success: the user can supply them before preparing the draft without opening an accordion, and no email is sent during testing.

Rejected changes if any of these occur: broken catalog filters or links, lost product data, form validation regression, new mobile overflow, unreadable card text, misleading material claims, or a draft that implies on-site submission.

Baseline fixed-protocol independent reviews: total 7.4 and 7.5 (mean 7.45); procurement information 7.0 and 7.0 (mean 7.0); trust evidence 6.5 and 7.0 (mean 6.75). Baseline Astro check, build, SEO verification, 30-page responsive layout probe and inquiry-context verification passed locally. Actual business-email delivery and current ISO document validity were not verified.

## Result — rejected

- Code checkpoint: `CANDIDATE-1-code.zip`, SHA-256 `4923126CBB459E8F6A4FEBD0456F138BE70D29650BDF9FC0D7B1C94388D64D2B`.
- Fixed screenshot set: `screens/a1f8c3d4/`; matching route/state manifest: `manifests/a1f8c3d4.json`.
- Independent reviews: total 7.4 and 7.2 (mean 7.30); procurement 6.8 and 7.0 (mean 6.90); trust 6.6 and 6.5 (mean 6.55).
- Astro check, build, local SEO check, 30-page responsive layout probe, inquiry-context check passed. Keyboard Enter/Escape opened/closed the menu. An empty RFQ form was blocked; simulated material and quantity appeared in a draft with a `mailto:` link. No real email was sent. Actual mailbox opening and delivery remain unverified.
- The score difference is small, so both versions received the same two independent reviews and means were compared. Procurement and trust means also decreased. The candidate did not demonstrate a clear improvement, so the entire candidate is rejected and the baseline remains BEST.
