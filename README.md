# Portfólio Coletivo da Turma

Desafio Integrador: um portfólio web feito por toda a turma, com React + Vite, versionado no GitHub e publicado no Dokploy.

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

Precisa de Node 20+ (recomendado 22).

```bash
npm install
npm run dev      # abre em http://localhost:5173
```

## Passo a passo das equipes

### 1. Clonar e criar sua branch

```bash
git clone https://github.com/thebylito/portfolio-coletivo.git
cd portfolio-coletivo
npm install
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
- **`Equipe.module.css`**: estilos da sua página. Use CSS Modules (`styles.minhaClasse`) para não afetar as outras equipes.

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

O site é publicado no **Dokploy** a partir da `main`, usando o `Dockerfile` (build com Node e servidor nginx, que já faz as rotas do React funcionarem ao recarregar a página).

Configuração da aplicação no Dokploy:

- **Provider:** GitHub, repositório `thebylito/portfolio-coletivo`, branch `main`
- **Build Type:** Dockerfile (caminho `./Dockerfile`)
- **Porta do container:** 80 (em Domains)
- **Auto Deploy:** ligado, para que cada merge na `main` publique sozinho

Teste local da imagem:

```bash
docker build -t portfolio-coletivo .
docker run --rm -p 8080:80 portfolio-coletivo   # http://localhost:8080
```
