# Browser functional regression

Status: **PASS**. 10/10 scenarios passed across the initial complete run and one targeted catalogue rerun.

The initial catalogue failure came from getByRole excluding a collapsed select during state inspection. The verification script now includes hidden options for value reads; no site file was changed to resolve it. Both run records are preserved.

- No mailto, tel, WhatsApp or external submission action was clicked.
- All non-read HTTP methods were intercepted and would fail this run.
- Clipboard success and denial were explicitly simulated; actual system clipboard access is not asserted.
- Save operations are real browser downloads saved inside verification/downloads.
- Video success uses actual Chrome decoding; one separate failure scenario deliberately aborts MP4.
- No-JavaScript uses a separate browser context with JavaScript disabled.

## catalogue — PASS

{
  "initial": 35,
  "search": "Multi-bore circular milled",
  "searchCount": 1,
  "housings": 11,
  "processCount": 26,
  "combinedCount": 13,
  "orderCount": 6,
  "combinedUrl": "http://127.0.0.1:4321/machined-parts/gallery/?process=CNC-Milling-Service&material=Aluminum-CNC-Parts",
  "emptyState": true,
  "urlReloadAndBack": true
}
## news — PASS

{
  "Team life": 3,
  "Workshop & events": 2,
  "All updates": 5
}
## menus — PASS

{
  "desktopGroups": true,
  "desktopOutsideClick": true,
  "escape": true,
  "mobileWidths": [
    1024,
    390
  ]
}
## rfq-service — PASS

{
  "sourceRoute": "/capabilities/cnc-milling-service/",
  "href": "/quote/?part=CNC+milling&capability=cnc-milling-service&source=%2Fcapabilities%2Fcnc-milling-service%2F",
  "title": "CNC milling",
  "referenceId": "capability/cnc-milling-service",
  "emptyValidation": true,
  "invalidEmailValidation": true,
  "prepared": true,
  "restored": true,
  "edited": true,
  "cleared": true,
  "download": "D:\\lzz\\penta-rollout-20261017\\verification\\downloads\\local-draft-capability.txt",
  "clipboard": "SIMULATED success and denial only; system clipboard not verified",
  "outboundMailClicked": false
}
## rfq-product — PASS

{
  "sourceRoute": "/machined-parts/gallery/ultra-high-precision-machining-services/",
  "href": "/quote/?part=Custom+CNC+Impeller+Machining&product=ultra-high-precision-machining-services&source=%2Fmachined-parts%2Fgallery%2Fultra-high-precision-machining-services%2F",
  "title": "Custom CNC Impeller Machining",
  "referenceId": "product/ultra-high-precision-machining-services",
  "emptyValidation": true,
  "invalidEmailValidation": true,
  "prepared": true,
  "restored": true,
  "edited": true,
  "cleared": true,
  "download": "D:\\lzz\\penta-rollout-20261017\\verification\\downloads\\local-draft-product.txt",
  "clipboard": "SIMULATED success and denial only; system clipboard not verified",
  "outboundMailClicked": false
}
## guide — PASS

{
  "copied": "SIMULATED clipboard success and denial; system clipboard not verified",
  "brief": "D:\\lzz\\penta-rollout-20261017\\verification\\downloads\\blank-cnc-rfq-brief.txt",
  "worksheet": "D:\\lzz\\penta-rollout-20261017\\verification\\downloads\\blank-order-acceptance-checklist.txt",
  "anchorTop": 229.90625
}
## videos — PASS

