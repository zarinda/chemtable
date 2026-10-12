<script lang="ts">
	import { ToggleGroup } from 'bits-ui';
	import { app } from '#lib/state.svelte.ts';
	import { CATEGORIES, propertyRange, type Category } from '#lib/elements.ts';
	import { HEAT_GRADIENT } from '#lib/heat.ts';
	import { formatNumber, kelvinToCelsius } from '#lib/format.ts';

	let range = $derived.by(() => {
		if (app.mode === 'category') return null;
		const [lo, hi] = propertyRange(app.mode);
		const f = (v: number) =>
			formatNumber(app.mode === 'meltingPoint' ? Math.round(kelvinToCelsius(v)) : v, app.lang, 5);
		return [f(lo), f(hi)];
	});
</script>

<footer>
	{#if app.mode === 'category'}
		<ToggleGroup.Root
			type="single"
			class="legend"
			aria-label={app.t.categories}
			value={app.focusCategory ?? ''}
			onValueChange={(v) => (app.focusCategory = (v || null) as Category | null)}
		>
			{#each CATEGORIES as c (c)}
				<ToggleGroup.Item value={c} class="item">
					<span class="chip swatch cat-{c}" aria-hidden="true"></span>
					{app.t.category[c]}
				</ToggleGroup.Item>
			{/each}
		</ToggleGroup.Root>
	{:else if range}
		<div class="scale">
			<span class="label">{app.t.property[app.mode]}, {app.t.unit[app.mode]}</span>
			<span class="end">{range[0]}</span>
			<span class="bar" style:background={HEAT_GRADIENT} aria-hidden="true"></span>
			<span class="end">{range[1]}</span>
			<span class="nodata"><span class="hatch" aria-hidden="true"></span>{app.t.noData}</span>
			<p class="trend">{app.t.trend[app.mode]}</p>
		</div>
	{/if}
</footer>

<style>
	footer {
		display: flex;
		align-items: center;
		gap: var(--gutter);
		min-height: 56px;
		padding: 8px var(--gutter) 12px;
		animation: fade 0.5s ease 1.1s backwards;
	}

	footer :global(.legend) {
		display: flex;
		flex: 1;
		min-width: 0;
		flex-wrap: wrap;
		gap: 2px 4px;
	}

	footer :global(.item) {
		display: inline-flex;
		align-items: center;
		gap: 0.45em;
		padding: 0.25em 0.6em 0.25em 0.3em;
		border: 0;
		border-radius: 999px;
		background: transparent;
		cursor: pointer;
		font-size: var(--step--1);
		white-space: nowrap;
	}

	footer :global(.item:hover) {
		background: color-mix(in srgb, var(--fg) 10%, transparent);
	}

	footer :global(.item[data-state='on']) {
		box-shadow: inset 0 0 0 1.5px var(--rule);
	}

	.chip {
		width: 1.1em;
		height: 1.1em;
		border-radius: 50%;
		box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--rule) 35%, transparent);
	}

	.scale {
		display: flex;
		flex: 1;
		flex-wrap: wrap;
		align-items: center;
		gap: 6px 12px;
		font-size: var(--step--1);
		font-variant-numeric: tabular-nums;
	}

	.label {
		font-weight: 600;
	}

	.bar {
		width: min(320px, 40vw);
		height: 12px;
	}

	.trend {
		flex-basis: 100%;
		margin: 0;
		max-width: 80ch;
	}

	.nodata {
		display: inline-flex;
		align-items: center;
		gap: 0.4em;
		margin-left: 8px;
	}

	.hatch {
		width: 1.1em;
		height: 1.1em;
		background: repeating-linear-gradient(
			135deg,
			color-mix(in srgb, var(--fg) 40%, transparent) 0 1px,
			transparent 1px 4px
		);
	}

	@media (max-width: 760px) {
		footer :global(.legend) {
			flex-wrap: nowrap;
			overflow-x: auto;
			scrollbar-width: none;
		}
	}

	/* Phones: the legend in two columns under the colour modes. */
	@media (max-width: 760px) and (orientation: portrait) {
		footer {
			order: 4;
			padding-top: 12px;
		}

		footer :global(.legend) {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 2px 8px;
			overflow: visible;
		}

		footer :global(.item) {
			gap: 0.55em;
			min-height: 36px;
			padding: 0.25em 0.4em 0.25em 0;
			text-align: left;
			white-space: normal;
		}

		.chip {
			flex: none;
			width: 16px;
			height: 16px;
			background: var(--texture-sm), var(--fill);
		}

		.bar {
			flex: 1;
			width: auto;
		}
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
	}
</style>
