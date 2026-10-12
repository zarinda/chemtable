import type { Handle } from '@sveltejs/kit/hooks';
import { DEFAULT_LANG, LANG_INFO, isLang } from '#lib/i18n/langs.ts';

/** Sets <html lang> from the URL prefix, so every pre-rendered page declares its language. */
export const handle: Handle = ({ event, resolve }) => {
	const prefix = event.url.pathname.split('/')[1];
	const lang = isLang(prefix) ? prefix : DEFAULT_LANG;
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', LANG_INFO[lang].tag)
	});
};
