<script lang="ts">
	import { page } from '$app/state';
	import { app } from '#lib/state.svelte.ts';
	import { formatMass, formatNumber, kelvinToCelsius } from '#lib/format.ts';
	import { propertyValue } from '#lib/elements.ts';
	import Shells from './Shells.svelte';

	let e = $derived(app.active);
	let t = $derived(app.t);

	let reading = $derived.by(() => {
		if (!e || app.mode === 'category' || app.mode === 'mass') return null;
		const v = propertyValue(e, app.mode);
		const shown =
			v === null
				? t.noData
				: `${formatNumber(app.mode === 'meltingPoint' ? kelvinToCelsius(v) : v, app.lang, 5)} ${t.unit[app.mode]}`;
		return `${t.property[app.mode]}: ${shown}`;
	});
</script>

<div class="spotlight">
	{#if e}
		{#key e.z}
			<!-- Repeats the focused cell's label, so screen readers skip it. -->
			<div class="atom cat-{e.category}" aria-hidden="true">
				<div class="disc swatch">
					<span class="symbol">{e.symbol}</span>
				</div>
				<div class="rings">
					<Shells shells={e.shells} size={168} label="{t.shells}: {e.shells.join(', ')}" />
				</div>
			</div>
			<div class="text" aria-hidden="true">
				<p class="number">{e.z}</p>
				<p class="name">{e.name[app.lang]}</p>
				<p class="meta">
					{t.category[e.category]}<br />
					{t.atomicMass}: {e.mass.text ? formatMass(e.mass.text, app.lang) : t.noData}
					{#if reading}<br />{reading}{/if}
				</p>
			</div>
		{/key}
	{/if}
	<!-- The page heading stays in the document while an element is previewed. -->
	<div class="intro" class:visually-hidden={!!e}>
		<!-- On element pages the element name is the page heading, so the title is not an h1. -->
		<svelte:element this={page.data.z ? 'p' : 'h1'} class="title">{t.title}</svelte:element>
		<p class="hint">{t.hint}</p>
	</div>
</div>

<style>
	.spotlight {
		grid-column: 4 / 14;
		grid-row: 2 / 5;
		display: flex;
		align-items: center;
		gap: calc(var(--cell) * 0.4);
		padding: 0 calc(var(--cell) * 0.3);
		min-width: 0;
		pointer-events: none;
	}

	.intro {
		max-width: calc(var(--cell) * 8);
	}

	.title {
		margin: 0 0 0.35em;
		font-family: var(--font-display);
		font-weight: 600;
		font-size: calc(var(--cell) * 0.5);
		line-height: 1;
		letter-spacing: -0.01em;
		text-wrap: balance;
	}

	.hint {
		margin: 0;
		font-size: clamp(var(--step--2), calc(var(--cell) * 0.2), var(--step-0));
		max-width: 46ch;
	}

	.atom {
		position: relative;
		flex: none;
		width: calc(var(--cell) * 2.6);
		aspect-ratio: 1;
		animation: pop 0.35s var(--ease-out) both;
	}

	.disc {
		position: absolute;
		inset: 33%;
		display: grid;
		place-items: center;
		border-radius: 50%;
	}

	.symbol {
		font-family: var(--font-display);
		font-weight: 600;
		font-size: calc(var(--cell) * 0.42);
		line-height: 1;
	}

	.rings,
	.rings :global(svg) {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.text {
		min-width: 0;
		animation: slide 0.35s var(--ease-out) both;
	}

	.number {
		margin: 0;
		font-family: var(--font-numeral);
		font-size: calc(var(--cell) * 0.9);
		line-height: 0.85;
	}

	.name {
		margin: 0.1em 0 0.25em;
		font-family: var(--font-display);
		font-weight: 600;
		font-size: calc(var(--cell) * 0.5);
		line-height: 1;
	}

	.meta {
		margin: 0;
		font-size: clamp(var(--step--2), calc(var(--cell) * 0.19), var(--step-0));
		font-variant-numeric: tabular-nums;
	}

	@keyframes pop {
		from {
			opacity: 0;
			transform: scale(0.9);
		}
	}

	@keyframes slide {
		from {
			opacity: 0;
			transform: translateX(-8px);
		}
	}
</style>
