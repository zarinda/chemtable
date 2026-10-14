<script lang="ts">
	import '@fontsource/oswald/cyrillic-600.css';
	import '@fontsource/oswald/latin-600.css';
	import '@fontsource/bebas-neue/latin-400.css';
	import '@fontsource-variable/golos-text/index.css';
	import '../lib/fonts/noto-sans-sc.css';
	import '../app.css';
	import { onMount } from 'svelte';
	import { app } from '#lib/state.svelte.ts';
	import { LANG_INFO } from '#lib/i18n/langs.ts';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	onMount(() => app.restore());

	// The server sets <html lang> per page; client-side navigation between languages updates it here.
	$effect(() => {
		document.documentElement.lang = LANG_INFO[app.lang].tag;
		if (app.theme === 'system') delete document.documentElement.dataset.theme;
		else document.documentElement.dataset.theme = app.theme;
	});
</script>

<svelte:head>
	<link rel="icon" href="/favicon.ico" sizes="48x48" />
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
</svelte:head>

{@render children()}
