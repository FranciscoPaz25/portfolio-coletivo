import { useEffect } from 'react'
import VideoEmbed from '../../components/VideoEmbed.jsx'
import info from './info.js'
import styles from './Equipe.module.css'
import matheusPhoto from './photos/matheus.jpg'
import carlosPhoto from './photos/carlos.jpg'
import lucasPhoto from './photos/lucas.jpg'
import laraPhoto from './photos/lara.jpeg'
import manuelaPhoto from './photos/manuela.jpg'

// =====================================================================
// Equipe 05 — edite SOMENTE os arquivos desta pasta (src/teams/equipe-05).
// =====================================================================

const APP_URL = 'https://unicolab.thebylito.dev/'

/** 1. Vídeo com referência */
const VIDEO = {
  url: 'https://youtu.be/OAmEJaLQxsc',
  reference:
    'Vídeo de apresentação do UniColab, gravado pela equipe. Apresenta a plataforma colaborativa de estudos para o ENADE, com simulados cronometrados e banco de questões em que cada alternativa traz uma justificativa.',
}

/** 2. Descrição da página e do projeto */
const PROJECT = {
  theme:
    'Plataforma colaborativa de estudos para o ENADE, feita para os concluintes da UNIFOR.',
  purpose: [
    'O UniColab é uma plataforma colaborativa que ajuda estudantes a se prepararem para o ENADE.',
    'Ele reúne simulados cronometrados e um banco de questões para praticar os conteúdos da prova.',
    'Um painel de progresso mostra o desempenho, os acertos e a evolução em cada área.',
    'O fórum permite tirar dúvidas e estudar em conjunto com outros alunos.',
    'A área do professor completam o apoio ao estudo.',
  ],
}

const STACK = [
  {
    label: 'Site',
    text: 'React 19 e TypeScript, montados com Vite 6. A interface usa Tailwind CSS 4. O cliente HTTP nasce do OpenAPI.',
  },
  {
    label: 'API',
    text: 'ASP.NET Core 8 em C#, com Entity Framework Core e Pomelo. A sessão é um JWT assinado em HMAC-SHA256 e a senha fica em BCrypt. O Swagger publica o contrato REST.',
  },
  {
    label: 'Banco',
    text: 'MySQL 8.4 InnoDB, em utf8mb4, com chaves estrangeiras, transações e o índice de filtro das questões. O volume do Compose persiste os dados.',
  },
  {
    label: 'Execução',
    text: 'Docker Compose com os serviços mysql, api e web.',
  },
]

/** 4. Ficha técnica — um objeto por integrante */
const MEMBERS = [
  {
    name: 'José Matheus Lima Moura Barroso',
    github: 'https://github.com/jmatheusunifor2025',
    role: 'Banco de dados, nuvem e AWS',
    skills: ['MySQL', 'Docker Compose', 'AWS'],
    bio: 'Modelou o MySQL 8.4 InnoDB e subiu a stack em Docker Compose e AWS, com os serviços mysql, api e web.',
    photo: matheusPhoto,
    photoPosition: 'center 16%',
  },
  {
    name: 'Carlos Levi Costa',
    github: 'https://github.com/carloslevi00-lang',
    role: 'Requisitos',
    skills: ['IEEE 830', 'Casos de uso', 'Personas', 'Backlog DEEP'],
    bio: 'Elaborou o IEEE 830 (requisitos funcionais e não funcionais, MoSCoW), os casos de uso, as personas e o backlog DEEP do UniColab.',
    photo: carlosPhoto,
    photoPosition: 'center 28%',
  },
  {
    name: 'Lucas dos Santos Bandeira',
    github: 'https://github.com/LucasBandeiraa',
    role: 'Back-end e API',
    skills: ['C#', 'ASP.NET Core', 'JWT', 'Swagger'],
    bio: 'Desenvolveu a API em C# e ASP.NET Core 8 (Controller/Service/Repository, Entity Framework Core), com JWT, BCrypt e endpoints de autenticação, questões e simulados documentados no Swagger/OpenAPI.',
    photo: lucasPhoto,
    photoPosition: 'center 18%',
  },
  {
    name: 'Larah Queiroz Silva',
    github: 'https://github.com/Zumano-Estiloso',
    role: 'Front-end',
    skills: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    bio: 'Implementou a interface em React 19, TypeScript e Vite, com Tailwind CSS 4, nas telas de filtros, resolução de questões, simulado, dashboard e fórum, consumindo a API.',
    photo: laraPhoto,
    photoPosition: 'center 32%',
  },
  {
    name: 'Maria Emanuelle Pimentel de Oliveira',
    github: 'https://github.com/manuol14',
    role: 'UX design e front-end',
    skills: ['UX', 'Personas', 'Fluxos', 'React'],
    bio: 'Definiu personas, fluxos e as telas (login, painéis, banco de questões, simulado e fórum) e implementou essa interface junto com o React.',
    photo: manuelaPhoto,
    photoPosition: 'center 30%',
  },
]

