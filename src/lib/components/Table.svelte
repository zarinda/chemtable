<script lang="ts">
	import { page } from '$app/state';
	import { app, isMap } from '#lib/state.svelte.ts';
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

	let grid: HTMLDivElement | undefined = $state();

	/** Phone map: a paper cell above the finger, so the picked element shows past the fingertip. */
	let loupe = $state<{ z: number; left: number; top: number; tip: number } | null>(null);

	const LOUPE_WIDTH = 66;
	const LOUPE_HEIGHT = 72;

	function pick(cell: HTMLElement) {
		if (!grid) return;
		const z = Number(cell.dataset.z);
		app.picked = z;
		app.tabStop = z;
		const x = cell.offsetLeft + cell.offsetWidth / 2;
		const left = Math.min(Math.max(x - LOUPE_WIDTH / 2, 0), grid.clientWidth - LOUPE_WIDTH);
		loupe = { z, left, top: cell.offsetTop - LOUPE_HEIGHT - 10, tip: x - left };
	}

	/** On the phone map a touch picks the element under it, and sliding the finger keeps picking. */
	function onpointerdown(event: PointerEvent) {
		if (!grid || !isMap()) return;
		const cell = (event.target as Element).closest<HTMLElement>('.cell[data-z]');
		if (!cell) return;
		grid.setPointerCapture(event.pointerId);
		pick(cell);
	}

	function onpointermove(event: PointerEvent) {
		if (!loupe || !grid?.hasPointerCapture(event.pointerId)) return;
		const cell = document
			.elementFromPoint(event.clientX, event.clientY)
			?.closest<HTMLElement>('.cell[data-z]');
		if (cell && Number(cell.dataset.z) !== loupe.z) pick(cell);
	}

	const lift = () => (loupe = null);

	const groups = Array.from({ length: 18 }, (_, i) => i + 1);
	const periods = Array.from({ length: 7 }, (_, i) => i + 1);

	const series = [
		{ row: 6, range: '57–71', category: 'lanthanide' as const },
		{ row: 7, range: '89–103', category: 'actinide' as const }
	];
</script>

