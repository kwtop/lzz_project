import type {InquiryReference} from './inquiryContext';

export type InquiryFields = {name:string; email:string; phone:string; project:string};
export type InquiryErrors = Partial<Record<keyof InquiryFields | 'contact',string>>;
export const inquiryLimits = {name:100,email:150,phone:50,project:4000};
export const emptyInquiry = ():InquiryFields => ({name:'',email:'',phone:'',project:''});
export const referenceKey = (reference?:InquiryReference) => reference ? `${reference.kind}:${reference.id}` : '';

export function validateInquiry(fields:InquiryFields):InquiryErrors {
 const errors:InquiryErrors={};
 if(!fields.name.trim())errors.name='Enter your name.';
 const email=fields.email.trim(),phone=fields.phone.trim();
 if(!email&&!phone)errors.contact='Add an email address or WhatsApp / phone number. One is enough.';
 if(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))errors.email='Enter a valid email address, or leave it blank and use your phone number.';
 if(phone&&(!/^[+\d\s().-]+$/.test(phone)||phone.replace(/\D/g,'').length<6||phone.replace(/\D/g,'').length>20))errors.phone='Enter a phone number with 6 to 20 digits. You can include a country code, spaces, brackets or hyphens.';
 if(!fields.project.trim())errors.project='Tell us about your part or the question you want to discuss.';
 return errors;
}

// Migrate earlier inputs into the editable message. Stored reference text never creates a source link.
export function readInquiryDraft(value:string|null,references:InquiryReference[],initialReference?:InquiryReference,initialTopic='') {
 if(!value)return null;
 try {
  const parsed=JSON.parse(value);
  if(![1,2].includes(parsed?.version)||!parsed.fields||typeof parsed.fields!=='object')return null;
  const fields=emptyInquiry();
  for(const key of Object.keys(fields) as (keyof InquiryFields)[]) {
   if(key==='phone'&&parsed.fields[key]===undefined)continue;
   if(typeof parsed.fields[key]!=='string')return null;
   fields[key]=parsed.fields[key].slice(0,inquiryLimits[key]);
  }
  if(parsed.version===1) {
   const oldTitles=[initialTopic,initialReference?.title,initialReference?.legacyName,...(initialReference?.aliases||[])].filter(Boolean);
   if(oldTitles.includes(fields.project))fields.project='';
   const extras=[['company','Company'],['material','Material family'],['materialSpec','Exact grade / condition'],['quantity','Quantity'],['arrival','Required arrival'],['destination','Destination']]
    .flatMap(([key,label])=>typeof parsed.fields[key]==='string'&&parsed.fields[key].trim() ? [label+': '+parsed.fields[key].slice(0,150).trim()] : []);
   if(extras.length)fields.project=[fields.project,...extras].filter(Boolean).join('\n').slice(0,inquiryLimits.project);
  }
  const selectedKey=parsed.version===1?referenceKey(initialReference):typeof parsed.referenceKey==='string'?parsed.referenceKey:'';
  const reference=references.find(item=>referenceKey(item)===selectedKey);
  return {fields,reference,prepared:parsed.prepared===true&&Object.keys(validateInquiry(fields)).length===0};
 } catch {return null;}
}

export function buildInquiryDraft(fields:InquiryFields,siteOrigin:string,reference?:InquiryReference,topic='') {
 const recipient='roger@lzz-cnc.com';
 const subject='CNC machining inquiry: '+(reference?.title||fields.name.trim());
 const body=[
  'Hello LZZ team,','','I would like to discuss a CNC machining project.','',
  ...(reference?['Reference: '+reference.title,'Reference ID: '+reference.kind+'/'+reference.id,'Source page: '+new URL(reference.path,siteOrigin).href,'']:[]),
  ...(!reference&&topic?['Inquiry topic: '+topic,'']:[]),
  'Name: '+fields.name.trim(),
  ...(fields.email.trim()?['Email: '+fields.email.trim()]:[]),
  ...(fields.phone.trim()?['Phone / WhatsApp: '+fields.phone.trim()]:[]),
  '','Message:',fields.project.trim(),'','I will attach any relevant drawings or CAD files when sending.',
  'Please review the requirements and let me know the next steps.','Thank you.'
 ].join('\n');
 return {recipient,subject,body,full:'To: '+recipient+'\nSubject: '+subject+'\n\n'+body,mail:'mailto:'+recipient+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body)};
}
