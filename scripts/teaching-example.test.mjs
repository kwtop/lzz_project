import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import {load} from 'cheerio';

const source=fs.readFileSync(new URL('../src/data/teachingMountExample.ts',import.meta.url),'utf8');
const javascript=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText;
const exampleModule=await import('data:text/javascript;base64,'+Buffer.from(javascript).toString('base64'));
const {teachingMountExample:example,featureLimits,featurePasses,featureRequirement,featureSample,renderTeachingDrawing,renderTeachingInspectionCsv}=exampleModule;

test('dimensional boundaries are inclusive and a failed feature blocks example release',()=>{
 assert.deepEqual(example.features.map(featureLimits),[{lower:9.98,upper:10.02},{lower:19.95,upper:20.05},{lower:11.95,upper:12.05}]);
 assert.deepEqual(example.features.map(featurePasses),[true,true,false]);
 const first=example.features[0];
 assert.equal(featurePasses({...first,sample:9.98}),true);
 assert.equal(featurePasses({...first,sample:10.02}),true);
 assert.equal(featurePasses({...first,sample:10.021}),false);
 assert.match(exampleModule.teachingRelease(),/Hold release: F3/);
});

test('drawing geometry uses the nominal scale and feature requirements from the dataset',()=>{
 const svg=renderTeachingDrawing(),$=load(svg,{xmlMode:true});
 assert.equal($('svg').length,1);
 assert.equal($('[data-hole="H1"] circle').attr('r'),'40');
 assert.equal(Number($('[data-hole="H2"] circle').attr('cx'))-Number($('[data-hole="H1"] circle').attr('cx')),example.features[1].nominal*8);
 assert.equal($('[data-hole="H1"] circle').attr('cy'),$('[data-hole="H2"] circle').attr('cy'));
 for(const feature of example.features)assert.ok(svg.includes(featureRequirement(feature)));
 for(const datum of example.datums)assert.ok(svg.includes(`>${datum.id}</text>`));
 const selectors=$('style').text().match(/[^{}]+(?=\{)/g)||[];
 assert.ok(selectors.every(selector=>selector.startsWith('.teaching-engineering-drawing ')),'inline SVG styles must not change the surrounding article');
 assert.match(svg,/TEACHING DRAWING/);
 assert.match(svg,/Not a complete manufacturing drawing/);
});

test('downloaded inspection data carries the exact example values, results and teaching notice',()=>{
 const csv=renderTeachingInspectionCsv();
 assert.ok(csv.startsWith('\uFEFF'));
 assert.ok(csv.includes(example.notice));
 for(const feature of example.features){
  const row=csv.split('\r\n').find(line=>line.startsWith(`"${feature.id}",`));
  assert.ok(row?.includes(`"${featureSample(feature)}"`));
  assert.ok(row?.endsWith(`"${featurePasses(feature)?'Pass':'Fail'}"`));
 }
 assert.match(csv,/"F3","Plate thickness","12.00","0.05","11.95","12.05","12.08","Fail"/);
 assert.match(csv,/not LZZ production or inspection records/);
});
