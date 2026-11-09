import type {Guide} from './contentGuides';
import {guideTable} from './procurementGuides';

const p=(...text:string[])=>text.map(item=>'<p>'+item+'</p>').join('');
const a=(label:string,href:string)=>'<a href="'+href+'">'+label+'</a>';
const h=(title:string,...text:string[])=>'<h3>'+title+'</h3>'+p(...text);
const q=(id:string,title:string,...text:string[])=>'<div class="guide-question" id="'+id+'"><h3>'+title+'</h3>'+p(...text)+'</div>';
const studies='/machined-parts/machining-examples/';

export const cncProcessDescription='Compare turning, milling, 3-axis setups, 3+2 and simultaneous 5-axis machining through LZZ part studies, with tool-access, datum and cost considerations.';

export const cncProcessGuide:Guide={
 title:'Choose the CNC machining route',
 intro:"The working surfaces of a part determine where a cutter needs to reach and how the part can be held. Turning, milling and multi-axis work address different shapes and access problems; one part may need a combination.",
 visual:'process',
 closing:'Review the machining route for your part',
 sections:[
  {
   id:'process-comparison',title:'Choose by geometry',aliases:['section-1'],
   html:p(
    "A shared axis, pocket, mounting face or off-axis hole suggests an operation. Their relationships determine the sequence, with the complete model, drawing and quantity needed to choose a workable route."
   )+guideTable('Machining route selection',['Route','Start with the geometry','Define for review'],[
    ['CNC turning','Shafts, sleeves, discs and fittings.','Datum axis, diameters, shoulders, threads and runout; identify secondary milled features.'],
    ['CNC milling','Pockets, slots, contours and mounting faces.','Datums, pocket depths, hole positions, stock and clamping surfaces.'],
    ['Multi-axis machining','Angled faces and features approached from several directions.','Common datums, angular relationships, tool access and fixture clearance.'],
   ])+p(
    "A part may need more than one process. Indexed positioning and simultaneous multi-axis motion are different operations; the route must suit the drawing. It also needs a practical way to hold the part and inspect the finished features."
   ),
   links:[['CNC turning','/capabilities/cnc-turning-service/'],['CNC milling','/capabilities/cnc-milling-service/'],['5-axis machining','/capabilities/5-axis-cnc-machining/']],
  },
  {
   id:'turning-or-milling',title:'CNC turning or milling: read the whole part',
   html:h('Start with an axis for rotational features',
    "Turning is a useful starting point for diameters, bores, shoulders and other features arranged around an axis. A stepped shaft, sleeve or flange can have several such features even when its final outside outline is not entirely round.",
    "A flat, slot or off-axis mounting feature may need milling after turning. Its angular orientation and position relative to the turned surfaces must be defined so the machining route preserves the relationship needed in assembly."
   )+h('Start with faces for pockets and prismatic forms',
    "A housing or block can need mounting faces, recesses and a pattern of holes. Milling provides access to those features from suitable cutting directions. A circular pocket in a block does not, by itself, make turning the preferred route.",
    "Compare the "+a('prismatic-part study',studies+'milling-prismatic-components/')+" with the "+a('pocketed enclosure study',studies+'milling-a-pocketed-enclosure-form/')+". In each, the surrounding faces and remaining material help explain how the part can be held and which features need a common reference."
   )+p(
    "For a part that needs both processes, check which features can locate later operations and which surfaces remain accessible. Finishing and the acceptance condition also affect the choice between separate setups and a combined machine."
   ),
  },
  {
   id:'three-axis-vs-five-axis',title:'Choosing between three-axis, 3+2 and simultaneous five-axis',
   html:p(
    "The decision starts with the cutting directions required by the model. Features accessible from fixed orientations may suit three-axis work with suitable repositioning. Angled access can make indexed positioning useful. A surface requiring the tool orientation to change during a cut calls for a different review.",
    "In indexed 3+2 work, the rotary axes orient the workpiece for cutting at a selected position. Simultaneous five-axis machining coordinates linear and rotary movement as the cut requires. "+a('Rapid Axis explains this distinction','https://rapidaxis.com/blog/the-differences-between-simultaneous-5-axis-and-32-axis-machining/')+"; it does not mean every feature on a five-axis machine needs simultaneous motion."
   )+guideTable('Compare access strategies for a CNC part',['Approach','When to discuss it','What still needs review'],[
    ['Three-axis with separate setups','Features can be reached from practical fixed holding orientations.','How each setup locates the part and preserves the required relationships.'],
    ['Indexed 3+2 positioning','Different fixed tool directions help reach angled or multi-face features.','Rotary and fixture clearance, tool access and any faces hidden by the holding arrangement.'],
    ['Simultaneous five-axis','The cutting strategy needs coordinated changes in tool orientation.','The complete surface, toolpath, holding, clearance and inspection requirements.'],
   ])+h('More accessible faces can change the route',
    "Grouping features into fewer manual holding operations can be useful when their positions depend on one another. It can also change preparation, tooling and the space available around the part. Compare those effects against a conventional sequence at the quantity you actually need.",
    "Compare the complete route against the required tolerance and quantity. The "+a('CNC cost guide','/resources/ordering/cnc-machining-cost-factors/')+" separates shared preparation from the work repeated on each part."
   )+p('For '+a('an impeller model','/resources/technical-guides/preparing-an-impeller-model-for-5-axis-machining/')+', the blade passages and roots make this distinction concrete. The cutter and holder need a collision-free approach along the required surfaces, with the hub and fixture included in the route review.'),
  },
  {
   id:'two-milling-setups',title:'Two milling setups: keep the features connected',aliases:['geometry-studies','geometry-studies-heading'],
   html:p(
    "The "+a('two-stage milling study',studies+'two-stage-cnc-milling/')+" records two operations on one component. For a new part that needs repositioning, the machining plan must keep newly cut features related to the same drawing datums."
   )+h('Follow the locating surfaces into the second setup',
    "If a side feature is located from an already machined face, the second setup needs suitable locating surfaces and access to the next face. The drawing defines the required relationship and its limits.",
    "There may also be surfaces that can be completed independently. Separating those from the features that share a close relationship helps explain where the process and inspection effort should go."
   )+h('A second setup can be a sensible choice',
    "A straightforward reorientation may suit the part and order quantity. Review the locating method, support and inspection before deciding it needs a different machine strategy. If a later design change moves a hole to another face, revisit the route because the earlier access and holding assumptions may no longer apply."
   ),
   photos:[
    {id:'two-stage-first',caption:'First milling operation · original LZZ source photograph'},
    {id:'two-stage-second',caption:'Second milling operation on the same source part · original LZZ photograph'},
   ],
  },
  {
   id:'turning-then-milling',title:'A turned body with milled features',
   html:p(
    "The "+a('turning followed by milling study',studies+'turning-then-milling-cylindrical-parts/')+" connects a cylindrical form with a secondary milling setup. Its finished definition includes the milled features as well as the turned outline."
   )+h('Define the features from the axis and locating face',
    "A flange may need its mounting pattern positioned relative to a bore. A shaft may need a flat clocked to another feature. In both cases, separate dimensions for the turned and milled features are only part of the specification; their relationship must also be defined.",
    "Include the relevant axis, locating face, orientation and acceptance limits. The responsible design engineer sets that datum scheme. The machining review then considers how to locate the part for the secondary work and how to verify the relationship afterwards."
   )+p(
    "For a comparable quotation, include the turned geometry and secondary features under the same revision, final condition and inspection scope."
   ),
   photos:[
    {id:'turn-mill-operation',caption:'Secondary milling setup for a cylindrical part · original LZZ workshop photograph'},
    {id:'turn-mill-parts',caption:'Associated cylindrical part forms · original LZZ source photograph'},
   ],
  },
  {
   id:'multi-face-access',title:'Multi-face parts: review access around the fixture',
   html:p(
    "The "+a('multi-face machining study',studies+'five-axis-machining-multi-face-parts/')+" shows a workpiece around a rotary setup. Use it to discuss features approached from different directions and the space needed to reach them.",
    "The cutter is only one part of the clearance question. Its holder, the spindle approach, the fixture and the rotating workpiece all have to fit within the proposed operation. A feature can be visible in a model and still be obstructed in a particular holding arrangement."
   )+h('Separate angled features from continuously changing surfaces',
    "A group of holes on fixed angled faces raises an indexed-positioning question. A contoured surface can raise a tool-orientation question during cutting. Both deserve a complete model review, but they do not automatically imply the same operation.",
    "Rotary workholding gives access to features on several faces. The drawing and route review determine whether simultaneous motion is needed, along with the required acceptance checks."
   ),
   photos:[{id:'five-axis-parts',caption:'Multi-face component forms · original LZZ source photograph'}],
  },
  {
   id:'tool-access-and-support',title:'Tool access, deep pockets and thin walls',
   html:h('Check tool reach, corner radii and support in each orientation',
    "A tool must reach the surface with space to cut. Pocket depth, internal corners, nearby walls and holder clearance can restrict that access. Rotating a component can help with an approach direction, while the cutter shape and remaining material still need consideration.",
    "Where access is restricted, a permitted radius or local relief may be worth reviewing with the design engineer. "+a('Sandvik Coromant’s closed-pocket guidance','https://www.sandvik.coromant.com/en-gb/knowledge/milling/milling-holes-cavities-pockets/closed-pockets-or-angles')+" illustrates how pocket angles and tool choice interact. Review the actual depth, radius and tool clearance against the controlled model."
   )+h('Pockets, thin walls and clamping surfaces',
    "In the "+a('pocketed enclosure study',studies+'milling-a-pocketed-enclosure-form/')+", a recess leaves walls and interfaces around it. For a new design, identify pocket depth, corner requirements and the surfaces that locate or seal against another component.",
    "The route needs support for the material left behind as well as access for material removal. Mark whether dimensions apply in a free or specified restrained condition when that distinction matters, and agree the inspection method."
   )+p(
    "Blind holes, threads and internal features also need a defined access direction and depth. Show the geometry clearly and identify what can be changed. A complete section or model view often resolves an ambiguity that a single outside view leaves open."
   )+p('Starting from '+a('a cast housing','/resources/technical-guides/what-to-check-before-machining-a-cast-housing/')+' also brings the blank into the route decision. Stock must remain at the finished features after the first locating arrangement is established. A convenient tool direction cannot compensate for missing stock or a conflicting bore-to-flange relationship.'),
  },
  {
   id:'accuracy',title:'Tolerances, final finish and inspection',aliases:['section-3','section-4'],
   html:p(
    "Feature tolerances and datums belong on the drawing. Achievable limits depend on geometry, material, setup, finish and measurement method, which an axis count alone cannot establish.",
    "Cross-setup dimensions connect operations. On a turned-and-milled part these may relate to the axis; on a multi-face part they may connect faces through common references."
   )+h('Keep the treatment and measurement stage in the same discussion',
    "A coated or masked interface needs its final acceptance state defined. State which surfaces receive treatment and whether the size, fit and surface requirements apply before or after it. The "+a('material and finish guide','/resources/technical-guides/material-and-finish-checklist/')+" covers that specification.",
    "Agree the checks, measurement methods and required records for your quantity. The "+a('critical drawing features guide','/resources/technical-guides/critical-features-cnc-drawing/')+" helps connect each requirement to a measurable feature."
   )+h('Quantity can change the preferred route',
    "A prototype can justify a simple flexible holding arrangement, while a repeat batch may justify different preparation. Include both the immediate quantity and a separately identified repeat expectation. If the route changes between sample and batch, review its effect on the approved features and inspection plan."
   ),
   links:[['Complete RFQ inputs','/resources/ordering/rfq-checklist/']],
  },
  {
   id:'process-references',title:'Turning, milling and multi-axis setups',aliases:['section-2'],
   html:p(
    "Compare cutting directions and workholding in the turning, milling and multi-axis setups below. Use the detailed studies above to relate access and locating surfaces to your drawing.",
    "The complete model and drawing need part and stock dimensions, material and weight. Working space, fixture clearance, support and feature relationships then determine whether the proposed route can meet the acceptance limits."
   ),
   photos:[
    {id:'turning-operation',caption:'Turning · original LZZ workshop photograph'},
    {id:'milling-enclosure-operation',caption:'Milling · original LZZ workshop photograph'},
    {id:'five-axis-operation',caption:'Multi-axis setup · original LZZ workshop photograph'},
   ],
  },
  {
   id:'process-questions',title:"Questions about choosing a CNC process",
   html:
    q('five-axis-all-setups','Can five-axis machining remove every second setup?',
     "No. The holding arrangement still covers or constrains part of the component. Some surfaces may require another holding orientation, and the complete part must be inspected in the agreed final condition."
    )+
    q('sharp-pocket-corners','Can five-axis machining make a perfectly square internal corner?',
     "Changing orientation does not remove the radius left by an ordinary round end mill at that corner. Explain the mating requirement and discuss a permitted relief, a radius change or another separately reviewed process."
    )+
    q('choose-process-first','Do I have to choose the machine before requesting a quote?',
     "You can describe the required part and ask LZZ to review the route. Send the complete model, drawing revision, material, final finish, quantity and critical features. Identify any process explicitly required by your specification."
    )+
    q('combine-turning-milling','How do I compare a combined route with separate turning and milling?',
     "Compare the complete work, including how secondary features are located and checked. Include preparation, final finish, inspection records and quantity. A machine description alone does not show that two quotes cover equivalent scope."
    ),
  },
 ],
};
