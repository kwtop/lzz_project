import assert from 'node:assert/strict';
import {test} from 'node:test';
import {load} from 'cheerio';
import {createSelectorMatcher,pruneStylesheet,shareStylesheets} from './optimize-css.mjs';

const html='<html><body class="redesign-site" data-reading-path="/"><nav><details class="nav-group"><summary>Menu</summary><a href="/quote/">Quote</a></details></nav><main><h1>Part</h1><p>Details</p></main></body></html>';
const prune=(css,classes=new Set())=>pruneStylesheet(css,createSelectorMatcher(load(html),classes)).css;

test('removes unrelated page scopes while retaining selector-list branches and order',()=>{
 const css='body[data-reading-path="/factory/"] h1{color:red}main h1,.unused{color:blue}main h1{color:green}';
 assert.equal(prune(css),'main h1{color:blue}main h1{color:green}');
});

test('retains hover, focus, pseudo-elements and unopened disclosure states',()=>{
 const css='a:hover{color:red}summary:focus-visible{outline:2px solid}summary::after{content:"+"}details[open]>summary{margin:1px}';
 assert.equal(prune(css),css);
});

test('retains client-rendered and dynamically assigned classes',()=>{
 const css='.inquiry-error{color:red}.px-no-results p{margin:0}.is-active a{color:blue}.unrelated{display:none}';
 assert.equal(prune(css,new Set(['inquiry-error','px-no-results','is-active'])),css.replace('.unrelated{display:none}',''));
});

test('retains runtime-created dialogs and unknown selectors conservatively',()=>{
 const css='dialog::backdrop{background:#0008}.future:unknown-state{color:red}[data-state="ready"]{opacity:1}';
 assert.equal(prune(css),css);
});

test('keeps responsive branches, supports, fonts and keyframes independently of viewport',()=>{
 const css='@font-face{font-family:X;src:url(x.woff2)}@media(max-width:767px){h1{font-size:30px}.unused{color:red}}@supports(display:grid){main{display:grid}}@keyframes fade{from{opacity:0}to{opacity:1}}';
 assert.equal(prune(css),css.replace('.unused{color:red}',''));
});

test('removes empty media wrappers without deleting layer-order statements',()=>{
 assert.match(prune('@layer base,utilities;@media(max-width:767px){.unused{display:block}}'),/^@layer base,utilities;?$/);
});

test('preserves nesting when its parent matches and removes an impossible parent',()=>{
 assert.equal(prune('main{color:red;& p:hover{color:blue}}.unused{& p{color:red}}'),'main{color:red;& p:hover{color:blue}}');
});

test('preserves specificity from an unmatched parent branch in nested selectors',()=>{
 const css='#absent,main{& h1{color:red}@media(max-width:767px){& p{color:blue}}}';
 assert.equal(prune(css),css);
});

test('shares whole rules without changing cascade order, conditions or relative font URLs',()=>{
 const shared='@font-face{font-family:X;src:url(./x.woff2)}@layer navigation{a:hover{color:red}}@media(max-width:767px){a{padding:20px}}';
 const styles=['a{color:blue}'+shared+'a{color:green}','a{color:black}'+shared+'a{color:orange}'];
 const chunks=shareStylesheets(styles,{minSharedBytes:1,maxGzipGrowth:Infinity});
 for(const css of styles){
  assert.deepEqual(chunks.get(css),[css.slice(0,css.indexOf(shared)),shared,css.slice(css.indexOf(shared)+shared.length)]);
  assert.equal(chunks.get(css).join(''),css);
 }
});

test('does not regroup common rules that have page-specific declarations between them',()=>{
 const styles=['.a{color:red}.b{color:blue}.c{color:green}','.a{color:red}.other{display:grid}.b{color:blue}.c{color:green}'];
 for(const [css,chunks] of shareStylesheets(styles,{minSharedBytes:1,maxGzipGrowth:Infinity}))assert.equal(chunks.join(''),css);
});

test('leaves small files, namespaces and costly cold-load splits intact',()=>{
 const styles=['.a{color:red}.nav{color:green}.b{color:blue}','.a{color:black}.nav{color:green}.b{color:orange}'];
 for(const [css,chunks] of shareStylesheets(styles))assert.deepEqual(chunks,[css]);
 for(const [css,chunks] of shareStylesheets(styles,{minSharedBytes:1,maxGzipGrowth:0}))assert.deepEqual(chunks,[css]);
 const namespaced=styles.map(css=>'@namespace svg url(http://www.w3.org/2000/svg);'+css);
 for(const [css,chunks] of shareStylesheets(namespaced,{minSharedBytes:1,maxGzipGrowth:Infinity}))assert.deepEqual(chunks,[css]);
});
