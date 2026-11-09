import type {InteriorImage} from '../data/pentaInteriors';

/** Cover images need enough pixels for the frame height as well as its width. */
export function heroImageSizes(image:InteriorImage,mobileHeight=760,portraitTablet=false) {
 const ratio=(image.width/image.height).toFixed(4);
 const mobile=image.mobile||image;
 const mobileRatio=(mobile.width/mobile.height).toFixed(4);
 const cover=(height:number,aspect:string)=>`max(100vw, calc(min(${height}px, 100svh) * ${aspect}))`;
 return `(max-width:767px) ${cover(mobileHeight,mobileRatio)}, ${portraitTablet?'(max-width:1099px) and (orientation:portrait) '+cover(800,mobileRatio)+', ':''}${cover(800,ratio)}`;
}
