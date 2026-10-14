import { elements, type Element } from './elements';
import { LANG_INFO, type Lang } from './i18n/langs';

const bySymbol = new Map(elements.map((e) => [e.symbol, e]));

/** Atomic masses are summed in ten-thousandths, the finest CIAAW precision (H 1.0080). */
const SCALE = 4;
const UNIT = 10 ** SCALE;

const MAX_LENGTH = 120;
const MAX_COUNT = 9999;

export type FormulaError =
	| { kind: 'syntax' }
	| { kind: 'symbol'; symbol: string }
	/** Symbols typed in lower case; `suggestion` is the formula in capitals when that parses. */
	| { kind: 'case'; suggestion: string | null }
	/** An element with no standard atomic weight: only the mass number of an isotope is known. */
	| { kind: 'weight'; element: Element };

export type Part = {
	element: Element;
	count: number;
	/** Decimal places of the element's atomic mass: 1.0080 → 4, 32.06 → 2. */
	digits: number;
	/** count × atomic mass, in ten-thousandths. */
	units: number;
};

export type MolarMass = {
	/** Elements in order of first appearance in the formula. */
	parts: Part[];
	units: number;
	/** The result keeps the precision of the least precise atomic mass. */
	digits: number;
};

const decimals = (text: string) => text.split('.')[1]?.length ?? 0;

/** Plain digits for subscripts and the usual hydrate dots, spaces dropped: CuSO₄ · 5H₂O → CuSO4·5H2O. */
export function normalize(text: string): string {
	return text
		.replace(/[₀-₉]/g, (d) => String(d.charCodeAt(0) - 0x2080))
		.replace(/[*•⋅∙.]/g, '·')
		.replace(/\s+/g, '');
}

/** Counts of each element in a formula such as Ca(OH)2, K4[Fe(CN)6] or CuSO4·5H2O. */
export function parse(input: string): Map<string, number> | FormulaError {
	const text = normalize(input);
	if (!text || text.length > MAX_LENGTH) return { kind: 'syntax' };
	if (!/[A-Z]/.test(text) && /[a-z]/.test(text)) {
		const upper = text.toUpperCase();
		return { kind: 'case', suggestion: parse(upper) instanceof Map ? upper : null };
	}

	let i = 0;
	const number = () => {
		const m = /^\d+/.exec(text.slice(i));
		if (!m) return null;
		i += m[0].length;
		return Number(m[0]);
	};

	// A group runs until its closing bracket, a hydrate dot or the end.
	const group = (close: string | null): Map<string, number> | FormulaError => {
		const counts = new Map<string, number>();
		const add = (symbol: string, n: number) => counts.set(symbol, (counts.get(symbol) ?? 0) + n);
		let empty = true;
		while (i < text.length && text[i] !== close && text[i] !== '·') {
			const c = text[i];
			let inner: Map<string, number>;
			if (c === '(' || c === '[') {
				i++;
				const result = group(c === '(' ? ')' : ']');
				if (!(result instanceof Map)) return result;
				if (text[i] !== (c === '(' ? ')' : ']')) return { kind: 'syntax' };
				i++;
				inner = result;
			} else if (/[A-Z]/.test(c)) {
				// Lower-case letters belong to the symbol: "Cx" is unknown, not C followed by x.
				const symbol = /^[A-Z][a-z]*/.exec(text.slice(i))![0];
				if (!bySymbol.has(symbol)) return { kind: 'symbol', symbol };
				i += symbol.length;
				inner = new Map([[symbol, 1]]);
			} else if (/[a-z]/.test(c)) {
				return { kind: 'symbol', symbol: /^[a-z]+/.exec(text.slice(i))![0] };
			} else {
				return { kind: 'syntax' };
			}
			const n = number() ?? 1;
			if (n < 1 || n > MAX_COUNT) return { kind: 'syntax' };
			for (const [symbol, k] of inner) add(symbol, k * n);
			empty = false;
		}
		return empty ? { kind: 'syntax' } : counts;
	};

	const total = new Map<string, number>();
	for (;;) {
		// A leading coefficient multiplies one hydrate part: the 5 in CuSO4·5H2O.
		const k = number() ?? 1;
		if (k < 1 || k > MAX_COUNT) return { kind: 'syntax' };
		const result = group(null);
		if (!(result instanceof Map)) return result;
		for (const [symbol, n] of result) total.set(symbol, (total.get(symbol) ?? 0) + n * k);
		if (i === text.length) return total;
		if (text[i] !== '·') return { kind: 'syntax' };
		i++;
	}
}

