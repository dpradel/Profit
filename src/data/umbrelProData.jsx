const asset = (path) => `https://umbrel.com${path}`;

export const proNavLinks = [
  { label: "Visão geral", href: "#overview" },
  { label: "Configuração", href: "#setup" },
  { label: "Recursos", href: "#specs" },
  { label: "Comparar", href: "#compare" },
  { label: "Dúvidas", href: "#faq" },
];

export const proTabs = [
  { label: "Visão geral", href: "#overview" },
  { label: "Configuração", href: "#setup" },
  { label: "Recursos", href: "#specs" },
  { label: "Experiência", href: "#design" },
  { label: "Comparar", href: "#compare" },
  { label: "Dúvidas", href: "#faq" },
];

export const proHero = {
  video: asset("/umbrel-pro/hero.mp4"),
  title: "Todo o poder do Profit,",
  subtitle: "elevado à máxima potência.",
  price: "Condições especiais via corretoras",
  delivery: "Teste grátis disponível por 15 dias.",
  action: { label: "Testar grátis", href: "/#comece" },
};

export const announcement = {
  eyebrow: "Apresentando Profit Ultra",
  title: "A evolução do trading",
  media: asset("/umbrel-pro/announcement.jpg"),
  action: "Conheça o Ultra",
  duration: "7:08",
};

export const useCases = [
  {
    title: "Copilot com IA para operar com mais contexto.",
    description:
      "O Profit Ultra aproxima inteligência artificial da sua rotina de análise, ajudando a interpretar cenários, revisar oportunidades e enxergar pontos que poderiam passar despercebidos.",
    image: asset("/umbrel-pro/use-cases/openclaw-new.webp"),
  },
  {
    title: "Estratégias, backtests e otimização em outro nível.",
    description:
      "Crie, teste e refine estratégias com recursos avançados para transformar hipóteses em setups mais consistentes.",
    image: asset("/umbrel-pro/use-cases/files.avif"),
  },
  {
    title: "Performance para traders profissionais.",
    description:
      "Mais velocidade, mais estabilidade e mais recursos simultâneos para quem precisa operar com múltiplas janelas, ativos e leituras ao mesmo tempo.",
    image: asset("/umbrel-pro/use-cases/btc.jpg"),
  },
  {
    title: "Tudo do Profit, sem limites.",
    description:
      "Análise gráfica, tape reading, automação, alertas, replay, simulador e gestão de risco em uma experiência feita para extrair o máximo da plataforma.",
    image: asset("/umbrel-pro/use-cases/stream.avif"),
  },
];

export const hardwareFeatures = [
  {
    title: "Ferramentas exclusivas para alta performance.",
    description: "Recursos avançados para traders que precisam decidir rápido, comparar cenários e manter controle sobre cada etapa da operação.",
    video: asset("/umbrel-pro/features/storage.mp4"),
  },
  {
    title: "IA integrada ao fluxo de decisão.",
    description: "Use inteligência artificial como apoio para leitura, revisão e acompanhamento de mercado sem sair da plataforma.",
    video: asset("/umbrel-pro/features/materials.mp4"),
  },
  {
    title: "Automação e análise quantitativa.",
    description:
      "Estratégias NTSL, backtesting, otimização e ferramentas para estudar comportamento histórico com mais profundidade.",
    video: asset("/umbrel-pro/features/failsafe.mp4"),
  },
  {
    title: "Suporte e prioridade para quem opera sério.",
    description:
      "Atendimento preparado para acompanhar usuários avançados, com foco em agilidade, configuração e continuidade operacional.",
    video: asset("/umbrel-pro/features/lid.mp4"),
  },
];

export const osFeatures = [
  {
    title: "Análise gráfica avançada.",
    description:
      "Indicadores, estudos proprietários, múltiplos layouts e ferramentas de desenho para interpretar o mercado com profundidade.",
    image: asset("/umbrel-pro/umbrelos/browser/one.webp"),
  },
  {
    title: "Tape reading profissional.",
    description:
      "Book, Times & Trades, SuperDOM, agressões e volume para acompanhar o fluxo de ordens em tempo real.",
    image: asset("/umbrel-pro/umbrelos/storage.webp"),
  },
  {
    title: "Gestão de risco integrada.",
    description:
      "Stops, OCO, alertas e acompanhamento de posição para manter disciplina mesmo em operações rápidas.",
    image: asset("/umbrel-pro/umbrelos/network-sharing-new.webp"),
  },
  {
    title: "Multiativos e múltiplos dispositivos.",
    description:
      "Monte sua área de trabalho no desktop, acompanhe pelo mobile e mantenha seus layouts sincronizados na nuvem.",
    image: asset("/umbrel-pro/umbrelos/app-store.webp"),
  },
];

