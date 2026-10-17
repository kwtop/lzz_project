import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';

const root=fileURLToPath(new URL('../',import.meta.url));
const sourceRoot=path.resolve(root,'../../原始资料/力智造-素材资料照片/力智造-素材资料照片');
const sources=JSON.parse(await fs.readFile(path.join(root,'src/data/companyNewsSources.json'),'utf8'));
const output=path.join(root,'public/media/company-news');
await fs.mkdir(output,{recursive:true});
const photos=[];
for(const item of sources){
 const source=await fs.readFile(path.join(sourceRoot,item.source));
 const hash=crypto.createHash('sha256').update(source).digest('hex');
 if(hash!==item.sourceSha256)throw new Error(`Source changed: ${item.source}`);
 const variants=[];
 for(const width of [480,800,1200,1600]){
  const file=`${item.id}-${width}.webp`;
  const result=await sharp(source).rotate().resize({width,withoutEnlargement:true}).webp({quality:84}).toFile(path.join(output,file));
  if(!variants.some(variant=>variant.width===result.width))variants.push({src:`/media/company-news/${file}`,width:result.width,height:result.height});
 }
 const main=variants.at(-1);
 photos.push({...item,...main,srcset:variants.map(variant=>`${variant.src} ${variant.width}w`).join(', ')});
}
await fs.writeFile(path.join(root,'src/data/companyNewsMedia.json'),JSON.stringify(photos,null,2)+'\n');
console.log(`Built ${photos.length} original news photographs with source hashes and responsive derivatives.`);
