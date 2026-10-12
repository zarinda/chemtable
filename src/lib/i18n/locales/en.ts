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
			'The subshell (s, p, d or f) that receives electrons last. Each block forms a rectangular area of the table.',
		config:
			'How electrons are arranged in subshells. The bracket stands for the previous noble gas; the superscript is the number of electrons in a subshell.',
		shells: 'Number of electrons in each shell, from the nucleus outwards.',
		electronegativity:
			'How strongly an atom pulls electrons towards itself in a chemical bond. On the Pauling scale it runs from 0.7 for francium to 3.98 for fluorine.',
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
		mass: 'Grows with atomic number, with a few exceptions: argon is heavier than potassium, cobalt than nickel, tellurium than iodine.',
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
			'Atomic masses come from IUPAC CIAAW, ionization energies from NIST, covalent radii from Cordero et al. (2008) and other properties from PubChem (US National Institutes of Health), checked against the CRC Handbook. Element names in eight languages come from Wikidata.'
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
