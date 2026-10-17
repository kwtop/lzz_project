# Google 官方技术依据（2026-10-10 核对）

- [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)（页面更新日期 2025-12-10）：AI Overviews / AI Mode 沿用普通 SEO 基础要求；支持链接页面须已被收录且能显示搜索摘要。没有额外的 AI 专用 schema 或机器可读文件要求。可抓取文字、站内链接与准确的结构化数据有助于内容理解；满足要求仍不保证抓取、收录或展示。
- [General structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)（页面更新日期 2026-07-10）：结构化数据须反映用户可见、相关、真实的页面内容。语法正确或 Rich Results Test 通过也不保证富结果出现。本次本地 JSON.parse / 类型检查不能替代 Google 官方工具与实际抓取结果。
- [Block Search indexing with noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing)（页面更新日期 2025-12-10）：Googlebot 必须能抓取页面，才能读取 noindex 标签或响应头；robots.txt 阻断抓取会令其看不到页面内 noindex。应在 URL Inspection / Page Indexing 中核对实际抓取后的状态。

检索采用 agent-reach 网页阅读流程；Jina 后端因本机代理不可连接而失败，随后使用平台网页读取工具直接读取上述 Google 官方页面。未读取第三方教程。
