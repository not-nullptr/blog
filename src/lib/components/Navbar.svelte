<script lang="ts">
	import { page } from '$app/state';
	import { Author } from '$lib/posts';
	import clsx from 'clsx';
	import Socials from './Socials.svelte';
	import ProgressiveBlur from './ProgressiveBlur.svelte';

	const _items = {
		home: '/'
	};

	const items = $derived(Object.entries(_items));
	const owner = Author.all().find((a) => a.name === 'nullptr')!;

	const isHome = $derived(page.url.pathname === '/');
</script>

<div class="fixed top-0 left-0 z-50 flex w-screen pt-6 text-2xl">
	<div class="absolute top-0 left-0 -z-10 h-[250%] w-full">
		<ProgressiveBlur steps={16} side="top" tint="#10041e" />
	</div>
	<div class="flex w-full justify-center px-8">
		<div
			class={clsx('flex w-full max-w-3xl justify-between', {
				'max-w-xl': isHome
			})}
			style="transition: max-width 0.5s cubic-bezier(0.23, 1, 0.320, 1);"
		>
			<div class="flex gap-6">
				{#each items as [name, path]}
					<a class="hover:underline" href={path}>{name}</a>
				{/each}
			</div>

			<div class="flex items-center gap-4">
				<Socials socials={owner.socials} />
			</div>
		</div>
	</div>
</div>

<div class="mb-16"></div>
