<script lang="ts">
	import { ToggleGroup } from 'bits-ui';
	import { app } from '#lib/state.svelte.ts';
	import {
		elements,
		propertyScale,
		propertyValue,
		sources,
		type Element,
		type PropertyKey
	} from '#lib/elements.ts';
	import { heatColor, heatInk } from '#lib/heat.ts';
	import { formatMass, formatNumber, kelvinToCelsius } from '#lib/format.ts';
	import { elementPath } from '#lib/seo.ts';
	import { LANG_INFO } from '#lib/i18n/langs.ts';

	/**
	 * Every value of one property, server-rendered from the highest down: the list a search for
	 * "electronegativity chart" is after. Elements without a value are named, not ranked.
	 */
	let { property: key }: { property: PropertyKey } = $props();

	let lang = $derived(app.lang);
	let t = $derived(app.t);
	let p = $derived(t.propertyPage);
	let scale = $derived(propertyScale(key));

	const ORDERS = ['desc', 'asc', 'z'] as const;
	type Order = (typeof ORDERS)[number];
	let order = $state<Order>('desc');

	const PUBCHEM = { name: 'PubChem (NIH)', url: 'https://pubchem.ncbi.nlm.nih.gov/periodic-table/' };
	const SOURCES: Record<PropertyKey, { name: string; url: string }[]> = {
		mass: [{ name: 'IUPAC CIAAW', url: sources.atomicWeights }, PUBCHEM],
		electronegativity: [PUBCHEM],
		atomicRadius: [{ name: 'Cordero et al. (2008)', url: sources.covalentRadii }],
		density: [PUBCHEM],
		meltingPoint: [PUBCHEM],
		ionizationEnergy: [{ name: 'NIST Atomic Spectra Database', url: sources.ionizationEnergies }]
	};

	let missing = $derived(elements.filter((e) => propertyValue(e, key) === null));
	let rows = $derived.by(() => {
		const v = (e: Element) => propertyValue(e, key) ?? 0;
		const known = elements.filter((e) => propertyValue(e, key) !== null);
		if (order === 'desc') known.sort((a, b) => v(b) - v(a) || a.z - b.z);
		if (order === 'asc') known.sort((a, b) => v(a) - v(b) || a.z - b.z);
		return known;
	});

	/** The number as the poster shows it, the unit, and a note such as "under pressure". */
	function shown(e: Element): { value: string; unit: string; note: string } {
		const v = propertyValue(e, key) ?? 0;
		switch (key) {
			case 'mass':
				return { value: formatMass(e.mass.text ?? '', lang), unit: '', note: '' };
			case 'meltingPoint':
				return {
					value: formatNumber(kelvinToCelsius(v), lang, 2),
					unit: t.unit.meltingPoint,
					note: `${formatNumber(v, lang, 2)} K${e.meltsUnderPressure ? `, ${t.underPressure}` : ''}`
				};
			case 'density':
				return { value: formatNumber(v, lang, v < 0.1 ? 6 : 3), unit: t.unit.density, note: '' };
			case 'electronegativity':
				// Pauling values are quoted to two decimals; a list of 2.2, 2 and 2.96 reads as uneven.
				return {
					value: v.toLocaleString(LANG_INFO[lang].tag, { minimumFractionDigits: 2 }),
					unit: '',
					note: ''
				};
			case 'atomicRadius':
				return { value: formatNumber(v, lang, 0), unit: t.unit.atomicRadius, note: '' };
			case 'ionizationEnergy':
				return { value: formatNumber(v, lang, 3), unit: t.unit.ionizationEnergy, note: '' };
		}
	}

	/** A plain click opens the poster over the list, growing from the row's tile, as in the table. */
	function open(event: MouseEvent, e: Element) {
		if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
		event.preventDefault();
		const tile = (event.currentTarget as HTMLElement).querySelector<HTMLElement>('.tile');
		app.open(e, tile ?? (event.currentTarget as HTMLElement));
	}
</script>

