import sharp from 'sharp';
import fs from 'node:fs/promises';
const base='public/media/products-real-details-20261015';
await fs.mkdir(base,{recursive:true});
const items=[
 {id:'p33',src:'public/media/product-sources-20261015/p33-1200.webp',crop:{left:70,top:320,width:390,height:370}},
 {id:'five-axis-operation',src:'public/media/evidence/five-axis-operation-1600.webp',fraction:[.30,.26,.43,.48]},
 {id:'turn-mill-operation',src:'public/media/evidence/turn-mill-operation-1600.webp',fraction:[.28,.25,.46,.43]},
 {id:'two-stage-first',src:'public/media/evidence/two-stage-first-1600.webp',fraction:[.27,.25,.47,.45]},
 {id:'two-stage-second',src:'public/media/evidence/two-stage-second-1600.webp',fraction:[.27,.25,.47,.45]},
 {id:'milling-enclosure-operation',src:'public/media/evidence/milling-enclosure-operation-1600.webp',fraction:[.30,.31,.46,.47]},
 {id:'multi-feature-milling-operation',src:'public/media/evidence/multi-feature-milling-operation-1600.webp',fraction:[.24,.27,.51,.48]},
];
const manifest=[];
for(const item of items){
 const md=await sharp(item.src).metadata();
 const c=item.crop||{left:Math.round(md.width*item.fraction[0]),top:Math.round(md.height*item.fraction[1]),width:Math.round(md.width*item.fraction[2]),height:Math.round(md.height*item.fraction[3])};
 const path=`${base}/${item.id}.webp`;
 await sharp(item.src).extract(c).webp({quality:90}).toFile(path);
 manifest.push({id:item.id,source:item.src,output:path,crop:c,width:c.width,height:c.height,operation:'Real pixel crop only; no enlargement, reconstruction or background replacement.'});
}
await fs.writeFile('docs/visual-rebuild-20261015/products-real-crops.json',JSON.stringify(manifest,null,2));
console.log(JSON.stringify(manifest));
