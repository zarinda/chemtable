/**
 * Builds src/lib/data/elements.json from official sources.
 *
 * - PubChem Periodic Table (NIH): properties, configuration, category.
 *   https://pubchem.ncbi.nlm.nih.gov/periodic-table/
 * - IUPAC CIAAW abridged standard atomic weights (2021 report + 2024 revisions).
 *   https://www.ciaaw.org/abridged-atomic-weights.htm
 * - Wikidata: element names in every supported language and Wikipedia article links.
 *   https://www.wikidata.org/
 * - Wikidata: element names in every supported language and Wikipedia article links.
 *   https://www.wikidata.org/
 *
 * Run: npm run data
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { LANGS, LANG_INFO, type Lang } from '../src/lib/i18n/langs.ts';

const PUBCHEM_URL = 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/periodictable/JSON';
const CIAAW_URL = 'https://www.ciaaw.org/abridged-atomic-weights.htm';
const WIKIDATA_URL = 'https://query.wikidata.org/sparql';
const OUT = new URL('../src/lib/data/elements.json', import.meta.url);

const CATEGORY: Record<string, string> = {
	'Alkali metal': 'alkali-metal',
	'Alkaline earth metal': 'alkaline-earth-metal',
	'Transition metal': 'transition-metal',
	'Post-transition metal': 'post-transition-metal',
	Metalloid: 'metalloid',
	Nonmetal: 'nonmetal',
	Halogen: 'halogen',
	'Noble gas': 'noble-gas',
	Lanthanide: 'lanthanide',
	Actinide: 'actinide'
};

const num = (s: string): number | null => {
	if (!s) return null;
	const n = Number(s);
	return Number.isFinite(n) ? n : null;
};

/** Period, group, grid position and block from atomic number. */
function placement(z: number) {
	const starts = [1, 3, 11, 19, 37, 55, 87];
	const period = starts.filter((s) => z >= s).length;
	const offset = z - starts[period - 1];
	let group: number | null;
	let col: number;
	let row = period;

	if (period === 1) group = z === 1 ? 1 : 18;
	else if (period <= 3) group = offset < 2 ? offset + 1 : offset + 11;
	else if (period <= 5) group = offset + 1;
	else if (offset < 2) group = offset + 1;
	else if (offset <= 16) group = null; // f-row: La–Lu, Ac–Lr
	else group = offset - 13;

	if (group === null) {
		row = period + 3; // rows 9 and 10 below the main table
		col = offset + 1; // La → col 3 … Lu → col 17
	} else col = group;

	// IUPAC 2021 provisional recommendation: Lu and Lr close the d-block.
	const block =
		group === null
			? z === 71 || z === 103
				? 'd'
				: 'f'
			: group <= 2 || z === 2
				? 's'
				: group >= 13
					? 'p'
					: 'd';

	return { period, group, block, col, row };
}

/** Electrons per shell, expanding noble-gas cores like [Ar]. */
function shells(z: number, configs: Map<string, string>): number[] {
	const counts: number[] = [];
	const add = (config: string) => {
		const core = config.match(/\[(\w+)\]/);
		if (core) add(configs.get(core[1]) ?? '');
		for (const [, n, , e] of config.matchAll(/(\d)([spdf])(\d+)/g)) {
			const i = Number(n) - 1;
			counts[i] = (counts[i] ?? 0) + Number(e);
		}
	};
	add(configs.get(String(z)) ?? '');
	return Array.from(counts, (c) => c ?? 0);
}

async function ciaawWeights(): Promise<Map<number, { value: number; text: string }>> {
	const html = await (await fetch(CIAAW_URL)).text();
	const map = new Map<number, { value: number; text: string }>();
	const rows = html.matchAll(/<tr><td>(\d+)<\/td><td>\w+<\/td><td>.*?<\/td><td>(.*?)<\/td>/g);
	for (const [, z, cell] of rows) {
		const clean = cell.replace(/&nbsp;/g, '').replace(/\s/g, '');
		const m = clean.match(/^([\d.]+)&plusmn;/);
		if (m) map.set(Number(z), { value: Number(m[1]), text: m[1] });
	}
	return map;
}

type WikidataInfo = {
	qid: string;
	names: Partial<Record<Lang, string>>;
	nameRank: Partial<Record<Lang, number>>;
	wikipedia: Partial<Record<Lang, string>>;
};

/** Wikidata label tags to try, most specific first. A few elements lack a zh-hans label. */
const labelTags = (lang: Lang) =>
	lang === 'zh' ? ['zh-hans', 'zh-cn', 'zh'] : [LANG_INFO[lang].wikidata];

async function sparql(query: string) {
	const url = `${WIKIDATA_URL}?format=json&query=${encodeURIComponent(query)}`;
	const res = await fetch(url, { headers: { 'User-Agent': 'ChemTable/0.1 (periodic table data build)' } });
	if (!res.ok) throw new Error(`Wikidata ${res.status}`);
	return (await res.json()).results.bindings as Record<string, { value: string }>[];
}

