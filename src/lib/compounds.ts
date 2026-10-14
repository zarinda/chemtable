import type { Lang } from './i18n/langs';

/**
 * Substances with their own molar mass page (/molar-mass/sulfuric-acid). Molar masses are
 * computed from CIAAW atomic weights (#lib/molar.ts); `pubchem` is PubChem's MolecularWeight,
 * shown beside ours when the two differ in the last digit. Checked 2026-10-14: PubChem property
 * API by CID; names checked against the Wikidata labels of the same items.
 *
 * Names other than English and Russian are unreviewed, like the locales.
 */
export type Compound = {
	/** URL segment from the English name. */
	slug: string;
	/** As students write it: C2H5OH rather than C2H6O. */
	formula: string;
	cid: number;
	wikidata: string;
	pubchem: string;
	/** Name as a heading or on a card; lower case where the language allows. */
	name: Record<Lang, string>;
	/** The name as it follows "molar mass": "серной кислоты", "de l'acide sulfurique". */
	of: Record<Lang, string>;
	/** Another common name: table salt, caustic soda. */
	aka?: Record<Lang, string>;
	/** A sentence under the title where the name and the formula are not quite the same thing. */
	note?: Record<Lang, string>;
};

export const COMPOUNDS: Compound[] = [
	{
		slug: 'water',
		formula: 'H2O',
		cid: 962,
		wikidata: 'Q283',
		pubchem: '18.015',
		name: { en: 'water', ru: 'вода', fr: 'eau', de: 'Wasser', it: 'acqua', es: 'agua', zh: '水', pt: 'água' },
		of: {
			en: 'water',
			ru: 'воды',
			fr: 'de l’eau',
			de: 'von Wasser',
			it: 'dell’acqua',
			es: 'del agua',
			zh: '水',
			pt: 'da água'
		}
	},
	{
		slug: 'carbon-dioxide',
		formula: 'CO2',
		cid: 280,
		wikidata: 'Q1997',
		pubchem: '44.009',
		name: {
			en: 'carbon dioxide',
			ru: 'углекислый газ',
			fr: 'dioxyde de carbone',
			de: 'Kohlenstoffdioxid',
			it: 'anidride carbonica',
			es: 'dióxido de carbono',
			zh: '二氧化碳',
			pt: 'dióxido de carbono'
		},
		of: {
			en: 'carbon dioxide',
			ru: 'углекислого газа',
			fr: 'du dioxyde de carbone',
			de: 'von Kohlenstoffdioxid',
			it: 'dell’anidride carbonica',
			es: 'del dióxido de carbono',
			zh: '二氧化碳',
			pt: 'do dióxido de carbono'
		}
	},
	{
		slug: 'sodium-chloride',
		formula: 'NaCl',
		cid: 5234,
		wikidata: 'Q2314',
		pubchem: '58.44',
		name: {
			en: 'sodium chloride',
			ru: 'хлорид натрия',
			fr: 'chlorure de sodium',
			de: 'Natriumchlorid',
			it: 'cloruro di sodio',
			es: 'cloruro de sodio',
			zh: '氯化钠',
			pt: 'cloreto de sódio'
		},
		of: {
			en: 'sodium chloride',
			ru: 'хлорида натрия',
			fr: 'du chlorure de sodium',
			de: 'von Natriumchlorid',
			it: 'del cloruro di sodio',
			es: 'del cloruro de sodio',
			zh: '氯化钠',
			pt: 'do cloreto de sódio'
		},
		aka: {
			en: 'table salt',
			ru: 'поваренная соль',
			fr: 'sel de table',
			de: 'Kochsalz',
			it: 'sale da cucina',
			es: 'sal de mesa',
			zh: '食盐',
			pt: 'sal de cozinha'
		}
	},
	{
		slug: 'sulfuric-acid',
		formula: 'H2SO4',
		cid: 1118,
		wikidata: 'Q4118',
		pubchem: '98.08',
		name: {
			en: 'sulfuric acid',
			ru: 'серная кислота',
			fr: 'acide sulfurique',
			de: 'Schwefelsäure',
			it: 'acido solforico',
			es: 'ácido sulfúrico',
			zh: '硫酸',
			pt: 'ácido sulfúrico'
		},
		of: {
			en: 'sulfuric acid',
			ru: 'серной кислоты',
			fr: 'de l’acide sulfurique',
			de: 'von Schwefelsäure',
			it: 'dell’acido solforico',
			es: 'del ácido sulfúrico',
			zh: '硫酸',
			pt: 'do ácido sulfúrico'
		}
	},
	{
		slug: 'hydrochloric-acid',
		formula: 'HCl',
		cid: 313,
		wikidata: 'Q211086',
		pubchem: '36.46',
		name: {
			en: 'hydrochloric acid',
			ru: 'соляная кислота',
			fr: 'acide chlorhydrique',
			de: 'Salzsäure',
			it: 'acido cloridrico',
			es: 'ácido clorhídrico',
			zh: '盐酸',
			pt: 'ácido clorídrico'
		},
		of: {
			en: 'hydrochloric acid',
			ru: 'соляной кислоты',
			fr: 'de l’acide chlorhydrique',
			de: 'von Salzsäure',
			it: 'dell’acido cloridrico',
			es: 'del ácido clorhídrico',
			zh: '盐酸',
			pt: 'do ácido clorídrico'
		},
		// Not "also called hydrogen chloride": the acid is that gas dissolved in water.
		note: {
			en: 'Hydrochloric acid is a solution of hydrogen chloride (HCl) in water; the molar mass is that of HCl.',
			ru: 'Соляная кислота — раствор хлороводорода HCl в воде; молярная масса — это масса моля HCl.',
			fr: 'L’acide chlorhydrique est une solution de chlorure d’hydrogène (HCl) dans l’eau ; la masse molaire est celle de HCl.',
			de: 'Salzsäure ist eine Lösung von Chlorwasserstoff (HCl) in Wasser; die molare Masse ist die von HCl.',
			it: 'L’acido cloridrico è una soluzione di cloruro di idrogeno (HCl) in acqua; la massa molare è quella di HCl.',
			es: 'El ácido clorhídrico es una disolución de cloruro de hidrógeno (HCl) en agua; la masa molar es la del HCl.',
			zh: '盐酸是氯化氢（HCl）的水溶液，摩尔质量指的是 HCl 的摩尔质量。',
			pt: 'O ácido clorídrico é uma solução de cloreto de hidrogênio (HCl) em água; a massa molar é a do HCl.'
		}
	},
	{
		slug: 'sodium-hydroxide',
		formula: 'NaOH',
		cid: 14798,
		wikidata: 'Q102769',
		pubchem: '39.997',
		name: {
			en: 'sodium hydroxide',
			ru: 'гидроксид натрия',
			fr: 'hydroxyde de sodium',
			de: 'Natriumhydroxid',
			it: 'idrossido di sodio',
			es: 'hidróxido de sodio',
			zh: '氢氧化钠',
			pt: 'hidróxido de sódio'
		},
		of: {
			en: 'sodium hydroxide',
			ru: 'гидроксида натрия',
			fr: 'de l’hydroxyde de sodium',
			de: 'von Natriumhydroxid',
			it: 'dell’idrossido di sodio',
			es: 'del hidróxido de sodio',
			zh: '氢氧化钠',
			pt: 'do hidróxido de sódio'
		},
		aka: {
			en: 'caustic soda',
			ru: 'едкий натр',
			fr: 'soude caustique',
			de: 'Ätznatron',
			it: 'soda caustica',
			es: 'sosa cáustica',
			zh: '烧碱',
			pt: 'soda cáustica'
		}
	},
	{
		slug: 'calcium-carbonate',
		formula: 'CaCO3',
		cid: 10112,
		wikidata: 'Q23767',
		pubchem: '100.09',
		name: {
			en: 'calcium carbonate',
			ru: 'карбонат кальция',
			fr: 'carbonate de calcium',
			de: 'Calciumcarbonat',
			it: 'carbonato di calcio',
			es: 'carbonato de calcio',
			zh: '碳酸钙',
			pt: 'carbonato de cálcio'
		},
		of: {
			en: 'calcium carbonate',
			ru: 'карбоната кальция',
			fr: 'du carbonate de calcium',
			de: 'von Calciumcarbonat',
			it: 'del carbonato di calcio',
			es: 'del carbonato de calcio',
			zh: '碳酸钙',
			pt: 'do carbonato de cálcio'
		}
	},
	{
		slug: 'ammonia',
		formula: 'NH3',
		cid: 222,
		wikidata: 'Q4087',
		pubchem: '17.031',
		name: {
			en: 'ammonia',
			ru: 'аммиак',
			fr: 'ammoniac',
			de: 'Ammoniak',
			it: 'ammoniaca',
			es: 'amoníaco',
			zh: '氨',
			pt: 'amônia'
		},
		of: {
			en: 'ammonia',
			ru: 'аммиака',
			fr: 'de l’ammoniac',
			de: 'von Ammoniak',
			it: 'dell’ammoniaca',
			es: 'del amoníaco',
			zh: '氨',
			pt: 'da amônia'
		}
	},
	{
		slug: 'methane',
		formula: 'CH4',
		cid: 297,
		wikidata: 'Q37129',
		pubchem: '16.043',
		name: {
			en: 'methane',
			ru: 'метан',
			fr: 'méthane',
			de: 'Methan',
			it: 'metano',
			es: 'metano',
			zh: '甲烷',
			pt: 'metano'
		},
		of: {
			en: 'methane',
			ru: 'метана',
			fr: 'du méthane',
			de: 'von Methan',
			it: 'del metano',
			es: 'del metano',
			zh: '甲烷',
			pt: 'do metano'
		}
	},
	{
		slug: 'glucose',
		formula: 'C6H12O6',
		cid: 5793,
		wikidata: 'Q37525',
		pubchem: '180.16',
		name: {
			en: 'glucose',
			ru: 'глюкоза',
			fr: 'glucose',
			de: 'Glucose',
			it: 'glucosio',
			es: 'glucosa',
			zh: '葡萄糖',
			pt: 'glicose'
		},
		of: {
			en: 'glucose',
			ru: 'глюкозы',
			fr: 'du glucose',
			de: 'von Glucose',
			it: 'del glucosio',
			es: 'de la glucosa',
			zh: '葡萄糖',
			pt: 'da glicose'
		}
	},
	{
		slug: 'ethanol',
		formula: 'C2H5OH',
		cid: 702,
		wikidata: 'Q153',
		pubchem: '46.07',
		name: {
			en: 'ethanol',
			ru: 'этанол',
			fr: 'éthanol',
			de: 'Ethanol',
			it: 'etanolo',
			es: 'etanol',
			zh: '乙醇',
			pt: 'etanol'
		},
		of: {
			en: 'ethanol',
			ru: 'этанола',
			fr: 'de l’éthanol',
			de: 'von Ethanol',
			it: 'dell’etanolo',
			es: 'del etanol',
			zh: '乙醇',
			pt: 'do etanol'
		},
		aka: {
			en: 'ethyl alcohol',
			ru: 'этиловый спирт',
			fr: 'alcool éthylique',
			de: 'Ethylalkohol',
			it: 'alcol etilico',
			es: 'alcohol etílico',
			zh: '酒精',
			pt: 'álcool etílico'
		}
	},
	{
		slug: 'nitric-acid',
		formula: 'HNO3',
		cid: 944,
		wikidata: 'Q83320',
		pubchem: '63.013',
		name: {
			en: 'nitric acid',
			ru: 'азотная кислота',
			fr: 'acide nitrique',
			de: 'Salpetersäure',
			it: 'acido nitrico',
			es: 'ácido nítrico',
			zh: '硝酸',
			pt: 'ácido nítrico'
		},
		of: {
			en: 'nitric acid',
			ru: 'азотной кислоты',
			fr: 'de l’acide nitrique',
			de: 'von Salpetersäure',
			it: 'dell’acido nitrico',
			es: 'del ácido nítrico',
			zh: '硝酸',
			pt: 'do ácido nítrico'
		}
	}
];

export const byCompoundSlug = new Map(COMPOUNDS.map((c) => [c.slug, c]));

/** A compound whose formula is typed exactly as on its page (C2H5OH, not C2H6O). */
export const byFormula = new Map(COMPOUNDS.map((c) => [c.formula, c]));

/** "Sulfuric acid", "Вода": the name at the start of a line. */
export const capitalize = (s: string) => s.charAt(0).toLocaleUpperCase() + s.slice(1);
