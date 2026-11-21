import {Fragment,useEffect,useRef,useState} from 'react';
import {ArrowRight, ListFilter} from 'lucide-react';
import type {Drill,JourneyContext,Preset,SourceDisclosure} from '../lib/adminInsightsState';
import type {StatsV2,TrendBucket,SourceRow,ProductInterest,VisitAttribution,Paged,VisitRecord,EventRecord,JourneyV2} from '../lib/insightTypes';
import {highIntentEvents, type VisitEventType} from '../lib/visitEvents';

export type AdminApi=<T>(path:string,init?:RequestInit)=>Promise<T>;
export const formatTime=(timestamp:number)=>new Intl.DateTimeFormat('zh-CN',{timeZone:'Asia/Shanghai',dateStyle:'short',timeStyle:'medium',hour12:false}).format(timestamp);
export const channelNames:Record<string,string>={organic_search:'自然搜索',paid_search:'付费搜索',paid_social:'付费社交',social:'社交平台',email:'邮件渠道',referral:'引荐网站',ai_referral:'AI 引荐',campaign:'推广活动',unknown:'来源未提供'};
export const platformNames:Record<string,string>={google:'Google',bing:'Bing',duckduckgo:'DuckDuckGo',yahoo:'Yahoo',baidu:'百度',yandex:'Yandex',facebook:'Facebook',instagram:'Instagram',linkedin:'LinkedIn',youtube:'YouTube',reddit:'Reddit',tiktok:'TikTok',x:'X / Twitter',chatgpt:'ChatGPT',perplexity:'Perplexity',claude:'Claude',gemini:'Gemini',email:'邮件',unknown:'来源未提供'};
export const eventNames:Record<VisitEventType,string>={
 page_view:'访问页面',product_view:'查看产品',parameters_expand:'展开参数',parameters_collapse:'收起参数',
 details_expand:'展开内容',details_collapse:'收起内容',
 image_view:'查看图片',link_click:'点击链接',button_click:'点击按钮',filter_change:'调整筛选',
 download_click:'点击资料下载',quote_click:'点击询价',whatsapp_click:'点击 WhatsApp',email_click:'点击邮箱',
 phone_click:'点击电话',form_start:'开始填写表单',attachment_select:'选择附件',form_submit:'尝试提交询盘',
 form_error:'表单错误',inquiry_success:'询盘已入库',
};
const eventLabel = (type: string) => eventNames[type as VisitEventType] || type;
const isHighIntent = (type: string) => highIntentEvents.has(type as VisitEventType);
function ActionScope({intent,onChange}:{intent:boolean;onChange:(intent:boolean)=>void}){
 return <div className="admin-action-scope" role="group" aria-label="行为范围">
   <button type="button" aria-pressed={!intent} onClick={()=>onChange(false)}>全部行为</button>
   <button type="button" aria-pressed={intent} onClick={()=>onChange(true)}>仅高意图</button>
 </div>;
}
function IntentBadge(){return <span className="admin-intent-badge">高意图</span>;}
export const positionNames:Record<string,string>={header:'导航栏',hero:'首屏',main:'正文',footer:'页脚','quote-form':'询盘表单',gallery:'图片区域',parameters:'参数区域','image-viewer':'图片查看器',unknown:'未记录'};
function countryName(code:string){try{return code&&code!=='unknown'?new Intl.DisplayNames(['zh-CN'],{type:'region'}).of(code)||code:'未记录';}catch{return code||'未记录';}}
const deviceNames:Record<string,string>={mobile:'手机',desktop:'电脑',tablet:'平板',unknown:'未记录'};
const shown=(value:unknown)=>value===undefined||value===null||value===''?'未记录':String(value);
function useResource<T>(path:string,api:AdminApi,unauthorized:()=>void,version=0){
 const [state,setState]=useState<{data?:T;loading:boolean;error:string}>({loading:true,error:''});const unauth=useRef(unauthorized);unauth.current=unauthorized;
 useEffect(()=>{const controller=new AbortController();let active=true;setState(previous=>({...previous,loading:true,error:''}));void api<T>(path,{signal:controller.signal}).then(data=>{if(active)setState({data,loading:false,error:''});}).catch(error=>{if(active){if(error.status===401)unauth.current();setState(previous=>({...previous,loading:false,error:error.message||'读取失败，请重试。'}));}});return()=>{active=false;controller.abort();};},[path,version,api]);
 return state;
}
function StateMessage({loading,error,retry}:{loading:boolean;error:string;retry?:()=>void}){return error?<div className="admin-error" role="alert">{error}{retry&&<button onClick={retry}>重新加载</button>}</div>:loading?<p className="admin-loading" role="status">正在读取数据…</p>:null;}
export function InsightPager({page,total,onChange}:{page:number;total:number;onChange:(page:number)=>void}){return <div className="admin-pager"><span>共 {total} 条 · 第 {page} / {Math.max(1,Math.ceil(total/20))} 页</span><div><button disabled={page<=1} onClick={()=>onChange(page-1)}>上一页</button><button disabled={page*20>=total} onClick={()=>onChange(page+1)}>下一页</button></div></div>;}
export function DateShortcuts({preset,select}:{preset:Preset;select:(preset:Preset)=>void}){return <div className="admin-date-shortcuts" role="group" aria-label="访问日期快捷选择">{([['today','今日'],['yesterday','昨日'],['7d','最近7天'],['30d','最近30天'],['custom','自定义日期']] as const).map(([key,label])=><button type="button" key={key} aria-pressed={preset===key} onClick={()=>select(key)}>{label}</button>)}<span>北京时间 UTC+8</span></div>;}
function comparisonLabel(range:StatsV2['range']){const partial=range.end<range.calendarEnd;return range.days===1?(partial?'昨日同时段':'前一日'):`前${range.days}天${partial?'同时段':''}`;}
function delta(current:number,previous:number,label:string){return current===previous?`与${label}持平`:!previous?`${label}为0，本期新增`:`较${label} ${current>previous?'+':''}${((current-previous)/previous*100).toFixed(1)}%`;}
function sourceParams(row:SourceRow,landing=false){return{platform:row.platform,channel:row.channel,referrerHost:row.referrerHost||'__unrecorded',...(landing?{entryPage:row.entryPage||'__unrecorded'}:{})};}

