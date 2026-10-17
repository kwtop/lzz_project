import fs from 'node:fs';
import path from 'node:path';
import {load} from 'cheerio';
import sharp from 'sharp';
const root=path.resolve(process.env.LZZ_CONTENT_ROOT || '../../raw/_content');
const pages=JSON.parse(fs.readFileSync(path.join(root,'_meta/page-manifest.json'),'utf8'));
const assets=JSON.parse(fs.readFileSync(path.join(root,'_meta/asset-manifest.json'),'utf8'));
fs.mkdirSync('public/media',{recursive:true}); fs.mkdirSync('src/data',{recursive:true});
const media=new Map();
for(const a of assets.filter(a=>a.localPath && a.status===200)){
 const filename=path.parse(a.localPath).name+'.webp';
 try {await sharp(path.join(root,a.localPath)).rotate().resize({width:1600,height:1600,fit:'inside',withoutEnlargement:true}).webp({quality:85}).toFile('public/media/'+filename);media.set(a.url,'/media/'+filename);}catch{}
}
const slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const grouped=new Map();
for(const p of pages.filter(p=>p.type==='product-detail')){
 const key=p.productName.trim(); if(!grouped.has(key))grouped.set(key,[]);grouped.get(key).push(p);
}
const urlMap=new Map();
for(const [name,group] of grouped)for(const p of group)urlMap.set(p.url,'/machined-parts/gallery/'+slug(name)+'/');
const resourceRoutes=JSON.parse(fs.readFileSync(path.resolve('src/data/resourceRoutes.json'),'utf8'));
for(const p of pages.filter(p=>p.type==='article-detail')){
 const articleSlug=slug(p.url.split('/').pop());
 const key=resourceRoutes.sourceArticleAliases[articleSlug]||articleSlug;
 urlMap.set(p.url,resourceRoutes.guides[key]||'/about/company-news/'+articleSlug+'/');
}
for(const p of pages.filter(p=>p.type==='product-category'))urlMap.set(p.url,'/capabilities/'+slug(p.url.split('/').pop())+'/');
function clean(html){
 const $=load(html||'',null,false);$('script,style,iframe,form,input,button').remove();
 $('*').each((_,el)=>{for(const attr of Object.keys(el.attribs||{})){if(!['href','src','alt','colspan','rowspan'].includes(attr))$(el).removeAttr(attr);}});
 $('img').each((_,el)=>{const src=media.get($(el).attr('src')); if(src)$(el).attr('src',src).attr('loading','lazy');else $(el).remove();});
 $('a').each((_,el)=>{let href=$(el).attr('href');try{href=new URL(href,'https://www.lzz-cnc.com').href;}catch{} if(urlMap.has(href))$(el).attr('href',urlMap.get(href));else if(!/^https?:|^mailto:/.test(href||''))$(el).removeAttr('href');});
 return $.html();
}
const products=[...grouped].map(([name,group])=>{
 const p=group.find(p=>!/^\d+$/.test(p.url.split('/').pop()))||group[0];const $=load(fs.readFileSync(path.join(root,p.rawHtml),'utf8'));
 const info=$('.pd-r1-info').clone();info.children('.h3').remove();const introduction=clean(info.html());
 const intro=info.text().trim();
 const categories=[...new Set(group.flatMap(p=>p.categories))];
 return {slug:slug(name),name,categories,images:[...new Set(group.flatMap(p=>p.dynamicImages).map(u=>media.get(u)).filter(Boolean))],description:(intro||p.description).slice(0,170),html:introduction+clean($('.detailtext .contant').html()||$('.detailtext').html()),source:p.url,sourceAliases:group.map(p=>p.url)};
});
const categories=[...new Set(products.flatMap(p=>p.categories))].map(name=>({name:name.replace(/-/g,' '),key:name,slug:slug(name),count:products.filter(p=>p.categories.includes(name)).length}));
const articles=pages.filter(p=>p.type==='article-detail').map(p=>{const $=load(fs.readFileSync(path.join(root,p.rawHtml),'utf8'));const html=clean($('.ad-body').html());return{slug:slug(p.url.split('/').pop()),title:$('h1').first().text().trim()||p.title,description:p.description,html,source:p.url,image:load(html)('img').first().attr('src')||'',date:$('.ad-time,.date,time').first().text().trim()};});
const companyAssets=assets.filter(a=>a.localPath?.startsWith('images/company/')).map(a=>({source:a.url,image:media.get(a.url)})).filter(a=>a.image);
fs.writeFileSync('src/data/catalog.json',JSON.stringify({products,categories,articles,companyAssets},null,2));
console.log(JSON.stringify({products:products.length,categories:categories.length,articles:articles.length,media:media.size,missingImages:products.filter(p=>!p.images.length).map(p=>p.name),emptyDetails:products.filter(p=>!p.html).map(p=>p.name)},null,2));
