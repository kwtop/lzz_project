import {useEffect, useMemo, useRef, useState} from 'react';
import type {SyntheticEvent} from 'react';
import {Mail, Trash2} from 'lucide-react';
import {resolveInquiry} from '../lib/inquiryContext';
import type {InquiryReference} from '../lib/inquiryContext';

type Fields = {name:string; email:string; phone:string; destination:string; company:string; material:string; quantity:string; project:string};
type SaveState = 'ready' | 'saved' | 'restored' | 'cleared' | 'unavailable';
const materials = ['Aluminum','Stainless steel','Brass / copper','Engineering plastic','Other / need advice'];
const emptyFields = (part=''):Fields => ({name:'',email:'',phone:'',destination:'',company:'',material:'',quantity:'',project:part});
const limits: Record<keyof Fields, number> = {name:100,email:150,phone:50,destination:150,company:150,material:80,quantity:9,project:1200};
const recipient = 'roger@lzz-cnc.com';
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
export default function QuoteForm({references,siteOrigin}:{references:InquiryReference[];siteOrigin:string}){
 const [reference,setReference]=useState<InquiryReference>();
 const [topic,setTopic]=useState('');
 const [errors,setErrors]=useState<Partial<Record<keyof Fields,string>>>({});
 const [fields,setFields]=useState<Fields>(emptyFields());
 const [prepared,setPrepared]=useState(false);
 const [ready,setReady]=useState(false);
 const [saveState,setSaveState]=useState<SaveState>('ready');
 const [copyState,setCopyState]=useState<'idle'|'copied'|'failed'>('idle');
 const storageKey=useRef('');
 const legacyKeys=useRef<string[]>([]);
 const defaults=useRef(emptyFields());
 const skipNextSave=useRef(false);
 const resultRef=useRef<HTMLElement>(null);
 const shouldFocusResult=useRef(false);

 useEffect(()=>{
  const context=resolveInquiry(window.location.search,references);
  const {part,reference}=context;
  setReference(reference);
  setTopic(reference?'':part);
  defaults.current=emptyFields();
  storageKey.current=context.storageKey;
  legacyKeys.current=context.legacyKeys;
  try {
   const current=sessionStorage.getItem(storageKey.current);
   const saved=readSaved(current)||(!current?context.legacyKeys.map(key=>readSaved(sessionStorage.getItem(key))).find(Boolean):null);
   if(saved&&[part,reference?.title,reference?.legacyName,new URLSearchParams(window.location.search).get('part')].filter(Boolean).includes(saved.fields.project)){
    saved.fields.project='';saved.prepared=false;
   }
   setFields(saved?.fields||defaults.current);
   setPrepared(saved?.prepared||false);
   setSaveState(saved?'restored':'ready');
  } catch {
   setFields(defaults.current);
   setSaveState('unavailable');
  }
  setReady(true);
 },[references]);
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
  ...(reference?['Reference: '+reference.title,'Reference ID: '+reference.kind+'/'+reference.id,'Source page: '+new URL(reference.path,siteOrigin).href,'']:[]),
  ...(!reference&&topic?['Inquiry topic: '+topic,'']:[]),
  'Name: '+fields.name,'Email: '+(fields.email||'Not specified'),'Phone / WhatsApp: '+(fields.phone||'Not specified'),'Company: '+(fields.company||'Not specified'),
  'Country / Destination: '+(fields.destination||'To confirm'),
  'Material: '+(fields.material||'To confirm'),'Quantity: '+(fields.quantity||'To confirm'),'','Project requirements:',fields.project,'',
  'I will attach the relevant drawings or CAD files to this email.','',
  'Please review manufacturability, pricing and lead time.','Thank you.'
 ].join('\n'),[fields,reference,siteOrigin,topic]);
 const fullDraft='To: '+recipient+'\nSubject: '+subject+'\n\n'+draft;
 const mail='mailto:'+recipient+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(draft);
 function update(key:keyof Fields,value:string){
  setErrors(current=>({...current,[key]:undefined}));
  setFields(current=>({...current,[key]:value}));
  setPrepared(false);setCopyState('idle');
  setSaveState(current=>current==='unavailable'?current:'ready');
 }
 function prepare(event:SyntheticEvent<HTMLFormElement>){
  event.preventDefault();
  if(!fields.project.trim()){
   setErrors(current=>({...current,project:'Describe your part or the question you want to discuss.'}));
   (event.currentTarget.elements.namedItem('project') as HTMLTextAreaElement)?.focus();return;
  }
  setErrors({});shouldFocusResult.current=true;setPrepared(true);setCopyState('idle');
 }
 function invalid(event:SyntheticEvent<HTMLFormElement>){
  const input=event.target as HTMLInputElement;
  const key=input.name as keyof Fields;
  const messages:Record<keyof Fields,string>={material:'Choose a material or leave it to be confirmed.',name:'Enter your name.',email:'Enter a valid work email address.',project:'Describe your part or the question you want to discuss.',quantity:'Enter a whole quantity from 1 to 100,000,000, or leave it blank.',phone:'Enter a phone number, or leave it blank.',destination:'Enter a delivery destination, or leave it blank.',company:'Check your company name.'};
  setErrors(current=>({...current,[key]:messages[key]}));
  const panel=input.closest('details');if(panel)panel.open=true;
 }
 function clear(){
  skipNextSave.current=true;
  try {sessionStorage.removeItem(storageKey.current);for(const key of legacyKeys.current)sessionStorage.removeItem(key);setSaveState('cleared');}
  catch {setSaveState('unavailable');}
  setFields({...defaults.current});setPrepared(false);setCopyState('idle');
  setErrors({});
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
  {reference&&<aside className="quote-reference" aria-label="Inquiry reference"><strong>{reference.kind==='product'?'Part example':'Machining service'}</strong><a href={reference.path}>{reference.title}</a><p>{reference.kind==='product'?'Use this as a reference, then describe your own part below.':'Describe your part and requirements below.'}</p></aside>}
  {!reference&&topic&&<aside className="quote-reference" aria-label="Inquiry topic"><strong>Inquiry topic</strong><p>{topic}</p><p>Describe your part or question below.</p></aside>}
  <ol className="quote-steps" aria-label="Inquiry progress"><li aria-current={!prepared?"step":undefined}><span>1</span> Project details</li><li aria-current={prepared?"step":undefined}><span>2</span> Review draft</li><li><span>3</span> Send in email</li></ol>
  {prepared&&<section className="draft-result" aria-live="polite" aria-labelledby="draft-heading" ref={resultRef} tabIndex={-1}>
   <h3 id="draft-heading"><Mail size={22}/> Email draft prepared — not sent</h3>
   <p>Review the details, then send from your email app or webmail. Attach your drawing or CAD file before sending.</p>
   <dl className="quote-review-summary"><div><dt>Material</dt><dd>{fields.material||'To confirm'}</dd></div><div><dt>Quantity</dt><dd>{fields.quantity||'To confirm'}</dd></div><div className="full"><dt>Drawing and requirements</dt><dd>{fields.project}</dd></div><div className="full"><dt>Attachment</dt><dd>Attach your drawing or CAD file in your email. Nothing has been sent yet.</dd></div></dl>
   <dl className="draft-envelope" aria-label="Email recipient and subject"><div><dt>To</dt><dd>{recipient}</dd></div><div><dt>Subject</dt><dd>{subject}</dd></div></dl>
   <div className="actions">
    <a className="button" href={mail}>Open email app</a>
    <button className="text-link" type="button" onClick={()=>setPrepared(false)}>Edit details</button>
    <button className="text-link" type="button" onClick={copy}>{copyState==='copied'?'Copied':'Copy draft'}</button>
    <button className="text-link" type="button" onClick={download}>Save draft</button>
   </div>
   <div className="draft-webmail" aria-labelledby="webmail-heading"><h4 id="webmail-heading">Using webmail?</h4><ol><li>Start a new email and add the recipient and subject shown above.</li><li>Use <strong>Copy draft</strong> or <strong>Save draft</strong>, then paste the message body into your email. The draft includes the To and Subject lines for reference.</li><li>Attach your drawing or CAD file, then send from your email.</li></ol><p>Preparing this draft does not send an inquiry to LZZ.</p></div>
   <pre aria-label="Complete email draft">{fullDraft}</pre>
   {copyState==='failed'&&<p className="copy-error" role="alert">Copying is blocked by your browser. Select the draft text above, or use “Save draft” to download a text file.</p>}
  </section>}
  {!prepared&&<form onSubmit={prepare} onInvalidCapture={invalid}>
   {Object.values(errors).some(Boolean)&&<p className="form-error-summary" role="alert">Check the highlighted fields before preparing your draft.</p>}
   <div className="form-grid">
    <label>Your name <span>*</span><input name="name" autoComplete="name" required pattern=".*\S.*" maxLength={100} value={fields.name} aria-invalid={!!errors.name} aria-describedby={errors.name?'name-error':undefined} onChange={e=>update('name',e.target.value)}/>{errors.name&&<small id="name-error" className="field-error">{errors.name}</small>}</label>
    <label>Work email <span>*</span><input required name="email" type="email" autoComplete="email" maxLength={150} value={fields.email} aria-invalid={!!errors.email} aria-describedby={errors.email?'email-error':undefined} onChange={e=>update('email',e.target.value)}/>{errors.email&&<small id="email-error" className="field-error">{errors.email}</small>}</label>
    <label>Material, if known<select name="material" value={fields.material} onChange={e=>update('material',e.target.value)}><option value="">To be confirmed</option>{materials.map(material=><option key={material}>{material}</option>)}</select></label>
    <label>Quantity, if known<input name="quantity" type="number" inputMode="numeric" min="1" max="100000000" step="1" placeholder="e.g. 100" value={fields.quantity} aria-invalid={!!errors.quantity} aria-describedby={errors.quantity?'quantity-error':undefined} onChange={e=>update('quantity',e.target.value)}/>{errors.quantity&&<small id="quantity-error" className="field-error">{errors.quantity}</small>}</label>
    <label className="full">Tell us about your part <span>*</span><textarea name="project" rows={5} required maxLength={1200} value={fields.project} onChange={e=>update('project',e.target.value)} placeholder="Describe your own part, its intended use, or the question you want to discuss." aria-invalid={!!errors.project} aria-describedby={errors.project?'project-help project-error':'project-help'}/><small id="project-help">Include any known size, critical dimensions or fit, finish, and drawing revision. You can attach CAD or drawings in your email app.</small>{errors.project&&<small id="project-error" className="field-error">{errors.project}</small>}</label>
   </div>
   <details className="quote-optional"><summary>Contact and delivery details <span>Optional</span></summary><div className="form-grid">
    <label>Phone / WhatsApp (optional)<input name="phone" type="tel" autoComplete="tel" pattern=".*\S.*" maxLength={50} placeholder="e.g. +1 202 555 0123" value={fields.phone} aria-invalid={!!errors.phone} aria-describedby={errors.phone?'phone-error':undefined} onChange={e=>update('phone',e.target.value)}/>{errors.phone&&<small id="phone-error" className="field-error">{errors.phone}</small>}</label>
    <label>Country / Destination (optional)<input name="destination" autoComplete="country-name" pattern=".*\S.*" maxLength={150} placeholder="e.g. United States" value={fields.destination} aria-invalid={!!errors.destination} aria-describedby={errors.destination?'destination-error':undefined} onChange={e=>update('destination',e.target.value)}/>{errors.destination&&<small id="destination-error" className="field-error">{errors.destination}</small>}</label>
    <label className="full">Company (optional)<input name="company" autoComplete="organization" maxLength={150} value={fields.company} aria-invalid={!!errors.company} aria-describedby={errors.company?'company-error':undefined} onChange={e=>update('company',e.target.value)}/>{errors.company&&<small id="company-error" className="field-error">{errors.company}</small>}</label>
   </div></details>
   <div className="drawing-note"><Mail size={22}/><p><strong>You send the final email.</strong><br/>After reviewing your draft, attach your drawings in your email app. Nothing is uploaded or sent here.</p></div>
   <button className="button" type="submit" disabled={!ready}>Prepare email draft</button>
   <div className="draft-storage">
    <p role="status">{saveState==='unavailable'?'Your browser cannot save this draft. Keep the page open or save a text copy before leaving.':saveState==='cleared'?'Saved input cleared. Your inquiry reference is unchanged.':saveState==='restored'?'Saved draft restored.':'Draft saved in this tab.'}</p>
    <button type="button" className="text-link clear-draft" onClick={clear} disabled={!ready}><Trash2 size={17}/> Clear saved input</button>
   </div>
  </form>}
 </div>;
}
