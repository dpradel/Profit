import profitDesktopHero from "../assets/profit-desktop-hero.png";
import profitPlatformImage from "../assets/profit-platform.png";

export const navLinks = [
  { label: "Profit Ultra", href: "#/profit-ultra" },
  { label: "Profit Web", href: "#/profit-web" },
  { label: "Recursos", href: "#/recursos" },
  { label: "Planos", href: "#/planos" },
  { label: "Corretoras", href: "#/corretoras" },
  { label: "Baixar", href: "#/baixar" },
  {
    label: "A empresa",
    children: [
      { label: "Quem somos", href: "#/quem-somos" },
      { label: "Contato", href: "#/contato" },
    ],
  },
];

export const heroIntro = {
  titleLead: "Descubra o",
  titleAccent: "Profit",
  titleRest: ".",
  subtitle: "A plataforma líder dos traders, acessível em qualquer lugar e a qualquer momento.",
  platformImage: profitPlatformImage,
};

export const heroFeatures = [
  {
    text: "Aplicativo desktop completo",
    icons: [
      { label: "Windows", type: "windows", theme: "windows" },
      { label: "macOS", type: "macos", theme: "macos" },
    ],
  },
  {
    text: "App nativo mobile",
    icons: [
      { label: "iOS", type: "ios", theme: "ios" },
      { label: "Android", type: "android", theme: "android" },
    ],
  },
  {
    text: "Interface otimizada para tablet e acesso direto por browser, sem instalação",
    icons: [
      { label: "Tablet", type: "tablet", theme: "tablet" },
      { label: "Browser", type: "browser", theme: "browser" },
    ],
  },
];

export const umbrelPro = {
  label: "",
  title: "Negocie a hora que quiser, como quiser.",
  image: profitDesktopHero,
  copy: [
    "Seja no seu computador, celular, tablet ou diretamente no seu navegador, desfrute da segurança, velocidade e versatilidade do Profit em qualquer dispositivo, a qualquer hora.",
  ],
  bullets: [
    "Sincronização em tempo real entre dispositivos",
    "Configurações e layouts salvos na nuvem",
    "Segurança com autenticação em dois fatores",
    "Disponível 24 horas por dia, 7 dias por semana",
  ],
  price: "",
  shipping: "",
  actions: [
    { label: "Comece agora", href: "#comece", variant: "primary" },
    { label: "Conheça a plataforma", href: "#/recursos", variant: "glass" },
  ],
};

export const productColumns = [
  {
    type: "home",
    title: "Recursos",
    subtitle: "Ferramentas para cada perfil de trader",
    price: "Teste grátis por 15 dias",
    image: "https://framerusercontent.com/images/wzRrIPwmhVn2q20FWjgSSL94TI.png?width=1024&height=1024",
    actions: [
      { label: "Conhecer recursos", href: "#/recursos", variant: "primary" },
      { label: "Testar grátis", href: "#comece", variant: "dark" },
    ],
    cards: [
      "https://framerusercontent.com/images/acY28JOPS1FNm2kGeVFquznhZlo.png?width=952&height=782",
      "https://framerusercontent.com/images/ypbqV6AMNGeIzRnNsONOfvHPlWQ.png?width=952&height=782",
      "https://framerusercontent.com/images/oQ4MwsUAiZ2YF5WfWZu5dzjYS6o.png?width=952&height=782",
      "https://framerusercontent.com/images/5W5CGMEYrWkxX9QP0b1P60uepm8.png?width=952&height=782",
    ],
  },
  {
    type: "os",
    title: "Profit Ultra",
    subtitle: "A experiência mais poderosa do Profit",
    glow: "https://framerusercontent.com/images/79RI1LMHmDs5ElfCjulPfPDFvg.png?width=3099&height=3099",
    tablet: "https://framerusercontent.com/images/O7kTDJvFXu8PFwYRG27B32JjzE.png?width=1502&height=1179",
    phone: "https://framerusercontent.com/images/D6VxOGLYprxETPKdvUrtgYTXWs.png?width=1290&height=1716",
    actions: [{ label: "Conhecer o Ultra", href: "#/profit-ultra", variant: "dark" }],
    cards: [
      "https://framerusercontent.com/images/hw0KjVu2GeNiXcsIZPuYZQ0hd4.png?width=876&height=721",
      "https://framerusercontent.com/images/RijUuLN6Hw8hwVDvxHzYPI8C3tk.png?width=876&height=721",
      "https://framerusercontent.com/images/tUCBLEvbOpelcKnfis1RDtqfoY.png?width=876&height=721",
      "https://framerusercontent.com/images/j70vviz91He3Z00NcYSUnaTp4.png?width=876&height=721",
    ],
  },
];

