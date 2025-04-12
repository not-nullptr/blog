<script lang="ts">
	import PostPreview from '$lib/components/PostPreview.svelte';
	import Socials from '$lib/components/Socials.svelte';
	import { Author } from '$lib/posts/index.js';
	const { data } = $props();
	const owner = Author.all().find((a) => a.name === 'nullptr')!;
</script>

<main class="mx-auto flex w-full max-w-xl flex-col gap-4 pt-4">
	<div class="flex items-center gap-6 pt-8 pb-8">
		<img src={owner.avatar} alt="Avatar" class="h-28 w-28 rounded-full" />
		<div class="flex flex-col gap-2">
			<h1 class="-mt-1.5 -mb-1.5 text-4xl font-black">{owner.name}</h1>
			<h1 class="text-xl font-medium">{owner.bio}</h1>
			<div class="flex items-center gap-2">
				<Socials socials={owner.socials} />
			</div>
		</div>
	</div>

	{#each data.posts as post}
		<PostPreview {post} />
	{/each}
</main>
