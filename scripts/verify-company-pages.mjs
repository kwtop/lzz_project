import fs from 'node:fs';
import assert from 'node:assert/strict';
import {load} from 'cheerio';
import {htmlPages,companyRedirects,SITE} from './build-seo.mjs';
const pages=htmlPages();
const expected=['/about/','/about/company-news/','/contact/'];
for(const [route,{$,excluded}] of pages){
 if(excluded)continue;
 assert.deepEqual($('.nav-panel-about a').map((_,a)=>$(a).attr('href')).get(),expected,`${route}: company menu must link to three standalone pages`);
 for(const href of $('a[href]').map((_,a)=>$(a).attr('href')).get())assert.ok(!companyRedirects[href],`${route}: links to old news address ${href}`);
}
for(const route of expected){
 assert.ok(pages.has(route),`${route}: page exists`);
 const {$}=pages.get(route);
 assert.equal($('link[rel=canonical]').attr('href'),SITE+route);
 assert.equal($('.nav-panel-about a[aria-current=page]').attr('href'),route);
}
const about=pages.get('/about/').$;
assert.equal(about('.ab-document').length,3,'All three original documents restored to profile');
assert.equal(about('.company-archive').length,0,'Complete archive moved out of profile');
assert.ok(about('#documents').length,'Certificate section has a stable anchor');
const news=pages.get('/about/company-news/').$;
assert.equal(news('.category-story').length,5,'Five news stories preserved');
assert.equal(news('.company-archive').length,1,'Original photo archive retained on news hub');
for(const [from,to] of Object.entries(companyRedirects)){
 const destination=to.split('#')[0];
 assert.ok(pages.get(destination)&&!pages.get(destination).excluded,`${from}: destination exists`);
 if(to==='/about/company-news/'||destination==='/about/')continue;
 const {$}=pages.get(to);
 assert.equal($('.nav-panel-about a[aria-current=page]').attr('href'),'/about/company-news/');
 const structured=JSON.parse($('script[type="application/ld+json"]').first().text());
 const crumbs=structured['@graph'].find(x=>x['@type']==='BreadcrumbList').itemListElement;
 assert.ok(crumbs.some(x=>x.item===SITE+'/about/company-news/'),`${to}: correct news parent`);
}
const contact=pages.get('/contact/').$;
assert.ok(contact('main a[href="mailto:roger@lzz-cnc.com"]').length);
assert.ok(contact('main a[href="https://wa.me/8613858102479"]').length);
assert.ok(contact('main a[href="/quote/"]').length);
assert.equal(contact('form').length,0,'Contact page does not add a misleading submission form');
const sitemap=fs.readFileSync('dist/sitemap.xml','utf8');
for(const from of Object.keys(companyRedirects))assert.ok(!sitemap.includes(SITE+from),'Old news address excluded from sitemap');
console.log('Company pages verified: 3 standalone menu destinations, 3 documents on profile, 5 news stories, photo archive, contact actions and 7 migrated addresses.');
