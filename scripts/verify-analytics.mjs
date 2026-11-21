import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {gzipSync} from 'node:zlib';
import {build} from 'esbuild';
import {load} from 'cheerio';
import {annotateAnalytics} from './annotate-analytics.mjs';

const root=path.resolve(import.meta.dirname,'..');
const sitemap=load(await fs.readFile(path.join(root,'dist/sitemap.xml'),'utf8'),{xmlMode:true});
const routes=sitemap('loc').map((_,el)=>new URL(sitemap(el).text()).pathname).get();
let links=0;
for(const route of routes){
 const html=await fs.readFile(path.join(root,'dist',route,'index.html'),'utf8');
 const result=annotateAnalytics(html,route);
 assert.equal(result.html,html,route+': a contact/download link is missing stable metadata');
 assert.ok(result.count>0,route+': no contact entry found');
 links+=result.count;
}
const built=await build({entryPoints:[path.join(root,'src/lib/siteAnalytics.ts')],bundle:true,write:false,minify:true,format:'esm',platform:'browser',target:'es2022'});
// Baseline captured before this implementation with the same esbuild options.
const baselineGzipBytes=3008,gzipBytes=gzipSync(built.outputFiles[0].contents).length;
assert.ok(gzipBytes-baselineGzipBytes<=2048,`Collector growth ${gzipBytes-baselineGzipBytes} bytes exceeds 2 KB`);
console.log(JSON.stringify({routes:routes.length,annotatedLinks:links,collectorGzipBytes:gzipBytes,baselineGzipBytes,addedGzipBytes:gzipBytes-baselineGzipBytes}));
