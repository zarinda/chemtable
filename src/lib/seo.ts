import { PUBLIC_SITE_URL } from '$app/env/public';
import type { Element } from './elements';
import { LANGS, LANG_INFO, DEFAULT_LANG, localize, type Lang } from './i18n/langs';

export const SITE_URL = PUBLIC_SITE_URL;

export const absolute = (path: string) => `${SITE_URL}${path}`;

/** Who makes ChemTable: credited in the footer, JSON-LD, llms.txt and README. */
export const AUTHOR = {
	name: 'Zarinda',
	url: 'https://zarinda.com'
};

/** Licence of the published dataset (the sources are public domain or CC0). */
export const DATA_LICENSE = {
	name: 'CC BY 4.0',
	url: 'https://creativecommons.org/licenses/by/4.0/'
};

export const homePath = (lang: Lang) => localize('/', lang);
export const elementPath = (e: Element, lang: Lang) => localize(`/${e.slug}`, lang);

/** Pre-rendered Open Graph image for a page; `null` element means the home page. */
export const ogImagePath = (lang: Lang, e: Element | null) =>
	`/og/${lang}/${e ? e.slug : 'home'}.png`;

export type Alternate = { hreflang: string; href: string };

/** hreflang links for every language version of a page, plus x-default (English). */
export function alternates(pathFor: (lang: Lang) => string): Alternate[] {
	return [
		...LANGS.map((l) => ({ hreflang: LANG_INFO[l].tag, href: absolute(pathFor(l)) })),
		{ hreflang: 'x-default', href: absolute(pathFor(DEFAULT_LANG)) }
	];
}

export { summaryFacts } from './facts';
