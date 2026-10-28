# Auditoria de acessibilidade — BlueSight

Registro das alterações feitas na landing page durante a auditoria WCAG 2.2 nível AA, com o motivo de cada uma.

- **Escopo:** HTML semântico, contraste de cores, texto alternativo, navegação por teclado, formulários e atributos ARIA.
- **Data:** outubro de 2026
- **Estado:** todas as alterações aplicadas e validadas, ainda **sem commit**.

---

## 1. Como a auditoria foi feita

| Etapa | Ferramenta | Observação |
|---|---|---|
| Varredura de regras | `scan_html` do WebAbility MCP (detectores WebAbility + axe-core, 164 regras) | O servidor hospedado recusa `localhost`, então a varredura rodou sobre uma réplica fiel do DOM renderizado |
| Validação de ARIA | `check_aria` (WebAbility MCP) | Mesma réplica |
| Contraste | `check_color_contrast` (WebAbility MCP) | Cada par de cores calculado individualmente |
| Revisão visual | Edge headless controlado por CDP (`Emulation.setFocusEmulationEnabled`, `Input.dispatchKeyEvent`) | Medições de layout, capturas por seção e testes reais de teclado em 320–1440px |

A réplica estática foi necessária porque o `scan_page` exige uma URL pública. Ela reproduz o DOM final renderizado, incluindo imagens com `alt`, landmarks e o estado do menu.

---

## 2. Arquivos alterados

| Arquivo | Alterações |
|---|---|
| `index.html` | Idioma do documento |
| `.figma/make/site.json` | Título, idioma e descrição do site |
| `src/App.tsx` | Landmarks, skip link, ARIA do menu, headings, CTA, acentuação |
| `src/features/useMenu.ts` | `closeMenu` e fechamento com `Esc` |
| `src/index.css` | Tokens de contraste, skip link, anel de foco, escala tipográfica, layout mobile |
| `src/shared/types.ts` | Tipos das entidades corrigidos |
| `src/widgets/ProductPhoto.tsx` | Remoção de código morto |
| `src/widgets/ProductGlasses.tsx` | Remoção de import morto e de chave de fechamento ausente |

---

## 3. Alterações por arquivo

### 3.1 `index.html`

```diff
-<html lang="<!-- figma:lang -->">
+<html lang="pt-BR">
```

**Motivo.** O `lang` era um placeholder não resolvido. Sem idioma declarado, leitores de tela usam a voz padrão do sistema e pronunciam o português com fonética errada — "Benefícios" lido como inglês, por exemplo.
**Critério:** 3.1.1 Idioma da página (A).

### 3.2 `.figma/make/site.json`

```diff
-  "description": "Create high-resolution screens based on specified layouts and rules...",
+  "title": "BlueSight — Óculos inteligentes de mergulho",
+  "language": "pt-BR",
+  "description": "Conceito de óculos de mergulho inteligentes com identificação de animais marinhos por IA, realidade aumentada, câmera integrada e sensores ambientais.",
```

**Motivo.** O `index.html` contém `<!-- figma:title -->`, e o plugin `figmaSiteConfiguration` em `vite.config.ts` substitui esse comentário por `config.title ?? "Figma Make App"`. Como o `site.json` não definia `title`, o título publicado era literalmente **"Figma Make App"** — o primeiro e mais importante rótulo de uma página, usado na aba do navegador, no histórico e por leitores de tela ao anunciar o documento. A `description` também era o texto padrão do template, em inglês e sem relação com o produto.
**Critério:** 2.4.2 Título da página (A), 3.1.1 (A).
**Verificado em** `dist/index.html`:

```html
<html lang="pt-BR">
<title>BlueSight — Óculos inteligentes de mergulho</title>
<meta name="description" content="Conceito de óculos de mergulho inteligentes com...">
<meta property="og:title" content="BlueSight — Óculos inteligentes de mergulho">
```

### 3.3 `src/App.tsx` — landmarks

```diff
-  return (
-    <main>
+  return (
+    <>
+      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
       <header className="site-header">
...
+      <main id="conteudo" tabIndex={-1}>
         <section className="hero" id="inicio">
...
+      </main>
+
       <footer className="footer">
...
-    </main>
+    </>
```

