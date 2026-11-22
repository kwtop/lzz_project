import fs from 'node:fs';
import path from 'node:path';
import {load} from 'cheerio';
import {createHash} from 'node:crypto';

const root = process.argv[2] || 'dist';
const site = 'https://www.lzz-cnc.com';
const online = process.argv.includes('--online');
const read = route => fs.readFileSync(path.join(root,route.slice(1),'index.html'),'utf8');
const map = JSON.parse(fs.readFileSync('src/data/spanishRelease.json','utf8')).routes;
const digest = values => createHash('sha256').update(JSON.stringify(values)).digest('hex');
const errors = [];
const verify = (route, condition, problem) => {if (!condition) errors.push(route+' '+problem);};
const loadPage = html => load(html,{scriptingEnabled:false});
const translations = JSON.parse(fs.readFileSync('src/data/es/translated-pages.json','utf8'));
const mobileLabels = $ => $('main td[data-label]').map((_,el)=>$(el).attr('data-label')).get();
const elements = 'main h1, main h2, main h3, main h4, main section, main figure, main table, main tr, main td, main th, main details, main img, main source, main video, main form, main [download]';
function landmarks($) {
 return $(elements).toArray().map(el => {
  const {name} = el;
  const attributes = ['id','src','srcset','poster','class','role','type','name'];
  return [name,...attributes.map(key=>$(el).attr(key) || '')];
 });
}
const schema = $ => $('script[type="application/ld+json"]').toArray().flatMap(el => {
 const data=JSON.parse($(el).text());
 return data['@graph'] || [data];
});
const localPath = (url, base) => {
 const target = new URL(url,site+base);
 return target.origin===site ? target : null;
};
function staticFingerprint($) {
 return digest([landmarks($),mobileLabels($),$('main h1,main h2, main h3, main p, main td, main th, title').map((_,el)=>$(el).text().replace(/\s+/g,' ').trim()).get(),schema($)]);
}
function normalizeCloudflare($) {
 $('.__cf_email__[data-cfemail]').each((_, el) => {
  const data = $(el).attr('data-cfemail');
  if (!data || data.length % 2 !== 0) return;
  const key = Number.parseInt(data.slice(0,2),16);
  const parts = data.slice(2).match(/../g) || [];
  $(el).replaceWith('<span>'+parts.map(part=>String.fromCharCode(Number.parseInt(part,16)^key)).join('')+'</span>');
 });
 $('main form iframe').remove();
}
const stats = {pairs:0, sections:0, images:0, tables:0, cases:0, guideArticles:0, links:0, onlinePairs:0};
const pairs = new Map(map.map(es => [new URL(loadPage(read(es))('link[hreflang=en]').attr('href')).pathname, es]));
const redirects = new Map(fs.readFileSync(path.join(root,'_redirects'),'utf8').split(/\r?\n/).filter(line=>line && !line.startsWith('#')).map(line=>line.trim().split(/\s+/).slice(0,2)));
const frag = (url, cache) => {
 const route = url.pathname.endsWith('/') ? url.pathname : url.pathname+'/';
 if (!cache.has(route)) cache.set(route,loadPage(read(route)));
 const id=decodeURIComponent(url.hash.slice(1));
 return cache.get(route)('[id]').toArray().some(node=>node.attribs.id===id);
};
const cache = new Map();
async function verifyPair([en,es]) {
 const a = loadPage(read(en)), b = loadPage(read(es));
 stats.pairs++;
 stats.sections += a('main section').length;
 stats.images += a('main img').length;
 stats.tables += a('main table').length;
 stats.cases += Number(en.includes('/machining-examples/') && en !== '/machined-parts/machining-examples/');
 stats.guideArticles += Number(/^\/resources\/(?:technical-guides|ordering)\/[^/]+\/$/.test(en));
 const aLandmarks=landmarks(a), bLandmarks=landmarks(b);
 const normalize = list => list.map(row=>{
  // The locale-aware quote uses the same inputs and English assets; one CSS
  // class on the Spanish form shell controls text expansion.
  if(en==='/quote/') return [row[0],row[1],row[2],row[3],row[4],row[6],row[7],row[8]];
  return row;
 });
 verify(es,digest(normalize(aLandmarks))===digest(normalize(bLandmarks)),
  'different markup: '+(aLandmarks.findIndex((x,i)=>JSON.stringify(x)!==JSON.stringify(bLandmarks[i])))+' '+aLandmarks.length+'/'+bLandmarks.length);
 verify(es,b('html').attr('lang')==='es' && b('link[rel=canonical]').attr('href')===site+es,'invalid canonical/language');
 verify(es,b('link[hreflang=es]').attr('href')===site+es && b('link[hreflang=en]').attr('href')===site+en && b('link[hreflang=x-default]').attr('href')===site+en,'invalid hreflang');
 verify(en,a('link[hreflang=es]').attr('href')===site+es,'missing reverse hreflang');
 verify(es,b('.lzz-language-switch').attr('href')===en && a('.lzz-language-switch').attr('href')===es,'broken language selector');
 verify(es,b('main h1').length===1 && Boolean(b('meta[name=description]').attr('content')),'missing page content or metadata');
 if (en === '/') {
  const viewer = b('script[src*="/_astro/SiteInteractions."]').attr('src');
  verify(es,b('[data-media-zoom]').text().trim()==='Ampliar imagen','incorrect image viewer label before opening');
  const script = viewer ? fs.readFileSync(path.join(root,viewer.slice(1)),'utf8') : '';
  verify(es,script.includes('Ampliar imagen') && script.includes('Ajustar imagen') && script.includes('Estás sin conexión'),
   'missing Spanish image viewer or connection text');
  verify(es,!script.includes('Zoom in') && !script.includes('Fit image'),'English image viewer labels after interaction');
 }
 const expectedLabels = mobileLabels(a).map(label => {
  const key = label.replaceAll('&','&amp;');
  return Object.hasOwn(translations,key) ? load(translations[key],null,false).text() : label;
 });
 verify(es,digest(expectedLabels)===digest(mobileLabels(b)),'incorrect mobile table labels');
 verify(es,digest(schema(a).map(x=>x['@type']))===digest(schema(b).map(x=>x['@type'])),'schema types differ');
 verify(es,schema(b).filter(x=>x['@type']==='WebPage').every(x=>x.url===site+es && x.inLanguage==='es'),'wrong schema language or URL');
 const interactive = 'main a:not([download]), main input, main select, main button, main dialog, main astro-island';
 verify(es,a(interactive).length===b(interactive).length,'different control count '+a(interactive).length+'/'+b(interactive).length);
 for (const el of b('main a[href]').toArray()) {
  let url;
  try {url=localPath(b(el).attr('href'),es);} catch {continue;}
  if (!url || /\.(\w{2,6})\/?$/.test(url.pathname)) continue;
  stats.links++;
  const to=redirects.get(url.pathname);
  const p=path.join(root,(to ? new URL(to,site).pathname : url.pathname).slice(1),'index.html');
  verify(es,fs.existsSync(p),'missing internal link '+url.pathname);
  if (url.hash && url.pathname.startsWith('/es/') && fs.existsSync(p)) verify(es,frag(url,cache),'missing fragment '+url.pathname+url.hash);
  verify(es,!pairs.has(url.pathname),'English link in Spanish body '+url.pathname);
 }
 if(online){
  const results=await Promise.all([en,es].map(async route=>{
   const response=await fetch(site+route,{signal:AbortSignal.timeout(20000)});
   verify(route,response.ok && response.url===site+route,'HTTP '+response.status+' '+response.url);
   verify(route,!/noindex/i.test(response.headers.get('x-robots-tag')||''),'unexpected noindex');
   const $=loadPage(await response.text());
   normalizeCloudflare($);
   return $;
  }));
  results.forEach(($,i) => {
   const local=i===0?a:b, route=i===0?en:es;
   verify(route,staticFingerprint($)===staticFingerprint(local),'live content differs from candidate');
  });
  stats.onlinePairs++;
 }
}
const entries=[...pairs];
await Promise.all(Array.from({length:online?8:1},async()=>{
 for(;;){
  const row=entries.shift();if(!row)return;
  try {await verifyPair(row);} catch(error) {errors.push(row[1]+' '+error.message);}
 }
}));
if(stats.pairs!==map.length)errors.push('Incomplete pairs: '+stats.pairs+'/'+map.length);
console.log(JSON.stringify({stats,errors},null,2));
if(errors.length)process.exitCode=1;
