import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {load} from 'cheerio';

const directory='docs/finesse-redesign-2026-09-30';
const baselineFile=path.join(directory,'before-content.json');
const normalized=value=>value.replace(/\s+/g,' ').trim();
function text($,el){const copy=$(el).clone();copy.find('br').replaceWith(' ');return normalized(copy.text());}
function inventory(){
 const pages={};
 function walk(directory){for(const entry of fs.readdirSync(directory,{withFileTypes:true})){
  const file=path.join(directory,entry.name);
  if(entry.isDirectory())walk(file);
  else if(file.endsWith('.html')){
   const route=path.relative('dist',file).replaceAll('\\','/');
   const $=load(fs.readFileSync(file,'utf8'));
   $('script:not([type="application/ld+json"]),style').remove();
   const meta=$('meta[name],meta[property]').map((_,el)=>[$(el).attr('name')||$(el).attr('property'),$(el).attr('content')]).get();
   const blocks=$('h1,h2,h3,h4,h5,h6,p,dt,dd,figcaption,summary,th,td').map((_,el)=>text($,el)).get().filter(Boolean).sort();
   pages[route]={title:$('title').text(),meta,canonical:$('link[rel="canonical"]').attr('href')||null,jsonLd:$('script[type="application/ld+json"]').map((_,el)=>JSON.parse($(el).text())).get(),h1:$('h1').map((_,el)=>text($,el)).get(),blocks,hrefs:$('a[href]').map((_,el)=>$(el).attr('href')).get().sort(),images:$('img[src]').map((_,el)=>$(el).attr('src')).get().sort(),ids:$('[id]').map((_,el)=>$(el).attr('id')).get().sort(),ctas:$('a.button[href],a.part-spec-link[href]').map((_,el)=>JSON.stringify([$(el).attr('href'),text($,el)])).get().sort()};
  }
 }}
 walk('dist');
 const protectedLogic=['src/components/QuoteForm.tsx','src/components/ProductExplorer.tsx','src/lib/inquiryContext.ts','src/data/catalog.json','src/data/seo.ts','src/data/resources.ts','src/data/presentation.ts'];
 const hashes=Object.fromEntries(protectedLogic.map(file=>[file,createHash('sha256').update(fs.readFileSync(file)).digest('hex')]));
 return{pages,hashes};
}
function counts(values){const result=new Map();for(const value of values)result.set(value,(result.get(value)||0)+1);return result;}
function retained(before,after,message){const available=counts(after);for(const[value,count]of counts(before))assert.ok((available.get(value)||0)>=count,`${message}: lost ${JSON.stringify(value)}`);}
const current=inventory();
if(process.argv.includes('--capture')){
 fs.writeFileSync(baselineFile,JSON.stringify(current,null,2));
 console.log(JSON.stringify({captured:Object.keys(current.pages).length,protectedLogic:Object.keys(current.hashes).length}));
}else{
 const baseline=JSON.parse(fs.readFileSync(baselineFile,'utf8'));
 assert.deepEqual(Object.keys(current.pages).sort(),Object.keys(baseline.pages).sort(),'Route set changed');
 assert.deepEqual(current.hashes,baseline.hashes,'Protected business logic or SEO data changed');
 for(const[route,before]of Object.entries(baseline.pages)){
  const after=current.pages[route];
  for(const key of ['title','meta','canonical','jsonLd','h1'])assert.deepEqual(after[key],before[key],`${route}: ${key} changed`);
  for(const key of ['blocks','hrefs','images','ids','ctas'])retained(before[key],after[key],`${route}: ${key}`);
 }
 const result={status:'passed',pages:Object.keys(current.pages).length,checks:['exact route set','title and all meta values','canonical and structured data','unchanged H1 text','all existing text blocks retained','all existing hrefs retained','all existing images retained','all existing anchor IDs retained','primary CTA labels and destinations retained','protected business logic and SEO data hashes unchanged']};
 fs.writeFileSync(path.join(directory,'content-verification.json'),JSON.stringify(result,null,2));
 console.log(JSON.stringify(result));
}
