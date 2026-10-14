<script lang="ts">
	import { page } from '$app/state';
	import { app } from '#lib/state.svelte.ts';
	import { PROPERTIES, elements, fetchedAt, sources } from '#lib/elements.ts';
	import { LANGS, LANG_INFO } from '#lib/i18n/langs.ts';
	import {
		elementPath,
		homePath,
		molarPath,
		printPagePath,
		privacyPath,
		propertyPath,
		AUTHOR,
		DATA_LICENSE
	} from '#lib/seo.ts';
	import { PAPERS, PAPER_LABEL, printPath } from '#lib/print.ts';
	import Seo from './Seo.svelte';
	import Controls from './Controls.svelte';
	import Table from './Table.svelte';
	import Legend from './Legend.svelte';
	import PickCard from './PickCard.svelte';
	import Poster from './Poster.svelte';
	import ElementArticle from './ElementArticle.svelte';
	import PropertyValues from './PropertyValues.svelte';
	import { dev } from '$app/env';
	import { showAds } from '#lib/ads.ts';

	let opened = $derived(app.openedZ ? elements[app.openedZ - 1] : null);
	/** Property of a property page; its list stays under a poster opened from it. */
	let property = $derived(page.data.property ?? null);

	let t = $derived(app.t);

	// The map's card follows the poster, so closing it leaves the last element viewed picked.
	$effect(() => {
		if (app.openedZ) app.picked = app.openedZ;
	});
</script>

<Seo element={opened} {property} />

