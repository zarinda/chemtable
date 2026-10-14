<script lang="ts">
	import { app } from '#lib/state.svelte.ts';
	import { LANGS, LANG_INFO, type Lang } from '#lib/i18n/langs.ts';

	/**
	 * Language menu and theme button. `pathFor` is this page in another language. The menu opens
	 * leftwards from the button; set --menu-left: 0 and --menu-right: auto to open it rightwards.
	 */
	let { pathFor }: { pathFor: (l: Lang) => string } = $props();

	let themeIcon = $derived(app.theme === 'dark' ? '●' : app.theme === 'light' ? '○' : '◐');

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

<!-- Plain links, so each language version is reachable without JavaScript. -->
<details class="lang" bind:this={menu}>
	<summary aria-label="{app.t.language}: {LANG_INFO[app.lang].native}">
		{LANG_INFO[app.lang].native}<span aria-hidden="true">▾</span>
	</summary>
	<ul>
		{#each LANGS as l (l)}
			<li>
				<a
					href={pathFor(l)}
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

<style>
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
		right: var(--menu-right, 0);
		left: var(--menu-left, auto);
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
