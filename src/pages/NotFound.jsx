import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <section className={styles.notFound}>
      <span className={styles.code}>404</span>
      <h1>Cadê a página?</h1>
      <p>Esse endereço não leva a nenhuma página da turma.</p>
      <p>
        <Link to="/">Voltar para as equipes</Link>
      </p>
    </section>
  )
}
