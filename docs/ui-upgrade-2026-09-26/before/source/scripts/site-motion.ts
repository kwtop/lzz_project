import {gsap} from 'gsap';

// Progressive enhancement: content is readable before JS, and never hidden
// while waiting for a scroll trigger. Images retain their authored transforms.
const selector = [
  '.selected-heading', '.selected-info', '.machining-copy > h2',
  '.section-heading', '.inside-heading', '.inside-process li',
  '.quality-stages article', '.workflow li', '.closing-inner',
].join(',');

let media: ReturnType<typeof gsap.matchMedia> | undefined;

function startMotion() {
  media?.revert();
  if (!('IntersectionObserver' in window)) return;
  media = gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)', context => {
    const mobile = window.matchMedia('(max-width: 760px)').matches;
    const seen = new WeakSet<Element>();
    const observer = new IntersectionObserver(entries => {
      const targets = entries
        .filter(entry => entry.isIntersecting && !seen.has(entry.target))
        .map(entry => entry.target as HTMLElement);
      if (!targets.length) return;
      targets.forEach(target => {seen.add(target); observer.unobserve(target);});
      // Register asynchronous observer tweens in matchMedia's cleanup context.
      context.add(() => {
        gsap.fromTo(targets,
          {y: mobile ? 10 : 18, autoAlpha: .65},
          {y: 0, autoAlpha: 1, duration: mobile ? .42 : .6,
            stagger: {each: .07, amount: Math.min((targets.length - 1) * .07, .21)},
            ease: 'power2.out', overwrite: 'auto',
            clearProps: 'transform,opacity,visibility'},
        );
      });
    }, {threshold: .12});

    document.querySelectorAll<HTMLElement>(selector).forEach(target => {
      const rect = target.getBoundingClientRect();
      // Preserve first paint and direct hash-link landings; animate later arrivals.
      if (rect.top < window.innerHeight && rect.bottom > 0) seen.add(target);
      else observer.observe(target);
    });
    return () => observer.disconnect();
  });
}

startMotion();
window.addEventListener('pagehide', () => media?.revert());
window.addEventListener('pageshow', event => {if (event.persisted) startMotion();});
