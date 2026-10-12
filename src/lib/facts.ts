import type { Element } from './elements';
import type { Lang } from './i18n/langs';
import { UI, type SummaryFacts } from './i18n/ui';
import { formatMass } from './format';

/** Formatted facts for an element's summary sentence and meta description. */
export function summaryFacts(e: Element, lang: Lang): SummaryFacts {
	const t = UI[lang];
	const isotope = e.mass.source !== 'ciaaw';
	return {
		name: e.name[lang],
		symbol: e.symbol,
		z: e.z,
		group: e.group,
		period: e.period,
		block: e.block,
		category: t.category[e.category],
		state: t.state[e.state],
		statePredicted: e.statePredicted,
		mass: e.mass.text ? (isotope ? e.mass.text.replace(/[[\]]/g, '') : formatMass(e.mass.text, lang)) : null,
		massIsIsotope: isotope
	};
}
