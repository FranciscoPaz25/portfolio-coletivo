import { Link, NavLink } from 'react-router-dom'
import { siteConfig } from '../data/siteConfig.js'
import { teams } from '../data/teamsConfig.js'
import { getCardInfo } from '../utils/teamCard.js'
import styles from './Header.module.css'

function navClass({ isActive }) {
  return isActive ? `${styles.link} ${styles.active}` : styles.link
}

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          <svg viewBox="0 0 32 32" width="32" height="32" fill="currentColor" aria-hidden="true">
            <rect width="14" height="14" rx="7" /><path d="M18 0h14v14H18zM0 18h14v14H0zM18 18h14a14 14 0 0 1-14 14z" />
          </svg>
          {siteConfig.title}
        </Link>
        <nav aria-label="Navegação principal">
          <ul className={styles.nav}>
            <li>
              <NavLink to="/" end className={navClass}>
                Início
              </NavLink>
            </li>
            {teams.map((team) => (
              <li key={team.id}>
                <NavLink to={team.path} className={navClass}>
                  {team.isBase ? 'Equipe Base' : `Equipe ${getCardInfo(team.id, team.info).number}`}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
