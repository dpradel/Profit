const img = (id, query = "") => `https://framerusercontent.com/images/${id}${query}`;

export const osNavLinks = [
  { label: "Profit Ultra", href: "#/profit-ultra" },
  { label: "Recursos", href: "#/recursos" },
  { label: "Teste grátis", href: "#comece" },
];

export const osHero = {
  titleLead: "Descubra o",
  titleAccent: "Profit",
  titleRest: ".",
  body: img("qCx4qR2BdkysJ1N0Cwf7xbzRw.png", "?width=4068&height=2424"),
  bar: img("PxgX389lH4XjuiAPOVujngkCE.png", "?width=2595&height=162"),
  subtitle: "A plataforma líder dos traders, acessível em qualquer lugar e a qualquer momento.",
  floatingFiles: [
    img("CrQnVaB9fiZeDw61z0uuhKpio.png", "?width=752&height=400"),
    img("q51ITMYgAd2sWKLpRxCqBSB6Obo.png", "?width=752&height=648"),
    img("MwRys0kwMZPGKZ9JcXoxShSFqE.png", "?width=752&height=392"),
    img("towm148E8mXjUST3vmnrkAUj68.png", "?width=752&height=376"),
    img("HlKgC5NYjkAp1Jc2sPm20DpGxE.png", "?width=752&height=128"),
  ],
};

