import {corePages} from './es/core';
import {servicePages} from './es/services';
import {partPages} from './es/parts';
import {examplePages,newsPages} from './es/stories';
import {orderingPages,guidePages} from './es/resources';

export const spanishPages=[...corePages,...servicePages,...partPages,...examplePages,...orderingPages,...guidePages,...newsPages];
export const esHref=(path:string)=>path==='/'?'/es/':'/es'+path;
const byEnglish=new Map(spanishPages.map(page=>[page.en,page]));
const bySpanish=new Map(spanishPages.map(page=>[esHref(page.path),page]));
export const spanishPageFor=(en:string)=>byEnglish.get(en);
export const englishPageFor=(es:string)=>bySpanish.get(es)?.en;
export const localHref=(href:string)=> {
 const path=href.split(/[?#]/,1)[0];
 const page=spanishPageFor(path);
 return page?esHref(page.path):href;
};

const shortNames:Record<string,string>={
 '/':'Inicio','/capabilities/':'Capacidades','/machined-parts/':'Piezas CNC','/factory/':'Taller',
 '/resources/':'Recursos','/about/':'Empresa','/about/company-profile/':'Perfil de la empresa',
 '/about/how-we-work/':'Cómo trabajamos','/about/company-news/':'Noticias','/about/contact/':'Contacto',
 '/machined-parts/gallery/':'Galería de piezas','/machined-parts/machining-examples/':'Ejemplos de mecanizado',
 '/resources/ordering/':'Cotización y pedidos','/resources/technical-guides/':'Guías técnicas','/resources/faq/':'Preguntas frecuentes',
 '/resources/ordering/rfq-checklist/':'Lista para cotizar','/quote/':'Solicitar cotización',
 '/capabilities/cnc-milling-service/':'Fresado CNC','/capabilities/cnc-turning-service/':'Torneado CNC',
 '/capabilities/5-axis-cnc-machining/':'Mecanizado de cinco ejes','/capabilities/casting-machining/':'Mecanizado de fundiciones',
 '/capabilities/aluminum-cnc-parts/':'Aluminio','/capabilities/stainless-steel-cnc-parts/':'Acero inoxidable',
 '/capabilities/copper-brass-cnc-parts/':'Cobre y latón','/capabilities/plastic-machined-parts/':'Plásticos técnicos',
 '/capabilities/prototype-machining/':'Prototipos CNC','/capabilities/low-volume-production/':'Series cortas',
 '/capabilities/starting-with-a-sample/':'A partir de una muestra',
};
export const spanishLabel=(href:string)=>shortNames[href]||spanishPageFor(href)?.title||href;
