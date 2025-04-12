<script lang="ts">
	import { page } from '$app/state';
	import { Author } from '$lib/posts';
	import clsx from 'clsx';
	import Socials from './Socials.svelte';
	import ProgressiveBlur from './ProgressiveBlur.svelte';
	import { Tween } from 'svelte/motion';
	import { duration, easing } from '$lib/transition/index.svelte';
	import { onMount } from 'svelte';

	const _items = {
		home: '/'
	};

	const tweenOptions = {
		duration: duration / 3,
		easing
	};

	const strength = new Tween(0, tweenOptions);
	const alpha = new Tween(0, tweenOptions);

	const items = $derived(Object.entries(_items));
	const owner = Author.all().find((a) => a.name === 'nullptr')!;

	const isHome = $derived(page.url.pathname === '/');

	onMount(() => {
		strength.set(0);
		const handleScroll = () => {
			if (window.scrollY > 0) {
				strength.set(32);
				alpha.set(1);
			} else {
				strength.set(0);
				alpha.set(0);
			}
		};

		handleScroll();

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<div class="fixed top-0 left-0 z-50 flex w-screen pt-6 text-2xl">
	<div class="pointer-events-none absolute top-0 left-0 -z-10 h-[200%] w-full">
		<ProgressiveBlur
			strength={strength.current}
			steps={16}
			side="top"
			tint="rgba(16, 4, 30, {alpha.current})"
		/>
	</div>
	<div class="flex w-full justify-center px-8 pb-6">
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
