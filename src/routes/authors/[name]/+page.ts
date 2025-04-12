import { Author } from '$lib/posts/index.js';
import { error } from '@sveltejs/kit';

export function load({ params }) {
	const author = Author.fromName(params.name);
	if (!author) {
		return error(404, `Author "${params.name}" not found`);
	}
	return {
		author
	};
}
