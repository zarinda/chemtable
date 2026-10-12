<script lang="ts">
	import { onMount } from 'svelte';
	import { app } from '#lib/state.svelte.ts';
	import { elements, fetchedAt, sources } from '#lib/elements.ts';
	import { LANGS, LANG_INFO } from '#lib/i18n/langs.ts';
	import { elementPath, homePath, AUTHOR, DATA_LICENSE } from '#lib/seo.ts';
	import { PAPERS, PAPER_LABEL, printPath } from '#lib/print.ts';
	import Seo from './Seo.svelte';
	import Controls from './Controls.svelte';
	import Table from './Table.svelte';
	import Legend from './Legend.svelte';
	import Poster from './Poster.svelte';
	import ElementArticle from './ElementArticle.svelte';

	let opened = $derived(app.openedZ ? elements[app.openedZ - 1] : null);

	let t = $derived(app.t);

	onMount(() => app.restore());

	$effect(() => {
		document.documentElement.lang = LANG_INFO[app.lang].tag;
		if (app.theme === 'system') delete document.documentElement.dataset.theme;
		else document.documentElement.dataset.theme = app.theme;
	});
</script>

<Seo element={opened} />

<!-- Inside <main>, the header and the legend's footer stop being page-wide landmarks. -->
<main>
	<div class="frame">
		<div class="app">
			<Controls />
			<Table />
			<Legend />
		</div>
	</div>

	{#if opened}
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
	</section>

	<section class="prose" id="sources">
		<h2>{t.sources}</h2>
		<p>{t.sourcesNote}</p>
		<ul>
			<li><a href="https://pubchem.ncbi.nlm.nih.gov/periodic-table/">PubChem Periodic Table</a> (NIH)</li>
			<li><a href={sources.atomicWeights}>IUPAC CIAAW, Abridged Standard Atomic Weights</a></li>
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
	<h2 class="visually-hidden">{t.language}</h2>
	<ul>
		{#each LANGS as l (l)}
			<li>
				<a
					href={opened ? elementPath(opened, l) : homePath(l)}
					hreflang={LANG_INFO[l].tag}
					lang={LANG_INFO[l].tag}
					aria-current={l === app.lang ? 'page' : undefined}>{LANG_INFO[l].native}</a
				>
			</li>
		{/each}
	</ul>
	<p class="credit">{t.madeBy}<a href={AUTHOR.url} rel="author" target="_blank">{AUTHOR.name}</a></p>
</footer>

<Poster element={opened} />

<style>
	/* The table sizes itself from this width, which excludes the page scrollbar. */
	.frame {
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

	/* Portrait phones scroll the table sideways, so cells size from the height instead. */
	@media (max-width: 600px) and (orientation: portrait) {
		.app {
			--cell: clamp(44px, calc((100dvh - var(--chrome)) / 10.25), 58px);
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

	.langs [aria-current='page'] {
		font-weight: 600;
		text-decoration: none;
	}

	.credit {
		margin-top: 12px;
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
