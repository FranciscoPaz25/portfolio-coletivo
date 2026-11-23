# Portfólio Coletivo da Turma

Desafio Integrador: um portfólio web feito por toda a turma, com React + Vite, versionado no GitHub, com build no GitHub Actions e publicado no Dokploy.

Cada equipe tem **uma pasta só dela** em `src/teams/equipe-XX/`. A Home, o menu, o rodapé e as rotas já estão prontos e registrados pela Equipe Base. **Você não precisa (e não deve) editar nada fora da sua pasta.**

| Equipe | Pasta | Rota | Branch |
|---|---|---|---|
| Base | `src/teams/equipe-00/` | `/equipe-00` | (Equipe Base) |
| 01 | `src/teams/equipe-01/` | `/equipe-01` | `feat/equipe-01` |
| 02 | `src/teams/equipe-02/` | `/equipe-02` | `feat/equipe-02` |
| 03 | `src/teams/equipe-03/` | `/equipe-03` | `feat/equipe-03` |
| 04 | `src/teams/equipe-04/` | `/equipe-04` | `feat/equipe-04` |
| 05 | `src/teams/equipe-05/` | `/equipe-05` | `feat/equipe-05` |

## Rodando o projeto

Precisa de **Node 20.19+ ou 22.12+** (recomendado 22). Veja com `node -v`. Quem usa nvm pode rodar `nvm use`.

```bash
npm ci           # instala exatamente as versões do package-lock.json
npm run dev      # abre em http://localhost:5173
```

## Passo a passo das equipes

### 1. Clonar e criar sua branch

```bash
git clone https://github.com/thebylito/portfolio-coletivo.git
cd portfolio-coletivo
npm ci
git checkout -b feat/equipe-01   # troque 01 pelo número da sua equipe
```

### 2. Editar só a sua pasta

Dentro de `src/teams/equipe-XX/` você encontra:

- **`info.js`**: nome, tema e resumo da equipe. É o que aparece no card da Home. Enquanto o `name` estiver vazio, o card mostra "Em construção".
- **`index.jsx`**: a página da equipe. No topo do arquivo há quatro constantes para preencher, e o layout já está pronto:
  - `VIDEO`: link do YouTube/Vimeo (`watch?v=`, `youtu.be`, `shorts` e `vimeo.com` funcionam) e a **referência** (fonte, inspiração, tema ou prompt/roteiro usado).
  - `PROJECT`: tema da página, propósito da entrega e **como a IA foi usada**.
  - `TEAM`: perfil e dinâmica da equipe.
  - `MEMBERS`: um objeto por integrante (nome completo, papel, habilidades, mini-bio, links opcionais).
- **`Equipe.module.css`**: estilos da sua página, com CSS Modules (`styles.minhaClasse`). **Todo seletor precisa começar com uma classe**: `.page h2 { }` pode, `h2 { }`, `body { }`, `:root { }`, `* { }` e `:global(...)` não podem, porque mudariam o site inteiro. Use só arquivos `.module.css`. O `npm test` (e o CI do PR) acusa seletores proibidos.

Quer mudar o layout? Pode. A página é de vocês. Os componentes `VideoEmbed` e `MemberCard` (em `src/components/`) são opcionais: importe e use, mas **não edite** os arquivos deles.

Quer uma segunda página (máximo de 2)? Crie outro componente na sua pasta e use `<Routes>` do `react-router-dom` dentro do `index.jsx`. A rota `/equipe-XX/*` já é sua. Exemplo:

```jsx
import { Link, Route, Routes } from 'react-router-dom'

export default function Equipe01() {
  return (
    <Routes>
      <Route index element={<PaginaPrincipal />} />      {/* /equipe-01 */}
      <Route path="bastidores" element={<Bastidores />} /> {/* /equipe-01/bastidores */}
    </Routes>
  )
}
// Para linkar: <Link to="bastidores">Bastidores</Link>
```

Imagens: coloque na sua pasta e importe (`import foto from './foto.jpg'`). **Não suba vídeos no Git.** Use embed do YouTube/Vimeo.

### 3. Testar antes de enviar

```bash
npm run build   # tem que terminar sem erro
npm test
```

### 4. Commit, push e Pull Request

```bash
git add src/teams/equipe-01
git commit -m "feat: adiciona pagina e ficha tecnica da equipe 01"
git push -u origin feat/equipe-01
```

Depois abra um **Pull Request para a `main`** no GitHub. O GitHub roda o build automaticamente no PR. Se ficar vermelho, corrija e faça push de novo na mesma branch. A Equipe Base revisa e faz o merge.

## Regras

- Trabalhe **somente** em `src/teams/equipe-XX/` (a sua).
- **Nunca** faça push direto na `main`. Ela é protegida e só recebe código por Pull Request aprovado pela Equipe Base.
- Branch sempre no padrão `feat/equipe-XX` (minúsculas, com hífen).
- Nada de vídeos pesados no repositório.
- Não instale pacotes (`npm install <pacote>`) e não envie alterações no `package-lock.json`. Use `npm ci`. Antes do commit, confira com `git status` que só arquivos da sua pasta mudaram.

## Estrutura

```
src/
├── components/        # Header, Footer, TeamCard, VideoEmbed, MemberCard... (Equipe Base)
├── pages/             # Home e página 404 (Equipe Base)
├── data/
│   ├── teamsConfig.js # registro oficial das equipes e rotas (Equipe Base)
│   └── siteConfig.js
├── teams/
│   ├── equipe-00/     # Equipe Base
│   ├── equipe-01/     # Equipe 01
│   └── ...
├── utils/             # funções de apoio (com testes)
├── App.jsx            # rotas
└── main.jsx
```

## Deploy (Equipe Base)

Quem faz o build é o **GitHub Actions** (`.github/workflows/deploy.yml`). O **Dokploy** só implanta a imagem pronta. A cada merge na `main`:

1. O Actions gera a imagem Docker (build com Node e servidor nginx, que já faz as rotas do React funcionarem ao recarregar a página).
2. Publica no GHCR: `ghcr.io/thebylito/portfolio-coletivo:sha-<commit>` (e `:latest`).
3. Chama o Dokploy (`nodilabs/dokploy-deploy-action`) para implantar essa versão.

Configuração (uma vez só):

- **No Dokploy:** criar uma aplicação com source **Docker** (imagem `ghcr.io/thebylito/portfolio-coletivo:latest`), porta do container **80** em Domains. Se o pacote do GHCR estiver privado, cadastrar o registry `ghcr.io` com um token de leitura.
- **No GitHub** (Settings → Secrets and variables → Actions), cadastrar:
  - `DOKPLOY_SERVER_URL`: URL do painel do Dokploy
  - `DOKPLOY_API_KEY`: chave de API do Dokploy
  - `DOKPLOY_APPLICATION_IDS`: ID da aplicação no Dokploy

Enquanto os secrets não existirem, o workflow só publica a imagem e avisa que o deploy foi ignorado. Para reimplantar sem novo commit: aba Actions → "Build & Deploy" → Run workflow.

Teste local da imagem:

```bash
docker build -t portfolio-coletivo .
docker run --rm -p 8080:80 portfolio-coletivo   # http://localhost:8080
```
