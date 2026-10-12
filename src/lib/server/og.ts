import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { elements, type Element } from '../elements';
import { UI } from '../i18n/ui';
import type { Lang } from '../i18n/langs';
import { summaryFacts } from '../facts';
import { C, FILL } from './palette';

/** Fonts are read once per build; Satori needs TTF/OTF/WOFF, not WOFF2. */
let fonts: Parameters<typeof satori>[1]['fonts'] | undefined;
function loadFonts() {
	if (fonts) return fonts;
	const file = (...p: string[]) => readFileSync(join(process.cwd(), ...p));
	const oswald = (subset: string, weight: 400 | 600) =>
		file('node_modules/@fontsource/oswald/files', `oswald-${subset}-${weight}-normal.woff`);
	fonts = [
		// Each subset gets its own family name: Satori stops at the first font with a
		// matching name, so same-named subsets would leave Cyrillic as empty boxes.
		...(['latin', 'latin-ext', 'cyrillic'] as const).flatMap((s) => [
			{ name: `Oswald ${s}`, data: oswald(s, 400), weight: 400 as const, style: 'normal' as const },
			{ name: `Oswald ${s}`, data: oswald(s, 600), weight: 600 as const, style: 'normal' as const }
		]),
		{
			name: 'Bebas',
			data: file('node_modules/@fontsource/bebas-neue/files/bebas-neue-latin-400-normal.woff'),
			weight: 400,
			style: 'normal'
		},
		{
			name: 'Noto SC',
			data: file('src/lib/server/fonts/noto-sans-sc-700.ttf'),
			weight: 600,
			style: 'normal'
		},
		{
			name: 'Noto SC',
			data: file('src/lib/server/fonts/noto-sans-sc-700.ttf'),
			weight: 400,
			style: 'normal'
		}
	];
	return fonts;
}

const FAMILY = '"Oswald latin", "Oswald latin-ext", "Oswald cyrillic", "Noto SC"';

/** Minimal JSX-free element factory for Satori. */
type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, ...children: (Node | string)[]): Node => ({
	type,
	props: { style: { display: 'flex', ...style }, children }
});

