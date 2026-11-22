import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
import {load} from 'cheerio';
import {buildSync} from 'esbuild';
import {createElement} from 'react';
import {renderToString} from 'react-dom/server';
import ts from 'typescript';
import {annotateAnalytics} from './annotate-analytics.mjs';
import {gallerySpanish} from '../src/lib/gallerySpanish.ts';

const root = fileURLToPath(new URL('../', import.meta.url));
const origin = 'https://www.lzz-cnc.com';
const translateAttributes = ['alt', 'title', 'aria-label', 'aria-description', 'placeholder', 'data-label', 'data-caption', 'data-media-caption', 'data-analytics-label', 'data-analytics-section-label'];
const inline = new Set(['a', 'b', 'br', 'cite', 'code', 'em', 'i', 'kbd', 'mark', 's', 'small', 'span', 'strong', 'sub', 'sup', 'time', 'u', 'wbr']);
const typesWithDate = new Set(['Article', 'BlogPosting', 'NewsArticle']);
const textKeys = new Set(['name', 'headline', 'description', 'articleSection', 'text', 'caption', 'alternateName', 'serviceType']);
const preserve = /^(?:LZZ(?: Precision)?|Hangzhou(?:, China)?|WhatsApp|CNC|CMM|CAD|RFQ|ISO [\d:]+|[A-Z\d/.+\- ×±]+|[^\s@]+@[^\s@]+|https?:\/\/\S+)$/;
const clean = value => value.replace(/\s+/gu, ' ').trim();
const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const decode = value => load(value, null, false).root().text();
const document = (dir, route) => load(fs.readFileSync(path.join(dir, route.slice(1), 'index.html'), 'utf8'), {scriptingEnabled:false});
const localizedScripts = {
 'Previous part references':'Ver las piezas anteriores',
 'Next part references':'Ver las piezas siguientes',
 "You're offline. Loaded content is still available. Reconnect to open new pages or media.":'Estás sin conexión. Puedes seguir viendo el contenido ya cargado. Vuelve a conectarte para abrir otras páginas o imágenes.',
 'Connection restored. You can try loading the page or media again.':'Se restableció la conexión. Puedes volver a cargar la página o el archivo.',
 'Zoom in':'Ampliar imagen',
 'Fit image':'Ajustar imagen',
 'This image could not be loaded. Check your connection and try again.':'No se pudo cargar la imagen. Revisa la conexión e inténtalo de nuevo.',
 'The image is taking longer to load. Try again or open the image directly.':'La imagen está tardando en cargar. Reintenta o abre el archivo directamente.',
 'Image reference':'Imagen de referencia',
 'Copying…':'Copiando…',
 'Inquiry brief copied.':'Se copió la plantilla de solicitud.',
 'Copy again':'Volver a copiar',
 'Copy failed. Select the brief manually, or use Save blank brief (.txt).':'No se pudo copiar. Selecciona el texto o descarga la plantilla en formato .txt.',
 'Try copying again':'Intentar copiar de nuevo',
 'The linked category is unavailable. Showing all categories.':'La categoría del enlace ya no está disponible. Se muestran todas.',
 'Filters apply on this page. Your browser could not update the link.':'Se aplicaron los filtros. El navegador no pudo actualizar el enlace.',
 ' matching “':' para «',
 '”':'»',
 ' update':' noticia',
 ' updates':' noticias',
 'The video could not be loaded. Check your connection and try again.':'No se pudo cargar el video. Revisa la conexión e inténtalo de nuevo.',
 'The video is taking longer to load. Check your connection and retry.':'El video está tardando en cargar. Revisa la conexión y vuelve a intentarlo.',
 'Playback could not start. Try the Play control or open the video file.':'No se pudo reproducir el video. Prueba con el botón de reproducción o abre el archivo.',
};
function scriptCopy(value) {
 const source = ts.createSourceFile('localized.js',value,ts.ScriptTarget.Latest,false,ts.ScriptKind.JS);
 const replacements = [];
 function visit(node) {
  if ((ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) && Object.hasOwn(localizedScripts,node.text)) {
   const text = JSON.stringify(localizedScripts[node.text]).replaceAll('<','\\u003c');
   replacements.push({start:node.getStart(source),end:node.end,text});
  }
  ts.forEachChild(node,visit);
 }
 visit(source);
 let translated = '';
 let position = 0;
 for (const {start,end,text} of replacements) {
  translated += value.slice(position,start) + text;
  position = end;
 }
 return translated + value.slice(position);
}

