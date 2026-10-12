import { absolute } from '#lib/seo.ts';
import type { RequestHandler } from './$types';

export const prerender = true;

/**
 * Everything is public. AI crawlers are named explicitly so the intent is unambiguous:
 * we want assistants such as ChatGPT, Claude and Perplexity to read and cite the site.
 */
const AI_AGENTS = [
	'GPTBot',
	'OAI-SearchBot',
	'ChatGPT-User',
	'ClaudeBot',
	'Claude-SearchBot',
	'Claude-User',
	'PerplexityBot',
	'Perplexity-User',
	'Google-Extended',
	'Applebot-Extended',
	'CCBot'
];

export const GET: RequestHandler = () => {
	const body = [
		'User-agent: *',
		'Allow: /',
		'',
		...AI_AGENTS.flatMap((agent) => [`User-agent: ${agent}`, 'Allow: /', '']),
		`Sitemap: ${absolute('/sitemap.xml')}`,
		''
	].join('\n');
	return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
