import { DEFAULT_LANG, LANGS, type Lang } from '#lib/i18n/langs.ts';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () =>
	LANGS.filter((l) => l !== DEFAULT_LANG).map((lang) => ({ lang }));

export const load: PageLoad = ({ params }) => ({
	lang: (params.lang ?? DEFAULT_LANG) as Lang,
	z: null
});
