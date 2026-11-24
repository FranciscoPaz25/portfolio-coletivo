import TeamCard from '../components/TeamCard.jsx'
import { teams } from '../data/teamsConfig.js'
import styles from './Home.module.css'

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.intro}>
          <h1 className={styles.title}><small>Desafio Integrador</small>Portfólio Coletivo<br />da Turma</h1>
        <p className={styles.lead}>
          Cinco equipes montaram este site na mesma aula, cada uma na sua branch, e a gente juntou tudo no final.
          Cada página tem o vídeo da equipe e a referência por trás dele, a explicação do projeto e a ficha de cada
          integrante.
        </p>
        <p className={styles.stack}><span>React + Vite</span><span>GitHub</span></p>
          <p className={styles.cta}>Usar IA era permitido, desde que a equipe soubesse explicar o código. Na próxima aula, cada equipe apresenta a própria página neste site, em 5 a 7 minutos.</p>
        </div>
        <svg className={styles.art} viewBox="0 0 240 240" aria-hidden="true">
          <path fill="#ad9aef" d="M0 120V58a58 58 0 0 1 116 0v62z" />
          <g fill="none" stroke="#352254" strokeWidth="4">
            {[18, 32, 46].map(r => <path key={r} d={`M${58-r} 120V60a${r} ${r} 0 0 1 ${2*r} 0v60`} />)}
          </g>
          <path fill="#ff986b" d="M122 0h118v118h-30V89h-29V59h-30V30h-29z" />
          <path fill="#edb4de" d="M0 240v-40l78-78h40v40l-78 78zM0 122h52L0 174zm118 66v52H66z"/>
          <g fill="#f3cc69">
            {[0, 45, 90, 135].map(angle => <rect key={angle} x="164" y="121" width="34" height="118" rx="17" transform={`rotate(${angle} 181 180)`} />)}
          </g>
          <circle cx="181" cy="180" r="14" fill="#382551"/>
        </svg>
      </section>

      <section className={styles.teams} aria-labelledby="equipes">
        <h2 id="equipes" className={styles.teamsTitle}>
          As cinco equipes
        </h2>
        <div className={styles.grid}>
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </section>
    </>
  )
}
