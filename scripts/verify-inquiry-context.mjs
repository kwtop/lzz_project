import assert from 'node:assert/strict';
import {inquiryHref,resolveInquiry} from '../src/lib/inquiryContext.ts';

const references=[
 {id:'example-a',title:'Runner interfaces',path:'/machined-parts/gallery/example-a/',kind:'product',partType:'impellers',processes:['multi-axis']},
 {id:'example-b',title:'Fuel-rail interfaces',path:'/machined-parts/gallery/example-b/',kind:'product'},
 {id:'milling',title:'CNC milling',path:'/capabilities/milling/',kind:'capability'},
];
const resolve=search=>resolveInquiry(search,references);
const first=resolve(new URL(inquiryHref(references[0]),'https://example.test').search);
assert.equal(first.part,'Runner interfaces');
assert.equal(first.reference.id,'example-a');
assert.equal(first.source,references[0].path);
assert.equal(first.reference.partType,'impellers');
assert.deepEqual(first.reference.processes,['multi-axis']);
assert.equal(resolve('?capability=milling').part,'CNC milling');
assert.equal(resolve('?product=example-a&part=Wrong').part,'Runner interfaces');
assert.equal(resolve('?product=missing&part=Runner%20interfaces').reference,undefined);
assert.equal(resolve('?part=General%20question').part,'General question');
assert.equal(resolve('?part='+'x'.repeat(500)).part.length,200);
assert.deepEqual(resolve(''),{reference:undefined,part:'',source:''});
assert.equal(resolve('?part=Machining%20fit&source='+encodeURIComponent('/factory/#equipment')).source,'/factory/#equipment');
assert.equal(resolve('?source='+encodeURIComponent('/resources/engineering/6061-vs-7075-machined-parts/')).source,'/resources/engineering/6061-vs-7075-machined-parts/');
for(const source of ['https://outside.invalid/','//outside.invalid/','javascript:alert(1)','/\\outside.invalid/','/%2f%2foutside.invalid/','/factory/?next=outside','/factory/#<script>','data:text/html,test']) {
 assert.equal(resolve('?source='+encodeURIComponent(source)).source,'',source);
 assert.equal(resolve('?product=example-a&source='+encodeURIComponent(source)).source,references[0].path,source);
}
assert.equal(resolve('?part=Name%00%0aValue').part,'NameValue');
console.log('Inquiry context: current IDs, topics, page/section sources and unsafe-source rejection passed.');
