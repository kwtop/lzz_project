import type {ApprovedResourceGuide} from './resourceApproved';
import editorialData from './resourceEditorial.json';

type EditorialSection={id:string;title:string;html:string};
type EditorialCopy={
 seoTitle:string;heading:string;description:string;intro:string;libraryTitle:string;summary:string;
 reader_question:string;sections:EditorialSection[];section_questions:Record<string,string>;updated?:string;
};
type SearchCopy=Pick<EditorialCopy,'seoTitle'|'heading'|'description'|'intro'|'libraryTitle'|'summary'>&{html:string};
const editorial=editorialData as Record<string,EditorialCopy>;
const escape=(value:string)=>value.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

// Search copy, library summaries and alternate HTML all use the same reviewed
// article. Keyword/intent evidence stays in the editorial register, not in prose.
export const resourceSearchCopy:Record<string,SearchCopy>=Object.fromEntries(
 Object.entries(editorial).map(([slug,copy])=>[slug,{
  seoTitle:copy.seoTitle,heading:copy.heading,description:copy.description,intro:copy.intro,
  libraryTitle:copy.libraryTitle,summary:copy.summary,
  html:'<p>'+escape(copy.intro)+'</p>'+copy.sections.map(section=>'<h2 id="'+escape(section.id)+'">'+escape(section.title)+'</h2>'+section.html).join(''),
 }])
);

export const searchReviewedGuide=(slug:string,original:ApprovedResourceGuide):ApprovedResourceGuide=>{
 const copy=editorial[slug];
 if(!copy)return original;
 const current=original.modules.map(module=>module.section.id);
 if(current.length!==copy.sections.length||current.some((id,index)=>id!==copy.sections[index].id)){
  throw new Error('Reviewed article module mismatch: '+slug);
 }
 const updated=copy.updated||'2026-11-12';
 const dateLabel=new Date(updated+'T00:00:00Z').toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'});
 return {...original,title:copy.heading,heading:copy.heading,intro:copy.intro,
  sectionLabels:Object.fromEntries(copy.sections.map(section=>[section.id,section.title])),
  editorial:{updated,dateLabel},
  modules:original.modules.map((module,index)=>({...module,section:{...module.section,...copy.sections[index]}})),
 };
};
