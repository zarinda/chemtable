// Static mockups (2026-10-14) of the lower part of the home page, from "About" to the footer:
// three layouts, each for desktop and phone. Not used by the build.
// Run: node docs/mockups/footer.mjs — writes .html and .jpg into docs/mockups/footer/.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import puppeteer from 'puppeteer-core';

const ROOT = 'D:/ChemTable';
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), 'footer');
const nm = (p) => pathToFileURL(`${ROOT}/node_modules/${p}`).href;
const img = (f) => pathToFileURL(path.join(ROOT, 'docs/mockups/seo', f)).href;

const FONTS = `
@font-face{font-family:Oswald;font-weight:600;src:url(${nm('@fontsource/oswald/files/oswald-latin-600-normal.woff2')})}
@font-face{font-family:Oswald;font-weight:600;src:url(${nm('@fontsource/oswald/files/oswald-cyrillic-600-normal.woff2')});unicode-range:U+0400-04FF}
@font-face{font-family:Bebas;src:url(${nm('@fontsource/bebas-neue/files/bebas-neue-latin-400-normal.woff2')})}
@font-face{font-family:Golos;font-weight:400 900;src:url(${nm('@fontsource-variable/golos-text/files/golos-text-latin-wght-normal.woff2')})}
@font-face{font-family:Golos;font-weight:400 900;src:url(${nm('@fontsource-variable/golos-text/files/golos-text-cyrillic-wght-normal.woff2')});unicode-range:U+0400-04FF}
`;

const BASE = `
:root{--mustard:#e3a83a;--paper:#e6e3da;--ink:#000;--teal:#126f60;--orange:#ee7430;--raspberry:#df3b57;--green:#1d7442;--peach:#f4b48a;
--bg:var(--mustard);--fg:var(--ink);--surface:var(--paper);--on-surface:var(--ink);--rule:var(--ink);--line:color-mix(in srgb,var(--fg) 40%,transparent)}
*{box-sizing:border-box}
html,body{margin:0;background:var(--bg);color:var(--fg);font-family:Golos,system-ui,sans-serif;-webkit-font-smoothing:antialiased;line-height:1.5;font-size:15px}
body{position:relative}
body::after{content:'';position:absolute;inset:0;pointer-events:none;z-index:100;opacity:.32;mix-blend-mode:multiply;
background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -1.4 1'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
.display{font-family:Oswald,'Arial Narrow',sans-serif;font-weight:600;line-height:1.1;letter-spacing:-.2px}
.num{font-family:Bebas,Oswald,sans-serif;line-height:1}
a{color:inherit;text-decoration:underline;text-underline-offset:3px;text-decoration-thickness:1px}
p{margin:0}
ul{margin:0;padding:0;list-style:none}
sub{font-size:.62em;vertical-align:-.25em;line-height:0}
h2{margin:0}
.dots{background:radial-gradient(circle,rgb(0 0 0/.22) .9px,transparent 1.2px) 0 0/5px 5px,var(--paper)}
.pill{display:inline-flex;align-items:center;border:1.5px solid var(--fg);border-radius:99px;padding:.3em .9em;font-size:14px;text-decoration:none}
.legend{display:flex;flex-wrap:wrap;gap:6px 22px;font-size:14px}
.legend i{display:inline-block;width:12px;height:12px;border-radius:50%;margin-right:6px;vertical-align:-1px;border:1px solid rgb(0 0 0/.3)}
.note{font-size:13px;opacity:.8}
`;

const doc = (body, css, width) =>
	`<!doctype html><html lang="ru"><head><meta charset="utf-8"><style>${FONTS}${BASE}body{width:${width}px}${css}</style></head><body>${body}</body></html>`;

