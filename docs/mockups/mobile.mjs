// Static mobile mockups (2026-10-12): home "map + loupe" and the element page. Not used by the build.
// Run: node docs/mockups/mobile.mjs, then open the .html files or screenshot them at 390 px.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = 'D:/ChemTable';
import { fileURLToPath } from 'node:url';
const OUT = path.dirname(fileURLToPath(import.meta.url));
const els = JSON.parse(fs.readFileSync(`${ROOT}/src/lib/data/elements.json`, 'utf8')).elements;
const nm = (p) => pathToFileURL(`${ROOT}/node_modules/${p}`).href;

const FONTS = `
@font-face{font-family:Oswald;font-weight:600;src:url(${nm('@fontsource/oswald/files/oswald-latin-600-normal.woff2')})}
@font-face{font-family:Oswald;font-weight:600;src:url(${nm('@fontsource/oswald/files/oswald-cyrillic-600-normal.woff2')});unicode-range:U+0400-04FF}
@font-face{font-family:Bebas;src:url(${nm('@fontsource/bebas-neue/files/bebas-neue-latin-400-normal.woff2')})}
@font-face{font-family:Golos;font-weight:400 900;src:url(${nm('@fontsource-variable/golos-text/files/golos-text-latin-wght-normal.woff2')})}
@font-face{font-family:Golos;font-weight:400 900;src:url(${nm('@fontsource-variable/golos-text/files/golos-text-cyrillic-wght-normal.woff2')});unicode-range:U+0400-04FF}
`;

const BASE = `
:root{--mustard:#e3a83a;--paper:#e6e3da;--ink:#000;--teal:#126f60;--orange:#ee7430;--raspberry:#df3b57;--green:#1d7442;--peach:#f4b48a;
--bg:var(--mustard);--fg:var(--ink);--surface:var(--paper);--on-surface:var(--ink);--rule:var(--ink)}
.dark{--bg:var(--ink);--fg:var(--paper);--surface:#1f1f1f;--on-surface:var(--paper);--rule:var(--paper)}
*{box-sizing:border-box}
html,body{margin:0;background:var(--bg);color:var(--fg);font-family:Golos,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
body{width:390px;position:relative;min-height:844px}
body::after{content:'';position:fixed;inset:0;pointer-events:none;z-index:100;opacity:var(--grain,.32);mix-blend-mode:var(--blend,multiply);
background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -1.4 1'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
.dark body,body.dark{--grain:.12;--blend:screen}
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
.dark .cat-transition-metal,.dark .cat-post-transition-metal{--fill:#262626;--on:var(--paper)}
.dark .cat-transition-metal{--tex:radial-gradient(circle,rgb(255 255 255/.18) .7px,transparent 1px) 0 0/3.5px 3.5px}
.dark .cat-post-transition-metal{--tex:repeating-linear-gradient(135deg,rgb(255 255 255/.14) 0 1px,transparent 1px 4px)}
.dark .cat-actinide{--fill:#3a3a3a}
.sw{background:var(--tex),var(--fill);color:var(--on)}
.display{font-family:Oswald,'Arial Narrow',sans-serif;font-weight:600;line-height:1}
.num{font-family:Bebas,Oswald,sans-serif;line-height:1}
`;

// ---------- Home: map + loupe ----------
const PITCH = 20.33; // (390 - 2*12) / 18
const CELL = PITCH - 1.5;
const fe = els[25];
const cellAt = (col, row) => {
	const y = row <= 7 ? (row - 1) * PITCH : 7 * PITCH + 8 + (row - 9) * PITCH;
	return { x: (col - 1) * PITCH, y };
};

function miniTable(selectedZ) {
	let html = '';
	for (const e of els) {
		const { x, y } = cellAt(e.col, e.row);
		const sel = e.z === selectedZ ? ' sel' : '';
		html += `<div class="c sw cat-${e.category}${sel}" style="left:${x}px;top:${y}px">${e.symbol}</div>`;
	}
	for (const [row, cat] of [[6, 'lanthanide'], [7, 'actinide']]) {
		const { x, y } = cellAt(3, row);
		html += `<div class="c sw cat-${cat} ph" style="left:${x}px;top:${y}px"></div>`;
	}
	// Group numbers above the table
	return html;
}

