/**
 * Builds src/lib/data/elements.json from official sources.
 *
 * - PubChem Periodic Table (NIH): properties, configuration, category.
 *   https://pubchem.ncbi.nlm.nih.gov/periodic-table/
 * - IUPAC CIAAW abridged standard atomic weights (2021 report + 2024 revisions).
 *   https://www.ciaaw.org/abridged-atomic-weights.htm
 * - Wikidata: element names in every supported language and Wikipedia article links,
 *   discoverers and what an element is named after.
 *   https://www.wikidata.org/
 * - NIST Atomic Spectra Database: first ionization energies (PubChem's are outdated for
 *   about fifteen elements). https://physics.nist.gov/PhysRefData/ASD/ionEnergy.html
 * - scripts/corrections.ts: hand-checked fixes, electron affinities and covalent radii,
 *   each with its source.
 *
 * Run: npm run data
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { LANGS, LANG_INFO, type Lang } from '../src/lib/i18n/langs.ts';
import * as fix from './corrections.ts';

const PUBCHEM_URL = 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/periodictable/JSON';
const CIAAW_URL = 'https://www.ciaaw.org/abridged-atomic-weights.htm';
const WIKIDATA_URL = 'https://query.wikidata.org/sparql';
const NIST_URL =
	'https://physics.nist.gov/cgi-bin/ASD/ie.pl?spectra=H-Og+I&units=1&format=2&order=0&at_num_out=on&e_out=0&unc_out=on';
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

/**
 * First ionization energy in eV by atomic number. NIST marks calculated values with ( )
 * and semi-empirical ones with [ ]; those are kept only when their uncertainty is below
 * 0.01 eV (hydrogen's exact calculation, praseodymium), so rough guesses for Pa, Fm, Md
 * and the superheavy elements are left out.
 */
