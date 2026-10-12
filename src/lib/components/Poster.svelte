<script lang="ts">
	import { Dialog } from 'bits-ui';
	import { cubicInOut } from 'svelte/easing';
	import { app } from '#lib/state.svelte.ts';
	import { elements, sources, type Element } from '#lib/elements.ts';
	import { formatConfig, formatMass, formatNumber, kelvinToCelsius } from '#lib/format.ts';
	import type { Term } from '#lib/i18n/ui.ts';
	import Shells from './Shells.svelte';

	let { element }: { element: Element | null } = $props();

	let e = $derived(element);
	let t = $derived(app.t);

	/** Term whose explanation is open; it stays open while stepping between elements. */
	let term = $state<Term | null>(null);
	const KEY_TERMS: Term[] = ['mass', 'group', 'period', 'block'];

	/** Grows the poster out of the clicked cell by animating its clip rectangle. */
	function expand(_node: HTMLElement, { rect }: { rect: DOMRect | null }) {
		const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (!rect || reduced) return { duration: reduced ? 0 : 200, css: (u: number) => `opacity:${u}` };
		const w = innerWidth;
		const h = innerHeight;
		return {
			duration: 560,
			easing: cubicInOut,
			css: (u: number) => {
				const k = 1 - u;
				return `clip-path: inset(${rect.top * k}px ${(w - rect.right) * k}px ${(h - rect.bottom) * k}px ${rect.left * k}px)`;
			}
		};
	}

	function close() {
		// Re-measure: the cell may have moved since opening (rotation, resize).
		const cell = e && document.querySelector<HTMLElement>(`.cell[data-z="${e.z}"]`);
		if (cell) app.origin = cell.getBoundingClientRect();
		app.close();
	}

	function onkeydown(event: KeyboardEvent) {
		if (!e) return;
		if (event.key === 'ArrowRight') app.step(e.z + 1);
		if (event.key === 'ArrowLeft') app.step(e.z - 1);
	}

	const celsius = (k: number | null) =>
		k === null
			? t.noData
			: `${formatNumber(kelvinToCelsius(k), app.lang, 1)} °C (${formatNumber(k, app.lang, 2)} K)`;
	const num = (v: number | null, unit: string, digits = 3) =>
		v === null ? t.noData : `${formatNumber(v, app.lang, digits)} ${unit}`;

	let facts = $derived.by(() => {
		if (!e) return [];
		const rows: [Term | null, string, string][] = [
			['meltingPoint', t.property.meltingPoint, celsius(e.meltingPoint)],
			['boilingPoint', t.boilingPoint, celsius(e.boilingPoint)],
			[
				'density',
				t.property.density,
				num(e.density, t.unit.density, e.density !== null && e.density < 0.1 ? 6 : 3)
			],
			[
				'electronegativity',
				t.property.electronegativity,
				num(e.electronegativity, t.unit.electronegativity, 2)
			],
			[
				'ionizationEnergy',
				t.property.ionizationEnergy,
				num(e.ionizationEnergy, t.unit.ionizationEnergy)
			],
			['electronAffinity', t.electronAffinity, num(e.electronAffinity, t.unit.ionizationEnergy)],
			['atomicRadius', t.property.atomicRadius, num(e.atomicRadius, t.unit.atomicRadius, 0)],
			[
				'oxidationStates',
				t.oxidationStates,
				e.oxidationStates.length ? e.oxidationStates.join(', ') : t.noData
			],
			[
				null,
				t.discovered,
				e.yearDiscovered === 'ancient' ? t.ancient : (e.yearDiscovered?.toString() ?? t.noData)
			]
		];
		return rows;
	});
</script>

