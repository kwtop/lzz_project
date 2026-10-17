import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const sourceRoot = 'D:/lzz/原始资料';
const assets = [
  {
    id: 'five-axis-operation-editorial-v1',
    source: '力智造-素材资料照片/力智造-素材资料照片/20251203力智造产品加工过程中图片/产品1-五轴加工/db22827e75937add7eb7e1636af6ab94.jpg',
    page: '/factory/',
    label: 'AI-retouched presentation from an LZZ machining photograph; see the original process photographs in our engineering cases.',
    prompt: 'Retouch the exact real five-axis machine interior, spindle, rotary trunnion and clamped metal workpiece. Preserve documentary geometry and machining context. Improve neutral lighting, color and detail. No new parts, logos, screens, people or claims.',
  },
  {
    id: 'cmm-detail-editorial-v1',
    source: '力智造-素材资料照片/力智造-素材资料照片/10，Producing Department-生产车间/1 (85).jpg',
    page: '/quality/',
    label: 'AI-retouched presentation from an LZZ coordinate measuring machine photograph; not a measurement or calibration record.',
    prompt: 'Retouch the exact real coordinate measuring machine, granite table, probe and fixtures. Preserve documentary geometry. Improve neutral lighting, color and detail; compose a landscape crop. No new gauges, documents, people, measurements or claims.',
  },
  {
    id: 'turning-operation-editorial-v1',
    source: '力智造-素材资料照片/力智造-素材资料照片/20251203力智造产品加工过程中图片/产品2-车加工/6c06c0a46e0bf5eae2d41d80616b236e.jpg',
    page: '/capabilities/cnc-turning-service/',
    label: 'AI-retouched presentation from an LZZ turning-process photograph; see the unretouched source photograph.',
    prompt: 'Retouch the exact real CNC turning scene with spinning cylindrical workpiece, cutting tool, coolant spray and turret. Preserve documentary geometry and motion. Correct washed-out exposure and haze with neutral industrial light. No new machine, finished part, people, values or claims.',
  },
];
const sha256 = async file => crypto.createHash('sha256').update(await fs.readFile(file)).digest('hex');
const widths = [480, 800, 1200, 1536];
await fs.mkdir(path.join(root, 'public/media/editorial'), {recursive: true});
const manifest = [];
for (const asset of assets) {
  const input = path.join(root, 'docs/media/generated', `${asset.id}.png`);
  for (const width of widths) {
    await sharp(input).resize({width, withoutEnlargement: true}).webp({quality: 86, effort: 5})
      .toFile(path.join(root, 'public/media/editorial', `${asset.id}-${width}.webp`));
  }
  manifest.push({
    ...asset,
    tool: 'built-in image_gen',
    mode: 'source-guided photographic edit; editorial only',
    sourceSha256: await sha256(path.join(sourceRoot, asset.source)),
    originalOutput: `docs/media/generated/${asset.id}.png`,
    outputSha256: await sha256(input),
    webPrefix: `public/media/editorial/${asset.id}-`,
    webWidths: widths,
  });
}
await fs.writeFile(path.join(root, 'docs/process-retouches.json'), JSON.stringify({
  purpose: 'Source-traceable editorial retouches; original site photographs remain the documentary evidence.',
  assets: manifest,
}, null, 2) + '\n');
console.log(manifest.map(({id, outputSha256}) => ({id, outputSha256})));
