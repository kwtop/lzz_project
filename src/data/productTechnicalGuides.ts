import type {ApprovedResourceGuide} from './resourceApproved';
import {productPhotograph} from './productPhotography';
import {enclosureGuide} from './product-guides/enclosures';
import {castingGuide} from './product-guides/castings';
import {plasticGuide} from './product-guides/plastics';
import {circularGuide} from './product-guides/circular';
import {turnedGuide} from './product-guides/turned-parts';
import {fittingGuide} from './product-guides/fittings';
import {impellerGuide} from './product-guides/impellers';
import {anodizingGuide} from './product-guides/anodizing';
import {manifoldGuide} from './product-guides/manifolds';
import {plungerGuide} from './product-guides/plungers';

export const productGuidePublished='2026-11-01';
export const productTechnicalGuides=[enclosureGuide,circularGuide,turnedGuide,fittingGuide,castingGuide,plasticGuide,impellerGuide,anodizingGuide,manifoldGuide,plungerGuide];
export const productGuideBySlug=Object.fromEntries(productTechnicalGuides.map(guide=>[guide.slug,guide]));
export const productGuidePlans:Record<string,ApprovedResourceGuide>=Object.fromEntries(productTechnicalGuides.map(guide=>[guide.slug,{
 title:guide.title,intro:guide.intro,heading:guide.title,polished:true,
 modules:guide.sections.map(section=>({section,kind:'reading' as const})),
 related:guide.related,closing:guide.closing,nextText:guide.nextText,
 editorial:{updated:productGuidePublished,dateLabel:'1 November 2026'},
}]));
export const productGuideCovers=Object.fromEntries(productTechnicalGuides.map(guide=>{
 const image=productPhotograph(guide.productSlug);
 if(!image)throw new Error('Missing product photograph for '+guide.slug);
 return [guide.slug,image];
}));
export const productGuideResources=productTechnicalGuides.map(guide=>({
 slug:guide.slug,title:guide.title,description:guide.description,category:'Product technical guide',
 html:'<p>'+guide.intro+'</p>'+guide.sections.map(section=>'<h2 id="'+section.id+'">'+section.title+'</h2>'+section.html).join(''),
}));
