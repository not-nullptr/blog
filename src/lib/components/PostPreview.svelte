<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import type { Post } from '$lib/posts';
	import { receive, send, transitionState } from '$lib/transition/index.svelte';
	import Author from './Author.svelte';

	type Props = {
		post: Post;
	};

	const { post }: Props = $props();

	let currentPost = $state<Post | null>(null);

	beforeNavigate(() => {
		if (currentPost) transitionState.clickedPost = currentPost;
	});
</script>

<div class="relative flex flex-col gap-4 px-4 py-4">
	<div
		in:receive|global={{ key: `${post.id}-container` }}
		out:send|global={{ key: `${post.id}-container` }}
		class="absolute top-0 left-0 -z-10 h-full w-full rounded-xl border border-gray-600"
	></div>
	<a
		in:receive|global={{ key: `${post.id}-title` }}
		out:send|global={{ key: `${post.id}-title` }}
		href="/posts/{post.id}"
		class="hover:underline"
		onclick={() => (currentPost = post)}
	>
		<h1 class="text-2xl font-bold">
			{post.title}
		</h1></a
	>
	<div>
		<Author {post} />
	</div>
</div>
