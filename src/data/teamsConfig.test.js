import { test } from 'node:test'
import assert from 'node:assert/strict'
import { teams } from './teamsConfig.js'

test('5 equipes, ordem e rotas', () => {
  assert.deepEqual(
    teams.map((t) => t.id),
    ['equipe-01', 'equipe-02', 'equipe-03', 'equipe-04', 'equipe-05'],
  )
  for (const t of teams) assert.equal(t.path, `/${t.id}`)
  assert.deepEqual(teams.filter((t) => t.isBase), [])
  for (const t of teams) assert.equal(typeof t.info, 'object')
})
