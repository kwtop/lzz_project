import records from './evidence.generated.json';
import additional from './additionalMedia.generated.json';
import {responsiveImage} from './responsiveImages';

export interface EvidencePhoto {id:string;src:string;srcset:string;width:number;height:number;caption:string;alt:string;source:string;sha256:string;kind:'original-photo';uses:string[];proofScope:string}
const additions=Object.fromEntries(Object.values(additional.photos).filter(item=>item.kind==='original-photo').map(item=>[item.id,{...item,kind:'original-photo' as const,alt:item.caption,uses:['workshop-collection'],proofScope:'Visible part geometry; material labels follow the source collection.'}]));
export const evidence:Record<string,EvidencePhoto>={...records as Record<string,EvidencePhoto>,...additions};
export const photo=(id:string):EvidencePhoto=>{
 const item=evidence[id];
 if(!item)throw new Error(`Unknown evidence photo: ${id}`);
 const display=responsiveImage(item.src);
 return display?{...item,srcset:display.srcset,width:display.width,height:display.height}:item;
};
