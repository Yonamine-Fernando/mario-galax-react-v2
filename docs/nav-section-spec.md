# Especificação — Floating Section Navigation

## 1. Objetivo

Especificar a navegação flutuante da página Super Mario Galaxy como um componente React fixo, com revelação condicionada ao scroll e links âncora para as seções existentes.

- **Posicionamento:** fixa no topo da viewport, centralizada horizontalmente. Não participa do fluxo do documento e não desloca o conteúdo.
- **Revelação:** começa visualmente oculta no topo da página e recebe o estado `.visible` quando a rolagem atinge o threshold definido na seção 5.
- **Âncoras:** os quatro links apontam para IDs que já existem no `index.html`: `#hero`, `#personagens`, `#trailers` e `#estreia`.
- **Escopo visual:** somente a cápsula de navegação, seus quatro links e os separadores já presentes na referência. Não adicionar logo, ícones, botão de menu, botão de fechar ou outros elementos.
- **Implementação de estilo:** utilizar classes Tailwind nos elementos React. Não é necessário criar um novo `:root` ou uma folha CSS de tokens para este componente; os valores arbitrários Tailwind abaixo correspondem diretamente aos tokens oficiais do `DESIGN.md`.

## 2. Estrutura de componentes React

A estrutura deve preservar a semântica e a ordem do `nav` existente no `index.html`.

```text
Page
├── FloatingNav
│   └── nav — aria-label="Navegação principal da página"
│       └── ul
│           ├── li
│           │   └── a — href="#hero", data-section="hero"
│           │       └── texto: SMG
│           ├── li — aria-hidden="true", role="presentation"
│           │   └── span — separador decorativo
│           ├── li
│           │   └── a — href="#personagens", data-section="personagens"
│           │       └── texto: Personagens
│           ├── li — aria-hidden="true", role="presentation"
│           │   └── span — separador decorativo
│           ├── li
│           │   └── a — href="#trailers", data-section="trailers"
│           │       └── texto: Trailers
│           ├── li — aria-hidden="true", role="presentation"
│           │   └── span — separador decorativo
│           └── li
│               └── a — href="#estreia", data-section="estreia"
│                   └── texto: Estreia
└── main#conteudo-principal
    ├── section#hero
    ├── section#personagens
    ├── section#trailers
    └── section#estreia
```

### Contrato dos elementos

| Elemento    | ID / atributo                                    | Requisitos                                                                                                                                  |
| ----------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `nav`       | Sem ID no HTML de referência                     | `aria-label="Navegação principal da página"`. Controlar o estado por `ref` React; um ID técnico `floating-nav` é opcional, não obrigatório. |
| `ul`        | Sem ID                                           | Lista horizontal dos itens da navegação.                                                                                                    |
| Links       | `data-section` existente                         | Usar elementos `<a>` nativos com `href` para as âncoras reais. O texto visível já fornece o nome acessível; não duplicar com `aria-label`.  |
| Separadores | Sem ID                                           | Permanecer dentro dos `li` decorativos com `aria-hidden="true"` e `role="presentation"`; não devem ser anunciados por leitores de tela.     |
| Destinos    | `#hero`, `#personagens`, `#trailers`, `#estreia` | Manter exatamente os IDs existentes nas seções.                                                                                             |

**Classes Tailwind por bloco (base desktop):**

- **`nav` / cápsula:** `fixed top-5 left-1/2 z-50 -translate-x-1/2 w-max max-w-[calc(100vw-2rem)] min-h-10 rounded-full border border-[rgba(106,60,188,0.32)] bg-[#0a0a1a]/95 px-4 py-2`.
- **`ul`:** `flex items-center gap-5 whitespace-nowrap`.
- **`li` dos links:** sem caixa ou superfície adicional; a cápsula externa é o único container visual.
- **`a`:** `rounded-full px-1 py-1 font-['Outfit',sans-serif] text-xs font-semibold uppercase tracking-[0.06em] text-[rgba(245,240,232,0.72)] transition-colors duration-200 hover:text-[#f5f0e8] hover:bg-[rgba(255,210,63,0.12)]`.
- **Link ativo inicial (`SMG`):** `font-extrabold text-[#ffd23f]`.
- **`span` separador:** `block h-4 w-px shrink-0 bg-[#6a3cbc]/40`.

Não atribuir uma superfície, borda ou sombra individual a cada link. A cápsula deve permanecer visualmente única.

## 3. Estados visuais

### Estado inicial — oculto no topo

- O componente permanece montado e com `position: fixed`, mas sua aparência é de opacidade zero e deslocamento vertical sutil para cima.
- Classes de estado: `opacity-0 -translate-y-3 pointer-events-none`.
- O estado oculto não pode produzir espaço vazio no layout nem alterar a posição das seções.

### Estado revelado — `.visible`

- Quando `scrollY` alcança ou ultrapassa o threshold, adicionar `.visible` ao `nav`.
- Classes correspondentes: `opacity-100 translate-y-0 pointer-events-auto`.
- A cápsula surge com transição suave de opacidade e transform; não animar largura, altura, padding ou outras propriedades que provoquem reflow.
- Ao retornar para uma posição anterior ao threshold, remover `.visible` e retornar ao estado oculto.

