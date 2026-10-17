import fs from 'node:fs';
import path from 'node:path';
import {load} from 'cheerio';

const mode=process.argv[2];
if(!['before','after'].includes(mode))throw new Error('Use before or after.');
const output='docs/template-unification-2026-10-01';
fs.mkdirSync(output,{recursive:true});
const sitemap=load(fs.readFileSync('dist/sitemap.xml','utf8'),{xmlMode:true});
const routes=sitemap('loc').map((_,el)=>new URL(sitemap(el).text()).pathname).get();
const textNodes=node=>node.type==='text'?[node.data]:node.children?.flatMap(textNodes)||[];
const rows=routes.map(route=>{
  const file=path.join('dist',route,'index.html');
  const $=load(fs.readFileSync(file,'utf8'));
  const seo={title:$('title').text(),description:$('meta[name=description]').attr('content'),canonical:$('link[rel=canonical]').attr('href'),schema:$('script[type="application/ld+json"]').map((_,el)=>$(el).text()).get()};
  const main=$('main').clone();
  main.find('script,style,template,noscript').remove();
  const text=main.toArray().flatMap(textNodes).join(' ').replace(/\s+/g,' ').trim();
  const words={};
  for(const word of text.toLowerCase().match(/[\p{L}\p{N}]+(?:['’–-][\p{L}\p{N}]+)*/gu)||[])words[word]=(words[word]||0)+1;
  const images=main.find('img[src]').map((_,el)=>({src:$(el).attr('src'),alt:$(el).attr('alt')||'',origin:$(el).attr('data-image-origin')||$(el).closest('[data-image-origin]').attr('data-image-origin')||''})).get();
  const ids=main.find('[id]').map((_,el)=>$(el).attr('id')).get();
  const hrefs=main.find('a[href]').map((_,el)=>$(el).attr('href')).get();
  return {route,seo,template:$('body').attr('data-page-template'),h1:main.find('h1').map((_,el)=>$(el).text().replace(/\s+/g,' ').trim()).get(),text,words,images,ids,hrefs,toc:main.find('.page-contents-disclosure a[href]').map((_,el)=>$(el).attr('href')).get()};
});
const target=path.join(output,mode+'-render.json');
if(mode==='before'&&fs.existsSync(target))throw new Error('Preserve the existing baseline.');
fs.writeFileSync(target,JSON.stringify(rows,null,2)+'\n');
if(mode==='before'){
  console.log(`Template baseline saved: ${rows.length} sitemap routes.`);
}else{
  const before=JSON.parse(fs.readFileSync(path.join(output,'before-render.json'),'utf8'));
  const families={decision:0,read:0,operate:0};
  const failures=[];
  const textChanges=[];
  for(const row of rows){
    const old=before.find(item=>item.route===row.route);
    if(!old){failures.push(row.route+': new route without baseline');continue;}
    if(!(row.template in families))failures.push(row.route+': missing page template');
    else families[row.template]++;
    if(row.h1.length!==1)failures.push(row.route+': expected one H1');
    if(JSON.stringify(row.seo)!==JSON.stringify(old.seo))failures.push(row.route+': SEO metadata changed');
    for(const id of new Set(old.ids))if(!row.ids.includes(id))failures.push(row.route+': removed anchor '+id);
    for(const href of new Set(old.hrefs))if(!row.hrefs.includes(href))failures.push(row.route+': removed destination '+href);
    for(const href of row.toc)if(href.startsWith('#')&&!row.ids.includes(href.slice(1)))failures.push(row.route+': broken contents entry '+href);
    const used=new Set();
    for(const image of old.images){
      const index=row.images.findIndex((item,i)=>!used.has(i)&&item.src===image.src&&item.alt===image.alt);
      if(index<0)failures.push(row.route+': removed or relabelled image '+image.src);
      else{
        used.add(index);
        if(image.origin&&image.origin!==row.images[index].origin)failures.push(row.route+': image provenance changed '+image.src);
      }
    }
    const removed=Object.entries(old.words).filter(([word,count])=>(row.words[word]||0)<count).map(([word,count])=>({word,count:count-(row.words[word]||0)}));
    if(removed.length)textChanges.push({route:row.route,removed});
  }
  for(const old of before)if(!rows.some(row=>row.route===old.route))failures.push(old.route+': removed sitemap route');
  const report={routes:rows.length,families,failures,textChanges};
  fs.writeFileSync(path.join(output,'invariants.json'),JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify({routes:rows.length,families,failures,textChangePages:textChanges.length},null,2));
  if(failures.length)process.exitCode=1;
}
