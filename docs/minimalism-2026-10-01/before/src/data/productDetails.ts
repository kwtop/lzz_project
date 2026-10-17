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
  'Provide passage geometry, thread specifications, assembly references and material grade; do not rely on the exterior photograph.'
 ],
 'ultra-high-precision-machining-services':[
  'Contoured impellers and housings need a controlling model and feature-specific tolerances. No numerical tolerance is specified for this example.',
  'Identify blade profiles, root transitions and the datum axis. Mark thin sections and tool-access restrictions.',
  'Agree the profiles to measure and any separate balance or rotating-assembly tests.',
  'Supply the controlling model, material condition, critical profiles and acceptance criteria for the intended operating context.'
 ],
 'global-oem-precision-machining-solutions':[
  'Components that combine turned forms with angled or milled features.',
  'Define the relationship between the turned axis, mounting faces and off-axis features so the machining route can be assessed.',
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
  'The catalog example covers shafts, sleeves and flanged rotational parts.',
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
  'Include section views, quantities per release and report requirements so production suitability can be assessed.'
 ],
 'high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem':[
  'Fluid-system components with contours and impeller features. No efficiency or reliability rating is established for this example.',
  'Identify the controlling contour model, ports, datum axis and sealing interfaces.',
  'Define profile and interface checks; specify any flow, balance or leak validation as a separate requirement.',
  'Send the model revision and state who will validate each functional requirement.'
 ],
 'custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier':[
  'This cooling-assembly example helps define fitment and fabrication requirements. It provides no proof of cooling performance.',
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
  'Intake-runner and flange geometry for prototype development.',
  'Define runner transitions, port spacing and flange relationships to the mating engine and plenum.',
  'Specify interface and passage checks. Agree any pressure or flow tests separately.',
  'Include the full assembly model, mating-port drawing and the objective of the prototype evaluation.'
 ],
 'custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier':[
  'The throttle-body example covers mechanical housing interfaces. Electronic control performance has not been established.',
  'Define the main bore, shaft-bore relationship, mounting flange and motor or gear-chamber interfaces from named datums.',
  'Agree bore size, alignment and mating-feature checks. Functional actuation or leakage criteria must be specified separately.',
  'Provide mating shaft and plate requirements, motor envelope, material and finish, and identify who evaluates the assembled prototype.'
 ],
 'custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier':[
  'Intake runners with injector bosses and fuel-rail mounts.',
  'Locate injector axes and fuel-rail mounts relative to the intake ports and assembly datums.',
  'Agree positional and fitment checks, with separate criteria for sealing interfaces and any requested functional tests.',
  'Supply injector and rail interface drawings, installation clearances and the current manifold model revision.'
 ],
 'custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier':[
  'Billet plenums with internal transitions and a throttle mounting flange. This example makes no power-gain claim.',
  'Define the internal envelope, flange interface, fastener access and any split-line sealing detail.',
  'Agree flange and passage checks, appearance requirements and any separate leak or pressure acceptance.',
  'Provide the intended volume geometry, mating-throttle details and finish specification rather than a performance target alone.'
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
  'Insulating plates and non-metallic wear components. The image does not establish electrical suitability.',
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
  'Agree spline inspection and bore alignment using defined datums. Sample appearance cannot establish these relationships.',
  'Supply available drawings and blank details, and list unknown dimensions that require clarification before quotation.'
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
  'Agree first-article checks and subsequent sampling for each part. One unspecified batch requirement is insufficient.',
  'Provide the part list, release quantities and document needs, and distinguish forecast demand from the initial order.'
 ],
 'precision-machining-for-functional-plastic-blocks-structural-components':[
  'Thick polymer blocks used as guides or equipment supports.',
  'Define hole patterns, blind depths and insert locations relative to mounting faces, with assembly loads identified.',
  'Agree hole alignment, depth, flatness and parallelism checks under specified measurement conditions.',
  'Include the polymer grade, insert specifications where applicable and the mounting arrangement.'
 ],
 'precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures':[
  'Short-run aluminum enclosures with pockets, thin walls and compound-angle features.',
  'Define wall sections and mating datums. Identify whether the stock is billet or a cast blank so the machining route can be assessed.',
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
  'Locking pins and mating control hardware. The part image does not establish assembly performance.',
  'Define pin travel, engagement geometry, mounting thread and the mating hole. Clarify whether the inquiry is for a component or a complete assembly.',
  'Agree fit and alignment checks and any separate actuation-force or cycle-test requirements.',
  'Supply the assembly drawing, spring requirements if applicable and the responsibility for functional validation.'
 ],
 'small-batch-cnc-machining-manufacturer-complex-aluminum-housings':[
  'Industrial and electronic enclosures with deep cavities and sealing interfaces.',
  'Locate mounting points and seal faces, and mark thin sections, masked fits and cosmetic exterior faces.',
  'Agree flatness, mounting-pattern and finish checks; an enclosure example does not imply a tested ingress-protection rating.',
  'Provide alloy, temper, lid or gasket interfaces, finish requirements and any requested environmental testing.'
 ],
 'small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv':[
  'Repeat small batches with material and finish specified for each part number, including the catalog aluminum, stainless steel, brass and engineering-plastic options.',
  'Assign material, revision and functional requirements to each part, and identify common interfaces or matched items.',
  'Agree initial approval evidence, sampling and traceability needs for each release.',
  'Include quantities per part and release, with material choices and reporting needs. Give your requested dates so availability can be checked.'
 ]
};
const deeper:Record<string,{title:string;body:string}[]> = {
 'custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier':[
  {title:'Shaft, bore and throttle-plate fit',body:'The main-bore diameter does not fully define its relationship to the shaft and throttle plate. Supply the mating components or their controlled interface drawings, with the shaft datum and required clearance or fit. Select any published fit designation for your design rather than copying it from the example.'},
  {title:'Housing supply and functional tests',body:'Identify the motor, gear and sealing features to be supplied. If you need an assembled actuation or leakage test, specify the assembly condition and test procedure. Specify acceptance criteria, and confirm test feasibility and responsibility.'}
 ],
 'custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier':[
  {title:'Core, end tanks and supplied components',body:'Show the core, end tanks, ports and brackets in one assembly model. Identify customer-supplied components and specify the material of each component; one alloy may not apply to the whole assembly. The quotation needs to distinguish machining and joining from supplied items.'},
  {title:'Installation checks and pressure testing',body:'Identify the mounting and port dimensions to check after joining for correct installation. For a requested pressure test, supply the procedure, test conditions and acceptance criteria. Test feasibility needs confirmation. A leak check alone would not establish cooling effectiveness or suitability for a particular vehicle.'}
 ],
 'custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier':[
  {title:'Underside clearance and seal interfaces',body:'Define the underside as well as the visible cover contour. Show fastener access and clearance to adjacent parts. If the cover uses a gasket or seal, provide the interface and mating-face requirements; the photograph cannot define them.'},
  {title:'Visible finish and masked fits',body:'Mark cosmetic faces and areas where tool-path texture is acceptable. Specify the anodized or polished finish and supply an appearance reference if available. Before accepting a finish proposal, agree how to check masked fits and finished dimensions.'}
 ],
 'custom-cnc-machined-castings-transmission-housings-pump-bodies':[
  {title:'Casting allowance and blank acceptance',body:'Supply casting and finished-part drawings showing datum targets and material available for removal. Agree who accepts the incoming blank and how to handle insufficient allowance or a casting defect at a seal face. A finished-part image cannot establish those responsibilities.'},
  {title:'Internal features and inspection access',body:'Use sections and detail views to define splines, channels and bearing interfaces hidden from the exterior model. Specify gauges or reporting requirements for inaccessible features. Agree pressure-integrity or defect examinations separately from dimensional inspection.'}
 ],
 'precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier':[
  {title:'Stainless grade, condition and documents',body:'The catalog presents stainless grades as alternatives. Specify the exact grade and condition for your part, along with treatment requirements and the service environment. Request any essential material or treatment documents so their availability and traceability to the proposed supply can be confirmed.'},
  {title:'Working diameters and shaft datums',body:'Identify which working diameters share an axis and which shoulders control axial location. Specify the required runout or other geometric control using the drawing datum system. If surface treatment is requested, identify which fits and thread features must satisfy acceptance after treatment.'}
 ],
 'precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier':[
  {title:'Electrical contacts and fluid fittings',body:'An electrical contact and a fluid fitting need different acceptance information even when their turned shapes look similar. State whether conductivity, sealing, mechanical attachment or heat transfer is the controlling function. Provide alloy requirements and material restrictions instead of treating copper and brass as interchangeable.'},
  {title:'Contact areas and plating',body:'Mark contact or seal areas and specify the edge requirements. Include any plating specification and identify dimensions to check after plating. If you need a functional test, agree its conditions and limits; the catalog provides no measured electrical or pressure performance.'}
 ],
 'precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances':[
  {title:'Polymer grade and measurement conditions',body:'Specify the polymer grade and fillers, together with the operating environment. If moisture conditioning or measurement temperature matters to the design, state the conditions on the drawing or inspection request. Without agreed measurement conditions, dimensional requirements may leave the intended fit unclear.'},
  {title:'Thin sections and assembly loads',body:'Identify the thin sections and pocket walls essential to function, along with the hole relationships. Mark where radius or thickness changes may be proposed, and include insertion loads or clamping constraints. Agree any geometry changes and inspection arrangements. Achievable tolerances need review against your drawing and measurement conditions.'}
 ],
 'small-batch-cnc-machining-manufacturer-complex-aluminum-housings':[
  {title:'Lid, gasket and mounting fit',body:'Provide the mating lid or gasket interface and identify the mounting datums. Specify the faces that control closure and any fitted bores or threads. If environmental sealing is an objective, supply the target test and acceptance criteria; housing geometry alone cannot establish an ingress-protection rating.'},
  {title:'Finish checks and batch reports',body:'Mark cosmetic exterior surfaces and masked interfaces, with dimensions to check after finishing. State first-article and later-batch reporting needs alongside quantities per revision. Sample requests and sampling plans remain proposals until the inspection requirements are agreed.'}
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
