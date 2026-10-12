import type { Element } from '../elements';
import { kelvinToCelsius } from '../format';

/** Plain-English, unit-bearing facts for one element, shared by llms-full.txt and the CSV. */
export function facts(e: Element) {
	const temp = (k: number | null) => (k === null ? null : `${kelvinToCelsius(k)} °C (${k} K)`);
	return {
		'Atomic number': e.z,
		Symbol: e.symbol,
		Category: e.category.replace(/-/g, ' '),
		Group: e.group,
		Period: e.period,
		Block: e.block,
		'Standard atomic weight':
			e.mass.source === 'ciaaw' ? e.mass.text : e.mass.text && `${e.mass.text} (mass number of the most stable isotope)`,
		'Electron configuration': e.config + (e.configPredicted ? ' (predicted)' : ''),
		'Electrons per shell': e.shells.join(', '),
		'State at room temperature': e.state + (e.statePredicted ? ' (predicted)' : ''),
		'Melting point': temp(e.meltingPoint),
		'Boiling point': temp(e.boilingPoint),
		'Density (g/cm³)': e.density,
		'Electronegativity (Pauling)': e.electronegativity,
		'First ionization energy (eV)': e.ionizationEnergy,
		'Electron affinity (eV)': e.electronAffinity,
		'Van der Waals radius (pm)': e.atomicRadius,
		'Oxidation states': e.oxidationStates.join(', ') || null,
		Discovered: e.yearDiscovered === 'ancient' ? 'known since antiquity' : e.yearDiscovered
	};
}
