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
  inspection:'Mark the faces, bores and hole positions that need recorded measurements, with the datums used to check them. Confirm the measurement method and required records before production.'
 },
 'cnc-turning-service':{
  heading:'Turned diameters and off-axis features',
  geometry:"Shafts, sleeves, bushings and fittings. Live tooling adds flats and cross-holes; NPT, BSPT and metric threads are available.",
  workholding:"Stock size, overall dimensions, datum axis and access to internal grooves. Maximum size is reviewed per drawing.",
  materialFinish:"Grade, stock condition and finish; identify sealing surfaces and edges to deburr.",
  inspection:'Give acceptance limits for the diameters and axial relationships that control assembly. Confirm the measurement method and required records before production.'
 },
 '5-axis-cnc-machining':{
  heading:'Angled features and continuous contours',
  geometry:"Angled faces, deep cavities and continuous contours. Indexed or simultaneous machining is selected from the model.",
  workholding:"Tool reach, fixture clearance and protected surfaces in each orientation.",
  materialFinish:"Aluminum, titanium, Inconel and hardened stainless steel; grade, condition and finish to be specified.",
  inspection:'Define profile and position requirements against usable datums. Identify the features to measure or compare with the model, and confirm the method and required records before production.'
 },
 'casting-machining':{
  heading:'Finish machining for cast blanks',
  geometry:"Milling, boring, drilling and tapping of cast housings and pump bodies. If drawings are incomplete, we can reconstruct the geometry from a sample.",
  workholding:"Casting and finished-part drawings, locating datums and machining allowance. Agree blank supply and acceptance.",
  materialFinish:"Casting alloy and condition, as-cast surfaces, machined faces and final finish.",
  inspection:'Confirm incoming-blank acceptance and material documentation. Define dimensional checks on the finished interfaces, with the measurement method and records agreed before production.'
 },
 'aluminum-cnc-parts':{
  heading:'Aluminum housings and automotive prototypes',
  geometry:"Housings and automotive prototypes with thin walls, deep pockets and multiple interfaces.",
  workholding:"Stock dimensions, fixture support and stress relief for thin sections.",
  materialFinish:"6061/6061-T6 and 7075 billet; 3003 for intercoolers. Blasting, brushing, polishing, anodizing, conversion coating and powder coating, where suitable.",
  inspection:'Define flatness and bore relationships for the interfaces that control fit. Agree surface acceptance for the specified finish, along with the measurement method and records needed before production.'
 },
 'stainless-steel-cnc-parts':{
  heading:'Stainless steel shafts, fittings and hardware',
  geometry:"Shafts, fittings and locking hardware; turned diameters, grooves and threads, with milled flats, cross-holes or engraving.",
  workholding:"Stock dimensions, datum axis, working diameters and shoulders.",
  materialFinish:"303, 304, 316L and 17-4PH options. Fine turning, polishing, passivation or electropolishing; confirm grade and condition.",
  inspection:'Define runout, diameter and thread checks against the assembly datums. Mark surfaces where burrs or handling marks are unacceptable, and confirm the measurement method and required records before production.'
 },
 'copper-brass-cnc-parts':{
  heading:'Conductive parts and threaded fittings',
  geometry:"Conductive parts, manifolds and threaded fittings made by turning, milling, 5-axis or casting finish machining.",
  workholding:"Stock dimensions, contact areas, fastening details and internal-passage access.",
  materialFinish:"C36000 brass and tellurium copper; polishing or plating with protected contact surfaces.",
  inspection:'Define thread gauging and burr acceptance, including contact or sealing surfaces. State which dimensions apply after plating. Confirm the measurement method and required records before production.'
 },
 'plastic-machined-parts':{
  heading:'Plastic insulators, wear parts and housings',
  geometry:"Milled and turned insulators, guides, rollers and housings.",
  workholding:"Low-stress clamping, thin-wall support and temperature control.",
  materialFinish:"Exact polymer grade, fillers and stock condition; edge quality and cleaning requirements.",
  inspection:'Define hole position and flatness, including acceptance criteria for mating surfaces. Agree conditioning and measurement requirements where material behavior affects the result. Confirm the method and required records before production.'
 },
 'prototype-machining':{
  heading:'Prototypes for fit and design checks',
  geometry:"Fit, assembly and design evaluation from a STEP or IGES model.",
  workholding:"Current revision, fixed interfaces and geometry still open to change.",
  materialFinish:"Production material and finish, or approved alternatives for the evaluation.",
  inspection:'Define the prototype objective and acceptance criteria for each critical interface. Agree the measurements and records needed to evaluate it. Any pressure or functional testing, including the method, must be agreed before machining.'
 },
 'low-volume-production':{
  heading:'Pilot builds and repeat batches',
  geometry:"Pilot and repeat batches of turned, milled or finish-machined cast parts.",
  workholding:"Approved drawing revisions, components that must fit together and fixture setups for repeat orders.",
  materialFinish:"Grade, condition, finish and cosmetic criteria for each part number.",
  inspection:'First-article or in-process checks support consistency across batches. Include first-article reporting, subsequent sampling and traceability requirements in your quotation request. Confirm the measurement method and records before production.',
  planning:{title:'Quantity and production time',text:'Orders start at 1 piece. Send quantities by part number and the release schedule, with finish requirements for pricing. Production takes 7 to 14 business days after drawing and order confirmation, including finishing; transit is additional.'}
 },
};
