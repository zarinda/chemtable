import { goto } from '$app/navigation';
import { page } from '$app/state';
import { UI } from './i18n/ui';
import { DEFAULT_LANG, type Lang } from './i18n/langs';
import { elements, type Category, type Element, type PropertyKey } from './elements';
import { elementPath, homePath } from './seo';

export type Theme = 'system' | 'light' | 'dark';
export type Mode = 'category' | PropertyKey;

function stored<T extends string>(key: string, fallback: T, allowed: readonly T[]): T {
	try {
		const v = localStorage.getItem(key) as T | null;
		return v && allowed.includes(v) ? v : fallback;
	} catch {
		return fallback;
	}
}

function store(key: string, value: string) {
	try {
		localStorage.setItem(key, value);
	} catch {
		// Storage can be blocked; the choice then lasts for this visit only.
	}
}

/** Shallow navigation: the URL and page.state change, the page does not reload. */
const shallow = (url: string, state: App.PageState, replace = false) =>
	goto(url, { state, shallow: true, replace });

/**
 * Portrait phones show the whole table as a map: a tap picks an element for the card under it
 * instead of opening the poster. Keep in step with the same media query in the components' CSS.
 */
export const MAP_QUERY = '(max-width: 760px) and (orientation: portrait)';
export const isMap = () => matchMedia(MAP_QUERY).matches;

export const cellOf = (z: number) => document.querySelector<HTMLElement>(`.cell[data-z="${z}"]`);

class AppState {
	theme = $state<Theme>('system');
	/** Colouring chosen with the buttons on the home page. */
	#mode = $state<Mode>('category');
	/** Category highlighted from the legend; others are dimmed. */
	focusCategory = $state<Category | null>(null);
	/** Element under the pointer or keyboard focus. */
	active = $state<Element | null>(null);
	/** Element picked on the phone map; until then the card shows the open element, else hydrogen. */
	picked = $state<number | null>(null);
	/** The one cell reachable with Tab; arrow keys move it. */
	tabStop = $state(1);
	/** Screen rectangle of the cell the poster grows from. */
	origin = $state<DOMRect | null>(null);

	/** The language is part of the URL (/ru/iron), so pages can be indexed per language. */
	get lang(): Lang {
		return page.data.lang ?? DEFAULT_LANG;
	}

	get t() {
		return UI[this.lang];
	}

	/** A property page always shows its own property; elsewhere the visitor's choice. */
	get mode(): Mode {
		return page.data.property ?? this.#mode;
	}

	set mode(mode: Mode) {
		this.#mode = mode;
	}

	/** Element open in the poster: from shallow routing, else the element page itself. */
	get openedZ(): number | null {
		return page.state.z !== undefined ? page.state.z : page.data.z;
	}

	get pickedZ(): number {
		return this.picked ?? this.openedZ ?? 1;
	}

	restore() {
		this.theme = stored('theme', 'system', ['system', 'light', 'dark']);
	}

	cycleTheme() {
		const order: Theme[] = ['system', 'light', 'dark'];
		this.theme = order[(order.indexOf(this.theme) + 1) % order.length];
		store('theme', this.theme);
	}

	/** The poster lives in the URL (/iron), so it can be shared and survives Back. */
	open(element: Element, from: HTMLElement) {
		this.origin = from.getBoundingClientRect();
		shallow(elementPath(element, this.lang), { z: element.z, fromApp: true });
	}

	step(z: number) {
		const next = elements[z - 1];
		if (!next) return;
		const cell = cellOf(z);
		if (cell) this.origin = cell.getBoundingClientRect();
		shallow(elementPath(next, this.lang), { z, fromApp: page.state.fromApp ?? false }, true);
	}

	close() {
		if (page.state.fromApp) history.back();
		else shallow(homePath(this.lang), { z: null }, true);
	}

	focusCell(z: number) {
		this.tabStop = z;
		cellOf(z)?.focus();
	}
}

export const app = new AppState();
