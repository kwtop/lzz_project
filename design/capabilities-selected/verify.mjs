import fs from 'node:fs';
import {load} from 'cheerio';
import assert from 'node:assert/strict';
const catalog=JSON.parse(fs.readFileSync('src/data/catalog.json','utf8'));
const failures=[]; const rows=[];
for(const c of catalog.categories){
 const file=`dist/capabilities/${c.slug}/index.html`; const $=load(fs.readFileSync(file,'utf8'));
 assert.equal($('.cap-page').length,1); assert.equal($('h1').length,1);
 assert.ok($('.cap-products a').length>0);
 for(const a of $('.cap-page a').toArray()){
  const href=$(a).attr('href'); if(!href||/^(mailto:|https?:)/.test(href))continue;
  const u=new URL(href,`https://local/capabilities/${c.slug}/`);
  const dest=`dist${u.pathname}${u.pathname.endsWith('/')?'index.html':''}`;
  if(!fs.existsSync(dest)){failures.push(`${c.slug}: missing ${href}`);continue;}
  if(u.hash){const target=load(fs.readFileSync(dest,'utf8'));if(!target(`[id="${u.hash.slice(1)}"]`).length)failures.push(`${c.slug}: missing anchor ${href}`);}
 }
 const ids=$('[id]').toArray().map(el=>$(el).attr('id')); assert.equal(ids.length,new Set(ids).size);
 for(const el of $('.cap-page img').toArray()){const src=$(el).attr('src'); assert.ok(fs.existsSync('dist'+src),`missing ${src}`); assert.ok($(el).attr('alt'));}
 for(const a of $('.cap-button').toArray()){const u=new URL($(a).attr('href'),'https://local');assert.equal(u.searchParams.get('capability'),c.slug);}
 rows.push({slug:c.slug,products:$('.cap-products a').length,cases:$('.cap-study-lead,.cap-study-list>a').length});
}
console.log(JSON.stringify({pages:rows,failures},null,2));
assert.equal(failures.length,0);

