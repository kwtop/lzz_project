type CastingReview={heading:string;focus:string;inputs:string;href:string;label:string};
// Drawing-review tasks, not separate delivered projects or inspection records.
export const castingReview:Record<string,CastingReview>={
 'custom-cnc-machined-castings-transmission-housings-pump-bodies':{
  heading:'Incoming blank and machining allowance',
  focus:'Control blank acceptance, machining allowance and datum transfer with the casting and finished-part drawings.',
  inputs:'Include the blank supplier, alloy and condition, stock allowance, datum targets and responsibility for incoming defects.',
  href:'/capabilities/casting-machining/#engineering-fit',label:'Review casting allowance and workholding',
 },
 'precision-cnc-machined-castings-manufacturer':{
  heading:'Hidden interfaces and measurement access',
  focus:'Reference internal splines, channels and flow paths to the flange datums in sections or the controlled model. Identify tool and measurement access for each critical feature.',
  inputs:'Include the blank supplier and condition, incoming acceptance, interface limits and gauge requirements. Specify any fluid-integrity testing separately.',
  href:'/capabilities/casting-machining/#engineering-fit',label:'Review machining access and inspection planning',
 },
 'oem-precision-cnc-machined-casting-housing-structural-enclosures':{
  heading:'Fixture access around ribs and cavities',focus:'Plan fixture support around ribs and deep cavities. Locate bearing bores and mounting features from the agreed datums.',
  inputs:'Send blank geometry, wall sections, bore relationships and areas that must remain as cast.',
  href:'/capabilities/casting-machining/#engineering-fit',label:'Review fixture access for cast enclosures',
 },
 'oem-precision-cnc-machined-casting-housings':{
  heading:'Define the housing from a sample',focus:'If there is no complete drawing, use the sample to define connection bores, mating faces and required internal interfaces before agreeing the machining scope. Splines are reviewed only where the controlled model requires them.',
  inputs:'Send sample photographs, mating-part information, available drawings and the features to retain or change.',
  href:'/capabilities/starting-with-a-sample/',label:'Review the sample-to-part workflow',
 },
 'precision-cnc-machined-castings-custom-oem-housings':{
  heading:'Sealing faces, fits and mounting holes',focus:'Locate sealing faces and bearing fits from the casting datums. Include tapped mounting points and final wall geometry.',
  inputs:'Send the casting specification, sealing-face requirements, fit limits, thread callouts and required inspection records.',
  href:'/capabilities/casting-machining/#engineering-fit',label:'Review sealing faces, fits and mounting holes',
 },
};
