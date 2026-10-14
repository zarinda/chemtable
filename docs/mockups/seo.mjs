// Static mockups (2026-10-14) of the SEO pages: a page per property, the molar mass calculator
// and a compound page, quick answers on the element page, the print page. Not used by the build.
// Run: node docs/mockups/seo.mjs — writes .html and .jpg into docs/mockups/seo/.
// Needs print-a4-color.png / print-a4-bw.png there (rendered from src/lib/server/print.ts).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import puppeteer from 'puppeteer-core';

const ROOT = 'D:/ChemTable';
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), 'seo');
const els = JSON.parse(fs.readFileSync(`${ROOT}/src/lib/data/elements.json`, 'utf8')).elements;
const bySym = Object.fromEntries(els.map((e) => [e.symbol, e]));
const nm = (p) => pathToFileURL(`${ROOT}/node_modules/${p}`).href;
const img = (f) => pathToFileURL(path.join(OUT, f)).href;

const ru = (v, digits) =>
	v.toLocaleString('ru-RU', { minimumFractionDigits: digits, maximumFractionDigits: digits });

const FONTS = `
@font-face{font-family:Oswald;font-weight:600;src:url(${nm('@fontsource/oswald/files/oswald-latin-600-normal.woff2')})}
@font-face{font-family:Oswald;font-weight:600;src:url(${nm('@fontsource/oswald/files/oswald-cyrillic-600-normal.woff2')});unicode-range:U+0400-04FF}
@font-face{font-family:Bebas;src:url(${nm('@fontsource/bebas-neue/files/bebas-neue-latin-400-normal.woff2')})}
@font-face{font-family:Golos;font-weight:400 900;src:url(${nm('@fontsource-variable/golos-text/files/golos-text-latin-wght-normal.woff2')})}
@font-face{font-family:Golos;font-weight:400 900;src:url(${nm('@fontsource-variable/golos-text/files/golos-text-cyrillic-wght-normal.woff2')});unicode-range:U+0400-04FF}
`;

const BASE = `
:root{--mustard:#e3a83a;--paper:#e6e3da;--ink:#000;--teal:#126f60;--orange:#ee7430;--raspberry:#df3b57;--green:#1d7442;--peach:#f4b48a;
--bg:var(--mustard);--fg:var(--ink);--surface:var(--paper);--on-surface:var(--ink);--rule:var(--ink);--line:color-mix(in srgb,var(--fg) 45%,transparent)}
*{box-sizing:border-box}
html,body{margin:0;background:var(--bg);color:var(--fg);font-family:Golos,system-ui,sans-serif;-webkit-font-smoothing:antialiased;line-height:1.45}
body{position:relative}
body::after{content:'';position:absolute;inset:0;pointer-events:none;z-index:100;opacity:.32;mix-blend-mode:multiply;
background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -1.4 1'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
.cat-alkali-metal{--fill:var(--orange);--on:var(--ink);--tex:none}
.cat-alkaline-earth-metal{--fill:var(--orange);--on:var(--ink);--tex:radial-gradient(circle,rgb(0 0 0/.24) 1px,transparent 1.3px) 0 0/5px 5px}
.cat-transition-metal{--fill:var(--paper);--on:var(--ink);--tex:radial-gradient(circle,rgb(0 0 0/.22) .7px,transparent 1px) 0 0/3.5px 3.5px}
.cat-post-transition-metal{--fill:var(--paper);--on:var(--ink);--tex:repeating-linear-gradient(135deg,rgb(0 0 0/.18) 0 1px,transparent 1px 4px)}
.cat-metalloid{--fill:var(--green);--on:var(--paper);--tex:radial-gradient(circle,rgb(255 255 255/.25) .9px,transparent 1.2px) 0 0/4px 4px}
.cat-nonmetal{--fill:var(--teal);--on:var(--paper);--tex:none}
.cat-halogen{--fill:var(--teal);--on:var(--paper);--tex:repeating-linear-gradient(0deg,rgb(0 0 0/.25) 0 1px,transparent 1px 3.5px)}
.cat-noble-gas{--fill:var(--raspberry);--on:var(--ink);--tex:none}
.cat-lanthanide{--fill:var(--peach);--on:var(--ink);--tex:radial-gradient(circle,rgb(0 0 0/.2) 1.2px,transparent 1.5px) 0 0/6px 6px}
.cat-actinide{--fill:var(--ink);--on:var(--paper);--tex:radial-gradient(circle,rgb(255 255 255/.3) 1px,transparent 1.3px) 0 0/4px 4px}
.sw{background:var(--tex),var(--fill);color:var(--on)}
.display{font-family:Oswald,'Arial Narrow',sans-serif;font-weight:600;line-height:1.05;letter-spacing:-.2px}
.num{font-family:Bebas,Oswald,sans-serif;line-height:1}
.unknown{background:repeating-linear-gradient(135deg,color-mix(in srgb,var(--fg) 22%,transparent) 0 1px,transparent 1px 6px);color:color-mix(in srgb,var(--fg) 45%,transparent)}
a{color:inherit;text-underline-offset:3px}
.pill,.chip{display:inline-flex;align-items:center;gap:.4em;border:1.5px solid var(--fg);border-radius:99px;padding:.35em .85em;font-size:14px;white-space:nowrap}
.chip.on{background:var(--fg);color:var(--bg)}
.round{display:inline-grid;place-items:center;width:34px;height:34px;border:1.5px solid var(--fg);border-radius:50%;font-size:15px}
.new{display:inline-block;margin-left:10px;padding:2px 8px;border-radius:99px;background:var(--raspberry);color:#fff;font:600 12px/1.4 Golos,sans-serif;letter-spacing:0;vertical-align:middle}
.lead{font-size:var(--lead,17px);max-width:68ch;margin:0}
.card{background:var(--surface);color:var(--on-surface);box-shadow:6px 6px 0 var(--rule)}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:.5em;background:var(--fg);color:var(--bg);border-radius:99px;padding:13px 24px;font-weight:600;font-size:16px}
.seg{display:inline-flex;border:1.5px solid var(--fg);border-radius:99px;overflow:hidden;font-size:14px}
.seg span{padding:.45em 1em}
.seg span.on{background:var(--fg);color:var(--bg)}
.note{font-size:13px;opacity:.85}
h2.display{font-size:28px;margin:0 0 14px}
`;

