<script lang="ts">
	import { app } from '#lib/state.svelte.ts';
	import { elements, type Element } from '#lib/elements.ts';
	import { elementPath } from '#lib/seo.ts';

	/**
	 * Where to go next from the poster: the element's group and period as small cells,
	 * plus outside reading. The same links as the server article, but visible.
	 */
	let { element: e }: { element: Element } = $props();

	let t = $derived(app.t);
	let lang = $derived(app.lang);

	let rows = $derived(
		[
			e.group ? { label: t.article.sameGroup(e.group), items: elements.filter((x) => x.group === e.group) } : null,
			{ label: t.article.samePeriod(e.period), items: elements.filter((x) => x.period === e.period) }
		].filter((row) => row !== null)
	);

	function go(event: MouseEvent, z: number) {
		if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
		event.preventDefault();
		(event.currentTarget as HTMLElement).closest('.poster')?.scrollTo({ top: 0 });
		app.step(z);
	}
</script>

<nav class="related" aria-label={t.article.related}>
	<h3 class="heading">{t.article.related}</h3>

	{#each rows as row (row.label)}
		<div class="row">
			<p class="label">{row.label}</p>
			<ul>
				{#each row.items as x (x.z)}
					<li>
						<a
							href={elementPath(x, lang)}
							class="mini swatch cat-{x.category}"
							aria-current={x.z === e.z ? 'page' : undefined}
							onclick={(event) => go(event, x.z)}
						>
							<span class="z">{x.z}</span>
							<span class="symbol">{x.symbol}</span>
							<span class="caption">{x.name[lang]}</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/each}

	<p class="refs">
		{t.article.readMore}:
		{#if e.wikipedia[lang]}
			<a href={e.wikipedia[lang]} target="_blank" rel="noopener">{t.article.wikipedia}</a> ·
		{/if}
		<a href="https://pubchem.ncbi.nlm.nih.gov/element/{e.z}" target="_blank" rel="noopener">PubChem</a>
	</p>
</nav>

<style>
	.related {
		padding-top: 12px;
		border-top: 2px solid var(--rule);
	}

	.heading {
		margin: 0 0 16px;
		font-family: var(--font-display);
		font-weight: 600;
		font-size: var(--step-2);
		line-height: 1.1;
	}

	.row {
		margin-bottom: 16px;
	}

	.label {
		margin: 0 0 6px;
		font-size: var(--step--1);
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 12px 4px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.mini {
		position: relative;
		display: grid;
		grid-template-rows: auto 1fr auto;
		width: 68px;
		height: 68px;
		padding: 5px 6px;
		text-decoration: none;
		transition: transform 0.18s var(--ease-out);
	}

	.mini:hover {
		transform: translateY(-2px);
	}

	/* Raspberry marks the active state, as on the poster's element number. */
	.mini[aria-current='page']::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: -7px;
		height: 4px;
		background: var(--raspberry);
	}

	.z {
		font-size: 10px;
		line-height: 1;
		font-variant-numeric: tabular-nums;
	}

	.symbol {
		align-self: center;
		font-family: var(--font-display);
		font-weight: 600;
		font-size: 24px;
		line-height: 1;
	}

	.caption {
		overflow: hidden;
		font-size: 9px;
		line-height: 1.1;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.refs {
		margin: 8px 0 0;
		font-size: var(--step--1);
	}

	@media (max-width: 760px) {
		.mini {
			width: 58px;
			height: 58px;
		}
		.symbol {
			font-size: 20px;
		}
	}
</style>
