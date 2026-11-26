// Bakes the rendered page into dist/index.html so content is readable without JS
// and visible on first paint; the client bundle then hydrates it.
import { readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const { render } = await import(`${root}dist-ssr/entry-server.js`)

const file = `${root}dist/index.html`
const html = await readFile(file, 'utf8')
if (!html.includes('<!--app-->')) throw new Error('prerender: <!--app--> placeholder missing in dist/index.html')

// Preload the two above-the-fold fonts (hashed names change every build, so find them here).
const assets = await readdir(`${root}dist/assets`)
const preloads = [/^bricolage-grotesque-latin-opsz-normal-.*\.woff2$/, /^hanken-grotesk-latin-400-normal-.*\.woff2$/]
  .map((re) => assets.find((f) => re.test(f)))
  .filter(Boolean)
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`)
  .join('\n    ')

await writeFile(file, html.replace('<!--app-->', render()).replace('</title>', `</title>\n    ${preloads}`))
await rm(`${root}dist-ssr`, { recursive: true, force: true })
console.log('prerendered dist/index.html')