async function nistIonization(): Promise<Map<number, number>> {
	const csv = await (await fetch(NIST_URL)).text();
	const map = new Map<number, number>();
	for (const line of csv.split('\n')) {
		// Cells look like "=""26""": Excel-style quoting.
		const cells = [...line.matchAll(/"=""([^"]*)"""/g)].map((m) => m[1]);
		if (cells.length < 5) continue;
		const [z, prefix, value, , uncertainty] = cells;
		const energy = Number(value);
		if (!Number.isFinite(energy)) continue;
		if (prefix === '' || Number(uncertainty) < 0.01) map.set(Number(z), energy);
	}
	if (map.size < 100) throw new Error(`NIST returned ${map.size} ionization energies`);
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

/** A person, place or other item with its label in every supported language. */
type Named = { qid: string; name: Record<Lang, string> };

const byEnglishName = (a: Named, b: Named) => a.name.en.localeCompare(b.name.en);

/**
 * "Named after" (P138) mixes true eponyms with word roots: argon is "named after"
 * laziness, bromine after stink. Only people, places, sky objects and mythology read
 * right as "named after X"; word roots need phrasing Wikidata doesn't give.
 */
const EPONYM = [
	'?v wdt:P31 wd:Q5', // human
	'?v wdt:P625 []', // has coordinates: city, country, region, mine, laboratory
	'?v wdt:P31/wdt:P279* wd:Q6999', // astronomical object
	'?v wdt:P31/wdt:P279* wd:Q178885', // deity
	'?v wdt:P31/wdt:P279* wd:Q4271324' // mythical character
];

/** Since 2024 many names live only under the language-neutral "mul" label. */
const RELATION_TAGS = [...LANGS.flatMap(labelTags), 'mul', 'en'].map((t) => `"${t}"`).join(',');

/**
 * An item's name in every language from its labels, falling back to "mul", then English.
 * Hand-checked labels in corrections.ts win; a minor planet's number is dropped ("(2) Pallas").
 */
function toNamed(qid: string, labels: Map<string, string>): Named {
	const pick = (lang: Lang) =>
		fix.LABELS[qid]?.[lang] ??
		([...labelTags(lang), 'mul', 'en'].map((t) => labels.get(t)).find(Boolean) ?? '').replace(
			/^\(?\d+\)? (?=\p{L})/u,
			''
		);
	return { qid, name: Object.fromEntries(LANGS.map((l) => [l, pick(l)])) as Record<Lang, string> };
}

/** Labels for the Wikidata items named in corrections.ts. */
async function labelled(qids: string[]): Promise<Map<string, Named>> {
	const rows = await sparql(`SELECT ?v ?label WHERE {
		VALUES ?v { ${qids.map((q) => `wd:${q}`).join(' ')} }
		?v rdfs:label ?label. FILTER(LANG(?label) IN (${RELATION_TAGS}))
	}`);
	const labels = new Map<string, Map<string, string>>();
	for (const b of rows as (Record<string, { value: string; 'xml:lang'?: string }>)[]) {
		const qid = b.v.value.split('/').pop()!;
		if (!labels.has(qid)) labels.set(qid, new Map());
		labels.get(qid)!.set(b.label['xml:lang'] ?? '', b.label.value);
	}
	const missing = qids.filter((q) => !labels.has(q));
	if (missing.length) throw new Error(`No Wikidata labels for ${missing.join(', ')}`);
	return new Map([...labels].map(([qid, l]) => [qid, toNamed(qid, l)]));
}

/** Discoverers (P61) and eponyms (P138) per atomic number, labelled in every language. */
async function relations(): Promise<Map<number, { discoveredBy: Named[]; namedAfter: Named[] }>> {
	const query = (prop: string) =>
		sparql(`SELECT ?z ?v ?label WHERE {
			?el wdt:P31 wd:Q11344; wdt:P1086 ?z; wdt:${prop} ?v.
			FILTER(isIRI(?v))
			?v rdfs:label ?label. FILTER(LANG(?label) IN (${RELATION_TAGS}))
		}`);
	const [discoverers, named] = await Promise.all([query('P61'), query('P138')]);
	// Type check only the ~100 candidates: walking the class tree for all elements times out.
	const candidates = [...new Set(named.map((b) => b.v.value))].map((v) => `<${v}>`).join(' ');
	// One query per test: a UNION, or a walk up a broad class like "geographic location", times out.
	// Sequential: Wikidata's query service limits parallel requests.
	const keep = new Set<string>();
	for (const test of EPONYM)
		for (const b of await sparql(`SELECT DISTINCT ?v WHERE { VALUES ?v { ${candidates} } ${test} }`))
			keep.add(b.v.value);
	const eponyms = named.filter(
		(b) => keep.has(b.v.value) && !fix.NOT_EPONYMS[Number(b.z.value)]?.includes(b.v.value.split('/').pop()!)
	);

	const collect = (rows: Record<string, { value: string; 'xml:lang'?: string }>[]) => {
		const byZ = new Map<number, Map<string, Map<string, string>>>();
		for (const b of rows) {
			const z = Number(b.z.value);
			const qid = b.v.value.split('/').pop()!;
			if (!byZ.has(z)) byZ.set(z, new Map());
			const items = byZ.get(z)!;
			if (!items.has(qid)) items.set(qid, new Map());
			items.get(qid)!.set(b.label['xml:lang'] ?? '', b.label.value);
		}
		const result = new Map<number, Named[]>();
		for (const [z, items] of byZ)
			result.set(z, [...items].map(([qid, labels]) => toNamed(qid, labels)).sort(byEnglishName));
		return result;
	};

	const found = collect(discoverers);
	const eponymsByZ = collect(eponyms);
	const overrides = Object.entries(fix.DISCOVERY).filter(([, d]) => d.by);
	const eponymOverrides = Object.entries(fix.EPONYMS);
	const people = await labelled([
		...new Set([...overrides.flatMap(([, d]) => d.by!), ...eponymOverrides.flatMap(([, d]) => d.qids)])
	]);
	for (const [z, d] of overrides) found.set(Number(z), d.by!.map((q) => people.get(q)!).sort(byEnglishName));
	for (const [z, d] of eponymOverrides) eponymsByZ.set(Number(z), d.qids.map((q) => people.get(q)!));
	const map = new Map<number, { discoveredBy: Named[]; namedAfter: Named[] }>();
	for (const z of new Set([...found.keys(), ...eponymsByZ.keys()]))
		map.set(z, { discoveredBy: found.get(z) ?? [], namedAfter: eponymsByZ.get(z) ?? [] });
	return map;
}

/**
 * PubChem's common oxidation states merged with the main ones it misses, always signed
 * ("+7", not "7"). "0" stays only for elements with no compounds (He, Ne, Ar).
 */
function oxidationStates(z: number, pubchem: string): string[] {
	if (z >= fix.OXIDATION_UNKNOWN_FROM) return [];
	const states = new Set(
		fix.OXIDATION_SUPERHEAVY[z] ?? [
			...(pubchem ? pubchem.split(',').map((s) => Number(s.trim())) : []),
			...(fix.OXIDATION_EXTRA[z] ?? [])
		]
	);
	if (states.size > 1) states.delete(0);
	return [...states].sort((a, b) => b - a).map((n) => (n > 0 ? `+${n}` : String(n)));
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
	const ionization = await nistIonization();
	const wiki = await wikidata();
	const related = await relations();

	// PubChem marks some configurations "(predicted)" or "(calculated)".
	const configOf = (r: Record<string, string>) =>
		fix.CONFIG[Number(r.AtomicNumber)] ?? r.ElectronConfiguration.replace(/\s*\(.*\)$/, '');
	const configs = new Map<string, string>();
	for (const r of rows) {
		configs.set(r.AtomicNumber, configOf(r));
		configs.set(r.Symbol, configOf(r));
	}

	const elements = rows.map((r) => {
		const z = Number(r.AtomicNumber);
		const standard = weights.get(z);
		const pubchemMass = num(r.AtomicMass);
		const state = r.StandardState.toLowerCase();
		const w = wiki.get(z);
		const removed = fix.REMOVE[z] ?? {};
		const value = (field: 'meltingPoint' | 'boilingPoint' | 'density', pubchemValue: string) =>
			removed[field] ? null : (fix.VALUE[z]?.[field]?.value ?? num(pubchemValue));
		const name = Object.fromEntries(
			LANGS.map((l) => [
				l,
				fix.NAMES[z]?.name[l] ?? (w?.names[l] ? capitalize(w.names[l], l) : l === 'en' ? r.Name : '')
			])
		) as Record<Lang, string>;
		const massNumber = fix.MASS_NUMBER[z]?.value;
		const electronegativity = removed.electronegativity ? null : num(r.Electronegativity);

		return {
			z,
			symbol: r.Symbol,
			/** URL segment, from the IUPAC English name: /iron, /ru/aluminium. */
			slug: name.en.toLowerCase(),
			name,
			wikidata: w?.qid ?? null,
			// In LANGS order: Wikidata returns rows in any order, which made every rebuild a diff.
			wikipedia: Object.fromEntries(LANGS.filter((l) => w?.wikipedia[l]).map((l) => [l, w!.wikipedia[l]])),
			category: CATEGORY[r.GroupBlock],
			...placement(z),
			mass: standard
				? { value: standard.value, text: standard.text, source: 'ciaaw' }
				: massNumber
					? { value: massNumber, text: `[${massNumber}]`, source: 'pubchem-isotope' }
					: {
							value: pubchemMass,
							text: pubchemMass === null ? null : `[${Math.round(pubchemMass)}]`,
							source: 'pubchem-isotope'
						},
			config: configOf(r),
			configPredicted: fix.configPredicted(z),
			shells: shells(z, configs),
			state:
				fix.STATE[z]?.state ??
				(state.includes('solid') ? 'solid' : state.includes('liquid') ? 'liquid' : 'gas'),
			statePredicted: fix.statePredicted(z),
			electronegativity,
			/** As published: two decimals (2.20), or one for Pauling's unrevised values (0.9). */
			electronegativityText:
				electronegativity === null
					? null
					: electronegativity.toFixed(fix.ELECTRONEGATIVITY_ONE_DECIMAL.has(z) ? 1 : 2),
			/** Single-bond covalent radius, Cordero 2008. */
			atomicRadius: fix.COVALENT_RADIUS[z] ?? null,
			ionizationEnergy: ionization.get(z) ?? null,
			electronAffinity: fix.ELECTRON_AFFINITY[z] ?? null,
			oxidationStates: oxidationStates(z, r.OxidationStates),
			meltingPoint: value('meltingPoint', r.MeltingPoint),
			meltsUnderPressure: fix.MELTS_UNDER_PRESSURE.has(z),
			boilingPoint: value('boilingPoint', r.BoilingPoint),
			sublimes: fix.SUBLIMES.has(z),
			density: value('density', r.Density),
			yearDiscovered:
				fix.DISCOVERY[z]?.year ?? (r.YearDiscovered === 'Ancient' ? 'ancient' : num(r.YearDiscovered)),
			discoveredBy: related.get(z)?.discoveredBy ?? [],
			namedAfter: related.get(z)?.namedAfter ?? []
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
				sources: {
					properties: PUBCHEM_URL,
					atomicWeights: CIAAW_URL,
					ionizationEnergies: 'https://physics.nist.gov/PhysRefData/ASD/ionEnergy.html',
					electronAffinities: 'https://en.wikipedia.org/wiki/Electron_affinity_(data_page)',
					covalentRadii: 'https://doi.org/10.1039/b801115j',
					names: WIKIDATA_URL,
					corrections: 'scripts/corrections.ts'
				},
				elements
			},
			null,
			'\t'
		)
	);
	console.log(`Wrote ${elements.length} elements, ${weights.size} CIAAW weights.`);
}

main();
