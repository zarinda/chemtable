import { DEFAULT_LANG, LANGS, type Lang } from '#lib/i18n/langs.ts';
import { PROPERTIES, PROPERTY_SLUG, byPropertySlug } from '#lib/elements.ts';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () =>
	LANGS.flatMap((lang) =>
		PROPERTIES.map((key) => ({
			lang: lang === DEFAULT_LANG ? undefined : lang,
			property: PROPERTY_SLUG[key]
		}))
	);

export const load: PageLoad = ({ params }) => ({
	lang: (params.lang ?? DEFAULT_LANG) as Lang,
	z: null,
	// The matcher only lets real property slugs through.
	property: byPropertySlug.get(params.property)!
});
