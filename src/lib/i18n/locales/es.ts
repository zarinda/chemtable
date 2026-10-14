import type { Dict } from '../ui';

export const es: Dict = {
	reviewed: false,
	siteName: 'ChemTable',
	title: 'Tabla periódica de los elementos químicos',
	hint: 'Pasa el cursor sobre un elemento, o entra en la tabla con Tab y muévete con las flechas. Pulsa un elemento para abrir su ficha.',
	hintTouch: 'Toca un elemento o desliza el dedo por la tabla',
	colorBy: 'Colorear la tabla por',
	categories: 'Categorías',
	category: {
		'alkali-metal': 'Metales alcalinos',
		'alkaline-earth-metal': 'Metales alcalinotérreos',
		'transition-metal': 'Metales de transición',
		'post-transition-metal': 'Metales postransicionales',
		metalloid: 'Metaloides',
		nonmetal: 'No metales',
		halogen: 'Halógenos',
		'noble-gas': 'Gases nobles',
		lanthanide: 'Lantánidos',
		actinide: 'Actínidos'
	},
	property: {
		mass: 'Masa atómica',
		electronegativity: 'Electronegatividad',
		atomicRadius: 'Radio covalente',
		density: 'Densidad',
		meltingPoint: 'Punto de fusión',
		ionizationEnergy: 'Energía de ionización'
	},
	unit: {
		mass: 'u',
		electronegativity: 'Pauling',
		atomicRadius: 'pm',
		density: 'g/cm³',
		meltingPoint: '°C',
		ionizationEnergy: 'eV'
	},
	noData: 'sin datos',
	period: 'Periodo',
	group: 'Grupo',
	block: 'Bloque',
	state: { solid: 'Sólido', liquid: 'Líquido', gas: 'Gaseoso' },
	predicted: 'previsto',
	underPressure: 'solo bajo presión',
	sublimes: 'sublimación',
	anionUnstable: 'no forma iones negativos estables',
	atomicMass: 'Masa atómica',
	massIsotope: 'número másico del isótopo más estable',
	config: 'Configuración electrónica',
	shells: 'Electrones por capa',
	boilingPoint: 'Punto de ebullición',
	oxidationStates: 'Estados de oxidación',
	electronAffinity: 'Afinidad electrónica',
	discovered: 'Descubrimiento',
	ancient: 'conocido desde la Antigüedad',
	discoveredBy: 'Descubierto por',
	namedAfter: 'Nombrado en honor a',
	close: 'Cerrar',
	open: 'Abrir',
	sources: 'Fuentes de los datos',
	sourcesNote:
		'Masas atómicas: IUPAC CIAAW, valores estándar abreviados; entre corchetes, número másico del isótopo más estable. Energías de ionización: NIST. Afinidades electrónicas: valores medidos (tabla de Wikipedia con fuentes primarias). Radios covalentes: Cordero et al. (2008). Otras propiedades: PubChem (NIH), cotejadas con el CRC Handbook. Nombres de los elementos: Wikidata.',
	theme: { light: 'Tema claro', dark: 'Tema oscuro', system: 'Como el sistema' },
	language: 'Idioma',
	madeBy: 'Creado por ',
	explainToggle: 'Qué significa',
	explain: {
		mass: 'Masa media de un átomo en unidades de masa atómica (1 u es 1/12 de la masa de un átomo de carbono-12). Tiene en cuenta la mezcla natural de isótopos del elemento.',
		group:
			'Número de la columna vertical, del 1 al 18 según la numeración de la IUPAC. Los elementos de un mismo grupo tienen la misma capa externa y, por eso, propiedades parecidas.',
		period:
			'Número de la fila horizontal. Suele coincidir con el número de capas electrónicas del átomo; la excepción es el paladio, con cuatro capas en el periodo 5.',
		block:
			'El subnivel (s, p, d o f) que se llena de electrones en último lugar. Cada bloque forma una zona rectangular de la tabla.',
		config:
			'Cómo se reparten los electrones en los subniveles. El corchete representa el gas noble anterior; el superíndice, el número de electrones del subnivel.',
		shells: 'Número de electrones en cada capa, desde el núcleo hacia fuera.',
		electronegativity:
			'Con qué fuerza atrae un átomo los electrones en un enlace químico. En la escala de Pauling va de 0,7 en el francio a 3,98 en el flúor.',
		atomicRadius:
			'Mitad de la longitud de un enlace covalente simple entre dos átomos del elemento. Indica el tamaño del átomo en una molécula o un cristal: 76 pm en el carbono, 132 pm en el hierro.',
		density: 'Masa de un centímetro cúbico de la sustancia. Para los gases, a 0 °C y presión normal.',
		meltingPoint:
			'Temperatura a la que el sólido pasa a líquido a presión normal. El helio, el carbono y el arsénico no se funden a presión normal: el helio necesita unas 25 atm, y el carbono y el arsénico pasan directamente a vapor.',
		boilingPoint:
			'Temperatura a la que el líquido hierve a presión normal. En el carbono y el arsénico, temperatura a la que el sólido se sublima.',
		ionizationEnergy:
			'Energía necesaria para arrancar al átomo su electrón menos ligado. Cuanto menor es, más fácilmente cede el elemento un electrón, algo típico de los metales.',
		electronAffinity:
			'Energía que se libera cuando un átomo neutro captura un electrón. Es máxima en los halógenos. Los gases nobles, el nitrógeno y algunos metales no forman iones negativos estables.',
		oxidationStates: 'Principales cargas formales que el átomo adopta en sus compuestos.'
	},
	trend: {
		mass: 'Crece con el número atómico, con pocas excepciones: el argón es más pesado que el potasio, el cobalto que el níquel y el telurio que el yodo.',
		electronegativity:
			'Aumenta de izquierda a derecha en un periodo y disminuye de arriba abajo en un grupo. El flúor tiene el valor más alto.',
		atomicRadius:
			'En general disminuye de izquierda a derecha en un periodo y aumenta de arriba abajo en un grupo.',
		density:
			'Los más densos son los metales del centro del periodo 6: el osmio y el iridio. La escala es logarítmica porque los gases son miles de veces más ligeros que los metales.',
		meltingPoint: 'Es más alto en el carbono y los metales de transición, y más bajo en los gases nobles.',
		ionizationEnergy:
			'Aumenta de izquierda a derecha en un periodo, con el máximo en los gases nobles. Disminuye de arriba abajo en un grupo.'
	},

	seo: {
		homeTitle: 'Tabla periódica interactiva de los elementos | ChemTable',
		homeDescription:
			'Tabla periódica interactiva de los 118 elementos: masa atómica, configuración electrónica, electronegatividad, densidad y explicaciones para estudiantes.',
		elementTitle: (name, symbol) => `${name} (${symbol}): propiedades y masa atómica | ChemTable`,
		elementDescription: (f) =>
			`${f.name} (${f.symbol}), número atómico ${f.z}: ${f.category.toLowerCase()}` +
			(f.mass ? `, ${f.massIsIsotope ? 'número másico' : 'masa atómica'} ${f.mass}` : '') +
			`. Configuración electrónica, densidad, electronegatividad y más.`
	},
	article: {
		kicker: (z) => `Elemento químico n.º ${z}`,
		summary: (f) =>
			[
				`${f.name} (${f.symbol}) es un elemento químico de número atómico ${f.z}.`,
				f.group
					? `Se encuentra en el grupo ${f.group} y el periodo ${f.period} de la tabla periódica, en el bloque ${f.block}.`
					: `Se encuentra en el periodo ${f.period} de la tabla periódica, en el bloque ${f.block}.`,
				`Categoría: ${f.category.toLowerCase()}.`,
				`Estado a temperatura ambiente: ${f.state.toLowerCase()}${f.statePredicted ? ' (previsto)' : ''}.`,
				f.mass
					? f.massIsIsotope
						? `No tiene masa atómica estándar; el número másico de su isótopo más estable es ${f.mass}.`
						: `Su masa atómica estándar es ${f.mass}.`
					: ''
			]
				.filter(Boolean)
				.join(' '),
		properties: 'Propiedades',
		property: 'Propiedad',
		value: 'Valor',
		related: 'Elementos cercanos',
		sameGroup: (g) => `Grupo ${g}`,
		samePeriod: (p) => `Periodo ${p}`,
		previous: 'Elemento anterior',
		next: 'Elemento siguiente',
		readMore: 'Más información',
		wikipedia: 'Wikipedia',
		backToTable: 'Volver a la tabla'
	},
	about: {
		heading: 'Sobre esta tabla periódica',
		paragraphs: [
			'Una tabla periódica interactiva de los 118 elementos químicos, pensada para estudiantes. Abre cualquier elemento para ver su masa atómica, configuración electrónica, puntos de fusión y ebullición, densidad, electronegatividad, energía de ionización y estados de oxidación, cada uno con una breve explicación.',
			'Colorea la tabla por categoría o por propiedad para ver las tendencias periódicas: cómo la electronegatividad aumenta hacia el flúor o cómo los átomos crecen al bajar por cada grupo.',
			'Las masas atómicas proceden de la IUPAC CIAAW, las energías de ionización del NIST, los radios covalentes de Cordero et al. (2008) y las demás propiedades de PubChem (Institutos Nacionales de Salud de EE. UU.), cotejadas con el CRC Handbook. Los nombres de los elementos en ocho idiomas proceden de Wikidata.'
		]
	},
	data: {
		heading: 'Datos abiertos',
		text: 'El conjunto completo de datos de los 118 elementos se puede descargar libremente. Hay un resumen en texto plano para asistentes de IA en llms.txt.'
	},
	licenses: 'Licencias',
	privacy: {
		title: 'Política de privacidad',
		description:
			'Cómo trata ChemTable los datos: sin cuentas, sin analítica, sin rastreo. Qué guarda el navegador, qué ve el alojamiento y cómo usa cookies la publicidad.',
		updated: 'Última actualización:',
		intro: (author) =>
			`ChemTable es obra de ${author}, una empresa registrada en la República de Armenia. Esta página explica qué ocurre con los datos cuando usas el sitio.`,
		sections: {
			collect: {
				heading: 'Qué recopilamos',
				paragraphs: [
					'Nada que te identifique. ChemTable no tiene cuentas, formularios ni comentarios, y no usa analítica ni rastreo.'
				]
			},
			storage: {
				heading: 'Ajustes en tu navegador',
				paragraphs: [
					'Si eliges el tema claro u oscuro, la elección se guarda en el almacenamiento local del navegador para que el sitio la recuerde. Nunca sale de tu dispositivo; al borrar los datos del sitio en el navegador se elimina.'
				]
			},
			hosting: {
				heading: 'Alojamiento',
				paragraphs: [
					'El sitio lo sirve Cloudflare. Como cualquier servidor web, Cloudflare trata tu dirección IP y datos técnicos de cada solicitud, como el navegador y la página, para entregar las páginas y proteger el sitio de ataques. No usamos esta información para identificar a los visitantes.'
				]
			},
			external: {
				heading: 'Otros sitios',
				paragraphs: [
					'Las páginas de los elementos enlazan a Wikipedia, PubChem y Wikidata, que tienen sus propias políticas de privacidad. Las fuentes tipográficas se sirven desde este sitio, no desde terceros.'
				]
			},
			children: {
				heading: 'Menores',
				paragraphs: [
					'ChemTable está hecho para estudiantes de escuela y universidad. No recopilamos a sabiendas datos personales de nadie, tampoco de menores.'
				]
			},
			ads: {
				heading: 'Publicidad',
				paragraphs: [
					'Los anuncios de ChemTable los sirve Google AdSense. Google y sus socios usan cookies y tecnologías similares para mostrar anuncios, limitar cuántas veces aparece el mismo anuncio, medirlos y prevenir el fraude.',
					'Como muchos visitantes son menores, pedimos a Google que trate todas las páginas como dirigidas a menores. Así Google solo muestra anuncios no personalizados, elegidos según la página que lees y no según tu historial de navegación, y sin remarketing.',
					'Los proveedores externos, incluido Google, pueden usar cookies para mostrar anuncios basados en tus visitas anteriores a este y otros sitios. En ChemTable estos anuncios personalizados están desactivados, como se explica arriba. Además, puedes desactivar los anuncios personalizados de tu cuenta de Google en la Configuración de anuncios y rechazar las cookies de otros proveedores en aboutads.info o youronlinechoices.eu.',
					'En el Espacio Económico Europeo, el Reino Unido y Suiza, el sitio pide tu consentimiento antes de usar cookies publicitarias. Puedes cambiar tu elección en cualquier momento con el enlace de ajustes de privacidad y cookies de la página.'
				]
			},
			rights: {
				heading: 'Tus derechos',
				paragraphs: [
					'Según dónde vivas, leyes como el Reglamento General de Protección de Datos (RGPD) de la UE y la Ley de la República de Armenia sobre Protección de Datos Personales te dan derecho a saber qué datos tuyos se conservan, a que se corrijan o borren y a oponerte a su uso. ChemTable no guarda datos personales de sus visitantes.'
				]
			},
			changes: {
				heading: 'Cambios',
				paragraphs: [
					'Si esta política cambia, también cambiará la fecha al principio de la página.'
				]
			}
		},
		adsOff:
			'Por ahora ChemTable no muestra anuncios. Si los añadimos, esta sección describirá sus cookies antes de que aparezca el primer anuncio.',
		contact: 'Preguntas sobre esta política:',
		back: 'Volver a la tabla periódica'
	},
	notFound: {
		title: 'Página no encontrada',
		text: 'No hay ninguna página en esta dirección. Puede que el enlace tenga una errata o que la página se haya movido.',
		suggest: 'Quizá buscabas:',
		back: 'Ir a la tabla periódica',
		beyond: (name, z) =>
			`Tampoco existe el elemento 404: el más pesado conocido es el ${name.toLowerCase()}, número ${z}.`
	},
	print: {
		heading: 'Tabla periódica para imprimir',
		text: 'Un PDF gratuito para descargar e imprimir, en horizontal. La versión en blanco y negro ahorra tinta: las categorías se distinguen por la trama.',
		color: 'En color',
		bw: 'Blanco y negro',
		atomicNumber: 'Número atómico',
		symbol: 'Símbolo',
		name: 'Nombre'
	},
	propertyPage: {
		title: {
			mass: 'Masa atómica de los elementos',
			electronegativity: 'Electronegatividad de los elementos',
			atomicRadius: 'Radio covalente de los elementos',
			density: 'Densidad de los elementos',
			meltingPoint: 'Punto de fusión de los elementos',
			ionizationEnergy: 'Energía de ionización de los elementos'
		},
		seoTitle: (title) => `${title}: tabla de valores | ChemTable`,
		description: {
			mass: 'Masas atómicas de los 118 elementos según la IUPAC: lista del más pesado al más ligero y tabla periódica coloreada por masa atómica.',
			electronegativity: 'Electronegatividad de Pauling de todos los elementos: lista ordenada y tabla periódica en colores. El flúor tiene la más alta, 3,98.',
			atomicRadius: 'Radios covalentes de los elementos en picómetros (Cordero, 2008): lista por tamaño del átomo y tabla periódica coloreada por radio.',
			density: 'Densidad de los elementos en g/cm³: lista de los más densos, osmio e iridio, a los más ligeros y tabla periódica coloreada por densidad.',
			meltingPoint: 'Puntos de fusión de los elementos en °C y K: lista del más alto al más bajo y tabla periódica coloreada por punto de fusión.',
			ionizationEnergy: 'Primera energía de ionización de los elementos en eV (NIST): lista ordenada y tabla periódica. Máxima en el helio, mínima en el cesio.'
		},
		list: {
			mass: 'Todos los elementos por masa atómica',
			electronegativity: 'Todos los elementos por electronegatividad',
			atomicRadius: 'Todos los elementos por radio covalente',
			density: 'Todos los elementos por densidad',
			meltingPoint: 'Todos los elementos por punto de fusión',
			ionizationEnergy: 'Todos los elementos por energía de ionización'
		},
		sortBy: 'Orden',
		sort: { desc: 'De mayor a menor', asc: 'De menor a mayor', z: 'Por número atómico' },
		missing: 'Sin datos',
		source: 'Fuente',
		allValues: 'Todos los valores en una lista',
		all: 'Propiedades de los elementos'
	}
};
