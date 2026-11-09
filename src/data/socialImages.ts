import siteImages from './siteImages.generated.json';
import productImages from './productPhotography.generated.json';
import evidenceImages from './evidence.generated.json';
import newsImages from './companyNewsMedia.json';
import {imageDescription} from '../lib/imagePresentation';

type DescribedImage={src:string;alt:string;srcset?:string;files?:{src:string}[]};

// These editorial covers have no entry in the main image registries.
const editorialCovers:DescribedImage[]=[
 {src:'/media/products-editorial-20261014/part-families-1200.webp',alt:'Machined metal housing, stepped shaft, threaded brass fitting and white polymer block'},
 {src:'/media/collection-covers/metal-collection-illustrative-v1-1200.webp',alt:'Pocketed metal components, a flanged shaft, a cylindrical sleeve and threaded brass fittings'},
 {src:'/media/collection-covers/plastic-collection-illustrative-v1-1200.webp',alt:'Transparent circular covers, white bushings, a black polymer gear and two drilled guide strips'},
];

const descriptions=new Map<string,string>();
const images:DescribedImage[]=[
 ...Object.values(siteImages),...Object.values(productImages),...Object.values(evidenceImages),
 ...newsImages.map(image=>({...image,alt:image.caption})),...editorialCovers,
];
for(const image of images){
 const paths=[image.src,...(image.files||[]).map(file=>file.src),
  ...(image.srcset||'').split(',').map(candidate=>candidate.trim().split(/\s+/)[0]).filter(Boolean)];
 for(const src of paths)descriptions.set(src,imageDescription(image.alt));
}

/** Share the image's content description across its responsive exports. */
export function socialImageFor(src='/media/evidence/workshop-wide-1600.webp'){
 const pathname=new URL(src,'https://www.lzz-cnc.com').pathname;
 const alt=descriptions.get(pathname);
 if(!alt?.trim())throw new Error(`Add a content description for social image: ${pathname}`);
 return {src,alt};
}
