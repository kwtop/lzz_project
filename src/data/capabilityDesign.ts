import catalog from './catalog.json';
import {partVisual,partDisplayTitle} from './productsEditorial';
import {serviceReading,type ServicePlan} from './serviceReading';
import {capabilityContent} from './capabilityContent';
import {capabilityOverview} from './capabilityOverview';
import {capabilityExamples,capabilityReview,exampleComparison} from './capabilityEditorial';
import {caseForCapability} from './cases';

export type CapabilityArt={stem?:string;src?:string;alt:string;caption:string;origin?:string;width?:number;height?:number};
export type CapabilityModuleKind='geometry'|'parts'|'materials'|'workshop'|'requirements'|'route-choice'|'applications'|'purpose'|'sample-review'|'workflow'|'faq'|'inquiry';
type Design={lead:string;hero:'split'|'wide'|'showcase'|'comparison'|'product'|'centered'|'brief'|'batch'|'sample';art?:CapabilityArt;modules:CapabilityModuleKind[];parts:'mosaic'|'rows'|'gallery'|'source'|'sample';material:'table'|'finish'|'grades'|'polymer'|'compact';};
const art=(stem:string,alt:string,caption:string):CapabilityArt=>({stem,alt,caption});
export const capabilityArtwork={
 family:art('/media/capabilities-section-20261014/capability-family','AI illustration of a machined housing, stepped shaft, brass fitting and polymer guide','AI-generated part-family illustration.'),
 finish:art('/media/capabilities-section-20261014/aluminum-finish','AI illustration comparing bare aluminum with a dark treated housing and protected silver interfaces','AI-generated finishing concept. Color, masking and acceptance are specified for the order.'),
 plastic:art('/media/capabilities-section-20261014/plastic-support','AI illustration of a thin polymer pocketed plate fully supported on a fixture with edge clamps','AI-generated support concept. Fixturing and material are selected for the drawing.'),
 sample:art('/media/capabilities-section-20261014/sample-definition','AI illustration of a generic housing beside schematic drawing views and a caliper','AI-generated sample-to-drawing concept; not an approved drawing or reconstruction record.'),
};
const turningPlan:ServicePlan={
 title:'CNC Turning Services',exampleHeading:'Turned forms, different working interfaces',exampleIntro:'Identify the rotational shape, then locate the features that need drilling, threading or milling.',
 materials:[
  {name:'Aluminum',grades:'6061, 7075; specify the temper.',finish:'As-machined, polishing or anodizing.',review:'Identify fitted areas to protect and dimensions to check after anodizing.'},
  {name:'Stainless steel',grades:'303, 304 or 316L; specify the standard and condition.',finish:'Fine-turned surfaces, polishing, passivation or electropolishing.',review:'Mark bearing and sealing surfaces; request any material or treatment records.'},
  {name:'Copper & brass',grades:'Examples include C11000 copper and C36000 brass.',finish:'Polishing or compatible protective plating.',review:'Define contact or seal areas, material restrictions and final dimensions after plating.'},
  {name:'Engineering plastics',grades:'POM, PTFE or PEEK; specify the exact polymer grade.',finish:'Machined surfaces with specified edge quality and cleaning.',review:'State conditioning or measurement-temperature requirements for fitted dimensions.'},
 ],
 geometry:{title:'One axis, several working features',text:'Relate fitted diameters, shoulders and the bore to a common datum scheme. Show where threads, grooves and secondary holes must sit relative to those datums.',stem:'/media/turning-reading-20261014/turned-features',alt:'AI illustration of a stepped tubular component with an axial bore, groove, external thread and cross-hole',caption:'Typical turned geometry. AI-generated illustration.'},
 checks:[
  {feature:'Diameters & axial lengths',drawing:'Working diameters, bore depths, shoulder positions and mating fits.',inspection:'Dimensional checks against drawing limits and agreed measurement conditions.'},
  {feature:'Datum axis & runout',drawing:'Datum references, surfaces sharing an axis and geometric controls for assembly.',inspection:'Agree how the part is located and which runout or positional results are recorded.'},
  {feature:'Threads & engagement',drawing:'Complete thread designation, length and mating connection. NPT, BSPT and metric are separate specifications.',inspection:'Confirm the appropriate thread gauge, engagement and acceptance requirements.'},
  {feature:'Sealing surfaces & edges',drawing:'Surface texture, grooves, edge conditions and post-treatment dimensions.',inspection:'Agree dimensional and surface checks; define leak tests and application approvals separately.'},
 ],
 workflowTitle:'Turning, secondary machining, finished features',workflowIntro:'The source photographs show a turning setup, a subsequent milling operation and turned component forms.',
 steps:[
  {title:'Turn the rotational features',text:'The workpiece rotates while the tool forms diameters, shoulders, bores and grooves. Material, stock size and clamping access guide the setup.',photo:'turning-operation',caption:'CNC turning at LZZ: workpiece, turret and coolant.'},
  {title:'Machine the off-axis features',text:'Cross-holes, flats and slots may use live tooling or a subsequent milling setup. Their positions are controlled from the turned datums.',photo:'turn-mill-operation',caption:'A turned component located for a subsequent milling operation.'},
  {title:'Review the finished features',text:'Agree the drawing revision, inspection items and required records. Define finishing and deburring around the working surfaces.',photo:'turning-parts',caption:'Turned forms from the workshop archive; the order drawing defines acceptance.'},
 ],
 questions:[
  {question:'Can I order one turned part?',answer:'Yes. Orders start at 1 piece. Send the drawing, material and finish requirements so we can review the scope and prepare a quotation.'},
  {question:'What sizes and tolerances can you machine?',answer:'Send the finished dimensions, stock size, material and critical tolerances. Maximum turning size and achievable limits are reviewed against the drawing, workholding, tool access and inspection method.'},
  {question:'Can turned parts include cross-holes and flats?',answer:'Yes. Depending on the geometry, these features may use live tooling or a secondary milling operation. Locate them relative to the turned datum axis and include access constraints.'},
  {question:'What should I send for a CNC turning quote?',answer:'Include the current model and dimensioned drawing, material grade and condition, quantity per release, finish and delivery destination. Add mating-part information, thread specifications and inspection or functional-test requirements.'},
 ],rfqTitle:'Request a CNC turning quote',
};
export const capabilityDesigns:Record<string,Design>={
 'cnc-milling-service':{lead:'Pockets, faces and holes. Planned around the way your part fits.',hero:'split',art:art('/media/capability-directory-20261014/cnc-milling-service','AI illustration of a milling cutter above a pocketed workpiece','AI-generated milling concept.'),modules:['geometry','parts','workshop','materials','faq','inquiry'],parts:'mosaic',material:'table'},
 'cnc-turning-service':{lead:'A common axis for diameters, shoulders, bores and threads.',hero:'wide',art:turningPlan.geometry,modules:['parts','requirements','materials','workshop','faq','inquiry'],parts:'rows',material:'table'},
 '5-axis-cnc-machining':{lead:'Reach angled faces. Follow complex contours.',hero:'showcase',art:serviceReading['5-axis-cnc-machining'].geometry,modules:['route-choice','parts','workshop','materials','faq','inquiry'],parts:'mosaic',material:'compact'},
 'casting-machining':{lead:'Turn a cast blank into defined working interfaces.',hero:'comparison',art:serviceReading['casting-machining'].geometry,modules:['materials','parts','workflow','faq','inquiry'],parts:'gallery',material:'table'},
 'aluminum-cnc-parts':{lead:'Thin walls, clean interfaces and a finish defined for the drawing.',hero:'product',modules:['materials','parts','workshop','faq','inquiry'],parts:'mosaic',material:'finish'},
 'stainless-steel-cnc-parts':{lead:'Start with the grade. Define the fit and final condition.',hero:'product',modules:['materials','parts','requirements','faq','inquiry'],parts:'rows',material:'grades'},
 'copper-brass-cnc-parts':{lead:'Define where the part conducts, seals or fastens.',hero:'centered',modules:['applications','materials','parts','requirements','faq','inquiry'],parts:'source',material:'grades'},
 'plastic-machined-parts':{lead:'The polymer, the support and the measurement state belong together.',hero:'split',art:capabilityArtwork.plastic,modules:['materials','parts','requirements','faq','inquiry'],parts:'source',material:'polymer'},
 'prototype-machining':{lead:'Make a part that answers your next design question.',hero:'brief',art:serviceReading['prototype-machining'].geometry,modules:['purpose','parts','materials','faq','inquiry'],parts:'mosaic',material:'compact'},
 'low-volume-production':{lead:'Each part number. Each revision. Each release.',hero:'batch',art:serviceReading['low-volume-production'].geometry,modules:['requirements','workflow','parts','materials','faq','inquiry'],parts:'rows',material:'compact'},
 'starting-with-a-sample':{lead:'An existing part is the starting point for an approved specification.',hero:'sample',art:capabilityArtwork.sample,modules:['sample-review','workflow','materials','requirements','faq','inquiry'],parts:'sample',material:'table'},
};
// Reading families share a predictable structure; production-stage pages retain their own layouts.
type ReadingGuide={family:'process'|'material';lead:string;description:string;examples:string};
export const capabilityReading:Record<string,ReadingGuide>={
 'cnc-milling-service':{family:'process',lead:'Flat faces, pockets and holes in custom parts.',description:'CNC milling for blocks, brackets and housings. Explore the part examples and machining steps, then review materials and drawing requirements.',examples:'Blocks, brackets and housings combine flat faces, recessed pockets and holes. These examples show the kinds of features to include in your drawing.'},
 'cnc-turning-service':{family:'process',lead:'Shafts, sleeves and fittings built around a shared axis.',description:'CNC turning forms round features such as diameters, shoulders, bores and threads. Additional machining can add flats, slots and cross-holes.',examples:'Start with the round shape, then identify any threads, grooves or holes. The examples below show different ways these features come together.'},
 '5-axis-cnc-machining':{family:'process',lead:'Machining for angled faces and curved surfaces.',description:'Five-axis machining provides access from several directions. The model, tool access and fixture clearance determine the route for your part.',examples:'Multi-sided parts and curved components need access from several directions. These examples show angled faces and continuous contours.'},
 'casting-machining':{family:'process',lead:'Finished bores, faces and mounting points in cast parts.',description:'Machining adds the working features to a cast blank. Review the part examples, machining steps and information needed about the supplied casting.',examples:'A cast blank provides the overall shape. Machining finishes the bores, sealing surfaces and mounting points that connect it to other parts.'},
 'aluminum-cnc-parts':{family:'material',lead:'Aluminum housings, covers and custom components.',description:'Explore aluminum part examples, alloy choices and surface treatments. The drawing defines the wall thickness, fit and finished appearance.',examples:'Housings, covers and enclosures combine pockets, thin walls and mounting features. The alloy and surface treatment are reviewed alongside the shape.'},
 'stainless-steel-cnc-parts':{family:'material',lead:'Stainless steel shafts, fittings and locking hardware.',description:'Explore part examples and grade choices, then review machining, surface treatment and inspection. The grade and final condition depend on the application.',examples:'Shafts, threaded fittings and locking hardware connect through fitted surfaces. The drawing identifies the dimensions and finish needed where parts meet.'},
 'copper-brass-cnc-parts':{family:'material',lead:'Copper and brass contacts, fittings and connectors.',description:'Start with what the part needs to do: conduct electricity, transfer heat or form a sealed connection. Then review the alloy, geometry and finish.',examples:'Contacts and fittings serve different purposes. These examples help identify the working surfaces, threads and connections that need to be specified.'},
 'plastic-machined-parts':{family:'material',lead:'Plastic insulators, guides and custom housings.',description:'Explore machined polymer parts and material choices. The working environment, part shape and required fit guide the material and machining review.',examples:'Insulators, guides and polymer housings combine holes, slots and fitted surfaces. Choose the material with its working environment in mind.'},
};
export const productionTiming='Production takes 7–14 business days after drawing and order confirmation, including finishing. Shipping time is additional. Confirm the schedule for your quantity and requirements in the quotation.';
export const shaftSlug='custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier';
export const partDisplay=(product:(typeof catalog.products)[number])=>({
 ...partVisual(product),product,title:product.slug==='small-batch-cnc-machining-manufacturer-complex-aluminum-housings'?'Pocketed aluminum housings':partDisplayTitle(product),href:'/machined-parts/gallery/'+product.slug+'/',
 text:exampleComparison[product.slug]||'A housing form with machined interfaces. Define the geometry and acceptance requirements on the approved drawing.',
});
export const capabilityPage=(slug:string)=>{
 const originalDesign=capabilityDesigns[slug];if(!originalDesign)throw new Error('Unknown capability design: '+slug);
 const reading=capabilityReading[slug];
 const design:Design=reading?{...originalDesign,hero:'split',parts:'rows',material:'table',lead:reading.lead,modules:reading.family==='process'?['parts','workshop','materials','requirements','faq','inquiry']:['parts','materials','workshop','requirements','faq','inquiry']}:originalDesign;
 const sample=slug==='starting-with-a-sample',turning=slug==='cnc-turning-service';
 const plan=turning?turningPlan:serviceReading[slug];
 const content=sample?{description:'Review an existing sample, reconstruct its geometry and approve the drawing, material and acceptance requirements before production.',scope:'Approve the manufacturing definition before machining. Sample condition, hidden features and intended fit need to be resolved with the drawing.',drawing:[],inspection:[],rfq:[]}:capabilityContent[slug];
 const overview=sample?{workholding:'Provide overall dimensions, close photographs, mating parts and available drawings. Agree how inaccessible features will be measured.',inspection:'Agree fit or functional evaluation, acceptance limits, measurement methods and who approves the first part before repeat production.'}:capabilityOverview[slug];
 const productSlugs=sample?['oem-precision-cnc-machined-casting-housings']:turning?[shaftSlug,'custom-rotary-cylindrical-components','custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer']:capabilityExamples[slug];
 const parts=productSlugs.map(s=>partDisplay(catalog.products.find(p=>p.slug===s)!));
 const defaultHero=partDisplay(catalog.products.find(p=>p.slug===(sample?'oem-precision-cnc-machined-casting-housings':capabilityExamples[slug][0]))!);
 const heroArt:CapabilityArt=slug==='5-axis-cnc-machining'?partDisplay(catalog.products.find(p=>p.slug==='ultra-high-precision-machining-services')!):design.art||{src:defaultHero.src,alt:defaultHero.alt,caption:defaultHero.caption,origin:defaultHero.origin,width:defaultHero.width,height:defaultHero.height};
 const timing=productionTiming+(sample?' Reconstruction and drawing-approval timing are agreed separately.':'');
 const questions=[...plan.questions,{question:sample?'How is the schedule agreed?':'How long does production take?',answer:timing}];
 const inputs=sample?['Sample photographs, dimensions and mating parts','Known material, finish and current drawings','Wear, damage and intended changes','Required model and drawing deliverables','First-part quantity and acceptance checks','Repeat demand, destination and requested date']:[...(capabilityReview[slug]?.inputs||[]),'Quantity, delivery destination and requested date','Current drawing, model and revision'];
 return {slug,design,reading,plan,content,overview,parts,heroArt,defaultHero,sample,turning,questions,inputs,cases:caseForCapability(slug),timing};
};
export type CapabilityPageData=ReturnType<typeof capabilityPage>;
