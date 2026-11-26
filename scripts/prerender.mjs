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
// robots.txt + sitemap.xml, using the same site URL as the meta tags.
const env = await readFile(`${root}.env`, 'utf8').catch(() => '')
const site = (process.env.VITE_SITE_URL || env.match(/^VITE_SITE_URL=(.*)$/m)?.[1] || '').trim().replace(/\/$/, '')
const today = new Date().toISOString().slice(0, 10)
await writeFile(`${root}dist/robots.txt`, `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`)
await writeFile(
  `${root}dist/sitemap.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${site}/</loc><lastmod>${today}</lastmod><priority>1.0</priority></url>
  <url><loc>${site}/docs/vinol-tauro-msc-dissertation.pdf</loc><lastmod>${today}</lastmod><priority>0.6</priority></url>
</urlset>
`,
)

await rm(`${root}dist-ssr`, { recursive: true, force: true })
console.log('prerendered dist/index.html')
