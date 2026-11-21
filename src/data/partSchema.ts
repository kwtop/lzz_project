// Mark up pages that describe a machining service. Quote-only part references
// use the WebPage and BreadcrumbList supplied by the shared layout.
const serviceSubjects=new Set([
 'ultra-high-precision-machining-services',
 'global-oem-precision-machining-solutions',
 'global-manufacturer-of-multi-sided-precision-machined-components',
 'custom-oem-cnc-turning-manufacturer',
 'custom-rotary-cylindrical-components',
 'custom-oem-cnc-turned-fittings-connectors-and-flanges-manufacturer',
 'full-service-cnc-milling-solutions-custom-metal-parts-manufacturer-with-finishing',
 'custom-high-precision-machining-for-structural-aesthetic-components-oem',
 'high-volume-cnc-turning-for-complex-internal-external-features',
 'high-reliability-precision-machining-turbine-fluid-complex-curve-component-oem',
 'custom-oem-cnc-machined-plastic-parts-manufacturer',
 'precision-cnc-machining-for-complex-plastic-geometries-and-tight-tolerances',
 'precision-cnc-turned-brass-components-manufacturer-and-copper-parts-supplier',
 'precision-low-volume-cnc-machining-manufacturer-and-hmlv-components-supplier',
 'precision-stainless-steel-cnc-turned-parts-manufacturer-and-316l-components-supplier',
 'small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv',
]);
export const describesMachiningService = (slug: string): boolean => serviceSubjects.has(slug);
