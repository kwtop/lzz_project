import {chromium} from 'playwright';
import fs from 'node:fs';
const b=await chromium.launch({channel:'chrome',headless:true});const p=await b.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));const results=[];
for(const width of [1440,768,390]){
 await p.setViewportSize({width,height:900});await p.goto('http://127.0.0.1:4323/',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
 for(const s of await p.locator('main section').all()){await s.scrollIntoViewIfNeeded();await p.waitForTimeout(150);}
 await p.evaluate(async()=>{await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));window.scrollTo(0,0)});
 const result=await p.evaluate(()=>({width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth+1,broken:[...document.querySelectorAll('main img')].filter(i=>!i.naturalWidth).map(i=>i.src),headings:[...document.querySelectorAll('main h2')].map(e=>e.textContent),height:document.documentElement.scrollHeight}));
 if(result.overflow||result.broken.length)throw Error(JSON.stringify(result));results.push(result);
 await p.screenshot({path:`docs/home-structure-2026-09-29/home-${width}.png`,fullPage:true});
 await p.locator('.home-evidence').screenshot({path:`docs/home-structure-2026-09-29/evidence-${width}.png`});
}
const links=await p.locator('main a').evaluateAll(es=>[...new Set(es.map(e=>e.getAttribute('href')).filter(x=>x.startsWith('/')))]);
for(const href of links){if(!(await p.request.get('http://127.0.0.1:4323'+href)).ok())throw Error(href)}
if(errors.length)throw Error(errors.join(','));fs.writeFileSync('docs/home-structure-2026-09-29/verification.json',JSON.stringify({results,links:links.length,errors},null,2));console.log(JSON.stringify(results));await b.close();
