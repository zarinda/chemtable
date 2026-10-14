import type { Dict } from '../ui';

/** Brazilian Portuguese. */
export const pt: Dict = {
	reviewed: false,
	siteName: 'ChemTable',
	title: 'Tabela periódica dos elementos químicos',
	hint: 'Passe o cursor sobre um elemento, ou entre na tabela com Tab e mova-se com as setas. Clique em um elemento para abrir a ficha dele.',
	hintTouch: 'Toque em um elemento ou deslize o dedo pela tabela',
	colorBy: 'Colorir a tabela por',
	categories: 'Categorias',
	category: {
		'alkali-metal': 'Metais alcalinos',
		'alkaline-earth-metal': 'Metais alcalinoterrosos',
		'transition-metal': 'Metais de transição',
		'post-transition-metal': 'Metais pós-transição',
		metalloid: 'Semimetais',
		nonmetal: 'Não metais',
		halogen: 'Halogênios',
		'noble-gas': 'Gases nobres',
		lanthanide: 'Lantanídeos',
		actinide: 'Actinídeos'
	},
	property: {
		mass: 'Massa atômica',
		electronegativity: 'Eletronegatividade',
		atomicRadius: 'Raio covalente',
		density: 'Densidade',
		meltingPoint: 'Ponto de fusão',
		ionizationEnergy: 'Energia de ionização'
	},
	unit: {
		mass: 'u',
		electronegativity: 'Pauling',
		atomicRadius: 'pm',
		density: 'g/cm³',
		meltingPoint: '°C',
		ionizationEnergy: 'eV'
	},
	noData: 'sem dados',
	period: 'Período',
	group: 'Grupo',
	block: 'Bloco',
	state: { solid: 'Sólido', liquid: 'Líquido', gas: 'Gasoso' },
	predicted: 'previsto',
	underPressure: 'só sob pressão',
	sublimes: 'sublimação',
	anionUnstable: 'não forma íon negativo estável',
	atomicMass: 'Massa atômica',
	massIsotope: 'número de massa do isótopo mais estável',
	config: 'Configuração eletrônica',
	shells: 'Elétrons por camada',
	boilingPoint: 'Ponto de ebulição',
	oxidationStates: 'Estados de oxidação',
	electronAffinity: 'Afinidade eletrônica',
	discovered: 'Descoberta',
	ancient: 'conhecido desde a Antiguidade',
	discoveredBy: 'Descoberto por',
	namedAfter: 'Nome em homenagem a',
	close: 'Fechar',
	open: 'Abrir',
	sources: 'Fontes dos dados',
	sourcesNote:
		'Massas atômicas: IUPAC CIAAW, valores padrão abreviados; entre colchetes, número de massa do isótopo mais estável. Energias de ionização: NIST. Afinidades eletrônicas: valores medidos (tabela da Wikipédia com fontes primárias). Raios covalentes: Cordero et al. (2008). Demais propriedades: PubChem (NIH), conferidas com o CRC Handbook. Nomes dos elementos: Wikidata.',
	theme: { light: 'Tema claro', dark: 'Tema escuro', system: 'Igual ao sistema' },
	language: 'Idioma',
	madeBy: 'Criado por ',
	explainToggle: 'O que isso significa',
	explain: {
		mass: 'Massa média de um átomo em unidades de massa atômica (1 u é 1/12 da massa de um átomo de carbono-12). Leva em conta a mistura natural de isótopos do elemento.',
		group:
			'Número da coluna vertical, de 1 a 18 na numeração da IUPAC. Elementos do mesmo grupo têm a mesma camada externa e, por isso, propriedades parecidas. Alguns livros didáticos ainda usam a numeração antiga com famílias A e B.',
		period:
			'Número da linha horizontal. Em geral é igual ao número de camadas eletrônicas do átomo; a exceção é o paládio, com quatro camadas no período 5.',
		block:
			'O subnível (s, p, d ou f) preenchido por último pelos elétrons. Cada bloco forma uma área retangular da tabela.',
		config:
			'Como os elétrons se distribuem nos subníveis. Os colchetes representam o gás nobre anterior; o expoente, o número de elétrons no subnível.',
		shells: 'Número de elétrons em cada camada, do núcleo para fora.',
		electronegativity:
			'Com que força um átomo atrai elétrons em uma ligação química. Na escala de Pauling, vai de 0,7 no frâncio a 3,98 no flúor.',
		atomicRadius:
			'Metade do comprimento de uma ligação covalente simples entre dois átomos do elemento. Indica o tamanho do átomo em uma molécula ou cristal: 76 pm no carbono, 132 pm no ferro.',
		density: 'Massa de um centímetro cúbico da substância. Para gases, a 0 °C e pressão normal.',
		meltingPoint:
			'Temperatura em que o sólido se torna líquido sob pressão normal. Hélio, carbono e arsênio não se fundem sob pressão normal: o hélio precisa de cerca de 25 atm, e o carbono e o arsênio passam direto para vapor.',
		boilingPoint:
			'Temperatura em que o líquido ferve sob pressão normal. No carbono e no arsênio, temperatura em que o sólido sublima.',
		ionizationEnergy:
			'Energia necessária para retirar do átomo o elétron menos preso. Quanto menor, mais facilmente o elemento perde um elétron, o que é típico dos metais.',
		electronAffinity:
			'Energia liberada quando um átomo neutro recebe um elétron. É maior nos halogênios. Os gases nobres, o nitrogênio e alguns metais não formam íons negativos estáveis.',
		oxidationStates: 'Principais cargas formais que o átomo assume em seus compostos.'
	},
	trend: {
		mass: 'Cresce com o número atômico, com poucas exceções: o argônio é mais pesado que o potássio, o cobalto que o níquel e o telúrio que o iodo.',
		electronegativity:
			'Aumenta da esquerda para a direita em um período e diminui de cima para baixo em um grupo. O flúor tem o maior valor.',
		atomicRadius:
			'Em geral diminui da esquerda para a direita em um período e aumenta de cima para baixo em um grupo.',
		density:
			'Os mais densos são os metais no meio do 6º período: ósmio e irídio. A escala é logarítmica porque os gases são milhares de vezes mais leves que os metais.',
		meltingPoint: 'É mais alto no carbono e nos metais de transição e mais baixo nos gases nobres.',
		ionizationEnergy:
			'Aumenta da esquerda para a direita em um período, com o máximo nos gases nobres. Diminui de cima para baixo em um grupo.'
	},

	seo: {
		homeTitle: 'Tabela periódica interativa dos elementos | ChemTable',
		homeDescription:
			'Tabela periódica interativa dos 118 elementos: massa atômica, configuração eletrônica, eletronegatividade, densidade e mais, com explicações para estudantes.',
		elementTitle: (name, symbol) => `${name} (${symbol}): propriedades e massa atômica | ChemTable`,
		elementDescription: (f) =>
			`${f.name} (${f.symbol}), número atômico ${f.z}: ${f.category.toLowerCase()}` +
			(f.mass ? `, ${f.massIsIsotope ? 'número de massa' : 'massa atômica'} ${f.mass}` : '') +
			`. Configuração eletrônica, densidade, ponto de fusão, eletronegatividade e mais.`
	},
	article: {
		kicker: (z) => `Elemento químico nº ${z}`,
		summary: (f) =>
			[
				`${f.name} (${f.symbol}) é um elemento químico de número atômico ${f.z}.`,
				f.group
					? `Fica no grupo ${f.group} e no ${f.period}º período da tabela periódica, no bloco ${f.block}.`
					: `Fica no ${f.period}º período da tabela periódica, no bloco ${f.block}.`,
				`Categoria: ${f.category.toLowerCase()}.`,
				`Estado à temperatura ambiente: ${f.state.toLowerCase()}${f.statePredicted ? ' (previsto)' : ''}.`,
				f.mass
					? f.massIsIsotope
						? `Não tem massa atômica padrão; o número de massa do seu isótopo mais estável é ${f.mass}.`
						: `Sua massa atômica padrão é ${f.mass}.`
					: ''
			]
				.filter(Boolean)
				.join(' '),
		properties: 'Propriedades',
		property: 'Propriedade',
		value: 'Valor',
		related: 'Elementos vizinhos',
		sameGroup: (g) => `Grupo ${g}`,
		samePeriod: (p) => `${p}º período`,
		previous: 'Elemento anterior',
		next: 'Próximo elemento',
		readMore: 'Saiba mais',
		wikipedia: 'Wikipédia',
		backToTable: 'Voltar à tabela'
	},
	about: {
		heading: 'Sobre esta tabela periódica',
		paragraphs: [
			'Uma tabela periódica interativa dos 118 elementos químicos, feita para estudantes. Abra qualquer elemento para ver massa atômica, configuração eletrônica, pontos de fusão e de ebulição, densidade, eletronegatividade, energia de ionização e estados de oxidação, cada um com uma explicação curta.',
			'Pinte a tabela por categoria ou por propriedade para ver as tendências periódicas: como a eletronegatividade aumenta em direção ao flúor ou como os átomos ficam maiores ao descer cada grupo.'
		]
	},
	data: {
		heading: 'Dados abertos',
		text: 'O conjunto completo de dados dos 118 elementos pode ser baixado livremente. Há um resumo em texto simples para assistentes de IA em llms.txt.'
	},
	licenses: 'Licenças',
	privacy: {
		title: 'Política de privacidade',
		description:
			'Como o ChemTable trata os dados: sem contas, sem análises, sem rastreamento. O que o navegador guarda, o que a hospedagem vê e como os anúncios usam cookies.',
		updated: 'Última atualização:',
		intro: (author) =>
			`O ChemTable é feito pela ${author}, uma empresa registrada na República da Armênia. Esta página explica o que acontece com os dados quando você usa o site.`,
		sections: {
			collect: {
				heading: 'O que coletamos',
				paragraphs: [
					'Nada que identifique você. O ChemTable não tem contas, formulários nem comentários, e não usa análises de tráfego nem rastreamento.'
				]
			},
			storage: {
				heading: 'Configurações no navegador',
				paragraphs: [
					'Se você escolhe o tema claro ou escuro, a escolha é salva no armazenamento local do navegador para que o site se lembre dela. Ela nunca sai do seu dispositivo; apagar os dados do site no navegador a remove.'
				]
			},
			hosting: {
				heading: 'Hospedagem',
				paragraphs: [
					'O site é entregue pela Cloudflare. Como qualquer servidor web, a Cloudflare processa seu endereço IP e dados técnicos de cada solicitação, como o navegador e a página, para entregar as páginas e proteger o site contra ataques. Não usamos essas informações para identificar visitantes.'
				]
			},
			external: {
				heading: 'Outros sites',
				paragraphs: [
					'As páginas dos elementos têm links para a Wikipédia, o PubChem e o Wikidata, que têm suas próprias políticas de privacidade. As fontes são carregadas deste site, não de terceiros.'
				]
			},
			children: {
				heading: 'Crianças',
				paragraphs: [
					'O ChemTable é feito para estudantes da escola e da universidade. Não coletamos intencionalmente dados pessoais de ninguém, incluindo crianças.'
				]
			},
			ads: {
				heading: 'Publicidade',
				paragraphs: [
					'Os anúncios do ChemTable são veiculados pelo Google AdSense. O Google e seus parceiros usam cookies e tecnologias semelhantes para exibir anúncios, limitar a repetição do mesmo anúncio, medir os anúncios e evitar fraudes.',
					'Como muitos visitantes são crianças, pedimos ao Google que trate todas as páginas como direcionadas a crianças. Assim, o Google exibe apenas anúncios não personalizados, escolhidos pela página que você está lendo e não pelo seu histórico de navegação, e sem remarketing.',
					'Fornecedores terceiros, incluindo o Google, podem usar cookies para exibir anúncios com base nas suas visitas anteriores a este e a outros sites. No ChemTable esses anúncios personalizados estão desativados, como descrito acima. Você também pode desativar os anúncios personalizados da sua conta Google nas Configurações de anúncios e recusar os cookies de outros fornecedores em aboutads.info ou youronlinechoices.eu.',
					'No Espaço Econômico Europeu, no Reino Unido e na Suíça, o site pede seu consentimento antes de usar cookies de publicidade. Você pode mudar sua escolha a qualquer momento pelo link de configurações de privacidade e cookies na página.'
				]
			},
			rights: {
				heading: 'Seus direitos',
				paragraphs: [
					'Dependendo de onde você mora, leis como a Lei Geral de Proteção de Dados (LGPD), o Regulamento Geral sobre a Proteção de Dados (RGPD) da UE e a Lei da República da Armênia sobre Proteção de Dados Pessoais dão a você o direito de saber quais dados sobre você são mantidos, de corrigi-los ou excluí-los e de se opor ao seu uso. O próprio ChemTable não mantém dados pessoais dos visitantes.'
				]
			},
			changes: {
				heading: 'Alterações',
				paragraphs: [
					'Se esta política mudar, a data no topo da página também mudará.'
				]
			}
		},
		adsOff:
			'No momento, o ChemTable não exibe anúncios. Se passarmos a exibi-los, esta seção descreverá seus cookies antes do primeiro anúncio.',
		contact: 'Dúvidas sobre esta política:',
		back: 'Voltar à tabela periódica'
	},
	notFound: {
		title: 'Página não encontrada',
		text: 'Não há nenhuma página neste endereço. Talvez o link tenha um erro de digitação ou a página tenha mudado de lugar.',
		suggest: 'Talvez você esteja procurando:',
		back: 'Abrir a tabela periódica',
		beyond: (name, z) =>
			`O elemento 404 também não existe: o mais pesado conhecido é o ${name.toLowerCase()}, número ${z}.`
	},
	print: {
		heading: 'Tabela periódica para imprimir',
		text: 'Um PDF gratuito para baixar e imprimir, em paisagem. A versão em preto e branco economiza tinta: as categorias se distinguem pela textura.',
		color: 'Colorida',
		bw: 'Preto e branco',
		atomicNumber: 'Número atômico',
		symbol: 'Símbolo',
		name: 'Nome'
	},
	printPage: {
		title: 'Tabela periódica para imprimir',
		seoTitle: 'Tabela periódica para imprimir: PDF grátis, A4 e Letter | ChemTable',
		description: 'Tabela periódica para imprimir em português: PDF vetorial grátis em A4 e US Letter, colorida ou preto e branco. Massas atômicas, eletronegatividade, elétrons.',
		lead: 'PDFs gratuitos em português: A4 e US Letter, colorida e em preto e branco. Baixe e imprima, sem cadastro.',
		paper: 'Tamanho do papel',
		color: 'Cor',
		download: 'Baixar PDF',
		preview: 'Prévia da folha',
		notes: (date) => [
			'PDF vetorial: o texto fica nítido em qualquer tamanho e pode ser pesquisado e copiado.',
			'A versão em preto e branco é para uma impressora comum: as categorias se distinguem pela textura, não só pela cor.',
			'Imprima em 100% (“Tamanho real”), na orientação paisagem.',
			`Dados da IUPAC (CIAAW), NIST, PubChem; atualizados em ${date}.`
		],
		variants: 'Todas as versões',
		otherLangs: 'Em outros idiomas',
		link: 'Prévia e todas as versões'
	},
	propertyPage: {
		title: {
			mass: 'Massa atômica dos elementos',
			electronegativity: 'Eletronegatividade dos elementos',
			atomicRadius: 'Raio covalente dos elementos',
			density: 'Densidade dos elementos',
			meltingPoint: 'Ponto de fusão dos elementos',
			ionizationEnergy: 'Energia de ionização dos elementos'
		},
		seoTitle: (title) => `${title}: tabela de valores | ChemTable`,
		description: {
			mass: 'Massas atômicas dos 118 elementos segundo a IUPAC: lista do mais pesado ao mais leve e tabela periódica colorida por massa atômica.',
			electronegativity: 'Eletronegatividade de Pauling de todos os elementos: lista ordenada e tabela periódica em cores. O flúor tem a maior, 3,98.',
			atomicRadius: 'Raios covalentes dos elementos em picômetros (Cordero, 2008): lista por tamanho do átomo e tabela periódica colorida por raio.',
			density: 'Densidade dos elementos em g/cm³: lista dos mais densos, ósmio e irídio, aos mais leves e tabela periódica colorida por densidade.',
			meltingPoint: 'Pontos de fusão dos elementos em °C e K: lista do mais alto ao mais baixo e tabela periódica colorida por ponto de fusão.',
			ionizationEnergy: 'Primeira energia de ionização dos elementos em eV (NIST): lista ordenada e tabela periódica. Máxima no hélio, mínima no césio.'
		},
		list: {
			mass: 'Todos os elementos por massa atômica',
			electronegativity: 'Todos os elementos por eletronegatividade',
			atomicRadius: 'Todos os elementos por raio covalente',
			density: 'Todos os elementos por densidade',
			meltingPoint: 'Todos os elementos por ponto de fusão',
			ionizationEnergy: 'Todos os elementos por energia de ionização'
		},
		sortBy: 'Ordem',
		sort: { desc: 'Do maior ao menor', asc: 'Do menor ao maior', z: 'Por número atômico' },
		missing: 'Sem dados',
		source: 'Fonte',
		allValues: 'Todos os valores em lista',
		all: 'Propriedades dos elementos'
	},
	molar: {
		title: 'Calculadora de massa molar',
		seoTitle: 'Calculadora de massa molar: g/mol a partir da fórmula | ChemTable',
		description: 'Calculadora de massa molar grátis: digite uma fórmula (H2SO4, Ca(OH)2, CuSO4·5H2O) e veja os g/mol, a contribuição de cada elemento e o cálculo.',
		lead: 'Digite a fórmula de uma substância, por exemplo H2SO4, Ca(OH)2 ou CuSO4·5H2O. A calculadora mostra a massa molar e a contribuição de cada elemento. Massas atômicas da IUPAC (CIAAW), como na tabela.',
		formula: 'Fórmula',
		placeholder: 'Por exemplo, Ca(OH)2',
		clear: 'Limpar',
		insert: 'Inserir',
		result: 'Massa molar',
		unit: 'g/mol',
		school: (masses) => `Para exercícios escolares (${masses})`,
		parts: 'Contribuição de cada elemento',
		howCalculated: 'Como é calculado',
		rounding: 'O resultado é arredondado à precisão da massa atômica menos precisa.',
		more: 'Página da substância',
		popular: 'Substâncias comuns',
		another: 'Calcular outra substância',
		calculate: 'Calcular',
		whatIs: 'O que é massa molar?',
		whatIsText: (example) => [
			'A massa molar M é a massa de um mol de uma substância, ou seja, de cerca de 6,022 · 10²³ de suas partículas. É medida em gramas por mol (g/mol).',
			'Para encontrá-la, some as massas atômicas de todos os átomos da fórmula: multiplique a massa de cada elemento pelo seu índice, o número de seus átomos. Em g/mol, a massa molar é numericamente igual à massa molecular relativa Mr.',
			`Por exemplo, para a água: ${example}.`
		],
		errors: {
			syntax: 'Não foi possível ler a fórmula. Confira os parênteses e os sinais, como em Ca(OH)2.',
			symbol: (symbol) =>
				`Não existe o elemento “${symbol}”. Um símbolo começa com letra maiúscula, e a segunda letra é minúscula: Na, Cl.`,
			case: 'Os símbolos dos elementos começam com letra maiúscula.',
			suggest: ['Você quis dizer', '?'],
			weight: (name, symbol) =>
				`${name} (${symbol}) não tem isótopos estáveis nem composição natural constante, por isso a IUPAC não lhe atribui massa atômica padrão.`
		},
		compound: {
			title: (of) => `Massa molar ${of}`,
			seoTitle: (of, formula, value) => `Massa molar ${of} (${formula}): ${value} g/mol | ChemTable`,
			description: (of, formula, value, calc, school) =>
				`A massa molar ${of} (${formula}) é ${value} g/mol. Cálculo: ${calc}. Para exercícios escolares: ${school} g/mol.`,
			aka: 'Outro nome:',
			sources: 'Massas atômicas da IUPAC (CIAAW).',
			pubchemSame: (value) => `Coincide com o PubChem: ${value} g/mol.`,
			pubchemDiff: (value) =>
				`O PubChem dá ${value} g/mol: o último algarismo difere porque as massas atômicas são arredondadas de outro jeito.`,
			back: 'Massa molar'
		}
	},
	moreOnSite: 'Mais no ChemTable',
	footer: {
		tools: 'Ferramentas',
		properties: 'Propriedades dos elementos: a tabela colorida por propriedade e todos os valores',
		molar: 'Massa molar',
		sources: 'Fontes dos dados',
		sourceFor: {
			ciaaw: 'massas atômicas',
			nist: 'energias de ionização',
			pubchem: 'demais propriedades, conferidas com o CRC Handbook',
			cordero: 'raios covalentes',
			wikipedia: 'afinidades eletrônicas',
			wikidata: 'nomes em 8 idiomas'
		},
		updated: (date) => `Dados atualizados em ${date}`
	}
};
