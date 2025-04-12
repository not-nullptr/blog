<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import type { Post } from '$lib/posts';
	import { send, receive, transitionState } from '$lib/transition/index.svelte';
	import { circOut } from 'svelte/easing';

	type Props = {
		post: Post;
	};

	const { post }: Props = $props();

	const id = post.id;
</script>

<div class="flex h-fit items-center gap-1.5 text-base text-gray-400 [&>*]:my-0">
	<div class="flex items-center gap-2.5 font-semibold text-white">
		<img
			in:receive|global={{ key: `${id}-author-img` }}
			out:send|global={{ key: `${id}-author-img` }}
			src={post.author.avatar}
			alt="Avatar"
			class="!my-0 h-7 w-7 rounded-full select-none"
		/>
		<div
			in:receive|global={{ key: `${id}-author-name` }}
			out:send|global={{ key: `${id}-author-name` }}
		>
			{post.author.name}
		</div>
	</div>
	<p in:receive|global={{ key: `${id}-post-date` }} out:send|global={{ key: `${id}-post-date` }}>
		| {post.date.toLocaleDateString()}
	</p>
</div>
