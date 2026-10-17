import fs from 'node:fs';
import path from 'node:path';
import {load} from 'cheerio';

const root=process.cwd();
const dir=path.join(root,'dist');
const out=path.join(root,'audit/launch-audit-20261010-fresh/technical');
const html=fs.readdirSync(dir,{recursive:true}).filter(p=>p.endsWith('.html'));
const compact=s=>(s||'').replace(/\s+/g,' ').trim();
const records=html.map(file=>{
  const $=load(fs.readFileSync(path.join(dir,file),'utf8'));
  const route='/'+file.replaceAll('\\','/').replace(/index\.html$/,'');
  const schemas=$('script[type="application/ld+json"]').toArray().map(el=>{try{return JSON.parse($(el).text());}catch(error){return {parseError:String(error)};}});
  const main=$('main').first();
  const content=main.length?main:$('body');
  const dl=content.find('dl').toArray().flatMap(list=>$(list).find('dt').toArray().map(el=>({label:compact($(el).text()),value:compact($(el).next('dd').text())||compact($(el).parent().find('dd').text())})));
  return {route,file,title:$('title').text(),description:$('meta[name="description"]').attr('content')||null,robots:$('meta[name="robots"]').attr('content')||null,canonical:$('link[rel="canonical"]').attr('href')||null,h1:$('h1').toArray().map(el=>compact($(el).text())),h2:content.find('h2').toArray().map(el=>compact($(el).text())),h3:content.find('h3').toArray().map(el=>compact($(el).text())),mainText:compact(content.text()),definitionPairs:dl,tables:content.find('table').toArray().map(el=>compact($(el).text())),links:content.find('a[href]').toArray().map(el=>({text:compact($(el).text()),href:$(el).attr('href')})),forms:content.find('form').toArray().map(el=>({action:$(el).attr('action')||null,method:$(el).attr('method')||null,controls:$(el).find('input,select,textarea,button').toArray().map(x=>({tag:x.tagName,name:$(x).attr('name')||null,type:$(x).attr('type')||null,required:$(x).attr('required')!==undefined,label:compact($(x).text())}))})),schemas,redirect:$('meta[http-equiv="refresh" i]').attr('content')||null};
});
fs.writeFileSync(path.join(out,'built-html.json'),JSON.stringify(records,null,2));
const production=records.filter(p=>!p.redirect&&!/noindex|none/i.test(p.robots||''));
const product=production.filter(p=>p.route.startsWith('/products/')&&p.route!='/products/');
const summary={htmlFiles:records.length,indexEligible:production.length,productPages:product.length,categoryPages:production.filter(p=>p.route.startsWith('/capabilities/')&&p.route!='/capabilities/').length,missingTitle:production.filter(p=>!p.title).map(p=>p.route),missingDescription:production.filter(p=>!p.description).map(p=>p.route),wrongH1Count:production.filter(p=>p.h1.length!==1).map(p=>p.route),missingCanonical:production.filter(p=>!p.canonical).map(p=>p.route),invalidJsonLd:production.filter(p=>p.schemas.some(s=>s.parseError)).map(p=>p.route),productMainTextCharacters:product.map(p=>({route:p.route,chars:p.mainText.length,definitionPairs:p.definitionPairs.length}))};
fs.writeFileSync(path.join(out,'html-summary.json'),JSON.stringify(summary,null,2));
console.log(JSON.stringify({...summary,productMainTextCharacters:`see html-summary.json (${product.length} records)`},null,2));
