import type {Guide} from './contentGuides';

export const guideTable=(label:string,headings:string[],rows:string[][])=>`<div class="ce-guide-table" role="region" tabindex="0" aria-label="${label}"><table><thead><tr>${headings.map(h=>`<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr><th scope="row">${row[0]}</th>${row.slice(1).map((cell,i)=>`<td data-label="${headings[i+1]}">${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

export const procurementGuideEntries:{slug:string;title:string;description:string;category:string;guide:Guide}[]=[
 {
  slug:'compare-cnc-machining-quotations',title:'How to compare CNC machining quotations',category:'Buyer guide',
  description:'Compare CNC quotes against the same drawing revision, material, quantity and acceptance requirements. Check exclusions, separate charges and delivery terms.',
  guide:{intro:'Before comparing unit prices, check that each quote covers the same part and the same work. A lower price may exclude finishing, inspection records or delivery. Put those differences beside the price before choosing a supplier.',visual:'drawing',sections:[
   {id:'same-requirements',title:'Send each supplier the same requirements',html:'<p>Use one drawing revision and model, with the material grade, finish, quantity and required arrival date. State the checks and documents needed for acceptance. If a supplier proposes a substitution or geometry change, record it as an alternative rather than comparing it as the original specification.</p>',links:[['Prepare the RFQ package','/resources/ordering/rfq-checklist/']]},
   {id:'comparison',title:'Compare what the price includes',html:guideTable('CNC quotation scope comparison',['Check','Compare across quotations','Question to resolve'],[
    ['Drawing and quantity','Part number, revision, units and quantity per line.','Is this price for the current revision and requested quantity?'],
    ['Material','Grade, condition, substitutions and required records.','Is the specified material included, or is an alternative proposed?'],
    ['Machining and finish','Required features, treatments, masking and final dimensions.','Which operations or treatments are excluded?'],
    ['Setup and other charges','Programming, setup, tooling and special documentation where quoted separately.','Which charges are one-time, recurring or dependent on a repeat order?'],
    ['Inspection','Features checked, sampling, methods and report format.','Are the requested acceptance records included?'],
    ['Packing and transport','Surface protection, pack labels, delivery term and named place.','Who pays for transport, clearance, duties and taxes?'],
    ['Schedule','Production start conditions, dispatch and transit assumptions.','Does the quoted time end at completion, dispatch or arrival?'],
    ['Commercial terms','Currency, payment stages, quote validity and treatment of changes.','Which terms need written agreement before the order?'],
   ])},
   {id:'unresolved-items',title:'Resolve exceptions before awarding the order',visual:'inspection',html:'<p>Ask for missing items to be confirmed in writing. Keep the original requirement, proposed exception and agreed decision together. Do not assume an omitted inspection record or finish is included.</p><p>When comparing total cost, include the quoted separate charges and delivery responsibilities. Do not invent an allowance for an unquoted item: request a revised quote. An earlier sample does not automatically cover a changed drawing or material.</p>',links:[['Review inspection planning','/factory/#quality'],['Plan sample approval','/resources/ordering/machined-prototype-approval-checklist/']]},
   {id:'quote-record',title:'Keep the agreed scope with the order',html:'<p>Record the accepted quotation reference and date, drawing revision, quantity, approved exceptions and delivery basis. Agree how later changes will affect price, schedule and acceptance. LZZ’s order process explains the points to confirm from drawing review through delivery.</p>',links:[['How we work','/about/how-we-work/']]},
  ],closing:'Discuss the scope of your quote'}
 },
 {
  slug:'critical-features-cnc-drawing',title:'How to specify critical features on a CNC drawing',category:'Drawing guide',
  description:'Identify mating and locating features, define drawing requirements and agree inspection records before quoting a CNC-machined part.',
  guide:{intro:'Start with the surfaces and features that determine how the part fits and works. Define their requirements on the controlled drawing, then agree how they will be checked. A coloured mark or a note saying “critical” does not replace dimensions and acceptance limits.',visual:'drawing',sections:[
   {id:'function-first',title:'Connect each requirement to the part function',html:'<p>Identify locating faces, mating bores, shaft seats, mounting holes and sealing interfaces that matter to your assembly. Explain the function when it helps clarify the requirement. The responsible design engineer should choose the datum scheme, tolerances and applicable drawing standard.</p><p>ASME Y14.5 defines the language for stating and interpreting geometric dimensioning and tolerancing on drawings and digital models. This preparation guide does not replace that standard or an engineering review.</p>',links:[['ASME Y14.5: scope of the standard','https://www.asme.org/codes-standards/find-codes-standards/y14-5-dimensioning-tolerancing']]},
   {id:'feature-checklist',title:'Make the requirement measurable',html:guideTable('Critical feature drawing checklist',['Feature or requirement','Specify on the drawing','Agree for acceptance'],[
    ['Locating faces and axes','The datums and feature relationships needed by the assembly.','How the part will be located for measurement.'],
    ['Mating bores and shafts','Required sizes and limits, with applicable fit requirements.','Which dimensions need recorded measurements.'],
    ['Hole patterns and slots','Locations and orientation relative to the selected references.','The method and records for the specified relationships.'],
    ['Sealing and cosmetic faces','Surface requirements and clearly identified faces.','The checks and any agreed appearance reference.'],
    ['Threads and edges','Thread designation and requirements for burrs or edge breaks.','The agreed checks for these features.'],
    ['Treated surfaces','Coated or masked areas and whether limits apply before or after treatment.','The inspection stage and treatment records required.'],
   ])},
   {id:'study-context',title:'See the questions in a machining study',visual:'process',html:'<p>A turned component with additional milled features needs their relationship to the turned axis defined. A pocketed enclosure needs its recesses and mounting interfaces described. The studies below show the relevant part forms and setups; they do not establish tolerances for your design.</p>',links:[['Turning followed by milling','/machined-parts/machining-examples/turning-then-milling-cylindrical-parts/'],['Pocketed enclosure study','/machined-parts/machining-examples/milling-a-pocketed-enclosure-form/']]},
   {id:'release-files',title:'Resolve file conflicts before release',html:'<p>Use consistent part numbers, units and revisions across the model and drawing. State which document controls if they differ, and resolve the conflict before production. If a feature changes, identify the revision and confirm whether the earlier quote or sample approval still applies.</p><p>Send your required inspection format with the inquiry. Confirm the measurement method and available records with the supplier; do not infer inspection coverage from a machine photograph or a general capability statement.</p>',links:[['Material and finish requirements','/resources/technical-guides/material-and-finish-checklist/'],['CNC milling capabilities','/capabilities/cnc-milling-service/'],['Prepare drawing files','/resources/ordering/rfq-checklist/']]},
  ],closing:'Review your drawing requirements'}
 },
 {
  slug:'machined-prototype-approval-checklist',title:'What to check before approving a machined prototype',category:'Sample approval guide',
  description:'Check a machined prototype against its drawing revision, fit, function, finish and agreed records. Document approval before releasing a repeat batch.',
  guide:{intro:'Approve the sample against the purpose agreed before machining. Record what was checked, what remains open and which revision the decision covers. Receiving a sample or accepting its appearance is not the same as approving every requirement for production.',visual:'batch',sections:[
   {id:'evaluation',title:'Agree the evaluation before making the sample',html:'<p>Decide whether the sample is for assembly fit, a defined functional check, appearance or a combination. Identify who supplies mating components, fixtures and test procedures, who performs the checks and who can approve the result. If prototype material or finish differs from the intended production part, record that limitation.</p>',links:[['Prototype machining','/capabilities/prototype-machining/']]},
   {id:'approval-checklist',title:'Check the sample and its records together',html:guideTable('Machined prototype acceptance checklist',['Check','Evidence to review','Record the decision'],[
    ['Identity','Part number, drawing revision, sample reference and quantity.','Confirm which configuration is being evaluated.'],
    ['Material and finish','The agreed grade, condition, treatment and available records.','Record approved alternatives or unresolved differences.'],
    ['Dimensions','Results for the features and limits agreed for acceptance.','Link results to the sample and measurement method.'],
    ['Assembly fit','Checks using the agreed mating parts or fixture.','Record the setup, observations and any interference.'],
    ['Function','Results from the agreed procedure, where required.','State the tested conditions and any untested requirements.'],
    ['Appearance and handling','Cosmetic faces, edges and surface protection against the agreed criteria.','Identify defects or differences with photographs and references.'],
    ['Open issues','Any deviation, missing record or requested design change.','Assign the next action before releasing production.'],
   ])},
   {id:'approval-record',title:'Write down exactly what has been approved',visual:'inspection',html:'<p>Keep a short approval record with the part and sample references, drawing revision, checks performed, supporting records, decision and actual approver. Mark the decision as approved, approved with documented conditions, or not approved. List unresolved items and whether a revised sample is required.</p><p>Agree the decision with the supplier. A design change after approval may require another review; do not silently carry the earlier decision into a new revision.</p>'},
   {id:'batch-release',title:'Release the batch as a separate decision',html:'<p>Use the approved configuration to confirm batch quantity, inspection sampling, required records, packing and schedule. A sample result applies to the sample evaluated; agree the checks needed for subsequent parts. Reconfirm any changes in material, finish or machining route before the batch starts.</p>',links:[['Plan repeat production','/resources/ordering/prototype-vs-small-batch-cnc/'],['Compare quotation scope','/resources/ordering/compare-cnc-machining-quotations/'],['How we work','/about/how-we-work/']]},
  ],closing:'Plan your sample and next batch'}
 },
];
