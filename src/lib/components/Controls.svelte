<script lang="ts">
	import { ToggleGroup } from 'bits-ui';
	import { app, type Mode } from '#lib/state.svelte.ts';
	import { PROPERTIES, elements } from '#lib/elements.ts';
	import { LANGS, LANG_INFO, type Lang } from '#lib/i18n/langs.ts';
	import { elementPath, homePath } from '#lib/seo.ts';

	const modes: Mode[] = ['category', ...PROPERTIES];

	let themeIcon = $derived(app.theme === 'dark' ? '●' : app.theme === 'light' ? '○' : '◐');

	/** The same page in another language: the open element, or the home page. */
	const pathIn = (l: Lang) => (app.openedZ ? elementPath(elements[app.openedZ - 1], l) : homePath(l));

	let menu: HTMLDetailsElement | undefined = $state();

	function closeOnOutside(event: PointerEvent) {
		if (menu?.open && !menu.contains(event.target as Node)) menu.open = false;
	}
</script>

<svelte:window
	onpointerdown={closeOnOutside}
	onkeydown={(e) => {
		if (e.key === 'Escape' && menu?.open) {
			menu.open = false;
			menu.querySelector('summary')?.focus();
		}
	}}
/>

<header>
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

	<div class="prefs">
		<!-- Plain links, so each language version is reachable without JavaScript. -->
		<details class="lang" bind:this={menu}>
			<summary aria-label="{app.t.language}: {LANG_INFO[app.lang].native}">
				{LANG_INFO[app.lang].native}<span aria-hidden="true">▾</span>
			</summary>
			<ul>
				{#each LANGS as l (l)}
					<li>
						<a
							href={pathIn(l)}
							hreflang={LANG_INFO[l].tag}
							lang={LANG_INFO[l].tag}
							aria-current={l === app.lang ? 'page' : undefined}
							onclick={() => menu && (menu.open = false)}>{LANG_INFO[l].native}</a
						>
					</li>
				{/each}
			</ul>
		</details>
		<button
			type="button"
			class="theme"
			onclick={() => app.cycleTheme()}
			aria-label={app.t.theme[app.theme]}
			title={app.t.theme[app.theme]}
		>
			<span aria-hidden="true">{themeIcon}</span>
		</button>
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

	.lang {
		position: relative;
	}

	summary {
		display: flex;
		gap: 0.4em;
		align-items: center;
		padding: 0.35em 0.8em;
		border: 1.5px solid var(--rule);
		border-radius: 999px;
		cursor: pointer;
		font-size: var(--step--1);
		list-style: none;
		white-space: nowrap;
	}

	summary::-webkit-details-marker {
		display: none;
	}

	.lang[open] summary {
		background: var(--fg);
		color: var(--bg);
	}

	.lang ul {
		position: absolute;
		top: calc(100% + 6px);
		right: 0;
		z-index: 60;
		min-width: 11em;
		margin: 0;
		padding: 6px;
		list-style: none;
		background: var(--surface);
		color: var(--on-surface);
		border: 1.5px solid var(--rule);
		border-radius: 12px;
		animation: menu-in 0.16s var(--ease-out);
	}

	.lang a {
		display: block;
		padding: 0.4em 0.7em;
		border-radius: 8px;
		color: inherit;
		font-size: var(--step--1);
		text-decoration: none;
	}

	.lang a:hover {
		background: color-mix(in srgb, var(--on-surface) 10%, transparent);
	}

	.lang a[aria-current='page'] {
		font-weight: 600;
	}

	@keyframes menu-in {
		from {
			opacity: 0;
			transform: translateY(-4px);
		}
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
		.lang ul {
			right: auto;
			left: 0;
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

	.theme {
		display: grid;
		place-items: center;
		width: 2.1em;
		height: 2.1em;
		border: 1.5px solid var(--rule);
		border-radius: 50%;
		background: transparent;
		cursor: pointer;
		font-size: var(--step--1);
		line-height: 1;
	}
</style>
