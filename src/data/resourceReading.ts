import {load} from 'cheerio';
import {contentGuides,type Guide} from './contentGuides';
import type {ContentVisual} from './contentVisuals';
import type {resourceIllustrations} from './resourceIllustrations';
import {resources} from './resources';

type Visual=ContentVisual|keyof typeof resourceIllustrations;
type Section=Guide['sections'][number];
type Module={section:Section;layout:string;visual?:Visual};
type Reading={title?:string;intro?:string;hero?:Visual;heroPhoto?:string;pair?:boolean;compact?:boolean;mergeFirst?:boolean;modules:Module[]};
const section=(slug:string,id:string)=>contentGuides[slug].sections.find(s=>s.id===id)!;
const module=(slug:string,id:string,layout='reading',visual?:Visual):Module=>({section:section(slug,id),layout,visual});
const material=section('material-and-finish-checklist','finish-and-acceptance');
const finish=load(material.html,null,false);
const finishItems=finish('.ce-facts>div').toArray();
const finishHtml=(indices:number[])=>'<dl class="ce-facts">'+indices.map(i=>finish.html(finishItems[i])).join('')+'</dl>';
const working=section('custom-cnc-machined-components-for-prototypes-and-production','working-surfaces');
const geometry=load(working.html,null,false);
const paragraphs=geometry('p').toArray();
const batchSource=load(resources.find(item=>item.slug==='prototype-vs-small-batch-cnc')!.html,null,false);
const batchTable=batchSource('.decision-table').first();
const batchLabels=batchTable.find('thead th').map((_,cell)=>batchSource(cell).text()).get();
batchTable.find('tbody tr').each((_,row)=>{batchSource(row).find('td').each((index,cell)=>{batchSource(cell).attr('data-label',batchLabels[index+1]);});});
const batchComparison={id:'batch-comparison',title:'Prototype and repeat-batch decisions',html:'<div class="ce-guide-table" role="region" tabindex="0" aria-label="Prototype and repeat-batch planning">'+batchTable.toString()+'</div>'};

