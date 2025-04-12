import type { Component, Snippet } from 'svelte';
import authors from '$lib/authors/authors.json';
import Twitter from 'virtual:icons/fa6-brands/x-twitter';
import Github from 'virtual:icons/fa6-brands/github';
import type { SVGAttributes } from 'svelte/elements';

export interface RawPostMetadata {
	title: string;
	date: string;
	author: string;
}

export class Author {
	public name: string;
	public avatar: string;
	public bio: string;
	public socials: ((typeof authors)[number]['socials'][number] & {
		Icon: Component<
			SVGAttributes<SVGSVGElement>,
			object,
			keyof SVGAttributes<SVGSVGElement>
		> | null;
	})[];

	constructor(name: string) {
		const { avatar, bio, socials } = Author._fromName(name);
		this.name = name;
		this.avatar = avatar;
		this.bio = bio;
		this.socials = socials.map((social) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			let icon: any = null;
			switch (social.id) {
				case 'twitter': {
					icon = Twitter;
					break;
				}

				case 'github': {
					icon = Github;
					break;
				}
			}

			return {
				...social,
				Icon: icon
			};
		});
	}

	private static _fromName(name: string) {
		const author = authors.find((author) => author.name === name);
		if (!author) {
			throw new Error(`Author ${name} not found`);
		}
		const avatars = import.meta.glob('$lib/authors/*.png', { eager: true });
		const avatar = Object.entries(avatars).find(
			([key]) => key.split('/').pop()?.replace('.png', '') === name
		)?.[1] as { default: string };
		if (!avatar) {
			throw new Error(`Avatar for author ${name} not found`);
		}
		return {
			...author,
			avatar: avatar.default
		};
	}

	get posts() {
		const all = Post.all();
		return all.filter((post) => post.author.name === this.name);
	}

	public static all(): Author[] {
		return authors.map((author) => new Author(author.name));
	}

	public static fromName(name: string): Author | undefined {
		const author = Author.all().find((author) => author.name === name);
		return author;
	}
}

export class Post {
	public id: string;
	public title: string;
	public date: Date;
	public author: Author;
	public snippet: Snippet;

	constructor(id: string, metadata: RawPostMetadata, snippet: Snippet) {
		this.title = metadata.title;
		this.date = new Date(metadata.date);
		this.author = new Author(metadata.author);
		this.snippet = snippet;
		this.id = id.split('/').pop()?.replace('.svx', '') || 'unknown';
	}

	public static all(): Post[] {
		const posts = import.meta.glob('$lib/posts/*.svx', { eager: true });
		return Object.entries(posts).map(([key, _value]) => {
			const value = _value as { default: Snippet; metadata: RawPostMetadata };
			return new Post(key, value.metadata, value.default);
		});
	}

	public static fromId(id: string): Post | undefined {
		const post = Post.all().find((post) => post.id === id);
		return post;
	}
}
