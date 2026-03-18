/* ================================================================
   DATA.JS — Configuração central do seminário
   ================================================================ */
'use strict';

window.SEMINAR = {};

/* ── Membros da equipe ───────────────────────────────────────── */
SEMINAR.members = [
  {
    id: 'daylan',
    name: 'Daylan',
    role: 'Líder · Abertura + Lei da Imprevisibilidade',
    color: '#e63946',
    initial: 'D',
    emoji: '👑',
    timings: [
      { label: 'Abertura', seconds: 45 },
      { label: 'Lei da Imprevisibilidade', seconds: 80 }   // 1min20s
    ],
    roteiro: `Abertura (0–45s)
"Bom [dia/tarde]! Meu nome é Daylan e sou a líder desta equipe. Comigo estão: Carla, Ana, Luís, Farouk e Toussaint. Hoje vamos abordar três das 22 Consagradas Leis do Marketing, obra de Al Ries e Jack Trout — um guia clássico e atemporal para quem quer entender por que algumas marcas prosperam enquanto outras desaparecem."

Lei da Imprevisibilidade (45s–2min05s)
"A 17ª lei nos diz: ninguém pode prever o futuro com certeza. Empresas que elaboram planos rígidos de longo prazo ignoram que o mercado muda constantemente. O fracasso de muitas organizações está justamente em seguir um plano que já não reflete a realidade. A lição? Crie flexibilidade. Planeje cenários, não roteiros fixos."

Case do Livro (Al Ries):
"A GM apostou em um futuro de crescimento contínuo nos anos 70 e não previu a crise do petróleo. Resultado: perdeu bilhões e cedeu mercado para fabricantes japoneses mais ágeis."`,
    slideCount: 3,
    lawFocus: 'Imprevisibilidade'
  },
  {
    id: 'carla',
    name: 'Carla',
    role: 'Cases — Lei da Imprevisibilidade',
    color: '#7c6af7',
    initial: 'C',
    emoji: '📊',
    timings: [
      { label: 'Cases da Lei', seconds: 90 }  // 1min30s
    ],
    roteiro: `Cases — Lei da Imprevisibilidade (1min30s)

Case 1 — Do Livro (Al Ries):
"A Coca-Cola lançou a 'New Coke' em 1985 convicta de que uma fórmula mais doce seria um sucesso. As pesquisas indicavam aprovação — porém a reação do mercado foi desastrosa. A empresa não previu o vínculo emocional dos consumidores com a fórmula original. Voltaram atrás em 79 dias."

Case 2 — Pesquisa do Grupo:
"A Kodak ignorou a ascensão do digital mesmo tendo inventado a câmera digital em 1975. Presa em um plano de longo prazo baseado no filme fotográfico, não se adaptou. Em 2012, declarou falência. Um exemplo clássico de como a imprevisibilidade do mercado destrói quem não se prepara para ela."

Transição: "Agora Ana nos apresentará a Lei do Sucesso."`,
    slideCount: 2,
    lawFocus: 'Imprevisibilidade'
  },
  {
    id: 'ana',
    name: 'Ana',
    role: 'Lei do Sucesso',
    color: '#f7a74b',
    initial: 'A',
    emoji: '⭐',
    timings: [
      { label: 'Lei do Sucesso', seconds: 80 }  // 1min20s
    ],
    roteiro: `Lei do Sucesso (1min20s)

"A 20ª lei é paradoxal: o sucesso geralmente leva ao fracasso. Quando uma empresa conquista grandes resultados, tende a se tornar arrogante — acredita que seu nome pode ser colocado em qualquer produto e que tudo dará certo. Mas o mercado não funciona assim."

"Marcas de sucesso começam a estender sua linha, diluindo o posicionamento que as tornou conhecidas. A liderança perde o contato com a realidade e as decisões passam a ser baseadas no ego, não em dados."

Case do Livro:
"A IBM, líder absoluta em mainframes, tentou dominar todos os segmentos de tecnologia. Ao esticar a marca para PCs, software e serviços, perdeu foco — e consequentemente mercado — para concorrentes mais especializados como Dell e Microsoft."`,
    slideCount: 2,
    lawFocus: 'Sucesso'
  },
  {
    id: 'luis',
    name: 'Luís',
    role: 'Cases — Lei do Sucesso',
    color: '#4bc9f7',
    initial: 'L',
    emoji: '📈',
    timings: [
      { label: 'Cases da Lei', seconds: 90 }  // 1min30s
    ],
    roteiro: `Cases — Lei do Sucesso (1min30s)

Case 1 — Do Livro (Al Ries):
"A Levi's era sinônimo de jeans de qualidade. Com o sucesso, tentou entrar no mercado de ternos e roupas sociais. O resultado? Fracasso nas extensões e enfraquecimento da marca principal. Voltaram ao foco original."

Case 2 — Pesquisa do Grupo:
"A Gap no auge dos anos 90 dominava o varejo casual americano. Encorajada pelo sucesso, lançou a GapBody, GapKids e expandiu agressivamente. Mas perdeu o que a diferenciava. Em 2020, fechou mais de 200 lojas. O sucesso cegou a liderança para os sinais de saturação."

Transição: "Vamos agora para a última lei, apresentada pelo Farouk: a Lei do Fracasso."`,
    slideCount: 2,
    lawFocus: 'Sucesso'
  },
  {
    id: 'farouk',
    name: 'Farouk',
    role: 'Lei do Fracasso',
    color: '#7cf77a',
    initial: 'F',
    emoji: '🎯',
    timings: [
      { label: 'Lei do Fracasso', seconds: 80 }  // 1min20s
    ],
    roteiro: `Lei do Fracasso (1min20s)

"A 21ª lei é praticamente um tabu nas empresas: o fracasso é esperado e deve ser aceito. Ao contrário do que a cultura corporativa prega, admitir um erro cedo é sinal de maturidade estratégica — e pode salvar a empresa de perdas muito maiores."

"Muitas organizações desperdiçam recursos tentando 'consertar' produtos ou estratégias que já demonstraram não funcionar. O problema é a cultura do ego: admitir o fracasso parece uma derrota pessoal para quem decidiu. Mas no marketing, insistir no erro é a verdadeira derrota."

Case do Livro:
"A Al Ries cita a Sears, que continuou investindo em estratégias que não funcionavam por décadas — relutando em abandonar o modelo de loja de departamentos generalista enquanto o varejo especializado tomava o mercado."`,
    slideCount: 2,
    lawFocus: 'Fracasso'
  },
  {
    id: 'toussaint',
    name: 'Toussaint',
    role: 'Cases + Fechamento',
    color: '#f74bc9',
    initial: 'T',
    emoji: '🏁',
    timings: [
      { label: 'Cases da Lei', seconds: 90 },  // 1min30s
      { label: 'Fechamento', seconds: 45 }
    ],
    roteiro: `Cases — Lei do Fracasso (1min30s)

Case 1 — Do Livro (Al Ries):
"A Xerox tentou entrar no mercado de computadores pessoais — uma área totalmente fora de seu domínio. Ignorando os sinais de fracasso, continuou investindo. Resultado: perdeu dinheiro e prestígio, e ainda saiu do mercado de PCs com prejuízo."

Case 2 — Pesquisa do Grupo:
"A Blockbuster teve a oportunidade de comprar a Netflix em 2000 por US$ 50 milhões e recusou. Mesmo com o crescimento do streaming, continuou apostando em locadoras físicas. A empresa declarou falência em 2010. Um fracasso que poderia ter sido evitado se a liderança tivesse aceitado os sinais do mercado."

Fechamento (1min30s–2min15s)
"Para concluir: as Leis da Imprevisibilidade, do Sucesso e do Fracasso nos mostram que o marketing não é uma ciência exata. Mercados mudam, sucessos enganam e fracassos ensinam. Empresas duradouras são aquelas que permanecem humildes, ágeis e atentas. Obrigado pela atenção — estamos à disposição para as perguntas!"`,
    slideCount: 3,
    lawFocus: 'Fracasso'
  }
];

