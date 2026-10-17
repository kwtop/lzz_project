import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {chromium} from 'playwright';

const base=process.env.TEST_URL||'http://127.0.0.1:4323';
const sourceRoot='D:/lzz/原始资料';
const output=new URL('../docs/qa/',import.meta.url);
await fs.mkdir(output,{recursive:true});
const photos=JSON.parse(await fs.readFile(new URL('../src/data/evidence.generated.json',import.meta.url),'utf8'));
const routes=[
 {path:'/',focus:'.inside-lzz'},
 {path:'/about/',focus:'#company-archive'},
 {path:'/factory/',focus:'.equipment-overview'},
 {path:'/quality/',focus:'.quality-overview'},
 {path:'/cases/',focus:'.cases-grid'},
 {path:'/cases/five-axis-machining-multi-face-parts/',focus:'.case-hero'},
 {path:'/cases/turning-then-milling-cylindrical-parts/',focus:'.case-hero'},
 {path:'/cases/two-stage-cnc-milling/',focus:'.case-hero'},
 {path:'/cases/milling-a-pocketed-enclosure-form/',focus:'.case-hero'},
 {path:'/cases/milling-prismatic-components/',focus:'.case-hero'},
 {path:'/resources/',focus:'.resource-grid'},
 {path:'/resources/technical-guides/cnc-process-selection/',focus:'.process-comparison-photos'},
 {path:'/resources/ordering/prototype-vs-small-batch-cnc/',focus:'.decision-table-wrap'},
 {path:'/resources/ordering/custom-cnc-parts-shipping-checklist/',focus:'.shipment-history-gallery'},
 {path:'/resources/technical-guides/material-and-finish-checklist/',focus:'.decision-table-wrap'},
];
const failures=[];const screenshots=[];
for(const photo of Object.values(photos)){
 const file=path.join(sourceRoot,photo.source);
 const hash=crypto.createHash('sha256').update(await fs.readFile(file)).digest('hex');
 if(hash!==photo.sha256)failures.push(`Source hash mismatch: ${photo.id}`);
}
const browser=await chromium.launch({channel:'chrome',headless:true});
for(const width of [390,768,1440]){
 const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 for(let i=0;i<routes.length;i++){
  const {path:route,focus:targetSelector}=routes[i],slug=route==='/'?'home':route.split('/').filter(Boolean).at(-1);
  const response=await page.goto(base+route,{waitUntil:'domcontentloaded'});
  if(response?.status()!==200)failures.push(`${width} ${route}: HTTP ${response?.status()}`);
  await page.evaluate(async()=>{document.querySelectorAll('img').forEach(img=>img.loading='eager');await document.fonts.ready;await Promise.all([...document.images].map(img=>img.decode().catch(()=>{})));});
  const status=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,broken:[...document.images].filter(img=>!img.naturalWidth).map(img=>img.src),missingAlt:[...document.images].filter(img=>img.src.includes('/evidence/')&&!img.alt).map(img=>img.src),aiLabels:[document.querySelector('main')?.innerText||'',...[...document.querySelectorAll('img,[title],[aria-label]')].flatMap(node=>['alt','title','aria-label'].map(name=>node.getAttribute(name)||''))].filter(text=>/AI[- ]generated|AI\s*生成/i.test(text))}));
  if(status.overflow)failures.push(`${width} ${route}: horizontal overflow`);
  if(status.broken.length)failures.push(`${width} ${route}: broken images ${status.broken.join(',')}`);
  if(status.missingAlt.length)failures.push(`${width} ${route}: missing evidence alt`);
  if(status.aiLabels.length)failures.push(`${width} ${route}: AI generation labels remain ${status.aiLabels.join(',')}`);
  const target=page.locator(targetSelector);
  await target.scrollIntoViewIfNeeded();
  const name=`evidence-${width}-${slug}.jpg`;
  await page.screenshot({path:new URL(name,output).pathname.replace(/^\/(\w:)/,'$1'),type:'jpeg',quality:78});
  screenshots.push(name);
 }
 if(errors.length)failures.push(`${width}: page errors ${errors.join('; ')}`);
 await page.close();
}
await browser.close();
const result={routes:routes.length,widths:[390,768,1440],sourceHashes:Object.keys(photos).length,screenshots,failures};
await fs.writeFile(new URL('evidence-qa.json',output),JSON.stringify(result,null,2)+'\n');
console.log(result);
if(failures.length)process.exitCode=1;
