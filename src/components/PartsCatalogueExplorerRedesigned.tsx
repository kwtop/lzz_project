import {useEffect,useId,useMemo,useRef,useState} from 'react';
export type CatalogueCard={slug:string;title:string;alt:string;src:string;srcset?:string;width:number;height:number;feature:string;search:string;filters:string[];forms:string[];origin?:string;background?:'transparent';quality?:'low-resolution';material?:{label:string;value:string}};
type ReferenceGallery=Pick<CatalogueCard,'slug'|'title'|'alt'|'src'|'width'|'height'|'feature'|'search'>&{href:string};
type Option={key:string;label:string};
type Facet={label:string;options:Option[]};
const keys=['process','material','order'];
const normalize=(s:string)=>s.trim().toLowerCase().replace(/\s+/g,' ');
const matches=(text:string,query:string)=>normalize(query).split(' ').filter(Boolean).every(word=>normalize(text).includes(word));

export default function PartsCatalogueExplorer({cards,referenceGalleries,forms,facets}:{cards:CatalogueCard[];referenceGalleries:ReferenceGallery[];forms:Option[];facets:Facet[]}){
 const id=useId(),search=useRef<HTMLInputElement>(null),filterToggle=useRef<HTMLButtonElement>(null);
 const [query,setQuery]=useState(''),[form,setForm]=useState(''),[values,setValues]=useState(['','','']);
 const [expanded,setExpanded]=useState(false),[ready,setReady]=useState(false),[notice,setNotice]=useState('');
 useEffect(()=>{
  function restore(){
   const p=new URLSearchParams(location.search),selected=p.get('form')||'',rawQuery=p.get('q')||'';
   const validForm=selected==='reference-galleries'||forms.some(f=>f.key===selected)?selected:'';
   const validValues=facets.map((f,i)=>{const v=p.get(keys[i])||(i===2?p.get('order type'):null);return f.options.some(o=>o.key===v)?v!:'';});
   const invalid=Boolean(selected&&!validForm)||facets.some((_,i)=>Boolean(p.get(keys[i])&&!validValues[i]));
   setForm(validForm);setQuery(rawQuery.slice(0,160));setValues(validValues);setReady(true);
   setNotice(invalid?'A filter in this link is unavailable. The remaining filters still apply.':rawQuery.length>160?'The search was shortened to 160 characters.':'');
  }
  restore();window.addEventListener('popstate',restore);
  return()=>window.removeEventListener('popstate',restore);
 },[forms,facets]);
 const shown=useMemo(()=>cards.filter(card=>(!form||card.forms.includes(form))&&values.every(v=>!v||card.filters.includes(v))&&matches(card.search,query)),[cards,form,values,query]);
 const galleries=referenceGalleries.filter(g=>(!form||form==='reference-galleries')&&!values.some(Boolean)&&matches(g.title+' '+g.search,query));
 const changed=Boolean(form||query||values.some(Boolean)),activeCount=values.filter(Boolean).length;
 function save(q:string,f:string,v:string[],replace=false){
  const u=new URL(location.href);['q','form',...keys,'order type'].forEach(k=>u.searchParams.delete(k));
  if(q)u.searchParams.set('q',q);if(f)u.searchParams.set('form',f);
  v.forEach((value,i)=>{if(value)u.searchParams.set(keys[i],value);});
  const next=u.pathname+u.search+u.hash;
  try {replace?history.replaceState(null,'',next):history.pushState(null,'',next);setNotice('');}
  catch {setNotice('Filters apply on this page. Your browser could not update the link.');}
 }
 function changeForm(f:string){const v=f==='reference-galleries'?['','','']:values;setForm(f);setValues(v);save(query,f,v);}
 function changeQuery(q:string){setQuery(q);save(q,form,values,true);}
 function changeFacet(i:number,value:string){const v=values.map((x,j)=>j===i?value:x),f=form==='reference-galleries'?'':form;setValues(v);setForm(f);save(query,f,v);}
 function reset(){setQuery('');setForm('');setValues(['','','']);save('','',['','','']);search.current?.focus({preventScroll:true});}
 function clearSearch(){changeQuery('');search.current?.focus();}
 return <div className="px-browser">
  <div className="px-tools" aria-busy={!ready}>
   <label className="px-search"><span>Search parts</span><span className="px-query-field"><input ref={search} type="search" value={query} disabled={!ready} maxLength={160} autoComplete="off" onChange={e=>changeQuery(e.target.value)} placeholder="Part, feature or material"/>{query&&<button className="px-clear-search" type="button" aria-label="Clear part search" onClick={clearSearch}>×</button>}</span></label>
   <label className="px-form-select"><span>Part form</span><select aria-label="Part form" value={form} disabled={!ready} onChange={e=>changeForm(e.target.value)}><option value="">All forms</option>{forms.map(f=><option key={f.key} value={f.key}>{f.label}</option>)}<option value="reference-galleries">Part collections</option></select></label>
   <button ref={filterToggle} className="px-filter-toggle" type="button" disabled={!ready} aria-expanded={expanded} aria-controls={id} onClick={()=>setExpanded(!expanded)}>{expanded?'Close filters':'More filters'}{activeCount>0?' ('+activeCount+')':''}<svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d={expanded?'M4 10h12':'M4 10h12M10 4v12'} fill="none" stroke="currentColor" strokeWidth="1.5"/></svg></button>
  </div>
  {!ready&&<p className="site-state-note px-loading-state" role="status">Loading search and filters… All parts are available below.</p>}
  <div className={'px-facets'+(expanded?' px-facets-open':'')} id={id} hidden={!expanded}>{facets.map((facet,i)=><label key={facet.label}><span>{i===1?'Material option':facet.label}</span><select aria-label={i===1?'Material option':facet.label} value={values[i]} disabled={!ready} onChange={e=>changeFacet(i,e.target.value)}><option value="">{['All processes','All material options','Any order type'][i]}</option>{facet.options.map(o=><option key={o.key} value={o.key}>{o.label}</option>)}</select>{i===1&&<small>Filter material options. Specify the exact grade for your order.</small>}</label>)}</div>
  {changed&&<div className="px-active-filters" aria-label="Active filters">
   {query&&<button type="button" aria-label="Remove search filter" onClick={clearSearch}><span>Search: {query}</span><span aria-hidden="true">×</span></button>}
   {form&&<button type="button" aria-label="Remove part form filter" onClick={()=>{changeForm('');requestAnimationFrame(()=>filterToggle.current?.focus());}}><span>{form==='reference-galleries'?'Part collections':forms.find(f=>f.key===form)?.label}</span><span aria-hidden="true">×</span></button>}
   {values.map((value,i)=>value?<button type="button" key={keys[i]} aria-label={'Remove '+facets[i].label.toLowerCase()+' filter'} onClick={()=>{changeFacet(i,'');requestAnimationFrame(()=>filterToggle.current?.focus());}}><span>{facets[i].label}: {facets[i].options.find(o=>o.key===value)?.label}</span><span aria-hidden="true">×</span></button>:null)}
  </div>}
  {notice&&<p className="site-state-note" role="status">{notice}</p>}
  <div className="px-results"><p role="status" aria-live="polite" aria-atomic="true">{shown.length} part {shown.length===1?'example':'examples'} · {galleries.length} matching {galleries.length===1?'collection':'collections'}</p>{changed&&<button type="button" onClick={reset}>Reset filters</button>}</div>
  <h2 className="sr-only">Part examples</h2>
  <div className="px-grid" data-count={shown.length}>{shown.map((card,index)=><a className="px-card" key={card.slug} data-has-feature={Boolean(card.feature)} href={'/machined-parts/gallery/'+card.slug+'/'}><div className="px-image" data-image-origin={card.origin} data-image-background={card.background} data-image-quality={card.quality}><img src={card.src} srcSet={card.srcset} sizes="(max-width:767px) calc(100vw - 40px), (max-width:1099px) 42vw, 360px" width={card.width} height={card.height} alt={card.alt} loading={index<3?'eager':'lazy'} decoding="async"/></div><div className="px-card-copy"><h3>{card.title}</h3>{card.feature&&<p>{card.feature}</p>}{card.material&&<p className="px-material"><span>{card.material.label}:</span> {card.material.value}</p>}{['cad-reference','assembly-reference','design-reference'].includes(card.origin||'')&&<p className="px-origin">{card.origin==='cad-reference'?'CAD reference':card.origin==='assembly-reference'?'Assembly context':'Design reference'}</p>}{card.origin==='original-subject-background'&&<p className="px-origin">Source subject</p>}{card.quality==='low-resolution'&&<p className="px-origin">Low-resolution source · detailed photograph needed.</p>}</div></a>)}</div>
  {galleries.length>0&&<nav className="px-galleries" aria-label="Matching part collections">{galleries.map(g=><a key={g.slug} href={g.href}>{g.title}</a>)}</nav>}
  {!shown.length&&!galleries.length&&<section className="px-empty"><h3>No matching parts or collections</h3><p>{query?'No results for “'+query+'”. ':''}Remove a filter or try a part feature, process or material. You can also start with your own drawing.</p><button type="button" onClick={reset}>Reset search &amp; filters</button><a href="/quote/?source=%2Fmachined-parts%2Fgallery%2F">Request a quote</a></section>}
  <noscript><style>{'.px-loading-state{display:none!important}'}</style><p>All parts and collections are shown. Enable JavaScript to search or combine filters.</p></noscript>
 </div>;
}