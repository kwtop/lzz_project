export type PageTemplate = 'decision' | 'read' | 'operate';

/** A page's visitor task determines its layout; SEO entity type does not. */
export function pageTemplateFor(pathname: string): PageTemplate {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/quote') return 'operate';
  if (
    path === '/privacy' ||
    path === '/resources' || path.startsWith('/resources/') ||
    /^\/cases\/[^/]+$/.test(path) ||
    /^\/about\/company-news\/[^/]+$/.test(path)
  ) return 'read';
  return 'decision';
}