// The shared atoms stop at headings, prose, tables and media. Each page has an
// explicit reading plan; image count and module shape are not chosen by length.
export const resourceReading:Record<string,Reading>={
 'rfq-checklist':{intro:'Prepare your files with the checklist, then copy the inquiry brief. Mark any specifications that still need to be agreed.',modules:[
  module('rfq-checklist','drawing-package','facts'),
  module('rfq-checklist','material-finish','facts'),
  module('rfq-checklist','commercial-brief','facts'),
  {...module('rfq-checklist','rfq-template','brief'),section:{...section('rfq-checklist','rfq-template'),links:section('rfq-checklist','rfq-template').links?.filter(([,href])=>!href.startsWith('/downloads/'))}},
 ]},
 'compare-cnc-machining-quotations':{title:'Compare CNC machining quotations',mergeFirst:true,modules:[
  module('compare-cnc-machining-quotations','comparison','table'),
  module('compare-cnc-machining-quotations','unresolved-items','reading'),
  module('compare-cnc-machining-quotations','quote-record','record'),
 ]},
 'critical-features-cnc-drawing':{title:'Drawing requirements & critical features',intro:'Define how the part fits and works, then make the requirements measurable on the controlled drawing. The model, drawing revision and acceptance checks must describe the same part.',modules:[
  {...module('critical-features-cnc-drawing','function-first','reading'),section:{...section('critical-features-cnc-drawing','function-first'),aliases:['part-requirements','working-surfaces','working-surfaces-heading','section-1'],html:section('critical-features-cnc-drawing','function-first').html.replace('mounting holes and sealing interfaces','mounting holes, sealing interfaces, sliding surfaces and load-bearing faces')}},
  module('critical-features-cnc-drawing','feature-checklist','table'),
  {...module('critical-features-cnc-drawing','study-context','context'),section:{...section('critical-features-cnc-drawing','study-context'),aliases:['section-2','section-2-heading'],photos:[{id:'multi-feature-milling-parts',caption:'Multi-feature machined parts · original LZZ photograph. Geometry reference; acceptance follows the drawing.'}],html:section('critical-features-cnc-drawing','study-context').html+'<p>Achievable tolerances depend on material, geometry, setup and measurement method.</p>'}},
  {...module('critical-features-cnc-drawing','release-files','record'),section:{...section('critical-features-cnc-drawing','release-files'),aliases:['section-3','section-3-heading','section-4','section-4-heading','section-5'],html:section('critical-features-cnc-drawing','release-files').html+'<p>Include material grade and condition, final finish, required records, applicable standards and revisions, traceability, end use and export requirements. Mark masked surfaces and whether dimensions apply before or after treatment. Agree dimensional, appearance and functional acceptance; confirm the effect of design or material changes before repeat production.</p>'}},
 ]},
 'machined-prototype-approval-checklist':{title:'Machined prototype approval',compact:true,modules:[
  module('machined-prototype-approval-checklist','evaluation','reading'),
  module('machined-prototype-approval-checklist','approval-checklist','table'),
  module('machined-prototype-approval-checklist','approval-record','record'),
  module('machined-prototype-approval-checklist','batch-release','reading'),
 ]},
 'custom-cnc-machined-components-for-prototypes-and-production':{heroPhoto:'multi-feature-milling-parts',modules:[
  {section:{...working,title:'Working surfaces',aliases:['section-1'],html:geometry.html(paragraphs[0])},layout:'reading'},
  {section:{id:'section-2',title:'Geometry and machining route',html:geometry.html(paragraphs[1]),links:[['CNC milling','/capabilities/cnc-milling-service/'],['CNC turning','/capabilities/cnc-turning-service/']]},layout:'reading'},
  {...module('custom-cnc-machined-components-for-prototypes-and-production','section-3','illustrated','materials'),section:{...section('custom-cnc-machined-components-for-prototypes-and-production','section-3'),links:[['Material and finish checklist','/resources/technical-guides/material-and-finish-checklist/']]}},
  {...module('custom-cnc-machined-components-for-prototypes-and-production','section-4','record'),section:{...section('custom-cnc-machined-components-for-prototypes-and-production','section-4'),links:[['Quality and records','/factory/#quality'],['Sample approval process','/about/how-we-work/#section-5'],['Plan repeat production','/resources/ordering/prototype-vs-small-batch-cnc/']]}},
 ]},
 'cnc-process-selection':{title:'Choose the CNC machining route',modules:[
  module('cnc-process-selection','process-comparison','table'),
  module('cnc-process-selection','process-references','workshop'),
  module('cnc-process-selection','geometry-studies','reading'),
  {...module('cnc-process-selection','accuracy','record'),section:{...section('cnc-process-selection','accuracy'),links:[['Complete RFQ inputs','/resources/ordering/rfq-checklist/'],['Critical drawing features','/resources/technical-guides/critical-features-cnc-drawing/']]}},
 ]},
 'material-and-finish-checklist':{compact:true,modules:[
  {...module('material-and-finish-checklist','material-specification','table'),section:{...section('material-and-finish-checklist','material-specification'),links:[...(section('material-and-finish-checklist','material-specification').links||[]),['Stainless steel machining','/capabilities/stainless-steel-cnc-parts/'],['Copper and brass machining','/capabilities/copper-brass-cnc-parts/']]}},
  {section:{...material,html:finish('p').first().toString()+finishHtml([0,1]),title:'Treatment and appearance'},layout:'facts'},
  {section:{id:'interfaces-and-dimensions',title:'Interfaces and dimensions after treatment',html:finishHtml([2,3,4])},layout:'illustrated',visual:'finish'},
  {section:{id:'part-construction',aliases:['construction-title','coated-parts','coated-title','coating-requirements','requirements-title'],title:'Solid material, coating or covering?',html:'<p>A solid plastic part uses the specified polymer throughout. A coated metal part has a separate surface treatment; a covered wheel or roller has a separate covering as part of the component. Specify the substrate material, treatment, surfaces to coat or mask, and whether critical dimensions apply before or after coating.</p><p>The original photographs below are labeled as Teflon surface coating. They show round components and long pieces with repeated holes; they are distinct from parts machined from PTFE material.</p>',photos:[{id:'finish-coated-round',caption:'Round coated components · original source photograph'},{id:'finish-coated-bars',caption:'Coated long components · original source photograph'}]},layout:'reading'},
  module('material-and-finish-checklist','material-records','record'),
 ]},
 'prototype-vs-small-batch-cnc':{compact:true,modules:[
  module('prototype-vs-small-batch-cnc','section-1','reading'),
  {section:batchComparison,layout:'table'},
  module('prototype-vs-small-batch-cnc','section-2','facts'),
  module('prototype-vs-small-batch-cnc','revision-release','table'),
  module('prototype-vs-small-batch-cnc','section-4','record'),
 ]},
 'custom-cnc-parts-shipping-checklist':{title:'Plan the shipment of CNC parts',modules:[
  module('custom-cnc-parts-shipping-checklist','section-2','illustrated','packing'),
  module('custom-cnc-parts-shipping-checklist','transport-title','reading'),
  module('custom-cnc-parts-shipping-checklist','delivery-package','record'),
  module('custom-cnc-parts-shipping-checklist','archive-title','archive'),
 ]},
};
