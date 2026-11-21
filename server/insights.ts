import type {Env} from './types';
import {HttpError,json,uuid} from './http';
import {attributionFields,beijingDate,contactEventSQL,detailPeriod,eventDayStartSQL,firstKnownVisitSQL,HOUR,DAY,intentEventSQL,pagination,records,reportFilter,reportPeriod,total} from './reporting';
import {platformSQL,sourcePlatform} from './attribution';

import type {Acquisition,AcquisitionSource,StatsV2,TrendBucket,SourceRow,ProductInterest,EventRecord,VisitOrigin,VisitRecord,JourneyV2} from "../src/lib/insightTypes";
export type {StatsV2,TrendBucket,SourceRow,Paged,EventRecord,VisitRecord,JourneyV2} from "../src/lib/insightTypes";

async function metrics(env:Env,url:URL,bounds:{start:number;end:number}):Promise<Record<string,number>>{
 const e=reportFilter(url,'e',bounds),i=reportFilter(url,'i',bounds,true);
 const data = await env.DB.prepare(`
   SELECT COUNT(*) totalEvents,COUNT(DISTINCT e.visitor_id) visitors,
     COUNT(DISTINCT e.visit_id) visits,COALESCE(SUM(e.type='page_view'),0) pageViews,
     COUNT(DISTINCT CASE WHEN browser.first_seen < ${eventDayStartSQL} THEN e.visitor_id END) returningVisitors,
     COALESCE(SUM(e.type IN (${contactEventSQL})),0) contactClicks,
     COALESCE(SUM(e.type IN (${intentEventSQL})),0) intentActions,
     COUNT(DISTINCT CASE WHEN e.type IN (${intentEventSQL}) THEN e.visitor_id END) intentVisitors,
     COALESCE(SUM(e.type='whatsapp_click'),0) whatsappClicks,
     COUNT(DISTINCT CASE WHEN e.type='whatsapp_click' THEN e.visitor_id END) whatsappVisitors,
     COALESCE(SUM(e.type='email_click'),0) emailClicks,
     COUNT(DISTINCT CASE WHEN e.type='email_click' THEN e.visitor_id END) emailVisitors,
     COALESCE(SUM(e.type='quote_click'),0) quoteClicks,
     COALESCE(SUM(e.type='download_click'),0) downloadClicks,
     COUNT(DISTINCT CASE WHEN e.type='form_start' THEN e.visitor_id END) formStarters,
     COALESCE(SUM(e.type='form_error'),0) formErrors
   FROM events e LEFT JOIN visitors browser ON browser.id=e.visitor_id
   WHERE ${e.sql}
 `).bind(...e.args).first<Record<string,number>>();
 return {...data,inquiries:await total(env,`SELECT COUNT(*) total FROM inquiries i WHERE ${i.sql}`,i.args)};
}
async function trend(env: Env, url: URL, start: number, calendarEnd: number, dataEnd: number, granularity: 'hour' | 'day'): Promise<TrendBucket[]> {
 const hourly = granularity === 'hour';
 const step = hourly ? HOUR : DAY;
 const count = Math.round((calendarEnd - start) / step);
 const e = reportFilter(url, 'e', {start, end: dataEnd});
 const i = reportFilter(url, 'i', {start, end: dataEnd}, true);
 type EventBucket = {bucket: number; visitors: number; visits: number; pageViews: number; whatsappClicks: number; emailClicks: number};
 const [eventRows, inquiryRows] = await Promise.all([
  records<EventBucket>(env, `SELECT CAST((e.created_at-?)/? AS INTEGER) bucket,
    COUNT(DISTINCT e.visitor_id) visitors, COUNT(DISTINCT e.visit_id) visits,
    SUM(e.type='page_view') pageViews, SUM(e.type='whatsapp_click') whatsappClicks, SUM(e.type='email_click') emailClicks
    FROM events e WHERE ${e.sql} GROUP BY bucket`, [start, step, ...e.args]),
  records<{bucket: number; inquiries: number}>(env, `SELECT CAST((i.created_at-?)/? AS INTEGER) bucket,
    COUNT(*) inquiries FROM inquiries i WHERE ${i.sql} GROUP BY bucket`, [start, step, ...i.args]),
 ]);
 const events = new Map(eventRows.map(row => [row.bucket, row]));
 const inquiries = new Map(inquiryRows.map(row => [row.bucket, row.inquiries]));
 return Array.from({length: count}, (_, bucket) => {
  const from = start + bucket * step, to = from + step;
  const date = beijingDate(from), future = from >= dataEnd;
  const event = events.get(bucket);
  return {
   bucket, date, label: hourly ? String(bucket).padStart(2, '0') + ':00' : date,
   from, to: Math.min(to, dataEnd), future, partial: !future && to > dataEnd,
   visitors: future ? null : event?.visitors ?? 0,
   visits: future ? null : event?.visits ?? 0,
   pageViews: future ? null : event?.pageViews ?? 0,
   whatsappClicks: future ? null : event?.whatsappClicks ?? 0,
   emailClicks: future ? null : event?.emailClicks ?? 0,
   inquiries: future ? null : inquiries.get(bucket) ?? 0,
  };
 });
}

