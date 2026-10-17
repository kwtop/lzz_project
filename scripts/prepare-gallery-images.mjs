import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const root=process.cwd(),sourceDir='D:/lzz/gallery-redesign-20261012/images';
const manifest=JSON.parse(await fs.readFile(sourceDir+'/generation-manifest.json','utf8'));
const output=path.join(root,'public/media/gallery');await fs.mkdir(output,{recursive:true});
const generated=[];
for(const item of manifest){
 const original=path.join(sourceDir,item.id+'.png');await fs.copyFile(item.source,original);
 const meta=await sharp(original).metadata();
 const widths=item.id.includes('detail')?[640,960,1440]:item.id==='rfq-gallery-v1'||item.id==='prototype-gallery-v1'?[480,800,1200,1440]:[320,480,800,1200];
 for(const width of widths)await sharp(original).resize({width,withoutEnlargement:true}).webp({quality:88,effort:5}).toFile(path.join(output,item.id+'-'+width+'.webp'));
 generated.push({...item,archivedSource:original,width:meta.width,height:meta.height,webPrefix:'/media/gallery/'+item.id+'-',widths,kind:item.id.includes('gallery')&&!['rfq-gallery-v1','prototype-gallery-v1'].includes(item.id)?'source-guided presentation':'illustration',evidence:false});
}
await fs.writeFile(root+'/docs/gallery-images-20261012.json',JSON.stringify({tool:'built-in imagegen',generated},null,2)+'\n');
console.log('Prepared',generated.length,'gallery assets; originals retained.');
