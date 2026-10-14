<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { goto } from '$app/navigation';
	import { app } from '#lib/state.svelte.ts';
	import { LANG_INFO } from '#lib/i18n/langs.ts';
	import { COMPOUNDS, byFormula, capitalize } from '#lib/compounds.ts';
	import {
		calculate,
		formatUnits,
		isError,
		normalize,
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

	const EXAMPLE = 'H2SO4';
	const KEYS = ['(', ')', '·', '2', '3', '4'];

	let lang = $derived(app.lang);
	let t = $derived(app.t);
	let m = $derived(t.molar);

	let input = $state(EXAMPLE);
	/** The example is selected on first focus, so typing replaces it. */
	let edited = false;
	let field: HTMLInputElement | undefined = $state();

	let result = $derived(input.trim() ? calculate(input) : null);
	let error = $derived(result && isError(result) ? result : null);

	// While a formula is half-typed, the last good result stays on screen, faded.
	let last = { mass: calculate(EXAMPLE) as MolarMass, formula: EXAMPLE };
	let shown = $derived.by(() => {
		if (result && !isError(result)) last = { mass: result, formula: normalize(input) };
		return last;
	});
	let stale = $derived(!result || !!error);
	let compound = $derived(byFormula.get(shown.formula));

	// Errors wait for a pause in typing: "Ca(" is not a mistake yet.
	let showError = $state(false);
	$effect(() => {
		showError = false;
		if (!error) return;
		const id = setTimeout(() => (showError = true), 700);
		return () => clearTimeout(id);
	});

	// The formula goes into the address (?f=), so a result can be shared.
	$effect(() => {
		const formula = shown.formula;
		const id = setTimeout(() => {
			const url = new URL(location.href);
			if ((url.searchParams.get('f') ?? EXAMPLE) === formula) return;
			if (formula === EXAMPLE) url.searchParams.delete('f');
			else url.searchParams.set('f', formula);
			goto(url, { state: {}, shallow: true, replace: true });
		}, 400);
		return () => clearTimeout(id);
	});

	onMount(() => {
		const f = new URL(location.href).searchParams.get('f');
		if (f) {
			input = f;
			edited = true;
		}
	});

	function selectExample() {
		if (!edited && input === EXAMPLE) field?.select();
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
		if (e.kind === 'weight') return m.errors.weight(e.element.name[lang], e.element.symbol);
		return m.errors.syntax;
	}

	const popular = COMPOUNDS.map((c) => ({ c, mass: calculate(c.formula) as MolarMass }));
	const water = calculate('H2O') as MolarMass;

	let example = $derived(
		`M(H₂O) = ${working(water, lang)} = ${formatUnits(water.units, water.digits, lang)} ${m.unit}`
	);

	let graph = $derived([
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
	]);
</script>

<PageHead
	title={m.seoTitle}
	description={m.description}
	pathFor={molarPath}
	crumbs={[{ name: m.title, path: molarPath(lang) }]}
	{graph}
/>

<PageHeader href={homePath(lang)} label={t.privacy.back} pathFor={molarPath} />

<main class="page">
	<h1>{m.title}</h1>
	<p class="lead">{m.lead}</p>

	<div class="grid">
		<form
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
					onfocus={selectExample}
					onpointerup={selectExample}
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
					{#if error.kind === 'case' && error.suggestion}
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
				<MolarValue mass={shown.mass} />
			</div>
		</form>

		<section class="parts" class:stale aria-labelledby="parts-heading">
			<h2 id="parts-heading">{m.parts}</h2>
			<MolarBreakdown mass={shown.mass} formula={shown.formula} />
			<p class="note">{m.rounding}</p>
			{#if compound}
				<p class="more">
					<a href={compoundPath(compound, lang)}>{m.more}: {compound.name[lang]} →</a>
				</p>
			{/if}
		</section>
	</div>

	<section class="popular" aria-labelledby="popular-heading">
		<h2 id="popular-heading">{m.popular}</h2>
		<ul>
			{#each popular as { c, mass } (c.slug)}
				<li>
					<a href={compoundPath(c, lang)}>
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

<PageFooter pathFor={molarPath} />

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

	.more {
		margin: 14px 0 0;
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
