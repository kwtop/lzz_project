import {useId,useMemo,useState} from 'react';
import {productTitle,productCardTitle,productImageAlt} from '../data/presentation';
import {productSummary} from '../data/productSummaries';
import {productImage,productSrcset} from '../data/refinedImages';
import {productImageScale} from '../data/productImagePresentation';
import {capabilityGroups} from '../data/capabilityGroups';
import {productTags} from '../data/productTags';
import {productManufacturing} from '../data/manufacturing';
import {partBrowseGroups,matchesBrowseFilter} from '../data/productBrowse';
import {Search,X} from 'lucide-react';
import '../styles/product-browse.css';
type Product={slug:string;name:string;categories:string[];images:string[]};
type Category={key:string;name:string;count:number};
const normalize=(value:string)=>value.trim().toLowerCase().replace(/\s+/g,' ');
const filterLabels=['Process','Material','Order type'];
const optionLabels:Record<string,string>={'CNC-Milling-Service':'CNC milling','CNC-Turning-Service':'CNC turning','5-Axis-CNC-Machining':'5-axis machining','Casting-Machining':'Machining of castings','Aluminum-CNC-Parts':'Aluminum','Stainless-Steel-CNC-Parts':'Stainless steel','Copper-Brass-CNC-Parts':'Copper & brass','Plastic-Machined-Parts':'Engineering plastics','Prototype-Machining':'Prototype','Low-Volume-Production':'Small batch'};
export default function ProductExplorer({products,categories,initialCategory='',previewLimit,imageSizes='(max-width:760px) calc(100vw - 44px), (max-width:1000px) 44vw, 400px'}:{products:Product[];categories:Category[];initialCategory?:string;previewLimit?:number;imageSizes?:string}){
 const facetsId=useId();
 const defaults=capabilityGroups.map(group=>group.keys.includes(initialCategory)?initialCategory:'');
 const [query,setQuery]=useState('');
 const [filters,setFilters]=useState(defaults);
 const [browseGroup,setBrowseGroup]=useState('');
 const [showAll,setShowAll]=useState(false);
 const [filtersOpen,setFiltersOpen]=useState(false);
 const indexed=useMemo(()=>products.map(product=>({...product,title:productCardTitle(product),search:normalize([product.name,productTitle(product),...productTags(product).map(c=>c.replaceAll('-',' ')),...Object.values(productSummary(product)),...Object.values(productManufacturing(product)||{})].join(' '))})),[products]);
 const search=normalize(query);
 const activeGroup=partBrowseGroups.find(group=>group.key===browseGroup);
 const filtered=indexed.filter(product=>(!activeGroup||activeGroup.slugs.includes(product.slug))&&filters.every(key=>!key||matchesBrowseFilter(product,key))&&product.search.includes(search));
 const isScoped=Boolean(initialCategory);
 const changed=Boolean(search||browseGroup||filters.some((value,i)=>value!==defaults[i]));
 const activeCount=filters.filter((value,i)=>value&&value!==defaults[i]).length+Number(Boolean(browseGroup));
 const reset=()=>{setQuery('');setFilters(defaults);setBrowseGroup('');setShowAll(true);};
 const isPreview=Boolean(previewLimit)&&!showAll&&!changed;
 const visible=isPreview?filtered.slice(0,previewLimit):filtered;
 const exampleLabel=filtered.length===1?'example':'examples';
 return <div className="explorer part-browse">
  <div className={'filter-row'+(isScoped?' scoped-filters':'')}>
   <label className="search"><Search size={19}/><span className="sr-only">Search part examples</span><input value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search by part, material or process"/>{query&&<button type="button" aria-label="Clear search" onClick={()=>setQuery('')}><X size={18}/></button>}</label>
   {isScoped&&<a className="text-link" href="/machined-parts/gallery/">Browse all part examples</a>}
  </div>
  {!isScoped&&<nav className="part-form-index" aria-label="Find a similar part"><button type="button" aria-pressed={!browseGroup} onClick={()=>setBrowseGroup('')}>All examples</button>{partBrowseGroups.map(group=><button key={group.key} type="button" aria-pressed={browseGroup===group.key} onClick={()=>{setBrowseGroup(browseGroup===group.key?'':group.key);setShowAll(true);}}>{group.label}</button>)}<a href="#additional-part-forms">Covered parts & gear forms</a></nav>}
  <button type="button" className="filter-disclosure" aria-controls={facetsId} aria-expanded={filtersOpen} onClick={()=>setFiltersOpen(!filtersOpen)}>Filters{activeCount?` · ${activeCount} active`:''} · {`${filtered.length} ${exampleLabel}`}<span aria-hidden="true">{filtersOpen?'−':'+'}</span></button>
  <div id={facetsId} className={'catalog-facets'+(filtersOpen?' is-open':'')} role="group" aria-label="Combine part filters">
   {capabilityGroups.map((group,index)=>!group.keys.includes(initialCategory)&&<label className="category-select" key={group.label}><span>{filterLabels[index]}</span><select aria-label={filterLabels[index]} value={filters[index]} onChange={event=>{setFilters(previous=>previous.map((value,i)=>i===index?event.target.value:value));setShowAll(true);}}><option value="">{['All processes','All materials','Any order type'][index]}</option>{categories.filter(c=>group.keys.includes(c.key)).map(c=><option key={c.key} value={c.key}>{optionLabels[c.key]||c.name}</option>)}</select></label>)}

  </div>
  <div className="results-meta" aria-live="polite"><span>{isPreview?`${visible.length} shown · ${filtered.length} matching ${exampleLabel}`:`${filtered.length} ${exampleLabel} found`}</span>{changed&&<button type="button" className="catalog-view-toggle" onClick={reset}>Reset filters</button>}</div>
  {changed&&<p className="part-active-filters">{[activeGroup?.label,search?`Search: ${query}`:'',...filters.filter(Boolean).map(key=>optionLabels[key]||key)].filter(Boolean).join(' · ')}</p>}
  <div className="product-grid" data-count={visible.length}>{visible.map(product=><a className="product-card" key={product.slug} href={'/machined-parts/gallery/'+product.slug+'/'}>
   <div className="product-image"><img src={productImage(product)} srcSet={productSrcset(product)} sizes={imageSizes} alt={productImageAlt(product)} width="800" height="800" loading="lazy" style={{transform:`scale(${Math.min(1,productImageScale(product.slug))})`}}/></div>
   <h3>{product.title}</h3>
  </a>)}</div>
  {!filtered.length&&<div className="empty-state"><h3>No matching examples</h3><p>{isScoped?'Try another search within this capability, or browse the complete catalog.':'Change your search or filters, or discuss a custom part made to your drawing.'}</p><button type="button" className="button secondary" onClick={reset}>Reset filters</button><a className="button secondary" href="/quote/">Discuss your drawing</a></div>}
  {isPreview&&filtered.length>visible.length&&<div className="catalog-more"><button className="button secondary" type="button" onClick={()=>setShowAll(true)}>View all {filtered.length} part {exampleLabel}</button></div>}
  <noscript><p>Interactive filters require JavaScript. Browse the complete list of part examples.</p><ul>{indexed.map(p=><li key={p.slug}><a href={'/machined-parts/gallery/'+p.slug+'/'}>{p.title}</a></li>)}</ul></noscript>
 </div>;
}



