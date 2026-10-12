<script lang="ts">
	import { app } from '#lib/state.svelte.ts';
	import { LANGS, LANG_INFO } from '#lib/i18n/langs.ts';
	import { PRIVACY_SECTIONS, type PrivacySection } from '#lib/i18n/ui.ts';
	import {
		AUTHOR,
		PRIVACY_UPDATED,
		absolute,
		alternates,
		homePath,
		privacyPath
	} from '#lib/seo.ts';
	import { ADS_LIVE } from '#lib/ads.ts';

	let lang = $derived(app.lang);
	let t = $derived(app.t);
	let p = $derived(t.privacy);

	let title = $derived(`${p.title} | ${t.siteName}`);
	let url = $derived(absolute(privacyPath(lang)));
	let links = $derived(alternates(privacyPath));
	let date = $derived(
		new Intl.DateTimeFormat(LANG_INFO[lang].tag, { dateStyle: 'long', timeZone: 'UTC' }).format(
			new Date(PRIVACY_UPDATED)
		)
	);

	/** Proper names, the same in every language. Google asks for the opt-out links once ads run. */
	const SECTION_LINKS: Partial<Record<PrivacySection, { label: string; href: string }[]>> = {
		hosting: [{ label: 'Cloudflare Privacy Policy', href: 'https://www.cloudflare.com/privacypolicy/' }],
		ads: ADS_LIVE
			? [
					{
						label: 'How Google uses information from sites that use its services',
						href: 'https://policies.google.com/technologies/partner-sites'
					},
					{ label: 'Google Ads Settings', href: 'https://adssettings.google.com/' },
					{ label: 'aboutads.info', href: 'https://optout.aboutads.info/' },
					{ label: 'youronlinechoices.eu', href: 'https://www.youronlinechoices.eu/' }
				]
			: []
	};
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={p.description} />
	<link rel="canonical" href={url} />
	{#each links as link (link.hreflang)}
		<link rel="alternate" hreflang={link.hreflang} href={link.href} />
	{/each}
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={t.siteName} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={p.description} />
	<meta property="og:url" content={url} />
	<meta property="og:locale" content={LANG_INFO[lang].og} />
</svelte:head>

<main class="prose">
	<p class="back"><a href={homePath(lang)}>← {p.back}</a></p>

	<h1>{p.title}</h1>
	<p class="date">{p.updated} <time datetime={PRIVACY_UPDATED}>{date}</time></p>
	<p>{p.intro(AUTHOR.name)}</p>

	{#each PRIVACY_SECTIONS as key (key)}
		{@const section = p.sections[key]}
		<section>
			<h2>{section.heading}</h2>
			{#if key === 'ads' && !ADS_LIVE}
				<p>{p.adsOff}</p>
			{:else}
				{#each section.paragraphs as paragraph, i (i)}
					<p>{paragraph}</p>
				{/each}
			{/if}
			{#if SECTION_LINKS[key]?.length}
				<ul>
					{#each SECTION_LINKS[key] as link (link.href)}
						<li><a href={link.href} lang="en" rel="noreferrer">{link.label}</a></li>
					{/each}
				</ul>
			{/if}
			{#if key === 'rights'}
				<p>{p.contact} <a href={AUTHOR.url} rel="author">{new URL(AUTHOR.url).host}</a></p>
			{/if}
		</section>
	{/each}
</main>

<footer class="prose langs">
	<h2 class="visually-hidden">{t.language}</h2>
	<ul>
		{#each LANGS as l (l)}
			<li>
				<a
					href={privacyPath(l)}
					hreflang={LANG_INFO[l].tag}
					lang={LANG_INFO[l].tag}
					aria-current={l === lang ? 'page' : undefined}>{LANG_INFO[l].native}</a
				>
			</li>
		{/each}
	</ul>
</footer>

<style>
	.prose {
		max-width: 68ch;
		padding: 40px var(--gutter) 24px;
		margin: 0 auto;
		font-size: var(--step--1);
		line-height: 1.5;
	}

	h1,
	h2 {
		margin: 0 0 0.6em;
		font-family: var(--font-display);
		font-weight: 600;
		line-height: 1.1;
	}

	h1 {
		font-size: var(--step-3);
	}

	h2 {
		margin-top: 1.6em;
		font-size: var(--step-1);
	}

	.back {
		margin-top: 0;
	}

	.date {
		font-variant-numeric: tabular-nums;
		opacity: 0.75;
	}

	ul {
		padding-left: 1.1em;
		overflow-wrap: anywhere;
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

	.langs [aria-current='page'] {
		font-weight: 600;
		text-decoration: none;
	}
</style>