// ---------- Content (the Russian home page) ----------
const ABOUT = [
	'Интерактивная периодическая таблица всех 118 химических элементов для школьников и студентов. У каждого элемента есть карточка: атомная масса, электронная конфигурация, температуры плавления и кипения, плотность, электроотрицательность, энергия ионизации и степени окисления — с короткими пояснениями.',
	'Таблицу можно окрасить по категориям или по любому свойству и увидеть периодические закономерности: как электроотрицательность растёт к фтору и как атомы становятся крупнее сверху вниз по группе.'
];
const PROPS = [
	['A<sub>r</sub>', 'Атомная масса'],
	['χ', 'Электроотрицательность'],
	['r', 'Ковалентный радиус'],
	['ρ', 'Плотность'],
	['t°', 'Температура плавления'],
	['E<sub>i</sub>', 'Энергия ионизации']
];
const SOURCES = [
	['IUPAC CIAAW', 'атомные массы'],
	['NIST', 'энергии ионизации'],
	['PubChem (NIH)', 'остальные свойства, сверка с CRC'],
	['Cordero и др., 2008', 'ковалентные радиусы'],
	['Википедия', 'сродство к электрону'],
	['Wikidata', 'названия на 8 языках']
];
const FILES = ['elements.json', 'elements.csv', 'llms.txt'];
const LANGS = ['English', '<b>Русский</b>', 'Français', 'Deutsch', 'Italiano', 'Español', '简体中文', 'Português'];
const LEGAL = 'Создано <a>Zarinda</a> · <a>Политика конфиденциальности</a> · <a>Лицензии</a>';
const STAMP = 'Данные обновлены 12.10.2026 · <a>CC BY 4.0</a>';

const CATS = [
	['#ee7430', 'Щелочные металлы'],
	['#ee7430', 'Щёлочноземельные'],
	['#e6e3da', 'Переходные металлы'],
	['#e6e3da', 'Постпереходные'],
	['#1d7442', 'Полуметаллы'],
	['#126f60', 'Неметаллы'],
	['#126f60', 'Галогены'],
	['#df3b57', 'Благородные газы'],
	['#f4b48a', 'Лантаноиды'],
	['#000', 'Актиноиды']
];
const legend = `<div class="legend">${CATS.map(([c, n]) => `<span><i style="background:${c}"></i>${n}</span>`).join('')}</div>`;
// Heat scale of the property pages (src/lib/heat.ts), as a small bar per property.
const HEAT = 'linear-gradient(90deg, var(--paper), var(--teal), color-mix(in oklab, var(--ink) 80%, var(--teal)))';

// What the bottom of the table looks like now, for context: the legend under the table.
const deskTop = `<div class="ctx"><div class="tablefade"></div>${legend}</div>`;
const phoneTop = `<div class="ctx"><div class="tablefade"></div>${legend}</div>`;
const CTX_CSS = `
.ctx{padding:0 var(--pad) 8px}
.tablefade{height:70px;margin-bottom:18px;background:repeating-linear-gradient(90deg,var(--paper) 0 calc((100% - 17*4px)/18),transparent 0 calc((100% - 17*4px)/18 + 4px));opacity:.55;mask-image:linear-gradient(transparent,#000)}
`;

