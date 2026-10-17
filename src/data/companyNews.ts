import type {Resource} from './resources';
import photos from './companyNewsMedia.json';

const photoGroup=(group:string)=>photos.filter(photo=>photo.group===group).map(photo=>photo.id==='china-africa-summit-01'?{...photo,caption:'LZZ representatives at the China-Africa West Lake Summit backdrop.'}:photo);
const escape=(value:string)=>value.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const gallery=(group:string)=>`<div class="news-photo-gallery" id="news-photographs">${photoGroup(group).slice(1).map(photo=>`<figure data-image-origin="source-photo" data-photo-shape="${photo.width/photo.height>=1.25?'landscape':'portrait'}"><a class="static-photo"><img src="${photo.src}" srcset="${photo.srcset}" sizes="(max-width:760px) 100vw, 65vw" alt="${escape(photo.caption)}" width="${photo.width}" height="${photo.height}" loading="lazy" decoding="async"/></a><figcaption>${escape(photo.caption)}</figcaption></figure>`).join('')}</div>`;
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
  description:'The LZZ team gathered outdoors on 30 November 2025 for a barbecue and shared meal, with group photographs beside the water.',
  source:'https://www.lzz-cnc.com/article/November-2025:-Hangzhou-Lizhizao-Group-Activity',
  html:`<p>On 30 November 2025, the LZZ team gathered for a barbecue and meal beneath an outdoor canopy. Colleagues posed for group photographs beside the water and under the company activity banner.</p>
  <h2>A shared meal outdoors</h2><p>The day included food prepared at the barbecue and a meal beneath a canopy.</p>
  <h2>Photographs from the team day</h2>${gallery('team-november-2025')}
  <p>Learn more about the company on our <a href="/about/">About LZZ</a> page, or see the <a href="/factory/">workshop where the team works</a>.</p>`,
 }),
 news('china-africa-summit',{
  slug:'china-africa-west-lake-summit-2025',
  title:'LZZ at the China-Africa West Lake Summit',category:'Company news',
  eventDate:'2025-11-19',eventDateLabel:'19 November 2025',
  description:'LZZ representatives attended the China-Africa West Lake Summit in Hangzhou, with a company display introducing its custom machining services.',
  html:`<p>LZZ representatives attended the China-Africa West Lake Summit in Hangzhou on 19 November 2025. The company display introduced our custom machining services and examples of machined components.</p>
  <h2>Introducing LZZ’s machining services</h2><p>The gallery shows LZZ representatives beside the company display and event backdrop, with views of the conference hall.</p><p>For a closer look at the work introduced at the event, explore our <a href="/capabilities/">machining capabilities</a> and <a href="/machined-parts/">part examples</a>.</p>
  <h2>Photographs from the event</h2>${gallery('china-africa-summit')}
  <p>Read more about <a href="/about/">LZZ and its Hangzhou workshop</a>.</p>`,
 }),
 news('team-may-2025',{
  slug:'may-2025-lzz-team-outing',
  title:'LZZ team outing in May 2025',category:'Company news',
  eventDate:'2025-05',eventDateLabel:'May 2025',
  description:'The LZZ team shared an outdoor meal during the May 2025 outing, then gathered for photographs along lantern-lit streets.',
  html:`<p>During the May 2025 outing, colleagues shared an outdoor meal beneath a canopy. In the evening, the team posed for photographs along lantern-lit streets.</p>
  <h2>A meal and evening photographs</h2><p>The photographs include food stops and evening group portraits, with the team beside a stone railing and outside a building.</p>
  <h2>Photographs from the outing</h2>${gallery('team-may-2025')}
  <p>For more about the team’s working environment, visit <a href="/factory/">the LZZ workshop</a>.</p>`,
 }),
 news('australian-visit',{
  slug:'australian-customer-workshop-visit-january-2025',
  title:'An Australian customer visits the LZZ workshop',category:'Company news',
  eventDate:'2025-01-07',eventDateLabel:'7 January 2025',
  description:'An Australian customer visited LZZ in Hangzhou for a look around the CNC workshop and a conversation about machined parts.',
  html:`<p>An Australian customer visited our Hangzhou workshop on 7 January 2025. The customer toured the CNC machines and discussed machined components with the LZZ team.</p>
  <h2>From the machines to the parts</h2><p>The customer and team examined a component on the workshop floor and also discussed a part at a table. The photographs below record the tour and part review.</p>
  <h2>Photographs from the visit</h2>${gallery('australian-visit')}
  <p>See more of <a href="/factory/">our machining workshop</a> and the <a href="/machined-parts/machining-examples/">process studies photographed on the production floor</a>.</p>`,
 }),
 news('team-2024',{
  slug:'lzz-team-outing-2024',
  title:'A rainy day out with the LZZ team',category:'Company news',
  eventDate:'2024',eventDateLabel:'2024',
  description:'The LZZ team travelled by coach for a rainy day out in 2024, sharing a meal and taking group photographs beside the water.',
  html:`<p>Rain accompanied the 2024 team outing. Colleagues gathered with umbrellas beneath the company banner, travelled by coach and shared a meal during a day out beside the water.</p>
  <h2>A day away from the machines</h2><p>The gallery follows the coach trip and meal, with a group portrait on a bridge. Later photographs show the team walking through the visitor area and stopping at the bumper cars.</p>
  <h2>Photographs from the outing</h2>${gallery('team-2024')}
  <p>Learn more <a href="/about/">about LZZ</a>, including the company’s history and workshop.</p>`,
 }),
];