export const browserStack = [
  asset("/umbrel-pro/umbrelos/browser/one.webp"),
  asset("/umbrel-pro/umbrelos/browser/two.webp"),
  asset("/umbrel-pro/umbrelos/browser/three.webp"),
  asset("/umbrel-pro/umbrelos/browser/four.webp"),
];

export const setupSteps = [
  {
    title: "Ative o Profit Ultra.",
    description:
      "Comece pelo teste grátis ou consulte as condições especiais disponíveis pela sua corretora parceira.",
  },
  {
    title: "Sincronize seu workspace.",
    description: "Traga layouts, ativos, janelas, estudos e preferências para uma área de trabalho pronta para operar.",
  },
  {
    title: "Evolua seu setup.",
    description: "Explore IA, automação, backtesting, replay e recursos avançados para melhorar sua leitura de mercado.",
  },
];

export const specs = [
  { value: "IA", label: "Copilot e recursos inteligentes integrados ao fluxo de análise." },
  { value: "Ultra performance", label: "Experiência preparada para múltiplas janelas, ativos e leituras simultâneas." },
  { value: "Automação", label: "Estratégias NTSL, backtesting e otimização avançada." },
  { value: "Multi-dispositivo", label: "Desktop, mobile, tablet e browser com sincronização na nuvem." },
  { value: "Prioridade", label: "Suporte focado em usuários avançados e operações profissionais." },
];

export const compare = {
  products: [
    {
      title: "Profit",
      description: "A plataforma completa para análise, execução, tape reading, automação e gestão de risco.",
      image: asset("/umbrel-pro/compare/umbrel-home.avif"),
      price: "Teste grátis por 15 dias",
    },
    {
      title: "Profit Ultra",
      badge: "NOVO",
      description: "A experiência mais poderosa do Profit, com IA, recursos exclusivos e performance para traders profissionais.",
      image: asset("/umbrel-pro/compare/umbrel-pro.avif"),
      price: "Condições especiais via corretoras",
    },
  ],
  rows: [
    ["Perfil ideal", "Traders e investidores que buscam uma plataforma completa", "Traders profissionais e usuários avançados"],
    ["Análise gráfica", "Indicadores, estudos, layouts e ferramentas de desenho", "Recursos avançados com mais profundidade e produtividade"],
    ["Tape reading", "Book, Times & Trades, volume e SuperDOM", "Fluxo completo com experiência otimizada para operações intensas"],
    ["Automação", "Estratégias NTSL e backtesting", "Automação, otimização e análise quantitativa avançada"],
    ["IA", "-", "Copilot e recursos inteligentes integrados"],
    ["Dispositivos", "Desktop, mobile, tablet e browser", "Desktop, mobile, tablet e browser com foco em alta performance"],
    ["Suporte", "Atendimento 24/7 por chat e e-mail", "Atendimento 24/7 com prioridade para usuários Ultra"],
  ],
};

export const faqs = [
  {
    question: "O que é o Profit Ultra?",
    answer:
      "O Profit Ultra é a versão mais poderosa da plataforma, criada para traders que precisam de recursos avançados, IA, automação, análise profunda e performance para operar com mais contexto.",
  },
  {
    question: "Qual a diferença entre Profit e Profit Ultra?",
    answer:
      "O Profit já reúne as ferramentas essenciais para operar com excelência. O Ultra adiciona recursos exclusivos, Copilot com IA, automação e otimização avançadas, prioridade no suporte e uma experiência preparada para rotinas profissionais.",
  },
  {
    question: "Posso testar antes de contratar?",
    answer:
      "Sim. A experiência de teste grátis por 15 dias permite conhecer a plataforma antes de escolher o plano ideal. Condições especiais também podem estar disponíveis via corretoras parceiras.",
  },
  {
    question: "O Profit Ultra funciona em quais dispositivos?",
    answer:
      "Você pode usar o Profit no desktop, mobile, tablet e navegador. Layouts, configurações e acompanhamento de mercado podem ser sincronizados entre dispositivos compatíveis.",
  },
  {
    question: "O Ultra é indicado para iniciantes?",
    answer:
      "Ele pode ser usado por qualquer pessoa, mas foi pensado especialmente para quem já opera com frequência e precisa de recursos mais profundos para análise, execução, automação e revisão.",
  },
  {
    question: "Preciso ter conta em corretora?",
    answer:
      "Para enviar ordens ao mercado, sim. Para testar a plataforma e usar simulador, você pode começar sem enviar ordens reais. As corretoras parceiras podem oferecer condições especiais de contratação.",
  },
];

export const crafted = {
  poster: asset("/umbrel-pro/crafted/umbrel-pro-making-poster.jpg"),
  video: asset("/umbrel-pro/crafted/making-umbrel-pro.mp4"),
  back: asset("/umbrel-pro/umbrel-pro-back.jpg"),
};
