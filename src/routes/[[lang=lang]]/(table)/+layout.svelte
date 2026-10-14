<script lang="ts">
	import Home from '#lib/components/Home.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<!--
	One table for the home page, the element pages and the property pages, so moving between
	them recolours it in place instead of building a new page (and on phones keeps the scroll).
-->
<Home />
{@render children()}