/* ── Cards do Comando da Atividade ──────────────────────────── */
SEMINAR.comandoCards = [
  {
    icon: 'fa-solid fa-crown',
    iconStyle: '',
    title: 'Liderança',
    text: '<strong>Daylan</strong> é a líder da equipe, responsável por gerenciar as atividades e garantir que todos contribuam.',
    highlight: true
  },
  {
    icon: 'fa-solid fa-users',
    iconStyle: 'blue',
    title: 'Divisão de Tarefas',
    text: 'Cada membro apresenta uma parte: <strong>explicação da lei</strong> ou <strong>apresentação dos cases</strong>. Ninguém fica sem função.'
  },
  {
    icon: 'fa-solid fa-print',
    iconStyle: 'purple',
    title: 'Entrega Impressa',
    text: 'Slides impressos devem ser entregues em <strong>06/04</strong>. O primeiro slide deve conter <strong>nome completo e matrícula</strong> de todos.'
  },
  {
    icon: 'fa-solid fa-briefcase',
    iconStyle: 'green',
    title: 'Cases Obrigatórios',
    text: 'Para cada lei: <strong>um case do livro</strong> de Al Ries + <strong>um case pesquisado</strong> pelo grupo. Total: 6 cases.'
  },
  {
    icon: 'fa-solid fa-user-minus',
    iconStyle: '',
    title: 'Exclusão do Grupo',
    text: 'O líder pode excluir o colega que <strong>não participou das reuniões</strong> ou não contribuiu. O excluído realiza teste de segunda chamada.'
  },
  {
    icon: 'fa-solid fa-clock',
    iconStyle: '',
    title: 'Tempo de Apresentação',
    text: '<strong>10 minutos</strong> para apresentar + <strong>5 minutos</strong> para responder perguntas da sala. Alguém deve controlar o tempo.',
    highlight: true
  },
  {
    icon: 'fa-solid fa-paper-plane',
    iconStyle: 'blue',
    title: 'Envio ao Monitor',
    text: 'Todas as apresentações devem ser enviadas ao monitor até o <strong>domingo anterior</strong> ao dia 06/04.'
  },
  {
    icon: 'fa-solid fa-star',
    iconStyle: 'green',
    title: 'Critérios de Avaliação',
    text: '① Explicação e contextualização da lei  ② Coerência entre teoria e exemplo  ③ Visual do PowerPoint  ④ Respeito ao tempo'
  }
];

