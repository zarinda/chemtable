<script lang="ts">
	import { page } from '$app/state';
	import { app } from '#lib/state.svelte.ts';
	import { PROPERTIES, elements } from '#lib/elements.ts';
	import type { Lang } from '#lib/i18n/langs.ts';
	import { elementPath, homePath, propertyPath } from '#lib/seo.ts';
	import Prefs from './Prefs.svelte';

	/** The same page in another language: the open element, the property page or the home page. */
	const pathIn = (l: Lang) =>
		app.openedZ
			? elementPath(elements[app.openedZ - 1], l)
			: page.data.property
				? propertyPath(page.data.property, l)
				: homePath(l);

	/** Phones scroll the buttons sideways: bring the current property's button into view. */
	function showCurrent(nav: HTMLElement) {
		// Read so the attachment reruns when another property page opens in the same view.
		void app.mode;
		const current = nav.querySelector<HTMLElement>('[aria-current="page"]');
		if (!current) return;
		const gap = current.getBoundingClientRect().left - nav.getBoundingClientRect().left;
		if (current.getBoundingClientRect().right > nav.getBoundingClientRect().right)
			nav.scrollLeft += gap - 12;
	}
</script>

<header>
	<!--
		Each button is a page: the property's page with its list of values, or the home page for
		"Categories". No scrolling to the top: on phones the buttons sit under the map's card.
	-->
	<nav class="modes" aria-label={app.t.colorBy} data-sveltekit-reset="false" {@attach showCurrent}>
		<a
			class="mode"
			href={homePath(app.lang)}
			data-state={app.mode === 'category' ? 'on' : 'off'}
			aria-current={app.mode === 'category' && !app.openedZ ? 'page' : undefined}
			>{app.t.categories}</a
		>
		{#each PROPERTIES as key (key)}
			<a
				class="mode"
				href={propertyPath(key, app.lang)}
				data-state={key === app.mode ? 'on' : 'off'}
				aria-current={key === app.mode ? 'page' : undefined}>{app.t.property[key]}</a
			>
		{/each}
	</nav>

	<div class="prefs">
		<Prefs pathFor={pathIn} />
	</div>
</header>

<style>
	header {
		display: flex;
		align-items: center;
		gap: var(--gutter);
		padding: 12px var(--gutter);
	}

	.modes {
		display: flex;
		flex: 1;
		min-width: 0;
		gap: 4px;
		overflow-x: auto;
		scrollbar-width: none;
	}

	.mode {
		flex: none;
		padding: 0.35em 0.8em;
		border: 1.5px solid var(--rule);
		border-radius: 999px;
		background: transparent;
		color: inherit;
		text-decoration: none;
		font-size: var(--step--1);
		white-space: nowrap;
		transition:
			background-color 0.2s ease,
			color 0.2s ease;
	}

	.mode:hover {
		background: color-mix(in srgb, var(--fg) 10%, transparent);
	}

	.mode[data-state='on'] {
		background: var(--fg);
		color: var(--bg);
	}

	.prefs {
		display: flex;
		flex: none;
		gap: 8px;
		align-items: center;
	}

	/* Phones: language and theme on top; the colour modes go under the map's card (see Home). */
	@media (max-width: 760px) and (orientation: portrait) {
		header {
			display: contents;
		}

		.prefs {
			order: 0;
			justify-content: space-between;
			padding: 12px var(--gutter) 14px;
		}

		/* The language button is on the left here, so the menu opens to the right. */
		.prefs {
			--menu-left: 0;
			--menu-right: auto;
		}

		.modes {
			order: 3;
			flex: none;
			gap: 8px;
			padding: 26px var(--gutter) 2px;
		}

		.mode {
			padding: 0.45em 0.9em;
		}
	}

</style>
