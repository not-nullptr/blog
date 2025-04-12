<script lang="ts">
	import { blur } from 'svelte/transition';
	import '../app.css';
	import { duration, easing } from '$lib/transition/index.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { PUB_PLAUSIBLE_URL, PUB_HOSTNAME } from '$env/static/public';

	let { children, data } = $props();
</script>

{#if !!PUB_PLAUSIBLE_URL}
	<script defer data-domain={PUB_HOSTNAME} src="{PUB_PLAUSIBLE_URL}/js/script.js"></script>
{/if}

<div
	class="fixed top-0 left-0 -z-10 h-screen w-screen"
	style="background: linear-gradient(to bottom, #10041e, #07152d)"
></div>

<div class="w-screen overflow-x-hidden">
	<Navbar />
	<div class="grid grid-cols-1 grid-rows-1 px-8 lg:px-0">
		{#key data.pathname}
			<div class="col-start-1 row-start-1" transition:blur={{ duration, amount: '6px', easing }}>
				{@render children()}
			</div>
		{/key}
	</div>
</div>
