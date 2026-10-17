import assert from 'node:assert/strict';
import {SITE,htmlPages,eligiblePages,companyRedirects,migration} from './build-seo.mjs';
const pages=htmlPages(),canonical=eligiblePages(pages),{catalog}=migration();
const root='/machined-parts/',gallery=root+'gallery/',examples=root+'machining-examples/';
const roots=[[root,'Machined parts, made to your drawing.'],[gallery,'Parts gallery'],[examples,'Machining examples']];
const oldPath=route=>route.replace(gallery,'/products/part-examples/').replace(examples,'/products/machining-studies/').replace(root,'/products/');
const newRoutes=canonical.filter(p=>p.startsWith(root));
assert.equal(newRoutes.length,46,'Three indexes,35 parts and8 machining examples');
assert.equal(newRoutes.filter(p=>p.startsWith(gallery)&&p!==gallery).length,catalog.products.length);
assert.equal(newRoutes.filter(p=>p.startsWith(examples)&&p!==examples).length,8);
for(const [route,title] of roots)assert.equal(pages.get(route).$('main h1').text().trim(),title);
for(const route of newRoutes){
 const {$}=pages.get(route),old=oldPath(route),legacy=pages.get(old)?.$;
 assert.equal($('link[rel="canonical"]').attr('href'),SITE+route);
 assert(!/noindex/i.test($('meta[name="robots"]').attr('content')||''));
 assert.equal(companyRedirects[old],route);
 assert(legacy,'Legacy address must retain a compatibility page');
 assert.equal(legacy('link[rel="canonical"]').attr('href'),SITE+route);
 assert(/noindex/i.test(legacy('meta[name="robots"]').attr('content')||''));
 assert(legacy('meta[http-equiv="refresh"]').attr('content')?.includes(route));
 assert.match(legacy('script').text(),/target\.search\s*=\s*location\.search/);
 assert.match(legacy('script').text(),/target\.hash\s*=\s*location\.hash/);
 if(route.startsWith(examples)&&route!==examples)assert.equal($('body').attr('data-page-template'),'read');
}
let menus=0,quoteReferences=0;
for(const [route,{$,excluded}] of pages){
 if(companyRedirects[route])continue;
 // Dated static audit/mock exports are evidence snapshots, not active site navigation.
 if(excluded&&!$('#main-nav').length)continue;
 if($('#main-nav').length){
  menus++;
  assert.deepEqual($('#main-nav>.nav-item>.nav-root').toArray().map(a=>$(a).text()),['Capabilities','Machined parts','Factory & quality','Resources','About LZZ'],route+': primary menu names');
  assert.equal($('#main-nav>.nav-item').eq(1).find('.nav-root').attr('href'),root);
  assert.deepEqual($('#main-nav>.nav-item').eq(1).find('.nav-panel a').toArray().map(a=>[$(a).text(),$(a).attr('href')]),[['Parts gallery',gallery],['Machining examples',examples]],route+': second-level navigation');
 }
 $('a[href]').each((_,el)=>{
  const href=$(el).attr('href'),url=new URL(href,SITE);
  if(url.origin!==SITE)return;
  assert(!url.pathname.startsWith('/products/'),route+': stale product link '+href);
  if(url.pathname==='/quote/'&&url.searchParams.has('product')){
   quoteReferences++;
   assert.equal(url.searchParams.get('source'),gallery+url.searchParams.get('product')+'/',route+': quote reference path');
  }
 });
 if(!excluded)assert(!$('script[type="application/ld+json"]').text().includes('/products/'),route+': stale structured-data URL');
}
assert.equal(pages.get(gallery).$('.px-grid a.px-card').length,35);
assert(!canonical.some(route=>route.startsWith('/products/')));
assert(quoteReferences>=35);
console.log(JSON.stringify({status:'passed',canonicalMachinedPages:newRoutes.length,parts:35,examples:8,legacyCompatibilityPages:newRoutes.length,sharedMenus:menus,quoteReferences,canonicalURLs:canonical.length}));