function legend() {
	const cats = [
		['alkali-metal', 'Щелочные'],
		['alkaline-earth-metal', 'Щёлочноземельные'],
		['transition-metal', 'Переходные'],
		['post-transition-metal', 'Постпереходные'],
		['metalloid', 'Полуметаллы'],
		['nonmetal', 'Неметаллы'],
		['halogen', 'Галогены'],
		['noble-gas', 'Благородные газы'],
		['lanthanide', 'Лантаноиды'],
		['actinide', 'Актиноиды']
	];
	return cats.map(([c, n]) => `<li><span class="dot sw cat-${c}"></span>${n}</li>`).join('');
}

function home(dark) {
	const { x, y } = cellAt(fe.col, fe.row);
	return `<!doctype html><html lang="ru" class="${dark ? 'dark' : ''}"><head><meta charset="utf-8"><style>${FONTS}${BASE}
header{display:flex;align-items:center;justify-content:space-between;padding:14px 12px 0}
.pill{border:1.5px solid var(--fg);border-radius:99px;padding:6px 12px;font-size:14px}
.round{width:34px;height:34px;border:1.5px solid var(--fg);border-radius:50%;display:grid;place-items:center;font-size:15px}
.tools{display:flex;gap:8px}
h1{margin:18px 12px 4px;font-size:34px;letter-spacing:-.2px}
.hint{margin:0 12px 14px;font-size:13px;line-height:1.4;opacity:.8}
.groups{position:relative;height:14px;margin:0 12px}
.groups span{position:absolute;width:${PITCH}px;text-align:center;font-size:8.5px;opacity:.7;font-variant-numeric:tabular-nums}
.map{position:relative;margin:2px 12px 0;height:${9 * PITCH + 8}px}
.map::after{content:'';position:absolute;left:${2 * PITCH}px;top:${7 * PITCH + 3}px;width:${15 * PITCH - 1.5}px;height:1.5px;background:var(--fg);opacity:.85}
.c{position:absolute;width:${CELL}px;height:${CELL}px;display:grid;place-items:center;font-family:Oswald;font-weight:600;font-size:10.5px;letter-spacing:-.2px}
.c.ph{opacity:.9}
.c.sel{outline:2px solid var(--fg);outline-offset:1px;z-index:2}
.bubble{position:absolute;z-index:5;left:${x + CELL / 2 - 33}px;top:${y - 82}px;width:66px;height:72px;padding:5px 7px;
  background:var(--paper);color:var(--ink);box-shadow:4px 4px 0 var(--rule);display:grid;grid-template-rows:auto 1fr}
.bubble .num{color:var(--raspberry);font-size:17px}
.bubble b{font-family:Oswald;font-weight:600;font-size:34px;line-height:1;align-self:center}
.bubble::after{content:'';position:absolute;left:28px;bottom:-9px;border:9px solid transparent;border-top-color:var(--paper);border-bottom:0}
.finger{position:absolute;z-index:4;left:${x + CELL / 2 - 17}px;top:${y + 4}px;width:34px;height:34px;border-radius:50%;
  background:rgb(0 0 0/.16);border:1.5px solid rgb(0 0 0/.35)}
.dark .finger{background:rgb(255 255 255/.16);border-color:rgb(255 255 255/.4)}
.card{margin:18px 12px 0;background:var(--surface);color:var(--on-surface);box-shadow:6px 6px 0 var(--rule);padding:14px;display:grid;grid-template-columns:104px 1fr;gap:14px}
.tile{width:104px;height:104px;padding:8px 9px;display:grid;grid-template-rows:auto 1fr auto}
.tile .num{font-size:24px;color:var(--raspberry)}
.dark .tile .num{color:#ff6f86}
.tile b{font-family:Oswald;font-weight:600;font-size:50px;line-height:1;align-self:center}
.tile small{font-size:9px}
.info h2{margin:2px 0 2px;font-size:30px}
.info .en{font-size:13px;opacity:.7}
.info .cat{font-size:13px;margin-top:8px}
.info .mass{margin-top:10px;font-size:12px;opacity:.8}
.info .mass .num{display:block;font-size:30px;opacity:1}
.actions{grid-column:1/-1;display:flex;align-items:center;gap:8px;border-top:1.5px solid var(--on-surface);padding-top:12px}
.actions .round{border-color:var(--on-surface);width:44px;height:44px;font-size:18px}
.open{margin-left:auto;background:var(--on-surface);color:var(--surface);border-radius:99px;padding:12px 18px;font-weight:600;font-size:15px}
.chips{display:flex;gap:8px;margin:26px 0 0 12px;overflow:hidden;white-space:nowrap;mask-image:linear-gradient(90deg,#000 80%,transparent)}
.chip{border:1.5px solid var(--fg);border-radius:99px;padding:7px 13px;font-size:14px}
.chip.on{background:var(--fg);color:var(--bg)}
ul{list-style:none;margin:16px 12px 30px;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:9px 12px;font-size:13px}
li{display:flex;align-items:center;gap:8px}
.dot{width:16px;height:16px;border-radius:50%;flex:none}
</style></head><body class="${dark ? 'dark' : ''}">
<header><div class="pill">Русский ▾</div><div class="tools"><div class="round">◐</div></div></header>
<h1 class="display">Таблица Менделеева</h1>
<p class="hint">Коснитесь элемента или проведите пальцем по таблице</p>
<div class="groups">${Array.from({ length: 18 }, (_, i) => `<span style="left:${i * PITCH}px">${i + 1}</span>`).join('')}</div>
<div class="map">${miniTable(26)}<div class="finger"></div><div class="bubble"><span class="num">26</span><b>Fe</b></div></div>
<div class="card">
  <div class="tile sw cat-transition-metal"><span class="num">26</span><b>Fe</b><small>Железо</small></div>
  <div class="info"><h2 class="display">Железо</h2><div class="en">Iron</div><div class="cat">Переходный металл · твёрдое</div>
  <div class="mass">Атомная масса<span class="num">55,845</span></div></div>
  <div class="actions"><div class="round">←</div><div class="round">→</div><div class="open">Открыть&nbsp;›</div></div>
</div>
<div class="chips"><span class="chip on">Категории</span><span class="chip">Атомная масса</span><span class="chip">Электроотрицательность</span><span class="chip">Плотность</span></div>
<ul>${legend()}</ul>
</body></html>`;
}

