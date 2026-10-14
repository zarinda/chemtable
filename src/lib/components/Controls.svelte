<script lang="ts">
	import { ToggleGroup } from 'bits-ui';
	import { page } from '$app/state';
	import { app, type Mode } from '#lib/state.svelte.ts';
	import { PROPERTIES, elements } from '#lib/elements.ts';
	import type { Lang } from '#lib/i18n/langs.ts';
	import { elementPath, homePath, propertyPath } from '#lib/seo.ts';
	import Prefs from './Prefs.svelte';

	const modes: Mode[] = ['category', ...PROPERTIES];

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
	{#if page.data.property}
		<!-- On a property page each button is the page of that property; "Categories" is the home page. -->
		<nav class="modes" aria-label={app.t.colorBy} {@attach showCurrent}>
			<a class="mode" href={homePath(app.lang)} data-state="off" onclick={() => (app.mode = 'category')}
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
	{:else}
		<ToggleGroup.Root
			type="single"
			class="modes"
			aria-label={app.t.colorBy}
			bind:value={
				() => app.mode,
				// Clicking the active heat map again deselects it: back to categories.
				(v) => (app.mode = (v || 'category') as Mode)
			}
		>
			{#each modes as mode (mode)}
				<ToggleGroup.Item value={mode} class="mode">
					{mode === 'category' ? app.t.categories : app.t.property[mode]}
				</ToggleGroup.Item>
			{/each}
		</ToggleGroup.Root>
	{/if}

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

	header :global(.modes) {
		display: flex;
		flex: 1;
		min-width: 0;
		gap: 4px;
		overflow-x: auto;
		scrollbar-width: none;
	}

	header :global(.mode) {
		flex: none;
		padding: 0.35em 0.8em;
		border: 1.5px solid var(--rule);
		border-radius: 999px;
		background: transparent;
		cursor: pointer;
		font-size: var(--step--1);
		white-space: nowrap;
		transition:
			background-color 0.2s ease,
			color 0.2s ease;
	}

	header a.mode {
		color: inherit;
		text-decoration: none;
	}

	header :global(.mode:hover) {
		background: color-mix(in srgb, var(--fg) 10%, transparent);
	}

	header :global(.mode[data-state='on']) {
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

		header :global(.modes) {
			order: 3;
			flex: none;
			gap: 8px;
			padding: 26px var(--gutter) 2px;
		}

		header :global(.mode) {
			padding: 0.45em 0.9em;
		}
	}

</style>