**Motivo.** O `<header>` e o `<footer>` estavam **dentro** do `<main>`. Isso quebra a regra de que `main` contém o conteúdo principal e único da página: os landmarks `banner` e `contentinfo` deixavam de existir, e a navegação por regiões do leitor de tela não encontrava cabeçalho nem rodapé. O `<main>` passou a envolver apenas as seções de conteúdo, e o `header`/`footer` ficaram no nível do `body`.
**Critério:** 1.3.1 Informação e relações (A), 2.4.1 Ignorar blocos (A).

### 3.4 `src/App.tsx` + `src/index.css` — skip link

```diff
+      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
+      <main id="conteudo" tabIndex={-1}>
```

```diff
+.skip-link { position:absolute; left:16px; top:-80px; z-index:100; padding:14px 22px; background:var(--cyan); color:var(--deep); font-size:.82rem; font-weight:700; transition:top .2s; }
+.skip-link:focus { top:16px; }
+#conteudo:focus { outline:none; }
```

**Motivo.** A página tem 9.198px de altura e o menu tem 5 itens antes do conteúdo. Sem um atalho, quem usa teclado precisa tabular por todo o cabeçalho em cada visita. O link fica fora da tela (`top:-80px`) e aparece no primeiro `Tab`.
O `tabIndex={-1}` no `<main>` é necessário porque `main` não é focável por padrão — sem ele o navegador rola até a seção mas o foco continua no link, e o próximo `Tab` volta para o topo. O `outline:none` em `#conteudo:focus` evita um anel de foco em volta da página inteira, que seria ruído visual.
**Critério:** 2.4.1 Ignorar blocos (A), 2.4.3 Ordem do foco (A).

### 3.5 `src/App.tsx` + `src/features/useMenu.ts` — menu

```diff
-  const { menuOpen, toggleMenu } = useMenu()
+  const { menuOpen, toggleMenu, closeMenu } = useMenu()
```

```diff
             aria-controls="main-nav"
+            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
           >
             <span />
             <span />
             <span />
-            <span className="sr-only">Abrir menu</span>
           </button>
```

```diff
-            <a href="#produto" onClick={toggleMenu}>O produto</a>
+            <a href="#produto" onClick={closeMenu}>O produto</a>
```

```ts
const toggleMenu = useCallback(() => setMenuOpen((open) => !open), [])
const closeMenu = useCallback(() => setMenuOpen(false), [])

useEffect(() => {
  if (!menuOpen) return

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') setMenuOpen(false)
  }

  document.addEventListener('keydown', onKeyDown)
  return () => document.removeEventListener('keydown', onKeyDown)
}, [menuOpen])
```

**Motivo.** Três problemas distintos:

1. **Nome acessível estático.** O texto "Abrir menu" estava em um `<span class="sr-only">` fixo. Quando o menu abria, o botão continuava anunciando "Abrir menu" — informação invertida. Agora o `aria-label` reflete o estado (`aria-expanded` já estava correto).
2. **Toggle em vez de fechar.** Os links da navegação chamavam `toggleMenu`. Em telas ≥768px o menu já está visível, então clicar em "Benefícios" *abria* o estado de menu em vez de fechar — e o próximo clique em outro link o fechava, alternando de forma imprevisível. Passaram a usar `closeMenu`, que é idempotente.
3. **Sem saída por teclado.** Não havia como fechar o menu pelo teclado a não ser tabular de volta até o botão. `Esc` é a convenção do padrão ARIA para menu aberto.

O `toggleMenu` também passou a usar a forma funcional (`(open) => !open`), o que remove a dependência `[menuOpen]` e evita closure obsoleta em cliques rápidos.
**Critério:** 4.1.2 Nome, função, valor (A), 2.1.1 Teclado (A), 2.1.2 Sem armadilha de teclado (A).

### 3.6 `src/App.tsx` — `role="group"` em `div` com `aria-label`

```diff
-<div className="hud-card" aria-label="Exemplo conceitual da interface na lente">
+<div className="hud-card" role="group" aria-label="Exemplo conceitual da interface na lente">

-<div className="product-topics" aria-label="Recursos do produto">
+<div className="product-topics" role="group" aria-label="Recursos do produto">
```

**Motivo.** `aria-label` em um `div` sem `role` é ignorado pela maioria das tecnologias assistivas — o nome não é anunciado. `role="group"` dá ao elemento uma função semântica que aceita nome, e o rótulo passa a ser lido ao entrar no bloco.
**Critério:** 4.1.2 Nome, função, valor (A).

