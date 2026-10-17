import type {Resource} from './resources';
import photos from './companyNewsMedia.json';

const photoGroup=(group:string)=>photos.filter(photo=>photo.group===group);
const escape=(value:string)=>value.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const gallery=(group:string)=>`<div class="news-photo-gallery">${photoGroup(group).slice(1).map(photo=>`<figure><a href="${photo.src}" aria-label="View full photograph: ${escape(photo.caption)}"><img src="${photo.src}" srcset="${photo.srcset}" sizes="(max-width:760px) 90vw, 380px" alt="${escape(photo.caption)}" width="${photo.width}" height="${photo.height}" loading="lazy" decoding="async"/></a><figcaption>${escape(photo.caption)}</figcaption></figure>`).join('')}</div>`;
const news=(group:string,article:Resource):Resource=>{
 const cover=photoGroup(group)[0];
 return {...article,image:cover.src,imageSrcset:cover.srcset,imageAlt:cover.caption,imageCaption:cover.caption,imageWidth:cover.width,imageHeight:cover.height};
};

// Dates identify the event, not a backdated publication date. Source paths and
// original SHA-256 values are retained in companyNewsSources.json.
export const companyNews:Resource[]=[
 news('team-november-2025',{
  slug:'november-2025-hangzhou-lizhizao-group-activity',
  title:'A November team day outdoors',category:'Company news',
  eventDate:'2025-11-30',eventDateLabel:'30 November 2025',
  description:'The LZZ team spent a November day outdoors, sharing a meal, preparing a barbecue and taking photographs together beside the water.',
  source:'https://www.lzz-cnc.com/article/November-2025:-Hangzhou-Lizhizao-Group-Activity',
  html:`<p>The LZZ team came together for an outdoor outing on 30 November 2025. A group photograph beside the water captures the people taking part, with another portrait beneath the company activity banner.</p>
  <h2>A shared meal outdoors</h2><p>The day included food prepared at the barbecue and a meal beneath a canopy.</p>
  <h2>Photographs from the team day</h2>${gallery('team-november-2025')}
  <p>Meet the company behind the photographs on our <a href="/about/">About LZZ</a> page, or see the <a href="/factory/">workshop where the team works</a>.</p>`,
 }),
 news('china-africa-summit',{
  slug:'china-africa-west-lake-summit-2025',
  title:'LZZ at the China–Africa West Lake Summit',category:'Company news',
  eventDate:'2025-11-19',eventDateLabel:'19 November 2025',
  description:'LZZ representatives attended the China–Africa West Lake Summit in Hangzhou, with a company display introducing its custom machining services.',
  html:`<p>LZZ representatives attended the China–Africa West Lake Summit in Hangzhou on 19 November 2025. The company photographs show the team at the event backdrop, beside the LZZ display and inside the conference hall.</p>
  <h2>Introducing LZZ’s machining services</h2><p>The LZZ display presented custom machining services and examples of machined components. Photographs beside the display record the company’s participation, while views of the conference hall show the setting for the event sessions.</p><p>For a closer look at the work introduced at the event, explore our <a href="/capabilities/">machining capabilities</a> and <a href="/products/">part examples</a>.</p>
  <h2>Photographs from the event</h2>${gallery('china-africa-summit')}
  <p>Read more about <a href="/about/">LZZ and its Hangzhou workshop</a>.</p>`,
 }),
 news('team-may-2025',{
  slug:'may-2025-lzz-team-outing',
  title:'From an outdoor meal to an evening together',category:'Company news',
  eventDate:'2025-05',eventDateLabel:'May 2025',
  description:'Photographs from LZZ’s May 2025 team outing, from a meal beneath a canopy to group portraits along lantern-lit streets in the evening.',
  html:`<p>LZZ’s May 2025 team outing continued from an outdoor meal into the evening. The photographs begin around a shared table beneath a canopy and move on to group portraits under lanterns after dark.</p>
  <h2>Time together beyond the workshop</h2><p>The team stopped for food and photographs along the way. An evening portrait beside a stone railing and another outside a building capture different moments from the outing.</p>
  <h2>Photographs from the outing</h2>${gallery('team-may-2025')}
  <p>For more about the team’s working environment, visit <a href="/factory/">the LZZ workshop</a>.</p>`,
 }),
 news('australian-visit',{
  slug:'australian-customer-workshop-visit-january-2025',
  title:'An Australian customer visits the LZZ workshop',category:'Company news',
  eventDate:'2025-01-07',eventDateLabel:'7 January 2025',
  description:'An Australian customer visited LZZ in Hangzhou for a look around the CNC workshop and a conversation about machined parts.',
  html:`<p>LZZ welcomed an Australian customer to its Hangzhou workshop on 7 January 2025. The visit included time on the machining floor, a close look at components and a conversation around a machined part.</p>
  <h2>From the machines to the parts</h2><p>The photographs show the customer and LZZ team beside CNC machines and looking at a component together. A separate photograph captures a discussion at a table with a machined part in front of them.</p>
  <h2>Photographs from the visit</h2>${gallery('australian-visit')}
  <p>See more of <a href="/factory/">our machining workshop</a> and the <a href="/cases/">process studies photographed on the production floor</a>.</p>`,
 }),
 news('team-2024',{
  slug:'lzz-team-outing-2024',
  title:'A rainy day out with the LZZ team',category:'Company news',
  eventDate:'2024',eventDateLabel:'2024',
  description:'The LZZ team’s 2024 outing brought colleagues together for a coach trip, group photographs, a shared meal and time beside the water.',
  html:`<p>Umbrellas feature prominently in the photographs from LZZ’s 2024 team outing. The group gathered beneath the company banner before continuing a day that included a shared meal and time beside the water.</p>
  <h2>A day away from the machines</h2><p>The collection follows colleagues travelling by coach, sitting down to eat and stopping for a group photograph on a bridge. Other pictures capture a walk through the visitor area and a stop at the bumper cars.</p>
  <h2>Photographs from the outing</h2>${gallery('team-2024')}
  <p>Learn more <a href="/about/">about LZZ</a>, including the company’s history and workshop.</p>`,
 }),
];
