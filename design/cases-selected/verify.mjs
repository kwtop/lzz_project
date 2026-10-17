import fs from 'node:fs';
import {load} from 'cheerio';
import assert from 'node:assert/strict';
const $=load(fs.readFileSync('dist/cases/index.html','utf8'));
const caseLinks=$('[data-case-link]').toArray().map(e=>$(e).attr('href'));
assert.equal(new Set(caseLinks).size,8);
for(const e of $('.studies-page a').toArray()){const href=$(e).attr('href');if(!href||href.startsWith('mailto:'))continue;const u=new URL(href,'https://local/cases/');const p='dist'+u.pathname+(u.pathname.endsWith('/')?'index.html':'');assert.ok(fs.existsSync(p),href);if(u.hash){const d=load(fs.readFileSync(p,'utf8'));assert.ok(d('[id="'+u.hash.slice(1)+'"]').length,href);}}
for(const e of $('.studies-page img').toArray()){assert.ok(fs.existsSync('dist'+$(e).attr('src')));assert.ok($(e).attr('alt'));}
console.log('Passed: 8 distinct cases, all page links/anchors, source images and alt text.');
