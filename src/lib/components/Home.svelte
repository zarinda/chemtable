<script lang="ts">
	import { page } from '$app/state';
	import { app } from '#lib/state.svelte.ts';
	import { elements } from '#lib/elements.ts';
	import type { Lang } from '#lib/i18n/langs.ts';
	import { elementPath, homePath, propertyPath } from '#lib/seo.ts';
	import Seo from './Seo.svelte';
	import Controls from './Controls.svelte';
	import Table from './Table.svelte';
	import Legend from './Legend.svelte';
	import PickCard from './PickCard.svelte';
	import Poster from './Poster.svelte';
	import ElementArticle from './ElementArticle.svelte';
	import PropertyValues from './PropertyValues.svelte';
	import PageFooter from './PageFooter.svelte';
	import DataCard from './DataCard.svelte';
	import { dev } from '$app/env';
	import { showAds } from '#lib/ads.ts';

	let opened = $derived(app.openedZ ? elements[app.openedZ - 1] : null);
	/** Property of a property page; its list stays under a poster opened from it. */
	let property = $derived(page.data.property ?? null);

	let t = $derived(app.t);

	/** This page in another language. */
	const languagePath = (l: Lang) =>
		opened ? elementPath(opened, l) : property ? propertyPath(property, l) : homePath(l);

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
	{/if}
</main>

<PageFooter pathFor={languagePath}>
	{#if property || opened}
		<div class="lower-sources"><DataCard wide /></div>
	{:else}
		<div class="about">
			<section aria-labelledby="about-heading">
				<h2 id="about-heading">{t.about.heading}</h2>
				{#each t.about.paragraphs as paragraph, i (i)}
					<p>{paragraph}</p>
				{/each}
			</section>
			<DataCard />
		</div>
	{/if}
</PageFooter>

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

	/* Home page: "About" beside the data sources card. */
	.about {
		display: grid;
		gap: 32px;
		padding: 28px 0 40px;
		border-top: 2px solid var(--rule);
	}

	.about h2 {
		margin: 0 0 14px;
		font-family: var(--font-display);
		font-size: var(--step-2);
		font-weight: 600;
		line-height: 1.1;
	}

	.about p {
		max-width: 68ch;
		margin: 0 0 0.8em;
	}

	.about p:first-of-type {
		font-size: var(--step-1);
		line-height: 1.45;
	}

	.lower-sources {
		padding: 28px 0 40px;
		border-top: 2px solid var(--rule);
	}

	@media (min-width: 900px) {
		.about {
			grid-template-columns: minmax(0, 7fr) minmax(0, 4fr);
			gap: 64px;
		}
	}
</style>
