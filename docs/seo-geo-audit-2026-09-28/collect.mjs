import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {load} from 'cheerio';
const root=path.resolve('.'),out=path.join(root,'docs/seo-geo-audit-2026-09-28');
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const sourceHashes=Object.fromEntries(walk(path.join(root,'src')).map(f=>[path.relative(root,f),hash(f)]));
if(!fs.existsSync(path.join(out,'source-hashes.json')))fs.writeFileSync(path.join(out,'source-hashes.json'),JSON.stringify(sourceHashes,null,2));
const files=walk(path.join(root,'dist')).filter(f=>f.endsWith('.html'));
const rows=[];const textPages=[];
for(let i=0;i<files.length;i+=4)await Promise.all(files.slice(i,i+4).map(async file=>{
 const route='/'+path.relative(path.join(root,'dist'),file).replaceAll('\\','/').replace(/(^|\/)index\.html$/,'$1');
 const built=load(fs.readFileSync(file,'utf8'));let response,html,error;
 try{response=await fetch('http://127.0.0.1:4323'+route,{redirect:'manual',signal:AbortSignal.timeout(12000)});html=await response.text();}catch(e){error=e.message;html='';}
 const dom=load(html,{scriptingEnabled:false});const main=dom('main').clone();main.find('script,style').remove();
 const clean=s=>s.replace(/\s+/g,' ').trim();
 const links=dom('a[href]').map((_,e)=>({href:dom(e).attr('href'),text:clean(dom(e).text())})).get();
 const type=route.startsWith('/products/')&&route!='/products/'?'product':route.startsWith('/capabilities/')&&route!='/capabilities/'?'capability':route.startsWith('/cases/')&&route!='/cases/'?'case':route.startsWith('/insights/')&&route!='/insights/'?'resource':'core';
 const template=type==='core'?'src/pages/'+(route==='/'?'index':['/products/','/capabilities/','/cases/','/insights/'].includes(route)?route.slice(1)+'index':route.replaceAll('/','').replace('.html',''))+'.astro':`src/pages/${{product:'products',capability:'capabilities',case:'cases',resource:'insights'}[type]}/[slug].astro`;
 const schemas=dom('script[type="application/ld+json"]').map((_,e)=>{try{return JSON.parse(dom(e).text());}catch{return {parseError:true};}}).get();
 rows.push({route,type,template,language:dom('html').attr('lang'),status:response?.status||null,error,headers:response?Object.fromEntries(response.headers):{},title:dom('title').text(),h1:dom('h1').map((_,e)=>clean(dom(e).text())).get(),description:dom('meta[name="description"]').attr('content'),canonical:dom('link[rel="canonical"]').attr('href'),robots:dom('meta[name="robots"]').attr('content')||'',h2:dom('main h2').map((_,e)=>clean(dom(e).text())).get(),cta:dom('main a.button').map((_,e)=>({text:clean(dom(e).text()),href:dom(e).attr('href')})).get(),links,ids:dom('[id]').map((_,e)=>dom(e).attr('id')).get(),schemas,images:dom('main img').map((_,e)=>({src:dom(e).attr('src'),alt:dom(e).attr('alt'),loading:dom(e).attr('loading')})).get(),words:clean(main.text()).split(' ').length,builtTitle:built('title').text(),builtCanonical:built('link[rel="canonical"]').attr('href'),builtDate:fs.statSync(file).mtime.toISOString(),mainText:clean(main.text())});
 textPages.push('## '+route+'\n'+main.text().replace(/\n{3,}/g,'\n\n'));
}));
rows.sort((a,b)=>a.route.localeCompare(b.route));
const map=new Map(rows.map(r=>[r.route,r]));const broken=[];const inbound=new Map(rows.map(r=>[r.route,new Set()]));
for(const row of rows)for(const l of row.links){let u;try{u=new URL(l.href,'http://127.0.0.1:4323'+row.route);}catch{continue;}if(!['127.0.0.1','www.lzz-cnc.com'].includes(u.hostname))continue;let target=map.get(u.pathname);if(target){inbound.get(target.route).add(row.route);if(u.hash&&!target.ids.includes(decodeURIComponent(u.hash.slice(1))))broken.push({from:row.route,href:l.href,kind:'anchor'});}else if(!fs.existsSync(path.join(root,'public',u.pathname)))broken.push({from:row.route,href:l.href,kind:'route-or-asset'});}
for(const row of rows){row.inbound=[...inbound.get(row.route)].filter(r=>r!==row.route);row.nav= row.route.startsWith('/capabilities')?'Capabilities':row.route.startsWith('/products')?'Part Examples':row.route.startsWith('/cases')||['/factory/','/quality/'].includes(row.route)?'Factory & Quality':row.route.startsWith('/insights')?'Resources':row.route==='/about/'?'About LZZ':row.route==='/quote/'?'Get a quote':'Home / Utility';}
const catalog=JSON.parse(fs.readFileSync(path.join(root,'src/data/catalog.json'),'utf8'));
for(const row of rows){
 row.observedAt=new Date().toISOString();
 row.contentSources=row.type==='product'?['src/data/catalog.json','src/data/presentation.ts','src/data/productSummaries.ts','src/data/productDetails.ts','src/data/manufacturing.ts']:row.type==='capability'?['src/data/catalog.json','src/data/capabilityContent.ts','src/data/capabilityReferences.ts']:row.type==='case'?['src/data/cases.ts']:row.type==='resource'?['src/data/resources.ts','src/data/catalog.json']:[row.template,'src/data/company.ts'];
 row.provenance=row.type==='product'?catalog.products.find(p=>row.route==='/products/'+p.slug+'/')?.sourceAliases||[]:[];
}
const dupe=key=>Object.entries(Object.groupBy(rows.filter(r=>r.status===200),r=>String(r[key]))).filter(([,v])=>v.length>1).map(([value,v])=>({value,routes:v.map(r=>r.route)}));
const extras=[];for(const route of ['/robots.txt','/sitemap.xml','/not-a-real-page-audit-20260928/','/product','/capabilities/5-axis-cnc-machining/?audit=1']){try{const r=await fetch('http://127.0.0.1:4323'+route,{redirect:'manual'});extras.push({route,status:r.status,headers:Object.fromEntries(r.headers),body:(await r.text()).slice(0,2000)});}catch(e){extras.push({route,error:e.message});}}
const summary={observedAt:new Date().toISOString(),count:rows.length,types:Object.fromEntries(Object.entries(Object.groupBy(rows,r=>r.type)).map(([k,v])=>[k,v.length])),statuses:Object.fromEntries(Object.entries(Object.groupBy(rows,r=>r.status)).map(([k,v])=>[k,v.length])),duplicates:{title:dupe('title'),description:dupe('description')},broken,orphans:rows.filter(r=>!r.inbound.length).map(r=>r.route),headingErrors:rows.filter(r=>r.h1.length!==1).map(r=>r.route),extras};
fs.writeFileSync(path.join(out,'inventory.json'),JSON.stringify(rows,null,2));fs.writeFileSync(path.join(out,'technical-summary.json'),JSON.stringify(summary,null,2));fs.writeFileSync(path.join(out,'page-text.md'),textPages.join('\n\n'));
const cell=v=>String(v??'').replaceAll('|',' / ').replaceAll('\n',' ');
fs.writeFileSync(path.join(out,'page-inventory.md'),'# 全量页面清单\n\n观察日：2026-09-28。Local URL origin: http://127.0.0.1:4323；canonical origin并非已部署证明。完整正文、CTA、内链、响应头、数据来源与产品原站别名见 inventory.json。\n\n|URL|类型/导航|语言|状态|Title|H1|核心模块|CTA|模板|内容数据来源|\n|---|---|---|---|---|---|---|---|---|---|\n'+rows.map(r=>[r.route,r.type+' / '+r.nav,r.language,r.status,r.title,r.h1.join(' / '),r.h2.join('; '),r.cta.map(x=>x.text+' '+x.href).join('; '),r.template,r.contentSources.join('; ')].map(cell).join('|')).map(s=>'|'+s+'|').join('\n'));
console.log(JSON.stringify(summary,null,2));
