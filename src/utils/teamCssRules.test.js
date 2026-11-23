import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { findGlobalSelectors } from './teamCssRules.js'

test('seletores com classe são permitidos', () => {
  assert.deepEqual(findGlobalSelectors('.page h2 { color: red } .page:hover, .card > p { margin: 0 }'), [])
})
test('tags soltas, body, :root e * vazam para o site todo', () => {
  assert.deepEqual(findGlobalSelectors('body { background: #000 }'), ['body'])
  assert.deepEqual(findGlobalSelectors('h2, .page h3 { color: red }'), ['h2'])
  assert.deepEqual(findGlobalSelectors(':root { --accent: lime }'), [':root'])
  assert.deepEqual(findGlobalSelectors('* { box-sizing: border-box }'), ['*'])
  assert.deepEqual(findGlobalSelectors('#topo { color: red } [data-x] { color: red }'), ['#topo', '[data-x]'])
})
test(':global é proibido', () => {
  assert.deepEqual(findGlobalSelectors(':global(.x) { color: red } .page :global(body) { color: red }'), [
    ':global(.x)',
    '.page :global(body)',
  ])
})
test('dentro de @media os seletores também são verificados', () => {
  assert.deepEqual(findGlobalSelectors('@media (max-width: 40rem) { .page { padding: 0 } h1 { font-size: 2rem } }'), ['h1'])
})
test('@keyframes, @font-face e regras aninhadas não são falso positivo', () => {
  const css = `
    @keyframes pulse { from { opacity: 0 } 50% { opacity: .5 } to { opacity: 1 } }
    @font-face { font-family: Minha; src: url(data:font/woff2;base64,AAAA) }
    .page { color: red; & h2 { color: blue } h3 { color: green } }
  `
  assert.deepEqual(findGlobalSelectors(css), [])
})
test('comentários são ignorados', () => {
  assert.deepEqual(findGlobalSelectors('/* body { color: red } */ .page { color: red }'), [])
})
test('@import de outro CSS é proibido', () => {
  assert.deepEqual(findGlobalSelectors('@import url("./global.css"); .page { color: red }'), ['@import'])
})

// Guarda de CI: o CSS de cada equipe não pode afetar o resto do site.
test('CSS das equipes: só .module.css e só seletores com classe', () => {
  const teamsDir = new URL('../teams/', import.meta.url).pathname
  const problems = []
  for (const team of readdirSync(teamsDir)) {
    const walk = (dir) => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const path = join(dir, entry.name)
        if (entry.isDirectory()) walk(path)
        else if (/\.(css|scss|sass|less)$/.test(entry.name)) {
          const rel = path.slice(teamsDir.length)
          if (!entry.name.endsWith('.module.css')) problems.push(`${rel}: use um arquivo .module.css`)
          else for (const sel of findGlobalSelectors(readFileSync(path, 'utf8')))
            problems.push(`${rel}: "${sel}" afeta o site inteiro — comece o seletor com uma classe (ex.: .page ${sel})`)
        }
      }
    }
    walk(join(teamsDir, team))
  }
  assert.deepEqual(problems, [])
})