function sourceName(row:{platform:string;channel:string}){
 const channel=channelNames[row.channel]||row.channel||'来源未提供';
 return row.platform&&row.platform!=='unknown'? `${platformNames[row.platform]||row.platform} · ${channel}` : channel;
}
function basisName(basis=''){
 const names:Record<string,string>={referrer:'引荐域名',utm:'UTM 标签',ad_marker:'广告标记',legacy:'旧记录',unavailable:'来源未提供',aggregate:'汇总数据'};
 return basis.split(',').filter(Boolean).map(value=>names[value]||value).join('、');
}

type SourceTableProps={
 query:string;range:StatsV2['range'];api:AdminApi;unauthorized:()=>void;version:number;
 onRecords:(drill:Drill)=>void;onInquiries:(extra?:Record<string,string>)=>void;
 page:number;onPage:(page:number)=>void;onChannel:(value:string)=>void;
 disclosure:SourceDisclosure;onDisclosure:(value:SourceDisclosure)=>void;productName:(id:string)=>string;
};

function SourceTable({query,range,api,unauthorized,version,onRecords,onInquiries,page,onPage,onChannel,disclosure,onDisclosure,productName}:SourceTableProps){
 const filters=Object.fromEntries(new URLSearchParams(query));
 const channel=filters.channel||'';
 const result=useResource<Paged<SourceRow>>('/api/admin/sources?'+new URLSearchParams({...filters,p:String(page)}),api,unauthorized,version);
 const open=(kind:Drill['kind'],title:string,params:Record<string,string>)=>
  onRecords({kind,title,params:{...filters,...params},from:range.start,to:range.end,page:1});
 return <section className="admin-section admin-sources">
  <div className="admin-section-head"><h2>访问来源</h2><label className="admin-inline-label">渠道<select aria-label="来源表渠道" value={channel}
   onChange={event=>{onChannel(event.target.value);onDisclosure({key:'',page:1});onPage(1);}}>
   <option value="">全部渠道</option>{Object.entries(channelNames).map(([key,label])=><option key={key} value={key}>{label}</option>)}
  </select></label></div>
  <StateMessage loading={result.loading} error={result.error}/>
  {!result.loading&&!result.error&&(result.data?.items.length?<><div className="admin-table-scroll">
   <table role="table"><thead><tr><th>具体来源</th><th>访客数</th><th>访问次数</th><th>高意图动作</th><th>WhatsApp 点击</th><th>邮件点击</th><th>询盘入库</th><th>明细</th></tr></thead>
   <tbody>{result.data.items.map(row=>{
    const key=[row.platform,row.channel,row.referrerHost].join('|'), current=disclosure.key===key;
    const landingOpen=current&&!disclosure.view, productsOpen=current&&disclosure.view==='products';
    const name=sourceName(row), params=sourceParams(row);
    const toggle=(view?:'products')=>onDisclosure(current&&disclosure.view===view?{key:'',page:1}:{key,page:1,...(view?{view}:{})});
    const openVisits=()=>open('visits',name,params);
    return <Fragment key={key}>
     <tr>
      <td><button className="admin-text-button" onClick={openVisits}>{name}</button><small>{row.referrerHost||'引荐域名未记录'} · {basisName(row.basis)}</small></td>
      <td data-column="访客">{row.visitors}</td><td data-column="访问">{row.visits}</td>
      <td data-column="高意图"><button className="admin-text-button" aria-label={'查看'+name+'的高意图记录'} onClick={()=>open('events',name+' · 高意图行为',{...params,scope:'intent'})}>{row.intentActions}</button></td>
      <td data-column="WhatsApp">{row.whatsappClicks}</td><td data-column="邮件">{row.emailClicks}</td>
      <td data-column="询盘"><button className="admin-text-button" onClick={()=>onInquiries(params)}>{row.inquiries}</button></td>
      <td><button onClick={openVisits}>访问明细</button><button aria-expanded={landingOpen} onClick={()=>toggle()}>{landingOpen?'收起落地页':'查看落地页'}</button><button aria-expanded={productsOpen} onClick={()=>toggle('products')}>{productsOpen?'收起关注产品':'关注产品'}</button></td>
     </tr>
     {current&&<tr className="admin-source-landing"><td colSpan={8}>
      {productsOpen?
       <SourceProducts query={query} source={row} api={api} unauthorized={unauthorized} version={version} page={disclosure.page}
        setPage={next=>onDisclosure({...disclosure,page:next})} productName={productName}
        open={(product,intent)=>open('events',productName(product)+(intent?' · 高意图行为':' · 产品浏览记录'),{...params,product,...(intent?{scope:'intent'}:{eventType:'product_view'})})}/>:
       <LandingPages query={query} row={row} api={api} unauthorized={unauthorized} version={version} page={disclosure.page} setPage={next=>onDisclosure({...disclosure,page:next})}
        drill={landing=>open('visits',name+' / '+shown(landing.entryPage),sourceParams(landing,true))}/>}
     </td></tr>}
    </Fragment>;
   })}</tbody></table></div>
   {(result.data.total>result.data.pageSize||page>1)&&<InsightPager page={page} total={result.data.total} onChange={onPage}/>}</>:<p className="admin-empty">当前范围暂无来源记录。</p>)}
 </section>;
}

