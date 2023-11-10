<script lang="ts">
	import BetterButton from "$lib/components/CustomComponents/BetterButton.svelte";
	import Fullscreen from "~icons/fluent/full-screen-maximize-20-regular";

	export let closeMenu: () => void;


	function toggleFullscreen() {
		closeMenu();
		if (document.fullscreenElement) {
			document.exitFullscreen();
		} else {
			document.documentElement.requestFullscreen();
		}
	}
</script>

<BetterButton timeout={1000} class="font-medium flex flex-center" on:click={toggleFullscreen}>
    <svelte:component this={Fullscreen} class="w-8 h-8"/>
    <p>Toggle Fullscreen</p>
</BetterButton>
