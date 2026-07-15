const icon = (fileName) => `${import.meta.env.BASE_URL}tool-icons/${fileName}`;

export const planLabels = ["Profit Ultra", "Profit Pro", "Profit Plus", "Profit One", "Profit Training"];

export const planOptions = [
  { id: "training", label: "Training", fullLabel: "Profit Training" },
  { id: "one", label: "One", fullLabel: "Profit One" },
  { id: "plus", label: "Plus", fullLabel: "Profit Plus" },
  { id: "pro", label: "Pro", fullLabel: "Profit Pro" },
  { id: "ultra", label: "Ultra", fullLabel: "Profit Ultra" },
];

export const toolCategories = [
  { id: "all", label: "Todos" },
  { id: "analise", label: "Análise" },
  { id: "fluxo", label: "Fluxo" },
  { id: "automacao", label: "Automação" },
  { id: "gestao", label: "Gestão" },
  { id: "mercado", label: "Mercado" },
  { id: "ultra", label: "Ultra" },
];

const allPlans = planLabels;
const ultraOnly = ["Profit Ultra"];
const ultraProTraining = ["Profit Ultra", "Profit Pro", "Profit Training"];
const ultraProPlusTraining = ["Profit Ultra", "Profit Pro", "Profit Plus", "Profit Training"];
const withoutTraining = ["Profit Ultra", "Profit Pro", "Profit Plus", "Profit One"];
const withoutPlus = ["Profit Ultra", "Profit Pro", "Profit One", "Profit Training"];

