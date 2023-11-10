<script lang="ts">
	export let height: number = 1;
	export let width: number = 1;
</script>

<div class="grid-{height}x{width}">
    <slot/>
</div>