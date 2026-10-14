import type { Dict } from '../ui';

export const it: Dict = {
	reviewed: false,
	siteName: 'ChemTable',
	title: 'Tavola periodica degli elementi chimici',
	hint: 'Passa il mouse su un elemento, oppure entra nella tavola con Tab e spostati con le frecce. Fai clic su un elemento per aprirne la scheda.',
	hintTouch: 'Tocca un elemento o fai scorrere il dito sulla tavola',
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
		atomicRadius: 'Raggio covalente',
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
	underPressure: 'solo sotto pressione',
	sublimes: 'sublimazione',
	anionUnstable: 'nessuno ione negativo stabile',
	atomicMass: 'Massa atomica',
	massIsotope: 'numero di massa dell’isotopo più stabile',
	config: 'Configurazione elettronica',
	shells: 'Elettroni per guscio',
	boilingPoint: 'Punto di ebollizione',
	oxidationStates: 'Stati di ossidazione',
	electronAffinity: 'Affinità elettronica',
	discovered: 'Scoperta',
	ancient: 'noto fin dall’antichità',
	discoveredBy: 'Scoperto da',
	namedAfter: 'Prende il nome da',
	close: 'Chiudi',
	open: 'Apri',
	sources: 'Fonti dei dati',
	sourcesNote:
		'Masse atomiche: IUPAC CIAAW, valori standard abbreviati; tra parentesi quadre, numero di massa dell’isotopo più stabile. Energie di ionizzazione: NIST. Affinità elettroniche: valori misurati (tabella di Wikipedia con fonti primarie). Raggi covalenti: Cordero et al. (2008). Altre proprietà: PubChem (NIH), verificate con il CRC Handbook. Nomi degli elementi: Wikidata.',
	theme: { light: 'Tema chiaro', dark: 'Tema scuro', system: 'Come il sistema' },
	language: 'Lingua',
	madeBy: 'Creato da ',
	explainToggle: 'Che cosa significa',
	explain: {
		mass: 'Massa media di un atomo in unità di massa atomica (1 u è 1/12 della massa di un atomo di carbonio-12). Tiene conto della miscela naturale degli isotopi dell’elemento.',
		group:
			'Numero della colonna verticale, da 1 a 18 secondo la numerazione IUPAC. Gli elementi di uno stesso gruppo hanno lo stesso guscio esterno e quindi proprietà simili.',
		period:
			'Numero della riga orizzontale. Di solito è uguale al numero di gusci elettronici dell’atomo; fa eccezione il palladio, con quattro gusci nel periodo 5.',
		block:
			'Il sottolivello (s, p, d o f) che, nell’ordine abituale di riempimento, riceve gli ultimi elettroni; divide la tavola in quattro blocchi. Alcuni atomi fanno eccezione: il lantanio apre il blocco f ma non ha elettroni f.',
		config:
			'Come gli elettroni sono distribuiti nei sottolivelli. La parentesi quadra indica il gas nobile precedente, l’esponente il numero di elettroni nel sottolivello.',
		shells: 'Numero di elettroni in ciascun guscio, dal nucleo verso l’esterno.',
		electronegativity:
			'Quanto fortemente un atomo attira gli elettroni in un legame chimico. Nella scala di Pauling va da 0,79 del cesio a 3,98 del fluoro.',
		atomicRadius:
			'Metà della lunghezza di un legame covalente semplice tra due atomi dell’elemento. Indica la dimensione dell’atomo in una molecola o in un cristallo: 76 pm per il carbonio, 132 pm per il ferro.',
		density: 'Massa di un centimetro cubo della sostanza. Per i gas, a 0 °C e pressione normale.',
		meltingPoint:
			'Temperatura alla quale il solido diventa liquido a pressione normale. Elio, carbonio e arsenico non fondono a pressione normale: l’elio richiede circa 25 atm, carbonio e arsenico passano direttamente allo stato di vapore.',
		boilingPoint:
			'Temperatura alla quale il liquido bolle a pressione normale. Per carbonio e arsenico, temperatura alla quale il solido sublima.',
		ionizationEnergy:
			'Energia necessaria per strappare all’atomo l’elettrone meno legato. Più è bassa, più facilmente l’elemento cede un elettrone, come è tipico dei metalli.',
		electronAffinity:
			'Energia liberata quando un atomo neutro acquista un elettrone. È massima per gli alogeni. I gas nobili, l’azoto e alcuni metalli non formano ioni negativi stabili.',
		oxidationStates: 'Principali cariche formali che l’atomo assume nei suoi composti.'
	},
	trend: {
		mass: 'Cresce con il numero atomico, con poche eccezioni: l’argon è più pesante del potassio, il cobalto del nichel, il tellurio dello iodio, il torio del protoattinio.',
		electronegativity:
			'Aumenta da sinistra a destra lungo un periodo e diminuisce dall’alto in basso lungo un gruppo. Il fluoro ha il valore più alto.',
		atomicRadius:
			'In generale diminuisce da sinistra a destra lungo un periodo e aumenta dall’alto in basso lungo un gruppo.',
		density:
			'I più densi sono i metalli al centro del periodo 6: osmio e iridio. La scala è logaritmica perché i gas sono migliaia di volte più leggeri dei metalli.',
		meltingPoint: 'Più alto per il carbonio e i metalli di transizione, più basso per l’elio e l’idrogeno.',
		ionizationEnergy:
			'Aumenta da sinistra a destra lungo un periodo, con il massimo nei gas nobili. Diminuisce dall’alto in basso lungo un gruppo.'
	},

	seo: {
		homeTitle: 'Tavola periodica interattiva degli elementi | ChemTable',
		homeDescription:
			'Tavola periodica interattiva di tutti i 118 elementi: massa atomica, configurazione elettronica, elettronegatività, densità e spiegazioni per gli studenti.',
		elementTitle: (name, symbol) => `${name} (${symbol}): proprietà e massa atomica | ChemTable`,
		elementDescription: (f) =>
			`${f.name} (${f.symbol}), numero atomico ${f.z}: ${f.category.toLowerCase()}` +
			(f.mass ? `, ${f.massIsIsotope ? 'numero di massa' : 'massa atomica'} ${f.mass}` : '') +
			`. Configurazione elettronica, densità, elettronegatività e altro.`
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
			'Colora la tavola per categoria o per proprietà per vedere le tendenze periodiche: come l’elettronegatività cresce verso il fluoro, o come gli atomi diventano più grandi scendendo lungo ogni gruppo.'
		]
	},
	data: {
		heading: 'Dati aperti',
		text: 'L’intero insieme di dati sui 118 elementi è scaricabile liberamente. Un riepilogo in testo semplice per gli assistenti IA si trova in llms.txt.'
	},
	licenses: 'Licenze',
	privacy: {
		title: 'Informativa sulla privacy',
		description:
			'Come ChemTable tratta i dati: niente account, statistiche o tracciamento. Cosa salva il browser, cosa vede l’hosting, come la pubblicità usa i cookie.',
		updated: 'Ultimo aggiornamento:',
		intro: (author) =>
			`ChemTable è realizzato da ${author}, una società registrata nella Repubblica di Armenia. Questa pagina spiega cosa succede ai dati quando usi il sito.`,
		sections: {
			collect: {
				heading: 'Cosa raccogliamo',
				paragraphs: [
					'Nulla che ti identifichi. ChemTable non ha account, moduli o commenti e non usa statistiche né tracciamento.'
				]
			},
			storage: {
				heading: 'Impostazioni nel browser',
				paragraphs: [
					'Se scegli il tema chiaro o scuro, la scelta viene salvata nella memoria locale del browser perché il sito la ricordi. Non lascia mai il tuo dispositivo; cancellando i dati del sito nel browser la elimini.'
				]
			},
			hosting: {
				heading: 'Hosting',
				paragraphs: [
					'Il sito è distribuito da Cloudflare. Come ogni server web, Cloudflare tratta il tuo indirizzo IP e i dati tecnici di ogni richiesta, come il browser e la pagina, per consegnare le pagine e proteggere il sito dagli attacchi. Non usiamo queste informazioni per identificare i visitatori.'
				]
			},
			external: {
				heading: 'Altri siti',
				paragraphs: [
					'Le pagine degli elementi rimandano a Wikipedia, PubChem e Wikidata, che hanno le proprie informative sulla privacy. I caratteri sono forniti da questo sito, non da terze parti.'
				]
			},
			children: {
				heading: 'Minori',
				paragraphs: [
					'ChemTable è pensato per studenti delle scuole e dell’università. Non raccogliamo consapevolmente dati personali da nessuno, minori compresi.'
				]
			},
			ads: {
				heading: 'Pubblicità',
				paragraphs: [
					'La pubblicità su ChemTable è fornita da Google AdSense. Google e i suoi partner usano cookie e tecnologie simili per mostrare gli annunci, limitare la ripetizione dello stesso annuncio, misurare gli annunci e prevenire le frodi.',
					'Poiché molti visitatori sono minori, chiediamo a Google di trattare tutte le pagine come destinate ai minori. Google mostra allora solo annunci non personalizzati, scelti in base alla pagina che stai leggendo e non alla tua cronologia di navigazione, senza remarketing.',
					'Fornitori terzi, tra cui Google, possono usare i cookie per mostrare annunci basati sulle tue visite precedenti a questo e ad altri siti. Su ChemTable questi annunci personalizzati sono disattivati, come descritto sopra. Puoi anche disattivare gli annunci personalizzati per il tuo account Google nelle Impostazioni annunci e rifiutare i cookie di altri fornitori su aboutads.info o youronlinechoices.eu.',
					'Nello Spazio economico europeo, nel Regno Unito e in Svizzera il sito chiede il tuo consenso prima di usare cookie pubblicitari. Puoi cambiare la scelta in qualsiasi momento tramite il link alle impostazioni di privacy e cookie nella pagina.'
				]
			},
			rights: {
				heading: 'I tuoi diritti',
				paragraphs: [
					'A seconda di dove vivi, leggi come il Regolamento generale sulla protezione dei dati (GDPR) dell’UE e la legge della Repubblica di Armenia sulla protezione dei dati personali ti danno il diritto di sapere quali dati che ti riguardano sono conservati, di farli correggere o cancellare e di opporti al loro uso. ChemTable non conserva dati personali dei visitatori.'
				]
			},
			changes: {
				heading: 'Modifiche',
				paragraphs: [
					'Se questa informativa cambia, cambia anche la data in cima alla pagina.'
				]
			}
		},
		adsOff:
			'Al momento ChemTable non mostra pubblicità. Se la aggiungeremo, questa sezione descriverà i suoi cookie prima che appaia il primo annuncio.',
		contact: 'Domande su questa informativa:',
		back: 'Torna alla tavola periodica'
	},
	notFound: {
		title: 'Pagina non trovata',
		text: 'A questo indirizzo non c’è nessuna pagina. Forse il link contiene un errore di battitura, oppure la pagina è stata spostata.',
		suggest: 'Forse cercavi:',
		back: 'Apri la tavola periodica',
		beyond: (name, z) =>
			`Non esiste nemmeno l’elemento 404: il più pesante conosciuto è l’${name.toLowerCase()}, numero ${z}.`
	},
	print: {
		heading: 'Tavola periodica da stampare',
		text: 'Un PDF gratuito da scaricare e stampare, in orizzontale. La versione in bianco e nero risparmia inchiostro: le categorie si distinguono dalla trama.',
		color: 'A colori',
		bw: 'Bianco e nero',
		atomicNumber: 'Numero atomico',
		symbol: 'Simbolo',
		name: 'Nome'
	},
	printPage: {
		title: 'Tavola periodica da stampare',
		seoTitle: 'Tavola periodica da stampare: PDF gratuito, A4 e Letter | ChemTable',
		description: 'Tavola periodica da stampare in italiano: PDF vettoriale gratuito, A4 e US Letter, a colori o in bianco e nero. Masse atomiche, elettronegatività, elettroni.',
		lead: 'PDF gratuiti in italiano: A4 e US Letter, a colori e in bianco e nero. Scarica e stampa, senza registrazione.',
		paper: 'Formato carta',
		color: 'Colore',
		download: 'Scarica il PDF',
		preview: 'Anteprima del foglio',
		notes: (date) => [
			'PDF vettoriale: il testo resta nitido a qualsiasi dimensione e si può cercare e copiare.',
			'La versione in bianco e nero è per una stampante normale: le categorie si distinguono dalla trama, non solo dal colore.',
			'Stampa al 100% («Dimensioni effettive»), in orizzontale.',
			`Dati IUPAC (CIAAW), NIST, PubChem; aggiornati il ${date}.`
		],
		variants: 'Tutte le versioni',
		otherLangs: 'In altre lingue',
		link: 'Anteprima e tutte le versioni'
	},
	propertyPage: {
		title: {
			mass: 'Massa atomica degli elementi',
			electronegativity: 'Elettronegatività degli elementi',
			atomicRadius: 'Raggio covalente degli elementi',
			density: 'Densità degli elementi',
			meltingPoint: 'Punto di fusione degli elementi',
			ionizationEnergy: 'Energia di ionizzazione degli elementi'
		},
		seoTitle: (title) => `${title}: tabella dei valori | ChemTable`,
		description: {
			mass: 'Masse atomiche standard IUPAC di 84 elementi e, per gli altri, numero di massa dell’isotopo più stabile: elenco per massa e tavola colorata.',
			electronegativity: 'Elettronegatività di Pauling di tutti gli elementi: elenco ordinato e tavola periodica a colori. Il valore più alto è del fluoro, 3,98.',
			atomicRadius: 'Raggi covalenti degli elementi in picometri (Cordero, 2008): elenco per dimensione dell’atomo e tavola periodica colorata per raggio.',
			density: 'Densità degli elementi in g/cm³: elenco dai più densi, osmio e iridio, ai più leggeri e tavola periodica colorata per densità.',
			meltingPoint: 'Punti di fusione degli elementi in °C e K: elenco dal più alto al più basso e tavola periodica colorata per punto di fusione.',
			ionizationEnergy: 'Prima energia di ionizzazione degli elementi in eV (NIST): elenco ordinato e tavola periodica. Massima per l’elio, minima per il cesio.'
		},
		list: {
			mass: 'Tutti gli elementi per massa atomica',
			electronegativity: 'Tutti gli elementi per elettronegatività',
			atomicRadius: 'Tutti gli elementi per raggio covalente',
			density: 'Tutti gli elementi per densità',
			meltingPoint: 'Tutti gli elementi per punto di fusione',
			ionizationEnergy: 'Tutti gli elementi per energia di ionizzazione'
		},
		sortBy: 'Ordine',
		sort: { desc: 'Decrescente', asc: 'Crescente', z: 'Per numero atomico' },
		missing: 'Nessun dato',
		source: 'Fonte',
		allValues: 'Tutti i valori in elenco',
		all: 'Proprietà degli elementi'
	},
	molar: {
		title: 'Calcolatore di massa molare',
		seoTitle: 'Calcolatore di massa molare: g/mol dalla formula | ChemTable',
		description: 'Calcolatore di massa molare gratuito: inserisci una formula (H2SO4, Ca(OH)2, CuSO4·5H2O) e ottieni i g/mol, il contributo di ogni elemento e il calcolo.',
		lead: 'Inserisci la formula di una sostanza, per esempio H2SO4, Ca(OH)2 o CuSO4·5H2O. Il calcolatore mostra la massa molare e il contributo di ogni elemento. Masse atomiche IUPAC (CIAAW), come nella tavola.',
		formula: 'Formula',
		placeholder: 'Per esempio, Ca(OH)2',
		clear: 'Cancella',
		insert: 'Inserisci',
		result: 'Massa molare',
		unit: 'g/mol',
		school: (masses) => `Per gli esercizi (${masses})`,
		parts: 'Contributo di ogni elemento',
		rounding: 'Il risultato è arrotondato alla precisione della massa atomica meno precisa.',
		popular: 'Sostanze comuni',
		whatIs: 'Che cos’è la massa molare?',
		whatIsText: (example) => [
			'La massa molare M è la massa di una mole di sostanza, cioè di circa 6,022 · 10²³ sue particelle. Si misura in grammi per mole (g/mol).',
			'Per trovarla, somma le masse atomiche di tutti gli atomi della formula: moltiplica la massa di ogni elemento per il suo indice, il numero dei suoi atomi. In g/mol la massa molare è numericamente uguale alla massa molecolare relativa Mr.',
			`Per esempio, per l’acqua: ${example}.`
		],
		errors: {
			syntax: 'Non riesco a leggere la formula. Controlla parentesi e segni, come in Ca(OH)2.',
			symbol: (symbol) =>
				`Non esiste l’elemento «${symbol}». Un simbolo inizia con la maiuscola e la seconda lettera è minuscola: Na, Cl.`,
			case: 'I simboli degli elementi iniziano con la maiuscola.',
			coefficient:
				'Un numero davanti a tutta la formula è un coefficiente di un’equazione: conta le moli, e la massa molare non dipende da esso.',
			suggest: ['Forse intendevi', '?'],
			weight: (name, symbol) =>
				`${name} (${symbol}) non ha isotopi stabili né una composizione naturale costante, quindi la IUPAC non gli assegna un peso atomico standard.`
		},
		compound: {
			title: (of) => `Massa molare ${of}`,
			seoTitle: (of, formula, value) => `Massa molare ${of} (${formula}): ${value} g/mol | ChemTable`,
			description: (of, formula, value, calc, school) =>
				`La massa molare ${of} (${formula}) è ${value} g/mol. Calcolo: ${calc}. Per gli esercizi: ${school} g/mol.`,
			aka: 'Altro nome:',
			sources: 'Masse atomiche IUPAC (CIAAW).',
			pubchemSame: (value) => `Coincide con PubChem: ${value} g/mol.`,
			pubchemDiff: (value) =>
				`PubChem riporta ${value} g/mol: l’ultima cifra differisce perché le masse atomiche sono arrotondate diversamente.`
		}
	},
	moreOnSite: 'Altro su ChemTable',
	footer: {
		tools: 'Strumenti',
		properties: 'Proprietà degli elementi: la tavola colorata per proprietà e tutti i valori',
		molar: 'Massa molare',
		sources: 'Fonti dei dati',
		sourceFor: {
			ciaaw: 'masse atomiche',
			nist: 'energie di ionizzazione',
			pubchem: 'altre proprietà, verificate con il CRC Handbook',
			cordero: 'raggi covalenti',
			wikipedia: 'affinità elettroniche',
			wikidata: 'nomi in 8 lingue'
		},
		updated: (date) => `Dati aggiornati il ${date}`
	}
};
