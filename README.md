# 📚 As 22 Consagradas Leis do Marketing — Grupo Daylan

**Seminário de Gestão de Marketing** · Entrega: 06/04/2025

---

## 🎯 Sobre o Projeto

Site de apoio ao seminário do Grupo Daylan para a disciplina de **Gestão de Marketing**. A apresentação aborda três das 22 Consagradas Leis do Marketing (Al Ries & Jack Trout):

| # | Lei | Responsável |
|---|-----|-------------|
| 17 | Lei da Imprevisibilidade | Daylan (explicação) + Carla (cases) |
| 18 (20 no livro) | Lei do Sucesso | Ana (explicação) + Luís (cases) |
| 19 (21 no livro) | Lei do Fracasso | Farouk (explicação) + Toussaint (cases + fechamento) |

---

## 👥 Equipe

| Nome | Função | Cor | Tempo |
|------|--------|-----|-------|
| **Daylan** 👑 | Líder · Abertura + Lei da Imprevisibilidade | 🔴 vermelho | 45s + 1min20s |
| Carla | Cases — Lei da Imprevisibilidade | 🟣 roxo | 1min30s |
| Ana | Lei do Sucesso | 🟠 laranja | 1min20s |
| Luís | Cases — Lei do Sucesso | 🔵 azul | 1min30s |
| Farouk | Lei do Fracasso | 🟢 verde | 1min20s |
| Toussaint | Cases + Fechamento | 🩷 pink | 1min30s + 45s |

**Total: ~10 minutos** (+ 5 min Q&A)

---

## ✅ Funcionalidades Implementadas

### Design
- [x] Dark mode premium estilo Apple/minimalista
- [x] Cor de destaque vermelha (`#e63946`)
- [x] Textura animada de pixels no background (canvas interativo com mouse)
- [x] Tipografia Inter com hierarquia visual precisa
- [x] Cores únicas por integrante (botões + bordas + marcadores coerentes)
- [x] Layout responsivo (desktop/mobile)
- [x] Animações de reveal ao rolar a página

### Navegação
- [x] Navbar fixa com botões de cada integrante
- [x] Scroll suave até a seção do integrante ao clicar no nome
- [x] Efeito de destaque na seção ao chegar (glow + border animation)
- [x] Scroll spy: botão ativo conforme posição na página
- [x] Menu hambúrguer para mobile

### Topo / Hero
- [x] Título com "Consagradas" em branco e destaque em vermelho
- [x] Pills das 3 leis com números
- [x] Metadados (disciplina, data, tempo)
- [x] Botões de equipe clicáveis

### Comando da Atividade
- [x] 8 cards visuais com ícones
- [x] Critérios de avaliação detalhados
- [x] Cards com animação de entrada staggered

### Roteiro Geral
- [x] Cronômetro de 10 minutos com barra de progresso
- [x] Quadro de roteiro editável e expansível
- [x] Quadro de slides com até 20 imagens (navegação drag/swipe)
- [x] Layout responsivo (desktop: lado a lado / mobile: empilhado)

### Seções Individuais (× 6 membros)
- [x] Avatar com cor do integrante
- [x] Tags de tempo por fase
- [x] Quadro de roteiro editável (textarea auto-resize)
- [x] Roteiro pré-preenchido para cada integrante
- [x] Border progress indicator (linha vermelha → verde ao completar)
- [x] Botão expandir/comprimir roteiro
- [x] Quadro de slides com drag/swipe e upload de imagem
- [x] Visualização em fullscreen ao clicar no slide
- [x] Seção de referências pré-populada por integrante
- [x] Formulário para adicionar novas referências (livro/site/vídeo/artigo)

### Cronômetros Individuais
- [x] **Daylan**: 2 fases (45s abertura → 1min20s lei)
- [x] **Carla, Ana, Luís, Farouk**: 1 fase cada (1min30s ou 1min20s)
- [x] **Toussaint**: 2 fases (1min30s cases → 45s fechamento)
- [x] Play/Pause (mesmo botão, alterna)
- [x] Reset (volta ao início da fase atual)
- [x] Progressão automática de fases com pausa entre elas
- [x] Border progress: linha percorre contorno do painel de roteiro
- [x] Cor verde neon ao completar

### Mapa de Conexões
- [x] Canvas interativo mostrando as 22 leis
- [x] Leis do grupo em destaque (posição central)
- [x] 15 conexões mapeadas (direta/indireta/entre as leis do grupo)
- [x] Hover: destaque das conexões do nó selecionado
- [x] Click: painel de informações com todas as conexões
- [x] Tooltip com nome e descrição ao passar o mouse
- [x] Legenda visual
- [x] Responsivo

---

## 📁 Estrutura de Arquivos

```
index.html              ← Página única principal
css/
  style.css             ← Estilos completos (dark theme, layout, componentes)
js/
  data.js               ← Dados: membros, cards, referências, 22 leis, conexões
  pixel-bg.js           ← Textura animada de pixels (canvas)
  nav.js                ← Navegação, scroll suave, scroll spy
  timers.js             ← Motor dos cronômetros com border progress
  slides.js             ← Painel de slides com drag/swipe
  references.js         ← Biblioteca de referências por integrante
  lawsmap.js            ← Mapa interativo de conexões entre leis (canvas)
  main.js               ← Orquestrador: monta seções individuais, inicializa módulos
```

---

## 🌐 Como Usar

1. Abra `index.html` em qualquer navegador moderno
2. Use os **botões de nomes** na navbar para navegar até cada seção
3. Cada seção tem:
   - **Roteiro editável** — edite livremente antes da apresentação
   - **Cronômetro individual** — pressione ▶ para iniciar, ⏸ para pausar, 🔄 para resetar
   - **Upload de slides** — clique nos quadros de slide para adicionar imagens
   - **Referências** — adicione novos links a qualquer momento
4. Use o **Roteiro Geral** para coordenar a apresentação
5. Explore o **Mapa de Conexões** para entender as relações entre as leis

---

## 🔧 Próximos Passos Sugeridos

- [ ] Upload real de arquivo PDF nas referências (requer backend)
- [ ] Persistência de dados via localStorage (roteiro e referências)
- [ ] Contador regressivo para a data de entrega (06/04)
- [ ] Modo de apresentação (tela cheia, fonte maior)
- [ ] Exportar roteiro como PDF

---

## 📖 Referência Principal

> **Al Ries & Jack Trout** — *As 22 Consagradas Leis do Marketing*
> HarperCollins / HSM Editora
