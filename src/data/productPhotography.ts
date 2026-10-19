import photographs from './productPhotography.generated.json';
import {imageDescription} from '../lib/imagePresentation';

export type ProductPhotograph={id:string;src:string;srcset:string;width:number;height:number;nativeWidth:number;alt:string;caption:string;origin:string;sourceHref:string;sourceLabel:string;selection:boolean;sourceKind:string;background?:'transparent';quality?:'low-resolution'};

/** Generated presentation, separate from immutable product source records. */
export const productPhotograph=(slug:string):ProductPhotograph|undefined=>{
 const image=(photographs as Record<string,ProductPhotograph>)[slug];
 return image?{...image,alt:imageDescription(image.alt)}:undefined;
};
