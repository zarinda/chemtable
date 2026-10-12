import { dev } from '$app/env';
import { page } from '$app/state';

/**
 * Ads mock is on in `npm run dev` only; `dev` short-circuits before the URL is read while
 * prerendering. Components also test `dev` directly around the dynamic import of
 * AdPreview.svelte, so the production build drops the mock entirely.
 */
export const showAds = () => dev && page.url.searchParams.get('ad') !== 'off';

/** Banner above the element instead of below it. */
export const adOnTop = () => page.url.searchParams.get('adpos') === 'top';
