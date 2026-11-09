export const inquiryLimits={name:100,company:150,country:100,contact:150,message:4000} as const;

export const inquiryPartTypes=[
 {value:'housings',label:'Housings / covers'},
 {value:'shafts',label:'Shafts / fittings / pins'},
 {value:'blocks',label:'Blocks / brackets / circular parts'},
 {value:'impellers',label:'Impellers'},
 {value:'plastics',label:'Plastic components'},
 {value:'automotive',label:'Automotive prototypes'},
 {value:'batches',label:'Multiple part numbers'},
 {value:'other',label:'Other / not sure'},
] as const;
export const machiningProcesses=[
 {value:'milling',label:'CNC milling'},
 {value:'turning',label:'CNC turning'},
 {value:'multi-axis',label:'5-axis machining'},
 {value:'plastic',label:'Plastic machining'},
 {value:'castings',label:'Casting machining'},
 {value:'not-sure',label:'Not sure yet'},
] as const;
export type InquiryPartType=typeof inquiryPartTypes[number]['value'];
export type InquiryProcess=typeof machiningProcesses[number]['value'];
export type ContactMethod='phone'|'email';

const attachmentFormats=[
 {label:'PDF',extensions:['pdf']},
 {label:'STEP/STP',extensions:['step','stp']},
 {label:'IGES/IGS',extensions:['iges','igs']},
 {label:'DXF/DWG',extensions:['dxf','dwg']},
 {label:'JPG/PNG',extensions:['jpg','png']},
 {label:'ZIP',extensions:['zip']},
] as const;

// The receiving service imports the same limits and validates independently.
export const attachmentPolicy={
 maxFiles:5,
 maxTotalBytes:20*1024*1024,
 extensions:attachmentFormats.flatMap(format=>[...format.extensions]),
} as const;
export const attachmentAccept=attachmentPolicy.extensions.map(extension=>'.'+extension).join(',');
export const attachmentFormatsLabel=attachmentFormats.map(format=>format.label).join(', ').replace(/, (?=[^,]*$)/,' or ');
export const attachmentTotalLimitLabel=formatFileSize(attachmentPolicy.maxTotalBytes).replace('.0 MB',' MB');

export type InquiryFields={name:string;company:string;product:string;country:string;method:ContactMethod;phone:string;email:string;partType:InquiryPartType|'';processes:InquiryProcess[];message:string};
export type InquiryErrors=Partial<Record<keyof InquiryFields,string>>;
export type InquiryContact={kind:ContactMethod;value:string};
export type AttachmentInfo={name:string;size:number};

export function emptyInquiryFields(preset:{partType?:InquiryPartType;processes?:readonly InquiryProcess[]}={}):InquiryFields {
 return {name:'',company:'',product:'',country:'',method:'phone',phone:'',email:'',partType:preset.partType||'',processes:[...(preset.processes||[])],message:''};
}

export function toggleInquiryProcess(current:readonly InquiryProcess[],value:InquiryProcess):InquiryProcess[] {
 if(current.includes(value))return current.filter(process=>process!==value);
 if(value==='not-sure')return ['not-sure'];
 return [...current.filter(process=>process!=='not-sure'),value];
}

export function parseContact(method:ContactMethod,raw:string):InquiryContact|undefined {
 const value=raw.trim();
 if(!value||value.length>inquiryLimits.contact)return;
 if(method==='email') {
  if(/^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(value))return {kind:'email',value};
  return;
 }
 // An international number can be used for WhatsApp or a phone call.
 if(!/^\+[\d\s().-]+$/.test(value))return;
 const digits=value.replace(/\D/g,'');
 if(digits.length<7||digits.length>15||digits.startsWith('0'))return;
 return {kind:'phone',value:'+'+digits};
}

export function validateInquiry(fields:InquiryFields):InquiryErrors {
 const errors:InquiryErrors={};
 if(fields.company?.length>inquiryLimits.company)errors.company='Keep the company name within 150 characters.';
 if(fields.product&&!/^[a-z0-9-]{1,180}$/.test(fields.product))errors.product='Choose a product from the list.';
 if(!fields.name.trim())errors.name='Enter your name.';
 else if(fields.name.length>inquiryLimits.name||!/[\p{L}]/u.test(fields.name))errors.name='Enter a name within '+inquiryLimits.name+' characters.';
 const country=fields.country.trim();
 if(!country)errors.country='Enter the destination country or region.';
 else if(country.length>inquiryLimits.country||(country.match(/\p{L}/gu)||[]).length<2||!/^[\p{L}\p{M} .,'’()&/-]+$/u.test(country))errors.country='Use a country or region name, such as Germany or Canada.';
 if(fields.method==='phone') {
  if(!fields.phone.trim())errors.phone='Enter your WhatsApp or phone number.';
  else if(!parseContact('phone',fields.phone))errors.phone='Include a valid country code, such as +44 7700 900123.';
 } else if(fields.method==='email') {
  if(!fields.email.trim())errors.email='Enter your email address.';
  else if(!parseContact('email',fields.email))errors.email='Use a valid email address, such as you@company.com.';
 } else errors.method='Choose WhatsApp / Phone or Email.';
 if(fields.partType&&!inquiryPartTypes.some(option=>option.value===fields.partType))errors.partType='Choose a part type from the list, or leave it blank.';
 if(fields.processes.some(value=>!machiningProcesses.some(option=>option.value===value))||(fields.processes.includes('not-sure')&&fields.processes.length>1))errors.processes='Choose the processes you need, or select Not sure yet.';
 if(fields.message.length>inquiryLimits.message)errors.message='Keep your message within '+inquiryLimits.message.toLocaleString('en-US')+' characters.';
 return errors;
}

export function formatFileSize(bytes:number):string {
 if(bytes<1024)return bytes+' B';
 if(bytes<1024*1024)return (bytes/1024).toFixed(1)+' KB';
 return (bytes/(1024*1024)).toFixed(1)+' MB';
}

export function validateAttachments(files:readonly AttachmentInfo[]):string[] {
 const errors:string[]=[];
 if(files.length>attachmentPolicy.maxFiles)errors.push('Choose up to '+attachmentPolicy.maxFiles+' files. Remove a file before adding another.');
 if(files.reduce((total,file)=>total+file.size,0)>attachmentPolicy.maxTotalBytes)errors.push('The files exceed '+attachmentTotalLimitLabel+' in total. Remove a file or choose smaller files.');
 for(const file of files) {
  const extension=file.name.split('.').at(-1)?.toLowerCase();
  if(!attachmentPolicy.extensions.some(allowed=>allowed===extension))errors.push(file.name+': use '+attachmentFormatsLabel+'.');
  else if(!Number.isFinite(file.size)||file.size<=0)errors.push(file.name+': this file is empty. Choose a file with content.');
 }
 return errors;
}