// ---------- Shared pieces ----------
const NAV = ['Свойства элементов', 'Молярная масса', 'Распечатать'];

function deskBar(active) {
	return `<div class="dbar"><a>← Таблица Менделеева</a><nav>${NAV.map((n) => `<span class="chip${n === active ? ' on' : ''}">${n}</span>`).join('')}</nav>
<span class="pill">Русский ▾</span><span class="round">◐</span></div>`;
}
const DESK_CSS = `
body{width:1440px}
.dbar{display:flex;align-items:center;gap:10px;padding:14px 48px;border-bottom:2px solid var(--rule)}
.dbar>a{font-size:15px;margin-right:auto}
.dbar nav{display:flex;gap:6px;margin-right:18px}
.wrap{padding:0 48px}
.footer{margin:48px 48px 0;padding:22px 0 40px;border-top:2px solid var(--rule);display:flex;gap:28px;font-size:14px;flex-wrap:wrap}
`;
const deskFooter = `<div class="footer"><b>Ещё на сайте:</b><a>Таблица Менделеева</a><a>Свойства элементов</a><a>Калькулятор молярной массы</a><a>Распечатать PDF</a><span style="margin-left:auto">English · Русский · Français · Deutsch · Italiano · Español · 简体中文 · Português</span></div>`;

function phoneBar(back = '← Таблица') {
	return `<div class="pbar"><a>${back}</a><span class="pill">Русский ▾</span><span class="round">◐</span></div>`;
}
const PHONE_CSS = `
body{width:390px}
.pbar{display:flex;align-items:center;gap:8px;padding:12px 12px 14px}
.pbar>a{font-size:15px;margin-right:auto}
.wrap{padding:0 12px}
h1.display{font-size:34px;margin:8px 0 8px}
.lead{--lead:15px}
.chips{display:flex;gap:8px;overflow:hidden;white-space:nowrap;mask-image:linear-gradient(90deg,#000 82%,transparent)}
.pfoot{margin:36px 12px 0;padding:18px 0 40px;border-top:2px solid var(--rule);font-size:14px;display:grid;gap:8px}
`;
const phoneFooter = `<div class="pfoot"><b>Ещё на сайте</b><a>Таблица Менделеева</a><a>Свойства элементов</a><a>Калькулятор молярной массы</a><a>Распечатать PDF</a></div>`;

const doc = (body, css) =>
	`<!doctype html><html lang="ru"><head><meta charset="utf-8"><style>${FONTS}${BASE}${css}</style></head><body>${body}</body></html>`;

// ---------- Heat scale (the same as src/lib/heat.ts) ----------
const heatColor = (t) =>
	t < 0.5
		? `color-mix(in oklab, var(--teal) ${Math.round(t * 200)}%, var(--paper))`
		: `color-mix(in oklab, var(--ink) ${Math.round((t - 0.5) * 160)}%, var(--teal))`;
const heatInk = (t) => (t < 0.42 ? 'var(--ink)' : '#fff');
const HEAT_GRADIENT = 'linear-gradient(90deg, var(--paper), var(--teal), color-mix(in oklab, var(--ink) 80%, var(--teal)))';
const EN = els.map((e) => e.electronegativity).filter((v) => v != null);
const [MIN, MAX] = [Math.min(...EN), Math.max(...EN)];
const heatT = (v) => (v - MIN) / (MAX - MIN);
const heatStyle = (e) =>
	e.electronegativity == null ? '' : `background:${heatColor(heatT(e.electronegativity))};color:${heatInk(heatT(e.electronegativity))}`;

const fRow = (e) => e.row >= 8; // lanthanides and actinides sit under the table

