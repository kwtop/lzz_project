import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import sharp from 'sharp';
import {chromium} from 'playwright';
import {createServer} from 'node:http';
const root=fileURLToPath(new URL('../',import.meta.url));
const sourceRoot=path.resolve(root,'../../原始资料/力智造-素材资料照片/力智造-素材资料照片');
const output=path.join(root,'public/media/source-details');
await fs.mkdir(output,{recursive:true});
const hash=buffer=>createHash('sha256').update(buffer).digest('hex');
const sources=JSON.parse(await fs.readFile(path.join(root,'src/data/additionalMediaSources.json'),'utf8'));
const photos={};
for(const item of sources){
 const bytes=await fs.readFile(path.join(sourceRoot,item.source));
 if(hash(bytes)!==item.sha256)throw new Error(`Source changed: ${item.source}`);
 const variants=[];
 for(const width of [480,800,1200]){
  const file=`${item.id}-${width}.webp`;
  const result=await sharp(bytes).rotate().resize({width,withoutEnlargement:true}).webp({quality:85}).toFile(path.join(output,file));
  if(!variants.some(v=>v.width===result.width))variants.push({src:`/media/source-details/${file}`,width:result.width,height:result.height});
 }
 photos[item.id]={...item,...variants.at(-1),srcset:variants.map(v=>`${v.src} ${v.width}w`).join(', ')};
}
const videos={};
let activeVideo;
const server=createServer((req,res)=>{if(req.url==='/clip.mp4'){res.writeHead(200,{'Content-Type':'video/mp4','Content-Length':activeVideo.length});res.end(activeVideo)}else{res.writeHead(200,{'Content-Type':'text/html'});res.end('<video src="/clip.mp4" preload="auto" muted></video>')}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const address=server.address();
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 for(const [id,folder,filename] of [['display-housing','20250108-29寸显示屏外壳'],['peek-parts','20250108PEEK材质加工好的零件成品视频'],['plastic-pe-guides','20251201塑料制品零件','PE材质的导条.mp4'],['plastic-pom-gears','20251201塑料制品零件','POM齿轮制作.mp4'],['plastic-ptfe-parts','20251201塑料制品零件','PTFE 特氟龙产品.mp4'],['plastic-acrylic-parts','20251201塑料制品零件/亚克力产品','亚克力成品.mp4'],['metal-cleaned-parts','20251201','批量铝件清洗完毕.mp4']]){
  const name=filename||(await fs.readdir(path.join(sourceRoot,folder))).find(name=>name.endsWith('.mp4'));
  const source=`${folder}/${name}`;const file=path.join(sourceRoot,source);const bytes=await fs.readFile(file);
  await fs.copyFile(file,path.join(output,`${id}.mp4`));
  const page=await browser.newPage({viewport:{width:800,height:1400}});
  activeVideo=bytes;
  await page.goto(`http://127.0.0.1:${address.port}/`);
  await page.waitForFunction(()=>document.querySelector('video')?.readyState>=2);
  const video=page.locator('video');
  const meta=await video.evaluate(async (/** @type {HTMLVideoElement} */ v)=>{v.pause();v.controls=false;await new Promise(resolve=>{v.addEventListener('seeked',resolve,{once:true});v.currentTime=v.duration*.5});return {width:v.videoWidth,height:v.videoHeight,duration:v.duration}});
  const frame=await video.evaluate((/** @type {HTMLVideoElement} */ v)=>{const canvas=document.createElement('canvas');canvas.width=v.videoWidth;canvas.height=v.videoHeight;canvas.getContext('2d').drawImage(v,0,0);return canvas.toDataURL('image/png').split(',')[1]});
  await sharp(Buffer.from(frame,'base64')).resize({width:480,withoutEnlargement:true}).webp({quality:84}).toFile(path.join(output,`${id}-poster.webp`));
  videos[id]={...meta,source,sha256:hash(bytes),src:`/media/source-details/${id}.mp4`,poster:`/media/source-details/${id}-poster.webp`};
  await page.close();
 }
}finally{await browser.close();server.close()}
await fs.writeFile(path.join(root,'src/data/additionalMedia.generated.json'),JSON.stringify({photos,videos},null,2)+'\n');
console.log(`Prepared ${Object.keys(photos).length} photographs/reference images and ${Object.keys(videos).length} source videos.`);
