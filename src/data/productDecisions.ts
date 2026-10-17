// Editorial comparisons grounded in catalog.json, presentation, productSummaries,
// productDetails and manufacturing. These are drawing-review choices, not claims
// of interchangeability, measured performance or an agreed supply commitment.
const slugs = {
 cavities:'custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm',
 blocks:'custom-oem-high-precision-cnc-milling-manufacturer',
 contours:'ultra-high-precision-machining-services',
 rings:'global-oem-precision-machining-solutions',
 multiFace:'global-manufacturer-of-multi-sided-precision-machined-components',
 turning:'custom-oem-cnc-turning-manufacturer',
 rotary:'custom-rotary-cylindrical-components',
 fittings:'custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer',
 finishing:'full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing',
 aesthetic:'custom-high-precision-machining-for-structural-aesthetic-components-oem',
 sleeves:'high-volume-cnc-turning-for-complex-internal-external-features',
 fluid:'high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem',
 intercooler:'custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier',
 cover:'custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier',
 intake:'custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier',
 throttle:'custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier',
 injectorIntake:'custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier',
 plenum:'custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier',
 transmission:'custom-cnc-machined-castings-transmission-housings-pump-bodies',
 shaft:'custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier',
 insulation:'custom-oem-cnc-machined-non-metallic-components-insulating-parts',
 plastics:'custom-oem-cnc-machined-plastic-parts-manufacturer',
 ribbedCasting:'oem-precision-cnc-machined-casting-housing-structural-enclosures',
 reconstructedCasting:'oem-precision-cnc-machined-casting-housings',
 mountingCasting:'precision-cnc-machined-castings-custom-oem-housings',
 internalCasting:'precision-cnc-machined-castings-manufacturer',
 thinPlastic:'precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances',
 brass:'precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier',
 pilot:'precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier',
 plasticBlocks:'precision-machining-for-functional-plastic-blocks-structural-components',
 enclosure:'precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures',
 stainless:'precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier',
 locking:'precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier',
 housing:'small-batch-cnc-machining-manufacturer-complex-aluminum-housings',
 mixedBatch:'small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv',
} as const;

export type ProductDecisionSlug = typeof slugs[keyof typeof slugs];
export type RelatedPartChoice = Readonly<{slug:ProductDecisionSlug; reason:string}>;
export type ProductDecision = Readonly<{
 selectionFocus:string;
 related:readonly RelatedPartChoice[];
}>;
export type RelatedPartDecision<T> = {product:T; reason:string};
type Choice = readonly [slug:ProductDecisionSlug, reason:string];
const decision = (selectionFocus:string, choices:readonly [Choice, Choice, Choice?]):ProductDecision => ({
 selectionFocus,
 related:choices.filter((choice):choice is Choice=>choice!==undefined).map(([slug,reason])=>({slug,reason})),
});

