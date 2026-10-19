/** Generic educational images. Never use these as part, factory or inspection evidence. */
import {refreshedImage} from './imageRefresh';
type Concept={stem:string;width:number;height:number;alt:string;caption:string;origin:string};
const base='/media/penta-rollout-20261017/';
const concept=(id:string,alt:string,caption:string):Concept=>{if(id==='drawing-review')return {stem:'/media/four-stage-rebuild-20261017/drawing-inputs',width:1448,height:1086,alt:'Generic machined housing beside schematic drawing views and a pencil',caption:'Drawing inputs · geometry and revision illustration.',origin:'image-reference'};const image=refreshedImage(base+id+'-1440.webp');return {stem:image?image.src.replace(/-\d+\.webp$/,''):base+id,width:image?.width||1536,height:image?.height||1024,alt,caption,origin:'image-reference'};};
export const pentaConcepts={
 'drawing-review':concept('drawing-review','a simple aluminum block beside schematic drawing and model views','Drawing review · dimensions, datums and revision.'),
 'sample-inputs':concept('sample-inputs','a simple sample, idle caliper and sketch sheet for defining a new drawing','Sample, sketch and measurement inputs.'),
 'revision-review':concept('revision-review','a generic machined form beside blank revision sheets and unprinted identification tabs','Revision and part identification.'),
 'acceptance-plan':concept('acceptance-plan','blank acceptance-planning sheets with a simple sample and unmarked gauge blocks','Acceptance planning · records and measurement requirements.'),
 'material-finishes':concept('material-finishes','unmarked metal and polymer stock with different natural surface textures','Material and finish · confirm the grade and final condition.'),
 'separated-packing':concept('separated-packing','generic metal forms separated in protective foam recesses in an unmarked carton','Separated parts and protective packing.'),
 'protected-interfaces':concept('protected-interfaces','a generic machined block and turned fitting with soft separation and plain end caps','Surface protection · agree packing for the actual part.'),
 'steel-datums':concept('steel-datums','a generic turned shaft with shoulders and a locating face','Turned features · shoulders and locating faces.'),
 'brass-interface':concept('brass-interface','simple brass and copper connection forms with threads and flat contact faces','Connection features · grade, threads and acceptance follow the drawing.'),
 'port-review':concept('port-review','a simple rectangular block with visible ports on two faces for drawing review','Port layout · specify hole positions and connections on the drawing.'),
} satisfies Record<string,Concept>;
export type PentaConceptId=keyof typeof pentaConcepts;
/** Keep documentary inputs intact and choose only a relevant generic replacement. */
export function pentaConceptFor(stem:string|undefined,pathname:string):Concept|undefined{
 if(!stem)return;
 if(stem.endsWith('/sample-definition'))return pentaConcepts['sample-inputs'];
 if(stem.endsWith('/definition'))return pentaConcepts[pathname.includes('cnc-process-selection')?'sample-inputs':'drawing-review'];
 if(stem.endsWith('/order-records'))return pentaConcepts[/prototype-approval|material-and-finish|starting-with-a-sample/.test(pathname)?'acceptance-plan':'revision-review'];
 if(stem.endsWith('/material-samples'))return pentaConcepts['material-finishes'];
 if(stem.endsWith('/packing-concept'))return pentaConcepts[/shipping-checklist|prototype-vs-small-batch/.test(pathname)?'protected-interfaces':'separated-packing'];
 if(/turning-geometry|turned-features/.test(stem)){
  if(pathname.includes('stainless-steel'))return pentaConcepts['steel-datums'];
  if(pathname.includes('copper-brass'))return pentaConcepts['brass-interface'];
 }
}