<section class="values" id="values" aria-labelledby="values-heading">
	<h2 id="values-heading">{p.list[key]}</h2>
	<!-- How the property changes across the table is already said under the colour scale. -->
	<p class="lead">{t.explain[key]}</p>
	<p class="source">
		{p.source}:
		{#each SOURCES[key] as s, i (s.url)}{i ? ', ' : ''}<a href={s.url}>{s.name}</a>{/each}
	</p>

	<ToggleGroup.Root
		type="single"
		class="order"
		aria-label={p.sortBy}
		bind:value={() => order, (v) => v && (order = v as Order)}
	>
		{#each ORDERS as o (o)}
			<ToggleGroup.Item value={o} class="sort">{p.sort[o]}</ToggleGroup.Item>
		{/each}
	</ToggleGroup.Root>

	<ol class="list">
		{#each rows as e, i (e.z)}
			{@const s = scale.get(e.z) ?? 0}
			{@const v = shown(e)}
			<li>
				<span class="rank" aria-hidden={order === 'z'}>{order === 'z' ? e.z : i + 1}</span>
				<a class="element" href={elementPath(e, lang)} onclick={(event) => open(event, e)}>
					<span class="tile" style:background={heatColor(s)} style:color={heatInk(s)} aria-hidden="true"
						>{e.symbol}</span
					>
					<span class="name">{e.name[lang]}</span>
				</a>
				<span class="value">
					<span class="number">{v.value}</span>{#if v.unit}<span class="unit">{v.unit}</span>{/if}
					{#if v.note}<span class="note">{v.note}</span>{/if}
				</span>
				<span class="bar" aria-hidden="true"><i style:width="{Math.max(s, 0.01) * 100}%"></i></span>
			</li>
		{/each}
	</ol>

	{#if missing.length}
		<h3>{p.missing}</h3>
		<p class="missing">
			{#each missing as e, i (e.z)}{i ? ', ' : ''}<a href={elementPath(e, lang)}>{e.name[lang]} ({e.symbol})</a
				>{/each}
		</p>
	{/if}
	{#if key === 'mass'}
		<p class="footnote">[ ] — {t.massIsotope}</p>
	{/if}
</section>

<style>
	.values {
		max-width: 1200px;
		margin: 0 auto;
		padding: 40px var(--gutter) 24px;
		font-size: var(--step--1);
	}

	h2 {
		margin: 0 0 0.6em;
		font-family: var(--font-display);
		font-weight: 600;
		font-size: var(--step-2);
		line-height: 1.1;
	}

	h3 {
		margin: 32px 0 0.4em;
		font-family: var(--font-display);
		font-weight: 600;
		font-size: var(--step-1);
	}

	.lead,
	.missing {
		max-width: 68ch;
	}

	.lead {
		margin: 0;
		font-size: var(--step-0);
	}

	.source {
		margin: 10px 0 20px;
	}

	.values :global(.order) {
		display: inline-flex;
		flex-wrap: wrap;
		gap: 4px;
		margin-bottom: 8px;
	}

	.values :global(.sort) {
		padding: 0.35em 0.8em;
		border: 1.5px solid var(--rule);
		border-radius: 999px;
		background: transparent;
		cursor: pointer;
		font-size: var(--step--1);
		white-space: nowrap;
	}

	.values :global(.sort:hover) {
		background: color-mix(in srgb, var(--fg) 10%, transparent);
	}

	.values :global(.sort[data-state='on']) {
		background: var(--fg);
		color: var(--bg);
	}

	/* Three columns on wide screens; the list reads down each column. */
	.list {
		columns: 3 300px;
		column-gap: 40px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		display: grid;
		grid-template-columns: 2.2em minmax(0, 1fr) auto;
		grid-template-areas:
			'rank element value'
			'rank bar bar';
		align-items: center;
		column-gap: 10px;
		row-gap: 4px;
		padding: 7px 0;
		border-bottom: 1px solid color-mix(in srgb, var(--fg) 30%, transparent);
		break-inside: avoid;
	}

	.rank {
		grid-area: rank;
		text-align: right;
		font-variant-numeric: tabular-nums;
		opacity: 0.7;
	}

	.element {
		grid-area: element;
		display: flex;
		align-items: center;
		gap: 10px;
		min-width: 0;
		color: inherit;
		text-decoration: none;
	}

	.element:hover .name {
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.tile {
		display: grid;
		flex: none;
		place-items: center;
		width: 34px;
		height: 34px;
		font-family: var(--font-display);
		font-weight: 600;
		font-size: 16px;
		line-height: 1;
	}

	.name {
		overflow: hidden;
		font-size: var(--step-0);
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.value {
		grid-area: value;
		text-align: right;
		white-space: nowrap;
	}

	.number {
		font-family: var(--font-numeral);
		font-size: var(--step-1);
		line-height: 1;
	}

	.unit {
		margin-left: 0.3em;
	}

	.note {
		display: block;
		font-size: var(--step--2);
		opacity: 0.75;
	}

	.bar {
		grid-area: bar;
		height: 3px;
		background: color-mix(in srgb, var(--fg) 12%, transparent);
	}

	.bar i {
		display: block;
		height: 100%;
		background: var(--fg);
	}

	.footnote {
		margin-top: 16px;
		opacity: 0.8;
	}
</style>
