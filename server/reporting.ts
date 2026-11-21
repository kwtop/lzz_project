import type {Env} from './types';
import {HttpError,text} from './http';
import {platformSQL} from './attribution';
import {contactEvents, highIntentEvents} from '../src/lib/visitEvents';

export const intentEventSQL = [...highIntentEvents].map(type => `'${type}'`).join(',');
export const contactEventSQL = contactEvents.map(type => `'${type}'`).join(',');

export const DAY=86400000,HOUR=3600000,OFFSET=8*HOUR;
export const beijingDate=(timestamp:number)=>new Date(timestamp+OFFSET).toISOString().slice(0,10);
export const beijingDayStart = (timestamp: number) =>
  Math.floor((timestamp + OFFSET) / DAY) * DAY - OFFSET;
export const eventDayStartSQL =
  `(CAST((e.created_at + ${OFFSET}) / ${DAY} AS INTEGER) * ${DAY} - ${OFFSET})`;
export function dateStart(value:string){
 if(!/^\d{4}-\d{2}-\d{2}$/.test(value))return NaN;
 const timestamp=Date.parse(value+'T00:00:00+08:00');
 return Number.isFinite(timestamp)&&beijingDate(timestamp)===value?timestamp:NaN;
}
export function reportPeriod(url:URL,now=Date.now()){
 const today=beijingDayStart(now);
 const start=url.searchParams.has('start')?dateStart(url.searchParams.get('start')!):today;
 const endDate=url.searchParams.has('end')?dateStart(url.searchParams.get('end')!):today;
 const calendarEnd=endDate+DAY,end=Math.min(calendarEnd,now);
 const days=Math.round((calendarEnd-start)/DAY);
 if(!Number.isFinite(start)||!Number.isFinite(end)||start>end||days<1||days>366||start>today||endDate>today)throw new HttpError(400,'date_range','请选择不超过 366 天的有效日期范围。');
 return {start,end,calendarEnd,days,previousStart:start-days*DAY,previousEnd:end-days*DAY,previousChartEnd:start,timezone:'Asia/Shanghai',granularity:days===1?'hour' as const:'day' as const,now};
}
export function detailPeriod(url:URL,now=Date.now()){
 if(!url.searchParams.has('from')&&!url.searchParams.has('to')){const p=reportPeriod(url,now);return {start:p.start,end:p.end};}
 const start=Number(url.searchParams.get('from')),end=Number(url.searchParams.get('to'));
 if(!url.searchParams.has('from')||!url.searchParams.has('to')||!Number.isSafeInteger(start)||!Number.isSafeInteger(end)||start<0||start>=end||end>now+1000||end-start>366*DAY)throw new HttpError(400,'date_range','访问明细时间范围不正确。');
 return {start,end:Math.min(end,now)};
}
export const records=async<T=Record<string,unknown>>(env:Env,sql:string,args:unknown[]=[])=> (await env.DB.prepare(sql).bind(...args).all<T>()).results||[];
export const total=async(env:Env,sql:string,args:unknown[]=[])=> Number((await env.DB.prepare(sql).bind(...args).first<{total:number}>())?.total||0);
export function attributionFields(alias:string,aggregate=false){
 const visit=aggregate?'':`(SELECT v.source_platform FROM visits v WHERE v.id=${alias}.visit_id)`;
 const field=(name:string)=>aggregate?"''":`COALESCE((SELECT v.${name} FROM visits v WHERE v.id=${alias}.visit_id),'')`;
 return {
  platform:aggregate?platformSQL(alias+'.source'):`COALESCE(NULLIF(${visit},''),${platformSQL(alias+'.source')})`,
  referrer:field('referrer_host'),entry:field('entry_page'),
  basis:aggregate?"'aggregate'":`COALESCE((SELECT v.attribution_basis FROM visits v WHERE v.id=${alias}.visit_id),'legacy')`,
  utmSource:field('utm_source'),utmMedium:field('utm_medium'),utmCampaign:field('utm_campaign'),
 };
}
export function firstKnownVisitSQL(visitorId: string, asOf?: string) {
 const cutoff = asOf ? `AND known.started_at<=${asOf}` : '';
 return `SELECT known.id FROM visits known
  WHERE known.visitor_id=${visitorId} ${cutoff}
    AND (known.source NOT IN ('','unknown') OR known.source_platform NOT IN ('','unknown')
      OR known.channel NOT IN ('','unknown') OR known.referrer_host<>'')
  ORDER BY known.started_at,known.id LIMIT 1`;
}
export function reportFilter(url:URL,alias:string,bounds?:{start:number;end:number},inquiry=false,detail=false){
 const terms:string[]=[],args:(string|number)[]=[];
 if(bounds){terms.push(`${alias}.created_at>=? AND ${alias}.created_at<?`);args.push(bounds.start,bounds.end);}
 for(const field of ['source','country','product','language','device','channel']){const value=url.searchParams.get(field);if(value){terms.push(`COALESCE(NULLIF(${alias}.${field},''),'unknown')=?`);args.push(text(value,200));}}
 const a=attributionFields(alias,alias==='a');
 for(const [param,expression] of [['platform',a.platform],['referrerHost',a.referrer],['entryPage',a.entry],['utmCampaign',a.utmCampaign]] as const){const value=url.searchParams.get(param);if(value!==null){terms.push(`${expression}=?`);args.push(value==='__unrecorded'?'':(param==='utmCampaign'?text(value,80).toLowerCase():text(value,300)));}}
 const page=url.searchParams.get('pagePath');
 if(page){terms.push(inquiry?`(${alias}.page=? OR ${alias}.source_page=? OR ${alias}.source_page LIKE ?)`:`${alias}.page=?`);args.push(text(page,300));if(inquiry)args.push(text(page,300),text(page,300)+'#%');}
 if(detail&&!inquiry&&alias!=='a')for(const [param,column] of [['eventType','type'],['position','position'],['elementId','element_id'],['sectionId','section_id'],['visitId','visit_id'],['visitorId','visitor_id']] as const){const value=url.searchParams.get(param);if(value){terms.push(`${alias}.${column}=?`);args.push(text(value,200));}}
 if(detail&&!inquiry){
  if(url.searchParams.get('contacts')==='1')terms.push(`${alias}.type IN (${contactEventSQL})`);
  if(url.searchParams.get('scope')==='intent')terms.push(`${alias}.type IN (${intentEventSQL})`);
 }
 if(inquiry){
  const status=url.searchParams.get('status');if(status){if(!['new','following','completed','spam'].includes(status))throw new HttpError(400,'status','状态不正确。');terms.push(`${alias}.status=?`);args.push(status);}
  if(url.searchParams.get('unread')==='1')terms.push(`${alias}.unread=1`);
  const destination=url.searchParams.get('destination');if(destination){terms.push(`${alias}.destination_country=?`);args.push(text(destination,100));}
  const q=text(url.searchParams.get('q'),100);if(q){terms.push(`(${['name','company','email','phone','interest','requirements','id'].map(field=>`${alias}.${field} LIKE ? ESCAPE '\\'`).join(' OR ')})`);args.push(...Array(7).fill('%'+q.replace(/[\\%_]/g,'\\$&')+'%'));}
 }
 return {sql:terms.length?terms.join(' AND '):'1=1',args};
}
export function pagination(url:URL,pageSize=20){const value=Number(url.searchParams.get('p')||1);if(!Number.isSafeInteger(value)||value<1||value>100000)throw new HttpError(400,'page','页码不正确。');return{page:value,pageSize};}
