<script lang="ts">
	import { page } from '$app/state';
	import { byCompoundSlug } from '#lib/compounds.ts';
	import MolarCalculator from '#lib/components/MolarCalculator.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<!--
	One calculator for /molar-mass and every substance page, so picking a substance or typing a
	formula changes the address and the title in place instead of opening another page.
-->
<MolarCalculator compound={byCompoundSlug.get(page.params.compound ?? '')} />
{@render children()}
