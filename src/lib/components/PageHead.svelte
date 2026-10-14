<script lang="ts">
	import { app } from '#lib/state.svelte.ts';
	import { LANGS, LANG_INFO, type Lang } from '#lib/i18n/langs.ts';
	import { AUTHOR, SITE_URL, absolute, alternates, homePath, ogImagePath } from '#lib/seo.ts';

	/**
	 * <head> of a page outside the table: meta, hreflang, Open Graph and JSON-LD. `graph` adds
	 * nodes to the WebSite and author; `crumbs` are the breadcrumb trail after the table itself.
	 */
	let {
		title,
		description,
		pathFor,
		crumbs,
		graph = []
	}: {
		title: string;
		description: string;
		pathFor: (l: Lang) => string;
		crumbs: { name: string; path: string }[];
		graph?: object[];
	} = $props();

	let lang = $derived(app.lang);
	let t = $derived(app.t);
	let url = $derived(absolute(pathFor(lang)));
	let links = $derived(alternates(pathFor));
	let image = $derived(absolute(ogImagePath(lang, null)));

	const WEBSITE_ID = `${SITE_URL}/#website`;
	const AUTHOR_ID = `${AUTHOR.url}/#organization`;

	let jsonLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@graph': [
				{
					'@type': 'WebSite',
					'@id': WEBSITE_ID,
					name: t.siteName,
					url: absolute(homePath(lang)),
					inLanguage: LANG_INFO[lang].tag,
					description: t.seo.homeDescription,
					publisher: { '@id': AUTHOR_ID }
				},
				{ '@type': 'Organization', '@id': AUTHOR_ID, name: AUTHOR.name, url: AUTHOR.url },
				{
					'@type': 'WebPage',
					'@id': url,
					url,
					name: title,
					description,
					inLanguage: LANG_INFO[lang].tag,
					isPartOf: { '@id': WEBSITE_ID },
					breadcrumb: { '@id': `${url}#breadcrumb` },
					primaryImageOfPage: image
				},
				{
					'@type': 'BreadcrumbList',
					'@id': `${url}#breadcrumb`,
					itemListElement: [{ name: t.title, path: homePath(lang) }, ...crumbs].map((c, i) => ({
						'@type': 'ListItem',
						position: i + 1,
						name: c.name,
						item: absolute(c.path)
					}))
				},
				...graph
			]
		}).replace(/</g, '\\u003c')
	);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	{#each links as link (link.hreflang)}
		<link rel="alternate" hreflang={link.hreflang} href={link.href} />
	{/each}
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={t.siteName} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={image} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
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
