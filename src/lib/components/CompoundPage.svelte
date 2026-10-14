<script lang="ts">
	import { app } from '#lib/state.svelte.ts';
	import { LANG_INFO } from '#lib/i18n/langs.ts';
	import { COMPOUNDS, capitalize, type Compound } from '#lib/compounds.ts';
	import { calculate, formatUnits, school, working, type MolarMass } from '#lib/molar.ts';
	import { absolute, compoundPath, molarPath } from '#lib/seo.ts';
	import Formula from './Formula.svelte';
	import MolarBreakdown from './MolarBreakdown.svelte';
	import MolarValue from './MolarValue.svelte';
	import PageFooter from './PageFooter.svelte';
	import PageHead from './PageHead.svelte';
	import PageHeader from './PageHeader.svelte';

	let { compound }: { compound: Compound } = $props();

	let lang = $derived(app.lang);
	let t = $derived(app.t);
	let m = $derived(t.molar);

	let mass = $derived(calculate(compound.formula) as MolarMass);
	let value = $derived(formatUnits(mass.units, mass.digits, lang));
	let pathFor = $derived((l: typeof lang) => compoundPath(compound, l));

	// PubChem's value, rounded as PubChem rounds it, decides whether the two agree.
	let pubchemDigits = $derived(compound.pubchem.split('.')[1]?.length ?? 0);
	let agrees = $derived(formatUnits(mass.units, pubchemDigits, 'en') === compound.pubchem);
	let pubchem = $derived(
		new Intl.NumberFormat(LANG_INFO[lang].tag, {
			minimumFractionDigits: pubchemDigits
		}).format(Number(compound.pubchem))
	);

	let title = $derived(m.compound.title(compound.of[lang]));
	let description = $derived(
		m.compound.description(
			compound.of[lang],
			compound.formula,
			value,
			working(mass, lang),
			school(mass, lang).total
		)
	);

	let graph = $derived([
		{
			'@type': 'ChemicalSubstance',
			'@id': `${absolute(compoundPath(compound, lang))}#substance`,
			name: capitalize(compound.name[lang]),
			alternateName: [compound.formula, ...(compound.aka ? [compound.aka[lang]] : [])],
			chemicalComposition: compound.formula,
			url: absolute(compoundPath(compound, lang)),
			sameAs: [
				`https://pubchem.ncbi.nlm.nih.gov/compound/${compound.cid}`,
				`https://www.wikidata.org/wiki/${compound.wikidata}`
			]
		}
	]);
</script>

<PageHead
	title={m.compound.seoTitle(compound.of[lang], compound.formula, value)}
	{description}
	{pathFor}
	crumbs={[
		{ name: m.title, path: molarPath(lang) },
		{ name: title, path: compoundPath(compound, lang) }
	]}
	{graph}
/>

<PageHeader href={molarPath(lang)} label={m.compound.back} {pathFor} />

<main class="page">
	<h1>
		{title}
		<span class="formula"><Formula formula={compound.formula} /></span>
	</h1>
	{#if compound.aka}
		<p class="aka">{m.compound.aka} {compound.aka[lang]}</p>
	{/if}

	<div class="grid">
		<div class="card">
			<MolarValue {mass} />
		</div>

		<section aria-labelledby="how-heading">
			<h2 id="how-heading">{m.howCalculated}</h2>
			<MolarBreakdown {mass} formula={compound.formula} />
			<p class="note">
				{m.compound.sources}
				{agrees ? m.compound.pubchemSame(pubchem) : m.compound.pubchemDiff(pubchem)}
				<a href="https://pubchem.ncbi.nlm.nih.gov/compound/{compound.cid}">PubChem CID {compound.cid}</a>
			</p>
		</section>
	</div>

	<section class="another" aria-labelledby="another-heading">
		<h2 id="another-heading">{m.another}</h2>
		<form action={molarPath(lang)} method="get">
			<label class="visually-hidden" for="formula">{m.formula}</label>
			<input
				id="formula"
				name="f"
				placeholder={m.placeholder}
				autocomplete="off"
				autocapitalize="off"
				spellcheck="false"
				enterkeyhint="go"
			/>
			<button type="submit">{m.calculate}</button>
		</form>
		<ul class="chips">
			{#each COMPOUNDS.filter((c) => c !== compound) as c (c.slug)}
				<li>
					<a href={compoundPath(c, lang)} title={capitalize(c.name[lang])}
						><Formula formula={c.formula} /></a
					>
				</li>
			{/each}
		</ul>
	</section>
</main>

<PageFooter {pathFor} />

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
		margin: 28px 0 0;
		font-size: clamp(var(--step-3), 5vw, 3.1rem);
	}

	h1 .formula {
		display: block;
		margin-top: 6px;
		font-size: 1.25em;
	}

	h2 {
		margin-bottom: 14px;
		font-size: var(--step-2);
	}

	.aka {
		margin: 10px 0 0;
	}

	.grid {
		display: grid;
		gap: 32px;
		margin-top: 22px;
	}

	.card {
		padding: 16px;
		background: var(--surface);
		color: var(--on-surface);
		box-shadow: 6px 6px 0 var(--rule);
	}

	.note {
		margin: 12px 0 0;
		font-size: var(--step--1);
		opacity: 0.85;
	}

	.another {
		margin-top: 48px;
		padding-top: 22px;
		border-top: 2px solid var(--rule);
	}

	form {
		display: flex;
		gap: 8px;
		max-width: 560px;
	}

	input {
		flex: 1;
		min-width: 0;
		padding: 12px 16px;
		border: 2px solid var(--fg);
		border-radius: 12px;
		background: transparent;
		color: inherit;
		font: inherit;
		font-size: var(--step-1);
	}

	input::placeholder {
		color: inherit;
		opacity: 0.6;
	}

	button {
		padding: 0 22px;
		border: 0;
		border-radius: 999px;
		background: var(--fg);
		color: var(--bg);
		font: inherit;
		font-weight: 600;
		cursor: pointer;
	}

	@media (max-width: 600px) {
		form {
			flex-direction: column;
		}

		button {
			min-height: 48px;
		}
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin: 16px 0 0;
		padding: 0;
		list-style: none;
	}

	.chips a {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		padding: 0 16px;
		border: 1.5px solid var(--fg);
		border-radius: 999px;
		text-decoration: none;
	}

	.chips a:hover {
		background: color-mix(in srgb, var(--fg) 8%, transparent);
	}

	@media (min-width: 900px) {
		.page {
			width: min(100% - 96px, 1344px);
		}

		h1 {
			margin-top: 34px;
		}

		.grid {
			grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
			gap: 56px;
			align-items: start;
			margin-top: 30px;
		}

		.card {
			padding: 24px;
		}
	}
</style>