function LandingPages({row,query,api,unauthorized,version,drill,page,setPage}:{page:number;setPage:(page:number)=>void;row:SourceRow;query:string;api:AdminApi;unauthorized:()=>void;version:number;drill:(row:SourceRow)=>void}){
 const p=new URLSearchParams({...Object.fromEntries(new URLSearchParams(query)),...sourceParams(row),by:'landing',p:String(page)});
 const result=useResource<Paged<SourceRow>>('/api/admin/sources?'+p,api,unauthorized,version);
 return <div><h3>该来源的落地页</h3><StateMessage loading={result.loading} error={result.error}/>{result.data&&!result.loading&&!result.error&&<><ul className="admin-landing-list">{result.data.items.map(r=><li key={r.entryPage}><button onClick={()=>drill(r)}>{shown(r.entryPage)}</button><span>{r.visitors} 位访客 · {r.visits} 次访问 · {r.intentActions} 次高意图动作</span></li>)}</ul>{result.data.total>20&&<InsightPager page={page} total={result.data.total} onChange={setPage}/>}</>}</div>;
}

function SourceProducts({query,source,api,unauthorized,version,page,setPage,productName,open}:{
 query:string;source:SourceRow;api:AdminApi;unauthorized:()=>void;version:number;page:number;
 setPage:(page:number)=>void;productName:(id:string)=>string;open:(product:string,intent:boolean)=>void;
}){
 const params=new URLSearchParams({...Object.fromEntries(new URLSearchParams(query)),...sourceParams(source),by:'products',p:String(page)});
 const result=useResource<Paged<ProductInterest>>('/api/admin/sources?'+params,api,unauthorized,version);
 return <div><h3>该来源关注的产品</h3><StateMessage loading={result.loading} error={result.error}/>
  {result.data&&!result.loading&&!result.error&&(result.data.items.length?<><ul className="admin-landing-list admin-source-products">
   {result.data.items.map(item=><li key={item.product}>
    <button onClick={()=>open(item.product,false)}>{productName(item.product)}</button>
    <span>{item.visitors} 位访客 · {item.views} 次浏览</span>
    <button className="admin-text-button" onClick={()=>open(item.product,true)} aria-label={'查看'+productName(item.product)+'的高意图记录'}>高意图 {item.intentActions}</button>
   </li>)}</ul>
   {result.data.total>20&&<InsightPager page={page} total={result.data.total} onChange={setPage}/>}</>:<p>所选时段暂无产品浏览记录。</p>)}
 </div>;
}
function InsightChart({stats,onBucket}:{stats:StatsV2;onBucket:(bucket:TrendBucket)=>void}){
 const aggregate=stats.mode==='aggregate';
 const [metric,setMetric]=useState<'visitors'|'pageViews'|'inquiries'>(aggregate?'pageViews':'visitors'),[selected,setSelected]=useState<number|null>(null);
 const max=Math.max(1,...stats.trend.map(r=>r[metric]||0),...stats.previousTrend.map(r=>r[metric]||0)),n=stats.trend.length;
 const x=(index:number)=>55+(index+.5)/Math.max(1,n)*890,y=(value:number)=>280-value/max*236;
 const path=(rows:TrendBucket[])=>{let active=false;return rows.map((r,index)=>{const value=r[metric];if(value===null||r.future){active=false;return '';}const point=`${active?'L':'M'}${x(index).toFixed(2)} ${y(value||0).toFixed(2)}`;active=true;return point;}).join(' ');};
 const current=selected===null?null:stats.trend[selected],previous=selected===null?null:stats.previousTrend[selected];
 return <section className="admin-section admin-overview-trend"><div className="admin-section-head"><h2 id="admin-trend-heading" tabIndex={-1}>访问趋势</h2><div className="admin-trend-controls"><div className="admin-trend-legend"><span><i aria-hidden="true"/>本期</span>{stats.previousTrend.length>0&&<span><i aria-hidden="true"/>上期</span>}</div><label className="admin-inline-label"><select aria-label="趋势指标" value={metric} onChange={e=>setMetric(e.target.value as typeof metric)}>{!aggregate&&<option value="visitors">访客数</option>}<option value="pageViews">页面浏览量</option><option value="inquiries">询盘入库</option></select></label></div></div>
 <div className="admin-chart-scroll"><svg className="admin-insight-chart" viewBox="0 0 1000 325" role="img" aria-label="本期实线与上期虚线趋势"><title>本期与上期访问趋势</title>{[...new Set([0,1,2,3,4].map(k=>Math.round(max*k/4)))].map(value=><g key={value}><line x1="55" x2="945" y1={y(value)} y2={y(value)} stroke="#e8e6df"/><text x="45" y={y(value)+4} textAnchor="end" fontSize="16">{value}</text></g>)}{stats.previousTrend.length>0&&<path d={path(stats.previousTrend)} fill="none" stroke="#8b9290" strokeWidth="2" strokeDasharray="7 5"/>}<path d={path(stats.trend)} fill="none" stroke="#ac4829" strokeWidth="3"/>{stats.trend.map((r,index)=><g key={r.bucket}><rect x={55+index/Math.max(1,n)*890} width={890/Math.max(1,n)} y="36" height="244" fill={selected===index?'#ac48290b':'transparent'} onMouseEnter={()=>setSelected(index)} onClick={()=>{setSelected(index);if(!aggregate&&!r.future&&r.to>r.from&&(typeof window.matchMedia!=='function'||window.matchMedia('(pointer:fine)').matches))onBucket(r);}}/>{r[metric]!==null&&!r.future&&<circle cx={x(index)} cy={y(r[metric]||0)} r={selected===index?5:3} fill="#ac4829"/>}{(index===0||index===n-1||index%Math.max(1,Math.ceil(n/7))===0)&&<text x={x(index)} y="305" fontSize="16" textAnchor="middle">{stats.range.granularity==='hour'?String(index).padStart(2,'0')+':00':r.date?.slice(5)}</text>}</g>)}{stats.range.granularity==='hour'&&<text x="945" y="324" fontSize="13" textAnchor="end">24:00</text>}</svg></div>
 {current&&<div className="admin-chart-selection" aria-live="polite"><span><strong>{current.label||current.date}</strong>：{current.future?'尚未到达':`${current[metric]??0}${current.partial?'（进行中）':''}`} · 上期 {previous?.[metric]??0}{current.partial?'（该小时／日期完整值）':''}</span>{!aggregate&&!current.future&&current.to>current.from&&<button onClick={()=>onBucket(current)}>{stats.range.granularity==='day'?'查看该日小时趋势':'查看该小时访问'}</button>}</div>}
 <details className="admin-chart-data"><summary>查看趋势数据</summary><div className="admin-table-scroll"><table><thead><tr><th>时段</th><th>本期</th><th>上期</th><th>记录</th></tr></thead><tbody>{stats.trend.map((r,index)=><tr key={r.bucket}><td>{r.label||r.date}</td><td>{r.future?'尚未到达':r[metric]??0}{r.partial?' · 进行中':''}</td><td>{stats.previousTrend[index]?.[metric]??'—'}</td><td>{!aggregate&&!r.future&&r.to>r.from&&<button onClick={()=>onBucket(r)}>{stats.range.granularity==='day'?'小时趋势':'访问明细'}</button>}</td></tr>)}</tbody></table></div></details></section>;
}
type OpenJourney = (id: string, context: JourneyContext) => void;