export function molarMass(counts: Map<string, number>): MolarMass | FormulaError {
	const parts: Part[] = [];
	for (const [symbol, count] of counts) {
		const element = bySymbol.get(symbol)!;
		const { value, text, source } = element.mass;
		if (source !== 'ciaaw' || value === null || text === null) return { kind: 'weight', element };
		parts.push({ element, count, digits: decimals(text), units: count * Math.round(value * UNIT) });
	}
	return {
		parts,
		units: parts.reduce((sum, p) => sum + p.units, 0),
		digits: Math.min(...parts.map((p) => p.digits))
	};
}

export function calculate(formula: string): MolarMass | FormulaError {
	const counts = parse(formula);
	return counts instanceof Map ? molarMass(counts) : counts;
}

export const isError = (r: MolarMass | FormulaError): r is FormulaError => 'kind' in r;

/** Rounds to `digits` places, half away from zero, and formats for the language: 98.0716 → "98,07". */
export function formatUnits(units: number, digits: number, lang: Lang): string {
	const step = 10 ** (SCALE - digits);
	const rounded = Math.round(units / step) / 10 ** digits;
	return new Intl.NumberFormat(LANG_INFO[lang].tag, {
		minimumFractionDigits: digits,
		maximumFractionDigits: digits
	}).format(rounded);
}

/** Share of the molar mass, one decimal: "65,3 %" in the language's own style. */
export function formatShare(part: Part, mass: MolarMass, lang: Lang): string {
	return new Intl.NumberFormat(LANG_INFO[lang].tag, {
		style: 'percent',
		minimumFractionDigits: 1,
		maximumFractionDigits: 1
	}).format(part.units / mass.units);
}

/**
 * Masses as school problems round them: whole numbers, except chlorine at 35.5 (35.45 would
 * round to 35 and throw answers off by half a unit).
 */
export const schoolMass = (e: Element) => (e.symbol === 'Cl' ? 35.5 : Math.round(e.mass.value!));

export function schoolTotal(mass: MolarMass): number {
	// In halves, to stay exact with chlorine's 35.5.
	return mass.parts.reduce((sum, p) => sum + p.count * schoolMass(p.element) * 2, 0) / 2;
}

const formatSchool = (value: number, lang: Lang) =>
	new Intl.NumberFormat(LANG_INFO[lang].tag, { maximumFractionDigits: 1 }).format(value);

/** The school rounding of a molar mass: its masses ("H = 1, S = 32, O = 16") and the total ("98"). */
export function school(mass: MolarMass, lang: Lang): { masses: string; total: string } {
	const values = mass.parts.map((p) => schoolMass(p.element));
	// "Cl = 35,5, O = 16" would read as one list with a stray comma: semicolons where commas are decimal.
	const separator =
		lang === 'zh'
			? '，'
			: values.some((v) => !Number.isInteger(v)) && formatSchool(0.5, lang).includes(',')
				? '; '
				: ', ';
	return {
		masses: mass.parts
			// No-break spaces keep "H = 1" on one line.
			.map((p, i) => `${p.element.symbol} = ${formatSchool(values[i], lang)}`)
			.join(separator),
		total: formatSchool(schoolTotal(mass), lang)
	};
}

/** "2 × 1,0080 + 32,06 + 4 × 15,999": the working, with the atomic masses as CIAAW gives them. */
export function working(mass: MolarMass, lang: Lang): string {
	const decimal = formatSchool(0.5, lang).includes(',') ? ',' : '.';
	return mass.parts
		.map((p) => {
			const value = p.element.mass.text!.replace('.', decimal);
			return p.count > 1 ? `${p.count} × ${value}` : value;
		})
		.join(' + ');
}

/** Splits a formula for display: digits after a symbol or bracket become subscripts. */
export function formulaParts(formula: string): { text: string; sub: boolean }[] {
	const parts: { text: string; sub: boolean }[] = [];
	const text = normalize(formula);
	const re = /\d+|[^\d]+/g;
	let m: RegExpExecArray | null;
	while ((m = re.exec(text))) {
		const before = text[m.index - 1];
		const sub = /\d/.test(m[0][0]) && !!before && /[A-Za-z)\]]/.test(before);
		parts.push({ text: m[0], sub });
	}
	return parts;
}
