export interface EngineeringCase {
 slug:string;title:string;lead:string;process:string;hero:string;photos:string[];
 workpiece:string;setup:string;visible:string;inspection:string;relatedCapabilities:string[];
}
// These are process-photo studies, not customer performance claims. Details not
// visible in the source photos remain requirements to confirm from a drawing.
export const engineeringCases:EngineeringCase[]=[
 {
  slug:'five-axis-machining-multi-face-parts',title:'Five-axis machining for multi-face components',process:'Multi-axis machining',hero:'five-axis-operation',photos:['five-axis-operation','five-axis-parts'],
  lead:'Original process photographs show a metal workpiece in a multi-axis setup and a group of machined components from the same source set.',
  workpiece:'The photographs document a metal component with several accessible faces. The source does not establish its alloy, dimensions, tolerance, customer or end use. For a similar part, send the controlled drawing and identify the faces and datums that matter.',
  setup:'The workpiece is held in a machine setup that provides tool access from more than one direction. Fixturing, reach and the order of operations should be reviewed against the actual geometry before a route is quoted.',
  visible:'The second photograph shows multiple machined components with visible pockets, edges and faces. Photographs are useful for understanding form and surface appearance; they cannot verify an acceptance dimension or material grade.',
  inspection:'For a comparable project, identify datums, mating features, positional tolerances, surface requirements and the dimensional record you need. LZZ can assess achievable limits and the inspection method from the drawing.',
  relatedCapabilities:['5-axis-cnc-machining','cnc-milling-service'],
 },
 {
  slug:'turning-then-milling-cylindrical-parts',title:'Turning followed by milling',process:'Turning + milling',hero:'turn-mill-operation',photos:['turn-mill-operation','turn-mill-parts'],
  lead:'This source group documents a milling operation after turning and shows circular components after the sequence.',
  workpiece:'The parts have a rotational form and additional milled features. The photographs do not identify the metal grade, exact size, fit class or application. A similar inquiry needs a drawing showing both rotational and non-rotational features.',
  setup:'A turned part is located for a subsequent milling operation. The relationship between the turned datum and milled features should be reviewed before selecting the holding method and sequence.',
  visible:'The completed group shows circular parts with bores and machined outer features. Their appearance does not establish concentricity, flatness or surface finish values.',
  inspection:'For this type of part, specify the datum axis, critical diameters, hole or slot positions, runout if applicable, and the report format required for approval.',
  relatedCapabilities:['cnc-turning-service','cnc-milling-service'],
 },
 {
  slug:'two-stage-cnc-milling',title:'Two milling setups for one part',process:'Sequential milling',hero:'two-stage-first',photos:['two-stage-first','two-stage-second'],
  lead:'Two original process photographs show the same part family in different milling operations.',
  workpiece:'The source set identifies two milling processes for one product. The images support the process sequence, but do not provide material, drawing revision, tolerance or production quantity.',
  setup:'Each photograph shows a different orientation or holding arrangement. Repositioning can be necessary to expose features that are inaccessible from the first setup; the exact route depends on the drawing.',
  visible:'The images show machined faces and features at the machine. They do not document final inspection, coating or an approved customer outcome.',
  inspection:'For a similar multi-setup part, identify common datums and the dimensional relationships that must be retained between setups. Agree on inspection points and acceptance records before production.',
  relatedCapabilities:['cnc-milling-service','5-axis-cnc-machining'],
 },
 {
  slug:'milling-a-pocketed-enclosure-form',title:'Milling a pocketed enclosure-style component',process:'CNC milling',hero:'milling-enclosure-operation',photos:['milling-enclosure-operation','milling-enclosure-parts'],
  lead:'Original LZZ photographs show a pocketed component in a milling setup and several machined forms from the same source group.',
  workpiece:'The source images show a block-like component with a circular pocket and visible mounting features. They do not identify the alloy, dimensions, drawing revision, customer or intended assembly. Use the controlled drawing to define interfaces and acceptance requirements.',
  setup:'The photographed workpiece is held below a CNC spindle for milling. Tool access, pocket depth, corner radii, wall thickness and clamping surfaces should be assessed against the actual model before confirming the route.',
  visible:'The accompanying source photo shows a group of machined components with similar visible forms. The images do not verify the order quantity, dimensional acceptance, surface finish specification or material grade.',
  inspection:'For a similar enclosure, identify datum faces, mounting-hole positions, pocket depths and any sealing or mating surfaces. Agree how the critical dimensions will be measured and recorded.',
  relatedCapabilities:['cnc-milling-service','aluminum-cnc-parts'],
 },
 {
  slug:'milling-prismatic-components',title:'CNC milling for prismatic multi-feature parts',process:'CNC milling',hero:'multi-feature-milling-operation',photos:['multi-feature-milling-operation','multi-feature-milling-parts'],
  lead:'This original LZZ photo set shows a prismatic component during milling and a group of finished-looking parts from the same source folder.',
  workpiece:'The photos show a block-like metal form with machined faces and visible holes or pockets. The source does not establish alloy, tolerances, production quantity, customer or application. A drawing should define the datums and relationships among the features.',
  setup:'A milling setup holds the part below the spindle while accessible faces are machined. If the design requires multiple orientations, compare the setup sequence and datum strategy against the geometry before quotation.',
  visible:'The second image shows several parts with similar overall forms. Appearance alone does not establish feature position, thread fit, flatness or acceptance status.',
  inspection:'Mark critical bores, hole patterns, mounting faces and positional relationships on the drawing. Confirm the inspection method, sampling plan and report format required for the project.',
  relatedCapabilities:['cnc-milling-service','low-volume-production'],
 },
];
export const caseForCapability=(slug:string)=>engineeringCases.filter(item=>item.relatedCapabilities.includes(slug));
