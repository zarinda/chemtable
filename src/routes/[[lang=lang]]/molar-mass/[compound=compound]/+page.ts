import { COMPOUNDS } from '#lib/compounds.ts';
import { DEFAULT_LANG, LANGS, type Lang } from '#lib/i18n/langs.ts';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () =>
	LANGS.flatMap((lang) =>
		COMPOUNDS.map((c) => ({ lang: lang === DEFAULT_LANG ? undefined : lang, compound: c.slug }))
	);

export const load: PageLoad = ({ params }) => ({
	lang: (params.lang ?? DEFAULT_LANG) as Lang,
	z: null,
	compound: params.compound
});
