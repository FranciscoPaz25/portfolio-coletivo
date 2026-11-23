// At-rules cujo conteúdo são regras comuns (os seletores dentro delas são verificados).
const GROUP_AT_RULES = ['media', 'supports', 'container', 'layer']

function splitSelectors(prelude) {
  const parts = []
  let depth = 0
  let current = ''
  for (const ch of prelude) {
    if (ch === '(') depth++
    if (ch === ')') depth--
    if (ch === ',' && depth === 0) {
      parts.push(current.trim())
      current = ''
    } else current += ch
  }
  if (current.trim()) parts.push(current.trim())
  return parts
}

function isScoped(selector) {
  return selector.startsWith('.') && !selector.includes(':global')
}

/**
 * CSS Modules só tornam locais os nomes de CLASSE. Seletores como `body`, `h2`,
 * `:root`, `*` ou `:global(...)` vazam para o site inteiro e mudam as páginas das
 * outras equipes. Retorna os seletores (e @import) que vazam.
 */
export function findGlobalSelectors(css) {
  const text = css.replace(/\/\*[\s\S]*?\*\//g, '')
  const offenders = []
  const stack = [] // 'rule' | 'group' | 'skip'
  let buffer = ''

  for (const ch of text) {
    if (ch === '{') {
      const prelude = buffer.trim()
      buffer = ''
      const parent = stack.at(-1)
      if (parent === 'rule' || parent === 'skip') {
        stack.push(parent) // regra aninhada ou bloco de @keyframes/@font-face
      } else if (prelude.startsWith('@')) {
        const name = prelude.slice(1).split(/[\s(]/)[0].toLowerCase()
        stack.push(GROUP_AT_RULES.includes(name) ? 'group' : 'skip')
      } else {
        for (const selector of splitSelectors(prelude)) if (!isScoped(selector)) offenders.push(selector)
        stack.push('rule')
      }
    } else if (ch === '}') {
      stack.pop()
      buffer = ''
    } else if (ch === ';') {
      if (stack.length === 0 && buffer.trim().startsWith('@import')) offenders.push('@import')
      buffer = ''
    } else {
      buffer += ch
    }
  }
  return offenders
}
