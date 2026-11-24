# Portfólio Coletivo da Turma

Desafio Integrador: um portfólio web feito por toda a turma, com React + Vite, versionado no GitHub, com build no GitHub Actions e publicado no Dokploy.

Cada equipe tem **uma pasta só dela** em `src/teams/equipe-XX/`. A Home, o menu, o rodapé e as rotas já estão prontos e registrados pela Equipe Base. **Você não precisa (e não deve) editar nada fora da sua pasta.**

Peça ao dono do repositório para adicionar a sua conta do GitHub como colaborador de [thebylito/portfolio-coletivo](https://github.com/thebylito/portfolio-coletivo). Sem isso, o push é recusado. Quando o acesso chegar, use o repositório da turma. **Não crie um fork** e **não faça push direto na `main`.**

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

Troque `01` pelo número da sua equipe em todos os comandos. O nome da branch fica em minúsculas, com hífen: `feat/equipe-03`.

### 1. Preparar o computador

- Conta no GitHub e o Git instalado. Confira com `git --version`.
- Node.js 20.19+ ou 22.12+. Confira com `node -v`.
- Um editor de código. O site abre em http://localhost:5173.

### 2. Clonar o repositório e instalar

```bash
git clone https://github.com/thebylito/portfolio-coletivo.git
cd portfolio-coletivo
npm ci
npm run dev
```

`npm ci` instala exatamente as versões do `package-lock.json`. Não rode `npm install <pacote>` e não envie mudança nesse arquivo.

### 3. Atualizar a main e criar a branch

Se você já tinha clonado o repositório, comece por estes comandos. A Equipe Base já registrou as rotas. Você não cria rota nova fora da sua pasta.

```bash
git checkout main
git pull origin main
git checkout -b feat/equipe-01
```

### 4. Editar só a sua pasta

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

### 5. Não quebrar a página das outras equipes

- Não altere arquivos fora de `src/teams/equipe-XX/`.
- Não edite Header, Footer, Home, rotas nem componentes compartilhados.
- No CSS, todo seletor começa com uma classe. `.page h2` pode. `h2`, `body`, `:root`, `*` e `:global` não podem.
- Use apenas arquivo `.module.css`.
- No máximo duas páginas. A segunda rota fica dentro do seu `index.jsx`.

Antes do commit, rode `git status`. A lista deve mostrar só arquivos da sua pasta.

### 6. Testar na sua máquina

Os dois comandos precisam terminar sem erro. O Pull Request roda os mesmos testes.

```bash
npm run build
npm test
```

Abra a sua rota no navegador, por exemplo http://localhost:5173/equipe-01. Confira o card na Home, o vídeo, os textos e os links. A página das outras equipes deve continuar igual.

### 7. Commit e push

Envie só a sua pasta. A mensagem diz o que a equipe adicionou.

```bash
git add src/teams/equipe-01
git commit -m "feat: adiciona pagina e ficha tecnica da equipe 01"
git push -u origin feat/equipe-01
```

Se o Git responder que o push foi recusado, a conta ainda não é colaboradora. Peça o acesso e repita o mesmo `git push`. Não crie outro repositório.

### 8. Abrir o Pull Request

1. No GitHub, abra o repositório [thebylito/portfolio-coletivo](https://github.com/thebylito/portfolio-coletivo).
2. Clique em **Compare & pull request**, ou em **Pull requests** e depois em **New pull request**.
3. Base: `main`. Compare: a sua branch, por exemplo `feat/equipe-01`.
4. Título no mesmo estilo do commit: o que a equipe entregou.
5. No texto, diga o que mudou e como você testou.
6. Clique em **Create pull request**.

O GitHub Actions roda o build e os testes. O quadro verde libera a revisão. A Equipe Base lê o Pull Request e faz o merge. Você não faz merge da própria entrega e não envia commit direto na `main`.

### 9. Corrigir sem abrir outro Pull Request

Se o teste ficar vermelho ou alguém pedir ajuste, edite os arquivos, teste de novo e envie outro commit na **mesma branch**. O Pull Request aberto recebe o commit novo.

```bash
git add src/teams/equipe-01
git commit -m "fix: ajusta a pagina da equipe 01"
git push
```

### 10. Entregar uma mudança depois do merge

Quando o Pull Request já foi mergeado, a branch antiga não recebe mais a correção. Atualize a `main` e abra uma branch nova, com outro Pull Request.

```bash
git checkout main
git pull origin main
git checkout -b feat/equipe-01-ajuste
git add src/teams/equipe-01
git commit -m "fix: atualiza a pagina da equipe 01"
git push -u origin feat/equipe-01-ajuste
```

Depois repita o passo 8, apontando a branch nova para a `main`.

### Lista antes de pedir o merge

- A branch segue o padrão `feat/equipe-XX`.
- O `git status` mostra apenas a pasta da equipe.
- `info.js`, a página e a ficha dos integrantes estão preenchidos.
- `npm run build` e `npm test` passaram.
- A rota da equipe abre no navegador e a Home mostra o card.
- O Pull Request aponta para a `main` e o check do GitHub está verde.

## Regras

- Trabalhe **somente** em `src/teams/equipe-XX/` (a sua).
- **Nunca** faça push direto na `main`. Ela é protegida e só recebe código por Pull Request aprovado pela Equipe Base.
- **Não crie um fork.** Peça acesso de colaborador e envie a branch para o repositório da turma.
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
