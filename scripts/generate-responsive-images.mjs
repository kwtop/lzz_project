import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// Display derivatives only; the source photographs and catalog records are preserved.
const root=process.cwd(),publicDir=path.join(root,'public'),output=path.join(publicDir,'media/responsive');
await fs.mkdir(output,{recursive:true});
const refined=await fs.readFile(path.join(root,'src/data/productImages.ts'),'utf8');
const sources=new Set([...refined.matchAll(/'((?:catalog-\d+-cutout-v1))'/g)].map(match=>'/media/'+match[1]+'.webp'));
for(const file of ['evidence.generated.json','additionalMedia.generated.json']){
 const data=JSON.parse(await fs.readFile(path.join(root,'src/data',file),'utf8'));
 for(const item of Object.values(data.photos||data))if(item.src&&item.kind==='original-photo')sources.add(item.src);
}
for(const src of ['/media/machining-hero-v2.webp','/media/rfq-planning-ai-v2.webp','/media/stainless-detail-v3.webp','/media/brass-threaded-plugs-retouched-v1-1536.webp','/media/polymer-shafts-retouched-v1-1536.webp','/media/editorial/material-family-editorial-illustrative-v1-1536.webp','/media/editorial/prototype-batch-editorial-r3-1536.webp'])sources.add(src);
const manifest={},usedNames=new Map();
for(const src of sources){
 const input=path.join(publicDir,src),meta=await sharp(input).metadata();
 const name=path.basename(src,path.extname(src));
 if(usedNames.has(name)&&usedNames.get(name)!==src)throw new Error('Conflicting display image name: '+name);
 usedNames.set(name,src);
 const widths=[...new Set([240,320,400,480,640,800,960,1200,1600,meta.width].filter(width=>width<=meta.width))].sort((a,b)=>a-b);
 let candidates=[];
 for(const width of widths){const filename=name+'-'+width+'.webp';await sharp(input).rotate().resize({width,withoutEnlargement:true}).webp({quality:80,effort:5}).toFile(path.join(output,filename));candidates.push('/media/responsive/'+filename+' '+width+'w');}
 manifest[src]={src:'/media/responsive/'+name+'-'+meta.width+'.webp',srcset:candidates.join(', '),width:meta.width,height:meta.height};
 if(src==='/media/machining-hero-v2.webp'){
  const cropWidth=Math.round(meta.height*375/844),left=Math.round((meta.width-cropWidth)*.65),mobile=[];
  for(const width of [320,375,cropWidth]){const filename='machining-hero-mobile-'+width+'.webp';await sharp(input).extract({left,top:0,width:cropWidth,height:meta.height}).resize({width,withoutEnlargement:true}).webp({quality:80,effort:5}).toFile(path.join(output,filename));mobile.push('/media/responsive/'+filename+' '+width+'w');}
  manifest[src].mobile={srcset:mobile.join(', '),width:cropWidth,height:meta.height};
 }
}
await fs.writeFile(path.join(root,'src/data/responsiveImages.generated.json'),JSON.stringify(manifest,null,2)+'\n');
const productSizes=Object.fromEntries(Object.entries(manifest).filter(([src])=>/^\/media\/catalog-\d+-cutout-v1\.webp$/.test(src)).map(([src,image])=>[path.basename(src,'.webp'),{width:image.width,widths:image.srcset.split(',').map(item=>Number(item.trim().split(' ')[1].slice(0,-1)))}]));
await fs.writeFile(path.join(root,'src/data/productResponsiveSizes.generated.json'),JSON.stringify(productSizes,null,2)+'\n');
console.log('Generated responsive display images for '+Object.keys(manifest).length+' sources.');