// ======================================================================
// A. «Указатель»: numbered sections, heading on the left, content on the right, rules between.
// ======================================================================
function indexDesk() {
	return doc(
		`${deskTop}
<main class="ix">
  <section><div class="lhs"><span class="num no">01</span><h2 class="display">Об этой таблице</h2></div>
    <div class="rhs about"><p class="lead">${ABOUT[0]}</p><p>${ABOUT[1]}</p></div></section>

  <section><div class="lhs"><span class="num no">02</span><h2 class="display">Инструменты</h2></div>
    <div class="rhs tools">
      <a class="tool"><span class="thumb"><img src="${img('print-a4-color.png')}"></span>
        <span><b class="display t">Таблица для печати</b><span class="d">Бесплатный PDF A4 и US Letter, цветной и чёрно-белый.</span><span class="go">Скачать PDF →</span></span></a>
      <a class="tool"><span class="mini"><span class="display f">H<sub>2</sub>SO<sub>4</sub></span><span class="num v">98,07</span><span class="u">г/моль</span></span>
        <span><b class="display t">Калькулятор молярной массы</b><span class="d">Формула → г/моль, вклад каждого элемента и решение.</span><span class="go">Открыть калькулятор →</span></span></a>
    </div></section>

  <section><div class="lhs"><span class="num no">03</span><h2 class="display">Свойства элементов</h2><p class="note" style="margin-top:8px">Таблица, окрашенная по свойству, и все значения списком.</p></div>
    <ul class="rhs props">${PROPS.map(([s, n]) => `<li><a><span class="bar"></span><span>${n}</span></a></li>`).join('')}</ul></section>

  <section><div class="lhs"><span class="num no">04</span><h2 class="display">Источники и данные</h2></div>
    <div class="rhs data">
      <dl>${SOURCES.map(([s, w]) => `<div><dt>${s}</dt><dd>${w}</dd></div>`).join('')}</dl>
      <div><p class="k">Скачать набор данных</p><p class="files">${FILES.map((f) => `<a class="pill">${f}</a>`).join('')}</p><p class="note" style="margin-top:12px">${STAMP}</p></div>
    </div></section>
</main>
<footer class="ft"><span class="langs">${LANGS.join(' <i>·</i> ')}</span><span>${LEGAL}</span></footer>`,
		`:root{--pad:48px}${CTX_CSS}
.ix{padding:0 var(--pad)}
.ix section{display:grid;grid-template-columns:4fr 8fr;gap:48px;padding:30px 0 44px;border-top:2px solid var(--rule)}
.lhs{display:grid;align-content:start}
.no{font-size:22px;opacity:.55;margin-bottom:6px}
.lhs h2{font-size:32px}
.about{display:grid;gap:14px;max-width:70ch}
.about .lead{font-size:19px;line-height:1.45}
.tools{display:grid;grid-template-columns:1fr 1fr;gap:28px}
.tool{display:grid;grid-template-columns:150px 1fr;gap:18px;text-decoration:none;align-items:start}
.thumb{position:relative;z-index:101;background:#fff;box-shadow:4px 4px 0 var(--rule);line-height:0}
.thumb img{width:100%}
.mini{display:grid;align-content:center;height:106px;padding:10px 14px;background:var(--paper);box-shadow:4px 4px 0 var(--rule)}
.mini .f{font-size:20px}.mini .v{font-size:40px}.mini .u{font-size:12px}
.t{display:block;font-size:21px;margin-bottom:4px}
.d{display:block;font-size:14px;margin-bottom:10px}
.go{text-decoration:underline;text-underline-offset:3px;font-size:14px}
.props{display:grid;grid-template-columns:repeat(3,1fr);gap:0 28px}
.props a{display:grid;grid-template-columns:44px 1fr;gap:12px;align-items:center;padding:12px 0;border-bottom:1px solid var(--line);text-decoration:none;font-size:16px}
.bar{height:12px;background:${HEAT};border:1px solid rgb(0 0 0/.25)}
.data{display:grid;grid-template-columns:3fr 2fr;gap:40px}
dl{margin:0;display:grid;grid-template-columns:1fr 1fr;gap:12px 28px}
dt{font-weight:600}dd{margin:0;font-size:14px;opacity:.85}
.k{font-weight:600;margin-bottom:10px}
.files{display:flex;flex-wrap:wrap;gap:8px}
.ft{display:flex;justify-content:space-between;gap:24px;margin:0 var(--pad);padding:20px 0 40px;border-top:2px solid var(--rule);font-size:14px}
.langs i{font-style:normal;margin:0 2px;opacity:.5}
`,
		1440
	);
}

