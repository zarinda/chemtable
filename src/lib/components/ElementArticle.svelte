<script lang="ts">
	import { app } from '#lib/state.svelte.ts';
	import { elements, type Element } from '#lib/elements.ts';
	import { formatConfig, formatMass, formatNames, formatNumber, kelvinToCelsius } from '#lib/format.ts';
	import { elementPath, homePath, summaryFacts } from '#lib/seo.ts';

	/**
	 * Server-rendered description of one element, below the table. It is what
	 * search engines and AI crawlers read, and what visitors see when they scroll.
	 */
	let { element: e }: { element: Element } = $props();

	let lang = $derived(app.lang);
	let t = $derived(app.t);

	const celsius = (k: number | null, note = false, noteText = '') =>
		k === null
			? t.noData
			: `${formatNumber(kelvinToCelsius(k), lang, 1)} °C (${formatNumber(k, lang, 2)} K)` +
				(note ? `, ${noteText}` : '');
	const num = (v: number | null, unit: string, digits = 3) =>
		v === null ? t.noData : `${formatNumber(v, lang, digits)} ${unit}`;
	const affinity = (v: number | 'unstable' | null) =>
		v === 'unstable' ? t.anionUnstable : num(v, t.unit.ionizationEnergy);

	let rows = $derived([
		[t.atomicMass, e.mass.text ? `${formatMass(e.mass.text, lang)}${e.mass.source !== 'ciaaw' ? ` (${t.massIsotope})` : ''}` : t.noData],
		[t.group, e.group?.toString() ?? '—'],
		[t.period, e.period.toString()],
		[t.block, e.block],
		[t.config, formatConfig(e.config) + (e.configPredicted ? ` (${t.predicted})` : '')],
		[t.shells, e.shells.join(', ')],
		[t.property.meltingPoint, celsius(e.meltingPoint, e.meltsUnderPressure, t.underPressure)],
		[t.boilingPoint, celsius(e.boilingPoint, e.sublimes, t.sublimes)],
		[t.property.density, num(e.density, t.unit.density, e.density !== null && e.density < 0.1 ? 6 : 3)],
		[t.property.electronegativity, num(e.electronegativity, t.unit.electronegativity, 2)],
		[t.property.ionizationEnergy, num(e.ionizationEnergy, t.unit.ionizationEnergy)],
		[t.electronAffinity, affinity(e.electronAffinity)],
		[t.property.atomicRadius, num(e.atomicRadius, t.unit.atomicRadius, 0)],
		[t.oxidationStates, e.oxidationStates.length ? e.oxidationStates.join(', ') : t.noData],
		[t.discovered, e.yearDiscovered === 'ancient' ? t.ancient : (e.yearDiscovered?.toString() ?? t.noData)],
		...(e.discoveredBy.length ? [[t.discoveredBy, formatNames(e.discoveredBy, lang)]] : []),
		...(e.namedAfter.length ? [[t.namedAfter, formatNames(e.namedAfter, lang)]] : [])
	]);

	let prev = $derived(elements[e.z - 2]);
	let next = $derived(elements[e.z]);
	let groupMates = $derived(
		e.group ? elements.filter((x) => x.group === e.group && x.z !== e.z) : []
	);
	let periodMates = $derived(elements.filter((x) => x.period === e.period && x.z !== e.z));
</script>

<article class="article">
	<header>
		<p class="kicker">{t.article.kicker(e.z)}</p>
		<h1>{e.name[lang]} ({e.symbol})</h1>
	</header>

	<p class="summary">{t.article.summary(summaryFacts(e, lang))}</p>

	<h2>{t.article.properties}</h2>
	<table>
		<thead>
			<tr>
				<th scope="col">{t.article.property}</th>
				<th scope="col">{t.article.value}</th>
			</tr>
		</thead>
		<tbody>
			{#each rows as [label, value] (label)}
				<tr>
					<th scope="row">{label}</th>
					<td>{value}</td>
				</tr>
			{/each}
		</tbody>
	</table>

	<h2>{t.article.related}</h2>
	<nav class="related" aria-label={t.article.related}>
		<p class="pager">
			{#if prev}
				<a href={elementPath(prev, lang)} rel="prev">{t.article.previous}: {prev.name[lang]} ({prev.symbol})</a>
			{/if}
			{#if next}
				<a href={elementPath(next, lang)} rel="next">{t.article.next}: {next.name[lang]} ({next.symbol})</a>
			{/if}
		</p>
		{#if groupMates.length}
			<h3>{t.article.sameGroup(e.group!)}</h3>
			<ul>
				{#each groupMates as x (x.z)}
					<li><a href={elementPath(x, lang)}>{x.name[lang]} ({x.symbol})</a></li>
				{/each}
			</ul>
		{/if}
		<h3>{t.article.samePeriod(e.period)}</h3>
		<ul>
			{#each periodMates as x (x.z)}
				<li><a href={elementPath(x, lang)}>{x.name[lang]} ({x.symbol})</a></li>
			{/each}
		</ul>
	</nav>

	<h2>{t.article.readMore}</h2>
	<ul class="refs">
		{#if e.wikipedia[lang]}
			<li><a href={e.wikipedia[lang]} rel="noopener">{t.article.wikipedia}: {e.name[lang]}</a></li>
		{/if}
		<li><a href="https://pubchem.ncbi.nlm.nih.gov/element/{e.z}" rel="noopener">PubChem: {e.name.en}</a></li>
		{#if e.wikidata}
			<li><a href="https://www.wikidata.org/wiki/{e.wikidata}" rel="noopener">Wikidata: {e.wikidata}</a></li>
		{/if}
	</ul>

	<p><a href={homePath(lang)}>{t.article.backToTable}</a></p>
</article>

<style>
	.article {
		max-width: 68ch;
		margin: 0 auto;
		padding: 56px var(--gutter) 24px;
	}

	.kicker {
		margin: 0;
		font-size: var(--step--1);
	}

	h1 {
		margin: 0.1em 0 0.4em;
		font-family: var(--font-display);
		font-weight: 600;
		font-size: var(--step-4);
		line-height: 1;
	}

	h2 {
		margin: 1.6em 0 0.5em;
		font-family: var(--font-display);
		font-weight: 600;
		font-size: var(--step-2);
		line-height: 1.1;
	}

	h3 {
		margin: 1em 0 0.3em;
		font-size: var(--step-0);
	}

	.summary {
		font-size: var(--step-1);
		line-height: 1.45;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-variant-numeric: tabular-nums;
	}

	th,
	td {
		padding: 7px 8px 7px 0;
		border-top: 1px solid color-mix(in srgb, var(--rule) 45%, transparent);
		text-align: left;
		vertical-align: top;
	}

	thead th {
		border-top: 0;
		border-bottom: 2px solid var(--rule);
		font-size: var(--step--1);
	}

	tbody th {
		font-weight: 400;
		font-size: var(--step--1);
		width: 45%;
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 4px 16px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.pager {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 8px 24px;
	}

	.refs {
		flex-direction: column;
	}
</style>
