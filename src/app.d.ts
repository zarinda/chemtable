// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { Lang } from '#lib/i18n/langs.ts';

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			/** Language of the page, taken from the URL prefix. */
			lang: Lang;
			/** Element of an element page (/iron), null on the home page. */
			z: number | null;
		}
		interface PageState {
			/** Element whose poster is open; null when it was closed on an element URL. */
			z?: number | null;
			/** True when the poster was opened from the table, so closing can go Back. */
			fromApp?: boolean;
		}
		// interface Platform {}
	}
}

export {};