<div class="scroller">
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="grid"
		bind:this={grid}
		{onkeydown}
		{onpointerdown}
		{onpointermove}
		onpointerup={lift}
		onpointercancel={lift}
		onpointerleave={() => (app.active = null)}
	>
		<!-- The page heading stays in the document while an element is previewed. -->
		<div class="intro" class:previewing={!!app.active}>
			<!-- On element pages the element name is the page heading, so the title is not an h1. -->
			<svelte:element this={page.data.z ? 'p' : 'h1'} class="title"
				>{page.data.property ? app.t.propertyPage.title[page.data.property] : app.t.title}</svelte:element
			>
			<p class="hint">{app.t.hint}</p>
			<p class="hint touch">{app.t.hintTouch}</p>
		</div>

		<span class="corner" aria-hidden="true"></span>
		{#each groups as g (g)}
			<span class="label group" style:grid-column={g + 1} title="{app.t.group} {g}">{g}</span>
		{/each}
		{#each periods as p (p)}
			<span class="label period" style:grid-row={p + 2} title="{app.t.period} {p}">{p}</span>
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
				style:grid-row={s.row + 2}
				aria-pressed={app.focusCategory === s.category}
				onclick={() => (app.focusCategory = app.focusCategory === s.category ? null : s.category)}
			>
				<span>{s.range}</span>
				<span class="visually-hidden">{app.t.category[s.category]}</span>
			</button>
		{/each}

		<div class="divider" aria-hidden="true"></div>

		{#if loupe}
			{@const e = elements[loupe.z - 1]}
			<div
				class="loupe"
				style:left="{loupe.left}px"
				style:top="{loupe.top}px"
				style:--tip="{loupe.tip}px"
				aria-hidden="true"
			>
				<span class="loupe-z">{e.z}</span>
				<span class="loupe-symbol">{e.symbol}</span>
			</div>
		{/if}
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

	/* The first row holds the heading on phones; on wider screens it is empty. */
	.grid {
		--gap: calc(var(--cell) * 0.05);
		--label: calc(var(--cell) * 0.4);
		position: relative;
		display: grid;
		grid-template-columns: var(--label) repeat(18, var(--cell));
		grid-template-rows:
			0 var(--label) repeat(7, var(--cell)) calc(var(--cell) * 0.35)
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

	.intro {
		grid-column: 4 / 14;
		grid-row: 3 / 6;
		align-self: center;
		max-width: calc(var(--cell) * 8);
		padding: 0 calc(var(--cell) * 0.3);
		pointer-events: none;
	}

	/* Hidden only visually while the spotlight previews an element. */
	.previewing {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}

	.title {
		margin: 0 0 0.35em;
		font-family: var(--font-display);
		font-weight: 600;
		font-size: calc(var(--cell) * 0.5);
		line-height: 1;
		letter-spacing: -0.01em;
		text-wrap: balance;
	}

	.hint {
		margin: 0;
		font-size: clamp(var(--step--2), calc(var(--cell) * 0.2), var(--step-0));
		max-width: 46ch;
	}

	.hint.touch,
	.loupe {
		display: none;
	}

	.group {
		grid-row: 2;
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
		grid-row: 2;
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
		grid-row: 10;
		align-self: center;
		height: 2px;
		background: var(--rule);
		transform-origin: left;
		animation: draw 0.7s var(--ease-out) 1.1s backwards;
	}

	/*
	 * Portrait phones: the whole table fits the width as a map of coloured symbols. A touch picks
	 * an element for the card below it, and a loupe shows the element above the finger.
	 */
	@media (max-width: 760px) and (orientation: portrait) {
		.scroller {
			display: block;
			flex: none;
			order: 1;
			overflow: visible;
		}

		.grid {
			--gap: 1.5px;
			--label: 14px;
			grid-template-columns: 0 repeat(18, var(--cell));
			grid-template-rows: auto var(--label) repeat(7, var(--cell)) 8px repeat(2, var(--cell));
			/* The empty first column still brings a gap. */
			margin-left: calc(-1 * var(--gap));
			-webkit-user-select: none;
			user-select: none;
			-webkit-tap-highlight-color: transparent;
		}

		.intro,
		.intro.previewing {
			position: static;
			grid-column: 2 / -1;
			grid-row: 1;
			width: auto;
			height: auto;
			max-width: none;
			padding: 4px 0 10px;
			overflow: visible;
			clip-path: none;
			white-space: normal;
		}

		.title {
			margin-bottom: 0.25em;
			font-size: var(--step-2);
		}

		.hint {
			display: none;
		}

		.hint.touch {
			display: block;
			font-size: var(--step--1);
			opacity: 0.8;
		}

		.label {
			font-size: 8.5px;
		}

		.group {
			padding-bottom: 3px;
			border-bottom: 0;
			opacity: 0.7;
		}

		.period,
		.corner {
			display: none;
		}

		/* Too small for the number range; the swatch alone marks where the series belong. */
		.series span:first-child {
			display: none;
		}

		.divider {
			grid-column: 4 / 20;
			height: 1.5px;
		}

		.loupe {
			position: absolute;
			z-index: 5;
			display: grid;
			grid-template-rows: auto 1fr;
			width: 66px;
			height: 72px;
			padding: 5px 7px;
			background: var(--paper);
			color: var(--ink);
			box-shadow: 4px 4px 0 var(--rule);
			pointer-events: none;
		}

		.loupe::after {
			content: '';
			position: absolute;
			left: calc(var(--tip) - 9px);
			bottom: -9px;
			border: 9px solid transparent;
			border-top-color: var(--paper);
			border-bottom: 0;
		}

		.loupe-z {
			font-family: var(--font-numeral);
			font-size: 17px;
			line-height: 1;
			color: var(--raspberry);
		}

		.loupe-symbol {
			align-self: center;
			font-family: var(--font-display);
			font-weight: 600;
			font-size: 34px;
			line-height: 1;
		}
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
