import { test } from 'node:test'
import assert from 'node:assert/strict'
import { getCardInfo } from './teamCard.js'

test('vazio → em construção', () =>
  assert.deepEqual(getCardInfo('equipe-03', { name: '', theme: '', summary: '' }), {
    number: '03',
    name: 'Equipe 03',
    theme: 'Tema a definir',
    summary: 'A equipe ainda não publicou a página.',
    inProgress: true,
  }))
test('preenchido', () =>
  assert.deepEqual(getCardInfo('equipe-03', { name: ' Os Devs ', theme: 'IA na educação', summary: 'Resumo' }), {
    number: '03',
    name: 'Os Devs',
    theme: 'IA na educação',
    summary: 'Resumo',
    inProgress: false,
  }))
test('undefined não quebra', () => assert.equal(getCardInfo('equipe-03', undefined).inProgress, true))
test('tipos errados/espaços', () => assert.equal(getCardInfo('equipe-03', { name: 42, theme: '  ' }).inProgress, true))
