import type {Guide} from './contentGuides';
import {guideTable} from './procurementGuides';

const p=(...text:string[])=>text.map(value=>'<p>'+value+'</p>').join('');
const a=(label:string,href:string)=>'<a href="'+href+'">'+label+'</a>';
const h=(title:string,...text:string[])=>'<h3>'+title+'</h3>'+p(...text);
const q=(id:string,title:string,...text:string[])=>'<div class="guide-question" id="'+id+'"><h3>'+title+'</h3>'+p(...text)+'</div>';
const facts=(rows:string[][])=>'<dl class="ce-facts">'+rows.map(([label,text])=>'<div><dt>'+label+'</dt><dd>'+text+'</dd></div>').join('')+'</dl>';
const guides='/resources/technical-guides/';
const studies='/machined-parts/machining-examples/';

export const materialFinishDescription='Specify material and surface treatment for CNC parts, including anodizing allowances, masked bores and threads, appearance, final fits and inspection records.';

export const materialFinishGuide:Guide={
 title:'Material and finish requirements',
 intro:'Choose the material and surface treatment around the finished part. A bore, sealing face or electrical contact may need a different treatment from the outside surface. Define those interfaces early so machining, finishing and inspection work to the same requirement.',
 visual:'materials',
 closing:'Discuss the material and finished interfaces',
 sections:[
  {
   id:'material-specification',aliases:['alloy-designation-title','section-1','section-2'],title:'Choose the material specification',
   html:p(
    'Material selection starts with the job the part performs. Loads, temperature, chemical exposure and the mating component help narrow the choice. Electrical contact, thermal transfer and cleanliness can be just as important as mechanical strength.',
    'Use the material families below to review the exact grade, condition, product standard and availability for your part. Include the required material records and approval requirements for proposed substitutions.'
   )+guideTable('Material specification questions',['Material family','Material examples','Order specification'],[
    ['Aluminum','6061, 7075, 2024','Alloy and temper; strength, stiffness, weight, environment and finish.'],
    ['Stainless steel','304, 316, 17-4PH','Service environment, strength, condition and heat treatment.'],
    ['Copper and brass','Exact designation required','Electrical, thermal or mechanical function and applicable material standard.'],
    ['Engineering plastics','POM, PEEK, PPSU','Temperature, load, chemical exposure, electrical needs and mating material.'],
    ['Other named materials','Titanium, Inconel, Kovar, Invar','Exact designation and intended use for review.'],
   ])+p(
    'C3600, H62 and C36000 are separate alloy designations. Specify the exact grade and standard for the order.',
    'For aluminum, the '+a('6061 and 7075 selection guide',guides+'6061-vs-7075-cnc-aluminum/')+' separates strength, stiffness, temper and finish. For other families, use the '+a('stainless-steel','/capabilities/stainless-steel-cnc-parts/')+', '+a('copper and brass','/capabilities/copper-brass-cnc-parts/')+' and '+a('engineering-plastics','/capabilities/plastic-machined-parts/')+' pages to discuss the intended function and exact requirement.'
   ),
   links:[['Aluminum machining','/capabilities/aluminum-cnc-parts/']],
  },
  {
   id:'finish-and-acceptance',title:'What should the surface treatment achieve?',
   html:p(
    'Set each finish requirement by function: appearance, wear, corrosion protection or another specified duty. Define color, coating thickness and sealing-face acceptance separately.',
    'Deburring, polishing, blasting, anodizing, passivation or plating depend on material and order requirements. Confirm the specification before production and inspect at the agreed stage. State any sequence requirements where one treatment follows another.'
   )+facts([
    ['Process and specification','State treatment, applicable standard and revision, coating thickness and measurement method. For anodizing, specify alloy and color; for passivation or plating, identify the process specification.'],
    ['Appearance','Identify cosmetic faces, color, gloss, texture and agreed visual acceptance references, including blast or polish references where needed.'],
   ])+h('Define the surface where the requirement applies',
    'A part can contain a visible outer face, a hidden mounting face and a precision bore. Giving all three the same blanket note may create work or ambiguity without helping the assembly. Mark the surfaces that need the treatment and the exceptions that matter.',
    'If a general finish applies to the whole part, make the local exceptions easy to identify. The drawing should let machining, finishing and inspection find the same face without relying on an informal email description.'
   ),
  },
  {
   id:'interfaces-and-dimensions',title:'How does finishing change dimensions and fits?',
   html:p(
    'Acceptance should describe the condition that enters the assembly. A part that meets a dimension before treatment may not meet it afterwards. State whether the limits apply before or after treatment, then agree how the machining allowance and final check will be handled.',
    'For anodizing, oxide forms partly within the original surface and partly beyond it. The '+a('Aluminum Anodizers Council FAQ','https://members.anodizing.org/page/anodized-aluminum-faq')+' explains that the dimensional effect depends on alloy and process. Its nominal relationships differ between Type II and hardcoat conditions, and surface preparation can also affect size.'
   )+guideTable('Surface treatment and finished interfaces',['Feature','What can change','What the drawing should resolve'],[
    ['Outside diameter or raised face','Outward build can increase the finished size.','Final size limits, treatment and the agreed machining allowance.'],
    ['Bore or internal slot','Build on opposing surfaces can reduce the opening.','Finished opening, coating or masking and the inspection stage.'],
    ['Thread','Treatment can affect functional engagement and gauging.','Thread designation, treated or masked condition and final checks.'],
    ['Sealing or sliding face','Texture, local build and treatment edges can affect contact.','Functional area, surface requirements and permitted treatment boundaries.'],
    ['Electrical contact','A treated surface may behave differently from bare material.','Contact area, required conductivity and compatible protection.'],
   ])+h('A simple allowance example',
    'Suppose a reviewed finishing process predicts 10 micrometres of outward growth on each exposed surface. An outside diameter would increase by about 20 micrometres, while a bore coated on both sides would lose about 20 micrometres of opening. This is an illustration using an assumed growth value, not a coating specification or a machining instruction.',
    'Total coating thickness and outward growth are different values. Agree the process-specific machining allowance, expected variation and final acceptance limits before cutting a precision fit.'
   )+h('Small internal features need their own review',
    'Coating coverage inside deep or narrow openings needs a separate review. '+a('NASA/JSC’s anodizing process specification','https://www.nasa.gov/wp-content/uploads/2023/03/prc-5006-current.pdf')+' discusses this issue for hard anodizing and the relationship between machining and final dimensions. Identify the applicable process specification on the order.',
    'For a critical bore, identify where it is measured and whether uniform coverage is required. Resolve masking, post-treatment machining or another approved route before production. Each option changes which material is exposed and what needs inspection.'
   ),
  },
  {
   id:'masking-and-threads',title:'Which bores, threads and contacts should be masked?',
   html:p(
    'Masking is a design choice for a particular surface. It may preserve a fit or contact area, but it also changes where the specified treatment is present. The decision needs the fit, environment and protection requirements together.',
    'Mark the actual boundaries. “Mask critical areas” leaves the finishing supplier to decide which faces are critical, how far the mask extends and what is acceptable at its edge. A section view or a clearly identified surface can resolve a small internal feature more effectively than a general note.'
   )+h('Threads need a finished acceptance condition',
    'Specify the thread designation, class, depth and functional requirements. State whether the thread is treated, masked or completed after treatment, and set the final gauging condition.',
    'Chasing or cutting a thread after treatment can expose base material. Where that affects corrosion protection or cleanliness, the drawing and process review need to resolve it. A repair or rework should not become an undocumented shop decision.'
   )+h('Electrical contacts are local working surfaces',
    'Identify current-carrying or grounding faces and their contact-area requirements. State the mating material, permitted protective treatment and assembled condition used for acceptance.',
    'Keep permitted rack or contact-mark locations separate from the electrically functional area. Where marks would affect appearance or fit, agree an acceptable location and inspection reference.'
   ),
  },
  {
   id:'texture-and-appearance',title:'Surface roughness and appearance need different checks',
   html:p(
    'Specify functional roughness using the required parameter and measurement conditions. Define color, gloss and permitted scratches separately for the visible faces.',
    'For roughness, name the parameter, units, limit and applicable standard. Include the measurement area and conditions where they affect acceptance. The '+a('drawing guide’s roughness section',guides+'critical-features-cnc-drawing/#surface-roughness')+' explains why Ra, Rz and the measurement method need to stay connected.'
   )+h('Surface preparation remains part of the result',
    'Surface preparation affects the texture after anodizing, as described in NASA/JSC\'s process specification. Where a visible face requires blasting or polishing, define the preparation sequence and appearance acceptance before anodizing.',
    'Identify the material, preparation and treatment represented by the appearance sample. Agree viewing conditions for color, gloss and permitted marks, and retain the approved sample with the order records for repeat batches.'
   ),
  },
  {
   id:'finish-by-material',title:'The material changes what a finish means',
   html:h('Stainless steel: passivation is not decorative plating',
    'Passivation treats the stainless surface and removes contamination such as free iron. '+a('Carpenter Technology’s passivation guidance','https://www.carpentertechnology.com/blog/passivating-stainless-steel-part')+' explains the grade-specific process and testing requirements. Specify any required corrosion verification separately from surface appearance.',
    'Specify the stainless grade, condition, treatment standard and required verification. State the sequence where heat treatment or another operation precedes passivation.'
   )+h('Copper and brass: define the working contact',
    'For electrical or thermal components, identify the contact faces and protected surfaces. Specify the substrate and plating separately, with distinct acceptance requirements for conduction and appearance.'
   )+h('Plastics: include the condition in which size matters',
    'Polymer grade, temperature and moisture condition can influence the measured part. '+a('Ensinger’s dimensional-stability guidance','https://www.ensingerplastics.com/en-us/plastic-material-selection/dimensionally-stable')+' distinguishes thermal expansion and moisture uptake, which vary between materials.',
    'For a plastic component fitting into a metal assembly, state the service environment and inspection condition. A dimension checked just after machining may not describe every later condition. Review the exact polymer and any conditioning requirement instead of assigning the same behaviour to all engineering plastics.'
   ),
  },
  {
   id:'part-construction',aliases:['construction-title','coated-parts','coated-title','coating-requirements','requirements-title'],title:'Solid material, coating or covering?',
   html:p(
    'A solid plastic part uses the specified polymer throughout. A coated metal part has a separate surface treatment; a covered wheel or roller has a separate covering as part of the component. Those constructions need different material and dimensional definitions.',
    'The Teflon surface-coating collection shows coated round components and long pieces with repeated holes. These use a coated substrate; parts machined from solid PTFE have a different construction.'
   )+h('Read the visible features as interface questions',
    'On a round coated part, distinguish the outside working surface from the bore and mounting faces. For a long component with repeated holes, specify whether coating enters the holes and identify the mating contact areas. Keep those requirements in the controlled drawing and finishing specification.',
    'Specify the substrate, coating and surfaces to treat or mask. State whether critical dimensions apply before or after coating, with thickness, adhesion and service requirements. For a separate covering component, include its material and retention method.'
   ),
   photos:[
    {id:'finish-coated-round',caption:'Round coated components · original photograph from the source collection labeled Teflon surface coating'},
    {id:'finish-coated-bars',caption:'Coated long components · original photograph from the source collection labeled Teflon surface coating'},
   ],
  },
  {
   id:'enclosure-finish-example',title:'A pocketed enclosure: which surfaces control assembly?',
   html:p(
    'The '+a('pocketed enclosure study',studies+'milling-a-pocketed-enclosure-form/')+' shows recessed parts and an associated machining setup. For a new design of this form, follow the assembly surfaces through the planned finish.',
    'A mounting face may locate the housing. A bore may locate another component. A cover interface may need both flatness and a defined texture. The outside surface may mainly need an acceptable appearance. Giving those faces distinct requirements makes the finished condition easier to review.'
   )+h('Follow one interface through the process',
    'For a locating bore, first define the finished fit and datum relationship. Next decide whether it is treated or masked. Then agree which machining allowance, final measurement and records support that choice. If an operation after finishing is proposed, review the exposed material and protection before accepting the route.',
    'Use the machining study to review geometry and setup access. The '+a('process-selection guide',guides+'cnc-process-selection/')+' explains how the required faces determine the machining sequence; specify the finish and acceptance criteria for your part.'
   ),
   photos:[{id:'milling-enclosure-parts',caption:'Recessed component forms · original LZZ source photograph; use the drawing to define treated and working faces'}],
  },
  {
   id:'edges-and-protection',title:'Edges, cleanliness and packing affect the delivered surface',
   html:p(
    'A general deburring note can leave important details unresolved. Identify edges that need a defined break, edges that must retain their shape and internal intersections where loose burrs would affect function. Where the drawing requires a radius or chamfer, name it explicitly.',
    'Surface acceptance should also address handling. A sliding face or cosmetic panel can meet the requirement after finishing and still be damaged before delivery. Define separation, protection of threads and seals, and any cleanliness requirement with the packing scope.'
   )+h('Keep rework and touch-up visible',
    'Agree the disposition of damaged surfaces or out-of-limit fits against the drawing and order. Record any permitted polishing, stripping, re-coating or touch-up work, including its effect on the finished requirements.',
    'The '+a('packing and shipping guide','/resources/ordering/custom-cnc-parts-shipping-checklist/')+' covers protection and delivery responsibilities. Use it alongside the finish definition when the surface is part of acceptance.'
   ),
  },
  {
   id:'material-records',aliases:['section-4'],title:'Which records belong with material and finish?',
   html:p(
    'Include material traceability and treatment records in the quotation, along with dimensional inspection and any other tests. State the test limits and sampling requirements. The documents should identify the part, drawing revision and batch.',
    'Match certificate scope to the customer or industry requirements. Agree the available report format and traceability chain before production.'
   )+guideTable('Material and finish acceptance records',['Record or check','What it should relate to'],[
    ['Material record','Specified grade, condition, applicable product requirements and agreed traceability.'],
    ['Treatment record','Process specification and revision, part or batch reference and required results.'],
    ['Dimensional inspection','Critical interfaces checked at the agreed stage, with drawing revision and results.'],
    ['Appearance approval','Representative reference, identified faces and agreed viewing and acceptance conditions.'],
    ['Release decision','Actual approval, unresolved items and any accepted deviations or rework.'],
   ])+p('Request separate records for material, treatment and dimensional acceptance. Identify the finished bores and coating requirements that each report must cover.'),
   links:[['Quality and order records','/factory/#quality'],['Sample approval','/resources/ordering/machined-prototype-approval-checklist/'],['Metal part examples',studies+'custom-metal-parts-batch-examples/']],
  },
  {
   id:'finish-questions',title:'More questions about material and surface treatment',
   html:q('finish-question-fits','Should dimensions apply before or after anodizing?',
    'The drawing should state the required stage. Working fits usually need a defined final condition so the delivered parts assemble as intended. Where a pre-treatment dimension is also needed for process control, distinguish it from the finished acceptance limit.'
   )+q('finish-question-growth','Can I subtract coating thickness to find the machining size?',
    'Not without reviewing the process. Total coating thickness and outward growth are different quantities for anodizing. Opposing surfaces, preparation and local coverage also matter. Agree the allowance and variation for the actual feature and treatment.'
   )+q('finish-question-threads','Should all threaded holes be masked?',
    'Not automatically. Decide from the finished thread requirement, protection and service environment. Identify the treated or masked condition and the final gauging method. If machining after treatment is proposed, review the exposed material as part of the route.'
   )+q('finish-question-colour','Is a colour reference enough to specify anodizing?',
    'No. Include the applicable process, material, preparation, treatment requirements and the surfaces being judged. Define colour and gloss against an agreed reference. Dimensional, functional and coating checks remain separate from appearance.'
   )+q('finish-question-toolmarks','Will anodizing remove milling marks?',
    'It should not be specified as a way to erase them. Establish the required preparation and finished texture before treatment. If a face must be blasted or polished, define where that applies and how the final appearance will be accepted.'
   )+q('finish-question-passivation','Is stainless-steel passivation the same as plating?',
    'No. They serve different surface functions and need different specifications. For stainless passivation, identify the grade, condition, process and required verification. If a plated finish is required, specify its coating requirements separately.'
   )+q('finish-question-ptfe','Does a Teflon coating photograph show a solid PTFE part?',
    'No. A coated substrate and a component machined from solid PTFE have different constructions. Specify the substrate, coating and interfaces for coated parts; specify the PTFE grade for solid machined parts.'
   )+q('finish-question-roughness','Does Ra define the whole surface finish?',
    'No. Ra is a roughness parameter measured under specified conditions. Define form, waviness, color, gloss, coating thickness and permitted defects separately where they affect a working or visible face.'
   )+q('finish-question-documents','Does a coating certificate prove the final fit?',
    'Only if its agreed scope actually includes the relevant dimensional evidence. Treatment compliance and finished size are different checks. Define which interfaces need measurements after treatment and which records should accompany the order.'
   )+q('finish-question-open-choice','What if the material or finish is not yet decided?',
    'Send the part function, model and drawing with the known loads, exposure and interfaces. Identify the open choice and any options you would like reviewed. Keep proposed alternatives separate until the material, treatment and acceptance conditions are approved.'
   ),
  },
 ],
};
