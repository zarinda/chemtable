/**
 * Renders Open Graph images into static/og/{lang}/{slug|home}.png.
 * Only missing images are rendered; pass --force after changing the design or texts.
 *
 * Run: npm run og [-- --force] [-- --only=en]
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { elements } from '../src/lib/elements.ts';
import { LANGS, type Lang } from '../src/lib/i18n/langs.ts';
import { renderOg } from '../src/lib/server/og.ts';

const force = process.argv.includes('--force');
const only = process.argv.find((a) => a.startsWith('--only='))?.slice(7).split(',') as Lang[] | undefined;
const root = new URL('../static/og/', import.meta.url);

const jobs = (only ?? LANGS).flatMap((lang) =>
	[null, ...elements].map((e) => ({ lang, element: e, file: new URL(`${lang}/${e ? e.slug : 'home'}.png`, root) }))
);
const todo = force ? jobs : jobs.filter((j) => !existsSync(j.file));

const started = performance.now();
for (const [i, job] of todo.entries()) {
	mkdirSync(new URL('.', job.file), { recursive: true });
	writeFileSync(job.file, await renderOg(job.lang, job.element));
	if ((i + 1) % 50 === 0) console.log(`${i + 1}/${todo.length}`);
}
const seconds = ((performance.now() - started) / 1000).toFixed(1);
console.log(`Rendered ${todo.length} of ${jobs.length} images in ${seconds}s.`);
