/** Presentation only. Procurement content stays in resourceApproved/contentGuides. */
export type ContentImage = {stem?:string;evidence?:string;concept?:'definition'|'material-samples'|'packing-concept'|'order-records';caption:string};
export const contentConcepts:Record<string,ContentImage>={
 definition:{concept:'definition',caption:'Model, drawing and part definition · AI illustration'},
 material:{concept:'material-samples',caption:'Material and surface choices · AI illustration'},
 packing:{concept:'packing-concept',caption:'Separation and surface protection · AI illustration'},
 records:{concept:'order-records',caption:'Drawing, acceptance record and part reference · AI illustration'},
};
export const inspectionImage:ContentImage={evidence:'cmm-room',caption:'Coordinate measuring machine · original LZZ workshop photograph. Agree the checks and records for your order.'};
const original=(evidence:string,caption:string):ContentImage=>({evidence,caption});
export const resourceImagePlan:Record<string,Record<string,ContentImage>>={
 'rfq-checklist':{'drawing-package':contentConcepts.definition,'material-finish':contentConcepts.material,'commercial-brief':{stem:'/media/site-polish-20261016/packing-concept',caption:'Packing concept · AI illustration, not an LZZ shipment record.'}},
 'compare-cnc-machining-quotations':{comparison:contentConcepts.definition,'unresolved-items':inspectionImage,'quote-record':contentConcepts.records},
 'critical-features-cnc-drawing':{'function-first':contentConcepts.definition,'release-files':contentConcepts.material},
 'machined-prototype-approval-checklist':{evaluation:original('milling-enclosure-parts','Machined enclosure forms · original LZZ photograph'),'approval-record':contentConcepts.records,'batch-release':original('aluminum-housings','Machined aluminum housings · original LZZ photograph')},
 'cnc-process-selection':{'process-comparison':contentConcepts.definition,accuracy:inspectionImage},
 'material-and-finish-checklist':{'material-specification':contentConcepts.material,'material-records':contentConcepts.records},
 'prototype-vs-small-batch-cnc':{'section-2':inspectionImage,'revision-release':contentConcepts.records,'section-4':contentConcepts.packing},
 'custom-cnc-parts-shipping-checklist':{'section-2':contentConcepts.packing,'transport-title':original('shipment-2022-prepared-load','Prepared load · November 2022 archive; not evidence of completed delivery.'),'delivery-package':original('shipment-2022-order-packing','Protected parts · November 2022 packing archive; records are agreed per order.')},
};
