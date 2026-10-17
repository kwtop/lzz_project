import {partUseContexts} from './productBrowse';
const realCrop=(id:string,width:number,height:number,alt:string)=>({src:'/media/products-real-details-20261015/'+id+'.webp',srcset:undefined,width,height,nativeWidth:width,alt,origin:'original-photo-crop',caption:'Real crop from the original workshop photograph.'});
export const realProductDetails:Record<string,ReturnType<typeof realCrop>>={P33:realCrop('p33',390,370,'One open aluminum housing, cropped from the original batch photograph with its cavity, rim and mounting ears visible')};
export const realStudyDetails:Record<string,ReturnType<typeof realCrop>>={
 'five-axis-operation':realCrop('five-axis-operation',688,576,'Closer view of the spindle, component and rotary fixture in the original workshop photograph'),
 'turn-mill-operation':realCrop('turn-mill-operation',736,516,'Closer view of cylindrical components held beneath the milling spindle'),
 'two-stage-first':realCrop('two-stage-first',752,540,'The component and fixture in the first original milling setup'),
 'two-stage-second':realCrop('two-stage-second',752,540,'The component and fixture in the second original milling setup'),
 'milling-enclosure-operation':realCrop('milling-enclosure-operation',736,564,'The recessed component held in a vise under the milling spindle'),
 'multi-feature-milling-operation':realCrop('multi-feature-milling-operation',816,576,'Prismatic components held in vises under the milling spindle'),
};
export const partTask=(id:string)=>{
 if(['P01','P05','P06','P07','P08','P09','P10','P21'].includes(id))return 'forms';
 if(['P18','P22','P23','P24','P25'].includes(id))return 'casting';
 if(['P12','P14','P15','P16','P17','P19','P31'].includes(id))return 'assembly';
 if(['P26','P27','P28','P30','P33','P34'].includes(id))return 'batch';
 return 'part';
};
export const orderProduction='7–14 business days after drawing and order confirmation, including finishing. Shipping time is additional; the quotation confirms the schedule. Sample reconstruction and drawing approval are separate.';
export const taskHeadings:Record<string,string>={part:'Features to define',forms:'Choose the form, then define the interfaces',casting:'Define the blank and the finished part',assembly:'Define the components you need',batch:'Define the part and each release'};
export const companyApplicationDescriptions:Record<string,string>={
 'custom-oem-high-precision-cnc-milling-manufacturer':'Instrument blocks, brackets and housings with mounting interfaces, bores and internal passages.',
 'global-oem-precision-machining-solutions':'Custom valve bodies, fittings and mechanical interfaces for hydraulic tools and equipment assemblies.',
 'small-batch-cnc-machining-manufacturer-complex-aluminum-housings':'Enclosures, mounting structures and precision housings, with attention to fit and visible surfaces.',
 'custom-high-precision-machining-for-structural-aesthetic-components-oem':'Lightweight structures, mounting features and machined interfaces for compact assemblies.',
};
export const productApplicationContexts=(slug:string)=>(partUseContexts[slug]||[]).map(c=>({...c,description:companyApplicationDescriptions[slug]}));
export const taskScope=(task:string,kind:string)=>{
 if(task==='assembly')return 'Identify the machined components, purchased or customer-supplied items, joining and fasteners in the assembly drawing. Agree acceptance after assembly. Pressure, leakage, actuation, flow and cooling tests each need a procedure, limits and a responsible party.';
 if(task==='casting')return 'Distinguish the blank model and finished model, machining allowance and datum targets. Agree the blank supplier, incoming acceptance, permitted variation, retained cast surfaces and responsibility for rejected blanks. An incomplete definition requires a separate drawing-approval stage.';
 if(task==='batch')return 'List each part number, approved revision, material condition, finish, release quantity and requested date. Identify shared interfaces and change authority. Agree first-article checks, later sampling, traceability and nonconforming-part handling. Forecast demand is separate from the order.';
 if(kind==='pin')return 'The photograph shows the external pin, threaded body and adjustment hardware. It does not establish the internal spring, travel or force. Define engagement, mounting thread, spring and handle scope; agree actuation-force and cycle testing separately.';
 if(task==='forms')return 'This source contains several part forms. Identify the component you want quoted and supply its controlled drawing; the pictured assortment does not define a supplied set.';
 return '';
};

