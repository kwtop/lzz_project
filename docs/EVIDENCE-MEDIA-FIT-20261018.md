# 图片辨识与尺寸适配实施记录

2026-10-18。本轮针对用户标注的装夹对照、公司文件、参观新闻图片，以及全站类似尺寸问题进行本地修改。继续使用现有 Penta 布局与 LZZ 蓝色；未部署。

## 已完成的实际修改

| 位置 | 原问题 | 本轮结果 |
| --- | --- | --- |
| Machining examples 的 two-setups | 两张近似机位的加工照不能解释装夹差异，图位偏小 | 两张独立 ImageGen 示意分别呈现工件平放和直立，明确标为 Top-face / Side-face；标题说明在上、完整 4:3 对照在下，手机依次阅读 |
| Company profile 的三份文件 | 横版牌匾置于统一高白框，主体小且空白多 | 原文件按原生比例完整显示；横版约 280px、竖版约 210px；图片与文字均可进入原件 |
| Company news 的参观照 | 竖图塞进横框，出现大块灰边、人物与零件偏小 | ImageGen 制作 4:3 构图预览，聚焦交流动作和零件；标为 reframed preview，并提供原始照片入口 |
| 新闻目录与相关新闻 | 图框尺寸、图注位置不一致 | 同类预览按 4:3 显示，图注和原片链接统一位置；新闻正文继续使用原照片 |
| 服务页产品与检验照片 | 旧固定高度让横图在平板等尺寸挤进竖框 | 产品摄影使用完整 4:3；CMM 图片恢复自然比例，较窄视口自动按阅读顺序单列 |

原始两张加工照片只支持“同一零件的两个铣削工序”这一来源描述，不能单凭照片证明两种持有方向。本轮相应修正案例、服务和三篇指南中的图意说明；基准、技术条件、参数表及询价资料要求保留。新图是装夹规划示意，原始记录入口仍可访问。

## 实际采用的 ImageGen 素材

| 注册 ID | 新素材 | 来源与用途 |
| --- | --- | --- |
| setup-first | setup-top | 根据原始加工记录制作的顶面加工示意；替换旧 setup-first 展示图 |
| setup-second | setup-side | 独立制作的直立侧面加工示意；替换旧 setup-second 展示图 |
| news-visit-reframed | visit-reframe | 原澳大利亚客户参观照片的横向构图预览；原片和正式新闻正文保留 |

共调用宿主 ImageGen 4 次，采用 3 张母版。侧面图初版因槽口位置不合理返修，未用于页面。母版均为 1448×1086；每张生成 480、800、1120、1440px 四种 WebP，共 12 个响应式文件，合计 1,018,034 bytes，最大单文件 174,164 bytes。非首屏图继续延迟加载。

新素材通过共享注册表实际用于 24 个正式页面，包含首页、加工目录、铣削服务、工厂、相关产品的加工说明、加工案例及采购指南。未改动 35 项产品摄影主图。

- [素材、来源哈希、旧映射与尺寸清单](D:/lzz/lzz/_react/design/evidence-media-fit-20261018/manifest.json)
- [24 个实际采用页面与图位](D:/lzz/lzz/_react/design/evidence-media-fit-20261018/adoption-routes.json)
- [首张生成记录](D:/lzz/lzz/_react/design/evidence-media-fit-20261018/generation.json)
- [返修及新闻构图记录](D:/lzz/lzz/_react/design/evidence-media-fit-20261018/additional-generation.json)

证书、牌匾未使用 AI 重写文字、印章或编号。相关原文件和新闻来源登记保留；生成的新闻预览具有明确身份，不代替原事件记录。

## 页面前后对照

截图来自真实本地页面。下表提供桌面局部基线与最终视口，原始整页、手机截图及几何数据均保存在任务目录中。

