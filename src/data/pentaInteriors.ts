import {photo} from './evidence';
import {siteImage,type SiteImageId} from './siteImages';
import {processDisplay} from './processImageDisplays';

export interface InteriorImage {
 id?:string;src:string;srcset?:string;width:number;height:number;alt:string;caption:string;origin:string;position?:string;mobilePosition?:string;sourceHref?:string;
 mobile?:{src:string;srcset?:string;width:number;height:number};
}

export function manufacturingImage(name:string,landscape=false):InteriorImage {
 const upgraded:Record<string,SiteImageId>={milling:'service-milling',turning:'service-turning','five-axis':'service-five-axis','plastic-milling':'service-polymer','drawing-review':'home-drawing-review',packing:'packing-bench'};
 if(upgraded[name])return siteImage(upgraded[name]);
 const stem='/media/penta-interiors-20261017/'+name;
 const descriptions:Record<string,string>={
  milling:'A generic end mill cutting a pocket in a clamped aluminum block',
  turning:'A generic stepped shaft held in a lathe with a single-point turning tool',
  'five-axis':'A generic indexed rotary setup holding an angled aluminum component',
  'plastic-milling':'A generic polymer block held in soft jaws during pocket milling',
  'drawing-review':'A generic housing, cover, schematic drawings and measuring tool on a desk',
  packing:'Generic machined blocks separated in protective foam inside an unmarked carton',
 };
 return {src:stem+'-1120.webp',srcset:[480,800,1120].map(w=>`${stem}-${w}.webp ${w}w`).join(', '),width:1120,height:landscape?840:1400,alt:descriptions[name],caption:name==='drawing-review'?'Drawing preparation · illustration':name==='packing'?'Packing example · illustration':'Process illustration',origin:'image-reference'};
}

export function originalInteriorImage(id:string,caption:string):InteriorImage {
 const original=photo(id);
 return processDisplay(original.src)||{...original,caption,origin:'original-photo'};
}

export function capabilityScene(slug:string):InteriorImage {
 const themes:Record<string,SiteImageId>={
  'cnc-milling-service':'service-milling','cnc-turning-service':'service-turning',
  '5-axis-cnc-machining':'service-five-axis',overview:'service-five-axis',
  'aluminum-cnc-parts':'service-aluminum','stainless-steel-cnc-parts':'service-stainless',
  'casting-machining':'service-casting','copper-brass-cnc-parts':'service-brass',
  'plastic-machined-parts':'service-polymer','prototype-machining':'service-prototype',
  'starting-with-a-sample':'service-prototype','low-volume-production':'service-small-batch',
 };
 return siteImage(themes[slug]||'service-milling');
}

export const resourceCovers:Record<string,InteriorImage>={
 'cnc-machining-cost-factors':{...siteImage('guide-quotations'),caption:'Machining cost review · illustration'},
 'rfq-checklist':siteImage('guide-rfq'),
 'critical-features-cnc-drawing':siteImage('guide-critical-features'),
 '6061-vs-7075-cnc-aluminum':{...siteImage('guide-materials'),caption:'Material and surface choices · illustration'},
 'cnc-process-selection':siteImage('guide-process-selection'),
 'material-and-finish-checklist':siteImage('guide-materials'),
 'compare-cnc-machining-quotations':siteImage('guide-quotations'),
 'custom-cnc-parts-shipping-checklist':siteImage('guide-packing'),
 'machined-prototype-approval-checklist':siteImage('guide-sample-approval'),
 'prototype-vs-small-batch-cnc':siteImage('guide-prototype-batch'),
};
