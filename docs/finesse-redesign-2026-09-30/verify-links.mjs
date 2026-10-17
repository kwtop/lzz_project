import fs from 'node:fs';
import path from 'node:path';
import {load} from 'cheerio';
const root=path.resolve('dist');
const files=[];
const walk=dir=>{for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);entry.isDirectory()?walk(file):files.push(file);}};
walk(root);
const html=files.filter(file=>file.endsWith('.html'));
const pages=new Map(html.map(file=>[file,load(fs.readFileSync(file,'utf8'))]));
const failures=[];
let references=0;
let anchors=0;
function check(value,from,kind){
 if(!value||/^(?:https?:|mailto:|tel:|data:|blob:|javascript:)/i.test(value))return;
 const relative=path.relative(root,from).split(path.sep).join('/');
 const url=new URL(value,'http://local/'+relative);
 const local=decodeURIComponent(url.pathname).replace(/^\/+/, '');
 const target=path.resolve(root,local);
 if(!target.startsWith(root+path.sep)&&target!==root){failures.push({from:relative,value,problem:'path outside dist'});return;}
 const file=fs.existsSync(target)&&fs.statSync(target).isFile()?target:path.join(target,'index.html');
 references++;
 if(!fs.existsSync(file)){failures.push({from:relative,value,kind,problem:'missing file'});return;}
 if(kind==='href'&&url.hash&&pages.has(file)){
  anchors++;
  const id=decodeURIComponent(url.hash.slice(1));
  const $=pages.get(file);
  if(!Array.from($('[id]')).some(element=>$(element).attr('id')===id)&&!Array.from($('a[name]')).some(element=>$(element).attr('name')===id))failures.push({from:relative,value,problem:'missing anchor'});
 }
}
for(const [file,$] of pages){
 $('[href],[src],[poster]').each((_,element)=>{for(const kind of ['href','src','poster'])check($(element).attr(kind),file,kind);});
 $('[srcset]').each((_,element)=>{$(element).attr('srcset').split(',').forEach(item=>check(item.trim().split(/\s+/)[0],file,'srcset'));});
}
for(const file of files.filter(file=>file.endsWith('.css'))){
 for(const match of fs.readFileSync(file,'utf8').matchAll(/url\(\s*['"]?([^'"\s)]+)['"]?\s*\)/g))check(match[1],file,'CSS url');
}
const result={status:failures.length?'failed':'passed',pages:html.length,references,anchors,failures};
fs.writeFileSync('docs/finesse-redesign-2026-09-30/link-verification.json',JSON.stringify(result,null,2));
console.log(JSON.stringify(result));
if(failures.length)process.exitCode=1;
