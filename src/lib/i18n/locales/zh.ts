import type { Dict } from '../ui';

export const zh: Dict = {
	reviewed: false,
	siteName: 'ChemTable',
	title: '化学元素周期表',
	hint: '将鼠标悬停在元素上，或按 Tab 键进入表格并用方向键移动。点击元素即可打开它的信息卡。',
	colorBy: '表格着色方式',
	categories: '分类',
	category: {
		'alkali-metal': '碱金属',
		'alkaline-earth-metal': '碱土金属',
		'transition-metal': '过渡金属',
		'post-transition-metal': '后过渡金属',
		metalloid: '类金属',
		nonmetal: '非金属',
		halogen: '卤素',
		'noble-gas': '稀有气体',
		lanthanide: '镧系元素',
		actinide: '锕系元素'
	},
	property: {
		mass: '相对原子质量',
		electronegativity: '电负性',
		atomicRadius: '范德华半径',
		density: '密度',
		meltingPoint: '熔点',
		ionizationEnergy: '电离能'
	},
	unit: {
		mass: 'u',
		electronegativity: '鲍林标度',
		atomicRadius: 'pm',
		density: 'g/cm³',
		meltingPoint: '°C',
		ionizationEnergy: 'eV'
	},
	noData: '暂无数据',
	period: '周期',
	group: '族',
	block: '区',
	state: { solid: '固态', liquid: '液态', gas: '气态' },
	predicted: '预测值',
	atomicMass: '相对原子质量',
	massIsotope: '最稳定同位素的质量数',
	config: '电子排布',
	shells: '各电子层电子数',
	boilingPoint: '沸点',
	oxidationStates: '氧化态',
	electronAffinity: '电子亲和能',
	discovered: '发现年份',
	ancient: '古代已知',
	close: '关闭',
	sources: '数据来源',
	sourcesNote:
		'性质数据来自 PubChem（美国国立卫生研究院）。相对原子质量来自 IUPAC CIAAW 的简化标准值。方括号中为最稳定同位素的质量数。元素名称来自 Wikidata。',
	theme: { light: '浅色主题', dark: '深色主题', system: '跟随系统' },
	language: '语言',
	madeBy: '出品：',
	explainToggle: '这是什么意思',
	explain: {
		mass: '原子的平均质量，以原子质量单位表示（1 u 等于一个碳-12 原子质量的 1/12）。已考虑该元素天然同位素的组成。',
		group:
			'竖列的编号，按 IUPAC 编号为 1 至 18。同一族元素的最外层电子结构相同，因此性质相似。部分中学教材仍使用以罗马数字表示的主族和副族编号。',
		period: '横行的编号，等于原子的电子层数。',
		block: '最后填入电子的亚层（s、p、d 或 f）。每个区在周期表中构成一个矩形区域。',
		config: '电子在各亚层中的分布。方括号表示前一个稀有气体的电子排布，上标表示该亚层中的电子数。',
		shells: '从原子核向外，每个电子层上的电子数。',
		electronegativity:
			'原子在化学键中吸引电子的能力。按鲍林标度，从钫的 0.7 到氟的 3.98。',
		atomicRadius:
			'两个相邻但不成键的原子相互靠近时距离的一半。它比教科书中的共价半径或金属半径大：铁为 194 pm，而金属半径约为 126 pm。',
		density: '1 立方厘米物质的质量。气体为 0 °C、标准大气压下的数值。',
		meltingPoint: '在标准大气压下固体变为液体时的温度。',
		boilingPoint: '在标准大气压下液体沸腾时的温度。',
		ionizationEnergy:
			'从原子中移去最外层、结合最弱的一个电子所需的能量。数值越小，元素越容易失去电子，这是金属的典型特征。',
		electronAffinity: '中性原子获得一个电子时释放的能量。卤素的数值最大。',
		oxidationStates: '原子在化合物中可能具有的形式电荷。'
	},
	trend: {
		mass: '随原子序数增大：从左到右、从上到下逐渐增大。',
		electronegativity: '同一周期从左到右增大，同一族从上到下减小。氟的电负性最大。',
		atomicRadius: '大体上同一周期从左到右减小，同一族从上到下增大。',
		density: '密度最大的是第 6 周期中部的金属：锇和铱。采用对数刻度，因为气体比金属轻数千倍。',
		meltingPoint: '碳和过渡金属的熔点最高，稀有气体的熔点最低。',
		ionizationEnergy: '同一周期从左到右增大，稀有气体最高；同一族从上到下减小。'
	},

	seo: {
		homeTitle: '交互式元素周期表 | ChemTable',
		homeDescription:
			'交互式元素周期表，涵盖全部 118 种元素：相对原子质量、电子排布、电负性、密度等，并附有面向学生的说明。',
		elementTitle: (name, symbol) => `${name}（${symbol}）：性质与相对原子质量 | ChemTable`,
		elementDescription: (f) =>
			`${f.name}（${f.symbol}），原子序数 ${f.z}，${f.category}` +
			(f.mass ? `，${f.massIsIsotope ? '质量数' : '相对原子质量'} ${f.mass}` : '') +
			`。电子排布、密度、熔点、电负性等性质。`
	},
	article: {
		kicker: (z) => `第 ${z} 号化学元素`,
		summary: (f) =>
			[
				`${f.name}（${f.symbol}）是原子序数为 ${f.z} 的化学元素。`,
				f.group
					? `它位于元素周期表第 ${f.period} 周期、第 ${f.group} 族，属于 ${f.block} 区。`
					: `它位于元素周期表第 ${f.period} 周期，属于 ${f.block} 区。`,
				`分类：${f.category}。`,
				`室温下的状态：${f.state}${f.statePredicted ? '（预测）' : ''}。`,
				f.mass
					? f.massIsIsotope
						? `它没有标准相对原子质量；最稳定同位素的质量数为 ${f.mass}。`
						: `标准相对原子质量为 ${f.mass}。`
					: ''
			]
				.filter(Boolean)
				.join(''),
		properties: '性质',
		property: '性质',
		value: '数值',
		related: '相邻元素',
		sameGroup: (g) => `第 ${g} 族`,
		samePeriod: (p) => `第 ${p} 周期`,
		previous: '上一个元素',
		next: '下一个元素',
		readMore: '了解更多',
		wikipedia: '维基百科',
		backToTable: '返回周期表'
	},
	about: {
		heading: '关于本元素周期表',
		paragraphs: [
			'这是一张面向学生的交互式元素周期表，收录全部 118 种化学元素。打开任意元素即可查看其相对原子质量、电子排布、熔点和沸点、密度、电负性、电离能和氧化态，每一项都附有简短说明。',
			'可以按分类或按某项性质为表格着色，观察元素周期律：例如电负性如何向氟逐渐增大，原子半径如何沿族自上而下增大。',
			'性质数据来自 PubChem（美国国立卫生研究院），标准相对原子质量来自 IUPAC CIAAW，八种语言的元素名称来自 Wikidata。'
		]
	},
	data: {
		heading: '开放数据',
		text: '全部 118 种元素的完整数据集可免费下载。供 AI 助手使用的纯文本摘要见 llms.txt。'
	},
	print: {
		heading: '打印版元素周期表',
		text: '免费 PDF，可下载打印，横向版式。黑白版更省墨，各类元素以不同纹理区分。',
		color: '彩色',
		bw: '黑白',
		atomicNumber: '原子序数',
		symbol: '元素符号',
		name: '名称'
	}
};