// Each directed link and its order is intentional; no tag or material scoring.
// Overlapping catalog listings are distinguished by the documented review focus,
// not by assumed differences in size, quality, achievable tolerance or capacity.
export const productDecisions:Readonly<Record<ProductDecisionSlug,ProductDecision>> = {
 [slugs.cavities]:decision("Bore sizes and face-hole positions need a common reference to the circular faces.",[
  [slugs.blocks,"Mounting faces and intersecting passages in blocks or brackets."],
  [slugs.multiFace,"Ports and bolt patterns sharing datums across several faces."],
  [slugs.contours,"Blade profiles and root transitions defined by a controlling surface model."],
 ]),
 [slugs.blocks]:decision("Locate intersecting passages from the mounting faces of the instrument block or valve body. For brackets, include the mounting interfaces.",[
  [slugs.cavities,"Stepped bores and face-hole patterns located from circular faces."],
  [slugs.multiFace,"Mounting and passage geometry extending across several faces, including angled ports."],
 ]),
 [slugs.contours]:decision("The model defines blade profiles and root transitions relative to the datum axis. State material condition and inspection criteria on the drawing.",[
  [slugs.fluid,"Contours combined with ports and sealing interfaces. Flow or balance tests need separate criteria."],
  [slugs.cavities,"Stepped bores, face-hole positions and circular-face relationships."],
 ]),
 [slugs.rings]:decision("Locate angled and milled features from the turned axis. Define these relationships on the same housing drawing.",[
  [slugs.rotary,"Cross-holes, flats and slots oriented around a cylindrical axis."],
  [slugs.multiFace,"Ports and mounting faces located from shared face datums instead of a turned axis."],
 ]),
 [slugs.multiFace]:decision("Angled ports and bolt patterns on different faces need shared datums. Include the mounting faces in the same datum scheme.",[
  [slugs.blocks,"Intersecting passages and mounting interfaces in a block or bracket."],
  [slugs.rings,"Face relationships tied to a turned diameter and datum axis."],
 ]),
 [slugs.turning]:decision("Define the functional axis and working diameters, then locate shoulders and mating fits for the shaft, sleeve, bushing or flange.",[
  [slugs.rotary,"Secondary flats, slots or cross-holes with angular references to the turned profile."],
  [slugs.fittings,"Thread standards and the mating seal face control the connection."],
  [slugs.sleeves,"Internal steps, grooves and inspection access for repeat batches."],
 ]),
 [slugs.rotary]:decision("Cross-holes, flats and slots need an angular reference to the turned axis and to one another.",[
  [slugs.turning,"Base diameters, shoulders and fits before off-axis details are added."],
  [slugs.rings,"Combined turning and milling for angled faces and housing interfaces."],
 ]),
 [slugs.fittings]:decision("A connector drawing needs the mating thread standard and sealing arrangement. Identify the face that contacts the mating part.",[
  [slugs.brass,"Conductive contacts and plating requirements as well as connector geometry. Select the material for its function."],
  [slugs.stainless,"Alloy condition and final acceptance after passivation or electropolishing."],
  [slugs.sleeves,"Stepped bores or hidden seal grooves requiring access for inspection."],
 ]),
 [slugs.finishing]:decision("State which fitted dimensions apply after finishing. Mark masked surfaces and define cosmetic acceptance separately.",[
  [slugs.aesthetic,"Visible curves, engraving and mounting geometry with separate appearance references."],
  [slugs.housing,"Lid or gasket interfaces and thin enclosure walls that must be considered with the finish."],
 ]),
 [slugs.aesthetic]:decision("Define load-carrying and mounting features separately from visible curves. Include engraving and cosmetic finish requirements.",[
  [slugs.finishing,"Protected fits, treatment choice and dimensions checked after finishing."],
  [slugs.cover,"Visible contours with underside clearance to adjacent engine components."],
 ]),
 [slugs.sleeves]:decision("Use sections to show internal steps and seal grooves. For repeat orders, give quantities and sampling requirements for each release.",[
  [slugs.turning,"External shoulders and mating diameters alongside the internal profile."],
  [slugs.fittings,"Internal grooves combined with a defined mating thread and seal."],
 ]),
 [slugs.fluid]:decision("Define ports and sealing interfaces in the contour model. Functional tests for the impeller or fluid housing need separate acceptance criteria.",[
  [slugs.contours,"Blade roots, thin sections and profiles referenced to the datum axis."],
  [slugs.multiFace,"Angled ports and bolt patterns across several faces. Compare these with the impeller contours."],
 ]),
 [slugs.intercooler]:decision("Show end-tank geometry and port orientation relative to the core. Identify supplied components, with CNC machining and TIG joining defined separately.",[
  [slugs.plenum,"A machined internal volume and throttle flange. An intercooler also needs core and weld-joint definitions."],
  [slugs.intake,"Runner-to-flange and piping interfaces alongside the cooling assembly."],
 ]),
 [slugs.cover]:decision("The cover drawing needs underside clearance and the mating perimeter as well as the visible billet contour and finish.",[
  [slugs.aesthetic,"Exposed curves and mounting points without an engine-specific clearance envelope."],
  [slugs.housing,"Lid or gasket closure and cavity walls as the main enclosure requirements."],
 ]),
 [slugs.intake]:decision("Define runner transitions and multi-piece flanges, including the plenum or turbo-piping interfaces. Compare the related manifold for injector bosses and fuel-rail mounts.",[
  [slugs.injectorIntake,"Injector axes and fuel-rail mounts located relative to runners and engine ports."],
  [slugs.plenum,"Internal volume and throttle-flange geometry upstream of the runners."],
  [slugs.intercooler,"Machined ports joined to a cooling core. Core supply and welding need a separate scope."],
 ]),
 [slugs.throttle]:decision("Locate the shaft from the main airflow bore and define the motor or gear-chamber space. Specify housing-only supply or an assembled actuation unit.",[
  [slugs.plenum,"The mating throttle flange and transition on the plenum side of the interface."],
  [slugs.injectorIntake,"Injector bosses and fuel-rail packaging; throttle actuator supply remains a separate requirement."],
 ]),
 [slugs.injectorIntake]:decision("Locate injector axes and fuel-rail mounts from the intake ports. Include curved runners in the model and check installation clearance.",[
  [slugs.intake,"Multi-piece flanges, runner transitions and turbo-piping interfaces."],
  [slugs.plenum,"Upstream volume and throttle interface mating with the runners."],
  [slugs.throttle,"Shaft bores, motor space and gear-chamber interfaces at the air inlet."],
 ]),
 [slugs.plenum]:decision("Show the internal volume and transitions up to the throttle flange. Define any split-line seal and the mating runner interfaces in the assembly.",[
  [slugs.intake,"Multi-piece runner flanges and engine-side ports connected to the plenum."],
  [slugs.injectorIntake,"Injector and fuel-rail locations that constrain plenum and runner packaging."],
  [slugs.throttle,"Mating bore, flange and actuator envelope at the inlet."],
 ]),
 [slugs.transmission]:decision("Use casting and finished-part drawings to define internal splines, gear features and fluid channels. Assign blank supply and incoming acceptance before machining.",[
  [slugs.ribbedCasting,"Ribbed cavities, bearing-bore relationships and fixture access."],
  [slugs.reconstructedCasting,"Sample-based reconstruction of controlling bore-to-face or spline dimensions."],
  [slugs.internalCasting,"Hidden splines and flow paths needing sections, a controlled model and measurement access."],
 ]),
 [slugs.shaft]:decision("Define flange faces, common bore axes, mounting patterns and direction markings. List supplied components and separate any assembly or functional-test scope.",[
  [slugs.locking,"Indexing or engagement with a mating hole. Specify travel and whether springs or a complete mechanism are included."],
  [slugs.stainless,"Rotary-body and separate-flange interfaces, with stainless grade and post-treatment acceptance."],
  [slugs.rotary,"Angular references for flats, slots and cross-holes when material selection is still open."],
 ]),
 [slugs.insulation]:decision("Specify the polymer or composite and the properties needed for insulation or wear. Locate slots, holes and barriers in the sheet, rod or block.",[
  [slugs.plasticBlocks,"A circular bore pattern, curved working edges and defined measurement conditions."],
  [slugs.plastics,"Turned rollers, seals and the listed polymer-grade options."],
 ]),
 [slugs.plastics]:decision("Select the polymer grade for the working surfaces of the seal, roller, guide or support, then define the milled or turned geometry.",[
  [slugs.insulation,"Slots and barrier geometry combined with insulating-material requirements."],
  [slugs.thinPlastic,"Long forms with repeated bores and defined material and measurement conditions."],
  [slugs.plasticBlocks,"A central bore, four surrounding holes and repeated curved edge recesses."],
 ]),
 [slugs.ribbedCasting]:decision("Show bearing-bore relationships and fixture access around the ribs and cavities. Identify machined interfaces and surfaces left as cast.",[
  [slugs.transmission,"Internal splines, gear features and fluid channels needing sectioned drawings."],
  [slugs.mountingCasting,"Sealing faces, bearing fits and tapped mounting holes as the main machining scope."],
 ]),
 [slugs.reconstructedCasting]:decision("For a housing reconstructed from a sample, define bore-to-face and spline dimensions before machining. Identify dimensions still to be established.",[
  [slugs.transmission,"Cast and machined surfaces, with internal access and incoming acceptance defined during model reconstruction."],
  [slugs.ribbedCasting,"Ribbing and cavities that govern fixturing around bearing interfaces."],
 ]),
 [slugs.mountingCasting]:decision("Locate sealing faces and bearing fits from casting datums, along with tapped mounting holes. Show machining allowance separately from finished wall geometry.",[
  [slugs.ribbedCasting,"Cast shapes and deep cavities restricting access to bearing and mounting interfaces."],
  [slugs.internalCasting,"Hidden splines, gear features and flow paths beyond the accessible faces."],
 ]),
 [slugs.internalCasting]:decision("Use sections to locate hidden splines and flow paths from flange datums. Confirm blank origin and alloy condition, and whether a model or sample is available.",[
  [slugs.transmission,"Casting allowance, incoming acceptance and datum transfer before machining."],
  [slugs.mountingCasting,"Accessible sealing faces, bearing fits and threaded mounts. Compare these with the hidden powertrain features."],
 ]),
 [slugs.thinPlastic]:decision("Define the repeated bores and working surfaces from common datums. Specify the polymer and measurement state; any thin walls or deep pockets require drawing details.",[
  [slugs.plasticBlocks,"Circular bore relationships and curved working-edge profiles."],
  [slugs.plastics,"Listed polymers and the choice of milled or turned working surfaces."],
 ]),
 [slugs.brass]:decision("Electrical contact, heat transfer and fluid sealing need different acceptance criteria. State the function before specifying the copper or brass alloy and plating.",[
  [slugs.fittings,"Connections controlled by thread standards and sealing faces."],
  [slugs.rotary,"Flats and cross-holes around a turned axis. Retain the selected copper or brass alloy on the drawing."],
 ]),
 [slugs.pilot]:decision("List the parts and shared assembly interfaces in the pilot batch. Identify which items need milling, turning or cast-blank machining.",[
  [slugs.mixedBatch,"A material, revision and release quantity for every part number."],
  [slugs.enclosure,"Open enclosure forms with side features; define stock form and any angled geometry on the model."],
 ]),
 [slugs.plasticBlocks]:decision("Define the circular bore pattern, curved working edges and thickness from common datums. Include material, loads and measurement conditions.",[
  [slugs.thinPlastic,"Repeated bore relationships on long plastic components."],
  [slugs.insulation,"Slotted barriers or wear plates with specified material properties."],
 ]),
 [slugs.enclosure]:decision("Identify billet or cast-blank stock before planning machining. Show pocket depths and thin-wall sections, with compound-angle features defined in the model.",[
  [slugs.housing,"Lid or gasket interfaces, masked fits and cosmetic finish."],
  [slugs.mountingCasting,"Cast blanks requiring finished bearing fits, sealing faces and tapped holes."],
  [slugs.pilot,"Assembly orders combining the enclosure with turned or cast mating parts."],
 ]),
 [slugs.stainless]:decision("Define rotary-body and separate-flange interfaces, supplied components and markings. Specify stainless grade, material condition and post-treatment dimensions.",[
  [slugs.shaft,"Flange faces, common bore axes, fasteners and direction markings."],
  [slugs.locking,"Engagement with a mating hole, travel, spring requirements and assembly scope."],
  [slugs.fittings,"Thread standards and seal-contact geometry with the selected stainless grade."],
 ]),
 [slugs.locking]:decision("Define pin engagement and travel, with the mounting thread and mating hole. Specify machined-component supply or a complete spring-loaded assembly.",[
  [slugs.shaft,"Flanged forms with bore relationships and a separately defined component and assembly scope."],
  [slugs.stainless,"Rotary component and flange references with grade and post-treatment acceptance requirements."],
 ]),
 [slugs.housing]:decision("Locate lid or gasket interfaces from the mounting datums. Mark thin cavity walls and masked fits, with finish requirements for visible surfaces.",[
  [slugs.enclosure,"Cavities and side openings, with any angled geometry and stock form defined on the drawing."],
  [slugs.finishing,"Treatment, cosmetic references and dimensions accepted after finishing."],
 ]),
 [slugs.mixedBatch]:decision("Give each part number a material, revision and release quantity. The listed options include stainless steel, brass and plastics as well as aluminum.",[
  [slugs.pilot,"Cast blanks, turned mating parts and shared assembly interfaces."],
  [slugs.housing,"Lid, gasket, cavity-wall and finish requirements for a housing within the batch."],
 ]),
};

function decisionEntry(slug:string):ProductDecision {
 if(!Object.prototype.hasOwnProperty.call(productDecisions,slug)) {
  throw new Error('Missing product decision: '+slug);
 }
 return productDecisions[slug as ProductDecisionSlug];
}

/** Opening selection guidance for the product template. */
export function productDecision(slug:string):{selectionFocus:string} {
 return {selectionFocus:decisionEntry(slug).selectionFocus};
}

/** Pass the complete catalog; missing targets are content errors, never substitutes. */
export function relatedPartDecisions<T extends {slug:string}>(product:T,products:readonly T[]):RelatedPartDecision<T>[] {
 const bySlug=new Map(products.map(candidate=>[candidate.slug,candidate]));
 return decisionEntry(product.slug).related.map(({slug,reason})=>{
  if(slug===product.slug) throw new Error('Self-related product decision: '+slug);
  const related=bySlug.get(slug);
  if(!related) throw new Error('Unresolved product decision: '+product.slug+' -> '+slug);
  return {product:related,reason};
 });
}