function LatestIntent({query,range,api,unauthorized,version,openJourney,onIntent,onAll}:{
  query:string;range:StatsV2['range'];api:AdminApi;unauthorized:()=>void;version:number;
  openJourney:OpenJourney;onIntent:()=>void;onAll:()=>void;
}){
  const from=String(range.start), to=String(Math.max(range.end,range.start+1));
  const params={...Object.fromEntries(new URLSearchParams(query)),from,to,scope:'intent'};
  const result=useResource<Paged<EventRecord>>('/api/admin/events?'+new URLSearchParams(params),api,unauthorized,version);
  const rows=result.data?.items.slice(0,3)||[];
  return <section className="admin-section admin-overview-intent" aria-labelledby="admin-intent-title">
    <div className="admin-section-head"><h2 id="admin-intent-title">高意图行为</h2></div>
    <StateMessage loading={result.loading} error={result.error}/>
    {!result.loading&&!result.error&&(rows.length?<ul className="admin-latest-intent">
      {rows.map(event=><li key={event.id}>
        <button type="button" onClick={()=>openJourney(event.visitor_id,{visitId:event.visit_id,eventId:event.id,params})}
          aria-label={eventLabel(event.type)+' '+event.page+'，查看轨迹'}>
          <time dateTime={new Date(event.created_at).toISOString()} title={formatTime(event.created_at)}>
            {new Date(event.created_at).toLocaleTimeString('zh-CN',{timeZone:'Asia/Shanghai',hour:'2-digit',minute:'2-digit',hour12:false})}
          </time>
          <span className="admin-intent-route" title={event.page_title||undefined}><span>{event.page}</span><small>{sourceName(event)}</small></span>
          <span className="admin-intent-event">{eventLabel(event.type)}</span>
        </button>
      </li>)}
    </ul>:<p className="admin-empty">所选时段暂无高意图行为。</p>)}
    <div className="admin-overview-intent-links">
      <button type="button" onClick={onIntent}>查看高意图记录 <ArrowRight size={15} aria-hidden="true"/></button>
      <button type="button" onClick={onAll}>全部行为记录 <ArrowRight size={15} aria-hidden="true"/></button>
    </div>
  </section>;
}

