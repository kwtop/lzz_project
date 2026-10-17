type CastingReview={heading:string;focus:string;inputs:string;href:string;label:string};
// Drawing-review tasks, not separate delivered projects or inspection records.
export const castingReview:Record<string,CastingReview>={
 'custom-cnc-machined-castings-transmission-housings-pump-bodies':{
  heading:'Start with the incoming blank',
  focus:'With casting and finished-part drawings available, assign blank acceptance, machining allowance and datum transfer before machining.',
  inputs:'Supply both casting and finished-part drawings, blank source and condition, stock allowance, datum targets and responsibility for incoming defects.',
  href:'/capabilities/casting-machining/#engineering-fit',label:'Review casting allowance and workholding',
 },
 'precision-cnc-machined-castings-manufacturer':{
  heading:'Start with hidden interfaces',
  focus:'Define inaccessible splines, flow paths and their relationship to flange datums. Include blank source, condition and incoming acceptance in the same review.',
  inputs:'Supply sections or a controlled model, the flange datum scheme, interface limits and the proposed gauge or measurement access. Agree fluid-integrity testing separately.',
  href:'/capabilities/casting-machining/#engineering-fit',label:'Review machining access and inspection planning',
 },
 'oem-precision-cnc-machined-casting-housing-structural-enclosures':{
  heading:'Review ribbed enclosure access',focus:'Plan fixture support around ribs and deep cavities, then locate bearing bores and mounting features from the agreed datums.',
  inputs:'Send blank geometry, wall sections, bore relationships and areas that must remain as cast.',
  href:'/capabilities/casting-machining/#engineering-fit',label:'Review fixture access for cast enclosures',
 },
 'oem-precision-cnc-machined-casting-housings':{
  heading:'Convert a sample into controlled geometry',focus:'When no complete drawing exists, use the sample to define central bores, splines and mating faces before agreeing the machining scope.',
  inputs:'Send sample photographs, mating-part information, available drawings and the features to retain or change.',
  href:'/capabilities/casting-machining/#sample-to-part',label:'Review the sample-to-part workflow',
 },
 'precision-cnc-machined-castings-custom-oem-housings':{
  heading:'Control the assembly interfaces',focus:'Define sealing faces, bearing fits and tapped mounting points in relation to casting datums and final wall geometry.',
  inputs:'Send the casting specification, sealing-face requirements, fit limits, thread callouts and required inspection records.',
  href:'/capabilities/casting-machining/#engineering-fit',label:'Review sealing faces, fits and mounting holes',
 },
};