export const filesLaunch = {
  video: `${import.meta.env.BASE_URL}profit-ultra.mp4`,
  eyebrow: "Profit Ultra",
  title: "Apresentamos a evolução do trading.",
  subtitle: "Todo o poder do Profit, elevado à máxima potência.",
  actions: [
    { label: "Conferir", href: "#/profit-ultra", variant: "primary" },
  ],
};

export const superpowerCards = [
  {
    theme: "teal",
    icon: "https://framerusercontent.com/images/MkZDQ57bdWG4x9UDtjKzldt0Lg.png?width=192&height=193",
    title: "Analise o mercado com precisão.",
    description: "Gráficos avançados, indicadores, estudos e ferramentas de desenho para transformar leitura de mercado em decisão.",
    image: "https://framerusercontent.com/images/DZtdVA1t4cCP7AeCSwwNsRzApdE.png?width=2560&height=1348",
  },
  {
    theme: "gold",
    icon: "https://framerusercontent.com/images/n3cIWrnc5e1G6jA0YgpiRUIyt00.png?width=192&height=192",
    title: "Leia o fluxo em tempo real.",
    description: "Book, Times & Trades, SuperDOM e Volume at Price para quem precisa enxergar a pressão compradora e vendedora no detalhe.",
    image: "https://framerusercontent.com/images/Nf3SUCE5KohIpdurFteYcUbbY.png?width=2320&height=1248",
  },
  {
    theme: "berry",
    icon: "https://framerusercontent.com/images/bHQIVJx38uI8kJjNS5gJY9FLk.png?width=192&height=192",
    title: "Gerencie risco com confiança.",
    description: "Ordens avançadas, stops, OCO, alertas e acompanhamento de posição para operar com disciplina em todos os cenários.",
    image: "https://framerusercontent.com/images/Vzt7yBHKceIQhPmsfuHzJHQduA4.png?width=2560&height=1348",
  },
  {
    theme: "bitcoin",
    icon: "https://framerusercontent.com/images/56rLLT6EF4I7lEcZzR65EcY5Iw.png?width=192&height=192",
    title: "Automatize suas estratégias.",
    description: "Crie, teste e execute estratégias com NTSL, backtesting histórico e recursos de otimização para evoluir seu setup.",
    image: "https://framerusercontent.com/images/wwvvv6s0IFQpk794oQrHEay7sW8.png?width=1159&height=697",
  },
  {
    theme: "red",
    icon: "https://framerusercontent.com/images/lEi6ASrmMOyvIFYENdjSmkcPYMs.png?width=504&height=502",
    title: "Acompanhe tudo de qualquer lugar.",
    description: "Use o Profit no desktop, celular, tablet ou direto no navegador, com layouts e configurações sincronizados na nuvem.",
    image: "https://framerusercontent.com/images/daW51CZEk08PtPaVmM7vNEl22M.png?width=2418&height=1398",
  },
  {
    theme: "light",
    icon: "https://framerusercontent.com/images/FimxhhXuuAjGAx7OZbE1YQqck.png?width=256&height=256",
    title: "Eleve sua performance com o Ultra.",
    description: "IA, automação, suporte prioritário e ferramentas exclusivas para traders que precisam do máximo do Profit.",
    image: "https://framerusercontent.com/images/pvRsvBbC98us2MgvBCx6a1Tc4.png?width=1141&height=823",
  },
];

