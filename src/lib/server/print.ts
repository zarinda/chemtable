import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { elements, CATEGORIES, fetchedAt, type Category, type Element } from '../elements';
import { UI } from '../i18n/ui';
import { LANG_INFO, type Lang } from '../i18n/langs';
import { formatElectronegativity, formatMass } from '../format';
import { PAPER_MM, type Paper, type Variant } from '../print';
import { C, FILL } from './palette';

/** Sheet sizes in millimetres, landscape. */
const SHEET: Record<Paper, { size: string; width: number; height: number }> = {
	a4: { size: 'A4 landscape', ...PAPER_MM.a4 },
	letter: { size: 'letter landscape', ...PAPER_MM.letter }
};

/** Layout in millimetres. Home printers can't print the outer ~5 mm, hence the margin. */
const MARGIN = 9;
const GAP = 0.6;
const LABEL = 4;
const HEADER = 12;
const GROUPS = 4;
const SPACER = 3;
const FOOTER = 6;

/** Rows of a cell, shared by the key so its labels line up with the enlarged cell. */
const CELL_ROWS = '17fr 37fr 16fr 15fr 15fr';

/** The example cell the key explains. */
const KEY_ELEMENT = 26;

/** Colour version: the site's textures, over the category fill. */
const TEXTURE_COLOR: Record<Category, string> = {
	'alkali-metal': 'none',
	'alkaline-earth-metal': 'radial-gradient(circle, rgb(0 0 0 / 0.24) 1.4px, transparent 1.8px) 0 0 / 9px 9px',
	'transition-metal': 'radial-gradient(circle, rgb(0 0 0 / 0.22) 0.9px, transparent 1.2px) 0 0 / 5px 5px',
	'post-transition-metal': 'repeating-linear-gradient(135deg, rgb(0 0 0 / 0.16) 0 1px, transparent 1px 6px)',
	metalloid: 'radial-gradient(circle, rgb(255 255 255 / 0.2) 1.2px, transparent 1.6px) 0 0 / 6px 6px',
	nonmetal: 'none',
	halogen: 'repeating-linear-gradient(0deg, rgb(0 0 0 / 0.22) 0 1px, transparent 1px 5px)',
	'noble-gas': 'none',
	lanthanide: 'radial-gradient(circle, rgb(0 0 0 / 0.18) 2px, transparent 2.4px) 0 0 / 12px 12px',
	actinide: 'radial-gradient(circle, rgb(255 255 255 / 0.3) 1.4px, transparent 1.8px) 0 0 / 7px 7px'
};

const lines = (deg: number, alpha = 0.4) =>
	`repeating-linear-gradient(${deg}deg, rgb(0 0 0 / ${alpha}) 0 0.8px, transparent 0.8px 5px)`;
const dots = (radius: number, step: number, alpha = 0.5) =>
	`radial-gradient(circle, rgb(0 0 0 / ${alpha}) ${radius}px, transparent ${radius + 0.4}px) 0 0 / ${step}px ${step}px`;

/** Black-and-white version: no fills, so every category gets its own texture. */
const TEXTURE_BW: Record<Category, string> = {
	'alkali-metal': lines(45),
	'alkaline-earth-metal': dots(1.4, 7),
	'transition-metal': dots(0.8, 4),
	'post-transition-metal': lines(135),
	metalloid: `${lines(45, 0.3)}, ${lines(135, 0.3)}`,
	nonmetal: lines(90),
	halogen: lines(0),
	'noble-gas': 'linear-gradient(rgb(0 0 0 / 0.16), rgb(0 0 0 / 0.16))',
	lanthanide: dots(2, 10, 0.4),
	actinide: `${lines(0, 0.3)}, ${lines(90, 0.3)}`
};

const escape = (s: string) =>
	s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

/** The site's fonts, inlined so the PDF renderer needs no network or server. */
function fontFaces(): string {
	const root = process.cwd();
	const inline = (cssFile: string) => {
		const dir = join(root, 'node_modules', cssFile, '..');
		return readFileSync(join(root, 'node_modules', cssFile), 'utf8')
			.replace(/,\s*url\(\.\/files\/[^)]+\.woff\) format\('woff'\)/g, '')
			.replace(
				/url\(\.\/files\/([^)]+\.woff2)\)/g,
				(_, file: string) =>
					`url(data:font/woff2;base64,${readFileSync(join(dir, 'files', file)).toString('base64')})`
			);
	};
	// The site's own rules for the Chinese subset, its files inlined.
	const noto = readFileSync(join(root, 'src/lib/fonts/noto-sans-sc.css'), 'utf8').replace(
		/url\('\/fonts\/([^']+\.woff2)'\)/g,
		(_, file: string) =>
			`url(data:font/woff2;base64,${readFileSync(join(root, 'static/fonts', file)).toString('base64')})`
	);
	return [
		inline('@fontsource/oswald/600.css'),
		inline('@fontsource-variable/golos-text/index.css'),
		noto
	].join('\n');
}