async function acquisitionSources(env: Env, filter: ReturnType<typeof reportFilter>): Promise<Acquisition> {
 const fields = attributionFields('e');
 // Count each matching visit once while retaining the linked event's filter dimensions.
 const rows = await records<AcquisitionSource & {allVisits: number}>(env, `WITH matched AS (
   SELECT MIN(e.id) eventId FROM events e WHERE ${filter.sql} GROUP BY e.visit_id
  ), grouped AS (
   SELECT ${fields.platform} platform, COALESCE(NULLIF(e.channel,''),'unknown') channel, COUNT(*) visits
   FROM matched JOIN events e ON e.id=matched.eventId GROUP BY platform,channel
  )
  SELECT *,SUM(visits) OVER () allVisits FROM grouped ORDER BY visits DESC,platform,channel LIMIT 5`, filter.args);
 const count = rows[0]?.allVisits ?? 0;
 const items = rows.map(({platform, channel, visits}) => ({platform, channel, visits}));
 return {total: count, items, other: count - items.reduce((sum, source) => sum + source.visits, 0)};
}
export async function detailedOverview(env:Env,url:URL){
 const range=reportPeriod(url),e=reportFilter(url,'e',range),breakdowns:StatsV2['breakdowns']={};
 const current=await metrics(env,url,range),previous=await metrics(env,url,{start:range.previousStart,end:range.previousEnd});
 for(const field of ['source','channel','country','device','language'])breakdowns[field]=await records(env,`SELECT COALESCE(NULLIF(${field},''),'unknown') name,COUNT(*) views,COUNT(DISTINCT visitor_id) visitors FROM events e WHERE ${e.sql} AND type='page_view' GROUP BY name ORDER BY views DESC LIMIT 30`,e.args);
 const pages=await records<{name:string;views:number;visitors:number}>(env,`SELECT page name,COUNT(*) views,COUNT(DISTINCT visitor_id) visitors FROM events e WHERE ${e.sql} AND type='page_view' GROUP BY page ORDER BY views DESC LIMIT 30`,e.args);
 const products=await records<{name:string;views:number;visitors:number}>(env,`SELECT product name,COUNT(*) views,COUNT(DISTINCT visitor_id) visitors FROM events e WHERE ${e.sql} AND type='product_view' AND product<>'' GROUP BY product ORDER BY views DESC LIMIT 30`,e.args);
 const [currentTrend, previousTrend, acquisition] = await Promise.all([
  trend(env, url, range.start, range.calendarEnd, range.end, range.granularity),
  trend(env, url, range.previousStart, range.previousChartEnd, range.previousChartEnd, range.granularity),
  acquisitionSources(env, e),
 ]);
 return json({mode:'detailed',range,current,previous,trend:currentTrend,previousTrend,acquisition,breakdowns,pages,products,updatedAt:Date.now(),checks:{pageViewsByCountry:current.pageViews,inquiriesByStatus:await records(env,`SELECT status,COUNT(*) total FROM inquiries i WHERE ${reportFilter(url,'i',range,true).sql} GROUP BY status`,reportFilter(url,'i',range,true).args)},scope:'每天每个浏览器计一位访客，首次记录日期早于当日即标记为回访。多天总览按所选范围内的浏览器去重，小时数据按小时去重。一次访问可以包含多次浏览或点击，连续30分钟无活动或入口来源改变时会开启新访问。'});
}

