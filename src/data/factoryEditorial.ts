// Public facts follow docs/claim-ledger-2026-09-25.md.
export const factoryTopics={overview:'Factory and part suitability',workshop:'Machining setup for my part',quality:'Inspection requirements and order records'};
export const factoryQuote=(page:keyof typeof factoryTopics,section?:string)=>'/quote/?'+new URLSearchParams({part:factoryTopics[page],source:'/factory/'+(section?'#'+section:page==='quality'?'#quality':page==='workshop'?'#workshop':'')}).toString();
export const workshopMachines=[
 {name:'Milling centers',process:'CNC milling',photo:'milling-enclosure-operation',caption:'Milling an enclosure in the LZZ workshop.',text:'Pockets, flat faces, bores and multi-face features.',parts:'Housings, instrument blocks and brackets.',geometry:'Pocket depth, internal corner radii and thin walls affect cutter access and support. Mounting faces and bores need a consistent datum through each setup.',href:'/capabilities/cnc-milling-service/',action:'Explore CNC milling',examples:[['Instrument blocks and brackets','/machined-parts/gallery/custom-oem-high-precision-cnc-milling-manufacturer/'],['Aluminum enclosures','/machined-parts/gallery/precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures/']]},
 {name:'Lathes & turn-mill equipment',process:'CNC turning and turn-mill',photo:'turning-operation',caption:'A component held for turning.',text:'Rotational parts, threads and features combining turning and milling.',parts:'Shafts, sleeves, fittings and flanges.',geometry:'Diameters and shoulders are located from the part axis. Slender sections need support; cross-holes, flats and off-axis features need tool access and an angular reference.',href:'/capabilities/cnc-turning-service/',action:'Explore CNC turning',examples:[['Turned fittings and flanges','/machined-parts/gallery/custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer/'],['Stepped bores and internal features','/machined-parts/gallery/high-volume-cnc-turning-for-complex-internal-external-features/']]},
 {name:'Multi-axis machining',process:'Multi-axis machining',photo:'five-axis-machine-wide',caption:'A wider view of the multi-axis setup.',text:'Angled faces, curved surfaces and access from several directions.',parts:'Multi-face components and contoured parts.',geometry:'Tool orientation, holder clearance and fixture position determine access around the part. Features across faces need shared datums; the model shows whether cutting requires a fixed or changing tool angle.',href:'/capabilities/5-axis-cnc-machining/',action:'Explore 5-axis machining',examples:[['Multi-sided components','/machined-parts/gallery/global-manufacturer-of-multi-sided-precision-machined-components/'],['Multi-face machining study','/machined-parts/machining-examples/five-axis-machining-multi-face-parts/']]},
];
export const workshopStages=[
 {title:'Requirements & quotation',input:'Drawing or model, material, quantity and acceptance requirements.',output:'A quotation defining machining scope, inspection, timing and approval steps.'},
 {title:'Sample & inspection',input:'The agreed sample specification and the features to measure.',output:'A sample or prototype and the agreed inspection results, where a sample stage is required.'},
 {title:'Approval & production',input:'The confirmed drawing revision and any required sample approval.',output:'Production against the agreed material, finish, quantity and inspection plan.'},
 {title:'Final QC & shipment',input:'Final acceptance, packing requirements and delivery arrangements.',output:'Protected parts and the agreed inspection records, packing list and shipment information.'},
];
export const workshopQuestions=[
 {question:'Can I start with one part?',answer:'Yes. Orders start at 1 piece. Include the prototype quantity and expected repeat demand so setup, pricing and inspection can be reviewed together.'},
 {question:'What should I send for a quotation?',answer:'Send a STEP model and a 2D drawing with the part number, units and revision. State the material, finish and quantity, and mark critical dimensions. If the files disagree, identify which document takes precedence.'},
 {question:'How do I check whether my part fits your equipment?',answer:'Finished-part and stock dimensions, material and weight establish the space and load needed for the setup. Clamping restrictions and protected surfaces help us assess fixture clearance and cutter access. Machine details for supplier qualification are checked against the proposed route.'},
 {question:'Which inspection reports can be supplied?',answer:'The quotation identifies the dimensional, first-article, material or finishing records for your order, with the report format, measurement methods and instrument range. Relevant sample reports and calibration evidence can be requested for supplier qualification.'},
 {question:'How long does production take?',answer:'Production takes 7-14 business days after drawing and order confirmation, including finishing. Shipping time is additional. Confirm the schedule for your quantity, requirements and arrival date in the quotation.'},
 {question:'How are packing and shipping arranged?',answer:'Specify vulnerable surfaces, threads, part identification and your delivery destination. Packing protection, transport arrangements and delivery responsibilities are agreed in the quotation. Past shipment photographs do not define the packing for your order.'},
];
export const inspectionStages=[
 {title:'Drawing review',text:'We use the drawing revision to identify critical features and inspection datums.',agreement:'We record the limits, measurement methods and reporting requirements in the inspection plan.'},
 {title:'First article',text:'The initial part is checked before the production run.',agreement:'The order states whether your sample approval is a production hold point.'},
 {title:'In-process checks',text:'Specified features are checked during machining.',agreement:'The inspection plan sets check points, sampling and the handling of deviations.'},
 {title:'Final inspection',text:'Finished parts are checked against the agreed drawing and order.',agreement:'The inspection plan identifies checks before or after finishing and the final release records.'},
];
export const measurementMethods=[
 ['Positions & geometric features','Coordinate measuring machine (CMM)','Drawing datums, feature limits, support and measurement strategy.'],
 ['Heights & linear dimensions','Height gauges','The reference surface, setup and accessible features.'],
 ['Suitable profiles','Optical projectors','The profile, reference and measurement orientation.'],
 ['Threads, surface finish & special tests','Method set in the quotation','Required thread, roughness, coating-thickness or hardness checks and records.'],
];
export const orderRecords=[
 ['Dimensional & first-article reports','Measured features, datums, limits, methods and results.','Drawing revision, part or batch reference, sampling and review details.'],
 ['Material records','Grade, condition and the traceability needed for the part.','Document type and availability confirmed in the quotation.'],
 ['Finishing documents','Finishing process, special tests and required records.','Part or batch reference and any checks after treatment.'],
 ['Surface & batch checks','Cosmetic faces, masking, edges and sampling.','Acceptance criteria and who approves any deviation.'],
];
export const qualificationFields=[
 ['Legal entity','Hangzhou Lizhizao Precision Machinery Co., Ltd.'],
 ['Certificate','Current certificate copy, number and issuing certification body.'],
 ['Validity & scope','Issue and expiry dates, covered site and certified activities.'],
 ['Verification','Verification method, relevant inspection records and calibration evidence.'],
];
const qualificationBody='Please provide the current ISO 9001 certificate for Hangzhou Lizhizao Precision Machinery Co., Ltd., including certificate number, issuing body, validity dates, covered site, scope and verification method.\n\nProject / drawing reference:\nRequired inspection records:';
export const qualificationHref='mailto:roger@lzz-cnc.com?subject='+encodeURIComponent('Supplier qualification documents')+'&body='+encodeURIComponent(qualificationBody);
export const reportHref='mailto:roger@lzz-cnc.com?subject='+encodeURIComponent('Sample inspection report request')+'&body='+encodeURIComponent('Please confirm whether you can share a redacted inspection report relevant to my project, with the drawing revision, acceptance limits, measurement method and results.\n\nProject / part reference:\nRequired inspection records:');
