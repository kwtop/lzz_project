import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {load} from 'cheerio';

// Built-site integrity. Rendered interactions and responsive checks run in the controlled browser.
const dist=path.resolve('dist');
const sitemap=load(fs.readFileSync(path.join(dist,'sitemap.xml'),'utf8'),{xmlMode:true});
const routes=sitemap('loc').map((_,element)=>new URL(sitemap(element).text()).pathname).get();
const htmlFiles=fs.readdirSync(dist,{recursive:true}).filter(file=>file.endsWith('.html'));
const redirects=new Map(fs.readFileSync(path.join(dist,'_redirects'),'utf8').split(/\r?\n/).map(line=>line.trim().split(/\s+/)).filter(parts=>parts.length>=3&&/^30[128]$/.test(parts[2])).map(parts=>[parts[0],parts[1]]));
const failures=[];
const cache=new Map();
let localReferences=0,sectionReferences=0;
function documentAt(route) {
 if(!cache.has(route))cache.set(route,load(fs.readFileSync(path.join(dist,route,'index.html'),'utf8')));
 return cache.get(route);
}
function targetPath(route) {
 let current=route;
 for(let i=0;i<8&&redirects.has(current);i++)current=redirects.get(current);
 return current;
}
for(const file of htmlFiles) {
 const $=load(fs.readFileSync(path.join(dist,file),'utf8'));
 $('a[href],img[src],script[src],link[href]').each((_,element)=>{
  const ref=$(element).attr('href')||$(element).attr('src');
  if(!ref?.startsWith('/')||ref.startsWith('//'))return;
  const route=decodeURIComponent(ref.split(/[?#]/)[0]);
  const local=path.join(dist,route);
  localReferences++;
  if(!fs.existsSync(local)&&!fs.existsSync(path.join(local,'index.html')))failures.push(file+': missing '+route);
 });
}
for(const route of routes) {
 const $=documentAt(route);
 if($('h1').length!==1)failures.push(route+': expected one h1');
 const ids=new Set();
 $('[id]').each((_,element)=>{const id=$(element).attr('id');if(ids.has(id))failures.push(route+': duplicate #'+id);ids.add(id);});
 $('a[href]').each((_,element)=>{
  const href=$(element).attr('href');
  if(!href||/^(mailto:|tel:|javascript:|data:)/i.test(href))return;
  const link=new URL(href,'https://www.lzz-cnc.com'+route);
  if(link.origin!=='https://www.lzz-cnc.com'||!link.hash||link.hash==='#')return;
  const destination=targetPath(link.pathname);
  if(!routes.includes(destination))return;
  sectionReferences++;
  const target=documentAt(destination);
  const hash=decodeURIComponent(link.hash.slice(1));
  if(!target('[id]').toArray().some(item=>target(item).attr('id')===hash))failures.push(route+': missing section '+destination+'#'+hash);
 });
 if(/Prepare an RFQ email|Prepare inquiry draft|Copy draft|Clear saved input|Review the draft|from your email app/i.test($('main').text()))failures.push(route+': retired inquiry instructions remain');
}
for(const route of ['/quote/','/about/contact/','/resources/faq/'])if(!/12 hours/.test(documentAt(route)('main').text()))failures.push(route+': missing reply time');
const quote=documentAt('/quote/');
assert.deepEqual(quote('.inquiry-form [required]').map((_,element)=>quote(element).attr('name')).get(),['name','country','phone']);
assert.equal(quote('.inquiry-form input[name="method"][checked]').attr('value'),'phone');
assert.equal(quote('.inquiry-form input[type="file"]').length,1);
assert.deepEqual(failures,[],'Built routes, headings, section links, local assets and current inquiry copy');
console.log(JSON.stringify({status:'passed',canonicalRoutes:routes.length,htmlFiles:htmlFiles.length,localReferences,sectionReferences,checks:['formal headings','unique IDs','internal files','section targets','new inquiry fields','reply promise','retired draft instructions']},null,2));
