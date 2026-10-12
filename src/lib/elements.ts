import data from './data/elements.json' with { type: 'json' };
import type { Lang } from './i18n/langs';

export type Category =
	| 'alkali-metal'
	| 'alkaline-earth-metal'
	| 'transition-metal'
	| 'post-transition-metal'
	| 'metalloid'
	| 'nonmetal'
	| 'halogen'
	| 'noble-gas'
	| 'lanthanide'
	| 'actinide';

export type Element = {
	z: number;
	symbol: string;
	/** URL segment from the IUPAC English name: 'iron'. */
	slug: string;
	name: Record<Lang, string>;
	wikidata: string | null;
	/** Wikipedia article per language, where one exists. */
	wikipedia: Partial<Record<Lang, string>>;
	category: Category;
	period: number;
	group: number | null;
	block: 's' | 'p' | 'd' | 'f';
	col: number;
	row: number;
	mass: { value: number | null; text: string | null; source: 'ciaaw' | 'pubchem-isotope' };
	config: string;
	configPredicted: boolean;
	shells: number[];
	state: 'solid' | 'liquid' | 'gas';
	statePredicted: boolean;
	electronegativity: number | null;
	atomicRadius: number | null;
	ionizationEnergy: number | null;
	electronAffinity: number | null;
	oxidationStates: string[];
	meltingPoint: number | null;
	boilingPoint: number | null;
	density: number | null;
	yearDiscovered: number | 'ancient' | null;
};

export const elements = data.elements as Element[];
export const sources = data.sources;
export const fetchedAt = data.fetchedAt;

export const CATEGORIES: Category[] = [
	'alkali-metal',
	'alkaline-earth-metal',
	'transition-metal',
	'post-transition-metal',
	'metalloid',
	'nonmetal',
	'halogen',
	'noble-gas',
	'lanthanide',
	'actinide'
];

export type PropertyKey =
	| 'mass'
	| 'electronegativity'
	| 'atomicRadius'
	| 'density'
	| 'meltingPoint'
	| 'ionizationEnergy';

export const PROPERTIES: PropertyKey[] = [
	'mass',
	'electronegativity',
	'atomicRadius',
	'density',
	'meltingPoint',
	'ionizationEnergy'
];

export function propertyValue(e: Element, key: PropertyKey): number | null {
	return key === 'mass' ? e.mass.value : e[key];
}

/** Density spans six orders of magnitude, so it is scaled logarithmically. */
const LOG_SCALE: Partial<Record<PropertyKey, boolean>> = { density: true };

/** Returns a 0–1 position of each element on the property's scale, or null when unknown. */
export function propertyScale(key: PropertyKey): Map<number, number | null> {
	const t = (v: number) => (LOG_SCALE[key] ? Math.log10(v) : v);
	const known = elements.map((e) => propertyValue(e, key)).filter((v): v is number => v !== null);
	const min = Math.min(...known.map(t));
	const max = Math.max(...known.map(t));
	return new Map(
		elements.map((e) => {
			const v = propertyValue(e, key);
			return [e.z, v === null ? null : (t(v) - min) / (max - min)];
		})
	);
}

export function propertyRange(key: PropertyKey): [number, number] {
	const known = elements.map((e) => propertyValue(e, key)).filter((v): v is number => v !== null);
	return [Math.min(...known), Math.max(...known)];
}

export const byPosition = new Map(elements.map((e) => [`${e.col}:${e.row}`, e]));

export const bySlug = new Map(elements.map((e) => [e.slug, e]));
