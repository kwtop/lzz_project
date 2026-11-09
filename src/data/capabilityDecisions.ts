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
  lead:"We mill housings, brackets and other custom parts with pockets, flat faces and hole patterns. Internal corners, wall thickness and the direction of each feature determine the tools and setups needed.",
  description:'CNC milling for housings, brackets and pocketed parts. Understand tool access, internal radii and multiple setups, with material and inspection requirements.',
  heading:'How your part shape guides milling',
  intro:"The surfaces that fit together establish the machining references. Their orientation and accessibility determine where we can hold the part and approach it with a cutter.",
  featureIntro:"Deep pockets and small internal corners restrict the cutter and can require a more slender tool. Thin walls need support during cutting. To reach another face, we may reposition the part using locating surfaces that preserve the dimensional references.",
  materialsIntro:"Aluminum can suit housings where weight matters. Steel, stainless steel, copper alloys and polymers suit different service conditions and need different cutting and workholding plans. We review the exact grade and treatment for the part, including fitted dimensions in their final specified condition.",
  decisions:[
   {feature:'Pockets, slots and internal corners',consider:'Tool access and a usable corner radius',reason:'A rotating cutter leaves a radius at an internal corner. Where the design allows it, a more generous radius can give a larger tool room to work; deep, narrow features need a separate access review.'},
   {feature:'Thin walls or broad mounting faces',consider:'Support during cutting and measurement',reason:'Cutting and clamping forces can move a thin section. The machining sequence and support need to suit the part, especially where flatness or a mating face controls assembly.'},
   {feature:'Holes and pockets on several faces',consider:'Additional setups or multi-axis access',reason:'Changing the holding position opens access to another face. Select the locating method to preserve feature relationships, then choose indexed positioning or simultaneous motion from the cutting path.'},
  ],
  links:[{title:'Aluminum machining',href:'/capabilities/aluminum-cnc-parts/'},{title:'Stainless steel machining',href:'/capabilities/stainless-steel-cnc-parts/'},{title:'Compare multi-axis access',href:'/capabilities/5-axis-cnc-machining/'}],
 },
 'aluminum-cnc-parts':{
  lead:"We machine aluminum housings, covers and structural parts. The alloy and temper need to suit the loads and environment; surface treatment must preserve the finished fit.",
  description:'Aluminum CNC machining for housings, covers and structural parts. Compare alloy, temper, thin-wall support and finishing requirements for your drawing.',
  heading:'Choose aluminum around the working part',
  intro:'The useful choice is an alloy and condition suited to the job, followed by a finish that preserves its working interfaces.',
  featureIntro:"Machining a cavity removes weight while retaining mounting and mating features. Thinner walls need closer attention to support and the order of material removal. These housings show how cavity shape and interface layout change that work.",
  materialsIntro:"6061 is often a starting point for corrosion resistance, welding or anodized appearance. Where strength governs the design, 7075 may be worth considering. We review either grade with its temper, loads, environment and finish, with fitted dimensions specified after the intended treatment.",
  decisions:[
   {feature:'A housing or bracket with a weight target',consider:'6061 as a starting point; 7075 for strength-led review',reason:'Select the alloy from the loads, section geometry and permitted deflection. Review its temper, corrosion exposure and finishing route alongside the weight target.'},
   {feature:'Deep pockets and thin remaining walls',consider:'Stock removal, support and flatness',reason:'Removing much of the stock can leave a part sensitive to clamping and material movement. Support and machining sequence need review before a tight flatness requirement is accepted.'},
   {feature:'Anodized parts with bores or sealing faces',consider:'The fit after the final treatment',reason:'A surface treatment can change dimensions and appearance. The drawing needs to distinguish coated, masked and mating surfaces so the finished interfaces can be checked in the correct state.'},
  ],
  links:[{title:'CNC milling for pockets and faces',href:'/capabilities/cnc-milling-service/'},{title:'CNC turning for round interfaces',href:'/capabilities/cnc-turning-service/'}],
 },
 'cnc-turning-service':{
  lead:"We turn shafts, sleeves and fittings around a common axis. Flats, slots or cross-holes may need milling as well, so we review the complete part before choosing the machining sequence.",
  description:'CNC turning for shafts, sleeves and fittings. Understand shared-axis geometry, deep bores, slender parts and secondary milling before preparing your drawing.',
  heading:'Choose the route around the axis',
  intro:'Turning establishes the round features. Part length and internal access determine the support and tool reach needed; off-axis details may require another operation.',
  featureIntro:"Turning produces diameters, shoulders and bores around one axis. Flats, slots and cross-holes need a different tool approach. We use the turned surfaces as references when locating those features in a later operation.",
  materialsIntro:"Material grade affects chip formation, tool wear and surface condition. For stainless parts, we review the service environment and treatment. Copper or brass fittings may be governed by contact or sealing requirements. Each needs an exact grade and finished condition.",
  decisions:[
   {feature:'Stepped diameters, shoulders and threads',consider:'Turning as the starting operation',reason:'These features share a rotational axis. Keeping their fitted relationships tied to that axis helps define the machining and measurement sequence.'},
   {feature:'A round body with flats or cross-holes',consider:'Turning followed by secondary machining',reason:'The body can be turned while non-rotational details need another tool direction. Available tooling and access determine whether that work shares a setup or moves to a separate one.'},
   {feature:'A long shaft, thin sleeve or deep bore',consider:'Support and internal tool reach',reason:'Slender workpieces and long-reaching tools are more sensitive to movement. Wall thickness, support and bore access need review together before a close fit or runout limit is agreed.'},
  ],
  links:[{title:'Stainless shafts and fittings',href:'/capabilities/stainless-steel-cnc-parts/'},{title:'Copper and brass components',href:'/capabilities/copper-brass-cnc-parts/'},{title:'Secondary CNC milling',href:'/capabilities/cnc-milling-service/'}],
 },
 '5-axis-cnc-machining':{
  lead:`LZZ operates ${manufacturingCapacity.fiveAxisMachines} five-axis machines in Hangzhou for multi-face components, angled features and curved geometries, from prototypes to small production runs.`,
  description:`5-axis CNC machining at LZZ in Hangzhou: ${manufacturingCapacity.fiveAxisMachines} machines, workshop and finished-part records, and ${manufacturingCapacity.criticalFeatureTolerance} on reviewed critical features, subject to part evaluation.`,
  heading:'When changing the tool direction helps',
  intro:"Some features need a different fixed tool approach. Others need the tool direction to change during cutting. The surface geometry determines which type of multi-axis work is appropriate.",
  featureIntro:'An angled hole or face may be reached with the part held at a fixed orientation. A continuous curved surface may require the tool direction to change along its path. Both routes depend on cutter reach and clearance around the workpiece and fixture.',
  materialsIntro:"Alongside tool access, we review the exact alloy, hardness or treatment condition, stock removal and required final surface. These details determine the machining sequence.",
  decisions:[
   {feature:'A few accessible faces in different directions',consider:'Several setups or indexed positioning',reason:'If each feature can be cut at a fixed orientation, continuous five-axis motion may add little. Compare access and datum transfer before choosing the route.'},
   {feature:'Several angled faces or difficult side access',consider:'A multi-axis positioning review',reason:'Reorienting the part can improve access around it. Fixture, tool and spindle clearance still limit what can be reached in each position.'},
   {feature:'A continuous curved or blade-like surface',consider:'Whether orientation must change along the cut',reason:'The model may call for simultaneous motion to follow the contour. Surface shape, tool reach and clearance need to be checked before that route is confirmed.'},
  ],
  links:[{title:'CNC milling and additional setups',href:'/capabilities/cnc-milling-service/'},{title:'Aluminum parts and finishing',href:'/capabilities/aluminum-cnc-parts/'},{title:'Stainless material requirements',href:'/capabilities/stainless-steel-cnc-parts/'}],
 },
 'casting-machining':{
  lead:"We finish-machine bores, seal lands and mounting faces on cast housings and pump bodies. The casting provides the overall shape; its condition and machining allowance determine how we can locate and cut the working surfaces.",
  description:'Finish machining for cast housings and pump bodies. Understand cast surfaces, machining allowance, locating datums and finished interfaces before quotation.',
  heading:'Decide which surfaces need machining',
  intro:'The supplied casting and finished part need separate specifications and acceptance requirements.',
  featureIntro:'We machine the bores, seal lands and mounting faces while retaining the ribs and outer form of the casting. The finished drawing identifies these working interfaces and the surfaces that can remain as-cast.',
  materialsIntro:'Casting alloy and blank condition influence how the part can be located, cut and finished. Machining allowance is the material available to reach the final surfaces; coating, heat treatment or incoming variation must be considered before those surfaces are accepted.',
  decisions:[
   {feature:'Ribs and an outer shape that can stay as-cast',consider:'Machining only the working interfaces',reason:'A casting can provide the overall form while cutting establishes the required fit at bores and faces. The drawing must identify which surfaces may retain the cast finish.'},
   {feature:'A bore or flange close to the blank surface',consider:'Machining allowance and blank variation',reason:'There must be enough material in the right place to reach the finished geometry. Blank variation or a shifted locating surface may affect whether all interfaces can be machined.'},
   {feature:'Several fitted interfaces on an irregular body',consider:'A consistent locating and inspection scheme',reason:'The fixture needs usable contact points on the blank and references for the finished part. Incoming acceptance and final dimensional checks address different stages.'},
  ],
  links:[{title:'CNC milling of finished interfaces',href:'/capabilities/cnc-milling-service/'},{title:'Aluminum alloy and finish review',href:'/capabilities/aluminum-cnc-parts/'}],
 },
 'stainless-steel-cnc-parts':{
  lead:"We machine stainless steel shafts, fittings and locking components. We review the grade and finished condition against the service environment and mechanical loads, then plan the cutting process for that material.",
  description:'Stainless steel CNC machining for shafts, fittings and locking parts. Review grade selection, service environment, machining sequence and final treatment.',
  heading:'Match the stainless grade to its use',
  intro:'Choose the grade from the service environment and working interfaces, then specify its condition and treatment.',
  featureIntro:"Working diameters and mating surfaces control the fit of a shaft, flange or locking pin. Grade and condition affect how we machine them. Corrosion exposure, wear and assembly requirements determine the final surface specification.",
  materialsIntro:'304 is a starting point for many general corrosion requirements; 316 and 316L are candidates when the exposure calls for a more corrosion-resistant grade. The actual medium and temperature still determine suitability. Machinability, hardness and any heat treatment, passivation, electropolishing or cosmetic finish are reviewed alongside that choice.',
  decisions:[
   {feature:'A fitting exposed to moisture or chemicals',consider:'Compare 304 with 316 / 316L for the exposure',reason:'316-family grades are candidates for more demanding corrosion requirements. Medium, concentration, temperature and surface condition still set the limits; the grade name alone is not an approval for the environment.'},
   {feature:'Many threads, small features or deep bores',consider:'Machinability alongside service requirements',reason:'Stainless grades and conditions behave differently during cutting. Tool access, work hardening and deburring can affect the route, so machining convenience is one part of the material choice.'},
   {feature:'A fitted shaft, locking pin or treated surface',consider:'The condition at final acceptance',reason:'Hardness, mating dimensions and surface treatment need a compatible sequence. The finished part is checked at the stage specified on the drawing, with functional requirements agreed separately.'},
  ],
  links:[{title:'CNC turning of shafts and fittings',href:'/capabilities/cnc-turning-service/'},{title:'CNC milling of secondary features',href:'/capabilities/cnc-milling-service/'}],
 },
 'copper-brass-cnc-parts':{
  lead:"We machine copper and brass contacts, connectors and fluid fittings. The electrical path, heat transfer or sealing duty determines the alloy, geometry and finish needed at each working surface.",
  description:'Copper and brass CNC machining for contacts, connectors and fittings. Compare functional needs, alloy selection, burr control and dimensions after plating.',
  heading:'Let the working surface guide the alloy',
  intro:'Copper and brass are separate material choices. The part function determines which grade, interface and treatment need the closest review.',
  featureIntro:"Electrical contacts need a usable current path. Heat-transfer components depend on contact with adjoining parts; fluid fittings depend on their threads and seals. The alloy and geometry need to suit the specific connection.",
  materialsIntro:"Conductivity, machinability, corrosion exposure and material restrictions guide the copper or brass grade we review for your part. Plating or polishing must also preserve the contact, seal and dimensional requirements of the finished component.",
  decisions:[
   {feature:'An electrical contact or current-carrying part',consider:'A high-conductivity copper grade, such as C11000',reason:'Alloy, contact area, material condition and plating affect the electrical path. Specify the current requirement and assembled test conditions for the component.'},
   {feature:'A heat-transfer part or mating thermal surface',consider:'Material properties and the contacting faces',reason:'Heat passes through both the part and its interfaces. Fit, contact area and any coating need to suit the assembly; thermal performance is confirmed by the agreed design and tests.'},
   {feature:'A threaded connector or fluid fitting',consider:'A machinable brass grade, where the application permits',reason:"C36000 is a machining-oriented option. Fluid compatibility and material restrictions may rule it out; the thread, burr limits and any plating must also suit the finished connection."},
  ],
  links:[{title:'CNC turning for connectors and fittings',href:'/capabilities/cnc-turning-service/'},{title:'CNC milling for blocks and passages',href:'/capabilities/cnc-milling-service/'}],
 },
 'plastic-machined-parts':{
  lead:"We machine plastic guides, insulators and housings without a molding tool. The polymer grade must suit the loads, temperature and moisture exposure while maintaining the required fit.",
  description:'CNC machining for plastic guides, insulators and housings. Review polymer selection, loads, temperature, moisture and dimensional acceptance for your part.',
  heading:'Choose the polymer for the working conditions',
  intro:'The shape may be machinable in several polymers, but their behavior in the assembly can be different. Begin with the job the part must do.',
  featureIntro:"For a plastic guide, insulator or housing, we review the working surfaces and fit under service conditions. The polymer choice must also account for the stock condition, required properties and assembly loads.",
  materialsIntro:"Wear, chemical exposure, insulation and temperature requirements narrow the polymer choice. Temperature change and moisture uptake can also change dimensions, with the effect depending on the grade and conditions. We review the grade, fillers and measurement state against those service requirements.",
  decisions:[
   {feature:'A guide, bushing or sliding interface',consider:'Compare POM and nylon grades against the load and fit',reason:'Contact pressure, motion and temperature affect wear and deformation. For moisture-sensitive nylon, specify conditioning and review the fit under the intended service load and environment.'},
   {feature:'An insulator or chemically exposed component',consider:'The specific medium and material requirements',reason:'Electrical behavior, chemical resistance and temperature limits depend on the polymer and grade. Fillers can change properties, so a general plastic name is not a sufficient specification.'},
   {feature:'Close fits in changing temperature or humidity',consider:'Dimensional stability and measurement conditions',reason:'Thermal expansion and moisture uptake vary by polymer. Conditioning and measurement temperature need to match the acceptance plan; nylon and other moisture-sensitive grades deserve particular review.'},
  ],
  links:[{title:'CNC milling for pockets and mounting faces',href:'/capabilities/cnc-milling-service/'},{title:'CNC turning for bushings and sleeves',href:'/capabilities/cnc-turning-service/'}],
 },
};
