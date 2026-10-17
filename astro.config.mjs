import {defineConfig} from 'astro/config';
import react from '@astrojs/react';
import siteRedirects from './src/data/siteRouteRedirects.json' with {type:'json'};
// Resources uses canonical-only nested routes; its retired addresses have no redirect rules.
// These compatibility pages preserve gallery filters and fragments in static previews.
// build-seo.mjs still exports their permanent redirects for a future hosting release.
const redirects=Object.fromEntries(Object.entries(siteRedirects).filter(([from])=>
  from!=='/products/'&&!from.startsWith('/products/part-examples/')&&!from.startsWith('/products/machining-studies/')
));
// Keep check/build dependency optimization from removing live preview modules.
/** @type {import('astro').AstroIntegration} */
const commandCache={
  name:'lzz-command-cache',
  hooks:{'astro:config:setup':({command,updateConfig})=>{
    updateConfig({vite:{cacheDir:`node_modules/.vite-lzz-${command}`}});
  }},
};
export default defineConfig({site:'https://www.lzz-cnc.com', integrations:[commandCache,react()], redirects, output:'static', trailingSlash:'always', devToolbar:{enabled:false}});