/* ── Referências por membro (id do membro → array) ──────────── */
SEMINAR.references = {
  daylan: [
    { type: 'book', name: 'As 22 Consagradas Leis do Marketing', author: 'Al Ries & Jack Trout', url: 'https://www.amazon.com.br/22-Consagradas-Leis-Marketing/dp/8532607284' },
    { type: 'article', name: 'Lei da Imprevisibilidade: análise crítica', author: 'Harvard Business Review', url: 'https://hbr.org' },
    { type: 'video', name: 'As 22 Leis do Marketing — Resumo Completo', author: 'YouTube — Marketing Descomplicado', url: 'https://www.youtube.com/results?search_query=22+leis+do+marketing' }
  ],
  carla: [
    { type: 'book', name: 'As 22 Consagradas Leis do Marketing', author: 'Al Ries & Jack Trout', url: 'https://www.amazon.com.br/22-Consagradas-Leis-Marketing/dp/8532607284' },
    { type: 'link', name: 'Case Kodak — A falência do gigante analógico', author: 'Exame', url: 'https://exame.com/negocios/o-fim-da-kodak/' },
    { type: 'video', name: 'New Coke: O maior erro da Coca-Cola', author: 'YouTube', url: 'https://www.youtube.com/results?search_query=new+coke+fracasso' }
  ],
  ana: [
    { type: 'book', name: 'As 22 Consagradas Leis do Marketing', author: 'Al Ries & Jack Trout', url: 'https://www.amazon.com.br/22-Consagradas-Leis-Marketing/dp/8532607284' },
    { type: 'article', name: 'IBM e a extensão de linha — Lições de posicionamento', author: 'MIT Sloan Management Review', url: 'https://sloanreview.mit.edu' },
    { type: 'video', name: 'Lei do Sucesso — Ries e Trout', author: 'YouTube — Gestão em Foco', url: 'https://www.youtube.com/results?search_query=lei+do+sucesso+ries+trout' }
  ],
  luis: [
    { type: 'book', name: 'As 22 Consagradas Leis do Marketing', author: 'Al Ries & Jack Trout', url: 'https://www.amazon.com.br/22-Consagradas-Leis-Marketing/dp/8532607284' },
    { type: 'link', name: 'Levi\'s e a tentativa frustrada de diversificação', author: 'Forbes Brasil', url: 'https://forbes.com.br' },
    { type: 'link', name: 'Gap — Ascensão e queda de um ícone do varejo', author: 'Business Insider', url: 'https://businessinsider.com' }
  ],
  farouk: [
    { type: 'book', name: 'As 22 Consagradas Leis do Marketing', author: 'Al Ries & Jack Trout', url: 'https://www.amazon.com.br/22-Consagradas-Leis-Marketing/dp/8532607284' },
    { type: 'article', name: 'Xerox e o erro estratégico no mercado de PCs', author: 'Fast Company', url: 'https://fastcompany.com' },
    { type: 'video', name: 'Lei do Fracasso — Case Sears', author: 'YouTube — Marketing na Prática', url: 'https://www.youtube.com/results?search_query=sears+fracasso+varejo' }
  ],
  toussaint: [
    { type: 'book', name: 'As 22 Consagradas Leis do Marketing', author: 'Al Ries & Jack Trout', url: 'https://www.amazon.com.br/22-Consagradas-Leis-Marketing/dp/8532607284' },
    { type: 'link', name: 'Blockbuster vs Netflix — A decisão que custou tudo', author: 'Veja', url: 'https://veja.abril.com.br' },
    { type: 'video', name: 'Blockbuster: o colapso de um império', author: 'YouTube — Nostalgia Corporativa', url: 'https://www.youtube.com/results?search_query=blockbuster+falencia+netflix' }
  ]
};

