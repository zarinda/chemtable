import type { Dict } from '../ui';

export const es: Dict = {
	reviewed: false,
	siteName: 'ChemTable',
	title: 'Tabla periódica de los elementos químicos',
	hint: 'Pasa el cursor sobre un elemento, o entra en la tabla con Tab y muévete con las flechas. Pulsa un elemento para abrir su ficha.',
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
		atomicRadius: 'Radio de van der Waals',
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
	atomicMass: 'Masa atómica',
	massIsotope: 'número másico del isótopo más estable',
	config: 'Configuración electrónica',
	shells: 'Electrones por capa',
	boilingPoint: 'Punto de ebullición',
	oxidationStates: 'Estados de oxidación',
	electronAffinity: 'Afinidad electrónica',
	discovered: 'Descubrimiento',
	ancient: 'conocido desde la Antigüedad',
	close: 'Cerrar',
	sources: 'Fuentes de los datos',
	sourcesNote:
		'Propiedades: PubChem (NIH). Masas atómicas: IUPAC CIAAW, valores estándar abreviados. Entre corchetes: número másico del isótopo más estable. Nombres de los elementos: Wikidata.',
	theme: { light: 'Tema claro', dark: 'Tema oscuro', system: 'Como el sistema' },
	language: 'Idioma',
	madeBy: 'Creado por ',
	explainToggle: 'Qué significa',
	explain: {
		mass: 'Masa media de un átomo en unidades de masa atómica (1 u es 1/12 de la masa de un átomo de carbono-12). Tiene en cuenta la mezcla natural de isótopos del elemento.',
		group:
			'Número de la columna vertical, del 1 al 18 según la numeración de la IUPAC. Los elementos de un mismo grupo tienen la misma capa externa y, por eso, propiedades parecidas.',
		period: 'Número de la fila horizontal. Coincide con el número de capas electrónicas del átomo.',
		block:
			'El subnivel (s, p, d o f) que se llena de electrones en último lugar. Cada bloque forma una zona rectangular de la tabla.',
		config:
			'Cómo se reparten los electrones en los subniveles. El corchete representa el gas noble anterior; el superíndice, el número de electrones del subnivel.',
		shells: 'Número de electrones en cada capa, desde el núcleo hacia fuera.',
		electronegativity:
			'Con qué fuerza atrae un átomo los electrones en un enlace químico. En la escala de Pauling va de 0,7 en el francio a 3,98 en el flúor.',
		atomicRadius:
			'Mitad de la distancia a la que se acercan dos átomos vecinos no enlazados. Es mayor que el radio covalente o metálico de los libros de texto: 194 pm en el hierro frente a unos 126 pm.',
		density: 'Masa de un centímetro cúbico de la sustancia. Para los gases, a 0 °C y presión normal.',
		meltingPoint: 'Temperatura a la que el sólido pasa a líquido a presión normal.',
		boilingPoint: 'Temperatura a la que el líquido hierve a presión normal.',
		ionizationEnergy:
			'Energía necesaria para arrancar al átomo su electrón menos ligado. Cuanto menor es, más fácilmente cede el elemento un electrón, algo típico de los metales.',
		electronAffinity:
			'Energía que se libera cuando un átomo neutro captura un electrón. Es máxima en los halógenos.',
		oxidationStates: 'Cargas formales que el átomo puede tener en sus compuestos.'
	},
	trend: {
		mass: 'Crece con el número atómico: de izquierda a derecha y de arriba abajo.',
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
			'Tabla periódica interactiva de los 118 elementos: masa atómica, configuración electrónica, electronegatividad, densidad y más, con explicaciones para estudiantes.',
		elementTitle: (name, symbol) => `${name} (${symbol}): propiedades y masa atómica | ChemTable`,
		elementDescription: (f) =>
			`${f.name} (${f.symbol}), número atómico ${f.z}: ${f.category.toLowerCase()}` +
			(f.mass ? `, ${f.massIsIsotope ? 'número másico' : 'masa atómica'} ${f.mass}` : '') +
			`. Configuración electrónica, densidad, punto de fusión, electronegatividad y más.`
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
			'Las propiedades proceden de PubChem (Institutos Nacionales de Salud de EE. UU.), las masas atómicas estándar de la IUPAC CIAAW y los nombres de los elementos en ocho idiomas de Wikidata.'
		]
	},
	data: {
		heading: 'Datos abiertos',
		text: 'El conjunto completo de datos de los 118 elementos se puede descargar libremente. Hay un resumen en texto plano para asistentes de IA en llms.txt.'
	},
	print: {
		heading: 'Tabla periódica para imprimir',
		text: 'Un PDF gratuito para descargar e imprimir, en horizontal. La versión en blanco y negro ahorra tinta: las categorías se distinguen por la trama.',
		color: 'En color',
		bw: 'Blanco y negro',
		atomicNumber: 'Número atómico',
		symbol: 'Símbolo',
		name: 'Nombre'
	}
};
