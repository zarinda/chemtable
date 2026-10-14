<script lang="ts">
	import type { Lang } from '#lib/i18n/langs.ts';
	import Prefs from './Prefs.svelte';

	/** Top bar of the pages outside the table: a link back, the language menu and the theme button. */
	let { href, label, pathFor }: { href: string; label: string; pathFor: (l: Lang) => string } =
		$props();
</script>

<header class="bar">
	<a class="back" {href}>← {label}</a>
	<div class="prefs">
		<Prefs {pathFor} />
	</div>
</header>

<style>
	.bar {
		display: flex;
		align-items: center;
		gap: var(--gutter);
		padding: 12px var(--gutter);
		border-bottom: 2px solid var(--rule);
	}

	.back {
		margin-right: auto;
		font-size: var(--step--1);
		text-decoration: none;
	}

	.back:hover {
		text-decoration: underline;
	}

	.prefs {
		display: flex;
		gap: 8px;
		align-items: center;
	}

	@media (min-width: 900px) {
		.bar {
			padding: 14px 48px;
		}
	}
</style>
