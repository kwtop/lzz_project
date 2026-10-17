import {productManufacturing} from './manufacturing';
// Presentation-only material discovery. Never rewrite imported category data.
// Name matches identify the listing subject, not the alloy of a photographed part.
type TaggedProduct = {slug:string; name:string; categories:string[]};
const additionalMaterials:Record<string,string[]> = {
 'custom-billet-intake-manifold-manufacturer-and-automotive-performance-prototype-supplier':['Aluminum-CNC-Parts'],
 'custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier':['Aluminum-CNC-Parts'],
};
export function productTags(product:TaggedProduct):string[] {
 const materials = /\baluminum\b/i.test(product.name) ? ['Aluminum-CNC-Parts'] : [];
 return [...new Set([...product.categories,...materials,...(additionalMaterials[product.slug]||[]),...(productManufacturing(product)?.tags||[])])];
}
export function matchesCapability(product:TaggedProduct,key:string):boolean {
 return productTags(product).includes(key);
}
const materialKeys=['Aluminum-CNC-Parts','Stainless-Steel-CNC-Parts','Copper-Brass-CNC-Parts','Plastic-Machined-Parts'];
export function materialSubjects(product:TaggedProduct):string[] {
 if(product.slug==='small-batch-cnc-machining-manufacturer-precision-aluminum-components-hmlv') return [];
 return [...new Set([...product.categories.filter(key=>materialKeys.includes(key)),...(/\baluminum\b/i.test(product.name)?['Aluminum-CNC-Parts']:[]),...(additionalMaterials[product.slug]||[])])];
}
export function matchesPartCategory(product:TaggedProduct,key:string):boolean {
 return materialKeys.includes(key)?materialSubjects(product).includes(key):matchesCapability(product,key);
}
export function relatedParts<T extends TaggedProduct>(product:T,products:T[]):T[] {
 const subjects=materialSubjects(product),tags=productTags(product);
 return products.filter(p=>p.slug!==product.slug).map(p=>({product:p,score:
  (p.categories[0]===product.categories[0]?20:0)+materialSubjects(p).filter(key=>subjects.includes(key)).length*12+
  productTags(p).filter(key=>tags.includes(key)&&!materialKeys.includes(key)).reduce((score,key)=>score+(['Prototype-Machining','Low-Volume-Production'].includes(key)?1:3),0)
 })).filter(p=>p.score>0).sort((a,b)=>b.score-a.score).slice(0,3).map(p=>p.product);
}
