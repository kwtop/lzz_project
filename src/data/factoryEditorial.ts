// Public facts follow docs/claim-ledger-2026-09-25.md.
export const factoryTopics={overview:'Factory and quality review for custom CNC parts',workshop:'Factory review and custom CNC machining',quality:'Inspection requirements and order records'};
export const factoryQuote=(page:keyof typeof factoryTopics)=>'/quote/?'+new URLSearchParams({part:factoryTopics[page]}).toString();
export const workshopMachines=[
 {name:'Milling centers',photo:'milling-enclosure-operation',caption:'Milling an enclosure in the LZZ workshop.',text:'Pockets, flat faces, bores and multi-face features.',parts:'Housings, instrument blocks and brackets.',href:'/capabilities/cnc-milling-service/',action:'Explore CNC milling'},
 {name:'Lathes & turn-mill equipment',photo:'turning-operation',caption:'A component held for turning.',text:'Rotational parts, threads and features combining turning and milling.',parts:'Shafts, sleeves, fittings and flanges.',href:'/capabilities/cnc-turning-service/',action:'Explore CNC turning'},
 {name:'Multi-axis machining',photo:'five-axis-machine-wide',caption:'A wider view of the multi-axis setup.',text:'Angled faces, curved surfaces and access from several directions.',parts:'Multi-face components and complex machined forms.',href:'/capabilities/5-axis-cnc-machining/',action:'Explore 5-axis machining'},
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
 {question:'How do I check whether my part fits your equipment?',answer:'Provide finished-part and stock dimensions, weight, critical features and any clamping restrictions. Machine travel, load, tool access and workholding are checked for the drawing. Request relevant machine details for supplier qualification.'},
 {question:'Which inspection reports can be supplied?',answer:'Specify the dimensional, first-article, material or finishing records you need before ordering. Agree the report format, measurement methods and instrument range. Ask for relevant sample reports and calibration evidence during supplier review.'},
 {question:'How long does production take?',answer:'Production takes 7–14 business days after drawing and order confirmation, including finishing. Shipping time is additional. Confirm the schedule for your quantity, requirements and arrival date in the quotation.'},
 {question:'How are packing and shipping arranged?',answer:'Specify vulnerable surfaces, threads, part identification and your delivery destination. Packing protection, transport arrangements and delivery responsibilities are agreed in the quotation. Past shipment photographs do not define the packing for your order.'},
];
export const inspectionStages=[
 {title:'Drawing review',text:'Agree critical features, datums, acceptance limits and the required records.',agreement:'Confirm the drawing revision and which features must be recorded.'},
 {title:'First article',text:'Check the initial part before the production run.',agreement:'Agree in advance if production must wait for your sample approval.'},
 {title:'In-process checks',text:'Inspect agreed features during machining.',agreement:'Define check points, sampling and the handling of deviations.'},
 {title:'Final inspection',text:'Verify the finished parts against the agreed drawing and order.',agreement:'Identify checks before or after finishing and the final release records.'},
];
export const measurementMethods=[
 ['Positions & geometric features','Coordinate measuring machine (CMM)','Drawing datums, feature limits, support and measurement strategy.'],
 ['Heights & linear dimensions','Height gauges','The reference surface, setup and accessible features.'],
 ['Suitable profiles','Optical projectors','The profile, reference and measurement orientation.'],
 ['Threads, surface finish & special tests','Confirm the method in your quotation','Specify thread, roughness, coating-thickness or hardness checks and records.'],
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
