<script lang="ts">
	import { app, cellOf } from '#lib/state.svelte.ts';
	import { elements, propertyValue } from '#lib/elements.ts';
	import { formatMass, formatNumber, kelvinToCelsius } from '#lib/format.ts';
	import { elementPath } from '#lib/seo.ts';

	let e = $derived(elements[app.pickedZ - 1]);
	let t = $derived(app.t);
	let name = $derived(e.name[app.lang]);
	let prev = $derived(elements[e.z - 2]);
	let next = $derived(elements[e.z]);

	/** The heat map's property, so the card answers what the colours show; else the atomic mass. */
	let reading = $derived.by(() => {
		if (app.mode === 'category' || app.mode === 'mass') {
			return {
				label: t.atomicMass,
				value: e.mass.text ? formatMass(e.mass.text, app.lang) : null,
				unit: '',
				note: e.mass.text && e.mass.source !== 'ciaaw' ? t.massIsotope : null
			};
		}
		const v = propertyValue(e, app.mode);
		const shown = app.mode === 'meltingPoint' && v !== null ? kelvinToCelsius(v) : v;
		return {
			label: t.property[app.mode],
			value: shown === null ? null : formatNumber(shown, app.lang, 5),
			unit: t.unit[app.mode],
			note: null
		};
	});

	function open(event: MouseEvent) {
		if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
		event.preventDefault();
		app.open(e, cellOf(e.z) ?? (event.currentTarget as HTMLElement));
	}
</script>

<!-- Phones: the element picked on the map, with targets big enough for a thumb (WCAG 2.5.8). -->
<section class="card">
	<div class="tile swatch cat-{e.category}" aria-hidden="true">
		<span class="tile-z">{e.z}</span>
		<span class="tile-symbol">{e.symbol}</span>
		<span class="tile-caption">{name}</span>
	</div>
	<div class="info">
		<p class="title" aria-live="polite">
			<span class="visually-hidden">{e.z} {e.symbol}, </span>{name}
		</p>
		{#if name !== e.name.en}<p class="alt" lang="en">{e.name.en}</p>{/if}
		<p class="kind">
			{t.category[e.category]} · {t.state[e.state]}{e.statePredicted ? ` (${t.predicted})` : ''}
		</p>
		<p class="reading">
			{reading.label}
			{#if reading.value === null}
				<span class="missing">{t.noData}</span>
			{:else}
				<span class="value">{reading.value}<small>{reading.unit}</small></span>
			{/if}
			{#if reading.note}<small>{reading.note}</small>{/if}
		</p>
	</div>
	<div class="actions">
		<button
			type="button"
			class="round"
			onclick={() => (app.picked = e.z - 1)}
			disabled={!prev}
			aria-label="{t.article.previous}{prev ? `: ${prev.name[app.lang]}` : ''}">←</button
		>
		<button
			type="button"
			class="round"
			onclick={() => (app.picked = e.z + 1)}
			disabled={!next}
			aria-label="{t.article.next}{next ? `: ${next.name[app.lang]}` : ''}">→</button
		>
		<a class="open" href={elementPath(e, app.lang)} onclick={open}
			>{t.open}<span class="visually-hidden">: {name}</span><span aria-hidden="true">&nbsp;›</span></a
		>
	</div>
</section>

<style>
	.card {
		display: none;
	}

	@media (max-width: 760px) and (orientation: portrait) {
		.card {
			order: 2;
			display: grid;
			grid-template-columns: 104px minmax(0, 1fr);
			gap: 14px;
			margin: 18px var(--gutter) 0;
			padding: 14px;
			background: var(--surface);
			color: var(--on-surface);
			box-shadow: 6px 6px 0 var(--rule);
		}

		.tile {
			display: grid;
			grid-template-rows: auto 1fr auto;
			width: 104px;
			height: 104px;
			padding: 7px 9px;
		}

		.tile-z {
			font-family: var(--font-numeral);
			font-size: 24px;
			line-height: 1;
		}

		.tile-symbol {
			align-self: center;
			font-family: var(--font-display);
			font-weight: 600;
			font-size: 50px;
			line-height: 1;
		}

		.tile-caption {
			overflow: hidden;
			font-size: 10px;
			line-height: 1.1;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		.info {
			min-width: 0;
		}

		p {
			margin: 0;
		}

		.title {
			font-family: var(--font-display);
			font-weight: 600;
			font-size: 1.875rem;
			line-height: 1.05;
			overflow-wrap: anywhere;
		}

		.alt {
			margin-top: 2px;
			font-size: var(--step--1);
			opacity: 0.7;
		}

		.kind {
			margin-top: 8px;
			font-size: var(--step--1);
		}

		.reading {
			margin-top: 10px;
			font-size: var(--step--2);
		}

		.value {
			display: block;
			font-family: var(--font-numeral);
			font-size: 1.875rem;
			line-height: 1;
			font-variant-numeric: tabular-nums;
		}

		small,
		.missing {
			font-size: var(--step--2);
		}

		.value small {
			margin-left: 0.35em;
			font-family: var(--font-text);
			font-size: var(--step--1);
		}

		.missing {
			display: block;
			margin-top: 4px;
			font-size: var(--step-0);
		}

		.actions {
			grid-column: 1 / -1;
			display: flex;
			align-items: center;
			gap: 8px;
			padding-top: 12px;
			border-top: 1.5px solid var(--on-surface);
		}

		.round {
			display: grid;
			place-items: center;
			width: 44px;
			height: 44px;
			border: 1.5px solid var(--on-surface);
			border-radius: 50%;
			background: transparent;
			cursor: pointer;
			font-size: 18px;
			line-height: 1;
		}

		.round:disabled {
			opacity: 0.3;
			cursor: default;
		}

		.open {
			margin-left: auto;
			padding: 11px 18px;
			border-radius: 999px;
			background: var(--on-surface);
			color: var(--surface);
			font-weight: 600;
			font-size: var(--step-0);
			text-decoration: none;
			white-space: nowrap;
		}
	}
</style>
