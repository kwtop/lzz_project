// Service summaries from the matching source catalog entries; not universal part specifications.
export const capabilityOverview:Record<string,{intro:string;items:{title:string;text:string}[]}>= {
 'cnc-milling-service':{intro:'For pockets, slots, flat faces and features cut from several directions.',items:[
 {title:'3-, 4- and 5-axis work',text:'Brackets, manifolds, multi-sided parts and curved surfaces. Setup planning considers tool access and the relationships between features.'},
 {title:'Metals and plastics',text:'Aluminum, stainless steel, steel, copper, brass, titanium and engineering plastics are covered across our milling services.'},
 {title:'Machining through finishing',text:'Deburring, polishing, bead blasting, anodizing and plating options depend on the substrate and the dimensions that need protection.'}]},
 'cnc-turning-service':{intro:'For shafts, sleeves, bushings and fittings built around a rotational axis.',items:[
 {title:'Internal and external features',text:'Stepped diameters, bores, grooves and threads can be combined in turned components.'},
 {title:'Live-tool features',text:'Cross-holes, flats, slots and milled details can be added to cylindrical parts.'},
 {title:'Threads and sealing faces',text:'Fitting services include NPT, BSPT and metric threads. State the thread standard, mating component and sealing requirements.'}]},
 '5-axis-cnc-machining':{intro:'For continuous curves, deep cavities and features requiring angled tool access.',items:[
 {title:'Complex surfaces',text:'Impellers, curved components and multi-sided housings use angled tool access and contour machining.'},
 {title:'Fewer re-clamping steps',text:'Machining several orientations in one setup reduces repeated positioning between related features.'},
 {title:'Materials & size',text:'Services cover aluminum, titanium, Inconel and hardened stainless. Machine travel, load and maximum part envelope are not published here; share the model, stock size and part dimensions or weight for review.'}]},
 'casting-machining':{intro:'For adding finished bores, mounting faces, threads and passages to cast blanks.',items:[
 {title:'Casting to finished interfaces',text:'Milling, boring, drilling and tapping address transmission housings, pump bodies and structural enclosures.'},
 {title:'Fixtures for irregular blanks',text:'The machining plan uses casting datums, stock allowance and accessible clamping positions.'},
 {title:'Start from a sample',text:'Reverse engineering support includes sample scanning, 2D/3D model reconstruction and manufacturability review.'}]},
 'aluminum-cnc-parts':{intro:'For lightweight housings, automotive prototypes and multi-feature components.',items:[
 {title:'Grade options',text:'6061/6061-T6 and 7075 appear across billet machining services; 3003 is also offered in the intercooler service. Select the grade for the actual part.'},
 {title:'Thin walls and deep pockets',text:'Enclosure machining considers stress relief, fixture support and the order in which material is removed.'},
 {title:'Finish options',text:'Bead blasting, brushing, polishing, anodizing, chemical conversion and powder coating are offered across relevant services. Define color and masking requirements.'}]},
 'stainless-steel-cnc-parts':{intro:'For corrosion-resistant shafts, fittings, valve parts and locking components.',items:[
 {title:'Grade options',text:'303, 304, 316L and 17-4PH options serve different machining and operating requirements.'},
 {title:'Turned and milled features',text:'Shafts, flanges, grooves and threads can be combined with live-tool flats, cross-holes and engraving.'},
 {title:'Finish options',text:'Fine turning, polishing, passivation and electropolishing are offered across the stainless services. Specify the treatment and required final dimensions.'}]},
 'copper-brass-cnc-parts':{intro:'For conductive parts, heat-transfer components, manifolds and threaded fittings.',items:[
 {title:'Material options',text:'C36000 brass and tellurium copper are named options in the copper and brass service.'},
 {title:'Machining methods',text:'Turning, milling, 5-axis work and casting finishing cover cylindrical fittings and complex conductive parts.'},
 {title:'Edges and contact surfaces',text:'Burr control matters around threads and passages. Specify polishing or plating requirements and any surfaces that need direct electrical contact.'}]},
 'plastic-machined-parts':{intro:'For insulating components, wear parts, seals and lightweight structural pieces.',items:[
 {title:'Engineering polymer options',text:'PEEK, PTFE, polyimide, nylon, acetal/Delrin, HDPE, UHMW, acrylic and polycarbonate are listed in the plastic machining service.'},
 {title:'From blocks to complex geometry',text:'Milling and turning cover drilled blocks, gears, rollers, thin walls, deep pockets and multi-axis holes.'},
 {title:'Material-aware machining',text:'Low-stress workholding and temperature control address deformation. Define edge quality, cleaning and mating-surface requirements.'}]},
 'prototype-machining':{intro:'For checking fit, assembly and design details before repeat production.',items:[
 {title:'Model to part',text:'STEP or IGES review helps identify tool access, fitment and manufacturability issues before machining.'},
 {title:'Automotive development',text:'Examples include intercoolers, billet engine covers, intake manifolds, plenums and electronic throttle bodies.'},
 {title:'Plan the next revision',text:'Separate fit-check dimensions from appearance finishes and agree any pressure or functional testing required for the prototype.'}]},
 'low-volume-production':{intro:'For pilot builds, mixed-part orders and smaller repeat batches.',items:[
 {title:'High-mix work',text:'Milling, turning, multi-axis machining and casting finishing can support different part numbers within a production program.'},
 {title:'Repeatable setups',text:'Dedicated fixtures, revision control and first-article or in-process checks support consistency across batches.'},
 {title:'Order planning',text:'Orders start at 1 piece. Share quantities by part number, release schedule and finish requirements for pricing. Production takes 7–14 business days after drawing and order confirmation, including finishing; transit is additional.'}]},
};
