<script lang="ts">
	import { app } from '#lib/state.svelte.ts';
	import { elements, byPosition, propertyScale } from '#lib/elements.ts';
	import Cell from './Cell.svelte';
	import Spotlight from './Spotlight.svelte';

	let scale = $derived(app.mode === 'category' ? null : propertyScale(app.mode));

	const MOVES: Record<string, [number, number]> = {
		ArrowLeft: [-1, 0],
		ArrowRight: [1, 0],
		ArrowUp: [0, -1],
		ArrowDown: [0, 1]
	};

	/**
	 * The table is one Tab stop; inside it arrow keys walk the grid, skipping the
	 * gaps between blocks, and Home / End jump to the first and last element.
	 */
	function onkeydown(event: KeyboardEvent) {
		const target = event.target as HTMLElement;
		const z = Number(target.dataset.z);
		if (!z) return;
		if (event.key === 'Home' || event.key === 'End') {
			event.preventDefault();
			app.focusCell(event.key === 'Home' ? 1 : elements.length);
			return;
		}
		const move = MOVES[event.key];
		if (!move) return;
		event.preventDefault();
		let { col, row } = elements[z - 1];
		for (let i = 0; i < 18; i++) {
			col += move[0];
			row += move[1];
			if (row === 8) row += move[1];
			if (col < 1 || col > 18 || row < 1 || row > 10) return;
			const next = byPosition.get(`${col}:${row}`);
			if (next) {
				app.focusCell(next.z);
				return;
			}
		}
	}

	const groups = Array.from({ length: 18 }, (_, i) => i + 1);
	const periods = Array.from({ length: 7 }, (_, i) => i + 1);

	const series = [
		{ row: 6, range: '57–71', category: 'lanthanide' as const },
		{ row: 7, range: '89–103', category: 'actinide' as const }
	];
</script>

<div class="scroller">
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="grid" {onkeydown} onpointerleave={() => (app.active = null)}>
		<span class="corner" aria-hidden="true"></span>
		{#each groups as g (g)}
			<span class="label group" style:grid-column={g + 1} title="{app.t.group} {g}">{g}</span>
		{/each}
		{#each periods as p (p)}
			<span class="label period" style:grid-row={p + 1} title="{app.t.period} {p}">{p}</span>
		{/each}

		<Spotlight />

		{#each elements as element (element.z)}
			<Cell {element} heat={scale?.get(element.z)} />
		{/each}

		<!-- Mouse shortcut for the legend's lanthanide / actinide filter; keyboard users use the legend. -->
		{#each series as s (s.row)}
			<button
				type="button"
				tabindex="-1"
				class="series cat-{s.category}"
				class:swatch={app.mode === 'category'}
				class:pressed={app.focusCategory === s.category}
				style:grid-row={s.row + 1}
				aria-pressed={app.focusCategory === s.category}
				onclick={() => (app.focusCategory = app.focusCategory === s.category ? null : s.category)}
			>
				<span>{s.range}</span>
				<span class="visually-hidden">{app.t.category[s.category]}</span>
			</button>
		{/each}

		<div class="divider" aria-hidden="true"></div>
	</div>
</div>

<style>
	.scroller {
		flex: 1;
		min-height: 0;
		display: grid;
		place-items: safe center;
		overflow: auto hidden;
		padding: 0 var(--gutter);
		scrollbar-width: thin;
	}

	.grid {
		--gap: calc(var(--cell) * 0.05);
		--label: calc(var(--cell) * 0.4);
		display: grid;
		grid-template-columns: var(--label) repeat(18, var(--cell));
		grid-template-rows:
			var(--label) repeat(7, var(--cell)) calc(var(--cell) * 0.35)
			repeat(2, var(--cell));
		gap: var(--gap);
		margin: auto;
	}

	.label {
		display: grid;
		font-size: max(10px, calc(var(--cell) * 0.17));
		font-variant-numeric: tabular-nums;
		line-height: 1;
		animation: fade 0.5s ease 1.1s backwards;
	}

	.group {
		grid-row: 1;
		place-items: end center;
		padding-bottom: 2px;
		border-bottom: 1.5px solid var(--rule);
	}

	/* Period numbers stay pinned while the table scrolls sideways on phones. */
	.period {
		position: sticky;
		left: 0;
		z-index: 3;
		grid-column: 1;
		place-items: center end;
		padding-right: 4px;
		border-right: 1.5px solid var(--rule);
		background: var(--bg);
		/* Cover the gaps between labels and the gutter so scrolled cells don't show through. */
		box-shadow:
			0 0 0 var(--gap) var(--bg),
			calc(-1 * var(--gutter)) 0 0 var(--gap) var(--bg);
	}

	.corner {
		position: sticky;
		left: 0;
		z-index: 3;
		grid-row: 1;
		grid-column: 1;
		background: var(--bg);
		box-shadow:
			0 0 0 var(--gap) var(--bg),
			calc(-1 * var(--gutter)) 0 0 var(--gap) var(--bg);
	}

	.series {
		grid-column: 4;
		display: grid;
		place-items: center;
		width: var(--cell);
		height: var(--cell);
		border: 0;
		cursor: pointer;
		font-size: max(10px, calc(var(--cell) * 0.17));
		font-variant-numeric: tabular-nums;
		animation: fade 0.5s ease 1.1s backwards;
	}

	.series:not(.swatch) {
		background: transparent;
		box-shadow: inset 0 0 0 1px var(--rule);
	}

	.series.pressed {
		box-shadow: inset 0 0 0 3px var(--rule);
	}

	.divider {
		grid-column: 4 / 19;
		grid-row: 9;
		align-self: center;
		height: 2px;
		background: var(--rule);
		transform-origin: left;
		animation: draw 0.7s var(--ease-out) 1.1s backwards;
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
	}

	@keyframes draw {
		from {
			transform: scaleX(0);
		}
	}
</style>
