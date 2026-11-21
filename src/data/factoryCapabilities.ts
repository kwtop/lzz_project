// Public scope: docs/claim-ledger-2026-09-25.md.
// Five-axis / lathe counts and the critical-feature tolerance were confirmed
// directly by the user on 2026-10-30. Model and travel data remain unprovided.
export const manufacturingCapacity={
 facilityArea:'1,500 m²',
 equipmentUnits:'40+',
 fiveAxisMachines:8,
 cncLathes:10,
 toleranceReference:'±0.01 mm',
 criticalFeatureTolerance:'±0.005 mm',
 referenceMonthlyOutput:'About 100,000 small parts',
} as const;

export const factoryCapabilityRows=[
 {label:'Production facility',value:manufacturingCapacity.facilityArea,detail:'Hangzhou, China'},
 {label:'Equipment total',value:manufacturingCapacity.equipmentUnits+' units',detail:'Machining and supporting equipment combined'},
 {label:'5-axis machines',value:manufacturingCapacity.fiveAxisMachines+' machines',detail:'For multi-face and contoured components'},
 {label:'CNC lathes',value:manufacturingCapacity.cncLathes+' machines',detail:'For shafts, sleeves, fittings and rotational parts'},
 {label:'Tolerance reference',value:manufacturingCapacity.toleranceReference,detail:'Drawing- and feature-dependent'},
 {label:'Critical dimensions',value:manufacturingCapacity.criticalFeatureTolerance,detail:'On reviewed features, subject to part evaluation'},
 {label:'Part size & workholding',value:'Reviewed per drawing',detail:'Finished and blank dimensions, weight and fixture clearance'},
 {label:'Inspection equipment',value:'CMM, height gauges and optical measurement',detail:'Methods and report scope agreed for the order'},
 {label:'Reference monthly output',value:manufacturingCapacity.referenceMonthlyOutput,detail:'Varies with size, geometry, material, finishing and order mix'},
];

export const factoryWorkshopRecords=[
 {title:'5-axis machining',photo:'five-axis-operation',text:'Cutter access to angled faces and pockets from several directions.',href:'/machined-parts/machining-examples/five-axis-machining-multi-face-parts/',link:'View the multi-face machining record'},
 {title:'CNC turning and milling',photo:'turn-mill-operation',text:'Turned bodies with holes, slots and other features added by milling.',href:'/machined-parts/machining-examples/turning-then-milling-cylindrical-parts/',link:'View the turning and milling record'},
 {title:'Aluminum housings',photo:'aluminum-housings',text:'Housings with machined cavities, bores and mounting faces.',href:'/machined-parts/machining-examples/29-inch-display-housing-cnc-machining/',link:'View a display-housing machining record'},
];
