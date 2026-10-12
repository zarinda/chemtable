import { elements, fetchedAt } from '#lib/elements.ts';
import { LANGS, LANG_INFO } from '#lib/i18n/langs.ts';
import { UI } from '#lib/i18n/ui.ts';
import { absolute, elementPath, homePath, AUTHOR, DATA_LICENSE } from '#lib/seo.ts';
import { printPath } from '#lib/print.ts';
import type { RequestHandler } from './$types';

export const prerender = true;

/** https://llmstxt.org — a Markdown map of the site for AI assistants. */
export const GET: RequestHandler = () => {
	const en = UI.en;
	const body = `# ChemTable: Interactive Periodic Table of the Elements

> ${en.seo.homeDescription} Data from PubChem (US National Institutes of Health), IUPAC CIAAW standard atomic weights and Wikidata. Available in ${LANGS.length} languages. Made by ${AUTHOR.name} (${AUTHOR.url}). Updated ${fetchedAt}.

Notes for using this data:

- Atomic masses are IUPAC CIAAW abridged standard atomic weights. A value in square brackets, such as [98], is the mass number of the most stable isotope of an element with no standard atomic weight.
- The radius is the van der Waals radius from PubChem, larger than textbook covalent or metallic radii.
- Group numbers follow IUPAC (1–18). Lanthanum–ytterbium and actinium–nobelium form the f-block; lutetium and lawrencium close the d-block.
- The data is published under ${DATA_LICENSE.name} (${DATA_LICENSE.url}): free to reuse with a link to ChemTable.
- Every element page exists in each language: ${absolute('/iron')} (English), ${absolute('/ru/iron')} (Russian), and so on with the prefixes ${LANGS.filter((l) => l !== 'en').join(', ')}.

## Data

- [All elements as JSON](${absolute('/data/elements.json')}): every property, names in ${LANGS.length} languages, Wikidata IDs and page URLs
- [All elements as CSV](${absolute('/data/elements.csv')}): one row per element
- [Printable periodic table, PDF](${absolute(printPath('en', 'a4', 'color'))}): A4 and US Letter (\`letter\` in the file name), colour and black-and-white (\`bw\`); for other languages replace \`/en/\` with ${LANGS.filter((l) => l !== 'en').map((l) => `\`/${l}/\``).join(', ')}
- [Full text of every element](${absolute('/llms-full.txt')}): all properties in Markdown

## Elements

${elements
	.map(
		(e) =>
			`- [${e.name.en} (${e.symbol})](${absolute(elementPath(e, 'en'))}): element ${e.z}, ${en.category[e.category].toLowerCase()}, atomic mass ${e.mass.text ?? 'unknown'}`
	)
	.join('\n')}

## Languages

${LANGS.map((l) => `- [${LANG_INFO[l].native}](${absolute(homePath(l))})`).join('\n')}
`;
	return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
