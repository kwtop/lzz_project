import {primaryServices} from './services';
import {knowledgeLinks} from './knowledgeCenter';
import redirects from './siteRouteRedirects.json';
import {resourceParentForPath} from './resourceLibrary';

export type SectionPage={title:string;href:string;description:string;group?:string};
export type SiteSection={key:string;title:string;href:string;description:string;image:string;children:SectionPage[]};
const machining=primaryServices.map(service=>({title:service.name,href:'/capabilities/'+service.slug+'/',description:'Review part geometry, machining requirements and inspection.',group:'Machining'}));
const materialPages=[
 {title:'Aluminum machining',href:'/capabilities/aluminum-cnc-parts/',description:'Material grades, finishing and dimensional requirements.',group:'Materials'},
 {title:'Stainless steel machining',href:'/capabilities/stainless-steel-cnc-parts/',description:'Turned and milled stainless steel components.',group:'Materials'},
 {title:'Copper & brass machining',href:'/capabilities/copper-brass-cnc-parts/',description:'Specify alloy, part form and finishing requirements.',group:'Materials'},
];
const planning=[
 {title:'Prototype machining',href:'/capabilities/prototype-machining/',description:'Prepare a drawing and acceptance requirements for the first part.',group:'Order planning'},
 {title:'Small production runs',href:'/capabilities/low-volume-production/',description:'Plan quantities, repeat requirements and inspection records.',group:'Order planning'},
 {title:'Starting with a sample',href:'/capabilities/starting-with-a-sample/',description:'Agree measurement, drawing reconstruction and approval.',group:'Order planning'},
];
export const siteSections:SiteSection[]=[
 {key:'capabilities',title:'Capabilities',href:'/capabilities/',description:'Compare machining processes, materials and order planning.',image:'milling-enclosure-operation',children:[...machining,...materialPages,...planning]},
 {key:'parts',title:'Machined parts',href:'/machined-parts/',description:'Find a similar part geometry, review its manufacturing requirements and prepare a drawing-based inquiry.',image:'five-axis-parts',children:[
  {title:'Parts gallery',href:'/machined-parts/gallery/',description:'Browse the 35 machined part examples by form, material and process. Review geometry, manufacturing options and drawing requirements.'},
  {title:'Machining examples',href:'/machined-parts/machining-examples/',description:'Follow real workshop setups and part collections, including milling, turning and multi-face machining.'},
 ]},
 {key:'factory',title:'Factory & quality',href:'/factory/',description:'Review the Hangzhou workshop, machining setups and the inspection records to specify before placing an order.',image:'workshop-wide',children:[]},
 {key:'resources',title:'Resources',href:'/resources/',description:'Choose RFQ and ordering guidance, technical guides or frequently asked questions.',image:'milling-enclosure-operation',children:knowledgeLinks},
 {key:'about',title:'About LZZ',href:'/about/',description:'LZZ Precision is a custom CNC machining company in Hangzhou. Review the company, working process and supplier information, or get in touch about your part.',image:'workshop-wide',children:[
  {title:'Company profile',href:'/about/company-profile/',description:'Company background, engineering experience, workshop photographs, history and supplier qualification documents.'},
  {title:'How we work',href:'/about/how-we-work/',description:'Drawing review, quotation, sample approval, production and delivery responsibilities.'},
  {title:'Company news',href:'/about/company-news/',description:'Dated workshop visits and company activities from the source archive.'},
  {title:'Contact us',href:'/about/contact/',description:'Email, WhatsApp, address and the information needed for a machining inquiry.'},
 ]},
];
export const canonicalPath=(value:string):string=>{
 const match=value.match(/^([^?#]*)(.*)$/)!;
 return (redirects[match[1] as keyof typeof redirects]||match[1])+match[2];
};
export const sectionForPath=(value:string)=>siteSections.find(section=>canonicalPath(value).startsWith(section.href));
export const breadcrumbTrail=(value:string,title:string)=>{
 const current=canonicalPath(value),section=sectionForPath(current);
 if(!section)return [];
 const trail=[{name:'Home',href:'/'},{name:section.title,href:section.href}];
 if(current===section.href)return trail;
 // A guide belongs to the category represented by its canonical URL prefix.
 const page=(section.key==='resources'?resourceParentForPath(current):undefined)||section.children.filter(item=>current.startsWith(item.href)).sort((a,b)=>b.href.length-a.href.length)[0];
 if(page&&current!==page.href)trail.push({name:page.title,href:page.href});
 trail.push({name:page&&current===page.href?page.title:title,href:current});
 return trail;
};
