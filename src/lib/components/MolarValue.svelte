<script lang="ts">
	import { app } from '#lib/state.svelte.ts';
	import { colon } from '#lib/format.ts';
	import { formatUnits, school, type MolarMass } from '#lib/molar.ts';

	/** The molar mass in large figures, with the school rounding and the masses it uses under it. */
	let { mass }: { mass: MolarMass } = $props();

	let lang = $derived(app.lang);
	let t = $derived(app.t);
	let rounded = $derived(school(mass, lang));
</script>

<p class="label">{t.molar.result}</p>
<p class="value">
	<span class="number">{formatUnits(mass.units, mass.digits, lang)}</span>
	<span class="unit">{t.molar.unit}</span>
</p>
<p class="school">
	{t.molar.school(rounded.masses)}{colon(lang)}<b>{rounded.total}&nbsp;{t.molar.unit}</b>
</p>

<style>
	p {
		margin: 0;
	}

	.label {
		font-size: var(--step--1);
	}

	.value {
		display: flex;
		flex-wrap: wrap;
		gap: 0 10px;
		align-items: baseline;
	}

	.number {
		font-family: var(--font-numeral);
		font-size: clamp(64px, 17vw, 104px);
		line-height: 1;
	}

	.unit {
		font-size: var(--step-2);
	}

	.school {
		margin-top: 8px;
		font-size: var(--step--1);
	}
</style>
