import {engineeringCases} from './cases';
import {partPlan,type PartRecord} from './productsEditorial';

type ReadingRoute={study:string;capability:string;label:string;reason:string};
// Related reading describes a shared review topic, not the production history
// of the catalogue part. Material and process suitability remain drawing-specific.
const routes:Record<string,ReadingRoute>={
 milled:{study:'two-stage-cnc-milling',capability:'cnc-milling-service',label:'CNC milling',reason:'See how datum relationships are retained when a component is repositioned.'},
 block:{study:'milling-prismatic-components',capability:'cnc-milling-service',label:'CNC milling',reason:'Review locating faces, bores and mounting features on block-shaped components.'},
 impeller:{study:'five-axis-machining-multi-face-parts',capability:'5-axis-cnc-machining',label:'5-axis machining',reason:'Review tool access and common datums across several faces. Blade-specific inspection is agreed separately.'},
 'multi-face':{study:'five-axis-machining-multi-face-parts',capability:'5-axis-cnc-machining',label:'5-axis machining',reason:'Explore access to different faces and the relationships between their features.'},
 turned:{study:'turning-then-milling-cylindrical-parts',capability:'cnc-turning-service',label:'CNC turning',reason:'Follow the relationship between turned diameters and secondary milled features.'},
 connection:{study:'turning-then-milling-cylindrical-parts',capability:'cnc-turning-service',label:'CNC turning',reason:'Review a datum axis shared by bores, diameters and off-axis features.'},
 pin:{study:'turning-then-milling-cylindrical-parts',capability:'cnc-turning-service',label:'CNC turning',reason:'Review how additional features are located from a turned axis. Assembly and locking tests are separate requirements.'},
 finish:{study:'two-stage-cnc-milling',capability:'cnc-milling-service',label:'CNC milling',reason:'Review setup changes and functional faces before agreeing the final surface treatment.'},
 assembly:{study:'two-stage-cnc-milling',capability:'cnc-milling-service',label:'CNC milling',reason:'Explore locating and machining individual components across setups. Assembly and performance checks require their own scope.'},
 cover:{study:'milling-a-pocketed-enclosure-form',capability:'cnc-milling-service',label:'CNC milling',reason:'Review recessed features, mounting faces and tool access on a related component form.'},
 casting:{study:'two-stage-cnc-milling',capability:'casting-machining',label:'Machining of castings',reason:'Review datum transfer between milling setups. Casting allowance and blank condition need an additional review.'},
 polymer:{study:'custom-plastic-parts-ptfe-pom-pe-acrylic',capability:'plastic-machined-parts',label:'Plastic machining',reason:'Compare plastic part forms and the material conditions needed for machining and measurement.'},
 batch:{study:'custom-metal-parts-batch-examples',capability:'low-volume-production',label:'Low-volume production',reason:'Browse grouped metal part references and review requirements by part number.'},
 enclosure:{study:'milling-a-pocketed-enclosure-form',capability:'cnc-milling-service',label:'CNC milling',reason:'Review pockets, wall sections and mounting interfaces on a related enclosure form.'},
};
export function partReadingLinks(product:PartRecord){
 const route=routes[partPlan(product.slug).kind];
 if(!route)throw new Error('Missing related reading for '+product.slug);
 const study=engineeringCases.find(item=>item.slug===route.study);
 if(!study)throw new Error('Missing machining study '+route.study);
 return {...route,studyTitle:study.title};
}
