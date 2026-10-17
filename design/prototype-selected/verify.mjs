import fs from 'node:fs';
import {load} from 'cheerio';
import assert from 'node:assert/strict';
const path='dist/resources/prototype-vs-small-batch-cnc/index.html';
const $=load(fs.readFileSync(path,'utf8'));
for(const a of $('.approval-guide a').toArray()){
 const href=$(a).attr('href'); if(href.startsWith('mailto:')) continue;
 const u=new URL(href,'https://local/resources/prototype-vs-small-batch-cnc/'); const file='dist'+u.pathname+'index.html';
 assert.ok(fs.existsSync(file),href);
 if(u.hash)assert.ok(load(fs.readFileSync(file,'utf8'))('[id="'+u.hash.slice(1)+'"]').length,href);
}
assert.equal($('h1').length,1); assert.equal($('.ag-related a').length,2);
console.log('All guide links and anchors valid; two related products and one h1 confirmed.');
