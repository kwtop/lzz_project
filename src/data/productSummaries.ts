// Curated from the corresponding original catalog entry. These are listing
// descriptions, not measured results for the photographed component.
// Raw names, technical HTML and source URLs remain unchanged in catalog.json.
export type ProductSummary = {
 purpose:string; material:string; features:string; process:string; inspection:string; card:string;
};
type SummaryInput = [purpose:string, material:string, features:string, process:string, inspection:string, card:string];
const drawingReview='Agree inspection methods and acceptance criteria for the features on your drawing.';
const gradeReview='Specify the material grade, condition and required material records for the order.';
const entries:Record<string,SummaryInput> = {
 'custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm': [
  'A circular component with a central opening, stepped bores and a pattern of smaller holes.',
  'Material options: aluminum, stainless and carbon steel, copper, brass, titanium and engineering plastics.',
  'Central opening, stepped bores, face holes and machined circular surfaces.',
  '3-axis, 4-axis and 5-axis CNC milling.',
  drawingReview,'Stepped bores and a circular hole pattern'
 ],
 'custom-oem-high-precision-cnc-milling-manufacturer': [
  'Blocks, brackets and housings for laboratory instruments, hydraulic tools and automotive equipment.',
  gradeReview,'Manifolds, valve bodies, mounting features and instrument housings.',
  '3-axis, 4-axis and 5-axis CNC milling.',
  'The listed inspection stages are first-article, in-process, final and pre-shipment checks. Confirm which checks your order needs.',
  'Milled blocks, brackets & instrument housings'
 ],
 'ultra-high-precision-machining-services': [
  'Impellers and complex housings with curved surfaces and internal features.',
  'Material options: titanium, Inconel and hardened stainless steel. Confirm the grade for your part.',
  'Contoured blades, deep pockets and complex multi-axis geometry.',
  'Continuous 5-axis machining for curved surfaces and deep cavities with fewer setups.',
  'Agree tolerances for each critical feature, measurement methods and the inspection records you need.',
  'Contoured blades · pockets & complex surfaces'
 ],
 'global-oem-precision-machining-solutions': [
  'Multi-process components for hydraulic systems, scientific equipment and vehicle assemblies.',
  gradeReview,'Ring housings, angled components, threads and cylindrical features.',
  '5-axis milling, CNC turning and mill-turn machining.',
  drawingReview,'Ring housings with turned and milled features'
 ],
 'global-manufacturer-of-multi-sided-precision-machined-components': [
  'Multi-sided components combining mounting, fluid-channel and structural functions.',
  gradeReview,'Bores, threads, curved faces, angled ports and bolt patterns.',
  'Multi-axis and 5-axis machining with component-specific fixturing.',
  drawingReview,'Multi-face bores, ports & mounting features'
 ],
 'custom-oem-cnc-turning-manufacturer': [
  'Rotational components for fluid systems, instruments and motors.',
  'Material options include stainless steel, aluminum, brass, copper and engineering plastics.',
  'Shafts, fittings, flanges, bushings and threaded housings.',
  'CNC turning and mill-turn operations for side holes and slots.',
  drawingReview,'Turned shafts, bushings & threaded housings'
 ],
 'custom-rotary-cylindrical-components': [
  'Rotary components that combine turned forms with off-axis features.',
  'Material options include aluminum, stainless steel, brass and copper.',
  'Internal and external threads, cross-holes, flats and slots.',
  'Integrated turning, drilling, threading and milling.',
  drawingReview,'Mill-turn parts · cross-holes, flats & slots'
 ],
 'custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer': [
  'Fittings, adapters and couplings for fluid, instrumentation and mechanical connections.',
  'Material options include brass, copper, stainless steel and aluminum.',
  'Hose barbs, threaded adapters, flanges, sealing faces and internal grooves.',
  'CNC turning with cross-drilling, milled flats, hex features and grooves.',
  'Thread standards, gauges and sealing requirements must be confirmed for your application.',
  'Threaded fittings · sealing faces & flanges'
 ],
 'full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing': [
  'Milled metal parts with specified dimensions and surface finishes.',
  'Material options include aluminum, stainless steel and brass.',
  'Blocks, brackets and housings with functional or cosmetic surfaces.',
  'CNC milling.',
  'The listing includes dimensional checks after finishing. Specify the features to measure.',
  'Milled brackets and finished housings'
 ],
 'custom-high-precision-machining-for-structural-aesthetic-components-oem': [
  'Structural components where mounting geometry and visible finish both matter.',
  gradeReview,'Curves, mounting points, weight-reduction profiles, bores and threads.',
  'CNC milling.',
  drawingReview,'Structural parts with a specified visible finish'
 ],
 'high-volume-cnc-turning-for-complex-internal-external-features': [
  'Cores, bushings, sleeves and valve components for repeat production.',
  gradeReview,'Multi-diameter bores, internal grooves and sealing surfaces.',
  'Multi-axis CNC turning with production-specific tooling.',
  'Batch consistency checks and statistical process control are listed for this example. Agree the sampling plan for your parts.',
  'Turned sleeves with internal bores and grooves'
 ],
 'high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem': [
  'Impellers, valve housings and curved components for fluid-system applications.',
  gradeReview,'Blade contours, angled fittings, ports and sealing faces.',
  '5-axis contour machining.',
  'The listing describes CMM comparison with a 3D model. Specify the reports and traceability your order needs.',
  '5-axis contours · impellers & fluid passages'
 ],
 'custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier': [
  'Intercooler and cooling-system prototypes for vehicle fitment development.',
  'Aluminum 6061 and 3003 options. Confirm the grade for each component.',
  'End tanks, inlet and outlet ports, cooling cores and welded joints.',
  'CNC machining combined with TIG welding.',
  'The listing includes pressure testing. Agree the test pressure, procedure and acceptance criteria for your assembly.',
  'Aluminum cooling prototypes · CNC + TIG welding'
 ],
 'custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier': [
  'Engine covers and automotive housings for prototype fitment and small-batch projects.',
  '6061-T6 aluminum, with 7075 as an alternative.',
  'Sweeping 3D curves, mounting interfaces and visible machining textures.',
  '5-axis machining from solid billet with ball-nose toolpaths.',
  'The listing includes fitment and clearance checks. Agree which dimensions to inspect on your cover.',
  'Billet aluminum · curved covers & surface texture'
 ],
 'custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier': [
  'Billet intake assemblies and induction-system prototypes with runner transitions and multi-piece flanges for engine, plenum or turbo-piping connections.',
  '6061-T6 aluminum billet.',
  'Runner geometry, velocity stacks, flanges and plenum connections.',
  '5-axis CNC machining after checking the drawing and model.',
  'The listing includes fitment and pressure testing. Confirm the test conditions for your prototype.',
  'Intake runner transitions & multi-piece flanges'
 ],
 'custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier': [
  'Throttle-body housings and intake-control prototypes for automotive development.',
  '6061-T6 aluminum.',
  'Main airflow bore, shaft bores, motor housing and gear-drive chambers.',
  '5-axis CNC machining from a CAD model.',
  'Confirm bore fits, shaft alignment and prototype fitment criteria with the drawing.',
  'Aluminum throttle housings · bores & motor chambers'
 ],
 'custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier': [
  'Billet intake-manifold prototypes with curved runners, injector bosses and fuel-rail mounts for engine-bay and mounting checks.',
  '6061-T6 aluminum billet.',
  'Curved runners, velocity stacks, injector bosses and fuel-rail mounting features.',
  '5-axis CNC machining after checking the model.',
  'The listing includes prototype fitment checks. Agree injector-alignment checks and inspection requirements.',
  'Intake runners · injector bosses & fuel-rail mounts'
 ],
 'custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier': [
  'Custom billet plenums and induction components for automotive development.',
  '6061-T6 aluminum.',
  'Internal transitions, throttle flanges, plenum volume and visible tool-path textures.',
  '5-axis surfacing.',
  'Agree the pressure rating, sealing checks and final acceptance criteria for your plenum.',
  'Billet plenums · internal transitions & flanges'
 ],
 'custom-cnc-machined-castings-transmission-housings-pump-bodies': [
  'Finish machining of transmission housings and pump bodies. The casting condition and available machining allowance are checked before machining.',
  'Specify the casting alloy and condition of the supplied blank.',
  'Internal splines, gear features, fluid channels and sealing flanges.',
  'CNC finish machining, with sample scanning and reverse engineering support.',
  'The listed checks cover first-article through pre-shipment inspection and CMM verification. Agree the checks for your housing.',
  'Cast transmission & pump housings · internal features'
 ],
 'custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier': [
  'Shafts, valve stems and control components for industrial and marine hardware.',
  'Stainless steel options include 304, 316L and 17-4PH.',
  'Cylindrical fits, threads, flanges, cross-holes and milled flats.',
  'CNC turning and live-tooling operations.',
  'Confirm diameter, runout, thread gauges and surface acceptance requirements.',
  'Stainless steel shafts · turning & live tooling'
 ],
 'custom-oem-cnc-machined-non-metallic-components-insulating-parts': [
  'Non-metallic components for electrical insulation, instrumentation and material handling.',
  'Engineering polymers and composites; specify the required grade.',
  'Slots, pockets, drilled plates, insulating barriers and wear components.',
  'CNC machining from sheet, rod and block stock.',
  'Specify the required material properties and dimensions, then agree the inspection criteria.',
  'Non-metallic plates · slots, pockets & insulation'
 ],
 'custom-oem-cnc-machined-plastic-parts-manufacturer': [
  'Custom insulators, seals, wear plates, gears, rollers and structural supports.',
  'PEEK, PTFE, polyimide, nylon, acetal/Delrin, HDPE, UHMW, acrylic and polycarbonate options.',
  'Milled and turned forms with features tailored to the application.',
  'CNC milling and turning of engineering-grade plastics.',
  'Confirm dimensional, cleanliness and material-handling requirements for the project.',
  'Engineering plastics · milled & turned components'
 ],
 'oem-precision-cnc-machined-casting-housing-structural-enclosures': [
  'Cast structural housings with mating surfaces and internal mechanical interfaces.',
  'Specify the casting alloy grade and blank condition.',
  'Internal ribs, deep cavities, bearing bores and mounting points.',
  'Multi-axis milling and boring with casting-specific fixturing.',
  'The listing includes CMM dimensional checks. Agree the datums and required reports.',
  'Cast structural enclosures · ribs & bearing bores'
 ],
 'oem-precision-cnc-machined-casting-housings': [
  'Transmission and pump housings requiring machining after casting.',
  'Specify the casting alloy, blank and material condition.',
  'Internal splines, reinforced ribs, central bores and mating faces.',
  'CNC milling and boring, with sample scanning and reverse engineering support.',
  'The listed inspection stages are first-article, in-process, final and pre-shipment checks.',
  'Cast housings · milling, boring & mating faces'
 ],
 'precision-cnc-machined-castings-custom-oem-housings': [
  'Custom cast housings and structural components prepared for assembly.',
  'Agree the casting material and grade for the project.',
  'Sealing faces, bearing fits, mounting points and tapped holes.',
  'Finish milling, boring, drilling and tapping.',
  'The listing includes CMM inspection and standard gauging. Confirm the drawing datums and inspection plan.',
  'OEM castings · sealing faces & tapped mounting holes'
 ],
 'precision-cnc-machined-castings-manufacturer': [
  'Transmission and pump castings with internal splines, flow paths and machined flanges. Tool and measurement access must be planned for the internal features.',
  'Metal castings; specify the alloy grade and blank condition.',
  'Internal splines, gear features, flow paths and flange surfaces.',
  'CNC boring and milling, with reverse engineering from a sample.',
  'The listing includes material verification and CMM dimensional checks. Agree the checks your order needs.',
  'Cast powertrain housings · bores & flow paths'
 ],
 'precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances': [
  'Plastic components for instrumentation, automation and fluid-management equipment.',
  'Specify the engineering polymer grade, fillers and stock condition.',
  'Thin walls, deep pockets, multi-axis holes and mating surfaces.',
  'CNC machining with low-stress fixturing and thermal management.',
  'Confirm dimensional, surface and stability criteria for the selected polymer.',
  'Thin-walled plastic parts with angled holes'
 ],
 'precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier': [
  'Fittings, electrical contacts and connectors in copper and brass alloys.',
  'C36000 brass, tellurium copper and other copper/brass options; confirm the alloy for your part.',
  'Threads, inserts, cylindrical fittings, busbars and heat-sink features.',
  'CNC turning, milling, multi-axis machining and casting finishing.',
  'The listing includes thread gauging and dimensional checks. Confirm the acceptance limits.',
  'Brass & copper · threaded fittings & electrical parts'
 ],
 'precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier': [
  'Pilot batches and high-mix, low-volume parts for the transition from prototypes to production.',
  'Aluminum and cast-blank machining options. Confirm the material for each part.',
  'Structural housings, cylindrical features, mating faces and bores.',
  'CNC milling, turning, 5-axis machining and secondary casting machining.',
  'The listing describes batch process control. Agree first-article checks and sampling requirements.',
  'Pilot batches of turned, milled and cast parts'
 ],
 'precision-machining-for-functional-plastic-blocks-structural-components': [
  'A circular plastic form with a central bore, four surrounding holes and repeated curved edge recesses.',
  'Specify the polymer grade, fillers and stock condition.',
  'Central bore, four-hole pattern, curved working edges and full thickness.',
  'CNC machining with the exact polymer and working geometry reviewed from the drawing.',
  'Confirm bore size, hole positions, thickness and working-edge profile under agreed measurement conditions.',
  'Circular form · bore pattern & curved working edges'
 ],
 'precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures': [
  'Aluminum enclosures with compound-angle features for prototypes and small production runs. The starting stock may be billet or a casting.',
  'Aluminum; specify the stock grade, temper and condition.',
  'Deep pockets, thin walls, compound angles and mating faces.',
  'CNC milling, turning, 5-axis machining and cast-blank finishing.',
  'The listing includes probing and dimensional checks. Agree flatness limits and batch sampling criteria.',
  'Compound-angle enclosures · billet or cast blank'
 ],
 'precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier': [
  'Stainless steel shafts, valves, fasteners and fittings.',
  'Stainless steel options include 303, 304, 316L and 17-4PH.',
  'Slender shafts, bearing fits, internal threads and external threads.',
  'CNC turning.',
  'Confirm thread gauging, dimensions and surface requirements for the selected grade.',
  'Stainless steel · shafts, valves & threaded fittings'
 ],
 'precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier': [
  'Indexing plungers, locking pins and turned control hardware.',
  'Stainless steel options include 304, 316L and 17-4PH.',
  'Shafts, flanges, locking features, threads, cross-holes and flats.',
  'CNC turning with live-tooling operations.',
  'Confirm alignment, functional fit, thread gauging and required surface finish.',
  'Stainless locking hardware · shafts & flanges'
 ],
 'small-batch-cnc-machining-manufacturer-complex-aluminum-housings': [
  'Short-run aluminum housings for industrial and electronic applications, with deep cavities, sealing faces and lid or gasket interfaces.',
  'Specify the aluminum alloy, temper and stock form.',
  'Deep internal cavities, thin walls, sealing faces and mounting features.',
  'CNC milling.',
  'The listing describes batch process control. Agree flatness limits and dimensional inspection criteria.',
  'Aluminum housings · lid, gasket & finish requirements'
 ],
 'small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv': [
  'Mixed-material custom parts for pilot runs and high-mix small batches. Specify the material for each part number.',
  'Material options include aluminum 6061/7075, stainless steel 304/316, brass and engineering plastics.',
  'Custom components grouped into repeat small-batch production.',
  'CNC machining with part-specific programming and fixtures.',
  'The listing includes first-article reports and in-process checks. Agree the report contents and parts to sample.',
  'Mixed components for pilot production'
 ]
};
export const productSummaries:Record<string,ProductSummary>=Object.fromEntries(
 Object.entries(entries).map(([slug,[purpose,material,features,process,inspection,card]])=>[slug,{purpose,material,features,process,inspection,card}])
);
export function productSummary(product:{slug:string;name:string}):ProductSummary {
 const summary=productSummaries[product.slug];
 if(!summary)throw new Error('Missing curated product summary: '+product.slug);
 return summary;
}
