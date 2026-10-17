import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {load} from 'cheerio';

const dir='audit/humanizer-implementation-20261010';
const phase=process.argv[2]||'after';
const sitemap=fs.readFileSync('dist/sitemap.xml','utf8');
const routes=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname).sort();
const normalize=text=>text.replace(/\s+/g,' ').trim();
const pages=routes.map(route=>{
 const $=load(fs.readFileSync(path.join('dist',route,'index.html'),'utf8'));
 const schemas=$('script[type="application/ld+json"]').map((_,el)=>JSON.parse($(el).text())).get();
 $('script,style').remove();
 const main=$('main');
 const blocks=main.find('h1,h2,h3,h4,p,li,dt,dd,figcaption,summary').toArray().filter(el=>!$(el).find('p,li,dt,dd,h1,h2,h3,h4').length).map(el=>({tag:el.tagName,text:normalize($(el).text())})).filter(item=>item.text);
 return {route,language:$('html').attr('lang'),title:$('title').text(),description:$('meta[name="description"]').attr('content'),canonical:$('link[rel="canonical"]').attr('href'),h1:$('h1').map((_,el)=>normalize($(el).text())).get(),text:normalize(main.text()),blocks,specs:main.find('dl>div').map((_,el)=>normalize($(el).text())).get(),links:$('a[href]').map((_,el)=>({text:normalize($(el).text()),href:$(el).attr('href')})).get(),schemas};
});
fs.writeFileSync(`${dir}/${phase}-public-copy.json`,JSON.stringify(pages,null,2));
fs.writeFileSync(`${dir}/${phase}-reading.txt`,pages.map(page=>`${page.route}\nTitle: ${page.title}\nDescription: ${page.description}\n${page.blocks.map(block=>`${block.tag}: ${block.text}`).join('\n')}`).join('\n\n'));
if(phase==='before'){console.log(JSON.stringify({phase,routes:routes.length,languages:[...new Set(pages.map(page=>page.language))]}));process.exit(0);}

const before=JSON.parse(fs.readFileSync(`${dir}/before-public-copy.json`,'utf8'));
assert.deepEqual(routes,before.map(page=>page.route),'Public URL set must stay unchanged');
const hashes=JSON.parse(fs.readFileSync(`${dir}/before-source-hashes.json`,'utf8').replace(/^\uFEFF/,''));
const digest=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex').toUpperCase();
const changed=hashes.filter(item=>digest(item.path)!==item.hash).map(item=>item.path.replaceAll('\\','/'));
const protectedPaths=hashes.filter(item=>/src[\\/](styles|lib|scripts)[\\/]/.test(item.path)||/catalog\.json|(?:Images|Media|evidence).*\.json|companyRouteRedirects\.json/.test(item.path));
for(const item of protectedPaths)assert.equal(digest(item.path),item.hash,`Protected data/function/style changed: ${item.path}`);
const products=pages.filter(page=>/^\/products\/[^/]+\/$/.test(page.route));
const capabilities=pages.filter(page=>/^\/capabilities\/[^/]+\/$/.test(page.route));
assert.equal(products.length,35);assert.equal(capabilities.length,10);
for(const page of [...products,...capabilities]){
 const header=page.links.find(link=>link.text==='Request a quote');
 const query=new URL(header?.href||'','https://example.invalid').searchParams;
 const kind=page.route.startsWith('/products/')?'product':'capability';
 assert.equal(query.get('source'),page.route,`Header quote source: ${page.route}`);
 assert.equal(query.get(kind),page.route.split('/')[2],`Header quote identity: ${page.route}`);
}
for(const page of products){
 assert.match(page.text,/From 1 piece|Orders from 1 piece/);
 assert.match(page.text,/7[-–]14 business days/);
 assert.match(page.text,/surface finishing/);
 assert.match(page.text,/transit/i);
 const original=before.find(item=>item.route===page.route);
 assert.equal(page.specs.length,original.specs.length,`Technical field count: ${page.route}`);
}
const plastic=pages.find(page=>page.route==='/capabilities/plastic-machined-parts/').text;
for(const grade of ['PEEK','PTFE','Polyimide','Nylon','PA6','PA66','POM','HDPE','UHMW','Acrylic','PC','ABS','PVC','PP'])assert(plastic.includes(grade),`Missing plastic option: ${grade}`);
const quality=pages.find(page=>page.route==='/quality/');
assert.match(quality.text,/blank/i);assert.match(quality.text,/redacted report/);assert.match(quality.text,/ISO 9001/);
const draftJs=fs.readFileSync('src/components/QuoteForm.tsx','utf8');
assert(draftJs.includes('Email draft ready (not sent)'));
assert(draftJs.includes('sessionStorage'));assert(draftJs.includes('navigator.clipboard.writeText(fullDraft)'));
const changedRoutes=pages.filter(page=>{
 const old=before.find(item=>item.route===page.route);
 return page.text!==old.text||page.title!==old.title||page.description!==old.description;
}).map(page=>page.route);
const flags=/\b(?:world-class|best-in-class|industry-leading|trusted partner|seamless|comprehensive solutions|committed to|innovative solutions|tailored solutions|one-stop|delve|tapestry|fostering|pivotal|testament|unlock|elevate)\b/i;
const findings=pages.flatMap(page=>page.blocks.filter(block=>flags.test(block.text)).map(block=>({route:page.route,...block})));
const result={publicRoutes:routes.length,languages:[...new Set(pages.map(page=>page.language))],productPages:products.length,capabilityPages:capabilities.length,changedSourceFiles:changed,changedRoutes,protectedFiles:protectedPaths.length,quoteContextPages:45,technicalFieldCountsPreserved:true,plasticOptionsPreserved:true,languageFindingsForManualReview:findings};
fs.writeFileSync(`${dir}/content-verification.json`,JSON.stringify(result,null,2));
console.log(JSON.stringify({...result,changedSourceFiles:changed.length,changedRoutes:changedRoutes.length},null,2));