// Unique requirements previously repeated in drawing/inspection paragraphs.
// The main feature rows keep geometry; this one row keeps only their additions.
export const partSupplement:Record<string,{drawing:string;check:string}>={
 P00:{drawing:'Include the 3D model, dimensioned drawing and mating-bore or fastener requirements.',check:'Define circular-face flatness or orientation from the drawing datums.'},
 P01:{drawing:'Include thread specifications and mark inaccessible edges. Agree reconstruction from an existing component before manufacture.',check:'Set separate cleanliness and leak-test criteria. Specify first-article, in-process, final or pre-shipment checks as needed.'},
 P02:{drawing:'State material condition and feature-specific tolerances on the controlling model and drawing.',check:'Specify the profile records required. Balance and rotating-assembly tests need separate procedures and limits.'},
 P03:{drawing:'Keep mating geometry and critical interfaces on the same drawing for turning and milling review.',check:'The quotation confirms measurement methods and acceptance limits against one datum scheme.'},
 P04:{drawing:'Include angled-port standards, mating hardware and assembly clearances for tool access and repeated clamping.',check:'State face-orientation limits and separate sealing-test criteria.'},
 P05:{drawing:'Reference the complete turned profile to the functional axis.',check:'Include thread-gauge requirements where relevant.'},
 P06:{drawing:'Show hidden intersections in the model and identify assembly locating features.',check:'Specify thread engagement as well as the feature orientation and burr limits.'},
 P07:{drawing:'Specify the alloy, intended fluid and operating temperature where relevant.',check:'Pressure or leak testing needs a defined procedure and acceptance limit.'},
 P08:{drawing:'Provide the finish specification and color or texture reference, and identify untreated surfaces.',check:'Keep cosmetic acceptance distinct from dimensional limits.'},
 P09:{drawing:'Distinguish structural and mating features from decorative surfaces and weight-reduction profiles.',check:'Use approved finish and engraving references for appearance acceptance.'},
 P10:{drawing:'Dimension seal lands and identify internal features that are difficult to reach with a gauge.',check:'Include any statistical process control or batch-consistency checks in the agreed inspection plan.'},
 P11:{drawing:'Define the datum axis and sealing interfaces, with ports located from those references.',check:'Specify any CMM comparison to the 3D model, reports and traceability. Flow and leak tests need separate criteria.'},
 P12:{drawing:'Define port orientation relative to the core and distinguish CNC machining from TIG joining.',check:'For pressure or leak testing, supply test pressure, medium, procedure and acceptance criteria.'},
 P13:{drawing:'Show wall sections, mounting datums and hood, camshaft and sensor clearances.',check:'Include mounting-pattern checks; assess outer-contour appearance separately from mating-face dimensions.'},
 P14:{drawing:'Supply the full STEP or IGES model and mating-port drawing, including runner transitions, port spacing and flange positions relative to the engine and piping.',check:'Specify prototype-fitment checks; define pressure and flow tests separately.'},
 P15:{drawing:'Include the motor envelope, bearing and actuator fits, and shaft-bore locations relative to the airflow bore and assembly datums.',check:'Agree shaft-alignment and mating-feature checks. Machining a housing does not establish electronic control performance.'},
 P16:{drawing:'Provide STEP or IGES and injector/rail interface drawings; relate mounting features to the intake ports.',check:'Agree injector-alignment and position checks. Sealing and functional tests require separate criteria.'},
 P17:{drawing:'Include mating-throttle details, fastener access and any split-line seal.',check:'Specify flange and passage checks. Pressure ratings and sealing tests require defined conditions and limits.'},
 P18:{drawing:'Define the transfer from casting datums to finished-part datums, with the blank alloy and condition.',check:'State required inspection stages and any CMM verification from the finished-part datums.'},
 P19:{drawing:'For any hidden working diameters, threads, sliding or off-axis features, give fits, thread standards, angular references and surface condition.',check:'Include runout and thread gauging where required. Assembly, leakage and actuation checks need their own conditions and limits.'},
 P20:{drawing:'Locate slots and holes from assembly datums; show any pockets or barriers and required properties.',check:'Specify edge checks and any separate electrical or material-test criteria.'},
 P21:{drawing:'Define interference fits and loads on the assembled part.',check:'State surface, cleanliness and material-handling requirements for the selected grade.'},
 P22:{drawing:'Include casting condition, machining allowance and wall sections.',check:'Define bore alignment, mating-face and as-cast acceptance, including any required CMM records.'},
 P23:{drawing:'Identify features to retain or change, casting condition and treatment. Bore-to-face or spline dimensions apply only where defined in the approved model.',check:'Specify required bore-alignment or spline checks and first-article, in-process, final or pre-shipment inspections.'},
 P24:{drawing:'Distinguish stock allowance from finished wall thickness so the irregular blank can be located.',check:'Set limits for exposed casting defects on functional surfaces and identify the CMM or gauge records required.'},
 P25:{drawing:'Identify whether a complete model or sample is available, with the blank source and alloy condition.',check:'Agree incoming material verification, dimensional acceptance and any CMM checks.'},
 P26:{drawing:'Dimension any required walls and pockets, mating interfaces and permitted radius or thickness changes in the model.',check:'Include stability criteria for the selected polymer, alongside surface and dimensional acceptance.'},
 P27:{drawing:'Include mating-part, thread and fastening specifications.',check:'Specify thread gauges, burr and surface limits. Conductivity and pressure tests have function-specific criteria.'},
 P28:{drawing:'Identify the machining processes for each part number and any components that must fit together.',check:'Include batch-control and reporting requirements in the quotation request.'},
 P29:{drawing:'State the mounting arrangement and complete component thickness.',check:'Specify flatness or parallelism only where required, in the agreed conditioning, temperature and support state.'},
 P30:{drawing:'Include the finish specification and locate any required angled features from the mating datums.',check:'State flatness and hole-position limits, sampling and reporting requirements.'},
 P31:{drawing:'Show hidden threads or seals on the part and assembly drawings.',check:'Include runout and thread gauging where required. Actuation, leakage, force and cycle tests need separate procedures and limits.'},
 P32:{drawing:'Include the mating hole and assembly definition, with spring requirements where applicable.',check:'Specify thread gauging and surface finish as well as fit and alignment.'},
 P33:{drawing:'Mark seal faces, thin sections, alloy and temper on the drawing.',check:'Specify flatness and mounting-pattern limits alongside the batch acceptance plan.'},
 P34:{drawing:'State functional requirements and identify any components that must fit together.',check:'Define the first-article report contents and the features to check during production.'},
};
