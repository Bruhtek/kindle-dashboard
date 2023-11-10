<script lang="ts">
	import LightbulbFilled from '~icons/fluent/lightbulb-20-filled';
	import LightbulbEmpty from '~icons/fluent/lightbulb-20-regular';
	import BetterButton from '$lib/components/CustomComponents/BetterButton.svelte';
	import { onMount } from 'svelte';

	let enabled = false;

	const toggleLightbulb = async () => {
		const res = await fetch('/api/hass/toggle-lights');
		if (res.ok) {
			enabled = JSON.parse(await res.text());
		}
	};

	const updateState = async () => {
		const res = await fetch('/api/hass/status');
		if (res.ok) {
			enabled = JSON.parse(await res.text());
		}
	};

	onMount(() => {
		updateState();
		const interval = setInterval(updateState, 60000);
		
		return () => clearInterval(interval);
	});
</script>

<div class="lightbulb-control">
	<BetterButton on:click={toggleLightbulb} class="icon">
		{#if enabled}
			<svelte:component this={LightbulbFilled} />
		{:else}
			<svelte:component this={LightbulbEmpty} />
		{/if}
	</BetterButton>
</div>

<style lang="scss">
	.lightbulb-control {
		width: 100%;
		height: 100%;
	}

	.lightbulb-control :global(.icon) {
		width: 75%;
		margin: auto;

		:global(svg) {
			width: 100%;
			height: 100%;
		}
	}
</style>