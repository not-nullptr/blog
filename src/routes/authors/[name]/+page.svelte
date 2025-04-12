<script lang="ts">
	import PostPreview from '$lib/components/PostPreview.svelte';
	import Socials from '$lib/components/Socials.svelte';
	import { transitionState } from '$lib/transition/index.svelte.js';

	const { data } = $props();

	const posts = $derived(data.author.posts);
</script>

<main class="mx-auto flex w-full max-w-xl flex-col gap-4 pt-4">
	<div class="flex items-center gap-6 pt-8 pb-8">
		<img src={data.author.avatar} alt="Avatar" class="h-28 w-28 rounded-full" />
		<div class="flex flex-col gap-2">
			<h1 class="-mt-1.5 -mb-1.5 text-4xl font-black">{data.author.name}</h1>
			<h1 class="text-xl font-medium">{data.author.bio}</h1>
			<div class="flex items-center gap-2">
				<Socials socials={data.author.socials} />
			</div>
		</div>
	</div>
	{#each posts as post}
		<PostPreview {post} />
	{/each}
</main>
