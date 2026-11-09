// Editorial engineering guidance derived from the catalog's part families.
// These are RFQ discussion points, not evidence of available equipment,
// certified processes, delivered projects or guaranteed acceptance limits.
export type CapabilityContent = {
 description:string; scope:string; drawing:string[]; inspection:string[]; rfq:string[];
};
export const capabilityContent:Record<string,CapabilityContent> = {
 'cnc-milling-service': {
  description:'CNC milling for blocks, brackets and housings. Send your drawing with mating features, finish requirements and any limits on tool access.',
  scope:'An instrument housing or bracket may need machining from several directions. The model determines the stock form, setup sequence and access to each feature.',
  drawing:["Assembly datums, hole positions, thin walls and deep pockets. Mark permitted radius or geometry changes."],
  inspection:["Mark critical dimensions and masked surfaces, and state whether acceptance checks apply before or after finishing. Include any required cleanliness, chemical-contact or ESD tests."],
  rfq:['Send a 3D model and drawing with the revision identified. Specify material grade and stock condition, then give the quantity and intended assembly.','Include finish requirements and any permitted design changes so we can assess alternative machining approaches.']
 },
 'cnc-turning-service': {
  description:'CNC turning for shafts, bushings and fittings, with fits, threads, sealing faces and off-axis features taken from your drawing.',
  scope:'Cross-holes, flats or slots may need secondary machining. We plan these operations around their positions relative to the turned features.',
  drawing:["Diameters, shoulders, runout, complete thread designations and engagement lengths. Locate off-axis features from the datum axis."],
  inspection:["Fits, thread gauges and sealing-surface limits. Leak tests and application approvals require separate criteria."],
  rfq:['Include mating-part information and the stock grade and condition. Specify the surface finish and quantity per release.','If you need functional testing or a report, state the method and acceptance criteria for agreement.']
 },
 '5-axis-cnc-machining': {
  description:'CNC machining for angled features and continuous contours. Datums, cutter access and inspection requirements follow the controlled model revision.',
  scope:'Indexed positioning can reach angled faces. A continuous contour may need simultaneous motion. The model and fixture clearance determine which route can reach the required surfaces.',
  drawing:["Identify the model revision to use, with datums, thin sections and limits on tool marks. Include traceability, final end use and applicable export requirements."],
  inspection:["Profile and position checks against the model. Balance, leak and other functional tests are agreed separately."],
  rfq:['Provide the native or neutral 3D model and a drawing of critical features. State the material condition and finish requirements.','Include assembly clearances and validation criteria so we can assess feasibility and quote the required work and reports.']
 },
 'casting-machining': {
  description:'Finish machining for cast housings. Send the blank specification and machining allowance, with bearing bores and sealing faces defined on the finished-part drawing.',
  scope:'The blank and finished-part drawings distinguish retained cast surfaces from areas to machine. Blank supply and incoming acceptance must be settled before the machining plan.',
  drawing:["Bearing bores, seal lands, mounting interfaces and datum targets; provide sections for hidden geometry."],
  inspection:["Incoming-blank and finished-interface checks. Porosity, pressure and non-destructive tests require separate acceptance criteria."],
  rfq:['Send blank photos or models with the alloy and condition. State the available stock allowance and number of castings.','Identify who supplies the casting and handles rejected blanks. If you need reconstruction from a sample, include it in the request; hidden geometry also needs measurements or drawing details.']
 },
 'stainless-steel-cnc-parts': {
  description:'Stainless steel shafts, fittings and locking hardware. Specify the material grade and condition, with thread and finish requirements.',
  scope:'The service environment guides stainless grade and condition. Surface treatment and final dimensions belong on the same specification. Each listed grade is a separate material option.',
  drawing:["Material condition, heat treatment, threads and sealing or sliding surfaces. Select the grade for the service environment."],
  inspection:["Runout, diameter, thread and post-treatment checks, with burr limits and required material records."],
  rfq:['Send a drawing with the revision identified, plus the grade and condition. State the finish, quantity and mating-part requirements.','For passivation or electropolishing, specify the treatment requirements and dimensions to check after treatment.']
 },
 'plastic-machined-parts': {
  description:'Machined plastic insulators, guides and housings. Specify the polymer grade, thin sections and measurement conditions for your part.',
  scope:'Insulating plates, wear components and machined blocks place different demands on a polymer. Operating conditions and loads guide the grade, workholding and measurement state.',
  drawing:["Thin walls, deep pockets, press fits and inserts. Include assembly loads, temperature, moisture and chemical exposure."],
  inspection:["Mating dimensions, flatness and conditioning. Electrical, food-contact or medical requirements need separate documentation or tests."],
  rfq:['Send a model and drawing, selected grade or selection constraints, quantities and application conditions.','Specify the documentation, material certification or functional tests you need. Confirm availability and responsibility.']
 },
 'copper-brass-cnc-parts': {
  description:'Copper and brass fittings, contacts and connectors. Specify the alloy and threads, with contact surfaces and finishing requirements clearly marked.',
  scope:'An electrical contact needs different checks from a fluid fitting. Choose the alloy for that function and state the required tests. Any electrical or fluid-system qualification is assessed separately for the application.',
  drawing:["Exact alloy and standard, thread and seal details, contact areas and material restrictions."],
  inspection:["Thread gauges, burr limits and post-plating dimensions. Conductivity, pressure and thermal tests need agreed criteria."],
  rfq:['Include the alloy designation and finish or plating specification. Give quantities and assembly information.','State the material restrictions and declarations you need. Confirm their availability for the proposed supply.']
 },
 'aluminum-cnc-parts': {
  description:'Aluminum housings and automotive prototypes. Specify alloy and temper, then define thin walls and sealing interfaces with the required finish.',
  scope:'For an enclosure, billet intake component or cooling prototype, thin sections and mounting interfaces need to suit the alloy, temper and finish.',
  drawing:["Alloy, temper, wall thickness, mounting datums and sealing faces. Identify masked fits, cosmetic faces and post-finish dimensions."],
  inspection:["Flatness, bore relationships and finish acceptance. Pressure, leak and vehicle-performance tests are separate requirements."],
  rfq:['Send a model and drawing with the alloy and temper. Give the quantity and finish specification, and explain the intended assembly.','For fabricated or welded components, identify supplied items and joint requirements. Include test conditions so we can check feasibility.']
 },
 'prototype-machining': {
  description:'Machined prototypes for fit and design evaluation. Send the current revision and the checks you need to complete.',
  scope:'A prototype may answer an assembly-fit question, show the appearance or support a defined functional test. Its purpose needs to be settled before machining. The automotive examples include housings and intake or cooling components at this stage.',
  drawing:["Prototype purpose, critical interfaces and acceptance criteria; record open design changes."],
  inspection:["Measurements and approval records. Agree test fixtures, procedures and responsibility; vehicle performance needs separate validation."],
  rfq:['Provide the model and key drawing dimensions, with the revision status. Give the prototype quantity and intended evaluation.','Explain any planned next revision or later batch. Include your requested date for review and confirmation.']
 },
 'low-volume-production': {
  description:'Pilot and repeat small batches made to approved drawing revisions, with part-specific inspection requirements.',
  scope:'Pilot and repeat orders start at 1 piece. Send the drawing and material specification with the quantity for each part number. Finishing and inspection requirements are included when planning and pricing the batch.',
  drawing:["List part numbers, drawing revisions and quantities with the order schedule. Agree how changes will be approved before repeat production."],
  inspection:["Agree first-article records and batch sampling, including traceability and how nonconforming parts will be handled. We assess batch size from the drawing."],
  rfq:['Give quantities per part and release, with the required documentation. State finish and packaging needs.','Provide expected repeat demand as a forecast, with requested dates for confirmation. Agree commercial terms separately.']
 }
};