function indexPhone() {
	return doc(
		`${phoneTop}
<main class="ix">
  <section><span class="num no">01</span><h2 class="display">Об этой таблице</h2>
    <p class="lead">${ABOUT[0]}</p><p>${ABOUT[1]}</p></section>
  <section><span class="num no">02</span><h2 class="display">Инструменты</h2>
    <a class="tool"><span class="thumb"><img src="${img('print-a4-color.png')}"></span><span><b class="display t">Таблица для печати</b><span class="d">PDF A4 и US Letter, цветной и ч/б.</span></span><span class="arr">→</span></a>
    <a class="tool"><span class="mini"><span class="display f">H<sub>2</sub>SO<sub>4</sub></span><span class="num v">98,07</span></span><span><b class="display t">Калькулятор молярной массы</b><span class="d">Формула → г/моль и решение.</span></span><span class="arr">→</span></a></section>
  <section><span class="num no">03</span><h2 class="display">Свойства элементов</h2>
    <ul class="props">${PROPS.map(([s, n]) => `<li><a><span class="bar"></span><span>${n}</span><span class="arr">→</span></a></li>`).join('')}</ul></section>
  <section><span class="num no">04</span><h2 class="display">Источники и данные</h2>
    <dl>${SOURCES.map(([s, w]) => `<div><dt>${s}</dt><dd>${w}</dd></div>`).join('')}</dl>
    <p class="files">${FILES.map((f) => `<a class="pill">${f}</a>`).join('')}</p><p class="note">${STAMP}</p></section>
</main>
<footer class="ft"><p class="langs">${LANGS.join(' <i>·</i> ')}</p><p>${LEGAL}</p></footer>`,
		`:root{--pad:16px}${CTX_CSS}
.legend{font-size:12px;gap:4px 12px}
.ix{padding:0 var(--pad)}
.ix section{display:grid;gap:12px;padding:22px 0 30px;border-top:2px solid var(--rule)}
.no{font-size:18px;opacity:.55;margin-bottom:-8px}
h2{font-size:26px}
.lead{font-size:16px}
.tool{display:grid;grid-template-columns:72px 1fr 20px;gap:14px;align-items:center;padding:6px 0;text-decoration:none}
.thumb{position:relative;z-index:101;background:#fff;box-shadow:3px 3px 0 var(--rule);line-height:0}.thumb img{width:100%}
.mini{display:grid;place-items:center;height:52px;background:var(--paper);box-shadow:3px 3px 0 var(--rule)}
.mini .f{font-size:12px}.mini .v{font-size:22px}
.t{display:block;font-size:18px}.d{display:block;font-size:13px}
.arr{font-size:18px}
.props a{display:grid;grid-template-columns:36px 1fr 20px;gap:12px;align-items:center;padding:11px 0;border-bottom:1px solid var(--line);text-decoration:none}
.bar{height:10px;background:${HEAT};border:1px solid rgb(0 0 0/.25)}
dl{margin:0;display:grid;grid-template-columns:1fr 1fr;gap:10px 16px;font-size:14px}
dt{font-weight:600}dd{margin:0;font-size:13px;opacity:.85}
.files{display:flex;gap:8px;flex-wrap:wrap;margin-top:6px}
.ft{display:grid;grid-template-columns:minmax(0,1fr);gap:12px;margin:0 var(--pad);padding:18px 0 40px;border-top:2px solid var(--rule);font-size:14px}
.langs i{font-style:normal;margin:0 2px;opacity:.5}
`,
		390
	);
}

// ======================================================================
// B. «Ячейки»: links drawn as small element cells with the science symbol as their icon.
// ======================================================================
const cell = (sym, name, cls, small = '') =>
	`<a class="cell ${cls}"><span class="z">${small}</span><span class="display s">${sym}</span><span class="n">${name}</span></a>`;
const TOOL_CELLS = cell('PDF', 'Таблица для печати', 'c-ink', 'A4 · Letter') + cell('M', 'Молярная масса', 'c-rasp', 'г/моль');
const PROP_CELLS = PROPS.map(([s, n]) => cell(s, n, 'c-paper dots')).join('');

