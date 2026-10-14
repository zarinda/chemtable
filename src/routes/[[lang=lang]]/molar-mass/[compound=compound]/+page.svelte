<script lang="ts">
	import { byCompoundSlug } from '#lib/compounds.ts';
	import CompoundPage from '#lib/components/CompoundPage.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let compound = $derived(byCompoundSlug.get(data.compound)!);
</script>

<CompoundPage {compound} />
