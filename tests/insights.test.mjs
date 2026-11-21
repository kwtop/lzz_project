import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import {readFileSync} from 'node:fs';
import {randomUUID,pbkdf2Sync} from 'node:crypto';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {schemaSql} from './helpers/schema.mjs';
import {annotateAnalytics} from '../scripts/annotate-analytics.mjs';

const root=path.resolve(import.meta.dirname,'..');
const pure=await build({stdin:{contents:"export {reportPeriod,detailPeriod} from './server/reporting.ts';export {visitAttribution} from './server/attribution.ts';export {readAdminView,adminViewQuery} from './src/lib/adminInsightsState.ts';",resolveDir:root},bundle:true,write:false,format:'esm',platform:'node'});
const {reportPeriod,detailPeriod,visitAttribution,readAdminView,adminViewQuery}=await import('data:text/javascript;base64,'+Buffer.from(pure.outputFiles[0].contents).toString('base64'));
test('Beijing calendar periods align midnight, month/year boundaries and elapsed comparisons',()=>{
 for(const now of [Date.parse('2026-01-01T00:00:00+08:00'),Date.parse('2026-03-01T08:25:00+08:00')]){
  const p=reportPeriod(new URL('http://localhost/stats'),now);assert.equal(p.days,1);assert.equal(p.granularity,'hour');assert.equal(p.previousStart,p.start-86400000);assert.equal(p.previousEnd,p.end-86400000);assert.equal(p.previousChartEnd,p.start);
 }
 const p=reportPeriod(new URL('http://localhost/stats?start=2026-02-23&end=2026-03-01'),Date.parse('2026-03-01T08:25:00+08:00'));
 assert.equal(p.days,7);assert.equal(p.granularity,'day');assert.equal(p.end-p.start,p.previousEnd-p.previousStart);assert.equal(p.previousStart,Date.parse('2026-02-16T00:00:00+08:00'));
 assert.throws(()=>reportPeriod(new URL('http://localhost/?start=2026-02-30')));
 assert.throws(()=>detailPeriod(new URL('http://localhost/?from=2&to=1')));
});
test('attribution keeps real referrers, paid markers and explicit UTMs separate',()=>{
 const origin='https://www.lzz-cnc.com';
 assert.equal(visitAttribution(origin,{referrer:'https://www.google.co.uk/search?q=PRIVATE'}).channel,'organic_search');
 const paid=visitAttribution(origin,{adSource:'google',referrer:'https://google.com',utmSource:'newsletter'});assert.equal(paid.channel,'paid_search');assert.equal(paid.sourcePlatform,'google');
 assert.equal(visitAttribution(origin,{referrer:'https://www.bing.com/search'}).sourcePlatform,'bing');
 assert.equal(visitAttribution(origin,{referrer:'https://gemini.google.com/app'}).sourcePlatform,'gemini');
 assert.equal(visitAttribution(origin,{referrer:'https://gemini.google.com/app'}).channel,'ai_referral');
 assert.equal(visitAttribution(origin,{utmSource:'google',utmMedium:'organic'}).referrerHost,'');
 assert.equal(visitAttribution(origin,{referrer:'https://lzz-cnc.com/factory/'}).source,'unknown');
 assert.equal(visitAttribution(origin,{}).attributionBasis,'unavailable');
});
test('admin URLs retain independent dates, source expansion and anchored detail navigation',()=>{
 const view=readAdminView('');assert.equal(view.analytics.preset,'today');assert.equal(view.inquiries.allTime,true);
 view.sourceDisclosure={key:'google|organic_search|google.com',page:3};view.sourcePage=2;
 view.details=[{kind:'records',drill:{kind:'events',title:'WhatsApp',from:100,to:200,params:{eventType:'whatsapp_click'},page:2,scroll:350}},{kind:'journey',id:'visitor-1',context:{eventId:'event-1',visitId:'visit-1',params:{from:'100',to:'200'}}}];
 const restored=readAdminView('?'+adminViewQuery(view));assert.deepEqual(restored.sourceDisclosure,view.sourceDisclosure);assert.equal(restored.details[0].drill.scroll,350);assert.equal(restored.details[1].context.eventId,'event-1');assert.equal(restored.inquiries.allTime,true);
 const broken=new URLSearchParams({details:JSON.stringify([{kind:'records',drill:{kind:'events',from:1,to:2,params:{},title:null}},{kind:'journey',id:'visitor-1',context:{params:{bad:{x:1}},page:-1}}])});
 const safe=readAdminView('?'+broken);assert.equal(safe.details.length,1);assert.deepEqual(safe.details[0].context.params,{});assert.equal(safe.details[0].context.page,1);
});