function cellsDesk() {
	return doc(
		`${deskTop}
<main class="cl">
  <section class="band">
    <div class="grp"><p class="k">Инструменты</p><div class="row">${TOOL_CELLS}</div></div>
    <div class="grp"><p class="k">Свойства элементов — таблица по свойству и все значения</p><div class="row">${PROP_CELLS}</div></div>
  </section>
  <section class="two">
    <div><h2 class="display">Об этой таблице</h2><p class="lead">${ABOUT[0]}</p><p>${ABOUT[1]}</p></div>
    <aside class="card"><h2 class="display small">Источники данных</h2>
      <ul class="src">${SOURCES.map(([s, w]) => `<li><b>${s}</b><span>${w}</span></li>`).join('')}</ul>
      <p class="k" style="margin-top:18px">Открытые данные</p><p class="files">${FILES.map((f) => `<a class="pill">${f}</a>`).join('')}</p>
      <p class="note" style="margin-top:12px">${STAMP}</p></aside>
  </section>
</main>
<footer class="ft"><span class="langs">${LANGS.join(' <i>·</i> ')}</span><span>${LEGAL}</span></footer>`,
		`:root{--pad:48px}${CTX_CSS}
.cl{padding:0 var(--pad)}
.band{display:grid;grid-template-columns:auto 1fr;gap:40px;padding:34px 0 40px;border-top:2px solid var(--rule)}
.grp:last-child .cell{flex:1;width:auto}
.k{font-size:14px;margin-bottom:10px}
.row{display:flex;gap:6px}
.cell{position:relative;display:grid;grid-template-rows:auto 1fr auto;width:118px;height:118px;padding:7px 9px 8px;text-decoration:none;box-shadow:0 0 0 0 transparent;transition:transform .15s}
.cell .z{font-size:11px;opacity:.75}
.cell .s{font-size:38px;line-height:1;align-self:center}
.cell .n{font-size:12px;line-height:1.2}
.c-ink{background:radial-gradient(circle,rgb(255 255 255/.3) 1px,transparent 1.3px) 0 0/4px 4px,var(--ink);color:var(--paper)}
.c-rasp{background:var(--raspberry);color:var(--ink)}
.c-paper{color:var(--ink)}
.cell:first-child{box-shadow:5px 5px 0 rgb(0 0 0/.0)}
.two{display:grid;grid-template-columns:7fr 4fr;gap:64px;padding:34px 0 48px;border-top:2px solid var(--rule)}
.two h2{font-size:32px;margin-bottom:14px}
.two .lead{font-size:19px;line-height:1.45;margin-bottom:14px;max-width:62ch}
.two p{max-width:68ch}
.card{background:var(--paper);box-shadow:6px 6px 0 var(--rule);padding:22px 24px}
.small{font-size:22px !important;margin-bottom:12px}
.src li{display:grid;grid-template-columns:150px 1fr;gap:12px;padding:7px 0;border-bottom:1px solid rgb(0 0 0/.18);font-size:14px}
.files{display:flex;gap:8px;flex-wrap:wrap}
.ft{display:flex;justify-content:space-between;gap:24px;margin:0 var(--pad);padding:20px 0 40px;border-top:2px solid var(--rule);font-size:14px}
.langs i{font-style:normal;margin:0 2px;opacity:.5}
`,
		1440
	);
}

function cellsPhone() {
	return doc(
		`${phoneTop}
<main class="cl">
  <section class="band"><p class="k">Инструменты</p><div class="row two">${TOOL_CELLS}</div>
    <p class="k" style="margin-top:18px">Свойства элементов</p><div class="row three">${PROP_CELLS}</div></section>
  <section class="about"><h2 class="display">Об этой таблице</h2><p class="lead">${ABOUT[0]}</p><p>${ABOUT[1]}</p></section>
  <aside class="card"><h2 class="display">Источники данных</h2>
    <ul class="src">${SOURCES.map(([s, w]) => `<li><b>${s}</b><span>${w}</span></li>`).join('')}</ul>
    <p class="files">${FILES.map((f) => `<a class="pill">${f}</a>`).join('')}</p><p class="note" style="margin-top:10px">${STAMP}</p></aside>
</main>
<footer class="ft"><p class="langs">${LANGS.join(' <i>·</i> ')}</p><p>${LEGAL}</p></footer>`,
		`:root{--pad:16px}${CTX_CSS}
.legend{font-size:12px;gap:4px 12px}
.cl{padding:0 var(--pad)}
.band{padding:22px 0 28px;border-top:2px solid var(--rule)}
.k{font-size:13px;margin-bottom:8px}
.row{display:grid;gap:5px}.two{grid-template-columns:repeat(2,minmax(0,1fr))}.three{grid-template-columns:repeat(2,minmax(0,1fr))}.three .cell{aspect-ratio:1.6}
.cell{display:grid;grid-template-rows:auto 1fr auto;aspect-ratio:1;padding:6px 8px 7px;text-decoration:none}
.two .cell{aspect-ratio:1.6}
.cell .z{font-size:10px;opacity:.75}.cell .s{font-size:30px;line-height:1;align-self:center}.cell .n{font-size:11px;line-height:1.15}
.c-ink{background:radial-gradient(circle,rgb(255 255 255/.3) 1px,transparent 1.3px) 0 0/4px 4px,var(--ink);color:var(--paper)}
.c-rasp{background:var(--raspberry)}
.about{padding:22px 0 26px;border-top:2px solid var(--rule);display:grid;gap:10px}
h2{font-size:26px}
.lead{font-size:16px}
.card{background:var(--paper);box-shadow:5px 5px 0 var(--rule);padding:16px}
.card h2{font-size:21px;margin-bottom:8px}
.src li{display:grid;grid-template-columns:118px 1fr;gap:10px;padding:6px 0;border-bottom:1px solid rgb(0 0 0/.18);font-size:13px}
.files{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}
.ft{display:grid;grid-template-columns:minmax(0,1fr);gap:12px;margin:34px var(--pad) 0;padding:18px 0 40px;border-top:2px solid var(--rule);font-size:14px}
.langs i{font-style:normal;margin:0 2px;opacity:.5}
`,
		390
	);
}

