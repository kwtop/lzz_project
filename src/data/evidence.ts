import records from './evidence.generated.json';
import additional from './additionalMedia.generated.json';
import {responsiveImage} from './responsiveImages';

export interface EvidencePhoto {id:string;src:string;srcset:string;width:number;height:number;caption:string;alt:string;source:string;sha256:string;kind:'original-photo';uses:string[];proofScope:string}
const additions=Object.fromEntries(Object.values(additional.photos).filter(item=>item.kind==='original-photo').map(item=>[item.id,{...item,kind:'original-photo' as const,alt:item.caption,uses:['workshop-collection'],proofScope:'Visible part geometry; material labels follow the source collection.'}]));
// Keep source paths, dates and hashes in the registries. Public captions describe
// what is pictured without treating an archive date as a capture date.
const captions:Record<string,string>={
 'workshop-wide':'LZZ machining workshop.',
 'cmm-room':'Coordinate measuring machine in an archived LZZ workshop photograph.',
 'cmm-detail':'A closer view of the coordinate measuring machine.',
 'workshop-operators-2025':'Operators on the LZZ workshop floor.',
 'trade-event':'An LZZ team member at a trade event in Hangzhou.',
 'team-2024-outdoor':'The LZZ team during an outdoor outing.',
 'team-activity-2024':'A group photograph from an LZZ team outing.',
 'team-2024-shared-meal':'The LZZ team sharing a meal.',
 'team-2024-riverside-group':'A team group photograph beside the water.',
 'team-gathering':'LZZ colleagues gathered for a team outing.',
 'team-2025-evening-group':'An evening group photograph from a team outing.',
 'team-2025-team-outing':'Colleagues together during a team outing.',
 'shipment-2022-order-packing':'Protected parts prepared for packing in an archived LZZ shipment photograph.',
 'shipping-example':'Shipment preparation at LZZ. Packing is selected for each order.',
 'shipment-2022-prepared-load':'A prepared shipment from the LZZ delivery archive.',
 'visitor-machining-tour':'A visitor touring the LZZ machining workshop.',
 'workshop-visit':'A group photograph during a workshop visit.',
 'visitor-part-discussion':'A machined part being discussed during a workshop visit.',
 'display-housing-panel':'A machined display housing panel.',
 'display-housing-machining':'The display housing panel at the CNC machine.',
 'team-2025-november-meal':'The LZZ team sharing a meal outdoors.',
 'team-2025-november-group':'An LZZ team group photograph.',
 'workshop-floor':'The LZZ workshop floor.',
 'workshop-aisle':'An aisle through the LZZ production floor.',
 'aluminum-housings':'Machined aluminum housings.',
 'brass-plugs':'Threaded plugs from the brass-parts collection.',
 'five-axis-machine-wide':'A wider view of the five-axis machining setup.',
 'five-axis-operation':'Five-axis machining in progress.',
 'five-axis-parts':'Parts from the five-axis machining sequence.',
 'turning-operation':'CNC turning in progress.',
 'turning-parts':'Parts from the CNC turning sequence.',
 'turn-mill-operation':'Milling a part after turning.',
 'turn-mill-parts':'Parts after turning and milling.',
 'milling-enclosure-operation':'CNC milling of an enclosure.',
 'milling-enclosure-parts':'Machined enclosures from the milling sequence.',
 'multi-feature-milling-parts':'Parts with several milled features.',
 'multi-feature-milling-operation':'Milling the features of a component.',
 'two-stage-first':'First workshop view from the two-operation milling record.',
 'two-stage-second':'Second workshop view from the same two-operation milling record.',
 'plastic-ptfe-batch':'Small white parts with holes, identified as PTFE in the collection.',
 'plastic-ptfe-intermediate':'Intermediate forms arranged on a work surface, identified as semi-finished PTFE parts.',
 'plastic-ptfe-shafts':'Long stepped parts, identified as PTFE in the collection.',
 'metal-brass-batch':'Small fittings grouped in a batch, identified as brass in the collection.',
 'finish-coated-round':'Dark circular parts on a rack. The collection identifies the coating as Teflon.',
 'finish-coated-bars':'Long dark coated parts with repeated holes.',
 'covered-wheels':'Covered wheels with exposed metal hubs.',
};
export const evidence:Record<string,EvidencePhoto>=Object.fromEntries(
 Object.entries({...records as Record<string,EvidencePhoto>,...additions}).map(([id,item])=>[id,captions[id]?{...item,caption:captions[id],alt:captions[id]}:item])
);
export const photo=(id:string):EvidencePhoto=>{
 const item=evidence[id];
 if(!item)throw new Error(`Unknown evidence photo: ${id}`);
 const display=responsiveImage(item.src);
 return display?{...item,srcset:display.srcset,width:display.width,height:display.height}:item;
};
