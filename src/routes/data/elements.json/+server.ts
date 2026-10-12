import { elements, fetchedAt, sources } from '#lib/elements.ts';
import { LANGS } from '#lib/i18n/langs.ts';
import { absolute, elementPath, DATA_LICENSE } from '#lib/seo.ts';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = () =>
	new Response(
		JSON.stringify(
			{
				description:
					'Properties of all 118 chemical elements. Temperatures in kelvin, density in g/cm³, radius (van der Waals) in pm, energies in eV. Mass values in square brackets are mass numbers of the most stable isotope.',
				updated: fetchedAt,
				license: DATA_LICENSE,
				sources,
				elements: elements.map((e) => ({
					...e,
					url: Object.fromEntries(LANGS.map((l) => [l, absolute(elementPath(e, l))]))
				}))
			},
			null,
			'\t'
		),
		{ headers: { 'Content-Type': 'application/json; charset=utf-8' } }
	);
