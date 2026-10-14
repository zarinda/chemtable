<script lang="ts">
	import { formulaParts } from '#lib/molar.ts';

	/** A formula with its counts as subscripts: H2SO4 → H₂SO₄; the 5 of CuSO4·5H2O stays full size. */
	let { formula }: { formula: string } = $props();
</script>

<span class="formula"
	>{#each formulaParts(formula) as part, i (i)}{#if part.sub}<sub>{part.text}</sub
			>{:else}{part.text}{/if}{/each}</span
>

<style>
	sub {
		font-size: 0.62em;
		line-height: 0;
		vertical-align: -0.25em;
	}
</style>
