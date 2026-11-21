import {photoById} from './aboutEditorial';
import type {NewsPlan} from './aboutEditorial';
import {siteImage} from './siteImages';
// Event labels retain the source grouping. The Australian 01 calendar discrepancy
// remains an internal verification task; it is not used to invent a new date.
export const approvedNewsPlans:Record<string,NewsPlan>={
  "november-2025-hangzhou-lizhizao-group-activity": {
    "category": "Team life",
    "cover": "team-november-2025-01",
    "hero": "wide",
    "intro": "A barbecue, a shared meal and time beside the water brought the LZZ team together on 30 November 2025. The photographs include the meal beneath a canopy and group portraits by the water and company activity banner.",
    "sections": [
      {
        "title": "A day beside the water",
        "text": "The team gathered beneath the activity banner for a group photograph in the outdoor setting.",
        "photos": [
          "team-november-2025-02",
          "team-november-2025-04"
        ],
        "layout": "essay"
      },
      {
        "title": "Around the barbecue and table",
        "text": "Food was prepared at the barbecue and colleagues shared a meal beneath the canopy.",
        "photos": [
          "team-november-2025-03",
          "team-november-2025-05"
        ],
        "layout": "pair"
      }
    ]
  },
  "china-africa-west-lake-summit-2025": {
    "category": "Workshop & events",
    "cover": "china-africa-summit-01",
    "hero": "wide",
    "intro": "LZZ representatives attended the China-Africa West Lake Summit in Hangzhou on 19 November 2025. A company display introduced our custom machining services alongside examples of machined components.",
    "sections": [
      {
        "title": "Introducing custom machining",
        "text": "The LZZ display introduced our company and the machining work we do. Representatives joined the display for photographs.",
        "photos": [
          "china-africa-summit-02",
          "china-africa-summit-03"
        ],
        "layout": "pair"
      },
      {
        "title": "The conference hall and entrance",
        "text": "The photographs also show the conference hall and a portrait at the event backdrop.",
        "photos": [
          "china-africa-summit-04",
          "china-africa-summit-05"
        ],
        "layout": "essay"
      }
    ]
  },
  "may-2025-lzz-team-outing": {
    "category": "Team life",
    "cover": "team-may-2025-01",
    "hero": "wide",
    "intro": "The May 2025 team outing began with an outdoor meal beneath a canopy. Later photographs follow the group into lantern-lit streets, with a portrait together and a stop for food.",
    "sections": [
      {
        "title": "An outdoor meal together",
        "text": "The daytime photographs show colleagues around the table beneath a canopy.",
        "photos": [
          "team-may-2025-02"
        ],
        "layout": "wide"
      },
      {
        "title": "Evening streets and food stops",
        "text": "Later photographs include a group portrait outside a building and a stop for food.",
        "photos": [
          "team-may-2025-03",
          "team-may-2025-04"
        ],
        "layout": "essay"
      }
    ]
  },
  "australian-customer-workshop-visit-january-2025": {
    "category": "Workshop & events",
    "cover": "australian-visit-03",
    "hero": "portrait",
    "intro": "An Australian customer visited our Hangzhou workshop on 7 January 2025. The visit included a tour of the CNC machines and a discussion of machined components with the LZZ team.",
    "sections": [
      {
        "title": "On the workshop floor",
        "text": "We walked through the CNC workshop with the visitor and took photographs together on the production floor.",
        "photos": [
          "australian-visit-04",
          "australian-visit-02",
          "australian-visit-05"
        ],
        "layout": "pair"
      },
      {
        "title": "Conversation during the visit",
        "text": "The visit continued with a conversation at a table.",
        "photos": [
          "australian-visit-01"
        ],
        "layout": "wide"
      }
    ]
  },
  "lzz-team-outing-2024": {
    "category": "Team life",
    "cover": "team-2024-01",
    "hero": "wide",
    "intro": "Umbrellas feature in the photographs from our 2024 team outing. The team travelled by coach, shared a meal and gathered beside the water for a portrait beneath the company banner.",
    "sections": [
      {
        "title": "The journey and a shared meal",
        "text": "The photographs include the coach journey and the shared meal.",
        "photos": [
          "team-2024-02",
          "team-2024-03"
        ],
        "layout": "essay"
      },
      {
        "title": "A day away from the machines",
        "text": "Later photographs show a group portrait on the steps, a stop at the bumper cars and a walk through the visitor area.",
        "photos": [
          "team-2024-04",
          "team-2024-05",
          "team-2024-06"
        ],
        "layout": "essay"
      }
    ]
  }
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

/** Presentation covers can change without relabelling the archived event photos. */
export const approvedNewsCover=(slug:string)=>{
 if(slug==='australian-customer-workshop-visit-january-2025'){
  const image=siteImage('news-visit-machine');
  return {...image,caption:undefined,sourceHref:'/media/company-visit-20261030/customer-at-machine-original.jpg'};
 }
 const original=approvedNewsPhoto(approvedNewsPlans[slug].cover);
 return {...original,alt:original.caption,origin:'original-photo',position:undefined,sourceHref:original.src};
};
