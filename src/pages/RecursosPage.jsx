import { useEffect, useRef, useState } from "react";
import { ButtonRow } from "../components/Button.jsx";
import { SiteFooter } from "../components/SiteFooter.jsx";
import { SiteHeader } from "../components/SiteHeader.jsx";
import DarkVeil from "../components/fx/DarkVeil.jsx";
import { ToolMockup } from "../components/ToolResourcesShowcase.jsx";
import { toolResources } from "../data/toolResourcesData.jsx";
import "../styles/recursos.css";

import mockupPhone from "../../assets/Mockup.png";
import imgFuncionalidades from "../../assets/Frame 427319691.png";
import imgInfra from "../../assets/image 45.png";
import imgMelhoria from "../../assets/image 45-1.png";
import imgSuporte from "../../assets/Frame 427319694.png";
import imgMacbook from "../../assets/Macbook_Air_ProfiWeb_Grafico 2.png";

const ICON = (name) => `${import.meta.env.BASE_URL || "/"}tool-icons/Ferramenta=${name}.svg`;

/* ---------------------------------------------------------------- */
/* Shared hooks                                                      */
/* ---------------------------------------------------------------- */

function useReveal(threshold = 0.15, rootMargin = "0px") {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-visible");
          obs.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);
  return ref;
}

/* Subtle scroll-driven vertical parallax. */
function useParallax(strength = 40) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
    let rafId;
    function tick() {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = rect.top + rect.height / 2;
      const progress = clamp(1 - center / vh, 0, 1);
      el.style.transform = `translateY(${(0.5 - progress) * strength}px)`;
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [strength]);
  return ref;
}

/* ---------------------------------------------------------------- */
/* Hero                                                              */
/* ---------------------------------------------------------------- */

