<script lang="ts">

	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	export let timeout: number = 300;

	let isInTimeout: boolean = true;

	function handleClick() {
		if (isInTimeout) return;

		dispatch('click');
		isInTimeout = true;
		setTimeout(() => {
			isInTimeout = false;
		}, timeout);
	}

	onMount(() => {
		// prevent accidental clicks on mount
		setTimeout(() => {
			isInTimeout = false;
		}, Math.min(timeout, 300));
	});
</script>

<button
	class:invisible-button={true}
	{...$$restProps}
	on:touchstart={handleClick}
	on:click={handleClick}
	on:touchmove={handleClick}
>
	<slot />
</button>

<style>
    .invisible-button {
        background: white;
        border: none;
        padding: 0;
        margin: 0;
    }
</style>