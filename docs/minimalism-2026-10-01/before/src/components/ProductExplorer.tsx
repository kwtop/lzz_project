import {useEffect,useId,useMemo,useState} from 'react';
import {productTitle,productCardTitle,productImageAlt} from '../data/presentation';
import {productSummary} from '../data/productSummaries';
import {productImage,productSrcset} from '../data/productImages';
import {productImageScale} from '../data/productImagePresentation';
import {capabilityGroups} from '../data/capabilityGroups';
import {productTags,matchesPartCategory} from '../data/productTags';
import {productManufacturing} from '../data/manufacturing';
import {Search,X} from 'lucide-react';
type Product={slug:string;name:string;categories:string[];images:string[]};
type Category={key:string;name:string;count:number};
const normalize=(value:string)=>value.trim().toLowerCase().replace(/\s+/g,' ');
const filterLabels=['Process','Material','Order type'];
const optionLabels:Record<string,string>={'CNC-Milling-Service':'CNC milling','CNC-Turning-Service':'CNC turning','5-Axis-CNC-Machining':'5-axis machining','Casting-Machining':'Casting machining','Aluminum-CNC-Parts':'Aluminum','Stainless-Steel-CNC-Parts':'Stainless steel','Copper-Brass-CNC-Parts':'Copper & brass','Plastic-Machined-Parts':'Engineering plastics','Prototype-Machining':'Prototype','Low-Volume-Production':'Small batch'};
const featuredSlugs=[
 'ultra-high-precision-machining-services',
 'custom-high-precision-cnc-milling-5-axis-machining-services-oem-odm',
 'precision-stainless-steel-indexing-plunger-manufacturer-and-spring-loaded-locking-pin-supplier',
 'global-oem-precision-machining-solutions',
 'global-manufacturer-of-multi-sided-precision-machined-components',
 'oem-precision-cnc-machined-casting-housings',
 'custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier',
 'custom-cnc-machined-electronic-throttle-body-manufacturer-and-automotive-prototype-supplier',
 'custom-automotive-performance-parts-manufacturer-and-aluminum-intercooler-prototype-supplier'
];
export default function ProductExplorer({products,categories,initialCategory='',previewLimit}:{products:Product[];categories:Category[];initialCategory?:string;previewLimit?:number}){
 const facetsId=useId();
 const [compact,setCompact]=useState(false);
 useEffect(()=>{
  const media=matchMedia('(max-width:760px)');
  const sync=()=>setCompact(media.matches);
  sync();media.addEventListener('change',sync);
  return ()=>media.removeEventListener('change',sync);
 },[]);
 const [query,setQuery]=useState('');
 const defaults=capabilityGroups.map(group=>group.keys.includes(initialCategory)?initialCategory:'');
 const [filters,setFilters]=useState(defaults);
 const [showAll,setShowAll]=useState(false);
 const [filtersOpen,setFiltersOpen]=useState(false);
 const indexed=useMemo(()=>products.map(product=>({
  ...product,title:productCardTitle(product),
  search:normalize([product.name,productTitle(product),...productTags(product).map(c=>c.replaceAll('-',' ')),...Object.values(productSummary(product)),...Object.values(productManufacturing(product)||{})].join(' '))
 })),[products]);
 const search=normalize(query);
 const filtered=indexed.filter(product=>filters.every(key=>!key||matchesPartCategory(product,key))&&product.search.includes(search));
 const canFeature=products.length>12&&!initialCategory;
 const isFeatured=canFeature&&!showAll&&!search&&!filters.some(Boolean);
 const isScoped=Boolean(initialCategory);
 const reset=()=>{setQuery('');setFilters(defaults);setShowAll(true);};
 const isPreview=Boolean(previewLimit)&&!showAll&&!search&&filters.every((value,i)=>value===defaults[i]);
 const visible=isPreview?filtered.slice(0,previewLimit):isFeatured?featuredSlugs.slice(0,compact?6:featuredSlugs.length).flatMap(slug=>indexed.filter(p=>p.slug===slug)):filtered;
 return <div className="explorer">
  <div className={'filter-row'+(isScoped?' scoped-filters':'')}>
   <label className="search"><Search size={19}/><span className="sr-only">Search parts</span><input value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search parts, materials, processes…"/>{query&&<button type="button" aria-label="Clear search" onClick={()=>setQuery('')}><X size={18}/></button>}</label>
   {isScoped&&<a className="text-link" href="/products/">Browse all custom parts</a>}
  </div>
  <button type="button" className="filter-disclosure" aria-controls={facetsId} aria-expanded={filtersOpen} onClick={()=>setFiltersOpen(!filtersOpen)}>Filters{filters.some(Boolean)?` · ${filters.filter(Boolean).length} active`:""}<span aria-hidden="true">{filtersOpen?"−":"+"}</span></button>
  <div id={facetsId} className={"catalog-facets"+(filtersOpen?" is-open":"")} role="group" aria-label="Combine part filters">
   {capabilityGroups.map((group,index)=>!group.keys.includes(initialCategory)&&<label className="category-select" key={group.label}><span>{filterLabels[index]}</span><select aria-label={filterLabels[index]} value={filters[index]} onChange={event=>{setFilters(previous=>previous.map((value,i)=>i===index?event.target.value:value));setShowAll(true);}}><option value="">{['All processes','All materials','Any order type'][index]}</option>{categories.filter(c=>group.keys.includes(c.key)).map(c=><option key={c.key} value={c.key}>{optionLabels[c.key]||c.name}</option>)}</select></label>)}
  </div>
  <div className="results-meta" aria-live="polite"><span>{isPreview?`${visible.length} shown · ${filtered.length} matching parts`:isFeatured?`${visible.length} featured examples · ${products.length} total`:`${filtered.length} ${filtered.length===1?'part':'parts'} found`}</span><div className="catalog-actions">{(search||filters.some((value,i)=>value!==defaults[i]))&&<button type="button" className="catalog-view-toggle" onClick={reset}>Clear filters</button>}{canFeature&&<button type="button" className="catalog-view-toggle" onClick={()=>{setShowAll(isFeatured);if(!isFeatured){setQuery('');setFilters(defaults);}}}>{isFeatured?`View all ${products.length} parts`:'Show featured examples'}</button>}</div></div>
  <div className="product-grid" data-count={visible.length}>{visible.map(product=><a className="product-card" key={product.slug} href={'/products/'+product.slug+'/'}>
  <div className="product-image"><img src={productImage(product)} srcSet={productSrcset(product)} sizes="(max-width:760px) calc((100vw - 52px)/2), (max-width:960px) 42vw, 400px" alt={productImageAlt(product)} width="800" height="800" loading="lazy" style={{transform:`scale(${productImageScale(product.slug)})`}}/></div>
   <h3>{product.title}</h3>
   <p className="product-card-context">{productSummary(product).card}</p>
  </a>)}</div>
  {!filtered.length&&<div className="empty-state"><h3>No matching parts</h3><p>{isScoped?'Try another search within this capability, or browse the complete catalog.':'Try a different material or process, or contact us about a part made to your drawing.'}</p><button className="button" onClick={reset}>Reset filters</button></div>}
  {isFeatured&&<div className="catalog-more"><button className="text-link" type="button" onClick={()=>setShowAll(true)}>View all {products.length} parts</button></div>}
  {isPreview&&filtered.length>visible.length&&<div className="catalog-more"><button className="button secondary" type="button" onClick={()=>setShowAll(true)}>View all {filtered.length} part examples</button></div>}
  <noscript><p>Search and view controls require JavaScript. All parts are available below.</p><details><summary>Browse all {products.length} parts</summary><ul>{indexed.map(p=><li key={p.slug}><a href={'/products/'+p.slug+'/'}>{p.title}</a></li>)}</ul></details></noscript>
 </div>;
}
