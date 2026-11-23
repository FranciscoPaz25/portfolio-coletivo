import { Link } from 'react-router-dom'
import { getCardInfo } from '../utils/teamCard.js'
import styles from './TeamCard.module.css'

export default function TeamCard({ team }) {
  const card = getCardInfo(team.id, team.info)
  const title = team.isBase && card.inProgress ? 'Equipe Base' : card.name

  return (
    <article className={team.isBase ? `${styles.card} ${styles.base}` : styles.card}>
      <div className={styles.label}>
        <span className={styles.folder} aria-label={`Equipe ${card.number}`}>
          <svg viewBox="0 0 50 38" aria-hidden="true"><path fill="currentColor" d="M1 6a5 5 0 0 1 5-5h13l5 6h20a5 5 0 0 1 5 5v20a5 5 0 0 1-5 5H6a5 5 0 0 1-5-5z" /></svg>
          <b aria-hidden="true">{card.number}</b>
        </span>
        {card.inProgress && <span className={styles.badge}>Em construção</span>}
      </div>
      <h3 className={styles.name}>{title}</h3>
      <p className={styles.theme}>{card.theme}</p>
      <p className={styles.summary}>{card.summary}</p>
      <Link to={team.path} className={styles.cta} aria-label={`Ver página da ${team.isBase ? 'Equipe Base' : `Equipe ${card.number}`}`}>
        Ver página <span aria-hidden="true">→</span>
      </Link>
    </article>
  )
}
