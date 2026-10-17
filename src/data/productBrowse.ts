import {productSummary} from './productSummaries';
import {matchesPartCategory} from './productTags';
type Part = {slug:string;name:string;categories:string[]};
// Approved editorial indexes. These describe example forms, not stock or measured material.
const partIds:Record<number,string> = {
44:'custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier',45:'custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier',46:'custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier',47:'custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier',48:'custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier',49:'custom-cnc-machined-castings-transmission-housings-pump-bodies',50:'custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier',51:'custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier',52:'custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm',53:'custom-high-precision-machining-for-structural-aesthetic-components-oem',54:'custom-oem-cnc-machined-non-metallic-components-insulating-parts',55:'custom-oem-cnc-machined-plastic-parts-manufacturer',56:'custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer',57:'custom-oem-cnc-turning-manufacturer',58:'custom-oem-high-precision-cnc-milling-manufacturer',59:'custom-rotary-cylindrical-components',60:'full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing',61:'global-manufacturer-of-multi-sided-precision-machined-components',62:'global-oem-precision-machining-solutions',63:'high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem',64:'high-volume-cnc-turning-for-complex-internal-external-features',65:'oem-precision-cnc-machined-casting-housing-structural-enclosures',66:'oem-precision-cnc-machined-casting-housings',67:'precision-cnc-machined-castings-custom-oem-housings',68:'precision-cnc-machined-castings-manufacturer',69:'precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances',70:'precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier',71:'precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier',72:'precision-machining-for-functional-plastic-blocks-structural-components',73:'precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures',74:'precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier',75:'precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier',76:'small-batch-cnc-machining-manufacturer-complex-aluminum-housings',77:'small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv',78:'ultra-high-precision-machining-services'
};
const group=(key:string,label:string,ids:number[])=>({key,label,slugs:ids.map(id=>partIds[id])});
export const partBrowseGroups=[
 group('housings','Housings & covers',[45,49,50,60,65,66,67,68,71,73,76]),
 group('shafts','Shafts, fittings & pins',[51,56,57,59,62,64,70,74,75]),
 group('blocks','Blocks, brackets & circular forms',[52,53,58,60,61,69,72]),
 group('impellers','Impellers',[63,78]),
 group('plastics','Plastic parts',[54,55,69,72]),
 group('automotive','Automotive prototypes',[44,45,46,47,48,49,50]),
 group('batches','Plan a batch',[71,77]),
];
const sampleGrades=new Set([45,46,47,48,50].map(id=>partIds[id]));
export function partMaterialStatus(product:Part):{label:string;value:string} {
 const material=productSummary(product).material;
 const value=material.replace(/^Material options(?:\s+include|:)\s*/i,'');
 if(/options|alternative/i.test(material))return {label:'Material options',value};
 if(sampleGrades.has(product.slug))return {label:'Listed material',value};
 return {label:'Material to confirm',value};
}
// Include explicitly recorded alternatives in discovery. The status travels with the result.
const materialPatterns:Record<string,RegExp>={
 'Aluminum-CNC-Parts':/aluminum/i,
 'Stainless-Steel-CNC-Parts':/stainless/i,
 'Copper-Brass-CNC-Parts':/copper|brass/i,
 'Plastic-Machined-Parts':/plastic|polymer|composite|PEEK|PTFE|polyimide|nylon|acetal|HDPE|UHMW|acrylic|polycarbonate/i,
};
export function matchesBrowseFilter(product:Part,key:string):boolean {
 const pattern=materialPatterns[key];
 return pattern?pattern.test(productSummary(product).material):matchesPartCategory(product,key);
}
export const partUseContexts:Record<string,{title:string;body:string;href:string}[]> = {
 [partIds[58]]:[{title:"Scientific & analytical instruments",body:"Use the equipment drawing to locate mounting faces and internal passages. Include the hole positions and alignment datums needed for optical or mechanical assembly.",href:"/resources/technical-guides/critical-features-cnc-drawing/"}],
 [partIds[62]]:[{title:'Hydraulic & rescue equipment',body:'Show the ports and sealing faces on the assembly drawing, with details of the mating components. Include the fluid conditions and any pressure or leak-test requirements.',href:'/machined-parts/gallery/'+partIds[56]+'/'}],
 [partIds[61]]:[{title:'Robotics & automation',body:'Show the mounting and sensor-bracket interfaces in the housing model. Include the clearance needed for assembly and the dimensions used for acceptance.',href:'/capabilities/5-axis-cnc-machining/'}],
 [partIds[78]]:[{title:'Industrial fans & impellers',body:'Define blade profiles and hub geometry in the model, with workholding surfaces and material condition on the drawing. Specify any balance, speed or efficiency tests separately.',href:'/capabilities/5-axis-cnc-machining/'}],
 [partIds[76]]:[{title:'Electronic & audio equipment',body:'Locate pockets and mounting holes from the assembly datums. Mark lid and gasket interfaces separately from visible faces, and include any environmental test requirements.',href:'/resources/technical-guides/material-and-finish-checklist/#finish-and-acceptance'}],
 [partIds[53]]:[{title:'UAVs, 3D printers & motion systems',body:'Send the equipment drawing showing the structure and its mounting interfaces. Include operating loads and any appearance requirements.',href:'/resources/technical-guides/critical-features-cnc-drawing/'}],
};

