/**
 * Hand-checked data applied on top of PubChem and Wikidata by fetch-elements.ts.
 *
 * Audit of 2026-10-12: every field of every element was compared with a second source
 * (CRC Handbook via the `mendeleev` package, NIST ASD, CIAAW, NUBASE2020). Where PubChem
 * or Wikidata turned out wrong, outdated or presented an estimate as a measurement, the
 * fix lives here with the reason and the source, so `npm run data` keeps it.
 */

/**
 * Discovery credits were checked against the element's English Wikipedia infobox
 * ("discovered by", "first isolation"), which cites a source for each, and for elements
 * from 101 on, the IUPAC/IUPAP Joint Working Party decisions it reports.
 */
const WIKI = (title: string) => `https://en.wikipedia.org/wiki/${title}`;

type Discovery = {
	year?: number | 'ancient';
	/** Wikidata items of the people or institutions credited; [] when known since antiquity. */
	by?: string[];
	why: string;
	source: string;
};

/** Discovery year and discoverers where PubChem or Wikidata disagree with the standard credit. */
export const DISCOVERY: Record<number, Discovery> = {
	6: {
		by: [],
		why: 'Known since antiquity; Lavoisier only classed it as an element.',
		source: WIKI('Carbon')
	},
	8: {
		by: ['Q70538', 'Q159636'],
		why: 'Scheele and Priestley discovered oxygen independently; 1774 is Priestley’s year.',
		source: WIKI('Oxygen')
	},
	9: {
		year: 1886,
		by: ['Q102804'],
		why: 'Isolated by Moissan in 1886; 1670 was glass etching.',
		source: WIKI('Fluorine')
	},
	12: {
		year: 1755,
		why: 'Black recognised magnesium as an element in 1755.',
		source: WIKI('Magnesium')
	},
	13: {
		year: 1824,
		by: ['Q44412'],
		why: 'Isolated by Ørsted in 1824 (announced 1825); not known in antiquity.',
		source: WIKI('Aluminium')
	},
	14: {
		year: 1823,
		why: 'Berzelius isolated silicon in 1823 (published 1824).',
		source: WIKI('Silicon')
	},
	16: {
		by: [],
		why: 'Known since antiquity; Lavoisier only classed it as an element.',
		source: WIKI('Sulfur')
	},
	20: {
		year: 1808,
		why: 'Davy isolated calcium in 1808; only lime was known in antiquity.',
		source: WIKI('Calcium')
	},
	22: {
		by: ['Q498817'],
		why: 'Discovered by William Gregor in 1791, not Wöhler.',
		source: WIKI('Titanium')
	},
	40: {
		by: ['Q160196'],
		why: 'Klaproth discovered zirconium in 1789; others later purified the metal.',
		source: WIKI('Zirconium')
	},
	44: {
		year: 1844,
		why: 'Klaus discovered ruthenium in 1844; Osann’s 1827 claim was not confirmed.',
		source: WIKI('Ruthenium')
	},
	59: {
		by: ['Q89390'],
		why: 'Auer von Welsbach split didymium in 1885; Mosander found didymium itself.',
		source: WIKI('Praseodymium')
	},
	76: {
		by: ['Q377800'],
		why: 'Osmium was discovered by Tennant alone.',
		source: WIKI('Osmium')
	},
	78: {
		by: ['Q470306'],
		why: 'Credited to Antonio de Ulloa, 1735.',
		source: WIKI('Platinum')
	},
	85: {
		by: ['Q3012319', 'Q963428', 'Q173028'],
		why: 'Corson, MacKenzie and Segrè made astatine together.',
		source: WIKI('Astatine')
	},
	92: {
		by: ['Q160196'],
		why: 'Klaproth discovered uranium in 1789; Péligot isolated the metal in 1841.',
		source: WIKI('Uranium')
	},
	102: {
		year: 1965,
		by: ['Q259517'],
		why: 'IUPAC credits Dubna (1965–66); the 1957 Stockholm claim was wrong.',
		source: WIKI('Nobelium')
	},
	104: {
		year: 1969,
		by: ['Q259517', 'Q1133630'],
		why: 'IUPAC shares the credit between Dubna (claims from 1964) and Berkeley (1969).',
		source: WIKI('Rutherfordium')
	},
	106: {
		by: ['Q1133630'],
		why: 'IUPAC credits the Berkeley–Livermore team (Ghiorso, 1974).',
		source: WIKI('Seaborgium')
	},
	107: {
		year: 1981,
		by: ['Q703993'],
		why: 'IUPAC credits GSI Darmstadt (1981).',
		source: WIKI('Bohrium')
	},
	113: {
		by: ['Q1153275'],
		why: 'IUPAC credits RIKEN (Japan), not Dubna.',
		source: WIKI('Nihonium')
	}
};

