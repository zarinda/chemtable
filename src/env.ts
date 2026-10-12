import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	PUBLIC_SITE_URL: {
		public: true,
		static: true,
		description:
			'Absolute origin of the deployed site, without a trailing slash. Used for canonical links, hreflang, the sitemap and Open Graph.',
		// The production domain by default, so CI builds need no configuration.
		schema: (value) => (value || 'https://chemtable.org').replace(/\/+$/, '')
	}
});
