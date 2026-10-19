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
  slug:'five-axis-machining-multi-face-parts',title:'Five-axis machining for multiple faces',process:'Multi-axis machining',hero:'five-axis-operation',photos:['five-axis-operation','five-axis-parts'],
  lead:'Machining holes, side openings and contoured faces on a component held in a rotary setup.',
  workpiece:'Front-face holes and a curved side opening place machining features on different faces of this component. Define their relationship to a common datum.',
  setup:'The workpiece is held in front of a rotary assembly, with spindle access from above. Tool reach and clearance around the fixture need to be checked for each face before the machining sequence is confirmed.',
  visible:'The separate component photographs show machined pockets, contoured edges and repeated hole patterns.',
  inspection:'Identify common datums and mating features. Specify positional tolerances, surface requirements and the dimensional records you need. LZZ reviews achievable limits and the inspection method against the drawing.',
  relatedCapabilities:['5-axis-cnc-machining','cnc-milling-service'],
 },
 {
  slug:'turning-then-milling-cylindrical-parts',title:'Turning followed by milling',process:'Turning + milling',hero:'turn-mill-operation',photos:['turn-mill-operation','turn-mill-parts'],
  lead:'A turned component returns to the machine for features that require milling.',
  workpiece:'Circular bodies combine central bores with additional milled features. The drawing needs to locate those features relative to the turned axis.',
  setup:'A turned part is located for a subsequent milling operation. Review the milled features relative to the turned datum before selecting the holding method and machining sequence.',
  visible:'The circular parts combine internal bores with machined details around their outer form.',
  inspection:'Specify the datum axis and critical diameters. Define hole or slot positions and any runout requirement, then agree the report format for approval.',
  relatedCapabilities:['cnc-turning-service','cnc-milling-service'],
 },
 {
  slug:'two-stage-cnc-milling',title:'Two milling setups for one part',process:'Sequential milling',hero:'two-stage-first',photos:['two-stage-first','two-stage-second'],
  lead:'Two milling operations give access to different faces of a component. Locating surfaces connect the dimensions made before and after repositioning.',
  workpiece:'When a new drawing requires another setup, the features reached afterward must retain their relationship to the surfaces established first.',
  setup:'Where repositioning is required, choose locating faces that retain the required relationships and leave access for clamping.',
  visible:'The original photographs record milling of the same component. The drawing must establish the actual holding orientations and the dimensions to check after repositioning.',
  inspection:'Identify common datums and the dimensional relationships that must be retained between setups. Agree inspection points and acceptance records before production.',
  relatedCapabilities:['cnc-milling-service','5-axis-cnc-machining'],
 },
 {
  slug:'milling-a-pocketed-enclosure-form',title:'Milling a pocketed enclosure component',process:'CNC milling',hero:'milling-enclosure-operation',photos:['milling-enclosure-operation','milling-enclosure-parts'],
  lead:'Milling a recessed component with a circular pocket and mounting features.',
  workpiece:'A block-like body combines a circular recess with mounting features. Specify pocket depth, wall thickness and mating interfaces on your drawing.',
  setup:'The component is held beneath a CNC spindle. Pocket depth, internal corner radii and clamping surfaces determine tool access; these need review against the actual model.',
  visible:'The machined components combine recessed areas, flat faces and mounting details.',
  inspection:'Identify datum faces and mounting-hole positions. Specify pocket depths and any sealing or mating surfaces. Agree how critical dimensions will be measured and recorded.',
  relatedCapabilities:['cnc-milling-service','aluminum-cnc-parts'],
 },
 {
  slug:'milling-prismatic-components',title:'CNC milling for prismatic multi-feature parts',process:'CNC milling',hero:'multi-feature-milling-operation',photos:['multi-feature-milling-operation','multi-feature-milling-parts'],
  lead:'CNC milling of block-shaped components with multiple machined faces and openings.',
  workpiece:'For this block-shaped part, identify the locating faces first, then dimension the other features from them.',
  setup:'The part is held below the spindle to machine the accessible faces. For multiple orientations, we plan the locating datums and setup sequence from the model before quoting.',
  visible:'Several components share a similar block-shaped form, with machined faces and openings.',
  inspection:'Mark critical bores and hole patterns on the drawing, along with mounting faces and the positional relationships between features. Agree the inspection method and sampling plan, then confirm the report format.',
  relatedCapabilities:['cnc-milling-service','low-volume-production'],
 },
 {
  slug:'29-inch-display-housing-cnc-machining',title:'CNC machining a 29-inch display housing',process:'CNC milling',hero:'display-housing-machining',photos:['display-housing-panel','display-housing-machining'],video:'display-housing',
  lead:'A broad display housing with recessed faces, edge details and mounting features.',
  workpiece:'The workshop records identify this as a housing for a 29-inch display. The broad panels have slots and mounting features. The display size is separate from the enclosure dimensions, which must be specified on the drawing.',
  setup:'The panel rests across the machine table beneath the spindle, with access to the internal face from above. For a similar enclosure, we check support points and clamping areas before planning tool reach and the order of operations.',
  visible:'The panels have internal recesses, machined face patterns and narrow edge features. The paired view compares their two faces, while the workshop video provides a closer look at the overall form.',
  inspection:'Locate holes and slots from the mounting datums. Define panel flatness and mating-edge relationships on the drawing. Mark cosmetic faces and dimensions that apply after finishing, then specify the measurement records needed for assembly.',
  relatedCapabilities:['cnc-milling-service','aluminum-cnc-parts'],
 },

];
engineeringCases.push(
 {slug:'custom-plastic-parts-ptfe-pom-pe-acrylic',title:'Plastic part forms: PTFE, POM, PE and acrylic',process:'Plastic part examples',hero:'plastic-acrylic-detail',photos:[],collection:'plastic',lead:'Workshop examples of plastic guide strips and gears, with acrylic components and PTFE parts.',workpiece:'',setup:'',visible:'',inspection:'',relatedCapabilities:['plastic-machined-parts']},
 {slug:'custom-metal-parts-batch-examples',title:'Metal part forms: shafts, fittings and housings',process:'Metal part examples',hero:'metal-aluminum-housings',photos:[],collection:'metal',lead:'Workshop photographs of turned shafts and fittings, with aluminum housings and a separate cleaning clip.',workpiece:'',setup:'',visible:'',inspection:'',relatedCapabilities:['cnc-turning-service','aluminum-cnc-parts','copper-brass-cnc-parts','low-volume-production']},
);
export const caseForCapability=(slug:string)=>engineeringCases.filter(item=>item.relatedCapabilities.includes(slug));
