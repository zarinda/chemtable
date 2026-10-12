import type { Dict } from '../ui';

export const de: Dict = {
	reviewed: false,
	siteName: 'ChemTable',
	title: 'Periodensystem der chemischen Elemente',
	hint: 'Fahren Sie über ein Element oder wechseln Sie mit Tab in die Tabelle und bewegen Sie sich mit den Pfeiltasten. Klicken Sie auf ein Element, um seine Karte zu öffnen.',
	colorBy: 'Tabelle einfärben nach',
	categories: 'Kategorien',
	category: {
		'alkali-metal': 'Alkalimetalle',
		'alkaline-earth-metal': 'Erdalkalimetalle',
		'transition-metal': 'Übergangsmetalle',
		'post-transition-metal': 'Post-Übergangsmetalle',
		metalloid: 'Halbmetalle',
		nonmetal: 'Nichtmetalle',
		halogen: 'Halogene',
		'noble-gas': 'Edelgase',
		lanthanide: 'Lanthanoide',
		actinide: 'Actinoide'
	},
	property: {
		mass: 'Atommasse',
		electronegativity: 'Elektronegativität',
		atomicRadius: 'Kovalenter Radius',
		density: 'Dichte',
		meltingPoint: 'Schmelzpunkt',
		ionizationEnergy: 'Ionisierungsenergie'
	},
	unit: {
		mass: 'u',
		electronegativity: 'Pauling',
		atomicRadius: 'pm',
		density: 'g/cm³',
		meltingPoint: '°C',
		ionizationEnergy: 'eV'
	},
	noData: 'keine Daten',
	period: 'Periode',
	group: 'Gruppe',
	block: 'Block',
	state: { solid: 'Fest', liquid: 'Flüssig', gas: 'Gasförmig' },
	predicted: 'vorhergesagt',
	underPressure: 'nur unter Druck',
	sublimes: 'Sublimation',
	anionUnstable: 'kein stabiles negatives Ion',
	atomicMass: 'Atommasse',
	massIsotope: 'Massenzahl des stabilsten Isotops',
	config: 'Elektronenkonfiguration',
	shells: 'Elektronen pro Schale',
	boilingPoint: 'Siedepunkt',
	oxidationStates: 'Oxidationsstufen',
	electronAffinity: 'Elektronenaffinität',
	discovered: 'Entdeckt',
	ancient: 'seit der Antike bekannt',
	discoveredBy: 'Entdeckt von',
	namedAfter: 'Benannt nach',
	close: 'Schließen',
	sources: 'Datenquellen',
	sourcesNote:
		'Atommassen: IUPAC CIAAW, gekürzte Standardwerte; in eckigen Klammern die Massenzahl des stabilsten Isotops. Ionisierungsenergien: NIST. Elektronenaffinitäten: Messwerte (Wikipedia-Tabelle mit Primärquellen). Kovalente Radien: Cordero et al. (2008). Übrige Eigenschaften: PubChem (NIH), abgeglichen mit dem CRC Handbook. Elementnamen: Wikidata.',
	theme: { light: 'Helles Design', dark: 'Dunkles Design', system: 'Wie im System' },
	language: 'Sprache',
	madeBy: 'Erstellt von ',
	explainToggle: 'Was das bedeutet',
	explain: {
		mass: 'Durchschnittliche Masse eines Atoms in atomaren Masseneinheiten (1 u ist 1/12 der Masse eines Kohlenstoff-12-Atoms). Berücksichtigt die natürliche Isotopenmischung des Elements.',
		group:
			'Nummer der senkrechten Spalte, 1 bis 18 nach IUPAC-Zählung. Elemente einer Gruppe haben den gleichen Aufbau der äußeren Schale und daher ähnliche Eigenschaften. In Schulbüchern findet man auch die ältere Zählung in Haupt- und Nebengruppen.',
		period:
			'Nummer der waagerechten Zeile. Entspricht meist der Zahl der Elektronenschalen des Atoms; Ausnahme ist Palladium mit vier Schalen in Periode 5.',
		block:
			'Das Unterniveau (s, p, d oder f), das zuletzt mit Elektronen besetzt wird. Jeder Block bildet einen rechteckigen Bereich der Tabelle.',
		config:
			'Wie die Elektronen auf die Unterniveaus verteilt sind. Die eckige Klammer steht für das vorherige Edelgas, die Hochzahl für die Zahl der Elektronen im Unterniveau.',
		shells: 'Zahl der Elektronen auf jeder Schale, vom Kern nach außen.',
		electronegativity:
			'Wie stark ein Atom in einer chemischen Bindung Elektronen an sich zieht. Auf der Pauling-Skala reicht sie von 0,7 bei Francium bis 3,98 bei Fluor.',
		atomicRadius:
			'Halbe Länge einer kovalenten Einfachbindung zwischen zwei Atomen des Elements. Er gibt die Größe des Atoms in einem Molekül oder Kristall an: 76 pm bei Kohlenstoff, 132 pm bei Eisen.',
		density: 'Masse eines Kubikzentimeters des Stoffes. Bei Gasen bei 0 °C und Normaldruck.',
		meltingPoint:
			'Temperatur, bei der der Feststoff bei Normaldruck flüssig wird. Helium, Kohlenstoff und Arsen schmelzen bei Normaldruck nicht: Helium braucht etwa 25 atm, Kohlenstoff und Arsen gehen direkt in Dampf über.',
		boilingPoint:
			'Temperatur, bei der die Flüssigkeit bei Normaldruck siedet. Bei Kohlenstoff und Arsen die Temperatur, bei der der Feststoff direkt verdampft (Sublimation).',
		ionizationEnergy:
			'Energie, die nötig ist, um das am schwächsten gebundene Elektron vom Atom zu entfernen. Je kleiner sie ist, desto leichter gibt das Element ein Elektron ab, was typisch für Metalle ist.',
		electronAffinity:
			'Energie, die frei wird, wenn ein neutrales Atom ein Elektron aufnimmt. Am größten bei den Halogenen. Edelgase, Stickstoff und einige Metalle bilden kein stabiles negatives Ion.',
		oxidationStates: 'Wichtigste formale Ladungen, die das Atom in seinen Verbindungen annimmt.'
	},
	trend: {
		mass: 'Steigt mit der Ordnungszahl, mit wenigen Ausnahmen: Argon ist schwerer als Kalium, Cobalt schwerer als Nickel, Tellur schwerer als Iod.',
		electronegativity:
			'Steigt innerhalb einer Periode von links nach rechts und sinkt innerhalb einer Gruppe von oben nach unten. Fluor hat den höchsten Wert.',
		atomicRadius:
			'Nimmt innerhalb einer Periode meist von links nach rechts ab und innerhalb einer Gruppe von oben nach unten zu.',
		density:
			'Am dichtesten sind die Metalle in der Mitte der 6. Periode: Osmium und Iridium. Die Skala ist logarithmisch, weil Gase tausendfach leichter sind als Metalle.',
		meltingPoint: 'Am höchsten bei Kohlenstoff und den Übergangsmetallen, am niedrigsten bei den Edelgasen.',
		ionizationEnergy:
			'Steigt innerhalb einer Periode von links nach rechts, mit dem Maximum bei den Edelgasen. Sinkt innerhalb einer Gruppe von oben nach unten.'
	},

	seo: {
		homeTitle: 'Interaktives Periodensystem der Elemente | ChemTable',
		homeDescription:
			'Interaktives Periodensystem aller 118 Elemente: Atommasse, Elektronenkonfiguration, Elektronegativität, Dichte und mehr, mit Erklärungen für Schüler.',
		elementTitle: (name, symbol) => `${name} (${symbol}): Eigenschaften und Atommasse | ChemTable`,
		elementDescription: (f) =>
			`${f.name} (${f.symbol}), Ordnungszahl ${f.z}: ${f.category}` +
			(f.mass ? `, ${f.massIsIsotope ? 'Massenzahl' : 'Atommasse'} ${f.mass}` : '') +
			`. Elektronenkonfiguration, Dichte, Schmelzpunkt, Elektronegativität und mehr.`
	},
	article: {
		kicker: (z) => `Chemisches Element Nr. ${z}`,
		summary: (f) =>
			[
				`${f.name} (${f.symbol}) ist ein chemisches Element mit der Ordnungszahl ${f.z}.`,
				f.group
					? `Es steht in Gruppe ${f.group} und Periode ${f.period} des Periodensystems, im ${f.block}-Block.`
					: `Es steht in Periode ${f.period} des Periodensystems, im ${f.block}-Block.`,
				`Kategorie: ${f.category}.`,
				`Aggregatzustand bei Raumtemperatur: ${f.state.toLowerCase()}${f.statePredicted ? ' (vorhergesagt)' : ''}.`,
				f.mass
					? f.massIsIsotope
						? `Es hat keine Standard-Atommasse; die Massenzahl seines stabilsten Isotops ist ${f.mass}.`
						: `Seine Standard-Atommasse beträgt ${f.mass}.`
					: ''
			]
				.filter(Boolean)
				.join(' '),
		properties: 'Eigenschaften',
		property: 'Eigenschaft',
		value: 'Wert',
		related: 'Benachbarte Elemente',
		sameGroup: (g) => `Gruppe ${g}`,
		samePeriod: (p) => `Periode ${p}`,
		previous: 'Vorheriges Element',
		next: 'Nächstes Element',
		readMore: 'Mehr erfahren',
		wikipedia: 'Wikipedia',
		backToTable: 'Zurück zur Tabelle'
	},
	about: {
		heading: 'Über dieses Periodensystem',
		paragraphs: [
			'Ein interaktives Periodensystem aller 118 chemischen Elemente für Schüler und Studierende. Öffnen Sie ein Element, um Atommasse, Elektronenkonfiguration, Schmelz- und Siedepunkt, Dichte, Elektronegativität, Ionisierungsenergie und Oxidationsstufen zu sehen, jeweils mit einer kurzen Erklärung.',
			'Färben Sie die Tabelle nach Kategorie oder Eigenschaft ein, um die Trends im Periodensystem zu sehen: wie die Elektronegativität zum Fluor hin steigt oder wie die Atome in jeder Gruppe nach unten größer werden.',
			'Die Atommassen stammen von der IUPAC CIAAW, die Ionisierungsenergien vom NIST, die kovalenten Radien von Cordero et al. (2008) und die übrigen Eigenschaften von PubChem (National Institutes of Health der USA), abgeglichen mit dem CRC Handbook. Die Elementnamen in acht Sprachen stammen von Wikidata.'
		]
	},
	data: {
		heading: 'Offene Daten',
		text: 'Der vollständige Datensatz zu allen 118 Elementen steht frei zum Download. Eine Textzusammenfassung für KI-Assistenten steht in llms.txt.'
	},
	print: {
		heading: 'Periodensystem zum Ausdrucken',
		text: 'Ein kostenloses PDF zum Herunterladen und Drucken, im Querformat. Die Schwarz-Weiß-Version spart Tinte: Die Kategorien unterscheiden sich am Muster.',
		color: 'Farbe',
		bw: 'Schwarz-Weiß',
		atomicNumber: 'Ordnungszahl',
		symbol: 'Symbol',
		name: 'Name'
	}
};
