import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {ROOT,SITE,htmlPages,eligiblePages,migration,resourceRoutes} from './build-seo.mjs';
const pages=htmlPages(),canonical=eligiblePages(pages),{rules}=migration();
const groups=[['/resources/ordering/','RFQ & ordering',5],['/resources/technical-guides/','Technical guides',3]];
const retiredPrefixes=['/resources/ordering-guide/','/resources/drawings-and-ordering/','/resources/processes-materials-finishes/','/resources/production-and-shipping/'];
const retired=route=>retiredPrefixes.some(prefix=>route.startsWith(prefix))||Object.keys(resourceRoutes.guides).some(slug=>route==='/resources/'+slug+'/')||Object.keys(resourceRoutes.sourceArticleAliases).some(slug=>route==='/resources/'+slug+'/');
const entities=$=>$('script[type="application/ld+json"]').toArray().flatMap(el=>{const value=JSON.parse($(el).text());return value['@graph']||[value];});
const activeResources=canonical.filter(route=>route.startsWith('/resources/'));
assert.equal(activeResources.length,12,'Hub, two categories, FAQ and eight guides');
assert.equal(pages.get('/resources/').$('.rh-topics a').length,3);
assert.deepEqual(pages.get('/resources/').$('.rh-topics a').toArray().map(el=>pages.get('/resources/').$(el).attr('href')),[...groups.map(g=>g[0]),'/resources/faq/']);
for(const [category,title,count] of groups){
 const {$}=pages.get(category);
 assert.equal($('main h1').text().trim(),title);
 const guides=$('.rh-guide-list a').toArray().map(el=>$(el).attr('href'));
 assert.equal(guides.length,count);
 assert(guides.every(href=>href.startsWith(category)&&Object.values(resourceRoutes.guides).includes(href)));
 assert.equal($('main img').length,0,'Category directory must not push its article links below decorative images');
 const list=entities($).find(entity=>entity['@type']==='ItemList');
 assert.equal(list.numberOfItems,count);
 assert.deepEqual(new Set(list.itemListElement.map(item=>new URL(item.url).pathname)),new Set(guides));
 for(const href of guides){
  const p=pages.get(href);assert(p,'Article exists: '+href);
  assert.equal(p.$('link[rel="canonical"]').attr('href'),SITE+href);
  const trail=entities(p.$).find(entity=>entity['@type']==='BreadcrumbList').itemListElement;
  assert.equal(trail.length,4);
  assert.deepEqual(trail.map(item=>new URL(item.item).pathname),['/','/resources/',category,href]);
  assert.equal(trail[2].name,title);
  assert.equal(p.$('.site-breadcrumb a').eq(2).attr('href'),category);
 }
}
let menus=0,resourceLinks=0;
for(const [route,{$,excluded}] of pages){
 assert(!retired(route),'Retired route still generated: '+route);
 if(excluded&&!$('#main-nav').length)continue;
 if($('#main-nav').length){
  menus++;
  const section=$('#main-nav .nav-root[href="/resources/"]').closest('.nav-item');
  assert.deepEqual(section.find('.nav-panel a').toArray().map(el=>[$(el).text(),$(el).attr('href')]),[...groups.map(([href,title])=>[title,href]),['FAQ','/resources/faq/']],route+': resource menu');
 }
 $('a[href]').each((_,el)=>{
  const url=new URL($(el).attr('href'),SITE);
  if(url.origin!==SITE)return;
  assert(!retired(url.pathname),route+': retired internal URL '+url.pathname);
  if(url.pathname.startsWith('/resources/')){
   resourceLinks++;
   assert(pages.has(url.pathname),route+': missing resource destination');
   if(url.hash)assert(pages.get(url.pathname).$('[id]').toArray().some(target=>pages.get(url.pathname).$(target).attr('id')===decodeURIComponent(url.hash.slice(1))),route+': missing resource anchor '+url.href);
  }
 });
 if(!excluded){for(const entity of entities($))assert(!retiredPrefixes.some(prefix=>JSON.stringify(entity).includes(prefix)),route+': stale structured-data path');}
}
for(const [from] of rules)assert(!retired(from),'Resources legacy redirect still configured: '+from);
assert.equal(pages.get('/resources/faq/').$('.rs-question').length,15);
const rfq=pages.get(resourceRoutes.guides['rfq-checklist']).$;
assert.equal(rfq('[data-rs-copy-rfq]').length,1);
assert(rfq('.ce-request-brief').text().includes('Material'));
for(const file of ['cnc-rfq-brief.txt','order-acceptance-checklist.txt'])assert(fs.statSync(path.join(ROOT,'dist/downloads',file)).size>0);
console.log(JSON.stringify({status:'passed',resourcePages:activeResources.length,orderingGuides:5,technicalGuides:3,faqQuestions:15,sharedMenus:menus,resourceLinks,retiredResourceRedirects:0}));
