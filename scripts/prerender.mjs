// Bakes the rendered page into dist/index.html so content is readable without JS
// and visible on first paint; the client bundle then hydrates it.
import { readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const { render } = await import(`${root}dist-ssr/entry-server.js`)

const file = `${root}dist/index.html`
const html = await readFile(file, 'utf8')
if (!html.includes('<!--app-->')) throw new Error('prerender: <!--app--> placeholder missing in dist/index.html')

await writeFile(file, html.replace('<!--app-->', render()))
await rm(`${root}dist-ssr`, { recursive: true, force: true })
console.log('prerendered dist/index.html')
