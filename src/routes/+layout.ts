export const load = ({ url }) => {
	const { pathname } = url;
	return { pathname };
};

export const prerender = true;
export const trailingSlash = 'always';
