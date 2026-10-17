// Page-specific reading order built from productSummaries, productDetails and
// manufacturing. Feature notes are drawing-review guidance, not measured specs.
export type FeatureNote = {title:string; body:string};
type ReadingEntry = {lead:string; features:FeatureNote[]; title?:string};
const feature=(title:string,body:string):FeatureNote=>({title,body});
export const productReading:Record<string,ReadingEntry>={
 'ultra-high-precision-machining-services':{
  title:'Custom CNC Impeller Machining',
  lead:'LZZ machines custom impellers with curved blades, root transitions and central hub features to your drawing. Send the controlling model, material grade and critical requirements so we can review the machining and inspection scope.',
  features:[feature('Blade profiles','Use the controlling 3D model to define the curved blade surfaces. Identify the profiles that need inspection and the limits that matter to your design.'),feature('Blade roots & tool access','The transitions between blades and hub affect cutter access. Mark thin sections and any areas where a radius or thickness change needs approval.'),feature('Hub bore & datum axis','Define the hub bore, mating fit and datum axis together. Identify the relationships between the hub and blade geometry on the drawing.')],
 },
 'custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm':{
  lead:'Custom circular components with bores, pockets and features on several faces. LZZ reviews the model and datum scheme to select a milling setup and agree how the important interfaces will be checked.',
  features:[feature('Bore relationships','Locate each bore from the drawing datums. Identify the holes that must align with mating components.'),feature('Pockets & wall sections','Show pocket depths and the walls between openings. Mark permitted corner radii and restricted tool access.'),feature('Features on several faces','Define the relationships between faces in one model. Agree which dimensions must be held across machining setups.')],
 },
 'custom-oem-high-precision-cnc-milling-manufacturer':{
  lead:'LZZ machines instrument blocks, brackets and manifold-style parts from your drawing. Specify the bores, mounting interfaces and passages that control assembly so the machining route can be reviewed before quotation.',
  features:[feature('Mounting faces','Identify the surfaces that locate the block or bracket in the assembly. Dimension the mounting holes from these datums.'),feature('Bores & internal passages','Use sections to show intersecting bores and hidden passages. State edge and cleanliness requirements for the intended use.'),feature('Access & workholding','Include the stock dimensions and faces available for clamping. If starting from a sample, agree the drawing before manufacture.')],
 },
 'global-oem-precision-machining-solutions':{
  lead:'Custom ring housings and components combining turned diameters with milled features. Provide the mating geometry and datum references so LZZ can plan the operations around the interfaces that matter.',
  features:[feature('Turned axis','Use a consistent datum axis for the central bore and outside diameters. Mark the fitted and sealing surfaces.'),feature('Angled & off-axis features','Locate milled faces and hole patterns relative to the turned geometry. Include any inaccessible internal details.'),feature('Assembly interfaces','Specify mating parts, threads and port requirements. State separate leak or cleanliness checks where the application needs them.')],
 },
 'global-manufacturer-of-multi-sided-precision-machined-components':{
  lead:'Multi-sided components with bores, ports and mounting features need a common datum scheme. LZZ reviews access to each face and the relationships that must be maintained through the machining sequence.',
  features:[feature('Multi-face datums','Relate the working faces and hole patterns to the same drawing datums. Mark the dimensions that cross between faces.'),feature('Ports & bores','Specify bore depths, intersections and connection details with sections where needed.'),feature('Setup access','Identify clamping restrictions and finished surfaces that must be protected during a later setup.')],
 },
 'custom-oem-cnc-turning-manufacturer':{
  lead:'LZZ produces custom turned shafts, sleeves and cylindrical parts to your drawing. Define working diameters, shoulders and mating fits so turning, secondary operations and inspection can be agreed together.',
  features:[feature('Working diameters','Identify bearing, sealing and assembly diameters. Specify each fit rather than relying on the photographed shape.'),feature('Shoulders & axial location','Dimension the shoulders and grooves that position the part along its axis.'),feature('Secondary features','Show flats, cross holes and other off-axis features, with their relationship to the turned datum.')],
 },
 'custom-rotary-cylindrical-components':{
  lead:'Custom cylindrical components can combine turning with flats, ports and cross holes. LZZ uses your model and drawing to review the relationship between the rotational axis and these secondary features.',
  features:[feature('Coaxial features','Define the axis shared by the working diameters and central bore. State the required geometric controls.'),feature('Flats & cross holes','Locate off-axis features from the turned datums so orientation is clear.'),feature('Mating surfaces','Specify the fit, edge condition and surface requirements where the part meets its assembly.')],
 },
 'custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer':{
  lead:'LZZ machines custom fittings, connectors and flanges for defined mating interfaces. Send the thread standards, seal geometry and mounting dimensions so the complete connection can be reviewed.',
  features:[feature('Threads & connections','Call out the thread standard, size and required gauge. NPT, BSPT and metric options are separate specifications.'),feature('Sealing features','Show the seal-contact faces and grooves. Supply mating details and any separate pressure-test requirements.'),feature('Flanges & tool access','Locate mounting holes, flats and wrenching features relative to the connection axis.')],
 },
 'full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing':{
  lead:'Custom metal components with machining and finishing requirements specified together. LZZ reviews the base material, functional dimensions and visible surfaces before agreeing the treatment and acceptance checks.',
  features:[feature('Functional dimensions','Mark bores, holes and faces that control fit. Identify which dimensions apply after finishing.'),feature('Visible surfaces','Separate appearance requirements from functional surface requirements. Provide a finish reference where available.'),feature('Protected areas','Specify threads, contacts and fitted areas that need masking or special handling during treatment.')],
 },
 'custom-high-precision-machining-for-structural-aesthetic-components-oem':{
  lead:'Custom structural components whose assembly fit and visible finish both matter. Define the load-bearing interfaces, cosmetic faces and treatment requirements so LZZ can review them as one machining scope.',
  features:[feature('Structural interfaces','Show mounting faces, holes and mating parts. State the dimensions that govern assembly.'),feature('Exterior contours','Identify cosmetic faces and where tool-path texture is acceptable.'),feature('Finish & markings','Specify the substrate, color reference and any engraved details. Identify dimensions that must remain within limits after treatment.')],
 },
 'high-volume-cnc-turning-for-complex-internal-external-features':{
  lead:'Turned valve cores, bushings and sleeves with internal and external working features. LZZ reviews the bore geometry, grooves and repeat-order requirements from the approved drawing.',
  features:[feature('Internal bores','Provide sections for bore depths, steps and internal grooves. Mark the surfaces that seal or guide mating parts.'),feature('External features','Relate shoulders, grooves and outside diameters to the working axis.'),feature('Repeat-order checks','Identify the drawing revision and critical features for sampling and batch records before production.')],
 },
 'high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem':{
  lead:'Custom turbine and fluid-system components with curved surfaces and complex interfaces. LZZ reviews the model, material and inspection requirements; operating performance tests are defined separately for the assembly.',
  features:[feature('Curved flow surfaces','Supply the controlling model for the contours and transitions. Mark the surfaces that require profile inspection.'),feature('Hub & mounting geometry','Define the common datums for bores, mounting faces and curved features.'),feature('Operating requirements','Identify the intended fluid and assembly context. Agree any balance, pressure or performance test separately from dimensional inspection.')],
 },
 'custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier':{
  lead:'Intercooler prototype components made around your assembly model and installation requirements. LZZ reviews the core, end tanks, ports and brackets to define machining, joining and any customer-supplied items.',
  features:[feature('Core & end tanks','Identify each supplied component and its material in the assembly model.'),feature('Ports & brackets','Locate the connections and mounting points against the vehicle packaging.'),feature('Test conditions','Provide procedures and acceptance limits for any requested pressure test. Cooling performance needs its own validation.')],
 },
 'custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier':{
  lead:'Custom billet aluminum engine covers made to your approved geometry. Include the underside, seal interfaces and adjacent components so LZZ can review clearance, machining access and the visible finish.',
  features:[feature('Underside clearance','Show the clearance to moving and adjacent components, including fastener access.'),feature('Seal & mounting faces','Define gasket interfaces and mounting datums with the mating-part information.'),feature('Visible finish','Mark cosmetic surfaces and areas where machining texture is acceptable. Agree finish and masked-fit requirements.')],
 },
 'custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier':{
  lead:'Custom intake components with runners, flanges and defined connection interfaces. Supply the assembly model so LZZ can review the internal geometry, machining access and installation clearances.',
  features:[feature('Runner geometry','Define the internal passages in the controlling model, with sections where access is restricted.'),feature('Flange interfaces','Show the port shape, sealing face and bolt pattern for each mating connection.'),feature('Installation envelope','Include adjacent components and available clearance. Any flow or pressure targets require separate acceptance criteria.')],
 },
 'custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier':{
  lead:'Machined throttle-body prototype housings based on your bore, shaft and actuator interfaces. LZZ reviews the supplied components and assembly fits before agreeing machining and any requested functional checks.',
  features:[feature('Bore & shaft','Define the main bore relative to the shaft and throttle plate.'),feature('Actuator interfaces','Identify motor, gear and bearing features in the supplied scope.'),feature('Assembly checks','Specify clearances and any leakage or actuation test, including the assembly condition and acceptance limits.')],
 },
 'custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier':{
  lead:'Custom billet intake manifolds with runner geometry, injector bosses and fuel-rail interfaces. Provide the controlling model and mating-part details so LZZ can review access, mounting relationships and engine-bay clearance.',
  features:[feature('Runners & ports','Define curved passages and port transitions in the model, with the required surface condition.'),feature('Injector & rail interfaces','Locate injector bores and fuel-rail mounts from the assembly datums.'),feature('Clearance & installation','Show nearby components and hood clearance. Agree installation and any pressure-test requirements separately.')],
 },
 'custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier':{
  lead:'Custom intake plenums with internal cavities, ports and mounting interfaces defined by your model. LZZ reviews machining access, assembly clearances and finish requirements before quotation.',
  features:[feature('Internal cavity','Supply the complete cavity geometry and wall sections. Identify restricted machining access.'),feature('Port transitions','Show the mating ports, sealing faces and fasteners in the same assembly context.'),feature('Finish & pressure requirements','Specify exterior appearance separately from internal surface requirements. Agree any pressure test and its acceptance limits.')],
 },
 'custom-cnc-machined-castings-transmission-housings-pump-bodies':{
  lead:'Secondary machining of cast transmission housings and pump bodies to finished-part requirements. Supply the casting and machining drawings so LZZ can review allowance, datum transfer and inspection access.',
  features:[feature('Casting allowance','Show the material available for removal and the incoming blank acceptance requirements.'),feature('Bearing & sealing interfaces','Locate fitted bores and sealing faces from agreed datum targets.'),feature('Hidden features','Use sections to define internal channels and splines. Agree gauges or inspection access for inaccessible geometry.')],
 },
 'custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier':{
  lead:'Custom stainless steel shafts and turned components with specified fits and surface requirements. LZZ reviews the working diameters, shoulders and material condition before planning the turning sequence.',
  features:[feature('Shaft datums','Identify which diameters share an axis and which shoulders locate the assembly.'),feature('Fits & threads','Call out mating fits and thread standards, with requirements after any treatment.'),feature('Surface condition','Mark bearing and sealing surfaces and state the stainless grade and condition.')],
 },
 'custom-oem-cnc-machined-non-metallic-components-insulating-parts':{
  lead:'Custom non-metallic insulators, guides and wear-related components made from a specified material. LZZ reviews geometry and assembly loads with the selected grade so machining and acceptance conditions can be agreed.',
  features:[feature('Material & environment','Specify the grade and relevant electrical, chemical or wear requirements for the application.'),feature('Holes & thin sections','Identify fragile sections and the relationships between holes and mounting faces.'),feature('Assembly loads','Show where the part is clamped or loaded. Agree fit and measurement conditions for the chosen material.')],
 },
 'custom-oem-cnc-machined-plastic-parts-manufacturer':{
  lead:'Custom machined plastic parts for prototypes and repeat orders. Provide the polymer grade, mating geometry and operating conditions so LZZ can review workholding, edge quality and fit requirements.',
  features:[feature('Polymer grade','State the polymer, fillers and material condition. Color alone does not specify the grade.'),feature('Mating geometry','Define the bores, slots and surfaces that guide or seal against another component.'),feature('Measurement conditions','Identify conditioning or temperature requirements where these affect acceptance of the dimensions.')],
 },
 'oem-precision-cnc-machined-casting-housing-structural-enclosures':{
  lead:'Machined cast housings with ribs, cavities, bearing bores and mounting faces. LZZ reviews the blank geometry and fixture access so the functional interfaces can be located from agreed datums.',
  features:[feature('Ribs & fixture support','Show the areas available for locating and clamping the casting.'),feature('Bearing bores','Define bore relationships and fits from the machining datums.'),feature('Mounting faces','Mark the faces to machine and the areas that must remain as cast.')],
 },
 'oem-precision-cnc-machined-casting-housings':{
  lead:'CNC machining of casting housings with bores, splines and mating faces. If the project starts from a sample, LZZ can discuss defining the model and finished-part drawing before the machining scope is agreed.',
  features:[feature('Sample & mating parts','Provide available drawings, sample photographs and information about the mating components.'),feature('Bores & splines','Define internal geometry with sections and required inspection access.'),feature('Finished faces','Agree the blank allowance and datum scheme before machining the mating surfaces.')],
 },
 'precision-cnc-machined-castings-custom-oem-housings':{
  lead:'Custom cast housings with machined sealing faces, bearing fits and mounting holes. Supply the casting specification and finished interfaces so LZZ can review fixtures, allowance and acceptance checks.',
  features:[feature('Seal faces','Mark flatness, texture and mating requirements on the relevant faces.'),feature('Bearing fits','Locate fitted bores from the agreed casting and machining datums.'),feature('Mounting features','Specify threads, hole relationships and the wall geometry remaining after machining.')],
 },
 'precision-cnc-machined-castings-manufacturer':{
  lead:'Machined castings with internal interfaces, flange datums and restricted inspection access. LZZ reviews the controlled model, blank condition and measurement approach before confirming the machining scope.',
  features:[feature('Flange datums','Locate internal and external features from clearly defined flange references.'),feature('Hidden interfaces','Supply sections for splines, channels and other geometry that cannot be judged from an exterior photograph.'),feature('Inspection access','Identify the gauges or measurement access needed for internal features. Agree fluid-integrity tests separately.')],
 },
 'precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances':{
  lead:'Custom plastic components with pockets, thin sections and critical mating features. LZZ reviews the polymer grade, model and measurement conditions before agreeing the machining and inspection requirements.',
  features:[feature('Pocket walls','Mark essential thin sections and areas where a radius or thickness change may be discussed.'),feature('Mating features','Relate bores and mounting holes to the assembly datums.'),feature('Polymer condition','Specify fillers, moisture conditioning and measurement temperature where the fit depends on them.')],
 },
 'precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier':{
  lead:'Custom brass and copper components for defined mechanical, fluid or electrical interfaces. State the alloy and intended function so LZZ can review machining, edge condition, plating and the required checks.',
  features:[feature('Alloy & function','Specify copper or brass by grade and standard, with any material restrictions.'),feature('Contact & seal areas','Mark the surfaces that carry current, transfer heat or form a seal.'),feature('Plating & final size','Identify the coating specification and dimensions to verify after plating.')],
 },
 'precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier':{
  lead:'Mixed-part pilot builds with part-specific machining and release requirements. LZZ reviews the drawings, quantities and shared interfaces to agree the scope for each component in the order.',
  features:[feature('Part & revision list','Assign an approved drawing revision to every part number.'),feature('Matched interfaces','Identify components that assemble together and the dimensions controlling their fit.'),feature('Release quantities','Give the quantity and requested release date for each part, with inspection and traceability needs.')],
 },
 'precision-machining-for-functional-plastic-blocks-structural-components':{
  lead:'Custom plastic blocks, guides and structural components made to your assembly requirements. LZZ reviews the working faces, inserts and loading points with the specified polymer grade.',
  features:[feature('Working faces','Mark guide, wear and locating surfaces and their required condition.'),feature('Inserts & holes','Specify insert interfaces and hole relationships, including the surrounding wall sections.'),feature('Clamping & loading','Show how the part is held and loaded in the assembly. Agree the conditions for measuring fitted dimensions.')],
 },
 'precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures':{
  lead:'Custom aluminum enclosures with angled faces and thin-wall machining features. LZZ reviews the datum scheme, fixture access and finish requirements for the prototype or batch described in your drawing.',
  features:[feature('Angled interfaces','Locate mounting and mating features from consistent references across the angled faces.'),feature('Thin walls & pockets','Show wall thicknesses and pocket depths, with the areas that need support during machining.'),feature('Repeated setups','Identify the dimensions to control through the batch and those to check after exterior treatment.')],
 },
 'precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier':{
  lead:'Custom stainless steel turned parts with grade, condition and fitted dimensions specified on the drawing. LZZ reviews the material documents and treatment requirements with the working interfaces.',
  features:[feature('Stainless specification','Select the exact grade and condition; listed grades are alternatives, not the confirmed material of every example.'),feature('Working diameters','Define common axes and the shoulders that control axial location.'),feature('Treatment & acceptance','State the fits and threads that must meet acceptance after passivation or other specified treatment.')],
 },
 'precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier':{
  lead:'Custom indexing plungers and locking pins for defined engagement and mounting interfaces. LZZ reviews the pin geometry and supplied assembly scope from your drawing; spring and functional requirements need separate specification.',
  features:[feature('Engagement end','Define the pin diameter, engagement length and shape of the mating feature.'),feature('Mounting & adjustment','Specify the mounting thread, shoulder location and installation clearance.'),feature('Assembly scope','Identify spring, handle and other supplied components, with any travel or force requirements to be agreed.')],
 },
 'small-batch-cnc-machining-manufacturer-complex-aluminum-housings':{
  lead:'Custom aluminum housings with lid, gasket and mounting interfaces. LZZ reviews the thin-wall geometry, closure requirements and finish checks for your specified batch.',
  features:[feature('Lid & gasket','Provide the mating lid and seal geometry, with the faces that control closure.'),feature('Mounting datums','Locate fitted bores, threads and mounting holes from the assembly references.'),feature('Finish & batch checks','Mark cosmetic faces and masked interfaces. Agree the features and records needed for initial approval and later batches.')],
 },
 'small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv':{
  lead:'Custom mixed-material components for pilot production and repeat small batches. LZZ reviews the material, finish, revision and release quantity for each part number before agreeing the order.',
  features:[feature('Material per component','Assign a material grade and condition to each part rather than one material for the whole batch.'),feature('Revision control','Identify approved drawings, matched components and any changes between releases.'),feature('Inspection per release','Agree initial approval evidence, later sampling and the traceability references for each batch.')],
 },
};

