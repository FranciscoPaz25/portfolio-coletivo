# Portfólio Coletivo — Base: Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Entregar o repositório base do Portfólio Coletivo (React + Vite + roteamento, Home, menu, rodapé, espaços das equipes 00–05, deploy Dokploy, CI) publicado no GitHub, pronto para as equipes clonarem.

**Architecture:** SPA React com `react-router-dom`. Um registro explícito (`src/data/teamsConfig.js`) lista as 6 equipes; Header, Home e rotas são gerados dele. Cada equipe tem uma pasta isolada com `index.jsx` (página, carregada com `React.lazy`) e `info.js` (dados do card). Cada rota de equipe roda dentro de `ErrorBoundary` + `Suspense`. Produção: imagem Docker (build Node → nginx com SPA fallback).

**Tech Stack:** React 19 + Vite (template `react`, JavaScript), react-router-dom 7, CSS puro + CSS Modules, `node --test` (sem dependência extra), Docker + nginx, GitHub Actions, `gh` CLI.

**Spec:** `docs/superpowers/specs/2026-11-23-portfolio-base-design.md`

## Global Constraints

- JavaScript (não TS), `npm` (com `package-lock.json`), Node 22.
- Pastas de equipe: `src/teams/equipe-00` (Base) e `src/teams/equipe-01` … `equipe-05`. Rota de cada uma: `/equipe-XX` (registrada como `/equipe-XX/*`).
- Estilos de equipe e de componentes em CSS Modules; global só em `src/index.css`.
- Nenhuma dependência além de `react`, `react-dom`, `react-router-dom` e as de dev do template Vite.
- Textos da interface em português (pt-BR); `<html lang="pt-BR">`.
- Repositório: `thebylito/portfolio-coletivo`, público. Branch principal `main`; equipes usam `feat/equipe-XX`.
- **Depois da Task 6 (publicação), nada mais muda em `src/teams/equipe-01..05/`** — esses arquivos passam a ser das equipes; qualquer mudança da Base neles gera conflito.

## Review Focus

1. Abrir/recarregar direto `/equipe-03/sobre` em produção (container) → 200 com o app, não 404 do nginx. *(Task 5, passo de curl)*
2. Página de uma equipe que lança erro ao renderizar → só a área dela mostra o aviso; Header, Footer e Home continuam funcionando. *(Task 3, verificação manual com `throw` temporário)*
3. Tela de 360px com 6 equipes no menu → sem rolagem horizontal da página. *(Task 4, critério de aceite)*
4. Link de vídeo em formato variado (`youtu.be`, `/shorts/`, com `?si=`, Vimeo, `.mp4`, texto inválido, vazio) → embed correto ou link de fallback, nunca iframe quebrado nem exceção. *(Task 2, testes de `toEmbedUrl`)*
5. `info.js` de equipe vazio, parcial, `undefined` ou com tipo errado → card "Em construção" sem quebrar a Home. *(Task 2, testes de `getCardInfo`)*

---

### Task 1: Scaffold do projeto

**Files:**
- Create: projeto via `npm create vite@latest . -- --template react` (na raiz atual, que só tem `docs/`)
- Modify: `index.html` (`lang="pt-BR"`, `<title>Portfólio Coletivo da Turma</title>`), `package.json` (`"name": "portfolio-coletivo"`, script `"test": "node --test"`)
- Delete: `src/App.css`, `src/assets/react.svg`, conteúdo boilerplate de `src/App.jsx` e `src/index.css`

**Interfaces:**
- Produces: projeto que builda; `react-router-dom` instalado; repositório git local com `main`.

- [ ] **Step 1:** `git init -b main`, rodar o create-vite na raiz (aceitar a pasta não vazia), `npm install`, `npm install react-router-dom`.
- [ ] **Step 2:** Limpar boilerplate: `App.jsx` retorna `<h1>Portfólio Coletivo</h1>`; `index.css` vazio; remover `App.css` e `assets/react.svg`; ajustar `index.html` e `package.json` como acima.
- [ ] **Step 3:** Verificar: `npm run build` → termina sem erro e gera `dist/index.html`.
- [ ] **Step 4:** Commit: `git add -A && git commit -m "chore: inicializa projeto React + Vite"` (confirmar que `node_modules/` e `dist/` estão no `.gitignore` do template).

