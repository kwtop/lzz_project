import type {Guide} from './contentGuides';
import {guideTable} from './procurementGuides';

const p=(...text:string[])=>text.map(value=>'<p>'+value+'</p>').join('');
const a=(label:string,href:string)=>'<a href="'+href+'">'+label+'</a>';
const h=(title:string,...text:string[])=>'<h3>'+title+'</h3>'+p(...text);
const q=(id:string,title:string,...text:string[])=>'<div class="guide-question" id="'+id+'"><h3>'+title+'</h3>'+p(...text)+'</div>';
const facts=(rows:string[][])=>'<dl class="ce-facts">'+rows.map(([label,text])=>'<div><dt>'+label+'</dt><dd>'+text+'</dd></div>').join('')+'</dl>';
const guides='/resources/technical-guides/';
const studies='/machined-parts/machining-examples/';

export const drawingFeaturesDescription='Define critical CNC drawing features through datums, fits, tolerances, surface roughness and inspection, with two-setup, turned-part and enclosure examples.';

export const drawingFeaturesGuide:Guide={
 title:'Drawing requirements & critical features',
 intro:'A useful CNC drawing connects the part’s function to requirements that can be measured. Start with the locating and mating features, then define the size, relationships and surface conditions they need. Keep the inspection plan tied to the same drawing revision.',
 visual:'drawing',
 closing:'Review the drawing and acceptance requirements',
 sections:[
  {
   id:'function-first',aliases:['part-requirements','working-surfaces','working-surfaces-heading','section-1'],title:'Start with how the part fits and works',
   html:p(
    'Identify locating faces, mating bores, shaft seats, mounting holes, sealing interfaces, sliding surfaces and load-bearing faces that matter to the assembly. A locating bore may need a controlled fit and relationship to a mounting face. An outer clearance surface may need a much less demanding limit. Explain the function when it helps distinguish them.',
    'Give each critical feature a measurable requirement and an inspection reference. The responsible design engineer selects the datum scheme, tolerances and applicable drawing standard.'
   )+h('Use one drawing language consistently',
    a('ASME Y14.5','https://www.asme.org/codes-standards/find-codes-standards/y14-5-dimensioning-tolerancing')+' defines the language for stating and interpreting geometric dimensioning and tolerancing on drawings and digital models. Identify the applicable standard and revision, then use its rules consistently across the controlled drawing and model.',
    'Identify the drawing system and revision used by the design. Resolve mixed conventions, ambiguous symbols and conflicting defaults before quotation or release.'
   ),
  },
  {
   id:'feature-checklist',title:'Make the requirement measurable',
   html:p(
    'Use this checklist to connect each functional feature to a drawing requirement and an acceptance check. Set the limits from assembly needs.'
   )+guideTable('Critical feature drawing checklist',['Feature or requirement','Specify','Acceptance'],[
    ['Locating faces and axes','The datums and feature relationships needed by the assembly.','How the part will be located for measurement.'],
    ['Mating bores and shafts','Required sizes and limits, with applicable fit requirements.','Which dimensions need recorded measurements.'],
    ['Hole patterns and slots','Locations and orientation relative to the selected references.','The method and records for the specified relationships.'],
    ['Sealing and cosmetic faces','Surface requirements and clearly identified faces.','The checks and any agreed appearance reference.'],
    ['Threads and edges','Thread designation and requirements for burrs or edge breaks.','The agreed checks for these features.'],
    ['Treated surfaces','Coated or masked areas and whether limits apply before or after treatment.','The inspection stage and treatment records required.'],
   ])+h('Give “critical” a practical meaning',
    'State any recorded result, special check or release hold against the feature reference. Balloon numbers link the drawing to the inspection report; specify the measurement method and inspection frequency separately.',
    'Separate the feature’s acceptance limit from the inspection frequency. A sampled report and a requirement to check every part are different scopes, even when the same dimension appears on both documents.'
   ),
  },
  {
   id:'datums-and-setups',title:'Datums connect the assembly to different setups',
   html:p(
    'A datum scheme gives the specified relationships a common reference. Think about how the part is located in service, then review how the drawing communicates those references for manufacture and inspection. The holding arrangement may use process references, but the finished acceptance must still follow the drawing.',
    'The '+a('two-stage milling study',studies+'two-stage-cnc-milling/')+' pairs the original two-operation record with illustrations of top-face and side-face access. For a new part that needs repositioning, the key question is how features made in those orientations must remain related.'
   )+h('Follow a feature across the setup change',
    'If a mounting face is machined in one orientation and a locating bore in another, define their required relationship on the drawing. The supplier uses that relationship to plan locating, support and inspection across both operations.',
    'Where a thin component moves when released, also identify the acceptance condition. A part clamped against a fixture and the same part free on a measuring surface can present different questions. Agree any restrained inspection condition through the drawing and order review.'
   ),
   photos:[
    {id:'two-stage-first',caption:'First holding orientation · original LZZ two-stage milling record'},
    {id:'two-stage-second',caption:'Second holding orientation · original LZZ record of the same source part'},
   ],
  },
  {
   id:'size-form-and-position',title:'Control size, form and position separately',
   html:p(
    'A bore diameter, the form of its surface and the location of its axis describe different requirements. A component can meet a size limit while another relationship still needs control. Select the controls needed by the assembly under the applicable drawing standard.',
    'For a locating hole pattern, ask what must align with the mating component and which surfaces establish that alignment. For a sealing face, ask whether size, form, texture or their combination governs contact. Avoid relying on a single general tolerance to communicate every function.'
   )+h('Fits need both sides of the interface',
    'A shaft and bore work as a pair. Identify the required clearance, transition or interference through the chosen limits and fit system, taking account of material, temperature and finished treatment. Do not select a familiar fit designation without reviewing the actual assembly.',
    'For a mating part supplied separately, include its controlled interface drawing or specification. Use the same fit requirements when reviewing both components.'
   )+h('General tolerances still have a role',
    'Use the drawing’s general tolerance for features where it is appropriate, and define local exceptions where function requires them. If an unmarked dimension is governed by a general note, that note should be clear and applicable to the document. Ask about ambiguous or conflicting limits before release.'
   ),
  },
  {
   id:'surface-roughness',title:'How should roughness, tolerance and inspection work together?',
   html:p(
    'Dimensional limits and surface texture answer different questions. A shaft can have the correct diameter but an unsuitable working texture. A polished-looking face can still need form or position control. Identify the functional surface before selecting its requirements.',
    'For roughness, state the parameter, units and limit on the intended face. Ra averages the absolute profile-height deviations from the mean line. Rz describes profile height using the definition in the specified standard; older and newer conventions can differ. They should not be substituted using one universal conversion. The applicable measurement and evaluation conditions belong with the requirement.'
   )+h('Make the measurement reproducible',
    a('Mitutoyo’s surface-roughness quick guide','https://www2.mitutoyo.co.jp/eng/products/menu/QuickGuide_Surftest.pdf')+' explains profile parameters and measurement conditions. Relevant details can include the measurement direction, filtering and evaluation length. Check them against the standard and revision specified for the part rather than copying a setting from an unrelated surface.',
    'A small sealing land or interrupted surface restricts the available measurement path. Identify the working area and review instrument access, measurement direction and interpretation before production.'
   )+h('Specify texture where it earns its place',
    'A working seal, sliding face and cosmetic outer panel may need different controls. Adding the same low roughness limit everywhere can change machining and inspection without clarifying the function. Keep the required functional limits, and define appearance separately where colour, gloss or permitted marks matter.',
    'If treatment follows machining, say whether the texture requirement applies to the machined substrate or the final surface. The '+a('material and finish guide',guides+'material-and-finish-checklist/#texture-and-appearance')+' follows that distinction through surface preparation and finishing.'
   ),
  },
  {
   id:'threads-and-edges',title:'Threads, intersecting holes and edges need local detail',
   html:p(
    'A thread callout should identify the intended thread system and size, with the class and other requirements needed by the design. Distinguish usable thread depth from a drilled-hole depth. Where an insert is involved, identify its requirements and the condition to be accepted.',
    'For a blind or intersecting hole, explain any functional constraint on the end or intersection. A passage that carries fluid or a hole that receives a fastener may need different checks. Mark burr-sensitive intersections so their acceptance is not inferred from an outside view.'
   )+h('Use edge notes that preserve the working geometry',
    'Specify a radius or chamfer where edge size matters, and identify edges that must remain sharp. Include restrictions around sealing lands, locating shoulders and internal intersections.',
    'For internal corners in a pocket, show the permitted radius or relief and review the mating part. A sharp model corner can leave an unresolved tool-access question. The '+a('machining process guide',guides+'cnc-process-selection/#tool-access-and-support')+' explains why the depth, radius and support need to be considered together.'
   ),
  },
  {
   id:'study-context',aliases:['section-2','section-2-heading'],title:'Read critical features in existing part forms',
   html:p(
    'The component examples below connect machined features to drawing requirements. Review each critical tolerance with the material, setup, finishing and measurement method.'
   )+h('A turned part with secondary milling',
    'In the '+a('turning-then-milling study',studies+'turning-then-milling-cylindrical-parts/')+', the cylindrical form receives a secondary milling operation. For a new part with a side feature, define its location and orientation relative to the required turned references. A side hole can have the right diameter while still needing its relationship to the axis controlled.',
    'Identify the working diameter, locating shoulder and any orientation feature that matters in assembly. The drawing can then distinguish the requirement from the supplier’s choice of holding sequence.'
   )+h('A pocketed housing',
    'The '+a('pocketed enclosure study',studies+'milling-a-pocketed-enclosure-form/')+' suggests another set of questions: which face locates the housing, which holes mount it, and which recesses provide only clearance? Define the cover or sealing interface separately from the outer appearance.',
    'Show the final fit and positional relationship of the bore and mounting pattern after finishing. Include the acceptance limits in the controlled drawing.'
   ),
   photos:[{id:'multi-feature-milling-parts',caption:'Multi-feature machined parts · original LZZ photograph. Geometry reference; acceptance follows the drawing.'}],
   links:[['CNC milling capabilities','/capabilities/cnc-milling-service/'],['Turning capabilities','/capabilities/cnc-turning-service/']],
  },
  {
   id:'inspection-planning',title:'Choose checks that answer the drawing requirement',
   html:p(
    'An inspection method needs to evaluate the feature being controlled. A diameter reading, a relationship to datums and a surface-texture result are different tasks. Identify the required evidence and discuss access, range and method with the supplier.',
    'For checks using a coordinate measuring machine, agree the feature references, method, measurement uncertainty and report scope for the part. Use separate methods for characteristics that require them.'
   )+guideTable('Drawing requirements and inspection questions',['Requirement','Question for the inspection plan','Record to agree'],[
    ['Size or fit','How will the specified limits and final condition be checked?','Feature reference, result or agreed functional-gauge outcome, and inspection stage.'],
    ['Form, orientation or location','How is the part located and evaluated against the specified references?','Relevant datum references, method and reported characteristic.'],
    ['Surface texture','Can the specified area be measured using the applicable settings?','Parameter, units, result and relevant measurement conditions.'],
    ['Appearance or treatment','What reference or test defines acceptance on the identified surfaces?','Agreed appearance approval or process-specific verification.'],
   ])+h('Agree sampling and report detail separately',
    'State whether the order needs a first-article report, sampled batch report or checks on every part. Identify the characteristics, inspection frequency and report format for repeat production.',
    'Where calibration evidence, traceability or a particular test is required, include it in the RFQ. Agree the method and available documentation before production. The '+a('quality and order-records page','/factory/#quality')+' provides the place to discuss those requirements.'
   ),
  },
  {
   id:'finished-state',title:'Define the state in which the part is accepted',
   html:p(
    'A requirement needs an inspection stage as well as a limit. State whether dimensions and texture apply before or after treatment. Mark coated or masked areas and identify any operation that changes a working face after finishing.',
    'For thin or flexible parts, review whether the measurement is made free or in an agreed restraint. For plastics or a temperature-sensitive fit, the material and environmental condition may also matter. Keep those conditions with the requirement so results from different stages are not compared as if they were identical.'
   )+h('Carry the finished condition into sample approval',
    'A sample should be evaluated in the configuration that its approval actually covers. If a first sample is uncoated, record that limit rather than implying approval of the treated fit or appearance. The '+a('sample approval checklist','/resources/ordering/machined-prototype-approval-checklist/')+' connects the configuration, checks, open items and release decision.'
   ),
  },
  {
   id:'release-files',aliases:['section-3','section-3-heading','section-4','section-4-heading','section-5','material-and-project-scope','material-and-project-scope-heading'],title:'Check the files and requirements before release',
   html:facts([
    ['Material and final surface','Specify grade and condition, finish and required records. Mark masked surfaces and whether dimensions apply before or after treatment.'],
    ['Project requirements','Include applicable standards and revisions, traceability, end use and export requirements.'],
   ])+p(
    'Use consistent part numbers, units and revisions across the model and drawing. State which document controls if they differ, and resolve conflicts before production. Where model-based requirements are used, identify the controlled dataset and the information that carries authority.',
    'Mark changed features and revisions, then review their effect on the quotation, sample approval and repeat-production process. A revised bore can change the fit, machining sequence and inspection requirement.',
    'Send the required inspection format with the inquiry. Agree measurement methods, available records and dimensional, appearance and functional acceptance before machining.'
   )+h('Resolve ambiguity while a change is still a drawing decision',
    'Resolve conflicting notes and dimensions, then update the controlled drawing package. Keep accepted deviations and their approval records linked to the released revision.'
   ),
   links:[['Prepare the RFQ package','/resources/ordering/rfq-checklist/'],['Material and finish requirements',guides+'material-and-finish-checklist/'],['Inspection and available records','/factory/#quality']],
  },
  {
   id:'drawing-questions',title:'More questions about CNC drawings and critical features',
   html:q('drawing-question-model','Is a STEP file enough to quote and inspect a CNC part?',
    'A model helps communicate geometry, but the complete requirement must also define the material, tolerances, finish and acceptance information that the model does not carry. Send the controlled drawing and identify which file governs any conflict. If the project uses model-based definition, identify its controlled requirements explicitly.'
   )+q('drawing-question-critical','How do I identify a critical dimension?',
    'Identify how a nonconforming feature affects assembly or function, then specify its limits, datum relationships and surface condition. State any special inspection or release control against that feature.'
   )+q('drawing-question-tight','Should I put the same tight tolerance on every dimension?',
    'Use limits justified by function and the applicable drawing rules. A clearance feature and a locating interface may need different controls. Review the resulting machining and inspection scope without relaxing a necessary requirement simply to lower the price.'
   )+q('drawing-question-datum','Can the supplier choose the assembly datums?',
    'The responsible design engineer defines the datum scheme from the assembly function. The supplier reviews machining and inspection access against it. Record and approve any change before releasing the drawing.'
   )+q('drawing-question-roughness','Does a tight diameter tolerance also control surface roughness?',
    'No. Define the needed texture on the working surface using the applicable parameter and measurement conditions. Diameter, form and texture can each affect the interface, and a result for one does not automatically establish the others.'
   )+q('drawing-question-ra-rz','Can Ra and Rz be converted with one multiplier?',
    'Do not use a universal multiplier for acceptance. They describe different profile characteristics, and their relationship depends on the surface. Keep the specified parameter, units, standard and relevant measurement conditions with the drawing requirement.'
   )+q('drawing-question-cmm','Does every critical feature need a CMM report?',
    'No. Choose a method that can evaluate the specified characteristic and provide the required evidence. A CMM may suit some relationships; a size check, functional gauge or texture measurement answers a different question. Agree the method and report scope for the actual part.'
   )+q('drawing-question-after-finish','Should the inspection happen before or after surface treatment?',
    'Define the stage for each requirement. Process checks before treatment can be useful, while a finished fit needs acceptance in the specified final condition. Where both stages are required, identify them separately in the drawing and inspection plan.'
   )+q('drawing-question-sample','Does one approved sample release every later batch?',
    'It approves only the recorded configuration and scope. Repeat production still needs the released revision, material, finish and batch inspection requirements. Review changes and unresolved conditions before carrying an earlier approval forward.'
   )+q('drawing-question-conflict','What happens when the model and PDF disagree?',
    'Identify the governing document, resolve the conflicting requirement and release a traceable approved revision before production.'
   ),
  },
 ],
};
