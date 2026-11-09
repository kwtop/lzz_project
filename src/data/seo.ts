import resourceRoutes from './resourceRoutes.json';
import {resourceSearchCopy} from './resourceSearchReview';
export const siteOrigin='https://www.lzz-cnc.com';
// Search titles follow the current canonical page hierarchy.
export const pageTitles:Record<string,string>={
 '/capabilities/cnc-turning-service/':'CNC Turning Services for Custom Parts',
 '/':'Precision CNC Machining for Complex Custom Parts',
 '/machined-parts/gallery/custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier/':'CNC machined intake-system components',
 '/machined-parts/gallery/custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier/':'Injector & fuel-rail intake manifolds: billet aluminum',
 '/machined-parts/gallery/precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures/':'Open CNC machined aluminum enclosures',
 '/machined-parts/gallery/small-batch-cnc-machining-manufacturer-complex-aluminum-housings/':'Lid & gasket aluminum housings: sealing interfaces',
 '/about/':'About LZZ: CNC machining in Hangzhou',
 '/factory/quality/':'CNC part inspection & quality control',
 '/machined-parts/machining-examples/custom-metal-parts-batch-examples/':'Metal part batches: shafts, fittings & housings',
 '/machined-parts/machining-examples/custom-plastic-parts-ptfe-pom-pe-acrylic/':'Plastic parts: PTFE, POM, PE & acrylic',
 '/machined-parts/machining-examples/five-axis-machining-multi-face-parts/':'5-axis machining for multi-face parts',
 '/machined-parts/machining-examples/milling-prismatic-components/':'CNC milling for prismatic parts',
 '/about/company-news/australian-customer-workshop-visit-january-2025/':'Australian customer workshop visit',
 '/resources/ordering/':'CNC Machining RFQ, Quotation and Ordering Guides',
 '/resources/technical-guides/':'CNC Machining Technical Guides: Parts, Fits and Materials',
 ...Object.fromEntries(Object.entries(resourceSearchCopy).map(([slug,copy])=>[resourceRoutes.guides[slug as keyof typeof resourceRoutes.guides],copy.seoTitle])),
};
export const pageDescriptions:Record<string,string>={
 '/':'Direct CNC manufacturer in Hangzhou for precision aluminum housings and complex parts. 3-, 4- and 5-axis machining, surface finishing and dimensional inspection. From 1 piece.',
 '/about/':'Meet LZZ, an ISO 9001-certified CNC machining company in Hangzhou. See the workshop, company history and documents for supplier review.',
 '/factory/':"Visit LZZ's 1,500 m² CNC machining workshop in Hangzhou. See real machining and CMM photographs, inspection requirements and the drawing-to-delivery workflow.",
 '/machined-parts/machining-examples/':'Explore LZZ workshop studies and plastic and metal part collections, with original photographs, short videos and drawing requirements for similar parts.',
 '/machined-parts/':'Browse LZZ machined parts by material or process. See housings, shafts, machined castings and plastic components made to customer drawings.',
 '/capabilities/':'Compare CNC milling, turning, 5-axis machining, plastic machining and casting machining. Review material options and prototype or small-batch orders.',
 '/resources/':'Choose RFQ and ordering guidance, technical guides or frequently asked questions for your custom CNC parts.',
 '/resources/faq/':'Answers to CNC machining questions about minimum orders, production time, drawings, tolerances, inspection documents and international shipping from LZZ.',
 '/quote/':'Request custom CNC parts with your name, destination country and preferred phone or email contact. Choose machining processes and add drawings if available.',
 '/about/contact/':'Contact LZZ Precision in Hangzhou about CNC parts, supplier documents or a workshop visit. We reply within 12 hours by email or WhatsApp.',
 '/privacy/':'How LZZ handles inquiries, drawing files and browser visit history. Review the privacy details, turn off analytics or clear records linked to this browser.',
 '/404.html':'The requested LZZ page could not be found. Explore machining capabilities or browse original part examples.'
};
