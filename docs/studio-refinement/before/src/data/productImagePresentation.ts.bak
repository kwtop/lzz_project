// Display-only presentation overrides for catalog imagery.
// Catalog records and original source photographs remain unchanged.
import {retouchedProducts} from './refinedImages';
const scales: Record<string, number> = {
 'custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm': 1.5,
 'custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier': 1.12,
 'custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier': 1.25,
 'custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier': 1.5,
 'custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier': 1.12,
 'custom-cnc-machined-castings-transmission-housings-pump-bodies': 1.25,
 'oem-precision-cnc-machined-casting-housing-structural-enclosures': 1.3,
 'oem-precision-cnc-machined-casting-housings': 1.1,
 'precision-cnc-machined-castings-custom-oem-housings': 1.2,
 'precision-cnc-machined-castings-manufacturer': 1.15,
 'precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances': 1.2,
 'precision-machining-for-functional-plastic-blocks-structural-components': 1.15,
};
export const productImageScale = (slug: string) => retouchedProducts[slug] ? 1 : scales[slug] ?? 1;