### 3.7 `src/App.tsx` — rótulo no nome (2.5.3)

```diff
-<a href="#proposta" className="scroll-cue" aria-label="Ir para a próxima seção">
+<a href="#proposta" className="scroll-cue" aria-label="EXPLORE — ir para a próxima seção">
```

**Motivo.** O critério 2.5.3 exige que o texto visível esteja contido no nome acessível. O link mostra "EXPLORE" mas se anunciava "Ir para a próxima seção" — quem usa comando de voz não consegue ativá-lo dizendo o que está na tela. O rótulo agora começa com o texto visível.
**Critério:** 2.5.3 Rótulo no nome (A).

### 3.8 `src/App.tsx` + `src/index.css` — headings nos cards

```diff
                 <article>
                   <b>01</b>
-                <span>
-                  <strong>Display integrado à lente</strong>
+                  <div>
+                    <h3>Display integrado à lente</h3>
                     <small>Dados visíveis em tempo real durante toda a exploração.</small>
-                </span>
+                  </div>
                 </article>
```

O mesmo padrão foi aplicado a:

| Seção | Títulos convertidos |
|---|---|
| `.product-topics` | Display integrado à lente · Câmera integrada · Sensores ambientais · Interface inteligente |
| `.difference-list` | Informações durante o mergulho · Registro audiovisual integrado · Recursos inteligentes |

```diff
-.product-topics article span { display:flex; flex-direction:column; gap:7px; }
-.product-topics article strong { color:#031b33; font-size:.96rem; line-height:1.35; }
+.product-topics article>div { display:flex; flex-direction:column; gap:7px; }
+.product-topics article h3 { color:#031b33; font-size:.96rem; line-height:1.35; margin:0; }

-.difference-list span { display:flex; flex-direction:column; gap:5px; }
-.difference-list b { font-size:.9rem; }.difference-list small { color:#64808b; }
+.difference-list>div>div { display:flex; flex-direction:column; gap:5px; }
+.difference-list h3 { font-size:.9rem; margin:0; }.difference-list small { color:var(--slate-strong); font-size:.78rem; }
```

**Motivo.** Os títulos dos cards eram `<strong>` e `<b>` — negrito visual sem valor semântico. A navegação por cabeçalhos, um dos recursos mais usados por leitores de tela para escanear uma página longa como esta, via apenas os `<h1>`/`<h2>` das seções, sem acesso aos 7 títulos de card. O `<span>` externo virou `<div>` porque `<h3>` é elemento de fluxo e não pode ficar dentro de `<span>` (conteúdo de frase).
**Critério:** 1.3.1 Informação e relações (A), 2.4.6 Cabeçalhos e rótulos (AA).

### 3.9 `src/App.tsx` — CTA "Compre agora"

```diff
-            <button className="button primary" type="button">Compre agora</button>
-            <small className="concept-note">
+              <button className="button primary" type="button" aria-describedby="nota-conceito">Compre agora</button>
+              <small className="concept-note" id="nota-conceito">
                 Produto conceitual. Condições comerciais ilustrativas.
```

**Motivo.** O botão tem aparência de ação comercial ("Compre agora", com preço de R$ 4.999,99 acima), mas o produto é um conceito e o botão não leva a lugar nenhum. A ressalva existia apenas como texto solto ao lado — quem navega por teclado ou por leitor de tela chega ao botão sem essa informação no fluxo. O `aria-describedby` faz a ressalva ser anunciada junto com o botão.
**Critério:** 1.3.1 (A), 3.3.2 Rótulos ou instruções (A).
**Pendência:** o botão continua sem destino. Ver seção 6.

### 3.10 `src/index.css` — tokens de contraste

```diff
+  /* Cores de texto validadas para WCAG 2.2 AA (1.4.3 / 1.4.11) */
+  --teal-ink: #0a6f84;      /* 5.29:1 sobre --ice · 4.88:1 sobre #dfeef2 */
+  --slate-strong: #4f6b76;  /* 5.18:1 sobre --ice */
+  --prod-ink: #006a82;      /* 5.22:1 sobre #dfeef2 */
+  --muted-strong: #6f9cb0;  /* 5.84:1 sobre --deep */
+  --tech-strong: #7fa2b3;   /* 5.88:1 sobre #04233d */
+  --quote-strong: #93b0bf;  /* 6.04:1 sobre #062f4e */
```