---

### Task 2: Utilitários puros com testes

**Files:**
- Create: `src/utils/videoEmbed.js`, `src/utils/videoEmbed.test.js`
- Create: `src/utils/teamCard.js`, `src/utils/teamCard.test.js`

**Interfaces:**
- Produces:
  - `toEmbedUrl(url: unknown): string | null` — YouTube (`watch?v=`, `youtu.be/`, `/shorts/`, `/embed/`) → `https://www.youtube-nocookie.com/embed/<ID>`; Vimeo (`vimeo.com/<ID>`, `player.vimeo.com/video/<ID>`) → `https://player.vimeo.com/video/<ID>`; qualquer outra coisa → `null`. Nunca lança. Usar `new URL()` dentro de try/catch.
  - `getCardInfo(id: string, info: unknown): { number: string, name: string, theme: string, summary: string, inProgress: boolean }` — `number` = parte numérica do id (`'equipe-03'` → `'03'`); campos não-string ou só espaços contam como vazios; vazios caem nos padrões `Equipe <number>`, `Tema a definir`, `Página em construção.`; `inProgress` = nome vazio.

- [ ] **Step 1: Testes que falham** (`node:test` + `node:assert/strict`)

```js
// videoEmbed.test.js
const YT = 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'
test('youtube watch', () => assert.equal(toEmbedUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=30'), YT))
test('youtu.be com ?si', () => assert.equal(toEmbedUrl('https://youtu.be/dQw4w9WgXcQ?si=abc'), YT))
test('shorts', () => assert.equal(toEmbedUrl('https://youtube.com/shorts/dQw4w9WgXcQ'), YT))
test('embed já pronto', () => assert.equal(toEmbedUrl('https://www.youtube.com/embed/dQw4w9WgXcQ'), YT))
test('vimeo', () => assert.equal(toEmbedUrl('https://vimeo.com/76979871'), 'https://player.vimeo.com/video/76979871'))
test('vimeo player', () => assert.equal(toEmbedUrl('https://player.vimeo.com/video/76979871'), 'https://player.vimeo.com/video/76979871'))
test('arquivo mp4 → null', () => assert.equal(toEmbedUrl('https://exemplo.com/video.mp4'), null))
test('inválidos → null', () => { for (const v of ['', 'não é url', undefined, null, 42]) assert.equal(toEmbedUrl(v), null) })

// teamCard.test.js
test('vazio → em construção', () => assert.deepEqual(
  getCardInfo('equipe-03', { name: '', theme: '', summary: '' }),
  { number: '03', name: 'Equipe 03', theme: 'Tema a definir', summary: 'Página em construção.', inProgress: true }))
test('preenchido', () => assert.deepEqual(
  getCardInfo('equipe-03', { name: ' Os Devs ', theme: 'IA na educação', summary: 'Resumo' }),
  { number: '03', name: 'Os Devs', theme: 'IA na educação', summary: 'Resumo', inProgress: false }))
test('undefined não quebra', () => assert.equal(getCardInfo('equipe-03', undefined).inProgress, true))
test('tipos errados/espaços', () => assert.equal(getCardInfo('equipe-03', { name: 42, theme: '  ' }).inProgress, true))
```

- [ ] **Step 2:** `npm test` → FAIL (módulos não existem).
- [ ] **Step 3:** Implementar `toEmbedUrl` e `getCardInfo` como nas Interfaces.
- [ ] **Step 4:** `npm test` → todos PASS.
- [ ] **Step 5:** Commit `feat: utilitarios de video e card com testes`.

---

### Task 3: Registro, rotas, componentes e pastas das equipes (estrutura funcional)

Estrutura e comportamento; visual mínimo (só o necessário para funcionar, ex.: proporção 16:9 do vídeo). O visual fica para a Task 4.

