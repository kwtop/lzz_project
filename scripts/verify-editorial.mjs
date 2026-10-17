import fs from 'node:fs/promises';
import path from 'node:path';
import {chromium} from 'playwright';

const base=process.env.TEST_URL||'http://127.0.0.1:4323';
const out=path.resolve(import.meta.dirname,'../docs/qa');
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const findings=[];
try{
 for(const width of [390,768,1440])for(const route of ['/about/','/machined-parts/']){
  const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
  await page.goto(base+route+'?v=editorial-qa',{waitUntil:'networkidle'});
  await page.evaluate(async()=>{const images=[...document.querySelectorAll('img[src*="/media/editorial/"],#company-archive img')];await Promise.all(images.map(async img=>{img.loading='eager';try{await img.decode();}catch{}}));});
  const result=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth-innerWidth,images:[...document.querySelectorAll('img[src*="/media/editorial/"],#company-archive img')].map(img=>({src:img.getAttribute('src'),loaded:img.complete&&img.naturalWidth>0,alt:img.alt})),archive:!!document.querySelector('#company-archive'),logosCollapsed:!document.querySelector('.logo-archive')?.open}));
  const errors=[];
  if(result.overflow>1)errors.push(`horizontal overflow ${result.overflow}px`);
  if(result.images.some(img=>!img.loaded||!img.alt))errors.push('editorial/source image missing or without alt');
  if(route==='/about/'&&(!result.archive||!result.logosCollapsed||result.images.length<5))errors.push('about archive or image set missing');
  if(route==='/machined-parts/'&&result.images.length!==1)errors.push('catalog editorial image missing');
  const name=`editorial-${width}-${route==='/about/'?'about':'products'}.jpg`;
  await page.screenshot({path:path.join(out,name),fullPage:true,type:'jpeg',quality:75});
  for(const selector of route==='/about/'?['.context-section','#company-archive']:['.product-editorial']){
   const sectionName=selector==='.context-section'?'contexts':selector==='#company-archive'?'archive':'catalog-editorial';
   await page.locator(selector).screenshot({path:path.join(out,`editorial-${width}-${sectionName}.jpg`),type:'jpeg',quality:82});
  }
  findings.push({width,route,...result,errors,screenshot:name});
  await page.close();
 }
}finally{await browser.close();}
await fs.writeFile(path.join(out,'editorial-qa.json'),JSON.stringify(findings,null,2)+'\n');
console.log(findings.map(({width,route,overflow,images,errors})=>({width,route,overflow,imageCount:images.length,errors})));
if(findings.some(item=>item.errors.length))process.exitCode=1;
