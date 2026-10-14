import type { Dict } from '../ui';

/** Narrow no-break space before French high punctuation (: ; ? !). */
const _ = ' ';

export const fr: Dict = {
	reviewed: false,
	siteName: 'ChemTable',
	title: 'Tableau périodique des éléments chimiques',
	hint: `Survolez un élément, ou entrez dans le tableau avec Tab et déplacez-vous avec les flèches. Cliquez sur un élément pour ouvrir sa fiche.`,
	hintTouch: 'Touchez un élément ou faites glisser le doigt sur le tableau',
	colorBy: 'Colorer le tableau par',
	categories: 'Catégories',
	category: {
		'alkali-metal': 'Métaux alcalins',
		'alkaline-earth-metal': 'Métaux alcalino-terreux',
		'transition-metal': 'Métaux de transition',
		'post-transition-metal': 'Métaux pauvres',
		metalloid: 'Métalloïdes',
		nonmetal: 'Non-métaux',
		halogen: 'Halogènes',
		'noble-gas': 'Gaz nobles',
		lanthanide: 'Lanthanides',
		actinide: 'Actinides'
	},
	property: {
		mass: 'Masse atomique',
		electronegativity: 'Électronégativité',
		atomicRadius: 'Rayon covalent',
		density: 'Masse volumique',
		meltingPoint: 'Température de fusion',
		ionizationEnergy: 'Énergie d’ionisation'
	},
	unit: {
		mass: 'u',
		electronegativity: 'Pauling',
		atomicRadius: 'pm',
		density: 'g/cm³',
		meltingPoint: '°C',
		ionizationEnergy: 'eV'
	},
	noData: 'pas de données',
	period: 'Période',
	group: 'Groupe',
	block: 'Bloc',
	state: { solid: 'Solide', liquid: 'Liquide', gas: 'Gaz' },
	predicted: 'prévu',
	underPressure: 'seulement sous pression',
	sublimes: 'sublimation',
	anionUnstable: 'pas d’ion négatif stable',
	atomicMass: 'Masse atomique',
	massIsotope: 'nombre de masse de l’isotope le plus stable',
	config: 'Configuration électronique',
	shells: 'Électrons par couche',
	boilingPoint: 'Température d’ébullition',
	oxidationStates: 'États d’oxydation',
	electronAffinity: 'Affinité électronique',
	discovered: 'Découverte',
	ancient: 'connu depuis l’Antiquité',
	discoveredBy: 'Découvert par',
	namedAfter: 'Nommé d’après',
	close: 'Fermer',
	open: 'Ouvrir',
	sources: 'Sources des données',
	sourcesNote: `Masses atomiques${_}: IUPAC CIAAW, valeurs standard abrégées${_}; entre crochets, nombre de masse de l’isotope le plus stable. Énergies d’ionisation${_}: NIST. Affinités électroniques${_}: valeurs mesurées (tableau de Wikipédia citant les sources primaires). Rayons covalents${_}: Cordero et al. (2008). Autres propriétés${_}: PubChem (NIH), vérifiées avec le CRC Handbook. Noms des éléments${_}: Wikidata.`,
	theme: { light: 'Thème clair', dark: 'Thème sombre', system: 'Comme le système' },
	language: 'Langue',
	madeBy: 'Créé par ',
	explainToggle: 'Ce que cela signifie',
	explain: {
		mass: 'Masse moyenne d’un atome en unités de masse atomique (1 u vaut 1/12 de la masse d’un atome de carbone 12). Tient compte du mélange naturel des isotopes de l’élément.',
		group:
			'Numéro de la colonne verticale, de 1 à 18 selon la numérotation de l’IUPAC. Les éléments d’un même groupe ont la même couche externe, donc des propriétés proches.',
		period: `Numéro de la ligne horizontale. Il est en général égal au nombre de couches électroniques de l’atome${_}; le palladium fait exception, avec quatre couches en période 5.`,
		block:
			`Sous-couche (s, p, d ou f) qui reçoit les derniers électrons dans l’ordre habituel de remplissage${_}; elle partage le tableau en quatre blocs. Certains atomes font exception${_}: le lanthane ouvre le bloc f mais n’a aucun électron f.`,
		config:
			'Répartition des électrons dans les sous-couches. Les crochets désignent le gaz noble précédent, l’exposant le nombre d’électrons dans une sous-couche.',
		shells: 'Nombre d’électrons sur chaque couche, du noyau vers l’extérieur.',
		electronegativity:
			'Capacité d’un atome à attirer les électrons dans une liaison chimique. Sur l’échelle de Pauling, elle va de 0,79 pour le césium à 3,98 pour le fluor.',
		atomicRadius: `Moitié de la longueur d’une liaison covalente simple entre deux atomes de l’élément. Il donne la taille de l’atome dans une molécule ou un cristal${_}: 76 pm pour le carbone, 132 pm pour le fer.`,
		density: 'Masse d’un centimètre cube de la substance. Pour les gaz, à 0 °C et à pression normale.',
		meltingPoint: `Température à laquelle le solide devient liquide à pression normale. L’hélium, le carbone et l’arsenic ne fondent pas à pression normale${_}: l’hélium demande environ 25 atm, le carbone et l’arsenic passent directement à l’état de vapeur.`,
		boilingPoint:
			'Température à laquelle le liquide bout à pression normale. Pour le carbone et l’arsenic, température à laquelle le solide se sublime.',
		ionizationEnergy:
			'Énergie nécessaire pour arracher à un atome son électron le moins lié. Plus elle est faible, plus l’élément cède facilement un électron, ce qui est typique des métaux.',
		electronAffinity:
			'Énergie libérée quand un atome neutre capte un électron. Elle est la plus élevée pour les halogènes. Les gaz nobles, l’azote et certains métaux ne forment pas d’ion négatif stable.',
		oxidationStates: 'Principales charges formelles que l’atome prend dans ses composés.'
	},
	trend: {
		mass: `Augmente avec le numéro atomique, à quelques exceptions près${_}: l’argon est plus lourd que le potassium, le cobalt que le nickel, le tellure que l’iode, le thorium que le protactinium.`,
		electronegativity:
			'Augmente de gauche à droite dans une période et diminue de haut en bas dans un groupe. Le fluor a la valeur la plus élevée.',
		atomicRadius:
			'Diminue en général de gauche à droite dans une période et augmente de haut en bas dans un groupe.',
		density:
			`Les plus denses sont les métaux au milieu de la période 6${_}: l’osmium et l’iridium. L’échelle est logarithmique, car les gaz sont des milliers de fois plus légers que les métaux.`,
		meltingPoint: 'La plus élevée pour le carbone et les métaux de transition, la plus basse pour l’hélium et l’hydrogène.',
		ionizationEnergy:
			'Augmente de gauche à droite dans une période, avec un maximum pour les gaz nobles. Diminue de haut en bas dans un groupe.'
	},

	seo: {
		homeTitle: 'Tableau périodique interactif des éléments | ChemTable',
		homeDescription:
			`Tableau périodique interactif des 118 éléments${_}: masse atomique, configuration électronique, électronégativité, masse volumique et explications pour les élèves.`,
		elementTitle: (name, symbol) => `${name} (${symbol})${_}: propriétés et masse atomique | ChemTable`,
		elementDescription: (f) =>
			`${f.name} (${f.symbol}), numéro atomique ${f.z}${_}: ${f.category.toLowerCase()}` +
			(f.mass ? `, ${f.massIsIsotope ? 'nombre de masse' : 'masse atomique'} ${f.mass}` : '') +
			`. Configuration électronique, masse volumique, électronégativité et plus.`
	},
	article: {
		kicker: (z) => `Élément chimique n° ${z}`,
		summary: (f) =>
			[
				`${f.name} (${f.symbol}) est un élément chimique de numéro atomique ${f.z}.`,
				f.group
					? `Il se trouve dans le groupe ${f.group} et la période ${f.period} du tableau périodique, dans le bloc ${f.block}.`
					: `Il se trouve dans la période ${f.period} du tableau périodique, dans le bloc ${f.block}.`,
				`Catégorie${_}: ${f.category.toLowerCase()}.`,
				`État à température ambiante${_}: ${f.state.toLowerCase()}${f.statePredicted ? ' (prévu)' : ''}.`,
				f.mass
					? f.massIsIsotope
						? `Il n’a pas de masse atomique standard${_}; le nombre de masse de son isotope le plus stable est ${f.mass}.`
						: `Sa masse atomique standard est de ${f.mass}.`
					: ''
			]
				.filter(Boolean)
				.join(' '),
		properties: 'Propriétés',
		property: 'Propriété',
		value: 'Valeur',
		related: 'Éléments voisins',
		sameGroup: (g) => `Groupe ${g}`,
		samePeriod: (p) => `Période ${p}`,
		previous: 'Élément précédent',
		next: 'Élément suivant',
		readMore: 'En savoir plus',
		wikipedia: 'Wikipédia',
		backToTable: 'Retour au tableau'
	},
	about: {
		heading: 'À propos de ce tableau périodique',
		paragraphs: [
			'Un tableau périodique interactif des 118 éléments chimiques, conçu pour les élèves et les étudiants. Ouvrez un élément pour voir sa masse atomique, sa configuration électronique, ses températures de fusion et d’ébullition, sa masse volumique, son électronégativité, son énergie d’ionisation et ses états d’oxydation, chacun avec une courte explication.',
			`Colorez le tableau par catégorie ou par propriété pour voir les tendances périodiques${_}: l’électronégativité qui augmente vers le fluor, ou les atomes qui grossissent en descendant chaque groupe.`
		]
	},
	data: {
		heading: 'Données ouvertes',
		text: 'L’ensemble des données sur les 118 éléments est téléchargeable librement. Un résumé en texte brut pour les assistants IA se trouve dans llms.txt.'
	},
	licenses: 'Licences',
	privacy: {
		title: 'Politique de confidentialité',
		description:
			`Comment ChemTable traite les données${_}: ni compte, ni statistiques, ni pistage. Ce que garde le navigateur, ce que voit l’hébergeur, les cookies publicitaires.`,
		updated: `Dernière mise à jour${_}:`,
		intro: (author) =>
			`ChemTable est réalisé par ${author}, une société immatriculée en République d’Arménie. Cette page explique ce qu’il advient des données lorsque vous utilisez le site.`,
		sections: {
			collect: {
				heading: 'Ce que nous collectons',
				paragraphs: [
					'Rien qui permette de vous identifier. ChemTable n’a ni compte, ni formulaire, ni commentaires, et n’utilise ni statistiques de visite ni pistage.'
				]
			},
			storage: {
				heading: 'Réglages dans votre navigateur',
				paragraphs: [
					`Si vous choisissez un thème clair ou sombre, ce choix est enregistré dans le stockage local de votre navigateur pour que le site s’en souvienne. Il ne quitte jamais votre appareil${_}; effacer les données du site dans le navigateur le supprime.`
				]
			},
			hosting: {
				heading: 'Hébergement',
				paragraphs: [
					'Le site est servi par Cloudflare. Comme tout serveur web, Cloudflare traite votre adresse IP et des informations techniques sur chaque requête, comme le navigateur et la page, pour livrer les pages et protéger le site contre les attaques. Nous n’utilisons pas ces informations pour identifier les visiteurs.'
				]
			},
			external: {
				heading: 'Autres sites',
				paragraphs: [
					'Les pages des éléments renvoient vers Wikipédia, PubChem et Wikidata, qui ont leurs propres politiques de confidentialité. Les polices sont servies par ce site, pas par des tiers.'
				]
			},
			children: {
				heading: 'Enfants',
				paragraphs: [
					'ChemTable s’adresse aux élèves et aux étudiants. Nous ne collectons sciemment de données personnelles auprès de personne, y compris les enfants.'
				]
			},
			ads: {
				heading: 'Publicité',
				paragraphs: [
					'Les publicités de ChemTable sont diffusées par Google AdSense. Google et ses partenaires utilisent des cookies et des technologies similaires pour afficher les annonces, limiter la répétition d’une même annonce, mesurer les publicités et prévenir la fraude.',
					'Comme beaucoup de visiteurs sont des enfants, nous demandons à Google de traiter toutes les pages comme destinées aux enfants. Google n’affiche alors que des annonces non personnalisées, choisies d’après la page consultée et non d’après votre historique de navigation, sans remarketing.',
					'Des fournisseurs tiers, dont Google, peuvent utiliser des cookies pour diffuser des annonces en fonction de vos visites précédentes sur ce site ou d’autres. Sur ChemTable, ces annonces personnalisées sont désactivées, comme indiqué ci-dessus. Vous pouvez aussi désactiver la publicité personnalisée pour votre compte Google dans les Paramètres des annonces, et refuser les cookies d’autres fournisseurs sur aboutads.info ou youronlinechoices.eu.',
					'Dans l’Espace économique européen, au Royaume-Uni et en Suisse, le site demande votre consentement avant d’utiliser des cookies publicitaires. Vous pouvez modifier votre choix à tout moment grâce au lien des paramètres de confidentialité et des cookies sur la page.'
				]
			},
			rights: {
				heading: 'Vos droits',
				paragraphs: [
					'Selon votre lieu de résidence, des lois comme le Règlement général sur la protection des données (RGPD) de l’UE et la loi de la République d’Arménie sur la protection des données personnelles vous donnent le droit de savoir quelles données vous concernant sont conservées, de les faire rectifier ou effacer et de vous opposer à leur utilisation. ChemTable ne conserve lui-même aucune donnée personnelle sur ses visiteurs.'
				]
			},
			changes: {
				heading: 'Modifications',
				paragraphs: [
					'Si cette politique change, la date en haut de la page change aussi.'
				]
			}
		},
		adsOff:
			'ChemTable n’affiche aucune publicité pour le moment. Si nous en ajoutons, cette section décrira leurs cookies avant l’apparition de la première annonce.',
		contact: `Questions sur cette politique${_}:`,
		back: 'Retour au tableau périodique'
	},
	notFound: {
		title: 'Page introuvable',
		text: 'Il n’y a aucune page à cette adresse. Le lien contient peut-être une faute de frappe, ou la page a été déplacée.',
		suggest: `Vous cherchiez peut-être${_}:`,
		back: 'Ouvrir le tableau périodique',
		beyond: (name, z) =>
			`L’élément 404 n’existe pas non plus${_}: le plus lourd connu est l’${name.toLowerCase()}, numéro ${z}.`
	},
	print: {
		heading: 'Tableau périodique à imprimer',
		text: 'Un PDF gratuit à télécharger et à imprimer, au format paysage. La version noir et blanc économise l’encre : les familles se distinguent par leur trame.',
		color: 'Couleur',
		bw: 'Noir et blanc',
		atomicNumber: 'Numéro atomique',
		symbol: 'Symbole',
		name: 'Nom'
	},
	printPage: {
		title: 'Tableau périodique à imprimer',
		seoTitle: 'Tableau périodique à imprimer : PDF gratuit, A4 et Letter | ChemTable',
		description: 'Tableau périodique à imprimer en français : PDF vectoriel gratuit, A4 et US Letter, couleur ou noir et blanc. Masses atomiques, électronégativité, électrons.',
		lead: 'PDF gratuits en français : A4 et US Letter, couleur et noir et blanc. Téléchargez et imprimez, sans inscription.',
		paper: 'Format du papier',
		color: 'Couleur',
		download: 'Télécharger le PDF',
		preview: 'Aperçu de la feuille',
		notes: (date) => [
			'PDF vectoriel : le texte reste net à toutes les tailles, on peut le rechercher et le copier.',
			'La version noir et blanc convient à une imprimante ordinaire : les familles se distinguent par leur trame, pas seulement par la couleur.',
			'Imprimez à 100 % (« Taille réelle »), en paysage.',
			`Données IUPAC (CIAAW), NIST, PubChem ; mises à jour le ${date}.`
		],
		variants: 'Toutes les versions',
		otherLangs: 'Dans d’autres langues',
		link: 'Aperçu et toutes les versions'
	},
	propertyPage: {
		title: {
			mass: 'Masse atomique des éléments',
			electronegativity: 'Électronégativité des éléments',
			atomicRadius: 'Rayon covalent des éléments',
			density: 'Masse volumique des éléments',
			meltingPoint: 'Température de fusion des éléments',
			ionizationEnergy: 'Énergie d’ionisation des éléments'
		},
		seoTitle: (title) => `${title}${_}: tableau des valeurs | ChemTable`,
		description: {
			mass: `Masses atomiques de l’IUPAC pour 84 éléments, nombre de masse de l’isotope le plus stable pour les autres${_}: liste par masse décroissante et tableau coloré.`,
			electronegativity: `Électronégativité de Pauling de tous les éléments${_}: liste classée et tableau périodique en couleurs. Le fluor a la plus élevée, 3,98.`,
			atomicRadius: `Rayons covalents des éléments en picomètres (Cordero, 2008)${_}: liste selon la taille de l’atome et tableau périodique coloré selon le rayon.`,
			density: `Masse volumique des éléments en g/cm³${_}: liste du plus dense, l’osmium et l’iridium, au plus léger, et tableau périodique coloré.`,
			meltingPoint: `Températures de fusion des éléments en °C et K${_}: liste de la plus haute à la plus basse et tableau périodique coloré selon la température.`,
			ionizationEnergy: `Première énergie d’ionisation des éléments en eV (NIST)${_}: liste classée et tableau périodique. Maximale pour l’hélium, minimale pour le césium.`
		},
		list: {
			mass: 'Tous les éléments par masse atomique',
			electronegativity: 'Tous les éléments par électronégativité',
			atomicRadius: 'Tous les éléments par rayon covalent',
			density: 'Tous les éléments par masse volumique',
			meltingPoint: 'Tous les éléments par température de fusion',
			ionizationEnergy: 'Tous les éléments par énergie d’ionisation'
		},
		sortBy: 'Ordre',
		sort: { desc: 'Décroissant', asc: 'Croissant', z: 'Par numéro atomique' },
		missing: 'Pas de données',
		source: 'Source',
		allValues: 'Toutes les valeurs en liste',
		all: 'Propriétés des éléments'
	},
	molar: {
		title: 'Calculateur de masse molaire',
		seoTitle: `Calculateur de masse molaire${_}: g/mol à partir de la formule | ChemTable`,
		description: `Calculateur de masse molaire gratuit${_}: entrez une formule (H2SO4, Ca(OH)2, CuSO4·5H2O) et obtenez les g/mol, la part de chaque élément et le calcul.`,
		lead: 'Entrez la formule d’une substance, par exemple H2SO4, Ca(OH)2 ou CuSO4·5H2O. Le calculateur affiche la masse molaire et la part de chaque élément. Masses atomiques de l’IUPAC (CIAAW), comme dans le tableau.',
		formula: 'Formule',
		placeholder: 'Par exemple, Ca(OH)2',
		clear: 'Effacer',
		insert: 'Insérer',
		result: 'Masse molaire',
		unit: 'g/mol',
		school: (masses) => `Pour les exercices scolaires (${masses})`,
		parts: 'Répartition par élément',
		howCalculated: 'Le calcul',
		rounding: 'Le résultat est arrondi à la précision de la masse atomique la moins précise.',
		more: 'Page de la substance',
		popular: 'Substances courantes',
		another: 'Calculer une autre substance',
		calculate: 'Calculer',
		whatIs: `Qu’est-ce que la masse molaire${_}?`,
		whatIsText: (example) => [
			'La masse molaire M est la masse d’une mole de substance, soit environ 6,022 × 10²³ de ses particules. Elle s’exprime en grammes par mole (g/mol).',
			`Pour la trouver, additionnez les masses atomiques de tous les atomes de la formule${_}: multipliez la masse de chaque élément par son indice, le nombre de ses atomes. En g/mol, la masse molaire est égale à la masse moléculaire relative Mr.`,
			`Pour l’eau${_}: ${example}.`
		],
		errors: {
			syntax: 'Impossible de lire la formule. Vérifiez les parenthèses et les signes, comme dans Ca(OH)2.',
			symbol: (symbol) =>
				`L’élément «${_}${symbol}${_}» n’existe pas. Un symbole commence par une majuscule, la deuxième lettre est en minuscule${_}: Na, Cl.`,
			case: 'Les symboles des éléments commencent par une majuscule.',
			coefficient: `Un nombre devant toute la formule est un coefficient d’équation${_}: il compte des moles, et la masse molaire n’en dépend pas.`,
			suggest: ['Vouliez-vous dire', `${_}?`],
			weight: (name, symbol) =>
				`${name} (${symbol}) n’a ni isotope stable ni composition naturelle constante${_}: l’IUPAC ne lui attribue pas de masse atomique standard.`
		},
		compound: {
			title: (of) => `Masse molaire ${of}`,
			seoTitle: (of, formula, value) => `Masse molaire ${of} (${formula})${_}: ${value} g/mol | ChemTable`,
			description: (of, formula, value, calc, school) =>
				`La masse molaire ${of} (${formula}) est de ${value} g/mol. Calcul${_}: ${calc}. Pour les exercices${_}: ${school} g/mol.`,
			aka: `Autre nom${_}:`,
			sources: 'Masses atomiques de l’IUPAC (CIAAW).',
			pubchemSame: (value) => `Identique à PubChem${_}: ${value} g/mol.`,
			pubchemDiff: (value) =>
				`PubChem donne ${value} g/mol${_}: le dernier chiffre diffère, car les masses atomiques y sont arrondies autrement.`,
			back: 'Masse molaire'
		}
	},
	moreOnSite: 'Aussi sur ChemTable',
	footer: {
		tools: 'Outils',
		properties: `Propriétés des éléments${_}: le tableau coloré par propriété et toutes les valeurs`,
		molar: 'Masse molaire',
		sources: 'Sources des données',
		sourceFor: {
			ciaaw: 'masses atomiques',
			nist: 'énergies d’ionisation',
			pubchem: 'autres propriétés, vérifiées avec le CRC Handbook',
			cordero: 'rayons covalents',
			wikipedia: 'affinités électroniques',
			wikidata: 'noms en 8 langues'
		},
		updated: (date) => `Données mises à jour le ${date}`
	}
};
