import {useEffect, useMemo, useRef, useState} from 'react';
import type {SyntheticEvent} from 'react';
import {Check, Mail, Trash2} from 'lucide-react';

type Fields = {name:string; email:string; phone:string; destination:string; company:string; material:string; quantity:string; project:string};
type SaveState = 'ready' | 'saved' | 'restored' | 'cleared' | 'unavailable';
const materials = ['Aluminum','Stainless steel','Brass / copper','Engineering plastic','Other / need advice'];
const emptyFields = (part=''):Fields => ({name:'',email:'',phone:'',destination:'',company:'',material:'',quantity:'',project:part});
const limits: Record<keyof Fields, number> = {name:100,email:150,phone:50,destination:150,company:150,material:80,quantity:9,project:1200};
function readSaved(value:string|null): {fields:Fields; prepared:boolean}|null {
 if(!value)return null;
 try {
  const parsed=JSON.parse(value);
  if(parsed?.version!==1||!parsed.fields||typeof parsed.fields!=='object')return null;
  const fields=emptyFields();
  for(const key of Object.keys(fields) as (keyof Fields)[]) {
   if((key==='phone'||key==='destination')&&parsed.fields[key]===undefined)continue;
   if(typeof parsed.fields[key]!=='string')return null;
   fields[key]=parsed.fields[key].slice(0,limits[key]);
  }
  if(fields.material&&!materials.includes(fields.material))return null;
  if(fields.quantity&&!/^\d{1,9}$/.test(fields.quantity))return null;
  const valid=!!(fields.name.trim()&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)&&(!fields.quantity||(Number(fields.quantity)>=1&&Number(fields.quantity)<=100000000))&&fields.project.trim());
  return {fields,prepared:parsed.prepared===true&&valid};
 } catch {return null;}
}
export default function QuoteForm(){
 const [fields,setFields]=useState<Fields>(emptyFields());
 const [prepared,setPrepared]=useState(false);
 const [ready,setReady]=useState(false);
 const [saveState,setSaveState]=useState<SaveState>('ready');
 const [copyState,setCopyState]=useState<'idle'|'copied'|'failed'>('idle');
 const storageKey=useRef('');
 const defaults=useRef(emptyFields());
 const skipNextSave=useRef(false);
 const resultRef=useRef<HTMLElement>(null);
 const shouldFocusResult=useRef(false);

 useEffect(()=>{
  const part=(new URLSearchParams(window.location.search).get('part')||'').slice(0,1200);
  defaults.current=emptyFields(part);
  storageKey.current='lzz:inquiry:v1:'+encodeURIComponent(part||'general');
  try {
   const saved=readSaved(sessionStorage.getItem(storageKey.current));
   setFields(saved?.fields||defaults.current);
   setPrepared(saved?.prepared||false);
   setSaveState(saved?'restored':'ready');
  } catch {
   setFields(defaults.current);
   setSaveState('unavailable');
  }
  setReady(true);
 },[]);
 useEffect(()=>{
  if(!ready)return;
  if(skipNextSave.current){skipNextSave.current=false;return;}
  try {
   sessionStorage.setItem(storageKey.current,JSON.stringify({version:1,fields,prepared}));
   setSaveState(previous=>previous==='restored'?'restored':'saved');
  } catch {setSaveState('unavailable');}
 },[fields,prepared,ready]);
 useEffect(()=>{
  if(prepared&&shouldFocusResult.current){
   resultRef.current?.focus({preventScroll:true});
   resultRef.current?.scrollIntoView({behavior:'auto',block:'nearest'});
   shouldFocusResult.current=false;
  }
 },[prepared]);

 const subject='CNC machining inquiry: '+(fields.company||fields.name);
 const draft=useMemo(()=>[
  'Hello LZZ team,','','I would like to discuss a CNC machining project.','',
  'Name: '+fields.name,'Email: '+(fields.email||'Not specified'),'Phone / WhatsApp: '+(fields.phone||'Not specified'),'Company: '+(fields.company||'Not specified'),
  'Country / Destination: '+(fields.destination||'To confirm'),
  'Material: '+(fields.material||'To confirm'),'Quantity: '+(fields.quantity||'To confirm'),'','Project requirements:',fields.project,'',
  'I will attach the relevant drawings or CAD files to this email.','',
  'Please review manufacturability, pricing and lead time.','Thank you.'
 ].join('\n'),[fields]);
 const fullDraft='To: roger@lzz-cnc.com\nSubject: '+subject+'\n\n'+draft;
 const mail='mailto:roger@lzz-cnc.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(draft);
 function update(key:keyof Fields,value:string){
  setFields(current=>({...current,[key]:value}));
  setPrepared(false);setCopyState('idle');
  setSaveState(current=>current==='unavailable'?current:'ready');
 }
 function prepare(event:SyntheticEvent<HTMLFormElement>){
  event.preventDefault();shouldFocusResult.current=true;setPrepared(true);setCopyState('idle');
 }
 function clear(){
  skipNextSave.current=true;
  try {sessionStorage.removeItem(storageKey.current);setSaveState('cleared');}
  catch {setSaveState('unavailable');}
  setFields({...defaults.current});setPrepared(false);setCopyState('idle');
 }
 async function copy(){
  try {await navigator.clipboard.writeText(fullDraft);setCopyState('copied');}
  catch {setCopyState('failed');}
 }
 function download(){
  const url=URL.createObjectURL(new Blob([fullDraft],{type:'text/plain;charset=utf-8'}));
  const anchor=document.createElement('a');anchor.href=url;anchor.download='lzz-project-inquiry.txt';anchor.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
 }
 return <div className="quote-form">
  <ol className="quote-steps" aria-label="Inquiry progress"><li aria-current={!prepared?"step":undefined}><span>1</span> Project details</li><li aria-current={prepared?"step":undefined}><span>2</span> Review draft</li><li><span>3</span> Attach &amp; send in email</li></ol>
  <form onSubmit={prepare} onInvalidCapture={event=>{const panel=(event.target as HTMLElement).closest("details");if(panel)panel.open=true;}}>
   <div className="form-grid">
    <label>Your name <span>*</span><input name="name" autoComplete="name" required pattern=".*\S.*" maxLength={100} value={fields.name} onChange={e=>update('name',e.target.value)}/></label>
    <label>Work email <span>*</span><input required name="email" type="email" autoComplete="email" maxLength={150} value={fields.email} onChange={e=>update('email',e.target.value)}/></label>
    <label className="full">Tell us about your part <span>*</span><textarea name="project" rows={5} required maxLength={1200} value={fields.project} onChange={e=>update('project',e.target.value)} placeholder="What does the part do? What needs particular attention?" aria-describedby="project-help"/><small id="project-help"><span>Part: purpose, size, critical dimensions and mating features.</span><span>Requirements: finish, standards, inspection records, quantity, needed-by date and ship-to location.</span></small></label>
   </div>
   <details className="quote-optional"><summary>Add project details <span>Optional</span></summary><div className="form-grid">
    <label>Phone / WhatsApp (optional)<input name="phone" type="tel" autoComplete="tel" pattern=".*\S.*" maxLength={50} placeholder="e.g. +1 202 555 0123" value={fields.phone} onChange={e=>update('phone',e.target.value)}/></label>
    <label>Country / Destination (optional)<input name="destination" autoComplete="country-name" pattern=".*\S.*" maxLength={150} placeholder="e.g. United States" value={fields.destination} onChange={e=>update('destination',e.target.value)}/></label>
    <label className="full">Company (optional)<input name="company" autoComplete="organization" maxLength={150} value={fields.company} onChange={e=>update('company',e.target.value)}/></label>
    <label>Material (optional)<select name="material" value={fields.material} onChange={e=>update('material',e.target.value)}><option value="">To be confirmed</option>{materials.map(material=><option key={material}>{material}</option>)}</select></label>
    <label>Quantity (optional)<input name="quantity" type="number" inputMode="numeric" min="1" max="100000000" step="1" placeholder="e.g. 100" value={fields.quantity} onChange={e=>update('quantity',e.target.value)}/></label>
   </div></details>
   <div className="drawing-note"><Mail size={22}/><p><strong>Attach drawings in your email app.</strong><br/>Prepare the draft first, then add your 2D drawing or 3D model before sending.</p></div>
   <p className="form-note">This form prepares an email; it does not submit an inquiry or upload files. You review and send the message yourself. If you have a response deadline, include it in your notes; no response-time estimate is published.</p>
   <button className="button" type="submit" disabled={!ready}>Prepare email draft</button>
   <div className="draft-storage">
    <p role="status">{saveState==='unavailable'?'Your browser cannot save this draft. Keep the page open or save a text copy before leaving.':saveState==='cleared'?'Saved input cleared. If you selected a part, its name is still filled in.':saveState==='restored'?'Your saved details for this part have been restored in this tab.':'Your input is saved in this browser tab and will stay here if you refresh.'}</p>
    <button type="button" className="text-link clear-draft" onClick={clear} disabled={!ready}><Trash2 size={17}/> Clear saved input</button>
   </div>
  </form>
  {prepared&&<section className="draft-result" aria-live="polite" aria-labelledby="draft-heading" ref={resultRef} tabIndex={-1}>
   <h3 id="draft-heading"><Check size={22}/> Your draft is ready</h3>
   <p>Nothing has been sent. Open your email app, attach your drawings, and send when you’re ready. If no email app opens, copy or save the draft and email it to <a href="mailto:roger@lzz-cnc.com">roger@lzz-cnc.com</a>. This website cannot confirm delivery; check your Sent folder.</p>
   <pre>{draft}</pre>
   <div className="actions">
    <a className="button" href={mail}>Open email app</a>
    <button className="text-link" onClick={copy}>{copyState==='copied'?'Copied':'Copy draft'}</button>
    <button className="text-link" onClick={download}>Save draft</button>
   </div>
   {copyState==='failed'&&<p className="copy-error" role="alert">Copying is blocked by your browser. Select the draft text above, or use “Save draft” to download a text file.</p>}
  </section>}
 </div>;
}
