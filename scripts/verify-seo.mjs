import fs from 'node:fs';
import path from 'node:path';
import {load} from 'cheerio';
import {SITE, DIST, migration, htmlPages, eligiblePages, redirectText, robotsText, companyRedirects} from './build-seo.mjs';

const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
const pages = htmlPages();
const {rules, targets, discovered, catalog} = migration();
const seen = {title:new Map(), description:new Map()};
for (const [route, {$, excluded}] of pages) {
  if(companyRedirects[route]) {
    check($('meta[http-equiv="refresh" i]').attr('content')?.includes(companyRedirects[route]), `${route}: missing redirect refresh destination`);
    check(/noindex/i.test($('meta[name="robots" i]').attr('content')||''), `${route}: redirect shell must be noindex`);
    continue;
  }
  const title = $('head title');
  const description = $('meta[name="description" i]');
  const canonical = $('link[rel="canonical"]');
  check(title.length === 1 && title.text().trim(), `${route}: expected one nonempty title`);
  check(description.length === 1 && description.attr('content')?.trim(), `${route}: expected one nonempty description`);
  check((excluded && canonical.length === 0) || (canonical.length === 1 && canonical.attr('href') === SITE + route), `${route}: canonical must be unique and self-referencing on production origin`);
  if (/^\/404(?:\.html|\/)$/.test(route)) check(/(?:noindex|none)/i.test($('meta[name="robots" i]').attr('content') || ''), `${route}: 404 needs explicit noindex`);
  for (const [key, value] of [['title', title.text().trim()], ['description', description.attr('content')?.trim()]]) {
    if (excluded || !value) continue;
    check(!seen[key].has(value), `${route}: duplicate ${key} with ${seen[key].get(value)}`);
    seen[key].set(value, route);
  }
  const scripts = $('script[type="application/ld+json"]');
  if (!excluded) check(scripts.length > 0, `${route}: no JSON-LD in built static HTML`);
  scripts.each((_, el) => {
    try {
      const data = JSON.parse($(el).text());
      const objects = Array.isArray(data) ? data : [data];
      check(objects.length > 0 && objects.every(x => x && typeof x === 'object' && x['@context'] && (x['@type'] || Array.isArray(x['@graph']))), `${route}: JSON-LD lacks context/type/graph`);
    } catch (error) { errors.push(`${route}: invalid JSON-LD: ${error.message}`); }
  });
}
const actual = fs.readFileSync(path.join(DIST, '_redirects'), 'utf8');
check(actual === redirectText(rules), '_redirects differs from evidence-derived rules (missing/extra/stale rules)');
const actualRules = new Map();
for (const line of actual.split(/\r?\n/).filter(l => l.trim() && !l.startsWith('#'))) {
  const [from, to, status, ...extra] = line.trim().split(/\s+/);
  check(status === '301' && !extra.length, `Invalid redirect syntax: ${line}`);
  check(!actualRules.has(from), `Duplicate redirect: ${from}`);
  actualRules.set(from, to);
}
for (const [from, to] of actualRules) {
  const destination = to.split('#')[0];
  check(pages.has(destination) && !pages.get(destination).excluded, `Missing/noindex redirect destination: ${from} -> ${to}`);
  const visited = new Set([from]);
  let next = to;
  while (actualRules.has(next) && !visited.has(next)) { visited.add(next); next = actualRules.get(next); }
  check(!visited.has(next), `Redirect loop: ${from}`);
  check(!actualRules.has(to), `Redirect chain: ${from}`);
}
for (const source of discovered) {
  const from = new URL(source).pathname;
  const target = targets.get(source);
  check(target && (from === target ? pages.has(target) : actualRules.get(from) === target), `Uncovered raw URL: ${source}`);
}
check(catalog.products.length === 35, 'Expected 35 catalog products');
check(catalog.products.flatMap(p => p.sourceAliases).length === 53, 'Expected 53 product aliases');
check(catalog.categories.length === 10 && catalog.articles.length === 2, 'Expected 10 categories and 2 articles');
check([...rules.keys()].filter(p => /^\/product(?:-category|\/category)\//.test(p)).length === 20, 'Expected both observed routes for 10 categories');
const xml = load(fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8'), {xmlMode:true});
const urls = xml('urlset > url > loc').map((_, el) => xml(el).text()).get();
const expected = eligiblePages(pages).map(p => SITE + p);
check(xml('urlset').attr('xmlns') === 'http://www.sitemaps.org/schemas/sitemap/0.9', 'Invalid sitemap namespace');
check(new Set(urls).size === urls.length, 'Duplicate sitemap URLs');
check(JSON.stringify([...urls].sort()) === JSON.stringify(expected), 'Sitemap differs from canonical/indexable dist HTML');
check(urls.length > 0, 'Empty sitemap');
check(fs.readFileSync(path.join(DIST, 'robots.txt'), 'utf8') === robotsText, 'robots.txt differs from production crawl intent');
console.log(`Checked ${pages.size} HTML, ${rules.size} evidence-derived redirect rules, ${discovered.size} discovered URLs (${catalog.products.length} products / 53 aliases, 10 categories / 20 routes, 2 articles).`);
if (errors.length) { console.error(errors.join('\n')); console.error(`SEO verification failed: ${errors.length} issues`); process.exitCode = 1; }
else console.log(`SEO verified locally: ${pages.size} HTML, ${urls.length} sitemap URLs, ${rules.size} redirects, ${discovered.size} raw URLs covered. Host behavior not tested.`);
