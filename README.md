# Mural de fichas · Afterlife Roleplay

Site Next.js com as fichas interativas dos personagens do servidor Afterlife Roleplay
(Cyberpunk 2077). O mural lê as fichas de `src/data/personagens/<slug>/` — um JSON e as
imagens de cada personagem — e publica tudo como site estático no GitHub Pages.

- Produção: <https://leonardo-arantes-oliveira.github.io/cyberpunkrp-interactivecards/>
- Repositório: <https://github.com/leonardo-arantes-oliveira/cyberpunkrp-interactivecards>

## Rodando local

```bash
npm install
npm run dev
```

Abra <http://localhost:3000>. Para adicionar um personagem, crie a pasta em
`src/data/personagens/` com o JSON e as imagens (veja `src/data/personagens/README.md`).

## Build estático

```bash
npm run build   # gera a pasta out/
npm run preview # serve o out/ localmente para conferir
```

Antes de cada `dev`/`build` o script `scripts/sincronizar-imagens.mjs` copia as imagens das
fichas para `public/fichas/<slug>/`. Isso é necessário porque o export estático não tem
servidor para ler arquivos do disco (a pasta `public/fichas` é gerada e está no `.gitignore`).

## Deploy automático no GitHub Pages

O workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) roda a
cada push em `master` (ou `main`) e também pode ser disparado na mão em **Actions → Deploy no
GitHub Pages → Run workflow**:

1. instala as dependências com `npm ci`;
2. roda `npm run build` com `NEXT_PUBLIC_BASE_PATH=/cyberpunkrp-interactivecards`, então todos
   os links e imagens já saem com o prefixo do projeto;
3. publica a pasta `out/` no GitHub Pages via OIDC (`actions/deploy-pages`), sem chave nem
   token extra.

O `public/.nojekyll` impede o Jekyll de ignorar a pasta `_next`.

### Configuração única no GitHub

Em **Settings → Pages → Build and deployment → Source**, escolha **GitHub Actions**. O
workflow tenta fazer isso sozinho (`enablement: true`), mas essa opção exige permissão de
admin no repositório; se o primeiro run falhar nesse passo, ative na mão e rode de novo.

O repositório precisa ser público (no plano free o Pages só funciona em repositórios
públicos).

## Notas técnicas

- `output: "export"` + `images.unoptimized` — o GitHub Pages só serve arquivos estáticos.
- `cacheComponents` (PPR) fica desligado: o PPR exige servidor Node e o build falha com
  "Invariant: PPR cannot be enabled in export mode".
- `next/image` não aplica o `basePath` sozinho, por isso `src/lib/caminhos.ts` monta as URLs
  de arquivos de `public/`.
