import type { Dict } from '../ui';

export const it: Dict = {
	reviewed: false,
	siteName: 'ChemTable',
	title: 'Tavola periodica degli elementi chimici',
	hint: 'Passa il mouse su un elemento, oppure entra nella tavola con Tab e spostati con le frecce. Fai clic su un elemento per aprirne la scheda.',
	colorBy: 'Colora la tavola per',
	categories: 'Categorie',
	category: {
		'alkali-metal': 'Metalli alcalini',
		'alkaline-earth-metal': 'Metalli alcalino-terrosi',
		'transition-metal': 'Metalli di transizione',
		'post-transition-metal': 'Metalli post-transizione',
		metalloid: 'Semimetalli',
		nonmetal: 'Non metalli',
		halogen: 'Alogeni',
		'noble-gas': 'Gas nobili',
		lanthanide: 'Lantanoidi',
		actinide: 'Attinoidi'
	},
	property: {
		mass: 'Massa atomica',
		electronegativity: 'Elettronegatività',
		atomicRadius: 'Raggio di van der Waals',
		density: 'Densità',
		meltingPoint: 'Punto di fusione',
		ionizationEnergy: 'Energia di ionizzazione'
	},
	unit: {
		mass: 'u',
		electronegativity: 'Pauling',
		atomicRadius: 'pm',
		density: 'g/cm³',
		meltingPoint: '°C',
		ionizationEnergy: 'eV'
	},
	noData: 'nessun dato',
	period: 'Periodo',
	group: 'Gruppo',
	block: 'Blocco',
	state: { solid: 'Solido', liquid: 'Liquido', gas: 'Gassoso' },
	predicted: 'previsto',
	atomicMass: 'Massa atomica',
	massIsotope: 'numero di massa dell’isotopo più stabile',
	config: 'Configurazione elettronica',
	shells: 'Elettroni per guscio',
	boilingPoint: 'Punto di ebollizione',
	oxidationStates: 'Stati di ossidazione',
	electronAffinity: 'Affinità elettronica',
	discovered: 'Scoperta',
	ancient: 'noto fin dall’antichità',
	close: 'Chiudi',
	sources: 'Fonti dei dati',
	sourcesNote:
		'Proprietà: PubChem (NIH). Masse atomiche: IUPAC CIAAW, valori standard abbreviati. Tra parentesi quadre: numero di massa dell’isotopo più stabile. Nomi degli elementi: Wikidata.',
	theme: { light: 'Tema chiaro', dark: 'Tema scuro', system: 'Come il sistema' },
	language: 'Lingua',
	madeBy: 'Creato da ',
	explainToggle: 'Che cosa significa',
	explain: {
		mass: 'Massa media di un atomo in unità di massa atomica (1 u è 1/12 della massa di un atomo di carbonio-12). Tiene conto della miscela naturale degli isotopi dell’elemento.',
		group:
			'Numero della colonna verticale, da 1 a 18 secondo la numerazione IUPAC. Gli elementi di uno stesso gruppo hanno lo stesso guscio esterno e quindi proprietà simili.',
		period: 'Numero della riga orizzontale. È uguale al numero di gusci elettronici dell’atomo.',
		block:
			'Il sottolivello (s, p, d o f) riempito per ultimo dagli elettroni. Ogni blocco forma un’area rettangolare della tavola.',
		config:
			'Come gli elettroni sono distribuiti nei sottolivelli. La parentesi quadra indica il gas nobile precedente, l’esponente il numero di elettroni nel sottolivello.',
		shells: 'Numero di elettroni in ciascun guscio, dal nucleo verso l’esterno.',
		electronegativity:
			'Quanto fortemente un atomo attira gli elettroni in un legame chimico. Nella scala di Pauling va da 0,7 del francio a 3,98 del fluoro.',
		atomicRadius:
			'Metà della distanza a cui si avvicinano due atomi vicini non legati. È maggiore del raggio covalente o metallico dei libri di testo: 194 pm per il ferro contro circa 126 pm.',
		density: 'Massa di un centimetro cubo della sostanza. Per i gas, a 0 °C e pressione normale.',
		meltingPoint: 'Temperatura alla quale il solido diventa liquido a pressione normale.',
		boilingPoint: 'Temperatura alla quale il liquido bolle a pressione normale.',
		ionizationEnergy:
			'Energia necessaria per strappare all’atomo l’elettrone meno legato. Più è bassa, più facilmente l’elemento cede un elettrone, come è tipico dei metalli.',
		electronAffinity:
			'Energia liberata quando un atomo neutro acquista un elettrone. È massima per gli alogeni.',
		oxidationStates: 'Cariche formali che l’atomo può assumere nei suoi composti.'
	},
	trend: {
		mass: 'Cresce con il numero atomico: da sinistra a destra e dall’alto in basso.',
		electronegativity:
			'Aumenta da sinistra a destra lungo un periodo e diminuisce dall’alto in basso lungo un gruppo. Il fluoro ha il valore più alto.',
		atomicRadius:
			'In generale diminuisce da sinistra a destra lungo un periodo e aumenta dall’alto in basso lungo un gruppo.',
		density:
			'I più densi sono i metalli al centro del periodo 6: osmio e iridio. La scala è logaritmica perché i gas sono migliaia di volte più leggeri dei metalli.',
		meltingPoint: 'Più alto per il carbonio e i metalli di transizione, più basso per i gas nobili.',
		ionizationEnergy:
			'Aumenta da sinistra a destra lungo un periodo, con il massimo nei gas nobili. Diminuisce dall’alto in basso lungo un gruppo.'
	},

	seo: {
		homeTitle: 'Tavola periodica interattiva degli elementi | ChemTable',
		homeDescription:
			'Tavola periodica interattiva di tutti i 118 elementi: massa atomica, configurazione elettronica, elettronegatività, densità e altro, con spiegazioni per gli studenti.',
		elementTitle: (name, symbol) => `${name} (${symbol}): proprietà e massa atomica | ChemTable`,
		elementDescription: (f) =>
			`${f.name} (${f.symbol}), numero atomico ${f.z}: ${f.category.toLowerCase()}` +
			(f.mass ? `, ${f.massIsIsotope ? 'numero di massa' : 'massa atomica'} ${f.mass}` : '') +
			`. Configurazione elettronica, densità, punto di fusione, elettronegatività e altro.`
	},
	article: {
		kicker: (z) => `Elemento chimico n. ${z}`,
		summary: (f) =>
			[
				`${f.name} (${f.symbol}) è un elemento chimico con numero atomico ${f.z}.`,
				f.group
					? `Si trova nel gruppo ${f.group} e nel periodo ${f.period} della tavola periodica, nel blocco ${f.block}.`
					: `Si trova nel periodo ${f.period} della tavola periodica, nel blocco ${f.block}.`,
				`Categoria: ${f.category.toLowerCase()}.`,
				`Stato a temperatura ambiente: ${f.state.toLowerCase()}${f.statePredicted ? ' (previsto)' : ''}.`,
				f.mass
					? f.massIsIsotope
						? `Non ha una massa atomica standard; il numero di massa del suo isotopo più stabile è ${f.mass}.`
						: `La sua massa atomica standard è ${f.mass}.`
					: ''
			]
				.filter(Boolean)
				.join(' '),
		properties: 'Proprietà',
		property: 'Proprietà',
		value: 'Valore',
		related: 'Elementi vicini',
		sameGroup: (g) => `Gruppo ${g}`,
		samePeriod: (p) => `Periodo ${p}`,
		previous: 'Elemento precedente',
		next: 'Elemento successivo',
		readMore: 'Per saperne di più',
		wikipedia: 'Wikipedia',
		backToTable: 'Torna alla tavola'
	},
	about: {
		heading: 'Informazioni su questa tavola periodica',
		paragraphs: [
			'Una tavola periodica interattiva di tutti i 118 elementi chimici, pensata per gli studenti. Apri un elemento per vedere massa atomica, configurazione elettronica, punti di fusione e di ebollizione, densità, elettronegatività, energia di ionizzazione e stati di ossidazione, ciascuno con una breve spiegazione.',
			'Colora la tavola per categoria o per proprietà per vedere le tendenze periodiche: come l’elettronegatività cresce verso il fluoro, o come gli atomi diventano più grandi scendendo lungo ogni gruppo.',
			'Le proprietà provengono da PubChem (National Institutes of Health degli Stati Uniti), le masse atomiche standard dalla IUPAC CIAAW e i nomi degli elementi in otto lingue da Wikidata.'
		]
	},
	data: {
		heading: 'Dati aperti',
		text: 'L’intero insieme di dati sui 118 elementi è scaricabile liberamente. Un riepilogo in testo semplice per gli assistenti IA si trova in llms.txt.'
	},
	print: {
		heading: 'Tavola periodica da stampare',
		text: 'Un PDF gratuito da scaricare e stampare, in orizzontale. La versione in bianco e nero risparmia inchiostro: le categorie si distinguono dalla trama.',
		color: 'A colori',
		bw: 'Bianco e nero',
		atomicNumber: 'Numero atomico',
		symbol: 'Simbolo',
		name: 'Nome'
	}
};
