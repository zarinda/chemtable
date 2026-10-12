<script lang="ts">
	import { app } from '#lib/state.svelte.ts';
	import { fetchedAt, sources, PROPERTIES, type Element } from '#lib/elements.ts';
	import { LANGS, LANG_INFO } from '#lib/i18n/langs.ts';
	import {
		SITE_URL,
		AUTHOR,
		DATA_LICENSE,
		absolute,
		alternates,
		elementPath,
		homePath,
		ogImagePath,
		summaryFacts
	} from '#lib/seo.ts';

	/** Element whose page this is, or null for the home page. */
	let { element }: { element: Element | null } = $props();

	let lang = $derived(app.lang);
	let t = $derived(app.t);
	let facts = $derived(element ? summaryFacts(element, lang) : null);

	let title = $derived(
		element ? t.seo.elementTitle(element.name[lang], element.symbol) : t.seo.homeTitle
	);
	let description = $derived(facts ? t.seo.elementDescription(facts) : t.seo.homeDescription);
	let url = $derived(absolute(element ? elementPath(element, lang) : homePath(lang)));
	let links = $derived(alternates((l) => (element ? elementPath(element, l) : homePath(l))));
	let image = $derived(absolute(ogImagePath(lang, element)));

	const WEBSITE_ID = `${SITE_URL}/#website`;
	const AUTHOR_ID = `${AUTHOR.url}/#organization`;
	const author = { '@type': 'Organization', '@id': AUTHOR_ID, name: AUTHOR.name, url: AUTHOR.url };

	let graph = $derived.by(() => {
		const website = {
			'@type': 'WebSite',
			'@id': WEBSITE_ID,
			name: t.siteName,
			url: absolute(homePath(lang)),
			inLanguage: LANG_INFO[lang].tag,
			description: t.seo.homeDescription,
			publisher: { '@id': AUTHOR_ID }
		};

		if (!element || !facts) {
			return [
				website,
				author,
				{
					'@type': 'Dataset',
					'@id': `${absolute(homePath(lang))}#dataset`,
					name: t.title,
					description: t.seo.homeDescription,
					url,
					inLanguage: LANGS.map((l) => LANG_INFO[l].tag),
					isAccessibleForFree: true,
					license: DATA_LICENSE.url,
					creator: { '@id': AUTHOR_ID },
					publisher: { '@id': AUTHOR_ID },
					isBasedOn: [sources.properties, sources.atomicWeights, 'https://www.wikidata.org/'],
					dateModified: fetchedAt,
					variableMeasured: [
						t.atomicMass,
						t.config,
						t.boilingPoint,
						t.oxidationStates,
						t.electronAffinity,
						...PROPERTIES.filter((p) => p !== 'mass').map((p) => t.property[p])
					],
					distribution: [
						{
							'@type': 'DataDownload',
							encodingFormat: 'application/json',
							contentUrl: absolute('/data/elements.json')
						},
						{ '@type': 'DataDownload', encodingFormat: 'text/csv', contentUrl: absolute('/data/elements.csv') }
					]
				}
			];
		}

		const sameAs = [
			element.wikidata && `https://www.wikidata.org/wiki/${element.wikidata}`,
			`https://pubchem.ncbi.nlm.nih.gov/element/${element.z}`,
			element.wikipedia[lang] ?? element.wikipedia.en
		].filter(Boolean);

		return [
			website,
			author,
			{
				'@type': 'WebPage',
				'@id': url,
				url,
				name: title,
				description,
				inLanguage: LANG_INFO[lang].tag,
				isPartOf: { '@id': WEBSITE_ID },
				about: { '@id': `${url}#element` },
				breadcrumb: { '@id': `${url}#breadcrumb` },
				primaryImageOfPage: image,
				dateModified: fetchedAt
			},
			{
				'@type': 'ChemicalSubstance',
				'@id': `${url}#element`,
				name: element.name[lang],
				alternateName: [element.symbol, ...new Set(LANGS.map((l) => element.name[l]))].filter(
					(n) => n !== element.name[lang]
				),
				chemicalComposition: element.symbol,
				identifier: { '@type': 'PropertyValue', propertyID: 'atomic number', value: element.z },
				description: t.article.summary(facts),
				url,
				image,
				sameAs
			},
			{
				'@type': 'BreadcrumbList',
				'@id': `${url}#breadcrumb`,
				itemListElement: [
					{ '@type': 'ListItem', position: 1, name: t.title, item: absolute(homePath(lang)) },
					{ '@type': 'ListItem', position: 2, name: element.name[lang], item: url }
				]
			}
		];
	});

	// "</" inside JSON would close the script tag early.
	let jsonLd = $derived(
		JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')
	);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	{#each links as link (link.hreflang)}
		<link rel="alternate" hreflang={link.hreflang} href={link.href} />
	{/each}

	<meta property="og:type" content={element ? 'article' : 'website'} />
	<meta property="og:site_name" content={t.siteName} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={image} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={element ? `${element.name[lang]} (${element.symbol})` : t.title} />
	<meta property="og:locale" content={LANG_INFO[lang].og} />
	{#each LANGS.filter((l) => l !== lang) as l (l)}
		<meta property="og:locale:alternate" content={LANG_INFO[l].og} />
	{/each}
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />

	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>
