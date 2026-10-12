import { elements, fetchedAt, type Element } from '#lib/elements.ts';
import { LANGS } from '#lib/i18n/langs.ts';
import { absolute, alternates, elementPath, homePath, ogImagePath } from '#lib/seo.ts';
import type { RequestHandler } from './$types';

export const prerender = true;

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

/** One <url> per page and language, each listing all its language alternates. */
function entry(element: Element | null) {
	const pathFor = (l: (typeof LANGS)[number]) => (element ? elementPath(element, l) : homePath(l));
	const links = alternates(pathFor)
		.map((a) => `\t\t<xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${escape(a.href)}"/>`)
		.join('\n');
	return LANGS.map(
		(l) => `\t<url>
		<loc>${escape(absolute(pathFor(l)))}</loc>
		<lastmod>${fetchedAt}</lastmod>
${links}
		<image:image><image:loc>${escape(absolute(ogImagePath(l, element)))}</image:loc></image:image>
	</url>`
	).join('\n');
}

export const GET: RequestHandler = () => {
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${[null, ...elements].map(entry).join('\n')}
</urlset>
`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
