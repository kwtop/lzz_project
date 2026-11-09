import test from 'node:test';
import assert from 'node:assert/strict';
import {load} from 'cheerio';
import {verifiedLastmodDates,xmlSitemap,llmsText} from './discovery-files.mjs';
const site='https://www.lzz-cnc.com';
const page=(title,extra='')=>({$:load(`<html><head><title>${title} | LZZ Precision</title><meta name="description" content="A specific description of the page.">${extra}</head><body><h1>${title}</h1></body></html>`)});
const article=date=>`<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'Article',dateModified:date,datePublished:'2025-01-07'})}</script>`;
const record=lastmod=>({lastmod,evidence:'docs/record.md',reason:'Reviewed wording changed.'});

test('unknown page dates remain absent even when a publication or event date exists',()=>{
 const pages=new Map([['/',page('Home')],['/record/',page('Historical record',article('2025-01-07'))]]);
 const routes=[...pages.keys()];
 const dates=verifiedLastmodDates(pages,routes,{version:1,pages:{'/':record('2026-11-08')}},'2026-11-08');
 assert.equal(dates.size,1);assert(!dates.has('/record/'));
 const $=load(xmlSitemap(site,routes,dates),{xmlMode:true});
 assert.equal($('url').filter((_,el)=>$(el).find('loc').text()===site+'/record/').find('lastmod').length,0);
});

test('unsupported, impossible and future update dates fail the build',()=>{
 const pages=new Map([['/',page('Home')]]);
 for(const date of ['2026-02-30','2026-11-09','yesterday'])assert.throws(()=>verifiedLastmodDates(pages,['/'],{version:1,pages:{'/':record(date)}},'2026-11-08'),/Invalid or future/);
 assert.throws(()=>verifiedLastmodDates(pages,['/'],{version:1,pages:{'/missing/':record('2026-11-08')}},'2026-11-08'),/not a canonical/);
 assert.throws(()=>verifiedLastmodDates(pages,['/'],{version:1,pages:{'/':{lastmod:'2026-11-08'}}},'2026-11-08'),/lacks content-update evidence/);
});

test('an article update date must agree with the date in its visible content schema',()=>{
 const pages=new Map([['/guide/',page('Guide',article('2026-11-08'))]]);
 assert.equal(verifiedLastmodDates(pages,['/guide/'],{version:1,pages:{'/guide/':record('2026-11-08')}},'2026-11-08').get('/guide/'),'2026-11-08');
 assert.throws(()=>verifiedLastmodDates(pages,['/guide/'],{version:1,pages:{'/guide/':record('2026-11-07')}},'2026-11-08'),/disagree/);
});

test('llms lists canonical public routes once and leaves unpublished or admin routes out',()=>{
 const pages=new Map([['/',page('Home')],['/resources/technical-guides/test/',page('Guide [example]')],['/machined-parts/gallery/test/',page('Part')],['/admin/',page('Private')],['/preview/',page('Preview')]]);
 const routes=['/','/resources/technical-guides/test/','/machined-parts/gallery/test/'];
 const txt=llmsText(site,pages,routes);
 const links=[...txt.matchAll(/\]\((https:\/\/[^)]+)\)/g)].map(m=>m[1]);
 assert.deepEqual(links,routes.map(route=>site+route));
 assert.equal(new Set(links).size,3);
 assert(!txt.includes(site+'/admin/')&&!txt.includes(site+'/preview/'));
 assert(txt.startsWith('# LZZ Precision\n\n> '));assert(txt.includes('Guide \\[example\\]'));assert(txt.includes('## Optional'));
});