/**
 * "Named after" links to drop per element: the name comes from a word or a mineral, not
 * from the person or place. Phosphorus means "light-bearer"; cadmium comes from "cadmia"
 * (calamine); manganese from the mineral magnesia, not the modern Magnesia prefecture.
 */
export const NOT_EPONYMS: Record<number, string[]> = {
	15: ['Q1775444'],
	25: ['Q205668'],
	48: ['Q27613']
};

/** Lawrencium's ground state is 7s² 7p¹, not 6d¹ (NIST ASD; ionization energy measured in 2015). */
export const CONFIG: Record<number, string> = {
	103: '[Rn]7s2 5f14 7p1'
};

/**
 * Nobody has seen a weighable sample of astatine, francium or elements from fermium on:
 * their state is a prediction. Configurations from lawrencium on are calculated.
 */
export const statePredicted = (z: number) => z === 85 || z === 87 || z >= 100;
export const configPredicted = (z: number) => z >= 103;

type Field = 'meltingPoint' | 'boilingPoint' | 'density' | 'electronegativity';

/** PubChem values that are estimates or where sources disagree widely: shown as "no data". */
export const REMOVE: Record<number, Partial<Record<Field, string>>> = {
	85: {
		meltingPoint: 'Estimate; no bulk sample has been made.',
		density: 'Estimate; no bulk sample has been made.'
	},
	87: { meltingPoint: 'Estimate; no bulk sample has been made.' },
	88: {
		boilingPoint: 'Sources disagree: 1413 K (PubChem) vs 2010 K (Wikidata).'
	},
	95: {
		boilingPoint: 'Sources disagree: 2284 K (PubChem) vs 2880 K (Wikidata).',
		electronegativity: 'Pauling’s estimate 1.3, not a measured value.'
	},
	96: { electronegativity: 'Pauling’s estimate 1.3, not a measured value.' },
	97: { electronegativity: 'Pauling’s estimate 1.3, not a measured value.' },
	98: { electronegativity: 'Pauling’s estimate 1.3, not a measured value.' },
	99: { electronegativity: 'Pauling’s estimate 1.3, not a measured value.' },
	100: {
		meltingPoint: 'Prediction.',
		electronegativity: 'Pauling’s estimate 1.3, not a measured value.'
	},
	101: {
		meltingPoint: 'Prediction.',
		electronegativity: 'Pauling’s estimate 1.3, not a measured value.'
	},
	102: {
		meltingPoint: 'Prediction.',
		electronegativity: 'Pauling’s estimate 1.3, not a measured value.'
	},
	103: {
		meltingPoint: 'Prediction.',
		electronegativity: 'Pauling’s estimate 1.3, not a measured value.'
	}
};

/**
 * Melting points that hold only under pressure, and "boiling points" that are really
 * sublimation (CRC Handbook). Helium solidifies only above ~25 atm; arsenic and graphite
 * turn straight into vapour at normal pressure.
 */
export const MELTS_UNDER_PRESSURE = new Set([2, 6, 33]);
export const SUBLIMES = new Set([6, 33]);

/**
 * Main oxidation states missing from PubChem's short list (Greenwood & Earnshaw, as
 * tabulated in Wikipedia's "List of oxidation states of the elements"): xenon fluorides,
 * chlorine(III), Mo(IV) and so on. Merged with PubChem's list.
 */
export const OXIDATION_EXTRA: Record<number, number[]> = {
	6: [-4],
	16: [2],
	17: [3],
	32: [-4],
	34: [2],
	35: [3],
	36: [2],
	42: [4],
	44: [4],
	46: [4],
	50: [-4],
	52: [2],
	53: [3],
	54: [2, 4, 6, 8],
	74: [4],
	84: [-2],
	86: [2]
};

/**
 * Superheavy elements: only states confirmed by experiment (RfCl₄, DbOCl₃, SgO₂Cl₂, BhO₃Cl,
 * HsO₄). From meitnerium on, nothing is confirmed, so PubChem's predictions are dropped.
 */
export const OXIDATION_SUPERHEAVY: Record<number, number[]> = {
	104: [4],
	105: [5],
	106: [6],
	107: [7],
	108: [8]
};
export const OXIDATION_UNKNOWN_FROM = 109;

