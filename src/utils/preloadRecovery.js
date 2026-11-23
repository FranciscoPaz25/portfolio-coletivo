const KEY = 'portfolio:preload-reload-at'
const WINDOW_MS = 30_000

/**
 * Depois de um novo deploy, os arquivos antigos de cada página deixam de existir.
 * Quem estava com o site aberto recebe um erro ao abrir outra equipe: recarregamos
 * a página uma vez para buscar a versão nova. Se falhar de novo logo em seguida,
 * não recarrega (evita loop) e o ErrorBoundary mostra o botão "Recarregar página".
 */
export function handlePreloadError(event, { storage, reload, now = Date.now() }) {
  try {
    const last = Number(storage.getItem(KEY))
    if (last && now - last < WINDOW_MS) return false
    storage.setItem(KEY, now)
  } catch {
    return false
  }
  event.preventDefault()
  reload()
  return true
}