function heatTable(pitch, gap, fGap, opts = {}) {
	const cell = pitch - gap;
	const at = (e) => ({ x: (e.col - 1) * pitch, y: fRow(e) ? 7 * pitch + fGap + (e.row - 9) * pitch : (e.row - 1) * pitch });
	let html = '';
	for (const e of els) {
		const { x, y } = at(e);
		const v = e.electronegativity;
		const cls = v == null ? 'unknown' : '';
		const inner = opts.mini
			? e.symbol
			: `<span class="z">${e.z}</span><b>${e.symbol}</b><span class="v">${v == null ? '—' : ru(v, v * 100 % 10 ? 2 : v * 10 % 10 ? 1 : 0)}</span>`;
		html += `<div class="hc ${cls}" style="left:${x}px;top:${y}px;width:${cell}px;height:${cell}px;${heatStyle(e)}">${inner}</div>`;
	}
	const h = 7 * pitch + fGap + 2 * pitch;
	return `<div class="heat" style="width:${18 * pitch}px;height:${h}px">${html}
<div class="fline" style="left:${2 * pitch}px;top:${7 * pitch + fGap / 2 - 1}px;width:${15 * pitch - gap}px"></div></div>`;
}
const HEAT_CSS = `
.heat{position:relative}
.hc{position:absolute;display:grid;grid-template-rows:auto 1fr auto;padding:3px 5px;overflow:hidden}
.hc .z{font-size:10px;line-height:1}
.hc b{font-family:Oswald;font-weight:600;font-size:22px;line-height:1;align-self:center}
.hc .v{font-size:10px;line-height:1;font-variant-numeric:tabular-nums}
.fline{position:absolute;height:1.5px;background:var(--fg)}
.scale{display:flex;align-items:center;gap:10px;font-size:13px}
.scale i{display:block;width:260px;height:12px;background:${HEAT_GRADIENT}}
.scale .nd{display:inline-block;width:16px;height:12px;vertical-align:-1px;margin-right:4px}
`;

const sorted = [...els].sort((a, b) => (b.electronegativity ?? -1) - (a.electronegativity ?? -1) || a.z - b.z);

function listRow(e, i, phone) {
	const v = e.electronegativity;
	const bar = v == null ? 0 : (v / MAX) * 100;
	return `<div class="lr"><span class="rk">${v == null ? '' : i + 1}</span>
<span class="lt ${v == null ? 'unknown' : ''}" style="${heatStyle(e)}">${e.symbol}</span>
<span class="ln">${e.name.ru}${phone ? `<small>№ ${e.z}</small>` : ` <small>№ ${e.z}</small>`}</span>
<span class="lv">${v == null ? '<span class="nd">нет данных</span>' : ru(v, 2)}</span>
<span class="lb"><i style="width:${bar}%"></i></span></div>`;
}
const LIST_CSS = `
.lr{display:grid;grid-template-columns:28px 34px 1fr auto;grid-template-areas:'rk lt ln lv' 'rk lt lb lb';column-gap:10px;align-items:center;padding:7px 0;border-bottom:1px solid var(--line)}
.rk{grid-area:rk;font-size:12px;opacity:.7;text-align:right;font-variant-numeric:tabular-nums}
.lt{grid-area:lt;width:34px;height:34px;display:grid;place-items:center;font-family:Oswald;font-weight:600;font-size:16px}
.ln{grid-area:ln;font-size:15px}
.ln small{font-size:12px;opacity:.7;margin-left:6px}
.lv{grid-area:lv;font-family:Bebas;font-size:24px;line-height:1}
.lv .nd{font-family:Golos;font-size:13px;opacity:.75}
.lb{grid-area:lb;height:3px;background:color-mix(in srgb,var(--fg) 12%,transparent)}
.lb i{display:block;height:100%;background:var(--fg)}
`;

const LEAD_EN =
	'Электроотрицательность — способность атома притягивать к себе электроны химической связи. Значения по шкале Полинга, безразмерные. Растёт слева направо по периоду и уменьшается сверху вниз по группе: максимум у фтора (3,98), минимум у франция (0,7).';
const PROPS = ['Атомная масса', 'Электроотрицательность', 'Ковалентный радиус', 'Плотность', 'Температура плавления', 'Энергия ионизации'];

// ---------- 1. Property page ----------
function propertyDesk() {
	const cols = [sorted.slice(0, 40), sorted.slice(40, 80), sorted.slice(80)];
	let k = 0;
	return doc(
		`${deskBar('Свойства элементов')}
<div class="wrap">
  <div class="props">${PROPS.map((p) => `<span class="chip${p === 'Электроотрицательность' ? ' on' : ''}">${p}</span>`).join('')}</div>
  <div class="hero">
    <div><h1 class="display">Электроотрицательность химических элементов</h1><p class="lead">${LEAD_EN}</p>
    <p class="note" style="margin-top:14px">Источник: PubChem (NIH). У благородных газов He, Ne, Ar и у тяжёлых элементов значения не измерены — показываем «нет данных».</p></div>
  </div>
  <div class="tbl">${heatTable(64, 4, 16)}
  <div class="scale" style="margin-top:16px"><b>Электроотрицательность, по Полингу</b> ${ru(MIN, 1)} <i></i> ${ru(MAX, 2)} <span><span class="nd unknown"></span>нет данных</span></div></div>
  <div class="listhead"><h2 class="display">Все элементы по электроотрицательности</h2>
    <span class="seg"><span class="on">По убыванию</span><span>По возрастанию</span><span>По номеру</span></span></div>
  <div class="cols">${cols.map((c) => `<div>${c.map((e) => listRow(e, k++, false)).join('')}</div>`).join('')}</div>
</div>${deskFooter}`,
		`${DESK_CSS}${HEAT_CSS}${LIST_CSS}
.props{display:flex;gap:6px;margin:22px 0 0}
.hero{margin:26px 0 22px}
h1.display{font-size:50px;margin:0 0 14px;max-width:20ch}
.tbl{display:grid;justify-content:center;margin-top:8px}
.listhead{display:flex;align-items:center;justify-content:space-between;margin:52px 0 10px;border-top:2px solid var(--rule);padding-top:22px}
.listhead h2{margin:0}
.cols{display:grid;grid-template-columns:repeat(3,1fr);gap:0 40px}
`
	);
}

