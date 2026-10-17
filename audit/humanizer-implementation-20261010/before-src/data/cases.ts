export interface EngineeringCase {
 slug:string;title:string;lead:string;process:string;hero:string;photos:string[];
 workpiece:string;setup:string;visible:string;inspection:string;relatedCapabilities:string[];
 video?:'display-housing';
 collection?:'plastic'|'metal';
}
// These are process-photo studies, not customer performance claims. Details not
// visible in the source photos remain requirements to confirm from a drawing.
export const engineeringCases:EngineeringCase[]=[
 {
  slug:'five-axis-machining-multi-face-parts',title:'Five-axis machining for multi-face components',process:'Multi-axis machining',hero:'five-axis-operation',photos:['five-axis-operation','five-axis-parts'],
  lead:'Machining holes, side openings and contoured faces on a component held in a rotary setup.',
  workpiece:'Front-face holes and a curved side opening place machining features on different faces of this component. Their relationship to a common datum is an important part of planning a similar job.',
  setup:'The workpiece is held in front of a rotary assembly, with spindle access from above. Tool reach and clearance around the fixture need to be checked for each face before the machining sequence is confirmed.',
  visible:'The accompanying components have machined pockets, contoured edges and repeated hole patterns. These features provide useful reference points when discussing a similar geometry.',
  inspection:'For a comparable project, identify datums, mating features, positional tolerances, surface requirements and the dimensional record you need. LZZ can assess achievable limits and the inspection method from the drawing.',
  relatedCapabilities:['5-axis-cnc-machining','cnc-milling-service'],
 },
 {
  slug:'turning-then-milling-cylindrical-parts',title:'Turning followed by milling',process:'Turning + milling',hero:'turn-mill-operation',photos:['turn-mill-operation','turn-mill-parts'],
  lead:'A turned component returns to the machine for features that require milling.',
  workpiece:'Circular bodies combine central bores with additional milled features. The drawing needs to locate those features relative to the turned axis.',
  setup:'A turned part is located for a subsequent milling operation. The relationship between the turned datum and milled features should be reviewed before selecting the holding method and sequence.',
  visible:'The circular parts combine internal bores with machined details around their outer form.',
  inspection:'For this type of part, specify the datum axis, critical diameters, hole or slot positions, runout if applicable, and the report format required for approval.',
  relatedCapabilities:['cnc-turning-service','cnc-milling-service'],
 },
 {
  slug:'two-stage-cnc-milling',title:'Two milling setups for one part',process:'Sequential milling',hero:'two-stage-first',photos:['two-stage-first','two-stage-second'],
  lead:'Two milling setups provide access to different faces of the same part.',
  workpiece:'This component requires two milling operations. Features reached in the second setup must retain their relationship to the surfaces established in the first.',
  setup:'The part is held in different orientations for the two operations. Choosing locating faces and keeping clamping areas accessible are key considerations when planning a comparable route.',
  visible:'The two setups expose different machined faces and features. Use the drawing to identify which dimensions link those faces and need checking after repositioning.',
  inspection:'For a similar multi-setup part, identify common datums and the dimensional relationships that must be retained between setups. Agree on inspection points and acceptance records before production.',
  relatedCapabilities:['cnc-milling-service','5-axis-cnc-machining'],
 },
 {
  slug:'milling-a-pocketed-enclosure-form',title:'Milling a pocketed enclosure-style component',process:'CNC milling',hero:'milling-enclosure-operation',photos:['milling-enclosure-operation','milling-enclosure-parts'],
  lead:'Milling a recessed component with a circular pocket and mounting features.',
  workpiece:'A block-like body combines a circular recess with mounting features. Pocket depth, wall thickness and interfaces define the geometry to review for a similar component.',
  setup:'The component is held beneath a CNC spindle. Pocket depth, internal corner radii and clamping surfaces determine tool access; these need review against the actual model.',
  visible:'The machined components combine recessed areas, flat faces and mounting details.',
  inspection:'For a similar enclosure, identify datum faces, mounting-hole positions, pocket depths and any sealing or mating surfaces. Agree how the critical dimensions will be measured and recorded.',
  relatedCapabilities:['cnc-milling-service','aluminum-cnc-parts'],
 },
 {
  slug:'milling-prismatic-components',title:'CNC milling for prismatic multi-feature parts',process:'CNC milling',hero:'multi-feature-milling-operation',photos:['multi-feature-milling-operation','multi-feature-milling-parts'],
  lead:'CNC milling of block-shaped components with multiple machined faces and openings.',
  workpiece:'Flat faces, holes and pockets share a prismatic body. A similar drawing needs to define which faces locate the part and how the remaining features relate to them.',
  setup:'A milling setup holds the part below the spindle while accessible faces are machined. If the design requires multiple orientations, compare the setup sequence and datum strategy against the geometry before quotation.',
  visible:'Several components share a similar block-shaped form, with machined faces and openings.',
  inspection:'Mark critical bores, hole patterns, mounting faces and positional relationships on the drawing. Confirm the inspection method, sampling plan and report format required for the project.',
  relatedCapabilities:['cnc-milling-service','low-volume-production'],
 },
 {
  slug:'29-inch-display-housing-cnc-machining',title:'CNC machining a 29-inch display housing',process:'CNC milling',hero:'display-housing-machining',photos:['display-housing-panel','display-housing-machining'],video:'display-housing',
  lead:'A broad display housing with recessed faces, edge details and mounting features.',
  workpiece:'This housing is identified in the workshop records as a 29-inch display enclosure. Broad rectangular panels carry slots and mounting features. The display size does not specify the enclosure dimensions; those must come from the drawing.',
  setup:'The panel is supported across the machine table beneath the spindle. The machining photographs show the broad internal face and access from above. For a comparable enclosure, review support points, clamping areas, tool reach and the order of operations before choosing the setup.',
  visible:'The panels have internal recesses, machined face patterns and narrow edge features. The paired view compares their two faces, while the workshop video provides a closer look at the overall form.',
  inspection:'For your enclosure, identify mounting datums, hole and slot positions, required flatness and mating-edge relationships. Specify cosmetic faces, finish and acceptance dimensions after treatment. Agree the measurement method and inspection records for the features that control assembly.',
  relatedCapabilities:['cnc-milling-service','aluminum-cnc-parts'],
 },

];
engineeringCases.push(
 {slug:'custom-plastic-parts-ptfe-pom-pe-acrylic',title:'Custom plastic parts: PTFE, POM, PE and acrylic',process:'Plastic part examples',hero:'plastic-acrylic-detail',photos:[],collection:'plastic',lead:'Guide strips, gears, transparent components and PTFE forms for custom plastic-part enquiries.',workpiece:'',setup:'',visible:'',inspection:'',relatedCapabilities:['plastic-machined-parts']},
 {slug:'custom-metal-parts-batch-examples',title:'Custom metal parts in batches: shafts, fittings and housings',process:'Metal part examples',hero:'metal-aluminum-housings',photos:[],collection:'metal',lead:'Turned shafts, fittings and recessed housings: a selection of custom metal components in batches.',workpiece:'',setup:'',visible:'',inspection:'',relatedCapabilities:['cnc-turning-service','aluminum-cnc-parts','copper-brass-cnc-parts','low-volume-production']},
);
export const caseForCapability=(slug:string)=>engineeringCases.filter(item=>item.relatedCapabilities.includes(slug));
