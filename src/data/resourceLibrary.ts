import routes from './resourceRoutes.json';
export const orderingGuideHref=routes.groups.ordering;
export const machiningGuidesHref=routes.groups.machining;
export type LibraryGuide={slug:string;title:string;href:string;summary:string;group:'ordering'|'machining'};
export const resourceLibrary:LibraryGuide[]=[
 {slug:'cnc-machining-cost-factors',title:'What affects CNC machining cost?',href:routes.guides['cnc-machining-cost-factors'],summary:'Understand setup, quantity, geometry and the work behind a drawing-based quote.',group:'ordering'},
 {slug:'rfq-checklist',title:'RFQ checklist',href:routes.guides['rfq-checklist'],summary:'Drawing files, specifications and a ready-to-copy inquiry brief.',group:'ordering'},
 {slug:'compare-cnc-machining-quotations',title:'Compare quotations',href:routes.guides['compare-cnc-machining-quotations'],summary:'Check scope, exclusions and delivery terms on the same basis.',group:'ordering'},
 {slug:'machined-prototype-approval-checklist',title:'Approve a machined prototype',href:routes.guides['machined-prototype-approval-checklist'],summary:'Record fit, finish, function and the approval decision.',group:'ordering'},
 {slug:'prototype-vs-small-batch-cnc',title:'Plan repeat production',href:routes.guides['prototype-vs-small-batch-cnc'],summary:'Carry the approved revision and inspection plan into a batch.',group:'ordering'},
 {slug:'custom-cnc-parts-shipping-checklist',title:'Packing & international shipping',href:routes.guides['custom-cnc-parts-shipping-checklist'],summary:'Agree protection, delivery responsibilities and shipment documents.',group:'ordering'},
 {slug:'critical-features-cnc-drawing',title:'Drawing requirements & critical features',href:routes.guides['critical-features-cnc-drawing'],summary:'Connect datums, fits, roughness and inspection through practical part examples.',group:'machining'},
 {slug:'6061-vs-7075-cnc-aluminum',title:'6061 vs 7075 aluminum',href:routes.guides['6061-vs-7075-cnc-aluminum'],summary:'Compare strength, stiffness, temper and finish around the part’s function.',group:'machining'},
 {slug:'cnc-process-selection',title:'Choose a machining process',href:routes.guides['cnc-process-selection'],summary:'Compare turning, milling, 3-axis setups and 5-axis access through real part studies.',group:'machining'},
 {slug:'material-and-finish-checklist',title:'Specify material & finish',href:routes.guides['material-and-finish-checklist'],summary:'Follow bores, threads and working faces through treatment and final acceptance.',group:'machining'},
];
export const libraryGuide=(slug:string)=>{const guide=resourceLibrary.find(item=>item.slug===slug);if(!guide)throw new Error('Unknown resource guide: '+slug);return guide;};
export const resourceGroups=[
 {key:'ordering' as const,title:'RFQ & ordering',href:orderingGuideHref,description:'From the first quote to an approved part and delivery.'},
 {key:'machining' as const,title:'Technical guides',href:machiningGuidesHref,description:'Process choices and the technical requirements on your drawing.'},
];
export const resourceParentForPath=(value:string)=>{const path=value.split(/[?#]/)[0],guide=resourceLibrary.find(item=>item.href===path);return guide?resourceGroups.find(group=>group.key===guide.group):undefined;};
export const orderingStages=[
 {id:'understand-machining-cost',aliases:[],title:'Understand the machining cost',text:'See how geometry, setups, quantity and acceptance requirements shape the work to quote.',slugs:['cnc-machining-cost-factors']},
 {id:'prepare-rfq',aliases:['drawing-start-title','drawing-download-title'],title:'Prepare the quote request',text:'Gather the model and controlled drawing, material, finish, quantity and destination. Mark open decisions before requesting a price.',slugs:['rfq-checklist']},
 {id:'compare-quotes',aliases:['ordering-guides-title'],title:'Compare the quoted work',text:'Use the same revision and acceptance requirements. Check what the price includes and resolve exceptions before placing the order.',slugs:['compare-cnc-machining-quotations']},
 {id:'samples-and-production',aliases:['production-planning-title'],title:'Approve the sample and batch',text:'Record sample acceptance, then agree the released revision, batch quantity, inspection records and schedule.',slugs:['machined-prototype-approval-checklist','prototype-vs-small-batch-cnc']},
 {id:'production-delivery',aliases:['shipping-planning-title'],title:'Plan packing and delivery',text:'Specify protection and labels. Agree the destination, shipping basis, responsibilities and documents; allow time for transit.',slugs:['custom-cnc-parts-shipping-checklist']},
];