function propertyPhone() {
	const PITCH = (390 - 24) / 18;
	return doc(
		`${phoneBar()}
<div class="wrap">
  <h1 class="display">Электроотрицательность элементов</h1>
  <p class="lead">${LEAD_EN}</p>
  <div class="chips" style="margin:18px 0 16px">${PROPS.slice(1).map((p) => `<span class="chip${p === 'Электроотрицательность' ? ' on' : ''}">${p}</span>`).join('')}</div>
  ${heatTable(PITCH, 1.5, 8, { mini: true })}
  <div class="scale" style="margin-top:12px">${ru(MIN, 1)} <i style="flex:1"></i> ${ru(MAX, 2)}</div>
  <p class="note" style="margin:6px 0 0"><span class="nd unknown" style="display:inline-block;width:14px;height:11px;vertical-align:-1px"></span> нет данных · источник: PubChem (NIH)</p>
  <h2 class="display" style="margin-top:30px">Все элементы по значению</h2>
  <span class="seg" style="margin-bottom:6px"><span class="on">По убыванию</span><span>По возрастанию</span><span>По номеру</span></span>
  <div>${sorted.slice(0, 14).map((e, i) => listRow(e, i, true)).join('')}</div>
  <p class="more">… ещё 104 элемента, список целиком</p>
</div>${phoneFooter}`,
		`${PHONE_CSS}${HEAT_CSS}${LIST_CSS}
.hc{display:grid;place-items:center;padding:0;font-family:Oswald;font-weight:600;font-size:10.5px}
.ln small{display:block;margin:0}
.more{text-align:center;font-size:13px;opacity:.7;margin:10px 0 0}
`
	);
}

// ---------- 2. Molar mass ----------
const DIGITS = (t) => (t.includes('.') ? t.split('.')[1].length : 0);
function molar(parts) {
	const rows = parts.map(([s, n]) => {
		const e = bySym[s];
		return { e, n, sum: e.mass.value * n, digits: DIGITS(e.mass.text) };
	});
	const total = rows.reduce((a, r) => a + r.sum, 0);
	const digits = Math.min(...rows.map((r) => r.digits));
	return { rows, total, digits };
}
const sub = (f) => f.replace(/(\d+)/g, '<sub>$1</sub>');

const POPULAR = [
	['H2O', 'Вода', [['H', 2], ['O', 1]]],
	['NaCl', 'Хлорид натрия', [['Na', 1], ['Cl', 1]]],
	['CO2', 'Углекислый газ', [['C', 1], ['O', 2]]],
	['H2SO4', 'Серная кислота', [['H', 2], ['S', 1], ['O', 4]]],
	['HCl', 'Хлороводород', [['H', 1], ['Cl', 1]]],
	['NaOH', 'Гидроксид натрия', [['Na', 1], ['O', 1], ['H', 1]]],
	['C6H12O6', 'Глюкоза', [['C', 6], ['H', 12], ['O', 6]]],
	['CaCO3', 'Карбонат кальция', [['Ca', 1], ['C', 1], ['O', 3]]],
	['NH3', 'Аммиак', [['N', 1], ['H', 3]]],
	['KMnO4', 'Перманганат калия', [['K', 1], ['Mn', 1], ['O', 4]]],
	['C2H5OH', 'Этанол', [['C', 2], ['H', 6], ['O', 1]]],
	['O2', 'Кислород', [['O', 2]]]
];
const popularCards = (n) =>
	POPULAR.slice(0, n)
		.map(([f, name, p]) => {
			const m = molar(p);
			return `<div class="pc"><span class="display pf">${sub(f)}</span><span class="pn">${name}</span><span class="num pm">${ru(m.total, m.digits)}</span></div>`;
		})
		.join('');

