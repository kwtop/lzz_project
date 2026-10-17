import {capabilityPage} from './capabilityDesign';
import type {CheckRow} from './serviceReading';

export const orderConditions='Orders start at 1 piece. Production takes 7–14 business days after drawing and order confirmation, including finishing. Shipping time is additional. Confirm the schedule for your quantity and requirements in the quotation.';
export const materialGuide='/resources/technical-guides/material-and-finish-checklist/';
export const processSlugs=['cnc-milling-service','cnc-turning-service','5-axis-cnc-machining','casting-machining'];
export const materialSlugs=['aluminum-cnc-parts','stainless-steel-cnc-parts','copper-brass-cnc-parts','plastic-machined-parts'];
// Consolidate the former drawing/inspection paragraphs into the matching
// decision row. Unchanged fields continue to come from the original plan.
type AcceptanceEdit=Partial<CheckRow>;
const acceptanceEdits:Record<string,Record<string,AcceptanceEdit>>={
 'cnc-milling-service':{
  'Faces & mounting holes':{drawing:'Assembly datums, mounting faces, hole positions, bore fits and relationships between faces.',inspection:'Agree measurement methods and the dimensions and positions to record against the specified datums.'},
  'Pockets & thin walls':{drawing:'Pocket depths, minimum walls, internal radii, permitted tool access and any allowed radius or geometry changes.'},
  'Finish & protected areas':{drawing:'Finish, masking, cosmetic faces and dimensions that apply before or after treatment.',inspection:'Agree the acceptance stage and required finishing records. Define cleanliness, chemical-contact or ESD tests separately.'},
 },
 'cnc-turning-service':{
  'Diameters & axial lengths':{inspection:'Agree dimensional measurement methods, acceptance limits and recorded results for diameters and axial relationships under the specified measurement conditions.'},
  'Datum axis & runout':{drawing:'Datum references, surfaces sharing an axis, assembly controls and off-axis features located from the turned datum axis.',inspection:'Agree the locating method and the runout or positional results to record.'},
 },
 '5-axis-cnc-machining':{
  'Profiles & contours':{drawing:'Current 3D model revision, datum scheme, surface profile and permitted tool marks.',inspection:'Agree the measurement method, model-comparison surfaces and recorded profile results.'},
  'Features across faces':{inspection:'Agree the locating method and recorded position results for features reached across faces.'},
 },
 'casting-machining':{
  'Incoming blank':{drawing:'Alloy, standard, condition, machining allowance and acceptable blank variation.',inspection:'Agree blank supply, incoming measurement methods, material records and responsibility for rejected blanks.'},
  'Bores & mounting datums':{inspection:'Confirm how the irregular blank and finished part are located for measurement and which finished-interface results are recorded.'},
 },
 'aluminum-cnc-parts':{
  'Walls & datum faces':{drawing:'Alloy, temper, wall thickness, stock dimensions, mounting datums and fixture support.',inspection:'Agree flatness measurement methods and the measurement state for thin sections.'},
  'Bores & sealing interfaces':{inspection:'Agree dimensional checks and required records for the mating interfaces. Specify pressure, leak or vehicle-performance tests separately, with procedures, limits and responsibility.'},
  'Surface treatment':{inspection:'Set finish acceptance in the final specified treatment state, including required material or finishing records.'},
 },
 'stainless-steel-cnc-parts':{
  'Diameters & runout':{inspection:'Agree the locating setup, measurement methods and recorded diameter or runout results.'},
  'Threads & sliding features':{drawing:'Thread designation, engagement, grooves, sealing or sliding surfaces and mating components.',inspection:'Confirm thread gauges, fit checks, burr limits and permitted handling marks.'},
 },
 'copper-brass-cnc-parts':{
  'Threads & sealing faces':{inspection:'Agree thread gauges, dimensional measurement methods and burr checks for contact or sealing surfaces. Pressure tests need separate criteria.'},
  'Contact & plated surfaces':{inspection:'Define the post-plating dimensional records. Conductivity and thermal tests need agreed methods and limits.'},
 },
 'plastic-machined-parts':{
  'Fits, walls & inserts':{drawing:'Press fits, inserts, hole positions, thin walls, deep pockets and assembly loads.',inspection:'Agree dimensional and flatness measurement methods, required records and acceptance limits at the specified temperature, moisture and conditioning state.'},
 },
 'starting-with-a-sample':{
  'First-part review':{inspection:'Agree the measurement or functional-test method, limits, required records and authorized first-part approver before releasing repeat production.'},
 },
};
const acceptanceExtras:Record<string,CheckRow[]>={
 '5-axis-cnc-machining':[{feature:'Traceability & final end use',drawing:'Identify final end use, applicable export requirements and the required material or part traceability.',inspection:'Agree the traceability documents and acceptance records for the model revision.'}],
};
export const scopeQuestions:Record<string,number[]>={
 'cnc-milling-service':[1,2], 'cnc-turning-service':[1,2], '5-axis-cnc-machining':[3],
 'casting-machining':[2,3], 'aluminum-cnc-parts':[1,3], 'stainless-steel-cnc-parts':[0,2],
 'copper-brass-cnc-parts':[0,3], 'plastic-machined-parts':[1,3],
};
export const studyLinks:Record<string,{href:string;title:string;text:string}>={
 'cnc-milling-service':{href:'/machined-parts/machining-examples/two-stage-cnc-milling/',title:'Two setups for one milled part',text:'Follow the same visible part between its first and second locating setups.'},
 'cnc-turning-service':{href:'/machined-parts/machining-examples/turning-then-milling-cylindrical-parts/',title:'Turning followed by milling',text:'Review a secondary milling setup and the datum information needed for a new order.'},
 '5-axis-cnc-machining':{href:'/machined-parts/machining-examples/five-axis-machining-multi-face-parts/',title:'Multi-face machining setup',text:'See the visible rotary setup and access around the workpiece.'},
 'aluminum-cnc-parts':{href:'/machined-parts/machining-examples/milling-a-pocketed-enclosure-form/',title:'Milling a pocketed enclosure',text:'Review tool access and the working interfaces in the enclosure archive.'},
 'copper-brass-cnc-parts':{href:'/machined-parts/machining-examples/custom-metal-parts-batch-examples/',title:'Metal part collection',text:'Compare visible threaded and turned forms; the collection does not certify their alloy.'},
 'plastic-machined-parts':{href:'/machined-parts/machining-examples/custom-plastic-parts-ptfe-pom-pe-acrylic/',title:'Polymer part collection',text:'See additional source photographs and the distinction between solid polymer and coatings.'},
};
export function revisedCapability(slug:string){
 const page=capabilityPage(slug);
 const selected=scopeQuestions[slug]||[];
 const acceptanceChecks=[...page.plan.checks.map(row=>({...row,...acceptanceEdits[slug]?.[row.feature]})),...(acceptanceExtras[slug]||[])];
 return {...page,acceptanceChecks,scopeQuestions:selected.map(index=>page.plan.questions[index]),study:studyLinks[slug]};
}
export type RevisedCapability=ReturnType<typeof revisedCapability>;

