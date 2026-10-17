import manifest from './responsiveImages.generated.json';
type DisplayImage={src:string;srcset:string;width:number;height:number;mobile?:{srcset:string;width:number;height:number}};
export const responsiveImage=(src:string):DisplayImage|undefined=>(manifest as Record<string,DisplayImage>)[src]||Object.values(manifest).find(image=>image.src===src);
