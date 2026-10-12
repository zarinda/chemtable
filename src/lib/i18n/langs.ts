/**
 * Supported languages. English lives at the site root (/iron), every other
 * language under its prefix (/ru/iron). To add a language: add it here, add a
 * locale file in ./locales, then run `npm run data` for element names.
 */
export const LANGS = ['en', 'ru', 'fr', 'de', 'it', 'es', 'zh', 'pt'] as const;
export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = 'en';

export const LANG_INFO: Record<
	Lang,
	{
		/** Name of the language in itself, for the language menu. */
		native: string;
		/** BCP 47 tag for hreflang, <html lang> and Intl formatting. */
		tag: string;
		/** Open Graph locale. */
		og: string;
		/** Wikidata label language and Wikipedia edition. */
		wikidata: string;
		wikipedia: string;
	}
> = {
	en: { native: 'English', tag: 'en', og: 'en_US', wikidata: 'en', wikipedia: 'en' },
	ru: { native: 'Русский', tag: 'ru', og: 'ru_RU', wikidata: 'ru', wikipedia: 'ru' },
	fr: { native: 'Français', tag: 'fr', og: 'fr_FR', wikidata: 'fr', wikipedia: 'fr' },
	de: { native: 'Deutsch', tag: 'de', og: 'de_DE', wikidata: 'de', wikipedia: 'de' },
	it: { native: 'Italiano', tag: 'it', og: 'it_IT', wikidata: 'it', wikipedia: 'it' },
	es: { native: 'Español', tag: 'es', og: 'es_ES', wikidata: 'es', wikipedia: 'es' },
	zh: { native: '简体中文', tag: 'zh-Hans', og: 'zh_CN', wikidata: 'zh-hans', wikipedia: 'zh' },
	pt: { native: 'Português', tag: 'pt-BR', og: 'pt_BR', wikidata: 'pt-br', wikipedia: 'pt' }
};

export const isLang = (value: string | undefined): value is Lang =>
	!!value && (LANGS as readonly string[]).includes(value);

/** Prefixes a root-relative path with the language segment: localize('/iron', 'ru') → '/ru/iron'. */
export function localize(path: string, lang: Lang): string {
	if (lang === DEFAULT_LANG) return path;
	return path === '/' ? `/${lang}` : `/${lang}${path}`;
}
