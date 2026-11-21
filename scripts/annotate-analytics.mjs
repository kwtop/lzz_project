import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {load} from 'cheerio';

const ROOT=fileURLToPath(new URL('../',import.meta.url));
const escape=value=>String(value).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
export function annotateAnalytics(html,route){
 const $=load(html,{sourceCodeLocationInfo:true});
 if(/noindex|none/i.test($('meta[name="robots"]').attr('content')||''))return {html,count:0,ids:[]};
 const additions=[],used=new Set(),occurrences=new Map();
 $('a[href]').each((_,element)=>{
  const a=$(element);let url;try{url=new URL(a.attr('href'),'https://www.lzz-cnc.com'+route);}catch{return;}
  let type='',target='';
  if(url.protocol==='mailto:'){type='email_click';target='mailto:'+url.pathname;}
  else if(/(^|\.)(wa\.me|whatsapp\.com)$/.test(url.hostname)){type='whatsapp_click';target=url.origin+url.pathname;const phone=url.searchParams.get('phone');if(phone)target='https://wa.me/'+phone.replace(/^\+/,'');}
  else if(url.origin==='https://www.lzz-cnc.com'){
   if(url.pathname==='/quote/'||url.pathname==='/es/cotizacion/')type='quote_click';
   else if(a.is('[download]')||url.pathname.startsWith('/downloads/')||/\.(pdf|zip|step|stp|iges|igs|dxf|dwg|stl)$/i.test(url.pathname))type='download_click';
   target=url.pathname+(/^#[a-zA-Z][\w:.-]{0,99}$/.test(url.hash)?url.hash:'');
  }
  if(!type)return;
  const position=a.closest('header.site-header').length?'header':a.closest('footer').length?'footer':a.closest('.inquiry-form').length?'quote-form':a.closest('[class*="hero"]').length?'hero':'main';
  const section=position==='header'?$('header.site-header').first():position==='footer'?$('footer').first():a.closest('section[id],[data-core-section],.inquiry-form').first();
  const sectionId=section.attr('id')||section.attr('data-core-section')||position;
  const label=(a.attr('aria-label')||a.text().trim()||{email_click:'Email',whatsapp_click:'WhatsApp',quote_click:'Request a quote',download_click:'Download'}[type]).replace(/\s+/g,' ').slice(0,120);
  const sectionLabel=({header:'导航栏',footer:'页脚','quote-form':'询盘表单'}[position]||section.find('h2,h1,h3').first().text().trim()||section.attr('data-core-section')||{hero:'首屏',main:'正文'}[position]).replace(/\s+/g,' ').slice(0,120);
  const base='cta-'+createHash('sha256').update([position,sectionId,type,target].join('|')).digest('hex').slice(0,12),ordinal=(occurrences.get(base)||0)+1;occurrences.set(base,ordinal);
  const id=a.attr('data-analytics-id')||base+(ordinal>1?'-'+ordinal:'');
  if(used.has(id))throw Error(route+': duplicate analytics element '+id);used.add(id);
  const attributes={'data-analytics-id':id,'data-analytics-type':type,'data-analytics-label':label,'data-analytics-section':sectionId.slice(0,100),'data-analytics-section-label':sectionLabel,'data-analytics-target':target};
  if(a.closest('astro-island').length){
   const missing=Object.keys(attributes).filter(key=>!a.attr(key));
   if(missing.length)throw Error(route+': React contact link needs source metadata: '+missing.join(', '));
  }
  const location=element.sourceCodeLocation?.startTag;if(!location)throw Error(route+': CTA source location missing');
  const text=Object.entries(attributes).filter(([key])=>!a.attr(key)).map(([key,value])=>' '+key+'="'+escape(value)+'"').join('');
  additions.push({offset:location.endOffset-1,text});
 });
 for(const addition of additions.sort((a,b)=>b.offset-a.offset))html=html.slice(0,addition.offset)+addition.text+html.slice(addition.offset);
 return {html,count:used.size,ids:[...used]};
}
export async function annotateSite(root=ROOT){
 const dist=path.join(root,'dist'),rows=[];
 for(const entry of await fs.readdir(dist,{recursive:true})){
  if(!entry.endsWith('.html'))continue;
  const file=path.join(dist,entry),route='/'+entry.split(path.sep).join('/').replace(/(^|\/)index\.html$/,'$1');
  const result=annotateAnalytics(await fs.readFile(file,'utf8'),route);
  if(result.count){await fs.writeFile(file,result.html);rows.push({route,count:result.count});}
 }
 const dir=path.join(root,'node_modules/.cache/lzz-analytics');await fs.mkdir(dir,{recursive:true});await fs.writeFile(path.join(dir,'annotations.json'),JSON.stringify(rows,null,2));
 return {pages:rows.length,links:rows.reduce((s,r)=>s+r.count,0)};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))console.log(JSON.stringify(await annotateSite()));
