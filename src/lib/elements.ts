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
	/** Pauling value as published: '2.20', or '0.9' where only one decimal is known. */
	electronegativityText: string | null;
	/** Single-bond covalent radius, pm (Cordero 2008). */
	atomicRadius: number | null;
	ionizationEnergy: number | null;
	/** eV; 'unstable' when the atom forms no stable negative ion. */
	electronAffinity: number | 'unstable' | null;
	oxidationStates: string[];
	meltingPoint: number | null;
	/** Melts only under pressure: helium, carbon, arsenic. */
	meltsUnderPressure: boolean;
	boilingPoint: number | null;
	/** Turns straight into vapour at normal pressure; boilingPoint is the sublimation point. */
	sublimes: boolean;
	density: number | null;
	yearDiscovered: number | 'ancient' | null;
	/** People or institutions credited with the discovery (Wikidata P61). */
	discoveredBy: Named[];
	/** Person, place, sky object or mythical figure the name honours (Wikidata P138). */
	namedAfter: Named[];
};

export type Named = { qid: string; name: Record<Lang, string> };

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

/** URL segment of each property's page: /electronegativity, /ru/covalent-radius. */
export const PROPERTY_SLUG: Record<PropertyKey, string> = {
	mass: 'atomic-mass',
	electronegativity: 'electronegativity',
	atomicRadius: 'covalent-radius',
	density: 'density',
	meltingPoint: 'melting-point',
	ionizationEnergy: 'ionization-energy'
};

export const byPropertySlug = new Map(PROPERTIES.map((key) => [PROPERTY_SLUG[key], key]));

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
