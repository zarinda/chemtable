<script lang="ts">
	import { Dialog } from 'bits-ui';
	import { cubicInOut } from 'svelte/easing';
	import { app } from '#lib/state.svelte.ts';
	import { elements, sources, type Element } from '#lib/elements.ts';
	import { formatConfig, formatMass, formatNames, formatNumber, kelvinToCelsius } from '#lib/format.ts';
	import type { Term } from '#lib/i18n/ui.ts';
	import Shells from './Shells.svelte';
	import { dev } from '$app/env';
	import { showAds, adOnTop } from '#lib/ads.ts';
	import Related from './Related.svelte';

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

	/**
	 * Focus the poster itself, not its first button: a page opened from search would otherwise
	 * greet the visitor with a focus ring on "←". Arrow keys and Escape work from the poster.
	 * Done on mount: on a page opened by URL the poster mounts after Bits UI's autofocus event.
	 */
	function focusOnMount(node: HTMLElement) {
		requestAnimationFrame(() => {
			if (!node.contains(document.activeElement)) node.focus({ preventScroll: true });
		});
	}

	function onkeydown(event: KeyboardEvent) {
		if (!e) return;
		if (event.key === 'ArrowRight') app.step(e.z + 1);
		if (event.key === 'ArrowLeft') app.step(e.z - 1);
	}

	/** Phones size the heading by name length, so Rutherfordium fits beside the cell unbroken. */
	const nameSize = (name: string) => (name.length > 10 ? 'long' : name.length > 7 ? 'mid' : '');

	const celsius =(k: number | null, note = false, noteText = '') =>
		k === null
			? t.noData
			: `${formatNumber(kelvinToCelsius(k), app.lang, 1)} °C (${formatNumber(k, app.lang, 2)} K)` +
				(note ? `, ${noteText}` : '');
	const num = (v: number | null, unit: string, digits = 3) =>
		v === null ? t.noData : `${formatNumber(v, app.lang, digits)} ${unit}`;
	const affinity = (v: number | 'unstable' | null) =>
		v === 'unstable' ? t.anionUnstable : num(v, t.unit.ionizationEnergy);

	let facts = $derived.by(() => {
		if (!e) return [];
		const rows: [Term | null, string, string][] = [
			['meltingPoint', t.property.meltingPoint, celsius(e.meltingPoint, e.meltsUnderPressure, t.underPressure)],
			['boilingPoint', t.boilingPoint, celsius(e.boilingPoint, e.sublimes, t.sublimes)],
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
			['electronAffinity', t.electronAffinity, affinity(e.electronAffinity)],
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
		if (e.discoveredBy.length) rows.push([null, t.discoveredBy, formatNames(e.discoveredBy, app.lang)]);
		if (e.namedAfter.length) rows.push([null, t.namedAfter, formatNames(e.namedAfter, app.lang)]);
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
		<span class="label">{label}</span><span class="q" aria-hidden="true">?</span>
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
	<!--
		Rendered in place, not portalled: a portal mounts only in the browser, so an element page
		opened by URL showed the table until JS loaded. The poster is a root-level fixed layer anyway.
	-->
	<Dialog.Portal disabled>
		<Dialog.Content forceMount onOpenAutoFocus={(event) => event.preventDefault()}>
			{#snippet child({ props, open })}
				{#if open && e}
					<div
						{...props}
						class="poster cat-{e.category}"
						tabindex="-1"
						{@attach focusOnMount}
						transition:expand={{ rect: app.origin }}
						{onkeydown}
					>
						{#key e.z}
							<div class="layout" class:ad-bottom={showAds() && !adOnTop()} class:ad-top={showAds() && adOnTop()}>
								<header class="top">
									<!-- Phones: the element's cell heads the page; the orbit figure moves below the data. -->
									<div class="tile swatch" aria-hidden="true">
										<span class="tile-z">{e.z}</span>
										<span class="tile-symbol">{e.symbol}</span>
									</div>
									<Dialog.Title level={2} class="name {nameSize(e.name[app.lang])}">
										{e.name[app.lang]}
										{#if e.name[app.lang] !== e.name.en}<span class="alt" lang="en">{e.name.en}</span>{/if}
									</Dialog.Title>
									<nav class="nav">
										<button
											type="button"
											onclick={() => app.step(e.z - 1)}
											disabled={e.z === 1}
											aria-label={elements[e.z - 2]?.name[app.lang]}
										>
											←<span class="neighbour">{elements[e.z - 2]?.symbol}</span>
										</button>
										<button
											type="button"
											onclick={() => app.step(e.z + 1)}
											disabled={e.z === elements.length}
											aria-label={elements[e.z]?.name[app.lang]}
										>
											<span class="neighbour">{elements[e.z]?.symbol}</span>→
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
										<a href={sources.atomicWeights} target="_blank" rel="noreferrer">IUPAC CIAAW</a>,
										<a href={sources.ionizationEnergies} target="_blank" rel="noreferrer">NIST</a>
									</p>
								</div>

								{#if dev && showAds()}
									{#await import('./AdPreview.svelte') then { default: AdPreview }}
										<div class="ad-slot"><AdPreview format="banner" /></div>
									{/await}
								{/if}

								<div class="more"><Related element={e} /></div>
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
			'figure data'
			'more more';
		gap: 24px clamp(24px, 5vw, 80px);
		min-height: 100%;
		padding: 20px clamp(16px, 4vw, 56px) 40px;
		animation: content-in 0.4s ease 0.3s backwards;
	}

	.layout.ad-bottom {
		grid-template-areas:
			'top top'
			'figure data'
			'ad ad'
			'more more';
	}

	.layout.ad-top {
		grid-template-areas:
			'top top'
			'ad ad'
			'figure data'
			'more more';
	}

	.ad-slot {
		grid-area: ad;
		display: grid;
		padding-top: 16px;
	}

	/* Clear space from the ad, so taps meant for the links don't land on it. */
	.more {
		grid-area: more;
		min-width: 0;
		margin-top: 32px;
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
		max-width: 100%;
		padding: 0;
		border: 0;
		background: none;
		cursor: pointer;
		font-size: var(--step--1);
		text-align: left;
		text-decoration: underline dotted;
		text-underline-offset: 0.25em;
	}

	/*
	 * Single long words (Elektronenkonfiguration) would run into the value on phones. Phones hyphenate
	 * by <html lang>; a browser without the dictionary breaks the word anywhere instead.
	 */
	.label {
		min-width: 0;
		-webkit-hyphens: auto;
		hyphens: auto;
		overflow-wrap: anywhere;
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

	.tile,
	.neighbour {
		display: none;
	}

	/*
	 * Phones: visitors from search come for a number, so the data comes first. The element's cell
	 * heads the page, the orbit figure follows the data, and the buttons sit under the thumb.
	 */
	@media (max-width: 760px) {
		.layout {
			grid-template-columns: minmax(0, 1fr);
			grid-template-areas: 'top' 'data' 'figure' 'more';
			row-gap: 16px;
			padding-top: 16px;
			/* Room for the button bar. */
			padding-bottom: calc(96px + env(safe-area-inset-bottom));
		}
		.layout.ad-bottom {
			grid-template-areas: 'top' 'data' 'ad' 'figure' 'more';
		}
		.layout.ad-top {
			grid-template-areas: 'top' 'ad' 'data' 'figure' 'more';
		}

		.top {
			display: grid;
			grid-template-columns: auto minmax(0, 1fr);
			align-items: center;
			gap: 16px;
			padding-bottom: 16px;
		}

		.tile {
			display: grid;
			grid-template-rows: auto 1fr;
			width: 96px;
			height: 96px;
			padding: 6px 8px;
			box-shadow: 5px 5px 0 var(--rule);
		}

		.tile-z {
			font-family: var(--font-numeral);
			font-size: var(--step-1);
			line-height: 1;
			color: var(--raspberry);
		}

		.tile-symbol {
			align-self: center;
			font-family: var(--font-display);
			font-weight: 600;
			font-size: 3rem;
			line-height: 1;
		}

		.poster :global(.name) {
			font-size: 2.75rem;
			-webkit-hyphens: auto;
			hyphens: auto;
			overflow-wrap: anywhere;
		}

		.poster :global(.name.mid) {
			font-size: 2.25rem;
		}

		.poster :global(.name.long) {
			font-size: 1.875rem;
		}

		.alt {
			margin-top: 0.4em;
			font-size: var(--step--1);
		}

		.nav {
			position: fixed;
			z-index: 1;
			left: 0;
			right: 0;
			bottom: 0;
			display: grid;
			grid-template-columns: 1fr auto 1fr;
			grid-template-areas: 'prev close next';
			gap: 8px;
			padding: 10px var(--gutter) calc(14px + env(safe-area-inset-bottom));
			border-top: 2px solid var(--rule);
			background: var(--bg);
		}

		.nav button,
		.nav :global(.close) {
			height: 48px;
			font-size: var(--step-0);
		}

		.nav button:first-child {
			grid-area: prev;
			justify-self: start;
		}

		.nav button:nth-child(2) {
			grid-area: next;
			justify-self: end;
		}

		.nav :global(.close) {
			grid-area: close;
			padding: 0 1.4em;
			font-weight: 600;
		}

		.neighbour {
			display: inline;
			margin: 0 0.35em;
			font-family: var(--font-display);
			font-weight: 600;
		}

		.poster :global(.lead) {
			margin-bottom: 12px;
			font-size: var(--step-0);
		}

		.key {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 0 18px;
		}

		.key > div {
			padding: 10px 0 12px;
		}

		.key dd {
			margin-top: 4px;
		}

		/* Label above the value: long labels no longer wrap into a narrow column. */
		.config > div,
		.facts > div {
			grid-template-columns: minmax(0, 1fr);
			gap: 4px;
			padding: 11px 0;
		}

		.config dd,
		.facts dd {
			font-size: 1.0625rem;
		}

		.figure {
			max-width: 300px;
			justify-self: center;
		}

		/* The cell at the top already shows the number. */
		.number,
		.bar {
			display: none;
		}
	}
</style>
