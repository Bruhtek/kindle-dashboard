<script lang="ts">

	import Battery from "$lib/components/ControlPanel/Battery.svelte";
	import Refresh from "$lib/components/ControlPanel/Refresh.svelte";
	import Fullscreen from "$lib/components/ControlPanel/Fullscreen.svelte";
	import Brightness from "$lib/components/ControlPanel/Brightness.svelte";

	let shown = false;

	function toggle() {
		shown = !shown;
	}

</script>

<div
        class="control-panel-container"
        class:expanded={shown}
>
    <Battery toggle={toggle}/>
    {#if shown}
        <div class="control-panel-expanded">
            <Refresh closeMenu={toggle}/>
            <Fullscreen closeMenu={toggle}/>
            <Brightness/>
        </div>
    {/if}
</div>

<style>
    .control-panel-container {
        position: absolute;
        right: 0;
        top: 0;
        height: max-content;
        width: max-content;
        background-color: white;
        z-index: 100;
    }

    .control-panel-container.expanded {
        border-bottom: 3px solid black;
        border-left: 3px solid black;
    }

    .control-panel-container :global(.battery) {
        min-width: 100%;
    }

    .control-panel-container :global(.control-panel-expanded) {
        min-height: 100px;
        min-width: 300px;
    }
</style>