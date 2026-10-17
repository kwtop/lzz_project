const visual=(name:string,alt:string)=>({
 image:'/media/info/'+name+'-1200.webp',
 srcset:[320,480,800,1200,1440].map(width=>'/media/info/'+name+'-'+width+'.webp '+width+'w').join(', '),
 alt,
});
export const infoVisuals={
 partFeatures:visual('part-features-v1','Milled components with flat faces, hole patterns and pockets'),
 materialForms:visual('material-forms-v1','Aluminum housing, turned shaft, threaded connector and plastic block'),
 inspectionPlanning:visual('inspection-planning-v1','A measuring probe beside the bore of a machined housing'),
};
