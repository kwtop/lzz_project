/** Approved plan rollout. Samples are reviewed before each family is enabled. */
const samples = new Set([
 '/', '/machined-parts/', '/machined-parts/gallery/', '/machined-parts/machining-examples/',
 '/machined-parts/gallery/precision-machining-for-functional-plastic-blocks-structural-components/',
 '/machined-parts/machining-examples/two-stage-cnc-milling/',
 '/capabilities/', '/capabilities/cnc-milling-service/', '/capabilities/aluminum-cnc-parts/',
 '/capabilities/prototype-machining/', '/capabilities/starting-with-a-sample/', '/factory/',
 '/about/', '/about/company-profile/', '/about/how-we-work/', '/about/contact/', '/about/company-news/',
 '/about/company-news/australian-customer-workshop-visit-january-2025/',
 '/resources/', '/resources/ordering/', '/resources/technical-guides/',
 '/resources/ordering/rfq-checklist/', '/resources/faq/',
 '/resources/ordering/compare-cnc-machining-quotations/',
 '/quote/', '/privacy/', '/404.html', '/404/', '/404',
]);
const approvedFamilies: string[] = ['/about/', '/resources/', '/machined-parts/', '/capabilities/'];
export const isRedesigned = (pathname: string) => samples.has(pathname) || approvedFamilies.some(prefix => pathname.startsWith(prefix));

/** Editorial layout verified on 25 representatives at 1440px and 390px before rollout. */
export const usesEditorialLayout = (pathname: string) => isRedesigned(pathname);
