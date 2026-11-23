# Portfólio Coletivo da Turma — Base (design)

Data: 2026-11-23 · Papel: Equipe Base & Integração

## Intenção

Fomos sorteados como Equipe Base do Desafio Integrador. Precisamos entregar, nos
primeiros 20 minutos da aula, um repositório React + Vite pronto para as demais
equipes clonarem, e depois integrar as branches `feat/equipe-XX` na `main` e
publicar o site. Sucesso = cada equipe só precisa preencher a própria pasta, os
merges não dão conflito e a `main` sempre builda e está no ar.

## Objetivos

- Projeto React + Vite (JavaScript) com `react-router-dom`, usando `npm`.
- Home / Vitrine Geral: apresentação do desafio + card de acesso para cada equipe.
- Menu de navegação (Header) e Rodapé compartilhados.
- Página própria da Equipe Base com apresentação e ficha técnica dos membros.
- Espaços já reservados para as 5 equipes de conteúdo.
- Deploy contínuo no Dokploy a partir da `main` (troca da Vercel já combinada com o professor).

## Não-objetivos

- Backend, CMS, login, TypeScript, testes automatizados além do build.
- Vercel (substituída pelo Dokploy).

## Anti-objetivos (falha mesmo se "funcionar")

- Equipes precisarem editar arquivos compartilhados (gera conflito de merge).
- `main` quebrada na hora da aula.
- Recarregar `/equipe-03` dar 404 em produção.
- Erro na página de uma equipe derrubar o site inteiro.

## Restrições

- Stack do PDF: React + Vite, CSS puro / CSS Modules.
- Branches: `main` + `feat/equipe-XX` (minúsculas, hífen). Ninguém além da Base faz push na `main`.
- Comandos da turma: `npm run dev` e `npm run build`.
- Vídeos via embed (YouTube/Vimeo), nada pesado no Git.

## Abordagens consideradas

1. **Espaços já reservados (escolhida).** A Base cria `src/teams/equipe-01..05/`
   com página provisória e `info.js`; `teamsConfig.js` já registra todas as rotas.
   Equipes só mexem na própria pasta → zero conflito; lista explícita e fácil de explicar.
2. **Descoberta automática** com `import.meta.glob`. Não exige saber o número de
   equipes, mas é "mágica" difícil de explicar e uma pasta malformada quebra a Home.
3. **Cada equipe edita o `teamsConfig.js`** (leitura literal do PDF). Todo PR mexe no
   mesmo arquivo → conflitos na hora mais apertada da aula.

Escolhida a 1 pela equipe.

## Design

### Estrutura

```
src/
├── components/            # Base: Header, Footer, TeamCard, VideoEmbed, MemberCard, ErrorBoundary
├── pages/                 # Base: Home, NotFound
├── data/
│   └── teamsConfig.js     # registro oficial: equipe-00..05 → rota, info, componente
├── teams/
│   ├── equipe-00/         # Equipe Base (nossa página)
│   ├── equipe-01/ … equipe-05/
│   │   ├── index.jsx      # página da equipe (template com as 4 seções obrigatórias)
│   │   ├── info.js        # dados do card: nome, tema, resumo
│   │   └── Equipe.module.css
├── App.jsx                # rotas
├── main.jsx
└── index.css              # estilos globais + variáveis de cor
```

### Registro (`teamsConfig.js`)

Lista explícita, uma entrada por equipe: `{ id, path, info, Component }`, onde
`info` vem de `teams/equipe-XX/info.js` e `Component` é `React.lazy(() => import(...))`.
Header, Home e rotas são gerados a partir dessa lista. Adicionar uma equipe extra =
copiar uma pasta + uma linha.

### Rotas

- `/` → Home
- `/equipe-XX/*` → página da equipe (o `/*` deixa a equipe ter 2 páginas
  interligadas com `<Routes>` próprias, sem tocar no `App.jsx`)
- `*` → 404

Cada rota de equipe fica dentro de `<Suspense>` + `<ErrorBoundary>`: se a página de
uma equipe quebrar em tempo de execução, só ela mostra o erro.

### Home

```
┌──────────────────────────────────────────────┐
│ Portfólio Coletivo   Início  Equipes 00…05   │  Header
├──────────────────────────────────────────────┤
│ Desafio Integrador — Portfólio Coletivo      │
│ objetivo, stack, como navegar                │  Apresentação
├──────────────────────────────────────────────┤
│ [00 Base] [01] [02]                          │
│ [03]      [04] [05]                          │  Cards (de info.js)
├──────────────────────────────────────────────┤
│ Turma · ano · link do repositório            │  Footer
└──────────────────────────────────────────────┘
```

Card: número, nome da equipe, tema, resumo, "Ver página →". Enquanto a equipe não
preencher o `info.js`, o card mostra "Em construção".

### Template da página de equipe

`index.jsx` já vem com as 4 seções exigidas e os dados em constantes no topo do
arquivo, para a equipe só trocar o conteúdo:

1. Vídeo com referência (`VideoEmbed` + texto da fonte/prompt)
2. Sobre o projeto (tema, propósito, como a IA foi usada)
3. A equipe (nome/identidade, perfil e dinâmica)
4. Ficha técnica (`MemberCard` por integrante: nome, papel, habilidades, mini-bio/links)

`VideoEmbed` e `MemberCard` ficam em `src/components/` como opcionais: equipes
importam, não editam. Estilos de equipe em CSS Modules para não vazar entre páginas.

### Deploy (Dokploy)

- `Dockerfile` multi-stage: `node:22-alpine` roda `npm ci && npm run build` →
  `nginx:alpine` serve `dist/` com `try_files $uri /index.html` (SPA fallback).
- `.dockerignore` (node_modules, dist, .git).
- No painel: aplicação apontando para o repositório, branch `main`, build type
  Dockerfile, porta 80, auto-deploy ligado. Feito manualmente pela Base.

### GitHub

- Repositório público `portfolio-coletivo` na conta `thebylito` (público para
  permitir proteção de branch no plano gratuito).
- Proteção da `main`: exige Pull Request para merge; admins (Base) podem passar.
- GitHub Action em PRs: `npm ci && npm run build` — o PR mostra se quebra o build
  antes do merge.
- Convite dos colegas como colaboradores via `gh` quando a Base passar os usernames.

### README

Passo a passo para as equipes: clonar, `git checkout -b feat/equipe-XX`, editar só
`src/teams/equipe-XX/`, `npm run build` antes do push, abrir PR para `main`.

## Decisões da Base (podem ser revistas)

- JavaScript (não TS), `npm`, CSS puro + CSS Modules — mesmo padrão do `lista-tarefas`.
- Equipe Base = `equipe-00`; equipes de conteúdo = `equipe-01` a `equipe-05`.
- Componentes auxiliares opcionais para as equipes (`VideoEmbed`, `MemberCard`).
- Visual limpo e neutro, com variáveis CSS; detalhes de cor/fonte ficam para a implementação.

## Pendências (não bloqueiam o início)

- Dados dos membros da Equipe Base (nome, papel, habilidades, bio/links).
- Usernames do GitHub dos colegas para os convites.
- Configuração da aplicação no painel do Dokploy.
