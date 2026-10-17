// Compact display metadata for catalog cards. No workshop records enter the client bundle.
import responsiveSizes from './productResponsiveSizes.generated.json';
import studioImages from './productStudioImages.generated.json';
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
const sizes=responsiveSizes as Record<string,{width:number;widths:number[]}>;
export const galleryProductImages:Record<string,string>={
 'precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier':'brass-gallery-v2',
 'custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer':'fittings-gallery-v2',
 'ultra-high-precision-machining-services':'impeller-gallery-v1',
 'oem-precision-cnc-machined-casting-housing-structural-enclosures':'casting-gallery-v1',
 'precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier':'locking-pin-gallery-v1',
 'precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances':'plastic-gallery-v1',
};
export const recomposedProductImages = new Set([
 'precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier',
 'custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer',
]);
const studio=studioImages as Record<string,{src:string;srcset:string}>;
export const productImage=(product:{slug:string;images:string[]})=>{if(studio[product.slug])return studio[product.slug].src;const gallery=galleryProductImages[product.slug];if(gallery)return '/media/gallery/'+gallery+'-1200.webp';const name=retouchedProducts[product.slug];return name&&sizes[name]?'/media/responsive/'+name+'-'+sizes[name].width+'.webp':product.images[0];};
export const productSrcset=(product:{slug:string})=>{if(studio[product.slug])return studio[product.slug].srcset;const gallery=galleryProductImages[product.slug];if(gallery)return [320,480,800,1200].map(width=>'/media/gallery/'+gallery+'-'+width+'.webp '+width+'w').join(', ');const name=retouchedProducts[product.slug];return name&&sizes[name]?sizes[name].widths.map(width=>'/media/responsive/'+name+'-'+width+'.webp '+width+'w').join(', '):undefined;};