// ======================================================================
// C. «Карточки и тёмный подвал»: three paper cards for what to do next, a black footer band.
// ======================================================================
function cardsDesk() {
	return doc(
		`${deskTop}
<main class="cd">
  <section class="cards">
    <a class="card"><span class="sheet"><img src="${img('print-a4-color.png')}"></span><b class="display t">Таблица для печати</b><span class="d">PDF A4 и US Letter, цветной и чёрно-белый.</span><span class="go">Скачать →</span></a>
    <a class="card"><span class="calc"><span class="inp">H2SO4</span><span class="res"><span class="num v">98,07</span> г/моль</span></span><b class="display t">Калькулятор молярной массы</b><span class="d">Формула → г/моль, вклад элементов и решение.</span><span class="go">Посчитать →</span></a>
    <div class="card"><span class="chips">${PROPS.map(([s, n]) => `<a class="pill"><b class="display">${s}</b>&nbsp;${n}</a>`).join('')}</span><b class="display t">Свойства элементов</b><span class="d">Таблица, окрашенная по свойству, и все значения.</span></div>
  </section>
  <section class="about"><h2 class="display">Об этой таблице</h2><p class="lead display">Таблица всех 118 элементов для школьников и студентов — с проверенными данными и короткими пояснениями.</p>
    <div class="cols"><p>${ABOUT[0]}</p><p>${ABOUT[1]}</p></div></section>
</main>
<footer class="band">
  <div class="cols4">
    <div><p class="h">ChemTable</p><a>Таблица Менделеева</a><a>Таблица для печати</a><a>Калькулятор молярной массы</a></div>
    <div><p class="h">Свойства</p>${PROPS.map(([, n]) => `<a>${n}</a>`).join('')}</div>
    <div><p class="h">Источники</p>${SOURCES.map(([s, w]) => `<span>${s} <i>— ${w}</i></span>`).join('')}</div>
    <div><p class="h">Открытые данные</p>${FILES.map((f) => `<a>${f}</a>`).join('')}<span class="note" style="margin-top:8px">${STAMP}</span></div>
  </div>
  <div class="bottom"><span class="langs">${LANGS.join(' <i>·</i> ')}</span><span>${LEGAL}</span></div>
</footer>`,
		`:root{--pad:48px}${CTX_CSS}
.cd{padding:0 var(--pad)}
.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;padding:34px 0 44px;border-top:2px solid var(--rule)}
.card{display:grid;align-content:start;gap:4px;padding:18px;background:var(--paper);box-shadow:6px 6px 0 var(--rule);text-decoration:none}
.sheet{position:relative;z-index:101;display:block;height:150px;overflow:hidden;margin-bottom:14px;background:#fff;border:1px solid rgb(0 0 0/.15)}
.sheet img{width:100%}
.calc{display:grid;gap:10px;height:150px;margin-bottom:14px;align-content:center}
.inp{border:2px solid var(--ink);border-radius:10px;padding:8px 12px;font-size:20px;background:color-mix(in srgb,#fff 35%,var(--paper))}
.res .v{font-size:52px}
.chips{display:flex;flex-wrap:wrap;gap:6px;height:150px;align-content:center;margin-bottom:14px}
.chips .pill{font-size:12px;padding:.25em .7em}.chips b{margin-right:.25em}
.t{font-size:22px}.d{font-size:14px}.go{margin-top:6px;text-decoration:underline;font-size:14px}
.about{padding:34px 0 52px;border-top:2px solid var(--rule)}
.about h2{font-size:16px;font-family:Golos;font-weight:600;margin-bottom:10px;opacity:.75}
.about .lead{font-size:34px;max-width:28ch;margin-bottom:20px}
.cols{display:grid;grid-template-columns:1fr 1fr;gap:40px;max-width:1100px}
.band{position:relative;z-index:101;background:var(--ink);color:var(--paper);padding:40px var(--pad) 36px}
.cols4{display:grid;grid-template-columns:1fr 1.2fr 1.6fr 1fr;gap:40px}
.cols4>div{display:grid;align-content:start;gap:7px;font-size:14px}
.cols4 i{font-style:normal;opacity:.65}
.h{font-family:Oswald;font-weight:600;font-size:18px;color:var(--mustard);margin-bottom:6px}
.band .note{opacity:.7}
.bottom{display:flex;justify-content:space-between;margin-top:36px;padding-top:18px;border-top:1px solid rgb(230 227 218/.3);font-size:14px}
.langs i{font-style:normal;margin:0 2px;opacity:.5}
`,
		1440
	);
}

