# Fixed screenshot-only review record

Every version uses the same 56-image route, viewport, scroll and interaction-state list captured by `scripts/capture-b2b-fixed.mjs`; version-specific manifests are in `manifests/`. Two fresh-context reviewers received only the PNG directory and the prompt below. They were not shown code, prior reviews, target scores or version status. Opaque screenshot directories did not say baseline, candidate or best.

## Unchanged reviewer prompt

> 你是独立的国际 B2B 工业网站设计评论员。仅查看 D:\lzz\lzz\_react\docs\b2b-refinement\screens\<ID>\ 中的 PNG 截图；文件名只表示页面、视口与状态。不要读取代码、文档、清单或其他目录，也不要访问网站。仅依据截图判断网站试图建立的品牌美学，并评价构图、Typography、图片、产品展示、信息密度、导航、CTA、信任证据、内容节奏、留白、桌面及移动细节。以海外采购商核查制造能力、比较零件、联系供应商的真实任务为中心，指出影响最大的 1–3 个具体问题及其页面位置、影响和最小修正方向；不要提出虚构业务证明或默认增加装饰组件。请分别给出总分、采购信息清晰度、信任证据呈现三项 10 分制分数，说明扣分依据。对截图无法证明的业务事实或交互结果明确写“未验证”。保持独立、客观且有主见，不要修改文件。

Only `<ID>` varied. All reviewers were independent subagents with no inherited conversation context.

| Version | PNG directory | A overall / procurement / trust | B overall / procurement / trust | Means | Decision |
|---|---|---:|---:|---:|---|
| Frozen baseline | `9c4e7b2a` | 7.4 / 7.0 / 6.5 | 7.5 / 7.0 / 7.0 | 7.45 / 7.00 / 6.75 | Initial BEST |
| Candidate 1 | `a1f8c3d4` | 7.4 / 6.8 / 6.6 | 7.2 / 7.0 / 6.5 | 7.30 / 6.90 / 6.55 | Rejected and restored |
| Candidate 2 | `c2d9a4e1` | 7.5 / 7.0 / 6.5 | 7.7 / 7.0 / 7.3 | 7.60 / 7.00 / 6.90 | Accepted |
| Candidate 3 | `d3e4b5a6` | 7.6 / 7.0 / 6.7 | 7.4 / 7.0 / 6.4 | 7.50 / 7.00 / 6.55 | Rejected and restored |
| Candidate 4 | `f4a8d2c9` | 8.0 / 7.0 / 7.0 | 7.5 / 7.0 / 7.0 | 7.75 / 7.00 / 7.00 | Final BEST |

The reviewers repeatedly identified the same limits: catalogue examples do not offer enough source-backed, comparable part fields; a current ISO certificate and real anonymized inspection record are unavailable for direct on-page verification; the RFQ ends in a buyer-sent email draft. The final review also identified cramped text in a desktop product engineering section. None of those gaps should be filled with invented specifications or generated proof.

All reviews evaluate screenshots only. Actual menu, form, links, SEO and build checks are recorded in the candidate notes; certification validity, real sending and mailbox delivery were not verified.
