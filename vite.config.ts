import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			adapter: adapter({ fallback: undefined }),

			// Absolute /_app/… asset URLs: the 404 page is served at any depth (/ru/a/b/c),
			// where the default relative ../_app/… would point to a missing folder.
			paths: { relative: false },

			// Most visitors land on one page from search: inline the ~23 KB of CSS
			// rather than block the first paint on two stylesheet requests.
			inlineStyleThreshold: 20_000,

			// Files for crawlers that no page links to.
			prerender: {
				entries: ['*', '/robots.txt', '/sitemap.xml', '/llms.txt', '/llms-full.txt']
			}
		})
	]
});
