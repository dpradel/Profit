const img = (id, query = "") => `https://framerusercontent.com/images/${id}${query}`;
const asset = (id) => `https://framerusercontent.com/assets/${id}`;

export const homeNavLinks = [
  { label: "Profit Ultra", href: "#/profit-ultra" },
  { label: "Recursos", href: "#/recursos" },
  { label: "Teste grátis", href: `${import.meta.env.BASE_URL}#comece` },
];

export const homeHero = {
  eyebrow: "Recursos do Profit",
  title: "Tudo que você precisa.",
  accent: "Em um só lugar.",
  description:
    "Análise gráfica, tape reading, gestão de risco, automação, simulador e acesso multiplataforma para operar com mais clareza do início ao fim.",
  price: "Teste grátis por 15 dias",
  delivery: "Condições especiais via corretoras parceiras.",
  video: asset("RXdViD4LFyIVWfxi9JhlguEIFo.mp4"),
  poster: img("4p63tB0zIXnO6VqZ08LnrJylo.png", "?width=1600&height=1000"),
  announcementUrl: "/#comece",
};

export const homeAppCards = [
  {
    label: "Análise gráfica profissional",
    image: img("OUtdsL1Iz0eixChKfB0O9BY8XKQ.png", "?width=1145&height=361"),
  },
  {
    label: "Tape Reading em tempo real",
    image: img("47Zbye0cd1CvUOHUBcqOSA80Fcg.png", "?width=512&height=161"),
  },
  {
    label: "Book de ofertas e SuperDOM",
    image: img("0rK1ufkZrmaBrnNPmUkFQgw.png", "?width=1145&height=360"),
  },
  {
    label: "Times & Trades e fluxo",
    image: img("ax2calL9OpjzIQeDPrhsn4jM.png", "?width=1145&height=361"),
  },
  {
    label: "Volume at Price",
    image: img("YkTNOxdzCuMcE14y1oJIUznpOFg.png", "?width=1145&height=361"),
  },
  {
    label: "Market Replay e simulador",
    image: img("IebwAVv4pDb9ZNbNaFXu3CH12M.png", "?width=1145&height=361"),
  },
  {
    label: "Automação NTSL e backtesting",
    image: img("VDtTcUj5sTVuNcv46OAyWlKRqRM.png", "?width=1145&height=361"),
  },
  {
    label: "Profit Web, Mobile e Desktop",
    image: img("mdKJOscuXUmYsCbEoZ7DwgRUCow.png", "?width=1145&height=361"),
  },
];

export const homeProduct = {
  hero: img("Wu5Fr1Ez1OoZhIp4Gp7Hd4XYxWs.png", "?width=1531&height=618"),
  tiles: [
    {
      eyebrow: "Análise",
      title: "Gráficos para decidir melhor.",
      description: "Indicadores, estudos, desenhos, múltiplos tempos gráficos e recursos visuais para ler o mercado com precisão.",
      image: img("bJXE3sDP34b5c19qFfwIxCwCV0.png", "?width=1302&height=828"),
    },
    {
      eyebrow: "Fluxo",
      title: "Tape Reading no ritmo do mercado.",
      description: "Book, Times & Trades, agressões, volume e SuperDOM para acompanhar pressão compradora e vendedora em tempo real.",
      image: img("Q6xCpkgzrahlX9ticypQO38sePw.png", "?width=774&height=784"),
    },
    {
      title: "Automação e backtesting.",
      description: "Crie estratégias em NTSL, teste hipóteses, revise resultados e execute modelos com mais controle operacional.",
      image: img("qlqS9guAn7lxdeHq3xILyrJVLFE.png", "?width=2188&height=2284"),
    },
    {
      title: "Risco sob controle.",
      description: "Ordens avançadas, stops, OCO, alertas e acompanhamento de posição para operar com disciplina.",
      image: img("DwTHmYWZ24gbcbDenoLEzvAWm4.png", "?width=843&height=620"),
    },
  ],
};

export const controlCards = [
  {
    title: "Funcionalidades inovadoras para qualquer perfil.",
    text: "Ferramentas de análise gráfica, tape reading, execução e gestão de risco para traders e investidores.",
  },
  {
    title: "Infraestrutura robusta e diferenciada.",
    text: "Base de dados ampla, múltiplos servidores e datacenters para manter o fluxo de dados contínuo e preciso.",
  },
  {
    title: "Melhoria contínua.",
    text: "Atualizações frequentes baseadas na rotina dos clientes e nas demandas reais de mercado.",
  },
  {
    title: "Suporte técnico 24/7.",
    text: "Atendimento por chat e e-mail para ajudar você a configurar, operar e resolver dúvidas rapidamente.",
  },
];

export const homeHardwareStats = [
  { value: "100+ indicadores", label: "Estudos técnicos, overlays, desenhos e ferramentas proprietárias." },
  { value: "4 datacenters", label: "Infraestrutura preparada para fluxo de dados contínuo." },
  { value: "24/7 suporte", label: "Atendimento por chat e e-mail com pessoas reais." },
  { value: "Tempo real", label: "Cotações, book, agressões e posição sempre atualizados." },
  { value: "Multi-dispositivo", label: "Desktop, mobile, tablet e browser com layouts sincronizados." },
];

export const setup = {
  image: img("QvvMEs78sP5zv9xrJ2IQT6Q14Q.png"),
  steps: [
    { title: "Escolha seu perfil", text: "e ative os recursos que fazem sentido para sua rotina." },
    { title: "Conecte sua corretora", text: "para enviar ordens, acompanhar posições e operar em tempo real." },
    { title: "Monte seu workspace", text: "com gráficos, book, alertas, replay, automações e layouts salvos na nuvem." },
  ],
};

export const homeOs = {
  devices: {
    laptop: img("61JO7skt6dcaHQB6zXKux0RO1EA.jpeg", "?width=1280&height=746"),
    tablet: img("YJE4H7uzAMveS9eRyDrp7sdHWpE.png", "?width=1280&height=1005"),
    phone: img("xahwcRLKqbZ8ZRUHXhb2XTl5v4.png", "?width=622&height=1273"),
  },
  files: img("Gtx2doltr6sQ7HfHwhtx5cp2Uk.png", "?width=2423&height=1546"),
  migration: img("hASH9XMfYjERXcctHZle6iK7cps.png", "?width=1920&height=1000"),
};

export const homeSpecs = {
  image: img("SErrV6VJiy4YWMAnrqr15k9rrdI.png", "?width=1324&height=2177"),
  rows: [
    ["Disponível em", "Windows, macOS, iOS, Android, tablet e browser"],
    ["Análise", "Gráficos, indicadores, estudos, replay e ferramentas de desenho"],
    ["Fluxo", "Book de ofertas, Times & Trades, SuperDOM e Volume at Price"],
    ["Automação", "Estratégias NTSL, backtesting e otimização"],
    ["Segurança", "Autenticação em dois fatores, nuvem e dados criptografados"],
    ["Suporte", "Atendimento 24/7 por chat e e-mail"],
    ["Corretoras", "Integração com corretoras parceiras da Nelogica"],
    ["Teste", "15 dias grátis para começar sem cartão"],
  ],
};
