import { DEFAULT_LANG, LANGS, isLang, type Lang } from '#lib/i18n/langs.ts';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () =>
	LANGS.map((lang) => ({ lang: lang === DEFAULT_LANG ? undefined : lang }));

/**
 * Cloudflare serves the nearest 404.html for any missing address (/ru/typo → /ru/404.html).
 * No route matches that address in the browser, so params are empty: read the language
 * from the URL instead.
 */
export const load: PageLoad = ({ url }) => {
	const prefix = url.pathname.split('/')[1];
	return { lang: (isLang(prefix) ? prefix : DEFAULT_LANG) as Lang, z: null };
};
