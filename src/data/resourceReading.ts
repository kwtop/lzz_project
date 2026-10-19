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
 'cnc-machining-cost-factors':{title:contentGuides['cnc-machining-cost-factors'].title,modules:contentGuides['cnc-machining-cost-factors'].sections.map(section=>({section,layout:'reading'}))},
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
 'critical-features-cnc-drawing':{title:'Drawing requirements & critical features',modules:contentGuides['critical-features-cnc-drawing'].sections.map(section=>({section,layout:'reading'}))},
 '6061-vs-7075-cnc-aluminum':{title:contentGuides['6061-vs-7075-cnc-aluminum'].title,modules:contentGuides['6061-vs-7075-cnc-aluminum'].sections.map(section=>({section,layout:'reading'}))},
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
 'cnc-process-selection':{title:'Choose the CNC machining route',modules:contentGuides['cnc-process-selection'].sections.map(section=>({section,layout:'reading'}))},
 'material-and-finish-checklist':{modules:contentGuides['material-and-finish-checklist'].sections.map(section=>({section,layout:'reading'}))},
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
