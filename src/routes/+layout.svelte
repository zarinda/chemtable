<script lang="ts">
	import '@fontsource/oswald/cyrillic-600.css';
	import '@fontsource/oswald/latin-600.css';
	import '@fontsource/bebas-neue/latin-400.css';
	import '@fontsource-variable/golos-text/index.css';
	import '../app.css';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href="/favicon.ico" sizes="48x48" />
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
</svelte:head>

{@render children()}
