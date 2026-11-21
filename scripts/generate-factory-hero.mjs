import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import sharp from 'sharp';

// Display derivative of the existing workshop photograph; no scene alteration.
const root=fileURLToPath(new URL('../',import.meta.url));
const source='public/media/site-image-polish-20261018/workshop-wide-original-2560.webp';
const input=await fs.readFile(path.join(root,source));
const metadata=await sharp(input).metadata();
const width=Math.round(metadata.height/2);
// Match the existing mobile object-position: 60% 40%. The entire photo height
// is retained, so the vertical focal point does not change the crop.
const crop={left:Math.round((metadata.width-width)*.6),top:0,width,height:metadata.height};
const output=path.join(root,'src/assets/factory');
await fs.mkdir(output,{recursive:true});
const variants=[];
for(const target of [400,640,width]){
 const filename=`workshop-mobile-${target}.webp`;
 const info=await sharp(input).extract(crop).resize({width:target,withoutEnlargement:true}).webp({quality:82,effort:6}).toFile(path.join(output,filename));
 variants.push({filename,width:info.width,height:info.height,bytes:info.size});
}
await fs.writeFile(path.join(output,'source.json'),JSON.stringify({source,sha256:createHash('sha256').update(input).digest('hex'),crop,quality:82,variants},null,2)+'\n');
console.log(JSON.stringify(variants));