{
  "nativePlayback": [
    {
      "route": "/capabilities/plastic-machined-parts/",
      "index": 0,
      "controls": true,
      "muted": true,
      "poster": "http://127.0.0.1:4321/media/source-details/peek-parts-poster.webp",
      "source": "http://127.0.0.1:4321/media/source-details/peek-parts.mp4",
      "hidden": false,
      "currentTime": 0.008547,
      "readyState": 4,
      "paused": false,
      "duration": 3.367007
    },
    {
      "route": "/machined-parts/machining-examples/29-inch-display-housing-cnc-machining/",
      "index": 0,
      "controls": true,
      "muted": true,
      "poster": "http://127.0.0.1:4321/media/source-details/display-housing-poster.webp",
      "source": "http://127.0.0.1:4321/media/source-details/display-housing.mp4",
      "hidden": false,
      "currentTime": 0.013687,
      "readyState": 4,
      "paused": false,
      "duration": 18.454354
    },
    {
      "route": "/machined-parts/machining-examples/custom-metal-parts-batch-examples/",
      "index": 0,
      "controls": true,
      "muted": true,
      "poster": "http://127.0.0.1:4321/media/source-details/metal-cleaned-parts-poster.webp",
      "source": "http://127.0.0.1:4321/media/source-details/metal-cleaned-parts.mp4",
      "hidden": true,
      "currentTime": 0.015061,
      "readyState": 4,
      "paused": false,
      "duration": 47.566667
    },
    {
      "route": "/machined-parts/machining-examples/custom-plastic-parts-ptfe-pom-pe-acrylic/",
      "index": 0,
      "controls": true,
      "muted": true,
      "poster": "http://127.0.0.1:4321/media/source-details/plastic-ptfe-parts-poster.webp",
      "source": "http://127.0.0.1:4321/media/source-details/plastic-ptfe-parts.mp4",
      "hidden": true,
      "currentTime": 0.01282,
      "readyState": 4,
      "paused": false,
      "duration": 18.041247
    },
    {
      "route": "/machined-parts/machining-examples/custom-plastic-parts-ptfe-pom-pe-acrylic/",
      "index": 1,
      "controls": true,
      "muted": true,
      "poster": "http://127.0.0.1:4321/media/source-details/plastic-pom-gears-poster.webp",
      "source": "http://127.0.0.1:4321/media/source-details/plastic-pom-gears.mp4",
      "hidden": true,
      "currentTime": 0.013916,
      "readyState": 4,
      "paused": false,
      "duration": 5.675
    },
    {
      "route": "/machined-parts/machining-examples/custom-plastic-parts-ptfe-pom-pe-acrylic/",
      "index": 2,
      "controls": true,
      "muted": true,
      "poster": "http://127.0.0.1:4321/media/source-details/plastic-pe-guides-poster.webp",
      "source": "http://127.0.0.1:4321/media/source-details/plastic-pe-guides.mp4",
      "hidden": true,
      "currentTime": 0.017726,
      "readyState": 4,
      "paused": false,
      "duration": 6.87
    },
    {
      "route": "/machined-parts/machining-examples/custom-plastic-parts-ptfe-pom-pe-acrylic/",
      "index": 3,
      "controls": true,
      "muted": true,
      "poster": "http://127.0.0.1:4321/media/source-details/plastic-acrylic-parts-poster.webp",
      "source": "http://127.0.0.1:4321/media/source-details/plastic-acrylic-parts.mp4",
      "hidden": true,
      "currentTime": 0.02,
      "readyState": 4,
      "paused": false,
      "duration": 7.151088
    }
  ],
  "scope": "Actual installed Chrome decoding and currentTime advancement. No fabricated play event."
}
## video-fallback — PASS

{
  "route": "/machined-parts/machining-examples/custom-plastic-parts-ptfe-pom-pe-acrylic/",
  "fallback": "/media/source-details/plastic-ptfe-parts.mp4",
  "scope": "Deliberately aborted MP4 request tests the real error UI; normal playback is tested separately."
}
## no-js — PASS

{
  "galleryAll35": true,
  "rfqDisabledWithDirectEmail": true,
  "guideManualAndRealDownload": true,
  "nativeVideosVisible": true
}
## reduced-motion — PASS

[
  {
    "route": "/",
    "contentVisible": true,
    "entranceAnimations": 0
  },
  {
    "route": "/factory/",
    "contentVisible": true,
    "entranceAnimations": 0
  },
  {
    "route": "/machined-parts/gallery/",
    "contentVisible": true,
    "entranceAnimations": 0
  },
  {
    "route": "/resources/technical-guides/material-and-finish-checklist/",
    "contentVisible": true,
    "entranceAnimations": 0
  }
]