export const toolResources = [
  {
    id: "bm-c-news",
    name: "BM&C News",
    category: "mercado",
    visual: "video",
    icon: icon("Ferramenta=BM&CNews.svg"),
    plans: allPlans,
    theme: ["#12344d", "#2c7d9d", "#1d4ed8"],
    description:
      "Acompanhe notícias do mercado financeiro, político e econômico diretamente na plataforma, com informações diárias para ampliar seu contexto e dar mais agilidade às decisões.",
  },
  {
    id: "calculadora-ir",
    name: "Calculadora de IR Akeloo",
    category: "gestao",
    visual: "calculator",
    icon: icon("Ferramenta=Akeloo.svg"),
    plans: allPlans,
    planLabel: "Plano grátis compatível com:",
    theme: ["#0f3a35", "#1a7a50", "#16c784"],
    description:
      "Simplifique a rotina de imposto de renda com recursos para calcular e declarar operações em bolsa e criptoativos dentro do ecossistema Profit.",
  },
  {
    id: "copilot",
    name: "Copilot",
    category: "ultra",
    visual: "assistant",
    icon: icon("Ferramenta=Copilot.svg"),
    plans: ultraOnly,
    theme: ["#4a2506", "#bd6b14", "#f59e0b"],
    description:
      "Assistente de negociação do Profit Ultra que apoia a identificação de pontos de entrada em automações e notifica notícias de impacto ligadas aos ativos em que você está posicionado.",
  },
  {
    id: "copy-invest",
    name: "Copy Invest",
    category: "automacao",
    visual: "copy",
    icon: icon("Ferramenta=CopyInvest.svg"),
    plans: withoutTraining,
    theme: ["#102a43", "#245f8f", "#1d4ed8"],
    description:
      "Replique operações de traders e robôs profissionais diretamente no Profit, de forma automática, com visão geral e estatística da estratégia acompanhada.",
  },
  {
    id: "estrategias-automatizadas",
    name: "Estratégias Automatizadas",
    category: "automacao",
    visual: "strategy",
    icon: icon("Ferramenta=EstrategiasAutomatizadas.svg"),
    plans: withoutTraining,
    theme: ["#51300a", "#b86b12", "#facc15"],
    description:
      "Crie estratégias de execução no Editor de Estratégias do Profit e use parâmetros próprios para entradas, gerenciamento e saídas de operações.",
  },
  {
    id: "gerenciador-alarmes",
    name: "Gerenciador de Alarmes",
    category: "gestao",
    visual: "alerts",
    icon: icon("Ferramenta=Alarmes.svg"),
    plans: allPlans,
    theme: ["#0d3b34", "#217a57", "#22c55e"],
    description:
      "Configure alertas para ser avisado quando um ativo atingir um preço, condição operacional ou gatilho definido em uma estratégia.",
  },
  {
    id: "gerenciador-ativos",
    name: "Gerenciador de Ativos",
    category: "gestao",
    visual: "assets",
    icon: icon("Ferramenta=GerenciadorAtivos.svg"),
    plans: allPlans,
    theme: ["#103548", "#287795", "#22d3ee"],
    description:
      "Defina ativos disponíveis, crie listas específicas e organize grupos para monitoramento em outras ferramentas da plataforma.",
  },
  {
    id: "grade-cotacoes",
    name: "Grade de Cotações",
    category: "mercado",
    visual: "quotes",
    icon: icon("Ferramenta=GradeCotacao.svg"),
    plans: allPlans,
    theme: ["#0e3c31", "#19724f", "#22c55e"],
    description:
      "Monitore ativos por listas e setores, acompanhe informações de negociação e use indicadores para analisar grupos de ativos em tempo real.",
  },
  {
    id: "indicadores",
    name: "Indicadores",
    category: "analise",
    visual: "indicators",
    icon: icon("Ferramenta=Indicadores.svg"),
    plans: allPlans,
    theme: ["#301c33", "#116678", "#06b6d4"],
    description:
      "Use indicadores gráficos de tendência, médias móveis, osciladores de preço e estudos para apoiar suas análises e decisões.",
  },
  {
    id: "inside-track",
    name: "Inside Track",
    category: "ultra",
    visual: "inside",
    icon: icon("Ferramenta=InsideTrack.svg"),
    plans: ultraOnly,
    theme: ["#102b47", "#245f8f", "#3b82f6"],
    description:
      "Acesse informações privilegiadas sobre o posicionamento de grandes players e acompanhe resultados de empresas em períodos específicos.",
  },
  {
    id: "iv-rank",
    name: "IV Rank",
    category: "ultra",
    visual: "line",
    icon: icon("Ferramenta=IVRank.svg"),
    plans: ultraOnly,
    theme: ["#343619", "#0f766e", "#34d399"],
    description:
      "Avalie a volatilidade implícita de um ativo e identifique períodos de alta e baixa volatilidade para embasar estratégias de negociação.",
  },
  {
    id: "lista-ordens",
    name: "Lista de Ordens",
    category: "gestao",
    visual: "orders",
    icon: icon("Ferramenta=ListaOrdens.svg"),
    plans: allPlans,
    theme: ["#273427", "#60703f", "#d4a72c"],
    description:
      "Monitore e gerencie ordens de contas conectadas ao Profit de forma centralizada, com informações de ordens enviadas em cada período.",
  },
  {
    id: "livro-ofertas",
    name: "Livro de Ofertas",
    category: "fluxo",
    visual: "book",
    icon: icon("Ferramenta=LivroOfertas.svg"),
    plans: allPlans,
    theme: ["#0b2330", "#246889", "#38bdf8"],
    description:
      "Visualize ofertas de um ativo simultaneamente, com o conteúdo eletrônico das bolsas para uma leitura mais profunda da liquidez.",
  },
  {
    id: "mapa-fluxo",
    name: "Mapa de Fluxo",
    category: "fluxo",
    visual: "flow",
    icon: icon("Ferramenta=MapaFluxo.svg"),
    plans: ultraProTraining,
    theme: ["#30343b", "#59616b", "#22c55e"],
    description:
      "Combine análise gráfica e leitura de fluxo para acompanhar a liquidez atual e passada de um ativo em diferentes periodicidades.",
  },
  {
    id: "matriz-correlacao",
    name: "Matriz de Correlação",
    category: "analise",
    visual: "matrix",
    icon: icon("Ferramenta=MatrizCorrelacao.svg"),
    plans: withoutPlus,
    theme: ["#2e2230", "#5f6670", "#06b6d4"],
    description:
      "Compare ativos, visualize conexões entre movimentos e tenha apoio para composição e gestão de carteiras.",
  },
  {
    id: "medidores-pressao",
    name: "Medidores de Pressão",
    category: "fluxo",
    visual: "pressure",
    icon: icon("Ferramenta=MedidoresPressao.svg"),
    plans: ultraProPlusTraining,
    theme: ["#301c33", "#116678", "#ef4444"],
    description:
      "Consulte o direcionamento do preço e a pressão predominante no período, analisando negócios realizados, ofertas e agressão.",
  },
  {
    id: "monitor-mercado",
    name: "Monitor de Mercado",
    category: "mercado",
    visual: "monitor",
    icon: icon("Ferramenta=MonitorMercado.svg"),
    plans: ultraProTraining,
    theme: ["#301b31", "#0e6f55", "#22c55e"],
    description:
      "Acompanhe em destaque as maiores e menores variações de ativos, com mapa de cor para séries escolhidas pelo investidor.",
  },
  {
    id: "motion-tracker",
    name: "Motion Tracker",
    category: "ultra",
    visual: "motion",
    icon: icon("Ferramenta=MotionTracker.svg"),
    plans: ultraOnly,
    theme: ["#0d3344", "#246889", "#0ea5e9"],
    description:
      "Monitore o posicionamento de grandes players do mercado em relação a um ativo e tenha mais informações para apoiar decisões finais.",
  },
  {
    id: "noticias",
    name: "Notícias",
    category: "mercado",
    visual: "news",
    icon: icon("Ferramenta=Noticias.svg"),
    plans: allPlans,
    theme: ["#4b5563", "#6b7280", "#94a3b8"],
    description:
      "Acesse acontecimentos do mercado financeiro diretamente no Profit, ative alarmes, favorite, compartilhe e abra o gráfico do ativo relacionado.",
  },
  {
    id: "otimizacao-estrategias",
    name: "Otimização de Parâmetros",
    aliases: ["Otimização de Estratégias"],
    category: "ultra",
    visual: "optimization",
    icon: icon("Ferramenta=OtimizacaoEstrategia.svg"),
    plans: ultraOnly,
    theme: ["#09264a", "#0f5e72", "#22d3ee"],
    description:
      "Otimize parâmetros no Profit Ultra, avaliando milhares de cenários históricos para identificar a eficácia de uma estratégia de execução.",
  },
  {
    id: "plano-trade",
    name: "Plano de Trade",
    category: "ultra",
    visual: "plan",
    icon: icon("Ferramenta=PlanoTrade.svg"),
    plans: ultraOnly,
    theme: ["#343619", "#0f766e", "#f59e0b"],
    description:
      "Estabeleça metas, acompanhe indicadores e monitore resultados operacionais para organizar sua evolução no mercado.",
  },
  {
    id: "posicao",
    name: "Posição",
    category: "gestao",
    visual: "position",
    icon: icon("Ferramenta=Posicao.svg"),
    plans: allPlans,
    theme: ["#4b5563", "#6b7280", "#14b8a6"],
    description:
      "Acompanhe posições em corretoras conectadas ao Profit, com resultado, ativos e colunas configuráveis de acordo com sua preferência.",
  },
  {
    id: "connect-chat",
    name: "Connect Chat",
    category: "gestao",
    visual: "chat",
    icon: icon("Ferramenta=Connect.svg"),
    plans: allPlans,
    theme: ["#0d3344", "#246889", "#60a5fa"],
    description:
      "Interaja com amigos, traders e investidores, compartilhe configurações úteis e crie grupos abertos ou privados para análises e estratégias.",
  },
  {
    id: "relatorio-performance",
    name: "Relatório de Performance",
    category: "gestao",
    visual: "performance",
    icon: icon("Ferramenta=RelatorioPerformance.svg"),
    plans: allPlans,
    theme: ["#0f3a35", "#1a7a50", "#22c55e"],
    description:
      "Reúna dados e estatísticas das operações para autoavaliação, acompanhando operações realizadas, em andamento e resultados obtidos.",
  },
  {
    id: "replay-multi",
    name: "Replay Multi",
    category: "ultra",
    visual: "replay",
    icon: icon("Ferramenta=ReplayMulti.svg"),
    plans: ultraOnly,
    theme: ["#4a2506", "#bd6b14", "#f59e0b"],
    description:
      "Reproduza e revise movimentos de preços em períodos específicos, com possibilidade de inserir até cinco ativos simultaneamente no Replay.",
  },
  {
    id: "superdom",
    name: "SuperDOM",
    category: "fluxo",
    visual: "superdom",
    icon: icon("Ferramenta=SuperDOM.svg"),
    plans: ultraProPlusTraining,
    theme: ["#301c33", "#116678", "#0ea5e9"],
    description:
      "Una análise e operação em uma única estrutura, especialmente útil para scalping e day trade, com abertura e fechamento em poucos segundos.",
  },
  {
    id: "ticker-cotacoes",
    name: "Ticker de Cotações",
    category: "mercado",
    visual: "ticker",
    icon: icon("Ferramenta=TickerCotacao.svg"),
    plans: allPlans,
    theme: ["#0f3a35", "#1a7a50", "#22c55e"],
    description:
      "Exiba listas personalizáveis de ativos com ticker, último preço negociado e variação diretamente dentro do Profit.",
  },
  {
    id: "times-trades",
    name: "Times & Trades",
    category: "fluxo",
    visual: "times",
    icon: icon("Ferramenta=TimesTrades.svg"),
    plans: allPlans,
    theme: ["#4b5563", "#6b7280", "#94a3b8"],
    description:
      "Acompanhe variáveis importantes da agressão e da ação dos grandes players no momento de analisar o fluxo de mercado.",
  },
  {
    id: "visao-mercado",
    name: "Visão de Mercado",
    category: "mercado",
    visual: "marketview",
    icon: icon("Ferramenta=Variant23.svg"),
    plans: allPlans,
    theme: ["#0f3a35", "#1a7a50", "#22c55e"],
    description:
      "Compare tendências e variações de múltiplos ativos em uma única janela, com listas predefinidas e editáveis.",
  },
  {
    id: "volume-at-market",
    name: "Volume at Market",
    category: "fluxo",
    visual: "volume-market",
    icon: icon("Ferramenta=VolumeatMarket.svg"),
    plans: ultraProTraining,
    theme: ["#4b5563", "#6b7280", "#22c55e"],
    description:
      "Visualize regiões de defesa de preço geradas pelos grandes players e aprofunde a leitura de fluxo com uma ferramenta avançada de tape reading.",
  },
  {
    id: "volume-at-price",
    name: "Volume at Price",
    category: "fluxo",
    visual: "volume-price",
    icon: icon("Ferramenta=VolumeatPrice.svg"),
    plans: allPlans,
    theme: ["#0b3a57", "#08708f", "#2dd4bf"],
    description:
      "Visualize acúmulos de ordens, regiões de preço, exibição de rejeição e posicionamento de participantes em cada nível de preço.",
  },
];