type OverviewProps = {
  stats:StatsV2;query:string;api:AdminApi;unauthorized:()=>void;version:number;
  onRecords:(drill:Drill)=>void;onInquiries:(extra?:Record<string,string>)=>void;onDay:(date:string)=>void;
  onVisitors:()=>void;onJourney:OpenJourney;sourcePage:number;onSourcePage:(page:number)=>void;
  onChannel:(value:string)=>void;productName:(id:string)=>string;
  sourceDisclosure:SourceDisclosure;onSourceDisclosure:(value:SourceDisclosure)=>void;
};

export function InsightsOverview({stats,query,api,unauthorized,version,onRecords,onInquiries,onDay,onVisitors,onJourney,sourcePage,onSourcePage,onChannel,productName,sourceDisclosure,onSourceDisclosure}:OverviewProps){
 const aggregate=stats.mode==='aggregate';
 const open=(kind:Drill['kind'],title:string,extra:Record<string,string>={},from=stats.range.start,to=stats.range.end)=>onRecords({kind,title,params:{...Object.fromEntries(new URLSearchParams(query)),...extra},from,to,page:1});
 const openIntent=()=>open('events','高意图行为',{scope:'intent'});
 const byEvent=(title:string,eventType:string)=>()=>open('events',title,{eventType});
 const cards:[string,string,()=>void][]=[
  ['visitors','访客数',onVisitors],
  ['pageViews','页面浏览量',byEvent('页面浏览记录','page_view')],
  ['intentActions','高意图动作',openIntent],
  ['inquiries','询盘入库',()=>onInquiries()],
 ];
 const secondary:[string,string,()=>void][]=[
  ['visits','访问次数',()=>open('visits','访问明细')],
  ['whatsappClicks','WhatsApp 点击',byEvent('WhatsApp 点击记录','whatsapp_click')],
  ['emailClicks','邮件点击',byEvent('邮件点击记录','email_click')],
 ];
 const number=(key:string)=>(stats.current[key]||0).toLocaleString('zh-CN');
 return <>
 <div className="admin-overview-metrics">
   {cards.filter(([key])=>!aggregate||key==='pageViews'||key==='inquiries').map(([key,label,action])=><article key={key}>
     <h2>{label}</h2>
     <button className="admin-metric-link" onClick={action} disabled={aggregate&&key!=='inquiries'} aria-label={`查看${label}明细`}><strong>{number(key)}</strong><ArrowRight size={16} aria-hidden="true"/></button>
     {!aggregate&&<p>{delta(stats.current[key]||0,stats.previous[key]||0,comparisonLabel(stats.range))}</p>}
   </article>)}
 </div>
 <div className={'admin-overview-workspace'+(aggregate?' admin-overview-workspace--aggregate':'')}>
   <InsightChart key={stats.range.start+':'+stats.range.calendarEnd+':'+stats.mode} stats={stats} onBucket={bucket=>stats.range.granularity==='day'?onDay(bucket.date):open('visits',bucket.label+' 访问明细',{},bucket.from,bucket.to)}/>
   {!aggregate&&<LatestIntent query={query} range={stats.range} api={api} unauthorized={unauthorized} version={version} openJourney={onJourney} onIntent={openIntent} onAll={()=>open('events','全部行为记录')}/>}
 </div>
 {!aggregate&&<SourceTable query={query} range={stats.range} api={api} unauthorized={unauthorized} version={version} onRecords={onRecords} onInquiries={onInquiries} page={sourcePage} onPage={onSourcePage} onChannel={onChannel} disclosure={sourceDisclosure} onDisclosure={onSourceDisclosure} productName={productName}/>}
 <section className="admin-overview-supplement" aria-labelledby="admin-extra-stats">
   <h2 id="admin-extra-stats">访问与联系明细</h2>
   <div className="admin-contact-summary">
     {secondary.filter(([key])=>!aggregate||key!=='visits').map(([key,label,action])=><button type="button" key={key} aria-label={`查看${label}明细`} disabled={aggregate} onClick={action}>{label} <strong>{number(key)}</strong></button>)}
     {!aggregate&&<span>回访访客：{number('returningVisitors')}</span>}
     <span>{aggregate?'开始填写次数':'开始填写人数'}：{number('formStarters')}</span><span>表单错误：{number('formErrors')}</span>
     <button type="button" onClick={byEvent('询盘按钮点击','quote_click')} disabled={aggregate}>询盘按钮：{number('quoteClicks')}</button><button type="button" onClick={byEvent('资料下载点击','download_click')} disabled={aggregate}>资料下载：{number('downloadClicks')}</button>
   </div>
 </section>
 <div className="admin-rankings">{[
  {label:'热门页面',items:stats.pages,name:(id:string)=>id},
  {label:'受关注的产品',items:stats.products,name:productName,product:true},
  {label:'国家 / 地区',items:stats.breakdowns.country||[],name:countryName},
  {label:'设备',items:stats.breakdowns.device||[],name:(id:string)=>deviceNames[id]||id},
 ].map(({label,items,name,product})=><section className="admin-ranking" key={label}>
  <h2>{label}<small className="admin-ranking-unit">{product?'产品浏览量':'页面浏览量'}</small></h2>
  <ul className="admin-compact-ranking">{items.map(item=><li key={item.name}>
   {product&&!aggregate?<button className="admin-text-button" onClick={()=>open('events',name(item.name)+' · 产品浏览记录',{product:item.name,eventType:'product_view'})}>{name(item.name)}</button>:<span title={name(item.name)}>{name(item.name)}</span>}
   <strong>{item.views}</strong>
  </li>)}</ul>
 </section>)}</div>
 <details className="admin-stat-definitions"><summary>统计口径与数据说明</summary><p className="admin-scope">{stats.scope}</p><p>WhatsApp、邮件和下载统计按钮点击，询盘入库只统计服务端保存成功的询盘。日内趋势截至当前时段。同一访客可能出现在多个来源，直接相加会重复计数。</p></details>
 <p className="admin-period">本期 {formatTime(stats.range.start)} — {formatTime(stats.range.end)}<span>更新于 {formatTime(stats.updatedAt||stats.range.end)}</span></p>
 </>;
}

