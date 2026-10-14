import { PUBLIC_SITE_URL } from '$app/env/public';
import { PROPERTY_SLUG, type Element, type PropertyKey } from './elements';
import { LANGS, LANG_INFO, DEFAULT_LANG, localize, type Lang } from './i18n/langs';

export const SITE_URL = PUBLIC_SITE_URL;

export const absolute = (path: string) => `${SITE_URL}${path}`;

/** Who makes ChemTable: credited in the footer, JSON-LD, llms.txt and README. */
export const AUTHOR = {
	name: 'Zarinda',
	url: 'https://zarinda.com'
};

/**
 * Licence of ChemTable's own work: the compilation, the corrections and the texts. Values taken
 * from other sources keep those sources' terms (DATA_CREDITS); facts themselves are free to use.
 */
export const DATA_LICENSE = {
	name: 'CC BY 4.0',
	url: 'https://creativecommons.org/licenses/by/4.0/'
};

/** Who each column comes from and on what terms; repeated in elements.json, llms.txt and the README. */
export const DATA_CREDITS = [
	{
		data: 'Ionization energies',
		source:
			'Kramida, A., Ralchenko, Yu., Reader, J. and NIST ASD Team, NIST Atomic Spectra Database (NIST Standard Reference Database 78)',
		url: 'https://doi.org/10.18434/T4W30F',
		terms: 'NIST Standard Reference Data, © U.S. Secretary of Commerce on behalf of the United States'
	},
	{
		data: 'Covalent radii',
		source: 'Cordero, B. et al., Covalent radii revisited, Dalton Transactions, 2008, 2832–2838',
		url: 'https://doi.org/10.1039/b801115j',
		terms: 'values cited from the article'
	},
	{
		data: 'Electron affinities',
		source: 'Electron affinity (data page), Wikipedia, and the primary literature it cites',
		url: 'https://en.wikipedia.org/wiki/Electron_affinity_(data_page)',
		terms: 'Wikipedia text under CC BY-SA 4.0'
	},
	{
		data: 'Standard atomic weights',
		source: 'IUPAC Commission on Isotopic Abundances and Atomic Weights (CIAAW)',
		url: 'https://www.ciaaw.org/abridged-atomic-weights.htm',
		terms: 'values cited from IUPAC'
	},
	{
		data: 'Other properties',
		source: 'PubChem Periodic Table, National Library of Medicine (NIH)',
		url: 'https://pubchem.ncbi.nlm.nih.gov/periodic-table/',
		terms: 'US government work; PubChem may include third-party material'
	},
	{
		data: 'Names, discoverers, Wikipedia links',
		source: 'Wikidata',
		url: 'https://www.wikidata.org/',
		terms: 'CC0'
	}
];

export const homePath = (lang: Lang) => localize('/', lang);
export const elementPath = (e: Element, lang: Lang) => localize(`/${e.slug}`, lang);
export const privacyPath = (lang: Lang) => localize('/privacy', lang);
/** The print page; the PDFs themselves are at printPath (#lib/print.ts). */
export const printPagePath = (lang: Lang) => localize('/print', lang);
export const propertyPath = (key: PropertyKey, lang: Lang) => localize(`/${PROPERTY_SLUG[key]}`, lang);

/** Shown on the privacy policy and used as its sitemap date: change it with the policy. */
export const PRIVACY_UPDATED = '2026-10-12';

/** Pre-rendered Open Graph image for a page; `null` element means the home page. */
export const ogImagePath = (lang: Lang, e: Element | null) =>
	`/og/${lang}/${e ? e.slug : 'home'}.png`;

export type Alternate = { hreflang: string; href: string };

/** hreflang links for every language version of a page, plus x-default (English). */
export function alternates(pathFor: (lang: Lang) => string): Alternate[] {
	return [
		...LANGS.map((l) => ({ hreflang: LANG_INFO[l].tag, href: absolute(pathFor(l)) })),
		{ hreflang: 'x-default', href: absolute(pathFor(DEFAULT_LANG)) }
	];
}

export { summaryFacts } from './facts';
