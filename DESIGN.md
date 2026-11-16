# DESIGN.md — Identidade Visual do Mural Afterlife RP

Sistema visual para o mural de fichas de personagens do **Afterlife Roleplay** (servidor de Cyberpunk 2077, em português, rodando sobre o mod multiplayer OPEN//77).

**Referências:** `afterliferoleplay.com.br` (a cidade e a comunidade — referência principal) e `OPEN//77` (o mod; mesma linguagem visual). As cores foram amostradas por pixel das capturas do OPEN//77 e da **logo do Afterlife**; a estética é a mesma da referência, com **o vermelho da logo como cor principal**.

---

## 1. Princípios

| Princípio | O que significa na prática |
|---|---|
| **Escuridão primeiro** | Fundo quase preto azulado. A cor só aparece em superfícies, títulos, botões e ícones. Nunca preencha grandes áreas de branco. |
| **Vermelho é a marca** | O coral da logo (`#FF645B`) comanda CTA, logo, destaques e seleção. É o primeiro acento que o olho encontra. |
| **Acento em bloco** | Vermelho, ciano e amarelo entram chapados (botões, painéis diagonais, números), nunca em gradientes suaves. |
| **Tudo é anguloso** | Zero cantos arredondados na interface. Botões e cards são paralelogramos (skew), cortados por clip-path ou marcados por "//". A única forma arredondada do sistema é o "pill" da logo. |
| **Tipografia como grafite** | Títulos enormes, caixa alta, itálicos e pesados. São a imagem; a foto entra por baixo ou recortada. |
| **Interface de terminal** | Labels em monoespaçada, caixa alta, espaçamento largo e prefixo `//` (ex.: `/// afl.sinal_ao_vivo`, `// afl.ficha_014`). |
| **Glow controlado** | Brilho só em interação e números de destaque. O resto é fosco, com grão e vinheta. |

---

## 2. Cores

### 2.1 Base (fundo e superfícies)

| Token | Hex | Uso |
|---|---|---|
| `--bg` | `#060D17` | Fundo global (azul-noite quase preto) |
| `--bg-deep` | `#030812` | Vinheta, overlays sobre fotos, rodapé |
| `--surface-1` | `#0A121C` | Navbar translúcida, cards, painéis |
| `--surface-2` | `#111A26` | Hover de card, inputs, linhas de tabela |
| `--surface-3` | `#18222F` | Elemento pressionado / selecionado |
| `--line` | `rgba(255,255,255,0.08)` | Hairlines, bordas neutras, divisores |
| `--line-strong` | `rgba(255,255,255,0.16)` | Borda de input, contorno em foco |
| `--text` | `#F4F7FB` | Texto principal |
| `--text-muted` | `#9AA6B5` | Parágrafos secundários, legendas |
| `--text-dim` | `#7C8797` | Metadados, texto legal, rodapé (mantém AA) |

### 2.2 Acentos

| Token | Hex | Papel | Onde aparece |
|---|---|---|---|
| `--red` | `#FF645B` | **Marca / ação primária** | Logo, CTA principal, títulos de destaque, borda ativa, stats |
| `--red-deep` | `#E04B43` | Hover/pressed do vermelho | Estados de botão vermelho |
| `--red-hot` | `#FF2F27` | **Alerta / erro** (vermelho puro) | Status "fora do ar", badges críticos, foco de erro |
| `--cyan` | `#08DAE9` | **Informação / ferramenta** | Links, badge de versão, status "online", dados ao vivo |
| `--yellow` | `#FCEE0A` | **Destaque / aviso** | Números-chave, banner de aviso, pílulas de atenção |
| `--white` | `#FFFFFF` | Títulos neutros | Títulos sobre foto, números brancos |

> **Por que o vermelho da logo é coral, não "bombeiro":** o arquivo da logo usa `#FF645B` como cor sólida, com contorno em vermelho mais saturado (`#FF5151`–`#FF2F27`). Usar o coral como preenchimento e o vermelho puro só em contorno/glow mantém a logo coerente e evita o visual de "erro do sistema" em todo botão.

### 2.3 Regra dos três acentos

Cada área do site "pertence" a uma cor, e nunca há dois acentos brigando no mesmo componente:

- **Vermelho** → marca, navegação ativa, CTA principal, ficha selecionada.
- **Ciano** → informação viva: sinal, online, links, versão, ferramentas.
- **Amarelo** → atenção: números de status, avisos, contadores, whitelist aberta.

### 2.4 Tokens semânticos

| Token | Valor | Uso |
|---|---|---|
| `--primary` | `var(--red)` | Botão principal, seleção, foco |
| `--primary-ink` | `#0A0A00` | Texto sobre vermelho/ciano/amarelo (sempre preto) |
| `--info` | `var(--cyan)` | Links, badges informativos, "no ar" |
| `--danger` | `var(--red-hot)` | Erros, "fora do ar", ações destrutivas |
| `--warning` | `var(--yellow)` | Avisos (banner com borda amarela e fundo `rgba(252,238,10,.06)`) |
| `--focus-ring` | `0 0 0 2px var(--bg), 0 0 0 4px var(--red)` | Foco de teclado |

### 2.5 Transparências e efeitos

```css
--accent-glow:    0 0 24px color-mix(in srgb, var(--accent) 45%, transparent);
--accent-soft:    color-mix(in srgb, var(--accent) 12%, transparent); /* fundo de chip */
--accent-border:  color-mix(in srgb, var(--accent) 55%, transparent); /* borda de card */
--scrim:          linear-gradient(180deg, rgba(3,8,18,.55) 0%, rgba(3,8,18,.15) 45%, rgba(3,8,18,.85) 100%);
--grain-opacity:  .06;
```

**Contraste (calculado):**

| Combinação | Razão | Veredito |
|---|---|---|
| `#F4F7FB` sobre `#060D17` | ≈ 18:1 | AAA |
| `#9AA6B5` sobre `#060D17` | ≈ 7.9:1 | AA/AAA |
| `#7C8797` sobre `#060D17` | ≈ 5.3:1 | AA |
| `#FF645B` sobre `#060D17` (texto) | ≈ 5.4:1 | AA |
| Preto `#0A0A00` sobre `#FF645B` (botão) | ≈ 7.2:1 | AAA |
| Preto sobre `#08DAE9` | ≈ 12:1 | AAA |
| Preto sobre `#FCEE0A` | ≈ 17:1 | AAA |
| Branco sobre `#FF645B` | ≈ 2.9:1 | **reprovado** — nunca usar |

> Regra fixa: **texto sobre cor de acento é sempre preto** (`--primary-ink`). Branco só sobre `--bg` ou foto escurecida.

---

## 3. Tipografia

### 3.1 Famílias

| Função | Fonte | Configuração | Alternativas |
|---|---|---|---|
| **Display** (títulos, botões, números grandes) | **Archivo** (variável) | `wght 800–900`, `italic`, `wdth 100–112`, uppercase, `letter-spacing: -0.01em` a `-0.02em` | Anton (com `skewX(-8deg)`), Archivo Black Italic |
| **Texto** (parágrafos, descrições de ficha) | **Geist Sans** | `wght 400–500`, `line-height 1.55`, 15–18px | Inter |
| **Interface/mono** (labels, datas, tags, metadados) | **Geist Mono** | `wght 500`, 11–12px, uppercase, `letter-spacing: .16em–.22em` | JetBrains Mono, IBM Plex Mono |

```ts
// src/app/fonts.ts
import { Archivo, Geist, Geist_Mono } from "next/font/google";

export const display = Archivo({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["wdth"],
  variable: "--font-display",
});
export const sans = Geist({ subsets: ["latin"], variable: "--font-sans" });
export const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });
```

> O template `--empty` não traz fontes configuradas: as três acima vêm de `next/font/google` (self-hosted no build, sem requisição externa em runtime).

### 3.2 Escala

| Papel | Tamanho | Peso/estilo | Observações |
|---|---|---|---|
| Hero | `clamp(56px, 9vw, 148px)` | 900 itálico, uppercase | `line-height: .86`, 2–3 linhas, pode sangrar a tela |
| Título de seção | `clamp(32px, 4.4vw, 64px)` | 900 itálico | Ex.: "DOMINE AS RUAS" |
| Título de card | `clamp(24px, 2.4vw, 40px)` | 900 itálico | Nome do personagem no card |
| Subtítulo | `18–22px` | 700 itálico | |
| Corpo | `15–17px` | 400, `--text-muted` em blocos longos | Máx. ~62ch |
| Label/eyebrow | `11px` mono 500 | uppercase, `letter-spacing: .2em`, cor do acento | Prefixo `// ` ou `/// ` |
| Metadado | `12px` mono | `--text-dim` | Datas, IDs, contadores |
| Números de stat | `clamp(40px, 6vw, 72px)` | 900 itálico | Cor do acento |

**Regras:** títulos sempre uppercase e itálicos; nunca justifique texto; rótulos sempre em mono; títulos de seção podem terminar em ponto ("DEVBLOG.", "DO SEU JEITO.") como assinatura gráfica.

---

## 4. Layout e grid

- Container: `max-width: 1280px`, gutter `24px` (mobile) / `32px` (desktop).
- Seções full-bleed para fundos de imagem; conteúdo no container.
- Espaçamento vertical entre seções: `96px` mobile / `160px` desktop.
- Escala (4pt): `4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160`.
- Grid do mural: 1 coluna (<640px), 2 (640–1024), 3 (1024–1440), 4 (≥1440), gap `24px`.
- Navbar fixa, `height: 68px`, fundo `rgba(6,13,23,.82)` + `backdrop-filter: blur(12px)`, hairline inferior.
- Cantos: **`border-radius: 0`** em toda a interface.

---

## 5. Formas e grafismos

| Grafismo | Especificação | CSS |
|---|---|---|
| **Paralelogramo** | Botões e cards com `skewX(-6deg)`; conteúdo interno com `skewX(6deg)`. Cards de destaque usam `-4deg`. | `transform: skewX(-6deg)` |
| **Corte de canto** | Recorte de 12–16px no canto superior direito | `clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)` |
| **Tiras "///"** | 3 barras de 3px a 45°, espaçadas 4px, à esquerda do CTA | utilitário `.stripes` |
| **Hairline** | Linha de 1px `--line`; acentuada, 1px na cor do acento | `border: 1px solid var(--line)` |
| **Sombra sólida** | Deslocamento duro sem blur (`6px 6px 0 var(--red)`) para hierarquia máxima | `box-shadow: 6px 6px 0 var(--accent)` |
| **Glow** | Só em hover/ativo e em números de stat | `box-shadow: var(--accent-glow)` |
| **Grão** | Overlay fixo, `opacity .06`, `mix-blend-mode: overlay` | SVG `feTurbulence` |
| **Scanlines** | Linhas de 3px, `rgba(255,255,255,.03)`, em heroes com foto | `repeating-linear-gradient(0deg, rgba(255,255,255,.03) 0 1px, transparent 1px 3px)` |
| **Vinheta** | Escurece bordas de imagem para o texto respirar | `--scrim` |
| **Letra gigante fantasma** | Tipografia de fundo em outline (`-webkit-text-stroke: 1px rgba(0,0,0,.35)`) cortada pelas bordas | ver painel diagonal |
| **Wordmark com gradiente** | No rodapé: vermelho → ciano (pode terminar em amarelo) com grão | `linear-gradient(90deg, #FF645B, #08DAE9 70%, #FCEE0A)` |

### Tratamento de imagem

Fotos de personagem entram com leve dessaturação (`filter: saturate(.9) contrast(1.05)`), overlay azul-noite (`multiply` com `rgba(6,13,23,.35)`) e vinheta. Em hero, o personagem pode ficar recortado à direita, sem fundo, sobre o cenário desfocado.

---

## 6. Logo

Arquivo: [`public/logo.png`](public/logo.png) — PNG 1200×395, fundo transparente, proporção ≈ 3:1. Formato "pill" com canto em seta à esquerda; cor sólida `#FF645B` com contorno vermelho saturado e textura listrada interna.

| Situação | Especificação |
|---|---|
| **Navbar** | Altura `28–32px`, centralizada entre os grupos de links (como o wordmark da referência) |
| **Hero / rodapé** | Largura `240–480px`, alinhada à esquerda do container |
| **Sobre foto** | `filter: drop-shadow(0 6px 28px rgba(0,0,0,.55))` para destacar o contorno vermelho |
| **Sobre fundo escuro** | Usar o arquivo original — o coral tem contraste suficiente sobre `#060D17` |
| **Sobre vermelho/amarelo/ciano** | Usar versão monocromática preta ou branca (a original some) |
| **Área de respiro** | No mínimo 25% da altura da logo em todos os lados |

**Não fazer:** recolorir, aplicar gradiente, girar, achatar a proporção, colocar a logo dentro de outro retângulo ou usar o texto "AFTERLIFE" como fonte substituta.

Favicon: recortar o símbolo de seta à esquerda (o "A" estilizado) em quadrado 512×512 e usar como `src/app/icon.png`.

---

## 7. Componentes

### 7.1 Navbar

- Esquerda: ícones quadrados 36×36 (Discord, entrar na cidade) com hairline; ativo com borda vermelha.
- Links 11px mono uppercase, `letter-spacing .16em`, `--text-muted`; hover `--text`.
- Centro: `logo.png` a 30px de altura.
- Direita: indicador "no ar" (ponto ciano + texto mono) e ícone de perfil.
- Link ativo: cor do acento + linha de 2px abaixo.

### 7.2 Botões

```css
.btn {
  height: 56px;
  padding: 0 40px;
  display: inline-flex; align-items: center; gap: 12px;
  font-family: var(--font-display);
  font-weight: 800; font-style: italic;
  font-size: 16px; letter-spacing: .04em; text-transform: uppercase;
  transform: skewX(-6deg);
  border: 0; cursor: pointer;
  transition: box-shadow .18s ease, background-color .18s ease, transform .18s ease;
}
.btn > * { transform: skewX(6deg); }
.btn--primary { background: var(--red); color: var(--primary-ink); }
.btn--primary:hover { background: var(--red-deep); box-shadow: 0 0 28px rgba(255,100,91,.45); transform: skewX(-6deg) translateX(2px); }
.btn--cyan    { background: var(--cyan); color: var(--primary-ink); }
.btn--yellow  { background: var(--yellow); color: var(--primary-ink); }
.btn--outline { background: transparent; color: var(--accent); box-shadow: inset 0 0 0 1px var(--accent); }
.btn--ghost   { background: transparent; color: var(--text-muted); }
```

- **Primário:** vermelho coral, texto preto, 3 tiras "///" à esquerda (fora do botão).
- **Secundário:** outline de 1px na cor do acento.
- **Compacto** (filtros, chips): altura 36px, padding 0 18px, 12px, mesmo skew.
- Alvo de toque mínimo: 44px.

### 7.3 Label / eyebrow

```css
.label {
  font-family: var(--font-mono);
  font-size: 11px; font-weight: 500;
  letter-spacing: .2em; text-transform: uppercase;
  color: var(--accent, var(--red));
}
```

### 7.4 Card de personagem (mural) — componente central

Estrutura (inspirada nos cards "ROLEPLAY / REESCREVA AS REGRAS"):

```
┌──────────────────────────────────────────┐  ← borda 1px na cor do acento
│ [EYEBROW MONO]              [#001]       │  ← classe + ID da ficha
│                                          │
│           FOTO DO PERSONAGEM             │  ← proporção 4:5, overlay escuro
│                                          │
│ NOME ARTÍSTICO EM DISPLAY ITÁLICO        │  ← 2 linhas no máximo
│ Uma linha de conceito em --text-muted    │
│ [CLASSE] [IDADE] [DISTRITO]   [→ ABRIR]  │  ← chips mono
└──────────────────────────────────────────┘
```

- `aspect-ratio: 3/4` (mobile) e `4/5` (desktop); `skewX(-4deg)` opcional, sem aplicar em todas as fichas.
- Borda 1px `--accent-border`; hover → borda 100% do acento, card sobe `-4px`, foto `scale(1.04)`.
- Chip de classe: fundo `--accent-soft`, texto do acento, 10–11px mono.
- Status: ponto de 6px + texto mono — ciano = ativo, amarelo = atenção, vermelho puro = inativo.
- Página da ficha: hero com retrato sangrando à direita, nome gigante sobrepondo, coluna de atributos à esquerda, abas `PERFIL / HISTÓRIA / RELAÇÕES / CYBERWARE` com indicador de 2px.

### 7.5 Painel diagonal de categoria

Seção com 2–3 painéis paralelos inclinados (`skewX(-10deg)` no painel, conteúdo reto):

- **Personagens** → vermelho, texto preto, letra gigante fantasma "AFTERLIFE" atrás.
- **Facções** → ciano.
- **Jornal / Arquivo** → amarelo.

Título em display preto, máximo 3 palavras por linha, alinhado à direita para criar o ritmo diagonal.

### 7.6 Outros

- **Inputs:** fundo `--surface-1`, borda 1px `--line-strong`, altura 48px, mono 13px, sem raio; foco com borda vermelha e glow suave.
- **Tabela de stats:** número display 900 + label mono 11px, hairline vertical entre colunas.
- **Banner de aviso:** fundo `rgba(252,238,10,.06)`, borda amarela, ícone triangular.
- **Divisor:** hairline com traço curto de 40px na cor do acento à esquerda.
- **Footer:** texto legal 12px `--text-dim`, wordmark gigante com gradiente vermelho→ciano cortado na base, hairline superior.

---

## 8. Aplicação no Afterlife RP

| Área | Acento | Direção |
|---|---|---|
| Home / mural | Vermelho | Hero com arte da cidade, título gigante, grid de fichas, CTA "VER FICHAS" |
| Ficha de personagem | Vermelho | Hero com retrato, nome display, stats, abas |
| Facções / territórios | Ciano | Lista de painéis, mapa de território, links |
| Jornal / notícias / regras | Amarelo | Posts com metadados mono, filtros, números grandes |
| Status do servidor | Ciano + amarelo + vermelho puro | Sinal online, disponibilidade, incidentes |

**Vocabulário visual** (vindo do site do Afterlife): `/// afl.sinal_ao_vivo`, `// transmissao_ao_vivo · sinal.2077`, `Plantão NC`, `Whitelist aberta`, `Jornal da cidade`, `CH 02–CH 08`, `Toda lenda começa no Afterlife`, `Versão 2.50.0+op77`. Reaproveite esse tom nos labels do mural: `// afl.mural_fichas`, `// afl.ficha_014 · ativo`.

**Codificação por classe (opcional):** Solo e Nomad → vermelho; Netrunner e Techie → ciano; Fixer e Corpo → amarelo. Use só em chips, bordas e detalhes, nunca no fundo inteiro do card.

---

## 9. Motion

- Durações: `120ms` (micro), `180ms` (hover), `400ms` (entrada), `800ms` (hero).
- Easings: `cubic-bezier(.2,.8,.2,1)` para entrada; `ease-out` para hover.
- Hover de card: `translateY(-4px)`, escala da imagem, borda acende.
- Entrada de seção: fade + `translateY(24px)`, `stagger 60ms` nos cards.
- Glitch/scanline: só em hovers pontuais (logo, números), 200ms; nunca em loop que atrapalhe a leitura.
- Respeitar `prefers-reduced-motion: reduce`.

---

## 10. Acessibilidade

- Foco visível com `--focus-ring` em links, botões, cards clicáveis e inputs.
- Contraste AA em todo texto (tabela em 2.5); texto sobre acento sempre preto.
- Não use cor como único indicador de status: acompanhe com texto ("NO AR", "OFFLINE").
- Títulos display são `<h1>`/`<h2>` reais, não divs.
- Imagens de personagem com `alt` descritivo.
- Corpo mínimo 15px; metadados 12px; alvos de toque ≥ 44×44px.

---

## 11. Tokens prontos (Tailwind v4 — `src/app/globals.css`)

```css
@import "tailwindcss";

@theme {
  --color-bg: #060D17;
  --color-bg-deep: #030812;
  --color-surface-1: #0A121C;
  --color-surface-2: #111A26;
  --color-surface-3: #18222F;
  --color-line: rgba(255, 255, 255, 0.08);
  --color-line-strong: rgba(255, 255, 255, 0.16);
  --color-text: #F4F7FB;
  --color-muted: #9AA6B5;
  --color-dim: #7C8797;
  --color-red: #FF645B;
  --color-red-deep: #E04B43;
  --color-red-hot: #FF2F27;
  --color-cyan: #08DAE9;
  --color-yellow: #FCEE0A;
  --color-ink: #0A0A00;

  --font-display: var(--font-archivo), "Archivo Black", sans-serif;
  --font-sans: var(--font-geist-sans), system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, monospace;

  --shadow-glow-red: 0 0 28px rgba(255, 100, 91, 0.45);
  --shadow-glow-cyan: 0 0 28px rgba(8, 218, 233, 0.45);
  --shadow-glow-yellow: 0 0 28px rgba(252, 238, 10, 0.45);
}

@layer utilities {
  .skew-tile { transform: skewX(-6deg); }
  .unskew   { transform: skewX(6deg); }
  .notch-tr {
    clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%);
  }
  .stripes {
    background-image: repeating-linear-gradient(
      115deg,
      currentColor 0 3px,
      transparent 3px 8px
    );
  }
  .grain::after {
    content: "";
    position: fixed; inset: 0; z-index: 60; pointer-events: none;
    opacity: .06; mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }
  .scanlines {
    background-image: repeating-linear-gradient(
      0deg, rgba(255,255,255,.03) 0 1px, transparent 1px 3px
    );
  }
}
```

Uso: `bg-bg text-text border-line`, `text-red`, `bg-red text-ink`, `font-display italic font-black uppercase`.

---

## 12. Do / Don't

**Faça**
- Títulos enormes, itálicos, caixa alta, quebrando linha no meio.
- Vermelho coral chapado com texto preto nos CTAs.
- Hairlines finas e muito espaço negativo preto.
- Fotos escuras com vinheta e personagem recortado.
- Labels mono com `//` e metadados com `·`.

**Não faça**
- Arredondar cantos (só a logo é arredondada), sombras difusas grandes ou gradientes "smooth".
- Vermelho, ciano e amarelo no mesmo componente.
- Texto branco sobre vermelho/ciano/amarelo.
- Rosa/magenta fora da paleta — com vermelho como marca, o rosa da referência antiga sai de cena.
- Glassmorphism, neon roxo ou glitch em tudo.
- Texto corrido em display itálico — display só para títulos curtos.

---

## 13. Checklist de QA visual

- [ ] Nenhum `border-radius` > 0 na interface.
- [ ] Vermelho só em superfícies pequenas/médias e texto de destaque.
- [ ] Todo botão tem hover, focus-visible e active.
- [ ] Labels em mono, uppercase, tracking ≥ .16em.
- [ ] Logo com área de respiro e sem recolorir.
- [ ] Fotos com overlay suficiente para o nome legível a 320px.
- [ ] Contraste AA (texto sobre acento = preto).
- [ ] Layout em 360px, 768px, 1280px e 1920px sem overflow horizontal (cuidado com skew e títulos gigantes).
- [ ] `prefers-reduced-motion` respeitado.

---

## 14. Referências

**Logo Afterlife** (`public/logo.png`): coral `#FF645B` sólido, contorno vermelho saturado, pill com canto em seta, wordmark AFTERLIFE em itálico com listras.

**Afterlife Roleplay** (`afterliferoleplay.com.br`): labels `/// afl.…`, status ao vivo ("0 / 1024 na cidade"), "Programação da cidade" em canais CH 02–CH 08, "Jornal da cidade", regras, "Toda lenda começa no Afterlife".

**OPEN//77** (capturas analisadas): navbar com wordmark central, hero full-bleed, cards paralelogramo com borda colorida, painéis diagonais amarelo/ciano/rosa (aqui: vermelho/ciano/amarelo), botões skew com tiras "///", devblog com metadados mono, status com números gigantes, rodapé com wordmark em gradiente.

---

## 15. Layout do mural (implementado)

O mural segue o esqueleto do protótipo do Claude, que é a referência de layout: cabeçalho curto, título gigante inclinado, barra de filtros em linha, grade de cards e rodapé discreto. A identidade do DESIGN.md entra pelas cores, tipografia e texturas, não pela estrutura.

| Bloco | Medida | Observação |
| --- | --- | --- |
| Margem lateral | `clamp(18px, 3vw, 46px)` | mesma nos dois lados do cabeçalho, da grade e do rodapé |
| Eyebrow | mono 11px, tracking `.28em`, coral | `/// afterlife//rp · banco de dados` |
| Título | Archivo itálico 800, `clamp(32px, 6.2vw, 74px)`, `skewX(-8deg)` | "MURAL DE" branco + "PERSONAGENS" coral |
| Barra | busca 40px, chips 28px, select 40px, gap 12/18px | busca e ordenação na primeira linha; Origem, Habilidades e Builds empilhadas, uma categoria embaixo da outra |
| Grade | `repeat(auto-fill, minmax(min(310px, 100%), 1fr))`, gap 30px, máx. 1240px | 3 colunas a 1308px, 2 a 820px, 1 no celular |
| Card | moldura 2px, corte de 26px no canto superior direito e inferior esquerdo | a imagem entra com 8px de respiro |
| Galeria | proporção 16/10, corte de 18px no canto superior direito | selos ID/contador, setas, marca d'água |
| Corpo | padding 14px 12px 20px sobre o respiro de 8px | tags de origem e build, tags amarelas de habilidade, headline branca da virada de chave, nome 24px amarelo, resumo, painel de status, ações |
| Ações | `STATUS +` outline e CTA coral de largura total | CTA com tiras `///` e corte em paralelogramo |
| Rodapé | mono 11px, `--color-dim` | contagem de fichas e origem dos dados |

Todas as classes do mural usam o prefixo `m-` e vivem em `src/app/mural.css`, importado no `layout.tsx` logo depois de `globals.css`. O prefixo evita colisão com utilitários do Tailwind, e o arquivo ser importado direto no layout evita o problema de `@import` declarado depois da expansão do Tailwind, que fazia o navegador descartar a folha inteira.

Interações preservadas do protótipo: busca por nome/alias, chips de origem, habilidades e builds, ordenação A–Z/ID via `order`, galeria com setas, arraste e troca real de fotos, contador `01/03`, status expansível com star plot, hover letra a letra no nome, modal com abas, descriptografia, Esc e setas, foco preso no diálogo e `prefers-reduced-motion`.

### 15.1 Interações do card e dos filtros

**Nitidez:** parado, o card fica a ~90% de nitidez (`filter: blur(0.4px) saturate(.94)` na moldura e `blur(0.55px)` na foto). Em hover, `:focus-within` ou com a ficha aberta no modal (`data-ativo="true"`), o filtro cai para `none` e o card fica 100% nítido — o hover nunca desfoca. Em telas de toque e abaixo de 640px (`hover: none`, `pointer: coarse`, `max-width: 640px`) todo card fica 100% nítido o tempo todo.

**Tilt 3D:** no desktop, o card inclina até 3,5° nos dois eixos acompanhando o mouse (`useTilt`, perspectiva 1400, retorno suave em 0,4s) e volta ao plano quando o ponteiro sai. Para o texto não sair lavado, o hover não aplica `filter` no card — nada de `drop-shadow` junto com a rotação —, o que mantém a camada de texto rasterizada no tamanho final.

**Galeria:** cada imagem da pasta é um slide real, sem recortes falsos da mesma foto. No desktop, passar o mouse na foto aplica o close no rosto (`scale(1.45)`, origem `50% 40%`) por transição de 1,6s e troca para a próxima foto a cada 1,7s. O zoom é uma propriedade do conjunto, não de um slide: todas as fotos já estão em 1,45 quando o mouse está em cima, então a troca acontece no enquadramento fechado, sem voltar para o plano aberto nem reiniciar o movimento, e a foto que fica é a última exibida. No toque, as setas e o arraste continuam valendo. Contador e setas só aparecem quando a pasta tem mais de uma imagem.

**Status (star plot):** o botão abre um radar SVG com cinco eixos, um por habilidade (`Corpo`, `Reflexos`, `Técnica`, `Inteligência`, `Sangue Frio`), anéis a cada 20 pontos, área vermelha translúcida, rótulos brancos em mono 15px no viewBox (com quebra em duas linhas para Sangue Frio) e valor em amarelo abaixo de cada rótulo. Os valores vêm de `stats` casados pelo rótulo (`src/lib/atributos.ts`); atributo sem valor entra como zero e, se nenhum rótulo bater, os stats viram linhas de texto. Abaixo do gráfico ficam os campos `meta` (Ocupação, Base, Reputação, Status). A grade usa `align-items: start`, então só o card aberto cresce e os vizinhos mantêm a altura.

**Botões:** o texto quebra em letras individuais mascaradas (`BotaoSplit`). Ao passar o mouse, a camada de cima sobe e sai pela máscara enquanto a de baixo entra, em cascata de 28ms, no mesmo espírito do `SplitText` do croe-web. O texto real fica em `.sr-only` para leitores de tela, e o efeito é desligado com `prefers-reduced-motion`.

**Filtros:** o bloco abre com o label `/// afl.filtros · refinar banco de dados`, seguido de duas linhas. Na primeira, busca e ordenação, cada um com sua headline. Na segunda, três grupos com headline própria: **Origem** (ícone de bebê; `Nômade`, `Marginal`, `Corpo`), **Habilidades** (ícone de atividade; os cinco atributos `Corpo`, `Reflexos`, `Habilidade Técnica`, `Inteligência`, `Moral / Sangue Frio`) e **Builds** (ícone de robô; `Netrunner`, `Ninja / Samurai`, `Tank / Solo Brutal`, `Velocista com Sandevistan`, `Pistoleiro / Atirador Furtivo`). Cada chip traz o ícone do valor, tirado do Bootstrap Icons (MIT) e embutido como path em `src/components/mural/icones.tsx`; `iconeDe(valor, grupo)` escolhe pelo grupo para que "Corp" (origem) e "Corpo" (habilidade) não usem o mesmo símbolo.

**Categorias no card:** a origem sai em tag ciano (`Nômade`, `Marginal`, `Corp`), cada build em tag vermelha, e as habilidades em tags amarelas com fundo `rgba(252,238,10,.07)` e borda translúcida, no mesmo peso visual das outras. A headline da virada de chave (`ex-Armitage`) é branca e vem logo antes do nome, que usa o amarelo `#FCEE0A` do DESIGN.md tanto no card quanto no modal. O modelo de dados aceita uma origem, N habilidades e N builds por ficha (`src/lib/categorias.ts` guarda as listas oficiais).
