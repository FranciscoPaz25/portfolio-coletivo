import { toEmbedUrl } from '../utils/videoEmbed.js'
import styles from './VideoEmbed.module.css'

/** Mostra um vídeo do YouTube/Vimeo a partir do link normal (watch, youtu.be, shorts, vimeo). */
export default function VideoEmbed({ url, title = 'Vídeo' }) {
  const src = toEmbedUrl(url)

  if (src) {
    return (
      <div className={styles.frame}>
        <iframe
          src={src}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    )
  }

  if (typeof url === 'string' && url.trim()) {
    return (
      <p className={styles.fallback}>
        <a href={url.trim()} target="_blank" rel="noopener noreferrer">
          Assistir ao vídeo
        </a>
      </p>
    )
  }

  return <p className={styles.empty}>Vídeo ainda não adicionado.</p>
}
