// Editorial additions transcribed from each matching catalog.html source.
// Catalog records, original category membership and source URLs remain untouched.
// Tags describe the service offered by a listing, not the alloy of its photograph.
export type Manufacturing = { highlights:string[]; finishes:string; applications:string; tags:string[] };
const tagNames:Record<string,string>={mill:'CNC-Milling-Service',turn:'CNC-Turning-Service',axis:'5-Axis-CNC-Machining',cast:'Casting-Machining',al:'Aluminum-CNC-Parts',ss:'Stainless-Steel-CNC-Parts',cu:'Copper-Brass-CNC-Parts',plastic:'Plastic-Machined-Parts',prototype:'Prototype-Machining',batch:'Low-Volume-Production'};
const entry=(tags:string,highlights:string[],finishes:string,applications:string):Manufacturing=>({tags:tags.split(' ').filter(Boolean).map(t=>tagNames[t]),highlights,finishes,applications});
export const manufacturing:Record<string,Manufacturing>={
 'custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm':entry('mill axis al ss cu plastic',[
  '3-, 4- and 5-axis milling for pockets, bores and features on several faces.',
  'Material options include aluminum, stainless and carbon steel, copper, brass, titanium and engineering plastics.'
 ],'As-machined, polishing, bead blasting, Type II or Type III anodizing, and plating; select a treatment compatible with the material.','Analytical instruments, automotive parts and robotics.'),
 'custom-oem-high-precision-cnc-milling-manufacturer':entry('mill',[
  'Milled blocks, brackets and manifolds with mounting faces and intersecting passages.',
  'Reverse engineering support for projects that start with an existing component.'
 ],'Define the surface treatment and any protected fits on the drawing.','Laboratory equipment, hydraulic assemblies, automotive and fire-rescue equipment.'),
 'ultra-high-precision-machining-services':entry('axis ss',[
  'Continuous 5-axis machining follows curved surfaces and reaches deep cavities with fewer setups.',
  'Material options include titanium, Inconel and hardened stainless steel.'
 ],'Lapping, polishing and specialized coating options, subject to the part requirements.','Impellers and complex components for aerospace, scientific equipment and robotics.'),
 'global-oem-precision-machining-solutions':entry('axis turn prototype',[
  'Integrated turning and multi-axis milling combine rotational features with angled cuts.',
  'Prototype support for custom rings, housings and components with several machining orientations.'
 ],'Specify finish and material grade for the interfaces in your assembly.','Analytical instruments, hydraulic equipment, automotive and rescue equipment.'),
 'global-manufacturer-of-multi-sided-precision-machined-components':entry('axis mill',[
  'Multi-sided machining brings ports, internal fluid channels and mounting features into one component.',
  'Custom fixtures and a drawing review address tool access and repeated clamping.'
 ],'Choose the finish around the fluid, assembly and appearance requirements.','Instrumentation, energy equipment and multi-port assemblies.'),
 'custom-oem-cnc-turning-manufacturer':entry('turn al ss cu plastic',[
  'Turning and live-tool machining for shafts, flanges and bushings, including side holes.',
  'Material options include stainless steel, aluminum, brass, copper and engineering plastics.'
 ],'Specify the surface texture for bearing, sealing and mating diameters.','Hydraulic equipment, motors and instrumentation.'),
 'custom-rotary-cylindrical-components':entry('turn mill al ss cu',[
  'Turning, drilling, threading and milling combine cylindrical forms with cross-holes, flats and slots.',
  'Aluminum, stainless steel, brass and copper options suit different working environments.'
 ],'Specify the treatment and surfaces that must retain their finished dimensions.','Hydraulic fittings, sensor bodies and rotary components.'),
 'custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer':entry('turn al ss cu',[
  'NPT, BSPT and metric threads for fittings, adapters and flanges.',
  'Live tooling adds cross-holes, hex features and grooves in stainless steel, brass, copper or aluminum.'
 ],'Polishing for specified sealing faces; define other treatments with the material grade.','Fluid connections, laboratory equipment and valve assemblies.'),
 'full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing':entry('mill al ss cu',[
  'Machining and finishing are coordinated with deburring, cleaning and post-finish inspection.',
  'Finishing can use in-house operations or specialist suppliers, depending on the treatment.'
 ],'Aluminum: Type II/III anodizing or chromate conversion. Stainless steel: passivation or electropolishing. Copper/brass: polishing or plating. Powder coating, black oxide, nickel and chrome plating are also options for compatible substrates.','Custom metal parts needing both functional dimensions and a specified appearance.'),
 'custom-high-precision-machining-for-structural-aesthetic-components-oem':entry('mill',[
  'Machining combines visible curves and weight-reduction features with mounting points and precise bores.',
  'Logo engraving and color coordination support components with exposed surfaces.'
 ],'Anodizing and plating options, with color and substrate agreed for the part.','Structural components where fit and visible finish both matter.'),
 'high-volume-cnc-turning-for-complex-internal-external-features':entry('turn',[
  'Internal steps, grooves and sealing faces are machined alongside external turned features.',
  'Dedicated tooling and standardized setups support repeated production of sleeves, bushings and valve cores.'
 ],'Define the required texture on internal bores, grooves and seal-contact surfaces.','Valve cores, bushings and sleeves for repeat production.'),
 'high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem':entry('axis',[
  '5-axis contour machining for turbine, impeller and fluid-control geometries.',
  'CMM checks can compare complex features with the model; agree the reporting scope before production.'
 ],'Specify the treatment for flow surfaces and mating features with the material grade.','Turbine components, fluid housings and complex curved parts.'),
 'custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier':entry('mill al prototype',[
  '6061 and 3003 aluminum options for machined end tanks and ports.',
  'TIG joining to a core and fitment review support intercooler prototype development.'
 ],'Mirror polishing, brushing, powder coating or anodizing.','Intercooler prototypes; define the pressure-test conditions and vehicle packaging.'),
 'custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier':entry('mill axis al prototype batch',[
  '6061-T6 or 7075 billet engine covers with 5-axis curves and ball-nose toolpath textures.',
  'Prototype and small-batch support includes checking hood, camshaft and sensor clearances.'
 ],'Polishing, brushing and anodizing.','Custom engine covers and automotive development parts.'),
 'custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier':entry('mill axis al prototype',[
  '6061-T6 runners, velocity stacks and multi-piece flanges for intake prototypes.',
  'STEP or IGES model review supports manufacturability checks for intake and turbo-related components.'
 ],'Raw machined surfaces, polishing and color anodizing.','Intake development, turbo flanges, wastegate parts and piping interfaces.'),
 'custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier':entry('mill axis al prototype',[
  '5-axis machining of 6061-T6 bodies combines the main bore with motor and gear chambers.',
  'Model review and prototype machining support shaft, bearing and actuator fit checks.'
 ],'Color anodizing or clear chemical conversion coating.','Electronic throttle-body prototypes and automotive fitment validation.'),
 'custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier':entry('mill axis al prototype',[
  '6061-T6 billet runners and velocity stacks can include injector bosses and fuel-rail mounts.',
  'STEP or IGES review addresses machining access and engine-bay or hood clearance.'
 ],'Raw machined surfaces, mirror polishing and color anodizing.','Custom intake manifolds and automotive prototype assemblies.'),
 'custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier':entry('mill axis al prototype batch',[
  '5-axis machining shapes internal transitions, custom volumes and flanges in 6061-T6 billet.',
  'Prototype and limited-run production supports development before repeat supply.'
 ],'Machined texture, mirror polishing, anodizing and engraving.','Custom intake plenums; pressure requirements are agreed for the design.'),
 'custom-cnc-machined-castings-transmission-housings-pump-bodies':entry('cast mill',[
  'Milling and boring finish casting interfaces, internal gear features, splines and fluid passages.',
  'Sample scanning and 2D/3D model development support reverse engineering when drawings are incomplete.'
 ],'Define the casting alloy, machined faces and any post-machining treatment.','Transmission housings and pump bodies.'),
 'custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier':entry('turn ss',[
  '304, 316L and 17-4PH stainless shaft options, with live-tool flats and cross-holes.',
  'Tool-wear and work-hardening control are part of the machining approach; engraving is available.'
 ],'Fine-turned surfaces and mirror polishing.','Industrial shafts, marine components and automation assemblies.'),
 'custom-oem-cnc-machined-non-metallic-components-insulating-parts':entry('mill plastic',[
  'Polymer and composite stock can be machined from sheet, rod or block into slotted and drilled parts.',
  'Low-stress workholding, heat control and edge finishing address non-metallic material behavior.'
 ],'Machined surfaces with burr and edge requirements defined for use.','Electrical insulation, wear parts, gears, bushings and material-handling sliders.'),
 'custom-oem-cnc-machined-plastic-parts-manufacturer':entry('mill turn plastic prototype',[
  'PEEK, PTFE, polyimide, nylon, acetal/Delrin, HDPE, UHMW, acrylic and polycarbonate options.',
  'Milling and turning use temperature-aware machining for seals, wear plates, rollers and supports.'
 ],'Specify edge quality, surface texture and cleaning requirements for the selected polymer.','Insulators, seals, gears and structural supports from prototype to production.'),
 'oem-precision-cnc-machined-casting-housing-structural-enclosures':entry('cast mill',[
  'Fixtured milling and boring add bearing bores and functional faces to ribbed, deep-cavity castings.',
  'Multi-axis access and dimensional checks address relationships between machined interfaces.'
 ],'Machined functional surfaces; specify any exterior treatment separately.','Structural cast housings and enclosures.'),
 'oem-precision-cnc-machined-casting-housings':entry('cast mill prototype',[
  'CNC finishing for transmission and pump castings, including mating bores and passages.',
  'Sample scanning, model reconstruction and drawing review support prototype and production work.'
 ],'Agree the casting alloy, machining allowance and treatment before manufacture.','Transmission and hydraulic pump housings.'),
 'precision-cnc-machined-castings-custom-oem-housings':entry('cast mill',[
  'Milling, boring, drilling and tapping convert casting blanks into assembly-ready interfaces.',
  'Irregular-part fixtures locate the blank against agreed datums for dimensional inspection.'
 ],'Specify surface finish and protected dimensions on the machined interfaces.','OEM housings with bearing, mounting and threaded features.'),
 'precision-cnc-machined-castings-manufacturer':entry('cast mill',[
  'Machining addresses internal gear features, splines and fluid paths in cast components.',
  'Reverse engineering and manufacturability review support parts developed from an existing sample.'
 ],'Define the treatment around the casting material and finished mating surfaces.','Transmission components and hydraulic housings.'),
 'precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances':entry('mill axis plastic prototype',[
  'Multi-axis machining reaches deep pockets, thin walls and holes on several faces.',
  'Low-stress fixtures and thermal management help control deformation in complex plastic parts.'
 ],'Specify the surface condition required at seals, bearings and sliding interfaces.','Instrumentation, automation and fluid-system plastic components.'),
 'precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier':entry('turn mill axis cast cu',[
  'C36000 brass and tellurium copper options for turned, milled and multi-axis components.',
  'Feed control and deburring address soft-metal deformation in threads, manifolds and conductive parts.'
 ],'Specify any protective plating and the surfaces needed for electrical or thermal contact.','Copper heat sinks and busbars, brass manifolds, plumbing and industrial components.'),
 'precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier':entry('mill turn axis cast al prototype batch',[
  'Milling, turning, 5-axis work and casting machining bridge prototype development and repeat production.',
  'Standardized fixtures, revision control and batch inspection support mixed-part orders.'
 ],'Coordinate finish requirements with each material and part revision.','Pilot builds and high-mix, low-volume components.'),
 'precision-machining-for-functional-plastic-blocks-structural-components':entry('mill plastic',[
  'Through-holes, blind holes and mounting patterns are machined into functional plastic blocks.',
  'Workholding addresses flatness, parallelism and stress around inserted or mating components.'
 ],'Deburring and cleaning, with working-surface requirements defined on the drawing.','Structural guides, fixtures and wear-related plastic blocks.'),
 'precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures':entry('mill turn axis cast al batch',[
  'Deep pockets and thin enclosure walls are machined with attention to stress relief.',
  'Consistent fixtures and probing support repeat setups for small-batch enclosure production.'
 ],'Specify the exterior treatment and dimensions that must be protected during finishing.','Complex aluminum enclosures and small-batch structural parts.'),
 'precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier':entry('turn ss',[
  '303, 304, 316L and 17-4PH options for shafts, valves, fasteners and fittings.',
  'Tooling, heat control, deburring and thread gauging address stainless steel machining.'
 ],'Passivation and electropolishing.','Medical-equipment components, marine hardware and industrial fittings.'),
 'precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier':entry('turn ss',[
  '304, 316L and 17-4PH locking pins with flanges, threads and flats.',
  'Live tooling adds cross-holes and engraved features to turned components.'
 ],'Fine-turned surfaces and mirror polishing.','Indexing and locking components for industrial, marine and automation equipment.'),
 'small-batch-cnc-machining-manufacturer-complex-aluminum-housings':entry('mill al batch',[
  'Deep pockets and thin walls are machined with stress relief and controlled workholding.',
  'Repeat setups address housing flatness and consistency between orders.'
 ],'Bead blasting, clear/black/color anodizing and laser engraving.','Industrial electronics housings and aluminum enclosures.'),
 'small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv':entry('mill al ss cu plastic batch prototype',[
  'Material options include 6061/7075 aluminum, 304/316 stainless steel, brass and engineering plastics.',
  'Dedicated fixtures, setup changes and first-article checks support high-mix, small-batch orders.'
 ],'Define the treatment for each material and part number in the batch.','Medical-equipment components, automation parts and instrumentation.'),
};
export const productManufacturing=(product:{slug:string})=>manufacturing[product.slug];