/** Element names in every supported language plus Wikipedia links, keyed by atomic number. */
async function wikidata(): Promise<Map<number, WikidataInfo>> {
	const labelLangs = LANGS.flatMap(labelTags).map((t) => `"${t}"`).join(',');
	const wikis = LANGS.map((l) => `<https://${LANG_INFO[l].wikipedia}.wikipedia.org/>`).join(' ');
	const [labels, articles] = await Promise.all([
		sparql(`SELECT ?z ?el ?label WHERE {
			?el wdt:P31 wd:Q11344; wdt:P1086 ?z; rdfs:label ?label.
			FILTER(LANG(?label) IN (${labelLangs}))
		}`),
		sparql(`SELECT ?z ?article ?wiki WHERE {
			?el wdt:P31 wd:Q11344; wdt:P1086 ?z.
			?article schema:about ?el; schema:isPartOf ?wiki.
			VALUES ?wiki { ${wikis} }
		}`)
	]);
	const map = new Map<number, WikidataInfo>();
	const entry = (z: number, qid = '') => {
		if (!map.has(z)) map.set(z, { qid, names: {}, nameRank: {}, wikipedia: {} });
		const e = map.get(z)!;
		if (qid) e.qid = qid;
		return e;
	};
	for (const b of labels as (Record<string, { value: string; 'xml:lang'?: string }>)[]) {
		const tag = b.label['xml:lang'] ?? '';
		const lang = LANGS.find((l) => labelTags(l).includes(tag));
		if (!lang) continue;
		const e = entry(Number(b.z.value), b.el.value.split('/').pop());
		// Keep the most specific tag: zh-hans beats zh-cn beats zh.
		const rank = labelTags(lang).indexOf(tag);
		if (rank <= (e.nameRank[lang] ?? Infinity)) {
			e.names[lang] = b.label.value;
			e.nameRank[lang] = rank;
		}
	}
	for (const b of articles) {
		const lang = LANGS.find((l) => b.wiki.value === `https://${LANG_INFO[l].wikipedia}.wikipedia.org/`);
		if (lang) entry(Number(b.z.value)).wikipedia[lang] = b.article.value;
	}
	return map;
}

/** Wikidata labels are lower-case in most languages; names start with a capital in the UI. */
const capitalize = (s: string, lang: Lang) =>
	s.charAt(0).toLocaleUpperCase(LANG_INFO[lang].tag) + s.slice(1);

async function main() {
	const pubchem = await (await fetch(PUBCHEM_URL)).json();
	const cols: string[] = pubchem.Table.Columns.Column;
	const rows: Record<string, string>[] = pubchem.Table.Row.map((r: { Cell: string[] }) =>
		Object.fromEntries(cols.map((c, i) => [c, r.Cell[i] ?? '']))
	);
	const weights = await ciaawWeights();
	const wiki = await wikidata();

	const configs = new Map<string, string>();
	for (const r of rows) {
		const config = r.ElectronConfiguration.replace(/\s*\(.*\)$/, '');
		configs.set(r.AtomicNumber, config);
		configs.set(r.Symbol, config);
	}

	const elements = rows.map((r) => {
		const z = Number(r.AtomicNumber);
		const standard = weights.get(z);
		const pubchemMass = num(r.AtomicMass);
		const state = r.StandardState.toLowerCase();
		const w = wiki.get(z);
		const name = Object.fromEntries(
			LANGS.map((l) => [l, w?.names[l] ? capitalize(w.names[l], l) : l === 'en' ? r.Name : ''])
		) as Record<Lang, string>;

		return {
			z,
			symbol: r.Symbol,
			/** URL segment, from the IUPAC English name: /iron, /ru/aluminium. */
			slug: name.en.toLowerCase(),
			name,
			wikidata: w?.qid ?? null,
			wikipedia: w?.wikipedia ?? {},
			category: CATEGORY[r.GroupBlock],
			...placement(z),
			mass: standard
				? { value: standard.value, text: standard.text, source: 'ciaaw' }
				: {
						value: pubchemMass,
						text: pubchemMass === null ? null : `[${Math.round(pubchemMass)}]`,
						source: 'pubchem-isotope'
					},
			config: r.ElectronConfiguration.replace(/\s*\(predicted\)$/, ''),
			configPredicted: r.ElectronConfiguration.includes('predicted'),
			shells: shells(z, configs),
			state: state.includes('solid') ? 'solid' : state.includes('liquid') ? 'liquid' : 'gas',
			statePredicted: state.startsWith('expected'),
			electronegativity: num(r.Electronegativity),
			atomicRadius: num(r.AtomicRadius),
			ionizationEnergy: num(r.IonizationEnergy),
			electronAffinity: num(r.ElectronAffinity),
			oxidationStates: r.OxidationStates ? r.OxidationStates.split(',').map((s) => s.trim()) : [],
			meltingPoint: num(r.MeltingPoint),
			boilingPoint: num(r.BoilingPoint),
			density: num(r.Density),
			yearDiscovered: r.YearDiscovered === 'Ancient' ? 'ancient' : num(r.YearDiscovered)
		};
	});

	const missing = elements
		.filter((e) => !e.category || !e.wikidata || LANGS.some((l) => !e.name[l]))
		.map((e) => `${e.symbol} (${LANGS.filter((l) => !e.name[l]).join(', ')})`);
	if (missing.length) throw new Error(`Incomplete records: ${missing.join(', ')}`);

	mkdirSync(new URL('.', OUT), { recursive: true });
	writeFileSync(
		OUT,
		JSON.stringify(
			{
				fetchedAt: new Date().toISOString().slice(0, 10),
				sources: { properties: PUBCHEM_URL, atomicWeights: CIAAW_URL, names: WIKIDATA_URL },
				elements
			},
			null,
			'\t'
		)
	);
	console.log(`Wrote ${elements.length} elements, ${weights.size} CIAAW weights.`);
}

main();