/* ── 22 Leis do Marketing (para o Mapa) ─────────────────────── */
SEMINAR.laws = [
  { n:1,  name:'Lei da Liderança',         desc:'É melhor ser o primeiro do que ser o melhor.' },
  { n:2,  name:'Lei da Categoria',         desc:'Se não pode ser o primeiro em uma categoria, crie uma nova.' },
  { n:3,  name:'Lei da Mente',             desc:'É melhor ser o primeiro na mente do que o primeiro no mercado.' },
  { n:4,  name:'Lei da Percepção',         desc:'Marketing não é guerra de produtos, é guerra de percepções.' },
  { n:5,  name:'Lei do Foco',              desc:'O conceito mais poderoso no marketing é ser dono de uma palavra na mente.' },
  { n:6,  name:'Lei da Exclusividade',     desc:'Duas empresas não podem possuir a mesma palavra na mente.' },
  { n:7,  name:'Lei da Escada',            desc:'Qual posição você ocupa na escada da mente do consumidor?' },
  { n:8,  name:'Lei da Dualidade',         desc:'A longo prazo, todo mercado torna-se uma corrida de dois.' },
  { n:9,  name:'Lei do Oposto',            desc:'Se almeja o segundo lugar, sua estratégia depende do líder.' },
  { n:10, name:'Lei da Divisão',           desc:'Com o tempo, uma categoria se divide em dois ou mais segmentos.' },
  { n:11, name:'Lei da Perspectiva',       desc:'Os efeitos do marketing só se manifestam no longo prazo.' },
  { n:12, name:'Lei da Extensão de Linha', desc:'Há uma pressão irresistível para estender o patrimônio da marca.' },
  { n:13, name:'Lei do Sacrifício',        desc:'Você tem que abrir mão de algo para obter algo.' },
  { n:14, name:'Lei dos Atributos',        desc:'Para cada atributo, existe um atributo oposto igualmente efetivo.' },
  { n:15, name:'Lei da Sinceridade',       desc:'Admitir o negativo se torna positivo.' },
  { n:16, name:'Lei da Singularidade',     desc:'Em cada situação, apenas um único movimento produzirá resultados.' },
  { n:17, name:'Lei da Imprevisibilidade', desc:'Você não pode prever o futuro; portanto, não pode planejar o futuro.', focus: true },
  { n:18, name:'Lei do Sucesso',           desc:'O sucesso frequentemente leva à arrogância e a arrogância ao fracasso.', focus: true },
  { n:19, name:'Lei do Fracasso',          desc:'O fracasso é esperado e deve ser aceito.', focus: true },
  { n:20, name:'Lei do Alarde',            desc:'A situação muitas vezes é o oposto do que aparece na imprensa.' },
  { n:21, name:'Lei da Aceleração',        desc:'Programas bem-sucedidos não são construídos sobre modismos.' },
  { n:22, name:'Lei dos Recursos',         desc:'Sem fundos adequados, uma ideia não irá decolar.' }
];