function breakdown(m, phone) {
	const bar = m.rows
		.map((r) => `<span class="sw cat-${r.e.category}" style="flex:${r.sum}"><b>${r.e.symbol}</b></span>`)
		.join('');
	const rows = m.rows
		.map(
			(r) => `<div class="br"><span class="bt sw cat-${r.e.category}">${r.e.symbol}</span>
<span class="bn">${r.e.name.ru}<small>${r.n} × ${ru(r.e.mass.value, r.digits)}</small></span>
<span class="bs">${ru(r.sum, r.digits)}</span><span class="bp">${ru((r.sum / m.total) * 100, 1)} %</span></div>`
		)
		.join('');
	return `<div class="stack">${bar}</div>${rows}`;
}
const MOLAR_CSS = `
.input{display:flex;align-items:center;gap:12px;border:2px solid var(--on-surface);border-radius:12px;padding:12px 16px;font-size:26px;background:color-mix(in srgb,#fff 35%,var(--surface))}
.input .caret{width:2px;height:30px;background:var(--on-surface);margin-left:-8px}
.input .clear{margin-left:auto;font-size:18px;opacity:.6}
.lbl{font-size:13px;margin:0 0 6px}
.formula{font-family:Oswald;font-weight:600;font-size:40px;line-height:1;margin:18px 0 0}
sub{font-size:.6em;vertical-align:-.25em;line-height:0}
.result{margin-top:18px;padding-top:14px;border-top:1.5px solid var(--on-surface)}
.result .num{font-size:96px;display:inline-block}
.result .unit{font-size:22px;margin-left:8px}
.school{font-size:14px;margin-top:6px}
.stack{display:flex;gap:3px;height:34px;margin:4px 0 12px}
.stack span{display:grid;place-items:center;font-family:Oswald;font-weight:600;font-size:15px;min-width:22px}
.br{display:grid;grid-template-columns:40px 1fr auto 64px;gap:12px;align-items:center;padding:9px 0;border-bottom:1px solid var(--line)}
.bt{width:40px;height:40px;display:grid;place-items:center;font-family:Oswald;font-weight:600;font-size:19px}
.bn{font-size:16px}
.bn small{display:block;font-size:13px;opacity:.75;font-variant-numeric:tabular-nums}
.bs{font-size:17px;font-variant-numeric:tabular-nums}
.bp{font-size:14px;text-align:right;opacity:.8;font-variant-numeric:tabular-nums}
.calc{font-size:15px;margin-top:14px;font-variant-numeric:tabular-nums}
.pc{display:grid;padding:12px 14px;border:1.5px solid var(--fg);gap:2px}
.pf{font-size:26px}
.pn{font-size:13px}
.pm{font-size:28px;margin-top:6px}
.keys{display:flex;gap:6px;margin-top:10px}
.keys span{flex:1;display:grid;place-items:center;height:42px;border:1.5px solid var(--on-surface);border-radius:10px;font-size:18px}
`;

function molarDesk() {
	const m = molar([['K', 1], ['Mn', 1], ['O', 4]]);
	return doc(
		`${deskBar('Молярная масса')}
<div class="wrap">
  <h1 class="display" style="font-size:50px;margin:30px 0 12px">Калькулятор молярной массы</h1>
  <p class="lead">Введите формулу вещества — например, H2SO4, Ca(OH)2 или CuSO4·5H2O. Калькулятор покажет молярную массу и вклад каждого элемента. Атомные массы — IUPAC (CIAAW), как в таблице.</p>
  <div class="grid">
    <div class="card calcard">
      <p class="lbl">Формула</p>
      <div class="input">KMnO4<span class="caret"></span><span class="clear">✕</span></div>
      <p class="formula">${sub('KMnO4')}<span class="fname">перманганат калия</span></p>
      <div class="result"><p class="lbl">Молярная масса</p><span class="num">${ru(m.total, m.digits)}</span><span class="unit">г/моль</span>
      <p class="school">Для школьных задач (округлённые массы K = 39, Mn = 55, O = 16): <b>158 г/моль</b></p></div>
    </div>
    <div>
      <h2 class="display">Из чего складывается</h2>
      ${breakdown(m)}
      <p class="calc">M(KMnO<sub>4</sub>) = 39,098 + 54,938 + 4 × 15,999 = <b>158,032 г/моль</b></p>
      <p class="note">Результат округлён до точности наименее точной атомной массы.</p>
    </div>
  </div>
  <h2 class="display" style="margin-top:52px;padding-top:22px;border-top:2px solid var(--rule)">Популярные вещества</h2>
  <div class="pop">${popularCards(12)}</div>
</div>${deskFooter}`,
		`${DESK_CSS}${MOLAR_CSS}
.grid{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,6fr);gap:56px;margin-top:30px;align-items:start}
.calcard{padding:24px}
.fname{font-family:Golos;font-weight:400;font-size:16px;margin-left:14px;vertical-align:middle}
.pop{display:grid;grid-template-columns:repeat(6,1fr);gap:12px}
`
	);
}

function molarPhone() {
	const m = molar([['H', 2], ['S', 1], ['O', 4]]);
	return doc(
		`${phoneBar()}
<div class="wrap">
  <h1 class="display">Калькулятор молярной массы</h1>
  <p class="lead">Введите формулу: H2SO4, Ca(OH)2, CuSO4·5H2O. Атомные массы — IUPAC (CIAAW).</p>
  <div class="card" style="padding:14px;margin-top:16px">
    <div class="input" style="font-size:22px">H2SO4<span class="caret" style="height:26px"></span><span class="clear">✕</span></div>
    <div class="keys"><span>(</span><span>)</span><span>·</span><span>2</span><span>3</span><span>4</span></div>
    <p class="formula" style="font-size:34px">${sub('H2SO4')} <span style="font-family:Golos;font-weight:400;font-size:14px">серная кислота</span></p>
    <div class="result"><p class="lbl">Молярная масса</p><span class="num" style="font-size:72px">${ru(m.total, m.digits)}</span><span class="unit">г/моль</span>
    <p class="school">Для школьных задач: <b>98 г/моль</b></p></div>
  </div>
  <h2 class="display" style="margin-top:30px;font-size:24px">Из чего складывается</h2>
  ${breakdown(m, true)}
  <p class="calc">2 × 1,0080 + 32,06 + 4 × 15,999 = <b>98,07</b></p>
  <h2 class="display" style="margin-top:30px;font-size:24px">Популярные вещества</h2>
  <div class="pop">${popularCards(6)}</div>
</div>${phoneFooter}`,
		`${PHONE_CSS}${MOLAR_CSS}
.result .num{font-size:72px}
.br{grid-template-columns:36px 1fr auto 52px;gap:10px}
.bt{width:36px;height:36px}
.pop{display:grid;grid-template-columns:1fr 1fr;gap:10px}
`
	);
}

