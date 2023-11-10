<script lang="ts">
	import Battery0 from "~icons/fluent/battery-0-20-regular";
	import Battery1 from "~icons/fluent/battery-1-20-regular";
	import Battery2 from "~icons/fluent/battery-2-20-regular";
	import Battery3 from "~icons/fluent/battery-3-20-regular";
	import Battery4 from "~icons/fluent/battery-4-20-regular";
	import Battery5 from "~icons/fluent/battery-5-20-regular";
	import Battery6 from "~icons/fluent/battery-6-20-regular";
	import Battery7 from "~icons/fluent/battery-7-20-regular";
	import Battery8 from "~icons/fluent/battery-8-20-regular";
	import Battery9 from "~icons/fluent/battery-9-20-regular";
	import Battery10 from "~icons/fluent/battery-10-20-regular";
	import BatteryWarning from "~icons/fluent/battery-warning-20-regular";
	import BetterButton from "$lib/components/CustomComponents/BetterButton.svelte";
	import { onMount } from "svelte";
	import { env } from "$env/dynamic/public";

	let batterySymbols = [
		Battery0,
		Battery1,
		Battery2,
		Battery3,
		Battery4,
		Battery5,
		Battery6,
		Battery7,
		Battery8,
		Battery9,
		Battery10,
		BatteryWarning
	];

	export let toggle = () => {
	};

	let battery = -1;
	$: batteryIcon = Math.round(battery / 10);
	const batteryUpdateIntervalinSeconds = 10;

	async function updateBattery() {
		try {
			const res = await fetch(env.PUBLIC_KINDLE_SERVER_URI + "/battery");
			const data = await res.json();
			battery = data;
		} catch (e) {
			console.error(e);
			battery = -1;
		}
	}


	onMount(() => {
		updateBattery();
		let interval = setInterval(updateBattery, batteryUpdateIntervalinSeconds * 1000);

		return () => {
			clearInterval(interval);
		};
	});

</script>

<BetterButton class="battery" on:click={toggle}>
    <div class="battery-container">
        <p>{battery}%</p>
        <svelte:component this={batterySymbols[batteryIcon] ?? BatteryWarning}/>
    </div>
</BetterButton>


<style>
    .battery-container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
    }


    :global(.battery-container svg) {
        width: 24px;
        height: 24px;
        margin-left: 5px;
        margin-right: 3px;
        transform: scale(1.3);
    }
</style>