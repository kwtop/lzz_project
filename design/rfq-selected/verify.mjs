import fs from 'node:fs';
import {load} from 'cheerio';
import assert from 'node:assert/strict';
const $=load(fs.readFileSync('dist/resources/rfq-checklist/index.html','utf8'));
for(const a of $('.rfq-editorial a').toArray()){const href=$(a).attr('href');if(href.startsWith('mailto:'))continue;const u=new URL(href,'https://local/resources/rfq-checklist/');const f='dist'+u.pathname+(u.pathname.endsWith('/')?'index.html':'');assert.ok(fs.existsSync(f),href);if(u.hash)assert.ok($('[id="'+u.hash.slice(1)+'"]').length,href);}
assert.equal($('h1').length,1);assert.equal($('.rq-related a').length,2);
console.log('Passed: all RFQ links, download file, anchors, two related products, single h1.');
