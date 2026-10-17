import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';
const root='D:/lzz/lzz/_react',out='D:/lzz/lzz/_react/docs/review-20261015-current';
await fs.mkdir(out+'/screens',{recursive:true});
const require=createRequire(root+'/package.json'),{load}=require('cheerio'),{build}=require('esbuild'),sharp=require('sharp');
const {migration}=await import(pathToFileURL(root+'/scripts/build-seo.mjs'));
const migrationData=migration();
const bundle=await build({stdin:{resolveDir:root,contents:'export {default as catalog} from "./src/data/catalog.json";export * as products from "./src/data/productsEditorial";export * as summaries from "./src/data/productSummaries";export * as cases from "./src/data/cases";export * as capability from "./src/data/capabilityDesign";export * as resources from "./src/data/resourceLibrary";export {siteSections} from "./src/data/siteSections";'},bundle:true,platform:'node',format:'cjs',write:false,logLevel:'silent'});
const module={exports:{}};new Function('module','exports','require',bundle.outputFiles[0].text)(module,module.exports,require);
const data=module.exports;
const normalize=s=>s.replace(/\s+/g,' ').trim();
const assetMeta=new Map();
async function imageMetadata(src){
 if(!src?.startsWith('/'))return {};
 const decoded=decodeURIComponent(src.split(/[?#]/)[0]);if(assetMeta.has(decoded))return assetMeta.get(decoded);
 const file=root+'/public'+decoded;
 let metadata;
 try{const stat=await fs.stat(file),m=await sharp(file).metadata();metadata={file:decoded,width:m.width,height:m.height,bytes:stat.size,format:m.format};}catch(error){metadata={file:decoded,error:error.message};}
 assetMeta.set(decoded,metadata);return metadata;
}
const htmlFiles=(await fs.readdir(root+'/dist',{recursive:true})).filter(x=>x.endsWith('.html'));
const pages=[];
for(const relative of htmlFiles){
 const url='/'+relative.replaceAll('\\','/').replace(/index\.html$/,'');
 const html=await fs.readFile(root+'/dist/'+relative,'utf8'),$=load(html),main=$('main').length?$('main'):$('body');
 const redirect=$('meta[http-equiv="refresh" i]').attr('content');
 const robots=$('meta[name="robots"]').attr('content')||'';
 const tableCells=main.find('table tr').map((_,e)=>$(e).find('th,td').map((_,cell)=>normalize($(cell).text())).get()).get();
 const media=[];
 for(const e of main.find('img').toArray()){
  const image=$(e),src=image.attr('src')||'';
  media.push({src,alt:image.attr('alt')||'',origin:image.attr('data-image-origin')||image.closest('[data-image-origin]').attr('data-image-origin')||'unclassified',module:normalize(image.closest('section,article,figure').find('h2,h3').first().text())||image.closest('[id]').attr('id')||'',caption:normalize(image.closest('figure').find('figcaption').text()),selectorClass:image.attr('class')||'',...(await imageMetadata(src))});
 }
 pages.push({url,kind:redirect?'redirect':url==='/404.html'?'error':/noindex/i.test(robots)?'preview':'business',redirect,robots,canonical:$('link[rel="canonical"]').attr('href')||'',title:$('title').text(),h1:normalize(main.find('h1').text()),headings:main.find('h2,h3').map((_,e)=>({level:e.tagName,text:normalize($(e).text()),id:$(e).attr('id')||$(e).closest('[id]').attr('id')})).get(),ids:main.find('[id]').map((_,e)=>$(e).attr('id')).get(),text:normalize(main.text()),tableCells,images:media,links:main.find('a[href]').map((_,e)=>({text:normalize($(e).text())||$(e).attr('aria-label')||'',href:$(e).attr('href')})).get(),details:main.find('details').map((_,e)=>({open:$(e).attr('open')!==undefined,summary:normalize($(e).find('summary').text()),text:normalize($(e).text())})).get(),sourceHtml:'dist/'+relative.replaceAll('\\','/'),builtAt:(await fs.stat(root+'/dist/'+relative)).mtime.toISOString()});
}
pages.sort((a,b)=>a.url.localeCompare(b.url));
const redirects=[...migrationData.rules].map(([url,target])=>({url,target,hasHtml:pages.some(p=>p.url===url),status:'规则及目的内容已检查；未逐条HTTP验证'}));
const historical=[...migrationData.targets].map(([url,target])=>({url,target,status:'原站历史来源，不等同当前页面'}));
const partPlans=data.catalog.products.map(p=>({slug:p.slug,title:data.products.partDisplayTitle(p),visual:data.products.partVisual(p),summary:data.summaries.productSummary(p),catalog:p}));
const sourceFiles=[];
for(const folder of ['src','scripts'])for(const rel of await fs.readdir(root+'/'+folder,{recursive:true})){const file=folder+'/'+rel.replaceAll('\\','/'),stat=await fs.stat(root+'/'+file);if(stat.isFile()){const content=await fs.readFile(root+'/'+file);sourceFiles.push({file,sha256:createHash('sha256').update(content).digest('hex'),mtime:stat.mtime.toISOString()});}}
for(const file of ['DESIGN.md','astro.config.mjs','package.json','package-lock.json']){const content=await fs.readFile(root+'/'+file);sourceFiles.push({file,sha256:createHash('sha256').update(content).digest('hex')});}
const inventory={createdAt:new Date().toISOString(),root,counts:{html:pages.length,business:pages.filter(p=>p.kind==='business').length,previews:pages.filter(p=>p.kind==='preview').length,error:pages.filter(p=>p.kind==='error').length,htmlRedirects:pages.filter(p=>p.kind==='redirect').length,redirectRules:redirects.length,discoveredUnion:new Set([...pages.map(p=>p.url),...redirects.map(p=>p.url)]).size,historical:historical.length,uniqueMainImageFiles:assetMeta.size},navigation:data.siteSections,pages,redirects,historical,parts:partPlans,categories:data.catalog.categories,cases:data.cases,resourceLibrary:data.resources.resourceLibrary,assets:[...assetMeta.values()]};
await fs.writeFile(out+'/inventory.json',JSON.stringify(inventory,null,2));
await fs.writeFile(out+'/source-baseline.json',JSON.stringify(sourceFiles,null,2));
console.log(JSON.stringify(inventory.counts));

