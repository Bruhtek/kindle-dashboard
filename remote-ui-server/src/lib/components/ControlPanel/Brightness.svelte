<script lang="ts">
	import { onMount } from "svelte";
	import BrightnessEmpty from "~icons/fluent/weather-sunny-20-regular";
	import BrightnessFilled from "~icons/fluent/weather-sunny-20-filled";
	import BetterButton from "$lib/components/CustomComponents/BetterButton.svelte";
	import { env } from "$env/dynamic/public";

	let currentBrightness = 0;
	let brightnessUpdateInterval = 10;

	async function updateBrightness() {
		try {
			const response = await fetch(env.PUBLIC_KINDLE_SERVER_URI + "/backlight");
			const data = await response.json();
			currentBrightness = data;
		} catch (error) {
			console.error(error);
			currentBrightness = -1;
		}
	}

	async function controlBrightness(addValue: number) {
		let newBrightness = currentBrightness + addValue;
		newBrightness = Math.min(newBrightness, 100);
		newBrightness = Math.max(newBrightness, 0);

		const res = await fetch(env.PUBLIC_KINDLE_SERVER_URI + "/backlight/" + newBrightness);
		if (res.status === 200) {
			currentBrightness = newBrightness;
		} else {
			console.error("Failed to set brightness");
		}
	}

	function addBrightness() {
		controlBrightness(10);
	}

	function subBrightness() {
		controlBrightness(-10);
	}

	onMount(() => {
		updateBrightness();
		let interval = setInterval(updateBrightness, brightnessUpdateInterval * 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>


<div class="brightness">
    <p class="font-medium flex-center">Backlight control</p>
    <div class="flex flex-space-between">
        <BetterButton on:click={subBrightness}>
            <svelte:component this={BrightnessEmpty} class="w-8 h-8"/>
        </BetterButton>
        <p>Current brightness: {currentBrightness}</p>
        <BetterButton on:click={addBrightness}>
            <svelte:component this={BrightnessFilled} class="w-8 h-8"/>
        </BetterButton>
    </div>
</div>