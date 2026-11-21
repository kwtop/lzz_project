import {manufacturingCapacity} from './factoryCapabilities';
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
  lead:"We mill pockets, mounting faces and hole patterns in custom housings and brackets, using the assembly datums to locate them.",
  description:'CNC milling for housings, brackets and pocketed parts. Understand tool access, internal radii and multiple setups, with material and inspection requirements.',
  heading:'How your part shape guides milling',
  intro:"Mating surfaces tell us where to locate the part and which faces need to stay accessible.",
  featureIntro:"We plan cutter access and support around deep pockets, small corner radii and thin walls.",
  materialsIntro:"Consider aluminum for a lighter housing; choose the grade and finish for the service conditions and the fit after treatment.",
  decisions:[
   {feature:'Pockets, slots and internal corners',consider:'Tool access and a usable corner radius',reason:'A larger internal radius can admit a sturdier cutter if the design permits; deep, narrow pockets may still need a slender tool.'},
   {feature:'Thin walls or broad mounting faces',consider:'Support during cutting and measurement',reason:'Clamping and cutting can distort thin walls; suitable support helps preserve flatness at mating faces.'},
   {feature:'Holes and pockets on several faces',consider:'Additional setups or multi-axis access',reason:'Repositioning opens access to another face. Shared datums preserve alignment; the cut determines whether the tool angle must change in motion.'},
  ],
  links:[{title:'Aluminum machining',href:'/capabilities/aluminum-cnc-parts/'},{title:'Stainless steel machining',href:'/capabilities/stainless-steel-cnc-parts/'},{title:'Compare multi-axis access',href:'/capabilities/5-axis-cnc-machining/'}],
 },
 'aluminum-cnc-parts':{
  lead:"We machine lightweight aluminum housings, covers and structural parts, planning the fit around the final surface treatment.",
  description:'Aluminum CNC machining for housings, covers and structural parts. Compare alloy, temper, thin-wall support and finishing requirements for your drawing.',
  heading:'Choose aluminum around the working part',
  intro:'The useful choice is an alloy and condition suited to the job, followed by a finish that preserves its working interfaces.',
  featureIntro:"Recessed cavities reduce weight while leaving material for mounts and mating faces.",
  materialsIntro:"Consider 6061 for corrosion resistance, welding or anodized appearance, and 7075 when strength governs the design.",
  decisions:[
   {feature:'A housing or bracket with a weight target',consider:'Loads, section thickness and permitted deflection',reason:'Assess alloy and temper against strength, weight, corrosion exposure and the intended finish.'},
   {feature:'Deep pockets and thin remaining walls',consider:'Stock removal, support and flatness',reason:'Heavy stock removal can leave walls sensitive to stress and clamping; review support and cutting sequence before setting a tight flatness limit.'},
   {feature:'Anodized parts with bores or sealing faces',consider:'The fit after the final treatment',reason:'Anodizing affects dimensions and appearance. Identify coated, masked and mating surfaces separately.'},
  ],
  links:[{title:'CNC milling for pockets and faces',href:'/capabilities/cnc-milling-service/'},{title:'CNC turning for round interfaces',href:'/capabilities/cnc-turning-service/'}],
 },
 'cnc-turning-service':{
  lead:"We turn shafts, sleeves and fittings around a shared axis, with secondary milling for features such as flats, slots and cross-holes.",
  description:'CNC turning for shafts, sleeves and fittings. Understand shared-axis geometry, deep bores, slender parts and secondary milling before preparing your drawing.',
  heading:'Choose the route around the axis',
  intro:'Compare the tool reach and support required before choosing which features to cut together.',
  featureIntro:"A shared axis ties fitted diameters, shoulders and bores to the same assembly reference.",
  materialsIntro:"The stock grade affects chips, tool wear and finish; service conditions and sealing or contact duties narrow the choice.",
  decisions:[
   {feature:'Stepped diameters, shoulders and threads',consider:'Turning as the starting operation',reason:'One datum axis gives a common reference for machining and measurement.'},
   {feature:'A round body with flats or cross-holes',consider:'Turning followed by secondary machining',reason:'Tooling and access determine whether off-axis cuts share the setup or require a separate one.'},
   {feature:'A long shaft, thin sleeve or deep bore',consider:'Support and internal tool reach',reason:'Check wall thickness, support and bore access before setting a close fit or runout limit.'},
  ],
  links:[{title:'Stainless shafts and fittings',href:'/capabilities/stainless-steel-cnc-parts/'},{title:'Copper and brass components',href:'/capabilities/copper-brass-cnc-parts/'},{title:'Secondary CNC milling',href:'/capabilities/cnc-milling-service/'}],
 },
 '5-axis-cnc-machining':{
  lead:`LZZ operates ${manufacturingCapacity.fiveAxisMachines} five-axis machines in Hangzhou for multi-face components, angled features and curved geometries, from prototypes to small production runs.`,
  description:`5-axis CNC machining at LZZ in Hangzhou: ${manufacturingCapacity.fiveAxisMachines} machines, workshop and finished-part records, and ${manufacturingCapacity.criticalFeatureTolerance} on reviewed critical features, subject to part evaluation.`,
  heading:'When changing the tool direction helps',
  intro:"Compare the setups by tool reach, clearance and how they carry the datums from one face to another.",
  featureIntro:'We choose indexed or simultaneous motion by how the cutter needs to approach each surface.',
  materialsIntro:"We plan stock removal around the alloy, hardness, treatment and final surface requirements.",
  decisions:[
   {feature:'A few accessible faces in different directions',consider:'Several setups or indexed positioning',reason:'Fixed angles may suffice if each face stays accessible and the datums can be transferred.'},
   {feature:'Several angled faces or difficult side access',consider:'A multi-axis positioning review',reason:'Rotating the part can open side access, within fixture, tool and spindle clearance.'},
   {feature:'A continuous curved or blade-like surface',consider:'Whether orientation must change along the cut',reason:'A blade contour may need a changing tool angle to reach the root without interference.'},
  ],
  links:[{title:'CNC milling and additional setups',href:'/capabilities/cnc-milling-service/'},{title:'Aluminum parts and finishing',href:'/capabilities/aluminum-cnc-parts/'},{title:'Stainless material requirements',href:'/capabilities/stainless-steel-cnc-parts/'}],
 },
 'casting-machining':{
  lead:"We finish-machine bores, seal lands and mounting faces on cast housings and pump bodies without recutting the whole form.",
  description:'Finish machining for cast housings and pump bodies. Understand cast surfaces, machining allowance, locating datums and finished interfaces before quotation.',
  heading:'Decide which surfaces need machining',
  intro:'Keep incoming casting acceptance separate from checks on the finished part.',
  featureIntro:'Keep ribs and outer surfaces as cast where the drawing permits; machine only the interfaces that need a defined fit.',
  materialsIntro:'Blank variation, coating and heat treatment affect how much stock is available to reach the final dimensions.',
  decisions:[
   {feature:'Ribs and an outer shape that can stay as-cast',consider:'Machining only the working interfaces',reason:'Mark the as-cast surfaces so machining stays focused on bores and mating faces.'},
   {feature:'A bore or flange close to the blank surface',consider:'Machining allowance and blank variation',reason:'Shifted locating surfaces or blank variation can leave too little stock at a finished interface.'},
   {feature:'Several fitted interfaces on an irregular body',consider:'A consistent locating and inspection scheme',reason:'The fixture needs stable contacts on the blank and usable references for measuring the finished part.'},
  ],
  links:[{title:'CNC milling of finished interfaces',href:'/capabilities/cnc-milling-service/'},{title:'Aluminum alloy and finish review',href:'/capabilities/aluminum-cnc-parts/'}],
 },
 'stainless-steel-cnc-parts':{
  lead:"We machine stainless shafts, fittings and locking parts in grades selected for the service environment and load.",
  description:'Stainless steel CNC machining for shafts, fittings and locking parts. Review grade selection, service environment, machining sequence and final treatment.',
  heading:'Match the stainless grade to its use',
  intro:'Choose the grade from the service environment and working interfaces, then specify its condition and treatment.',
  featureIntro:"Shafts, flanges and locking pins rely on fitted diameters and surfaces suited to wear, corrosion and assembly.",
  materialsIntro:'Compare 304 for general use with 316 or 316L for more demanding exposure; check the actual medium, temperature and surface treatment.',
  decisions:[
   {feature:'A fitting exposed to moisture or chemicals',consider:'Exposure and surface condition',reason:'Assess concentration and surface condition alongside the grade for corrosion resistance.'},
   {feature:'Many threads, small features or deep bores',consider:'Machinability alongside service requirements',reason:'Tool access, work hardening and deburring can change the cutting sequence.'},
   {feature:'A fitted shaft, locking pin or treated surface',consider:'The condition at final acceptance',reason:'Plan hardness, treatment and mating dimensions together; agree any functional tests separately.'},
  ],
  links:[{title:'CNC turning of shafts and fittings',href:'/capabilities/cnc-turning-service/'},{title:'CNC milling of secondary features',href:'/capabilities/cnc-milling-service/'}],
 },
 'copper-brass-cnc-parts':{
  lead:"We machine copper and brass contacts, connectors and fittings around the surfaces that carry current, transfer heat or seal.",
  description:'Copper and brass CNC machining for contacts, connectors and fittings. Compare functional needs, alloy selection, burr control and dimensions after plating.',
  heading:'Let the working surface guide the alloy',
  intro:'Copper and brass are separate material choices. The part function determines which grade, interface and treatment need the closest review.',
  featureIntro:"Contact area matters for electrical and thermal parts; threads and seal faces govern the fit of a fluid connection.",
  materialsIntro:"Compare conductivity, machinability, corrosion exposure and material restrictions before choosing the alloy and finish.",
  decisions:[
   {feature:'An electrical contact or current-carrying part',consider:'A high-conductivity copper grade, such as C11000',reason:'Alloy, condition, contact area and plating affect conduction; specify current and assembled test conditions.'},
   {feature:'A heat-transfer part or mating thermal surface',consider:'Material properties and the contacting faces',reason:'Fit, contact area and coatings affect heat transfer. Validate performance with the assembled part.'},
   {feature:'A threaded connector or fluid fitting',consider:'A machinable brass grade, where the application permits',reason:"Consider C36000 if the fluid and material restrictions allow it; account for burrs and plating at the thread."},
  ],
  links:[{title:'CNC turning for connectors and fittings',href:'/capabilities/cnc-turning-service/'},{title:'CNC milling for blocks and passages',href:'/capabilities/cnc-milling-service/'}],
 },
 'plastic-machined-parts':{
  lead:"We machine guides, insulators and housings from solid polymer stock without the need for a mold.",
  description:'CNC machining for plastic guides, insulators and housings. Review polymer selection, loads, temperature, moisture and dimensional acceptance for your part.',
  heading:'Choose the polymer for the working conditions',
  intro:'The shape may be machinable in several polymers, but their behavior in the assembly can be different. Begin with the job the part must do.',
  featureIntro:"We review working surfaces and fits for the loads and environment the plastic part will see in service.",
  materialsIntro:"Match polymer grade and fillers to wear, chemical exposure and insulation needs; allow for dimensional changes with temperature or moisture.",
  decisions:[
   {feature:'A guide, bushing or sliding interface',consider:'Compare POM and nylon grades against the load and fit',reason:'Contact pressure, motion and temperature affect wear and deformation; assess fit under the intended load.'},
   {feature:'An insulator or chemically exposed component',consider:'The specific medium and material requirements',reason:'Insulation, chemical resistance and temperature limits vary by grade and filler.'},
   {feature:'Close fits in changing temperature or humidity',consider:'Dimensional stability and measurement conditions',reason:'Set measurement temperature and conditioning, especially for moisture-sensitive grades such as nylon.'},
  ],
  links:[{title:'CNC milling for pockets and mounting faces',href:'/capabilities/cnc-milling-service/'},{title:'CNC turning for bushings and sleeves',href:'/capabilities/cnc-turning-service/'}],
 },
};