// ---------- Element page: answer first ----------
function shellsSvg(shells) {
	const R0 = 46, STEP = 22, C = 170;
	let s = `<svg viewBox="0 0 340 340" width="300" height="300"><circle cx="${C}" cy="${C}" r="${R0 - 12}" fill="var(--paper)" stroke="var(--fg)" stroke-width="1.2"/>
<text x="${C}" y="${C + 14}" text-anchor="middle" font-family="Oswald" font-weight="600" font-size="40" fill="#000">Fe</text>`;
	shells.forEach((n, i) => {
		const r = R0 + i * STEP;
		s += `<circle cx="${C}" cy="${C}" r="${r}" fill="none" stroke="var(--fg)" stroke-width="1" opacity=".75"/>`;
		for (let k = 0; k < n; k++) {
			const a = (k / n) * 2 * Math.PI - Math.PI / 2 + i * 0.4;
			s += `<circle cx="${C + r * Math.cos(a)}" cy="${C + r * Math.sin(a)}" r="4.2" fill="var(--fg)"/>`;
		}
	});
	return s + '</svg>';
}

function element() {
	const rows = [
		['Электронная конфигурация', '[Ar] 4s² 3d⁶'],
		['Электроны по оболочкам', '2, 8, 14, 2'],
		['Температура плавления', '1 538 °C (1 811 K)'],
		['Температура кипения', '2 861 °C (3 134 K)'],
		['Плотность', '7,874 г/см³'],
		['Электроотрицательность', '1,83 по Полингу'],
		['Энергия ионизации', '7,902 эВ'],
		['Сродство к электрону', '0,153 эВ'],
		['Ковалентный радиус', '132 пм'],
		['Степени окисления', '+3, +2'],
		['Открыт', 'известен с древности']
	];
	return `<!doctype html><html lang="ru"><head><meta charset="utf-8"><style>${FONTS}${BASE}
body{padding-bottom:90px}
.top{padding:14px 16px 0;display:flex;justify-content:space-between;font-size:14px}
.top a{text-decoration:underline;text-underline-offset:3px}
.head{display:grid;grid-template-columns:112px 1fr;gap:16px;align-items:center;padding:14px 16px 18px;border-bottom:2px solid var(--rule)}
.tile{width:112px;height:112px;padding:8px 10px;display:grid;grid-template-rows:auto 1fr auto;box-shadow:5px 5px 0 var(--rule)}
.tile .num{font-size:28px;color:var(--raspberry)}
.tile b{font-family:Oswald;font-weight:600;font-size:56px;line-height:1;align-self:center}
.tile small{font-size:10px}
h1{margin:0;font-size:46px;letter-spacing:-.5px}
.en{font-size:14px;margin-top:4px;opacity:.75}
.cat{font-size:14px;margin-top:8px}
.key{display:grid;grid-template-columns:1fr 1fr;gap:0 18px;padding:4px 16px 0}
.key div{padding:12px 0 10px;border-bottom:1px solid color-mix(in srgb,var(--fg) 45%,transparent)}
.lbl{font-size:13px;text-decoration:underline dotted;text-underline-offset:3px}
.q{display:inline-grid;place-items:center;width:15px;height:15px;border:1px solid var(--fg);border-radius:50%;font-size:10px;margin-left:5px;vertical-align:1px;text-decoration:none}
.key .num{display:block;font-size:42px;margin-top:4px}
.key .blk{font-family:Oswald;font-weight:600;font-size:38px}
dl{margin:8px 16px 0;padding:0}
dl div{padding:11px 0;border-bottom:1px solid color-mix(in srgb,var(--fg) 45%,transparent)}
dd{margin:3px 0 0;font-size:17px;font-variant-numeric:tabular-nums}
.src{margin:14px 16px;font-size:13px;text-decoration:underline}
.atom{display:grid;place-items:center;padding:10px 0 20px}
.bar{position:fixed;z-index:50;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:space-between;gap:8px;padding:10px 12px 16px;
  background:var(--bg);border-top:2px solid var(--rule)}
.nav{border:1.5px solid var(--fg);border-radius:99px;padding:11px 15px;font-size:15px;display:flex;gap:6px;align-items:baseline}
.nav b{font-family:Oswald;font-weight:600;font-size:17px}
.close{background:var(--fg);color:var(--bg);border-radius:99px;padding:12px 20px;font-weight:600;font-size:15px}
</style></head><body>
<div class="top"><a>← Таблица Менделеева</a><span>Русский ▾ &nbsp;◐</span></div>
<div class="head">
  <div class="tile sw cat-transition-metal"><span class="num">26</span><b>Fe</b><small>Железо</small></div>
  <div><h1 class="display">Железо</h1><div class="en">Iron</div><div class="cat">Переходный металл · твёрдое</div></div>
</div>
<div class="key">
  <div><span class="lbl">Атомная масса</span><span class="q">?</span><span class="num">55,845</span></div>
  <div><span class="lbl">Группа</span><span class="q">?</span><span class="num">8</span></div>
  <div><span class="lbl">Период</span><span class="q">?</span><span class="num">4</span></div>
  <div><span class="lbl">Блок</span><span class="q">?</span><span class="num blk">d</span></div>
</div>
<dl>${rows.map(([l, v]) => `<div><dt><span class="lbl">${l}</span><span class="q">?</span></dt><dd>${v}</dd></div>`).join('')}</dl>
<p class="src">PubChem, IUPAC CIAAW, NIST</p>
<div class="atom">${shellsSvg([2, 8, 14, 2])}</div>
<div class="bar"><span class="nav">‹ <b>Mn</b></span><span class="close">Закрыть</span><span class="nav"><b>Co</b> ›</span></div>
</body></html>`;
}

fs.writeFileSync(`${OUT}/home.html`, home(false));
fs.writeFileSync(`${OUT}/home-dark.html`, home(true));
fs.writeFileSync(`${OUT}/element.html`, element());
console.log('written to', OUT);
