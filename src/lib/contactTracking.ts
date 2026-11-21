/** Static metadata is rendered by React too, so hydration retains the same IDs. */
export function contactAttributes(id:string,type:'email_click'|'whatsapp_click'|'quote_click'|'download_click',target:string,label:string,section:string,sectionLabel:string){
 return {'data-analytics-id':id,'data-analytics-type':type,'data-analytics-target':target,'data-analytics-label':label,'data-analytics-section':section,'data-analytics-section-label':sectionLabel};
}
