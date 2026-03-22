import type { APIRoute } from 'astro';

const langs = ['zh', 'ja', 'en'];
const hreflangCode: Record<string, string> = { zh: 'zh-Hans', ja: 'ja', en: 'en' };
const staticPaths = ['', '/energy', '/estate', '/news', '/about'];

export const GET: APIRoute = (context) => {
  const site = (context.site?.href || context.url.origin).replace(/\/$/, '');
  const urls = langs.flatMap((lang) =>
    staticPaths.map((path) => {
      const loc = `${site}/${lang}${path}`;
      const alternates = [
        ...langs.map((l) => `<xhtml:link rel="alternate" hreflang="${hreflangCode[l]}" href="${site}/${l}${path}"/>`),
        `<xhtml:link rel="alternate" hreflang="x-default" href="${site}/zh${path}"/>`,
      ].join('\n      ');
      return `
  <url>
    <loc>${loc}</loc>
    <changefreq>${path === '' || path === '/energy' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${path === '' ? '1.0' : path === '/energy' ? '0.9' : '0.7'}</priority>
    ${alternates}
  </url>`;
    })
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
