import { siteConfig } from '../data/siteConfig.js'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p>
          {siteConfig.title} · Desafio Integrador
        </p>
        <p>
          <a href={siteConfig.repoUrl} target="_blank" rel="noopener noreferrer">
            Código no GitHub
          </a>
        </p>
      </div>
    </footer>
  )
}
