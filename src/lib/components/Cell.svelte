<script lang="ts">
	import { app, isMap } from '#lib/state.svelte.ts';
	import { propertyValue, type Element } from '#lib/elements.ts';
	import { heatColor, heatInk } from '#lib/heat.ts';
	import { formatMass, formatNumber, kelvinToCelsius } from '#lib/format.ts';
	import { elementPath } from '#lib/seo.ts';

	let { element, heat }: { element: Element; heat: number | null | undefined } = $props();

	let dimmed = $derived(app.focusCategory !== null && app.focusCategory !== element.category);
	let heatMode = $derived(app.mode !== 'category');

	let value = $derived.by(() => {
		if (app.mode === 'category') return null;
		const v = propertyValue(element, app.mode);
		if (v === null) return null;
		if (app.mode === 'mass') return element.mass.text ? formatMass(element.mass.text, app.lang) : null;
		if (app.mode === 'meltingPoint') return formatNumber(Math.round(kelvinToCelsius(v)), app.lang);
		return formatNumber(v, app.lang, app.mode === 'density' && v < 0.1 ? 5 : 2);
	});

	let name = $derived(element.name[app.lang]);

	/**
	 * Starts with the visible text in the order shown (number, symbol, caption), so
	 * voice-control users can name the cell by what they see (WCAG 2.5.3).
	 */
	let label = $derived.by(() => {
		const shown = `${element.z} ${element.symbol}`;
		if (app.mode === 'category') return `${shown} ${name}, ${app.t.category[element.category]}`;
		const property = app.t.property[app.mode];
		if (value === null) return `${shown}, ${name}, ${property}: ${app.t.noData}`;
		return `${shown} ${`${value} ${app.t.unit[app.mode]}`.trim()}, ${name}, ${property}`;
	});
</script>

<!--
	A real link to the element page, so crawlers and no-JS visitors reach it;
	a plain click opens the poster in place instead (modifier clicks still open a tab).
-->
<a
	href={elementPath(element, app.lang)}
	class="cell cat-{element.category}"
	class:swatch={!heatMode}
	class:heat={heatMode}
	class:unknown={heatMode && heat === null}
	class:dimmed
	class:picked={app.pickedZ === element.z}
	data-z={element.z}
	style:grid-column={element.col + 1}
	style:grid-row={element.row + 2}
	style:--z={element.z}
	style:--heat-fill={heatMode && heat != null ? heatColor(heat) : null}
	style:--heat-ink={heatMode && heat != null ? heatInk(heat) : null}
	tabindex={app.tabStop === element.z ? 0 : -1}
	aria-label={label}
	onpointerenter={() => (app.active = element)}
	onfocus={() => {
		app.active = element;
		app.tabStop = element.z;
		if (isMap()) app.picked = element.z;
	}}
	onclickcapture={(e) => {
		if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
		e.preventDefault();
		// On the phone map a tap picks the element for the card; Enter still opens it.
		if (isMap() && e.detail !== 0) app.picked = element.z;
		else app.open(element, e.currentTarget);
	}}
	oncontextmenu={(e) => isMap() && e.preventDefault()}
>
	<span class="z">{element.z}</span>
	<span class="symbol">{element.symbol}</span>
	<span class="caption">{heatMode ? (value ?? '—') : name}</span>
</a>

<style>
	.cell {
		container-type: size;
		position: relative;
		display: grid;
		grid-template-rows: auto 1fr auto;
		width: var(--cell);
		height: var(--cell);
		padding: 7% 9%;
		border: 0;
		cursor: pointer;
		text-align: left;
		text-decoration: none;
		animation: cell-in 0.55s var(--ease-out) backwards;
		animation-delay: calc(var(--z) * 9ms);
		transition:
			background-color 0.45s ease calc(var(--z) * 5ms),
			color 0.45s ease calc(var(--z) * 5ms),
			opacity 0.3s ease,
			transform 0.18s var(--ease-out),
			box-shadow 0.18s var(--ease-out);
	}

	/* Texture sits only behind the large symbol, so the small number and name stay on a solid fill. */
	.cell.swatch {
		background: var(--fill);
	}

	.cell.swatch::before {
		content: '';
		position: absolute;
		inset: 0;
		background: var(--texture);
		mask-image: linear-gradient(transparent 22%, #000 30%, #000 66%, transparent 74%);
	}

	.cell > span {
		position: relative;
	}

	.heat {
		background: var(--heat-fill);
		color: var(--heat-ink);
	}

	.unknown {
		background: repeating-linear-gradient(
			135deg,
			color-mix(in srgb, var(--fg) 22%, transparent) 0 1px,
			transparent 1px 5px
		);
		color: var(--fg);
		opacity: 0.55;
	}

	.dimmed {
		opacity: 0.18;
	}

	.cell:hover,
	.cell:focus-visible {
		z-index: 2;
		transform: translateY(-3px);
		box-shadow: 0 3px 0 var(--rule);
		outline: none;
	}

	.cell:focus-visible {
		box-shadow:
			0 0 0 2px var(--bg),
			0 0 0 4px var(--rule);
	}

	.z {
		font-size: max(10px, 17cqw);
		line-height: 1;
		font-variant-numeric: tabular-nums;
	}

	.symbol {
		align-self: center;
		font-family: var(--font-display);
		font-weight: 600;
		font-size: 40cqw;
		line-height: 0.9;
		letter-spacing: -0.01em;
	}

	.caption {
		overflow: hidden;
		font-size: max(9px, 14cqw);
		line-height: 1.1;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-variant-numeric: tabular-nums;
	}

	@container (max-width: 54px) {
		.caption {
			display: none;
		}
		.symbol {
			font-size: 46cqw;
		}
	}

	/* Portrait phones: a map of symbols on colour, picked by touch (see Table). */
	@media (max-width: 760px) and (orientation: portrait) {
		.cell {
			place-items: center;
			grid-template-rows: none;
			padding: 0;
			touch-action: none;
			-webkit-touch-callout: none;
		}

		.cell.swatch::before {
			background: var(--texture-sm);
			mask-image: none;
		}

		.z,
		.caption {
			display: none;
		}

		/* cqw, not var(--cell): inside the cell, --cell's own cqw would measure the cell. */
		.symbol {
			font-size: 56cqw;
			line-height: 1;
			letter-spacing: -0.02em;
		}

		.cell:hover,
		.cell:focus-visible {
			transform: none;
			box-shadow: none;
		}

		.picked,
		.cell:focus-visible {
			z-index: 2;
			outline: 2px solid var(--fg);
			outline-offset: 1px;
		}
	}

	@keyframes cell-in {
		from {
			opacity: 0;
			transform: translateY(10px) scale(0.8);
		}
	}
</style>
