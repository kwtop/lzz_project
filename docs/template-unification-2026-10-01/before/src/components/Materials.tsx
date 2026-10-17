import {useEffect,useRef,useState} from 'react';
import {materialHeroes} from '../data/refinedImages';
const data=[
 {name:'Aluminum',category:'Aluminum-CNC-Parts',visual:materialHeroes['aluminum-cnc-parts'],copy:'Housings, brackets and complex profiles.'},
 {name:'Stainless steel',category:'Stainless-Steel-CNC-Parts',visual:materialHeroes['stainless-steel-cnc-parts'],copy:'Turned shafts, threaded fittings and control hardware.'},
 {name:'Brass & copper',category:'Copper-Brass-CNC-Parts',visual:materialHeroes['copper-brass-cnc-parts'],copy:'Fittings, connectors and electrical components.'},
 {name:'Engineering plastics',category:'Plastic-Machined-Parts',visual:materialHeroes['plastic-machined-parts'],copy:'Insulating parts, wear components and structural blocks.'}
];
export default function Materials(){
 const [active,setActive]=useState(0);
 const tabList=useRef<HTMLDivElement>(null);
 const item=data[active];
 useEffect(()=>{
  const list=tabList.current;
  const selected=list?.querySelector<HTMLElement>('[aria-selected="true"]');
  if(!list||!selected)return;
  const left=selected.getBoundingClientRect().left-list.getBoundingClientRect().left+list.scrollLeft;
  if(left<list.scrollLeft)list.scrollTo({left,behavior:'auto'});
  else if(left+selected.offsetWidth>list.scrollLeft+list.clientWidth)list.scrollTo({left:left+selected.offsetWidth-list.clientWidth,behavior:'auto'});
 },[active]);
 return <div className="material-module">
  <p className="material-scroll-hint">Swipe to explore all four materials</p>
  <div className="material-tabs" role="tablist" aria-label="Materials" ref={tabList}>{data.map((material,index)=><button role="tab" id={'material-tab-'+index} aria-controls="material-panel" aria-selected={active===index} tabIndex={active===index?0:-1} key={material.name} onClick={()=>setActive(index)} onKeyDown={event=>{
   if(['ArrowRight','ArrowLeft','Home','End'].includes(event.key)){
    event.preventDefault();
    const next=event.key==='Home'?0:event.key==='End'?data.length-1:(index+(event.key==='ArrowRight'?1:-1)+data.length)%data.length;
    setActive(next);document.getElementById('material-tab-'+next)?.focus({preventScroll:true});
   }
  }}>{material.name}</button>)}</div>
  <div id="material-panel" role="tabpanel" aria-labelledby={'material-tab-'+active} className="material-panel">
   <div className="material-copy"><h3>{item.name}</h3><p className="material-lead">{item.copy}</p><a className="text-link" href={'/capabilities/'+item.category.toLowerCase()+'/'}>Explore {item.name.toLowerCase()}</a></div>
   <figure className="material-figure"><div className="material-photo"><img src={item.visual.image} srcSet={item.visual.srcset} sizes="(max-width:760px) 90vw, 52vw" alt={item.visual.alt} loading="lazy" width="1536" height="1024"/></div></figure>
  </div>
 </div>;
}
