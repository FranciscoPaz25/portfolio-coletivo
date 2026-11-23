import TeamCard from '../components/TeamCard.jsx'
import { teams } from '../data/teamsConfig.js'
import styles from './Home.module.css'

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.title}>Desafio Integrador — Portfólio Coletivo da Turma</h1>
        <p className={styles.lead}>
          Um portfólio web construído, integrado e publicado em uma única aula. Cada equipe criou sua página com
          vídeo, descrição do projeto, apresentação do grupo e ficha técnica dos integrantes.
        </p>
        <p className={styles.stack}>React + Vite · GitHub · Dokploy</p>
        <p className={styles.cta}>Escolha uma equipe abaixo ou use o menu para navegar.</p>
      </section>

      <section className={styles.teams} aria-labelledby="equipes">
        <h2 id="equipes" className={styles.teamsTitle}>
          Equipes
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
