import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL,fileURLToPath} from 'node:url';
import {chromium} from 'playwright';
import sharp from 'sharp';

const root='D:/lzz/原始资料';
const output=new URL('../docs/qa/',import.meta.url);
await fs.mkdir(output,{recursive:true});
async function walk(dir){const all=[];for(const entry of await fs.readdir(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);all.push(...(entry.isDirectory()?await walk(file):[file]));}return all;}
const files=(await walk(root)).filter(file=>/\.mp4$/i.test(file));
const decision=source=>{
 if(source.includes('29寸显示屏外壳'))return 'Do not publish: vertical handheld footage includes an identifiable person and is not suitable for the current premium page layout.';
 if(source.includes('PEEK材质'))return 'Do not publish: 544×960 handheld footage is too soft for a prominent material page; use only after a better master is supplied.';
 return 'Do not publish in this release: supplemental material footage is outside the three documented case sets and does not improve the primary page presentation.';
};
const browser=await chromium.launch({channel:'chrome',headless:true});
const review=[];const thumbnails=[];
for(const file of files){
 const page=await browser.newPage({viewport:{width:960,height:720}});
 const source=path.relative(root,file).split(path.sep).join('/');
 try{
  await page.goto(pathToFileURL(file).href,{waitUntil:'domcontentloaded',timeout:15000});
  await page.locator('video').waitFor({timeout:10000});
  await page.waitForFunction(()=>{const v=document.querySelector('video');return v&&Number.isFinite(v.duration)&&v.videoWidth>0;},{timeout:15000});
  const meta=await page.locator('video').evaluate(v=>({duration:v.duration,width:v.videoWidth,height:v.videoHeight}));
  const stamps=[.1,.5,.9].map(frac=>Math.max(0,Math.min(meta.duration-.1,meta.duration*frac)));
  const frames=[];
  for(let i=0;i<stamps.length;i++){
   await page.locator('video').evaluate(async(v,time)=>{v.currentTime=time;await new Promise(resolve=>v.addEventListener('seeked',resolve,{once:true}));},stamps[i]);
   const frame=await page.locator('video').screenshot();
   frames.push(frame);
   thumbnails.push({input:await sharp(frame).resize({width:320,height:200,fit:'contain',background:'#202328'}).png().toBuffer(),left:i*320,top:review.length*240});
  }
  review.push({source,...meta,review:'frames-captured',stamps,publish:false,decision:decision(source)});
 }catch(error){review.push({source,review:'decode-failed',reason:String(error.message).slice(0,200)});}
 await page.close();
}
await browser.close();
if(thumbnails.length){const height=review.length*240;await sharp({create:{width:960,height,channels:4,background:'#202328'}}).composite(thumbnails).webp({quality:82}).toFile(fileURLToPath(new URL('video-contact-sheet.webp',output)));}
await fs.writeFile(new URL('video-review.json',output),JSON.stringify(review,null,2)+'\n');
console.log(review);
