import {primaryServices} from '../../data/services';
import {companyFacts} from '../../data/company';
import {engineeringCases} from '../../data/cases';
import {photo} from '../../data/evidence';
export const root='/homepage-directions-20261012/';
export const asset=(name:string)=>root+'assets/'+name;
export const facts=companyFacts;
const descriptions=['Pockets, profiles and bores in custom components.','Shafts, threads and concentric features.','Angled features and complex curved surfaces.','Machined polymer parts for your drawing and use conditions.','Functional surfaces and interfaces on cast blanks.'];
export const processes=primaryServices.map((p,i)=>({...p,description:descriptions[i],href:'/capabilities/'+p.slug+'/'}));
export const materials=[['Aluminum','aluminum-cnc-parts'],['Stainless steel','stainless-steel-cnc-parts'],['Brass & copper','copper-brass-cnc-parts'],['Engineering plastics','plastic-machined-parts']].map(([name,slug])=>({name,href:'/capabilities/'+slug+'/'}));
export const parts=[
 {name:'Machined impeller',slug:'ultra-high-precision-machining-services',image:'/media/catalog-02-cutout-v1.webp',detail:'Curved surfaces & multi-axis machining'},
 {name:'Machined casting housing',slug:'oem-precision-cnc-machined-casting-housing-structural-enclosures',image:'/media/catalog-22-cutout-v1.webp',detail:'Machined faces & assembly interfaces'},
 {name:'Turned locking pin',slug:'precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier',image:'/media/catalog-32-cutout-v1.webp',detail:'Turned features & locking components'},
 {name:'Machined plastic parts',slug:'custom-oem-cnc-machined-plastic-parts-manufacturer',image:'/media/catalog-21-cutout-v1.webp',detail:'Polymer components & structural supports'},
];
export const studies=['five-axis-machining-multi-face-parts','29-inch-display-housing-cnc-machining','turning-then-milling-cylindrical-parts'].map(slug=>{const c=engineeringCases.find(c=>c.slug===slug)!;return {...c,image:photo(c.hero)};});
export const steps=[['Share the drawing','Include the revision, material, quantity and critical features.'],['Agree the quotation','Confirm production timing, finishing and the inspection records required.'],['Machine, inspect & ship','Parts are checked against the agreed order. Confirm packing and shipping terms for your destination.']];
export const navigation=[
 {name:'Capabilities',links:[...processes.map(p=>[p.name,p.href]),...materials.map(m=>[m.name,m.href]),['Prototype & small batch','/capabilities/#production-stages'],['Starting with a sample','/capabilities/starting-with-a-sample/'],['All capabilities','/capabilities/']]},
 {name:'Custom parts',links:[['Browse custom parts','/machined-parts/'],['Machining examples','/machined-parts/machining-examples/']]},
 {name:'Factory & quality',links:[['Our factory','/factory/'],['Quality control','/factory/quality/']]},
 {name:'Resources',links:[['All resources','/resources/'],['How we work','/about/how-we-work/'],['RFQ checklist','/resources/ordering/rfq-checklist/'],['Materials & finishes','/resources/technical-guides/material-and-finish-checklist/']]},
 {name:'About LZZ',links:[['Company profile','/about/'],['Company news','/about/company-news/'],['Contact us','/about/contact/']]},
];
export {photo};
