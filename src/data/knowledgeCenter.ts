import redirects from './siteRouteRedirects.json';
import routes from './resourceRoutes.json';
import {resourceGroups,resourceLibrary} from './resourceLibrary';
export const resourceHref=(slug:string)=>{
 const key=(routes.sourceArticleAliases as Record<string,string>)[slug]||slug;
 const href=(routes.guides as Record<string,string>)[key]||redirects[('/resources/'+slug+'/') as keyof typeof redirects];
 if(!href)throw new Error('Unknown resource destination: '+slug);
 return href;
};
export const knowledgeTopics=resourceGroups.map(group=>({id:group.key==='ordering'?'rfq-guides':'engineering-guides',title:group.title,href:group.href,description:group.description,slugs:resourceLibrary.filter(guide=>guide.group===group.key).map(guide=>guide.slug)}));
export const knowledgeLinks=[...resourceGroups.map(({title,href,description})=>({title,href,description})),{title:'FAQ',href:'/resources/faq/',description:'Quick answers about quotes, specifications, inspection and delivery.'}];
export const aboutLinks=[
 {title:'Company profile',href:'/about/company-profile/'},
 {title:'How we work',href:'/about/how-we-work/'},
 {title:'Company news',href:'/about/company-news/'},
 {title:'Contact us',href:'/about/contact/'},
];
export const topicForResource=(slug:string)=>knowledgeTopics.find(topic=>topic.slugs.includes((routes.sourceArticleAliases as Record<string,string>)[slug]||slug));
