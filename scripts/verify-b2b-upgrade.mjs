import {chromium} from 'playwright';

const origin='http://127.0.0.1:4323';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:390,height:844}});
const failures=[];
const check=(condition,message)=>{if(!condition)failures.push(message);};

for(const route of ['/', '/machined-parts/', '/capabilities/', '/capabilities/cnc-turning-service/', '/resources/ordering/prototype-vs-small-batch-cnc/', '/quote/']){
 const response=await page.goto(origin+route,{waitUntil:'networkidle'});
 check(response?.ok(),`${route}: HTTP response`);
 await page.evaluate(()=>document.fonts.ready);
 const size=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
 check(size.scroll<=size.client+2,`${route}: horizontal overflow ${size.scroll}/${size.client}`);
}

await page.goto(origin+'/resources/ordering/prototype-vs-small-batch-cnc/',{waitUntil:'networkidle'});
check(await page.locator('.decision-mobile-row').count()>=4,'mobile article comparison rows');
check(await page.locator('.decision-mobile-row').first().isVisible(),'mobile article comparison is visible');
check(!await page.locator('.decision-table-wrap').first().isVisible(),'desktop article table is hidden on mobile');

await page.goto(origin+'/quote/',{waitUntil:'networkidle'});
await page.locator('input[name="name"]').fill('Test Buyer');
await page.locator('input[name="email"]').fill('test@example.com');
await page.locator('select[name="material"]').selectOption('Aluminum');
await page.locator('input[name="quantity"]').fill('24');
await page.locator('textarea[name="project"]').fill('Machined housing with drawing revision A; please review critical bore fit.');
await page.getByRole('button',{name:'Prepare email draft'}).click();
check(await page.locator('.draft-result').isVisible(),'draft review visible');
check(!await page.locator('.quote-form form').isVisible(),'form not competing with review');
const draft=await page.locator('.draft-result pre').innerText();
check(draft.includes('Material: Aluminum')&&draft.includes('Quantity: 24'),'quote details retained in draft');
const email=await page.getByRole('link',{name:'Open email app'}).getAttribute('href');
check(email?.startsWith('mailto:roger@lzz-cnc.com?')&&!email.includes('test@example.com&'),'email app link present without sending');
await page.getByRole('button',{name:'Edit details'}).click();
check(await page.locator('input[name="quantity"]').inputValue()==='24','edit retains quantity');
check(await page.locator('select[name="material"]').inputValue()==='Aluminum','edit retains material');

await page.goto(origin+'/',{waitUntil:'networkidle'});
const menu=page.locator('.menu-toggle');
await menu.focus();
await page.keyboard.press('Enter');
check(await page.locator('#main-nav').isVisible(),'mobile keyboard menu opens');

await page.setViewportSize({width:1440,height:900});
await page.goto(origin+'/capabilities/cnc-turning-service/',{waitUntil:'networkidle'});
const imageSize=await page.locator('.turning-editorial img').first().evaluate(node=>({width:node.getBoundingClientRect().width,height:node.getBoundingClientRect().height}));
check(imageSize.height<600&&imageSize.width/imageSize.height>1.4,`turning image proportions ${JSON.stringify(imageSize)}`);

await browser.close();
console.log(JSON.stringify({checks:'responsive layout, mobile comparison, RFQ draft/edit, keyboard menu, turning image',failures}));
if(failures.length)process.exitCode=1;
