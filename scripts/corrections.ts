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
 * from 101 on, the IUPAC/IUPAP Joint Working Party decisions it reports. The rule: the
 * discoverer is who first recognised the element (Black for magnesia, Scheele for baryta),
 * not who later isolated the metal. Second audit 2026-10-14: infoboxes of all 118 elements.
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
	4: {
		by: ['Q333438'],
		why: 'Vauquelin discovered beryllium in 1798; Wöhler and Bussy only isolated the metal in 1828.',
		source: WIKI('Beryllium')
	},
	5: {
		by: ['Q153185', 'Q327722', 'Q131761'],
		why: 'Gay-Lussac and Thénard (30 June 1808) and Davy (9 July 1808) found boron independently.',
		source: WIKI('Boron')
	},
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
	25: {
		by: ['Q70538', 'Q353490'],
		why: 'Scheele recognised manganese in 1774 and Gahn isolated it the same year.',
		source: WIKI('Manganese')
	},
	30: {
		year: 'ancient',
		by: [],
		why: 'Zinc was made in India before 1000 BC and used in brass since antiquity; 1746 is Marggraf’s isolation in Europe.',
		source: WIKI('Zinc')
	},
	33: {
		by: [],
		why: 'Known since antiquity (Arabic alchemists before AD 815); Albertus Magnus is one early account, not the discoverer.',
		source: WIKI('Arsenic')
	},
	39: {
		by: ['Q312571'],
		why: 'Gadolin discovered yttria in 1794; Wöhler only isolated the metal in 1838.',
		source: WIKI('Yttrium')
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
	56: {
		year: 1772,
		by: ['Q70538'],
		why: 'Scheele distinguished baryta in 1772; Davy isolated the metal in 1808 (as with magnesium and strontium, the earlier recognition counts).',
		source: WIKI('Barium')
	},
	58: {
		by: ['Q160196', 'Q900478', 'Q151911'],
		why: 'Klaproth and, independently, Hisinger with Berzelius found ceria in 1803; Hisinger was missing.',
		source: WIKI('Cerium')
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
	83: {
		year: 'ancient',
		by: [],
		why: 'Known before AD 1000 (Arabic alchemists); 1753 is when Geoffroy showed it differs from lead and tin. CRC: known to the ancients.',
		source: WIKI('Bismuth')
	},
	85: {
		by: ['Q3012319', 'Q963428', 'Q173028'],
		why: 'Corson, MacKenzie and Segrè made astatine together.',
		source: WIKI('Astatine')
	},
	89: {
		by: ['Q468371', 'Q76033'],
		why: 'Debierne reported actinium in 1899, Giesel independently in 1902; whether Debierne’s sample was actinium is disputed.',
		source: WIKI('Actinium')
	},
	91: {
		by: ['Q213667', 'Q4402060', 'Q57065', 'Q56189'],
		why: 'Fajans and Göhring found protactinium-234m in 1913; Hahn and Meitner found protactinium-231 in 1917–18. Göhring was missing.',
		source: WIKI('Protactinium')
	},
	92: {
		by: ['Q160196'],
		why: 'Klaproth discovered uranium in 1789; Péligot isolated the metal in 1841.',
		source: WIKI('Uranium')
	},
	95: {
		by: ['Q48973', 'Q2023093', 'Q5973096', 'Q468345'],
		why: 'Seaborg, James, Morgan and Ghiorso; Wikidata named Seaborg alone.',
		source: WIKI('Americium')
	},
	96: {
		by: ['Q48973', 'Q2023093', 'Q468345'],
		why: 'Seaborg, James and Ghiorso; Wikidata named Seaborg alone.',
		source: WIKI('Curium')
	},
	99: {
		by: ['Q1133630'],
		why: 'Found by a large Berkeley team (with Argonne and Los Alamos) in the debris of the 1952 hydrogen bomb test.',
		source: WIKI('Einsteinium')
	},
	100: {
		by: ['Q1133630'],
		why: 'Found by the Berkeley team led by Ghiorso in the 1952 bomb debris; Wikidata named Seaborg alone.',
		source: WIKI('Fermium')
	},
	101: {
		by: ['Q1133630'],
		why: 'Ghiorso, Harvey, Choppin, Thompson and Seaborg at Berkeley; Wikidata named Seaborg alone.',
		source: WIKI('Mendelevium')
	},
	102: {
		year: 1965,
		by: ['Q259517'],
		why: 'IUPAC credits Dubna (1965–66); the 1957 Stockholm claim was wrong.',
		source: WIKI('Nobelium')
	},
	103: {
		by: ['Q1133630', 'Q259517'],
		why: 'IUPAC credits Berkeley (1961) and Dubna jointly; Wikidata named Ghiorso alone.',
		source: WIKI('Lawrencium')
	},
	104: {
		year: 1969,
		by: ['Q259517', 'Q1133630'],
		why: 'IUPAC shares the credit between Dubna (claims from 1964) and Berkeley (1969).',
		source: WIKI('Rutherfordium')
	},
	105: {
		year: 1970,
		why: 'IUPAC shares the credit between Dubna (claims from 1968) and Berkeley (1970); as for rutherfordium, the year both had it.',
		source: WIKI('Dubnium')
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
	},
	114: {
		by: ['Q259517', 'Q519826'],
		why: 'IUPAC credits the Dubna–Livermore collaboration; Livermore was missing.',
		source: WIKI('Flerovium')
	},
	115: {
		by: ['Q259517', 'Q519826'],
		why: 'IUPAC credits the Dubna–Livermore collaboration; Livermore was missing.',
		source: WIKI('Moscovium')
	},
	116: {
		by: ['Q259517', 'Q519826'],
		why: 'IUPAC credits the Dubna–Livermore collaboration; Livermore was missing.',
		source: WIKI('Livermorium')
	},
	117: {
		by: ['Q259517', 'Q519826', 'Q714439', 'Q29052'],
		why: 'IUPAC credits the Dubna, Livermore, Oak Ridge and Vanderbilt collaboration; Wikidata named Oganessian alone.',
		source: WIKI('Tennessine')
	},
	118: {
		year: 2002,
		by: ['Q259517', 'Q519826'],
		why: 'First atom made at Dubna in 2002 (reported 2006) by the Dubna–Livermore collaboration; same rule as nihonium (first event).',
		source: WIKI('Oganesson')
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

/** "Named after" items that replace Wikidata's, where Wikidata points at the wrong item. */
export const EPONYMS: Record<number, { qids: string[]; why: string; source: string }> = {
	94: {
		qids: ['Q339'],
		why: 'Named after the dwarf planet Pluto, following uranium and neptunium; Wikidata points at the Roman god.',
		source: WIKI('Plutonium')
	}
};

type Lang = 'en' | 'ru' | 'fr' | 'de' | 'it' | 'es' | 'zh' | 'pt';

/**
 * Element names that override Wikidata's label. Brazilian Portuguese: "hólmio" (Houaiss,
 * Dicio, InfoEscola), "nihônio" (the Portuguese form IUPAC/IUPAP's recommendation
 * suggested, Revista Pesquisa FAPESP 2016).
 */
export const NAMES: Record<number, { name: Partial<Record<Lang, string>>; why: string; source: string }> = {
	67: {
		name: { pt: 'Hólmio' },
		why: 'Wikidata’s pt-br label "Hôlmio" has the wrong accent.',
		source: 'https://www.dicio.com.br/holmio/'
	},
	113: {
		name: { pt: 'Nihônio' },
		why: 'Wikidata’s pt-br label "Niônio" drops the h of Nihon.',
		source: 'https://revistapesquisa.fapesp.br/escolhidos-os-nomes-dos-novos-elementos-da-tabela-periodica-2/'
	}
};

/**
 * Labels of people and places where Wikidata has none in a language (the English one would
 * show in Russian text) or a form that reads wrongly in a list ("Клаус, Карл Карлович").
 */
export const LABELS: Record<string, Partial<Record<Lang, string>>> = {
	Q554178: { ru: 'Карл Клаус' },
	Q2939237: { ru: 'Карло Перрье' },
	Q69080: { ru: 'Карл Герман' },
	Q260328: { ru: 'Чарльз Кориелл' },
	Q904562: { ru: 'Лоуренс Гленденин' },
	Q85727: { ru: 'Отто Берг' },
	Q7342248: { ru: 'Роберт Оуэнс' },
	Q1989591: { ru: 'Кеннет Стрит-младший' },
	Q76033: { ru: 'Фридрих Гизель', zh: '弗里德里希·奥斯卡·吉塞尔' },
	Q4402060: { ru: 'Освальд Гёринг' },
	Q2023093: { ru: 'Ральф Джеймс', zh: '拉尔夫·詹姆斯' },
	Q5973096: { ru: 'Леон Морган', zh: '莱昂·摩根' },
	Q519826: { zh: '劳伦斯利弗莫尔国家实验室' },
	Q38060: { pt: 'Gália' },
	Q182101: { pt: 'Tântalo' }
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

/**
 * Predicted states newer than PubChem's: relativistic calculations make copernicium and
 * flerovium liquids and oganesson a solid at room temperature ("Copernicium: a relativistic
 * noble liquid", Mewes et al., Angew. Chem. 2019; "Oganesson: a noble gas element that is
 * neither noble nor a gas", Smits et al., Angew. Chem. 2020; flerovium as in the Wikipedia
 * infobox and the calculations it cites). Still shown as predictions.
 */
export const STATE: Record<number, { state: 'solid' | 'liquid' | 'gas'; why: string; source: string }> = {
	112: {
		state: 'liquid',
		why: 'Predicted melting point 283 ± 11 K, boiling point 340 ± 10 K; PubChem says solid.',
		source: WIKI('Copernicium')
	},
	114: {
		state: 'liquid',
		why: 'Predicted melting point 284 ± 50 K; PubChem says solid.',
		source: WIKI('Flerovium')
	},
	118: {
		state: 'solid',
		why: 'Predicted melting point 325 ± 15 K; PubChem says gas.',
		source: WIKI('Oganesson')
	}
};

/**
 * Mass numbers of the most stable isotope where PubChem picks one that is unconfirmed
 * (a single decay chain): the longest-lived confirmed isotope instead, as Wikipedia's
 * isotope lists give it from NUBASE2020.
 */
export const MASS_NUMBER: Record<number, { value: number; why: string; source: string }> = {
	109: { value: 278, why: 'PubChem [277]; ²⁷⁸Mt is the longest-lived known isotope (4.5 s).', source: WIKI('Isotopes_of_meitnerium') },
	110: { value: 281, why: 'PubChem [282]; ²⁸²Ds is unconfirmed, ²⁸¹Ds (14 s) is the longest-lived confirmed one.', source: WIKI('Isotopes_of_darmstadtium') },
	112: { value: 285, why: 'PubChem [286]; ²⁸⁶Cn is unconfirmed, ²⁸⁵Cn (30 s) is the most stable known one.', source: WIKI('Copernicium') },
	114: { value: 289, why: 'PubChem [290]; ²⁹⁰Fl is unconfirmed, ²⁸⁹Fl is the longest-lived known one.', source: WIKI('Isotopes_of_flerovium') },
	118: { value: 294, why: 'PubChem [295]; ²⁹⁴Og is the only confirmed isotope.', source: WIKI('Oganesson') }
};

type Field = 'meltingPoint' | 'boilingPoint' | 'density' | 'electronegativity';

/** PubChem values that are estimates or where sources disagree widely: shown as "no data". */
export const REMOVE: Record<number, Partial<Record<Field, string>>> = {
	61: {
		boilingPoint: 'Estimate: Lange’s Handbook marks the 3000 °C as est.'
	},
	85: {
		meltingPoint: 'Estimate; no bulk sample has been made.',
		density: 'Estimate; no bulk sample has been made.',
		electronegativity: 'Pauling’s estimate 2.2; no weighable astatine compound has been made.'
	},
	87: {
		meltingPoint: 'Estimate; no bulk sample has been made.',
		electronegativity:
			'Pauling’s 0.7 is an extrapolation of uncertain provenance; calculations put francium above caesium (Wikipedia, Electronegativity and its data page).'
	},
	88: {
		boilingPoint: 'Sources disagree: 1413 K (PubChem) vs 2010 K (Wikidata).'
	},
	95: {
		boilingPoint: 'Sources disagree: 2284 K (PubChem) vs 2880 K (Wikidata).',
		electronegativity: 'Pauling’s estimate 1.3, not a measured value.',
		density: 'Sources disagree: 13.69 (PubChem) vs 12 (CRC, Lange, Wikipedia).'
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
 * PubChem values replaced by the CRC Handbook (via the `mendeleev` package) where the two
 * disagree and further sources side with CRC. Second audit 2026-10-14: every melting point,
 * boiling point and density compared with CRC, Lange, WebElements and Wikipedia.
 */
export const VALUE: Record<
	number,
	Partial<Record<'meltingPoint' | 'boilingPoint' | 'density', { value: number; why: string; source: string }>>
> = {
	1: {
		meltingPoint: {
			value: 13.99,
			why: 'PubChem 13.81 K is the triple point of para-hydrogen; ordinary hydrogen melts at 13.99 K (CRC).',
			source: WIKI('Hydrogen')
		}
	},
	6: {
		meltingPoint: {
			value: 4762,
			why: 'PubChem 3823 K (3550 °C) is lower than graphite’s own sublimation point; CRC gives the triple point, 4489 °C at 10.3 MPa.',
			source: WIKI('Melting_points_of_the_elements_(data_page)')
		}
	},
	36: {
		density: {
			value: 0.003749,
			why: '3.749 g/L at 0 °C and 101.325 kPa (Lange, Wikipedia); PubChem 3.733 is low.',
			source: WIKI('Densities_of_the_elements_(data_page)')
		}
	},
	54: {
		density: {
			value: 0.005894,
			why: '5.894 g/L at 0 °C and 101.325 kPa (Wikipedia, van der Waals); PubChem 5.887 is low.',
			source: WIKI('Densities_of_the_elements_(data_page)')
		}
	},
	56: {
		boilingPoint: {
			value: 2118,
			why: '1845 °C in CRC and Lange (WebElements 1870 °C); PubChem 1897 °C matches none of them.',
			source: WIKI('Boiling_points_of_the_elements_(data_page)')
		}
	},
	96: {
		boilingPoint: {
			value: 3383,
			why: 'About 3110 °C (WebElements, Lange; CRC about 3100 °C); PubChem rounds to 3400 K.',
			source: WIKI('Boiling_points_of_the_elements_(data_page)')
		}
	},
	97: {
		meltingPoint: {
			value: 1259,
			why: '986 °C in the current CRC Handbook and Wikipedia; PubChem 1050 °C is an older value.',
			source: WIKI('Berkelium')
		},
		density: {
			value: 14.78,
			why: 'α-berkelium 14.78 g/cm³ (CRC, Lange, WebElements); PubChem rounds to 14.',
			source: WIKI('Densities_of_the_elements_(data_page)')
		}
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
 * Pauling electronegativities published with one decimal (Pauling's 1960 values that
 * Allred did not recalculate in 1961), per Wikipedia's "Electronegativities of the elements
 * (data page)". All others have two: hydrogen is 2.20, not 2.2, and radium 0.9, not 0.90.
 */
export const ELECTRONEGATIVITY_ONE_DECIMAL = new Set([41, 43, 44, 52, 54, 72, 73, 75, 76, 84, 88, 89, 90, 91]);

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
 *
 * Left out: the radii Cordero et al. interpolated "for elements for which structural data
 * is lacking, notably the noble gases" (abstract, PubMed 18478144), the ones the paper gives
 * without a standard deviation: He 28, Ne 58, Pm 199, At 150, Rn 150, Fr 260, Ac 215, Pa 200.
 */
export const COVALENT_RADIUS: Record<number, number> = {
	1: 31,
	3: 128,
	4: 96,
	5: 84,
	6: 76,
	7: 71,
	8: 66,
	9: 57,
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
	88: 221,
	90: 206,
	92: 196,
	93: 190,
	94: 187,
	95: 180,
	96: 169
};