**Motivo.** Nove combinações de texto/fundo ficavam abaixo de 4,5:1. Os valores originais eram hexadecimais soltos espalhados pelo arquivo, sem indicação de que haviam sido validados. Foram substituídos por tokens nomeados, cada um com o contraste medido documentado no próprio comentário — assim uma mudança futura de cor não passa despercebida.

### 3.11 `src/index.css` — falhas de contraste corrigidas

| Seletor | Cor anterior | Contraste | Cor nova | Contraste |
|---|---|---|---|---|
| `.tech-card>span` | `#42687a` | 2,66:1 | `--tech-strong` `#7fa2b3` | **5,88:1** |
| `.card-number` | `#477084` | 3,24:1 | `--muted-strong` `#6f9cb0` | **5,84:1** |
| `.accordion summary b` | `#168da3` | 3,56:1 | `--teal-ink` `#0a6f84` | **5,29:1** |
| `blockquote footer small` | `#668797` | 3,59:1 | `--quote-strong` `#93b0bf` | **6,04:1** |
| `.difference-list small` | `#64808b` | 3,83:1 | `--slate-strong` `#4f6b76` | **5,18:1** |
| `.accordion summary span` | `#0b829a` | 4,09:1 | `--teal-ink` | **5,29:1** |
| `.product-topics article>b` | `#007b96` | 4,13:1 | `--prod-ink` `#006a82` | **5,22:1** |
| `.faq-grid p` | `#5d7a87` | 4,16:1 | `--slate-strong` | **5,18:1** |
| `.steps li>span` | `#09809a` | 4,19:1 | `--teal-ink` | **5,29:1** |
| Anel de foco em fundo claro | `--cyan-soft` | 1,59:1 | `--teal-ink` | **5,29:1** |

**Motivo.** O mínimo AA é 4,5:1 para texto normal e 3:1 para texto grande e para indicadores não textuais (como o anel de foco). O caso mais grave era `.tech-card>span` a 2,66:1 — o número do card ("01", "02"…) praticamente desaparecia sobre o fundo escuro.
**Critério:** 1.4.3 Contraste mínimo (AA), 1.4.11 Contraste de elementos não textuais (AA).

### 3.12 `src/index.css` — anel de foco

```diff
+.light-section :focus-visible,
+.product :focus-visible { outline-color:var(--teal-ink); }
```

**Motivo.** O anel de foco global usa `--cyan-soft` (`#48d6e8`), que sobre o fundo claro `--ice` (`#edf6f8`) dá 1,59:1 — quase invisível. Quem navega por teclado pelas seções claras (introdução, diferenciais, FAQ) perdia a referência de onde estava. A cor escura `--teal-ink` mantém 5,29:1 nesses fundos e o ciano continua correto nas seções escuras.
**Critério:** 2.4.7 Foco visível (AA), 1.4.11 (AA).

### 3.13 `src/index.css` — escala tipográfica

| Seletor | Antes | Depois |
|---|---|---|
| `.hud-top` | 8,96px | **11,2px** |
| `.hud-target p` | 8,32px | **11,2px** |
| `.hud-stats small` | 8px | **11,2px** |
| `.scroll-cue` | 8px | **11,2px** |
| `.tech-card>span` | 9,6px | **11,2px** |
| `.card-number` | 10,56px | **12px** |
| `.price small`, `.concept-note` | 9,28px | **12px** |
| `.footer-bottom` | 9,28px | **12px** |
| `.footer-top>a` | 10,24px | **12px** |
| `.accordion summary span` | 9,92px | **12px** |
| `.steps li>span` | 11,68px | **12px** |
| `.product-topics article>b` | 11,2px | **12px** |
| `.gallery figcaption` | 10,88px | **12px** |
| `.difference-list small` | herdado | **12,48px** |
| `blockquote footer small` | herdado | **12px** |

**Motivo.** Os rótulos do HUD iam de 8px a 9px — abaixo de qualquer piso razoável de legibilidade. O critério 1.4.4 trata de redimensionamento (o layout não quebra até 200%), não de tamanho absoluto, mas texto nesse tamanho é ilegível para baixa visão mesmo com zoom, e o contraste exigido sobe justamente nos elementos menores. O piso foi elevado para ~11,2px nos rótulos decorativos e 12px nos informativos.
**Critério:** 1.4.4 Redimensionamento do texto (AA), 1.4.3 (AA).

