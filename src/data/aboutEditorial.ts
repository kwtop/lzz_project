import catalog from './catalog.json';
import newsPhotos from './companyNewsMedia.json';

// Printed document details describe the archived source, not current validity.
const certificateAssets=catalog.companyAssets.filter(asset=>asset.source.includes('/certificate/'));
export const recognitionDocuments=[
 {title:'Precision manufacturing teaching base',kind:'Teaching partnership',description:'The plaque names Zhejiang Institute of Mechanical & Electrical Engineering and Lizhizao as a practical teaching base.',date:'November 2023',scope:'Education collaboration',width:1127,height:815},
 {title:'High-tech enterprise certificate',kind:'Enterprise recognition',description:'Issued to Hangzhou Lizhizao Precision Machinery Co., Ltd., with seals from the Zhejiang science and technology, finance and tax authorities.',date:'Issued 8 December 2023 · printed validity: three years',scope:'High-tech enterprise recognition',width:650,height:456},
 {title:'Zhejiang science & technology SME',kind:'Provincial recognition',description:'The document identifies Lizhizao as a Zhejiang science and technology SME and names the provincial science and technology authority.',date:'No issue date stated on the displayed document',scope:'Provincial enterprise recognition',width:549,height:776},
].map((document,i)=>({...document,image:certificateAssets[i].image,source:certificateAssets[i].source}));

export const aboutIllustrations={
 drawing:{stem:'/media/about-redesign-20261014/drawing-review',alt:'Pocketed metal component beside a drawing and an unbranded caliper',caption:'Drawing review'},
 inquiry:{stem:'/media/about-redesign-20261014/inquiry-parts',alt:'Machined housing, brass fitting and stepped shaft',caption:'Custom part forms'},
};
export const qualificationEmail='mailto:roger@lzz-cnc.com?subject='+encodeURIComponent('Supplier qualification documents')+'&body='+encodeURIComponent('Please send the current ISO 9001 certificate and scope for Hangzhou Lizhizao Precision Machinery Co., Ltd.\n\nProject / part reference:\nOther documents required:');
export const visitEmail='mailto:roger@lzz-cnc.com?subject='+encodeURIComponent('Workshop visit enquiry')+'&body='+encodeURIComponent('I would like to arrange a visit to your Hangzhou workshop.\n\nCompany:\nPreferred dates:\nParts or processes to discuss:');
export const photoById=(id:string)=>{const item=newsPhotos.find(photo=>photo.id===id);if(!item)throw new Error('Unknown news photograph: '+id);return item;};
type NewsSection={title:string;text:string;photos:string[];layout:'essay'|'pair'|'wide'};
export type NewsPlan={category:'Workshop & events'|'Team life';cover:string;hero:'wide'|'portrait';intro:string;sections:NewsSection[];extra?:string[]};
export const newsPlans:Record<string,NewsPlan>={
 'november-2025-hangzhou-lizhizao-group-activity':{category:'Team life',cover:'team-november-2025-01',hero:'wide',intro:'On 30 November 2025, the LZZ team gathered for a barbecue and meal beneath an outdoor canopy. Colleagues also took group photographs beside the water and under the company activity banner.',sections:[
  {title:'A day beside the water',text:'The team gathered beneath the activity banner for a group photograph in the outdoor setting.',photos:['team-november-2025-02'],layout:'wide'},
  {title:'Around the barbecue and table',text:'Food was prepared at the barbecue and colleagues shared a meal beneath the canopy.',photos:['team-november-2025-03','team-november-2025-05'],layout:'pair'},
 ],extra:['team-november-2025-04']},
 'china-africa-west-lake-summit-2025':{category:'Workshop & events',cover:'china-africa-summit-01',hero:'wide',intro:'LZZ representatives attended the China-Africa West Lake Summit in Hangzhou on 19 November 2025. The company display introduced its custom machining services and examples of machined components.',sections:[
  {title:'Introducing custom machining',text:'Representatives stood beside the LZZ display, which introduced the company and its machining work.',photos:['china-africa-summit-02','china-africa-summit-03'],layout:'pair'},
  {title:'Inside the conference hall',text:'The source collection also includes the conference hall and an event-backdrop photograph.',photos:['china-africa-summit-04','china-africa-summit-05'],layout:'essay'},
 ]},
 'may-2025-lzz-team-outing':{category:'Team life',cover:'team-may-2025-01',hero:'wide',intro:'During the May 2025 outing, colleagues shared an outdoor meal beneath a canopy. In the evening, the team took photographs along lantern-lit streets.',sections:[
  {title:'An outdoor meal together',text:'The daytime photographs show colleagues around the table beneath a canopy.',photos:['team-may-2025-02'],layout:'wide'},
  {title:'Evening streets and food stops',text:'Later photographs include a group portrait outside a building and a stop for food.',photos:['team-may-2025-03','team-may-2025-04'],layout:'essay'},
 ]},
 'australian-customer-workshop-visit-january-2025':{category:'Workshop & events',cover:'australian-visit-01',hero:'portrait',intro:'An Australian customer visited the LZZ workshop in Hangzhou on 7 January 2025. The visit included a tour of the CNC machines and a discussion of machined components with the team.',sections:[
  {title:'On the workshop floor',text:'The customer and LZZ team visited a CNC machine and gathered for photographs on the production floor.',photos:['australian-visit-04','australian-visit-02','australian-visit-05'],layout:'pair'},
  {title:'Looking closely at a component',text:'A component was examined on the workshop floor, with further discussion at the table shown in the opening photograph.',photos:['australian-visit-03'],layout:'essay'},
 ]},
 'lzz-team-outing-2024':{category:'Team life',cover:'team-2024-01',hero:'wide',intro:'Rain accompanied the LZZ team outing in 2024. Colleagues gathered with umbrellas beneath the company banner, travelled by coach and shared a meal during a day out beside the water.',sections:[
  {title:'The journey and a shared meal',text:'The source photographs follow the coach trip and the meal during the outing.',photos:['team-2024-02','team-2024-03'],layout:'essay'},
  {title:'A day away from the machines',text:'Later photographs show a group portrait on the steps, a stop at the bumper cars and a walk through the visitor area.',photos:['team-2024-04','team-2024-05','team-2024-06'],layout:'essay'},
 ]},
};
