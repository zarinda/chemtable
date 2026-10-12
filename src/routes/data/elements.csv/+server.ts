import { elements } from '#lib/elements.ts';
import { absolute, elementPath } from '#lib/seo.ts';
import { facts } from '#lib/server/describe.ts';
import type { RequestHandler } from './$types';

export const prerender = true;

const cell = (v: unknown) => {
	const s = v === null || v === undefined ? '' : String(v);
	return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export const GET: RequestHandler = () => {
	const rows = elements.map((e) => ({ Name: e.name.en, ...facts(e), URL: absolute(elementPath(e, 'en')) }));
	const header = Object.keys(rows[0]);
	const csv = [header, ...rows.map((r) => Object.values(r))].map((r) => r.map(cell).join(',')).join('\n');
	return new Response(csv + '\n', { headers: { 'Content-Type': 'text/csv; charset=utf-8' } });
};
