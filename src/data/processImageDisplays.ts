import aliases from './processImageDisplays.generated.json';
import {siteImage,type SiteImageId} from './siteImages';

/** Presentation overrides only. evidence.ts and source files remain documentary originals. */
export function processDisplay(src:string|undefined) {
 const mapping=src?(aliases as Record<string,{imageId:string;sourceId:string;sourceHref:string}>)[src]:undefined;
 if(!mapping)return undefined;
 return {...siteImage(mapping.imageId as SiteImageId),sourceHref:mapping.sourceHref,sourceId:mapping.sourceId};
}
