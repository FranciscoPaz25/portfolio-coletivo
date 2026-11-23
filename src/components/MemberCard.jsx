import styles from './MemberCard.module.css'

/** Card da ficha técnica de um integrante. */
export default function MemberCard({ name, role, skills = [], bio, links = [] }) {
  return (
    <article className={styles.card}>
      <h3 className={styles.name}>{name}</h3>
      {role && <p className={styles.role}>{role}</p>}
      {skills.length > 0 && (
        <ul className={styles.skills} aria-label="Habilidades">
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      )}
      {bio && <p className={styles.bio}>{bio}</p>}
      {links.length > 0 && (
        <ul className={styles.links}>
          {links.map((link) => (
            <li key={link.url}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
