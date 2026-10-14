<script lang="ts">
	import type { Snippet } from 'svelte';
	import { app } from '#lib/state.svelte.ts';
	import { LANGS, LANG_INFO, type Lang } from '#lib/i18n/langs.ts';
	import { AUTHOR, privacyPath } from '#lib/seo.ts';
	import SiteLinks from './SiteLinks.svelte';

	/**
	 * Lower part of every page: the tools and property pages as cells, then `children` (the home
	 * page puts "About" and the data sources there), then a line with the languages and the credit.
	 * With `pathFor`, the languages link to this page in each of them.
	 */
	let { pathFor, children }: { pathFor?: (l: Lang) => string; children?: Snippet } = $props();

	let lang = $derived(app.lang);
	let t = $derived(app.t);
</script>

<div class="lower">
	<SiteLinks />
	{@render children?.()}
	<footer>
		{#if pathFor}
			<h2 class="visually-hidden">{t.language}</h2>
			<ul class="langs">
				{#each LANGS as l (l)}
					<li>
						<a
							href={pathFor(l)}
							hreflang={LANG_INFO[l].tag}
							lang={LANG_INFO[l].tag}
							aria-current={l === lang ? 'page' : undefined}>{LANG_INFO[l].native}</a
						>
					</li>
				{/each}
			</ul>
		{/if}
		<p>
			{t.madeBy}<a href={AUTHOR.url} rel="author" target="_blank">{AUTHOR.name}</a> ·
			<a href={privacyPath(lang)}>{t.privacy.title}</a> ·
			<a href="/third-party-licenses.txt" type="text/plain">{t.licenses}</a>
		</p>
	</footer>
</div>

<style>
	.lower {
		width: min(100% - 2 * var(--gutter), 1344px);
		margin: 48px auto 0;
	}

	footer {
		display: flex;
		flex-wrap: wrap;
		gap: 12px 32px;
		justify-content: space-between;
		padding: 20px 0 48px;
		border-top: 2px solid var(--rule);
		font-size: var(--step--1);
	}

	p {
		margin: 0;
	}

	.langs {
		display: flex;
		flex-wrap: wrap;
		gap: 4px 14px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.langs [aria-current] {
		font-weight: 600;
		text-decoration: none;
	}

	@media (min-width: 900px) {
		.lower {
			width: min(100% - 96px, 1344px);
		}
	}
</style>
