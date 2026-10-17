export type InquiryReference = {
 id:string;
 title:string;
 legacyName:string;
 path:string;
 kind:'product'|'capability';
};

export function inquiryHref(reference:InquiryReference):string {
 const query=new URLSearchParams({part:reference.title,[reference.kind]:reference.id,source:reference.path});
 return '/quote/?'+query.toString();
}

// Resolve against the site's own directory. Query text must not create an external source link.
export function resolveInquiry(search:string,references:InquiryReference[]) {
 const query=new URLSearchParams(search);
 const part=(query.get('part')||'').slice(0,1200);
 const hasId=query.has('product')||query.has('capability');
 const reference=references.find(item=>query.get(item.kind)===item.id)
  ||(!hasId?references.find(item=>item.title===part||item.legacyName===part):undefined);
 return {
  reference,
  part:reference?.title||part,
  storageKey:'lzz:inquiry:v2:'+(reference?'ref:'+reference.kind+':'+encodeURIComponent(reference.id):'topic:'+encodeURIComponent(part||'general')),
  legacyKeys:(reference?[...new Set([reference.legacyName,reference.title])]:[part||'general']).map(name=>'lzz:inquiry:v1:'+encodeURIComponent(name)),
 };
}
