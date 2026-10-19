import type {Guide} from './contentGuides';
import {guideTable} from './procurementGuides';

const p=(...text:string[])=>text.map(item=>'<p>'+item+'</p>').join('');
const a=(label:string,href:string)=>'<a href="'+href+'">'+label+'</a>';
const h=(title:string,...text:string[])=>'<h3>'+title+'</h3>'+p(...text);
const q=(id:string,title:string,...text:string[])=>'<div class="guide-question" id="'+id+'"><h3>'+title+'</h3>'+p(...text)+'</div>';
const studies='/machined-parts/machining-examples/';

export const cncCostMetadata={
 slug:'cnc-machining-cost-factors',
 title:'What affects CNC machining cost?',
 category:'Buyer guide',
 description:'Understand CNC machining cost through setup, quantity, geometry, material, tolerances and finishing, with LZZ part studies and practical quote questions.',
};

export const cncCostGuide:Guide={
 title:cncCostMetadata.title,
 intro:'A small part can take more work to make than a larger, simpler one. To understand a CNC machining quote, follow the work behind the part: preparing the process, cutting the features, checking them and delivering the agreed finished condition.',
 visual:'drawing',
 closing:'Discuss the cost drivers in your part',
 sections:[
  {
   id:'cost-breakdown',title:'What goes into a CNC machining quote?',
   html:p(
    "The price covers the work needed to make the specified part at the requested quantity. Some preparation is shared by a batch; other work repeats for each component. That distinction helps explain a high prototype price and why a larger order may have a lower unit price.",
    "A useful way to read the quote is to separate preparation, production and delivery. The supplier may combine them into a unit price or list some items separately. Either format can work if the scope is clear."
   )+guideTable('Work behind a CNC machining quotation',['Cost element','What the work involves','What to check'],[
    ['Process preparation','Reviewing the files, planning operations, programming, selecting tools and preparing workholding.','Which charges apply to this order, and what would need review for a repeat?'],
    ['Stock and material','Obtaining the specified grade, condition and stock form, with machining allowance.','Are material records and any approved alternatives included?'],
    ['Machining','Removing material, changing tools, loading parts and completing the required setups.','Which features or access restrictions drive the work?'],
    ['Inspection and finish','Checking specified features, preparing records and completing the surface treatment.','What is checked, at which stage, and against which acceptance limits?'],
    ['Packing and transport','Protecting the parts and arranging the agreed shipment and documents.','What is included in the delivery basis, and which costs remain with the buyer?'],
   ])+p(
    "Check the complete quotation scope, including preparation, finishing and delivery costs alongside machining time. "+a('Penta Precision’s machining cost guide','https://www.pentaprecision.co.uk/resources/how-much-does-cnc-machining-cost')+" also explains the relationship between setup, quantity and price."
   ),
  },
  {
   id:'prototype-and-batch',title:'Why does one CNC prototype cost more per part?',
   html:p(
    "The first component still needs a workable program, suitable tools, a holding arrangement and an inspection plan. A buyer ordering one housing pays for that preparation within a single-piece order. A batch gives the supplier more pieces over which to spread suitable shared work.",
    "The relationship is not a straight-line discount. Increasing quantity can change the fixture, stock purchase, loading method, sampling plan or machining route. Those changes have their own preparation costs and only make sense at a suitable volume."
   )+h('Request prices for the quantities you plan to order',
    "If you are considering 1, 10 and 50 pieces, ask for those quantities against the same released design. They are comparison quantities, not price estimates. Keep material, final finish and inspection scope consistent so the difference tells you something about production volume.",
    "State the prototype quantity and any forecast batch separately. Request a price for each release, with its approval requirements and schedule. The "+a('prototype and repeat-production guide','/resources/ordering/prototype-vs-small-batch-cnc/')+" explains what carries forward after sample approval."
   )+h('A repeat order still needs a scope check',
    "An unchanged drawing can make earlier preparation useful again. Confirm the revision, material condition, fixture availability and required records before assuming a setup charge disappears. A revised bore, a different treatment or a changed acceptance requirement can affect the process even when the overall shape looks the same."
   ),
  },
  {
   id:'geometry-and-setups',title:'How geometry and setups change the work',
   html:p(
    "The outside dimensions are only the beginning. A compact block with a deep recess and features on several faces can demand more preparation than a larger plate with accessible holes. The useful question is which surfaces the cutter must reach and how the component can be held while it gets there."
   )+h('Depth, corners and the material left behind',
    "A pocket needs a cutter that can reach its floor and corners. Restricted access may require a smaller or longer tool, additional passes or a different sequence. Thin remaining walls also need support during machining and a defined condition for inspection.",
    "Review the depth and radius together. If a mating component only needs clearance at a corner, a permitted relief may be worth discussing. Its effect on strength, sealing and assembly still belongs in the design review. "+a('Protolabs’ cost-reduction guidance','https://www.protolabs.com/resources/design-tips/how-to-reduce-cnc-machining-costs/')+" explains the connection between small tools, thin walls and difficult pockets."
   )+h('Repositioning is a machining operation too',
    "A face hidden by the first holding arrangement may need a second setup. The part must be located again, supported and checked against the features already made. Where a bore or hole pattern connects the two orientations, the datum scheme becomes part of that work.",
    "Removing a setup can be useful, but its value depends on the full route. A more elaborate fixture or machine strategy may take longer to prepare. Compare the proposed sequence, especially for a single prototype, before assuming fewer setups must produce a lower total price."
   ),
  },
  {
   id:'cost-in-existing-parts',title:'Two milling setups: what adds work?',
   html:p(
    "The "+a('two-stage milling study',studies+'two-stage-cnc-milling/')+" explains access from the top and side of a component. Repositioning adds locating, clamping and inspection work. Identify the cross-setup dimensions and how the second operation locates from the first.",
    'Ask whether an allowed design change improves access or removes a setup, and identify the cross-setup dimensions that still need inspection. Request a revised quotation against the changed drawing to compare the cost.'
   ),
   photos:[
    {id:'two-stage-first',caption:'First holding orientation · original LZZ two-stage milling record'},
    {id:'two-stage-second',caption:'Second holding orientation of the same source part · original LZZ record'},
   ],
   links:[['Read the original two-setup study',studies+'two-stage-cnc-milling/']],
  },
  {
   id:'pocketed-enclosure-cost',title:'A pocketed enclosure: where is precision needed?',
   html:p(
    "The "+a('pocketed enclosure study',studies+'milling-a-pocketed-enclosure-form/')+" brings together a recess, remaining walls and mounting features. A buyer can use that form to explain where a mating component fits and which faces need a controlled finish.",
    "That distinction helps separate functional requirements from appearance. A sealing interface, a clearance pocket and a visible outside face can need different acceptance criteria. A design review can examine each one without applying the most demanding finish or tolerance to every surface."
   ),
   photos:[
    {id:'milling-enclosure-operation',caption:'Pocketed component held beneath the spindle · original LZZ workshop photograph'},
    {id:'milling-enclosure-parts',caption:'Associated recessed component forms · original LZZ source photograph'},
   ],
   links:[['Read the pocketed enclosure study',studies+'milling-a-pocketed-enclosure-form/']],
  },
  {
   id:'turned-part-cost',title:'A cylindrical part can need a second process',
   html:p(
    "A cylindrical component may have turned diameters plus a flat, slot or off-axis feature. The "+a('turning followed by milling study',studies+'turning-then-milling-cylindrical-parts/')+" shows why the quotation needs to cover the secondary work and its relationship to the axis.",
    'Send the complete component model and drawing for quotation. A round outside profile still needs its off-axis features and assembly interfaces included in the machining scope.'
   ),
   photos:[
    {id:'turn-mill-operation',caption:'Secondary milling operation on a cylindrical part · original LZZ workshop photograph'},
   ],
   links:[['Explore the original machining studies',studies]],
  },
  {
   id:'material-and-stock',title:'Material cost includes more than the finished weight',
   html:p(
    "A machined part starts with stock large enough to hold and cut. A lightweight finished housing can therefore begin with substantially more material than remains in the component. Stock dimensions, machining allowance and the surfaces used for clamping all belong in the route review.",
    "The exact grade and condition also matter. A comparison between two material names is incomplete if it ignores required strength, exposure, electrical function, temperature or the final treatment. Use the "+a('material and finish guide','/resources/technical-guides/material-and-finish-checklist/')+" to keep those requirements together."
   )+h('Discuss an alternative against the part’s function',
    "A proposed material change needs to satisfy the design and procurement requirements. Ask the supplier to quote the specified option and identify an alternative separately, with its designation and condition. That keeps an apparent saving from hiding a change in the part you are buying.",
    "For a machined casting, the starting point is different again. Blank condition, allowance, locating surfaces and responsibility for supplying the casting must be clear. The "+a('casting-machining service','/capabilities/casting-machining/')+" sets out that review."
   ),
  },
  {
   id:'tolerances-and-inspection',title:'Where do tolerances and inspection add cost?',
   html:p(
    "A tolerance defines an acceptable result. The supplier then needs a process and measurement method suited to that requirement. A close-fitting bore, a hole pattern located from another face and a cosmetic surface can require different checks.",
    "Start with the function. Identify the dimensions and relationships that control fit, sealing, location or movement. The responsible design engineer can then review requirements on the remaining features. Relaxing a nonfunctional limit is a design decision that needs approval before the files change."
   )+h('Surface texture and size answer different questions',
    'Surface roughness controls texture; size tolerance controls the dimensional range. Mark both on the relevant working faces and state whether acceptance applies after treatment.',
    "The "+a('critical drawing features guide','/resources/technical-guides/critical-features-cnc-drawing/')+" connects those requirements to measurable features. In the quote, also identify the results that need to be recorded, the report format and the sampling scope."
   )+h('A report needs an agreed scope',
    "Checking a few dimensions for an assembly trial and producing an agreed feature-by-feature report involve different deliverables. State the required records while the part is being quoted. Ask about measurement methods and available documentation before the order, so the price and acceptance plan describe the same work."
   ),
  },
  {
   id:'finish-packing-delivery',title:'Include finishing, protection and delivery',
   html:p(
    "Anodizing, plating, passivation, blasting or polishing adds work after the main cutting operations. Treatment specification, appearance references, masked areas and handling requirements affect what needs to be arranged and checked.",
    'Mark mating bores, threads and contact faces for treatment or protection. State whether dimensions are accepted before or after finishing and agree the allowance for the specified process.'
   )+h('Quote the condition in which you need to receive the parts',
    "A finished sealing face or cosmetic surface may need separation and protection in the pack. Labels, part identification and required documents also need to match the receiving process. The "+a('packing and international shipping checklist','/resources/ordering/custom-cnc-parts-shipping-checklist/')+" helps define that scope.",
    "Keep the production schedule separate from transit. Give the destination and required arrival date, then check the quoted shipping basis, named place and responsibilities for freight, clearance, duties and taxes. A low unit price can be an incomplete comparison when those items differ."
   ),
  },
  {
   id:'reduce-cost',title:'How to reduce CNC machining cost while keeping the function',
   html:p(
    "A useful cost review begins with the features driving work. Explain what the part must do and which details can be discussed. Ask for an alternative with a stated change, then compare it with the original requirements."
   )+guideTable('Design discussions for a CNC cost review',['Review area','Question worth asking','Requirement to retain'],[
    ['Access and setups','Would a permitted design or orientation change simplify tool access?','The required relationships between features and the assembly interfaces.'],
    ['Pocket and corner geometry','Can a radius, relief or depth be adjusted where function allows?','Clearance, remaining section, sealing and any defined load requirements.'],
    ['Tolerances and texture','Which limits are necessary on the working surfaces?','The approved fit, function and measurable acceptance criteria.'],
    ['Material and finish','Is there a separately quoted alternative that meets the specification?','The approved grade or functional requirements, final condition and records.'],
    ['Quantity and repeat orders','Which realistic order sizes change the preparation or fixture choice?','The same released design and the required batch checks.'],
   ])+p(
    "Keep the proposed change, revised files and quotation reference together. If a saving comes from removing an inspection record or changing a treatment, make that change visible in the comparison. The "+a('quotation comparison guide','/resources/ordering/compare-cnc-machining-quotations/')+" covers the purchasing checks once you have prices to compare.",
    "For a first discussion, the current model, controlled drawing, material, final finish and realistic quantities give the review a clear starting point. Add critical features, required records and destination using the "+a('RFQ checklist','/resources/ordering/rfq-checklist/')+"."
   ),
  },
  {
   id:'cost-questions',title:'More questions about CNC machining prices',
   html:
    q('cost-per-hour','Can I estimate a part price from a CNC hourly rate?',
     "An hourly rate helps only when you also know the relevant machining time and what the rate includes. Programming, fixtures, inspection, treatment and delivery may be priced separately. A drawing-based quotation gives those assumptions a part-specific scope."
    )+
    q('small-part-cost','Why can a small machined part still be expensive?',
     'A small part still needs preparation, and difficult access or several operations add work. Compare the complete geometry and acceptance requirements, including when ordering one piece.'
    )+
    q('quantity-price','Will ordering more pieces always reduce the unit price?',
     'Shared preparation reduces repeat work, while the machining route and batch requirements depend on quantity. Request the quantities you plan to order against one specification and compare the quoted price breaks.'
    )+
    q('five-axis-price','Does five-axis machining always cost more?',
     "Compare complete routes. A multi-axis approach may change the number of manual setups and the access available to the tool, while also changing programming and fixture preparation. The "+a('process-selection guide','/resources/technical-guides/cnc-process-selection/')+" explains what to compare before choosing the route."
    )+
    q('drawing-price','Is a 3D model enough for an accurate quote?',
     "The model communicates shape. A controlled drawing and accompanying specification define requirements such as fits, datums, surface texture, treatment and inspection records. If a requirement is still open, identify it so the quotation states the assumption or question clearly."
    )+
    q('different-quote-price','Why do two suppliers quote different prices for the same part?',
     "They may propose different routes or include different work. Compare the revision, material condition, quantity, finish, inspection, setup charges and delivery basis first. Ask for exceptions in writing so the price difference can be understood."
    )+
    q('repeat-order-price','Should a repeat order have the same price as the prototype?',
     "It needs its own quotation. Quantity and reusable preparation can change, as can material, finish, inspection and delivery requirements. Refer to the approved revision and ask which earlier preparation remains applicable."
    )+
    q('budget-without-drawing','Can I request a budget before the design is finished?',
     "Explain the part function, approximate geometry, material options and likely quantities, and identify the unresolved decisions. Ask whether the available information supports a preliminary estimate. Agree its assumptions and revisit the price once the drawing and order scope are confirmed."
    ),
  },
 ],
};
