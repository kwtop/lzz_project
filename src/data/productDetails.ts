// Part-specific RFQ guidance, anchored to productSummaries and the original
// listing subject. No text below asserts a completed inspection or delivery.
export type ProductDetail = {scope:string; drawing:string; inspection:string; rfq:string; considerations?:{title:string;body:string}[]};
type DetailInput = [scope:string,drawing:string,inspection:string,rfq:string];
const entries:Record<string,DetailInput> = {
 'custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm':[
  'A circular milled component with a central opening, stepped bores and a face-hole pattern.',
  'Specify bore diameters, step depths and fits. Locate the face-hole pattern from drawing datums, including pitch-circle diameter or hole-center coordinates and the relationship to the central bore.',
  'Agree diameter and depth checks for each bore step, hole-position checks and the flatness or orientation of functional circular faces. Define the inspection setup from the drawing datums.',
  'Include the 3D model, dimensioned drawing, datum scheme, material grade and quantity. Identify the mating bore or fastener requirements; any additional pockets need their own drawing details.'
 ],
 'custom-oem-high-precision-cnc-milling-manufacturer':[
  'Instrument blocks, brackets and valve bodies with machined interfaces.',
  'Distinguish mounting interfaces from internal passages and identify any intersecting holes or inaccessible edges.',
  'Specify hole-position and mating-face checks, plus a separate cleanliness or leak requirement where the application needs it.',
  'Include passage sections, thread specifications, mating-component references and material grade.'
 ],
 'ultra-high-precision-machining-services':[
  'Contoured impellers and housings need a controlling model and feature-specific tolerances. No numerical tolerance is specified for this example.',
  'Identify blade profiles, root transitions and the datum axis. Mark thin sections and tool-access restrictions.',
  'Agree the profiles to measure and any separate balance or rotating-assembly tests.',
  'Supply the controlling model, material condition, critical profiles and acceptance criteria for the intended operating context.'
 ],
 'global-oem-precision-machining-solutions':[
  'Components that combine turned forms with angled or milled features.',
  'Locate mounting faces and off-axis features from the turned axis so we can plan the turning and milling operations.',
  'Identify runout, feature position and thread checks against a consistent datum scheme.',
  'Include mating geometry and critical interface dimensions so turning and milling requirements can be reviewed together.'
 ],
 'global-manufacturer-of-multi-sided-precision-machined-components':[
  'Housings with ports and mounting patterns across several faces.',
  'Locate angled ports and bolt patterns from shared datums, and distinguish fluid interfaces from structural holes.',
  'Agree positional and face-orientation checks; specify sealing tests separately if required.',
  'Provide a complete model with port standards, mating hardware and access constraints for assembly.'
 ],
 'custom-oem-cnc-turning-manufacturer':[
  'Shafts, sleeves and flanged rotational parts.',
  'Specify diameters, shoulders, groove dimensions and the functional axis; identify secondary flats and cross-holes.',
  'Request the fit, axial-length and runout checks relevant to the assembly, with thread gauging where needed.',
  'Share the turned profile, mating fits, stock grade and finish requirements alongside the requested quantity.'
 ],
 'custom-rotary-cylindrical-components':[
  'Turned parts with cross-holes, slots and flats.',
  'Define angular orientation of the secondary features relative to one another and to the shaft axis.',
  'Agree checks for feature orientation, thread engagement and burrs at intersecting holes.',
  'Include a model showing hidden intersections and explain which flats or holes locate the part during assembly.'
 ],
 'custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer':[
  'Connectors, adapters and flanges need a defined mechanical or fluid interface.',
  'Identify thread standards, sealing arrangement, groove geometry and the contact face of the mating component.',
  'Agree thread gauges and seal-surface criteria. Pressure or leak testing needs a separate procedure and acceptance limit.',
  'Supply mating connector information, fluid and temperature conditions where relevant, alloy and any proposed test requirements.'
 ],
 'full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing':[
  'For these milled parts, specify dimensions together with the required surface finish.',
  'Mark visible faces, masked areas and fitted bores; identify dimensions to be accepted after finishing.',
  'Agree dimensional and cosmetic acceptance separately, including a finish reference if appearance matters.',
  'Include the finish specification, color or texture reference where applicable, and any assembly surfaces that must remain untreated.'
 ],
 'custom-high-precision-machining-for-structural-aesthetic-components-oem':[
  'Structural parts with visible contours and mounting interfaces.',
  'Separate load-carrying and mating features from decorative surfaces, engraving and weight-reduction geometry.',
  'Define interface checks and appearance criteria without treating a photograph as a finish acceptance standard.',
  'Provide mounting context, chosen material, artwork if needed and a controlled finish reference.'
 ],
 'high-volume-cnc-turning-for-complex-internal-external-features':[
  'Sleeves and valve components for repeat batches. Confirm production capacity for your quantities and release schedule.',
  'Specify internal steps, grooves and seal lands, including features difficult to access with a gauge.',
  'Agree access for measurement, first-article checks and subsequent sampling of critical internal dimensions.',
  'Include section views, quantities per release and the reports you need so we can assess the production requirements.'
 ],
 'high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem':[
  'Fluid-system components with contours and impeller features. No efficiency or reliability rating is established for this example.',
  'Identify the controlling contour model, ports, datum axis and sealing interfaces.',
  'Define profile and interface checks; specify any flow, balance or leak validation as a separate requirement.',
  'Send the model revision and state who will validate each functional requirement.'
 ],
 'custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier':[
  'A cooling-assembly prototype needs fitment and fabrication requirements.',
  'Define end-tank geometry, port orientation, mounting points and interfaces between machined and welded components.',
  'Agree post-fabrication interface checks and any pressure or leak-test method, medium and acceptance criteria.',
  'Include the assembly model, component materials, supplied-core details and the intended validation plan.'
 ],
 'custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier':[
  'A billet cover needs engine-bay clearance and a specified finish on visible surfaces.',
  'Locate mounting holes and the mating perimeter from assembly datums; show underside clearances and local wall sections.',
  'Agree mating-face, mounting-pattern and clearance checks, with separate appearance acceptance for the outer contour.',
  'Provide the mating envelope, alloy and temper, finish requirements and whether any seal interface is present.'
 ],
 'custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier':[
  'Intake prototypes with runner transitions and multi-piece flanges connecting to the engine, plenum or turbo piping.',
  'Define runner transitions, port spacing and flange relationships to the mating engine and plenum.',
  'Specify interface and passage checks. Agree any pressure or flow tests separately.',
  'Include the full assembly model, mating-port drawing and the objective of the prototype evaluation.'
 ],
 'custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier':[
  'Throttle-body housings with mechanical interfaces.',
  'Define the main bore, shaft-bore relationship, mounting flange and motor or gear-chamber interfaces from named datums.',
  'Agree bore size, alignment and mating-feature checks. Functional actuation or leakage criteria must be specified separately.',
  'Provide mating shaft and plate requirements, motor envelope, material and finish, and identify who evaluates the assembled prototype.'
 ],
 'custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier':[
  'Curved intake runners with injector bosses and fuel-rail mounts. Locate these interfaces for engine-bay and mounting checks.',
  'Locate injector axes and fuel-rail mounts relative to the intake ports and assembly datums.',
  'Agree positional and fitment checks, with separate criteria for sealing interfaces and any requested functional tests.',
  'Supply injector and rail interface drawings, installation clearances and the current manifold model revision.'
 ],
 'custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier':[
  'Billet plenums with internal transitions and a throttle mounting flange.',
  'Define the internal envelope, flange interface, fastener access and any split-line sealing detail.',
  'Agree flange and passage checks, appearance requirements and any separate leak or pressure acceptance.',
  'Provide the intended volume geometry, mating-throttle details and finish specification. A performance target alone does not define the part.'
 ],
 'custom-cnc-machined-castings-transmission-housings-pump-bodies':[
  'Machined functional interfaces in a supplied or proposed cast housing.',
  'Separate cast and machined surfaces, with section views for internal splines, channels and sealing flanges.',
  'Agree blank acceptance, datum-based dimensional checks and any separate pressure-integrity requirement.',
  'Provide casting and finished drawings, alloy and condition, machining allowance and responsibility for blank supply.'
 ],
 'custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier':[
  'Stainless shafts and valve stems with secondary flats or holes.',
  'Define working diameters, shoulders, datum axis and angular relationships of live-tooled features.',
  'Agree runout, fit and thread checks plus surface requirements for sliding or sealing regions.',
  'Specify grade and condition, mating fits and the requested surface treatment. Suitability depends on the application.'
 ],
 'custom-oem-cnc-machined-non-metallic-components-insulating-parts':[
  'Insulating plates and non-metallic wear components.',
  'Specify material grade and required properties, then locate slots, holes and barriers from assembly datums.',
  'Agree dimensional and edge checks; define electrical or material testing separately if required.',
  'Include the service environment, loads and selected material or selection constraints, with any compliance documentation needs.'
 ],
 'custom-oem-cnc-machined-plastic-parts-manufacturer':[
  'For polymer rollers, seals, guides and structural components, select the material to suit the application.',
  'Identify the selected polymer and fillers, working surfaces, interference fits and assembled loading.',
  'Agree measurement conditions, mating dimensions and surface or cleanliness criteria for the chosen grade.',
  'Provide material designation, operating environment and the intended function; the listed polymers are not interchangeable specifications.'
 ],
 'oem-precision-cnc-machined-casting-housing-structural-enclosures':[
  'Cast enclosures with ribs, cavities and bearing interfaces.',
  'Show bearing-bore relationships, mounting datums and accessible fixture surfaces on the cast blank.',
  'Agree bore alignment and mating-face checks, along with acceptance criteria for regions left as cast.',
  'Include casting condition, allowance and both blank and finished-part models where available.'
 ],
 'oem-precision-cnc-machined-casting-housings':[
  'Cast housings with machined central bores, splines and mating faces.',
  'Define spline requirements and bore-to-face relationships; identify which original sample dimensions are controlling if reconstruction is requested.',
  'Agree spline inspection and bore alignment using defined datums.',
  'Send available drawings and blank details. Identify dimensions that still need confirmation before quotation.'
 ],
 'precision-cnc-machined-castings-custom-oem-housings':[
  'Finish-machined cast housings for mechanical assembly.',
  'Mark sealing faces, bearing fits and tapped mounting holes; distinguish machining allowance from final wall geometry.',
  'Agree face, fit and thread checks and any restrictions on exposed casting defects at functional surfaces.',
  'Include the casting specification, finished drawing, blank supply details and required inspection records.'
 ],
 'precision-cnc-machined-castings-manufacturer':[
  'Transmission and pump blanks with internal features and flow paths.',
  'Provide sections through hidden features and define the relationship between flange datums, bores and internal gear or spline geometry.',
  'Agree the material documents to check and the dimensions to measure. Discuss fluid-integrity testing separately.',
  'Clarify blank origin, alloy condition and whether the project starts from a complete model or a sample needing definition.'
 ],
 'precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances':[
  'Plastic parts with thin walls and deep pockets. Set acceptance limits for each critical feature; no general tolerance is specified for this example.',
  'Identify the polymer, wall sections, pocket depth and mating interfaces. Define the state in which the part must meet dimensions.',
  'Agree measurement conditions and checks for wall geometry, hole relationships and dimensional stability relevant to assembly.',
  'Provide the model, selected grade, operating and measurement conditions and any permitted wall or radius changes.'
 ],
 'precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier':[
  'For threaded fittings, contacts and heat-transfer features, the intended function determines the alloy and finish requirements.',
  'Separate contact surfaces from sealing features and specify threads, fastening details and post-finish dimensions.',
  'Agree thread gauging, burr and surface acceptance. Conductivity or pressure performance needs separate test criteria.',
  'Supply alloy designation, any material restrictions, plating requirements and mating-part information.'
 ],
 'precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier':[
  'Mixed pilot batches may combine turned, milled and cast-blank components.',
  'Give each item a part number, revision, material and quantity; identify shared interfaces across the assembly.',
  'Agree first-article checks and later sampling for each part, with requirements defined by part number.',
  'Provide the part list, release quantities and document needs, and distinguish forecast demand from the initial order.'
 ],
 'precision-machining-for-functional-plastic-blocks-structural-components':[
  'Thick polymer blocks used as guides or equipment supports.',
  'Define hole patterns, blind depths and insert locations relative to mounting faces, with assembly loads identified.',
  'Agree hole alignment, depth, flatness and parallelism checks under specified measurement conditions.',
  'Include the polymer grade, insert specifications where applicable and the mounting arrangement.'
 ],
 'precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures':[
  'Short-run aluminum enclosures with pockets, thin walls and compound-angle features, starting from billet or a cast blank.',
  'Define wall sections and mating datums. Identify billet or cast-blank stock so we can plan the machining operations.',
  'Agree flatness, hole-position and batch-report requirements, including whether final acceptance follows finishing.',
  'Provide alloy and condition, stock assumptions, quantity per revision and the finish specification.'
 ],
 'precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier':[
  'Stainless shafts and threaded fittings. Confirm the grade; these examples are not all identified as 316L.',
  'Specify material condition, bearing or sliding fits, thread standards and the datum axis of slender sections.',
  'Agree diameter, runout and thread checks plus acceptance after any requested passivation or electropolishing.',
  'Include the chosen grade and service environment. State the surface requirements and any material or treatment documents you need.'
 ],
 'precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier':[
  'Locking pins and mating control hardware.',
  'Define pin travel, engagement geometry, mounting thread and the mating hole. Clarify whether the inquiry is for a component or a complete assembly.',
  'Agree fit and alignment checks and any separate actuation-force or cycle-test requirements.',
  'Supply the assembly drawing, spring requirements if applicable and the responsibility for functional validation.'
 ],
 'small-batch-cnc-machining-manufacturer-complex-aluminum-housings':[
  'Industrial and electronic enclosures with deep cavities and sealing interfaces.',
  'Locate mounting points and seal faces, and mark thin sections, masked fits and cosmetic exterior faces.',
  'Agree flatness, mounting-pattern and finish checks..',
  'Provide alloy, temper, lid or gasket interfaces, finish requirements and any requested environmental testing.'
 ],
 'small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv':[
  'Repeat small batches with material and finish specified for each part number. Listed options are aluminum, stainless steel, brass and engineering plastics.',
  'Assign material, revision and functional requirements to each part, and identify common interfaces or matched items.',
  'Agree initial approval evidence, sampling and traceability needs for each release.',
  'Include quantities per part and release, with material choices and reporting needs. Give your requested dates so availability can be checked.'
 ]
};
const deeper:Record<string,{title:string;body:string}[]> = {
 'custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier':[
  {title:'Shaft, bore and throttle-plate fit',body:'Define the main bore relative to the shaft and throttle plate; bore diameter alone is insufficient. Supply the mating components or approved interface drawings showing the shaft datum and required clearance or fit. Choose the fit designation for your design.'},
  {title:'Housing supply and functional tests',body:'Identify the motor, gear and sealing features included in the supply. For an assembled actuation or leakage test, specify the assembly condition and procedure, with acceptance criteria. Confirm whether the test can be carried out and who is responsible.'}
 ],
 'custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier':[
  {title:'Core, end tanks and supplied components',body:'Show the core, end tanks, ports and brackets in one assembly model. Identify customer-supplied components. Specify the material for each component, since one alloy may not suit the whole assembly. The quotation should make clear which work covers machining and joining, and which items are supplied separately.'},
  {title:'Installation checks and pressure testing',body:'Mark the mounting and port dimensions to check after joining for correct installation. If you request a pressure test, supply the procedure and test conditions, with acceptance criteria, so we can confirm whether it can be carried out. A leak check alone does not establish cooling effectiveness or suitability for a particular vehicle.'}
 ],
 'custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier':[
  {title:'Underside clearance and seal interfaces',body:'Define the underside as well as the visible cover contour, including fastener access and clearance to adjacent parts. If the cover uses a gasket or seal, provide the interface and mating-face requirements.'},
  {title:'Visible finish and masked fits',body:'Mark cosmetic faces and areas where tool-path texture is acceptable. Specify the anodized or polished finish, with an appearance reference if available. Before approving the finish, agree how masked fits and finished dimensions will be checked.'}
 ],
 'custom-cnc-machined-castings-transmission-housings-pump-bodies':[
  {title:'Casting allowance and blank acceptance',body:'Supply casting and finished-part drawings showing datum targets and material available for removal. Agree who accepts the incoming blank and how to handle insufficient allowance or a casting defect at a seal face. Confirm these responsibilities before machining.'},
  {title:'Internal features and inspection access',body:'Use sections and detail views to define splines, channels and bearing interfaces hidden from the exterior model. Specify gauges or reporting requirements for inaccessible features. Agree pressure-integrity or defect examinations separately from dimensional inspection.'}
 ],
 'precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier':[
  {title:'Stainless grade, condition and documents',body:'The listed stainless grades are alternatives. Specify the exact grade and condition for your part. Include treatment requirements and the service environment. Tell us which material or treatment documents you need. Confirm that they are available and can be traced to the material or parts supplied.'},
  {title:'Working diameters and shaft datums',body:'Identify which working diameters share an axis and which shoulders control axial location. Specify the required runout or other geometric control using the drawing datum system. If surface treatment is requested, identify which fits and thread features must satisfy acceptance after treatment.'}
 ],
 'precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier':[
  {title:'Electrical contacts and fluid fittings',body:'Electrical contacts and fluid fittings can have similar turned shapes but need different acceptance checks. State whether conductivity, sealing, mechanical attachment or heat transfer controls the design. Provide alloy requirements and material restrictions; copper and brass are not interchangeable specifications.'},
  {title:'Contact areas and plating',body:'Mark contact or seal areas and specify edge requirements, with any plating specification and dimensions to check after plating. Agree the conditions and limits for any functional test. No measured electrical or pressure performance is available for this example.'}
 ],
 'precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances':[
  {title:'Polymer grade and measurement conditions',body:'Specify the polymer grade and fillers, with the operating environment. State any required moisture conditioning or measurement temperature on the drawing or inspection request. Agree the measurement conditions under which the specified fit dimensions must be met.'},
  {title:'Thin sections and assembly loads',body:'Identify the thin sections and pocket walls essential to function, with the hole relationships. Mark where radius or thickness changes may be proposed. Include insertion loads or clamping constraints. Agree any geometry changes and inspection arrangements; achievable tolerances depend on the drawing and measurement conditions.'}
 ],
 'small-batch-cnc-machining-manufacturer-complex-aluminum-housings':[
  {title:'Lid, gasket and mounting fit',body:'Provide the mating lid or gasket interface and identify the mounting datums. Specify the faces that control closure, with any fitted bores or threads. For environmental sealing, supply the target test and acceptance criteria. Housing geometry alone does not establish an ingress-protection rating.'},
  {title:'Finish checks and batch reports',body:'Mark cosmetic exterior surfaces and masked interfaces, with dimensions to check after finishing. State which reports you need for the first article and later batches, with quantities for each revision. Confirm the sample and inspection plan with us before ordering.'}
 ]
};
export const productDetails:Record<string,ProductDetail> = Object.fromEntries(
 Object.entries(entries).map(([slug,[scope,drawing,inspection,rfq]])=>[slug,{scope,drawing,inspection,rfq,considerations:deeper[slug]}])
);
export function productDetail(product:{slug:string}):ProductDetail {
 const detail=productDetails[product.slug];
 if(!detail) throw new Error('Missing engineering guidance: '+product.slug);
 return detail;
}

