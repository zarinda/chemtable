/**
 * Collects the licence texts of everything the site ships to browsers: the npm packages
 * bundled into the JavaScript and CSS, and the fonts. MIT, Apache and OFL all ask for their
 * notice to travel with copies, and minified bundles drop it.
 *
 * - static/third-party-licenses.txt, linked from the site footer
 *
 * Run after adding or updating dependencies: npm run licenses
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));

type Pkg = { name: string; version: string; license: string; text: string };

/** Node's lookup: node_modules next to the requiring package, then each parent directory. */
function resolve(name: string, from: string): string | null {
	for (let dir = from; ; dir = dirname(dir)) {
		const candidate = join(dir, 'node_modules', name);
		if (existsSync(join(candidate, 'package.json'))) return candidate;
		if (dirname(dir) === dir) return null;
	}
}

function licenseText(dir: string) {
	const file = readdirSync(dir).find((f) => /^licen[cs]e/i.test(f));
	return file ? readFileSync(join(dir, file), 'utf8').trim() : '';
}

const found = new Map<string, Pkg>();

function walk(name: string, from: string) {
	const dir = resolve(name, from);
	if (!dir) return;
	const json = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8'));
	const key = `${json.name}@${json.version}`;
	if (found.has(key)) return;
	found.set(key, { name: json.name, version: json.version, license: json.license ?? 'see text', text: licenseText(dir) });
	for (const dep of Object.keys(json.dependencies ?? {})) walk(dep, dir);
}

const own = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
// Svelte and the SvelteKit client runtime end up in the bundle although they are dev dependencies.
for (const name of [...Object.keys(own.dependencies), 'svelte', '@sveltejs/kit']) walk(name, root);

const packages = [...found.values()].sort((a, b) => a.name.localeCompare(b.name));
const rule = '-'.repeat(72);

const body = [
	'ChemTable (https://github.com/zarinda/chemtable) is MIT-licensed. It includes the following',
	'third-party software and fonts, each under its own licence.',
	'',
	rule,
	'Noto Sans SC (subset in /fonts/noto-sans-sc-*.woff2), SIL Open Font License 1.1',
	rule,
	readFileSync(join(root, 'static/fonts/OFL.txt'), 'utf8').trim(),
	...packages.flatMap((p) => ['', rule, `${p.name} ${p.version}, ${p.license}`, rule, p.text || `Licence: ${p.license}`])
].join('\n');

writeFileSync(join(root, 'static/third-party-licenses.txt'), body + '\n');
console.log(`${packages.length} packages and 1 font written to static/third-party-licenses.txt.`);
