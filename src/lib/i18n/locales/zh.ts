import type { Dict } from '../ui';

export const zh: Dict = {
	reviewed: false,
	siteName: 'ChemTable',
	title: '化学元素周期表',
	hint: '将鼠标悬停在元素上，或按 Tab 键进入表格并用方向键移动。点击元素即可打开它的信息卡。',
	hintTouch: '轻触元素，或用手指在表格上滑动',
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
		atomicRadius: '共价半径',
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
	underPressure: '仅在加压下',
	sublimes: '升华',
	anionUnstable: '不形成稳定负离子',
	atomicMass: '相对原子质量',
	massIsotope: '最稳定同位素的质量数',
	config: '电子排布',
	shells: '各电子层电子数',
	boilingPoint: '沸点',
	oxidationStates: '氧化态',
	electronAffinity: '电子亲和能',
	discovered: '发现年份',
	ancient: '古代已知',
	discoveredBy: '发现者',
	namedAfter: '命名来源',
	close: '关闭',
	open: '打开',
	sources: '数据来源',
	sourcesNote:
		'相对原子质量来自 IUPAC CIAAW 的简化标准值；方括号中为最稳定同位素的质量数。电离能来自 NIST。电子亲和能为实测值（维基百科汇总表，附原始文献）。共价半径来自 Cordero 等（2008）。其他性质来自 PubChem（美国国立卫生研究院），并已与 CRC 手册核对。元素名称来自 Wikidata。',
	theme: { light: '浅色主题', dark: '深色主题', system: '跟随系统' },
	language: '语言',
	madeBy: '出品：',
	explainToggle: '这是什么意思',
	explain: {
		mass: '原子的平均质量，以原子质量单位表示（1 u 等于一个碳-12 原子质量的 1/12）。已考虑该元素天然同位素的组成。',
		group:
			'竖列的编号，按 IUPAC 编号为 1 至 18。同一族元素的最外层电子结构相同，因此性质相似。部分中学教材仍使用以罗马数字表示的主族和副族编号。',
		period: '横行的编号，通常等于原子的电子层数；钯是例外，它只有四个电子层，却位于第 5 周期。',
		block: '最后填入电子的亚层（s、p、d 或 f）。每个区在周期表中构成一个矩形区域。',
		config: '电子在各亚层中的分布。方括号表示前一个稀有气体的电子排布，上标表示该亚层中的电子数。',
		shells: '从原子核向外，每个电子层上的电子数。',
		electronegativity:
			'原子在化学键中吸引电子的能力。按鲍林标度，从钫的 0.7 到氟的 3.98。',
		atomicRadius:
			'同种元素两个原子之间单键键长的一半，反映原子在分子或晶体中的大小：碳为 76 pm，铁为 132 pm。',
		density: '1 立方厘米物质的质量。气体为 0 °C、标准大气压下的数值。',
		meltingPoint:
			'在标准大气压下固体变为液体时的温度。氦、碳和砷在常压下不会熔化：氦需要约 25 个大气压，碳和砷则直接变为气体。',
		boilingPoint:
			'在标准大气压下液体沸腾时的温度。对碳和砷而言，是固体直接变为气体（升华）的温度。',
		ionizationEnergy:
			'从原子中移去最外层、结合最弱的一个电子所需的能量。数值越小，元素越容易失去电子，这是金属的典型特征。',
		electronAffinity:
			'中性原子获得一个电子时释放的能量。卤素的数值最大。稀有气体、氮和部分金属不能形成稳定的负离子。',
		oxidationStates: '原子在化合物中常见的形式电荷。'
	},
	trend: {
		mass: '随原子序数增大而增大，但有少数例外：氩比钾重，钴比镍重，碲比碘重。',
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
			'相对原子质量来自 IUPAC CIAAW，电离能来自 NIST，共价半径来自 Cordero 等（2008），其他性质来自 PubChem（美国国立卫生研究院）并已与 CRC 手册核对。八种语言的元素名称来自 Wikidata。'
		]
	},
	data: {
		heading: '开放数据',
		text: '全部 118 种元素的完整数据集可免费下载。供 AI 助手使用的纯文本摘要见 llms.txt。'
	},
	licenses: '许可证',
	privacy: {
		title: '隐私政策',
		description:
			'ChemTable 如何处理数据：无需注册，不做统计，不做跟踪。浏览器保存什么、托管服务能看到什么，以及广告如何使用 Cookie。',
		updated: '最后更新：',
		intro: (author) =>
			`ChemTable 由在亚美尼亚共和国注册的公司 ${author} 制作。本页说明你使用本网站时数据的处理方式。`,
		sections: {
			collect: {
				heading: '我们收集什么',
				paragraphs: [
					'不收集任何能识别你身份的信息。ChemTable 没有账号、表单或评论功能，也不使用统计分析或跟踪工具。'
				]
			},
			storage: {
				heading: '浏览器中的设置',
				paragraphs: [
					'如果你选择浅色或深色主题，该选择会保存在浏览器的本地存储中，以便网站记住它。它不会离开你的设备；在浏览器中清除本网站的数据即可将其删除。'
				]
			},
			hosting: {
				heading: '托管',
				paragraphs: [
					'本网站由 Cloudflare 提供服务。与任何网络服务器一样，Cloudflare 会处理你的 IP 地址和每次请求的技术信息（如浏览器和页面），用于传送页面并保护网站免受攻击。我们不会用这些信息识别访问者。'
				]
			},
			external: {
				heading: '其他网站',
				paragraphs: [
					'元素页面链接到维基百科、PubChem 和 Wikidata，这些网站有各自的隐私政策。字体由本网站提供，而非来自第三方。'
				]
			},
			children: {
				heading: '儿童',
				paragraphs: [
					'ChemTable 面向中学生和大学生。我们不会有意收集任何人的个人数据，包括儿童。'
				]
			},
			ads: {
				heading: '广告',
				paragraphs: [
					'ChemTable 上的广告由 Google AdSense 投放。Google 及其合作伙伴使用 Cookie 和类似技术来展示广告、限制同一广告的重复次数、衡量广告效果并防止欺诈。',
					'由于许多访问者是儿童，我们要求 Google 将所有页面视为面向儿童的内容。因此 Google 只展示非个性化广告：广告根据你正在阅读的页面而非浏览记录来选择，也不进行再营销。',
					'包括 Google 在内的第三方供应商可以使用 Cookie，根据你以前访问本网站和其他网站的情况投放广告。如上所述，ChemTable 已关闭此类个性化广告。你还可以在 Google 的广告设置中为你的 Google 账号关闭个性化广告，并在 aboutads.info 或 youronlinechoices.eu 拒绝其他供应商的 Cookie。',
					'在欧洲经济区、英国和瑞士，网站会在使用广告 Cookie 之前征求你的同意。你可以随时通过页面上的隐私和 Cookie 设置链接更改选择。'
				]
			},
			rights: {
				heading: '你的权利',
				paragraphs: [
					'根据你所在的地区，欧盟《通用数据保护条例》（GDPR）和亚美尼亚共和国《个人数据保护法》等法律赋予你以下权利：了解保存了哪些与你有关的数据，要求更正或删除这些数据，以及反对其使用。ChemTable 本身不保存访问者的个人数据。'
				]
			},
			changes: {
				heading: '变更',
				paragraphs: [
					'如果本政策发生变化，页面顶部的日期也会随之更新。'
				]
			}
		},
		adsOff:
			'ChemTable 目前不展示广告。如果将来添加广告，本节会在第一条广告出现之前说明其使用的 Cookie。',
		contact: '有关本政策的问题：',
		back: '返回元素周期表'
	},
	notFound: {
		title: '页面未找到',
		text: '此地址没有页面。链接可能有拼写错误，或页面已被移动。',
		suggest: '你可能在找：',
		back: '打开元素周期表',
		beyond: (name, z) => `也不存在 404 号元素：已知最重的元素是${name}，原子序数 ${z}。`
	},
	print: {
		heading: '打印版元素周期表',
		text: '免费 PDF，可下载打印，横向版式。黑白版更省墨，各类元素以不同纹理区分。',
		color: '彩色',
		bw: '黑白',
		atomicNumber: '原子序数',
		symbol: '元素符号',
		name: '名称'
	},
	printPage: {
		title: '打印版元素周期表',
		seoTitle: '元素周期表打印版：免费 PDF，A4 和 Letter | ChemTable',
		description: '可打印的中文元素周期表：免费矢量 PDF，A4 和 US Letter 纸张，彩色或黑白。包含原子序数、原子量、电负性和电子排布。',
		lead: '免费中文 PDF：A4 和 US Letter，彩色和黑白两种。下载即可打印，无需注册。',
		paper: '纸张尺寸',
		color: '颜色',
		download: '下载 PDF',
		preview: '页面预览',
		notes: (date) => [
			'矢量 PDF：任意缩放文字都清晰，可搜索、可复制。',
			'黑白版适合普通打印机：各类元素以纹理区分，而不只靠颜色。',
			'请按 100% 比例（“实际大小”）横向打印。',
			`数据来源：IUPAC（CIAAW）、NIST、PubChem；更新于 ${date}。`
		],
		variants: '全部版本',
		otherLangs: '其他语言',
		link: '预览和全部版本'
	},
	propertyPage: {
		title: {
			mass: '化学元素的相对原子质量',
			electronegativity: '化学元素的电负性',
			atomicRadius: '化学元素的共价半径',
			density: '化学元素的密度',
			meltingPoint: '化学元素的熔点',
			ionizationEnergy: '化学元素的电离能'
		},
		seoTitle: (title) => `${title}：数值表 | ChemTable`,
		description: {
			mass: '依据 IUPAC 的全部 118 种元素的相对原子质量：从重到轻的列表，以及按相对原子质量着色的元素周期表。',
			electronegativity: '全部元素的鲍林电负性：排序列表和彩色元素周期表。氟的电负性最高，为 3.98。',
			atomicRadius: '元素的共价半径（皮米，Cordero 2008）：按原子大小排序的列表，以及按半径着色的元素周期表。',
			density: '元素的密度（g/cm³）：从密度最大的锇和铱到最轻的元素的列表，以及按密度着色的元素周期表。',
			meltingPoint: '元素的熔点（°C 和 K）：从高到低的列表，以及按熔点着色的元素周期表。',
			ionizationEnergy: '元素的第一电离能（eV，NIST 数据）：排序列表和元素周期表。氦最高，铯最低。'
		},
		list: {
			mass: '按相对原子质量排列的全部元素',
			electronegativity: '按电负性排列的全部元素',
			atomicRadius: '按共价半径排列的全部元素',
			density: '按密度排列的全部元素',
			meltingPoint: '按熔点排列的全部元素',
			ionizationEnergy: '按电离能排列的全部元素'
		},
		sortBy: '顺序',
		sort: { desc: '从高到低', asc: '从低到高', z: '按原子序数' },
		missing: '暂无数据',
		source: '来源',
		allValues: '查看全部数值列表',
		all: '元素性质'
	}
};
