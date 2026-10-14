import { defineParams } from '@sveltejs/kit/params';
import { DEFAULT_LANG, isLang } from '#lib/i18n/langs.ts';
import { byPropertySlug, bySlug } from '#lib/elements.ts';
import { byCompoundSlug } from '#lib/compounds.ts';

export const params = defineParams({
	/** Language prefix: every supported language except the default, which lives at the root. */
	lang: (param) => (isLang(param) && param !== DEFAULT_LANG ? param : undefined),
	/** Element slug. Matching only real names keeps /ru (Russian) from being read as an element. */
	element: (param) => (bySlug.has(param) ? param : undefined),
	/** Property page slug: /electronegativity. */
	property: (param) => (byPropertySlug.has(param) ? param : undefined),
	/** Substance with a molar mass page: /molar-mass/water. */
	compound: (param) => (byCompoundSlug.has(param) ? param : undefined)
});
