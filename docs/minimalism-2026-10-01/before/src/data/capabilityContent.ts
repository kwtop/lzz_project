// Editorial engineering guidance derived from the catalog's part families.
// These are RFQ discussion points, not evidence of available equipment,
// certified processes, delivered projects or guaranteed acceptance limits.
export type CapabilityContent = {
 description:string; scope:string; drawing:string[]; inspection:string[]; rfq:string[];
};
export const capabilityContent:Record<string,CapabilityContent> = {
 'cnc-milling-service': {
  description:'CNC milling for blocks, brackets and housings. Prepare an RFQ with tool-access constraints, mating features and finish requirements.',
  scope:'An instrument housing or bracket may need features machined from several directions. The model determines the stock form, tool access and setup sequence.',
  drawing:['Identify the assembly datums and dimensions that locate mating bores, mounting holes and faces. Separate functional dimensions from general dimensions.','Mark deep pockets and small internal corners, along with thin sections that need tool-access or workholding checks. State where a radius or geometry change is acceptable.'],
  inspection:['Identify which face, bore and hole-position relationships need recorded results, and the datum system used to evaluate them.','Specify whether dimensional acceptance applies before or after finishing, with masking and cosmetic surfaces marked on the drawing.'],
  rfq:['Supply a 3D model and revision-controlled drawing, material grade and stock condition, quantity and intended assembly.','Include finish requirements and any permitted design changes so alternative machining approaches can be evaluated.']
 },
 'cnc-turning-service': {
  description:'CNC turning examples for shafts, bushings and fittings, with RFQ guidance on fits, threads, sealing faces and off-axis features.',
  scope:'Cross-holes, flats or slots can require secondary machining. Their position relative to the turned features determines how the operations are combined.',
  drawing:['Define the functional axis, bearing or sliding fits, shoulders and axial lengths. Identify any runout requirement relative to a named datum.','Give complete thread designations and engagement lengths. Mark internal grooves, cross-holes and flats that need access or deburring checks.'],
  inspection:['Give acceptance limits for the diameters and axial relationships that control assembly. A general precision requirement is insufficient to define these checks.','Agree thread gauging, edge condition and sealing-surface acceptance; a dimensional report alone does not establish leak performance.'],
  rfq:['Include mating-part information, stock grade and condition, surface finish and the quantity per release.','If you need functional testing or a report, specify the method and acceptance criteria to be agreed.']
 },
 '5-axis-cnc-machining': {
  description:'Multi-face and contoured CNC components: define datums, tool access and inspection against the model.',
  scope:'Angled features may be reached by indexed positioning; continuous contours may need a simultaneous tool path. We review the model before choosing the machining route.',
  drawing:['Identify the functional surfaces and the relationships between angled holes, bores and mounting faces. Specify which model revision defines the contour.','Mark restricted tool access, thin blades, deep cavities and surfaces where tool marks matter. Discuss acceptable changes before fixing the route.'],
  inspection:['Define profile and position requirements with usable datums. Agree the features to compare with the model or measure.','For rotating or fluid-handling parts, identify any separate balance, leak or functional test requirement; geometry alone does not demonstrate performance.'],
  rfq:['Provide the native or neutral 3D model, a drawing of critical features, material condition and finish requirements.','Include assembly clearances and any validation criteria to help assess feasibility and the reports and work to include in the quotation.']
 },
 'casting-machining': {
  description:'Plan finish machining of cast housings with RFQ guidance on blank condition, machining allowance, bearing bores and sealing faces.',
  scope:'The casting and finished-part drawings must show what remains as cast and where material is removed. Confirm blank supply and acceptance before planning the machining work.',
  drawing:['Distinguish as-cast surfaces from machined faces. Supply casting and finished-part drawings with machining allowance and datum targets.','Identify bearing bores, seal lands and mounting interfaces whose alignment depends on the blank and fixture locations.'],
  inspection:['Agree incoming-blank acceptance, material documentation and dimensional checks on the finished interfaces.','Specify any porosity, pressure-integrity or non-destructive examination separately. Agree who is responsible and the acceptance criteria.'],
  rfq:['Share blank photos or models, alloy and condition, available stock allowance and the number of castings available.','Identify responsibility for casting supply, rejected blanks and any sample-based reconstruction; a photo is insufficient to define internal geometry.']
 },
 'stainless-steel-cnc-parts': {
  description:'Stainless steel shafts, fittings and locking hardware. Specify the material grade and condition, with thread and finish requirements.',
  scope:'Choose the grade and condition for the operating environment, then specify the treatment and final dimensions. The listed grades are not interchangeable; photographs do not verify the material of a pictured part.',
  drawing:['Specify the grade and material condition, including any required heat treatment. Identify working diameters, threads and sealing or sliding surfaces.','State the service environment and selected surface treatment; corrosion resistance and compatibility must be evaluated for the actual application.'],
  inspection:['Define runout, diameter and thread checks in relation to the assembly datums. Mark surfaces where burrs or handling marks are unacceptable.','Request any material or treatment documents you need. Confirm their availability and contents before placing an order.'],
  rfq:['Include grade, condition, finish, quantity and mating-part requirements with a controlled drawing.','If passivation or electropolishing is requested, specify the applicable requirements and the dimensions that must be accepted after treatment.']
 },
 'plastic-machined-parts': {
  description:'Machined plastic insulators, guides and housings. Specify the polymer grade, thin sections and measurement conditions for your part.',
  scope:'Insulating plates, wear components and machined blocks place different demands on a polymer. Specify the grade for the operating environment and loads, then review the machining and measurement conditions.',
  drawing:['Give the exact polymer grade, fillers and stock condition. Identify temperature, moisture, chemical exposure and electrical requirements relevant to selection.','Mark thin walls and deep pockets, along with press fits and inserts. Include assembly loads and any permitted geometry changes.'],
  inspection:['Agree measurement and conditioning requirements where material behavior affects acceptance. Define hole position, flatness and mating-surface criteria.','Specify edge, cleanliness and surface requirements; a product photograph is not evidence of electrical, food-contact or medical compliance.'],
  rfq:['Send a model and drawing, selected grade or selection constraints, quantities and application conditions.','Specify the documentation, material certification or functional tests you need. Confirm availability and responsibility.']
 },
 'copper-brass-cnc-parts': {
  description:'Copper and brass fittings, contacts and connectors: prepare alloy, thread, contact-surface and finishing requirements for quotation.',
  scope:'Electrical contacts and fluid fittings need different acceptance criteria. Choose the alloy for the function and specify any required testing; the examples do not establish electrical or fluid-system qualification.',
  drawing:['Specify alloy and material restrictions. Distinguish electrical contact areas from sealing faces, threads and cosmetic surfaces.','For contacts, show mating area and fastening details. For fittings, state thread standard, seal arrangement and the intended fluid environment.'],
  inspection:['Define thread gauging, burr acceptance and contact or seal surface requirements. State which dimensions apply after any plating.','Specify conductivity, pressure or other functional tests separately, with acceptance criteria. Agree the tests to include in the quotation.'],
  rfq:['Include alloy designation, finish or plating specification, quantities and assembly information.','State the applicable material restrictions and declarations you need. Confirm that the declarations are available for the proposed supply.']
 },
 'aluminum-cnc-parts': {
  description:'Aluminum housings and automotive prototypes: specify alloy and temper, thin walls, sealing interfaces and the required finish.',
  scope:'For an enclosure, billet intake component or cooling prototype, review the thin sections and mounting interfaces together with the alloy, temper and finish.',
  drawing:['Specify alloy, temper and stock form. For housings, identify wall thicknesses, mounting datums, sealing faces and deep-pocket access.','For anodized or other finished parts, mark masked fits, cosmetic faces and post-finish acceptance dimensions. Treat color requirements separately from geometry.'],
  inspection:['Agree checks for flatness, bore relationships and interfaces that control fit. Define surface acceptance using the intended finish.','Specify pressure, leak or assembly tests separately. An automotive prototype in the catalog is not proof of tested vehicle performance.'],
  rfq:['Send a model, drawing, alloy and temper, quantity and finish specification with the intended assembly context.','For fabricated or welded components, identify supplied items and joint requirements. Include any test conditions so feasibility can be checked.']
 },
 'prototype-machining': {
  description:'Machined prototypes for fit and design evaluation. Define the revision and validation priorities in your RFQ.',
  scope:'Prototype examples focus on automotive housings and intake or cooling components. State the goal: packaging, assembly, appearance or a specific functional test. A prototype does not automatically validate a production design.',
  drawing:['Identify the current revision and dimensions needed for the prototype evaluation. Separate fixed interfaces from geometry still open to change.','State whether production material and finish are essential to the evaluation, or whether alternatives may be proposed for your approval.'],
  inspection:['Agree the measurements and evidence needed to judge the prototype against its objective. Document the acceptance criteria for each critical interface.','If testing is required, identify who supplies the fixture and test procedure and who evaluates the result. No test completion is implied by the example.'],
  rfq:['Provide the model, key drawing dimensions, prototype quantity, revision status and intended evaluation.','Explain any planned next revision or later batch. Give your requested date so it can be assessed; delivery still needs confirmation.']
 },
 'low-volume-production': {
  description:'Pilot and repeat small batches, with controlled revisions and inspection requirements agreed for each part.',
  scope:'Examples cover pilot lots and mixed components, including short-run housings. Orders start at 1 piece. Share the geometry, material, finish and inspection requirements so we can quote the batch plan and price.',
  drawing:['Provide a part list with revision, quantity and material for each item. Identify common features and any parts that must fit or be supplied together.','Distinguish an initial approval batch from later releases. Identify which requirements remain fixed and how proposed drawing changes should be reviewed.'],
  inspection:['Specify first-article reporting, subsequent sampling and traceability requirements with the quotation request.','Agree treatment of cosmetic criteria, mixed revisions and nonconforming parts before defining batch acceptance.'],
  rfq:['Share quantities per part and release, required documentation, finish and packaging needs.','Give expected repeat demand as a forecast and requested dates for confirmation. Agree commercial terms separately.']
 }
};
