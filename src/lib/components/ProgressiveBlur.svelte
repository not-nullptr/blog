<script lang="ts">
	const oppositeSide = {
		left: 'right',
		right: 'left',
		top: 'bottom',
		bottom: 'top'
	};

	type Props = {
		strength?: number;
		steps?: number;
		falloffPercentage?: number;
		tint?: string;
		side?: 'left' | 'right' | 'top' | 'bottom';
	};

	const {
		strength = 64,
		steps = 8,
		falloffPercentage = 95,
		tint = 'transparent',
		side = 'top'
	}: Props = $props();

	const actualSteps = $derived(Math.max(1, steps));
	const step = $derived(falloffPercentage / actualSteps);

	const factor = 0.5;
	const base = $derived(Math.pow(strength / factor, 1 / (actualSteps - 1)));
	const mainPercentage = $derived(100 - falloffPercentage);

	const getBackdropFilter = $derived.by(
		() => (i: number) => `blur(${factor * base ** (actualSteps - i - 1)}px)`
	);
</script>

<div class="pointer-events-none h-full w-full" style="transform-origin: {side}">
	<div
		class="relative z-0 h-full w-full"
		style="background: linear-gradient(
            to {oppositeSide[side]},
            rgb(from {tint} r g b / alpha) 0%,
            rgb(from {tint} r g b / 0%) 100%
        )"
	>
		<div
			class="absolute inset-0 z-1"
			style="mask: linear-gradient(
                to {oppositeSide[side]},
                rgba(0, 0, 0, 1) {mainPercentage}%,
                rgba(0, 0, 0, 0) {mainPercentage + step}%
            ); 
            backdrop-filter: {getBackdropFilter(0)}; 
            -webkit-backdrop-filter: {getBackdropFilter(0)};"
		></div>
		{#if actualSteps > 1}
			<div
				class="absolute inset-0 z-2"
				style="mask: linear-gradient(
                to {oppositeSide[side]},
                rgba(0, 0, 0, 1) {mainPercentage}%,
                rgba(0, 0, 0, 1) {mainPercentage + step}%,
                rgba(0, 0, 0, 0) {mainPercentage + step * 2}%
            );
            backdrop-filter: {getBackdropFilter(1)};
            -webkit-backdrop-filter: {getBackdropFilter(1)};"
			></div>
		{/if}

		{#if actualSteps > 2}
			{#each Array.from({ length: actualSteps - 2 }) as _, i}
				<div
					class="absolute inset-0"
					style="z-index: {i + 2};
                mask: linear-gradient(
                    to {oppositeSide[side]},
                    rgba(0, 0, 0, 0) {mainPercentage + i * step}%,
                    rgba(0, 0, 0, 1) {mainPercentage + (i + 1) * step}%,
                    rgba(0, 0, 0, 1) {mainPercentage + (i + 2) * step}%,
                    rgba(0, 0, 0, 0) {mainPercentage + (i + 3) * step}%
                );
                backdrop-filter: {getBackdropFilter(i + 2)};
                -webkit-backdrop-filter: {getBackdropFilter(i + 2)};"
				></div>
			{/each}
		{/if}
	</div>
</div>
