<script lang="ts">
	import type { Writable } from "svelte/store";
	import { getContext } from "svelte";

	const horizontal: Writable<boolean> = getContext("horizontal");
</script>

<div
        class="navbar"
        class:vertical={!$horizontal}
        class:horizontal={$horizontal}
>

</div>

<style lang="scss">
	.navbar.horizontal {
		width: 64px;
		height: 100%;
		border-right: 3px solid black;
	}

	.navbar.vertical {
		width: 100%;
		height: 64px;
		border-bottom: 3px solid black;
	}
</style>