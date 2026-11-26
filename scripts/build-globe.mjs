// Generates src/globe-dots.json: an evenly spaced grid of dots over the world's land, each tagged
// with the cuisine country it falls in (or -1). Run after changing the countries:
//   node scripts/build-globe.mjs
// Map data: Natural Earth via the world-atlas package (public domain). Dev-only dependencies.
import { readFileSync, writeFileSync } from 'node:fs'
import { geoContains } from 'd3-geo'
import { feature } from 'topojson-client'

const root = new URL('..', import.meta.url).pathname
const world = JSON.parse(readFileSync(`${root}node_modules/world-atlas/countries-110m.json`, 'utf8'))
const land = feature(world, world.objects.land)
const countries = feature(world, world.objects.countries).features

// Must match the order of site.eatingOut.cuisines in src/content.ts.
const NAMES = ['Ireland', 'Spain', 'Nigeria', 'Somalia', 'China', 'Mongolia', 'Japan']
const shapes = NAMES.map((n) => {
  const f = countries.filter((c) => c.properties.name === n || (n === 'Somalia' && c.properties.name === 'Somaliland'))
  if (!f.length) throw new Error(`country not found: ${n}`)
  return f
})

const STEP = 2.1 // degrees between dots along a latitude band (scaled so spacing stays even)
const dots = []
for (let lat = -84; lat <= 84; lat += STEP) {
  const n = Math.max(1, Math.round((360 * Math.cos((lat * Math.PI) / 180)) / STEP))
  for (let i = 0; i < n; i++) {
    const lon = -180 + (i + 0.5) * (360 / n)
    const p = [lon, lat]
    if (!geoContains(land, p)) continue
    const c = shapes.findIndex((fs) => fs.some((f) => geoContains(f, p)))
    dots.push([Math.round(lon * 10) / 10, Math.round(lat * 10) / 10, c])
  }
}
// Small countries (Ireland, Japan, Spain) can fall between grid points: fill them in on a finer
// grid so each one reads as a clear patch of cobalt.
const MIN = 14
shapes.forEach((fs, c) => {
  if (dots.filter((d) => d[2] === c).length >= MIN) return
  const xs = fs.flatMap((f) => f.geometry.coordinates.flat(3).filter((_, i) => i % 2 === 0))
  const ys = fs.flatMap((f) => f.geometry.coordinates.flat(3).filter((_, i) => i % 2 === 1))
  const fine = 0.9
  for (let lat = Math.min(...ys); lat <= Math.max(...ys); lat += fine)
    for (let lon = Math.min(...xs); lon <= Math.max(...xs); lon += fine / Math.cos((lat * Math.PI) / 180)) {
      const p = [lon, lat]
      if (fs.some((f) => geoContains(f, p))) dots.push([Math.round(lon * 10) / 10, Math.round(lat * 10) / 10, c])
    }
})
writeFileSync(`${root}src/globe-dots.json`, JSON.stringify(dots))
const per = NAMES.map((n, c) => `${n} ${dots.filter((d) => d[2] === c).length}`).join(', ')
console.log(`${dots.length} land dots (${per})`)
