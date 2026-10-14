<script lang="ts">
	import { app } from '#lib/state.svelte.ts';
	import { fetchedAt } from '#lib/elements.ts';
	import { LANGS, LANG_INFO } from '#lib/i18n/langs.ts';
	import { SITE_URL, absolute, alternates, homePath, ogImagePath, printPagePath } from '#lib/seo.ts';
	import {
		PAPERS,
		PAPER_LABEL,
		VARIANTS,
		previewHeight,
		previewPath,
		printPath,
		type Paper,
		type Variant
	} from '#lib/print.ts';
	import PageHeader from './PageHeader.svelte';
	import PageFooter from './PageFooter.svelte';

	/** Size in bytes of each PDF, keyed `a4-color`, read at prerender. */
	let { sizes }: { sizes: Record<string, number> } = $props();

	let lang = $derived(app.lang);
	let t = $derived(app.t);
	let p = $derived(t.printPage);

	let paper: Paper = $state('a4');
	let variant: Variant = $state('color');

	const variantLabel = (v: Variant) => (v === 'color' ? t.print.color : t.print.bw);
	const alt = (pp: Paper, v: Variant) => `${p.preview}: ${PAPER_LABEL[pp]}, ${variantLabel(v)}`;
	const srcset = (pp: Paper, v: Variant) =>
		`${previewPath(lang, pp, v, 640)} 640w, ${previewPath(lang, pp, v, 1600)} 1600w`;

	let size = $derived(
		new Intl.NumberFormat(LANG_INFO[lang].tag, {
			style: 'unit',
			unit: 'kilobyte',
			maximumFractionDigits: 0
		}).format(sizes[`${paper}-${variant}`] / 1000)
	);
	// Without a final full stop ("2026 г."), as the note ends with its own.
	let date = $derived(
		new Intl.DateTimeFormat(LANG_INFO[lang].tag, { dateStyle: 'long', timeZone: 'UTC' })
			.format(new Date(fetchedAt))
			.replace(/.$/, '')
	);

	let url = $derived(absolute(printPagePath(lang)));
	let links = $derived(alternates(printPagePath));
	let image = $derived(absolute(ogImagePath(lang, null)));

	const WEBSITE_ID = `${SITE_URL}/#website`;

	let jsonLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@graph': [
				{
					'@type': 'WebPage',
					'@id': url,
					url,
					name: p.seoTitle,
					description: p.description,
					inLanguage: LANG_INFO[lang].tag,
					isPartOf: { '@id': WEBSITE_ID },
					breadcrumb: { '@id': `${url}#breadcrumb` },
					primaryImageOfPage: absolute(previewPath(lang, 'a4', 'color', 1600)),
					dateModified: fetchedAt,
					associatedMedia: PAPERS.flatMap((pp) =>
						VARIANTS.map((v) => ({
							'@type': 'MediaObject',
							name: `${p.title}: ${PAPER_LABEL[pp]}, ${variantLabel(v)}`,
							contentUrl: absolute(printPath(lang, pp, v)),
							encodingFormat: 'application/pdf',
							thumbnailUrl: absolute(previewPath(lang, pp, v, 640))
						}))
					)
				},
				{
					'@type': 'BreadcrumbList',
					'@id': `${url}#breadcrumb`,
					itemListElement: [
						{ '@type': 'ListItem', position: 1, name: t.title, item: absolute(homePath(lang)) },
						{ '@type': 'ListItem', position: 2, name: p.title, item: url }
					]
				}
			]
		}).replace(/</g, '\\u003c')
	);
</script>

