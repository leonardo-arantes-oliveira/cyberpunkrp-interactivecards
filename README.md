# Mural de fichas · Afterlife Roleplay

O mural reúne as fichas interativas dos personagens do **Afterlife Roleplay**, servidor de Cyberpunk 2077.
Cada ficha é um card com foto, origem, habilidades, build, radar de atributos e a história completa dividida
em capítulos.

- Site: <https://leonardo-arantes-oliveira.github.io/cyberpunkrp-interactivecards/>

Quer ver seu personagem aqui? Siga os passos abaixo. **No fim, mande tudo para o Baldo Knox no servidor da
Afterlife** — é ele quem publica as fichas no mural.

---

## Como criar seu personagem

### 1. Escreva a história

Antes de qualquer coisa, escreva a história do personagem do seu jeito, em texto corrido. Não precisa se
preocupar com formato, JSON ou ficha: a IA organiza isso depois. Uma página basta.

O que vale contar:

- **Origem** — onde cresceu, com quem, o que acreditava. Nômade das Badlands, marginal de Watson ou criado
  dentro de uma corporação?
- **A virada** — o que quebrou a vida dele. Pode ser um evento só ou dois.
- **Quem ele é hoje** — o que faz na cidade, como ganha a vida, como age com as pessoas.
- **O objetivo** — o que ele persegue e o que o impede de conseguir.
- **Personalidade** — humor, ego, moralidade, relação com família. Uma frase por item já resolve.

Escreva no passado o que aconteceu e no presente o que ele é hoje. Nomes de facções, corporações e lugares
(NCPD, Trauma Team, Kang Tao, Arasaka, Watson, Badlands…) ajudam a IA a encaixar o personagem no mundo.

### 2. Pegue o prompt com o Baldo

O Baldo Knox tem um documento de prompt que ensina a IA a montar a ficha no padrão do mural. Peça esse
arquivo para ele no Discord do Afterlife Roleplay.

### 3. Cole na IA com a sua história

Abra a IA que você usa (ChatGPT, Claude, Gemini, o que preferir), cole o prompt inteiro e, no fim, cole a sua
história no espaço indicado. A IA também vai perguntar quais fotos você já tem.

### 4. Responda as perguntas

**Essa é a parte mais importante.** A IA não inventa nada: ela lê a sua história, aponta o que ficou em
aberto e pergunta, com opções fáceis de responder.

Ela separa dois tipos de ponto em aberto:

- **Lacuna** — falta informação para a ficha fazer sentido. Ela precisa da sua resposta.
- **Gancho** — algo que você prefere deixar aberto para desenvolver no RP. Responda "deixar aberto" e a IA
  não escreve nada sobre isso na ficha.

Responda com calma, escolhendo as opções ou escrevendo a sua versão. Quanto melhor você responder, mais o
personagem fica seu e menos a IA precisa supor.

### 5. Receba o JSON

Depois das respostas, a IA devolve a ficha pronta num bloco de texto que começa com `{` e termina com `}`.
Copie o bloco inteiro, sem editar. É esse texto que vira a ficha no site.

Se a IA reclamar de alguma coisa ou entregar um JSON incompleto, mande de novo o prompt e peça para ela
refazer seguindo as instruções.

### 6. Separe as três imagens

O mural pede **no mínimo três fotos do personagem, cada uma de um jeito diferente**:

| Foto | O que mostra |
|---|---|
| **Retrato** | meio corpo, olhando para a câmera, a atitude padrão. É a capa do card. |
| **Close** | rosto de perto: cicatriz, cromo, olhar, uma emoção diferente da capa. |
| **Corpo inteiro** | corpo inteiro ou em ação: roupa, arma, veículo, cenário. |

Se quiser mandar mais, até seis: uma cena de RP (bar, perseguição, negociação), o personagem antes do cromo,
uma foto com a equipe.

Regras das imagens:

