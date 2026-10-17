import fs from 'node:fs';
import path from 'node:path';
import {load} from 'cheerio';
const root=path.resolve(import.meta.dirname,'../../..');
const dist=path.join(root,'dist');
const output=import.meta.dirname;
const origin='https://www.lzz-cnc.com';
const rows=[];
function walk(dir){
 for(const ent of fs.readdirSync(dir,{withFileTypes:true})){
  const file=path.join(dir,ent.name);
  if(ent.isDirectory())walk(file);
  else if(ent.name.endsWith('.html')){
   const relative=path.relative(dist,file).replaceAll(path.sep,'/');
   const route='/'+relative.replace(/(^|\/)index\.html$/,'$1');
   const html=fs.readFileSync(file,'utf8');
   const $=load(html,{scriptingEnabled:false});
   const robots=$('meta[name="robots" i]').attr('content')||'';
   const refresh=$('meta[http-equiv="refresh" i]').attr('content')||'';
   const graph=[];const schemaErrors=[];
   $('script[type="application/ld+json"]').each((_,el)=>{try{const d=JSON.parse($(el).text());graph.push(...(d['@graph']||[d]));}catch(e){schemaErrors.push(e.message);}});
   const main=$('main').clone();main.find('script,style,nav').remove();main.find('br').replaceWith(' ');main.find('p,h1,h2,h3,h4,li,dt,dd,div,section,aside,details,summary,figcaption,label,input,select,option,button').append(' ');
   const mainText=main.text().replace(/\s+/g,' ').trim();
   const links=$('a[href]').map((_,el)=>({href:$(el).attr('href'),text:$(el).text().replace(/\s+/g,' ').trim(),inMain:$(el).closest('main').length>0})).get();
   const excluded=/noindex/i.test(robots)||!!refresh;
   rows.push({route,file,relative,htmlLines:html.split(/\r?\n/).length,title:$('title').text().trim(),titleCount:$('title').length,description:$('meta[name="description" i]').attr('content')||'',descriptionCount:$('meta[name="description" i]').length,h1:$('h1').map((_,e)=>{const h=$(e).clone();h.find('br').replaceWith(' ');return h.text().replace(/\s+/g,' ').trim();}).get(),canonical:$('link[rel="canonical"]').attr('href')||'',canonicalCount:$('link[rel="canonical"]').length,robots,refresh,excluded,mainWords:mainText.split(/\s+/).filter(Boolean).length,mainText:excluded?undefined:mainText,schemaTypes:graph.map(n=>n['@type']),schemaErrors,schemaNodes:graph,links,ids:$('[id]').map((_,el)=>$(el).attr('id')).get()});
  }
 }
}
walk(dist);rows.sort((a,b)=>a.route.localeCompare(b.route));
const byRoute=new Map(rows.map(r=>[r.route,r]));
const redirects=new Map(fs.readFileSync(path.join(dist,'_redirects'),'utf8').split(/\r?\n/).filter(l=>l.trim()&&!l.startsWith('#')).map(l=>l.trim().split(/\s+/)));
const broken=[];const brokenHashes=[];const redirectLinks=[];const inbound=new Map();
const internalLinks=[];
for(const row of rows){
 for(const link of row.links){
  let url;try{url=new URL(link.href,origin+row.route);}catch{continue;}
  if(url.origin!==origin)continue;
  const decoded=decodeURIComponent(url.pathname);
  const target=byRoute.get(decoded)||byRoute.get(decoded.replace(/index\.html$/,''))||byRoute.get(decoded.endsWith('/')?decoded:decoded+'/');
  if(!target&&!fs.existsSync(path.join(dist,decoded))&&!redirects.has(decoded)){broken.push({from:row.route,...link,target:decoded});continue;}
  if(redirects.has(decoded))redirectLinks.push({from:row.route,...link,target:redirects.get(decoded)});
  if(target){
   if(!row.excluded&&target.route!==row.route)inbound.set(target.route,(inbound.get(target.route)||0)+1);
   if(url.hash&&!target.ids.includes(decodeURIComponent(url.hash.slice(1))))brokenHashes.push({from:row.route,...link,target:target.route,hash:url.hash});
   internalLinks.push({from:row.route,to:target.route,href:link.href,inMain:link.inMain});
  }
 }
}
const xml=load(fs.readFileSync(path.join(dist,'sitemap.xml'),'utf8'),{xmlMode:true});
const sitemap=xml('loc').map((_,el)=>xml(el).text()).get();
const eligible=rows.filter(r=>!r.excluded);
const duplicates=field=>{const group=new Map();for(const r of eligible){const value=r[field];const urls=group.get(value)||[];urls.push(r.route);group.set(value,urls);}return [...group].filter(([,r])=>r.length>1).map(([value,routes])=>({value,routes}));};
const summary={generatedAt:new Date().toISOString(),scope:'local production build only; no live host or browser verification',html:rows.length,indexable:eligible.length,excluded:rows.filter(r=>r.excluded).map(r=>({route:r.route,robots:r.robots,refresh:r.refresh})),sitemap:sitemap.length,counts:{products:eligible.filter(r=>/^\/products\/[^/]+\/$/.test(r.route)).length,capabilities:eligible.filter(r=>/^\/capabilities\/[^/]+\/$/.test(r.route)).length,cases:eligible.filter(r=>/^\/cases\/[^/]+\/$/.test(r.route)).length,resources:eligible.filter(r=>r.route.startsWith('/resources/')).length,companyNews:eligible.filter(r=>/^\/about\/company-news\/[^/]+\/$/.test(r.route)).length},h1Problems:eligible.filter(r=>r.h1.length!==1).map(r=>({route:r.route,h1:r.h1})),emptyMain:eligible.filter(r=>r.mainWords<50).map(r=>({route:r.route,words:r.mainWords})),titleDuplicates:duplicates('title'),descriptionDuplicates:duplicates('description'),canonicalProblems:eligible.filter(r=>r.canonicalCount!==1||r.canonical!==origin+r.route).map(r=>({route:r.route,canonical:r.canonical})),schemaErrors:rows.filter(r=>r.schemaErrors.length).map(r=>({route:r.route,errors:r.schemaErrors})),schemaTypes:[...new Set(eligible.flatMap(r=>r.schemaTypes))],noInbound:eligible.filter(r=>r.route!=='/'&&!inbound.has(r.route)).map(r=>r.route),broken,brokenHashes,redirectLinks,mainWordRange:{min:Math.min(...eligible.map(r=>r.mainWords)),max:Math.max(...eligible.map(r=>r.mainWords))},longTitles:eligible.filter(r=>r.title.length>70).map(r=>({route:r.route,title:r.title,length:r.title.length})),descriptionLengths:eligible.filter(r=>r.description.length<50||r.description.length>180).map(r=>({route:r.route,description:r.description,length:r.description.length})),schemaEntityCounts:Object.fromEntries(['Product','Service','Article','BreadcrumbList','Organization','WebPage'].map(type=>[type,eligible.filter(r=>r.schemaTypes.includes(type)).length]))};
fs.writeFileSync(path.join(output,'built-html-summary.json'),JSON.stringify(summary,null,2));
fs.writeFileSync(path.join(output,'built-html-pages.json'),JSON.stringify(rows,null,2));
fs.writeFileSync(path.join(output,'built-html-links.json'),JSON.stringify(internalLinks,null,2));
fs.writeFileSync(path.join(output,'built-html-inventory.tsv'),['route\ttitle\tdescription\th1\tcanonical\trobots\tmainWords\tschemaTypes\tfile',...rows.map(r=>[r.route,r.title,r.description,r.h1.join(' | '),r.canonical,r.robots,r.mainWords,r.schemaTypes.join(','),r.file].map(s=>String(s).replaceAll('\t',' ').replaceAll('\n',' ')).join('\t'))].join('\n'));
console.log(JSON.stringify(summary,null,2));
