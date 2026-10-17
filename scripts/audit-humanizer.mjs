import fs from 'node:fs';
import path from 'node:path';
import {load} from 'cheerio';
const out='D:/lzz/_qa/humanizer-20261014';
fs.mkdirSync(out,{recursive:true});
const routes=JSON.parse(fs.readFileSync('D:/lzz/_qa/content-editorial-20261013/baseline.json')).map(p=>p.route);
const pages=routes.map(route=>{
 const html=fs.readFileSync(path.join('dist',route,'index.html'),'utf8');const $=load(html);
 const blocks=$('main h1,main h2,main h3,main p,main li,main dt,main dd,main figcaption,main label,main button,main th,main td,main summary,header a,footer p,footer a').toArray().map(e=>$(e).text().replace(/\s+/g,' ').trim()).filter(Boolean);
 return {route,title:$('title').text(),description:$('meta[name="description"]').attr('content'),blocks:[...new Set(blocks)],images:$('img').toArray().map(e=>({src:$(e).attr('src'),alt:$(e).attr('alt')})),ids:$('[id]').toArray().map(e=>$(e).attr('id')),hrefs:$('a[href]').toArray().map(e=>$(e).attr('href')),h1:$('main h1').length};
});
const mode=process.argv[2]||'before';
fs.writeFileSync(`${out}/${mode}.json`,JSON.stringify(pages,null,2));
const seen=new Set();let count=0;
for(const group of ['general','products','capabilities','resources','cases']){
 let text='';
 for(const p of pages.filter(p=>(['products','capabilities','resources','cases'].find(g=>p.route.startsWith('/'+g+'/'))||'general')===group)){
 text+=`\nPAGE ${p.route}\nTITLE ${p.title}\nMETA ${p.description}\n`;
 for(const b of p.blocks){if(!seen.has(b)){text+=b+'\n';seen.add(b);count++}}
 }
 fs.writeFileSync(`${out}/${mode}-${group}.txt`,text);
}
console.log({pages:pages.length,uniqueBlocks:count,out});
