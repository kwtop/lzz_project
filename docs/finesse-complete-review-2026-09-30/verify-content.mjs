import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {load} from 'cheerio';

const directory='docs/finesse-complete-review-2026-09-30';
const normalized=value=>value.replace(/\s+/g,' ').trim();
const text=($,el)=>{const copy=$(el).clone();copy.find('br').replaceWith(' ');return normalized(copy.text());};
const pages={};
function walk(folder,callback){for(const item of fs.readdirSync(folder,{withFileTypes:true})){const file=path.join(folder,item.name);if(item.isDirectory())walk(file,callback);else callback(file);}}
walk('dist',file=>{
 if(!file.endsWith('.html'))return;
 const $=load(fs.readFileSync(file,'utf8'));
 $('script:not([type="application/ld+json"]),style').remove();
 const values=(selector,get)=>$(selector).map((_,el)=>get(el)).get().filter(Boolean).sort();
 pages[path.relative('dist',file).replaceAll('\\','/')]={
  title:$('title').text(),
  meta:values('meta[name],meta[property]',el=>JSON.stringify([$(el).attr('name')||$(el).attr('property'),$(el).attr('content')])),
  canonical:$('link[rel="canonical"]').attr('href')||null,
  jsonLd:$('script[type="application/ld+json"]').map((_,el)=>JSON.parse($(el).text())).get(),
  h1:values('h1',el=>text($,el)),
  blocks:values('h1,h2,h3,h4,h5,h6,p,li,dt,dd,figcaption,summary,th,td,label',el=>text($,el)),
  hrefs:values('a[href]',el=>$(el).attr('href')),
  media:values('img,video,source',el=>JSON.stringify([el.tagName,...['src','srcset','poster','alt'].map(key=>$(el).attr(key)||null)])),
  ids:values('[id]',el=>$(el).attr('id')),
  ctas:values('a.button[href],a.part-spec-link[href]',el=>JSON.stringify([$(el).attr('href'),text($,el)])),
 };
});
const protectedFiles=['src/components/QuoteForm.tsx','src/components/ProductExplorer.tsx','src/lib/inquiryContext.ts'];
walk('src/data',file=>protectedFiles.push(file));
const hashes=Object.fromEntries(protectedFiles.sort().map(file=>[file,createHash('sha256').update(fs.readFileSync(file)).digest('hex')]));
const current={pages,hashes};
fs.mkdirSync(directory,{recursive:true});
if(process.argv.includes('--capture')){
 fs.writeFileSync(path.join(directory,'before-content.json'),JSON.stringify(current,null,2));
 console.log(JSON.stringify({captured:Object.keys(pages).length,protectedFiles:protectedFiles.length}));
}else{
 const before=JSON.parse(fs.readFileSync(path.join(directory,'before-content.json'),'utf8'));
 assert.deepEqual(Object.keys(current.pages).sort(),Object.keys(before.pages).sort(),'Route set changed');
 assert.deepEqual(current.hashes,before.hashes,'Business logic or source data changed');
 const counts=items=>{const result=new Map();for(const item of items)result.set(item,(result.get(item)||0)+1);return result;};
 for(const[route,old]of Object.entries(before.pages)){
  const next=current.pages[route];
  for(const key of ['title','meta','canonical','jsonLd','h1'])assert.deepEqual(next[key],old[key],`${route}: ${key} changed`);
  for(const key of ['blocks','hrefs','media','ids','ctas']){const available=counts(next[key]);for(const[item,count]of counts(old[key]))assert.ok((available.get(item)||0)>=count,`${route}: ${key} lost ${JSON.stringify(item)}`);}
 }
 const result={status:'passed',pages:Object.keys(pages).length,protectedFiles:protectedFiles.length,checks:['routes and SEO metadata unchanged','all original headings, paragraphs, list items and labels retained','all original media sources, alt text and srcsets retained','original links, anchors and primary CTA retained','business logic and complete source-data directory unchanged']};
 fs.writeFileSync(path.join(directory,'content-verification.json'),JSON.stringify(result,null,2));
 console.log(JSON.stringify(result));
}
