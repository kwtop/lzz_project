// Content is visible in the server HTML. Effects are optional, once per page,
// and never delay links, keyboard focus, or technical content.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const played = new WeakSet<Element>();
const active = new Map<HTMLElement, Animation>();
let observer: IntersectionObserver | undefined;
const ease = 'cubic-bezier(.23, 1, .32, 1)';
const cardSelector = '.ed-product, .product-card, .er-related > a, .pd-related > a, .cap-products > a, .service-list > a, .material-list > a, .study-grid > article, .study-collections > article, .news-story, .ft-machine';

function settle() {
  active.forEach(animation => animation.cancel());
  active.clear();
}

function enter(element: HTMLElement, kind = 'heading', delay = 0) {
  if (played.has(element) || reducedMotion.matches) return;
  played.add(element);
  const mobile = window.matchMedia('(max-width: 760px)').matches;
  const hero = kind === 'hero';
  const image = kind === 'image' || kind === 'card';
  const scene = kind === 'scene';
  const frames: Keyframe[] = scene
    ? [{transform: 'scale(1.025)'}, {transform: 'scale(1)'}]
    : [
        {opacity: image ? .75 : .25, transform: `translateY(${hero ? mobile ? 16 : 24 : 14}px)`, filter: hero ? 'blur(3px)' : 'blur(0px)'},
        {opacity: 1, transform: 'translateY(0)', filter: 'blur(0px)'},
      ];
  const animation = element.animate(frames, {
    duration: scene ? 900 : hero ? mobile ? 520 : 700 : 520,
    delay, easing: ease, fill: 'both',
  });
  active.set(element, animation);
  animation.finished.then(() => {
    animation.cancel();
    if (active.get(element) === animation) active.delete(element);
  }).catch(() => {});
}

function setup() {
  observer?.disconnect();
  settle();
  if (reducedMotion.matches || !('IntersectionObserver' in window) || !Element.prototype.animate) return;
  const main = document.querySelector('main');
  if (!main || /^\/(quote|privacy|404|demos)(\/|$)/.test(location.pathname)) return;
  const candidates = new Map<HTMLElement, string>();
  const add = (selector: string, kind: string) => main.querySelectorAll<HTMLElement>(selector).forEach(element => {
    if (!element.closest('dialog, details, form, .ce-documents') && !element.querySelector('video, iframe')) candidates.set(element, kind);
  });
  add('h1', 'hero');
  add('h2', 'heading');
  add('figure, .studies-editorial-photo, .er-product-image, .er-surface-inner > a, .study-image, .cap-study-media, .news-story-image', 'image');
  add(cardSelector, 'card');
  add('.rfq-panel', 'panel');
  // A figure or card moves as a unit; preserve nested image crops and scales.
  candidates.forEach((_, element) => {
    let parent = element.parentElement;
    while (parent && parent !== main) {
      if (candidates.has(parent)) { candidates.delete(element); break; }
      parent = parent.parentElement;
    }
  });
  const lines = main.querySelectorAll<HTMLElement>('[data-motion-line]');
  if (lines.length) {
    const heading = lines[0].closest('h1');
    if (heading) candidates.delete(heading);
    if (window.scrollY < 80 && !location.hash) {
      lines.forEach((line, index) => enter(line, 'hero', index * 80));
      const scene = main.querySelector<HTMLElement>('.precision-scene');
      if (scene) enter(scene, 'scene');
    }
  }
  observer = new IntersectionObserver(entries => {
    let cardIndex = 0;
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const element = entry.target as HTMLElement;
      observer?.unobserve(element);
      const kind = candidates.get(element);
      const delay = kind === 'card' ? Math.min(cardIndex++, 3) * 60 : 0;
      enter(element, kind, delay);
    });
  }, {threshold: .1, rootMargin: '0px 0px -36px 0px'});
  candidates.forEach((_, element) => {
    // Preserve hash navigation and restored scroll positions without replaying.
    if (element.getBoundingClientRect().bottom < 0 || location.hash || window.scrollY > 80) played.add(element);
    if (!played.has(element)) observer?.observe(element);
  });
}

reducedMotion.addEventListener('change', setup);
document.addEventListener('keydown', event => { if (event.key === 'Tab') settle(); });
document.addEventListener('focusin', settle);
window.addEventListener('hashchange', () => { observer?.disconnect(); settle(); });
window.addEventListener('pagehide', () => { observer?.disconnect(); settle(); });
window.addEventListener('pageshow', event => { if (event.persisted) setup(); });
setup();
export {};
