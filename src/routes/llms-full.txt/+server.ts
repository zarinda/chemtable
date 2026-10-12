import { elements, fetchedAt } from '#lib/elements.ts';
import { LANGS, LANG_INFO } from '#lib/i18n/langs.ts';
import { UI } from '#lib/i18n/ui.ts';
import { absolute, elementPath, summaryFacts } from '#lib/seo.ts';
import { facts } from '#lib/server/describe.ts';
import type { RequestHandler } from './$types';

export const prerender = true;

/** Every element's properties in Markdown, for AI assistants that read the whole site at once. */
export const GET: RequestHandler = () => {
	const sections = elements.map((e) => {
		const rows = Object.entries(facts(e))
			.map(([k, v]) => `- ${k}: ${v ?? 'no data'}`)
			.join('\n');
		const names = LANGS.map((l) => `${LANG_INFO[l].native}: ${e.name[l]}`).join('; ');
		return `## ${e.name.en} (${e.symbol})

${UI.en.article.summary(summaryFacts(e, 'en'))}

${rows}
- Names: ${names}
- Page: ${absolute(elementPath(e, 'en'))}
- Sources: https://pubchem.ncbi.nlm.nih.gov/element/${e.z}${e.wikidata ? `, https://www.wikidata.org/wiki/${e.wikidata}` : ''}`;
	});

	const body = `# ChemTable: properties of all 118 chemical elements

> Properties from PubChem (US National Institutes of Health), standard atomic weights from IUPAC CIAAW, names from Wikidata. Updated ${fetchedAt}. Site: ${absolute('/')}

${sections.join('\n\n')}
`;
	return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
