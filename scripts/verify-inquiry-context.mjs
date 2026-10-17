import assert from 'node:assert/strict';
import {inquiryHref,resolveInquiry} from '../src/lib/inquiryContext.ts';

const references=[
 {id:'example-a',title:'Runner interfaces',legacyName:'Long source product title A',aliases:['Previous runner label'],path:'/products/example-a/',kind:'product'},
 {id:'example-b',title:'Fuel-rail interfaces',legacyName:'Long source product title B',path:'/products/example-b/',kind:'product'},
 {id:'milling',title:'CNC milling',legacyName:'CNC Milling Service',path:'/capabilities/milling/',kind:'capability'},
];
const resolve=search=>resolveInquiry(search,references);
const first=resolve(new URL(inquiryHref(references[0]),'https://example.test').search);
assert.equal(first.part,'Runner interfaces');
assert.equal(first.reference.path,'/products/example-a/');
assert.notEqual(first.storageKey,resolve('?product=example-b').storageKey);
assert.notEqual(first.storageKey,resolve('?part=product:example-a').storageKey);
assert.equal(first.storageKey,resolve('?part=Long%20source%20product%20title%20A').storageKey);
assert.equal(first.storageKey,resolve('?part=Previous%20runner%20label').storageKey);
assert.equal(resolve('?part=Previous%20runner%20label').part,'Runner interfaces');
assert.equal(resolve('?capability=milling').part,'CNC milling');
assert.equal(resolve('?product=example-a&part=Incorrect&source=https://untrusted.test/').reference.path,'/products/example-a/');
assert.equal(resolve('?product=missing&part=Runner%20interfaces&source=javascript:alert(1)').reference,undefined);
assert.equal(resolve('?product=missing&part=Previous%20runner%20label').reference,undefined);
assert.equal(resolve('?part=General%20question').part,'General question');
assert.equal(resolve('').part,'');
assert(first.legacyKeys.includes('lzz:inquiry:v1:'+encodeURIComponent(references[0].legacyName)));
assert(first.legacyKeys.includes('lzz:inquiry:v1:'+encodeURIComponent(references[0].aliases[0])));
assert.equal(resolve('?part='+'x'.repeat(1500)).part.length,1200);
console.log('Inquiry context: identity, legacy links, isolation and untrusted-source checks passed.');