export const appStore = {
  bg: "https://framerusercontent.com/images/NWCNqPGvu8naiZHNqJBEMnsG0o.png?width=1312&height=810",
  frames: {
    left: "https://framerusercontent.com/images/r49LjQWd5B3SbPL0xe5T0cYWPjI.png?width=1584&height=1008",
    main: "https://framerusercontent.com/images/eoh9h3TnTTdgbU6lni413C4xpuU.png?width=1268&height=808",
    right: "https://framerusercontent.com/images/3Hdr17RBCaOj3QSg98S80tesuiM.png?width=1268&height=808",
  },
  actions: [
    { label: "Explorar recursos", href: "#/recursos", variant: "primary" },
    { label: "Conhecer Profit Ultra", href: "#/profit-ultra", variant: "dark" },
  ],
  strip: [
    { label: "Gráficos", icon: "https://framerusercontent.com/images/MkZDQ57bdWG4x9UDtjKzldt0Lg.png?width=192&height=193" },
    { label: "Tape Reading" },
    { label: "Market Replay", icon: "https://framerusercontent.com/images/AeGrrO10RXINLS14e54r9eIfNPs.png?width=174&height=173" },
    { label: "Automação" },
    { label: "Profit Web" },
    { label: "Mobile" },
    { label: "Raio-X" },
  ],
};

export const footerCards = [
  {
    title: "Suporte 24/7",
    href: "#suporte",
    text: "Fale com pessoas reais por chat ou e-mail sempre que precisar de ajuda.",
  },
  {
    title: "Corretoras parceiras",
    href: "#corretoras",
    text: "Encontre condições especiais para começar a usar o Profit pela sua corretora.",
  },
  {
    title: "Profit Ultra",
    href: "#/profit-ultra",
    text: "Conheça a versão mais poderosa da plataforma para traders profissionais.",
    size: "small",
  },
];

export const socialLinks = [
  { label: "Facebook",  href: "https://www.facebook.com/nelogica" },
  { label: "Instagram", href: "https://www.instagram.com/nelogica" },
  { label: "LinkedIn",  href: "https://www.linkedin.com/company/nelogica" },
  { label: "YouTube",   href: "https://www.youtube.com/@Nelogica" },
];

export const footerNav = [
  {
    heading: "Profit",
    links: [
      { label: "Conheça o Profit",    href: "#comece" },
      { label: "Profit Ultra",        href: "#/profit-ultra" },
      { label: "Condições especiais", href: "#" },
      { label: "NeloStore",           href: "#" },
      { label: "Baixar",              href: "#" },
    ],
  },
  {
    heading: "Produtos",
    links: [
      { label: "Profit",         href: "#" },
      { label: "HUB3",           href: "#" },
      { label: "BlackArrow",     href: "#" },
      { label: "Vector",         href: "#" },
      { label: "Invest Academy", href: "#" },
      { label: "Akeloo",         href: "#" },
      { label: "Comdinheiro",    href: "#" },
      { label: "DataFeed",       href: "#" },
      { label: "Copy Invest",    href: "#" },
    ],
  },
  {
    heading: "Soluções empresariais",
    links: [
      { label: "RiskManager",        href: "#" },
      { label: "Módulo Subcontas",   href: "#" },
      { label: "OMS",                href: "#" },
      { label: "DataSolution",       href: "#" },
      { label: "Suitability",        href: "#" },
      { label: "Zeragem Automática", href: "#" },
      { label: "AlgoTools",          href: "#" },
      { label: "Home Broker",        href: "#" },
    ],
  },
  {
    heading: "Empresa",
    links: [
      { label: "Sobre nós",                href: "#" },
      { label: "Compliance e Privacidade", href: "#" },
      { label: "Segurança",                href: "#" },
      { label: "Carreiras",                href: "#" },
      { label: "Contato",                  href: "#" },
    ],
  },
  {
    heading: "Conhecimento",
    links: [
      { label: "Blog",           href: "#" },
      { label: "Central de ajuda", href: "#" },
    ],
  },
];

export const footerLinks = [
  { label: "Profit Ultra", href: "#/profit-ultra" },
  { label: "Recursos",     href: "#/recursos" },
  { label: "Teste grátis", href: "#comece" },
  { label: "Suporte",      href: "#suporte" },
  { label: "Legal",        href: "#" },
];

export const footerLegal = [
  { label: "Portal de Privacidade",                     href: "#" },
  { label: "Programa de Divulgação de Vulnerabilidades", href: "#" },
];
