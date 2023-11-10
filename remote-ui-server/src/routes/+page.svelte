<script lang="ts">
	import Grid from "$lib/components/Grid/Grid.svelte";
	import Clock from "$lib/components/Modules/Clock/Clock.svelte";
	import Module from "$lib/components/Modules/Module.svelte";
	import Lightbulb from "$lib/components/Modules/HomeAssistant/Lightbulb.svelte";
</script>

<Grid showGrid={false}>
    <Module height={6} width={9}>
        <Clock/>
    </Module>
    <Module height={6} width={5}>
        <Lightbulb/>
    </Module>
</Grid>