function galleryRenderer() {
 const {text} = buildSync({
  entryPoints:[path.join(root,'src/components/PartsCatalogueExplorerRedesigned.tsx')],
  bundle:true, write:false, packages:'external', format:'cjs', platform:'node', jsx:'automatic',
 }).outputFiles[0];
 const dir = path.join(root,'node_modules/.cache/lzz-spanish');
 fs.mkdirSync(dir,{recursive:true});
 const bundle = path.join(dir,'gallery-'+createHash('sha256').update(text).digest('hex').slice(0,12)+'.cjs');
 fs.writeFileSync(bundle,text);
 const Component = createRequire(import.meta.url)(bundle).default;
 return (props,identifierPrefix) => renderToString(createElement(Component,props),{identifierPrefix});
}

function deserializeProps(props) {
 const read = ([type,value]) => {
  if (type === 1) return value.map(read);
  if (type !== 0) throw new Error('Unexpected type in catalogue island');
  if (!value || typeof value !== 'object') return value;
  return deserializeProps(value);
 };
 return Object.fromEntries(Object.entries(props).map(([key,value])=>[key,read(value)]));
}

function localizeGallery($, plain, href, component, renderGallery) {
 const island = $('main astro-island').filter((_, el) => ($(el).attr('component-url') || '').includes('PartsCatalogueExplorerRedesigned'));
 if (!island.length) return;
 const props = JSON.parse(island.attr('props'));
 const record = row => row[1];
 const field = (row,key) => row[key]?.[1];
 function localizeString(row,key) {
  if (typeof field(row,key) === 'string') row[key][1] = plain(field(row,key));
 }
 for (const card of props.cards[1].map(record)) {
  card.href = [0,href('/machined-parts/gallery/'+field(card,'slug')+'/')];
  ['title','alt','feature'].forEach(key => localizeString(card,key));
  if (card.material) ['label','value'].forEach(key => localizeString(card.material[1],key));
  const search = field(card,'search');
  card.search[1] = [field(card,'title'),field(card,'feature'),field(card,'alt'),card.material?.[1]?.value?.[1],plain(search),search].filter(Boolean).join(' ');
 }
 for (const gallery of props.referenceGalleries[1].map(record)) ['title','alt','feature','search'].forEach(key => localizeString(gallery,key));
 for (const form of props.forms[1].map(record)) localizeString(form,'label');
 for (const facet of props.facets[1].map(record)) {
  localizeString(facet,'label');
  for (const option of facet.options[1].map(record)) localizeString(option,'label');
 }
 props.locale = [0,'es'];
 island.attr('props',JSON.stringify(props));
 if (component) island.attr('component-url',component);
 if (renderGallery) {
  const html = renderGallery(deserializeProps(props),island.attr('prefix'));
  const fragment = load(html,null,false);
  fragment('link[rel=preload]').remove();
  island.html(fragment.html());
 }
}

function routePairs(dir) {
 const routes = JSON.parse(fs.readFileSync(path.join(root, 'src/data/spanishRelease.json'), 'utf8')).routes;
 return new Map(routes.map(es => {
  const en = new URL(document(dir, es)('link[hreflang="en"]').attr('href')).pathname;
  return [en, es];
 }));
}

