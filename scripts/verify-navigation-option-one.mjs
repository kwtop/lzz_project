import {chromium} from 'playwright';
import fs from 'node:fs';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage();const results=[];const errors=[];
page.on('pageerror',e=>errors.push(e.message));
for(const width of [1440,1024,768,390]){
 await page.setViewportSize({width,height:width<961?844:900});
 for(const route of ['/','/machined-parts/','/resources/technical-guides/']){
  await page.goto('http://127.0.0.1:4323'+route,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
  if(width<961)await page.locator('.menu-toggle').click();
  const groups=page.locator('#main-nav .nav-group');
  for(let i=0;i<5;i++){
   await groups.nth(i).locator('summary').click();await page.waitForTimeout(250);
   const panel=groups.nth(i).locator('.nav-panel');
   const box=await panel.boundingBox();
   if(!box||box.x< -1||box.x+box.width>width+1)throw Error('Panel overflow '+width+route+i);
   if(await page.locator('#main-nav details[open]').count()!==1)throw Error('Menu exclusivity');
   await page.screenshot({path:`docs/navigation-option-one/${route==='/'?'home':'products'}-${width}-${i}.png`});
   await groups.nth(i).locator('summary').focus();await page.keyboard.press('Escape');
   if(await groups.nth(i).getAttribute('open')!==null)throw Error('Escape failed');
  }
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);if(overflow)throw Error('Page overflow');
  results.push({width,route,panels:'pass',escape:'pass',overflow:false});
 }
}
await page.setViewportSize({width:1440,height:900});await page.goto('http://127.0.0.1:4323/');
const summary=page.locator('#main-nav summary').first();await summary.focus();await page.keyboard.press('Enter');await page.keyboard.press('Tab');
if(!await page.locator('.nav-panel-capabilities a').first().evaluate(e=>e===document.activeElement))throw Error('Keyboard entry');
await page.mouse.click(40,700);if(await page.locator('#main-nav details[open]').count())throw Error('Outside click');
const links=await page.locator('#main-nav a').evaluateAll(es=>es.map(e=>e.getAttribute('href')));
for(const href of links){const response=await page.request.get('http://127.0.0.1:4323'+href);if(!response.ok())throw Error('Broken '+href);}
if(errors.length)throw Error(errors.join('\n'));
fs.writeFileSync('docs/navigation-option-one/verification.json',JSON.stringify({results,keyboard:'pass',outsideClick:'pass',links:links.length,errors},null,2));
console.log('Navigation checks passed, '+links.length+' destinations.');await browser.close();
