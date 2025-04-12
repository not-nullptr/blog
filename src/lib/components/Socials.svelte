<script lang="ts">
	import type { Author } from '$lib/posts';

	type Props = {
		socials: (typeof Author)['prototype']['socials'];
	};

	const { socials }: Props = $props();
</script>

{#each socials as social}
	<a href={social.link} target="_blank" rel="noreferrer">
		{#if social.Icon}
			<social.Icon class="h-6 w-6 fill-white text-white" color="white" />
		{:else}
			<p class="flex h-6 w-6 items-center justify-center text-white">!</p>
		{/if}
	</a>
{/each}
