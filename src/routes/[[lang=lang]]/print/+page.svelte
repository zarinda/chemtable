<script lang="ts">
	import PrintPage from '#lib/components/PrintPage.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<PrintPage sizes={data.sizes} />
