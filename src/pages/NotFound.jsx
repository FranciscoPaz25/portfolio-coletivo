import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <section className={styles.notFound}>
      <span className={styles.code}>404</span>
      <h1>Página não encontrada</h1>
      <p>O endereço acessado não existe neste portfólio.</p>
      <p>
        <Link to="/">Voltar para o início</Link>
      </p>
    </section>
  )
}
