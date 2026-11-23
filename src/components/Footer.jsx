import { siteConfig } from '../data/siteConfig.js'
import styles from './Footer.module.css'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p>
          {siteConfig.title} · Desafio Integrador · {YEAR}
        </p>
        <p>
          <a href={siteConfig.repoUrl} target="_blank" rel="noopener noreferrer">
            Repositório no GitHub
          </a>
        </p>
      </div>
    </footer>
  )
}
