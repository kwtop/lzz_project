import { chromium } from 'playwright';
import fs from 'node:fs';

const round = process.argv[2] || '1';
const dir = `docs/b2b-refinement/round-${round}`;
fs.mkdirSync(dir, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const origin = 'http://127.0.0.1:4323';
const routes = [
  ['home', '/'],
  ['products', '/machined-parts/'],
  ['product-detail', '/machined-parts/custom-billet-aluminum-engine-cover-manufacturer-and-automotive-prototype-supplier/'],
  ['applications', '/cases/'],
  ['application-study', '/cases/five-axis-machining-multi-face-parts/'],
  ['custom-capabilities', '/capabilities/'],
  ['prototype-machining', '/capabilities/prototype-machining/'],
  ['factory', '/factory/'],
  ['quality', '/quality/'],
  ['about', '/about/'],
  ['contact-rfq', '/quote/'],
];

async function prepare(url) {
  await page.goto(origin + url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    for (const img of document.images) img.loading = 'eager';
    await Promise.all([...document.images].map(img => img.decode().catch(() => {})));
    for (let y = 0; y < document.documentElement.scrollHeight; y += 650) {
      window.scrollTo(0, y);
      await new Promise(resolve => setTimeout(resolve, 75));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(500);
}

for (const [name, url] of routes) {
  await prepare(url);
  await page.screenshot({ path: `${dir}/${name}-desktop.png`, fullPage: true });
  if (['home', 'products', 'custom-capabilities', 'contact-rfq'].includes(name)) {
    await page.screenshot({ path: `${dir}/${name}-first-screen.png` });
  }
}

await prepare('/');
await page.locator('#main-nav details.nav-group').first().locator('summary').click();
await page.waitForTimeout(350);
await page.screenshot({ path: `${dir}/header-mega-menu.png` });
await page.locator('#main-nav details.nav-group').first().locator('summary').click();
await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
await page.waitForTimeout(250);
await page.screenshot({ path: `${dir}/footer-desktop.png` });

await page.setViewportSize({ width: 390, height: 844 });
for (const [name, url] of routes.filter(([name]) => ['home', 'products', 'product-detail', 'factory', 'quality', 'contact-rfq'].includes(name))) {
  await prepare(url);
  await page.screenshot({ path: `${dir}/${name}-mobile.png`, fullPage: true });
}
await prepare('/');
const menuButton = page.locator('.menu-toggle, .mobile-menu-toggle, button[aria-controls="main-nav"]').first();
if (await menuButton.count()) {
  await menuButton.click();
  await page.waitForTimeout(350);
  await page.screenshot({ path: `${dir}/header-mobile-menu.png` });
}

await browser.close();
console.log(dir);
