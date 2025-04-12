import { Post } from '$lib/posts';

export function load() {
	const posts = Post.all();
	return { posts };
}
