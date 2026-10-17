import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const id = process.argv[2];
if (!id || !/^[a-f0-9]{8}$/.test(id)) throw new Error('Provide an opaque eight-character capture ID');
const screenDir = path.resolve('docs/b2b-refinement/screens', id);
const manifestDir = path.resolve('docs/b2b-refinement/manifests');
fs.mkdirSync(screenDir, { recursive: true });
fs.mkdirSync(manifestDir, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const origin = 'http://127.0.0.1:4323';
const manifest = [];
const routes = [
  { name: 'home', url: '/', regions: [['parts', '#selected-parts'], ['factory', '.ed-factory'], ['studies', '.ed-cases']] },
  { name: 'catalog', url: '/machined-parts/', regions: [['parts', '.product-grid']] },
  { name: 'part', url: '/machined-parts/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/', regions: [['engineering', '#engineering-review']] },
  { name: 'applications', url: '/cases/', regions: [['study', '.cases-grid']] },
  { name: 'application-study', url: '/cases/five-axis-machining-multi-face-parts/', regions: [['evidence', '.case-sections']] },
  { name: 'custom-capabilities', url: '/capabilities/', regions: [['services', '#machining-processes']] },
  { name: 'prototype', url: '/capabilities/prototype-machining/' },
  { name: 'factory', url: '/factory/', regions: [['equipment', '#equipment'], ['workshop', '#workshop-photographs']] },
  { name: 'quality', url: '/quality/', regions: [['inspection', '#inspection-equipment'], ['records', '#inspection-records'], ['qualification', '#quality-management']] },
  { name: 'about', url: '/about/', regions: [['people', '#people-heading'], ['documents', '#documents']] },
  { name: 'rfq', url: '/quote/', regions: [['form', '.quote-form-column']] },
];

async function prepare(url) {
  await page.goto(origin + url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    for (const img of document.images) img.loading = 'eager';
    await Promise.all([...document.images].map(img => img.decode().catch(() => {})));
    for (let y = 0; y < document.documentElement.scrollHeight; y += 650) {
      window.scrollTo(0, y);
      await new Promise(resolve => setTimeout(resolve, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(400);
}
async function shot(name, url, state, fullPage = false) {
  const file = `${name}.png`;
  const viewport = page.viewportSize();
  await page.screenshot({ path: path.join(screenDir, file), fullPage, animations: 'disabled' });
  manifest.push({ file, url, viewport, scrollY: await page.evaluate(() => Math.round(window.scrollY)), state, fullPage });
}
async function region(selector) {
  const el = page.locator(selector).first();
  if (!await el.count()) throw new Error(`Missing capture region: ${selector}`);
  await el.evaluate(node => window.scrollTo(0, Math.max(0, node.getBoundingClientRect().top + window.scrollY - 106)));
  await page.waitForTimeout(160);
}

for (const route of routes) {
  await prepare(route.url);
  await shot(`${route.name}-overview-desktop`, route.url, 'default', true);
  if (['home', 'catalog', 'part', 'custom-capabilities', 'factory', 'quality', 'about', 'rfq'].includes(route.name)) {
    await shot(`${route.name}-top-desktop`, route.url, 'default');
  }
  for (const [label, selector] of route.regions || []) {
    await region(selector);
    await shot(`${route.name}-${label}-desktop`, route.url, `region ${selector}`);
  }
}

await prepare('/');
await page.locator('#main-nav details.nav-group').first().locator('summary').click();
await page.waitForTimeout(360);
await shot('header-menu-desktop', '/', 'capabilities menu open');
await page.locator('#main-nav details.nav-group').first().locator('summary').click();
await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
await shot('footer-desktop', '/', 'bottom of page');

await prepare('/quote/');
await page.locator('input[name="name"]').fill('Sample Buyer');
await page.locator('input[name="email"]').fill('buyer@example.com');
await page.locator('textarea[name="project"]').fill('Sample enquiry for a custom machined part. Please review the attached drawing in the email.');
await page.getByRole('button', { name: 'Prepare email draft' }).click();
await page.waitForTimeout(200);
await region('.draft-result');
await shot('rfq-review-desktop', '/quote/', 'test draft prepared; no email sent');

await page.setViewportSize({ width: 768, height: 1024 });
for (const route of routes.filter(route => ['home', 'catalog', 'rfq'].includes(route.name))) {
  await prepare(route.url);
  await shot(`${route.name}-overview-tablet`, route.url, 'default', true);
}

await page.setViewportSize({ width: 390, height: 844 });
for (const route of routes.filter(route => ['home', 'catalog', 'part', 'factory', 'quality', 'rfq'].includes(route.name))) {
  await prepare(route.url);
  await shot(`${route.name}-overview-mobile`, route.url, 'default', true);
  await shot(`${route.name}-top-mobile`, route.url, 'default');
  if (route.name === 'home') {
    await region('.ed-factory');
    await shot('home-factory-mobile', route.url, 'factory evidence region');
  }
  if (route.name === 'factory') {
    await region('#equipment');
    await shot('factory-equipment-mobile', route.url, 'equipment region');
  }
}
await prepare('/');
await page.locator('.menu-toggle').click();
await page.waitForTimeout(360);
await shot('header-menu-mobile', '/', 'mobile navigation open');

await browser.close();
fs.writeFileSync(path.join(manifestDir, `${id}.json`), JSON.stringify(manifest, null, 2));
console.log(JSON.stringify({ screenDir, manifest: path.join(manifestDir, `${id}.json`), count: manifest.length }));