function RecursosHero() {
  const ref = useReveal(0.01);
  return (
    <section className="rc-hero" ref={ref}>
      <div className="rc-hero-bg" aria-hidden="true">
        <DarkVeil hueShift={210} speed={0.45} warpAmount={0.35} />
      </div>
      <div className="rc-hero-overlay" aria-hidden="true" />
      <div className="rc-hero-inner">
        <span className="rc-eyebrow">Recursos</span>
        <h1 className="rc-hero-title">
          Todas as ferramentas.<br />
          <span>Uma plataforma.</span>
        </h1>
        <p className="rc-hero-sub">
          Análise gráfica, tape reading, automação e gestão de risco —
          o arsenal completo do trader profissional.
        </p>
        <ButtonRow
          actions={[
            { label: "Testar grátis", href: "#comece", variant: "primary" },
            { label: "Ver planos", href: "#/planos", variant: "glass" },
          ]}
        />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Tools showcase                                                    */
/* ---------------------------------------------------------------- */

const TOOLS = [
  { icon: "MapaFluxo", name: "Mapa de Fluxo", cat: "fluxo", desc: "Visualize o fluxo de ordens em tempo real e identifique agressões, absorções e mudanças de pressão antes que apareçam no gráfico de preços." },
  { icon: "LivroOfertas", name: "Livro de Ofertas", cat: "fluxo", desc: "Acompanhe as melhores ofertas de compra e venda com profundidade total do book, essencial para quem opera com timing preciso." },
  { icon: "TimesTrades", name: "Times & Trades", cat: "fluxo", desc: "Veja cada negócio executado em tempo real, com volume e agressor, para entender exatamente quem está no controle do papel." },
  { icon: "SuperDOM", name: "SuperDOM", cat: "fluxo", desc: "Envie ordens diretamente pelo book de preços com um clique, com a agilidade que o scalping e o day trade exigem." },
  { icon: "MedidoresPressao", name: "Medidores de Pressão", cat: "fluxo", desc: "Meça a força compradora e vendedora em tempo real e antecipe reversões de curto prazo com mais confiança." },
  { icon: "VolumeatPrice", name: "Volume at Price", cat: "fluxo", desc: "Identifique os níveis de preço com maior volume negociado e enxergue onde está a verdadeira liquidez do ativo." },
  { icon: "VolumeatMarket", name: "Volume at Market", cat: "fluxo", desc: "Acompanhe o volume agredido a mercado por nível de preço para separar movimento real de ruído." },
  { icon: "VolumeMercado", name: "Volume de Mercado", cat: "fluxo", desc: "Monitore o volume agregado do ativo em tempo real e confirme a força por trás de cada movimento de preço." },
  { icon: "MotionTracker", name: "Motion Tracker", cat: "fluxo", desc: "Detecte automaticamente acelerações de volume e preço, destacando os momentos de maior atividade do mercado." },
  { icon: "InsideTrack", name: "Inside Track", cat: "fluxo", desc: "Compare o comportamento de múltiplos ativos lado a lado e identifique divergências de fluxo entre eles." },
  { icon: "Indicadores", name: "Indicadores", cat: "analise", desc: "Uma biblioteca completa de indicadores técnicos, dos clássicos aos proprietários, para embasar cada decisão de entrada e saída." },
  { icon: "GradeCotacao", name: "Grade de Cotação", cat: "analise", desc: "Acompanhe cotações de diversos ativos organizadas em grade personalizável, com atualização em tempo real." },
  { icon: "TickerCotacao", name: "Ticker de Cotação", cat: "analise", desc: "Mantenha os ativos que mais importam sempre visíveis em uma faixa de cotações contínua e discreta." },
  { icon: "MonitorMercado", name: "Monitor de Mercado", cat: "analise", desc: "Tenha uma visão consolidada de índices, moedas e ativos relevantes para entender o contexto macro antes de operar." },
  { icon: "MatrizCorrelacao", name: "Matriz de Correlação", cat: "analise", desc: "Visualize a correlação entre diferentes ativos e monte operações mais consistentes com o cenário de mercado." },
  { icon: "IVRank", name: "IV Rank", cat: "analise", desc: "Avalie o nível de volatilidade implícita de opções em relação ao seu histórico para encontrar melhores oportunidades." },
  { icon: "ReplayMulti", name: "Replay Multi", cat: "analise", desc: "Reproduza o pregão de múltiplos ativos simultaneamente para estudar cenários passados e testar sua estratégia sem risco." },
  { icon: "Noticias", name: "Notícias", cat: "analise", desc: "Receba notícias de mercado em tempo real, direto na plataforma, sem precisar sair do gráfico para se manter informado." },
  { icon: "BM&CNews", name: "BM&C News", cat: "analise", desc: "Conteúdo exclusivo de análise e notícias sobre o mercado financeiro brasileiro, direto na sua área de trabalho." },
  { icon: "EstrategiasAutomatizadas", name: "Estratégias Automatizadas", cat: "automacao", desc: "Crie e execute estratégias automatizadas sem escrever uma linha de código, com regras de entrada, saída e gestão de risco." },
  { icon: "OtimizacaoEstrategia", name: "Otimização de Estratégia", cat: "automacao", desc: "Teste e otimize os parâmetros da sua estratégia com backtests detalhados antes de operar com dinheiro real." },
  { icon: "Copilot", name: "Copilot", cat: "automacao", desc: "Um assistente inteligente que analisa o mercado e sugere insights em tempo real para apoiar suas decisões de trading." },
  { icon: "Alarmes", name: "Alarmes", cat: "automacao", desc: "Configure alertas de preço, indicador ou volume e seja avisado no momento exato em que o mercado se mover." },
  { icon: "Connect", name: "Connect", cat: "automacao", desc: "Integre o Profit a outras ferramentas e plataformas para automatizar seu fluxo de trabalho de ponta a ponta." },
  { icon: "CopyInvest", name: "CopyInvest", cat: "automacao", desc: "Replique automaticamente as operações de estratégias e traders selecionados diretamente na sua conta." },
  { icon: "Posicao", name: "Posição", cat: "gestao", desc: "Acompanhe todas as suas posições abertas em tempo real, com resultado, exposição e risco sempre à vista." },
  { icon: "ListaOrdens", name: "Lista de Ordens", cat: "gestao", desc: "Gerencie todas as ordens enviadas, executadas e pendentes em um painel único, com edição e cancelamento rápidos." },
  { icon: "GerenciadorAtivos", name: "Gerenciador de Ativos", cat: "gestao", desc: "Organize e monitore sua carteira de ativos em um só lugar, com visão consolidada de performance e risco." },
  { icon: "PlanoTrade", name: "Plano de Trade", cat: "gestao", desc: "Defina metas, limites de risco e regras operacionais antes de operar, e siga seu plano com disciplina." },
  { icon: "RelatorioPerformance", name: "Relatório de Performance", cat: "gestao", desc: "Analise sua performance histórica em detalhes — resultado, taxa de acerto e drawdown — para evoluir como trader." },
];

const CATS = [
  { id: "todas", label: "Todas" },
  { id: "fluxo", label: "Fluxo" },
  { id: "analise", label: "Análise" },
  { id: "automacao", label: "Automação" },
  { id: "gestao", label: "Gestão" },
];

function ToolsSection() {
  const ref = useReveal(0.05);
  const [activeTool, setActiveTool] = useState(null);

  const groupIds = CATS.filter((c) => c.id !== "todas").map((c) => c.id);

  return (
    <section className="rc-tools" ref={ref}>
      <div className="rc-section-heading">
        <span className="rc-eyebrow">Arsenal completo</span>
        <h2 className="rc-h2">Detalhe das ferramentas da plataforma</h2>
        <p className="rc-sub">
          Mais de 30 ferramentas profissionais, organizadas para o seu fluxo de trabalho.
        </p>
      </div>

      <div className="rc-tools-columns">
        {groupIds.map((gid) => {
          const group = CATS.find((c) => c.id === gid);
          const items = TOOLS.filter((t) => t.cat === gid);
          return (
            <div className="rc-tool-col" key={gid}>
              <h3 className="rc-tool-col-title">{group.label}</h3>
              <div className="rc-tool-rows">
                {items.map((t) => (
                  <button
                    type="button"
                    className="rc-tool-row"
                    key={t.icon}
                    onClick={() => setActiveTool(t)}
                  >
                    <span className="rc-tool-row-icon">
                      <img src={ICON(t.icon)} alt="" loading="lazy" />
                    </span>
                    <span className="rc-tool-row-name">{t.name}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {activeTool && <ToolModal tool={activeTool} onClose={() => setActiveTool(null)} />}
    </section>
  );
}

const RESOURCE_BY_ICON = Object.fromEntries(
  toolResources.map((r) => [r.icon.match(/Ferramenta=(.+)\.svg/)[1], r])
);
// "Volume de Mercado" has no matching card in toolResources — reuse "Visão de
// Mercado" (Variant23) so the modal isn't a dead click.
RESOURCE_BY_ICON.VolumeMercado = RESOURCE_BY_ICON.Variant23;

function ToolModal({ tool, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const resource = RESOURCE_BY_ICON[tool.icon];
  if (!resource) return null;

  const isUltraOnly = resource.plans.length === 1 && resource.plans[0] === "Profit Ultra";

  return (
    <div className="rc-modal-overlay" onClick={onClose}>
      <div className="rc-modal-track" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="rc-modal-close" onClick={onClose} aria-label="Fechar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
        <article
          className="resource-power-card is-active has-foreground-animation"
          style={{
            "--tool-tone-a": resource.theme[0],
            "--tool-tone-b": resource.theme[1],
            "--tool-accent": resource.theme[2],
          }}
        >
          <div className="resource-power-card-header">
            <div className="resource-power-title-lockup">
              <span className="resource-power-icon">
                <img src={ICON(tool.icon)} alt="" loading="lazy" />
              </span>
              <h3>{resource.name}</h3>
            </div>
            {isUltraOnly && <span className="resource-power-premium">EXCLUSIVO ULTRA</span>}
          </div>
          <p>{resource.description}</p>
          <div className="resource-power-visual">
            <ToolMockup tool={resource} />
          </div>
        </article>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Profit Web                                                        */
/* ---------------------------------------------------------------- */

function ProfitWebSection() {
  const ref = useReveal(0.1);
  const parallaxRef = useParallax(46);
  return (
    <section className="rc-web" ref={ref}>
      <div className="rc-web-inner">
        <div className="rc-web-copy">
          <span className="rc-eyebrow">No navegador</span>
          <h2 className="rc-h2">Profit Web</h2>
          <p className="rc-body">
            A plataforma líder dos traders, agora acessível em qualquer lugar e a
            qualquer momento. Desfrute da segurança, velocidade e versatilidade do
            Profit diretamente no seu navegador, com atualizações automáticas dos
            seus dados em tempo real.
          </p>
          <ButtonRow
            actions={[{ label: "Conhecer o Profit Web", href: "#/profit-web", variant: "primary" }]}
          />
        </div>
        <div className="rc-web-visual" ref={parallaxRef}>
          <div className="rc-web-glow" aria-hidden="true" />
          <img src={imgMacbook} alt="Profit Web em um MacBook" loading="lazy" />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Mobile                                                            */
/* ---------------------------------------------------------------- */

function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.05 12.53c-.02-2.13 1.74-3.15 1.82-3.2-1-1.45-2.54-1.65-3.08-1.67-1.31-.13-2.56.77-3.22.77-.66 0-1.69-.75-2.78-.73-1.43.02-2.75.83-3.49 2.11-1.49 2.58-.38 6.4 1.07 8.5.71 1.02 1.55 2.17 2.66 2.13 1.07-.04 1.47-.69 2.76-.69 1.29 0 1.65.69 2.78.67 1.15-.02 1.87-1.04 2.57-2.07.81-1.19 1.14-2.34 1.16-2.4-.03-.01-2.23-.86-2.25-3.42zM14.93 6.28c.59-.71.98-1.7.87-2.68-.84.03-1.87.56-2.47 1.27-.54.63-1.02 1.63-.89 2.6.94.07 1.9-.48 2.49-1.19z" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.5 3.5c-.31.16-.5.48-.5.9v15.2c0 .42.19.74.5.9l8.35-8.5L4.5 3.5zm9.55 9.72 2.3 2.34-9.62 5.47c-.24.14-.5.17-.73.1l8.05-7.91zm2.3-4.78-2.3 2.34-8.05-7.91c.23-.07.49-.04.73.1l9.62 5.47zm.98 1.02 2.17 1.23c.67.38.67 1.24 0 1.62l-2.17 1.23-2.53-2.04 2.53-2.04z" />
    </svg>
  );
}

function MobileSection() {
  const ref = useReveal(0.1);
  const parallaxRef = useParallax(56);
  return (
    <section className="rc-mobile" ref={ref}>
      <div className="rc-mobile-glow" aria-hidden="true" />
      <div className="rc-mobile-inner">
        <div className="rc-mobile-visual" ref={parallaxRef}>
          <img src={mockupPhone} alt="Profit Mobile em um smartphone" loading="lazy" />
        </div>
        <div className="rc-mobile-copy">
          <span className="rc-eyebrow">Profit Mobile</span>
          <h2 className="rc-h2">Negocie a hora que quiser, como quiser.</h2>
          <p className="rc-body">
            O novo Profit Mobile foi desenvolvido com tecnologia inovadora e
            aprimorado para sua melhor performance, com gráficos, boletas e
            cotações <strong className="rc-inline-stat">até 60% mais rápidas</strong>.
            Construído para quem deseja ter o mercado na palma da sua mão.
          </p>
          <div className="rc-store-row">
            <a className="rc-store" href="#/baixar" aria-label="Baixar na App Store">
              <AppleGlyph />
              <span className="rc-store-text">
                <small>Baixar na</small>
                App Store
              </span>
            </a>
            <a className="rc-store" href="#/baixar" aria-label="Disponível no Google Play">
              <PlayGlyph />
              <span className="rc-store-text">
                <small>Disponível no</small>
                Google Play
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Por que o Profit é a melhor opção?                                */
/* ---------------------------------------------------------------- */

const WHY = [
  {
    title: "Funcionalidades inovadoras para qualquer perfil",
    body:
      "Disponibilizamos as melhores ferramentas para análise gráfica, tape reading, recursos operacionais e de gestão de risco. Conheça recursos inovadores desenvolvidos para todos tipos de traders e investidores!",
    img: imgFuncionalidades,
    alt: "Funcionalidades da plataforma Profit",
  },
  {
    title: "Infraestrutura robusta e diferenciada",
    body:
      "Dispondo de uma base de dados ampla, as plataformas da Nelogica possuem conexão com diversos servidores e 4 datacenters, garantindo a conexão precisa e o fluxo de dados contínuo, corrente e pleno.",
    img: imgInfra,
    alt: "Datacenter da Nelogica",
  },
  {
    title: "Busca por contínua melhoria e atualização",
    body:
      "Semanalmente, lançamos novas atualizações com base nas solicitações de nosso clientes, visando sempre incluir ferramentas novas e de alto padrão que irão auxiliar no resultado final do usuário.",
    img: imgMelhoria,
    alt: "Atualizações contínuas da plataforma",
  },
  {
    title: "Suporte técnico 24/7",
    body:
      "Obtenha atendimento do suporte técnico 24h por dia e 7 dias por semana, por e-mail e também pelo nosso chat em tempo real. Esclareça todas as suas dúvidas e seja atendido rapidamente pela Nelogica.",
    img: imgSuporte,
    alt: "Suporte técnico Nelogica",
  },
];

function WhyCard({ item, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-visible");
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--spot-y", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <article
      ref={cardRef}
      className="rc-why-card"
      style={{ "--i": index }}
      onMouseMove={onMove}
    >
      <div className="rc-why-spot" aria-hidden="true" />
      <div className="rc-why-media">
        <img src={item.img} alt={item.alt} loading="lazy" />
      </div>
      <div className="rc-why-copy">
        <h3>{item.title}</h3>
        <p>{item.body}</p>
      </div>
    </article>
  );
}

function WhySection() {
  const ref = useReveal(0.05);
  return (
    <section className="rc-why" ref={ref}>
      <div className="rc-section-heading">
        <span className="rc-eyebrow">Diferenciais</span>
        <h2 className="rc-h2">Por que o Profit é a melhor opção?</h2>
      </div>
      <div className="rc-why-grid">
        {WHY.map((item, i) => (
          <WhyCard key={item.title} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Final CTA                                                         */
/* ---------------------------------------------------------------- */

function FinalCta() {
  const ref = useReveal();
  return (
    <section className="rc-final" id="comece" ref={ref}>
      <div className="rc-final-glow" aria-hidden="true" />
      <h2 className="rc-h2">Pronto para operar com o arsenal completo?</h2>
      <p className="rc-sub">Teste o Profit gratuitamente e conheça cada ferramenta na prática.</p>
      <ButtonRow
        actions={[
          { label: "Testar grátis", href: "#/baixar", variant: "primary" },
          { label: "Ver planos", href: "#/planos", variant: "glass" },
        ]}
      />
    </section>
  );
}

/* ---------------------------------------------------------------- */

export function RecursosPage() {
  return (
    <>
      <SiteHeader />
      <main className="rc-page">
        <RecursosHero />
        <ToolsSection />
        <ProfitWebSection />
        <MobileSection />
        <WhySection />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
