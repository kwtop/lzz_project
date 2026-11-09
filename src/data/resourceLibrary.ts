import routes from './resourceRoutes.json';
import {productTechnicalGuides} from './productTechnicalGuides';
import {resourceSearchCopy} from './resourceSearchReview';
export const orderingGuideHref=routes.groups.ordering;
export const machiningGuidesHref=routes.groups.machining;
export type LibraryGuide={slug:string;title:string;href:string;summary:string;group:'ordering'|'machining'};
const baseResourceLibrary:LibraryGuide[]=[
 {slug:'cnc-machining-cost-factors',title:'What affects CNC machining cost?',href:routes.guides['cnc-machining-cost-factors'],summary:"How setup, quantity and geometry affect the work included in a quote.",group:'ordering'},
 {slug:'rfq-checklist',title:'RFQ checklist',href:routes.guides['rfq-checklist'],summary:"The files and specifications needed for a quote, with a brief you can copy.",group:'ordering'},
 {slug:'compare-cnc-machining-quotations',title:'Compare quotations',href:routes.guides['compare-cnc-machining-quotations'],summary:"How to compare scope, exclusions and delivery terms across suppliers.",group:'ordering'},
 {slug:'machined-prototype-approval-checklist',title:'Approve a machined prototype',href:routes.guides['machined-prototype-approval-checklist'],summary:"Which fit, finish and functional checks to record before approving a sample.",group:'ordering'},
 {slug:'prototype-vs-small-batch-cnc',title:'Plan repeat production',href:routes.guides['prototype-vs-small-batch-cnc'],summary:"What needs to carry forward from sample approval into a repeat batch.",group:'ordering'},
 {slug:'custom-cnc-parts-shipping-checklist',title:'Packing & international shipping',href:routes.guides['custom-cnc-parts-shipping-checklist'],summary:"Protection, delivery responsibilities and documents to settle before shipment.",group:'ordering'},
 {slug:'critical-features-cnc-drawing',title:'Drawing requirements & critical features',href:routes.guides['critical-features-cnc-drawing'],summary:"How to specify datums, fits and roughness that can be checked during inspection.",group:'machining'},
 {slug:'6061-vs-7075-cnc-aluminum',title:'6061 vs 7075 aluminum',href:routes.guides['6061-vs-7075-cnc-aluminum'],summary:"When strength, stiffness, temper or finish can determine the aluminum grade.",group:'machining'},
 {slug:'cnc-process-selection',title:'Choose a machining process',href:routes.guides['cnc-process-selection'],summary:"When a part needs turning, milling, several 3-axis setups or 5-axis access.",group:'machining'},
 {slug:'material-and-finish-checklist',title:'Specify material & finish',href:routes.guides['material-and-finish-checklist'],summary:"How treatment affects bores, threads and other working surfaces at final inspection.",group:'machining'},
 ...productTechnicalGuides.map(guide=>({slug:guide.slug,title:guide.title,href:'/resources/technical-guides/'+guide.slug+'/',summary:guide.summary,group:'machining' as const})),
];
export const resourceLibrary:LibraryGuide[]=baseResourceLibrary.map(guide=>({...guide,...(resourceSearchCopy[guide.slug]?{title:resourceSearchCopy[guide.slug].libraryTitle,summary:resourceSearchCopy[guide.slug].summary}:{})}));
export const libraryGuide=(slug:string)=>{const guide=resourceLibrary.find(item=>item.slug===slug);if(!guide)throw new Error('Unknown resource guide: '+slug);return guide;};
export const resourceGroups=[
 {key:'ordering' as const,title:'RFQ & ordering',href:orderingGuideHref,description:'From the first quote to an approved part and delivery.'},
 {key:'machining' as const,title:'Technical guides',href:machiningGuidesHref,description:'Process choices and the technical requirements on your drawing.'},
];
export const resourceParentForPath=(value:string)=>{const path=value.split(/[?#]/)[0],guide=resourceLibrary.find(item=>item.href===path);return guide?resourceGroups.find(group=>group.key===guide.group):undefined;};
export const orderingStages=[
 {id:'understand-machining-cost',aliases:[],title:'Understand the machining cost',text:'See how geometry, setups, quantity and acceptance requirements shape the work to quote.',slugs:['cnc-machining-cost-factors']},
 {id:'prepare-rfq',aliases:['drawing-start-title','drawing-download-title'],title:'Gather the quote requirements',text:'A detailed price needs the model and controlled drawing, material, finish, quantity and destination, with open decisions clearly marked.',slugs:['rfq-checklist']},
 {id:'compare-quotes',aliases:['ordering-guides-title'],title:'Compare the quoted work',text:'Use the same revision and acceptance requirements. Check what the price includes and resolve exceptions before placing the order.',slugs:['compare-cnc-machining-quotations']},
 {id:'samples-and-production',aliases:['production-planning-title'],title:'Approve the sample and batch',text:'Sample acceptance leads to a batch release with its own revision, quantity, inspection records and schedule.',slugs:['machined-prototype-approval-checklist','prototype-vs-small-batch-cnc']},
 {id:'production-delivery',aliases:['shipping-planning-title'],title:'Plan packing and delivery',text:'Protection and labels need to match the destination, shipping basis and receiving requirements. Set the responsibilities and documents, and allow time for transit.',slugs:['custom-cnc-parts-shipping-checklist']},
];
