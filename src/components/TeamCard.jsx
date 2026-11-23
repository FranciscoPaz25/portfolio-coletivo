import { Link } from 'react-router-dom'
import { getCardInfo } from '../utils/teamCard.js'
import styles from './TeamCard.module.css'

export default function TeamCard({ team }) {
  const card = getCardInfo(team.id, team.info)
  const label = team.isBase ? 'Equipe Base' : `Equipe ${card.number}`

  return (
    <article className={team.isBase ? `${styles.card} ${styles.base}` : styles.card}>
      <p className={styles.label}>
        {label}
        {card.inProgress && <span className={styles.badge}>Em construção</span>}
      </p>
      <h3 className={styles.name}>{card.name}</h3>
      <p className={styles.theme}>{card.theme}</p>
      <p className={styles.summary}>{card.summary}</p>
      <Link to={team.path} className={styles.cta}>
        Ver página <span aria-hidden="true">→</span>
      </Link>
    </article>
  )
}