<svelte:head>
	<title>{p.seoTitle}</title>
	<meta name="description" content={p.description} />
	<link rel="canonical" href={url} />
	{#each links as link (link.hreflang)}
		<link rel="alternate" hreflang={link.hreflang} href={link.href} />
	{/each}
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={t.siteName} />
	<meta property="og:title" content={p.seoTitle} />
	<meta property="og:description" content={p.description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={image} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:locale" content={LANG_INFO[lang].og} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={p.seoTitle} />
	<meta name="twitter:description" content={p.description} />
	<meta name="twitter:image" content={image} />
	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

<PageHeader href={homePath(lang)} label={t.privacy.back} pathFor={printPagePath} />

<main class="page">
	<h1>{p.title}</h1>
	<p class="lead">{p.lead}</p>

	<div class="chooser">
		<img
			class="sheet"
			src={previewPath(lang, paper, variant, 1600)}
			srcset={srcset(paper, variant)}
			sizes="(min-width: 900px) 60vw, 100vw"
			width="1600"
			height={previewHeight(paper, 1600)}
			alt={alt(paper, variant)}
		/>

		<div class="options">
			<fieldset>
				<legend>{p.paper}</legend>
				<div class="segments">
					{#each PAPERS as value (value)}
						<label>
							<input type="radio" name="paper" {value} bind:group={paper} />
							<span>{PAPER_LABEL[value]}</span>
						</label>
					{/each}
				</div>
			</fieldset>
			<fieldset>
				<legend>{p.color}</legend>
				<div class="segments">
					{#each VARIANTS as value (value)}
						<label>
							<input type="radio" name="variant" {value} bind:group={variant} />
							<span>{variantLabel(value)}</span>
						</label>
					{/each}
				</div>
			</fieldset>

			<a class="download" href={printPath(lang, paper, variant)} type="application/pdf" download>
				<span aria-hidden="true">↓</span>
				{p.download} · {size}
			</a>

			<ul class="notes">
				{#each p.notes(date) as note, i (i)}
					<li>{note}</li>
				{/each}
			</ul>
		</div>
	</div>

	<section class="variants" aria-labelledby="variants-heading">
		<h2 id="variants-heading">{p.variants}</h2>
		<ul>
			{#each PAPERS as pp (pp)}
				{#each VARIANTS as v (v)}
					<li>
						<a href={printPath(lang, pp, v)} type="application/pdf" target="_blank">
							<img
								src={previewPath(lang, pp, v, 640)}
								width="640"
								height={previewHeight(pp, 640)}
								alt=""
								loading="lazy"
							/>
							<span><b>{PAPER_LABEL[pp]}</b> · {variantLabel(v)}</span>
							<span class="pdf">PDF ↓</span>
						</a>
					</li>
				{/each}
			{/each}
		</ul>
	</section>

	<p class="other">
		{p.otherLangs}:
		{#each LANGS.filter((l) => l !== lang) as l, i (l)}
			{#if i}{' · '}{/if}<a href={printPagePath(l)} hreflang={LANG_INFO[l].tag} lang={LANG_INFO[l].tag}
				>{LANG_INFO[l].native}</a
			>
		{/each}
	</p>
</main>

<PageFooter />

<style>
	.page {
		width: min(100% - 2 * var(--gutter), 1344px);
		margin-inline: auto;
	}

	h1,
	h2 {
		margin: 0;
		font-family: var(--font-display);
		font-weight: 600;
		line-height: 1.1;
	}

	h1 {
		margin: 28px 0 10px;
		font-size: clamp(var(--step-3), 5vw, 3.1rem);
	}

	.lead {
		max-width: 68ch;
		margin: 0;
	}

	.chooser {
		display: grid;
		gap: 28px;
		margin-top: 24px;
	}

	/* The sheets stay white in either theme and sit above the page grain, as paper would. */
	.sheet,
	.variants img {
		position: relative;
		z-index: 101;
		display: block;
		width: 100%;
		height: auto;
		background: #fff;
	}

	.sheet {
		box-shadow: 8px 8px 0 var(--rule);
	}

	fieldset {
		margin: 0 0 18px;
		padding: 0;
		border: 0;
	}

	legend {
		margin-bottom: 8px;
		padding: 0;
		font-size: var(--step--1);
	}

	.segments {
		display: inline-flex;
		overflow: hidden;
		border: 1.5px solid var(--rule);
		border-radius: 999px;
	}

	.segments label {
		position: relative;
		cursor: pointer;
	}

	.segments span {
		display: block;
		padding: 0.5em 1.1em;
		white-space: nowrap;
	}

	.segments input {
		position: absolute;
		opacity: 0;
		pointer-events: none;
	}

	.segments input:checked + span {
		background: var(--fg);
		color: var(--bg);
	}

	.segments input:focus-visible + span {
		outline: 3px solid var(--fg);
		outline-offset: -5px;
		box-shadow: inset 0 0 0 5px var(--bg);
	}

	.download {
		display: inline-flex;
		gap: 0.5em;
		align-items: center;
		justify-content: center;
		margin-top: 8px;
		padding: 15px 28px;
		border-radius: 999px;
		background: var(--fg);
		color: var(--bg);
		font-size: var(--step-1);
		font-weight: 600;
		text-decoration: none;
	}

	.download:hover {
		background: color-mix(in srgb, var(--fg) 82%, var(--bg));
	}

	.notes {
		display: grid;
		gap: 8px;
		margin: 26px 0 0;
		padding-left: 1.1em;
		font-size: var(--step--1);
	}

	.variants {
		margin-top: 48px;
		padding-top: 22px;
		border-top: 2px solid var(--rule);
	}

	.variants h2 {
		margin-bottom: 16px;
		font-size: var(--step-2);
	}

	.variants ul {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 24px 16px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.variants a {
		display: grid;
		gap: 8px;
		font-size: var(--step--1);
		text-decoration: none;
	}

	.variants img {
		box-shadow: 5px 5px 0 var(--rule);
		margin-bottom: 4px;
	}

	.pdf {
		text-decoration: underline;
	}

	.other {
		margin: 28px 0 0;
		font-size: var(--step--1);
	}

	@media (min-width: 900px) {
		.page {
			width: min(100% - 96px, 1344px);
		}

		h1 {
			margin-top: 34px;
		}

		.chooser {
			grid-template-columns: minmax(0, 7fr) minmax(0, 4fr);
			gap: 48px;
			align-items: start;
			margin-top: 30px;
		}

		.variants ul {
			grid-template-columns: repeat(4, minmax(0, 1fr));
			gap: 20px;
		}
	}

	/* Phones: the button across the width, easy to hit. */
	@media (max-width: 600px) {
		.segments {
			display: flex;
		}

		.segments label {
			flex: 1;
			text-align: center;
		}

		.download {
			display: flex;
			width: 100%;
		}
	}
</style>
