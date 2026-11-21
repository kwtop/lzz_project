import {text} from './http';

const platforms:Record<string,string[]>={
 google:['google','google.com','google.co.uk','google.com.au','google.ca','google.de','google.fr','google.co.in','google.com.hk','google.co.jp','google.co.kr','google.com.sg','google.ae','google.es','google.it','google.nl','google.com.br','google.co.nz','google.co.za','google.com.tw'],
 bing:['bing','bing.com'],duckduckgo:['duckduckgo','duckduckgo.com'],yahoo:['yahoo','yahoo.com'],baidu:['baidu','baidu.com'],yandex:['yandex','yandex.com','yandex.ru'],
 facebook:['facebook','facebook.com','fb.com'],instagram:['instagram','instagram.com'],linkedin:['linkedin','linkedin.com','lnkd.in'],youtube:['youtube','youtube.com','youtu.be'],reddit:['reddit','reddit.com'],tiktok:['tiktok','tiktok.com'],x:['x','twitter','x.com','twitter.com','t.co'],
 chatgpt:['chatgpt','chatgpt.com','chat.openai.com'],perplexity:['perplexity','perplexity.ai'],claude:['claude','claude.ai'],gemini:['gemini','gemini.google.com'],email:['email','newsletter'],
};
export function sourcePlatform(source:string){
 const name=source.toLowerCase().replace(/^www\./,'');
 const entries=Object.entries(platforms);
 return entries.find(([,hosts])=>hosts.includes(name))?.[0]||entries.flatMap(([platform,hosts])=>hosts.filter(host=>host.includes('.')).map(host=>({platform,host}))).sort((a,b)=>b.host.length-a.host.length).find(({host})=>name.endsWith('.'+host))?.platform||name||'unknown';
}
// Only infer a platform from legacy source strings, never an actual referrer.
export function platformSQL(source:string){
 return `CASE ${Object.entries(platforms).map(([platform,hosts])=>`WHEN LOWER(${source}) IN (${hosts.map(host=>`'${host}'`).join(',')}) THEN '${platform}'`).join(' ')} ${Object.entries(platforms).flatMap(([platform,hosts])=>hosts.filter(host=>host.includes('.')).map(host=>({platform,host}))).sort((a,b)=>b.host.length-a.host.length).map(({platform,host})=>`WHEN LOWER(${source}) LIKE '%.${host}' THEN '${platform}'`).join(' ')} ELSE COALESCE(NULLIF(${source},''),'unknown') END`;
}
const search=new Set(['google','bing','duckduckgo','yahoo','baidu','yandex']);
const social=new Set(['facebook','instagram','linkedin','youtube','reddit','tiktok','x']);
const ai=new Set(['chatgpt','perplexity','claude','gemini']);
export function visitAttribution(origin:string,body:Record<string,unknown>){
 const safe=(input:unknown)=>{const value=text(input,80).toLowerCase();return /^[a-z0-9_.-]{1,80}$/.test(value)?value:'';};
 const utmSource=safe(body.utmSource),utmMedium=safe(body.utmMedium),utmCampaign=safe(body.utmCampaign);
 let referrerHost='';
 try{
  const url=new URL(String(body.referrer||'')),own=new URL(origin).hostname.replace(/^www\./,'');
  const host=url.hostname.toLowerCase().replace(/^www\./,'');
  if(['http:','https:'].includes(url.protocol)&&host!==own&&!['lzz-cnc.com'].includes(host))referrerHost=host;
 }catch{/* Missing attribution is not evidence of direct traffic. */}
 const adSource=['google','bing'].includes(String(body.adSource))?String(body.adSource):'';
 const source=adSource||utmSource||referrerHost||'unknown';
 const platform=sourcePlatform(source);
 let channel='unknown';
 if(adSource||/^(paidsearch|paid_search)$/.test(utmMedium))channel='paid_search';
 else if(/^(cpc|ppc|paid)$/.test(utmMedium))channel=social.has(platform)?'paid_social':search.has(platform)?'paid_search':'campaign';
 else if(/^(paid_social|paidsocial)$/.test(utmMedium))channel='paid_social';
 else if(utmMedium==='email')channel='email';
 else if(utmMedium==='referral')channel='referral';
 else if(utmMedium==='organic')channel='organic_search';
 else if(utmSource)channel='campaign';
 else if(search.has(platform)&&referrerHost)channel='organic_search';
 else if(social.has(platform))channel='social';
 else if(ai.has(platform))channel='ai_referral';
 else if(referrerHost)channel='referral';
 return {source,channel,sourcePlatform:platform,referrerHost,utmSource,utmMedium,utmCampaign,attributionBasis:adSource?'ad_marker':utmSource||utmMedium||utmCampaign?'utm':referrerHost?'referrer':'unavailable'};
}