- **deitada (16:10) ou quadrada**, nunca em pé — o card corta em formato paisagem e perde a cabeça ou o corpo;
- **rosto no terço superior**, perto do centro, porque é para lá que o card dá zoom;
- fundo com contexto (o distrito, um interior, as Badlands), não só fundo neutro;
- JPG ou WebP, pelo menos 1200 px no lado maior, até uns 500 KB cada.

Não tem as três ainda? Peça para a IA descrever cada uma e use a descrição para gerar ou fotografar.

### 7. Mande para o Baldo Knox

Junte o JSON e as três imagens e **envie para o Baldo Knox no servidor da Afterlife** (Discord do Afterlife
Roleplay). Ele confere a ficha, coloca no mural e te avisa quando estiver no ar.

O que mandar:

- o JSON copiado da IA, inteiro, sem editar;
- as três imagens, com os nomes `01-retrato`, `02-close` e `03-corpo-inteiro` (o formato pode ser `.jpg` ou
  `.webp`);
- o nome do personagem e o seu nome no servidor, para ele saber de quem é a ficha.

O ID da ficha você não precisa se preocupar: o mural gera um número para cada personagem.

---

## O que a ficha precisa ter

Referência rápida do padrão. A IA já segue isso, mas vale conferir antes de mandar.

| Campo | O que é | Valores aceitos |
|---|---|---|
| `nome` | nome completo do personagem | livre |
| `alias` | apelido ou antigo sobrenome | até 18 caracteres |
| `origem` | de onde ele veio | **Nômade**, **Marginal** ou **Corp** — só uma |
| `habilidades` | os dois atributos mais fortes | **Corpo**, **Reflexos**, **Habilidade Técnica**, **Inteligência**, **Moral** |
| `builds` | o estilo de jogo | **Netrunner**, **Ninja / Samurai**, **Tank**, **Velocista com Sandevistan**, **Pistoleiro / Atirador Furtivo** |
| `resumo` | uma frase que resume quem ele é | até 120 caracteres |
| `stats` | os cinco atributos no radar | inteiros de 0 a 100 |
| `meta` | Ocupação, Base, Reputação e Status | Ocupação/Base/Reputação livres; Status: **Ativo**, **Inativo**, **Desaparecido**, **Morto** ou **Rascunho** |
| `imagens` | as fotos da galeria | mínimo três |
| `capitulos` | a história em abas | 5 a 8 pontos-chave, o último é o **Perfil** |

**Categorias são fechadas.** Origem, habilidades e build só existem nesses valores — não dá para criar
"Mercenário" como origem nem "Lábia" como habilidade. Profissão vai em **Ocupação**, e características
pessoais vão no **Perfil**.

**História em capítulos.** Cada aba é um ponto da vida, com título curto: `Armitage`, `Massacre`,
`A verdade`, `Mercenário`, `Objetivo`, `Perfil`. A última aba sempre traz a tabela de personalidade (Humor,
Inteligência, Ego, Ambição, Moralidade, Família e um eixo livre) e uma frase de assinatura do personagem.

**Nada de "a definir".** O que ficou em aberto vira gancho para você jogar, não texto na ficha. A página é
pública e é o que os outros jogadores leem.

---

## Para quem mexe no código

O site é Next.js com export estático e publica no GitHub Pages a cada push em `master`.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # gera out/
npm run preview # confere o out/ localmente
```

Cada personagem é uma pasta em `src/data/personagens/<slug>/` com um JSON e as imagens. O mural lê tudo
sozinho; o formato completo dos campos está em [`src/data/personagens/README.md`](src/data/personagens/README.md).
Antes de cada `dev`/`build`, o script `scripts/sincronizar-imagens.mjs` copia as imagens para
`public/fichas/<slug>/`, porque o export estático não lê arquivos do disco.

O deploy roda pelo workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) com
`NEXT_PUBLIC_BASE_PATH=/cyberpunkrp-interactivecards`. Em **Settings → Pages → Build and deployment →
Source**, escolha **GitHub Actions**.
