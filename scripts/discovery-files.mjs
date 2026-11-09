const clean=value=>String(value||'').replace(/\s+/g,' ').trim();
const xmlEscape=value=>value.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
const markdownLabel=value=>clean(value).replace(/[\\[\]]/g,'\\$&');
const schemaObjects=value=>Array.isArray(value)?value.flatMap(schemaObjects):value&&typeof value==='object'?[value,...(value['@graph']?schemaObjects(value['@graph']):[])]:[];

export const editorialToday=()=>new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());

export function verifiedLastmodDates(pages,routes,registry,today=editorialToday()){
 if(registry.version!==1||!registry.pages||typeof registry.pages!=='object')throw new Error('Invalid lastmod evidence registry');
 const eligible=new Set(routes),dates=new Map();
 for(const [route,record] of Object.entries(registry.pages)){
  if(!eligible.has(route))throw new Error('Lastmod evidence is not a canonical public page: '+route);
  const value=record.lastmod;
  const parsed=typeof value==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(value)?Date.parse(value+'T00:00:00Z'):NaN;
  if(!Number.isFinite(parsed)||new Date(parsed).toISOString().slice(0,10)!==value||value>today)throw new Error('Invalid or future lastmod: '+route);
  if(!record.evidence?.startsWith('docs/')||!record.reason?.trim())throw new Error('Lastmod lacks content-update evidence: '+route);
  const $=pages.get(route).$;
  const articles=$('script[type="application/ld+json"]').toArray().flatMap(n=>schemaObjects(JSON.parse($(n).text()))).filter(n=>['Article','BlogPosting'].includes(n['@type']));
  for(const article of articles)if(article.dateModified?.slice(0,10)!==value)throw new Error('Article and sitemap update date disagree: '+route);
  dates.set(route,value);
 }
 // Missing evidence intentionally leaves the date absent. File timestamps,
 // publication/event dates and the current build time are never fallback dates.
 return dates;
}

export function xmlSitemap(site,routes,dates){
 return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+routes.map(route=>`  <url><loc>${xmlEscape(site+route)}</loc>${dates.has(route)?`<lastmod>${dates.get(route)}</lastmod>`:''}</url>`).join('\n')+'\n</urlset>\n';
}

export function llmsText(site,pages,routes){
 const remaining=new Set(routes),sections=[];
 const add=(heading,predicate)=>{
  const selected=routes.filter(route=>remaining.has(route)&&predicate(route));
  if(!selected.length)return;
  const lines=selected.map(route=>{
   const $=pages.get(route).$;
   const title=clean($('head>title').text()).replace(/\s*\|\s*LZZ Precision$/,'');
   const description=clean($('meta[name="description"]').attr('content'));
   if(!title||!description)throw new Error('Missing llms.txt page description: '+route);
   remaining.delete(route);
   return `- [${markdownLabel(title)}](${site+route}): ${description}`;
  });
  sections.push(`## ${heading}\n\n${lines.join('\n')}`);
 };
 const start=new Set(['/','/capabilities/','/machined-parts/','/factory/','/resources/','/resources/faq/','/about/contact/','/quote/']);
 add('Start here',route=>start.has(route));
 add('Machining services and materials',route=>route.startsWith('/capabilities/'));
 add('Technical guides',route=>route.startsWith('/resources/technical-guides/'));
 add('RFQ and ordering',route=>route.startsWith('/resources/ordering/'));
 add('Parts and machining examples',route=>route==='/machined-parts/gallery/'||route.startsWith('/machined-parts/machining-examples/'));
 add('Company information',route=>['/about/','/about/company-profile/','/about/how-we-work/','/about/company-news/'].includes(route));
 add('Optional',()=>true);
 return '# LZZ Precision\n\n> Custom CNC machining in Hangzhou, China, from prototypes to small production runs.\n\n'+
  'This English-language website covers machining services, custom-part references, technical drawing requirements and purchasing guidance for buyers and product engineers.\n\n'+
  'The parts gallery contains reference forms. The released drawing, material specification and agreed quotation define the component and supply scope for an order. Technical guides explain design and inspection decisions; project-specific acceptance and testing requirements must be agreed for the actual part.\n\n'+
  sections.join('\n\n')+'\n';
}
