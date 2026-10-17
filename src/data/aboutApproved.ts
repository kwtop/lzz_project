import {newsPlans,photoById} from './aboutEditorial';
import type {NewsPlan} from './aboutEditorial';
// Event labels retain the source grouping. The Australian 01 calendar discrepancy
// remains an internal verification task; it is not used to invent a new date.
export const approvedNewsPlans:Record<string,NewsPlan>={
 ...newsPlans,
 'australian-customer-workshop-visit-january-2025':{
  ...newsPlans['australian-customer-workshop-visit-january-2025'],cover:'australian-visit-03',
  sections:[
   {title:'On the workshop floor',text:'The visitor and LZZ team toured the CNC machines and gathered for photographs on the production floor.',photos:['australian-visit-04','australian-visit-02','australian-visit-05'],layout:'pair'},
   {title:'Conversation during the visit',text:'The archive also includes a conversation at a table during the visit.',photos:['australian-visit-01'],layout:'wide'},
  ],
 },
 'november-2025-hangzhou-lizhizao-group-activity':{
  ...newsPlans['november-2025-hangzhou-lizhizao-group-activity'],extra:undefined,
  sections:[{...newsPlans['november-2025-hangzhou-lizhizao-group-activity'].sections[0],photos:['team-november-2025-02','team-november-2025-04'],layout:'essay'},{
   ...newsPlans['november-2025-hangzhou-lizhizao-group-activity'].sections[1],photos:['team-november-2025-03','team-november-2025-05'],
  }],
 },
};
export const approvedNewsPhoto=(id:string)=>{
 const item=photoById(id);
 const captions:Record<string,string>={
  'australian-visit-01':'Conversation during the workshop visit · original photograph',
  'australian-visit-03':'Looking at a component on the workshop floor · original photograph',
  'china-africa-summit-01':'LZZ representatives at the China-Africa West Lake Summit backdrop · original photograph',
 };
 return captions[id]?{...item,caption:captions[id]}:item;
};
