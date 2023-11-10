<script lang="ts">
	import { get, type Writable } from "svelte/store";
	import { getContext, onMount } from "svelte";

	export let showGrid: boolean = false;

	const horizontal: Writable<boolean> = getContext("horizontal");

	let grid_width = 12;
	let grid_height = 14;

	onMount(() => {
		if (get(horizontal)) {
			[grid_width, grid_height] = [grid_height, grid_width];
		}
	});

	$: grid_style = `grid-template-columns: repeat(${grid_width}, 1fr); grid-template-rows: repeat(${grid_height}, 1fr);`;
</script>

<div class="grid" style={grid_style}>
    <slot/>

    {#if showGrid}
        {#each Array(grid_height) as _, i}
            {#each Array(grid_width) as _, j}
                <div class="grid__cell">
                    {j + 1}-{i + 1}
                </div>
            {/each}
        {/each}
    {/if}
</div>

<style lang="scss">
	.grid__cell {
		width: 100%;
		height: 100%;
		border: 1px solid #000;
	}

	.grid {
		display: grid;
		width: 100%;
		height: 100%;
	}
</style>