/* Nota: as leis 17, 18, 19 estão marcadas como focus:true.
   O mapa usará n:17 = Imprevisibilidade, n:18 = Sucesso, n:19 = Fracasso
   (mapeando para os números reais do livro) */

/* ── Conexões entre as leis ─────────────────────────────────── */
SEMINAR.connections = [
  // Imprevisibilidade (17) conecta com:
  { from: 17, to: 16, type: 'direct', reason: 'Singularidade — ação única diante do imprevisível' },
  { from: 17, to: 11, type: 'direct', reason: 'Perspectiva — planejamento de longo prazo vs. imprevisibilidade' },
  { from: 17, to: 21, type: 'direct', reason: 'Aceleração — modismos são imprevisíveis' },
  { from: 17, to: 18, type: 'focus',  reason: 'Sucesso cria falsa sensação de previsibilidade' },
  { from: 17, to: 19, type: 'focus',  reason: 'Não prever o futuro leva ao fracasso' },
  { from: 17, to: 22, type: 'indirect', reason: 'Recursos são necessários para adaptar-se ao imprevisível' },

  // Sucesso (18) conecta com:
  { from: 18, to: 12, type: 'direct', reason: 'Extensão de Linha — sucesso gera tentação de estender a marca' },
  { from: 18, to: 1,  type: 'direct', reason: 'Liderança — líderes de mercado são mais sujeitos ao excesso de confiança' },
  { from: 18, to: 4,  type: 'direct', reason: 'Percepção — arrogância distorce a percepção da realidade' },
  { from: 18, to: 13, type: 'indirect', reason: 'Sacrifício — quem não sacrifica quando necessário paga o preço' },
  { from: 18, to: 19, type: 'focus',  reason: 'Sucesso leva diretamente ao fracasso' },

  // Fracasso (19) conecta com:
  { from: 19, to: 15, type: 'direct', reason: 'Sinceridade — admitir o fracasso pode virar vantagem' },
  { from: 19, to: 13, type: 'direct', reason: 'Sacrifício — abandonar o que não funciona' },
  { from: 19, to: 9,  type: 'indirect', reason: 'Oposto — estratégia do segundo depende de admitir limitações' },
  { from: 19, to: 5,  type: 'indirect', reason: 'Foco — perda de foco é raiz de muitos fracassos' }
];