### 3.14 `src/index.css` — layout mobile

```diff
-  .stats-row { grid-template-columns:1fr 1fr; margin-top:60px; }
+  .stats-row { grid-template-columns:repeat(2,minmax(0,1fr)); margin-top:60px; }
+  .stats-row div { padding:22px 14px; gap:12px; min-width:0; }
+  .stats-row span { min-width:0; }

-  .footer-top { grid-template-columns:1fr; gap:35px; padding-bottom:50px; }
-  .footer-top>a { justify-self:start; }
+  .footer-top { flex-direction:column; align-items:flex-start; gap:35px; padding-bottom:50px; }
+  .footer-top>a { align-self:flex-start; }
```

**Motivo.** Dois defeitos encontrados na revisão visual, ambos gerando rolagem horizontal em telas estreitas:

1. **Cards de estatística.** `1fr` equivale a `minmax(auto, 1fr)`, ou seja, a coluna nunca fica menor que o conteúdo mínimo. O texto "identificação assistida" empurrava a grade 4px além da viewport em 390px. `minmax(0, 1fr)` permite a quebra de linha, e o padding/gap reduzidos dão folga.
2. **Rodapé.** A regra mobile declarava `grid-template-columns` e `justify-self`, mas `.footer-top` é `display: flex` — nenhuma das duas propriedades tem efeito em flexbox. Logo, o logo, a frase e o link "Voltar ao topo" continuavam na mesma linha, estourando 4px em 320px. Trocado por `flex-direction: column` e `align-self`.

**Critério:** 1.4.10 Refluxo (AA) — conteúdo não deve exigir rolagem em duas dimensões a 320px de largura.

### 3.15 `src/App.tsx` — acentuação em texto visível

| Antes | Depois | Local |
|---|---|---|
| `Conheca cada vida.` | `Conheça cada vida.` | `<h1>` |
| `Oculos inteligentes… informacoes` | `Óculos inteligentes… informações` | lead do hero |
| `inteligencia artificial` | `inteligência artificial` | seção de introdução |
| `IDENTIFICACAO ATIVA` | `IDENTIFICAÇÃO ATIVA` | HUD |
| `Navegacao principal` | `Navegação principal` | `aria-label` da nav |
| `Beneficios` | `Benefícios` | link do menu |
| `Conheca o BlueSight` | `Conheça o BlueSight` | CTA do menu |

**Motivo.** Não são achados de acessibilidade, mas erros de idioma em conteúdo visível e em nomes acessíveis. Em leitores de tela a diferença é maior: um `aria-label` sem acento pode ser pronunciado com fonética incorreta ou, em alguns sintetizadores, ser lido de forma truncada.
**Critério:** 3.1.1 Idioma da página (A) — qualidade da marcação de idioma.

### 3.16 `src/shared/types.ts`

```diff
-export interface Benefit {
-  icon: IconName
-  title: string
-  text: string
-}
+/** [icone, titulo, texto] */
+export type Benefit = readonly [IconName, string, string]

-export interface Step {
-  number: string
-  title: string
-  text: string
-}
+/** [numero, titulo, texto] */
+export type Step = readonly [string, string, string]

-export interface Tech {
-  icon: IconName
-  title: string
-  text: string
-}
+/** [icone, titulo, texto] */
+export type Tech = readonly [IconName, string, string]

-export interface Faq {
-  question: string
-  answer: string
-}
+/** [pergunta, resposta] */
+export type Faq = readonly [string, string]
```

**Motivo.** As entidades (`src/entities/*.ts`) declaram tuplas com `as const`, mas os tipos eram interfaces de objeto. O código em `App.tsx` desestrutura por posição (`Benefits.map(([icon, title, text]) => …)`), o que só é válido para tuplas. O resultado eram **22 erros de `tsc --noEmit`** — nenhum quebrava o build do Vite, mas todos mascaravam erros reais futuros. Agora `tsc --noEmit` retorna 0.

### 3.17 `src/widgets/ProductPhoto.tsx` e `ProductGlasses.tsx`

```diff
-import { type ReactNode } from 'react'
-import { type IconName } from '../shared/types'
-
-function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
-  const paths: Record<IconName, string> = { … }
-  return `<svg …>${paths[name]}</svg>`
-}
```

```diff
-import { type ReactNode } from 'react'
```

```diff
   )
+}
```

