<script lang="ts">
	import { page } from '$app/state';
	import { app } from '#lib/state.svelte.ts';
	import { PROPERTIES, type Category, type PropertyKey } from '#lib/elements.ts';
	import { molarPath, printPagePath, propertyPath } from '#lib/seo.ts';

	/**
	 * Links to the tools and the property pages, drawn as cells of the table with the quantity's
	 * symbol in place of an element symbol. The symbols are the same in every language.
	 */
	const SYMBOL: Record<PropertyKey, string> = {
		mass: 'A<sub>r</sub>',
		electronegativity: 'χ',
		atomicRadius: 'r',
		density: 'ρ',
		meltingPoint: 't°',
		ionizationEnergy: 'E<sub>i</sub>'
	};

	let lang = $derived(app.lang);
	let t = $derived(app.t);

	type Cell = { href: string; symbol: string; label: string; top?: string; category: Category };

	let tools: Cell[] = $derived([
		{
			href: printPagePath(lang),
			symbol: 'PDF',
			label: t.print.heading,
			top: 'A4 · Letter',
			category: 'actinide'
		},
		{
			href: molarPath(lang),
			symbol: 'M',
			label: t.footer.molar,
			top: t.molar.unit,
			category: 'noble-gas'
		}
	]);
	let properties: Cell[] = $derived(
		PROPERTIES.map((key) => ({
			href: propertyPath(key, lang),
			symbol: SYMBOL[key],
			label: t.property[key],
			category: 'transition-metal'
		}))
	);
</script>

{#snippet cells(list: Cell[])}
	<ul>
		{#each list as cell (cell.href)}
			<li>
				<a
					class="cell swatch cat-{cell.category}"
					href={cell.href}
					aria-current={page.url.pathname === cell.href ? 'page' : undefined}
				>
					<span class="top" aria-hidden="true">{cell.top ?? ''}</span>
					<span class="symbol" aria-hidden="true">{@html cell.symbol}</span>
					<span class="label">{cell.label}</span>
				</a>
			</li>
		{/each}
	</ul>
{/snippet}

<nav class="links">
	<section class="tools" aria-labelledby="tools-heading">
		<h2 id="tools-heading">{t.footer.tools}</h2>
		{@render cells(tools)}
	</section>
	<section class="properties" aria-labelledby="properties-heading">
		<h2 id="properties-heading">{t.footer.properties}</h2>
		{@render cells(properties)}
	</section>
</nav>

<style>
	.links {
		display: grid;
		gap: 22px 40px;
		padding: 28px 0 32px;
		border-top: 2px solid var(--rule);
	}

	h2 {
		margin: 0 0 10px;
		font-family: var(--font-text);
		font-size: var(--step--1);
		font-weight: 400;
		line-height: 1.3;
	}

	ul {
		display: grid;
		gap: 5px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.tools ul {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.properties ul {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.cell {
		display: grid;
		grid-template-rows: auto 1fr auto;
		min-height: 104px;
		padding: 6px 8px 7px;
		text-decoration: none;
		transition:
			translate 0.15s var(--ease-out),
			box-shadow 0.15s var(--ease-out);
	}

	.cell:hover {
		translate: -2px -2px;
		box-shadow: 4px 4px 0 var(--rule);
	}

	.cell[aria-current] {
		outline: 2px solid var(--fg);
		outline-offset: 3px;
	}

	.top {
		min-height: 1.2em;
		font-size: var(--step--2);
		opacity: 0.8;
	}

	.symbol {
		align-self: center;
		font-family: var(--font-display);
		font-size: 34px;
		font-weight: 600;
		line-height: 1;
	}

	.symbol :global(sub) {
		font-size: 0.55em;
		line-height: 0;
		vertical-align: -0.2em;
	}

	.label {
		font-size: var(--step--2);
		line-height: 1.2;
		overflow-wrap: break-word;
		hyphens: auto;
	}

	/* Tablets: the tool cells keep the width of the property cells under them. */
	@media (min-width: 600px) {
		.tools ul,
		.properties ul {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}

		.cell {
			min-height: 118px;
		}

		.symbol {
			font-size: 38px;
		}
	}

	@media (min-width: 1100px) {
		.links {
			grid-template-columns: auto minmax(0, 1fr);
		}

		.tools ul {
			grid-template-columns: repeat(2, 112px);
		}

		.properties ul {
			grid-template-columns: repeat(6, minmax(0, 1fr));
		}

		.label {
			font-size: 0.75rem;
		}
	}
</style>
