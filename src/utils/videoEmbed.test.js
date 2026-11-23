import { test } from 'node:test'
import assert from 'node:assert/strict'
import { toEmbedUrl } from './videoEmbed.js'

const YT = 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'

test('youtube watch', () => assert.equal(toEmbedUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=30'), YT))
test('youtu.be com ?si', () => assert.equal(toEmbedUrl('https://youtu.be/dQw4w9WgXcQ?si=abc'), YT))
test('shorts', () => assert.equal(toEmbedUrl('https://youtube.com/shorts/dQw4w9WgXcQ'), YT))
test('embed já pronto', () => assert.equal(toEmbedUrl('https://www.youtube.com/embed/dQw4w9WgXcQ'), YT))
test('vimeo', () => assert.equal(toEmbedUrl('https://vimeo.com/76979871'), 'https://player.vimeo.com/video/76979871'))
test('vimeo player', () =>
  assert.equal(toEmbedUrl('https://player.vimeo.com/video/76979871'), 'https://player.vimeo.com/video/76979871'))
test('arquivo mp4 → null', () => assert.equal(toEmbedUrl('https://exemplo.com/video.mp4'), null))
test('inválidos → null', () => {
  for (const v of ['', 'não é url', undefined, null, 42]) assert.equal(toEmbedUrl(v), null)
})
