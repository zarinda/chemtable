import type { Category, PropertyKey } from '../elements';
import type { Lang } from './langs';
import { en } from './locales/en';
import { ru } from './locales/ru';
import { fr } from './locales/fr';
import { de } from './locales/de';
import { it } from './locales/it';
import { es } from './locales/es';
import { zh } from './locales/zh';
import { pt } from './locales/pt';

export type { Lang } from './langs';

export type Term =
	| PropertyKey
	| 'group'
	| 'period'
	| 'block'
	| 'config'
	| 'shells'
	| 'boilingPoint'
	| 'electronAffinity'
	| 'oxidationStates';

/** Sections of the privacy policy, in page order. */
export const PRIVACY_SECTIONS = [
	'collect',
	'storage',
	'hosting',
	'external',
	'children',
	'ads',
	'rights',
	'changes'
] as const;
export type PrivacySection = (typeof PRIVACY_SECTIONS)[number];

/** Facts an element summary sentence is built from, already formatted for the language. */
export type SummaryFacts = {
	name: string;
	symbol: string;
	z: number;
	group: number | null;
	period: number;
	block: string;
	category: string;
	state: string;
	statePredicted: boolean;
	/** Formatted mass; for unstable elements the bare mass number of the most stable isotope. */
	mass: string | null;
	massIsIsotope: boolean;
};

export type Dict = {
	/** False until a native speaker has reviewed this translation. */
	reviewed: boolean;
	siteName: string;
	title: string;
	hint: string;
	/** The hint on phones, where the table is a map to slide a finger over. */
	hintTouch: string;
	colorBy: string;
	categories: string;
	category: Record<Category, string>;
	property: Record<PropertyKey, string>;
	unit: Record<PropertyKey, string>;
	noData: string;
	period: string;
	group: string;
	block: string;
	state: Record<'solid' | 'liquid' | 'gas', string>;
	predicted: string;
	/** After a melting point reached only under pressure (helium, carbon, arsenic). */
	underPressure: string;
	/** After a boiling point that is really a sublimation point (carbon, arsenic). */
	sublimes: string;
	/** In place of an electron affinity for atoms that form no stable negative ion. */
	anionUnstable: string;
	atomicMass: string;
	massIsotope: string;
	config: string;
	shells: string;
	boilingPoint: string;
	oxidationStates: string;
	electronAffinity: string;
	discovered: string;
	ancient: string;
	discoveredBy: string;
	namedAfter: string;
	close: string;
	/** Opens the element picked on the phone map. */
	open: string;
	sources: string;
	sourcesNote: string;
	theme: Record<'light' | 'dark' | 'system', string>;
	language: string;
	/** Credit before the author name in the footer, with its trailing space: "Made by " Zarinda. */
	madeBy: string;
	explainToggle: string;
	/** One-paragraph explanations of each term, for students. */
	explain: Record<Term, string>;
	/** How each property changes across the table. */
	trend: Record<PropertyKey, string>;

	seo: {
		homeTitle: string;
		homeDescription: string;
		elementTitle: (name: string, symbol: string) => string;
		elementDescription: (f: SummaryFacts) => string;
	};
	article: {
		/** Line under the element name, e.g. "Chemical element 26". */
		kicker: (z: number) => string;
		summary: (f: SummaryFacts) => string;
		properties: string;
		property: string;
		value: string;
		related: string;
		sameGroup: (group: number) => string;
		samePeriod: (period: number) => string;
		previous: string;
		next: string;
		readMore: string;
		wikipedia: string;
		backToTable: string;
	};
	about: {
		heading: string;
		paragraphs: string[];
	};
	data: {
		heading: string;
		text: string;
	};
	/** Footer link to the licences of the bundled software and fonts. */
	licenses: string;
	privacy: {
		/** Page heading and footer link. */
		title: string;
		description: string;
		/** Before the date, e.g. "Last updated:". */
		updated: string;
		/** Who runs the site; receives the author name. */
		intro: (author: string) => string;
		sections: Record<PrivacySection, { heading: string; paragraphs: string[] }>;
		/** The advertising section while ADS_LIVE is false. */
		adsOff: string;
		/** Before the link to the author's site in the "Your rights" section. */
		contact: string;
		back: string;
	};
	/** Page for addresses that do not exist. */
	notFound: {
		title: string;
		text: string;
		/** Before links to the elements a mistyped address resembles. */
		suggest: string;
		back: string;
		/** Receives the heaviest known element: "There is no element 404 either…". */
		beyond: (name: string, z: number) => string;
	};
	/** Printable PDF table: the download section and the labels printed on the sheet. */
	print: {
		heading: string;
		text: string;
		color: string;
		bw: string;
		atomicNumber: string;
		symbol: string;
		name: string;
	};
	/** Page per property (/electronegativity): the table coloured by it and every value in a list. */
	propertyPage: {
		/** Page heading. */
		title: Record<PropertyKey, string>;
		/** <title>, built from the heading. */
		seoTitle: (title: string) => string;
		description: Record<PropertyKey, string>;
		/** Heading of the list of values. */
		list: Record<PropertyKey, string>;
		/** Label of the sort buttons. */
		sortBy: string;
		sort: Record<'desc' | 'asc' | 'z', string>;
		/** Heading over the elements without a value. */
		missing: string;
		source: string;
		/** Link from the colour scale to the list. */
		allValues: string;
		/** Footer heading over the links to every property page. */
		all: string;
	};
};

export const UI: Record<Lang, Dict> = { en, ru, fr, de, it, es, zh, pt };
