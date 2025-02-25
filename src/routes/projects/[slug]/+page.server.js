import { error } from '@sveltejs/kit';
import { marked } from 'marked';
import fetch from 'node-fetch';
import { projects } from '../data.js';

export async function load({ params }) {
    const project = projects.find(project => project.slug === params.slug);
    if (!project) {
        throw error(404, 'Project not found');
    }

	const response = await fetch("https://raw.githubusercontent.com/" + project.url + "/refs/heads/master/README.md");
	if (!response.ok) {
		throw error(404, 'Markdown file not found');
	}
	const markdown = await response.text();
	const html = marked(markdown);

	return {
		html,
		project
	};
}
