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
  geometry:'For pockets, slots, flat faces and features cut from several directions. 3-, 4- and 5-axis work covers brackets, manifolds, multi-sided parts and curved surfaces.',
  workholding:'Send a 3D model with the overall dimensions and stock size. Setup planning considers tool access, clamping space and the relationships between features. Axis count alone does not determine the maximum part size.',
  materialFinish:'Aluminum, stainless steel, steel, copper, brass, titanium and engineering plastics are covered across our milling services. Deburring, polishing, bead blasting, anodizing and plating options depend on the substrate and the dimensions that need protection. Confirm the grade, condition and finish on your drawing.',
  inspection:'Identify which face, bore and hole-position relationships need recorded results, and the datum system used to evaluate them. Agree the measurement method and required records before production.'
 },
 'cnc-turning-service':{
  heading:'Turned diameters and off-axis features',
  geometry:'For shafts, sleeves, bushings and fittings built around a rotational axis. Stepped diameters, bores, grooves and threads can be combined in turned components. Live tooling adds cross-holes, flats, slots and milled details to cylindrical parts. Fitting services include NPT, BSPT and metric threads; state the thread standard, mating component and sealing requirements.',
  workholding:'Send the model, stock size, overall diameter and axial lengths. Identify the functional axis, shoulders, internal grooves and off-axis features so tool access and clamping space can be reviewed.',
  materialFinish:'State the stock grade, condition and surface finish on the drawing. Identify sealing and sliding surfaces, mating-part requirements and the edges that need deburring.',
  inspection:'Specify checks for the diameters and axial relationships that control assembly. An unspecified "precision" label gives no acceptance criteria. Agree the measurement method and required records before production.'
 },
 '5-axis-cnc-machining':{
  heading:'Angled access and continuous contours',
  geometry:'For continuous curves, deep cavities and features requiring angled tool access. Impellers, curved components and multi-sided housings use angled tool access and contour machining.',
  workholding:'Review the clamping areas, tool reach and clearance across the required orientations. Identify protected surfaces and features that must share a setup; use the size-review checklist below to provide the model and dimensions.',
  materialFinish:'Services cover aluminum, titanium, Inconel and hardened stainless. Specify the grade, material condition and finish requirements, including surfaces where tool marks matter.',
  inspection:'Define profile and position requirements with usable datums. Agree the features to compare with the model or measure, the measurement method and required records before production.'
 },
 'casting-machining':{
  heading:'Finish machining for cast blanks',
  geometry:'For adding finished bores, mounting faces, threads and passages to cast blanks. Milling, boring, drilling and tapping address transmission housings, pump bodies and structural enclosures. Reverse engineering support includes sample scanning, 2D/3D model reconstruction and manufacturability review.',
  workholding:'Share the blank model or photos, overall dimensions and casting and finished-part drawings. Fixtures for irregular blanks use casting datums, stock allowance and accessible clamping positions. Identify who supplies and approves the casting.',
  materialFinish:'Specify the casting alloy and condition. Distinguish as-cast surfaces from machined faces and identify the required finish on the finished interfaces. These machining examples do not establish an in-house foundry service.',
  inspection:'Agree incoming-blank acceptance, material documentation and dimensional checks on the finished interfaces. Agree the measurement method and required records before production.'
 },
 'aluminum-cnc-parts':{
  heading:'Aluminum housings and automotive prototypes',
  geometry:'For lightweight housings, automotive prototypes and multi-feature components, including thin walls and deep pockets.',
  workholding:'Send a 3D model with the overall dimensions and stock size. Enclosure machining considers stress relief, fixture support and the order in which material is removed. Review tool access, clamping space and final interfaces together.',
  materialFinish:'6061/6061-T6 and 7075 appear across billet machining services; 3003 is also offered in the intercooler service. Select the grade and temper for the actual part. Bead blasting, brushing, polishing, anodizing, chemical conversion and powder coating are offered across relevant services. Define color and masking requirements.',
  inspection:'Agree checks for flatness, bore relationships and interfaces that control fit. Define surface acceptance using the intended finish. Agree the measurement method and required records before production.'
 },
 'stainless-steel-cnc-parts':{
  heading:'Stainless steel shafts, fittings and hardware',
  geometry:'For corrosion-resistant shafts, fittings, valve parts and locking components. Shafts, flanges, grooves and threads can be combined with live-tool flats, cross-holes and engraving.',
  workholding:'Send a 3D model with the overall dimensions and stock size. Identify working diameters, shoulders and off-axis features so tool access, clamping space and the assembly datums can be reviewed.',
  materialFinish:'303, 304, 316L and 17-4PH options serve different machining and operating requirements. Specify the grade and material condition, including any required heat treatment. Fine turning, polishing, passivation and electropolishing are offered across the stainless services. Specify the treatment and required final dimensions.',
  inspection:'Define runout, diameter and thread checks in relation to the assembly datums. Mark surfaces where burrs or handling marks are unacceptable. Agree the measurement method and required records before production.'
 },
 'copper-brass-cnc-parts':{
  heading:'Conductive parts and threaded fittings',
  geometry:'For conductive parts, heat-transfer components, manifolds and threaded fittings. Turning, milling, 5-axis work and casting finishing cover cylindrical fittings and complex conductive parts.',
  workholding:'Send a 3D model with the overall dimensions and stock size. Show mating areas and fastening details so tool access and clamping space can be reviewed around contact areas, passages and threads.',
  materialFinish:'C36000 brass and tellurium copper are named options in the copper and brass service. Burr control matters around threads and passages. Specify polishing or plating requirements and any surfaces that need direct electrical contact.',
  inspection:'Define thread gauging, burr acceptance and contact or seal surface requirements. State which dimensions apply after any plating. Agree the measurement method and required records before production.'
 },
 'plastic-machined-parts':{
  heading:'Plastic insulators, wear parts and housings',
  geometry:'For insulating components, wear parts, seals and lightweight structural pieces. Milling and turning cover drilled blocks, gears, rollers, thin walls, deep pockets and multi-axis holes.',
  workholding:'Send a 3D model with the overall dimensions and stock size. Low-stress workholding and temperature control address deformation. Review clamping space, tool access, thin sections and assembly loads together.',
  materialFinish:'PEEK, PTFE, polyimide, nylon, acetal/Delrin, HDPE, UHMW, acrylic and polycarbonate are listed in the plastic machining service. Specify the exact polymer grade, fillers and stock condition. Define edge quality, cleaning and mating-surface requirements.',
  inspection:'Agree measurement and conditioning requirements where material behavior affects acceptance. Define hole position, flatness and mating-surface criteria. Agree the measurement method and required records before production.'
 },
 'prototype-machining':{
  heading:'What should your prototype verify?',
  geometry:'For checking fit, assembly and design details before repeat production. STEP or IGES review helps identify tool access, fitment and manufacturability issues before machining. Automotive development examples include intercoolers, billet engine covers, intake manifolds, plenums and electronic throttle bodies.',
  workholding:'Send the current model revision, overall dimensions and stock size. Separate fixed interfaces from geometry still open to change so tool access and clamping space can be reviewed for the prototype.',
  materialFinish:'Specify the material grade, condition and required finish. State whether production material and finish are essential to the evaluation, or whether alternatives may be proposed for your approval. Separate fit-check dimensions from appearance finishes.',
  inspection:'Agree the measurements and evidence needed to judge the prototype against its objective. Document the acceptance criteria for each critical interface. Agree any pressure or functional testing required for the prototype, the measurement method and required records before machining.'
 },
 'low-volume-production':{
  heading:'What does your pilot or repeat batch need?',
  geometry:'For pilot builds, mixed-part orders and smaller repeat batches. Milling, turning, multi-axis machining and casting finishing can support different part numbers within a production program.',
  workholding:'Share models, overall dimensions and stock sizes for each part number. Dedicated fixtures and revision control support repeatable setups across batches. Identify common features and parts that must fit together so tool access and clamping space can be reviewed.',
  materialFinish:'Specify the grade, material condition and finish for each part number. Identify cosmetic criteria and required final dimensions for batch acceptance.',
  inspection:'First-article or in-process checks support consistency across batches. Specify first-article reporting, subsequent sampling and traceability requirements with the quotation request. Agree the measurement method and required records before production.',
  planning:{title:'Order planning',text:'Orders start at 1 piece. Share quantities by part number, release schedule and finish requirements for pricing. Production takes 7–14 business days after drawing and order confirmation, including finishing; transit is additional.'}
 },
};