export function RecordPanel({drill,api,unauthorized,version,update,openJourney,productName}:{drill:Drill;api:AdminApi;unauthorized:()=>void;version:number;update:(drill:Drill)=>void;openJourney:(id:string,context:JourneyContext,scroll?:number)=>void;productName:(id:string)=>string}){
 const p=new URLSearchParams({...drill.params,from:String(drill.from),to:String(drill.to),p:String(drill.page)});
 const result=useResource<Paged<EventRecord|VisitRecord>>('/api/admin/'+drill.kind+'?'+p,api,unauthorized,version);
 const [pagePath,setPagePath]=useState(drill.params.pagePath||'');const [selectedPosition,setSelectedPosition]=useState(drill.params.position||'');
 useEffect(()=>{setPagePath(drill.params.pagePath||'');setSelectedPosition(drill.params.position||'');},[drill.params.pagePath,drill.params.position]);
 useEffect(()=>{if(result.data&&!result.loading&&drill.scroll)document.querySelector('.admin-drawer')?.scrollTo?.({top:drill.scroll});},[result.data,result.loading]);
 const go=(item:EventRecord|VisitRecord)=>openJourney(item.visitor_id,{visitId:drill.kind==='visits'?item.id:(item as EventRecord).visit_id,params:{...drill.params,from:String(drill.from),to:String(drill.to)},...(drill.kind==='events'?{eventId:item.id}:{})},document.querySelector('.admin-drawer')?.scrollTop||0);
 function selectScope(intent:boolean){
  const params={...drill.params};
  delete params.eventType;
  delete params.contacts;
  if(intent)params.scope='intent';else delete params.scope;
  update({...drill,params,title:intent?'高意图行为':'全部行为记录',page:1,scroll:0});
 }
 return <><div className="admin-record-tools"><p className="admin-detail-period">{formatTime(drill.from)} — {formatTime(drill.to)}</p>{drill.kind==='events'&&<ActionScope intent={drill.params.scope==='intent'} onChange={selectScope}/>}</div><form className="admin-record-filters" onSubmit={event=>{event.preventDefault();const params={...drill.params};if(pagePath.trim())params.pagePath=pagePath.trim();else delete params.pagePath;if(selectedPosition)params.position=selectedPosition;else delete params.position;update({...drill,params,page:1,scroll:0});}}><label>访问页面<input aria-label="明细访问页面" placeholder="例如 /factory/" value={pagePath} onChange={e=>setPagePath(e.target.value)}/></label><label>点击位置<select aria-label="明细点击位置" value={selectedPosition} onChange={e=>setSelectedPosition(e.target.value)}><option value="">全部位置</option>{Object.entries(positionNames).map(([key,label])=><option key={key} value={key}>{label}</option>)}</select></label><button type="submit"><ListFilter size={14} aria-hidden="true"/> 筛选明细</button></form><div className="admin-active-filters">{Object.entries(drill.params).filter(([key,value])=>value&&['source','platform','channel','referrerHost','entryPage','pagePath','eventType','position','country','device','language','product','utmCampaign'].includes(key)).map(([key,value])=><span key={key}>{({platform:'来源',channel:'渠道',referrerHost:'引荐域名',entryPage:'落地页',pagePath:'页面',eventType:'行为',position:'位置',country:'国家',device:'设备',language:'语言',product:'产品',source:'来源',utmCampaign:'推广活动'}[key]||key)}：{platformNames[value]||channelNames[value]||(eventLabel(value)!==value?eventLabel(value):'')||positionNames[value]||(value==='__unrecorded'?'未记录':value)}</span>)}</div>
 <StateMessage loading={result.loading} error={result.error}/>{!result.loading&&!result.error&&(!result.data?.items.length?<p className="admin-empty">当前筛选下没有行为记录。可以切换行为范围或查看其他日期。</p>:<><div className="admin-table-scroll"><table className="admin-record-table" role="table"><thead><tr><th>时间 / 行为</th><th>页面 / 落地页</th><th>{drill.kind==='events'?'位置与按钮':'本期记录'}</th><th>访客与来源</th><th>轨迹</th></tr></thead><tbody>{result.data.items.map(item=>{const event=item as EventRecord,visit=item as VisitRecord;return <tr key={item.id}><td>{formatTime(drill.kind==='events'?event.created_at:visit.active_to)}<small>{drill.kind==='events'?eventLabel(event.type):`${visit.views} 次页面浏览`}</small>{drill.kind==='events'&&isHighIntent(event.type)&&<IntentBadge/>}</td><td>{drill.kind==='events'?<><span>{event.page_title||'页面名称未记录'}</span><a href={event.page} target="_blank" rel="noopener noreferrer">{event.page}</a></>:<><span>{visit.entry_page||'落地页未记录'}</span><small>访问开始：{formatTime(visit.started_at)}</small></>}</td><td>{drill.kind==='events'?<>{positionNames[event.position]||shown(event.position)}<small>{shown(event.section_label)}</small><span>{shown(event.element_label)}</span><small className="admin-code">{event.target||event.resource||''}</small>{event.product&&<small>关联产品 · {productName(event.product)}</small>}</>:<>WhatsApp {visit.whatsappClicks} · 邮件 {visit.emailClicks}<small>询盘按钮 {visit.quoteClicks} · 下载 {visit.downloads}</small></>}</td><td><code>{item.visitor_id.slice(0,12)}…</code><small>{sourceName(item)}</small><small>{item.referrer_host||'引荐域名未记录'} · {deviceNames[item.device]||'未记录'}</small>{item.utm_campaign&&<small>推广活动 · {item.utm_campaign}</small>}{drill.kind==='events'&&item.entry_page&&<small>落地页 · {item.entry_page}</small>}</td><td><button onClick={()=>go(item)}>查看轨迹</button></td></tr>;})}</tbody></table></div><InsightPager page={drill.page} total={result.data.total} onChange={page=>update({...drill,page,scroll:0})}/></>)}</>;
}

