import { DEFAULT_LANG, LANGS, type Lang } from '#lib/i18n/langs.ts';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () =>
	LANGS.map((lang) => ({ lang: lang === DEFAULT_LANG ? undefined : lang }));

export const load: PageLoad = ({ params }) => ({
	lang: (params.lang ?? DEFAULT_LANG) as Lang,
	z: null
});