function cell(e: Element, lang: Lang, attrs = '') {
	// As published: 1.00 for calcium, 0.9 for radium (known to one decimal only).
	const chi = e.electronegativityText === null ? '' : formatElectronegativity(e.electronegativityText, lang);
	const mass = e.mass.text ? formatMass(e.mass.text, lang) : '';
	return `<div class="cell cat-${e.category}"${attrs}>
	<div class="top"><b>${e.z}</b><span>${chi}</span></div>
	<div class="sym">${escape(e.symbol)}</div>
	<div class="name fit">${escape(e.name[lang])}</div>
	<div class="mass fit">${mass}</div>
	<div class="shells fit">${e.shells.join('-')}</div>
</div>`;
}

/**
 * A printable periodic table sheet as a self-contained HTML page, for headless
 * Chrome to save as PDF (scripts/pdf.ts). `site` is the origin printed in the corner.
 */
export function printHtml(lang: Lang, paper: Paper, variant: Variant, site: string): string {
	const t = UI[lang];
	const sheet = SHEET[paper];
	const width = sheet.width - 2 * MARGIN;
	const height = sheet.height - 2 * MARGIN;
	const cellW = (width - LABEL - 18 * GAP) / 18;
	const cellH = Math.min(cellW * 1.2, (height - HEADER - GROUPS - SPACER - FOOTER - 10 * GAP) / 9);
	/** Type scales with the cell, from the A4 cell width. */
	const k = cellW / 14.68;
	const textures = variant === 'color' ? TEXTURE_COLOR : TEXTURE_BW;
	const mm = (n: number) => `${n.toFixed(2)}mm`;
	const pt = (n: number) => `${(n * k).toFixed(2)}pt`;

	const categoryCss = CATEGORIES.map((c) => {
		const [fill, ink] = variant === 'color' ? FILL[c] : ['#fff', C.ink];
		return `.cat-${c} { --fill: ${fill}; --ink-on: ${ink}; --texture: ${textures[c]}; }`;
	}).join('\n');

	const keyElement = elements[KEY_ELEMENT - 1];
	const electronegativity = `${t.property.electronegativity} (${t.unit.electronegativity})`;
	const keyLabels = [
		`${t.print.atomicNumber} · ${electronegativity}`,
		t.print.symbol,
		t.print.name,
		t.atomicMass,
		t.shells
	];

	const series = [
		{ row: 6, range: '57–71', category: 'lanthanide' },
		{ row: 7, range: '89–103', category: 'actinide' }
	];

	const host = new URL(site).host;
	const sources = `${t.sources}: IUPAC CIAAW, NIST, PubChem (NIH), Wikidata · CC BY 4.0 · ${fetchedAt}`;

	return `<!doctype html>
<html lang="${LANG_INFO[lang].tag}">
<head>
<meta charset="utf-8">
<title>${escape(t.title)} — ChemTable</title>
<style>
${fontFaces()}

@page { size: ${sheet.size}; margin: 0; }
* { box-sizing: border-box; print-color-adjust: exact; -webkit-print-color-adjust: exact; }
html, body { margin: 0; background: #fff; color: ${C.ink}; }
body { font-family: 'Golos Text Variable', 'Noto Sans SC Subset', sans-serif; font-variant-numeric: tabular-nums; }

.sheet {
	display: flex;
	flex-direction: column;
	width: ${mm(sheet.width)};
	height: ${mm(sheet.height)};
	padding: ${mm(MARGIN)};
	overflow: hidden;
}

header {
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	height: ${mm(HEADER)};
	font-family: 'Oswald', 'Noto Sans SC Subset', sans-serif;
	font-weight: 600;
}
h1 { margin: 0; font-size: ${pt(22)}; line-height: 1; }
.brand { font-size: ${pt(11)}; }
.brand span { font-family: 'Golos Text Variable', sans-serif; font-weight: 400; font-size: ${pt(7)}; margin-left: 2mm; }

.grid {
	display: grid;
	grid-template-columns: ${mm(LABEL)} repeat(18, ${mm(cellW)});
	grid-template-rows: ${mm(GROUPS)} repeat(7, ${mm(cellH)}) ${mm(SPACER)} repeat(2, ${mm(cellH)});
	gap: ${mm(GAP)};
	/* Letter is taller than A4 for its width: the table sits centred in the spare height. */
	margin: auto 0;
}

.label { display: grid; font-size: ${pt(6)}; line-height: 1; }
.group { grid-row: 1; place-items: end center; padding-bottom: 0.6mm; border-bottom: 0.3mm solid ${C.ink}; }
.period { grid-column: 1; place-items: center end; padding-right: 0.8mm; border-right: 0.3mm solid ${C.ink}; }

${categoryCss}

.cell {
	--s: 1;
	position: relative;
	display: grid;
	grid-template-rows: ${CELL_ROWS};
	padding: calc(0.8mm * var(--s)) calc(0.9mm * var(--s));
	background: var(--fill);
	color: var(--ink-on);
	overflow: hidden;
}
.bw .cell, .bw .swatch, .bw .series { box-shadow: inset 0 0 0 0.25mm ${C.ink}; }
/* Texture sits behind the symbol only, so the small text stays on a plain ground. */
.cell::before {
	content: '';
	position: absolute;
	left: 0;
	right: 0;
	top: calc(0.8mm * var(--s) + (100% - 1.6mm * var(--s)) * 0.17);
	height: calc((100% - 1.6mm * var(--s)) * 0.37);
	background: var(--texture);
}
.cell > * { position: relative; min-width: 0; line-height: 1.05; }
.top { display: flex; justify-content: space-between; align-items: baseline; font-size: calc(${pt(5)} * var(--s)); }
.top b { font-size: calc(${pt(7)} * var(--s)); font-weight: 650; }
.sym {
	align-self: center;
	font-family: 'Oswald', 'Noto Sans SC Subset', sans-serif;
	font-weight: 600;
	font-size: calc(${pt(16)} * var(--s));
	line-height: 1;
}
.name, .mass { font-size: calc(${pt(5.4)} * var(--s)); }
/* Chinese names are one or two characters, which need a larger size to stay legible. */
:lang(zh) .name { font-size: calc(${pt(7.5)} * var(--s)); }
.shells { font-size: calc(${pt(4.6)} * var(--s)); letter-spacing: -0.01em; }
.fit { white-space: nowrap; overflow: hidden; }

.series {
	grid-column: 4;
	display: grid;
	place-items: center;
	font-size: ${pt(6)};
	background: var(--texture), var(--fill);
	color: var(--ink-on);
}

.key {
	grid-column: 4 / span 4;
	grid-row: 2 / span 3;
	display: flex;
	gap: 2mm;
	align-items: flex-start;
}
.key .cell { --s: 2; flex: none; width: ${mm(cellW * 2)}; height: ${mm(cellH * 2)}; }
.key ol {
	display: grid;
	grid-template-rows: ${CELL_ROWS};
	height: ${mm(cellH * 2)};
	margin: 0;
	padding: 1.6mm 0;
	list-style: none;
	font-size: ${pt(6.2)};
	line-height: 1.1;
}
.key li { display: flex; align-items: center; }

.legend {
	grid-column: 8 / span 6;
	grid-row: 2 / span 3;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-auto-flow: column;
	grid-template-rows: repeat(5, auto);
	gap: 1.4mm 3mm;
	align-content: start;
	padding-left: 2mm;
	font-size: ${pt(6.4)};
	line-height: 1.1;
}
.legend li { display: flex; align-items: center; gap: 1.6mm; }
.legend ul { display: contents; }
.swatch { flex: none; width: 6mm; height: 4.2mm; background: var(--texture), var(--fill); }

footer {
	display: flex;
	justify-content: space-between;
	gap: 6mm;
	font-size: ${pt(6)};
}
</style>
</head>
<body>
<main class="sheet ${variant}">
<header>
	<h1>${escape(t.title)}</h1>
	<div class="brand">ChemTable<span>${escape(host)}</span></div>
</header>
<div class="grid">
	${Array.from({ length: 18 }, (_, i) => `<span class="label group" style="grid-column:${i + 2}">${i + 1}</span>`).join('')}
	${Array.from({ length: 7 }, (_, i) => `<span class="label period" style="grid-row:${i + 2}">${i + 1}</span>`).join('')}
	${elements.map((e) => cell(e, lang, ` style="grid-column:${e.col + 1};grid-row:${e.row + 1}"`)).join('\n')}
	${series.map((s) => `<div class="series cat-${s.category}" style="grid-row:${s.row + 1}">${s.range}</div>`).join('')}
	<div class="key">
		${cell(keyElement, lang, ' aria-hidden="true"')}
		<ol>${keyLabels.map((l) => `<li>${escape(l)}</li>`).join('')}</ol>
	</div>
	<div class="legend"><ul>
		${CATEGORIES.map((c) => `<li><span class="swatch cat-${c}"></span>${escape(t.category[c])}</li>`).join('')}
	</ul></div>
</div>
<footer>
	<span>[227] — ${escape(t.massIsotope)}</span>
	<span>${escape(sources)}</span>
</footer>
</main>
</body>
</html>`;
}