function sourceData(url:URL,bounds:{start:number;end:number}){
 const e=reportFilter(url,'e',bounds),i=reportFilter(url,'i',bounds,true),ea=attributionFields('e'),ia=attributionFields('i');
 const cols=(alias:string,a:ReturnType<typeof attributionFields>)=>`${a.platform} platform,${alias}.channel,${a.referrer} referrerHost,${a.entry} entryPage,${a.basis} basis,${alias}.visitor_id,${alias}.visit_id`;
 return {sql:`WITH data AS (SELECT ${cols('e',ea)},e.type,0 saved FROM events e WHERE ${e.sql} UNION ALL SELECT ${cols('i',ia)},'inquiry_success',1 FROM inquiries i WHERE ${i.sql})`,args:[...e.args,...i.args]};
}
function productInterestQuery(filter:string){
 return `SELECT e.product,SUM(e.type='product_view') views,
  COUNT(DISTINCT CASE WHEN e.type='product_view' THEN e.visitor_id END) visitors,
  SUM(e.type IN (${intentEventSQL})) intentActions
  FROM events e WHERE ${filter} AND e.product<>'' AND (e.type='product_view' OR e.type IN (${intentEventSQL}))
  GROUP BY e.product HAVING views>0`;
}
export async function sourceDetails(env:Env,url:URL){
 if(env.ANALYTICS_MODE==='aggregate')return json({items:[],total:0,page:1,pageSize:20,unavailable:'汇总模式没有个人来源与访问明细。'});
 const by = url.searchParams.get('by');
 const range = detailPeriod(url);
 const {page, pageSize} = pagination(url, !by && url.searchParams.get('pageSize') === '10' ? 10 : 20);
 if(by==='products'){
  const filter=reportFilter(url,'e',range),query=productInterestQuery(filter.sql);
  const [items,count]=await Promise.all([
   records<ProductInterest>(env,query+' ORDER BY visitors DESC,views DESC,product LIMIT ? OFFSET ?',[...filter.args,pageSize,(page-1)*pageSize]),
   total(env,`SELECT COUNT(*) total FROM (SELECT DISTINCT e.product FROM events e WHERE ${filter.sql} AND e.type='product_view' AND e.product<>'')`,filter.args),
  ]);
  return json({items,total:count,page,pageSize});
 }
 const {sql,args}=sourceData(url,range),landing=by==='landing';
 const group='platform,channel,referrerHost'+(landing?',entryPage':'');
 const columns=`platform,channel,referrerHost,${landing?'entryPage':"'' entryPage"},GROUP_CONCAT(DISTINCT basis) basis,COUNT(DISTINCT CASE WHEN saved=0 THEN visitor_id END) visitors,COUNT(DISTINCT CASE WHEN saved=0 THEN visit_id END) visits,SUM(type='page_view' AND saved=0) views,SUM(type='whatsapp_click') whatsappClicks,SUM(type='email_click') emailClicks,SUM(saved=0 AND type IN (${intentEventSQL})) intentActions,SUM(saved) inquiries`;
 return json({items:await records<SourceRow>(env,`${sql} SELECT ${columns} FROM data GROUP BY ${group} ORDER BY visitors DESC,visits DESC,platform,channel,referrerHost${landing?',entryPage':''} LIMIT ? OFFSET ?`,[...args,pageSize,(page-1)*pageSize]),total:await total(env,`${sql} SELECT COUNT(*) total FROM (SELECT 1 FROM data GROUP BY ${group})`,args),page,pageSize});
}
export async function eventDetails(env:Env,url:URL){
 if(env.ANALYTICS_MODE==='aggregate')return json({items:[],total:0,page:1,pageSize:20,unavailable:'汇总模式没有个人点击明细。'});
 const range=detailPeriod(url),e=reportFilter(url,'e',range,false,true),{page,pageSize}=pagination(url),a=attributionFields('e');
 return json({items:await records<EventRecord>(env,`SELECT e.*,${a.platform} platform,${a.referrer} referrer_host,${a.entry} entry_page,${a.basis} attribution_basis,${a.utmSource} utm_source,${a.utmMedium} utm_medium,${a.utmCampaign} utm_campaign FROM events e WHERE ${e.sql} ORDER BY created_at DESC,sequence DESC,id DESC LIMIT ? OFFSET ?`,[...e.args,pageSize,(page-1)*pageSize]),total:await total(env,`SELECT COUNT(*) total FROM events e WHERE ${e.sql}`,e.args),page,pageSize});
}
function visitSelection(url:URL,bounds?:{start:number;end:number},visitorId?:string){
 const e=reportFilter(url,'e',bounds,false,true),terms=[e.sql];if(visitorId){terms.push('e.visitor_id=?');e.args.push(visitorId);}
 return {sql:terms.join(' AND '),args:e.args};
}
async function visitRows(env:Env,url:URL,bounds:{start:number;end:number}|undefined,visitorId?:string,p=1){
 const f=visitSelection(url,bounds,visitorId);
 const sql=`WITH matching AS (SELECT e.* FROM events e WHERE ${f.sql}), summary AS (SELECT visit_id,visitor_id,MIN(created_at) active_from,MAX(created_at) active_to,SUM(type='page_view') views,SUM(type='whatsapp_click') whatsappClicks,SUM(type='email_click') emailClicks,SUM(type='quote_click') quoteClicks,SUM(type='download_click') downloads FROM matching GROUP BY visit_id,visitor_id) SELECT s.*,v.id,v.started_at,v.last_seen,v.source,v.channel,COALESCE(NULLIF(v.source_platform,''),${platformSQL('v.source')}) platform,v.referrer_host,v.attribution_basis,v.entry_page,v.utm_source,v.utm_medium,v.utm_campaign,v.country,v.device,v.language,(SELECT COUNT(*) FROM inquiries i WHERE i.visit_id=v.id AND ${reportFilter(url,'i',bounds,true).sql}) inquiries FROM summary s JOIN visits v ON v.id=s.visit_id`;
 const iq=reportFilter(url,'i',bounds,true);
 return {items:await records<VisitRecord>(env,sql+' ORDER BY active_to DESC,id DESC LIMIT 20 OFFSET ?',[...f.args,...iq.args,(p-1)*20]),total:await total(env,`SELECT COUNT(DISTINCT e.visit_id) total FROM events e WHERE ${f.sql}`,f.args),page:p,pageSize:20};
}
export async function visitDetails(env:Env,url:URL){
 if(env.ANALYTICS_MODE==='aggregate')return json({items:[],total:0,page:1,pageSize:20,unavailable:'汇总模式没有个人访问记录。'});
 return json(await visitRows(env,url,detailPeriod(url),undefined,pagination(url).page));
}

