import manifest from './responsiveImages.generated.json';
import originalUpgrades from './siteOriginals.generated.json';
type DisplayImage={src:string;srcset:string;width:number;height:number;mobile?:{srcset:string;width:number;height:number}};
const displayImages:Record<string,DisplayImage>={...manifest,...originalUpgrades};
export const responsiveImage=(src:string):DisplayImage|undefined=>displayImages[src]||Object.values(displayImages).find(image=>image.src===src);
