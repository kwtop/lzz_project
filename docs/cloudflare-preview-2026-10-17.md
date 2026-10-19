# Cloudflare preview upload — 2026-10-17
- User authorized uploading the current site to Cloudflare.
- Verified existing account c3243c843894c12a89207ee67bf60e8e, Pages project lzz-precision, branch preview. No custom domain or DNS changes.
- Deployment: https://1dc2ea8c.lzz-precision.pages.dev/
- Updated alias: https://preview.lzz-precision.pages.dev/
- Wrangler 4.151.1: 2,587 files uploaded, 169 reused, plus _headers and _redirects.
- Snapshot includes current local uncommitted work and the approved centered homepage hero. Source HEAD 056208ba4dfd659147f2ccedda24a961ed70c4ee does not alone identify the uploaded snapshot; per-file SHA256 manifest is D:/lzz/cloudflare-upload-20261017-111845/manifest.json.
- Candidate: 2,758 files, 240,188,182 bytes. 84 canonical business URLs retained. Internal design comparisons/audits/visual-direction routes excluded only from the deployment copy; local source/dist unchanged by packaging.
- Preview-only protections: X-Robots-Tag noindex, nofollow, nosnippet; robots Disallow /. Canonicals retain https://www.lzz-cnc.com.
- Fresh build and SEO checks passed.
- Remote verification: all 84 business URLs HTTP200 and noindex; home at1440 and390 and milling at1440 visually reviewed, no broken decoded images, overflow, or page errors.
- New desktop/mobile homepage assets match local SHA256.
- Mobile menu, inquiry validation and draft generation passed. No email was sent.
- /products/ and /about/company-documents/ return301 to their intended relative destinations. Unknown route and excluded /design-previews/ return404.
- Screenshots, full verification JSON and deployment listing: D:/lzz/cloudflare-upload-20261017-111845/.
- This is a Cloudflare preview update, not promotion of www.lzz-cnc.com. No Git push occurred.

