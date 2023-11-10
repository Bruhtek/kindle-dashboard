<script lang="ts">
	import BetterButton from "$lib/components/CustomComponents/BetterButton.svelte";
	import ArrowRefresh from "~icons/fluent/arrow-sync-20-regular";
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";

	const isRefreshing: Writable<number> = getContext("isRefreshing");
	export let closeMenu: () => void;

	function refresh() {
		closeMenu();
		isRefreshing.set(0);
		setTimeout(() => {
			isRefreshing.set(1);
		}, 1000);
		setTimeout(() => {
			isRefreshing.set(-1);
		}, 2000);
	}
</script>

<BetterButton timeout={3000} class="font-medium flex flex-center" on:click={refresh}>
    <svelte:component this={ArrowRefresh} class="w-8 h-8"/>
    <p>Refresh the screen</p>
</BetterButton>
