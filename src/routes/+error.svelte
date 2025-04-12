<script lang="ts">
	import { page } from '$app/state';
</script>

{#if page.error}
	<main class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
		<h1 class="text-9xl font-black">{page.status}</h1>
		<p class="mt-4 mb-4 text-2xl font-bold">{page.error.message}</p>
		<a
			href="/"
			onclick={(e) => {
				e.preventDefault();
				window.history.back();
			}}
			class="underline">Go back</a
		>
	</main>
{/if}
