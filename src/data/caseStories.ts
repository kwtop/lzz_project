// Public explanations distinguish source photographs from generated geometry.
// No photo or illustration establishes an alloy, tolerance or acceptance result.
type Story = {title:string;summary:string;hero?:string;heroAlt?:string;featureHeading:string;question:string;answer:string;diagram?:{stem:string;alt:string;caption:string};processContext:string};
const base='/media/case-stories-20261014/';
export const caseStories:Record<string,Story>={
 'turning-then-milling-cylindrical-parts':{
  title:'CNC turning followed by milling for cylindrical parts',
  summary:'Turning establishes the round body and bore; subsequent milling adds flats, holes or other features away from the axis. Their positions need references to the turned axis, locating face and angular orientation.',
  hero:base+'turn-mill-form',heroAlt:'Circular flange with a stepped central bore, mounting holes and milled perimeter cutouts',
  featureHeading:'The turned references for milling',question:'Why does a turned part need milling?',
  answer:'Turning produces rotational features such as diameters, bores and shoulders. Features such as flats, slots or off-axis holes may need milling or another secondary operation. The drawing and available tool access determine the route.',
  diagram:{stem:base+'turn-mill-datums',alt:'Flange with a blue bore, dashed center axis and amber locating face',caption:'Blue: bore and axis. Amber: axial face. The drawing supplies the actual datum scheme.'},
  processContext:'The original workshop photograph shows a subsequent milling setup. It gives context for tool access and workholding; the sequence above describes what to review for a new drawing.'
 },
 'five-axis-machining-multi-face-parts':{
  title:'Five-axis CNC machining for multi-face parts',summary:'Features on different faces need both tool access and a shared datum scheme. This study connects the visible rotary setup with the model, clearance and inspection questions to resolve for a similar part.',
  hero:base+'multi-face-form',heroAlt:'Multi-face machined block with top holes and curved side openings',featureHeading:'Features on different faces',question:'When is multi-axis access useful?',answer:'Features on angled or obstructed faces may require additional tool orientations. Review the complete model and fixture clearance before choosing indexed positions, simultaneous motion or separate setups.',
  processContext:'The workshop image shows access around a rotary assembly. It does not establish whether every feature used simultaneous five-axis motion.'
 },
 'two-stage-cnc-milling':{
  title:'Two CNC milling operations: planning the locating surfaces',summary:'Two recorded milling operations on one component, with planning guidance on locating, clamping and checking features when a new part needs repositioning.',
  hero:base+'two-setup-form',heroAlt:'Compact machined block with a top recess and features on a perpendicular face',featureHeading:'Keep the feature relationships through repositioning',question:'Why use a second milling setup?',answer:'Clamps or the machine orientation may block a face in the first setup. Repositioning gives access, but the locating surfaces must preserve the dimensional relationships required by the drawing.',
  diagram:{stem:'/media/cases-reading-20261014/setup-orientations',alt:'Machining block held in two orientations to expose perpendicular faces',caption:'Two holding orientations; the actual fixture follows the drawing.'},
  processContext:'For a similar part, mark the functional datums, critical relationships and any surfaces that must not be clamped. We review locating surfaces and tool access for the proposed machining sequence.'
 },
 'milling-a-pocketed-enclosure-form':{
  title:'CNC milling a pocketed enclosure: walls, bores and datums',summary:'Pocket depth, internal radii and mating interfaces determine how a recessed component can be held, reached by the cutter and measured.',
  hero:base+'pocket-form',heroAlt:'Square component with a stepped circular pocket, central bore and corner mounting holes',featureHeading:'Pocket geometry and mounting interfaces',question:'What makes a pocket more difficult to machine?',answer:'Depth, narrow corners and thin remaining walls can restrict tool access or support. Identify the required geometry and any permitted radius changes so the machining route can be reviewed against the model.',
  processContext:'The original photograph shows the component under the spindle. Use it to understand the machining context; the wall thickness, pocket depth and exact material come from the new drawing.'
 },
 'milling-prismatic-components':{
  title:'CNC milling prismatic parts: faces, bores and pockets',summary:'Mounting faces provide the references for a prismatic part’s hole pattern, bores and pockets. The drawing and inspection plan keep those relationships and the finished condition consistent across the requested quantity.',
  hero:base+'prismatic-form',heroAlt:'Elongated prismatic component with a row of bores and a recessed end pocket',featureHeading:'Bores and pockets located from mounting faces',question:'Where should the drawing datum scheme begin?',answer:'Start with the functional surfaces that locate the component in its assembly. Relate the bores, pockets and hole pattern to those surfaces, including any dimensions that must be checked after finishing.',
  processContext:'The workshop photograph records the part held for milling. The separate batch photograph helps identify the form; sampling and dimensional consistency require order-specific measurement records.'
 },
 '29-inch-display-housing-cnc-machining':{
  title:'CNC machining a 29-inch display housing',summary:'Broad display panels need support for machining and a defined condition for flatness inspection. This study follows the housing faces, mounting features and workshop setup to explain what to specify for a similar enclosure.',
  featureHeading:'Support and access across the panel',question:'What does the 29-inch designation describe?',answer:'It identifies the intended display size in the source materials. The enclosure dimensions, wall sections and machining envelope must be defined separately on the drawing.',
  diagram:{stem:'/media/cases-reading-20261014/panel-support',alt:'Shallow enclosure panel with support pads and clamps on its outer flange',caption:'Panel support and clamping areas.'},
  processContext:'The original workshop image shows the broad panel supported across the machine table. The video and paired face photograph provide additional views of the form.'
 }
};
