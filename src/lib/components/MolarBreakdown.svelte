<script lang="ts">
	import { app } from '#lib/state.svelte.ts';
	import { formatMass } from '#lib/format.ts';
	import { formatShare, formatUnits, working, type MolarMass } from '#lib/molar.ts';
	import { elementPath } from '#lib/seo.ts';
	import Formula from './Formula.svelte';

	/** What each element adds to a molar mass: a bar of shares, a row per element and the sum. */
	let { mass, formula }: { mass: MolarMass; formula: string } = $props();

	let lang = $derived(app.lang);
	let t = $derived(app.t);

	const term = (count: number, text: string) =>
		count > 1 ? `${count} × ${formatMass(text, lang)}` : formatMass(text, lang);
</script>

<div class="bar" aria-hidden="true">
	{#each mass.parts as part (part.element.z)}
		<span class="swatch cat-{part.element.category}" style:flex-grow={part.units}
			><b>{part.element.symbol}</b></span
		>
	{/each}
</div>

<ul class="rows">
	{#each mass.parts as part (part.element.z)}
		<li>
			<span class="tile swatch cat-{part.element.category}" aria-hidden="true">{part.element.symbol}</span>
			<span class="name">
				<a href={elementPath(part.element, lang)}>{part.element.name[lang]}</a>
				<small>{term(part.count, part.element.mass.text!)}</small>
			</span>
			<span class="sum">{formatUnits(part.units, part.digits, lang)}</span>
			<span class="share">{formatShare(part, mass, lang)}</span>
		</li>
	{/each}
</ul>

<p class="calc">
	M(<Formula {formula} />) = {working(mass, lang)} =
	<b>{formatUnits(mass.units, mass.digits, lang)}&nbsp;{t.molar.unit}</b>
</p>

<style>
	.bar {
		display: flex;
		gap: 3px;
		height: 34px;
		margin: 4px 0 10px;
	}

	.bar span {
		display: grid;
		place-items: center;
		min-width: 24px;
		overflow: hidden;
		font-family: var(--font-display);
		font-size: var(--step--1);
	}

	.rows {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		display: grid;
		grid-template-columns: 40px minmax(0, 1fr) auto 4.5em;
		gap: 12px;
		align-items: center;
		padding: 9px 0;
		border-bottom: 1px solid color-mix(in srgb, var(--fg) 45%, transparent);
	}

	.tile {
		display: grid;
		place-items: center;
		width: 40px;
		height: 40px;
		font-family: var(--font-display);
		font-size: 19px;
		font-weight: 600;
	}

	.name small {
		display: block;
		font-size: var(--step--1);
		font-variant-numeric: tabular-nums;
		opacity: 0.8;
	}

	.name a {
		text-decoration-thickness: 1px;
	}

	.sum {
		font-size: var(--step-1);
		font-variant-numeric: tabular-nums;
	}

	.share {
		font-size: var(--step--1);
		font-variant-numeric: tabular-nums;
		text-align: right;
		opacity: 0.85;
	}

	.calc {
		margin: 14px 0 0;
		font-variant-numeric: tabular-nums;
	}

	@media (max-width: 600px) {
		li {
			grid-template-columns: 36px minmax(0, 1fr) auto 3.8em;
			gap: 10px;
		}

		.tile {
			width: 36px;
			height: 36px;
		}
	}
</style>
