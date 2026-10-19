// Generic guide illustrations. Never use these as workshop, customer or inspection evidence.
export const contentVisuals = {
 drawing: {name:'drawing-review-v1',alt:'Machined housing beside outline drawings on an engineering desk',caption:'Drawing and part review'},
 materials: {name:'materials-review-v1',alt:'Metal and polymer stock forms beside a machined housing',caption:'Material forms'},
 inspection: {name:'inspection-review-v1',alt:'A machined block with a micrometer and cylindrical gauge',caption:'Inspection planning'},
 packing: {name:'packing-review-v1',alt:'Machined parts separated by protective foam inside a carton',caption:'Protective packing'},
 batch: {name:'sample-batch-review-v1',alt:'One machined housing in front of a small group of matching parts',caption:'Sample and repeat parts'},
 process: {name:'process-review-v1',alt:'Milling cutter above an aluminum pocket held in a fixture',caption:'Tool access and workholding'},
} as const;
export type ContentVisual = keyof typeof contentVisuals;
