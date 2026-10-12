<script lang="ts">
	/** Electron shells drawn as rings of dots, the way the poster references draw orbits. */
	let { shells, size = 200, label }: { shells: number[]; size?: number; label: string } = $props();

	const center = 100;
	const inner = 34;
	let step = $derived((96 - inner) / Math.max(shells.length, 1));

	let dots = $derived(
		shells.flatMap((count, i) => {
			const r = inner + step * (i + 0.5);
			return Array.from({ length: count }, (_, k) => {
				const a = (k / count) * Math.PI * 2 - Math.PI / 2 + i * 0.4;
				return { x: center + r * Math.cos(a), y: center + r * Math.sin(a), shell: i, k };
			});
		})
	);
</script>

<svg viewBox="0 0 200 200" width={size} height={size} role="img" aria-label={label}>
	{#each shells as _, i (i)}
		<circle
			cx={center}
			cy={center}
			r={inner + step * (i + 0.5)}
			fill="none"
			stroke="currentColor"
			stroke-width="0.6"
			opacity="0.55"
		/>
	{/each}
	{#each dots as d (`${d.shell}-${d.k}`)}
		<circle
			cx={d.x}
			cy={d.y}
			r={Math.max(1.4, 3.4 - shells.length * 0.28)}
			fill="currentColor"
			style:animation-delay="{d.shell * 60 + d.k * 6}ms"
		/>
	{/each}
</svg>

<style>
	svg {
		display: block;
		overflow: visible;
	}
	circle[fill='currentColor'] {
		animation: dot-in 0.4s var(--ease-out) both;
		transform-box: fill-box;
		transform-origin: center;
	}
	@keyframes dot-in {
		from {
			opacity: 0;
			transform: scale(0);
		}
	}
</style>
