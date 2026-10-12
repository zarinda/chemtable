/** Sequential scale paper → teal → ink, read on both mustard and black grounds. */
export function heatColor(t: number): string {
	return t < 0.5
		? `color-mix(in oklab, var(--teal) ${Math.round(t * 200)}%, var(--paper))`
		: `color-mix(in oklab, var(--ink) ${Math.round((t - 0.5) * 160)}%, var(--teal))`;
}

/**
 * Black or white, whichever reads better on heatColor(t); they cross at t ≈ 0.42.
 * Paper instead of white would leave mid-scale cells below 4.5:1.
 */
export function heatInk(t: number): string {
	return t < 0.42 ? 'var(--ink)' : '#fff';
}

export const HEAT_GRADIENT =
	'linear-gradient(90deg, var(--paper), var(--teal), color-mix(in oklab, var(--ink) 80%, var(--teal)))';
