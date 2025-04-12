import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const config = {
	preprocess: [
		vitePreprocess(),
		mdsvex({
			rehypePlugins: [
				[rehypeExternalLinks, { target: '_blank', rel: 'noopener noreferrer' }],
				[rehypeSlug],
				[rehypeAutolinkHeadings]
			]
		})
	],
	kit: { adapter: adapter() },
	extensions: ['.svelte', '.svx']
};

export default config;
