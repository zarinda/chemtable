import { elements, type Element } from './elements';
import { isLang } from './i18n/langs';

/** Lower case without accents, so 'Hélium' and 'helium' compare equal. */
const fold = (s: string) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();

/** Edit distance where swapping two neighbouring letters ('iorn') counts as one edit. */
function distance(a: string, b: string): number {
	const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array<number>(b.length).fill(0)]);
	for (let j = 1; j <= b.length; j++) d[0][j] = j;
	for (let i = 1; i <= a.length; i++) {
		for (let j = 1; j <= b.length; j++) {
			const cost = a[i - 1] === b[j - 1] ? 0 : 1;
			d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
			if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
				d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
			}
		}
	}
	return d[a.length][b.length];
}

/**
 * Elements a missing address may have meant: a symbol (/Fe), a number (/26), a name in any
 * language (/железо, /aluminum) or a typo of one (/iorn, /oxigen). Segments are tried from
 * the last one, so /iron/extra still finds iron.
 */
export function guessElements(pathname: string, limit = 3): Element[] {
	const segments = pathname.split('/').filter(Boolean);
	// The language prefix is not a query: 'es' is also the symbol of einsteinium.
	if (isLang(segments[0])) segments.shift();
	for (const segment of segments.reverse()) {
		const found = guess(segment, limit);
		if (found.length) return found;
	}
	return [];
}

function guess(segment: string, limit: number): Element[] {
	let query: string;
	try {
		query = fold(decodeURIComponent(segment).replace(/\.html?$/, '')).trim();
	} catch {
		return [];
	}
	if (!query) return [];

	const names = (e: Element) => [e.slug, ...Object.values(e.name).map(fold)];
	const exact = elements.find(
		(e) => e.symbol.toLowerCase() === query || String(e.z) === query || names(e).includes(query)
	);
	if (exact) return [exact];

	// Short queries match too many names at one edit ('c' → every one-letter Chinese name).
	const max = query.length <= 3 ? 0 : query.length <= 5 ? 1 : 2;
	if (!max) return [];
	return elements
		.map((e) => ({ e, d: Math.min(...names(e).map((n) => distance(query, n))) }))
		.filter(({ d }) => d <= max)
		.sort((a, b) => a.d - b.d || a.e.z - b.e.z)
		.slice(0, limit)
		.map(({ e }) => e);
}
