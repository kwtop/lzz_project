import records from './evidence.generated.json';

export interface EvidencePhoto {id:string;src:string;srcset:string;width:number;height:number;caption:string;alt:string;source:string;sha256:string;kind:'original-photo';uses:string[];proofScope:string}
export const evidence=records as Record<string,EvidencePhoto>;
export const photo=(id:string):EvidencePhoto=>{
 const item=evidence[id];
 if(!item)throw new Error(`Unknown evidence photo: ${id}`);
 return item;
};
