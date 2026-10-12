import { elements, fetchedAt, type Element } from '#lib/elements.ts';
import { LANGS, type Lang } from '#lib/i18n/langs.ts';
import {
	absolute,
	alternates,
	elementPath,
	homePath,
	ogImagePath,
	privacyPath,
	PRIVACY_UPDATED
} from '#lib/seo.ts';
import type { RequestHandler } from './$types';

export const prerender = true;

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

/** One <url> per language, each listing all its language alternates. */
function urls(pathFor: (l: Lang) => string, lastmod: string, imageFor?: (l: Lang) => string) {
	const links = alternates(pathFor)
		.map((a) => `\t\t<xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${escape(a.href)}"/>`)
		.join('\n');
	const image = (l: Lang) =>
		imageFor
			? `\n\t\t<image:image><image:loc>${escape(absolute(imageFor(l)))}</image:loc></image:image>`
			: '';
	return LANGS.map(
		(l) => `\t<url>
		<loc>${escape(absolute(pathFor(l)))}</loc>
		<lastmod>${lastmod}</lastmod>
${links}${image(l)}
	</url>`
	).join('\n');
}

const page = (element: Element | null) =>
	urls(
		(l) => (element ? elementPath(element, l) : homePath(l)),
		fetchedAt,
		(l) => ogImagePath(l, element)
	);

export const GET: RequestHandler = () => {
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${[null, ...elements].map(page).join('\n')}
${urls(privacyPath, PRIVACY_UPDATED)}
</urlset>
`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
