import fs from 'node:fs';
import path from 'node:path';
import {load} from 'cheerio';
const files=fs.readdirSync('dist',{recursive:true}).filter(x=>x.endsWith('.html'));
const failures=[];
let links=0;
for(const file of files){
 const $=load(fs.readFileSync(path.join('dist',file),'utf8'),{scriptingEnabled:false});
 if($('h1').length!==1) failures.push(`${file}: H1 count`);
 $('a[href],img[src]').each((_,el)=>{
  const ref=$(el).attr('href')||$(el).attr('src');
  if(!ref?.startsWith('/')||ref.startsWith('//'))return;
  links++;
  const [url,hash]=ref.split('#');
  let target=path.join('dist',decodeURIComponent(url.split('?')[0]));
  if(fs.existsSync(target)&&fs.statSync(target).isDirectory())target=path.join(target,'index.html');
  if(!fs.existsSync(target)){failures.push(`${file}: missing ${ref}`);return;}
  if(hash&&target.endsWith('.html')){
   const linked=load(fs.readFileSync(target,'utf8'),{scriptingEnabled:false});
   if(!linked('[id]').toArray().some(e=>linked(e).attr('id')===decodeURIComponent(hash)))failures.push(`${file}: missing anchor ${ref}`);
  }
 });
}
console.log(JSON.stringify({pages:files.length,linksAndImages:links,failures},null,2));
if(failures.length)process.exitCode=1;
