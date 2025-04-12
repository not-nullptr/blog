<script lang="ts">
	import { page } from '$app/state';
	import { blur, fade } from 'svelte/transition';
	import '../app.css';
	import { circInOut } from 'svelte/easing';
	import { duration, easing } from '$lib/transition/index.svelte';
	import Navbar from '$lib/components/Navbar.svelte';

	let { children, data } = $props();
</script>

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
