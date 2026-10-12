import type { Dict } from '../ui';

export const de: Dict = {
	reviewed: false,
	siteName: 'ChemTable',
	title: 'Periodensystem der chemischen Elemente',
	hint: 'Fahren Sie über ein Element oder wechseln Sie mit Tab in die Tabelle und bewegen Sie sich mit den Pfeiltasten. Klicken Sie auf ein Element, um seine Karte zu öffnen.',
	hintTouch: 'Tippen Sie auf ein Element oder fahren Sie mit dem Finger über die Tabelle',
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
	open: 'Öffnen',
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
	licenses: 'Lizenzen',
	privacy: {
		title: 'Datenschutzerklärung',
		description:
			'Wie ChemTable mit Daten umgeht: keine Konten, keine Statistik, kein Tracking. Was der Browser speichert, was der Hoster sieht und wie Werbung Cookies nutzt.',
		updated: 'Stand:',
		intro: (author) =>
			`ChemTable wird von ${author} betrieben, einem in der Republik Armenien eingetragenen Unternehmen. Diese Seite erklärt, was mit Daten geschieht, wenn Sie die Website nutzen.`,
		sections: {
			collect: {
				heading: 'Was wir erheben',
				paragraphs: [
					'Nichts, was Sie identifiziert. ChemTable hat keine Konten, Formulare oder Kommentare und nutzt weder Statistik- noch Tracking-Dienste.'
				]
			},
			storage: {
				heading: 'Einstellungen im Browser',
				paragraphs: [
					'Wenn Sie ein helles oder dunkles Design wählen, wird die Wahl im lokalen Speicher Ihres Browsers abgelegt, damit die Website sie sich merkt. Sie verlässt Ihr Gerät nie; wenn Sie die Websitedaten im Browser löschen, wird sie entfernt.'
				]
			},
			hosting: {
				heading: 'Hosting',
				paragraphs: [
					'Die Website wird über Cloudflare ausgeliefert. Wie jeder Webserver verarbeitet Cloudflare Ihre IP-Adresse und technische Angaben zu jeder Anfrage, etwa Browser und Seite, um die Seiten auszuliefern und die Website vor Angriffen zu schützen. Wir nutzen diese Angaben nicht, um Besucher zu identifizieren.'
				]
			},
			external: {
				heading: 'Andere Websites',
				paragraphs: [
					'Die Elementseiten verlinken auf Wikipedia, PubChem und Wikidata, für die eigene Datenschutzerklärungen gelten. Schriften werden von dieser Website geladen, nicht von Dritten.'
				]
			},
			children: {
				heading: 'Kinder',
				paragraphs: [
					'ChemTable richtet sich an Schülerinnen, Schüler und Studierende. Wir erheben wissentlich von niemandem personenbezogene Daten, auch nicht von Kindern.'
				]
			},
			ads: {
				heading: 'Werbung',
				paragraphs: [
					'Die Werbung auf ChemTable liefert Google AdSense aus. Google und seine Partner verwenden Cookies und ähnliche Technologien, um Anzeigen auszuliefern, die Wiederholung derselben Anzeige zu begrenzen, Anzeigen zu messen und Betrug zu verhindern.',
					'Da viele Besucher Kinder sind, bitten wir Google, alle Seiten als an Kinder gerichtet zu behandeln. Google zeigt dann nur nicht personalisierte Anzeigen, die nach der gelesenen Seite und nicht nach Ihrem Surfverlauf ausgewählt werden, und kein Remarketing.',
					'Drittanbieter, darunter Google, können mit Cookies Anzeigen auf Grundlage Ihrer früheren Besuche dieser und anderer Websites ausliefern. Auf ChemTable sind solche personalisierten Anzeigen, wie oben beschrieben, abgeschaltet. Zusätzlich können Sie personalisierte Werbung für Ihr Google-Konto in den Werbeeinstellungen deaktivieren und Cookies anderer Anbieter unter aboutads.info oder youronlinechoices.eu ablehnen.',
					'Im Europäischen Wirtschaftsraum, im Vereinigten Königreich und in der Schweiz bittet die Website um Ihre Einwilligung, bevor Werbe-Cookies verwendet werden. Ihre Wahl können Sie jederzeit über den Link zu den Datenschutz- und Cookie-Einstellungen auf der Seite ändern.'
				]
			},
			rights: {
				heading: 'Ihre Rechte',
				paragraphs: [
					'Je nach Wohnort geben Ihnen Gesetze wie die Datenschutz-Grundverordnung (DSGVO) der EU und das Gesetz der Republik Armenien über den Schutz personenbezogener Daten das Recht, zu erfahren, welche Daten über Sie gespeichert sind, sie berichtigen oder löschen zu lassen und ihrer Nutzung zu widersprechen. ChemTable selbst speichert keine personenbezogenen Daten von Besuchern.'
				]
			},
			changes: {
				heading: 'Änderungen',
				paragraphs: [
					'Wenn sich diese Erklärung ändert, ändert sich auch das Datum oben auf der Seite.'
				]
			}
		},
		adsOff:
			'ChemTable zeigt derzeit keine Werbung. Falls wir Werbung einführen, beschreibt dieser Abschnitt ihre Cookies, bevor die erste Anzeige erscheint.',
		contact: 'Fragen zu dieser Erklärung:',
		back: 'Zurück zum Periodensystem'
	},
	notFound: {
		title: 'Seite nicht gefunden',
		text: 'Unter dieser Adresse gibt es keine Seite. Vielleicht enthält der Link einen Tippfehler, oder die Seite ist umgezogen.',
		suggest: 'Vielleicht suchen Sie:',
		back: 'Zum Periodensystem',
		beyond: (name, z) =>
			`Ein Element 404 gibt es auch nicht: Das schwerste bekannte Element ist ${name}, Ordnungszahl ${z}.`
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