### Acessibilidade durante o estado oculto

Não usar `display: none` nem `visibility: hidden` como estado padrão, pois isso pode retirar os links da navegação por teclado. Manter o conteúdo no DOM e permitir que o foco revele visualmente a cápsula: `focus-within:opacity-100 focus-within:translate-y-0 focus-within:pointer-events-auto`. Essa é uma exceção de acessibilidade ao estado normal baseado em scroll, não um novo item visual.

### Link ativo

O HTML de referência marca `SMG` como ativo inicialmente e fornece `data-section` nos quatro links. Não há `js/script.js` disponível entre os materiais consultados para confirmar uma atualização automática do link ativo por seção. Portanto, preservar `SMG` como estado inicial; não implementar scrollspy como requisito desta especificação sem validar o comportamento no script original.

## 4. Estilos por bloco mapeados a tokens

| Bloco / propriedade            | Aplicação Tailwind                                        | Token do `DESIGN.md`                                        |
| ------------------------------ | --------------------------------------------------------- | ----------------------------------------------------------- |
| Fundo da cápsula               | `bg-[#0a0a1a]/95`                                         | Cosmic Mid — `#0a0a1a`                                      |
| Borda sutil da cápsula         | `border-[rgba(106,60,188,0.32)]`                          | Cosmic Purple — `#6a3cbc`, com opacidade reduzida           |
| Texto dos links inativos       | `text-[rgba(245,240,232,0.72)]`                           | Starlight Muted                                             |
| Texto do link ativo            | `text-[#ffd23f]`                                          | Power Star                                                  |
| Hover suave                    | `hover:bg-[rgba(255,210,63,0.12)]`                        | Power Star Dim                                              |
| Hover do texto                 | `hover:text-[#f5f0e8]`                                    | Starlight Primary                                           |
| Separadores                    | `bg-[#6a3cbc]/40`                                         | Cosmic Purple, com opacidade reduzida                       |
| Família tipográfica            | `font-['Outfit',sans-serif]`                              | `--font-body` — Outfit, sans-serif                          |
| Peso e hierarquia              | `font-semibold`; ativo `font-extrabold`                   | Navegação utilitária; destaque mais forte para o item ativo |
| Caixa e espaçamento das letras | `uppercase tracking-[0.06em]`                             | Regras de utility labels do design system                   |
| Easing do reveal               | `[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]` | `--ease-out-expo`                                           |

**Motion:** usar transições em `opacity` e `transform`, com duração inicial recomendada de `500ms` para o reveal. Hover de texto pode ser mais curto (`200ms`). Não aplicar spring/bounce, glow externo intenso, gradientes ou sombras pesadas: não são necessários para reproduzir o print e contrariariam os anti-patterns do design system.

**Semântica dos tons:** a cápsula deve destacar-se do fundo global Cosmic Deep (`#000000`) sem parecer um card independente. Não substituir Starlight Primary por branco puro e não introduzir cinzas fora da paleta.

## 5. Comportamento JavaScript

### Cálculo do threshold

1. Na montagem do componente, localizar `#hero`.
2. Quando `#hero` existir e tiver altura mensurável, definir o threshold como **60% da altura renderizada do elemento**: `altura de #hero × 0.6`.
3. Se `#hero` não existir, ou se a altura medida for zero, usar como fallback **60% da altura da viewport** (`window.innerHeight × 0.6`). Este fallback é uma decisão de implementação para manter o reveal utilizável quando o alvo principal não está presente.
4. Comparar `window.scrollY` com o threshold: `scrollY >= threshold` ativa `.visible`; abaixo dele, desativa `.visible`.

### Atualização e limpeza

- Avaliar a condição imediatamente na montagem, sem esperar pelo primeiro evento de scroll.
- Atualizar o estado durante o scroll usando listener passivo; para páginas com scroll frequente, agrupar leituras/atualizações em `requestAnimationFrame`.
- Recalcular o threshold em `resize`, pois a altura do hero ou da viewport pode mudar em breakpoints diferentes.
- Se a aplicação alterar o conteúdo do hero depois da montagem, a altura deve ser reavaliada após essa alteração; não fixar permanentemente uma medida inicial que deixe o threshold desatualizado.
- Remover os listeners e cancelar qualquer callback pendente no cleanup do efeito React.
- Não usar o listener de scroll para alterar estilos inline de layout; atualizar apenas o estado/classe visual.

### Navegação por âncora

- Manter os links HTML nativos (`href="#..."`); não substituir por botões ou navegação baseada apenas em `onClick`.
- Preservar o comportamento de histórico e deep-link do navegador.
- Recomenda-se scroll suave (`scroll-smooth` no documento) com respeito a `prefers-reduced-motion`; em redução de movimento, usar rolagem instantânea (`motion-reduce:scroll-auto`).
- Verificar que os alvos não ficam visualmente encobertos pela cápsula fixa. Se necessário, aplicar `scroll-mt-*` adequado aos destinos, sem mudar seus IDs.

