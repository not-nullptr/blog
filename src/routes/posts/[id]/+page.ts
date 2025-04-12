import { Post } from '$lib/posts/index.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const post = Post.fromId(params.id);
	if (!post) {
		return error(404, `Post "${params.id}" not found`);
	}

	return { post };
}
