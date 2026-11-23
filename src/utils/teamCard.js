function text(value) {
  return typeof value === 'string' ? value.trim() : ''
}

/**
 * Normaliza os dados do card de uma equipe (vindos do info.js dela).
 * Campos vazios ou inválidos caem em textos padrão, sem quebrar a Home.
 */
export function getCardInfo(id, info) {
  const number = id.replace('equipe-', '')
  const name = text(info?.name)
  return {
    number,
    name: name || `Equipe ${number}`,
    theme: text(info?.theme) || 'Tema a definir',
    summary: text(info?.summary) || 'Página em construção.',
    inProgress: !name,
  }
}