/**
 * Electron affinity, eV: measured values only, from Wikipedia's "Electron affinity (data
 * page)" (revision of 2026-10-12), which cites a primary measurement for each. It replaces
 * PubChem, which had outdated values (fluorine 3.339 instead of 3.401, gallium 0.3 instead
 * of 0.301) and many gaps. Estimates and calculations (Po, Fr, Ra, most actinides,
 * superheavy elements, four lanthanides) are left out. 'unstable': the atom forms no
 * stable negative ion.
 * https://en.wikipedia.org/wiki/Electron_affinity_(data_page)
 */
export const ELECTRON_AFFINITY: Record<number, number | 'unstable'> = {
	1: 0.754195,
	2: 'unstable',
	3: 0.618049,
	4: 'unstable',
	5: 0.279723,
	6: 1.2621226,
	7: 'unstable',
	8: 1.46111297,
	9: 3.4011898,
	10: 'unstable',
	11: 0.547926,
	12: 'unstable',
	13: 0.43283,
	14: 1.3895212,
	15: 0.746609,
	16: 2.0771042,
	17: 3.612725,
	18: 'unstable',
	19: 0.501459,
	20: 0.02455,
	21: 0.17938,
	22: 0.07554,
	23: 0.52766,
	24: 0.675928,
	25: 'unstable',
	26: 0.153236,
	27: 0.662255,
	28: 1.15716,
	29: 1.23578,
	30: 'unstable',
	31: 0.301166,
	32: 1.2326764,
	33: 0.804486,
	34: 2.020667,
	35: 3.363588,
	36: 'unstable',
	37: 0.485916,
	38: 0.05206,
	39: 0.31129,
	40: 0.43328,
	41: 0.9174,
	42: 0.74723,
	44: 1.04627,
	45: 1.14289,
	46: 0.56214,
	47: 1.30447,
	48: 'unstable',
	49: 0.38392,
	50: 1.11207,
	51: 1.047401,
	52: 1.970875,
	53: 3.0590465,
	54: 'unstable',
	55: 0.4715983,
	56: 0.14462,
	57: 0.557546,
	58: 0.60016,
	59: 0.10923,
	60: 0.09749,
	63: 0.116,
	64: 0.212,
	65: 0.13131,
	66: 0.015,
	69: 1.029,
	70: 'unstable',
	71: 0.2388,
	72: 0.178,
	73: 0.328859,
	74: 0.8165,
	75: 0.060396,
	76: 1.077661,
	77: 1.564057,
	78: 2.1251,
	79: 2.30861,
	80: 'unstable',
	81: 0.320053,
	82: 0.356721,
	83: 0.942362,
	85: 2.41578,
	86: 'unstable',
	90: 0.60769,
	92: 0.31497
};

/**
 * Single-bond covalent radius, pm: Cordero et al., "Covalent radii revisited",
 * Dalton Trans. 2008, 2832–2838, doi:10.1039/b801115j. Carbon is sp³; manganese, iron and
 * cobalt are the low-spin values. Replaces PubChem's radius, which mixed van der Waals
 * radii from different sources (copper 140 pm next to iron 194 pm).
 */
export const COVALENT_RADIUS: Record<number, number> = {
	1: 31,
	2: 28,
	3: 128,
	4: 96,
	5: 84,
	6: 76,
	7: 71,
	8: 66,
	9: 57,
	10: 58,
	11: 166,
	12: 141,
	13: 121,
	14: 111,
	15: 107,
	16: 105,
	17: 102,
	18: 106,
	19: 203,
	20: 176,
	21: 170,
	22: 160,
	23: 153,
	24: 139,
	25: 139,
	26: 132,
	27: 126,
	28: 124,
	29: 132,
	30: 122,
	31: 122,
	32: 120,
	33: 119,
	34: 120,
	35: 120,
	36: 116,
	37: 220,
	38: 195,
	39: 190,
	40: 175,
	41: 164,
	42: 154,
	43: 147,
	44: 146,
	45: 142,
	46: 139,
	47: 145,
	48: 144,
	49: 142,
	50: 139,
	51: 139,
	52: 138,
	53: 139,
	54: 140,
	55: 244,
	56: 215,
	57: 207,
	58: 204,
	59: 203,
	60: 201,
	61: 199,
	62: 198,
	63: 198,
	64: 196,
	65: 194,
	66: 192,
	67: 192,
	68: 189,
	69: 190,
	70: 187,
	71: 187,
	72: 175,
	73: 170,
	74: 162,
	75: 151,
	76: 144,
	77: 141,
	78: 136,
	79: 136,
	80: 132,
	81: 145,
	82: 146,
	83: 148,
	84: 140,
	85: 150,
	86: 150,
	87: 260,
	88: 221,
	89: 215,
	90: 206,
	91: 200,
	92: 196,
	93: 190,
	94: 187,
	95: 180,
	96: 169
};
