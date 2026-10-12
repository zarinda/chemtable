import type { Lang } from './i18n/langs';

/** Printable PDF tables, rendered by `npm run pdf` into static/print/. */
export const PAPERS = ['a4', 'letter'] as const;
export type Paper = (typeof PAPERS)[number];

export const VARIANTS = ['color', 'bw'] as const;
export type Variant = (typeof VARIANTS)[number];

export const PAPER_LABEL: Record<Paper, string> = { a4: 'A4', letter: 'US Letter' };

export const printPath = (lang: Lang, paper: Paper, variant: Variant) =>
	`/print/${lang}/chemtable-periodic-table-${paper}-${variant}.pdf`;