function VisitSourceDetails({visit}:{visit:VisitAttribution&{country:string;device:string}}){
 const fields=[
  ['来源',sourceName(visit)],['引荐域名',visit.referrer_host],['落地页',visit.entry_page],
  ['推广活动',visit.utm_campaign],['UTM Source',visit.utm_source],['UTM Medium',visit.utm_medium],
  ['归因依据',basisName(visit.attribution_basis)],['国家或地区',countryName(visit.country)],['设备',deviceNames[visit.device]||'未记录'],
 ];
 return <dl className="admin-visit-attribution">{fields.map(([label,value])=><div key={label}><dt>{label}</dt><dd>{shown(value)}</dd></div>)}</dl>;
}

export function JourneyPanel({id,context,query,api,unauthorized,version,update,openInquiry,productName}:{id:string;context:JourneyContext;query:string;api:AdminApi;unauthorized:()=>void;version:number;update:(context:JourneyContext)=>void;openInquiry:(id:string)=>void;productName:(id:string)=>string}){
 const base=new URLSearchParams(context.params||query);
 const p=context.all?new URLSearchParams():base;p.set('v2','1');p.set('p',String(context.page||1));for(const [key,value]of Object.entries(context))if(value!==undefined&&value!==false&&key!=='params'&&key!=='page')p.set(key,value===true?'1':String(value));
 const result=useResource<JourneyV2>('/api/admin/visitors/'+id+'?'+p,api,unauthorized,version);
 const focus=useRef<HTMLLIElement>(null);
 useEffect(()=>{if(result.data?.focusEventId)focus.current?.scrollIntoView?.({block:'center'});},[result.data]);
 const data=result.data;
 return <><StateMessage loading={result.loading} error={result.error}/>{data&&!result.loading&&!result.error&&<><div className="admin-detail-top"><code>{id}</code><p>首次记录：{formatTime(data.visitor.first_seen)}<br/>最近记录：{formatTime(data.visitor.last_seen)}</p></div><section className="admin-detail-section"><div className="admin-section-head"><h3>{context.all?'该浏览器的全部访问':'当前筛选内的访问'}</h3><button onClick={()=>update({params:context.params,all:!context.all,page:1,visitId:data.selectedVisit?.id,events:context.events})}>{context.all?'返回当前筛选':'查看全部访问'}</button></div><div className="admin-visit-list">{data.visits.map(visit=><button className={data.selectedVisit?.id===visit.id?'is-selected':''} aria-pressed={data.selectedVisit?.id===visit.id} key={visit.id} onClick={()=>update({...context,visitId:visit.id,eventId:undefined,cursor:undefined,direction:undefined})}><strong>{formatTime(visit.started_at)}</strong><span>{sourceName({platform:visit.platform,channel:visit.channel})}</span><small>{visit.entry_page||'落地页未记录'}</small></button>)}</div>{!data.visits.length&&<p>此筛选内没有其他访问。指定的目标记录仍可在下方查看。</p>}{data.visitsTotal>20&&<InsightPager page={context.page||1} total={data.visitsTotal} onChange={page=>update({...context,page})}/>}</section>
 {data.selectedVisit&&<>
  <section className="admin-detail-section">
   <h3>本次访问来源</h3>
   <VisitSourceDetails visit={data.selectedVisit}/>
  </section>
  <section className="admin-detail-section">
   <h3>本次浏览的产品</h3>
   {data.products?.length?<ul className="admin-landing-list admin-journey-products">{data.products.map(item=><li key={item.product}>
    <a href={'/machined-parts/gallery/'+encodeURIComponent(item.product)+'/'} target="_blank" rel="noopener noreferrer">{productName(item.product)}</a>
    <span>{item.views} 次浏览 · {item.intentActions} 次关联高意图动作</span>
   </li>)}</ul>:<p>本次访问暂无产品浏览记录。</p>}
  </section>
  <section className="admin-detail-section admin-visit-history">
  <div className="admin-record-tools">
    <h3>本次访问轨迹</h3>
    <ActionScope intent={context.events==='intent'} onChange={intent=>update({...context,visitId:data.selectedVisit?.id,events:intent?'intent':undefined,eventId:undefined,cursor:undefined,direction:undefined})}/>
  </div>
  {data.before&&<button onClick={()=>update({...context,cursor:data.before!,direction:'before'})}>查看更早记录</button>}
  {data.events.length ? <ol className="admin-timeline">{data.events.map(event=>{
    const focused=event.id===data.focusEventId;
    const location=[positionNames[event.position],event.section_label,event.element_label].filter(Boolean).join(' · ');
    const destination=event.target||event.resource;
    return <li key={event.id} ref={focused?focus:undefined} className={focused?'admin-event-focus':undefined} tabIndex={focused?-1:undefined}>
      <div className="admin-event-heading"><strong>{eventLabel(event.type)}{focused?' · 当前定位':''}</strong>{isHighIntent(event.type)&&<IntentBadge/>}<time>{formatTime(event.created_at)}</time></div>
      {event.page_title&&<p>{event.page_title}</p>}
      <a href={event.page} target="_blank" rel="noopener noreferrer">{event.page}</a>
      {location&&<small>{location}</small>}
      {destination&&destination!==event.page&&<small className="admin-code">{destination}</small>}{event.product&&event.type!=='product_view'&&<small>关联产品 · {productName(event.product)}</small>}
      {event.error_code&&<small>失败类别 · {event.error_code}</small>}
    </li>;
  })}</ol>:<p className="admin-empty">本次访问没有符合筛选的行为。</p>}
  {data.after&&<button onClick={()=>update({...context,cursor:data.after!,direction:'after'})}>查看后续记录</button>}
 </section></>}
 <section className="admin-detail-section"><h3>关联询盘</h3>{data.inquiries.length?<ul className="admin-linked-inquiries">{data.inquiries.map(item=><li key={item.id}><button onClick={()=>openInquiry(item.id)}>{item.name} · {item.interest||'询盘'}</button><span>{formatTime(item.created_at)}</span></li>)}</ul>:<p>没有可关联的询盘。联系按钮点击不会自动生成询盘。</p>}</section></>}</>;
}
