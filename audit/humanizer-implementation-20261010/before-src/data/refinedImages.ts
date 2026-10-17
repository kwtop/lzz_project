// Display assets only. catalog.json and original source photographs stay intact.
import {photo} from './evidence';
import {responsiveImage} from './responsiveImages';
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
 'rfq-checklist': {image:'/media/rfq-planning-ai-v2.webp',srcset:refinedSrcset('rfq-planning-ai-v2'),alt:'Illustrative machined housing beside a drawing and caliper',caption:'Drawing preparation',disclosure:'Not an LZZ order, inspection or measurement record.'},
 'how-we-work': {image:photo('shipping-example').src,srcset:photo('shipping-example').srcset,alt:photo('shipping-example').alt,caption:photo('shipping-example').caption},
 'material-and-finish-checklist': {image:'/media/editorial/material-family-editorial-illustrative-v1-1536.webp',srcset:[480,800,1200,1536].map(width=>`/media/editorial/material-family-editorial-illustrative-v1-${width}.webp ${width}w`).join(', '),alt:'AI-generated illustrative arrangement of generic machined components in varied appearances',caption:'Illustrative component forms',disclosure:'It does not identify alloy grades, stock availability or finish specifications.'},
 'custom-cnc-machined-components-for-prototypes-and-production': {image:'/media/catalog-30-cutout-v1.webp',srcset:refinedSrcset('catalog-30-cutout-v1'),alt:'Batch of machined aluminum enclosures',caption:'Repeat-order components'},
 'cnc-process-selection': {image:photo('milling-enclosure-operation').src,srcset:photo('milling-enclosure-operation').srcset,alt:photo('milling-enclosure-operation').alt,caption:'Original CNC milling process photograph'},
  'prototype-vs-small-batch-cnc': {image:'/media/editorial/prototype-batch-editorial-r3-1536.webp',srcset:[480,800,1200,1536].map(width=>`/media/editorial/prototype-batch-editorial-r3-${width}.webp ${width}w`).join(', '),alt:'AI-generated illustration of one machined enclosure prototype beside four matching repeat-batch parts',caption:'Prototype and batch planning',disclosure:'It is not an LZZ order, delivered quantity or production record.'},
 'custom-cnc-parts-shipping-checklist': {image:photo('shipping-example').src,srcset:photo('shipping-example').srcset,alt:photo('shipping-example').alt,caption:photo('shipping-example').caption},
};
