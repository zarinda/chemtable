import puppeteer from 'file:///D:/ChemTable/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js';
import { readFileSync } from 'node:fs';

const [, , variant, out, w, h, mobile] = process.argv;
const els = JSON.parse(readFileSync('D:/ChemTable/src/lib/data/elements.json', 'utf8')).elements.map(
	(e) => ({ z: e.z, s: e.symbol, m: e.meltingPoint, b: e.boilingPoint, sub: e.sublimes })
);
const b = await puppeteer.launch({
	executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
});
const p = await b.newPage();
await p.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]);
await p.setViewport({
	width: +w,
	height: +h,
	deviceScaleFactor: mobile ? 2 : 1,
	isMobile: !!mobile,
	hasTouch: !!mobile
});
await p.goto('https://chemtable.org/ru/melting-point', { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 2500));

await p.evaluate(
	(variant, els) => {
		const C = 30;
		const K = C + 273.15;
		const st = (e) => {
			if (e.m == null) return 'unknown';
			if (e.s === 'He') return K < e.b ? 'liquid' : 'gas';
			if (e.sub) return K < e.b ? 'solid' : 'gas';
			if (K < e.m) return 'solid';
			if (e.b == null) return 'unknown';
			return K < e.b ? 'liquid' : 'gas';
		};
		const WORD = { solid: 'твёрдое', liquid: 'жидкость', gas: 'газ', unknown: '—' };
		const css = document.createElement('style');
		css.textContent = `
	.cell.st { background: var(--sf) !important; color: var(--si) !important; }
	.cell.st::before { content: ''; position: absolute; inset: 0; background: var(--stx); }
	.st-solid { --sf: var(--paper); --si: var(--ink); --stx: none; }
	.st-liquid { --sf: var(--teal); --si: #fff;
		--stx: repeating-linear-gradient(0deg, rgb(255 255 255 / 0.16) 0 1.5px, transparent 1.5px 7px); }
	.st-gas { --sf: var(--raspberry); --si: #fff;
		--stx: radial-gradient(circle, rgb(255 255 255 / 0.3) 1.2px, transparent 1.6px) 0 0 / 8px 8px; }
	.sw { display:inline-block; width:22px; height:16px; vertical-align:-3px; margin-right:6px; position:relative; background: var(--sf); }
	.sw::before { content:''; position:absolute; inset:0; background: var(--stx); }
	.sw.st-solid { outline: 1px solid rgb(0 0 0 / .25); }
	.tblock { font-family: 'Golos Text', sans-serif; }
	.tbig { font-family: 'Bebas Neue', sans-serif; line-height: .9; }
	.track { position: relative; height: 10px; border-radius: 99px;
		background: linear-gradient(90deg, #3d6fb3, #8fb6d8 30%, #e6e3da 42%, #ee7430 70%, #df3b57 85%, #fff3b0); outline: 1.5px solid #000; }
	.thumb { position:absolute; top:50%; width:26px; height:26px; border-radius:50%; background: var(--paper);
		border: 2px solid #000; transform: translate(-50%, -50%); box-shadow: 2px 2px 0 #000; }
	.ticks { position: relative; height: 18px; font-size: 12px; margin-top: 8px; }
	.ticks span { position:absolute; transform: translateX(-50%); white-space: nowrap; }
	.ticks span::before { content:''; position:absolute; left:50%; top:-7px; height:5px; border-left:1.5px solid #000; }
	.presets { display:flex; gap:6px; flex-wrap: wrap; }
	.presets span { border:1.5px solid #000; border-radius:999px; padding:.3em .75em; font-size: 13px; white-space:nowrap; }
	.pm { display:inline-grid; place-items:center; width:30px; height:30px; border:1.5px solid #000; border-radius:50%; font-size:18px; flex:none; }
	`;
		document.head.append(css);

		const count = { solid: 0, liquid: 0, gas: 0, unknown: 0 };
		for (const e of els) {
			const s = st(e);
			count[s]++;
			const c = document.querySelector(`.cell[data-z="${e.z}"]`);
			if (!c) continue;
			c.classList.remove('heat', 'unknown');
			c.style.removeProperty('--heat-fill');
			c.style.removeProperty('--heat-ink');
			if (s === 'unknown') c.classList.add('heat', 'unknown');
			else c.classList.add('st', 'st-' + s);
			c.querySelector('.caption').textContent = WORD[s];
		}

		// Mode chips: a new "Агрегатное состояние" chip, on.
		const chips = [...document.querySelectorAll('.mode')];
		const melt = chips.find((a) => a.textContent.includes('плавления'));
		melt.dataset.state = 'off';
		const chip = melt.cloneNode(true);
		chip.textContent = 'Агрегатное состояние';
		chip.dataset.state = 'on';
		melt.after(chip);
		document
			.querySelectorAll('h1')
			.forEach((x) => (x.textContent = 'Агрегатное состояние химических элементов'));

		// Uneven but labelled steps, like a thermometer: ticks are evenly spaced.
		const TICKS = [-273, -200, -100, 0, 100, 500, 1000, 2000, 3000, 6000];
		const pos = (c) => {
			for (let i = 0; i < TICKS.length - 1; i++)
				if (c <= TICKS[i + 1])
					return ((i + (c - TICKS[i]) / (TICKS[i + 1] - TICKS[i])) / (TICKS.length - 1)) * 100;
			return 100;
		};
		const fmt = (n) => (n < 0 ? '−' : '') + Math.abs(n).toLocaleString('ru-RU');
		const slider = (every = 1) => `
		<div style="flex:1;min-width:0;padding:0 13px">
			<div class="track"><span class="thumb" style="left:${pos(C)}%"></span></div>
			<div class="ticks">${TICKS.map((t, i) => (i % every && i !== TICKS.length - 1 ? '' : `<span style="left:${pos(t)}%">${fmt(t)}</span>`)).join('')}</div>
		</div>`;
		const PRESETS = [
			['−89 °C', 'рекорд холода'],
			['25 °C', 'в комнате'],
			['100 °C', 'кипяток'],
			['1100 °C', 'лава'],
			['5500 °C', 'Солнце']
		];
		const presets = `<div class="presets">${PRESETS.map(([t, n]) => `<span>${t} · ${n}</span>`).join('')}</div>`;
		const swatches = (gap) => `<div style="display:flex;gap:${gap};flex-wrap:wrap;font-size:14px;align-items:center">
		<span><i class="sw st-solid"></i>Твёрдое · ${count.solid}</span>
		<span><i class="sw st-liquid"></i>Жидкость · ${count.liquid}</span>
		<span><i class="sw st-gas"></i>Газ · ${count.gas}</span>
		<span><i class="sw" style="background:repeating-linear-gradient(135deg, rgb(0 0 0 / .3) 0 1px, transparent 1px 5px)"></i>нет данных · ${count.unknown}</span></div>`;
		const note = `<p style="margin:10px 0 0;font-size:14px;line-height:1.45;max-width:70em">При 30 °C жидкие ртуть, бром, цезий и галлий — галлий тает в руке. Давление — 1 атм: при нём углерод и мышьяк не плавятся, а сразу испаряются, а гелий не твердеет. <a href="#" style="color:inherit">Все температуры списком&nbsp;↓</a></p>`;
		const readout = (size) => `<div style="display:flex;align-items:baseline;gap:10px;flex:none">
		<span class="tbig" style="font-size:${size}px">30&thinsp;°C</span><span style="font-size:14px;opacity:.75">303 K · 86 °F</span></div>`;
		const legend = document.querySelector('.scale').closest('footer');

		if (variant === 'A') {
			legend.innerHTML = `<div class="tblock" style="flex:1">
			<div style="display:flex;align-items:center;gap:14px">
				<b style="font-size:14px;flex:none">Температура</b><span class="pm">−</span>${slider()}<span class="pm">+</span>${readout(40)}</div>
			<div style="margin-top:14px">${swatches('18px')}</div>${note}</div>`;
		}
		if (variant === 'B') {
			const intro = document.querySelector('.intro');
			intro.querySelectorAll('.hint').forEach((x) => x.remove());
			intro.insertAdjacentHTML(
				'beforeend',
				`<div class="tblock" style="margin-top:14px">
			<div style="display:flex;align-items:center;gap:16px">${readout(64)}<span class="pm">−</span>${slider(3)}<span class="pm">+</span></div>
			<div style="margin-top:12px">${presets}</div></div>`
			);
			intro.style.cssText += ';width:690px;max-width:none';
			legend.innerHTML = `<div class="tblock" style="flex:1">${swatches('18px')}${note}</div>`;
		}
		if (variant === 'phone') {
			const intro = document.querySelector('.intro');
			intro.querySelectorAll('.hint').forEach((x) => x.remove());
			intro.insertAdjacentHTML(
				'beforeend',
				`<div class="tblock" style="margin-top:16px">
			<div style="display:flex;align-items:center;gap:10px">${readout(52)}</div>
			<div style="display:flex;align-items:center;gap:8px;margin-top:14px"><span class="pm">−</span>${slider(3)}<span class="pm">+</span></div>
			<div class="presets" style="flex-wrap:nowrap;overflow:hidden;margin-top:12px">${PRESETS.map(([t, n]) => `<span>${t} · ${n}</span>`).join('')}</div>
			<div style="margin-top:14px">${swatches('6px 14px')}</div></div>`
			);
			legend.innerHTML = `<div class="tblock" style="flex:1">${note}</div>`;
		}
	},
	variant,
	els
);
await new Promise((r) => setTimeout(r, 800));
await p.screenshot({ path: out, fullPage: false });
await b.close();
