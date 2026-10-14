<script lang="ts">
	import { onMount, tick, untrack } from 'svelte';
	import { afterNavigate, goto } from '$app/navigation';
	import { app } from '#lib/state.svelte.ts';
	import { LANG_INFO, type Lang } from '#lib/i18n/langs.ts';
	import { COMPOUNDS, byCompoundSlug, byFormula, capitalize, type Compound } from '#lib/compounds.ts';
	import {
		calculate,
		formatUnits,
		isError,
		normalize,
		school,
		working,
		type FormulaError,
		type MolarMass
	} from '#lib/molar.ts';
	import { absolute, compoundPath, homePath, molarPath } from '#lib/seo.ts';
	import Formula from './Formula.svelte';
	import MolarBreakdown from './MolarBreakdown.svelte';
	import MolarValue from './MolarValue.svelte';
	import PageFooter from './PageFooter.svelte';
	import PageHead from './PageHead.svelte';
	import PageHeader from './PageHeader.svelte';

	/**
	 * The calculator, on /molar-mass and on every substance page (/molar-mass/water): one page
	 * whose address follows the formula. A substance page is the calculator with its formula
	 * typed in, its own title and description for search engines.
	 */
	let { compound: substance }: { compound?: Compound } = $props();

	const EXAMPLE = 'H2SO4';
	const KEYS = ['(', ')', '·', '2', '3', '4'];

	let lang = $derived(app.lang);
	let t = $derived(app.t);
	let m = $derived(t.molar);

	const start = untrack(() => substance?.formula ?? EXAMPLE);
	let input = $state(start);
	/** The starting formula is selected on first focus, so typing replaces it. */
	let edited = false;
	let field: HTMLInputElement | undefined = $state();
	let card: HTMLElement | undefined = $state();

	let result = $derived(input.trim() ? calculate(input) : null);
	let error = $derived(result && isError(result) ? result : null);

	// While a formula is half-typed, the last good result stays on screen, faded.
	let last = { mass: calculate(start) as MolarMass, formula: start };
	let shown = $derived.by(() => {
		if (result && !isError(result)) last = { mass: result, formula: normalize(input) };
		return last;
	});
	let stale = $derived(!result || !!error);
	/** The substance on screen, if it has a page: its name, other name and PubChem check. */
	let compound = $derived(byFormula.get(shown.formula));

	// PubChem's value, rounded as PubChem rounds it, decides whether the two agree.
	let pubchem = $derived.by(() => {
		if (!compound) return null;
		const digits = compound.pubchem.split('.')[1]?.length ?? 0;
		const value = new Intl.NumberFormat(LANG_INFO[lang].tag, { minimumFractionDigits: digits }).format(
			Number(compound.pubchem)
		);
		const agrees = formatUnits(shown.mass.units, digits, 'en') === compound.pubchem;
		return agrees ? m.compound.pubchemSame(value) : m.compound.pubchemDiff(value);
	});

	// Errors wait for a pause in typing: "Ca(" is not a mistake yet.
	let showError = $state(false);
	$effect(() => {
		showError = false;
		if (!error) return;
		const id = setTimeout(() => (showError = true), 700);
		return () => clearTimeout(id);
	});

	/** A substance with a page has that address; any other formula is the calculator with ?f=. */
	function address(formula: string): URL {
		const known = byFormula.get(formula);
		const url = new URL(known ? compoundPath(known, lang) : molarPath(lang), location.origin);
		if (!known) url.searchParams.set('f', formula);
		return url;
	}

	// The address follows the formula, so a result can be shared and Back leaves the calculator.
	// The page stays: the calculator lives in the molar-mass layout, and focus and scroll are kept.
	$effect(() => {
		const formula = shown.formula;
		if (!edited) return;
		const id = setTimeout(() => {
			const url = address(formula);
			if (url.pathname + url.search !== location.pathname + location.search)
				goto(url, { replace: true, reset: false });
		}, 400);
		return () => clearTimeout(id);
	});

	onMount(() => {
		const f = new URL(location.href).searchParams.get('f');
		if (f && !substance) {
			input = f;
			edited = true;
		}
	});

	// Back and Forward between substances bring their formula back into the field.
	afterNavigate(({ type, to }) => {
		if (type !== 'popstate' || !to) return;
		const known = byCompoundSlug.get(to.params?.compound ?? '');
		input = known?.formula ?? to.url.searchParams.get('f') ?? EXAMPLE;
		// The address is already the formula's: the example on /molar-mass must not turn into its page.
		edited = false;
	});

	/** A substance from the list goes into the field; its page address comes with it. */
	function pick(event: MouseEvent, c: Compound) {
		if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
		event.preventDefault();
		input = c.formula;
		edited = true;
		goto(compoundPath(c, lang), { reset: false });
		// The list is below the fold: bring the result back into view.
		if (card && card.getBoundingClientRect().top < 0) {
			const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
			card.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
		}
	}

	function selectStart() {
		if (!edited && input === start) field?.select();
	}

	async function insert(text: string) {
		if (!field) return;
		const start = field.selectionStart ?? input.length;
		const end = field.selectionEnd ?? start;
		input = input.slice(0, start) + text + input.slice(end);
		edited = true;
		await tick();
		field.focus();
		field.setSelectionRange(start + text.length, start + text.length);
	}

	function errorText(e: FormulaError): string {
		if (e.kind === 'symbol') return m.errors.symbol(e.symbol);
		if (e.kind === 'case') return m.errors.case;
		if (e.kind === 'coefficient') return m.errors.coefficient;
		if (e.kind === 'weight') return m.errors.weight(e.element.name[lang], e.element.symbol);
		return m.errors.syntax;
	}

	const popular = COMPOUNDS.map((c) => ({ c, mass: calculate(c.formula) as MolarMass }));
	const water = calculate('H2O') as MolarMass;

	let example = $derived(
		`M(H₂O) = ${working(water, lang)} = ${formatUnits(water.units, water.digits, lang)} ${m.unit}`
	);

	// Search engines see the page of the address: the calculator, or one substance.
	let pathFor = $derived(substance ? (l: Lang) => compoundPath(substance, l) : molarPath);
	let head = $derived.by(() => {
		if (!substance) return { title: m.seoTitle, description: m.description, heading: m.title };
		const mass = calculate(substance.formula) as MolarMass;
		const value = formatUnits(mass.units, mass.digits, lang);
		const of = substance.of[lang];
		return {
			title: m.compound.seoTitle(of, substance.formula, value),
			description: m.compound.description(of, substance.formula, value, working(mass, lang), school(mass, lang).total),
			heading: m.compound.title(of)
		};
	});
	let crumbs = $derived([
		{ name: m.title, path: molarPath(lang) },
		...(substance ? [{ name: head.heading, path: compoundPath(substance, lang) }] : [])
	]);
	let graph = $derived(
		substance
			? [
					{
						'@type': 'ChemicalSubstance',
						'@id': `${absolute(compoundPath(substance, lang))}#substance`,
						name: capitalize(substance.name[lang]),
						alternateName: [substance.formula, ...(substance.aka ? [substance.aka[lang]] : [])],
						chemicalComposition: substance.formula,
						url: absolute(compoundPath(substance, lang)),
						sameAs: [
							`https://pubchem.ncbi.nlm.nih.gov/compound/${substance.cid}`,
							`https://www.wikidata.org/wiki/${substance.wikidata}`
						]
					}
				]
			: [
					{
						'@type': 'WebApplication',
						name: m.title,
						url: absolute(molarPath(lang)),
						applicationCategory: 'EducationalApplication',
						operatingSystem: 'Any',
						inLanguage: LANG_INFO[lang].tag,
						isAccessibleForFree: true,
						offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' }
					}
				]
	);