<!-- Inside <main>, the header and the legend's footer stop being page-wide landmarks. -->
<main>
	<div class="stage" class:behind={opened}>
		<div class="frame">
			<div class="app">
				<Controls />
				<Table />
				<PickCard />
				<Legend />
			</div>
		</div>
		{#if dev && showAds()}
			{#await import('./AdPreview.svelte') then { default: AdPreview }}
				<AdPreview />
			{/await}
		{/if}
	</div>

	{#if property}
		<!-- A new property starts from the server's order, highest first. -->
		{#key property}
			<PropertyValues {property} />
		{/key}
	{:else if opened}
		<ElementArticle element={opened} />
	{:else}
		<section class="prose about">
			<h2>{t.about.heading}</h2>
			{#each t.about.paragraphs as paragraph, i (i)}
				<p>{paragraph}</p>
			{/each}
		</section>
	{/if}

	<section class="prose" id="print">
		<h2>{t.print.heading}</h2>
		<p>{t.print.text}</p>
		<ul>
			{#each PAPERS as paper (paper)}
				<li>
					{PAPER_LABEL[paper]}:
					<a href={printPath(app.lang, paper, 'color')} type="application/pdf" target="_blank">{t.print.color}</a> ·
					<a href={printPath(app.lang, paper, 'bw')} type="application/pdf" target="_blank">{t.print.bw}</a>
					<span class="format">PDF</span>
				</li>
			{/each}
		</ul>
		<p><a href={printPagePath(app.lang)}>{t.printPage.link} →</a></p>
	</section>

	<section class="prose" id="sources">
		<h2>{t.sources}</h2>
		<p>{t.sourcesNote}</p>
		<ul>
			<li><a href="https://pubchem.ncbi.nlm.nih.gov/periodic-table/">PubChem Periodic Table</a> (NIH)</li>
			<li><a href={sources.atomicWeights}>IUPAC CIAAW, Abridged Standard Atomic Weights</a></li>
			<li>
				<a href={sources.ionizationEnergies}>NIST Atomic Spectra Database, Ionization Energies</a>
				(NIST Standard Reference Database 78, © U.S. Secretary of Commerce)
			</li>
			<li><a href={sources.electronAffinities}>Electron affinity (data page)</a>, Wikipedia (CC BY-SA 4.0)</li>
			<li><a href={sources.covalentRadii}>Cordero et al., Covalent radii revisited (2008)</a></li>
			<li><a href="https://www.wikidata.org/">Wikidata</a></li>
		</ul>

		<h2>{t.data.heading}</h2>
		<p>{t.data.text}</p>
		<ul>
			<li><a href="/data/elements.json" type="application/json">elements.json</a></li>
			<li><a href="/data/elements.csv" type="text/csv">elements.csv</a></li>
			<li><a href="/llms.txt" type="text/plain">llms.txt</a></li>
		</ul>
		<p class="date">
			<time datetime={fetchedAt}>{fetchedAt}</time> ·
			<a rel="license" href={DATA_LICENSE.url}>{DATA_LICENSE.name}</a>
		</p>
	</section>
</main>

<footer class="prose langs">
	<nav class="properties" aria-labelledby="properties-heading">
		<h2 id="properties-heading">{t.propertyPage.all}</h2>
		<ul>
			{#each PROPERTIES as key (key)}
				<li>
					<a
						href={propertyPath(key, app.lang)}
						aria-current={key === property ? 'page' : undefined}>{t.propertyPage.title[key]}</a
					>
				</li>
			{/each}
		</ul>
		<p class="print">
			<a href={printPagePath(app.lang)}>{t.printPage.title}</a><br />
			<a href={molarPath(app.lang)}>{t.molar.title}</a>
		</p>
	</nav>
	<h2 class="visually-hidden">{t.language}</h2>
	<ul>
		{#each LANGS as l (l)}
			<li>
				<a
					href={opened
						? elementPath(opened, l)
						: property
							? propertyPath(property, l)
							: homePath(l)}
					hreflang={LANG_INFO[l].tag}
					lang={LANG_INFO[l].tag}
					aria-current={l === app.lang ? 'page' : undefined}>{LANG_INFO[l].native}</a
				>
			</li>
		{/each}
	</ul>
	<p class="credit">{t.madeBy}<a href={AUTHOR.url} rel="author" target="_blank">{AUTHOR.name}</a></p>
	<p class="legal">
		<a href={privacyPath(app.lang)}>{t.privacy.title}</a> ·
		<a href="/third-party-licenses.txt" type="text/plain">{t.licenses}</a>
	</p>
</footer>

<Poster element={opened} />

<style>
	.stage {
		display: flex;
	}

	/*
	 * Safari on iOS 26 draws no fixed layer under its see-through status bar and toolbar, so the
	 * table showed above and below the open poster. Hide it once the poster has grown over it
	 * (the delay is the opening animation); on closing it comes back at once.
	 */
	.stage.behind {
		visibility: hidden;
		transition: visibility 0s 0.56s;
	}

	/* The table sizes itself from this width, which excludes the page scrollbar and any side column. */
	.frame {
		flex: 1;
		min-width: 0;
		container-type: inline-size;
	}

	.app {
		/*
		 * Header + legend height. 19.3 columns = 18 cells + the 0.4 period labels + 5% gaps;
		 * 10.25 rows = 9 cells + the 0.35 spacer + the 0.4 group labels + 5% gaps.
		 */
		--chrome: 150px;
		--cell: max(
			40px,
			min(
				calc((100cqw - 2 * var(--gutter)) / 19.3),
				calc((100dvh - var(--chrome)) / 10.25)
			)
		);
		display: flex;
		flex-direction: column;
		height: 100dvh;
	}

	/* Portrait phones: the whole table across the width as a map, 18 cells and 17 gaps of 1.5 px. */
	@media (max-width: 760px) and (orientation: portrait) {
		.app {
			--gutter: 12px;
			--cell: calc((100cqw - 2 * var(--gutter) - 17 * 1.5px) / 18);
			height: auto;
		}
	}

	.prose {
		max-width: 68ch;
		padding: 40px var(--gutter) 24px;
		margin: 0 auto;
		font-size: var(--step--1);
	}

	h2 {
		margin: 0 0 0.6em;
		font-family: var(--font-display);
		font-weight: 600;
		font-size: var(--step-2);
		line-height: 1.1;
	}

	ul {
		padding-left: 1.1em;
		overflow-wrap: anywhere;
	}

	.prose li + li {
		margin-top: 0.25em;
	}

	.langs {
		padding-bottom: 56px;
	}

	.langs ul {
		display: flex;
		flex-wrap: wrap;
		gap: 6px 16px;
		padding: 0;
		list-style: none;
	}

	.langs li + li {
		margin-top: 0;
	}

	.properties h2 {
		font-size: var(--step-1);
	}

	.properties ul {
		margin: 0;
	}

	.properties .print {
		margin: 12px 0 28px;
	}

	.langs [aria-current='page'] {
		font-weight: 600;
		text-decoration: none;
	}

	.credit {
		margin-top: 12px;
	}

	.legal {
		margin-top: 4px;
	}

	.format {
		margin-left: 0.4em;
		font-size: var(--step--2);
		opacity: 0.75;
	}

	.date {
		font-variant-numeric: tabular-nums;
		opacity: 0.75;
	}
</style>