function compoundPhone() {
	const m = molar([['H', 2], ['S', 1], ['O', 4]]);
	return doc(
		`${phoneBar('← Молярная масса')}
<div class="wrap">
  <h1 class="display">Молярная масса серной кислоты</h1>
  <p class="formula" style="font-size:44px;margin:4px 0 16px">${sub('H2SO4')}</p>
  <div class="card" style="padding:16px">
    <p class="lbl">Молярная масса H<sub>2</sub>SO<sub>4</sub></p>
    <span class="num" style="font-size:80px">${ru(m.total, m.digits)}</span><span class="unit" style="font-size:22px;margin-left:8px">г/моль</span>
    <p class="school">Для школьных задач (H = 1, S = 32, O = 16): <b>98 г/моль</b></p>
  </div>
  <h2 class="display" style="margin-top:30px;font-size:24px">Как посчитано</h2>
  ${breakdown(m, true)}
  <p class="calc">M(H<sub>2</sub>SO<sub>4</sub>) = 2 × 1,0080 + 32,06 + 4 × 15,999 = <b>98,07 г/моль</b></p>
  <p class="note">Атомные массы — IUPAC (CIAAW). Молекулярная масса по PubChem: 98,08 — расхождение из-за округления массы серы.</p>
  <h2 class="display" style="margin-top:30px;font-size:24px">Посчитать другое вещество</h2>
  <div class="input" style="font-size:20px;background:transparent;border-color:var(--fg)"><span style="opacity:.55">Например, Ca(OH)2</span></div>
  <div class="chips" style="margin-top:14px;flex-wrap:wrap;mask-image:none">${['H2O', 'NaOH', 'HCl', 'CaCO3', 'NaCl'].map((f) => `<span class="chip"><span>${sub(f)}</span></span>`).join('')}</div>
</div>${phoneFooter}`,
		`${PHONE_CSS}${MOLAR_CSS}
.br{grid-template-columns:36px 1fr auto 52px;gap:10px}
.bt{width:36px;height:36px}
`
	);
}

// ---------- 3. Quick answers on the element page ----------
const fe = bySym.Fe;
const ANSWERS = [
	['Сколько протонов в атоме железа?', '26'],
	['Сколько электронов в атоме железа?', '26', 'в нейтральном атоме'],
	['Какая молярная масса железа?', '55,845 г/моль'],
	['Железо — металл или неметалл?', 'Металл', 'переходный металл'],
	['Агрегатное состояние', 'Твёрдое', 'при комнатной температуре']
];
const answersBlock = (phone) => `<section class="qa card">
  <h2 class="display">Коротко о железе<span class="new">новое</span></h2>
  ${ANSWERS.map(([q, a, s]) => `<div class="qr"><span class="q">${q}</span><span class="a"><b>${a}</b>${s ? `<small>${s}</small>` : ''}</span></div>`).join('')}
</section>`;
const QA_CSS = `
.qa{padding:18px 20px 8px;margin:22px 0 10px}
.qa h2{font-size:26px;margin:0 0 6px}
.qr{display:grid;grid-template-columns:1fr auto;gap:16px;align-items:baseline;padding:10px 0;border-bottom:1px solid color-mix(in srgb,var(--on-surface) 35%,transparent)}
.qr:last-child{border:0}
.q{font-size:15px}
.a{text-align:right}
.a b{font-family:Oswald;font-weight:600;font-size:24px;line-height:1}
.a small{display:block;font-size:12px;opacity:.75}
.key{display:grid;gap:0 24px}
.key div{border-top:2px solid var(--rule);padding-top:8px}
.lb2{font-size:13px;text-decoration:underline dotted;text-underline-offset:3px}
.key .num{display:block;font-size:40px;margin-top:4px}
.key .blk{font-family:Oswald;font-weight:600;font-size:34px}
dl{margin:10px 0 0}
dl div{display:grid;grid-template-columns:var(--dlcols,1fr);padding:10px 0;border-top:1px solid var(--line)}
dt{font-size:14px;text-decoration:underline dotted;text-underline-offset:3px}
dd{margin:0;font-size:16px}
`;
const KEY = `<div class="key"><div><span class="lb2">Атомная масса</span><span class="num">55,845</span></div><div><span class="lb2">Группа</span><span class="num">8</span></div><div><span class="lb2">Период</span><span class="num">4</span></div><div><span class="lb2">Блок</span><span class="num blk">d</span></div></div>`;
const DL = [
	['Электронная конфигурация', '[Ar] 4s² 3d⁶'],
	['Электроны по оболочкам', '2, 8, 14, 2'],
	['Температура плавления', '1 538 °C (1 811 K)'],
	['Температура кипения', '2 861 °C (3 134 K)'],
	['Плотность', '7,874 г/см³']
];
const dl = `<dl>${DL.map(([t, d]) => `<div><dt>${t}</dt><dd>${d}</dd></div>`).join('')}</dl>`;

