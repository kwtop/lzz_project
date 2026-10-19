import previews from './cataloguePreviews.generated.json';
import {productPhotograph} from './productPhotography';
/** A legible selection in the catalogue; detail pages keep the full source set. */
export const cataloguePreview=(slug:string)=>productPhotograph(slug)||(previews as Record<string,{src:string;srcset:string;width:number;height:number;alt:string;origin:string;previewNote:string}>)[slug]||{};