function cardsPhone() {
	const det = (h, body, open = false) =>
		`<details${open ? ' open' : ''}><summary><span>${h}</span><span class="pm">${open ? '−' : '+'}</span></summary><div>${body}</div></details>`;
	return doc(
		`${phoneTop}
<main class="cd">
  <section class="cards">
    <a class="card row"><span class="sheet"><img src="${img('print-a4-color.png')}"></span><span><b class="display t">Таблица для печати</b><span class="d">PDF A4 и Letter, цвет и ч/б</span></span><span>→</span></a>
    <a class="card row"><span class="calc"><span class="num v">98,07</span></span><span><b class="display t">Молярная масса</b><span class="d">Калькулятор: формула → г/моль</span></span><span>→</span></a>
    <div class="card"><b class="display t">Свойства элементов</b><span class="chips">${PROPS.map(([s, n]) => `<a class="pill"><b class="display">${s}</b>&nbsp;${n}</a>`).join('')}</span></div>
  </section>
  <section class="about"><p class="lead display">Таблица всех 118 элементов для школьников и студентов — с проверенными данными и короткими пояснениями.</p><p>${ABOUT[0]}</p></section>
</main>
<footer class="band">
  ${det('Источники данных', SOURCES.map(([s, w]) => `<span>${s} <i>— ${w}</i></span>`).join(''), true)}
  ${det('Открытые данные', FILES.map((f) => `<a>${f}</a>`).join(''))}
  ${det('Язык', LANGS.join('<br>'))}
  <p class="legal">${LEGAL}</p><p class="note">${STAMP}</p>
</footer>`,
		`:root{--pad:16px}${CTX_CSS}
.legend{font-size:12px;gap:4px 12px}
.cd{padding:0 var(--pad)}
.cards{display:grid;gap:14px;padding:22px 0 30px;border-top:2px solid var(--rule)}
.card{display:grid;gap:8px;padding:14px;background:var(--paper);box-shadow:5px 5px 0 var(--rule);text-decoration:none}
.card.row{grid-template-columns:64px 1fr 16px;align-items:center;gap:14px}
.sheet{position:relative;z-index:101;display:block;background:#fff;line-height:0;border:1px solid rgb(0 0 0/.15)}.sheet img{width:100%}
.calc{display:grid;place-items:center;height:46px;border:2px solid var(--ink);border-radius:8px}.calc .v{font-size:24px}
.t{display:block;font-size:19px}.d{display:block;font-size:13px}
.chips{display:flex;flex-wrap:wrap;gap:6px}.chips .pill{font-size:12px;padding:.25em .7em}.chips b{margin-right:.25em}
.about{display:grid;gap:12px;padding:22px 0 34px;border-top:2px solid var(--rule)}
.about .lead{font-size:24px}
.band{position:relative;z-index:101;background:var(--ink);color:var(--paper);padding:10px var(--pad) 40px}
details{border-bottom:1px solid rgb(230 227 218/.3)}
summary{display:flex;justify-content:space-between;padding:15px 0;font-family:Oswald;font-weight:600;font-size:18px;color:var(--mustard);list-style:none}
details>div{display:grid;gap:8px;padding:0 0 16px;font-size:14px}
details i{font-style:normal;opacity:.65}
.legal{margin-top:20px;font-size:14px}.band .note{margin-top:6px;opacity:.7}
`,
		390
	);
}

// ---------- Write and screenshot ----------
const pages = {
	'A-index-desktop': [indexDesk(), 1440],
	'A-index-phone': [indexPhone(), 390],
	'B-cells-desktop': [cellsDesk(), 1440],
	'B-cells-phone': [cellsPhone(), 390],
	'C-cards-desktop': [cardsDesk(), 1440],
	'C-cards-phone': [cardsPhone(), 390]
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
