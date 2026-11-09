// Explicit service scope from the existing catalog summaries and RFQ guidance.
// Review inputs are not universal machine limits or part specifications.
export type CapabilityOverview = {
 heading:string;
 geometry:string;
 workholding:string;
 materialFinish:string;
 inspection:string;
 planning?:{title:string;text:string};
};
export const capabilityOverview:Record<string,CapabilityOverview> = {
 'cnc-milling-service':{
  heading:'Milled pockets, faces and contours',
  geometry:"Pockets, slots, faces and contours; 3-, 4- or 5-axis setups selected from the drawing.",
  workholding:"Part and stock dimensions, clamping faces and tool clearance. Usable size depends on the fixture.",
  materialFinish:"Aluminum, stainless steel, steel, copper, brass, titanium and engineering plastics. Finish depends on the substrate.",
  inspection:'The drawing datums connect face, bore and hole-position measurements. The inspection plan identifies the features to record and the method used to check them.'
 },
 'cnc-turning-service':{
  heading:'Turned diameters and off-axis features',
  geometry:"Shafts, sleeves, bushings and fittings. Live tooling adds flats and cross-holes; NPT, BSPT and metric threads are available.",
  workholding:"Stock size, overall dimensions, datum axis and access to internal grooves. Send the dimensions so we can assess turning reach and workholding.",
  materialFinish:"Grade, stock condition and finish; identify sealing surfaces and edges to deburr.",
  inspection:'Diameter and axial-length limits come from the mating assembly. The inspection plan ties those limits to the measurement setup and recorded results.'
 },
 '5-axis-cnc-machining':{
  heading:'Angled features and continuous contours',
  geometry:"Angled faces, deep cavities and continuous contours. Indexed or simultaneous machining is selected from the model.",
  workholding:"Tool reach, fixture clearance and protected surfaces in each orientation.",
  materialFinish:"Aluminum, titanium, Inconel and hardened stainless steel; grade, condition and finish to be specified.",
  inspection:'We measure profiles and positions from the drawing datums. The inspection plan names the features, any surfaces compared with the model and the results to record.'
 },
 'casting-machining':{
  heading:'Finish machining for cast blanks',
  geometry:"Milling, boring, drilling and tapping of cast housings and pump bodies. If drawings are incomplete, we can reconstruct the geometry from a sample.",
  workholding:"Casting and finished-part drawings, locating datums and machining allowance. Agree blank supply and acceptance.",
  materialFinish:"Casting alloy and condition, as-cast surfaces, machined faces and final finish.",
  inspection:'Incoming-blank checks establish the starting condition and material documentation. Finished-interface checks use the drawing datums, with methods and records set before production.'
 },
 'aluminum-cnc-parts':{
  heading:'Aluminum housings and automotive prototypes',
  geometry:"Housings and automotive prototypes with thin walls, deep pockets and multiple interfaces.",
  workholding:"Thin sections need a review of stock dimensions, fixture support and stress relief.",
  materialFinish:"6061/6061-T6 and 7075 billet; 3003 for intercoolers. Blasting, brushing, polishing, anodizing, conversion coating and powder coating, where suitable.",
  inspection:'Flatness and bore relationships control assembly fit. Thin sections and treated surfaces also need a specified measurement condition, finish acceptance and recorded results.'
 },
 'stainless-steel-cnc-parts':{
  heading:'Stainless steel shafts, fittings and hardware',
  geometry:"Shafts, fittings and locking hardware; turned diameters, grooves and threads, with milled flats, cross-holes or engraving.",
  workholding:"Stock dimensions, datum axis, working diameters and shoulders.",
  materialFinish:"303, 304, 316L and 17-4PH options. Fine turning, polishing, passivation or electropolishing; confirm grade and condition.",
  inspection:'Assembly datums locate runout, diameter and thread checks. Identify surfaces where burrs or handling marks are unacceptable; the production agreement sets the measurement method and records.'
 },
 'copper-brass-cnc-parts':{
  heading:'Conductive parts and threaded fittings',
  geometry:"Conductive parts, manifolds and threaded fittings made by turning, milling, 5-axis or casting finish machining.",
  workholding:"Stock dimensions, contact areas, fastening details and internal-passage access.",
  materialFinish:"C36000 brass and tellurium copper; polishing or plating with protected contact surfaces.",
  inspection:'Plating can affect threads and fitted contact surfaces. Thread gauges, burr limits and contact or sealing checks therefore need to match the final dimensions, with methods and records set for the order.'
 },
 'plastic-machined-parts':{
  heading:'Plastic insulators, wear parts and housings',
  geometry:"Milled and turned insulators, guides, rollers and housings.",
  workholding:"Plastic machining needs low-stress clamping, thin-wall support and temperature control.",
  materialFinish:"Exact polymer grade, fillers and stock condition; edge quality and cleaning requirements.",
  inspection:'Hole position, flatness and mating dimensions depend on the measurement state of the polymer. The order sets conditioning, temperature, support, measurement methods and required records.'
 },
 'prototype-machining':{
  heading:'Prototypes for fit and design checks',
  geometry:"Fit, assembly and design evaluation from a STEP or IGES model.",
  workholding:"Current revision, fixed interfaces and geometry still open to change.",
  materialFinish:"Production material and finish, or approved alternatives for the evaluation.",
  inspection:'A prototype needs an evaluation purpose and acceptance limits for the critical interfaces. The measurements and records should answer that question. Pressure or functional tests need an agreed method before machining.'
 },
 'low-volume-production':{
  heading:'Pilot builds and repeat batches',
  geometry:"Pilot and repeat batches of turned, milled or finish-machined cast parts.",
  workholding:"Approved drawing revisions, components that must fit together and fixture setups for repeat orders.",
  materialFinish:"Grade, condition, finish and cosmetic criteria for each part number.",
  inspection:'First-article approval and in-process checks serve different stages of a batch. The quotation request should cover first-article reporting, later sampling and traceability, with measurement methods and records settled before production.',
  planning:{title:'Quantity and production time',text:'Orders start at 1 piece. Send quantities by part number and the release schedule, with finish requirements for pricing. Production takes 7 to 14 business days after drawing and order confirmation, including finishing; transit is additional.'}
 },
};
