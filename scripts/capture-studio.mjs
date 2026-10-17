import {chromium} from 'playwright';
import fs from 'node:fs';
const round=process.argv[2]||'1';
const dir=`docs/studio-refinement/round-${round}`;fs.mkdirSync(dir,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
const routes=[['home','/'],['products','/machined-parts/'],['detail','/machined-parts/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/'],['capability','/capabilities/aluminum-cnc-parts/'],['factory','/factory/'],['quality','/quality/'],['quote','/quote/']];
for(const [name,url] of routes){await page.goto('http://127.0.0.1:4323'+url);await page.evaluate(()=>document.fonts.ready);await page.evaluate(async()=>{for(const img of document.images){img.loading='eager';}await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));});await page.evaluate(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=700){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,80));}window.scrollTo(0,0);});await page.waitForTimeout(700);await page.screenshot({path:`${dir}/${name}-desktop.png`,fullPage:true});}
await page.setViewportSize({width:390,height:844});
for(const [name,url] of routes.filter(([n])=>['home','products','quote'].includes(n))){await page.goto('http://127.0.0.1:4323'+url);await page.evaluate(()=>document.fonts.ready);await page.evaluate(async()=>{for(const img of document.images){img.loading='eager';}await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));});await page.evaluate(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=700){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,80));}window.scrollTo(0,0);});await page.waitForTimeout(700);await page.screenshot({path:`${dir}/${name}-mobile.png`,fullPage:true});}
await browser.close();console.log(dir);