**Motivo.** Um componente `Icon` duplicado e nunca usado em `ProductPhoto.tsx` (o `Icon` real vive em `App.tsx`), com imports sem uso em ambos os arquivos. Em `ProductGlasses.tsx` faltava também a chave de fechamento da função — bug pré-existente no commit original, que só não aparecia porque o componente não é importado em lugar nenhum. Código morto que não compila confunde qualquer leitura futura e impede que `tsc` sirva como sinal confiável.
**Observação:** `ProductGlasses.tsx` continua sem uso. Pode ser removido se o `ProductPhoto` for a única representação do produto.

---

## 4. O que não foi alterado

| Item | Situação |
|---|---|
| `alt` das imagens | Já corretos. `ProductPhoto` descreve o produto, `hud-target` descreve a foto da tartaruga |
| `<html>`/`<body>` estrutura | OK |
| Contraste das seções escuras | Todas as combinações já passavam de 4,5:1 |
| `aria-expanded` do menu | Já correto |
| Imagens decorativas | Nenhuma sem `alt` |

---

## 5. Validação

| Verificação | Antes | Depois |
|---|---|---|
| `scan_html` (WebAbility + axe-core, 164 regras) | 1 problema *serious* | **0 problemas** |
| `check_aria` | violações de nome acessível | **0 violações** |
| Combinações de contraste abaixo de AA | 10 | **0** |
| `tsc --noEmit` | 22 erros | **0 erros** |
| `vite build` | passa | **passa** |
| Overflow horizontal (320/360/390/430/620/768/1024/1440px) | 4px em 320px e 390px | **0 em todas** |
| Menor fonte da página | 8px | **11,2px** |
| Skip link no primeiro `Tab` | inexistente | visível, `top:16`, contorno 2px |
| Anel de foco em seção clara | 1,59:1 | **5,29:1** |
| Menu mobile | nome fixo "Abrir menu" | "Fechar menu" com `aria-expanded="true"` |

---

## 6. Pendências

1. **"Compre agora" sem destino.** O botão recebeu `aria-describedby` apontando para a nota de conceito, mas clicar nele não faz nada. Opções: link para contato/checkout, `mailto`, ou remover o botão e deixar só o texto da oferta.
2. **`ProductGlasses.tsx` não é usado.** Arquivo compilável agora, mas morto. Decidir entre remover ou voltar a usá-lo.
3. **`opencode.json` não versionado.** Arquivo de configuração local presente na raiz, ainda não rastreado pelo git. Avaliar se deve entrar no `.gitignore`.

---

## 7. Notas de manutenção

- Os tokens de cor em `src/index.css` documentam o contraste medido. Ao trocar um fundo (`--ice`, `--deep`, `#dfeef2`, `#04233d`, `#062f4e`), recalcular e atualizar o comentário do token correspondente.
- O anel de foco tem duas variantes: `--cyan-soft` (fundo escuro, padrão) e `--teal-ink` (seções `.light-section` e `.product`). Uma nova seção clara precisa entrar na regra.
- O título da página vive em `.figma/make/site.json`, **não** em `index.html` — o placeholder `<!-- figma:title -->` é substituído no build pelo plugin `figmaSiteConfiguration`.
- Se novas entidades forem adicionadas em `src/entities/`, seguir o formato de tupla definido em `src/shared/types.ts` (a ordem dos campos está no comentário JSDoc de cada tipo).

## 8. Utilização de MCP

Utilizamos o WebAbility MCP para garantir que o contraste entre a cor da fonte escolhida e a cor de fundo estejam de acordo com as diretrizes internacionais WCAG. Além da correção de contraste, aproveitamos para aprender como utilizar esse MCP para garantir a acessibilidade em nosso projeto de PI. 

Durante a utilização do MCP, foram realizados ajustes na estrutura semântica do HTML, no contraste das cores, na legibilidade dos textos, na navegação por teclado, nos atributos ARIA e na responsividade da página.

Após as correções, as verificações automatizadas apresentaram os seguintes resultados:

- Redução de 10 para 0 combinações de cores abaixo do contraste exigido.

- Eliminação das violações identificadas nas verificações de acessibilidade e atributos ARIA.

- Correção de 22 erros de tipagem TypeScript.

- Eliminação da rolagem horizontal indesejada nos tamanhos de tela testados.

- Implementação de melhorias na navegação por teclado e na identificação dos elementos por leitores de tela.
