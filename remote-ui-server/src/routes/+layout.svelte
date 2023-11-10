<script lang="ts">
	import { browser } from "$app/environment";
	import { links } from "unplugin-fonts/head";
	import ControlPanel from "$lib/components/ControlPanel/ControlPanel.svelte";
	import "$lib/scss/global.scss";

	import { setContext } from "svelte";
	import { writable } from "svelte/store";
	import Navbar from "$lib/components/Navbar/Navbar.svelte";


	// Don't rotate on Firefox, we'll use it while developing
	let firefox: boolean = false;
	$: if (browser) {
		firefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
	}

	const isRefreshing = writable(-1);
	setContext("isRefreshing", isRefreshing);

	const horizontal = writable(true);
	setContext("horizontal", horizontal);
</script>


<svelte:head>
    {#each links as link}
        <link {...link?.attrs || {}}/>
    {/each}
</svelte:head>

<div class="container">
    <div class="content-container"
         class:rotated={$horizontal && !firefox}
         class:horizontal={$horizontal}
         class:vertical={!$horizontal}
    >
        <ControlPanel/>
        <Navbar/>
        <div class="content">
            <slot/>
        </div>
    </div>
    {#if $isRefreshing !== -1}
        <div
                class="refresh"
                class:black={$isRefreshing === 0}
                class:white={$isRefreshing === 1}
        />
    {/if}
</div>

<style>
    .refresh {
        height: 100vh;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;

        &.black {
            background-color: black;
        }

        &.white {
            background-color: white;
        }
    }

    .container {
        height: 100vh;
        width: 100vw;
        background-color: white;
    }

    .content-container {
        width: 100vw;
        height: 100vh;
        position: relative;
        display: flex;
    }

    .content-container.vertical {
        flex-direction: column;
    }

    .content {
        display: flex;
        flex: 1;
    }

    .content-container.rotated {
        width: 100vh;
        height: 100vw;
        transform: rotate(90deg) translateY(-100vw);
        transform-origin: top left;
    }

    .vertical {
        height: 100vh;
        width: 100vw;
    }
</style>