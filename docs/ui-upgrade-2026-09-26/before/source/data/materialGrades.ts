// Corrected examples from the supplied common-materials sheet. These are
// discussion starting points, not an inventory or suitability claim.
export const materialGrades:Record<string,{families:{name:string;grades:string[]}[];note:string}>={
 'aluminum-cnc-parts':{families:[{name:'Aluminum alloys',grades:['6061','6061-T6','6063','6063-T5','7075','7075-T6','2024','5083']}],note:'Specify the alloy and temper on the drawing. Availability and suitability for the part and finish are confirmed in the quotation.'},
 'stainless-steel-cnc-parts':{families:[{name:'Stainless steel',grades:['SUS303','SUS304','SUS316','SUS316L','SUS430','SUS440']}],note:'Specify the exact grade and condition. Corrosion, strength, finishing and documentation needs must be reviewed for the intended use.'},
 'copper-brass-cnc-parts':{families:[{name:'Copper',grades:['C11000','C10200','C12000']},{name:'Brass',grades:['C26000','C36000']}],note:'Copper and brass are separate material families. State the required grade and electrical, thermal, surface or fit requirements in your inquiry.'},
 'plastic-machined-parts':{families:[{name:'Engineering plastics',grades:['POM (acetal)','PTFE','PEEK','Nylon','PA6','PA66','ABS','PC','PVC','PP']}],note:'Specify the polymer grade and condition. Acetal and Delrin are not treated as different base polymers here; confirm a branded grade if required.'},
};
