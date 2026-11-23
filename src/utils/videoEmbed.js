const YOUTUBE_HOSTS = ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtube-nocookie.com', 'www.youtube-nocookie.com']
const ID = /^[\w-]+$/

function youtubeId(url) {
  if (url.hostname === 'youtu.be') return url.pathname.split('/')[1]
  if (!YOUTUBE_HOSTS.includes(url.hostname)) return null
  if (url.pathname === '/watch') return url.searchParams.get('v')
  const [, kind, id] = url.pathname.split('/')
  return kind === 'shorts' || kind === 'embed' ? id : null
}

function vimeoId(url) {
  const parts = url.pathname.split('/').filter(Boolean)
  if (url.hostname === 'vimeo.com' || url.hostname === 'www.vimeo.com') return parts[0]
  if (url.hostname === 'player.vimeo.com' && parts[0] === 'video') return parts[1]
  return null
}

/**
 * Converte um link do YouTube ou Vimeo no endereço de embed.
 * Retorna null para qualquer outra coisa (nunca lança erro).
 */
export function toEmbedUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return null
  let url
  try {
    url = new URL(value.trim())
  } catch {
    return null
  }

  const yt = youtubeId(url)
  if (yt && ID.test(yt)) return `https://www.youtube-nocookie.com/embed/${yt}`

  const vimeo = vimeoId(url)
  if (vimeo && /^\d+$/.test(vimeo)) return `https://player.vimeo.com/video/${vimeo}`

  return null
}