function shellsSvg(shells, size) {
	const R0 = 92, STEP = 40, C = 300;
	let s = `<svg viewBox="0 0 600 600" width="${size}" height="${size}"><circle cx="${C}" cy="${C}" r="${R0 - 22}" fill="var(--paper)" stroke="var(--fg)" stroke-width="1.5"/>
<text x="${C}" y="${C + 36}" text-anchor="middle" font-family="Oswald" font-weight="600" font-size="110" fill="#000">Fe</text>`;
	shells.forEach((n, i) => {
		const r = R0 + i * STEP;
		s += `<circle cx="${C}" cy="${C}" r="${r}" fill="none" stroke="var(--fg)" stroke-width="1.2" opacity=".75"/>`;
		for (let k = 0; k < n; k++) {
			const a = (k / n) * 2 * Math.PI - Math.PI / 2 + i * 0.4;
			s += `<circle cx="${C + r * Math.cos(a)}" cy="${C + r * Math.sin(a)}" r="7" fill="var(--fg)"/>`;
		}
	});
	return s + '</svg>';
}

function elementDesk() {
	return doc(
		`<div class="top"><div><h1 class="display">Железо</h1><span>Iron</span></div><span class="nav"><span class="round">←</span><span class="round">→</span><span class="btn" style="padding:8px 16px;font-size:14px">Закрыть</span></span></div>
<div class="layout">
  <div class="fig">${shellsSvg(fe.shells, 520)}<span class="bigz num">26</span></div>
  <div class="data">
    <p style="font-size:19px;margin:0 0 18px">Переходные металлы. Твёрдое.</p>
    <div class="key" style="grid-template-columns:repeat(4,1fr)">${KEY.slice(17, -6)}</div>
    ${answersBlock(false)}
    <div style="--dlcols:280px 1fr">${dl}</div>
  </div>
</div>`,
		`${QA_CSS}
body{width:1440px;height:1100px;overflow:hidden}
.top{display:flex;align-items:flex-end;justify-content:space-between;margin:0 56px;padding:26px 0 12px;border-bottom:2px solid var(--rule)}
.top h1{font-size:72px;margin:0;line-height:1}
.nav{display:flex;gap:8px;align-items:center}
.layout{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,6fr);gap:56px;padding:30px 56px}
.fig{position:relative}
.bigz{position:absolute;left:420px;top:390px;background:var(--paper);color:var(--raspberry);font-size:120px;padding:10px 18px 0}
.data{max-width:640px}
`
	);
}

function elementPhone() {
	return doc(
		`<div class="head"><div class="tile sw cat-transition-metal"><span class="num tz">26</span><b>Fe</b></div><div><h1 class="display">Железо</h1><span style="font-size:13px">Iron</span></div></div>
<div class="wrap">
  <p style="font-size:15px;margin:14px 0 14px">Переходные металлы. Твёрдое.</p>
  <div class="key" style="grid-template-columns:1fr 1fr;row-gap:16px">${KEY.slice(17, -6)}</div>
  ${answersBlock(true)}
  ${dl}
</div>
<div class="bar"><span class="pill" style="padding:11px 15px;font-size:15px">← <b class="display">Mn</b></span><span class="btn">Закрыть</span><span class="pill" style="padding:11px 15px;font-size:15px"><b class="display">Co</b> →</span></div>`,
		`${PHONE_CSS}${QA_CSS}
body{height:1330px;overflow:hidden;position:relative}
.head{display:grid;grid-template-columns:96px 1fr;gap:16px;align-items:center;margin:16px 12px 0;padding-bottom:16px;border-bottom:2px solid var(--rule)}
.tile{width:96px;height:96px;padding:6px 8px;display:grid;grid-template-rows:auto 1fr;box-shadow:5px 5px 0 var(--rule)}
.tile .tz{color:var(--raspberry);font-size:21px}
.tile b{font-family:Oswald;font-weight:600;font-size:48px;line-height:1;align-self:center}
.head h1{font-size:44px;margin:0}
.qa{padding:14px 14px 4px}
.qa h2{font-size:24px}
.q{font-size:14px}
.a b{font-size:22px}
.bar{position:absolute;left:0;right:0;bottom:0;display:flex;justify-content:space-between;align-items:center;padding:10px 12px 16px;background:var(--bg);border-top:2px solid var(--rule)}
`
	);
}

// ---------- 4. Print page ----------
const PRINT_TIPS = [
	'Векторный PDF: текст чёткий при любом масштабе, его можно искать и копировать.',
	'Чёрно-белая версия — для обычного принтера: категории различаются фактурой, а не только цветом.',
	'Печатайте в масштабе 100 % («Фактический размер»), ориентация альбомная.',
	'Данные IUPAC (CIAAW), NIST, PubChem; обновлены 12 октября 2026.'
];
const OTHER_LANGS = 'English · Français · Deutsch · Italiano · Español · 简体中文 · Português';

