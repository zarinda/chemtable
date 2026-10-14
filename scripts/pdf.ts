/**
 * Renders the printable tables into static/print/{lang}/ with the system's Chrome
 * (or Edge / Chromium): every language × A4 and US Letter × colour and black-and-white.
 * Vector PDFs with real, searchable text, and WebP previews of each sheet for the print page.
 * Rerun after changing the design, the texts or PUBLIC_SITE_URL (the domain is printed on the sheet).
 *
 * Run: npm run pdf [-- --only=en,ru] [-- --previews]   (--previews: only the images, PDFs untouched;
 * CHROME_PATH overrides the browser)
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import puppeteer from 'puppeteer-core';
import { LANGS, type Lang } from '../src/lib/i18n/langs.ts';
import {
	PAPERS,
	PAPER_MM,
	PREVIEW_WIDTHS,
	VARIANTS,
	previewPath,
	printPath
} from '../src/lib/print.ts';
import { printHtml } from '../src/lib/server/print.ts';

try {
	process.loadEnvFile('.env');
} catch {
	// No .env: the production domain, as in the site build.
}
const site = (process.env.PUBLIC_SITE_URL || 'https://chemtable.org').replace(/\/+$/, '');

const only = process.argv.find((a) => a.startsWith('--only='))?.slice(7).split(',') as Lang[] | undefined;
const previewsOnly = process.argv.includes('--previews');

/** CSS pixels per millimetre. */
const PX = 96 / 25.4;

const write = (path: string, data: Uint8Array) => {
	const file = new URL(`../static${path}`, import.meta.url);
	mkdirSync(new URL('.', file), { recursive: true });
	writeFileSync(file, data);
};

const BROWSERS = [
	'C:/Program Files/Google/Chrome/Application/chrome.exe',
	'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
	'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
	'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
	'/usr/bin/google-chrome',
	'/usr/bin/chromium',
	'/usr/bin/chromium-browser'
];
const executablePath = process.env.CHROME_PATH ?? BROWSERS.find((p) => existsSync(p));
if (!executablePath) throw new Error('No Chrome found: set CHROME_PATH to a Chrome, Edge or Chromium binary.');

const browser = await puppeteer.launch({ executablePath, headless: true });
const page = await browser.newPage();
const started = performance.now();
let pdfs = 0;
let images = 0;

for (const lang of only ?? LANGS) {
	for (const paper of PAPERS) {
		for (const variant of VARIANTS) {
			await page.setContent(printHtml(lang, paper, variant, site), { waitUntil: 'load' });
			const squeezed = await page.evaluate(async () => {
				// tsx wraps named functions in __name(), which the page doesn't have.
				(globalThis as { __name?: unknown }).__name ??= (f: unknown) => f;
				await document.fonts.ready;
				const squeezed: string[] = [];
				// scrollWidth rounds to whole pixels and misses text a fraction of a pixel too wide,
				// which still loses half a glyph in print: compare the text's own box, with a margin.
				const overflows = (el: HTMLElement) => {
					const range = document.createRange();
					range.selectNodeContents(el);
					return range.getBoundingClientRect().right > el.getBoundingClientRect().right - 0.5;
				};
				// Shrink long names, masses and shell lists until they fit their cell.
				for (const el of document.querySelectorAll<HTMLElement>('.fit')) {
					let size = parseFloat(getComputedStyle(el).fontSize);
					while (overflows(el) && size > 3.5) {
						size -= 0.2;
						el.style.fontSize = `${size}px`;
					}
					// Below 3.5 px print gets illegible: tighten the letters instead, then narrow them.
					let spacing = parseFloat(getComputedStyle(el).letterSpacing) / size || 0;
					while (overflows(el) && spacing > -0.06) {
						spacing -= 0.01;
						el.style.letterSpacing = `${spacing}em`;
					}
					if (overflows(el)) {
						el.style.transformOrigin = 'left';
						const range = document.createRange();
						range.selectNodeContents(el);
						const box = el.getBoundingClientRect();
						el.style.transform = `scaleX(${(box.width - 0.5) / (range.getBoundingClientRect().right - box.left)})`;
						el.style.overflow = 'visible';
						squeezed.push(el.textContent ?? '');
					}
				}
				return squeezed;
			});
			if (squeezed.length) console.log(`${lang} ${paper} ${variant}: narrowed ${squeezed.join(', ')}`);
			if (!previewsOnly) {
				write(printPath(lang, paper, variant), await page.pdf({ preferCSSPageSize: true, printBackground: true }));
				pdfs++;
			}
			const width = PAPER_MM[paper].width * PX;
			const height = PAPER_MM[paper].height * PX;
			for (const pixels of PREVIEW_WIDTHS) {
				await page.setViewport({
					width: Math.ceil(width),
					height: Math.ceil(height),
					deviceScaleFactor: pixels / width
				});
				const image = await page.screenshot({ type: 'webp', quality: 82, clip: { x: 0, y: 0, width, height } });
				write(previewPath(lang, paper, variant, pixels), image);
				images++;
			}
		}
	}
}

await browser.close();
console.log(
	`Rendered ${pdfs} PDFs and ${images} previews in ${((performance.now() - started) / 1000).toFixed(1)}s.`
);
