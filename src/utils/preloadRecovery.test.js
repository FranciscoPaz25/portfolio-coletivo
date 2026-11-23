import { test } from 'node:test'
import assert from 'node:assert/strict'
import { handlePreloadError } from './preloadRecovery.js'

function fakeStorage(initial = {}) {
  const data = { ...initial }
  return { getItem: (k) => (k in data ? data[k] : null), setItem: (k, v) => (data[k] = String(v)), data }
}

function fakeEvent() {
  return { prevented: false, preventDefault() { this.prevented = true } }
}

test('após um redeploy, recarrega a página uma vez', () => {
  const storage = fakeStorage()
  const event = fakeEvent()
  let reloads = 0
  const reloaded = handlePreloadError(event, { storage, reload: () => reloads++, now: 1_000_000 })
  assert.equal(reloaded, true)
  assert.equal(reloads, 1)
  assert.equal(event.prevented, true)
})

test('não entra em loop: erro de novo logo após recarregar não recarrega', () => {
  const storage = fakeStorage()
  let reloads = 0
  handlePreloadError(fakeEvent(), { storage, reload: () => reloads++, now: 1_000_000 })
  const event = fakeEvent()
  const reloaded = handlePreloadError(event, { storage, reload: () => reloads++, now: 1_005_000 })
  assert.equal(reloaded, false)
  assert.equal(reloads, 1)
  assert.equal(event.prevented, false)
})

test('um novo redeploy bem depois volta a recarregar', () => {
  const storage = fakeStorage()
  let reloads = 0
  handlePreloadError(fakeEvent(), { storage, reload: () => reloads++, now: 1_000_000 })
  assert.equal(handlePreloadError(fakeEvent(), { storage, reload: () => reloads++, now: 1_060_000 }), true)
  assert.equal(reloads, 2)
})

test('storage indisponível (aba privada): não recarrega sozinho e não quebra', () => {
  const storage = { getItem() { throw new Error('blocked') }, setItem() { throw new Error('blocked') } }
  let reloads = 0
  assert.equal(handlePreloadError(fakeEvent(), { storage, reload: () => reloads++, now: 1 }), false)
  assert.equal(reloads, 0)
})
