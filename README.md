# ChemTable

An interactive periodic table of the elements in the style of a modernist science poster, for school and university students. Eight languages: English, Russian, French, German, Italian, Spanish, Chinese (simplified) and Portuguese (Brazil).

Made by [Zarinda](https://zarinda.com).

- Every element has its own pre-rendered page in each language (`/iron`, `/ru/iron`) with a full article for search engines.
- Category filter and heat maps (atomic mass, electronegativity, radius, density, melting point, ionization energy).
- Free printable PDF table: A4 and US Letter, colour and ink-saving black-and-white.
- Open data: `/data/elements.json`, `/data/elements.csv`, `/llms.txt`.

## Development

Developed on Node.js 24.

```sh
npm install
cp .env.example .env   # set PUBLIC_SITE_URL to the deployed origin
npm run dev
npm run check          # type check
npm run build          # static site in build/
```

Generated data and assets only need regenerating when their inputs change:

| Command | Output | When |
|---|---|---|
| `npm run data` | `src/lib/data/elements.json` from PubChem, IUPAC CIAAW, NIST, Wikidata and the hand-checked `scripts/corrections.ts` | data refresh |
| `npm run fonts` | Noto Sans SC subset in `static/fonts/` (needs internet) | after editing Chinese text |
| `npm run og` | Open Graph images in `static/og/` (missing ones; `-- --force` for all, ~15 min) | after changing the domain, palette or texts |
| `npm run pdf` | 32 printable PDFs in `static/print/` (needs Chrome, Edge or Chromium; set `CHROME_PATH` if not found) | after changing the domain, palette or data |
| `npm run favicon` | icons in `static/` | after changing the icon |

Product, data and SEO decisions are in [docs/SPEC.md](docs/SPEC.md), design in [DESIGN.md](DESIGN.md), working notes for contributors and AI assistants in [CLAUDE.md](CLAUDE.md).

## Translations

Only English and Russian have been checked by native speakers. The other languages (`reviewed: false` in [src/lib/i18n/locales/](src/lib/i18n/locales/)) were translated without one: corrections from native speakers are very welcome as issues or pull requests.

## Licences

- **Code:** [MIT](LICENSE), © 2026 Zarinda.
- **Data** (`elements.json`, `elements.csv` and the element texts): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), with a link to ChemTable. Built from PubChem (public domain), IUPAC CIAAW and Wikidata (CC0).
- **Name and icon:** the ChemTable name and the “Ct” icon are not covered by the MIT licence. Please use your own name and icon for forks you publish.
- **Fonts** in `static/fonts/` keep their own licences (SIL Open Font License).
