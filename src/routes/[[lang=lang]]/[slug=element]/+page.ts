import { error } from '@sveltejs/kit';
import { DEFAULT_LANG, LANGS, type Lang } from '#lib/i18n/langs.ts';
import { bySlug, elements } from '#lib/elements.ts';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () =>
	LANGS.flatMap((lang) =>
		elements.map((e) => ({ lang: lang === DEFAULT_LANG ? undefined : lang, slug: e.slug }))
	);

export const load: PageLoad = ({ params }) => {
	const element = bySlug.get(params.slug);
	if (!element) error(404, 'Element not found');
	return { lang: (params.lang ?? DEFAULT_LANG) as Lang, z: element.z };
};
