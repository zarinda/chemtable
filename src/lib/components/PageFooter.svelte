<script lang="ts">
	import { app } from '#lib/state.svelte.ts';
	import { PROPERTIES } from '#lib/elements.ts';
	import { LANGS, LANG_INFO, type Lang } from '#lib/i18n/langs.ts';
	import {
		AUTHOR,
		homePath,
		molarPath,
		printPagePath,
		privacyPath,
		propertyPath
	} from '#lib/seo.ts';

	/**
	 * Footer of the pages outside the table: links to the rest of the site, then the credit.
	 * With `pathFor`, also this page in every language.
	 */
	let { pathFor }: { pathFor?: (l: Lang) => string } = $props();

	let lang = $derived(app.lang);
	let t = $derived(app.t);
</script>

<footer class="page">
	<div class="links">
		<nav aria-labelledby="more-heading">
			<h2 id="more-heading">{t.moreOnSite}</h2>
			<ul>
				<li><a href={homePath(lang)}>{t.title}</a></li>
				<li><a href={molarPath(lang)}>{t.molar.title}</a></li>
				<li><a href={printPagePath(lang)}>{t.printPage.title}</a></li>
			</ul>
		</nav>
		<nav aria-labelledby="properties-heading">
			<h2 id="properties-heading">{t.propertyPage.all}</h2>
			<ul>
				{#each PROPERTIES as key (key)}
					<li><a href={propertyPath(key, lang)}>{t.propertyPage.title[key]}</a></li>
				{/each}
			</ul>
		</nav>
	</div>
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
	<p class="credit">{t.madeBy}<a href={AUTHOR.url} rel="author" target="_blank">{AUTHOR.name}</a></p>
	<p class="legal">
		<a href={privacyPath(lang)}>{t.privacy.title}</a> ·
		<a href="/third-party-licenses.txt" type="text/plain">{t.licenses}</a>
	</p>
</footer>

<style>
	footer {
		width: min(100% - 2 * var(--gutter), 1344px);
		margin: 48px auto 0;
		padding-top: 22px;
		padding-bottom: 56px;
		border-top: 2px solid var(--rule);
		font-size: var(--step--1);
	}

	.links {
		display: grid;
		gap: 0 48px;
	}

	h2 {
		margin: 0 0 0.6em;
		font-family: var(--font-display);
		font-size: var(--step-1);
		font-weight: 600;
		line-height: 1.1;
	}

	ul {
		margin: 0 0 24px;
		padding-left: 1.1em;
	}

	li + li {
		margin-top: 0.25em;
	}

	.langs {
		display: flex;
		flex-wrap: wrap;
		gap: 4px 14px;
		padding: 0;
		list-style: none;
	}

	.langs li + li {
		margin-top: 0;
	}

	.langs [aria-current] {
		font-weight: 600;
		text-decoration: none;
	}

	.legal {
		margin-top: 4px;
	}

	@media (min-width: 900px) {
		footer {
			width: min(100% - 96px, 1344px);
		}

		.links {
			grid-template-columns: max-content max-content;
		}
	}
</style>
