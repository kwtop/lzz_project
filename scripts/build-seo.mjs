import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {load} from 'cheerio';

export const ROOT = fileURLToPath(new URL('../', import.meta.url));
export const SITE = 'https://www.lzz-cnc.com';
export const DIST = path.join(ROOT, 'dist');
const readJSON = file => JSON.parse(fs.readFileSync(file, 'utf8'));
export const companyRedirects=readJSON(path.join(ROOT,'src/data/siteRouteRedirects.json'));
export const resourceRoutes=readJSON(path.join(ROOT,'src/data/resourceRoutes.json'));

function sourceURLs() {
  const raw = path.resolve(ROOT, process.env.LZZ_CONTENT_ROOT || '../../raw/_content');
  if (process.env.LZZ_CONTENT_ROOT || fs.existsSync(raw)) {
    const manifest = readJSON(path.join(raw, '_meta/page-manifest.json'));
    const xml = load(fs.readFileSync(path.join(raw, 'sources/sitemap.xml'), 'utf8'), {xmlMode:true});
    return [...manifest.map(p => p.url), ...xml('loc').map((_, el) => xml(el).text().trim()).get()];
  }
  // A fresh clone uses the public URL inventory, without the local content archive.
  const evidence = readJSON(path.join(ROOT, 'src/data/legacyUrlEvidence.json'));
  if (evidence.version !== 1 || evidence.site !== SITE || !Array.isArray(evidence.urls) || !evidence.urls.length) {
    throw new Error('Invalid legacy URL evidence snapshot.');
  }
  return evidence.urls;
}

// Source data is only read. Unknown URLs fail closed instead of falling back to home.
export function migration() {
  const catalog = readJSON(path.join(ROOT, 'src/data/catalog.json'));
  const discovered = new Set(sourceURLs());
  const targets = new Map();
  const add = (source, target) => {
    const url = new URL(source);
    if (url.origin !== SITE || url.hash) throw new Error(`Unexpected source: ${source}`);
    if (targets.has(source) && targets.get(source) !== target) throw new Error(`Conflicting target: ${source}`);
    targets.set(source, target);
  };
  for (const p of catalog.products) for (const source of new Set([p.source, ...p.sourceAliases])) {
    if (!discovered.has(source)) throw new Error(`Catalog alias absent from raw evidence: ${source}`);
    add(source, `/machined-parts/gallery/${p.slug}/`);
  }
  for (const a of catalog.articles) {
    const slug=resourceRoutes.sourceArticleAliases[a.slug]||a.slug;
    const target=resourceRoutes.guides[slug]||companyRedirects['/resources/'+a.slug+'/'];
    if(!target)throw new Error('Unknown source article destination: '+a.slug);
    add(a.source,target);
  }
  const staticTargets = {
    '/':'/', '/about':'/about/', '/product':'/machined-parts/gallery/', '/article':'/resources/',
    '/contact':'/about/contact/', '/custom/factory':'/factory/',
    '/custom/advantage':'/about/company-profile/', '/custom/download':'/about/company-profile/#documents',
  };
  for (const source of discovered) {
    if (targets.has(source)) continue;
    const {pathname} = new URL(source);
    const category = catalog.categories.find(c => pathname === `/product-category/${c.key}` || pathname === `/product/category/${c.key}`);
    if (category) add(source, `/capabilities/${category.slug}/`);
    else if (staticTargets[pathname]) add(source, staticTargets[pathname]);
    else if (/^\/article(?:-category|\/category)\/(Company-Information|Product-Information)$/.test(pathname)) add(source, '/resources/');
    else throw new Error(`Unmapped discovered URL: ${source}`);
  }
  const rules = new Map();
  for (const [source, target] of targets) {
    const from = new URL(source).pathname;
    if (from === target) continue;
    if (rules.has(from) && rules.get(from) !== target) throw new Error(`Query-dependent mapping cannot be represented: ${source}`);
    rules.set(from, target);
  }
  for (const [from,to] of Object.entries(companyRedirects)) rules.set(from,to);
  return {catalog, discovered, targets, rules:new Map([...rules].sort(([a], [b]) => a.localeCompare(b)))};
}

export function htmlPages() {
  const pages = new Map();
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, {withFileTypes:true})) {
      const file = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(file);
      else if (entry.name.endsWith('.html')) {
        const relative = path.relative(DIST, file).split(path.sep).join('/');
        const route = '/' + relative.replace(/(^|\/)index\.html$/, '$1');
        const $ = load(fs.readFileSync(file, 'utf8'));
        const robots = $('meta').filter((_, el) => /^(robots|googlebot|bingbot)$/i.test($(el).attr('name') || '')).map((_, el) => $(el).attr('content') || '').get().join(',');
        const excluded = Boolean(companyRedirects[route]) || /(?:^|\/)(?:404|500)(?:\.html|\/)$/.test(route) || /(?:^|[\s,;])(noindex|none)(?:$|[\s,;])/i.test(robots);
        pages.set(route, {$, excluded, file});
      }
    }
  }
  walk(DIST);
  if (!pages.has('/')) throw new Error('dist/index.html missing; run the Astro build first.');
  return pages;
}

export function eligiblePages(pages) {
  return [...pages].filter(([route, {$, excluded}]) => {
    const canonical = $('link[rel="canonical"]');
    return !excluded && canonical.length === 1 && canonical.attr('href') === SITE + route;
  }).map(([route]) => route).sort();
}

export function redirectText(rules) {
  return '# Generated from catalog + raw sitemap/page-manifest. Host must execute these rules.\n' +
    [...rules].map(([from, to]) => `${from} ${to} 301`).join('\n') + '\n';
}
export const robotsText = `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`;
const escapeXML = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export function buildSEO() {
  const {rules, targets, catalog} = migration();
  const pages = htmlPages();
  for (const [from, to] of rules) {
    const destination = to.split('#')[0];
    if (!pages.has(destination) || pages.get(destination).excluded) throw new Error(`Redirect target missing/noindex: ${from} -> ${to}`);
    if (rules.has(to)) throw new Error(`Redirect chain or loop: ${from} -> ${to}`);
  }
  const eligible = eligiblePages(pages);
  const invalid = [...pages].filter(([route, p]) => !p.excluded && !eligible.includes(route));
  if (!eligible.length || invalid.length) throw new Error(`Sitemap build blocked: missing/invalid canonical on ${invalid.map(([r]) => r).join(', ') || 'all pages'}`);
  const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    eligible.map(route => `  <url><loc>${escapeXML(SITE + route)}</loc></url>`).join('\n') + '\n</urlset>\n';
  fs.writeFileSync(path.join(DIST, '_redirects'), redirectText(rules));
  fs.writeFileSync(path.join(DIST, 'robots.txt'), robotsText);
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap);
  console.log(JSON.stringify({products:catalog.products.length, discoveredURLs:targets.size, redirects:rules.size, sitemapURLs:eligible.length, excludedOrInvalidCanonical:pages.size-eligible.length}));
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) buildSEO();
