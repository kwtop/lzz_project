import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {load} from 'cheerio';

const project = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(project, 'docs/minimalism-2026-10-01');
const dist = path.join(project, 'dist');
const expectedRouteCount = 81;
if (process.argv.includes('--help')) {
  console.log('Run node scripts/audit-minimalism.mjs [after] after the build. Reads the minimalism baseline and current dist; writes only after-render.json and invariants.json in docs/minimalism-2026-10-01.');
  process.exit(0);
}
if (process.argv.slice(2).some(argument => argument !== 'after')) {
  throw new Error('Use node scripts/audit-minimalism.mjs [after], or --help.');
}

const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, ''));
const before = readJson(path.join(output, 'before-render.json'));
const sourceBefore = readJson(path.join(output, 'source-before.json'));
if (!Array.isArray(before) || !Array.isArray(sourceBefore)) throw new Error('Baseline files must be arrays.');
const failures = [];
const warnings = [];
const fail = (code, detail, extra = {}) => failures.push({code, detail, ...extra});
const slash = value => value.replaceAll('\\', '/');
const routeKey = value => value.replace(/\/index\.html$/, '/').replace(/\/+$/, '') || '/';
const normalizedText = value => value.replace(/\s+/g, ' ').trim();
const textNodes = node => node.type === 'text' ? [node.data] : node.children?.flatMap(textNodes) || [];
const wordsFor = text => {
  const words = {};
  for (const word of text.toLowerCase().match(/[\p{L}\p{N}]+(?:['’–-][\p{L}\p{N}]+)*/gu) || []) words[word] = (words[word] || 0) + 1;
  return words;
};
const canonicalJson = value => Array.isArray(value) ? value.map(canonicalJson)
  : value && typeof value === 'object' ? Object.fromEntries(Object.keys(value).sort().map(key => [key, canonicalJson(value[key])])) : value;
const schemaSignature = (scripts, route, snapshot) => (scripts || []).map((script, index) => {
  try { return JSON.stringify(canonicalJson(JSON.parse(script))); }
  catch (error) { fail('invalid-schema', error.message, {route, snapshot, index}); return script; }
}).sort();
const countsFor = values => {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) || 0) + 1);
  return counts;
};
const countDifference = (oldValues, newValues) => {
  const oldCounts = countsFor(oldValues);
  const newCounts = countsFor(newValues);
  const removed = [];
  const added = [];
  for (const [value, count] of oldCounts) if (count > (newCounts.get(value) || 0)) removed.push({value, count: count - (newCounts.get(value) || 0), beforeCount: count, afterCount: newCounts.get(value) || 0});
  for (const [value, count] of newCounts) if (count > (oldCounts.get(value) || 0)) added.push({value, count: count - (oldCounts.get(value) || 0), beforeCount: oldCounts.get(value) || 0, afterCount: count});
  return {removed, added};
};

const sitemapFile = path.join(dist, 'sitemap.xml');
const sitemap = load(fs.readFileSync(sitemapFile, 'utf8'), {xmlMode: true});
const sitemapUrls = sitemap('loc').map((_, element) => sitemap(element).text().trim()).get();
const routes = [];
const siteOrigins = new Set();
for (const value of sitemapUrls) {
  try { const url = new URL(value); siteOrigins.add(url.origin); routes.push(url.pathname); }
  catch (error) { fail('invalid-sitemap-url', error.message, {url: value}); }
}
for (const row of before) if (row.seo?.canonical) {
  try { siteOrigins.add(new URL(row.seo.canonical).origin); }
  catch (error) { fail('invalid-baseline-canonical', error.message, {route: row.route}); }
}
const siteOrigin = siteOrigins.values().next().value;
if (!siteOrigin) throw new Error('No site origin could be read from the sitemap or baseline.');

const localPath = (root, urlPath) => {
  let decoded;
  try { decoded = decodeURIComponent(urlPath); } catch { return null; }
  const result = path.resolve(root, '.' + decoded);
  return result === root || result.startsWith(root + path.sep) ? result : null;
};
const htmlPathFor = pathname => {
  const local = localPath(dist, pathname);
  if (!local) return null;
  const candidates = pathname.endsWith('.html') ? [local]
    : [path.join(local, 'index.html'), local + '.html'];
  return candidates.find(file => fs.existsSync(file) && fs.statSync(file).isFile()) || null;
};
const documents = new Map();
const aliases = new Map();
const parseDocument = (file, route) => {
  if (documents.has(file)) return documents.get(file);
  const $ = load(fs.readFileSync(file, 'utf8'));
  const document = {
    file, route, $,
    ids: new Set($('[id]').map((_, element) => $(element).attr('id')).get()),
    canonical: $('link[rel=canonical]').attr('href'),
  };
  documents.set(file, document);
  aliases.set(routeKey(route), document);
  if (document.canonical) {
    try {
      const canonical = new URL(document.canonical, siteOrigin);
      if (siteOrigins.has(canonical.origin)) aliases.set(routeKey(canonical.pathname), document);
    } catch (error) { fail('invalid-canonical', error.message, {route}); }
  }
  return document;
};
const rows = [];
for (const route of routes) {
  const file = htmlPathFor(route);
  if (!file) { fail('missing-route-html', 'Sitemap route has no built HTML file.', {route}); continue; }
  const {$} = parseDocument(file, route);
  const main = $('main').clone();
  main.find('script,style,template,noscript').remove();
  const text = normalizedText(main.toArray().flatMap(textNodes).join(' '));
  const images = main.find('img[src]').map((_, element) => ({
    src: $(element).attr('src'), alt: $(element).attr('alt') || '',
    origin: $(element).attr('data-image-origin') || $(element).closest('[data-image-origin]').attr('data-image-origin') || '',
  })).get();
  rows.push({
    route,
    seo: {
      title: $('title').text(), description: $('meta[name=description]').attr('content'),
      canonical: $('link[rel=canonical]').attr('href'),
      schema: $('script[type="application/ld+json"]').map((_, element) => $(element).text()).get(),
    },
    template: $('body').attr('data-page-template'),
    h1: main.find('h1').map((_, element) => normalizedText($(element).text())).get(),
    text, words: wordsFor(text), images,
    ids: [...main.map((_, element) => $(element).attr('id')).get().filter(Boolean), ...main.find('[id]').map((_, element) => $(element).attr('id')).get()],
    hrefs: main.find('a[href]').map((_, element) => $(element).attr('href')).get(),
    allHrefs: $('a[href]').map((_, element) => $(element).attr('href')).get(),
    toc: main.find('.page-contents-disclosure a[href]').map((_, element) => $(element).attr('href')).get(),
  });
}

const beforeByRoute = new Map(before.map(row => [routeKey(row.route), row]));
const afterByRoute = new Map(rows.map(row => [routeKey(row.route), row]));
const routeDiff = {
  added: rows.filter(row => !beforeByRoute.has(routeKey(row.route))).map(row => row.route),
  removed: before.filter(row => !afterByRoute.has(routeKey(row.route))).map(row => row.route),
  duplicateBaseline: [...countsFor(before.map(row => routeKey(row.route)))].filter(([, count]) => count > 1).map(([route, count]) => ({route, count})),
  duplicateSitemap: [...countsFor(routes.map(routeKey))].filter(([, count]) => count > 1).map(([route, count]) => ({route, count})),
};
if (before.length !== expectedRouteCount) fail('baseline-route-count', `Expected ${expectedRouteCount} baseline routes, got ${before.length}.`);
if (routes.length !== expectedRouteCount || rows.length !== expectedRouteCount) fail('route-count', `Expected ${expectedRouteCount} routes; sitemap has ${routes.length}, captured HTML has ${rows.length}.`);
for (const route of routeDiff.added) fail('added-route', 'Route was not in the baseline.', {route});
for (const route of routeDiff.removed) fail('removed-route', 'Baseline route is missing.', {route});
for (const entry of [...routeDiff.duplicateBaseline, ...routeDiff.duplicateSitemap]) fail('duplicate-route', 'Duplicate normalized route.', entry);

const families = {decision: 0, read: 0, operate: 0};
const idChanges = [];
const linkChanges = [];
const imageChanges = [];
const textChanges = [];
for (const row of rows) {
  if (Object.hasOwn(families, row.template)) families[row.template]++;
  else fail('invalid-page-template', 'Expected decision, read or operate.', {route: row.route, actual: row.template ?? null});
  if (row.h1.length !== 1) fail('h1-count', 'Expected exactly one main H1.', {route: row.route, actual: row.h1});
  const old = beforeByRoute.get(routeKey(row.route));
  if (!old) continue;
  if (row.template !== old.template) fail('changed-page-template', 'Page template differs from the baseline.', {route: row.route, before: old.template, after: row.template});
  if (JSON.stringify(row.h1) !== JSON.stringify(old.h1)) fail('changed-h1', 'Main H1 text differs from the baseline.', {route: row.route, before: old.h1, after: row.h1});
  for (const field of ['title', 'description', 'canonical']) if (row.seo[field] !== old.seo[field]) fail('changed-seo', `SEO ${field} differs from the baseline.`, {route: row.route, field, before: old.seo[field] ?? null, after: row.seo[field] ?? null});
  if (JSON.stringify(schemaSignature(row.seo.schema, row.route, 'after')) !== JSON.stringify(schemaSignature(old.seo.schema, row.route, 'before'))) fail('changed-schema', 'JSON-LD values differ from the baseline.', {route: row.route});
  const removedIds = [...new Set(old.ids)].filter(id => !row.ids.includes(id));
  const addedIds = [...new Set(row.ids)].filter(id => !old.ids.includes(id));
  if (removedIds.length || addedIds.length) idChanges.push({route: row.route, removed: removedIds, added: addedIds});
  for (const id of removedIds) fail('removed-main-id', 'Existing main ID is missing.', {route: row.route, id});
  const links = countDifference(old.hrefs, row.hrefs);
  if (links.removed.length || links.added.length) linkChanges.push({route: row.route,
    removed: links.removed.map(({value: href, ...change}) => ({href, ...change, kind: change.afterCount ? 'reduced-repeat' : 'removed-destination'})),
    added: links.added.map(({value: href, ...change}) => ({href, ...change, kind: change.beforeCount ? 'increased-repeat' : 'new-destination'})),
  });
  const imageKey = image => JSON.stringify({src: image.src, alt: image.alt || '', origin: image.origin || ''});
  const images = countDifference(old.images.map(imageKey), row.images.map(imageKey));
  if (images.removed.length || images.added.length) imageChanges.push({route: row.route,
    removed: images.removed.map(({value, ...change}) => ({image: JSON.parse(value), ...change, srcStillUsed: row.images.some(image => image.src === JSON.parse(value).src)})),
    added: images.added.map(({value, ...change}) => ({image: JSON.parse(value), ...change, srcPreviouslyUsed: old.images.some(image => image.src === JSON.parse(value).src)})),
  });
  const removedWords = Object.entries(old.words).filter(([word, count]) => (row.words[word] || 0) < count).map(([word, count]) => ({word, count: count - (row.words[word] || 0), beforeCount: count, afterCount: row.words[word] || 0}));
  const addedWords = Object.entries(row.words).filter(([word, count]) => (old.words[word] || 0) < count).map(([word, count]) => ({word, count: count - (old.words[word] || 0), beforeCount: old.words[word] || 0, afterCount: count}));
  if (old.text !== row.text) textChanges.push({route: row.route,
    beforeWords: Object.values(old.words).reduce((sum, count) => sum + count, 0),
    afterWords: Object.values(row.words).reduce((sum, count) => sum + count, 0),
    textOrOrderChanged: true, removed: removedWords, added: addedWords,
  });
}

const anchorChecks = {linksSeen: 0, externalOrNonHttp: 0, internalDestinations: 0, fragmentLinks: 0, samePageFragments: 0, crossPageFragments: 0, failures: []};
const mediaChecks = {referencesSeen: 0, localReferences: 0, externalOrEmbedded: 0, missing: []};
const internalUrl = (value, route) => {
  try {
    const url = new URL(value, new URL(route, siteOrigin));
    return ['http:', 'https:'].includes(url.protocol) && siteOrigins.has(url.origin) ? url : null;
  } catch { return undefined; }
};
const destinationFor = url => {
  const alias = aliases.get(routeKey(url.pathname));
  if (alias) return {document: alias};
  const htmlFile = htmlPathFor(url.pathname);
  if (htmlFile) return {document: parseDocument(htmlFile, url.pathname)};
  const file = localPath(dist, url.pathname);
  return file && fs.existsSync(file) && fs.statSync(file).isFile() ? {file} : null;
};
for (const row of rows) {
  const current = aliases.get(routeKey(row.route));
  for (const href of row.allHrefs) {
    anchorChecks.linksSeen++;
    const url = internalUrl(href, row.seo.canonical || row.route);
    if (url === null) { anchorChecks.externalOrNonHttp++; continue; }
    if (!url) { const issue = {route: row.route, href, reason: 'Invalid URL.'}; anchorChecks.failures.push(issue); fail('invalid-link-url', issue.reason, issue); continue; }
    anchorChecks.internalDestinations++;
    const target = destinationFor(url);
    if (!target) { const issue = {route: row.route, href, targetPath: url.pathname, reason: 'Internal destination has no built HTML or file.'}; anchorChecks.failures.push(issue); fail('missing-internal-destination', issue.reason, issue); continue; }
    if (!url.hash || url.hash === '#') continue;
    anchorChecks.fragmentLinks++;
    if (target.document === current) anchorChecks.samePageFragments++; else anchorChecks.crossPageFragments++;
    let id;
    try { id = decodeURIComponent(url.hash.slice(1)); }
    catch { id = url.hash.slice(1); }
    // Text fragments use browser text matching, not element IDs.
    const marker = id.indexOf(':~:text=');
    if (marker === 0) { warnings.push({code: 'text-fragment-not-verified', route: row.route, href}); continue; }
    if (marker > 0) id = id.slice(0, marker);
    if (!target.document?.ids.has(id)) { const issue = {route: row.route, href, targetPath: url.pathname, id, reason: 'Fragment ID does not exist in the target HTML.'}; anchorChecks.failures.push(issue); fail('broken-internal-anchor', issue.reason, issue); }
  }
  const {$} = current;
  const media = [];
  $('img[src],video[src],audio[src],source[src]').each((_, element) => media.push({tag: element.tagName, attribute: 'src', url: $(element).attr('src')}));
  $('video[poster]').each((_, element) => media.push({tag: 'video', attribute: 'poster', url: $(element).attr('poster')}));
  $('img[srcset],source[srcset]').each((_, element) => {
    const srcset = $(element).attr('srcset') || '';
    if (srcset.startsWith('data:')) { mediaChecks.externalOrEmbedded++; return; }
    for (const candidate of srcset.split(',')) {
      const value = candidate.trim().split(/\s+/)[0];
      if (value) media.push({tag: element.tagName, attribute: 'srcset', url: value});
    }
  });
  for (const reference of media) {
    mediaChecks.referencesSeen++;
    const url = internalUrl(reference.url, row.seo.canonical || row.route);
    if (url === null) { mediaChecks.externalOrEmbedded++; continue; }
    mediaChecks.localReferences++;
    const file = url && localPath(dist, url.pathname);
    if (!file || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
      const issue = {route: row.route, ...reference, reason: 'Referenced local media file is missing from dist.'};
      mediaChecks.missing.push(issue); fail('missing-media-file', issue.reason, issue);
    }
  }
}

const walk = directory => !fs.existsSync(directory) ? [] : fs.readdirSync(directory, {withFileTypes: true}).sort((a, b) => a.name.localeCompare(b.name)).flatMap(entry => {
  const file = path.join(directory, entry.name);
  return entry.isDirectory() ? walk(file) : entry.isFile() ? [file] : [];
});
const sourceRoots = [...new Set(sourceBefore.map(entry => slash(entry.path).split('/')[0]))];
if (sourceRoots.some(root => root !== 'src')) throw new Error('Unexpected source baseline root; this audit compares src only.');
const currentSource = walk(path.join(project, 'src')).map(file => ({path: slash(path.relative(project, file)), sha256: createHash('sha256').update(fs.readFileSync(file)).digest('hex').toUpperCase()}));
const sourceOld = new Map(sourceBefore.map(entry => [slash(entry.path), entry.sha256.toUpperCase()]));
const sourceNew = new Map(currentSource.map(entry => [entry.path, entry.sha256]));
const sourceChanges = {
  scope: ['src'], beforeFiles: sourceBefore.length, afterFiles: currentSource.length,
  modified: currentSource.filter(entry => sourceOld.has(entry.path) && sourceOld.get(entry.path) !== entry.sha256).map(entry => ({path: entry.path, beforeSha256: sourceOld.get(entry.path), afterSha256: entry.sha256})),
  added: currentSource.filter(entry => !sourceOld.has(entry.path)),
  deleted: sourceBefore.filter(entry => !sourceNew.has(slash(entry.path))).map(entry => ({path: slash(entry.path), sha256: entry.sha256.toUpperCase()})),
};
const dataChanges = ['modified', 'added', 'deleted'].flatMap(kind => sourceChanges[kind].filter(entry => entry.path.startsWith('src/data/')).map(entry => ({kind, ...entry})));
for (const change of dataChanges) fail('changed-source-data', 'Source data must remain byte-for-byte unchanged.', change);
const protectedData = {beforeFiles: sourceBefore.filter(entry => slash(entry.path).startsWith('src/data/')).length, afterFiles: currentSource.filter(entry => entry.path.startsWith('src/data/')).length, changes: dataChanges, unchanged: dataChanges.length === 0};
const publicMediaRoot = path.join(project, 'public/media');
const publicMedia = {filesPresent: walk(publicMediaRoot).length, baselineHashesAvailable: false, byteComparison: 'not-established'};

const report = {
  generatedAt: new Date().toISOString(),
  baseline: 'docs/minimalism-2026-10-01/before-render.json',
  sourceBaseline: 'docs/minimalism-2026-10-01/source-before.json',
  distSitemapModifiedAt: fs.statSync(sitemapFile).mtime.toISOString(),
  routes: rows.length, expectedRoutes: expectedRouteCount, families,
  failures, warnings, routeDiff, idChanges, anchorChecks, mediaChecks,
  protectedData, publicMedia, sourceChanges,
  linkChanges, imageChanges, textChanges,
  reviewOnlyFields: ['linkChanges', 'imageChanges', 'textChanges'],
  limitations: [
    'Captures current static dist only; does not run a build, browser, network request or prove dist freshness.',
    'Text and word counts include closed details and responsive alternatives; they do not measure default visible reading length.',
    'Main links/images/words are compared with the baseline. Removed repeats and approved decorative media are review records, not hard failures.',
    'Current internal links and fragment IDs are checked across all sitemap HTML, with trailing slash/index.html and declared canonical path aliases normalized. JavaScript-created destinations and text-fragment matching are not verified.',
    'Local DOM image, srcset, video, audio, source and poster files are checked in dist; CSS backgrounds, external URL availability and hydrated media are not verified.',
    'Source hashes cover src only; src/data additions, modifications and deletions fail. The newly added audit script is outside that baseline scope.',
    'No starting public/media byte hashes were recorded for this pass. Referenced files are checked for existence; complete before/after media-byte preservation is not established.',
    'Word and image diffs do not determine whether a removed sentence contains a unique fact; review the recorded diffs and before/after source when assessing content fidelity.',
  ],
};
fs.mkdirSync(output, {recursive: true});
fs.writeFileSync(path.join(output, 'after-render.json'), JSON.stringify(rows, null, 2) + '\n');
fs.writeFileSync(path.join(output, 'invariants.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({
  routes: rows.length, families, failures: failures.length,
  failureCodes: [...new Set(failures.map(failure => failure.code))], warnings: warnings.length,
  anchorFailures: anchorChecks.failures.length, missingMedia: mediaChecks.missing.length,
  sourceDataUnchanged: protectedData.unchanged,
  changedSourceFiles: sourceChanges.modified.length, addedSourceFiles: sourceChanges.added.length, deletedSourceFiles: sourceChanges.deleted.length,
  linkChangePages: linkChanges.length, imageChangePages: imageChanges.length, textChangePages: textChanges.length,
  publicMediaByteComparison: publicMedia.byteComparison,
  report: slash(path.relative(project, path.join(output, 'invariants.json'))),
}, null, 2));
if (failures.length) process.exitCode = 1;