{#snippet termButton(key: Term, label: string)}
	<button
		type="button"
		class="term"
		aria-expanded={term === key}
		title={t.explainToggle}
		onclick={() => (term = term === key ? null : key)}
	>
		{label}<span class="q" aria-hidden="true">?</span>
	</button>
{/snippet}

{#snippet explanation(key: Term)}
	{#if term === key}
		<p class="explain">{t.explain[key]}</p>
	{/if}
{/snippet}

<Dialog.Root
	open={e !== null}
	onOpenChange={(open) => {
		if (!open) close();
	}}
>
	<Dialog.Portal>
		<Dialog.Content forceMount>
			{#snippet child({ props, open })}
				{#if open && e}
					<div
						{...props}
						class="poster cat-{e.category}"
						transition:expand={{ rect: app.origin }}
						{onkeydown}
					>
						{#key e.z}
							<div class="layout">
								<header class="top">
									<Dialog.Title level={2} class="name">
										{e.name[app.lang]}
										{#if app.lang !== 'en'}<span class="alt" lang="en">{e.name.en}</span>{/if}
									</Dialog.Title>
									<nav class="nav">
										<button
											type="button"
											onclick={() => app.step(e.z - 1)}
											disabled={e.z === 1}
											aria-label={elements[e.z - 2]?.name[app.lang]}
										>
											←
										</button>
										<button
											type="button"
											onclick={() => app.step(e.z + 1)}
											disabled={e.z === elements.length}
											aria-label={elements[e.z]?.name[app.lang]}
										>
											→
										</button>
										<Dialog.Close class="close">{t.close}</Dialog.Close>
									</nav>
								</header>

								<div class="figure">
									<div class="disc swatch">
										<span class="symbol">{e.symbol}</span>
									</div>
									<div class="orbit">
										<Shells shells={e.shells} label="{t.shells}: {e.shells.join(', ')}" />
									</div>
									<p class="number" aria-label="Z = {e.z}">{e.z}</p>
									<span class="bar swatch" aria-hidden="true"></span>
								</div>

								<div class="data">
									<Dialog.Description class="lead">
										{t.category[e.category]}.
										{t.state[e.state]}{e.statePredicted ? ` (${t.predicted})` : ''}.
									</Dialog.Description>

									<dl class="key">
										<div>
											<dt>{@render termButton('mass', t.atomicMass)}</dt>
											<dd>
												{e.mass.text ? formatMass(e.mass.text, app.lang) : t.noData}
												{#if e.mass.source !== 'ciaaw'}<small>{t.massIsotope}</small>{/if}
											</dd>
										</div>
										<div>
											<dt>{@render termButton('group', t.group)}</dt>
											<dd>{e.group ?? '—'}</dd>
										</div>
										<div>
											<dt>{@render termButton('period', t.period)}</dt>
											<dd>{e.period}</dd>
										</div>
										<div>
											<dt>{@render termButton('block', t.block)}</dt>
											<dd class="letter">{e.block}</dd>
										</div>
									</dl>
									{#if term && KEY_TERMS.includes(term)}
										<p class="explain wide">{t.explain[term]}</p>
									{/if}

									<dl class="config">
										<div>
											<dt>{@render termButton('config', t.config)}</dt>
											<dd>
												{formatConfig(e.config)}
												{#if e.configPredicted}<small>{t.predicted}</small>{/if}
												{@render explanation('config')}
											</dd>
										</div>
										<div>
											<dt>{@render termButton('shells', t.shells)}</dt>
											<dd>
												{e.shells.join(', ')}
												{@render explanation('shells')}
											</dd>
										</div>
									</dl>

									<dl class="facts">
										{#each facts as [key, label, value] (label)}
											<div>
												<dt>
													{#if key}{@render termButton(key, label)}{:else}{label}{/if}
												</dt>
												<dd>
													{value}
													{#if key}{@render explanation(key)}{/if}
												</dd>
											</div>
										{/each}
									</dl>

									<p class="cite">
										<a href="https://pubchem.ncbi.nlm.nih.gov/element/{e.z}" target="_blank" rel="noreferrer">
											PubChem
										</a>,
										<a href={sources.atomicWeights} target="_blank" rel="noreferrer">IUPAC CIAAW</a>
									</p>
								</div>
							</div>
						{/key}
					</div>
				{/if}
			{/snippet}
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>

<style>
	.poster {
		position: fixed;
		inset: 0;
		z-index: 50;
		overflow-y: auto;
		background: var(--bg);
		color: var(--fg);
		outline: none;
	}

	.layout {
		display: grid;
		grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
		grid-template-areas:
			'top top'
			'figure data';
		gap: 24px clamp(24px, 5vw, 80px);
		min-height: 100%;
		padding: 20px clamp(16px, 4vw, 56px) 40px;
		animation: content-in 0.4s ease 0.3s backwards;
	}

	.top {
		grid-area: top;
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 16px;
		padding-bottom: 12px;
		border-bottom: 2px solid var(--rule);
	}

	.poster :global(.name) {
		margin: 0;
		font-family: var(--font-display);
		font-weight: 600;
		font-size: clamp(var(--step-3), 6vw, 5rem);
		line-height: 0.95;
		letter-spacing: -0.01em;
	}

	.alt {
		display: block;
		margin-top: 0.3em;
		font-family: var(--font-text);
		font-weight: 400;
		font-size: var(--step-0);
		letter-spacing: 0;
	}

	.nav {
		display: flex;
		flex: none;
		gap: 6px;
	}

	.nav button,
	.nav :global(.close) {
		min-width: 2.4em;
		height: 2.4em;
		padding: 0 0.9em;
		border: 1.5px solid var(--rule);
		border-radius: 999px;
		background: transparent;
		color: inherit;
		cursor: pointer;
		font: inherit;
		font-size: var(--step--1);
	}

	.nav button:disabled {
		opacity: 0.3;
		cursor: default;
	}

	.nav :global(.close) {
		background: var(--fg);
		color: var(--bg);
	}

	.figure {
		grid-area: figure;
		position: relative;
		align-self: start;
		aspect-ratio: 1;
		max-width: 560px;
		width: 100%;
	}

	.disc {
		position: absolute;
		inset: 28%;
		display: grid;
		place-items: center;
		border-radius: 50%;
	}

	.symbol {
		font-family: var(--font-display);
		font-weight: 600;
		font-size: clamp(3rem, 9vw, 8rem);
		line-height: 1;
	}

	.orbit,
	.orbit :global(svg) {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.number {
		position: absolute;
		right: -2%;
		bottom: 2%;
		margin: 0;
		padding: 0.05em 0.12em 0;
		background: var(--paper);
		color: var(--raspberry);
		font-family: var(--font-numeral);
		font-size: clamp(4rem, 11vw, 9rem);
		line-height: 0.9;
	}

	.bar {
		position: absolute;
		left: 0;
		right: 30%;
		bottom: -18px;
		height: 12px;
	}

	.data {
		grid-area: data;
		min-width: 0;
		max-width: 64ch;
	}

	.poster :global(.lead) {
		margin: 0 0 20px;
		font-size: var(--step-1);
		line-height: 1.35;
	}

	dl {
		margin: 0 0 24px;
	}

	dl > div {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1.3fr);
		gap: 12px;
		padding: 7px 0;
		border-top: 1px solid color-mix(in srgb, var(--rule) 45%, transparent);
	}

	dt {
		font-size: var(--step--1);
	}

	dd {
		margin: 0;
		font-variant-numeric: tabular-nums;
	}

	dd small {
		display: block;
		font-size: var(--step--2);
		opacity: 0.75;
	}

	.key {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 0 12px;
	}

	.key > div {
		grid-template-columns: 1fr;
		gap: 2px;
		border-top: 2px solid var(--rule);
	}

	.key dd {
		font-family: var(--font-numeral);
		font-size: var(--step-3);
		line-height: 1;
	}

	.key .letter {
		font-family: var(--font-display);
		font-size: var(--step-2);
		line-height: 1.15;
	}

	.key .letter {
		font-family: var(--font-display);
		font-size: var(--step-2);
		line-height: 1.15;
	}

	.key div:first-child dd small {
		font-family: var(--font-text);
	}

	.cite {
		font-size: var(--step--1);
	}

	.term {
		display: inline-flex;
		align-items: center;
		gap: 0.4em;
		padding: 0;
		border: 0;
		background: none;
		cursor: pointer;
		font-size: var(--step--1);
		text-align: left;
		text-decoration: underline dotted;
		text-underline-offset: 0.25em;
	}

	.q {
		display: inline-grid;
		place-items: center;
		flex: none;
		width: 1.3em;
		height: 1.3em;
		border: 1.25px solid currentColor;
		border-radius: 50%;
		font-size: 0.8em;
		line-height: 1;
		text-decoration: none;
	}

	.term[aria-expanded='true'] .q {
		background: var(--fg);
		color: var(--bg);
	}

	.explain {
		margin: 6px 0 2px;
		font-family: var(--font-text);
		font-size: var(--step--1);
		line-height: 1.45;
		max-width: 52ch;
	}

	.explain.wide {
		margin: -12px 0 24px;
		padding-left: 12px;
		border-left: 3px solid var(--rule);
	}

	@keyframes content-in {
		from {
			opacity: 0;
		}
	}

	@media (max-width: 760px) {
		.layout {
			grid-template-columns: minmax(0, 1fr);
			grid-template-areas: 'top' 'figure' 'data';
		}
		.top {
			flex-direction: column;
			align-items: stretch;
		}
		.nav {
			justify-content: flex-end;
		}
		.figure {
			max-width: 360px;
			justify-self: center;
		}
		.key {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
</style>
