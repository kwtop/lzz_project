import manifest from './imageRefresh.generated.json';
import homeCutouts from './homeCutouts.generated.json';

type RefreshedImage={id:string;src:string;srcset:string;width:number;height:number;nativeWidth:number;origin:string;sourceHref:string;background?:'transparent'};

/** Presentation derivatives only. The source registries remain the evidence record. */
export const refreshedImage=(src:string):RefreshedImage|undefined=>(manifest as Record<string,RefreshedImage>)[src];

/** Original homepage cutout selection, also reused by matching product references. */
export const refreshedHomeImage=(src:string):RefreshedImage|undefined=>(homeCutouts as Record<string,RefreshedImage>)[src];