/** Electron shells as rings of dots, like the Shells component. */
function shellsSvg(shells: number[], ink: string) {
	const inner = 34;
	const step = (96 - inner) / Math.max(shells.length, 1);
	const parts: string[] = [];
	shells.forEach((count, i) => {
		const r = inner + step * (i + 0.5);
		parts.push(`<circle cx="100" cy="100" r="${r}" fill="none" stroke="${ink}" stroke-width="0.6" opacity="0.6"/>`);
		for (let k = 0; k < count; k++) {
			const a = (k / count) * Math.PI * 2 - Math.PI / 2 + i * 0.4;
			const d = Math.max(1.4, 3.4 - shells.length * 0.28);
			parts.push(
				`<circle cx="${(100 + r * Math.cos(a)).toFixed(2)}" cy="${(100 + r * Math.sin(a)).toFixed(2)}" r="${d}" fill="${ink}"/>`
			);
		}
	});
	return `data:image/svg+xml;base64,${Buffer.from(
		`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">${parts.join('')}</svg>`
	).toString('base64')}`;
}

function elementCard(e: Element, lang: Lang): Node {
	const t = UI[lang];
	const f = summaryFacts(e, lang);
	const [fill, ink] = FILL[e.category];
	const name = e.name[lang];
	const nameSize = Math.min(104, Math.floor(1000 / Math.max(name.length, 4)));
	/** Label separator: full-width in Chinese, with a narrow no-break space in French. */
	const sep = lang === 'zh' ? '：' : lang === 'fr' ? ' : ' : ': ';

	return h(
		'div',
		{ width: 1200, height: 630, background: C.mustard, fontFamily: FAMILY, color: C.ink },
		// Atom: symbol disc inside its electron shells.
		h(
			'div',
			{ position: 'absolute', left: 40, top: 40, width: 550, height: 550 },
			{
				type: 'img',
				props: { src: shellsSvg(e.shells, C.ink), width: 550, height: 550, style: { position: 'absolute' } }
			},
			h(
				'div',
				{
					position: 'absolute',
					left: 154,
					top: 154,
					width: 242,
					height: 242,
					borderRadius: 121,
					background: fill,
					color: ink,
					alignItems: 'center',
					justifyContent: 'center',
					fontSize: e.symbol.length > 1 ? 120 : 140,
					fontWeight: 600
				},
				e.symbol
			)
		),
		// Atomic number on a paper slip, like the Rosalind Franklin poster. Anchored by its
		// right edge so three-digit numbers grow leftwards, away from the text column.
		h(
			'div',
			{
				position: 'absolute',
				right: 600,
				top: 410,
				padding: '6px 18px 0',
				background: C.paper,
				color: C.raspberry,
				fontFamily: 'Bebas',
				fontSize: 170,
				lineHeight: 0.9
			},
			String(e.z)
		),
		h(
			'div',
			{ position: 'absolute', left: 650, top: 56, width: 500, flexDirection: 'column' },
			h('div', { fontSize: 26, fontWeight: 400 }, t.article.kicker(e.z)),
			h(
				'div',
				{
					fontSize: nameSize,
					fontWeight: 600,
					lineHeight: 1.05,
					marginTop: 8,
					borderBottom: `4px solid ${C.ink}`,
					paddingBottom: 16
				},
				name
			),
			h('div', { fontSize: 30, fontWeight: 400, marginTop: 20 }, t.category[e.category]),
			h('div', { fontSize: 30, fontWeight: 400, marginTop: 6 }, `${t.atomicMass}${sep}${f.mass ?? t.noData}`),
			h(
				'div',
				{ fontSize: 30, fontWeight: 400, marginTop: 6 },
				e.group
					? `${t.group}${sep}${e.group}${lang === 'zh' ? '，' : ', '}${t.period.toLowerCase()}${sep}${e.period}`
					: `${t.period}${sep}${e.period}`
			)
		),
		h('div', { position: 'absolute', right: 50, bottom: 44, fontSize: 28, fontWeight: 600 }, t.siteName)
	);
}

function homeCard(lang: Lang): Node {
	const t = UI[lang];
	const cell = 30;
	const gap = 4;
	const rects = elements
		.map((e) => {
			const x = (e.col - 1) * (cell + gap);
			const y = (e.row - 1) * (cell + gap) - (e.row > 7 ? cell * 0.6 : 0);
			return `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" fill="${FILL[e.category][0]}"/>`;
		})
		.join('');
	const width = 18 * (cell + gap);
	const height = 10 * (cell + gap) - cell * 0.6;
	const table = `data:image/svg+xml;base64,${Buffer.from(
		`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">${rects}</svg>`
	).toString('base64')}`;

	return h(
		'div',
		{ width: 1200, height: 630, background: C.mustard, fontFamily: FAMILY, color: C.ink, flexDirection: 'column', padding: 60 },
		h('div', { fontSize: lang === 'zh' ? 72 : 60, fontWeight: 600, lineHeight: 1.05, maxWidth: 1080 }, t.title),
		h(
			'div',
			{ position: 'absolute', left: 60, bottom: 56 },
			{ type: 'img', props: { src: table, width: 600, height: Math.round((height / width) * 600) } }
		),
		h('div', { position: 'absolute', right: 60, bottom: 54, fontSize: 32, fontWeight: 600 }, t.siteName)
	);
}

export async function renderOg(lang: Lang, element: Element | null): Promise<Uint8Array> {
	const svg = await satori(
		(element ? elementCard(element, lang) : homeCard(lang)) as unknown as Parameters<typeof satori>[0],
		{ width: 1200, height: 630, fonts: loadFonts() }
	);
	return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
}