function printDesk() {
	return doc(
		`${deskBar('Распечатать')}
<div class="wrap">
  <h1 class="display" style="font-size:50px;margin:30px 0 12px">Таблица Менделеева для печати</h1>
  <p class="lead">Бесплатные PDF на русском языке: A4 и US Letter, цветная и чёрно-белая. Скачайте и распечатайте — регистрация не нужна.</p>
  <div class="grid">
    <div class="sheet"><img src="${img('print-a4-color.png')}"></div>
    <div class="opts">
      <p class="lbl">Формат бумаги</p><span class="seg"><span class="on">A4 · 297 × 210 мм</span><span>US Letter</span></span>
      <p class="lbl">Цвет</p><span class="seg"><span class="on">Цветная</span><span>Чёрно-белая</span></span>
      <div style="margin-top:26px"><span class="btn" style="padding:16px 30px;font-size:18px">↓ Скачать PDF</span><span class="note" style="margin-left:14px">510 КБ</span></div>
      <ul>${PRINT_TIPS.map((t) => `<li>${t}</li>`).join('')}</ul>
    </div>
  </div>
  <h2 class="display" style="margin-top:52px;padding-top:22px;border-top:2px solid var(--rule)">Все варианты</h2>
  <div class="variants">
    ${[['A4', 'color', 'Цветная'], ['A4', 'bw', 'Чёрно-белая'], ['US Letter', 'color', 'Цветная'], ['US Letter', 'bw', 'Чёрно-белая']]
			.map(([p, v, n]) => `<div class="var"><img src="${img(`print-a4-${v}.png`)}"><span><b>${p}</b> · ${n}</span><a>PDF ↓</a></div>`)
			.join('')}
  </div>
  <p style="margin-top:28px;font-size:15px">На других языках: ${OTHER_LANGS}</p>
</div>${deskFooter}`,
		`${DESK_CSS}
.grid{display:grid;grid-template-columns:minmax(0,7fr) minmax(0,4fr);gap:48px;margin-top:30px;align-items:start}
.sheet{position:relative;z-index:101;background:#fff;box-shadow:8px 8px 0 var(--rule);padding:0;line-height:0}
.sheet img{width:100%}
.lbl{font-size:14px;margin:18px 0 8px}
.opts ul{margin:28px 0 0;padding-left:1.1em;font-size:15px;display:grid;gap:8px}
.variants{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.var{display:grid;gap:8px;font-size:15px}
.var img{position:relative;z-index:101;width:100%;background:#fff;box-shadow:5px 5px 0 var(--rule)}
.var a{text-decoration:underline}
`
	);
}

function printPhone() {
	return doc(
		`${phoneBar()}
<div class="wrap">
  <h1 class="display">Таблица Менделеева для печати</h1>
  <p class="lead">Бесплатные PDF: A4 и US Letter, цветная и чёрно-белая.</p>
  <div class="sheet"><img src="${img('print-a4-color.png')}"></div>
  <p class="lbl">Формат бумаги</p><span class="seg"><span class="on">A4</span><span>US Letter</span></span>
  <p class="lbl">Цвет</p><span class="seg"><span class="on">Цветная</span><span>Чёрно-белая</span></span>
  <div class="btn" style="display:flex;margin-top:22px;padding:15px">↓ Скачать PDF · 510 КБ</div>
  <ul>${PRINT_TIPS.map((t) => `<li>${t}</li>`).join('')}</ul>
  <p style="font-size:14px;margin-top:18px">На других языках: ${OTHER_LANGS}</p>
</div>${phoneFooter}`,
		`${PHONE_CSS}
.sheet{position:relative;z-index:101;margin:18px 0 6px;background:#fff;box-shadow:5px 5px 0 var(--rule);line-height:0}
.sheet img{width:100%}
.lbl{font-size:14px;margin:16px 0 8px}
ul{margin:22px 0 0;padding-left:1.1em;font-size:14px;display:grid;gap:8px}
`
	);
}

// ---------- Write and screenshot ----------
const pages = {
	'1-property-desktop': [propertyDesk(), 1440],
	'1-property-phone': [propertyPhone(), 390],
	'2-molar-desktop': [molarDesk(), 1440],
	'2-molar-phone': [molarPhone(), 390],
	'2-compound-phone': [compoundPhone(), 390],
	'3-element-desktop': [elementDesk(), 1440],
	'3-element-phone': [elementPhone(), 390],
	'4-print-desktop': [printDesk(), 1440],
	'4-print-phone': [printPhone(), 390]
};
fs.mkdirSync(OUT, { recursive: true });
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const page = await browser.newPage();
for (const [name, [html, width]] of Object.entries(pages)) {
	const file = path.join(OUT, `${name}.html`);
	fs.writeFileSync(file, html);
	await page.setViewport({ width, height: 900, deviceScaleFactor: width < 500 ? 2 : 1 });
	await page.goto(pathToFileURL(file).href, { waitUntil: 'load' });
	await page.evaluate(() => document.fonts.ready);
	await page.screenshot({ path: path.join(OUT, `${name}.jpg`), fullPage: true, type: 'jpeg', quality: 82 });
}
await browser.close();
console.log('written to', OUT);
