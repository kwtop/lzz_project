import {photo} from './evidence';

// Primary business navigation follows the five source-material families.
// Keep material/process filter groups independent so combined filters remain valid.
export const primaryServices=[
 {name:'CNC milling',slug:'cnc-milling-service',key:'CNC-Milling-Service'},
 {name:'CNC turning',slug:'cnc-turning-service',key:'CNC-Turning-Service'},
 {name:'5-axis machining',slug:'5-axis-cnc-machining',key:'5-Axis-CNC-Machining'},
 {name:'Plastic machining',slug:'plastic-machined-parts',key:'Plastic-Machined-Parts'},
 {name:'Machining of Castings',slug:'casting-machining',key:'Casting-Machining'},
];

export const services=[
 {name:'CNC milling',slug:'cnc-milling-service',image:photo('two-stage-first').src,imageAlt:photo('two-stage-first').alt,imageCaption:photo('two-stage-first').caption,description:'Machining pockets, profiles and bores in custom housings and other components.'},
 {name:'CNC turning',slug:'cnc-turning-service',image:photo('turning-operation').src,imageAlt:photo('turning-operation').alt,imageCaption:photo('turning-operation').caption,description:'Turning shafts and fittings, with internal bores, threads and concentric features.'},
 {name:'5-axis machining',slug:'5-axis-cnc-machining',image:photo('five-axis-operation').src,imageAlt:photo('five-axis-operation').alt,imageCaption:photo('five-axis-operation').caption,description:'Machining angled features and curved surfaces on complex components.'}
];
