<script lang="ts">
	// Dev-only mock of Google ad units, to judge how ads would sit in the design.
	// Imported dynamically under `dev` (see #lib/ads.ts), so it never reaches the built site.
	// URL switches: ?ad=300 (wide column), ?ad=off (no ads), ?adpos=top (banner above the element).
	import { page } from '$app/state';
	import { app } from '#lib/state.svelte.ts';
	import type { Lang } from '#lib/i18n/langs.ts';

	let { format = 'column' }: { format?: 'column' | 'banner' } = $props();

	// AdSense allows only "Advertisements" or "Sponsored links" as the label.
	const LABEL: Record<Lang, string> = {
		en: 'Advertisement',
		ru: 'Реклама',
		fr: 'Publicité',
		de: 'Anzeige',
		it: 'Pubblicità',
		es: 'Publicidad',
		zh: '广告',
		pt: 'Publicidade'
	};

	// Standard Google units. Column: 160×600 Wide Skyscraper or 300×600 Half Page.
	// Banner: 970×90 Large Leaderboard, 728×90 Leaderboard on narrower screens, 320×100 Large Mobile Banner on phones.
	let wide = $derived(page.url.searchParams.get('ad') === '300');
</script>

{#if format === 'column'}
	<aside class="ad column" class:wide style:--w={wide ? '300px' : '160px'}>
		<span class="label">{LABEL[app.lang]}</span>
		<div class="slot">
			<span class="size">{wide ? 300 : 160} × 600</span>
			<span class="note">Google AdSense</span>
		</div>
	</aside>
{:else}
	<aside class="ad banner">
		<span class="label">{LABEL[app.lang]}</span>
		<div class="slot">
			<span class="size large">970 × 90</span>
			<span class="size desktop">728 × 90</span>
			<span class="size phone">320 × 100</span>
			<span class="note">Google AdSense</span>
		</div>
	</aside>
{/if}

<style>
	.ad {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.label {
		font-size: var(--step--2);
		opacity: 0.75;
	}

	.slot {
		display: grid;
		place-content: center;
		justify-items: center;
		gap: 4px;
		border: 1px solid color-mix(in srgb, var(--fg) 30%, transparent);
		background:
			repeating-linear-gradient(135deg, color-mix(in srgb, var(--fg) 7%, transparent) 0 1px, transparent 1px 7px),
			color-mix(in srgb, var(--surface) 55%, transparent);
	}

	.size {
		font-family: var(--font-numeral);
		font-size: var(--step-2);
		line-height: 1;
		opacity: 0.6;
	}

	.note {
		font-size: var(--step--2);
		opacity: 0.55;
	}

	/* Column beside the table. */
	.column {
		display: none;
		flex: none;
		justify-content: center;
		width: var(--w);
		padding-right: var(--gutter);
		box-sizing: content-box;
	}

	.column .slot {
		height: 600px;
		max-height: calc(100dvh - 120px);
	}

	/*
	 * Only where the table keeps its element names beside the column: they hide
	 * below a ~66 px cell, i.e. (width − column − gutters) / 19.3 < 66.
	 */
	@media (min-width: 1500px) and (min-height: 700px) {
		.column {
			display: flex;
		}
	}

	@media (max-width: 1639px) {
		.column.wide {
			display: none;
		}
	}

	/* Horizontal banner on element pages. */
	.banner {
		width: min(970px, 100%);
		justify-self: center;
	}

	.banner .slot {
		height: 90px;
		grid-auto-flow: column;
		align-items: baseline;
		gap: 12px;
	}

	.banner .desktop,
	.banner .phone {
		display: none;
	}

	/* 970 px plus the poster's side padding. */
	@media (max-width: 1099px) {
		.banner {
			width: min(728px, 100%);
		}
		.banner .large {
			display: none;
		}
		.banner .desktop {
			display: inline;
		}
	}

	@media (max-width: 760px) {
		.banner {
			width: 320px;
			max-width: 100%;
		}
		.banner .slot {
			height: 100px;
		}
		.banner .desktop {
			display: none;
		}
		.banner .phone {
			display: inline;
		}
	}
</style>