| 内容 | 修改前 | 修改后 |
| --- | --- | --- |
| 装夹对照 | [原对照](D:/lzz/lzz/_react/design/evidence-media-fit-20261018/before-studies-two-setups-1440.jpg) | [桌面](D:/lzz/lzz/_react/design/evidence-media-fit-20261018/after-setup-viewport-1440.png) · [手机](D:/lzz/lzz/_react/design/evidence-media-fit-20261018/after-setup-top-viewport-390.png) |
| 公司文件 | [原牌匾](D:/lzz/lzz/_react/design/evidence-media-fit-20261018/before-profile-ar-document-2-1440.jpg) | [桌面](D:/lzz/lzz/_react/design/evidence-media-fit-20261018/after-documents-viewport-1440.png) · [手机](D:/lzz/lzz/_react/design/evidence-media-fit-20261018/after-documents-viewport-390.png) |
| 新闻图片 | [原新闻列表](D:/lzz/lzz/_react/design/evidence-media-fit-20261018/before-news-ar-news-archive-grid-0-1440.jpg) | [桌面](D:/lzz/lzz/_react/design/evidence-media-fit-20261018/after-news-viewport-1440.png) · [手机参观卡片](D:/lzz/lzz/_react/design/evidence-media-fit-20261018/after-news-visit-viewport-390.png) |

整页截图工具可能暂时改变滚动条与页面重排，因此裁切判断采用普通视口截图与实际 DOM 尺寸，不把工具捕获造成的手机整页裁切当成网站问题。

## 本地验证

- 全部 86 个正式 URL 检查 1440px、390px，共 172 个页面状态：未发现横向溢出、明显 contain 灰边占位或当前视口缺图。此项为图片几何检查，不声称所有页面的屏外懒加载图都已逐张目视验收。
- 14 个相关页面完成桌面、手机滚动加载和图片检查；其中 5 个代表页补查 1024px、768px，共 38 个页面状态，未发现未加载图片或上述适配问题。收起的原始参考按需加载，不按缺图处理。
- 代表页包括加工目录、两工序案例、公司介绍、新闻目录、铣削服务、能力目录、三篇相关指南和五篇新闻正文。
- 805 项本地图片及原件引用均有文件；新 srcset 尺寸与 12 个实际文件一致，源 WebP 哈希与保存记录一致。档案 JPEG 哈希与 WebP 衍生文件哈希分别记录，避免混用。
- 实际点击参观原片与教学牌匾原件入口，均正常显示。手机新闻筛选实测 Workshop & events 为 2、Team life 为 3、All updates 为 5。
- 86 个页面的 title、description、canonical、H1、锚点 ID、技术表、JSON-LD 与本轮基线一致。29 个页面存在图片、图注、相关说明或原件链接变化；原 URL 保留。
- `npm run check` 通过：988 files，0 errors，0 warnings，9 个既有 hints。
- `npm run build` 通过：146 个 Astro 页面。
- `npm run test:seo` 通过：215 HTML、86 sitemap URLs、188 redirects、91 raw URLs。
- `node scripts/verify-inquiry-draft.mjs` 通过：邮件草稿、校验、可选参考、迁移等契约正常；未发送邮件，未改称上传或送达。

[完整验证结果](D:/lzz/lzz/_react/design/evidence-media-fit-20261018/validation.json)。本轮未测生产 Core Web Vitals，文件体积验证不代表生产性能测量。视觉结果已完成本地检查，仍由用户判断是否符合期望。

## 规范与回退

[DESIGN.md](D:/lzz/lzz/_react/DESIGN.md) 第 14 节已保存装夹对照、原文件、新闻预览与平板图框规则。

本轮源码及规范共改动 16 个文件；[逐文件变更与前后哈希](D:/lzz/lzz/_react/design/evidence-media-fit-20261018/source-changes.json) 记录准确范围。实施前源码在 `D:/lzz/evidence-media-fit-20261018/backup/`，原图及旧映射未删除。需要回退时只恢复清单中的文件，不覆盖整个工作区。新素材及母版分别在项目 `public/media/evidence-media-fit-20261018/` 和任务目录 `masters/` 中独立保存。

本轮标注问题无待生成素材；未部署生产环境，未验证线上主机行为。