function translatePage(enDoc, esDoc, en, routeMap, translate, options) {
 const $ = enDoc;
 const mapped = new Map([...routeMap].map(([src, dest]) => [src.replace(/\/$/, ''), dest]));
 const plain = value => {
  if (!value) return value;
  const key = clean(value);
  if (!/[A-Za-z]/.test(key) || preserve.test(key)) return value;
  return value.match(/^\s*/u)[0] + decode(translate(escape(key))) + value.match(/\s*$/u)[0];
 };
 function href(value) {
  if (!value || value.startsWith('#') || !/^(?:https?:\/\/(?:www\.)?lzz-cnc\.com\/|\/(?!\/)|[a-z][\w.-]*\/)/i.test(value)) return value;
  const url = new URL(value, origin + en);
  const match = mapped.get(url.pathname.replace(/\/$/, ''));
  if (!match) return value;
  if (match === '/es/cotizacion/') {
   const query = url.searchParams;
   if (query.has('source')) {
    const source = query.get('source');
    const matchSource = mapped.get(source.split(/[?#]/, 1)[0].replace(/\/$/, ''));
    if (matchSource) query.set('source', matchSource + source.slice(source.split(/[?#]/, 1)[0].length));
   }
   if (query.has('part')) query.set('part', plain(query.get('part')));
  }
  return (value.startsWith('http') ? origin : '') + match + url.search + url.hash;
 }
 const schemaHref = value => {
  const url = new URL(value, origin + en);
  if (url.origin === origin && url.pathname === '/' && ['#organization', '#website'].includes(url.hash)) return value;
  return href(value);
 };
 function schema(node, keepName = false) {
  if (Array.isArray(node)) return node.map(value => schema(value, keepName));
  if (!node || typeof node !== 'object') return node;
  const institution = ['Organization', 'WebSite', 'PostalAddress', 'Person'].includes(node['@type']);
  const data = Object.fromEntries(Object.entries(node).map(([key, value]) => {
   if (key === 'inLanguage' && !institution) return [key, 'es'];
   if (typeof value !== 'string') return [key, schema(value, institution)];
   if (['@id','url','item','contentUrl'].includes(key)) return [key, institution ? value : schemaHref(value)];
   return [key, textKeys.has(key) && !institution && !keepName ? plain(value) : value];
  }));
  if (typesWithDate.has(data['@type'])) data.dateModified = options.date;
  if (data['@type'] === 'WebPage') {
   data.name = esDoc('title').text().replace(/ \| LZZ Precision$/, '');
   data.description = esDoc('meta[name=description]').attr('content');
  }
  return data;
 }

 // Keep inline markup as part of a translation unit, while the page owns attributes,
 // links, dimensions and styling. Assign each inline element its original DOM node.
 function visit(element) {
  if (element.type === 'text') {
   if (element.data.includes('\n') && element.parent?.name === 'pre') {
    element.data = element.data.split(/(\r?\n)/).map(plain).join('');
   } else {
    element.data = plain(element.data);
   }
   return;
  }
  if (!element.name || element.name === 'script' || element.name === 'style') return;
  const el = $(element);
  if (el.closest('[translate="no"],[lang="en"],[data-locale-ready]').length) return;
  for (const attr of translateAttributes) if (el.attr(attr)) el.attr(attr, plain(el.attr(attr)));
  if (el.is('a[href],area[href]')) el.attr('href', href(el.attr('href')));
  if (el.is('[data-analytics-target]')) el.attr('data-analytics-target', href(el.attr('data-analytics-target')));
  if (el.is('time[datetime]')) {
   const date = el.attr('datetime');
   if (/^\d{4}-\d{2}(-\d{2})?$/.test(date) && new Date(date).getTime()) {
    el.text(new Intl.DateTimeFormat('es',{year:'numeric',month:'long',...(date.length===10?{day:'numeric'}:{}),timeZone:'UTC'}).format(new Date(date)));
    return;
   }
  }
  const children = element.children || [];
  // Related guide lists reuse the individual guide titles in different combinations.
  if (el.is('nav.rs-related')) {
   children.slice().forEach(visit);
   return;
  }
  const isInline = part => part.type === 'text' || (inline.has(part.name) && (part.children || []).every(isInline));
  if (children.length >= 2 && element.name !== 'pre' && children.every(isInline) && /[A-Za-z]/.test(el.text())) {
   const originals = [];
   function pack(node) {
    if (node.type === 'text') return escape(clean(node.data) ? node.data.replace(/\s+/gu, ' ') : node.data ? ' ' : '');
    const slot = originals.push(node) - 1;
    const tag = ['wbr','br'].includes(node.name) ? node.name : ['a','strong','b','em','i','sub','sup','code'].includes(node.name) ? node.name : 'span';
    if (tag === 'br' || tag === 'wbr') return '<'+tag+' id="x'+slot+'">';
    return '<'+tag+' id="x'+slot+'">'+node.children.map(pack).join('')+'</'+tag+'>';
   }
   const packed = children.map(pack).join('').trim();
   if (originals.length && packed.length <= 2200) {
    const translated = translate(packed);
    const fragment = load(translated, null, false);
    const tokens = fragment('[id]').toArray().map(node => fragment(node).attr('id'));
    if (tokens.length === originals.length && originals.every((_, i) => tokens.filter(token => token === 'x'+i).length === 1)) {
     for (const original of originals) {
      const entry = $(original);
      for (const attr of translateAttributes) if (entry.attr(attr)) entry.attr(attr, plain(entry.attr(attr)));
      if (entry.is('a[href]')) entry.attr('href', href(entry.attr('href')));
      if (entry.is('[data-analytics-target]')) entry.attr('data-analytics-target', href(entry.attr('data-analytics-target')));
     }
     function unpack(node) {
      if (node.type === 'text') return escape(node.data);
      const inner = (node.children || []).map(unpack).join('');
      const tagged = fragment(node).attr('id');
      const original = originals[Number(tagged?.slice(1))];
      if (!original) return inner;
      if (['br','wbr'].includes(original.name)) return $.html(original);
      return $.html($(original).clone().html(inner));
     }
     el.html(fragment.root().contents().toArray().map(unpack).join(''));
     return;
    }
   }
  }
  children.slice().forEach(visit);
 }
 const originalQuote = $('main astro-island').filter((_, el) => ($(el).attr('component-url') || '').includes('QuoteForm'));
 if (originalQuote.length) {
  const localizedQuote = esDoc('main astro-island').filter((_, el) => (esDoc(el).attr('component-url') || '').includes('QuoteForm'));
  if (localizedQuote.length !== 1) throw new Error('Missing Spanish quote form');
  originalQuote.replaceWith(esDoc.html(localizedQuote));
  const quote = $('main astro-island').attr('data-locale-ready','');
  const sourceProps = JSON.parse(originalQuote.attr('props'));
  const targetProps = JSON.parse(quote.attr('props'));
  const titles = new Map(targetProps.references[1].map(([, row]) => [row.id[1],row.title[1]]));
  targetProps.references = sourceProps.references;
  for (const [, reference] of targetProps.references[1]) {
   reference.title[1] = titles.get(reference.id[1]) || plain(reference.title[1]);
   reference.path[1] = href(reference.path[1]);
  }
  quote.attr('props',JSON.stringify(targetProps));
 }

 $('html').attr('lang', 'es');
 const partSlug = en.match(/^\/machined-parts\/gallery\/([^/]+)\/$/)?.[1];
 if (partSlug) $('main').attr('data-localized-product',partSlug);
 const shared = ['.skip-link','.brand','.lzz-language-switch','#main-nav','.menu-toggle','.lzz-footer','.site-nojs-navigation'];
 const header = $('.header-quote');
 if (header.length) header.text('Solicitar cotización').attr('href', href(header.attr('href')));
 for (const selector of ['main', '.site-image-dialog', '.site-state-note:not(main *)', '.site-connection-status']) {
  $(selector).each((_, element) => visit(element));
 }
 // Shared shell already comes from the localized rendering.
 for (const selector of shared) {
  const compiled = esDoc(selector).first();
  if (compiled.length && $(selector).length) $(selector).first().replaceWith(esDoc.html(compiled));
 }
 $('.header-quote').text('Cotizar').attr('aria-label','Solicitar cotización');
 $('.header-whatsapp').attr('aria-label','WhatsApp +86 138 5810 2479 (se abre en otra pestaña)');
 $('main astro-island[data-locale-ready]').removeAttr('data-locale-ready');
 const spanishDate = new Intl.DateTimeFormat('es',{year:'numeric',month:'long',day:'numeric',timeZone:'UTC'}).format(new Date(options.date));
 $('.rs-editorial-meta time[datetime]').attr('datetime',options.date).text(spanishDate);
 if (en === '/resources/ordering/rfq-checklist/') {
  $('a[href="/downloads/cnc-rfq-brief.txt"]').attr('href','/downloads/cnc-rfq-brief-es.txt');
  $('a[href="/downloads/order-acceptance-checklist.txt"]').attr('href','/downloads/order-acceptance-checklist-es.txt');
 }

 // Keep the English page's structured data types, media and source references.
 $('script[type="application/ld+json"]').each((_, node) => {
  const element = $(node);
  element.text(JSON.stringify(schema(JSON.parse(element.text()))).replaceAll('<','\\u003c'));
 });
 $('title').text(esDoc('title').text());
 for (const [selector, attr] of [
  ['link[rel=canonical]','href'],['meta[name=description]','content'],
  ['meta[property="og:title"]','content'],['meta[property="og:description"]','content'],['meta[property="og:url"]','content'],
 ]) $(selector).attr(attr, esDoc(selector).attr(attr));
 $('meta[property="og:image:alt"]').attr('content',plain($('meta[property="og:image:alt"]').attr('content')));
 $('meta[property="og:locale"]').remove();
 $('head').append('<meta property="og:locale" content="es">');

 localizeGallery($,plain,href,options.galleryComponent,options.renderGallery);
 $('script[type=module]:not([src])').each((_,node) => $(node).text(scriptCopy($(node).text())));
 if (options.interactionsAsset) $('script[src*="/_astro/SiteInteractions."]').attr('src',options.interactionsAsset);
 return $.html();
}

export function buildSpanish({input = path.join(root, 'dist'), output = input, messages, extract = false, date, galleryComponent, interactionsAsset} = {}) {
 const routes = routePairs(input);
 const collected = new Set();
 const missing = new Set();
 const renderGallery = extract ? undefined : galleryRenderer();
 const translate = source => {
  if (!source.includes('<')) {
   const ui = decode(source);
   if (Object.hasOwn(gallerySpanish,ui)) return escape(gallerySpanish[ui]);
  }
  if (messages && Object.hasOwn(messages, source)) return messages[source];
  if (extract) collected.add(source);
  else missing.add(source);
  return source;
 };
 const pages = [];
 for (const [en, es] of routes) {
  const html = translatePage(document(input,en),document(input,es),en,routes,translate,{date,galleryComponent,interactionsAsset,renderGallery});
  pages.push([es,html]);
 }
 if (missing.size) throw new Error('Missing '+missing.size+' Spanish translations: '+[...missing].slice(0,6).join(' | '));
 if (extract) return [...collected];
 for (const [route, html] of pages) {
  const file = path.join(output,route.slice(1),'index.html');
  fs.writeFileSync(file, annotateAnalytics(html,route).html);
 }
 return pages.length;
}

export function localizedInteractionAsset(dist) {
 const $ = document(dist,'/');
 const source = $('script[src*="/_astro/SiteInteractions."]').attr('src');
 const src = fs.readFileSync(path.join(dist,source.slice(1)),'utf8');
 const localized = scriptCopy(src);
 const hash = createHash('sha256').update(localized).digest('hex').slice(0,10);
 const target = source.replace(/\.js$/,'.es-'+hash+'.js');
 fs.writeFileSync(path.join(dist,target.slice(1)),localized);
 return target;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
 const dist = path.join(root,'dist');
 const messages = JSON.parse(fs.readFileSync(path.join(root,'src/data/es/translated-pages.json'),'utf8'));
 const {date} = JSON.parse(fs.readFileSync(path.join(root,'src/data/spanishRelease.json'),'utf8'));
 const gallery = document(dist,'/machined-parts/gallery/');
 const galleryComponent = gallery('astro-island[component-url*="PartsCatalogueExplorerRedesigned"]').attr('component-url');
 const pages = buildSpanish({input:dist,date,messages,galleryComponent,interactionsAsset:localizedInteractionAsset(dist)});
 console.log(JSON.stringify({fullSpanishPages:pages}));
}