export const prototypeApproval=[
 {stage:'Define the question',input:'Current STEP or IGES model and controlled drawing revision; fit, assembly, appearance or defined functional objective.',method:'Mark fixed mating interfaces, mounting datums and clearances. Record open design decisions and approved material or finish alternatives.',result:'An agreed revision and evaluation scope, with the decisions the prototype can support.'},
 {stage:'Make the agreed version',input:'Material, condition, finish, prototype quantity and critical interfaces.',method:'Agree measurements, locating fixtures, test procedures and acceptance limits before machining. Define separate pressure or vehicle tests and who performs them.',result:'The prototype and the dimensional or functional records agreed for the evaluation.'},
 {stage:'Review and approve',input:'Measured interfaces, fit or test results and any remaining issues.',method:'Name the approver. Record acceptance, deviations and changes needed for the next revision.',result:'A reviewable approval or change record. A later prototype or batch requires its own released revision.'},
];
export const batchReleaseFields=[
 ['Part identity','Part number, units and controlled model / drawing revision. Identify the controlling file if requirements conflict.'],
 ['Quantity and release','Quantity for each line item, requested release dates and destination. Keep expected repeat demand or forecast separate from the order.'],
 ['Material and finish','Exact grade, condition, stock form, treatment and approved alternatives for every part number.'],
 ['Appearance and packing','Cosmetic faces, protected fits, edges, part identification and packaging requirements for each item.'],
 ['Shared interfaces','Identify components that must fit together, their datums and the inspection results that control assembly.'],
];
export const sampleReview=[
 ['Retain','Overall dimensions, working faces, mating parts and the features to keep.'],
 ['Resolve','Wear, damage, hidden geometry, unknown material or treatment, and requested changes.'],
 ['Approve','The intended fit, material, finish, model and drawing revision, and acceptance requirements for the new part.'],
];
export const sampleOutputs=[
 {stage:'Sample review',input:'Photographs, overall dimensions, mating parts and available drawings; identify wear, damage and intended changes.',output:'A list of retained features, unknowns and measurements needed. Photographs support the initial review.',approval:'Agree the review and measurement scope before reconstruction.'},
 {stage:'Geometry measurement and reconstruction',input:'The sample and measurements or scanning needed for accessible and hidden geometry, including datum relationships.',output:'The agreed model and 2D / 3D drawing deliverables. Geometry alone does not establish tolerances, material, finish or the intended fit.',approval:'Agree which files and formats are included in the quotation and who may approve them.'},
 {stage:'Approved manufacturing definition',input:'Reviewed geometry, material, condition, finish, tolerances and acceptance requirements.',output:'The released model / drawing revision and a first-part acceptance plan.',approval:'Approve the definition before machining; hold repeat production until the agreed first-part review is complete.'},
];
