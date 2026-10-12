/**
 * Renders the site icon: a paper "Ct" cell on the mustard ground, text as paths so
 * it doesn't depend on installed fonts. Writes static/favicon.svg, favicon.ico and
 * apple-touch-icon.png. Static files, not an inlined data: URI, so Google Search
 * can fetch the icon for its results.
 *
 * Run: npm run favicon
 */
import { readFileSync, writeFileSync } from 'node:fs';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const SIZE = 64;
const oswald = readFileSync(
	new URL('../node_modules/@fontsource/oswald/files/oswald-latin-600-normal.woff', import.meta.url)
);

const svg = await satori(
	{
		type: 'div',
		props: {
			style: {
				display: 'flex',
				boxSizing: 'border-box',
				width: SIZE,
				height: SIZE,
				padding: 5,
				background: '#e3a83a'
			},
			children: {
				type: 'div',
				props: {
					style: {
						display: 'flex',
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
						background: '#e6e3da',
						color: '#000',
						fontFamily: 'Oswald',
						fontWeight: 600,
						fontSize: 40,
						letterSpacing: -1,
						paddingBottom: 3
					},
					children: 'Ct'
				}
			}
		}
	} as unknown as Parameters<typeof satori>[0],
	{ width: SIZE, height: SIZE, fonts: [{ name: 'Oswald', data: oswald, weight: 600, style: 'normal' }] }
);

const out = (name: string) => new URL(`../static/${name}`, import.meta.url);
const png = (size: number) => new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng();

/** A one-image .ico holding a PNG, as browsers and Google's favicon crawler accept. */
function ico(image: Uint8Array, size: number) {
	const header = Buffer.alloc(22);
	header.writeUInt16LE(1, 2); // type: icon
	header.writeUInt16LE(1, 4); // one image
	header.writeUInt8(size, 6);
	header.writeUInt8(size, 7);
	header.writeUInt16LE(1, 10); // colour planes
	header.writeUInt16LE(32, 12); // bits per pixel
	header.writeUInt32LE(image.length, 14);
	header.writeUInt32LE(22, 18); // image data offset
	return Buffer.concat([header, image]);
}

writeFileSync(out('favicon.svg'), svg);
// Google Search wants a square icon whose size is a multiple of 48 px.
writeFileSync(out('favicon.ico'), ico(png(48), 48));
writeFileSync(out('apple-touch-icon.png'), png(180));
console.log('Wrote static/favicon.svg, favicon.ico (48 px), apple-touch-icon.png (180 px).');
