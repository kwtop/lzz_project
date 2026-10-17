import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import {load} from 'cheerio';
import {chromium} from 'playwright';
import {manufacturing} from '../src/data/manufacturing.ts';
const catalog=JSON.parse(fs.readFileSync('src/data/catalog.json','utf8'));
const keys=new Set(catalog.categories.map(c=>c.key));
assert.deepEqual(Object.keys(manufacturing).sort(),catalog.products.map(p=>p.slug).sort());
for(const p of catalog.products){
 const details=manufacturing[p.slug];
 assert.ok(details.highlights.length>=2&&details.finishes&&details.applications,p.slug);
 assert.ok(details.tags.every(t=>keys.has(t)),p.slug+' valid discovery tags');
 const $=load(fs.readFileSync('dist/machined-parts/'+p.slug+'/index.html','utf8'));
 assert.equal($('.manufacturing-highlights li').length,2,p.slug);
 assert.ok($('.part-facts').text().includes(details.finishes),p.slug+' finish content');
 assert.equal($('.engineering-guidance').length,1,p.slug+' guidance is visible');
}
for(const c of catalog.categories){const $=load(fs.readFileSync('dist/capabilities/'+c.slug+'/index.html','utf8'));assert.equal($('.capability-overview article').length,3);}
const base=process.env.TEST_URL||'http://127.0.0.1:4323';
const output=fs.mkdtempSync(path.join(os.tmpdir(),'lzz-content-qa-'));
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
const go=async route=>{await page.goto(base+route);await page.waitForFunction(()=>!document.querySelector('astro-island[client="load"][ssr]'));};
try{
 await go('/machined-parts/');assert.match(await page.title(),/custom parts/i);assert.equal(await page.locator('.product-card').count(),12);
 const select=name=>page.getByRole('combobox',{name,exact:true});
 await select('Process').selectOption('CNC-Milling-Service');
 await select('Material').selectOption('Aluminum-CNC-Parts');
 await select('Order type').selectOption('Prototype-Machining');
 const aluminumSubjects=catalog.products.filter(p=>p.slug!=='small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv'&&(p.categories.includes('Aluminum-CNC-Parts')||/\baluminum\b/i.test(p.name)||['custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier','custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier'].includes(p.slug)));
 const expected=aluminumSubjects.filter(p=>['CNC-Milling-Service','Prototype-Machining'].every(t=>[...p.categories,...manufacturing[p.slug].tags].includes(t))).map(p=>'/machined-parts/'+p.slug+'/').sort();
 assert.ok(expected.length>0);
 assert.deepEqual((await page.locator('.product-card').evaluateAll(a=>a.map(a=>a.getAttribute('href')))).sort(),expected);
 await page.screenshot({path:path.join(output,'combined-filters-desktop.png')});
 await page.getByRole('button',{name:'Clear filters',exact:true}).click();assert.equal(await page.locator('.product-card').count(),35);
 await page.getByPlaceholder('Search parts, materials, processes…').fill('electropolishing');assert.ok(await page.locator('.product-card').count()>0);
 await select('Material').selectOption('Plastic-Machined-Parts');await page.getByText('No matching parts',{exact:true}).waitFor();
 await page.getByRole('button',{name:'Reset filters',exact:true}).click();assert.equal(await page.locator('.product-card').count(),35);
 await go('/capabilities/aluminum-cnc-parts/');assert.equal(await select('Material').count(),0);
 await select('Order type').selectOption('Prototype-Machining');assert.ok(await page.locator('.product-card').count()>0);
const part='/machined-parts/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/';
await go(part);assert.equal(await page.locator('.technical-disclosure').count(),0);assert.equal(await page.locator('.engineering-guidance').count(),1);
await page.getByRole('link',{name:'Discuss this part',exact:true}).click();assert.ok(new URL(page.url()).searchParams.get('part').includes('Engine Cover'));
 await go('/cases/');await page.locator('#main-nav summary').filter({hasText:'Factory & Quality'}).click();assert.equal(await page.locator('#main-nav').getByRole('link',{name:'Workshop Process Studies',exact:true}).getAttribute('href'),'/cases/');
 assert.ok((await page.locator('.case-boundary').innerText()).includes('not customer case studies'));
 const caseBoundary=await page.locator('.case-boundary').boundingBox(),firstCase=await page.locator('.case-card').first().boundingBox();
 assert.ok(firstCase.y>=caseBoundary.y+caseBoundary.height,'process-study boundary appears before cards');
 await go('/factory/');assert.match(await page.locator('body').innerText(),/40\+ pieces of machining and support equipment/);assert.doesNotMatch(await page.locator('body').innerText(),/40\+ CNC machines|7–20 days/);
 await go('/quality/');const qualityText=await page.locator('body').innerText();assert.match(qualityText,/±0\.01 mm may be used as an engineering reference/);assert.match(qualityText,/not a general part tolerance or a guarantee/);assert.match(qualityText,/confirm the instrument range, current calibration evidence and availability of a project-specific measurement record/);assert.doesNotMatch(qualityText,/±0\.005 mm/);await page.locator('#quality-management summary').filter({hasText:'ISO 9001 certification & order checks'}).click();const certificationText=await page.locator('#quality-management').innerText();assert.match(certificationText,/LZZ is ISO 9001 certified/);assert.match(certificationText,/enterprise-recognition documents shown on our About page are separate awards/);assert.match(certificationText,/certificate details and applicable scope/);
 await go('/capabilities/5-axis-cnc-machining/');assert.match(await page.locator('body').innerText(),/Machine travel, load and maximum part envelope are not published here/);
 await go('/capabilities/prototype-machining/');assert.match(await page.locator('body').innerText(),/7–14 business days/);assert.match(await page.locator('body').innerText(),/Production, from 1 piece/);assert.doesNotMatch(await page.locator('body').innerText(),/±0\.01 mm/);
 await go('/capabilities/low-volume-production/');assert.match(await page.locator('body').innerText(),/7–14 business days/);assert.match(await page.locator('body').innerText(),/Production, from 1 piece/);
 await go('/resources/ordering/rfq-checklist/');const rfqText=await page.locator('body').innerText();assert.match(rfqText,/Orders start at 1 piece/);assert.match(rfqText,/7–14 business days after drawing and order confirmation, including surface finishing/);assert.match(rfqText,/standards and certificates required for this part or program/);assert.match(rfqText,/include the overall envelope, stock dimensions and part weight/);
 await go('/resources/how-we-work/');const orderText=await page.locator('body').innerText();assert.match(orderText,/7–14 business days after drawing and order confirmation, including surface finishing/);assert.match(orderText,/Incoterm and responsibility for customs, duties and taxes/);
 await go('/resources/technical-guides/material-and-finish-checklist/');assert.match(await page.locator('body').innerText(),/Name the required finish standard and revision/);
 await go('/quote/');assert.match(await page.locator('body').innerText(),/no response-time estimate is published/);
 await go('/resources/');assert.equal(await page.locator('.resource-grid> a p').count(),7,'buyer guide cards show their descriptions');
 await go('/capabilities/');assert.equal(await page.locator('.capability-directory-links>a').count(),10);
 assert.equal(await page.locator('.capability-directory-group header p').count(),3,'capability groups explain how to choose');
 await page.locator('#main-nav summary').filter({hasText:'Capabilities'}).click();await page.getByRole('link',{name:'Starting with a sample',exact:true}).click();assert.equal(new URL(page.url()).hash,'#sample-to-part');assert.equal(await page.locator('#sample-to-part li').count(),3);
 for(const width of [1440,768,390]){
  await page.setViewportSize({width,height:width===390?844:1000});
  for(const [name,route] of Object.entries({capabilities:'/capabilities/',products:'/machined-parts/',aluminum:'/capabilities/aluminum-cnc-parts/',part})){
   await go(route);await page.evaluate(async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));});
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,name+' '+width);
   assert.equal(await page.locator('h1').count(),1);assert.equal(await page.locator('vite-error-overlay').count(),0);
   await page.screenshot({path:path.join(output,name+'-'+width+'.png'),fullPage:width!==390});
  }
 }
 const nojs=await browser.newContext({javaScriptEnabled:false});const staticPage=await nojs.newPage();await staticPage.goto(base+'/machined-parts/');assert.equal(await staticPage.locator('noscript li a').count(),35);await nojs.close();
 assert.deepEqual(errors,[]);
 console.log(JSON.stringify({status:'passed',products:35,categories:10,combinedMatches:expected.length,viewports:[1440,768,390],noJavaScriptLinks:35,errors,screenshots:output},null,2));
}finally{await browser.close();}
