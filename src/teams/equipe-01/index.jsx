import VideoEmbed from '../../components/VideoEmbed.jsx'
import MemberCard from '../../components/MemberCard.jsx'
import info from './info.js'
import styles from './Equipe.module.css'

// =====================================================================
// Equipe 01 — edite SOMENTE os arquivos desta pasta (src/teams/equipe-01).
// Preencha info.js e as constantes abaixo; o layout já está pronto.
// Quer uma 2ª página? Crie outro componente aqui e use <Routes> do
// react-router-dom dentro deste arquivo (a rota /equipe-01/* já é sua).
// =====================================================================

/** 1. Vídeo com referência */
const VIDEO = {
  // Link do YouTube ou Vimeo. Ex.: https://www.youtube.com/watch?v=XXXXXXXXXXX
  url: '',
  // Fonte, inspiração, tema abordado ou prompt/roteiro usado para criar o vídeo
  reference: 'Descreva a referência do vídeo: fonte, inspiração, tema ou prompt/roteiro utilizado.',
}

/** 2. Descrição da página e do projeto */
const PROJECT = {
  theme: 'Qual é o tema desta página?',
  purpose: 'Qual é o propósito desta entrega?',
  aiUsage: 'Como a IA foi usada no desenvolvimento (código, layout, textos, vídeo...)?',
}

/** 3. Apresentação da equipe (o nome da equipe fica em info.js) */
const TEAM = {
  profile: 'Resumo sobre o perfil e a dinâmica da equipe.',
}

/** 4. Ficha técnica — um objeto por integrante */
const MEMBERS = [
  {
    name: 'Nome completo',
    role: 'Papel na atividade (ex.: Layout, Roteiro/Vídeo, Integração Git, Revisão IA)',
    skills: ['Habilidade ou ferramenta', 'Outra habilidade'],
    bio: 'Mini-bio de uma ou duas frases.',
    // Opcional. Ex.: [{ label: 'GitHub', url: 'https://github.com/seu-usuario' }]
    links: [],
  },
]

export default function Equipe01() {
  const title = info.name?.trim() || 'Equipe 01'

  return (
    <article className={styles.page}>
      <header className={styles.header}>
        <p className={styles.kicker}>Equipe 01</p>
        <h1 className={styles.title}>{title}</h1>
        {info.theme?.trim() && <p className={styles.theme}>{info.theme}</p>}
      </header>

      <section className={styles.section} aria-labelledby="video">
        <h2 id="video">Vídeo e referência</h2>
        <VideoEmbed url={VIDEO.url} title={`Vídeo — ${title}`} />
        <p className={styles.reference}>
          <strong>Referência:</strong> {VIDEO.reference}
        </p>
      </section>

      <section className={styles.section} aria-labelledby="sobre">
        <h2 id="sobre">Sobre o projeto</h2>
        <dl className={styles.details}>
          <dt>Tema</dt>
          <dd>{PROJECT.theme}</dd>
          <dt>Propósito</dt>
          <dd>{PROJECT.purpose}</dd>
          <dt>Uso de IA</dt>
          <dd>{PROJECT.aiUsage}</dd>
        </dl>
      </section>

      <section className={styles.section} aria-labelledby="equipe">
        <h2 id="equipe">A equipe</h2>
        <p>{TEAM.profile}</p>
      </section>

      <section className={styles.section} aria-labelledby="ficha">
        <h2 id="ficha">Ficha técnica</h2>
        <div className={styles.members}>
          {MEMBERS.map((member, i) => (
            <MemberCard key={`${member.name}-${i}`} {...member} />
          ))}
        </div>
      </section>
    </article>
  )
}