test('build annotations preserve markup, name icon-only CTAs and distinguish duplicate positions',()=>{
 const html='<html><head><title>Factory</title></head><body><header class="site-header"><a href="https://wa.me/8613858102479?text=PRIVATE" aria-label="WhatsApp"><svg></svg></a></header><main><section id="equipment"><h2>Equipment &amp; capacity</h2><a href="/quote/?part=PRIVATE">Request a quote</a><a href="/quote/">Request a quote</a></section></main><footer><a href="mailto:roger@lzz-cnc.com?subject=PRIVATE">Email</a></footer><script>const keep="&amp;";</script></body></html>';
 const result=annotateAnalytics(html,'/factory/');assert.equal(result.count,4);assert.equal(new Set(result.ids).size,4);assert.match(result.html,/data-analytics-section-label="Equipment &amp; capacity"/);assert.match(result.html,/data-analytics-target="https:\/\/wa.me\/8613858102479"/);assert.match(result.html,/data-analytics-target="mailto:roger@lzz-cnc.com"/);
 assert.equal(result.html.replace(/ data-analytics-[\w-]+="[^"]*"/g,''),html);
 assert.deepEqual(annotateAnalytics(html,'/factory/').ids,result.ids);
});

test('insights D1 APIs reconcile sources, exact click records and anchored long journeys',async t=>{
 const worker=await build({stdin:{contents:"import {handleApi} from './server/index.ts';export default {fetch(request,env,ctx){return handleApi({request,env,waitUntil:ctx.waitUntil.bind(ctx)})}}",resolveDir:root},bundle:true,write:false,format:'esm',platform:'browser',target:'es2022'});
 const password='insights-local-only-password',salt=Buffer.alloc(16,5),hash=['pbkdf2-sha256','100000',salt.toString('base64'),pbkdf2Sync(password,salt,100000,32,'sha256').toString('base64')].join('$');
 const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:worker.outputFiles[0].text,compatibilityDate:'2026-10-01',cf:false,d1Databases:['DB'],r2Buckets:['FILES'],bindings:{TOKEN_SECRET:'insights-test-only-secret-at-least-32-characters',LOCAL_DEVELOPMENT:'true',ADMIN_AUTH_MODE:'password',ADMIN_USERNAME:'admin',ADMIN_PASSWORD_HASH:hash}}));
 const admin=new Map(),customer=new Map();
 async function send(route,body,jar=admin){const headers={'Origin':'http://localhost','User-Agent':'InsightsIntegration/1.0',...(body?{'Content-Type':'application/json'}:{}),...(jar.size?{Cookie:[...jar].map(([k,v])=>k+'='+v).join('; ')}:{})};const response=await mf.dispatchFetch('http://localhost'+route,{method:body?'POST':'GET',headers,...(body?{body:JSON.stringify(body)}:{})});for(const raw of response.headers.getSetCookie()){const[k,v]=raw.split(';')[0].split('=');jar.set(k,v);}return response;}
 const get=async route=>{const r=await send(route);const data=await r.json();assert.equal(r.status,200,JSON.stringify(data));return data;};
 try{
  const db=await mf.getD1Database('DB');await db.batch(schemaSql(root).split(';').map(s=>s.trim()).filter(Boolean).map(s=>db.prepare(s)));
  assert.equal((await send('/api/admin/events')).status,401);await send('/api/admin/login',{username:'admin',password});
  const sessionResponse=await send('/api/analytics/session',{page:'/factory/',language:'en',referrer:'https://www.google.com/search?q=PRIVATE_QUERY'},customer),session=await sessionResponse.json();assert.equal(session.enabled,true);
  const at=Date.now()-2000,first=randomUUID(),second=randomUUID(),mail=randomUUID();
  const event=(id,type,seq,target)=>({id,type,page:'/factory/',pageTitle:'CNC factory & quality control',sectionId:'equipment',sectionLabel:'Equipment & capacity',elementId:'factory-equipment-'+type,elementLabel:type==='email_click'?'Email':'WhatsApp',position:'main',pageViewId:randomUUID(),occurredAt:at,sequence:seq,target});
  const batch=[event(randomUUID(),'page_view',0,''),event(first,'whatsapp_click',1,'https://wa.me/8613858102479?text=PRIVATE_MESSAGE'),event(second,'whatsapp_click',2,'https://wa.me/8613858102479?text=PRIVATE_MESSAGE'),event(mail,'email_click',3,'mailto:roger@lzz-cnc.com?subject=PRIVATE_SUBJECT&body=PRIVATE_BODY')];
  assert.equal((await send('/api/events',{events:batch},customer)).status,200);assert.equal((await send('/api/events',{events:batch},customer)).status,200);
  await t.test('source breakdown matches event and visit detail with exact attribution',async()=>{
   const source=await get('/api/admin/sources?channel=organic_search&platform=google');assert.equal(source.total,1);assert.equal(source.items[0].visitors,1);assert.equal(source.items[0].visits,1);assert.equal(source.items[0].whatsappClicks,2);assert.equal(source.items[0].emailClicks,1);assert.equal(source.items[0].referrerHost,'google.com');
   const landing=await get('/api/admin/sources?channel=organic_search&platform=google&by=landing');assert.equal(landing.items[0].entryPage,'/factory/');
   const visits=await get('/api/admin/visits?channel=organic_search&platform=google&entryPage=%2Ffactory%2F');assert.equal(visits.total,1);assert.equal(visits.items[0].whatsappClicks,2);
   const detail=await get('/api/admin/events?eventType=whatsapp_click&platform=google');assert.equal(detail.total,2);assert.equal(detail.items[0].id,second);assert.equal(detail.items[0].element_label,'WhatsApp');assert.equal(detail.items[0].target,'https://wa.me/8613858102479');assert.equal(detail.items[0].referrer_host,'google.com');
   const mailRow=await db.prepare('SELECT target,received_at,created_at FROM events WHERE id=?').bind(mail).first();assert.equal(mailRow.target,'mailto:roger@lzz-cnc.com');assert.ok(mailRow.received_at>=mailRow.created_at);
   assert.equal(JSON.stringify(await db.prepare('SELECT * FROM visits').all()).includes('PRIVATE_QUERY'),false);
  });
  await t.test('acquisition counts each visit once and paginates the source table by ten', async () => {
   const visitor = randomUUID(), at = Date.parse('2026-02-02T09:00:00+08:00');
   const channels = [
    ['google', 'organic_search', 'google.com'],
    ['google', 'paid_search', 'google.com'],
    ['bing', 'organic_search', 'bing.com'],
    ...Array.from({length: 9}, (_, index) => ['qa-campaign-' + index, 'campaign', '']),
   ];
   await db.prepare('INSERT INTO visitors(id,first_seen,last_seen) VALUES(?,?,?)').bind(visitor, at, at).run();
   const seed = channels.flatMap(([platform, channel, host], index) => {
    const visit = randomUUID();
    return [
     db.prepare(`INSERT INTO visits(id,visitor_id,started_at,last_seen,source,channel,entry_page,source_platform,referrer_host)
       VALUES(?,?,?,?,?,?,'/factory/',?,?)`).bind(visit, visitor, at, at, platform, channel, platform, host),
     ...['page_view', index === 0 ? 'whatsapp_click' : 'page_view'].map(type =>
      db.prepare(`INSERT INTO events(id,visitor_id,visit_id,type,created_at,page,source,channel)
       VALUES(?,?,?,?,?,'/factory/',?,?)`).bind(randomUUID(), visitor, visit, type, at, platform, channel)),
    ];
   });
   await db.batch(seed);
   const range = '?start=2026-02-02&end=2026-02-02';
   const stats = await get('/api/admin/stats' + range);
   assert.equal(stats.current.visitors, 1);
   assert.equal(stats.current.visits, 12);
   assert.equal(stats.acquisition.total, stats.current.visits);
   assert.equal(stats.acquisition.items.length, 5);
   assert.equal(stats.acquisition.other, 7);
   assert.equal(stats.trend[9].visits, 12);
   assert.equal(stats.trend[9].whatsappClicks, 1);
   assert.equal(stats.trend[9].emailClicks, 0);
   const google = await get('/api/admin/stats' + range + '&platform=google');
   assert.deepEqual(google.acquisition.items.map(({channel, visits}) => [channel, visits]),
    [['organic_search', 1], ['paid_search', 1]]);
   const firstPage = await get('/api/admin/sources' + range + '&pageSize=10');
   const secondPage = await get('/api/admin/sources' + range + '&pageSize=10&p=2');
   const all = await get('/api/admin/sources' + range);
   assert.equal(firstPage.pageSize, 10);
   assert.equal(firstPage.items.length, 10);
   assert.equal(secondPage.items.length, 2);
   assert.equal(all.pageSize, 20);
   assert.deepEqual([...firstPage.items, ...secondPage.items], all.items);
  });
  await t.test('visitors retain the first known source separately from later visits', async () => {
   const visitor = randomUUID(), day = Date.parse('2026-02-04T00:00:00+08:00');
   const visits = [
    ['unknown', 'unknown', ''],
    ['google', 'organic_search', 'google.com'],
    ['unknown', 'unknown', ''],
    ['bing', 'paid_search', 'bing.com'],
   ].map(([source, channel, host], offset) => ({id: randomUUID(), source, channel, host, at: day + offset * 86400000 + 60000}));
   await db.prepare('INSERT INTO visitors(id,first_seen,last_seen) VALUES(?,?,?)').bind(visitor, visits[0].at, visits[3].at).run();
   await db.batch(visits.flatMap(({id, source, channel, host, at}) => [
    db.prepare(`INSERT INTO visits(id,visitor_id,started_at,last_seen,source,channel,entry_page,source_platform,referrer_host)
      VALUES(?,?,?,?,?,?,'/factory/',?,?)`).bind(id, visitor, at, at, source, channel, source, host),
    db.prepare(`INSERT INTO events(id,visitor_id,visit_id,type,created_at,page,source,channel)
      VALUES(?,?,?,'page_view',?,'/factory/',?,?)`).bind(randomUUID(), visitor, id, at - 500, source, channel),
   ]));
   const direct = await get('/api/admin/visitors?start=2026-02-04&end=2026-02-07&source=unknown');
   const entries = direct.items.filter(row => row.id === visitor);
   assert.equal(entries.length, 2);
   assert.equal(entries[0].is_returning, 1);
   assert.equal(entries[0].source_platform, 'unknown');
   assert.equal(entries[0].first_source_platform, 'google');
   assert.equal(entries[0].first_source_channel, 'organic_search');
   assert.equal(entries[1].first_source_platform, null);
   const firstKnownDay = await get('/api/admin/visitors?start=2026-02-05&end=2026-02-05&source=google');
   assert.equal(firstKnownDay.items.find(row => row.id === visitor).first_source_platform, 'google');
   const detail = '/api/admin/visitors/' + visitor + '?v2=1&all=1&visitId=';
   const directDetail = await get(detail + visits[2].id);
   assert.equal(directDetail.selectedVisit.platform, 'unknown');
   assert.equal(directDetail.firstSource.referrer_host, 'google.com');
   const campaign = await get(detail + visits[3].id);
   assert.equal(campaign.selectedVisit.platform, 'bing');
   assert.equal(campaign.firstSource.platform, 'google');
   assert.equal(campaign.firstSource.started_at, visits[1].at);
  });
  await t.test('all actions are visible by default and intent filters keep ordinary context in the full journey',async()=>{
   const link=randomUUID(),submit=randomUUID();
   assert.equal((await send('/api/events',{events:[event(link,'link_click',5,'/factory/#quality'),event(submit,'form_submit',6,'')]},customer)).status,200);
   const all=await get('/api/admin/events?platform=google');
   assert.ok(all.items.some(item=>item.id===link));
   const intent=await get('/api/admin/events?scope=intent&platform=google');
   assert.ok(intent.items.some(item=>item.id===submit));
   assert.ok(!intent.items.some(item=>item.id===link||item.type==='page_view'));
   const stats=await get('/api/admin/stats?platform=google');
   assert.equal(stats.current.intentActions,intent.total);
   assert.equal(stats.current.intentVisitors,1);
   const route='/api/admin/visitors/'+session.visitorId+'?v2=1&visitId='+session.visitId;
   const full=await get(route+'&eventId='+link);
   assert.ok(full.events.some(item=>item.id===link));
   const onlyIntent=await get(route+'&events=intent');
   assert.ok(onlyIntent.events.some(item=>item.id===submit));
   assert.ok(!onlyIntent.events.some(item=>item.id===link));
  });
  await t.test('daily visitors deduplicate multiple visits and mark a return at Beijing midnight',async()=>{
   const id=randomUUID(),morning=randomUUID(),late=randomUUID();
   const day=Date.parse('2026-01-01T00:00:00+08:00'),next=day+86400000;
   await db.prepare('INSERT INTO visitors(id,first_seen,last_seen) VALUES(?,?,?)').bind(id,day,next).run();
   for(const [visit,started,lastSeen] of [[morning,day,day+3600000],[late,next-1,next]])
    await db.prepare("INSERT INTO visits(id,visitor_id,started_at,last_seen,source,entry_page) VALUES(?,?,?,?,?,?)").bind(visit,id,started,lastSeen,'history-insights','/factory/').run();
   for(const [visit,at,legacyReturning] of [[morning,day+3600000,0],[late,next-1,1],[late,next,0]])
    await db.prepare("INSERT INTO events(id,visitor_id,visit_id,type,created_at,page,source,is_returning) VALUES(?,?,?,'page_view',?,'/factory/','history-insights',?)").bind(randomUUID(),id,visit,at,legacyReturning).run();
   const stats=await get('/api/admin/stats?start=2026-01-01&end=2026-01-01&source=history-insights');assert.equal(stats.current.visitors,1);assert.equal(stats.current.pageViews,2);assert.equal(stats.trend.length,24);assert.equal(stats.trend.reduce((n,r)=>n+r.visitors,0),2);assert.equal(stats.previousTrend.length,24);assert.equal(stats.range.previousStart,day-86400000);
   assert.equal(stats.current.visits,2);
   assert.equal(stats.current.returningVisitors,0);
   const range='?start=2026-01-01&end=2026-01-02&source=history-insights';
   const twoDays=await get('/api/admin/stats'+range);
   assert.equal(twoDays.current.visitors,1);
   assert.equal(twoDays.current.returningVisitors,1);
   assert.deepEqual(twoDays.trend.map(bucket=>bucket.visitors),[1,1]);
   const daily=await get('/api/admin/visitors'+range);
   assert.equal(daily.total,2);
   assert.deepEqual(daily.items.map(row=>[row.id,row.day_start,row.visits,row.views,row.is_returning]),[
    [id,next,1,1,1],[id,day,2,2,0],
   ]);
   const today=await get('/api/admin/stats');assert.equal(today.range.days,1);assert.equal(today.trend.length,24);assert.ok(today.trend.filter(r=>r.future).every(r=>r.visitors===null&&r.pageViews===null));assert.equal(today.range.previousEnd,today.range.end-86400000);
   const exact=await get('/api/admin/events?source=history-insights&from='+day+'&to='+(day+2*3600000));assert.equal(exact.total,1);
  });
  await t.test('legacy fields remain unrecorded and invalid client clocks fall back safely',async()=>{
   const id=randomUUID();await send('/api/events',{events:[{id,type:'download_click',page:'/factory/',position:'footer',occurredAt:1,sequence:2}]},customer);const row=await db.prepare('SELECT * FROM events WHERE id=?').bind(id).first();assert.equal(row.page_title,'');assert.equal(row.element_id,'');assert.equal(row.target,'');assert.equal(row.time_basis,'server');assert.equal(row.created_at,row.received_at);
  });
  await t.test('events beyond the latest hundred are located and keyset pages do not overlap',async()=>{
   const ids=[];for(let i=0;i<160;i++)ids.push(randomUUID());await db.batch(ids.map((id,index)=>db.prepare("INSERT INTO events(id,visitor_id,visit_id,type,created_at,page,sequence) VALUES(?,?,?,'page_view',?,'/factory/',?)").bind(id,session.visitorId,session.visitId,at-500+index,index)));
   const firstPage=await get('/api/admin/visitors/'+session.visitorId+'?v2=1&visitId='+session.visitId+'&eventId='+ids[5]);assert.ok(firstPage.events.some(e=>e.id===ids[5]));assert.ok(firstPage.after);assert.equal(firstPage.selectedVisit.id,session.visitId);
   const next=await get('/api/admin/visitors/'+session.visitorId+'?v2=1&visitId='+session.visitId+'&cursor='+encodeURIComponent(firstPage.after)+'&direction=after');assert.equal(new Set([...firstPage.events,...next.events].map(e=>e.id)).size,firstPage.events.length+next.events.length);
   assert.equal((await send('/api/admin/visitors/'+session.visitorId+'?v2=1&visitId='+session.visitId+'&cursor=not-a-cursor')).status,400);
   const other=randomUUID();await db.prepare('INSERT INTO visitors(id,first_seen,last_seen) VALUES(?,?,?)').bind(other,at,at).run();assert.equal((await send('/api/admin/visitors/'+other+'?v2=1&eventId='+ids[5])).status,404);
  });
  await t.test('source reports connect the right products and intent after the same browser returns from a campaign',async()=>{
   const [firstProduct,secondProduct]=JSON.parse(readFileSync(path.join(root,'server/catalog.generated.json'),'utf8'));
   const partEvent=(type,product)=>({...event(randomUUID(),type,1,type==='quote_click'?'/quote/':''),product:product.id,page:'/machined-parts/gallery/'+product.id+'/'});
   const originalView=partEvent('product_view',firstProduct);
   assert.equal((await send('/api/events',{visitId:session.visitId,events:[originalView]},customer)).status,200);

   const tags={page:'/machined-parts/gallery/',referrer:'https://www.linkedin.com/feed/',utmSource:'linkedin',utmMedium:'cpc',utmCampaign:'lzz-intent-qa'};
   const linkedIn=await (await send('/api/analytics/session',tags,customer)).json();
   assert.equal(linkedIn.visitorId,session.visitorId);
   assert.notEqual(linkedIn.visitId,session.visitId);
   const nextPage=await (await send('/api/analytics/session',{page:'/factory/',referrer:'http://localhost/machined-parts/gallery/',visitId:linkedIn.visitId},customer)).json();
   assert.equal(nextPage.visitId,linkedIn.visitId);
   const campaignQuote=partEvent('quote_click',secondProduct);
   assert.equal((await send('/api/events',{visitId:linkedIn.visitId,events:[partEvent('product_view',secondProduct),partEvent('product_view',secondProduct),campaignQuote]},customer)).status,200);
   assert.equal((await send('/api/events',{visitId:session.visitId,events:[partEvent('quote_click',firstProduct)]},customer)).status,200);

   const organic=await get('/api/admin/sources?by=products&platform=google');
   assert.deepEqual(organic.items,[{product:firstProduct.id,views:1,visitors:1,intentActions:1}]);
   const campaign=await get('/api/admin/sources?by=products&utmCampaign=LZZ-INTENT-QA');
   assert.deepEqual(campaign.items,[{product:secondProduct.id,views:2,visitors:1,intentActions:1}]);
   const sources=await get('/api/admin/sources?platform=linkedin');
   assert.deepEqual(sources.items.map(({channel,intentActions})=>({channel,intentActions})),[{channel:'paid_social',intentActions:1}]);
   const clicks=await get('/api/admin/events?scope=intent&platform=linkedin&product='+secondProduct.id);
   assert.deepEqual(clicks.items.map(({id,utm_campaign,referrer_host})=>({id,utm_campaign,referrer_host})),[{id:campaignQuote.id,utm_campaign:'lzz-intent-qa',referrer_host:'linkedin.com'}]);
   const journey=await get('/api/admin/visitors/'+linkedIn.visitorId+'?v2=1&visitId='+linkedIn.visitId+'&events=intent');
   assert.equal(journey.selectedVisit.utm_source,'linkedin');
   assert.equal(journey.selectedVisit.utm_medium,'cpc');
   assert.deepEqual(journey.products,campaign.items);
  });
  await t.test('legacy internal records appear throughout the admin with no extra filter',async()=>{
   const id=randomUUID(),visit=randomUUID(),at=Date.now();
   await db.prepare('INSERT INTO visitors(id,first_seen,last_seen,internal) VALUES(?,?,?,1)').bind(id,at,at).run();
   await db.prepare("INSERT INTO visits(id,visitor_id,started_at,last_seen,entry_page,internal) VALUES(?,?,?,?,?,1)").bind(visit,id,at,at,'/factory/').run();
   await db.prepare("INSERT INTO events(id,visitor_id,visit_id,type,created_at,page,source,country,internal) VALUES(?,?,?,'page_view',?,'/factory/','internal-qa-only','ZZ',1)").bind(randomUUID(),id,visit,at).run();
   const options=await get('/api/admin/options');
   assert.ok(options.source.some(row=>row.value==='internal-qa-only'));
   assert.ok(options.country.some(row=>row.value==='ZZ'));
   for(const endpoint of ['visitors','visits','events','sources']){
    const records=await get('/api/admin/'+endpoint+'?source=internal-qa-only');
    assert.equal(records.total,1,endpoint);
   }
   assert.equal((await get('/api/admin/stats?source=internal-qa-only')).current.visitors,1);
  });
 }finally{await mf.dispose();}
});
