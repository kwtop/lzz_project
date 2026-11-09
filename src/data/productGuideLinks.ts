type Reference={phrase:string;slug:string};
const references:Record<string,Reference>={
 P00:{phrase:'bore center and mounting face',slug:'datums-and-hole-position-on-circular-machined-parts'},
 P02:{phrase:'complete blade model',slug:'preparing-an-impeller-model-for-5-axis-machining'},
 P07:{phrase:'thread standard and engagement',slug:'choosing-thread-and-seal-requirements-for-machined-fittings'},
 P08:{phrase:'Masking and final dimensions',slug:'which-aluminum-features-need-masking-before-anodizing'},
 P16:{phrase:'runner ends and flange bolt patterns',slug:'specifying-a-billet-intake-manifold-for-machining'},
 P18:{phrase:'stock allowance',slug:'what-to-check-before-machining-a-cast-housing'},
 P19:{phrase:'mating fits',slug:'how-to-specify-fits-and-runout-on-turned-parts'},
 P26:{phrase:'straightness or flatness limits',slug:'why-machined-plastic-parts-need-defined-measurement-conditions'},
 P32:{phrase:'movement clearance and travel limits',slug:'what-matters-when-ordering-a-custom-indexing-plunger'},
 P33:{phrase:'wall thicknesses',slug:'designing-aluminum-enclosures-for-cnc-machining'},
};
export function productGuideText(sourceId:string,text:string){
 const reference=references[sourceId];
 if(!reference)return undefined;
 const index=text.indexOf(reference.phrase);
 if(index<0)throw new Error('Product guidance anchor no longer matches '+sourceId);
 return {before:text.slice(0,index),label:reference.phrase,after:text.slice(index+reference.phrase.length),href:'/resources/technical-guides/'+reference.slug+'/'};
}
