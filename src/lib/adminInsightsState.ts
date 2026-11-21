export type Preset='today'|'yesterday'|'7d'|'30d'|'custom';
export type AdminTab='overview'|'inquiries'|'visitors';
export type AdminFilters={start:string;end:string;preset:Preset;source:string;platform:string;channel:string;referrerHost:string;entryPage:string;pagePath:string;utmCampaign:string;country:string;device:string;product:string;language:string;q:string;status:string;unread:boolean;allTime:boolean;destination:string};
export type Drill={kind:'visits'|'events';title:string;from:number;to:number;params:Record<string,string>;page:number;scroll?:number};
export type JourneyContext={visitId?:string;eventId?:string;all?:boolean;page?:number;cursor?:string;direction?:'before'|'after';events?:'all'|'intent';params?:Record<string,string>};
export type AdminDetail={kind:'records';drill:Drill}|{kind:'journey';id:string;context:JourneyContext}|{kind:'inquiry';id:string};
export type ReturnPeriod=Pick<AdminFilters,'start'|'end'|'preset'>;
export type SourceDisclosure={key:string;page:number;view?:'products'};
export type AdminView={sourceDisclosure:SourceDisclosure;tab:AdminTab;analytics:AdminFilters;inquiries:AdminFilters;page:number;sourcePage:number;details:AdminDetail[];returnPeriod:ReturnPeriod|null};
export const adminDate=(timestamp:number)=>new Date(timestamp+8*3600000).toISOString().slice(0,10);
export function presetDates(preset:Preset,now=Date.now()){
 const end=adminDate(now-(preset==='yesterday'?86400000:0));
 return {preset,start:adminDate(now-(preset==='7d'?6:preset==='30d'?29:preset==='yesterday'?1:0)*86400000),end};
}
export const defaultAdminFilters=():AdminFilters=>({...presetDates('today'),source:'',platform:'',channel:'',referrerHost:'',entryPage:'',pagePath:'',utmCampaign:'',country:'',device:'',product:'',language:'',q:'',status:'',unread:false,allTime:true,destination:''});
const flags=new Set(['unread','allTime']);
const pageNumber=(value:unknown)=>Math.max(1,Math.min(100000,Math.floor(Number(value)||1)));
const object=(value:unknown):value is Record<string,unknown>=>Boolean(value)&&typeof value==='object'&&!Array.isArray(value);
function safeParams(value:unknown){return object(value)?Object.fromEntries(Object.entries(value).slice(0,30).filter(([key,val])=>/^[a-zA-Z]{1,30}$/.test(key)&&typeof val==='string').map(([key,val])=>[key,String(val).slice(0,1000)])):{};}
function safeDetail(value:unknown):AdminDetail|null{
 if(!object(value))return null;
 if(value.kind==='records'&&object(value.drill)){
  const d=value.drill;
  if(!['events','visits'].includes(String(d.kind))||!Number.isSafeInteger(d.from)||!Number.isSafeInteger(d.to)||Number(d.from)<0||Number(d.to)<=Number(d.from)||typeof d.title!=='string')return null;
  return {kind:'records',drill:{kind:d.kind as Drill['kind'],title:d.title.slice(0,300),from:Number(d.from),to:Number(d.to),params:safeParams(d.params),page:pageNumber(d.page),scroll:Math.max(0,Math.min(1000000,Number(d.scroll)||0))}};
 }
 if(typeof value.id!=='string'||! /^[\w-]{1,80}$/.test(value.id))return null;
 if(value.kind==='inquiry')return {kind:'inquiry',id:value.id};
 if(value.kind!=='journey')return null;
 const c=object(value.context)?value.context:{},context:JourneyContext={page:pageNumber(c.page)};
 for(const key of ['visitId','eventId','cursor'] as const)if(typeof c[key]==='string')context[key]=c[key].slice(0,1000);
 if(c.direction==='before'||c.direction==='after')context.direction=c.direction;
 if(c.all===true)context.all=true;if(c.events==='all'||c.events==='intent')context.events=c.events;if(object(c.params))context.params=safeParams(c.params);
 return {kind:'journey',id:value.id,context};
}
function parseFilters(params:URLSearchParams,prefix:string){
 const filters=defaultAdminFilters();
 for(const key of Object.keys(filters) as (keyof AdminFilters)[]){const value=params.get(prefix+key);if(value!==null){if(flags.has(key))(filters as unknown as Record<string,unknown>)[key]=value==='1';else(filters as unknown as Record<string,unknown>)[key]=value.slice(0,300);}}
 if(!['today','yesterday','7d','30d','custom'].includes(filters.preset))filters.preset='custom';
 if(filters.preset!=='custom'){const expected=presetDates(filters.preset);if(expected.start!==filters.start||expected.end!==filters.end)filters.preset='custom';}
 return filters;
}
export function readAdminView(search=typeof window==='undefined'?'':window.location.search):AdminView{
 const p=new URLSearchParams(search),tab=p.get('tab');let details:AdminDetail[]=[],returnPeriod:ReturnPeriod|null=null;
 try{const input=p.get('details')||'[]';if(input.length<16000){const value=JSON.parse(input);if(Array.isArray(value)&&value.length<=6)details=value.map(safeDetail).filter((item):item is AdminDetail=>item!==null);}}
 catch{/* A malformed detail link does not prevent opening the dashboard. */}
 try{const value=JSON.parse(p.get('return')||'null');if(value&&typeof value.start==='string'&&typeof value.end==='string')returnPeriod=value;}catch{/* No return period. */}
 const sourceDisclosure:SourceDisclosure={key:(p.get('se')||'').slice(0,500),page:pageNumber(p.get('lp'))};
 if(sourceDisclosure.key&&p.get('sv')==='products')sourceDisclosure.view='products';
 return {tab:tab==='inquiries'||tab==='visitors'?tab:'overview',analytics:parseFilters(p,'a_'),inquiries:parseFilters(p,'i_'),page:pageNumber(p.get('p')),sourcePage:pageNumber(p.get('sp')),sourceDisclosure,details,returnPeriod};
}
export function adminViewQuery(view:AdminView){
 const p=new URLSearchParams(),defaults=defaultAdminFilters();p.set('tab',view.tab);
 for(const [prefix,filters] of [['a_',view.analytics],['i_',view.inquiries]] as const)for(const key of Object.keys(defaults) as (keyof AdminFilters)[]){if(key==='start'||key==='end'||key==='preset'||filters[key]!==defaults[key])p.set(prefix+key,flags.has(key)?filters[key]?'1':'0':String(filters[key]));}
 if(view.sourceDisclosure.key){p.set('se',view.sourceDisclosure.key);if(view.sourceDisclosure.view)p.set('sv',view.sourceDisclosure.view);if(view.sourceDisclosure.page>1)p.set('lp',String(view.sourceDisclosure.page));}
 if(view.page>1)p.set('p',String(view.page));if(view.sourcePage>1)p.set('sp',String(view.sourcePage));if(view.details.length)p.set('details',JSON.stringify(view.details));if(view.returnPeriod)p.set('return',JSON.stringify(view.returnPeriod));
 return p.toString();
}
