<script lang="ts">
	import { env } from "$env/dynamic/public";
	import { onMount } from "svelte";
    
	let currentTime = new Date();
	$: time = currentTime.toLocaleTimeString("en-PL", {
		hour: "2-digit",
		minute: "2-digit",
		hourCycle: "h23",
		timeZone: env.PUBLIC_TIMEZONE,
	});
	$: date = currentTime.toLocaleDateString("en-PL", {
		weekday: "long",
		day: "numeric",
		month: "long",
		timeZone: env.PUBLIC_TIMEZONE,
	});

	onMount(() => {
		const interval = setInterval(() => {
			currentTime = new Date();
		}, 50 * 1000);

		return () => clearInterval(interval);
	});
</script>

<div class="clock">
    <p class="font-large greeter">
        Hello,
        <span class="color-400">{env.PUBLIC_NAME}</span>
    </p>
    <p class="clock-display">{time}</p>
    <p class="font-large date-display">
        It's
        <span class="color-400">{date}</span>
    </p>
</div>

<style lang="scss">
	.clock {
		height: 100%;
		width: 100%;
		display: grid;
		place-items: center;
		position: relative;
	}

	.greeter, .date-display {
		position: absolute;
	}

	$spacer: 0.5em;

	.greeter {
		top: $spacer;
		left: $spacer;
	}

	.date-display {
		bottom: $spacer;
		right: $spacer;
	}

	.clock-display {
		$fontSize: 9rem;
		font-size: $fontSize;
		font-weight: bold;
		margin: 0;
		line-height: $fontSize;
		transform: translateY(#{calculateTypeOffset($fontSize,$fontSize,0.09)}em);
	}
</style>