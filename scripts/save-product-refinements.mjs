import fs from 'node:fs';
import sharp from 'sharp';

// Convert reviewed imagegen outputs and register their display-only replacements.
const manifestPath = process.argv[2];
if (!manifestPath) throw new Error('Provide a generation manifest JSON path');
const entries = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const mappingPath = 'src/data/refinedImages.ts';
let mapping = fs.readFileSync(mappingPath, 'utf8');
for (const entry of entries) {
  if (!/^[a-z0-9-]+$/.test(entry.name) || !/^[a-z0-9-]+$/.test(entry.slug)) throw new Error('Invalid asset name or slug');
  for (const width of [480, 800, 1200]) {
    const target = `public/media/${entry.name}${width === 1200 ? '' : '-' + width}.webp`;
    if (!fs.existsSync(target)) await sharp(entry.source).resize({width}).webp({quality:90, effort:6}).toFile(target);
  }
  const line = ` '${entry.slug}': '${entry.name}',`;
  const existing = new RegExp(` '${entry.slug}': '[^']+',`);
  mapping = existing.test(mapping) ? mapping.replace(existing, line) : mapping.replace('export const retouchedProducts: Record<string, string> = {', 'export const retouchedProducts: Record<string, string> = {\n' + line);
}
fs.writeFileSync(mappingPath, mapping);
console.log(`Saved ${entries.length} reviewed product images and responsive variants`);
