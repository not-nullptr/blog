<script lang="ts">
	import Author from '$lib/components/Author.svelte';
	import { blur, receive, send, transitionState } from '$lib/transition/index.svelte.js';
	import { circOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	const { data } = $props();
	const id = data.post?.id || '';

	transitionState.clickedPost = data.post;
</script>

<svelte:head>
	<title>{data.post.title} // nullptr's blog</title>
</svelte:head>

<div
	in:receive|global={{ key: `${id}-container` }}
	out:send|global={{ key: `${id}-container` }}
	class="pointer-events-none absolute top-26 left-1/2 z-50 mx-auto h-96 w-full max-w-3xl -translate-x-1/2"
></div>

<main class="prose prose-xl prose-invert mx-auto pt-12 pb-12">
	<div>
		<h1 in:receive|global={{ key: `${id}-title` }} out:send|global={{ key: `${id}-title` }}>
			{data.post.title}
		</h1>
		<div class="-mt-4 mb-6">
			<Author post={data.post} />
		</div>
	</div>
	<div
		transition:blur|global={{
			duration: 500,
			blurMultiplier: 12,
			origin: 'top center',
			scale: {
				start: 0.75,
				end: 1
			}
		}}
	>
		{@render data.post.snippet()}
	</div>
</main>
