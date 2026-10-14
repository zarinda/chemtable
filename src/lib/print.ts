import type { Lang } from './i18n/langs';

/** Printable PDF tables, rendered by `npm run pdf` into static/print/. */
export const PAPERS = ['a4', 'letter'] as const;
export type Paper = (typeof PAPERS)[number];

export const VARIANTS = ['color', 'bw'] as const;
export type Variant = (typeof VARIANTS)[number];

export const PAPER_LABEL: Record<Paper, string> = { a4: 'A4', letter: 'US Letter' };

export const printPath = (lang: Lang, paper: Paper, variant: Variant) =>
	`/print/${lang}/chemtable-periodic-table-${paper}-${variant}.pdf`;

/** Preview images of each sheet, rendered with the PDFs: thumbnail and full width. */
export const PREVIEW_WIDTHS = [640, 1600] as const;
export type PreviewWidth = (typeof PREVIEW_WIDTHS)[number];

/** Sheet sizes in millimetres, landscape. */
export const PAPER_MM: Record<Paper, { width: number; height: number }> = {
	a4: { width: 297, height: 210 },
	letter: { width: 279.4, height: 215.9 }
};

export const previewPath = (lang: Lang, paper: Paper, variant: Variant, width: PreviewWidth) =>
	`/print/${lang}/chemtable-periodic-table-${paper}-${variant}-${width}.webp`;

/** Pixel height of a preview, for the <img> size attributes. */
export const previewHeight = (paper: Paper, width: number) =>
	Math.round((width * PAPER_MM[paper].height) / PAPER_MM[paper].width);
