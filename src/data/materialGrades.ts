// Corrected examples from the supplied common-materials sheet. These are
// discussion starting points, not an inventory or suitability claim.
export const materialGrades:Record<string,{families:{name:string;grades:string[]}[];note:string}>={
 'aluminum-cnc-parts':{families:[{name:'Aluminum alloys',grades:['6061','6061-T6','6063','6063-T5','7075','7075-T6','2024','5083']}],note:'Specify the alloy and temper on the drawing. We confirm availability and suitability for the part and finish in the quotation.'},
 'stainless-steel-cnc-parts':{families:[{name:'Stainless steel',grades:['SUS303','SUS304','SUS316','SUS316L','SUS430','SUS440']}],note:'Specify the exact grade and condition. Review corrosion resistance and strength for the intended use, then confirm the finish and required documents.'},
 'copper-brass-cnc-parts':{families:[{name:'Copper',grades:['C11000','C10200','C12000']},{name:'Brass',grades:['C26000','C36000']}],note:'Specify the exact copper or brass grade. Include electrical and thermal requirements where relevant, and define the surfaces and fits the part needs.'},
 'plastic-machined-parts':{families:[{name:'Engineering plastics',grades:['PEEK','PTFE','Polyimide','Nylon','PA6','PA66','POM (acetal/Delrin)','HDPE','UHMW','Acrylic','PC','ABS','PVC','PP']}],note:'Specify the polymer grade and stock condition. POM is also called acetal; specify a Delrin branded grade if required. Availability and suitability need confirmation for your part.'},
};
