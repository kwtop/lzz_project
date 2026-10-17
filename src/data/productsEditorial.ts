import sourceMedia from './productSourceMedia.generated.json';
import {productIdentity,listingSource,primaryReferenceIds} from './productIdentity';
import additionalMedia from './additionalMedia.generated.json';
import {productTitle} from './presentation';
import {readingFor} from './productReading';

export type PartRecord={slug:string;name:string;images:string[];categories:string[]};
export type PartModule='fit'|'options'|'drawing'|'views'|'blank'|'batch'|'related'|'order';
export type PartPlan={kind:string;hero:'split'|'wide'|'portrait';modules:PartModule[];featureTitle:string;alt:string};
// Every record has an explicit editorial plan. The long-standing source identity
// remains the URL slug; presentation order does not change the catalog records.
const entries:[string,string,PartPlan['hero'],PartModule[],string,string][]=[
 ['custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm','milled','split',['options','fit','drawing','views','related','order'],'Bores and faces from one datum scheme','Silver circular milled component with a stepped central bore and face-hole pattern'],
 ['custom-oem-high-precision-cnc-milling-manufacturer','block','split',['options','fit','drawing','views','related','order'],'Start with the mounting interfaces','Two machined metal blocks with circular bores and mounting faces'],
 ['ultra-high-precision-machining-services','impeller','split',['options','fit','drawing','views','related','order'],'Blade profiles, roots and the hub bore','Metal impeller with curved blades around a central hub bore'],
 ['global-oem-precision-machining-solutions','turned','portrait',['options','fit','drawing','views','related','order'],'Relate the angled features to the turned axis','Angled cylindrical metal component with an externally threaded neck'],
 ['global-manufacturer-of-multi-sided-precision-machined-components','multi-face','wide',['options','fit','drawing','views','related','order'],'Connect the ports across different faces','Blue circular component with a raised bore and ports around its perimeter'],
 ['custom-oem-cnc-turning-manufacturer','turned','split',['options','fit','drawing','views','related','order'],'Diameters, shoulders and secondary operations','Cylindrical turned metal components with bores, side holes and flanges'],
 ['custom-rotary-cylindrical-components','turned','split',['options','fit','drawing','views','related','order'],'Keep the axis and off-axis features connected','Three cylindrical metal components with bores, slots and side openings'],
 ['custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer','connection','split',['options','fit','drawing','views','related','order'],'Define the complete mating connection','Turned metal fitting, threaded adapter and circular mounting flange'],
 ['full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing','finish','wide',['options','fit','drawing','views','related','order'],'Functional faces and the finished appearance','Dark finished metal bracket and circular housing'],
 ['custom-high-precision-machining-for-structural-aesthetic-components-oem','finish','wide',['options','fit','drawing','views','related','order'],'Assembly fit and visible surfaces','Orange and blue finished mounting components with bores and bolt holes'],
 ['high-volume-cnc-turning-for-complex-internal-external-features','turned','split',['options','fit','drawing','views','related','order'],'Internal bores and external working features','Stepped turned metal shaft and sleeves with threads, bores and cross-holes'],
 ['high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem','impeller','split',['options','fit','drawing','views','related','order'],'Flow surfaces and mounting geometry','Curved-blade metal impeller with a recessed central hub'],
 ['custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier','assembly','portrait',['options','fit','drawing','views','related','order'],'Separate the component and assembly scope','Aluminum intercooler form with cooling fins and curved end-tank surfaces'],
 ['custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier','cover','wide',['options','fit','drawing','views','related','order'],'Clearance, sealing and visible finish','Curved billet aluminum engine-cover form with a visible machined surface texture'],
 ['custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier','assembly','wide',['options','fit','drawing','views','related','order'],'Runners, flanges and installation clearance','Illustrative aluminum intake manifold with curved runners and connection flanges'],
 ['custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier','assembly','split',['options','fit','drawing','views','related','order'],'Housing fits and the supplied actuator scope','Illustrative throttle-body form with a round bore and dark actuator cover'],
 ['custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier','assembly','wide',['options','fit','drawing','views','related','order'],'Runner geometry and injector interfaces','Illustrative aluminum manifold with curved intake runners and mounting bosses'],
 ['custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier','assembly','wide',['options','fit','drawing','views','related','order'],'Internal cavities, ports and mating faces','Illustrative metal intake plenum with curved body and connection ports'],
 ['custom-cnc-machined-castings-transmission-housings-pump-bodies','casting','split',['options','fit','blank','drawing','views','related','order'],'Bearing and sealing interfaces','Ribbed casting housing with a machined central bore and outer mounting faces'],
 ['custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier','turned','split',['options','fit','drawing','views','related','order'],'Working diameters and surface condition','Two turned metal flanged components with central bores and mounting holes'],
 ['custom-oem-cnc-machined-non-metallic-components-insulating-parts','polymer','portrait',['options','fit','drawing','views','related','order'],'Material conditions and assembly loads','Pale non-metallic circular component with raised sections, slots and holes'],
 ['custom-oem-cnc-machined-plastic-parts-manufacturer','polymer','wide',['options','fit','drawing','views','related','order'],'Select the polymer before the machining route','Orange and yellow machined non-metallic forms with recesses and drilled holes'],
 ['oem-precision-cnc-machined-casting-housing-structural-enclosures','casting','split',['options','fit','blank','drawing','views','related','order'],'Ribs, cavities and fixture support','Open ribbed cast housing with bearing bores and perimeter mounting holes'],
 ['oem-precision-cnc-machined-casting-housings','casting','split',['options','fit','blank','drawing','views','related','order'],'Bores and faces from the controlled model','Cast circular housing form with projecting cylindrical connections'],
 ['precision-cnc-machined-castings-custom-oem-housings','casting','portrait',['options','fit','blank','drawing','views','related','order'],'Seal faces, fits and mounting holes','Irregular cast metal housing with a machined flange and central opening'],
 ['precision-cnc-machined-castings-manufacturer','casting','wide',['options','fit','blank','drawing','views','related','order'],'Hidden interfaces and inspection access','Open cast housing with internal ribs, circular openings and mounting bosses'],
 ['precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances','polymer','wide',['options','fit','drawing','views','related','order'],'Thin sections and critical mating features','Green machined plastic blocks with repeated bores and recessed faces'],
 ['precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier','connection','split',['options','fit','drawing','views','related','order'],'Contact, sealing and plated interfaces','Small brass hex-head threaded components'],
 ['precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier','batch','wide',['options','batch','drawing','views','related','order'],'Keep each part number under control','Two pocketed machined aluminum housing forms with different mounting interfaces'],
 ['precision-machining-for-functional-plastic-blocks-structural-components','polymer','split',['options','fit','drawing','views','related','order'],'Working faces, inserts and loading points','Illustrative rectangular green polymer support block with a stepped bore, mounting holes and side locating recess'],
 ['precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures','enclosure','split',['options','fit','drawing','views','related','order'],'Angled faces and repeated thin-wall setups','Two machined aluminum enclosures with recessed cavities and mounting holes'],
 ['precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier','turned','split',['options','fit','drawing','views','related','order'],'Specify grade, fitted size and final treatment','Turned metal cylindrical component with a side mounting feature and separate flange'],
 ['precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier','pin','portrait',['options','fit','drawing','views','related','order'],'Engagement, mounting and assembly responsibility','Stepped threaded indexing-pin form with flanges and an extended engagement end'],
 ['small-batch-cnc-machining-manufacturer-complex-aluminum-housings','enclosure','split',['options','fit','drawing','views','related','order'],'The lid, gasket and mounting interfaces','Open aluminum housing with a recessed cavity, sealing rim and mounting holes'],
 ['small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv','batch','wide',['options','batch','drawing','views','related','order'],'Material and release requirements per component','Three turned cylindrical metal components with flanges and side slots'],
];
export const partPlans:Record<string,PartPlan>=Object.fromEntries(entries.map(([slug,kind,hero,modules,featureTitle,alt])=>[slug,{kind,hero,modules,featureTitle,alt}]));
export const partPlan=(slug:string):PartPlan=>{const plan=partPlans[slug];if(!plan)throw new Error('Missing Products editorial plan: '+slug);return plan};
export const partDisplayTitle=(product:PartRecord)=>productIdentity(product.slug).title||readingFor(product.slug).title||productTitle(product);
export const partDisplayLead=(product:PartRecord)=>productIdentity(product.slug).lead||readingFor(product.slug).lead;
export const partDisplayFeature=(product:PartRecord,feature:string)=>productIdentity(product.slug).description||feature;
export function partVisual(product:PartRecord){
 const entry=sourceMedia[product.slug as keyof typeof sourceMedia],identity=productIdentity(product.slug);
 if(!entry)throw new Error('Missing reviewed source image: '+product.slug);
 const primaryId=primaryReferenceIds[product.slug],primary=primaryId?additionalMedia.photos[primaryId]:undefined;
 return {src:entry.src,srcset:entry.srcset,width:entry.width,height:entry.height,alt:primary?.caption||listingSource(product.slug).alt,caption:entry.backgroundEdited?'Original source subject on an AI-generated neutral background.':primary?.caption||identity.label+' · Original form retained; drawing and supplied scope require confirmation.',origin:entry.backgroundEdited?'original-subject-ai-background':primary?.kind||identity.kind,nativeWidth:entry.nativeWidth,quality:entry.id==='P04'?'low-resolution' as const:undefined};
}
export const productIllustrations={
 families:{stem:'/media/products-editorial-20261014/part-families',alt:'Illustrative aluminum housing, stepped metal shaft, brass fitting and white polymer block',caption:'Machined part forms · AI-generated illustration'},
 batch:{stem:'/media/products-editorial-20261014/mixed-part-planning',alt:'Illustrative housing and lid, turned shaft, brass adapter, polymer roller and mounting bracket',caption:'Planning a mixed-part order · AI-generated illustration'},
};
export const studyPlans:Record<string,{hero:'split'|'wide';layout:string;modules:string[]}>={
 'five-axis-machining-multi-face-parts':{hero:'split',layout:'multi-face',modules:['geometry','sequence','inspection','questions','related']},
 'turning-then-milling-cylindrical-parts':{hero:'split',layout:'turn-mill',modules:['geometry','sequence','inspection','questions','related']},
 'two-stage-cnc-milling':{hero:'split',layout:'two-setup',modules:['geometry','sequence','inspection','questions','related']},
 'milling-a-pocketed-enclosure-form':{hero:'split',layout:'pocket',modules:['geometry','sequence','inspection','questions','related']},
 'milling-prismatic-components':{hero:'wide',layout:'prismatic',modules:['geometry','sequence','inspection','questions','related']},
 '29-inch-display-housing-cnc-machining':{hero:'wide',layout:'panel',modules:['geometry','sequence','inspection','questions','related']},
 'custom-plastic-parts-ptfe-pom-pe-acrylic':{hero:'split',layout:'plastic-collection',modules:['families','material','inspection','questions','related']},
 'custom-metal-parts-batch-examples':{hero:'wide',layout:'metal-collection',modules:['families','sequence','inspection','questions','related']},
};
