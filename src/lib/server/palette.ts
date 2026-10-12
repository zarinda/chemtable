import type { Category } from '../elements';

/** Poster palette, mirrored from app.css, for renderers outside the browser (OG images, PDF). */
export const C = {
	mustard: '#e3a83a',
	paper: '#e6e3da',
	ink: '#000000',
	teal: '#126f60',
	orange: '#ee7430',
	raspberry: '#df3b57',
	green: '#1d7442',
	peach: '#f4b48a'
};

/** Fill and text colour of each category's cell. */
export const FILL: Record<Category, [fill: string, ink: string]> = {
	'alkali-metal': [C.orange, C.ink],
	'alkaline-earth-metal': [C.orange, C.ink],
	'transition-metal': [C.paper, C.ink],
	'post-transition-metal': [C.paper, C.ink],
	metalloid: [C.green, C.paper],
	nonmetal: [C.teal, C.paper],
	halogen: [C.teal, C.paper],
	'noble-gas': [C.raspberry, C.ink],
	lanthanide: [C.peach, C.ink],
	actinide: [C.ink, C.paper]
};
