import fs from 'node:fs/promises';
import path from 'node:path';
import {load} from 'cheerio';
import sharp from 'sharp';
const root=path.resolve('dist');
const out=path.resolve('docs/ui-upgrade-2026-09-26');
const evidence=JSON.parse(await fs.readFile('src/data/evidence.generated.json','utf8'));
const files=(await fs.readdir(root,{recursive:true})).filter(f=>f.endsWith('.html'));
const metadata=new Map(), usages=[],failures=[];
async function inspect(src){
 if(metadata.has(src))return metadata.get(src);
 const filename=path.join(root,decodeURIComponent(src.split('?')[0]));
 let result;
 try{const m=await sharp(filename).metadata();const stat=await fs.stat(filename);const original=Object.values(evidence).find(e=>e.src===src||e.srcset.includes(src+' '));result={src,width:m.width,height:m.height,bytes:stat.size,originalSource:original?.source||null,proofScope:original?.proofScope||null,kind:original?'original-photo':/illustrative|ai-/.test(src)?'illustration':'see-existing-provenance'};}
 catch(error){result={src,error:error.message};failures.push(result);}
 metadata.set(src,result);return result;
}
for(const file of files){
 const route='/'+file.replaceAll('\\','/').replace(/index\.html$/,'');
 const $=load(await fs.readFile(path.join(root,file),'utf8'));
 if($('h1').length!==1)failures.push({route,error:'Expected one H1'});
 for(const el of $('img').toArray()){
  const img=$(el),src=img.attr('src');if(!src?.startsWith('/'))continue;
  const variants=(img.attr('srcset')||'').split(',').map(s=>s.trim().split(/\s+/)[0]).filter(Boolean);
  usages.push({route,src,alt:img.attr('alt'),sizes:img.attr('sizes')||null,variants,caption:img.closest('figure').find('figcaption').text().trim(),origin:img.closest('[data-image-origin]').attr('data-image-origin')||null});
  for(const item of new Set([src,...variants]))await inspect(item);
 }
 for(const el of $('a[href],link[href],script[src]').toArray()){
  const ref=$(el).attr('href')||$(el).attr('src');if(!ref?.startsWith('/')||ref.startsWith('//'))continue;
  const [pathname,fragment]=ref.split('#'),local=path.join(root,decodeURIComponent(pathname.split('?')[0]));
  try{await fs.access(local);}catch{try{await fs.access(path.join(local,'index.html'));}catch{failures.push({route,missing:ref});}}
  if(fragment&&pathname===route&&!$('[id]').toArray().some(e=>$(e).attr('id')===fragment))failures.push({route,missingAnchor:ref});
 }
}
const report={pages:files.length,imageUsages:usages.length,assets:metadata.size,failures,images:[...metadata.values()].map(m=>({...m,pages:[...new Set(usages.filter(u=>u.src===m.src||u.variants.includes(m.src)).map(u=>u.route))]})),usages};
await fs.mkdir(out,{recursive:true});await fs.writeFile(path.join(out,'image-inventory.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({pages:report.pages,imageUsages:report.imageUsages,assets:report.assets,failures},null,2));
if(failures.length)process.exitCode=1;
