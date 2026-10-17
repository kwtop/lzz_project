// Display assets only. catalog.json and original source photographs stay intact.
import {photo} from './evidence';
export const cadVisualizations = new Set([
 'custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier',
 'custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier',
 'custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier',
]);
export const retouchedProducts: Record<string, string> = {
 'precision-machining-for-functional-plastic-blocks-structural-components': 'catalog-29-cutout-v1',
 'precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances': 'catalog-26-cutout-v1',
 'precision-cnc-machined-castings-custom-oem-housings': 'catalog-24-cutout-v1',
 'custom-oem-cnc-machined-non-metallic-components-insulating-parts': 'catalog-20-cutout-v1',
 'custom-cnc-machined-castings-transmission-housings-pump-bodies': 'catalog-18-cutout-v1',
 'custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier': 'catalog-12-cutout-v1',
 'high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem': 'catalog-11-cutout-v1',
 'custom-high-precision-machining-for-structural-aesthetic-components-oem': 'catalog-09-cutout-v1',
 'global-manufacturer-of-multi-sided-precision-machined-components': 'catalog-04-cutout-v1',
 'ultra-high-precision-machining-services': 'catalog-02-cutout-v1',
 'custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm': 'catalog-00-cutout-v1',
 'global-oem-precision-machining-solutions': 'catalog-03-cutout-v1',
 'oem-precision-cnc-machined-casting-housing-structural-enclosures': 'catalog-22-cutout-v1',
 'oem-precision-cnc-machined-casting-housings': 'catalog-23-cutout-v1',
 'precision-cnc-machined-castings-manufacturer': 'catalog-25-cutout-v1',
 'custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier': 'catalog-16-cutout-v1',
 'custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier': 'catalog-17-cutout-v1',
 'custom-cnc-turned-stainless-steel-components-manufacturer-and-precision-shaft-supplier': 'catalog-19-cutout-v1',
 'custom-oem-cnc-machined-plastic-parts-manufacturer': 'catalog-21-cutout-v1',
 'precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier': 'catalog-28-cutout-v1',
 'precision-small-batch-cnc-milling-manufacturer-for-complex-aluminum-enclosures': 'catalog-30-cutout-v1',
 'small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv': 'catalog-34-cutout-v1',
 'custom-oem-high-precision-cnc-milling-manufacturer': 'catalog-01-cutout-v1',
 'custom-oem-cnc-turning-manufacturer': 'catalog-05-cutout-v1',
 'custom-rotary-cylindrical-components': 'catalog-06-cutout-v1',
 'custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer': 'catalog-07-cutout-v1',
 'full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing': 'catalog-08-cutout-v1',
 'high-volume-cnc-turning-for-complex-internal-external-features': 'catalog-10-cutout-v1',
 'custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier': 'catalog-14-cutout-v1',
 'custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier': 'catalog-15-cutout-v1',
 'precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier': 'catalog-32-cutout-v1',
 'precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier': 'catalog-31-cutout-v1',
 'custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier': 'catalog-13-cutout-v1',
 'small-batch-cnc-machining-manufacturer-complex-aluminum-housings': 'catalog-33-cutout-v1',
 'precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier': 'catalog-27-cutout-v1',
};
export const refinedSrcset = (name: string) => `/media/${name}-480.webp 480w, /media/${name}-800.webp 800w, /media/${name}.webp 1200w`;
export const productImage = (product: {slug: string; images: string[]}) => retouchedProducts[product.slug] ? `/media/${retouchedProducts[product.slug]}.webp` : product.images[0];
export const productSrcset = (product: {slug: string}) => retouchedProducts[product.slug] ? refinedSrcset(retouchedProducts[product.slug]) : undefined;
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
 'prototype-vs-small-batch-cnc': {image:'/media/editorial/prototype-batch-comparison-illustrative-v1-1536.webp',srcset:[480,800,1200,1536].map(width=>`/media/editorial/prototype-batch-comparison-illustrative-v1-${width}.webp ${width}w`).join(', '),alt:'AI-generated illustrative comparison of one prototype component and several visually matching parts',caption:'Prototype and batch planning',disclosure:'It is not an LZZ order, delivered quantity or production record.'},
 'custom-cnc-parts-shipping-checklist': {image:photo('shipping-example').src,srcset:photo('shipping-example').srcset,alt:photo('shipping-example').alt,caption:photo('shipping-example').caption},
};
