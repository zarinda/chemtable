import { LANG_INFO, type Lang } from './i18n/langs';

const locale = (lang: Lang) => LANG_INFO[lang].tag;

export function formatNumber(value: number, lang: Lang, maxDigits = 3): string {
	return new Intl.NumberFormat(locale(lang), { maximumFractionDigits: maxDigits }).format(value);
}

const decimalSeparator = (lang: Lang) =>
	new Intl.NumberFormat(locale(lang)).formatToParts(1.5).find((p) => p.type === 'decimal')?.value ?? '.';

/** Atomic masses keep the significant digits CIAAW publishes (1.0080 stays 1.0080). */
export function formatMass(text: string, lang: Lang): string {
	return text.replace('.', decimalSeparator(lang));
}

export function kelvinToCelsius(k: number): number {
	return Math.round((k - 273.15) * 10) / 10;
}

const SUPERSCRIPT: Record<string, string> = {
	'0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
	'5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹'
};

/** "[Ar]4s2 3d6" → "[Ar] 4s² 3d⁶" */
export function formatConfig(config: string): string {
	return config
		.replace(/\]/, '] ')
		.replace(/([spdf])(\d+)/g, (_, l, n: string) => l + [...n].map((d) => SUPERSCRIPT[d]).join(''))
		.replace(/\s+/g, ' ')
		.trim();
}
