import type {ApprovedResourceGuide} from './resourceApproved';
import {featureTable} from './productGuideTypes';

type SectionReview={append?:string;replace?:[string,string][]};
type BuyerReview={intro?:string;sections:Record<string,SectionReview>};

// Editorial additions reviewed on 2 November 2026. Technical examples do not
// assert customer results, product ratings or additional LZZ capabilities.
const reviews:Record<string,BuyerReview>={
 'designing-aluminum-enclosures-for-cnc-machining':{
  intro:'For a CNC-milled aluminum enclosure, wall thickness and pocket depth must leave room for the cutter and support for the remaining material. The lid register, board mounts and connector openings then determine which dimensions need close control. This guide covers that solid-stock machining route; an extruded body or folded sheet-metal box starts from a different construction.',
  sections:{
   'working-surfaces':{append:`
    <h3 id="enclosure-starting-form">Identify the starting form before comparing enclosure quotes</h3>
    <p>A model of the finished box can conceal how it is made. Milling a cavity from solid stock, cutting features into a supplied extrusion and assembling folded panels involve different preparation and joints. Send the proposed starting form with the model. An extrusion-based inquiry also needs the profile drawing and the definition of any separate end panels.</p>
    <p>For the pocketed housing shown here, sections through the cavity, rim and openings are the useful manufacturing views. Compare wall support and access on those sections. A wall-thickness recommendation for a folded panel or a stock extrusion does not establish a suitable limit for this machined cavity.</p>`},
   'pockets-and-walls':{append:`
    <h3 id="enclosure-design-alternative">Price one proposed geometry change at a time</h3>
    <p>If an internal corner provides clearance, ask the designer whether its radius can increase while the lid register and mounting interfaces stay fixed. The supplier can then quote that controlled alternative. If the corner locates another component, changing it requires a check of the mating geometry before it becomes a cost option.</p>
    <p>A useful DFM response names the affected feature, proposed change and requirement that will be preserved. Check those details against the original and revised drawings before accepting the change.</p>`},
  },
 },
 'datums-and-hole-position-on-circular-machined-parts':{
  sections:{'pattern-clocking':{append:`
   <h3 id="flange-assembly-disagreement">Investigate the assembly symptom before enlarging holes</h3>
   ${featureTable(['Assembly observation','Relationship to check','Useful information for the review'],[
    ['The pattern fits only after rotating the flange.','Clocking of the pattern relative to the side port, slot or other orientation feature.','The mating drawing and the angular reference used for inspection.'],
    ['Individual holes accept a gauge, but the mating pattern will not assemble.','Pattern location and orientation from the locating bore and seating face.','Hole results evaluated in the specified datum alignment, alongside the size results.'],
    ['The part seats differently when fasteners are tightened.','Contact at the seating face and the specified free or restrained condition.','The assembly contact arrangement and the support used during measurement.']])}
   <p>These observations guide an investigation; none identifies a defect by itself. Check the released revisions and actual locating contacts first. Enlarging a hole can change location or retention in the assembly, so a proposed correction belongs in the controlled drawing and approval record.</p>`}},
 },
 'how-to-specify-fits-and-runout-on-turned-parts':{
  sections:{'measurement-and-finish':{append:`
   <h3 id="shaft-size-and-runout-results">Read a diameter result and a runout result separately</h3>
   <p>For the flanged component shown here, the bore, stepped diameters and shoulder can establish several different assembly relationships. A report headed only “shaft checked” leaves the buyer unable to tell which one was evaluated. Each controlled feature needs its result tied to the specified reference, surface extent and final condition.</p>
   <p>If a journal passes its size limits but the specified runout fails, changing the diameter tolerance does not resolve the failed relationship. First compare the datum setup and measurement locations with the drawing. A proposed correction then needs to preserve the fit, shoulder location and any treated working surface. The <a href="/resources/technical-guides/datums-and-hole-position-on-circular-machined-parts/">circular-part datum guide</a> covers the same alignment issue where a bore locates a mating flange.</p>`}},
 },
 'choosing-thread-and-seal-requirements-for-machined-fittings':{
  sections:{'separate-checks':{append:`
   <h3 id="fitting-test-configuration">Make the test configuration match the supplied connection</h3>
   <p>If a test closes a passage at a different interface, it may leave the customer's seal outside the test boundary. Show the installed seals, plugged ports and surfaces exposed to the test medium in a section or assembly view, and keep that configuration with the agreed procedure and acceptance criteria.</p>
   <p>Also distinguish the machined body from the completed fitting. One quotation may cover a body with gauged threads, while another includes specified seals, assembly and an agreed leakage test. Compare those deliverables before comparing unit prices. A successful test of an earlier sample applies to its recorded configuration; a later seal, coating or mating-port change needs review.</p>`}},
 },
 'what-to-check-before-machining-a-cast-housing':{
  sections:{'incoming-blank':{append:`
   <h3 id="casting-incoming-decision">Decide whether the blank can proceed before cutting</h3>
   ${featureTable(['Incoming finding','Decision to resolve','Record to retain'],[
    ['Stock is present at the finished features in the proposed locating arrangement.','Proceed under the agreed incoming and first-part inspection plan.','Blank identity, revision and the stock-check results required by that plan.'],
    ['A bore or wall cannot reach the released geometry from the required datums.','Hold for an approved disposition; shifting a controlled bore is a design change.','The affected feature, layout result and authorized drawing change or rejection.'],
    ['A repair, exposed porosity or another specified condition needs approval.','Apply the purchasing criteria and approval responsibility before further work.','The finding and the accepted disposition linked to the casting or batch.']])}
   <p>When the customer supplies the blanks, the quotation should identify who checks incoming stock and what happens to an unusable blank. If the machining supplier also arranges the casting, the blank and finished-part requirements still need a common revision basis. A price for cutting alone leaves the foundry coordination and rejected-blank responsibility unresolved.</p>`}},
 },
 'why-machined-plastic-parts-need-defined-measurement-conditions':{
  intro:'For CNC-machined plastic parts, a tolerance needs a defined measurement state. Temperature, moisture history, support and contact force can change the comparison between a supplier and receiving inspection. Use data for the ordered polymer grade and specify the state in which its bore, shaft or mounting surface must fit; a tolerance table for an injection-molded part cannot establish those machining and inspection conditions.',
  sections:{'receiving-checklist':{append:`
   <h3 id="plastic-disagreeing-readings">When supplier and receiving measurements disagree</h3>
   <p>Before recutting a sleeve or rejecting a strip, compare the measurement records for the same feature. Check the drawing revision, axial or bore location, part temperature, conditioning history and support. “Measured with a micrometer” does not identify how firmly its contacts loaded a thin wall or how a long part was supported.</p>
   <p>On the perforated strip shown in this guide, use the agreed support and orientation when comparing bore positions along the length. A different setup can change the comparison even when the instrument is unchanged. If the recorded conditions match and the results still disagree, investigate the measurement method and material response before deciding which dimension requires correction. There is no universal waiting time or conditioning schedule for every polymer and geometry.</p>`}},
 },
 'preparing-an-impeller-model-for-5-axis-machining':{
  sections:{'controlled-model':{append:`
   <h3 id="impeller-model-disagreement">Resolve model repairs before programming</h3>
   <p>If the supplier finds a missing face or inconsistent transition near a blade root, ask for a marked view identifying the location and proposed repair. A change to a controlled blade or hub surface needs the design owner's approval. Keep the repaired file under a new identifiable revision so programming and later geometry comparison use the same definition.</p>
   <p>A display rendering is useful for orientation, but it cannot settle a disagreement between manufacturing files. Identify which model controls the blade passages and which drawing controls the hub fit and mounting references. Where a mesh is supplied, agree whether it is an adequate manufacturing definition for the required surface and inspection work.</p>`},
   'geometry-checks':{append:`
    <p>For an initial impeller, agree the reported regions before the sample is machined: the hub interface, the specified blade surfaces and the root regions that need evaluation. A toolpath simulation addresses the proposed cutting route. It does not replace those finished-part results or any separately ordered balancing or operating test.</p>`},
  },
 },
 'which-aluminum-features-need-masking-before-anodizing':{
  sections:{'masking-and-alternatives':{append:`
   <h3 id="anodized-bore-route-comparison">Compare the available routes for a fitted bore</h3>
   ${featureTable(['Route under review','Consequence to resolve','Final acceptance information'],[
    ['Mask the indicated bore before anodizing.','That region remains outside the main treatment and may need separately specified protection.','Bore size, mask boundary and the required condition of the chamfer and shoulder.'],
    ['Anodize, then perform an approved sizing operation.','Machining can remove coating from the working region and change its protection.','Final size, exposed region and the designer-approved surface condition.'],
    ['Machine an allowance and accept the treated bore.','The allowance and achievable internal coverage depend on the selected process and geometry.','Process-specific preparation, final dimensional limits and required coating checks.']])}
   <p>Choose the route with the machining and finishing suppliers before production. A nominal coating thickness alone cannot decide between them. The mating fit, treatment coverage and protection of any exposed material must remain compatible with the assembly.</p>`}},
 },
 'specifying-a-billet-intake-manifold-for-machining':{
  intro:'A billet intake manifold component is machined from solid stock. Its internal passages and mating faces must match the cylinder-head, throttle and seal interfaces specified for the assembly. A machining quote needs those definitions and a clear supplied-item list, including any hardware, joining work and functional checks.',
  sections:{'mating-components':{append:`
   <h3 id="manifold-fitment-definition">A vehicle or engine name is not the mating definition</h3>
   <p>For the multi-runner reference shown here, the useful fitment inputs are the approved port locations, flange faces, mounting pattern and selected seals. A vehicle description can help identify the project, but it does not establish those dimensions or the revision of each mating component. Supply the controlling head, throttle and other interface drawings available for the actual design.</p>
   <p>Resolve any missing interface before treating the model as released. If the customer supplies a mating component for a trial, record its identity and the purpose of that check. A successful fitment trial on that configuration does not establish compatibility with an unreviewed engine variant.</p>`}},
 },
 'what-matters-when-ordering-a-custom-indexing-plunger':{
  sections:{'projection-stroke-engagement':{append:`
   <h3 id="plunger-working-engagement">Show the pin's working engagement in section</h3>
   <p>Where the pin has a permitted lead-in, show it separately from the working length required to enter the mating hole. A nose that starts to enter does not establish that the mechanism has reached its specified engaged position. The assembly view should show the installed gap, pin position and mating-hole region used to assess that requirement.</p>
   <p>Use the agreed mounted configuration for withdrawal and return checks. If the first assembly needs a change to body depth or retaining hardware, record the accepted position and update the controlled setup before batch release. Later inspections can then reproduce that position.</p>`}},
 },
 'cnc-machining-cost-factors':{
  sections:{'cost-breakdown':{append:`
   <h3 id="quoted-order-total">Separate a lower unit price from a lower order total</h3>
   <p>For a quotation that lists setup separately, the comparison is <code>order total = quoted setup + quantity × unit price + other separately listed charges</code>. Add only charges that are outside the unit price. If programming or finishing is already included, counting it again overstates the order cost.</p>
   <p>Use the quantity you intend to release, not a forecast batch that has not been ordered. A larger lot may spread preparation across more pieces while committing you to a different total purchase and production route. The <a href="/resources/ordering/compare-cnc-machining-quotations/">quotation comparison guide</a> helps identify whether two offers cover the same finished work.</p>`}},
 },
 'rfq-checklist':{
  sections:{'drawing-package':{append:`
   <h3 id="rfq-part-specific-inputs">Add the view that explains the difficult feature</h3>
   ${featureTable(['Part being quoted','Useful addition to the model and drawing'],[
    ['Pocketed aluminum housing','A section showing the floor, walls, lid register and protected clamping faces. See the <a href="/resources/technical-guides/designing-aluminum-enclosures-for-cnc-machining/">enclosure design guide</a>.'],
    ['Turned shaft or sleeve','The mating component, working fit length and datum axis for any runout requirement. See the <a href="/resources/technical-guides/how-to-specify-fits-and-runout-on-turned-parts/">fits and runout guide</a>.'],
    ['Casting that needs finish machining','Both blank and finished geometry, incoming stock checks and responsibility for supplying the blanks. See the <a href="/resources/technical-guides/what-to-check-before-machining-a-cast-housing/">cast-housing review</a>.'],
    ['Plastic strip, block or sleeve','The ordered grade, assembly condition and support used for dimensional acceptance. See the <a href="/resources/technical-guides/why-machined-plastic-parts-need-defined-measurement-conditions/">plastic measurement guide</a>.']])}
   <p>Attach the detail that changes the manufacturing or acceptance decision. Repeated screenshots of the outside shape add less than one section through an inaccessible bore or a clearly marked mating surface. Keep open design decisions visible so the quotation identifies its assumptions.</p>`}},
 },
 'compare-cnc-machining-quotations':{
  sections:{'unresolved-items':{append:`
   <h3 id="quote-component-or-assembly">Check whether the price covers components or an assembly</h3>
   <p>For an <a href="/resources/technical-guides/what-matters-when-ordering-a-custom-indexing-plunger/">indexing plunger</a>, a body-and-pin price and a complete mechanism price describe different deliverables. The latter also needs the specified spring, retaining items, assembly work and agreed functional checks identified. A photograph of an assembled reference does not add those items to a quotation.</p>
   <p>Record the supplied-item list in writing. Where machined pieces are accepted before assembly into the customer's equipment, also identify who carries out any later assembly or test and which configuration they will receive.</p>`}},
 },
 'machined-prototype-approval-checklist':{
  sections:{'evaluation':{append:`
   <h3 id="sample-assembly-clearance">Keep an assembly trial tied to its stated purpose</h3>
   <p>A flange can enter a mating assembly through clearance holes without establishing every hole's required position. Name the mating component used in the trial and retain the drawing-based checks specified for the flange. The <a href="/resources/technical-guides/datums-and-hole-position-on-circular-machined-parts/">circular hole-pattern guide</a> explains why hole size, pattern location and clocking need separate attention.</p>
   <p>The approval record should distinguish that trial from the completed dimensional and surface checks. If the sample uses an alternative mate or a temporary fixture, identify it so a later batch is not released against an unrecorded assembly condition.</p>`}},
 },
 'prototype-vs-small-batch-cnc':{
  sections:{'section-2':{append:`
   <h3 id="repeat-housing-revision">Review a similar-looking housing against its new mate</h3>
   <p>A revised lid register or connector opening may leave the outside of an enclosure looking almost unchanged. The earlier sample approval still belongs to its recorded drawing and mating configuration. For the next batch, identify which bore, rim or mounting results remain applicable and which require another check.</p>
   <p>The <a href="/resources/technical-guides/designing-aluminum-enclosures-for-cnc-machining/">enclosure interface review</a> helps isolate those changed surfaces. Give the supplier the revised model and drawing together, with the release quantity and the disposition of any earlier stock. Reusing a part name alone does not communicate the change.</p>`}},
 },
 'custom-cnc-parts-shipping-checklist':{
  sections:{'delivery-package':{append:`
   <h3 id="receiving-arrival-discrepancy">Record an arrival discrepancy before changing the part</h3>
   ${featureTable(['Receiving observation','Information to compare before deciding the next action'],[
    ['A sealing or cosmetic face is damaged.','Package condition, separation and protection, part identification and the agreed delivered-surface requirement.'],
    ['A plastic fit measures differently after unpacking.','Ordered grade, agreed conditioning, temperature, support and the original measurement locations.'],
    ['Parts look alike but do not match the intended assembly.','Package labels, part numbers, revisions, quantities and the approved mating configuration.']])}
   <p>Keep the affected parts identifiable while the discrepancy is reviewed. These checks help separate transport damage, identification problems and a measurement-condition difference; they do not decide responsibility on their own. Send the relevant photographs and records against the order reference.</p>`}},
 },
 'critical-features-cnc-drawing':{
  sections:{'finished-state':{append:`
   <h3 id="drawing-report-stage">Identify the stage of each reported result</h3>
   <p>A locating bore may be measured during machining and again after treatment. Keep the same feature reference and label the stage on each report row so receiving inspection can find the final result. If a later operation changes that surface, its earlier passing measurement no longer establishes the finished size.</p>
   <p>The EX-MOUNT-01 exercise uses a final machined condition before surface treatment. A production drawing that requires a coated or masked fit needs its own completed-state limits and checking plan. For feature-level boundaries, use the <a href="/resources/technical-guides/which-aluminum-features-need-masking-before-anodizing/">anodizing masking guide</a> with the released drawing.</p>`}},
 },
 '6061-vs-7075-cnc-aluminum':{
  sections:{'strength-and-stiffness':{append:`
   <h3 id="aluminum-typical-property-comparison">Read the strength ratio alongside the modulus ratio</h3>
   <p>Using the cited Kaiser T6/T651 rod-and-bar values, the typical yield-strength ratio is <code>503 / 276 ≈ 1.82</code>, while the elastic-modulus ratio is <code>71.0 / 68.3 ≈ 1.04</code>. Neither ratio establishes a component's load capacity or removes the need to assess its section, joints and loading.</p>
   <p>For a thin enclosure wall limited by deflection, the relatively small modulus difference is a reason to review support and geometry alongside the alloy. For a strength-limited bracket, the yield comparison may matter more. Both decisions still need the applicable product-form data and design requirements; the brochure values are not guaranteed purchase minima.</p>`}},
 },
 'material-and-finish-checklist':{
  sections:{'enclosure-finish-example':{append:`
   <h3 id="enclosure-finish-boundaries">Separate the lid rim from the clearance cavity</h3>
   <p>On a <a href="/machined-parts/gallery/small-batch-cnc-machining-manufacturer-complex-aluminum-housings/">pocketed aluminum housing</a>, the closure rim, locating openings and cavity walls can have different jobs. Put the selected treatment and final dimensional requirement on the actual working region. A color requirement on the outside does not identify how a fitted bore or sealing rim will be accepted.</p>
   <p>When comparing a finish proposal, ask which surfaces receive preparation, which remain masked and which results accompany the finished part. An appearance sample for one alloy and preparation cannot establish every dimensional or visual requirement for a changed material and route.</p>`}},
 },
 'cnc-process-selection':{
  sections:{'accuracy':{append:`
   <h3 id="different-machining-route-proposals">Compare two proposed routes against the same features</h3>
   <p>If one supplier proposes separate turning and milling while another proposes a combined machine, ask how each route locates the secondary features from the required axis and face. Compare the protected contacts, final treatment and stated checks at your order quantity. The machine description alone cannot establish which offer includes the required work.</p>
   <p>For a contoured impeller, the same review also needs the complete cutter-and-holder approach between the blades. The <a href="/resources/technical-guides/preparing-an-impeller-model-for-5-axis-machining/">impeller model guide</a> connects those surfaces to the route and inspection review. Keep any proposal to alter a controlled surface separate from approval of the original geometry.</p>`}},
 },
};

export function buyerReviewedGuide(slug:string,original:ApprovedResourceGuide):ApprovedResourceGuide{
 const review=reviews[slug];
 if(!review)return original;
 for(const id of Object.keys(review.sections)){
  if(!original.modules.some(module=>module.section.id===id))throw new Error('Missing reviewed guide section: '+slug+'#'+id);
 }
 return {...original,...(review.intro?{intro:review.intro}:{}),editorial:{updated:'2026-11-02',dateLabel:'2 November 2026'},modules:original.modules.map(module=>{
  const changes=review.sections[module.section.id];
  if(!changes)return module;
  let html=module.section.html;
  for(const [before,after]of changes.replace||[]){
   if(html.split(before).length!==2)throw new Error('Guide prose no longer matches reviewed input: '+slug+'#'+module.section.id);
   html=html.replace(before,after);
  }
  return {...module,section:{...module.section,html:html+(changes.append||'')}};
 })};
}
