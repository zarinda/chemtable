/**
 * Downloads a subset of Noto Sans SC (SIL Open Font License) covering every CJK
 * character the site uses: the Chinese UI strings and all element names, including
 * the new element characters (鿫, 鿬, 鿭, 𬬻…) that many system fonts lack.
 *
 * - static/fonts/noto-sans-sc-{400,700}.woff2: web fallback for Chinese text
 * - src/lib/server/fonts/noto-sans-sc-700.ttf: for Open Graph images (Satori reads TTF, not WOFF2)
 *
 * Run after changing Chinese text: npm run fonts
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const CJK = /[⺀-鿿豈-﫿＀-￯]|[\u{20000}-\u{3FFFF}]/gu;

const sources = [
	readFileSync(new URL('src/lib/i18n/locales/zh.ts', root), 'utf8'),
	readFileSync(new URL('src/lib/data/elements.json', root), 'utf8')
];
const text = [...new Set(sources.join('').match(CJK) ?? [])].join('');

/** Google Fonts serves WOFF2 to modern browsers and TTF to user agents it does not recognise. */
async function download(weight: number, format: 'woff2' | 'ttf') {
	const css = await (
		await fetch(
			`https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@${weight}&text=${encodeURIComponent(text)}`,
			{
				headers: {
					'User-Agent':
						format === 'woff2'
							? 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36'
							: 'Mozilla/4.0'
				}
			}
		)
	).text();
	const url = css.match(/src: url\(([^)]+)\)/)?.[1];
	if (!url) throw new Error(`No font URL for ${weight} ${format}:\n${css}`);
	return Buffer.from(await (await fetch(url)).arrayBuffer());
}

mkdirSync(new URL('static/fonts/', root), { recursive: true });
mkdirSync(new URL('src/lib/server/fonts/', root), { recursive: true });

for (const weight of [400, 700]) {
	writeFileSync(new URL(`static/fonts/noto-sans-sc-${weight}.woff2`, root), await download(weight, 'woff2'));
}
writeFileSync(new URL('src/lib/server/fonts/noto-sans-sc-700.ttf', root), await download(700, 'ttf'));

console.log(`Subset of ${[...text].length} CJK characters written.`);
