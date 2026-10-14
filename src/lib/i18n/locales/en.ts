import type { Dict } from '../ui';

export const en: Dict = {
	reviewed: true,
	siteName: 'ChemTable',
	title: 'Periodic table of the chemical elements',
	hint: 'Hover an element, or Tab into the table and move with the arrow keys. Press an element to open its card.',
	hintTouch: 'Tap an element or slide your finger across the table',
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
		atomicRadius: 'Covalent radius',
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
	underPressure: 'only under pressure',
	sublimes: 'sublimes',
	anionUnstable: 'no stable negative ion',
	atomicMass: 'Atomic mass',
	massIsotope: 'mass number of the most stable isotope',
	config: 'Electron configuration',
	shells: 'Electrons per shell',
	boilingPoint: 'Boiling point',
	oxidationStates: 'Oxidation states',
	electronAffinity: 'Electron affinity',
	discovered: 'Discovered',
	ancient: 'known since antiquity',
	discoveredBy: 'Discovered by',
	namedAfter: 'Named after',
	close: 'Close',
	open: 'Open',
	sources: 'Data sources',
	sourcesNote:
		'Atomic masses: IUPAC CIAAW, abridged standard values; in square brackets, the mass number of the most stable isotope. Ionization energies: NIST. Electron affinities: measured values (Wikipedia table citing primary sources). Covalent radii: Cordero et al. (2008). Other properties: PubChem (NIH), checked against the CRC Handbook. Element names: Wikidata.',
	theme: { light: 'Light theme', dark: 'Dark theme', system: 'Match system' },
	language: 'Language',
	madeBy: 'Made by ',
	explainToggle: 'What this means',
	explain: {
		mass: 'Average mass of an atom in unified atomic mass units (1 u is 1/12 of the mass of a carbon-12 atom). Accounts for the natural mix of the element’s isotopes.',
		group:
			'Number of the vertical column, 1 to 18 in IUPAC numbering. Elements in a group share the same outer-shell layout, so their properties are alike.',
		period:
			'Number of the horizontal row. Usually equal to the number of electron shells in the atom; palladium is the exception, with four shells in period 5.',
		block:
			'The subshell (s, p, d or f) that receives the last electrons in the usual filling order; it divides the table into four blocks. Real atoms sometimes differ: lanthanum starts the f-block but has no f electrons.',
		config:
			'How electrons are arranged in subshells. The bracket stands for the previous noble gas; the superscript is the number of electrons in a subshell.',
		shells: 'Number of electrons in each shell, from the nucleus outwards.',
		electronegativity:
			'How strongly an atom pulls electrons towards itself in a chemical bond. On the Pauling scale it runs from 0.79 for caesium to 3.98 for fluorine.',
		atomicRadius:
			'Half the length of a single covalent bond between two atoms of the element. It shows the size of an atom inside a molecule or crystal: 76 pm for carbon, 132 pm for iron.',
		density: 'Mass of one cubic centimetre of the substance. For gases, at 0 °C and standard pressure.',
		meltingPoint:
			'Temperature at which the solid turns liquid at standard pressure. Helium, carbon and arsenic do not melt at normal pressure: helium needs about 25 atm, carbon and arsenic turn straight into vapour.',
		boilingPoint:
			'Temperature at which the liquid boils at standard pressure. For carbon and arsenic, the temperature at which the solid turns straight into vapour (sublimation).',
		ionizationEnergy:
			'Energy needed to remove the most loosely bound electron from an atom. The lower it is, the more easily the element gives up an electron, which is typical of metals.',
		electronAffinity:
			'Energy released when a neutral atom gains an electron. Highest for the halogens. Noble gases, nitrogen and some metals form no stable negative ion.',
		oxidationStates: 'Main formal charges the atom takes in its compounds.'
	},
	trend: {
		mass: 'Grows with atomic number, with a few exceptions: argon is heavier than potassium, cobalt than nickel, tellurium than iodine, thorium than protactinium.',
		electronegativity:
			'Rises left to right across a period and falls down a group. Fluorine has the highest value.',
		atomicRadius: 'Generally shrinks left to right across a period and grows down a group.',
		density:
			'The densest are metals in the middle of period 6: osmium and iridium. The scale is logarithmic because gases are thousands of times lighter than metals.',
		meltingPoint: 'Highest for carbon and the transition metals, lowest for helium and hydrogen.',
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
			'Colour the table by category or by a property to see the periodic trends: how electronegativity rises towards fluorine, or how atoms grow larger down each group.'
		]
	},
	data: {
		heading: 'Open data',
		text: 'The full dataset for all 118 elements is free to download. A plain-text summary for AI assistants is in llms.txt.'
	},
	licenses: 'Licences',
	privacy: {
		title: 'Privacy policy',
		description:
			'How ChemTable handles your data: no accounts, no analytics, no tracking. What the browser stores, what the host sees and how ads use cookies.',
		updated: 'Last updated:',
		intro: (author) =>
			`ChemTable is made by ${author}, a company registered in the Republic of Armenia. This page explains what happens to data when you use the site.`,
		sections: {
			collect: {
				heading: 'What we collect',
				paragraphs: [
					'Nothing that identifies you. ChemTable has no accounts, forms or comments, and uses no analytics or tracking.'
				]
			},
			storage: {
				heading: 'Settings in your browser',
				paragraphs: [
					'If you pick a light or dark theme, the choice is saved in your browser’s local storage so the site remembers it. It never leaves your device; clearing the site data in your browser deletes it.'
				]
			},
			hosting: {
				heading: 'Hosting',
				paragraphs: [
					'The site is served by Cloudflare. Like any web server, Cloudflare processes your IP address and technical details of each request, such as the browser and the page, to deliver the pages and protect the site from attacks. We do not use this information to identify visitors.'
				]
			},
			external: {
				heading: 'Other sites',
				paragraphs: [
					'Element pages link to Wikipedia, PubChem and Wikidata, which have their own privacy policies. Fonts are served from this site, not by third parties.'
				]
			},
			children: {
				heading: 'Children',
				paragraphs: [
					'ChemTable is made for school and university students. We do not knowingly collect personal data from anyone, children included.'
				]
			},
			ads: {
				heading: 'Advertising',
				paragraphs: [
					'Ads on ChemTable are served by Google AdSense. Google and its partners use cookies and similar technologies to show ads, limit how often the same ad appears, measure ads and prevent fraud.',
					'Because many visitors are children, we ask Google to treat every page as directed at children. Google then shows only non-personalised ads, chosen by the page you are reading rather than by your browsing history, and no remarketing.',
					'Third-party vendors, including Google, can use cookies to show ads based on your earlier visits to this and other websites. On ChemTable such personalised ads are switched off, as described above. You can also turn off personalised ads for your Google account in Ads Settings, and opt out of other vendors’ cookies at aboutads.info or youronlinechoices.eu.',
					'In the European Economic Area, the United Kingdom and Switzerland the site asks for your consent before ad cookies are used. You can change your choice at any time with the privacy and cookie settings link on the page.'
				]
			},
			rights: {
				heading: 'Your rights',
				paragraphs: [
					'Depending on where you live, laws such as the EU General Data Protection Regulation and the Law of the Republic of Armenia on Protection of Personal Data give you the right to know what data about you is held, to have it corrected or deleted, and to object to its use. ChemTable itself keeps no personal data about visitors.'
				]
			},
			changes: {
				heading: 'Changes',
				paragraphs: [
					'When this policy changes, the date at the top of the page changes with it.'
				]
			}
		},
		adsOff:
			'ChemTable shows no ads at the moment. If we add them, this section will describe their cookies before the first ad appears.',
		contact: 'Questions about this policy:',
		back: 'Back to the periodic table'
	},
	notFound: {
		title: 'Page not found',
		text: 'There is no page at this address. The link may have a typo, or the page may have moved.',
		suggest: 'Perhaps you were looking for:',
		back: 'Go to the periodic table',
		beyond: (name, z) =>
			`There is no element 404 either: the heaviest known element is ${name.toLowerCase()}, number ${z}.`
	},
	print: {
		heading: 'Printable periodic table',
		text: 'A free PDF to download and print, in landscape. The black-and-white version saves ink: categories are told apart by texture.',
		color: 'Colour',
		bw: 'Black and white',
		atomicNumber: 'Atomic number',
		symbol: 'Symbol',
		name: 'Name'
	},
	printPage: {
		title: 'Printable periodic table',
		seoTitle: 'Printable periodic table: free PDF, A4 and US Letter | ChemTable',
		description: 'Free printable periodic table in English: a vector PDF for A4 and US Letter, in colour or black and white. Atomic numbers, masses, electronegativity.',
		lead: 'Free PDFs in English: A4 and US Letter, colour and black and white. Download and print, no sign-up.',
		paper: 'Paper size',
		color: 'Colour',
		download: 'Download PDF',
		preview: 'Sheet preview',
		notes: (date) => [
			'Vector PDF: the text stays sharp at any size, and you can search and copy it.',
			'The black-and-white version is for an ordinary printer: categories differ by texture, not only by colour.',
			'Print at 100% (“Actual size”), in landscape.',
			`Data from IUPAC (CIAAW), NIST and PubChem; updated ${date}.`
		],
		variants: 'All versions',
		otherLangs: 'In other languages',
		link: 'Preview and all versions'
	},
	propertyPage: {
		title: {
			mass: 'Atomic Mass of the Elements',
			electronegativity: 'Electronegativity of the Elements',
			atomicRadius: 'Covalent Radius of the Elements',
			density: 'Density of the Elements',
			meltingPoint: 'Melting Point of the Elements',
			ionizationEnergy: 'Ionization Energy of the Elements'
		},
		seoTitle: (title) => `${title}: Chart and List of Values | ChemTable`,
		description: {
			mass: 'IUPAC standard atomic weights of 84 elements, for the rest the mass number of the most stable isotope: a list from heaviest to lightest and a coloured table.',
			electronegativity: 'Pauling electronegativity of every element, as a ranked list and a colour-coded periodic table. Fluorine has the highest value, 3.98.',
			atomicRadius: 'Covalent radii of the elements in picometres (Cordero 2008): a list by atom size and a periodic table coloured by radius.',
			density: 'Density of the elements in g/cm³: a list from the densest, osmium and iridium, to the lightest, and a periodic table coloured by density.',
			meltingPoint: 'Melting points of the elements in °C and K: a list from the highest to the lowest and a periodic table coloured by melting point.',
			ionizationEnergy: 'First ionization energies of the elements in eV from NIST: a ranked list and a periodic table. Highest for helium, lowest for caesium.'
		},
		list: {
			mass: 'All elements by atomic mass',
			electronegativity: 'All elements by electronegativity',
			atomicRadius: 'All elements by covalent radius',
			density: 'All elements by density',
			meltingPoint: 'All elements by melting point',
			ionizationEnergy: 'All elements by ionization energy'
		},
		sortBy: 'Order',
		sort: { desc: 'Highest first', asc: 'Lowest first', z: 'By atomic number' },
		missing: 'No data',
		source: 'Source',
		allValues: 'All values as a list',
		all: 'Properties of the elements'
	},
	molar: {
		title: 'Molar mass calculator',
		seoTitle: 'Molar mass calculator: g/mol from a chemical formula | ChemTable',
		description: 'Free molar mass calculator: type a formula such as H2SO4, Ca(OH)2 or CuSO4·5H2O to get g/mol, each element’s share and the working. IUPAC atomic weights.',
		lead: 'Type a chemical formula, for example H2SO4, Ca(OH)2 or CuSO4·5H2O. The calculator shows the molar mass and what each element adds to it. Atomic weights are from IUPAC (CIAAW), as in the table.',
		formula: 'Formula',
		placeholder: 'For example, Ca(OH)2',
		clear: 'Clear',
		insert: 'Insert',
		result: 'Molar mass',
		unit: 'g/mol',
		school: (masses) => `For school problems (${masses})`,
		parts: 'Breakdown by element',
		rounding: 'The result is rounded to the precision of the least precise atomic weight.',
		popular: 'Common substances',
		whatIs: 'What is molar mass?',
		whatIsText: (example) => [
			'Molar mass M is the mass of one mole of a substance, about 6.022 × 10²³ of its particles. It is measured in grams per mole (g/mol).',
			'To find it, add up the atomic weights of all the atoms in the formula: multiply each element’s atomic weight by its subscript, the number of its atoms. In g/mol, the molar mass equals the relative molecular mass Mr.',
			`For water: ${example}.`
		],
		errors: {
			syntax: 'The formula can’t be read. Check the brackets and signs, as in Ca(OH)2.',
			symbol: (symbol) =>
				`There is no element “${symbol}”. A symbol starts with a capital letter, and a second letter is lower case: Na, Cl.`,
			case: 'Element symbols start with a capital letter.',
			coefficient:
				'A number in front of the whole formula is a coefficient from an equation: it counts moles, and the molar mass does not depend on it.',
			suggest: ['Did you mean', '?'],
			weight: (name, symbol) =>
				`${name} (${symbol}) has no stable isotopes and no constant natural composition, so IUPAC gives it no standard atomic weight.`
		},
		compound: {
			title: (of) => `Molar mass of ${of}`,
			seoTitle: (of, formula, value) => `Molar mass of ${of} (${formula}): ${value} g/mol | ChemTable`,
			description: (of, formula, value, calc, school) =>
				`The molar mass of ${of}, ${formula}, is ${value} g/mol. Working: ${calc}. For school problems, ${school} g/mol.`,
			aka: 'Also called',
			sources: 'Atomic weights from IUPAC (CIAAW).',
			pubchemSame: (value) => `Agrees with PubChem: ${value} g/mol.`,
			pubchemDiff: (value) =>
				`PubChem gives ${value} g/mol: the last digit differs because the atomic weights are rounded differently.`
		}
	},
	moreOnSite: 'More on ChemTable',
	footer: {
		tools: 'Tools',
		properties: 'Properties of the elements: the table coloured by each, and every value',
		molar: 'Molar mass',
		sources: 'Data sources',
		sourceFor: {
			ciaaw: 'atomic masses',
			nist: 'ionization energies',
			pubchem: 'other properties, checked against the CRC Handbook',
			cordero: 'covalent radii',
			wikipedia: 'electron affinities',
			wikidata: 'names in 8 languages'
		},
		updated: (date) => `Data updated ${date}`
	}
};
