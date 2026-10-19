import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import postcss from 'postcss';
import {load} from 'cheerio';

const ROOT=fileURLToPath(new URL('../',import.meta.url));

// Compare against the complete server-rendered document, not one viewport or
// browser coverage sample. Keep interaction states and anything we cannot parse.
const stateAttribute=/\[(?:open|hidden|checked|disabled|selected|aria-[\w-]+|data-(?:state|active|status|expanded|selected|palette|view))[\s=\]]/i;
const generatedSurface=/(?:dialog|lightbox|popover|:modal|view-transition)/i;
const statePseudo=/(?<!:):(?:hover|active|focus-visible|focus-within|focus|visited|link|any-link|target|checked|disabled|enabled|indeterminate|valid|invalid|user-valid|user-invalid|placeholder-shown|autofill|fullscreen|playing|paused)(?![\w-])/gi;
const staticRoots=new Set(['redesign-site','brand-site','rd-page','pd-page','cx-page','ar-page','rs-page','rh-page']);

export function createSelectorMatcher($,dynamicClasses=new Set()) {
 const cache=new Map();
 const prefixes=[...dynamicClasses].filter(name=>name.endsWith('-'));
 return selector=>{
  if(cache.has(selector))return cache.get(selector);
  let keep=true;
  const classes=[...selector.matchAll(/\.([a-zA-Z_][\w-]*)/g)].map(match=>match[1]);
  const dynamic=classes.some(name=>dynamicClasses.has(name)||prefixes.some(prefix=>name.startsWith(prefix)));
  if(!dynamic&&!stateAttribute.test(selector)&&!generatedSurface.test(selector)){
   const query=selector
    .replace(/::[\w-]+(?:\([^)]*\))?/g,'')
    .replace(statePseudo,'');
   // Unsupported selectors and nesting fail open. They are never deleted.
   try{keep=!query.trim()||$(query).length>0;}catch{keep=true;}
  }
  cache.set(selector,keep);
  return keep;
 };
}

export function pruneStylesheet(css,matches) {
 const root=typeof css==='string'?postcss.parse(css):css.clone();
 let removedSelectors=0;
 root.walkRules(rule=>{
  let ancestor=rule.parent;
  while(ancestor){
   if(ancestor.type==='rule'||ancestor.type==='atrule'&&/keyframes$/i.test(ancestor.name))return;
   ancestor=ancestor.parent;
  }
  const selectors=rule.selectors;
  const retained=selectors.filter(matches);
  // Nested rules inherit the maximum specificity of the parent selector list,
  // including unmatched branches. Keep that list intact when it applies.
  if(retained.length&&rule.nodes?.some(node=>node.type==='rule'||node.type==='atrule'))return;
  removedSelectors+=selectors.length-retained.length;
  if(!retained.length)rule.remove();
  else if(retained.length!==selectors.length)rule.selectors=retained;
 });
 // Empty conditional wrappers contain no declarations. Preserve all definitions,
 // fonts, keyframes and layer statements, including empty @layer ordering rules.
 for(let pass=0;pass<4;pass++)root.walkAtRules(rule=>{
  if(/^(media|supports|container)$/i.test(rule.name)&&rule.nodes&&!rule.nodes.some(node=>node.type!=='comment'))rule.remove();
 });
 return {css:root.toString(),removedSelectors};
}

async function sourceFiles(dir) {
 const files=[];
 for(const entry of await fs.readdir(dir,{withFileTypes:true})){
  const file=path.join(dir,entry.name);
  if(entry.isDirectory())files.push(...await sourceFiles(file));
  else files.push(file);
 }
 return files;
}

export async function runtimeClasses(root=ROOT) {
 const names=new Set();
 const collect=text=>{for(const token of text.match(/[a-zA-Z_][\w-]*/g)||[])if(!staticRoots.has(token))names.add(token);};
 for(const file of await sourceFiles(path.join(root,'src'))){
  if(!/\.(?:astro|tsx?|jsx?)$/.test(file))continue;
  const text=await fs.readFile(file,'utf8');
  if(/\.[jt]sx$/.test(file)){collect(text);continue;}
  const scripts=file.endsWith('.astro')?[...text.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(match=>match[1]):file.includes(path.sep+'scripts'+path.sep)?[text]:[];
  for(const script of scripts){
   for(const match of script.matchAll(/classList\.(?:add|remove|toggle|replace)\(([^;\n)]*)\)|\.className\s*=\s*([^;\n]+)|setAttribute\(['"]class['"]\s*,\s*([^;\n)]*)\)/g)){
    collect(match[1]||match[2]||match[3]||'');
   }
  }
 }
 return names;
}

export async function optimizeCSS(root=ROOT) {
 const dist=path.join(root,'dist');
 const dynamicClasses=await runtimeClasses(root);
 const stylesheets=new Map(),emitted=new Map(),rows=[];
 for(const file of await sourceFiles(dist)){
  if(!file.endsWith('.html'))continue;
  let html=await fs.readFile(file,'utf8');
  const $=load(html);
  // Historical noindex design previews keep their original stylesheets.
  if(/\b(?:noindex|none)\b/i.test($('meta[name="robots" i]').attr('content')||'')&&path.basename(file)!=='404.html')continue;
  const hrefs=[...new Set($('link[rel="stylesheet"][href]').map((_,el)=>$(el).attr('href')).get())];
  if(!hrefs.length)continue;
  const matches=createSelectorMatcher($,dynamicClasses);
  let beforeBytes=0,afterBytes=0,removedSelectors=0;
  for(const href of hrefs){
   if(!href.startsWith('/_astro/')||!href.endsWith('.css'))continue;
   let original=stylesheets.get(href);
   if(!original){const css=await fs.readFile(path.join(dist,href),'utf8');original={css,ast:postcss.parse(css),bytes:Buffer.byteLength(css)};stylesheets.set(href,original);}
   const result=pruneStylesheet(original.ast,matches);
   beforeBytes+=original.bytes;
   afterBytes+=Buffer.byteLength(result.css);
   removedSelectors+=result.removedSelectors;
   if(result.css===original.css)continue;
   // Keeping the directory preserves every relative font/image URL. Content
   // hashes let identical retained styles share the browser cache across pages.
   const hash=createHash('sha256').update(result.css).digest('hex').slice(0,12);
   const next=href.replace(/\.css$/,'.page-'+hash+'.css');
   if(!emitted.has(next)){await fs.writeFile(path.join(dist,next),result.css);emitted.set(next,true);}
   html=html.replaceAll('href="'+href+'"','href="'+next+'"');
  }
  await fs.writeFile(file,html);
  const route='/'+path.relative(dist,file).split(path.sep).join('/').replace(/(^|\/)index\.html$/,'$1');
  rows.push({route,beforeBytes,afterBytes,removedSelectors});
 }
 const report={pages:rows.length,generatedAssets:emitted.size,dynamicClasses:dynamicClasses.size,rows};
 const reportDir=path.join(root,'node_modules/.cache/lzz-css');
 await fs.mkdir(reportDir,{recursive:true});
 await fs.writeFile(path.join(reportDir,'report.json'),JSON.stringify(report,null,2));
 return report;
}

if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const report=await optimizeCSS();
 console.log(JSON.stringify({cssPages:report.pages,generatedAssets:report.generatedAssets,samples:report.rows.filter(row=>['/','/capabilities/cnc-milling-service/','/resources/faq/'].includes(row.route))}));
}
