import media from './additionalMedia.generated.json';
// Supplemental reference views, not evidence of an LZZ customer order.
export const productReferences:Record<string,(keyof typeof media.photos)[]>={
 'custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier':['engine-cover-original'],
 'custom-billet-aluminum-intake-manifold-manufacturer-and-automotive-prototype-supplier':['intake-runner-cad'],
 'custom-billet-aluminum-intake-plenum-manufacturer-and-high-performance-tuning-parts-supplier':['plenum-original','plenum-port-detail','plenum-internal-detail'],
 'custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier':['intercooler-original','intercooler-batch-detail'],
};
