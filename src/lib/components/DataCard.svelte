<script lang="ts">
	import { app } from '#lib/state.svelte.ts';
	import { fetchedAt, sources } from '#lib/elements.ts';
	import { LANG_INFO } from '#lib/i18n/langs.ts';
	import { DATA_LICENSE } from '#lib/seo.ts';

	/** Where the data comes from and where to download it. `wide` lays it out across the page. */
	let { wide = false }: { wide?: boolean } = $props();

	let lang = $derived(app.lang);
	let t = $derived(app.t);

	let list = $derived([
		{ name: 'IUPAC CIAAW', url: sources.atomicWeights, what: t.footer.sourceFor.ciaaw },
		{ name: 'NIST', url: sources.ionizationEnergies, what: t.footer.sourceFor.nist },
		{ name: 'PubChem (NIH)', url: sources.properties, what: t.footer.sourceFor.pubchem },
		{ name: 'Cordero et al., 2008', url: sources.covalentRadii, what: t.footer.sourceFor.cordero },
		{ name: 'Wikipedia', url: sources.electronAffinities, what: t.footer.sourceFor.wikipedia },
		{ name: 'Wikidata', url: 'https://www.wikidata.org/', what: t.footer.sourceFor.wikidata }
	]);

	let date = $derived(
		new Intl.DateTimeFormat(LANG_INFO[lang].tag, { dateStyle: 'long', timeZone: 'UTC' }).format(
			new Date(fetchedAt)
		)
	);
</script>

<aside class="card" class:wide id="sources" aria-labelledby="sources-heading">
	<div>
		<h2 id="sources-heading">{t.footer.sources}</h2>
		<ul class="sources">
			{#each list as source (source.name)}
				<li><a href={source.url}>{source.name}</a><span>{source.what}</span></li>
			{/each}
		</ul>
		<p class="note">[227] — {t.massIsotope}</p>
		<!-- Terms of the sources that ask for them (DATA_CREDITS in #lib/seo.ts). -->
		<p class="note">
			NIST Standard Reference Database 78, © U.S. Secretary of Commerce · Wikipedia: CC BY-SA 4.0
		</p>
	</div>
	<div>
		<h3>{t.data.heading}</h3>
		<p class="note">{t.data.text}</p>
		<ul class="files">
			<li><a href="/data/elements.json" type="application/json">elements.json</a></li>
			<li><a href="/data/elements.csv" type="text/csv">elements.csv</a></li>
			<li><a href="/llms.txt" type="text/plain">llms.txt</a></li>
		</ul>
		<p class="note">
			<time datetime={fetchedAt}>{t.footer.updated(date)}</time> ·
			<a rel="license" href={DATA_LICENSE.url}>{DATA_LICENSE.name}</a>
		</p>
	</div>
</aside>

<style>
	.card {
		display: grid;
		gap: 22px;
		align-self: start;
		padding: 18px;
		background: var(--surface);
		color: var(--on-surface);
		box-shadow: 6px 6px 0 var(--rule);
		font-size: var(--step--1);
	}

	h2,
	h3 {
		margin: 0 0 10px;
		font-family: var(--font-display);
		font-weight: 600;
		line-height: 1.1;
	}

	h2 {
		font-size: var(--step-1);
	}

	h3 {
		font-size: var(--step-0);
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.sources li {
		display: grid;
		grid-template-columns: minmax(0, 9.5em) minmax(0, 1fr);
		gap: 12px;
		padding: 7px 0;
		border-bottom: 1px solid color-mix(in srgb, var(--on-surface) 18%, transparent);
	}

	.sources a {
		font-weight: 600;
	}

	.note {
		margin: 10px 0 0;
		opacity: 0.85;
	}

	.files {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 12px;
	}

	.files a {
		display: inline-flex;
		align-items: center;
		min-height: 36px;
		padding: 0 14px;
		border: 1.5px solid var(--on-surface);
		border-radius: 999px;
		text-decoration: none;
	}

	.files a:hover {
		background: color-mix(in srgb, var(--on-surface) 10%, transparent);
	}

	@media (min-width: 900px) {
		.card {
			padding: 22px 24px;
		}

		.wide {
			grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
			gap: 48px;
		}
	}
</style>
