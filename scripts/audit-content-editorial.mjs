import fs from 'node:fs';
import path from 'node:path';
import {load} from 'cheerio';
const base=JSON.parse(fs.readFileSync('D:/lzz/_qa/content-editorial-20261013/baseline.json'));
const pages=new Map(base.map(b=>{const html=fs.readFileSync(path.join('dist',b.route,'index.html'),'utf8');return[b.route,{...b,$:load(html)}]}));
const output={excluded:[],pages:[],brokenAnchors:[],missingImages:[],duplicates:[]};
for(const [route,b] of pages){
 const $=b.$;const ids=$('[id]').map((_,e)=>$(e).attr('id')).get();
 if(route==='/'||route.startsWith('/machined-parts/')||route.startsWith('/capabilities/')){output.excluded.push({route,unchanged:$('#main').html()===b.mainHTML});continue;}
 const missing=b.ids.filter(id=>!ids.includes(id));
 output.pages.push({route,h1:$('main h1').length,h2:$('main h2').map((_,e)=>$(e).text()).get(),missingOldIds:missing,images:$('main img').length,mainChanged:$('#main').html()!==b.mainHTML});
 for(const id of ids.filter((x,i)=>ids.indexOf(x)!==i))output.duplicates.push({route,id});
 $('main img[src]').each((_,e)=>{const src=$(e).attr('src');if(src.startsWith('/')&&!fs.existsSync(path.join('public',src)))output.missingImages.push({route,src})});
}
for(const [route,b] of pages){b.$('a[href*="#"]').each((_,e)=>{const href=b.$(e).attr('href');if(!href.startsWith('/')&&!href.startsWith('#'))return;const u=new URL(href,'https://local'+route);const to=pages.get(u.pathname);if(to&&u.hash&&!to.$('[id]').toArray().some(e=>to.$(e).attr('id')===decodeURIComponent(u.hash.slice(1))))output.brokenAnchors.push({route,href})})}
fs.writeFileSync('D:/lzz/_qa/content-editorial-20261013/structure-audit.json',JSON.stringify(output,null,2));
console.log(JSON.stringify({excluded:output.excluded.length,excludedChanged:output.excluded.filter(x=>!x.unchanged),pages:output.pages.length,missingImages:output.missingImages,duplicates:output.duplicates,missingIds:output.pages.filter(x=>x.missingOldIds.length).map(x=>({route:x.route,ids:x.missingOldIds})),brokenAnchors:output.brokenAnchors},null,2));