type Cursor={time:number;sequence:number;id:string};
const pack=(e:EventRecord)=>btoa(JSON.stringify({time:e.created_at,sequence:e.sequence||0,id:e.id}));
function unpack(value:string):Cursor{try{const c=JSON.parse(atob(value));if(!Number.isSafeInteger(c.time)||c.time<0||!Number.isSafeInteger(c.sequence)||c.sequence<0||typeof c.id!=='string'||!(/^(?:inquiry:)?[\w-]{1,80}$/.test(c.id)))throw Error();return c;}catch{throw new HttpError(400,'cursor','轨迹分页位置不正确。');}}
const order='created_at,sequence,id';
const compare=(sign:string)=>`(created_at ${sign} ? OR (created_at=? AND (sequence ${sign} ? OR (sequence=? AND id ${sign} ?))))`;
const cursorArgs=(c:Cursor)=>[c.time,c.time,c.sequence,c.sequence,c.id];
const eventUnion=`SELECT id,visitor_id,visit_id,type,created_at,received_at,time_basis,sequence,page,page_title,section_id,section_label,element_id,element_label,target,position,resource,error_code,product,language,source,channel,country,device FROM events WHERE visitor_id=? AND visit_id=? UNION ALL SELECT 'inquiry:'||i.id,i.visitor_id,i.visit_id,'inquiry_success',i.created_at,i.created_at,'server',0,i.page,'','','','','','','quote-form','','',i.product,i.language,i.source,i.channel,i.country,i.device FROM inquiries i WHERE i.visitor_id=? AND i.visit_id=? AND NOT EXISTS(SELECT 1 FROM events e WHERE e.id='inquiry:'||i.id)`;
export async function visitorJourney(env:Env,id:string,url:URL){
 if(!uuid(id))throw new HttpError(404,'not_found','访客不存在。');
 const visitor=await env.DB.prepare('SELECT id,first_seen,last_seen FROM visitors WHERE id=?').bind(id).first<JourneyV2['visitor']>();
 if(!visitor)throw new HttpError(404,'not_found','访客不存在。');
 const all=url.searchParams.get('all')==='1',page=pagination(url).page;
 const bounds=all?undefined:detailPeriod(url);
 const visitURL=new URL(url);for(const key of ['visitId','eventId','cursor','direction'])visitURL.searchParams.delete(key);
 const [visits, firstSource] = await Promise.all([
  visitRows(env,visitURL,bounds,id,page),
  env.DB.prepare(`SELECT v.source,COALESCE(NULLIF(v.source_platform,''),${platformSQL('v.source')}) platform,
   v.channel,v.referrer_host,v.entry_page,v.attribution_basis,v.utm_source,v.utm_medium,v.utm_campaign,v.started_at
   FROM visits v WHERE v.id=(${firstKnownVisitSQL('?')})`).bind(id).first<VisitOrigin>(),
 ]);
 let visitId=url.searchParams.get('visitId')||'',focusId=url.searchParams.get('eventId')||'';
 if(focusId){const focus=await env.DB.prepare("SELECT visit_id FROM events WHERE id=? AND visitor_id=? UNION ALL SELECT visit_id FROM inquiries WHERE 'inquiry:'||id=? AND visitor_id=?").bind(focusId,id,focusId,id).first<{visit_id:string}>();if(!focus||visitId&&visitId!==focus.visit_id)throw new HttpError(404,'not_found','找不到该访客的目标记录。');visitId=focus.visit_id;}
 visitId=visitId||visits.items[0]?.id||'';
 let selectedVisit:VisitRecord|null=null,events:EventRecord[]=[],before:string|null=null,after:string|null=null;
 if(visitId){
  if(!uuid(visitId))throw new HttpError(404,'not_found','访问不存在。');
  selectedVisit=await env.DB.prepare('SELECT *,id,source_platform platform FROM visits WHERE id=? AND visitor_id=?').bind(visitId,id).first<VisitRecord>();
  if(!selectedVisit)throw new HttpError(404,'not_found','访问不存在。');
  selectedVisit.platform=sourcePlatform(selectedVisit.platform||selectedVisit.source);
  const cte=`WITH history AS (${eventUnion}), eligible AS (SELECT * FROM history${url.searchParams.get('events')==='intent'?` WHERE type IN (${intentEventSQL})`:''})`;
  const base=[id,visitId,id,visitId];
  const fetchWindow=(where:string,args:unknown[],reverse=false,limit=100)=>records<EventRecord>(env,`${cte} SELECT * FROM eligible ${where} ORDER BY ${reverse?'created_at DESC,sequence DESC,id DESC':order} LIMIT ${limit}`,[...base,...args]);
  const cursor=url.searchParams.get('cursor');
  if(cursor){const c=unpack(cursor),older=url.searchParams.get('direction')==='before';events=await fetchWindow('WHERE '+compare(older?'<':'>'),cursorArgs(c),older);if(older)events.reverse();}
  else if(focusId){const anchor=await env.DB.prepare(`${cte} SELECT * FROM eligible WHERE id=?`).bind(...base,focusId).first<EventRecord>();if(!anchor)throw new HttpError(404,'not_found','目标记录不在当前轨迹类型中。');const c={time:anchor.created_at,sequence:anchor.sequence||0,id:anchor.id};const left=await fetchWindow('WHERE '+compare('<'),cursorArgs(c),true,49),right=await fetchWindow('WHERE '+compare('>'),cursorArgs(c),false,50);events=[...left.reverse(),anchor,...right];}
  else events=(await fetchWindow('',[],true)).reverse();
  if(events.length){const first=events[0],last=events.at(-1)!;if(await total(env,`${cte} SELECT COUNT(*) total FROM eligible WHERE ${compare('<')}`,[...base,...cursorArgs({time:first.created_at,sequence:first.sequence||0,id:first.id})]))before=pack(first);if(await total(env,`${cte} SELECT COUNT(*) total FROM eligible WHERE ${compare('>')}`,[...base,...cursorArgs({time:last.created_at,sequence:last.sequence||0,id:last.id})]))after=pack(last);}
 }
 const products=selectedVisit?await records<ProductInterest>(env,productInterestQuery('e.visitor_id=? AND e.visit_id=?')+' ORDER BY views DESC,product',[id,selectedVisit.id]):[];
 return json({visitor,firstSource,visits:visits.items,visitsTotal:visits.total,visitPage:page,selectedVisit,products,events,before,after,focusEventId:focusId,inquiries:await records(env,'SELECT id,name,company,status,created_at,interest FROM inquiries WHERE visitor_id=? ORDER BY created_at DESC,id DESC',[id])});
}
