import { statSync } from 'node:fs';
import { join } from 'node:path';
import { DEFAULT_LANG, LANGS, type Lang } from '#lib/i18n/langs.ts';
import { PAPERS, VARIANTS, printPath } from '#lib/print.ts';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = () =>
	LANGS.map((lang) => ({ lang: lang === DEFAULT_LANG ? undefined : lang }));

export const load: PageServerLoad = ({ params }) => {
	const lang = (params.lang ?? DEFAULT_LANG) as Lang;
	// Read at prerender from static/, so the download button can show each PDF's size.
	const sizes = Object.fromEntries(
		PAPERS.flatMap((paper) =>
			VARIANTS.map((variant) => [
				`${paper}-${variant}`,
				statSync(join(process.cwd(), 'static', printPath(lang, paper, variant))).size
			])
		)
	);
	return { lang, z: null, sizes };
};