## 6. Responsividade e foco

### Responsividade

- **Desktop (referência do print):** cápsula em uma linha, centrada, com altura visual próxima de `40–42px`, largura determinada pelo conteúdo e distância do topo próxima de `20px`.
- **Tablet e mobile:** preservar os mesmos quatro links, sua ordem e a cápsula arredondada. Reduzir progressivamente `gap` e padding lateral; usar tamanho tipográfico ligeiramente menor em telas estreitas.
- Classes responsivas de referência: `max-w-[calc(100vw-1rem)]`, `px-3 sm:px-4`, `gap-1.5 sm:gap-5`, `text-[10px] sm:text-xs`.
- Evitar overflow horizontal da página. Em larguras excepcionalmente estreitas, permitir quebra interna da lista como último recurso, mantendo os links acessíveis e a cápsula centralizada.
- Não criar hamburger, drawer, dropdown ou novos controles: nenhum deles aparece nas referências disponíveis.

### Foco e teclado

- Todos os links devem permanecer acessíveis por `Tab` e ativáveis por `Enter`.
- Aplicar indicador de foco visível e de alto contraste: `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd23f]`.
- O foco não deve depender apenas de mudança de cor; manter contorno claramente visível sobre o fundo escuro.
- O `focus-within` deve revelar a cápsula quando o teclado alcançar um link ainda que o threshold de scroll não tenha sido atingido.
- Separadores não recebem foco e não entram na árvore de leitura assistiva.
- Respeitar `prefers-reduced-motion`, removendo ou reduzindo a transição do reveal sem remover a mudança de estado.

## 7. Checklist de implementação

- [ ] Criar o componente React `FloatingNav` com um único `nav` e a estrutura `ul > li` já descrita.
- [ ] Preservar a ordem dos itens: SMG, Personagens, Trailers, Estreia.
- [ ] Preservar os destinos `#hero`, `#personagens`, `#trailers`, `#estreia` e os atributos `data-section`.
- [ ] Preservar `aria-label="Navegação principal da página"` no `nav`.
- [ ] Marcar cada separador como decorativo com `aria-hidden="true"` e `role="presentation"`.
- [ ] Aplicar classes Tailwind e mapear as cores e a tipografia aos tokens oficiais; não criar tokens CSS globais adicionais.
- [ ] Garantir posicionamento fixo, centralização horizontal e ausência de impacto no fluxo da página.
- [ ] Calcular threshold por `#hero` × 0.6 e aplicar o fallback de viewport × 0.6 quando necessário.
- [ ] Inicializar o estado corretamente e atualizar `.visible` ao rolar para baixo e para cima.
- [ ] Recalcular o threshold no resize e limpar listeners no cleanup React.
- [ ] Manter os links acessíveis por teclado inclusive antes do reveal normal, usando `focus-within` como exceção visual.
- [ ] Implementar `focus-visible`, hover discreto e suporte a `prefers-reduced-motion`.
- [ ] Validar a largura mobile sem overflow horizontal e sem adicionar controles ausentes nos prints.
- [ ] Confirmar que não foi introduzido scrollspy ou outro comportamento não comprovado pelas referências.

## 8. Critérios de aceitação visuais

### Correspondência com o print desktop

- A navegação aparece como uma única cápsula horizontal, arredondada, centralizada no eixo X e posicionada próxima ao topo.
- A cápsula tem fundo Cosmic Mid escuro e borda fina, sutil, sem sombra pesada ou glow externo agressivo.
- Os quatro rótulos aparecem em caixa alta, na família Outfit, com espaçamento de letras discreto.
- `SMG` aparece em Power Star (`#ffd23f`) e com peso visual mais forte; os outros três links aparecem em Starlight Muted.
- Os separadores são finos, verticais e discretos; não competem com os rótulos.
- A ordem, o espaçamento e as proporções gerais reproduzem o print de referência; não há ícones ou elementos adicionais.

### Comportamento verificável

- No topo, a cápsula está visualmente oculta.
- Ao atingir 60% da altura de `#hero`, a cápsula revela-se com transição curta e fluida, sem deslocar o conteúdo da página.
- Ao retornar acima do topo do threshold, a cápsula volta ao estado oculto.
- Na ausência de `#hero`, o fallback baseado em 60% da altura da viewport mantém o comportamento funcional.
- Cada link leva à seção correspondente por âncora nativa.
- O foco por teclado torna a navegação visível e apresenta um contorno Power Star identificável.
- Em mobile, todos os links continuam alcançáveis e a página não ganha rolagem horizontal involuntária.

---

## Referências e limites da especificação

- `desktop-print-menu.png`: referência visual desktop da cápsula e da hierarquia dos quatro rótulos. Não fornece estado mobile nem comportamento de scroll.
- `DESIGN.md`: fonte dos tokens de cor, tipografia, motion, layout e anti-patterns.
- `index.html`: fonte da estrutura semântica original, do `aria-label`, dos separadores, dos `data-section` e dos IDs de destino.
