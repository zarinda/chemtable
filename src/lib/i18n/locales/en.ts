import type { Dict } from '../ui';

export const en: Dict = {
	reviewed: true,
	siteName: 'ChemTable',
	title: 'Periodic table of the chemical elements',
	hint: 'Hover an element, or Tab into the table and move with the arrow keys. Press an element to open its card.',
	colorBy: 'Colour the table by',
	categories: 'Categories',
	category: {
		'alkali-metal': 'Alkali metals',
		'alkaline-earth-metal': 'Alkaline earth metals',
		'transition-metal': 'Transition metals',
		'post-transition-metal': 'Post-transition metals',
		metalloid: 'Metalloids',
		nonmetal: 'Nonmetals',
		halogen: 'Halogens',
		'noble-gas': 'Noble gases',
		lanthanide: 'Lanthanides',
		actinide: 'Actinides'
	},
	property: {
		mass: 'Atomic mass',
		electronegativity: 'Electronegativity',
		atomicRadius: 'Van der Waals radius',
		density: 'Density',
		meltingPoint: 'Melting point',
		ionizationEnergy: 'Ionization energy'
	},
	unit: {
		mass: 'u',
		electronegativity: 'Pauling',
		atomicRadius: 'pm',
		density: 'g/cm³',
		meltingPoint: '°C',
		ionizationEnergy: 'eV'
	},
	noData: 'no data',
	period: 'Period',
	group: 'Group',
	block: 'Block',
	state: { solid: 'Solid', liquid: 'Liquid', gas: 'Gas' },
	predicted: 'predicted',
	atomicMass: 'Atomic mass',
	massIsotope: 'mass number of the most stable isotope',
	config: 'Electron configuration',
	shells: 'Electrons per shell',
	boilingPoint: 'Boiling point',
	oxidationStates: 'Oxidation states',
	electronAffinity: 'Electron affinity',
	discovered: 'Discovered',
	ancient: 'known since antiquity',
	close: 'Close',
	sources: 'Data sources',
	sourcesNote:
		'Properties from PubChem (NIH). Atomic masses from IUPAC CIAAW, abridged standard values. Values in square brackets are the mass number of the most stable isotope. Element names from Wikidata.',
	theme: { light: 'Light theme', dark: 'Dark theme', system: 'Match system' },
	language: 'Language',
	madeBy: 'Made by ',
	explainToggle: 'What this means',
	explain: {
		mass: 'Average mass of an atom in unified atomic mass units (1 u is 1/12 of the mass of a carbon-12 atom). Accounts for the natural mix of the element’s isotopes.',
		group:
			'Number of the vertical column, 1 to 18 in IUPAC numbering. Elements in a group share the same outer-shell layout, so their properties are alike.',
		period: 'Number of the horizontal row. Equal to the number of electron shells in the atom.',
		block:
			'The subshell (s, p, d or f) that receives electrons last. Each block forms a rectangular area of the table.',
		config:
			'How electrons are arranged in subshells. The bracket stands for the previous noble gas; the superscript is the number of electrons in a subshell.',
		shells: 'Number of electrons in each shell, from the nucleus outwards.',
		electronegativity:
			'How strongly an atom pulls electrons towards itself in a chemical bond. On the Pauling scale it runs from 0.7 for francium to 3.98 for fluorine.',
		atomicRadius:
			'Half the distance at which two neighbouring, non-bonded atoms approach each other. It is larger than the covalent or metallic radius in textbooks: 194 pm for iron versus about 126 pm.',
		density: 'Mass of one cubic centimetre of the substance. For gases, at 0 °C and standard pressure.',
		meltingPoint: 'Temperature at which the solid turns liquid at standard pressure.',
		boilingPoint: 'Temperature at which the liquid boils at standard pressure.',
		ionizationEnergy:
			'Energy needed to remove the most loosely bound electron from an atom. The lower it is, the more easily the element gives up an electron, which is typical of metals.',
		electronAffinity: 'Energy released when a neutral atom gains an electron. Highest for the halogens.',
		oxidationStates: 'Formal charges the atom can take in its compounds.'
	},
	trend: {
		mass: 'Grows with atomic number: left to right and top to bottom.',
		electronegativity:
			'Rises left to right across a period and falls down a group. Fluorine has the highest value.',
		atomicRadius: 'Generally shrinks left to right across a period and grows down a group.',
		density:
			'The densest are metals in the middle of period 6: osmium and iridium. The scale is logarithmic because gases are thousands of times lighter than metals.',
		meltingPoint: 'Highest for carbon and the transition metals, lowest for the noble gases.',
		ionizationEnergy:
			'Rises left to right across a period, peaking at the noble gases. Falls down a group.'
	},

	seo: {
		homeTitle: 'Interactive Periodic Table of the Elements | ChemTable',
		homeDescription:
			'Interactive periodic table of all 118 elements: atomic mass, electron configuration, electronegativity, density and more, with explanations for students.',
		elementTitle: (name, symbol) => `${name} (${symbol}): properties and atomic mass | ChemTable`,
		elementDescription: (f) =>
			`${f.name} (${f.symbol}), atomic number ${f.z}: ${f.category.toLowerCase()}` +
			(f.mass ? `, ${f.massIsIsotope ? 'mass number' : 'atomic mass'} ${f.mass}` : '') +
			`. Electron configuration, density, melting point, electronegativity and more.`
	},
	article: {
		kicker: (z) => `Chemical element ${z}`,
		summary: (f) =>
			[
				`${f.name} (${f.symbol}) is a chemical element with atomic number ${f.z}.`,
				f.group
					? `It sits in group ${f.group} and period ${f.period} of the periodic table, in the ${f.block}-block.`
					: `It sits in period ${f.period} of the periodic table, in the ${f.block}-block.`,
				`It belongs to the ${f.category.toLowerCase()}.`,
				f.statePredicted
					? `At room temperature it is predicted to be a ${f.state.toLowerCase()}.`
					: `At room temperature it is a ${f.state.toLowerCase()}.`,
				f.mass
					? f.massIsIsotope
						? `It has no standard atomic weight; the mass number of its most stable isotope is ${f.mass}.`
						: `Its standard atomic weight is ${f.mass}.`
					: ''
			]
				.filter(Boolean)
				.join(' '),
		properties: 'Properties',
		property: 'Property',
		value: 'Value',
		related: 'Related elements',
		sameGroup: (g) => `Group ${g}`,
		samePeriod: (p) => `Period ${p}`,
		previous: 'Previous element',
		next: 'Next element',
		readMore: 'Read more',
		wikipedia: 'Wikipedia',
		backToTable: 'Back to the table'
	},
	about: {
		heading: 'About this periodic table',
		paragraphs: [
			'An interactive periodic table of all 118 chemical elements, made for students. Open any element to see its atomic mass, electron configuration, melting and boiling points, density, electronegativity, ionization energy and oxidation states, each with a short explanation.',
			'Colour the table by category or by a property to see the periodic trends: how electronegativity rises towards fluorine, or how atoms grow larger down each group.',
			'Properties come from PubChem (US National Institutes of Health), standard atomic weights from IUPAC CIAAW, and element names in eight languages from Wikidata.'
		]
	},
	data: {
		heading: 'Open data',
		text: 'The full dataset for all 118 elements is free to download. A plain-text summary for AI assistants is in llms.txt.'
	},
	print: {
		heading: 'Printable periodic table',
		text: 'A free PDF to download and print, in landscape. The black-and-white version saves ink: categories are told apart by texture.',
		color: 'Colour',
		bw: 'Black and white',
		atomicNumber: 'Atomic number',
		symbol: 'Symbol',
		name: 'Name'
	}
};