export function readingFor(slug:string):ReadingEntry {
 const reading=productReading[slug];
 if(!reading)throw new Error('Missing product reading content: '+slug);
 return reading;
}

export function productQuestion(slug:string,tags:string[]):{question:string;answer:string} {
 if(/impeller|ultra-high-precision|turbine/.test(slug)) return {question:'Does the machining quote include balancing?',answer:'Balancing and rotating-assembly tests need a separate agreement. Provide the assembly condition, test procedure and acceptance limits so availability and responsibility can be confirmed before ordering.'};
 if(/indexing-plunger/.test(slug)) return {question:'Can the pin be supplied as a working assembly?',answer:'Identify the pin, spring, handle and other items in the supply. State the engagement, travel and force requirements so the assembly scope and functional checks can be confirmed.'};
 if(/intercooler|intake|throttle/.test(slug)) return {question:'Are pressure or functional tests included?',answer:'Specify any pressure, leakage or actuation test separately, with the assembly condition and acceptance limits. The quotation must confirm the supplied components, test availability and responsibilities.'};
 if(/casting/.test(slug)) return {question:'What information is needed for the casting blank?',answer:'Send the casting and finished-part drawings, blank source and condition, machining allowance and datum targets. Agree incoming-blank acceptance and responsibility for casting defects before machining.'};
 if(tags.includes('Plastic-Machined-Parts')&&!tags.includes('Aluminum-CNC-Parts')) return {question:'How should the plastic grade and fit be specified?',answer:'State the polymer grade and fillers, intended environment and any conditioning requirements. Agree the measurement conditions for fitted dimensions; appearance or color does not establish the material grade.'};
 if(tags.includes('Copper-Brass-CNC-Parts')&&!tags.includes('Aluminum-CNC-Parts')) return {question:'Can copper and brass be quoted as alternatives?',answer:'Provide the grade and standard for each acceptable option, with the electrical, thermal or sealing requirements that matter. Agree plating and any final-size checks for the selected material.'};
 if(tags.includes('CNC-Turning-Service')) return {question:'How should fitted diameters and threads be specified?',answer:'Identify the common datum axis, mating fits and thread standard on the drawing. State the dimensions and surface conditions that must meet acceptance after any treatment.'};
 return {question:'How are critical tolerances confirmed?',answer:'Mark the critical features and datum references on the drawing. Achievable limits and measurement methods are reviewed for the material, geometry, workholding and finish before the order is confirmed.'};
}
