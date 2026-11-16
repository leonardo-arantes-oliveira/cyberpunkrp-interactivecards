# Fichas de personagens

Cada personagem é uma **pasta** aqui dentro. O mural lê tudo automaticamente: não precisa importar nada no código.

```
src/data/personagens/
└─ baldoknox/
   ├─ baldoknox.json      ← dados da ficha (o nome pode ser qualquer .json)
   ├─ retrato.jpg         ← primeira imagem = capa
   └─ segunda.webp        ← opcional; vira o segundo slide
```

Regras rápidas:

- O JSON pode ter qualquer nome; se houver mais de um, vence o que tem o mesmo nome da pasta.
- Imagens `.webp`, `.jpg`, `.jpeg`, `.png` e `.avif` da pasta entram na galeria.
- A ordem das imagens vem do campo `imagens`; sem ele, a ordem é alfabética.
- O campo aceita lista (`imagens`) ou singular (`imagem`, `foto`, `retrato`), com ou sem
  extensão e em qualquer caixa: `"retrato"`, `"Retrato.JPG"` e `"retrato.jpg"` dão no mesmo.
- As fotos são copiadas para `public/fichas/<slug>/`. Com `npm run dev`, a cópia se refaz
  sozinha a cada imagem adicionada, trocada ou removida; fora disso, use `npm run sincronizar`.
- Pastas começando com `_` ou `.` são ignoradas.
- Recarregue a página depois de salvar o JSON.

## Formato do JSON

```json
{
  "id": "0042",
  "nome": "Baldwin Knox",
  "alias": "ex-Armitage",
  "origem": "Marginal",
  "habilidades": ["Corpo", "Moral"],
  "builds": ["Tank"],
  "matiz": 0,
  "resumo": "Mercenário fanfarrão, de lábia afiada e confiança absurda.",
  "stats": [
    { "rotulo": "Lábia", "valor": 92 },
    { "rotulo": "Combate", "valor": 58 }
  ],
  "meta": [
    { "rotulo": "Ocupação", "valor": "Mercenário" },
    { "rotulo": "Status", "valor": "Ativo" }
  ],
  "imagens": ["retrato.jpg", "segunda.webp"],
  "capitulos": [
    {
      "titulo": "Armitage",
      "paragrafos": ["Primeiro parágrafo…", "Segundo parágrafo…"],
      "citacao": "“Meu pai me ensinou a respeitar a lei…”"
    },
    {
      "titulo": "Perfil",
      "linhas": [{ "rotulo": "Humor", "valor": "Brincalhão e sarcástico." }]
    }
  ]
}
```

### Campos

| Campo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| `id` | string | não | aparece no selo do card; padrão `—` |
| `nome` | string | sim | sem ele, usa o nome da pasta |
| `alias` | string | não | linha `// ex-Armitage` acima do nome |
| `origem` | string | não | uma só; chip ciano que vira filtro |
| `habilidades` | string[] | não | quantas quiser; lista amarela no card e vira filtro |
| `builds` | string[] | não | quantas quiser; chips vermelhos no card e viram filtro |
| `matiz` | number | não | deslocamento de cor (graus) nas variações de enquadramento |
| `resumo` | string | não | frase curta abaixo do nome |
| `stats` | array | não | `{ rotulo, valor }` de 0 a 100; os cinco atributos viram o radar |
| `meta` | array | não | `{ rotulo, valor }` exibidos quando abre "Status +" |
| `imagens` | string[] | não | nomes de arquivos da própria pasta |
| `capitulos` | array | não | cada item vira uma aba do modal |

### Capítulos

- `titulo` — rótulo da aba.
- `paragrafos` — textos corridos com o efeito de descriptografar.
- `linhas` — tabela `{ rotulo, valor }` (bom para "Perfil").
- `citacao` — frase em destaque, com barra vermelha.

Atalhos aceitos para facilitar importação de dados antigos: `name`, `atributos` (vira `habilidades`), `classe` ou `build` (vira `builds`), `hue`, `ch`, `p`, `q`, `rows`, `texto`, e `stats`/`meta` em formato de par (`["Lábia", 92]`).

## Origem, habilidades e builds

Um personagem tem **uma origem**, **várias habilidades** e **várias builds**. Os filtros do mural listam primeiro as opções oficiais abaixo e depois qualquer valor extra que apareça em alguma ficha.

**Origem:** `Nômade`, `Marginal`, `Corp` (de corporativo).

**Habilidades** (os cinco atributos): `Corpo`, `Reflexos`, `Habilidade Técnica`, `Inteligência`, `Moral`.

**Builds:** `Netrunner`, `Ninja / Samurai`, `Tank`, `Velocista com Sandevistan`, `Pistoleiro / Atirador Furtivo`.

As listas oficiais ficam em `src/lib/categorias.ts`; os ícones de cada valor, em `src/components/mural/icones.tsx`. Escreva os valores exatamente assim (acentos inclusos) para reaproveitar o ícone e o filtro certos.

## Status (star plot)

O botão **Status +** abre o radar do card. Ele tem um eixo por habilidade, na ordem dos filtros: Corpo, Reflexos, Habilidade Técnica, Inteligência e Moral. Basta registrar esses rótulos em `stats` (o valor pode ficar de 0 a 100) e o radar encontra cada um sozinho, aceitando variações como "Técnica" ou "Cool":

```json
"stats": [
  { "rotulo": "Corpo", "valor": 82 },
  { "rotulo": "Reflexos", "valor": 58 },
  { "rotulo": "Habilidade Técnica", "valor": 44 },
  { "rotulo": "Inteligência", "valor": 61 },
  { "rotulo": "Moral", "valor": 92 }
]
```

Atributo ausente entra como zero no gráfico. Se nenhum rótulo bater com os cinco atributos, os stats aparecem como linhas de texto simples, sem radar. Os campos `meta` (Ocupação, Base, Reputação, Status…) continuam listados embaixo do gráfico.
