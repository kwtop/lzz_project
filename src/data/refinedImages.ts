// Display assets only. catalog.json and original source photographs stay intact.
import {photo} from './evidence';
import {responsiveImage} from './responsiveImages';
import {infoVisuals} from './infoVisuals';
export const cadVisualizations = new Set([
 'custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier',
 'custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier',
 'custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier',
]);
export {retouchedProducts,productImage,productSrcset} from './productImages';
export const refinedSrcset = (name: string) => responsiveImage(`/media/${name}.webp`)?.srcset || `/media/${name}-480.webp 480w, /media/${name}-800.webp 800w, /media/${name}.webp 1200w`;
export const materialHeroes: Record<string, {image: string; alt: string; caption: string; srcset?: string}> = {
 'aluminum-cnc-parts': {image:photo('display-housing-machining').src,srcset:photo('display-housing-machining').srcset,alt:photo('display-housing-machining').alt,caption:photo('display-housing-machining').caption},
 'stainless-steel-cnc-parts': {image:'/media/stainless-detail-v3.webp',alt:'Metal turned component showing a stepped shoulder and circular bore',caption:'Turned component detail'},
 'copper-brass-cnc-parts': {image:'/media/brass-threaded-plugs-retouched-v1-1536.webp',srcset:'/media/brass-threaded-plugs-retouched-v1-480.webp 480w, /media/brass-threaded-plugs-retouched-v1-800.webp 800w, /media/brass-threaded-plugs-retouched-v1-1200.webp 1200w, /media/brass-threaded-plugs-retouched-v1-1536.webp 1536w',alt:'Short hex-head threaded metal plugs',caption:'Threaded plug detail'},
 'plastic-machined-parts': {image:'/media/polymer-shafts-retouched-v1-1536.webp',srcset:'/media/polymer-shafts-retouched-v1-480.webp 480w, /media/polymer-shafts-retouched-v1-800.webp 800w, /media/polymer-shafts-retouched-v1-1200.webp 1200w, /media/polymer-shafts-retouched-v1-1536.webp 1536w',alt:'White cylindrical machined polymer components',caption:'Machined polymer components'},
};
export const guideImages: Record<string, {image: string; alt: string; caption: string; srcset?: string; disclosure?: string}> = {
 'custom-cnc-machined-components-for-prototypes-and-production': {...infoVisuals.partFeatures,caption:'Milled features and drawing requirements'},
 'rfq-checklist': {image:'/media/gallery/rfq-gallery-v1-1440.webp',srcset:[480,800,1200,1440].map(width=>`/media/gallery/rfq-gallery-v1-${width}.webp ${width}w`).join(', '),alt:'Machined housing beside outline drawings',caption:''},
 'how-we-work': {image:photo('shipping-example').src,srcset:photo('shipping-example').srcset,alt:photo('shipping-example').alt,caption:photo('shipping-example').caption},
 'material-and-finish-checklist': {...infoVisuals.materialForms,caption:'Material and component forms'},
 'cnc-process-selection': {image:photo('milling-enclosure-operation').src,srcset:photo('milling-enclosure-operation').srcset,alt:photo('milling-enclosure-operation').alt,caption:'Original CNC milling process photograph'},
  'prototype-vs-small-batch-cnc': {image:'/media/gallery/prototype-gallery-v1-1440.webp',srcset:[480,800,1200,1440].map(width=>`/media/gallery/prototype-gallery-v1-${width}.webp ${width}w`).join(', '),alt:'Single housing beside four matching parts',caption:''},
 'custom-cnc-parts-shipping-checklist': {image:photo('shipping-example').src,srcset:photo('shipping-example').srcset,alt:photo('shipping-example').alt,caption:photo('shipping-example').caption},
};
