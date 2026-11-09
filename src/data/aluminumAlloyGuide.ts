import type {Guide} from './contentGuides';
import {guideTable} from './procurementGuides';

const p=(...text:string[])=>text.map(value=>'<p>'+value+'</p>').join('');
const a=(label:string,href:string)=>'<a href="'+href+'">'+label+'</a>';
const h=(title:string,...text:string[])=>'<h3>'+title+'</h3>'+p(...text);
const q=(id:string,title:string,...text:string[])=>'<div class="guide-question" id="'+id+'"><h3>'+title+'</h3>'+p(...text)+'</div>';
const guides='/resources/technical-guides/';
const studies='/machined-parts/machining-examples/';
const kaiser='https://online.kaiseraluminum.com/depot/PublicProductInformation/Document/';

export const aluminumAlloyMetadata={
 slug:'6061-vs-7075-cnc-aluminum',
 title:'6061 vs 7075 aluminum for CNC parts',
 category:'Material selection',
 description:'Choose 6061 or 7075 for CNC parts by load, stiffness, temper, corrosion and finish. Compare material requirements before preparing the drawing.',
};

export const aluminumAlloyGuide:Guide={
 title:aluminumAlloyMetadata.title,
 intro:"6061 is a starting point when its strength and finish suit the part and its environment. 7075 may help where a loaded section needs more strength within limited space. The alloys have similar elastic stiffness, so excessive wall deflection usually needs a geometry review too.",
 visual:'materials',
 closing:'Discuss the alloy for your part',
 sections:[
  {
   id:'alloy-comparison',title:'Strength, deflection and appearance',
   html:p(
    "A broad housing cover may be limited by deflection or appearance. A compact loaded bracket may be limited by stress around a bore. Both need an alloy, temper and stock form suited to the requirement that governs the design."
   )+guideTable('6061 and 7075 selection questions',['Decision','6061','7075'],[
    ['Strength','A practical starting point when the specified condition meets the load.','A candidate when higher strength is needed within a restricted section.'],
    ['Elastic stiffness','Deflection still depends strongly on the part geometry.','Higher strength brings only a modest change in elastic modulus.'],
    ['Corrosion exposure','Good general corrosion resistance; assembly and exposure still matter.','Protection, sustained stress and temper need attention together.'],
    ['Joining','A common choice for conventional welded assemblies.','Conventional fusion welding needs a separate suitability assessment.'],
    ['Anodized appearance','Often used for anodized machined parts.','Can be anodized; colour needs its own appearance reference.'],
    ['Purchasing','Alloy, temper, product standard, stock form and required records.','The same information is needed; the alloy number alone is incomplete.'],
   ])+p(
    'Kaiser Aluminum publishes separate data for '+a('6061 sheet, coil and plate',kaiser+'1015/Kaiser_Aluminum_6061_Sheet_Coil_and_Plate.pdf')+' and '+a('7075 rod and bar',kaiser+'1028/Kaiser_Aluminum_7075_Rod_and_Bar.pdf')+'. Typical properties explain the comparison; they are not guaranteed design allowables for every product form or size.'
   ),
  },
  {
   id:'strength-and-stiffness',title:'Separate strength from deflection',
   html:p(
    'Strength concerns yielding or failure under a stated load. Stiffness concerns elastic deflection. A stronger alloy can help a strength-limited section while leaving a bending problem largely unchanged.',
    'Kaiser’s '+a('6061 rod and bar data',kaiser+'1025/Kaiser_Aluminum_6061_Rod_and_Bar.pdf')+' list a typical elastic modulus of 68.3 GPa; its 7075 data list 71.0 GPa. The typical T6/T651 yield values are 276 MPa and 503 MPa respectively. These brochure values are comparisons, not minimum purchase requirements or part design allowables.'
   )+h('When a thin housing bends',
    'The unsupported span, wall thickness, ribs and fastener arrangement affect how a cover or wall moves. A geometry change also has to fit the internal space, mating cover and available tool access. Compare the weight of finished designs that meet both load and deflection requirements; removing material cannot sacrifice the working section or joint.'
   ),
  },
  {
   id:'temper-and-stock',title:'Put temper and product form on the specification',
   html:p(
    "“6061 aluminum” identifies the alloy. The temper describes its processing condition; the product standard and stock form complete the purchasing requirement. Plate and extruded bar can have different size ranges and property requirements.",
    'T651 includes '+a('stress relief by stretching','https://www.bikar.com/fileadmin/Unterlagen_BIKAR/Unterlagen_BIKAR_eng/2024-complete-en.pdf#page=4')+'. It is not an interchangeable label for T6: the applicable product specification and approval requirements still govern any substitution.'
   )+h('7075-T6 and 7075-T73',
    'Kaiser’s 7075 data distinguish the higher typical strength of T6/T651 from the improved stress-corrosion resistance of T73/T7351. The choice depends on loading and environment. A temper change can improve one property while reducing another, so it needs design approval.',
    'The '+a("7075 sheet, coil and plate data sheet",kaiser+'1017/Kaiser_Aluminum_7075_Sheet_Coil_and_Plate.pdf')+' covers a different product family from rod and bar. The material actually purchased needs the applicable specification and batch records; a brochure and a material certificate serve different purposes.'
   ),
  },
  {
   id:'housing-selection-example',title:'For a pocketed enclosure, start at the working faces',
   html:p(
    'The '+a('pocketed enclosure study',studies+'milling-a-pocketed-enclosure-form/')+' shows recesses, walls and mounting features. A new enclosure of this form needs a clear distinction between faces that locate or seal, a loaded wall, and a wall that mainly protects the contents.',
    'A press fit, sliding fit and fastener-clearance bore require different limits. The load calculation supports a strength choice; span and support address wall movement. An appearance-led part needs a treatment and visual reference before material is ordered.',
    'Opening the pockets changes how the component can be supported. Stock condition, workholding and the inspection state belong beside the alloy decision.'
   )+p('After choosing the grade and temper, review the '+a('enclosure’s wall support and pocket access',guides+'designing-aluminum-enclosures-for-cnc-machining/')+'. A stronger alloy still leaves the cutter with the same corner and reach constraints. The closure fit and any final surface treatment need to remain connected to the chosen geometry.'),
   photos:[
    {id:'milling-enclosure-operation',caption:'Pocketed component in a holding arrangement · original LZZ workshop photograph; alloy not established by the image'},
    {id:'milling-enclosure-parts',caption:'Associated recessed component forms · original LZZ source photograph'},
   ],
  },
  {
   id:'loaded-features-example',title:'Follow the load through a bracket or bore',
   html:p(
    'A stronger alloy becomes useful when the available section cannot meet the load requirement. The governing section may be a bore, fastener seat or thin ligament. Its outside dimensions alone do not establish the load path.',
    'In the '+a('multi-feature part examples',studies+'custom-metal-parts-batch-examples/')+', faces and holes serve different assembly functions. A threaded joint also depends on thread size, engagement, mating material and assembly load; a pin joint may depend on bearing contact and fit.',
    'Once the load and fit requirements are established, the '+a('drawing guide',guides+'critical-features-cnc-drawing/#teaching-example')+' shows how to connect a feature callout to an inspection result.'
   )+p('A '+a('billet intake manifold',guides+'specifying-a-billet-intake-manifold-for-machining/')+' adds another set of interface questions: flange alignment, internal passage access and the construction of any split joint. Material selection belongs with that component and assembly definition, together with any separately specified operating tests.'),
  },
  {
   id:'environment-and-welding',title:'Exposure and joining can settle the choice',
   html:p(
    'Moisture, cleaning fluids, trapped liquid and contact with dissimilar metals affect the assembly. A wet, continuously stressed connection needs a different assessment from a dry covered part. Protected and bare surfaces, as well as electrical continuity, can change the finishing requirements.',
    '6061 is commonly used where corrosion resistance and welding matter. Welding can reduce T6 strength in the weld region, so the joint still needs its own design and qualification. Hydro’s '+a('Alloy 6061 technical sheet','https://www.hydro.com/Document/Index?id=560718&name=Alloy+6061.pdf')+' explains both the welding and corrosion considerations.',
    'A welded 6061 design cannot simply inherit the same joining assumptions after a change to 7075. Conventional fusion welding requires a separate suitability assessment. Bolted joints instead need their fit, preload and corrosion requirements addressed.'
   ),
  },
  {
   id:'anodizing-and-interfaces',title:'Treat colour and final fit as separate requirements',
   html:p(
    'Both alloys can be anodized. The alloy, preparation and process affect the result, so an appearance sample should use the specified material and intended treatment. A black colour reference does not establish a bore size or coating requirement.',
    'Anodizing converts the surface to oxide and changes finished dimensions. The '+a('Aluminum Anodizers Council FAQ','https://members.anodizing.org/page/anodized-aluminum-faq')+' explains that alloy and process affect growth, and gives different nominal relationships for Type II and hardcoat anodizing. The actual finishing process determines the machining allowance.'
   )+h('Carry the final dimensions through finishing',
    'For an anodized part, the drawing needs to say whether a bore limit applies before or after treatment. Masked bores, threads and contact faces should be identifiable. The '+a('material and surface-treatment guide',guides+'material-and-finish-checklist/#interfaces-and-dimensions')+' follows the effect on fits.'
   ),
  },
  {
   id:'machining-and-stability',title:'Distortion also depends on stock and workholding',
   html:p(
    'Thin walls and asymmetric pockets need a sequence suited to the stock condition and material removal. Stress-relieved stock is one part of that assessment; geometry, support and the order of operations still matter.',
    'The '+a('two-operation milling example',studies+'two-stage-cnc-milling/')+' introduces the locating questions for a part that needs repositioning. Dimensions made in different setups must remain related after release from the fixture.',
    'Flatness or shape acceptance needs a stated condition: free, under a specified restraint, or after an agreed treatment. The quoted route and any approved change should retain that finished tolerance and measurement condition.'
   ),
  },
  {
   id:'alloy-and-cost',title:'Compare complete finished parts',
   html:p(
    'Compare prices for the same finished requirements, quantity and records. Stock form, machining allowance, setups, finishing and inspection can outweigh a small difference in finished weight.',
    'Where both alloys suit the design, separate quotations against the same drawing show the cost difference. If a material change needs new geometry, compare the complete designs. The '+a('CNC machining cost guide','/resources/ordering/cnc-machining-cost-factors/')+' explains the other work behind the price.',
    'A proposed substitute remains an alternative until approved. The released material and condition then carry through sample approval and repeat orders.'
   ),
  },
  {
   id:'alloy-rfq',title:'Bring the open material decision to the inquiry',
   html:guideTable('Aluminum alloy decision record',['Record','Useful information'],[
    ['Function and loads','Loaded section, required strength, permitted deflection and assembly interfaces.'],
    ['Material','Alloy, temper, product standard, stock form and required condition.'],
    ['Environment and joining','Exposure, operating temperature, mating materials and joining process.'],
    ['Finish','Treatment, appearance reference, masking and dimensions after treatment.'],
    ['Files and records','Current drawing/model revision, material traceability and inspection records.'],
    ['Quantity and alternatives','Initial and repeat quantities, with substitutions identified for approval.'],
   ])+p(
    'An inquiry can start before every material choice is settled. The known loads, interfaces and environment give us a basis for discussing machining and quotation scope; the responsible designer approves the final alloy or substitution.',
    'LZZ’s aluminum options include 6061, 7075 and 2024. The '+a('aluminum machining page','/capabilities/aluminum-cnc-parts/')+' covers the material and drawing information for a new part.'
   ),
  },
  {
   id:'alloy-questions',title:"Questions about choosing an alloy",
   html:q('alloy-question-tolerance','Does choosing 7075 buy a tighter tolerance?',
    'No. A tolerance must be specified for the feature; the alloy name alone does not establish it. Geometry, stock condition, workholding, machining sequence, treatment and measurement determine how that requirement can be met.'
   )+q('alloy-question-certificate','What does a material certificate establish?',
    'It identifies the supplied material and the stated results or compliance scope. It does not approve the part geometry, establish assembly strength or replace dimensional acceptance.'
   )+q('alloy-question-price','Can I compare alloys before releasing the drawing?',
    'Yes. A current model and drawing, the quantities under consideration, and the requirement driving the comparison are a useful starting point. Any quotation assumptions remain separate from the production specification until approved.'
   ),
  },
 ],
};
