export type SpanishSection = {
 title:string;
 body:string[];
 id?:string;
 bullets?:string[];
 links?:string[];
};
export type SpanishPage = {
 en:string;
 path:string;
 title:string;
 lead:string;
 sections?:SpanishSection[];
 cover?:string;
 alt?:string;
 product?:string;
 related?:string[];
 listing?:'parts'|'examples'|'ordering'|'guides'|'news';
 kind?:'quote'|'article'|'service';
 published?:string;
 media?:string;
};
