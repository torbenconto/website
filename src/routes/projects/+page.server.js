import { projects } from './data.js';

export function load() {
	return {
		projects: projects.map((project) => ({
			slug: project.slug,
			title: project.title
		}))
	};
}