**Files:**
- Create: `src/data/siteConfig.js`, `src/data/teamsConfig.js`, `src/data/teamsConfig.test.js`
- Create: `src/components/{Layout,Header,Footer,TeamCard,VideoEmbed,MemberCard,ErrorBoundary,TeamRoute}.jsx` (+ `*.module.css` de cada um que tiver visual)
- Create: `src/pages/Home.jsx`, `src/pages/Home.module.css`, `src/pages/NotFound.jsx`
- Create: `src/teams/equipe-0{0..5}/{index.jsx,info.js,Equipe.module.css}`
- Modify: `src/main.jsx` (envolver `<App/>` em `<BrowserRouter>`), `src/App.jsx`

**Interfaces:**
- Consumes: `toEmbedUrl`, `getCardInfo` (Task 2).
- Produces:
  - `siteConfig = { title: 'Portfólio Coletivo da Turma', repoUrl: 'https://github.com/thebylito/portfolio-coletivo' }`
  - `teams: Array<{ id: string, path: string, info: object, Component: React.LazyExoticComponent, isBase: boolean }>` — 6 entradas explícitas, na ordem `equipe-00`…`equipe-05`; `path` = `/<id>`; só `equipe-00` com `isBase: true`. Cada linha importa `../teams/<id>/info.js` e `lazy(() => import('../teams/<id>/index.jsx'))`.
  - `info.js` de cada equipe: `export default { name: '', theme: '', summary: '' }` com comentário de uma linha por campo.
  - `<VideoEmbed url title />`: `toEmbedUrl(url)` → `<iframe>` (title, `loading="lazy"`, `allowFullScreen`); `null` com url preenchida → link "Assistir ao vídeo"; url vazia → aviso "Vídeo ainda não adicionado".
  - `<MemberCard name role skills={string[]} bio links={{label,url}[]} />`
  - `<TeamCard team />` — usa `getCardInfo(team.id, team.info)`, `<Link to={team.path}>`, selo "Em construção" quando `inProgress`; equipe base mostra "Equipe Base".
  - `<ErrorBoundary>` (classe): fallback "Esta página encontrou um erro. As outras equipes continuam funcionando." + link para `/`.
  - `<TeamRoute team />` = `<ErrorBoundary key={team.id}><Suspense fallback={<p>Carregando…</p>}><team.Component/></Suspense></ErrorBoundary>`.
  - Rotas em `App.jsx`, todas dentro de `<Route element={<Layout/>}>`: `index` → `Home`; para cada team `path={`${team.path}/*`}` → `TeamRoute`; `*` → `NotFound`.
  - Header: link "Início" + um `NavLink` por equipe (rótulo `Equipe Base` para 00, `Equipe XX` para as demais). Footer: título, ano atual, link do repositório.
  - Home: hero com o texto abaixo + grade de `TeamCard`.
    - Título: "Desafio Integrador — Portfólio Coletivo da Turma"
    - Texto: "Um portfólio web construído, integrado e publicado em uma única aula. Cada equipe criou sua página com vídeo, descrição do projeto, apresentação do grupo e ficha técnica dos integrantes."
    - Linha: "React + Vite · GitHub · Dokploy"
    - Chamada: "Escolha uma equipe abaixo ou use o menu para navegar."
  - Template `src/teams/equipe-XX/index.jsx`: constantes no topo (`VIDEO = { url, reference }`, `PROJECT = { theme, purpose, aiUsage }`, `TEAM = { profile }`, `MEMBERS = [{ name, role, skills, bio, links }]`) com textos-guia em português dizendo o que preencher; título da página vem de `info.name` (fallback `Equipe XX`); 4 `<section>` na ordem do PDF: Vídeo e referência, Sobre o projeto, A equipe, Ficha técnica. Escrever em `equipe-01` e copiar para 00 e 02–05 trocando o número.

- [ ] **Step 1: Teste do registro que falha** (`teamsConfig.test.js`)

```js
test('6 equipes, ordem e rotas', () => {
  assert.deepEqual(teams.map(t => t.id), ['equipe-00','equipe-01','equipe-02','equipe-03','equipe-04','equipe-05'])
  for (const t of teams) assert.equal(t.path, `/${t.id}`)
  assert.deepEqual(teams.filter(t => t.isBase).map(t => t.id), ['equipe-00'])
  for (const t of teams) assert.equal(typeof t.info, 'object')
})
```

- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Criar `siteConfig`, pastas das equipes (`info.js` + template + CSS Module) e `teamsConfig.js`. `npm test` → PASS.
- [ ] **Step 4:** Criar componentes, páginas, `App.jsx`, `main.jsx` conforme Interfaces.
- [ ] **Step 5:** `npm test && npm run build` → PASS, build sem erros nem warnings de import.
- [ ] **Step 6: Verificação manual** com `npm run build && npx vite preview --port 4173`: `/` mostra 6 cards ("Em construção" nas 5 de conteúdo); `/equipe-03` mostra as 4 seções; `/qualquer` mostra 404 dentro do layout. Colocar `throw new Error('teste')` no topo do componente de `equipe-05`, rebuildar: `/equipe-05` mostra o aviso de erro com Header/Footer, `/` e `/equipe-03` seguem normais. **Reverter o throw** e confirmar `git diff src/teams/equipe-05` vazio.
- [ ] **Step 7:** Commit `feat: registro de equipes, rotas, home e template das paginas`.

---

### Task 4: UI/UX (executada pelo Codex)

**Files:**
- Modify: `src/index.css`, todos os `*.module.css` de `src/components/`, `src/pages/`, e `src/teams/equipe-0{0..5}/Equipe.module.css` (os 6 idênticos).
- Pode ajustar marcação JSX desses componentes/páginas (wrappers, classes, ícones em SVG inline) **sem mudar** nomes de arquivo, exports, props, `teamsConfig.js`, `siteConfig.js`, `src/utils/`, nem as constantes de conteúdo do template.

**Interfaces:**
- Consumes: tudo da Task 3, inalterado.

Critérios de aceite:
- Visual limpo e moderno para uma vitrine de turma; tokens de cor/espaço/tipografia como variáveis CSS em `:root`; modo escuro via `prefers-color-scheme`.
- Header fixo/legível com 7 links (Início + 6 equipes); em 360px de largura, sem rolagem horizontal da página (menu quebra em linhas, vira menu recolhível, ou rola só dentro do próprio nav).
- Grade de cards responsiva (1 coluna no celular, 2–3 no desktop); card base destacado; selo "Em construção" visível.
- Vídeo 16:9 responsivo; `MemberCard` em grade; seções do template com hierarquia clara.
- Foco visível em links/botões; contraste AA; nenhuma fonte/CDN externa obrigatória (Google Fonts opcional com fallback de sistema).
- Sem novas dependências npm.
- `npm test && npm run build` → PASS.

- [ ] **Step 1:** Codex aplica o visual conforme os critérios.
- [ ] **Step 2:** Verificar `npm test && npm run build` e conferir no `vite preview` em 360px e 1280px: `/`, `/equipe-00`, `/equipe-03`, `/nada`.
- [ ] **Step 3:** Conferir `git diff --stat` — só arquivos permitidos tocados.
- [ ] **Step 4:** Commit `style: identidade visual da vitrine e das paginas`.

---

### Task 5: Deploy (Dokploy), CI e README

Arquivos disjuntos da Task 4 — pode rodar em paralelo com ela.

**Files:**
- Create: `Dockerfile`, `nginx.conf`, `.dockerignore`
- Create: `.github/workflows/ci.yml`, `.github/CODEOWNERS`
- Modify: `README.md` (substituir o do template)

**Interfaces:**
- Produces: imagem que serve na porta 80; job de CI chamado `build` (usado na proteção de branch da Task 6).

Conteúdo decidido:
- `Dockerfile`: stage `node:22-alpine` (`npm ci` → `npm run build`) → `nginx:1.27-alpine` copiando `dist/` para `/usr/share/nginx/html` e `nginx.conf` para `/etc/nginx/conf.d/default.conf`; `EXPOSE 80`.
- `nginx.conf`: `listen 80`; `location /assets/ { try_files $uri =404; }` com cache longo `immutable`; `location / { try_files $uri $uri/ /index.html; }`; `index.html` sem cache; gzip ligado.
- `.dockerignore`: `node_modules`, `dist`, `.git`, `docs`.
- `ci.yml`: em `pull_request` e `push` para `main`; job `build`: checkout, `setup-node` 22 com cache npm, `npm ci`, `npm test`, `npm run build`.
- `CODEOWNERS`: `* @thebylito`.
- `README.md` (pt-BR): o que é o projeto; como rodar (`npm install`, `npm run dev`); **passo a passo das equipes** (clonar, `git checkout -b feat/equipe-XX`, editar **só** `src/teams/equipe-XX/`, preencher `info.js` e as constantes do `index.jsx`, componentes opcionais `VideoEmbed`/`MemberCard`, 2ª página via `<Routes>` interno, `npm run build` antes do push, `git push -u origin feat/equipe-XX`, abrir PR para `main`); regras (sem push na `main`, sem vídeo pesado no Git); seção de deploy no Dokploy (build type Dockerfile, porta 80, branch `main`, auto-deploy).

- [ ] **Step 1:** Criar os arquivos acima.
- [ ] **Step 2: Verificar container:**

```bash
docker build -t portfolio-coletivo . && docker run -d --rm -p 8080:80 --name pc-test portfolio-coletivo
curl -s -o /dev/null -w '%{http_code}\n' localhost:8080/equipe-03/sobre   # 200
curl -s localhost:8080/equipe-03/sobre | grep -c 'id="root"'               # 1
curl -s -o /dev/null -w '%{http_code}\n' localhost:8080/assets/nao-existe.js # 404
docker stop pc-test
```

- [ ] **Step 3:** Validar YAML do workflow (ex.: `npx --yes yaml-lint .github/workflows/ci.yml` ou leitura atenta) — o run real acontece na Task 6.
- [ ] **Step 4:** Commit `chore: deploy dokploy, ci e guia das equipes`.

---

### Task 6: Publicar no GitHub e proteger a `main`

Ação pública — aprovada pela equipe no design. Rodar só depois das Tasks 3–5 commitadas.

- [ ] **Step 1:** `gh repo create thebylito/portfolio-coletivo --public --source=. --remote=origin --push --description "Desafio Integrador — Portfólio Coletivo da Turma"`.
- [ ] **Step 2:** Esperar o CI do push: `gh run watch --exit-status` → sucesso.
- [ ] **Step 3:** Proteção da `main`:

```bash
gh api -X PUT repos/thebylito/portfolio-coletivo/branches/main/protection --input - <<'EOF'
{ "required_status_checks": { "strict": false, "contexts": ["build"] },
  "enforce_admins": false,
  "required_pull_request_reviews": { "required_approving_review_count": 1, "require_code_owner_reviews": true },
  "restrictions": null }
EOF
```

- [ ] **Step 4:** Verificar: `gh api repos/thebylito/portfolio-coletivo/branches/main/protection --jq '.required_status_checks.contexts, .required_pull_request_reviews.require_code_owner_reviews'` → `["build"]` e `true`.
- [ ] **Step 5:** Entregar à equipe o link do repositório e o comando de convite: `gh api -X PUT repos/thebylito/portfolio-coletivo/collaborators/<usuario> -f permission=push` (executar quando chegarem os usernames).

---

### Task 7: Página da Equipe Base (quando chegarem os dados)

**Files:**
- Modify: `src/teams/equipe-00/info.js`, `src/teams/equipe-00/index.jsx` (só as constantes de conteúdo)

- [ ] **Step 1:** Preencher `info.js` e as constantes com os dados reais dos membros da Base (nome, papel, habilidades, bio/links), vídeo e referência.
- [ ] **Step 2:** `npm test && npm run build` → PASS; conferir `/equipe-00` e o card na Home.
- [ ] **Step 3:** Commit `feat: pagina e ficha tecnica da equipe base` e push na `main`.
