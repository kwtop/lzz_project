import type {Guide} from './contentGuides';
import {guideTable} from './procurementGuides';
import {teachingMountExample as example,featureRange,featureSample} from './teachingMountExample';

const p=(...text:string[])=>text.map(value=>'<p>'+value+'</p>').join('');
const a=(label:string,href:string)=>'<a href="'+href+'">'+label+'</a>';
const h=(title:string,...text:string[])=>'<h3>'+title+'</h3>'+p(...text);
const q=(id:string,title:string,...text:string[])=>'<div class="guide-question" id="'+id+'"><h3>'+title+'</h3>'+p(...text)+'</div>';
const facts=(rows:string[][])=>'<dl class="ce-facts">'+rows.map(([label,text])=>'<div><dt>'+label+'</dt><dd>'+text+'</dd></div>').join('')+'</dl>';
const guides='/resources/technical-guides/';
const studies='/machined-parts/machining-examples/';
const thickness=example.features[2];

export const drawingFeaturesDescription='Prepare CNC drawings around working interfaces, datums, tolerances and inspection. Follow a teaching mounting plate from annotated drawing to example results.';

export const drawingFeaturesGuide:Guide={
 title:'Drawing requirements & critical features',
 intro:"Faces and holes that locate, mate, seal or carry load need measurable requirements, references and a specified inspection condition. The worked plate follows three drawing callouts through example readings, including a failed dimension that prevents release.",
 visual:'drawing',
 closing:'Discuss your drawing requirements',
 sections:[
  {
   id:'function-first',aliases:['part-requirements','working-surfaces','working-surfaces-heading','section-1'],title:'Connect the drawing to the working interfaces',
   html:p(
    'A locating bore and an outer clearance face do different jobs. Their limits should reflect that difference. Mounting faces, shaft seats, sealing lands and sliding surfaces often need both a size requirement and a relationship to the features around them.',
    'The responsible design engineer selects the datum scheme, tolerances and drawing standard. '+a('ASME Y14.5','https://www.asme.org/codes-standards/find-codes-standards/y14-5-dimensioning-tolerancing')+' provides a language for geometric dimensioning and tolerancing on drawings and digital models. Naming the applicable system and revision avoids mixed symbols and conflicting defaults.',
    'In '+a(example.id+' below','#teaching-example')+', the underside A supports the plate and side faces B and C locate it. F1 identifies a bore size, F2 a centre distance and F3 a thickness. These references connect the sketch to its teaching inspection sheet; they do not make it a complete production drawing.'
   ),
  },
  {
   id:'feature-checklist',title:'Turn each working feature into a checkable requirement',
   html:guideTable('Critical feature drawing checklist',['Feature','Drawing requirement','Inspection consequence'],[
    ['Locating faces and axes','The references and relationships needed by the assembly.','The part must be located consistently for the stated check.'],
    ['Bores and shafts','Sizes, limits and any applicable fit requirement.','Recorded dimensions or a specified functional-gauge result.'],
    ['Hole patterns and slots','Location and orientation relative to the selected references.','A method that evaluates the required relationship.'],
    ['Sealing and cosmetic faces','Surface requirements on identified faces.','Texture checks or the specified appearance reference.'],
    ['Threads and edges','Thread designation, usable depth and local burr or edge limits.','Checks that can reach the actual feature.'],
    ['Treated surfaces','Coated or masked areas and the stage at which limits apply.','Pre-treatment and final checks kept distinct.'],
   ])+p(
    'Use a balloon or feature number to link each drawing callout to a report row. '+a('The example uses F1/F2/F3','#teaching-inspection')+'. Inspection frequency is a separate requirement: one example reading, a sampled batch report and a check on every part cover different scopes.'
   ),
  },
  {
   id:'datums-and-setups',title:'Datums across setup changes',
   html:p(
    'Assembly function establishes the drawing references. A fixture may use its own process references, but finished acceptance still follows the drawing. A bore and mounting face made in different orientations need their required relationship carried across both operations.',
    'The '+a('two-stage milling study',studies+'two-stage-cnc-milling/')+' pairs an original operation record with top-face and side-face access illustrations. The setup sequence explains access; it does not itself prove a positional result.',
    'For the teaching plate, A/B/C identify the locating faces. F2 checks the illustrated centre distance only. A real hole pattern may also require position, orientation or form controls that this sketch does not specify. Thin parts may also need an explicit free-state or restrained inspection condition.'
   )+p('On a '+a('circular flange',guides+'datums-and-hole-position-on-circular-machined-parts/')+', the seating face, locating bore and angular reference determine how the hole pattern is evaluated. A '+a('turned shaft or sleeve',guides+'how-to-specify-fits-and-runout-on-turned-parts/')+' uses the same functional reasoning to connect fitted diameters, shoulders and runout to the specified datum axis.'),
   photos:[
    {id:'two-stage-first',caption:'First holding orientation · original LZZ two-stage milling record'},
    {id:'two-stage-second',caption:'Second holding orientation · original LZZ record of the same source part'},
   ],
  },
  {
   id:'size-form-and-position',title:'A size result does not establish form or position',
   html:p(
    'Diameter, surface form and axis location describe different characteristics. F1 can fall inside its size limits while an unexamined relationship still prevents assembly. The drawing standard and function determine which controls are needed.',
    'A bore and shaft also work as a pair. Their clearance, transition or interference depends on both limits, with material, temperature and final treatment taken into account. A controlled mating-interface drawing helps keep separately supplied components consistent.',
    'General tolerances are useful where they suit the function. Local exceptions carry the requirements that need them. Conflicting defaults or an ambiguous general note need resolution before release.'
   ),
  },
  {
   id:'surface-roughness',title:'Give surface texture its own requirement',
   html:p(
    'A correct shaft diameter can still have an unsuitable working texture. A polished-looking face may still fail a form requirement. The surface’s function determines which characteristics belong on the drawing.',
    'A roughness callout needs a parameter, units and limit on the intended face. Ra is the arithmetic mean of absolute profile deviations from the mean line. Rz describes profile height under the specified standard; older and newer conventions can differ. There is no universal conversion multiplier suitable for acceptance.'
   )+h('Include the measurement conditions that change the result',
    a('Mitutoyo’s surface-roughness guide','https://www2.mitutoyo.co.jp/eng/products/menu/QuickGuide_Surftest.pdf')+' covers profile parameters, filtering, sampling/evaluation lengths and measurement conditions under the standard editions it cites. The applicable drawing standard and revision govern the part. Direction and available stylus access also matter on a small land or interrupted face.',
    'Texture limits need a measurement stage when treatment follows machining. The '+a('material and finish guide',guides+'material-and-finish-checklist/#texture-and-appearance')+' follows preparation and treatment. Appearance limits for colour, gloss or permitted marks remain separate. A low roughness limit on every surface can add work without clarifying how a clearance face functions.'
   ),
  },
  {
   id:'threads-and-edges',title:'Add the local detail a model can leave unclear',
   html:p(
    'Thread system, size and class belong with the usable thread depth. Drill depth is a different value. An insert needs its own requirement and acceptance condition.',
    'Blind or intersecting holes may need controls that an external view cannot show. A fluid passage and a fastener hole can have different requirements at the intersection, including burr removal and verification.',
    'An edge note should preserve the working geometry: a specified chamfer or radius where size matters, sharp edges where needed, and restrictions around seals or locating shoulders. Internal pocket corners need an allowed radius or relief that suits the mating part and tool access. The '+a('machining process guide',guides+'cnc-process-selection/#tool-access-and-support')+' connects radius, depth and support.'
   )+p('For a '+a('threaded fitting',guides+'choosing-thread-and-seal-requirements-for-machined-fittings/')+', the connection designation and seal geometry need to appear together. Thread gauging checks the specified thread; any leakage requirement needs its own defined test configuration and acceptance criterion.'),
  },
  {
   id:'study-context',aliases:['section-2','section-2-heading'],title:'Apply the same reasoning to other part forms',
   html:h('A turned part with secondary milling',
    'The '+a('turning-then-milling study',studies+'turning-then-milling-cylindrical-parts/')+' shows a cylindrical form receiving another operation. A side hole needs the correct diameter and, where function requires it, a controlled relationship to the axis, locating shoulder or orientation feature. The drawing communicates that relationship while the supplier plans the holding sequence.'
   )+h('A pocketed housing',
    'In the '+a('pocketed enclosure study',studies+'milling-a-pocketed-enclosure-form/')+', the cover or sealing face, locating bore and mounting pattern need attention separately from clearance recesses and outer appearance. The final fit and positional limits must survive any finishing operation.'
   ),
   photos:[{id:'multi-feature-milling-parts',caption:'Multi-feature machined parts · original LZZ photograph. Geometry reference; acceptance follows the drawing.'}],
   links:[['CNC milling capabilities','/capabilities/cnc-milling-service/'],['Turning capabilities','/capabilities/cnc-turning-service/']],
  },
  {
   id:'inspection-planning',title:'Choose a method that answers the callout',
   html:guideTable('Drawing requirements and inspection questions',['Characteristic','Method question','Useful report information'],[
    ['Size or fit','Can the method check the specified limits in the final condition?','Feature number, result or functional-gauge outcome, and stage.'],
    ['Form, orientation or location','How is the feature evaluated against the stated references?','Datum references, method and reported characteristic.'],
    ['Surface texture','Can the instrument reach the working area with the required settings?','Parameter, units, result and measurement conditions.'],
    ['Appearance or treatment','Which reference or test establishes the requirement?','Appearance approval or process-specific verification.'],
   ])+p(
    'A CMM can suit some feature relationships; a bore-size check or texture measurement answers a different question. Access, range, measurement uncertainty and the required evidence affect the method. First-article, batch sampling and checks on every part should be specified separately, together with any calibration, traceability or test records.',
    'In the '+a('illustrative inspection sheet','#teaching-inspection')+', F3 reads '+featureSample(thickness)+' mm against '+featureRange(thickness)+' mm. That failed thickness check holds release even though F1 and F2 pass their numerical comparisons. The teaching sheet does not demonstrate a complete inspection or an instrument’s suitability. Inspection methods and required records are agreed for the actual order.'
   ),
  },
  {
   id:'finished-state',title:'State when and how the part is measured',
   html:p(
    'A limit needs a measurement stage. Coated or masked areas and operations that alter a working face affect whether acceptance belongs before treatment, after treatment or at both stages. The teaching plate uses the final machined condition with no treatment allowance.',
    'A flexible part measured free can differ from the same part held against a fixture. Plastics and temperature-sensitive fits may also need material and environmental conditions with the requirement.',
    'Sample approval covers the configuration and checks recorded. An uncoated sample cannot establish the finished coating’s fit or appearance. The '+a('sample approval checklist','/resources/ordering/machined-prototype-approval-checklist/')+' keeps that scope and any open items with the release decision.'
   ),
  },
  {
   id:'release-files',aliases:['section-3','section-3-heading','section-4','section-4-heading','section-5','material-and-project-scope','material-and-project-scope-heading'],title:'Release one consistent drawing package',
   html:facts([
    ['Files','Part number, units and revision match across the model and drawing. A named governing document or controlled model-based dataset resolves authority.'],
    ['Material and surface','Grade, condition, finish, masks and the applicable acceptance stage. Required material and treatment records belong here too.'],
    ['Project requirements','Applicable standards and revisions, traceability, end use and export requirements.'],
    ['Inspection scope','Dimensional, appearance and functional checks, with frequency, methods and available report format settled before machining.'],
   ])+p(
    'Identify changed features in each revision, including their effect on price, machining, sample approval and repeat production. Correct conflicting notes in the controlled files and link any accepted deviation to its approval record.'
   ),
   links:[['Prepare the RFQ package','/resources/ordering/rfq-checklist/'],['Material and finish requirements',guides+'material-and-finish-checklist/']],
  },
  {
   id:'drawing-questions',title:"Questions before sending the files",
   html:q('drawing-question-model','Can I start with a STEP file?',
    'Yes, it is useful for discussing geometry. The quotation and inspection still need any material, tolerance, finish and acceptance information missing from the model. A model-based project needs an identifiable controlled requirements dataset.'
   )+q('drawing-question-datum','Can the supplier propose a different datum scheme?',
    'The supplier can raise access or measurement concerns and propose a change. The responsible designer decides whether it suits the assembly, then approves the revised requirement before production.'
   )+q('drawing-question-sample','Does an approved sample release every later batch?',
    'No. Approval covers the sample configuration and checks recorded. Later batches still follow the released revision, material, finish and inspection requirements. A change or an unresolved condition can require further approval.'
   ),
  },
 ],
};
