import {useEffect,useMemo,useRef,useState} from 'react';
import type {SyntheticEvent} from 'react';
import {Mail,Phone,MapPin} from 'lucide-react';
import {resolveInquiry} from '../lib/inquiryContext';
import type {InquiryReference} from '../lib/inquiryContext';
import {buildInquiryDraft,emptyInquiry,inquiryLimits,readInquiryDraft,referenceKey,validateInquiry} from '../lib/inquiryDraft';
import type {InquiryErrors,InquiryFields} from '../lib/inquiryDraft';

type SaveState='ready'|'saved'|'restored'|'cleared'|'unavailable';

export default function QuoteForm({references,siteOrigin}:{references:InquiryReference[];siteOrigin:string}) {
 const [reference,setReference]=useState<InquiryReference>();
 const [topic,setTopic]=useState('');
 const [fields,setFields]=useState<InquiryFields>(emptyInquiry);
 const [errors,setErrors]=useState<InquiryErrors>({});
 const [prepared,setPrepared]=useState(false);
 const [ready,setReady]=useState(false);
 const [saveState,setSaveState]=useState<SaveState>('ready');
 const [copyState,setCopyState]=useState<'idle'|'copying'|'copied'|'failed'>('idle');
 const storageKey=useRef('');
 const legacyKeys=useRef<string[]>([]);
 const initialReference=useRef<InquiryReference>(undefined);
 const skipNextSave=useRef(false);
 const resultRef=useRef<HTMLElement>(null);
 const referenceSelect=useRef<HTMLSelectElement>(null);
 const focusResult=useRef(false);

 useEffect(()=>{
  const context=resolveInquiry(window.location.search,references);
  storageKey.current=context.storageKey;
  legacyKeys.current=context.legacyKeys;
  initialReference.current=context.reference;
  setTopic(context.reference?'':context.part);
  setReference(context.reference);
  try {
   const current=sessionStorage.getItem(context.storageKey);
   const read=(value:string|null)=>readInquiryDraft(value,references,context.reference,context.part);
   const saved=read(current)||(!current?context.legacyKeys.map(key=>read(sessionStorage.getItem(key))).find(Boolean):null);
   if(saved){setFields(saved.fields);setReference(saved.reference);setPrepared(saved.prepared);setSaveState('restored');}
  } catch {setSaveState('unavailable');}
  setReady(true);
 },[references]);

 useEffect(()=>{
  if(!ready)return;
  if(skipNextSave.current){skipNextSave.current=false;return;}
  try {
   sessionStorage.setItem(storageKey.current,JSON.stringify({version:2,fields,prepared,referenceKey:referenceKey(reference)}));
   setSaveState(previous=>previous==='restored'?'restored':'saved');
  } catch {setSaveState('unavailable');}
 },[fields,prepared,reference,ready]);

 useEffect(()=>{
  if(prepared&&focusResult.current){
   resultRef.current?.focus({preventScroll:true});
   resultRef.current?.scrollIntoView({behavior:'auto',block:'start'});
   focusResult.current=false;
  }
 },[prepared]);

 const draft=useMemo(()=>buildInquiryDraft(fields,siteOrigin,reference,topic),[fields,siteOrigin,reference,topic]);
 function update(key:keyof InquiryFields,value:string) {
  setFields(current=>({...current,[key]:value}));
  setErrors(current=>({...current,[key]:undefined,...(key==='email'||key==='phone'?{contact:undefined}:{})}));
  setPrepared(false);setCopyState('idle');
 }
 function prepare(event:SyntheticEvent<HTMLFormElement>) {
  event.preventDefault();
  const nextErrors=validateInquiry(fields);
  setErrors(nextErrors);
  const first=nextErrors.name?'name':nextErrors.email?'email':nextErrors.phone?'phone':nextErrors.contact?'email':nextErrors.project?'project':undefined;
  if(first){(event.currentTarget.elements.namedItem(first) as HTMLElement)?.focus();return;}
  focusResult.current=true;setPrepared(true);setCopyState('idle');
 }
 function changeReference(value:string) {
  setReference(references.find(item=>referenceKey(item)===value));
  setCopyState('idle');
 }
 function clear() {
  skipNextSave.current=true;
  try {sessionStorage.removeItem(storageKey.current);for(const key of legacyKeys.current)sessionStorage.removeItem(key);setSaveState('cleared');}
  catch {setSaveState('unavailable');}
  setFields(emptyInquiry());setReference(initialReference.current);setPrepared(false);setErrors({});setCopyState('idle');
 }
 async function copy() {
  setCopyState('copying');
  let timeout:ReturnType<typeof setTimeout> | undefined;
  try {
   await Promise.race([navigator.clipboard.writeText(draft.full),new Promise<never>((_,reject)=>{timeout=setTimeout(()=>reject(new Error('Clipboard unavailable')),3000);})]);
   setCopyState('copied');
  }
  catch {setCopyState('failed');}
  finally {if(timeout)clearTimeout(timeout);}
 }
 function download() {
  const url=URL.createObjectURL(new Blob([draft.full],{type:'text/plain;charset=utf-8'}));
  const anchor=document.createElement('a');anchor.href=url;anchor.download='lzz-project-inquiry.txt';anchor.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
 }
 function editReference() {
  setPrepared(false);
  requestAnimationFrame(()=>{referenceSelect.current?.focus();referenceSelect.current?.scrollIntoView({block:'center'});});
 }
 const storageMessage=saveState==='unavailable'?'Your browser cannot save input. Keep this page open, then use Save draft after preparing it.':saveState==='cleared'?'Saved input cleared.':saveState==='restored'?'Saved draft restored.':'Draft saved in this tab.';

 return <div className="inquiry-layout inquiry-workspace">
  <header className="inquiry-context" data-core-section="RFQ task and draft boundary">
   <h1>Prepare an RFQ email</h1>
   <p className="inquiry-lead">Create a draft here, then review it, attach drawings and send it from your email app. The website does not send inquiries or upload files.</p>
  </header>
  <div className="inquiry-panel" data-core-section={prepared?'Review the inquiry draft':'Contact and part requirements'}>
   {reference&&<div className="inquiry-reference" aria-label="Inquiry reference">
    <p>{reference.kind==='product'?'Part example':'Machining service'}</p>
    <h2><a href={reference.path}>{reference.title}</a></h2>
    <button className="inquiry-text-action" type="button" onClick={editReference}>Change reference</button>
   </div>}
   {!reference&&topic&&<div className="inquiry-reference" aria-label="Inquiry topic"><p>Inquiry topic</p><h2>{topic}</h2></div>}
   {!prepared&&<>
    <h2 id="inquiry-heading" className="sr-only">Your inquiry</h2>
    <form className="inquiry-form" aria-labelledby="inquiry-heading" onSubmit={prepare} noValidate>
     {Object.values(errors).some(Boolean)&&<p className="inquiry-error-summary" role="alert">Check the highlighted fields before preparing your draft.</p>}
     <fieldset className="inquiry-field-group inquiry-contact-fields"><legend>Your contact details</legend>
     <div className="inquiry-field inquiry-name">
      <label htmlFor="inquiry-name">Your name <span aria-hidden="true">*</span></label>
      <input id="inquiry-name" name="name" autoComplete="name" required maxLength={inquiryLimits.name} value={fields.name} onChange={e=>update('name',e.target.value)} placeholder="Your name" aria-invalid={!!errors.name} aria-describedby={errors.name?'inquiry-name-error':undefined}/>
      {errors.name&&<p id="inquiry-name-error" className="inquiry-field-error">{errors.name}</p>}
     </div>
     <div className="inquiry-field">
      <label htmlFor="inquiry-email">Email</label>
      <input id="inquiry-email" name="email" type="email" autoComplete="email" maxLength={inquiryLimits.email} value={fields.email} onChange={e=>update('email',e.target.value)} placeholder="you@company.com" aria-invalid={!!(errors.email||errors.contact)} aria-describedby={'inquiry-contact-help'+(errors.contact?' inquiry-contact-error':'')+(errors.email?' inquiry-email-error':'')}/>
      {errors.email&&<p id="inquiry-email-error" className="inquiry-field-error">{errors.email}</p>}
     </div>
     <div className="inquiry-field">
      <label htmlFor="inquiry-phone">WhatsApp / Phone</label>
      <input id="inquiry-phone" name="phone" type="tel" autoComplete="tel" maxLength={inquiryLimits.phone} value={fields.phone} onChange={e=>update('phone',e.target.value)} placeholder="Include country code" aria-invalid={!!(errors.phone||errors.contact)} aria-describedby={'inquiry-contact-help'+(errors.contact?' inquiry-contact-error':'')+(errors.phone?' inquiry-phone-error':'')}/>
      <p id="inquiry-contact-help" className="inquiry-field-help">Provide an email address or a WhatsApp / phone number.</p>
      {errors.contact&&<p id="inquiry-contact-error" className="inquiry-field-error">{errors.contact}</p>}
      {errors.phone&&<p id="inquiry-phone-error" className="inquiry-field-error">{errors.phone}</p>}
     </div>
     </fieldset>
     <fieldset className="inquiry-field-group"><legend>Part requirements</legend>
     <div className="inquiry-field">
      <label htmlFor="inquiry-reference">Product / service <span className="inquiry-optional">(optional)</span></label>
      <select id="inquiry-reference" name="reference" value={referenceKey(reference)} onChange={e=>changeReference(e.target.value)} ref={referenceSelect}>
       <option value="">Choose a part or service</option>
       <optgroup label="Parts gallery">{references.filter(item=>item.kind==='product').map(item=><option key={referenceKey(item)} value={referenceKey(item)}>{item.title}</option>)}</optgroup>
       <optgroup label="Machining services">{references.filter(item=>item.kind==='capability').map(item=><option key={referenceKey(item)} value={referenceKey(item)}>{item.title}</option>)}</optgroup>
      </select>

     </div>
     <div className="inquiry-field inquiry-message">
      <label htmlFor="inquiry-message">Message <span aria-hidden="true">*</span></label>
      <textarea id="inquiry-message" name="project" rows={5} required maxLength={inquiryLimits.project} value={fields.project} onChange={e=>update('project',e.target.value)} placeholder="Tell us about your part and requirements." aria-invalid={!!errors.project} aria-describedby={'inquiry-message-help'+(errors.project?' inquiry-message-error':'')}/>
      <p id="inquiry-message-help" className="inquiry-field-help">Include the drawing revision, material and finish, quantity, critical features and required inspection records, destination and required arrival.</p>
      {errors.project&&<p id="inquiry-message-error" className="inquiry-field-error">{errors.project}</p>}
     </div>
     </fieldset>
     <button className="inquiry-primary" type="submit" disabled={!ready}>Prepare inquiry draft</button>
     <noscript><p className="inquiry-noscript">This form needs JavaScript to prepare a draft. <a href="mailto:roger@lzz-cnc.com">Email LZZ</a> with your name, a contact method and part requirements.</p></noscript>

     <div className="inquiry-storage"><p role="status">{ready?storageMessage:'Preparing the form…'}</p><button className="inquiry-text-action" type="button" onClick={clear} disabled={!ready}>Clear saved input</button></div>
     <p className="inquiry-send-note"><a href="/privacy/">Draft storage and privacy</a></p>
    </form>
   </>}
   {prepared&&<section className="inquiry-review" aria-labelledby="draft-heading" aria-live="polite" ref={resultRef} tabIndex={-1}>
    <h2 id="draft-heading">Your inquiry draft is ready</h2>
    <p>Review the draft, attach your drawings and send it from your email app.</p>
    <dl className="inquiry-envelope"><div><dt>To</dt><dd>{draft.recipient}</dd></div><div><dt>Subject</dt><dd>{draft.subject}</dd></div></dl>
    <section className="inquiry-full-draft"><h3>Complete email draft</h3><pre aria-label="Complete email draft">{draft.full}</pre></section>
    <div className="inquiry-review-actions">
     <a className="inquiry-primary" href={draft.mail}>Open email app</a>
     <button className="inquiry-text-action" type="button" onClick={()=>{setPrepared(false);setCopyState('idle');}}>Edit details</button>
     <button className="inquiry-text-action" type="button" onClick={copy} disabled={copyState==='copying'}>{copyState==='copied'?'Copied':copyState==='copying'?'Copying…':'Copy draft'}</button>
     <button className="inquiry-text-action" type="button" onClick={download}>Save draft</button>
    </div>
    {copyState==='failed'&&<p className="inquiry-field-error" role="alert">Copy failed. Select the draft text above, or use Save draft to download a text file.</p>}
    {copyState==='copied'&&<p role="status">Draft copied. Paste it into your email and attach any drawings before sending.</p>}

   </section>}
  </div>
  <div className="inquiry-help" data-core-section="Direct contact and preparation references">
   <h2>Contact LZZ directly</h2>
   <address className="inquiry-contacts" aria-label="Contact LZZ">
    <a className="inquiry-contact-row" href="mailto:roger@lzz-cnc.com"><Mail size={22} strokeWidth={1.6} aria-hidden="true" focusable="false"/><span><strong>Email</strong><span>roger@lzz-cnc.com</span></span></a>
    <a className="inquiry-contact-row" href="tel:+8613858102479"><Phone size={22} strokeWidth={1.6} aria-hidden="true" focusable="false"/><span><strong>Phone</strong><span>+86 138 5810 2479</span></span></a>
    <a className="inquiry-contact-row" href="/about/contact/"><MapPin size={22} strokeWidth={1.6} aria-hidden="true" focusable="false"/><span><strong>Hangzhou, China</strong><span>Contact details &amp; workshop visits</span></span></a>
   </address>
   <a className="inquiry-text-action" href="/resources/ordering/rfq-checklist/">RFQ preparation checklist</a>
   <div className="inquiry-preparation-photos" aria-label="Drawing, part and inspection references">
    <figure data-image-origin="AI-generated"><img src="/media/image-led-20261015/definition-800.webp" width="800" height="533" alt="Illustrative model, drawing and sample showing the information to prepare for an RFQ" loading="lazy"/><figcaption>Model and drawing · <span>AI illustration.</span></figcaption></figure>
    <figure data-image-origin="original-photo"><img src="/media/evidence/multi-feature-milling-parts-800.webp" width="800" height="600" alt="Original photograph of machined components with different faces and openings" loading="lazy"/><figcaption>Part references · original photograph</figcaption></figure>
    <figure className="inquiry-inspection-photo" data-image-origin="original-photo"><img src="/media/evidence/cmm-detail-800.webp" width="800" height="1067" alt="Original LZZ coordinate measuring machine photograph, illustrating inspection planning rather than a result" loading="lazy"/><figcaption>Measurement equipment · LZZ photograph. Not a part inspection report.</figcaption></figure>
   </div>
  </div>
 </div>;
}

