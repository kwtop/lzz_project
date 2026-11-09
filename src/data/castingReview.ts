type CastingReview={heading:string;focus:string;inputs:string;href:string;label:string};
// Drawing-review tasks, not separate delivered projects or inspection records.
export const castingReview:Record<string,CastingReview>={
 'custom-cnc-machined-castings-transmission-housings-pump-bodies':{
  heading:'Incoming blank and machining allowance',
  focus:'The casting drawing describes the incoming blank; the finished-part drawing locates the bores and faces to machine.',
  inputs:'Include the blank supplier, alloy and condition, stock allowance, datum targets and responsibility for incoming defects.',
  href:'/capabilities/casting-machining/#engineering-fit',label:'Review casting allowance and workholding',
 },
 'precision-cnc-machined-castings-manufacturer':{
  heading:'Hidden interfaces and measurement access',
  focus:'Internal splines, channels and flow paths can restrict both cutter and gauge access. Sections through the flange datums make those interfaces reviewable.',
  inputs:'Include the blank supplier and condition, incoming acceptance, interface limits and gauge requirements. Specify any fluid-integrity testing separately.',
  href:'/capabilities/casting-machining/#engineering-fit',label:'Review machining access and inspection planning',
 },
 'oem-precision-cnc-machined-casting-housing-structural-enclosures':{
  heading:'Fixture access around ribs and cavities',focus:'Ribs and deep cavities limit fixture contact. Bearing bores and mounting features need usable supports and shared locating references.',
  inputs:'Send blank geometry, wall sections, bore relationships and areas that must remain as cast.',
  href:'/capabilities/casting-machining/#engineering-fit',label:'Review fixture access for cast enclosures',
 },
 'oem-precision-cnc-machined-casting-housings':{
  heading:'Define the housing from a sample',focus:'If there is no complete drawing, use the sample to define connection bores, mating faces and required internal interfaces before agreeing the machining scope. Splines are reviewed only where the controlled model requires them.',
  inputs:'Send sample photographs, mating-part information, available drawings and the features to retain or change.',
  href:'/capabilities/starting-with-a-sample/',label:'Review the sample-to-part workflow',
 },
 'precision-cnc-machined-castings-custom-oem-housings':{
  heading:'Sealing faces, fits and mounting holes',focus:'Sealing faces, bearing fits and tapped mounting points must stay related as the irregular casting is repositioned.',
  inputs:'Send the casting specification, sealing-face requirements, fit limits, thread callouts and required inspection records.',
  href:'/capabilities/casting-machining/#engineering-fit',label:'Review sealing faces, fits and mounting holes',
 },
};
