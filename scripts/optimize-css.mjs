import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {gzipSync} from 'node:zlib';
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

// Extract only a complete, byte-identical run of top-level rules. Keeping its
// before/shared/after links in place preserves the cascade and relative URLs.
// Do not trade a large cold-load increase for a speculative cache benefit.
export function shareStylesheets(styles,{minSharedBytes=16384,maxGzipGrowth=1024}={}) {
 const variants=[...new Set(styles)];
 const unchanged=()=>new Map(variants.map(css=>[css,css?[css]:[]]));
 if(variants.length<2)return unchanged();
 const parsed=variants.map(css=>({css,root:postcss.parse(css)}));
 // Namespaces apply to one stylesheet, rather than the entire document.
 if(parsed.some(({root})=>root.nodes.some(node=>node.type==='atrule'&&/^(namespace|charset)$/i.test(node.name))))return unchanged();
 const reference=parsed.reduce((a,b)=>a.css.length<=b.css.length?a:b);
 const sequences=parsed.map(({css,root})=>root.nodes.map(node=>css.slice(node.source.start.offset,node.source.end.offset)));
 const tokens=sequences.map(sequence=>new Set(sequence));
 const pairs=sequences.map(sequence=>new Set(sequence.slice(1).map((token,index)=>JSON.stringify([sequence[index],token]))));
 const candidates=[];
 let start;
 const finish=end=>{
  if(start===undefined)return;
  const css=reference.css.slice(reference.root.nodes[start].source.start.offset,reference.root.nodes[end].source.end.offset);
  if(Buffer.byteLength(css)>=minSharedBytes)candidates.push(css);
  start=undefined;
 };
 let previous;
 reference.root.nodes.forEach((node,index)=>{
  const token=reference.css.slice(node.source.start.offset,node.source.end.offset);
  if(tokens.every(set=>set.has(token))){
   if(start!==undefined&&!pairs.every(set=>set.has(JSON.stringify([previous,token]))))finish(index-1);
   if(start===undefined)start=index;
  }
  else finish(index-1);
  previous=token;
 });
 finish(reference.root.nodes.length-1);
 for(const shared of candidates.sort((a,b)=>b.length-a.length)){
  const chunks=new Map();
  let eligible=true;
  for(const {css,root} of parsed){
   const offset=css.indexOf(shared),end=offset+shared.length;
   // Matching text must also occupy whole rules in every variant.
   if(offset<0||!root.nodes.some(node=>node.source.start.offset===offset)||!root.nodes.some(node=>node.source.end.offset===end)){eligible=false;break;}
   const parts=[css.slice(0,offset),shared,css.slice(end)];
   // Whitespace-only boundary fragments do not warrant another request.
   if(!parts[0].trim()){parts[1]=parts[0]+parts[1];parts[0]='';}
   if(!parts[2].trim()){parts[1]+=parts[2];parts[2]='';}
   const compact=parts.filter(Boolean);
   const growth=compact.reduce((sum,part)=>sum+gzipSync(part).length,0)-gzipSync(css).length;
   if(growth>maxGzipGrowth){eligible=false;break;}
   chunks.set(css,compact);
  }
  if(eligible)return chunks;
 }
 return unchanged();
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
 const stylesheets=new Map(),emitted=new Set(),sharedAssets=new Set(),rows=[],documents=[];
 for(const file of await sourceFiles(dist)){
  if(!file.endsWith('.html'))continue;
  let html=await fs.readFile(file,'utf8');
  const $=load(html);
  // Historical noindex design previews keep their original stylesheets.
  if(/\b(?:noindex|none)\b/i.test($('meta[name="robots" i]').attr('content')||'')&&path.basename(file)!=='404.html')continue;
  const hrefs=[...new Set($('link[rel="stylesheet"][href]').map((_,el)=>$(el).attr('href')).get())];
  if(!hrefs.length)continue;
  const matches=createSelectorMatcher($,dynamicClasses);
  // Related detail pages are visited together and retain the same shell. Do
  // not force a catalogue, article and homepage to download one oversized CSS.
  const segments=path.relative(dist,file).split(path.sep).filter(part=>part!=='index.html');
  const depth=segments[0]==='capabilities'?1:2;
  const group=segments.slice(0,depth).join('/')+(segments.length>depth?':detail':':index');
  let beforeBytes=0,afterBytes=0,removedSelectors=0;
  const retained=new Map();
  for(const href of hrefs){
   if(!href.startsWith('/_astro/')||!href.endsWith('.css'))continue;
   let original=stylesheets.get(href);
   if(!original){const css=await fs.readFile(path.join(dist,href),'utf8');original={css,ast:postcss.parse(css),bytes:Buffer.byteLength(css),variants:new Set(),groups:new Map(),links:new Map()};stylesheets.set(href,original);}
   const result=pruneStylesheet(original.ast,matches);
   beforeBytes+=original.bytes;
   afterBytes+=Buffer.byteLength(result.css);
   removedSelectors+=result.removedSelectors;
   original.variants.add(result.css);
   if(!original.groups.has(group))original.groups.set(group,new Set());
   original.groups.get(group).add(result.css);
   retained.set(href,result.css);
  }
  documents.push({file,html,retained});
  const route='/'+path.relative(dist,file).split(path.sep).join('/').replace(/(^|\/)index\.html$/,'$1');
  rows.push({route,beforeBytes,afterBytes,removedSelectors});
 }
 for(const [href,original] of stylesheets){
  const variants=new Map([...original.variants].map(css=>[css,css?[css]:[]]));
  for(const group of [...original.groups.keys()].sort())for(const [css,parts] of shareStylesheets(original.groups.get(group))){
   if(parts.length>1&&variants.get(css).length<2)variants.set(css,parts);
  }
  const uses=new Map();
  for(const parts of variants.values())for(const part of parts)uses.set(part,(uses.get(part)||0)+1);
  for(const [css,parts] of variants){
   if(parts.length===1&&css===original.css){original.links.set(css,[href]);continue;}
   const links=[];
   for(const part of parts){
    const hash=createHash('sha256').update(part).digest('hex').slice(0,12);
    const shared=uses.get(part)>1;
    const next='/_astro/'+(shared?'shared-':'page-')+hash+'.css';
    if(!emitted.has(next)){await fs.writeFile(path.join(dist,next),part);emitted.add(next);}
    if(shared)sharedAssets.add(next);
    links.push(next);
   }
   original.links.set(css,links);
  }
 }
 for(const {file,html,retained} of documents){
  const next=html.replace(/<link\b[^>]*>/gi,tag=>{
   const href=tag.match(/\bhref="([^"]+)"/)?.[1];
   if(!retained.has(href))return tag;
   return stylesheets.get(href).links.get(retained.get(href)).map(link=>tag.replace('href="'+href+'"','href="'+link+'"')).join('');
  });
  await fs.writeFile(file,next);
 }
 const report={pages:rows.length,generatedAssets:emitted.size,sharedAssets:sharedAssets.size,dynamicClasses:dynamicClasses.size,rows};
 const reportDir=path.join(root,'node_modules/.cache/lzz-css');
 await fs.mkdir(reportDir,{recursive:true});
 await fs.writeFile(path.join(reportDir,'report.json'),JSON.stringify(report,null,2));
 return report;
}

if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const report=await optimizeCSS();
 console.log(JSON.stringify({cssPages:report.pages,generatedAssets:report.generatedAssets,sharedAssets:report.sharedAssets,samples:report.rows.filter(row=>['/','/capabilities/cnc-milling-service/','/resources/faq/'].includes(row.route))}));
}