export const osCapabilities = [
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

export const osIntro = {
  icon: img("BJQvPo6Bh7rIDASbdMX8V26wUEg.png", "?width=281&height=281"),
  image: img("SeZKylkF8uNQM4KY14ISAE4Nno.png", "?width=2560&height=1708"),
  eyebrow: "Para todos os perfis",
  title: "Uma plataforma que atende aos mais variados perfis.",
  text:
    "Do investidor conservador ao trader de alta frequência, o Profit reúne análise gráfica, tape reading, automação, gestão de risco e execução em tempo real em uma experiência única.",
};

export const osBackups = {
  icon: img("5RRQEgMJomkZV7Htf9IsXej8.png", "?width=1024&height=1024"),
  eyebrow: "Multiplataforma",
  title: "Negocie a hora que quiser, como quiser.",
  text:
    "Seja no computador, celular, tablet ou diretamente no navegador, seus layouts, configurações e acompanhamento de mercado seguem sincronizados com segurança.",
  main: img("odGb8Bn6DCn9tkeseSB91rcXFY.png", "?width=4335&height=2676"),
  side: img("3NSMMwShsUePtt0ZC5QJxSAfiw.png", "?width=1376&height=2762"),
};

export const osWhatsNew = {
  eyebrow: "Novidades",
  title: "Acompanhe a execução das estratégias com o Raio-X.",
  action: { label: "Conheça o recurso", href: "#/recursos" },
  cards: [
    {
      title: "Mais clareza na execução.",
      text: "Veja como sua estratégia se comporta durante a operação e identifique pontos de melhoria com mais contexto.",
      image: img("PcAhxNQRnAmTUTd98XeUFGqjjw.jpg", "?width=3200&height=2400"),
    },
    {
      title: "Layouts salvos na nuvem.",
      text: "Mantenha seus estudos, janelas e preferências disponíveis em todos os dispositivos compatíveis com o Profit.",
      image: img("XChBQlTyTrRChViZnVjoU2fqYJI.jpg", "?width=3200&height=2400"),
    },
    {
      title: "Teste, revise e evolua.",
      text: "Use simulador, replay e backtesting para estudar operações, validar setups e operar com mais disciplina.",
      image: img("0lsZUDqck4sb5wuYCGLQiyUQAw.jpg", "?width=3200&height=2400"),
    },
  ],
};

export const osSelfHost = {
  eyebrow: "Por que o Profit?",
  title: "A melhor opção para quem leva o mercado a sério.",
  text:
    "Tecnologia, infraestrutura e suporte em uma plataforma desenvolvida para diferentes estilos de operação.",
  cards: [
    {
      title: "Funcionalidades inovadoras para qualquer perfil.",
      text: "Ferramentas para análise gráfica, tape reading, recursos operacionais e gestão de risco em uma experiência única.",
      image: img("0H5ReEJJe2eFCkLogJlKTrCEV4.jpg", "?width=1920&height=1080"),
    },
    {
      title: "Infraestrutura robusta e diferenciada.",
      text: "Base de dados ampla, múltiplos servidores e datacenters para manter o fluxo de dados contínuo e preciso.",
      image: img("FymX87OmTZuD68ThMXQp4yZD4.png", "?width=1048&height=691"),
    },
    {
      title: "Melhoria contínua da plataforma.",
      text: "Atualizações frequentes baseadas na rotina de traders, investidores e clientes que usam a plataforma todos os dias.",
      image: img("SjK4p6IsfgBIc98D0LbIda4tiz4.png", "?width=1284&height=848"),
    },
    {
      title: "Suporte técnico 24/7.",
      text: "Atendimento por chat e e-mail, com pessoas reais para ajudar você a configurar, operar e resolver dúvidas rapidamente.",
      image: img("KrGekl0iYnjbN6FJAGmyTovYE1k.png", "?width=786&height=519"),
    },
  ],
};

export const osAppStore = {
  eyebrow: "Arsenal incomparável",
  title: "O ecossistema mais completo para sua performance.",
  text: "Gráficos, indicadores, book, replay, simulador, automação e recursos de execução pensados para a rotina real de quem opera.",
  background: img("Vv2V5en4YRyopKSqeYvyOvF8Fo.png", "?width=3312&height=1862"),
  center: img("FfgvWwznybZVAwMPPGDrOY9lJIk.png", "?width=1268&height=807"),
  actions: [
    { label: "Explorar recursos", href: "#/recursos" },
    { label: "Conhecer o Ultra", href: "#/profit-ultra" },
  ],
  icons: [
    { label: "Gráficos", icon: img("btiafPNqB8YlYaexXgIo14RlY7o.png", "?width=225&height=225") },
    { label: "Book", icon: img("ElbfVCsuPArVl3zn0TDFr2LHsS8.png", "?width=225&height=225") },
    { label: "Replay", icon: img("ILlX7EYM5eeKQKlrefUQFLFf0.png", "?width=225&height=225") },
    { label: "SuperDOM", icon: img("QZiuEgCOMfHl1fnZqXS1IZniA.png", "?width=225&height=225") },
    { label: "Alertas", icon: img("lh5GxYNq5VPYM0IIHCpt78Ii8.png", "?width=225&height=225") },
    { label: "Automação", icon: img("ZbnqIzDfBy0Ku1OmA2G7a5VehY.png", "?width=225&height=225") },
    { label: "Raio-X", icon: img("EJwsOW3Aj3xP5QhkBvO5BMG4M.png", "?width=225&height=225") },
    { label: "Mobile", icon: img("Rk7U3042pVEQoeNJ2Mpy0MHoEdM.png", "?width=225&height=225") },
  ],
};

export const osWidgets = {
  eyebrow: "Visão de mercado",
  title: "Decida com contexto, velocidade e clareza.",
  text: "Personalize sua área de trabalho com indicadores, painéis, alertas e widgets que deixam o mercado mais legível.",
  background: img("lpDS8XWpDdXI1UOoVJnnYcQXc.jpg", "?width=2400&height=1600"),
  cards: [
    img("AhLYl19cuDyfAP2fGwrnNk6jZ2Q.png", "?width=739&height=441"),
    img("TP225pOMCLz0Sq8TI3d78syscmk.png", "?width=739&height=441"),
    img("807VZloqkx0ie4X810zATn9BU.png", "?width=739&height=441"),
    img("CEJMXLcBPPxtviCKRWkGmOcxc.png", "?width=739&height=441"),
    img("NBI5OpkzH5eVQqf7g54cElZXa48.png", "?width=739&height=441"),
  ],
};
