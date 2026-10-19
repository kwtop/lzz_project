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
 description:'Choose between 6061 and 7075 aluminum for CNC parts by strength, stiffness, temper, corrosion, finishing and cost, with practical part examples.',
};

export const aluminumAlloyGuide:Guide={
 title:aluminumAlloyMetadata.title,
 intro:'6061 is a useful starting point for many machined housings and brackets. Consider 7075 when a strength requirement justifies it, then check the temper, environment and finished interfaces. The better choice follows what the part must do.',
 visual:'materials',
 closing:'Discuss the alloy and finished condition',
 sections:[
  {
   id:'alloy-comparison',title:'When should you choose 6061 or 7075?',
   html:p(
    'Begin with the requirement that is hardest to meet. A housing may need stable mounting faces and an acceptable anodized appearance. A compact loaded bracket may be limited by the stress around a bore. Those are different selection problems, even if both components fit inside the same stock size.',
    'Select the alloy and temper against the actual load case, stock specification and finished-part requirements.'
   )+guideTable('6061 and 7075 selection questions',['Decision','6061','7075'],[
    ['Strength','Often a practical starting point where the specified strength is sufficient.','Worth reviewing when higher strength is needed within a restricted section.'],
    ['Elastic stiffness','Check deflection through geometry as well as material.','Higher strength does not bring a comparable increase in elastic stiffness.'],
    ['Corrosion environment','Good general corrosion resistance; check the exposure and assembly.','Review protection, sustained stress and the specified temper together.'],
    ['Joining','A more usual choice for assemblies requiring conventional welding.','Do not assume a conventional fusion-welding route is suitable.'],
    ['Finished appearance','Often considered for anodized machined parts.','Anodizing is possible, but appearance needs its own acceptance reference.'],
    ['Procurement','Specify grade, temper, product form and required records.','Use the same controls; a grade number alone leaves important decisions open.'],
   ])+p(
    'Kaiser Aluminum publishes separate technical data for '+a('6061 sheet, coil and plate',kaiser+'1015/Kaiser_Aluminum_6061_Sheet_Coil_and_Plate.pdf')+' and '+a('7075 rod and bar',kaiser+'1028/Kaiser_Aluminum_7075_Rod_and_Bar.pdf')+'. Their typical properties and comparative ratings help explain the differences, but are not guaranteed design allowables for every size or product form.'
   ),
  },
  {
   id:'strength-and-stiffness',title:'Is 7075 stronger, stiffer or lighter?',
   html:p(
    'Strength describes resistance to yielding or failure under a stated condition. Stiffness describes how much a component deflects while it remains elastic. Changing alloy can help a strength-limited part without solving a deflection problem.',
    'For context, Kaiser’s rod and bar data list typical elastic moduli of 68.3 GPa for 6061 and 71.0 GPa for 7075. In the same data, typical yield strength for T6/T651 is 276 MPa for 6061 and 503 MPa for 7075. These are published comparison values, not minimum purchase requirements or design allowables for your part. See the '+a('6061 rod and bar data',kaiser+'1025/Kaiser_Aluminum_6061_Rod_and_Bar.pdf')+' alongside the 7075 data linked above.'
   )+h('Apply that distinction to a thin housing',
    'When a broad wall bends as the cover is tightened, review its unsupported span, thickness, ribs and fastener arrangement. Check a proposed geometry change against tool access, internal volume and the mating cover. Higher strength alone leaves the stiffness problem unresolved.',
    'Compare the weight of finished designs that meet the required load and deflection. Material removal must preserve the working sections, joints and assembly interfaces.'
   ),
  },
  {
   id:'temper-and-stock',title:'Why do T6, T651 and product form matter?',
   html:p(
    'An alloy designation identifies a composition family; the temper describes its processing condition. “6061 aluminum” is therefore less complete than a specification naming the alloy, temper, product standard and stock form. A drawing released for one condition should not silently become an order for another.',
    'T6 and T651 are not interchangeable labels. T651 includes a '+a('stretching stress-relief treatment','https://www.bikar.com/fileadmin/Unterlagen_BIKAR/Unterlagen_BIKAR_eng/2024-complete-en.pdf#page=4')+' as part of the specified condition. Its relevance must be checked against the applicable product specification. Plate, extruded bar and other forms can have different dimensional ranges and requirements.'
   )+h('7075-T6 and 7075-T73 answer different questions',
    'Kaiser’s 7075 data distinguish the higher typical strength of T6/T651 from the improved stress-corrosion resistance of T73/T7351. Choosing between them needs the loading, environment and design requirements. T73 is not an automatic improvement on every property, and a supplier should not substitute it without the required approval.',
    'Use the manufacturer’s '+a('7075 sheet, coil and plate data',kaiser+'1017/Kaiser_Aluminum_7075_Sheet_Coil_and_Plate.pdf')+' for that product family, then obtain the applicable requirements and records for the material actually being purchased. Typical brochure values and a batch material certificate serve different purposes.'
   ),
  },
  {
   id:'housing-selection-example',title:'A pocketed enclosure: what should decide the alloy?',
   html:p(
    'The '+a('pocketed enclosure study',studies+'milling-a-pocketed-enclosure-form/')+' shows the walls, recesses and mounting features to consider when selecting an alloy. Base the choice between 6061 and 7075 on the required load, deflection, environment and finished interfaces.',
    'For a new enclosure of this general form, start with the mounting, sealing or cover interfaces. Which faces locate the assembly? Does a wall carry a load, or mainly protect the contents? Is a finished bore a press fit, a sliding fit or clearance for a fastener? Those answers determine which material properties and dimensions need attention.'
   )+h('Separate the choices that the alloy can influence',
    'A strength calculation supports alloy selection for a loaded section. For excessive assembly deflection, review the section geometry and support. Where appearance governs the choice, set the treatment and visual acceptance before ordering material.',
    'The enclosure needs support as its pockets are opened. Review stock condition, workholding and the inspection state alongside the alloy choice.'
   ),
   photos:[
    {id:'milling-enclosure-operation',caption:'Pocketed component in a holding arrangement · original LZZ workshop photograph; alloy not established by the image'},
    {id:'milling-enclosure-parts',caption:'Associated recessed component forms · original LZZ source photograph'},
   ],
  },
  {
   id:'loaded-features-example',title:'A compact bracket or bore needs a load path',
   html:p(
    'A small loaded part can make a stronger alloy attractive when there is little room to increase the section. The useful question is where the load enters, how it crosses the component and where it leaves. A bore, fastener seat or thin ligament may govern the design more than the outside size.',
    'The '+a('multi-feature part examples',studies+'custom-metal-parts-batch-examples/')+' show how faces and holes serve different assembly functions. Identify the bearing or pin interface, surrounding section and locating faces, then select the alloy against the required load and fit.'
   )+h('Joint design and material strength',
    'A threaded connection also depends on the thread size, engagement, mating material and assembly load. A pin connection may be governed by bearing contact or the fit. The responsible designer needs those conditions before deciding whether 6061 is sufficient or 7075 is justified.',
    'Record the outcome as measurable requirements. The '+a('drawing and critical-feature guide',guides+'critical-features-cnc-drawing/')+' connects the selected interfaces to datums, tolerances and inspection.'
   ),
  },
  {
   id:'environment-and-welding',title:'Corrosion exposure and welding can change the choice',
   html:p(
    'Describe outdoor exposure, cleaning fluids, trapped moisture and contact with other metals. Include whether a stressed feature stays wet and which surfaces receive protection.',
    '6061 is commonly selected where corrosion resistance and welding are important. Welding can reduce strength in the heat-affected region of T6 material; the joint needs its own design and qualification. Hydro explains these points in its '+a('Alloy 6061 technical sheet','https://www.hydro.com/Document/Index?id=560718&name=Alloy+6061.pdf')+'.'
   )+h('For 7075, keep the joining route explicit',
    'Review a 7075 part\'s joining process before specifying conventional fusion welding. Bolted assemblies require their own fit, preload and corrosion requirements.',
    'For either alloy, finish and assembly details still matter. Identify protected and unprotected surfaces, contact with dissimilar metals and any electrical continuity requirement. Give the finishing supplier and design engineer the same assembly information.'
   ),
  },
  {
   id:'anodizing-and-interfaces',title:'Can both alloys be anodized?',
   html:p(
    'For anodizing, specify the alloy, surface preparation, process and appearance standard together. Define the final dimensions of working bores and sealing faces separately from color.',
    'Use an appearance sample made with the specified alloy and finishing process. Agree the color acceptance limits for the assembly against that sample.'
   )+h('Keep finished dimensions beside the finish callout',
    'Anodizing converts the surface to oxide and also changes the finished dimensions. The '+a('Aluminum Anodizers Council FAQ','https://members.anodizing.org/page/anodized-aluminum-faq')+' explains that dimensional change depends on the alloy and process, with different nominal growth relationships for Type II and hardcoat anodizing.',
    'Mark bores, threads and contact faces that need masking or a controlled finished size. Agree the allowance for the actual finishing process. The '+a('material and surface-treatment guide',guides+'material-and-finish-checklist/#interfaces-and-dimensions')+' explains its effect on fits.'
   ),
  },
  {
   id:'machining-and-stability',title:'Will a different alloy solve machining distortion?',
   html:p(
    'Thin walls and asymmetric pockets need a machining sequence suited to the stock condition and amount of material removed. Review workholding and the measurement state when setting housing flatness requirements.',
    'The '+a('two-stage milling record',studies+'two-stage-cnc-milling/')+' shows why the holding sequence belongs in that discussion. For a new part, establish which surfaces support the second operation and which dimensions must remain related after the part is released.'
   )+h('Discuss the finished condition before the quote',
    'Where shape or flatness is critical, identify the working faces and whether acceptance applies with the part free or under an agreed restraint. If a treatment follows machining, specify the final inspection stage too. This gives the supplier a defined result to review.',
    'Review stress-relieved stock together with geometry, workholding and the operation sequence. Record any changes in the drawing review and quotation, with the finished tolerance and acceptance method.'
   ),
  },
  {
   id:'alloy-and-cost',title:'How should you compare the total cost?',
   html:p(
    'Compare the same finished requirement, quantity and records. The quote includes more than material per kilogram: stock form, machining allowance, setups, finishing and inspection can all change the work. A small weight reduction may have little value if the finished interfaces still require the same operations.',
    'Where both alloys suit the design, request separate quotations against the same drawing and identify the permitted changes. If one alloy requires a geometry change, compare the complete finished designs.'
   )+h('Keep an alternative separate from the released part',
    'A supplier recommendation can explain a possible tradeoff, but the released specification still needs approval. Record the selected alloy and condition before production and carry them into sample approval and repeat orders. Read the '+a('CNC machining cost guide','/resources/ordering/cnc-machining-cost-factors/')+' for the other work behind the price.'
   ),
  },
  {
   id:'alloy-rfq',title:'What should go into the material decision and RFQ?',
   html:guideTable('Aluminum alloy decision record',['Record','Why it helps the review'],[
    ['Function and loads','Identify the loaded section, required strength, permitted deflection and assembly interfaces.'],
    ['Material definition','Name the alloy, temper, applicable product standard and any required stock condition.'],
    ['Environment and joining','Describe exposure, operating temperature, mating materials and any joining process.'],
    ['Finish and final dimensions','Define the treatment, appearance reference, masking and post-treatment acceptance limits.'],
    ['Files and records','Use the controlled drawing and model revision; list material traceability and inspection records.'],
    ['Quantity and alternatives','State initial and repeat quantities; keep proposed substitutions clearly identified for approval.'],
   ])+p(
    'When selection is still open, send the requirements you know and identify the unresolved decision. We can review the machining and quotation scope against that information. The alloy and any substitution should then be confirmed through the responsible approval process.',
    'Aluminum options include 6061, 7075 and 2024. Specify the exact alloy, temper, stock section and required material certificate for the quotation. See '+a('aluminum machining','/capabilities/aluminum-cnc-parts/')+' for the drawing requirements.'
   ),
  },
  {
   id:'alloy-questions',title:'More questions about 6061 and 7075',
   html:q('alloy-question-brackets','Is 6061 good enough for a CNC-machined bracket?',
    'It can be, when the chosen temper and geometry meet the load, deflection, environment and joint requirements. The word “bracket” does not establish a load case. Identify the mounting faces, fastener seats and loaded section before choosing the material.'
   )+q('alloy-question-upgrade','When is 7075 worth considering?',
    'Consider it when a strength requirement is difficult to meet in the available space, and the design review supports the selected condition. Include corrosion exposure, joining and final finish. If excessive deflection is the problem, review the geometry as well.'
   )+q('alloy-question-tolerance','Does 7075 automatically hold tighter tolerances?',
    'No. A finished tolerance also depends on geometry, stock condition, workholding, machining sequence, treatment and measurement. State the feature and inspection condition. Compare proposed routes against that requirement rather than assigning a tolerance to an alloy name.'
   )+q('alloy-question-thin-wall','Which alloy should I choose for a thin-walled enclosure?',
    'Start with what limits the enclosure: wall movement, strength, sealing, mounting accuracy or appearance. Review the span and support of each wall. The pocketed-enclosure example above helps identify those questions, but does not select an alloy for a new design.'
   )+q('alloy-question-t6-t651','Can T651 replace T6 on the purchase order?',
    'Do not change the condition silently. Check the drawing, product standard, stock form and approval requirements. Even where a proposed product can meet the needed properties, the substitution must be resolved before procurement and production.'
   )+q('alloy-question-colour','Will 6061 and 7075 look identical after black anodizing?',
    'Review representative material from each alloy with the intended preparation and treatment. Define colour acceptance against an approved appearance sample, separately from the dimensional and coating requirements.'
   )+q('alloy-question-outdoors','Is 7075 suitable for an outdoor part?',
    'Outdoor exposure alone is too broad to answer. Review moisture, contaminants, sustained loading, the selected temper and protection of joints and bare surfaces. A material intended for a dry covered assembly may need a different review from a wet, highly stressed connection.'
   )+q('alloy-question-welding','Can a welded 6061 design simply be changed to 7075?',
    'No. The joining route is part of the design. Review the material, welding or other joining method and required joint performance before proposing that change. Do not carry the earlier welding assumptions into a different alloy.'
   )+q('alloy-question-certificate','Does a material certificate approve the part design?',
    'No. The agreed material record identifies the supplied material and its stated results or compliance scope. It does not establish the strength of the finished geometry, suitability of the assembly or dimensional acceptance of the machined component.'
   )+q('alloy-question-price','Can you compare both alloys before I release the drawing?',
    'Send the model, current drawing, quantities and the requirement driving the comparison. Identify which material decision is open and which dimensions or functions must stay fixed. Any quotation alternative and its assumptions should remain separate until the specification is approved.'
   ),
  },
 ],
};