function GithubIcon() {
  return (
    <svg className={styles.githubIcon} viewBox="0 0 16 16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
      />
    </svg>
  )
}

function useInterFont() {
  useEffect(() => {
    const preconnects = [
      ['https://fonts.googleapis.com', ''],
      ['https://fonts.gstatic.com', 'anonymous'],
    ]
    for (const [href, crossOrigin] of preconnects) {
      if (document.querySelector(`link[rel="preconnect"][href="${href}"]`)) continue
      const link = document.createElement('link')
      link.rel = 'preconnect'
      link.href = href
      if (crossOrigin) link.crossOrigin = crossOrigin
      document.head.appendChild(link)
    }

    const id = 'equipe-05-inter'
    if (!document.getElementById(id)) {
      const link = document.createElement('link')
      link.id = id
      link.rel = 'stylesheet'
      link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
      document.head.appendChild(link)
    }
  }, [])
}

export default function Equipe05() {
  useInterFont()
  const title = info.name?.trim() || 'Equipe 05'

  return (
    <article className={styles.page}>
      <header className={styles.brandBar}>
        <div className={styles.wrap}>
          <a className={styles.brand} href="#inicio">
            <span className={styles.mark} aria-hidden="true">U</span>
            <span>
              <strong>UniColab</strong>
              <small>Plataforma de estudos</small>
            </span>
          </a>
          <p className={styles.course}>Desenvolvimento Web, 3º semestre</p>
        </div>
      </header>

      <section className={styles.hero} id="inicio" aria-labelledby="titulo">
        <div className={styles.wrap}>
          <h1 id="titulo">{title}</h1>
          <figure className={styles.videoBlock}>
            <div className={styles.videoFrame}>
              <VideoEmbed url={VIDEO.url} title="Apresentação do UniColab" />
            </div>
            <figcaption className={styles.videoNote}>
              Vídeo de apresentação da plataforma. <a href={VIDEO.url}>{VIDEO.url}</a>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className={styles.panel} aria-labelledby="tecnologias">
        <div className={styles.wrap}>
          <h2 id="tecnologias">Tecnologias</h2>
          <p>
            A arquitetura separa o site, a API e o banco. A API segue o padrão Controller, Service e Repository, e o
            MySQL guarda a integridade dos dados. Os três serviços sobem no mesmo Docker Compose.
          </p>
          <dl className={styles.stack}>
            {STACK.map((item) => (
              <div key={item.label} className={styles.stackRow}>
                <dt>{item.label}</dt>
                <dd>{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className={styles.panel} aria-labelledby="sobre">
        <div className={styles.wrap}>
          <h2 id="sobre">Sobre o projeto</h2>
          <dl className={styles.stack}>
            <div className={styles.stackRow}>
              <dt>Tema</dt>
              <dd>{PROJECT.theme}</dd>
            </div>
            <div className={styles.stackRow}>
              <dt>Propósito</dt>
              <dd className={styles.purpose}>
                {PROJECT.purpose.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className={`${styles.panel} ${styles.linkBand}`} aria-labelledby="site">
        <div className={styles.wrap}>
          <div>
            <h2 id="site">Site da aplicação</h2>
            <p>Endereço em que o serviço web do UniColab está publicado.</p>
          </div>
          <a className={styles.appLink} href={APP_URL}>
            {APP_URL}
          </a>
        </div>
      </section>

      <section className={`${styles.panel} ${styles.team}`} aria-labelledby="equipe">
        <div className={styles.wrap}>
          <h2 id="equipe">Equipe</h2>
          <ul className={styles.teamList}>
            {MEMBERS.map((member) => (
              <li key={member.name}>
                <img
                  className={styles.memberPhoto}
                  src={member.photo}
                  alt={`Foto de ${member.name}`}
                  style={{ objectPosition: member.photoPosition }}
                />
                <div>
                  <h3>{member.name}</h3>
                  <p>
                    {member.role}. {member.bio}
                  </p>
                  <a
                    className={styles.githubLink}
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GithubIcon />
                    {member.github.replace('https://', '')}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className={styles.credits}>
        <div className={styles.wrap}>
          <strong>UniColab — plataforma colaborativa de estudos para o ENADE</strong>
          <p>Universidade de Fortaleza, Análise e Desenvolvimento de Sistemas, Desenvolvimento Web</p>
          <p>Prof. Me. Francisco Estevão Simão Pereira. Fortaleza, 2026.</p>
        </div>
      </footer>
    </article>
  )
}
