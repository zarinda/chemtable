<script lang="ts">
	import { onMount } from 'svelte';
	import { app } from '#lib/state.svelte.ts';
	import { elements, type Element } from '#lib/elements.ts';
	import { elementPath, homePath } from '#lib/seo.ts';
	import { guessElements } from '#lib/guess.ts';

	let lang = $derived(app.lang);
	let t = $derived(app.t);
	let nf = $derived(t.notFound);

	const heaviest = elements[elements.length - 1];

	/** Pre-rendered once as /404; only the browser knows which address was missing. */
	let guesses = $state<Element[]>([]);
	onMount(() => {
		guesses = guessElements(location.pathname);
	});
</script>

<svelte:head>
	<title>{nf.title} | {t.siteName}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<main>
	<div class="cell" aria-hidden="true">
		<span class="z">404</span>
		<span class="symbol">?</span>
	</div>

	<div class="text">
		<h1>{nf.title}</h1>
		<p>{nf.text}</p>

		{#if guesses.length}
			<p class="suggest">{nf.suggest}</p>
			<ul>
				{#each guesses as e (e.z)}
					<li>
						<a href={elementPath(e, lang)}><span class="sym">{e.symbol}</span> {e.name[lang]}</a>
					</li>
				{/each}
			</ul>
		{/if}

		<p><a class="home" href={homePath(lang)}>{nf.back} →</a></p>
		<p class="beyond">{nf.beyond(heaviest.name[lang], heaviest.z)}</p>
	</div>
</main>

<style>
	main {
		display: grid;
		grid-template-columns: auto minmax(0, 52ch);
		gap: 40px;
		align-items: start;
		align-content: start;
		justify-content: center;
		min-height: 100svh;
		padding: 15svh var(--gutter) 56px;
	}

	/* An element cell for an element that does not exist: the page's one bold shape. */
	.cell {
		display: grid;
		grid-template-rows: auto 1fr;
		width: 168px;
		height: 168px;
		padding: 12px 14px;
		background: var(--surface);
		color: var(--on-surface);
		box-shadow: 6px 6px 0 var(--rule);
	}

	.z {
		font-family: var(--font-numeral);
		font-size: var(--step-2);
		line-height: 1;
		color: var(--raspberry);
	}

	.symbol {
		align-self: center;
		font-family: var(--font-display);
		font-size: 88px;
		font-weight: 600;
		line-height: 1;
	}

	h1 {
		margin: 0 0 0.5em;
		font-family: var(--font-display);
		font-size: var(--step-3);
		font-weight: 600;
		line-height: 1.1;
	}

	p {
		margin: 0 0 1em;
		line-height: 1.5;
	}

	.suggest {
		margin-bottom: 0.4em;
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		padding: 0;
		margin: 0 0 1.4em;
		list-style: none;
	}

	ul a {
		display: inline-block;
		padding: 6px 12px;
		background: var(--surface);
		color: var(--on-surface);
		text-decoration: none;
	}

	ul a:hover {
		text-decoration: underline;
	}

	.sym {
		font-family: var(--font-display);
		font-weight: 600;
	}

	.home {
		font-weight: 600;
	}

	.beyond {
		margin-top: 2em;
		font-size: var(--step--1);
		opacity: 0.75;
	}

	@media (max-width: 640px) {
		main {
			grid-template-columns: minmax(0, 1fr);
			gap: 28px;
			padding-top: 48px;
		}

		.cell {
			width: 120px;
			height: 120px;
			padding: 9px 11px;
		}

		.symbol {
			font-size: 60px;
		}
	}
</style>
