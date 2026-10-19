/**
 * Buying guidance for the eight process/material pages, separate from the
 * source-backed grade, acceptance and order records. General selection advice
 * is conditional; it does not add stock, machine limits or test guarantees.
 */
export type CapabilityDecision = {feature:string;consider:string;reason:string};
export type CapabilityDecisionGuide = {
 lead:string;description:string;heading:string;intro:string;
 featureIntro:string;materialsIntro:string;
 decisions:[CapabilityDecision,CapabilityDecision,CapabilityDecision];
 links:{title:string;href:string}[];
};

export const capabilityDecisions:Record<string,CapabilityDecisionGuide>={
 'cnc-milling-service':{
  lead:'CNC milling creates pockets, flat faces and hole patterns in housings, brackets and other custom parts. Feature direction, internal corners and wall thickness guide the tooling and number of setups.',
  description:'CNC milling for housings, brackets and pocketed parts. Understand tool access, internal radii and multiple setups, with material and inspection requirements.',
  heading:'How your part shape guides milling',
  intro:'Start with the surfaces that must fit together. Their direction and accessibility help determine how the part can be held and reached.',
  featureIntro:'A cutter needs a clear path into a pocket and around its corners. Deep recesses and small internal radii can require a more slender tool; thin walls also need support while material is removed. Faces reached from another direction may need a second setup, with locating surfaces that carry the same dimensional references.',
  materialsIntro:'Material choice affects cutting, workholding and the finished surface. Aluminum can suit weight-sensitive housings; steel, stainless steel, copper alloys and polymers bring different service requirements. The grade and treatment below are selected for the part, with fitted dimensions checked in their final specified condition.',
  decisions:[
   {feature:'Pockets, slots and internal corners',consider:'Tool access and a usable corner radius',reason:'A rotating cutter leaves a radius at an internal corner. Where the design allows it, a more generous radius can give a larger tool room to work; deep, narrow features need a separate access review.'},
   {feature:'Thin walls or broad mounting faces',consider:'Support during cutting and measurement',reason:'Cutting and clamping forces can move a thin section. The machining sequence and support need to suit the part, especially where flatness or a mating face controls assembly.'},
   {feature:'Holes and pockets on several faces',consider:'Additional setups or multi-axis access',reason:'Changing the holding position opens access to another face. Select the locating method to preserve feature relationships, then choose indexed positioning or simultaneous motion from the cutting path.'},
  ],
  links:[{title:'Aluminum machining',href:'/capabilities/aluminum-cnc-parts/'},{title:'Stainless steel machining',href:'/capabilities/stainless-steel-cnc-parts/'},{title:'Compare multi-axis access',href:'/capabilities/5-axis-cnc-machining/'}],
 },
 'aluminum-cnc-parts':{
  lead:'Aluminum machining suits housings, covers and structural parts where weight and geometry matter. Alloy, temper and surface treatment need to work together with the loads, environment and final fit.',
  description:'Aluminum CNC machining for housings, covers and structural parts. Compare alloy, temper, thin-wall support and finishing requirements for your drawing.',
  heading:'Choose aluminum around the working part',
  intro:'The useful choice is an alloy and condition suited to the job, followed by a finish that preserves its working interfaces.',
  featureIntro:'A recessed housing removes weight while retaining mounting and mating features. As the remaining walls become thinner, support during cutting and the order of material removal become more important. The housing references below show different cavity and interface arrangements.',
  materialsIntro:'6061 is a useful starting point where corrosion resistance, welding or anodized appearance matter. 7075 is worth reviewing when higher strength governs the design, with its temper, corrosion exposure and finish considered together. Neither grade replaces the load and environment review, and fitted dimensions need to refer to the final treatment state.',
  decisions:[
   {feature:'A housing or bracket with a weight target',consider:'6061 as a starting point; 7075 for strength-led review',reason:'Select the alloy from the loads, section geometry and permitted deflection. Review its temper, corrosion exposure and finishing route alongside the weight target.'},
   {feature:'Deep pockets and thin remaining walls',consider:'Stock removal, support and flatness',reason:'Removing much of the stock can leave a part sensitive to clamping and material movement. Support and machining sequence need review before a tight flatness requirement is accepted.'},
   {feature:'Anodized parts with bores or sealing faces',consider:'The fit after the final treatment',reason:'A surface treatment can change dimensions and appearance. The drawing needs to distinguish coated, masked and mating surfaces so the finished interfaces can be checked in the correct state.'},
  ],
  links:[{title:'CNC milling for pockets and faces',href:'/capabilities/cnc-milling-service/'},{title:'CNC turning for round interfaces',href:'/capabilities/cnc-turning-service/'}],
 },
 'cnc-turning-service':{
  lead:'CNC turning suits shafts, sleeves and fittings built around a common axis. Flats, slots and cross-holes may add a milling operation, so the complete feature layout guides the route.',
  description:'CNC turning for shafts, sleeves and fittings. Understand shared-axis geometry, deep bores, slender parts and secondary milling before preparing your drawing.',
  heading:'Choose the route around the axis',
  intro:'Turning establishes round features. The length, internal access and off-axis details determine what support and additional work the part needs.',
  featureIntro:'Diameters, shoulders and an axial bore can be produced around a shared axis. A flat, slot or cross-hole introduces another tool direction. Relating those features to the turned surfaces helps keep the finished assembly relationships clear when the part moves to another operation.',
  materialsIntro:'The grade affects chip formation, tool wear and the working surface. Stainless parts need the service environment and treatment considered; copper and brass fittings may instead be governed by contact or sealing requirements. Each option below still needs a defined grade and final condition.',
  decisions:[
   {feature:'Stepped diameters, shoulders and threads',consider:'Turning as the starting operation',reason:'These features share a rotational axis. Keeping their fitted relationships tied to that axis helps define the machining and measurement sequence.'},
   {feature:'A round body with flats or cross-holes',consider:'Turning followed by secondary machining',reason:'The body can be turned while non-rotational details need another tool direction. Available tooling and access determine whether that work shares a setup or moves to a separate one.'},
   {feature:'A long shaft, thin sleeve or deep bore',consider:'Support and internal tool reach',reason:'Slender workpieces and long-reaching tools are more sensitive to movement. Wall thickness, support and bore access need review together before a close fit or runout limit is agreed.'},
  ],
  links:[{title:'Stainless shafts and fittings',href:'/capabilities/stainless-steel-cnc-parts/'},{title:'Copper and brass components',href:'/capabilities/copper-brass-cnc-parts/'},{title:'Secondary CNC milling',href:'/capabilities/cnc-milling-service/'}],
 },
 '5-axis-cnc-machining':{
  lead:'Multi-axis machining gives tools access to angled faces and curved surfaces on custom parts. The geometry determines whether indexed positioning, simultaneous motion or a sequence of simpler setups is appropriate.',
  description:'5-axis CNC machining for angled faces and curved components. Compare indexed positioning, continuous motion and setup choices, with drawing-based acceptance.',
  heading:'When changing the tool direction helps',
  intro:'Separate access to a face from the motion needed to cut its surface. Those are different reasons to consider multi-axis work.',
  featureIntro:'An angled hole or face may be reached with the part held at a fixed orientation. A continuous curved surface may require the tool direction to change along its path. Both routes depend on cutter reach and clearance around the workpiece and fixture.',
  materialsIntro:'Tool access is only part of the route decision. Alloy, hardness or treatment condition and the amount of stock to remove also affect the machining plan. The listed families below are reviewed for the exact grade and final surface requirements.',
  decisions:[
   {feature:'A few accessible faces in different directions',consider:'Several setups or indexed positioning',reason:'If each feature can be cut at a fixed orientation, continuous five-axis motion may add little. Compare access and datum transfer before choosing the route.'},
   {feature:'Several angled faces or difficult side access',consider:'A multi-axis positioning review',reason:'Reorienting the part can improve access around it. Fixture, tool and spindle clearance still limit what can be reached in each position.'},
   {feature:'A continuous curved or blade-like surface',consider:'Whether orientation must change along the cut',reason:'The model may call for simultaneous motion to follow the contour. Surface shape, tool reach and clearance need to be checked before that route is confirmed.'},
  ],
  links:[{title:'CNC milling and additional setups',href:'/capabilities/cnc-milling-service/'},{title:'Aluminum parts and finishing',href:'/capabilities/aluminum-cnc-parts/'},{title:'Stainless material requirements',href:'/capabilities/stainless-steel-cnc-parts/'}],
 },
 'casting-machining':{
  lead:'Casting machining finishes the bores, seal lands and mounting faces of cast housings and pump bodies. The cast blank supplies the overall shape, while its condition and available allowance govern the machining plan.',
  description:'Finish machining for cast housings and pump bodies. Understand cast surfaces, machining allowance, locating datums and finished interfaces before quotation.',
  heading:'Decide which surfaces need machining',
  intro:'Begin with the connection between the supplied casting and the finished part. Each needs its own definition and acceptance requirements.',
  featureIntro:'A cast housing can retain its ribs and outer form while selected bores, seal lands and mounting faces are machined. The finished drawing distinguishes those working interfaces from surfaces that may remain as-cast.',
  materialsIntro:'Casting alloy and blank condition influence how the part can be located, cut and finished. Machining allowance is the material available to reach the final surfaces; coating, heat treatment or incoming variation must be considered before those surfaces are accepted.',
  decisions:[
   {feature:'Ribs and an outer shape that can stay as-cast',consider:'Machining only the working interfaces',reason:'A casting can provide the overall form while cutting establishes the required fit at bores and faces. The drawing must identify which surfaces may retain the cast finish.'},
   {feature:'A bore or flange close to the blank surface',consider:'Machining allowance and blank variation',reason:'There must be enough material in the right place to reach the finished geometry. Blank variation or a shifted locating surface may affect whether all interfaces can be machined.'},
   {feature:'Several fitted interfaces on an irregular body',consider:'A consistent locating and inspection scheme',reason:'The fixture needs usable contact points on the blank and references for the finished part. Incoming acceptance and final dimensional checks address different stages.'},
  ],
  links:[{title:'CNC milling of finished interfaces',href:'/capabilities/cnc-milling-service/'},{title:'Aluminum alloy and finish review',href:'/capabilities/aluminum-cnc-parts/'}],
 },
 'stainless-steel-cnc-parts':{
  lead:'Stainless steel machining suits shafts, fittings and locking components where the service environment matters. Grade, condition and finish balance corrosion requirements, mechanical demands and machinability.',
  description:'Stainless steel CNC machining for shafts, fittings and locking parts. Review grade selection, service environment, machining sequence and final treatment.',
  heading:'Match the stainless grade to its use',
  intro:'Choose the grade from the service environment and working interfaces, then specify its condition and treatment.',
  featureIntro:'A stepped shaft, flange or locking pin relies on its working diameters and mating surfaces. The stainless grade and condition affect how those features are cut, while corrosion, wear and assembly requirements determine the final surface specification.',
  materialsIntro:'304 is a starting point for many general corrosion requirements; 316 and 316L are candidates when the exposure calls for a more corrosion-resistant grade. The actual medium and temperature still determine suitability. Machinability, hardness and any heat treatment, passivation, electropolishing or cosmetic finish are reviewed alongside that choice.',
  decisions:[
   {feature:'A fitting exposed to moisture or chemicals',consider:'Compare 304 with 316 / 316L for the exposure',reason:'316-family grades are candidates for more demanding corrosion requirements. Medium, concentration, temperature and surface condition still set the limits; the grade name alone is not an approval for the environment.'},
   {feature:'Many threads, small features or deep bores',consider:'Machinability alongside service requirements',reason:'Stainless grades and conditions behave differently during cutting. Tool access, work hardening and deburring can affect the route, so machining convenience is one part of the material choice.'},
   {feature:'A fitted shaft, locking pin or treated surface',consider:'The condition at final acceptance',reason:'Hardness, mating dimensions and surface treatment need a compatible sequence. The finished part is checked at the stage specified on the drawing, with functional requirements agreed separately.'},
  ],
  links:[{title:'CNC turning of shafts and fittings',href:'/capabilities/cnc-turning-service/'},{title:'CNC milling of secondary features',href:'/capabilities/cnc-milling-service/'}],
 },
 'copper-brass-cnc-parts':{
  lead:'Copper and brass machining produces contacts, connectors and fluid fittings with defined working surfaces. Electrical, thermal and sealing requirements lead to different alloy, geometry and finishing choices.',
  description:'Copper and brass CNC machining for contacts, connectors and fittings. Compare functional needs, alloy selection, burr control and dimensions after plating.',
  heading:'Let the working surface guide the alloy',
  intro:'Copper and brass are separate material choices. The part function determines which grade, interface and treatment need the closest review.',
  featureIntro:'A contact needs a usable current path, a heat-transfer part needs suitable contact with the adjoining component, and a fitting needs its threads and sealing faces to work together. The material specification and the geometry support those different functions.',
  materialsIntro:'Conductivity, machinability, corrosion exposure and material restrictions may lead to different copper or brass grades. The listed options identify starting points for review. Plating or polishing must also preserve the contact, seal and dimensional requirements of the finished component.',
  decisions:[
   {feature:'An electrical contact or current-carrying part',consider:'A high-conductivity copper grade, such as C11000',reason:'Alloy, contact area, material condition and plating affect the electrical path. Specify the current requirement and assembled test conditions for the component.'},
   {feature:'A heat-transfer part or mating thermal surface',consider:'Material properties and the contacting faces',reason:'Heat passes through both the part and its interfaces. Fit, contact area and any coating need to suit the assembly; thermal performance is confirmed by the agreed design and tests.'},
   {feature:'A threaded connector or fluid fitting',consider:'A machinable brass grade, where the application permits',reason:'C36000 is a machining-oriented option in the listed grades. Fluid compatibility and material restrictions may rule it out; the thread, burr limits and any plating must also suit the finished connection.'},
  ],
  links:[{title:'CNC turning for connectors and fittings',href:'/capabilities/cnc-turning-service/'},{title:'CNC milling for blocks and passages',href:'/capabilities/cnc-milling-service/'}],
 },
 'plastic-machined-parts':{
  lead:'Plastic machining produces guides, insulators and housings without committing the design to a molded tool. Polymer grade, load, temperature and moisture exposure guide the choice and the final fit.',
  description:'CNC machining for plastic guides, insulators and housings. Review polymer selection, loads, temperature, moisture and dimensional acceptance for your part.',
  heading:'Choose the polymer for the working conditions',
  intro:'The shape may be machinable in several polymers, but their behavior in the assembly can be different. Begin with the job the part must do.',
  featureIntro:'A guide needs a stable working surface, an insulator needs the right material properties, and a housing needs its fits to remain usable in service. Polymer, stock condition and assembly loads therefore belong in the same material decision.',
  materialsIntro:'Wear, chemical exposure, insulation and temperature requirements narrow the polymer choice. Temperature change and moisture uptake can also change dimensions, with the effect depending on the grade and conditions. The listed options are reviewed against those needs, including fillers and the state in which the part is measured.',
  decisions:[
   {feature:'A guide, bushing or sliding interface',consider:'Compare POM and nylon grades against the load and fit',reason:'Contact pressure, motion and temperature affect wear and deformation. For moisture-sensitive nylon, specify conditioning and review the fit under the intended service load and environment.'},
   {feature:'An insulator or chemically exposed component',consider:'The specific medium and material requirements',reason:'Electrical behavior, chemical resistance and temperature limits depend on the polymer and grade. Fillers can change properties, so a general plastic name is not a sufficient specification.'},
   {feature:'Close fits in changing temperature or humidity',consider:'Dimensional stability and measurement conditions',reason:'Thermal expansion and moisture uptake vary by polymer. Conditioning and measurement temperature need to match the acceptance plan; nylon and other moisture-sensitive grades deserve particular review.'},
  ],
  links:[{title:'CNC milling for pockets and mounting faces',href:'/capabilities/cnc-milling-service/'},{title:'CNC turning for bushings and sleeves',href:'/capabilities/cnc-turning-service/'}],
 },
};