// Page copy combines the corresponding detail, summary and selection guidance,
// with drawing inputs from castingReview and conditions from manufacturing.
// Material/process/finish options, applications and deeper guidance remain in
// their own sections. Original entries above remain available to other readers.
export type ProductPageRequirements = {intro:string; drawing:string; inspection:string; notes:string[]};
type PageRequirementInput = [intro:string,drawing:string,inspection:string,notes:string[]];
const pageRequirementEntries:Record<string,PageRequirementInput> = {
  "custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm": [
    "The central opening, stepped bores and face holes share the same circular reference surfaces.",
    "Send a 3D model and dimensioned drawing. Give the bore diameters, step depths and fits, with the face holes located by pitch-circle diameter or hole-center coordinates. Identify the datums and any mating-bore or fastener requirements. Show additional pockets on the drawing.",
    "Specify diameter and depth checks for each bore step. Hole positions and the flatness or orientation of the circular faces are measured from the drawing datums.",
    [
      "Include the material grade and order quantity."
    ]
  ],
  "custom-oem-high-precision-cnc-milling-manufacturer": [
    "Instrument blocks and valve bodies often combine mounting faces with intersecting internal passages. Brackets require the same care in locating mounting interfaces.",
    "Locate passages and mounting holes from the assembly datums. Include thread specifications and sections through intersecting holes, and mark inaccessible edges. If you have a part but no complete drawing, ask about reverse engineering.",
    "Define the hole-position and mating-face checks for your assembly. Cleanliness and leak tests require separate criteria. Specify any first-article, in-process, final or pre-shipment checks needed for the order.",
    [
      "State the material grade."
    ]
  ],
  "ultra-high-precision-machining-services": [
    "An impeller model defines the blade contours and root transitions around the hub. Thin sections and deep pockets also affect tool access.",
    "Send the controlling model, with the datum axis and critical blade profiles identified. Mark thin sections and restricted tool access. State the material condition and tolerances for the features that matter to the assembly.",
    "Mark the profiles that need measurement and tell us which records you need. For balance or rotating-assembly tests, agree the procedures and acceptance limits separately.",
    [
      "Tolerances are assessed for the individual drawing; no numerical tolerance is specified for this example."
    ]
  ],
  "global-oem-precision-machining-solutions": [
    "These ring housings and cylindrical components combine turned diameters with angled or milled features for hydraulic systems, instruments and vehicle assemblies.",
    "Locate mounting faces and off-axis features from the turned axis. Include mating geometry and critical interface dimensions on the same drawing so we can plan both turning and milling.",
    "Define runout, feature-position and thread checks using one datum scheme. The quotation confirms the measurement methods and acceptance limits.",
    []
  ],
  "global-manufacturer-of-multi-sided-precision-machined-components": [
    "Ports and bolt patterns extend across several faces of these components. Shared datums relate the fluid connections to the structural mounting features.",
    "Provide a complete model showing angled ports and mounting faces. Identify the shared datums, with port standards and mating-hardware details. Include assembly clearances so we can check tool access and the need for repeated clamping.",
    "Specify position and face-orientation limits on the drawing. Add separate sealing-test requirements where the application needs them.",
    []
  ],
  "custom-oem-cnc-turning-manufacturer": [
    "Shafts, sleeves and flanged parts are machined around a functional axis. The stepped diameters and shoulders control their fit in fluid systems, instruments and motors.",
    "Show the turned profile and mating fits on the drawing. Reference working diameters and shoulders to the functional axis, and dimension grooves and any secondary flats or cross-holes.",
    "Specify the diameter, axial-length and runout checks needed for assembly. Include thread-gauge requirements where relevant.",
    [
      "Include the stock grade, finish and quantity."
    ]
  ],
  "custom-rotary-cylindrical-components": [
    "Cross-holes, slots and flats add off-axis features to a turned part. Their angular relationship matters as well as the turned profile.",
    "Send a model showing hidden intersections. Define the orientation of secondary features relative to the shaft axis and one another. Identify the features used to locate the part during assembly.",
    "Specify checks for feature orientation and thread engagement. Include burr limits at intersecting holes.",
    []
  ],
  "custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer": [
    "A fitting connects through its threads and sealing surfaces. Hose barbs, adapters and flanges need the mating connection defined before machining.",
    "Provide the mating-connector details and the thread standard for each connection. Dimension the seal grooves and contact face. NPT, BSPT and metric threads are available options; state the required standard.",
    "Specify thread gauges and seal-surface acceptance. Pressure or leak testing requires a procedure and an acceptance limit.",
    [
      "Include the alloy and, where relevant, the fluid and operating temperature."
    ]
  ],
  "full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing": [
    "These blocks, brackets and housings need their final dimensions considered together with the surface treatment. Visible faces may also require a separate appearance reference.",
    "Mark cosmetic faces and fitted bores on the drawing. Identify dimensions that apply after finishing, and surfaces that must remain untreated. Include a finish specification and any color or texture reference.",
    "State which dimensions must be checked after finishing. Define cosmetic acceptance separately from dimensional limits.",
    []
  ],
  "custom-high-precision-machining-for-structural-aesthetic-components-oem": [
    "Mounting features and load-carrying geometry determine the fit of these structural parts. Visible curves, engraving and color need their own appearance requirements.",
    "Show the mounting arrangement. Distinguish mating and structural features from decorative surfaces and weight-reduction profiles. Include artwork for engraving and an approved finish reference.",
    "Specify interface checks against the drawing. Use the finish reference to define appearance acceptance.",
    [
      "Choose the material for the structural requirements and the proposed finish."
    ]
  ],
  "high-volume-cnc-turning-for-complex-internal-external-features": [
    "Stepped bores and internal grooves can be difficult to measure in sleeves, bushings and valve cores. Access for inspection is planned alongside machining.",
    "Provide section views through internal steps and seal grooves. Dimension the seal lands and identify features that are difficult to reach with a gauge.",
    "Specify first-article checks and later sampling for critical internal dimensions. Batch consistency checks or statistical process control must be included in the agreed inspection plan.",
    [
      "Give the quantity and date for each order, with the reports you need. We assess capacity against that schedule."
    ]
  ],
  "high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem": [
    "Fluid-system parts combine curved profiles with ports and sealing faces. The contour model must also locate those interfaces.",
    "Send the current model revision. Define the datum axis and sealing interfaces, with the ports located from the same references.",
    "Specify profile and interface checks, including any CMM comparison with the 3D model. Include the required reports and traceability. Flow, balance or leak tests need separate acceptance criteria.",
    [
      "Agree who will test functional performance. No efficiency or reliability rating has been established for this example."
    ]
  ],
  "custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier": [
    "An intercooler prototype combines machined end tanks and ports with a cooling core and welded joints. Fitment is checked against the vehicle installation.",
    "Send the assembly model showing the end tanks and port orientation relative to the core. Include mounting points and the interfaces between machined and welded parts. Identify customer-supplied components and distinguish CNC machining from TIG joining.",
    "Mark the interfaces to check after fabrication. If you need pressure or leak testing, provide the procedure, test pressure and medium, with the acceptance criteria.",
    [
      "State the material for each component and how you plan to validate the assembly. Cooling performance requires separate testing."
    ]
  ],
  "custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier": [
    "The visible contour is only one part of an engine-cover drawing. The underside must fit the mating perimeter and clear nearby engine components.",
    "Locate mounting holes from the assembly datums. Show wall sections and fastener access, with hood, camshaft and sensor clearances. Include gasket or seal details where applicable, and specify the finish on visible surfaces.",
    "Specify checks for the mating face and mounting pattern, with the required clearances. Define appearance acceptance separately for the outer contour.",
    [
      "State the alloy and temper."
    ]
  ],
  "custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier": [
    "These intake prototypes use runner transitions and multi-piece flanges to connect the engine to a plenum or turbo piping. The assembly model defines those relationships.",
    "Send the full STEP or IGES model and mating-port drawing. Define runner transitions and port spacing, with the flange positions relative to the engine and connected piping.",
    "Specify interface and passage checks for prototype fitment. Pressure-test conditions and any flow tests are agreed separately.",
    [
      "Explain the purpose of the prototype evaluation."
    ]
  ],
  "custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier": [
    "A throttle-body housing locates the airflow bore and shaft within the motor and gear-drive assembly. Bore alignment and actuator clearance are defined by the mating components.",
    "Provide the mating-shaft and throttle-plate details, with the motor envelope. Locate shaft bores from the airflow bore and assembly datums. Specify bearing and actuator fits, and clarify whether the order covers the housing or an assembled unit.",
    "Specify bore-size, shaft-alignment and mating-feature checks. Actuation and leakage tests require separate criteria and an agreed test procedure.",
    [
      "Include the material and finish. Identify who evaluates the assembled prototype; machining the housing does not establish electronic control performance."
    ]
  ],
  "custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier": [
    "Injector axes and fuel-rail mounts must be located relative to the curved runners and engine ports. The model also needs enough clearance for installation.",
    "Send the current STEP or IGES model, with injector and rail interface drawings. Reference the mounting features to the intake ports and assembly datums. Show installation, engine-bay and hood clearances so we can check machining access.",
    "Specify position and injector-alignment checks for prototype fitment. Include sealing criteria and any functional tests as separate requirements.",
    []
  ],
  "custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier": [
    "A billet plenum has a defined internal volume, with transitions to the throttle flange and intake runners. Split lines and fastener access must be shown in the assembly.",
    "Provide the internal geometry and mating-throttle details. Show transitions and runner interfaces, with fastener access and any split-line seal. Include the finish specification.",
    "Specify flange and passage checks, with appearance requirements where needed. Pressure ratings and sealing tests require their own conditions and acceptance limits.",
    [
      "Provide the geometry needed to meet the design target."
    ]
  ],
  "custom-cnc-machined-castings-transmission-housings-pump-bodies": [
    "Cast surfaces locate the blank before bores and sealing flanges are finish-machined. Internal splines, gear features and fluid channels need section views and suitable access.",
    "Send casting and finished-part drawings. Show machining allowance and datum targets, with the transfer from casting to machined datums. Identify blank supply, alloy and condition. Ask about 2D/3D model development if the drawings are incomplete.",
    "Set incoming-blank acceptance and responsibility for casting defects before machining. Specify dimensional checks from the finished-part datums, including any CMM verification. Identify the inspection stages required and agree pressure-integrity tests separately.",
    []
  ],
  "custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier": [
    "Working diameters and shoulders locate these stainless shafts and valve stems in the assembly. Cross-holes and milled flats also need angular references.",
    "Define the functional axis and mating fits. Locate live-tooled features from the shaft datums. If the order includes a locking mechanism, show its travel and engagement and define the assembly supplied.",
    "Specify diameter, runout and thread-gauge checks. Mark sliding or sealing regions with their surface requirements.",
    [
      "Include the stainless grade and condition, operating environment and treatment."
    ]
  ],
  "custom-oem-cnc-machined-non-metallic-components-insulating-parts": [
    "Slotted plates, insulating barriers and wear components are machined from polymer or composite stock. Material properties are specified for the operating conditions.",
    "State the exact grade and required properties. Locate slots and holes from assembly datums, and show pockets or barriers in the model. Include the loads and service environment.",
    "Specify dimensional and edge checks for the chosen material. Electrical or material tests require separate criteria.",
    [
      "Include material-selection limits and any compliance documents required. Electrical suitability must be established for the application."
    ]
  ],
  "custom-oem-cnc-machined-plastic-parts-manufacturer": [
    "Milled and turned plastics are used for seals, wear plates and structural supports. Guides, gears and rollers also require a grade suited to their working surfaces.",
    "Identify the polymer grade and fillers. Define the milled or turned geometry, with interference fits and loads on the assembled part.",
    "Specify measurement conditions and mating dimensions. Include surface, cleanliness and material-handling requirements for the selected grade.",
    [
      "State the operating environment and function. The polymer options have different properties and are not interchangeable."
    ]
  ],
  "oem-precision-cnc-machined-casting-housing-structural-enclosures": [
    "Ribs and deep cavities restrict fixture access around the bearing bores of a cast enclosure. The drawing relates those bores to the mounting and mating faces.",
    "Send the blank and finished-part models where available. Include casting condition and allowance, with wall sections and bearing-bore relationships. Mark accessible fixture surfaces and the areas left as cast.",
    "Specify bore-alignment and mating-face checks from the drawing datums. Set acceptance criteria for as-cast areas and identify the CMM reports required.",
    []
  ],
  "oem-precision-cnc-machined-casting-housings": [
    "These transmission and pump housings combine reinforced ribs with machined central bores, splines and mating faces. Sample reconstruction begins by establishing those relationships.",
    "Send blank details and available drawings. For reconstruction, include sample photographs and mating-part information, and identify features to retain or change. Define the controlling bore-to-face and spline dimensions before quotation. Confirm casting material and condition, with allowance and treatment requirements.",
    "Specify spline and bore-alignment checks using defined datums. Include any first-article, in-process, final or pre-shipment inspections needed for the housing.",
    []
  ],
  "precision-cnc-machined-castings-custom-oem-housings": [
    "Sealing faces, bearing fits and tapped mounting holes are finish-machined for assembly. Their positions are referenced to the casting datums.",
    "Send the casting specification and finished drawing. Include seal-face requirements and thread callouts, with bearing-fit limits. Distinguish stock allowance from finished wall thickness so the fixture can locate the irregular blank.",
    "Specify face, fit and thread checks. Set limits on exposed casting defects at functional surfaces, and identify the CMM or gauge records required.",
    [
      "Identify who supplies the casting."
    ]
  ],
  "precision-cnc-machined-castings-manufacturer": [
    "Hidden splines, gear features and flow paths require access for both machining and measurement. The finished flange datums relate them to the assembly.",
    "Send section views or the approved model showing internal features located from the flange datums. Include interface limits and proposed measurement access. Identify the blank source and alloy condition, and whether a complete model or a sample is available.",
    "Define incoming-blank acceptance and material verification. Specify CMM checks and dimensional acceptance limits. Fluid-integrity testing is agreed separately.",
    []
  ],
  "precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances": [
    "Thin walls and deep pockets affect the setup for these plastic components. Angled holes and mating surfaces also need clear references in the model.",
    "Send the model and polymer grade. Dimension walls and pocket depths, with hole relationships and mating interfaces. State the condition in which dimensions must be met, and identify permitted radius or thickness changes.",
    "Specify measurement conditions and the dimensional checks for assembly. Include surface requirements and any stability criteria for the selected polymer.",
    [
      "Set tolerances for each critical feature. No general tolerance is specified for this example."
    ]
  ],
  "precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier": [
    "Copper and brass components may serve as electrical contacts, thermal parts or fluid fittings. The function determines the alloy and the surfaces requiring inspection.",
    "Provide mating-part details. Distinguish contact areas from fluid seals, and include thread and fastening specifications. Mark dimensions that apply after plating or other finishing.",
    "Specify dimensional and thread-gauge checks, with burr and surface limits. Conductivity and pressure tests require separate acceptance criteria suited to the function.",
    [
      "State the alloy designation and any material restrictions."
    ]
  ],
  "precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier": [
    "A pilot build may combine milled housings with turned parts and machined castings. Each component needs its own specification, with shared assembly interfaces identified.",
    "Send a part list giving each part number and revision, with material and quantity. Identify the machining processes required and any components that must fit together.",
    "Specify first-article checks and later sampling by part number. Include batch-control and reporting requirements in the quotation request.",
    [
      "Give quantities for the initial order separately from forecast demand."
    ]
  ],
  "precision-machining-for-functional-plastic-blocks-structural-components": [
    "Mounting faces locate the hole patterns and inserts in these thick plastic guides and supports. Assembly loads matter when choosing the material and fixture.",
    "Reference through-holes and blind depths to the mounting faces. Include insert specifications where applicable, with the polymer grade and mounting arrangement.",
    "Specify hole-alignment and depth checks. Define flatness and parallelism limits under the required measurement conditions.",
    []
  ],
  "precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures": [
    "Compound-angle features and thin walls need support during enclosure machining. The starting stock may be billet or a cast blank.",
    "Send a model showing pocket depths and wall sections, with angled features referenced to mating datums. Identify stock form and alloy condition, and include quantity per revision and the finish specification.",
    "Specify flatness and hole-position limits. Include batch sampling or reporting requirements, and identify dimensions accepted after finishing.",
    []
  ],
  "precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier": [
    "Stainless shafts and fittings have bearing or sliding diameters and threaded interfaces. Slender sections require a defined datum axis.",
    "State the stainless grade and condition, with fits and thread standards on the drawing. Mark the datum axis for slender sections and the dimensions that must meet their limits after passivation or electropolishing.",
    "Specify diameter, runout and thread-gauge checks. Include surface acceptance after any requested treatment.",
    [
      "Include the service environment and required material or treatment records. The listed examples are not all identified as 316L."
    ]
  ],
  "precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier": [
    "A locking pin must match the mating hole and provide the specified engagement and travel. The order may cover a machined component or a complete spring-loaded assembly.",
    "Send an assembly drawing showing the mounting thread and mating hole. Define pin travel and engagement, and include spring requirements where applicable. State the assembly to be supplied.",
    "Specify fit, alignment and thread-gauge checks, with the required surface finish. Actuation-force and cycle tests need separate criteria.",
    [
      "Identify who carries out functional validation."
    ]
  ],
  "small-batch-cnc-machining-manufacturer-complex-aluminum-housings": [
    "The lid or gasket interface controls enclosure closure. Deep cavities and thin walls require support while mounting and sealing surfaces are machined.",
    "Locate mounting points and closure interfaces from the assembly datums. Mark seal faces and thin sections, with cosmetic surfaces and masked fits. Include alloy, temper and finish requirements.",
    "Specify flatness, mounting-pattern and finish checks, with the batch acceptance plan. Any environmental test or ingress-protection rating requires separate test criteria.",
    []
  ],
  "small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv": [
    "Mixed-part pilot runs need material and revision control for every component. Shared interfaces and matched parts must be identified before production.",
    "List the material, drawing revision and order quantity for each part number. Explain the functional requirements and identify parts that must fit together.",
    "Agree how the first parts will be approved and how later batches will be sampled and traced. State what the first-article report should contain and which features to check during production.",
    [
      "Include requested dates."
    ]
  ]
};
const pageRequirements:Record<string,ProductPageRequirements> = Object.fromEntries(
 Object.entries(pageRequirementEntries).map(([slug,[intro,drawing,inspection,notes]])=>[slug,{intro,drawing,inspection,notes}])
);
export function productPageRequirements(product:{slug:string;name:string}):ProductPageRequirements {
 const requirements=pageRequirements[product.slug];
 if(!requirements) throw new Error('Missing product page requirements: '+product.slug);
 return requirements;
}
