import type {InquiryPartType,InquiryProcess} from './inquiryForm';

export type InquiryReference = {
 id:string;
 title:string;
 path:string;
 kind:'product'|'capability';
 partType?:InquiryPartType;
 processes?:readonly InquiryProcess[];
};

export type InquiryContext = {
 reference?:InquiryReference;
 part:string;
 source:string;
};

export function inquiryHref(reference:InquiryReference):string {
 const query=new URLSearchParams({part:reference.title,[reference.kind]:reference.id,source:reference.path});
 return '/quote/?'+query.toString();
}

// Only site-relative route paths and section IDs become clickable source links.
function sourcePath(value:string|null):string {
 return value&&value.length<=400&&/^\/(?:[a-z0-9][a-z0-9-]*\/)*(?:#[A-Za-z][\w-]*)?$/.test(value)?value:'';
}

export function resolveInquiry(search:string,references:readonly InquiryReference[]):InquiryContext {
 const query=new URLSearchParams(search);
 const reference=references.find(item=>query.get(item.kind)===item.id);
 return {
  reference,
  part:reference?.title||(query.get('part')||'').replace(/[\u0000-\u001f\u007f]/g,'').trim().slice(0,200),
  source:sourcePath(query.get('source'))||reference?.path||'',
 };
}
