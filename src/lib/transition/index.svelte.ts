import type { Post } from '$lib/posts';
import { quintOut } from 'svelte/easing';
import {
	crossfade,
	type CrossfadeParams,
	type EasingFunction,
	type TransitionConfig
} from 'svelte/transition';

const [_send, _receive] = crossfade({ duration: 300 });

export const easing = quintOut;
export const duration = 500;

export const send = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	node: any,
	params: CrossfadeParams & {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		key: any;
	}
) => {
	return _send(node, {
		easing,
		duration,
		...params
	});
};

export const receive = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	node: any,
	params: CrossfadeParams & {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		key: any;
	}
) => {
	return _receive(node, {
		easing,
		duration,
		...params
	});
};

class TransitionState {
	clickedPost: Post | null = null;
}

export const transitionState = $state(new TransitionState());

const remap = (value: number, low1: number, high1: number, low2: number, high2: number) =>
	low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);

const choose = (
	direction: 'in' | 'out' | 'both',
	defaultValue: number,
	inValue?: number,
	outValue?: number
) =>
	direction !== 'out'
		? typeof inValue === 'number'
			? inValue
			: defaultValue
		: typeof outValue === 'number'
			? outValue
			: defaultValue;

type Combination<T extends string, U extends string> = `${T} ${U}`;

export const blur = (
	_: HTMLElement,
	config:
		| Partial<{
				blurMultiplier: number;
				duration: number;
				easing: EasingFunction;
				scale: {
					start: number;
					end: number;
				};
				x: {
					start: number;
					end: number;
				};
				y: {
					start: number;
					end: number;
				};
				delay: number;
				opacity: boolean;
				origin: Combination<
					'top' | 'bottom' | 'left' | 'right' | 'center',
					'top' | 'bottom' | 'left' | 'right' | 'center'
				> & {};
		  }>
		| undefined,
	dir: {
		direction: 'in' | 'out' | 'both';
	}
): TransitionConfig => {
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (typeof config?.opacity === 'undefined' && config) config.opacity = true;
	const isUsingTranslate = !!config?.x || !!config?.y || !!config?.scale;
	return {
		delay: config?.delay || 0,
		duration: prefersReducedMotion ? 0 : config?.duration || 300,
		css: (t) => {
			if (prefersReducedMotion) return '';
			const translate = isUsingTranslate
				? `translate(${remap(
						t,
						0,
						1,
						choose(dir.direction, 0, config?.x?.start, config?.x?.end),
						choose(dir.direction, 0, config?.x?.end, config?.x?.start)
					)}px, ${remap(
						t,
						0,
						1,
						choose(dir.direction, 0, config?.y?.start, config?.y?.end),
						choose(dir.direction, 0, config?.y?.end, config?.y?.start)
					)}px) scale(${remap(
						t,
						0,
						1,
						choose(dir.direction, 0.9, config?.scale?.start, config?.scale?.end),
						choose(dir.direction, 1, config?.scale?.end, config?.scale?.start)
					)})`
				: ``;
			return `filter: blur(${(1 - t) * (config?.blurMultiplier || 1)}px); opacity: ${config?.opacity ? t : 1}; transform: ${
				translate
			}; ${config?.origin ? `transform-origin: ${config.origin};` : ''}`;
		},
		easing: config?.easing || easing
	};
};