</script>

<PageHead title={head.title} description={head.description} {pathFor} {crumbs} {graph} />

<PageHeader href={homePath(lang)} label={t.privacy.back} {pathFor} />

<main class="page">
	<h1>{head.heading}</h1>
	<p class="lead">{m.lead}</p>

	<div class="grid">
		<form
			bind:this={card}
			class="card"
			action={molarPath(lang)}
			method="get"
			onsubmit={(e) => {
				e.preventDefault();
				field?.blur();
			}}
		>
			<label for="formula">{m.formula}</label>
			<div class="field">
				<input
					id="formula"
					name="f"
					bind:this={field}
					bind:value={input}
					oninput={() => (edited = true)}
					onfocus={selectStart}
					onpointerup={selectStart}
					placeholder={m.placeholder}
					autocomplete="off"
					autocapitalize="off"
					spellcheck="false"
					enterkeyhint="done"
					aria-invalid={showError && !!error}
					aria-describedby={showError && error ? 'formula-error' : undefined}
				/>
				{#if input}
					<button
						type="button"
						class="clear"
						aria-label={m.clear}
						onclick={() => {
							input = '';
							edited = true;
							field?.focus();
						}}>✕</button
					>
				{/if}
			</div>
			<div class="keys">
				{#each KEYS as key (key)}
					<!-- Pointer down would move focus off the field and close the phone keyboard. -->
					<button
						type="button"
						aria-label="{m.insert} {key}"
						onpointerdown={(e) => e.preventDefault()}
						onclick={() => insert(key)}>{key}</button
					>
				{/each}
			</div>

			{#if showError && error}
				<p class="error" id="formula-error" role="alert">
					{errorText(error)}
					{#if (error.kind === 'case' || error.kind === 'coefficient') && error.suggestion}
						{@const suggestion = error.suggestion}
						{m.errors.suggest[0]}
						<button type="button" class="suggestion" onclick={() => (input = suggestion)}
							><Formula formula={suggestion} /></button
						>{m.errors.suggest[1]}
					{/if}
				</p>
			{/if}

			<div class="result" class:stale aria-live="polite">
				<p class="title">
					<span class="formula"><Formula formula={shown.formula} /></span>
					{#if compound}<span class="what">{compound.name[lang]}</span>{/if}
				</p>
				{#if compound?.aka}
					<p class="aside">{m.compound.aka} {compound.aka[lang]}</p>
				{/if}
				{#if compound?.note}
					<p class="aside">{compound.note[lang]}</p>
				{/if}
				<MolarValue mass={shown.mass} />
			</div>
		</form>

		<section class="parts" class:stale aria-labelledby="parts-heading">
			<h2 id="parts-heading">{m.parts}</h2>
			<MolarBreakdown mass={shown.mass} formula={shown.formula} />
			<p class="note">
				{m.rounding}
				{m.compound.sources}
				{#if compound}
					{pubchem}
					<a href="https://pubchem.ncbi.nlm.nih.gov/compound/{compound.cid}">PubChem CID {compound.cid}</a>
				{/if}
			</p>
		</section>
	</div>

	<section class="popular" aria-labelledby="popular-heading">
		<h2 id="popular-heading">{m.popular}</h2>
		<ul>
			{#each popular as { c, mass } (c.slug)}
				<li>
					<a
						href={compoundPath(c, lang)}
						aria-current={c === compound ? 'true' : undefined}
						onclick={(event) => pick(event, c)}
					>
						<span class="formula"><Formula formula={c.formula} /></span>
						<span class="name">{capitalize(c.name[lang])}</span>
						<span class="number">{formatUnits(mass.units, mass.digits, lang)}</span>
					</a>
				</li>
			{/each}
		</ul>
	</section>

	<section class="explain" aria-labelledby="explain-heading">
		<h2 id="explain-heading">{m.whatIs}</h2>
		{#each m.whatIsText(example) as paragraph, i (i)}
			<p>{paragraph}</p>
		{/each}
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
		margin: 28px 0 10px;
		font-size: clamp(var(--step-3), 5vw, 3.1rem);
	}

	h2 {
		margin-bottom: 14px;
		font-size: var(--step-2);
	}

	.lead {
		max-width: 68ch;
		margin: 0;
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
		/* Room above it when a substance picked from the list scrolls it back into view. */
		scroll-margin-top: 16px;
	}

	label {
		display: block;
		margin-bottom: 6px;
		font-size: var(--step--1);
	}

	.field {
		position: relative;
	}

	input {
		width: 100%;
		padding: 12px 52px 12px 16px;
		border: 2px solid var(--on-surface);
		border-radius: 12px;
		background: var(--field);
		color: inherit;
		font: inherit;
		font-size: var(--step-2);
	}

	input:focus-visible {
		outline: 3px solid var(--on-surface);
		outline-offset: 2px;
	}

	input[aria-invalid='true'] {
		border-color: var(--raspberry);
	}

	.clear {
		position: absolute;
		top: 50%;
		right: 6px;
		width: 44px;
		height: 44px;
		translate: 0 -50%;
		border: 0;
		background: none;
		color: inherit;
		font-size: 18px;
		opacity: 0.65;
		cursor: pointer;
	}

	.keys {
		display: none;
		gap: 6px;
		margin-top: 10px;
	}

	.keys button {
		flex: 1;
		height: 44px;
		border: 1.5px solid var(--on-surface);
		border-radius: 10px;
		background: none;
		color: inherit;
		font: inherit;
		font-size: var(--step-1);
	}

	.error {
		margin: 10px 0 0;
		font-size: var(--step--1);
	}

	.suggestion {
		padding: 0;
		border: 0;
		background: none;
		color: inherit;
		font: inherit;
		font-weight: 600;
		text-decoration: underline;
		cursor: pointer;
	}

	.result {
		margin-top: 18px;
		padding-top: 14px;
		border-top: 1.5px solid var(--on-surface);
		transition: opacity 0.2s;
	}

	.stale {
		opacity: 0.45;
	}

	.parts {
		transition: opacity 0.2s;
	}

	.title {
		display: flex;
		flex-wrap: wrap;
		gap: 4px 14px;
		align-items: baseline;
		margin: 0 0 14px;
	}

	.title .formula {
		font-family: var(--font-display);
		font-size: 40px;
		font-weight: 600;
		line-height: 1;
	}

	.what {
		font-size: var(--step-0);
	}

	.note {
		margin: 12px 0 0;
		font-size: var(--step--1);
		opacity: 0.85;
	}

	.aside {
		margin: -6px 0 14px;
		font-size: var(--step--1);
	}

	.popular,
	.explain {
		margin-top: 48px;
		padding-top: 22px;
		border-top: 2px solid var(--rule);
	}

	.popular ul {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 10px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.popular a {
		display: grid;
		gap: 2px;
		height: 100%;
		padding: 12px 14px;
		border: 1.5px solid var(--fg);
		text-decoration: none;
	}

	.popular a:hover {
		background: color-mix(in srgb, var(--fg) 8%, transparent);
	}

	/* The substance in the field: framed like the current page in the cells below. */
	.popular a[aria-current] {
		box-shadow: inset 0 0 0 1.5px var(--fg);
	}

	.popular .formula {
		font-family: var(--font-display);
		font-size: 26px;
		font-weight: 600;
		line-height: 1.1;
	}

	.popular .name {
		font-size: var(--step--1);
	}

	.popular .number {
		margin-top: 6px;
		font-family: var(--font-numeral);
		font-size: 28px;
		line-height: 1;
	}

	.explain p {
		max-width: 68ch;
		margin: 0 0 0.8em;
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

		.popular ul {
			grid-template-columns: repeat(6, minmax(0, 1fr));
			gap: 12px;
		}
	}

	@media (min-width: 600px) and (max-width: 899px) {
		.popular ul {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}

	/* Phones: brackets, the hydrate dot and digits sit behind a keyboard switch, so they get keys. */
	@media (max-width: 760px) {
		.keys {
			display: flex;
		}
	}
</style>
